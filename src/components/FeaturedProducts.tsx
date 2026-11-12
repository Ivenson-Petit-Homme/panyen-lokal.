import React from 'react';
import { Product, PageRoute, DeliveryRegion } from '../types';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { ArrowRight } from 'lucide-react';

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
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const categories = [
    { id: 'all', label: isEn ? 'All' : 'Tous', count: products.length },
    { id: 'Huiles & Soins Naturels', label: t('catalog.cat_oils'), count: products.filter(p => p.category === 'Huiles & Soins Naturels').length },
    { id: 'Boissons & Liqueurs', label: t('catalog.cat_beverages'), count: products.filter(p => p.category === 'Boissons & Liqueurs').length },
    { id: 'Épicerie & Alimentaire', label: t('catalog.cat_grocery'), count: products.filter(p => p.category === 'Épicerie & Alimentaire').length }
  ];

  const displayList = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="featured-products-section" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <FadeInSection direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3D684A] mb-2">
                {isEn ? "Official Collection" : "Collection Officielle"}
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#1C3022] tracking-tight text-balance">
                {t('home.featured_title')}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                {isEn
                  ? "Four signature creations crafted with traceability and natural purity."
                  : "Quatre créations signatures élaborées avec exigence, traçabilité et pureté naturelle."}
              </p>
            </FadeInSection>
          </div>

          <FadeInSection direction="right" delay={0.15}>
            <button
              onClick={() => {
                setCurrentRoute('produits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3D684A] hover:bg-[#2A4833] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all group cursor-pointer whitespace-nowrap"
            >
              <span>{t('home.view_catalog_prefix')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
            </button>
          </FadeInSection>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#1C3022] text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-[#5B9B6E]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] tabular-nums ${
                activeCategory === cat.id ? 'text-[#76BD43]' : 'text-stone-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {displayList.map((product) => (
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
