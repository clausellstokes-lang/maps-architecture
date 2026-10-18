// The kernel's shared types (M0-a-01, C-0112): the unit brands and the point shapes (§2.1, §2.2, §2.8). Types only —
// this folder emits no runtime value (test/types/ holds it). @plat/model re-exports every one under its design name.
//
// A unit brand is the design's ConcernId pattern (§14): a number intersected with a read-only marker no value carries,
// so a plain number is not a `Cm` — a number becomes an arena coordinate only through snap() (§3.2 (7)), whose result
// is the one place a coordinate is minted (C-0134 (9)).

/** Integer centimetres (§2.1): a model length; an arena coordinate only through snap() (§3.2 (7)). */
export type Cm = number & { readonly __brand: 'Cm' };

/** Metres: a derived or reported length, never an arena coordinate (§2.8). */
export type M = number & { readonly __brand: 'M' };

/** Centidegrees, an i32: the model's one angle unit (§2.1, §2.8). */
export type Cdeg = number & { readonly __brand: 'Cdeg' };

/** Integer centimetres per element (§2.8). */
export type CmArray = Int32Array & { readonly __brand: 'CmArray' };

/** A position in an arena (§2.2); which records may hold a vertex's position is §2.2 rule 5's. */
export type LatticePoint = { x: Cm; y: Cm };

/** One point shape (§2.2), three names (§2.8). */
export type PointCm = LatticePoint;
export type Point = PointCm;
export type VecCm = PointCm;

/** One ring (§2.8). */
export type Polygon = PointCm[];

/** The outer ring, then the holes (§2.8). */
export type PolygonCm = PointCm[][];
