// The schema order per kind (§6.2's "attributes in schema order"; M0-m-01, C-0142 (3)): the order in which a record's
// attributes enter its leaf digest, after the leaf's header (kind ‖ id ‖ lineage ‖ parent ‖ existence ‖ flags) and
// before the digests of the faces and chains it owns. A kind's order is its record's fields in the design's
// declaration order, less `id` and `lifecycle` (the header's) and less the fields §6.2 keeps out of the model digest
// (DIGEST_EXCLUDED); a field M0 stages (STAGED) is absent from the record and so from its order. Nested values —
// sub-records, references, profiles — are encoded by the digest's own rule (M0-d-04). The table follows the design's
// declaration order: a field a later milestone un-stages enters at its design position (an insertion, not always an
// append), and any changed order moves every leaf of its kind, so test/schema/'s snapshot holds it (C-0145).
import type { EntityKind } from '../types/vocabulary.js';
import { M0_KINDS, type RecordKind, type RecordOf } from './kinds.js';

/** A record's attribute names: every field but the leaf header's `id` and `lifecycle`. */
export type AttrOf<K extends RecordKind> = Exclude<keyof RecordOf[K], 'id' | 'lifecycle'> & string;

/** The fields of an M0 record kept out of the model digest (§6.2), with the tree that hashes them. */
export const DIGEST_EXCLUDED = Object.freeze([
  {
    kind: 'plot',
    field: 'derivedFrom',
    digest: 'records',
    reason: '§2.8, §6.2: a DerivationRecord is outside the model digest, inside the records digest',
  },
] as const satisfies readonly { kind: RecordKind; field: string; digest: 'records' | 'none'; reason: string }[]);

/** The schema order of every M0 kind. */
export const SCHEMA_ORDER = Object.freeze({
  terrain: [
    'key',
    'cellCm',
    'cols',
    'rows',
    'originX',
    'originY',
    'datumCm',
    'heightCm',
    'reliefLimitCm',
    'hydro',
    'flowDir',
    'flatRank',
    'flowAccum',
    'outfalls',
    'seaLevelCm',
    'wind',
    'features',
  ],
  waterBody: [
    'kind',
    'face',
    'shore',
    'course',
    'controls',
    'nextControl',
    'widthProfile',
    'depthCm',
    'flowFrom',
    'flowTo',
    'fall',
    'cutFrom',
    'epoch',
    'spring',
    'bankKinds',
    'shoreClass',
  ],
  way: [
    'class',
    'spine',
    'width',
    'name',
    'from',
    'to',
    'growthStage',
    'epoch',
    'provisional',
    'bridge',
    'raised',
    'corridor',
    'formerClass',
  ],
  junction: ['vertex', 'arms', 'kind', 'wedges', 'chamber'],
  district: [
    'kind',
    'quarter',
    'faces',
    'seams',
    'growthStage',
    'identity',
    'nameHistory',
    'parent',
    'terrace',
    'outskirts',
    'core',
    'fabric',
    'fabricParams',
    'description',
    'namingFeature',
    'name',
  ],
  block: [
    'face',
    'district',
    'subDistrict',
    'depthClass',
    'interior',
    'reach',
    'due',
    'reservation',
    'content',
    'squareType',
    'ringCentre',
    'voidCorner',
    'overrides',
    'platformCm',
    'platformSteps',
  ],
  frontage: ['way', 'edges', 'class', 'lengthCm'],
  plot: [
    'face',
    'block',
    'district',
    'frontage',
    'access',
    'depthCm',
    'frontageCm',
    'exposure',
    'knownTo',
    'tenure',
    'partyWalls',
    'bounds',
    'owner',
    'use',
    'sitePlan',
    'buildings',
    'yard',
    'builtBand',
    'builtProsperity',
    'fieldBand',
    'ctx',
    'assignment',
    'members',
    'deck',
    'platformCm',
    'platformSteps',
  ],
  reservation: ['kind', 'rank', 'face', 'areaBandM2', 'compactnessMin', 'owner', 'handedFrom', 'attach', 'stage'],
  allocation: ['level', 'target', 'rows'],
  fieldBands: ['field', 'cuts', 'hysteresis', 'bands', 'middle', 'source', 'epoch'],
  enceinte: ['trace', 'strips', 'thicknessCm', 'setbackCm', 'gates', 'stage'],
  gate: ['enceinte', 'junction', 'way', 'kind', 'plaza', 'banks', 'mouth'],
  bridge: ['state', 'way', 'deck', 'over', 'spanCm', 'deckCm', 'kind', 'piers'],
  seam: ['sides', 'edges', 'portals'],
} as const satisfies { readonly [K in RecordKind]: readonly AttrOf<K>[] });

// Each kind's array is frozen in place, so the exported table and the lookup cannot drift apart at run time.
const ORDER = new Map<string, readonly string[]>(M0_KINDS.map((k) => [k, Object.freeze(SCHEMA_ORDER[k])]));

/**
 * The attributes of a record of `kind` in schema order (§6.2) — a fresh array each call. Throws a RangeError for a
 * kind with no M0 schema (a later milestone's record, or no record kind at all).
 */
export function schemaOrder<K extends RecordKind>(kind: K): AttrOf<K>[];
export function schemaOrder(kind: EntityKind): string[];
export function schemaOrder(kind: EntityKind): string[] {
  const order = ORDER.get(kind);
  if (order === undefined) throw new RangeError(`schemaOrder: no M0 schema for the kind '${kind}'`);
  return order.slice();
}
