# Arquiteto CRM AI

Assistente especialista em Arquitetura de Soluções CRM (Dynamics 365, Power Platform e Azure), com interface web própria e um ambiente isolado de testes de segurança (red teaming).

Projeto de portfólio em Engenharia de Prompt: as instruções permanentes do assistente (v1 e v2) ficam separadas do front-end e são testadas contra oito ataques planejados.

## Status

| Etapa | Situação |
|---|---|
| 1. Arquitetura e interface | Concluída |
| 2. Projeto React + back-end, sem chave de API | Concluída |
| 3. Conexão com o modelo de IA | Pendente |
| 4. Rodada de red teaming validada | Pendente |

Enquanto a etapa 3 não for concluída, o chat responde com o código `MODELO_NAO_CONFIGURADO`. Nenhuma resposta de IA é simulada.

## Arquitetura

```
Navegador (React + Vite)  ──/api──▶  Back-end (Node + Express)  ──▶  Provedor de IA (etapa 3)
  só envia mensagens                  · lê prompts/v1.md ou v2.md
  nunca vê prompt nem chave           · lê a chave de variável de ambiente
                                      · decide a versão do prompt
```

## Estrutura

```
arquiteto-crm-ai/
├── prompts/
│   ├── v1.md                  Instrução permanente v1 (texto original, sem edição)
│   └── v2.md                  Instrução permanente v2
├── redteam/
│   ├── attacks.json           Os 8 ataques originais
│   ├── attacks.lock.json      Impressão digital (SHA-256) de cada ataque, gerada por npm run redteam:lock
│   └── results/               Registros das execuções (fora do Git)
├── server/
│   ├── .env.example           Variáveis do back-end, sem valores reais
│   ├── scripts/lock-attacks.js
│   └── src/
│       ├── index.js           Servidor, rotas e tratamento de erros
│       ├── config.js          Leitura e validação do .env
│       ├── prompts.js         Carrega v1/v2 exatamente como estão no arquivo
│       ├── attacks.js         Carrega ataques e confere a trava
│       ├── results.js         Grava e lê os registros de execução
│       ├── validate.js        Validação das mensagens recebidas
│       ├── providers/index.js Camada do provedor de IA (vazia até a etapa 3)
│       └── routes/
│           ├── chat.js        POST /api/chat (usuários finais)
│           └── lab.js         /api/lab/* (só com LAB_MODE=true e token)
└── web/
    ├── .env.example           VITE_LAB_UI: mostra ou não o painel de testes
    ├── vite.config.js         Proxy /api → back-end local
    └── src/
        ├── App.jsx            Estado do chat e do laboratório
        ├── api.js             Única porta de saída para o back-end
        ├── content.js         Sugestões e exemplo estático
        └── components/        Header, Thread, Composer, Markdown, LabPanel
```

## Decisões de segurança

- **Chave de API só no servidor.** O navegador conversa apenas com `/api`. O arquivo `server/.env` está no `.gitignore`.
- **Versão do prompt definida pelo servidor.** Em `/api/chat`, a versão vem de `PROMPT_VERSION`. O navegador não consegue escolher.
- **Laboratório desligado por padrão.** Com `LAB_MODE=false`, as rotas `/api/lab/*` não existem (404). Com `LAB_MODE=true`, exigem o cabeçalho `x-lab-token`, comparado em tempo constante.
- **Painel fora do build de produção.** Sem `VITE_LAB_UI=true`, o código do painel não entra no pacote enviado ao navegador.
- **Ataques imutáveis.** O navegador envia só o ID do ataque. O texto sai de `redteam/attacks.json` e só é executado se a impressão digital bater com `attacks.lock.json`.
- **Sessão isolada.** Cada execução de red teaming envia ao modelo apenas o prompt e o texto do ataque, sem histórico.
- **Rastreabilidade.** Cada execução registra ID do ataque, versão do prompt, SHA-256 do prompt e do ataque, horário, modelo, status e resposta.
- **Markdown seguro.** As respostas são renderizadas com `react-markdown`, que não interpreta HTML bruto.

## Como executar localmente

Requisito: Node.js 20 ou superior.

```bash
npm install
cp server/.env.example server/.env    # Windows PowerShell: Copy-Item server/.env.example server/.env
npm run dev
```

Front-end em http://localhost:5173 e API em http://localhost:3001.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe API e front-end juntos |
| `npm run dev:api` | Sobe só a API |
| `npm run dev:web` | Sobe só o front-end |
| `npm run build` | Gera o build de produção do front-end |
| `npm run redteam:lock` | Trava os textos dos 8 ataques |

## Custos

Front-end, back-end e hospedagem podem rodar em planos gratuitos. A chamada ao modelo de IA é a única parte que pode gerar custo, conforme o provedor escolhido na etapa 3.
