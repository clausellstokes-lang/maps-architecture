// M0-e-03's S1 L0 batch as a Stage (§4.1's S1 row; §4.2 S1 (5), (8), (9); §2.7's Bridge in state site; §3.10's
// stored-reference row at stage end), run under a hand-built StageContext over the kernel's façade — never through
// @plat/layout's runner, which @plat/site cannot import (§14; C-0123) — on river fixtures S1 (1) and S1 (3) build.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkStageEnd, isVertexLive, outgoing, rowKey, rowsOn, STAGES, VERTEX_PINNED, type Kernel, type Plat } from '@plat/kernel';
import type { Bridge, GeomRef, WaterBody } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { cellAt } from '../../src/hydro/index.js';
import { GROUND_KEY } from '../../src/terrain/index.js';
import { leftFaces, runS1, s1Stage, type S1Input, type S1Output } from '../../src/water/index.js';
import { ground, riverFixture, type RiverFixture } from './support.js';

/** A 100 ha CITY frame with a river, a tributary and the basic estuary (seed 2: two fords, three bridge sites …). */
function fixture(seed = 2): RiverFixture {
  return riverFixture(seed, { relief: 'rolling' }, { tributaries: [{}], mouth: 'estuary' }, { areaHa: 100 });
}

/** The fixture run through S1's L0 batch on a fresh ground arena; the façade wrapped to record each insertChain. */
function run(fx: RiverFixture): { out: S1Output; plat: Plat; kernel: Kernel; calls: { rows: string[]; closed: boolean; version: number; l0Faces: number }[] } {
  const g = ground(fx.frame);
  const calls: { rows: string[]; closed: boolean; version: number; l0Faces: number }[] = [];
  const geom = {
    ...g.kernel.geom,
    insertChain: ((o, pts, rows, cls, opts) => {
      calls.push({ rows: rows.map((r) => `${r.role} ${r.entity}`), closed: opts?.closed === true, version: g.plat.version, l0Faces: new Set(leftFaces(o.plat).values()).size });
      return g.kernel.geom.insertChain(o, pts, rows, cls, opts);
    }) as Kernel['geom']['insertChain'],
  };
  const kernel: Kernel = { ...g.kernel, geom };
  const input: S1Input = { terrain: fx.terrain, water: fx.water, kernel, mouth: 'estuary' };
  const r = runS1(input, fx.ctx);
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return { out: r.value, plat: g.plat, kernel: g.kernel, calls };
}

/** The rows on the edges at a vertex, as texts. */
function rowsAt(p: Plat, v: number): string[] {
  const out = new Set<string>();
  for (const h of outgoing(p, v)) for (const r of rowsOn(p, 'edge', h)) out.add(`${rowKey(p, r).role} ${rowKey(p, r).entity}`);
  return [...out].sort();
}

/** The flow at the course point nearest q: the unit chord from one width upstream to one width downstream. */
function flowNear(body: WaterBody, q: { x: number; y: number }): { x: number; y: number } {
  const c = body.course ?? [];
  const w = body.widthProfile ?? new Int32Array();
  let best = 0;
  let bd = Infinity;
  c.forEach((p, i) => {
    const d = Math.hypot(p.x - q.x, p.y - q.y);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  const arcs = [0];
  for (let i = 1; i < c.length; i += 1) arcs.push(arcs[i - 1] + Math.hypot(c[i].x - c[i - 1].x, c[i].y - c[i - 1].y));
  const at = (s: number): { x: number; y: number } => {
    let i = 1;
    while (i < c.length - 1 && arcs[i] < s) i += 1;
    const t = Math.min(1, Math.max(0, (s - arcs[i - 1]) / (arcs[i] - arcs[i - 1])));
    return { x: c[i - 1].x + (c[i].x - c[i - 1].x) * t, y: c[i - 1].y + (c[i].y - c[i - 1].y) * t };
  };
  const a = at(arcs[best] - w[best]);
  const b = at(arcs[best] + w[best]);
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  return { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
}

describe('§4.1\'s S1 row under a hand-built StageContext (C-0123)', () => {
  it('the outer ring is the first L0 chain, committed alone: every L0 face has a boundary before any water exists', () => {
    const { calls } = run(fixture());
    expect(calls[0]).toEqual({ rows: ['margin terrain:ground'], closed: true, version: 0, l0Faces: 0 });
    // every later chain is a shore, inserted in the next batch (the ring's committed), when L0 holds the ring's one face
    expect(calls.length).toBeGreaterThan(1);
    for (const c of calls.slice(1)) {
      expect(c.rows).toHaveLength(1);
      expect(c.rows[0]).toMatch(/^shore water:/);
      expect(c.closed).toBe(true);
      expect(c.version).toBe(1);
    }
    expect(calls[1].l0Faces).toBe(1);
  });

  it('every water face carries its shore (and bank on a river); every L0 face assigned — to a body or a land component', () => {
    const { out, kernel, plat } = run(fixture());
    const view = kernel.view(GROUND_KEY, 0);
    const bodies = new Set(out.water.bodies.map((b) => b.id));
    const lands = new Set(out.land.map((c) => c.id));
    expect(out.water.bodies.map((b) => b.kind)).toEqual(['river', 'estuary', 'tributary']);
    for (const f of view.faces()) {
      const owner = view.owner(f) ?? '';
      expect(bodies.has(owner) || lands.has(owner)).toBe(true);
    }
    // each body's FaceRef resolves to faces whose boundary carries its shore, its land-facing edges its bank
    const left = leftFaces(plat);
    for (const b of out.water.bodies) {
      const r = kernel.resolve(b.face, GROUND_KEY);
      expect(r.view === 'faces' && r.faces.length).toBeGreaterThan(0);
      const sh = kernel.resolve(b.shore, GROUND_KEY);
      expect(sh.view === 'edges' && sh.runs.length).toBeGreaterThan(0);
      if (sh.view !== 'edges') continue;
      let banks = 0;
      for (const run of sh.runs) {
        for (const h of run) {
          const rows = rowsOn(plat, 'edge', h).map((q) => `${rowKey(plat, q).role} ${rowKey(plat, q).entity}`);
          const sides = [left.get(h), left.get(h ^ 1)].map((f) => (f === undefined ? '' : (view.owner(f) ?? '')));
          const landSide = sides.some((s) => lands.has(s));
          expect(rows.includes(`bank ${b.id}`)).toBe(landSide);
          if (landSide) banks += 1;
        }
      }
      expect(banks).toBeGreaterThan(0);
    }
    // the land components are one per connected region: no two share an edge
    for (const [h, f] of left) {
      const g = left.get(h ^ 1);
      if (g === undefined || g === f) continue;
      const a = view.owner(f) ?? '';
      const c = view.owner(g) ?? '';
      expect(lands.has(a) && lands.has(c)).toBe(false);
    }
  });

  it('sites: Bridges in state site, deck_end vertices pinned on their body\'s shore and resolving by VertexRef(\'deck_end\', bridge, 0 | 1); no span; ≥ 40 m apart; each deck within ±10° of the flow\'s normal', () => {
    const { out, kernel, plat } = run(fixture());
    expect(out.water.bridges.length).toBeGreaterThan(3);
    expect(out.water.bridges).toHaveLength(out.sites.length);
    const ends: { x: number; y: number }[][] = [];
    out.water.bridges.forEach((b: Bridge, i) => {
      const site = out.sites[i];
      expect(b).toMatchObject({ id: `bridge:${String(i)}`, state: 'site', way: null, over: 'river' });
      expect(b.kind === 'ford').toBe(site.type === 'ford');
      const pts: { x: number; y: number }[] = [];
      for (const e of [0, 1] as const) {
        expect(b.deck[e]).toEqual({ role: 'deck_end', entity: b.id, ordinal: e });
        const r = kernel.resolve(b.deck[e], GROUND_KEY);
        expect(r.view === 'vertices' && r.vertices.length).toBe(1);
        if (r.view !== 'vertices') continue;
        const v = r.vertices[0];
        expect(isVertexLive(plat, v)).toBe(true);
        expect(plat.vertices.flags[v] & VERTEX_PINNED).toBe(VERTEX_PINNED);
        expect(plat.vertices.level[v]).toBe(0);
        expect(rowsAt(plat, v)).toContain(`shore ${site.water}`);
        pts.push({ x: plat.vertices.x[v], y: plat.vertices.y[v] });
        expect(pts[e]).toEqual({ x: site.deck[e].x, y: site.deck[e].y });
      }
      ends.push(pts);
      // a site has no span: no edge carries its deck role
      const span = kernel.resolve({ role: 'deck', entity: b.id }, GROUND_KEY);
      expect(span.view === 'edges' && span.runs.length).toBe(0);
      expect(Math.abs(b.spanCm - Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y))).toBeLessThanOrEqual(1);
      // perpendicular to the local flow (the course tangent averaged over one width up and downstream)
      const body = out.water.bodies.find((w) => w.id === site.water) as WaterBody;
      const f = flowNear(body, site.at);
      const dx = pts[1].x - pts[0].x;
      const dy = pts[1].y - pts[0].y;
      const sin = Math.abs(dx * f.x + dy * f.y) / Math.hypot(dx, dy);
      expect(Math.asin(sin) * (180 / Math.PI)).toBeLessThanOrEqual(10);
      // end 0 the left bank looking downstream
      expect((pts[0].x - site.at.x) * f.y - (pts[0].y - site.at.y) * f.x).toBeLessThan(0);
    });
    for (let i = 0; i < ends.length; i += 1) {
      for (let j = i + 1; j < ends.length; j += 1) {
        const [a, b] = ends[i];
        const [c, d] = ends[j];
        const dist = (p: { x: number; y: number }, s: { x: number; y: number }, t: { x: number; y: number }): number => {
          const l2 = (t.x - s.x) ** 2 + (t.y - s.y) ** 2;
          const u = Math.min(1, Math.max(0, ((p.x - s.x) * (t.x - s.x) + (p.y - s.y) * (t.y - s.y)) / l2));
          return Math.hypot(s.x + (t.x - s.x) * u - p.x, s.y + (t.y - s.y) * u - p.y);
        };
        expect(Math.min(dist(a, c, d), dist(b, c, d), dist(c, a, b), dist(d, a, b))).toBeGreaterThanOrEqual(4000);
      }
    }
  });

  it('§3.10: every stored reference resolves at stage end — the report\'s rows and the kernel\'s check over the output\'s references', () => {
    const { out, plat } = run(fixture());
    expect(out.report.stageEnd.length).toBeGreaterThan(0);
    expect(out.report.stageEnd.every((r) => r.holds)).toBe(true);
    const refs: GeomRef[] = [{ role: 'margin', entity: 'terrain:ground' }];
    const live = new Set(['terrain:ground']);
    for (const b of out.water.bodies) {
      refs.push(b.face, b.shore);
      live.add(b.id);
    }
    for (const b of out.water.bridges) {
      refs.push(...b.deck);
      live.add(b.id);
    }
    for (const c of out.land) {
      refs.push(c.face);
      live.add(c.id);
    }
    const rows = checkStageEnd(plat, { refs, isLive: (id) => live.has(id) });
    expect(rows.filter((r) => r.name === 'references-resolve').map((r) => [r.holds, r.problems])).toEqual([[true, []]]);
    // and the row is not vacuous: a dead bridge is seen
    live.delete('bridge:0');
    const dead = checkStageEnd(plat, { refs, isLive: (id) => live.has(id) });
    expect(dead.find((r) => r.name === 'references-resolve')?.holds).toBe(false);
  });

  it('S1 (9): the terrain\'s outfalls written — on its bodies\' banks and the frame edge, each cell containing its point', () => {
    const fx = fixture();
    const { out } = run(fx);
    const t = out.terrain;
    expect(t).toBe(fx.terrain);
    expect(t.outfalls.length).toBeGreaterThan(0);
    const ids = new Set(out.water.bodies.map((b) => b.id));
    expect(t.outfalls.some((o) => o.into === 'river')).toBe(true);
    for (const o of t.outfalls) {
      if (o.into === 'frame') expect(o.water).toBeNull();
      else expect(ids.has(o.water ?? '')).toBe(true);
      const { i, j } = cellAt(t.hydro, o.at.x, o.at.y);
      expect(o.cell).toBe(j * t.hydro.cols + i);
    }
  });

  it('deterministic: two runs on fresh arenas give the same arena, water, sites, land and outfalls', () => {
    const a = run(fixture(5));
    const b = run(fixture(5));
    const print = (p: Plat): string => {
      const lines: string[] = [];
      for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v)) lines.push(`${p.vertices.x[v]},${p.vertices.y[v]} ${p.vertices.flags[v]} ${rowsAt(p, v).join('|')}`);
      return lines.sort().join('\n');
    };
    expect(print(b.plat)).toBe(print(a.plat));
    expect(JSON.stringify([b.out.water.bridges, b.out.sites, b.out.land.map((c) => c.id), b.out.terrain.outfalls])).toBe(JSON.stringify([a.out.water.bridges, a.out.sites, a.out.land.map((c) => c.id), a.out.terrain.outfalls]));
  });

  it('the Stage: S1, callback form, no stream key, declared outputs; its input carries the façade; the runner\'s model is checked', () => {
    const st = s1Stage();
    expect([st.id, st.txForm, st.lazy, st.streamKeys, st.outputs, st.batch]).toEqual([STAGES.S1, 'callback', false, [], ['terrain', 'water'], { kind: 'stage', stage: STAGES.S1 }]);
    expect(st.invariants.map((i) => [i.name, i.scope, i.class])).toEqual([['references-resolve', 'stage', 'hard']]);
    expect(st.workLimits.map((l) => l.counter)).toEqual(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked']);
    expect(() => st.inputsOf({ terrain: {}, water: {} }, { kind: 'all' })).toThrow(/kernel façade/);
    const fx = fixture();
    const g = ground(fx.frame);
    const input = st.inputsOf({ terrain: fx.terrain, water: fx.water, kernel: g.kernel }, { kind: 'all' });
    const r = st.run(input, fx.ctx);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.water.bodies.length).toBe(2);
  });

  it('C-0123: no file of @plat/site imports @plat/layout', () => {
    const root = fileURLToPath(new URL('../..', import.meta.url));
    const files: string[] = [];
    const walk = (d: string): void => {
      for (const e of readdirSync(d)) {
        if (e === 'node_modules' || e === 'dist') continue;
        const p = join(d, e);
        if (statSync(p).isDirectory()) walk(p);
        else if (p.endsWith('.ts')) files.push(p);
      }
    };
    walk(join(root, 'src'));
    walk(join(root, 'test'));
    expect(files.length).toBeGreaterThan(10);
    for (const f of files) expect(readFileSync(f, 'utf8')).not.toMatch(/from '@plat\/layout'/);
  });
});
