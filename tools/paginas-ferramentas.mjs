// =====================================================================
// paginas-ferramentas.mjs — Versículo do Dia, Gerador de Versículos,
// Plano de Leitura anual e Quiz Bíblico. Os dados são embutidos em
// <script type="application/json"> e a lógica vive em assets/js/app.js.
// =====================================================================

import { pagina, migalhas, adSlot, ORNAMENTO, esc, faq, faqJsonLd } from './layout.mjs';
import { TODOS_VERSICULOS } from './data-temas.mjs';
import { LIVROS, TOTAL_CAPITULOS } from './data-livros.mjs';

// ---------------------------------------------------------------------
// Versículo do Dia — determinístico pela data (mesmo versículo para
// todos os visitantes no mesmo dia).
// ---------------------------------------------------------------------
function paginaVersiculoDoDia() {
  const dados = JSON.stringify(TODOS_VERSICULOS);
  const perguntas = [
    { q: 'Como o versículo do dia é escolhido?', a: 'A seleção é automática e baseada na data: todos os visitantes veem o mesmo versículo no mesmo dia, sorteado do nosso acervo de mais de 160 textos organizados por tema, na tradução Almeida.' },
    { q: 'Posso compartilhar o versículo do dia?', a: 'Sim! Use o botão "Copiar" para copiar o texto com a referência e cole onde quiser: WhatsApp, redes sociais ou em uma mensagem para alguém que precisa dessa palavra hoje.' },
    { q: 'O versículo muda em que horário?', a: 'À meia-noite, no fuso horário do seu dispositivo. Cada novo dia traz um novo texto — volte amanhã ou salve o site nos favoritos.' },
  ];

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Versículo do Dia' }])}
    <p class="hero-selo">🌅 Um encontro diário com a Palavra</p>
    <h1>Versículo do Dia</h1>
    <p class="hero-frase">“Novas são cada manhã; grande é a tua fidelidade.” — Lamentações 3:23</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <section class="painel-ferramenta" id="painel-versiculo-dia">
    <p class="painel-data" id="vdd-data" aria-live="polite"></p>
    <blockquote class="painel-versiculo">
      <p id="vdd-texto">Carregando o versículo de hoje…</p>
      <cite id="vdd-ref"></cite>
    </blockquote>
    <p class="painel-tema" id="vdd-tema"></p>
    <div class="painel-acoes">
      <button type="button" class="botao botao-ouro" id="vdd-copiar">Copiar versículo</button>
      <a class="botao botao-borda" id="vdd-link-tema" href="/versiculos/">Ver o tema completo</a>
    </div>
  </section>
  <script type="application/json" id="dados-versiculos">${dados}</script>

  ${adSlot('versiculo-dia')}

  ${ORNAMENTO}

  <article class="prosa">
    <h2>Por que meditar em um versículo por dia?</h2>
    <p>O Salmo 1 chama de bem-aventurado quem medita na Palavra "de dia e de noite" — e a comparação é com uma árvore
    plantada junto às águas: quem bebe todos os dias, frutifica na estação certa. Um único versículo, lido com calma pela
    manhã, muda o tom do dia inteiro: vira oração no trânsito, resposta na tentação e consolo na notícia difícil.</p>
    <p>Nossa sugestão de prática diária, em três passos simples: <strong>leia</strong> o versículo em voz alta;
    <strong>pergunte</strong> "o que este texto revela sobre Deus e o que ele muda em mim hoje?";
    e <strong>ore</strong> devolvendo as palavras do texto a Deus. Menos de cinco minutos — e uma vida transformada
    ao longo de um ano.</p>
    <p>Quer dar um passo além? Siga nosso <a href="/plano-de-leitura/">Plano de Leitura anual</a> e leia a Bíblia
    inteira em 12 meses, no seu ritmo.</p>
  </article>

  ${faq(perguntas)}
</div>`;

  return {
    caminho: '/versiculo-do-dia/',
    html: pagina({
      titulo: 'Versículo do Dia — uma palavra da Bíblia para hoje',
      descricao:
        'Versículo do dia com referência e tema: um novo texto bíblico a cada manhã para meditar, orar e compartilhar. Comece o seu dia com a Palavra.',
      caminho: '/versiculo-do-dia/',
      conteudo,
      jsonLd: faqJsonLd(perguntas),
    }),
  };
}

// ---------------------------------------------------------------------
// Gerador de Versículos — sorteio com filtro por tema.
// ---------------------------------------------------------------------
function paginaGerador() {
  const dados = JSON.stringify(TODOS_VERSICULOS);
  const temas = [...new Set(TODOS_VERSICULOS.map((v) => v.tema))];
  const perguntas = [
    { q: 'Como funciona o gerador de versículos?', a: 'Clique em "Gerar versículo" e um texto do nosso acervo é sorteado na hora. Você pode filtrar por tema — amor, fé, força, paz e outros — para receber uma palavra alinhada ao seu momento.' },
    { q: 'Os versículos são de qual tradução?', a: 'Usamos a tradução João Ferreira de Almeida, Revista e Corrigida, que está em domínio público — a mesma linguagem clássica que acompanhou gerações de leitores brasileiros.' },
    { q: 'Posso usar os versículos gerados em cartões e posts?', a: 'Sim. O texto bíblico em domínio público pode ser compartilhado livremente. Recomendamos manter sempre a referência (livro, capítulo e versículo) junto do texto.' },
  ];

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Gerador de Versículos' }])}
    <p class="hero-selo">🎲 Uma palavra ao acaso, nunca por acaso</p>
    <h1>Gerador de Versículos Bíblicos</h1>
    <p class="hero-frase">Receba um versículo surpresa — de todos os temas ou do tema que o seu coração precisa agora.</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <section class="painel-ferramenta" id="painel-gerador">
    <div class="gerador-controles">
      <label for="gerador-tema">Tema:</label>
      <select id="gerador-tema">
        <option value="">Todos os temas</option>
        ${temas.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join('\n        ')}
      </select>
      <button type="button" class="botao botao-ouro" id="gerador-botao">Gerar versículo ✦</button>
    </div>
    <blockquote class="painel-versiculo" id="gerador-resultado" hidden>
      <p id="gerador-texto"></p>
      <cite id="gerador-ref"></cite>
    </blockquote>
    <p class="painel-tema" id="gerador-tema-atual"></p>
    <div class="painel-acoes" id="gerador-acoes" hidden>
      <button type="button" class="botao botao-borda" id="gerador-copiar">Copiar</button>
    </div>
  </section>
  <script type="application/json" id="dados-versiculos">${dados}</script>

  ${adSlot('gerador')}

  ${ORNAMENTO}

  <article class="prosa">
    <h2>Quando usar o gerador</h2>
    <p>Às vezes a gente não sabe nem o que procurar — só sabe que precisa de uma palavra. O gerador serve exatamente para
    esses momentos: um texto das Escrituras, escolhido ao acaso dentro do tema que você indicar, para ler com atenção e
    deixar falar. Use-o para abrir um devocional, escolher a mensagem de um cartão, iniciar um estudo em grupo ou
    simplesmente para se surpreender com um texto que você ainda não conhecia.</p>
    <p>Um lembrete importante: o gerador é uma porta de entrada, não um oráculo. Todo versículo ganha ainda mais vida no
    seu contexto — por isso cada resultado indica o tema, e nossas páginas temáticas trazem introdução e reflexão completas.</p>
  </article>

  ${faq(perguntas)}
</div>`;

  return {
    caminho: '/gerador-de-versiculos/',
    html: pagina({
      titulo: 'Gerador de Versículos — sorteie um texto bíblico por tema',
      descricao:
        'Gerador de versículos bíblicos gratuito: sorteie um texto da Bíblia por tema — amor, fé, força, paz — e copie com a referência para compartilhar.',
      caminho: '/gerador-de-versiculos/',
      conteudo,
      jsonLd: faqJsonLd(perguntas),
    }),
  };
}

// ---------------------------------------------------------------------
// Plano de Leitura anual — 365 dias, ~3 capítulos/dia, progresso em
// localStorage. O plano é gerado aqui, no build, de forma determinística.
// ---------------------------------------------------------------------
function gerarPlanoAnual() {
  const capitulos = LIVROS.flatMap((l) =>
    Array.from({ length: l.capitulos }, (_, i) => `${l.nome} ${i + 1}`)
  );
  const dias = [];
  const total = capitulos.length;
  let cursor = 0;
  for (let d = 0; d < 365; d++) {
    const fim = Math.round(((d + 1) * total) / 365);
    dias.push(capitulos.slice(cursor, fim));
    cursor = fim;
  }
  return dias;
}

function paginaPlanoLeitura() {
  const plano = gerarPlanoAnual();
  const dados = JSON.stringify(plano);
  const perguntas = [
    { q: 'Quantos capítulos preciso ler por dia?', a: `A Bíblia tem ${TOTAL_CAPITULOS} capítulos. Divididos em 365 dias, são cerca de 3 a 4 capítulos diários — entre 10 e 15 minutos de leitura. O plano segue a ordem dos livros, de Gênesis a Apocalipse.` },
    { q: 'O meu progresso fica salvo?', a: 'Sim — no seu próprio navegador (localStorage). Você pode fechar a página e voltar quando quiser que os dias marcados continuarão lá. O progresso não é enviado para nenhum servidor.' },
    { q: 'Comecei atrasado. E agora?', a: 'Nenhum problema: o plano não tem datas fixas — o "Dia 1" é o seu primeiro dia. A constância vale mais que o calendário: melhor terminar em 14 meses do que desistir no segundo.' },
    { q: 'Qual Bíblia usar para acompanhar o plano?', a: 'Qualquer uma da sua preferência. Se quiser entender as diferenças entre as versões em português, veja nosso guia de traduções da Bíblia.' },
  ];

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Plano de Leitura' }])}
    <p class="hero-selo">📅 A Bíblia inteira em 12 meses</p>
    <h1>Plano de Leitura Anual da Bíblia</h1>
    <p class="hero-frase">${TOTAL_CAPITULOS} capítulos, 365 dias, um passo por vez — com seu progresso salvo automaticamente.</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <section class="painel-ferramenta" id="painel-plano">
    <div class="plano-resumo">
      <div class="plano-medidor" role="progressbar" aria-valuemin="0" aria-valuemax="365" aria-valuenow="0" id="plano-barra-wrap">
        <div class="plano-barra" id="plano-barra"></div>
      </div>
      <p id="plano-status">Carregando seu progresso…</p>
      <div class="painel-acoes">
        <button type="button" class="botao botao-borda" id="plano-limpar">Recomeçar plano</button>
      </div>
    </div>
    <div id="plano-lista" class="plano-lista"></div>
    <div class="painel-acoes">
      <button type="button" class="botao botao-ouro" id="plano-mais">Mostrar mais dias</button>
    </div>
  </section>
  <script type="application/json" id="dados-plano">${dados}</script>

  ${adSlot('plano-leitura')}

  ${ORNAMENTO}

  <article class="prosa">
    <h2>Como aproveitar o plano ao máximo</h2>
    <p><strong>Escolha um horário fixo.</strong> As pesquisas sobre hábitos são unânimes: o que tem hora marcada acontece.
    De manhã com café, no almoço ou antes de dormir — o melhor horário é o que você consegue repetir.</p>
    <p><strong>Leia com uma pergunta na mão.</strong> "O que este texto revela sobre Deus?" transforma leitura em encontro.
    Um caderno ao lado para anotar um versículo por dia multiplica o proveito.</p>
    <p><strong>Não quebre a corrente — mas, se quebrar, emende.</strong> Perdeu três dias? Não tente compensar tudo de uma
    vez: retome do ponto em que parou. O objetivo é conhecer a Deus pela Palavra, não vencer uma competição.</p>
    <p><strong>Celebre os marcos.</strong> Terminou o Pentateuco? Chegou aos Salmos? Comemore — e conte para alguém.
    Ler com um amigo ou em família dobra a taxa de conclusão.</p>
  </article>

  ${faq(perguntas)}
</div>`;

  return {
    caminho: '/plano-de-leitura/',
    html: pagina({
      titulo: 'Plano de Leitura Anual da Bíblia — 365 dias com progresso salvo',
      descricao:
        'Plano de leitura para ler a Bíblia inteira em 1 ano: capítulos organizados dia a dia, marcação de progresso automática e dicas para não desistir.',
      caminho: '/plano-de-leitura/',
      conteudo,
      jsonLd: faqJsonLd(perguntas),
    }),
  };
}

// ---------------------------------------------------------------------
// Quiz Bíblico — 15 perguntas, correção na hora, tudo no cliente.
// ---------------------------------------------------------------------
const QUIZ = [
  { p: 'Quantos livros tem a Bíblia protestante?', op: ['66', '73', '39', '27'], r: 0, dica: '39 no Antigo Testamento e 27 no Novo.' },
  { p: 'Quem construiu a arca antes do dilúvio?', op: ['Moisés', 'Noé', 'Abraão', 'Elias'], r: 1, dica: 'Gênesis 6 conta a história.' },
  { p: 'Qual é o livro mais longo da Bíblia?', op: ['Isaías', 'Gênesis', 'Salmos', 'Jeremias'], r: 2, dica: 'São 150 capítulos de poesia e oração.' },
  { p: 'Quem foi lançado na cova dos leões?', op: ['Daniel', 'José', 'Davi', 'Jonas'], r: 0, dica: 'Ele orava três vezes ao dia, mesmo proibido.' },
  { p: 'Qual apóstolo negou Jesus três vezes?', op: ['João', 'Tomé', 'Judas', 'Pedro'], r: 3, dica: 'O galo cantou em seguida (Lucas 22).' },
  { p: 'Em que cidade Jesus nasceu?', op: ['Nazaré', 'Belém', 'Jerusalém', 'Cafarnaum'], r: 1, dica: 'A profecia está em Miqueias 5:2.' },
  { p: 'Quem venceu o gigante Golias?', op: ['Saul', 'Sansão', 'Davi', 'Josué'], r: 2, dica: 'Com uma funda e uma pedra (1 Samuel 17).' },
  { p: 'Qual o primeiro milagre público de Jesus?', op: ['Multiplicação dos pães', 'Água em vinho', 'Cura de um cego', 'Andar sobre o mar'], r: 1, dica: 'Aconteceu num casamento em Caná (João 2).' },
  { p: 'Quantos dias Jonas ficou no ventre do grande peixe?', op: ['Um', 'Três', 'Sete', 'Quarenta'], r: 1, dica: 'Jesus citou esse sinal em Mateus 12:40.' },
  { p: 'Quem escreveu a maior parte das cartas do Novo Testamento?', op: ['Pedro', 'João', 'Paulo', 'Tiago'], r: 2, dica: 'São 13 cartas com o nome dele.' },
  { p: 'Qual mar se abriu para o povo de Israel passar?', op: ['Mar Morto', 'Mar da Galileia', 'Mar Mediterrâneo', 'Mar Vermelho'], r: 3, dica: 'Êxodo 14 narra a travessia.' },
  { p: 'Complete: "O Senhor é o meu pastor..."', op: ['e me guarda do mal', 'nada me faltará', 'para sempre e eterno', 'e minha salvação'], r: 1, dica: 'É o primeiro verso do Salmo 23.' },
  { p: 'Quem traiu Jesus por trinta moedas de prata?', op: ['Judas Iscariotes', 'Pedro', 'Tomé', 'Barrabás'], r: 0, dica: 'O beijo foi o sinal combinado (Mateus 26).' },
  { p: 'Qual é o último livro da Bíblia?', op: ['Judas', 'Malaquias', 'Apocalipse', 'Atos'], r: 2, dica: 'Termina com novos céus e nova terra.' },
  { p: 'Quantos discípulos Jesus escolheu?', op: ['7', '10', '12', '70'], r: 2, dica: 'Um para cada tribo de Israel, simbolicamente.' },
];

function paginaQuiz() {
  const dados = JSON.stringify(QUIZ);
  const perguntas = [
    { q: 'O quiz bíblico tem quantas perguntas?', a: `São ${QUIZ.length} perguntas de múltipla escolha sobre personagens, livros e histórias da Bíblia, com correção na hora e explicação em cada resposta.` },
    { q: 'Posso refazer o quiz?', a: 'Quantas vezes quiser! Ao final, clique em "Jogar novamente". Desafie a família e os amigos a superar a sua pontuação.' },
    { q: 'O quiz serve para escola dominical e células?', a: 'Sim — ele foi pensado para uso em grupos: projete a tela, leia as perguntas em voz alta e deixe a turma responder. As dicas ao final de cada resposta ajudam a ensinar.' },
  ];

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Quiz Bíblico' }])}
    <p class="hero-selo">🏆 Teste seus conhecimentos</p>
    <h1>Quiz Bíblico</h1>
    <p class="hero-frase">${QUIZ.length} perguntas sobre os personagens e as histórias mais marcantes das Escrituras. Quantas você acerta?</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <section class="painel-ferramenta" id="painel-quiz">
    <div id="quiz-inicio">
      <p class="quiz-chamada">De Gênesis a Apocalipse: perguntas para todos os níveis, com explicação em cada resposta.</p>
      <button type="button" class="botao botao-ouro" id="quiz-comecar">Começar o quiz ✦</button>
    </div>
    <div id="quiz-jogo" hidden>
      <p class="quiz-progresso" id="quiz-progresso"></p>
      <h2 class="quiz-pergunta" id="quiz-pergunta"></h2>
      <div class="quiz-opcoes" id="quiz-opcoes"></div>
      <p class="quiz-dica" id="quiz-dica" hidden></p>
      <button type="button" class="botao botao-ouro" id="quiz-proxima" hidden>Próxima pergunta →</button>
    </div>
    <div id="quiz-fim" hidden>
      <h2>Resultado</h2>
      <p class="quiz-placar" id="quiz-placar"></p>
      <p id="quiz-mensagem"></p>
      <div class="painel-acoes">
        <button type="button" class="botao botao-ouro" id="quiz-reiniciar">Jogar novamente</button>
        <a class="botao botao-borda" href="/livros-da-biblia/">Estudar os livros da Bíblia</a>
      </div>
    </div>
  </section>
  <script type="application/json" id="dados-quiz">${dados}</script>

  ${adSlot('quiz')}

  ${ORNAMENTO}

  <article class="prosa">
    <h2>Aprender brincando é bíblico</h2>
    <p>O povo de Israel usava perguntas e memoriais para transmitir a fé: "Quando teu filho te perguntar: que significam
    estas pedras?..." (Josué 4). Perguntas despertam curiosidade, e curiosidade abre a Bíblia. Use o quiz como termômetro
    do que você já conhece — e deixe que cada erro vire um convite para ler a história completa.</p>
    <p>Depois de jogar, aprofunde-se: conheça o <a href="/livros-da-biblia/">resumo dos 66 livros</a>, descubra
    <a href="/quem-escreveu-a-biblia/">quem escreveu a Bíblia</a> ou comece hoje o
    <a href="/plano-de-leitura/">plano de leitura anual</a>.</p>
  </article>

  ${faq(perguntas)}
</div>`;

  return {
    caminho: '/quiz-biblico/',
    html: pagina({
      titulo: 'Quiz Bíblico — teste seus conhecimentos sobre a Bíblia',
      descricao:
        'Quiz bíblico gratuito com perguntas e respostas sobre personagens, livros e histórias da Bíblia. Jogue, aprenda e desafie os amigos.',
      caminho: '/quiz-biblico/',
      conteudo,
      jsonLd: faqJsonLd(perguntas),
    }),
  };
}

export function gerarPaginasFerramentas() {
  return [paginaVersiculoDoDia(), paginaGerador(), paginaPlanoLeitura(), paginaQuiz()];
}
