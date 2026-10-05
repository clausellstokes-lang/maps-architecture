// The kernel's batch fixtures as determinism sequences (M0-d-08): an interpreter of M0-a-06's slot-free batch data
// (`packages/kernel/test/tx/fixtures/sequences.json`, whose `$comment` states the format and names this harness as its
// reader) into `DeterminismSequence`s. A batch is rebuilt from data on whatever arena it runs on — a face named by a
// lattice point inside it (pointLocate), an edge by its two end points — so one sequence runs unchanged on any slot
// assignment, under any clock and in any op order. The file itself is read by the caller (a test reads it from the
// kernel's test folder; nothing here reads a file), so this module carries no input path (C-0067).
import {
  attachIndex,
  clearFiner,
  createPlat,
  insertChain,
  insertTx,
  isVertexLive,
  kernelOp,
  outgoing,
  pointLocate,
  removeEdges,
  retypeEdges,
  setOwner,
  splitThrough,
  type AnyProfile,
  type Cm,
  type ChainRef,
  type Frame,
  type HalfEdgeId,
  type InsertChainOpts,
  type KernelOp,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type Level,
  type OpKind,
  type Overlay,
  type Plat,
  type PlatKey,
  type StageId,
  type StretchRef,
  type VertexRef,
} from '@plat/kernel';
import type { DeterminismBatch, DeterminismBatchSpec, DeterminismSequence } from './issue.js';

type XY = readonly [number, number];
type End = XY | VertexRef;
type Ref = ChainRef | VertexRef | { chain: ChainRef; from: End; to: End };

/** One op of a fixture batch, as data (sequences.json's op shape). */
export interface FixtureOpData {
  readonly op: string;
  readonly lineage?: readonly [number, number];
  readonly index?: number;
  readonly points?: readonly XY[];
  readonly roles?: readonly { role: string; entity: string; ordinal?: number }[];
  readonly cls?: 'mandatory' | 'optional';
  readonly opts?: InsertChainOpts;
  readonly edge?: readonly [XY, XY];
  readonly at?: XY | readonly XY[];
  readonly row?: { role: string; entity: string; ordinal?: number };
  readonly ref?: Ref;
  readonly profiles?: readonly AnyProfile[];
  readonly add?: readonly { role: string; entity: string; ordinal?: number }[];
  readonly remove?: readonly string[];
  readonly rekey?: { from: string; to: string; profiles?: { from?: AnyProfile; to?: AnyProfile }[] };
  readonly faces?: { owner: string; level: Level };
  readonly clearLevel?: Level;
  readonly owner?: string;
}

/** One fixture batch, as data. */
export interface FixtureBatchData {
  readonly level: Level;
  readonly form: 'callback' | 'declared';
  readonly stage?: number;
  readonly rederivesFrom?: number;
  readonly workLimit?: number;
  readonly expect: string;
  readonly ops: readonly FixtureOpData[];
}

/** One fixture sequence, as data. */
export interface FixtureSequenceData {
  readonly name: string;
  readonly frame: number;
  readonly batches: readonly FixtureBatchData[];
}

/** The ground arena's key, as the kernel's fixtures use it. */
export const FIXTURE_KEY: PlatKey = { layer: 'ground', part: 0 };
/** The frame record of the kernel's fixtures (2 km square; the outer ring is the inserted margin chain). */
export const FIXTURE_FRAME: Frame = { widthCm: 200_000 as Cm, heightCm: 200_000 as Cm, aspect: 1, marginShare: 0.3 };
/** The index's grid cells per level, as the kernel's fixtures use them. */
export const FIXTURE_CELLS: [number, number, number, number, number] = [800, 400, 200, 100, 50];

/** A lattice point. */
export function lp(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

/**
 * An indexed ground arena whose outer ring is the L0 rectangle [x0, x1] × [y0, y1] inserted as a closed `margin` chain
 * on `terrain:1` (as M0-a-05's test support builds its frame).
 */
export function framedArena(x0: number, y0: number, x1: number, y1: number): Plat {
  const p = createPlat(FIXTURE_KEY, FIXTURE_FRAME);
  attachIndex(p, { gridCellCm: FIXTURE_CELLS });
  const r = insertChain(insertTx(p, 0), [lp(x0, y0), lp(x1, y0), lp(x1, y1), lp(x0, y1)], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!r.ok) throw new Error(`determinism: the frame ring was refused: ${r.code} ${r.detail}`);
  return p;
}

/** The half-edge from the vertex at a to the vertex at b (−1 when no edge joins them). */
export function halfEdgeAt(p: Plat, a: XY, b: XY): HalfEdgeId {
  let va = -1;
  let vb = -1;
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    if (p.vertices.x[v] === a[0] && p.vertices.y[v] === a[1]) va = v;
    if (p.vertices.x[v] === b[0] && p.vertices.y[v] === b[1]) vb = v;
  }
  if (va < 0 || vb < 0) return -1;
  for (const h of outgoing(p, va)) if (p.halfEdges.origin[h ^ 1] === vb) return h;
  return -1;
}

/** The face of the overlay's level holding a lattice point. */
export function faceHolding(o: Overlay, xy: XY): number {
  const loc = pointLocate(o.plat, o.key, o.level, lp(xy[0], xy[1]));
  if (loc.on !== 'face' || loc.level !== o.level) throw new Error(`determinism: no L${o.level} face at ${xy[0]},${xy[1]}`);
  return loc.face;
}

function endOf(e: End): VertexRef | LatticePoint {
  return Array.isArray(e) ? lp((e as XY)[0], (e as XY)[1]) : (e as VertexRef);
}

function refOf(r: Ref): ChainRef | VertexRef | StretchRef {
  if ('chain' in r) return { chain: r.chain, from: endOf(r.from), to: endOf(r.to) } as StretchRef;
  return r;
}

/** The writer call one data op stands for, on the open overlay. */
export function applyFixtureOp(o: Overlay, f: FixtureOpData): KernelResult<unknown> {
  switch (f.op) {
    case 'insertChain':
      return insertChain(o, (f.points ?? []).map(([x, y]) => lp(x, y)), f.roles ?? [], f.cls ?? 'mandatory', f.opts ?? {});
    case 'splitThrough': {
      const [a, b] = f.edge as readonly [XY, XY];
      const h = halfEdgeAt(o.plat, a, b);
      if (h < 0) throw new Error(`determinism: no edge ${a} → ${b}`);
      const at = f.at as XY;
      return splitThrough(o, h, lp(at[0], at[1]), f.row);
    }
    case 'removeEdges':
      return removeEdges(o, refOf(f.ref as Ref), f.profiles ?? []);
    case 'retypeEdges':
      return retypeEdges(o, refOf(f.ref as Ref) as ChainRef | StretchRef, f.add ?? [], f.remove ?? [], f.rekey);
    case 'clearFiner':
      return clearFiner(o, f.faces as { owner: string; level: Level }, f.clearLevel as Level);
    case 'setOwner':
      return setOwner(o, (f.at as readonly XY[]).map((xy) => faceHolding(o, xy)), f.owner as string);
    default:
      throw new Error(`determinism: no fixture op ${f.op}`);
  }
}

/** A transaction spec at `level` with the fixtures' defaults (declared form, reject, stage 8, a large work limit). */
export function fixtureSpec(level: Level, over: Partial<KernelTx> = {}): KernelTx {
  return {
    key: FIXTURE_KEY,
    level,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: over.stage ?? (8 as StageId) },
    stage: 8 as StageId,
    rederivesFrom: 8 as StageId,
    workLimit: 1_000_000,
    ...over,
  };
}

/** A data batch's declared ops (its lineage keys and indexes as given). */
export function fixtureOps(b: FixtureBatchData): KernelOp[] {
  return b.ops.map((f) => kernelOp(f.op as OpKind, f.lineage ?? [0, 0], f.index ?? 0, (o) => applyFixtureOp(o, f)));
}

/** A data batch as a determinism batch: declared ops in their listed order, or one callback issuing them in order. */
export function fixtureBatch(b: FixtureBatchData, name: string): DeterminismBatch {
  const over: Partial<KernelTx> = {
    ...(b.stage === undefined ? {} : { stage: b.stage as StageId }),
    ...(b.rederivesFrom === undefined ? {} : { rederivesFrom: b.rederivesFrom as StageId }),
    ...(b.workLimit === undefined ? {} : { workLimit: b.workLimit }),
  };
  return {
    name,
    build: (): DeterminismBatchSpec => {
      if (b.form === 'declared') return { spec: fixtureSpec(b.level, { ...over, ops: fixtureOps(b) }) };
      return {
        spec: fixtureSpec(b.level, over),
        fn: (o) => {
          for (const f of b.ops) {
            const r = applyFixtureOp(o, f);
            if (!r.ok) return r;
          }
          return { ok: true, value: null, warnings: [] };
        },
      };
    },
  };
}

/** A data sequence as a determinism sequence on a fresh square frame of its side. */
export function fixtureSequence(s: FixtureSequenceData): DeterminismSequence {
  return {
    name: s.name,
    arena: () => framedArena(0, 0, s.frame, s.frame),
    batches: s.batches.map((b, i) => fixtureBatch(b, `${i} L${b.level} ${b.form}: ${b.ops.map((o) => o.op).join('+')}`)),
  };
}

/** The `sequences` array of a sequences.json document. */
export function fixtureSequences(doc: unknown): FixtureSequenceData[] {
  const s = (doc as { sequences?: unknown }).sequences;
  if (!Array.isArray(s)) throw new Error('determinism: a fixture document holds a `sequences` array');
  return s as FixtureSequenceData[];
}
