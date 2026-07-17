// =====================================================================
// paginas-guias.mjs — hub /guias/, artigos editoriais longos e a página
// dos 66 livros da Bíblia. Todo o texto é original deste site.
// =====================================================================

import { pagina, migalhas, adSlot, ORNAMENTO, esc, faq, faqJsonLd } from './layout.mjs';
import { LIVROS, GRUPOS, TOTAL_CAPITULOS } from './data-livros.mjs';

const GUIAS = [
  {
    slug: 'como-ler-a-biblia',
    titulo: 'Como Ler a Bíblia',
    chamada: 'Um guia prático para começar (e continuar) a leitura da Bíblia — por onde começar, quanto ler e como entender o que você lê.',
    descricao: 'Como ler a Bíblia: por onde começar, métodos de leitura, quanto ler por dia e dicas práticas para entender e não desistir.',
    corpo: `
<p>Toda pessoa que decide ler a Bíblia enfrenta o mesmo momento: o livro fechado sobre a mesa, 1.189 capítulos pela
frente e a pergunta inevitável — <em>por onde eu começo?</em> Este guia responde essa pergunta e as que vêm depois dela,
com o caminho que já ajudou milhões de leitores a transformar boa intenção em hábito.</p>

<h2>Por onde começar: não pela primeira página</h2>
<p>Parece contraditório, mas a melhor porta de entrada da Bíblia raramente é Gênesis 1. A Bíblia não é um romance linear —
é uma biblioteca de 66 livros, e algumas estantes são mais acessíveis ao iniciante do que outras. A recomendação clássica:</p>
<ul>
<li><strong>Comece pelo Evangelho de João.</strong> Ele foi escrito exatamente para quem está chegando: "estes foram escritos
para que creiais" (João 20:31). Linguagem simples, capítulos curtos, e o centro de toda a Escritura — Jesus — em primeiro plano.</li>
<li><strong>Siga para Marcos, Lucas e Mateus</strong>, conhecendo a mesma história por quatro ângulos, e depois
<strong>Atos</strong>, a continuação natural.</li>
<li><strong>Intercale com Salmos e Provérbios</strong> — um salmo por dia alimenta a oração; um capítulo de Provérbios
(são 31, um para cada dia do mês) alimenta as decisões.</li>
<li><strong>Só então volte a Gênesis e Êxodo</strong>, onde a grande história começa — você vai reconhecer neles as raízes
de tudo o que leu antes.</li>
</ul>

<h2>Quanto ler por dia</h2>
<p>Menos do que você imagina — e mais vezes do que você planeja. Três capítulos por dia completam a Bíblia em um ano
(nosso <a href="/plano-de-leitura/">plano de leitura anual</a> organiza isso automaticamente, com progresso salvo).
Mas se três capítulos hoje parecem muito, leia um. Se um parecer muito, leia dez versículos. O leitor que a Bíblia
elogia não é o mais veloz — é a árvore "plantada junto a ribeiros de águas", que bebe todos os dias (Salmo 1).</p>

<h2>O método que cabe num guardanapo</h2>
<p>Para não ler no piloto automático, use três perguntas em cada trecho — o método mais simples e antigo de leitura devocional:</p>
<ol>
<li><strong>O que o texto diz?</strong> Leia com atenção, se possível em voz alta. Note quem fala, com quem, onde.</li>
<li><strong>O que o texto revela sobre Deus?</strong> Antes de procurar regras, procure o caráter de quem fala.</li>
<li><strong>O que muda em mim hoje?</strong> Uma atitude, uma oração, uma palavra a pedir perdão — a Bíblia foi feita
para ser vivida: "sede cumpridores da palavra e não somente ouvintes" (Tiago 1:22).</li>
</ol>

<h2>Erros que derrubam iniciantes (e como evitá-los)</h2>
<p><strong>Começar por Levítico.</strong> É o terceiro livro, mas é um manual de sacrifícios do antigo Israel —
importantíssimo, mas árido para o primeiro mês. Deixe-o para quando a história toda fizer sentido.</p>
<p><strong>Ler sem plano.</strong> Abrir em página aleatória todo dia é como assistir cenas soltas de um filme.
Um plano — qualquer plano — muda tudo.</p>
<p><strong>Desistir por causa do atraso.</strong> Perdeu uma semana? Retome de onde parou, sem culpa e sem maratona
de compensação. Constância imperfeita vence perfeição interrompida.</p>
<p><strong>Ler sozinho para sempre.</strong> A Bíblia nasceu para ser lida em comunidade. Um grupo, um amigo, a família
no jantar: leitura compartilhada dura mais e alcança mais fundo.</p>

<h2>Qual Bíblia usar?</h2>
<p>A melhor tradução é a que você entende e vai ler. Para uma visão completa das versões em português — Almeida, NVI, NTLH,
NAA e outras — preparamos um <a href="/traducoes-da-biblia/">guia de traduções</a>. Em resumo: para estudo, uma tradução
mais literal (Almeida, NAA); para leitura fluida, uma mais dinâmica (NVI, NTLH). Muitos leitores usam duas em paralelo.</p>`,
    faq: [
      { q: 'Qual livro da Bíblia ler primeiro?', a: 'O Evangelho de João é a porta de entrada mais recomendada: foi escrito para apresentar Jesus a quem ainda não o conhece, com linguagem acessível. Depois, os outros evangelhos, Atos, Salmos e Provérbios.' },
      { q: 'Em quanto tempo se lê a Bíblia inteira?', a: 'Lendo cerca de 3 capítulos por dia, um ano. Em voz alta, a Bíblia completa tem em torno de 70 horas de leitura — menos que muitas séries de TV.' },
      { q: 'Preciso entender tudo o que leio?', a: 'Não — ninguém entende tudo na primeira leitura. Anote as dúvidas e siga em frente: muitas se respondem sozinhas com o contexto, e as outras são ótimo material para estudar em grupo ou com um líder.' },
    ],
  },
  {
    slug: 'historia-da-biblia',
    titulo: 'História da Bíblia',
    chamada: 'Dos pergaminhos do deserto à Bíblia no seu celular: 3.500 anos da história do livro mais lido, copiado e traduzido do mundo.',
    descricao: 'A história da Bíblia: como foi escrita, quem definiu os livros, os manuscritos antigos, a primeira impressão de Gutenberg e as traduções.',
    corpo: `
<p>Nenhum livro tem uma biografia como a da Bíblia. Escrita ao longo de aproximadamente 1.500 anos, por cerca de 40 autores,
em três línguas e três continentes, ela atravessou impérios, fogueiras e revoluções — e chegou ao seu celular. Esta é a
história, em capítulos.</p>

<h2>As línguas originais</h2>
<p>O Antigo Testamento foi escrito majoritariamente em <strong>hebraico</strong>, com trechos em <strong>aramaico</strong>
(partes de Daniel e Esdras). O Novo Testamento foi escrito em <strong>grego koiné</strong> — o grego popular falado em todo
o Mediterrâneo do século I, escolha que espalhou a mensagem na língua mais universal da época.</p>

<h2>Dos rolos aos códices</h2>
<p>Os primeiros textos eram copiados à mão em rolos de papiro e pergaminho. Os escribas judeus — depois os massoretas —
desenvolveram um rigor de cópia lendário: contavam letras, palavras e linhas de cada rolo para detectar qualquer desvio.
Em 1947, a descoberta dos <strong>Manuscritos do Mar Morto</strong> em Qumran provou o resultado: um rolo de Isaías mil anos
mais antigo que os manuscritos então conhecidos apresentava o texto essencialmente idêntico.</p>
<p>Nos primeiros séculos da era cristã, a igreja adotou o <em>códice</em> — o formato de livro com páginas — e nos legou
tesouros como o Códice Sinaítico e o Vaticano (século IV), Bíblias gregas quase completas que ainda existem.</p>

<h2>Quem definiu quais livros entrariam?</h2>
<p>O chamado <strong>cânon</strong> (do grego "régua, medida") não foi inventado por um decreto — foi um reconhecimento
gradual. Os livros do Antigo Testamento já eram lidos como Escritura por Israel séculos antes de Cristo; Jesus os citava
como autoridade final. No Novo Testamento, os critérios das primeiras comunidades foram a origem apostólica, a coerência
doutrinária e o uso universal nas igrejas. Listas como o Fragmento Muratori (c. 170 d.C.) mostram o essencial do cânon já
reconhecido muito cedo; os concílios posteriores confirmaram o consenso, não o criaram.</p>

<h2>A era das traduções</h2>
<p>A Bíblia nasceu traduzível — e traduzida. A <strong>Septuaginta</strong> verteu o Antigo Testamento para o grego já no
século III a.C. A <strong>Vulgata</strong> de Jerônimo (século IV) levou tudo ao latim e reinou por mil anos. Em 1455, a
<strong>Bíblia de Gutenberg</strong> inaugurou a imprensa ocidental — o primeiro grande livro impresso da história foi,
justamente, este. A Reforma acelerou tudo: Lutero em alemão (1522-1534), Tyndale em inglês, e o pastor português
<strong>João Ferreira de Almeida</strong>, que iniciou no século XVII a tradução que domina o mundo lusófono até hoje —
conheça essa história no nosso <a href="/traducoes-da-biblia/">guia de traduções</a>.</p>

<h2>A Bíblia hoje</h2>
<p>Segundo as sociedades bíblicas, a Bíblia completa já foi traduzida para mais de 700 línguas — e porções dela, para mais
de 3.500. É, com folga, o livro mais distribuído da história, com estimativas que ultrapassam 5 bilhões de exemplares.
Do rolo de couro ao aplicativo, o suporte mudou muitas vezes; o texto, guardado com zelo de escriba, segue dizendo o que
sempre disse: "a palavra de nosso Deus subsiste eternamente" (Isaías 40:8).</p>`,
    faq: [
      { q: 'Quanto tempo levou para a Bíblia ser escrita?', a: 'Cerca de 1.500 anos — de Moisés (por volta de 1400 a.C.) ao apóstolo João (fim do século I d.C.), somando aproximadamente 40 autores de origens muito diferentes: reis, pastores, pescadores, um médico e um cobrador de impostos.' },
      { q: 'Qual é o manuscrito bíblico mais antigo?', a: 'Entre os mais célebres estão os Manuscritos do Mar Morto (a partir do século III a.C.) para o Antigo Testamento e o fragmento P52 do Evangelho de João (início do século II d.C.) para o Novo.' },
      { q: 'A Bíblia foi mudada ao longo dos séculos?', a: 'As evidências dizem o contrário: a comparação entre manuscritos de épocas distantes — como o Isaías de Qumran e os textos massoréticos mil anos posteriores — mostra estabilidade notável. As variações existentes são, na imensa maioria, detalhes de grafia que não afetam o conteúdo.' },
    ],
  },
  {
    slug: 'traducoes-da-biblia',
    titulo: 'Traduções da Bíblia em Português',
    chamada: 'Almeida, NVI, NTLH, NAA, King James… Qual Bíblia escolher? Entenda as diferenças e encontre a tradução ideal para você.',
    descricao: 'Guia das traduções da Bíblia em português: ARC, ARA, NAA, NVI, NTLH e outras — diferenças, história de Almeida e qual escolher para estudo ou leitura.',
    corpo: `
<p>Entrar numa livraria evangélica ou num aplicativo bíblico é encontrar uma sopa de letras: ARC, ARA, NAA, NVI, NTLH, KJA…
Todas são a mesma Bíblia? Sim — e cada uma faz um caminho diferente entre as línguas originais e o seu português.
Este guia explica as principais versões e ajuda você a escolher.</p>

<h2>O pioneiro: João Ferreira de Almeida</h2>
<p>A história da Bíblia em português tem um protagonista improvável: um jovem português que, aos 16 anos, já traduzia o
Novo Testamento. <strong>João Ferreira de Almeida</strong> (c. 1628–1691), pastor reformado radicado nas Índias Orientais,
publicou seu Novo Testamento em 1681 e trabalhou no Antigo até a morte. Sua tradução, revisada por gerações, tornou-se
<em>a</em> Bíblia dos evangélicos lusófonos — e é a base das versões que levam seu nome até hoje.</p>

<h2>Dois jeitos de traduzir</h2>
<p>Toda tradução equilibra dois ideais: ficar perto da <strong>forma</strong> do original (equivalência formal, "palavra
por palavra") ou perto do <strong>sentido</strong> na língua de chegada (equivalência dinâmica, "pensamento por
pensamento"). Nenhum dos dois é "mais fiel" em absoluto — são fidelidades a coisas diferentes.</p>

<h2>As principais versões, uma a uma</h2>
<ul>
<li><strong>ARC — Almeida Revista e Corrigida:</strong> a Almeida clássica, de linguagem solene ("Porque Deus amou o mundo
de tal maneira..."). É a tradução usada neste site, por seu valor histórico e por estar em domínio público.</li>
<li><strong>ARA — Almeida Revista e Atualizada:</strong> revisão de meados do século XX, mais polida e precisa; durante
décadas foi o padrão de púlpitos e seminários.</li>
<li><strong>NAA — Nova Almeida Atualizada (2017):</strong> a Almeida com português contemporâneo — "vós" deu lugar a
"vocês" — mantendo o rigor formal. Excelente para estudo hoje.</li>
<li><strong>NVI — Nova Versão Internacional:</strong> o meio-termo mais popular: equilibrada entre precisão e fluidez,
ótima primeira Bíblia.</li>
<li><strong>NTLH — Nova Tradução na Linguagem de Hoje:</strong> prioridade total à clareza, com vocabulário simples.
Ideal para novos leitores, adolescentes e leitura em voz alta.</li>
<li><strong>KJA — King James Atualizada:</strong> inspirada na tradição da célebre King James inglesa, com sabor literário.</li>
<li><strong>Bíblias católicas</strong> (Ave-Maria, Jerusalém, CNBB): incluem os sete livros deuterocanônicos e são
referência na Igreja Católica — a Bíblia de Jerusalém, em particular, é respeitada por estudiosos de todas as tradições.</li>
</ul>

<h2>Qual escolher?</h2>
<p><strong>Para estudar a fundo:</strong> NAA ou ARA (e compare com a NVI). <strong>Para criar o hábito de leitura:</strong>
NVI ou NTLH. <strong>Para memorizar e pela beleza clássica:</strong> Almeida (ARC). <strong>Para crianças e novos
convertidos:</strong> NTLH. E a dica de ouro: use duas traduções em paralelo — uma formal e uma dinâmica. Onde as duas
concordam, o sentido é claro; onde divergem, você acaba de encontrar um ótimo tema de estudo.</p>`,
    faq: [
      { q: 'Qual é a melhor tradução da Bíblia?', a: 'Não existe uma "melhor" absoluta — existe a melhor para cada uso: NAA/ARA para estudo detalhado, NVI para leitura equilibrada, NTLH para máxima clareza e a Almeida clássica (ARC) pela linguagem tradicional e por estar em domínio público.' },
      { q: 'Por que as Bíblias católicas têm mais livros?', a: 'Elas incluem os deuterocanônicos (Tobias, Judite, 1 e 2 Macabeus, Sabedoria, Eclesiástico e Baruque), presentes na Septuaginta grega e confirmados pela Igreja Católica no Concílio de Trento. As Bíblias protestantes seguem o cânon hebraico, com 39 livros no Antigo Testamento.' },
      { q: 'Qual tradução este site utiliza?', a: 'A Almeida Revista e Corrigida, tradução clássica em domínio público no Brasil — o que nos permite publicar o texto integral dos Salmos e dos versículos livremente e de graça para você.' },
    ],
  },
  {
    slug: 'quem-escreveu-a-biblia',
    titulo: 'Quem Escreveu a Bíblia',
    chamada: 'Cerca de 40 autores, 1.500 anos, três continentes — e uma unidade impressionante. Conheça as mãos humanas por trás do Livro.',
    descricao: 'Quem escreveu a Bíblia: os autores de cada parte, como a inspiração divina funciona, os livros anônimos e a surpreendente unidade das Escrituras.',
    corpo: `
<p>"Quem escreveu a Bíblia?" admite duas respostas verdadeiras. A resposta da fé: Deus — "toda Escritura é divinamente
inspirada" (2 Timóteo 3:16). E a resposta histórica: cerca de 40 autores humanos, ao longo de uns 1.500 anos, cada um com
seu estilo, vocabulário e circunstância. O cristianismo sempre sustentou as duas ao mesmo tempo: Deus falou <em>por meio</em>
de pessoas reais, sem apagar a personalidade de nenhuma delas.</p>

<h2>Um elenco improvável</h2>
<p>Se você fosse montar uma equipe para escrever o livro mais influente da história, dificilmente escolheria esta:
um príncipe do Egito tornado pastor de ovelhas (Moisés), um general (Josué), um rei poeta (Davi), o homem mais sábio
de seu tempo (Salomão), um boiadeiro e cultivador de sicômoros (Amós), um copeiro real (Neemias), um sacerdote no exílio
(Ezequiel), pescadores (Pedro e João), um cobrador de impostos (Mateus), um médico grego (Lucas) e um perseguidor de
cristãos transformado em missionário (Paulo). A diversidade é o argumento: vozes tão diferentes, uma só história.</p>

<h2>Quem escreveu o quê</h2>
<ul>
<li><strong>Pentateuco (Gênesis a Deuteronômio):</strong> atribuído pela tradição a Moisés — o próprio texto e Jesus
o citam assim.</li>
<li><strong>Livros históricos:</strong> vários autores e compiladores, muitos anônimos; Samuel, Esdras e Neemias estão
entre os nomes associados.</li>
<li><strong>Salmos:</strong> Davi assina 73; Asafe, os filhos de Corá, Salomão, Moisés (Salmo 90) e outros completam
o hinário.</li>
<li><strong>Provérbios e Eclesiastes:</strong> majoritariamente Salomão; Cantares também leva seu nome.</li>
<li><strong>Profetas:</strong> cada livro leva o nome do profeta que o anuncia — de Isaías a Malaquias.</li>
<li><strong>Evangelhos e Atos:</strong> Mateus, Marcos (registrando a pregação de Pedro, segundo a tradição antiga),
Lucas (também autor de Atos) e João.</li>
<li><strong>Cartas:</strong> Paulo escreveu 13; Tiago e Judas (irmãos de Jesus), Pedro e João completam; Hebreus é
anônima — "só Deus sabe quem a escreveu", já dizia Orígenes no século III.</li>
<li><strong>Apocalipse:</strong> João, exilado na ilha de Patmos.</li>
</ul>

<h2>Como funciona a "inspiração"?</h2>
<p>A palavra grega de 2 Timóteo 3:16, <em>theópneustos</em>, significa "soprada por Deus". A descrição mais clara do
processo está em 2 Pedro 1:21: "homens santos falaram da parte de Deus, movidos pelo Espírito Santo". Não foi ditado
mecânico — Lucas pesquisou fontes (Lucas 1:1-4), Paulo escreveu com o coração exposto, Davi orou suas crises. A convicção
cristã é que o Espírito conduziu esses processos humanos de tal forma que o resultado diz, com palavras de homens,
o que Deus quis dizer.</p>

<h2>A unidade que ninguém planejou</h2>
<p>Eis o dado mais impressionante: autores separados por séculos e culturas, sem qualquer possibilidade de combinar o
enredo, produziram uma narrativa com começo, meio e fim — criação, queda, redenção e restauração — e um protagonista
que atravessa tudo. Como resumiu Agostinho: o Novo Testamento está oculto no Antigo; o Antigo, revelado no Novo.
Para o leitor, essa unidade é um convite: a Bíblia não se lê como uma antologia de textos soltos, mas como uma única
grande história — que continua alcançando quem a lê.</p>`,
    faq: [
      { q: 'Quantos autores escreveram a Bíblia?', a: 'A contagem tradicional aponta cerca de 40 autores identificáveis, entre reis, profetas, pescadores, um médico e um cobrador de impostos — além de livros anônimos, como Hebreus e vários históricos.' },
      { q: 'Quem escreveu os quatro evangelhos?', a: 'Mateus (apóstolo e ex-cobrador de impostos), Marcos (companheiro de Pedro), Lucas (médico e historiador, também autor de Atos) e João (o "discípulo amado"). Os quatro relatos se complementam com ângulos diferentes da mesma vida.' },
      { q: 'O que significa dizer que a Bíblia é inspirada?', a: 'Que Deus conduziu os autores humanos pelo Espírito Santo (2 Pedro 1:21) de modo que o texto final comunica fielmente a mensagem divina — sem anular o estilo, a pesquisa e a personalidade de cada escritor.' },
    ],
  },
];

function paginaGuia(guia) {
  const outros = GUIAS.filter((g) => g.slug !== guia.slug);
  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([
      { rotulo: 'Início', href: '/' },
      { rotulo: 'Guias', href: '/guias/' },
      { rotulo: guia.titulo },
    ])}
    <p class="hero-selo">✍ Guia completo</p>
    <h1>${esc(guia.titulo)}</h1>
    <p class="hero-frase">${esc(guia.chamada)}</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <article class="prosa prosa-artigo">
    ${guia.corpo}
  </article>

  ${adSlot(`guia-${guia.slug}`)}

  ${faq(guia.faq)}

  <nav class="relacionados" aria-label="Outros guias">
    <h2>Continue aprendendo</h2>
    <ul class="chips">
      ${outros.map((g) => `<li><a class="chip" href="/${g.slug}/">${esc(g.titulo)}</a></li>`).join('\n      ')}
      <li><a class="chip" href="/livros-da-biblia/">Os 66 livros da Bíblia</a></li>
    </ul>
  </nav>
</div>`;

  return {
    caminho: `/${guia.slug}/`,
    html: pagina({
      titulo: guia.titulo,
      descricao: guia.descricao,
      caminho: `/${guia.slug}/`,
      conteudo,
      jsonLd: faqJsonLd(guia.faq),
    }),
  };
}

function hubGuias() {
  const cartoes = GUIAS.map(
    (g) => `
    <a class="cartao-tema" href="/${g.slug}/">
      <h2>${esc(g.titulo)}</h2>
      <p>${esc(g.chamada)}</p>
      <span class="cartao-tema-cta">Ler o guia completo →</span>
    </a>`
  ).join('\n');

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Guias' }])}
    <p class="hero-selo">✍ Estudo e conhecimento</p>
    <h1>Guias para Conhecer a Bíblia</h1>
    <p class="hero-frase">Artigos completos e acessíveis sobre a origem, a história e a leitura das Escrituras — escritos para quem quer ir além da superfície.</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <div class="grade-temas">
    ${cartoes}
    <a class="cartao-tema" href="/livros-da-biblia/">
      <h2>Os 66 Livros da Bíblia</h2>
      <p>De Gênesis a Apocalipse: o resumo de cada livro, com divisões, capítulos e o fio que costura toda a história.</p>
      <span class="cartao-tema-cta">Explorar a biblioteca →</span>
    </a>
  </div>

  ${adSlot('hub-guias')}
</div>`;

  return {
    caminho: '/guias/',
    html: pagina({
      titulo: 'Guias de Estudo Bíblico — história, traduções e como ler',
      descricao:
        'Guias completos sobre a Bíblia: como ler, história das Escrituras, traduções em português, autores e os 66 livros resumidos.',
      caminho: '/guias/',
      conteudo,
    }),
  };
}

function paginaLivros() {
  const perguntas = [
    { q: 'Quantos livros tem a Bíblia?', a: 'A Bíblia protestante tem 66 livros: 39 no Antigo Testamento e 27 no Novo. As Bíblias católicas somam 73, com os sete livros deuterocanônicos. No total são 1.189 capítulos na edição protestante.' },
    { q: 'Qual é o livro mais longo e o mais curto?', a: 'O mais longo é Salmos, com 150 capítulos. Os mais curtos são Obadias no Antigo Testamento e 2 João e 3 João no Novo — cada um com um único capítulo.' },
    { q: 'Em que ordem os livros estão organizados?', a: 'Não em ordem cronológica, mas por gênero: no Antigo Testamento, Lei, Históricos, Poéticos e Profetas; no Novo, Evangelhos, Atos, Cartas e Apocalipse.' },
  ];

  const secoes = GRUPOS.map((grupo) => {
    const livros = LIVROS.filter((l) => l.grupo === grupo.id);
    const itens = livros
      .map(
        (l) => `
      <li class="livro-item">
        <h3>${esc(l.nome)} <span class="livro-caps">${l.capitulos} ${l.capitulos === 1 ? 'capítulo' : 'capítulos'}</span></h3>
        <p>${esc(l.resumo)}</p>
      </li>`
      )
      .join('\n');
    return `
  <section class="grupo-livros">
    <h2><span class="grupo-selo">${grupo.testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}</span> ${esc(grupo.nome)}</h2>
    <ul class="lista-livros">
      ${itens}
    </ul>
  </section>`;
  }).join(`\n  ${ORNAMENTO}\n`);

  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: 'Livros da Bíblia' }])}
    <p class="hero-selo">📚 A biblioteca sagrada</p>
    <h1>Os 66 Livros da Bíblia</h1>
    <p class="hero-frase">De Gênesis a Apocalipse: ${LIVROS.length} livros, ${TOTAL_CAPITULOS} capítulos, uma única história — resumida livro a livro para você.</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <article class="prosa">
    <p>A palavra "Bíblia" vem do grego <em>biblía</em> — "livros", no plural. E é exatamente isso: uma biblioteca completa
    encadernada num volume só, com história, poesia, leis, cartas, biografias e profecias. O Antigo Testamento (39 livros)
    conta a criação, a aliança com Israel e a expectativa do Messias; o Novo Testamento (27 livros) apresenta Jesus, o
    nascimento da igreja e a esperança final. Abaixo, o resumo de cada livro, na ordem em que aparecem na sua Bíblia.</p>
  </article>

  ${ORNAMENTO}
  ${secoes}

  ${adSlot('livros-rodape')}

  ${faq(perguntas)}

  <nav class="relacionados" aria-label="Continue estudando">
    <h2>Continue estudando</h2>
    <ul class="chips">
      <li><a class="chip" href="/como-ler-a-biblia/">Como ler a Bíblia</a></li>
      <li><a class="chip" href="/quem-escreveu-a-biblia/">Quem escreveu a Bíblia</a></li>
      <li><a class="chip" href="/plano-de-leitura/">Plano de leitura anual</a></li>
      <li><a class="chip" href="/quiz-biblico/">Quiz bíblico</a></li>
    </ul>
  </nav>
</div>`;

  return {
    caminho: '/livros-da-biblia/',
    html: pagina({
      titulo: 'Os 66 Livros da Bíblia — resumo de cada um, em ordem',
      descricao:
        'Lista completa dos 66 livros da Bíblia em ordem, com resumo de cada um, número de capítulos e divisões do Antigo e do Novo Testamento.',
      caminho: '/livros-da-biblia/',
      conteudo,
      jsonLd: faqJsonLd(perguntas),
    }),
  };
}

export function gerarPaginasGuias() {
  return [hubGuias(), ...GUIAS.map(paginaGuia), paginaLivros()];
}
