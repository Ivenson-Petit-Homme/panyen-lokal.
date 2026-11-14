import React, { useState, useEffect } from 'react';
import { PageRoute, DeliveryRegion, UserAccount } from '../types';
import panyenLogo from '../assets/images/LOGO_PANYEN.png';
import usineExtImg from '../assets/images/usine_exterieur_ekam_1786859382526.jpg';
import recolteTerrainImg from '../assets/images/recolte_ricin_moringa_1786859405918.jpg';
import champTerrainImg from '../assets/images/champ_panyen_lokal_1786858968582.jpg';
import souveraineteImg from '../assets/images/souverainete_marche_1786859004801.jpg';
import extractionMachineImg from '../assets/images/extraction_ricin_machine_1794634595906.jpg';
import apicultureMielImg from '../assets/images/apiculture_elevage_miel_1794634596919.jpg';
import septCulturesImg from '../assets/images/sept_cultures_recolte_1794634596875.jpg';

import { useLanguage } from '../context/LanguageContext';
import {
  getFourPillars,
  getGalleryItems,
  GalleryItemData
} from '../data/agriShowcaseData';

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { FadeInSection, StaggerContainer, StaggerItem } from './FadeInSection';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  X,
  ExternalLink,
  Sprout,
  Briefcase,
  TrendingUp,
  MessageCircle,
  FileText,
  Factory,
  Droplets,
  Building2,
  ChevronDown
} from 'lucide-react';
import { TranslationKey } from '../utils/translations';

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, numericValue, { duration, ease: 'easeOut' });
    return controls.stop;
  }, [numericValue, count, duration]);

  useEffect(() => {
    return rounded.on('change', (v) => setDisplayValue(v));
  }, [rounded]);

  return <>{displayValue}{suffix}</>;
};

interface AgriEnterpriseShowcaseProps {
  setCurrentRoute: (route: PageRoute) => void;
  selectedRegion?: DeliveryRegion;
  openRegionSelector?: () => void;
  currentUser?: UserAccount | null;
  openAuthModal?: (notice?: string) => void;
}

export const AgriEnterpriseShowcase: React.FC<AgriEnterpriseShowcaseProps> = ({
  setCurrentRoute
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [lightboxImg, setLightboxImg] = useState<GalleryItemData | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const fourPillars = getFourPillars(isEn);
  const galleryItems = getGalleryItems(isEn);

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === galleryFilter);

  const galleryTabs = [
    { id: 'all', labelKey: 'gallery.filter_all' },
    { id: 'direction', labelKey: 'gallery.filter_direction' },
    { id: 'production', labelKey: 'gallery.filter_production' },
    { id: 'agronomie', labelKey: 'gallery.filter_agronomie' },
    { id: 'operations', labelKey: 'gallery.filter_operations' }
  ];

  // Section 4 : Actions sur le Terrain (Solutions Agricoles, Emplois, Essor International)
  const fieldSolutions = [
    {
      id: 'solutions-agriculture',
      kicker: isEn ? '100 Hectares · Morne-à-Casse, Fort-Liberté' : '100 Hectares · Morne-à-Casse, Fort-Liberté',
      title: isEn
        ? 'Building Haiti’s Largest Castor Plantation & Diverse Crops'
        : 'La Plus Grande Plantation de Ricin & Cultures Locales',
      desc: isEn
        ? 'On our 100-hectare plantation and industrial site in Morne-à-Casse (Fort-Liberté, Nord-Est), we are building Haiti’s largest castor (maskriti) plantation alongside tamarind, corn, black beans, okra, cacao, and coffee.'
        : 'Sur nos 100 hectares de terre et notre site industriel à Morne-à-Casse (Fort-Liberté, Nord-Est), nous développons la plus grande plantation de ricin (maskriti) du pays, accompagnée de tamarin, maïs, pois noir, gombo, cacao et café.',
      image: recolteTerrainImg,
      icon: Sprout,
      metric: isEn ? 'Morne-à-Casse · 100 Ha' : 'Morne-à-Casse · 100 Ha'
    },
    {
      id: 'emplois-population',
      kicker: isEn ? 'Fighting Unemployment' : 'Emplois & Lutte contre le Chômage',
      title: isEn
        ? 'Creating Real Jobs for the Haitian Population'
        : 'Créer des Emplois Durables en Haïti pour la Population',
      desc: isEn
        ? 'Every stage—planting and harvesting at Morne-à-Casse, industrial processing on site, and administration at our Caracol office—generates direct jobs in Haiti to fight unemployment.'
        : 'Chaque étape — culture et récolte à Morne-à-Casse (Fort-Liberté), transformation industrielle sur place et gestion au bureau de Caracol — crée des emplois directs en Haïti contre le chômage.',
      image: champTerrainImg,
      icon: Briefcase,
      metric: isEn ? 'Local Job Creation in Haiti' : 'Emplois Directs en Haïti'
    },
    {
      id: 'essor-production-nationale',
      kicker: isEn ? 'Global Reach' : 'Échelle Internationale',
      title: isEn
        ? 'Putting Haitian Local Production on the World Stage'
        : 'Porter la Production Haïtienne à l’Échelle Internationale',
      desc: isEn
        ? 'By processing our harvests at our Morne-à-Casse plant under strict standards, we elevate Haitian agricultural products onto international shelves with pride and added value.'
        : 'En transformant nos récoltes directement à notre usine de Morne-à-Casse selon des standards rigoureux, nous propulsons la production nationale et les produits locaux haïtiens sur les marchés internationaux.',
      image: souveraineteImg,
      icon: TrendingUp,
      metric: isEn ? '100% Haitian Local Products' : 'Production Locale Exportée'
    }
  ];

  // Section 3 : Distribution & Approvisionnement (Haïti & États-Unis)
  const acquisitionSteps = [
    {
      num: '01',
      title: isEn ? 'Select Your Format & Volume' : 'Sélectionnez Votre Format',
      desc: isEn
        ? 'Choose between retail units for personal care or culinary use, and wholesale drums or export cases for commercial distribution.'
        : "Choisissez le conditionnement adapté à votre besoin : formats individuels pour particuliers ou lots et fûts professionnels pour distributeurs."
    },
    {
      num: '02',
      title: isEn ? 'Direct Confirmation & Guidance' : 'Confirmation Directe avec Notre Équipe',
      desc: isEn
        ? 'Reach our commercial desk in Caracol (Haiti) or Florida via WhatsApp or quote request to verify availability and specifications.'
        : "Échangez directement avec notre bureau de Caracol ou notre desk Floride via WhatsApp ou formulaire B2B pour confirmer la disponibilité."
    },
    {
      num: '03',
      title: isEn ? 'Office Pickup or Export Shipping' : 'Retrait au Bureau ou Expédition Export',
      desc: isEn
        ? 'Visit our office at Village Ekam (Caracol, Haiti), our Lauderhill office (Florida, USA), or schedule B2B freight from our Morne-à-Casse plant.'
        : "Passez à notre bureau du Village Ekam (Caracol, Haïti), à notre bureau de Lauderhill (Floride, USA) ou planifiez une expédition B2B depuis notre site industriel."
    }
  ];

  // Filières Terroir & Capacité Industrielle (100 gal/jour + Élevage Miel + 7 Cultures)
  const productionChains = [
    {
      id: 'machine-ricin',
      kicker: isEn ? 'Industrial Plant · 100 Gal / Day' : 'Capacité Industrielle · 100 Gallons / Jour',
      title: isEn
        ? 'Castor Extraction Line: 100 Gallons / Day'
        : 'Maskriti & Machine 100 Gallons d’Huile / Jour',
      desc: isEn
        ? 'Harvested on our 100-hectare plantation at Morne-à-Casse, castor seeds (maskriti) are pressed mechanically at our factory using an industrial machine capable of producing 100 gallons of pure oil per day without hexane or solvents—delivering our flagship Huile de Ricin Pure.'
        : "Récoltées sur nos 100 hectares à Morne-à-Casse (Fort-Liberté), nos graines de maskriti sont pressées sur place grâce à notre machine industrielle d'une capacité de 100 gallons d'huile par jour, sans solvant ni hexane, pour produire notre Huile de Ricin Pure.",
      image: extractionMachineImg,
      icon: Factory,
      metric: isEn ? '100 Gallons / Day Capacity' : '100 Gallons / Jour à Morne-à-Casse'
    },
    {
      id: 'apiculture-miel',
      kicker: isEn ? 'Beekeeping & Apiculture' : 'Élevage d’Abeilles & Siwo Myèl',
      title: isEn
        ? 'Own Apiaries Producing Pure Honey & Tiz Vin de Miel'
        : 'Élevage Apicole : Du Siwo Myèl Pur au Tiz Vin de Miel',
      desc: isEn
        ? 'Panyen Lokal manages its own beekeeping operation to harvest pure natural Haitian honey (siwo myèl). That raw honey serves directly as the core fermentation base for crafting our signature Tiz Vin de Miel.'
        : "Nous gérons notre propre élevage d'abeilles (apiculture) pour récolter un siwo myèl pur et naturel d'Haïti. Ce miel brut constitue directement la matière première de base qui permet de fermenter notre Tiz Vin de Miel.",
      image: apicultureMielImg,
      icon: Droplets,
      metric: isEn ? 'Pure Honey Base for Tiz Wine' : 'Base Siwo Myèl pour Tiz Vin de Miel'
    },
    {
      id: 'sept-cultures-tamar',
      kicker: isEn ? '7 Crops on 100 Hectares' : '7 Cultures Phares · 100 Hectares',
      title: isEn
        ? 'Tamarind for Grand Tamar, Cacao & Food Crops'
        : 'Tamaren pour Grand Tamar, Cacao & Cultures Vivrières',
      desc: isEn
        ? 'Across our 100 hectares at Morne-à-Casse, tamarind feeds Grand Tamar Cognac, local cacao supplies Chocolat Artisanal, while coffee, corn (mayi), black beans (pwa nèg), and okra (gombo) anchor domestic food sovereignty.'
        : "Sur nos 100 hectares de Morne-à-Casse, le tamarin alimente notre Grand Tamar Cognac, le cacao donne notre Chocolat Artisanal, tandis que café, maïs, pois noir et gombo renforcent la production nationale et l'emploi rural.",
      image: septCulturesImg,
      icon: Sprout,
      metric: isEn ? '7 Crops Processed Locally' : 'Tamarin · Cacao · Café · Vivriers'
    }
  ];

  const cropToProductMatrix = [
    {
      crop: isEn ? 'Castor (Maskriti)' : 'Ricin / Maskriti (Culture Phare)',
      source: isEn ? '100 Ha Plantation · Morne-à-Casse' : 'Plantation 100 Ha · Morne-à-Casse',
      outlet: isEn ? 'Huile de Ricin Pure (100 gal/day press)' : 'Huile de Ricin Pure (Machine 100 gal/jour)'
    },
    {
      crop: isEn ? 'Beekeeping (Siwo Myèl)' : 'Élevage Apicole (Siwo Myèl)',
      source: isEn ? 'Panyen Lokal Apiaries · Nord-Est' : 'Ruchers Panyen Lokal · Nord-Est',
      outlet: isEn ? 'Pure Honey Harvest & Tiz Vin de Miel Base' : 'Récolte Miel Pur & Base du Tiz Vin de Miel'
    },
    {
      crop: isEn ? 'Tamarind (Tamaren)' : 'Tamarin (Tamaren)',
      source: isEn ? 'Morne-à-Casse Orchards' : 'Vergers de Morne-à-Casse',
      outlet: isEn ? 'Grand Tamar Cognac (43% Alc.)' : 'Grand Tamar Cognac (43% Alc.)'
    },
    {
      crop: isEn ? 'Cacao & Coffee' : 'Cacao & Café',
      source: isEn ? '100 Ha Agroforestry · Fort-Liberté' : 'Agroforesterie 100 Ha · Fort-Liberté',
      outlet: isEn ? 'Chocolat Artisanal (150 HTG) & Roasted Lots' : 'Chocolat Artisanal (150 HTG) & Lots Terroir'
    },
    {
      crop: isEn ? 'Corn, Black Beans & Okra' : 'Maïs, Pois Noir & Gombo (Combo)',
      source: isEn ? '100 Ha Food Plots · Morne-à-Casse' : 'Parcelles Vivrières · Morne-à-Casse',
      outlet: isEn ? 'Haitian Food Security & Direct Jobs' : 'Souveraineté Alimentaire & Emplois Directs'
    }
  ];

  const traceabilitySteps = [
    {
      num: '01',
      title: isEn ? '100 Ha & Apiaries in Morne-à-Casse' : '100 Ha & Ruchers à Morne-à-Casse',
      desc: isEn
        ? 'Cultivation of castor, tamarind, cacao, coffee, corn, black beans, okra, and honey beehives in Fort-Liberté.'
        : 'Culture de maskriti, tamarin, cacao, café, maïs, pois noir, gombo et élevage d’abeilles à Fort-Liberté.'
    },
    {
      num: '02',
      title: isEn ? 'Plant Processing (100 Gal/Day)' : 'Usine Morne-à-Casse (100 gal/jour)',
      desc: isEn
        ? 'Mechanical cold extraction of castor oil, honey fermentation for Tiz Vin de Miel, and Grand Tamar aging on site.'
        : 'Pressage mécanique du ricin (100 gal/j), fermentation du siwo myèl pour le vin et élaboration Grand Tamar.'
    },
    {
      num: '03',
      title: isEn ? 'Management & QC at Biwo Caracol' : 'Contrôle & Gestion au Biwo Caracol',
      desc: isEn
        ? 'Administrative coordination, laboratory purity verification, and order allocation at Village Ekam, Caracol.'
        : 'Gestion administrative, contrôle qualité laboratoire et coordination commerciale au Village Ekam, Caracol.'
    },
    {
      num: '04',
      title: isEn ? 'Haiti Retail & USA Export' : 'Distribution Haïti & Floride (USA)',
      desc: isEn
        ? 'Direct pickup in Haiti and Lauderhill (Florida), plus B2B wholesale drums and retail shipments globally.'
        : 'Retrait direct en Haïti et à Lauderhill (Floride), et expédition B2B internationale en fûts ou caisses.'
    }
  ];

  const strategicHubs = [
    {
      label: isEn ? 'Production & Agriculture' : 'Plantation 100 Ha & Usine',
      title: 'Morne-à-Casse, Fort-Liberté',
      region: isEn ? 'Nord-Est Department, Haiti' : 'Département du Nord-Est, Haïti',
      desc: isEn
        ? 'Home to our 100-hectare plantation (7 crops + beekeeping) and our industrial plant featuring the 100-gallon/day castor oil machine.'
        : "Site agricole de 100 hectares (7 cultures + élevage d'abeilles) et usine équipée de notre machine de 100 gallons d'huile de ricin par jour."
    },
    {
      label: isEn ? 'Haiti Corporate Office' : 'Bureau Administratif Haïti',
      title: 'Biwo Caracol — Village Ekam',
      region: 'B6-39, Village Ekam, Caracol, Haïti',
      desc: isEn
        ? 'Headquarters for administration, client reception, retail pickup, and commercial dispatch in Haiti. Tel: +509 3834-6371.'
        : 'Siège administratif, accueil des clients, retraits directs et coordination commerciale en Haïti. Tél : +509 3834-6371.'
    },
    {
      label: isEn ? 'USA Distribution Center' : 'Siège & Distribution USA',
      title: 'PANYEN LOKAL INC (Florida)',
      region: '7400 W Oakland Park Blvd, Unit 1125, Lauderhill, FL 33319',
      desc: isEn
        ? 'Official US presence serving the Haitian diaspora, North American retail buyers, and B2B wholesale inquiries. Tel: 781-469-8708.'
        : 'Point officiel aux États-Unis pour servir la diaspora haïtienne, les distributeurs et les commandes B2B. Tél : 781-469-8708.'
    }
  ];

  const faqItems = [
    {
      q: isEn
        ? 'What is the daily castor oil production capacity at Morne-à-Casse?'
        : 'Quelle est la capacité de production d’huile de ricin à Morne-à-Casse ?',
      a: isEn
        ? 'Our industrial plant in Morne-à-Casse (Fort-Liberté) operates a mechanical cold-press extraction machine capable of producing 100 gallons of pure castor oil per day, without hexane or chemical solvents.'
        : "Notre unité industrielle à Morne-à-Casse (Fort-Liberté) dispose d'une machine d'extraction mécanique à froid capable de produire 100 gallons d'huile de ricin pure par jour, sans hexane ni solvants chimiques."
    },
    {
      q: isEn
        ? 'How is Tiz Vin de Miel made and where does the honey come from?'
        : 'Comment est fabriqué le Tiz Vin de Miel et d’où vient le miel ?',
      a: isEn
        ? 'Panyen Lokal operates its own beekeeping hives (elevaj myèl) to harvest pure natural Haitian honey (siwo myèl). Our Tiz Vin de Miel is fermented directly from this honey base with local bitter orange notes.'
        : "Panyen Lokal gère son propre élevage d'abeilles afin de récolter du siwo myèl pur et naturel. Ce miel sert directement de matière première de base pour la fermentation de notre Tiz Vin de Miel."
    },
    {
      q: isEn
        ? 'What is the difference between your Morne-à-Casse site and Biwo Caracol?'
        : 'Quelle est la différence entre le site de Morne-à-Casse et le Biwo Caracol ?',
      a: isEn
        ? 'Our 100-hectare plantation (castor, tamarind, corn, black beans, okra, cacao, coffee) and industrial processing plant are in Morne-à-Casse, Fort-Liberté. Our corporate administrative office (Biwo Caracol) is located at B6-39, Village Ekam, Caracol.'
        : 'Notre plantation de 100 hectares (maskriti, tamarin, maïs, pois noir, gombo, cacao, café) et notre usine industrielle se trouvent à Morne-à-Casse, Fort-Liberté. Notre bureau administratif et commercial (Biwo Caracol) est situé au B6-39, Village Ekam à Caracol.'
    },
    {
      q: isEn
        ? 'How can wholesale buyers or diaspora customers order from the USA or Haiti?'
        : 'Comment commander en gros (galons/fûts) ou au détail en Haïti et aux USA ?',
      a: isEn
        ? 'Retail items (2oz 250 HTG, 4oz 500 HTG, Chocolate 150 HTG) and 1-gallon jugs ($70 USD) can be reserved directly via WhatsApp or picked up in Caracol and Lauderhill, Florida. B2B importers can request a proforma quote via our Export B2B page.'
        : 'Les formats détail (2oz 250 HTG, 4oz 500 HTG, Chocolat 150 HTG) et les galons ($70 USD) se réservent sur WhatsApp ou se retirent à Caracol et Lauderhill (Floride). Pour les grossistes et conteneurs, demandez un devis proforma via notre page Export B2B.'
    }
  ];

  const scrollToAddresses = () => {
    const el = document.getElementById('points-de-vente');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="agri-enterprise-showcase" className="bg-white text-[#1A1F1C] overflow-hidden">

      {/* 1. PRÉSENTATION INSTITUTIONNELLE (STYLE ÉDITORIAL WWF.FR) */}
      <section id="presentation-section" className="py-20 sm:py-24 bg-[#F6F7F5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection threshold={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white p-1.5 border border-stone-200 rounded-sm shrink-0">
                      <img
                        src={panyenLogo}
                        alt="Logo Panyen Lokal"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-1 text-left">
                        {isEn ? 'National Agro-Industrial Enterprise' : 'Entreprise Agro-Industrielle Nationale'}
                      </p>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#1C3022] tracking-tight text-left">
                        PANYEN LOKAL S.A.
                      </h2>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-[30px] font-semibold uppercase text-[#1C3022] leading-tight text-balance text-left">
                    {t('pres.subtitle')}
                  </h3>

                  <p className="text-base sm:text-[17px] text-stone-700 leading-relaxed max-w-2xl mb-0 text-justify">
                    {isEn
                      ? 'Rooted in the Nord-Est department, our 100-hectare plantation and industrial plant are located in Morne-à-Casse (Fort-Liberté)—cultivating Haiti’s largest castor plantation alongside tamarind, corn, black beans, okra, cacao, and coffee—while our corporate office operates from Village Ekam in Caracol.'
                      : "Implantée dans le département du Nord-Est, notre exploitation de 100 hectares et notre unité industrielle se situent à Morne-à-Casse (Fort-Liberté) — pour bâtir la plus grande plantation de ricin d'Haïti avec tamarin, maïs, pois noir, gombo, cacao et café — tandis que notre bureau administratif vous accueille au Village Ekam à Caracol."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentRoute('a-propos');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-sm bg-[#1C3022] hover:bg-[#3D684A] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>{t('pres.btn_mission')}</span>
                    <ArrowRight className="w-4 h-4 text-[#76BD43]" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRoute('marches-export');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-sm bg-white hover:bg-stone-100 text-[#1C3022] border border-stone-300 font-bold text-xs sm:text-[13px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>{t('pres.btn_export')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Photo Pleine Hauteur du Complexe Industriel */}
              <div className="lg:col-span-5 rounded-sm overflow-hidden border border-stone-200 min-h-[280px] lg:h-full">
                <ImageWithSkeleton
                  src={usineExtImg}
                  alt="Unité industrielle et plantation de Morne-à-Casse, Fort-Liberté"
                  containerClassName="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* BANDEAU IMPACT CHIFFRÉS (STYLE WWF.FR PLEINE LARGEUR) */}
      <section className="bg-[#1C3022] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#2A4833] text-center" staggerDelay={0.08}>
            <StaggerItem className="px-4 py-4 lg:py-0">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#76BD43] block tabular-nums">
                <Counter value="100" /> Ha
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-200 mt-2 block">
                {isEn ? 'Plantation · Morne-à-Casse' : 'Terre · Morne-à-Casse'}
              </span>
            </StaggerItem>

            <StaggerItem className="px-4 py-4 lg:py-0">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#76BD43] block tabular-nums">
                100 gal/j
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-200 mt-2 block">
                {isEn ? 'Castor Oil Extraction Machine' : 'Capacité Extraction Ricin / Jour'}
              </span>
            </StaggerItem>

            <StaggerItem className="px-4 py-4 lg:py-0">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#76BD43] block tabular-nums">
                7 + Miel
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-200 mt-2 block">
                {isEn ? 'Crops & Own Apiculture' : 'Cultures & Élevage Apicole'}
              </span>
            </StaggerItem>

            <StaggerItem className="px-4 py-4 lg:py-0">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#76BD43] block tabular-nums">
                100%
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-200 mt-2 block">
                {isEn ? 'Jobs & Processing in Haiti' : 'Emplois & Production Haïti'}
              </span>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* NOUVELLE SECTION : FILIÈRES TERROIR, RUCHERS & CAPACITÉ 100 GAL/JOUR */}
      <section id="filieres-capacite-section" className="py-20 sm:py-24 bg-[#F6F7F5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection threshold={0.15} className="text-center max-w-3xl mx-auto space-y-3 pb-8 border-b border-stone-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-0 text-center">
              {isEn ? 'From Harvest & Hives to Finished Goods' : 'De nos Terres & Ruchers aux Produits Finis'}
            </p>
            <h2 className="font-display text-3xl sm:text-[42px] font-bold uppercase text-[#1C3022] tracking-tight leading-[1.08] text-balance">
              {isEn
                ? 'Industrial Capacity & Integrated Raw Materials'
                : 'Capacité Industrielle, 7 Cultures & Élevage Apicole'}
            </h2>
            <div className="w-14 h-1 bg-[#76BD43] mx-auto" />
            <p className="text-base sm:text-[17px] text-stone-600 leading-relaxed mb-0 text-center">
              {isEn
                ? 'Every bottle we release comes directly from raw materials grown or harvested by Panyen Lokal: 100 gallons/day of cold-pressed castor oil, pure honey from our hives for Tiz Vin de Miel, and 7 crops cultivated on 100 hectares in Morne-à-Casse.'
                : 'Chaque produit Panyen Lokal naît directement de nos filières intégrées à Morne-à-Casse : 100 gallons/jour d’huile de ricin extraite sur machine, siwo myèl de nos ruchers pour le Tiz Vin de Miel, et 7 cultures sur 100 hectares.'}
            </p>
          </FadeInSection>

          {/* 3 Cartes Visuelles Exclusives */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
            {productionChains.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem
                  key={item.id}
                  className="bg-white rounded-sm border border-stone-200 overflow-hidden flex flex-col justify-between group hover:border-[#3D684A] transition-colors"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden bg-stone-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C3022]/85 via-[#1C3022]/20 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#76BD43]">
                          {item.kicker}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-sm bg-[#1C3022] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#76BD43]" />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#1C3022] leading-tight">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 border-t border-stone-200 bg-[#F6F7F5] text-xs font-bold uppercase tracking-wider text-[#3D684A]">
                    {item.metric}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Grille Correspondance Matières Premières -> Produits Finis */}
          <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            <div className="px-6 py-4 bg-[#1C3022] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-display text-lg font-bold uppercase tracking-wide">
                {isEn ? 'Morne-à-Casse Harvests & Apiculture Index' : 'Nos 7 Cultures & Ruchers → Transformation Industrielle'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#76BD43]">
                {isEn ? '100 Hectares · Fort-Liberté' : '100 Hectares · Morne-à-Casse, Fort-Liberté'}
              </span>
            </div>

            <div className="divide-y divide-stone-200">
              {cropToProductMatrix.map((row, idx) => (
                <div
                  key={idx}
                  className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-center text-sm"
                >
                  <div className="font-bold text-[#1C3022]">{row.crop}</div>
                  <div className="text-stone-600">{row.source}</div>
                  <div className="font-semibold text-[#3D684A] md:text-right">{row.outlet}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUR LE TERRAIN : SOLUTIONS POUR L'AGRICULTURE, EMPLOIS & ESSOR NATIONAL (STYLE WWF.FR) */}
      <section id="impact-terrain-section" className="py-20 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection threshold={0.15} className="text-center max-w-3xl mx-auto space-y-3 pb-8 border-b border-stone-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-0 text-center">
              {isEn ? 'On the Ground in Haiti' : 'Sur le Terrain en Haïti'}
            </p>
            <h2 className="font-display text-3xl sm:text-[42px] font-bold uppercase text-[#1C3022] tracking-tight leading-[1.08] text-balance">
              {isEn
                ? 'Agricultural Solutions, Local Jobs & National Elevation'
                : "Solutions pour l'Agriculture, Emplois & Essor National"}
            </h2>
            <div className="w-14 h-1 bg-[#76BD43] mx-auto" />
            <p className="text-base sm:text-[17px] text-stone-600 leading-relaxed mb-0 text-center">
              {isEn
                ? 'Our commitment goes beyond production: we build concrete solutions for Haitian agriculture, create dignified employment for families, and elevate domestic production to international excellence.'
                : "Notre engagement dépasse la simple fabrication : apporter des solutions concrètes à l'agriculture haïtienne, créer des emplois durables pour la population et hisser la production nationale vers l'excellence."}
            </p>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
            {fieldSolutions.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem
                  key={item.id}
                  className="bg-[#F6F7F5] rounded-sm border border-stone-200 overflow-hidden flex flex-col justify-between group hover:border-[#3D684A] transition-colors"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-stone-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C3022]/85 via-[#1C3022]/20 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#76BD43]">
                          {item.kicker}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-sm bg-[#1C3022] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#76BD43]" />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#1C3022] leading-tight">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 border-t border-stone-200 bg-white flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#3D684A]">
                    <span>{item.metric}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentRoute('a-propos');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 text-[#1C3022] hover:text-[#3D684A] transition-colors cursor-pointer"
                    >
                      <span>{isEn ? 'Learn more' : 'En savoir plus'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. LES 4 PILIERS STRATÉGIQUES */}
      <section className="py-20 sm:py-24 bg-[#F6F7F5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeInSection threshold={0.2} className="text-center max-w-3xl mx-auto space-y-3 pb-8 border-b border-stone-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-0 text-center">
              {isEn ? 'Integrated Model' : 'Modèle Intégré'}
            </p>
            <h2 className="font-display text-3xl sm:text-[42px] font-bold uppercase text-[#1C3022] tracking-tight leading-[1.08] text-balance">
              {t('pillars.title')}
            </h2>
            <div className="w-14 h-1 bg-[#76BD43] mx-auto" />
            <p className="text-base sm:text-[17px] text-stone-600 leading-relaxed mb-0 text-center">
              {t('pillars.subtitle')}
            </p>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.08}>
            {fourPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem
                  key={pillar.id}
                  className="bg-white rounded-sm border border-stone-200 hover:border-[#3D684A] transition-colors flex flex-col overflow-hidden group"
                >
                  <div className="relative h-56 overflow-hidden bg-stone-900">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C3022]/85 via-[#1C3022]/20 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#76BD43]">
                        {pillar.badge} · {pillar.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-sm bg-[#1C3022] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#76BD43]" />
                        </div>
                        <h3 className="font-display text-2xl font-bold uppercase text-[#1C3022] leading-tight">
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-stone-700 font-semibold leading-relaxed mb-0">
                        {pillar.lead}
                      </p>

                      <ul className="space-y-2 pt-2 pl-0 list-none">
                        {pillar.details.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-sm text-stone-600 mb-0">
                            <CheckCircle2 className="w-4 h-4 text-[#3D684A] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. DISTRIBUTION & APPROVISIONNEMENT (HAÏTI · ÉTATS-UNIS) */}
      <section id="distribution-logistique-section" className="py-20 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-0 text-left">
                {isEn ? 'Distribution & Logistics' : 'Distribution & Approvisionnement'}
              </p>
              <h2 className="font-display text-3xl sm:text-[42px] font-bold uppercase text-[#1C3022] tracking-tight leading-[1.08] text-balance text-left">
                {isEn
                  ? 'How to Acquire Our Range in Haiti & the USA'
                  : 'Comment Obtenir Nos Gammes en Haïti et aux États-Unis'}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={scrollToAddresses}
                className="px-5 py-3 rounded-sm bg-[#1C3022] hover:bg-[#3D684A] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-[#76BD43]" />
                <span>{isEn ? 'Official Addresses' : 'Voir Nos Adresses'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentRoute('marches-export');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-sm bg-[#76BD43] hover:bg-[#5B9B6E] text-[#1C3022] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                <span>{isEn ? 'B2B Export Quote' : 'Devis Export B2B'}</span>
              </button>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.08}>
            {acquisitionSteps.map((step) => (
              <StaggerItem
                key={step.num}
                className="p-7 rounded-sm bg-[#F6F7F5] border border-stone-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="font-display text-4xl font-bold text-[#76BD43] block tabular-nums">
                    {step.num}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#1C3022] leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-0">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <a
                    href="https://wa.me/50938346371?text=Bonjour%20Panyen%20Lokal,%20je%20souhaite%20des%20informations%20pour%20commander."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D684A] hover:text-[#1C3022] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isEn ? 'Contact via WhatsApp' : 'Contacter sur WhatsApp'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. GOUVERNANCE & ÉQUIPES */}
      <section className="py-20 sm:py-24 bg-[#F6F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FadeInSection threshold={0.15} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-0 text-left">
                  {isEn ? 'Leadership & Teams' : 'Gouvernance & Équipes'}
                </p>
                <h2 className="font-display text-3xl sm:text-[42px] font-bold uppercase text-[#1C3022] tracking-tight leading-[1.08] text-balance text-left">
                  {t('gallery.title')}
                </h2>
                <p className="text-base text-stone-600 mb-0 text-left">
                  {isEn
                    ? 'The executives, engineers, plant specialists, and cooperative delegates driving our operations.'
                    : 'Les dirigeants, ingénieurs, techniciens et représentants agricoles qui animent nos opérations.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {galleryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryFilter(tab.id)}
                  className={`px-4 py-2 rounded-sm text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    galleryFilter === tab.id
                      ? 'bg-[#1C3022] text-white'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-[#3D684A]'
                  }`}
                >
                  {t(tab.labelKey as TranslationKey)}
                </button>
              ))}
            </div>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.05}>
            {filteredGallery.map((item) => (
              <StaggerItem
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="bg-white rounded-sm border border-stone-200 hover:border-[#3D684A] transition-colors overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden bg-stone-900 w-full">
                  <ImageWithSkeleton
                    src={item.src}
                    alt={item.title}
                    containerClassName="w-full h-full"
                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3022]/85 via-[#1C3022]/15 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="p-2.5 rounded-sm bg-white/95 text-[#1C3022] shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#76BD43] block">
                      {item.role}
                    </span>
                    <h4 className="font-display text-lg font-bold uppercase text-white line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-[#3D684A]" />
                      <span>{item.loc}</span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed mb-0">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200 text-xs font-semibold text-[#3D684A]">
                    {item.tags.join(' · ')}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* NOUVELLE SECTION : TRAÇABILITÉ (DE MORNE-À-CASSE À L'EXPORT) & 3 PÔLES STRATÉGIQUES */}
      <section className="py-20 sm:py-24 bg-white border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Chaîne de traçabilité 01 -> 04 */}
          <div className="space-y-10">
            <FadeInSection threshold={0.15} className="text-center max-w-3xl mx-auto space-y-3 pb-6 border-b border-stone-200">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-0 text-center">
                {isEn ? 'End-to-End Traceability' : 'Traçabilité Maîtrisée'}
              </p>
              <h2 className="font-display text-3xl sm:text-[42px] font-bold uppercase text-[#1C3022] tracking-tight leading-[1.08] text-balance">
                {isEn ? 'From Field Soil to International Shelves' : "De la Terre de Morne-à-Casse à l'Export International"}
              </h2>
              <div className="w-14 h-1 bg-[#76BD43] mx-auto" />
            </FadeInSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 border border-stone-200 bg-[#F6F7F5] rounded-sm">
              {traceabilitySteps.map((step) => (
                <div key={step.num} className="p-6 space-y-3">
                  <span className="font-display text-3xl font-bold text-[#76BD43] block tabular-nums">
                    {step.num}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#1C3022] leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed mb-0">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Pôles Stratégiques Officielles */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-stone-200">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-1 text-left">
                  {isEn ? 'Strategic Footprint' : 'Implantations Officielles'}
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-[#1C3022] tracking-tight text-left">
                  {isEn ? 'Plantation, Plant & Official Offices' : 'Plantation, Usine & Bureaux Officiels'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCurrentRoute('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D684A] hover:text-[#1C3022] transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>{isEn ? 'Open Contact Page' : 'Accéder à la Page Contact'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strategicHubs.map((hub, idx) => (
                <div key={idx} className="p-6 bg-[#F6F7F5] border border-stone-200 rounded-sm space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3D684A] block text-left">
                    {hub.label}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#1C3022] text-left">
                    {hub.title}
                  </h3>
                  <div className="flex items-start gap-2 text-xs font-semibold text-stone-700 pt-0.5 text-left">
                    <MapPin className="w-4 h-4 text-[#76BD43] shrink-0 mt-0.5" />
                    <span>{hub.region}</span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed pt-1 mb-0">
                    {hub.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION : QUESTIONS FRÉQUENTES (FAQ ACCORDÉON) */}
      <section className="py-20 sm:py-24 bg-[#F6F7F5] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D684A] mb-0 text-center">
              {isEn ? 'Key Answers' : 'Informations Pratiques'}
            </p>
            <h2 className="font-display text-3xl sm:text-[40px] font-bold uppercase text-[#1C3022] tracking-tight text-balance">
              {isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
            </h2>
            <div className="w-14 h-1 bg-[#76BD43] mx-auto" />
          </div>

          <div className="divide-y divide-stone-200 border border-stone-200 bg-white rounded-sm">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#F6F7F5] transition-colors cursor-pointer"
                  >
                    <span className="font-display text-lg sm:text-xl font-semibold uppercase text-[#1C3022]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#3D684A] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-stone-100">
                      <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-0">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BANNIÈRE D'ENGAGEMENT FINALE (STYLE CTA WWF.FR) */}
      <section className="py-16 sm:py-20 bg-[#2A4833] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#76BD43] mb-0 text-left">
              {isEn ? 'Partner with Panyen Lokal' : 'Export B2B & Partenariats'}
            </p>
            <h2 className="font-display text-3xl sm:text-[42px] font-bold uppercase text-white leading-[1.06] text-balance text-left">
              {isEn
                ? 'Ready to Distribute Pure Haitian Agro-Industrial Products?'
                : 'Prêt à Distribuer ou Soutenir la Production Nationale Haïtienne ?'}
            </h2>
            <p className="text-base text-stone-200 leading-relaxed mb-0 text-left">
              {isEn
                ? 'Whether for 100-gallon/day bulk castor sourcing, retail distribution in Haiti & the USA, or institutional agricultural partnerships, our teams in Caracol and Florida are ready.'
                : "Commandes en gros d'huile de ricin (capacité 100 gal/jour), distribution en Haïti ou aux États-Unis, ou partenariats agricoles : échangez directement avec notre direction."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => {
                setCurrentRoute('marches-export');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-4 rounded-sm bg-[#76BD43] hover:bg-white text-[#1C3022] font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>{isEn ? 'Request B2B Quote' : 'Demander un Devis B2B'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRoute('partenariats');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-4 rounded-sm border border-white/40 hover:bg-white hover:text-[#1C3022] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              {isEn ? 'Institutional Partnerships' : 'Partenariats'}
            </button>
          </div>
        </div>
      </section>

      {/* MODAL LIGHTBOX */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-4xl w-full bg-[#1C3022] rounded-sm overflow-hidden border border-[#2A4833] shadow-2xl p-3 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-black/80 hover:bg-black text-white transition-colors cursor-pointer"
                title={isEn ? 'Close' : 'Fermer'}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
                <ImageWithSkeleton
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  containerClassName="max-h-[68vh] w-auto max-w-full flex items-center justify-center"
                  imgClassName="max-h-[68vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="w-full text-center py-4 px-4 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#76BD43] block">
                  {lightboxImg.role} · {lightboxImg.loc}
                </span>
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {lightboxImg.title}
                </h3>
                <p className="text-sm text-stone-300 mb-0">
                  {lightboxImg.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
