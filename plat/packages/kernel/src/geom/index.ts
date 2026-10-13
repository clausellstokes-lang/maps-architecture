// The geometry services (M0-a-10; §3.1, §3.4, §3.11; C-0040, C-0159): obb · hull · lir (the one contract, GEO-7),
// regularFit, sideRuns, sampleBoundary, faceNeighbours, hexLattice, the curves, the binary heap and Dijkstra / A*.
// `pointLocate` is M0-a-03's and `simplify` M0-a-13's (both read the index).
export { hull } from './hull.js';
export { obb, type Obb } from './obb.js';
export { lir, lirAxes, LIR_LEVELS, LIR_MARGIN, type Lir } from './lir.js';
export { regularFit, type RegularFit } from './regular-fit.js';
export { runTangent, sideRuns, type FaceRings, type Run, type SideRunOptions } from './side-runs.js';
export { faceRings, sampleBoundary } from './boundary.js';
export { faceNeighbours, type FaceNeighbours } from './neighbours.js';
export { hexLattice, type HexLattice } from './hex-lattice.js';
export { catmullRom, chaikin, fillet, laplacianPinned, sampleCubics, type Cubic, type Fillet } from './curves.js';
export { BinaryHeap } from './heap.js';
export { astar, dijkstra, dijkstraTree, graphFromEdges, type CostRaster, type SearchGraph, type SearchPath } from './path.js';
