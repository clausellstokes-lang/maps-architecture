// Phase a (M0-b-05; §16 M0 (b): σ "read in the frame NG's was measured in"; §13.5's bent-cut row; C-0117: "the σ
// measure in a frame rule given as a parameter"; N-d: σ ± 0.02 applied by this harness). The listed test: "phase a on a
// hand-built face under a fixed frame rule gives σ = 0 (a fixed start) and arrival 90°; a different frame rule changes
// σ as computed by hand" — the cuts measured by M0-b-04's own `measureCut` on a hand-built 100 m × 40 m face, judged by
// the harness's `judgeA` against planted rows; and phase a end to end on M0-b-04's M0 (b) faces, in memory.
import { describe, expect, it, vi } from 'vitest';
import { H128, utf8Bytes } from '@plat/kernel';
import { measureCut, type CutSample, type FrameLine, type SignatureCut } from '../../src/bentcut/index.js';
import { judgeA, parseFrameRule, run, sigmaUnder, type BaselinesInput, type FrameRule, type NgComparisonReport, type PhaseAFace } from '../../src/bentcut-ng/index.js';
import { baselinesText, got, MEM_ROOT, put, resetMem, row, scalar } from './support.js';

const mem = vi.hoisted(() => ({ root: '', files: new Map<string, Uint8Array>(), log: [] as { op: string; path: string; virtual: boolean }[] }));
vi.mock('node:fs', async (orig) => (await import('./memfs.js')).memFs(await orig<typeof import('node:fs')>(), mem));

/** The hand-built face: 100 m × 40 m, centred on the origin, its major axis along x (sMin −50 m, L 100 m). */
const FRAME0: FrameLine = { centre: { x: 0, y: 0 }, major: { x: 1, y: 0 }, sMin: -5_000, lengthCm: 10_000 };
const C36 = Math.cos(Math.PI / 5);
const S36 = Math.sin(Math.PI / 5);
/** The same face's frame turned 36° (rung (a)'s attempt 1). */
const FRAME1: FrameLine = { centre: { x: 0, y: 0 }, major: { x: C36, y: S36 }, sMin: -5_000, lengthCm: 10_000 };

/** A straight cut across the face from A on the south side to the north side, arriving square on the north run. */
function straight(x: number, attempt: number, holed = false): SignatureCut {
  const s: CutSample = {
    frame: attempt === 0 ? FRAME0 : FRAME1,
    frame0: FRAME0,
    turnCdeg: attempt * 3_600,
    attempt,
    legs: [
      { x, y: -2_000 },
      { x, y: 2_000 },
    ],
    lambdaCm: 4_000,
    farDir: { x: -1, y: 0 },
    arrivalCross2: -1,
    points: [
      { x, y: -2_000 },
      { x, y: 2_000 },
    ],
    filleted: false,
    holed,
    wMinCm: 600,
  };
  return measureCut(holed ? 'holed' : 'concave', s);
}

const COUNTS = { cuts: 0, planner: 0, fallback: 0, deep: 0, matched: 0, missed: 0, misses: [] };

function face(cuts: SignatureCut[]): PhaseAFace {
  return { kind: 'concave', i: 0, setup: null, refused: null, cuts, counts: { ...COUNTS, cuts: cuts.length, planner: cuts.length, matched: cuts.length } };
}

function baselines(rows: ReturnType<typeof row>[]): BaselinesInput {
  const text = baselinesText(rows);
  return { rows, info: [], hash: H128(utf8Bytes(text)), file: { path: '.mem-bentcut-ng/baselines.json', sha256: '0'.repeat(64), bytes: text.length } };
}

const RECORDED_ALL: FrameRule = { frame: 'recorded', attempts: 3 };

function sd(xs: number[]): number {
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) * (b - m), 0) / (xs.length - 1));
}

describe('phase a on a hand-built face (the listed test)', () => {
  it('a fixed start gives σ = 0 and arrival 90° under a fixed frame rule', () => {
    const cuts = [straight(0, 0), straight(0, 0), straight(0, 0), straight(0, 0, true), straight(0, 0, true)];
    for (const c of cuts) {
      expect(c.startT).toBe(0.5);
      expect(c.arrivalCdeg).toBe(9_000);
    }
    const r = judgeA({ baselines: baselines([row('cut.sigma', 'plain', scalar(0.01)), row('cut.sigma', 'ring', scalar(0.03))]), rule: RECORDED_ALL, faces: [face(cuts)], seed: 1, perKind: 1 });
    expect(r.ours.sigmaUnderRule).toEqual({ all: 0, plain: 0, ring: 0 });
    expect(r.ours.signature.arrival85).toBe(1);
    const sigma = r.parity.rows.filter((x) => x.metric === 'cut.sigma');
    expect(sigma.map((x) => [x.baselineIds[0] ?? 'none', x.verdict, x.ours.p50])).toEqual([
      ['none', 'missingBaseline', undefined],
      ['test/ng/cut.sigma/plain', 'pass', 0],
      ['test/ng/cut.sigma/ring', 'fail', 0],
    ]);
    // σ 0 is within ± 0.02 of the plain row's 0.01 and outside it of the ring row's 0.03 (ring σ 0 too).
    const clause = (id: string) => r.clauses.find((c) => c.id === id);
    expect(clause('cut.sigma/plain')?.verdict).toBe('pass');
    expect(clause('cut.sigma/ring')?.verdict).toBe('fail');
    expect(r.failing).toEqual(['cut.sigma/ring']);
    expect(r.pass).toBe(false);
  });

  it('a different frame rule changes σ as computed by hand', () => {
    // A cut planned in the first frame at x = 0 and two planned in the frame turned 36° (attempt 1), at x = 0 and x = 20 m.
    const cuts = [straight(0, 0), straight(0, 1), straight(2_000, 1)];
    // By hand: the start A = (x, −20 m); its place in a frame is ((A − centre) · major − sMin) / L.
    const t0 = [0.5, 0.5, 0.7];
    const tRec = [0.5, (-2_000 * S36 + 5_000) / 10_000, (2_000 * C36 - 2_000 * S36 + 5_000) / 10_000];
    expect(cuts.map((c) => c.startT0)).toEqual(t0);
    cuts.forEach((c, i) => expect(c.startT).toBeCloseTo(tRec[i], 12));
    const recorded = sigmaUnder(cuts, RECORDED_ALL).get('all') as number;
    const first = sigmaUnder(cuts, { frame: 'first', attempts: 3 }).get('all') as number;
    const firstFrameOnly = sigmaUnder(cuts, { frame: 'recorded', attempts: 1 }).get('all');
    expect(recorded).toBeCloseTo(sd(tRec), 12);
    expect(first).toBeCloseTo(Math.sqrt(((0.5 - 17 / 30) ** 2 * 2 + (0.7 - 17 / 30) ** 2) / 2), 12);
    expect(first).toBeCloseTo(0.11547005383792516, 12);
    expect(recorded).not.toBeCloseTo(first, 3);
    // Counting the first frame's plans alone leaves one cut: no σ (n < 2) — the rule decides which cuts count.
    expect(firstFrameOnly).toBeUndefined();
    const two = [...cuts, straight(1_000, 0)];
    expect(sigmaUnder(two, { frame: 'recorded', attempts: 1 }).get('all')).toBeCloseTo(sd([0.5, 0.6]), 12);
    // judgeA reads σ under the rule it is given, and records the rule in its report.
    for (const rule of [RECORDED_ALL, { frame: 'first', attempts: 3 } as FrameRule]) {
      const r = judgeA({ baselines: baselines([row('cut.sigma', 'plain', scalar(0.1))]), rule, faces: [face(cuts)], seed: 1, perKind: 1 });
      expect(r.frameRule).toEqual(rule);
      expect(r.ours.sigmaUnderRule['plain']).toBeCloseTo(rule.frame === 'first' ? first : recorded, 12);
    }
  });

  it('σ ± 0.02 replaces the band rule\'s generic band on a target row (N-d), at both edges', () => {
    const cuts = [straight(0, 0), straight(2_000, 0), straight(0, 0, true), straight(2_000, 0, true)];
    const ours = sd([0.5, 0.7]);
    const at = (plain: number, ring: number, p10?: number, p90?: number) =>
      judgeA({ baselines: baselines([row('cut.sigma', 'plain', scalar(plain, p10, p90)), row('cut.sigma', 'ring', scalar(ring))]), rule: RECORDED_ALL, faces: [face(cuts)], seed: 1, perKind: 1 });
    const v = (r: NgComparisonReport, id: string) => r.clauses.find((c) => c.id === id)?.verdict;
    // Inside by 0.0199 on either side: pass; outside by 0.0201: fail.
    expect([v(at(ours + 0.0199, ours - 0.0199), 'cut.sigma/plain'), v(at(ours + 0.0199, ours - 0.0199), 'cut.sigma/ring')]).toEqual(['pass', 'pass']);
    expect([v(at(ours + 0.0201, ours - 0.0201), 'cut.sigma/plain'), v(at(ours + 0.0201, ours - 0.0201), 'cut.sigma/ring')]).toEqual(['fail', 'fail']);
    // A wide p10 – p90 the generic rule would pass: the ± 0.02 band still fails it.
    const wide = at(0.25, ours, 0.05, 0.3);
    expect(v(wide, 'cut.sigma/plain')).toBe('fail');
    const plain = wide.clauses.find((c) => c.id === 'cut.sigma/plain');
    expect(plain?.band).toEqual({ lo: 0.25 - 0.02, hi: 0.25 + 0.02 });
    expect(plain?.note).toContain('± 0.02');
    expect(v(wide, 'cut.sigma/ring')).toBe('pass');
  });

  it('a σ key with no cut, no row, or a descriptive row: notApplicable and missingBaseline fail the gate, descriptive holds', () => {
    const plainOnly = [straight(0, 0), straight(2_000, 0)];
    const r1 = judgeA({ baselines: baselines([row('cut.sigma', 'plain', scalar(0.14))]), rule: RECORDED_ALL, faces: [face(plainOnly)], seed: 1, perKind: 1 });
    expect(r1.clauses.find((c) => c.id === 'cut.sigma/ring')?.verdict).toBe('notApplicable');
    expect(r1.failing).toContain('cut.sigma/ring');
    const both = [...plainOnly, straight(0, 0, true), straight(2_000, 0, true)];
    const r2 = judgeA({ baselines: baselines([row('cut.sigma', 'plain', scalar(0.14))]), rule: RECORDED_ALL, faces: [face(both)], seed: 1, perKind: 1 });
    expect(r2.clauses.find((c) => c.id === 'cut.sigma/ring')?.verdict).toBe('missingBaseline');
    expect(r2.failing).toEqual(['cut.sigma/ring']);
    const desc = row('cut.sigma', 'ring', { n: 0, seeds: 0 }, { role: 'descriptive', sample: { family: 'test/plain', indices: [0, 2], failed: [{ index: 0, reason: 'no ring face' }, { index: 1, reason: 'no ring face' }] } });
    const r3 = judgeA({ baselines: baselines([row('cut.sigma', 'plain', scalar(0.14)), desc]), rule: RECORDED_ALL, faces: [face(both)], seed: 1, perKind: 1 });
    expect(r3.clauses.find((c) => c.id === 'cut.sigma/ring')?.verdict).toBe('reported');
    expect(r3.pass).toBe(true);
    // A run whose faces S8 refused fails its run clause, whatever σ reads.
    const refused: PhaseAFace = { ...face(both), refused: 'E_TEST planted' };
    const r4 = judgeA({ baselines: baselines([row('cut.sigma', 'plain', scalar(0.14)), desc]), rule: RECORDED_ALL, faces: [face(both), refused], seed: 1, perKind: 1 });
    expect(r4.failing).toEqual(['run']);
  });

  it('the replay clause gates phase a: a planner cut the replay missed, or a face not replayed, fails the run (hardening S1, note 7)', () => {
    const cuts = [straight(0, 0), straight(2_000, 0), straight(0, 0, true), straight(2_000, 0, true)];
    const ours = sd([0.5, 0.7]);
    const rows = [row('cut.sigma', 'plain', scalar(ours)), row('cut.sigma', 'ring', scalar(ours))];
    const ok = judgeA({ baselines: baselines(rows), rule: RECORDED_ALL, faces: [face(cuts)], seed: 1, perKind: 1 });
    expect([ok.pass, ok.clauses.find((c) => c.id === 'replay')?.verdict]).toEqual([true, 'pass']);
    const f = face(cuts);
    const missed: PhaseAFace = { ...f, counts: { ...(f.counts as NonNullable<PhaseAFace['counts']>), missed: 2 } };
    const m = judgeA({ baselines: baselines(rows), rule: RECORDED_ALL, faces: [missed], seed: 1, perKind: 1 });
    expect([m.pass, m.failing, m.clauses.find((c) => c.id === 'replay')?.ours]).toEqual([false, ['replay'], 2 / 6]);
    const notReplayed: PhaseAFace = { ...face([]), counts: null };
    const n = judgeA({ baselines: baselines(rows), rule: RECORDED_ALL, faces: [face(cuts), notReplayed], seed: 1, perKind: 1 });
    expect([n.pass, n.failing, n.clauses.find((c) => c.id === 'replay')?.note]).toEqual([false, ['replay'], "2 districts measured: 1 not replayed (S8's own run stood, its cuts unmeasured); 0 of 4 planner cuts missed by the replay (the bound 0)"]);
  });

  it('the corner, arrival and fillet rows are reported beside ours, never gating in phase a', () => {
    const cuts = [straight(0, 0), straight(2_000, 0), straight(0, 0, true), straight(2_000, 0, true)];
    const ours = sd([0.5, 0.7]);
    const r = judgeA({
      baselines: baselines([row('cut.sigma', 'plain', scalar(ours)), row('cut.sigma', 'ring', scalar(ours)), row('cut.cornerMid', 'all', scalar(0.1)), row('cut.arrival85', 'all', scalar(0.97))]),
      rule: RECORDED_ALL,
      faces: [face(cuts)],
      seed: 1,
      perKind: 1,
    });
    expect(r.pass).toBe(true);
    const arrival = r.clauses.find((c) => c.id === 'cut.arrival85/all');
    expect([arrival?.verdict, arrival?.gating, arrival?.note]).toEqual(['reported', false, 'the row reported beside ours; the clause is absolute on ours (C-0073, C-0081)']);
    expect(r.clauses.find((c) => c.id === 'arrival')).toMatchObject({ verdict: 'pass', gating: false, ours: 1, reference: 0.95 });
    // No bent cut: the corner and fillet shares do not apply (never a vacuous pass).
    expect(r.clauses.find((c) => c.id === 'corner')?.verdict).toBe('notApplicable');
    expect(r.clauses.find((c) => c.id === 'cut.fillet/all')?.verdict).toBe('notApplicable');
  });
});

describe('the frame rule is a parameter, never a constant', () => {
  it('parseFrameRule refuses a missing, unknown or out-of-range rule', () => {
    expect(parseFrameRule('recorded', '3')).toEqual({ frame: 'recorded', attempts: 3 });
    expect(parseFrameRule('first', '1')).toEqual({ frame: 'first', attempts: 1 });
    expect(parseFrameRule('first', '10')).toEqual({ frame: 'first', attempts: 10 });
    for (const [f, a] of [[undefined, '3'], ['recorded', undefined], [undefined, undefined], ['turned', '3'], ['recorded', '0'], ['recorded', '11'], ['recorded', 'x'], ['recorded', '-1']] as const) {
      expect(typeof parseFrameRule(f, a)).toBe('string');
    }
    expect(parseFrameRule(undefined, undefined)).toContain('never a default');
  });
});

describe('phase a end to end, in memory', () => {
  it('runs M0-b-04\'s signature on the M0 (b) faces, judges σ under the rule, proposes and applies the cells', { timeout: 600_000 }, async () => {
    resetMem(mem);
    const base = put(mem, 'a/baselines.json', baselinesText([row('cut.sigma', 'plain', scalar(0.084)), row('cut.sigma', 'ring', scalar(0.094))]));
    const cells = put(
      mem,
      'a/cells.json',
      JSON.stringify({
        schema: 'plat.table-cells/1',
        provenance: 'M-1 2026-10-04',
        tables: { granularity: [{ row: 'modest', cell: 'depthM', value: [14, 22] }], regimes: [{ row: 'dense_core', cell: 'blockDepthFloorM', value: [32, 46] }] },
      }),
    );
    const args = ['--phase', 'a', '--frame', 'recorded', '--attempts', '3', '--sig', '1', '--baselines', base, '--cells', cells];
    let rep: NgComparisonReport | undefined;
    const code = await run(args, { out: `${MEM_ROOT}/out`, platRoot: MEM_ROOT, onReport: (r) => (rep = r) });
    expect([0, 1]).toContain(code);
    expect(rep?.phase).toBe('a');
    expect(rep?.ours.faces).toBe(5);
    expect(rep?.ours.signature.cuts).toBeGreaterThan(0);
    expect(rep?.clauses.filter((c) => c.gating).map((c) => c.id)).toEqual(['run', 'replay', 'cut.sigma/plain', 'cut.sigma/ring']);
    expect(code).toBe(rep?.pass === true ? 0 : 1);
    // Proposed, not applied: the tables in the output folder, plat/'s data untouched.
    expect(rep?.tables?.map((t) => [t.table, t.from, t.to, t.mode])).toEqual([
      ['granularity', 1, 2, 'proposed'],
      ['regimes', 1, 2, 'proposed'],
    ]);
    expect(got(mem, 'out/bentcut-ng/granularity.json')).toContain('"version": 2');
    expect(got(mem, 'packages/tables/data/granularity.json')).toContain('"version": 1');
    // The report in canonical form, reproduced byte for byte by a second run.
    const first = got(mem, 'out/bentcut-ng/report-a.json');
    expect(first).toBeDefined();
    expect(await run(args, { out: `${MEM_ROOT}/out2`, platRoot: MEM_ROOT })).toBe(code);
    expect(got(mem, 'out2/bentcut-ng/report-a.json')).toBe(first);
    // --apply writes the two tables into plat/'s data folder (here the memory's), version 2, the cells' provenance — and
    // prints the run's verdict beside each applied table (hardening S1, note 8).
    const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    let applied: number;
    let lines: string;
    try {
      applied = await run([...args, '--apply'], { out: `${MEM_ROOT}/out3`, platRoot: MEM_ROOT });
      lines = spy.mock.calls.map((c) => String(c[0])).join('');
    } finally {
      spy.mockRestore();
    }
    expect(applied).toBe(code);
    const verdict = rep?.pass === true ? 'the run passes (exit 0)' : 'the run fails (exit 1) — read the verdict before committing the table';
    expect(lines).toContain(`bentcut-ng: applied granularity.json version 1 → 2, 1 cells, provenance M-1 2026-10-04; ${verdict}\n`);
    expect(lines).toContain(`bentcut-ng: applied regimes.json version 1 → 2, 1 cells, provenance M-1 2026-10-04; ${verdict}\n`);
    const g = JSON.parse(got(mem, 'packages/tables/data/granularity.json') ?? '{}') as { version: number; rows: Record<string, Record<string, { value: unknown; provenance: string }>> };
    expect(g.version).toBe(2);
    expect(g.rows['modest']['depthM']).toMatchObject({ value: [14, 22], provenance: 'M-1 2026-10-04' });
    // Every file the runs opened lay inside plat/; every input and output was the memory's.
    for (const e of mem.log) expect(e.path.startsWith(MEM_ROOT)).toBe(true);
    expect(mem.log.filter((e) => !e.virtual)).toEqual([]);
  });
});
