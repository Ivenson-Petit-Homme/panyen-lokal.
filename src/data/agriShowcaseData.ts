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
import grandTamarFrontImg from '../assets/images/grand_tamar_face_exact_1789970399816.jpg';
import cassaveNordBoxImg from '../assets/images/cassave_nord_box_1786934328091.jpg';
import chocolatChaudPanyenImg from '../assets/images/chocolat_chaud_doypack_panyen_1789937953070.jpg';
import vinDeMielImg from '../assets/images/vin_de_miel_bottle_1794516761155.jpg';
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
    badge: isEn ? "01" : "01",
    title: isEn ? "Sustainable Rural Livelihoods" : "Dignité Paysanne & Emplois Durables",
    lead: isEn 
      ? "Guaranteed multi-year contracts securing stable household revenues across rural communities." 
      : "Des contrats d'achat garantis offrant des revenus stables aux familles agricoles partenaires.",
    image: marchandesImg,
    details: isEn ? [
      "Pre-harvest fair pricing agreements protecting planters against market volatility.",
      "Direct field agronomy support to boost organic yields sustainably.",
      "Long-term rural anchoring curbing youth migration from agricultural basins."
    ] : [
      "Accords tarifaires rémunérateurs fixés avant la saison des récoltes.",
      "Accompagnement technique sur le terrain sans recours aux intrants chimiques.",
      "Stabilisation économique durable des zones rurales."
    ],
    tag: isEn ? "Social Impact" : "Impact Social"
  },
  {
    id: "transformation",
    icon: Factory,
    badge: isEn ? "02" : "02",
    title: isEn ? "Domestic Industrial Processing" : "Transformation Industrielle Locale",
    lead: isEn 
      ? "Ending raw commodity exports by capturing full added value inside modern facilities." 
      : "Capturer l'ensemble de la chaîne de valeur grâce à nos équipements en acier inoxydable.",
    image: complexeImg,
    details: isEn ? [
      "Cold mechanical extraction free from petrochemical solvents or hexane.",
      "Food-grade filtration, controlled aging, and hygienic packaging lines.",
      "Training specialized technicians, machine operators, and quality analysts."
    ] : [
      "Extraction mécanique à froid sans solvants pétrochimiques ni hexane.",
      "Filtration alimentaire, vieillissement contrôlé et lignes de conditionnement.",
      "Formation de techniciens spécialisés et d'opérateurs qualifiés."
    ],
    tag: isEn ? "Industrial Rigor" : "Rigueur Industrielle"
  },
  {
    id: "souverainete",
    icon: ShieldCheck,
    badge: isEn ? "03" : "03",
    title: isEn ? "Food & Botanical Sovereignty" : "Souveraineté & Terroir National",
    lead: isEn 
      ? "Replacing imported substitutes with traceable, pure harvests from Haitian soil." 
      : "Substituer les importations par des ressources pures, traçables et certifiées.",
    image: marcheFruitsImg,
    details: isEn ? [
      "Rigorous botanical selection across tropical orchards and mountain apiaries.",
      "Zero artificial preservatives across cosmetic and culinary ranges.",
      "Strengthening domestic supply resilience and foreign exchange savings."
    ] : [
      "Sélection botanique rigoureuse au cœur des vergers et ruchers tropicaux.",
      "Zéro conservateur ni additif artificiel sur l'ensemble des gammes.",
      "Contribution directe à l'autonomie économique nationale."
    ],
    tag: isEn ? "Traceability" : "Traçabilité"
  },
  {
    id: "exportation",
    icon: Globe2,
    badge: isEn ? "04" : "04",
    title: isEn ? "International B2B Logistics" : "Rayonnement & Exportation B2B",
    lead: isEn 
      ? "Connecting regional craftsmanship to global cosmetic, gourmet, and wholesale buyers." 
      : "Connecter le savoir-faire national aux marchés exigeants d'Amérique et d'Europe.",
    image: portExportImg,
    details: isEn ? [
      "Compliance with laboratory HPLC testing, MSDS documentation, and origin certificates.",
      "Structured ocean freight channels serving North America and the Caribbean.",
      "Flexible fulfillment from retail units to sealed 204L industrial drums."
    ] : [
      "Conformité aux standards de laboratoire (HPLC, fiches FDS et certificats d'origine).",
      "Corridors logistiques maritimes vers l'Amérique du Nord et les Caraïbes.",
      "Capacité de livraison du détail aux conteneurs professionnels."
    ],
    tag: isEn ? "Global Trade" : "Commerce International"
  }
];

export const getServicesList = (isEn: boolean): ServiceData[] => [
  {
    id: "service-extraction",
    icon: Droplets,
    title: isEn ? "Mechanical Oil Pressing (100 Gal/Day)" : "Pressage Mécanique (100 Gallons/Jour)",
    desc: isEn 
      ? "Cold-press extraction at our Morne-à-Casse plant producing up to 100 gallons of pure castor oil per day without chemical solvents." 
      : "Extraction mécanique à froid dans notre usine de Morne-à-Casse avec une capacité de 100 gallons d'huile de ricin par jour sans solvants.",
    badge: isEn ? "Industrial Capacity" : "Capacité Industrielle",
    image: complexeImg,
    details: isEn ? "100 gallons / day capacity • Stainless steel 316L filtration" : "Capacité : 100 gallons / jour • Filtration fine inox 316L"
  },
  {
    id: "service-agregation",
    icon: Sprout,
    title: isEn ? "Agricultural Aggregation & Sourcing" : "Agrégation & Collecte Agricole Sécurisée",
    desc: isEn 
      ? "Direct purchasing, quality grading, and harvest aggregation from our 100-hectare plantation and industrial plant in Morne-à-Casse, Fort-Liberté (Nord-Est)." 
      : "Achat direct, contrôle qualité et collecte des récoltes sur notre plantation de 100 hectares et notre unité industrielle à Morne-à-Casse, Fort-Liberté (Nord-Est).",
    badge: isEn ? "Supply Chain" : "Approvisionnement",
    image: recolteImg,
    details: isEn ? "Morne-à-Casse (100 ha) • Bureau at Caracol" : "Morne-à-Casse (100 ha) • Bureau à Caracol"
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
    category: isEn ? 'Beekeeping & Terroir Wines' : 'Élevage Apicole & Vins de Terroir',
    desc: isEn 
      ? 'Refined honey wine fermented directly from pure honey (siwo myèl) harvested at our own apiaries.' 
      : 'Hydromel raffiné élaboré à base de notre siwo myèl pur issu de notre élevage d’abeilles, avec notes de bigarade.',
    image: vinDeMielImg,
    icon: Sparkles,
    badge: isEn ? 'Pure Honey Base' : 'Base Siwo Myèl Pur'
  },
  {
    id: 'chocolat-artisanal',
    title: isEn ? 'Artisanal Chocolate Bar' : 'Chocolat en Tablette Artisanal',
    category: isEn ? 'Gastronomy & Criollo Cocoa' : 'Gastronomie & Cacao Criollo',
    desc: isEn 
      ? '100% pure natural Haitian cocoa tablet crafted according to Creole tradition (150 HTG).' 
      : 'Tablette de pur cacao 100% naturel d\'Haïti (Tablèt Chokola Peyi) préparée selon la tradition (150 HTG).',
    image: chocolatChaudPanyenImg,
    icon: Heart,
    badge: isEn ? '100% Cocoa Bar (150 HTG)' : 'Tablette Pur Cacao (150 HTG)'
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
    title: isEn ? "Processing at Morne-à-Casse (Fort-Liberté)" : "Transformation à Morne-à-Casse (Fort-Liberté)",
    desc: isEn 
      ? "Cold mechanical pressing and purification at our Morne-à-Casse industrial plant using 316L stainless equipment." 
      : "Pressage mécanique à froid et transformation dans notre usine de Morne-à-Casse sur équipements en inox 316L.",
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
    region: isEn ? "Nord-Est (Morne-à-Casse, Fort-Liberté · Office: Caracol)" : "Nord-Est (Morne-à-Casse, Fort-Liberté · Bureau : Caracol)",
    title: isEn ? "100 Hectares · Plantation & Industrial Plant" : "100 Hectares · Plantation & Industrie",
    desc: isEn 
      ? "Our 100-hectare plantation and industrial plant in Morne-à-Casse (Fort-Liberté) are building Haiti's largest castor plantation alongside tamarind, corn, black beans, okra, cacao, and coffee, supported by our office at Village Ekam in Caracol." 
      : "Notre plantation de 100 hectares et notre unité industrielle à Morne-à-Casse (Fort-Liberté) développent la plus grande plantation de ricin d'Haïti avec tamarin, maïs, pois noir, gombo, cacao et café, appuyées par notre bureau au Village Ekam à Caracol.",
    products: isEn 
      ? ["Pure Haitian Castor Oil", "Bulk Export Castor (204L Drums)", "Extra Virgin Castor Oil"] 
      : ["Huile de Ricin Pure", "Ricin Vrac Export (Fûts 204L)", "Huile de Ricin Première Pression"],
    stats: isEn ? "100 Ha Plantation & Plant: Morne-à-Casse • Office: Caracol" : "Plantation & Usine : Morne-à-Casse • Bureau : Caracol",
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
      ? ["Hot Chocolate 100% Natural", "Tiz Vin de Miel Mead", "Traceable Fermented Beans"] 
      : ["Chocolat Chaud 100% Naturel", "Hydromel Tiz Vin de Miel", "Fèves Fermentées Traçables"],
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
      ? ["Cognac Grand Tamar", "Artisanal Mead", "Pure Honey Reserve"] 
      : ["Cognac Grand Tamar", "Hydromel Artisanal", "Réserve de Miel Pur"],
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
      ? ["Artisanal Cassava Flatbread", "Pure Cassava Flour", "Traditional Cassava Box"] 
      : ["Cassave Artisanale Traditionnelle", "Farine de Manioc Pure", "Étui Cassave Traditionnelle"],
    stats: isEn ? "100+ Associated Producer Families" : "100+ Familles Productrices Associées",
    image: souveraineteImg
  }
];

export const getGalleryItems = (isEn: boolean): GalleryItemData[] => [
  {
    id: 1,
    category: "direction",
    categoryLabel: isEn ? "Executive Board" : "Direction Générale",
    role: isEn ? "Chief Executive Officer" : "Directeur Général",
    title: isEn ? "Strategic Governance & Vision" : "Gouvernance & Stratégie",
    desc: isEn 
      ? "Steering institutional growth, international trade alliances, and long-term industrial investments." 
      : "Pilotage stratégique du développement industriel et des alliances commerciales internationales.",
    loc: isEn ? "Headquarters" : "Direction Centrale",
    src: directeurGeneralImg,
    tags: isEn ? ["Leadership", "Strategy"] : ["Direction", "Stratégie"]
  },
  {
    id: 2,
    category: "direction",
    categoryLabel: isEn ? "Administration" : "Secrétariat Général",
    role: isEn ? "General Secretary" : "Secrétaire Générale",
    title: isEn ? "Institutional Affairs & Contracts" : "Affaires Institutionnelles",
    desc: isEn 
      ? "Board coordination, regulatory compliance, and oversight of partner distributor agreements." 
      : "Coordination administrative, conformité réglementaire et suivi des accords partenaires.",
    loc: isEn ? "North-East Hub" : "Pôle Nord-Est",
    src: secretaireGeneraleImg,
    tags: isEn ? ["Governance", "Compliance"] : ["Gouvernance", "Conformité"]
  },
  {
    id: 3,
    category: "production",
    categoryLabel: isEn ? "Manufacturing" : "Production",
    role: isEn ? "Director of Production" : "Directeur de Production",
    title: isEn ? "Extraction & Distillation Lead" : "Extraction & Distillation",
    desc: isEn 
      ? "Supervision of mechanical cold-press lines, oak-barrel aging, and strict HACCP hygiene standards." 
      : "Supervision des lignes de pressage à froid, du vieillissement en fût et des normes HACCP.",
    loc: isEn ? "Processing Plant" : "Unité de Transformation",
    src: directeurProductionImg,
    tags: isEn ? ["HACCP", "Quality Control"] : ["HACCP", "Contrôle Qualité"]
  },
  {
    id: 4,
    category: "production",
    categoryLabel: isEn ? "Manufacturing" : "Production",
    role: isEn ? "Workshop Specialists" : "Techniciens d'Usine",
    title: isEn ? "Bottling & Sterile Packaging" : "Conditionnement & Embouteillage",
    desc: isEn 
      ? "Precision calibration of retail glass flacons and sealed bulk drums for maritime shipping." 
      : "Calibrage de précision des flacons au détail et des fûts scellés destinés à l'export.",
    loc: isEn ? "Packaging Line" : "Atelier Conditionnement",
    src: techniciensUsineImg,
    tags: isEn ? ["Bottling", "Calibration"] : ["Embouteillage", "Calibrage"]
  },
  {
    id: 5,
    category: "agronomie",
    categoryLabel: isEn ? "Agronomy" : "Agronomie",
    role: isEn ? "Lead Agronomist" : "Ingénieure Agronome",
    title: isEn ? "Soil Health & Organic Selection" : "Agronomie & Sélection Terroir",
    desc: isEn 
      ? "Field technical guidance, botanical variety selection, and chemical-free soil stewardship." 
      : "Encadrement technique sur parcelle, sélection botanique et préservation organique des sols.",
    loc: isEn ? "Northern Orchards" : "Bassins du Nord",
    src: ingenieurAgronomeImg,
    tags: isEn ? ["Agroforestry", "Botany"] : ["Agroforesterie", "Botanique"]
  },
  {
    id: 6,
    category: "agronomie",
    categoryLabel: isEn ? "Cooperatives" : "Coopératives",
    role: isEn ? "Planter Delegates" : "Délégués des Planteurs",
    title: isEn ? "Agricultural Partner Network" : "Réseau des Coopératives",
    desc: isEn 
      ? "Cooperative representatives coordinating seasonal hand-harvests across family farms." 
      : "Représentants des coopératives assurant les récoltes manuelles à maturité optimale.",
    loc: isEn ? "Rural Collectives" : "Zones Rurales",
    src: planteursPartenairesImg,
    tags: isEn ? ["Fair Trade", "Harvest"] : ["Équitable", "Récoltes"]
  },
  {
    id: 7,
    category: "operations",
    categoryLabel: isEn ? "Logistics" : "Logistique",
    role: isEn ? "Operations Manager" : "Manager des Opérations",
    title: isEn ? "Supply Chain & Warehousing" : "Gestion des Flux & Stocks",
    desc: isEn 
      ? "Raw material intake planning, inventory traceability, and outbound dispatch coordination." 
      : "Planification des approvisionnements, traçabilité des lots et gestion des expéditions.",
    loc: isEn ? "Logistics Center" : "Centre Logistique",
    src: managerOperationsImg,
    tags: isEn ? ["Supply Chain", "Dispatch"] : ["Supply Chain", "Traçabilité"]
  },
  {
    id: 8,
    category: "operations",
    categoryLabel: isEn ? "Commercial" : "Commercial",
    role: isEn ? "Head of Export Sales" : "Responsable Commercial & Export",
    title: isEn ? "Global Wholesale Relations" : "Relations Grossistes & Export",
    desc: isEn 
      ? "Proforma quotes, container logistics, and partnerships with international distributors." 
      : "Élaboration des devis proforma et partenariats avec les distributeurs internationaux.",
    loc: isEn ? "Commercial Desk" : "Bureau Commercial",
    src: responsableVenteExportImg,
    tags: isEn ? ["Wholesale", "Freight"] : ["Vente en Gros", "Fret"]
  }
];
