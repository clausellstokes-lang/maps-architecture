// The matching routine's types (item M0-d-05b; §6.3 *Carry-over*, *Anchors and hysteresis*, *The matching routine*;
// §2.8's LifecycleEvent and Tombstone; C-0089's CarryMap). Readings: C-0188.
import type { Box, LineageHash } from '@plat/kernel';
import type { EntityKind, Id, NameRef, NamingRecord, PointCm, PolygonCm } from '../types/index.js';

/**
 * How a kind's anchor is read (§6.3): `point` — a position matched within the kind's hysteresis radius through a uniform
 * grid; `overlap` — an area matched by IoU on candidates from a spatial index; `ends` — a way: its end junctions'
 * addresses, else the overlap of its length; `key` — a key of addresses and literals, no distance read.
 */
export type AnchorType = 'point' | 'overlap' | 'ends' | 'key';

/** A table cell a radius is read from (§6.3's bridge band: `crossing.searchBandM` of the base settings row, V11 §3.1). */
export interface CellRef {
  readonly table: string;
  readonly row: string;
  readonly cell: string;
}

/** One row of §6.3's anchor table, as data. */
export interface AnchorSpec {
  readonly kind: EntityKind;
  readonly anchor: AnchorType;
  /** §6.3's anchor column, as written. */
  readonly text: string;
  /** `point`: the hysteresis radius in metres, or the table cell that holds it (resolved by `resolveAnchors`). */
  readonly radiusM?: number | CellRef;
  /** `point`: the kind an anchor's `on` names — the entity both anchors must lie on (a bridge's river: `water`). */
  readonly on?: EntityKind;
  /** `overlap` and `ends`: the least overlap a successor shows (§6.3: 50 %). */
  readonly overlap?: number;
  /** §6.3's class-family column, as written ('—': one family); an entity's `family` string is what is compared. */
  readonly family: string;
}

/** One part of a key anchor: an address (resolved through succession), an unordered set of addresses, or a literal. */
export type KeyPart =
  | { readonly ref: Id | null }
  | { readonly set: readonly (Id | null)[] }
  | { readonly lit: string };

/** An entity's anchor; its form follows its kind's `AnchorSpec.anchor`. Coordinates are lattice centimetres. */
export type Anchor =
  /** `point`: the anchor point; `on` — the address of the entity it lies on, when the kind's row names one. */
  | { readonly point: PointCm; readonly on?: Id }
  /** `overlap`: the area (outer ring, then holes). */
  | { readonly area: PolygonCm }
  /** `ends`: the way's two end addresses (null for an end that is no entity) and its spine. */
  | { readonly ends: readonly [Id | null, Id | null]; readonly line: readonly PointCm[] }
  /** `key`: the parts of its key. */
  | { readonly key: readonly KeyPart[] };

/** A generated name handed to a successor with the address, with its naming record (§6.3 *Names follow the address*). */
export interface CarriedName {
  readonly text: NameRef;
  readonly record?: NamingRecord;
}

/** An entity as the routine reads it: an old one (its address) or a fresh one (its provisional id, before the mint). */
export interface MatchEntity {
  /** Old: its address. Fresh: its provisional id (its natural address — minting runs after the matching, §6.3). */
  readonly id: Id;
  readonly kind: EntityKind;
  /** Old: its lineage hash. Fresh: its fresh lineage hash. */
  readonly lineage: Readonly<LineageHash>;
  readonly anchor: Anchor;
  /** Its class family (absent: the kind's one family). */
  readonly family?: string;
  /** A point-anchored kind's area: what covers another entity's anchor point (a tombstone's `supersededBy`). */
  readonly region?: PolygonCm;
  /** The static-index partition it lies in (its district's key, '' outside): read only by the per-partition switch. */
  readonly partition?: string;
  /** Old only: not re-derived (outside the invalidation set, a fixed input, merely re-parented) — it survives. */
  readonly survives?: boolean;
  /** Old only: its generated name, handed on with the address. */
  readonly name?: CarriedName;
}

/** A spatial index's answer for an overlap-anchored kind: the ids of the fresh entities whose geometry meets the box. */
export type CandidateSource = (box: Readonly<Box>) => readonly Id[];

/** The routine's options. */
export interface MatchOptions {
  /** Per overlap-anchored kind (`overlap`, `ends`), the candidate source — the kernel's index (`indexCandidates`). */
  readonly candidates?: ReadonlyMap<EntityKind, CandidateSource>;
  /**
   * §6.3's pre-decided fallback, a switch (off by default): each old entity's candidates are first taken from the
   * fresh entities of its own partition, and only the entities left unmatched are matched across partitions. A
   * declared shift (§6.4): the result says so.
   */
  readonly perPartition?: boolean;
  /**
   * Splits the caller declares (§6.3 *Split through an anchor*, §3.6 (5)): an old point-anchored entity's address → the
   * fresh entities its face was split into, in the kernel's canonical order (the face left of the directed cut first),
   * each carrying its `region`. An old entity the anchor matching leaves without a successor is succeeded by the first
   * of its children not yet assigned whose closed region holds its anchor point — so an anchor on the cut goes to the
   * left child (C-0188).
   */
  readonly splits?: ReadonlyMap<Id, readonly Id[]>;
  /**
   * Called as the whole call begins and ends (`kind` null: the first and the last step of `match`, around the checks,
   * the preparation, the splits and the result) and as each kind's matching begins and ends (the timing harness reads
   * its clock here; C-0190).
   */
  readonly probe?: (kind: EntityKind | null, phase: 'begin' | 'end') => void;
}

/** How a successor was found. */
export type MatchedBy = 'point' | 'overlap' | 'key' | 'split';

/** One outcome (§6.3 *Carry-over*). */
export type Outcome =
  /** An old entity not re-derived: address and lineage kept. */
  | { readonly outcome: 'survive'; readonly kind: EntityKind; readonly id: Id }
  /** An old entity succeeded: `fresh` takes its address and name and keeps its own fresh lineage. */
  | {
      readonly outcome: 'succeed';
      readonly kind: EntityKind;
      /** The address handed on (the old entity's). */
      readonly id: Id;
      /** The successor's provisional id. */
      readonly fresh: Id;
      readonly by: MatchedBy;
      /** `point`: the anchor distance in cm; `overlap`: the overlap (IoU, or the share of the old way's length); `key`, `split`: 0. */
      readonly score: number;
      readonly name?: CarriedName;
    }
  /** An old entity with no successor: archived, `supersededBy` the address of the fresh entity covering its anchor. */
  | { readonly outcome: 'tombstone'; readonly kind: EntityKind; readonly id: Id; readonly lineage: Readonly<LineageHash>; readonly supersededBy?: Id }
  /** A fresh entity with no predecessor: it keeps its fresh address. */
  | { readonly outcome: 'fresh'; readonly kind: EntityKind; readonly id: Id };

/**
 * A `carry` event (§6.3, §2.8's LifecycleEvent kind 'carry'): the lineage change of a succession. Written only when the
 * successor's lineage differs from the old one — a faithful re-derivation writes none (J-DET-2).
 */
export interface CarryEvent {
  /** The address handed on. */
  readonly id: Id;
  readonly entityKind: EntityKind;
  /** The successor's provisional id. */
  readonly fresh: Id;
  readonly lineageFrom: Readonly<LineageHash>;
  readonly lineageTo: Readonly<LineageHash>;
}

/**
 * §6.3's supersedes table (tombstone → successor; exports carry it): the kernel's `CarryMap` shape (C-0089,
 * `ReadonlyMap<Id, Id>`). An entry per tombstone whose anchor a fresh entity covers.
 */
export type SupersedesTable = ReadonlyMap<Id, Id>;

/** Outcome counts. */
export interface MatchCounts {
  survive: number;
  succeed: number;
  tombstone: number;
  fresh: number;
}

/** What `match` returns. */
export interface MatchResult {
  /** Every outcome: kinds in the anchor table's order; within a kind, the old entities by id, then the fresh ones by id. */
  readonly outcomes: readonly Outcome[];
  /** Old address → its outcome (survive, succeed or tombstone). */
  readonly old: ReadonlyMap<Id, Outcome>;
  /** Fresh provisional id → the address it takes: the handed-on one for a successor, its own for a fresh entity. */
  readonly addressOf: ReadonlyMap<Id, Id>;
  /** Fresh provisional id → the old address handed to it (successors only): the mint's `BatchRecord.address`. */
  readonly handedOn: ReadonlyMap<Id, Id>;
  /** One per succession whose lineage changed, by address. */
  readonly carry: readonly CarryEvent[];
  readonly supersedes: SupersedesTable;
  readonly counts: Readonly<MatchCounts>;
  readonly perKind: ReadonlyMap<EntityKind, Readonly<MatchCounts>>;
  /** 'per-partition' when the fallback switch ran (a declared shift, §6.4); null otherwise. */
  readonly fallback: 'per-partition' | null;
}
