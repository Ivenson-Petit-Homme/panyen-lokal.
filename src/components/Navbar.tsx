import React, { useState, useEffect } from 'react';
import { PageRoute, DeliveryRegion, UserAccount } from '../types';
import { useLanguage } from '../context/LanguageContext';
import panyenLogo from '../assets/images/LOGO_PANYEN.png';
import { Menu, X, ChevronRight, MapPin } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  cartCount: number;
  openCart: () => void;
  selectedRegion: DeliveryRegion;
  openRegionSelector: () => void;
  currentUser: UserAccount | null;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  setCurrentRoute,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const isEn = language === 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'home', label: t('nav.home') },
    { id: 'produits', label: t('nav.products') },
    { id: 'a-propos', label: t('nav.about') },
    { id: 'marches-export', label: t('nav.export') },
    { id: 'partenariats', label: t('nav.partnerships') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleNavClick = (route: string) => {
    if (route === 'points-de-vente') {
      setMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById('points-de-vente');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }
    setCurrentRoute(route as PageRoute);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 bg-white border-b border-stone-200 transition-shadow duration-200 ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 sm:h-20 flex items-center justify-between gap-6">
          {/* Zone 1 : Marque (Style WWF.fr — Sobre et Lisible) */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer shrink-0 group text-left"
          >
            <img
              src={panyenLogo}
              alt="Logo Panyen Lokal"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1C3022] whitespace-nowrap">
              PANYEN LOKAL
            </span>
          </button>

          {/* Zone 2 : Navigation Principale (Liens texte épurés avec soulignement vert) */}
          <nav
            id="navbar-container"
            className="hidden lg:flex items-center gap-7"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 text-[15px] font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#1C3022]'
                      : 'text-stone-700 hover:text-[#3D684A]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[3px] bg-[#76BD43] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3 : Langue & Action Principale */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              id="lang-switcher-container"
              className="hidden sm:flex items-center border border-stone-300 rounded-sm overflow-hidden text-xs font-bold"
            >
              <button
                id="btn-lang-fr"
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2.5 py-1.5 transition-colors cursor-pointer ${
                  language === 'fr'
                    ? 'bg-[#1C3022] text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100'
                }`}
                aria-label="Français"
              >
                FR
              </button>
              <button
                id="btn-lang-en"
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#1C3022] text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <button
              id="btn-topbar-stores"
              type="button"
              onClick={() => handleNavClick('points-de-vente')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#3D684A] hover:bg-[#1C3022] text-white text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isEn ? 'Locations' : 'Adresses'}</span>
            </button>

            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-sm border border-stone-300 text-[#1C3022] hover:bg-stone-100 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-2 shadow-lg"
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-sm text-base font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1C3022] text-white'
                      : 'text-[#1A1F1C] hover:bg-stone-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
            <div className="flex items-center border border-stone-300 rounded-sm overflow-hidden text-xs font-bold">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-2 cursor-pointer ${
                  language === 'fr' ? 'bg-[#1C3022] text-white' : 'bg-white text-stone-700'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-2 cursor-pointer ${
                  language === 'en' ? 'bg-[#1C3022] text-white' : 'bg-white text-stone-700'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => handleNavClick('points-de-vente')}
              className="flex-1 py-2.5 px-4 rounded-sm bg-[#3D684A] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isEn ? 'Locations (USA & Haiti)' : 'Adresses (USA & Haïti)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
