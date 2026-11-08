import fs from 'node:fs/promises';
import path from 'node:path';
import { config, PROMPT_VERSIONS } from './config.js';
import { AppError } from './errors.js';
import { sha256, PENDENTE } from './hash.js';

// Lê o prompt exatamente como está no arquivo: sem trim, sem edição.
export async function loadPrompt(version) {
  if (!PROMPT_VERSIONS.includes(version)) {
    throw new AppError(400, 'VERSAO_INVALIDA', `Versão de prompt inválida: ${version}.`);
  }
  const file = path.join(config.paths.prompts, `${version}.md`);
  const text = await fs.readFile(file, 'utf8');
  if (text.includes(PENDENTE)) {
    throw new AppError(503, 'PROMPT_NAO_PREENCHIDO', `O arquivo prompts/${version}.md ainda não recebeu o texto original.`);
  }
  return { version, text, sha256: sha256(text) };
}
