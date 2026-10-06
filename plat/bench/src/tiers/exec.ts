// The tier runner's executor: runs one unit from plat/ and measures it — the wall-clock from spawn to exit and the CPU
// time of the unit's processes. Node gives a parent no child's resource usage, so the unit runs under `/bin/sh`, whose
// `times` builtin prints the user and system time of the shell's waited-for children (and theirs, recursively) on its
// second line; that line is written to an extra pipe (fd 3), so the unit's own output is never parsed. The same
// builtin exists on macOS's /bin/sh and Linux's (C-0241 (6)).
// The tier-size variables are cleared from the inherited environment, so a job always runs at its tier's size —
// never at a PLAT_FUZZ_RUNS a shell left set — and the unit's own `env` is applied after (C-0241 (5)).
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import type { Executor, Unit, UnitRun } from './types.js';

/** Variables a unit never inherits: the tier sizes and the dispatcher's test-only fixture root (C-0057, C-0095, C-0100). */
export const CLEARED_ENV = ['PLAT_FUZZ_RUNS', 'PLAT_FUZZ_SEED', 'PLAT_EDGE_SEEDS', 'PLAT_BENCH_FIXTURE_ROOT'] as const;

/** The output tail an executor keeps per unit (bytes). */
export const OUTPUT_TAIL_BYTES = 64 * 1024;

/** The unit's environment: the inherited one less CLEARED_ENV, plus PLAT_BENCH_OUT, plus the unit's own. */
export function unitEnv(unit: Unit, out: string, base: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...base };
  for (const k of CLEARED_ENV) delete env[k];
  env['PLAT_BENCH_OUT'] = join(out, 'jobs');
  return { ...env, ...(unit.env ?? {}) };
}

/** Parses the second line of `times` (the children's user and system time) into ms; null when it is not there. */
export function parseTimes(text: string): number | null {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return null;
  const m = /(\d+)m([\d.]+)s\s+(\d+)m([\d.]+)s/.exec(lines[1]);
  if (m === null) return null;
  return (Number(m[1]) * 60 + Number(m[2]) + Number(m[3]) * 60 + Number(m[4])) * 1000;
}

const SCRIPT = '"$@"; s=$?; times >&3; exit $s';

/** The default executor: spawns the unit under /bin/sh with plat/ as its working folder. */
export const spawnExecutor: Executor = (unit, ctx) =>
  new Promise<UnitRun>((resolve, reject) => {
    if (unit.argv.length === 0) {
      reject(new Error(`unit ${unit.name}: an empty command line`));
      return;
    }
    const t0 = process.hrtime.bigint();
    const child = spawn('/bin/sh', ['-c', SCRIPT, 'sh', ...unit.argv], {
      cwd: ctx.root,
      env: unitEnv(unit, ctx.out),
      stdio: ['ignore', 'pipe', 'pipe', 'pipe'],
    });
    if (child.pid !== undefined) ctx.onSpawn?.(child.pid);
    let tail = Buffer.alloc(0);
    const keep = (chunk: Buffer): void => {
      tail = Buffer.concat([tail, chunk]);
      if (tail.length > OUTPUT_TAIL_BYTES) tail = tail.subarray(tail.length - OUTPUT_TAIL_BYTES);
    };
    child.stdout?.on('data', keep);
    child.stderr?.on('data', keep);
    let times = '';
    const fd3 = child.stdio[3];
    if (fd3 !== null && fd3 !== undefined && 'on' in fd3) fd3.on('data', (c: Buffer) => (times += c.toString('utf8')));
    child.on('error', reject);
    child.on('close', (code, signal) => {
      const wallMs = Number(process.hrtime.bigint() - t0) / 1e6;
      const cpu = parseTimes(times);
      resolve({
        code: code ?? (signal !== null ? 128 : 1),
        wallMs,
        // a shell killed before `times` ran leaves no reading: the CPU is then unknown, recorded as 0 with the signal
        cpuMs: cpu ?? 0,
        output: tail.toString('utf8'),
        signal,
      });
    });
  });
