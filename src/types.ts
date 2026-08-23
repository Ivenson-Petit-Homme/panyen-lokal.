export type ProductCategory = 
  | 'Huiles & Soins Naturels'
  | 'Boissons & Liqueurs'
  | 'Épicerie & Alimentaire';

export type DeliveryRegion = 'haiti' | 'usa' | 'dominican_republic';

export interface RegionConfig {
  id: DeliveryRegion;
  name: string;
  flag: string;
  currency: 'HTG' | 'USD' | 'DOP';
  currencySymbol: string;
  exchangeRateUSD: number;
  exportFeePercent: number;
  shippingBaseUSD: number;
  deliveryLeadTime: string;
  hubLocation: string;
  paymentMethods: string[];
}

export interface RegionalPrice {
  priceUSD: number;
  localCurrencyValue: number;
  currency: string;
  exportShippingIncluded?: boolean;
}

export interface ProductFormatPrice {
  format: string;
  priceUSD: number;
  priceHTG: number;
  unit: string;
  type: 'retail' | 'export';
  moq?: number;
  weightKg?: number;
  regionalPrices?: {
    haiti: { priceUSD: number; priceLocal: number; currency: 'HTG' };
    usa: { priceUSD: number; priceLocal: number; currency: 'USD' };
    dominican_republic: { priceUSD: number; priceLocal: number; currency: 'DOP' };
  };
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  slogan?: string;
  isFeatured: boolean;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  formatsDetail?: string[];
  formatsExport?: string[];
  formats?: string[];
  image: string;
  gallery?: string[];
  inStock: boolean;
  origin: string;
  terroirLocation: string;
  badge?: string;
  highlights?: string[];
  ingredients?: string[];
  usageInstructions?: string[];
  technicalSpecs?: Record<string, string>;
  formatPricing?: Record<string, ProductFormatPrice>;
  certifications?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  category: ProductCategory;
  selectedFormat: string;
  formatType: 'retail' | 'export';
  quantity: number;
  unitPriceUSD: number;
  unitPriceLocal: number;
  currency: string;
  destinationRegion: DeliveryRegion;
}

export type OrderStatus = 
  | 'en_attente'
  | 'en_preparation'
  | 'en_transit_export'
  | 'expedie'
  | 'livre'
  | 'annule';

export interface OrderItem {
  productId: string;
  productTitle: string;
  selectedFormat: string;
  quantity: number;
  unitPriceUSD: number;
  totalUSD: number;
  unitPriceLocal: number;
  totalLocal: number;
  currency: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  region: DeliveryRegion;
  deliveryAddress: {
    street: string;
    city: string;
    stateOrDepartment: string;
    country: string;
    postalCode?: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotalUSD: number;
  exportShippingFeeUSD: number;
  totalUSD: number;
  totalLocal: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: 'en_attente' | 'paye' | 'a_la_livraison';
  status: OrderStatus;
  statusLabel: string;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  preferredRegion: DeliveryRegion;
  companyName?: string;
  address?: {
    street: string;
    city: string;
    stateOrDepartment: string;
    country: string;
    postalCode?: string;
  };
  createdAt: string;
}

export interface DepartmentOrchard {
  id: string;
  name: string;
  capital: string;
  hectares: number;
  producersCount: number;
  keyCrops: string[];
  altitude: string;
  soilType: string;
  description: string;
  coordinates: { x: number; y: number };
}

export interface B2BQuoteInquiry {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  industry: 'Cosmétique' | 'Pharmaceutique' | 'Distribution Agroalimentaire' | 'Importateur' | 'Autre';
  incoterm: 'FOB Cap-Haïtien' | 'FOB Port-au-Prince' | 'CIF Miami' | 'CIF Le Havre / Anvers' | 'EXW Village EKAM';
  targetDate: string;
  items: {
    productId: string;
    productName: string;
    format: string;
    quantity: number;
  }[];
  customRequirements?: string;
}

export type PageRoute = 
  | 'home'
  | 'a-propos'
  | 'produits'
  | 'product-detail'
  | 'marches-export'
  | 'partenariats'
  | 'contact'
  | 'mon-compte'
  | 'admin';
