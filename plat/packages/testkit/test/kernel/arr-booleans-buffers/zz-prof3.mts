// SCRATCH (M0-a-08 seat debugging; deleted before landing): dumps throwing buffer cases.
import { writeFileSync } from 'node:fs';
import fc from 'fast-check';
import { buffer } from '@plat/kernel';
import { bufferCaseArb } from './support.js';
const cases = fc.sample(bufferCaseArb, { numRuns: Number(process.env.N ?? 300), seed: Number(process.env.SEED ?? 5) });
const out: unknown[] = [];
for (const c of cases) {
  try { buffer(c.chains, c.w, c.joins, c.ends); } catch (e) { out.push({ case: c, msg: (e as Error).message }); }
}
writeFileSync(process.env.OUT as string, JSON.stringify(out));
console.log('throws', out.length);
