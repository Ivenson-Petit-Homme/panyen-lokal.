import React from 'react';
import { DeliveryRegion } from '../types';
import { REGIONS_CONFIG } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { motion } from 'motion/react';
import { X, Globe2, Check, Truck, ArrowRight } from 'lucide-react';

interface RegionSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: DeliveryRegion;
  onSelectRegion: (region: DeliveryRegion) => void;
}

export const RegionSelectorModal: React.FC<RegionSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedRegion,
  onSelectRegion
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden text-stone-900 my-8">
        {/* Header */}
        <div className="bg-[#1B4332] text-white p-6 relative border-b border-[#2d6a4f]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9C46A] text-[#1F2937] text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
            <Globe2 className="w-3.5 h-3.5" />
            <span>{t('region.tag')}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white drop-shadow-sm">
            {t('region.modal_title')}
          </h3>
          <p className="text-xs text-white opacity-90 mt-1 leading-relaxed">
            {t('region.desc_long')}
          </p>
        </div>

        {/* Region Cards */}
        <StaggerContainer className="p-6 space-y-3 bg-[#FDFBF7]" staggerDelay={0.08}>
          {(['haiti', 'usa', 'dominican_republic'] as DeliveryRegion[]).map((rId) => {
            const config = REGIONS_CONFIG[rId];
            const isSelected = selectedRegion === rId;

            return (
              <StaggerItem
                key={rId}
                type="button"
                onClick={() => {
                  onSelectRegion(rId);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#2E7D32] ring-2 ring-[#2E7D32]/30 shadow-xs'
                    : 'bg-white hover:bg-stone-50 border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl shrink-0">{config.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1F2937]">{config.name}</h4>
                      {isSelected && (
                        <span className="text-[10px] bg-[#1B4332] text-white px-2 py-0.5 rounded-full font-bold border border-[#2E7D32]">
                          {t('account.active_region_badge')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {t('region.currency_label')} <strong>{config.currency}</strong> • {t('region.lead_time_label')} {config.deliveryLeadTime}
                    </p>
                    <p className="text-[11px] text-[#1B4332] font-bold mt-0.5">
                      📍 {config.hubLocation}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white border border-[#2E7D32] flex items-center justify-center shadow-xs">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#1B4332]" />
            <span>{t('region.corridors_note')}</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-[#1B4332] hover:underline cursor-pointer"
          >
            {t('region.close_btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

