// The constructive arenas as determinism sequences (M0-d-08; §13.1 "renumbering the arena's slots gives identical
// output"; the item's test "renumbering + next op: identical output on every constructive arena"). Every M0 case of the
// constructive set (M0-k-02) whose scenario inserts chains is read as a sequence on an L0 frame around its geometry:
// its leading insertChain steps, each one callback batch at its level, then its **next ops** — every later step of the
// scenario this harness interprets, in order (hardening round S1, N-4: no longer the one step after the leading
// insertions), else, where the scenario has none, a probe chain across the arena at the deepest level the case used.
// `runTwiceCompare` then renumbers the arena's slots before every batch, so every next op meets the constructive arena
// under other slot numbers. The steps read:
//
// * writers — insertChain (on the case's own arena; one aimed at its second arena, `arena: 'other'`, is that arena's),
//   removeEdges of a named chain, splitFace (the face found by a point strictly inside its ring, N-5), setOwner of a
//   ring's L1 face, corridorUnion over a ring's L1 faces (owned first, as S6 owns them; the spines' half-width the
//   case's `halfWidthCm`), each one batch; a district ring (`district_bound` with an `owner`) is owned by
//   `district:<owner>` in its own insertion batch, and the arena's index then partitions L2 – L4 items by district;
// * `rebuildPartitions` — the stage-end rebuild (§3.3 moment (1)) of every dirty partition, or of one district's, run on
//   the arena just before the next batch (so it runs after that batch's renumbering, on the renumbered index), or
//   before the probe when no batch follows;
// * read-only steps (queries, samples, measures, saves) — skipped: they write nothing;
// * any other writer (warp, pins, retypes, clears, segment sets, loads, a removal by stretch …) ends the reading: what
//   follows may depend on it. A case's other steps are their own items' (C-0199 (3)).
//
// The declared form (`form: 'declared'`, N-7) issues each run of leading same-level insertions as one declared batch
// (one opInsertChain per chain, lineage keys in the scenario's order) — the batches `permutationCompare` permutes —
// and the next ops as in the callback form.
import {
  attachIndex,
  corridorUnion,
  createPlat,
  faceKey,
  faceWalk,
  insertChain,
  insertTx,
  isFaceLive,
  ITEM_EDGE,
  ITEM_VERTEX,
  opInsertChain,
  rebuildAtStageEnd,
  removeEdges,
  setOwner,
  splitFace,
  type ChainClass,
  type FaceId,
  type InsertChainOpts,
  type ItemRef,
  type KernelOp,
  type KernelResult,
  type LatticePoint,
  type Level,
  type Overlay,
  type PartitionResolver,
  type Plat,
  type RoleRow,
  type SpineWidths,
} from '@plat/kernel';
import type { ConstructiveCase, ConstructiveInput, ConstructiveStep } from '../constructive/types.js';
import { faceHolding, FIXTURE_CELLS, FIXTURE_FRAME, FIXTURE_KEY, fixtureSpec, lp } from './fixtures.js';
import type { DeterminismBatch, DeterminismSequence } from './issue.js';

/** The frame's padding around a case's geometry (cm). */
export const CONSTRUCTIVE_FRAME_PAD = 5_000;
/** The lattice's bound (§3.2 (1): coordinates within ± (2²³ − 1)). */
const LATTICE_MAX = 0x7fffff;

type Pt = { readonly x: number; readonly y: number };

/** The steps that write nothing: skipped by the reading. */
const READ_ONLY = new Set([
  'query',
  'sampleProfile',
  'resolve',
  'readSlots',
  'encodeArena',
  'orient2d',
  'area2',
  'obb',
  'hull',
  'regularFit',
  'lir',
  'skeleton',
  'snap',
  'hexLattice',
  'tileRings',
  'delaunay',
  'booleans',
  'buffer',
  'offsetFace',
  'insetRing',
  'kerb',
]);

function geometryOf(input: ConstructiveInput, name: string): { pts: readonly Pt[]; closed: boolean } | null {
  if (Object.hasOwn(input.chains, name)) return { pts: input.chains[name], closed: false };
  if (Object.hasOwn(input.rings, name)) return { pts: input.rings[name], closed: true };
  return null;
}

function levelOf(s: ConstructiveStep): Level {
  const l = s.args.level;
  return (typeof l === 'number' && l >= 0 && l <= 4 ? l : 1) as Level;
}

/** The entity a case's chain is inserted under: its role and its name (one entity per named chain). */
function entityOf(s: ConstructiveStep): string {
  const name = String(s.args.chain ?? s.args.ring);
  return `${String(s.args.role ?? 'way')}:${name}`;
}

/** Is a step an insertion into the case's own arena? */
function insertsHere(s: ConstructiveStep): boolean {
  return s.op === 'insertChain' && s.args.arena !== 'other';
}

// ---- lattice geometry (exact on lattice points: every product stays below 2⁵³) ----------------------------------------

function cross(a: Pt, b: Pt, q: Pt): number {
  return (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
}

function onSegment(a: Pt, b: Pt, q: Pt): boolean {
  return cross(a, b, q) === 0 && Math.min(a.x, b.x) <= q.x && q.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= q.y && q.y <= Math.max(a.y, b.y);
}

/** Where a lattice point lies against a ring: 1 strictly inside, 0 on it, −1 outside. */
function inRing(ring: readonly Pt[], q: Pt): -1 | 0 | 1 {
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (onSegment(a, b, q)) return 0;
    if (a.y > q.y !== b.y > q.y) {
      const c = cross(a, b, q);
      if (b.y > a.y ? c > 0 : c < 0) inside = !inside;
    }
  }
  return inside ? 1 : -1;
}

/**
 * A lattice point strictly inside a ring and on none of `avoid`'s chains: beside an edge's middle, a little inward
 * (1 cm, then farther), the ring's edges in order — the first that qualifies. Null when none does.
 */
function interiorPoint(ring: readonly Pt[], avoid: readonly (readonly Pt[])[] = []): Pt | null {
  const n = ring.length;
  const clear = (q: Pt): boolean => avoid.every((c) => c.every((a, i) => i === 0 || !onSegment(c[i - 1], a, q)));
  for (const off of [1, 2, 5, 13, 40, 120]) {
    for (let i = 0; i < n; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % n];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      if (len === 0) continue;
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      for (const s of [1, -1]) {
        const q = { x: Math.round(mx + (s * off * -(b.y - a.y)) / len), y: Math.round(my + (s * off * (b.x - a.x)) / len) };
        if (inRing(ring, q) === 1 && clear(q)) return q;
      }
    }
  }
  return null;
}

// ---- districts (S6's membership, read from the scenario's district rings) -------------------------------------------

/** A district ring of the case and the district that owns its face now (the scenario's setOwner steps move it). */
interface District {
  readonly ring: readonly Pt[];
  owner: string;
}

/** A lattice point standing for an index item: a vertex's point, an edge's middle, a face's outer walk's box centre. */
function itemPoint(p: Plat, item: ItemRef): Pt {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (item.kind === ITEM_VERTEX) return { x: X[item.slot], y: Y[item.slot] };
  if (item.kind === ITEM_EDGE) {
    const a = p.halfEdges.origin[2 * item.slot];
    const b = p.halfEdges.origin[2 * item.slot + 1];
    return { x: Math.floor((X[a] + X[b]) / 2), y: Math.floor((Y[a] + Y[b]) / 2) };
  }
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  try {
    for (const h of faceWalk(p, item.level as Level, item.slot)[0] ?? []) {
      const v = p.halfEdges.origin[h];
      x0 = Math.min(x0, X[v]);
      y0 = Math.min(y0, Y[v]);
      x1 = Math.max(x1, X[v]);
      y1 = Math.max(y1, Y[v]);
    }
  } catch {
    return { x: 0, y: 0 };
  }
  return x0 === Infinity ? { x: 0, y: 0 } : { x: Math.floor((x0 + x1) / 2), y: Math.floor((y0 + y1) / 2) };
}

/** The district of an L2 – L4 item: the owners of the district rings it lies in or on (both on a shared side). */
function districtResolver(districts: readonly District[]): PartitionResolver {
  return (p, item) => {
    const at = itemPoint(p, item);
    const keys: string[] = [];
    for (const d of districts) if (inRing(d.ring, at) >= 0 && !keys.includes(d.owner)) keys.push(d.owner);
    return keys.length === 0 ? '' : keys.length === 1 ? keys[0] : keys;
  };
}

// ---- the reading -------------------------------------------------------------------------------------------------

/** The live L1 faces whose interior holds a point of the ring's interior side, in canonical key order (§3.3). */
function l1FacesInside(p: Plat, ring: readonly Pt[]): FaceId[] {
  const out: { f: FaceId; key: string }[] = [];
  for (let f = 0; f < p.slots.face[1].top; f++) {
    if (!isFaceLive(p, 1, f)) continue;
    const outer = (faceWalk(p, 1, f)[0] ?? []).map((h) => ({ x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] }));
    const q = interiorPoint(outer);
    if (q === null || inRing(ring, q) <= 0) continue;
    const [a, b] = faceKey(p, 1, f);
    const pad = (v: number): string => String(v + 0x800000).padStart(8, '0');
    out.push({ f, key: [a, b].map((v) => `${pad(p.vertices.y[v])},${pad(p.vertices.x[v])}`).join('>') });
  }
  out.sort((u, w) => (u.key < w.key ? -1 : u.key > w.key ? 1 : 0));
  return out.map((u) => u.f);
}

/** What the reading builds: the batches, and the scenario state the probe and the arena need. */
interface Reading {
  readonly batches: DeterminismBatch[];
  readonly districts: District[];
  deepest: Level;
}

/** The face of a ring at `level`, located by a point strictly inside the ring and off the cut (N-5). */
function ringFace(o: Overlay, ring: readonly Pt[], avoid: readonly (readonly Pt[])[]): FaceId {
  const q = interiorPoint(ring, avoid);
  if (q === null) throw new Error('determinism: a ring with no lattice point inside');
  return faceHolding(o, [q.x, q.y]);
}

/** A batch whose build first runs the rebuilds the scenario issued before it (on the arena it is about to run on). */
function withRebuilds(b: DeterminismBatch, rebuilds: readonly (string | undefined)[]): DeterminismBatch {
  if (rebuilds.length === 0) return b;
  const list = rebuilds.slice();
  return {
    name: b.name,
    build: (p) => {
      for (const d of list) rebuildAtStageEnd(p, d);
      return b.build(p);
    },
  };
}

/** One insertion step's call on the open overlay (its district's ownership included). */
function insertCall(s: ConstructiveStep, g: { pts: readonly Pt[]; closed: boolean }): (o: Overlay) => KernelResult<unknown> {
  const role = String(s.args.role ?? 'way');
  const cls = s.args.cls === 'optional' ? 'optional' : 'mandatory';
  const owner = role === 'district_bound' && typeof s.args.owner === 'string' ? `district:${s.args.owner}` : null;
  return (o) => {
    const r = insertChain(o, g.pts.map((q) => lp(q.x, q.y)), [{ role, entity: entityOf(s) }], cls, g.closed ? { closed: true } : {});
    if (!r.ok || owner === null) return r;
    // A district ring: its L1 face owned by its district (S6's owners; the index partitions its items by it).
    const so = setOwner(o, [ringFace(o, g.pts, [])], owner);
    return so.ok ? r : so;
  };
}

function insertBatch(input: ConstructiveInput, s: ConstructiveStep, name: string): DeterminismBatch | null {
  const g = geometryOf(input, String(s.args.chain ?? s.args.ring));
  if (g === null) return null;
  const level = levelOf(s);
  const call = insertCall(s, g);
  return { name, build: () => ({ spec: fixtureSpec(level), fn: call }) };
}

/** A run of same-level insertions as one declared batch: one opInsertChain per chain, lineage keys in step order. */
function declaredInsertBatch(input: ConstructiveInput, run: readonly { s: ConstructiveStep; i: number }[], name: string): DeterminismBatch | null {
  const level = levelOf(run[0].s);
  const ops: { lineage: [number, number]; pts: LatticePoint[]; rows: RoleRow[]; cls: ChainClass; opts: InsertChainOpts; owned: boolean }[] = [];
  for (const { s, i } of run) {
    const g = geometryOf(input, String(s.args.chain ?? s.args.ring));
    if (g === null) continue;
    const role = String(s.args.role ?? 'way');
    ops.push({
      lineage: [i + 1, 0],
      pts: g.pts.map((q) => lp(q.x, q.y)),
      rows: [{ role, entity: entityOf(s) }],
      cls: s.args.cls === 'optional' ? 'optional' : 'mandatory',
      opts: g.closed ? { closed: true } : {},
      owned: role === 'district_bound' && typeof s.args.owner === 'string',
    });
  }
  if (ops.length === 0 || ops.some((x) => x.owned)) return null;
  return {
    name,
    build: () => ({ spec: fixtureSpec(level, { ops: ops.map((x): KernelOp => opInsertChain(x.lineage, 0, x.pts, x.rows, x.cls, x.opts)) }) }),
  };
}

/** The leading insertions: callback batches, or (declared form) runs of same-level insertions, one batch per run. */
function leadingBatches(input: ConstructiveInput, inserts: readonly ConstructiveStep[], declared: boolean): DeterminismBatch[] {
  const out: DeterminismBatch[] = [];
  if (!declared) {
    inserts.forEach((s, i) => {
      const b = insertBatch(input, s, `${i} insertChain ${String(s.args.chain ?? s.args.ring)} L${levelOf(s)}`);
      if (b !== null) out.push(b);
    });
    return out;
  }
  let k = 0;
  while (k < inserts.length) {
    const run: { s: ConstructiveStep; i: number }[] = [{ s: inserts[k], i: k }];
    while (k + run.length < inserts.length && levelOf(inserts[k + run.length]) === levelOf(inserts[k])) run.push({ s: inserts[k + run.length], i: k + run.length });
    const names = run.map((x) => String(x.s.args.chain ?? x.s.args.ring)).join('+');
    const b = run.length >= 2 ? declaredInsertBatch(input, run, `${k} declared insertChain ${names} L${levelOf(inserts[k])}`) : null;
    if (b !== null) out.push(b);
    else {
      run.forEach(({ s, i }) => {
        const one = insertBatch(input, s, `${i} insertChain ${String(s.args.chain ?? s.args.ring)} L${levelOf(s)}`);
        if (one !== null) out.push(one);
      });
    }
    k += run.length;
  }
  return out;
}

/**
 * The next ops: every step after the leading insertions this harness interprets, in order, with the rebuilds before
 * the batch that follows them. Returns the batches and the rebuilds still pending at the end (for the probe).
 */
function laterBatches(input: ConstructiveInput, rest: readonly ConstructiveStep[], inserted: Map<string, ConstructiveStep>, r: Reading): (string | undefined)[] {
  let rebuilds: (string | undefined)[] = [];
  const push = (b: DeterminismBatch): void => {
    r.batches.push(withRebuilds(b, rebuilds));
    rebuilds = [];
  };
  for (const s of rest) {
    if (READ_ONLY.has(s.op) || (s.op === 'insertChain' && !insertsHere(s))) continue;
    if (s.op === 'rebuildPartitions') {
      rebuilds.push(typeof s.args.district === 'string' ? `district:${s.args.district}` : undefined);
      continue;
    }
    if (s.op === 'insertChain') {
      const name = String(s.args.chain ?? s.args.ring);
      const b = insertBatch(input, s, `next insertChain ${name} L${levelOf(s)}`);
      if (b === null) break;
      inserted.set(name, s);
      if (levelOf(s) > r.deepest) r.deepest = levelOf(s);
      push(b);
      continue;
    }
    if (s.op === 'removeEdges' && typeof s.args.chain === 'string' && inserted.has(s.args.chain)) {
      const ins = inserted.get(s.args.chain) as ConstructiveStep;
      const ref = { role: String(ins.args.role ?? 'way'), entity: entityOf(ins) };
      push({ name: `next removeEdges ${s.args.chain}`, build: () => ({ spec: fixtureSpec(levelOf(ins)), fn: (o: Overlay) => removeEdges(o, ref) }) });
      continue;
    }
    if (s.op === 'splitFace' && typeof s.args.cut === 'string' && Object.hasOwn(input.chains, s.args.cut)) {
      const ring = inserted.get(String(s.args.face));
      const cut = input.chains[s.args.cut];
      const g = ring === undefined ? null : geometryOf(input, String(s.args.face));
      if (ring === undefined || g === null || !g.closed || cut.length < 2) break;
      // The face named by a lattice point strictly inside its ring and off the cut (N-5: the cut's own middle point
      // may be a vertex of the face, where no face holds it).
      push({
        name: `next splitFace ${String(s.args.face)} by ${s.args.cut}`,
        build: () => ({
          spec: fixtureSpec(levelOf(ring)),
          fn: (o: Overlay) => splitFace(o, ringFace(o, g.pts, [cut]), cut, { rows: [{ role: 'plot_line', entity: 'probe:cut' }] }),
        }),
      });
      continue;
    }
    if (s.op === 'setOwner' && typeof s.args.face === 'string' && typeof s.args.owner === 'string' && Object.hasOwn(input.rings, s.args.face)) {
      const ring = input.rings[s.args.face];
      const owner = `district:${s.args.owner}`;
      const ringName = s.args.face;
      push({
        name: `next setOwner ${ringName} ${owner}`,
        build: () => ({
          spec: fixtureSpec(1),
          fn: (o: Overlay) => {
            // The district map moves with the face (the resolver reads it while the batch re-homes the face's items).
            const moved = r.districts.filter((d) => d.ring === ring);
            const before = moved.map((d) => d.owner);
            for (const d of moved) d.owner = owner;
            const so = setOwner(o, [ringFace(o, ring, [])], owner);
            if (!so.ok) moved.forEach((d, i) => (d.owner = before[i]));
            return so;
          },
        }),
      });
      continue;
    }
    if (s.op === 'corridorUnion' && typeof s.args.faces === 'string' && Object.hasOwn(input.rings, s.args.faces)) {
      const ring = input.rings[s.args.faces];
      const half = typeof s.args.halfWidthCm === 'string' ? Number(input.params[s.args.halfWidthCm] ?? 300) : 300;
      const widths: SpineWidths = (ch) => (ch.role === 'tunnel' || ch.role === 'way' ? { halfWidthCm: half } : null);
      // S9 over the ring's L1 faces, owned by one district first (S6's owners); the faces in canonical order.
      push({
        name: `next setOwner ${s.args.faces} district:corridor`,
        build: (p) => {
          const faces = l1FacesInside(p, ring);
          return { spec: fixtureSpec(1), fn: (o: Overlay) => setOwner(o, faces, 'district:corridor') };
        },
      });
      push({
        name: `next corridorUnion ${s.args.faces}`,
        build: (p) => {
          const faces = l1FacesInside(p, ring);
          return { spec: fixtureSpec(2), fn: (o: Overlay) => corridorUnion(o, faces, widths) };
        },
      });
      if (r.deepest < 2) r.deepest = 2;
      continue;
    }
    // A writer this harness does not interpret: what follows may depend on it.
    break;
  }
  return rebuilds;
}

/** The bounding box of every named coordinate of the input. */
function bbox(input: ConstructiveInput): [number, number, number, number] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const take = (q: Pt): void => {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  };
  for (const c of Object.values(input.chains)) c.forEach(take);
  for (const r of Object.values(input.rings)) r.forEach(take);
  for (const q of Object.values(input.points)) take(q);
  return [x0, y0, x1, y1];
}

/** The probe: a chain across the box's interior, corner to corner, a little inside it, at the deepest level used. */
function probeBatch(box: readonly number[], deepest: Level): DeterminismBatch {
  const [x0, y0, x1, y1] = box;
  const dx = Math.max(1, Math.floor((x1 - x0) / 7));
  const dy = Math.max(1, Math.floor((y1 - y0) / 11));
  const a = lp(x0 + dx, y0 + dy);
  const b = lp(x1 - dx, y1 - 2 * dy);
  return {
    name: `next probe chain L${deepest}`,
    build: () => ({ spec: fixtureSpec(deepest), fn: (o: Overlay) => insertChain(o, [a, b], [{ role: 'way', entity: 'way:probe' }], 'mandatory') }),
  };
}

/** The arena: an indexed ground frame (its L2 – L4 items partitioned by the case's districts when it has any). */
function frameArena(x0: number, y0: number, x1: number, y1: number, districts: readonly District[]): Plat {
  const p = createPlat(FIXTURE_KEY, FIXTURE_FRAME);
  attachIndex(p, districts.length === 0 ? { gridCellCm: FIXTURE_CELLS } : { gridCellCm: FIXTURE_CELLS, partitionOf: districtResolver(districts) });
  const r = insertChain(insertTx(p, 0), [lp(x0, y0), lp(x1, y0), lp(x1, y1), lp(x0, y1)], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!r.ok) throw new Error(`determinism: the frame ring was refused: ${r.code} ${r.detail}`);
  return p;
}

/** The options of `constructiveSequence`. */
interface ConstructiveSequenceOptions {
  /** How the leading insertions are issued: one callback batch each (default), or same-level runs as declared batches (N-7). */
  readonly form?: 'callback' | 'declared';
}

/**
 * A constructive case's draw as a determinism sequence (null for a case whose scenario inserts no chain, a deferred
 * case's stub, or one whose geometry leaves no room for a frame inside the lattice).
 */
export function constructiveSequence(c: ConstructiveCase, seed: number, opts: ConstructiveSequenceOptions = {}): DeterminismSequence | null {
  const input = c.generate(seed as never);
  if (input.kind !== 'input') return null;
  let k = 0;
  while (k < input.steps.length && input.steps[k].op === 'insertChain') k++;
  const inserts = input.steps.slice(0, k);
  if (inserts.length === 0) return null;
  const box = bbox(input);
  const f0 = box[0] - CONSTRUCTIVE_FRAME_PAD;
  const g0 = box[1] - CONSTRUCTIVE_FRAME_PAD;
  const f1 = box[2] + CONSTRUCTIVE_FRAME_PAD;
  const g1 = box[3] + CONSTRUCTIVE_FRAME_PAD;
  if (f0 < -LATTICE_MAX || g0 < -LATTICE_MAX || f1 > LATTICE_MAX || g1 > LATTICE_MAX) return null;
  const own = inserts.filter(insertsHere);
  const r: Reading = { batches: leadingBatches(input, own, opts.form === 'declared'), districts: [], deepest: 1 };
  const inserted = new Map<string, ConstructiveStep>();
  for (const s of own) {
    inserted.set(String(s.args.chain ?? s.args.ring), s);
    if (levelOf(s) > r.deepest) r.deepest = levelOf(s);
    const g = geometryOf(input, String(s.args.chain ?? s.args.ring));
    if (s.args.role === 'district_bound' && typeof s.args.owner === 'string' && g !== null) r.districts.push({ ring: g.pts, owner: `district:${s.args.owner}` });
  }
  const leading = r.batches.length;
  // The district map is the scenario's; each run starts it afresh (a setOwner step moves it during the run).
  const initial = r.districts.map((d) => d.owner);
  const pending = laterBatches(input, input.steps.slice(k), inserted, r);
  if (r.batches.length === leading || pending.length > 0) r.batches.push(withRebuilds(probeBatch(box, r.deepest), pending));
  const districts = r.districts;
  return {
    name: `${c.id} #${seed}${opts.form === 'declared' ? ' declared' : ''}`,
    arena: () => {
      districts.forEach((d, i) => (d.owner = initial[i]));
      return frameArena(f0, g0, f1, g1, districts);
    },
    batches: r.batches,
  };
}
