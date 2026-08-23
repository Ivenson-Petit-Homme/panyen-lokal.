import React, { useState, useMemo } from 'react';
import { Product, PageRoute, DeliveryRegion } from '../types';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import {
  Search, 
  Filter, 
  Sparkles, 
  SlidersHorizontal
} from 'lucide-react';

interface CatalogPageProps {
  products: Product[];
  selectedRegion?: DeliveryRegion;
  onAddToCart: (product: Product, selectedFormat: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product, format?: string) => void;
  setCurrentRoute?: (route: PageRoute) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  selectedRegion = 'haiti',
  onAddToCart,
  onSelectProduct,
  onRequestQuote
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'price-asc' | 'price-desc'>('featured');

  const categories: { id: string; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', label: t('catalog.all'), count: products.length },
      { 
        id: 'Huiles & Soins Naturels', 
        label: t('catalog.cat_oils'), 
        count: products.filter(p => p.category === 'Huiles & Soins Naturels').length 
      },
      { 
        id: 'Boissons & Liqueurs', 
        label: t('catalog.cat_beverages'), 
        count: products.filter(p => p.category === 'Boissons & Liqueurs').length 
      },
      { 
        id: 'Épicerie & Alimentaire', 
        label: t('catalog.cat_grocery'), 
        count: products.filter(p => p.category === 'Épicerie & Alimentaire').length 
      }
    ];
  }, [products, language]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Stock filter
        if (inStockOnly && !product.inStock) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchOrigin = product.origin.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          return matchTitle || matchDesc || matchOrigin || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.id === 'huile-de-ricin') return -1;
          if (b.id === 'huile-de-ricin') return 1;
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <div id="catalog-page" className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <FadeInSection direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>{t('catalog.tag')}</span>
            </div>
          </FadeInSection>
          <FadeInSection direction="none" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1F2937]">
              {t('catalog.title')}
            </h1>
          </FadeInSection>
          <FadeInSection direction="none" delay={0.2}>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {t('catalog.subtitle')}
            </p>
          </FadeInSection>

          {/* Quick Bar */}
          <FadeInSection direction="up" delay={0.3}>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#1B4332] text-white text-xs shadow-md">
              <span className="text-[#E9C46A] font-bold px-2">📍 {t('catalog.location_prefix')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">{t('hero.prod1')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">{t('hero.prod2')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">{t('hero.prod3')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">{t('hero.prod4')}</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">{t('hero.prod5')}</span>
            </div>
          </FadeInSection>
        </div>

        {/* Search, Filter & Categories Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          {/* Search Input and Sort Selection */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('catalog.search_placeholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-xs sm:text-sm bg-stone-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#1B4332] focus:ring-[#2E7D32] w-4 h-4 accent-[#2E7D32]"
                />
                <span>{t('catalog.in_stock_only')}</span>
              </label>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                >
                  <option value="featured">{t('catalog.sort_featured')}</option>
                  <option value="name">{t('catalog.sort_name')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3 Main Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#1B4332] text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#E9C46A] text-[#1F2937] font-bold' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.08}>
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2937]">{t('catalog.no_match')}</h3>
            <p className="text-xs text-stone-500">
              {t('catalog.reset_prompt')}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white text-xs font-bold cursor-pointer"
            >
              {t('catalog.reset_filters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

