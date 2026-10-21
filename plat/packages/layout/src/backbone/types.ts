// S4's types (M0-c-03; §4.3, §4.1's S4 row, §4.12 `NetworkStrategy`, §2.4 `Way` / `Junction`, §2.7 `Bridge`, §5.2
// F-ROUTE, §6.3; C-0076, C-0085; readings C-0236). Types only.
import type { LatticePoint } from '@plat/kernel';
import type { Bridge, Gate, Id, Junction, NodeRef, Way, WayClass } from '@plat/model';

/** A point in cm (values, not arena slots). */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** The classes S4 routes and grades (§4.3: F-ROUTE's slope rung relaxes in the order through, primary, track, path). */
export type RouteClass = Extract<WayClass, 'through' | 'primary' | 'secondary' | 'track' | 'path'>;

/** What pins a graph node (§4.3: "gates, attach points, deck ends, landings") — and a through-road's frame end. */
export type PinKind = 'gate' | 'attach' | 'deck_end' | 'frame' | 'landing';

/** One point of a route as S4 commits it. */
export interface RoutePoint {
  readonly at: LatticePoint;
  /** A graph pin: the chains split here and smoothing never moves it (§4.3). */
  readonly pin?: PinKind;
  /** The pinned entity: the gate's id, the plaza's id, the bridge's id. */
  readonly pinId?: Id;
  /** The attach point's ordinal (attach pins) or the deck end's (0 | 1). */
  readonly pinOrdinal?: number;
  /** Held: smoothing keeps the point where it is (a gate's way corridor, C-0226 (10); C-0236 (5)). */
  readonly held?: boolean;
}

/**
 * One route part as S4 commits it (§4.3 *Routes*): a gate route's inward street (plaza attach point ↔ gate) or its
 * outward arterial (gate ↔ the frame at its bearing), in destination order.
 */
export interface S4Route {
  /** The route part's name: `gate:<ordinal>/in` or `gate:<ordinal>/out`. */
  readonly id: string;
  /** Its place in destination order (§6.3: the town's S4 routes in destination order). */
  readonly order: number;
  readonly part: 'inward' | 'outward';
  /** The class the route split gives it (inward `primary`, outward `through`; F-ROUTE's slope rung may relax it). */
  readonly class: RouteClass;
  readonly points: readonly RoutePoint[];
  /** Each deck span on the route: points[at] → points[at + 1] are the bridge's two deck ends (C-0076). */
  readonly spans: readonly { readonly at: number; readonly bridge: Id }[];
  readonly from: NodeRef;
  readonly to: NodeRef;
}

/** A node of the arterial graph (§4.3 *One graph*): a route point, merged by position. */
export interface GraphNode {
  at: LatticePoint;
  pin: PinKind | null;
  pinId: Id | null;
  pinOrdinal: number;
  held: boolean;
  /** The graph edges at the node. */
  edges: number[];
}

/** An edge of the arterial graph: two nodes, the routes that use it (its multiplicity), the bridge its span is. */
export interface GraphEdge {
  a: number;
  b: number;
  /** Indices into the graph's routes, ascending. */
  routes: number[];
  /** The bridge when the edge is a deck span (a fixed edge, §4.3 *Decks*). */
  span: Id | null;
  lengthCm: number;
}

/** A chain of the graph (§4.3: split at every node of degree ≠ 2 and at every pinned node). */
export interface Chain {
  index: number;
  /** Graph nodes in order (from the end with the lower node index of the two, canonically). */
  nodes: number[];
  /** Graph edges in order. */
  edges: number[];
  /** How many routes share it (constant along a chain: every route end is pinned). */
  multiplicity: number;
  /** The routes that use it, ascending. */
  routes: number[];
  /** The bridge when the chain is a deck span. */
  span: Id | null;
  lengthCm: number;
}

/** Two junctions merged on the graph (§4.3: "junctions closer than 8 m are merged on the graph"). */
export interface JunctionMerge {
  /** The node kept and the node merged into it (their points). */
  readonly kept: LatticePoint;
  readonly merged: LatticePoint;
  readonly distanceCm: number;
}

/** Two junctions within the merge distance that were not merged: both pinned, or one a gate (C-0236 (3)). */
export interface JunctionKeptApart {
  readonly a: LatticePoint;
  readonly b: LatticePoint;
  readonly distanceCm: number;
  readonly why: 'both_pinned' | 'gate';
}

/** The arterial graph (§4.3): the union of the routes' edges with their multiplicities, its junctions merged, its chains. */
export interface ArterialGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  chains: Chain[];
  /** The routes as the graph holds them (their points after the junction merge). */
  routes: S4Route[];
  merges: JunctionMerge[];
  keptApart: JunctionKeptApart[];
}

/** One chain's class and width (§4.3: "the class by betweenness", "the width table `ways.widths` keyed by class and rung"). */
export interface ChainClass {
  readonly class: RouteClass;
  /** The width the chain's multiplicity takes inside its class's band at the rung (cm). */
  readonly widthCm: number;
  /** Brandes' edge betweenness of the chain over the plaza-to-destination flows (§17.1 (8); C-0236 (6)). */
  readonly betweenness: number;
  readonly multiplicity: number;
}

/** The arterial graph's way records (§2.4) and what S4 wrote for them. */
export interface Network {
  readonly ways: readonly Way[];
  readonly junctions: readonly Junction[];
}

/** One junction rule as it ran (§4.3 *Junction rules*). */
export interface JunctionRule {
  readonly rule: 'y_to_t' | 'deflect';
  readonly at: LatticePoint;
  /** The chain whose arm was bent. */
  readonly chain: number;
  /** The arm's angle to its neighbour before and after (cdeg). */
  readonly beforeCdeg: number;
  readonly afterCdeg: number;
  /** False where the rule could not apply (the arm cannot bend within its class radius, or would cross). */
  readonly applied: boolean;
}

/** F-ROUTE's rungs as they ran (§5.2; C-0085). */
export interface RouteRung {
  readonly route: string;
  readonly rung: 'another_site' | 'extra_bridge' | 'slope' | 'unserved' | 'work_cut';
  /** another_site: the bridge given up and the one taken (null: none needed, or none found). */
  readonly from?: Id | null;
  readonly to?: Id | null;
  /** slope: the class given up and the class taken. */
  readonly fromClass?: RouteClass;
  readonly toClass?: RouteClass;
  /** work_cut: route.nodes charged and its limit. */
  readonly count?: number;
  readonly limit?: number;
  /** False for a rung that did not hold (the next one runs); extra_bridge is `notBuilt` at M0 (M1). */
  readonly held: boolean;
  readonly why?: string;
}

/** S4's report (§5.4's rows it fills). */
export interface S4Report {
  /** route.nodes charged by S4's own searches (F-ROUTE's re-solves). */
  readonly work: { readonly 'route.nodes': number };
  readonly rungs: readonly RouteRung[];
  /** Parallel runs laid along an earlier route (C-0236 (16)). */
  readonly folds: readonly { readonly route: string; readonly onto: string; readonly from: LatticePoint; readonly to: LatticePoint; readonly lengthCm: number }[];
  readonly merges: readonly JunctionMerge[];
  readonly keptApart: readonly JunctionKeptApart[];
  readonly junctionRules: readonly JunctionRule[];
  /** Chain vertices left below their class's minimum radius after the curvature limit (soft, reported). */
  readonly belowRadius: number;
  /** Chains whose smoothing was given up for the simplified course (it would have crossed something). */
  readonly unsmoothed: number;
  /** Route parts whose course meets the wall off their gate once held to their side at the gate (C-0236 (9), c-03 S3; 0 on the fixtures). */
  readonly offGate: number;
  /** The way edges two or more ways share: 0 when the graph merged every shared run (§4.3; the item's test; c-03 S3). */
  readonly stretchShared: number;
  /** Route parts not committed (F-ROUTE's `unserved`), by id. */
  readonly unserved: readonly string[];
}

/** What S4 wrote: the network, the bridges and gates updated, the chains as inserted, the report. */
export interface S4Result {
  readonly network: Network;
  /** Every bridge of the water set; a site a committed route uses is `built` with its way (C-0076). */
  readonly bridges: readonly Bridge[];
  /** The main gates with their outward way and their junction (§2.7 `Gate.way`, `Gate.junction`). */
  readonly gates: readonly Gate[];
  readonly graph: ArterialGraph;
  readonly classes: readonly ChainClass[];
  /** Each chain's points as inserted (after simplify, junction rules, Chaikin and the curvature limit). */
  readonly spines: readonly (readonly LatticePoint[])[];
  /** The way each chain belongs to. */
  readonly chainWay: readonly Id[];
  readonly report: S4Report;
}
