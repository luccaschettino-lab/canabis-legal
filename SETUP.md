# Como colocar o formulário para funcionar

O formulário envia os contatos para uma planilha do Google e manda um e-mail de aviso a cada contato novo. Leva uns 10 minutos e não tem custo.

## 1. Criar a planilha e o script

1. Crie uma planilha nova no Google Sheets (de preferência na conta que vai atender os contatos).
2. No menu, vá em **Extensões → Apps Script**.
3. Apague o conteúdo do arquivo `Código.gs` e cole o conteúdo de `integracoes/apps-script.gs`.
4. Na linha `var EMAIL_AVISO = ...`, troque pelo e-mail que vai receber os avisos.
5. Salve.

## 2. Autorizar

1. No editor do Apps Script, escolha a função `testar` no seletor e clique em **Executar**.
2. O Google vai pedir permissão para acessar a planilha e enviar e-mail. Autorize.
3. Confira: deve aparecer uma aba "Contatos" com uma linha de teste, e o e-mail de aviso deve chegar. Pode apagar a linha de teste depois.

## 3. Publicar como App da Web

1. Clique em **Implantar → Nova implantação**.
2. Tipo: **App da Web**.
3. Executar como: **Eu**. Quem pode acessar: **Qualquer pessoa**.
4. Clique em **Implantar** e copie a URL que termina em `/exec`.

## 4. Ligar no site

Abra `assets/main.js` e preencha:

```js
FORM_ENDPOINT: 'https://script.google.com/macros/s/SEU-ID/exec',
WHATSAPP: '5531999999999',   // DDI + DDD + número, só dígitos
```

Pronto. Envie um contato de teste pelo site e confira a planilha.

## Observações

- Se mudar o script depois, faça **Implantar → Gerenciar implantações → Editar → Nova versão**, senão a URL continua rodando a versão antiga.
- A coluna **Status** começa como "Novo". Use-a para marcar "Em atendimento", "Convertido" ou "Sem retorno" e acompanhar o funil.
- A planilha contém dados pessoais. Compartilhe apenas com quem atende e apague contatos antigos conforme o prazo da Política de Privacidade.
