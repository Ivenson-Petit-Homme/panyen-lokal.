import React, { useState, useEffect } from 'react';
import { Product, PageRoute, DeliveryRegion } from '../types';
import { useLanguage } from '../context/LanguageContext';
import fondChamp1 from '../assets/images/fond_champ_agricole_1_1786847528994.jpg';
import fondChamp2 from '../assets/images/fond_champ_agricole_2_1786847542034.jpg';
import fondChamp3 from '../assets/images/fond_champ_agricole_3_1786847552367.jpg';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

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
      className="relative overflow-hidden text-white min-h-[76vh] sm:min-h-[82vh] flex items-center bg-[#1C3022]"
    >
      {/* Photographie plein écran style WWF.fr */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {backgroundSlides.map((slide, index) => {
          const isActive = index === currentBgIndex;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.03 : 1
              }}
              transition={{
                opacity: { duration: 1.2, ease: 'easeInOut' },
                scale: { duration: 8, ease: 'easeOut' }
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

        {/* Dégradé latéral et bas pour lisibilité éditoriale maximale */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C3022]/90 via-[#1C3022]/60 to-[#1C3022]/25 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C3022]/75 via-transparent to-transparent z-1" />
      </div>

      {/* Bloc Éditorial Aligné à Gauche (Architecture WWF.fr) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 sm:py-24">
        <div className="max-w-3xl space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#76BD43] uppercase mb-0 text-left"
          >
            {isEn ? 'Haitian Agro-Industry · North-East' : 'Agro-Industrie Haïtienne · Nord-Est'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl sm:text-6xl lg:text-[68px] font-bold uppercase text-white tracking-tight leading-[1.03] text-balance text-left"
          >
            {t('hero.title_line1')}{' '}
            <span className="text-[#76BD43] block mt-1">
              {t('hero.title_line2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base sm:text-[19px] text-white/95 font-normal max-w-xl leading-relaxed text-left"
          >
            {isEn
              ? 'From Haitian soil to international markets: an integrated agricultural chain dedicated to the excellence of our terroirs.'
              : "De la terre haïtienne aux marchés internationaux : une filière intégrée dédiée à l'excellence de nos terroirs."}
          </motion.p>

          {/* Bouton Principal Style WWF.fr + Lien Secondaire */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
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
              className="px-8 py-4 rounded-sm bg-[#76BD43] hover:bg-[#5B9B6E] text-[#1C3022] hover:text-white font-bold text-sm uppercase tracking-wider transition-colors flex items-center gap-2.5 cursor-pointer whitespace-nowrap shadow-md"
            >
              <span>{isEn ? 'Explore Collection' : 'Explorer la Collection'}</span>
              <ArrowRight className="w-4 h-4" />
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
              className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#76BD43] pb-1 hover:text-[#76BD43] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('hero.btn.discover')}
            </button>
          </div>
        </div>
      </div>

      {/* Indicateurs de Diapositive Discrets (Barre Bas Droite) */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-20 flex items-center gap-2">
        {backgroundSlides.map((slide, idx) => (
          <button
            key={slide.id}
            id={`hero-dot-${idx}`}
            onClick={() => setCurrentBgIndex(idx)}
            className={`h-1.5 transition-all duration-300 cursor-pointer ${
              currentBgIndex === idx
                ? 'w-10 bg-[#76BD43]'
                : 'w-5 bg-white/45 hover:bg-white/80'
            }`}
            aria-label={`Photo ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
