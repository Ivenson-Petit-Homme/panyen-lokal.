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
  Languages
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

  const regionInfo = REGIONS_CONFIG[selectedRegion] || REGIONS_CONFIG.haiti;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageRoute; label: string; badge?: string }[] = [
    { id: 'home', label: t('nav.home') },
    { id: 'a-propos', label: t('nav.about') },
    { id: 'produits', label: t('nav.products'), badge: t('nav.badge.5branches') },
    { id: 'marches-export', label: t('nav.export'), badge: t('nav.badge.export') },
    { id: 'partenariats', label: t('nav.partnerships') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleNavClick = (route: PageRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 transition-all duration-300 shadow-xl">
      
      {/* ========================================================================= */}
      {/* 1. BARRE SUPÉRIEURE (TOP UTILITY BAR) : VÈ FONSE NATIRÈL */}
      {/* ========================================================================= */}
      <div className="bg-[#143527] text-[#FDFBF7]/90 border-b border-[#1e4a37] text-xs py-2 px-2.5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4 overflow-x-auto">
          
          {/* Côté Gauche : Sélecteur de Région & Devise + Indicateur Certifié */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <button
              id="btn-topbar-region"
              onClick={openRegionSelector}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg bg-[#1a4432] hover:bg-[#235841] text-[#FDFBF7] border border-[#2d6a4f] hover:border-[#E9C46A] transition-colors cursor-pointer text-xs font-semibold shadow-xs min-h-[36px]"
              title={t('topbar.change_region')}
            >
              <span className="text-sm sm:text-base leading-none">{regionInfo.flag}</span>
              <span className="text-[#E9C46A] font-bold">{regionInfo.name.split(' ')[0]}</span>
              <span className="text-[10px] sm:text-[11px] text-[#FDFBF7]/80 hidden xs:inline">({regionInfo.currency})</span>
              <ChevronDown className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E9C46A]" />
            </button>

            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[#FDFBF7]/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E9C46A]" />
              <span>{t('topbar.certified')}</span>
            </span>
          </div>

          {/* Côté Droit : SÉLECTEUR DE LANGUE (DRAPO FRANS & USA) + Devis Gros + Panier + Compte */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            
            {/* SÉLECTEUR DE LANGUE OFFICIEL (DRAPO FRANS 🇫🇷 / USA 🇺🇸) */}
            <div 
              id="lang-switcher-container"
              className="flex items-center bg-[#1a4432] p-0.5 rounded-lg border border-[#2d6a4f] shadow-xs min-h-[36px]"
            >
              <button
                id="btn-lang-fr"
                onClick={() => setLanguage('fr')}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer min-h-[32px] ${
                  language === 'fr'
                    ? 'bg-[#E9C46A] text-[#1B4332] shadow-xs font-black'
                    : 'text-white hover:text-white hover:bg-[#235841]'
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
                    ? 'bg-[#E9C46A] text-[#1B4332] shadow-xs font-black'
                    : 'text-white hover:text-white hover:bg-[#235841]'
                }`}
                title="Switch site to English"
                aria-label="English"
              >
                <span className="text-sm leading-none">🇺🇸</span>
                <span className="text-[11px] font-bold">EN</span>
              </button>
            </div>

            <span className="text-[#2d6a4f] hidden sm:inline">|</span>

            {/* Bouton Devis Vente en Gros */}
            <button
              id="btn-topbar-devis"
              onClick={() => handleNavClick('marches-export')}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border shadow-xs min-h-[36px] ${
                currentRoute === 'marches-export'
                  ? 'bg-[#E9C46A] text-[#1B4332] border-[#E9C46A] shadow font-black'
                  : 'bg-[#1a4432] hover:bg-[#235841] text-white border-[#2d6a4f] hover:border-[#E9C46A]'
              }`}
              title={t('topbar.wholesale_desc')}
            >
              <FileText className="w-3.5 h-3.5 text-[#E9C46A]" />
              <span className="hidden md:inline">{t('topbar.wholesale')}</span>
            </button>

            {/* Bouton Panier (Bouton Achte - Vè Vif #2E7D32) */}
            <button
              id="btn-topbar-cart"
              onClick={openCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs transition-all cursor-pointer shadow-md group shrink-0 border border-[#388E3C] min-h-[36px]"
              title={t('topbar.cart')}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E9C46A] text-[#1B4332] text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-bold hidden xs:inline">{t('topbar.cart')}</span>
              {cartCount > 0 && (
                <span className="bg-[#E9C46A] text-[#1B4332] text-[10px] px-1.5 py-0.2 rounded font-black">
                  {cartCount}
                </span>
              )}
            </button>

            <span className="text-[#2d6a4f] hidden sm:inline">|</span>

            {/* Espace Compte / Non Moun Nan */}
            {currentUser && currentUser.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-[#E9C46A] text-[#1B4332] shadow-sm cursor-pointer border border-[#E9C46A] hover:bg-white hover:border-white transition-all"
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
                    ? 'bg-[#E9C46A] text-[#1B4332] border-[#E9C46A]'
                    : 'bg-[#1a4432] hover:bg-[#235841] text-[#FDFBF7] border-[#2d6a4f] hover:border-[#E9C46A]'
                }`}
                title={t('topbar.account')}
              >
                <div className="w-5 h-5 rounded-full bg-[#E9C46A] text-[#1B4332] flex items-center justify-center font-black text-[10px] shadow-xs shrink-0">
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
                className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold bg-[#1a4432] hover:bg-[#235841] text-[#FDFBF7] border border-[#2d6a4f] hover:border-[#E9C46A] transition-colors cursor-pointer min-h-[36px]"
                title={t('topbar.login')}
              >
                <User className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span>{t('topbar.login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BARRE DE NAVIGATION PRINCIPALE (MAIN NAVBAR) : VÈ FONSE NATIRÈL #1B4332 */}
      {/* ========================================================================= */}
      <nav 
        id="navbar-container" 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#1B4332]/98 backdrop-blur-md shadow-2xl py-2 sm:py-2.5' 
            : 'bg-[#1B4332] py-2.5 sm:py-3'
        } text-[#FDFBF7] border-b border-[#265943]`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6 flex-nowrap">
            
            {/* Logo d'Entreprise Officiel Panyen Lokal */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg border-2 border-[#E9C46A] group-hover:scale-105 transition-transform overflow-hidden ring-2 ring-[#E9C46A]/30">
                <img 
                  src={panyenLogo} 
                  alt="Logo Officiel Panyen Lokal" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-white font-serif whitespace-nowrap">
                    PANYEN LOKAL
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#E9C46A] tracking-wide font-medium whitespace-nowrap hidden xs:block">
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
                        ? 'text-[#1B4332] bg-[#E9C46A] shadow-md font-black'
                        : 'text-[#FDFBF7] hover:text-white hover:bg-[#24533E]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded shrink-0 ${
                        isActive
                          ? 'bg-[#1B4332] text-white'
                          : 'bg-[#E9C46A]/20 text-[#E9C46A] border border-[#E9C46A]/40'
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
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-[#24533E] text-white hover:bg-[#2d684e] border border-[#2d6a4f] focus:outline-none cursor-pointer shrink-0 shadow-sm"
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
            className="lg:hidden bg-[#16382A] border-t border-[#265943] px-4 pt-4 pb-6 space-y-3 animate-fadeIn mt-2"
          >
            {/* Langue & Région & Utilisateur Mobile */}
            <div className="p-3.5 bg-[#1B4332] rounded-2xl border border-[#2d6a4f] flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); openRegionSelector(); }}
                  className="flex items-center gap-1.5 text-xs text-[#E9C46A] font-bold cursor-pointer"
                >
                  <span className="text-base">{regionInfo.flag}</span>
                  <span>{regionInfo.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Switcher Langue Mobile */}
                <div className="flex items-center bg-[#143527] p-1 rounded-lg border border-[#2d6a4f]">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                      language === 'fr' ? 'bg-[#E9C46A] text-[#1B4332] font-black' : 'text-white/80'
                    }`}
                  >
                    <span>🇫🇷</span>
                    <span>FR</span>
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                      language === 'en' ? 'bg-[#E9C46A] text-[#1B4332] font-black' : 'text-white/80'
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>EN</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#2d6a4f] gap-2">
                {currentUser ? (
                  <>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="text-[10px] bg-white text-[#1B4332] px-2 py-1.5 rounded-lg font-black cursor-pointer flex-1 text-center"
                      >
                        ADMIN
                      </button>
                    )}
                    <button
                      onClick={() => handleNavClick('mon-compte')}
                      className="text-xs bg-[#E9C46A] text-[#1B4332] px-3 py-1.5 rounded-lg font-black cursor-pointer flex-[2] text-center"
                    >
                      {t('topbar.account')} ({currentUser.fullName.split(' ')[0]})
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                    className="text-xs bg-[#E9C46A] text-[#1B4332] px-3 py-1.5 rounded-lg font-black cursor-pointer w-full text-center"
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
                        ? 'bg-[#E9C46A] text-[#1B4332] font-black'
                        : 'text-[#FDFBF7] hover:bg-[#24533E] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                          isActive ? 'bg-[#1B4332] text-white' : 'bg-[#E9C46A]/20 text-[#E9C46A]'
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs shadow cursor-pointer border border-[#388E3C]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('topbar.cart')} ({cartCount})</span>
              </button>

              <button
                onClick={() => handleNavClick('marches-export')}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a4432] hover:bg-[#235841] text-white font-bold text-xs border border-[#2d6a4f] cursor-pointer"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>{t('topbar.wholesale')}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};



