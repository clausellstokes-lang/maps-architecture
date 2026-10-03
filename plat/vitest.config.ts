// The vitest configuration (M0.md §4's "vitest.workspace.ts"; vitest 5 reads projects from here — C-0053).
// One project per package plus `tools` (the scaffold's and the lint's own tests). Every project resolves the
// `plat-source` export condition first, so a package imported by name runs from its src/ with no build (C-0013), and
// loads the fast-check setup (PLAT_FUZZ_RUNS, C-0057).
import { defineConfig, type TestProjectInlineConfiguration } from 'vitest/config';
import { defaultClientConditions, defaultServerConditions } from 'vite';

const setupFiles = ['./tools/vitest/fast-check.setup.mjs'];

function pkg(name: string, root: string): TestProjectInlineConfiguration {
  return {
    extends: true,
    test: { name, root, include: ['test/**/*.test.ts'], setupFiles: setupFiles.map((f) => new URL(f, import.meta.url).pathname) },
  };
}

export default defineConfig({
  resolve: { conditions: ['plat-source', ...defaultClientConditions] },
  ssr: { resolve: { conditions: ['plat-source', ...defaultServerConditions], externalConditions: ['plat-source'] } },
  test: {
    environment: 'node',
    passWithNoTests: false,
    projects: [
      pkg('kernel', './packages/kernel'),
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
