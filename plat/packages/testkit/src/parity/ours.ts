// Our side of a parity run (M0-k-05; C-0180 (9)): `ParityOurs`, numbers and our ids only — the rung, preset and setting
// measured, and per metric key the per-seed values or samples `measureSeeds` gave. A harness writes it (whole, or as
// the `parityOurs` member of its numbers-only summary) and the parity CLI reads it; an unreadable file stops the CLI
// naming the file and the entry, as a baseline row does (§13.5 *Edges*). An empty seed family (`setting.seeds` 0) or a
// side that holds no entry stops it naming the file: §13.8's *Edges*, "a suite whose seed family … is empty … fails
// naming it, never passes vacuously" (C-0099; C-0186, fix round 1, F-1).
import type { Rung } from '@plat/model';
import { isMetricKey, measureSeeds, metricById, type OursEntry } from '../metrics/registry.js';
import type { MetricDoc } from '../metrics/doc.js';
import { DATE_RE, DATE_TIME_RE, ID_RE } from './patterns.js';
import { ParityStop, PRESET_ARMS, WATER_SETTINGS, type ParityOurs, type PresetArm, type WaterSetting } from './types.js';

export const OURS_SCHEMA = 'plat.parity-ours/1';

/** The stops of an empty our side (§13.8 *Edges*; C-0099, C-0186). */
export const EMPTY_SEED_FAMILY = 'empty seed family: setting.seeds is 0 — a run over no seed fails, never passes vacuously (§13.8 Edges; C-0099)';
export const EMPTY_OURS = 'empty: entries holds no metric — a run that measures nothing fails, never passes vacuously (§13.8 Edges; C-0099)';

const RUNGS: ReadonlySet<string> = new Set<Rung>(['TOWN', 'CITY', 'METROPOLIS', 'THORP', 'HAMLET', 'VILLAGE']);

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

/** Our side from one `MetricDoc` per seed (the harnesses' path; C-0180 (9)). */
export function oursFromDocs(
  docs: readonly MetricDoc[],
  meta: { date: string; outputVersion: string; generatorVersion: string; rung: Rung; preset: PresetArm; population: number; water: WaterSetting; seedFamily: string },
  ids?: readonly string[],
): ParityOurs {
  return {
    schema: OURS_SCHEMA,
    date: meta.date,
    outputVersion: meta.outputVersion,
    generatorVersion: meta.generatorVersion,
    rung: meta.rung,
    preset: meta.preset,
    setting: { population: meta.population, water: meta.water, seedFamily: meta.seedFamily, seeds: docs.length },
    entries: measureSeeds(docs, ids),
  };
}

/** Why an entry is unreadable, or null. */
function entryProblem(e: unknown): string | null {
  if (!isObj(e)) return 'not an object';
  const metric = e['metric'];
  if (typeof metric !== 'string') return 'lacks metric';
  const def = metricById(metric);
  if (def === undefined) return `metric ${JSON.stringify(metric)} is not registered`;
  if (e['metricVersion'] !== def.metricVersion) return `metricVersion ${JSON.stringify(e['metricVersion'])}; the registry measures ${def.metricVersion}`;
  if (typeof e['key'] !== 'string' || !isMetricKey(def, e['key'])) return `key ${JSON.stringify(e['key'])} is not a key of ${metric} (N-25)`;
  const has = ['perSeed', 'samples', 'notApplicable'].filter((k) => e[k] !== undefined);
  if (has.length !== 1) return 'carries not exactly one of perSeed, samples and notApplicable';
  if (e['notApplicable'] !== undefined) return typeof e['notApplicable'] === 'string' && e['notApplicable'] !== '' ? null : 'notApplicable is not a reason';
  if (def.form === 'distribution') {
    const s = e['samples'];
    if (!Array.isArray(s) || !s.every((x) => Array.isArray(x) && x.every(isNum))) return 'a distribution entry needs samples: a list of number lists';
  } else {
    const p = e['perSeed'];
    if (!Array.isArray(p) || !p.every(isNum)) return 'a scalar entry needs perSeed: a list of numbers';
  }
  return null;
}

/** Reads our side's text: the object itself, or a summary's `parityOurs` member; stops naming the file and the entry. */
export function readOurs(text: string, file: string): ParityOurs {
  let v: unknown;
  try {
    v = JSON.parse(text);
  } catch (e) {
    throw new ParityStop(file, `unreadable: not JSON (${(e as Error).message.slice(0, 120)})`);
  }
  if (isObj(v) && v['schema'] !== OURS_SCHEMA && isObj(v['parityOurs'])) v = v['parityOurs'];
  if (!isObj(v) || v['schema'] !== OURS_SCHEMA) throw new ParityStop(file, `unreadable: not a ${OURS_SCHEMA} object`);
  const date = v['date'];
  if (typeof date !== 'string' || !(DATE_RE.test(date) || DATE_TIME_RE.test(date))) throw new ParityStop(file, 'unreadable: date is not an ISO date');
  for (const f of ['outputVersion', 'generatorVersion']) if (typeof v[f] !== 'string' || !ID_RE.test(v[f] as string)) throw new ParityStop(file, `unreadable: ${f} is not an id`);
  if (typeof v['rung'] !== 'string' || !RUNGS.has(v['rung'])) throw new ParityStop(file, 'unreadable: rung is not a rung');
  if (typeof v['preset'] !== 'string' || !(PRESET_ARMS as readonly string[]).includes(v['preset'])) throw new ParityStop(file, 'unreadable: preset is not a preset arm');
  const s = v['setting'];
  if (
    !isObj(s) ||
    !isNum(s['population']) ||
    typeof s['water'] !== 'string' ||
    !(WATER_SETTINGS as readonly string[]).includes(s['water']) ||
    typeof s['seedFamily'] !== 'string' ||
    !ID_RE.test(s['seedFamily']) ||
    !Number.isInteger(s['seeds']) ||
    (s['seeds'] as number) < 0
  ) {
    throw new ParityStop(file, 'unreadable: setting is not { population, water, seedFamily, seeds }');
  }
  if (s['seeds'] === 0) throw new ParityStop(file, EMPTY_SEED_FAMILY);
  const entries = v['entries'];
  if (!Array.isArray(entries)) throw new ParityStop(file, 'unreadable: entries is not a list');
  if (entries.length === 0) throw new ParityStop(file, EMPTY_OURS);
  const seen = new Set<string>();
  entries.forEach((e, i) => {
    const p = entryProblem(e);
    const name = isObj(e) && typeof e['metric'] === 'string' ? `${e['metric']}/${String(e['key'])}` : `#${i}`;
    if (p !== null) throw new ParityStop(file, `unreadable entry: ${p}`, name);
    if (seen.has(name)) throw new ParityStop(file, 'unreadable entry: it repeats an earlier entry', name);
    seen.add(name);
  });
  return v as unknown as ParityOurs;
}

export type { OursEntry };
