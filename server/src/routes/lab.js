import crypto from 'node:crypto';
import { Router } from 'express';
import { config } from '../config.js';
import { AppError } from '../errors.js';
import { loadPrompt } from '../prompts.js';
import { listAttacks, getAttackForRun } from '../attacks.js';
import { appendResult, listResults } from '../results.js';
import { getProvider } from '../providers/index.js';

export const labRouter = Router();

// Comparação em tempo constante: não revela quantos caracteres do token acertaram
function tokenMatches(received) {
  const a = crypto.createHash('sha256').update(String(received ?? '')).digest();
  const b = crypto.createHash('sha256').update(config.labToken).digest();
  return crypto.timingSafeEqual(a, b);
}

labRouter.use((req, _res, next) => {
  if (!tokenMatches(req.get('x-lab-token'))) {
    return next(new AppError(401, 'TOKEN_INVALIDO', 'Token do ambiente de testes ausente ou incorreto.'));
  }
  next();
});

labRouter.get('/attacks', async (_req, res, next) => {
  try { res.json({ ataques: await listAttacks() }); } catch (err) { next(err); }
});

labRouter.get('/results', async (_req, res, next) => {
  try { res.json({ execucoes: await listResults() }); } catch (err) { next(err); }
});

// Execução isolada: o navegador manda só o ID do ataque e a versão.
// O texto do ataque sai do arquivo travado, e nenhum histórico é enviado ao modelo.
labRouter.post('/run', async (req, res, next) => {
  try {
    const attackId = String(req.body?.attackId ?? '');
    const promptVersion = String(req.body?.promptVersion ?? '');

    const attack = await getAttackForRun(attackId);
    const prompt = await loadPrompt(promptVersion);

    const record = {
      execucao_id: crypto.randomUUID(),
      ataque_id: attack.id,
      versao_prompt: prompt.version,
      prompt_sha256: prompt.sha256,
      ataque_sha256: attack.sha256,
      executado_em: new Date().toISOString(),
      modelo: null,
      status: null,
      resposta: null,
      erro: null,
    };

    const provider = getProvider();
    if (!provider) {
      record.status = 'nao_executado';
      record.erro = 'MODELO_NAO_CONFIGURADO';
      await appendResult(record);
      return res.status(503).json({
        code: 'MODELO_NAO_CONFIGURADO',
        message: 'Nenhum provedor de IA está configurado. O pedido foi registrado como não executado.',
        execucao: record,
      });
    }

    try {
      const result = await provider.generate({
        system: prompt.text,
        messages: [{ role: 'user', content: attack.texto }],
      });
      record.status = 'executado';
      record.modelo = result.model ?? null;
      record.resposta = result.text;
    } catch (err) {
      record.status = 'falhou';
      record.erro = err.code || 'ERRO_PROVEDOR';
    }
    await appendResult(record);
    res.status(record.status === 'executado' ? 200 : 502).json({ execucao: record });
  } catch (err) {
    next(err);
  }
});
