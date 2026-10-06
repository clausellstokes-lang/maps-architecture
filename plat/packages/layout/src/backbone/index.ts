// @plat/layout's backbone module (M0-c-03; §4.3 S4 Backbone, §4.1's S4 row, §4.12 `NetworkStrategy` (the S4 part),
// §2.4 `Way` / `Junction`, §2.7 `Bridge`, §5.2 F-ROUTE and F-WORK, §6.3, §13.2, §17.1 (8); C-0076, C-0085; readings
// C-0234): S4 as a declared-form stage — S3's gate routes committed as one graph with one smoothing, class and width by
// multiplicity and betweenness, width knots, Y → T and the 30° rule, through-roads to the frame, spans through crossing
// sites' deck ends — and S4's router with F-ROUTE's M0 rungs. Created empty by the scaffold (M0-s-01, C-0013); this
// index and its folder belong to M0-c-03.
export type { ArterialGraph, Chain, ChainClass, GraphEdge, GraphNode, JunctionKeptApart, JunctionMerge, JunctionRule, Network, PinKind, RouteClass, RoutePoint, RouteRung, S4Report, S4Result, S4Route } from './types.js';
export { arterialGraph, chainPoints, foldParallel, FOLDS_PER_ROUTE, pointKey, type ParallelFold } from './graph.js';
export { chainBetweenness, CLASS_ORDER, classGeometryCm, classify, classRank, PROMOTE_FLOWS, wayRow, widthAt, widthBandCm, type ClassifyOptions } from './classify.js';
export { belowRadiusAt, chaikinRuns, countBelowRadius, CURVATURE_PASSES, curvatureLimit, finishChain, simplifyChain, smoothChain, toLattice, type Simplified, type Smoothed, type SmoothOptions } from './smooth.js';
export { ACUTE_MAX_CDEG, angleBetweenCdeg, armsAt, DEFLECT_MARGIN_CDEG, directionCdeg, junctionAngles, junctionNodes, junctionRules, THROUGH_MIN_CDEG, type Arm, type JunctionRuleOptions } from './junctions.js';
export { approachUsable, crossingsOf, insideTurningCircles, routeGraph, routeLadder, solve, type Crossing, type Laddered, type LadderOptions, type RouteGraph, type Solved, type SolveOptions } from './route.js';
export { commitRoutes, GROUND_PART0, S4_COUNTERS, s4WorkLimit, type CommitRoutesOptions } from './commit.js';
export { baseNetwork, NETWORK_STRATEGY_ID, partLeavesWall, routesFromSlice, runS4, s4Stage, type NetworkOptions, type NetworkStrategy, type S4Input, type S4Options, type S4Output } from './stage.js';
