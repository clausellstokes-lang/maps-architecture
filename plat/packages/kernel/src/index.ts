// @plat/kernel — WHAT THIS IS. The exact, deterministic planar-arrangement engine that the whole map engine runs on, at
// every level: the world level (volume 13), the settlement level (the base design — towns, cities and villages) and the
// site level (volume 14) are all built on these operations, and its guarantees are theirs. It holds a map as an exact
// arrangement on a snap grid (exact predicates, no floating-point drift), so one input yields the same map to the byte on
// every machine; every operation runs inside a transaction with a work budget and refuses with a named code rather than
// produce a wrong map; an invariant suite checks the arrangement after every step. It is the foundation and core of the
// programme — built in M0, the risk-retirement milestone, and hardened before anything is built on it — and its code
// stays a town-free geometry library (tools/lint/kernel-boundary.mjs) so that it can be reused on its own. The owner's
// word of 2026-10-25: docs/AMENDMENTS-2026-10-25y.md, item 984.
// @plat/kernel — the package index (C-0013): it re-exports every module folder's index, and the package's public
// API is their union. A folder's index belongs to the item that builds the folder.
export * from './num/index.js';
export * from './hash/index.js';
export * from './dmath/index.js';
export * from './rng/index.js';
export * from './registry/index.js';
export * from './arena/index.js';
export * from './index/index.js';
export * from './insert/index.js';
export * from './tx/index.js';
export * from './faces/index.js';
export * from './arr/index.js';
export * from './geom/index.js';
export * from './skeleton/index.js';
export * from './medial/index.js';
export * from './warp/index.js';
export * from './invariants/index.js';
export * from './io/index.js';
export * from './facade/index.js';
export * from './noise/index.js';
export * from './digest/index.js';
export * from './types/index.js';
