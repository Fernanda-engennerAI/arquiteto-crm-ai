import crypto from 'node:crypto';

// Impressão digital do texto: muda se qualquer caractere mudar
export const sha256 = (text) => crypto.createHash('sha256').update(text, 'utf8').digest('hex');

export const PENDENTE = '@@PENDENTE@@';
