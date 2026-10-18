// One seed's in-process checks (M0-d-09): what the runner does at a seed beside the cross-host legs, in this process or
// in a child process of the bench (./runner.ts shards the seeds). At `seed`, over the fixture's stage table:
//   1. the INSTRUMENTED run — the seeded stages in list order with the carry's switch `oracle` on (§6.2's CI oracle after
//      every committed batch, and on the records tree after its build and each batch), the whole of it under the
//      distinctness census (./census.ts); its cells are compared with the cross-host legs' (instrumentation changes no
//      digest), its oracle tally, census and refusals reported;
//   2. on a PAIR seed (the first `pairs` seeds), C-0090's re-derivation pair per spike — the instrumented run is the old
//      run, the fresh one re-derived with `{ S5: 1 }` (under the same census) — matched (./rederive.ts), and with the
//      timing switch, timed per kind by M0-d-05b's `timeMatch` inside M0-f-01's `timeBatch` (the stamp; CONTENDED here);
//   3. on a CHECK seed (the first `checks` seeds), the run again under M0-d-08's time-dilation shim × 10 and × 0.1, and
//      again with every declared batch's ops permuted and the arena's slots renumbered before S1 (op order); each run's
//      cells compared with the instrumented run's, the first differing stage named.
// The entities a stage's run exposes with their own lineage (S6's districts, S8's minted entities) are also checked for
// a lineage shared by two of them.
import { crossHostFirstDifference, crossHostResolveStages, crossHostThrownText, permuteOps, renumberSlots, withDilationCounted, type CrossHostCell, type CrossHostDifference, type CrossHostStage } from '@plat/testkit';
import { timeMatch } from '@plat/model';
import { withKeyCensus, type CensusCounts } from './census.js';
import { spikeEntities } from './entities.js';
import { RECORDS_KEY, OPTIONS_KEY, runKey, sizeOf } from './stages.js';
import { matchPair, S5_REROLL, timedPair, type PairResult } from './rederive.js';
import { SPIKES, spikeRun, type OracleMiss, type SpikeRun, type SpikeRunOptions } from './spike.js';
import type { RecordsRun } from './records.js';

/** The dilation factors of §6.5 (9) (× 10 and × 0.1). */
export const DILATION = [10, 0.1] as const;

/** What one seed's task is asked to do. */
export interface SeedTask {
  readonly seed: number;
  readonly pair: boolean;
  readonly check: boolean;
}

/** The task's view of the run's configuration. */
export interface TaskConfig {
  /** The stage ids, in order. */
  readonly stages: readonly string[];
  /** The fixture's inputs (name → text). */
  readonly inputs: Readonly<Record<string, string>>;
  /** Stamp the matching timings with M0-f-01's harness. */
  readonly timing: boolean;
  /** The timing harness's idle wait before a batch (ms). */
  readonly idleMs: number;
  /** `timeMatch`'s repeats per pair. */
  readonly repeats: number;
}

/** A stamped timing as the report keeps it (M0-f-01's TimingResult, its host and reasons summarised). */
export interface StampedTiming {
  readonly label: string;
  readonly value: number;
  readonly unit: string;
  readonly authority: 'authoritative' | 'contended';
  readonly readings: 'measured' | 'built';
  readonly reasons: number;
  readonly firstReasons: readonly string[];
  readonly host: string;
  /** Per kind, the matching median µs per re-derived entity (M0-d-05b's record), and the two classes'. */
  readonly perKindUs: Readonly<Record<string, number>>;
  readonly pointUs: number;
  readonly overlapUs: number;
}

/** A pair's result without the routine's full result. */
export type PairLite = Omit<PairResult, never>;

/** One comparison of a check run with the instrumented run. */
export interface CheckOutcome {
  readonly what: string;
  readonly identical: boolean;
  readonly first: CrossHostDifference | null;
  /** Dilation: the clock reads the shim answered; op order: the declared batches permuted. */
  readonly count: number;
}

/** What a seed's task gives back (plain data: it crosses a process boundary as JSON). */
export interface SeedResult {
  readonly seed: number;
  readonly cells: readonly CrossHostCell[];
  readonly census: { readonly streams: CensusCounts; readonly lineages: CensusCounts };
  readonly entityLineages: { readonly entities: number; readonly duplicates: number; readonly first: string | null };
  readonly oracle: { readonly batches: number; readonly mismatches: number; readonly first: (OracleMiss & { readonly spike: string }) | null; readonly endFailures: number };
  readonly bugs: readonly string[];
  readonly pairs: readonly PairLite[] | null;
  readonly timings: readonly StampedTiming[];
  readonly checks: readonly CheckOutcome[] | null;
}

/** The seeded stages run in list order at `seed` with a carry holding `options` (an error becomes the cell's). */
export function runStagesAt(table: readonly CrossHostStage[], stages: readonly string[], seed: number, inputs: Readonly<Record<string, string>>, options?: Omit<SpikeRunOptions, 'size'>): { cells: CrossHostCell[]; carry: Map<string, unknown> } {
  const carry = new Map<string, unknown>();
  if (options !== undefined) carry.set(OPTIONS_KEY, options);
  const cells: CrossHostCell[] = [];
  for (const s of crossHostResolveStages(table, stages)) {
    if (s.seeded === false) continue;
    try {
      const d = s.run(seed, { inputs, carry });
      cells.push({ stage: s.id, seed, model: d.model, records: d.records });
    } catch (e) {
      cells.push({ stage: s.id, seed, model: null, records: null, error: crossHostThrownText(e) });
    }
  }
  return { cells, carry };
}

const spikesIn = (carry: ReadonlyMap<string, unknown>): SpikeRun[] => SPIKES.map((s) => carry.get(runKey(s)) as SpikeRun | undefined).filter((r): r is SpikeRun => r !== undefined);

/** Runs one seed's task (see the module comment). */
export async function runSeedTask(table: readonly CrossHostStage[], cfg: TaskConfig, task: SeedTask, stamp?: StampFn): Promise<SeedResult> {
  const size = sizeOf(cfg.inputs);
  // 1 and 2 under one census: the instrumented run, then each spike's fresh re-derivation.
  const counted = withKeyCensus(() => {
    const inst = runStagesAt(table, cfg.stages, task.seed, cfg.inputs, { oracle: true });
    const runs = spikesIn(inst.carry);
    const pairs = task.pair && runs.length > 0 ? runs.map((old) => ({ old, fresh: spikeRun(old.spike, task.seed, { size, rerolls: S5_REROLL }) })) : null;
    return { inst, runs, pairs };
  });
  const { inst, runs } = counted.value;

  // The oracle's tally over the spikes and the records tree.
  let batches = 0;
  let mismatches = 0;
  let endFailures = 0;
  let first: (OracleMiss & { spike: string }) | null = null;
  for (const r of runs) {
    if (r.oracle === null) continue;
    batches += r.oracle.batches;
    mismatches += r.oracle.mismatches;
    if (!r.oracle.end) endFailures += 1;
    if (first === null && r.oracle.first !== null) first = { spike: r.spike, ...r.oracle.first };
  }
  const rec = inst.carry.get(RECORDS_KEY) as RecordsRun | undefined;
  if (rec?.oracle != null) {
    batches += rec.oracle.batches;
    mismatches += rec.oracle.mismatches;
    if (first === null && rec.oracle.first !== null) first = { spike: 'records', ...rec.oracle.first };
  }

  // Entities with their own lineage: no lineage shared by two of them.
  let entities = 0;
  let duplicates = 0;
  let firstDup: string | null = null;
  for (const r of runs) {
    const seen = new Map<string, string>();
    for (const e of spikeEntities(r).entities) {
      if (e.lineageFrom !== 'model') continue;
      entities += 1;
      const key = `${String(e.entity.lineage[0])}:${String(e.entity.lineage[1])}`;
      const had = seen.get(key);
      if (had !== undefined) {
        duplicates += 1;
        if (firstDup === null) firstDup = `${r.spike}: ${had} and ${e.entity.kind}:${e.entity.id}`;
      } else seen.set(key, `${e.entity.kind}:${e.entity.id}`);
    }
  }

  const bugs = runs.flatMap((r) => r.bugs.map((b) => `${r.spike}:${b}`));

  // 2. the pairs, matched; their timings stamped.
  let pairs: PairLite[] | null = null;
  const timings: StampedTiming[] = [];
  if (counted.value.pairs !== null) {
    pairs = [];
    for (const p of counted.value.pairs) {
      const pair = { spike: p.old.spike, seed: task.seed, rerolls: S5_REROLL, old: { run: p.old, entities: spikeEntities(p.old) }, fresh: { run: p.fresh, entities: spikeEntities(p.fresh) } };
      const { result: _result, ...lite } = matchPair(pair);
      pairs.push(lite);
      if (cfg.timing && stamp !== undefined) timings.push(await stamp(pair, cfg));
    }
  }

  // 3. the check runs.
  let checks: CheckOutcome[] | null = null;
  if (task.check) {
    checks = [];
    for (const factor of DILATION) {
      const d = withDilationCounted(factor, () => runStagesAt(table, cfg.stages, task.seed, cfg.inputs));
      const diff = crossHostFirstDifference(inst.cells, d.value.cells);
      checks.push({ what: `dilation x${String(factor)}`, identical: diff === null, first: diff, count: d.reads });
    }
    const op = runStagesAt(table, cfg.stages, task.seed, cfg.inputs, {
      permute: { seed: task.seed, apply: (tx, s) => permuteOps(tx, s) },
      renumber: { seed: task.seed, apply: (p, s) => renumberSlots(p, s) },
    });
    const diff = crossHostFirstDifference(inst.cells, op.cells);
    checks.push({ what: 'op order (ops permuted, slots renumbered)', identical: diff === null, first: diff, count: spikesIn(op.carry).reduce((n, r) => n + r.permuted, 0) });
  }

  return {
    seed: task.seed,
    cells: inst.cells,
    census: { streams: counted.streams, lineages: counted.lineages },
    entityLineages: { entities, duplicates, first: firstDup },
    oracle: { batches, mismatches, first, endFailures },
    bugs,
    pairs,
    timings,
    checks,
  };
}

/** Stamps a pair's matching timing (./runner.ts gives M0-f-01's harness; a test may give its own). */
export type StampFn = (pair: Parameters<typeof timedPair>[0], cfg: TaskConfig) => Promise<StampedTiming>;

/** The per-kind medians of M0-d-05b's record, by kind. */
export function perKindUs(rec: ReturnType<typeof timeMatch>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const k of rec.perKind) out[k.kind] = k.medianUs;
  return out;
}
