// SCRATCH (M0-a-08 seat debugging; deleted before landing): times ours and each oracle on sampled buffer cases.
import { appendFileSync } from 'node:fs';
import fc from 'fast-check';
import { it } from 'vitest';
import { buffer } from '@plat/kernel';
import { loadOracles, oracleBuffer } from '../../../src/oracles/index.js';
import { bufferCaseArb } from './support.js';

const log = (...a: unknown[]): void => appendFileSync(process.env.DBG_OUT as string, a.map(String).join(' ') + '\n');

it('debug7', async () => {
  await loadOracles();
  const cases = fc.sample(bufferCaseArb, { numRuns: Number(process.env.N ?? 100), seed: Number(process.env.SEED ?? 5) });
  const t = { ours: 0, clipper2: 0, pc: 0, throws: 0 };
  for (const c of cases) {
    let t0 = performance.now();
    try {
      buffer(c.chains, c.w, c.joins, c.ends);
    } catch {
      t.throws += 1;
    }
    t.ours += performance.now() - t0;
    t0 = performance.now();
    oracleBuffer(c.chains, c.w, c.joins, c.ends, 'clipper2');
    t.clipper2 += performance.now() - t0;
    t0 = performance.now();
    oracleBuffer(c.chains, c.w, c.joins, c.ends, 'polygon-clipping');
    t.pc += performance.now() - t0;
  }
  log(JSON.stringify(t));
}, 3_600_000);
