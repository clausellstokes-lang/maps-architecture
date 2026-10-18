// The metric input (M0-k-05; §13.5, §13.2's core record, C-0180 (1)): one seed's outputs resolved to plain geometry,
// so every metric is a pure function of numbers. M0 has no document (`.plat` is M1's), so the harnesses that run our
// stages (M0-b-04, M0-c-05's testkit tests, M0-c-06, M0-c-07) resolve the arena's chains and faces into this shape and
// hand it to `METRICS[i].measure(doc)`. Coordinates are integer centimetres in the arena's frame, as the kernel's
// lattice; a ring may be given open or closed (its last vertex equal to its first).
import type { Block, BlockKind, WayClass } from '@plat/model';

/** A point in integer centimetres (the kernel's lattice, unbranded so a harness builds it from plain numbers). */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** NG's hood templates (attachment B of `checks/M0-handoff-M1.md`); a district built on a hood outline carries one. */
export type NgTemplate = 'area' | 'street' | 'square' | 'ring';
export const NG_TEMPLATES: readonly NgTemplate[] = Object.freeze(['area', 'street', 'square', 'ring'] as const);

/** NG's five face-class flags (attachment B), the `class-<flag>` subsets of N-25. */
export const NG_CLASS_FLAGS: readonly string[] = Object.freeze(['holed', 'cShaped', 'triangular', 'curved', 'roundJoined']);

/** A way of the street network (§2.4), its spine resolved to a polyline. */
export interface MetricWay {
  readonly id: string;
  readonly class: WayClass;
  readonly line: readonly XY[];
  /** S5c grew it (the growth-drift row reads grown streets only, §4.4). */
  readonly grown?: boolean;
  /** Grown under an organic regime's heading model (`ou`); the drift row is the organic regimes' (§13.5). Default true. */
  readonly organic?: boolean;
}

/** A block (§2.5), its L2 face resolved to its outer ring. */
export interface MetricBlock {
  readonly id: string;
  readonly district?: string;
  readonly ring: readonly XY[];
  /** `Block.content`; a `square`, `green` or `yard` block is not a built block (C-0180 (4)). */
  readonly content?: BlockKind;
  readonly depthClass?: Block['depthClass'];
  readonly interior?: Block['interior'];
  /** The block's band (the granularity table's band name), for the court share per band. */
  readonly band?: string;
}

/** A district (or an opened hood) with its outline. */
export interface MetricDistrict {
  readonly id: string;
  readonly ring: readonly XY[];
  readonly template?: NgTemplate;
}

/**
 * One bent cut as the signature reads it (§13.5's bent-cut row, §4.6; measured on our cuts by M0-b-04's harness): the
 * snapped start's place along the parent's OBB major axis as a fraction (0 – 1), the course's bends, the corner's place
 * along the course as a fraction (one-bend cuts), the arrival angle in centidegrees, the fillet flag and the fillet-free
 * course length.
 */
export interface MetricCut {
  readonly faceKind: 'plain' | 'ring';
  readonly template?: NgTemplate;
  readonly startT: number;
  readonly bends: number;
  readonly cornerT?: number;
  readonly arrivalCdeg: number;
  readonly fillet: boolean;
  readonly lengthCm: number;
}

/** One seed's outputs as the metrics read them. */
export interface MetricDoc {
  readonly ways: readonly MetricWay[];
  readonly blocks?: readonly MetricBlock[];
  readonly districts?: readonly MetricDistrict[];
  /** The outermost curtain wall's trace as a closed ring; absent when the settlement is unwalled. */
  readonly wall?: readonly XY[];
  readonly cuts?: readonly MetricCut[];
}
