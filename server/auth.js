import { AppError } from './errors.js';

const url = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const anonKey = process.env.SUPABASE_ANON_KEY || '';
const allowedEmail = (process.env.DEMO_ALLOWED_EMAIL || '').trim().toLowerCase();
const usage = new Map();

export async function requireDemoAuth(req, _res, next) {
  try {
    if (!url || !anonKey || !allowedEmail) {
      throw new AppError(503, 'AUTH_NAO_CONFIGURADA', 'Autenticação não configurada.');
    }
    const match = /^Bearer (\S+)$/i.exec(req.headers.authorization || '');
    if (!match) throw new AppError(401, 'NAO_AUTENTICADO', 'Login obrigatório.');
    const response = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${match[1]}` },
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new AppError(401, 'TOKEN_INVALIDO', 'Sessão inválida ou expirada.');
    const user = await response.json();
    if (!user.id || !user.email || user.email.toLowerCase() !== allowedEmail || !user.email_confirmed_at) {
      throw new AppError(403, 'ACESSO_NEGADO', 'Usuário não autorizado.');
    }
    const now = Date.now();
    const record = usage.get(user.id) || { start: now, count: 0 };
    if (now - record.start >= 60_000) { record.start = now; record.count = 0; }
    if (record.count >= 10) throw new AppError(429, 'LIMITE_EXCEDIDO', 'Aguarde um minuto para enviar mais perguntas.');
    record.count++;
    usage.set(user.id, record);
    next();
  } catch (err) {
    if (err instanceof AppError) return next(err);
    next(new AppError(503, 'AUTH_INDISPONIVEL', 'Não foi possível validar o login.'));
  }
}
