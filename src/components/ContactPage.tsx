import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/productsData';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion } from 'motion/react';
import bgHeader from '../assets/images/CONTACT.jpg';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch {}
    confetti({ particleCount: 60, spread: 60 });
    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#FDFBF7] text-[#1F2937] pb-20">
      <div className="relative bg-[#2A4833] text-white border-b border-[#5B9B6E] overflow-hidden">
        {/* Background Image Container - Adjusted Height */}
        <div className="relative w-full h-[450px] sm:h-[550px] bg-[#2A4833]">
          <img
            src={bgHeader}
            alt="Panyen Lokal Facility"
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
                {t('contact.tag')}
              </div>
            </FadeInSection>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-5xl font-serif font-extrabold text-white drop-shadow-2xl"
            >
              {t('contact.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base text-white max-w-2xl font-medium drop-shadow-lg"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <FadeInSection direction="left">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#1F2937]">{t('contact.info_title')}</h3>
                <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                  {/* Haiti Office */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#3D684A] block">
                      {isEn ? "Haiti Site & Plant" : "Haïti — Site & Siège Industriel"}
                    </span>
                    <strong className="block text-[#1F2937] text-sm">Biwo Caracol — PANYEN LOKAL S.A.</strong>
                    <div className="flex items-start gap-2 pt-1">
                      <MapPin className="w-4 h-4 text-[#1C3022] shrink-0 mt-0.5" />
                      <span>{COMPANY_INFO.addressHaiti}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <Phone className="w-4 h-4 text-[#1C3022] shrink-0" />
                      <span>{COMPANY_INFO.phoneHaiti}</span>
                    </div>
                  </div>

                  {/* USA Office */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E59500] block">
                      {isEn ? "United States Corporation" : "États-Unis — Siège & Distribution"}
                    </span>
                    <strong className="block text-[#1F2937] text-sm">PANYEN LOKAL INC</strong>
                    <div className="flex items-start gap-2 pt-1">
                      <MapPin className="w-4 h-4 text-[#E59500] shrink-0 mt-0.5" />
                      <span>{COMPANY_INFO.addressUSA}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <Phone className="w-4 h-4 text-[#E59500] shrink-0" />
                      <span>Tél : <a href="tel:7814698708" className="hover:underline font-bold text-[#1C3022]">781-469-8708</a></span>
                    </div>
                  </div>

                  {/* Shared Email & Hours */}
                  <div className="flex items-start gap-3 pt-1">
                    <Mail className="w-5 h-5 text-[#1C3022] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1F2937]">{t('contact.email_title')}</strong>
                      <span><a href={`mailto:${COMPANY_INFO.email}`} className="text-[#1C3022] hover:underline font-semibold">{COMPANY_INFO.email}</a></span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#1C3022] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1F2937]">{t('contact.hours_label')}</strong>
                      <span>{t('contact.hours_val')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('contact.whatsapp_btn')}</span>
                  </motion.a>
                </div>
              </div>
            </FadeInSection>
          </div>

          <div className="lg:col-span-7">
            <FadeInSection direction="right">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-serif font-bold text-[#1F2937] mb-2">{t('contact.form_title')}</h3>
                <p className="text-xs text-stone-600 mb-6">{t('contact.form_desc')}</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-stone-50 rounded-2xl border border-[#5B9B6E] text-center space-y-3"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#1C3022] mx-auto" />
                    <h4 className="text-lg font-bold text-[#1F2937]">{t('contact.success_title')}</h4>
                    <p className="text-xs text-stone-600">{t('contact.success_desc')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">{t('contact.field_name')}</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                          placeholder={t('partners.field_name_placeholder')}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">{t('auth.email')} *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">{t('contact.field_subject')}</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                        placeholder={t('contact.field_subject')}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">{t('contact.field_message')}</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                        placeholder={t('contact.field_message')}
                      ></textarea>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-bold text-xs shadow border border-[#5B9B6E] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>{t('contact.send_btn')}</span>
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
};
