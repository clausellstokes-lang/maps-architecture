// The timing bars the script runs (M0-t-00; C-0115): the list is M0-work.json's top-level `timingBars` key, read at the
// call — no bar is written twice. This file holds what the list does not: each row's id (for `--only`), how its row is
// recognised (its leading words), whether it gates or is reported, whether it is a kernel bar (C-0098's ladder), the real
// entry it is measured through, and the figures it is judged on — each figure's budget PARSED from the row's own text,
// so a budget changed in M0-work.json changes the judged figure with it (a row this file cannot parse is a configuration
// defect of ours, refused before anything runs).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** The work file (inside plat/). */
export const WORK_PATH = fileURLToPath(new URL('../../../docs/build/M0-work.json', import.meta.url));

/** One row of M0-work.json's `timingBars` (its fields as the file states them). */
export interface TimingBarRow {
  readonly bar: string;
  readonly source: string;
  readonly code: string;
  readonly measuredBy: string;
  readonly miss: string;
  readonly measuredIn: string;
  readonly reMeasuredBy: string;
}

/** The ids `--only` names (one per timingBars row). */
export const BAR_IDS = ['insert', 'splitFace', 'corridorUnion', 's11', 'skeleton', 'streamKey', 'digest', 'matching', 'fusion', 'site', 'hydrology', 'tiers', 'r12-4'] as const;
export type BarId = (typeof BAR_IDS)[number];

export type Comparator = '≤' | '≈';

/** One judged or reported figure of a bar. */
export interface FigureSpec {
  /** The figure's name inside its bar. */
  readonly name: string;
  /** The pool it is folded from (a sample key of its group's batches). */
  readonly key: string;
  readonly unit: 'µs' | 'ms' | 's' | '%' | 'min' | 'h';
  /** The budget, parsed from the row's text. */
  readonly budget: number;
  /** `≈` is judged as `≤` its figure (C-0440 (5)). */
  readonly comparator: Comparator;
  /** The quantile the figure is (the median is the p50). */
  readonly reduce: 'p50' | 'p95';
  /** Divided by its batch's normalisation (§12.1); a share (%) is a ratio and is not. */
  readonly normalise: boolean;
  /** `gating`: a miss is a miss; `reported`: an exceeding figure is reported (R12-4, the hydrology row, a p95 beside a p50). */
  readonly role: 'gating' | 'reported';
  /**
   * The ±15 % rule (§12.1; C-0082): the figure has a Node and a Chromium-worker leg; `call` is the pool of the
   * derivation call each leg times (C-0440 (3)).
   */
  readonly crossEngine?: { readonly call: string };
  /** The figure's §12.4 row quoted beside it (R12-4's S3 slice: the whole S2 / S3 row). */
  readonly quoted?: string;
}

/** A bar's static part: everything but the measurement. */
export interface BarDef {
  readonly id: BarId;
  /** Recognises the bar's row by its leading words. */
  readonly match: RegExp;
  readonly role: 'gating' | 'reported';
  /** A kernel bar: its miss takes C-0098's ordered ladder. */
  readonly kernel: boolean;
  /** For an arrangement bar, C-0098's third step is the Clipper2-WASM engine; for the others the D-18 re-declaration. */
  readonly arrangement: boolean;
  /** The groups of batches the bar's figures fold from (a group shared by bars runs once per invocation). */
  readonly groups: readonly string[];
  /** The real entry the bar is measured through (the checker reads it). */
  readonly entry: string;
  /** What the workload is (the record states which workload it timed; M0-d-04's N-8). */
  readonly workload: string;
  /** The figures, their budgets parsed from the row's text. */
  figures(text: string): FigureSpec[];
}

/** A number the row's text states, by a pattern with one group; a row that does not state it is refused. */
export function stated(text: string, re: RegExp, what: string): number {
  const m = re.exec(text);
  const v = m === null ? Number.NaN : Number(m[1]);
  if (!Number.isFinite(v) || v <= 0) throw new Error(`timing-phase: the timingBars row ${JSON.stringify(text.slice(0, 60))} states no ${what} (${String(re)})`);
  return v;
}

const fig = (f: Omit<FigureSpec, 'comparator' | 'reduce' | 'normalise' | 'role'> & Partial<FigureSpec>): FigureSpec => ({
  comparator: '≤',
  reduce: 'p50',
  normalise: true,
  role: 'gating',
  ...f,
});

/** The fixtures of the site spike's gate (M0-e-06's two CITY fixtures). */
export const SITE_GATE_FIXTURES = ['relief-60', 'relief-3000'] as const;

/** R12-4's stages as §12.4 names them, with the spike that stamps them (C-0084). */
const R12_4: readonly { readonly name: string; readonly key: string; readonly re: RegExp; readonly quoted?: RegExp }[] = [
  { name: 'S1 (site relief-60)', key: 'site:relief-60:S1', re: /S1 (\d+(?:\.\d+)?) ms/ },
  { name: 'S1 (site relief-3000)', key: 'site:relief-3000:S1', re: /S1 (\d+(?:\.\d+)?) ms/ },
  { name: 'the S3 slice (fusion)', key: 'fusion:S3', re: /≈ (\d+(?:\.\d+)?) ms of the S2 \/ S3 row/, quoted: /S2 \/ S3 row's (\d+(?:\.\d+)?) ms/ },
  { name: 'the S3 slice (site relief-60)', key: 'site:relief-60:S3', re: /≈ (\d+(?:\.\d+)?) ms of the S2 \/ S3 row/, quoted: /S2 \/ S3 row's (\d+(?:\.\d+)?) ms/ },
  { name: 'the S3 slice (site relief-3000)', key: 'site:relief-3000:S3', re: /≈ (\d+(?:\.\d+)?) ms of the S2 \/ S3 row/, quoted: /S2 \/ S3 row's (\d+(?:\.\d+)?) ms/ },
  { name: 'S4 (fusion)', key: 'fusion:S4', re: /S4 (\d+(?:\.\d+)?) ms/ },
  { name: 'S4 (site relief-60)', key: 'site:relief-60:S4', re: /S4 (\d+(?:\.\d+)?) ms/ },
  { name: 'S4 (site relief-3000)', key: 'site:relief-3000:S4', re: /S4 (\d+(?:\.\d+)?) ms/ },
  { name: 'S5 (fusion)', key: 'fusion:S5', re: /S5 (\d+(?:\.\d+)?) ms/ },
  { name: 'S6 + fields (site relief-60)', key: 'site:relief-60:S6', re: /S6 with the fields (\d+(?:\.\d+)?) ms/ },
  { name: 'S6 + fields (site relief-3000)', key: 'site:relief-3000:S6', re: /S6 with the fields (\d+(?:\.\d+)?) ms/ },
  { name: 'S8 (fusion)', key: 'fusion:S8', re: /S8 (\d+(?:\.\d+)?) ms/ },
];

const KERNEL_LADDER_ENTRY = 'C-0098';

/** The thirteen bars (in the order of M0-work.json's rows; `resolveBars` checks the one-to-one match). */
export const BAR_DEFS: readonly BarDef[] = Object.freeze([
  {
    id: 'insert',
    match: /^insert \+ snap \+ attract \+ re-walk\b/,
    role: 'gating',
    kernel: true,
    arrangement: false,
    groups: ['insert'],
    entry: '@plat/kernel insertTx + insertChain (M0-a-05), driven by bench/src/timing-phase/workloads.ts insertWorkload',
    workload: "insertChain.test.ts's CONTENDED figure's subject (C-0177 (16), M0-a-05 N-5): a 200 m frame, 9 + 9 L1 streets, 2 000 two-point optional L2 proposals into one arena, no stage-end rebuild; µs per proposal",
    figures: (t) => [fig({ name: 'per proposal', key: 'insert', unit: 'µs', budget: stated(t, /≤ (\d+(?:\.\d+)?) µs per growth proposal/, 'per-proposal budget') })],
  },
  {
    id: 'splitFace',
    match: /^splitFace per bent cut\b/,
    role: 'gating',
    kernel: true,
    arrangement: false,
    groups: ['splitFace'],
    entry: "@plat/kernel splitFace (M0-a-07) on bench/src/bentcut/district.ts faceDistrict's F-CUT faces (M0-b-04), each face's cut as @plat/layout runS8 commits it (M0-b-03), driven by bench/src/timing-phase/workloads.ts splitFaceCut",
    workload: "the F-CUT faces (M0-b-04: concave and holed, block scale, seed 1, the F-CUT phase's depth-one limits): each face's bent cut as S8 commits it, replayed alone through splitFace on a fresh copy of the face, the call alone timed (C-0440 (6)); µs per cut",
    figures: (t) => [fig({ name: 'per cut', key: 'splitFace', unit: 'µs', budget: stated(t, /≈ (\d+(?:\.\d+)?) µs/, 'per-cut figure'), comparator: '≈' })],
  },
  {
    id: 'corridorUnion',
    match: /^corridorUnion:/,
    role: 'gating',
    kernel: true,
    arrangement: true,
    groups: ['corridorUnion'],
    entry: '@plat/kernel corridorUnion (M0-a-09) over bench/src/fusion/runs.ts derive (M0-c-06), as bench/src/fusion/measure.ts s8s9 commits S9',
    workload: "the fusion run (a)'s CITY face set (M0-c-06), per seed: corridorUnion per district, one L2 batch each (S9's commit); one district = the median district, the CITY set = the seed's sum",
    figures: (t) => [
      fig({ name: 'one district', key: 'corridorUnion:district', unit: 'ms', budget: stated(t, /one district ≤ (\d+(?:\.\d+)?) ms/, 'one-district budget') }),
      fig({ name: 'the CITY face set', key: 'corridorUnion:city', unit: 'ms', budget: stated(t, /S9 row \((\d+(?:\.\d+)?) ms\)/, "S9 row's figure") }),
    ],
  },
  {
    id: 's11',
    match: /^S11's geometry share\b/,
    role: 'gating',
    kernel: true,
    arrangement: true,
    groups: ['s11'],
    entry: 'bench/src/fuzz-bar/s11Workload.ts s11Workload (M0-k-04, C-0107)',
    workload: "M0-k-04's synthetic per-plot S11 workload (bench/src/fuzz-bar/s11Workload.ts): per plot one offsetFace, one obb and one lir fit, the yard splits, one L4 insertChain; µs per plot, setup excluded",
    figures: (t) => [fig({ name: 'per plot', key: 's11', unit: 'µs', budget: stated(t, /≤ (\d+(?:\.\d+)?) µs per plot/, 'per-plot budget') })],
  },
  {
    id: 'skeleton',
    match: /^skeleton ≤/,
    role: 'gating',
    kernel: true,
    arrangement: false,
    groups: ['skeleton'],
    entry: 'bench/src/skeleton/runner.ts loadCorpus + timeCorpus (M0-a-12)',
    workload: 'the stand-in corpus (bench/fixtures/skeleton-corpus, M0-a-12), each footprint timed five rounds, the median per footprint; both uses (roof, spine)',
    figures: (t) => {
      const b = stated(t, /≤ (\d+(?:\.\d+)?) µs median per footprint/, 'per-footprint budget');
      return [fig({ name: 'roof', key: 'skeleton:roof', unit: 'µs', budget: b }), fig({ name: 'spine', key: 'skeleton:spine', unit: 'µs', budget: b })];
    },
  },
  {
    id: 'streamKey',
    match: /per structured stream key/,
    role: 'gating',
    kernel: false,
    arrangement: false,
    groups: ['streamKey'],
    entry: '@plat/kernel streamKey (M0-d-01) over the inputs bench/src/determinism/spike.ts spikeRun (M0-d-09) asks for',
    workload: "the spike city's stream keys (M0-d-09's fusion and site spikes): every (entity key, stage, concern, opts) a derivation asks createRng's stream for, re-derived by streamKey; µs per key",
    figures: (t) => [fig({ name: 'per key', key: 'streamKey', unit: 'µs', budget: stated(t, /≤ (\d+(?:\.\d+)?) µs per structured stream key/, 'per-key budget') })],
  },
  {
    id: 'digest',
    match: /^digest maintenance\b/,
    role: 'gating',
    kernel: false,
    arrangement: false,
    groups: ['digest'],
    entry: '@plat/model timeDigest over syntheticCity (M0-d-04, C-0194 (11))',
    workload: "M0-d-04's synthetic CITY workload (26 districts, 1 000 blocks, 9 900 plots, the derivation and naming records) — the model and records trees; the plats layer's level digests are not in its recompute (M0-d-04 N-8)",
    figures: (t) => [
      fig({ name: 'maintenance share', key: 'digest:share', unit: '%', budget: stated(t, /maintenance ≤ (\d+(?:\.\d+)?) %/, 'maintenance share'), normalise: false }),
      fig({ name: 'root finalisation', key: 'digest:finalise', unit: 'ms', budget: stated(t, /finalisation ≤ (\d+(?:\.\d+)?) ms/, 'finalisation budget') }),
      fig({ name: 'full recomputation', key: 'digest:recompute', unit: 'ms', budget: stated(t, /recomputation ≤ (\d+(?:\.\d+)?) ms/, 'recomputation budget') }),
    ],
  },
  {
    id: 'matching',
    match: /^matching ≤/,
    role: 'gating',
    kernel: false,
    arrangement: false,
    groups: ['matching'],
    entry: "@plat/model timeMatch (M0-d-05b) on syntheticSet's sets and on bench/src/determinism/rederive.ts rederive + timedPair (M0-d-09, C-0090)",
    workload: "M0-d-05b's synthetic anchor sets (district, city, city-unrelated, metropolis) and M0-d-09's 20 re-derivation pairs of the spike city (S5 rerolled, C-0090); µs per re-derived entity, per class, median",
    figures: (t) => {
      const p = stated(t, /≤ (\d+(?:\.\d+)?) µs per point-anchored/, 'point budget');
      const o = stated(t, /≤ (\d+(?:\.\d+)?) µs per overlap-anchored/, 'overlap budget');
      return [
        fig({ name: 'synthetic sets, point-anchored', key: 'matching:synthetic:point', unit: 'µs', budget: p }),
        fig({ name: 'synthetic sets, overlap-anchored', key: 'matching:synthetic:overlap', unit: 'µs', budget: o }),
        fig({ name: 're-derivation pairs, point-anchored', key: 'matching:pairs:point', unit: 'µs', budget: p }),
        fig({ name: 're-derivation pairs, overlap-anchored', key: 'matching:pairs:overlap', unit: 'µs', budget: o }),
      ];
    },
  },
  {
    id: 'fusion',
    match: /^S4 \+ S5 \+ S8\b/,
    role: 'gating',
    kernel: false,
    arrangement: false,
    groups: ['fusion:node', 'fusion:chromium'],
    entry: "bench/src/fusion/runs.ts derive('fusion') (M0-c-06), its stage stamps; Chromium's Web Worker through @plat/testkit runCrossHost (M0-d-06) over bench/src/timing-phase/gate-stages.ts",
    workload: 'the fusion run (a) at CITY on the flat fixture (M0-c-06), seeds 1 … 1 000: S4 + S5 + S8 per seed from the harness-side stage stamps; p50 judged, p95 reported',
    figures: (t) => {
      const b = stated(t, /≤ (\d+(?:\.\d+)?) ms at CITY/, 'gate budget');
      return [
        fig({ name: 'S4 + S5 + S8 p50', key: 'fusion:gate', unit: 'ms', budget: b, crossEngine: { call: 'fusion:call' } }),
        fig({ name: 'S4 + S5 + S8 p95', key: 'fusion:gate', unit: 'ms', budget: b, reduce: 'p95', role: 'reported' }),
      ];
    },
  },
  {
    id: 'site',
    match: /^S1 \+ S4 \+ S6\b/,
    role: 'gating',
    kernel: false,
    arrangement: false,
    groups: ['site:node', 'site:chromium'],
    entry: "bench/src/site/compose.ts deriveSpike + bench/src/site/timing.ts stageTimesOf / gateMs (M0-e-06); Chromium's Web Worker through @plat/testkit runCrossHost (M0-d-06) over bench/src/timing-phase/gate-stages.ts",
    workload: "the site spike's two CITY fixtures (M0-e-06: the river on 60 m and on 3 000 m relief), the default configuration, seeds 1 … DEFAULT_SEEDS: S1 + S4 + S6 per seed from the harness's stage times",
    figures: (t) => {
      const b = stated(t, /≤ (\d+(?:\.\d+)?) ms at CITY/, 'gate budget');
      return SITE_GATE_FIXTURES.map((f) => fig({ name: `S1 + S4 + S6 p50 (${f})`, key: `site:${f}:gate`, unit: 'ms', budget: b, crossEngine: { call: `site:${f}:call` } }));
    },
  },
  {
    id: 'hydrology',
    match: /^the hydrology row\b/,
    role: 'reported',
    kernel: false,
    arrangement: false,
    groups: ['site:node'],
    entry: 'bench/src/site/timing.ts timeHydrology (M0-e-06) on the site batches\' derivations',
    workload: "the site spike's CITY derivations (the same runs as the site gate's Node leg): hydrology(terrain, grid, lake) on the terrain before the carve, per seed",
    figures: (t) => {
      const b = stated(t, /≈ (\d+(?:\.\d+)?) ms at CITY/, 'hydrology figure');
      return SITE_GATE_FIXTURES.map((f) => fig({ name: `hydrology p50 (${f})`, key: `site:${f}:hydrology`, unit: 'ms', budget: b, comparator: '≈', role: 'reported' }));
    },
  },
  {
    id: 'tiers',
    match: /^each CI tier\b/,
    role: 'gating',
    kernel: false,
    arrangement: false,
    groups: ['tiers'],
    entry: "bench/src/tiers/runner.ts runTier (M0-f-02a) over bench/src/tier-jobs/index.ts manifest (M0-f-02a, M0-f-02b): tier:pr batched and whole, tier:nightly and tier:milestone whole",
    workload: "M0's three tier manifests, each job's status derived at the run (C-0099, C-0121): the PR tier's gating batched sum (C-0097) and one whole run; the projected tiers once whole, one repeat on a > 5 % drift",
    figures: (t) => [
      fig({ name: 'PR batched sum (gating)', key: 'tiers:pr', unit: 'min', budget: stated(t, /PR ≤ (\d+(?:\.\d+)?) min/, 'PR budget') }),
      fig({ name: 'PR whole run', key: 'tiers:pr:whole', unit: 'min', budget: stated(t, /PR ≤ (\d+(?:\.\d+)?) min/, 'PR budget'), role: 'reported' }),
      fig({ name: 'nightly (projected, CPU ÷ 16)', key: 'tiers:nightly', unit: 'h', budget: stated(t, /nightly ≤ (\d+(?:\.\d+)?) h/, 'nightly budget'), role: 'reported' }),
      fig({ name: 'milestone (projected, CPU ÷ 16)', key: 'tiers:milestone', unit: 'h', budget: stated(t, /milestone ≤ (\d+(?:\.\d+)?) h/, 'milestone budget'), role: 'reported' }),
    ],
  },
  {
    id: 'r12-4',
    match: /^R12-4:/,
    role: 'reported',
    kernel: false,
    arrangement: false,
    groups: ['fusion:node', 'site:node'],
    entry: "the stage stamps of the fusion gate's and the site gate's Node runs (bench/src/fusion/runs.ts derive, bench/src/site/timing.ts stageTimesOf; C-0084)",
    workload: "the same runs as the two gates' Node legs: each stage's p50 over the seeds (the fusion run's S3 slice, S4, S5, S8; each site fixture's S1, S3 slice, S4, S6 with the fields)",
    figures: (t) =>
      R12_4.map((r) =>
        fig({
          name: r.name,
          key: r.key,
          unit: 'ms',
          budget: stated(t, r.re, `${r.name} figure`),
          role: 'reported',
          ...(r.quoted === undefined ? {} : { quoted: `the S2 / S3 row's ${String(stated(t, r.quoted, 'S2 / S3 row'))} ms` }),
        }),
      ),
  },
] satisfies BarDef[]);

/** The ladder rule a kernel bar's miss takes (the choices row's id, read into every kernel bar's miss row). */
export const LADDER_RULE = KERNEL_LADDER_ENTRY;

/** Reads M0-work.json's `timingBars` (a missing or malformed key is refused). */
export function readTimingBars(path: string = WORK_PATH): TimingBarRow[] {
  const raw = JSON.parse(readFileSync(path, 'utf8')) as { timingBars?: unknown };
  const rows = raw.timingBars;
  if (!Array.isArray(rows) || rows.length === 0) throw new Error(`timing-phase: ${path} has no timingBars list`);
  return rows.map((r, i) => {
    const o = r as Record<string, unknown>;
    for (const k of ['bar', 'source', 'code', 'measuredBy', 'miss', 'measuredIn', 'reMeasuredBy']) {
      if (typeof o[k] !== 'string') throw new Error(`timing-phase: timingBars[${String(i)}] has no ${k}`);
    }
    return o as unknown as TimingBarRow;
  });
}

/** A bar resolved: its row, its definition and its parsed figures. */
export interface ResolvedBar {
  readonly id: BarId;
  readonly row: TimingBarRow;
  readonly def: BarDef;
  readonly figures: readonly FigureSpec[];
}

/**
 * Matches every timingBars row to exactly one definition and every definition to exactly one row, in the rows' order,
 * and parses each row's figures. A row no definition (or two) recognises, or a definition with no row, is refused: the
 * script never runs a bar list it cannot read whole.
 */
export function resolveBars(rows: readonly TimingBarRow[], defs: readonly BarDef[] = BAR_DEFS): ResolvedBar[] {
  const used = new Set<BarId>();
  const out: ResolvedBar[] = [];
  for (const row of rows) {
    const hits = defs.filter((d) => d.match.test(row.bar));
    if (hits.length !== 1) throw new Error(`timing-phase: the timingBars row ${JSON.stringify(row.bar.slice(0, 60))} is recognised by ${hits.length === 0 ? 'no bar' : hits.map((h) => h.id).join(' and ')}`);
    const def = hits[0];
    if (used.has(def.id)) throw new Error(`timing-phase: two timingBars rows are the bar ${def.id}`);
    used.add(def.id);
    out.push({ id: def.id, row, def, figures: def.figures(row.bar) });
  }
  const missing = defs.filter((d) => !used.has(d.id)).map((d) => d.id);
  if (missing.length > 0) throw new Error(`timing-phase: no timingBars row for ${missing.join(', ')}`);
  return out;
}
