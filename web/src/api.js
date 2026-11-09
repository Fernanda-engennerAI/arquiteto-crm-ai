// Interface conversa com /api por proxy no Vercel (Render).
// Somente o token de sessao Supabase e enviado; nunca a chave Anthropic.
import { getAccessToken } from './auth.js';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  let res;
  try {
    const token = path === '/api/chat' ? await getAccessToken() : null;
    res = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    const error = new Error(err?.message || 'Nao foi possivel falar com o servidor.');
    error.code = 'SERVIDOR_INDISPONIVEL';
    throw error;
  }

  let data = null;
  try { data = await res.json(); } catch { /* Resposta nao JSON */ }
  if (!res.ok) {
    const err = new Error(data?.message || `Erro HTTP ${res.status}.`);
    err.code = data?.code || 'ERRO_HTTP';
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

const labHeaders = (token) => ({ 'x-lab-token': token });

export const api = {
  health: () => request('/api/health'),
  chat: (messages) => request('/api/chat', { method: 'POST', body: { messages } }),
  lab: {
    attacks: (token) => request('/api/lab/attacks', { headers: labHeaders(token) }),
    results: (token) => request('/api/lab/results', { headers: labHeaders(token) }),
    run: (token, attackId, promptVersion) =>
      request('/api/lab/run', { method: 'POST', headers: labHeaders(token), body: { attackId, promptVersion } }),
  },
};
