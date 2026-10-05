// The interpreter of fixtures/sequences.json (M0-a-06's batch fixtures, slot-free; M0-d-08 reads the same file): each
// batch built from data — faces named by lattice points inside them, edges by their end points — and run through tx().
import { faceKey, type Plat } from '../../src/arena/index.js';
import { pointLocate } from '../../src/index/index.js';
import { insertChain, splitThrough, type InsertChainOpts } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import {
  clearFiner,
  kernelOp,
  removeEdges,
  retypeEdges,
  setOwner,
  tx,
  type AnyProfile,
  type CommitRecord,
  type KernelOp,
  type OpKind,
  type Overlay,
} from '../../src/tx/index.js';
import type { ChainRef, Level, StageId, StretchRef, VertexRef } from '../../src/types/index.js';
import { between, contentPrint, framed, pt, spec } from './support.js';
import data from './fixtures/sequences.json';

type XY = [number, number];
type End = XY | VertexRef;
type Ref = ChainRef | VertexRef | { chain: ChainRef; from: End; to: End };

/** One op of a fixture batch, as data. */
export interface FixtureOp {
  readonly op: string;
  readonly lineage?: [number, number];
  readonly index?: number;
  readonly points?: XY[];
  readonly roles?: { role: string; entity: string; ordinal?: number }[];
  readonly cls?: 'mandatory' | 'optional';
  readonly opts?: InsertChainOpts;
  readonly edge?: [XY, XY];
  readonly at?: XY | XY[];
  readonly row?: { role: string; entity: string; ordinal?: number };
  readonly ref?: Ref;
  readonly profiles?: AnyProfile[];
  readonly add?: { role: string; entity: string; ordinal?: number }[];
  readonly remove?: string[];
  readonly rekey?: { from: string; to: string; profiles?: { from?: AnyProfile; to?: AnyProfile }[] };
  readonly faces?: { owner: string; level: Level };
  readonly clearLevel?: Level;
  readonly owner?: string;
}

/** One fixture batch. */
export interface FixtureBatch {
  readonly level: Level;
  readonly form: 'callback' | 'declared';
  readonly stage?: number;
  readonly rederivesFrom?: number;
  readonly workLimit?: number;
  readonly expect: string;
  readonly ops: FixtureOp[];
}

/** One fixture sequence. */
export interface FixtureSequence {
  readonly name: string;
  readonly frame: number;
  readonly batches: FixtureBatch[];
}

export const SEQUENCES: readonly FixtureSequence[] = (data as unknown as { sequences: FixtureSequence[] }).sequences;

function endOf(e: End): VertexRef | ReturnType<typeof pt> {
  return Array.isArray(e) ? pt(e[0], e[1]) : e;
}

function refOf(r: Ref): ChainRef | VertexRef | StretchRef {
  if ('chain' in r) return { chain: r.chain, from: endOf(r.from), to: endOf(r.to) };
  return r;
}

/** The face of the batch's level holding a lattice point (pointLocate on the overlay). */
function faceAt(o: Overlay, xy: XY): number {
  const loc = pointLocate(o.plat, o.key, o.level, pt(xy[0], xy[1]));
  if (loc.on !== 'face' || loc.level !== o.level) throw new Error(`fixtures: no L${o.level} face at ${xy}`);
  return loc.face;
}

/** The writer call one op stands for, on the open overlay. */
function call(o: Overlay, f: FixtureOp): KernelResult<unknown> {
  switch (f.op) {
    case 'insertChain':
      return insertChain(o, (f.points ?? []).map(([x, y]) => pt(x, y)), f.roles ?? [], f.cls ?? 'mandatory', f.opts ?? {});
    case 'splitThrough': {
      const [a, b] = f.edge as [XY, XY];
      return splitThrough(o, between(o.plat, a, b), pt((f.at as XY)[0], (f.at as XY)[1]), f.row);
    }
    case 'removeEdges':
      return removeEdges(o, refOf(f.ref as Ref), f.profiles ?? []);
    case 'retypeEdges':
      return retypeEdges(o, refOf(f.ref as Ref) as ChainRef | StretchRef, f.add ?? [], f.remove ?? [], f.rekey);
    case 'clearFiner':
      return clearFiner(o, f.faces as { owner: string; level: Level }, f.clearLevel as Level);
    case 'setOwner':
      return setOwner(o, (f.at as XY[]).map((xy) => faceAt(o, xy)), f.owner as string);
    default:
      throw new Error(`fixtures: no op ${f.op}`);
  }
}

/** The record read on lattice positions and canonical keys (comparable across runs and slot assignments). */
export function readRecord(p: Plat, r: CommitRecord): string {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const v = (x: number): string => `${X[x]},${Y[x]}`;
  return JSON.stringify({
    faces: r.faces.map((d) => ({ l: d.level, c: d.created.map((x) => faceKey(p, d.level, x).map(v).join('>')), ch: d.changed.map((x) => faceKey(p, d.level, x).map(v).join('>')), r: d.removed.length })),
    counts: [r.edgesAdded, r.edgesRemoved, r.steinerAdded, r.steinerDissolved, r.work],
    promoted: r.promoted.map(v),
    demoted: [r.demoted.vertices.map(v), r.demoted.edges.length],
    unflagged: r.unflagged.map(v),
    owners: r.owners,
    roles: r.roles,
    warnings: r.warnings,
  });
}

/**
 * Runs a sequence on a fresh frame: each batch's outcome — `commit` with the record read on positions and the arena's
 * slot-free print, `nothing`, or `refuse:<code>`. `reverse` issues every declared batch's ops in reverse order.
 */
export function runSequence(seq: FixtureSequence, reverse = false): { p: Plat; outcomes: string[] } {
  const p = framed(seq.frame);
  const outcomes: string[] = [];
  for (const b of seq.batches) {
    const over = {
      ...(b.stage === undefined ? {} : { stage: b.stage as StageId }),
      ...(b.rederivesFrom === undefined ? {} : { rederivesFrom: b.rederivesFrom as StageId }),
      ...(b.workLimit === undefined ? {} : { workLimit: b.workLimit }),
    };
    let res: ReturnType<typeof tx>;
    if (b.form === 'declared') {
      const ops: KernelOp[] = b.ops.map((f) => kernelOp(f.op as OpKind, f.lineage ?? [0, 0], f.index ?? 0, (o) => call(o, f)));
      res = tx(p, spec(b.level, { ...over, ops: reverse ? ops.slice().reverse() : ops }));
    } else {
      res = tx(p, spec(b.level, over), (o) => {
        for (const f of b.ops) {
          const r = call(o, f);
          if (!r.ok) return r;
        }
        return { ok: true, value: null, warnings: [] };
      });
    }
    if (!res.ok) outcomes.push(`refuse:${res.code}`);
    else if (res.value.record === null) outcomes.push('nothing');
    else outcomes.push(`commit\n${readRecord(p, res.value.record)}\n${contentPrint(p)}`);
  }
  return { p, outcomes };
}
