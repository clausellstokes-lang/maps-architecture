// zz REVIEW PROBE (mirror only): the site fixtures through the spike harness with the dependence probe logging.
import { it } from 'vitest';
import { deriveSpike } from '../../src/site/compose.js';
import { fixtureNamed } from '../../src/site/fixtures.js';
import type { SiteFixture } from '../../src/site/fixtures.js';

const [a, b] = (process.env.ZZ_SEEDS ?? '1-2').split('-').map(Number);
const fixtures = (process.env.ZZ_FIXTURES ?? 'relief-60,relief-3000').split(',');
const configs = (process.env.ZZ_CONFIGS ?? 'default').split(',') as ('default' | 'coarse')[];
const size = (process.env.ZZ_SIZE ?? 'test') as 'test' | 'city';
it('zz review: gate-plan dependence on the site fixtures', { timeout: 3_600_000 }, () => {
  for (const f of fixtures) for (const c of configs) for (let seed = a; seed <= b; seed += 1) {
    process.env.ZZ_REVIEW_TAG = `${f}/${c}/${size}:${String(seed)}`;
    const t0 = Date.now();
    const d = deriveSpike(fixtureNamed(f) as SiteFixture, seed, c, size);
    const s5 = d.capture.batches.filter((x) => x.stage === 'S5');
    console.log(`${process.env.ZZ_REVIEW_TAG} ${String(Date.now() - t0)} ms; S5 batches ${String(s5.length)} committed ${String(s5.filter((x) => x.committed).length)}`);
  }
});
