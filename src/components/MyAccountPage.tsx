import React, { useState } from 'react';
import { UserAccount, Order, DeliveryRegion, PageRoute } from '../types';
import { REGIONS_CONFIG } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion } from 'motion/react';
import {
  User, 
  Package, 
  Clock, 
  Truck, 
  LogOut, 
  ShoppingBag, 
  ShieldCheck
} from 'lucide-react';
import { TranslationKey } from '../utils/translations';

interface MyAccountPageProps {
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  orders: Order[];
  setCurrentRoute: (route: PageRoute) => void;
  selectedRegion: DeliveryRegion;
  openRegionSelector?: () => void;
  openAuthModal?: () => void;
}

export const MyAccountPage: React.FC<MyAccountPageProps> = ({
  currentUser,
  setCurrentUser,
  orders,
  setCurrentRoute,
  selectedRegion,
  openRegionSelector,
  openAuthModal
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'destinations'>('orders');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-20 px-4 text-center">
        <FadeInSection direction="none">
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1B4332] text-white flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1F2937]">{t('account.portal_tag')}</h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('account.portal_desc')}
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openAuthModal && openAuthModal()}
                className="w-full py-3 bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
              >
                {t('account.login_btn')}
              </motion.button>
              <button
                onClick={() => setCurrentRoute('home')}
                className="w-full py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition-colors cursor-pointer"
              >
                {t('account.back_home_btn')}
              </button>
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }

  const regionInfo = REGIONS_CONFIG[selectedRegion] || REGIONS_CONFIG.haiti;

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRoute('home');
  };

  return (
    <div id="my-account-page" className="min-h-screen bg-[#FDFBF7] text-[#1F2937] pb-20">
      {/* Header Banner */}
      <div className="bg-[#1B4332] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2d6a4f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E9C46A] text-[#1B4332] flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#143527] text-white text-[11px] font-bold uppercase mb-1 border border-white/30">
                <span>{t('account.verified_tag')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-sm">
                {t('account.welcome_prefix').replace('{name}', currentUser.fullName)}
              </h1>
              <p className="text-xs text-white opacity-90">
                {currentUser.email} • {t('account.member_since')} {new Date(currentUser.createdAt).toLocaleDateString(isEn ? 'en-US' : 'fr-FR')}
              </p>
            </div>
          </div>

          {/* Region and Logout shortcuts */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openRegionSelector && openRegionSelector()}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-xs backdrop-blur-xs flex items-center gap-2 transition-colors text-white cursor-pointer"
              title={t('account.change_region_label')}
            >
              <span>{regionInfo.flag}</span>
              <span className="font-bold">{regionInfo.name}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('account.logout')}</span>
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setCurrentRoute('admin')}
                className="px-4 py-2 bg-white text-[#1B4332] rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 cursor-pointer border border-[#E9C46A]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>ACCÈS ADMIN</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Account Tabs & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation pills */}
        <div className="flex flex-wrap border-b border-stone-200 gap-2 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#1B4332] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{t('account.tab_orders').replace('({orders.length})', `(${orders.length})`)}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#1B4332] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('account.tab_profile')}</span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'destinations'
                ? 'bg-[#1B4332] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>{t('account.tab_destinations')}</span>
          </button>
        </div>

        {/* Tab 1: Orders and Preparations */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1F2937]">
                  {t('account.orders_title')}
                </h3>
                <p className="text-xs text-stone-500">
                  {t('account.orders_desc')}
                </p>
              </div>
              <button
                onClick={() => setCurrentRoute('produits')}
                className="px-4 py-2 bg-[#2E7D32] hover:bg-[#256629] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors shrink-0 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('account.new_order_btn')}</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-[#1B4332] flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#1F2937]">{t('account.no_orders_recorded')}</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {t('account.no_orders_desc')}
                </p>
                <button
                  onClick={() => setCurrentRoute('produits')}
                  className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#256629] text-white rounded-xl text-xs font-bold shadow cursor-pointer"
                >
                  {t('cart.browse_btn')}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => {
                  const regConfig = REGIONS_CONFIG[ord.region] || REGIONS_CONFIG.haiti;
                  return (
                    <motion.div
                      key={ord.id}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#1B4332]">{ord.orderNumber}</span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1B4332]/10 text-[#1B4332] font-bold border border-[#1B4332]/20 flex items-center gap-1">
                              <span>{regConfig.flag}</span>
                              <span>{t('account.order_dest_label')} {regConfig.name}</span>
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {t('account.order_placed_on')} {new Date(ord.createdAt).toLocaleString(isEn ? 'en-US' : 'fr-FR')}
                          </p>
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                            <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                            <span>{isEn ? 'In production at Caracol factory' : 'En cours de préparation à l\'usine de Caracol'}</span>
                          </span>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="divide-y divide-stone-100 text-xs">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex justify-between items-center">
                            <div>
                              <strong className="text-[#1F2937] block">{item.productTitle}</strong>
                              <span className="text-stone-500">{t('cart.format_label')} {item.selectedFormat} • {t('detail.quantity')} {item.quantity}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[#1F2937]">${(item.unitPriceUSD * item.quantity).toFixed(2)} USD</span>
                              {item.currency !== 'USD' && (
                                <span className="text-[10px] text-stone-500 block">
                                  ({(item.unitPriceLocal * item.quantity).toLocaleString()} {item.currency})
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary and Address */}
                      <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-xl">
                        <div>
                          <strong className="text-stone-800 block mb-1">{t('account.addr_hub_label')}</strong>
                          <p className="text-stone-600">
                            {ord.deliveryAddress.street}, {ord.deliveryAddress.city} ({ord.deliveryAddress.country})
                          </p>
                          <p className="text-stone-500 mt-1 text-[11px]">
                            {t('account.payment_method_label')} <span className="font-semibold text-stone-800">{ord.paymentMethod}</span>
                          </p>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="flex justify-between">
                            <span className="text-stone-500">{t('cart.subtotal')}</span>
                            <span className="font-semibold text-stone-800">${ord.subtotalUSD.toFixed(2)} USD</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">{t('cart.freight_label').replace('{region}', regConfig.name)}</span>
                            <span className="font-semibold text-stone-800">
                              {ord.exportShippingFeeUSD === 0 ? (
                                <span className="text-[#1B4332] font-bold bg-[#1B4332]/10 px-2 py-0.5 rounded">{t('cart.free_label')}</span>
                              ) : (
                                `$${ord.exportShippingFeeUSD.toFixed(2)} USD`
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-stone-200 font-extrabold text-sm text-[#1B4332]">
                            <span>{t('cart.total_label')}</span>
                            <span>
                              ${ord.totalUSD.toFixed(2)} USD ({ord.totalLocal.toLocaleString()} {ord.currency})
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Tab 2: Profile */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm max-w-2xl space-y-6"
          >
            <h3 className="text-xl font-serif font-bold text-[#1F2937]">
              {t('account.profile_title')}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block font-bold uppercase text-[10px]">{t('account.field_fullname')}</span>
                  <span className="text-sm font-bold text-stone-900">{currentUser.fullName}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block font-bold uppercase text-[10px]">{t('account.field_email')}</span>
                  <span className="text-sm font-bold text-stone-900">{currentUser.email}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block font-bold uppercase text-[10px]">{t('account.field_phone')}</span>
                  <span className="text-sm font-bold text-stone-900">{currentUser.phone || (isEn ? 'Not specified' : 'Non renseigné')}</span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block font-bold uppercase text-[10px]">{t('account.field_region')}</span>
                  <span className="text-sm font-bold text-[#1B4332] flex items-center gap-1.5 mt-0.5">
                    <span>{regionInfo.flag}</span>
                    <span>{regionInfo.name}</span>
                  </span>
                </div>
              </div>

              {currentUser.companyName && (
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block font-bold uppercase text-[10px]">{t('account.field_company')}</span>
                  <span className="text-sm font-bold text-stone-900">{currentUser.companyName}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3 text-xs text-stone-700">
              <ShieldCheck className="w-5 h-5 text-[#1B4332] shrink-0" />
              <span>
                {t('account.profile_note')}
              </span>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Regional Tariffs & Destinations */}
        {activeTab === 'destinations' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-serif font-bold text-[#1F2937]">
                {t('account.dest_title')}
              </h3>
              <p className="text-xs text-stone-600">
                {t('account.dest_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['haiti', 'usa', 'dominican_republic'] as DeliveryRegion[]).map((rId) => {
                const conf = REGIONS_CONFIG[rId];
                const isSelected = selectedRegion === rId;
                return (
                  <div
                    key={rId}
                    className={`bg-white rounded-3xl border p-6 shadow-sm space-y-4 transition-all relative ${
                      isSelected ? 'ring-2 ring-[#2E7D32] border-[#2E7D32]' : 'border-stone-200'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute -top-3 right-6 bg-[#1B4332] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow">
                        {t('account.active_region_badge')}
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{conf.flag}</span>
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#1F2937]">{conf.name}</h4>
                        <span className="text-[11px] text-stone-500 font-semibold">{isEn ? "Currency:" : "Devise :"} {conf.currency}</span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-100">
                      <p>
                        <strong className="text-stone-800">{t('account.hub_label')}</strong><br />
                        {conf.hubLocation}
                      </p>
                      <p>
                        <strong className="text-stone-800">{t('account.delivery_time_label')}</strong><br />
                        {conf.deliveryLeadTime}
                      </p>
                      <p>
                        <strong className="text-stone-800">{t('account.payment_methods_label')}</strong><br />
                        {conf.paymentMethods.join(', ')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

