# Checklist de conformidade Google AdSense

> Guia de referência reutilizável. Este documento explica **o que o Google AdSense
> exige (ou recomenda fortemente)** para aprovar um site, e mostra **como cada item foi
> implementado no projeto BilheteLoteria.com.br** para servir de exemplo concreto.
> Use-o como checklist ao começar qualquer novo projeto que vá monetizar com AdSense.
>
> ⚠️ Políticas do Google mudam com o tempo e variam por país/nicho. Antes de aplicar,
> confira a versão oficial e atual em:
> [Políticas do programa AdSense](https://support.google.com/adsense/answer/48182) e
> [Políticas de conteúdo do Google Publisher](https://support.google.com/adsense/answer/9335564).

---

## 1. Conteúdo original e substancial

**O que o Google exige:** conteúdo próprio, útil e substancial — não uma cópia de outro
site, não páginas vazias ("thin content"), não conteúdo gerado só para preencher espaço.
Não existe um número oficial mínimo de páginas divulgado pelo Google, mas a prática de
mercado mostra que sites com poucas páginas (menos de ~15–20) e sem tráfego orgânico
prévio têm taxa de reprovação muito maior.

**Como fizemos no BilheteLoteria:**
- 10 páginas de produto (uma por loteria) com conteúdo exclusivo: regras, probabilidades
  reais, FAQ — não é só uma tabela de números (`tools/data-jogos.mjs`);
- 4 artigos editoriais longos e originais nos guias (`tools/paginas-guias.mjs`):
  qual loteria é mais fácil, imposto sobre prêmios, como receber o prêmio, como funciona
  o bolão;
- 2 ferramentas interativas com valor real para o usuário (conferidor e gerador), que
  também contam como "conteúdo/funcionalidade útil" aos olhos do revisor humano do
  AdSense;
- Total no lançamento: 24 páginas indexáveis, todas com texto único.

**Para o próximo projeto:** antes de aplicar ao AdSense, garanta pelo menos ~15–20
páginas de conteúdo próprio e substancial, e idealmente algumas semanas de site no ar
com tráfego orgânico real (não é regra oficial, mas reduz reprovação por "falta de
valor/conteúdo insuficiente").

---

## 2. Política de Privacidade (obrigatória, com menções específicas do AdSense)

**O que o Google exige:** uma Política de Privacidade acessível, que informe claramente:
- que cookies são usados;
- que o Google e parceiros usam cookies (incluindo o cookie DoubleClick DART) para
  veicular anúncios com base em visitas do usuário a este e a outros sites;
- um link para as **Configurações de anúncios do Google**
  (`https://adssettings.google.com`), onde o usuário pode desativar publicidade
  personalizada;
- como o usuário pode gerenciar/desativar cookies no navegador.

Isso é exigência tanto do AdSense quanto, no Brasil, da **LGPD** (base legal, direitos
do titular, finalidade do tratamento) — os dois se resolvem no mesmo documento.

**Como fizemos:** `tools/paginas-institucionais.mjs` → constante `PRIVACIDADE`, publicada
em `/politica-de-privacidade/`. A seção 2 ("Cookies") cita explicitamente o Google
AdSense e o cookie DART, com link para `adssettings.google.com` e para
`policies.google.com/technologies/ads`. As seções seguintes cobrem base legal (LGPD),
direitos do titular, retenção de dados e público-alvo (maiores de 18 anos).

**Para o próximo projeto:** copie a estrutura de `PRIVACIDADE` em
`tools/paginas-institucionais.mjs` e adapte nome do site, e-mail de contato e o tipo de
dado coletado — mas **mantenha sempre** o parágrafo sobre cookies do Google/AdSense e o
link de configurações de anúncios.

---

## 3. Termos de Uso

**O que o Google exige:** não é uma exigência isolada do AdSense, mas o revisor espera
ver um site "profissional e completo" — Termos de Uso deixam claro o que o site é
(e não é), limitam responsabilidade e evitam confusão sobre a natureza do serviço
(importante quando o nicho pode ser confundido com algo regulado, como apostas).

**Como fizemos:** `tools/paginas-institucionais.mjs` → constante `TERMOS`, publicada em
`/termos-de-uso/`. Deixa explícito que o site é informativo, não vende apostas, não tem
vínculo com a Caixa, e que o conteúdo não substitui aconselhamento profissional.

**Para o próximo projeto:** sempre inclua uma seção "Natureza do serviço" logo no início
dos Termos — é a que mais protege juridicamente e mais tranquiliza um revisor humano.

---

## 4. Identificação do site — "Sobre" e "Contato"

**O que o Google exige:** transparência sobre quem publica o conteúdo e um canal de
contato funcional. Sites anônimos, sem informação de quem os mantém, são um dos motivos
clássicos de reprovação.

**Como fizemos:**
- `/sobre/` (`tools/paginas-institucionais.mjs` → `SOBRE`): explica o propósito do site,
  princípios editoriais e deixa claro que não há vínculo com a Caixa;
- `/contato/` (`tools/paginas-institucionais.mjs` → `CONTATO`): e-mail de contato visível
  (`contato@bilheteloteria.com.br`, definido em `tools/layout.mjs` → `SITE.email`).

**Para o próximo projeto:** tenha um e-mail real e monitorado no domínio antes de
aplicar — e-mails que voltam (bounce) são um risco na revisão.

---

## 5. Navegação clara e consistente

**O que o Google exige:** menu de navegação fácil de usar, links que funcionam, sem
becos sem saída, sem "página em construção".

**Como fizemos:** cabeçalho (`nav()` em `tools/layout.mjs`) com menu principal fixo em
todas as páginas + rodapé (`FOOTER` no mesmo arquivo) com links para todas as loterias,
ferramentas, guias e institucionais — todo o site é alcançável em no máximo 2 cliques
a partir da home.

**Para o próximo projeto:** centralize o menu e o rodapé em um único template
compartilhado (como `pagina()` em `tools/layout.mjs`) para garantir que nenhuma página
"escape" da navegação global.

---

## 6. Robots.txt e Sitemap.xml

**O que o Google exige:** o crawler do Google (e do AdSense, `Mediapartners-Google`)
precisa conseguir rastrear o site livremente, e um sitemap ajuda a indexação completa.

**Como fizemos:** gerados automaticamente por `tools/build.mjs` a cada build:
- `robots.txt`: `Allow: /` para todos os user-agents + referência ao sitemap;
- `sitemap.xml`: lista todas as URLs canônicas com `changefreq`.

**Para o próximo projeto:** nunca bloqueie o Google no `robots.txt` (erro comum:
deixar `Disallow: /` de um ambiente de staging esquecido em produção). Depois de subir,
envie o sitemap manualmente no Google Search Console.

---

## 7. HTTPS / SSL em todo o site

**O que o Google exige:** o site precisa ser servido via HTTPS. Sem certificado válido,
o AdSense nem avalia o resto.

**Como fizemos:** o `.htaccess` na raiz força HTTPS + `www` em hospedagens Apache/cPanel.
Ao usar Vercel/Netlify/Cloudflare Pages, o HTTPS já vem automático (certificado
Let's Encrypt gerenciado pela plataforma) — o `.htaccess` nesse caso é ignorado, sem
problema.

**Para o próximo projeto:** confirme o cadeado HTTPS ativo em **todas** as páginas
(inclusive institucionais) antes de aplicar ao AdSense.

---

## 8. Site responsivo (mobile-friendly)

**O que o Google exige:** boa parte do tráfego de anúncios é mobile; o Google penaliza
e o AdSense reprova sites que quebram em telas pequenas.

**Como fizemos:** todo o CSS (`assets/css/style.css`) usa unidades relativas, grid/flex
responsivo e menu hambúrguer abaixo de 860px (`.nav-toggle`/`.main-nav.open`). Testado
sem overflow horizontal em viewport mobile (375px) durante o desenvolvimento.

**Para o próximo projeto:** teste sempre em 375px de largura antes de publicar —
overflow horizontal é o erro mobile mais comum e mais penalizado.

---

## 9. Favicon, metadados e Open Graph

**O que o Google exige:** não é uma regra formal do AdSense, mas faz parte de "site com
aparência profissional e completa", item que pesa na revisão humana.

**Como fizemos:** `favicon.svg` gerado em `tools/layout.mjs` (`FAVICON_SVG`), com
`<title>`, `<meta name="description">`, `rel="canonical"` e tags Open Graph completas em
todas as páginas (bloco `<head>` de `pagina()` em `tools/layout.mjs`).

**Para o próximo projeto:** centralize esse `<head>` num único template — evita esquecer
metadados em alguma página nova.

---

## 10. Consentimento de cookies (LGPD/GDPR)

**O que o Google exige/recomenda:** não é obrigatório em todo país, mas se o site recebe
tráfego da UE, é exigência legal (GDPR) ter consentimento antes de cookies não
essenciais; no Brasil, a LGPD pede transparência equivalente. É uma boa prática que
reforça a Política de Privacidade perante o revisor.

**Como fizemos:** banner de cookies (`tools/layout.mjs` → bloco `.cookie-banner`),
controlado por `assets/js/app.js` → `initCookieBanner()`, que grava a escolha do usuário
em `localStorage` e não reaparece depois de decidido.

**Para o próximo projeto:** reaproveite o componente inteiro — HTML, CSS
(`.cookie-banner` em `style.css`) e JS (`initCookieBanner`) são independentes de nicho.

---

## 11. Conteúdo proibido / restrito — revise com atenção ao seu nicho

**O que o Google exige:** conteúdo adulto, violento, discurso de ódio, drogas,
armas, conteúdo enganoso ("ganhe dinheiro fácil", "método garantido") e certas
categorias de jogos de azar/apostas são proibidos ou restritos, e as regras variam
**por país**. Isso é o item mais arriscado e mais específico de cada projeto — não dá
para copiar cegamente de um site para outro.

**Como tratamos no BilheteLoteria (nicho de loteria):**
- Deixamos claro em toda página que é **conteúdo informativo sobre loterias estatais
  oficiais**, sem venda de apostas nem intermediação (`tools/layout.mjs`, aviso legal no
  rodapé; `/sobre/` e `/termos-de-uso/` reforçam isso);
- Nunca prometemos "método para ganhar" — os guias são deliberadamente honestos sobre
  probabilidades reais e mencionam expectativa negativa (`tools/paginas-guias.mjs`);
- Página dedicada de **Jogo Responsável** com sinais de alerta e canais de ajuda
  (`/jogo-responsavel/`, `JOGO_RESPONSAVEL` em `tools/paginas-institucionais.mjs`);
- Aviso de **+18** fixo no rodapé de todas as páginas (`.age-strip` em `tools/layout.mjs`).

**Para o próximo projeto:** identifique se seu nicho toca em categoria sensível
(apostas, saúde, finanças, álcool, etc.) e pesquise a política **específica** do Google
para essa categoria e para o país de atuação antes de escrever o conteúdo — não assuma
que por ser legal no seu país o AdSense vai aceitar automaticamente.

---

## 12. Anúncios: onde e como (para quando o AdSense for aprovado)

**O que o Google exige:** não pode disfarçar anúncio como conteúdo/botão do site, não
pode incentivar clique ("clique aqui para nos apoiar"), tem limite de densidade de
anúncios por página e não pode sobrepor conteúdo.

**Como preparamos o terreno:** já existe a classe `.ad-slot` no design system
(`assets/css/style.css`), pronta para receber blocos de anúncio de forma neutra
(tracejado, sem se passar por conteúdo), posicionada entre seções — só falta colar o
código do AdSense dentro quando a conta for aprovada.

**Para o próximo projeto:** reserve os espaços de anúncio no layout **antes** da
aprovação (com um placeholder neutro como o `.ad-slot`), assim você já sabe que o layout
não quebra quando os anúncios reais entrarem.

---

## 13. Depois da aprovação: `ads.txt`

**O que o Google exige:** após aprovado, o Google exige um arquivo `ads.txt` na raiz do
domínio, listando quem está autorizado a vender inventário de anúncios do site — sem
ele, o AdSense passa a rejeitar impressões.

**Como preparamos:** documentado no `README.md` deste projeto — assim que aprovado,
criar `ads.txt` na raiz com a linha fornecida pelo painel do AdSense, formato:
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

**Para o próximo projeto:** isso só existe depois da aprovação (o Google fornece o
`pub-ID` exato) — não dá para criar antecipadamente, mas já deixe anotado no README para
não esquecer no dia.

---

## Checklist rápido para copiar em um novo projeto

```
[ ] 15–20+ páginas de conteúdo original e substancial (nada de thin content)
[ ] Política de Privacidade com: cookies, cookie DART do Google, link para
    adssettings.google.com, base legal LGPD/GDPR
[ ] Termos de Uso com seção "natureza do serviço"
[ ] Página "Sobre" com identificação clara de quem publica
[ ] Página "Contato" com e-mail real e monitorado
[ ] Menu de navegação + rodapé presentes em 100% das páginas
[ ] robots.txt liberando o Google (Allow: /) + referência ao sitemap
[ ] sitemap.xml com todas as URLs canônicas
[ ] HTTPS ativo em todo o site
[ ] Responsivo — testado em 375px sem overflow horizontal
[ ] Favicon + <title>/description/canonical/OG em todas as páginas
[ ] Banner de consentimento de cookies (LGPD/GDPR)
[ ] Revisão específica de política de conteúdo restrito do seu nicho
[ ] Nenhuma promessa enganosa de ganho fácil / clickbait
[ ] Espaços de anúncio (.ad-slot ou equivalente) já reservados no layout
[ ] (Só após aprovação) ads.txt criado na raiz com o pub-ID fornecido
```
