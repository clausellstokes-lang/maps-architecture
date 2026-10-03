// The whole-tree check `probe-red` (C-0063, its mechanism C-0106; M0.md §3 step 3): the lint's own acceptance test.
// It lints the probe fixture tools/lint/fixtures/probe/zz-probe.ts IN PLACE through ESLint's Node API — the tree's own
// configuration (eslint.config.js; type information through the probe's own tsconfig.json), `ignore: false` on the
// fixture path, and the model-package rule set applied to it as if it were model code — and PASSES only when every
// planted line is reported by a `plat/` rule. So `corepack pnpm lint` is green only while the probe is red, and no file
// is ever written into a package folder. The planted lines are the ones marked `// planted: <what>`; the check also
// refuses a probe that has lost one of C-0063's ten constructs. On success it prints, per planted line, the rules that
// reported it (the output a checker quotes).
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { ESLint } from 'eslint';
import { MODEL_RULES } from './rules/index.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';

export const PROBE = 'tools/lint/fixtures/probe/zz-probe.ts';
export const PROBE_PROJECT = 'tools/lint/fixtures/probe/tsconfig.json';

/** C-0063's list: the constructs the probe must hold, each on its own planted line. */
export const REQUIRED = Object.freeze([
  'Math.pow', 'Math.random', 'Math.sin', 'Date.now', 'performance.now', '**', 'Object.keys().sort()', 'for…in',
  '[3, 1].sort()', 'localeCompare',
]);

/** The planted lines of a probe text: [{ line, what }], 1-based. */
export function plantedLines(text) {
  const out = [];
  text.split('\n').forEach((l, i) => {
    const m = /\/\/ planted: (.+?)\s*$/.exec(l);
    if (m) out.push({ line: i + 1, what: m[1] });
  });
  return out;
}

/**
 * Runs the probe. `disable` names rules (without the `plat/` prefix) switched off for the probe — the test
 * configuration that proves the check fails, naming the line, when a rule stops reporting.
 * @returns {Promise<{ ok: boolean, problems: string[], report: string[] }>}
 */
export async function runProbe(root = PLAT_ROOT, { disable = [] } = {}) {
  const abs = join(root, ...PROBE.split('/'));
  if (!existsSync(abs)) return { ok: false, problems: [`${PROBE}: missing — the lint has no acceptance probe`], report: [] };
  const planted = plantedLines(readFileSync(abs, 'utf8'));
  const problems = [];
  for (const what of REQUIRED) {
    if (!planted.some((p) => p.what === what)) problems.push(`${PROBE}: the planted line "${what}" (C-0063) is missing from the probe`);
  }
  const rules = { ...MODEL_RULES };
  for (const name of disable) rules[`plat/${name}`] = 'off';
  const eslint = new ESLint({
    cwd: root,
    ignore: false,
    overrideConfig: [
      {
        files: [PROBE],
        // Type information through the probe's own project: typescript-eslint keeps one project service per process,
        // created by the tree lint without this file, so the probe names its tsconfig instead (C-0125).
        languageOptions: { parserOptions: { projectService: false, project: [PROBE_PROJECT], tsconfigRootDir: root } },
        rules,
      },
    ],
  });
  const [result] = await eslint.lintFiles([abs]);
  const fatal = result.messages.filter((m) => m.fatal);
  for (const m of fatal) problems.push(`${PROBE}:${m.line}: cannot be linted (${m.message})`);
  const report = [];
  for (const p of planted) {
    const by = [...new Set(result.messages.filter((m) => m.line === p.line && m.ruleId?.startsWith('plat/')).map((m) => m.ruleId))].sort();
    if (by.length === 0) problems.push(`${PROBE}:${p.line} (${p.what}) is not reported — the lint lets it through`);
    else report.push(`${PROBE}:${p.line} ${p.what} ← ${by.join(', ')}`);
  }
  return { ok: problems.length === 0, problems, report };
}

export const check = {
  name: 'probe-red',
  async run(root) {
    const r = await runProbe(resolve(root));
    for (const line of r.report) process.stdout.write(`lint probe-red: ${line}\n`);
    return { ok: r.ok, problems: r.problems };
  },
};
