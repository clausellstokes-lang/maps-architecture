// The between-stage prune and trim (M0-c-05; §4.4 S5c *Between stages*, §4.1's S5 row "S5c L1: growth, then L1: the
// between-stage prune and trim"; readings C-0253 (8)): one L1 callback batch at S5's rank after a stage's growth —
//   * trim: only S5-grown provisional spines that run beyond the stage's boundary (an unwalled stage's streets whose last
//     step left it) are cut back where they first leave it, the cut vertex their new dead end — S4 and S5b arterials are
//     never trimmed (only S5c's streets are candidates, and a `through` or `primary` way never is);
//   * prune: a dangling `secondary` street — a dead end that no other way meets but at its origin — shorter than one
//     block width (the regime's minimum block depth) is removed with its junctions, children before parents, until none
//     is left (a parent left dangling by its pruned children is pruned in turn when short).
import { ok, STAGES, type HalfEdgeId, type KernelResult, type LatticePoint, type StageId } from '@plat/kernel';
import type { Id, Junction } from '@plat/model';
import { crossParams, lat } from '../enceinte/plane.js';
import { generated } from '../enceinte/water.js';
import { wayLines, type StageBoundary } from './boundary.js';
import type { GrowthState } from './mainRoads.js';
import type { XY } from './legality.js';
import { growthRecord, growthRules, idNumber, type GrownStreet, type S5cRecord } from './proposals.js';

/** A growth stage as the prune, the trim and S5d read it: the growth state, the stage and its S5c record. */
export interface StageRef {
  readonly state: GrowthState;
  readonly k: number;
  /** The stage's S5c record (default the one the state holds). */
  readonly record?: S5cRecord;
}

/** What the prune and trim did. */
export interface PruneRecord {
  readonly k: number;
  readonly trimmed: { readonly way: Id; readonly cutAt: LatticePoint; readonly removedCm: number }[];
  readonly pruned: { readonly way: Id; readonly lengthCm: number }[];
  /** The block width the prune read (cm). */
  readonly blockWidthCm: number;
  /** Kernel refusals by code (each leaves its street as it stood). */
  readonly refused: Record<string, number>;
}

/** The options of `pruneAndTrim`. */
export interface PruneOptions {
  /** The boundary the trim cuts at (default the stage's record's). */
  readonly boundary?: StageBoundary;
}

function lengthOf(pts: readonly XY[]): number {
  let s = 0;
  for (let i = 1; i < pts.length; i += 1) s += Math.sqrt((pts[i].x - pts[i - 1].x) * (pts[i].x - pts[i - 1].x) + (pts[i].y - pts[i - 1].y) * (pts[i].y - pts[i - 1].y));
  return s;
}

/** The first point where a line leaves the closed ring (its first crossing along the line), with its segment. */
function firstExit(line: readonly XY[], ring: readonly XY[]): { at: XY; seg: number } | null {
  for (let i = 0; i + 1 < line.length; i += 1) {
    let best: { t: number; at: XY } | null = null;
    for (let j = 0; j < ring.length; j += 1) {
      const x = crossParams(line[i], line[i + 1], ring[j], ring[j + 1 === ring.length ? 0 : j + 1]);
      if (x === null || (best !== null && x.t >= best.t)) continue;
      best = { t: x.t, at: { x: line[i].x + x.t * (line[i + 1].x - line[i].x), y: line[i].y + x.t * (line[i + 1].y - line[i].y) } };
    }
    if (best !== null) return { at: best.at, seg: i };
  }
  return null;
}

const byId = (a: Id, b: Id): number => (a < b ? -1 : a > b ? 1 : 0);

/**
 * `pruneAndTrim(stage)` (§4.4 *Between stages*; see the module comment): the trim of the stage's provisional streets at
 * its boundary, then the prune of its short dangling secondaries, in one L1 callback batch. The records — the S5c
 * record's streets and junctions, the state's ways and junctions — follow what the batch committed.
 */
export function pruneAndTrim(stage: StageRef, opts: PruneOptions = {}): KernelResult<PruneRecord> {
  const { state, k } = stage;
  const rec = stage.record ?? growthRecord(state, k);
  const gs = state.stages[k - 1];
  if (gs === undefined || gs.k !== k) throw new RangeError(`pruneAndTrim: stage ${String(k)} has no S5a / S5b record`);
  const site = state.slice.site;
  const rules = growthRules(site.tables, gs.regime, site.rung);
  const out: PruneRecord = { k, trimmed: [], pruned: [], blockWidthCm: rules.blockDepthCm, refused: {} };
  if (rec === undefined || rec.streets.length === 0) return ok(out);
  const kernel = state.kernel;
  const key = state.key;
  const boundary = opts.boundary ?? gs.boundary;
  let jN = 0;
  for (const j of state.junctions) jN = Math.max(jN, idNumber(j.id, 'junction:') + 1);
  for (const j of rec.junctions) jN = Math.max(jN, idNumber(j.id, 'junction:') + 1);
  const refuse = (code: string): void => {
    out.refused[code] = (out.refused[code] ?? 0) + 1;
  };
  const dropJunction = (id: Id): void => {
    const a = rec.junctions.findIndex((j) => j.id === id);
    if (a >= 0) rec.junctions.splice(a, 1);
    const b = state.junctions.findIndex((j) => j.id === id);
    if (b >= 0) state.junctions.splice(b, 1);
  };
  const setJunction = (j: Junction): void => {
    const a = rec.junctions.findIndex((x) => x.id === j.id);
    if (a >= 0) rec.junctions[a] = j;
    const b = state.junctions.findIndex((x) => x.id === j.id);
    if (b >= 0) state.junctions[b] = j;
  };
  const junctionOf = (id: Id): Junction | undefined => state.junctions.find((j) => j.id === id) ?? rec.junctions.find((j) => j.id === id);

  // The records as they stand: a batch refused at its commit writes nothing, and they are put back (fail safe).
  const saved = {
    streets: rec.streets.slice(),
    junctions: rec.junctions.slice(),
    ways: state.ways.slice(),
    stateJunctions: state.junctions.slice(),
    each: rec.streets.map((st) => ({ st, points: st.points.slice(), way: { ...st.way }, ends: st.ends, meets: st.meets, provisional: st.provisional })),
  };
  const r = kernel.tx(
    {
      key,
      level: 1,
      ops: [],
      expect: [],
      onFail: 'reject',
      batch: { kind: 'stage', stage: STAGES.S5 as StageId },
      stage: STAGES.S5 as StageId,
      rederivesFrom: STAGES.S5 as StageId,
      workLimit: 10_000_000,
    },
    (o) => {
      // ---- the trim -------------------------------------------------------------------------------------------------
      if (boundary !== null && !gs.walled) {
        for (const st of rec.streets) {
          if (!st.provisional || st.way.class === 'through' || st.way.class === 'primary') continue;
          const line = wayLines(kernel, [st.way.id], key)[0];
          const pts: readonly XY[] = line.runs.length === 1 ? line.runs[0].points : st.points;
          const exit = firstExit(pts, boundary.set.outline);
          if (exit === null) continue;
          const cut = lat(exit.at);
          const endAt = pts[pts.length - 1];
          // The cut vertex on the way, carrying the new end's junction row.
          const p = kernel.plat(key);
          const res = kernel.resolve({ role: 'way', entity: st.way.id }, key);
          if (res.view !== 'edges' || res.runs.length !== 1) {
            refuse('E_RUNS');
            continue;
          }
          const h = res.runs[0][exit.seg];
          if (h === undefined) {
            refuse('E_RUNS');
            continue;
          }
          const newEnd = `junction:${String(jN)}`;
          const s = kernel.geom.splitThrough(o, h as HalfEdgeId, cut, { role: 'junction', entity: newEnd, ordinal: 0 });
          if (!s.ok) {
            refuse(s.code);
            continue;
          }
          const cv = s.value;
          const cutAt = { x: p.vertices.x[cv], y: p.vertices.y[cv] } as LatticePoint;
          const removed = kernel.geom.removeEdges(o, { chain: { role: 'way', entity: st.way.id }, from: cutAt, to: endAt as LatticePoint });
          if (!removed.ok) {
            refuse(removed.code);
            kernel.geom.removeEdges(o, { role: 'junction', entity: newEnd, ordinal: 0 });
            continue;
          }
          jN += 1;
          // The old end's row and record go; the street ends at the cut, no longer provisional.
          const old = st.way.to.kind === 'junction' ? st.way.to.id : null;
          if (old !== null && old !== '' && junctionOf(old)?.kind === 'end') {
            kernel.geom.removeEdges(o, { role: 'junction', entity: old, ordinal: 0 });
            dropJunction(old);
          }
          const j: Junction = { id: newEnd, vertex: { role: 'junction', entity: newEnd, ordinal: 0 }, arms: [st.way.id], kind: 'end', lifecycle: generated(0) };
          rec.junctions.push(j);
          if (state.ways.includes(st.way)) state.junctions.push(j);
          const kept = pts.slice(0, exit.seg + 1).map((q) => q as LatticePoint);
          kept.push(cutAt);
          out.trimmed.push({ way: st.way.id, cutAt, removedCm: lengthOf(pts) - lengthOf(kept) });
          st.points.splice(0, st.points.length, ...kept);
          st.way.to = { kind: 'junction', id: newEnd };
          st.way.provisional = false;
          st.provisional = false;
          st.ends = 'dead';
          st.meets = null;
        }
      }
      // ---- the prune ------------------------------------------------------------------------------------------------
      const gone = new Set<Id>();
      let changed = true;
      while (changed) {
        changed = false;
        for (let i = rec.streets.length - 1; i >= 0; i -= 1) {
          const st: GrownStreet = rec.streets[i];
          if (gone.has(st.way.id) || st.way.class !== 'secondary') continue;
          if (st.ends === 'T' || st.ends === 'snap' || st.ends === null) continue;
          const from = st.way.from.kind === 'junction' ? st.way.from.id : '';
          const to = st.way.to.kind === 'junction' ? st.way.to.id : '';
          // Dangling: no other way meets it but at its origin.
          const meets = [...state.junctions, ...rec.junctions].some((j) => j.id !== from && j.id !== to && j.arms.includes(st.way.id));
          if (meets) continue;
          const len = lengthOf(st.points);
          if (!(len < rules.blockDepthCm)) continue;
          const removed = kernel.geom.removeEdges(o, { role: 'way', entity: st.way.id });
          if (!removed.ok) {
            refuse(removed.code);
            continue;
          }
          if (to !== '' && junctionOf(to)?.kind === 'end') {
            kernel.geom.removeEdges(o, { role: 'junction', entity: to, ordinal: 0 });
            dropJunction(to);
          }
          const oj = junctionOf(from);
          if (oj !== undefined) {
            const arms = oj.arms.filter((a) => a !== st.way.id);
            if (arms.length <= 1) {
              kernel.geom.removeEdges(o, { role: 'junction', entity: from, ordinal: 0 });
              dropJunction(from);
            } else setJunction({ ...oj, arms: arms.sort(byId), kind: arms.length >= 4 ? 'X' : oj.kind });
          }
          gone.add(st.way.id);
          out.pruned.push({ way: st.way.id, lengthCm: len });
          changed = true;
        }
      }
      if (gone.size > 0) {
        for (let i = rec.streets.length - 1; i >= 0; i -= 1) if (gone.has(rec.streets[i].way.id)) rec.streets.splice(i, 1);
        for (let i = state.ways.length - 1; i >= 0; i -= 1) if (gone.has(state.ways[i].id)) state.ways.splice(i, 1);
      }
      return ok(null);
    },
  );
  if (!r.ok) {
    rec.streets.splice(0, rec.streets.length, ...saved.streets);
    rec.junctions.splice(0, rec.junctions.length, ...saved.junctions);
    state.ways.splice(0, state.ways.length, ...saved.ways);
    state.junctions.splice(0, state.junctions.length, ...saved.stateJunctions);
    for (const e of saved.each) {
      e.st.points.splice(0, e.st.points.length, ...e.points);
      Object.assign(e.st.way, e.way);
      e.st.ends = e.ends;
      e.st.meets = e.meets;
      e.st.provisional = e.provisional;
    }
    return ok({ k, trimmed: [], pruned: [], blockWidthCm: out.blockWidthCm, refused: { [`batch:${r.code}`]: 1 } });
  }
  return ok(out, r.warnings);
}
