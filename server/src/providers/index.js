// Camada de provedor de IA.
//
// Etapa 3: o provedor escolhido será implementado aqui, lendo a chave de uma
// variável de ambiente. Nenhum provedor está ativo nesta etapa, então
// getProvider() devolve null e as rotas respondem MODELO_NAO_CONFIGURADO.
//
// Contrato que o provedor vai cumprir:
//   async generate({ system, messages }) => { text, model }
//   system:   texto completo do prompt (v1 ou v2), sem alterações
//   messages: [{ role: 'user' | 'assistant', content: string }]


import { config } from '../config.js';

export function getProvider() {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  const model = process.env.ANTHROPIC_MODEL?.trim();

  if (!apiKey || !model) {
    return null;
  }

  return {
    async generate({ system, messages }) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          max_tokens: 2048,
          system,
          messages
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const message = error.error?.message || `Erro HTTP ${response.status}`;
        throw new Error(`Falha na API Claude: ${message}`);
      }

      const data = await response.json();

      return {
        text: data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n'),
        model: data.model
      };
    }
  };
}
