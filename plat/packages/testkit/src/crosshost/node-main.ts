// The Node legs' bootstrap (M0-d-06): bundled with a stage table into one plain JavaScript file that the runner starts as
// a child process on the leg's Node — `node` on arm64, `arch -x86_64 node` (the universal binary's x86-64 slice under
// Rosetta 2, C-0028) or a native x86-64 Node — so the leg needs no TypeScript loader (tsx's esbuild binary is
// arm64-only on the reference Mac, C-0138). The protocol: the job arrives as JSON on stdin ({ job, workers }); the
// answer leaves as one JSON line on stdout ({ host, result }) or ({ error }) with exit 1. With workers on, the same
// bundle file is started as one worker_thread, which runs the job and posts the result back.
import { execFileSync } from 'node:child_process';
import { cpus, release, totalmem } from 'node:os';
import { isMainThread, parentPort, Worker, workerData } from 'node:worker_threads';
import { runCrossHostJob, type CrossHostStageTable } from './leg.js';
import type { CrossHostJob, CrossHostKind, CrossHostLegHost, CrossHostLegResult, CrossHostWorkers } from './types.js';

/** The message a Node leg reads on stdin. */
export interface CrossHostNodeRequest {
  readonly job: CrossHostJob;
  readonly workers: CrossHostWorkers;
}

/** The host kind of this process: arm64 native; x64 translated by Rosetta 2 (sysctl.proc_translated = 1); x64 native. */
export function crossHostNodeKind(arch: string = process.arch, platform: string = process.platform): CrossHostKind {
  if (arch === 'arm64') return 'native-arm64';
  if (arch !== 'x64') throw new Error(`crosshost: unsupported architecture ${JSON.stringify(arch)} (§12.1 names arm64 and x86-64 hosts)`);
  if (platform !== 'darwin') return 'native-x64';
  try {
    const t = execFileSync('/usr/sbin/sysctl', ['-n', 'sysctl.proc_translated'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return t === '1' ? 'rosetta' : 'native-x64';
  } catch {
    return 'native-x64';
  }
}

/** §12.1's host record of this Node process. */
export function crossHostNodeHost(): CrossHostLegHost {
  const list = cpus();
  return {
    cpu: list[0]?.model ?? 'unknown',
    cores: list.length,
    memoryBytes: totalmem(),
    os: `${process.platform} ${release()}`,
    engine: { name: 'node', version: process.version, v8: process.versions.v8 },
    arch: process.arch,
    kind: crossHostNodeKind(),
  };
}

const clock = (): number => performance.now();

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    const parts: Buffer[] = [];
    process.stdin.on('data', (b: Buffer) => parts.push(b));
    process.stdin.on('end', () => resolve(Buffer.concat(parts).toString('utf8')));
    process.stdin.on('error', reject);
  });
}

function runInWorker(job: CrossHostJob, file: URL): Promise<CrossHostLegResult> {
  return new Promise((resolve, reject) => {
    const w = new Worker(file, { workerData: job });
    let got: CrossHostLegResult | null = null;
    w.once('message', (m: { result?: CrossHostLegResult; error?: string }) => {
      if (m.error !== undefined) reject(new Error(`the worker failed: ${m.error}`));
      else if (m.result !== undefined) got = m.result;
    });
    w.once('error', reject);
    w.once('exit', (code) => {
      if (got !== null) resolve(got);
      else reject(new Error(`the worker exited ${String(code)} without a result`));
    });
  });
}

/**
 * The bundle's entry: in a worker, runs the job it was started with and posts the result; on the main thread, reads the
 * request, runs it here (workers off) or in a worker started from this same file (workers on), and prints the answer.
 */
export async function crossHostNodeMain(table: CrossHostStageTable, self: URL): Promise<void> {
  if (!isMainThread) {
    try {
      parentPort?.postMessage({ result: runCrossHostJob(table, workerData as CrossHostJob, 'worker', clock) });
    } catch (e) {
      parentPort?.postMessage({ error: e instanceof Error ? `${e.name}: ${e.message}` : String(e) });
    }
    return;
  }
  try {
    const req = JSON.parse(await readStdin()) as CrossHostNodeRequest;
    const result = req.workers === 'on' ? await runInWorker(req.job, self) : runCrossHostJob(table, req.job, 'main', clock);
    process.stdout.write(`${JSON.stringify({ host: crossHostNodeHost(), result })}\n`);
  } catch (e) {
    process.stdout.write(`${JSON.stringify({ error: e instanceof Error ? `${e.name}: ${e.message}` : String(e) })}\n`);
    process.exitCode = 1;
  }
}
