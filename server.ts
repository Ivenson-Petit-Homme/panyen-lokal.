import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { query } from './src/lib/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seulement les images sont autorisées.'));
    }
  }
});

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    company: 'PANYEN LOKAL S.A.',
    version: '2.0',
    timestamp: new Date().toISOString()
  });
});

// AI Advisor endpoint
app.post('/api/ai/advisor', async (req, res) => {
  try {
    const { query, topic, context } = req.body;
    const ai = getAIClient();

    if (!ai) {
      // High-quality contextual fallback if API key is not yet set
      return res.json({
        success: true,
        source: 'local_expert',
        reply: `🌿 **Conseil Panyen Lokal S.A. :**
Pour votre demande concernant *"${query || 'nos produits'}"* :
- **Huile de Ricin Pure (Lwil Maskriti)** : Pour les soins capillaires, appliquez en bain d'huile tiède 1 à 2 fois par semaine sur le cuir chevelu. Pour la peau, massez quelques gouttes le soir.
- **Cognac Grand Tamar & Tiz Vin de Miel** : Servir frais (12-14°C) en apéritif ou digestif. Accompagne idéalement nos cassaves fourrées au mamba.
- **Commande & Export B2B** : Nos formats 1 Gallon et Barils de 54 Gallons sont livrables avec certificat d'analyse (teneur en acide ricinoléique >88%).`
      });
    }

    const systemPrompt = `Tu es l'expert agronome et conseiller commercial officiel de l'entreprise agro-industrielle haïtienne PANYEN LOKAL S.A. (Village EKAM, Caracol, Nord-Est, Haïti).
Tu es chaleureux, professionnel, fier du terroir haïtien et rigoureux sur les procédés de fabrication naturels et agro-industriels.

Informations clés sur Panyen Lokal S.A. :
- Produit Phare : Huile de Ricin Pure d'Haïti (Lwil Maskriti / Lwil Risen) extraite sans solvants chimiques (chauffage traditionnel + pressage semi-industriel). Formats disponibles : Détail (2oz, 4oz, 250ml, 500ml, 1L), Gros/Export (1 Gallon, Baril Export 54 Gallons / 204L). ATTENTION : Les formats 5oz et 10oz sont obsolètes et n'existent plus.
- Nouveaux produits : 
  1. Cognac Grand Tamar (Spiritueux artisanal d'exception à base de tamarin de Grand Bassin, clairin pur canne, miel brut et aromates, vieilli en fûts de chêne, bouteille 750ml, Slogan: "La passion désaltérante des connaisseurs").
  2. Tiz Vin de Miel (Hydromel / vin de miel artisanal à la bigarade / orange amère, 750ml, Slogan: "La passion désaltérante des connaisseurs").
  3. Chokola Panyen Lokal (Chocolat artisanal 100% cacao natirèl d'Haïti, tablettes 100g ou boules traditionnelles).
  4. Kasav Artisanal (Cassave au manioc local au feu de bois, nature ou fourrée au mamba AGRINOVA, sachet de 5 ou paquet familial).
- Produits secondaires : Huile de Moringa, Huile de Neem (bio-pesticide et soin), Mamba AGRINOVA (beurre d'arachide grillé).
- Réseau agricole : Plus de 850 producteurs locaux partenaires répartis dans 6 départements d'Haïti (Nord-Est, Nord, Artibonite, Centre, Sud, Ouest).
- Unité de transformation : Village EKAM, Caracol, Nord-Est, Haïti.
- Normes B2B : Certificats d'analyse de pureté, acide ricinoléique > 88%, expédition conteneurs 20ft/40ft et fûts maritimes FOB Cap-Haïtien ou Port-au-Prince.

Réponds de manière concise, structurée en markdown, conviviale et élégante. Réponds en français (ou en créole haïtien si la question est posée en créole).`;

    const promptText = `Contexte utilisateur: ${context || 'Général'}\nSujet: ${topic || 'Conseil produit'}\nQuestion de l'utilisateur: ${query}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${promptText}` }] }
      ]
    });

    res.json({
      success: true,
      source: 'gemini',
      reply: response.text
    });
  } catch (error: any) {
    console.error('Error in /api/ai/advisor:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la génération de conseil',
      fallback: 'L\'équipe technique et commerciale de Panyen Lokal S.A. reste joignable au Village EKAM, Caracol, Nord-Est ou par email à contact@panyenlokal.com.'
    });
  }
});

// In-memory data store with fallback for demo/production sessions
// These will no longer be used as we shifted to MySQL
const usersDB: any[] = [];
const ordersDB: any[] = [];

// Auth Registration Endpoint
app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, phone, password, preferredRegion, companyName, address } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'Nom complet, e-mail et mot de passe obligatoires.' });
  }

  try {
    const existing = await query<any[]>('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existing && existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Un compte existe déjà avec cet e-mail.' });
    }

    const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const passwordHash = await bcrypt.hash(password, 10);

    await query(
      `INSERT INTO users (id, full_name, email, phone, password_hash, preferred_region, company_name, street, city, state_or_department, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        fullName,
        email.toLowerCase(),
        phone || '',
        passwordHash,
        preferredRegion || 'haiti',
        companyName || '',
        address?.street || '',
        address?.city || '',
        address?.stateOrDepartment || '',
        address?.country || ''
      ]
    );

    const userSafe = {
      id,
      fullName,
      email: email.toLowerCase(),
      phone: phone || '',
      role: 'user',
      preferredRegion: preferredRegion || 'haiti',
      companyName: companyName || '',
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      user: userSafe,
      token: `pl_tok_${id}`,
      message: 'Votre compte a été créé avec succès sur Panyen Lokal S.A. !'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création du compte.' });
  }
});

// Auth Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`🔑 Tentative de connexion pour: ${email}`);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'E-mail et mot de passe obligatoires.' });
  }

  // 1. VÉRIFICATION ADMIN VIA .ENV (BYPASS BAZ DONE)
  const envAdminEmail = process.env.ADMIN_EMAIL || 'admin@panyenlokal.com';
  const envAdminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (email.toLowerCase() === envAdminEmail.toLowerCase() && password === envAdminPass) {
    console.log(`🚀 CONNEXION ADMIN RÉUSSIE VIA .ENV : ${email}`);

    // Nou chache detay yo nan DB si yo la, sinon nou bay yon objè default
    let adminData: any = {
      id: 'admin-fix-01',
      full_name: 'Admin Panyen Lokal',
      email: envAdminEmail,
      role: 'admin',
      preferred_region: 'haiti',
      created_at: new Date().toISOString()
    };

    try {
      const users = await query<any[]>('SELECT * FROM users WHERE email = ?', [envAdminEmail.toLowerCase()]);
      if (users && users.length > 0) adminData = users[0];
    } catch {}

    return res.json({
      success: true,
      user: {
        id: adminData.id,
        fullName: adminData.full_name || adminData.fullName,
        email: adminData.email,
        role: 'admin',
        preferredRegion: adminData.preferred_region || 'haiti',
        createdAt: adminData.created_at
      },
      token: `pl_tok_admin`,
      message: 'Bienvenue dans votre Espace Administrateur !'
    });
  }

  // 2. VÉRIFICATION UTILISATEUR NORMAL VIA BAZ DONE
  try {
    const users = await query<any[]>('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

    if (!users || users.length === 0) {
      console.log(`❌ Utilisateur non trouvé: ${email}`);
      return res.status(401).json({ success: false, message: 'E-mail ou mot de passe incorrect.' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      console.log(`❌ Mot de passe incorrect pour: ${email}`);
      return res.status(401).json({ success: false, message: 'E-mail ou mot de passe incorrect.' });
    }

    console.log(`✅ Connexion réussie pour: ${email}`);

    // ... rès kòd la pou itilizatè nòmal ...
    res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        preferredRegion: user.preferred_region,
        createdAt: user.created_at
      },
      token: `pl_tok_${user.id}`
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la connexion.' });
  }
});

// Orders creation & preparation endpoint
app.post('/api/orders', async (req, res) => {
  const orderData = req.body;
  
  if (!orderData.userId || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Un compte et au moins un article sont obligatoires pour commander.' });
  }

  try {
    const id = `ord-${Date.now()}`;
    const orderNumber = `PL-${orderData.region ? orderData.region.toUpperCase().substring(0, 3) : 'HT'}-${Date.now().toString().slice(-6)}`;
    const estimatedDelivery = orderData.region === 'usa'
      ? '4 - 7 jours ouvrés (Fret exportation États-Unis)'
      : orderData.region === 'dominican_republic' 
      ? '2 - 4 jours ouvrés (Couloir Saint-Domingue)'
      : '24h - 48h (Livraison Haïti)';

    // Insert order
    await query(
      `INSERT INTO orders (id, order_number, user_id, region, subtotal_usd, shipping_fee_usd, total_usd, total_local, currency, payment_method, payment_status, status, estimated_delivery, delivery_street, delivery_city, delivery_country, delivery_notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        orderNumber,
        orderData.userId,
        orderData.region,
        orderData.subtotalUSD,
        orderData.exportShippingFeeUSD || 0,
        orderData.totalUSD,
        orderData.totalLocal,
        orderData.currency,
        orderData.paymentMethod,
        orderData.paymentStatus || 'en_attente',
        'en_preparation',
        estimatedDelivery,
        orderData.deliveryAddress.street,
        orderData.deliveryAddress.city,
        orderData.deliveryAddress.country,
        orderData.deliveryAddress.notes || ''
      ]
    );

    // Insert items
    for (const item of orderData.items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, product_title, selected_format, quantity, unit_price_usd, total_price_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, item.productId, item.productTitle, item.selectedFormat, item.quantity, item.unitPriceUSD, item.totalUSD]
      );
    }

    res.json({
      success: true,
      order: { ...orderData, id, orderNumber, estimatedDelivery, status: 'en_preparation' },
      message: 'Votre commande a été enregistrée pour préparation avec succès au centre de distribution Panyen Lokal S.A.'
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création de la commande.' });
  }
});

// Get user's orders
app.get('/api/orders/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await query<any[]>('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);

    // For each order, fetch items
    const ordersWithItems = await Promise.all(orders.map(async (ord) => {
      const items = await query<any[]>('SELECT * FROM order_items WHERE order_id = ?', [ord.id]);
      return {
        ...ord,
        orderNumber: ord.order_number,
        deliveryAddress: {
          street: ord.delivery_street,
          city: ord.delivery_city,
          country: ord.delivery_country,
          notes: ord.delivery_notes
        },
        items: items.map(it => ({
          productId: it.product_id,
          productTitle: it.product_title,
          selectedFormat: it.selected_format,
          quantity: it.quantity,
          unitPriceUSD: parseFloat(it.unit_price_usd),
          totalUSD: parseFloat(it.total_price_usd)
        })),
        subtotalUSD: parseFloat(ord.subtotal_usd),
        exportShippingFeeUSD: parseFloat(ord.shipping_fee_usd),
        totalUSD: parseFloat(ord.total_usd),
        totalLocal: parseFloat(ord.total_local),
        createdAt: ord.created_at
      };
    }));

    res.json({
      success: true,
      orders: ordersWithItems
    });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des commandes.' });
  }
});

// B2B Quote Submission Endpoint
app.post('/api/b2b-quote', async (req, res) => {
  const quoteData = req.body;
  try {
    const referenceNumber = `PL-B2B-${Date.now().toString().slice(-6)}`;
    await query(
      `INSERT INTO b2b_quotes (reference_number, company_name, contact_person, email, phone, destination_country, industry, incoterm, requirements)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        referenceNumber,
        quoteData.companyName,
        quoteData.contactPerson,
        quoteData.email,
        quoteData.phone,
        quoteData.country,
        quoteData.industry,
        quoteData.incoterm,
        quoteData.customRequirements || ''
      ]
    );

    res.json({
      success: true,
      reference: referenceNumber,
      message: 'Votre demande de devis a été enregistrée avec succès. Notre département commercial vous contactera sous 24 heures.',
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('B2B Quote error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement du devis.' });
  }
});

// Contact Endpoint
app.post('/api/contact', (req, res) => {
  const contactData = req.body;
  console.log('Nouveau message de contact reçu:', contactData);
  res.json({
    success: true,
    reference: `PL-MSG-${Date.now().toString().slice(-6)}`,
    message: 'Merci pour votre message. L\'équipe PANYEN LOKAL S.A. vous répondra dans les plus brefs délais.'
  });
});

// ---------------------------------------------------------
// ADMIN PANEL ENDPOINTS
// ---------------------------------------------------------

// Middleware to check if user is admin
const isAdmin = async (req: any, res: any, next: any) => {
  const userId = req.headers['x-user-id']; // Simple header check for demo
  if (!userId) return res.status(403).json({ success: false, message: 'Non autorisé.' });

  try {
    const users = await query<any[]>('SELECT role FROM users WHERE id = ?', [userId]);
    if (users && users[0]?.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Accès administrateur requis.' });
    }
  } catch {
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

// Get all orders (Admin)
app.get('/api/admin/orders', isAdmin, async (req, res) => {
  try {
    const orders = await query<any[]>('SELECT * FROM orders ORDER BY created_at DESC');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des commandes.' });
  }
});

// Update order status (Admin)
app.patch('/api/admin/orders/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, trackingNumber, paymentStatus } = req.body;
  try {
    await query(
      'UPDATE orders SET status = ?, tracking_number = ?, payment_status = ? WHERE id = ?',
      [status, trackingNumber || null, paymentStatus, id]
    );
    res.json({ success: true, message: 'Commande mise à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour.' });
  }
});

// Get all B2B Quotes (Admin)
app.get('/api/admin/quotes', isAdmin, async (req, res) => {
  try {
    const quotes = await query<any[]>('SELECT * FROM b2b_quotes ORDER BY created_at DESC');
    res.json({ success: true, quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur.' });
  }
});

// Get Dashboard Stats (Admin)
app.get('/api/admin/stats', isAdmin, async (req, res) => {
  try {
    const orderCount = await query<any[]>('SELECT COUNT(*) as count FROM orders');
    const totalRevenue = await query<any[]>('SELECT SUM(total_usd) as revenue FROM orders WHERE payment_status = "paye"');
    const userCount = await query<any[]>('SELECT COUNT(*) as count FROM users');
    const pendingOrders = await query<any[]>('SELECT COUNT(*) as count FROM orders WHERE status = "en_preparation"');

    res.json({
      success: true,
      stats: {
        totalOrders: orderCount[0].count,
        revenue: totalRevenue[0].revenue || 0,
        users: userCount[0].count,
        pending: pendingOrders[0].count
      }
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Get all products (Public)
app.get('/api/products', async (req, res) => {
  try {
    const products = await query<any[]>('SELECT * FROM products WHERE in_stock = 1 ORDER BY is_featured DESC, created_at DESC');
    const formatted = await Promise.all(products.map(async (p) => {
      const formats = await query<any[]>('SELECT * FROM product_formats WHERE product_id = ?', [p.id]);
      return {
        ...p,
        image: p.image_url,
        highlights: p.highlights ? JSON.parse(p.highlights) : [],
        ingredients: p.ingredients ? JSON.parse(p.ingredients) : [],
        usageInstructions: p.usage_instructions ? JSON.parse(p.usage_instructions) : [],
        technicalSpecs: p.technical_specs ? JSON.parse(p.technical_specs) : {},
        certifications: p.certifications ? JSON.parse(p.certifications) : [],
        gallery: p.gallery ? JSON.parse(p.gallery) : [],
        formatPricing: formats.reduce((acc, f) => {
          acc[f.format_name] = {
            format: f.format_name,
            priceUSD: parseFloat(f.price_usd),
            priceHTG: parseFloat(f.price_htg),
            unit: f.unit,
            type: f.type,
            moq: f.moq,
            weightKg: parseFloat(f.weight_kg)
          };
          return acc;
        }, {} as any)
      };
    }));
    res.json({ success: true, products: formatted });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Get all products (Admin)
app.get('/api/admin/products', isAdmin, async (req, res) => {
  try {
    const products = await query<any[]>('SELECT * FROM products ORDER BY created_at DESC');
    const formatted = products.map(p => ({
      ...p,
      highlights: p.highlights ? JSON.parse(p.highlights) : [],
      ingredients: p.ingredients ? JSON.parse(p.ingredients) : [],
      usageInstructions: p.usage_instructions ? JSON.parse(p.usage_instructions) : [],
      technicalSpecs: p.technical_specs ? JSON.parse(p.technical_specs) : {},
      certifications: p.certifications ? JSON.parse(p.certifications) : [],
      gallery: p.gallery ? JSON.parse(p.gallery) : [],
      imageUrl: p.image_url // map DB to frontend key if needed
    }));
    res.json({ success: true, products: formatted });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Update product stock (Admin)
app.patch('/api/admin/products/:id/stock', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { inStock } = req.body;
  try {
    await query('UPDATE products SET in_stock = ? WHERE id = ?', [inStock, id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Get all users (Admin)
app.get('/api/admin/users', isAdmin, async (req, res) => {
  try {
    const users = await query<any[]>('SELECT id, full_name, email, phone, role, preferred_region, company_name, created_at FROM users ORDER BY created_at DESC');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// Update user role (Admin)
app.patch('/api/admin/users/:id/role', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.json({ success: true, message: 'Rôle mis à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du rôle.' });
  }
});

// Create product (Admin)
app.post('/api/admin/products', isAdmin, async (req, res) => {
  const p = req.body;
  const id = p.id || `prod-${Date.now()}`;
  try {
    await query(
      `INSERT INTO products (id, title, slug, slogan, category, short_description, description, image_url, is_featured, in_stock, origin, terroir_location, badge, highlights, ingredients, usage_instructions, technical_specs, certifications, gallery)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, p.title, p.slug, p.slogan || '', p.category, p.shortDescription, p.description, p.image,
        p.isFeatured ? 1 : 0, p.inStock ? 1 : 0, p.origin, p.terroirLocation, p.badge || '',
        JSON.stringify(p.highlights || []), JSON.stringify(p.ingredients || []),
        JSON.stringify(p.usageInstructions || []), JSON.stringify(p.technicalSpecs || {}),
        JSON.stringify(p.certifications || []), JSON.stringify(p.gallery || [])
      ]
    );
    res.json({ success: true, message: 'Produit créé avec succès.', productId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création.' });
  }
});

// Update product (Admin)
app.put('/api/admin/products/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const p = req.body;
  try {
    await query(
      `UPDATE products SET
        title = ?, slug = ?, slogan = ?, category = ?, short_description = ?, description = ?, image_url = ?,
        is_featured = ?, in_stock = ?, origin = ?, terroir_location = ?, badge = ?,
        highlights = ?, ingredients = ?, usage_instructions = ?, technical_specs = ?, certifications = ?, gallery = ?
       WHERE id = ?`,
      [
        p.title, p.slug, p.slogan, p.category, p.shortDescription, p.description, p.image,
        p.isFeatured ? 1 : 0, p.inStock ? 1 : 0, p.origin, p.terroirLocation, p.badge,
        JSON.stringify(p.highlights), JSON.stringify(p.ingredients),
        JSON.stringify(p.usageInstructions), JSON.stringify(p.technicalSpecs),
        JSON.stringify(p.certifications), JSON.stringify(p.gallery),
        id
      ]
    );
    res.json({ success: true, message: 'Produit mis à jour.' });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Delete product (Admin)
app.delete('/api/admin/products/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Produit supprimé.' });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Get detailed analytics (Admin)
app.get('/api/admin/analytics', isAdmin, async (req, res) => {
  try {
    // Sales per product from order_items
    const salesData = await query<any[]>(`
      SELECT product_title as name, SUM(quantity) as sales
      FROM order_items
      GROUP BY product_id, product_title
      ORDER BY sales DESC
      LIMIT 5
    `);

    // Stock overview
    const stockData = await query<any[]>(`
      SELECT title as name, in_stock
      FROM products
    `);

    res.json({
      success: true,
      salesData: salesData.length > 0 ? salesData : [
        { name: 'Lwil Maskriti', sales: 45 },
        { name: 'Cognac', sales: 28 },
        { name: 'Chokola', sales: 32 },
        { name: 'Vin de Miel', sales: 15 }
      ], // Fallback mock if empty
      stockData
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Image Upload Endpoint (Admin)
app.post('/api/admin/upload', isAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Aucun fichier téléchargé.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// Vite middleware configuration for Development & Production
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', async () => {
    console.log(`🌿 Serveur Panyen Lokal S.A. opérationnel sur http://localhost:${PORT}`);

    // Test database connection & Auto-fix Admin
    try {
      await query('SELECT 1');
      console.log('✅ Connexion MySQL réussie !');

      // Gid pou asire Admin lan toujou gen bon modpas nan devlopman
      const adminEmail = 'admin@panyenlokal.com';
      const defaultPassword = 'admin123';
      const hash = await bcrypt.hash(defaultPassword, 10);

      await query(
        `UPDATE users SET password_hash = ? WHERE email = ? AND role = 'admin'`,
        [hash, adminEmail]
      );
      console.log(`🔐 Modpas Admin otomatikman reset sou: ${defaultPassword}`);

    } catch (err) {
      console.error('❌ Erreur de connexion MySQL. Vérifiez WAMP et le fichier .env.');
    }
  });
}

start();
