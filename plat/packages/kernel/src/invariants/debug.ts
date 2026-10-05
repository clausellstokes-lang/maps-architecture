// The debug-build assertion mode for slot stamps (§3.4 *Arenas, keys and services*; §3.10's arena-isolation row:
// "by construction; debug-build assertion"): every slot a caller holds comes from a result stamped with its arena's key
// and version, and a debug build asserts, wherever the slot is passed, that the key is the arena the call acts on and
// the version is current. The build flag (C-0146 (6) hands it here) is the free identifier `PLAT_DEBUG_BUILD`: a
// production bundle defines it `false` (esbuild's `define`), which turns the mode off so no slot assertion runs;
// every source run (vitest, the plat-source condition) and every bundle that does not define it is a debug
// build. M0-a-14. Readings: C-0200 (10).
import { assertStamp, debugAssertions, isFaceLive, isHalfEdgeLive, isLevel, isVertexLive, setDebugAssertions, type Plat, type Stamp } from '../arena/index.js';
import type { Level } from '../types/index.js';

/** The build flag: a bundler's `define` replaces it; undefined in a source run. */
declare const PLAT_DEBUG_BUILD: boolean | undefined;

/** Whether this build is a debug build (the flag absent or true). */
export const DEBUG_BUILD: boolean = typeof PLAT_DEBUG_BUILD === 'undefined' || PLAT_DEBUG_BUILD !== false;

// A production bundle turns the arena's runtime switch off with the flag, so its own stamp checks (resolve, query) go
// quiet too; a debug build leaves the switch as the arena sets it (on).
if (!DEBUG_BUILD) setDebugAssertions(false);

/** A slot handed to an op or a service: its kind, its slot and, for a face, its level. */
export type SlotRef =
  | { readonly kind: 'vertex'; readonly slot: number }
  | { readonly kind: 'halfEdge'; readonly slot: number }
  | { readonly kind: 'face'; readonly slot: number; readonly level: Level };

/** Is the debug-build assertion mode on (the build flag, then the arena's runtime switch)? */
export function debugMode(): boolean {
  return DEBUG_BUILD && debugAssertions();
}

/**
 * The debug build's assertion on a slot passed to an op or a service acting on arena `p` (§3.4): its stamp names this
 * arena (a foreign arena's slot asserts) at its current version (a stale slot asserts), and the slot is live there. A
 * programming error — it throws, never a KernelResult (§3.11); a no-op when the mode is off (production bundles).
 */
export function debugAssertSlot(p: Plat, stamp: Stamp, slot?: SlotRef): void {
  if (!debugMode()) return;
  assertStamp(p, stamp);
  if (slot === undefined) return;
  const live = slot.kind === 'vertex'
    ? isVertexLive(p, slot.slot)
    : slot.kind === 'halfEdge'
      ? isHalfEdgeLive(p, slot.slot)
      : isLevel(slot.level) && isFaceLive(p, slot.level, slot.slot);
  if (!live) throw new Error(`arena: the ${slot.kind} slot ${slot.slot} stamped for arena ${stamp.key.layer}/${stamp.key.part} at version ${stamp.version} is not live there`);
}
