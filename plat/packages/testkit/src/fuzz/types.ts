// The fuzz generators' own types (M0-k-01; §13.1 (1)). Every shape is written in the kernel's types — a lattice point
// is the kernel's `LatticePoint` (integer centimetres, +y north, §2.2), a holed polygon the kernel's `PolygonCm` (the
// outer ring, then the holes; §2.8) — so a generated input goes to a kernel primitive unchanged.
import type { LatticePoint, PolygonCm } from '@plat/kernel';

/** A closed ring: its last vertex joins its first, which is not repeated (a repeated closing vertex is a duplicate). */
export type FuzzRing = LatticePoint[];

/** An open chain (a polyline): at least two vertices, its ends not joined. */
export type FuzzChain = LatticePoint[];

/** Which form a class arbitrary yields: a closed ring or an open chain (§13.1 (1): "polygons and chains"). */
export type FuzzShape = 'polygon' | 'chain';

/** Where a generated shape may lie and how large it is. */
export interface FuzzBoundsOptions {
  /**
   * Every coordinate lies in [−limitCm, limitCm]; default 2²³ − 1, the largest |v| `snap` accepts (§3.2 (1)); at
   * least `FUZZ_MIN_LIMIT_CM`.
   */
  limitCm?: number;
  /** The shape's size in cm — its circumradius (rings around a centre) or its step length (chains); see each arbitrary. */
  sizeCm?: readonly [number, number];
}

/** A class arbitrary's options: the bounds and the form. */
export interface FuzzShapeOptions {
  /** `polygon` (the default) or `chain`. */
  shape?: FuzzShape;
  /** As `FuzzBoundsOptions.limitCm`. */
  limitCm?: number;
}

/** How a hole meets its outer ring: not at all, at one point, or along a stretch of positive length. */
export type FuzzHoleContact = 'disjoint' | 'vertex' | 'edge';

/** A holed polygon: the kernel's `PolygonCm` (outer ring counter-clockwise, then each hole clockwise) with each hole's contact. */
export interface FuzzHoledPolygon {
  polygon: PolygonCm;
  /** `contacts[j]` is how `polygon[j + 1]` meets `polygon[0]`. */
  contacts: FuzzHoleContact[];
}
