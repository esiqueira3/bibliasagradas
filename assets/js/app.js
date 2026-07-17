// =====================================================================
// app.js — nav mobile, cookie banner, botões de copiar, versículo do
// dia, gerador de versículos, plano de leitura (localStorage), quiz e
// seletores customizados. Vanilla JS, sem dependências.
// =====================================================================

(function () {
  'use strict';

  let contadorSeletor = 0;

  function lerJSON(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return null;
    }
  }

  function diaDoAno(data) {
    const inicio = new Date(data.getFullYear(), 0, 0);
    const diff = data - inicio;
    return Math.floor(diff / 86400000);
  }

  // ---------------- Menu mobile ----------------
  function initNavToggle() {
    const botao = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!botao || !nav) return;
    botao.addEventListener('click', () => {
      const aberto = nav.classList.toggle('open');
      botao.setAttribute('aria-expanded', String(aberto));
    });
  }

  // ---------------- Cookie banner ----------------
  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    const chave = 'bs_cookie_consent';
    if (!localStorage.getItem(chave)) {
      banner.hidden = false;
    }
    banner.querySelectorAll('[data-cookie]').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem(chave, btn.dataset.cookie);
        banner.hidden = true;
      });
    });
  }

  // ---------------- Botões de copiar (versículos avulsos) ----------------
  function initCopiarBotoes() {
    document.querySelectorAll('button.copiar[data-copiar]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const texto = btn.dataset.copiar;
        try {
          await navigator.clipboard.writeText(texto);
        } catch (e) {
          const area = document.createElement('textarea');
          area.value = texto;
          document.body.appendChild(area);
          area.select();
          document.execCommand('copy');
          document.body.removeChild(area);
        }
        const original = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.setAttribute('data-copiado', '');
        setTimeout(() => {
          btn.textContent = original;
          btn.removeAttribute('data-copiado');
        }, 1800);
      });
    });
  }

  async function copiarTexto(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch (e) {
      const area = document.createElement('textarea');
      area.value = texto;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
      return true;
    }
  }

  // ---------------- Versículo do Dia ----------------
  function initVersiculoDoDia() {
    const painel = document.getElementById('painel-versiculo-dia');
    if (!painel) return;
    const versiculos = lerJSON('dados-versiculos');
    if (!versiculos || !versiculos.length) return;

    const hoje = new Date();
    const indice = diaDoAno(hoje) % versiculos.length;
    const v = versiculos[indice];

    const elData = document.getElementById('vdd-data');
    const elTexto = document.getElementById('vdd-texto');
    const elRef = document.getElementById('vdd-ref');
    const elTema = document.getElementById('vdd-tema');
    const elCopiar = document.getElementById('vdd-copiar');
    const elLinkTema = document.getElementById('vdd-link-tema');

    if (elData) {
      elData.textContent = hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    }
    if (elTexto) elTexto.textContent = `“${v.texto}”`;
    if (elRef) elRef.textContent = v.ref;
    if (elTema) elTema.textContent = `Tema: ${v.tema}`;
    if (elLinkTema && v.slugTema) elLinkTema.setAttribute('href', `/${v.slugTema}/`);

    if (elCopiar) {
      elCopiar.addEventListener('click', async () => {
        await copiarTexto(`“${v.texto}” — ${v.ref}`);
        const original = elCopiar.textContent;
        elCopiar.textContent = 'Copiado!';
        setTimeout(() => (elCopiar.textContent = original), 1800);
      });
    }
  }

  // ---------------- Gerador de Versículos ----------------
  function initGerador() {
    const painel = document.getElementById('painel-gerador');
    if (!painel) return;
    const versiculos = lerJSON('dados-versiculos');
    if (!versiculos || !versiculos.length) return;

    const selectTema = document.getElementById('gerador-tema');
    const botao = document.getElementById('gerador-botao');
    const resultado = document.getElementById('gerador-resultado');
    const elTexto = document.getElementById('gerador-texto');
    const elRef = document.getElementById('gerador-ref');
    const elTemaAtual = document.getElementById('gerador-tema-atual');
    const acoes = document.getElementById('gerador-acoes');
    const elCopiar = document.getElementById('gerador-copiar');
    let atual = null;

    botao.addEventListener('click', () => {
      const temaFiltro = selectTema.value;
      const lista = temaFiltro ? versiculos.filter((v) => v.tema === temaFiltro) : versiculos;
      if (!lista.length) return;
      atual = lista[Math.floor(Math.random() * lista.length)];
      elTexto.textContent = `“${atual.texto}”`;
      elRef.textContent = atual.ref;
      elTemaAtual.textContent = `Tema: ${atual.tema}`;
      resultado.hidden = false;
      acoes.hidden = false;
    });

    if (elCopiar) {
      elCopiar.addEventListener('click', async () => {
        if (!atual) return;
        await copiarTexto(`“${atual.texto}” — ${atual.ref}`);
        const original = elCopiar.textContent;
        elCopiar.textContent = 'Copiado!';
        setTimeout(() => (elCopiar.textContent = original), 1800);
      });
    }
  }

  // ---------------- Plano de Leitura ----------------
  function initPlanoLeitura() {
    const painel = document.getElementById('painel-plano');
    if (!painel) return;
    const plano = lerJSON('dados-plano');
    if (!plano || !plano.length) return;

    const CHAVE = 'bs_plano_progresso';
    let progresso = {};
    try {
      progresso = JSON.parse(localStorage.getItem(CHAVE) || '{}');
    } catch (e) {
      progresso = {};
    }

    const lista = document.getElementById('plano-lista');
    const barra = document.getElementById('plano-barra');
    const barraWrap = document.getElementById('plano-barra-wrap');
    const status = document.getElementById('plano-status');
    const botaoMais = document.getElementById('plano-mais');
    const botaoLimpar = document.getElementById('plano-limpar');

    let visiveis = 14;

    function contarFeitos() {
      return Object.values(progresso).filter(Boolean).length;
    }

    function atualizarResumo() {
      const feitos = contarFeitos();
      const pct = Math.round((feitos / plano.length) * 100);
      barra.style.width = pct + '%';
      barraWrap.setAttribute('aria-valuenow', String(feitos));
      status.textContent = `${feitos} de ${plano.length} dias concluídos (${pct}%)`;
    }

    function renderizar() {
      lista.innerHTML = '';
      const primeiroPendente = plano.findIndex((_, i) => !progresso[i]);
      const inicio = primeiroPendente === -1 ? 0 : Math.max(0, primeiroPendente - 1);
      const fim = Math.min(plano.length, inicio + visiveis);

      for (let i = inicio; i < fim; i++) {
        const dia = plano[i];
        const feito = !!progresso[i];
        const linha = document.createElement('div');
        linha.className = 'plano-dia' + (feito ? ' feito' : '');
        const idCheckbox = `plano-dia-${i}`;
        linha.innerHTML = `
          <input type="checkbox" id="${idCheckbox}" ${feito ? 'checked' : ''}>
          <label for="${idCheckbox}"><strong>Dia ${i + 1}</strong><span>${dia.join(' · ')}</span></label>
        `;
        const checkbox = linha.querySelector('input');
        checkbox.addEventListener('change', () => {
          progresso[i] = checkbox.checked;
          localStorage.setItem(CHAVE, JSON.stringify(progresso));
          linha.classList.toggle('feito', checkbox.checked);
          atualizarResumo();
        });
        lista.appendChild(linha);
      }
      botaoMais.hidden = fim >= plano.length;
    }

    botaoMais.addEventListener('click', () => {
      visiveis += 14;
      renderizar();
    });

    botaoLimpar.addEventListener('click', () => {
      if (!confirm('Isso vai apagar todo o seu progresso salvo neste navegador. Deseja continuar?')) return;
      progresso = {};
      localStorage.setItem(CHAVE, JSON.stringify(progresso));
      visiveis = 14;
      atualizarResumo();
      renderizar();
    });

    atualizarResumo();
    renderizar();
  }

  // ---------------- Quiz Bíblico ----------------
  function initQuiz() {
    const painel = document.getElementById('painel-quiz');
    if (!painel) return;
    const perguntas = lerJSON('dados-quiz');
    if (!perguntas || !perguntas.length) return;

    const telaInicio = document.getElementById('quiz-inicio');
    const telaJogo = document.getElementById('quiz-jogo');
    const telaFim = document.getElementById('quiz-fim');
    const botaoComecar = document.getElementById('quiz-comecar');
    const elProgresso = document.getElementById('quiz-progresso');
    const elPergunta = document.getElementById('quiz-pergunta');
    const elOpcoes = document.getElementById('quiz-opcoes');
    const elDica = document.getElementById('quiz-dica');
    const botaoProxima = document.getElementById('quiz-proxima');
    const elPlacar = document.getElementById('quiz-placar');
    const elMensagem = document.getElementById('quiz-mensagem');
    const botaoReiniciar = document.getElementById('quiz-reiniciar');

    let ordem = [];
    let indice = 0;
    let acertos = 0;

    function embaralhar(arr) {
      const copia = arr.slice();
      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
      }
      return copia;
    }

    function iniciar() {
      ordem = embaralhar(perguntas.map((_, i) => i));
      indice = 0;
      acertos = 0;
      telaInicio.hidden = true;
      telaFim.hidden = true;
      telaJogo.hidden = false;
      mostrarPergunta();
    }

    function mostrarPergunta() {
      const q = perguntas[ordem[indice]];
      elProgresso.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
      elPergunta.textContent = q.p;
      elDica.hidden = true;
      botaoProxima.hidden = true;
      elOpcoes.innerHTML = '';
      q.op.forEach((opcao, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-opcao';
        btn.textContent = opcao;
        btn.addEventListener('click', () => responder(i));
        elOpcoes.appendChild(btn);
      });
    }

    function responder(escolhida) {
      const q = perguntas[ordem[indice]];
      const botoes = elOpcoes.querySelectorAll('.quiz-opcao');
      botoes.forEach((b, i) => {
        b.disabled = true;
        if (i === q.r) b.classList.add('certa');
        else if (i === escolhida) b.classList.add('errada');
      });
      if (escolhida === q.r) acertos++;
      elDica.hidden = false;
      elDica.textContent = q.dica;
      botaoProxima.hidden = false;
    }

    botaoProxima.addEventListener('click', () => {
      indice++;
      if (indice >= perguntas.length) {
        finalizar();
      } else {
        mostrarPergunta();
      }
    });

    function finalizar() {
      telaJogo.hidden = true;
      telaFim.hidden = false;
      elPlacar.textContent = `${acertos} / ${perguntas.length}`;
      const pct = acertos / perguntas.length;
      let msg;
      if (pct === 1) msg = 'Perfeito! Você conhece a Bíblia de cor e salteado. ✦';
      else if (pct >= 0.7) msg = 'Muito bom! Você tem um conhecimento sólido das Escrituras.';
      else if (pct >= 0.4) msg = 'Bom começo — que tal ler mais um pouco e tentar de novo?';
      else msg = 'Toda jornada começa com um passo. Explore nossos guias e volte para jogar outra vez!';
      elMensagem.textContent = msg;
    }

    botaoComecar.addEventListener('click', iniciar);
    botaoReiniciar.addEventListener('click', iniciar);
  }

  // ---------------- Seletores customizados ----------------
  // Substitui todo <select> nativo por um menu estilizado (gatilho +
  // lista flutuante), mantendo o <select> original oculto como fonte
  // de valor — qualquer outro script que leia `.value` continua
  // funcionando sem mudanças.
  function initSeletoresCustom() {
    document.querySelectorAll('select').forEach(montarSeletorCustom);
  }

  function montarSeletorCustom(select) {
    const idBase = select.id || `seletor-gerado-${++contadorSeletor}`;

    const wrap = document.createElement('div');
    wrap.className = 'seletor-custom';

    const gatilho = document.createElement('button');
    gatilho.type = 'button';
    gatilho.className = 'seletor-gatilho';
    gatilho.setAttribute('aria-haspopup', 'listbox');
    gatilho.setAttribute('aria-expanded', 'false');

    const valorSpan = document.createElement('span');
    valorSpan.className = 'seletor-valor';

    const seta = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    seta.setAttribute('viewBox', '0 0 12 8');
    seta.setAttribute('fill', 'none');
    seta.setAttribute('aria-hidden', 'true');
    seta.classList.add('seletor-seta');
    seta.innerHTML = '<path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';

    gatilho.appendChild(valorSpan);
    gatilho.appendChild(seta);

    const lista = document.createElement('ul');
    lista.className = 'seletor-lista';
    lista.setAttribute('role', 'listbox');
    lista.id = `${idBase}-lista`;
    gatilho.setAttribute('aria-controls', lista.id);

    const opcoes = [...select.options].map((opt, i) => {
      const li = document.createElement('li');
      li.className = 'seletor-opcao';
      li.setAttribute('role', 'option');
      li.id = `${idBase}-opcao-${i}`;
      li.dataset.valor = opt.value;
      li.textContent = opt.textContent;
      lista.appendChild(li);
      return li;
    });

    let destacada = null;

    function destacar(li) {
      if (destacada) destacada.classList.remove('realce');
      destacada = li;
      if (li) {
        li.classList.add('realce');
        gatilho.setAttribute('aria-activedescendant', li.id);
        li.scrollIntoView({ block: 'nearest' });
      }
    }

    function atualizarVisual() {
      const atual = select.options[select.selectedIndex];
      valorSpan.textContent = atual ? atual.textContent : '';
      opcoes.forEach((li) => li.setAttribute('aria-selected', li.dataset.valor === select.value ? 'true' : 'false'));
    }

    function fechar() {
      wrap.classList.remove('aberto');
      gatilho.setAttribute('aria-expanded', 'false');
    }

    function abrir() {
      wrap.classList.add('aberto');
      gatilho.setAttribute('aria-expanded', 'true');
      const atual = opcoes.find((li) => li.dataset.valor === select.value) || opcoes[0];
      destacar(atual);
    }

    function escolher(li) {
      select.value = li.dataset.valor;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      atualizarVisual();
      fechar();
      gatilho.focus();
    }

    gatilho.addEventListener('click', () => {
      wrap.classList.contains('aberto') ? fechar() : abrir();
    });

    gatilho.addEventListener('keydown', (e) => {
      const aberto = wrap.classList.contains('aberto');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!aberto) { abrir(); return; }
        destacar(opcoes[Math.min(opcoes.indexOf(destacada) + 1, opcoes.length - 1)]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!aberto) { abrir(); return; }
        destacar(opcoes[Math.max(opcoes.indexOf(destacada) - 1, 0)]);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (aberto && destacada) escolher(destacada);
        else abrir();
      } else if (e.key === 'Escape' && aberto) {
        e.preventDefault();
        fechar();
      }
    });

    opcoes.forEach((li) => {
      li.addEventListener('click', () => escolher(li));
      li.addEventListener('mouseenter', () => destacar(li));
    });

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) fechar();
    });

    wrap.appendChild(gatilho);
    wrap.appendChild(lista);
    select.insertAdjacentElement('afterend', wrap);
    select.hidden = true;

    atualizarVisual();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavToggle();
    initCookieBanner();
    initCopiarBotoes();
    initSeletoresCustom();
    initVersiculoDoDia();
    initGerador();
    initPlanoLeitura();
    initQuiz();
  });
})();
