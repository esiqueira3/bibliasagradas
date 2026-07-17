// =====================================================================
// paginas-salmos.mjs — hub /salmos/ + uma página por salmo estudado.
// =====================================================================

import { pagina, migalhas, faq, faqJsonLd, adSlot, ORNAMENTO, esc } from './layout.mjs';
import { SALMOS } from './data-salmos.mjs';

function paginaSalmo(salmo) {
  const outros = SALMOS.filter((s) => s.slug !== salmo.slug);
  const textoCompleto = salmo.versos.map((v) => `${v.n} ${v.texto}`).join('\n');

  const conteudo = `
<section class="hero hero-interna hero-salmo">
  <div class="container">
    ${migalhas([
      { rotulo: 'Início', href: '/' },
      { rotulo: 'Salmos', href: '/salmos/' },
      { rotulo: `Salmo ${salmo.numero}` },
    ])}
    <p class="hero-selo">📖 ${esc(salmo.subtitulo)}</p>
    <h1>${esc(salmo.titulo)}</h1>
    <p class="hero-frase">“${esc(salmo.versos[0].texto)}”</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <article class="prosa">
    ${salmo.intro.map((p) => `<p>${p}</p>`).join('\n    ')}
  </article>

  ${ORNAMENTO}

  <section class="salmo-texto" aria-label="Texto completo do Salmo ${salmo.numero}">
    <header class="salmo-cabecalho">
      <h2>Salmo ${salmo.numero} completo</h2>
      <button type="button" class="copiar" data-copiar="Salmo ${salmo.numero}\n${esc(textoCompleto)}\n(Bíblia Sagrada, tradução Almeida)" aria-label="Copiar o Salmo ${salmo.numero} completo">Copiar salmo</button>
    </header>
    ${salmo.versos
      .map(
        (v) => `<p class="salmo-verso"><sup>${v.n}</sup> ${esc(v.texto)}</p>`
      )
      .join('\n    ')}
    <p class="salmo-fonte">Tradução João Ferreira de Almeida — Revista e Corrigida (domínio público).</p>
  </section>

  ${adSlot(`salmo-${salmo.numero}-meio`)}

  <article class="prosa">
    <h2>Explicação do Salmo ${salmo.numero}</h2>
    ${salmo.explicacao
      .map((e) => `<h3>${esc(e.titulo)}</h3>\n    <p>${e.texto}</p>`)
      .join('\n    ')}
  </article>

  <aside class="caixa-quando-ler">
    <h2>Quando ler o Salmo ${salmo.numero}</h2>
    <ul>
      ${salmo.quandoLer.map((q) => `<li>${esc(q)}</li>`).join('\n      ')}
    </ul>
  </aside>

  ${faq(salmo.faq)}

  ${adSlot(`salmo-${salmo.numero}-rodape`)}

  <nav class="relacionados" aria-label="Outros salmos">
    <h2>Continue nos Salmos</h2>
    <ul class="chips">
      ${outros.map((s) => `<li><a class="chip" href="/${s.slug}/">Salmo ${s.numero}</a></li>`).join('\n      ')}
      <li><a class="chip chip-destaque" href="/salmos/">Todos os salmos →</a></li>
    </ul>
  </nav>
</div>`;

  return {
    caminho: `/${salmo.slug}/`,
    html: pagina({
      titulo: `${salmo.titulo} — texto completo e explicação`,
      descricao: salmo.descricao,
      caminho: `/${salmo.slug}/`,
      conteudo,
      jsonLd: faqJsonLd(salmo.faq),
    }),
  };
}

function hubSalmos() {
  const cartoes = SALMOS.slice()
    .sort((a, b) => a.numero - b.numero)
    .map(
      (s) => `
    <a class="cartao-tema cartao-salmo" href="/${s.slug}/">
      <span class="cartao-salmo-numero" aria-hidden="true">${s.numero}</span>
      <h2>Salmo ${s.numero}</h2>
      <p>“${esc(s.versos[0].texto)}”</p>
      <span class="cartao-tema-cta">Ler completo com explicação →</span>
    </a>`
    )
    .join('\n');

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Salmos' }])}
    <p class="hero-selo">📖 O livro de orações da Bíblia</p>
    <h1>Salmos para Ler, Orar e Meditar</h1>
    <p class="hero-frase">Os salmos mais amados da Bíblia, completos e explicados versículo por versículo — do Salmo 23 ao Salmo 91.</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <article class="prosa">
    <p>O livro de Salmos é o coração devocional da Bíblia: 150 poemas que ensinaram gerações a orar em qualquer
    circunstância — na alegria e no luto, no medo e na vitória, na gratidão e no silêncio de Deus. João Calvino o chamou
    de "anatomia de todas as partes da alma": não há emoção humana que os Salmos não transformem em oração.</p>
    <p>Selecionamos abaixo os salmos mais lidos e buscados, cada um em página própria com o <strong>texto completo</strong>
    na tradução Almeida, <strong>explicação por blocos</strong>, sugestões de quando ler e perguntas frequentes.</p>
  </article>

  ${ORNAMENTO}

  <div class="grade-temas">
    ${cartoes}
  </div>

  ${adSlot('hub-salmos')}

  <article class="prosa">
    <h2>Como os Salmos se dividem</h2>
    <p>O Saltério é organizado em cinco livros (1–41, 42–72, 73–89, 90–106 e 107–150), cada um encerrado com uma doxologia
    — um louvor final. Entre seus autores estão Davi (73 salmos), Asafe, os filhos de Corá, Salomão, Moisés e outros.
    Há salmos de louvor, de lamento (os mais numerosos), de gratidão, de confiança, salmos reais e os "cânticos dos degraus"
    que os peregrinos entoavam a caminho de Jerusalém.</p>
    <p>Uma prática antiga e simples: ler um salmo por dia, seguindo o número do dia do mês — e somar 30, 60, 90, 120 para
    ler cinco por dia e completar o livro em um mês. Para um caminho guiado, veja nosso
    <a href="/plano-de-leitura/">Plano de Leitura anual</a>.</p>
  </article>
</div>`;

  return {
    caminho: '/salmos/',
    html: pagina({
      titulo: 'Salmos — os mais amados, completos e explicados',
      descricao:
        'Salmo 23, Salmo 91, Salmo 121 e outros salmos completos com explicação versículo por versículo, contexto histórico e quando ler cada um.',
      caminho: '/salmos/',
      conteudo,
    }),
  };
}

export function gerarPaginasSalmos() {
  return [hubSalmos(), ...SALMOS.map(paginaSalmo)];
}
