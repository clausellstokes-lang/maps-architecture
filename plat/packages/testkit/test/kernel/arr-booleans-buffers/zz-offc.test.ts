// SCRATCH (M0-a-08 seat; deleted before landing)
import { appendFileSync, readFileSync } from 'node:fs';
import { it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import { judgeOffset, newHarness } from './support.js';
const log = (...a: unknown[]): void => appendFileSync(process.env.OUT as string, a.map(String).join(' ') + '\n');
it('offset cases', async () => {
  await loadOracles();
  const h = newHarness();
  for (const line of readFileSync(process.env.CASES as string, 'utf8').trim().split('\n')) {
    const c = JSON.parse(line);
    judgeOffset(h, { rings: c.rings, dists: c.d, source: 'replay' });
  }
  log(JSON.stringify(h.report.line('offsetFace')), JSON.stringify(h.failures), JSON.stringify(h.invalid));
});
