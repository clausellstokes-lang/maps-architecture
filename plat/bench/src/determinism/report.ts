// The determinism spike's report and summary (M0-d-09; §16 M0 (d)'s bars; C-0067: the full report to PLAT_BENCH_OUT, the
// numbers-only summary to docs/build/summaries/M0-d-09.json; C-0268 (3), (9)).
//
// `DeterminismSpikeReport` holds, per bar, its counts and its verdict, the first differing seed and stage if any, and the
// authority stamps of its timings (M0-f-01's harness; a CONTENDED stamp is reported, never a result). Everything but
// `timings` is a function of the configuration and the seeds, so a second run of the runner writes the same report byte
// for byte; `timings` holds measurements (empty, `taken: false`, when the run takes none). The verdict:
//   fail        a leg differs or failed; the in-process run differs from the legs; a stream key or lineage hash
//               collides, or two entities share a lineage; the oracle misses a batch; a dilation or op-order run differs;
//               a pair holds a duplicate id or a silent re-bind, or a standing entity does not survive;
//   incomplete  none of those, but a leg asked for cannot run on this machine (the cross-host verdict `incomplete`) —
//               never a pass (C-0228 (5));
//   pass        every bar holds on every leg asked for.
import type { CrossHostReport } from '@plat/testkit';
import { MATCH_KINDS } from './entities.js';
import type { DeterminismConfig, SizeName } from './runner.js';
import type { SeedResult, StampedTiming } from './task.js';
import { DILATION } from './task.js';
import { crossHostFirstDifference, type CrossHostCell } from '@plat/testkit';

/** A first difference as the report names it: the seed, the stage and the check that found it. */
export interface FirstDifference {
  readonly seed: number | null;
  readonly stage: string;
  readonly check: string;
}

/** One kind's counts summed over the pairs. */
export interface KindTotals {
  readonly kind: string;
  readonly old: number;
  readonly fresh: number;
  readonly survive: number;
  readonly succeed: number;
  readonly tombstone: number;
  readonly freshOutcome: number;
  readonly unanchored: number;
  /** Where the kind's lineage came from in the pairs' old runs (the kinds' sources joined). */
  readonly lineage: string;
}

/** The runner's report (see the module comment). */
export interface DeterminismSpikeReport {
  readonly schema: 1;
  readonly item: 'M0-d-09';
  readonly fixture: { readonly id: string; readonly entry: string; readonly size: SizeName; readonly stages: readonly string[]; readonly seeds: readonly number[] };
  readonly crosshost: {
    readonly verdict: CrossHostReport['verdict'];
    readonly reference: string;
    readonly comparedWith: string | null;
    readonly cellsPerRun: number;
    readonly runs: readonly { readonly run: string; readonly status: string; readonly reason?: string; readonly engine?: string; readonly agrees?: boolean; readonly firstDifference?: string }[];
    readonly differences: number;
  };
  readonly inProcess: { readonly seeds: number; readonly comparedWith: string | null; readonly agrees: boolean | null; readonly firstDifference: FirstDifference | null };
  readonly distinctness: {
    readonly seeds: number;
    readonly streams: { readonly distinct: number; readonly reused: number; readonly collisions: number };
    readonly lineages: { readonly distinct: number; readonly reused: number; readonly collisions: number };
    readonly firstCollision: string | null;
    readonly entityLineages: { readonly entities: number; readonly duplicates: number; readonly first: string | null };
    readonly pass: boolean;
  };
  readonly oracle: { readonly seeds: number; readonly batches: number; readonly mismatches: number; readonly endFailures: number; readonly first: { readonly seed: number; readonly spike: string; readonly stage: string; readonly batch: number } | null; readonly pass: boolean };
  readonly dilation: { readonly seeds: number; readonly factors: readonly number[]; readonly runs: number; readonly differing: number; readonly reads: number; readonly first: FirstDifference | null; readonly pass: boolean };
  readonly opOrder: { readonly seeds: number; readonly runs: number; readonly differing: number; readonly permutedBatches: number; readonly first: FirstDifference | null; readonly pass: boolean };
  readonly matching: {
    readonly pairs: number;
    readonly rerolls: Readonly<Record<string, number>>;
    readonly perKind: readonly KindTotals[];
    readonly totals: { readonly survive: number; readonly succeed: number; readonly tombstone: number; readonly fresh: number };
    readonly duplicateIds: number;
    /** Fresh entities the mint suffixed `~k` (informative; C-0274). */
    readonly suffixed: number;
    readonly silentRebinds: number;
    readonly reportedRefs: number;
    readonly carry: number;
    readonly standing: { readonly entities: number; readonly rootsDiffering: number; readonly recordsDiffering: number; readonly missing: number; readonly editedLater: number; readonly firstMissing: string | null };
    readonly perPair: readonly { readonly seed: number; readonly spike: string; readonly survive: number; readonly succeed: number; readonly tombstone: number; readonly fresh: number; readonly duplicateIds: number; readonly suffixed: number; readonly silentRebinds: number }[];
    readonly pass: boolean;
  };
  readonly bugs: { readonly runs: number; readonly refused: number; readonly list: readonly string[] };
  readonly firstDifference: FirstDifference | null;
  readonly failures: readonly string[];
  readonly verdict: 'pass' | 'fail' | 'incomplete';
  readonly timings: { readonly taken: boolean; readonly stamps: readonly StampedTiming[]; readonly contended: number; readonly authoritative: number };
}

const runName = (r: { leg: string; workers: string }): string => `${r.leg}/${r.workers}`;

/** The first of several differences: the lowest seed, then the order the checks are listed in. */
export function firstOf(xs: readonly (FirstDifference | null)[]): FirstDifference | null {
  let best: FirstDifference | null = null;
  for (const x of xs) {
    if (x === null) continue;
    if (best === null || (x.seed ?? -1) < (best.seed ?? -1)) best = x;
  }
  return best;
}

/** The in-process cells against the legs' (the run compared with, the seeds the tasks ran). */
function inProcessAgainst(crosshost: CrossHostReport, seeds: readonly SeedResult[]): DeterminismSpikeReport['inProcess'] {
  const ref = crosshost.comparedWith === null ? undefined : crosshost.runs.find((r) => r.leg === crosshost.comparedWith?.leg && r.workers === crosshost.comparedWith?.workers);
  if (ref === undefined || ref.cells === undefined || seeds.length === 0) return { seeds: seeds.length, comparedWith: null, agrees: null, firstDifference: null };
  const want: CrossHostCell[] = [];
  const got: CrossHostCell[] = [];
  for (const s of seeds) {
    want.push(...ref.cells.filter((c) => c.seed === s.seed));
    got.push(...s.cells);
  }
  const d = crossHostFirstDifference(want, got);
  return { seeds: seeds.length, comparedWith: runName(ref), agrees: d === null, firstDifference: d === null ? null : { seed: d.seed, stage: d.stage, check: `in-process vs ${runName(ref)} (${d.field})` } };
}

/** Builds the report from the cross-host report and the seeds' results (in seed order). */
export function buildReport(cfg: DeterminismConfig, crosshost: CrossHostReport, seeds: readonly SeedResult[]): DeterminismSpikeReport {
  const failures: string[] = [];
  // Cross-host.
  const xruns = crosshost.runs.map((r) => ({
    run: runName(r),
    status: r.status,
    ...(r.reason === undefined ? {} : { reason: r.reason }),
    ...(r.host === undefined ? {} : { engine: `${r.host.engine.name} ${r.host.engine.version} ${r.host.arch} (${r.host.kind})` }),
    ...(r.agrees === undefined ? {} : { agrees: r.agrees }),
    ...(r.firstDifference === undefined ? {} : { firstDifference: `${r.firstDifference.stage} at seed ${String(r.firstDifference.seed)} (${r.firstDifference.field})` }),
  }));
  if (crosshost.verdict === 'fail') failures.push(`cross-host: ${String(crosshost.differences.length)} run(s) differ, ${String(crosshost.runs.filter((r) => r.status === 'failed').length)} failed`);
  const xfirst = firstOf(crosshost.differences.map((d) => ({ seed: d.difference.seed, stage: d.difference.stage, check: `cross-host ${d.leg}/${d.workers} (${d.difference.field})` })));
  const failedRun = crosshost.runs.find((r) => r.status === 'failed');

  const inProcess = inProcessAgainst(crosshost, seeds);
  if (inProcess.agrees === false) failures.push(`in-process: differs from ${String(inProcess.comparedWith)}`);

  // Distinctness. (A bar the configuration did not ask for — no in-process seed, `--checks 0`, `--pairs 0` — passes
  // vacuously and says so: its counts are 0 and `asked` in the summary is false.)
  const asked = Math.max(cfg.pairs, cfg.checks);
  const sum = (f: (s: SeedResult) => number): number => seeds.reduce((n, s) => n + f(s), 0);
  const firstCol = seeds.map((s) => s.census.streams.firstCollision ?? s.census.lineages.firstCollision).find((c) => c !== null && c !== undefined) ?? null;
  const entityDups = sum((s) => s.entityLineages.duplicates);
  const distinctness = {
    seeds: seeds.length,
    streams: { distinct: sum((s) => s.census.streams.distinct), reused: sum((s) => s.census.streams.reused), collisions: sum((s) => s.census.streams.collisions) },
    lineages: { distinct: sum((s) => s.census.lineages.distinct), reused: sum((s) => s.census.lineages.reused), collisions: sum((s) => s.census.lineages.collisions) },
    firstCollision: firstCol === null ? null : `hash ${firstCol.hash}: ${firstCol.first} vs ${firstCol.second}`,
    entityLineages: { entities: sum((s) => s.entityLineages.entities), duplicates: entityDups, first: seeds.map((s) => s.entityLineages.first).find((x) => x !== null) ?? null },
    pass: false,
  };
  distinctness.pass = (seeds.length === 0 && asked === 0) || (seeds.length > 0 && distinctness.streams.collisions === 0 && distinctness.lineages.collisions === 0 && entityDups === 0 && distinctness.streams.distinct > 0 && distinctness.lineages.distinct > 0);
  if (!distinctness.pass) failures.push(`distinctness: ${String(distinctness.streams.collisions)} stream-key and ${String(distinctness.lineages.collisions)} lineage collisions, ${String(entityDups)} shared entity lineages${seeds.length === 0 ? ', no seed censused' : ''}`);

  // Oracle.
  const ofirst = seeds.find((s) => s.oracle.first !== null);
  const oracle = {
    seeds: seeds.length,
    batches: sum((s) => s.oracle.batches),
    mismatches: sum((s) => s.oracle.mismatches),
    endFailures: sum((s) => s.oracle.endFailures),
    first: ofirst === undefined || ofirst.oracle.first === null ? null : { seed: ofirst.seed, spike: ofirst.oracle.first.spike, stage: ofirst.oracle.first.stage, batch: ofirst.oracle.first.batch },
    pass: false,
  };
  oracle.pass = (seeds.length === 0 && asked === 0) || (seeds.length > 0 && oracle.mismatches === 0 && oracle.endFailures === 0 && oracle.batches > 0);
  if (!oracle.pass) failures.push(`oracle: ${String(oracle.mismatches)} of ${String(oracle.batches)} batches missed, ${String(oracle.endFailures)} end check(s) failed`);

  // Dilation and op order.
  const checked = seeds.filter((s) => s.checks !== null);
  const dil = checked.flatMap((s) => (s.checks ?? []).filter((c) => c.what.startsWith('dilation')).map((c) => ({ s, c })));
  const ops = checked.flatMap((s) => (s.checks ?? []).filter((c) => c.what.startsWith('op order')).map((c) => ({ s, c })));
  const dfirst = firstOf(dil.filter((x) => x.c.first !== null).map((x) => ({ seed: x.s.seed, stage: (x.c.first as { stage: string }).stage, check: x.c.what })));
  const ofirstOp = firstOf(ops.filter((x) => x.c.first !== null).map((x) => ({ seed: x.s.seed, stage: (x.c.first as { stage: string }).stage, check: x.c.what })));
  const dilation = { seeds: checked.length, factors: [...DILATION], runs: dil.length, differing: dil.filter((x) => !x.c.identical).length, reads: dil.reduce((n, x) => n + x.c.count, 0), first: dfirst, pass: cfg.checks === 0 || (dil.length > 0 && dil.every((x) => x.c.identical)) };
  const opOrder = { seeds: checked.length, runs: ops.length, differing: ops.filter((x) => !x.c.identical).length, permutedBatches: ops.reduce((n, x) => n + x.c.count, 0), first: ofirstOp, pass: cfg.checks === 0 || (ops.length > 0 && ops.every((x) => x.c.identical)) };
  if (!dilation.pass) failures.push(`dilation: ${String(dilation.differing)} of ${String(dilation.runs)} runs differ`);
  if (!opOrder.pass) failures.push(`op order: ${String(opOrder.differing)} of ${String(opOrder.runs)} runs differ`);

  // Matching.
  const pairs = seeds.flatMap((s) => s.pairs ?? []);
  const perKind: KindTotals[] = MATCH_KINDS.map((kind) => {
    const rows = pairs.map((p) => p.perKind.find((k) => k.kind === kind)).filter((x): x is NonNullable<typeof x> => x !== undefined);
    const sources = [...new Set(rows.map((r) => r.lineage).filter((l) => l !== 'none'))].sort();
    return {
      kind,
      old: rows.reduce((n, r) => n + r.old, 0),
      fresh: rows.reduce((n, r) => n + r.fresh, 0),
      survive: rows.reduce((n, r) => n + r.survive, 0),
      succeed: rows.reduce((n, r) => n + r.succeed, 0),
      tombstone: rows.reduce((n, r) => n + r.tombstone, 0),
      freshOutcome: rows.reduce((n, r) => n + r.freshOutcome, 0),
      unanchored: rows.reduce((n, r) => n + r.unanchored.old + r.unanchored.fresh, 0),
      lineage: sources.length === 0 ? 'none' : sources.length === 1 ? (sources[0] as string) : 'mixed',
    };
  });
  const standing = {
    entities: pairs.reduce((n, p) => n + p.standing.entities, 0),
    rootsDiffering: pairs.filter((p) => !p.standing.rootsEqual).length,
    recordsDiffering: pairs.filter((p) => !p.standing.recordsEqual).length,
    missing: pairs.reduce((n, p) => n + p.standing.missing, 0),
    editedLater: pairs.reduce((n, p) => n + p.standing.editedLater, 0),
    firstMissing: pairs.map((p) => (p.standing.firstMissing === null ? null : `${String(p.seed)}:${p.spike}:${p.standing.firstMissing}`)).find((x) => x !== null) ?? null,
  };
  const matching = {
    pairs: pairs.length,
    rerolls: { S5: 1 },
    perKind,
    totals: { survive: pairs.reduce((n, p) => n + p.totals.survive, 0), succeed: pairs.reduce((n, p) => n + p.totals.succeed, 0), tombstone: pairs.reduce((n, p) => n + p.totals.tombstone, 0), fresh: pairs.reduce((n, p) => n + p.totals.fresh, 0) },
    duplicateIds: pairs.reduce((n, p) => n + p.duplicateIds, 0),
    suffixed: pairs.reduce((n, p) => n + p.suffixed, 0),
    silentRebinds: pairs.reduce((n, p) => n + p.silentRebinds, 0),
    reportedRefs: pairs.reduce((n, p) => n + p.reportedRefs, 0),
    carry: pairs.reduce((n, p) => n + p.carry, 0),
    standing,
    perPair: pairs.map((p) => ({ seed: p.seed, spike: p.spike, survive: p.totals.survive, succeed: p.totals.succeed, tombstone: p.totals.tombstone, fresh: p.totals.fresh, duplicateIds: p.duplicateIds, suffixed: p.suffixed, silentRebinds: p.silentRebinds })),
    pass: false,
  };
  matching.pass = cfg.pairs === 0 || (pairs.length > 0 && matching.duplicateIds === 0 && matching.silentRebinds === 0 && standing.rootsDiffering === 0 && standing.recordsDiffering === 0 && standing.missing === 0);
  if (!matching.pass) failures.push(`matching: ${String(matching.duplicateIds)} duplicate ids, ${String(matching.silentRebinds)} silent re-binds, ${String(standing.missing)} standing entities missing, ${String(standing.rootsDiffering + standing.recordsDiffering)} pair(s) whose standing stages moved${pairs.length === 0 ? ', no pair matched' : ''}`);

  // Refusals (deterministic, so not a determinism failure; reported, C-0264 (13)).
  const bugList = seeds.flatMap((s) => s.bugs.map((b) => `${String(s.seed)}:${b}`));
  const stamps = seeds.flatMap((s) => s.timings).slice().sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));
  const firstDifference = firstOf([xfirst, failedRun === undefined ? null : { seed: null, stage: '(run failed)', check: `cross-host ${runName(failedRun)}: ${failedRun.reason ?? 'failed'}` }, inProcess.firstDifference, dfirst, ofirstOp, oracle.first === null ? null : { seed: oracle.first.seed, stage: `${oracle.first.spike}.${oracle.first.stage}`, check: `oracle (batch ${String(oracle.first.batch)})` }]);
  const verdict: DeterminismSpikeReport['verdict'] = failures.length > 0 ? 'fail' : crosshost.verdict === 'pass' ? 'pass' : 'incomplete';
  return {
    schema: 1,
    item: 'M0-d-09',
    fixture: { id: crosshost.fixture, entry: cfg.entry, size: cfg.size, stages: [...cfg.stages], seeds: [...cfg.seeds] },
    crosshost: { verdict: crosshost.verdict, reference: runName(crosshost.reference), comparedWith: crosshost.comparedWith === null ? null : runName(crosshost.comparedWith), cellsPerRun: crosshost.cellsPerRun, runs: xruns, differences: crosshost.differences.length },
    inProcess,
    distinctness,
    oracle,
    dilation,
    opOrder,
    matching,
    bugs: { runs: seeds.length * 2, refused: bugList.length, list: bugList },
    firstDifference,
    failures,
    verdict,
    timings: { taken: stamps.length > 0, stamps, contended: stamps.filter((t) => t.authority === 'contended').length, authoritative: stamps.filter((t) => t.authority === 'authoritative').length },
  };
}

/** The report's text (what the runner writes and a second run reproduces). */
export function reportText(r: DeterminismSpikeReport): string {
  return `${JSON.stringify(r, null, 2)}\n`;
}

/** The numbers-only summary (C-0067): counts and verdicts, no prose, no host. */
export function summaryOf(r: DeterminismSpikeReport): Record<string, unknown> {
  return {
    item: 'M0-d-09',
    size: r.fixture.size,
    seeds: r.fixture.seeds.length,
    stages: r.fixture.stages.length,
    verdict: r.verdict,
    crosshost: {
      verdict: r.crosshost.verdict,
      cellsPerRun: r.crosshost.cellsPerRun,
      ran: r.crosshost.runs.filter((x) => x.status === 'ran').length,
      blocked: r.crosshost.runs.filter((x) => x.status === 'blocked').length,
      failed: r.crosshost.runs.filter((x) => x.status === 'failed').length,
      runs: r.crosshost.runs.map((x) => ({ run: x.run, status: x.status, ...(x.agrees === undefined ? {} : { agrees: x.agrees }) })),
      differences: r.crosshost.differences,
    },
    inProcess: { seeds: r.inProcess.seeds, agrees: r.inProcess.agrees },
    distinctness: { seeds: r.distinctness.seeds, streams: r.distinctness.streams, lineages: r.distinctness.lineages, entityLineages: { entities: r.distinctness.entityLineages.entities, duplicates: r.distinctness.entityLineages.duplicates }, pass: r.distinctness.pass },
    oracle: { seeds: r.oracle.seeds, batches: r.oracle.batches, mismatches: r.oracle.mismatches, endFailures: r.oracle.endFailures, pass: r.oracle.pass },
    asked: { inProcessSeeds: r.inProcess.seeds, checkSeeds: r.dilation.seeds, pairs: r.matching.pairs },
    dilation: { seeds: r.dilation.seeds, runs: r.dilation.runs, differing: r.dilation.differing, reads: r.dilation.reads, pass: r.dilation.pass },
    opOrder: { seeds: r.opOrder.seeds, runs: r.opOrder.runs, differing: r.opOrder.differing, permutedBatches: r.opOrder.permutedBatches, pass: r.opOrder.pass },
    matching: {
      pairs: r.matching.pairs,
      perKind: r.matching.perKind.map((k) => ({ kind: k.kind, old: k.old, fresh: k.fresh, survive: k.survive, succeed: k.succeed, tombstone: k.tombstone, fresh_: k.freshOutcome, unanchored: k.unanchored })),
      totals: r.matching.totals,
      duplicateIds: r.matching.duplicateIds,
      suffixed: r.matching.suffixed,
      silentRebinds: r.matching.silentRebinds,
      standing: { entities: r.matching.standing.entities, missing: r.matching.standing.missing, editedLater: r.matching.standing.editedLater },
      pass: r.matching.pass,
    },
    refused: r.bugs.refused,
    firstDifference: r.firstDifference === null ? null : { seed: r.firstDifference.seed, stage: r.firstDifference.stage },
    timings: { stamps: r.timings.stamps.length, contended: r.timings.contended, authoritative: r.timings.authoritative },
  };
}

/** A few lines for the terminal. */
export function reportLines(r: DeterminismSpikeReport): string[] {
  const lines = [
    `determinism ${r.fixture.id}: ${String(r.fixture.seeds.length)} seeds (${r.fixture.size}), ${String(r.fixture.stages.length)} stages; verdict ${r.verdict}`,
    `cross-host ${r.crosshost.verdict}: ${r.crosshost.runs.map((x) => `${x.run} ${x.status}${x.agrees === false ? ' DIFFERS' : ''}`).join(', ')}`,
    `in-process (${String(r.inProcess.seeds)} seeds) vs ${String(r.inProcess.comparedWith)}: ${r.inProcess.agrees === null ? 'not compared' : r.inProcess.agrees ? 'agrees' : 'DIFFERS'}`,
    `distinctness: ${String(r.distinctness.streams.distinct)} stream keys, ${String(r.distinctness.lineages.distinct)} lineage hashes, collisions ${String(r.distinctness.streams.collisions)} / ${String(r.distinctness.lineages.collisions)}, entity lineages shared ${String(r.distinctness.entityLineages.duplicates)}`,
    `oracle: ${String(r.oracle.batches)} batches, ${String(r.oracle.mismatches)} mismatches; dilation ${String(r.dilation.runs)} runs, ${String(r.dilation.differing)} differ (${String(r.dilation.reads)} clock reads); op order ${String(r.opOrder.runs)} runs, ${String(r.opOrder.differing)} differ (${String(r.opOrder.permutedBatches)} batches permuted)`,
    `matching: ${String(r.matching.pairs)} pairs, survive ${String(r.matching.totals.survive)} succeed ${String(r.matching.totals.succeed)} tombstone ${String(r.matching.totals.tombstone)} fresh ${String(r.matching.totals.fresh)}; duplicate ids ${String(r.matching.duplicateIds)} (after the mint; ${String(r.matching.suffixed)} suffixed ~k), silent re-binds ${String(r.matching.silentRebinds)}`,
    `refused stages: ${String(r.bugs.refused)}; timings: ${String(r.timings.stamps.length)} stamped (${String(r.timings.contended)} contended — reported, never a result)`,
  ];
  if (r.firstDifference !== null) lines.push(`first difference: seed ${String(r.firstDifference.seed)}, stage ${r.firstDifference.stage} (${r.firstDifference.check})`);
  for (const f of r.failures) lines.push(`FAIL ${f}`);
  return lines;
}
