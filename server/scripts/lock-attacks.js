// Trava os 8 ataques: grava a impressão digital (SHA-256) de cada texto.
// Depois disso, o servidor só executa um ataque se o texto continuar idêntico.
import fs from 'node:fs/promises';
import { config } from '../src/config.js';
import { readAttacksFile, readLock } from '../src/attacks.js';
import { sha256, PENDENTE } from '../src/hash.js';

const attacks = await readAttacksFile();

const pending = attacks.filter((a) => typeof a.texto !== 'string' || !a.texto || a.texto.includes(PENDENTE));
if (pending.length) {
  console.error(`Ainda sem texto original: ${pending.map((a) => a.id).join(', ')}. Nada foi travado.`);
  process.exit(1);
}

const hashes = Object.fromEntries(attacks.map((a) => [a.id, sha256(a.texto)]));
const existing = await readLock();

if (existing) {
  const changed = Object.keys(hashes).filter((id) => existing.hashes?.[id] !== hashes[id]);
  if (changed.length === 0) {
    console.log('Trava já existe e confere com os textos atuais. Nada a fazer.');
    process.exit(0);
  }
  console.error(`A trava já existe e estes ataques mudaram: ${changed.join(', ')}.`);
  console.error('Se a mudança não foi intencional, restaure o texto original.');
  console.error('Se foi intencional, apague redteam/attacks.lock.json manualmente e rode o comando de novo.');
  process.exit(1);
}

await fs.writeFile(
  config.paths.attacksLock,
  JSON.stringify({ travado_em: new Date().toISOString(), algoritmo: 'sha256', hashes }, null, 2) + '\n',
  'utf8'
);
console.log(`Trava criada para ${attacks.length} ataques em redteam/attacks.lock.json.`);
