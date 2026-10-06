// The leg runtime (M0-d-06): runs one job's stages over its seeds on whatever engine loaded it — Node's main thread or a
// worker_thread, a browser page or a Web Worker — and returns the cells. Engine-neutral on purpose: no Node or DOM API
// here, so the same code is bundled for every leg; the clock is handed in by the leg's bootstrap and read only around a
// stage call in the timing mode (C-0082: the harness's clock, never model code).
//
// Order (the report's "first differing stage and seed" reads it): the unseeded stages first, once each, in list order;
// then, for each seed in order, the seeded stages in list order, each seed with a fresh carry map.
import type { CrossHostCell, CrossHostJob, CrossHostLegResult, CrossHostStage } from './types.js';

/** A stage table: what a fixture's entry module exports as `crosshostStages`. */
export type CrossHostStageTable = readonly CrossHostStage[];

/** The text of a thrown value, as compared across legs (the name and message; never a stack, which names files). */
export function crossHostThrownText(e: unknown): string {
  if (e instanceof Error) return `${e.name}: ${e.message}`;
  return `thrown: ${String(e)}`;
}

/** Looks up the job's stages in the table; an unknown or repeated id is refused before anything runs. */
export function crossHostResolveStages(table: CrossHostStageTable, ids: readonly string[]): CrossHostStage[] {
  const byId = new Map<string, CrossHostStage>();
  for (const s of table) {
    if (byId.has(s.id)) throw new Error(`crosshost: the stage table names ${JSON.stringify(s.id)} twice`);
    byId.set(s.id, s);
  }
  const seen = new Set<string>();
  return ids.map((id) => {
    const s = byId.get(id);
    if (s === undefined) throw new Error(`crosshost: no stage ${JSON.stringify(id)} in the table (it has ${[...byId.keys()].join(', ')})`);
    if (seen.has(id)) throw new Error(`crosshost: the stage list names ${JSON.stringify(id)} twice`);
    seen.add(id);
    return s;
  });
}

/** Checks a job's seeds: u32s. */
export function crossHostCheckSeeds(seeds: readonly number[]): void {
  for (const s of seeds) if ((s >>> 0) !== s) throw new RangeError(`crosshost: a seed is a u32, got ${String(s)}`);
}

/**
 * Runs a job on this engine: every stage call guarded (a throw becomes the cell's error, compared like a digest), the
 * clock read around the call only when the job's timing switch is on.
 */
export function runCrossHostJob(table: CrossHostStageTable, job: CrossHostJob, thread: 'main' | 'worker', clock?: () => number): CrossHostLegResult {
  crossHostCheckSeeds(job.seeds);
  const stages = crossHostResolveStages(table, job.stages);
  if (job.timing && clock === undefined) throw new Error('crosshost: the timing mode needs the leg clock');
  const cells: CrossHostCell[] = [];
  const call = (s: CrossHostStage, seed: number | null, carry: Map<string, unknown>): void => {
    const ctx = { inputs: job.inputs, carry };
    let t0 = 0;
    if (job.timing && clock !== undefined) t0 = clock();
    let cell: CrossHostCell;
    try {
      const d = s.run(seed ?? 0, ctx);
      cell = { stage: s.id, seed, model: d.model, records: d.records };
    } catch (e) {
      cell = { stage: s.id, seed, model: null, records: null, error: crossHostThrownText(e) };
    }
    if (job.timing && clock !== undefined) cell = { ...cell, ms: clock() - t0 };
    cells.push(cell);
  };
  for (const s of stages) if (s.seeded === false) call(s, null, new Map());
  for (const seed of job.seeds) {
    const carry = new Map<string, unknown>();
    for (const s of stages) if (s.seeded !== false) call(s, seed, carry);
  }
  return { cells, thread };
}
