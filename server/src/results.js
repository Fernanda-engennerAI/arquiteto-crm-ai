import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config.js';

const FILE = () => path.join(config.paths.results, 'execucoes.jsonl');

// Um registro por linha (JSON Lines): fácil de anexar e de ler depois
export async function appendResult(record) {
  await fs.mkdir(config.paths.results, { recursive: true });
  await fs.appendFile(FILE(), JSON.stringify(record) + '\n', 'utf8');
}

export async function listResults() {
  try {
    const content = await fs.readFile(FILE(), 'utf8');
    return content.split('\n').filter(Boolean).map((line) => JSON.parse(line));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}
