// S6's types (M0-e-04; §4.5 *Perimeter*, *Grower*, *Quarters*, *Typing*; §4.1's S6 row; §6.1 `district.seed`,
// `district.type`; §6.3; §9.1 `QuarterNode`; C-0035, C-0046, C-0085; readings C-0245). Types only.
import type { LatticePoint, LineageHash } from '@plat/kernel';
import type { District, Id, NameRef, Seam } from '@plat/model';

/** A point in cm (values, not arena slots). */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/**
 * A seed's kind (§4.5 *Grower*): the sited features M0 has — the market (the principal plaza's reservation), the gates,
 * the river banks, the bridgeheads — the castle, temple, harbour and park kinds the design names (no M0 stage sites
 * them), the density-guided remainder and the leftover rule's seeds.
 */
export type SeedKind = 'market' | 'gate' | 'castle' | 'bridgehead' | 'riverbank' | 'temple' | 'harbour' | 'park' | 'remainder' | 'leftover';

/**
 * One enceinte's wall line (C-0257): a walled growth stage's (§4.4 S5a; stage 1's S3's trace), by the enceinte's id —
 * the id each of its gates names (`Gate.enceinte`).
 */
export interface WallLine {
  readonly enceinte: Id;
  /** The wall's closed line (lattice points, either orientation). */
  readonly line: readonly XY[];
}

/**
 * Where a sited feature seeds its district (C-0245 (4), C-0257): the claimable coarse face sharing the longest boundary
 * with the faces an entity owns (a reservation: the market's plaza); the claimable face nearest a point (a gate's
 * vertex, a bridgehead's landward deck end) — only among the faces lying inside `within` and outside every ring of
 * `outside` when they are given (a gate's ward behind its own wall and outside every inner enceinte; none left there:
 * the feature is dropped and reported); or the claimable face with the longest shore or bank of a water body (a river
 * bank).
 */
export type SeedAnchor =
  | { readonly kind: 'owner'; readonly owner: Id }
  | { readonly kind: 'point'; readonly at: XY; readonly within?: readonly XY[]; readonly outside?: readonly (readonly XY[])[] }
  | { readonly kind: 'shore'; readonly body: Id };

/** A sited feature that seeds a district (§4.5 *Grower*'s "Seeds = the sited features"). */
export interface SeedFeature {
  /** The feature's address: its seed lineage is keyed by it (§4.5; §6.1 `district.seed`). */
  readonly id: Id;
  readonly kind: SeedKind;
  readonly anchor: SeedAnchor;
}

/** One grower's seed (§4.5): its place in seed-id order, its kind and rate, its seed face, its lineage. */
export interface GrowSeed {
  /** Seed-id order: the sited features first, in their order, then the remainder, then the leftover rule's. */
  readonly order: number;
  readonly kind: SeedKind;
  /** Its seed face (an index of the face graph). */
  readonly face: number;
  /** The grower's seed lineage (its feature's; a remainder or leftover seed's first face's), keying its turns. */
  readonly lineage: Readonly<LineageHash>;
  /** `district.growthRate` of its kind: the chance a turn is not skipped. */
  readonly rate: number;
  /** The feature that seeded it (its namingFeature). */
  readonly feature?: Id;
}

/** One grower's turn as it ran (the turn log the renumbering identity compares). */
export interface TurnRecord {
  /** The grower's seed order. */
  readonly seed: number;
  /** The grower's own turn number (0, 1, …): the creation index of the turn's stream key. */
  readonly turn: number;
  /** 'skip', 'absorb' (with the face index), or 'done' (no admissible neighbour). */
  readonly what: 'skip' | 'absorb' | 'done';
  readonly face?: number;
}

/** A district as the grower made it (before the merge rule removes those below the floor). */
export interface Grown {
  readonly seed: GrowSeed;
  /** Its faces (face-graph indices), the seed face first, then in absorption order. */
  readonly faces: number[];
  areaCm2: number;
  perimeterCm: number;
  turns: number;
  /** Merged into another district (its seed order), or −1. */
  mergedInto: number;
}

/** One merge of the merge rule (§4.5): a district below the floor into its longest-shared-edge neighbour. */
export interface MergeRecord {
  readonly from: number;
  readonly into: number;
  readonly sharedCm: number;
  readonly areaCm2: number;
}

/** The grower's result (§4.5 *Grower*; F-WORK's rung, C-0085). */
export interface GrowResult {
  /** Every grower, in seed-id order (merged ones carry `mergedInto`). */
  readonly grown: Grown[];
  /** Per face index: the seed order of the grower that holds it, −1 for none (a face outside the claimable set). */
  readonly owner: Int32Array;
  /** grower.turns charged. */
  readonly turns: number;
  readonly turnLimit: number;
  /** F-WORK (C-0085): grower.turns reached, the leftover rule assigned every face still unowned. */
  readonly workCut: boolean;
  readonly log: TurnRecord[];
  readonly merges: MergeRecord[];
  /** The leftover rule's seeds (their seed orders). */
  readonly leftovers: number[];
  /** Districts left below the floor: rate < 1 (kept, §4.5), or with no neighbour across an edge that passes the test. */
  readonly belowFloor: number[];
}

/** One district's typing (§4.5 *Typing*; C-0035): its kind and its use mix under the mixed-use floor. */
export interface DistrictTyping {
  readonly district: Id;
  readonly kind: string;
  /** The use mix: [kind, share] pairs, its own kind first, the shares summing to 1 (C-0245 (12)). */
  readonly mix: readonly (readonly [string, number])[];
  /** The scores the scorer read, per kind (−Infinity: a `require` row failed). */
  readonly scores: readonly (readonly [string, number])[];
}

/**
 * §9.1's QuarterNode (built by S6, §4.5): its district members, its two children (null for a leaf), its name and
 * label spine (S13a's; empty at M0, C-0245 (14)), and whether it is one of the city cut's nodes.
 */
export interface QuarterNode {
  id: Id;
  members: Id[];
  children: [Id, Id] | null;
  name: NameRef;
  spine: LatticePoint[];
  cityCut: boolean;
}

/** S6's report (§5.4's rows it fills). */
export interface S6Report {
  /** grower.turns charged and its limit. */
  readonly work: { readonly 'grower.turns': number; readonly limit: number };
  /** F-WORK's rung (C-0085): 'work_cut' with the count when grower.turns was reached. */
  readonly workCut: { readonly code: 'work_cut'; readonly count: number; readonly limit: number } | null;
  /** The settlement's land A (ha), N_d and the band (ha). */
  readonly landHa: number;
  readonly nd: number;
  readonly bandHa: readonly [number, number];
  readonly seeds: number;
  /** Sited features with no claimable face left to seed (their ids). */
  readonly seedsDropped: readonly Id[];
  readonly leftovers: number;
  readonly merges: number;
  readonly belowFloor: number;
  /** N_q and L (§4.5 *Quarters*). */
  readonly nq: number;
  readonly districts: number;
  /** Coarse faces inside the perimeter that no district holds (0: containment by construction). */
  readonly unowned: number;
}

/** What S6 writes (the data keys it declares). */
export interface S6Output {
  readonly districts: District[];
  readonly seams: Seam[];
  readonly quarters: QuarterNode[];
  readonly typing: DistrictTyping[];
  /** The hinterland pseudo-district's owner id (every coarse face outside the perimeter). */
  readonly hinterland: Id;
  /** The perimeter as inserted (counter-clockwise ring). */
  readonly perimeter: LatticePoint[];
  /** Each district's lineage (S8 keys its cells by it, §6.3). */
  readonly lineages: ReadonlyMap<Id, Readonly<LineageHash>>;
  readonly grow: GrowResult;
  readonly report: S6Report;
}
