// S1's L0 batch types (M0-e-03; §4.2 S1 (5), (8), (9), §2.3, §2.7, §4.1's S1 row, §4.12's WaterSet): a water body
// with its polygon (the reach S1 (5) sites crossings on and S1 (8) enters into L0), a crossing site as data, a land
// component, the batch's result and the stage's input and output. Types only.
import type { FaceId, Kernel, LatticePoint, Warning } from '@plat/kernel';
import type { Bridge, FaceRef, Id, Terrain, WaterBody, WaterSet } from '@plat/model';

/**
 * One part of a water body's polygon: an outer ring (counter-clockwise) with its holes (clockwise), and the body's own
 * course points that lie inside it by at least SEED_DEPTH_CM — each names the part's L0 face in the arena (C-0225 (3)).
 */
export interface WaterPart {
  rings: LatticePoint[][];
  seeds: LatticePoint[];
}

/** A water body with its polygon: the reach S1 (5) sites crossings on and S1 (8) inserts as its L0 face. */
export interface WaterReach {
  body: WaterBody;
  parts: WaterPart[];
}

/** A body S1's water could not give a polygon (a course of fewer than two points, or no part left past the slivers). */
export interface DroppedBody {
  id: Id;
  reason: 'course' | 'empty';
}

/** A deck already standing (`existingDecks`): its two bank points. */
export type Deck = readonly [LatticePoint, LatticePoint];

/**
 * A crossing site (§4.2 S1 (5)): a bank-to-bank deck perpendicular to the local flow, its two ends the bank points
 * the L0 batch inserts into the reach's shore as `('deck_end', bridge, 0 | 1)` — 0 the left bank looking downstream.
 */
export interface CrossingSite {
  /** The reach's water body. */
  water: Id;
  /** `ford` below crossing.fordMaxWidthM, else `bridge_site`. */
  type: 'ford' | 'bridge_site';
  /** The deck's ends on the polygon's shore, snapped: [left bank, right bank]. */
  deck: [LatticePoint, LatticePoint];
  /** The bank-to-bank span, cm (rounded). */
  spanCm: number;
  /** The course point the deck crosses at: its arc length from the reach's first course point, cm. */
  arcCm: number;
  /** The course point itself. */
  at: LatticePoint;
  /** The flow direction there (unit; the course tangent averaged over one channel width up and downstream). */
  flow: { x: number; y: number };
  /** Where each end sits on the reach's polygon: the part, the ring and the segment it splits. */
  ends: [{ part: number; ring: number; seg: number }, { part: number; ring: number; seg: number }];
}

/** A land component (§4.2 S1 (8)): the connected land of L0, by flood fill of its faces. */
export interface LandComponent {
  /** `land:<n>`, numbered in canonical face order. */
  id: Id;
  face: FaceRef;
  /** Its L0 faces, in canonical order (valid until the next commit). */
  faces: FaceId[];
}

/** The L0 water batch's result (`waterFaces`). */
export interface WaterFaces {
  /** Per reach in order: its L0 faces (canonical order). */
  faces: FaceId[][];
  land: LandComponent[];
  bridges: Bridge[];
}

/** What S1's L0 batch reads (§4.1's S1 row): the terrain, the water S1 (3) traced, the river's mouth, and the façade. */
export interface S1Input {
  terrain: Terrain;
  water: WaterSet;
  /** The river request's mouth (§4.2 S1 (3) *Mouths*): `estuary` or `delta` types the widened last reach `estuary`. */
  mouth?: 'none' | 'estuary' | 'delta';
  /** Decks already standing on this water (S1's water operator re-run; none at generation). */
  existingDecks?: readonly Deck[];
  /** The kernel façade over the ground arena (§14), handed by the runner (C-0225 (1)). */
  kernel: Kernel;
}

/** What S1's L0 batch writes (§4.12's `terrain` and `water` keys): the water with its decks, the land, the report. */
export interface S1Output {
  terrain: Terrain;
  water: WaterSet;
  land: LandComponent[];
  sites: CrossingSite[];
  report: S1Report;
}

/** The batch's report: dropped bodies, the commits' versions, the stage-end invariant rows, the kernel's warnings. */
export interface S1Report {
  dropped: DroppedBody[];
  /** The bodies whose polygon took the kernel's buffer and booleans, with the fast ring's refusal (C-0225 (2)). */
  fallbacks: { id: Id; why: string }[];
  /** The arena's version after the outer ring's batch and after the water's. */
  versions: [number, number];
  /** §3.10's stage-end rows (`checkStageEnd`), each holding. */
  stageEnd: { name: string; holds: boolean; count: number }[];
  warnings: Warning[];
}
