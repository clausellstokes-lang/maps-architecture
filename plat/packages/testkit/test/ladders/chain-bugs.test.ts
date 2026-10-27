// M0-x-05, hardening round S2 (notes row 2, the closing check of round S1's CK11): a chain fixture's run carries its
// chain's `bugs` through `fixtures.ts`'s `chain()` into its leaves, so `stageLadderCoverage()` fails the row. The base
// chain is mocked so `runChain` returns its real run with ONE planted `bugs` entry appended: a `chain()` that discarded
// the chain's report again (`readRun({ ...runChain(spec), report: { bugs: [] } })`) leaves the planted entry uncounted
// and turns this file red. The planted entry is the mock's alone; the real run's own `bugs` stay pinned empty by
// `chain.test.ts` and by `coverage.test.ts`'s whole report.
import { describe, expect, it, vi } from 'vitest';

/** The one planted entry (§5.4's BugRow shape), appended to every mocked chain run's report. */
const PLANTED = Object.freeze({ cls: 'F-WALL', entity: 'x05:planted', key: 'planted (M0-x-05 round S2)', stage: 'S3' });

vi.mock('../../src/ladders/chain.js', async (importOriginal) => {
  const orig = await importOriginal<typeof import('../../src/ladders/chain.js')>();
  return {
    ...orig,
    runChain: (spec: Parameters<typeof orig.runChain>[0]) => {
      const r = orig.runChain(spec);
      return { ...r, report: { ...r.report, bugs: [...r.report.bugs, { ...PLANTED }] } };
    },
  };
});

const { LADDER_FIXTURES } = await import('../../src/ladders/fixtures.js');
const { stageLadderCoverage } = await import('../../src/ladders/coverage.js');
const { BUGS_LEAF } = await import('../../src/ladders/readers.js');
const { ladderCoverage } = await import('../../src/invariants/ladders.js');

const REDRAW = 'S3 F-WALL redraw';

describe('a chain fixture’s run carries its chain’s bugs (hardening round S2, notes row 2)', () => {
  it('wall/redraw’s run leaves bugs 1 beside its rung leaf; stageLadderCoverage over that row alone reports bugs 1, not covered', { timeout: 600_000 }, () => {
    const f = LADDER_FIXTURES.find((x) => x.id === 'wall/redraw');
    expect(f).toBeDefined();
    const leaves = f!.run();
    // The rung still taken (the planted entry changes nothing the stage did), and the one planted bug counted beside it.
    expect(leaves[REDRAW]).toBe(1);
    expect(leaves[BUGS_LEAF]).toBe(1);
    // The row's count carries it: reached (fixture 1), the controls clean (none run), bugs 1. (`only` leaves every other
    // built row unrun, so the false verdicts below are not this row's alone; the row's `exercised` is the pin.)
    const r = stageLadderCoverage({ kernel: ladderCoverage({ draws: 1 }), controls: [], only: [REDRAW] });
    expect(r.stage.find((x) => x.leaf === REDRAW)?.exercised).toEqual({ fixture: 1, control: 0, bugs: 1 });
    expect(r.controlBugs).toBe(0);
    expect(r.stageCovered).toBe(false);
    expect(r.covered).toBe(false);
  });
});
