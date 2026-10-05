// SCRATCH (M0-a-08 seat debugging; deleted before landing): samples cases per op with a fixed seed, logs each case
// before running it and every slow or failing one after.
import { appendFileSync, writeFileSync } from 'node:fs';
import fc from 'fast-check';
import { it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { booleanCaseArb, bufferCaseArb, insetCaseArb, judgeBoolean, judgeBuffer, judgeInset, judgeOffset, newHarness, offsetCaseArb } from './support.js';

const OUT = process.env.DBG_OUT as string;
const log = (...a: unknown[]): void => appendFileSync(OUT, a.map(String).join(' ') + '\n');

it('debug5', async () => {
  await loadOracles();
  const op = process.env.DBG_OP ?? 'difference';
  const n = Number(process.env.N ?? 200);
  const seed = Number(process.env.SEED ?? 1);
  const skip = Number(process.env.SKIP ?? 0);
  const h = newHarness();
  const arb: fc.Arbitrary<unknown> =
    op === 'buffer' ? bufferCaseArb : op === 'offsetFace' ? offsetCaseArb : op === 'insetRing' ? insetCaseArb : booleanCaseArb(op as 'union');
  const cases = fc.sample(arb, { numRuns: n, seed });
  for (let i = skip; i < cases.length; i += 1) {
    const c = cases[i] as never;
    writeFileSync(OUT + '.cur', JSON.stringify({ i, c }));
    const before = h.failures.length + h.invalid.length;
    const t0 = Date.now();
    try {
      if (op === 'buffer') judgeBuffer(h, c);
      else if (op === 'offsetFace') judgeOffset(h, c);
      else if (op === 'insetRing') judgeInset(h, c);
      else judgeBoolean(h, c);
    } catch (e) {
      log('THROW', i, (e as Error).message.slice(0, 200), JSON.stringify(c).slice(0, 4000));
    }
    const ms = Date.now() - t0;
    if (ms > 2000) log('SLOW', i, ms, JSON.stringify(c).slice(0, 4000));
    if (h.failures.length + h.invalid.length > before) log('FAIL', i, [...h.failures, ...h.invalid].slice(-1)[0].slice(0, 6000));
  }
  log('DONE', op, n, seed, JSON.stringify(h.report.line(op)));
}, 3_600_000);
