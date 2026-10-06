// A tier job's status, DERIVED at run time (C-0099, refined by C-0121; C-0069's three statuses), in this order:
//   1. a declared input file absent                      → `after-M-1: <file>`   (pending: never run, never pass or fail)
//   2. inputs present, a reviewer's summary not naming each input's current sha256
//                                                        → `after-M-1: <file> (review pending: <item>, …)`
//   3. a declared entry still staged to its completing item or milestone (`stagedTo`) → `not-built: <stagedTo>`
//   4. the source built — a harness folder whose index.ts exports `run`, a vitest folder holding a test file, a
//      command's script present                          → `built`
//   5. otherwise                                         → `not-built: <item>`
// So a job flips when its item lands, with no manifest edit. A harness index that exists but fails to load is
// `built` with its load error: the job then FAILS naming it, never silently skipped (fail safe, C-0241 (3)).
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, isAbsolute, join, normalize, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { DerivedStatus, Job, Suite } from './types.js';

/** Whether a harness index exports `run` (the dispatcher's own test, C-0059); throws when the module fails to load. */
export type HarnessProbe = (indexPath: string) => Promise<boolean>;

export const importProbe: HarnessProbe = async (indexPath) => {
  const mod = (await import(pathToFileURL(indexPath).href)) as Record<string, unknown>;
  return typeof mod['run'] === 'function';
};

/** A path relative to plat/ that stays inside it (no absolute path, no `..` step). */
export function insideRoot(rel: string): boolean {
  if (rel === '' || isAbsolute(rel)) return false;
  const n = normalize(rel);
  return n !== '..' && !n.startsWith(`..${sep}`) && !n.split(/[\\/]/).includes('..');
}

export function sha256File(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

/** Whether a folder holds a vitest test file (`*.test.ts` or `*.test.mjs`) anywhere below it. */
export function holdsTest(dir: string): boolean {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return false;
  }
  for (const e of entries) {
    if (e.isDirectory() && e.name !== 'node_modules' && holdsTest(join(dir, e.name))) return true;
    if (e.isFile() && /\.test\.(ts|mjs)$/.test(e.name)) return true;
  }
  return false;
}

/**
 * The review condition (C-0121): which reviewers' summaries `docs/build/summaries/<item>.json` do NOT carry
 * `reviewed: { "<input path relative to plat/>": "<sha256 of the file now>" }`. An absent or unreadable summary, a
 * missing entry or another sha256 all leave the review pending.
 */
export function reviewPending(root: string, input: string, reviewers: readonly string[]): string[] {
  const now = sha256File(join(root, input));
  const pending: string[] = [];
  for (const item of reviewers) {
    let ok = false;
    try {
      const summary = JSON.parse(readFileSync(join(root, 'docs', 'build', 'summaries', `${item}.json`), 'utf8')) as unknown;
      const reviewed = typeof summary === 'object' && summary !== null ? (summary as Record<string, unknown>)['reviewed'] : undefined;
      ok = typeof reviewed === 'object' && reviewed !== null && Object.hasOwn(reviewed, input) && (reviewed as Record<string, unknown>)[input] === now;
    } catch {
      ok = false;
    }
    if (!ok) pending.push(item);
  }
  return pending;
}

/** Derives one job's status over the tree at `root` (plat/ or a fixture tree), now. */
export async function deriveStatus(job: Job, root: string, probe: HarnessProbe = importProbe): Promise<DerivedStatus> {
  for (const input of job.inputs) {
    if (!existsSync(join(root, input))) return { status: `after-M-1: ${basename(input)}`, state: 'after-M-1', file: input };
  }
  const reviewers = job.reviewedBy ?? [];
  if (reviewers.length > 0) {
    for (const input of job.inputs) {
      const pending = reviewPending(root, input, reviewers);
      if (pending.length > 0) {
        return { status: `after-M-1: ${basename(input)} (review pending: ${pending.join(', ')})`, state: 'after-M-1', file: input, reviewPending: pending };
      }
    }
  }
  if (job.stagedTo !== undefined) return { status: `not-built: ${job.stagedTo}`, state: 'not-built', waitsFor: job.stagedTo };
  const src = join(root, job.source);
  const notBuilt: DerivedStatus = { status: `not-built: ${job.item}`, state: 'not-built', waitsFor: job.item };
  if (job.kind === 'harness') {
    const index = join(src, 'index.ts');
    if (!existsSync(index)) return notBuilt;
    try {
      return (await probe(index)) ? { status: 'built', state: 'built' } : notBuilt;
    } catch (e) {
      return { status: 'built', state: 'built', loadError: e instanceof Error ? e.message : String(e) };
    }
  }
  if (job.kind === 'vitest') return holdsTest(src) ? { status: 'built', state: 'built' } : notBuilt;
  return existsSync(src) && statSync(src).isFile() ? { status: 'built', state: 'built' } : notBuilt;
}

/** Whether a folder holds at least one file anywhere below it. */
function holdsFile(dir: string): boolean {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isFile()) return true;
    if (e.isDirectory() && holdsFile(join(dir, e.name))) return true;
  }
  return false;
}

/**
 * §13.8's edge for a BUILT job: a suite whose seed family, fixture set or baseline file is empty or missing fails
 * naming it. Empty: a folder with no file below it, a file of 0 bytes, or a JSON file holding an empty array or object
 * (or only whitespace). Returns the reason, or null when the suite holds something.
 */
export function suiteProblem(root: string, suite: Suite): string | null {
  const path = join(root, suite.path);
  if (!existsSync(path)) return `${suite.kind} ${suite.path} missing`;
  const st = statSync(path);
  if (st.isDirectory()) return holdsFile(path) ? null : `${suite.kind} ${suite.path} empty`;
  if (st.size === 0) return `${suite.kind} ${suite.path} empty`;
  if (suite.path.endsWith('.json')) {
    const text = readFileSync(path, 'utf8');
    if (text.trim() === '') return `${suite.kind} ${suite.path} empty`;
    try {
      const v = JSON.parse(text) as unknown;
      if (Array.isArray(v) ? v.length === 0 : typeof v === 'object' && v !== null && Object.keys(v).length === 0) return `${suite.kind} ${suite.path} empty`;
    } catch {
      return `${suite.kind} ${suite.path} unreadable`;
    }
  }
  return null;
}
