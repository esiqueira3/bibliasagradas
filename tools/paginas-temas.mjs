// =====================================================================
// paginas-temas.mjs — hub /versiculos/ + uma página por tema.
// =====================================================================

import { pagina, migalhas, cartaoVersiculo, faq, faqJsonLd, adSlot, ORNAMENTO, esc } from './layout.mjs';
import { TEMAS } from './data-temas.mjs';

function paginaTema(tema) {
  const outros = TEMAS.filter((t) => t.slug !== tema.slug).slice(0, 6);
  const meio = Math.ceil(tema.versiculos.length / 2);

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([
      { rotulo: 'Início', href: '/' },
      { rotulo: 'Versículos', href: '/versiculos/' },
      { rotulo: tema.titulo },
    ])}
    <p class="hero-selo">${esc(tema.emoji)} Versículos por tema</p>
    <h1>${esc(tema.titulo)}</h1>
    <p class="hero-frase">“${esc(tema.heroFrase)}”</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <article class="prosa">
    ${tema.intro.map((p) => `<p>${p}</p>`).join('\n    ')}
  </article>

  ${ORNAMENTO}

  <section class="grade-versiculos" aria-label="Versículos sobre ${esc(tema.tema)}">
    ${tema.versiculos.slice(0, meio).map((v, i) => cartaoVersiculo({ ...v, destaque: i === 0 })).join('\n')}
  </section>

  ${adSlot(`tema-${tema.slug}-meio`)}

  <section class="grade-versiculos" aria-label="Mais versículos sobre ${esc(tema.tema)}">
    ${tema.versiculos.slice(meio).map((v) => cartaoVersiculo(v)).join('\n')}
  </section>

  ${ORNAMENTO}

  <article class="prosa caixa-reflexao">
    <h2>Para meditar</h2>
    <p>${tema.reflexao}</p>
  </article>

  ${faq(tema.faq)}

  ${adSlot(`tema-${tema.slug}-rodape`)}

  <nav class="relacionados" aria-label="Outros temas">
    <h2>Explore outros temas</h2>
    <ul class="chips">
      ${outros.map((t) => `<li><a class="chip" href="/${t.slug}/">${esc(t.emoji)} ${esc(t.tema)}</a></li>`).join('\n      ')}
      <li><a class="chip chip-destaque" href="/versiculos/">Todos os temas →</a></li>
    </ul>
  </nav>
</div>`;

  return {
    caminho: `/${tema.slug}/`,
    html: pagina({
      titulo: `${tema.titulo} — ${tema.versiculos.length} textos bíblicos para guardar no coração`,
      descricao: tema.descricao,
      caminho: `/${tema.slug}/`,
      conteudo,
      jsonLd: faqJsonLd(tema.faq),
    }),
  };
}

function hubVersiculos() {
  const cartoes = TEMAS.map(
    (t) => `
    <a class="cartao-tema" href="/${t.slug}/">
      <span class="cartao-tema-emoji" aria-hidden="true">${esc(t.emoji)}</span>
      <h2>${esc(t.titulo)}</h2>
      <p>“${esc(t.heroFrase)}”</p>
      <span class="cartao-tema-cta">${t.versiculos.length} versículos →</span>
    </a>`
  ).join('\n');

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Versículos por tema' }])}
    <p class="hero-selo">✦ Biblioteca de versículos</p>
    <h1>Versículos Bíblicos por Tema</h1>
    <p class="hero-frase">Encontre a palavra certa para cada momento — ${TEMAS.length} temas, ${TEMAS.reduce((s, t) => s + t.versiculos.length, 0)} versículos selecionados um a um, com explicação e contexto.</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <article class="prosa">
    <p>A Bíblia tem uma palavra para cada estação da vida — e nem sempre é fácil encontrá-la na hora em que mais precisamos.
    Por isso organizamos os versículos mais amados da Escritura em coleções temáticas: cada página traz os textos na tradução
    Almeida, uma introdução que situa o tema, uma reflexão para meditar e respostas às dúvidas mais comuns.</p>
    <p>Escolha um tema abaixo e boa leitura. Para receber um texto novo a cada dia, visite o
    <a href="/versiculo-do-dia/">Versículo do Dia</a>.</p>
  </article>

  ${ORNAMENTO}

  <div class="grade-temas">
    ${cartoes}
  </div>

  ${adSlot('hub-versiculos')}
</div>`;

  return {
    caminho: '/versiculos/',
    html: pagina({
      titulo: 'Versículos Bíblicos por Tema — amor, fé, força, paz e muito mais',
      descricao:
        'Coleções de versículos bíblicos organizadas por tema: amor, fé, esperança, força, ansiedade, paz, gratidão, família e outros — com explicação e contexto.',
      caminho: '/versiculos/',
      conteudo,
    }),
  };
}

export function gerarPaginasTemas() {
  return [hubVersiculos(), ...TEMAS.map(paginaTema)];
}
