// The lint fixture of M0-d-03 (with M0-d-07's rules; §6.5 (2), (3); C-0039, C-0125 (2), C-0128 (1), C-0136): a transcendental
// of the engine's Math — Math.pow, Math.exp, Math.sin — or a `**` power in a model package fails the lint, while the
// same reads through dmath pass. The planted source is linted by plat/'s own ESLint configuration (eslint.config.js,
// as the tree lint and its model-coverage check read it) at a path inside the kernel's sources that no file occupies;
// it is given the `.mjs` extension, which the model rule set covers like `.ts` (C-0128 (1)), because typescript-eslint's
// project service parses only `.ts` files that exist on disk. Nothing is written to the tree (four seats share it).
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import { beforeAll, describe, expect, it } from 'vitest';

const PLAT = fileURLToPath(new URL('../../../../', import.meta.url));
const MODEL_PATH = `${PLAT}packages/kernel/src/dmath/zz-planted-transcendentals.mjs`;
const TEST_PATH = `${PLAT}packages/kernel/test/dmath/zz-planted-transcendentals.mjs`;

/** The planted model source: each line holds one read §6.5 (3) refuses in a model package. */
const PLANTED = [
  'export const a = Math.pow(2, 0.5); // planted: math-allowlist',
  'export const b = Math.exp(1); // planted: math-allowlist',
  'export const c = Math.sin(1); // planted: math-allowlist',
  'export const d = 2 ** 0.5; // planted: no-exponent-operator',
  '',
].join('\n');

/** The same reads through dmath: nothing to report. */
const THROUGH_DMATH = [
  "import { dmath } from './index.js';",
  'export const a = dmath.pow(2, 0.5);',
  'export const b = dmath.exp(1);',
  'export const c = dmath.sin(1);',
  '',
].join('\n');

let eslint: ESLint;
beforeAll(() => {
  eslint = new ESLint({ cwd: PLAT });
});

async function reports(code: string, filePath: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages.map((m) => `${m.line}:${m.ruleId ?? 'fatal'}`);
}

describe('the lint refuses the engine transcendentals in a model package (M0-d-03 with M0-d-07)', () => {
  it('reports Math.pow, Math.exp and Math.sin (math-allowlist) and a ** power (no-exponent-operator) in the kernel sources', async () => {
    expect(await reports(PLANTED, MODEL_PATH)).toEqual([
      '1:plat/math-allowlist',
      '2:plat/math-allowlist',
      '3:plat/math-allowlist',
      '4:plat/no-exponent-operator',
    ]);
  }, 60_000);

  it('reports nothing for the same reads through dmath', async () => {
    expect(await reports(THROUGH_DMATH, MODEL_PATH)).toEqual([]);
  }, 60_000);

  it('is the model scope that refuses them: the same lines in a test of the kernel pass', async () => {
    expect(await reports(PLANTED, TEST_PATH)).toEqual([]);
  }, 60_000);
});
