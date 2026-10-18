// The kernel's shared types (M0-a-01, C-0112): the only forms in which an entity, a seam contract, an edit event or an
// API scope refers to geometry (§2.2 rule 5), the vertex signature and the chain profile. Types only; re-exported by
// @plat/model. The forms are declared exactly as §2.2 writes them — no discriminant field, since they are persisted
// shapes — so `VertexRef` and `EdgeSetRef` are structurally one shape and the view is the reader's (§3.4's `resolve`
// and the role registry's kind of the role, §2.2 rule 7; C-0134 (9)). None carries an arena slot (rule 5).
import type { Id, Level } from './ids.js';
import type { LatticePoint } from './units.js';

/** A role's name in the role registry (§2.2 rule 7) — interned to a u16 inside the arena, a string everywhere else. */
export type RoleName = string;

/** A role row's identity, without its level (§2.2). */
export type RoleKey = { role: RoleName; entity: Id; ordinal: number };

/** View: the faces whose owner at that level is the entity (§2.2). */
export type FaceRef = { owner: Id; level: Level };

/** View: the ordered edge chain carrying (role, entity) (§2.2). */
export type ChainRef = { role: RoleName; entity: Id };

/** View: the unordered edges carrying (role, entity[, ordinal]) (§2.2). */
export type EdgeSetRef = { role: RoleName; entity: Id; ordinal?: number };

/** View: the vertex carrying (role, entity[, ordinal]) (§2.2). */
export type VertexRef = { role: RoleName; entity: Id; ordinal?: number };

/** View: the chain's edges between two of its vertices; batch-local, never stored in an entity record (§2.2 rule 5). */
export type StretchRef = { chain: ChainRef; from: VertexRef | LatticePoint; to: VertexRef | LatticePoint };

/** Every stored geometry reference: exactly the five forms (§3.4's `resolve(ref: GeomRef, key)`). */
export type GeomRef = FaceRef | ChainRef | EdgeSetRef | VertexRef | StretchRef;

/** A vertex's signature at the time of an edit (§2.2 rule 5, *Positions in the log*). */
export interface VertexSig {
  /** The vertex's own (role, entity, ordinal) rows, sorted. */
  v: RoleKey[];
  /** The structural (role, entity) rows of its incident edges, sorted, deduplicated. */
  e: RoleKey[];
}

/** §2.7's laws' *Order*: the laying event's place and its step's place (a stretch-state profile's value). */
export type Order = { seq: number; step: number };

/**
 * A value that varies along an entity's chain (§2.2 rule 5): never an array indexed by the chain's vertices; an
 * `Order` only as a stretch-state profile (`interp: 'step'`).
 */
export interface ChainProfile<T extends number | string | Order = number> {
  /** The registry's knot role for this attribute (§2.2 rule 7). */
  knotRole: RoleName;
  /** values[i] belongs to the chain vertex carrying (knotRole, entity, i). */
  values: T[];
  interp: 'linear' | 'step';
}
