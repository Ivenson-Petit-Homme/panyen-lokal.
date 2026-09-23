import React from 'react';
import { Product, PageRoute, DeliveryRegion } from '../types';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion } from 'motion/react';
import {
  Sparkles, 
  ArrowRight, 
  Wine, 
  Cookie, 
  Droplet
} from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  selectedRegion?: DeliveryRegion;
  onAddToCart: (product: Product, selectedFormat: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product, format?: string) => void;
  setCurrentRoute: (route: PageRoute) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  selectedRegion = 'haiti',
  onAddToCart,
  onSelectProduct,
  onRequestQuote,
  setCurrentRoute
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Get the 5 main featured products: Ricin + 4 New Products
  const featuredList = products.filter(p => p.isFeatured);

  return (
    <section id="featured-products-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <FadeInSection direction="left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-white shadow-sm border border-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span className="text-white">{t('home.featured_tag')}</span>
              </div>
            </FadeInSection>
            <FadeInSection direction="left" delay={0.1}>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-[#1F2937] tracking-tight">
                {t('home.featured_title')}
              </h2>
            </FadeInSection>
            <FadeInSection direction="left" delay={0.2}>
              <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                {t('home.featured_subtitle')}
              </p>
            </FadeInSection>
          </div>

          <FadeInSection direction="right" delay={0.3}>
            <button
              onClick={() => {
                setCurrentRoute('produits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1B4332] hover:text-[#1B4332] transition-colors group self-start md:self-auto cursor-pointer"
            >
              <span>{t('home.view_catalog_prefix')} ({products.length} {t('home.products_suffix')})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#1B4332]" />
            </button>
          </FadeInSection>
        </div>

        {/* Bannière Récapitulative Officielle des 5 Produits & Localisation */}
        <FadeInSection threshold={0.2} delay={0.4}>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1B4332] text-white border border-[#2D6A4F] mb-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-wider">
                <span className="text-white">{t('home.location_full')}</span>
              </div>
              <p className="text-xs sm:text-sm text-white">
                <strong className="text-white">{t('home.core_products_label')}</strong> <span className="text-white">{t('home.core_products_list')}</span>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCurrentRoute('produits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold shrink-0 transition-colors shadow cursor-pointer border border-[#2D6A4F]"
            >
              {t('home.order_now_btn')}
            </motion.button>
          </div>
        </FadeInSection>

        {/* 3 Main Highlight Banners / Category Bridges */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10" staggerDelay={0.12}>
          <StaggerItem direction="up">
            <div
              onClick={() => {
                setCurrentRoute('huile-de-ricin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl bg-[#1B4332] border border-[#2D6A4F] text-white cursor-pointer hover:shadow-xl transition-all group flex items-start gap-4 h-full"
            >
              <div className="p-3 rounded-xl bg-white/10 text-white border border-white/20">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-white">
                  {t('hero.prod1')}
                </span>
                <h4 className="font-bold font-serif text-base text-white group-hover:text-stone-200 transition-colors">
                  {t('hero.prod1')}
                </h4>
                <p className="text-xs text-white mt-1">
                  {isEn ? "Traditional and refined excellence for hair care and bulk export." : "L'Excellence traditionnelle et raffinée pour soins capillaires et export en gros."}
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem direction="up">
            <div
              onClick={() => {
                setCurrentRoute('produits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl bg-[#1B4332] border border-[#2D6A4F] text-white cursor-pointer hover:shadow-xl transition-all group flex items-start gap-4 h-full"
            >
              <div className="p-3 rounded-xl bg-white/10 text-white">
                <Wine className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-white">
                  {t('catalog.category_spirits')}
                </span>
                <h4 className="font-bold font-serif text-base text-white group-hover:text-stone-200 transition-colors">
                  {t('home.category_spirits_title')}
                </h4>
                <p className="text-xs text-white mt-1">
                  {t('home.category_spirits_desc')}
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem direction="up">
            <div
              onClick={() => {
                setCurrentRoute('produits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl bg-[#1B4332] border border-[#2D6A4F] text-white cursor-pointer hover:shadow-xl transition-all group flex items-start gap-4 h-full"
            >
              <div className="p-3 rounded-xl bg-white/10 text-white">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-white">
                  {t('catalog.category_grocery')}
                </span>
                <h4 className="font-bold font-serif text-base text-white group-hover:text-stone-200 transition-colors">
                  {t('home.category_grocery_title')}
                </h4>
                <p className="text-xs text-white mt-1">
                  {t('home.category_grocery_desc')}
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Uniform Product Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.08}>
          {featuredList.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard
                product={product}
                selectedRegion={selectedRegion}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
                onRequestQuote={onRequestQuote}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

