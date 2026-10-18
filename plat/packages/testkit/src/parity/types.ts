// The parity types (M0-k-05; §13.5's `Baseline`, `FtgSize`, `ParityReport`; §13.3's `WaterSetting`; V12 §2.1's
// `PresetArm` as §13.5 restates it). Field names and order as §13.5 declares them; the report's `unread` and `info`
// lists are M0's additions for the rows it does not read and the lines that change no verdict (N-20, N-25, N-31;
// C-0180 (10)).
import type { Hash128 } from '@plat/kernel';
import type { Rung } from '@plat/model';
import type { OursEntry } from '../metrics/registry.js';

/** FTG's size presets (§13.5). */
export type FtgSize = 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS';

/** A reference: one of the five, or a corpus row arriving through §13.9 (its id salted, C-0092 C6). */
export type BaselineReference = 'MFCG' | 'FTG' | 'NG' | 'VG' | 'FM' | `corpus:frame:${string}` | `corpus:map:${string}`;

/** A baseline row's values: a scalar spread or a histogram (§13.5). */
export type BaselineValues =
  | { p10?: number; p50?: number; p90?: number; n: number; seeds: number }
  | { bins: number[]; histogram: number[]; n: number; seeds: number };

/** §13.5's `Baseline`: one row of `baselines.json`, numbers and provenance only. */
export interface Baseline {
  id: string;
  metric: string;
  unit: string;
  reference: BaselineReference;
  referenceBuild: string;
  capture: string;
  script: string;
  date: string;
  matched?: { rung: Rung; mfcgSize?: number; ftgSize?: FtgSize; population?: number };
  role: 'target' | 'weakness' | 'descriptive';
  values: BaselineValues;
  metricVersion: string;
  supersedes?: string;
  sample: { family: string; indices?: [0, number]; captures?: string[]; failed?: { index: number; reason: string }[] };
  estimator: 'single' | 'minmax' | 'type7';
  spreadKS?: { p90: number; pairs: number };
  scale: 'metric' | 'free';
  evidence?: 'record' | 'surveyed' | 'drawn';
  frameN?: number;
  note?: string;
}

/** §13.3's one spelling of a water setting. */
export type WaterSetting = 'none' | 'coast' | 'river' | 'coast+river';
export const WATER_SETTINGS: readonly WaterSetting[] = Object.freeze(['none', 'coast', 'river', 'coast+river'] as const);

/** The preset a row was measured under (§13.5: V12 §2.1's `PresetArm`). */
export type PresetArm = 'default' | 'MFCG' | 'FTG' | 'VG' | 'FM' | 'NG';
export const PRESET_ARMS: readonly PresetArm[] = Object.freeze(['default', 'MFCG', 'FTG', 'VG', 'FM', 'NG'] as const);

/** A report row's verdict (§13.5): descriptive rows are always `reported`. */
export type ParityVerdict = 'pass' | 'fail' | 'reported' | 'notApplicable' | 'missingBaseline';

/** One row of a parity report (§13.5). */
export interface ParityRow {
  metric: string;
  metricVersion: string;
  baselineIds: string[];
  role: Baseline['role'];
  rung: Rung;
  preset: PresetArm;
  setting: { population: number; water: WaterSetting; seedFamily: string; seeds: number };
  band: { lo?: number; hi?: number; ksMax?: number; direction?: 'above' | 'below'; margin?: number };
  ours: { p10?: number; p50?: number; p90?: number; ks?: number; n: number; seeds: number };
  verdict: ParityVerdict;
  override?: string;
  note?: string;
}

/** A row of `baselines.json` the run did not read, and why (N-20, N-25, N-31; C-0180 (10)). */
export interface ParityUnread {
  id: string;
  reason: string;
}

/** §13.5's `ParityReport`, written by the parity CLI per run in canonical form (C-0180 (11)). */
export interface ParityReport {
  runId: string;
  date: string;
  outputVersion: string;
  generatorVersion: string;
  baselines: Hash128;
  metricsVersion: string;
  rows: ParityRow[];
  summary: { pass: number; fail: number; reported: number };
  unread: ParityUnread[];
  /** Information lines that change no verdict (N-31 (3); C-0180 (10)). */
  info: string[];
}

/** Our side of one parity run: what was measured, under which rung, preset and setting (C-0180 (9)). */
export interface ParityOurs {
  schema: 'plat.parity-ours/1';
  date: string;
  outputVersion: string;
  generatorVersion: string;
  rung: Rung;
  preset: PresetArm;
  setting: { population: number; water: WaterSetting; seedFamily: string; seeds: number };
  entries: OursEntry[];
}

/**
 * The parity CLI stops (§13.5 *Edges*, T-RIG-1; C-0068): a missing file, an unreadable row, a row lacking
 * `referenceBuild`, `capture`, `script` or `date` — naming the file and the row; no report is written.
 */
export class ParityStop extends Error {
  readonly file: string;
  readonly row: string | undefined;
  constructor(file: string, message: string, row?: string) {
    super(`${file}${row === undefined ? '' : `: row ${JSON.stringify(row)}`}: ${message}`);
    this.name = 'ParityStop';
    this.file = file;
    this.row = row;
  }
}
