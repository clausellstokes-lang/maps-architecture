// The digest bars' harness and record shape (§6.2 *Bars*; §16 M0 (d); M0-d-04): digest maintenance ≤ 5 % of each
// batch's own time at CITY; root finalisation ≤ 5 ms at a stage end; full recomputation ≤ 150 ms at CITY, the records
// tree included. Run on the synthetic CITY workload (C-0015, workload.ts): the model and records trees built once, then
// per repeat one district re-derived — the batch's own time is drawing its records afresh, its maintenance the writes
// into both trees — its roots finalised, and both roots recomputed from nothing. The clock is the caller's (the model
// package reads none, §6.5 (3)). The bars are the timing phase's (M0-t-00's script, run alone by M0-t-01): a record
// taken anywhere else is stamped `contended` and never gates (M0.md §0.1 (5)).
import { ratio, type Hash128 } from '@plat/kernel';
import { ModelDigest } from './model.js';
import { RecordsDigest } from './records.js';
import { rederiveDistrict, type SyntheticCity } from './workload.js';

/** §6.2's budgets. */
export const DIGEST_BUDGETS = Object.freeze({ maintenancePct: 5, finaliseMs: 5, recomputeMs: 150 });

/** The record one run of the harness writes. */
export interface DigestTimingRecord {
  readonly item: 'M0-d-04';
  readonly bars: readonly string[];
  readonly seed: number;
  readonly repeats: number;
  /** `contended` everywhere but the timing phase, which alone may stamp `timing-phase`; a contended record never gates. */
  readonly status: 'contended' | 'timing-phase';
  readonly workload: { readonly model: number; readonly derivation: number; readonly naming: number };
  readonly maintenance: {
    readonly batchMs: readonly number[];
    readonly digestMs: readonly number[];
    /** digestMs ÷ batchMs × 100 per repeat; null where the batch took under a microsecond. */
    readonly sharePct: readonly (number | null)[];
    readonly budgetPct: number;
  };
  readonly finalise: { readonly ms: readonly number[]; readonly budgetMs: number };
  readonly recompute: { readonly ms: readonly number[]; readonly budgetMs: number };
  /** Every repeat's recomputed roots equalled the maintained ones (the oracle, run alongside). */
  readonly oracle: boolean;
}

/** The workload's two trees, built. */
export function buildDigests(city: SyntheticCity): { model: ModelDigest; records: RecordsDigest } {
  const model = new ModelDigest();
  const records = new RecordsDigest();
  model.batch(() => {
    for (const e of city.model) model.put(e);
  });
  records.batch(() => {
    for (const e of city.records) records.put(e);
  });
  return { model, records };
}

const same = (a: Hash128, b: Hash128): boolean => a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];

/** Times the bars on `city` `repeats` times with `now` (milliseconds); `status` is the caller's. */
export function timeDigest(
  city: SyntheticCity,
  now: () => number,
  repeats = 3,
  status: 'contended' | 'timing-phase' = 'contended',
): DigestTimingRecord {
  if (!Number.isInteger(repeats) || repeats < 1) throw new RangeError('digest timing: at least one repeat');
  const { model, records } = buildDigests(city);
  const batchMs: number[] = [];
  const digestMs: number[] = [];
  const sharePct: (number | null)[] = [];
  const finaliseMs: number[] = [];
  const recomputeMs: number[] = [];
  let oracle = true;
  for (let r = 0; r < repeats; r++) {
    const district = city.districts[r % city.districts.length];
    const t0 = now();
    const batch = rederiveDistrict(city, district, city.seed * 7919 + r + 1);
    const t1 = now();
    model.batch(() => {
      for (const e of batch.model) model.put(e);
    });
    records.batch(() => {
      for (const e of batch.records) records.put(e);
    });
    const t2 = now();
    const mRoot = model.finaliseRoot();
    const rRoot = records.finaliseRoot();
    const t3 = now();
    const mFresh = model.recomputeRoot();
    const rFresh = records.recomputeRoot();
    const t4 = now();
    if (!same(mRoot, mFresh) || !same(rRoot, rFresh)) oracle = false;
    batchMs.push(t1 - t0);
    digestMs.push(t2 - t1);
    const share = ratio((t2 - t1) * 100_000, (t1 - t0) * 1000, 'count');
    sharePct.push(share.ok ? share.value : null);
    finaliseMs.push(t3 - t2);
    recomputeMs.push(t4 - t3);
  }
  let derivation = 0;
  for (const e of city.records) if (e.kind === 'derivation') derivation++;
  return Object.freeze({
    item: 'M0-d-04',
    bars: Object.freeze([
      'digest maintenance ≤ 5 % of each batch\'s own time at CITY (§6.2; §16 M0 (d))',
      'root finalisation ≤ 5 ms at a stage end (§6.2)',
      'full recomputation ≤ 150 ms at CITY, the records tree included (§6.2)',
    ]),
    seed: city.seed,
    repeats,
    status,
    workload: Object.freeze({ model: city.model.length, derivation, naming: city.records.length - derivation }),
    maintenance: Object.freeze({ batchMs: Object.freeze(batchMs), digestMs: Object.freeze(digestMs), sharePct: Object.freeze(sharePct), budgetPct: DIGEST_BUDGETS.maintenancePct }),
    finalise: Object.freeze({ ms: Object.freeze(finaliseMs), budgetMs: DIGEST_BUDGETS.finaliseMs }),
    recompute: Object.freeze({ ms: Object.freeze(recomputeMs), budgetMs: DIGEST_BUDGETS.recomputeMs }),
    oracle,
  });
}
