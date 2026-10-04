// The band set and the two readings of a band-keyed table (§4.5 "The band set"; M0-s-02). A rule table may carry rows
// for some bands only. A continuous cell at a value takes the linear interpolation along the value between the
// nearest rowed bands' centres, an end row applying flat beyond its centre (`bandInterpolate`) — how the four
// granularity rows serve six bands. A discrete cell (an enumeration, a flag, a key, a count read whole) at a band
// without a row reads the nearest rowed band below it, and an end band below every row the lowest row
// (`discreteCell`) — under the four-row tables `squalid` reads the poor cell and `comfortable` the modest cell (V03's
// J-V3.28). A band's centre is the midpoint of its value interval between the cuts (0 and 1 at the ends). Without a
// town's FieldBands the cuts are bands.json's default cuts: the default household shares cumulated in band order, the
// cuts a uniformly spread field would take (C-0155).
import { loadTable } from './table.js';

/** The default band set's ids in order (§4.5). */
export const BAND_IDS = ['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich'] as const;
export type ProsperityBand = (typeof BAND_IDS)[number];

/** A band set's ids and its cuts on the [0, 1] value — the shape of a town's FieldBands (§2.5), which passes as one. */
export interface BandCuts {
  readonly bands: readonly string[];
  /** Ascending, one fewer than the bands. */
  readonly cuts: readonly number[];
}

/** A band-keyed table read as rows: a value per rowed band. */
export type BandRows<T> = Readonly<Partial<Record<string, T>>>;

/** A value a continuous reading blends: a number, or a list of numbers blended entry by entry (a range). */
export type Blendable = number | readonly number[];

function refuse(reason: string): never {
  throw new RangeError(`band reading: ${reason}`);
}

/** The band set as bands.json states it (its order and default cuts). */
export function defaultBandCuts(): BandCuts {
  const t = loadTable('bands');
  return Object.freeze({ bands: t.strs('settings', 'order'), cuts: t.nums('settings', 'defaultCuts') });
}

function checkCuts(set: BandCuts): void {
  if (set.bands.length < 1 || set.cuts.length !== set.bands.length - 1) refuse('a band set needs one cut fewer than its bands');
  let prev = 0;
  for (const c of set.cuts) {
    if (!(c >= prev && c <= 1)) refuse('cuts must ascend inside [0, 1]');
    prev = c;
  }
}

/** Each band's centre: the midpoint of its value interval. */
export function bandCentres(set: BandCuts = defaultBandCuts()): number[] {
  checkCuts(set);
  const out: number[] = [];
  for (let i = 0; i < set.bands.length; i += 1) {
    const lo = i === 0 ? 0 : set.cuts[i - 1];
    const hi = i === set.bands.length - 1 ? 1 : set.cuts[i];
    out.push((lo + hi) / 2);
  }
  return out;
}

/** The band holding a value: a cut belongs to the band above it. */
export function bandOf(value: number, set: BandCuts = defaultBandCuts()): string {
  checkCuts(set);
  for (let i = 0; i < set.cuts.length; i += 1) if (value < set.cuts[i]) return set.bands[i];
  return set.bands[set.bands.length - 1];
}

function blend(a: Blendable, b: Blendable, t: number): Blendable {
  if (typeof a === 'number' && typeof b === 'number') return a + t * (b - a);
  if (typeof a === 'number' || typeof b === 'number' || a.length !== b.length) refuse('rows to blend differ in shape');
  return a.map((x, i) => x + t * (b[i] - x));
}

function isBlendable(v: unknown): v is Blendable {
  return typeof v === 'number' || (Array.isArray(v) && v.length > 0 && v.every((e) => typeof e === 'number'));
}

/**
 * The continuous reading at a value (§4.5): piecewise linear between the rowed bands' centres, flat beyond the end
 * rows' centres; exactly a band's row at its centre.
 */
export function bandInterpolate<T extends Blendable>(rows: BandRows<T>, value: number, set: BandCuts = defaultBandCuts()): T {
  if (!Number.isFinite(value)) refuse('the value must be finite');
  const centres = bandCentres(set);
  const at: number[] = [];
  for (let i = 0; i < set.bands.length; i += 1) {
    const r = rows[set.bands[i]];
    if (r !== undefined) {
      if (!isBlendable(r)) refuse(`the row of '${set.bands[i]}' is not a number or a list of numbers`);
      at.push(i);
    }
  }
  if (at.length === 0) refuse('no band of the set has a row');
  const first = at[0];
  const last = at[at.length - 1];
  if (value <= centres[first]) return rows[set.bands[first]] as T;
  if (value >= centres[last]) return rows[set.bands[last]] as T;
  for (let k = 0; k + 1 < at.length; k += 1) {
    const lo = centres[at[k]];
    const hi = centres[at[k + 1]];
    if (value <= hi) {
      const a = rows[set.bands[at[k]]] as T;
      const b = rows[set.bands[at[k + 1]]] as T;
      if (!(hi > lo)) return a;
      // eslint-disable-next-line plat/ratio-division -- the share of the way between two rowed centres on the [0, 1] value: hi > lo is checked on the line above, and ratio()'s floors are 1 cm, 1 cm², 1 cdeg and 1, far above a value's scale
      const t = (value - lo) / (hi - lo);
      return blend(a, b, t) as T;
    }
  }
  return rows[set.bands[last]] as T;
}

/**
 * The discrete reading at a band (§4.5): the band's own row, else the nearest rowed band below it, else (an end band
 * below every row) the lowest row.
 */
export function discreteCell<T>(rows: BandRows<T>, band: string, bands: readonly string[] = BAND_IDS): T {
  const idx = bands.indexOf(band);
  if (idx < 0) refuse(`'${band}' is not a band of the set`);
  for (let i = idx; i >= 0; i -= 1) {
    const r = rows[bands[i]];
    if (r !== undefined) return r;
  }
  for (let i = idx + 1; i < bands.length; i += 1) {
    const r = rows[bands[i]];
    if (r !== undefined) return r;
  }
  return refuse('no band of the set has a row');
}

/** A band-keyed table's cell read as BandRows: one entry per row named by a band that carries the cell. */
export function bandRows(table: string, cell: string, bands: readonly string[] = BAND_IDS): BandRows<unknown> {
  const t = loadTable(table);
  const out: Record<string, unknown> = {};
  for (const b of bands) if (t.has(b, cell)) out[b] = t.value(b, cell);
  return Object.freeze(out);
}

/**
 * The middle band (§4.5): the band holding the median household under the band set's shares — the band where the
 * cumulative share first passes one half (`comfortable` under the default shares: 0.239 after modest, 0.674 after
 * comfortable).
 */
export function middleBand(shares: BandRows<number> = bandRows('bands', 'share') as BandRows<number>, bands: readonly string[] = BAND_IDS): string {
  let cum = 0;
  for (const b of bands) {
    cum += shares[b] ?? 0;
    if (cum > 0.5) return b;
  }
  return refuse('the shares never pass one half');
}
