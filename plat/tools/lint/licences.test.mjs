// The licence check in the PR-tier lint (§17.4): the production closure is the five vendored libraries, every one on
// the allowlist; every dev-only dependency outside the allowlist is a listed exception with its reason, and an unlisted
// one fails the check. Each test walks the installed closure and carries an explicit timeout (LINT_TIMEOUT): wall time
// grows with the load of the shared machine.
import { describe, expect, it } from 'vitest';
import { checkLicencesOf } from './licences.mjs';
import { PLAT_ROOT } from './rules/shared.mjs';
import { LINT_TIMEOUT } from './test-support.mjs';

describe('the licences check', () => {
  it('passes the workspace: the production closure on the allowlist, every dev exception listed', () => {
    const r = checkLicencesOf(PLAT_ROOT);
    expect(r.problems).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.report[0]).toBe(
      'production closure: delaunator@5.1.0 ISC, flatbush@4.6.2 ISC, flatqueue@3.1.0 ISC, robust-predicates@3.0.3 Unlicense, simplex-noise@4.0.3 MIT',
    );
  }, LINT_TIMEOUT);

  it('fails an unlisted dev exception, naming it', () => {
    const r = checkLicencesOf(PLAT_ROOT, {});
    expect(r.ok).toBe(false);
    expect(r.problems.some((p) => p.startsWith('lightningcss@') && p.includes('no reason'))).toBe(true);
  }, LINT_TIMEOUT);
});
