// =====================================================================
// layout.mjs — identidade do site, template de página, navegação global
// Toda página do site passa por pagina() — garante <head> completo,
// menu, rodapé, banner de cookies e slots de anúncio em 100% das rotas.
// =====================================================================

export const SITE = {
  nome: 'Bíblias Sagradas',
  dominio: 'www.bibliasagradas.com.br',
  url: 'https://www.bibliasagradas.com.br',
  email: 'contato@bibliasagradas.com.br',
  slogan: 'A Palavra que ilumina todos os dias',
  descricao:
    'Versículos bíblicos por tema, Salmos completos com explicação, versículo do dia, ' +
    'plano de leitura anual e guias para conhecer a Bíblia Sagrada em profundidade.',
  traducao: 'Almeida Revista e Corrigida (domínio público)',
  anoFundacao: 2026,
  adsenseClientId: '', // Insira seu ca-pub-XXXXXXXXXXXXXXXX aqui para ativar o AdSense
  googleAnalyticsId: 'G-3G8QNZ9L9T', // Tag do Google Analytics
};

export function esc(texto = '') {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Ornamento tipográfico usado como divisor de seções (estilo manuscrito iluminado)
export const ORNAMENTO = `
<div class="ornamento" aria-hidden="true">
  <span class="ornamento-linha"></span>
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 1 L15.6 10.4 L25 13 L15.6 15.6 L13 25 L10.4 15.6 L1 13 L10.4 10.4 Z" fill="currentColor"/>
  </svg>
  <span class="ornamento-linha"></span>
</div>`;

// Slot de anúncio reservado (checklist AdSense item 12): placeholder neutro,
// claramente separado do conteúdo. Após aprovação, o código do AdSense é
// colado dentro de cada .ad-slot sem alterar o layout.
export function adSlot(id) {
  return `
<aside class="ad-slot" id="ad-${esc(id)}" aria-label="Espaço reservado para publicidade">
  <span>Publicidade</span>
</aside>`;
}

export const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#1d1710"/>
  <path d="M32 14 C26 9 16 9 12 12 L12 48 C16 45 26 45 32 50 C38 45 48 45 52 48 L52 12 C48 9 38 9 32 14 Z" fill="none" stroke="#c9a24b" stroke-width="3" stroke-linejoin="round"/>
  <line x1="32" y1="15" x2="32" y2="49" stroke="#c9a24b" stroke-width="3"/>
  <line x1="32" y1="24" x2="32" y2="38" stroke="#f3e3bb" stroke-width="3" transform="rotate(0 32 31)"/>
  <line x1="26" y1="29" x2="38" y2="29" stroke="#f3e3bb" stroke-width="3"/>
</svg>`;

const MENU = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Versículos', href: '/versiculos/' },
  { rotulo: 'Salmos', href: '/salmos/' },
  { rotulo: 'Versículo do Dia', href: '/versiculo-do-dia/' },
  { rotulo: 'Plano de Leitura', href: '/plano-de-leitura/' },
  { rotulo: 'Guias', href: '/guias/' },
];

function nav(caminhoAtual) {
  const itens = MENU.map((item) => {
    const ativo = item.href === caminhoAtual ? ' aria-current="page"' : '';
    return `<li><a href="${item.href}"${ativo}>${esc(item.rotulo)}</a></li>`;
  }).join('\n        ');
  return `
<header class="site-header">
  <div class="container header-inner">
    <a class="marca" href="/" aria-label="${esc(SITE.nome)} — página inicial">
      <span class="marca-icone" aria-hidden="true">✦</span>
      <span class="marca-texto">Bíblias<em>Sagradas</em></span>
    </a>
    <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-principal">
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" id="menu-principal" aria-label="Navegação principal">
      <ul>
        ${itens}
      </ul>
    </nav>
  </div>
</header>`;
}

const FOOTER = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col footer-marca">
        <p class="marca-texto footer-logo">Bíblias<em>Sagradas</em></p>
        <p>${esc(SITE.slogan)}. Conteúdo bíblico gratuito, organizado com carinho para leitura, estudo e meditação diária.</p>
        <p class="footer-versao">Texto bíblico: ${esc(SITE.traducao)}.</p>
      </div>
      <div class="footer-col">
        <h3>Versículos por tema</h3>
        <ul>
          <li><a href="/versiculos-de-amor/">Amor</a></li>
          <li><a href="/versiculos-de-fe/">Fé</a></li>
          <li><a href="/versiculos-de-esperanca/">Esperança</a></li>
          <li><a href="/versiculos-de-forca/">Força</a></li>
          <li><a href="/versiculos-para-ansiedade/">Ansiedade</a></li>
          <li><a href="/versiculos/">Ver todos os temas →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Salmos e ferramentas</h3>
        <ul>
          <li><a href="/salmo-23/">Salmo 23</a></li>
          <li><a href="/salmo-91/">Salmo 91</a></li>
          <li><a href="/versiculo-do-dia/">Versículo do dia</a></li>
          <li><a href="/gerador-de-versiculos/">Gerador de versículos</a></li>
          <li><a href="/plano-de-leitura/">Plano de leitura anual</a></li>
          <li><a href="/quiz-biblico/">Quiz bíblico</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Conhecer a Bíblia</h3>
        <ul>
          <li><a href="/livros-da-biblia/">Os 66 livros da Bíblia</a></li>
          <li><a href="/como-ler-a-biblia/">Como ler a Bíblia</a></li>
          <li><a href="/historia-da-biblia/">História da Bíblia</a></li>
          <li><a href="/traducoes-da-biblia/">Traduções em português</a></li>
          <li><a href="/quem-escreveu-a-biblia/">Quem escreveu a Bíblia</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Institucional</h3>
        <ul>
          <li><a href="/sobre/">Sobre o site</a></li>
          <li><a href="/contato/">Contato</a></li>
          <li><a href="/politica-de-privacidade/">Política de Privacidade</a></li>
          <li><a href="/termos-de-uso/">Termos de Uso</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-base">
      <p>© ${SITE.anoFundacao} ${esc(SITE.nome)} — ${esc(SITE.dominio)}. Projeto independente e sem fins denominacionais.</p>
      <p>Este site tem caráter devocional e informativo; não substitui a orientação de líderes religiosos, nem aconselhamento profissional de saúde, jurídico ou financeiro.</p>
    </div>
  </div>
</footer>

<div class="cookie-banner" id="cookie-banner" role="dialog" aria-live="polite" aria-label="Aviso de cookies" hidden>
  <p>Usamos cookies para melhorar sua experiência e, futuramente, exibir anúncios personalizados
  (Google AdSense). Saiba mais na nossa <a href="/politica-de-privacidade/">Política de Privacidade</a>.</p>
  <div class="cookie-acoes">
    <button type="button" class="botao botao-ouro" data-cookie="aceitar">Aceitar</button>
    <button type="button" class="botao botao-borda" data-cookie="recusar">Apenas essenciais</button>
  </div>
</div>`;

/**
 * Template único de página.
 * @param {object} p
 * @param {string} p.titulo     — <title> (sem o sufixo do site)
 * @param {string} p.descricao  — meta description (~150 caracteres)
 * @param {string} p.caminho    — caminho canônico começando e terminando com "/"
 * @param {string} p.conteudo   — HTML do <main>
 * @param {string} [p.classeBody] — classe extra no <body>
 * @param {string} [p.jsonLd]     — bloco JSON-LD adicional (schema.org)
 */
export function pagina({ titulo, descricao, caminho, conteudo, classeBody = '', jsonLd = '' }) {
  const urlCanonica = `${SITE.url}${caminho}`;
  const tituloCompleto = caminho === '/' ? `${SITE.nome} — ${titulo}` : `${titulo} | ${SITE.nome}`;
  const schemaSite = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.nome,
    url: SITE.url,
    description: SITE.descricao,
    inLanguage: 'pt-BR',
  });
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(tituloCompleto)}</title>
  <meta name="description" content="${esc(descricao)}">
  <link rel="canonical" href="${urlCanonica}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.nome)}">
  <meta property="og:title" content="${esc(tituloCompleto)}">
  <meta property="og:description" content="${esc(descricao)}">
  <meta property="og:url" content="${urlCanonica}">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#1d1710">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css">
  <script type="application/ld+json">${schemaSite}</script>${jsonLd ? `\n  <script type="application/ld+json">${jsonLd}</script>` : ''}${SITE.adsenseClientId ? `\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(SITE.adsenseClientId)}" crossorigin="anonymous"></script>` : ''}${SITE.googleAnalyticsId ? `\n  <!-- Google tag (gtag.js) -->\n  <script async src="https://www.googletagmanager.com/gtag/js?id=${esc(SITE.googleAnalyticsId)}"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n    gtag('config', '${esc(SITE.googleAnalyticsId)}');\n  </script>` : ''}
</head>
<body${classeBody ? ` class="${esc(classeBody)}"` : ''}>
${nav(caminho)}
<main id="conteudo">
${conteudo}
</main>
${FOOTER}
<script src="/assets/js/app.js" defer></script>
</body>
</html>`;
}

/** Migalhas de pão (breadcrumb) com schema.org */
export function migalhas(trilha) {
  const itens = trilha
    .map((t, i) =>
      t.href
        ? `<li><a href="${t.href}">${esc(t.rotulo)}</a></li>`
        : `<li aria-current="page">${esc(t.rotulo)}</li>`
    )
    .join('<li class="migalha-sep" aria-hidden="true">›</li>');
  return `<nav class="migalhas" aria-label="Você está em"><ol>${itens}</ol></nav>`;
}

/** Cartão de versículo reutilizável (com botão copiar/compartilhar) */
export function cartaoVersiculo({ ref, texto, destaque = false }) {
  return `
<figure class="versiculo-cartao${destaque ? ' versiculo-destaque' : ''}">
  <blockquote>
    <p>“${esc(texto)}”</p>
  </blockquote>
  <figcaption>
    <cite>${esc(ref)}</cite>
    <button type="button" class="copiar" data-copiar="&ldquo;${esc(texto)}&rdquo; — ${esc(ref)}" aria-label="Copiar versículo ${esc(ref)}">Copiar</button>
  </figcaption>
</figure>`;
}

/** Bloco de FAQ com schema.org FAQPage embutido pela página chamadora */
export function faq(perguntas) {
  const html = perguntas
    .map(
      (p) => `
  <details class="faq-item">
    <summary>${esc(p.q)}</summary>
    <div class="faq-resposta"><p>${p.a}</p></div>
  </details>`
    )
    .join('');
  return `<section class="faq" aria-label="Perguntas frequentes"><h2>Perguntas frequentes</h2>${html}</section>`;
}

export function faqJsonLd(perguntas) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a.replace(/<[^>]+>/g, '') },
    })),
  });
}
