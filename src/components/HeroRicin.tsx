import React, { useState, useEffect } from 'react';
import { Product, PageRoute, DeliveryRegion } from '../types';
import { useLanguage } from '../context/LanguageContext';
import fondChamp1 from '../assets/images/fond_champ_agricole_1_1786847528994.jpg';
import fondChamp2 from '../assets/images/fond_champ_agricole_2_1786847542034.jpg';
import fondChamp3 from '../assets/images/fond_champ_agricole_3_1786847552367.jpg';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShoppingBag, 
  FileText, 
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

interface HeroRicinProps {
  ricinProduct: Product;
  onAddToCart: (product: Product, selectedFormat: string, quantity: number) => void;
  onRequestQuote: (product: Product, format?: string) => void;
  setCurrentRoute: (route: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
  selectedRegion?: DeliveryRegion;
}

export const HeroRicin: React.FC<HeroRicinProps> = ({
  setCurrentRoute
}) => {
  const { language, t } = useLanguage();
  const backgroundSlides = [
    { id: 0, image: fondChamp1, alt: "Champs fertiles et plantations agricoles de Panyen Lokal en Haïti" },
    { id: 1, image: fondChamp2, alt: "Récoltes de ricin et terroirs agroforestiers d'Haïti" },
    { id: 2, image: fondChamp3, alt: "Agriculture durable et production nationale à Caracol et Grand Bassin" }
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState<number>(0);

  // Défilement automatique fluide toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundSlides.length]);

  return (
    <section 
      id="hero-enterprise-section" 
      className="relative overflow-hidden text-white min-h-[78vh] sm:min-h-[84vh] flex items-center justify-center"
    >
      {/* 1. PHOTOGRAPHIES D'ARRIÈRE-PLAN NATURELLES SANS TEXTES NI SURCHARGE */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {backgroundSlides.map((slide, index) => {
          const isActive = index === currentBgIndex;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.04 : 1
              }}
              transition={{ 
                opacity: { duration: 1.4, ease: "easeInOut" },
                scale: { duration: 8, ease: "easeOut" }
              }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          );
        })}

        {/* Voile sombre vert naturel raffiné pour garantir la clarté et la netteté de l'image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#143527]/95 via-[#1B4332]/75 to-[#2D6A4F]/50 z-1" />
      </div>

      {/* 2. CONTENU PRINCIPAL ÉPURÉ & ÉLÉGANT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143527]/90 border border-white text-white text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>{t('hero.tag')}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.15] drop-shadow-lg"
        >
          {t('hero.title_line1')} <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white italic font-normal text-2xl sm:text-4xl lg:text-5xl block mt-2 drop-shadow"
          >
            {t('hero.title_line2')}
          </motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow"
          style={{ color: '#FFFFFF' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Boutons d'Action Clairs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            id="btn-hero-discover-company"
            onClick={() => {
              const el = document.getElementById('presentation-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setCurrentRoute('a-propos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer border border-[#2D6A4F]"
          >
            <span>{t('hero.btn.discover')}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            id="btn-hero-view-products"
            onClick={() => {
              setCurrentRoute('produits');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl bg-[#1B4332]/90 hover:bg-[#143527] text-white font-bold text-sm border border-[#2D6A4F] hover:border-white backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>{t('hero.btn.products')}</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            id="btn-hero-export-quote"
            onClick={() => {
              setCurrentRoute('marches-export');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-3.5 rounded-xl bg-[#1B4332]/90 hover:bg-[#143527] text-white font-bold text-sm border border-[#2D6A4F] hover:border-white backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>{t('hero.btn.export_quote')}</span>
          </motion.button>
        </div>

        {/* Badge récapitulatif officiel : Kote nou ye & 5 Pwodwi yo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="pt-4 max-w-3xl mx-auto"
        >
          <div className="bg-[#143527]/95 border border-white/30 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 text-left shadow-2xl space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D6A4F] pb-2 text-xs">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <span className="text-base">📍</span>
                <span className="text-white">{t('hero.badge.location')}</span>
              </span>
              <span className="text-[11px] text-white bg-[#1B4332] px-2 py-0.5 rounded font-semibold border border-white/30">
                {t('hero.badge.address')}
              </span>
            </div>
            <div className="text-[11px] sm:text-xs text-white flex flex-wrap items-center gap-x-3 gap-y-1.5 font-medium">
              <span className="font-bold text-white">{t('hero.badge.products_label')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-white font-semibold">{t('hero.prod1')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-white font-semibold">{t('hero.prod2')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-white font-semibold">{t('hero.prod3')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-white font-semibold">{t('hero.prod4')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-white font-semibold">{t('hero.prod5')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. POINTS DE NAVIGATION DU DIAPORAMA EN BAS (DISCRETS & ÉLÉGANTS) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#143527]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#2D6A4F]">
        <button
          onClick={() => setCurrentBgIndex((prev) => (prev === 0 ? backgroundSlides.length - 1 : prev - 1))}
          className="text-[#FDFBF7]/70 hover:text-white p-0.5 transition-colors cursor-pointer"
          aria-label="Photo précédente"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {backgroundSlides.map((slide, idx) => (
          <button
            key={slide.id}
            id={`hero-dot-${idx}`}
            onClick={() => setCurrentBgIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentBgIndex === idx
                ? 'w-6 bg-[#E9C46A] shadow-sm'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Photo ${idx + 1}`}
          />
        ))}

        <button
          onClick={() => setCurrentBgIndex((prev) => (prev + 1) % backgroundSlides.length)}
          className="text-[#FDFBF7]/70 hover:text-white p-0.5 transition-colors cursor-pointer"
          aria-label="Photo suivante"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};

