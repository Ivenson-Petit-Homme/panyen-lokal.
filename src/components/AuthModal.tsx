import React, { useState } from 'react';
import { UserAccount, DeliveryRegion } from '../types';
import { REGIONS_CONFIG } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { X, Lock, Mail, User, Phone, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserAccount) => void;
  onUserAuthenticated?: (user: UserAccount) => void;
  selectedRegion?: DeliveryRegion;
  initialMode?: 'login' | 'register';
  customNotice?: string;
  initialNotice?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onUserAuthenticated,
  selectedRegion = 'haiti',
  initialMode = 'login',
  customNotice,
  initialNotice
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState<DeliveryRegion>(selectedRegion);
  const [companyName, setCompanyName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');

  if (!isOpen) return null;

  const notifySuccess = (user: UserAccount) => {
    if (onSuccess) onSuccess(user);
    if (onUserAuthenticated) onUserAuthenticated(user);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success && data.user) {
        confetti({ particleCount: 60, spread: 60 });
        notifySuccess(data.user);
        onClose();
      } else {
        setErrorMessage(data.message || (isEn ? 'Incorrect email or password.' : 'Adresse e-mail ou mot de passe incorrect.'));
      }
    } catch {
      // Fallback local login
      const fallbackUser: UserAccount = {
        id: `usr-${Date.now()}`,
        fullName: email.split('@')[0] || (isEn ? 'Panyen Lokal Client' : 'Client Panyen Lokal'),
        email,
        phone: '+509 3800-0000',
        role: 'user',
        preferredRegion: (region as DeliveryRegion) || 'haiti',
        createdAt: new Date().toISOString()
      };
      confetti({ particleCount: 50, spread: 50 });
      notifySuccess(fallbackUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          preferredRegion: region,
          companyName,
          address: {
            street: streetAddress,
            city,
            country: region === 'haiti' ? 'Haïti' : region === 'usa' ? 'USA' : 'Dominican Republic'
          }
        })
      });
      const data = await res.json();

      if (data.success && data.user) {
        confetti({ particleCount: 80, spread: 70 });
        notifySuccess(data.user);
        onClose();
      } else {
        setErrorMessage(data.message || (isEn ? 'Error creating account.' : 'Erreur lors de la création du compte.'));
      }
    } catch {
      // Fallback local register
      const fallbackUser: UserAccount = {
        id: `usr-${Date.now()}`,
        fullName,
        email,
        phone,
        role: 'user',
        preferredRegion: (region as DeliveryRegion) || 'haiti',
        companyName,
        createdAt: new Date().toISOString()
      };
      confetti({ particleCount: 70, spread: 60 });
      notifySuccess(fallbackUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserAccount = {
      id: 'user-demo-01',
      fullName: 'Jean-Baptiste Estimé',
      email: 'client@panyenlokal.com',
      phone: '+509 3800-1234',
      role: 'user',
      preferredRegion: (selectedRegion as DeliveryRegion) || 'haiti',
      createdAt: new Date().toISOString()
    };
    confetti({ particleCount: 50, spread: 60 });
    notifySuccess(demoUser);
    onClose();
  };

  const defaultNotice = isEn
    ? "A registered customer account is required to order and coordinate fulfillment from our Caracol facility to Haiti, USA, or Dominican Republic."
    : "Un compte client enregistré est obligatoire pour commander et planifier la préparation des produits à destination d'Haïti, des USA ou de la République Dominicaine.";

  const displayNotice = customNotice || initialNotice || defaultNotice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden text-stone-900 my-8">
        {/* Header */}
        <div className="bg-[#2A4833] text-white p-6 relative border-b border-[#5B9B6E]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E59500] text-[#1F2937] text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>{t('auth.req_tag')}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white drop-shadow-sm">
            {mode === 'login' 
              ? t('auth.login_main_title')
              : t('auth.register_main_title')}
          </h3>
          <p className="text-xs text-white opacity-90 mt-1 leading-relaxed">
            {displayNotice}
          </p>
        </div>

        {/* Region Notice Banner */}
        <div className="bg-stone-50 px-6 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-600 font-medium">{t('auth.selected_region')}</span>
          <span className="font-bold text-[#1C3022] flex items-center gap-1.5">
            <span>{REGIONS_CONFIG[region]?.flag}</span>
            <span>{REGIONS_CONFIG[region]?.name}</span>
          </span>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-stone-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'border-b-2 border-[#5B9B6E] text-[#1C3022] bg-white font-extrabold'
                : 'bg-stone-50 text-stone-500 hover:text-stone-800'
            }`}
          >
            {t('auth.tab_login')}
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              mode === 'register'
                ? 'border-b-2 border-[#5B9B6E] text-[#1C3022] bg-white font-extrabold'
                : 'bg-stone-50 text-stone-500 hover:text-stone-800'
            }`}
          >
            {t('auth.tab_register')}
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Form Container */}
        <div className="p-6 space-y-4">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block text-stone-700 mb-1">
                  {isEn ? "Email Address *" : "Adresse e-mail *"}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block text-stone-700 mb-1">
                  {isEn ? "Password *" : "Mot de passe *"}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-white" />
                <span>{loading ? t('auth.login_btn_loading') : t('auth.login_btn_ready')}</span>
              </motion.button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="text-[11px] text-stone-500 hover:text-stone-900 underline font-semibold cursor-pointer"
                >
                  ⚡ {isEn ? "Quick Demo Login" : "Connexion Rapide de Test (Client Démo)"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold block text-stone-700 mb-1">
                  {isEn ? "Full Name *" : "Nom et Prénom *"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jean-Marc Dupont"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block text-stone-700 mb-1">
                    {isEn ? "Email Address *" : "Adresse e-mail *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domaine.com"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold block text-stone-700 mb-1">
                    {isEn ? "Phone / WhatsApp *" : "Téléphone / WhatsApp *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+509 / +1 / +1-809..."
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block text-stone-700 mb-1">
                  {isEn ? "Primary Delivery Region *" : "Région principale de livraison *"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['haiti', 'usa', 'dominican_republic'] as DeliveryRegion[]).map((rId) => (
                    <button
                      key={rId}
                      type="button"
                      onClick={() => setRegion(rId)}
                      className={`p-2 rounded-xl border text-center font-bold transition-all text-[11px] flex flex-col items-center gap-0.5 cursor-pointer ${
                        region === rId
                          ? 'bg-[#2A4833] text-white border-[#5B9B6E] shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      <span className="text-base">{REGIONS_CONFIG[rId].flag}</span>
                      <span className="truncate w-full">{rId === 'haiti' ? (isEn ? 'Haiti' : 'Haïti') : rId === 'usa' ? 'USA' : (isEn ? 'Dom. Rep.' : 'Rép. Dom.')}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block text-stone-700 mb-1">
                    {isEn ? "City & State / Department *" : "Ville & Département / État *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Cap-Haïtien / Miami / Saint-Domingue"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold block text-stone-700 mb-1">
                    {isEn ? "Address / Landmarks" : "Adresse / Repères de livraison"}
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder={isEn ? "Street, unit, landmarks..." : "Rue, numéro, repères..."}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block text-stone-700 mb-1">
                  {isEn ? "Security Password *" : "Mot de passe de sécurité *"}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isEn ? "Min 6 characters" : "Minimum 6 caractères"}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#76BD43] focus:outline-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#2A4833] hover:bg-[#1C3022] text-white font-black shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{loading ? t('auth.register_btn_loading') : t('auth.register_btn_ready')}</span>
              </motion.button>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-4 h-4 text-[#1C3022]" />
          <span>{t('auth.data_secured')}</span>
        </div>
      </div>
    </div>
  );
};

