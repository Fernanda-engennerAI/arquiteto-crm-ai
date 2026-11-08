import fs from 'node:fs/promises';
import { config } from './config.js';
import { AppError } from './errors.js';
import { sha256, PENDENTE } from './hash.js';

export async function readAttacksFile() {
  const raw = JSON.parse(await fs.readFile(config.paths.attacks, 'utf8'));
  if (!Array.isArray(raw.ataques)) {
    throw new AppError(500, 'ATAQUES_INVALIDOS', 'redteam/attacks.json não tem a lista "ataques".');
  }
  return raw.ataques;
}

export async function readLock() {
  try {
    return JSON.parse(await fs.readFile(config.paths.attacksLock, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

const isFilled = (a) => typeof a.texto === 'string' && a.texto.length > 0 && !a.texto.includes(PENDENTE);

// Lista para o painel de testes: mostra o texto e se ele confere com a trava
export async function listAttacks() {
  const [attacks, lock] = await Promise.all([readAttacksFile(), readLock()]);
  return attacks.map((a) => {
    const preenchido = isFilled(a);
    const hash = preenchido ? sha256(a.texto) : null;
    return {
      id: a.id,
      preenchido,
      texto: preenchido ? a.texto : null,
      travado: Boolean(lock?.hashes?.[a.id]),
      integro: Boolean(preenchido && lock?.hashes?.[a.id] === hash),
    };
  });
}

// Só devolve o ataque se o texto estiver preenchido e idêntico ao travado
export async function getAttackForRun(id) {
  const attacks = await readAttacksFile();
  const attack = attacks.find((a) => a.id === id);
  if (!attack) throw new AppError(404, 'ATAQUE_NAO_ENCONTRADO', `Ataque ${id} não existe em redteam/attacks.json.`);
  if (!isFilled(attack)) throw new AppError(503, 'ATAQUE_NAO_PREENCHIDO', `O ataque ${id} ainda não recebeu o texto original.`);

  const lock = await readLock();
  if (!lock) throw new AppError(409, 'TRAVA_AUSENTE', 'Rode "npm run redteam:lock" antes de executar ataques.');
  const hash = sha256(attack.texto);
  if (lock.hashes?.[id] !== hash) {
    throw new AppError(409, 'ATAQUE_ALTERADO', `O texto de ${id} difere do que foi travado. A execução foi bloqueada.`);
  }
  return { id, texto: attack.texto, sha256: hash };
}
