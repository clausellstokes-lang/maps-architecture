// M0-f-02b's test support: FIXTURE trees shaped like plat/ (C-0105: the tests never run a real tier and never assert a
// status derived over the real tree — N-01, checks/M0-spec-notes.md), an executor that plants each unit's figures
// instead of spawning anything, and the real job lists' units read (never run).
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import type { Executor, Job, Unit, UnitRun } from '../../src/tiers/types.js';

export const RUN_INDEX = 'export function run(): number {\n  return 0;\n}\n';

const made: string[] = [];

/** A temporary folder holding `files` (path relative to it → content). */
export function tree(files: Record<string, string> = {}): string {
  const root = mkdtempSync(join(tmpdir(), 'plat-tier-jobs-'));
  made.push(root);
  for (const [p, text] of Object.entries(files)) write(root, p, text);
  return root;
}

export function write(root: string, path: string, text: string): void {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
}

export function removeTrees(): void {
  for (const r of made.splice(0)) rmSync(r, { recursive: true, force: true });
}

export const sha = (text: string): string => createHash('sha256').update(text).digest('hex');

/**
 * A fixture tree in which every job's source is BUILT (a harness folder whose index exports `run`, a vitest folder
 * holding a test file, a command's script) and every declared suite holds something — but no M-1 file exists.
 */
export function builtTree(jobs: readonly Job[], extra: Record<string, string> = {}): string {
  const files: Record<string, string> = {};
  for (const j of jobs) {
    if (j.stagedTo !== undefined) continue;
    if (j.kind === 'harness') files[`${j.source}index.ts`] = RUN_INDEX;
    else if (j.kind === 'vitest') files[`${j.source}a.test.ts`] = '// a fixture test file\n';
    else files[j.source] = '// a fixture script\n';
    for (const s of j.suites ?? []) files[s.path.endsWith('/') ? `${s.path}x.txt` : s.path] = s.path.endsWith('.json') ? '{"x":1}\n' : 'x\n';
  }
  return tree({ ...files, ...extra });
}

/** An executor planting every unit's run (exit 0, 1 000 ms wall, 2 000 ms CPU unless planted); it logs every call. */
export function plantedExec(calls: Unit[] = [], codes: Record<string, number> = {}): Executor {
  let pid = 910_000;
  return (unit, ctx): Promise<UnitRun> => {
    calls.push(unit);
    ctx.onSpawn?.(pid++);
    return Promise.resolve({ code: codes[unit.name] ?? 0, wallMs: 1_000, cpuMs: 2_000 });
  };
}

/** The harness probe a fixture tree answers: an index exports `run` exactly when it is RUN_INDEX's text. */
export const probe = (): Promise<boolean> => Promise.resolve(true);

/** A job's units at its declared size (read, never run). */
export const unitsAt = async (j: Job, size: number | null = j.size?.n ?? null): Promise<Unit[]> => j.units(size);

/** A unit's harness command's own arguments: after `corepack pnpm bench -- <name>` or the tier command's `harness <name>`. */
export function harnessArgs(u: Unit, name: string): string[] {
  const a = u.argv;
  const bench = a.indexOf('bench');
  if (a[0] === 'corepack' && a[1] === 'pnpm' && bench === 2 && a[3] === '--' && a[4] === name) return a.slice(5);
  const h = a.indexOf('harness');
  if (h >= 0 && a[h + 1] === name) return a.slice(h + 2);
  throw new Error(`unit ${u.name}: not a run of harness ${name}: ${JSON.stringify(a)}`);
}
