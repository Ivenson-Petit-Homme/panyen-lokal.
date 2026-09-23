import React, { useState } from 'react';
import { Product, DeliveryRegion } from '../types';
import { getRegionalPrice, REGIONS_CONFIG } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { 
  X, 
  ShoppingBag, 
  FileText, 
  Check, 
  MapPin, 
  Layers, 
  Utensils, 
  Award,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  selectedRegion?: DeliveryRegion;
  onClose: () => void;
  onAddToCart: (product: Product, selectedFormat: string, quantity: number) => void;
  onRequestQuote: (product: Product, format?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  selectedRegion = 'haiti',
  onClose,
  onAddToCart,
  onRequestQuote
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  if (!product) return null;

  // Determine unique formats without duplicates
  const allFormats: string[] = Array.from(new Set<string>([
    ...(product.formatsDetail || []),
    ...(product.formatsExport || []),
    ...(product.formats || [])
  ])).filter(Boolean);

  const imagesList = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedFormat, setSelectedFormat] = useState<string>(allFormats[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const activeRegion = (selectedRegion as DeliveryRegion) || 'haiti';
  const regionalPrice = getRegionalPrice(product, selectedFormat, activeRegion);
  const regionConfig = REGIONS_CONFIG[activeRegion] || REGIONS_CONFIG.haiti;
  const isExport = product.formatsExport?.includes(selectedFormat);

  const handleAdd = () => {
    if (isExport) {
      onRequestQuote(product, selectedFormat);
    } else {
      onAddToCart(product, selectedFormat, quantity);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1400);
    }
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  const currentActiveImage = imagesList[activeImageIndex] || product.image;

  return (
    <div 
      id="product-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1B4332]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FDFBF7] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E9C46A]/30 relative text-[#1F2937]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-950 shadow-md border border-stone-200 transition-colors cursor-pointer"
          aria-label="Fermer la modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8">
          {/* Left Column: Interactive Image Gallery & Badges */}
          <div className="md:col-span-5 space-y-3.5">
            {/* Main Active Image Display */}
            <div className="rounded-2xl overflow-hidden bg-[#1B4332] border border-[#2D6A4F] w-full min-h-[320px] sm:min-h-[380px] flex items-center justify-center relative shadow-lg group p-3">
              <ImageWithSkeleton
                src={currentActiveImage}
                alt={`${product.title} - Vue ${activeImageIndex + 1}`}
                containerClassName="w-full h-full max-h-[360px] flex items-center justify-center rounded-xl"
                imgClassName="w-full h-full max-h-[360px] object-contain transition-all duration-300 group-hover:scale-105"
                showShimmerBadge={true}
              />

              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-[#E9C46A] text-[#1F2937] shadow">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Prev / Next Arrows if gallery has multiple photos */}
              {imagesList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#1B4332]/85 hover:bg-[#143527] text-white transition-colors shadow-md cursor-pointer z-10"
                    title={isEn ? "Previous photo" : "Photo précédente"}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#1B4332]/85 hover:bg-[#143527] text-white transition-colors shadow-md cursor-pointer z-10"
                    title={isEn ? "Next photo" : "Photo suivante"}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* Photo Counter Pill */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#143527]/90 border border-[#2D6A4F] text-[10px] font-bold text-white z-10">
                    {activeImageIndex + 1} / {imagesList.length} {t('detail.photos_suffix')}
                  </div>
                </>
              )}
            </div>

            {/* Gallery Thumbnails Strip */}
            {imagesList.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-600">
                  <Eye className="w-3.5 h-3.5 text-[#1B4332]" />
                  <span>{t('detail.all_images')} ({imagesList.length}) :</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {imagesList.map((imgUrl, idx) => {
                    const isCurrent = idx === activeImageIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-[#1B4332] p-0.5 ${
                          isCurrent
                            ? 'border-[#2D6A4F] shadow-md ring-2 ring-[#2E7D32]/40 scale-105'
                            : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <ImageWithSkeleton
                          src={imgUrl}
                          alt={`Miniature ${idx + 1}`}
                          containerClassName="w-full h-full rounded-lg"
                          imgClassName="w-full h-full object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Terroir & Origin Card */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#1B4332] font-bold text-xs">
                <MapPin className="w-4 h-4 text-[#1B4332]" />
                <span>{t('detail.origin')} : {product.origin}</span>
              </div>
              <p className="text-xs text-stone-600">
                {product.terroirLocation}
              </p>
            </div>

            {/* Certifications list */}
            {product.certifications && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.certifications.map((cert, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-stone-700 border border-stone-200 flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-[#1B4332]" />
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info, Formats & Actions */}
          <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1B4332] text-white border border-[#2D6A4F] shadow-xs">
                  <span>{regionConfig.flag}</span>
                  <span>{regionConfig.name}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#1F2937] mt-1">
                {product.title}
              </h2>
              {product.slogan && (
                <p className="text-sm font-serif italic text-[#1B4332] font-medium mt-1">
                  « {product.slogan} »
                </p>
              )}

              <p className="text-sm text-[#1F2937]/90 leading-relaxed mt-3">
                {product.description}
              </p>

              {/* Highlights */}
              {product.highlights && (
                <div className="mt-4 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    {t('detail.highlights')} :
                  </h4>
                  <ul className="space-y-1 text-xs text-[#1F2937]">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1B4332] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage / Conseils */}
              {product.usageInstructions && (
                <div className="mt-4 p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-[#1B4332] flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#1B4332]" />
                    {t('detail.usage')} :
                  </h4>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {product.usageInstructions.map((inst, i) => (
                      <li key={i}>• {inst}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Format selection & pricing */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              {allFormats.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#1B4332]" />
                      {t('detail.format_select')}
                    </span>
                    {isExport && (
                      <span className="text-white font-bold text-[11px] bg-[#1B4332] px-2 py-0.5 rounded border border-[#2D6A4F] shadow-xs">
                        {t('detail.b2b_format_badge')}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {allFormats.map((fmt, fmtIdx) => {
                      const isSelected = selectedFormat === fmt;
                      const fmtPrice = getRegionalPrice(product, fmt, activeRegion);
                      return (
                        <button
                          key={`${product.id}-modal-fmt-${fmt}-${fmtIdx}`}
                          onClick={() => setSelectedFormat(fmt)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#2D6A4F] bg-[#1B4332] text-white ring-2 ring-[#2E7D32]'
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}
                        >
                          <div className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-[#1F2937]'}`}>{fmt}</div>
                          <div className={`text-[11px] font-extrabold mt-0.5 ${isSelected ? 'text-white' : 'text-[#1B4332]'}`}>
                            ${fmtPrice.priceUSD.toFixed(2)} USD
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price & Quantity Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-xs text-stone-500 block">{t('detail.unit_price_label').replace('{region}', regionConfig.name)}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#1B4332]">
                      ${regionalPrice.priceUSD.toFixed(2)} USD
                    </span>
                    {regionalPrice.currency !== 'USD' && (
                      <span className="text-xs font-semibold text-stone-500">
                        ({regionalPrice.formattedLocal})
                      </span>
                    )}
                  </div>
                </div>

                {!isExport && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-stone-600">{t('detail.quantity')}</span>
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-bold text-xs text-[#1B4332]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {isExport ? (
                  <button
                    onClick={() => {
                      onRequestQuote(product, selectedFormat);
                      onClose();
                    }}
                    className="col-span-2 py-3.5 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#2D6A4F]"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>{isEn ? "Request B2B Export Quote" : "Demander un devis B2B Export"} ({selectedFormat})</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleAdd}
                      className={`py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow cursor-pointer border ${
                        addedAnimation
                          ? 'bg-[#E9C46A] text-[#1F2937] font-black border-[#E9C46A]'
                          : 'bg-[#1B4332] hover:bg-[#143527] text-white border-[#2D6A4F]'
                      }`}
                    >
                      {addedAnimation ? (
                        <>
                          <Check className="w-4 h-4 text-[#1F2937]" />
                          <span>{t('detail.added_success')}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-white" />
                          <span>{t('detail.add_to_cart')} ({quantity}x)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onRequestQuote(product, selectedFormat);
                        onClose();
                      }}
                      className="py-3.5 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-semibold text-xs border border-[#2D6A4F] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-white" />
                      <span>{t('detail.b2b_inquiry')}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

