import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO } from '../data/productsData';
import { useLanguage } from '../context/LanguageContext';
import panyenLogo from '../assets/images/LOGO_PANYEN.png';
import { MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  setCurrentRoute: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentRoute }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const handleNav = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1C3022] text-white border-t border-[#2A4833]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Colonne 1 : Identité */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-sm bg-white p-1 flex items-center justify-center shrink-0">
                <img
                  src={panyenLogo}
                  alt="Logo Panyen Lokal"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display text-xl font-bold uppercase text-white tracking-tight block">
                  PANYEN LOKAL
                </span>
                <span className="text-xs text-[#76BD43] font-bold uppercase tracking-wider">
                  {t('footer.agro_title')}
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed max-w-xs mb-0">
              {isEn
                ? 'Agro-industrial enterprise dedicated to sustainable Haitian processing and direct distribution.'
                : "Entreprise agro-industrielle dédiée à la transformation durable des terroirs d'Haïti et à la distribution directe."}
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="md:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#76BD43] mb-3">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-2 text-sm pl-0 list-none">
              <li>
                <button onClick={() => handleNav('home')} className="text-stone-200 hover:text-white transition-colors cursor-pointer">
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('produits')} className="text-stone-200 hover:text-white transition-colors cursor-pointer">
                  {t('nav.products')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('a-propos')} className="text-stone-200 hover:text-white transition-colors cursor-pointer">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('marches-export')} className="text-stone-200 hover:text-white transition-colors cursor-pointer">
                  {t('nav.export')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="text-stone-200 hover:text-white transition-colors cursor-pointer">
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Adresses Officielles (États-Unis & Haïti) */}
          <div id="points-de-vente" className="md:col-span-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#76BD43] mb-3">
              {isEn ? 'Official Locations (USA & Haiti)' : 'Adresses Officielles (États-Unis & Haïti)'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* États-Unis */}
              <div className="p-4 rounded-sm bg-[#142318] border border-[#2A4833] space-y-2 text-sm">
                <div className="font-display text-base font-bold uppercase text-white flex items-center gap-2">
                  <span>🇺🇸</span>
                  <span>PANYEN LOKAL INC</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-[#76BD43] shrink-0 mt-0.5" />
                  <span className="leading-snug">7400 W Oakland Park Blvd, Unit 1125, Lauderhill, Florida 33319</span>
                </div>
                <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-[#76BD43] shrink-0" />
                  <a href="tel:7814698708" className="hover:text-white font-semibold text-white">Tel : 781-469-8708</a>
                </div>
              </div>

              {/* Haïti */}
              <div className="p-4 rounded-sm bg-[#142318] border border-[#2A4833] space-y-2 text-sm">
                <div className="font-display text-base font-bold uppercase text-white flex items-center gap-2">
                  <span>🇭🇹</span>
                  <span>Biwo Caracol</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-[#76BD43] shrink-0 mt-0.5" />
                  <span className="leading-snug">B6-39, Village Ekam, Caracol, Haïti</span>
                </div>
                <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-[#76BD43] shrink-0" />
                  <span className="font-semibold text-white">
                    <a href="tel:+50938346371" className="hover:underline">+509 3834-6371</a> / <a href="tel:+50935593385" className="hover:underline">3559-3385</a>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-stone-300 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 text-[#76BD43] shrink-0" />
                  <a href="mailto:panyenlokalsa@gmail.com" className="hover:text-white truncate text-stone-200">panyenlokalsa@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Barre Basse Simple */}
        <div className="mt-10 pt-5 border-t border-[#2A4833] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <span>© {new Date().getFullYear()} {COMPANY_INFO.name}. {t('footer.rights')}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('a-propos')} className="hover:text-white transition-colors cursor-pointer">
              {t('footer.model_link')}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNav('marches-export')} className="hover:text-white transition-colors cursor-pointer">
              {t('footer.lab_link')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
