import { AppError } from './errors.js';

const MAX_MESSAGES = 40;
const MAX_CHARS = 8000;

// Aceita só o formato esperado e descarta qualquer campo extra
export function validateMessages(input) {
  if (!Array.isArray(input) || input.length === 0) {
    throw new AppError(400, 'MENSAGENS_INVALIDAS', 'Envie ao menos uma mensagem.');
  }
  if (input.length > MAX_MESSAGES) {
    throw new AppError(400, 'HISTORICO_LONGO', `A conversa passou de ${MAX_MESSAGES} mensagens. Inicie uma nova conversa.`);
  }
  const messages = input.map((m) => {
    const role = m?.role;
    const content = m?.content;
    if (role !== 'user' && role !== 'assistant') {
      throw new AppError(400, 'MENSAGENS_INVALIDAS', 'Cada mensagem precisa ter role "user" ou "assistant".');
    }
    if (typeof content !== 'string' || !content.trim()) {
      throw new AppError(400, 'MENSAGENS_INVALIDAS', 'Mensagem vazia.');
    }
    if (content.length > MAX_CHARS) {
      throw new AppError(400, 'MENSAGEM_LONGA', `Cada mensagem pode ter até ${MAX_CHARS} caracteres.`);
    }
    return { role, content };
  });
  if (messages.at(-1).role !== 'user') {
    throw new AppError(400, 'MENSAGENS_INVALIDAS', 'A última mensagem precisa ser do usuário.');
  }
  return messages;
}
