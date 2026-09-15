import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO } from '../data/productsData';
import { useLanguage } from '../context/LanguageContext';
import panyenLogo from '../assets/images/LOGO_PANYEN.png';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

interface FooterProps {
  setCurrentRoute: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentRoute }) => {
  const { language, t } = useLanguage();
  const handleNav = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isEn = language === 'en';

  return (
    <footer id="main-footer" className="bg-[#143527] text-[#FDFBF7]/90 border-t border-[#1e4a37]">
      {/* Ruban Supérieur d'Action B2B & Export */}
      <div className="border-b border-[#265943] bg-[#1B4332] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C46A]/20 border border-[#E9C46A] text-[#E9C46A] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E9C46A]" />
              <span>{t('footer.b2b_tag')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {t('footer.b2b_title')}
            </h3>
            <p className="text-sm text-[#FDFBF7]/80 mt-1">
              {t('footer.b2b_desc')}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleNav('marches-export')}
              className="px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2 group cursor-pointer border border-[#388E3C]"
            >
              <span>{t('footer.b2b_btn')}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="px-5 py-3 rounded-xl bg-[#143527] hover:bg-[#1a4432] text-[#FDFBF7] font-bold text-sm border border-[#2d6a4f] hover:border-[#E9C46A] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t('footer.b2b_contact')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grille Principale du Pied de Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Colonne 1: Identité & Philosophie */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg border border-[#E9C46A] overflow-hidden ring-2 ring-[#E9C46A]/30">
                <img 
                  src={panyenLogo} 
                  alt="Logo Officiel Panyen Lokal" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-lg font-bold font-serif text-white tracking-tight">
                  PANYEN LOKAL
                </span>
                <p className="text-xs text-[#E9C46A] font-bold">
                  {t('footer.agro_title')}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#FDFBF7]/80 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-[#1B4332] border border-[#2d6a4f] text-[#FDFBF7] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E9C46A]" />
                {t('footer.stat_farmers')}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#1B4332] border border-[#2d6a4f] text-[#FDFBF7] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#E9C46A]" />
                {t('footer.stat_regions')}
              </span>
            </div>
          </div>

          {/* Colonne 2: Navigation rapide */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-[#265943]">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-[#FDFBF7]/80 hover:text-[#E9C46A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#E9C46A]" />
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('a-propos')}
                  className="text-[#FDFBF7]/80 hover:text-[#E9C46A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#E9C46A]" />
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('produits')}
                  className="text-[#FDFBF7]/80 hover:text-[#E9C46A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#E9C46A]" />
                  {t('nav.products')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('marches-export')}
                  className="text-[#FDFBF7]/80 hover:text-[#E9C46A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#E9C46A]" />
                  {t('nav.export')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('partenariats')}
                  className="text-[#FDFBF7]/80 hover:text-[#E9C46A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#E9C46A]" />
                  {t('nav.partnerships')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-[#FDFBF7]/80 hover:text-[#E9C46A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#E9C46A]" />
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Nos Spécialités Phares */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-[#265943]">
              {t('footer.products_links')}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#1B4332] border border-[#2d6a4f]">
                <p className="font-bold text-white">
                  {t('hero.prod1')}
                </p>
                <p className="text-[#FDFBF7]/80 text-[11px] mt-0.5">
                  {t('footer.product_ricin_desc')}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1B4332] border border-[#2d6a4f]">
                <p className="font-bold text-white">
                  {t('home.category_spirits_title')}
                </p>
                <p className="text-[#FDFBF7]/80 text-[11px] mt-0.5">
                  {t('footer.product_cognac_desc')}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1B4332] border border-[#2d6a4f]">
                <p className="font-bold text-white">
                  {t('home.category_grocery_title')}
                </p>
                <p className="text-[#FDFBF7]/80 text-[11px] mt-0.5">
                  {t('footer.product_cassava_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne 4: Contact & Implantation */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-[#265943]">
              {t('footer.contact_links')}
            </h4>
            <div className="space-y-3 text-sm text-[#FDFBF7]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#E9C46A] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-[#FDFBF7]">
                  {COMPANY_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E9C46A] shrink-0" />
                <span className="text-xs text-[#FDFBF7]">{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E9C46A] shrink-0" />
                <span className="text-xs text-[#FDFBF7]">{COMPANY_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#265943]">
              <p className="text-[11px] text-[#FDFBF7]/80">
                {t('footer.shipping_info')}
              </p>
            </div>
          </div>
        </div>

        {/* Barre Juridique Basse */}
        <div className="mt-12 pt-6 border-t border-[#265943] flex flex-col sm:row items-center justify-between gap-4 text-xs text-[#FDFBF7]/80">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. {t('footer.rights')}
          </div>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('a-propos')}>
              {t('footer.model_link')}
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('marches-export')}>
              {t('footer.lab_link')}
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('contact')}>
              Caracol, Haïti
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

