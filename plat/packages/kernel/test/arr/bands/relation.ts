// THE CONSTRUCTION RELATION and its arbitration, vitest-free (M0-a-09 hardening round S20, line 6 (a)): derived.test.ts's
// hausdorff, tipNear, relate, NEAR_CM, Served and servedOf (round S18's line 7) MOVED here verbatim with what they call
// (segDist, ringDist, samples, the ring text T, tipClass), and THE ARBITRATION — a closure inside derived.test.ts's
// readAll — LIFTED to a function of what it closed over (`arbitrate`: F, the truth, the exemption, the key content, the
// construction read and readFace's record), its body otherwise verbatim; derived.test.ts imports them all. Added for a
// read no test recorded (a stage's at CITY, observer.ts): `servedOfRead` — the service from the served read's own census
// and warnings (FIRST := faithful 'none' and not restaged, FAITHFUL := 'taken', OTHER := the rest; NO-MOVE := first and
// none of W_ATTRACTED, W_PLACED, W_SNAP_PASSES, W_WEDGE_ROUTED among its warnings — S18's FM2 reading stated as the CITY
// reading) — and `relateRead`, relate() unchanged with MOVED at CITY := a read that moved whose class is BEYOND only for
// want of a locus, two-sided within DRY_MOVE_CM (no per-call locus without the mock: a REPORTED class only).
// THE SESSION'S RULING J785 (2) adds THE LOCAL ARBITRATION (below `relateRead`): the served region against X itself
// (`relateX`: EQUAL / NEAR / DIFFERENT), and on every DIFFERENT read the definition's truth read AT the difference —
// witnesses at the midpoints of the far pairs more than 2 · MARGIN_CM apart (`farPairs`, `witnessesOf`), each classed
// X-RIGHT / X-WRONG / UNDECIDED by the arena form's truth at it (definition.ts `truthAtOf`), the read by its witnesses
// (`arbitrateLocal`), an X-RIGHT read by what the construction did there (`xRightBy`). J785 (1) withdrew the CITY
// no-move reading (`servedOfRead`'s NO-MOVE, `relateRead`'s `cityMoved`) at CITY and at the test size; the corpus keeps it.
// It loads in a plain tsx process: it imports definition.ts (whose simpleRing is simple.ts's) and the kernel's sources.
import { DRY_MOVE_CM, kerbParts, type Spine } from '../../../src/arr/kerb.js';
import { exactRegion, type ExactKeyContent } from '../../../src/arr/kerbExact.js';
import { HOT_PIXEL_CM } from '../../../src/index/index.js';
import type { KernelResult } from '../../../src/num/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { CAP_SAMPLES, clean, GRID_CM, gridOfStep, insideRings, judge, MARGIN_CM, spinesOf, type PointTruth, type TruthChain, type Verdict, type XY } from './definition.js';

/** One dry-run insertion as derived.test.ts's wrapper of insertChain records it (`rec.calls`). */
export interface DryCall {
  readonly save: number;
  readonly given: { x: number; y: number }[];
  readonly placed: { x: number; y: number }[] | null;
  readonly refused: string | null;
  readonly warnings: string[];
}

/** THE NEAR BOUND (line 7): 2 · HOT_PIXEL_CM + √2⁄2 = 2.127 cm, taken as 2.13 cm. */
export const NEAR_CM = 2.13;

/** Rings to "x,y x,y …" texts. */
export const T = (rs: readonly (readonly XY[])[]): string[] => rs.map((r) => r.map((q) => `${String(q.x)},${String(q.y)}`).join(' '));

/** Distance from q to the segment a–b. */
export function segDist(q: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
  return Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy);
}

/** Distance from q to the rings' outlines. */
export function ringDist(rs: readonly (readonly XY[])[], q: XY): number {
  let d = Infinity;
  for (const r of rs) for (let i = 0; i < r.length; i += 1) d = Math.min(d, segDist(q, r[i], r[(i + 1) % r.length]));
  return d;
}

/** Every outline of the rings sampled at most 0.25 cm apart (line 7: never hausdorffCm's 4 cm). */
export function samples(rs: readonly (readonly XY[])[]): XY[] {
  const out: XY[] = [];
  for (const r of rs) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 0.25));
      for (let k = 0; k < n; k += 1) out.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n });
    }
  }
  return out;
}

/** The two-sided Hausdorff distance of two ring sets' outlines, sampled at 0.25 cm (∞ where one is empty and the other not), and the points beyond `beyond`. */
export function hausdorff(a: readonly (readonly XY[])[], b: readonly (readonly XY[])[], beyond = Infinity): { h: number; far: XY[] } {
  if (a.length === 0 || b.length === 0) return { h: a.length === b.length ? 0 : Infinity, far: [...samples(a), ...samples(b)] };
  let h = 0;
  const far: XY[] = [];
  for (const [from, to] of [[a, b], [b, a]] as const) {
    for (const q of samples(from)) {
      const d = ringDist(to, q);
      if (d > h) h = d;
      if (d > beyond) far.push(q);
    }
  }
  return { h, far };
}

/** How a construction read was served (line 7). */
export interface Served {
  /** 'first' (one dry run, the first read's), 'faithful' (kerbCensus 'taken': the last), 'moved' (any other case). */
  readonly by: 'first' | 'faithful' | 'moved';
  /** The served dry run moved nothing: every call placed its points at themselves, no refusal, none of the move warnings. */
  readonly noMove: boolean;
  /** The given rings of every call that moved (the MOVED class's locus, whole outlines). */
  readonly movedParts: XY[][];
}

/** The read's service from the wrapper's record (line 7). */
export function servedOf(calls: readonly DryCall[], saves: number, faithful: 'none' | 'tried' | 'taken'): Served {
  const moved = (c: DryCall): boolean =>
    c.refused !== null || c.warnings.length > 0 || c.placed === null || c.placed.length !== c.given.length || c.placed.some((q, i) => q.x !== c.given[i].x || q.y !== c.given[i].y);
  const movedParts = calls.filter(moved).map((c) => c.given);
  if (faithful === 'none' && saves <= 1) return { by: 'first', noMove: calls.every((c) => !moved(c)), movedParts };
  if (faithful === 'taken') return { by: 'faithful', noMove: false, movedParts };
  return { by: 'moved', noMove: false, movedParts };
}

/** Line 7's classes. */
export type RelClass = 'EQUAL' | 'NEAR' | 'MOVED' | 'BEYOND';

/**
 * THE NEAR BOUND AT A TIP (the derivation of line 7 completed at an acute corner): on a no-move read the construction's
 * crossing p stands within HOT_PIXEL_CM of each of its two lines, so within HOT_PIXEL_CM ⁄ sin(θ⁄2) of their exact
 * crossing x along the corner's bisector (θ the corner's angle — the points within h of two lines meeting at θ form a
 * rhombus of half-diagonal h ⁄ sin(θ⁄2)), and X_U's corner is x rounded half away (within √2⁄2): a difference at a convex
 * corner of either outline lies within HOT_PIXEL_CM ⁄ sin(θ⁄2) + HOT_PIXEL_CM + √2⁄2 of that corner. At θ ≥ 90° this is
 * within NEAR_CM; at a shallow corner (two strips' edges a few degrees apart) it is not — the round's first PR-size run met
 * 2.24 and 2.83 cm at corners of 15° and 9°, every other point of those outlines within 0.7 cm.
 */
export function tipNear(rs: readonly (readonly XY[])[], q: XY): boolean {
  for (const r of rs) {
    const n = r.length;
    for (let i = 0; i < n; i += 1) {
      const a = r[(i + n - 1) % n];
      const v = r[i];
      const b = r[(i + 1) % n];
      const ux = a.x - v.x;
      const uy = a.y - v.y;
      const wx = b.x - v.x;
      const wy = b.y - v.y;
      // a convex corner of the region (on the ring's left): a left turn a → v → b
      if ((v.x - a.x) * (b.y - v.y) - (v.y - a.y) * (b.x - v.x) <= 0) continue;
      const theta = Math.acos(Math.max(-1, Math.min(1, (ux * wx + uy * wy) / (Math.hypot(ux, uy) * Math.hypot(wx, wy)))));
      const bound = HOT_PIXEL_CM / Math.sin(theta / 2) + HOT_PIXEL_CM + Math.SQRT2 / 2;
      if (Math.hypot(q.x - v.x, q.y - v.y) <= bound) return true;
    }
  }
  return false;
}

/** The relation of a construction region to its comparand (line 7). */
export function relate(region: readonly (readonly XY[])[], comparand: readonly (readonly XY[])[], served: Served): { cls: RelClass; h: number; tip?: boolean } {
  if (JSON.stringify(T(region)) === JSON.stringify(T(comparand))) return { cls: 'EQUAL', h: 0 };
  const { h, far } = hausdorff(region, comparand, NEAR_CM);
  if (h <= NEAR_CM) return { cls: 'NEAR', h };
  // every difference beyond NEAR_CM at a convex corner, within its tip bound (both outlines non-empty)
  if (region.length > 0 && comparand.length > 0 && far.every((q) => tipNear(region, q) || tipNear(comparand, q))) return { cls: 'NEAR', h, tip: true };
  if (!served.noMove && h <= DRY_MOVE_CM && served.movedParts.length > 0 && far.every((q) => served.movedParts.some((pt) => ringDist([pt], q) <= DRY_MOVE_CM))) return { cls: 'MOVED', h };
  return { cls: 'BEYOND', h };
}

/** A construction-wrong case's class (line 7): an acute tip or bend (Q110 (c), Q117's tips) where its fault lies by a chain's end or bend, else new. */
export function tipClass(v: Verdict, chains: readonly TruthChain[]): string {
  const at = [...v.vertexFaults, ...v.misses].map((s) => /\((-?[\d.]+), (-?[\d.]+)\)/.exec(s)).filter((m) => m !== null).map((m) => ({ x: Number((m as RegExpExecArray)[1]), y: Number((m as RegExpExecArray)[2]) }));
  for (const q of at) {
    for (const c of chains) {
      const hw = c.hw === null ? 0 : typeof c.hw === 'number' ? c.hw : Math.max(c.hw[0], c.hw[1]);
      const tips = c.closed ? c.points : [c.points[0], ...c.points.slice(1, -1), c.points[c.points.length - 1]];
      if (tips.some((t) => Math.hypot(t.x - q.x, t.y - q.y) <= hw + DRY_MOVE_CM)) return 'Q110 (c) / Q117 tip';
    }
  }
  return 'new';
}

/** What the arbitration closed over in derived.test.ts's readAll (line 6 (a): lifted to a function of it). */
export interface ArbitrationInput {
  /** The read's label in the lines it returns. */
  readonly tag: string;
  /** F's L1 rings (the arena's walk). */
  readonly Fr: readonly (readonly XY[])[];
  /** The truth chains with their ends. */
  readonly truth: readonly TruthChain[];
  /** The exemption of line 2 (F's own walk out and back). */
  readonly exempt: (r: readonly LatticePoint[]) => boolean | null;
  /** The key's content (exactKeyContent / exactKeyContentOfRead). */
  readonly content: KernelResult<ExactKeyContent>;
  /** The construction read (its spines' keys are read). */
  readonly k: KernelResult<{ readonly spines: ReadonlyMap<string, unknown> }>;
  /** readFace's record of F. */
  readonly rf: { readonly rings: LatticePoint[][]; readonly spines: ReadonlyMap<string, Spine>; readonly through: readonly Spine[] };
  /** The oracle's spines and judgement (the record form's by default; the arena form passes its capped pair). */
  readonly spinesOf?: (F: readonly (readonly XY[])[], chains: readonly TruthChain[]) => ReturnType<typeof spinesOf>;
  readonly judge?: (F: readonly (readonly XY[])[], chains: readonly TruthChain[], X: readonly (readonly LatticePoint[])[], exempt: (r: readonly LatticePoint[]) => boolean | null, sp: ReturnType<typeof spinesOf>) => Verdict;
}

/**
 * Line 7's arbitration of a BEYOND read by the oracle (the construction's region against its comparand): the
 * comparand wrong ⇒ the round fails — save where the comparand is the construction READING's region (`isReading`)
 * and that reading is not X's (another spine set: the census read J318's reach on its attracted base, not on X_E; or,
 * served first, its UNREDUCED runs: a T vertex near a junction end turns the end's line with the kink): then the
 * region over X's own spines and runs is judged in its place, and only exactRegion's error there fails; the reading's
 * difference is the construction's case. The construction wrong and the comparand right ⇒ the construction's case;
 * neither wrong ⇒ a no-move read fails, a moved one is listed.
 */
export function arbitrate(a: ArbitrationInput, region: readonly (readonly XY[])[], comparand: readonly (readonly LatticePoint[])[], served: Served, isReading: boolean): { fails: boolean; line: string } {
  const { tag, Fr, truth, exempt, content, k, rf } = a;
  const spinesOfA = a.spinesOf ?? spinesOf;
  const judgeA = a.judge ?? ((F, chains, X, ex, sp) => judge(F, chains, X, ex, sp));
  const sp2 = spinesOfA(Fr, truth);
  const vc = judgeA(Fr, truth, comparand, exempt, sp2);
  const vr = judgeA(Fr, truth, region as LatticePoint[][], exempt, sp2);
  const where = `${tag}: ${served.noMove ? 'a no-move' : 'a moved'} read (${served.by}) ${hausdorff(region, comparand).h.toFixed(2)} cm from its comparand`;
  if (!clean(vc)) {
    const xKeys = content.ok ? content.value.spines.map((s2) => s2.key).sort() : [];
    const cKeys = k.ok ? [...k.value.spines.keys()].sort() : [];
    const sameSpines = JSON.stringify(xKeys) === JSON.stringify(cKeys);
    if (isReading && content.ok && (!sameSpines || served.by !== 'faithful')) {
      const xs = new Map([...rf.spines, ...rf.through.filter((s2) => content.value.reaching.includes(s2.key)).map((s2) => [s2.key, s2] as const)]);
      const ps = kerbParts(rf.rings, xs, true);
      if (ps.ok && clean(judgeA(Fr, truth, exactRegion(rf.rings, ps.value), exempt, sp2))) {
        return { fails: false, line: `${where} — the construction's reading (${sameSpines ? '' : `its spines ${JSON.stringify(cKeys)}, X's ${JSON.stringify(xKeys)}; `}${served.by === 'faithful' ? '' : 'its unreduced runs'}): the region over X's spines and runs right` };
      }
    }
    return { fails: true, line: `${where} — the oracle finds the comparand wrong: ${JSON.stringify([...vc.misses, ...vc.vertexFaults].slice(0, 3))}` };
  }
  if (!clean(vr)) return { fails: false, line: `${where} — the construction's case (${tipClass(vr, truth)}): ${JSON.stringify([...vr.misses, ...vr.vertexFaults].slice(0, 2))} rings ${JSON.stringify(T(region))}` };
  if (served.noMove) return { fails: true, line: `${where} — neither found wrong by the oracle` };
  return { fails: false, line: `${where} — neither found wrong by the oracle (new): rings ${JSON.stringify(T(region))}` };
}

/** The move warnings (S18's FM2 reading: an insertion that moved a point says so). */
export const MOVE_WARNINGS: readonly string[] = ['W_ATTRACTED', 'W_PLACED', 'W_SNAP_PASSES', 'W_WEDGE_ROUTED'];

/**
 * THE CITY READING of a read's service (line 6 (a)): from the served read's census (`faithful`), whether its census was
 * restaged and its warnings — no mock. FIRST := faithful 'none' and not restaged; FAITHFUL := 'taken'; OTHER := the rest
 * (Served's 'moved'). NO-MOVE := first and none of the move warnings among the served read's warnings. No locus.
 */
export function servedOfRead(last: { readonly faithful: 'none' | 'tried' | 'taken' }, restaged: boolean, warnings: readonly string[]): Served {
  if (last.faithful === 'none' && !restaged) return { by: 'first', noMove: !warnings.some((w) => MOVE_WARNINGS.includes(w)), movedParts: [] };
  if (last.faithful === 'taken') return { by: 'faithful', noMove: false, movedParts: [] };
  return { by: 'moved', noMove: false, movedParts: [] };
}

/**
 * relate() at CITY (no per-call locus): relate's class, and MOVED where a read that moved is BEYOND only for want of a
 * locus — its two-sided distance within DRY_MOVE_CM (`cityMoved`: a REPORTED class, never a pass by locus).
 */
export function relateRead(region: readonly (readonly XY[])[], comparand: readonly (readonly XY[])[], served: Served): { cls: RelClass; h: number; tip?: boolean; cityMoved?: boolean } {
  const r = relate(region, comparand, served);
  if (r.cls === 'BEYOND' && !served.noMove && r.h <= DRY_MOVE_CM) return { cls: 'MOVED', h: r.h, cityMoved: true };
  return r;
}

// ---- THE LOCAL ARBITRATION (the session's ruling J785 (2); test-side only) ----------------------------------------------

/** A witness needs the two outlines more than this far apart at its far point (J785 (2) (a): 2 · MARGIN_CM = 8 cm). */
export const WITNESS_GAP_CM = 2 * MARGIN_CM;

/** A far point of one outline and its nearest point on the other, `d` apart (segDist's figure). */
export interface FarPair {
  readonly q: XY;
  readonly r: XY;
  readonly d: number;
}

/**
 * hausdorff's two-sided reading (its samples at 0.25 cm, both directions, its segDist) with each sample's NEAREST POINT
 * on the other outline, found through a uniform grid of the other set's segments: `h` is hausdorff's h and the far
 * samples (d > `beyond`) are hausdorff's `far`, in its order, each paired with its nearest point (pinned equal in
 * observer.test.ts). Where one set is empty and the other not, h is ∞ and every sample is far with no nearest point
 * (r := q, d := ∞), as hausdorff's.
 */
export function farPairs(a: readonly (readonly XY[])[], b: readonly (readonly XY[])[], beyond: number): { h: number; far: FarPair[] } {
  if (a.length === 0 || b.length === 0) return { h: a.length === b.length ? 0 : Infinity, far: [...samples(a), ...samples(b)].map((q) => ({ q, r: q, d: Infinity })) };
  const C = 200;
  let h = 0;
  const far: FarPair[] = [];
  const key = (i: number, j: number): number => (i + 1_048_576) * 2_097_152 + (j + 1_048_576);
  for (const [from, to] of [[a, b], [b, a]] as const) {
    const cells = new Map<number, (readonly [XY, XY])[]>();
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
      let near: XY = q;
      for (let r = 0; r < 100_000; r += 1) {
        for (let i = i0 - r; i <= i0 + r; i += 1) {
          for (let j = j0 - r; j <= j0 + r; j += 1) {
            if (Math.max(Math.abs(i - i0), Math.abs(j - j0)) !== r) continue;
            for (const [s0, s1] of cells.get(key(i, j)) ?? []) {
              const d = segDist(q, s0, s1);
              if (d < best) {
                best = d;
                const dx = s1.x - s0.x;
                const dy = s1.y - s0.y;
                const l2 = dx * dx + dy * dy;
                const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - s0.x) * dx + (q.y - s0.y) * dy) / l2));
                near = { x: s0.x + t * dx, y: s0.y + t * dy };
              }
            }
          }
        }
        if (best <= r * C) break;
      }
      if (best > h) h = best;
      if (best > beyond) far.push({ q, r: near, d: best });
    }
  }
  return { h, far };
}

/** The served region against X (J785 (2)): relate()'s first rules on (region, X) — EQUAL, NEAR (within NEAR_CM, or at a tip), else DIFFERENT. */
export function relateX(region: readonly (readonly XY[])[], X: readonly (readonly XY[])[]): { cls: 'EQUAL' | 'NEAR' | 'DIFFERENT'; h: number; tip?: boolean; far: FarPair[] } {
  if (JSON.stringify(T(region)) === JSON.stringify(T(X))) return { cls: 'EQUAL', h: 0, far: [] };
  const { h, far } = farPairs(region, X, NEAR_CM);
  if (h <= NEAR_CM) return { cls: 'NEAR', h, far };
  if (region.length > 0 && X.length > 0 && far.every((p) => tipNear(region, p.q) || tipNear(X, p.q))) return { cls: 'NEAR', h, tip: true, far };
  return { cls: 'DIFFERENT', h, far };
}

/** A witness of a difference: the point judged, the far pair it stands between and their gap. */
export interface WitnessAt {
  readonly at: XY;
  readonly q: XY;
  readonly r: XY;
  readonly gap: number;
}

/**
 * THE WITNESSES (J785 (2) (a)): each far pair more than WITNESS_GAP_CM apart gives the midpoint of q and its nearest
 * point r — inside the symmetric difference, more than MARGIN_CM from both outlines there; the witnesses of one read
 * deduplicated on the GRID (the first in a GRID_CM cell). None: the difference is THIN. Where exactly one side is empty
 * (no nearest point exists), the witnesses are the non-empty side's grid points (its step max(GRID_CM, √(box area ⁄
 * CAP_SAMPLES))) more than MARGIN_CM from its outline, their gap ∞ (a seat's reading: the ruling names no nearest point there).
 */
export function witnessesOf(region: readonly (readonly XY[])[], X: readonly (readonly XY[])[], far: readonly FarPair[]): WitnessAt[] {
  const out: WitnessAt[] = [];
  const cells = new Set<string>();
  const push = (w: WitnessAt): void => {
    const k = `${String(Math.floor(w.at.x / GRID_CM))},${String(Math.floor(w.at.y / GRID_CM))}`;
    if (cells.has(k)) return;
    cells.add(k);
    out.push(w);
  };
  if ((region.length === 0) !== (X.length === 0)) {
    const ne = region.length === 0 ? X : region;
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const r of ne) {
      for (const q of r) {
        x0 = Math.min(x0, q.x);
        y0 = Math.min(y0, q.y);
        x1 = Math.max(x1, q.x);
        y1 = Math.max(y1, q.y);
      }
    }
    const step = Math.max(GRID_CM, Math.sqrt(((x1 - x0) * (y1 - y0)) / CAP_SAMPLES));
    for (const at of gridOfStep(ne, step)) if (ringDist(ne, at) > MARGIN_CM) push({ at, q: at, r: at, gap: Infinity });
    return out;
  }
  for (const p of far) if (p.d > WITNESS_GAP_CM) push({ at: { x: (p.q.x + p.r.x) / 2, y: (p.q.y + p.r.y) / 2 }, q: p.q, r: p.r, gap: p.d });
  return out;
}

/** A read's class by the local arbitration (J785 (2) (c)). */
export type LocalClass = 'X-RIGHT' | 'X-WRONG' | 'UNDECIDED' | 'THIN';

/** A witness judged: X-RIGHT (the truth agrees with X, not the served region), X-WRONG, or UNDECIDED; `note` where X and the served region agree at it. */
export interface Witness extends WitnessAt {
  readonly cls: 'X-RIGHT' | 'X-WRONG' | 'UNDECIDED';
  readonly note?: 'off the difference' | 'both wrong';
}

/**
 * THE LOCAL ARBITRATION of one DIFFERENT read (J785 (2) (b), (c)): the truth at each witness (`truthAt`: the arena form's,
 * definition.ts `truthAtOf`) against X's and the served region's membership there (insideRings on their own rings).
 * Per witness: UNDECIDED where the truth is; X-RIGHT where the truth agrees with X and not with the served region;
 * X-WRONG where it agrees with the served region and not with X. Where X and the served region AGREE at a witness (a third
 * outline between q and r): UNDECIDED ('off the difference') when the truth agrees with both, X-WRONG ('both wrong') when
 * it agrees with neither — X wrong there by the definition (a seat's reading: the ruling's two classes do not reach it).
 * Per read: X-WRONG if any witness is; else X-RIGHT if any is; else UNDECIDED; THIN with no witness.
 */
export function arbitrateLocal(region: readonly (readonly XY[])[], X: readonly (readonly XY[])[], truthAt: (q: XY) => PointTruth, ws: readonly WitnessAt[]): { cls: LocalClass; witnesses: Witness[] } {
  if (ws.length === 0) return { cls: 'THIN', witnesses: [] };
  const witnesses: Witness[] = ws.map((w) => {
    const t = truthAt(w.at);
    if (t === 'undecided') return { ...w, cls: 'UNDECIDED' };
    const tin = t === 'in';
    const inX = X.length > 0 && insideRings(X, w.at);
    const inS = region.length > 0 && insideRings(region, w.at);
    if (inX === inS) return tin === inX ? { ...w, cls: 'UNDECIDED', note: 'off the difference' } : { ...w, cls: 'X-WRONG', note: 'both wrong' };
    return { ...w, cls: tin === inX ? 'X-RIGHT' : 'X-WRONG' };
  });
  const cls: LocalClass = witnesses.some((w) => w.cls === 'X-WRONG') ? 'X-WRONG' : witnesses.some((w) => w.cls === 'X-RIGHT') ? 'X-RIGHT' : 'UNDECIDED';
  return { cls, witnesses };
}

/**
 * What the construction did on an X-RIGHT read (J785 (2) (c), REPORTED): within DRY_MOVE_CM of X at every witness — THE
 * CONSTRUCTION'S MOVE ('move', inside its own bound N-43); else, its witnesses beyond DRY_MOVE_CM by a chain's end or
 * bend (tipClass's Q110 (c) / Q117 classes: 'tip'); else THE CONSTRUCTION OFF ITS BOUND ('off'). `gap` the largest.
 */
export function xRightBy(ws: readonly WitnessAt[], chains: readonly TruthChain[]): { by: 'move' | 'tip' | 'off'; gap: number } {
  const gap = ws.reduce((m, w) => Math.max(m, w.gap), 0);
  if (ws.every((w) => w.gap <= DRY_MOVE_CM)) return { by: 'move', gap };
  const v: Verdict = { misses: ws.filter((w) => w.gap > DRY_MOVE_CM).map((w) => `(${String(w.at.x)}, ${String(w.at.y)})`), vertexFaults: [], simplicity: [], judged: 0, samples: 0, spines: [] };
  return { by: tipClass(v, chains) === 'new' ? 'off' : 'tip', gap };
}
