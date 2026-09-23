import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion } from 'motion/react';
import bgHeader from '../assets/images/PARTENARIA.jpg';
import {
  HeartHandshake, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Building2, 
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PartnershipsPageProps {
  setCurrentRoute: (route: PageRoute) => void;
}

export const PartnershipsPage: React.FC<PartnershipsPageProps> = ({ setCurrentRoute }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 70, spread: 60 });
    setSubmitted(true);
  };

  return (
    <div id="partnerships-page" className="min-h-screen bg-[#FDFBF7] text-[#1F2937] pb-20">
      {/* Hero Header - Balanced Height */}
      <div className="relative bg-[#1B4332] text-white border-b border-[#2D6A4F] overflow-hidden">
        {/* Background Image Container */}
        <div className="relative w-full h-[450px] sm:h-[550px] bg-[#1B4332]">
          <img
            src={bgHeader}
            alt="Panyen Lokal Partners"
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9C46A] text-[#1F2937] text-xs font-black uppercase tracking-wider shadow-lg">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{t('partners.tag')}</span>
              </div>
            </FadeInSection>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight drop-shadow-2xl"
            >
              {t('partners.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-white max-w-3xl font-medium leading-relaxed drop-shadow-lg"
            >
              {t('partners.intro')}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 3 Pillars of Partnership */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
          <StaggerItem className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white border border-[#2D6A4F] shadow-sm flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6 text-[#E9C46A]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1F2937]">
              {t('partners.pillar1_title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('partners.pillar1_desc')}
            </p>
            <ul className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t('partners.pillar1_stat1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t('partners.pillar1_stat2')}</span>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-bold">
              <Users className="w-6 h-6 text-[#E9C46A]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1F2937]">
              {t('partners.pillar2_title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('partners.pillar2_desc')}
            </p>
            <ul className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t('partners.pillar2_stat1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t('partners.pillar2_stat2')}</span>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1F2937]">
              {t('partners.pillar3_title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('partners.pillar3_desc')}
            </p>
            <ul className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t('partners.pillar3_stat1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t('partners.pillar3_stat2')}</span>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Form to reach partnership direction */}
        <FadeInSection threshold={0.2}>
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase text-[#1B4332]">{t('partners.form_tag')}</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2937] mt-1">
                {t('partners.form_title')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {t('partners.form_desc')}
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-white rounded-2xl border border-[#2D6A4F]/40 text-center space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#1B4332] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#1F2937]">{t('partners.success_title')}</h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  {t('partners.success_desc')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">{t('partners.field_name')}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                      placeholder={t('partners.field_name_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">{t('partners.field_org')}</label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                      placeholder={t('partners.field_org_placeholder')}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">{t('auth.email')} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                      placeholder="email@organisation.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">{t('auth.phone')}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                      placeholder="+509 / +1 / +33..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">{t('partners.field_message')}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('partners.field_message_placeholder')}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs shadow-md border border-[#2D6A4F] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{t('partners.submit_btn')}</span>
                </motion.button>
              </form>
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

