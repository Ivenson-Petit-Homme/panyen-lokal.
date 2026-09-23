import React, { useState, useEffect } from 'react';
import { PageRoute, Product, CartItem, DeliveryRegion, UserAccount, Order } from './types';
import { PRODUCTS_DATA } from './data/productsData';
import bgMissionImg from './assets/images/MissionIM.jpg';
import bgExportImg from './assets/images/EXPORT.jpg';
import bgPartnershipImg from './assets/images/PARTENARIA.jpg';
import bgContactImg from './assets/images/CONTACT.jpg';

// Instant browser preloading for all page headers
if (typeof window !== 'undefined') {
  [bgMissionImg, bgExportImg, bgPartnershipImg, bgContactImg].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
import { getRegionalPrice, REGIONS_CONFIG } from './utils/pricing';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroRicin } from './components/HeroRicin';
import { AgriEnterpriseShowcase } from './components/AgriEnterpriseShowcase';
import { FeaturedProducts } from './components/FeaturedProducts';
import { HuileDeRicinPage } from './components/HuileDeRicinPage';
import { CatalogPage } from './components/CatalogPage';
import { AboutImpactPage } from './components/AboutImpactPage';
import { OfficialBannerSection } from './components/OfficialBannerSection';
import { ExportB2BPage } from './components/ExportB2BPage';
import { PartnershipsPage } from './components/PartnershipsPage';
import { ContactPage } from './components/ContactPage';
import { MyAccountPage } from './components/MyAccountPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartQuoteDrawer } from './components/CartQuoteDrawer';
import { AuthModal } from './components/AuthModal';
import { RegionSelectorModal } from './components/RegionSelectorModal';
import { BackToTopButton } from './components/BackToTopButton';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminQuotes } from './components/admin/AdminQuotes';
import { AdminUsers } from './components/admin/AdminUsers';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from DB if available
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [quoteFormat, setQuoteFormat] = useState<string | undefined>(undefined);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  
  // Region & Destination state
  const [selectedRegion, setSelectedRegion] = useState<DeliveryRegion>(() => {
    try {
      const saved = localStorage.getItem('panyen_lokal_region_v2');
      return (saved as DeliveryRegion) || 'haiti';
    } catch {
      return 'haiti';
    }
  });

  const [regionModalOpen, setRegionModalOpen] = useState<boolean>(false);

  // Authentication & User Account state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('panyen_lokal_user_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authNotice, setAuthNotice] = useState<string>('');

  // Orders State with localStorage persistence
  const [userOrders, setUserOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('panyen_lokal_orders_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('panyen_lokal_cart_v3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist Region
  useEffect(() => {
    try {
      localStorage.setItem('panyen_lokal_region_v2', selectedRegion);
    } catch {}
  }, [selectedRegion]);

  // Persist User
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('panyen_lokal_user_v2', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('panyen_lokal_user_v2');
      }
    } catch {}
  }, [currentUser]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem('panyen_lokal_orders_v2', JSON.stringify(userOrders));
    } catch {}
  }, [userOrders]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('panyen_lokal_cart_v3', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Smooth scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Find flagship Ricin product
  const ricinProduct = products.find((p) => p.id === 'huile-de-ricin') || products[0];

  // Open Auth Modal with custom notice
  const handleOpenAuthModal = (notice?: string) => {
    setAuthNotice(notice || '');
    setAuthModalOpen(true);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, format: string, quantity: number = 1) => {
    const isExport = product.formatsExport?.includes(format) || false;
    const priceDetails = getRegionalPrice(product, format, selectedRegion);
    const itemId = `${product.id}-${format}-${selectedRegion}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            productTitle: product.title,
            productImage: product.image,
            category: product.category,
            selectedFormat: format,
            formatType: isExport ? 'export' : 'retail',
            quantity,
            unitPriceUSD: priceDetails.priceUSD,
            unitPriceLocal: priceDetails.priceLocal,
            currency: priceDetails.currency,
            destinationRegion: selectedRegion
          }
        ];
      }
    });

    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order created callback
  const handleOrderCreated = (newOrder: Order) => {
    setUserOrders((prev) => [newOrder, ...prev]);
  };

  // Request Quote Handler
  const handleRequestQuote = (product: Product, format?: string) => {
    setQuoteProduct(product);
    setQuoteFormat(format);
    setCurrentRoute('marches-export');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans text-[#1F2937] selection:bg-[#E9C46A] selection:text-[#1B4332]">
      {/* Navigation Header with Region & Auth Integration */}
      <Navbar
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        cartCount={totalCartCount}
        openCart={() => setCartOpen(true)}
        selectedRegion={selectedRegion}
        openRegionSelector={() => setRegionModalOpen(true)}
        currentUser={currentUser}
        openAuthModal={() => handleOpenAuthModal()}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <div>
            {/* Flagship Hero Ricin Section */}
            <HeroRicin
              ricinProduct={ricinProduct}
              onAddToCart={handleAddToCart}
              onRequestQuote={handleRequestQuote}
              setCurrentRoute={setCurrentRoute}
              onSelectProduct={setSelectedProduct}
              selectedRegion={selectedRegion}
            />

            {/* Official Exhibition Roll-up Banner Section */}
            <OfficialBannerSection setCurrentRoute={setCurrentRoute} />

            {/* Comprehensive Agricultural & Plantation Enterprise Showcase */}
            <AgriEnterpriseShowcase
              setCurrentRoute={setCurrentRoute}
              selectedRegion={selectedRegion}
              openRegionSelector={() => setRegionModalOpen(true)}
              currentUser={currentUser}
              openAuthModal={handleOpenAuthModal}
            />
          </div>
        )}

        {currentRoute === 'huile-de-ricin' && (
          <HuileDeRicinPage
            product={ricinProduct}
            onAddToCart={handleAddToCart}
            onRequestQuote={handleRequestQuote}
            setCurrentRoute={setCurrentRoute}
          />
        )}

        {currentRoute === 'produits' && (
          <CatalogPage
            products={products}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            onRequestQuote={handleRequestQuote}
            setCurrentRoute={setCurrentRoute}
          />
        )}

        {currentRoute === 'a-propos' && (
          <AboutImpactPage setCurrentRoute={setCurrentRoute} />
        )}

        {currentRoute === 'marches-export' && (
          <ExportB2BPage
            products={products}
            setCurrentRoute={setCurrentRoute}
            quoteProduct={quoteProduct}
            quoteFormat={quoteFormat}
          />
        )}

        {currentRoute === 'partenariats' && (
          <PartnershipsPage setCurrentRoute={setCurrentRoute} />
        )}

        {currentRoute === 'contact' && (
          <ContactPage />
        )}

        {currentRoute === 'mon-compte' && (
          <MyAccountPage
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            orders={userOrders}
            setCurrentRoute={setCurrentRoute}
            selectedRegion={selectedRegion}
            openRegionSelector={() => setRegionModalOpen(true)}
            openAuthModal={() => handleOpenAuthModal()}
          />
        )}

        {currentRoute === 'admin' && currentUser?.role === 'admin' && (
          <AdminLayout
            setCurrentRoute={setCurrentRoute}
            activeTab={activeAdminTab}
            setActiveTab={setActiveAdminTab}
          >
            {activeAdminTab === 'dashboard' && <AdminDashboard currentUser={currentUser} />}
            {activeAdminTab === 'orders' && <AdminOrders currentUser={currentUser} />}
            {activeAdminTab === 'products' && <AdminProducts currentUser={currentUser} />}
            {activeAdminTab === 'quotes' && <AdminQuotes currentUser={currentUser} />}
            {activeAdminTab === 'users' && <AdminUsers currentUser={currentUser} />}
          </AdminLayout>
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentRoute={setCurrentRoute}
      />

      {/* Detailed Product View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onRequestQuote={handleRequestQuote}
      />

      {/* Cart & Checkout Drawer with Account & Regional Pricing Checks */}
      <CartQuoteDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        setCurrentRoute={setCurrentRoute}
        selectedRegion={selectedRegion}
        onChangeRegion={setSelectedRegion}
        currentUser={currentUser}
        openAuthModal={handleOpenAuthModal}
        onOrderCreated={handleOrderCreated}
      />

      {/* User Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onUserAuthenticated={(user) => {
          setCurrentUser(user);
          setAuthModalOpen(false);
        }}
        initialNotice={authNotice}
      />

      {/* Regional Destination Selector Modal */}
      <RegionSelectorModal
        isOpen={regionModalOpen}
        onClose={() => setRegionModalOpen(false)}
        currentRegion={selectedRegion}
        onSelectRegion={(region) => {
          setSelectedRegion(region);
          setRegionModalOpen(false);
        }}
      />

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
