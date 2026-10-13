// bench/src/skeleton — the skeleton corpus runner (M0-a-12; §3.8 *Confirmation at M0*, C-0015, C-0067, C-0172).
//
// `corepack pnpm bench -- skeleton [--use roof|spine|both] [--timing [--rounds N] [--idle-ms N] [--every-ms N]]` loads the
// committed synthetic footprints (bench/fixtures/skeleton-corpus/, every file opened logged), runs the skeleton over them
// for each use (both by default), judges the corpus bar (downgrades ≤ 0.5 %, work-limit hits ≤ 0.1 %, no failure), writes
// the full report to $PLAT_BENCH_OUT/skeleton-corpus.json and the numbers-only summary to
// docs/build/summaries/M0-a-12.json, and exits 0 when the bar holds for every use run, 1 when it does not. `--timing`
// adds §3.8's per-footprint median through M0-f-01's harness (stamped; CONTENDED and never judged outside the timing
// phase). `--generate` rewrites the fixture from its seed (the committed file is that output byte for byte).
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import type { SkeletonUse } from '@plat/kernel';
import { judge, type TimingResult } from '../timing/harness.js';
import { outDir, say, writeJson } from '../timing/output.js';
import { CORPUS_COUNT, CORPUS_SEED, encodeCorpus, generateCorpus } from './corpus.js';
import { CORPUS_BAR, CORPUS_DIR, loadCorpus, PLAT_ROOT, SKELETON_TIMING_ROW, skeletonCorpus, SUMMARY_PATH, timeCorpus, type CorpusReport, type OpenLog } from './runner.js';

export { CORPUS_COUNT, CORPUS_SCHEMA, CORPUS_SEED, FAMILIES, decodeCorpus, encodeCorpus, generateCorpus, selfMeets } from './corpus.js';
export type { CorpusFace, CorpusFile, Family } from './corpus.js';
export { CORPUS_BAR, CORPUS_DIR, PLAT_ROOT, SKELETON_TIMING_ROW, SUMMARY_PATH, facesOf, loadCorpus, skeletonCorpus, timeCorpus } from './runner.js';
export type { CorpusReport, LoadedCorpus, OpenLog, SkeletonService } from './runner.js';

/** The fixture file the generator writes. */
export const CORPUS_FILE = 'footprints.json';

const USAGE = 'usage: corepack pnpm bench -- skeleton [--use roof|spine|both] [--timing [--rounds N] [--idle-ms N] [--every-ms N]] | --generate';

/** The dispatcher's context, with the paths a test may redirect (the summary, the fixture folder). */
export interface SkeletonContext {
  out: string;
  summary?: string;
  corpusDir?: string;
}

function intArg(args: readonly string[], name: string, lo: number, hi: number): number | undefined | null {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const v = Number(args[i + 1]);
  return Number.isInteger(v) && v >= lo && v <= hi ? v : null;
}

/** One use's numbers for the summary. */
function useSummary(r: CorpusReport): Record<string, unknown> {
  return {
    faces: r.faces,
    skeletons: r.skeletons,
    downgrades: r.downgrades,
    workLimitHits: r.workLimitHits,
    failures: r.failures,
    downgradeShare: r.shares.downgrades,
    workLimitShare: r.shares.workLimitHits,
    contract: r.causes.contract,
    validator: r.causes.validator,
    events: r.events,
    byFamily: r.byFamily.map((f) => [f.faces, f.downgrades]),
    ...(r.use === 'spine' ? { axes: r.axes } : {}),
    pass: r.bar.pass,
  };
}

/** The dispatcher's entry: `bench -- skeleton …` (C-0059). */
export async function run(args: string[], ctx: SkeletonContext): Promise<number> {
  const known = new Set(['--use', '--timing', '--rounds', '--idle-ms', '--every-ms', '--generate']);
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (!known.has(a)) {
      say(`skeleton: unknown argument ${JSON.stringify(a)}; ${USAGE}`);
      return 64;
    }
    if (a === '--use' || a === '--rounds' || a === '--idle-ms' || a === '--every-ms') i += 1;
  }
  const corpusDir = ctx.corpusDir ?? CORPUS_DIR;
  if (args.includes('--generate')) {
    if (args.length !== 1) {
      say(`skeleton: --generate takes no other argument; ${USAGE}`);
      return 64;
    }
    const text = encodeCorpus(generateCorpus(CORPUS_SEED, CORPUS_COUNT));
    mkdirSync(corpusDir, { recursive: true });
    const file = join(corpusDir, CORPUS_FILE);
    writeFileSync(file, text);
    say(`skeleton: wrote ${CORPUS_COUNT} footprints (seed ${CORPUS_SEED}) to ${relative(PLAT_ROOT, file)}; sha256 ${createHash('sha256').update(text).digest('hex')}`);
    return 0;
  }
  const useArg = args.includes('--use') ? args[args.indexOf('--use') + 1] : 'both';
  if (useArg !== 'roof' && useArg !== 'spine' && useArg !== 'both') {
    say(`skeleton: --use takes roof, spine or both; ${USAGE}`);
    return 64;
  }
  const timing = args.includes('--timing');
  const rounds = intArg(args, '--rounds', 1, 50);
  const idleMs = intArg(args, '--idle-ms', 0, 600_000);
  const everyMs = intArg(args, '--every-ms', 1, 600_000);
  if (rounds === null || idleMs === null || everyMs === null || (!timing && (rounds !== undefined || idleMs !== undefined || everyMs !== undefined))) {
    say(`skeleton: bad argument; ${USAGE}`);
    return 64;
  }
  const uses: SkeletonUse[] = useArg === 'both' ? ['roof', 'spine'] : [useArg];

  const log: OpenLog = { reads: [] };
  const corpus = loadCorpus(corpusDir, log);
  const reports = uses.map((u) => skeletonCorpus(corpus.faces, u, { families: corpus.families }));
  const timings: { use: SkeletonUse; result: TimingResult }[] = [];
  if (timing) {
    for (const u of uses) {
      const batch = { ...(idleMs === undefined ? {} : { idleMs }), ...(everyMs === undefined ? {} : { sampleEveryMs: everyMs }) };
      timings.push({ use: u, result: await timeCorpus(corpus.faces, u, { ...(rounds === undefined ? {} : { rounds }), batch }) });
    }
  }
  const outside = log.reads.filter((p) => relative(PLAT_ROOT, p).startsWith('..')).length;
  const pass = reports.every((r) => r.bar.pass);

  const summary: Record<string, unknown> = {
    item: 'M0-a-12',
    corpus: { files: corpus.files.length, faces: corpus.faces.length, families: corpus.familyNames.length },
    inputs: { opened: log.reads.length, outsidePlat: outside },
    bar: { downgradesMax: CORPUS_BAR.downgradesMax, workLimitHitsMax: CORPUS_BAR.workLimitHitsMax, pass },
  };
  for (const r of reports) summary[r.use] = useSummary(r);
  if (timings.length > 0) {
    summary['timing'] = Object.fromEntries(
      timings.map(({ use, result }) => [use, { value: result.value, unit: result.unit, authority: result.authority, normalisation: result.normalisation, verdict: judge(result, SKELETON_TIMING_ROW).verdict }]),
    );
  }
  const summaryPath = ctx.summary ?? SUMMARY_PATH;
  mkdirSync(dirname(summaryPath), { recursive: true });
  writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);

  const dir = outDir(ctx.out);
  const full = writeJson(dir, 'skeleton-corpus.json', {
    item: 'M0-a-12',
    corpus: { files: corpus.files, faces: corpus.faces.length, familyNames: corpus.familyNames },
    opened: log.reads.map((p) => relative(PLAT_ROOT, p) || '.'),
    reports,
    timings,
  });
  for (const r of reports) {
    say(
      `skeleton (${r.use}): ${r.faces} faces — ${r.skeletons} validated, ${r.downgrades} downgrades (${(100 * r.shares.downgrades).toFixed(2)} % ≤ ${100 * CORPUS_BAR.downgradesMax} %), ${r.workLimitHits} work-limit hits (${(100 * r.shares.workLimitHits).toFixed(2)} % ≤ ${100 * CORPUS_BAR.workLimitHitsMax} %), ${r.failures} failures — ${r.bar.pass ? 'pass' : 'FAIL'}`,
    );
  }
  for (const { use, result } of timings) {
    say(`skeleton (${use}): ${result.value.toFixed(2)} ${result.unit} median per footprint; ${result.authority}${result.authority === 'contended' ? ' (informative only, never judged)' : ''}`);
  }
  say(`skeleton: inputs opened ${log.reads.length} (outside plat/: ${outside}); summary ${relative(PLAT_ROOT, summaryPath)}; full report ${full.path}`);
  return pass ? 0 : 1;
}
