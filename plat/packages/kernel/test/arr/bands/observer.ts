// THE OBSERVER the shadow's pins and the CITY probe install (M0-a-09 hardening round S20, line 6 (c); lines 7 and 10):
// an ExactObserver (arr/kerbExact.ts `setExactShadow`) that judges every served read the shadow hands it, writing
// nothing of the kernel's. It loads WITHOUT vitest (a tsx process imports it). Per read:
//   * the SERVICE (relation.ts `servedOfRead`: first / faithful / other, no-move by the served read's warnings);
//   * (k1): per distinct key its first read's X; a later read of the key with another X THROWS (recorded first);
//   * the RELATION against S18's comparands X_U / X_F (exactRegion over kerbParts of the construction's own spines,
//     unreduced / faithful), every BEYOND ARBITRATED by relation.ts's `arbitrate` on THE ARENA FORM's truth
//     (definition.ts `truthOfFace`, `judgeCapped`); a BEYOND on an UNJUDGED face is listed by class, neither pass nor
//     fault; the STRAIGHT-THROUGH figure (X ≠ X_U) and its no-move FIRST reads (Q178 (a)) apart;
//   * the ORACLE once per distinct key, on X (the arena form; UNJUDGED faces counted by class);
//   * THE LINEAGE: F's parent is the LATEST earlier distinct content P whose route region holds F's (every vertex of F
//     in P's closed region, area(F) < area(P)); THE IDENTITY (986 (c)) I(F) := exactRegion(X(P)'s rings, [P's route
//     rings, F's route rings reversed] ∪ the parts of the spines F's key holds and P's does not) against X(F), each
//     unequal case classed INHERITED / CONTACT / END-CHANGED / ROUNDING / OTHER (S18's row 168);
//   * P against H (line 10 T5), the times (T6) and the counts of T1 – T3.
// THE PLANTS (test-side, never a kernel seam): `plantRelation` translates the comparand by that many cm on every no-move
// read (the relation must then FAIL); `plantOracle` translates X by that many cm before the oracle (it must then FAIL).
// An exception inside the observer is recorded before it is rethrown, so a throw a batch swallowed still fails the run.
// THE SESSION'S RULING J785 (on the block of the round's first build: no read of a stage is no-move — every served dry run
// carries W_ATTRACTED — so the CITY no-move reading and its +5 cm control have no population outside the corpus): the
// comparand relation above stays, REPORTED (the corpus's pins and its plant keep it), and every read gains THE LOCAL
// ARBITRATION (relation.ts `relateX`, `witnessesOf`, `arbitrateLocal`, `xRightBy`; definition.ts `truthAtOf`): the served
// region against X itself — EQUAL / NEAR / DIFFERENT — and on every DIFFERENT read on a judged face the truth AT the
// difference, X-RIGHT / X-WRONG / UNDECIDED / THIN (an UNJUDGED face counted by class, never a pass, never a fault).
// FAILING: an X-WRONG read. Its control `plantLocal` translates X by that many cm before the local arbitration on every
// read (the runner's `--plant-relation 10`: X-WRONG must follow). A seed where more than half its DIFFERENT reads are
// UNDECIDED or THIN prints the column VOID; a seed with no read holding a decided witness fails the floor.
import type { FaceId, Plat } from '../../../src/arena/index.js';
import { bridgesOf, DRY_MOVE_CM, kerbParts, ringCrosses, splitsOn, type Spine } from '../../../src/arr/kerb.js';
import { exactKeyContentOfRead, exactRegion, type ExactKeyContent, type ExactObserver, type ExactShadowRead } from '../../../src/arr/kerbExact.js';
import type { Ring } from '../../../src/arr/winding.js';
import { ok, type KernelResult } from '../../../src/num/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { judgeCapped, truthAtOf, truthOfFace, type ArenaTruth, type ArenaWidths, type TruthChain, type Unjudged, type Verdict, type XY } from './definition.js';
import { arbitrate, arbitrateLocal, hausdorff, NEAR_CM, relateRead, relateX, samples, segDist, servedOfRead, T, witnessesOf, xRightBy, type LocalClass, type RelClass, type Served, type Witness } from './relation.js';

/** The observer's options: the plants (cm) and the clock. */
export interface ObserverOptions {
  readonly clock?: () => number;
  /** Translate the comparand by this many cm on every no-move read (the relation's planted control). */
  readonly plantRelation?: number;
  /** Translate X by this many cm before the oracle (the oracle's planted control). */
  readonly plantOracle?: number;
  /** Translate X by this many cm before THE LOCAL ARBITRATION on every read (J785 (2) (d): its planted control). */
  readonly plantLocal?: number;
  /** How many items each evidence list keeps (default 20). */
  readonly keep?: number;
}

/** The ring-point bins of the times (line 9). */
const BINS: readonly [string, number, number][] = [
  ['< 50', 0, 50],
  ['50–200', 50, 200],
  ['200–800', 200, 800],
  ['> 800', 800, Infinity],
];

/** One distinct key's state. */
interface Seen {
  readonly key: string;
  readonly index: number;
  readonly xText: string;
  readonly x: Ring[];
  readonly rings: LatticePoint[][];
  readonly area: number;
  readonly box: readonly [number, number, number, number];
  readonly spines: ReadonlyMap<string, Spine>;
  readonly content: ExactKeyContent;
  /** The construction's region text of the key's first read (DESIGN-5's residual: a later construction under the key differing). */
  readonly firstRegion: string | null;
  readonly firstRegionRings: Ring[] | null;
}

/** A ring's text. */
const ringText = (r: readonly XY[]): string => r.map((q) => `${String(q.x)},${String(q.y)}`).join(' ');
/** A region's text. */
const regionText = (rs: readonly (readonly XY[])[]): string => JSON.stringify(T(rs));

/** The shoelace area of rings (cm², outer minus holes as wound). */
function areaOf(rs: readonly (readonly XY[])[]): number {
  let a = 0;
  for (const r of rs) for (let i = 0; i < r.length; i += 1) a += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
  return Math.abs(a) / 2;
}

/** The rings' box. */
function boxOf(rs: readonly (readonly XY[])[]): [number, number, number, number] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const r of rs) {
    for (const q of r) {
      x0 = Math.min(x0, q.x);
      y0 = Math.min(y0, q.y);
      x1 = Math.max(x1, q.x);
      y1 = Math.max(y1, q.y);
    }
  }
  return [x0, y0, x1, y1];
}

/** Is q in the rings' closed region (non-zero winding, or on an edge; exact on lattice points)? */
function inClosed(rs: readonly (readonly XY[])[], q: XY): boolean {
  let w = 0;
  for (const r of rs) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const s = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (s === 0 && Math.min(a.x, b.x) <= q.x && q.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= q.y && q.y <= Math.max(a.y, b.y)) return true;
      if (a.y <= q.y) {
        if (b.y > q.y && s > 0) w += 1;
      } else if (b.y <= q.y && s < 0) w -= 1;
    }
  }
  return w !== 0;
}

/** The distance from q to a polyline. */
function polyDist(q: XY, pts: readonly XY[], closed: boolean): number {
  let d = Infinity;
  const n = pts.length;
  for (let i = 0; i < (closed ? n : n - 1); i += 1) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
    d = Math.min(d, Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy));
  }
  if (n === 1) d = Math.hypot(q.x - pts[0].x, q.y - pts[0].y);
  return d;
}

/** Is q within a spine's band (its largest half-width) plus `extra`? */
function withinSpine(s: Spine, q: XY, extra: number): boolean {
  for (const l of s.lines) {
    const hw = l.hw.reduce((m, v) => Math.max(m, v), 0);
    if (polyDist(q, l.points, l.closed) <= hw + extra) return true;
  }
  return false;
}

/**
 * The widths a read's own record answers (the arena form's widths, never the caller's callback): a chain with a spine in
 * the record — its half-width where every sample of it is one value, else a profile ('profile reading') — and its ends;
 * none for a chain with no spine there.
 */
export function widthsFromRead(f: ExactShadowRead['f']): ArenaWidths {
  const by = new Map<string, Spine>();
  for (const [k, s] of f.spines) by.set(k, s);
  for (const s of f.through) by.set(s.key, s);
  return (c) => {
    const s = by.get(`${c.role}:${c.entity}`);
    if (s === undefined) return null;
    const hws = s.lines.flatMap((l) => l.hw);
    if (hws.length === 0) return null;
    const one = hws.every((v) => v === hws[0]);
    return { halfWidthCm: one ? hws[0] : { profile: hws.slice(0, 4) }, ends: s.ends };
  };
}

/**
 * relation.ts's hausdorff distance (its samples at 0.25 cm, its segDist), each sample's nearest outline found through a
 * uniform grid of the other set's segments (the same figure, for the REPORTED distances read on many reads).
 */
export function hausdorffFast(a: readonly (readonly XY[])[], b: readonly (readonly XY[])[]): number {
  if (a.length === 0 || b.length === 0) return a.length === b.length ? 0 : Infinity;
  const C = 200;
  let h = 0;
  for (const [from, to] of [[a, b], [b, a]] as const) {
    const cells = new Map<number, (readonly [XY, XY])[]>();
    const key = (i: number, j: number): number => (i + 1_048_576) * 2_097_152 + (j + 1_048_576);
    for (const r of to) {
      for (let i = 0; i < r.length; i += 1) {
        const p = r[i];
        const q = r[(i + 1) % r.length];
        for (let x = Math.floor(Math.min(p.x, q.x) / C); x <= Math.floor(Math.max(p.x, q.x) / C); x += 1) {
          for (let y = Math.floor(Math.min(p.y, q.y) / C); y <= Math.floor(Math.max(p.y, q.y) / C); y += 1) {
            const k = key(x, y);
            const got = cells.get(k);
            if (got === undefined) cells.set(k, [[p, q]]);
            else got.push([p, q]);
          }
        }
      }
    }
    for (const q of samples(from)) {
      const i0 = Math.floor(q.x / C);
      const j0 = Math.floor(q.y / C);
      let best = Infinity;
      for (let r = 0; r < 100_000; r += 1) {
        for (let i = i0 - r; i <= i0 + r; i += 1) {
          for (let j = j0 - r; j <= j0 + r; j += 1) {
            if (Math.max(Math.abs(i - i0), Math.abs(j - j0)) !== r) continue;
            for (const [p, w] of cells.get(key(i, j)) ?? []) best = Math.min(best, segDist(q, p, w));
          }
        }
        if (best <= r * C) break;
      }
      if (best > h) h = best;
    }
  }
  return h;
}

/** A percentile of sorted numbers (nearest rank). */
function pct(xs: readonly number[], p: number): number {
  if (xs.length === 0) return NaN;
  return xs[Math.min(xs.length - 1, Math.max(0, Math.ceil((p / 100) * xs.length) - 1))];
}

/** Time figures: count, mean, p50, p90, p99 (n/a under `floor` samples). */
function timeRow(xs: readonly number[], floor = 100): string {
  if (xs.length < floor) return `n ${String(xs.length)} n/a`;
  const s = [...xs].sort((a, b) => a - b);
  const mean = s.reduce((a, b) => a + b, 0) / s.length;
  return `n ${String(s.length)} mean ${mean.toFixed(3)} p50 ${pct(s, 50).toFixed(3)} p90 ${pct(s, 90).toFixed(3)} p99 ${pct(s, 99).toFixed(3)}`;
}

/** The observer's evidence lists (line 10: the evidence folder's per-seed file). */
export interface Evidence {
  beyond: string[];
  noMoveFirstOffX: string[];
  frameSideEnds: string[];
  unjudgedBeyond: string[];
  identityOther: string[];
  steps: string[];
  failures: string[];
  movedComparandWrong: string[];
  /** J785 (2): every X-WRONG read whole (face, key, its witnesses, both regions' rings, the truth chains near them). */
  xWrong: string[];
  /** J785 (2) (c): X-RIGHT reads where the construction stood off its bound (the first 20 whole). */
  offBound: string[];
  /** J785 (2): DIFFERENT reads on UNJUDGED faces (the first 20 by class). */
  localUnjudged: string[];
}

/** THE OBSERVER (the module comment). */
export class ShadowObserver implements ExactObserver {
  readonly clock?: () => number;
  private readonly opts: ObserverOptions;
  private readonly keep: number;
  /** Every exception the observer or X met (recorded before it propagated). */
  readonly exceptions: string[] = [];
  readonly ev: Evidence = { beyond: [], noMoveFirstOffX: [], frameSideEnds: [], unjudgedBeyond: [], identityOther: [], steps: [], failures: [], movedComparandWrong: [], xWrong: [], offBound: [], localUnjudged: [] };
  // T1
  reads = 0;
  servedBy: Record<string, number> = { first: 0, faithful: 0, other: 0 };
  noMoveReads = 0;
  /** The served reads' warning codes, counted per read that carries each (first reads apart). */
  warningReads: Record<string, number> = {};
  firstWarningReads: Record<string, number> = {};
  constructionRefusals: Record<string, number> = {};
  xOnRefused: Record<string, number> = {};
  xRefusals: Record<string, number> = {};
  xRefusedWhereOk = 0;
  splitsRefusedConstruction = 0;
  splitsRefusedX = 0;
  // T2
  classes: Record<RelClass, number> = { EQUAL: 0, NEAR: 0, MOVED: 0, BEYOND: 0 };
  classesNoMove: Record<RelClass, number> = { EQUAL: 0, NEAR: 0, MOVED: 0, BEYOND: 0 };
  tipNear = 0;
  tipNearNoMove = 0;
  cityMoved = 0;
  arbitrated: Record<string, number> = {};
  relationFailures = 0;
  straightUnequal = 0;
  straightMaxH = 0;
  noMoveFirstOffX = 0;
  noMoveFirstOffXMaxH = 0;
  unjudgedBeyondByClass: Record<string, number> = {};
  plantedReads = 0;
  // T2, THE LOCAL ARBITRATION (J785 (2))
  xRel: Record<'EQUAL' | 'NEAR' | 'DIFFERENT', number> = { EQUAL: 0, NEAR: 0, DIFFERENT: 0 };
  xRelTip = 0;
  localClasses: Record<LocalClass, number> = { 'X-RIGHT': 0, 'X-WRONG': 0, UNDECIDED: 0, THIN: 0 };
  localUnjudged: Record<string, number> = {};
  witnesses = 0;
  witnessesByClass: Record<string, number> = { 'X-RIGHT': 0, 'X-WRONG': 0, UNDECIDED: 0 };
  witnessesOff = 0;
  witnessesBothWrong = 0;
  readsDecided = 0;
  xRightBy: Record<'move' | 'tip' | 'off', number> = { move: 0, tip: 0, off: 0 };
  xRightMaxGap: Record<'move' | 'tip' | 'off', number> = { move: 0, tip: 0, off: 0 };
  plantedLocalReads = 0;
  // T3
  keysJudged = 0;
  keysClean = 0;
  keysFaults = 0;
  unjudged: Record<string, number> = {};
  sampleCounts: number[] = [];
  facesAtCap = 0;
  // T4
  withParent = 0;
  identityEqual = 0;
  identityClasses: Record<string, number> = {};
  roots = 0;
  // T5
  serveRepeat = 0;
  repeatDiffers = 0;
  repeatMaxH = 0;
  serveIdentity = 0;
  deriveWrong: Record<string, number> = {};
  rederive = 0;
  // T6
  cMs: { pts: number; ms: number }[] = [];
  xMs: { pts: number; ms: number }[] = [];
  keyMs: { pts: number; ms: number }[] = [];
  idMs: { pts: number; ms: number }[] = [];
  // k1
  k1Throws = 0;
  /** Per read: its face, service, relation class and distance, and its distinct content's parent (the read index) — the pins'. */
  readonly perRead: { face: FaceId; by: Served['by']; noMove: boolean; cls: RelClass | null; h: number | null; key: string | null; parent: number | null; identity: string | null; xcls: 'EQUAL' | 'NEAR' | 'DIFFERENT' | null; local: LocalClass | 'UNJUDGED' | null; witnesses: Witness[] }[] = [];
  private readonly seen = new Map<string, Seen>();
  private readonly order: Seen[] = [];
  /** X texts by distinct X (keys per distinct X). */
  private readonly xs = new Map<string, number>();

  constructor(opts: ObserverOptions = {}) {
    this.opts = opts;
    this.keep = opts.keep ?? 20;
    if (opts.clock !== undefined) this.clock = opts.clock;
  }

  /** Is the relation's planted control on? */
  get plantedRelation(): boolean {
    return this.opts.plantRelation !== undefined;
  }

  /** The distinct keys read so far. */
  get distinctKeys(): number {
    return this.seen.size;
  }

  /** The share of DIFFERENT reads (on judged faces and unjudged alike) the local arbitration leaves UNDECIDED or THIN (J785 (2): VOID over one half). */
  get localVoidShare(): number {
    return this.xRel.DIFFERENT === 0 ? 0 : (this.localClasses.UNDECIDED + this.localClasses.THIN) / this.xRel.DIFFERENT;
  }

  /** The distinct X read so far. */
  get distinctX(): number {
    return this.xs.size;
  }

  failed(face: FaceId, e: unknown): void {
    this.exceptions.push(`X threw on face ${String(face)}: ${String(e)}`);
  }

  read(r: ExactShadowRead): void {
    try {
      this.take(r);
    } catch (e) {
      this.exceptions.push(`the observer threw on face ${String(r.face)}: ${String(e)}`);
      throw e;
    }
  }

  private now(): number | null {
    return this.clock === undefined ? null : this.clock();
  }

  private list(l: string[], s: string, cap = this.keep): void {
    if (l.length < cap) l.push(s);
  }

  /** One served read, judged (the module comment). */
  private take(r: ExactShadowRead): void {
    this.reads += 1;
    const tag = `read ${String(this.reads)} face ${String(r.face)}`;
    const pts = r.f.rings.reduce((s, q) => s + q.length, 0);
    const served = servedOfRead({ faithful: r.faithful }, r.restaged, r.warnings);
    this.servedBy[served.by === 'moved' ? 'other' : served.by] += 1;
    if (served.noMove) this.noMoveReads += 1;
    for (const w of new Set(r.warnings)) {
      this.warningReads[w] = (this.warningReads[w] ?? 0) + 1;
      if (served.by === 'first') this.firstWarningReads[w] = (this.firstWarningReads[w] ?? 0) + 1;
    }
    const entry: (typeof this.perRead)[number] = { face: r.face, by: served.by, noMove: served.noMove, cls: null, h: null, key: null, parent: null, identity: null, xcls: null, local: null, witnesses: [] };
    this.perRead.push(entry);
    if (r.constructionMs !== null) this.cMs.push({ pts, ms: r.constructionMs });
    if (r.exactMs !== null) this.xMs.push({ pts, ms: r.exactMs });
    if (!r.served.ok) {
      const code = r.construction.ok ? `splits ${r.served.code}` : `${r.served.code} ${r.served.detail.slice(0, 60)}`;
      this.constructionRefusals[code] = (this.constructionRefusals[code] ?? 0) + 1;
      const xr = r.exact.ok ? 'X ok' : `X ${r.exact.code}`;
      this.xOnRefused[xr] = (this.xOnRefused[xr] ?? 0) + 1;
    }
    if (r.construction.ok && r.sp !== null && !r.sp.ok) this.splitsRefusedConstruction += 1;
    if (!r.exact.ok) {
      const c = `${r.exact.code} ${r.exact.detail.slice(0, 60)}`;
      this.xRefusals[c] = (this.xRefusals[c] ?? 0) + 1;
      if (r.construction.ok) {
        this.xRefusedWhereOk += 1;
        this.list(this.ev.failures, `${tag}: X refused ${c} where the construction read ok`, 1000);
      }
      return;
    }
    const X = r.exact.value.region;
    const key = r.exact.value.key;
    entry.key = key;
    const xText = regionText(X);
    this.xs.set(xText, (this.xs.get(xText) ?? 0) + 1);
    const prior = this.seen.get(key);
    if (prior !== undefined) {
      // (k1): one key, one X
      if (prior.xText !== xText) {
        this.k1Throws += 1;
        throw new Error(`observer: (k1) two reads with one key and two X (${tag}; first read ${String(prior.index)})`);
      }
      // P against H: a repeat of a key already read is served from state; DESIGN-5's residual
      this.serveRepeat += 1;
      if (r.construction.ok && prior.firstRegion !== null) {
        const rt = regionText(r.construction.value);
        if (rt !== prior.firstRegion) {
          this.repeatDiffers += 1;
          this.repeatMaxH = Math.max(this.repeatMaxH, hausdorffFast(r.construction.value, prior.firstRegionRings as Ring[]));
        }
      }
    }
    // the key's content (for the splits over X, the identity and the arbitration), timed once per distinct key
    const k0 = this.now();
    const content = exactKeyContentOfRead(r.f, r.vertexContacts);
    const k1 = this.now();
    if (!content.ok) throw new Error(`observer: the key content refused where X read ok (${tag})`);
    if (prior === undefined && k0 !== null && k1 !== null) this.keyMs.push({ pts, ms: k1 - k0 });
    // the arena form's truth, read only where it is needed (the oracle once per distinct key; a BEYOND's arbitration)
    let truthMemo: ReturnType<typeof truthOfFace> | null = null;
    const truth = (): ReturnType<typeof truthOfFace> => (truthMemo ??= truthOfFace(r.p, r.face, widthsFromRead(r.f)));
    const along = bridgesOf(r.p, r.f.edges);
    const own = new Set(r.f.rings.map((q) => ringText(q)));
    const exempt = (q: readonly LatticePoint[]): boolean | null => (own.has(ringText(q)) ? !ringCrosses(q, along) : null);
    if (prior === undefined) {
      const lin = this.firstOfKey(r, tag, pts, key, X, xText, content.value, truth, exempt);
      entry.parent = lin.parent;
      entry.identity = lin.identity;
    }
    // THE RELATION (line 7) against X_U / X_F over the construction's own spines
    if (r.construction.ok) {
      const xu = kerbParts(r.f.rings, r.spines, false);
      const xf = kerbParts(r.f.rings, r.spines, true);
      if (xu.ok && xf.ok) {
        const XU = exactRegion(r.f.rings, xu.value);
        const XF = exactRegion(r.f.rings, xf.value);
        let comparand: Ring[] = served.by === 'faithful' ? XF : XU;
        if (this.opts.plantRelation !== undefined && served.noMove && comparand.length > 0) {
          const d = this.opts.plantRelation;
          comparand = comparand.map((q) => q.map((v) => ({ x: (v.x + d) as typeof v.x, y: v.y })));
          this.plantedReads += 1;
        }
        const region = r.construction.value;
        const rel = relateRead(region, comparand, served);
        entry.cls = rel.cls;
        entry.h = rel.h;
        this.classes[rel.cls] += 1;
        if (served.noMove) this.classesNoMove[rel.cls] += 1;
        if (rel.tip === true) {
          this.tipNear += 1;
          if (served.noMove) this.tipNearNoMove += 1;
        }
        if (rel.cityMoved === true) this.cityMoved += 1;
        if (rel.cls === 'BEYOND') this.beyond(r, tag, served, region, comparand, truth, exempt, content);
        // the STRAIGHT-THROUGH figure: X against X_U; its no-move FIRST reads apart (Q178 (a))
        if (regionText(XU) !== xText) {
          const h = hausdorffFast(X, XU);
          this.straightUnequal += 1;
          this.straightMaxH = Math.max(this.straightMaxH, h);
          if (served.noMove && served.by === 'first') {
            this.noMoveFirstOffX += 1;
            this.noMoveFirstOffXMaxH = Math.max(this.noMoveFirstOffXMaxH, h);
            this.list(this.ev.noMoveFirstOffX, `${tag} (${h.toFixed(2)} cm): F ${JSON.stringify(T(r.f.rings))} X ${JSON.stringify(T(X))} X_U ${JSON.stringify(T(XU))} region ${JSON.stringify(T(region))}`);
          }
        }
      }
      // THE LOCAL ARBITRATION (J785 (2)): the served region against X itself
      this.local(r, tag, entry, r.construction.value, X, key, truth);
    }
  }

  /** THE LOCAL ARBITRATION of one read (J785 (2); the module comment). */
  private local(r: ExactShadowRead, tag: string, entry: (typeof this.perRead)[number], region: Ring[], X0: Ring[], key: string, truthOf: () => ReturnType<typeof truthOfFace>): void {
    const d = this.opts.plantLocal;
    let X = X0;
    if (d !== undefined && X0.length > 0) {
      X = X0.map((q) => q.map((v) => ({ x: (v.x + d) as typeof v.x, y: v.y })));
      this.plantedLocalReads += 1;
    }
    const rel = relateX(region, X);
    entry.xcls = rel.cls;
    this.xRel[rel.cls] += 1;
    if (rel.tip === true) this.xRelTip += 1;
    if (rel.cls !== 'DIFFERENT') return;
    const truth = truthOf();
    if (!truth.ok) {
      entry.local = 'UNJUDGED';
      this.localUnjudged[truth.unjudged] = (this.localUnjudged[truth.unjudged] ?? 0) + 1;
      this.list(this.ev.localUnjudged, `${tag} [${truth.unjudged}] ${rel.h.toFixed(2)} cm: F ${JSON.stringify(T(r.f.rings))} region ${JSON.stringify(T(region))} X ${JSON.stringify(T(X))}`);
      return;
    }
    const t = truth.value;
    const la = arbitrateLocal(region, X, truthAtOf(t.F, t.chains, t.step), witnessesOf(region, X, rel.far));
    entry.local = la.cls;
    entry.witnesses = la.witnesses;
    this.localClasses[la.cls] += 1;
    let decided = 0;
    for (const w of la.witnesses) {
      this.witnesses += 1;
      this.witnessesByClass[w.cls] += 1;
      if (w.cls !== 'UNDECIDED') decided += 1;
      if (w.note === 'off the difference') this.witnessesOff += 1;
      if (w.note === 'both wrong') this.witnessesBothWrong += 1;
    }
    if (decided > 0) this.readsDecided += 1;
    const wt = (w: Witness): string => `(${w.at.x.toFixed(2)}, ${w.at.y.toFixed(2)}) ${w.cls}${w.note === undefined ? '' : ` [${w.note}]`} gap ${w.gap.toFixed(2)} cm between (${w.q.x.toFixed(2)}, ${w.q.y.toFixed(2)}) and (${w.r.x.toFixed(2)}, ${w.r.y.toFixed(2)})`;
    if (la.cls === 'X-WRONG') {
      const bad = la.witnesses.filter((w) => w.cls === 'X-WRONG');
      const near = t.chains.filter((c) => {
        const hw = c.hw === null ? 0 : typeof c.hw === 'number' ? c.hw : Math.max(c.hw[0], c.hw[1]);
        return bad.some((w) => polyDist(w.at, c.points, c.closed) <= hw + 100);
      });
      const line = `${tag} key ${key}: X-WRONG at ${bad.map(wt).join('; ')} | F ${JSON.stringify(T(r.f.rings))} | region ${JSON.stringify(T(region))} | X ${JSON.stringify(T(X))} | truth chains near ${JSON.stringify(near.map((c) => ({ key: c.key, hw: c.hw, ends: c.ends, junction: c.junction, closed: c.closed, points: T([c.points])[0] })))}`;
      this.list(this.ev.xWrong, line, 1000);
      this.list(this.ev.failures, `${tag}: the local arbitration finds X wrong at ${bad.map(wt).join('; ')}`, 1000);
    } else if (la.cls === 'X-RIGHT') {
      const by = xRightBy(la.witnesses, t.chains);
      this.xRightBy[by.by] += 1;
      this.xRightMaxGap[by.by] = Math.max(this.xRightMaxGap[by.by], by.gap);
      if (by.by === 'off') this.list(this.ev.offBound, `${tag} key ${key} (largest gap ${by.gap.toFixed(2)} cm): ${la.witnesses.map(wt).join('; ')} | F ${JSON.stringify(T(r.f.rings))} | region ${JSON.stringify(T(region))} | X ${JSON.stringify(T(X))}`);
    }
  }

  /** A BEYOND read, arbitrated on a judged face, listed by class on an unjudged one. */
  private beyond(r: ExactShadowRead, tag: string, served: Served, region: Ring[], comparand: Ring[], truthOf: () => ReturnType<typeof truthOfFace>, exempt: (q: readonly LatticePoint[]) => boolean | null, content: KernelResult<ExactKeyContent>): void {
    const truth = truthOf();
    if (!truth.ok) {
      this.unjudgedBeyondByClass[truth.unjudged] = (this.unjudgedBeyondByClass[truth.unjudged] ?? 0) + 1;
      this.list(this.ev.unjudgedBeyond, `${tag} [${truth.unjudged}${served.noMove ? ', no-move' : ''}] ${hausdorffFast(region, comparand).toFixed(2)} cm: F ${JSON.stringify(T(r.f.rings))} region ${JSON.stringify(T(region))} comparand ${JSON.stringify(T(comparand))}`, 100_000);
      return;
    }
    const t = truth.value;
    const ab = arbitrate(
      {
        tag,
        Fr: t.F,
        truth: t.chains,
        exempt,
        content,
        k: ok({ spines: r.spines }),
        rf: { rings: r.f.rings, spines: r.f.spines, through: r.f.through },
        spinesOf: () => ({ edge: [], vertex: [], touching: [] }),
        judge: (F, chains, Xr, ex) => judgeCapped(F, chains, Xr, t.step, ex),
      },
      region,
      comparand,
      served,
      true,
    );
    const cls = ab.fails ? (ab.line.includes('neither') ? 'neither wrong (no-move: FAILING)' : 'comparand wrong (FAILING)') : ab.line.includes("construction's reading") ? "the construction's reading (another spine set / unreduced runs)" : ab.line.includes("construction's case") ? `the construction's case${ab.line.includes('Q110') ? ' (Q110 (c) / Q117 tip)' : ' (new)'}` : 'neither wrong (moved: listed)';
    this.arbitrated[cls] = (this.arbitrated[cls] ?? 0) + 1;
    this.list(this.ev.beyond, `${ab.line} | F ${JSON.stringify(T(r.f.rings))} | region ${JSON.stringify(T(region))} | comparand ${JSON.stringify(T(comparand))}`, 100_000);
    if (ab.fails) {
      this.relationFailures += 1;
      this.list(this.ev.failures, ab.line, 1000);
    }
  }

  /** The first read of a distinct key: the oracle, the lineage and the identity, P against H. */
  private firstOfKey(r: ExactShadowRead, tag: string, pts: number, key: string, X: Ring[], xText: string, content: ExactKeyContent, truthOf: () => ReturnType<typeof truthOfFace>, exempt: (q: readonly LatticePoint[]) => boolean | null): { parent: number | null; identity: string | null } {
    let identity: string | null = null;
    // THE ORACLE (once per distinct key)
    const truth = truthOf();
    if (!truth.ok) {
      this.unjudged[truth.unjudged] = (this.unjudged[truth.unjudged] ?? 0) + 1;
      if (truth.unjudged === 'frame-side end') this.list(this.ev.frameSideEnds, `${tag}: ${truth.detail} | F ${JSON.stringify(T(r.f.rings))} | X ${JSON.stringify(T(X))}`, 3);
    } else {
      const t: ArenaTruth = truth.value;
      const d = this.opts.plantOracle;
      const Xj = d === undefined ? X : X.map((q) => q.map((v) => ({ x: (v.x + d) as typeof v.x, y: v.y })));
      const v: Verdict & { step: number } = judgeCapped(t.F, t.chains, Xj, t.step, exempt);
      this.keysJudged += 1;
      this.sampleCounts.push(v.samples);
      if (t.step > 20) this.facesAtCap += 1;
      this.list(this.ev.steps, `${tag}: area ${(t.area / 10_000).toFixed(2)} m² step ${t.step.toFixed(2)} cm samples ${String(v.samples)} judged ${String(v.judged)}`, 1_000_000);
      if (v.misses.length === 0 && v.vertexFaults.length === 0 && v.simplicity.length === 0) this.keysClean += 1;
      else {
        this.keysFaults += 1;
        this.list(this.ev.failures, `${tag}: the oracle on X — misses ${JSON.stringify(v.misses.slice(0, 3))} vertices ${JSON.stringify(v.vertexFaults.slice(0, 3))} simplicity ${JSON.stringify(v.simplicity.slice(0, 2))} | F ${JSON.stringify(T(r.f.rings))} | X ${JSON.stringify(T(X))} | chains ${JSON.stringify(t.chains.map((c: TruthChain) => ({ key: c.key, hw: c.hw, ends: c.ends, junction: c.junction })))}`, 1000);
      }
    }
    // the X splits (splitsOn over X with X's spines)
    const xSpines = new Map<string, Spine>(r.f.spines);
    for (const s of r.f.through) if (content.reaching.includes(s.key)) xSpines.set(s.key, s);
    const xs = splitsOn(r.p, r.f.edges, xSpines, X.map((q) => q.slice()));
    if (!xs.ok) this.splitsRefusedX += 1;
    // THE LINEAGE: the latest earlier distinct content whose route region holds F's
    const area = areaOf(r.f.rings);
    const box = boxOf(r.f.rings);
    let parent: Seen | null = null;
    for (let i = this.order.length - 1; i >= 0 && parent === null; i -= 1) {
      const P = this.order[i];
      if (!(area < P.area) || box[0] < P.box[0] || box[1] < P.box[1] || box[2] > P.box[2] || box[3] > P.box[3]) continue;
      if (r.f.rings.every((ring) => ring.every((q) => inClosed(P.rings, q)))) parent = P;
    }
    const self: Seen = {
      key,
      index: this.reads,
      xText,
      x: X,
      rings: r.f.rings,
      area,
      box,
      spines: new Map<string, Spine>([...xSpines]),
      content,
      firstRegion: r.construction.ok ? regionText(r.construction.value) : null,
      firstRegionRings: r.construction.ok ? r.construction.value : null,
    };
    if (parent === null) {
      this.roots += 1;
      this.rederive += 1;
    } else {
      this.withParent += 1;
      const pKeys = new Set(parent.content.spines.map((s) => s.key));
      const extra: Ring[] = [];
      for (const s of content.spines) if (!pKeys.has(s.key)) for (const q of s.parts) extra.push(q);
      const i0 = this.now();
      const I = exactRegion(parent.x, [...parent.rings, ...r.f.rings.map((q) => q.slice().reverse()), ...extra]);
      const i1 = this.now();
      if (i0 !== null && i1 !== null) this.idMs.push({ pts, ms: i1 - i0 });
      if (regionText(I) === xText) {
        identity = 'EQUAL';
        this.identityEqual += 1;
        this.serveIdentity += 1;
      } else {
        const { h, far } = hausdorff(I, X, 0.25);
        const fKeys = new Set(content.spines.map((s) => s.key));
        const gone = [...parent.spines.values()].filter((s) => !fKeys.has(s.key));
        const fresh = [...xSpines.values()].filter((s) => !pKeys.has(s.key));
        const changed = [...xSpines.values()].filter((s) => {
          const q = parent?.spines.get(s.key);
          return q !== undefined && JSON.stringify(q.lines.map((l) => l.junction)) !== JSON.stringify(s.lines.map((l) => l.junction));
        });
        const cls = new Set<string>();
        for (const q of far) {
          if (gone.some((s) => withinSpine(s, q, NEAR_CM))) cls.add('INHERITED');
          else if (fresh.some((s) => withinSpine(s, q, NEAR_CM))) cls.add('CONTACT');
          else if (changed.some((s) => withinSpine(s, q, DRY_MOVE_CM))) cls.add('END-CHANGED');
          else if (h <= NEAR_CM) cls.add('ROUNDING');
          else cls.add('OTHER');
        }
        if (cls.size === 0) cls.add(h <= NEAR_CM ? 'ROUNDING' : 'OTHER');
        identity = [...cls].sort().join('+');
        for (const c of cls) {
          this.identityClasses[c] = (this.identityClasses[c] ?? 0) + 1;
          this.deriveWrong[c] = (this.deriveWrong[c] ?? 0) + 1;
        }
        if (cls.has('OTHER')) this.list(this.ev.identityOther, `${tag} (${h.toFixed(2)} cm; parent read ${String(parent.index)}): I ${JSON.stringify(T(I))} X ${JSON.stringify(T(X))}`);
      }
    }
    this.seen.set(key, self);
    this.order.push(self);
    return { parent: parent === null ? null : parent.index, identity };
  }

  /** The failing counts of line 7 (each must be 0). */
  failing(): Record<string, number> {
    return {
      oracleFaults: this.keysFaults,
      relationFailures: this.relationFailures,
      xRefusedWhereOk: this.xRefusedWhereOk,
      k1Throws: this.k1Throws,
      exceptions: this.exceptions.length,
      localXWrong: this.localClasses['X-WRONG'],
    };
  }

  /** Line 10's tables T1 – T6 (T7 is the runner's), each a block of lines. */
  tables(label: string, cuts: number | null): string[] {
    const dk = this.distinctKeys;
    const judgedShare = dk === 0 ? 0 : this.keysJudged / dk;
    const binned = (xs: readonly { pts: number; ms: number }[]): string => BINS.map(([name, lo, hi]) => `[${name}] ${timeRow(xs.filter((e) => e.pts >= lo && e.pts < hi).map((e) => e.ms))}`).join('; ');
    const sc = [...this.sampleCounts].sort((a, b) => a - b);
    const localShare = this.localVoidShare;
    const localVoid = localShare > 0.5;
    return [
      `T1 SERVICE ${label}: reads ${String(this.reads)}; distinct keys ${String(dk)}; served first ${String(this.servedBy.first)} / faithful ${String(this.servedBy.faithful)} / other ${String(this.servedBy.other)}; no-move reads ${String(this.noMoveReads)} (reads carrying each warning ${JSON.stringify(this.warningReads)}; first reads ${JSON.stringify(this.firstWarningReads)}); the construction's refusals ${JSON.stringify(this.constructionRefusals)}, X on those faces ${JSON.stringify(this.xOnRefused)}; X's refusals ${JSON.stringify(this.xRefusals)} (where the construction read ok: ${String(this.xRefusedWhereOk)}); splits refused: the construction's ${String(this.splitsRefusedConstruction)}, X's ${String(this.splitsRefusedX)} (per distinct key)`,
      `T2 RELATION ${label} (the served region against X; J785 (2)): ${JSON.stringify(this.xRel)} (NEAR at a tip ${String(this.xRelTip)}); of DIFFERENT, THE LOCAL ARBITRATION ${JSON.stringify(this.localClasses)} (DIFFERENT on UNJUDGED faces by class ${JSON.stringify(this.localUnjudged)}); UNDECIDED or THIN share ${localShare.toFixed(3)}${localVoid ? ' — VOID: over one half' : ''}; reads with a decided witness ${String(this.readsDecided)}; witnesses ${String(this.witnesses)} ${JSON.stringify(this.witnessesByClass)} (off the difference ${String(this.witnessesOff)}, both wrong ${String(this.witnessesBothWrong)}); the X-RIGHT reads by what the construction did: its move within DRY_MOVE_CM ${String(this.xRightBy.move)} (largest gap ${this.xRightMaxGap.move.toFixed(2)} cm), at a tip (Q110 (c) / Q117) ${String(this.xRightBy.tip)} (${this.xRightMaxGap.tip.toFixed(2)} cm), OFF ITS BOUND ${String(this.xRightBy.off)} (${this.xRightMaxGap.off.toFixed(2)} cm); FAILING (X-WRONG on judged faces) ${String(this.localClasses['X-WRONG'])}${this.opts.plantLocal === undefined ? '' : `; PLANTED X +${String(this.opts.plantLocal)} cm before the local arbitration on ${String(this.plantedLocalReads)} reads`}`,
      `T2' THE COMPARAND RELATION ${label} (S18's, against X_U / X_F; REPORTED — its no-move bar withdrawn at CITY by J785 (1)): ${JSON.stringify(this.classes)} (NEAR at a tip ${String(this.tipNear)}; MOVED at CITY — BEYOND for want of a locus, within DRY_MOVE_CM — ${String(this.cityMoved)}); no-move ${JSON.stringify(this.classesNoMove)} (NEAR at a tip ${String(this.tipNearNoMove)}); every BEYOND arbitrated ${JSON.stringify(this.arbitrated)}; comparand wrong (FAILING) ${String(this.relationFailures)}; straight-through (X ≠ X_U) ${String(this.straightUnequal)} reads, max ${this.straightMaxH.toFixed(2)} cm; of them no-move FIRST reads (Q178 (a)) ${String(this.noMoveFirstOffX)}, max ${this.noMoveFirstOffXMaxH.toFixed(2)} cm; BEYOND on UNJUDGED faces by class ${JSON.stringify(this.unjudgedBeyondByClass)}${this.opts.plantRelation === undefined ? '' : `; PLANTED comparand +${String(this.opts.plantRelation)} cm on ${String(this.plantedReads)} no-move reads`}`,
      `T3 ORACLE ${label}: distinct keys judged ${String(this.keysJudged)} of ${String(dk)} (share ${judgedShare.toFixed(3)}${judgedShare < 0.5 ? ' — VOID: under one half' : ''}), clean ${String(this.keysClean)}, faults ${String(this.keysFaults)}; UNJUDGED by class ${JSON.stringify(this.unjudged)}; samples per face median ${sc.length === 0 ? 'n/a' : String(pct(sc, 50))}, p99 ${sc.length === 0 ? 'n/a' : String(pct(sc, 99))}, faces at the cap ${String(this.facesAtCap)}${this.opts.plantOracle === undefined ? '' : `; PLANTED X +${String(this.opts.plantOracle)} cm`}`,
      `T4 IDENTITY ${label}: distinct contents with a parent ${String(this.withParent)}; I(F) = X(F) ${String(this.identityEqual)}; unequal by class ${JSON.stringify(this.identityClasses)}; roots ${String(this.roots)}`,
      `T5 P AGAINST H ${label}: SERVE FROM STATE ${String(this.serveRepeat + this.serveIdentity)} (repeats ${String(this.serveRepeat)}, of them the construction differing from its first read ${String(this.repeatDiffers)} max ${this.repeatMaxH.toFixed(2)} cm; children whose identity holds ${String(this.serveIdentity)}); DERIVE WRONG by class ${JSON.stringify(this.deriveWrong)}; RE-DERIVE ${String(this.rederive)}; P's memo: distinct keys ${String(dk)}, distinct X ${String(this.distinctX)}, keys per distinct X ${(dk / Math.max(1, this.distinctX)).toFixed(3)}${cuts === null ? '' : `; S8's cuts (faces.cuts = lanes.length) ${String(cuts)}, reads per cut ${(this.reads / Math.max(1, cuts)).toFixed(3)}, distinct keys per cut ${(dk / Math.max(1, cuts)).toFixed(3)}`}`,
      `T6 TIME ${label} (source, debug build, ms; the observer's clock): the construction ${binned(this.cMs)}; X ${binned(this.xMs)}; the key alone (once per distinct key) ${binned(this.keyMs)}; the identity ${binned(this.idMs)}; all reads: the construction ${timeRow(this.cMs.map((e) => e.ms), 1)}; X ${timeRow(this.xMs.map((e) => e.ms), 1)}`,
    ];
  }
}

/**
 * The observer's failing verdict line (line 7, as J785 rules it): FAIL where any failing count is above 0 (an X-WRONG
 * read of the local arbitration among them) or a floor is not met (reads observed > 0 and ≥ the cuts, distinct keys
 * judged > 0, a read with a decided witness); else VOID where the oracle's judged share is under one half or the local
 * arbitration's UNDECIDED-or-THIN share over one half (never a pass: the session reads it); else PASS.
 */
export function verdictLine(o: ShadowObserver, cuts: number | null): string {
  const f = o.failing();
  const bad = Object.entries(f).filter(([, n]) => n > 0);
  const share = o.distinctKeys === 0 ? 0 : o.keysJudged / o.distinctKeys;
  const floor = o.reads > 0 && (cuts === null || o.reads >= cuts) && o.keysJudged > 0 && o.readsDecided > 0;
  const voidOracle = share < 0.5;
  const localShare = o.localVoidShare;
  const voidLocal = localShare > 0.5;
  const status = bad.length > 0 || !floor ? 'FAIL' : voidOracle || voidLocal ? 'VOID' : 'PASS';
  const control = o.plantedRelation && o.plantedReads === 0 ? ' (the comparand control: 0 no-move reads to plant)' : '';
  return `${status} local arbitration ${voidLocal ? `VOID (UNDECIDED or THIN share ${localShare.toFixed(3)})` : f.localXWrong === 0 ? 'ok' : `FAIL ${String(f.localXWrong)} X-WRONG`} (reads with a decided witness ${String(o.readsDecided)}${o.readsDecided > 0 ? '' : ' — FAIL: the floor'}); comparand relation ${f.relationFailures === 0 ? 'ok' : `FAIL ${String(f.relationFailures)}`}${control}; oracle ${voidOracle ? `VOID (judged share ${share.toFixed(3)})` : f.oracleFaults === 0 ? 'ok' : `FAIL ${String(f.oracleFaults)}`}; X refused where ok ${String(f.xRefusedWhereOk)}; (k1) ${String(f.k1Throws)}; exceptions ${String(f.exceptions)}; reads ${String(o.reads)}${cuts === null ? '' : ` ≥ cuts ${String(cuts)} ${o.reads >= cuts ? 'ok' : 'FAIL'}`}; distinct keys judged ${String(o.keysJudged)}`;
}
