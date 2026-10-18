// Slot stamping (M0-a-16; §3.4 *Arenas, keys and services*: "every slot a caller holds comes from a result stamped with
// its ArenaKey and arena version … valid until that arena's next commit, and a debug build carries each such slot as a
// handle stamped with both and asserts, wherever the slot is passed, that its key is the arena the call acts on … and
// that its version is current"; §3.11 "a stale or foreign slot: a debug-build assertion, never a silent read"; readings
// C-0220 (3)).
//
// In the debug build (M0-a-14's `debugMode()`: the build flag, then the arena's runtime switch) every value a façade call
// returns that is an object — the KernelResult of an op or a service, the commit of a transaction, a resolved
// reference, a query, a view — is stamped with the arena's key and version in a side table (a WeakMap, so a value's
// shape and a production build's values are unchanged); a value that carries its stamp inline (`Resolved`,
// `QueryResult`, `Location`, `FaceNeighbours`, `LevelView`, a `CommitRecord`) is read inline. `assertStamped` is the
// check: the stamp names the arena the call acts on at its current version, else it throws. A slot number alone carries
// no stamp; the modules assert its liveness where it is passed (every writer `check`s it, in every build).
//
// The restore generation (C-0299 (2), C-0313, C-0317): a savepoint put back across committed batches sets the version
// back, so the version alone names no arena state — (generation, version) does. A stamp is the arena's own
// (`arena/resolve.ts`'s `stamp`, C-0313 (1)): the key, the version and the arena's `restoreGeneration(p)`, written only
// when it is not 0 and an absent one reading 0, so every stamp of an arena never restored across commits keeps one
// shape; `assertStamped` asserts the key, then the generation, then the version. A value read inside commits a restore
// later rolled back is then never current again, however many commits follow — never a silent stale read. Stamp
// messages name an arena as the arena's own do (`keyName`: `layer/part`).
import { sameKey, type Plat, type Stamp } from '../arena/index.js';
import { keyName, stamp as arenaStamp } from '../arena/resolve.js';
import { debugMode } from '../invariants/index.js';
import { restoreGeneration } from '../tx/index.js';
import type { PlatKey } from '../types/index.js';

const stamps = new WeakMap<object, Stamp>();

/** A stamp's restore generation (absent reads 0, C-0313 (1)). */
function generationOf(s: Stamp): number {
  return s.generation ?? 0;
}

/**
 * The stamp of arena `p` now — the arena's own (`arena/resolve.ts`'s `stamp`, C-0313 (1)): a copy of its key, its
 * version and, only when not 0, its restore generation.
 */
export function stampNow(p: Plat): Stamp {
  return arenaStamp(p);
}

/** Stamps `value` (an object) with `p`'s key, current version and restore generation, in the debug build; returns `value`. */
export function stamp<T>(p: Plat, value: T): T {
  if (debugMode() && typeof value === 'object' && value !== null) stamps.set(value, stampNow(p));
  return value;
}

/** Stamps `value` with an explicit stamp kept whole (its generation included), in the debug build; returns `value`. */
export function stampWith<T>(s: Stamp, value: T): T {
  if (debugMode() && typeof value === 'object' && value !== null) {
    const key = { layer: s.key.layer, part: s.key.part };
    stamps.set(value, s.generation === undefined ? { key, version: s.version } : { key, version: s.version, generation: s.generation });
  }
  return value;
}

/** A value's inline `{ key, version, generation? }` (a generation that is not a number is not read: absent, 0). */
function inlineStamp(value: object): Stamp | undefined {
  if (!('key' in value) || !('version' in value)) return undefined;
  const k = (value as { key: unknown }).key;
  const v = (value as { version: unknown }).version;
  if (typeof v !== 'number' || typeof k !== 'object' || k === null || !('layer' in k) || !('part' in k)) return undefined;
  const g = (value as { generation?: unknown }).generation;
  return typeof g === 'number' ? { key: k as PlatKey, version: v, generation: g } : { key: k as PlatKey, version: v };
}

/**
 * The stamp a façade result carries: its side-table stamp, or its inline `{ key, version, generation? }`; undefined for
 * a value the façade did not stamp (a number, a production build's result).
 */
export function stampOf(value: unknown): Stamp | undefined {
  if (typeof value !== 'object' || value === null) return undefined;
  return stamps.get(value) ?? inlineStamp(value);
}

/**
 * The debug build's check that a stamped value is current on arena `p`: its key is `p`'s (a foreign slot asserts), its
 * restore generation is `p`'s (a value read before a savepoint was put back across committed batches asserts, the
 * arena's message form, C-0313 (1)) and its version is `p`'s (a stale slot asserts). An unstamped value asserts too —
 * the façade stamps every result it returns. A no-op when the build does not assert.
 */
export function assertStamped(p: Plat, value: unknown): void {
  if (!debugMode()) return;
  const s = stampOf(value);
  if (s === undefined) throw new Error('kernel: the value carries no stamp (a façade result is stamped with its arena\'s key and version, §3.4)');
  if (!sameKey(s.key, p.key)) throw new Error(`kernel: a slot stamped for arena ${keyName(s.key)} was passed to arena ${keyName(p.key)} (§3.4)`);
  const g = restoreGeneration(p);
  if (generationOf(s) !== g) {
    throw new Error(
      `kernel: a stale slot: stamped at version ${String(s.version)} in restore generation ${String(generationOf(s))}, arena ${keyName(p.key)} is at version ${String(p.version)} in restore generation ${String(g)} (a savepoint was put back across committed batches since)`,
    );
  }
  if (s.version !== p.version) throw new Error(`kernel: a stale slot: stamped at version ${String(s.version)}, arena ${keyName(p.key)} is at version ${String(p.version)} (§3.4)`);
}
