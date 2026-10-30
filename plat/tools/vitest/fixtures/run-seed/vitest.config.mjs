// A nested vitest run for fuzz-seed.test.mjs (Q96): two fixture files under the real fast-check setup and the real run
// seed global setup, in two forked workers, each writing what fast-check drew to PLAT_SEED_FIXTURE_OUT.
import { defineConfig } from 'vitest/config';

const here = (f) => new URL(f, import.meta.url).pathname;

export default defineConfig({
  test: {
    root: here('.'),
    include: ['*.fixture.mjs'],
    pool: 'forks',
    maxWorkers: 2,
    setupFiles: [here('../../fast-check.setup.mjs')],
    globalSetup: [here('../../fuzz-seed.global.mjs')],
  },
});
