import React, { useState, useEffect } from 'react';
import { PageRoute, DeliveryRegion, UserAccount } from '../types';
import panyenLogo from '../assets/images/LOGO_PANYEN.png';
import champImg from '../assets/images/champ_panyen_lokal_1786858968582.jpg';
import usineExtImg from '../assets/images/usine_exterieur_ekam_1786859382526.jpg';
import souveraineteImg from '../assets/images/souverainete_marche_1786859004801.jpg';
import ricinFlaconImg from '../assets/images/huile_ricin_flacon_1786847591002.jpg';

import { useLanguage } from '../context/LanguageContext';
import { 
  getFourPillars, 
  getServicesList, 
  getFlagshipProducts, 
  getProcessSteps, 
  getTerroirs, 
  getGalleryItems,
  GalleryItemData
} from '../data/agriShowcaseData';

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { 
  Factory, 
  MapPin, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Maximize2, 
  X, 
  Sliders,
  Building2,
  ExternalLink,
  ChevronRight
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

  const [selectedTerroir, setSelectedTerroir] = useState<number>(0);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [lightboxImg, setLightboxImg] = useState<GalleryItemData | null>(null);

  const fourPillars = getFourPillars(isEn);
  const servicesList = getServicesList(isEn);
  const flagshipProducts = getFlagshipProducts(isEn);
  const processSteps = getProcessSteps(isEn);
  const terroirs = getTerroirs(isEn);
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
      
      {/* ========================================================================= */}
      {/* 1. PRÉSENTATION INSTITUTIONNELLE OFFICIELLE */}
      {/* ========================================================================= */}
      <section id="presentation-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeInSection threshold={0.15}>
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E9C46A]/30 shadow-xl space-y-10 relative overflow-hidden">
            
            {/* En-tête Institutionnel & Logo */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 border-b border-stone-100 pb-8">
              <div className="relative shrink-0 group">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-2 shadow-xl border-2 border-[#1B4332] overflow-hidden ring-4 ring-[#1B4332]/10">
                  <img
                    src={panyenLogo}
                    alt="Logo Officiel Panyen Lokal"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#2E7D32] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  <span>{t('pres.official_badge')}</span>
                </div>
              </div>

              <div className="space-y-3 text-center lg:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/30 text-[#1B4332] font-black text-xs uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-[#1B4332]" />
                  <span>{t('pres.tag')}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1B4332] tracking-tight">
                  {t('pres.title')}
                </h2>
                
                <p className="text-xs sm:text-sm text-stone-600 font-semibold flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="flex items-center gap-1 text-[#1F2937]">
                    <MapPin className="w-4 h-4 text-[#2E7D32]" />
                    {t('pres.location')}
                  </span>
                  <span>•</span>
                  <span className="text-[#1F2937] font-bold">
                    {t('pres.network')}
                  </span>
                </p>
              </div>
            </div>

            {/* Corps de Texte & Mission de l'Entreprise */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B4332] leading-snug">
                  {t('pres.subtitle')}
                </h3>
                
                <p className="text-sm sm:text-base text-[#1F2937]/90 leading-relaxed">
                  <strong>{t('pres.title')}</strong> {t('pres.p1')}
                </p>

                <p className="text-sm sm:text-base text-[#1F2937]/90 leading-relaxed">
                  {t('pres.p2')}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentRoute('a-propos');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white border border-[#1B4332] font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow"
                  >
                    <span>{t('pres.btn_mission')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9C46A]" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRoute('marches-export');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow border border-[#388E3C]"
                  >
                    <span>{t('pres.btn_export')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Mosaïque Visuelle d'Entreprise */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden shadow-md border border-stone-200 h-36"
                >
                  <ImageWithSkeleton src={champImg} alt="Fields in Caracol" containerClassName="w-full h-full" imgClassName="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
                <motion.div
                  initial={{ clipPath: 'inset(0 0 0 100%)' }}
                  whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden shadow-md border border-stone-200 h-36"
                >
                  <ImageWithSkeleton src={usineExtImg} alt="EKAM Caracol plant" containerClassName="w-full h-full" imgClassName="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
                <motion.div
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden shadow-md border border-stone-200 h-36"
                >
                  <ImageWithSkeleton src={souveraineteImg} alt="Food sovereignty" containerClassName="w-full h-full" imgClassName="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden shadow-md border border-[#2E7D32] h-36 bg-[#1B4332] p-2 flex items-center justify-center"
                >
                  <ImageWithSkeleton src={ricinFlaconImg} alt="Castor oil bottle" containerClassName="w-full h-full flex items-center justify-center rounded-xl" imgClassName="w-full h-full object-contain" />
                </motion.div>
              </div>
            </div>

            {/* 4 Chiffres Clés d'Impact */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-100 text-center" staggerDelay={0.08}>
              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1B4332] block"
                >
                  <Counter value={t('pres.stat1_value')} />
                </motion.span>
                <span className="text-xs text-stone-600 font-medium">{t('pres.stat1_label')}</span>
              </StaggerItem>

              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1B4332] block"
                >
                  <Counter value={t('pres.stat2_value')} />
                </motion.span>
                <span className="text-xs text-stone-600 font-medium">{t('pres.stat2_label')}</span>
              </StaggerItem>

              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1B4332] block"
                >
                  {t('pres.stat3_value')}
                </motion.span>
                <span className="text-xs text-stone-600 font-medium">{t('pres.stat3_label')}</span>
              </StaggerItem>

              <StaggerItem className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1B4332] block"
                >
                  <Counter value={t('pres.stat4_value')} />
                </motion.span>
                <span className="text-xs text-stone-600 font-medium">{t('pres.stat4_label')}</span>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </FadeInSection>
      </section>

      {/* ========================================================================= */}
      {/* 2. LES 4 GRANDS PILIERS D'IMPACT D'ENTREPRISE (AVEC PHOTOS) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-stone-100/50">
        <FadeInSection threshold={0.2} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider border border-[#1B4332]/20">
            <Factory className="w-4 h-4 text-[#1B4332]" />
            <span>{t('pillars.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1B4332] tracking-tight">
            {t('pillars.title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            {t('pillars.subtitle')}
          </p>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.12}>
          {fourPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem
                key={pillar.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden group"
              >
                {/* Photo du Pilier */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#143527]/90 via-[#1B4332]/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#E9C46A] text-[#1F2937] border border-black/20 shadow">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E9C46A] bg-[#143527]/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-[#E9C46A]/40">
                      {pillar.tag}
                    </span>
                  </div>
                </div>

                {/* Contenu du Pilier */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#E9C46A] flex items-center justify-center shadow">
                        <Icon className="w-5 h-5 text-[#E9C46A]" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#1B4332] group-hover:text-[#2E7D32] transition-colors">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs font-medium text-[#1F2937] bg-[#FDFBF7] p-3 rounded-xl border border-stone-200">
                      {pillar.lead}
                    </p>

                    <ul className="space-y-2 pt-1">
                      {pillar.details.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
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

      {/* ========================================================================= */}
      {/* 3. NOS 5 GRANDES FILIÈRES & PRODUITS D'EXCELLENCE */}
      {/* ========================================================================= */}
      <section className="bg-[#1B4332] text-[#FDFBF7] py-16 sm:py-20 border-y border-[#265943]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection threshold={0.2} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#265943] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C46A]/20 text-[#E9C46A] text-xs font-black uppercase tracking-wider mb-2 border border-[#E9C46A]">
                <Award className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span>{t('flagship.tag')}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {t('flagship.title')}
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentRoute('produits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E9C46A] hover:text-[#f3d993] transition-colors cursor-pointer"
            >
              <span>{t('flagship.view_all')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E9C46A]" />
            </button>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5" staggerDelay={0.09}>
            {flagshipProducts.map((prod) => {
              return (
                <StaggerItem
                  key={prod.id}
                  className="bg-[#143527] rounded-2xl border border-[#2d6a4f] overflow-hidden flex flex-col justify-between group hover:border-[#E9C46A] transition-all hover:shadow-xl"
                >
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-[#1B4332] w-full flex items-center justify-center p-3">
                    <ImageWithSkeleton
                      src={prod.image}
                      alt={prod.title}
                      containerClassName="w-full h-full flex items-center justify-center rounded-xl"
                      imgClassName="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#1B4332]/90 text-[#E9C46A] border border-[#E9C46A]/40 backdrop-blur-xs">
                        {prod.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#E9C46A] uppercase tracking-wide block">
                        {prod.category}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-white mt-0.5">
                        {prod.title}
                      </h4>
                      <p className="text-[11px] text-[#FDFBF7]/80 mt-1 line-clamp-2">
                        {prod.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentRoute('produits');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border border-[#388E3C]"
                    >
                      <span>{t('flagship.discover')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GALERIE OFFICIELLE DES MEMBRES & ÉQUIPES PANYEN LOKAL */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <FadeInSection threshold={0.15} className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/30 text-[#1B4332] text-xs font-black uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>{t('gallery.tag')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#1B4332] tracking-tight">
              {t('gallery.title')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {t('gallery.desc')}
            </p>
          </div>

          {/* Filtres par Groupes / Départements */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {galleryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGalleryFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === tab.id
                    ? 'bg-[#1B4332] text-white shadow-md font-black'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t(tab.labelKey as TranslationKey)}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Grille des Membres Interactive */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {filteredGallery.map((item) => (
            <StaggerItem
              key={item.id}
              onClick={() => setLightboxImg(item)}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#1B4332]"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900 w-full flex items-center justify-center">
                <ImageWithSkeleton
                  src={item.src}
                  alt={item.title}
                  containerClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="p-3 rounded-full bg-white/90 text-[#1B4332] shadow-xl backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#1B4332] text-[#E9C46A] border border-[#E9C46A]/40 shadow">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5 z-10">
                  <span className="text-[11px] font-bold text-[#E9C46A] uppercase tracking-wider block">
                    {item.role}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-white drop-shadow-sm line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#1B4332]">
                    <MapPin className="w-3 h-3 text-[#2E7D32]" />
                    <span>{item.loc}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                    {item.tags.map((tTag, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#1B4332]/5 text-[#1B4332] border border-[#1B4332]/10">
                        {tTag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ========================================================================= */}
      {/* 5. NOS 4 PÔLES DE SERVICES AGRO-INDUSTRIELS */}
      {/* ========================================================================= */}
      <section className="bg-stone-100/60 py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection threshold={0.2} className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/30 text-[#1B4332] text-xs font-black uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>{t('services.tag')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1B4332]">
              {t('services.title')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t('services.desc')}
            </p>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {servicesList.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <StaggerItem 
                  key={service.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:border-[#1B4332] transition-all hover:shadow-lg group"
                >
                  <div className="h-36 overflow-hidden relative bg-stone-900">
                    <ImageWithSkeleton 
                      src={service.image} 
                      alt={service.title} 
                      containerClassName="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="text-[10px] font-bold uppercase text-white bg-[#2E7D32] px-2 py-0.5 rounded shadow font-black">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-[#1B4332] text-[#E9C46A] flex items-center justify-center shadow">
                        <ServiceIcon className="w-4 h-4 text-[#E9C46A]" />
                      </div>
                      <h3 className="font-serif font-bold text-sm text-[#1B4332] group-hover:text-[#2E7D32] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200">
                      <p className="text-[11px] font-semibold text-stone-500">
                        {service.details}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeInSection threshold={0.2} className="text-center pt-4">
            <button
              onClick={() => {
                setCurrentRoute('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white border border-[#2d6a4f] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>{t('services.cta')}</span>
              <ArrowRight className="w-4 h-4 text-[#E9C46A]" />
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PROCESSUS INDUSTRIEL EN 5 ÉTAPES */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <FadeInSection threshold={0.2} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/30 text-[#1B4332] text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>{t('process.tag')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1B4332]">
            {t('process.title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {t('process.desc')}
          </p>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4" staggerDelay={0.08}>
          {processSteps.map((step, idx) => {
            return (
              <StaggerItem 
                key={idx} 
                className="bg-white rounded-2xl border border-stone-200 shadow-sm relative flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-28 overflow-hidden relative bg-stone-900">
                  <ImageWithSkeleton
                    src={step.image}
                    alt={step.title}
                    containerClassName="w-full h-full"
                    imgClassName="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#2E7D32] text-white text-xs font-black px-2 py-0.5 rounded shadow z-10">
                    {step.step}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xs text-[#1B4332] leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  <div className="h-1 w-full bg-stone-200 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-[#2E7D32] w-full" />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ========================================================================= */}
      {/* 7. TERROIRS & BASSINS DE PRODUCTION D'HAÏTI */}
      {/* ========================================================================= */}
      <section className="bg-[#1B4332] text-[#FDFBF7] py-16 sm:py-20 border-t border-[#265943]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInSection threshold={0.2} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#265943] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C46A]/20 text-[#E9C46A] text-xs font-black uppercase tracking-wider mb-2 border border-[#E9C46A]">
                <MapPin className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span>{t('terroirs.tag')}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {t('terroirs.title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#FDFBF7]/80 max-w-md">
              {t('terroirs.desc')}
            </p>
          </FadeInSection>

          <FadeInSection threshold={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Terroir Selectors */}
            <div className="lg:col-span-5 space-y-3">
              {terroirs.map((tItem, idx) => {
                const isSelected = selectedTerroir === idx;
                return (
                  <button
                    key={tItem.id}
                    onClick={() => setSelectedTerroir(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#E9C46A] text-[#1F2937] border-[#E9C46A] shadow-lg font-bold'
                        : 'bg-[#143527] hover:bg-[#1a4432] text-[#FDFBF7] border-[#2d6a4f]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                      isSelected ? 'bg-[#1B4332] text-[#E9C46A]' : 'bg-[#143527] text-[#E9C46A] border border-[#2d6a4f]'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <span className={`text-xs uppercase tracking-wider font-semibold block ${isSelected ? 'text-[#1F2937] font-black' : 'text-[#E9C46A]'}`}>
                        {tItem.region}
                      </span>
                      <h4 className="text-sm font-serif font-bold mt-0.5">
                        {tItem.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Terroir Detail Focus Display avec photo */}
            <div className="lg:col-span-7 bg-[#143527] rounded-3xl overflow-hidden border border-[#2d6a4f] space-y-6">
              <div className="h-48 overflow-hidden relative bg-black/20">
                <ImageWithSkeleton
                  src={terroirs[selectedTerroir].image}
                  alt={terroirs[selectedTerroir].title}
                  containerClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#143527] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F2937] bg-[#E9C46A] px-3 py-1 rounded-full border border-black/20">
                    {terroirs[selectedTerroir].stats}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 pt-0">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {terroirs[selectedTerroir].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FDFBF7]/90 leading-relaxed">
                  {terroirs[selectedTerroir].desc}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase text-[#E9C46A] block">
                    {t('terroirs.crops_label')}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {terroirs[selectedTerroir].products.map((prod, pIdx) => (
                      <span key={pIdx} className="px-3 py-1 rounded-lg bg-[#1B4332] text-[#E9C46A] text-xs font-semibold border border-[#2d6a4f]">
                        🌿 {prod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2d6a4f] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setCurrentRoute('partenariats');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E9C46A] hover:text-[#f3d993] transition-colors cursor-pointer"
                  >
                    <span>{t('terroirs.btn_partnerships')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9C46A]" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRoute('marches-export');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs transition-colors cursor-pointer shadow border border-[#388E3C]"
                  >
                    {t('terroirs.btn_b2b')}
                  </button>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MODAL LIGHTBOX AGRANDISSEMENT PHOTO */}
      {/* ========================================================================= */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl p-3 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 hover:bg-black text-white transition-colors cursor-pointer"
                title={isEn ? "Close" : "Fermer"}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
                <ImageWithSkeleton
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  containerClassName="max-h-[68vh] w-auto max-w-full flex items-center justify-center"
                  imgClassName="max-h-[68vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="w-full text-center py-3 px-4 space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  📍 {lightboxImg.loc} • Panyen Lokal
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
