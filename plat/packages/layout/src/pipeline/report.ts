// The generation report in its M0 form (M0-x-02; §5.4, §5.1 (3), (5), (7), (8), §6.1 *the textual form*; C-0077, C-0224).
//
// * `GenerationReport` carries every field §5.4 declares, in its order. A derivation that meets missing or empty inputs
//   still produces a WHOLE report: every list is `[]`, never absent, and every stage entry carries `work` (each declared
//   counter, 0 when no batch ran), `attempts`, `warnings` ({} when none), `ladderUses` and `invariants` (each declared
//   row, `count` 0 when never evaluated). The lists no M0 writer fills — `prefix` (the creation prefix, M1),
//   `requestedVsBuilt` (M1), `dossier` and `dossierNotes` (the port, M1), `epochs` (M4), `changes` (M2a) — are written
//   `[]` by every M0 derivation (C-0224 (7)).
// * `ReportSink` is what a stage writes through (`StageContext.report`): its own warnings, its ladder uses (the stream
//   key's components; the report renders the textual key, §6.1), its evaluations of declared stage-scope and soft rows,
//   requested features (§5.1 (7)), auto-resolved parameters, unserved and unplaced entities and bug aborts (§5.1 (8)).
//   The runner writes the batch side itself: work per counter, kernel warnings, downgrades and work-limit hits from
//   each commit, the batch-scope hard rows' evaluations, and a bug entry for a stage whose run is refused (C-0224 (5)).
// * Stage names in the report are the stage-id registry's textual names (`S5`), as the textual stream key spells them
//   (C-0224 (3)). Every record keyed by a name (`work`, `warnings`, `kernel.warnings`) is written in name order, so two
//   derivations of one input give equal reports field for field.
import { ENGINE_ID, keyText, stageText, type ConcernId, type Handle, type Id, type Invariant, type StageId, type StreamOpts, type Warning } from '@plat/kernel';
import type { Rung, Seed } from '@plat/model';

/** A failure class id (§5.2's rows; a volume's own class): a string. */
export type FailureClass = string;

/** §5.4's report codes: the only codes a ladder writes. */
export type ReportCode = 'work_cut' | 'time_over' | 'no_crossing' | 'not_built' | 'unserved' | 'unplaced' | 'no_alternative' | 'bug' | 'aqueduct_no_source' | 'toll_bridge_dry';

/** §5.1's seven tiers. */
export type Tier = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** One ladder use (§5.4): its class, code, rung and tier, the entity, and the stream key's textual form (§6.1). */
export interface LadderUse {
  cause: FailureClass;
  code?: ReportCode;
  rung: number;
  tier: Tier;
  entity: Id;
  key: string;
}

/** One invariant row's line (§5.4): its name and scope, whether every evaluation held, and how many evaluations ran. */
export interface InvariantLine {
  name: string;
  scope: Invariant['scope'];
  pass: boolean;
  count: number;
}

/** A stage's entry (§5.4's `stages[]`). */
export interface StageReport {
  /** The stage's textual name (`S5`, C-0224 (3)). */
  name: string;
  /** Operation counts against the stage's declared work limits, by counter (§5.1 (5)). */
  work: Record<string, number>;
  /** The stage's tier-3 retries: its ladder uses at attempt > 0. */
  attempts: number;
  /** The stage's own non-kernel warning codes (S3's `W_WALLED_BY_BARRIERS` …). */
  warnings: Record<string, number>;
  ladderUses: LadderUse[];
  invariants: InvariantLine[];
}

/** §5.1 (7): a requested feature's delivery. */
export interface RequestedRow {
  feature: string;
  delivered: 'full' | 'degraded' | 'omitted';
  tier: number;
  entity?: Id;
  cause?: FailureClass;
}

/** §5.4's creation-prefix outcome (§4.1's declarations read ahead; M1). */
export interface PrefixRow {
  seq: number;
  state: 'applied' | 'bent' | 'refused';
  bent?: string;
  reason?: string;
  closest?: Id[];
}

/** §5.4's `Diff` (M1's requested-versus-built list). */
export interface Diff {
  subject: string;
  entity?: Id;
  requested: unknown;
  built: unknown;
  reason: FailureClass | ReportCode;
}

/** §5.4's auto-resolved parameter; `layer` is §7.6's override layer (its type is M1's, a string here). */
export interface AutoResolvedRow {
  param: string;
  value: unknown;
  reason: string;
  layer: string;
}

/** §5.1 (8)'s bug entry: the class, the entity, the stream key (textual), the stage (its textual name). */
export interface BugRow {
  cls: FailureClass;
  entity: Id;
  key: string;
  stage: string;
}

/** §5.4's dossier placement state (§7.7; the port, M1). */
export interface DossierRow {
  element: Id;
  state: 'placed' | 'rejectedSite' | 'blocked';
  site?: Id;
  rules?: string[];
  closest?: Id[];
}

/** §5.4's kernel block: the engine id (§3.7), the kernel warnings by code, W_DOWNGRADE's count, the work-limit hits. */
export interface KernelReport {
  engine: string;
  warnings: Record<string, number>;
  downgrades: number;
  workLimitHits: number;
}

/** §5.4's GenerationReport, in its M0 form (C-0224 (7)). */
export interface GenerationReport {
  outputVersion: string;
  recipe: { seed: Seed; rung: Rung; presetId?: string };
  stages: StageReport[];
  requested: RequestedRow[];
  prefix: PrefixRow[];
  requestedVsBuilt: Diff[];
  autoResolved: AutoResolvedRow[];
  unserved: Id[];
  unplaced: Id[];
  bugs: BugRow[];
  dossier: DossierRow[];
  /** §7.7's port notes (`PortNote`, M1): always [] at M0. */
  dossierNotes: never[];
  /** V06's epoch reports (M4): always [] at M0. */
  epochs: never[];
  /** §5.4's `ReportEntry` list (M2a's edits): always [] at M0. */
  changes: never[];
  kernel: KernelReport;
}

/** A ladder use as a stage reports it: the stream key's components; the report renders the key (§6.1). */
export interface LadderUseInput {
  cause: FailureClass;
  code?: ReportCode;
  rung: number;
  tier: Tier;
  /** The entity whose stream the rung drew on: a handle of the derivation (`StageContext.stream`'s). */
  entity: Handle;
  concern: ConcernId;
  opts: StreamOpts;
}

/** A bug abort as a stage reports it (§5.1 (8)): its class and the stream key's components. */
export interface BugInput {
  cls: FailureClass;
  entity: Handle;
  concern: ConcernId;
  opts: StreamOpts;
}

/** What a stage writes its report lines through (`StageContext.report`; §5.4). */
export interface ReportSink {
  /** One of the stage's own non-kernel warning codes, `count` times (default 1). */
  warning(code: string, count?: number): void;
  /** A ladder use (§5.1 (3)): every rung taken writes one. */
  ladderUse(use: LadderUseInput): void;
  /** One evaluation of a declared row the runner does not check itself (a stage-scope or soft row). */
  invariant(name: string, pass: boolean): void;
  /** A requested feature's delivery (§5.1 (7)). */
  requested(row: RequestedRow): void;
  autoResolved(row: AutoResolvedRow): void;
  unserved(id: Id): void;
  unplaced(id: Id): void;
  /** A bug abort (§5.1 (8)): CI requires none. */
  bug(row: BugInput): void;
}

/** The per-stage state the builder keeps while the stage runs. */
export interface StageState {
  readonly name: string;
  readonly work: Map<string, number>;
  readonly warnings: Map<string, number>;
  readonly ladderUses: LadderUse[];
  readonly rows: { readonly row: Invariant; evaluations: number; failures: number }[];
  attempts: number;
}

/** Resolves a handle of the derivation to its address id (the runner's handle table). */
export type AddressOf = (entity: Handle) => Id;

function countUp(m: Map<string, number>, key: string, by: number): void {
  m.set(key, (m.get(key) ?? 0) + by);
}

function byName(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** A map as a plain record, its keys in name order (one order for every insertion order). */
function sortedRecord(m: ReadonlyMap<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const k of [...m.keys()].sort(byName)) out[k] = m.get(k) as number;
  return out;
}

function checkCount(count: number, what: string): void {
  if (!(Number.isInteger(count) && count >= 0)) throw new RangeError(`report: ${what} count ${String(count)} is not a whole number ≥ 0`);
}

/**
 * Builds one derivation's GenerationReport: the stages' entries in the order they ran, the derivation-wide lists, the
 * kernel block. `finish()` returns the whole report; every list it holds is a fresh array.
 */
export class ReportBuilder {
  private readonly stages: StageState[] = [];
  private readonly requestedRows: RequestedRow[] = [];
  private readonly autoResolvedRows: AutoResolvedRow[] = [];
  private readonly unservedIds: Id[] = [];
  private readonly unplacedIds: Id[] = [];
  private readonly bugRows: BugRow[] = [];
  private readonly kernelWarnings = new Map<string, number>();
  private downgrades = 0;
  private workLimitHits = 0;

  constructor(
    private readonly outputVersion: string,
    private readonly recipe: { seed: Seed; rung: Rung },
    private readonly addressOf: AddressOf,
  ) {}

  /** Opens a stage's entry: every declared counter at 0, every declared row unevaluated. */
  openStage(stage: StageId, counters: readonly string[], invariants: readonly Invariant[]): StageState {
    const s: StageState = {
      name: stageText(stage),
      work: new Map(counters.map((c) => [c, 0])),
      warnings: new Map(),
      ladderUses: [],
      rows: invariants.map((row) => ({ row, evaluations: 0, failures: 0 })),
      attempts: 0,
    };
    this.stages.push(s);
    return s;
  }

  /** The sink a stage writes through, bound to its entry. */
  sinkFor(s: StageState, stage: StageId): ReportSink {
    const keyOf = (entity: Handle, concern: ConcernId, opts: StreamOpts): { id: Id; key: string } => {
      const id = this.addressOf(entity);
      return { id, key: keyText({ entity: id, stage, concern, ...opts }) };
    };
    return Object.freeze({
      warning: (code: string, count = 1): void => {
        if (typeof code !== 'string' || code.length === 0) throw new RangeError('report: a warning names its code');
        checkCount(count, `warning ${code}`);
        countUp(s.warnings, code, count);
      },
      ladderUse: (use: LadderUseInput): void => {
        const { id, key } = keyOf(use.entity, use.concern, use.opts);
        s.ladderUses.push(use.code === undefined
          ? { cause: use.cause, rung: use.rung, tier: use.tier, entity: id, key }
          : { cause: use.cause, code: use.code, rung: use.rung, tier: use.tier, entity: id, key });
        if (use.opts.attempt > 0) s.attempts += 1;
      },
      invariant: (name: string, pass: boolean): void => {
        const line = s.rows.find((r) => r.row.name === name);
        if (line === undefined) throw new RangeError(`report: stage ${s.name} declares no invariant '${name}' (§4.12's StageDecl.invariants)`);
        if (line.row.scope === 'batch' && line.row.class === 'hard') {
          throw new RangeError(`report: '${name}' is a batch-scope hard row: the transaction checks it (§3.3's expect), never the stage`);
        }
        this.evaluate(s, name, pass);
      },
      requested: (row: RequestedRow): void => {
        this.requestedRows.push({ ...row });
      },
      autoResolved: (row: AutoResolvedRow): void => {
        this.autoResolvedRows.push({ ...row });
      },
      unserved: (id: Id): void => {
        this.unservedIds.push(id);
      },
      unplaced: (id: Id): void => {
        this.unplacedIds.push(id);
      },
      bug: (row: BugInput): void => {
        const { id, key } = keyOf(row.entity, row.concern, row.opts);
        this.bugRows.push({ cls: row.cls, entity: id, key, stage: s.name });
      },
    });
  }

  /** One evaluation of a declared row. */
  evaluate(s: StageState, name: string, pass: boolean): void {
    const line = s.rows.find((r) => r.row.name === name);
    if (line === undefined) throw new RangeError(`report: stage ${s.name} declares no invariant '${name}'`);
    line.evaluations += 1;
    if (!pass) line.failures += 1;
  }

  /** A committed batch's work under its counter (§5.1 (5)). */
  work(s: StageState, counter: string, ops: number): void {
    checkCount(ops, `work ${counter}`);
    countUp(s.work, counter, ops);
  }

  /** Kernel warnings (§3.1's codes; a commit's, or a stage result's): counted by code, W_DOWNGRADE also as downgrades. */
  kernelWarnings(ws: readonly Warning[]): void {
    for (const w of ws) {
      checkCount(w.count, `kernel warning ${w.code}`);
      countUp(this.kernelWarnings, w.code, w.count);
      if (w.code === 'W_DOWNGRADE') this.downgrades += w.count;
    }
  }

  /** A batch refused with E_WORK_LIMIT (F-WORK's `work_cut`): a hit, and the limit it reached under its counter. */
  workLimitHit(s: StageState, counter: string, limit: number): void {
    this.workLimitHits += 1;
    countUp(s.work, counter, limit);
  }

  /** A stage whose run was refused outside its ladder: a bug entry (§5.1 (8)) under the stage's key (C-0224 (5)). */
  stageRefused(s: StageState, cls: FailureClass, town: Id): void {
    this.bugRows.push({ cls, entity: town, key: `${s.name}@${town}`, stage: s.name });
  }

  /** The whole report (§5.4). */
  finish(): GenerationReport {
    return {
      outputVersion: this.outputVersion,
      recipe: { seed: this.recipe.seed, rung: this.recipe.rung },
      stages: this.stages.map((s) => ({
        name: s.name,
        work: sortedRecord(s.work),
        attempts: s.attempts,
        warnings: sortedRecord(s.warnings),
        ladderUses: s.ladderUses.map((u) => ({ ...u })),
        invariants: s.rows.map((r) => ({ name: r.row.name, scope: r.row.scope, pass: r.failures === 0, count: r.evaluations })),
      })),
      requested: this.requestedRows.map((r) => ({ ...r })),
      prefix: [],
      requestedVsBuilt: [],
      autoResolved: this.autoResolvedRows.map((r) => ({ ...r })),
      unserved: [...this.unservedIds],
      unplaced: [...this.unplacedIds],
      bugs: this.bugRows.map((b) => ({ ...b })),
      dossier: [],
      dossierNotes: [],
      epochs: [],
      changes: [],
      kernel: { engine: ENGINE_ID, warnings: sortedRecord(this.kernelWarnings), downgrades: this.downgrades, workLimitHits: this.workLimitHits },
    };
  }
}

/** The report fields §5.4 declares, in its order: the schema test reads them (every one present, every list an array). */
export const REPORT_FIELDS = Object.freeze([
  'outputVersion', 'recipe', 'stages', 'requested', 'prefix', 'requestedVsBuilt', 'autoResolved', 'unserved', 'unplaced',
  'bugs', 'dossier', 'dossierNotes', 'epochs', 'changes', 'kernel',
] as const);

/** The list fields of the report: each is an array in every report, `[]` when empty. */
export const REPORT_LISTS = Object.freeze([
  'stages', 'requested', 'prefix', 'requestedVsBuilt', 'autoResolved', 'unserved', 'unplaced', 'bugs', 'dossier',
  'dossierNotes', 'epochs', 'changes',
] as const);
