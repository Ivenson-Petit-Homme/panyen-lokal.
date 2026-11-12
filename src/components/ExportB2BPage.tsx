import React, { useState } from 'react';
import { Product, PageRoute, B2BQuoteInquiry } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion, AnimatePresence } from 'motion/react';
import bgHeader from '../assets/images/EXPORT.jpg';
import {
  Truck, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Building2, 
  Package, 
  Ship
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportB2BPageProps {
  products: Product[];
  setCurrentRoute: (route: PageRoute) => void;
  onRequestQuoteWithItem?: (product: Product, format: string) => void;
  quoteProduct?: Product | null;
  quoteFormat?: string;
}

export const ExportB2BPage: React.FC<ExportB2BPageProps> = ({ 
  products, 
  setCurrentRoute,
  quoteProduct,
  quoteFormat
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Container & Drum Simulator State
  const [drumCount, setDrumCount] = useState<number>(8); // 8 barrels of 54 gal
  const [gallonCount, setGallonCount] = useState<number>(20);
  const [selectedIncoterm, setSelectedIncoterm] = useState<'FOB Cap-Haïtien' | 'FOB Port-au-Prince' | 'CIF Miami' | 'CIF Le Havre / Anvers'>('FOB Cap-Haïtien');

  // Form State
  const [formData, setFormData] = useState<B2BQuoteInquiry>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    industry: 'Cosmétique',
    incoterm: 'FOB Cap-Haïtien',
    targetDate: '',
    items: [
      { 
        productId: quoteProduct?.id || 'huile-de-ricin', 
        productName: quoteProduct?.title || 'Huile de Ricin Pure', 
        format: quoteFormat || 'Baril Export 54 Gallons', 
        quantity: 4 
      }
    ],
    customRequirements: quoteProduct ? (isEn ? `Quote requested specifically for: ${quoteProduct.title} (Format: ${quoteFormat || 'Standard Wholesale'})` : `Demande de devis spécifique pour : ${quoteProduct.title} (Format : ${quoteFormat || 'Standard Grossiste'})`) : ''
  });

  // Update when quoteProduct or quoteFormat changes
  React.useEffect(() => {
    if (quoteProduct) {
      setFormData((prev) => ({
        ...prev,
        items: [
          {
            productId: quoteProduct.id,
            productName: quoteProduct.title,
            format: quoteFormat || 'Baril Export 54 Gallons',
            quantity: 4
          }
        ],
        customRequirements: isEn 
          ? `Quote requested specifically for: ${quoteProduct.title} (Format: ${quoteFormat || 'Standard Wholesale'})`
          : `Demande de devis spécifique pour : ${quoteProduct.title} (Format : ${quoteFormat || 'Standard Grossiste'})`
      }));
    }
  }, [quoteProduct, quoteFormat, isEn]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  // Calculations for Drums
  const drumVolumeLiters = drumCount * 204;
  const drumWeightKg = drumCount * 195;
  const palletsCount = Math.ceil(drumCount / 4);
  const drumCostEstimateUSD = drumCount * 2450;
  const gallonCostEstimateUSD = gallonCount * 145;
  const totalEstimateUSD = drumCostEstimateUSD + gallonCostEstimateUSD;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/b2b-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmittedReference(data.reference || `PL-B2B-${Date.now().toString().slice(-6)}`);
    } catch (err) {
      // Fallback
      setSubmittedReference(`PL-B2B-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="export-b2b-page" className="min-h-screen bg-[#FDFBF7] text-[#1F2937] pb-20">
      {/* Hero Header - Balanced Height */}
      <div className="relative bg-[#2A4833] text-white border-b border-[#5B9B6E] overflow-hidden">
        {/* Background Image Container */}
        <div className="relative w-full h-[450px] sm:h-[550px] bg-[#2A4833]">
          <img
            src={bgHeader}
            alt="Panyen Lokal Industrial Complex"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover opacity-85"
          />
          {/* Dark Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 w-full">
            <FadeInSection direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E59500] text-[#1F2937] text-xs font-black uppercase tracking-wider shadow-lg">
                <Truck className="w-3.5 h-3.5" />
                <span>{t('export.tag')}</span>
              </div>
            </FadeInSection>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight drop-shadow-2xl"
            >
              {t('export.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-white max-w-3xl font-medium leading-relaxed drop-shadow-lg"
            >
              {t('export.intro')}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Quality & International Logistics Guarantees */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          <StaggerItem className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-900 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1F2937]">
              {t('export.pillar1_title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('export.pillar1_desc')}
            </p>
          </StaggerItem>

          <StaggerItem className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="p-3 rounded-xl bg-[#2A4833]/10 text-[#1C3022] border border-[#2A4833]/20 w-fit">
              <Ship className="w-6 h-6 text-[#1C3022]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1F2937]">
              {t('export.pillar2_title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('export.pillar2_desc')}
            </p>
          </StaggerItem>

          <StaggerItem className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="p-3 rounded-xl bg-stone-100 text-stone-800 w-fit">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1F2937]">
              {t('export.pillar3_title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('export.pillar3_desc')}
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Interactive Container & Volume Calculator */}
        <FadeInSection threshold={0.1}>
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold uppercase text-[#1C3022]">{t('export.sim_tag')}</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2937] mt-1">
                  {t('export.sim_title')}
                </h2>
              </div>
              <span className="text-xs bg-[#2A4833] text-white font-bold px-3.5 py-1.5 rounded-xl border border-[#5B9B6E] shadow-sm">
                {t('export.sim_badge')}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders and Selectors */}
              <div className="lg:col-span-7 space-y-6">
                {/* Drum slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-[#1C3022]" />
                      {t('export.sim_drum_label')}
                    </span>
                    <span className="text-base font-extrabold text-[#1C3022] bg-stone-100 px-3 py-1 rounded-lg border border-stone-200">
                      {drumCount} {t('export.sim_drum_unit')} ({drumVolumeLiters} L)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={drumCount}
                    onChange={(e) => setDrumCount(parseInt(e.target.value) || 0)}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1C3022]"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                    <span>{t('export.sim_drum_hint0')}</span>
                    <span>{t('export.sim_drum_hint10')}</span>
                    <span>{t('export.sim_drum_hint20')}</span>
                    <span>{t('export.sim_drum_hint40')}</span>
                  </div>
                </div>

                {/* Gallon slider */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex justify-between items-center text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-[#1C3022]" />
                      {t('export.sim_gallon_label')}
                    </span>
                    <span className="text-base font-extrabold text-[#1C3022] bg-stone-100 px-3 py-1 rounded-lg border border-stone-200">
                      {gallonCount} gallons ({(gallonCount * 3.78).toFixed(1)} L)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={gallonCount}
                    onChange={(e) => setGallonCount(parseInt(e.target.value) || 0)}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1C3022]"
                  />
                </div>

                {/* Incoterm Choice */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="text-xs font-bold text-stone-700 block">
                    {t('export.sim_incoterm_label')}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['FOB Cap-Haïtien', 'FOB Port-au-Prince', 'CIF Miami', 'CIF Le Havre / Anvers'] as const).map((inc) => (
                      <button
                        key={inc}
                        type="button"
                        onClick={() => setSelectedIncoterm(inc)}
                        className={`p-2.5 rounded-xl border font-bold text-left transition-all cursor-pointer ${
                          selectedIncoterm === inc
                            ? 'bg-[#2A4833] text-white border-[#5B9B6E]'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        {inc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Logistics Summary Card */}
              <div className="lg:col-span-5 bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#1C3022]">{t('export.sim_summary_tag')}</span>
                  <span className="text-[10px] text-stone-500 font-mono">B2B RATE v2.0</span>
                </div>

                <div className="divide-y divide-stone-200 text-xs space-y-2">
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-600">{t('export.sim_summary_volume')}</span>
                    <span className="font-bold text-[#1F2937]">
                      {(drumVolumeLiters + gallonCount * 3.78).toFixed(1)} Litres
                    </span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-600">{t('export.sim_summary_weight')}</span>
                    <span className="font-bold text-[#1F2937]">
                      {(drumWeightKg + gallonCount * 3.6).toFixed(0)} kg
                    </span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-600">{t('export.sim_summary_pallets')}</span>
                    <span className="font-bold text-[#1F2937]">
                      {palletsCount} {t('export.sim_summary_pallets_unit')}
                    </span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-600">{t('export.sim_summary_incoterm')}</span>
                    <span className="font-bold text-[#1C3022]">{selectedIncoterm}</span>
                  </div>
                  <div className="pt-3 flex justify-between items-baseline border-t border-stone-300">
                    <span className="font-extrabold text-[#1F2937] text-sm">{t('export.sim_summary_value')}</span>
                    <span className="text-xl font-extrabold text-[#1C3022]">
                      ${totalEstimateUSD.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-stone-500 italic">
                  {t('export.sim_summary_note')}
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* B2B Quotation Form */}
        <FadeInSection threshold={0.1}>
          <div id="b2b-quote-form-section" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A4833] text-white text-xs font-bold uppercase mb-2 border border-[#5B9B6E] shadow-sm">
                <FileText className="w-3.5 h-3.5 text-[#E59500]" />
                <span className="text-white">{t('export.form_tag')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2937]">
                {t('export.form_title')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {t('export.form_desc')}
              </p>
            </div>

            {submittedReference ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-stone-50 rounded-2xl border border-[#5B9B6E] text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#2A4833] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif text-[#1F2937]">
                  {t('export.form_success_title')}
                </h3>
                <p className="text-sm text-stone-700 max-w-lg mx-auto">
                  {t('export.form_success_ref_prefix')} <strong className="font-mono text-[#1C3022]">{submittedReference}</strong>. {t('export.form_success_desc')}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmittedReference(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-bold text-xs shadow cursor-pointer"
                  >
                    {t('export.form_retry_btn')}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t('export.field_company')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={t('export.field_company_placeholder')}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t('export.field_manager')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Ex: Jean-Marc Dupont"
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t('export.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="purchasing@your-company.com"
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t('export.phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 / +33 / +509..."
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t('export.field_dest')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder={t('export.field_dest_placeholder')}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t('export.field_industry')}
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value as any })}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none bg-white"
                    >
                      <option value="Cosmétique">{isEn ? "Cosmetics & Hair Care" : "Cosmétique & Soins Capillaires"}</option>
                      <option value="Pharmaceutique">{isEn ? "Pharmaceutical & Healthcare" : "Pharmaceutique & Santé"}</option>
                      <option value="Distribution Agroalimentaire">{isEn ? "Agri-food Distribution" : "Distribution Agroalimentaire"}</option>
                      <option value="Importateur">{isEn ? "Importer / General Wholesaler" : "Importateur / Grossiste Général"}</option>
                      <option value="Autre">{isEn ? "Other Industry" : "Autre Industry"}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {t('export.field_requirements')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.customRequirements}
                    onChange={(e) => setFormData({ ...formData, customRequirements: e.target.value })}
                    placeholder={t('export.field_requirements_placeholder')}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-stone-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1C3022]" />
                    <span>{t('export.field_confidential')}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{isSubmitting ? t('export.submit_btn_loading') : t('export.submit_btn_ready')}</span>
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

