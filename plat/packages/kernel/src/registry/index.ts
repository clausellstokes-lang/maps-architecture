// The kernel's two registries (item M0-d-01; §6.1, §14, §4.1; C-0005, C-0020): the stage-id table and the concern
// registry, versioned JSON data in this folder (stages.json, concerns.json), append-only — every row keeps the u16 id it
// was appended with, never renumbered or reused, so adding a stage or a concern moves no existing key. Their typed
// constants (CONCERNS, STAGES) are generated into ids.ts (test/rng/gen-registry.ts). The stream mixer (../rng/) reads
// the tables below to refuse an unregistered stage or concern, a retired concern and an attempt past the concern's cap.
import concernsFile from './concerns.json';
import stagesFile from './stages.json';
import type { ConcernId, StageId } from '../types/index.js';

export { CONCERNS, STAGES, type ConcernName, type RerollableConcernName, type StageName } from './ids.js';

/** The reserved stage id paint programs and furniture pass to the one mixer (§6.1, §14 `Rng.stream`): 0xffff. */
export const STAGE_VIEW = 0xffff as StageId;

/**
 * The attempt cap a concern row writes as "default" resolves to the geometric ladders' cap, 2 (three attempts; §6.1's
 * attempt component). The table's "default" is 2 for a concern a geometric ladder retries and 0 for one no ladder
 * retries; the registry cannot tell which, so the mixer's guard reads the larger and never refuses a lawful attempt —
 * the ladder runner holds the exact count (choice C-0143).
 */
export const DEFAULT_ATTEMPT_CAP = 2;

/** The milestones a `reservedUntil` may name (§16's rows). */
export const REGISTRY_MILESTONES: readonly string[] = Object.freeze([
  'M-1', 'M0', 'M1', 'M2a', 'M2b', 'M3a', 'M3b', 'M3c', 'M4', 'M4b', 'M5', 'V-M0', 'V-M1', 'V-M2', 'V-M2u', 'V-M3', 'V-M4',
  'M6-E', 'M6-P', 'M6', 'M6-U', 'M6-sky', 'M-CAL', 'M-SF',
]);

/** A row of the concern registry (§6.1's table, one row per concern). */
export interface ConcernRow {
  /** The u16 id it was appended with. */
  readonly id: number;
  /** Its registry name, e.g. `cut.stop`. */
  readonly name: string;
  /** The §6.1 table row it shares (1-based). */
  readonly row: number;
  /** The attempt cap as the table writes it: "default", a number, or null for a retired id. */
  readonly cap: 'default' | number | null;
  /** Whether `rerollLayer` may salt it (§6.1: exactly seven concerns). */
  readonly rerollable: boolean;
  /** A retired id: reserved, no reader, never reused (J-A41.61). */
  readonly retired: boolean;
  /** The reader stages or programs the table's cell names. */
  readonly readers: readonly string[];
  /** The table's cell, verbatim: the one statement of how its draws are keyed. */
  readonly keyedBy: string;
  /** The milestone whose item lands its first reader; absent when M0 reads it (C-0020). */
  readonly reservedUntil?: string;
}

/** A row of the stage-id table. */
export interface StageRow {
  readonly id: number;
  /** `S0` … `S15`, the lettered stages, `SKY`, `S7c`, `S9b`, `S8.seed`. */
  readonly name: string;
  /** §4.1's title. */
  readonly title: string;
  /** Where the design places the stage's registration or first user after M0. */
  readonly reservedUntil?: string;
}

/** A versioned registry file. */
export interface RegistryFile<R> {
  readonly registry: 'concerns' | 'stages';
  readonly version: number;
  readonly rows: readonly R[];
}

/** The stage registry also names the reserved view id. */
export interface StageRegistryFile extends RegistryFile<StageRow> {
  readonly view: { readonly name: 'STAGE_VIEW'; readonly id: number; readonly title: string };
}

function isU16(v: unknown): v is number {
  return typeof v === 'number' && (v & 0xffff) === v;
}

function isMilestone(v: unknown): boolean {
  return v === undefined || (typeof v === 'string' && REGISTRY_MILESTONES.includes(v));
}

/** Refuses a malformed registry at load: ids dense from 0 in file order, names unique, every field of its type. */
function checkFile(file: RegistryFile<ConcernRow | StageRow>, kind: 'concerns' | 'stages'): void {
  if (file.registry !== kind || !(Number.isInteger(file.version) && file.version >= 1)) {
    throw new Error(`registry ${kind}: bad header`);
  }
  const names = new Set<string>();
  file.rows.forEach((row, i) => {
    if (row.id !== i || !isU16(row.id) || typeof row.name !== 'string' || names.has(row.name) || !isMilestone(row.reservedUntil)) {
      throw new Error(`registry ${kind}: bad row ${String(i)}`);
    }
    names.add(row.name);
  });
}

/** The concern registry as committed (concerns.json). */
export const CONCERN_REGISTRY: RegistryFile<ConcernRow> = concernsFile as RegistryFile<ConcernRow>;
/** The stage-id table as committed (stages.json). */
export const STAGE_REGISTRY: StageRegistryFile = stagesFile as StageRegistryFile;

checkFile(CONCERN_REGISTRY, 'concerns');
checkFile(STAGE_REGISTRY, 'stages');
for (const row of CONCERN_REGISTRY.rows) {
  const capOk = row.retired ? row.cap === null : row.cap === 'default' || (Number.isInteger(row.cap) && (row.cap as number) >= 0 && (row.cap as number) <= 0xff);
  if (!capOk || typeof row.rerollable !== 'boolean' || !Array.isArray(row.readers) || (row.retired && row.readers.length > 0)) {
    throw new Error(`registry concerns: bad row ${row.name}`);
  }
}
if (STAGE_REGISTRY.view.id !== STAGE_VIEW || STAGE_REGISTRY.rows.length >= STAGE_VIEW) throw new Error('registry stages: bad view id');

// Each concern's highest lawful attempt index, by id; −1 for a retired id.
const CAPS = new Int16Array(CONCERN_REGISTRY.rows.length);
for (const row of CONCERN_REGISTRY.rows) {
  CAPS[row.id] = row.cap === null ? -1 : row.cap === 'default' ? DEFAULT_ATTEMPT_CAP : row.cap;
}

/** The number of registered concerns (ids 0 … CONCERN_COUNT − 1). */
export const CONCERN_COUNT: number = CONCERN_REGISTRY.rows.length;

/**
 * A concern's highest lawful attempt index (§6.1: attempts run 0 … cap; "default" read as DEFAULT_ATTEMPT_CAP), or −1
 * for a retired id — reserved, no reader draws it (T41-1) — and for an id no row holds. Read by the mixer's guard.
 */
export function attemptCap(id: number): number {
  return id >= 0 && id < CONCERN_COUNT && (id & 0xffff) === id ? CAPS[id] : -1;
}

/** The number of registered stages (ids 0 … STAGE_COUNT − 1; STAGE_VIEW besides). */
export const STAGE_COUNT: number = STAGE_REGISTRY.rows.length;

/** The concern row of an id, or undefined for an unregistered id. */
export function concernRow(id: ConcernId | number): ConcernRow | undefined {
  return Number.isInteger(id) && id >= 0 && id < CONCERN_REGISTRY.rows.length ? CONCERN_REGISTRY.rows[id] : undefined;
}

/** The stage row of an id, or undefined for an unregistered id (STAGE_VIEW is no row). */
export function stageRow(id: StageId | number): StageRow | undefined {
  return Number.isInteger(id) && id >= 0 && id < STAGE_COUNT ? STAGE_REGISTRY.rows[id] : undefined;
}

/** Is the id one a stream may be keyed with — a registered stage or STAGE_VIEW? */
export function isStreamStage(id: number): boolean {
  return (id === STAGE_VIEW || (id >= 0 && id < STAGE_COUNT)) && (id & 0xffff) === id;
}

/**
 * Is a row still reserved — its reader's milestone not among `reached`? A reserved row is skipped by the "rerollable
 * concern without a reader" test until its milestone (C-0020).
 */
export function isReserved(row: { readonly reservedUntil?: string }, reached: ReadonlySet<string>): boolean {
  return row.reservedUntil !== undefined && !reached.has(row.reservedUntil);
}

/**
 * J-DET-22's CI test: the names of the rerollable concerns that no registered reader reads — `registeredReaders` holds
 * the concern ids named by the registered stages' `StageDecl.streamKeys` and the paint programs — skipping a retired
 * row and a row still reserved at the milestones `reached`. Empty when the registry passes.
 */
export function rerollableWithoutReader(
  rows: readonly ConcernRow[],
  registeredReaders: ReadonlySet<number>,
  reached: ReadonlySet<string>,
): string[] {
  const out: string[] = [];
  for (const row of rows) {
    if (!row.rerollable || row.retired || isReserved(row, reached)) continue;
    if (!registeredReaders.has(row.id)) out.push(row.name);
  }
  return out;
}
