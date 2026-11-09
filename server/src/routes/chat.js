import { Router } from 'express';
import { requireDemoAuth } from '../auth.js';
import { config } from '../config.js';
import { AppError } from '../errors.js';
import { loadPrompt } from '../prompts.js';
import { getProvider } from '../providers/index.js';
import { validateMessages } from '../validate.js';

export const chatRouter = Router();

// Rota dos usuários finais. A versão do prompt vem só do servidor (PROMPT_VERSION);
// qualquer campo de versão enviado pelo navegador é ignorado.
chatRouter.post('/', requireDemoAuth, async (req, res, next) => {
  try {
    const messages = validateMessages(req.body?.messages);
    const prompt = await loadPrompt(config.promptVersion);

    const provider = getProvider();
    if (!provider) {
      throw new AppError(503, 'MODELO_NAO_CONFIGURADO', 'Nenhum provedor de IA está configurado. A conexão com o modelo é a etapa 3.');
    }

    const result = await provider.generate({ system: prompt.text, messages });
    res.json({ reply: result.text });
  } catch (err) {
    next(err);
  }
});
