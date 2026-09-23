import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X,
  Maximize2,
  Download,
  Target,
  CheckCircle2,
  Building2,
  Factory, 
  Tractor,
  ShoppingCart,
  Coins,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageRoute } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import rollupBannerImg from '../assets/images/panyen_lokal_rollup_banner_1787157033946.jpg';
import { TranslationKey } from '../utils/translations';

interface OfficialBannerSectionProps {
  setCurrentRoute: (route: PageRoute) => void;
}

export const OfficialBannerSection: React.FC<OfficialBannerSectionProps> = ({
  setCurrentRoute
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const objectives = [
    {
      icon: Tractor,
      labelKey: "banner.objective1.label",
      title: isEn ? "Produce & Harvest" : "Produire & Récolter",
      desc: isEn 
        ? "Network of 850+ farmers managing 1,650 hectares of castor, cacao, tamarind and cassava across 6 departments."
        : "Réseau de 850+ producteurs gérant 1 650 hectares de ricin, cacao, tamarin et manioc sur 6 départements."
    },
    {
      icon: Factory,
      labelKey: "banner.objective2.label",
      title: isEn ? "Process & Formulate" : "Transformer & Formuler",
      desc: isEn 
        ? "Clean mechanical cold-pressing, solvent-free extractions, and artisanal aging in the Caracol Industrial Park."
        : "Pressage mécanique à froid, extraction propre sans hexane et vieillissement artisanal au Complexe de Caracol."
    },
    {
      icon: ShoppingCart,
      labelKey: "banner.objective3.label",
      title: isEn ? "Commercialize & Export" : "Commercialiser & Exporter",
      desc: isEn 
        ? "National distribution in Haiti and international export (FCL drums, LCL pallets) to USA, Dominican Republic and Europe."
        : "Distribution nationale en Haïti et exportations internationales (fûts FCL, palettes LCL) vers USA, RD et Europe."
    },
    {
      icon: Coins,
      labelKey: "banner.objective4.label",
      title: isEn ? "Create Lasting Value" : "Créer de la Valeur Durable",
      desc: isEn 
        ? "Guaranteed fair price bonus for farming families, local job creation, and sustainable agroforestry."
        : "Prix bonifiés garantis aux familles paysannes, emplois industriels locaux et reforestation durable."
    }
  ];

  const featuredBannerProducts = [
    {
      nameKey: "hero.prod1",
      badgeKey: "banner.star_badge",
      descKey: "banner.ricin_desc"
    },
    {
      nameKey: "hero.prod2",
      badgeKey: "banner.grocery_badge",
      descKey: "banner.cacao_desc"
    },
    {
      nameKey: "hero.prod3",
      badgeKey: "banner.spirit_badge",
      descKey: "banner.tamarind_desc"
    },
    {
      nameKey: "hero.prod4",
      badgeKey: "banner.beverage_badge",
      descKey: "banner.honey_desc"
    }
  ];

  return (
    <section id="official-banner" className="py-20 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Heading */}
        <div className="text-center mb-16 space-y-4">
          <FadeInSection direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B4332] text-white text-xs font-black uppercase tracking-widest shadow-md">
              <Building2 className="w-4 h-4" />
              <span>{t('official.banner_tag')}</span>
            </div>
          </FadeInSection>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1B4332] drop-shadow-md"
          >
            {t('banner.title')}
          </motion.h2>
          <p className="text-base sm:text-lg text-stone-700 max-w-3xl mx-auto font-normal leading-relaxed opacity-95">
            {t('banner.desc')}
          </p>
        </div>

        {/* Main Grid: Banner Stand on Left + Strategic Interactive Content on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Roll-up Banner Stand Visual with Zoom Action */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              style={{ perspective: 1200 }}
              initial={{ rotateY: 15, opacity: 0, x: -30 }}
              whileInView={{ rotateY: 0, opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative group max-w-[340px] sm:max-w-[380px] w-full"
            >
              {/* Stand Shadow & Frame Effect */}
              <div className="absolute -inset-2 bg-gradient-to-b from-[#E9C46A]/20 via-[#1B4332]/30 to-[#E9C46A]/20 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              
              <motion.div
                whileHover={{ rotateY: -5, rotateX: 2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative bg-[#1B4332] p-2.5 sm:p-3 rounded-2xl border-2 border-[#E9C46A]/60 shadow-2xl overflow-hidden"
              >
                {/* Top aluminum stand bar simulation */}
                <div className="w-full h-3 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-t-md mb-2 shadow-inner flex items-center justify-center">
                  <div className="w-12 h-1 bg-stone-500 rounded-full" />
                </div>

                <div className="relative overflow-hidden rounded-xl bg-stone-900 aspect-[9/18] sm:aspect-[9/17]">
                  <ImageWithSkeleton
                    src={rollupBannerImg}
                    alt="Panyen Lokal Official Banner Stand"
                    containerClassName="w-full h-full"
                    imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Interaction UI */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLightboxOpen(true)}
                      className="w-16 h-16 rounded-full bg-[#E9C46A] text-[#1B4332] flex items-center justify-center shadow-2xl mb-4 cursor-pointer"
                    >
                      <Maximize2 className="w-8 h-8" />
                    </motion.button>
                    <p className="text-white text-xs font-black uppercase tracking-tighter text-center">
                      {t('banner.enlarge_label')}
                    </p>
                  </div>
                </div>

                {/* Bottom aluminum base simulation */}
                <div className="w-full h-12 bg-gradient-to-b from-stone-300 via-stone-400 to-stone-200 rounded-b-md mt-2 shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="w-full h-px bg-white/20 absolute top-0" />
                  <div className="w-3/4 h-2 bg-stone-500/20 rounded-full mb-1" />
                  <span className="text-[8px] font-black text-stone-800 uppercase tracking-widest opacity-60">PANYEN LOKAL S.A. OFFICIAL DISPLAY</span>
                </div>
              </motion.div>

              {/* Floor contact simulation */}
              <div className="w-4/5 h-4 bg-stone-950/20 blur-xl rounded-full mx-auto mt-4" />
            </motion.div>

            {/* Strategic Quote under stand */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <p className="text-sm font-serif italic text-[#1B4332] font-semibold">
                {t('banner.quote')}
              </p>
              <div className="w-12 h-0.5 bg-[#E9C46A] mx-auto mt-2" />
            </motion.div>
          </div>

          {/* Right Column: Key Pillars & Staggered Reveal */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <FadeInSection direction="right">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#E9C46A]/15 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#1B4332]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2937]">
                    {t('banner.objectives_title')}
                  </h3>
                </div>
              </FadeInSection>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" staggerDelay={0.15}>
                {objectives.map((obj, idx) => {
                  const Icon = obj.icon;
                  return (
                    <StaggerItem
                      key={idx}
                      direction="right"
                      distance={20}
                      className="p-4 rounded-2xl bg-[#143527]/90 border border-[#2D6A4F] hover:border-white transition-all hover:bg-[#1a4231] group space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#E9C46A] text-[#1B4332] flex items-center justify-center shrink-0 font-bold shadow">
                          <Icon className="w-4 h-4 text-[#1B4332]" />
                        </div>
                        <div>
                          <span className="text-xs font-black uppercase text-white tracking-wider block">
                            {t(obj.labelKey as TranslationKey)}
                          </span>
                          <h4 className="text-sm font-bold text-white transition-colors">
                            {obj.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-white leading-relaxed pl-10 opacity-95">
                        {obj.desc}
                      </p>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            {/* Featured Section for Products mentioned on Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#1B4332] border border-[#2D6A4F] text-white shadow-xl space-y-6"
            >
              <h4 className="text-lg font-serif font-bold flex items-center gap-2 text-white">
                <div className="w-1.5 h-6 bg-white rounded-full" />
                {t('banner.products_title')}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredBannerProducts.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    className="p-3.5 rounded-xl bg-[#1B4332] border border-[#2D6A4F] flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs sm:text-sm font-bold text-white">{t(p.nameKey as TranslationKey)}</h5>
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-white/20 text-white border border-white/30">
                          {t(p.badgeKey as TranslationKey)}
                        </span>
                      </div>
                      <p className="text-[11px] text-white leading-tight opacity-95">{t(p.descKey as TranslationKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setCurrentRoute('produits');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E9C46A] hover:bg-[#d4b05a] text-[#1F2937] text-xs font-black shadow-lg flex items-center gap-2 cursor-pointer transition-all transform hover:translate-y-[-2px] active:translate-y-0"
                >
                  <span>{t('banner.view_products_btn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentRoute('marches-export');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-[#1B4332] text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer transition-all border border-stone-300"
                >
                  <span>{t('banner.b2b_btn')}</span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Resolution Banner Stand */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            id="banner-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl max-h-[95vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Fèmen"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="bg-[#1B4332] p-3 rounded-2xl border-2 border-[#E9C46A] shadow-2xl max-h-[85vh] overflow-y-auto">
                <ImageWithSkeleton
                  src={rollupBannerImg}
                  alt="Banyè Ofisyèl Panyen Lokal"
                  containerClassName="w-full h-auto max-h-[75vh] flex items-center justify-center rounded-lg"
                  imgClassName="w-full h-auto object-contain rounded-lg max-h-[75vh]"
                />

                <div className="mt-3 flex items-center justify-between text-xs text-stone-200 px-2">
                  <div>
                    <strong className="text-[#E9C46A] block font-serif text-sm">PANYEN LOKAL • Stand Roll-up</strong>
                    <span>{t('banner.quote')}</span>
                  </div>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = rollupBannerImg;
                      link.download = 'Panyen_Lokal_Official_Banner.jpg';
                      link.target = '_blank';
                      link.click();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#143527] text-white font-bold flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('banner.download_simple')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
