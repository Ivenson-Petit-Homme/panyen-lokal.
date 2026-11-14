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
  Eye,
  MessageCircle
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
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2A4833]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FDFBF7] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E59500]/30 relative text-[#1F2937]">
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
            <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#F7FAF7] via-[#F2F7F2] to-[#E8F2E8] border border-stone-200 w-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center relative shadow-md group p-4">
              <ImageWithSkeleton
                src={currentActiveImage}
                alt={`${product.title} - Vue ${activeImageIndex + 1}`}
                containerClassName="w-full h-full max-h-[340px] flex items-center justify-center rounded-xl"
                imgClassName="w-full h-full max-h-[340px] object-contain drop-shadow-md transition-all duration-300 group-hover:scale-105"
                showShimmerBadge={true}
              />

              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-[#E59500] text-stone-950 shadow">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Prev / Next Arrows if gallery has multiple photos */}
              {imagesList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#2A4833]/85 hover:bg-[#1C3022] text-white transition-colors shadow-md cursor-pointer z-10"
                    title={isEn ? "Previous photo" : "Photo précédente"}
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#2A4833]/85 hover:bg-[#1C3022] text-white transition-colors shadow-md cursor-pointer z-10"
                    title={isEn ? "Next photo" : "Photo suivante"}
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                  
                  {/* Photo Counter Pill */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#1C3022]/90 border border-[#5B9B6E] text-[10px] font-bold text-white z-10">
                    {activeImageIndex + 1} / {imagesList.length} {t('detail.photos_suffix')}
                  </div>
                </>
              )}
            </div>

            {/* Gallery Thumbnails Strip */}
            {imagesList.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-700">
                  <Eye className="w-3.5 h-3.5 text-[#76BD43]" />
                  <span>{t('detail.all_images')} ({imagesList.length}) :</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {imagesList.map((imgUrl, idx) => {
                    const isCurrent = idx === activeImageIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-white p-0.5 ${
                          isCurrent
                            ? 'border-[#5B9B6E] shadow-md ring-2 ring-[#76BD43]/40 scale-105'
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
              <div className="flex items-center gap-2 text-[#1C3022] font-bold text-xs">
                <MapPin className="w-4 h-4 text-[#1C3022]" />
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
                    <Award className="w-3 h-3 text-[#1C3022]" />
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
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C3022] block">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#2A4833] text-white border border-[#5B9B6E] shadow-xs">
                  <span>{regionConfig.flag}</span>
                  <span>{regionConfig.name}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#1F2937] mt-1">
                {product.title}
              </h2>
              {product.slogan && (
                <p className="text-sm font-serif italic text-[#1C3022] font-medium mt-1">
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
                        <Check className="w-3.5 h-3.5 text-[#1C3022] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage / Conseils */}
              {product.usageInstructions && (
                <div className="mt-4 p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-[#1C3022] flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#1C3022]" />
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
                      <Layers className="w-3.5 h-3.5 text-[#1C3022]" />
                      <span>{isEn ? "Select Available Size / Format :" : "Chwazi Fòma ki Disponib :"}</span>
                    </span>
                    {isExport && (
                      <span className="text-white font-bold text-[11px] bg-[#E59500] text-stone-950 px-2 py-0.5 rounded border border-[#D97706] shadow-xs">
                        {isEn ? "Gallon" : "Fòma Galon"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {allFormats.map((fmt, fmtIdx) => {
                      const isSelected = selectedFormat === fmt;
                      const fmtPrice = getRegionalPrice(product, fmt, activeRegion);
                      const getFmtLabel = () => {
                        if (product.id === 'huile-de-ricin') {
                          if (fmt.includes('2oz')) return '250 Gdes';
                          if (fmt.includes('4oz')) return '500 Gdes';
                          if (fmt.toLowerCase().includes('galon') || fmt.toLowerCase().includes('gallon') || fmt.includes('128oz')) return '$70.00 USD';
                        }
                        if (product.formatPricing?.[fmt]?.priceHTG && activeRegion === 'haiti') {
                          return `${product.formatPricing[fmt].priceHTG} HTG`;
                        }
                        return `$${fmtPrice.priceUSD.toFixed(2)} USD`;
                      };

                      return (
                        <button
                          key={`${product.id}-modal-fmt-${fmt}-${fmtIdx}`}
                          onClick={() => setSelectedFormat(fmt)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#5B9B6E] bg-[#1C3022] text-white ring-2 ring-[#76BD43]'
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}
                        >
                          <div className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-[#1F2937]'}`}>{fmt}</div>
                          <div className={`text-[11px] font-extrabold mt-0.5 ${isSelected ? 'text-[#76BD43]' : 'text-[#1C3022]'}`}>
                            {getFmtLabel()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Display Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF7F0] p-4 rounded-xl border border-[#3D684A]/30">
                <div>
                  <span className="text-xs text-stone-600 font-semibold block">
                    {isEn ? "Price for selected format :" : "Pri pou fòma sa a :"}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#1C3022]">
                      {(() => {
                        if (product.id === 'huile-de-ricin') {
                          if (selectedFormat.includes('2oz')) return '250 Gdes';
                          if (selectedFormat.includes('4oz')) return '500 Gdes';
                          if (selectedFormat.toLowerCase().includes('galon') || selectedFormat.toLowerCase().includes('gallon') || selectedFormat.includes('128oz')) return '$70.00 USD';
                        }
                        if (product.formatPricing?.[selectedFormat]?.priceHTG && activeRegion === 'haiti') {
                          return `${product.formatPricing[selectedFormat].priceHTG} HTG`;
                        }
                        return `$${regionalPrice.priceUSD.toFixed(2)} USD`;
                      })()}
                    </span>
                    <span className="text-xs font-bold text-[#7C3F1B]">
                      ({selectedFormat})
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  ✓ {isEn ? "Direct Factory Price" : "Pri Fiks San Entèmedyè"}
                </div>
              </div>

              {/* Physical Pickup Addresses in Haiti & USA */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#1C3022] uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#E59500]" />
                  <span>{isEn ? "Corporate Offices & Pickup Locations (Haiti & USA) :" : "Sièges Sociaux & Points de Retrait (Haïti & USA) :"}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-left">
                  {/* Haiti Hub */}
                  <div className="p-3 rounded-xl bg-[#FDFBF7] border border-stone-200 space-y-1 text-left">
                    <div className="font-bold text-[#1C3022] flex items-center gap-1.5">
                      <span>🇭🇹</span>
                      <span>Biwo Caracol (Haïti)</span>
                    </div>
                    <p className="text-[11px] text-stone-700 font-semibold">
                      B6-39, Village Ekam, Caracol, Haïti
                    </p>
                    <p className="text-[11px] text-[#3D684A] font-bold">
                      Tél : +509 3834-6371 / 3559-3385
                    </p>
                    <p className="text-[10px] text-stone-500">
                      panyenlokalsa@gmail.com
                    </p>
                  </div>

                  {/* USA Hub */}
                  <div className="p-3 rounded-xl bg-[#FDFBF7] border border-stone-200 space-y-1 text-left">
                    <div className="font-bold text-[#1C3022] flex items-center gap-1.5">
                      <span>🇺🇸</span>
                      <span>PANYEN LOKAL INC (USA)</span>
                    </div>
                    <p className="text-[11px] text-stone-700 font-semibold">
                      7400 W Oakland Park Blvd, Unit 1125, Lauderhill, Florida 33319
                    </p>
                    <p className="text-[11px] text-[#3D684A] font-bold">
                      Tél : 781-469-8708
                    </p>
                    <p className="text-[10px] text-stone-500">
                      Distribution USA & Diaspora
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Reservation & Store Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/50938346371?text=${encodeURIComponent(
                    `Bonjour Panyen Lokal, je souhaite réserver ou commander le produit "${product.title}" (${selectedFormat}). Merci de m'indiquer la disponibilité pour retrait ou livraison.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs shadow transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>{isEn ? "Reserve on WhatsApp" : "Réserver sur WhatsApp"}</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('points-de-vente');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="py-3.5 px-4 rounded-xl bg-[#1C3022] hover:bg-[#2A4833] text-white font-bold text-xs border border-[#3D684A] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#76BD43]" />
                  <span>{isEn ? "View Official Locations & Hours" : "Voir Sièges & Adresses Complètes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

