// The vitest configuration (C-0053: vitest 5 reads its projects from here).
// One project per package plus `tools` (the scaffold's and the lint's own tests). Every project resolves the
// `plat-source` export condition first, so a package imported by name runs from its src/ with no build (C-0013), and
// loads the fast-check setup (PLAT_FUZZ_RUNS, C-0057). The run's global setup chooses and prints the run seed when
// PLAT_FUZZ_SEED is unset (Q96; tools/vitest/fuzz-seed.mjs).
import { defineConfig, type TestProjectInlineConfiguration } from 'vitest/config';
import { defaultClientConditions, defaultServerConditions } from 'vite';

const setupFiles = ['./tools/vitest/fast-check.setup.mjs'];

/** Setup-file paths written relative to this file, as the absolute paths vitest loads. */
const fromConfig = (files: string[]): string[] => files.map((f) => new URL(f, import.meta.url).pathname);

function pkg(name: string, root: string): TestProjectInlineConfiguration {
  return {
    extends: true,
    test: { name, root, include: ['test/**/*.test.ts'], setupFiles: fromConfig(setupFiles) },
  };
}

export default defineConfig({
  resolve: { conditions: ['plat-source', ...defaultClientConditions] },
  ssr: { resolve: { conditions: ['plat-source', ...defaultServerConditions], externalConditions: ['plat-source'] } },
  test: {
    environment: 'node',
    passWithNoTests: false,
    globalSetup: fromConfig(['./tools/vitest/fuzz-seed.global.mjs']),
    projects: [
      pkg('kernel', './packages/kernel'),
      {
        // The PR tier's tiny-tables run (C-0286 (5)): the insert step1-2, step3-5 and tx folders once more with every
        // arena table starting at capacity 1, so every allocation replaces its table and a writer that keeps a stale
        // table (C-0177 (10)'s class) goes red here. tiny.ts arms the mode from PLAT_TINY_TABLES=1; the sentinel after
        // it fails the whole project when the variable is set but the mode is not armed.
        extends: true,
        test: {
          name: 'kernel-tiny',
          root: './packages/kernel',
          include: ['test/insert/step1-2/**/*.test.ts', 'test/insert/step3-5/**/*.test.ts', 'test/tx/**/*.test.ts'],
          env: { PLAT_TINY_TABLES: '1' },
          setupFiles: fromConfig([...setupFiles, './packages/kernel/test/arena/tiny.ts', './tools/vitest/tiny-sentinel.mjs']),
        },
      },
      pkg('model', './packages/model'),
      pkg('tables', './packages/tables'),
      pkg('site', './packages/site'),
      pkg('layout', './packages/layout'),
      pkg('testkit', './packages/testkit'),
      pkg('bench', './bench'),
      {
        extends: true,
        test: { name: 'tools', root: './tools', include: ['**/*.test.mjs', '**/*.test.ts'], exclude: ['lint/fixtures/**'] },
      },
    ],
  },
});
