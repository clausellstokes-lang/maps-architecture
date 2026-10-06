// Test support for M0-a-16's façade tests: §3.4's complete list and §14's Kernel members as the design writes them
// (copied here from docs/ARCHITECTURE.md §3.4's code block and §14's `interface Kernel`, in their order — the checker
// diffs these lists against the design), a kernel over one framed arena, and the arena's slot-free print.
import { createPlat, type Plat } from '../../src/arena/index.js';
import type { SpineWidths } from '../../src/arr/index.js';
import { createKernel, type Kernel } from '../../src/facade/index.js';
import { attachIndex } from '../../src/index/index.js';
import type { PlatKey } from '../../src/types/index.js';
import { FRAME } from '../arena/support.js';
import { crossing, widthsOf } from '../arr/bands/support.js';
import { CELLS } from '../insert/step1-2/support.js';
import { commit, framed, healthy, pt, spec, state } from '../tx/support.js';

export { commit, crossing, framed, healthy, pt, spec, state, widthsOf };

/** §3.4's writers, in §3.4's order. */
export const WRITERS = [
  'insertChain', 'splitThrough', 'removeEdges', 'clearFiner', 'retypeEdges', 'setOwner', 'splitFace', 'connectHole',
  'mergeFaces', 'absorbSliver', 'claimSubFace', 'radialSplit', 'ringBand', 'corridorUnion', 'bandUnion', 'warp',
  'pinVertices',
] as const;

/** §3.4's services, in §3.4's order (the `obb · hull · lir` and `sampleBoundary · pointLocate · …` lines expanded). */
export const SERVICES = [
  'resolve', 'resolveVertexAt', 'signature', 'sampleProfile', 'kerb', 'booleans', 'tileRings', 'buffer', 'offsetFace',
  'insetRing', 'skeleton', 'simplify', 'hexLattice', 'obb', 'hull', 'lir', 'sideRuns', 'sampleBoundary', 'pointLocate',
  'faceNeighbours', 'area2', 'area2Big', 'orient', 'regularFit',
] as const;

/** §3.4 *Transient arenas*' three functions. */
export const TRANSIENT = ['transientArena', 'readBack', 'release'] as const;

/** §3.4's complete list. */
export const SECTION_3_4: readonly string[] = [...WRITERS, ...SERVICES, ...TRANSIENT];

/** §14's `interface Kernel` members. */
export const KERNEL_MEMBERS = ['plat', 'view', 'resolve', 'geom', 'index', 'tx'] as const;

/** The ground arena's key. */
export const GROUND: PlatKey = { layer: 'ground', part: 0 };

/** A second arena's key (a raised way's part, §3.4). */
export const RAISED: PlatKey = { layer: 'ground', part: 1 };

/** Two crossing ways of half-width 300 cm (the bands' support's `crossing()` network). */
export const W300: SpineWidths = widthsOf({ 'way:1': 300, 'way:2': 300 });

/** An empty indexed arena under `key`. */
export function emptyOn(key: PlatKey): Plat {
  const p = createPlat(key, FRAME);
  attachIndex(p, { gridCellCm: CELLS });
  return p;
}

/** A kernel over `plats` (each under its own key), with the spines' widths (null: none declared). */
export function kernelOver(plats: readonly Plat[], widths: SpineWidths | null = W300): Kernel {
  const m = new Map<PlatKey, Plat>();
  for (const p of plats) m.set(p.key, p);
  return createKernel(m, widths === null ? {} : { spineWidths: widths });
}
