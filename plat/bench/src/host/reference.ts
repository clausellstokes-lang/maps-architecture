// The reference score (§12.1: "the reference score is stored with the goldens"; C-0050, C-0075). Its file
// `reference-score.json` is landed by M0-f-01 at `{ score: null }` and handed over to M0-t-01, whose timing-phase run
// writes it ONCE, through writeReferenceScore(), from the first AUTHORITATIVE calibrate run — the machine otherwise idle.
// Until then every TimingResult carries `normalisation: null` and `authority: 'contended'` ("no reference score").
import { readFileSync, renameSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { HostRecord } from './record.js';

/** The reference-score file in this folder (inside plat/, §17.1 (3)). */
export const REFERENCE_SCORE_PATH = fileURLToPath(new URL('./reference-score.json', import.meta.url));

/** The reason every stamp carries while the reference score is null (C-0075). */
export const NO_REFERENCE_SCORE = 'no reference score';

export interface ReferenceScore {
  /** The reference machine's calibrate score in milliseconds, or null until the timing phase writes it. */
  score: number | null;
  unit: 'ms';
  /** The calibrate kernel set's version the score was taken with (CALIBRATE_VERSION). */
  calibrateVersion: number | null;
  host: HostRecord | null;
  measuredAt: string | null;
  /** The lane key or item that wrote it (M0-t-01). */
  writtenBy: string | null;
  /** The two agreeing calibrate scores of the run and their drift. */
  calibration: { scores: [number, number]; drift: number } | null;
}

function isPositive(x: unknown): x is number {
  return typeof x === 'number' && Number.isFinite(x) && x > 0;
}

/** Reads and validates a reference-score file (default: this folder's). A missing or malformed file throws. */
export function readReferenceScore(path: string = REFERENCE_SCORE_PATH): ReferenceScore {
  const raw: unknown = JSON.parse(readFileSync(path, 'utf8'));
  if (typeof raw !== 'object' || raw === null) throw new Error(`reference score: ${path} is not a JSON object`);
  const r = raw as Record<string, unknown>;
  const score = r['score'];
  if (score !== null && !isPositive(score)) throw new Error(`reference score: ${path} has score ${JSON.stringify(score)} (null or a positive number)`);
  if (r['unit'] !== 'ms') throw new Error(`reference score: ${path} has unit ${JSON.stringify(r['unit'])} (ms)`);
  if (score !== null && (r['host'] === null || typeof r['calibrateVersion'] !== 'number')) {
    throw new Error(`reference score: ${path} has a score without its host record and calibrate version (§12.1)`);
  }
  return {
    score,
    unit: 'ms',
    calibrateVersion: (r['calibrateVersion'] as number | null | undefined) ?? null,
    host: (r['host'] as HostRecord | null | undefined) ?? null,
    measuredAt: (r['measuredAt'] as string | null | undefined) ?? null,
    writtenBy: (r['writtenBy'] as string | null | undefined) ?? null,
    calibration: (r['calibration'] as ReferenceScore['calibration'] | undefined) ?? null,
  };
}

/** The reference score as read when this module loaded (null at M0 until M0-t-01's first act). */
export const REFERENCE_SCORE: ReferenceScore = readReferenceScore();

export interface ReferenceRun {
  /** The two calibrate scores (ms) taken back to back in the run. */
  scores: [number, number];
  calibrateVersion: number;
  host: HostRecord;
  /**
   * The run's stamp as the detector or the harness MEASURED it — the run's ContentionReport or TimingResult, passed
   * whole: its readings must be `measured` (C-0047: a stamp built from injected readings is never trusted) and its
   * reasons may hold only "no reference score" (C-0075). Fix round 1, the checker's note N-1 (C-0139).
   */
  stamp: { readings: 'measured' | 'built'; reasons: readonly string[] };
}

/**
 * Writes the reference score ONCE (C-0075): refuses when the file already holds a score, when the run's stamp was built
 * from injected readings or its reasons hold anything but "no reference score" (the authority is measured, never
 * declared — C-0047), or when the two scores differ by more than 5 % (§12.1). The score written is the mean of the two agreeing scores. Atomic (write and
 * rename). Returns the record written.
 */
export function writeReferenceScore(run: ReferenceRun, opts: { writtenBy: string; path?: string; at?: string }): ReferenceScore {
  const path = opts.path ?? REFERENCE_SCORE_PATH;
  const current = readReferenceScore(path);
  if (current.score !== null) {
    throw new Error(`reference score: already written (${current.score} ms by ${current.writtenBy ?? 'unknown'} at ${current.measuredAt ?? 'unknown'}); it is written once (C-0075)`);
  }
  if (run.stamp.readings !== 'measured') {
    throw new Error('reference score: the run\'s stamp was built from injected readings; only a measured stamp writes it (C-0047)');
  }
  const others = run.stamp.reasons.filter((r) => r !== NO_REFERENCE_SCORE);
  if (others.length > 0) {
    throw new Error(`reference score: the run was contended (${others.join('; ')}); only an AUTHORITATIVE run writes it (C-0047, C-0075)`);
  }
  const [a, b] = run.scores;
  if (!isPositive(a) || !isPositive(b)) throw new Error('reference score: two positive calibrate scores are required');
  const drift = Math.abs(a - b) / Math.min(a, b);
  if (drift > 0.05) {
    throw new Error(`reference score: the two calibrate scores differ by ${(drift * 100).toFixed(1)} % (> 5 %, §12.1); re-run`);
  }
  const record: ReferenceScore = {
    score: (a + b) / 2,
    unit: 'ms',
    calibrateVersion: run.calibrateVersion,
    host: run.host,
    measuredAt: opts.at ?? new Date().toISOString(),
    writtenBy: opts.writtenBy,
    calibration: { scores: [a, b], drift },
  };
  const comment = (JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>)['$comment'];
  const text = `${JSON.stringify({ ...(comment === undefined ? {} : { $comment: comment }), ...record }, null, 2)}\n`;
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, text);
  renameSync(tmp, path);
  return record;
}
