// The F-WORK hit-rate report (§13.2 "Work limits follow population"; §5.1 (5)'s Confirmation; §5.4's `work_cut`;
// M0-f-03a): the shape the spikes fill — work cuts per 1 000 batches, per stage and band position (a rung's bottom,
// target and top, §13.2's cost-model sizes) — and M0-f-03b reports at the measured coefficients. Each batch a spike runs
// is one `FWorkBatch`: its stage, rung and band position, and the counter whose limit cut it (null when none did).
// The flatness check across a band (the top's rate at most 1 per 1 000 above the bottom's) and its pre-decided
// coefficient fallback are M1's nightly sweep (§13.2; this item's defers).
import { compareKeys, ratio } from '@plat/kernel';
import type { Rung } from '@plat/model';

/** A run's place in its rung's population band (§13.2: the band's bottom, its target and its top). */
export type BandPosition = 'bottom' | 'target' | 'top';
export const BAND_POSITIONS: readonly BandPosition[] = Object.freeze(['bottom', 'target', 'top'] as const);

/**
 * §1.1's six rungs in ladder order (the report's row order): a report-ordering list, apart from the loader's
 * `BASE_RUNGS` (the three rungs the base ships) and from @plat/model's `Rung`, a type with no runtime list.
 */
const RUNG_ORDER: readonly Rung[] = Object.freeze(['THORP', 'HAMLET', 'VILLAGE', 'TOWN', 'CITY', 'METROPOLIS'] as const);

/** One batch as a spike records it. */
export interface FWorkBatch {
  /** The stage's registry name (`S1`, `S8`, a hook's or a product's stage id as text; §4.12, C-0134 (9)). */
  readonly stage: string;
  readonly rung: Rung;
  readonly position: BandPosition;
  /** The counter whose limit the batch reached (`work_cut`), or null. */
  readonly cut: string | null;
}

/** One stage at one rung and band position. */
export interface FWorkRow {
  readonly stage: string;
  readonly rung: Rung;
  readonly position: BandPosition;
  readonly batches: number;
  /** Batches that took F-WORK's rung (`work_cut`). */
  readonly workCuts: number;
  /** workCuts per 1 000 batches. */
  readonly perThousand: number;
  /** The cuts by counter, in key order (counters with none omitted). */
  readonly byCounter: readonly { readonly counter: string; readonly cuts: number }[];
}

/** The report: a row per (stage, rung, band position) in stage, ladder and band order, and the totals. */
export interface FWorkReport {
  readonly rows: readonly FWorkRow[];
  readonly batches: number;
  readonly workCuts: number;
}

interface Acc {
  readonly stage: string;
  readonly rung: Rung;
  readonly position: BandPosition;
  batches: number;
  cuts: Map<string, number>;
}

/** Work cuts per 1 000 of `batches` (≥ 1). */
function perThousand(cuts: number, batches: number): number {
  const r = ratio(cuts * 1000, batches, 'count');
  if (!r.ok) throw new RangeError(`fWorkReport: ${batches} batches`);
  return r.value;
}

/**
 * The F-WORK report over a spike's batches. Refuses (RangeError) a rung outside §1.1's ladder, a band position other
 * than bottom, target and top, and an empty counter name.
 */
export function fWorkReport(batches: Iterable<FWorkBatch>): FWorkReport {
  const accs = new Map<string, Acc>();
  for (const b of batches) {
    if (!RUNG_ORDER.includes(b.rung)) throw new RangeError(`fWorkReport: rung '${String(b.rung)}' is not on §1.1's ladder`);
    if (!BAND_POSITIONS.includes(b.position)) throw new RangeError(`fWorkReport: band position '${String(b.position)}'`);
    if (b.cut !== null && (typeof b.cut !== 'string' || b.cut.length === 0)) throw new RangeError('fWorkReport: an empty counter name');
    const key = JSON.stringify([b.stage, b.rung, b.position]);
    let acc = accs.get(key);
    if (acc === undefined) {
      acc = { stage: b.stage, rung: b.rung, position: b.position, batches: 0, cuts: new Map() };
      accs.set(key, acc);
    }
    acc.batches += 1;
    if (b.cut !== null) acc.cuts.set(b.cut, (acc.cuts.get(b.cut) ?? 0) + 1);
  }
  const ordered = [...accs.values()].sort(
    (a, b) =>
      compareKeys(a.stage, b.stage) ||
      RUNG_ORDER.indexOf(a.rung) - RUNG_ORDER.indexOf(b.rung) ||
      BAND_POSITIONS.indexOf(a.position) - BAND_POSITIONS.indexOf(b.position),
  );
  let total = 0;
  let totalCuts = 0;
  const rows: FWorkRow[] = [];
  for (const a of ordered) {
    const byCounter = [...a.cuts.entries()]
      .sort((x, y) => compareKeys(x[0], y[0]))
      .map(([counter, cuts]) => Object.freeze({ counter, cuts }));
    let workCuts = 0;
    for (const c of byCounter) workCuts += c.cuts;
    rows.push(
      Object.freeze({
        stage: a.stage,
        rung: a.rung,
        position: a.position,
        batches: a.batches,
        workCuts,
        perThousand: perThousand(workCuts, a.batches),
        byCounter: Object.freeze(byCounter),
      }),
    );
    total += a.batches;
    totalCuts += workCuts;
  }
  return Object.freeze({ rows: Object.freeze(rows), batches: total, workCuts: totalCuts });
}
