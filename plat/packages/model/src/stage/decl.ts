// The stage types (§4.12, §5.1 (5), §3.3, §14; C-0003; M0-m-01): the declaration every stage registers, the stage
// object, its context and scopes, the work-limit laws, and the types the strategy interfaces read. Declared in
// @plat/model so that a stage below @plat/layout (S1 in @plat/site) can be one (C-0003); the registry, the ordering
// and the runner stay in @plat/layout. Types only.
//
// StageEnv (C-0142 (5)): §14's StageContext and Stage name types that live where @plat/model cannot import them — the
// test kit's and the runner's above it (TableView and RungProfile in @plat/tables; the report sink and the model in
// @plat/layout), the kernel's not yet landed when this item lands (Plat, M0-a-02; Stream, M0-d-01; the Kernel façade,
// M0-a-16) and the document (§2.9, M1). Each is a slot of one environment parameter, `unknown` by default, which a
// package that has the types binds once (`interface BaseEnv extends StageEnv { plat: Plat; … }`).
import type { Handle, Id, Invariant, Level, PlatKey, Polygon, PointCm, Cdeg, ConcernId, StageId, StreamOpts } from '../types/index.js';
import type { EditId } from '../types/identity.js';
import type { EntityKind, Rung } from '../types/vocabulary.js';
import type { Bridge } from '../records/walls.js';
import type { WaterBody } from '../records/site.js';
import type { KernelResult } from '@plat/kernel';

/** A declared stage output (§4.12): 'terrain', 'water', 'roster', 'reservations', … — DATA_KEYS lists §4.12's. */
export type DataKey = string;

/** The units a work-limit law counts over its batch scope (§5.1 (5); §4.12 adds 'moduleCells'). */
export type WorkUnit =
  | 'plots'
  | 'buildings'
  | 'households'
  | 'landHa'
  | 'frameCells'
  | 'latticeNodes'
  | 'faces'
  | 'vertices'
  | 'moduleCells';

/**
 * A work-limit law (§5.1 (5)): limit = floor + perUnit × count(unit, scope); with log2, floor + perUnit ×
 * ⌈log2(count)⌉ (recursion depths). `lawLimit` evaluates it.
 */
export interface WorkLimitLaw {
  counter: string;
  unit: WorkUnit;
  perUnit: number;
  floor: number;
  log2?: boolean;
}

/** StageDecl.workLimits (§4.12, §5.1 (5)); coefficients are rows of `workLimits.json` (§7.6). */
export type WorkLimits = WorkLimitLaw[];

/**
 * One batch's scope (§3.3): a stage, a district, a block, an edit, or a transient arena's entity. §3.3's
 * KernelTx.batch reads it too; its move to the kernel's types, re-exported here, is C-0142 (8)'s open case for M0-a-06.
 */
export type BatchScope =
  | { kind: 'stage'; stage: StageId }
  | { kind: 'district'; id: Id }
  | { kind: 'block'; id: Id }
  | { kind: 'edit'; edit: EditId }
  | { kind: 'entity'; id: Id };

/** A scope at the API (§14): no raw face ids. */
export type Scope =
  | { kind: 'all' }
  | { kind: 'entities'; ids: Id[] }
  | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level }
  | { kind: 'epoch'; epoch: number };

/**
 * A stage's ladders (§5.2; C-0142 (4)): each failure class the stage handles (§4.1's table) with its rungs in the
 * row's order.
 */
export type Ladder = { failureClass: string; rungs: string[] }[];

/** The declaration every stage registers (§4.12); §14's Stage extends it. */
export interface StageDecl {
  /** The stage-id registry's u16 (C-0112, C-0134 (9)); STAGE_IDS lists the registry's names. */
  id: StageId;
  inputs: DataKey[];
  outputs: DataKey[];
  streamKeys: string[];
  /** Each with its scope (§5.3). */
  invariants: Invariant[];
  ladder: Ladder;
  /** Laws over the batch scope's population-derived counts (§5.1 (5)). */
  workLimits: WorkLimits;
  /** Reporting only. */
  budgetMs: Record<Rung, number>;
  batch: BatchScope;
  /** §6.3. */
  lineageUnit: EntityKind;
  /** Only under the §4.1 contract. */
  lazy: boolean;
  /** §3.3; the op form per stage (§4.1). */
  txForm: 'declared' | 'callback';
  /** 'tail': run after the first map (§4.1); absent 'main'. */
  phase?: 'main' | 'tail';
}

/** The slots of a stage's environment whose types live outside @plat/model (C-0142 (5)). */
export interface StageEnv {
  /** §2.9's Document (M1, §4b). */
  doc: unknown;
  /** @plat/kernel's Plat (§2.2; M0-a-02). */
  plat: unknown;
  /** @plat/kernel's Stream (§6.1; M0-d-01). */
  stream: unknown;
  /** @plat/kernel's Kernel façade (§14; M0-a-16). */
  kernel: unknown;
  /** @plat/tables' TableView (§7.6; M0-s-02). */
  tables: unknown;
  /** @plat/tables' RungProfile (§1.1; M0-s-02). */
  rung: unknown;
  /** The report sink (§5.4; M0-x-02). */
  report: unknown;
  /** The model a stage's `inputsOf` reads (§14; M0-x-02). */
  model: unknown;
}

/** What a stage's run sees (§14). */
export interface StageContext<E extends StageEnv = StageEnv> {
  doc: E['doc'];
  /** Keyed by PlatKey. */
  plats: Record<string, E['plat']>;
  /** rng.stream with the calling stage's id and the entity's cached key (§14); TOWN_ROOT for town-level draws. */
  stream(concern: ConcernId, entity: Handle, opts: StreamOpts): E['stream'];
  /** The defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document. */
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts;
  tables: E['tables'];
  /** §1.1. */
  rung: E['rung'];
  report: E['report'];
  scope?: Scope;
  epoch: number;
}

/** A hook a stage declares (§4.12): StrategyRegistry.hooks holds them by host. */
export interface StageHookDecl<E extends StageEnv = StageEnv> {
  /** A hook point a stage declares: 'S7b.afterGreedy', 'S10a.afterDrivers', … */
  host: string;
  /** Its own stage id: the stream keys' stage component. */
  id: StageId;
  inputs: DataKey[];
  outputs: DataKey[];
  streamKeys: string[];
  run(ctx: StageContext<E>, k: E['kernel']): KernelResult<void>;
}

/** A stage (§14): its declaration, its input reader and its run. */
export interface Stage<I, O, E extends StageEnv = StageEnv> extends StageDecl {
  version: string;
  inputsOf(model: E['model'], scope: Scope): I;
  run(input: I, ctx: StageContext<E>): KernelResult<O>;
}

/** S1's and S3's water with its crossing decks (§4.12; §2.3, §2.7). */
export type WaterSet = { bodies: WaterBody[]; bridges: Bridge[] };

/** A typed destination of §4.2 S3 (13) (§4.12). */
export type Destination = { id: Id; kind: string; at: PointCm; bearingCdeg?: Cdeg };

/** A gate site (§4.12; §4.2 S3 (4), (7)). */
export type GateSite = { ordinal: number; at: PointCm; bearingCdeg: Cdeg; kind: 'main' | 'water' | 'harbour'; forced: boolean };
