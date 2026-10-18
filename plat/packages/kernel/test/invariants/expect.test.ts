// The `Invariant` kinds wired into `KernelTx.expect` (§3.3 *Expectations*, §5.3): a hard batch row as an entry of kind
// `check` — the transaction calls the suite's named predicate and a failure returns E_INVARIANT, the arena left at its
// version; a class floor as an entry of kind `classFloor` — E_BELOW_MIN_*; soft rows never enter `expect` (refused by
// `expectRow` and by the transaction) and go to the report; the whole suite on every commit through
// `TxEnv.invariants`, its hard rows aborting the batch. M0-a-14.
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import {
  classFloorRow,
  expectRow,
  KERNEL_ROWS,
  kernelChecks,
  kernelExpect,
  rowNamed,
  rowsOfScope,
  suiteEnv,
  suiteReport,
} from '../../src/invariants/index.js';
import { tx, type Overlay } from '../../src/tx/index.js';
import type { Invariant } from '../../src/types/index.js';
import { commit, framed, must, pt, spec, state, suiteTx } from './support.js';

function blocks(): Plat {
  const p = framed();
  commit(p, 1, (o) => {
    must(insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:v' }], 'mandatory'));
    must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:h' }], 'mandatory'));
    return { ok: true as const, value: null, warnings: [] };
  });
  return p;
}

/** An L2 lane inserted, then one of its vertices moved by hand inside the same batch (a writer's bug, simulated). */
function corrupting(dx: number, dy: number): (o: Overlay) => ReturnType<typeof insertChain> {
  return (o) => {
    const r = insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory');
    if (!r.ok) return r;
    const w = r.value.placed[1];
    o.plat.vertices.x[w] += dx;
    o.plat.vertices.y[w] += dy;
    return r;
  };
}

describe('the rows by name and scope; soft rows never enter expect', () => {
  it('every hard batch row is an expect entry of kind check named for its row; the others are refused', () => {
    const entries = kernelExpect();
    const want = KERNEL_ROWS.filter((r) => r.class === 'hard' && r.scope === 'batch').map((r) => r.name);
    expect(entries.map((e) => e.check)).toEqual(want);
    for (const e of entries) expect([e.kind, e.scope, e.class, e.name]).toEqual(['check', 'batch', 'hard', e.check]);
    expect(() => expectRow('face-corners')).toThrow(/soft row goes to the report/);
    expect(() => expectRow('euler')).toThrow(/only hard batch rows/);
    expect(() => expectRow('references-resolve')).toThrow(/only hard batch rows/);
    expect(() => expectRow('no-such-row')).toThrow(/no §3.10 row/);
    expect(rowsOfScope('batch').map((r) => r.name)).toContain('face-corners');
    expect(rowNamed('face-corners').class).toBe('soft');
  });
  it('the transaction refuses a soft entry in expect (a programming error, the arena untouched)', () => {
    const p = blocks();
    const before = state(p);
    const soft: Invariant = { name: 'face-corners', scope: 'batch', class: 'soft', kind: 'check', check: 'face-corners' };
    expect(() => tx(p, spec(2, { expect: [soft] }), (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'), { checks: kernelChecks() })).toThrow(/soft row goes to the report/);
    expect(state(p)).toBe(before);
  });
  it('kernelChecks names one predicate per hard batch row', () => {
    const checks = kernelChecks();
    for (const e of kernelExpect()) expect(typeof checks[e.check as string]).toBe('function');
    expect(checks['face-corners']).toBeUndefined();
    expect(checks['euler']).toBeUndefined();
  });
});

describe('an expect entry of kind check: the suite\'s predicate, E_INVARIANT on failure', () => {
  it('holds on a clean batch, which commits', () => {
    const p = blocks();
    const r = tx(p, spec(2, { expect: kernelExpect() }), corrupting(0, 0), { checks: kernelChecks() });
    expect(r.ok).toBe(true);
  });
  it('a vertex moved 10 cm from a way inside the batch: the clearance entry fails with E_INVARIANT, the arena as it was', () => {
    const p = blocks();
    const before = state(p);
    const r = tx(p, spec(2, { expect: [expectRow('clearance')] }), corrupting(0, 490), { checks: kernelChecks() });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail.startsWith('clearance: ')).toBe(true);
    expect(r.detail).toContain('(1500, 1990)');
    expect(state(p)).toBe(before);
  });
  it('the same batch with only an unrelated entry (lattice-range) commits: the entry decides, not the suite', () => {
    const p = blocks();
    const r = tx(p, spec(2, { expect: [expectRow('lattice-range')] }), corrupting(0, 490), { checks: kernelChecks() });
    expect(r.ok).toBe(true);
  });
});

describe('an expect entry of kind classFloor: the transaction\'s measure, E_BELOW_MIN_*', () => {
  it('a face below its class\'s area floor returns E_BELOW_MIN_AREA', () => {
    const p = blocks();
    const r = tx(p, spec(2, { expect: [classFloorRow('block')] }), (o) => insertChain(o, [pt(0, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'k:1' }], 'mandatory'), { floors: () => ({ minAreaCm2: 3_000_000 }) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_AREA');
    const fine = tx(p, spec(2, { expect: [classFloorRow('block')] }), (o) => insertChain(o, [pt(0, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'k:1' }], 'mandatory'), { floors: () => ({ minAreaCm2: 1_000_000 }) });
    expect(fine.ok).toBe(true);
  });
});

describe('the whole suite on every commit (TxEnv.invariants): hard rows abort, soft rows and the cost go to the report', () => {
  it('a hard violation rejects the batch with E_INVARIANT naming its row; the report keeps the line', () => {
    const p = blocks();
    const before = state(p);
    const { res, report } = suiteTx(p, 2, corrupting(0, 490));
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.code).toBe('E_INVARIANT');
      expect(res.detail.startsWith('clearance: ')).toBe(true);
    }
    expect(state(p)).toBe(before);
    expect(report.batches).toHaveLength(1);
    expect(report.batches[0].results.find((r) => r.name === 'clearance')?.holds).toBe(false);
  });
  it('a soft violation (an acute corner of a mandatory chain) commits, and the report carries it', () => {
    const p = blocks();
    const { res, report } = suiteTx(p, 2, (o) => insertChain(o, [pt(1100, 1950), pt(1900, 2000)], [{ role: 'kerb', entity: 'lane:9' }], 'mandatory'));
    expect(res.ok).toBe(true);
    const corners = report.batches[0].results.find((r) => r.name === 'face-corners');
    expect(corners?.class).toBe('soft');
    expect(corners?.holds).toBe(false);
    expect(corners?.problems.some((x) => x.includes('(1900, 2000)'))).toBe(true);
    expect(report.batches[0].touchedFaces).toBeGreaterThan(0);
    expect(report.batches[0].checked.faces).toBeGreaterThan(0);
  });
  it('the caller\'s own checks and invariants hook still run beside the suite', () => {
    const p = blocks();
    const report = suiteReport();
    let calls = 0;
    const env = suiteEnv({ report, base: { invariants: () => { calls++; return ['mine: refused']; }, checks: { mine: () => null } } });
    expect(typeof env.checks?.mine).toBe('function');
    expect(typeof env.checks?.clearance).toBe('function');
    const r = tx(p, spec(2), (o) => insertChain(o, [pt(500, 500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'), env);
    expect(calls).toBe(1);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.detail).toBe('mine: refused');
    expect(report.batches).toHaveLength(1);
  });
});
