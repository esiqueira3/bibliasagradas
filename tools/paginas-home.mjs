// =====================================================================
// paginas-home.mjs — a página inicial: hero editorial, versículo do dia,
// coleções em destaque, salmos, ferramentas e guias.
// =====================================================================

import { pagina, adSlot, ORNAMENTO, esc, SITE, cartaoVersiculo } from './layout.mjs';
import { TEMAS, TODOS_VERSICULOS } from './data-temas.mjs';
import { SALMOS } from './data-salmos.mjs';
import { LIVROS, TOTAL_CAPITULOS } from './data-livros.mjs';

export function gerarPaginaHome() {
  const temasDestaque = TEMAS.slice(0, 8);
  const dados = JSON.stringify(TODOS_VERSICULOS);

  const conteudo = `
<section class="hero hero-home">
  <div class="container">
    <p class="hero-selo">✦ ${esc(SITE.slogan)} ✦</p>
    <h1>“Lâmpada para os meus pés é a tua palavra<br class="quebra-grande"> e luz para o meu caminho.”</h1>
    <p class="hero-ref">Salmos 119:105</p>
    <p class="hero-sub">Versículos por tema, salmos explicados, plano de leitura anual e ferramentas devocionais —
    a Bíblia Sagrada organizada com beleza, profundidade e de graça.</p>
    <div class="hero-acoes">
      <a class="botao botao-ouro" href="/versiculo-do-dia/">Versículo de hoje ✦</a>
      <a class="botao botao-borda-clara" href="/versiculos/">Explorar por tema</a>
    </div>
  </div>
</section>

<section class="faixa-numeros" aria-label="O site em números">
  <div class="container faixa-numeros-grid">
    <div><strong>${TODOS_VERSICULOS.length}+</strong><span>versículos selecionados</span></div>
    <div><strong>${TEMAS.length}</strong><span>coleções temáticas</span></div>
    <div><strong>${SALMOS.length}</strong><span>salmos explicados</span></div>
    <div><strong>${LIVROS.length}</strong><span>livros resumidos</span></div>
    <div><strong>${TOTAL_CAPITULOS}</strong><span>capítulos no plano anual</span></div>
  </div>
</section>

<div class="container conteudo-pagina">

  <section class="secao-home" aria-labelledby="titulo-vdd">
    <header class="secao-cabecalho">
      <h2 id="titulo-vdd">A palavra de hoje</h2>
      <p>Um novo versículo a cada manhã — o mesmo para todos que visitam, como um devocional compartilhado.</p>
    </header>
    <section class="painel-ferramenta painel-home" id="painel-versiculo-dia">
      <p class="painel-data" id="vdd-data" aria-live="polite"></p>
      <blockquote class="painel-versiculo">
        <p id="vdd-texto">Carregando o versículo de hoje…</p>
        <cite id="vdd-ref"></cite>
      </blockquote>
      <p class="painel-tema" id="vdd-tema"></p>
      <div class="painel-acoes">
        <button type="button" class="botao botao-ouro" id="vdd-copiar">Copiar versículo</button>
        <a class="botao botao-borda" href="/versiculo-do-dia/">Ver página completa</a>
      </div>
    </section>
    <script type="application/json" id="dados-versiculos">${dados}</script>
  </section>

  ${ORNAMENTO}

  <section class="secao-home" aria-labelledby="titulo-temas">
    <header class="secao-cabecalho">
      <h2 id="titulo-temas">Uma palavra para cada momento</h2>
      <p>Coleções de versículos escolhidos um a um, com introdução, reflexão e contexto.</p>
    </header>
    <div class="grade-temas grade-temas-home">
      ${temasDestaque
        .map(
          (t) => `
      <a class="cartao-tema" href="/${t.slug}/">
        <span class="cartao-tema-emoji" aria-hidden="true">${esc(t.emoji)}</span>
        <h3>${esc(t.titulo)}</h3>
        <p>“${esc(t.heroFrase)}”</p>
        <span class="cartao-tema-cta">${t.versiculos.length} versículos →</span>
      </a>`
        )
        .join('\n')}
    </div>
    <p class="ver-todos"><a class="botao botao-borda" href="/versiculos/">Ver todos os ${TEMAS.length} temas</a></p>
  </section>

  ${adSlot('home-meio')}

  <section class="secao-home" aria-labelledby="titulo-salmos">
    <header class="secao-cabecalho">
      <h2 id="titulo-salmos">Os salmos mais amados, explicados</h2>
      <p>Texto completo na tradução Almeida e estudo bloco a bloco — do Pastor ao Refúgio.</p>
    </header>
    <div class="grade-salmos-home">
      ${SALMOS.slice()
        .sort((a, b) => a.numero - b.numero)
        .map(
          (s) => `
      <a class="cartao-salmo-home" href="/${s.slug}/">
        <span class="cartao-salmo-numero">${s.numero}</span>
        <span class="cartao-salmo-info">
          <strong>Salmo ${s.numero}</strong>
          <em>“${esc(s.versos[0].texto.length > 72 ? s.versos[0].texto.slice(0, 72).trimEnd() + '…' : s.versos[0].texto)}”</em>
        </span>
      </a>`
        )
        .join('\n')}
    </div>
  </section>

  ${ORNAMENTO}

  <section class="secao-home" aria-labelledby="titulo-ferramentas">
    <header class="secao-cabecalho">
      <h2 id="titulo-ferramentas">Ferramentas para caminhar na Palavra</h2>
      <p>Gratuitas, sem cadastro, feitas para o seu dia a dia devocional.</p>
    </header>
    <div class="grade-ferramentas">
      <a class="cartao-ferramenta" href="/plano-de-leitura/">
        <span aria-hidden="true">📅</span>
        <h3>Plano de Leitura Anual</h3>
        <p>A Bíblia inteira em 365 dias, com progresso salvo automaticamente no seu navegador.</p>
      </a>
      <a class="cartao-ferramenta" href="/gerador-de-versiculos/">
        <span aria-hidden="true">🎲</span>
        <h3>Gerador de Versículos</h3>
        <p>Sorteie um texto bíblico por tema e copie com a referência para compartilhar.</p>
      </a>
      <a class="cartao-ferramenta" href="/quiz-biblico/">
        <span aria-hidden="true">🏆</span>
        <h3>Quiz Bíblico</h3>
        <p>15 perguntas de Gênesis a Apocalipse, com correção e explicação na hora.</p>
      </a>
      <a class="cartao-ferramenta" href="/livros-da-biblia/">
        <span aria-hidden="true">📚</span>
        <h3>Os 66 Livros</h3>
        <p>Toda a biblioteca sagrada resumida, livro a livro, do Gênesis ao Apocalipse.</p>
      </a>
    </div>
  </section>

  <section class="secao-home chamada-final">
    <blockquote>
      <p>“Toda Escritura é divinamente inspirada e proveitosa para ensinar, para redarguir, para corrigir,
      para instruir em justiça.”</p>
      <cite>2 Timóteo 3:16</cite>
    </blockquote>
    <p class="ver-todos"><a class="botao botao-ouro" href="/como-ler-a-biblia/">Comece a ler hoje — veja como ✦</a></p>
  </section>

  ${adSlot('home-rodape')}
</div>`;

  return {
    caminho: '/',
    html: pagina({
      titulo: 'Versículos, Salmos e a Palavra de Deus todos os dias',
      descricao: SITE.descricao,
      caminho: '/',
      conteudo,
      classeBody: 'pagina-home',
    }),
  };
}
