import { Product, DepartmentOrchard } from '../types';
import ricinFlaconImg from '../assets/images/huile_ricin_flacon_1786847591002.jpg';
import grandTamarFrontImg from '../assets/images/grand_tamar_front_1786934308034.jpg';
import grandTamarBackImg from '../assets/images/grand_tamar_back_1786934317488.jpg';
import grandTamarFlyerImg from '../assets/images/grand_tamar_flyer_1786934339335.jpg';
import cassaveNordBoxImg from '../assets/images/cassave_nord_box_1786934328091.jpg';
import panyenLokalLogoClean from '../assets/images/LOGO_PANYEN.png';
import panyenLokalOfficialLogo from '../assets/images/LOGO_PANYEN.png';
import recolteRicinImg from '../assets/images/recolte_ricin_moringa_1786859405918.jpg';
import laboratoireImg from '../assets/images/laboratoire_analyse_hplc_1786859417514.jpg';
import champImg from '../assets/images/champ_panyen_lokal_1786858968582.jpg';
import marchandesImg from '../assets/images/marchandes_panyen_1786859017441.jpg';
import marcheFruitsImg from '../assets/images/marche_fruits_terroir_1786859032135.jpg';
import mambaImg from '../assets/images/mamba_panyen_lokal_1787235664496.jpg';

export {
  ricinFlaconImg,
  grandTamarFrontImg,
  grandTamarBackImg,
  grandTamarFlyerImg,
  cassaveNordBoxImg,
  panyenLokalLogoClean,
  panyenLokalOfficialLogo,
  mambaImg
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
    formatsDetail: ["2oz (60ml)", "4oz (120ml)", "250ml", "500ml", "1 Litre"],
    formatsExport: ["1 Gallon (3.78L)", "Baril Export 54 Gallons (204L)"],
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
      "Teneur en Acide Ricinoléique certifiée en laboratoire > 88.4%",
      "Pressage mécanique et extraction respectueuse des principes actifs",
      "Conditionnements détail & fûts industriels scellés pour l'exportation mondiale"
    ],
    ingredients: [
      "100% Huile de graines pures de Ricinus Communis (Ricin d'Haïti)",
      "Zéro additif, sans conservateur, non coupée"
    ],
    usageInstructions: [
      "Soin capillaire : Appliquer raie par raie sur le cuir chevelu en massage circulaire pendant 10 minutes. Laisser poser en bain d'huile 30 à 60 minutes ou toute la nuit.",
      "Soin des cils et sourcils : Appliquer délicatement au coucher à l'aide d'une brosse propre.",
      "Soin cutané & ongles : Masser les zones très sèches, crevasses, vergetures ou ongles cassants.",
      "Formulations industrielles : Matière première de premier choix pour savons surgras, baumes et soins cosmétiques."
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
      "2oz": { format: "2oz (60ml)", priceUSD: 5.50, priceHTG: 725, unit: "Flacon verre ambré 60ml", type: "retail" },
      "4oz": { format: "4oz (120ml)", priceUSD: 9.00, priceHTG: 1190, unit: "Flacon verre ambré 120ml", type: "retail" },
      "250ml": { format: "250ml", priceUSD: 16.50, priceHTG: 2180, unit: "Bouteille aluminium/verre 250ml", type: "retail" },
      "500ml": { format: "500ml", priceUSD: 29.00, priceHTG: 3830, unit: "Bouteille 500ml", type: "retail" },
      "1L": { format: "1 Litre", priceUSD: 48.00, priceHTG: 6340, unit: "Bidon professionnel 1L", type: "retail" },
      "1 Gallon": { format: "1 Gallon (3.78L)", priceUSD: 145.00, priceHTG: 19140, unit: "Cruche renforcée 3.78L", type: "export", moq: 2, weightKg: 3.6 },
      "Baril Export 54 Gallons": { format: "Baril Export 54 Gal (204L)", priceUSD: 2450.00, priceHTG: 323400, unit: "Fût métallique scellé 204L", type: "export", moq: 1, weightKg: 195 }
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
      grandTamarBackImg,
      grandTamarFlyerImg
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
      "750ml": { format: "Bouteille Prestige 750ml", priceUSD: 34.00, priceHTG: 4490, unit: "Bouteille 750ml (43% Alc)", type: "retail" }
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
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
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
      "750ml": { format: "Bouteille 750ml", priceUSD: 19.50, priceHTG: 2570, unit: "Bouteille 750ml", type: "retail" }
    },
    certifications: ["Apiculture Durable", "Sans sulfites excessifs", "Terroir Haïtien Certifié"]
  },
  {
    id: "chocolat-artisanal",
    title: "Chocolat Artisanal Pur Cacao 100% Naturel",
    slug: "chocolat-artisanal",
    isFeatured: true,
    category: "Épicerie & Alimentaire",
    badge: "NOUVEAUTÉ TERROIR",
    shortDescription: "Chocolat traditionnel pur cacao haïtien torréfié au feu de bois sans additifs.",
    description: "Fabriqué à partir des meilleures fèves de cacao Criollo et Trinitario du Grand Nord d'Haïti, fermentées avec soin et torréfiées au feu de bois. Sans aucun additif artificiel, il préserve l'intensité brute des arômes chocolatés, épicés et fruités de notre terroir.",
    formats: ["Paquet de 5 boules traditionnelles", "Tablette 100g"],
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    origin: "Nord & Grand'Anse, Haïti",
    terroirLocation: "Cacaoyères d'Ombrage Acul-du-Nord & Dame-Marie",
    highlights: [
      "Fèves de cacao 100% haïtiennes issues de forêts agroforestières",
      "Torréfaction artisanale au feu de bois",
      "Zéro lécithine, zéro huile de palme",
      "Notes aromatiques intenses de cannelle, muscade et vanille"
    ],
    ingredients: [
      "Pâte pure de fèves de cacao torréfiées 100%",
      "Épices douces traditionnelles (muscade, cannelle sauvage)"
    ],
    usageInstructions: [
      "Chocolat chaud traditionnel : Râper 1 boule ou 30g de chocolat dans 250ml de lait (ou lait de coco), chauffer à feu doux en fouettant avec un bâton de cannelle, zeste de citron vert et sucre de canne brut."
    ],
    technicalSpecs: {
      "Cacao": "100% Pur Cacao Criollo & Trinitario",
      "Formats": "Boules traditionnelles façonnées à la main / Tablette moulée 100g",
      "Conservation": "18 mois dans un endroit sec et tempéré"
    },
    formatPricing: {
      "Paquet de 5 boules": { format: "Paquet de 5 boules (approx 350g)", priceUSD: 8.50, priceHTG: 1120, unit: "Sachet kraft hermétique", type: "retail" },
      "Tablette 100g": { format: "Tablette 100g", priceUSD: 4.50, priceHTG: 590, unit: "Étui recyclable", type: "retail" }
    },
    certifications: ["Cacao Agroforestier Équitable", "100% Végétal & Naturel"]
  },
  {
    id: "cassave-artisanal",
    title: "Cassave Artisanale du Nord d'Haïti",
    slug: "cassave-artisanal",
    slogan: "Cassave traditionnelle conditionnée en étui protecteur (Sucre & Sel / Cannelle / Gingembre)",
    isFeatured: true,
    category: "Épicerie & Alimentaire",
    badge: "PATRIMOINE GASTRONOMIQUE",
    shortDescription: "Galettes de cassave artisanales 20x7x30cm au manioc doux, cannelle, gingembre, noix de coco et roroli.",
    description: "La Cassave Nord d'Haïti de Panyen Lokal est issue de la pure tradition séculaire du Grand Nord. Élaborée à partir de farine de manioc doux rigoureusement tamisée, de cannelle, gingembre, noix de coco et roroli, elle est cuite sur platines traditionnelles pour une texture croustillante et légère. Présentée dans son emballage cartonné protecteur aux normes agroalimentaires modernes.",
    formats: ["Boîte Étui 20x7x30cm (Sucre/Sel)", "Pack Export 6 Boîtes"],
    image: cassaveNordBoxImg,
    gallery: [
      cassaveNordBoxImg,
      marchandesImg,
      marcheFruitsImg
    ],
    inStock: true,
    origin: "Caracol, Cap-Haïtien, Nord-Est, Haïti",
    terroirLocation: "Plantations de Manioc de Caracol & Quartier-Morin",
    highlights: [
      "Manioc doux naturel sans conservateurs chimiques",
      "Format étui boîte 20x7x30cm protecteur anti-casse",
      "Ingrédients : Farine de manioc, cannelle, gingembre, noix de coco, roroli",
      "Naturellement sans gluten, riche en fibres et minéraux"
    ],
    ingredients: [
      "Farine de manioc (Cassava flour)",
      "Sucre de canne ou Sel marin",
      "Cannelle (Cinnamon)",
      "Gingembre (Ginger)",
      "Noix de coco (Coconut)",
      "Roroli / Sésame"
    ],
    usageInstructions: [
      "À déguster au petit-déjeuner ou au goûter avec du chocolat chaud ou du café.",
      "Idéale tartinée de mamba (beurre d'arachide haïtien) ou d'avocat.",
      "Conserver dans son étui protecteur au sec."
    ],
    technicalSpecs: {
      "Dimensions Étui": "20 x 7 x 30 cm",
      "Cuisson": "Platines traditionnelles au feu de bois",
      "Allergènes": "Sans gluten",
      "Calories": "193 kcal / 100g",
      "Adresse Fabricant": "B6 39H Caracol, Cap-Haïtien, Haïti"
    },
    formatPricing: {
      "Boîte Étui": { format: "Boîte Étui Protecteur 20x7x30cm", priceUSD: 6.50, priceHTG: 850, unit: "Étui cartonné protecteur", type: "retail" },
      "Pack Export": { format: "Pack Export Carton (6 Boîtes)", priceUSD: 36.00, priceHTG: 4750, unit: "Carton renforcé 6 étuis", type: "export", moq: 1, weightKg: 2.2 }
    },
    certifications: ["Patrimoine Gastronomique Haïtien", "100% Sans Gluten Naturel", "Norme Emballage Alimentaire"]
  },
  {
    id: "huile-de-moringa",
    title: "Huile de Moringa Pure & Poudre Bio",
    slug: "huile-de-moringa",
    isFeatured: false,
    category: "Huiles & Soins Naturels",
    badge: "SUPER-ALIMENT",
    shortDescription: "Huile de graines de Moringa d'Haïti et poudre de feuilles séchées sous abri.",
    description: "Extraite par première pression mécanique des graines de Moringa cultivées dans les plaines ensoleillées du Nord-Est. L'arbre de vie haïtien offre une huile d'une finesse incomparable riche en acide béhénique pour le soin anti-âge, complétée par notre poudre de feuilles riche en vitamines et minéraux.",
    formatsDetail: ["50ml", "100ml", "Sachet Poudre 200g"],
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    origin: "Caracol & Ouanaminthe, Nord-Est, Haïti",
    terroirLocation: "Vergers Agroforestiers de Moringa",
    highlights: [
      "Arbre de vie Moringa Oleifera d'Haïti",
      "Puissant antioxydant naturel et soin régénérant anti-âge",
      "Poudre de feuilles séchée sous atmosphère contrôlée"
    ],
    ingredients: [
      "100% Huile pure de graines de Moringa Oleifera / 100% Poudre de feuilles pures"
    ],
    usageInstructions: [
      "Huile : Sérum visage quotidien matin et soir.",
      "Poudre : 1 cuillère à café dans jus de fruits, smoothies ou infusions."
    ],
    technicalSpecs: {
      "Acide Béhénique": "7% - 9%",
      "Antioxydants": "Polyphénols, vitamine C et vitamine A"
    },
    formatPricing: {
      "50ml": { format: "Flacon 50ml", priceUSD: 14.00, priceHTG: 1850, unit: "Pipette verre", type: "retail" },
      "100ml": { format: "Flacon 100ml", priceUSD: 24.00, priceHTG: 3170, unit: "Flacon verre ambré", type: "retail" },
      "Sachet Poudre 200g": { format: "Sachet Poudre 200g", priceUSD: 9.50, priceHTG: 1250, unit: "Sachet refermable", type: "retail" }
    },
    certifications: ["Superaliment Certifié", "Zéro Pesticide"]
  },
  {
    id: "huile-de-neem",
    title: "Huile de Neem Pure (Bio-Protection & Soin)",
    slug: "huile-de-neem",
    isFeatured: false,
    category: "Huiles & Soins Naturels",
    badge: "BIO-PROTECTION",
    shortDescription: "Huile végétale de margousier (neem) pressée à froid pour applications agricoles et dermo-cosmétiques.",
    description: "L'huile de Neem de Panyen Lokal est extraite des amandes de neem récoltées dans les zones semi-arides du Nord-Est et de l'Artibonite. Reconnue mondialement comme un bio-pesticide naturel puissant pour l'agriculture biologique, elle constitue également un ingrédient purifiant réputé pour les soins de la peau.",
    formatsDetail: ["60ml", "250ml", "1 Litre"],
    formatsExport: ["1 Gallon (3.78L)", "Baril Export 54 Gallons (204L)"],
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    origin: "Nord-Est & Artibonite, Haïti",
    terroirLocation: "Plaines d'arbres de Neem sauvages",
    highlights: [
      "Concentration élevée en Azadirachtine active",
      "Bio-pesticide 100% biodégradable sans résidus toxiques",
      "Idéal en agriculture régénératrice et maraîchage biologique"
    ],
    ingredients: [
      "100% Huile de graines d'Azadirachta Indica (Neem)"
    ],
    usageInstructions: [
      "Usage agricole : Diluer 5ml d'huile de neem + émulsifiant doux dans 1L d'eau tiède. Pulvériser sur les cultures au coucher du soleil.",
      "Usage dermo-cosmétique : Diluer à 10% dans de l'huile de ricin ou de moringa avant application."
    ],
    technicalSpecs: {
      "Azadirachtine": "> 1800 ppm",
      "Pression": "Mécanique à froid sans solvant"
    },
    formatPricing: {
      "60ml": { format: "Flacon 60ml", priceUSD: 7.00, priceHTG: 925, unit: "Flacon verre", type: "retail" },
      "250ml": { format: "Flacon 250ml", priceUSD: 18.00, priceHTG: 2375, unit: "Bouteille 250ml", type: "retail" },
      "1L": { format: "Bidon 1 Litre", priceUSD: 52.00, priceHTG: 6860, unit: "Bidon 1L", type: "retail" },
      "1 Gallon": { format: "1 Gallon (3.78L)", priceUSD: 160.00, priceHTG: 21120, unit: "Cruche 3.78L", type: "export" },
      "Baril Export 54 Gallons": { format: "Baril 54 Gallons (204L)", priceUSD: 2600.00, priceHTG: 343200, unit: "Fût scellé 204L", type: "export" }
    },
    certifications: ["Bio-Protection Maraîchère", "100% Pur Extrait Végétal"]
  },
  {
    id: "mamba-agrinova",
    title: "Beurre d'Arachide Traditionnel (Mamba)",
    slug: "mamba-agrinova",
    isFeatured: false,
    category: "Épicerie & Alimentaire",
    badge: "TERROIR AUTHENTIQUE",
    shortDescription: "Beurre d'arachides haïtiennes grillées à la perfection (Doux ou Épicé au piment).",
    description: "Le véritable beurre d'arachide haïtien préparé à partir de cacahuètes locales cultivées dans les plaines de l'Artibonite et du Nord-Est, lentement torréfiées et broyées sur meule. Disponible en version crémeuse douce ou relevée au piment traditionnel.",
    formats: ["Pot 250g", "Pot 500g", "Pot 1kg"],
    image: mambaImg,
    gallery: [
      mambaImg,
      marchandesImg,
      marcheFruitsImg
    ],
    inStock: true,
    origin: "Artibonite & Nord-Est, Haïti",
    terroirLocation: "Cultures d'arachides de Saint-Raphaël",
    highlights: [
      "Arachides 100% locales non génétiquement modifiées",
      "Torréfaction lente révélant une saveur noisetée intense",
      "Option piment bouc pour les amateurs de sensations authentiques",
      "Zéro huile hydrogénée ajoutée"
    ],
    ingredients: [
      "Arachides haïtiennes grillées (99%)",
      "Sel marin purifié",
      "(Option avec piment séché moulu)"
    ],
    usageInstructions: [
      "À tartiner généreusement sur la Cassave Artisanale ou du pain grillé.",
      "Base culinaire pour sauces créoles traditionnelles et vinaigrettes onctueuses."
    ],
    technicalSpecs: {
      "Texture": "Onctueuse avec légers éclats croquants",
      "Variantes": "Doux Naturel / Épicé au Piment"
    },
    formatPricing: {
      "Pot 250g": { format: "Pot 250g", priceUSD: 5.50, priceHTG: 725, unit: "Bocal en verre", type: "retail" },
      "Pot 500g": { format: "Pot 500g", priceUSD: 9.50, priceHTG: 1250, unit: "Bocal en verre", type: "retail" },
      "Pot 1kg": { format: "Pot 1kg", priceUSD: 17.00, priceHTG: 2240, unit: "Bocal familial", type: "retail" }
    },
    certifications: ["Arachides du Terroir Haïtien", "Sans Huile de Palme"]
  }
];

export const HAITI_DEPARTMENTS_ORCHARDS: DepartmentOrchard[] = [
  {
    id: "nord-est",
    name: "Nord-Est",
    capital: "Fort-Liberté / Caracol",
    hectares: 480,
    producersCount: 320,
    keyCrops: ["Ricin", "Moringa", "Tamarin", "Manioc doux", "Neem"],
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
    keyCrops: ["Arachides", "Ricin sauvage", "Sel marin", "Neem"],
    altitude: "20m - 200m",
    soilType: "Sols alluviaux chauds et ensoleillés",
    description: "Grand grenier agricole d'Haïti fournissant les meilleures arachides dorées pour notre beurre d'arachide et des graines de neem adaptées au climat aride.",
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
    keyCrops: ["Canne à sucre", "Mangues francisque", "Moringa"],
    altitude: "10m - 400m",
    soilType: "Plaines côtières et piémonts",
    description: "Plaque tournante logistique reliant nos coopératives aux infrastructures d'exportation maritime et aux réseaux de distribution nationaux.",
    coordinates: { x: 55, y: 64 }
  }
];

export const COMPANY_INFO = {
  name: "PANYEN LOKAL",
  tagline: "Agro-industrie durable & Trésors naturels d'Haïti",
  legalForm: "Entreprise Agro-Industrielle",
  address: "B6 39H Caracol, Cap-Haïtien, Haïti (Village EKAM, Complexe Agro-Industriel)",
  email: "panyenlokalsa@gmail.com",
  salesEmail: "panyenlokalsa@gmail.com",
  exportEmail: "panyenlokalsa@gmail.com",
  phone: "+509 38346371 / +509 35593385",
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
