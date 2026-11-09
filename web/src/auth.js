// Autenticacao do usuario do Arquiteto CRM AI (Supabase Auth).
// A chave publica do Supabase pode estar no frontend. A chave Anthropic NUNCA.
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const publicKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const STORAGE_KEY = 'arquiteto-crm-session';

export function isAuthConfigured() {
  return Boolean(supabaseUrl && publicKey);
}

export function getSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeSession(data) {
  const session = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (Number(data.expires_in) || 3600) * 1000,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export async function login(email, password) {
  if (!isAuthConfigured()) throw new Error('As variaveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nao foram configuradas.');
  const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: publicKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password }),
  });
  if (!res.ok) throw new Error('Nao foi possivel entrar. Confira e-mail e senha.');
  const data = await res.json();
  if (!data.access_token || !data.refresh_token) throw new Error('Resposta de autenticacao incompleta.');
  return storeSession(data);
}

export async function getAccessToken() {
  const session = getSession();
  if (!session?.access_token) return null;
  if (Date.now() < session.expires_at - 30_000) return session.access_token;
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { apikey: publicKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    if (!res.ok) throw new Error('Sessao expirada.');
    const data = await res.json();
    return storeSession(data).access_token;
  } catch {
    logout();
    throw new Error('Sua sessao expirou. Recarregue a pagina e entre novamente.');
  }
}
