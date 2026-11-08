import express from 'express';
import { config, validateConfig } from './config.js';
import { AppError } from './errors.js';
import { chatRouter } from './routes/chat.js';
import { labRouter } from './routes/lab.js';
import { getProvider } from './providers/index.js';

const problems = validateConfig();
if (problems.length) {
  console.error('Configuração inválida em server/.env:\n- ' + problems.join('\n- '));
  process.exit(1);
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));

// Estado público: não revela versão de prompt nem se o laboratório existe
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', modeloConectado: Boolean(getProvider()) });
});

app.use('/api/chat', chatRouter);

// Com LAB_MODE=false, as rotas de teste simplesmente não existem (404)
if (config.labMode) {
  app.use('/api/lab', labRouter);
}

app.use('/api', (_req, _res, next) => next(new AppError(404, 'ROTA_NAO_ENCONTRADA', 'Rota não encontrada.')));

// Tratador único de erros: nunca devolve stack trace ao navegador
app.use((err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ code: err.code, message: err.message });
  }
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ code: 'JSON_INVALIDO', message: 'Corpo da requisição não é um JSON válido.' });
  }
  console.error(err);
  res.status(500).json({ code: 'ERRO_INTERNO', message: 'Erro interno no servidor.' });
});

app.listen(config.port, () => {
  console.log(`API em http://localhost:${config.port}`);
  console.log(`Prompt dos usuários finais: ${config.promptVersion}`);
  console.log(`Ambiente de testes: ${config.labMode ? 'ATIVO' : 'desativado'}`);
  console.log(`Provedor de IA: ${getProvider() ? 'configurado' : 'não configurado'}`);
});
