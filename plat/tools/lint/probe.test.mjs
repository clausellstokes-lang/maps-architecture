// The probe (C-0063, its mechanism C-0106): `corepack pnpm lint`'s `probe-red` check lints the probe fixture in place
// under the model-package rule set and passes only when every planted line is reported; with one rule disabled in a
// test configuration it fails, naming the line that rule alone reported. No file is written.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import plugin from './index.mjs';
import { PROBE, REQUIRED, plantedLines, runProbe } from './probe.mjs';
import { MODEL_RULE_NAMES } from './rules/index.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';

const planted = plantedLines(readFileSync(join(PLAT_ROOT, ...PROBE.split('/')), 'utf8'));
const lineOf = (what) => planted.find((p) => p.what === what).line;

/** The planted lines each rule reports — the expectation the disabled-rule runs are judged against. */
const REPORTS = {
  'math-allowlist': ['Math.pow', 'Math.random', 'Math.sin'],
  'no-nondeterminism': ['Math.random', 'Date.now', 'performance.now', 'localeCompare'],
  'no-exponent-operator': ['**'],
  'no-object-key-iteration': ['Object.keys().sort()', 'for…in'],
  'sort-with-comparator': ['Object.keys().sort()', '[3, 1].sort()'],
  'ratio-division': [],
};

describe('the probe fixture', () => {
  it('holds exactly C-0063\'s ten constructs, one planted line each', () => {
    expect(planted.map((p) => p.what).sort()).toEqual([...REQUIRED].sort());
    expect(new Set(planted.map((p) => p.line)).size).toBe(planted.length);
  });

  it('is the lint\'s first whole-tree check, probe-red', () => {
    expect(plugin.checks[0].name).toBe('probe-red');
  });
});

describe('probe-red', () => {
  it('reports every planted line under the model-package rule set (the lint green only while the probe is red)', async () => {
    const r = await runProbe(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    for (const p of planted) {
      const line = r.report.find((l) => l.startsWith(`${PROBE}:${p.line} `));
      expect(line, `${p.what} reported`).toBeDefined();
      for (const [rule, whats] of Object.entries(REPORTS)) {
        expect(line.includes(`plat/${rule}`), `${p.what} by plat/${rule}`).toBe(whats.includes(p.what));
      }
    }
  }, 60_000);

  for (const rule of MODEL_RULE_NAMES) {
    // A line goes missing when the disabled rule was its only reporter.
    const others = Object.entries(REPORTS).filter(([r]) => r !== rule).flatMap(([, w]) => w);
    const missing = REPORTS[rule].filter((w) => !others.includes(w));
    it(`with plat/${rule} disabled ${missing.length ? `fails naming ${missing.join(', ')}` : 'still passes (no planted line is its alone)'}`, async () => {
      const r = await runProbe(PLAT_ROOT, { disable: [rule] });
      expect(r.ok).toBe(missing.length === 0);
      expect(r.problems).toEqual(missing.map((w) => `${PROBE}:${lineOf(w)} (${w}) is not reported — the lint lets it through`));
    }, 60_000);
  }

  it('with every model rule disabled fails naming all ten lines', async () => {
    const r = await runProbe(PLAT_ROOT, { disable: [...MODEL_RULE_NAMES] });
    expect(r.ok).toBe(false);
    expect(r.problems).toHaveLength(10);
  }, 60_000);

  it('fails on a missing probe', async () => {
    const r = await runProbe(join(PLAT_ROOT, 'tools', 'lint', 'fixtures', 'zz-no-such-root'));
    expect(r.ok).toBe(false);
    expect(r.problems[0]).toMatch(/missing/);
  });
});
