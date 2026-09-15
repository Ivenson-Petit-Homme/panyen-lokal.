import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const BackToTopButton: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 to 100)
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / scrollHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button once user scrolls more than 350px
      if (currentScrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Calculate SVG strokeDashoffset for circular progress ring (radius = 20, circumference = 2 * PI * 20 ≈ 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center group select-none"
        >
          {/* Tooltip on Hover (Desktop) */}
          <div className="absolute bottom-full mb-2 right-0 hidden sm:group-hover:flex items-center pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
            <div className="bg-[#143527] text-white border border-[#2d6a4f] text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md">
              <span>{t('nav.back_to_top')}</span>
              <span className="text-[10px] text-stone-300 font-mono">({Math.round(scrollProgress)}%)</span>
            </div>
          </div>

          <button
            id="btn-back-to-top"
            onClick={scrollToTop}
            aria-label={t('nav.scroll_top_aria')}
            title={t('nav.back_to_top')}
            className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#1B4332] hover:bg-[#143527] text-white shadow-xl hover:shadow-2xl border-2 border-[#2d6a4f] hover:border-[#E9C46A] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group-hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-[#E9C46A] focus:ring-offset-2"
          >
            {/* Circular Scroll Progress Ring */}
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5" 
              viewBox="0 0 48 48"
            >
              {/* Background Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#2d6a4f]/40"
                strokeWidth="2.5"
                fill="transparent"
              />
              {/* Active Progress Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#E9C46A] transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Icon */}
            <ArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white group-hover:-translate-y-0.5 transition-all duration-200 relative z-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
