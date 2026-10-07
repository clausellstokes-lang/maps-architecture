// The spike city's records tree (M0-d-09; C-0015: "schema-shaped synthetic records at §6.2's CITY counts for the
// digest bars"; §6.2 *The records digest*; C-0264 (8): no M0 stage writes records through `put`, so the spikes' model
// roots cover the arenas' level digests and the records tree is the synthetic one).
//
// At a seed: M0-d-04's synthetic CITY workload (`syntheticCity(seed)`: 26 districts, 1 000 blocks, 9 900 plots, 600
// ways, 500 junctions in the model tree; 10 900 derivation and 3 500 naming records in the records tree) built into the
// two trees, then RECORDS_BATCHES district re-derivations (`rederiveDistrict`) applied as batches, each the model
// entries and the records entries one batch writes. With the oracle switch on, after the build and after every batch
// both trees' maintained roots are compared with their full recomputation (§6.2's CI oracle; §5.3's CI-only row).
import { buildDigests, rederiveDistrict, syntheticCity, type ModelDigest, type RecordsDigest } from '@plat/model';
import { hex128, type OracleMiss } from './spike.js';

/** The district re-derivations applied as batches after the build. */
export const RECORDS_BATCHES = 3;

/** What one records run gives. */
export interface RecordsRun {
  readonly seed: number;
  /** The synthetic model tree's root after the last batch, hex. */
  readonly model: string;
  /** The records tree's root after the last batch, hex. */
  readonly records: string;
  /** The batches applied (the build is batch 0 of the oracle's count). */
  readonly batches: number;
  /** The oracle's tally: checks (the build and each batch, both trees), mismatches, the first (stage 'records'). */
  readonly oracle: { readonly batches: number; readonly mismatches: number; readonly first: OracleMiss | null } | null;
}

const same = (a: readonly number[], b: readonly number[]): boolean => a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];

function check(model: ModelDigest, records: RecordsDigest): boolean {
  return same(model.finaliseRoot(), model.recomputeRoot()) && same(records.finaliseRoot(), records.recomputeRoot());
}

/** The records tree at `seed`, with the oracle after the build and every batch when asked. */
export function recordsRun(seed: number, opts: { readonly oracle?: boolean; readonly batches?: number } = {}): RecordsRun {
  if ((seed >>> 0) !== seed) throw new RangeError(`records: a seed is a u32, got ${String(seed)}`);
  const batches = opts.batches ?? RECORDS_BATCHES;
  const city = syntheticCity(seed);
  const { model, records } = buildDigests(city);
  let checked = 0;
  let mismatches = 0;
  let first: OracleMiss | null = null;
  const oracle = (batch: number): void => {
    if (opts.oracle !== true) return;
    checked += 1;
    if (!check(model, records)) {
      mismatches += 1;
      if (first === null) first = { stage: 'records', batch };
    }
  };
  oracle(0);
  for (let i = 0; i < batches; i += 1) {
    const district = city.districts[(seed + i * 7) % city.districts.length];
    const r = rederiveDistrict(city, district, (seed + i + 1) >>> 0);
    model.batch(() => {
      for (const e of r.model) model.put(e);
    });
    records.batch(() => {
      for (const e of r.records) records.put(e);
    });
    oracle(i + 1);
  }
  return Object.freeze({
    seed,
    model: hex128(model.finaliseRoot()),
    records: hex128(records.finaliseRoot()),
    batches,
    oracle: opts.oracle === true ? Object.freeze({ batches: checked, mismatches, first }) : null,
  });
}
