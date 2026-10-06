// Slot stamping (M0-a-16; §3.4 *Arenas, keys and services*: "every slot a caller holds comes from a result stamped with
// its ArenaKey and arena version … valid until that arena's next commit, and a debug build carries each such slot as a
// handle stamped with both and asserts, wherever the slot is passed, that its key is the arena the call acts on … and
// that its version is current"; §3.11 "a stale or foreign slot: a debug-build assertion, never a silent read"; readings
// C-0219 (3)).
//
// In the debug build (M0-a-14's `debugMode()`: the build flag, then the arena's runtime switch) every value a façade call
// returns that is an object — the KernelResult of an op or a service, the commit of a transaction, a resolved
// reference, a query, a view — is stamped with the arena's key and version in a side table (a WeakMap, so a value's
// shape and a production build's values are unchanged); a value that carries its stamp inline (`Resolved`,
// `QueryResult`, `Location`, `FaceNeighbours`, `LevelView`, a `CommitRecord`) is read inline. `assertStamped` is the
// check: the stamp names the arena the call acts on at its current version, else it throws. A slot number alone carries
// no stamp; the modules assert its liveness where it is passed (every writer `check`s it, in every build).
import { sameKey, type Plat, type Stamp } from '../arena/index.js';
import { debugMode } from '../invariants/index.js';
import type { PlatKey } from '../types/index.js';

const stamps = new WeakMap<object, Stamp>();

function keyName(k: PlatKey): string {
  return `${k.layer}/${k.part}`;
}

/** Stamps `value` (an object) with `p`'s key and current version, in the debug build; returns `value`. */
export function stamp<T>(p: Plat, value: T): T {
  if (debugMode() && typeof value === 'object' && value !== null) {
    stamps.set(value, { key: { layer: p.key.layer, part: p.key.part }, version: p.version });
  }
  return value;
}

/** Stamps `value` with an explicit stamp, in the debug build; returns `value`. */
export function stampWith<T>(s: Stamp, value: T): T {
  if (debugMode() && typeof value === 'object' && value !== null) stamps.set(value, { key: { layer: s.key.layer, part: s.key.part }, version: s.version });
  return value;
}

function inlineStamp(value: object): Stamp | undefined {
  if (!('key' in value) || !('version' in value)) return undefined;
  const k = (value as { key: unknown }).key;
  const v = (value as { version: unknown }).version;
  if (typeof v !== 'number' || typeof k !== 'object' || k === null || !('layer' in k) || !('part' in k)) return undefined;
  return { key: k as PlatKey, version: v };
}

/**
 * The stamp a façade result carries: its side-table stamp, or its inline `{ key, version }`; undefined for a value the
 * façade did not stamp (a number, a production build's result).
 */
export function stampOf(value: unknown): Stamp | undefined {
  if (typeof value !== 'object' || value === null) return undefined;
  return stamps.get(value) ?? inlineStamp(value);
}

/**
 * The debug build's check that a stamped value is current on arena `p`: its key is `p`'s (a foreign slot asserts) and
 * its version is `p`'s (a stale slot asserts). An unstamped value asserts too — the façade stamps every result it
 * returns. A no-op when the build does not assert.
 */
export function assertStamped(p: Plat, value: unknown): void {
  if (!debugMode()) return;
  const s = stampOf(value);
  if (s === undefined) throw new Error('kernel: the value carries no stamp (a façade result is stamped with its arena\'s key and version, §3.4)');
  if (!sameKey(s.key, p.key)) throw new Error(`kernel: a slot stamped for arena ${keyName(s.key)} was passed to arena ${keyName(p.key)} (§3.4)`);
  if (s.version !== p.version) throw new Error(`kernel: a stale slot: stamped at version ${String(s.version)}, arena ${keyName(p.key)} is at version ${String(p.version)} (§3.4)`);
}
