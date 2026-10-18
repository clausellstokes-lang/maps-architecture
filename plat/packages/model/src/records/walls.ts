// Walls, gates and bridges (§2.7's head; M0-m-01). `Enceinte` is C-0033's minimal record — the trace, the two strip
// faces of the strip stand-in, the gates, the thickness, the setbacks, the stage — and `Gate` the record of the trace's
// gates and C-0087's basic water gate (way null, `banks` set); every other §2.7 field of the two is S7's or a later
// milestone's (staged, schema/staged.ts). `Bridge` is declared whole (S1's sites, S4's built spans). Types only.
import type { ChainRef, Cm, FaceRef, Id, Lifecycle, VertexRef } from '../types/index.js';

/** An enceinte (§2.7), minimal at M0 (C-0033): S7's band, towers and gatehouses are M1's. */
export interface Enceinte {
  id: Id;
  /** ('wall', id): the L1 wall chain. */
  trace: ChainRef;
  /** The two L1 wall-strip faces beside the trace (§4.8; at M0 the strip stand-in's, C-0033). */
  strips: { inner: FaceRef; outer: FaceRef };
  thicknessCm: Cm;
  /** Both faces unbuildable. */
  setbackCm: { inner: Cm; outer: Cm };
  gates: Id[];
  stage: number;
  lifecycle: Lifecycle;
}

/** A gate (§2.7): a trace gate, or C-0087's basic water gate (way null, its two bank vertices in `banks`). */
export interface Gate {
  id: Id;
  enceinte: Id;
  junction: Id;
  /** Null: a postern or water gate without an outward way. */
  way: Id | null;
  kind: 'main' | 'postern' | 'water' | 'gatehouse' | 'castle';
  plaza?: FaceRef;
  /** A water gate: ('gate_end', gate id, 0 | 1), its two bank vertices on the trace (§2.2 rule 7). */
  banks?: [VertexRef, VertexRef];
  /** G item 106 (e): a walled port's harbour-mouth chain. */
  mouth?: true;
  lifecycle: Lifecycle;
}

/** A bridge (§2.7): a crossing site, or a way's span laid through its two deck ends. */
export interface Bridge {
  id: Id;
  /** Site: two pinned bank vertices, no span, no way; built: a way's span laid through them. */
  state: 'site' | 'built';
  /** The way whose L1 edge between the two deck ends is the span; null while a site. */
  way: Id | null;
  /** ('deck_end', bridge id, 0 | 1): the pinned bank-to-bank deck. */
  deck: [VertexRef, VertexRef];
  /** Who emitted the deck: S1, S3, S5a, a carve edit, or the one L0 shore-split batch (§4.2 S1 (5)). */
  over: 'river' | 'moat' | 'castle_moat' | 'canal' | 'carve' | 'added';
  spanCm: Cm;
  /** Set by S7 when the bridge is built (§4.8). */
  deckCm?: Cm;
  kind?: 'stone' | 'timber' | 'draw' | 'ford';
  piers?: number;
  lifecycle: Lifecycle;
}
