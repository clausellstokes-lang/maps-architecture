// The S3 slice's data types (M0-c-01; §4.2 S3 (2)–(7), (13), §4.3, §4.4 S5a; C-0016, C-0017, C-0032, C-0076,
// C-0085). Everything here is a value: no arena is written (the commits are M0-c-02's).
import type { ConcernId, Frame, Hash128, LatticePoint, SearchGraph, Stream } from '@plat/kernel';
import type { Destination, GateSite, Terrain } from '@plat/model';
import type { BaseRung, RungProfile, TableView } from '@plat/tables';

/**
 * A crossing site's deck segment (§4.2 S1 (5): a `Bridge` in state `site`, its two `deck_end` vertices on the banks),
 * as the lattice reads it (C-0076): a lattice edge across water is passable only along it.
 */
export interface DeckSegment {
  /** The Bridge's id. */
  id: string;
  /** The deck's two ends (the `deck_end` vertices' points). */
  a: LatticePoint;
  b: LatticePoint;
}

/** The planned water the lattice sees (§4.2 S3 (2), (3)): water faces impassable except along the decks (§4.3). */
export interface WaterPlan {
  /** Each water face's outer ring (lattice points, counter-clockwise). */
  faces: LatticePoint[][];
  decks: DeckSegment[];
}

/** A planned reservation the lattice sees (§4.3's reservationPenalty): impassable inside, reached at its attach points. */
export interface PlannedReservation {
  id: string;
  ring: LatticePoint[];
  /** The points routes end at (the plaza's vertices, §4.2 S3 (2)). */
  attach: LatticePoint[];
}

/**
 * A site as the S3 slice reads it (the flat fixture's output, C-0016, C-0032): the frame, the terrain, the planned
 * water, the stage lands, the single nucleus, the tables and the town root's key.
 */
export interface Site {
  seed: number;
  rung: BaseRung;
  rungProfile: RungProfile;
  tables: TableView;
  frame: Frame;
  /** The frame rectangle as a counter-clockwise lattice ring (the lattice's region; the margin is never the town's land). */
  frameRing: LatticePoint[];
  terrain: Terrain;
  water: WaterPlan;
  /** The nucleus (single at M0, C-0032): the frame centre on the flat fixture. */
  centre: LatticePoint;
  /** The walled area and the stage lands (C-0016), in hectares. */
  land: {
    walledHa: number;
    /** Stage k's land, k = 1 … K (the ribbon last). */
    stagesHa: number[];
    regimes: string[];
  };
  /** The town root's entity key (§6.1): every S3 stream is keyed by it. */
  townKey: Hash128;
  /** A fresh S3 stream of the concern for this site (one derivation per call; attempt 0 unless given). */
  stream(concern: ConcernId, attempt?: number): Stream;
}

/** The edge-cost inputs (§4.3): the slope term's k, the planned water and reservations. */
export interface Costs {
  /** ways.json `graph/kSlope` (C-0158). */
  kSlope: number;
  water: WaterPlan;
  reservations: PlannedReservation[];
  /** The factor an edge along a deck segment costs (C-0076; C-XXXX): 1, the crossing priced by its detour alone. */
  deckPenalty: number;
}

/** §4.3's candidate lattice with its edge costs (§4.2 S3 (3)). */
export interface Lattice {
  spacingCm: number;
  jitterCm: number;
  points: LatticePoint[];
  /** Six per point (E, NE, NW, W, SW, SE), −1 where that lattice point is not kept (the kernel's hexLattice). */
  adjacency: Int32Array;
  /** 1 where the node has all six neighbours: only such a node is the town's land (C-XXXX). */
  interior: Uint8Array;
  /** 1 where the node lies on the lattice's edge (fewer than six neighbours): the frame's nodes the gate routes end at. */
  rim: Uint8Array;
  /** 1 where the node lies inside a planned water face: never the town's land, reached by the level set only across
   * the water from its banks (C-XXXX (8)). */
  water: Uint8Array;
  /** Per node, the terrain's slope there (rise over run, the TerrainSampler's): the pick score's terrain term. */
  slope: Float64Array;
  /** The nominal cell area of a node (s²·√3 ÷ 2, cm²): what the level set accumulates. */
  cellAreaCm2: number;
  /** The edges in compressed rows, in direction order per node; weights the §4.3 cost (+∞ impassable). */
  graph: SearchGraph;
  /** slot[6·i + d]: the graph edge of node i in direction d, or −1. */
  slot: Int32Array;
  /** Per graph edge, its length (cm). */
  length: Float64Array;
  /** The least cost per cm of any passable edge (the A* heuristic's factor). */
  minCostPerCm: number;
  /** The largest distance of a rim node from the frame's edge (cm): the heuristic's slack. */
  rimInsetCm: number;
  /** The frame rectangle the lattice covers. */
  frame: { minX: number; minY: number; maxX: number; maxY: number };
  /** The reservations' interior nodes (the plaza's): the field's sources besides the attach nodes. */
  reservedNodes: number[];
  /** Per reservation, per attach point, the lattice node a route ends at (§4.2 S3 (2)). */
  attachNodes: number[][];
  costs: Costs;
}

/** The plaza-rooted Dijkstra tree (§4.2 S3 (5)): over the lattice from every attach node of the plaza. */
export interface PlazaTree {
  lattice: Lattice;
  dist: Float64Array;
  prev: Int32Array;
  /** The nodes the tree settled (route.nodes' charge for the tree). */
  settled: number;
}

/** A gate pick (§4.2 S3 (4)): a node on the pick contour, its ordinal, and the candidates ranked for a re-draw. */
export interface GatePick {
  ordinal: number;
  node: number;
  at: LatticePoint;
  /** The candidate nodes in score order, the pick first (F-WALL's re-draw reads the next, §4.2 S3 (7)). */
  ranked: number[];
  /** The bearing it serves when one was requested (cdeg); absent: the route's least-cost outward bearing. */
  requestedBearingCdeg?: number;
  forced: boolean;
}

/** A solved gate route (§4.2 S3 (5)): attach point → pick → frame, as lattice nodes, with its outward bearing. */
export interface GateRoute {
  ordinal: number;
  /** The plaza attach point it ends at (§4.2 S3 (2)): the route's first point. */
  attach: LatticePoint;
  /** Which attach point of the plaza. */
  attachIndex: number;
  /** The lattice nodes from the attach node through the pick to the rim. */
  nodes: number[];
  /** Index of the pick within `nodes`. */
  pickAt: number;
  /** The least-cost outward direction from the pick to the frame (cdeg), or the requested bearing. */
  bearingCdeg: number;
  cost: number;
  /** route.nodes charged by the heap A* beyond the pick. */
  charged: number;
}

/** A route F-ROUTE's `unserved` rung took (F-WORK's route.nodes, C-0085). */
export interface UnservedRoute {
  ordinal: number;
  code: 'work_cut' | 'unserved';
  count: number;
  limit: number;
}

/** The field T (§4.4 S5a, §4.2 S3 (6)): per lattice node its travel cost from the plaza(s). */
export interface Field {
  lattice: Lattice;
  T: Float64Array;
  /** 1 on the edges of the road set (both directions), by graph edge. */
  road: Uint8Array;
  a: number;
}

/** t chosen by accumulated cell areas (§4.2 S3 (6); §4.4 S5a): exact to one cell, capped at the reachable land. */
export interface Threshold {
  t: number;
  /** The land of the nodes the threshold takes (cm²). */
  landCm2: number;
  /** The land asked (cm²). */
  askedCm2: number;
  capped: boolean;
  /** asked − land when capped, else 0 (cm²): requestedVsBuilt's figure. */
  shortfallCm2: number;
}

/** The stage's level set (C-0017): the selected nodes, the exact contour and the simplified, smoothed outline. */
export interface LevelSet {
  field: Field;
  t: number;
  /** 1 on the selected nodes: interior nodes with T ≤ t, and any unselected pocket they enclose (filled, C-XXXX). */
  selected: Uint8Array;
  /** The pocket nodes filled into the selection. */
  filled: number;
  landCm2: number;
  /** The marching-triangle ring at ½ (crossings at edge midpoints, snapped), counter-clockwise. */
  contour: LatticePoint[];
  /** Per contour vertex, the lattice edge it lies on as [inside node, outside node]. */
  contourEdges: [number, number][];
  /** Every ring the marching found (one on a connected selection). */
  rings: number;
  /** The contour simplified and Chaikin-smoothed with the pins kept (§4.4 S5a, C-0017). */
  outline: LatticePoint[];
  /** The Chaikin passes the outline kept (a pass that would move a node across it is not applied, C-XXXX). */
  smoothPasses: number;
}

/** A gate (§4.2 S3 (7)): the first point of its route at T = t₁, on the boundary by construction. */
export interface Gate {
  ordinal: number;
  at: LatticePoint;
  /** The route's lattice edge the gate lies on, as [inside node, outside node] — the contour's crossing there. */
  edge: [number, number];
  /** The index of the edge's inside node within the route's nodes. */
  routeIndex: number;
  bearingCdeg: number;
}

/** F-WALL's gate rungs as they ran (§4.2 S3 (7), C-0085): each re-draw and each drop, reported. */
export interface GateRung {
  rung: 'redraw' | 'drop';
  ordinal: number;
  /** The pick ordinal whose gate it coincided with. */
  with: number;
  /** The re-draw's attempt (1 … 3); 0 for a drop. */
  attempt: number;
  from: number;
  /** The new candidate node (re-draw), or −1 (drop). */
  to: number;
}

/** The plaza (§4.2 S3 (2)): a compact polygon at the nucleus whose vertices are the attach points. */
export interface Plaza {
  ring: LatticePoint[];
  areaCm2: number;
  compactness: number;
  vertices: number;
}

/** The whole S3 slice as data (C-0032): everything M0-c-02 commits and M0-c-03 routes. */
export interface S3Slice {
  site: Site;
  plaza: Plaza;
  lattice: Lattice;
  /** The pick contour (the a = 1 field's level set of stage 1's land). */
  pickSet: LevelSet;
  /** N₁ by the land law (or the request). */
  n: number;
  picks: GatePick[];
  routes: GateRoute[];
  field: Field;
  threshold: Threshold;
  levelSet: LevelSet;
  gates: Gate[];
  gateSites: GateSite[];
  destinations: Destination[];
  report: S3Report;
}

/** The slice's report (§5.4's rows it fills). */
export interface S3Report {
  /** route.nodes charged: the tree's settled nodes, then each route's A*. */
  work: { 'route.nodes': number };
  routeNodesLimit: number;
  gateRungs: GateRung[];
  unserved: UnservedRoute[];
  /** The stage-1 land's shortfall when t₁ was capped (cm²; requestedVsBuilt). */
  shortfallCm2: number;
  /** Gates dropped, so main gates < N (reported, F-WALL). */
  gatesDropped: number;
}
