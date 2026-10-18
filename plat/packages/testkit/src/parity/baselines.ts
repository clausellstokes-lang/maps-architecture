// The `baselines.json` reader (M0-k-05; §13.5's `Baseline` and *Edges*: "a missing file, an unreadable row or a row
// lacking `referenceBuild`, `capture`, `script` or `date` stops the parity CLI naming the file and the row", T-RIG-1;
// C-0068; N-31's three forms; C-0180 (14)). The file is a JSON array of rows, or an object whose `rows` member is that
// array. A row is unreadable when it is not an object, lacks an id, metric, unit, reference, role, metricVersion or
// sample family, carries values in neither of §13.5's two forms, or repeats an id; every such row stops the reader.
// A file that holds no row (`[]`, `{ "rows": [] }`) stops it too: §13.8's *Edges* — "a suite whose … baseline file is
// empty or missing fails naming it, never passes vacuously" — read with C-0068 and C-0099 (C-0186, fix round 1, F-1).
import type { Rung } from '@plat/model';
import { histogramLayout } from '../metrics/stats.js';
import { ParityStop, type Baseline } from './types.js';

const RUNGS: ReadonlySet<string> = new Set<Rung>(['TOWN', 'CITY', 'METROPOLIS', 'THORP', 'HAMLET', 'VILLAGE']);
const ROLES: ReadonlySet<string> = new Set(['target', 'weakness', 'descriptive']);
const FTG_SIZES: ReadonlySet<string> = new Set(['BIG_TOWN', 'BIG_CITY', 'CITY', 'METROPOLIS']);
const ESTIMATORS: ReadonlySet<string> = new Set(['single', 'minmax', 'type7']);
const SCALES: ReadonlySet<string> = new Set(['metric', 'free']);
const EVIDENCE: ReadonlySet<string> = new Set(['record', 'surveyed', 'drawn']);

/** The provenance fields T-RIG-1 names (§13.5 *Edges*). */
export const PROVENANCE_FIELDS = Object.freeze(['referenceBuild', 'capture', 'script', 'date'] as const);

/** What the reader returns: the rows in file order, and information lines that change no verdict (N-31 (3)). */
export interface BaselineFile {
  rows: Baseline[];
  info: string[];
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isStr = (v: unknown): v is string => typeof v === 'string' && v.length > 0;

/** The rows array of a parsed `baselines.json`, or null when the value is neither form. */
export function rowsOf(v: unknown): unknown[] | null {
  if (Array.isArray(v)) return v;
  if (isObj(v) && Array.isArray(v['rows'])) return v['rows'];
  return null;
}

/** Why a values member is in neither of §13.5's forms, or null. */
export function valuesProblem(v: unknown): string | null {
  if (!isObj(v)) return 'values is not an object';
  if (!isNum(v['n']) || v['n'] < 0) return 'values.n is not a count';
  if (!isNum(v['seeds']) || v['seeds'] < 0) return 'values.seeds is not a count';
  if ('bins' in v || 'histogram' in v) {
    const bins = v['bins'];
    const hist = v['histogram'];
    if (!Array.isArray(bins) || !bins.every(isNum)) return 'values.bins is not a list of numbers';
    if (!Array.isArray(hist) || !hist.every((h) => isNum(h) && h >= 0)) return 'values.histogram is not a list of counts';
    for (let i = 1; i < bins.length; i += 1) if (!((bins[i] as number) > (bins[i - 1] as number))) return 'values.bins do not ascend';
    if (histogramLayout(bins.length, hist.length) === null) return `values.histogram has ${hist.length} counts for ${bins.length} edges`;
    return null;
  }
  for (const p of ['p10', 'p50', 'p90']) if (p in v && !isNum(v[p])) return `values.${p} is not a number`;
  return null;
}

/** Why a sample member is unreadable, or null (N-31 (1): `captures` without `indices` is a sample). */
export function sampleProblem(s: unknown): string | null {
  if (!isObj(s)) return 'sample is not an object';
  if (!isStr(s['family'])) return 'sample.family is missing';
  const idx = s['indices'];
  if (idx !== undefined && !(Array.isArray(idx) && idx.length === 2 && idx[0] === 0 && Number.isInteger(idx[1]) && (idx[1] as number) >= 0)) {
    return 'sample.indices is not [0, n]';
  }
  const caps = s['captures'];
  if (caps !== undefined && !(Array.isArray(caps) && caps.every(isStr))) return 'sample.captures is not a list of labels';
  const failed = s['failed'];
  if (failed !== undefined) {
    if (!Array.isArray(failed)) return 'sample.failed is not a list';
    for (const f of failed) if (!isObj(f) || !Number.isInteger(f['index']) || typeof f['reason'] !== 'string') return 'sample.failed holds an entry without index and reason';
  }
  return null;
}

/** The members a sample names: its captures, else the half-open index range [0, n) (C-0180 (14)); null when neither. */
export function memberCount(s: Baseline['sample']): number | null {
  if (s.captures !== undefined) return s.captures.length;
  if (s.indices !== undefined) return s.indices[1];
  return null;
}

/** Why a row is unreadable, naming the field, or null (a missing provenance field in T-RIG-1's own wording). */
export function rowProblem(r: unknown): { message: string } | null {
  if (!isObj(r)) return { message: 'not an object' };
  if (!isStr(r['id'])) return { message: 'lacks id' };
  for (const f of PROVENANCE_FIELDS) if (!isStr(r[f])) return { message: `lacks ${f} (T-RIG-1)` };
  for (const f of ['metric', 'unit', 'reference', 'metricVersion'] as const) if (!isStr(r[f])) return { message: `lacks ${f}` };
  if (typeof r['role'] !== 'string' || !ROLES.has(r['role'])) return { message: 'role is not target, weakness or descriptive' };
  const vp = valuesProblem(r['values']);
  if (vp !== null) return { message: vp };
  const sp = sampleProblem(r['sample']);
  if (sp !== null) return { message: sp };
  if (r['supersedes'] !== undefined && !isStr(r['supersedes'])) return { message: 'supersedes is not an id' };
  const m = r['matched'];
  if (m !== undefined) {
    if (!isObj(m)) return { message: 'matched is not an object' };
    if (m['rung'] !== undefined && (typeof m['rung'] !== 'string' || !RUNGS.has(m['rung']))) return { message: 'matched.rung is not a rung' };
    if (m['ftgSize'] !== undefined && (typeof m['ftgSize'] !== 'string' || !FTG_SIZES.has(m['ftgSize']))) return { message: 'matched.ftgSize is not an FTG size' };
    if (m['mfcgSize'] !== undefined && !isNum(m['mfcgSize'])) return { message: 'matched.mfcgSize is not a number' };
    if (m['population'] !== undefined && !isNum(m['population'])) return { message: 'matched.population is not a number' };
  }
  if (r['estimator'] !== undefined && (typeof r['estimator'] !== 'string' || !ESTIMATORS.has(r['estimator']))) return { message: 'estimator is not single, minmax or type7' };
  if (r['scale'] !== undefined && (typeof r['scale'] !== 'string' || !SCALES.has(r['scale']))) return { message: 'scale is not metric or free' };
  if (r['evidence'] !== undefined && (typeof r['evidence'] !== 'string' || !EVIDENCE.has(r['evidence']))) return { message: 'evidence is not record, surveyed or drawn' };
  const ks = r['spreadKS'];
  if (ks !== undefined && !(isObj(ks) && isNum(ks['p90']) && ks['p90'] >= 0 && isNum(ks['pairs']))) return { message: 'spreadKS is not { p90, pairs }' };
  if (r['note'] !== undefined && typeof r['note'] !== 'string') return { message: 'note is not text' };
  return null;
}

/** The stop of a baseline file that holds no row (§13.8 *Edges*; C-0186). */
export const EMPTY_BASELINES = 'empty: the file holds no row — an empty baseline file fails, never passes vacuously (§13.8 Edges; C-0099)';

/**
 * Reads `baselines.json`'s text (§13.5 *Edges*, T-RIG-1): every row checked; the first unreadable row, row lacking a
 * provenance field or repeated id stops the reader with a `ParityStop` naming the file and the row (by its id, or by
 * its position when it has none); a file of no row stops it naming the file (§13.8 *Edges*, C-0186). Information lines
 * (N-31 (3)) never stop it.
 */
export function readBaselines(text: string, file: string): BaselineFile {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    throw new ParityStop(file, `unreadable: not JSON (${(e as Error).message.slice(0, 120)})`);
  }
  const raw = rowsOf(parsed);
  if (raw === null) throw new ParityStop(file, 'unreadable: neither a list of rows nor an object with a rows list');
  if (raw.length === 0) throw new ParityStop(file, EMPTY_BASELINES);
  const rows: Baseline[] = [];
  const info: string[] = [];
  const ids = new Set<string>();
  raw.forEach((r, i) => {
    const name = isObj(r) && isStr(r['id']) ? r['id'] : `#${i}`;
    const p = rowProblem(r);
    if (p !== null) throw new ParityStop(file, `unreadable row: ${p.message}`, name);
    const row = r as unknown as Baseline;
    if (ids.has(row.id)) throw new ParityStop(file, 'unreadable row: its id repeats an earlier row', row.id);
    ids.add(row.id);
    rows.push(row);
    const members = memberCount(row.sample);
    const failed = row.sample.failed?.length ?? 0;
    if (members !== null) {
      if (row.values.n > 0 && row.values.seeds !== members - failed) {
        info.push(`row ${row.id}: values.seeds ${row.values.seeds} differs from its ${members - failed} members outside sample.failed (N-31 (3))`);
      }
      if (row.values.n === 0 && failed !== members) info.push(`row ${row.id}: values.n 0 with ${failed} of ${members} members in sample.failed (N-31 (3))`);
    }
  });
  return { rows, info };
}
