// =====================================================================
// serve.mjs — servidor estático simples para testar dist/ localmente.
// Rode com: npm run serve
// =====================================================================

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORTA = process.env.PORT || 8080;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

async function resolverCaminho(urlPath) {
  let alvo = path.join(DIST, decodeURIComponent(urlPath));
  try {
    const info = await stat(alvo);
    if (info.isDirectory()) alvo = path.join(alvo, 'index.html');
  } catch {
    if (!path.extname(alvo)) alvo = path.join(alvo, 'index.html');
  }
  return alvo;
}

const servidor = createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];
  const alvo = await resolverCaminho(urlPath);

  if (!alvo.startsWith(DIST)) {
    res.writeHead(403);
    res.end('Proibido');
    return;
  }

  try {
    const conteudo = await readFile(alvo);
    const ext = path.extname(alvo);
    res.writeHead(200, { 'Content-Type': TIPOS[ext] || 'application/octet-stream' });
    res.end(conteudo);
  } catch {
    try {
      const pagina404 = await readFile(path.join(DIST, 'index.html'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(pagina404);
    } catch {
      res.writeHead(404);
      res.end('Não encontrado');
    }
  }
});

servidor.listen(PORTA, () => {
  console.log(`Servindo dist/ em http://localhost:${PORTA}`);
});
