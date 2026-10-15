# Site de orientação – acesso legal à cannabis medicinal

Site estático (HTML + CSS + JS puro, sem build) que explica as etapas do acesso legal regulado pela ANVISA e capta contatos para atendimento por WhatsApp.

## Estrutura

| Arquivo | Página |
| --- | --- |
| `index.html` | Início: hero, botões por etapa, 4 passos, como trabalhamos |
| `como-funciona.html` | Etapas detalhadas, quem pode, documentos |
| `guia-importacao.html` | Guia longo com sumário, para busca orgânica |
| `duvidas.html` | Perguntas frequentes |
| `contato.html` | Formulário de pré-triagem |
| `privacidade.html` | Política de Privacidade (modelo, revisar com advogado) |
| `assets/styles.css` | Estilos compartilhados |
| `assets/main.js` | Menu, WhatsApp, formulário e **configurações** |
| `integracoes/apps-script.gs` | Script que grava os contatos numa planilha do Google |
| `SETUP.md` | Passo a passo para ligar o formulário |

## Pendências antes de publicar

- [ ] Conversa com a empresa representada: ela autoriza um site próprio?
- [ ] Definir nome/marca e domínio.
- [ ] Preencher os campos entre colchetes (busque por `[` nos arquivos): marca, razão social, CNPJ, representante, horários, prazos.
- [ ] Ligar o formulário (ver `SETUP.md`) e preencher o WhatsApp em `assets/main.js`.
- [ ] Revisar a Política de Privacidade com advogado.
- [ ] Validar todo o texto com o jurídico da empresa: a ANVISA proíbe publicidade de produtos importados via RDC 660/2022.
- [ ] Trocar o espaço reservado da foto na home por uma foto real (pessoa em luz natural; nunca planta ou frasco).

## Rodar localmente

Abra o `index.html` no navegador. Não há dependências.

## Publicar

Netlify ou Vercel, apontando para este repositório (pasta raiz, sem comando de build).
