// The summary's content anchor (M0-e-06 S3, Q36; checks/M0-e-06-notes.md note 18): what the committed 200-seed summary
// was derived on, recorded in it so `summary.test.ts` can hold a stale summary RED rather than pass its shape alone.
//
// Three parts, each with its scope (C-0449 states the trade-off and the re-run rule):
//   * `harness` — sha256 over the harness's own sources (bench/src/site, every file): compared byte for byte. A change to
//     the code that derives, reads or folds the records is a change to the summary's meaning; the round that makes it
//     re-runs the summary.
//   * `canary` — one CITY record of the run (one that ends every stage ok, with the least charged work: `canaryIndex`)
//     and its sha256: re-derived on the tree and compared. A change in any package the spike derives through (kernel,
//     model, tables and its data, site, layout, the corpus runner) that moves the canary's record turns the test red:
//     the Q36 class (another item's commit moves a stage outcome) caught by behaviour, at the cost of one derivation.
//   * `sources` — sha256 over the derivation's sources (those packages' src/, the tables' data/, bench/src/skeleton) and
//     `tree`, the commit the run's tree stood on: recorded, compared and REPORTED (the test names a moved digest; it
//     does not fail on it). A strict source digest would turn the test red at every landing of every stage item, whether
//     or not the summary moved; the session rules on the scope (Q36's standing re-run procedure stays the rule).
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { RunRecord } from './receipts.js';

/** The harness's own sources (compared strictly). */
export const HARNESS_SCOPE: readonly string[] = Object.freeze(['bench/src/site']);

/** The derivation's sources (recorded and reported): the packages the spike derives through, the tables' data, the corpus runner. */
export const SOURCE_SCOPE: readonly string[] = Object.freeze([
  'bench/src/skeleton',
  'packages/kernel/src',
  'packages/layout/src',
  'packages/model/src',
  'packages/site/src',
  'packages/tables/data',
  'packages/tables/src',
]);

/** A digest over a scope: its file count and sha256. */
export interface ScopeDigest {
  readonly scope: readonly string[];
  readonly files: number;
  readonly sha256: string;
}

/** The canary: one record of the run, by seed, fixture and configuration, and its digest. */
export interface CanaryRecord {
  readonly seed: number;
  readonly fixture: string;
  readonly config: string;
  readonly sha256: string;
}

/** The summary's anchor (Q36). */
export interface SummaryAnchor {
  /** The commit the run's tree stood on (40 hex), or null where none was named. Uncommitted edits are not in it: `sources` is. */
  readonly tree: string | null;
  readonly harness: ScopeDigest;
  readonly sources: ScopeDigest;
  readonly canary: CanaryRecord;
}

function filesUnder(root: string, dir: string, out: string[]): void {
  for (const name of readdirSync(join(root, dir)).sort()) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    const rel = `${dir}/${name}`;
    if (statSync(join(root, rel)).isDirectory()) filesUnder(root, rel, out);
    else out.push(rel);
  }
}

/** sha256 over a scope under `root` (plat/): each file's path and content digest, in path order. */
export function scopeDigest(root: string, scope: readonly string[]): ScopeDigest {
  const files: string[] = [];
  for (const d of scope) filesUnder(root, d, files);
  files.sort();
  const h = createHash('sha256');
  for (const f of files) h.update(`${f}\u0000${createHash('sha256').update(readFileSync(join(root, f))).digest('hex')}\n`);
  return { scope: [...scope], files: files.length, sha256: h.digest('hex') };
}

/** A record's digest: sha256 of its JSON (the report's own encoding of it). */
export function recordDigest(r: RunRecord): string {
  return createHash('sha256').update(JSON.stringify(r)).digest('hex');
}

/** A record's charged work: every batch's counts and every stage row's work (the canary's cost proxy; no clock in it). */
export function chargedWork(r: RunRecord): number {
  let w = 0;
  for (const b of r.kernelBatches) for (const n of Object.values(b.counts)) w += n;
  for (const row of Object.values(r.stageRows)) for (const list of Object.values(row)) for (const x of list) w += x.work;
  for (const x of Object.values(r.work)) w += x.work;
  return w;
}

/**
 * The canary (its index in `records`): among the records whose every stage ended ok — S1 through S6, the most code
 * exercised — the one with the least charged work (`chargedWork`: one CITY derivation is the test's cost; work, not a
 * clock, so the same records choose the same canary), ties to the lower seed, then the run's order; with no such record,
 * the record with the most stages ok, by the same order.
 */
export function canaryIndex(records: readonly RunRecord[]): number {
  let best = -1;
  let bestKey: [number, number, number, number] = [0, 0, 0, 0];
  records.forEach((r, i) => {
    const o = Object.values(r.stages);
    const ok = o.filter((x) => x === 'ok').length;
    const key: [number, number, number, number] = [o.length > 0 && ok === o.length ? 0 : 1, -ok, chargedWork(r), r.seed];
    let less = best < 0;
    for (let k = 0; k < 4 && !less; k += 1) {
      if (key[k] < bestKey[k]) less = true;
      else if (key[k] > bestKey[k]) break;
    }
    if (less) {
      best = i;
      bestKey = key;
    }
  });
  return best;
}

/** The commit a git work tree stands on, read from its files (no git process), or null. */
export function treeOf(root: string): string | null {
  let dir = root;
  for (let i = 0; i < 4; i += 1) {
    try {
      const head = readFileSync(join(dir, '.git', 'HEAD'), 'utf8').trim();
      if (/^[0-9a-f]{40}$/.test(head)) return head;
      const ref = /^ref: (.+)$/.exec(head)?.[1];
      if (ref === undefined) return null;
      try {
        return readFileSync(join(dir, '.git', ...ref.split('/')), 'utf8').trim();
      } catch {
        const packed = readFileSync(join(dir, '.git', 'packed-refs'), 'utf8');
        const line = packed.split('\n').find((l) => l.endsWith(` ${ref}`));
        return line === undefined ? null : line.slice(0, 40);
      }
    } catch {
      dir = join(dir, '..');
    }
  }
  return null;
}

/** The anchor of a run's records on the tree at `root` (`tree`: the commit named by the caller, else read from .git). */
export function anchorOf(root: string, records: readonly RunRecord[], tree: string | null = treeOf(root)): SummaryAnchor {
  const r = records[canaryIndex(records)];
  return { tree, harness: scopeDigest(root, HARNESS_SCOPE), sources: scopeDigest(root, SOURCE_SCOPE), canary: { seed: r.seed, fixture: r.fixture, config: r.config, sha256: recordDigest(r) } };
}
