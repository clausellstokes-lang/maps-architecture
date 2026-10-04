// Identity and lifecycle (§2.8; M0-m-01): the identity part every entity record embeds (its `id` field is
// Identity.id, §2.4) and the lifecycle part (its `lifecycle` field), the lifecycle event the document's event block
// holds, the tombstone of the archive, and the small references they name (§7.1's DossierRef and EditId, §2.7's
// raised-way reason key — declared here because LifecycleEvent's fields name them). Types only.
import type { Id, LineageHash, PlatKey } from './kernel.js';

/** The dossier element an entity exists for (§7.1, item 20): `element` the binding key, `version` the host's line. */
export type DossierRef = { element: string; version?: string };

/** An event's `seq` (§7.1): what a batch's edit scope (§3.3's BatchScope) and a seam amendment's cause name. */
export type EditId = number;

/** The log event (§7.1) that caused a change. */
export type EditRef = { seq: number };

/** A rule's home: a stage (§4), §4.11's ladder row or conversion kind, a DR row (§7.7). */
export type RuleRef = { rule: string };

/** A raised way's kind (§2.7; item 110 (f)). */
export type RaisedKind = 'viaduct' | 'elevated' | 'aqueduct';

/** A generated raised way's reason and its derivation unit (§2.7, §4.3). */
export interface RaisedReasonKey {
  kind: RaisedKind;
  a: Id;
  b?: Id;
}

/** The identity part of every entity record (§2.8): persisted, in the model digest. */
export interface Identity {
  /** Address id (§6.3). */
  id: Id;
  kind: string;
  /** Containment parent: a field, never parsed from the id. */
  parent?: Id;
  /** The arena: layer and part (§2.2) — one per entity (§2.8's two exceptions name their other part by id). */
  key: PlatKey;
  /** Stream identity (§6.3). */
  lineage: LineageHash;
  /** Reroll count of this entity as a derivation unit (§6.1). */
  reroll: number;
  /** Item 20: the dossier element this entity exists for. */
  dossier?: DossierRef;
}

/** Who holds an attribute's value (§2.8 *Fact tiers*); derived at read, never stored. */
export type FactTier = 'dossier' | 'declared' | 'map';

/** One existence state (§2.8; LC-26); `cleared` and `reused` are item 8's traces. */
export type Existence =
  | 'generated'
  | 'built'
  | 'altered'
  | 'converted'
  | 'abandoned'
  | 'decayed'
  | 'ruined'
  | 'cleared'
  | 'reused'
  | 'demolished';

/** The orthogonal flags beside the existence state (§2.8, §7.2). */
export interface LifecycleFlags {
  locked: boolean;
  pinned: boolean;
  edited: boolean;
  assigned: boolean;
  /** Attribute-level locks (§7.2); absent = the whole entity. */
  lockedPaths?: string[];
  /** Attributes the user set; each is implicitly pinned (§7.2). */
  editedPaths?: string[];
}

/** The lifecycle part of every entity record (§2.8): persisted, in the model digest. */
export interface Lifecycle {
  existence: Existence;
  flags: LifecycleFlags;
  /** The event that last changed `existence`. */
  since: { epoch: number; seq: number };
}

/** One entry of the document's lifecycle event block (§2.8), keyed by id and ordered by `seq`. */
export interface LifecycleEvent {
  id: Id;
  /** The causing EditEvent's seq; 0 for the generation run. */
  seq: number;
  epoch: number;
  kind:
    | Existence
    | 'lock'
    | 'unlock'
    | 'pin'
    | 'unpin'
    | 'edit'
    | 'assign'
    | 'unassign'
    | 'reparent'
    | 'carry'
    | 'supersede'
    | 'resurrect'
    | 'open'
    | 'close'
    | 'relocate'
    | 'mutate'
    | 'reject'
    | 'lapse'
    | 'place'
    | 'relet';
  cause: EditRef | RuleRef | 'generation' | `convert:${string}`;
  detail?: {
    from?: Id;
    to?: Id;
    lineageFrom?: LineageHash;
    lineageTo?: LineageHash;
    path?: string;
    /** Index into the causing event's mutations (§7.1, §4.7 S11). */
    mutation?: number;
    /** Item 67: the timetable of the Works that carried this change. */
    works?: { startWeek: number; durationWeeks: number };
    /** ≤ 5 rows that pulled the change (V06; the raised-way generator). */
    why?: { row: string; family: string; share: number; good?: string; other?: Id }[];
    /** The suppression record of §2.8 (J-VI.14). */
    suppress?: {
      kind: 'raised' | 'harbourChain' | 'quayWall' | 'retaining' | 'deckPlot';
      key: string;
      reason?: RaisedReasonKey;
      enceinte?: Id;
      water?: Id;
      chain?: string;
      host?: Id;
      slot?: number;
    };
  };
}

/** A demolished or superseded entity in the archive (§2.8, §6.3). */
export interface Tombstone {
  id: Id;
  kind: string;
  lineage: LineageHash;
  supersededBy?: Id;
  seq: number;
  /** The compressed last record: orphan reports, resurrection (§6.3). */
  last: Uint8Array;
}
