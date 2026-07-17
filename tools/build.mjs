// =====================================================================
// build.mjs — gera o site estático completo em /dist:
// HTML de cada página, cópia de /assets, favicon.svg, robots.txt e
// sitemap.xml. Rode com: npm run build
// =====================================================================

import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE, FAVICON_SVG } from './layout.mjs';
import { gerarPaginaHome } from './paginas-home.mjs';
import { gerarPaginasTemas } from './paginas-temas.mjs';
import { gerarPaginasSalmos } from './paginas-salmos.mjs';
import { gerarPaginasFerramentas } from './paginas-ferramentas.mjs';
import { gerarPaginasGuias } from './paginas-guias.mjs';
import { gerarPaginasInstitucionais } from './paginas-institucionais.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, '..');
const DIST = path.join(RAIZ, 'dist');

async function gerarPaginas() {
  return [
    gerarPaginaHome(),
    ...gerarPaginasTemas(),
    ...gerarPaginasSalmos(),
    ...gerarPaginasFerramentas(),
    ...gerarPaginasGuias(),
    ...gerarPaginasInstitucionais(),
  ];
}

async function escreverPagina({ caminho, html }) {
  const destino =
    caminho === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, caminho.replace(/^\/|\/$/g, ''), 'index.html');
  await mkdir(path.dirname(destino), { recursive: true });
  await writeFile(destino, html, 'utf8');
}

function gerarRobots() {
  return `User-agent: *
Allow: /

User-agent: Mediapartners-Google
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
}

function gerarSitemap(paginas) {
  const hoje = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .map(({ caminho }) => {
      const prioridade = caminho === '/' ? '1.0' : '0.7';
      const freq = caminho === '/' || caminho === '/versiculo-do-dia/' ? 'daily' : 'monthly';
      return `  <url>
    <loc>${SITE.url}${caminho}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prioridade}</priority>
  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  console.log('→ Limpando dist/ ...');
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  console.log('→ Gerando páginas ...');
  const paginas = await gerarPaginas();
  for (const p of paginas) {
    await escreverPagina(p);
  }
  console.log(`  ${paginas.length} páginas geradas.`);

  console.log('→ Copiando assets ...');
  await cp(path.join(RAIZ, 'assets'), path.join(DIST, 'assets'), { recursive: true });

  console.log('→ Gerando favicon.svg ...');
  await writeFile(path.join(DIST, 'favicon.svg'), FAVICON_SVG, 'utf8');

  console.log('→ Gerando robots.txt ...');
  await writeFile(path.join(DIST, 'robots.txt'), gerarRobots(), 'utf8');

  console.log('→ Gerando sitemap.xml ...');
  await writeFile(path.join(DIST, 'sitemap.xml'), gerarSitemap(paginas), 'utf8');

  console.log(`\n✓ Build completo em ${DIST}`);
  console.log(`  Páginas indexáveis: ${paginas.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
