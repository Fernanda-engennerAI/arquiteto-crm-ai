// Única porta de saída do front-end. Só conversa com o próprio back-end (/api).
// Nenhuma chave de API existe deste lado.

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  let res;
  try {
    res = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    const err = new Error('Não foi possível falar com o back-end. Verifique se a API está rodando.');
    err.code = 'SERVIDOR_INDISPONIVEL';
    throw err;
  }

  let data = null;
  try { data = await res.json(); } catch { /* resposta sem JSON */ }

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
