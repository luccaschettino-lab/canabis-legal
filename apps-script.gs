/**
 * Recebe os contatos do formulário do site e grava numa planilha do Google.
 * Também envia um e-mail de aviso a cada novo contato.
 *
 * Como instalar: veja SETUP.md na raiz do projeto.
 */

// E-mail que recebe o aviso de novo contato (pode ser o do seu pai).
var EMAIL_AVISO = 'COLOQUE-O-EMAIL-AQUI@exemplo.com';

// Nome da aba da planilha onde os contatos ficam.
var ABA = 'Contatos';

var COLUNAS = [
  'Recebido em', 'Nome', 'WhatsApp', 'Cidade/UF', 'Para quem',
  'Etapa', 'Mensagem', 'Consentimento LGPD', 'Página', 'Status'
];

var ETAPAS = {
  'sem-prescricao': 'Ainda não tem prescrição',
  'com-prescricao': 'Já tem prescrição',
  'com-autorizacao': 'Já tem autorização da ANVISA',
  'nao-sei': 'Não sabe'
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};

    // Descarta robôs (campo escondido preenchido) e envios sem consentimento.
    if (p.website || p.consentimento_lgpd !== 'sim') return ok_();

    var sheet = aba_();
    var linha = [
      new Date(),
      limpa_(p.nome),
      limpa_(p.whatsapp),
      limpa_(p.cidade_uf),
      p.para_quem === 'outra-pessoa' ? 'Outra pessoa' : 'Para si',
      ETAPAS[p.etapa] || limpa_(p.etapa),
      limpa_(p.mensagem),
      'Sim',
      limpa_(p.pagina),
      'Novo'
    ];
    sheet.appendRow(linha);

    if (EMAIL_AVISO.indexOf('@exemplo.com') === -1) {
      MailApp.sendEmail({
        to: EMAIL_AVISO,
        subject: 'Novo contato pelo site: ' + linha[1],
        body: [
          'Nome: ' + linha[1],
          'WhatsApp: ' + linha[2],
          'Cidade/UF: ' + linha[3],
          'Para quem: ' + linha[4],
          'Etapa: ' + linha[5],
          'Mensagem: ' + (linha[6] || '-'),
          '',
          'Abra a planilha para ver todos os contatos.'
        ].join('\n')
      });
    }
    return ok_();
  } finally {
    lock.releaseLock();
  }
}

// Cria a aba e o cabeçalho na primeira execução.
function aba_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUNAS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
  }
  return sheet;
}

// Corta textos longos e impede que um valor vire fórmula na planilha.
function limpa_(v) {
  v = String(v || '').trim().slice(0, 1000);
  if (/^[=+\-@]/.test(v)) v = "'" + v;
  return v;
}

function ok_() {
  return ContentService.createTextOutput('ok');
}

// Execute uma vez pelo editor para autorizar o acesso à planilha e ao e-mail.
function testar() {
  doPost({ parameter: {
    nome: 'Teste', whatsapp: '(31) 90000-0000', cidade_uf: 'Viçosa / MG',
    para_quem: 'para-mim', etapa: 'nao-sei', mensagem: 'Contato de teste',
    consentimento_lgpd: 'sim', pagina: 'teste'
  }});
}
