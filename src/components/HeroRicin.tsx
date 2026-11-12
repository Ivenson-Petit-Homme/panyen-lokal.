import React, { useState, useEffect } from 'react';
import { Product, PageRoute, DeliveryRegion } from '../types';
import { useLanguage } from '../context/LanguageContext';
import fondChamp1 from '../assets/images/fond_champ_agricole_1_1786847528994.jpg';
import fondChamp2 from '../assets/images/fond_champ_agricole_2_1786847542034.jpg';
import fondChamp3 from '../assets/images/fond_champ_agricole_3_1786847552367.jpg';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight,
  ChevronLeft
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
  const isEn = language === 'en';
  const backgroundSlides = [
    { id: 0, image: fondChamp1, alt: "Champs fertiles et plantations agricoles de Panyen Lokal en Haïti" },
    { id: 1, image: fondChamp2, alt: "Récoltes agricoles et terroirs agroforestiers d'Haïti" },
    { id: 2, image: fondChamp3, alt: "Agriculture durable et production nationale dans le Nord-Est d'Haïti" }
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundSlides.length]);

  return (
    <section 
      id="hero-enterprise-section" 
      className="relative overflow-hidden text-white min-h-[72vh] sm:min-h-[80vh] flex items-center justify-center"
    >
      {/* Photographies d'arrière-plan naturelles */}
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

        <div className="absolute inset-0 bg-gradient-to-t from-[#1C3022]/95 via-[#1C3022]/75 to-[#1C3022]/45 z-1" />
      </div>

      {/* Contenu Principal Épuré (Sans répétition de noms de produits ni de boîtes surchargées) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-6 py-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#76BD43] uppercase"
        >
          {isEn ? "Haitian Agro-Industry · North-East" : "Agro-Industrie Haïtienne · Nord-Est"}
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.15] drop-shadow-lg text-balance"
        >
          {t('hero.title_line1')}{' '}
          <span className="text-white italic font-normal block mt-2 text-2xl sm:text-4xl lg:text-5xl">
            {t('hero.title_line2')}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-white/90 font-normal max-w-2xl mx-auto leading-relaxed"
        >
          {isEn
            ? "From Haitian soil to international markets: refined agricultural treasures crafted under strict quality standards."
            : "De la terre haïtienne aux marchés internationaux : une filière intégrée dédiée à l'excellence de nos terroirs."}
        </motion.p>

        {/* Deux Boutons d'Action Clairs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            id="btn-hero-view-products"
            onClick={() => {
              const el = document.getElementById('featured-products-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setCurrentRoute('produits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="px-7 py-3.5 rounded-xl bg-[#E59500] hover:bg-[#D97706] text-stone-950 font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>{isEn ? "Explore Collection" : "Explorer la Collection"}</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </button>

          <button
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
            className="px-7 py-3.5 rounded-xl bg-[#2A4833]/90 hover:bg-[#3D684A] text-white font-semibold text-sm shadow-lg transition-all border border-[#5B9B6E] cursor-pointer whitespace-nowrap"
          >
            <span>{t('hero.btn.discover')}</span>
          </button>
        </div>
      </div>

      {/* Points de Navigation Discrets */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#1C3022]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#3D684A]">
        <button
          onClick={() => setCurrentBgIndex((prev) => (prev === 0 ? backgroundSlides.length - 1 : prev - 1))}
          className="text-white/70 hover:text-white p-0.5 transition-colors cursor-pointer"
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
                ? 'w-6 bg-[#E59500]'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Photo ${idx + 1}`}
          />
        ))}

        <button
          onClick={() => setCurrentBgIndex((prev) => (prev + 1) % backgroundSlides.length)}
          className="text-white/70 hover:text-white p-0.5 transition-colors cursor-pointer"
          aria-label="Photo suivante"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
