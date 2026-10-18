// The M0 record kinds (M0-m-01; C-0142 (3)): the entity-registry kind each M0 record is hashed and addressed under —
// the record's design name with its first letter lowered — and the record type of each. The registry itself, with
// its path-completeness test, is M1's (M0-work.json's defers).
import type {
  Allocation,
  Block,
  Bridge,
  District,
  Enceinte,
  FieldBands,
  Frontage,
  Gate,
  Junction,
  Plot,
  Reservation,
  Seam,
  Terrain,
  WaterBody,
  Way,
} from '../records/index.js';

/** Each M0 record kind and its record type. */
export interface RecordOf {
  terrain: Terrain;
  waterBody: WaterBody;
  way: Way;
  junction: Junction;
  district: District;
  block: Block;
  frontage: Frontage;
  plot: Plot;
  reservation: Reservation;
  allocation: Allocation;
  fieldBands: FieldBands;
  enceinte: Enceinte;
  gate: Gate;
  bridge: Bridge;
  seam: Seam;
}

/** An M0 record kind. */
export type RecordKind = keyof RecordOf;

/** Every M0 record kind, in §2's order: site, network, districts and content, walls, seams. */
export const M0_KINDS = Object.freeze([
  'terrain',
  'waterBody',
  'way',
  'junction',
  'district',
  'block',
  'frontage',
  'plot',
  'reservation',
  'allocation',
  'fieldBands',
  'enceinte',
  'gate',
  'bridge',
  'seam',
] as const satisfies readonly RecordKind[]);
