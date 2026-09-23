import React, { useState } from 'react';
import { CartItem, PageRoute, DeliveryRegion, UserAccount, Order } from '../types';
import { REGIONS_CONFIG, calculateRegionalOrderTotals } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  User, 
  Globe2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  setCurrentRoute: (route: PageRoute) => void;
  selectedRegion: DeliveryRegion;
  onChangeRegion: (region: DeliveryRegion) => void;
  currentUser: UserAccount | null;
  openAuthModal: (customNotice?: string) => void;
  onOrderCreated: (order: Order) => void;
}

export const CartQuoteDrawer: React.FC<CartQuoteDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setCurrentRoute,
  selectedRegion,
  onChangeRegion,
  currentUser,
  openAuthModal,
  onOrderCreated
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Address and payment state
  const [deliveryStreet, setDeliveryStreet] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  if (!isOpen) return null;

  const totals = calculateRegionalOrderTotals(
    cartItems.map((item) => ({ unitPriceUSD: item.unitPriceUSD, quantity: item.quantity })),
    selectedRegion
  );

  const regionConfig = REGIONS_CONFIG[selectedRegion] || REGIONS_CONFIG.haiti;

  // Set default payment method based on region if not set
  const currentPayment = paymentMethod || regionConfig.paymentMethods[0];

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      openAuthModal(t('cart.account_req_desc_simple'));
      return;
    }
    setCheckoutStep('checkout');
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal();
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      userPhone: currentUser.phone,
      region: selectedRegion,
      deliveryAddress: {
        street: deliveryStreet || currentUser.address?.street || (isEn ? 'Primary customer address' : 'Adresse principale client'),
        city: deliveryCity || currentUser.address?.city || (isEn ? 'Delivery city' : 'Ville de livraison'),
        stateOrDepartment: currentUser.address?.stateOrDepartment || '',
        country: regionConfig.name,
        notes: deliveryNotes
      },
      items: cartItems.map((item) => ({
        productId: item.productId,
        productTitle: item.productTitle,
        selectedFormat: item.selectedFormat,
        quantity: item.quantity,
        unitPriceUSD: item.unitPriceUSD,
        totalUSD: item.unitPriceUSD * item.quantity,
        unitPriceLocal: item.unitPriceLocal,
        totalLocal: item.unitPriceLocal * item.quantity,
        currency: item.currency
      })),
      subtotalUSD: totals.subtotalUSD,
      exportShippingFeeUSD: totals.shippingUSD,
      totalUSD: totals.totalUSD,
      totalLocal: totals.totalLocal,
      currency: totals.currency,
      paymentMethod: currentPayment,
      paymentStatus: 'en_attente'
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();

      if (data.success && data.order) {
        setConfirmedOrder(data.order);
        onOrderCreated(data.order);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        setCheckoutStep('success');
      } else {
        // Fallback local creation
        const fallbackOrder: Order = {
          ...orderPayload,
          id: `ord-${Date.now()}`,
          orderNumber: `PL-${selectedRegion.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`,
          createdAt: new Date().toISOString(),
          status: 'en_preparation',
          statusLabel: isEn ? 'In production at Caracol factory' : 'En cours de préparation à l\'usine de Caracol',
          estimatedDelivery: regionConfig.deliveryLeadTime
        } as Order;

        setConfirmedOrder(fallbackOrder);
        onOrderCreated(fallbackOrder);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setCheckoutStep('success');
      }
    } catch {
      const fallbackOrder: Order = {
        ...orderPayload,
        id: `ord-${Date.now()}`,
        orderNumber: `PL-${selectedRegion.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        status: 'en_preparation',
        statusLabel: isEn ? 'In production at Caracol factory' : 'En cours de préparation à l\'usine de Caracol',
        estimatedDelivery: regionConfig.deliveryLeadTime
      } as Order;

      setConfirmedOrder(fallbackOrder);
      onOrderCreated(fallbackOrder);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setCheckoutStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
    setCurrentRoute('mon-compte');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between text-[#1F2937] border-l border-stone-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#2D6A4F] bg-[#1B4332] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h3 className="font-serif font-bold text-lg text-white">{t('cart.step_cart')}</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer" aria-label={t('topbar.flag_en')}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Region Switcher bar */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-white opacity-90">
              <Globe2 className="w-3.5 h-3.5 text-white" />
              <span>{t('cart.dest_rates')}</span>
            </div>
            <div className="flex gap-1">
              {(['haiti', 'usa', 'dominican_republic'] as DeliveryRegion[]).map((rId) => (
                <button
                  key={rId}
                  onClick={() => onChangeRegion(rId)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    selectedRegion === rId
                      ? 'bg-[#E9C46A] text-[#1B4332] shadow-xs'
                      : 'bg-[#1B4332] text-white hover:text-white'
                  }`}
                >
                  {REGIONS_CONFIG[rId].flag} {rId === 'haiti' ? t('region.haiti').split(' ')[0] : rId === 'usa' ? 'USA' : t('region.dom_rep').split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-stone-800">{t('cart.empty_title')}</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    {t('cart.empty_desc_long')}
                  </p>
                  <button
                    onClick={() => {
                      setCurrentRoute('produits');
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#143527] text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
                  >
                    {t('cart.browse_btn')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Notice of account requirement */}
                  {!currentUser ? (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
                      <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">{t('cart.account_req_title')}</strong>
                        <span>{t('cart.account_req_desc').replace('{region}', regionConfig.name)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-[#1B4332] text-white border border-[#2D6A4F] rounded-xl flex items-center justify-between text-xs shadow-xs">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#E9C46A]" />
                        <span>{t('cart.logged_as')} <strong>{currentUser.fullName}</strong></span>
                      </div>
                      <span className="text-[10px] bg-[#E9C46A] text-[#1B4332] px-2 py-0.5 rounded-full font-black">
                        {t('cart.verified_acc')}
                      </span>
                    </div>
                  )}

                  {/* Cart Items */}
                  <div className="space-y-2.5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex gap-3 items-center">
                        <img src={item.productImage} alt={item.productTitle} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-stone-900 truncate">{item.productTitle}</h5>
                          <p className="text-[11px] text-[#431e0f] font-bold">{t('cart.format_label')} {item.selectedFormat}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-extrabold text-stone-900">${(item.unitPriceUSD * item.quantity).toFixed(2)} USD</span>
                            {item.currency !== 'USD' && (
                              <span className="text-[10px] text-stone-500">
                                ({(item.unitPriceLocal * item.quantity).toLocaleString()} {item.currency})
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button onClick={() => onRemoveItem(item.id)} className="text-stone-400 hover:text-red-600 p-1 cursor-pointer" title={t('topbar.flag_fr')}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden text-xs">
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-0.5 hover:bg-stone-100 font-bold cursor-pointer">-</button>
                            <span className="px-2 font-bold">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-0.5 hover:bg-stone-100 font-bold cursor-pointer">+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Delivery preview info */}
                  <div className="p-3 bg-[#fdfbf9] rounded-xl border border-stone-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-stone-600">
                      <span>{t('cart.dest_label')}</span>
                      <span className="font-bold text-stone-800">{regionConfig.flag} {regionConfig.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>{t('cart.lead_time_label')}</span>
                      <span className="font-bold text-[#220e06]">{regionConfig.deliveryLeadTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>{t('cart.hub_label')}</span>
                      <span className="text-[11px] text-stone-700 text-right">{regionConfig.hubLocation}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && currentUser && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-[#fbf5f2] rounded-xl border border-[#5c2b14]/30">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">{t('cart.holder_label')}</span>
                <strong className="text-sm font-bold text-[#220e06] block">{currentUser.fullName}</strong>
                <span className="text-stone-600">{currentUser.email} • {currentUser.phone}</span>
              </div>

              <h4 className="font-bold text-sm text-stone-900 pb-1 border-b">{t('cart.dest_label')} ({regionConfig.name})</h4>
              
              <div>
                <label className="font-bold block mb-1 text-stone-700">{t('cart.city_label')}</label>
                <input
                  type="text"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  placeholder={selectedRegion === 'haiti' ? t('cart.city_placeholder_ht') : selectedRegion === 'usa' ? 'Ex: Miami, FL / Boston, MA' : 'Ex: Santo Domingo / Santiago'}
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-stone-700">{t('cart.addr_label')}</label>
                <textarea
                  rows={2}
                  required
                  value={deliveryStreet}
                  onChange={(e) => setDeliveryStreet(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
                  placeholder={t('cart.addr_placeholder')}
                ></textarea>
              </div>

              <div>
                <label className="font-bold block mb-1 text-stone-700">{t('cart.notes_label')}</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200"
                  placeholder={t('cart.notes_placeholder')}
                />
              </div>

              <div>
                <label className="font-bold block mb-1.5 text-stone-700">{t('cart.payment_label')} ({regionConfig.currency}) :</label>
                <div className="space-y-1.5">
                  {regionConfig.paymentMethods.map((method, idx) => (
                    <label
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        currentPayment === method
                          ? 'bg-[#1B4332] text-white border-[#2D6A4F] font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethodRadio"
                        checked={currentPayment === method}
                        onChange={() => setPaymentMethod(method)}
                        className="accent-[#1B4332]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && confirmedOrder && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1B4332] text-white flex items-center justify-center mx-auto shadow-md border border-[#2D6A4F]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#1F2937]">{t('cart.success_title')}</h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                {t('cart.success_desc_prefix').replace('{name}', confirmedOrder.userName).replace('{number}', confirmedOrder.orderNumber)}
              </p>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2 text-left">
                <div className="flex justify-between">
                  <span>{t('cart.dest_label')}</span>
                  <strong className="text-[#1F2937]">{regionConfig.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.lead_time_label')}</span>
                  <strong className="text-[#1B4332]">{confirmedOrder.estimatedDelivery}</strong>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.payment_label')}</span>
                  <strong className="text-[#1F2937]">{confirmedOrder.paymentMethod}</strong>
                </div>
                <div className="pt-2 border-t flex justify-between font-bold text-sm text-[#1B4332]">
                  <span>{t('cart.total_label')}</span>
                  <span>${confirmedOrder.totalUSD.toFixed(2)} USD ({confirmedOrder.totalLocal.toLocaleString()} {confirmedOrder.currency})</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
              >
                {t('cart.view_account_btn')}
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && checkoutStep !== 'success' && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Totals Breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>{t('cart.subtotal_label')}</span>
                <span className="font-semibold text-[#1F2937]">${totals.subtotalUSD.toFixed(2)} USD</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>{t('cart.freight_label')} ({regionConfig.name}) :</span>
                <span className="font-semibold text-stone-800">
                  {totals.shippingUSD === 0 ? (
                    <span className="text-white font-extrabold bg-[#1B4332] px-2.5 py-0.5 rounded border border-[#2D6A4F] shadow-xs">{t('cart.free_label')}</span>
                  ) : (
                    `$${totals.shippingUSD.toFixed(2)} USD`
                  )}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-1.5 border-t border-stone-200">
                <span className="font-bold text-[#1F2937]">{t('cart.grand_total_label')}</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#1B4332]">${totals.totalUSD.toFixed(2)} USD</span>
                  {totals.currency !== 'USD' && (
                    <span className="text-xs text-stone-500 block">({totals.totalLocal.toLocaleString()} {totals.currency})</span>
                  )}
                </div>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs shadow flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#2D6A4F]"
              >
                {!currentUser && <Lock className="w-4 h-4 text-white" />}
                <span>
                  {currentUser 
                    ? (isEn ? `Proceed to Checkout (${cartItems.length} item${cartItems.length > 1 ? 's' : ''})` : `Passer la commande (${cartItems.length} article${cartItems.length > 1 ? 's' : ''})`) 
                    : t('cart.checkout_btn_login')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  {t('cart.back_btn')}
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-black text-xs shadow flex items-center justify-center gap-2 cursor-pointer border border-[#2D6A4F]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? t('cart.confirm_btn_loading') : t('cart.confirm_btn_ready')}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

