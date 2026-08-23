import { LucideIcon } from 'lucide-react';
import { 
  Users, 
  Factory, 
  ShieldCheck, 
  Globe2, 
  Droplets, 
  Sprout, 
  PackageCheck, 
  Truck, 
  Wine, 
  Sparkles, 
  Heart, 
  Cookie, 
  Award, 
  FlaskConical 
} from 'lucide-react';

import ricinFlaconImg from '../assets/images/huile_ricin_flacon_1786847591002.jpg';
import grandTamarFrontImg from '../assets/images/grand_tamar_front_1786934308034.jpg';
import cassaveNordBoxImg from '../assets/images/cassave_nord_box_1786934328091.jpg';
import champImg from '../assets/images/champ_panyen_lokal_1786858968582.jpg';
import complexeImg from '../assets/images/complexe_ekam_caracol_1786858981077.jpg';
import usineExtImg from '../assets/images/usine_exterieur_ekam_1786859382526.jpg';
import souveraineteImg from '../assets/images/souverainete_marche_1786859004801.jpg';
import marchandesImg from '../assets/images/marchandes_panyen_1786859017441.jpg';
import marcheFruitsImg from '../assets/images/marche_fruits_terroir_1786859032135.jpg';
import portExportImg from '../assets/images/port_export_haiti_1786859395214.jpg';
import recolteImg from '../assets/images/recolte_ricin_moringa_1786859405918.jpg';
import laboImg from '../assets/images/laboratoire_analyse_hplc_1786859417514.jpg';

import directeurGeneralImg from '../assets/images/directeur_general_panyen_1787122412315.jpg';
import secretaireGeneraleImg from '../assets/images/secretaire_generale_panyen_1787122423325.jpg';
import directeurProductionImg from '../assets/images/directeur_production_ekam_1787122433512.jpg';
import managerOperationsImg from '../assets/images/manager_operations_panyen_1787122446122.jpg';
import ingenieurAgronomeImg from '../assets/images/ingenieur_agronome_panyen_1787122456575.jpg';
import techniciensUsineImg from '../assets/images/techniciens_usine_ekam_1787122474124.jpg';
import planteursPartenairesImg from '../assets/images/planteurs_partenaires_1787122485835.jpg';
import responsableVenteExportImg from '../assets/images/responsable_vente_export_1787122497980.jpg';

export interface PillarData {
  id: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  lead: string;
  image: string;
  details: string[];
  tag: string;
}

export interface ServiceData {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  badge: string;
  image: string;
  details: string;
}

export interface FlagshipProductData {
  id: string;
  title: string;
  category: string;
  desc: string;
  image: string;
  icon: LucideIcon;
  badge: string;
}

export interface ProcessStepData {
  step: string;
  title: string;
  desc: string;
  image: string;
  icon: LucideIcon;
}

export interface TerroirData {
  id: number;
  region: string;
  title: string;
  desc: string;
  products: string[];
  stats: string;
  image: string;
}

export interface GalleryItemData {
  id: number;
  category: string;
  categoryLabel: string;
  role: string;
  title: string;
  desc: string;
  loc: string;
  src: string;
  tags: string[];
}

export const getFourPillars = (isEn: boolean): PillarData[] => [
  {
    id: "emploi",
    icon: Users,
    badge: isEn ? "PILLAR #1" : "PILIER #1",
    title: isEn ? "Sustainable Job Creation & Farming Dignity" : "Création d'Emplois Durables & Dignité Paysanne",
    lead: isEn 
      ? "Over 850 rural producer families supported with stable, guaranteed incomes." 
      : "Plus de 850 familles de producteurs rurales accompagnées avec des revenus stables et garantis.",
    image: marchandesImg,
    details: isEn ? [
      "Multi-year purchasing agreements at guaranteed fair prices before harvest.",
      "Direct agronomic mentorship to boost yields without synthetic chemicals.",
      "Anchoring rural communities in their native lands to curb rural exodus."
    ] : [
      "Contrats d'achat pluriannuels à prix rémunérateurs garantis avant la récolte.",
      "Encadrement agronomique de proximité pour optimiser les rendements sans intrants chimiques.",
      "Fixation des populations rurales sur leurs terroirs et lutte contre l'exode rural."
    ],
    tag: isEn ? "850+ Partner Families" : "850+ Familles Bénéficiaires"
  },
  {
    id: "transformation",
    icon: Factory,
    badge: isEn ? "PILLAR #2" : "PILIER #2",
    title: isEn ? "Industrial Processing & 100% Domestic Added Value" : "Transformation Industrielle & 100% Valeur Ajoutée Nationale",
    lead: isEn 
      ? "Permanently ending the export of unrefined raw materials with zero local processing." 
      : "Rompre définitivement avec l'exportation de matières premières brutes non valorisées.",
    image: complexeImg,
    details: isEn ? [
      "State-of-the-art facility at Village EKAM in Caracol (North-East), equipped with 316L stainless steel presses.",
      "Clean mechanical extraction processes without chemical solvents (hexane-free).",
      "Creation of skilled industrial careers: machine operators, food chemists, and logistics experts."
    ] : [
      "Complexe moderne au Village EKAM à Caracol (Nord-Est), équipé de presses inox 316L.",
      "Procédés d'extraction propres sans solvants pétrochimiques (garanti sans hexane).",
      "Création d'emplois industriels qualifiés : opérateurs de machines, chimistes et logisticiens."
    ],
    tag: isEn ? "EKAM Industrial Facility (Caracol)" : "Complexe Industriel EKAM (Caracol)"
  },
  {
    id: "souverainete",
    icon: ShieldCheck,
    badge: isEn ? "PILLAR #3" : "PILIER #3",
    title: isEn ? "Food Sovereignty & Import Substitution" : "Souveraineté Alimentaire & Remplacement des Importations",
    lead: isEn 
      ? "Consuming premium local natural goods to preserve health and national economic resilience." 
      : "Consommer des produits naturels locaux d'excellence pour préserver la santé et l'économie.",
    image: marcheFruitsImg,
    details: isEn ? [
      "Replacing imported mineral oils with certified Pure Haitian Castor Oil.",
      "Culinary valorization of wild tamarind, organic cocoa, and native cassava.",
      "Substantial foreign exchange savings for the Republic of Haiti."
    ] : [
      "Remplacement des huiles minérales importées par notre Huile de Ricin Pure certifiée.",
      "Valorisation gastronomique du tamarin sauvage, du cacao bio et du manioc d'Haïti.",
      "Économie substantielle de devises étrangères pour la république d'Haïti."
    ],
    tag: isEn ? "Economic Autonomy of Haiti" : "Autonomie Économique d'Haïti"
  },
  {
    id: "exportation",
    icon: Globe2,
    badge: isEn ? "PILLAR #4" : "PILIER #4",
    title: isEn ? "Global Reach & Elite B2B Exports" : "Rayonnement Mondial & Exportations B2B d'Élite",
    lead: isEn 
      ? "Positioning Haitian craftsmanship and terroir at the top of international value chains." 
      : "Positionner le savoir-faire haïtien au sommet des chaînes de valeur mondiales.",
    image: portExportImg,
    details: isEn ? [
      "Compliance with international purity standards: HPLC analysis, MSDS/SDS sheets, and certificates of origin.",
      "Streamlined export channels to the United States (Miami/New York), Canada, and the Caribbean.",
      "Bulk shipping in industrial 204L drums (54 Gallons) and full 20ft/40ft maritime containers."
    ] : [
      "Conformité avec les normes internationales de pureté HPLC, fiches FDS/MSDS et certificats.",
      "Hubs d'exportation structurés vers les États-Unis (Miami/New York), le Canada et les Caraïbes.",
      "Approvisionnement en fûts industriels de 204L (54 Gallons) et conteneurs complets."
    ],
    tag: isEn ? "B2B Exports & Global Diaspora" : "Export B2B & Diaspora Mondiale"
  }
];

export const getServicesList = (isEn: boolean): ServiceData[] => [
  {
    id: "service-extraction",
    icon: Droplets,
    title: isEn ? "Mechanical Oil Pressing & Extraction" : "Pressage & Extraction Mécanique d'Huiles",
    desc: isEn 
      ? "Cold-press extraction services for oilseeds (castor, moringa). Absolute purity guaranteed without chemical solvents." 
      : "Prestation d'extraction à froid pour graines oléagineuses (ricin, moringa). Pureté absolue garantie sans solvants.",
    badge: isEn ? "Technical Service" : "Service Technique",
    image: complexeImg,
    details: isEn ? "Capacity: up to 3,000 L / week • Fine stainless steel filtration" : "Capacité : jusqu'à 3 000 L / semaine • Filtration fine inox"
  },
  {
    id: "service-agregation",
    icon: Sprout,
    title: isEn ? "Agricultural Aggregation & Sourcing" : "Agrégation & Collecte Agricole Sécurisée",
    desc: isEn 
      ? "Direct purchasing, quality grading, and harvest bulk-aggregation across our producer networks in 6 departments." 
      : "Achat direct, contrôle qualité et massification des récoltes auprès de nos réseaux de producteurs sur 6 départements.",
    badge: isEn ? "Supply Chain" : "Approvisionnement",
    image: recolteImg,
    details: isEn ? "Plot traceability • Direct instant payment to farmers" : "Traçabilité des parcelles • Paiement direct aux planteurs"
  },
  {
    id: "service-conditionnement",
    icon: PackageCheck,
    title: isEn ? "Export Packaging & Bottling" : "Conditionnement & Emballage Export",
    desc: isEn 
      ? "Cosmetic bottling from 2oz to 1L or sealed heavy-duty steel drums certified for maritime shipping." 
      : "Flaconnage cosmétique de 2oz à 1L ou fûts métalliques scellés homologués transport maritime international.",
    badge: isEn ? "Packaging Hub" : "Pôle Packaging",
    image: ricinFlaconImg,
    details: isEn ? "Compliant international labeling • 54-gallon drums with tamper seals" : "Étiquetage normé • Fûts 54 gallons avec scellés sécurisés"
  },
  {
    id: "service-export",
    icon: Truck,
    title: isEn ? "B2B Export Logistics & Testing" : "Logistique d'Exportation B2B & Certifications",
    desc: isEn 
      ? "Full maritime freight management (Port of Cap-Haitien / Port-au-Prince), customs clearance, and HPLC certificates." 
      : "Gestion complète du fret maritime (Port du Cap-Haïtien / Port-au-Prince), formalités douanières et analyses HPLC.",
    badge: isEn ? "International Trade" : "Commerce International",
    image: laboImg,
    details: isEn ? "Incoterms FOB, CIF, EXW • Laboratory purity certificates" : "Incoterms FOB, CIF, EXW • Fiches d'analyses de pureté"
  }
];

export const getFlagshipProducts = (isEn: boolean): FlagshipProductData[] => [
  {
    id: 'huile-de-ricin',
    title: isEn ? 'Pure Haitian Castor Oil' : 'Huile de Ricin Pure',
    category: isEn ? 'Cosmetics & Hair Fortification' : 'Cosmétique & Soins Capillaires',
    desc: isEn 
      ? '>88% Ricinoleic Acid • Ancestral treasure to strengthen, hydrate, and stimulate hair regrowth.' 
      : '>88% Acide Ricinoléique • Trésor ancestral pour fortifier, réparer et stimuler la repousse.',
    image: ricinFlaconImg,
    icon: Droplets,
    badge: isEn ? 'National Flagship' : 'Fleuron National'
  },
  {
    id: 'cognac-grand-tamar',
    title: 'Cognac Grand Tamar',
    category: isEn ? 'Prestige Spirits & Liqueurs' : 'Spiritueux & Liqueurs de Prestige',
    desc: isEn 
      ? 'Exceptional 43% Alc. Cognac infused with wild tamarind, oak-aged in Caracol.' 
      : 'Cognac d\'exception 43% Alc. au tamarinier vieilli en fût de chêne à Caracol.',
    image: grandTamarFrontImg,
    icon: Wine,
    badge: isEn ? 'Noble Liqueur' : 'Liqueur Noble'
  },
  {
    id: 'tiz-vin-de-miel',
    title: 'Tiz Vin de Miel (Mead)',
    category: isEn ? 'Artisanal Meads & Terroir Wines' : 'Hydromels & Vins de Terroir',
    desc: isEn 
      ? 'Refined mead made with wild polyfloral honey and citrus hints from Northern bitter oranges.' 
      : 'Hydromel raffiné au miel polyfloral sauvage et notes de bigarade du Nord.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80',
    icon: Sparkles,
    badge: isEn ? 'Handcrafted' : 'Création Artisanale'
  },
  {
    id: 'chocolat-artisanal',
    title: isEn ? 'Pure Organic Cocoa Chocolate' : 'Chocolat Pur Cacao Bio',
    category: isEn ? 'Gastronomy & Criollo Cocoa' : 'Gastronomie & Cacao Criollo',
    desc: isEn 
      ? '100% pure wood-fired roasted cocoa following authentic North Plain traditions.' 
      : 'Cacao 100% pur torréfié au feu de bois selon les traditions de la Plaine du Nord.',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=700&q=80',
    icon: Heart,
    badge: isEn ? '100% Pure' : '100% Naturel'
  },
  {
    id: 'cassave-artisanal',
    title: isEn ? 'Traditional Cassava Cake' : 'Cassave Traditionnelle',
    category: isEn ? 'Traditional Bakery & Cassava' : 'Boulangerie Traditionnelle & Manioc',
    desc: isEn 
      ? 'Crispy cassava biscuits flavored with sweet cassava, cinnamon, coconut, and sesame in protective box.' 
      : 'Galettes de manioc doux, cannelle, coco et roroli en étui protecteur 20x7x30cm.',
    image: cassaveNordBoxImg,
    icon: Cookie,
    badge: isEn ? 'Culinary Heritage' : 'Patrimoine Culinaire'
  }
];

export const getProcessSteps = (isEn: boolean): ProcessStepData[] => [
  {
    step: "01",
    title: isEn ? "Seed Supply & Farmer Guidance" : "Distribution de Semences & Encadrement",
    desc: isEn 
      ? "Providing high-grade seeds and year-round field agronomist supervision." 
      : "Fourniture de semences sélectionnées et suivi agronomique sur le terrain.",
    image: recolteImg,
    icon: Sprout
  },
  {
    step: "02",
    title: isEn ? "Hand Harvest & Quality Grading" : "Récolte Manuelle & Tri Qualitatif",
    desc: isEn 
      ? "Seeds and produce harvested at peak maturity and meticulously hand-sorted." 
      : "Graines et matières premières cueillies à maturité optimale et triées avec soin.",
    image: marchandesImg,
    icon: Award
  },
  {
    step: "03",
    title: isEn ? "Processing at Village EKAM" : "Transformation au Village EKAM",
    desc: isEn 
      ? "Cold mechanical pressing and purification with 316L stainless equipment." 
      : "Pressage mécanique à froid et transformation sur équipements en inox 316L.",
    image: complexeImg,
    icon: Factory
  },
  {
    step: "04",
    title: isEn ? "HPLC Lab Testing & Certified Purity" : "Contrôle HPLC & Pureté Certifiée",
    desc: isEn 
      ? "Laboratory chromatography validating optimal ricinoleic acid and zero solvent residue." 
      : "Analyses de laboratoire validant la pureté et l'absence totale de solvants.",
    image: laboImg,
    icon: FlaskConical
  },
  {
    step: "05",
    title: isEn ? "Bottling & Global Export Logistics" : "Conditionnement & Export Mondial",
    desc: isEn 
      ? "Retail cosmetic bottling and 204L sealed drums for international B2B distributors." 
      : "Flaconnage cosmétique et fûts scellés de 204L pour distributeurs et B2B.",
    image: portExportImg,
    icon: Truck
  }
];

export const getTerroirs = (isEn: boolean): TerroirData[] => [
  {
    id: 0,
    region: isEn ? "North-East (Caracol & Village EKAM)" : "Nord-Est (Caracol & Village EKAM)",
    title: isEn ? "Agro-Industrial Hub & Pure Castor Oil" : "Pôle Agro-Industriel & Huile de Ricin Pure",
    desc: isEn 
      ? "Operational heart of Panyen Lokal with over 480 hectares of castor, moringa, and tamarind plantations, plus our modern processing facility at Village EKAM." 
      : "Cœur opérationnel de Panyen Lokal avec plus de 480 hectares de plantations de ricin, moringa et tamarinier ainsi que notre complexe moderne de transformation au Village EKAM.",
    products: isEn 
      ? ["Pure Haitian Castor Oil", "Bulk Export Castor (204L Drums)", "Pure Moringa Oil"] 
      : ["Huile de Ricin Pure", "Ricin Vrac Export (Fûts 204L)", "Huile de Moringa"],
    stats: isEn ? "350+ Partner Farmers • Central EKAM Plant" : "350+ Producteurs Partenaires • Usine Centrale EKAM",
    image: usineExtImg
  },
  {
    id: 1,
    region: isEn ? "North & Northern Plains" : "Nord & Plaine du Nord",
    title: isEn ? "Agroforestry Cocoa & Wild Citrus" : "Cacao Agroforestier & Bigarade Sauvage",
    desc: isEn 
      ? "Fertile forested canopy soils sheltering noble Criollo and Forastero cocoa varieties harvested under tree cover, alongside bitter orange groves." 
      : "Sols fertiles d'ombrage forestier abritant des variétés nobles de cacao Criollo et Forastero récoltées sous canopée, ainsi que des vergers d'oranges amères.",
    products: isEn 
      ? ["Pure Organic Cocoa Chocolate", "Tiz Vin de Miel Mead", "Traceable Fermented Beans"] 
      : ["Chocolat Pur Cacao Bio", "Hydromel Tiz Vin de Miel", "Fèves Fermentées Traçables"],
    stats: isEn ? "220+ Farmers • Traditional Wood-Fired Roasting" : "220+ Planteurs • Torréfaction au Feu de Bois",
    image: champImg
  },
  {
    id: 2,
    region: isEn ? "Artibonite & Central Plateau" : "Artibonite & Plateau Central",
    title: isEn ? "Wild Tamarind & Polyfloral Honey" : "Tamarinier Sauvage & Miel Polyfloral",
    desc: isEn 
      ? "Sustainable foraging of antioxidant-rich tamarind pods and mountain beekeeper cooperatives providing wild raw honey for our liqueurs and spirits." 
      : "Cueillette durable de gousses de tamarin riches en antioxydants et réseau d'apiculteurs des mornes fournissant le miel sauvage pour nos liqueurs et spiritueux.",
    products: isEn 
      ? ["Cognac Grand Tamar", "Artisanal Mead", "Golden Peanuts for Mamba"] 
      : ["Cognac Grand Tamar", "Hydromel Artisanal", "Arachides Dorées pour Mamba"],
    stats: isEn ? "180+ Certified Beekeepers & Harvesters" : "180+ Apiculteurs & Cueilleurs Certifiés",
    image: marcheFruitsImg
  },
  {
    id: 3,
    region: isEn ? "Grand'Anse & South" : "Grand'Anse & Sud",
    title: isEn ? "Sweet Cassava & Botanical Herbs" : "Manioc Doux & Plantes Aromatiques",
    desc: isEn 
      ? "Traditional cultivation of sweet cassava baked on cast-iron hotplates for golden crispy flatbreads, complemented by indigenous botanical extracts." 
      : "Cultures traditionnelles de manioc doux transformé sur platines en fonte pour des galettes croustillantes, complétées par des extraits botaniques tropicaux.",
    products: isEn 
      ? ["Artisanal Cassava Flatbread", "Pure Cassava Flour", "Mamba Peanut Butter"] 
      : ["Cassave Artisanale Traditionnelle", "Farine de Manioc Pure", "Beurre d'Arachide Mamba"],
    stats: isEn ? "100+ Associated Producer Families" : "100+ Familles Productrices Associées",
    image: souveraineteImg
  }
];

export const getGalleryItems = (isEn: boolean): GalleryItemData[] => [
  {
    id: 1,
    category: "direction",
    categoryLabel: isEn ? "Executive Board" : "Direction Générale",
    role: isEn ? "Chief Executive Officer & Founder" : "Directeur Général & Fondateur",
    title: isEn ? "Executive Leadership & Strategy" : "Direction Générale & Stratégie",
    desc: isEn 
      ? "Strategic leadership of the Caracol agro-industrial complex, international trade partnerships, and economic sovereignty vision." 
      : "Supervision stratégique du complexe agro-industriel de Caracol, partenariats internationaux et vision de la souveraineté économique d'Haïti.",
    loc: isEn ? "Headquarters & EKAM Plant, Caracol" : "Siège & Usine EKAM, Caracol",
    src: directeurGeneralImg,
    tags: isEn ? ["Leadership", "Vision", "Sovereignty"] : ["Direction", "Vision", "Souveraineté"]
  },
  {
    id: 2,
    category: "direction",
    categoryLabel: isEn ? "General Secretariat" : "Secrétariat Général",
    role: isEn ? "General Secretary & Executive Coordinator" : "Secrétaire Générale & Administrative",
    title: isEn ? "Corporate Governance & Institutional Affairs" : "Secrétariat Général & Relations Institutionnelles",
    desc: isEn 
      ? "Administrative governance, board coordination, strict oversight of distributor contracts, and VIP partner relations." 
      : "Gestion administrative, coordination des conseils d'administration, suivi rigoureux des contrats distributeurs et accueil des partenaires.",
    loc: isEn ? "Caracol Industrial Hub, North-East" : "Complexe de Caracol, Nord-Est",
    src: secretaireGeneraleImg,
    tags: isEn ? ["Administration", "Governance", "Coordination"] : ["Administration", "Secrétariat", "Coordination"]
  },
  {
    id: 3,
    category: "production",
    categoryLabel: isEn ? "Plant & Production" : "Production & Usine",
    role: isEn ? "Director of Production EKAM" : "Directeur de Production EKAM",
    title: isEn ? "Oil Extraction & Distillation Lead" : "Direction de Production & Extraction",
    desc: isEn 
      ? "Supervision of stainless-steel castor oil pressing lines, 43% Alc. Cognac Grand Tamar distillation, and strict HACCP compliance." 
      : "Supervision des lignes de pressage inox d'huile de ricin, distillation du Cognac Grand Tamar 43%, contrôle HACCP et respect strict des rendements.",
    loc: isEn ? "EKAM Modern Plant, Caracol" : "Usine Moderne EKAM, Caracol",
    src: directeurProductionImg,
    tags: isEn ? ["Stainless Extraction", "HACCP Standards", "Grand Tamar"] : ["Extraction Inox", "Normes HACCP", "Grand Tamar"]
  },
  {
    id: 4,
    category: "production",
    categoryLabel: isEn ? "Plant & Production" : "Production & Usine",
    role: isEn ? "Plant Technicians & Operators Team" : "Équipe des Techniciens & Opérateurs",
    title: isEn ? "Processing & Bottling Specialists" : "Opérateurs de Transformation & Embouteillage",
    desc: isEn 
      ? "Skilled operators managing 204L export drum calibration, sterile cosmetic bottling, and vacuum-sealed cassava packaging." 
      : "Équipe spécialisée assurant le calibrage des fûts export 204L, l'embouteillage stérile et le conditionnement hermétique des cassaves.",
    loc: isEn ? "EKAM Processing Workshops" : "Ateliers de Transformation EKAM",
    src: techniciensUsineImg,
    tags: isEn ? ["Cold Press", "Bottling", "204L Drums"] : ["Pressage Froid", "Embouteillage", "Fûts 204L"]
  },
  {
    id: 5,
    category: "agronomie",
    categoryLabel: isEn ? "Agronomy & Terroirs" : "Agronomie & Terroirs",
    role: isEn ? "Lead Agronomist & Quality Director" : "Ingénieure Agronome & Responsable Qualité",
    title: isEn ? "Agronomic Guidance & Terroir Monitoring" : "Pôle Agronomie & Contrôle des Terroirs",
    desc: isEn 
      ? "Technical assistance to farming families, selective breeding of castor, neem, and moringa, and chemical-free bio-certification." 
      : "Accompagnement technique des producteurs, sélection des variétés de ricin, neem et moringa, certification sans intrants chimiques.",
    loc: isEn ? "Orchards of Caracol, Grand Bassin & Ouanaminthe" : "Vergers de Caracol, Grand Bassin & Ouanaminthe",
    src: ingenieurAgronomeImg,
    tags: isEn ? ["Agroforestry", "Soil Quality", "Organic Farming"] : ["Agroforesterie", "Qualité Terroirs", "Bio-Protection"]
  },
  {
    id: 6,
    category: "agronomie",
    categoryLabel: isEn ? "Agronomy & Farmers" : "Agronomie & Planteurs",
    role: isEn ? "Partner Farmer Delegates" : "Délégués des Planteurs Partenaires",
    title: isEn ? "Network of 850+ Farming Families" : "Réseau des 850 Familles de Producteurs",
    desc: isEn 
      ? "Representatives of agricultural cooperatives and family farms conducting sustainable manual harvests of castor, tamarind, and cocoa." 
      : "Représentants des coopératives agricoles et planteurs familiaux assurant la récolte manuelle durable du ricin, tamarin et cacao d'ombrage.",
    loc: isEn ? "North, North-East & Artibonite" : "Nord, Nord-Est & Artibonite",
    src: planteursPartenairesImg,
    tags: isEn ? ["850+ Families", "Fair Price", "Farming Dignity"] : ["850+ Familles", "Prix Équitable", "Dignité Paysanne"]
  },
  {
    id: 7,
    category: "operations",
    categoryLabel: isEn ? "Operations & Supply Chain" : "Opérations & Logistique",
    role: isEn ? "Operations & Supply Chain Manager" : "Manager des Opérations & Supply Chain",
    title: isEn ? "Operations Management & Material Flows" : "Manager des Opérations & Gestion des Flux",
    desc: isEn 
      ? "Logistical coordination, fresh raw material inventory control, and supply scheduling toward export hubs and domestic warehouses." 
      : "Planification logistique, gestion des stocks de matières premières fraîches et organisation des flux vers les dépôts et marchés d'export.",
    loc: isEn ? "EKAM Logistics Hub, Caracol" : "Hub Logistique EKAM, Caracol",
    src: managerOperationsImg,
    tags: isEn ? ["Supply Chain", "Material Flows", "Warehousing"] : ["Supply Chain", "Flux Matières", "Entreposage"]
  },
  {
    id: 8,
    category: "operations",
    categoryLabel: isEn ? "Wholesale & Exports" : "Vente en Gros & Export",
    role: isEn ? "Head of Wholesale & Export Sales" : "Responsable Vente en Gros & Export",
    title: isEn ? "Commercial Department & Global Export Relations" : "Pôle Commercial & Relations Export",
    desc: isEn 
      ? "Handling bulk wholesale orders, proforma quotes for maritime containers, and direct relations with supermarket chains and diaspora buyers." 
      : "Traitement des commandes de gros, devis proforma conteneurs maritimes, relations avec les grossistes, supermarchés et la diaspora.",
    loc: isEn ? "Commercial Office, Cap-Haitien & Caracol" : "Bureau Commercial, Cap-Haïtien & Caracol",
    src: responsableVenteExportImg,
    tags: isEn ? ["Wholesale", "Ocean Freight", "Global Distributors"] : ["Vente en Gros", "Export Maritime", "Grossistes"]
  }
];
