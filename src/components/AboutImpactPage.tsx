import React, { useState } from 'react';
import { HAITI_DEPARTMENTS_ORCHARDS } from '../data/productsData';
import { DepartmentOrchard, PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { OfficialBannerSection } from './OfficialBannerSection';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion } from 'motion/react';
import recolteImg from '../assets/images/recolte_ricin_moringa_1786859405918.jpg';
import bgHeader from '../assets/images/MissionIM.jpg';
import {
  Sprout, 
  MapPin, 
  Building2, 
  TreePine,
  ArrowRight
} from 'lucide-react';
import { TranslationKey } from '../utils/translations';

interface AboutImpactPageProps {
  setCurrentRoute: (route: PageRoute) => void;
}

export const AboutImpactPage: React.FC<AboutImpactPageProps> = ({ setCurrentRoute }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [selectedDept, setSelectedDept] = useState<DepartmentOrchard>(HAITI_DEPARTMENTS_ORCHARDS[0]);

  return (
    <div id="about-impact-page" className="min-h-screen bg-[#FDFBF7] text-[#1F2937] pb-20">
      {/* Top Banner Header - Balanced Height */}
      <div className="relative bg-[#1B4332] text-white border-b border-[#2D6A4F] overflow-hidden">
        {/* Background Image Container */}
        <div className="relative w-full h-[450px] sm:h-[550px] bg-[#1B4332]">
          <img
            src={bgHeader}
            alt="Panyen Lokal Agriculture"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover opacity-85"
          />
          {/* Dark Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content Over Image */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 w-full">
            <FadeInSection direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9C46A] text-[#1F2937] text-xs font-black uppercase tracking-wider shadow-lg">
                <Sprout className="w-3.5 h-3.5" />
                <span>{t('about.tag')}</span>
              </div>
            </FadeInSection>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight drop-shadow-2xl"
            >
              {t('about.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-white max-w-2xl font-medium leading-relaxed drop-shadow-lg"
            >
              {t('about.p_intro')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Key Numbers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.1}>
          <StaggerItem className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md text-center">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1B4332]">850+</div>
            <p className="text-xs sm:text-sm font-semibold text-stone-700 mt-1">{t('about.stat_farmers_label')}</p>
            <p className="text-[11px] text-stone-500">{t('about.stat_farmers_sub')}</p>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md text-center">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1B4332]">6</div>
            <p className="text-xs sm:text-sm font-semibold text-stone-700 mt-1">{t('about.stat_depts_label')}</p>
            <p className="text-[11px] text-stone-500">{t('about.stat_depts_sub')}</p>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md text-center">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1B4332]">1 650</div>
            <p className="text-xs sm:text-sm font-semibold text-stone-700 mt-1">{t('about.stat_hectares_label')}</p>
            <p className="text-[11px] text-stone-500">{t('about.stat_hectares_sub')}</p>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md text-center">
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1B4332]">0%</div>
            <p className="text-xs sm:text-sm font-semibold text-stone-700 mt-1">{t('about.stat_solvents_label')}</p>
            <p className="text-[11px] text-stone-500">{t('about.stat_solvents_sub')}</p>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Main Narrative & Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <FadeInSection direction="left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-white shadow-sm border border-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span className="text-white">{t('about.model_tag')}</span>
              </div>
            </FadeInSection>

            <FadeInSection direction="left" delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1F2937] leading-tight">
                {t('about.model_title')}
              </h2>
            </FadeInSection>

            <FadeInSection direction="left" delay={0.2}>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {t('about.model_desc')}
              </p>
            </FadeInSection>

            <StaggerContainer className="space-y-3 text-xs sm:text-sm text-stone-700" staggerDelay={0.15}>
              <StaggerItem direction="left" className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
                <div className="w-6 h-6 rounded-md bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-stone-900 block">{t('about.model_step1_title')}</strong>
                  {t('about.model_step1_desc')}
                </div>
              </StaggerItem>

              <StaggerItem direction="left" className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
                <div className="w-6 h-6 rounded-md bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-stone-900 block">{t('about.model_step2_title')}</strong>
                  {t('about.model_step2_desc')}
                </div>
              </StaggerItem>

              <StaggerItem direction="left" className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
                <div className="w-6 h-6 rounded-md bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-stone-900 block">{t('about.model_step3_title')}</strong>
                  {t('about.model_step3_desc')}
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          <div className="lg:col-span-6">
            <FadeInSection direction="right">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-white p-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageWithSkeleton
                    src={recolteImg}
                    alt="Plantation et paysans partenaires de Panyen Lokal en Haïti"
                    containerClassName="w-full h-80 sm:h-96 rounded-2xl"
                    imgClassName="w-full h-80 sm:h-96 object-cover rounded-2xl"
                  />
                </motion.div>
                <div className="p-4 text-center">
                  <p className="text-xs font-serif italic text-stone-600">
                    {t('about.quote')}
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Interactive Haitian Orchards Map & Explorer across 6 departments */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
          <FadeInSection threshold={0.2} className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-white shadow-sm border border-[#2D6A4F] text-xs font-bold uppercase">
              <TreePine className="w-3.5 h-3.5 text-[#E9C46A]" />
              <span className="text-white">{t('about.orchards_tag')}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#1F2937]">
              {t('about.orchards_title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              {t('about.orchards_desc')}
            </p>
          </FadeInSection>

          {/* Department Selection Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {HAITI_DEPARTMENTS_ORCHARDS.map((dept) => {
              const isSelected = selectedDept.id === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B4332] text-white shadow-md'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#1B4332]'}`} />
                  <span>{dept.name}</span>
                </button>
              );
            })}
          </div>

          {/* Department Detail Display Card */}
          <motion.div
            key={selectedDept.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-md bg-[#1B4332] text-white">
                  {t('about.dept_prefix')} {selectedDept.name}
                </span>
                <span className="text-xs font-serif italic text-stone-600">
                  {t('about.hub_label')} {selectedDept.capital}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2937]">
                {selectedDept.description}
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">{t('about.stat_area')}</span>
                  <span className="text-base font-extrabold text-[#1B4332]">{selectedDept.hectares} ha</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">{t('about.stat_producers')}</span>
                  <span className="text-base font-extrabold text-[#1B4332]">{selectedDept.producersCount} {t('about.stat_unit')}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">{t('about.stat_altitude')}</span>
                  <span className="text-xs font-bold text-stone-800">{selectedDept.altitude}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-stone-700 block mb-1.5">
                  {t('about.crops_label')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDept.keyCrops.map((crop, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#1B4332] border border-stone-200">
                      🌿 {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Terroir representation */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center mx-auto shadow-md">
                <Sprout className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-[#1F2937] text-sm">
                {t('about.unit_prefix')} {selectedDept.name}
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('about.unit_desc')}
              </p>
              <button
                onClick={() => {
                  setCurrentRoute('partenariats');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:underline cursor-pointer"
              >
                <span>{t('about.invest_btn')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1B4332]" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Official Stand & Roll-up Banner Section */}
      <OfficialBannerSection setCurrentRoute={setCurrentRoute} />
    </div>
  );
};

