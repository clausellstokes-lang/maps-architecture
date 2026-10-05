// The suite wired into the transaction (§3.3 *Expectations*, §5.3's `Invariant`): the hard batch rows as `KernelTx.expect`
// entries of kind `check` (a failure returns E_INVARIANT), class floors as entries of kind `classFloor` (a failure returns
// E_BELOW_MIN_WIDTH / _AREA / _ANGLE, the transaction's own measure), the named predicates the transaction calls for each
// entry (`TxEnv.checks`), and the whole batch-local suite on every commit (`TxEnv.invariants`) — hard rows abort the
// batch, soft rows and every row's cost meter go to the report, never into `expect` (§3.3: "a soft row goes to the
// report, never into `expect`"). M0-a-14. Readings: C-0217.
import type { FaceId, Plat } from '../arena/index.js';
import { touchedFaces, type CommitRecord, type ExpectView, type TxEnv } from '../tx/index.js';
import type { Invariant } from '../types/index.js';
import { batchCost, checkBatch, roleKeysOn, touchedSet } from './batch.js';
import { KERNEL_ROWS, rowNamed } from './rows.js';
import type { BatchContext, InvariantResult } from './types.js';

/** A `KernelTx.expect` entry for a §3.10 row by name: hard and batch-scoped only (a soft row is refused, §3.3). */
export function expectRow(name: string): Invariant {
  const r = rowNamed(name);
  if (r.class !== 'hard' || r.scope !== 'batch') throw new Error(`invariants: ${name} is a ${r.class} ${r.scope} row — only hard batch rows enter expect; a soft row goes to the report (§3.3, §5.3)`);
  return { name: r.name, scope: 'batch', class: 'hard', kind: 'check', check: r.name };
}

/** A class floor as a `KernelTx.expect` entry (§4.7's class-floor row; the transaction measures it, §3.3). */
export function classFloorRow(faceClass: string): Invariant {
  return { name: `class-floor:${faceClass}`, scope: 'batch', class: 'hard', kind: 'classFloor', faceClass };
}

/** Every hard batch row of §3.10 as `expect` entries, in the table's order. */
export function kernelExpect(): Invariant[] {
  return KERNEL_ROWS.filter((r) => r.class === 'hard' && r.scope === 'batch').map((r) => expectRow(r.name));
}

/** The record the transaction's `ExpectView` stands for: its touched faces at its level as changed, their rows' keys. */
function viewRecord(view: ExpectView): CommitRecord {
  const p = view.plat;
  const faces = [{ level: view.level, created: [] as FaceId[], changed: [...view.faces], removed: [] as FaceId[] }];
  const base: CommitRecord = {
    version: p.version,
    key: { layer: p.key.layer, part: p.key.part },
    level: view.level,
    faces,
    edgesAdded: 0,
    edgesRemoved: 0,
    steinerAdded: 0,
    steinerDissolved: 0,
    work: 0,
    moved: [],
    promoted: [],
    demoted: { vertices: [], edges: [] },
    unflagged: [],
    owners: [],
    roles: [],
    warnings: [],
  };
  const T = touchedSet(p, base);
  return { ...base, roles: roleKeysOn(p, T.pairs, T.vertices) };
}

/**
 * The named predicates `TxEnv.checks` carries: one per hard batch row, each evaluating its row over the expect view's
 * touched faces (the faces of the batch's level it created or changed) — null when the row holds, else its first
 * problem and the count.
 */
export function kernelChecks(ctx: BatchContext = {}): Record<string, (view: ExpectView) => string | null> {
  const out: Record<string, (view: ExpectView) => string | null> = {};
  for (const r of KERNEL_ROWS) {
    if (r.class !== 'hard' || r.scope !== 'batch') continue;
    out[r.name] = (view: ExpectView): string | null => {
      const res = checkBatch(viewRecord(view), view.plat, ctx).find((x) => x.name === r.name) as InvariantResult;
      if (res.holds) return null;
      // The transaction prefixes the entry's name (§3.3's E_INVARIANT detail), so the row's own prefix is dropped here.
      const first = res.problems[0].slice(r.name.length + 2);
      return `${first}${res.problems.length > 1 ? ` (and ${res.problems.length - 1} more)` : ''}`;
    };
  }
  return out;
}

/** One batch's line in the report: every row's verdict (soft rows' problems among them) and the cost meter. */
export interface BatchReportLine {
  readonly version: number;
  readonly level: number;
  /** §13.2's batch size: the faces the record names. */
  readonly touchedFaces: number;
  /** What the suite read: distinct faces walked, vertices and edges examined, summed over the rows. */
  readonly checked: { readonly faces: number; readonly vertices: number; readonly edges: number };
  readonly results: readonly InvariantResult[];
}

/** The suite's report (§5.4's per-invariant counts): one line per batch the suite checked, rejected batches included. */
export interface SuiteReport {
  readonly batches: BatchReportLine[];
}

/** A fresh report. */
export function suiteReport(): SuiteReport {
  return { batches: [] };
}

/** The hard problems of a batch's verdicts (each naming its row): what aborts the batch. */
export function hardProblems(results: readonly InvariantResult[]): string[] {
  const out: string[] = [];
  for (const r of results) if (r.class === 'hard' && !r.holds) out.push(...r.problems);
  return out;
}

/**
 * A transaction environment with the suite wired in: `checks` (the named predicates `expect` entries call) and
 * `invariants` (every batch-local row on the batch's provisional record — hard rows' problems abort the batch, the
 * whole verdict and the cost go to `report`). `base` keeps the caller's other services; its own `checks` win over the
 * suite's on a shared name, and its own `invariants` run after the suite's.
 */
export function suiteEnv(opts: { readonly context?: BatchContext | ((p: Plat) => BatchContext); readonly report?: SuiteReport; readonly base?: TxEnv } = {}): TxEnv {
  const base = opts.base ?? {};
  const ctxOf = (p: Plat): BatchContext => (typeof opts.context === 'function' ? opts.context(p) : opts.context ?? {});
  const fixed = typeof opts.context === 'function' ? {} : opts.context ?? {};
  const checks = { ...kernelChecks(fixed), ...(base.checks ?? {}) };
  return {
    ...base,
    checks,
    invariants: (p: Plat, record: CommitRecord): string[] => {
      const results = checkBatch(record, p, ctxOf(p));
      opts.report?.batches.push({ version: record.version, level: record.level, touchedFaces: touchedFaces(record), checked: batchCost(results), results });
      const out = hardProblems(results);
      if (base.invariants !== undefined) out.push(...base.invariants(p, record));
      return out;
    },
  };
}
