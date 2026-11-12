// Assembles spec-2b-v2.json from spec-source.txt (sections: @@SESSION, then @@LINE / @@EVIDENCE / @@REQUIRED triples).
import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync(new URL('./spec-source.txt', import.meta.url), 'utf8');
const parts = src.split(/^@@(SESSION|LINE|EVIDENCE|REQUIRED)\s*$/m).slice(1);
let session = null; const lines = []; let cur = null;
for (let i = 0; i < parts.length; i += 2) {
  const tag = parts[i]; const body = parts[i + 1].trim().replace(/\s*\n\s*/g, ' ');
  if (tag === 'SESSION') session = body;
  else if (tag === 'LINE') { cur = { line: body }; lines.push(cur); }
  else if (tag === 'EVIDENCE') cur.evidence = body;
  else cur.required_change = body;
}
for (const [i, l] of lines.entries()) {
  if (!l.line.startsWith(`LINE ${i + 1} `)) throw new Error(`line ${i + 1} misnumbered`);
  if (!l.evidence || !l.required_change) throw new Error(`line ${i + 1} incomplete`);
}
const entry = { id: 'M0-a-09', from: 21, round: 'S21', session, lines };
writeFileSync(new URL('../spec-2b-v2.json', import.meta.url), JSON.stringify([entry], null, 1) + '\n');
console.log('lines', lines.length, 'session chars', session.length, 'total chars', JSON.stringify(entry).length);
