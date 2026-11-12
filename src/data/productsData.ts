import { Product, DepartmentOrchard } from '../types';
import ricinFlaconImg from '../assets/images/huile_ricin_flacon_1786847591002.jpg';
import grandTamarFrontImg from '../assets/images/grand_tamar_face_exact_1789970399816.jpg';
import grandTamarBackImg from '../assets/images/grand_tamar_back_exact_1789970411487.jpg';
import cassaveNordBoxImg from '../assets/images/cassave_nord_box_1786934328091.jpg';
import chocolatChaudPanyenImg from '../assets/images/chocolat_chaud_doypack_panyen_1789937953070.jpg';
import vinDeMielImg from '../assets/images/vin_de_miel_bottle_1794516761155.jpg';
import mambaImg from '../assets/images/mamba_panyen_lokal_1787235664496.jpg';
import panyenLokalLogoClean from '../assets/images/LOGO_PANYEN.png';
import panyenLokalOfficialLogo from '../assets/images/LOGO_PANYEN.png';
import recolteRicinImg from '../assets/images/recolte_ricin_moringa_1786859405918.jpg';
import laboratoireImg from '../assets/images/laboratoire_analyse_hplc_1786859417514.jpg';
import champImg from '../assets/images/champ_panyen_lokal_1786858968582.jpg';
import marchandesImg from '../assets/images/marchandes_panyen_1786859017441.jpg';
import marcheFruitsImg from '../assets/images/marche_fruits_terroir_1786859032135.jpg';
import usineExtImg from '../assets/images/usine_exterieur_ekam_1786859382526.jpg';

export {
  ricinFlaconImg,
  grandTamarFrontImg,
  grandTamarBackImg,
  cassaveNordBoxImg,
  chocolatChaudPanyenImg,
  mambaImg,
  recolteRicinImg,
  laboratoireImg,
  champImg,
  marchandesImg,
  marcheFruitsImg,
  usineExtImg,
  panyenLokalLogoClean,
  panyenLokalOfficialLogo
};

export const PRODUCTS_DATA: Product[] = [
  {
    id: "huile-de-ricin",
    title: "Huile de Ricin Pure d'Haïti",
    slug: "huile-de-ricin",
    isFeatured: true,
    category: "Huiles & Soins Naturels",
    badge: "PRODUIT PHARE N°1",
    shortDescription: "Huile de ricin 100% pure et naturelle extraite en Haïti pour soins cosmétiques, capillaires, pharmaceutiques et export B2B.",
    description: "Notre huile de ricin d'exception est extraite au cœur du Nord-Est d'Haïti à partir de graines rigoureusement sélectionnées. Elle est issue d'un procédé semi-industriel et artisanal maîtrisé sans solvants chimiques ni hexane. Exceptionnellement concentrée en acide ricinoléique (>88%), elle stimule intensément la pousse capillaire, régénère l'épiderme et répond aux normes des plus grands laboratoires cosmétiques internationaux.",
    formats: ["2oz (60ml)", "4oz (120ml)", "Galon 128oz (3.78L)"],
    formatsDetail: ["2oz (60ml)", "4oz (120ml)"],
    formatsExport: ["Galon 128oz (3.78L)"],
    image: ricinFlaconImg,
    gallery: [
      ricinFlaconImg,
      recolteRicinImg,
      laboratoireImg,
      champImg
    ],
    inStock: true,
    origin: "Haïti (Terroir Nord-Est / Complexe Industriel de Caracol)",
    terroirLocation: "Plantations & Coopératives du Nord-Est",
    highlights: [
      "100% Pure & Naturelle sans solvants ni dérivés pétrochimiques",
      "Disponibilité immédiate : Bouteille 2oz (250 Gdes), Bouteille 4oz (500 Gdes), Galon 128oz ($70 US)",
      "Teneur en Acide Ricinoléique certifiée en laboratoire > 88.4%",
      "Points de vente et retrait sur place disponibles en Haïti et aux USA"
    ],
    ingredients: [
      "100% Huile de graines pures de Ricinus Communis (Ricin d'Haïti)",
      "Zéro additif, sans conservateur, non coupée"
    ],
    usageInstructions: [
      "Soin capillaire : Appliquer raie par raie sur le cuir chevelu en massage circulaire pendant 10 minutes. Laisser poser en bain d'huile 30 à 60 minutes ou toute la nuit.",
      "Soin des cils et sourcils : Appliquer délicatement au coucher à l'aide d'une brosse propre.",
      "Soin cutané & ongles : Masser les zones très sèches, crevasses, vergetures ou ongles cassants.",
      "Achat direct : Disponible en retrait physique à nos adresses à Caracol (Haïti) et à Lauderhill, Florida (USA)."
    ],
    technicalSpecs: {
      "Acide Ricinoléique": "88.4% - 90.2%",
      "Indice d'acide": "< 1.8 mg KOH/g",
      "Indice de saponification": "176 - 186",
      "Indice d'iode": "82 - 88",
      "Densité (20°C)": "0.958 - 0.968 g/cm³",
      "Procédé d'Extraction": "Mécanique semi-industriel sans hexane",
      "Origine": "Nord-Est, Haïti (Village EKAM, Caracol)"
    },
    formatPricing: {
      "2oz": { format: "Bouteille 2oz (60ml)", priceUSD: 1.90, priceHTG: 250, unit: "Bouteille 2oz (250 Gdes)", type: "retail" },
      "2oz (60ml)": { format: "Bouteille 2oz (60ml)", priceUSD: 1.90, priceHTG: 250, unit: "Bouteille 2oz (250 Gdes)", type: "retail" },
      "4oz": { format: "Bouteille 4oz (120ml)", priceUSD: 3.80, priceHTG: 500, unit: "Bouteille 4oz (500 Gdes)", type: "retail" },
      "4oz (120ml)": { format: "Bouteille 4oz (120ml)", priceUSD: 3.80, priceHTG: 500, unit: "Bouteille 4oz (500 Gdes)", type: "retail" },
      "Galon 128oz": { format: "Galon 128oz (3.78L)", priceUSD: 70.00, priceHTG: 9240, unit: "Galon 128oz ($70 US)", type: "export", moq: 1, weightKg: 3.6 },
      "Galon 128oz (3.78L)": { format: "Galon 128oz (3.78L)", priceUSD: 70.00, priceHTG: 9240, unit: "Galon 128oz ($70 US)", type: "export", moq: 1, weightKg: 3.6 },
      "1 Gallon": { format: "Galon 128oz (3.78L)", priceUSD: 70.00, priceHTG: 9240, unit: "Galon 128oz ($70 US)", type: "export", moq: 1, weightKg: 3.6 },
      "1 Gallon (3.78L)": { format: "Galon 128oz (3.78L)", priceUSD: 70.00, priceHTG: 9240, unit: "Galon 128oz ($70 US)", type: "export", moq: 1, weightKg: 3.6 }
    },
    certifications: ["Certificat de Pureté Laboratoire", "Non-OGM", "Commerce Équitable d'Haïti", "Fiche de Données de Sécurité (FDS/MSDS)"]
  },
  {
    id: "cognac-grand-tamar",
    title: "Grand Tamar Cognac de Prestige",
    slug: "cognac-grand-tamar",
    slogan: "Cognac d'exception fait avec fruit de tamarinier (43% Alc./Vol.)",
    isFeatured: true,
    category: "Boissons & Liqueurs",
    badge: "PRESTIGE COGNAC 43%",
    shortDescription: "Cognac d'exception 750ml, vieilli en fûts de chêne avec fruits de tamarinier sélectionnés à Caracol, Haïti.",
    description: "GRAND TAMAR est un cognac d'exception, issu d'un savoir-faire traditionnel et d'un vieillissement soigneux en fûts de chêne. Ses arômes riches et harmonieux révèlent des notes subtiles de fruits secs, de vanille et d'épices, offrant une expérience gustative profonde et raffinée. Un cognac noble, élaboré avec les fruits de tamarinier pour les connaisseurs les plus exigeants.",
    formats: ["750ml (43% Alc./Vol.)"],
    image: grandTamarFrontImg,
    gallery: [
      grandTamarFrontImg,
      grandTamarBackImg
    ],
    inStock: true,
    origin: "Caracol, Cap-Haïtien, Nord-Est, Haïti",
    terroirLocation: "Vergers de Tamariniers de Caracol & Grand Bassin",
    highlights: [
      "Élaboré avec fruits de tamarinier sélectionnés (43% Alc./Vol.)",
      "Vieillissement soigné en fûts de chêne avec notes subtiles de vanille et fruits secs",
      "Bouteille de prestige 750ml avec armoiries dorées et étui d'apparat",
      "Fabrication officielle Panyen Lokal à Caracol, Haïti"
    ],
    ingredients: [
      "Distillat noble vieilli en fûts de chêne",
      "Pulpe et extrait naturel de fruits de tamarinier (Grand Bassin / Caracol)",
      "Notes subtiles d'épices douces du terroir d'Haïti"
    ],
    usageInstructions: [
      "Dégustation pure : Servir dans un verre ballon à température ambiante (18-20°C).",
      "En digestif de prestige : Savourer lentement pour apprécier la persistance aromatique.",
      "Cadeau d'affaires & Export B2B : Idéal pour les réceptions de prestige et la diaspora."
    ],
    technicalSpecs: {
      "Degré d'alcool": "43% ALC./VOL.",
      "Volume": "750 ml",
      "Bouteille": "Verre lourd de prestige avec bouchon gravé",
      "Vieillissement": "Fûts de chêne sélectionnés",
      "Adresse Producteur": "B6 39H Caracol, Cap-Haïtien, Haïti"
    },
    formatPricing: {
      "750ml": { format: "Bouteille Prestige 750ml", priceUSD: 35.00, priceHTG: 4620, unit: "Bouteille 750ml (43% Alc)", type: "retail" },
      "750ml (43% Alc./Vol.)": { format: "Bouteille Prestige 750ml", priceUSD: 35.00, priceHTG: 4620, unit: "Bouteille 750ml (43% Alc)", type: "retail" },
      "Caisse Export (6 Bouteilles 750ml)": { format: "Caisse Export (6 Bouteilles)", priceUSD: 190.00, priceHTG: 25080, unit: "Caisse renforcée 6 unités", type: "export" }
    },
    certifications: ["Cognac de Prestige Produit d'Haïti", "43% ALC./VOL. Certifié", "Origine Caracol / Cap-Haïtien"]
  },
  {
    id: "tiz-vin-de-miel",
    title: "Tiz Vin de Miel (Hydromel Artisanal)",
    slug: "tiz-vin-de-miel",
    slogan: "L'hydromel noble des mornes haïtiennes",
    isFeatured: true,
    category: "Boissons & Liqueurs",
    badge: "CRÉATION NATURELLE",
    shortDescription: "Vin de miel artisanal et rafraîchissant sublimé par des notes d'orange amère.",
    description: "Une création raffinée associant le miel brut des apiculteurs haïtiens à la subtilité de l'orange amère (bigarade). Cet hydromel d'apéritif délicat, équilibré et parfumé est fermenté et clarifié selon un procédé traditionnel maîtrisé au sein de notre complexe agro-industriel.",
    formats: ["750ml"],
    image: vinDeMielImg,
    inStock: true,
    origin: "Nord-Est & Plateau Central, Haïti",
    terroirLocation: "Réseau d'Apiculteurs Partenaires",
    highlights: [
      "Hydromel d'artisanat 100% miel naturel d'Haïti",
      "Aromatisé à la bigarade sauvage (orange amère locale)",
      "Fermentation lente et clarification naturelle",
      "Texture soyeuse et finale florale très persistante"
    ],
    ingredients: [
      "Miel brut polyfloral haïtien",
      "Eau de source purifiée",
      "Jus et macération d'oranges amères (bigarade)",
      "Levures nobles de fermentation"
    ],
    usageInstructions: [
      "Apéritif : Servir très frais entre 6°C et 8°C.",
      "Accords mets & vins : Idéal avec du fromage frais, des toasts de cassave ou des fruits exotiques."
    ],
    technicalSpecs: {
      "Degré d'alcool": "12.5% Vol.",
      "Volume": "750 ml",
      "Sucres résiduels": "Moelleux équilibré",
      "Fermentation": "Cuves thermo-régulées"
    },
    formatPricing: {
      "750ml": { format: "Bouteille 750ml", priceUSD: 10.00, priceHTG: 1320, unit: "Bouteille 750ml", type: "retail" },
      "Bouteille 750ml": { format: "Bouteille 750ml", priceUSD: 10.00, priceHTG: 1320, unit: "Bouteille 750ml", type: "retail" },
      "Caisse Export (6 Bouteilles 750ml)": { format: "Caisse Export (6 Bouteilles)", priceUSD: 55.00, priceHTG: 7260, unit: "Caisse renforcée 6 unités", type: "export" }
    },
    certifications: ["Apiculture Durable", "Sans sulfites excessifs", "Terroir Haïtien Certifié"]
  },
  {
    id: "chocolat-artisanal",
    title: "Chocolat Artisanal en Tablette d'Haïti",
    slug: "chocolat-artisanal",
    slogan: "100% Naturel • Tablette Traditionnelle de Pur Cacao d'Haïti (150 HTG)",
    isFeatured: true,
    category: "Épicerie & Alimentaire",
    badge: "TABLETTE 100% CACAO",
    shortDescription: "Chocolat traditionnel d'Haïti en forme de tablette artisanale (Tablèt Chokola Peyi), 100% pur cacao naturel (150 HTG).",
    description: "Le Chocolat Artisanal en Tablette Panyen Lokal est confectionné selon la pure tradition séculaire du terroir haïtien. Présenté sous forme de tablette artisanale (Tablèt Chokola Peyi), il est élaboré à partir de fèves de cacao sélectionnées, torréfiées au feu de bois et moulues sans conservateur ni additif artificiel. Il offre une saveur corsée incomparable et le goût authentique du chocolat chaud traditionnel des mornes.",
    formats: ["Tablette (Cacao Pur)", "Paquet 3 Tablettes"],
    formatsDetail: ["Tablette (Cacao Pur)", "Paquet 3 Tablettes"],
    formatsExport: ["Carton Export (24 Tablettes)"],
    image: chocolatChaudPanyenImg,
    gallery: [
      chocolatChaudPanyenImg
    ],
    inStock: true,
    origin: "Nord & Grand'Anse, Haïti (Conditionné à Caracol)",
    terroirLocation: "Cacaoyères d'Ombrage du Grand Nord & Village EKAM",
    highlights: [
      "100% Naturel • Fabriqué en Haïti en forme de tablette traditionnelle",
      "Prix accessible terroir : 150 HTG la tablette de pur chocolat",
      "Fèves de cacao haïtiennes pures sans lécithine ni arômes artificiels",
      "Idéal pour préparer le véritable chocolat chaud créole traditionnel"
    ],
    ingredients: [
      "100% Pâte et pur beurre de fèves de cacao d'Haïti",
      "Épices douces traditionnelles (cannelle des mornes, muscade)",
      "Essence naturelle d'anis étoilé et touche de vanille des îles"
    ],
    usageInstructions: [
      "Chocolat chaud traditionnel : Râper ou émietter une demi-tablette dans 250ml d'eau ou de lait chaud avec une pincée de sel.",
      "Laisser frémir 3 à 5 minutes à feu doux en remuant jusqu'à consistance onctueuse et mousseuse.",
      "Servir bien chaud accompagné de cassaves traditionnelles ou de toasts au beurre d'arachide."
    ],
    technicalSpecs: {
      "Format": "Tablette artisanale traditionnelle (Tablèt Chokola)",
      "Poids Net": "Tablette individuelle pur cacao",
      "Origine": "100% Haïti (Caracol, Nord-Est)",
      "Conservation": "24 mois au sec et à l'abri de la chaleur"
    },
    formatPricing: {
      "Tablette": { format: "Tablette Traditionnelle (Pur Cacao)", priceUSD: 1.15, priceHTG: 150, unit: "Tablette artisanale pur cacao", type: "retail" },
      "Tablette (Cacao Pur)": { format: "Tablette Traditionnelle (Pur Cacao)", priceUSD: 1.15, priceHTG: 150, unit: "Tablette artisanale pur cacao", type: "retail" },
      "Paquet 3 Tablettes": { format: "Paquet Découverte (3 Tablettes)", priceUSD: 3.40, priceHTG: 450, unit: "Paquet 3 tablettes", type: "retail" },
      "Pack 3 Tablettes": { format: "Paquet Découverte (3 Tablettes)", priceUSD: 3.40, priceHTG: 450, unit: "Paquet 3 tablettes", type: "retail" },
      "Carton Export (24 Tablettes)": { format: "Carton Export (24 Tablettes)", priceUSD: 25.00, priceHTG: 3300, unit: "Carton renforcé 24 tablettes", type: "export", moq: 1, weightKg: 3.2 }
    },
    certifications: ["100% Naturel • Fabriqué en Haïti", "Cacao Agroforestier Équitable", "Qualité Agroalimentaire Certifiée"]
  },
];

export const HAITI_DEPARTMENTS_ORCHARDS: DepartmentOrchard[] = [
  {
    id: "nord-est",
    name: "Nord-Est",
    capital: "Fort-Liberté / Caracol",
    hectares: 480,
    producersCount: 320,
    keyCrops: ["Ricin", "Tamarin", "Manioc doux", "Canne à sucre"],
    altitude: "10m - 350m",
    soilType: "Alluvionnaire & limono-argileux fertile",
    description: "Cœur opérationnel de PANYEN LOKAL abritant notre usine de transformation agro-industrielle au Village EKAM (Caracol) ainsi que nos vergers pilotes de Grand Bassin et Ouanaminthe.",
    coordinates: { x: 74, y: 22 }
  },
  {
    id: "nord",
    name: "Nord",
    capital: "Cap-Haïtien",
    hectares: 310,
    producersCount: 195,
    keyCrops: ["Cacao Criollo", "Bigarade (Orange amère)", "Manioc", "Canne à sucre"],
    altitude: "50m - 650m",
    soilType: "Sols volcaniques riches d'ombrage forestier",
    description: "Bassin historique du cacao de haute qualité pour notre Chocolat Artisanal et vergers d'agrumes sauvages pour l'aromatisation de notre hydromel Tiz Vin de Miel.",
    coordinates: { x: 60, y: 19 }
  },
  {
    id: "artibonite",
    name: "Artibonite",
    capital: "Gonaïves / Saint-Marc",
    hectares: 240,
    producersCount: 140,
    keyCrops: ["Ricin sauvage", "Sel marin", "Manioc"],
    altitude: "20m - 200m",
    soilType: "Sols alluviaux chauds et ensoleillés",
    description: "Bassin d'approvisionnement agricole fournissant le sel marin purifié et des récoltes de ricin adaptées au climat aride.",
    coordinates: { x: 48, y: 42 }
  },
  {
    id: "centre",
    name: "Centre (Plateau Central)",
    capital: "Hinche",
    hectares: 290,
    producersCount: 165,
    keyCrops: ["Apiculture (Miel brut)", "Ricin", "Canne à sucre pour Clairin"],
    altitude: "250m - 800m",
    soilType: "Plateaux calcaires et flore sauvage mellifère",
    description: "Territoire d'excellence apicole fournissant le miel sauvage de fleurs tropicales qui donne son parfum noble au Cognac Grand Tamar et au Tiz Vin de Miel.",
    coordinates: { x: 67, y: 48 }
  },
  {
    id: "sud",
    name: "Sud",
    capital: "Les Cayes",
    hectares: 180,
    producersCount: 95,
    keyCrops: ["Vétiver", "Plantes aromatiques", "Miel", "Canne à sucre"],
    altitude: "5m - 500m",
    soilType: "Sols côtiers tropicaux humides",
    description: "Région fertile apportant des extraits botaniques uniques et une grande biodiversité pour nos formulations dermo-cosmétiques naturelles.",
    coordinates: { x: 22, y: 78 }
  },
  {
    id: "ouest",
    name: "Ouest",
    capital: "Port-au-Prince / Léogâne",
    hectares: 150,
    producersCount: 85,
    keyCrops: ["Canne à sucre", "Mangues francisque", "Agrumes"],
    altitude: "10m - 400m",
    soilType: "Plaines côtières et piémonts",
    description: "Plaque tournante logistique reliant nos coopératives aux infrastructures d'exportation maritime et aux réseaux de distribution nationaux.",
    coordinates: { x: 55, y: 64 }
  }
];

export const COMPANY_INFO = {
  name: "PANYEN LOKAL",
  tagline: "Agro-industrie durable & Trésors naturels d'Haïti",
  legalForm: "Entreprise Agro-Industrielle (Haïti: PANYEN LOKAL S.A. • USA: PANYEN LOKAL INC)",
  address: "B6-39, Village Ekam, Caracol, Haïti",
  addressHaiti: "B6-39, Village Ekam, Caracol, Haïti",
  addressUSA: "7400 W Oakland Park Blvd, Unit 1125, Lauderhill, Florida 33319",
  phoneUSA: "781-469-8708",
  phoneHaiti: "+509 3834-6371 / +509 3559-3385",
  email: "panyenlokalsa@gmail.com",
  salesEmail: "panyenlokalsa@gmail.com",
  exportEmail: "panyenlokalsa@gmail.com",
  phone: "+509 3834-6371 / +509 3559-3385 • USA: 781-469-8708",
  whatsapp: "+50938346371",
  website: "www.panyenlokal.com",
  producersNetwork: 850,
  departmentsCount: 6,
  hectaresManaged: 1650,
  establishedYear: 2018,
  ricinPurityStandard: "99.8% Pureté Naturelle | Acide Ricinoléique > 88%",
  ports: ["Port International du Cap-Haïtien", "Port International de Port-au-Prince"],
  certifications: [
    "Certificat Phytosanitaire Officiel",
    "Agrément Ministère de l'Agriculture d'Haïti (MARNDR)",
    "Contrôle Qualité & Analyses de Pureté HPLC",
    "Normes Export Internationales & Fiches de Sécurité (MSDS)"
  ]
};
