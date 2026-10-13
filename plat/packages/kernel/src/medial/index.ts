// The sampled medial axis (M0-a-12; §3.8's `spine` downgrade, C-0007): `medialAxis(rings, stepCm)` over the Delaunay
// adapter's triangulation of the 1 m boundary samples, the Voronoi dual with our own circumcentres, pruned by clearance
// (C-0172, C-0176). Not a façade member (C-0078). This index also re-exports the adapter's `delaunay` (the adapter folder
// has no index; §14's one importer of the library stays `adapters/delaunator.ts`).
export { delaunay, nextHalfEdge, type Delaunay } from '../adapters/delaunator.js';
export { circumcentres, voronoiEdges, type VoronoiEdge } from './dual.js';
export {
  medialAxis,
  MEDIAL_CROSS_SLACK_CM,
  MEDIAL_MERGE_CM,
  MEDIAL_PRUNE_RATIO,
  MEDIAL_REFINE_CAP,
  MEDIAL_REFINE_FLOOR_CM,
  MEDIAL_REFINE_MARGIN_CM,
  MEDIAL_STEP_CM,
  MEDIAL_TOUCH_CM,
  type MedialArc,
  type MedialAxis,
  type MedialNode,
} from './axis.js';
