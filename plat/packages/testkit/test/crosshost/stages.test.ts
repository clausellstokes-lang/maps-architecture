// The kernel fixtures' stage table (M0-d-06): each stage digests what its clause names — M0-a-10's regularFit doubles,
// M0-a-12's circumcentres, M0-k-02's constructive draws with the geometry services on them — recomputed here from the
// kernel's own calls, so a stage that dropped an input from its digest would differ; and the leg runtime's order,
// refusals and timing switch.
import { describe, expect, it } from 'vitest';
import { circumcentres, delaunay, dmath, hull, LaneWriter, lir, obb, regularFit, type Stream } from '@plat/kernel';
import {
  CONSTRUCTIVE_SET,
  CROSSHOST_DMATH_ROUTINES,
  CROSSHOST_KERNEL_STAGES,
  CrossHostDigestWriter,
  crossHostCircumcentreSets,
  crossHostStream,
  crossHostLaneStreams,
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

// Hardening round S1, row 3 (checks/M0-d-06-notes.md note 3): the seeded xoshiro and dmath stages recomputed here, as
// the lanes, regularFit, circumcentres and constructive stages are — a stage that dropped a draw or an argument
// (pow's and atan2's second among them) from its digest would differ.
describe('the xoshiro stage digests the stream helpers on its seeded stream', () => {
  it("equals the digest of u32, float01, int, bool, normal, fuzzy and weighted draws from the stage's stream, recomputed", () => {
    for (const seed of SEEDS) {
      const s = crossHostStream('xoshiro', seed);
      const w = new CrossHostDigestWriter();
      for (let i = 0; i < 256; i += 1) w.u32(s.u32());
      for (let i = 0; i < 64; i += 1) w.f64(s.float01());
      for (let i = 0; i < 64; i += 1) w.f64(s.int(-1000, 1000));
      for (let i = 0; i < 64; i += 1) w.f64(s.int(0, 0xffffffff));
      for (let i = 0; i < 32; i += 1) w.u32(s.bool(0.3) ? 1 : 0);
      for (let i = 0; i < 32; i += 1) w.f64(s.normal());
      for (let i = 0; i < 32; i += 1) w.f64(s.fuzzy(0.25));
      for (let i = 0; i < 32; i += 1) w.u32(s.weighted([1, 2, 3, 0.5, 4]));
      expect(stage('xoshiro').run(seed, ctx())).toEqual({ model: w.hex(), records: null });
    }
  });
});

describe("the dmath stage digests the seven routines on seeded arguments", () => {
  // the stage's argument draw, restated: any bit pattern, a wide range, near zero, near multiples of π/4, huge, specials
  const view = new DataView(new ArrayBuffer(8));
  const draw = (s: Stream): number => {
    const k = s.int(0, 5);
    if (k === 0) {
      view.setUint32(0, s.u32(), true);
      view.setUint32(4, s.u32(), true);
      return view.getFloat64(0, true);
    }
    if (k === 1) return (s.float01() * 2 - 1) * 1000;
    if (k === 2) return (s.float01() * 2 - 1) * 1e-6;
    if (k === 3) return s.int(-64, 64) * 0.7853981633974483 + (s.float01() - 0.5) * 1e-9;
    if (k === 4) return (s.float01() * 2 - 1) * 1e300;
    const special = [0, -0, 1, -1, 0.5, 2, Infinity, -Infinity, NaN, 5e-324, -5e-324, 1.7976931348623157e308, 2.2250738585072014e-308];
    return special[s.int(0, special.length - 1)];
  };
  it('the routines in their order, pow and atan2 with two arguments', () => {
    expect(CROSSHOST_DMATH_ROUTINES.map(([n, a]) => `${n}/${String(a)}`)).toEqual(['pow/2', 'log/1', 'exp/1', 'sin/1', 'cos/1', 'atan2/2', 'atan/1']);
  });
  it('equals the digest of 256 (argument, result) pairs per routine from the stage’s stream, recomputed', () => {
    for (const seed of SEEDS) {
      const s = crossHostStream('dmath', seed);
      const w = new CrossHostDigestWriter();
      for (const name of ['pow', 'log', 'exp', 'sin', 'cos', 'atan2', 'atan'] as const) {
        for (let i = 0; i < 256; i += 1) {
          const a = draw(s);
          if (name === 'pow' || name === 'atan2') w.f64(a).f64(dmath[name](a, draw(s)));
          else w.f64(a).f64(dmath[name](a));
        }
      }
      expect(stage('dmath').run(seed, ctx())).toEqual({ model: w.hex(), records: null });
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
    // 'a' digests the carry's size BEFORE it writes, so a carry shared across seeds shows (hardening round S1, row 2)
    { id: 'a', run: (seed: number, c: { carry: Map<string, unknown> }) => { const size = c.carry.size; c.carry.set('a', seed); return { model: `${String(seed)}:${String(size)}`.padEnd(32, '0'), records: null }; } },
    { id: 'b', run: (seed: number, c: { carry: Map<string, unknown> }) => ({ model: String(c.carry.get('a')).padEnd(32, '1'), records: 'r'.padEnd(32, '0') }) },
    { id: 'x', run: () => { throw new TypeError('no'); } },
  ];
  const job = (over: Partial<CrossHostJob> = {}): CrossHostJob => ({ fixture: 't', seeds: [5, 6], stages: ['a', 'b', 'u', 'x'], inputs: {}, timing: false, ...over });

  it('runs the unseeded stages first, once, then each seed’s stages in list order with a fresh carry', () => {
    const r = runCrossHostJob(table, job(), 'main');
    expect(r.thread).toBe('main');
    expect(r.cells.map((c) => `${c.stage}@${String(c.seed)}`)).toEqual(['u@null', 'a@5', 'b@5', 'x@5', 'a@6', 'b@6', 'x@6']);
    expect(r.cells[2].model).toBe('5'.padEnd(32, '1'));
    // every seed's first stage finds an empty carry: one fresh map per seed, never one shared across seeds
    expect(r.cells.filter((c) => c.stage === 'a').map((c) => c.model)).toEqual(['5:0'.padEnd(32, '0'), '6:0'.padEnd(32, '0')]);
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

describe("the lanes stage carries M0-d-02's four lane kinds", () => {
  it('its streams hold u32, i32, f64 (−0, ±∞, subnormals among them) and UTF-8 (astral code points among them) ops', () => {
    const kinds = new Set<string>();
    let negZero = false;
    let infinite = false;
    let astral = false;
    for (const seed of SEEDS) {
      const streams = crossHostLaneStreams(seed);
      expect(streams.length).toBe(64);
      for (const ops of streams) {
        expect(ops.length).toBeGreaterThanOrEqual(1);
        for (const op of ops) {
          kinds.add(op[0]);
          if (op[0] === 'f64' && Object.is(op[1], -0)) negZero = true;
          if (op[0] === 'f64' && !Number.isFinite(op[1])) infinite = true;
          if (op[0] === 'utf8' && [...op[1]].some((c) => (c.codePointAt(0) ?? 0) > 0xffff)) astral = true;
        }
      }
    }
    expect(kinds).toEqual(new Set(['u32', 'i32', 'f64', 'utf8']));
    expect(infinite && astral).toBe(true);
    expect(negZero).toBe(true);
  });
  it('equals the digest of each stream’s lane count and H128 by LaneWriter, recomputed', () => {
    for (const seed of SEEDS) {
      const w = new CrossHostDigestWriter();
      for (const ops of crossHostLaneStreams(seed)) {
        const lw = new LaneWriter();
        for (const [k, v] of ops) {
          if (k === 'u32') lw.u32(v);
          else if (k === 'i32') lw.i32(v);
          else if (k === 'f64') lw.f64(v);
          else lw.utf8(v);
        }
        w.u32(lw.lanes);
        for (const h of lw.digest()) w.u32(h);
      }
      expect(stage('lanes').run(seed, ctx())).toEqual({ model: w.hex(), records: null });
    }
  });
});
