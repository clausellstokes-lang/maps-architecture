// The constructive set judged against the kernel (M0-k-04; §13.1 (2), §3.11, §3.3 *Expectations*; C-0038, C-0110,
// C-0181, C-0187): every M0 case of M0-k-02's set runs its scenario — each step one operation through the façade, each
// writer step one transaction with M0-a-14's suite — on an arena around its draw, and the last step's outcome is judged
// against the outcome the case states as data (ok, refused with its code and detail, typed, downgrade, assertion,
// static), with every property its `holds` names checked on the result. Every step before the last must return ok, and
// after every writer step the whole arena is swept (`checkCI`: every hard §3.10 row and the Euler characteristic) —
// §13.1's "Properties (checked after every operation)". A whole draw runs under the hard timeout. The numeric-core
// cases keep their own `run` (M0-a-01, judged by M0-k-02). Readings: C-0227.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  absorbSliver,
  attachIndex,
  checkCI,
  classFloorRow,
  createPlat,
  decodeArena,
  delaunay,
  encodeArena,
  faceRings,
  faceWalk,
  H128,
  hexLattice,
  hull,
  idOf,
  indexOf,
  isCorruptCache,
  isFaceLive,
  isVertexLive,
  ITEM_EDGE,
  ITEM_VERTEX,
  kernelOp,
  LATTICE,
  lir,
  obb,
  outgoing,
  overflowThreshold,
  pointLocate,
  rebuildOverflowing,
  regularFit,
  rowKey,
  rowsOn,
  skeleton,
  Stream,
  tileRings,
  booleans,
  buffer,
  utf8Bytes,
  validateSkeleton,
  type AnyProfile,
  type Chunk,
  type Cm,
  type FaceId,
  type Frame,
  type HalfEdgeId,
  type ItemRef,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type Level,
  type MoveReport,
  type Overlay,
  type Plat,
  type PlatKey,
  type Polygon,
  type SpineWidths,
  type TxEnv,
  type VertexId,
  type Warning,
} from '@plat/kernel';
import { runConstructive, type ConstructiveJudge, type ConstructiveReport } from '../constructive/set.js';
import type { ConstructiveCase, ConstructiveInput, ConstructiveStep, ConstructiveVerdict } from '../constructive/types.js';
import { arenaPrint, renumberSlots } from '../determinism/index.js';
import { compareSplit, oracleBoolean, oracleBuffer, ORACLE_ENGINES } from '../oracles/index.js';
import { ringProblems } from '../oracles/rings.js';
import { guarded, HANG_TIMEOUT_MS } from './guard.js';
import { childrenTileParent, roofOutside } from './primitives.js';
import { area2Exact, boxOf, ciProblems, cross, FRAME_ENTITY, inRegionApprox, inRing, interiorPoint, kernelOn, layFrame, lpt, onSegment, RANGE, rowProblems, spec, type Pt } from './support.js';

const GREEN: ConstructiveVerdict = { ok: true };

/** The hard timeout of one constructive draw (its whole scenario; the editing session's hundreds of batches the longest). */
export const CONSTRUCTIVE_TIMEOUT_MS = 12 * HANG_TIMEOUT_MS;
const fail = (reason: string): ConstructiveVerdict => ({ ok: false, reason });

/** The arena key of a case's draw, and of its second arena (the stale-slot case's foreign arena). */
const KEY: PlatKey = { layer: 'ground', part: 0 };
const OTHER: PlatKey = { layer: 'ground', part: 1 };
const FRAME: Frame = { widthCm: 200_000 as Cm, heightCm: 200_000 as Cm, aspect: 1, marginShare: 0.3 };
const CELLS: [number, number, number, number, number] = [800, 400, 200, 100, 50];
const PAD = 5_000;

/** What one step came to. */
export type StepOutcome = Step;
type Step =
  | { readonly kind: 'ok'; readonly value: unknown; readonly warnings: readonly Warning[] }
  | { readonly kind: 'refused'; readonly code: string; readonly detail: string; readonly refusal: KernelResult<unknown> }
  | { readonly kind: 'threw'; readonly message: string };

/** A chain or ring the scenario inserted: its entity's row and where it went. */
interface Inserted {
  readonly name: string;
  readonly role: string;
  readonly entity: string;
  readonly level: Level;
  readonly closed: boolean;
  readonly points: readonly LatticePoint[];
  readonly profile: AnyProfile | null;
}

/** A scenario's running state. */
interface Scene {
  readonly c: ConstructiveCase;
  readonly g: ConstructiveInput;
  readonly p: Plat;
  readonly others: Map<string, Plat>;
  k: Kernel;
  readonly inserted: Map<string, Inserted>;
  /** The L1 face each district ring bounds (C-0227 (6)), by its owner name. */
  readonly districts: Map<string, { face: FaceId; ring: readonly LatticePoint[] }>;
  readonly records: Map<string, unknown>;
  /** The last warp's report and the arena before it (the renumbering identity re-runs it). */
  warp: MoveReport | null;
  chunks: Chunk[] | null;
  firstChunks: Chunk[] | null;
  /** Problems found along the way (a sweep after a writer step, a property only a step can see). */
  readonly problems: string[];
  readonly env: TxEnv;
  readonly widths: SpineWidths;
  /** Each entity's profile as the last retype or removal left it (§2.2 rule 5: knots renumbered in chain order). */
  readonly profiles: Map<string, AnyProfile>;
}

// ---- the draw on an arena -------------------------------------------------------------------------------------------

/** Every coordinate of a draw. */
function coords(g: ConstructiveInput): Pt[] {
  const out: Pt[] = [...Object.values(g.points)];
  for (const rec of [g.pointSets, g.chains, g.rings]) for (const v of Object.values(rec)) out.push(...v);
  return out;
}

/** The draw translated so its box is centred on the origin — a lattice isometry, every incidence and distance kept. */
function centred(g: ConstructiveInput): ConstructiveInput {
  const b = boxOf(coords(g));
  if (b === null) return g;
  const dx = -Math.round((b[0] + b[2]) / 2);
  const dy = -Math.round((b[1] + b[3]) / 2);
  if (dx === 0 && dy === 0) return g;
  const m = (q: Pt): LatticePoint => lpt(q.x + dx, q.y + dy);
  const mr = (r: Readonly<Record<string, readonly Pt[]>>) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v.map(m)]));
  return { ...g, points: Object.fromEntries(Object.entries(g.points).map(([k, v]) => [k, m(v)])), pointSets: mr(g.pointSets), chains: mr(g.chains), rings: mr(g.rings) };
}

/** Is the scenario's first step an L0 outer ring (the case brings its own frame)? */
function bringsFrame(g: ConstructiveInput): boolean {
  const s = g.steps[0];
  return s !== undefined && s.op === 'insertChain' && s.args.level === 0 && s.args.role === 'margin';
}

/** The geometry a step names (a chain or a ring) and whether it is closed. */
function geometry(g: ConstructiveInput, name: string): { pts: readonly LatticePoint[]; closed: boolean } | null {
  if (Object.hasOwn(g.chains, name)) return { pts: g.chains[name], closed: false };
  if (Object.hasOwn(g.rings, name)) return { pts: g.rings[name], closed: true };
  return null;
}

/**
 * S6's district membership for the cases that partition by district (C-0227 (6)): an L2 – L4 item belongs to the
 * current owner of the district ring it lies in — both owners where it lies on two rings' shared side — read from the
 * arena at every call, so a re-owned block moves its items (§3.3).
 */
function districtResolver(scene: () => Scene | null) {
  return (p: Plat, item: ItemRef): string | readonly string[] => {
    const s = scene();
    if (s === null || s.districts.size === 0) return '';
    const at = itemPoint(p, item);
    const keys: string[] = [];
    for (const d of s.districts.values()) {
      if (inRing(d.ring, at) < 0) continue;
      const h = p.faces[1].owner[d.face];
      keys.push(h < 0 ? '' : idOf(p, h));
    }
    return keys.length === 0 ? '' : keys.length === 1 ? keys[0] : keys;
  };
}

/** A lattice point standing for an index item: a vertex's point, an edge's lower end nudged along it, a face's centre. */
function itemPoint(p: Plat, item: ItemRef): LatticePoint {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  if (item.kind === ITEM_VERTEX) return lpt(X[item.slot], Y[item.slot]);
  if (item.kind === ITEM_EDGE) {
    const a = p.halfEdges.origin[2 * item.slot];
    const b = p.halfEdges.origin[2 * item.slot + 1];
    return lpt(Math.floor((X[a] + X[b]) / 2), Math.floor((Y[a] + Y[b]) / 2));
  }
  // A face by its outer walk's box centre (as M0-a-15's district resolver reads it), the walk read mid-batch.
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
    return lpt(0, 0);
  }
  return x0 === Infinity ? lpt(0, 0) : lpt(Math.floor((x0 + x1) / 2), Math.floor((y0 + y1) / 2));
}

/** An arena for the draw: the case's own L0 frame, or a frame around its geometry; null where none fits. */
function arenaFor(g: ConstructiveInput, resolver: ReturnType<typeof districtResolver>, key: PlatKey = KEY): Plat | null {
  const p = createPlat(key, FRAME);
  attachIndex(p, { gridCellCm: CELLS, partitionOf: resolver });
  if (bringsFrame(g)) return p;
  const b = boxOf(coords(g)) ?? [0, 0, 0, 0];
  const [x0, y0, x1, y1] = [b[0] - PAD, b[1] - PAD, b[2] + PAD, b[3] + PAD];
  if (x0 < -RANGE || y0 < -RANGE || x1 > RANGE || y1 > RANGE) return null;
  layFrame(p, [lpt(x0, y0), lpt(x1, y0), lpt(x1, y1), lpt(x0, y1)]);
  return p;
}

/** The slot-free print of an arena without its version line. */
function topology(p: Plat): string {
  const s = arenaPrint(p);
  const i = s.lastIndexOf('\n#version');
  return i < 0 ? s : s.slice(0, i);
}

// ---- steps ----------------------------------------------------------------------------------------------------------

const asStep = (r: KernelResult<unknown>): Step => (r.ok ? { kind: 'ok', value: r.value, warnings: r.warnings } : { kind: 'refused', code: r.code, detail: r.detail, refusal: r });

/** A batch through the façade: the commit's value as the step's value. */
function batch(s: Scene, level: Level, fn: (o: Overlay) => KernelResult<unknown>, over: Partial<KernelTx> = {}, k: Kernel = s.k): Step {
  const r = k.tx(spec(level, over), fn);
  if (!r.ok) return asStep(r);
  return { kind: 'ok', value: r.value.value, warnings: r.warnings };
}

/** A number parameter a step names (its value in `params`, or a literal). */
function num(g: ConstructiveInput, v: string | number | boolean | undefined): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && Object.hasOwn(g.params, v)) return g.params[v] as number;
  throw new Error(`constructive: no number ${String(v)}`);
}

/** The face of `level` a ring of the draw bounds (by an interior point), or null. */
function faceOfRing(p: Plat, ring: readonly LatticePoint[], level: Level): { face: FaceId; level: Level } | null {
  const q = interiorPoint(ring);
  if (q === null) return null;
  const loc = pointLocate(p, p.key, level, q);
  return loc.on === 'face' ? { face: loc.face, level: loc.level } : null;
}

/** The knots a step's `profile: 'knots'` names: the params' indices, values and role, as insertChain rows and a profile. */
function knotsOf(g: ConstructiveInput, entity: string): { knots: { index: number; role: string; ordinal: number }[]; profile: AnyProfile } {
  const idx = g.params.knots as number[];
  const values = g.params.knotValues as number[];
  const role = String(g.params.knotRole);
  return {
    knots: idx.map((index, ordinal) => ({ index, role, ordinal })),
    profile: { knotRole: role, values: values.slice(), interp: g.params.interpolation === 'step' ? 'step' : 'linear' } as AnyProfile,
  };
}

/** The vertex-role rows a step's gate ends name: `gate_end` on the chain's points in the named set (ordinals in order). */
function gateEnds(g: ConstructiveInput, pts: readonly LatticePoint[], set: readonly Pt[]): { index: number; role: string; ordinal: number }[] {
  const out: { index: number; role: string; ordinal: number }[] = [];
  pts.forEach((q, i) => {
    if (set.some((u) => u.x === q.x && u.y === q.y)) out.push({ index: i, role: 'gate_end', ordinal: out.length });
  });
  return out;
}

function stepInsert(s: Scene, st: ConstructiveStep, i: number): Step {
  const g = s.g;
  const a = st.args;
  const name = String(a.chain ?? a.ring);
  const geo = geometry(g, name);
  if (geo === null) throw new Error(`constructive: step ${String(i)} names no chain or ring ${name}`);
  const level = a.level as Level;
  const role = String(a.role);
  const entity = typeof a.owner === 'string' && role !== 'district_bound' ? `entity:${a.owner}` : `${role}:${name}`;
  const knots: { index: number; role: string; ordinal: number }[] = [];
  let profile: AnyProfile | null = null;
  if (a.profile === 'knots') {
    const k = knotsOf(g, entity);
    knots.push(...k.knots);
    profile = k.profile;
  }
  if (typeof a.gateEnds === 'string') knots.push(...gateEnds(g, geo.pts, g.pointSets[a.gateEnds]));
  if (typeof a.gateEnd === 'string') knots.push(...gateEnds(g, geo.pts, [g.points[a.gateEnd]]));
  // A ring a later step pins carries a junction row on every vertex (pinVertices takes vertex refs, §3.4).
  if (g.steps.some((x) => x.op === 'pinVertices' && x.args.ring === name)) geo.pts.forEach((_, index) => knots.push({ index, role: 'junction', ordinal: 0 }));
  const cls = a.cls === 'optional' ? 'optional' : 'mandatory';
  const over: Partial<KernelTx> = typeof a.workLimit === 'string' ? { workLimit: num(g, a.workLimit) } : {};
  const target = a.arena === 'other' ? (s.others.get('other') as Plat) : s.p;
  const k = target === s.p ? s.k : kernelOn([s.p, target], { base: s.env, spineWidths: s.widths, context: { chainParts: s.env.chainParts as NonNullable<TxEnv['chainParts']> } });
  const opts = { ...(geo.closed ? { closed: true } : {}), ...(knots.length > 0 ? { knots } : {}) };
  if (target !== s.p) over.key = target.key;
  const r = batch(s, level, (o) => {
    const ins = k.geom.insertChain(o, geo.pts, [{ role, entity }], cls, opts);
    if (!ins.ok || role !== 'district_bound' || typeof a.owner !== 'string') return ins;
    // A district ring: its L1 face owned by its district (S6's owners), the partition key the resolver reads.
    const f = faceOfRing(o.plat, geo.pts, 1);
    if (f === null) return ins;
    const so = k.geom.setOwner(o, [f.face], `district:${a.owner}`);
    return so.ok ? ins : so;
  }, over, k);
  if (r.kind === 'ok') {
    s.inserted.set(name, { name, role, entity, level, closed: geo.closed, points: geo.pts, profile });
    if (profile !== null) s.profiles.set(entity, profile);
    if (role === 'district_bound' && typeof a.owner === 'string') {
      const f = faceOfRing(s.p, geo.pts, 1);
      if (f !== null) s.districts.set(String(a.owner), { face: f.face, ring: geo.pts });
    }
  }
  return r;
}

/** The face a step's ring names at the batch's level (or the coarser record that is its own child there). */
function faceArg(s: Scene, ringName: string, level: Level): { face: FaceId; level: Level } | null {
  const ring = s.g.rings[ringName];
  return ring === undefined ? null : faceOfRing(s.p, ring, level);
}

function stepSplit(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  const level = (typeof a.level === 'number' ? a.level : 1) as Level;
  const f = faceArg(s, String(a.face), level);
  if (f === null) throw new Error('constructive: the split names no face');
  const cut = g.chains[String(a.cut)];
  const role = typeof a.role === 'string' ? a.role : 'plot_line';
  const rows = [{ role, entity: `${role}:cut` }];
  const opts = f.level === level ? { rows } : { rows, faceLevel: f.level };
  const over: Partial<KernelTx> = {};
  if (a.expect === 'classFloor') {
    over.expect = [classFloorRow('constructive')];
    over.onFail = a.onFail as KernelTx['onFail'];
  } else if (a.expect === 'check') {
    over.expect = [{ name: 'maxFaceCount', scope: 'batch', class: 'hard', kind: 'check', check: 'maxFaceCount' }];
    over.onFail = a.onFail as KernelTx['onFail'];
  }
  s.records.set('splitParent', { face: f.face, level: f.level, rings: faceRings(s.p, f.level, f.face) });
  return batch(s, level, (o) => s.k.geom.splitFace(o, f.face, cut, opts), over);
}

/** The uniform drag of a warp: (dragX, dragY) everywhere — the warp moves only the region's vertices (§3.6). */
function dragField(g: ConstructiveInput) {
  const dx = num(g, 'dragX');
  const dy = num(g, 'dragY');
  return { displacement: () => ({ x: dx, y: dy }) };
}

function stepWarp(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  const level = a.fromLevel as Level;
  const region = g.rings[String(a.region)];
  // The lock layer's injected list (§7.2; M2a's): the step's held entity and every inserted geometry params.held names.
  const names = new Set<string>([...(typeof a.held === 'string' ? [a.held] : []), ...((g.params.held as string[] | undefined) ?? [])]);
  const held = [...names].filter((n) => s.inserted.has(n)).map((n) => {
    const ins = s.inserted.get(n) as Inserted;
    return { entity: ins.entity, ref: { role: ins.role, entity: ins.entity } };
  });
  const run = (p: Plat): { r: Step; report: MoveReport | null } => {
    const k = p === s.p ? s.k : kernelOn([p], { base: s.env, spineWidths: s.widths, context: { chainParts: s.env.chainParts as NonNullable<TxEnv['chainParts']> } });
    let report: MoveReport | null = null;
    const r = batch(s, level, (o) => {
      const w = k.geom.warp(o, dragField(g), level, region, undefined, { held });
      if (w.ok) report = w.value;
      return w;
    }, {}, k);
    return { r, report };
  };
  if (a.renumberThenRepeat === true) {
    // §13.1: the same warp on the arena with its slots renumbered gives identical output.
    const copy = renumberSlots(s.p, 7, { mode: 'random' });
    const twin = run(copy);
    const main = run(s.p);
    s.warp = main.report;
    if (main.r.kind !== twin.r.kind) s.problems.push(`renumbering: the warp ${main.r.kind} on the arena, ${twin.r.kind} renumbered`);
    else if (topology(s.p) !== topology(copy)) s.problems.push('renumbering: the warped arena differs from the warped renumbered arena');
    s.records.set('renumbered', true);
    return main.r;
  }
  const out = run(s.p);
  s.warp = out.report;
  return out.r;
}

function chainRef(s: Scene, name: string): { role: string; entity: string } {
  const ins = s.inserted.get(name);
  if (ins !== undefined) return { role: ins.role, entity: ins.entity };
  // An owner's entity (`stretchOf: 'E'`): every inserted chain of that owner shares it.
  for (const x of s.inserted.values()) if (x.entity === `entity:${name}`) return { role: x.role, entity: x.entity };
  throw new Error(`constructive: no inserted chain ${name}`);
}

function levelOf(s: Scene, name: string): Level {
  const ins = s.inserted.get(name);
  if (ins !== undefined) return ins.level;
  for (const x of s.inserted.values()) if (x.entity === `entity:${name}`) return x.level;
  return 1;
}

/** The far part of a chain from a point `from`, away from `other` (N-10's reading): the point and the chain's end beyond it. */
function farEnd(pts: readonly LatticePoint[], from: Pt, other: Pt): LatticePoint {
  const i = pts.findIndex((q) => q.x === from.x && q.y === from.y);
  const j = pts.findIndex((q) => q.x === other.x && q.y === other.y);
  return j < i ? pts[pts.length - 1] : pts[0];
}

function stepRemove(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  if (typeof a.chain === 'string') {
    const ref = chainRef(s, a.chain);
    const prof = s.profiles.get(ref.entity);
    return batch(s, levelOf(s, a.chain), (o) => s.k.geom.removeEdges(o, ref, isProfile(prof) ? [prof] : []));
  }
  const of = String(a.stretchOf);
  const ref = chainRef(s, of);
  const from = g.points[String(a.from)];
  const to = g.points[String(a.to)];
  const prof = s.profiles.get(ref.entity);
  const r = batch(s, levelOf(s, of), (o) => s.k.geom.removeEdges(o, { chain: ref, from, to }, isProfile(prof) ? [prof] : []));
  if (r.kind === 'ok') {
    const rest = (r.value as { profiles?: { value?: unknown }[] }).profiles?.[0];
    if (rest !== undefined) {
      if (rest.value === undefined) s.profiles.delete(ref.entity);
      else s.profiles.set(ref.entity, rest.value as AnyProfile);
    }
  }
  return r;
}

function isProfile(v: unknown): v is AnyProfile {
  return typeof v === 'object' && v !== null && 'knotRole' in v;
}

function stepRetype(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  const name = String(a.chain);
  const ins = s.inserted.get(name) as Inserted;
  const ref = { role: ins.role, entity: ins.entity };
  const second = `${ins.entity}#part`;
  const profiles = ins.profile === null ? [] : [{ from: ins.profile }];
  if (a.rekey === 'split') {
    const at = ins.points[num(g, a.at)];
    const end = ins.points[ins.points.length - 1];
    const r = batch(s, ins.level, (o) => s.k.geom.retypeEdges(o, { chain: ref, from: at, to: end }, [], [], { from: ins.entity, to: second, profiles }));
    if (r.kind === 'ok') {
      s.records.set('split', r.value);
      track(s, ins.entity, second, r.value);
    }
    return r;
  }
  if (a.rekey === 'join') {
    const split = s.records.get('split') as { profiles: { knotRole: string; from?: unknown; to: unknown }[] } | undefined;
    const pr = split?.profiles[0];
    const toProfile = pr !== undefined && typeof pr.to === 'object' ? (pr.to as AnyProfile) : undefined;
    const fromProfile = pr !== undefined && typeof pr.from === 'object' ? (pr.from as AnyProfile) : undefined;
    const r = batch(s, ins.level, (o) =>
      s.k.geom.retypeEdges(o, { role: ins.role, entity: second }, [], [], { from: second, to: ins.entity, ...(toProfile === undefined ? {} : { profiles: [{ from: toProfile, ...(fromProfile === undefined ? {} : { to: fromProfile }) }] }) }),
    );
    if (r.kind === 'ok') {
      s.records.set('joined', r.value);
      track(s, second, ins.entity, r.value);
    }
    return r;
  }
  // farPart: the part beyond `from`, away from the other junction (N-10), moved to a second entity first (§3.3 rule 2).
  const from = g.points[String(a.from)];
  const otherName = Object.keys(g.points).find((k) => k !== a.from && /^j\d$/.test(k)) as string;
  const end = farEnd(ins.points, from, g.points[otherName]);
  const r = batch(s, ins.level, (o) => s.k.geom.retypeEdges(o, { chain: ref, from, to: end }, [], [], { from: ins.entity, to: second, profiles }));
  if (r.kind === 'ok') {
    s.records.set('farPart', { entity: second, value: r.value });
    track(s, ins.entity, second, r.value);
  }
  return r;
}

/** A profile out of a retype or a removal: the knot profile, or the scalar a part with no knot left takes. */
type ProfileNow = AnyProfile | number | string;

/** The profiles a retype hands back, kept per entity (§2.2 rule 5: both entities' knots renumbered from 0). */
function track(s: Scene, from: string, to: string, value: unknown): void {
  const out = (value as { profiles?: { from?: unknown; to?: unknown }[] }).profiles?.[0];
  if (out === undefined) return;
  if (out.from !== undefined) s.profiles.set(from, out.from as AnyProfile);
  else s.profiles.delete(from);
  s.profiles.set(to, out.to as AnyProfile);
}

function stepSample(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  const name = String(a.chain ?? a.ring);
  const ins = s.inserted.get(name) as Inserted;
  const atCm = a.atCm === 'perVertex' ? 'perVertex' : (num(g, a.atCm) as Cm);
  const sample = (entity: string): { values: (number | string)[]; perVertex: (number | string)[] } => {
    const prof: ProfileNow | undefined = s.profiles.get(entity) ?? ins.profile ?? undefined;
    if (!isProfile(prof)) {
      // A part with no knot left reads its scalar everywhere (§2.2 rule 5); a part with no edge, nothing.
      const n = runsOf(s, ins.role, entity).reduce((t, r) => t + r.length, 0);
      return { values: prof === undefined || n === 0 ? [] : [prof], perVertex: prof === undefined ? [] : Array.from({ length: n }, () => prof) };
    }
    return { values: s.k.geom.sampleProfile(prof, entity, s.p.key, atCm), perVertex: s.k.geom.sampleProfile(prof, entity, s.p.key, 'perVertex') };
  };
  const main = sample(ins.entity);
  const second = `${ins.entity}#part`;
  const length = runsOf(s, ins.role, ins.entity).reduce((t, r) => t + r.reduce((u, q, i) => (i === 0 ? u : u + Math.hypot(q.x - r[i - 1].x, q.y - r[i - 1].y)), 0), 0);
  const knots = s.p.slots.role.top > 0 ? knotCount(s, ins.entity) : 0;
  const out: { values: (number | string)[]; perVertex: (number | string)[]; second?: (number | string)[]; length: number; knots: number } = { ...main, length, knots };
  if (s.profiles.has(second)) out.second = sample(second).perVertex;
  if (typeof a.record === 'string') s.records.set(`sample:${a.record}`, out);
  return { kind: 'ok', value: out, warnings: [] };
}

/** The knot rows an entity's profile has on the arena (its knot role, any ordinal). */
function knotCount(s: Scene, entity: string): number {
  const role = s.g.params.knotRole;
  if (typeof role !== 'string') return 0;
  let n = 0;
  for (let v = 0; v < s.p.slots.vertex.top; v++) {
    if (!isVertexLive(s.p, v)) continue;
    for (const r of rowsOn(s.p, 'vertex', v)) {
      const k = rowKey(s.p, r);
      if (k.role === role && k.entity === entity) n++;
    }
  }
  return n;
}

/** A box of a ring of the draw, as a query box. */
function boxArg(ring: readonly Pt[]) {
  const b = boxOf(ring) as number[];
  return { minX: b[0], minY: b[1], maxX: b[2], maxY: b[3] };
}

function stepQuery(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  if (typeof a.around === 'string') {
    const q = g.points[a.around];
    const levels = String(a.levels).split(',').map(Number);
    const out = levels.map((l) => {
      const r = s.k.index.query(s.p.key, l as Level, { minX: q.x - 2, minY: q.y - 2, maxX: q.x + 2, maxY: q.y + 2 });
      return { level: l, vertices: r.vertices.map((v) => [s.p.vertices.x[v], s.p.vertices.y[v], s.p.vertices.level[v]]) };
    });
    s.records.set('around', out);
    return { kind: 'ok', value: out, warnings: [] };
  }
  const level = num(g, a.level) as Level;
  const box = boxArg(g.rings[String(a.box)]);
  const r = s.k.index.query(s.p.key, level, box);
  const value = { level, vertices: [...r.vertices], edges: [...r.edges], faces: [...r.faces], expect: a.expect, edgeEntities: r.edges.map((h) => entitiesOn(s.p, h)) };
  if (typeof a.record === 'string') s.records.set(`query:${a.record}`, value);
  const list = (s.records.get('queries') as unknown[] | undefined) ?? [];
  list.push(value);
  s.records.set('queries', list);
  return { kind: 'ok', value, warnings: [] };
}

/** The entities whose edge rows lie on a half-edge's pair. */
function entitiesOn(p: Plat, h: HalfEdgeId): string[] {
  return rowsOn(p, 'edge', h).map((r) => rowKey(p, r).entity);
}

function stepRebuild(s: Scene, st: ConstructiveStep): Step {
  const d = st.args.district;
  const n = s.k.index.rebuildAtStageEnd(s.p.key, typeof d === 'string' ? `district:${d}` : undefined);
  s.records.set('rebuilt', ((s.records.get('rebuilt') as number | undefined) ?? 0) + n);
  return { kind: 'ok', value: n, warnings: [] };
}

function stepSegments(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  const sites = g.pointSets[String(a.sites)];
  const len = Number(a.lengthCm);
  const level = Number(a.level) as Level;
  const role = String(a.role);
  const seg = (q: Pt, i: number, o: Overlay) => s.k.geom.insertChain(o, [lpt(q.x, q.y), lpt(q.x + len, q.y)], [{ role, entity: `${role}:${String(a.sites)}${String(i)}` }], 'mandatory');
  if (a.oneBatchEach !== true) {
    return batch(s, level, (o) => {
      for (let i = 0; i < sites.length; i++) {
        const r = seg(sites[i], i, o);
        if (!r.ok) return r;
      }
      return { ok: true, value: null, warnings: [] };
    });
  }
  // An editing session: one batch per segment, rebuild moment (2) after every commit (a count, never a clock, §3.3).
  const idx = indexOf(s.p);
  const checks: string[] = [];
  let rebuilt = 0;
  for (let i = 0; i < sites.length; i++) {
    const r = batch(s, level, (o) => seg(sites[i], i, o));
    if (r.kind !== 'ok') return r;
    const over = idx.partitions.filter((part) => part.level === level && part.pending.size > overflowThreshold(part.keys.length)).map((part) => part.id);
    const under = idx.partitions.filter((part) => part.level === level && part.pending.size > 0 && part.pending.size <= overflowThreshold(part.keys.length)).map((part) => [part.id, part.pending.size] as const);
    const n = rebuildOverflowing(s.p);
    rebuilt += n;
    if (n !== over.length) checks.push(`after edit ${String(i)}: ${String(n)} partitions rebuilt, ${String(over.length)} past the threshold`);
    for (const [id, size] of under) if (idx.partitions[id].pending.size !== size) checks.push(`after edit ${String(i)}: partition ${String(id)} rebuilt below its threshold`);
  }
  s.records.set('thresholdChecks', checks);
  s.records.set('overflowRebuilds', rebuilt);
  return { kind: 'ok', value: rebuilt, warnings: [] };
}

function stepService(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  switch (st.op) {
    case 'obb':
      return asStep(obb(g.rings[String(a.ring)]));
    case 'hull':
      return asStep(hull(g.rings[String(a.ring)]));
    case 'lir':
      return asStep(lir(g.rings[String(a.ring)]));
    case 'regularFit': {
      const ring = g.rings[String(a.ring)];
      const r = regularFit(ring);
      s.records.set(`fit:${String(a.ring)}`, r);
      if (a.rotations === 'all' && r.ok) {
        const n = ring.length;
        const runs: { rot: number; rev: boolean; r: KernelResult<unknown> }[] = [];
        for (let k = 0; k < n; k++) {
          runs.push({ rot: k, rev: false, r: regularFit([...ring.slice(k), ...ring.slice(0, k)]) });
          if (a.reversed === true) runs.push({ rot: k, rev: true, r: regularFit([...ring.slice(k), ...ring.slice(0, k)].reverse()) });
        }
        s.records.set('fitRuns', runs);
      }
      return asStep(r);
    }
    case 'skeleton': {
      const rings = String(a.rings).split(',').map((n) => g.rings[n]) as Polygon[];
      return asStep(skeleton(rings, a.use as 'roof' | 'spine'));
    }
    case 'hexLattice': {
      const region = a.region === '' ? [] : [g.rings[String(a.region)]];
      const rng = new Stream(H128(utf8Bytes(`constructive/hexLattice/${String(g.seed)}`)));
      const h = hexLattice(region, num(g, a.spacingCm), num(g, a.jitterCm), rng);
      return { kind: 'ok', value: h, warnings: [] };
    }
    case 'delaunay':
      return asStep(delaunay(g.pointSets[String(a.sites)]));
    case 'tileRings': {
      const names = String(a.rings).split(',').filter((n) => n.length > 0);
      return asStep(tileRings(names.map((n) => g.rings[n])));
    }
    case 'booleans':
      return asStep(booleans(a.op as 'union', [g.rings[String(a.a)].slice()], [g.rings[String(a.b)].slice()], a.fill as 'nonzero'));
    case 'buffer': {
      const names = String(a.chains).split(',').filter((n) => n.length > 0);
      return asStep(buffer(names.map((n) => g.chains[n]), num(g, a.halfWidthCm), a.joins as 'round', a.ends as 'round'));
    }
    default:
      throw new Error(`constructive: no service ${st.op}`);
  }
}

/** A face service of the open transaction (`offsetFace`, `insetRing`, `kerb`) on the ring's face, in an L1 batch. */
function stepFaceService(s: Scene, st: ConstructiveStep): Step {
  const g = s.g;
  const a = st.args;
  const f = faceArg(s, String(a.face), 1);
  if (f === null) throw new Error('constructive: the service names no face');
  s.records.set('serviceFace', faceRings(s.p, f.level, f.face));
  let out: KernelResult<unknown> | null = null;
  s.k.tx(spec(1), () => {
    if (st.op === 'offsetFace') {
      const d = g.params[String(a.perEdgeCm)] as number[];
      const n = faceRings(s.p, f.level, f.face).reduce((t, r) => t + r.length, 0);
      out = s.k.geom.offsetFace(f.face, Array.from({ length: n }, (_, i) => d[i % d.length]));
    } else if (st.op === 'insetRing') out = s.k.geom.insetRing(f.face, num(g, a.dCm));
    else out = s.k.geom.kerb(f.face);
    return { ok: true, value: null, warnings: [] };
  });
  return asStep(out as unknown as KernelResult<unknown>);
}

function stepArenaBlock(s: Scene, st: ConstructiveStep): Step {
  const a = st.args;
  if (st.op === 'encodeArena') {
    const chunks = encodeArena(s.p);
    if (a.compare === 'first') {
      const same = s.firstChunks !== null && sameBlock(chunks, s.firstChunks);
      s.records.set('sameAsFirst', same);
    } else s.firstChunks = chunks;
    s.chunks = chunks;
    return { kind: 'ok', value: chunks, warnings: [] };
  }
  if (st.op === 'corruptChunk') {
    const chunks = s.chunks as Chunk[];
    const at = num(s.g, a.at);
    const how = String(a.how);
    const last = chunks.length - 1;
    if (how === 'flip-byte') {
      const bytes = chunks[last].bytes.slice();
      bytes[Math.floor(at * (bytes.length - 1))] ^= 0x41;
      s.chunks = [...chunks.slice(0, last), { ref: chunks[last].ref, bytes }];
    } else if (how === 'truncate') {
      const bytes = chunks[last].bytes.slice(0, Math.floor(at * (chunks[last].bytes.length - 1)));
      s.chunks = [...chunks.slice(0, last), { ref: H128(bytes), bytes }];
    } else {
      // The routes chunk of the arena holding its outer ring alone: the later chunks' references dangle.
      const ring = createPlat(KEY, FRAME);
      attachIndex(ring, { gridCellCm: CELLS });
      const outer = s.inserted.get('outer') as Inserted;
      const k = kernelOn([ring]);
      k.tx(spec(0), (o) => k.geom.insertChain(o, outer.points, [{ role: outer.role, entity: outer.entity }], 'mandatory', { closed: true }));
      s.chunks = [encodeArena(ring)[0], ...chunks.slice(1)];
    }
    return { kind: 'ok', value: s.chunks, warnings: [] };
  }
  // decodeArena: the block loaded into a fresh arena (the loaded arena replaces the case's for the next steps).
  const r = decodeArena(s.chunks as Chunk[], s.p.key, { index: { gridCellCm: CELLS } });
  if (!r.ok) return asStep(r);
  s.records.set('loaded', r.value);
  return { kind: 'ok', value: r.value, warnings: [] };
}

function sameBlock(a: readonly Chunk[], b: readonly Chunk[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].bytes.length !== b[i].bytes.length) return false;
    for (let k = 0; k < a[i].bytes.length; k++) if (a[i].bytes[k] !== b[i].bytes[k]) return false;
    for (let k = 0; k < 4; k++) if (a[i].ref[k] !== b[i].ref[k]) return false;
  }
  return true;
}

/** `regenerate`: the scenario's insertions again on a fresh arena — each level's insertions one declared batch, its ops in reverse issue order (canonical order makes the order irrelevant, §3.3). */
function stepRegenerate(s: Scene): Step {
  const fresh = createPlat(KEY, FRAME);
  attachIndex(fresh, { gridCellCm: CELLS });
  const k = kernelOn([fresh]);
  const list = [...s.inserted.values()];
  const levels = [...new Set(list.map((x) => x.level))].sort((x, y) => x - y);
  for (const l of levels) {
    const at = list.filter((x) => x.level === l);
    const ops = at
      .map((x, i) => kernelOp('insertChain', [1, i + 1], 0, (o) => k.geom.insertChain(o, x.points, [{ role: x.role, entity: x.entity }], 'mandatory', x.closed ? { closed: true } : {})))
      .reverse();
    const r = k.tx(spec(l, { ops }));
    if (!r.ok) return asStep(r);
  }
  // The regenerated arena replaces the case's: the next encode compares it with the first.
  s.chunks = encodeArena(fresh);
  s.records.set('regenerated', fresh);
  (s as { p: Plat }).p = fresh;
  s.k = k;
  return { kind: 'ok', value: null, warnings: [] };
}

function stepResolve(s: Scene, st: ConstructiveStep): Step {
  const a = st.args;
  if (typeof a.chainOf === 'string') {
    const ref = { role: 'way', entity: `entity:${a.chainOf}` };
    const r = s.k.resolve(ref, s.p.key);
    s.records.set('resolved', r);
    if (a.stored === true) s.records.set('storedCheck', checkCI(s.p, { refs: [ref] }).find((x) => x.name === 'references-resolve'));
    return { kind: 'ok', value: r, warnings: [] };
  }
  const ins = s.inserted.get(String(a.chain)) as Inserted;
  const r = s.k.resolve({ role: ins.role, entity: ins.entity }, s.p.key);
  s.records.set('slots', r);
  return { kind: 'ok', value: r, warnings: [] };
}

function stepReadSlots(s: Scene, st: ConstructiveStep): Step {
  const held = s.records.get('slots');
  const key = st.args.arena === 'other' ? OTHER : s.p.key;
  const k = kernelOn([s.p, ...s.others.values()], { base: s.env, spineWidths: s.widths });
  k.assertCurrent(held, key); // a stale or foreign slot: the debug build's assertion (it throws)
  return { kind: 'ok', value: null, warnings: [] };
}

/** Runs one step; a throw is the step's outcome (an `assertion` case expects it). */
function runStep(s: Scene, st: ConstructiveStep, i: number): Step {
  try {
    switch (st.op) {
      case 'insertChain':
        return stepInsert(s, st, i);
      case 'splitFace':
        return stepSplit(s, st);
      case 'warp':
        return stepWarp(s, st);
      case 'removeEdges':
        return stepRemove(s, st);
      case 'retypeEdges':
        return stepRetype(s, st);
      case 'sampleProfile':
        return stepSample(s, st);
      case 'query':
        return stepQuery(s, st);
      case 'rebuildPartitions':
        return stepRebuild(s, st);
      case 'insertSegments':
        return stepSegments(s, st);
      case 'setOwner': {
        const f = faceArg(s, String(st.args.face), 1) as { face: FaceId };
        return batch(s, 1, (o) => s.k.geom.setOwner(o, [f.face], `district:${String(st.args.owner)}`));
      }
      case 'pinVertices': {
        const ins = s.inserted.get(String(st.args.ring)) as Inserted;
        return batch(s, ins.level, (o) => s.k.geom.pinVertices(o, [{ role: 'junction', entity: ins.entity }]));
      }
      case 'clearFiner': {
        // The L1 face on the finer chain's side owned first (S6's owners), then its finer content cleared (§3.3).
        const finer = s.inserted.get(String(st.args.side)) as Inserted;
        const loc = pointLocate(s.p, s.p.key, 1, finer.points[0]);
        if (loc.on !== 'face') throw new Error('constructive: the finer chain lies in no L1 face');
        const owned = batch(s, 1, (o) => s.k.geom.setOwner(o, [loc.face], 'district:finer'));
        if (owned.kind !== 'ok') return owned;
        return batch(s, 1, (o) => s.k.geom.clearFiner(o, { owner: 'district:finer', level: 1 }, 1), { rederivesFrom: 0 as KernelTx['rederivesFrom'] });
      }
      case 'corridorUnion': {
        // S9 over the district: every L1 face inside the named ring, owned by its district first (S6's owners).
        const ring = s.g.rings[String(st.args.faces)];
        const faces: FaceId[] = [];
        for (let f = 0; f < s.p.slots.face[1].top; f++) {
          if (!isFaceLive(s.p, 1, f)) continue;
          const q = interiorPoint(faceRings(s.p, 1, f)[0]);
          if (q !== null && inRing(ring, q) > 0) faces.push(f);
        }
        const owned = batch(s, 1, (o) => s.k.geom.setOwner(o, faces, 'district:corridor'));
        if (owned.kind !== 'ok') return owned;
        return batch(s, 2, (o) => s.k.geom.corridorUnion(o, faces));
      }
      case 'tx':
        return asStep(s.k.tx(spec(1)));
      case 'offsetFace':
      case 'insetRing':
      case 'kerb':
        return stepFaceService(s, st);
      case 'encodeArena':
      case 'decodeArena':
      case 'corruptChunk':
        return stepArenaBlock(s, st);
      case 'regenerate':
        return stepRegenerate(s);
      case 'resolve':
        return stepResolve(s, st);
      case 'readSlots':
        return stepReadSlots(s, st);
      default:
        return stepService(s, st);
    }
  } catch (e) {
    return { kind: 'threw', message: e instanceof Error ? e.message : String(e) };
  }
}

/** The writer steps (the sweep runs after each). */
const WRITERS = new Set(['insertChain', 'splitFace', 'warp', 'removeEdges', 'retypeEdges', 'setOwner', 'pinVertices', 'clearFiner', 'corridorUnion', 'insertSegments', 'regenerate']);

// ---- the judge --------------------------------------------------------------------------------------------------------

/** The scenario's whole run: the steps in order, the sweep after each writer, the last step's outcome. */
interface Run {
  readonly scene: Scene;
  readonly last: Step;
  /** Before the last step: the arena's version and print (version-kept). */
  readonly versionBefore: number;
  readonly printBefore: string;
  readonly faceCountBefore: number;
}

/** The services and checks every case's transactions carry: the class floor, the named check, the repairer, the part counts. */
function envFor(g: ConstructiveInput, ownersParts: ReadonlyMap<string, number>): TxEnv {
  const floor = { minWidthCm: Number(g.params.minWidthCm ?? 1), minAreaCm2: Number(g.params.minAreaCm2 ?? 1), minAngleCdeg: Number(g.params.minAngleCdeg ?? 0) };
  const max = Number(g.params.maxFaceCount ?? Infinity);
  return {
    floors: (cls) => (cls === 'constructive' ? floor : undefined),
    checks: { maxFaceCount: (view) => (view.faces.length > max ? `${String(view.faces.length)} faces, at most ${String(max)}` : null) },
    repair: (o, face, f) => absorbSliver(o, face, f),
    // An owner named by k insertions of a linear role declares k parts (C-0227 (5); integration-g7 N-1).
    chainParts: (role, entity) => ownersParts.get(entity) ?? (role === 'way' || role === 'wall' || role === 'tunnel' ? 1 : null),
  };
}

/**
 * A planted fault for the judge's own tests (C-0238 (3)): a write behind a step's transaction (`afterStep`), or a step's
 * outcome replaced (`step`: `run` performs the real step; the outcome the judge reads is the plant's).
 */
export interface JudgePlant {
  readonly afterStep?: (p: Plat, i: number) => void;
  readonly step?: (op: string, i: number, run: () => Step) => Step;
}

function play(c: ConstructiveCase, raw: ConstructiveInput, plant: JudgePlant = {}): Run | string {
  const g = centred(raw);
  let scene: Scene | null = null;
  const resolver = districtResolver(() => scene);
  const p = arenaFor(g, resolver);
  if (p === null) return 'the draw leaves no room for a frame inside the lattice';
  const parts = new Map<string, number>();
  for (const st of g.steps) if (st.op === 'insertChain' && typeof st.args.owner === 'string' && st.args.role !== 'district_bound') parts.set(`entity:${st.args.owner}`, (parts.get(`entity:${st.args.owner}`) ?? 0) + 1);
  const env = envFor(g, parts);
  const widths: SpineWidths = (ch) => (ch.role === 'tunnel' || ch.role === 'way' ? { halfWidthCm: g.params.halfWidthCm !== undefined ? Number(g.params.halfWidthCm) : 300 } : null);
  const others = new Map<string, Plat>();
  if (g.steps.some((st) => st.args.arena === 'other')) {
    const q = arenaFor(g, resolver, OTHER);
    if (q === null) return 'no room for the second arena';
    others.set('other', q);
  }
  const context = { chainParts: env.chainParts as NonNullable<TxEnv['chainParts']> };
  scene = { c, g, p, others, k: kernelOn([p, ...others.values()], { base: env, spineWidths: widths, context }), inserted: new Map(), districts: new Map(), records: new Map(), warp: null, chunks: null, firstChunks: null, problems: [], env, widths, profiles: new Map() };
  const s = scene;
  for (let i = 0; i < g.steps.length; i++) {
    const st = g.steps[i];
    const isLast = i === g.steps.length - 1;
    const versionBefore = s.p.version;
    const printBefore = isLast ? topology(s.p) : '';
    const faceCountBefore = s.p.slots.face[1].live;
    const r = plant.step === undefined ? runStep(s, st, i) : plant.step(st.op, i, () => runStep(s, st, i));
    if (!isLast && r.kind !== 'ok') return `step ${String(i)} (${st.op}) ${r.kind === 'threw' ? `threw: ${r.message}` : `refused ${r.code} ${r.detail}`} — every step before the last returns ok`;
    if (r.kind === 'ok') plant.afterStep?.(s.p, i);
    if (r.kind === 'ok' && WRITERS.has(st.op)) {
      const ci = sweep(s);
      if (ci.length > 0) return `invalid output after step ${String(i)} (${st.op}): ${ci.slice(0, 3).join('; ')}`;
    }
    if (isLast) return { scene: s, last: r, versionBefore, printBefore, faceCountBefore };
  }
  return 'the scenario has no step';
}

/**
 * The whole-arena sweep after a writer (§13.1): `checkCI`'s hard problems, less role consistency's part-count lines for
 * an entity whose declared count the case's transactions carried (an owner named by k insertions, C-0227 (5)) — the CI
 * sweep reads the default part counts.
 */
function sweep(s: Scene): string[] {
  return ciProblems(s.p).filter((x) => {
    const m = /^role-consistency: \((\w+), ([^)]+)\) lies in (\d+) parts, more than the 1 it declares/.exec(x);
    if (m === null) return true;
    const declared = s.env.chainParts?.(m[1], m[2]) ?? 1;
    return Number(m[3]) > (declared ?? Infinity);
  });
}

/** §3.11's `empty` for insetRing is C-0196 (5)'s `collapsed` (C-0227 (7)). */
function sameDetail(op: string, want: string, got: string): boolean {
  return want === got || (op === 'insetRing' && want === 'empty' && got === 'collapsed');
}

/** `profile-unchanged`'s tolerance (C-0227 (12)). */
export const PROFILE_UNCHANGED_CM = 1e-6;

/** A minFaceAngle in radians (§3.2's 500 cdeg). */
const MIN_FACE_ANGLE = (LATTICE.minFaceAngleCdeg * Math.PI) / 18_000;

/**
 * §3.6 (2)'s contact rule pre-empts a cut that arrives at the face's boundary at less than minFaceAngle: it would run
 * along the edge it arrives on, so the cut is refused E_NOT_TWO_CROSSINGS before any class floor is measured (C-0227
 * (10)). True when an end segment of the draw's cut meets the boundary edge its end lies on at below minFaceAngle.
 */
function cutGrazes(s: Scene): boolean {
  const st = s.g.steps[s.g.steps.length - 1];
  const cut = s.g.chains[String(st.args.cut)];
  const ring = s.g.rings[String(st.args.face)];
  if (cut === undefined || ring === undefined || cut.length < 2) return false;
  const ends: [Pt, Pt][] = [[cut[0], cut[1]], [cut[cut.length - 1], cut[cut.length - 2]]];
  for (const [e, next] of ends) {
    for (let i = 0; i < ring.length; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      if (!onSegment(a, b, e)) continue;
      const ux = next.x - e.x;
      const uy = next.y - e.y;
      const vx = b.x - a.x;
      const vy = b.y - a.y;
      const ang = Math.atan2(Math.abs(ux * vy - uy * vx), Math.abs(ux * vx + uy * vy));
      if (ang < MIN_FACE_ANGLE) return true;
    }
  }
  return false;
}

/** A refusal by §3.10's role consistency (a linear role's chain in more parts than it declares, or branching). */
function roleConsistency(last: Step): boolean {
  return last.kind === 'refused' && last.code === 'E_INVARIANT' && /role consistency|role-consistency|branches/.test(last.detail);
}

/** The outcome check: the last step against `expect`. */
function outcomeProblem(c: ConstructiveCase, run: Run): string | null {
  const e = c.expect;
  const last = run.last;
  const op = run.scene.g.steps[run.scene.g.steps.length - 1].op;
  // A grazing cut: §3.6 (2)'s refusal is the outcome the design states for this draw (C-0227 (10)).
  if (op === 'splitFace' && last.kind === 'refused' && last.code === 'E_NOT_TWO_CROSSINGS' && /runs along the boundary edge/.test(last.detail) && (e.outcome === 'ok' || e.code === 'E_BELOW_MIN_ANGLE') && cutGrazes(run.scene)) {
    run.scene.records.set('preempted', true);
    return null;
  }
  // §3.11's degenerate-geometry row: the simple runs of a self-touching chain whose linear role declares one part break
  // role consistency, so the batch returns that row's code (C-0227 (11)); the split itself is judged by the companion run.
  if (op === 'insertChain' && e.outcome === 'ok' && e.holds.includes('simple-runs') && roleConsistency(last)) {
    run.scene.records.set('roleRefused', true);
    return null;
  }
  switch (e.outcome) {
    case 'ok':
      if (last.kind !== 'ok') return `expected ok, got ${last.kind === 'threw' ? `a throw: ${last.message}` : `${last.code} ${last.detail}`}`;
      if (op === 'skeleton' && isDowngrade(last.value) && !c.expect.holds.includes('skeleton-valid-or-downgrade')) return 'expected the skeleton path, got a downgrade';
      return null;
    case 'refused': {
      if (last.kind !== 'refused') return `expected a refusal${e.code !== undefined ? ` ${e.code}` : ''}, got ${last.kind === 'ok' ? 'ok' : `a throw: ${last.message}`}`;
      if (e.code !== undefined && last.code !== e.code) return `expected ${e.code}, got ${last.code} ${last.detail}`;
      const detail = e.detail ?? (typeof run.scene.g.params.detail === 'string' ? run.scene.g.params.detail : undefined);
      if (detail !== undefined && !sameDetail(op, detail, last.detail)) return `expected detail ${detail}, got ${last.detail}`;
      return null;
    }
    case 'typed':
      if (last.kind === 'threw') return `a throw where a typed result is due: ${last.message}`;
      if (last.kind === 'refused' && !(e.codes ?? []).includes(last.code as never)) return `refused ${last.code}, not one of ${(e.codes ?? []).join(', ')}`;
      return null;
    case 'downgrade':
      if (last.kind !== 'ok' || !isDowngrade(last.value)) return `expected the reader's downgrade, got ${last.kind === 'ok' ? 'the skeleton path' : last.kind === 'refused' ? `${last.code} ${last.detail}` : `a throw: ${last.message}`}`;
      if (!last.warnings.some((w) => w.code === 'W_DOWNGRADE')) return 'a downgrade not reported W_DOWNGRADE';
      return null;
    case 'assertion':
      return last.kind === 'threw' ? null : `expected a debug-build assertion, got ${last.kind === 'ok' ? 'ok (a silent read)' : `${last.code}`}`;
    case 'static':
      return null;
    default:
      return `no outcome ${String(e.outcome)}`;
  }
}

function isDowngrade(v: unknown): boolean {
  return typeof v === 'object' && v !== null && (v as { kind?: unknown }).kind === 'downgrade';
}

/** The vertex at a lattice point (−1 for none). */
function vertexAtPt(p: Plat, q: Pt): VertexId {
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && p.vertices.x[v] === q.x && p.vertices.y[v] === q.y) return v;
  return -1;
}

/** The entities whose edge rows lie on the edges at a vertex. */
function entitiesAt(p: Plat, v: VertexId): Set<string> {
  const out = new Set<string>();
  for (const h of outgoing(p, v)) for (const e of entitiesOn(p, h)) out.add(e);
  return out;
}

/** The vertex points of an entity's runs (resolve's ChainRef view), run by run. */
function runsOf(s: Scene, role: string, entity: string): Pt[][] {
  const r = s.k.resolve({ role, entity }, s.p.key);
  if (r.view !== 'edges') return [];
  return r.runs.map((run) => {
    const pts: Pt[] = run.map((h) => ({ x: s.p.vertices.x[s.p.halfEdges.origin[h]], y: s.p.vertices.y[s.p.halfEdges.origin[h]] }));
    const lastH = run[run.length - 1];
    const end = s.p.halfEdges.origin[lastH ^ 1];
    pts.push({ x: s.p.vertices.x[end], y: s.p.vertices.y[end] });
    return pts;
  });
}

const samePt = (a: Pt, b: Pt) => a.x === b.x && a.y === b.y;

/** Does every point of the input chain lie on a vertex its entity's edges reach (the chain's roles survive, §13.1)? */
function rolesPreserved(s: Scene, ins: Inserted): string | null {
  const pts = runsOf(s, ins.role, ins.entity).flat();
  const d2 = (u: Pt, q: Pt) => (u.x - q.x) ** 2 + (u.y - q.y) ** 2;
  const n = ins.points.length;
  for (let i = 0; i < n; i++) {
    const q = ins.points[i];
    if (pts.some((u) => samePt(u, q))) continue;
    // A point attracted onto a vertex stands within attractCm of one (§3.6 step 2); a point within minEdge of its
    // neighbour along the chain is decimated (§3.6 step 1) — a shared run shorter than minEdge collapses so.
    if (pts.some((u) => d2(u, q) <= LATTICE.attractCm ** 2)) continue;
    const nb = [ins.points[i - 1], ins.points[i + 1], ...(ins.closed ? [ins.points[(i + n - 1) % n], ins.points[(i + 1) % n]] : [])].filter((u): u is LatticePoint => u !== undefined);
    if (nb.some((u) => d2(u, q) < LATTICE.minEdgeCm ** 2)) continue;
    return `${ins.name}: the point (${String(q.x)}, ${String(q.y)}) is on no vertex of its entity's edges`;
  }
  return null;
}

/** The per-vertex samples of the split's two parts against the original's, within 10⁻⁹ cm (either part's direction). */
function partsMatch(before: readonly number[], a: readonly number[], b: readonly number[]): boolean {
  const close = (x: readonly number[], y: readonly number[]) => x.length === y.length && x.every((v, i) => Math.abs(v - y[i]) <= 1e-9);
  for (const pa of [a, [...a].reverse()]) for (const pb of [b, [...b].reverse()]) {
    if (close([...pa, ...pb.slice(1)], before) || close([...pb, ...pa.slice(1)], before)) return true;
  }
  return false;
}

/** The property checks (C-0227 (8)): null when the property holds, else why not. */
function property(prop: string, run: Run): string | null {
  const s = run.scene;
  const g = s.g;
  const p = s.p;
  const last = run.last;
  const val = last.kind === 'ok' ? last.value : null;
  switch (prop) {
    case 'hard-invariants': {
      const ci = sweep(s);
      return ci.length === 0 ? null : ci.slice(0, 3).join('; ');
    }
    case 'euler':
      return rowProblems(p, ['euler']).slice(0, 2).join('; ') || null;
    case 'no-short-edge':
      return rowProblems(p, ['min-edge', 'clearance']).slice(0, 2).join('; ') || null;
    case 'planar':
      return rowProblems(p, ['simple-faces', 'one-vertex-per-point']).slice(0, 2).join('; ') || null;
    case 'in-range':
      return rowProblems(p, ['lattice-range']).slice(0, 2).join('; ') || null;
    case 'version-kept':
      if (p.version !== run.versionBefore) return `the arena moved from version ${String(run.versionBefore)} to ${String(p.version)}`;
      return topology(p) === run.printBefore ? null : 'the arena changed';
    case 'lands-on-target': {
      const t = g.points.target;
      const v = vertexAtPt(p, t);
      if (v < 0) return 'no vertex at the target';
      const incoming = [...s.inserted.values()].pop() as Inserted;
      return entitiesAt(p, v).has(incoming.entity) ? null : "the incoming chain's end is not the target vertex";
    }
    case 'roles-preserved':
    case 'shared-stretch': {
      for (const ins of s.inserted.values()) {
        if (ins.role === 'margin') continue;
        const why = rolesPreserved(s, ins);
        if (why !== null) return why;
      }
      if (prop === 'shared-stretch') {
        const [A, B] = [s.inserted.get('A') as Inserted, s.inserted.get('B') as Inserted];
        const r = s.k.resolve({ role: A.role, entity: A.entity }, p.key);
        if (r.view === 'edges') for (const run2 of r.runs) for (const h of run2) if (!entitiesOn(p, h).includes(B.entity)) return "an edge of the shared stretch lacks the second chain's row";
      }
      return null;
    }
    case 'children-tile-parent': {
      const parent = s.records.get('splitParent') as { level: Level; rings: LatticePoint[][] } | undefined;
      if (parent === undefined || val === null) return 'no split';
      const [l, r] = val as [FaceId, FaceId];
      const level = g.steps[g.steps.length - 1].args.level !== undefined ? (Number(g.steps[g.steps.length - 1].args.level) as Level) : parent.level;
      // The children against the parent's rings as they stood before the split (C-0238 (1)).
      const why = childrenTileParent(parent.rings, p, level, l, r);
      return why === null ? null : `the children do not tile the parent: ${why}`;
    }
    case 'face-count-unchanged':
      return p.slots.face[1].live === run.faceCountBefore ? null : `the L1 faces went from ${String(run.faceCountBefore)} to ${String(p.slots.face[1].live)}`;
    case 'skeleton-valid':
    case 'skeleton-valid-or-downgrade': {
      if (last.kind === 'refused') return prop === 'skeleton-valid' ? `refused ${last.code}` : null;
      if (val === null) return 'no skeleton';
      if (isDowngrade(val)) return prop === 'skeleton-valid' ? 'a downgrade where the skeleton path is due' : null;
      const v = validateSkeleton(val as Parameters<typeof validateSkeleton>[0]);
      return v.ok ? null : `the skeleton fails the validator: ${v.check} ${v.detail}`;
    }
    case 'roof-inside': {
      if (val === null || isDowngrade(val)) return null;
      const sk = val as { nodes: { x: number; y: number }[]; rings: LatticePoint[][] };
      return roofOutside(sk.nodes, sk.rings)[0] ?? null;
    }
    case 'work-within-limit': {
      if (val === null) return null;
      const sk = val as { kind: string; events: number; cause?: { code: string } };
      const n = (String(g.steps[0].args.rings).split(',').map((x) => g.rings[x]) as LatticePoint[][]).reduce((t, r) => t + r.length, 0);
      const r = String(g.steps[0].args.rings).split(',').length - 1;
      if (sk.kind === 'downgrade') return sk.cause?.code === 'E_WORK_LIMIT' || sk.events <= 4 * (n + r) + 64 ? null : `a downgrade after ${String(sk.events)} events`;
      return sk.events <= 4 * (n + r) + 64 ? null : `${String(sk.events)} events past the limit ${String(4 * (n + r) + 64)}`;
    }
    case 'empty-result': {
      if (val === null) return last.kind === 'refused' ? `refused ${last.code}` : 'no value';
      const op = g.steps[g.steps.length - 1].op;
      if (op === 'query') return emptyQuery(val as { vertices: number[]; edges: number[]; faces: number[] });
      if (op === 'hexLattice') return (val as { points: unknown[] }).points.length === 0 ? null : 'hexLattice gave points';
      if (op === 'delaunay') return (val as { triangles: Uint32Array }).triangles.length === 0 ? null : 'a triangle';
      if (op === 'tileRings') return (val as unknown[]).length === 0 ? null : 'pieces';
      if (op === 'sampleProfile') return (val as { values: unknown[] }).values.length === 0 ? null : 'samples';
      return `no empty-result check for ${op}`;
    }
    case 'step-halved': {
      const w = s.warp;
      if (w === null) return 'no warp report';
      if (!(w.halvings >= 1 && w.halvings <= 8)) return `the step was halved ${String(w.halvings)} times`;
      if (!w.applied && w.halvings !== 8) return 'a no-op before eight halvings';
      return null;
    }
    case 'held-unmoved': {
      const w = s.warp;
      if (w === null) return 'no warp report';
      const names = (g.params.held as string[] | undefined) ?? [];
      const pts: Pt[] = [];
      for (const n of names) {
        if (Object.hasOwn(g.rings, n)) pts.push(...g.rings[n]);
        else if (Object.hasOwn(g.pointSets, n)) pts.push(...g.pointSets[n]);
        else if (Object.hasOwn(g.points, n)) pts.push(g.points[n]);
      }
      if (pts.length === 0) return 'no held geometry named';
      for (const q of pts) if (w.moves.some((m) => samePt(m.from, q))) return `a held vertex (${String(q.x)}, ${String(q.y)}) moved`;
      for (const q of pts) if (vertexAtPt(p, q) < 0) return `no vertex left at the held point (${String(q.x)}, ${String(q.y)})`;
      return null;
    }
    case 'slides-on-route': {
      const w = s.warp;
      if (w === null || !w.applied) return 'the warp step did not commit';
      const slider = String(g.params.slider);
      if (slider === 'junction') {
        const j = g.points.junction;
        const [a, b] = g.chains.shore;
        const m = w.moves.find((x) => samePt(x.from, j));
        const at = m === undefined ? j : m.to;
        return cross(a, b, at) === 0n ? null : 'the junction left the shore';
      }
      // A neighbour's corners on the held plot's line stay on it.
      const plot = g.rings.plot;
      for (const q of g.rings[slider]) {
        const onPlot = plot.some((u, i) => onSegment(u, plot[(i + 1) % plot.length], q));
        if (!onPlot) continue;
        const m = w.moves.find((x) => samePt(x.from, q));
        const at = m === undefined ? q : m.to;
        if (!plot.some((u, i) => onSegment(u, plot[(i + 1) % plot.length], at))) return `a corner on the plot's line left it (${String(at.x)}, ${String(at.y)})`;
      }
      return null;
    }
    case 'placement-rule':
      return placementRule(s);
    case 'renumbering-identity':
      return s.records.get('renumbered') === true && !s.problems.some((x) => x.startsWith('renumbering')) ? null : s.problems.find((x) => x.startsWith('renumbering')) ?? 'not run';
    case 'no-kept-error':
      return last.kind === 'refused' && last.code === 'E_KEPT' ? 'E_KEPT' : null;
    case 'junction-shape-vertex': {
      const w = s.warp;
      const j = g.points.junction;
      const m = w?.moves.find((x) => samePt(x.from, j));
      const at = m === undefined ? j : m.to;
      const v = vertexAtPt(p, at);
      if (v < 0) return 'the junction dissolved';
      const spine = s.inserted.get('spine') as Inserted;
      const on = outgoing(p, v).filter((h) => entitiesOn(p, h).includes(spine.entity)).length;
      return on === 2 ? null : `the junction carries ${String(on)} spine edges, not 2`;
    }
    case 'coarser-edge-restored': {
      const route = s.inserted.get('route') as Inserted;
      const runs = runsOf(s, route.role, route.entity);
      return runs.length === 1 && runs[0].length === 2 ? null : `the route holds ${String(runs.map((r) => r.length).join('+'))} vertices, not its two ends`;
    }
    case 'chain-restored': {
      const spine = s.inserted.get('spine') as Inserted;
      const runs = runsOf(s, spine.role, spine.entity);
      if (runs.length !== 1) return `the spine is ${String(runs.length)} runs`;
      const got = runs[0];
      const want = spine.points;
      const fwd = got.length === want.length && got.every((q, i) => samePt(q, want[i]));
      const rev = got.length === want.length && got.every((q, i) => samePt(q, want[want.length - 1 - i]));
      return fwd || rev ? null : `the spine's chain is not restored (${String(got.length)} vertices, ${String(want.length)} drawn)`;
    }
    case 'profile-unchanged': {
      const b = s.records.get('sample:before') as { values: number[]; length: number; knots: number };
      const a = s.records.get('sample:after') as { values: number[]; length: number; knots: number };
      // The T-junction carries no knot (§2.2 rule 5) and changes no sampled half-width — up to the arc-length shift a
      // foot the placement rule seats ≤ 0.71 cm off the spine's line makes (C-0227 (12)): each sample by arc length moves
      // by at most the profile's steepest slope × the route's length change, + 10⁻⁶ cm.
      if (a.knots !== b.knots) return `the T-junction changed the knot rows (${String(b.knots)} → ${String(a.knots)})`;
      let slope = 0;
      const step = Number(s.g.params.sampleStepCm);
      for (let i = 1; i < b.values.length; i++) slope = Math.max(slope, Math.abs(b.values[i] - b.values[i - 1]) / step);
      const tol = slope * Math.abs(a.length - b.length) + PROFILE_UNCHANGED_CM;
      return b.values.length === a.values.length && b.values.every((v, i) => Math.abs(v - a.values[i]) <= tol) ? null : `${profileDiff(b.values, a.values)} (bound ${String(tol)})`;
    }
    case 'profile-within-1e-9': {
      const b = s.records.get('sample:before') as { perVertex: number[] };
      const split = s.records.get('sample:split') as { perVertex: number[]; second?: number[] } | undefined;
      if (split !== undefined) return split.second !== undefined && partsMatch(b.perVertex, split.perVertex, split.second) ? null : 'a split part samples more than 10⁻⁹ cm from the original';
      // A stretch removed: every remaining sample of the kept parts within 10⁻⁹ cm of its value before, by position.
      return remainingWithin(s);
    }
    case 'profile-bit-identical': {
      const b = s.records.get('sample:before') as { values: number[] };
      const r = s.records.get('sample:rejoined') as { values: number[] };
      return b.values.length === r.values.length && b.values.every((v, i) => Object.is(v, r.values[i])) ? null : profileDiff(b.values, r.values);
    }
    case 'other-roles-unchanged': {
      for (const ins of s.inserted.values()) {
        if (ins.name === 'spine' || ins.name === 'ring' || ins.role === 'margin') continue;
        const runs = runsOf(s, ins.role, ins.entity);
        if (runs.length !== 1) return `${ins.name} is ${String(runs.length)} runs`;
        const got = runs[0];
        const want = ins.points;
        const ok2 = got.length === want.length && (got.every((q, i) => samePt(q, want[i])) || got.every((q, i) => samePt(q, want[want.length - 1 - i])));
        if (!ok2) return `${ins.name} changed`;
      }
      return null;
    }
    case 'value-everywhere': {
      const v = Number((g.params.knotValues as number[])[0]);
      const got = (val as { values: number[] }).values;
      return got.length > 0 && got.every((x) => x === v) ? null : `samples ${JSON.stringify(got.slice(0, 5))}, not ${String(v)} everywhere`;
    }
    case 'query-returns-item': {
      const around = s.records.get('around') as { level: number; vertices: [number, number, number][] }[];
      const q = g.points[String(g.steps[g.steps.length - 1].args.around)];
      for (const a of around) {
        const v = vertexAtPt(p, q);
        const lv = v < 0 ? 99 : p.vertices.level[v];
        if (a.level >= lv && !a.vertices.some(([x, y]) => x === q.x && y === q.y)) return `the L${String(a.level)} query misses the vertex`;
      }
      return vertexAtPt(p, q) >= 0 ? null : 'the vertex is gone';
    }
    case 'query-returns-new-item':
    case 'query-each-once':
      return queriesAsExpected(s);
    case 'query-equals-rebuild':
      return queryEqualsRebuild(s);
    case 'query-order-stable': {
      const b = s.records.get('query:before') as { vertices: number[]; edges: number[]; faces: number[] };
      const a = s.records.get('query:after') as { vertices: number[]; edges: number[]; faces: number[] };
      return JSON.stringify([b.vertices, b.edges, b.faces]) === JSON.stringify([a.vertices, a.edges, a.faces]) ? null : 'the L3 query order changed after L4 was derived';
    }
    case 'rebuild-at-threshold': {
      const checks = (s.records.get('thresholdChecks') as string[] | undefined) ?? ['not run'];
      if (checks.length > 0) return checks[0];
      return Number(s.records.get('overflowRebuilds') ?? 0) >= 1 ? null : 'no partition crossed its threshold';
    }
    case 'round-trip': {
      const loaded = s.records.get('loaded') as Plat | undefined;
      if (loaded === undefined) return 'nothing loaded';
      if (s.records.get('sameAsFirst') !== true) return 'save → load → save is not byte-identical';
      const ci = ciProblems(loaded);
      return ci.length === 0 ? null : `loaded: ${ci[0]}`;
    }
    case 'one-face': {
      const loaded = s.records.get('loaded') as Plat | undefined;
      const q = loaded ?? p;
      return [0, 1, 2, 3, 4].map((l) => q.slots.face[l as Level].live).join(',') === '1,0,0,0,0' ? null : 'not one face';
    }
    case 'same-arena':
      return s.records.get('sameAsFirst') === true ? null : 'the regenerated arena differs';
    case 'corrupt-cache':
      return last.kind === 'refused' && isCorruptCache(last.refusal as never) ? null : 'not the typed corrupt-cache failure';
    case 'resolves-empty': {
      const r = s.records.get('resolved') as { view: string; runs: unknown[] };
      if (r.view !== 'edges' || r.runs.length !== 0) return 'the reference resolves to geometry';
      const stored = s.records.get('storedCheck') as { holds: boolean } | undefined;
      return stored !== undefined && !stored.holds ? null : "the stored reference passes §3.10's stored-references row";
    }
    case 'oracle-agreement':
      return oracleAgreement(s, last);
    case 'ring-equals-face': {
      const face = s.records.get('serviceFace') as LatticePoint[][];
      return sameRingSets(val as LatticePoint[][], face) ? null : 'insetRing(0) is not the face ring';
    }
    case 'outward-not-collapsing': {
      const face = s.records.get('serviceFace') as LatticePoint[][];
      const out = val as LatticePoint[][];
      if (out.length === 0) return 'collapsed';
      for (const q of face[0]) if (!inRegionApprox(out, q, 1)) return 'the outward inset does not hold the face';
      return null;
    }
    case 'kerb-equals-face': {
      const face = s.records.get('serviceFace') as LatticePoint[][];
      return sameRingSets(val as LatticePoint[][], face) ? null : 'kerb(F) ≠ F';
    }
    case 'pieces-tile':
      return piecesTile(s, val as LatticePoint[][][]);
    case 'names-hole-vertex': {
      if (last.kind !== 'refused') return 'not refused';
      const at = (last.refusal as unknown as { at?: Pt }).at;
      return at !== undefined && g.rings.inner.some((q) => samePt(q, at)) ? null : 'the refusal names no vertex of the hole';
    }
    case 'kerb-wedges':
      return kerbWedges(s);
    case 'targets-within-1cm': {
      const ring = g.rings.ring;
      const f = val as { targets: { x: number; y: number }[]; compactness: number };
      const n = ring.length;
      for (let i = 0; i < n; i++) if (Math.hypot(f.targets[i].x - ring[i].x, f.targets[i].y - ring[i].y) > 1) return `target ${String(i)} is over 1 cm from its vertex`;
      const own = Math.PI / (n * Math.tan(Math.PI / n));
      if (Math.abs(f.compactness - own) > 1e-3) return `compactness ${String(f.compactness)}, the n-gon's ${String(own)}`;
      for (const x of (s.records.get('fitRuns') as { r: KernelResult<unknown> }[] | undefined) ?? []) if (!x.r.ok) return 'a rotation of the ring refused';
      return null;
    }
    case 'cross-host-identical': {
      // The same input twice in this process gives the same doubles (C-0227 (9)); the hosts' legs are M0-d-06's.
      const again = regularFit(g.rings.ring);
      return again.ok && JSON.stringify(again.value) === JSON.stringify(val) ? null : 'a second fit differs';
    }
    case 'targets-identical':
      return targetsIdentical(s, val as { targets: { x: number; y: number }[] });
    case 'compactness-below-075': {
      const f = val as { n: number; compactness: number; targets: { x: number; y: number }[]; centre: { x: number; y: number }; radiusCm: number };
      if (!(f.compactness < 0.75)) return `compactness ${String(f.compactness)}`;
      if (f.n !== 4) return `a fit of ${String(f.n)} corners`;
      for (const t of f.targets) if (Math.abs(Math.hypot(t.x - f.centre.x, t.y - f.centre.y) - f.radiusCm) > 1e-6 * Math.max(1, f.radiusCm)) return 'a target is off the square';
      return null;
    }
    case 'centre-unchanged': {
      const a = s.records.get('fit:plain') as KernelResult<{ centre: { x: number; y: number } }>;
      const b = val as { centre: { x: number; y: number } };
      if (!a.ok) return 'the plain fit refused';
      return Math.abs(a.value.centre.x - b.centre.x) <= 1e-6 && Math.abs(a.value.centre.y - b.centre.y) <= 1e-6 ? null : `the centre moved (${String(a.value.centre.x)}, ${String(a.value.centre.y)}) → (${String(b.centre.x)}, ${String(b.centre.y)})`;
    }
    case 'same-code-every-rung':
      return LATTICE.minEdgeCm === 25 && LATTICE.attractCm === 26 ? null : 'the lattice constants differ';
    case 'kernel-reads-no-model':
      return kernelReadsNoModel();
    case 'absorbed': {
      const parent = s.records.get('splitParent') as { face: FaceId; level: Level };
      // The sliver absorbed: the parent's L2 region is one face again, the cut's row gone from it (§3.3 repair).
      const loc = faceRings(p, 1, parent.face);
      const q = interiorPoint(loc[0]);
      if (q === null) return 'no interior point';
      let count = 0;
      for (let f = 0; f < p.slots.face[2].top; f++) if (isFaceLive(p, 2, f) && p.faces[2].parent[f] === parent.face) count++;
      return count <= 1 ? null : `${String(count)} L2 faces left in the parent — the sliver was not absorbed`;
    }
    case 'one-vertex': {
      const B = g.chains.B;
      const v = B[B.length - 1];
      let n = 0;
      for (let w = 0; w < p.slots.vertex.top; w++) if (isVertexLive(p, w) && p.vertices.x[w] === v.x && p.vertices.y[w] === v.y) n++;
      if (n !== 1) return `${String(n)} vertices at the coincident point`;
      const ents = entitiesAt(p, vertexAtPt(p, v));
      return ents.has((s.inserted.get('A') as Inserted).entity) && ents.has((s.inserted.get('B') as Inserted).entity) ? null : 'the coincident point is not one vertex of both chains';
    }
    case 'simple-runs': {
      if (s.records.get('roleRefused') === true) return companionRuns(s);
      if (last.kind === 'refused') return null;
      const ins = s.inserted.get('chain') as Inserted;
      for (const r of runsOf(s, ins.role, ins.entity)) {
        const closed = samePt(r[0], r[r.length - 1]);
        const body = closed ? r.slice(0, -1) : r;
        const keys = new Set(body.map((q) => `${String(q.x)},${String(q.y)}`));
        if (keys.size !== body.length) return 'a run visits a vertex twice';
      }
      return null;
    }
    case 'decimated': {
      const d = g.points.dropped;
      return vertexAtPt(p, d) < 0 ? null : 'the point within minEdge of its predecessor stands';
    }
    default:
      return `no check for the property ${prop}`;
  }
}

/**
 * The companion run of a self-touching chain refused by its linear role's consistency (C-0227 (11)): the same chain
 * under a partition role that declares no part count (`field_bound`, L1) commits as simple runs, every hard row holding.
 */
function companionRuns(s: Scene): string | null {
  const ins = s.g.chains.chain;
  const p = createPlat(KEY, FRAME);
  attachIndex(p, { gridCellCm: CELLS });
  const b = boxOf(ins) as number[];
  layFrame(p, [lpt(b[0] - PAD, b[1] - PAD), lpt(b[2] + PAD, b[1] - PAD), lpt(b[2] + PAD, b[3] + PAD), lpt(b[0] - PAD, b[3] + PAD)]);
  const k = kernelOn([p]);
  const r = k.tx(spec(1), (o) => k.geom.insertChain(o, ins, [{ role: 'field_bound', entity: 'field_bound:companion' }], 'mandatory'));
  if (!r.ok) return `the companion (field_bound) refused ${r.code} ${r.detail}`;
  const ci = ciProblems(p);
  if (ci.length > 0) return `the companion: ${ci[0]}`;
  const scene = { ...s, p, k } as Scene;
  const runs = runsOf(scene, 'field_bound', 'field_bound:companion');
  if (runs.length < 2) return `the companion committed ${String(runs.length)} run(s), not the chain split into simple runs`;
  for (const run of runs) {
    const closed = samePt(run[0], run[run.length - 1]);
    const body = closed ? run.slice(0, -1) : run;
    if (new Set(body.map((q) => `${String(q.x)},${String(q.y)}`)).size !== body.length) return 'a companion run visits a vertex twice';
  }
  return null;
}

function profileDiff(a: readonly number[], b: readonly number[]): string {
  if (a.length !== b.length) return `${String(a.length)} samples before, ${String(b.length)} after`;
  let worst = 0;
  for (let i = 0; i < a.length; i++) worst = Math.max(worst, Math.abs(a[i] - b[i]));
  return `samples differ by up to ${String(worst)} cm`;
}

/** After a stretch removal: each remaining part's per-vertex samples equal the original's at those vertices (≤ 10⁻⁹ cm). */
function remainingWithin(s: Scene): string | null {
  const b = s.records.get('sample:before') as { perVertex: number[] };
  const after = s.records.get('sample:after') as { perVertex: number[] };
  const name = s.inserted.has('spine') ? 'spine' : 'ring';
  const ins = s.inserted.get(name) as Inserted;
  // The original's per-vertex samples by point, read in the drawn order's chain order (resolve's order).
  const byPoint = new Map<string, number>();
  const order = chainOrder(ins);
  order.forEach((q, i) => byPoint.set(`${String(q.x)},${String(q.y)}`, b.perVertex[i]));
  const parts: [string, readonly (number | string)[]][] = [[ins.entity, after.perVertex]];
  const second = (after as { second?: (number | string)[] }).second;
  if (second !== undefined) parts.push([`${ins.entity}#part`, second]);
  for (const [entity, values] of parts) {
    let k = 0;
    for (const r of runsOf(s, ins.role, entity)) {
      for (const q of r) {
        if (k >= values.length) return 'fewer samples than vertices';
        const want = byPoint.get(`${String(q.x)},${String(q.y)}`);
        if (want !== undefined && Math.abs(Number(values[k]) - want) > 1e-9) return `a remaining sample moved by ${String(Math.abs(Number(values[k]) - want))} cm`;
        k++;
      }
    }
  }
  return null;
}

/** An inserted chain's points in resolve's chain order (an open chain from its lower (y, x) end; a ring from its lowest-leftmost vertex counter-clockwise). */
function chainOrder(ins: Inserted): readonly LatticePoint[] {
  const pts = ins.points;
  const lower = (a: Pt, b: Pt) => a.y < b.y || (a.y === b.y && a.x < b.x);
  if (!ins.closed) return lower(pts[pts.length - 1], pts[0]) ? [...pts].reverse() : pts;
  const ccw = area2Exact(pts) > 0n ? pts : [...pts].reverse();
  let i0 = 0;
  for (let i = 1; i < ccw.length; i++) if (lower(ccw[i], ccw[i0])) i0 = i;
  return [...ccw.slice(i0), ...ccw.slice(0, i0)];
}

/** An empty query (§3.11 *no input*): no vertex and no edge in the box — a face around it is no geometry of the case. */
function emptyQuery(q: { vertices: number[]; edges: number[]; faces: number[] }): string | null {
  return q.vertices.length > 0 || q.edges.length > 0 ? `${String(q.vertices.length)} vertices and ${String(q.edges.length)} edges met` : null;
}

/** The queries' `expect`: `fresh` / `inB` (the new chain's edge met), `none` (nothing met), `eachPlotOnce`. */
function queriesAsExpected(s: Scene): string | null {
  const qs = (s.records.get('queries') as { level: number; vertices: number[]; edges: number[]; faces: number[]; expect: unknown; edgeEntities: string[][] }[] | undefined) ?? [];
  if (qs.length === 0) return 'no query ran';
  for (const q of qs) {
    if (q.expect === 'none') {
      if (q.edges.length > 0 || q.vertices.length > 0) return `a query expected to meet nothing met ${String(q.edges.length)} edges, ${String(q.vertices.length)} vertices`;
    } else if (q.expect === 'eachPlotOnce') {
      const plots = Number(s.g.params.plots);
      if (new Set(q.faces).size !== q.faces.length) return 'a plot returned twice';
      const block = s.g.rings.block;
      const inside = q.faces.filter((f) => {
        const ring = isFaceLive(s.p, 3, f) ? faceRings(s.p, 3, f)[0] : null;
        const at = ring === null ? null : interiorPoint(ring);
        return at !== null && inRing(block, at) > 0;
      });
      if (inside.length !== plots) return `${String(inside.length)} plots returned, ${String(plots)} drawn`;
    } else if (typeof q.expect === 'string') {
      const ins = s.inserted.get(q.expect) as Inserted;
      if (!q.edgeEntities.some((e) => e.includes(ins.entity))) return `the query misses the new item ${q.expect}`;
      const others = q.edgeEntities.flat().filter((e) => e !== ins.entity && !e.startsWith('district_bound') && !e.startsWith(FRAME_ENTITY));
      if (others.length > 0) return `the query returns another item (${others[0]})`;
    }
  }
  return null;
}

/** Every query asked answers the same now (after the scenario's last rebuild) as when it was asked. */
function queryEqualsRebuild(s: Scene): string | null {
  const g = s.g;
  if (g.steps.some((x) => x.op === 'insertSegments')) {
    // The edit area's query before and after a full stage-end rebuild (§3.3).
    const box = boxOf(g.pointSets.editSites) as number[];
    const b = { minX: box[0] - 50, minY: box[1] - 50, maxX: box[2] + 80, maxY: box[3] + 50 };
    const q1 = s.k.index.query(s.p.key, 2, b);
    const p1 = JSON.stringify([q1.vertices, q1.edges, q1.faces]);
    s.k.index.rebuildAtStageEnd(s.p.key);
    const q2 = s.k.index.query(s.p.key, 2, b);
    return p1 === JSON.stringify([q2.vertices, q2.edges, q2.faces]) ? null : "the edit area's query changed across a rebuild";
  }
  const qs = (s.records.get('queries') as { level: number; vertices: number[]; edges: number[]; faces: number[] }[] | undefined) ?? [];
  const boxes = g.steps.filter((x) => x.op === 'query' && typeof x.args.box === 'string');
  for (let i = 0; i < qs.length; i++) {
    const st = boxes[i];
    const r = s.k.index.query(s.p.key, qs[i].level as Level, boxArg(g.rings[String(st.args.box)]));
    s.k.index.rebuildAtStageEnd(s.p.key);
    const r2 = s.k.index.query(s.p.key, qs[i].level as Level, boxArg(g.rings[String(st.args.box)]));
    if (JSON.stringify([r.vertices, r.edges, r.faces]) !== JSON.stringify([r2.vertices, r2.edges, r2.faces])) return `query ${String(i)} changed across a rebuild`;
  }
  return null;
}

/** §3.7's comparison of a buffer case with each oracle, split by attraction. */
function oracleAgreement(s: Scene, last: Step): string | null {
  const g = s.g;
  const st = g.steps[g.steps.length - 1];
  const a = st.args;
  const chains = String(a.chains).split(',').filter((n) => n.length > 0).map((n) => g.chains[n]);
  const ours = last.kind === 'ok' ? { ok: true as const, value: last.value as LatticePoint[][], warnings: [...last.warnings] } : (last.kind === 'refused' ? (last.refusal as KernelResult<LatticePoint[][]>) : null);
  if (ours === null) return 'threw';
  for (const e of ORACLE_ENGINES) {
    const v = compareSplit(ours, oracleBuffer(chains, num(g, a.halfWidthCm), a.joins as 'round', a.ends as 'round', e), ours.ok ? ours.warnings : []);
    if (!v.pass && !v.refused) return `${e}: ${v.split} ${v.failures.join(', ')}`;
  }
  return null;
}

/** Two ring sets equal as point cycles (any start, same direction). */
function sameRingSets(a: readonly (readonly LatticePoint[])[], b: readonly (readonly LatticePoint[])[]): boolean {
  if (a.length !== b.length) return false;
  const key = (r: readonly LatticePoint[]) => {
    let i0 = 0;
    for (let i = 1; i < r.length; i++) if (r[i].y < r[i0].y || (r[i].y === r[i0].y && r[i].x < r[i0].x)) i0 = i;
    return [...r.slice(i0), ...r.slice(0, i0)].map((q) => `${String(q.x)},${String(q.y)}`).join(';');
  };
  const ka = a.map(key).sort();
  const kb = b.map(key).sort();
  return ka.every((x, i) => x === kb[i]);
}

/** tileRings' pieces: counts as drawn, each simple and counter-clockwise, areas against the oracle, joints shared. */
function piecesTile(s: Scene, pieces: LatticePoint[][][]): string | null {
  const g = s.g;
  const order = g.params.order as string[];
  const want = g.params.pieces as number[] | undefined;
  const rings = order.map((n) => g.rings[n]);
  for (let i = 0; i < pieces.length; i++) {
    if (want !== undefined && pieces[i].length !== want[i]) return `ring ${String(i)} gave ${String(pieces[i].length)} pieces, ${String(want[i])} drawn`;
    const bad = ringProblems(pieces[i]);
    if (bad.length > 0) return `ring ${String(i)}: ${bad[0]}`;
    for (const r of pieces[i]) if (area2Exact(r) <= 0n) return `a piece of ring ${String(i)} is not counter-clockwise`;
    const ours = pieces[i].reduce((t, r) => t + Number(area2Exact(r)), 0) / 2;
    const earlier = rings.slice(0, i);
    const o = earlier.length === 0 ? oracleBoolean('union', [rings[i]], [], 'nonzero', 'clipper2') : oracleBoolean('difference', [rings[i]], earlier, 'nonzero', 'clipper2');
    if (o.ok) {
      const area = o.rings.reduce((t, r) => t + Number(area2Exact(r)), 0) / 2;
      const per = rings[i].reduce((t, q, k) => t + Math.hypot(rings[i][(k + 1) % rings[i].length].x - q.x, rings[i][(k + 1) % rings[i].length].y - q.y), 0);
      if (Math.abs(ours - area) > per * Math.SQRT2 * LATTICE.attractCm) return `ring ${String(i)}'s pieces hold ${ours.toFixed(0)} cm², the oracle ${area.toFixed(0)} cm²`;
    }
  }
  // Every crossing vertex a vertex of both rings' pieces: a piece vertex on another ring's piece side is a vertex there.
  for (let i = 0; i < pieces.length; i++) for (let j = 0; j < pieces.length; j++) {
    if (i === j) continue;
    for (const A of pieces[i]) for (const q of A) for (const B of pieces[j]) {
      for (let k = 0; k < B.length; k++) {
        const u = B[k];
        const w = B[(k + 1) % B.length];
        if (onSegment(u, w, q) && !samePt(u, q) && !samePt(w, q)) return `a joint vertex (${String(q.x)}, ${String(q.y)}) of ring ${String(i)} is not a vertex of ring ${String(j)}'s piece`;
      }
    }
  }
  return null;
}

/** The corridor over tunnel chains: kerb edges made, the plot line's end on a kerb edge by attraction. */
function kerbWedges(s: Scene): string | null {
  const p = s.p;
  const line = s.inserted.get('plotLine') as Inserted;
  const end = line.points[line.points.length - 1];
  const runs = runsOf(s, line.role, line.entity);
  if (runs.length !== 1) return `the plot line is ${String(runs.length)} runs`;
  const r = runs[0];
  const tip = samePt(r[0], line.points[0]) ? r[r.length - 1] : r[0];
  const v = vertexAtPt(p, tip);
  if (v < 0) return 'no vertex at the plot line end';
  const onKerb = outgoing(p, v).some((h) => rowsOn(p, 'edge', h).some((x) => rowKey(p, x).role === 'kerb'));
  if (!onKerb) return `the plot line's end (${String(tip.x)}, ${String(tip.y)}) is not on the kerb (drawn ${String(end.x)}, ${String(end.y)})`;
  let kerbFaces = 0;
  for (let f = 0; f < p.slots.face[2].top; f++) {
    if (!isFaceLive(p, 2, f)) continue;
    const rows = faceWalk(p, 2, f).flat().flatMap((h) => rowsOn(p, 'edge', h).map((x) => rowKey(p, x)));
    if (rows.some((x) => x.entity.startsWith(FRAME_ENTITY))) continue;
    if (rows.some((x) => x.role === 'kerb')) kerbFaces++;
  }
  return kerbFaces >= 3 ? null : `${String(kerbFaces)} L2 faces carry kerb edges — the junction yields no wedges`;
}

/** Every rotation and the reversal give identical targets, vertex for vertex, bit for bit. */
function targetsIdentical(s: Scene, fit: { targets: { x: number; y: number }[] }): string | null {
  const ring = s.g.rings.ring;
  const n = ring.length;
  const runs = (s.records.get('fitRuns') as { rot: number; rev: boolean; r: KernelResult<{ targets: { x: number; y: number }[] }> }[] | undefined) ?? [];
  if (runs.length < n) return 'the rotations did not run';
  for (const x of runs) {
    if (!x.r.ok) return `rotation ${String(x.rot)}${x.rev ? ' reversed' : ''} refused`;
    for (let i = 0; i < n; i++) {
      // The rotated ring's vertex i is the original's (i + rot) mod n; reversed, its vertex i is the rotated's n − 1 − i.
      const orig = x.rev ? (x.rot + (n - 1 - i)) % n : (x.rot + i) % n;
      const t = x.r.value.targets[i];
      const u = fit.targets[orig];
      if (!Object.is(t.x, u.x) || !Object.is(t.y, u.y)) return `rotation ${String(x.rot)}${x.rev ? ' reversed' : ''}: vertex ${String(orig)}'s target differs`;
    }
  }
  return null;
}

/** The placement rule on a warp's re-seated or slid vertices (§3.6): each within 0.71 cm of its route, the clearance kept. */
function placementRule(s: Scene): string | null {
  const w = s.warp;
  if (w === null) return 'no warp report';
  if (!w.applied) return 'the warp did not commit';
  const re = w.moves.filter((m) => m.kind === 'reseat' || m.kind === 'slide');
  if (re.length === 0) return 'no vertex was re-seated';
  const bad = rowProblems(s.p, ['placement-bound', 'clearance', 'min-edge']);
  return bad.length === 0 ? null : bad[0];
}

let kernelStatic: string | null | undefined;

/** §3.11: `@plat/kernel` depends on no other workspace package and imports none (its package file and its sources). */
function kernelReadsNoModel(): string | null {
  if (kernelStatic !== undefined) return kernelStatic;
  const here = dirname(fileURLToPath(import.meta.url));
  const root = join(here, '..', '..', '..', 'kernel');
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { dependencies?: Record<string, string> };
  const deps = Object.keys(pkg.dependencies ?? {}).filter((d) => d.startsWith('@plat/'));
  if (deps.length > 0) return (kernelStatic = `the kernel depends on ${deps.join(', ')}`);
  const walk = (d: string): string | null => {
    for (const n of readdirSync(d).sort()) {
      const f = join(d, n);
      if (statSync(f).isDirectory()) {
        const r = walk(f);
        if (r !== null) return r;
      } else if (n.endsWith('.ts') && /from\s+['"]@plat\//.test(readFileSync(f, 'utf8'))) return `${n} imports a workspace package`;
    }
    return null;
  };
  kernelStatic = existsSync(join(root, 'src')) ? walk(join(root, 'src')) : 'no kernel source';
  return kernelStatic;
}

/**
 * The judge of one M0 draw against the kernel (C-0110): the numeric-core cases by their own `run`, every other by its
 * scenario under the hard timeout, its outcome and every property it holds.
 */
export function judgeOnKernel(c: ConstructiveCase, input: ConstructiveInput, timeoutMs = CONSTRUCTIVE_TIMEOUT_MS, plant: JudgePlant = {}): ConstructiveVerdict {
  if (c.run !== undefined) return c.run(input);
  if (c.expect.outcome === 'static') {
    for (const prop of c.expect.holds) {
      const why = prop === 'kernel-reads-no-model' ? kernelReadsNoModel() : `no static check for ${prop}`;
      if (why !== null) return fail(`${prop}: ${why}`);
    }
    return GREEN;
  }
  const out = guarded(() => {
    const run = play(c, input, plant);
    if (typeof run === 'string') return fail(run);
    const o = outcomeProblem(c, run);
    if (o !== null) return fail(o);
    if (run.scene.problems.length > 0 && !c.expect.holds.includes('renumbering-identity')) return fail(run.scene.problems[0]);
    // A pre-empted cut is judged by §3.6 (2)'s outcome: refused, the version kept, the arena valid (C-0227 (10)).
    const holds = run.scene.records.get('preempted') === true ? ['version-kept', 'hard-invariants'] : c.expect.holds;
    for (const prop of holds) {
      const why = property(prop, run);
      if (why !== null) return fail(`${prop}: ${why}`);
    }
    return GREEN;
  }, timeoutMs);
  if (out.kind === 'hang') return fail(`a hang: no verdict within the hard timeout of ${String(out.ms)} ms`);
  if (out.kind === 'crash') return fail(`the runner crashed: ${out.message}`);
  return out.value;
}

/** M0-k-02's iteration with this item's judge (C-0181 (5)): the whole set, deferred cases counted by milestone. */
export const kernelJudge: ConstructiveJudge = (c, input) => judgeOnKernel(c, input);

/** A known finding (C-0227 (14); FAIL SAFE NOW, N-45 / J202): a case that fails for a reason owned by another item. */
export interface KnownFinding {
  readonly id: string;
  /** The item that owns the fix. */
  readonly owner: string;
  /** Every failing draw's reason matches it — anything else fails the case as usual. */
  readonly pattern: RegExp;
  readonly finding: string;
}

/**
 * The cases the kernel or the case data cannot make green as they stand, each failing safely (a typed refusal, nothing
 * committed) — counted as known, never as green and never hidden: the counts report lists them, and a known case that
 * turns green is reported stale (the list is then corrected).
 */
export const CONSTRUCTIVE_KNOWN: readonly KnownFinding[] = Object.freeze([
  // KI-1 (index-freshness on removal: index/slot-reuse-stage, index/slot-reuse-districts) was M0-a-14's filter, ruling
  // N-49, fixed by M0-a-14-fix-s1 (C-0235); both cases are green and judged as every other (C-0238 (5)).
  {
    id: 'limit/cap-move-halvings',
    owner: 'M0-k-02 (the case data)',
    pattern: /^step-halved: the step was halved 0 times$/,
    finding: 'KI-2: the case draws the moved vertex exactly minEdge (25 cm) from its neighbour, inside attractCm (26 cm): insertion attracts it onto the neighbour, so the warp has nothing to halve (§3.11 the caps\' halving cap is held by the runner\'s own fixture instead)',
  },
]);

/** The run of the set: M0-k-02's report with the known findings apart. */
export interface KernelConstructiveReport extends ConstructiveReport {
  /** Known findings that failed as known (not counted in failedCases). */
  readonly known: { readonly id: string; readonly draws: number; readonly finding: string }[];
  /** Known findings whose case is green now: the list is stale. */
  readonly staleKnown: string[];
}

/**
 * Runs the constructive set against the kernel: every case at `seeds` draws — a swept case (`sweep`) at its whole sweep
 * when `sweeps` is true, else at min(sweep, seeds) — every deferred case drawn once and counted by its milestone, the
 * known findings (CONSTRUCTIVE_KNOWN) apart.
 */
export function runConstructiveOnKernel(
  cases: readonly ConstructiveCase[],
  seeds: number,
  opts: { readonly sweeps?: boolean; readonly known?: readonly KnownFinding[]; readonly judge?: ConstructiveJudge } = {},
): KernelConstructiveReport {
  const knownList = opts.known ?? CONSTRUCTIVE_KNOWN;
  const judge = opts.judge ?? kernelJudge;
  const out: KernelConstructiveReport = { cases: 0, judged: 0, draws: 0, green: 0, failures: [], failedCases: 0, pending: [], deferred: runConstructive([], 1).deferred, known: [], staleKnown: [] };
  for (const c of cases) {
    const n = c.milestone !== 'M0' ? 1 : c.sweep === undefined ? seeds : opts.sweeps === true ? c.sweep : Math.min(c.sweep, seeds);
    const r = runConstructive([c], n, judge);
    out.cases += r.cases;
    out.judged += r.judged;
    out.draws += r.draws;
    out.pending.push(...r.pending);
    for (const k of Object.keys(r.deferred) as (keyof typeof out.deferred)[]) out.deferred[k] += r.deferred[k];
    const ki = knownList.find((x) => x.id === c.id);
    if (ki !== undefined && r.failedCases === 1 && r.failures.every((f) => ki.pattern.test(f.reason))) {
      out.known.push({ id: c.id, draws: r.draws, finding: ki.finding });
      continue;
    }
    if (ki !== undefined && r.failedCases === 0 && r.judged === 1) out.staleKnown.push(c.id);
    out.green += r.green;
    out.failedCases += r.failedCases;
    for (const f of r.failures) if (out.failures.length < 40) out.failures.push(f);
  }
  return out;
}
