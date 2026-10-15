/* =========================================================
   CONFIGURAÇÃO – preencha depois da conversa com a empresa
   ========================================================= */
var CONFIG = {
  // URL do "App da Web" gerado pelo Google Apps Script (ver SETUP.md).
  // Enquanto estiver vazio, o formulário só simula o envio.
  FORM_ENDPOINT: '',

  // Número do WhatsApp com DDI e DDD, só dígitos. Ex.: '5531999999999'.
  // Enquanto estiver vazio, o botão flutuante leva para a página de contato.
  WHATSAPP: '5527997437719',

  // Mensagem inicial que aparece no WhatsApp do visitante.
  WHATSAPP_MSG: 'Olá! Vim pelo site e gostaria de orientação sobre o acesso legal.'
};

(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('nav.main');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Marca a página atual no menu ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- WhatsApp flutuante ---------- */
  var wa = document.querySelector('.wa');
  if (wa) {
    if (CONFIG.WHATSAPP) {
      wa.href = 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent(CONFIG.WHATSAPP_MSG);
      wa.target = '_blank';
      wa.rel = 'noopener';
    } else {
      wa.href = 'contato.html';
    }
  }

  /* ---------- Formulário de contato ---------- */
  var form = document.getElementById('lead-form');
  if (!form) return;

  // Pré-seleciona a etapa quando o visitante chega por um botão de intenção.
  var etapa = new URLSearchParams(location.search).get('etapa');
  if (etapa) {
    var radio = form.querySelector('input[name="etapa"][value="' + etapa + '"]');
    if (radio) radio.checked = true;
  }

  var status = document.getElementById('form-status');
  var ok = document.getElementById('form-success');
  var submit = form.querySelector('button[type="submit"]');

  function done() {
    form.hidden = true;
    ok.hidden = false;
    ok.querySelector('h2').focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Armadilha simples contra robôs: campo escondido preenchido = descarta.
    if (form.querySelector('[name="website"]').value) { done(); return; }

    var data = new FormData(form);
    data.append('pagina', location.href);
    data.append('enviado_em', new Date().toISOString());

    if (!CONFIG.FORM_ENDPOINT) { done(); return; }

    submit.disabled = true;
    submit.textContent = 'Enviando…';

    // Enviado como formulário simples (x-www-form-urlencoded), que o Apps Script lê em e.parameter.
    fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', body: new URLSearchParams(data), mode: 'no-cors' })
      .then(function () { done(); })
      .catch(function () {
        status.textContent = 'Não foi possível enviar agora. Tente de novo em instantes ou fale pelo WhatsApp.';
      })
      .finally(function () {
        submit.disabled = false;
        submit.textContent = 'Enviar e receber contato';
      });
  });

  var again = document.getElementById('form-reset');
  if (again) {
    again.addEventListener('click', function () {
      form.reset();
      ok.hidden = true;
      form.hidden = false;
    });
  }
})();
