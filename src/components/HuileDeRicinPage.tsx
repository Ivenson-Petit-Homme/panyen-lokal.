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
  ShoppingBag, 
  FileText, 
  Truck, 
  CheckCircle2
} from 'lucide-react';

interface HuileDeRicinPageProps {
  product: Product;
  onAddToCart: (product: Product, selectedFormat: string, quantity: number) => void;
  onRequestQuote: (product: Product, format?: string) => void;
  setCurrentRoute: (route: PageRoute) => void;
}

export const HuileDeRicinPage: React.FC<HuileDeRicinPageProps> = ({
  product,
  onAddToCart,
  onRequestQuote,
  setCurrentRoute
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'detail' | 'export' | 'science' | 'recettes'>('detail');
  const [selectedFormat, setSelectedFormat] = useState<string>('4oz');
  const [quantity, setQuantity] = useState<number>(1);

  const detailFormats = product.formatsDetail || ["2oz", "4oz", "250ml", "500ml", "1L"];
  const exportFormats = product.formatsExport || ["1 Gallon", "Baril Export 54 Gallons"];

  const currentPrice = product.formatPricing?.[selectedFormat];
  const isExport = exportFormats.includes(selectedFormat);

  const handleOrder = () => {
    if (isExport) {
      onRequestQuote(product, selectedFormat);
    } else {
      onAddToCart(product, selectedFormat, quantity);
    }
  };

  return (
    <div id="page-huile-de-ricin" className="min-h-screen bg-[#FDFBF7] text-[#1F2937] pb-20">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-[#143527] via-[#1B4332] to-[#2d6a4f] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#2d6a4f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C46A] text-[#1F2937] font-black text-xs uppercase tracking-wider mb-4 shadow">
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
                <span className="text-[#E9C46A] font-sans text-2xl sm:text-3xl font-normal italic">
                  {t('ricin.title_refined')}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-stone-200 max-w-2xl font-light leading-relaxed"
              >
                {t('ricin.intro')}
              </motion.p>
              
              <StaggerContainer className="flex flex-wrap gap-3 pt-2" staggerDelay={0.12}>
                <StaggerItem direction="none">
                  <span className="px-3 py-1 rounded-lg bg-[#143527] border border-[#2d6a4f] text-xs text-stone-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#E9C46A]" />
                    {t('ricin.solvent_free')}
                  </span>
                </StaggerItem>
                <StaggerItem direction="none">
                  <span className="px-3 py-1 rounded-lg bg-[#143527] border border-[#2d6a4f] text-xs text-stone-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#E9C46A]" />
                    {t('ricin.ricinoleic_acid')}
                  </span>
                </StaggerItem>
                <StaggerItem direction="none">
                  <span className="px-3 py-1 rounded-lg bg-[#143527] border border-[#2d6a4f] text-xs text-stone-200 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#E9C46A]" />
                    {t('ricin.fob_info')}
                  </span>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <FadeInSection direction="left" delay={0.4}>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center max-w-xs w-full">
                  <span className="text-xs text-[#E9C46A] font-bold tracking-wider uppercase block">
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
                ? 'border-[#2E7D32] text-[#1B4332] bg-[#1B4332]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#2E7D32]" />
            <span>{t('ricin.tab_retail')}</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-[#2E7D32] text-[#1B4332] bg-[#1B4332]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Truck className="w-4 h-4 text-[#2E7D32]" />
            <span>{t('ricin.tab_export')}</span>
          </button>

          <button
            onClick={() => setActiveTab('science')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'science'
                ? 'border-[#2E7D32] text-[#1B4332] bg-[#1B4332]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
            <span>{t('ricin.tab_science')}</span>
          </button>

          <button
            onClick={() => setActiveTab('recettes')}
            className={`pb-4 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'recettes'
                ? 'border-[#2E7D32] text-[#1B4332] bg-[#1B4332]/5'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#2E7D32]" />
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
              <div className="rounded-3xl overflow-hidden bg-[#1B4332] border border-[#2d6a4f] shadow-md p-4 flex items-center justify-center">
                <ImageWithSkeleton
                  src={product.image}
                  alt="Pure castor oil from Panyen Lokal"
                  containerClassName="w-full h-80 sm:h-96 flex items-center justify-center"
                  imgClassName="w-full h-80 sm:h-96 object-contain"
                />
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
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
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wider">
                  {t('ricin.retail_selector')}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1F2937] mt-1">
                  {t('ricin.order_title')}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {t('ricin.order_subtitle')}
                </p>
              </div>

              {/* Format selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  {t('ricin.formats_label')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {detailFormats.map((fmt) => {
                    const isSelected = selectedFormat === fmt;
                    const price = product.formatPricing?.[fmt];
                    return (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#2E7D32] bg-[#1B4332] text-white ring-2 ring-[#2E7D32]/30'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <div className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-stone-900'}`}>{fmt}</div>
                        {price && (
                          <div className={`text-[11px] font-extrabold mt-0.5 ${isSelected ? 'text-[#E9C46A]' : 'text-[#2E7D32]'}`}>
                            ${price.priceUSD.toFixed(2)} USD
                          </div>
                        )}
                        <div className={`text-[10px] truncate ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          {price?.unit}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-700">{t('detail.quantity')}</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-bold text-xs text-[#1B4332] min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div>
                  <span className="text-xs text-stone-500 block">{t('ricin.order_total_label')}</span>
                  <span className="text-xl font-extrabold text-[#1B4332]">
                    ${((currentPrice?.priceUSD || 0) * quantity).toFixed(2)} USD
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-stone-700 block">
                    {((currentPrice?.priceHTG || 0) * quantity).toLocaleString()} HTG
                  </span>
                  <span className="text-[10px] text-stone-500">{t('ricin.tax_inc')}</span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOrder}
                className="w-full py-4 px-6 rounded-2xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#388E3C]"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>{t('ricin.add_to_cart_btn').replace('{quantity}', quantity.toString()).replace('{format}', selectedFormat)}</span>
              </motion.button>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  {t('ricin.shipping_fast')}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  {t('ricin.secure_payment')}
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase mb-2 border border-[#1B4332]/20">
                  <Truck className="w-3.5 h-3.5 text-[#1B4332]" />
                  <span>{t('ricin.export_tag')}</span>
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
                className="px-5 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs shadow transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-auto cursor-pointer border border-[#388E3C]"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>{t('ricin.container_btn')}</span>
              </button>
            </div>

            {/* B2B Export Format Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Format 1: Gallon */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-2xl border-2 border-stone-200 hover:border-[#2E7D32] bg-white transition-all space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-[#1B4332] uppercase">{t('ricin.format_gallon_tag')}</span>
                    <h4 className="text-xl font-bold font-serif text-[#1F2937] mt-0.5">
                      {t('ricin.format_gallon_title')}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1B4332] text-[#E9C46A] border border-[#2E7D32] text-xs font-bold">
                    $145.00 USD
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.format_gallon_desc')}
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{t('ricin.format_gallon_stat1')}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{t('ricin.format_gallon_stat2')}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{t('ricin.format_gallon_stat3')}</span>
                  </li>
                </ul>
                <button
                  onClick={() => onRequestQuote(product, '1 Gallon')}
                  className="w-full py-3 rounded-xl bg-[#1B4332] hover:bg-[#153427] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E9C46A]" />
                  <span>{t('ricin.format_gallon_btn')}</span>
                </button>
              </motion.div>

              {/* Format 2: Baril 54 Gallons */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-2xl border-2 border-[#2E7D32] bg-white transition-all space-y-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-[#1B4332] uppercase">{t('ricin.format_drum_tag')}</span>
                    <h4 className="text-xl font-bold font-serif text-[#1F2937] mt-0.5">
                      {t('ricin.format_drum_title')}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E9C46A] text-[#1F2937] text-xs font-black">
                    $2,450.00 USD
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.format_drum_desc')}
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{t('ricin.format_drum_stat1')}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{t('ricin.format_drum_stat2')}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{t('ricin.format_drum_stat3')}</span>
                  </li>
                </ul>
                <button
                  onClick={() => onRequestQuote(product, 'Baril Export 54 Gallons')}
                  className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer border border-[#388E3C]"
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
              <span className="text-xs font-bold text-[#1B4332] uppercase">{t('ricin.knowhow_tag')}</span>
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
                <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-[#E9C46A] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h5 className="font-bold text-sm text-[#1F2937]">{t('ricin.step1_title')}</h5>
                <p className="text-xs text-stone-600">
                  {t('ricin.step1_desc')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-[#E9C46A] flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h5 className="font-bold text-sm text-[#1F2937]">{t('ricin.step2_title')}</h5>
                <p className="text-xs text-stone-600">
                  {t('ricin.step2_desc')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-[#E9C46A] flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h5 className="font-bold text-sm text-[#1F2937]">{t('ricin.step3_title')}</h5>
                <p className="text-xs text-stone-600">
                  {t('ricin.step3_desc')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-[#E9C46A] flex items-center justify-center font-bold text-xs">
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
              <div className="bg-[#1B4332] text-white p-4 font-bold text-sm flex justify-between items-center">
                <span>{t('ricin.lab_title')}</span>
                <span className="text-xs bg-[#E9C46A] text-[#1F2937] font-black px-2 py-0.5 rounded">{t('ricin.lab_status')}</span>
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
              <span className="text-xs font-bold text-[#1B4332] uppercase">{t('ricin.rituals_tag')}</span>
              <h3 className="text-2xl font-serif font-bold text-[#1F2937] mt-1">
                {t('ricin.rituals_title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 w-fit border border-amber-200">
                  <Sparkles className="w-5 h-5 text-[#E9C46A]" />
                </div>
                <h4 className="font-bold font-serif text-base text-[#1F2937]">
                  {t('ricin.ritual1_title')}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.ritual1_desc')}
                </p>
                <div className="text-[11px] font-semibold text-[#1B4332]">
                  {t('ricin.ritual1_freq')}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#1B4332] w-fit border border-emerald-200">
                  <Droplet className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h4 className="font-bold font-serif text-base text-[#1F2937]">
                  {t('ricin.ritual2_title')}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('ricin.ritual2_desc')}
                </p>
                <div className="text-[11px] font-semibold text-[#1B4332]">
                  {t('ricin.ritual2_freq')}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="p-2.5 rounded-xl bg-stone-100 text-stone-800 w-fit border border-stone-200">
                  <ShieldCheck className="w-5 h-5 text-[#1B4332]" />
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

