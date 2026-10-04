// The model's string vocabularies and the persisted derivation records (§2.5, §2.6, §2.8, §1.1, §6.3, §7.6;
// M0-m-01): the names an M0 record's fields read, declared as the design writes them. Types only.
import type { Hash64, Id } from './kernel.js';

/** A name's text (§2.8): drawn by §10.4's engine, claimed, dossier-given or edited. */
export type NameRef = string;

/** A description line written by §10.4's engine (§2.8). */
export type TextRef = string;

/** The roster class id of the plot's designation, or 'vacant' for a vacant frontage run (§2.8). */
export type PlotUse = string;

/** The key of the row of §10.2's RosterTables an institution was materialised from (§2.8). */
export type RosterRef = string;

/** The address of an Assignment (§7.7; §2.8). */
export type AssignmentRef = Id;

/** A row id of the roster's class table `roster.classes` (§2.6) — the one class vocabulary. */
export type BuildingClass = string;

/** A district kind: a row key of the roster's district-kind table (§2.5) — feature-named, never a social class. */
export type DistrictKind = string;

/** The id of a registered FabricStrategy (§2.5): 'bent-cut' in the base. */
export type FabricStrategyId = string;

/** A table's registry id (§7.6): dotted, stable, never reused. */
export type TableId = string;

/** A rung of the size ladders (§1.1): the base's three rows and the village product's three. */
export type Rung = 'TOWN' | 'CITY' | 'METROPOLIS' | 'THORP' | 'HAMLET' | 'VILLAGE';

/**
 * A type of §2.8's entity registry, as Identity.kind and an address's `kind:` prefix spell it, or a run unit:
 * 'town' (the town root), 'run' (the creating stage run) or 'edit' (the creating event) (§6.3).
 */
export type EntityKind = string;

/** A table slice a derivation consulted, by its hash (§2.8, §7.6). */
export interface SliceRef {
  table: TableId;
  version: string;
  kind: 'row' | 'weights' | 'bracket' | 'thresholds' | 'match';
  /** A row key; '<rowKey>/<field>' for a slice that is one field of a row (§7.6). */
  key: string;
  hash: Hash64;
}

/** S10b's order of a use placed on a plot (§2.8; V10 §2.13). */
export type PlacementOrder = {
  use: Id;
  /** The event whose S10b run placed it; 0 at generation. */
  seq: number;
  /** Its index in that run's order. */
  k: number;
  /** 2: moved by item 105 (f)'s relaxation pass. */
  pass: 1 | 2;
};

/**
 * The one definition (§2.8): persisted with plots, blocks and buildings; outside the model digest, inside the
 * records digest (§6.2).
 */
export interface DerivationRecord {
  /** Digest of the context vector read. */
  ctx: Hash64;
  fields?: { prosperity?: number; density?: number; greenery?: number };
  /** The band the derivation read. */
  band?: string;
  /** The Allocation row the entity filled (§4.5 S7b). */
  allocationRow?: number;
  /** The epoch of the derivation that wrote it. */
  epoch: number;
  /** Digest of the effective parameters read. */
  params: Hash64;
  /** The table slices consulted. */
  slices: SliceRef[];
  /** S10b, for each use placed on this plot (V10 §2.13). */
  placements?: PlacementOrder[];
}

/** Persisted with every generated name S13a draws (§2.8); outside the model digest, inside the records digest. */
export interface NamingRecord {
  slices: SliceRef[];
  /** The naming salt the last draw used. */
  salt: number;
  epoch: number;
}
