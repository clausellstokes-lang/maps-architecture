// The cross-host report's comparison (M0-d-06; §6.5 (9): "a report comparing every leg to the arm64 reference, naming
// the first differing stage and seed"). Every ran run is compared cell by cell, in run order, with the reference run
// (Node arm64, workers off) — or, where the reference cannot run on this machine, with the first ran run in the
// report's order, which the report names (`comparedWith`) and which never makes the verdict a pass (the reference
// blocked is `incomplete`). The timing mode's figures are never compared: they are the harness's clock, not the model's.
import { CROSSHOST_LEGS, CROSSHOST_REFERENCE, CROSSHOST_WORKERS, type CrossHostCell, type CrossHostDifference, type CrossHostLegId, type CrossHostReport, type CrossHostRun, type CrossHostWorkers } from './types.js';

/** The first cell where `got` differs from `ref` (model, then records, then error), or null when every cell agrees. */
export function crossHostFirstDifference(ref: readonly CrossHostCell[], got: readonly CrossHostCell[]): CrossHostDifference | null {
  const n = Math.max(ref.length, got.length);
  for (let i = 0; i < n; i += 1) {
    const a = ref[i];
    const b = got[i];
    if (a === undefined || b === undefined || a.stage !== b.stage || a.seed !== b.seed) {
      const c = a ?? b;
      return { stage: c.stage, seed: c.seed, field: 'missing', reference: a === undefined ? null : `${a.stage}@${String(a.seed)}`, got: b === undefined ? null : `${b.stage}@${String(b.seed)}` };
    }
    if (a.model !== b.model) return { stage: a.stage, seed: a.seed, field: 'model', reference: a.model, got: b.model };
    if (a.records !== b.records) return { stage: a.stage, seed: a.seed, field: 'records', reference: a.records, got: b.records };
    if ((a.error ?? null) !== (b.error ?? null)) return { stage: a.stage, seed: a.seed, field: 'error', reference: a.error ?? null, got: b.error ?? null };
  }
  return null;
}

/** The report's order of runs: legs in CROSSHOST_LEGS order, workers off before on. */
export function crossHostRunOrder(a: { leg: CrossHostLegId; workers: CrossHostWorkers }, b: { leg: CrossHostLegId; workers: CrossHostWorkers }): number {
  return CROSSHOST_LEGS.indexOf(a.leg) - CROSSHOST_LEGS.indexOf(b.leg) || CROSSHOST_WORKERS.indexOf(a.workers) - CROSSHOST_WORKERS.indexOf(b.workers);
}

/** The comparison over a fixture's runs: each ran run's agreement and first difference, the verdict. */
export function compareCrossHostRuns(
  head: { fixture: string; source: string; seeds: readonly number[]; stages: readonly string[]; timing: boolean },
  runs: readonly CrossHostRun[],
): CrossHostReport {
  const ordered = [...runs].sort(crossHostRunOrder);
  const ran = ordered.filter((r) => r.status === 'ran');
  const ref = ran.find((r) => r.leg === CROSSHOST_REFERENCE.leg && r.workers === CROSSHOST_REFERENCE.workers) ?? ran[0];
  const differences: CrossHostReport['differences'] = [];
  const out: CrossHostRun[] = ordered.map((r) => {
    if (r.status !== 'ran' || ref === undefined || r === ref) return r;
    const d = crossHostFirstDifference(ref.cells ?? [], r.cells ?? []);
    if (d === null) return { ...r, agrees: true };
    differences.push({ leg: r.leg, workers: r.workers, difference: d });
    return { ...r, agrees: false, firstDifference: d };
  });
  const failed = ordered.some((r) => r.status === 'failed');
  const blocked = ordered.some((r) => r.status === 'blocked');
  const verdict: CrossHostReport['verdict'] = failed || differences.length > 0 ? 'fail' : blocked || ran.length === 0 ? 'incomplete' : 'pass';
  return {
    schema: 1,
    fixture: head.fixture,
    source: head.source,
    seeds: [...head.seeds],
    stages: [...head.stages],
    timing: head.timing,
    runs: out,
    reference: { ...CROSSHOST_REFERENCE },
    comparedWith: ref === undefined ? null : { leg: ref.leg, workers: ref.workers },
    cellsPerRun: ref?.cells?.length ?? 0,
    verdict,
    differences,
  };
}

/** A difference as one line: "<leg> workers <w>: stage <s> seed <n> — <field> <ref> ≠ <got>". */
export function formatCrossHostDifference(leg: CrossHostLegId, workers: CrossHostWorkers, d: CrossHostDifference): string {
  const seed = d.seed === null ? '(unseeded)' : String(d.seed);
  return `${leg} workers ${workers}: first difference at stage ${d.stage} seed ${seed} — ${d.field} ${String(d.reference)} ≠ ${String(d.got)}`;
}

/** The report's printed lines: one per run, the differences, the verdict. */
export function crossHostReportLines(r: CrossHostReport): string[] {
  const lines: string[] = [];
  lines.push(`crosshost ${r.fixture} (${r.source}): ${String(r.seeds.length)} seeds × ${String(r.stages.length)} stages = ${String(r.cellsPerRun)} cells per run${r.timing ? ', timing on' : ''}`);
  const cmp = r.comparedWith === null ? 'none ran' : `${r.comparedWith.leg} workers ${r.comparedWith.workers}`;
  const refRan = r.comparedWith !== null && r.comparedWith.leg === r.reference.leg && r.comparedWith.workers === r.reference.workers;
  lines.push(`reference ${r.reference.leg} workers ${r.reference.workers}; compared with ${cmp}${refRan ? '' : ' (the reference did not run here)'}`);
  for (const run of r.runs) {
    const head = `  ${run.leg} workers ${run.workers}: ${run.status}`;
    if (run.status !== 'ran') {
      lines.push(`${head} — ${run.reason ?? ''}`);
      continue;
    }
    const host = run.host === undefined ? '' : ` [${run.host.engine.name} ${run.host.engine.version}, ${run.host.arch}, ${run.host.kind}, thread ${String(run.thread)}]`;
    const agree = run.agrees === undefined ? 'the comparison base' : run.agrees ? 'agrees bit for bit' : 'DIFFERS';
    lines.push(`${head}${host} — ${agree}`);
  }
  for (const d of r.differences) lines.push(formatCrossHostDifference(d.leg, d.workers, d.difference));
  lines.push(`verdict: ${r.verdict}`);
  return lines;
}
