// Step 9 of §4.6's recipe — the width of a new way (COV-NG-N20; M0-b-03) — with the cut's class.
//
//   w = w_lo + Δw · min(1, L / L_ref)^p,  Δw = w_hi − w_lo
//
// [w_lo, w_hi] the cut's class's metric width band (cut.width.alleyM 2–3 m, cut.width.laneM 3–5 m; a `secondary` its
// ways.json band at the rung), L the cut's final kerb-to-kerb length, L_ref the district OBB's major extent and p one
// draw per district on `cut.width`: ln p uniform between ln pMin and ln pMax, p = pMin · (pMax / pMin)^u — the design's
// p = 0.5 · 4^u with the cells' 0.5 and 2 (both powers by dmath.pow, §6.5 (3)). Longer cuts are wider, saturating at
// the band's top. In a walled regime a cut longer than the lane length band is typed `secondary` (§4.6 step 9); no
// M0 table holds that band (C-0237 (5)), so a caller passes it or every S8 cut is a lane. "Never narrower than a lower
// class" (O4 c) holds by the bands' order, alley ≤ lane ≤ secondary, which `classBands` checks.
import { dmath, ratio, type Stream } from '@plat/kernel';
import { loadTable, type Table } from '@plat/tables';

/** 2²⁰: ratio()'s operands are scaled by it (exact: a power of two). */
const SCALE = 1_048_576;

/** The classes S8 cuts (§4.6 steps 9 and the deep-interior rule): lanes, alleys and, in a walled regime, secondaries. */
export type CutClass = 'alley' | 'lane' | 'secondary';

/** The classes in rising order: a class is never narrower than one before it (O4 c). */
export const CUT_CLASSES: readonly CutClass[] = Object.freeze(['alley', 'lane', 'secondary']);

/** A metric width band [lo, hi] in centimetres. */
export type WidthBand = readonly [number, number];

/** The width bands of the classes S8 cuts, in centimetres. */
export interface ClassBands {
  readonly alley: WidthBand;
  readonly lane: WidthBand;
  readonly secondary: WidthBand;
}

/** The cut table's width cells (cm and ratios). */
export interface WidthCells {
  readonly pMin: number;
  readonly pMax: number;
  readonly bands: ClassBands;
}

function band(v: unknown, where: string): [number, number] {
  if (!Array.isArray(v) || v.length !== 2 || typeof v[0] !== 'number' || typeof v[1] !== 'number' || !(v[0] > 0 && v[0] <= v[1] && Number.isFinite(v[1]))) {
    throw new RangeError(`width: ${where} is not a band 0 < lo ≤ hi`);
  }
  return [v[0] * 100, v[1] * 100];
}

/**
 * The width cells: p's range from cut.width.pMin / pMax, the alley and lane bands from cut.width, the secondary band
 * from ways.json at the rung (`secondary` widthM.<rung>, the class's own row). Refuses (RangeError) a band out of the
 * class order — a class narrower than a lower one (O4 c).
 */
export function widthCells(rung: 'TOWN' | 'CITY' | 'METROPOLIS', cut: Table = loadTable('cut'), ways: Table = loadTable('ways')): WidthCells {
  const pMin = cut.cell('width', 'pMin').value;
  const pMax = cut.cell('width', 'pMax').value;
  if (typeof pMin !== 'number' || typeof pMax !== 'number' || !(pMin > 0 && pMin <= pMax && Number.isFinite(pMax))) {
    throw new RangeError('width: cut/width/pMin and pMax must satisfy 0 < pMin ≤ pMax');
  }
  const bands: ClassBands = {
    alley: band(cut.cell('width', 'alleyM').value, 'cut/width/alleyM'),
    lane: band(cut.cell('width', 'laneM').value, 'cut/width/laneM'),
    secondary: band(ways.cell('secondary', `widthM.${rung}`).value, `ways/secondary/widthM.${rung}`),
  };
  for (let i = 1; i < CUT_CLASSES.length; i += 1) {
    const lower = bands[CUT_CLASSES[i - 1]];
    const upper = bands[CUT_CLASSES[i]];
    if (upper[0] < lower[1]) throw new RangeError(`width: the ${CUT_CLASSES[i]} band starts below the ${CUT_CLASSES[i - 1]} band's top (O4 c)`);
  }
  return { pMin, pMax, bands };
}

/**
 * The district's width exponent (§4.6 step 9): p = pMin · (pMax / pMin)^u for one uniform u of `cut.width` — ln p
 * uniform between ln pMin and ln pMax (the design's 0.5 · 4^u). The draw is the caller's (one per district).
 */
export function widthExponent(u: number, cells: Pick<WidthCells, 'pMin' | 'pMax'>): number {
  if (!(u >= 0 && u < 1)) throw new RangeError(`width: the uniform must lie in [0, 1), got ${String(u)}`);
  // pMax ÷ pMin through ratio(): both scaled by 2²⁰ (exact) so a sub-unit pMin clears the count floor (§3.2 (8)).
  const q = ratio(cells.pMax * SCALE, cells.pMin * SCALE, 'count');
  if (!q.ok) throw new RangeError('width: pMin is below the ratio floor even scaled');
  const p = cells.pMin * dmath.pow(q.value, u);
  return p < cells.pMin ? cells.pMin : p > cells.pMax ? cells.pMax : p;
}

/** One uniform from the district's `cut.width` stream, folded into p (the stream is keyed by the district). */
export function drawWidthExponent(stream: Stream, cells: Pick<WidthCells, 'pMin' | 'pMax'>): { u: number; p: number } {
  const u = stream.float01();
  return { u, p: widthExponent(u, cells) };
}

/**
 * §4.6 step 9's width (cm): w_lo + Δw · min(1, L / L_ref)^p, for a cut of length L (cm) in a district whose OBB major
 * extent is L_ref (cm), with the district's exponent p and the cut's class band. A cut at least L_ref long takes the
 * band's top; the result lies in the band (clamped against the power's last-bit error).
 */
export function widthOf(L: number, Lref: number, p: number, band: WidthBand): number {
  if (!(L >= 0 && Number.isFinite(L))) throw new RangeError(`width: the cut length must be finite and ≥ 0, got ${String(L)}`);
  if (!(Lref > 0 && Number.isFinite(Lref))) throw new RangeError(`width: L_ref must be positive, got ${String(Lref)}`);
  if (!(p > 0 && Number.isFinite(p))) throw new RangeError(`width: p must be positive, got ${String(p)}`);
  const [lo, hi] = band;
  if (!(lo > 0 && lo <= hi)) throw new RangeError('width: the band must satisfy 0 < lo ≤ hi');
  const r = ratio(L, Lref, 'length');
  const s = r.ok ? (r.value < 1 ? r.value : 1) : 1;
  const w = lo + (hi - lo) * dmath.pow(s, p);
  return w < lo ? lo : w > hi ? hi : w;
}

/**
 * A cut's class (§4.6 step 9): `lane`, or `secondary` in a walled regime when its length exceeds the lane length band's
 * top. `laneLengthM` is that band; no M0 table holds it (C-0237 (5)), so without it every cut is a lane.
 */
export function cutClass(lengthCm: number, walled: boolean, laneLengthM?: readonly [number, number]): CutClass {
  if (!walled || laneLengthM === undefined) return 'lane';
  return lengthCm > laneLengthM[1] * 100 ? 'secondary' : 'lane';
}
