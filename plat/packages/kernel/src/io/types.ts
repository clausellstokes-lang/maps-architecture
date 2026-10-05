// The arena block's public shapes (M0-a-15; §3.9, C-0037): a chunk is its bytes and its content hash; the decoder's
// failure is §3.9's corrupt cache, returned as a typed result, never a partial arena. Readings: C-0207.
import type { Hash128 } from '../hash/index.js';
import type { IndexConfig } from '../index/index.js';
import { err, type KernelResult } from '../num/index.js';

/** A chunk's content hash (§2.9's content-addressed chunks, §3.9): H128 over its bytes — words, never text. */
export type ChunkRef = Hash128;

/** One chunk of an arena's block: the level-≤ 1 routes, or one L2–L4 static partition (§3.9 *Chunks*). */
export interface Chunk {
  /** H128 of `bytes`; decodeArena refuses a chunk whose bytes do not hash to it (the content-addressed store's check). */
  readonly ref: ChunkRef;
  readonly bytes: Uint8Array;
}

/** The `detail` prefix of the corrupt-cache result: the stored geometry is not loaded; the document loads by replay (M1). */
export const CORRUPT_CACHE = 'corrupt-cache';

/** What decodeArena rebuilds beside the arena itself. */
export interface DecodeOptions {
  /**
   * The spatial index's configuration (§3.3): when given, the load rebuilds every static partition from the loaded
   * arena (`attachIndex`, the load's rebuild, §3.9). Absent: the arena is returned without an index, for the caller to
   * attach (the grid cells are a table cell the kernel does not read, §3.3).
   */
  readonly index?: IndexConfig;
  /** Attach M0-d-04's maintained per-level digests to the loaded arena (§3.9: the load recomputes them). */
  readonly digests?: boolean;
}

/** The corrupt-cache refusal (§3.9, §3.11): E_INVARIANT with a detail naming what failed. Never carries a partial arena. */
export function corruptCache<T = never>(what: string): KernelResult<T> {
  return err('E_INVARIANT', `${CORRUPT_CACHE}: ${what}`);
}

/** Is the result decodeArena's corrupt cache? */
export function isCorruptCache(r: KernelResult<unknown>): boolean {
  return !r.ok && r.code === 'E_INVARIANT' && r.detail.startsWith(`${CORRUPT_CACHE}: `);
}
