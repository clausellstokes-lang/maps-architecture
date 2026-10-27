// M0-e-03's test support: a hand-built S1 StageContext (C-0123: @plat/site's stages are tested under a hand-built
// context over the kernel's façade, never through @plat/layout's runner), an indexed ground arena with its façade,
// the river fixtures — S1 (1)'s terrain and S1 (3)'s river, built by M0-e-01's and M0-e-02's code, as the L0 batch
// reads them — and the folder's shared builders and checks: the lifecycle literal, a hand-built water body, the small
// arena, the stage-end subject list, the CI sweep's failing hard rows, the L0 edge property and the segment distances
// (L27 (c)). Each states its expectation on its own terms (the test's oracle), never by calling the code under test
// for it.
import { attachIndex, checkCI, createKernel, createPlat, createRng, entityKey, rowKey, rowsOn, seedKey, STAGES, streamFromKey, type Frame, type Hash128, type Kernel, type LatticePoint, type Plat } from '@plat/kernel';
import type { Cm, CmArray, GeomRef, StageContext, Terrain, WaterBody, WaterSet } from '@plat/model';
import { rungProfile, tableView, type BaseRung, type TableView } from '@plat/tables';
import { expect } from 'vitest';
import { buildTerrain, GROUND_KEY, siteFrame, terrainParams, TOWN_ROOT, type SiteEnv, type SiteRequest } from '../../src/terrain/index.js';
import { runRivers, type RiverRequest } from '../../src/hydro/index.js';
import { leftFaces, reachOf, type LandComponent } from '../../src/water/index.js';

export const TABLES: TableView = tableView();

/** The index cells per level for a site-sized arena (cm). */
export const INDEX_CELLS: [number, number, number, number, number] = [10_000, 5_000, 2_500, 1_200, 600];

/** The town root's entity key for `seed`. */
export function townKey(seed: number): Hash128 {
  return entityKey(seedKey(seed), [0, 0], { layer: 'ground', part: 0 });
}

/** A hand-built S1 context over `seed` at `rung` (the terrain and hydro items' pattern). */
export function siteContext(seed: number, rung: BaseRung = 'CITY', epoch = 0): StageContext<SiteEnv> {
  const rng = createRng();
  const keys = new Map<number, Hash128>([[TOWN_ROOT, townKey(seed)]]);
  return {
    doc: undefined,
    plats: {},
    tables: TABLES,
    rung: rungProfile(rung),
    report: undefined,
    epoch,
    stream(concern, entity, opts) {
      const k = keys.get(entity);
      if (k === undefined) throw new Error(`no entity key for handle ${String(entity)}`);
      return rng.stream(k, STAGES.S1, concern, opts);
    },
    streamOpts(_concern, _entity, attempt = 0) {
      return { reroll: 0, attempt, epoch, salt: 0 };
    },
  };
}

/** An empty indexed ground arena over `frame` and its façade. */
export function ground(frame: Frame): { plat: Plat; kernel: Kernel } {
  const plat = createPlat(GROUND_KEY, frame, { vertices: 4096, edgePairs: 4096, roleRows: 8192 });
  attachIndex(plat, { gridCellCm: INDEX_CELLS });
  const kernel = createKernel(new Map([[GROUND_KEY, plat]]));
  return { plat, kernel };
}

/** The frame of a size at a rung. */
export function frameOf(size: { areaHa?: number; population?: number } = {}, rung: BaseRung = 'CITY'): Frame {
  const f = siteFrame(size, rungProfile(rung), TABLES);
  if (!f.ok) throw new Error(f.detail);
  return f.value;
}

/** A river fixture: the terrain of `site` (its noise from `seed`) and the water S1 (3) traces on it. */
export interface RiverFixture {
  frame: Frame;
  terrain: Terrain;
  water: WaterSet;
  ctx: StageContext<SiteEnv>;
}

export function riverFixture(seed: number, site: SiteRequest, river: RiverRequest | null, size: { areaHa?: number; population?: number } = {}, rung: BaseRung = 'CITY'): RiverFixture {
  const frame = frameOf(size, rung);
  const t = buildTerrain({ id: 'terrain:ground', key: GROUND_KEY, frame, params: terrainParams(TABLES, rung), epoch: 0 }, site, streamFromKey([seed, 7, 0, 0]));
  if (!t.ok) throw new Error(t.detail);
  const ctx = siteContext(seed, rung);
  const r = runRivers({ size, site: { river } }, t.value, { bodies: [], bridges: [] }, ctx);
  if (!r.ok) throw new Error(r.detail);
  return { frame, terrain: t.value, water: r.value.water, ctx };
}

/** A lattice point. */
export function pt(x: number, y: number): { x: Cm; y: Cm } {
  return { x: x as Cm, y: y as Cm };
}

/** A point rounded to the lattice. */
export function lp(x: number, y: number): LatticePoint {
  return { x: Math.round(x) as Cm, y: Math.round(y) as Cm };
}

/** §2.8's lifecycle of a record generated in epoch 0, written out (the record shape the tests expect, C-0142). */
export const GENERATED_AT_0 = { existence: 'generated' as const, flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

/** A hand-built water body: its course, a width per course point (or one for all), its face and shore refs, generated at 0. */
export function waterBody(id: string, kind: WaterBody['kind'], course: readonly { x: number; y: number }[], widths: number | readonly number[], extra: Partial<WaterBody> = {}): WaterBody {
  return {
    id,
    kind,
    face: { owner: id, level: 0 },
    shore: { role: 'shore', entity: id },
    course: course.map((q) => pt(q.x, q.y)),
    widthProfile: Int32Array.from(course, (_, i) => (typeof widths === 'number' ? widths : widths[i])) as CmArray,
    lifecycle: GENERATED_AT_0,
    ...extra,
  };
}

/** A 1 000 m × 600 m arena (frame 500 m × 300 m, margin ½). */
const SMALL_FRAME: Frame = { widthCm: 50_000 as Cm, heightCm: 30_000 as Cm, aspect: 5 / 3, marginShare: 0.5 };

/** The small arena: its frame, its reach and the L0 batches' options over it. */
export const SMALL_ARENA = { FRAME: SMALL_FRAME, REACH: reachOf(SMALL_FRAME), OPTS: { key: GROUND_KEY, stage: STAGES.S1, workLimit: 1e9 } };

/**
 * The references an S1 output holds, and its live entities — the stage-end row's subject stated by the test: the
 * terrain's margin, each body's face and shore, each bridge's two deck ends, each land component's face.
 */
export function heldRefs(terrainId: string, out: { water: WaterSet; land: readonly LandComponent[] }): { refs: GeomRef[]; live: Set<string> } {
  const refs: GeomRef[] = [{ role: 'margin', entity: terrainId }];
  const live = new Set<string>([terrainId]);
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
  return { refs, live };
}

/** The hard rows of the kernel's CI sweep that fail, over the whole arena with the water's references. */
export function hardFailures(plat: Plat, refs: GeomRef[], live: Set<string>): string[] {
  return checkCI(plat, { refs, isLive: (id) => live.has(id) })
    .filter((r) => r.class === 'hard' && !r.holds)
    .map((r) => `${r.name}: ${r.problems.slice(0, 2).join('; ')}`);
}

/** §2.2 rule 7's first half: every L0 edge (each pair once) carries a shore or the ring's margin. Returns each edge's roles. */
export function everyL0EdgeShoreOrRing(plat: Plat): string[][] {
  const seen = new Set<number>();
  const out: string[][] = [];
  for (const h of leftFaces(plat).keys()) {
    if (seen.has(h >> 1)) continue;
    seen.add(h >> 1);
    const roles = rowsOn(plat, 'edge', h).map((q) => rowKey(plat, q).role);
    expect(roles.some((x) => x === 'shore' || x === 'margin')).toBe(true);
    out.push(roles);
  }
  return out;
}

/**
 * §4.2 S1 (5)'s local flow, computed here independently of `siteCrossings`: at the course point nearest `q`, the unit
 * chord from the course point one channel width (its width profile there) upstream to the one a width downstream, both
 * found by walking the course's arc length in floating point. The ± 10° deck tests measure every deck against it, never
 * against the site's own `flow` (C-0233).
 */
export function flowNear(body: WaterBody, q: { x: number; y: number }): { x: number; y: number } {
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

/** The angle (degrees, 0 – 90) between the segment a→b and the normal of the unit `flow`: 0 for a deck straight across it. */
export function offNormalDeg(a: { x: number; y: number }, b: { x: number; y: number }, flow: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const along = Math.abs(dx * flow.x + dy * flow.y) / Math.hypot(dx, dy);
  return (Math.asin(Math.min(1, along)) * 180) / Math.PI;
}

/** The distance from p to segment ab, in floating point: the test's own (L27 (c): never the code's `segDist2`). */
export function pointSegGap(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  const u = l2 === 0 ? 0 : Math.min(1, Math.max(0, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2));
  return Math.hypot(a.x + (b.x - a.x) * u - p.x, a.y + (b.y - a.y) * u - p.y);
}

/**
 * The distance between segments ab and cd, in floating point: 0 when they cross (each one's ends strictly either side
 * of the other's line), else the least of the four end-to-segment distances — the test's own (L27 (c)).
 */
export function segGap(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }, d: { x: number; y: number }): number {
  const side = (p: { x: number; y: number }, q: { x: number; y: number }, r: { x: number; y: number }): number => Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x));
  if (side(a, b, c) * side(a, b, d) < 0 && side(c, d, a) * side(c, d, b) < 0) return 0;
  return Math.min(pointSegGap(a, c, d), pointSegGap(b, c, d), pointSegGap(c, a, b), pointSegGap(d, a, b));
}
