import React, { useState } from 'react';
import { Product, DeliveryRegion } from '../types';
import { getRegionalPrice, REGIONS_CONFIG } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { 
  ShoppingBag, 
  FileText, 
  Check, 
  Layers, 
  Info, 
  ShieldCheck, 
  Images
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  selectedRegion?: DeliveryRegion;
  onAddToCart: (product: Product, selectedFormat: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product, format?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedRegion = 'haiti',
  onAddToCart,
  onSelectProduct,
  onRequestQuote
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Determine initial format
  const allFormats = [
    ...(product.formatsDetail || []),
    ...(product.formatsExport || []),
    ...(product.formats || [])
  ];

  const imagesList = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedFormat, setSelectedFormat] = useState<string>(allFormats[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Regional Pricing details
  const activeRegion = (selectedRegion as DeliveryRegion) || 'haiti';
  const regionalPrice = getRegionalPrice(product, selectedFormat, activeRegion);
  const regionConfig = REGIONS_CONFIG[activeRegion] || REGIONS_CONFIG.haiti;
  const isExportFormat = product.formatsExport?.includes(selectedFormat);

  const handleAdd = () => {
    onAddToCart(product, selectedFormat, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const currentDisplayImage = imagesList[activeImageIdx] || product.image;

  return (
    <div 
      id={`product-card-${product.id}`}
      className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 ${
        product.id === 'huile-de-ricin' 
          ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/25' 
          : 'border-[#E9C46A]/40 hover:border-[#1B4332]'
      }`}
    >
      {/* Card Header & Visual Image Area */}
      <div className="relative overflow-hidden group bg-[#1B4332] w-full min-h-[240px] sm:min-h-[280px] flex items-center justify-center p-3">
        <ImageWithSkeleton
          src={currentDisplayImage}
          alt={`Panyen Lokal - ${product.title} produit en Haïti`}
          containerClassName="w-full h-full max-h-[250px] flex items-center justify-center rounded-xl"
          imgClassName="w-full h-full max-h-[250px] object-contain transition-transform duration-500 group-hover:scale-105"
          showShimmerBadge={true}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm ${
              product.badge.includes('PHARE') || product.badge.includes('STAR')
                ? 'bg-[#E9C46A] text-[#1B4332] ring-1 ring-[#1B4332]'
                : product.badge.includes('NOUVEAUTÉ')
                ? 'bg-[#1B4332] text-white border border-white'
                : 'bg-[#1B4332] text-white border border-[#2d6a4f]'
            }`}>
              {product.badge}
            </span>
          )}
          {product.slogan && (
            <span className="bg-[#1B4332]/90 backdrop-blur-sm text-white text-[10px] italic font-serif px-2 py-0.5 rounded shadow-sm border border-[#2d6a4f]">
              "{product.slogan}"
            </span>
          )}
        </div>

        {/* Top Right Region and Stock Badge */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDFBF7] text-[#1F2937] border border-stone-200 shadow-xs">
            <span>{regionConfig.flag}</span>
            <span>{t('product.dest_prefix')} {selectedRegion === 'haiti' ? t('region.haiti').split(' ')[0] : selectedRegion === 'usa' ? 'USA' : t('region.dom_rep').split(' ')[0]}</span>
          </span>
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2E7D32]/15 text-[#1B4332] border border-[#2E7D32] bg-[#FDFBF7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse"></span>
              {t('catalog.in_stock')}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-200 text-[#1F2937]/70">
              {t('catalog.out_of_stock')}
            </span>
          )}
        </div>

        {/* Gallery Image Preview Dots */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-[#143527]/90 px-2 py-1 rounded-full border border-[#2d6a4f]">
            <Images className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold text-white mr-1">{imagesList.length} photos</span>
            {imagesList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(dotIdx);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  dotIdx === activeImageIdx ? 'bg-[#E9C46A] w-3' : 'bg-white/50 hover:bg-white'
                }`}
                title={`Photo ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-[#143527]/90 backdrop-blur-md text-[#FDFBF7] border border-[#2d6a4f]">
            {product.category}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onSelectProduct(product)}
          className="absolute inset-0 bg-[#143527]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-xs cursor-pointer"
          title={t('catalog.view_details')}
        >
          <span className="bg-[#1B4332] hover:bg-[#235841] text-white border border-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-1.5 font-bold">
            <Info className="w-3.5 h-3.5 text-white" />
            {t('product.details_btn')} ({imagesList.length})
          </span>
        </button>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelectProduct(product)}
              className="text-base sm:text-lg font-bold font-serif text-[#1B4332] hover:text-[#2E7D32] cursor-pointer transition-colors leading-snug"
            >
              {product.title}
            </h3>
          </div>

          <p className="text-xs text-[#1F2937] line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="mt-2 text-[11px] text-[#1B4332] font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>{t('product.origin_label')} {product.origin}</span>
          </div>
        </div>

        {/* Format Selector Dropdown / Pills */}
        {allFormats.length > 0 && (
          <div className="pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1F2937] mb-1.5">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#1B4332]" />
                {t('product.size_label')}
              </span>
              {isExportFormat && (
                <span className="text-[10px] text-[#1B4332] bg-[#E9C46A] px-1.5 py-0.5 rounded font-black border border-[#E9C46A]">
                  {t('product.b2b_format')}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {allFormats.map((fmt) => {
                const isSelected = selectedFormat === fmt;
                const isExport = product.formatsExport?.includes(fmt);
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all text-center truncate cursor-pointer ${
                      isSelected
                        ? isExport 
                          ? 'bg-[#E9C46A] text-[#1B4332] font-black shadow-sm ring-2 ring-[#E9C46A]'
                          : 'bg-[#1B4332] text-white border border-[#1B4332] font-bold shadow-sm'
                        : 'bg-[#FDFBF7] text-[#1F2937] hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price display & Regional Breakdown */}
        <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E9C46A]/60 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#1F2937]/70 flex items-center gap-1">
              <span>{t('product.rate_label').replace('{region}', regionConfig.name)}</span>
              {selectedRegion !== 'haiti' && (
                <span className="text-[10px] text-[#1B4332] font-bold bg-[#E9C46A]/40 px-1 rounded border border-[#E9C46A]">
                  {t('product.freight_inc')}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-[#1B4332]">
                ${regionalPrice.priceUSD.toFixed(2)} USD
              </span>
              {regionalPrice.currency !== 'USD' && (
                <span className="text-xs font-semibold text-[#1F2937]">
                  ({regionalPrice.formattedLocal})
                </span>
              )}
            </div>
          </div>
          <div className="text-right text-[11px] text-[#2E7D32] font-bold">
            {selectedFormat}
          </div>
        </div>

        {/* Actions : Bouton Achte / Demander un devis B2B */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {isExportFormat ? (
            <button
              id={`btn-quote-${product.id}`}
              onClick={() => onRequestQuote(product, selectedFormat)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 col-span-2 cursor-pointer border border-[#388E3C]"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>{t('product.b2b_quote_btn')} ({selectedFormat})</span>
            </button>
          ) : (
            <>
              <button
                id={`btn-add-${product.id}`}
                onClick={handleAdd}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer border ${
                  addedAnimation
                    ? 'bg-[#E9C46A] text-[#1B4332] border-[#E9C46A] font-black'
                    : 'bg-[#2E7D32] hover:bg-[#256629] text-white border-[#388E3C]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#1B4332]" />
                    <span>{t('product.added_btn')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-white" />
                    <span>{t('catalog.quick_add')}</span>
                  </>
                )}
              </button>
              <button
                id={`btn-detail-${product.id}`}
                onClick={() => onSelectProduct(product)}
                className="py-2.5 px-3 rounded-xl bg-[#1B4332]/5 hover:bg-[#1B4332]/10 text-[#1B4332] font-semibold text-xs border border-[#1B4332]/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t('product.details_btn')}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

