// M0-c-03 on the CITY flat fixture (§16 M0 (c); §4.3; §13.2): S3's gate routes committed by S4 as one graph — roads
// leaving the walled stage = N, every route through its gate, the spine-separation test, one smoothing and one insertion
// (no braided near-duplicate: W_STRETCH_SHARED = 0), the junction rules, the width knots, the records. Every check reads
// the committed arena through its own tables (./support.ts), never through the code under test.
import { describe, expect, it } from 'vitest';
import { tableView } from '@plat/tables';
import type { ChainProfile } from '@plat/model';
import { cityRun, edgesOf, edgesWith, GROUND, incidentEdgeRows, insideRing, segDist, angleDeg, verticesWith, wayEdges, wayLine, vertexRows, runSite } from './support.js';
import { flatFixture } from '../../src/index.js';

const SEEDS = [1, 2, 3];
const WAYS = tableView().table('ways');
const SPACING_CM = tableView().table('lattice').num('route', 'spacingM') * 100;

const key = (p: { x: number; y: number }): string => `${String(p.x)},${String(p.y)}`;

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
      }
    });

    it(`seed ${String(seed)}: §13.2 — no two spines run closer than their class separation for more than one step length`, () => {
      const run = cityRun(seed);
      const ways = wayEdges(run.plat);
      const cls = new Map(run.s4.network.ways.map((w) => [w.id, w.class]));
      const ids = [...ways.keys()];
      const deg = new Map<string, number>();
      for (const id of ids) for (const [a, b] of ways.get(id) ?? []) for (const p of [a, b]) deg.set(key(p), (deg.get(key(p)) ?? 0) + 1);
      let worst = 0;
      for (const A of ids) {
        for (const B of ids) {
          if (A === B) continue;
          const sep = Math.max(WAYS.num(cls.get(A) as string, 'separationM'), WAYS.num(cls.get(B) as string, 'separationM')) * 100;
          const va = new Set((ways.get(A) ?? []).flatMap(([a, b]) => [key(a), key(b)]));
          const eb = ways.get(B) ?? [];
          // Points within the separation of a vertex the two share, or of B's ends, are the junction's own.
          const excl = eb.flatMap(([a, b]) => [a, b]).filter((p) => va.has(key(p)) || deg.get(key(p)) !== 2);
          let runLen = 0;
          for (const [a, b] of ways.get(A) ?? []) {
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
      expect(worst).toBeLessThanOrEqual(SPACING_CM);
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
    });

    it(`seed ${String(seed)}: width_knot rows at every class change and nowhere else; the widths are ways.widths cells (§4.3, §2.2 rule 5)`, () => {
      const run = cityRun(seed);
      const band = (c: string): [number, number] => WAYS.pair(c, 'widthM.CITY').map((v) => v * 100) as [number, number];
      let knots = 0;
      for (const w of run.s4.network.ways) {
        // The way's chains in order, and its class runs.
        const chains = run.s4.chainWay.map((id, i) => ({ id, i })).filter((x) => x.id === w.id);
        const classes = chains.map((x) => run.s4.classes[x.i].class);
        const changes = new Set(classes).size > 1;
        if (typeof w.width === 'number') {
          expect(changes).toBe(false);
          const [lo, hi] = band(w.class);
          expect(w.width).toBeGreaterThanOrEqual(lo);
          expect(w.width).toBeLessThanOrEqual(hi);
          expect(verticesWith(run.plat, 'width_knot', w.id)).toHaveLength(0);
          continue;
        }
        const prof = w.width as ChainProfile<number>;
        expect(prof.knotRole).toBe('width_knot');
        expect(prof.values.length % 2).toBe(0);
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
