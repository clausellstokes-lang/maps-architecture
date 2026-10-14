// M0-c-03 on the CITY flat fixture (§16 M0 (c); §4.3; §13.2): S3's gate routes committed by S4 as one graph — roads
// leaving the walled stage = N, every route through its gate, the spine-separation test, one smoothing and one insertion
// (no braided near-duplicate: W_STRETCH_SHARED = 0), the junction rules, the width knots, the records. Every check reads
// the committed arena through its own tables (./support.ts), never through the code under test.
import { describe, expect, it } from 'vitest';
import { tableView } from '@plat/tables';
import type { ChainProfile } from '@plat/model';
import type { LatticePoint } from '@plat/kernel';
import type { NodeRef, Way } from '@plat/model';
import { cityRun, edgesOf, edgesWith, GROUND, incidentEdgeRows, insideRing, key, segDist, angleDeg, verticesWith, wayEdges, wayLine, vertexRows, runSite, type Run } from './support.js';
import { flatFixture } from '../../src/index.js';

// Seed 5 holds three-arm junctions whose widest pair of arms is under THROUGH_MIN_CDEG (no through line), so the
// junction-kind check holds the Y guard there (C-0239: the through line is the widest pair of arms ≥ THROUGH_MIN_CDEG).
const SEEDS = [1, 2, 3, 5];
const WAYS = tableView().table('ways');
const SPACING_CM = tableView().table('lattice').num('route', 'spacingM') * 100;

/** The seeds whose fixture has a way that changes class (a width profile): the knot and class checks bite there. */
const PROFILE_SEEDS = new Set([1, 3]);
/** The seeds whose fixture has a three-arm junction with no pair of arms ≥ 150° apart (Y by the guard, never T). */
const NO_THROUGH_SEEDS = new Set([5]);
/** The classes, highest first (§4.3's class order; written here). */
const CLASS_ORDER = ['through', 'primary', 'secondary', 'track', 'path'];

/** A compass bearing (cdeg clockwise from +y, [0, 36 000)), written here. */
function compassCdeg(dx: number, dy: number): number {
  const b = (Math.atan2(dx, dy) * 18_000) / Math.PI;
  return b < 0 ? b + 36_000 : b;
}

/** The unsigned gap of two bearings (cdeg). */
function bearingGap(a: number, b: number): number {
  const d = Math.abs(a - b) % 36_000;
  return d > 18_000 ? 36_000 - d : d;
}

/** The S3 gate (its point and bearing) of a main gate's id. */
function sliceGate(run: Run, id: string): { at: LatticePoint; bearingCdeg: number } {
  const mains = run.commit.gates.filter((g) => g.kind === 'main');
  const i = mains.findIndex((g) => g.id === id);
  expect(i).toBeGreaterThanOrEqual(0);
  return run.slice.gates[i];
}

/** The point a way end names, where the arena or the slice fixes one (a gate, a junction); else null. */
function refPoint(run: Run, ref: NodeRef): LatticePoint | null {
  if (ref.kind === 'gate') return sliceGate(run, ref.id).at;
  if (ref.kind === 'junction') return verticesWith(run.plat, 'junction', ref.id)[0] ?? null;
  return null;
}

/** A way's chains in way order (from its `from` end), each with its class, width and its two end points in that order. */
function chainsInWayOrder(run: Run, w: Way): { i: number; cls: string; width: number; a: LatticePoint; b: LatticePoint }[] {
  const mine = run.s4.chainWay.map((id, i) => ({ id, i })).filter((x) => x.id === w.id).map((x) => x.i);
  const endsOf = (i: number): [LatticePoint, LatticePoint] => [run.s4.spines[i][0], run.s4.spines[i][run.s4.spines[i].length - 1]];
  const count = new Map<string, number>();
  for (const i of mine) for (const p of endsOf(i)) count.set(key(p), (count.get(key(p)) ?? 0) + 1);
  const pathEnds = mine.flatMap((i) => endsOf(i)).filter((p) => count.get(key(p)) === 1);
  expect(pathEnds, `${w.id}'s chains form one open path`).toHaveLength(2);
  const from = refPoint(run, w.from);
  const to = refPoint(run, w.to);
  let start: LatticePoint;
  if (from !== null && pathEnds.some((p) => key(p) === key(from))) start = from;
  else if (to !== null && pathEnds.some((p) => key(p) === key(to))) start = pathEnds.find((p) => key(p) !== key(to)) as LatticePoint;
  else throw new Error(`${w.id}: neither end fixes the way's direction`);
  const out: { i: number; cls: string; width: number; a: LatticePoint; b: LatticePoint }[] = [];
  const left = new Set(mine);
  let at = start;
  while (left.size > 0) {
    const i = [...left].find((c) => endsOf(c).some((p) => key(p) === key(at)));
    expect(i, `${w.id}: a chain continues from ${key(at)}`).toBeDefined();
    const [p, q] = endsOf(i as number);
    const [a, b] = key(p) === key(at) ? [p, q] : [q, p];
    out.push({ i: i as number, cls: run.s4.classes[i as number].class, width: run.s4.classes[i as number].widthCm, a, b });
    left.delete(i as number);
    at = b;
  }
  return out;
}

/**
 * §13.2's measure (C-0236 (17)): the longest run along one way's spine — walked in the way's own order (`wayLine`),
 * sampled every metre — closer than the pair's separation to another way, a point within the separation of a vertex the
 * two share or of the other way's chain ends (its junctions) being the junction's own.
 */
function worstParallelRun(ways: ReadonlyMap<string, [LatticePoint, LatticePoint][]>, sepOf: (a: string, b: string) => number): number {
  const ids = [...ways.keys()];
  const deg = new Map<string, number>();
  for (const id of ids) for (const [a, b] of ways.get(id) ?? []) for (const p of [a, b]) deg.set(key(p), (deg.get(key(p)) ?? 0) + 1);
  let worst = 0;
  for (const A of ids) {
    const line = wayLine(ways.get(A) ?? []);
    for (const B of ids) {
      if (A === B) continue;
      const sep = sepOf(A, B);
      const va = new Set(line.map((p) => key(p)));
      const eb = ways.get(B) ?? [];
      const excl = eb.flatMap(([a, b]) => [a, b]).filter((p) => va.has(key(p)) || deg.get(key(p)) !== 2);
      let runLen = 0;
      for (let i = 0; i + 1 < line.length; i += 1) {
        const a = line[i];
        const b = line[i + 1];
        const l = Math.hypot(b.x - a.x, b.y - a.y);
        const steps = Math.max(1, Math.ceil(l / 100));
        for (let s = 0; s < steps; s += 1) {
          const p = { x: a.x + ((b.x - a.x) * s) / steps, y: a.y + ((b.y - a.y) * s) / steps };
          const near = excl.some((q) => Math.hypot(q.x - p.x, q.y - p.y) < sep);
          let d = Infinity;
          for (const [c, e] of eb) d = Math.min(d, segDist(p, c, e));
          if (!near && d < sep) {
            runLen += l / steps;
            worst = Math.max(worst, runLen);
          } else runLen = 0;
        }
      }
    }
  }
  return worst;
}

describe("§13.2's measure walks each way in its own order (the hardening note 8)", () => {
  it('a run is summed along the way, whatever order the arena lists its edges in', () => {
    // A runs east 0 → 30 m; B lies 1 m north of A's first and last 10 m only. In way order the two near runs are 10 m
    // each, split by the far middle; listed first, last, middle, a walk in list order would join them into one of 20 m.
    const p = (x: number, y: number): LatticePoint => ({ x, y }) as LatticePoint;
    const A: [LatticePoint, LatticePoint][] = [
      [p(0, 0), p(1000, 0)],
      [p(2000, 0), p(3000, 0)],
      [p(1000, 0), p(2000, 0)],
    ];
    const B: [LatticePoint, LatticePoint][] = [
      [p(0, 100), p(1000, 100)],
      [p(1000, 100), p(1000, 5000)],
      [p(1000, 5000), p(2000, 5000)],
      [p(2000, 5000), p(2000, 100)],
      [p(2000, 100), p(3000, 100)],
    ];
    const ways = new Map([
      ['way:A', A],
      ['way:B', B],
    ]);
    // The separation 2 m; B's ends (its junctions) far from the runs: only its turns at (1 000, 100) and (2 000, 100)
    // are excluded, within 2 m of the runs' inner ends.
    const worst = worstParallelRun(ways, () => 200);
    expect(worst).toBeGreaterThan(700);
    expect(worst).toBeLessThanOrEqual(1000);
  });
});

describe('S4 on the CITY flat fixture (§4.3; §16 M0 (c))', { timeout: 120_000 }, () => {
  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: roads leaving the walled stage = N, each route committed through its gate (§13.2; §4.3 *Routes*)`, () => {
      const run = cityRun(seed);
      const mains = run.commit.gates.filter((g) => g.kind === 'main');
      const n = mains.length;
      expect(n).toBe(run.slice.gates.length);
      expect(n).toBeGreaterThanOrEqual(3);
      // The vertices a way edge and a wall edge share: exactly the main gates' points.
      const wall = new Set<string>();
      for (const e of edgesWith(run.plat, 'wall')) {
        wall.add(key(e.a));
        wall.add(key(e.b));
      }
      const meet = new Set<string>();
      for (const e of edgesWith(run.plat, 'way')) for (const p of [e.a, e.b]) if (wall.has(key(p))) meet.add(key(p));
      expect([...meet].sort()).toEqual(run.slice.gates.map((g) => key(g.at)).sort());
      const line = run.commit.traced.line;
      run.slice.gates.forEach((g, i) => {
        // Two way edges at each gate: the street in (inside the wall) and the road out (outside it).
        const rows = incidentEdgeRows(run.plat, g.at).filter((rs) => rs.some((r) => r.role === 'way'));
        expect(rows).toHaveLength(2);
        const gate = run.s4.gates.find((x) => x.id === mains[i].id);
        expect(gate?.way).not.toBeNull();
        const out = run.s4.network.ways.find((w) => w.id === gate?.way);
        expect(out?.class).toBe('through');
        expect(out?.from).toEqual({ kind: 'gate', id: mains[i].id });
        // The junction at the gate carries the gate's junction row; Gate.junction names it.
        expect(vertexRows(run.plat, g.at).some((r) => r.role === 'junction' && r.entity === gate?.junction)).toBe(true);
      });
      // Every way edge lies on one side of the wall: inward ways inside, outward ways outside.
      const ways = wayEdges(run.plat);
      let outward = 0;
      for (const w of run.s4.network.ways) {
        const es = ways.get(w.id) ?? [];
        expect(es.length).toBeGreaterThan(0);
        const sides = new Set(es.map(([a, b]) => insideRing(line, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })));
        expect(sides.size).toBe(1);
        if (!sides.has(true) && w.from.kind === 'gate') outward += 1;
      }
      expect(outward).toBe(n);
      expect(run.s4.report.offGate).toBe(0);
    });

    it(`seed ${String(seed)}: no way crosses a wall strip's setback line — each keeps to its gate's corridor (C-0226 (10), C-0236 (5))`, () => {
      const run = cityRun(seed);
      const setback = new Set<string>();
      for (const e of edgesWith(run.plat, 'setback')) {
        setback.add(key(e.a));
        setback.add(key(e.b));
      }
      expect(setback.size).toBeGreaterThan(0);
      for (const e of edgesWith(run.plat, 'way')) for (const p of [e.a, e.b]) expect(setback.has(key(p)), `way vertex ${key(p)} on a setback line`).toBe(false);
      // The corridor's centreline is held: the route's lattice nodes within four of the gate edge are way vertices.
      const wayV = new Set<string>();
      for (const e of edgesWith(run.plat, 'way')) {
        wayV.add(key(e.a));
        wayV.add(key(e.b));
      }
      for (const g of run.slice.gates) {
        const r = run.slice.routes.find((q) => q.ordinal === g.ordinal);
        if (r === undefined) continue;
        for (const v of r.nodes.slice(Math.max(1, g.routeIndex - 4), g.routeIndex + 6)) expect(wayV.has(key(run.slice.lattice.points[v])), `node ${String(v)} near gate ${String(g.ordinal)}`).toBe(true);
      }
    });

    it(`seed ${String(seed)}: through-roads run to the frame's edge with their bearings (§4.3 *Result*)`, () => {
      const run = cityRun(seed);
      const border = new Set<string>();
      for (const e of edgesWith(run.plat, 'border')) {
        border.add(key(e.a));
        border.add(key(e.b));
      }
      const ways = wayEdges(run.plat);
      const ends = run.s4.network.ways.filter((w) => w.to.kind === 'bearing');
      expect(ends.length).toBe(run.slice.gates.length - run.s4.network.ways.filter((w) => w.from.kind === 'gate' && w.to.kind === 'junction').length);
      for (const w of ends) {
        const pl = wayLine(ways.get(w.id) ?? []);
        const end = [pl[0], pl[pl.length - 1]].find((p) => border.has(key(p)));
        expect(end, `${w.id} ends on the border`).toBeDefined();
        // Its bearing (C-0236 (18)): the compass bearing from its gate to that frame end (whole cdeg), and so within 2°
        // of the gate's own S3 bearing (the through-road runs on along its route's last edge).
        expect(w.from.kind).toBe('gate');
        if (w.from.kind !== 'gate' || w.to.kind !== 'bearing' || end === undefined) continue;
        const g = sliceGate(run, w.from.id);
        expect(bearingGap(w.to.bearingCdeg, compassCdeg(end.x - g.at.x, end.y - g.at.y)), `${w.id}'s bearing`).toBeLessThanOrEqual(1);
        expect(bearingGap(w.to.bearingCdeg, g.bearingCdeg), `${w.id}'s bearing against its gate's`).toBeLessThanOrEqual(200);
      }
    });

    it(`seed ${String(seed)}: §13.2 — no two spines run closer than their class separation for more than one step length`, () => {
      const run = cityRun(seed);
      const cls = new Map(run.s4.network.ways.map((w) => [w.id, w.class]));
      const sep = (a: string, b: string): number => Math.max(WAYS.num(cls.get(a) as string, 'separationM'), WAYS.num(cls.get(b) as string, 'separationM')) * 100;
      expect(worstParallelRun(wayEdges(run.plat), sep)).toBeLessThanOrEqual(SPACING_CM);
    });

    it(`seed ${String(seed)}: smoothed once and inserted once — no braided near-duplicates (W_STRETCH_SHARED = 0, one way row per edge)`, () => {
      const run = cityRun(seed);
      expect(run.s4.report.stretchShared).toBe(0);
      for (const e of edgesWith(run.plat, 'way')) expect(e.rows.filter((r) => r.role === 'way')).toHaveLength(1);
      // One spine chain per graph chain: every chain's way holds it, and the way edges cover the spines.
      expect(run.s4.chainWay).toHaveLength(run.s4.graph.chains.length);
      expect(run.s4.report.unsmoothed).toBe(0);
    });

    it(`seed ${String(seed)}: junctions — none closer than 8 m unmerged, every crossing angle at least 30° (§4.3 *Junction rules*)`, () => {
      const run = cityRun(seed);
      const merge = WAYS.num('graph', 'junctionMergeM') * 100;
      const js = run.s4.network.junctions.map((j) => ({ j, at: verticesWith(run.plat, 'junction', j.id) }));
      for (const { at } of js) expect(at).toHaveLength(1);
      const apart = run.s4.report.keptApart.map((x) => [key(x.a), key(x.b)].sort().join('|'));
      for (let i = 0; i < js.length; i += 1) {
        for (let k = i + 1; k < js.length; k += 1) {
          const a = js[i].at[0];
          const b = js[k].at[0];
          if (Math.hypot(a.x - b.x, a.y - b.y) < merge) expect(apart).toContain([key(a), key(b)].sort().join('|'));
        }
      }
      // At every vertex where three or more way edges meet, adjacent arms are ≥ 30° apart.
      const minCrossing = WAYS.num('graph', 'minCrossingCdeg') / 100;
      const arms = new Map<string, { x: number; y: number }[]>();
      for (const e of edgesWith(run.plat, 'way')) {
        for (const [p, q] of [
          [e.a, e.b],
          [e.b, e.a],
        ] as const) {
          const l = arms.get(key(p)) ?? [];
          l.push({ x: q.x - p.x, y: q.y - p.y });
          arms.set(key(p), l);
        }
      }
      let junctions3 = 0;
      for (const [, ds] of arms) {
        if (ds.length < 3) continue;
        junctions3 += 1;
        const sorted = ds.slice().sort((u, v) => Math.atan2(u.y, u.x) - Math.atan2(v.y, v.x));
        for (let i = 0; i < sorted.length; i += 1) expect(angleDeg(sorted[i], sorted[(i + 1) % sorted.length])).toBeGreaterThanOrEqual(minCrossing - 0.5);
      }
      expect(junctions3).toBe(run.s4.network.junctions.filter((j) => ['T', 'X', 'Y'].includes(j.kind)).length);
      // Each three-arm junction's kind from its committed arms (C-0236 (11), C-0239): T where the branch leaves the
      // through line — the widest pair, at least 150° apart, along the difference of its unit directions — at 75°–105°.
      const kinds: Record<string, number> = {};
      let noThrough = 0;
      for (const j of run.s4.network.junctions) {
        if (j.kind !== 'T' && j.kind !== 'Y') continue;
        const at = verticesWith(run.plat, 'junction', j.id)[0];
        const ds = arms.get(key(at)) ?? [];
        expect(ds, `${j.id}'s arms`).toHaveLength(3);
        const pairs = [
          [0, 1],
          [0, 2],
          [1, 2],
        ] as const;
        const gaps = pairs.map(([a, b]) => angleDeg(ds[a], ds[b]));
        const widest = Math.max(...gaps);
        if (widest < 150) noThrough += 1;
        let want = 'Y';
        pairs.forEach(([a, b], p) => {
          if (gaps[p] !== widest || widest < 150) return;
          const ua = Math.hypot(ds[a].x, ds[a].y);
          const ub = Math.hypot(ds[b].x, ds[b].y);
          const off = angleDeg(ds[3 - a - b], { x: ds[a].x / ua - ds[b].x / ub, y: ds[a].y / ua - ds[b].y / ub });
          if (off >= 75 && off <= 105) want = 'T';
        });
        expect(j.kind, `${j.id}'s kind`).toBe(want);
        kinds[j.kind] = (kinds[j.kind] ?? 0) + 1;
      }
      // Seed 1 has both kinds (two T, one Y), so the rule is held both ways.
      if (seed === 1) expect(kinds).toEqual({ T: 2, Y: 1 });
      // The no-through-line case is met, so the guard (Y below 150°, whatever the branch's angle) is held.
      if (NO_THROUGH_SEEDS.has(seed)) expect(noThrough, 'three-arm junctions with no through pair').toBeGreaterThan(0);
    });

    it(`seed ${String(seed)}: width_knot rows at every class change and nowhere else; the widths are ways.widths cells (§4.3, §2.2 rule 5)`, () => {
      const run = cityRun(seed);
      const band = (c: string): [number, number] => WAYS.pair(c, 'widthM.CITY').map((v) => v * 100) as [number, number];
      let knots = 0;
      let profiles = 0;
      for (const w of run.s4.network.ways) {
        // The way's class is the highest of its chains' (C-0236 (10)).
        const inOrder = chainsInWayOrder(run, w);
        const top = CLASS_ORDER[Math.min(...inOrder.map((c) => CLASS_ORDER.indexOf(c.cls)))];
        expect(w.class, `${w.id}'s class`).toBe(top);
        // The way's chains in order, and its class runs.
        const chains = run.s4.chainWay.map((id, i) => ({ id, i })).filter((x) => x.id === w.id);
        const classes = chains.map((x) => run.s4.classes[x.i].class);
        const changes = new Set(classes).size > 1;
        if (typeof w.width === 'number') {
          expect(changes).toBe(false);
          const [lo, hi] = band(w.class);
          expect(w.width).toBeGreaterThanOrEqual(lo);
          expect(w.width).toBeLessThanOrEqual(hi);
          // One class run: its width is its widest chain's (C-0236 (10)).
          expect(w.width, `${w.id}'s width: its widest chain's`).toBe(Math.max(...inOrder.map((c) => c.width)));
          expect(verticesWith(run.plat, 'width_knot', w.id)).toHaveLength(0);
          continue;
        }
        const prof = w.width as ChainProfile<number>;
        profiles += 1;
        expect(prof.knotRole).toBe('width_knot');
        expect(prof.values.length % 2).toBe(0);
        // In way order, the class runs (each at its widest chain's width) and the vertex each run ends at: knot pair r
        // stands on the vertex the run r's last chain and run r + 1's first chain share, its values those two widths.
        const runs: { cls: string; width: number; end: LatticePoint }[] = [];
        for (const c of inOrder) {
          const last = runs[runs.length - 1];
          if (last !== undefined && last.cls === c.cls) {
            last.width = Math.max(last.width, c.width);
            last.end = c.b;
          } else runs.push({ cls: c.cls, width: c.width, end: c.b });
        }
        expect(runs.length).toBeGreaterThan(1);
        expect(prof.values).toEqual(runs.slice(0, -1).flatMap((r, i) => [r.width, runs[i + 1].width]));
        for (let r = 0; r + 1 < runs.length; r += 1) {
          expect(verticesWith(run.plat, 'width_knot', w.id, 2 * r), `${w.id}'s knot pair ${String(r)}`).toEqual([runs[r].end]);
          expect(verticesWith(run.plat, 'width_knot', w.id, 2 * r + 1)).toEqual([runs[r].end]);
        }
        for (let i = 0; i < prof.values.length; i += 2) {
          // A knot pair at one vertex: the run before, the run after, in two different class bands.
          const at0 = verticesWith(run.plat, 'width_knot', w.id, i);
          const at1 = verticesWith(run.plat, 'width_knot', w.id, i + 1);
          expect(at0).toHaveLength(1);
          expect(at0).toEqual(at1);
          const inBand = (v: number): string[] => ['through', 'primary', 'secondary'].filter((c) => v >= band(c)[0] && v <= band(c)[1]);
          expect(inBand(prof.values[i]).length).toBeGreaterThan(0);
          expect(inBand(prof.values[i + 1]).length).toBeGreaterThan(0);
          expect(prof.values[i]).not.toBe(prof.values[i + 1]);
          // The knot vertex is a junction: the class changes where chains meet.
          expect(vertexRows(run.plat, at0[0]).some((r) => r.role === 'junction')).toBe(true);
          knots += 2;
        }
        // The sampled profile: a step at each knot pair (the kernel's sampleProfile over the spine).
        const samples = run.k.geom.sampleProfile(prof, w.id, GROUND, 'perVertex') as number[];
        expect(samples.length).toBeGreaterThan(2);
        for (const s of samples) expect(prof.values).toContain(s);
      }
      if (PROFILE_SEEDS.has(seed)) expect(profiles).toBeGreaterThan(0);
      // Nowhere else: the arena holds exactly these knot rows.
      let rows = 0;
      for (const w of run.s4.network.ways) rows += verticesWith(run.plat, 'width_knot', w.id).length;
      let pairs = 0;
      for (const w of run.s4.network.ways) if (typeof w.width !== 'number') pairs += (w.width as ChainProfile<number>).values.length / 2;
      expect(rows).toBe(pairs);
      expect(knots).toBe(2 * pairs);
    });

    it(`seed ${String(seed)}: the Way and Junction records (§2.4) — spines resolve, ends name their entities, destination order`, () => {
      const run = cityRun(seed);
      const ways = run.s4.network.ways;
      ways.forEach((w, i) => {
        expect(w.id).toBe(`way:${String(i)}`);
        expect(w.spine).toEqual({ role: 'way', entity: w.id });
        const r = run.k.resolve(w.spine, GROUND);
        expect(r.view).not.toBe('empty');
        expect(w.provisional).toBe(false);
        expect(w.lifecycle.existence).toBe('generated');
        for (const end of [w.from, w.to]) {
          if (end.kind === 'junction') expect(run.s4.network.junctions.some((j) => j.id === end.id)).toBe(true);
          if (end.kind === 'gate') expect(run.commit.gates.some((g) => g.id === end.id)).toBe(true);
          if (end.kind === 'plaza') expect(end.id).toBe(run.commit.plaza.id);
        }
      });
      // Destination order: the first way is the street in from the plaza to the lowest gate.
      const first = [...run.slice.gates].sort((a, b) => a.ordinal - b.ordinal)[0];
      const firstGate = run.commit.gates[run.slice.gates.indexOf(first)];
      expect(ways[0].from).toEqual({ kind: 'plaza', id: run.commit.plaza.id });
      expect(ways[0].to).toEqual({ kind: 'gate', id: firstGate.id });
      for (const j of run.s4.network.junctions) {
        const r = run.k.resolve(j.vertex, GROUND);
        expect(r.view).toBe('vertices');
        if (r.view === 'vertices') expect(r.vertices).toHaveLength(1);
        for (const a of j.arms) expect(ways.some((w) => w.id === a)).toBe(true);
        expect(j.arms.length).toBeGreaterThan(0);
        // The arms in one canonical order: their ids by UTF-16 code units (the kernel's `compareKeys`).
        expect(j.arms).toEqual([...j.arms].sort());
      }
      // Every edge carrying a way row lies on a way the records name.
      const named = new Set(ways.map((w) => w.id));
      for (const e of edgesOf(run.plat)) for (const r of e.rows) if (r.role === 'way') expect(named.has(r.entity)).toBe(true);
    });
  }

  it('is deterministic: a second run of a seed commits the same spines and records', () => {
    const a = cityRun(2);
    const b = runSite(flatFixture(2));
    expect(b.s4.spines).toEqual(a.s4.spines);
    expect(JSON.stringify(b.s4.network)).toBe(JSON.stringify(a.s4.network));
    const edges = (p: typeof a.plat): string[] => edgesWith(p, 'way').map((e) => `${key(e.a)}>${key(e.b)}:${e.rows.map((r) => r.entity).join()}`).sort();
    expect(edges(b.plat)).toEqual(edges(a.plat));
  });
});
