import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Raiz do repositório (duas pastas acima de server/src)
export const ROOT = path.resolve(__dirname, '..', '..');

// Lê server/.env independentemente da pasta de onde o comando foi executado
dotenv.config({ path: path.join(ROOT, 'server', '.env') });

export const PROMPT_VERSIONS = ['v1', 'v2'];

const isTrue = (v) => String(v ?? '').trim().toLowerCase() === 'true';

export const config = {
  port: Number(process.env.PORT) || 3001,
  promptVersion: (process.env.PROMPT_VERSION || '').trim(),
  labMode: isTrue(process.env.LAB_MODE),
  labToken: (process.env.LAB_TOKEN || '').trim(),
  paths: {
    prompts: path.join(ROOT, 'prompts'),
    attacks: path.join(ROOT, 'redteam', 'attacks.json'),
    attacksLock: path.join(ROOT, 'redteam', 'attacks.lock.json'),
    results: path.join(ROOT, 'redteam', 'results'),
  },
};

// Falha cedo: configuração inválida impede o servidor de subir
export function validateConfig() {
  const problems = [];
  if (!PROMPT_VERSIONS.includes(config.promptVersion)) {
    problems.push(`PROMPT_VERSION deve ser ${PROMPT_VERSIONS.join(' ou ')} (valor atual: "${config.promptVersion}").`);
  }
  if (config.labMode && config.labToken.length < 16) {
    problems.push('LAB_MODE=true exige LAB_TOKEN com pelo menos 16 caracteres.');
  }
  return problems;
}
