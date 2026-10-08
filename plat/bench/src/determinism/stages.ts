// The spike city's stage table for M0-d-06's cross-host harness (M0-d-09; §6.5 (9) *cross-host*: "identical digests on
// Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off"; §16 M0 (d): 100 seeds; C-0228 (2): "the spike
// city's pipeline, M0-d-09's entry"). Bundled by the harness for every leg, so it reads no Node or DOM API.
//
// Per seed, in list order (the harness's `carry` holds each spike's run for the stages after its first):
//   fusion.S1 … fusion.S8   the fusion spike's model root at each stage's end (the first of them derives the spike);
//   fusion.root             its model root at the end;
//   fusion.report           the digest of its generation report's canonical text (refusals, ladder uses, …);
//   site.S1 … site.report   the same for the site spike;
//   records                 the synthetic records tree: the synthetic model tree's root and the records digest.
// The legs compare cell by cell, so the first differing (stage, seed) names the pipeline stage where two engines part.
//
// A run's switches come in through the carry (the leg runtime starts each seed with an empty one, so a leg's run is
// the plain derivation): `determinism.options` (SpikeRunOptions less the size) set by the runner's in-process checks
// before a seed's first stage; and the size from the fixture's input `spike/size.json` (absent: CITY).
import type { CrossHostDigest, CrossHostStage, CrossHostStageContext } from '@plat/testkit';
import { BASE_ORDER } from '@plat/layout';
import { recordsRun, type RecordsRun } from './records.js';
import { SPIKES, spikeRun, type SpikeName, type SpikeRun, type SpikeRunOptions, type SpikeSize } from './spike.js';

/** The fixture input naming the spike's size (a JSON object { areaHa?, walledHa? }); absent: CITY. */
export const SIZE_INPUT = 'spike/size.json';
/** The carry key of the in-process switches. */
export const OPTIONS_KEY = 'determinism.options';
/** The carry key a spike's run is kept under. */
export const runKey = (spike: SpikeName): string => `spike:${spike}`;
/** The carry key the records run is kept under. */
export const RECORDS_KEY = 'records';

/** The per-spike stage ids: one per pipeline stage, then the root and the report. */
export function spikeStageIds(spike: SpikeName): string[] {
  return [...BASE_ORDER.map((s) => `${spike}.${s}`), `${spike}.root`, `${spike}.report`];
}

/** Every stage id of the table, in the spike city's order. */
export const SPIKE_STAGE_IDS: readonly string[] = Object.freeze([...SPIKES.flatMap((s) => spikeStageIds(s)), 'records']);

const SIZE_KEYS = new Set(['areaHa', 'walledHa', '$comment']);

/** The size a fixture's input names (checked: positive finite numbers only). */
export function sizeOf(inputs: Readonly<Record<string, string>>): SpikeSize {
  const text = inputs[SIZE_INPUT];
  if (text === undefined) return {};
  const v = JSON.parse(text) as Record<string, unknown>;
  if (typeof v !== 'object' || v === null || Array.isArray(v)) throw new Error(`spike: ${SIZE_INPUT} is not an object`);
  for (const k of Object.getOwnPropertyNames(v)) if (!SIZE_KEYS.has(k)) throw new Error(`spike: ${SIZE_INPUT} has an unknown field ${JSON.stringify(k)}`);
  const num = (k: 'areaHa' | 'walledHa'): number | undefined => {
    const x = v[k];
    if (x === undefined) return undefined;
    if (typeof x !== 'number' || !Number.isFinite(x) || x <= 0) throw new Error(`spike: ${SIZE_INPUT}'s ${k} is not a positive number`);
    return x;
  };
  const areaHa = num('areaHa');
  const walledHa = num('walledHa');
  return { ...(areaHa === undefined ? {} : { areaHa }), ...(walledHa === undefined ? {} : { walledHa }) };
}

/** The spike's run for this seed: the carry's, else derived now (with the carry's switches) and kept. */
export function carriedSpike(spike: SpikeName, seed: number, ctx: CrossHostStageContext): SpikeRun {
  const key = runKey(spike);
  const had = ctx.carry.get(key) as SpikeRun | undefined;
  if (had !== undefined) {
    if (had.seed !== seed) throw new Error(`spike: the carry holds ${spike} at seed ${String(had.seed)}, not ${String(seed)}`);
    return had;
  }
  const options = (ctx.carry.get(OPTIONS_KEY) as Omit<SpikeRunOptions, 'size'> | undefined) ?? {};
  const r = spikeRun(spike, seed, { ...options, size: sizeOf(ctx.inputs) });
  ctx.carry.set(key, r);
  return r;
}

function stageRootOf(r: SpikeRun, stage: string): string {
  const at = r.stageRoots.find(([name]) => name === stage);
  if (at === undefined) throw new Error(`spike: ${r.spike} has no root at ${stage} (its order is ${r.stageRoots.map(([n]) => n).join(', ')})`);
  return at[1];
}

function spikeStages(spike: SpikeName): CrossHostStage[] {
  const per = BASE_ORDER.map(
    (stage): CrossHostStage => ({
      id: `${spike}.${stage}`,
      run: (seed, ctx): CrossHostDigest => ({ model: stageRootOf(carriedSpike(spike, seed, ctx), stage), records: null }),
    }),
  );
  return [
    ...per,
    { id: `${spike}.root`, run: (seed, ctx): CrossHostDigest => ({ model: carriedSpike(spike, seed, ctx).root, records: null }) },
    { id: `${spike}.report`, run: (seed, ctx): CrossHostDigest => ({ model: carriedSpike(spike, seed, ctx).reportDigest, records: null }) },
  ];
}

/** The records stage: the synthetic records tree at the seed (the oracle on when the carry's switches ask for it). */
const recordsStage: CrossHostStage = {
  id: 'records',
  run: (seed, ctx): CrossHostDigest => {
    const options = (ctx.carry.get(OPTIONS_KEY) as Omit<SpikeRunOptions, 'size'> | undefined) ?? {};
    const r: RecordsRun = recordsRun(seed, { oracle: options.oracle === true });
    ctx.carry.set(RECORDS_KEY, r);
    return { model: r.model, records: r.records };
  },
};

/** The spike city's stage table (the cross-host fixture's entry exports it under this name, C-0228 (2)). */
export const crosshostStages: readonly CrossHostStage[] = Object.freeze([...SPIKES.flatMap((s) => spikeStages(s)), recordsStage]);
