// Conteúdo estático da interface. Nada aqui é resposta de IA.

export const SUGGESTIONS = [
  'Como integrar o Dynamics 365 com o ERP para sincronizar clientes, pedidos e faturas?',
  'Quando usar Power Automate, plugin ou Azure Function para uma regra de negócio?',
  'Modelo de segurança com business units, perfis e equipes para uma operação multiempresa',
];

export const EXAMPLE_MD = [
  '### Exemplo de formatação',
  'Este bloco é **conteúdo estático** da interface. Ele existe para validar a renderização de Markdown, tabelas e código. Não foi gerado por nenhum modelo.',
  '',
  'Cenário ilustrativo: integração entre **Dynamics 365** e um **ERP**, com o Azure Service Bus desacoplando os dois sistemas.',
  '',
  '| Entidade | Sistema mestre | Direção | Mecanismo |',
  '|---|---|---|---|',
  '| Conta (`account`) | ERP | ERP → Dynamics 365 | Mensagem no Service Bus consumida por Azure Function |',
  '| Pedido (`salesorder`) | Dynamics 365 | Dynamics 365 → ERP | Plugin assíncrono publica no Service Bus |',
  '| Fatura (`invoice`) | ERP | ERP → Dynamics 365 | Azure Function agendada consulta a API do ERP |',
  '',
  '```json',
  '{',
  '  "evento": "pedido.aprovado",',
  '  "origem": "dynamics365",',
  '  "salesorderid": "8f2c1a7e-0000-0000-0000-000000000000",',
  '  "conta_erp": "C-10482",',
  '  "valor_total": 18450.00,',
  '  "correlation_id": "a41d9b2c"',
  '}',
  '```',
].join('\n');
