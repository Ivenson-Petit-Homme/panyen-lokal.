import React, { useState } from 'react';
import { Product, DeliveryRegion } from '../types';
import { getRegionalPrice } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { 
  Info, 
  Images,
  MessageCircle
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  selectedRegion?: DeliveryRegion;
  onAddToCart?: (product: Product, selectedFormat: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote?: (product: Product, format?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedRegion = 'haiti',
  onSelectProduct
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const allFormats: string[] = Array.from(new Set<string>([
    ...(product.formatsDetail || []),
    ...(product.formatsExport || []),
    ...(product.formats || [])
  ])).filter(Boolean);

  const imagesList = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedFormat, setSelectedFormat] = useState<string>(allFormats[0] || 'Standard');

  const activeRegion = (selectedRegion as DeliveryRegion) || 'haiti';
  const regionalPrice = getRegionalPrice(product, selectedFormat, activeRegion);
  const currentDisplayImage = imagesList[activeImageIdx] || product.image;

  const formatItemData = product.formatPricing?.[selectedFormat];
  const displayPriceLabel = () => {
    if (product.id === 'huile-de-ricin') {
      if (selectedFormat.includes('2oz')) return '250 HTG';
      if (selectedFormat.includes('4oz')) return '500 HTG';
      if (selectedFormat.toLowerCase().includes('galon') || selectedFormat.toLowerCase().includes('gallon') || selectedFormat.includes('128oz')) return '$70.00 USD';
    }
    if (formatItemData?.priceHTG && activeRegion === 'haiti') {
      return `${formatItemData.priceHTG} HTG`;
    }
    return `$${regionalPrice.priceUSD.toFixed(2)} USD`;
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour Panyen Lokal, je souhaite des informations sur le produit "${product.title}" (${selectedFormat}) au tarif de ${displayPriceLabel()}.`
  );

  return (
    <div 
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-stone-200 hover:border-[#5B9B6E] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg"
    >
      {/* Product Visual */}
      <div className="relative overflow-hidden group bg-[#F6F8F6] w-full h-60 flex items-center justify-center p-4 border-b border-stone-100">
        <ImageWithSkeleton
          src={currentDisplayImage}
          alt={product.title}
          containerClassName="w-full h-full flex items-center justify-center"
          imgClassName="w-full h-full max-h-[210px] object-contain transition-transform duration-500 group-hover:scale-105"
          showShimmerBadge={false}
          loading="lazy"
        />

        {imagesList.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-[#1C3022]/85 px-2 py-1 rounded-full">
            <Images className="w-3 h-3 text-white" />
            {imagesList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  dotIdx === activeImageIdx ? 'bg-[#E59500] w-3' : 'w-1.5 bg-white/50 hover:bg-white'
                }`}
                title={`Photo ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => onSelectProduct(product)}
          className="absolute inset-0 bg-[#1C3022]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] cursor-pointer"
          title={isEn ? "View details" : "Voir les détails"}
        >
          <span className="bg-[#1C3022] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5 text-xs font-semibold">
            <Info className="w-3.5 h-3.5 text-[#76BD43]" />
            <span>{isEn ? "View Details" : "Voir Détails"}</span>
          </span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="text-[11px] font-medium text-[#3D684A] flex items-center gap-1.5">
            <span>{product.category}</span>
          </div>

          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-base sm:text-lg font-bold font-serif text-[#1C3022] hover:text-[#3D684A] cursor-pointer transition-colors leading-snug"
          >
            {product.title}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Format Selector */}
        {allFormats.length > 0 && (
          <div className="pt-2 border-t border-stone-100">
            <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
              {isEn ? "Format :" : "Format :"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {allFormats.map((fmt, fmtIdx) => {
                const isSelected = selectedFormat === fmt;
                return (
                  <button
                    key={`${product.id}-format-${fmt}-${fmtIdx}`}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#3D684A] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] text-stone-500 block">
              {isEn ? "Price" : "Tarif"}
            </span>
            <span className="text-lg font-extrabold text-[#1C3022] tabular-nums">
              {displayPriceLabel()}
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium truncate max-w-[130px]">
            {selectedFormat}
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id={`btn-detail-${product.id}`}
            onClick={() => onSelectProduct(product)}
            className="w-full py-2.5 px-3 rounded-lg bg-[#1C3022] hover:bg-[#2A4833] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Info className="w-3.5 h-3.5 text-[#76BD43]" />
            <span>{isEn ? "Details" : "Détails"}</span>
          </button>

          <a
            href={`https://wa.me/50938346371?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
