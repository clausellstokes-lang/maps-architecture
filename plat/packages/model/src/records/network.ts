// Ways and junctions (§2.4; M0-m-01): the skeleton S4 and S5 write at M0. Field names, order and types as §2.4
// declares them; `Way.surface` (the way-surface rule at S10a's end, M2b) and `Way.slopeP95` (written by S9, M1) are
// staged (schema/staged.ts). `NodeRef`, which §2.4 names without declaring, is read as C-0142 (4) states. Types only.
import type {
  ChainProfile,
  ChainRef,
  Cdeg,
  Cm,
  FaceRef,
  Id,
  Lifecycle,
  NameRef,
  RaisedWayRecord,
  VertexRef,
} from '../types/index.js';

/** A way's class (§2.4); `aqueduct` is item 110 (b)'s water channel, never a traffic edge. */
export type WayClass =
  | 'through'
  | 'primary'
  | 'secondary'
  | 'lane'
  | 'alley'
  | 'cul_de_sac'
  | 'track'
  | 'path'
  | 'quay'
  | 'pier'
  | 'bridge'
  | 'ford'
  | 'aqueduct';

/**
 * A way's end (§2.4 — "gate, plaza, bridge, harbour, junction, external bearing"; C-0142 (4)): an entity by its id, or
 * an external bearing with the key of the trade partner it leads to, when one is named (§7.7's TradePartner).
 */
export type NodeRef =
  | { kind: 'gate' | 'plaza' | 'bridge' | 'harbour' | 'junction'; id: Id }
  | { kind: 'bearing'; bearingCdeg: Cdeg; partner?: string };

/** A way of the skeleton (§2.4). */
export interface Way {
  id: Id;
  class: WayClass;
  /** ('way', id): the L1 chain, resolved by the kernel (§2.2 rule 5). */
  spine: ChainRef;
  /** 'width_knot' on the spine; a constant-width way stores a scalar. */
  width: Cm | ChainProfile<Cm>;
  name?: NameRef;
  from: NodeRef;
  to: NodeRef;
  growthStage: number;
  epoch: number;
  /** An S5-grown spine beyond a stage boundary: the only ways the inter-stage trim may cut (§4.4). */
  provisional: boolean;
  /** The §2.7 Bridge deck it crosses. */
  bridge?: Id;
  /** g item 110 (b): staged to M3a (§4b). */
  raised?: RaisedWayRecord;
  /** L2 view. */
  corridor?: FaceRef;
  /** Written by downgradeWay and by volume 5's landfall; cleared by upgradeWay (§4.11). */
  formerClass?: WayClass;
  lifecycle: Lifecycle;
}

/** A junction of the skeleton (§2.4). */
export interface Junction {
  id: Id;
  /** ('junction', id). */
  vertex: VertexRef;
  /** Ways; on an underground part the tunnels or galleries meeting there (V04). */
  arms: Id[];
  kind: 'T' | 'X' | 'Y' | 'end' | 'gate' | 'bridgehead' | 'square';
  /** L2 view. */
  wedges?: FaceRef;
  /** Underground: a navigable junction wedge drawn and used as a sewer chamber (II.7.2). */
  chamber?: true;
  lifecycle: Lifecycle;
}
