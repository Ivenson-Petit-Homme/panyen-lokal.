import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.warn('[prerender-seo] dist/index.html not found, skipping.');
  process.exit(0);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');
const baseUrl = (process.env.APP_URL || 'https://panyenlokal.com').replace(/\/+$/, '');

const routes = [
  {
    routePath: '/produits',
    title: 'Catalogue Produits Terroir – Panyen Lokal S.A. Haïti',
    description:
      'Commandez nos produits d’Haïti : Huile de Ricin Pure, Grand Tamar Cognac 43%, La Cerisière Vin de Miel et Chocolat Artisanal pur cacao.'
  },
  {
    routePath: '/a-propos',
    title: 'À Propos & Impact Rural – Panyen Lokal S.A. Haïti',
    description:
      'Plantation de 100 hectares et usine à Morne-à-Casse (Fort-Liberté), bureau à Caracol : création d’emplois et souveraineté agricole en Haïti.'
  },
  {
    routePath: '/marches-export',
    title: 'Export B2B & Devis Pro – Panyen Lokal S.A. Haïti',
    description:
      'Importez nos produits agro-industriels d’Haïti en gros : fûts d’huile de ricin, caisses export et logistique vers les États-Unis et l’international.'
  },
  {
    routePath: '/partenariats',
    title: 'Partenariats & Coopératives – Panyen Lokal S.A. Haïti',
    description:
      'Collaborez avec Panyen Lokal S.A. pour le développement agricole, l’apiculture, la transformation locale et l’exportation internationale.'
  },
  {
    routePath: '/contact',
    title: 'Contact & Bureaux Haïti / USA – Panyen Lokal S.A.',
    description:
      'Contactez Panyen Lokal S.A. à Caracol (Village EKAM, Haïti), Morne-à-Casse (Fort-Liberté) ou Lauderhill, Floride (USA).'
  }
];

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

for (const item of routes) {
  const canonicalUrl = `${baseUrl}${item.routePath}`;
  const safeTitle = escapeAttr(item.title);
  const safeDesc = escapeAttr(item.description);
  const safeCanonical = escapeAttr(canonicalUrl);

  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${safeCanonical}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${safeCanonical}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );

  const outDir = path.join(distDir, item.routePath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
}

console.log(`[prerender-seo] Generated ${routes.length} static route HTML files in dist/.`);
