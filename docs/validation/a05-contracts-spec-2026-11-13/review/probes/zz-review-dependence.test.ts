// zz REVIEW PROBE (mirror only): runs the flat CITY fixture's S3-S5 with the dependence probe logging (ZZ_REVIEW_LOG).
import { it } from 'vitest';
import { flatFixture } from '../../../src/index.js';
import { grow } from './support.js';

const [a, b] = (process.env.ZZ_SEEDS ?? '1-2').split('-').map(Number);
it('zz review: gate-plan dependence on flat CITY seeds', { timeout: 3_600_000 }, () => {
  for (let seed = a; seed <= b; seed += 1) {
    process.env.ZZ_REVIEW_TAG = `flat-city:${String(seed)}`;
    try {
      grow(flatFixture(seed));
    } catch (e) {
      console.log(`seed ${String(seed)} threw ${String(e)}`);
    }
  }
});
