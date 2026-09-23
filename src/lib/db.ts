import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config();

// Configuration MySQL (optionnel si MySQL est démarré)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'panyen_lokal_db',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 2000,
});

export default pool;

// État de connexion MySQL
let mysqlAvailable: boolean | null = null;
let connectionAttempted = false;

// Chemin de persistance locale JSON (stocké dans ./data/panyen_lokal_db.json)
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'panyen_lokal_db.json');

interface LocalDatabase {
  users: any[];
  products: any[];
  product_formats: any[];
  orders: any[];
  order_items: any[];
  b2b_quotes: any[];
}

// Données initiales par défaut des 5 produits officiels
function getInitialProducts(): { products: any[]; formats: any[] } {
  const products = [
    {
      id: 'huile-de-ricin',
      title: "Huile de Ricin Pure d'Haïti",
      slug: 'huile-de-ricin',
      slogan: 'Or Noir du Terroir Haïtien — Pureté 100% Garantie',
      category: 'Huiles & Soins Naturels',
      short_description: 'Huile de ricin 100% pure et naturelle extraite en Haïti pour soins cosmétiques, capillaires, pharmaceutiques et export B2B.',
      description: "Notre huile de ricin d'exception est extraite au cœur du Nord-Est d'Haïti à partir de graines rigoureusement sélectionnées. Elle est issue d'un procédé semi-industriel et artisanal maîtrisé sans solvants chimiques ni hexane. Exceptionnellement concentrée en acide ricinoléique (>88%), elle stimule intensément la pousse capillaire, régénère l'épiderme et répond aux normes des plus grands laboratoires cosmétiques internationaux.",
      image_url: '/src/assets/images/huile_ricin_flacon_1786847591002.jpg',
      is_featured: 1,
      in_stock: 1,
      origin: 'Haïti (Terroir Nord-Est / Complexe Industriel de Caracol)',
      terroir_location: 'Plantations & Coopératives du Nord-Est',
      badge: 'PRODUIT PHARE N°1',
      highlights: JSON.stringify([
        '100% Pure & Naturelle sans solvants ni dérivés pétrochimiques',
        'Teneur en Acide Ricinoléique certifiée en laboratoire > 88.4%',
        'Pressage mécanique et extraction respectueuse des principes actifs',
        'Normes export B2B fûts maritimes 204L et formats détail scellés'
      ]),
      ingredients: JSON.stringify([
        '100% Huile de graines de Ricinus Communis (Ricin / Maskriti d\'Haïti)',
        'Riche en vitamine E, oméga-9 et acide ricinoléique',
        'Sans conservateur, sans colorant, sans parfum artificiel'
      ]),
      usage_instructions: JSON.stringify([
        'Soin Capillaire : Masser quelques gouttes sur le cuir chevelu 2 à 3 fois par semaine pour stimuler la pousse.',
        'Soin Barbe & Cils : Appliquer le soir au coucher sur les pointes et longueurs.',
        'Soin Cutané : Idéal en massage régénérant sur peaux très sèches ou irritées.'
      ]),
      technical_specs: JSON.stringify({
        'Indice de réfraction': '1.477 - 1.481',
        'Indice d\'iode': '82 - 88',
        'Acide ricinoléique': '> 88.4%',
        'Acidité oléique': '< 0.75%',
        'Origine de collecte': 'Caracol, Grand Bassin & Ouanaminthe'
      }),
      certifications: JSON.stringify([
        'Certificat de Conformité Sanitaire & Exportation',
        'Contrôle Qualité HPLC Laboratoire National',
        '100% Origine Terroir Haïti Certifié'
      ]),
      gallery: JSON.stringify([
        '/src/assets/images/huile_ricin_flacon_1786847591002.jpg',
        '/src/assets/images/recolte_ricin_moringa_1786859405918.jpg',
        '/src/assets/images/laboratoire_analyse_hplc_1786859417514.jpg',
        '/src/assets/images/champ_panyen_lokal_1786858968582.jpg'
      ]),
      created_at: new Date('2026-01-01T00:00:00Z').toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'cognac-grand-tamar',
      title: 'Grand Tamar Cognac de Prestige (43% Alc.)',
      slug: 'cognac-grand-tamar',
      slogan: "Cognac d'exception fait avec fruit de tamarinier (43% Alc./Vol.)",
      category: 'Boissons & Liqueurs',
      short_description: "Cognac d'exception 750ml, vieilli en fûts de chêne avec fruits de tamarinier sélectionnés à Caracol, Haïti.",
      description: "GRAND TAMAR est un cognac d'exception, issu d'un savoir-faire traditionnel et d'un vieillissement soigneux en fûts de chêne. Ses arômes riches et harmonieux révèlent des notes subtiles de fruits secs, de vanille et d'épices, offrant une expérience gustative profonde et raffinée. Un cognac noble, pour les connaisseurs exigeants.",
      image_url: '/uploads/grand_tamar_front.jpg',
      is_featured: 1,
      in_stock: 1,
      origin: 'Caracol, Cap-Haïtien, Haïti',
      terroir_location: 'Complexe Agro-Industriel Panyen Lokal, Village EKAM, Caracol',
      badge: 'PRESTIGE COGNAC 43%',
      highlights: JSON.stringify([
        "Élaboré avec fruits de tamarinier sélectionnés (43% Alc./Vol.)",
        "Vieillissement soigné en fûts de chêne avec notes subtiles de vanille et fruits secs",
        "Bouteille de prestige 750ml avec armoiries dorées et étui d'apparat",
        "Fabrication officielle Panyen Lokal à Caracol, Haïti"
      ]),
      ingredients: JSON.stringify([
        "Distillat noble vieilli en fûts de chêne",
        "Pulpe et extrait naturel de fruits de tamarinier (Caracol / Grand Bassin)",
        "Notes subtiles d'épices douces du terroir d'Haïti"
      ]),
      usage_instructions: JSON.stringify([
        "Dégustation pure : Servir dans un verre ballon à température ambiante (18-20°C).",
        "En digestif de prestige : Savourer lentement pour apprécier la persistance aromatique.",
        "Cadeau d'affaires & Export B2B : Idéal pour les réceptions de prestige et la diaspora."
      ]),
      technical_specs: JSON.stringify({
        "Degré d'alcool": "43% ALC./VOL.",
        "Contenance": "750 ml",
        "Bouteille": "Verre lourd de prestige avec bouchon gravé",
        "Vieillissement": "Fûts de chêne sélectionnés",
        "Adresse Producteur": "B6 39H Caracol, Cap-Haïtien, Haïti",
        "Téléphone": "+509 38580171 / 35160365"
      }),
      certifications: JSON.stringify([
        "Cognac de Prestige Produit d'Haïti",
        "43% ALC./VOL. Certifié",
        "Origine Caracol / Cap-Haïtien"
      ]),
      gallery: JSON.stringify([
        '/uploads/grand_tamar_front.jpg',
        '/uploads/grand_tamar_back.jpg'
      ]),
      created_at: new Date('2026-01-02T00:00:00Z').toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'tiz-vin-de-miel',
      title: 'Tiz Vin de Miel (Hydromel Artisanal)',
      slug: 'tiz-vin-de-miel',
      slogan: 'L\'Élixir d\'Or des Terroirs Sauvages',
      category: 'Boissons & Liqueurs',
      short_description: 'Hydromel ancestral fermenté à base de miel brut de fleurs sauvages, d\'eau de source et d\'écorces d\'oranges amères (bigarade).',
      description: "Tiz Vin de Miel est un hommage vibrant aux recettes d'hydromel traditionnelles des Caraïbes. La fermentation naturelle et lente de miels bruts récoltés par nos apiculteurs partenaires confère à cette cuvée une robe dorée chatoyante, un nez floral éclatant et une bouche miellée délicatement balancée par l'acidité noble de la bigarade locale.",
      image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      is_featured: 1,
      in_stock: 1,
      origin: 'Haïti (Massif du Nord & Plateau Central)',
      terroir_location: 'Réseau Apicole Panyen Lokal (Région Centre & Nord)',
      badge: 'CRU ARTISANAL',
      highlights: JSON.stringify([
        'Fermentation 100% naturelle sans sulfites ajoutés',
        'Miel polyfloral de fleurs de campêche et d\'oranger sauvage',
        '12.5% Vol. d\'Alcool — Équilibre subtil doux et sec'
      ]),
      ingredients: JSON.stringify([
        'Eau de source filtrée',
        'Miel brut d\'abeilles sauvages haïtiennes',
        'Levures indigènes sélectionnées',
        'Zestes d\'oranges amères (Citrus aurantium)'
      ]),
      usage_instructions: JSON.stringify([
        'Servir très frais entre 8°C et 10°C.',
        'Accompagne à merveille les fromages affinés, les desserts à base de fruits ou en cocktail de fête.'
      ]),
      technical_specs: JSON.stringify({
        'Alcool': '12.5% Vol.',
        'Volume': '750 ml',
        'Sulfites': 'Sans sulfites ajoutés',
        'Bouteille': 'Verre teinté protecteur UV'
      }),
      certifications: JSON.stringify([
        'Apiculture Responsable & Préservation de la Biodiversité',
        '100% Produit Artisanal Haïtien'
      ]),
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
      ]),
      created_at: new Date('2026-01-03T00:00:00Z').toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'chocolat-chaud',
      title: "Chocolat Artisanal en Tablette d'Haïti",
      slug: 'chocolat-chaud',
      slogan: "100% Naturel • Tablette de Pur Cacao d'Haïti (150 HTG)",
      category: 'Épicerie & Alimentaire',
      short_description: 'Tablette artisanale de pur chocolat d\'Haïti (Tablèt Chokola Peyi), 100% cacao naturel (150 HTG).',
      description: "Le Chocolat Artisanal en Tablette Panyen Lokal est confectionné selon la tradition séculaire du terroir haïtien. Présenté sous forme de tablette artisanale (Tablèt Chokola Peyi), élaborée à partir de fèves de cacao sélectionnées, torréfiées avec soin et moulues sans additif artificiel. Prix : 150 HTG la tablette.",
      image_url: '/uploads/chocolat_chaud_panyen.jpg',
      is_featured: 1,
      in_stock: 1,
      origin: 'Haïti (Bassin Cacaoyer du Nord & Grand\'Anse)',
      terroir_location: 'Coopératives de Planteurs Cacao du Nord & Village EKAM',
      badge: 'TABLETTE 100% CACAO',
      highlights: JSON.stringify([
        '100% Naturel • Fabriqué en Haïti sous forme de tablette artisanale',
        'Prix accessible terroir : 150 HTG la tablette de chocolat pur',
        'Arômes naturels d\'épices douces des mornes haïtiens',
        'Idéal pour préparer le chocolat chaud traditionnel'
      ]),
      ingredients: JSON.stringify([
        'Pâte pure et poudre de fèves de cacao pur d\'Haïti',
        'Sucre de canne brut naturel non raffiné',
        'Cannelle moulue du terroir',
        'Noix de muscade râpée',
        'Essence naturelle d\'anis étoilé et vanille'
      ]),
      usage_instructions: JSON.stringify([
        'Pour 4 tasses : Porter à ébullition 500ml d\'eau ou de lait frais avec une pincée de sel.',
        'Ajouter 3 à 4 cuillères à soupe de chocolat PANYEN LOKAL.',
        'Laisser mijoter 5 minutes à feu doux en remuant jusqu\'à obtention d\'une texture veloutée.',
        'Servir bien chaud accompagné de cassaves traditionnelles ou de toasts.'
      ]),
      technical_specs: JSON.stringify({
        'Poids Net': '500g (17.6 oz)',
        'Teneur en Cacao': '100% Cacao Naturel Pur',
        'Emballage': 'Sachet Doypack hermétique zip refermable',
        'Conservation': '24 mois au sec à l\'abri de la chaleur et de l\'humidité',
        'Origine': 'Haïti (Fabriqué en Haïti)',
        'Adresse Fabricant': 'B6 39H Caracol, Cap-Haïtien, Haïti'
      }),
      certifications: JSON.stringify([
        '100% Naturel • Fabriqué en Haïti',
        'Commerce Équitable Cacao Haïtien',
        'Transformation Agroalimentaire Conforme HACCP',
        'Sans Conservateur Chimique ni Graisses Hydrogénées'
      ]),
      gallery: JSON.stringify([
        '/uploads/chocolat_chaud_panyen.jpg'
      ]),
      created_at: new Date('2026-01-04T00:00:00Z').toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'cassave-artisanale',
      title: 'Cassave Artisanale Traditionnelle du Nord',
      slug: 'cassave-artisanale',
      slogan: 'Galette de Manioc Ancestrale • Étui Cartonné Protecteur 20x7x30cm',
      category: 'Épicerie & Alimentaire',
      short_description: 'Boîte étui protectrice (20x7x30cm) renfermant nos cassaves pur manioc doux cuites sur platines en fonte traditionnelles au feu de bois.',
      description: "Fabriquée selon un rituel préservé depuis plusieurs générations dans les cassaveries du Cap-Haïtien et de Caracol, la cassave PANYEN LOKAL est préparée avec du manioc doux épluché, râpé, pressé pour extraire l'amidon et tamisé avec finesse. Cuite lentement sur de grandes platines en fonte chauffées au bois d'acajou, elle développe un croustillant parfait et une saveur dorée incomparable. Son nouvel étui cartonné solide (20x7x30cm) protège les galettes contre l'humidité et les chocs pour une conservation optimale et un transport sans bris.",
      image_url: '/src/assets/images/cassave_nord_box_1786934328091.jpg',
      is_featured: 1,
      in_stock: 1,
      origin: 'Haïti (Plaine du Nord & Bassin Manioc de Caracol)',
      terroir_location: 'Cassaveries Éco-Responsables du Nord-Est',
      badge: 'PATRIMOINE DU NORD',
      highlights: JSON.stringify([
        'Manioc doux cultivé localement sans intrants chimiques',
        'Cuisson sur platines traditionnelles en fonte au feu de bois',
        'Format étui rigide protecteur de dimensions 20x7x30 cm',
        'Sans gluten, 100% végétal et riche en fibres naturelles'
      ]),
      ingredients: JSON.stringify([
        'Farine de manioc doux pur tamisée',
        'Sucre de canne brut ou Sel marin artisanal',
        'Cannelle moulue du terroir',
        'Gingembre naturel',
        'Noix de coco râpée',
        'Graines de sésame dorées (Roroli)'
      ]),
      usage_instructions: JSON.stringify([
        'À déguster au petit-déjeuner ou au goûter avec du chocolat chaud ou du café.',
        'Idéale nature, toastée ou accompagnée d\'avocat et de confiture de fruits locaux.',
        'Conserver dans son étui protecteur au sec.'
      ]),
      technical_specs: JSON.stringify({
        'Dimensions Étui': '20 x 7 x 30 cm',
        'Cuisson': 'Platines traditionnelles au feu de bois',
        'Allergènes': 'Sans gluten',
        'Calories': '193 kcal / 100g',
        'Adresse Fabricant': 'B6 39H Caracol, Cap-Haïtien, Haïti'
      }),
      certifications: JSON.stringify([
        'Patrimoine Gastronomique Haïtien',
        '100% Sans Gluten Naturel',
        'Norme Emballage Alimentaire'
      ]),
      gallery: JSON.stringify([
        '/src/assets/images/cassave_nord_box_1786934328091.jpg'
      ]),
      created_at: new Date('2026-01-05T00:00:00Z').toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const formats = [
    // Huile de ricin formats
    { id: 1, product_id: 'huile-de-ricin', format_name: '2oz (60ml)', price_usd: '1.15', price_htg: '150.00', unit: 'Flacon verre ambré compte-gouttes', type: 'retail', moq: 1, weight_kg: '0.12' },
    { id: 2, product_id: 'huile-de-ricin', format_name: '4oz (120ml)', price_usd: '1.50', price_htg: '200.00', unit: 'Flacon verre ambré 120ml', type: 'retail', moq: 1, weight_kg: '0.22' },
    { id: 3, product_id: 'huile-de-ricin', format_name: '250ml', price_usd: '3.50', price_htg: '460.00', unit: 'Bouteille verre 250ml', type: 'retail', moq: 1, weight_kg: '0.45' },
    { id: 4, product_id: 'huile-de-ricin', format_name: '500ml', price_usd: '6.50', price_htg: '850.00', unit: 'Bouteille verre 500ml', type: 'retail', moq: 1, weight_kg: '0.85' },
    { id: 5, product_id: 'huile-de-ricin', format_name: '1 Litre', price_usd: '12.00', price_htg: '1580.00', unit: 'Bouteille métal / verre 1000ml', type: 'retail', moq: 1, weight_kg: '1.60' },
    { id: 6, product_id: 'huile-de-ricin', format_name: '1 Gallon (3.78L)', price_usd: '45.00', price_htg: '5940.00', unit: 'Bidon sécurisé export PEHD', type: 'export', moq: 1, weight_kg: '4.20' },
    { id: 7, product_id: 'huile-de-ricin', format_name: 'Baril Export 54 Gallons (204L)', price_usd: '1800.00', price_htg: '237600.00', unit: 'Fût acier alimentaire scellé', type: 'export', moq: 1, weight_kg: '215.00' },

    // Cognac Grand Tamar formats
    { id: 8, product_id: 'cognac-grand-tamar', format_name: 'Bouteille 750ml', price_usd: '35.00', price_htg: '4620.00', unit: 'Bouteille verre prestige 750ml (43% Alc)', type: 'retail', moq: 1, weight_kg: '1.40' },
    { id: 9, product_id: 'cognac-grand-tamar', format_name: 'Caisse Export (6 Bouteilles 750ml)', price_usd: '190.00', price_htg: '25080.00', unit: 'Caisse bois / carton renforcé', type: 'export', moq: 1, weight_kg: '8.80' },

    // Tiz Vin de Miel formats
    { id: 10, product_id: 'tiz-vin-de-miel', format_name: 'Bouteille 750ml', price_usd: '10.00', price_htg: '1320.00', unit: 'Bouteille verre 750ml bouchon liège', type: 'retail', moq: 1, weight_kg: '1.35' },
    { id: 11, product_id: 'tiz-vin-de-miel', format_name: 'Caisse Export (6 Bouteilles 750ml)', price_usd: '55.00', price_htg: '7260.00', unit: 'Caisse renforcée 6 unités', type: 'export', moq: 1, weight_kg: '8.40' },

    // Chocolat artisanal en tablette formats
    { id: 12, product_id: 'chocolat-chaud', format_name: 'Tablette Traditionnelle (Cacao Pur)', price_usd: '1.15', price_htg: '150.00', unit: 'Tablette artisanale 100% cacao pur', type: 'retail', moq: 1, weight_kg: '0.15' },
    { id: 13, product_id: 'chocolat-chaud', format_name: 'Carton Export (24 Tablettes)', price_usd: '25.00', price_htg: '3300.00', unit: 'Carton ondulé renforcé 24 tablettes', type: 'export', moq: 1, weight_kg: '3.60' },

    // Cassave artisanale formats
    { id: 14, product_id: 'cassave-artisanale', format_name: 'Boîte Étui', price_usd: '6.50', price_htg: '850.00', unit: 'Étui cartonné protecteur 20x7x30cm', type: 'retail', moq: 1, weight_kg: '0.35' },
    { id: 15, product_id: 'cassave-artisanale', format_name: 'Pack Export', price_usd: '36.00', price_htg: '4750.00', unit: 'Carton renforcé 6 étuis', type: 'export', moq: 1, weight_kg: '2.20' }
  ];

  return { products, formats };
}

// Initialise ou charge la base de données locale
let localDbCache: LocalDatabase | null = null;

function loadLocalDatabase(): LocalDatabase {
  if (localDbCache) return localDbCache;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
        localDbCache = parsed;
        return parsed;
      }
    } catch (e) {
      console.warn('⚠️ Erreur lecture fichier local_db.json, réinitialisation...');
    }
  }

  const { products, formats } = getInitialProducts();
  const defaultPasswordHash = bcrypt.hashSync('admin123', 10);

  const newDb: LocalDatabase = {
    users: [
      {
        id: 'admin-01',
        full_name: 'Admin Panyen Lokal',
        email: 'admin@panyenlokal.com',
        phone: '+509 3400 0000',
        password_hash: defaultPasswordHash,
        role: 'admin',
        preferred_region: 'haiti',
        company_name: 'PANYEN LOKAL S.A.',
        street: 'Village EKAM, Parc Industriel de Caracol',
        city: 'Caracol',
        state_or_department: 'Nord-Est',
        country: 'Haïti',
        created_at: new Date('2026-01-01T00:00:00Z').toISOString()
      }
    ],
    products,
    product_formats: formats,
    orders: [],
    order_items: [],
    b2b_quotes: []
  };

  saveLocalDatabase(newDb);
  localDbCache = newDb;
  return newDb;
}

function saveLocalDatabase(db: LocalDatabase) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    localDbCache = db;
  } catch (err) {
    console.error('Erreur sauvegarde base locale:', err);
  }
}

// Vérifie si MySQL est réellement joignable sans bloquer ni générer d'erreurs non capturées
async function checkMySQLConnection(): Promise<boolean> {
  if (mysqlAvailable !== null) return mysqlAvailable;
  if (connectionAttempted) return false;

  connectionAttempted = true;
  try {
    const conn = await Promise.race([
      pool.getConnection(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('MySQL connection timeout')), 1000)
      )
    ]);
    conn.release();
    mysqlAvailable = true;
    console.log('✅ [Database] Connecté avec succès au serveur MySQL.');
    return true;
  } catch (err: any) {
    mysqlAvailable = false;
    console.log('ℹ️ [Database] MySQL indisponible (connect ECONNREFUSED 127.0.0.1:3306) — Utilisation de la base de données locale persistante (JSON Store).');
    return false;
  }
}

/**
 * Exécuteur de requêtes SQL polyvalent
 * - Tente MySQL si disponible
 * - Si MySQL est inaccessible, bascule instantanément et silencieusement sur le moteur local persistant
 */
export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  const isMysql = await checkMySQLConnection();

  if (isMysql) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows as T;
    } catch (err: any) {
      if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ETIMEDOUT') {
        mysqlAvailable = false;
        console.warn('⚠️ [Database] Déconnexion MySQL détectée. Basculement sur la base locale.');
      } else {
        throw err;
      }
    }
  }

  // Traitement via le moteur SQL local
  return executeLocalQuery<T>(sql, params);
}

/**
 * Moteur SQL local persistant en mémoire / JSON
 * Couvre l'ensemble des requêtes de server.ts
 */
function executeLocalQuery<T>(sql: string, params: any[]): T {
  const db = loadLocalDatabase();
  const trimmed = sql.trim().replace(/\s+/g, ' ');
  const upper = trimmed.toUpperCase();

  // 1. SELECT 1
  if (upper === 'SELECT 1' || upper.startsWith('SELECT 1')) {
    return [{ '1': 1 }] as unknown as T;
  }

  // 2. USERS QUERIES
  if (upper.includes('FROM USERS WHERE EMAIL = ?')) {
    const email = (params[0] || '').toString().toLowerCase();
    const matches = db.users.filter(u => (u.email || '').toLowerCase() === email);
    return matches as unknown as T;
  }

  if (upper.includes('SELECT ROLE FROM USERS WHERE ID = ?')) {
    const id = params[0];
    const user = db.users.find(u => u.id === id);
    return (user ? [{ role: user.role }] : []) as unknown as T;
  }

  if (upper.includes('FROM USERS') && upper.includes('ORDER BY CREATED_AT DESC')) {
    return [...db.users].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()) as unknown as T;
  }

  if (upper.includes('UPDATE USERS SET ROLE = ? WHERE ID = ?')) {
    const [role, id] = params;
    const user = db.users.find(u => u.id === id);
    if (user) {
      user.role = role;
      saveLocalDatabase(db);
    }
    return { affectedRows: user ? 1 : 0 } as unknown as T;
  }

  if (upper.includes('UPDATE USERS SET PASSWORD_HASH = ? WHERE EMAIL = ? AND ROLE = ?')) {
    const [hash, email, role] = params;
    let count = 0;
    db.users.forEach(u => {
      if ((u.email || '').toLowerCase() === (email || '').toLowerCase() && u.role === role) {
        u.password_hash = hash;
        count++;
      }
    });
    if (count > 0) saveLocalDatabase(db);
    return { affectedRows: count } as unknown as T;
  }

  if (upper.startsWith('INSERT INTO USERS')) {
    const [id, fullName, email, phone, passwordHash, preferredRegion, companyName, street, city, stateOrDepartment, country] = params;
    const newUser = {
      id,
      full_name: fullName,
      email: (email || '').toLowerCase(),
      phone: phone || '',
      password_hash: passwordHash,
      role: 'user',
      preferred_region: preferredRegion || 'haiti',
      company_name: companyName || '',
      street: street || '',
      city: city || '',
      state_or_department: stateOrDepartment || '',
      country: country || '',
      created_at: new Date().toISOString()
    };
    db.users.push(newUser);
    saveLocalDatabase(db);
    return { affectedRows: 1, insertId: id } as unknown as T;
  }

  // 3. PRODUCTS QUERIES
  if (upper.includes('FROM PRODUCTS WHERE IN_STOCK = 1')) {
    const inStockProducts = db.products.filter(p => p.in_stock === 1 || p.in_stock === true);
    inStockProducts.sort((a, b) => {
      if (b.is_featured !== a.is_featured) return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    });
    return inStockProducts as unknown as T;
  }

  if (upper.includes('FROM PRODUCTS') && upper.includes('ORDER BY CREATED_AT DESC')) {
    return [...db.products].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()) as unknown as T;
  }

  if (upper.includes('SELECT TITLE AS NAME, IN_STOCK FROM PRODUCTS')) {
    return db.products.map(p => ({ name: p.title, in_stock: p.in_stock })) as unknown as T;
  }

  if (upper.includes('UPDATE PRODUCTS SET IN_STOCK = ? WHERE ID = ?')) {
    const [inStock, id] = params;
    const prod = db.products.find(p => p.id === id);
    if (prod) {
      prod.in_stock = inStock;
      saveLocalDatabase(db);
    }
    return { affectedRows: prod ? 1 : 0 } as unknown as T;
  }

  if (upper.startsWith('INSERT INTO PRODUCTS')) {
    const [
      id, title, slug, slogan, category, shortDescription, description, image,
      isFeatured, inStock, origin, terroirLocation, badge, highlights, ingredients,
      usageInstructions, technicalSpecs, certifications, gallery
    ] = params;

    const newProd = {
      id,
      title,
      slug,
      slogan: slogan || '',
      category,
      short_description: shortDescription,
      description,
      image_url: image,
      is_featured: isFeatured,
      in_stock: inStock,
      origin,
      terroir_location: terroirLocation,
      badge: badge || '',
      highlights: highlights || '[]',
      ingredients: ingredients || '[]',
      usage_instructions: usageInstructions || '[]',
      technical_specs: technicalSpecs || '{}',
      certifications: certifications || '[]',
      gallery: gallery || '[]',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.products.push(newProd);
    saveLocalDatabase(db);
    return { affectedRows: 1, insertId: id } as unknown as T;
  }

  if (upper.startsWith('UPDATE PRODUCTS SET') && upper.includes('WHERE ID = ?')) {
    const id = params[params.length - 1];
    const prod = db.products.find(p => p.id === id);
    if (prod) {
      const [
        title, slug, slogan, category, shortDescription, description, image,
        isFeatured, inStock, origin, terroirLocation, badge,
        highlights, ingredients, usageInstructions, technicalSpecs, certifications, gallery
      ] = params;

      prod.title = title;
      prod.slug = slug;
      prod.slogan = slogan;
      prod.category = category;
      prod.short_description = shortDescription;
      prod.description = description;
      prod.image_url = image;
      prod.is_featured = isFeatured;
      prod.in_stock = inStock;
      prod.origin = origin;
      prod.terroir_location = terroirLocation;
      prod.badge = badge;
      prod.highlights = highlights;
      prod.ingredients = ingredients;
      prod.usage_instructions = usageInstructions;
      prod.technical_specs = technicalSpecs;
      prod.certifications = certifications;
      prod.gallery = gallery;
      prod.updated_at = new Date().toISOString();
      saveLocalDatabase(db);
    }
    return { affectedRows: prod ? 1 : 0 } as unknown as T;
  }

  if (upper.startsWith('DELETE FROM PRODUCTS WHERE ID = ?')) {
    const id = params[0];
    const initialLen = db.products.length;
    db.products = db.products.filter(p => p.id !== id);
    db.product_formats = db.product_formats.filter(f => f.product_id !== id);
    saveLocalDatabase(db);
    return { affectedRows: initialLen - db.products.length } as unknown as T;
  }

  // 4. PRODUCT FORMATS
  if (upper.includes('FROM PRODUCT_FORMATS WHERE PRODUCT_ID = ?')) {
    const productId = params[0];
    const formats = db.product_formats.filter(f => f.product_id === productId);
    return formats as unknown as T;
  }

  // 5. ORDERS
  if (upper.startsWith('INSERT INTO ORDERS')) {
    const [
      id, orderNumber, userId, region, subtotalUsd, shippingFeeUsd, totalUsd,
      totalLocal, currency, paymentMethod, paymentStatus, status, estimatedDelivery,
      deliveryStreet, deliveryCity, deliveryCountry, deliveryNotes
    ] = params;

    const newOrder = {
      id,
      order_number: orderNumber,
      user_id: userId,
      region,
      subtotal_usd: subtotalUsd,
      shipping_fee_usd: shippingFeeUsd,
      total_usd: totalUsd,
      total_local: totalLocal,
      currency,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      status: status || 'en_preparation',
      estimated_delivery: estimatedDelivery,
      delivery_street: deliveryStreet,
      delivery_city: deliveryCity,
      delivery_country: deliveryCountry,
      delivery_notes: deliveryNotes,
      created_at: new Date().toISOString()
    };
    db.orders.push(newOrder);
    saveLocalDatabase(db);
    return { affectedRows: 1, insertId: id } as unknown as T;
  }

  if (upper.includes('FROM ORDERS WHERE USER_ID = ?')) {
    const userId = params[0];
    const userOrders = db.orders.filter(o => o.user_id === userId);
    userOrders.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    return userOrders as unknown as T;
  }

  if (upper.includes('FROM ORDERS') && upper.includes('ORDER BY CREATED_AT DESC')) {
    return [...db.orders].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()) as unknown as T;
  }

  if (upper.includes('UPDATE ORDERS SET STATUS = ?')) {
    const [status, trackingNumber, paymentStatus, id] = params;
    const order = db.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      order.tracking_number = trackingNumber;
      order.payment_status = paymentStatus;
      saveLocalDatabase(db);
    }
    return { affectedRows: order ? 1 : 0 } as unknown as T;
  }

  // 6. ORDER ITEMS
  if (upper.startsWith('INSERT INTO ORDER_ITEMS')) {
    const [orderId, productId, productTitle, selectedFormat, quantity, unitPriceUsd, totalPriceUsd] = params;
    const item = {
      id: db.order_items.length + 1,
      order_id: orderId,
      product_id: productId,
      product_title: productTitle,
      selected_format: selectedFormat,
      quantity,
      unit_price_usd: unitPriceUsd,
      total_price_usd: totalPriceUsd
    };
    db.order_items.push(item);
    saveLocalDatabase(db);
    return { affectedRows: 1, insertId: item.id } as unknown as T;
  }

  if (upper.includes('FROM ORDER_ITEMS WHERE ORDER_ID = ?')) {
    const orderId = params[0];
    return db.order_items.filter(i => i.order_id === orderId) as unknown as T;
  }

  if (upper.includes('FROM ORDER_ITEMS GROUP BY PRODUCT_ID, PRODUCT_TITLE')) {
    const salesMap: Record<string, { name: string; sales: number }> = {};
    for (const item of db.order_items) {
      const key = item.product_id || item.product_title;
      if (!salesMap[key]) {
        salesMap[key] = { name: item.product_title || key, sales: 0 };
      }
      salesMap[key].sales += Number(item.quantity) || 0;
    }
    const sorted = Object.values(salesMap).sort((a, b) => b.sales - a.sales).slice(0, 5);
    return sorted as unknown as T;
  }

  // 7. B2B QUOTES
  if (upper.startsWith('INSERT INTO B2B_QUOTES')) {
    const [referenceNumber, companyName, contactPerson, email, phone, destinationCountry, industry, incoterm, requirements] = params;
    const quote = {
      id: db.b2b_quotes.length + 1,
      reference_number: referenceNumber,
      company_name: companyName,
      contact_person: contactPerson,
      email,
      phone,
      destination_country: destinationCountry,
      industry,
      incoterm,
      requirements,
      status: 'nouveau',
      created_at: new Date().toISOString()
    };
    db.b2b_quotes.push(quote);
    saveLocalDatabase(db);
    return { affectedRows: 1, insertId: quote.id } as unknown as T;
  }

  if (upper.includes('FROM B2B_QUOTES')) {
    return [...db.b2b_quotes].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()) as unknown as T;
  }

  // 8. AGGREGATES (COUNT / SUM)
  if (upper.includes('SELECT COUNT(*) AS COUNT FROM ORDERS WHERE STATUS = ?')) {
    const status = params[0];
    const count = db.orders.filter(o => o.status === status).length;
    return [{ count }] as unknown as T;
  }

  if (upper.includes('SELECT COUNT(*) AS COUNT FROM ORDERS')) {
    return [{ count: db.orders.length }] as unknown as T;
  }

  if (upper.includes('SELECT SUM(TOTAL_USD) AS REVENUE FROM ORDERS WHERE PAYMENT_STATUS = ?')) {
    const status = params[0];
    const revenue = db.orders
      .filter(o => o.payment_status === status)
      .reduce((sum, o) => sum + (parseFloat(o.total_usd) || 0), 0);
    return [{ revenue }] as unknown as T;
  }

  if (upper.includes('SELECT COUNT(*) AS COUNT FROM USERS')) {
    return [{ count: db.users.length }] as unknown as T;
  }

  // Fallback générique
  return [] as unknown as T;
}
