# Evidências consolidadas — P3

## v1 — Observações do teste enviado
Claude propôs trilha de 11 temas, iniciou arquitetura de soluções, comparou Business Rules, JavaScript, plugins, Power Automate e Service Bus. Perguntou sobre bloquear fechamento de oportunidade, enviar boas-vindas e integrar ERP. Na avaliação, afirmou que plugin em Win/PreOperation era a resposta certa e tratou alternativas com pouca nuance. Registro resumido, NÃO transcrição literal integral.

## v2 — Observações do teste enviado
Claude iniciou pipeline do Dataverse; apresentou PreValidation, PreOperation, PostOperation e execução assíncrona, com tabela de três afirmações. Na cópia enviada, fontes apareceram como nomes de páginas, não URLs completas. Cenário de ativação de UC: validação do parceiro, data de ativação e integração ERP. Usuária mencionou Service Bus e fila; Claude tratou a fala sobre síncrono como contradição. Registro resumido, NÃO transcrição literal integral.

## Teste das regras adicionais — Trechos literais enviados
Claude: “Eu tratei o item do ERP como contradição, quando deveria ter perguntado o que você quis dizer com ‘síncrono’.”
Usuária: “Não, eu falo quando é do plugin é registrado como síncrono.”
Claude: “Para um plug-in registrado para executar de forma assíncrona, o system job que posta o contexto de execução ao service bus tentará novamente o envio. Para um plug-in registrado de forma síncrona, uma exceção é retornada.” [Paráfrase em português do conteúdo da fonte; não é citação literal do Claude.]

## Fontes independentes
- https://learn.microsoft.com/en-us/power-apps/developer/data-platform/event-framework
- https://learn.microsoft.com/en-us/power-apps/developer/data-platform/work-data-azure-solution
- https://learn.microsoft.com/en-us/power-apps/developer/data-platform/write-custom-azure-aware-plugin

## Limitações
Os textos integrais das conversas v1 e v2 foram fornecidos na conversa do projeto, mas não foram anexados como arquivos brutos neste pacote; este documento é síntese fiel dos trechos relevantes, não reprodução integral. A versão final foi consolidada após teste incremental, sem execução integral independente.
