// The oracles' own types (M0-k-03; §3.7, §13.1). Every exported signature of the oracle adapters is written in these
// types and the kernel's, never in a library's: clipper2-wasm 0.4.0's declaration file is missing from its tarball
// (C-0124 (2)), and a library type in an exported signature would leak into the test kit's emitted declarations
// (the spec note N-15), so the adapters cast the loaded module to the narrow interfaces of `clipper2.ts` and return
// only what is declared here.
import type { LatticePoint, Polygon } from '@plat/kernel';

/** The two CI oracles of §3.7: Clipper2 compiled to WebAssembly (run in Node) and `polygon-clipping`. */
export type OracleEngine = 'clipper2' | 'polygon-clipping';

/** Every engine, in the order the cross-check pairs them. */
export const ORACLE_ENGINES: readonly OracleEngine[] = Object.freeze(['clipper2', 'polygon-clipping']);

/** §3.4's `booleans` operations. */
export type BooleanOp = 'union' | 'intersection' | 'difference' | 'xor';

/** §3.4's fill rules, declared per call (§3.7). */
export type FillRule = 'nonzero' | 'evenodd';

/** §3.4's `buffer` joins and ends (§3.7 defines each). */
export type JoinKind = 'round' | 'square' | 'miter';
export type EndKind = 'round' | 'square' | 'flat';

/** One ring in our integer frame: the kernel's `Polygon` (§2.8; integer centimetres, +y north). */
export type Ring = Polygon;

/** An input point: anything with x and y — a `LatticePoint` among them. The adapters refuse non-lattice values. */
export interface PointLike {
  readonly x: number;
  readonly y: number;
}

/** An input ring or chain. */
export type RingLike = readonly PointLike[];

/**
 * An oracle's answer for one case. `rings` are in our integer frame — the oracle's doubles snapped to the nearest
 * lattice point by the kernel's `snap`, consecutive duplicates dropped — outer rings counter-clockwise and holes
 * clockwise, as both libraries emit them; the doubles passed the region check before the snap (C-0150). `perimeterCm`
 * is the case's perimeter for §3.7's bounds: for a boolean the summed boundary length of both operands (§3.7's words);
 * for a buffer the boundary length of the oracle's own result (C-0144 (5)). A failure with `refused` true is the
 * library's refusal — no attempt gave a region the check accepts (an `OracleRefusal`) — and means only that this
 * oracle cannot judge the case; any other failure (an input off the lattice, a point out of range) is a failure.
 * A refused result also carries the refusal's replay seed and whether an attempt ran past its step budget (KI-6, L18;
 * C-0399) — `seed` null for an unseeded run.
 */
export type OracleResult =
  | { ok: true; engine: OracleEngine; rings: Ring[]; perimeterCm: number }
  | { ok: false; engine: OracleEngine; error: string; refused?: boolean; seed?: number | null; overran?: boolean };

/** §3.7's split: what our engine reported decides which comparison applies. */
export type SplitClass = 'unattracted' | 'attracted';

/** The split comparison's verdict for one case (§3.7). */
export interface Verdict {
  split: SplitClass;
  /** False on a refused verdict too: a refused comparison did not pass (the report counts it apart, C-0150). */
  pass: boolean;
  /**
   * True when an oracle library refused (C-0150) — the oracle's own result, the verdict's area or its cross-check's —
   * so this verdict judges nothing: `failures` is `['refused: …']`, and the report neither passes nor fails the case on
   * it. When ours shows a fault no oracle is needed to see (a typed failure; a point off the lattice; an attracted result
   * that is not valid) the verdict is not refused: it fails on that fault, the refusal named after it.
   */
  refused: boolean;
  /** The oracle compared against. */
  engine: OracleEngine;
  /** Face counts after both are snapped, zero-area faces dropped (compared only for unattracted cases). */
  faces: { ours: number; oracle: number };
  /** |ours Δ oracle| in cm², through the oracle's own boolean. */
  symDiffCm2: number;
  /** The same area through the other oracle's boolean (the cross-check); NaN when it could not be computed. */
  crossCheckCm2: number;
  /** Whether the two oracles' areas agree within perimeter × 1 cm. */
  crossChecked: boolean;
  perimeterCm: number;
  /** perimeter × 1 cm (unattracted) or perimeter × √2 · attractCm (attracted). */
  boundCm2: number;
  /** Why the case failed (empty on a pass): `oracle`, `ours`, `faces`, `area`, `cross-check`, `invalid: …`; or `refused: …`. */
  failures: string[];
}

/** A lattice point, re-exported here for the adapters' signatures. */
export type { LatticePoint };
