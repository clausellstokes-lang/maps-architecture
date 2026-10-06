// The bent cut's face sets (M0-b-04; §16 M0 (b): "curved, round-joined, triangular, C-shaped and holed faces", at CITY
// block scales, seeded; §4.6 step 8's F-CUT bars: "10⁵ random concave and holed faces"). Every face is drawn by
// M0-k-01's generator `arb.faceSet(kind)` — this module only fixes how a face's index and the set's seed choose its
// draw: face i of (kind, seed) is the first sample of `arb.faceSet(kind)` at the fast-check seed
// H32("bentcut/<kind>/<seed>/<i>") (M0-k-01's `seedFamily`), so any face of a set is drawn on its own, in any order and
// in any worker, and the set is the same on every run (C-0242 (2)).
import fc from 'fast-check';
import { arb, seedFamily, type FuzzFace, type FuzzFaceKind } from '@plat/testkit';

/** §16 M0 (b)'s synthetic face set: the five kinds the corner and arrival clauses and the signature are measured on. */
export const M0B_KINDS = Object.freeze(['curved', 'round-joined', 'triangular', 'C-shaped', 'holed'] as const);

/** F-CUT's random faces (§4.6 step 8): concave and holed. */
export const FCUT_KINDS = Object.freeze(['concave', 'holed'] as const);

/** A face kind of the bent cut's sets. */
export type BentCutFaceKind = FuzzFaceKind;

/** The face scales M0-k-01's generator offers (circumradius ranges); the sets here use `block`, CITY's (C-0161 (5)). */
export type FaceScale = 'block' | 'plot';

/** The fast-check seed of face i of (kind, seed): H32("bentcut/<kind>/<seed>/<i>") as fast-check's 32-bit integer. */
export function faceSeed(kind: BentCutFaceKind, seed: number, i: number): number {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) throw new RangeError(`faceSet: seed must be an integer in [0, 2³² − 1], got ${String(seed)}`);
  return seedFamily(`bentcut/${kind}/${String(seed)}`, i) | 0;
}

/** Face i of the set (kind, seed): one draw of M0-k-01's `arb.faceSet(kind)` at its own seed. */
export function faceAt(kind: BentCutFaceKind, i: number, seed: number, scale: FaceScale = 'block'): FuzzFace {
  const [f] = fc.sample(arb.faceSet(kind, { scale }), { seed: faceSeed(kind, seed, i), numRuns: 1 });
  if (f === undefined) throw new Error(`faceSet: no face drawn for ${kind} #${String(i)}`);
  return f;
}

/**
 * faceSet(kind, n, seed) — the interface M0-b-04 lists: the first n faces of the set (kind, seed), seeded, at CITY block
 * scale (circumradius 30–300 m; `scale: 'plot'` for plot scale). The same arguments give the same faces on every run.
 */
export function faceSet(kind: BentCutFaceKind, n: number, seed: number, scale: FaceScale = 'block'): FuzzFace[] {
  if (!Number.isInteger(n) || n < 0) throw new RangeError(`faceSet: n must be a whole number, got ${String(n)}`);
  const out: FuzzFace[] = [];
  for (let i = 0; i < n; i += 1) out.push(faceAt(kind, i, seed, scale));
  return out;
}
