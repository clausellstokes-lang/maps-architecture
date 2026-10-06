// The Kernel façade (M0-a-16; §14 `interface Kernel`, §3.4's complete list, §6.1 / §14 `Rng.stream`; C-0041, C-0078,
// C-0089, C-0112; readings C-0219): createKernel over a map of PlatKey → Plat (doc-less at M0), GeomOps (§3.4 under its
// design names), LevelView, the notBuilt stubs and their table, the engine id of the report, the slot stamps, and the
// keys and carry map this item declares (TransientKey, ArenaKey, CarryMap). The Rng is M0-d-01's (../rng/), wired here
// as `Kernel.rng`; the arena block and the medial axis are no façade members (C-0078).
export { createKernel, isTransientKey, type KernelOptions } from './kernel.js';
export { isNotBuilt, notBuilt, STUB_TABLE, type StubForm, type StubRow } from './notBuilt.js';
export { ENGINE_ID, ENGINE_VERSION } from './engine.js';
export { stampOf } from './stamp.js';
export type { ArenaKey, CarryMap, GeomOps, IndexOps, Kernel, LevelView, Milestone, NotBuiltStub, OnTx, RingClaim, TransientKey } from './types.js';
