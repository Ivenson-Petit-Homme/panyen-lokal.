import { DeliveryRegion, RegionConfig, Product, ProductFormatPrice } from '../types';

export const REGIONS_CONFIG: Record<DeliveryRegion, RegionConfig> = {
  haiti: {
    id: 'haiti',
    name: 'Haïti (Marché Local & National)',
    flag: '🇭🇹',
    currency: 'HTG',
    currencySymbol: 'HTG',
    exchangeRateUSD: 132, // 1 USD = 132 HTG
    exportFeePercent: 0, // Zéro taxe d'exportation / tarif domestique
    shippingBaseUSD: 4.0, // ~528 HTG
    deliveryLeadTime: '24h – 48h (Livraison locale & points relais)',
    hubLocation: 'Village EKAM, Caracol / Cap-Haïtien / Port-au-Prince',
    paymentMethods: [
      'MonCash (Digicel)',
      'Natcash (Natcom)',
      'Virement bancaire (SOGEBANK / UNIBANK / BUH)',
      'Paiement à la livraison (Espèces)'
    ]
  },
  usa: {
    id: 'usa',
    name: 'États-Unis & Diaspora (USA / Canada)',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    exchangeRateUSD: 1, // 1 USD = 1 USD
    exportFeePercent: 0.18, // +18% consolidation fret, dédouanement FDA & emballage export renforcé
    shippingBaseUSD: 15.0,
    deliveryLeadTime: '4 – 7 jours ouvrables (Fret aérien & maritime express)',
    hubLocation: 'Hub Export Cap-Haïtien ➔ Hub Miami / New York / Boston / Montréal',
    paymentMethods: [
      'Carte Bancaire Internationale (Visa / Mastercard / Amex)',
      'Zelle (Transfert instantané)',
      'Virement bancaire international (Wire / SWIFT)',
      'PayPal Express'
    ]
  },
  dominican_republic: {
    id: 'dominican_republic',
    name: 'République Dominicaine (Corridor Transfrontalier)',
    flag: '🇩🇴',
    currency: 'DOP',
    currencySymbol: 'RD$',
    exchangeRateUSD: 60, // 1 USD = 60 DOP
    exportFeePercent: 0.12, // +12% corridor transfrontalier & transit douanier
    shippingBaseUSD: 9.0, // ~540 DOP
    deliveryLeadTime: '2 – 4 jours ouvrables (Corridor terrestre sécurisé)',
    hubLocation: 'Corridor Ouanaminthe / Dajabón ➔ Saint-Domingue & Santiago',
    paymentMethods: [
      'Virement Bancaire Local (Banco BHD / Banreservas / Banco Popular)',
      'Zelle / Dollars US (USD)',
      'Paiement comptant à la livraison (Saint-Domingue / Santiago)',
      'Carte Bancaire Internationale'
    ]
  }
};

/**
 * Calcule la tarification exacte d'un format produit selon la région de destination
 */
export function getRegionalPrice(
  product: Product,
  formatKey: string,
  regionId: DeliveryRegion = 'haiti'
): {
  priceUSD: number;
  priceLocal: number;
  currency: string;
  currencySymbol: string;
  basePriceUSD: number;
  exportFeeUSD: number;
  formattedUSD: string;
  formattedLocal: string;
} {
  const region = REGIONS_CONFIG[regionId] || REGIONS_CONFIG.haiti;
  const formatData = product.formatPricing?.[formatKey];

  const basePriceUSD = formatData?.priceUSD || 10;
  
  // Appliquer le facteur export si hors Haïti
  const isExportRegion = regionId !== 'haiti';
  const isBulkExport = formatData?.type === 'export';
  const effectiveExportFactor = isExportRegion 
    ? (isBulkExport ? region.exportFeePercent * 0.5 : region.exportFeePercent)
    : 0;

  const exportFeeUSD = parseFloat((basePriceUSD * effectiveExportFactor).toFixed(2));
  const finalPriceUSD = parseFloat((basePriceUSD + exportFeeUSD).toFixed(2));

  let finalPriceLocal = 0;
  if (region.currency === 'HTG') {
    finalPriceLocal = formatData?.priceHTG || Math.round(finalPriceUSD * region.exchangeRateUSD);
  } else if (region.currency === 'DOP') {
    finalPriceLocal = Math.round(finalPriceUSD * region.exchangeRateUSD);
  } else {
    finalPriceLocal = finalPriceUSD;
  }

  return {
    priceUSD: finalPriceUSD,
    priceLocal: finalPriceLocal,
    currency: region.currency,
    currencySymbol: region.currencySymbol,
    basePriceUSD,
    exportFeeUSD,
    formattedUSD: `$${finalPriceUSD.toFixed(2)} USD`,
    formattedLocal: region.currency === 'HTG' 
      ? `${finalPriceLocal.toLocaleString()} HTG`
      : region.currency === 'DOP'
      ? `RD$ ${finalPriceLocal.toLocaleString()}`
      : `$${finalPriceUSD.toFixed(2)} USD`
  };
}

/**
 * Calcule les totaux de commande avec fret et devise locale
 */
export function calculateRegionalOrderTotals(
  items: { unitPriceUSD: number; quantity: number }[],
  regionId: DeliveryRegion = 'haiti'
) {
  const region = REGIONS_CONFIG[regionId] || REGIONS_CONFIG.haiti;
  const subtotalUSD = items.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);

  // Seuils de gratuité de livraison
  let shippingUSD = region.shippingBaseUSD;
  if (regionId === 'haiti' && subtotalUSD >= 60) shippingUSD = 0;
  if (regionId === 'usa' && subtotalUSD >= 150) shippingUSD = 0;
  if (regionId === 'dominican_republic' && subtotalUSD >= 100) shippingUSD = 0;

  const totalUSD = parseFloat((subtotalUSD + shippingUSD).toFixed(2));
  
  let subtotalLocal = 0;
  let shippingLocal = 0;
  let totalLocal = 0;

  if (region.currency === 'HTG') {
    subtotalLocal = Math.round(subtotalUSD * region.exchangeRateUSD);
    shippingLocal = Math.round(shippingUSD * region.exchangeRateUSD);
    totalLocal = subtotalLocal + shippingLocal;
  } else if (region.currency === 'DOP') {
    subtotalLocal = Math.round(subtotalUSD * region.exchangeRateUSD);
    shippingLocal = Math.round(shippingUSD * region.exchangeRateUSD);
    totalLocal = subtotalLocal + shippingLocal;
  } else {
    subtotalLocal = subtotalUSD;
    shippingLocal = shippingUSD;
    totalLocal = totalUSD;
  }

  return {
    subtotalUSD,
    shippingUSD,
    totalUSD,
    subtotalLocal,
    shippingLocal,
    totalLocal,
    currency: region.currency,
    currencySymbol: region.currencySymbol,
    isFreeShipping: shippingUSD === 0,
    leadTime: region.deliveryLeadTime,
    hubLocation: region.hubLocation,
    region
  };
}
