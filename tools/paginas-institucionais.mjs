// =====================================================================
// paginas-institucionais.mjs — Sobre, Contato, Política de Privacidade
// e Termos de Uso. Segue o checklist AdSense (Adsense.md): cookies do
// Google/DART, link para adssettings.google.com, base legal LGPD,
// identificação do publicador e canal de contato real.
// =====================================================================

import { pagina, migalhas, adSlot, esc, SITE } from './layout.mjs';

function envelopar({ selo, titulo, frase, corpo, caminho, tituloMeta, descricao }) {
  const conteudo = `
<section class="hero hero-interna">
  <div class="container">
    ${migalhas([{ rotulo: 'Início', href: '/' }, { rotulo: titulo }])}
    <p class="hero-selo">${esc(selo)}</p>
    <h1>${esc(titulo)}</h1>
    <p class="hero-frase">${esc(frase)}</p>
  </div>
</section>

<div class="container conteudo-pagina">
  <article class="prosa prosa-artigo">
    ${corpo}
  </article>
</div>`;
  return { caminho, html: pagina({ titulo: tituloMeta, descricao, caminho, conteudo }) };
}

// ---------------------------------------------------------------------
const SOBRE = envelopar({
  selo: '✦ Quem somos',
  titulo: 'Sobre o Bíblias Sagradas',
  frase: 'Um projeto independente para tornar a Palavra de Deus acessível, bela e gratuita para todos.',
  caminho: '/sobre/',
  tituloMeta: 'Sobre o site — quem somos e nossos princípios',
  descricao:
    'Conheça o BibliaSagradas.com.br: um projeto editorial independente dedicado a versículos, salmos e guias de leitura bíblica gratuitos.',
  corpo: `
<h2>O que é este site</h2>
<p>O <strong>${esc(SITE.nome)}</strong> (${esc(SITE.dominio)}) é um projeto editorial independente dedicado a um único
propósito: ajudar pessoas a encontrar, entender e amar o texto da Bíblia Sagrada. Aqui você encontra versículos
organizados por tema, salmos completos com explicação, um plano de leitura anual, ferramentas devocionais e guias sobre
a história e a leitura das Escrituras — tudo gratuito.</p>

<h2>Nossos princípios editoriais</h2>
<ul>
<li><strong>Fidelidade ao texto:</strong> todo texto bíblico publicado traz a referência completa (livro, capítulo e
versículo) e usa a tradução João Ferreira de Almeida, Revista e Corrigida, em domínio público no Brasil.</li>
<li><strong>Conteúdo original:</strong> introduções, explicações, reflexões e guias são escritos exclusivamente para este
site — nada é copiado de outros portais.</li>
<li><strong>Sem proselitismo denominacional:</strong> o site é cristão em sua inspiração, mas não pertence nem promove
nenhuma igreja, denominação ou ministério específico. Nosso conteúdo serve a leitores de todas as tradições cristãs —
e a qualquer pessoa curiosa sobre a Bíblia.</li>
<li><strong>Responsabilidade:</strong> nosso conteúdo tem caráter devocional, educativo e informativo. Ele não substitui
o aconselhamento de líderes religiosos nem orientação profissional de saúde (física ou mental), jurídica ou financeira.</li>
</ul>

<h2>Como o site se mantém</h2>
<p>O ${esc(SITE.nome)} é mantido com recursos próprios e, futuramente, por meio de publicidade (Google AdSense),
sempre exibida de forma claramente identificada e separada do conteúdo. O acesso a todo o conteúdo é e continuará
sendo gratuito.</p>

<h2>Fale conosco</h2>
<p>Sugestões, correções e dúvidas são muito bem-vindas — inclusive apontamentos sobre o texto bíblico ou referências.
Escreva para <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> ou visite a nossa
<a href="/contato/">página de contato</a>.</p>`,
});

// ---------------------------------------------------------------------
const CONTATO = envelopar({
  selo: '✉ Fale conosco',
  titulo: 'Contato',
  frase: 'Dúvidas, sugestões, correções ou parcerias — respondemos com atenção a cada mensagem.',
  caminho: '/contato/',
  tituloMeta: 'Contato — fale com a equipe do site',
  descricao:
    'Entre em contato com o BibliaSagradas.com.br: dúvidas, sugestões de conteúdo, correções e parcerias. E-mail respondido com atenção.',
  corpo: `
<h2>Canal de atendimento</h2>
<p>Nosso canal oficial de contato é o e-mail:</p>
<p class="contato-email"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
<p>Respondemos, em geral, em até 5 dias úteis.</p>

<h2>Sobre o que você pode nos escrever</h2>
<ul>
<li><strong>Correções:</strong> encontrou um erro em algum versículo, referência ou explicação? Avise-nos — a precisão
do texto é nossa prioridade máxima e corrigimos rapidamente.</li>
<li><strong>Sugestões de conteúdo:</strong> um tema de versículos que você gostaria de ver, um salmo para explicarmos,
uma ferramenta que faria diferença na sua leitura.</li>
<li><strong>Direitos autorais:</strong> se você entende que algum conteúdo infringe direitos, escreva-nos com os
detalhes e analisaremos com urgência.</li>
<li><strong>Privacidade (LGPD):</strong> para exercer seus direitos como titular de dados — acesso, correção ou
eliminação —, use o mesmo e-mail. Saiba mais na nossa <a href="/politica-de-privacidade/">Política de Privacidade</a>.</li>
<li><strong>Parcerias e imprensa:</strong> propostas sérias e alinhadas ao propósito do site são bem-vindas.</li>
</ul>

<h2>O que não fazemos</h2>
<p>Por respeito a você, deixamos claro: não realizamos aconselhamento pastoral, psicológico ou de qualquer natureza
profissional por e-mail, e não solicitamos dados pessoais sensíveis, senhas ou pagamentos por mensagem. Se você estiver
atravessando uma crise emocional, procure ajuda qualificada — no Brasil, o CVV atende gratuitamente pelo telefone 188,
24 horas por dia.</p>`,
});

// ---------------------------------------------------------------------
const PRIVACIDADE = envelopar({
  selo: '🔒 Transparência',
  titulo: 'Política de Privacidade',
  frase: 'Como tratamos seus dados, quais cookies usamos e quais são os seus direitos — em linguagem clara.',
  caminho: '/politica-de-privacidade/',
  tituloMeta: 'Política de Privacidade',
  descricao:
    'Política de Privacidade do BibliaSagradas.com.br: uso de cookies, publicidade Google AdSense, base legal LGPD e direitos do titular de dados.',
  corpo: `
<p><em>Última atualização: julho de 2026.</em></p>

<h2>1. Quem somos e o escopo desta política</h2>
<p>Esta Política de Privacidade descreve como o site <strong>${esc(SITE.nome)}</strong>, disponível em
<strong>${esc(SITE.url)}</strong> ("nós", "site"), coleta, usa e protege informações dos visitantes, em conformidade com a
Lei Geral de Proteção de Dados brasileira (Lei nº 13.709/2018 — LGPD) e, quando aplicável, com o Regulamento Geral de
Proteção de Dados europeu (GDPR). Ao utilizar o site, você concorda com as práticas aqui descritas.</p>

<h2>2. Cookies e publicidade (Google AdSense)</h2>
<p>Este site utiliza cookies — pequenos arquivos de texto armazenados no seu navegador — para funcionamento básico,
métricas de audiência e exibição de publicidade.</p>
<p><strong>Publicidade do Google:</strong> o Google, como fornecedor terceirizado, utiliza cookies — incluindo o
<strong>cookie DART (DoubleClick)</strong> — para veicular anúncios neste site com base nas visitas anteriores do usuário
a este e a outros sites da internet. Isso permite que os anúncios exibidos sejam mais relevantes para você.</p>
<p>Você pode <strong>desativar a publicidade personalizada</strong> a qualquer momento acessando as
<a href="https://adssettings.google.com" rel="noopener nofollow" target="_blank">Configurações de anúncios do Google</a>.
Para saber mais sobre como o Google utiliza dados em publicidade, visite
<a href="https://policies.google.com/technologies/ads?hl=pt-BR" rel="noopener nofollow" target="_blank">policies.google.com/technologies/ads</a>.
Você também pode desativar cookies de terceiros de outros fornecedores em
<a href="https://www.aboutads.info/choices" rel="noopener nofollow" target="_blank">aboutads.info</a>.</p>

<h2>3. Como gerenciar ou desativar cookies</h2>
<p>Além do banner de consentimento exibido na sua primeira visita, você pode gerenciar cookies diretamente no navegador:
em geral, no menu de configurações, seção "Privacidade e segurança", é possível bloquear cookies de terceiros, apagar os
já armazenados ou navegar em modo anônimo. Note que bloquear todos os cookies pode afetar funcionalidades como o
salvamento do progresso do plano de leitura (que usa armazenamento local do próprio navegador e não é enviado a servidores).</p>

<h2>4. Dados que coletamos</h2>
<ul>
<li><strong>Dados de navegação:</strong> de forma automática e agregada, informações como páginas visitadas, tipo de
dispositivo, navegador e origem do acesso, para fins estatísticos e de melhoria do site.</li>
<li><strong>Dados de contato:</strong> se você nos escreve por e-mail, tratamos seu endereço de e-mail e o conteúdo da
mensagem exclusivamente para responder à sua solicitação.</li>
<li><strong>Preferências locais:</strong> escolhas como o consentimento de cookies e o progresso do plano de leitura são
gravadas no armazenamento local do seu navegador (localStorage) e permanecem no seu dispositivo.</li>
</ul>
<p>Não solicitamos nem coletamos dados sensíveis, não exigimos cadastro e não vendemos dados pessoais a terceiros.</p>

<h2>5. Base legal (LGPD)</h2>
<p>Tratamos dados pessoais com fundamento no <strong>legítimo interesse</strong> (art. 7º, IX, LGPD) para métricas e
segurança do site; no <strong>consentimento</strong> (art. 7º, I) para cookies de publicidade personalizada; e no
<strong>atendimento a solicitação do titular</strong> quando você nos contata.</p>

<h2>6. Direitos do titular</h2>
<p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento: confirmação do tratamento, acesso aos dados,
correção, anonimização, eliminação, portabilidade e informações sobre compartilhamento. Para exercer esses direitos,
escreva para <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>. Responderemos nos prazos legais.</p>

<h2>7. Retenção e segurança</h2>
<p>Mensagens de contato são mantidas apenas pelo tempo necessário ao atendimento e a obrigações legais. O site é servido
integralmente por HTTPS, e não mantemos bancos de dados de usuários — o que, por desenho, minimiza riscos de vazamento.</p>

<h2>8. Links para terceiros</h2>
<p>Nosso conteúdo pode conter links para sites externos (por exemplo, páginas oficiais do Google). Não nos
responsabilizamos pelas práticas de privacidade desses sites; recomendamos a leitura das políticas de cada um.</p>

<h2>9. Público-alvo</h2>
<p>O site tem conteúdo adequado a todas as idades, mas seus serviços interativos e canais de contato destinam-se a
maiores de 18 anos ou a menores acompanhados de seus responsáveis legais.</p>

<h2>10. Alterações desta política</h2>
<p>Esta política pode ser atualizada para refletir mudanças legais ou operacionais. A data da última atualização consta
no topo da página. Alterações relevantes serão destacadas nesta página.</p>`,
});

// ---------------------------------------------------------------------
const TERMOS = envelopar({
  selo: '📄 Regras claras',
  titulo: 'Termos de Uso',
  frase: 'O que este site é, o que ele não é, e as condições para usar o nosso conteúdo.',
  caminho: '/termos-de-uso/',
  tituloMeta: 'Termos de Uso',
  descricao:
    'Termos de Uso do BibliaSagradas.com.br: natureza do serviço, direitos autorais do conteúdo, uso permitido e limitação de responsabilidade.',
  corpo: `
<p><em>Última atualização: julho de 2026.</em></p>

<h2>1. Natureza do serviço</h2>
<p>O <strong>${esc(SITE.nome)}</strong> (${esc(SITE.url)}) é um site de conteúdo <strong>devocional, educativo e
informativo</strong> sobre a Bíblia Sagrada: versículos organizados por tema, salmos com explicação, guias de estudo e
ferramentas gratuitas de leitura. O site <strong>não é</strong> uma igreja, instituição religiosa ou ministério; não
realiza aconselhamento pastoral, psicológico, médico, jurídico ou financeiro; não solicita dízimos, ofertas ou doações;
e não possui vínculo com nenhuma denominação, editora ou sociedade bíblica.</p>

<h2>2. Aceitação</h2>
<p>Ao acessar o site, você concorda com estes Termos de Uso e com a nossa
<a href="/politica-de-privacidade/">Política de Privacidade</a>. Se não concordar, pedimos que não utilize o site.</p>

<h2>3. Conteúdo bíblico e direitos autorais</h2>
<p>O texto bíblico publicado utiliza a tradução <strong>João Ferreira de Almeida, Revista e Corrigida</strong>, que se
encontra em domínio público no Brasil. Já os textos editoriais — introduções, explicações, reflexões, guias, resumos e
perguntas frequentes —, bem como o design e o código do site, são de autoria própria e protegidos por direitos autorais
(Lei nº 9.610/1998).</p>
<p><strong>Uso permitido:</strong> você pode citar trechos do nosso conteúdo editorial para fins não comerciais, com
atribuição clara e link para a página original. <strong>Não é permitido</strong> reproduzir páginas inteiras, copiar
sistematicamente o conteúdo ou utilizá-lo para treinar produtos concorrentes sem autorização por escrito.</p>

<h2>4. Isenção de responsabilidade</h2>
<p>Trabalhamos com rigor para manter o conteúdo preciso, mas ele é fornecido "como está", sem garantias de qualquer
natureza. Interpretações bíblicas variam entre tradições cristãs; nossos textos explicativos representam leituras amplamente
aceitas, mas não constituem posição doutrinária oficial de nenhuma igreja. Decisões pessoais — espirituais, de saúde,
financeiras ou jurídicas — não devem se basear exclusivamente no conteúdo deste site.</p>

<h2>5. Ferramentas interativas</h2>
<p>O versículo do dia, o gerador de versículos, o plano de leitura e o quiz são oferecidos gratuitamente, para uso pessoal.
O progresso do plano de leitura é salvo apenas no seu navegador; limpar os dados do navegador apaga esse progresso, e não
temos como recuperá-lo.</p>

<h2>6. Publicidade</h2>
<p>O site pode exibir anúncios de terceiros (Google AdSense), sempre identificados como publicidade e separados do
conteúdo editorial. Não endossamos os produtos anunciados, e eventuais negócios entre você e anunciantes são de exclusiva
responsabilidade das partes envolvidas.</p>

<h2>7. Links externos</h2>
<p>Links para sites de terceiros são oferecidos por conveniência. Não controlamos nem nos responsabilizamos pelo conteúdo
ou pelas práticas desses sites.</p>

<h2>8. Alterações</h2>
<p>Estes termos podem ser atualizados a qualquer momento, com a data de revisão indicada no topo. O uso continuado do
site após alterações implica concordância com a versão vigente.</p>

<h2>9. Contato e foro</h2>
<p>Dúvidas sobre estes termos: <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>. Estes Termos são regidos pelas
leis da República Federativa do Brasil.</p>`,
});

export function gerarPaginasInstitucionais() {
  return [SOBRE, CONTATO, PRIVACIDADE, TERMOS];
}
