// Fixture of fuzz-seed.test.mjs (Q96): what fast-check draws in this file, written to PLAT_SEED_FIXTURE_OUT/b.json.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { it, vi } from 'vitest';

it('draws', async () => {
  const actual = await vi.importActual('fast-check');
  const asserted = [];
  fc.assert(
    fc.property(fc.integer(), (n) => {
      asserted.push(n);
    }),
    { numRuns: 5 },
  );
  const out = {
    asserted,
    sampled: fc.sample(fc.nat(), 4),
    own: fc.sample(fc.nat(), { numRuns: 3, seed: 7 }),
    globalSeed: fc.readConfigureGlobal().seed ?? null,
    library: fc.sample === actual.default.sample && fc.assert === actual.default.assert,
  };
  writeFileSync(join(process.env.PLAT_SEED_FIXTURE_OUT, 'b.json'), JSON.stringify(out));
});
