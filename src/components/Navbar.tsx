import React, { useState, useEffect } from 'react';
import { PageRoute, DeliveryRegion, UserAccount } from '../types';
import { REGIONS_CONFIG } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import panyenLogo from '../assets/images/LOGO_PANYEN.png';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  FileText, 
  ChevronRight, 
  User, 
  ChevronDown, 
  ShieldCheck,
  Languages,
  MapPin,
  MessageCircle
} from 'lucide-react';

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
  cartCount,
  openCart,
  selectedRegion,
  openRegionSelector,
  currentUser,
  openAuthModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const isEn = language === 'en';

  const regionInfo = REGIONS_CONFIG[selectedRegion] || REGIONS_CONFIG.haiti;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: string; label: string; badge?: string }[] = [
    { id: 'home', label: t('nav.home') },
    { id: 'produits', label: t('nav.products') },
    { id: 'a-propos', label: t('nav.about') },
    { id: 'marches-export', label: t('nav.export'), badge: t('nav.badge.export') },
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
    <header id="main-header" className="sticky top-0 z-40 transition-all duration-300 shadow-xl">
      
      {/* ========================================================================= */}
      {/* 1. BARRE SUPÉRIEURE (TOP UTILITY BAR) : VÈ FONSE NATIRÈL */}
      {/* ========================================================================= */}
      <div className="bg-[#1C3022] text-[#FDFBF7]/90 border-b border-[#125419] text-xs py-2 px-2.5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4 overflow-x-auto">
          
          {/* Côté Gauche : Sélecteur de Région & Devise + Indicateur Certifié */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <button
              id="btn-topbar-region"
              onClick={openRegionSelector}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg bg-[#1C3022] hover:bg-[#1C3022] text-white border border-[#3D684A] hover:border-white transition-colors cursor-pointer text-xs font-semibold shadow-xs min-h-[36px]"
              title={t('topbar.change_region')}
            >
              <span className="text-sm sm:text-base leading-none">{regionInfo.flag}</span>
              <span className="text-white font-bold">{regionInfo.name.split(' ')[0]}</span>
              <span className="text-[10px] sm:text-[11px] text-white/90 hidden xs:inline">({regionInfo.currency})</span>
              <ChevronDown className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
            </button>

            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-white font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>{t('topbar.certified')}</span>
            </span>
          </div>

          {/* Côté Droit : SÉLECTEUR DE LANGUE (DRAPO FRANS & USA) + Devis Gros + Panier + Compte */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            
            {/* SÉLECTEUR DE LANGUE OFFICIEL (DRAPO FRANS 🇫🇷 / USA 🇺🇸) */}
            <div 
              id="lang-switcher-container"
              className="flex items-center bg-[#1C3022] p-0.5 rounded-lg border border-[#3D684A] shadow-xs min-h-[36px]"
            >
              <button
                id="btn-lang-fr"
                onClick={() => setLanguage('fr')}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer min-h-[32px] ${
                  language === 'fr'
                    ? 'bg-[#E59500] text-[#1C3022] shadow-xs font-black'
                    : 'text-white hover:text-white hover:bg-[#1C3022]'
                }`}
                title="Passer le site en Français"
                aria-label="Français"
              >
                <span className="text-sm leading-none">🇫🇷</span>
                <span className="text-[11px] font-bold">FR</span>
              </button>

              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer min-h-[32px] ${
                  language === 'en'
                    ? 'bg-[#E59500] text-[#1C3022] shadow-xs font-black'
                    : 'text-white hover:text-white hover:bg-[#1C3022]'
                }`}
                title="Switch site to English"
                aria-label="English"
              >
                <span className="text-sm leading-none">🇺🇸</span>
                <span className="text-[11px] font-bold">EN</span>
              </button>
            </div>

            <span className="text-[#1C3022] hidden sm:inline">|</span>

            {/* Bouton Devis Vente en Gros */}
            <button
              id="btn-topbar-devis"
              onClick={() => handleNavClick('marches-export')}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border shadow-xs min-h-[36px] ${
                currentRoute === 'marches-export'
                  ? 'bg-[#E59500] text-[#1C3022] border-[#E59500] shadow font-black'
                  : 'bg-[#1C3022] hover:bg-[#1C3022] text-white border-[#3D684A] hover:border-white'
              }`}
              title={t('topbar.wholesale_desc')}
            >
              <FileText className="w-3.5 h-3.5 text-white" />
              <span className="hidden md:inline">{t('topbar.wholesale')}</span>
            </button>

            {/* Bouton Sièges & Distribution (Haïti & USA) */}
            <button
              id="btn-topbar-stores"
              onClick={() => handleNavClick('points-de-vente')}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-lg bg-[#E59500] hover:bg-[#D97706] text-stone-950 font-black text-xs transition-all cursor-pointer shadow-md group shrink-0 border border-[#F59E0B] min-h-[36px]"
              title={isEn ? "Corporate Locations (Haiti & USA)" : "Sièges & Distribution en Haïti et aux USA"}
            >
              <MapPin className="w-4 h-4 text-stone-950" />
              <span className="font-black text-stone-950 hidden xs:inline">
                {isEn ? "Locations (Haiti & USA)" : "Sièges & Distribution"}
              </span>
              <span className="font-black text-stone-950 xs:hidden">
                {isEn ? "Locations" : "Adresses"}
              </span>
            </button>

            {/* Bouton WhatsApp Dirèk */}
            <a
              id="btn-topbar-whatsapp"
              href="https://wa.me/50938346371?text=Bonjour%20Panyen%20Lokal,%20je%20souhaite%20des%20informations%20sur%20vos%20produits."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs transition-all cursor-pointer shadow-md shrink-0 min-h-[36px]"
              title="WhatsApp: +509 3834-6371"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: +509 3834-6371</span>
            </a>

            <span className="text-[#1C3022] hidden sm:inline">|</span>

            {/* Espace Compte / Non Moun Nan */}
            {currentUser && currentUser.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-[#E59500] text-[#1C3022] shadow-sm cursor-pointer border border-[#E59500] hover:bg-white hover:border-white transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN</span>
              </button>
            )}

            {currentUser ? (
              <button
                id="btn-topbar-account"
                onClick={() => handleNavClick('mon-compte')}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer min-h-[36px] ${
                  currentRoute === 'mon-compte'
                    ? 'bg-[#E59500] text-[#1C3022] border-[#E59500]'
                    : 'bg-[#1C3022] hover:bg-[#1C3022] text-white border-[#3D684A] hover:border-white'
                }`}
                title={t('topbar.account')}
              >
                <div className="w-5 h-5 rounded-full bg-[#E59500] text-[#1C3022] flex items-center justify-center font-black text-[10px] shadow-xs shrink-0">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[70px] sm:max-w-[120px] truncate font-bold text-white hidden xs:inline">
                  {currentUser.fullName}
                </span>
              </button>
            ) : (
              <button
                id="btn-topbar-login"
                onClick={openAuthModal}
                className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold bg-[#1C3022] hover:bg-[#1C3022] text-white border border-[#3D684A] hover:border-white transition-colors cursor-pointer min-h-[36px]"
                title={t('topbar.login')}
              >
                <User className="w-3.5 h-3.5 text-white" />
                <span>{t('topbar.login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BARRE DE NAVIGATION PRINCIPALE (MAIN NAVBAR) : VÈ FONSE NATIRÈL #1C3022 */}
      {/* ========================================================================= */}
      <nav 
        id="navbar-container" 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#1C3022]/98 backdrop-blur-md shadow-2xl py-2 sm:py-2.5' 
            : 'bg-[#1C3022] py-2.5 sm:py-3'
        } text-[#FDFBF7] border-b border-[#3D684A]`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6 flex-nowrap">
            
            {/* Logo d'Entreprise Officiel Panyen Lokal */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg border-2 border-[#E59500] group-hover:scale-105 transition-transform overflow-hidden ring-2 ring-[#E59500]/30">
                <img 
                  src={panyenLogo} 
                  alt="Logo Officiel Panyen Lokal" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-2xl font-black tracking-tight font-serif whitespace-nowrap">
                    <span className="text-[#76BD43]">PANYEN</span>{' '}
                    <span className="text-[#E59500]">LOKAL</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-white/90 tracking-wide font-medium whitespace-nowrap hidden xs:block">
                  {t('nav.tagline')}
                </p>
              </div>
            </div>

            {/* Liens de Navigation Desktop */}
            <div className="hidden lg:flex items-center justify-end flex-1 flex-nowrap gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[#1C3022] bg-[#E59500] shadow-md font-black'
                        : 'text-white hover:text-white hover:bg-[#1C3022]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded shrink-0 ${
                        isActive
                          ? 'bg-[#1C3022] text-white'
                          : 'bg-white/20 text-white border border-white/40'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bouton Menu Mobile */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-[#1C3022] text-white hover:bg-[#2d684e] border border-[#3D684A] focus:outline-none cursor-pointer shrink-0 shadow-sm"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MENU MOBILE DÉROULANT COMPLET */}
        {/* ========================================================================= */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-menu"
            className="lg:hidden bg-[#1C3022] border-t border-[#3D684A] px-4 pt-4 pb-6 space-y-3 animate-fadeIn mt-2"
          >
            {/* Langue & Région & Utilisateur Mobile */}
            <div className="p-3.5 bg-[#1C3022] rounded-2xl border border-[#3D684A] flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); openRegionSelector(); }}
                  className="flex items-center gap-1.5 text-xs text-white font-bold cursor-pointer"
                >
                  <span className="text-base">{regionInfo.flag}</span>
                  <span>{regionInfo.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white" />
                </button>

                {/* Switcher Langue Mobile */}
                <div className="flex items-center bg-[#1C3022] p-1 rounded-lg border border-[#3D684A]">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                      language === 'fr' ? 'bg-[#E59500] text-[#1C3022] font-black' : 'text-white/80'
                    }`}
                  >
                    <span>🇫🇷</span>
                    <span>FR</span>
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                      language === 'en' ? 'bg-[#E59500] text-[#1C3022] font-black' : 'text-white/80'
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>EN</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#3D684A] gap-2">
                {currentUser ? (
                  <>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="text-[10px] bg-white text-[#1C3022] px-2 py-1.5 rounded-lg font-black cursor-pointer flex-1 text-center"
                      >
                        ADMIN
                      </button>
                    )}
                    <button
                      onClick={() => handleNavClick('mon-compte')}
                      className="text-xs bg-[#E59500] text-[#1C3022] px-3 py-1.5 rounded-lg font-black cursor-pointer flex-[2] text-center"
                    >
                      {t('topbar.account')} ({currentUser.fullName.split(' ')[0]})
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                    className="text-xs bg-[#E59500] text-[#1C3022] px-3 py-1.5 rounded-lg font-black cursor-pointer w-full text-center"
                  >
                    {t('topbar.login')}
                  </button>
                )}
              </div>
            </div>

            {/* Liens de Navigation Mobile */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#E59500] text-[#1C3022] font-black'
                        : 'text-[#FDFBF7] hover:bg-[#1C3022] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                          isActive ? 'bg-[#1C3022] text-white' : 'bg-white/20 text-white'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                );
              })}
            </div>

            {/* Boutons d'Action Rapide Mobile */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('points-de-vente')}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#E59500] hover:bg-[#D97706] text-stone-950 font-black text-xs shadow-md cursor-pointer border border-[#F59E0B]"
              >
                <MapPin className="w-4 h-4 text-stone-950" />
                <span>{isEn ? "Locations" : "Sièges & Distribution"}</span>
              </button>

              <a
                href="https://wa.me/50938346371?text=Bonjour%20Panyen%20Lokal,%20je%20souhaite%20des%20informations%20sur%20vos%20produits."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};



