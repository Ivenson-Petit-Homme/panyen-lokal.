import React, { useState, useEffect } from 'react';
import { PageRoute, DeliveryRegion, UserAccount } from '../types';
import panyenLogo from '../assets/images/LOGO_PANYEN.png';
import usineExtImg from '../assets/images/usine_exterieur_ekam_1786859382526.jpg';

import { useLanguage } from '../context/LanguageContext';
import { 
  getFourPillars, 
  getGalleryItems,
  GalleryItemData
} from '../data/agriShowcaseData';

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Maximize2, 
  X, 
  ExternalLink
} from 'lucide-react';
import { TranslationKey } from '../utils/translations';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, numericValue, { duration, ease: "easeOut" });
    return controls.stop;
  }, [numericValue, count, duration]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);

  return <>{displayValue}{suffix}</>;
};

interface AgriEnterpriseShowcaseProps {
  setCurrentRoute: (route: PageRoute) => void;
  selectedRegion?: DeliveryRegion;
  openRegionSelector?: () => void;
  currentUser?: UserAccount | null;
  openAuthModal?: (notice?: string) => void;
}

export const AgriEnterpriseShowcase: React.FC<AgriEnterpriseShowcaseProps> = ({
  setCurrentRoute
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [lightboxImg, setLightboxImg] = useState<GalleryItemData | null>(null);

  const fourPillars = getFourPillars(isEn);
  const galleryItems = getGalleryItems(isEn);

  const filteredGallery = galleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  const galleryTabs = [
    { id: 'all', labelKey: 'gallery.filter_all' },
    { id: 'direction', labelKey: 'gallery.filter_direction' },
    { id: 'production', labelKey: 'gallery.filter_production' },
    { id: 'agronomie', labelKey: 'gallery.filter_agronomie' },
    { id: 'operations', labelKey: 'gallery.filter_operations' }
  ];

  return (
    <div id="agri-enterprise-showcase" className="bg-[#FDFBF7] text-[#1F2937] overflow-hidden">
      
      {/* 1. PRÉSENTATION INSTITUTIONNELLE (SANS RÉPÉTITION DE NOMS DE PRODUITS NI PHOTOS DOUBLONS) */}
      <section id="presentation-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeInSection threshold={0.15}>
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200 shadow-sm space-y-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-sm border border-stone-200 shrink-0">
                      <img
                        src={panyenLogo}
                        alt="Logo Panyen Lokal"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3D684A]">
                        {isEn ? "National Agro-Industrial Enterprise" : "Entreprise Agro-Industrielle Nationale"}
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C3022] tracking-tight">
                        PANYEN LOKAL S.A.
                      </h2>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C3022] leading-snug text-balance">
                    {t('pres.subtitle')}
                  </h3>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                    {isEn
                      ? "Rooted in the North-East at the Village EKAM industrial hub, our organization transforms agricultural harvests locally under strict quality protocols while ensuring long-term economic stability for rural partner cooperatives."
                      : "Implantée au complexe industriel du Village EKAM dans le Nord-Est, notre société transforme localement les récoltes agricoles selon des protocoles rigoureux tout en assurant une prospérité durable aux coopératives paysannes."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentRoute('a-propos');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>{t('pres.btn_mission')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E59500]" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRoute('marches-export');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#1C3022] font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>{t('pres.btn_export')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Photo unique du complexe industriel */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-stone-200 min-h-[260px] lg:h-full">
                <ImageWithSkeleton 
                  src={usineExtImg} 
                  alt="Complexe industriel du Village EKAM" 
                  containerClassName="w-full h-full" 
                  imgClassName="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* 4 Chiffres Clés Uniques */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-stone-100 text-center" staggerDelay={0.08}>
              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1C3022] block tabular-nums">
                  <Counter value="850+" />
                </span>
                <span className="text-xs text-stone-600 font-medium">{t('pres.stat1_label')}</span>
              </StaggerItem>

              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1C3022] block tabular-nums">
                  <Counter value="1650" />
                </span>
                <span className="text-xs text-stone-600 font-medium">
                  {isEn ? "Cultivated Hectares" : "Hectares Cultivés"}
                </span>
              </StaggerItem>

              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1C3022] block tabular-nums">
                  6
                </span>
                <span className="text-xs text-stone-600 font-medium">
                  {isEn ? "Agricultural Regions" : "Départements Couverts"}
                </span>
              </StaggerItem>

              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1C3022] block tabular-nums">
                  100%
                </span>
                <span className="text-xs text-stone-600 font-medium">{t('pres.stat2_label')}</span>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </FadeInSection>
      </section>

      {/* 2. LES 4 PILIERS STRATÉGIQUES (PHOTOS UNIQUES NON RÉPÉTÉES) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 border-t border-stone-200/70">
        <FadeInSection threshold={0.2} className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3D684A]">
            {isEn ? "Integrated Model" : "Modèle Intégré"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C3022] tracking-tight text-balance">
            {t('pillars.title')}
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            {t('pillars.subtitle')}
          </p>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1}>
          {fourPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem
                key={pillar.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                <div className="relative h-52 overflow-hidden bg-stone-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3022]/85 via-[#1C3022]/25 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold tracking-wide text-[#E59500]">
                      {pillar.badge} · {pillar.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#2A4833] text-white flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#1C3022]">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                      {pillar.lead}
                    </p>

                    <ul className="space-y-1.5 pt-1 pl-0 list-none">
                      {pillar.details.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-stone-600 mb-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3D684A] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* 3. GOUVERNANCE & ÉQUIPES (8 PORTRAITS UNIQUES) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 border-t border-stone-200/70">
        <FadeInSection threshold={0.15} className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3D684A]">
              {isEn ? "Leadership & Teams" : "Gouvernance & Équipes"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C3022] tracking-tight text-balance">
              {t('gallery.title')}
            </h2>
            <p className="text-sm text-stone-600">
              {isEn
                ? "The executives, engineers, plant specialists, and cooperative delegates driving our operations."
                : "Les dirigeants, ingénieurs, techniciens et représentants agricoles qui animent nos opérations."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {galleryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGalleryFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  galleryFilter === tab.id
                    ? 'bg-[#2A4833] text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-[#5B9B6E]'
                }`}
              >
                {t(tab.labelKey as TranslationKey)}
              </button>
            ))}
          </div>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
          {filteredGallery.map((item) => (
            <StaggerItem
              key={item.id}
              onClick={() => setLightboxImg(item)}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#5B9B6E]"
            >
              <div className="relative h-64 overflow-hidden bg-stone-900 w-full">
                <ImageWithSkeleton
                  src={item.src}
                  alt={item.title}
                  containerClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="p-2.5 rounded-full bg-white/90 text-[#1C3022] shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white z-10">
                  <span className="text-[11px] font-semibold text-[#E59500] block">
                    {item.role}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-white line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-500">
                    <MapPin className="w-3 h-3 text-[#3D684A]" />
                    <span>{item.loc}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 text-[11px] font-medium text-[#3D684A]">
                  {item.tags.join(' · ')}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* MODAL LIGHTBOX */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImg(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl p-3 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 hover:bg-black text-white transition-colors cursor-pointer"
                title={isEn ? "Close" : "Fermer"}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
                <ImageWithSkeleton
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  containerClassName="max-h-[68vh] w-auto max-w-full flex items-center justify-center"
                  imgClassName="max-h-[68vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="w-full text-center py-3 px-4 space-y-1">
                <span className="text-[11px] font-semibold text-[#E59500] block">
                  {lightboxImg.role} · {lightboxImg.loc}
                </span>
                <h3 className="text-base font-serif font-bold text-white">
                  {lightboxImg.title}
                </h3>
                <p className="text-xs text-stone-300">
                  {lightboxImg.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
