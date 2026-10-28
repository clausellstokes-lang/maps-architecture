// The refusal census of a run (M0-c-07; J264, N-58): every refusal the run's stages raised, by class — its source (the
// operation or stage, and the run it was met in), its code, the input kind (LAWFUL, UNLAWFUL, or OUR OWN INTERMEDIATE —
// geometry an earlier stage of ours made from lawful input) and one verdict (MAKE-IT-SUCCEED, REPAIR, REFUSE). The
// harness reports the census; a lawful-input or intermediate refusal is a finding for the session with its seed, never
// this harness's to fix (the session note's (6)). The loader's refusals of `ng-faces.json` and `baselines.json` are
// typed REFUSE of unlawful input: the run stops naming the file and the record (M0-k-05's loaders), and the layer that
// gives the user the alternative is the crossing's check (`corepack pnpm baselines:check`) that M-1's file passes
// before it lands (§17.1 (4)).
import type { RefusalCensus, SeedRecord } from '../fusion/index.js';
import type { RefusalCensusReport, RefusalClass } from './report.js';

/** A census under construction: class key → class. */
export type CensusTally = Map<string, { -readonly [K in keyof RefusalClass]: RefusalClass[K] } & { seeds: number[] }>;

/** The first seeds a class names. */
const SEEDS_SHOWN = 8;

/** Adds `count` refusals of a class met on `seed`. */
export function addRefusal(t: CensusTally, c: Omit<RefusalClass, 'count' | 'seeds'>, seed: number, count = 1): void {
  if (count <= 0) return;
  const key = `${c.source}|${c.code}`;
  const hit = t.get(key);
  if (hit === undefined) {
    t.set(key, { ...c, count, seeds: [seed] });
    return;
  }
  hit.count += count;
  if (!hit.seeds.includes(seed) && hit.seeds.length < SEEDS_SHOWN) hit.seeds.push(seed);
}

/** The note of a refusal our own stages raised on the fixture (J264 (5), N-58 (a)). */
export const NOTE_FINDING = 'a refusal of our own stages on lawful fixture input: a finding for the session with its seed (J264, N-58 (a)), not this harness’s to fix';

/** M0-c-06's per-seed census fields (its `RefusalCensus`), each a class of our own intermediate geometry. */
const RECORD_FIELDS: readonly (keyof RefusalCensus)[] = ['s8', 's9', 'kerbReads', 'corpusRoof', 'corpusSpine', 'kernelDowngrades', 'kernelWorkLimitHits', 'unplaced', 'degraded'];

/** Adds one of M0-c-06's seed records' census (its `refusals`) under `source`. */
export function addRecordCensus(t: CensusTally, source: string, r: Pick<SeedRecord, 'seed' | 'refusals'>): void {
  for (const f of RECORD_FIELDS) addRefusal(t, { source, code: f, inputKind: 'OUR OWN INTERMEDIATE', verdict: 'MAKE-IT-SUCCEED', note: NOTE_FINDING }, r.seed, r.refusals[f]);
}

/** Adds a FusionGateReport run's census totals (no per-seed split in the fold: seed 0 stands for the run). */
export function addTotalsCensus(t: CensusTally, source: string, totals: RefusalCensus, seeds: readonly number[]): void {
  for (const f of RECORD_FIELDS) {
    if (totals[f] <= 0) continue;
    addRefusal(t, { source, code: f, inputKind: 'OUR OWN INTERMEDIATE', verdict: 'MAKE-IT-SUCCEED', note: NOTE_FINDING }, seeds[0] ?? 0, totals[f]);
    const hit = t.get(`${source}|${f}`);
    if (hit !== undefined) for (const s of seeds) if (!hit.seeds.includes(s) && hit.seeds.length < SEEDS_SHOWN) hit.seeds.push(s);
  }
}

/** The census in a fixed order (source, then code). */
export function censusOf(t: CensusTally): RefusalCensusReport {
  const classes = [...t.values()]
    .map((c) => ({ ...c, seeds: [...c.seeds].sort((a, b) => a - b) }))
    .sort((a, b) => (a.source < b.source ? -1 : a.source > b.source ? 1 : a.code < b.code ? -1 : a.code > b.code ? 1 : 0));
  let total = 0;
  for (const c of classes) total += c.count;
  return { classes, total };
}

/** Two tallies' union (phase b's hood runs and its gate re-run). */
export function mergeCensus(a: RefusalCensusReport, b: RefusalCensusReport): RefusalCensusReport {
  const classes = [...a.classes, ...b.classes].sort((x, y) => (x.source < y.source ? -1 : x.source > y.source ? 1 : x.code < y.code ? -1 : x.code > y.code ? 1 : 0));
  return { classes, total: a.total + b.total };
}
