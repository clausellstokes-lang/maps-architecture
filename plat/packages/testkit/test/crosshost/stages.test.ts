// The kernel fixtures' stage table (M0-d-06): each stage digests what its clause names — M0-a-10's regularFit doubles,
// M0-a-12's circumcentres, M0-k-02's constructive draws with the geometry services on them — recomputed here from the
// kernel's own calls, so a stage that dropped an input from its digest would differ; and the leg runtime's order,
// refusals and timing switch.
import { describe, expect, it } from 'vitest';
import { circumcentres, delaunay, hull, lir, obb, regularFit } from '@plat/kernel';
import {
  CONSTRUCTIVE_SET,
  CROSSHOST_KERNEL_STAGES,
  CrossHostDigestWriter,
  crossHostCircumcentreSets,
  crossHostRegularFitRings,
  crossHostResultData,
  runCrossHostJob,
  type CrossHostJob,
} from '@plat/testkit';

const stage = (id: string) => {
  const s = CROSSHOST_KERNEL_STAGES.find((x) => x.id === id);
  if (s === undefined) throw new Error(id);
  return s;
};
const ctx = () => ({ inputs: {}, carry: new Map<string, unknown>() });
const SEEDS = [0, 1, 2, 42, 4294967295];

describe("the regularFit stage digests M0-a-10's doubles", () => {
  it('equals the digest of each ring and its regularFit result, recomputed', () => {
    for (const seed of SEEDS) {
      const w = new CrossHostDigestWriter();
      for (const ring of crossHostRegularFitRings(seed)) w.value(ring).value(crossHostResultData(regularFit(ring)));
      expect(stage('regularFit').run(seed, ctx())).toEqual({ model: w.hex(), records: null });
    }
  });
  it('fits real rings: 16 per seed, both orientations, nearly all fitted, the doubles not integers', () => {
    let fitted = 0;
    let all = 0;
    let fractional = 0;
    const turns = new Set<boolean>();
    for (const seed of SEEDS) {
      const rings = crossHostRegularFitRings(seed);
      expect(rings.length).toBe(16);
      for (const ring of rings) {
        all += 1;
        let a2 = 0;
        for (let i = 0; i < ring.length; i += 1) {
          const p = ring[i];
          const q = ring[(i + 1) % ring.length];
          a2 += p.x * q.y - q.x * p.y;
        }
        turns.add(a2 > 0);
        const r = regularFit(ring);
        if (r.ok) {
          fitted += 1;
          if (!Number.isInteger(r.value.radiusCm) && !Number.isInteger(r.value.targets[0].x)) fractional += 1;
        }
      }
    }
    expect(turns).toEqual(new Set([true, false]));
    expect(fitted).toBeGreaterThanOrEqual(all - 2);
    expect(fractional).toBeGreaterThan(fitted / 2);
  });
});

describe("the circumcentre stage digests M0-a-12's dual", () => {
  it('equals the digest of each set’s triangles and circumcentres (origin 0 and the sites’ corner), recomputed', () => {
    for (const seed of SEEDS) {
      const w = new CrossHostDigestWriter();
      let triangulated = 0;
      for (const pts of crossHostCircumcentreSets(seed)) {
        const d = delaunay(pts);
        if (!d.ok) {
          w.value({ ok: false, code: d.code, detail: d.detail });
          continue;
        }
        triangulated += d.value.triangles.length > 0 ? 1 : 0;
        const ox = Math.min(...d.value.sites.map((p) => p.x));
        const oy = Math.min(...d.value.sites.map((p) => p.y));
        w.value(d.value.triangles).value(circumcentres(d.value, 0, 0)).value(circumcentres(d.value, ox, oy));
      }
      expect(triangulated).toBeGreaterThanOrEqual(7);
      expect(stage('circumcentres').run(seed, ctx())).toEqual({ model: w.hex(), records: null });
    }
  });
  it('holds a cocircular lattice grid first and random sets after', () => {
    const [grid, ...rest] = crossHostCircumcentreSets(5);
    const xs = new Set(grid.map((p) => p.x));
    expect(grid.length).toBe(xs.size * xs.size);
    expect(rest.length).toBe(7);
    expect(rest.every((s) => s.length >= 3)).toBe(true);
  });
});

describe("the constructive stage digests M0-k-02's draws and the services on them", () => {
  it('equals the digest recomputed from every M0 case: its draw, its numeric-core verdict, hull/obb/lir/regularFit on its rings, hull on its point sets', () => {
    const byCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
    for (const seed of [0, 3]) {
      const w = new CrossHostDigestWriter();
      let cases = 0;
      let rings = 0;
      let verdicts = 0;
      for (const c of CONSTRUCTIVE_SET) {
        if (c.milestone !== 'M0') continue;
        cases += 1;
        w.str(c.id);
        const g = c.generate(seed);
        w.value(g);
        if (g.kind !== 'input') continue;
        if (c.run !== undefined) {
          verdicts += 1;
          w.value(c.run(g));
        }
        for (const name of Object.getOwnPropertyNames(g.rings).sort(byCode)) {
          rings += 1;
          const ring = g.rings[name];
          w.str(name).value(crossHostResultData(hull(ring))).value(crossHostResultData(obb(ring))).value(crossHostResultData(lir(ring))).value(crossHostResultData(regularFit(ring)));
        }
        for (const name of Object.getOwnPropertyNames(g.pointSets).sort(byCode)) w.str(name).value(crossHostResultData(hull(g.pointSets[name])));
      }
      w.u32(cases);
      expect(cases).toBeGreaterThan(50);
      expect(rings).toBeGreaterThan(20);
      expect(verdicts).toBeGreaterThan(3);
      expect(stage('constructive').run(seed, ctx())).toEqual({ model: w.hex(), records: null });
    }
  });
});

describe('every seeded stage is a function of its seed', () => {
  it('the same seed twice gives one digest; two seeds give two', () => {
    for (const s of CROSSHOST_KERNEL_STAGES.filter((x) => x.seeded !== false)) {
      const a = s.run(11, ctx());
      expect(s.run(11, ctx()), s.id).toEqual(a);
      expect(s.run(12, ctx()).model, s.id).not.toBe(a.model);
    }
  });
  it('the known-answer stages are unseeded and refuse a fixture without their inputs', () => {
    for (const id of ['xoshiro.kat', 'dmath.kat', 'lanes.kat']) {
      expect(stage(id).seeded).toBe(false);
      expect(() => stage(id).run(0, ctx())).toThrow(/gives no input/);
    }
  });
});

describe('the leg runtime', () => {
  const table = [
    { id: 'u', seeded: false, run: () => ({ model: 'u'.padEnd(32, '0'), records: null }) },
    { id: 'a', run: (seed: number, c: { carry: Map<string, unknown> }) => (c.carry.set('a', seed), { model: String(seed).padEnd(32, '0'), records: null }) },
    { id: 'b', run: (seed: number, c: { carry: Map<string, unknown> }) => ({ model: String(c.carry.get('a')).padEnd(32, '1'), records: 'r'.padEnd(32, '0') }) },
    { id: 'x', run: () => { throw new TypeError('no'); } },
  ];
  const job = (over: Partial<CrossHostJob> = {}): CrossHostJob => ({ fixture: 't', seeds: [5, 6], stages: ['a', 'b', 'u', 'x'], inputs: {}, timing: false, ...over });

  it('runs the unseeded stages first, once, then each seed’s stages in list order with a fresh carry', () => {
    const r = runCrossHostJob(table, job(), 'main');
    expect(r.thread).toBe('main');
    expect(r.cells.map((c) => `${c.stage}@${String(c.seed)}`)).toEqual(['u@null', 'a@5', 'b@5', 'x@5', 'a@6', 'b@6', 'x@6']);
    expect(r.cells[2].model).toBe('5'.padEnd(32, '1'));
    expect(r.cells[3]).toEqual({ stage: 'x', seed: 5, model: null, records: null, error: 'TypeError: no' });
    expect(r.cells.every((c) => c.ms === undefined)).toBe(true);
  });
  it('the timing switch reads the clock around each call only, and needs a clock', () => {
    let t = 0;
    const r = runCrossHostJob(table, job({ timing: true }), 'worker', () => (t += 2));
    expect(r.thread).toBe('worker');
    expect(r.cells.map((c) => c.ms)).toEqual([2, 2, 2, 2, 2, 2, 2]);
    expect(() => runCrossHostJob(table, job({ timing: true }), 'main')).toThrow(/needs the leg clock/);
  });
  it('refuses an unknown or repeated stage and a seed that is not a u32, before running anything', () => {
    expect(() => runCrossHostJob(table, job({ stages: ['a', 'zz'] }), 'main')).toThrow(/no stage "zz"/);
    expect(() => runCrossHostJob(table, job({ stages: ['a', 'a'] }), 'main')).toThrow(/twice/);
    expect(() => runCrossHostJob([...table, table[0]], job(), 'main')).toThrow(/twice/);
    expect(() => runCrossHostJob(table, job({ seeds: [-1] }), 'main')).toThrow(RangeError);
    expect(() => runCrossHostJob(table, job({ seeds: [2 ** 32] }), 'main')).toThrow(RangeError);
  });
});
