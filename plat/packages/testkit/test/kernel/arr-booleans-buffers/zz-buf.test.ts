// SCRATCH (M0-a-08 seat; deleted before landing): buffer agreement with crashes counted instead of failing.
import { appendFileSync } from 'node:fs';
import fc from 'fast-check';
import { it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { bufferCaseArb, judgeBuffer, newHarness } from './support.js';
const log = (...a: unknown[]): void => appendFileSync(process.env.OUT as string, a.map(String).join(' ') + '\n');
it('buffer tally', async () => {
  await loadOracles();
  const h = newHarness();
  const crashes: string[] = [];
  for (const c of fc.sample(bufferCaseArb, { numRuns: Number(process.env.N), seed: Number(process.env.SEED) })) {
    try { judgeBuffer(h, c); } catch (e) { crashes.push((e as Error).message.slice(0, 120)); }
  }
  log(JSON.stringify(h.report.line('buffer')), 'sources', JSON.stringify(h.sources), 'crashes', crashes.length, JSON.stringify(crashes), 'failures', JSON.stringify(h.failures).slice(0, 3000), 'invalid', JSON.stringify(h.invalid).slice(0, 2000));
}, 3_600_000);
