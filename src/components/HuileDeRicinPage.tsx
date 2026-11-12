import React, { useState } from 'react';
import { Product, PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion } from 'motion/react';
import {
  Award, 
  ShieldCheck, 
  Sparkles, 
  Droplet, 
  FileText, 
  Truck, 
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  Store,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

interface HuileDeRicinPageProps {
  product: Product;
  onAddToCart: (product: Product, selectedFormat: string, quantity: number) => void;
  onRequestQuote: (product: Product, format?: string) => void;
  setCurrentRoute: (route: PageRoute) => void;
}

export const HuileDeRicinPage: React.FC<HuileDeRicinPageProps> = ({
  product,
  onRequestQuote,
  setCurrentRoute
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'detail' | 'export' | 'science' | 'recettes'>('detail');
  const [selectedFormat, setSelectedFormat] = useState<string>('4oz (120ml)');

  const detailFormats: string[] = ["2oz (60ml)", "4oz (120ml)", "Galon 128oz (3.78L)"];
  const exportFormats: string[] = ["Galon 128oz (3.78L)", "Baril Export 54 Gallons"];

  const currentPrice = product.formatPricing?.[selectedFormat] || {
    priceUSD: selectedFormat.includes('2oz') ? 1.90 : selectedFormat.includes('4oz') ? 3.80 : 70.00,
    priceHTG: selectedFormat.includes('2oz') ? 250 : selectedFormat.includes('4oz') ? 500 : 9240,
    unit: selectedFormat
  };

  return (
    <div id="page-huile-de-ricin" className="min-h-screen bg-[#FDFBF7] text-[#1F2937] pb-20">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-[#1C3022] via-[#2A4833] to-[#3D684A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#5B9B6E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E59500] text-[#1F2937] font-black text-xs uppercase tracking-wider mb-4 shadow">
              <Award className="w-3.5 h-3.5 fill-[#1F2937]" />
              <span>{t('ricin.badge')}</span>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight"
              >
                {isEn ? "Pure Haitian Castor Oil" : "Huile de Ricin Pure d’Haïti"} <br />
                <span className="text-white font-sans text-2xl sm:text-3xl font-normal italic">
                  {t('ricin.title_refined')}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-white max-w-2xl font-light leading-relaxed"
              >
                {t('ricin.intro')}
              </motion.p>
              
              <StaggerContainer className="flex flex-wrap gap-3 pt-2" staggerDelay={0.12}>
                <StaggerItem direction="none">
                  <span className="px-3 py-1 rounded-lg bg-[#2A4833] border border-[#5B9B6E] text-xs text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    {t('ricin.solvent_free')}
                  </span>
                </StaggerItem>
                <StaggerItem direction="none">
                  <span className="px-3 py-1 rounded-lg bg-[#2A4833] border border-[#5B9B6E] text-xs text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-white" />
                    {t('ricin.ricinoleic_acid')}
                  </span>
                </StaggerItem>
                <StaggerItem direction="none">
                  <span className="px-3 py-1 rounded-lg bg-[#2A4833] border border-[#5B9B6E] text-xs text-white flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-white" />
                    {t('ricin.fob_info')}
                  </span>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <FadeInSection direction="left" delay={0.4}>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center max-w-xs w-full">
                  <span className="text-xs text-[#E59500] font-bold tracking-wider uppercase block">
                    {t('ricin.capacity_title')}
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">12 000+ L</div>
                  <div className="text-xs text-stone-200">{t('ricin.capacity_desc')}</div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-around text-center text-xs">
                    <div>
                      <span className="font-bold text-white block">850+</span>
                      <span className="text-stone-300 text-[10px]">{t('ricin.stat_farmers')}</span>
                    </div>
                    <div>
                      <span className="font-bold text-white block">6</span>
                      <span className="text-stone-300 text-[10px]">{t('ricin.stat_depts')}</span>
                    </div>
                    <div>
                      <span className="font-bold text-white block">100%</span>
                      <span className="text-stone-300 text-[10px]">{t('ricin.stat_terroir')}</span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('detail')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'detail'
                ? 'border-[#5B9B6E] text-[#1C3022] bg-[#2A4833]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#1C3022]" />
            <span>{t('ricin.tab_retail')}</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-[#5B9B6E] text-[#1C3022] bg-[#2A4833]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Truck className="w-4 h-4 text-[#1C3022]" />
            <span>{t('ricin.tab_export')}</span>
          </button>

          <button
            onClick={() => setActiveTab('science')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'science'
                ? 'border-[#5B9B6E] text-[#1C3022] bg-[#2A4833]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#1C3022]" />
            <span>{t('ricin.tab_science')}</span>
          </button>

          <button
            onClick={() => setActiveTab('recettes')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'recettes'
                ? 'border-[#5B9B6E] text-[#1C3022] bg-[#2A4833]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#1C3022]" />
            <span>{t('ricin.tab_rituals')}</span>
          </button>
        </div>

        {/* Tab 1: Gamme Détail */}
        {activeTab === 'detail' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl overflow-hidden bg-[#2A4833] border border-[#5B9B6E] shadow-md p-4 flex items-center justify-center">
                <ImageWithSkeleton
                  src={product.image}
                  alt="Pure castor oil from Panyen Lokal"
                  containerClassName="w-full h-80 sm:h-96 flex items-center justify-center"
                  imgClassName="w-full h-80 sm:h-96 object-contain"
                />
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1C3022]" />
                  {t('ricin.bottle_specs')}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.bottle_desc')}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200 text-stone-700 font-medium">
                    {t('ricin.bottle_size1')}
                  </span>
                  <span className="text-[11px] bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200 text-stone-700 font-medium">
                    {t('ricin.bottle_size2')}
                  </span>
                  <span className="text-[11px] bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200 text-stone-700 font-medium">
                    {t('ricin.bottle_size3')}
                  </span>
                  <span className="text-[11px] bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200 text-stone-700 font-medium">
                    {t('ricin.bottle_size4')}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#1C3022] uppercase tracking-wider">
                  {t('ricin.retail_selector')}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1F2937] mt-1">
                  {isEn ? "Available Formats & Official Pricing" : "Formats Disponibles & Tarifs Officiels"}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {isEn 
                    ? "Direct producer tariffs. Available in Haiti (Caracol) and the United States (Lauderhill, FL)." 
                    : "Tarifs directs de production. Retrait disponible en Haïti (Caracol) et aux États-Unis (Lauderhill, FL)."}
                </p>
              </div>

              {/* Format selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  {isEn ? "Select Available Size / Format :" : "Sélectionner un format disponible :"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {detailFormats.map((fmt, fmtIdx) => {
                    const isSelected = selectedFormat === fmt;
                    const price = product.formatPricing?.[fmt] || {
                      priceUSD: fmt.includes('2oz') ? 1.90 : fmt.includes('4oz') ? 3.80 : 70.00,
                      priceHTG: fmt.includes('2oz') ? 250 : fmt.includes('4oz') ? 500 : 9240,
                      unit: fmt
                    };
                    return (
                      <button
                        key={`ricin-fmt-${fmt}-${fmtIdx}`}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#5B9B6E] bg-[#2A4833] text-white ring-2 ring-[#76BD43]/30 shadow-md'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900'
                        }`}
                      >
                        <div className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-stone-900'}`}>{fmt}</div>
                        <div className={`text-sm font-black mt-1 ${isSelected ? 'text-[#E59500]' : 'text-[#1C3022]'}`}>
                          {fmt.includes('128oz') ? `$70.00 USD` : `${price.priceHTG} HTG`}
                        </div>
                        <div className={`text-[10px] font-semibold mt-0.5 ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>
                          {fmt.includes('128oz') ? `9,240 HTG` : `$${price.priceUSD.toFixed(2)} USD`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Price Highlight */}
              <div className="p-4 bg-[#FDFBF7] rounded-2xl border-2 border-[#5B9B6E] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 font-bold uppercase block">
                    {isEn ? "Selected Format Tariff :" : "Tarif Officiel du Format :"}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#1C3022]">
                      {selectedFormat.includes('128oz') ? "$70.00 USD" : `${currentPrice.priceHTG.toLocaleString()} HTG`}
                    </span>
                    <span className="text-sm font-bold text-stone-600">
                      {selectedFormat.includes('128oz') ? "(9,240 HTG)" : `($${currentPrice.priceUSD.toFixed(2)} USD)`}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {selectedFormat} • {isEn ? "100% Pure Virgin Castor Oil" : "100% Huile Vierge Pure Sans Solvant"}
                  </span>
                </div>
                <div className="bg-[#1C3022] text-[#76BD43] text-xs font-black px-3 py-1.5 rounded-xl border border-[#5B9B6E]">
                  ✓ {isEn ? "In Stock (Haiti & USA)" : "En Stock (Haïti & USA)"}
                </div>
              </div>

              {/* Direct Distribution Info Box */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-stone-800 space-y-2">
                <div className="flex items-center gap-2 font-black text-[#1C3022]">
                  <Store className="w-4 h-4 text-[#3D684A]" />
                  <span>{isEn ? "Direct Fulfillment & Official Distribution" : "Distribution & Retrait Direct en Siège"}</span>
                </div>
                <p className="text-[11px] text-stone-700 leading-relaxed">
                  {isEn 
                    ? "Available directly from our production site in Haiti (Caracol, Village Ekam) and our US distribution center in Lauderhill, Florida (PANYEN LOKAL INC). You can also reserve or order immediately via WhatsApp."
                    : "Disponible directement auprès de notre usine de Caracol (Village Ekam, Haïti) et de notre centre de distribution officiel en Floride (PANYEN LOKAL INC, Lauderhill). Réservation et expédition immédiate via WhatsApp."}
                </p>
              </div>

              {/* Action Buttons: Store Addresses & WhatsApp */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('points-de-vente');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#1C3022] hover:bg-[#2A4833] text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#5B9B6E]"
                >
                  <MapPin className="w-4 h-4 text-[#E59500]" />
                  <span>{isEn ? "View Corporate Addresses & Centers (Haiti & USA)" : "Voir les Sièges Sociaux & Adresses (Haïti & USA)"}</span>
                </button>

                <a
                  href={`https://wa.me/50938346371?text=${encodeURIComponent(`Bonjour Panyen Lokal, je souhaite commander de l'Huile de Ricin Pure (Lwil Maskret) au format ${selectedFormat}. Merci de m'indiquer la disponibilité pour retrait ou expédition.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isEn ? "Order on WhatsApp (+509 3834-6371)" : "Commander sur WhatsApp (+509 3834-6371)"}</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1C3022]" />
                  <span>Caracol (Haïti) • Lauderhill, FL (USA)</span>
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1C3022]" />
                  <span>{isEn ? "100% Certified Purity" : "100% Authentique & Certifié"}</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Gamme Gros & Export B2B */}
        {activeTab === 'export' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A4833] text-white text-xs font-bold uppercase mb-2 border border-[#5B9B6E] shadow-sm">
                  <Truck className="w-3.5 h-3.5 text-[#E59500]" />
                  <span className="text-white">{t('ricin.export_tag')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2937]">
                  {t('ricin.export_title')}
                </h3>
                <p className="text-sm text-stone-600 mt-1 max-w-3xl">
                  {t('ricin.export_desc')}
                </p>
              </div>

              <button
                onClick={() => setCurrentRoute('marches-export')}
                className="px-5 py-3 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-bold text-xs shadow transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-auto cursor-pointer border border-[#5B9B6E]"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>{t('ricin.container_btn')}</span>
              </button>
            </div>

            {/* B2B Export Format Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Format 1: Gallon 128oz */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-2xl border-2 border-stone-200 hover:border-[#5B9B6E] bg-white transition-all space-y-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-[#1C3022] uppercase">
                      {isEn ? "FLAGSHIP 128oz GALLON" : "GALON 128oz (3.78L)"}
                    </span>
                    <h4 className="text-xl font-bold font-serif text-[#1F2937] mt-0.5">
                      {isEn ? "128oz Gallon (3.78 Liters)" : "Galon 128oz (3.78 Litres)"}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-[#1C3022] text-[#76BD43] border border-[#5B9B6E] text-sm font-black block">
                      $70.00 USD
                    </span>
                    <span className="text-[11px] font-bold text-stone-600 block mt-0.5">
                      9,240 Gdes
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isEn 
                    ? "Large gallon format (128oz / 3.78L) ideal for salons, spas, and families. Available in Haiti and the United States." 
                    : "Grand format galon 128oz (3.78 litres) idéal pour professionnels, salons et familles. Disponible en Haïti et aux États-Unis."}
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{isEn ? "128oz Net Content (3.78 Liters)" : "Contenu net : 128oz (3.78 Litres)"}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{isEn ? "Pure Filtered Virgin Castor Oil (Hexane-Free)" : "Huile de Ricin Vierge Pure Extraite à Froid"}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{isEn ? "Distribution : Caracol (Haiti) & Lauderhill, FL (USA)" : "Distribution : Caracol (Haïti) & Lauderhill, FL (USA)"}</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('points-de-vente');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#1C3022] hover:bg-[#2A4833] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-[#5B9B6E]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#E59500]" />
                    <span>{isEn ? "View Official Addresses" : "Voir les Sièges Sociaux"}</span>
                  </button>
                  <a
                    href="https://wa.me/50938346371?text=Bonjour%20Panyen%20Lokal,%20je%20souhaite%20commander%20le%20Galon%20128oz%20d'Huile%20de%20Ricin%20Pure%20%C3%A0%20$70.00%20USD."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp ($70 USD)</span>
                  </a>
                </div>
              </motion.div>

              {/* Format 2: Baril 54 Gallons */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-2xl border-2 border-[#5B9B6E] bg-white transition-all space-y-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-[#1C3022] uppercase">{t('ricin.format_drum_tag')}</span>
                    <h4 className="text-xl font-bold font-serif text-[#1F2937] mt-0.5">
                      {t('ricin.format_drum_title')}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E59500] text-[#1F2937] text-xs font-black">
                    $2,450.00 USD
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.format_drum_desc')}
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{t('ricin.format_drum_stat1')}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{t('ricin.format_drum_stat2')}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{t('ricin.format_drum_stat3')}</span>
                  </li>
                </ul>
                <button
                  onClick={() => onRequestQuote(product, 'Baril Export 54 Gallons')}
                  className="w-full py-3 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer border border-[#5B9B6E]"
                >
                  <FileText className="w-3.5 h-3.5 text-white" />
                  <span>{t('ricin.format_drum_btn')}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Procédé & Science */}
        {activeTab === 'science' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8"
          >
            <div>
              <span className="text-xs font-bold text-[#1C3022] uppercase">{t('ricin.knowhow_tag')}</span>
              <h3 className="text-2xl font-serif font-bold text-[#1F2937] mt-1">
                {t('ricin.knowhow_title')}
              </h3>
              <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
                {t('ricin.knowhow_desc')}
              </p>
            </div>

            {/* 4 Steps Extraction Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#2A4833] text-white flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h5 className="font-bold text-sm text-[#1F2937]">{t('ricin.step1_title')}</h5>
                <p className="text-xs text-stone-600">
                  {t('ricin.step1_desc')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#2A4833] text-white flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h5 className="font-bold text-sm text-[#1F2937]">{t('ricin.step2_title')}</h5>
                <p className="text-xs text-stone-600">
                  {t('ricin.step2_desc')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#2A4833] text-white flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h5 className="font-bold text-sm text-[#1F2937]">{t('ricin.step3_title')}</h5>
                <p className="text-xs text-stone-600">
                  {t('ricin.step3_desc')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#2A4833] text-white flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <h5 className="font-bold text-sm text-[#1F2937]">{t('ricin.step4_title')}</h5>
                <p className="text-xs text-stone-600">
                  {t('ricin.step4_desc')}
                </p>
              </div>
            </div>

            {/* Technical Laboratory Specification Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden">
              <div className="bg-[#2A4833] text-white p-4 font-bold text-sm flex justify-between items-center">
                <span>{t('ricin.lab_title')}</span>
                <span className="text-xs bg-[#E59500] text-[#1F2937] font-black px-2 py-0.5 rounded">{t('ricin.lab_status')}</span>
              </div>
              <div className="divide-y divide-stone-100 text-xs">
                {Object.entries(product.technicalSpecs || {}).map(([key, val]) => (
                  <div key={key} className="p-3 grid grid-cols-2 bg-white hover:bg-stone-50">
                    <span className="font-bold text-stone-700">{key}</span>
                    <span className="text-[#1F2937] font-mono font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Guide d'Application & Recettes */}
        {activeTab === 'recettes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8"
          >
            <div>
              <span className="text-xs font-bold text-[#1C3022] uppercase">{t('ricin.rituals_tag')}</span>
              <h3 className="text-2xl font-serif font-bold text-[#1F2937] mt-1">
                {t('ricin.rituals_title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 w-fit border border-amber-200">
                  <Sparkles className="w-5 h-5 text-[#E59500]" />
                </div>
                <h4 className="font-bold font-serif text-base text-[#1F2937]">
                  {t('ricin.ritual1_title')}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.ritual1_desc')}
                </p>
                <div className="text-[11px] font-semibold text-[#1C3022]">
                  {t('ricin.ritual1_freq')}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#1C3022] w-fit border border-emerald-200">
                  <Droplet className="w-5 h-5 text-[#1C3022]" />
                </div>
                <h4 className="font-bold font-serif text-base text-[#1F2937]">
                  {t('ricin.ritual2_title')}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.ritual2_desc')}
                </p>
                <div className="text-[11px] font-semibold text-[#1C3022]">
                  {t('ricin.ritual2_freq')}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="p-2.5 rounded-xl bg-stone-100 text-stone-800 w-fit border border-stone-200">
                  <ShieldCheck className="w-5 h-5 text-[#1C3022]" />
                </div>
                <h4 className="font-bold font-serif text-base text-[#1F2937]">
                  {t('ricin.ritual3_title')}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.ritual3_desc')}
                </p>
                <div className="text-[11px] font-semibold text-stone-700">
                  {t('ricin.ritual3_freq')}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

