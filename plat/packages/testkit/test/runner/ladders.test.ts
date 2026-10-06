// M0-k-04's listed test: "the ladder-coverage table names every M0 KERNEL rung and downgrade with its fixture (the stage
// rungs are entered later by M0-x-05)" (§13.1 *Ladder coverage*; §5.2's F-SKELETON and F-NUM rows; §5.1 (8), (9); C-0085,
// C-0109). The table must hold, by name, F-SKELETON's downgrade per reader and its three causes (the contract's
// refusal, the event law, a validator failure), the 1 000 holed polygons, and F-NUM's kernel side — each optional-chain
// refusal by its code, the mandatory chain's commits with their warnings and its bug abort — each with a fixture that
// exists (a constructive case of M0-k-02's set, a fixture of the runner, or a kernel test file in plat/), every built
// row's fixture reaching its rung on every draw, the later rungs with their milestones; and §5.1 (9)'s five degenerate
// kinds per kernel class. And the kernel's bug-abort shape (§5.1 (8)): the batch rolled back, one replayable bugs entry,
// tier 6 — never a throw.
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { bugAbort, CONSTRUCTIVE_SET, constructiveCase, ladderCoverage, ladderCoverageReport, type CoverageReport } from '@plat/testkit';
import { lp } from './support.js';

const PLAT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');

let cached: CoverageReport | null = null;
const table = (): CoverageReport => (cached ??= ladderCoverage({ draws: 6 }));

/** The rows whose rung text matches. */
const rows = (re: RegExp) => table().rows.filter((r) => re.test(r.rung));

describe('the kernel ladders’ coverage table (§13.1; C-0085, C-0109)', () => {
  it('names the two kernel ladders and nothing of the stage ladders', () => {
    expect(table().ladders).toEqual(['F-NUM', 'F-SKELETON']);
    for (const r of table().rows) expect(['F-NUM', 'F-SKELETON']).toContain(r.failureClass);
  });

  it("F-SKELETON: each reader's downgrade and each cause, by name", () => {
    expect(rows(/roof reader.*corner sharper than 5°.*plain roof/).length).toBe(1);
    expect(rows(/roof reader.*hole touching.*plain roof/).length).toBe(1);
    expect(rows(/spine reader.*sampled medial axis/).length).toBe(1);
    expect(rows(/E_WORK_LIMIT/).filter((r) => r.failureClass === 'F-SKELETON').length).toBe(1);
    expect(rows(/validator post-condition fails/).length).toBe(1);
    expect(rows(/1 000 holed polygons/).length).toBe(1);
    const regions = rows(/regions reader/);
    expect(regions.length).toBe(1);
    expect(regions[0].status).toEqual({ deferredTo: 'M1' });
  });

  it("F-NUM's kernel side: every optional refusal by its code, the mandatory commits and the bug abort", () => {
    const codes = table().rows.filter((r) => r.failureClass === 'F-NUM').map((r) => r.code);
    for (const c of ['E_BELOW_MIN_EDGE', 'E_BELOW_MIN_ANGLE', 'E_OUT_OF_RANGE', 'E_SELF_INTERSECT', 'W_ACUTE_CORNER', 'bug', 'W_SNAP_PASSES']) {
      expect(codes.some((x) => x.includes(c)), c).toBe(true);
    }
    expect(rows(/mandatory chain with a point off the lattice range.*bug abort/)[0].tier).toBe(6);
    expect(rows(/wedge route/).length).toBe(1);
    expect(rows(/fault-injection hook.*B-CITY-lite/)[0].status).toEqual({ deferredTo: 'M1' });
  });

  it('every fixture exists: a constructive M0 case, a fixture of the runner, or a kernel test file in plat/', () => {
    for (const r of table().rows) {
      const first = r.fixture.split(' ')[0];
      if (first.startsWith('packages/')) {
        const path = first.replace(/[;,]$/, '');
        expect(existsSync(join(PLAT, path)), `${r.rung}: ${path}`).toBe(true);
      } else if (first.startsWith('ladder/')) {
        expect(r.exercised, r.rung).not.toBeNull();
      } else if (r.status === 'built') {
        expect(constructiveCase(first)?.milestone, `${r.rung}: ${first}`).toBe('M0');
      }
    }
  });

  it('every built row run here reaches its rung on every draw; the table is covered', () => {
    for (const r of table().rows) {
      if (r.status !== 'built' || r.exercised === null) continue;
      expect(r.exercised.draws, r.rung).toBeGreaterThan(0);
      expect(r.exercised.reached, r.rung).toBe(r.exercised.draws);
      // every draw came to the one outcome that is the rung — its code, its warning, or its downgrade's path and cause
      expect(Object.keys(r.exercised.observed), r.rung).toHaveLength(1);
    }
    const seen = (re: RegExp) => Object.keys(rows(re)[0].exercised?.observed ?? {});
    expect(seen(/roof reader.*corner sharper/)).toEqual(['W_DOWNGRADE plainRoof (contract sharpCorner)']);
    expect(seen(/roof reader.*hole touching/)).toEqual(['W_DOWNGRADE plainRoof (contract holeContact)']);
    expect(seen(/spine reader/)).toEqual(['W_DOWNGRADE medialAxis']);
    expect(seen(/optional chain making a corner/)).toEqual(['E_BELOW_MIN_ANGLE']);
    expect(seen(/mandatory chain making a corner/)).toEqual(['W_ACUTE_CORNER']);
    expect(table().covered).toBe(true);
    // the 1 000 holed polygons run whole
    expect(rows(/1 000 holed polygons/)[0].exercised?.draws).toBe(1000);
  });

  it('a built row that misses its rung on one draw, or ran no draw, leaves the table uncovered (a negative control)', () => {
    const row = table().rows.find((r) => r.exercised !== null && r.status === 'built');
    if (row === undefined || row.exercised === null) throw new Error('no built row');
    const missed = { ...row, exercised: { ...row.exercised, reached: row.exercised.draws - 1 } };
    expect(ladderCoverageReport([missed]).covered).toBe(false);
    expect(ladderCoverageReport([{ ...row, exercised: { draws: 0, reached: 0, observed: {} } }]).covered).toBe(false);
    expect(ladderCoverageReport([row]).covered).toBe(true);
    // a deferred row and a hook row are not run here and never uncover the table
    expect(ladderCoverageReport(table().rows.filter((r) => r.exercised === null)).covered).toBe(true);
  });

  it("§5.1 (9)'s degenerate kinds: one input of each of the five kinds per kernel class, each an M0 case", () => {
    const kinds = ['coincident', 'collinear', 'self-touching', 'zero-area', 'zero-length'];
    for (const cls of ['F-NUM', 'F-SKELETON'] as const) {
      const got = table().degenerate.filter((d) => d.failureClass === cls).map((d) => d.kind).sort();
      expect(got, cls).toEqual(kinds);
    }
    for (const d of table().degenerate) expect(CONSTRUCTIVE_SET.find((c) => c.id === d.fixture)?.milestone).toBe('M0');
  });
});

describe('the bug-abort shape on the kernel side (§5.1 (8))', () => {
  it('a mandatory chain off the range: E_OUT_OF_RANGE (a typed result), the batch rolled back, one replayable bugs entry, tier 6', () => {
    const out = bugAbort([lp(100, 100), lp(8_388_608, 200)], 7);
    expect(out).toEqual({ code: 'E_OUT_OF_RANGE', rolledBack: true, bug: { cls: 'F-NUM', entity: 'way:arterial-7', key: 'bfuzz/bugAbort#7', stage: 'S4' }, tier: 6 });
  });

  it('control: an in-range mandatory chain commits — no abort, no bugs entry', () => {
    expect(bugAbort([lp(100, 100), lp(900, 200)], 8)).toEqual({ code: 'ok', rolledBack: false, bug: null, tier: 0 });
  });
});
