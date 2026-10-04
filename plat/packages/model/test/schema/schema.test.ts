// M0-m-01: schemaOrder covers every M0 kind and is stable (snapshot) — §6.2's "attributes in schema order". Each
// kind's order is checked three ways: against the record type (a type test: the order holds every attribute of the
// record but those §6.2 keeps out of the model digest, and nothing else); against the design's own field list of the
// record, transcribed below from §2.3, §2.4, §2.5, §2.7 and II.1 (the order is that list, in its order, less the
// leaf header's id and lifecycle, the digest-excluded fields and the staged ones — so a renamed or reordered field
// fails); and against the committed snapshot schema-order.json (a changed order moves every leaf of its kind).
import { readFileSync } from 'node:fs';
import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  DIGEST_EXCLUDED,
  M0_KINDS,
  SCHEMA_ORDER,
  STAGED,
  schemaOrder,
  type AttrOf,
  type RecordKind,
  type RecordOf,
  type SeamEdge,
} from '../../src/index.js';

/** The fields each M0 record declares in the design, in the design's order. */
const DESIGN_FIELDS: { readonly [K in RecordKind]: { record: string; fields: readonly string[] } } = {
  terrain: {
    record: 'Terrain',
    fields: ['id', 'key', 'cellCm', 'cols', 'rows', 'originX', 'originY', 'datumCm', 'heightCm', 'reliefLimitCm', 'hydro', 'flowDir', 'flatRank', 'flowAccum', 'outfalls', 'seaLevelCm', 'wind', 'features', 'geology', 'mining', 'lifecycle'],
  },
  waterBody: {
    record: 'WaterBody',
    fields: ['id', 'kind', 'face', 'shore', 'course', 'controls', 'nextControl', 'widthProfile', 'depthCm', 'flowFrom', 'flowTo', 'fall', 'cutFrom', 'epoch', 'spring', 'bankKinds', 'shoreClass', 'lifecycle'],
  },
  way: {
    record: 'Way',
    fields: ['id', 'class', 'spine', 'width', 'surface', 'name', 'from', 'to', 'growthStage', 'epoch', 'provisional', 'bridge', 'raised', 'slopeP95', 'corridor', 'formerClass', 'lifecycle'],
  },
  junction: { record: 'Junction', fields: ['id', 'vertex', 'arms', 'kind', 'wedges', 'chamber', 'lifecycle'] },
  district: {
    record: 'District',
    fields: ['id', 'kind', 'quarter', 'faces', 'boundary', 'seams', 'character', 'venueMix', 'prosperity', 'growthStage', 'identity', 'bandRange', 'pressure', 'nameHistory', 'parent', 'terrace', 'outskirts', 'core', 'fabric', 'fabricParams', 'buildingScale', 'materialOverride', 'allocation', 'subDistricts', 'description', 'namingFeature', 'name', 'lifecycle'],
  },
  block: {
    record: 'Block',
    fields: ['id', 'face', 'district', 'subDistrict', 'frontages', 'depthClass', 'interior', 'reach', 'due', 'reservation', 'content', 'squareType', 'ringCentre', 'voidCorner', 'overrides', 'platformCm', 'platformSteps', 'lifecycle'],
  },
  frontage: { record: 'Frontage', fields: ['id', 'way', 'edges', 'class', 'lengthCm', 'lifecycle'] },
  plot: {
    record: 'Plot',
    fields: ['id', 'face', 'block', 'district', 'frontage', 'access', 'depthCm', 'frontageCm', 'exposure', 'knownTo', 'tenure', 'partyWalls', 'bounds', 'owner', 'use', 'sitePlan', 'buildings', 'yard', 'builtBand', 'builtProsperity', 'fieldBand', 'ctx', 'derivedFrom', 'assignment', 'members', 'deck', 'platformCm', 'platformSteps', 'lifecycle'],
  },
  reservation: {
    record: 'Reservation',
    fields: ['id', 'kind', 'rank', 'face', 'areaBandM2', 'compactnessMin', 'owner', 'handedFrom', 'attach', 'stage', 'lifecycle'],
  },
  allocation: { record: 'Allocation', fields: ['id', 'level', 'target', 'rows', 'lifecycle'] },
  fieldBands: { record: 'FieldBands', fields: ['field', 'cuts', 'hysteresis', 'bands', 'middle', 'source', 'epoch'] },
  enceinte: {
    record: 'Enceinte',
    fields: ['id', 'kind', 'trace', 'closure', 'anchors', 'arcs', 'waterfront', 'placement', 'strips', 'band', 'glacis', 'thicknessCm', 'walkCm', 'heightCm', 'stretchClass', 'base', 'setbackCm', 'intervallum', 'material', 'supersededBy', 'pathway', 'underuseSince', 'condition', 'conditionMaterial', 'conditionEpoch', 'laidAt', 'gates', 'towers', 'moat', 'stage', 'lifecycle'],
  },
  gate: { record: 'Gate', fields: ['id', 'enceinte', 'junction', 'way', 'kind', 'heights', 'footprint', 'plaza', 'banks', 'mouth', 'lifecycle'] },
  bridge: { record: 'Bridge', fields: ['id', 'state', 'way', 'deck', 'over', 'spanCm', 'deckCm', 'kind', 'piers', 'lifecycle'] },
  seam: { record: 'Seam', fields: ['id', 'sides', 'edges', 'portals', 'amendments', 'boundarySamples'] },
};

/** II.1's seam edge fields, in its order (a sub-record with a staged field). */
const SEAM_EDGE_FIELDS = ['chain', 'type', 'reservation', 'wayClass', 'widthCm', 'frontageSide', 'hard'] as const;

const HEADER = new Set(['id', 'lifecycle']);

/** The order type of each kind, as the table types it. */
type TableAttr<K extends RecordKind> = (typeof SCHEMA_ORDER)[K][number];
/** The digest-excluded fields of a kind. */
type Excluded<K extends RecordKind> = Extract<(typeof DIGEST_EXCLUDED)[number], { kind: K }>['field'];

describe('schemaOrder (§6.2 "attributes in schema order")', () => {
  it('covers every M0 kind: each record\'s attributes are its order plus its digest-excluded fields, exactly (a type test)', () => {
    expectTypeOf<TableAttr<'terrain'>>().toEqualTypeOf<AttrOf<'terrain'>>();
    expectTypeOf<TableAttr<'waterBody'>>().toEqualTypeOf<AttrOf<'waterBody'>>();
    expectTypeOf<TableAttr<'way'>>().toEqualTypeOf<AttrOf<'way'>>();
    expectTypeOf<TableAttr<'junction'>>().toEqualTypeOf<AttrOf<'junction'>>();
    expectTypeOf<TableAttr<'district'>>().toEqualTypeOf<AttrOf<'district'>>();
    expectTypeOf<TableAttr<'block'>>().toEqualTypeOf<AttrOf<'block'>>();
    expectTypeOf<TableAttr<'frontage'>>().toEqualTypeOf<AttrOf<'frontage'>>();
    expectTypeOf<TableAttr<'plot'> | Excluded<'plot'>>().toEqualTypeOf<AttrOf<'plot'>>();
    expectTypeOf<Excluded<'plot'>>().toEqualTypeOf<'derivedFrom'>();
    expectTypeOf<TableAttr<'reservation'>>().toEqualTypeOf<AttrOf<'reservation'>>();
    expectTypeOf<TableAttr<'allocation'>>().toEqualTypeOf<AttrOf<'allocation'>>();
    expectTypeOf<TableAttr<'fieldBands'>>().toEqualTypeOf<AttrOf<'fieldBands'>>();
    expectTypeOf<TableAttr<'enceinte'>>().toEqualTypeOf<AttrOf<'enceinte'>>();
    expectTypeOf<TableAttr<'gate'>>().toEqualTypeOf<AttrOf<'gate'>>();
    expectTypeOf<TableAttr<'bridge'>>().toEqualTypeOf<AttrOf<'bridge'>>();
    expectTypeOf<TableAttr<'seam'>>().toEqualTypeOf<AttrOf<'seam'>>();
    expectTypeOf<keyof typeof SCHEMA_ORDER>().toEqualTypeOf<RecordKind>();
    // the typed form returns the record's attribute names
    expectTypeOf(schemaOrder('way')).toEqualTypeOf<AttrOf<'way'>[]>();
    const byEntityKind = (kind: string) => schemaOrder(kind); // the open form: any EntityKind, refused at run time
    expectTypeOf(byEntityKind).returns.toEqualTypeOf<string[]>();
  });

  it('each kind\'s order is the design\'s field list in its order, less the header, the digest-excluded and the staged fields', () => {
    for (const kind of M0_KINDS) {
      const { record, fields } = DESIGN_FIELDS[kind];
      const staged = new Set(STAGED.filter((s) => s.record === record).map((s) => s.field));
      const excluded = new Set<string>(DIGEST_EXCLUDED.filter((e) => e.kind === kind).map((e) => e.field));
      for (const f of staged) expect(fields, `${record}.${f} staged but not a design field`).toContain(f);
      for (const f of excluded) expect(fields, `${record}.${f} excluded but not a design field`).toContain(f);
      const expected = fields.filter((f) => !HEADER.has(f) && !staged.has(f) && !excluded.has(f));
      expect(schemaOrder(kind), kind).toEqual(expected);
      expect(new Set(schemaOrder(kind)).size, `${kind}: no field twice`).toBe(schemaOrder(kind).length);
    }
    expect(M0_KINDS.length).toBe(Object.keys(DESIGN_FIELDS).length);
  });

  it('every staged field names a design field of an M0 record or sub-record, with a milestone after M0 and a reason, and is absent from the type', () => {
    const records = new Map<string, readonly string[]>(M0_KINDS.map((k) => [DESIGN_FIELDS[k].record, DESIGN_FIELDS[k].fields]));
    records.set('SeamEdge', SEAM_EDGE_FIELDS);
    const seen = new Set<string>();
    for (const s of STAGED) {
      expect(records.get(s.record), `${s.record} is an M0 record`).toBeDefined();
      expect(records.get(s.record), `${s.record}.${s.field}`).toContain(s.field);
      expect(['M1', 'M2a', 'M2b', 'M3a', 'M4', 'M5'], `${s.record}.${s.field}`).toContain(s.milestone);
      expect(s.reason.length).toBeGreaterThan(10);
      expect(seen.has(`${s.record}.${s.field}`), `${s.record}.${s.field} listed once`).toBe(false);
      seen.add(`${s.record}.${s.field}`);
    }
    // the staged fields are absent from the M0 types (a type test per record that stages any)
    expectTypeOf<'geology' | 'mining'>().not.toMatchTypeOf<keyof RecordOf['terrain']>();
    expectTypeOf<'surface' | 'slopeP95'>().not.toMatchTypeOf<keyof RecordOf['way']>();
    expectTypeOf<'boundary'>().not.toMatchTypeOf<keyof RecordOf['district']>();
    expectTypeOf<'allocation'>().not.toMatchTypeOf<keyof RecordOf['district']>();
    expectTypeOf<'frontages'>().not.toMatchTypeOf<keyof RecordOf['block']>();
    expectTypeOf<'towers' | 'laidAt'>().not.toMatchTypeOf<keyof RecordOf['enceinte']>();
    expectTypeOf<'heights' | 'footprint'>().not.toMatchTypeOf<keyof RecordOf['gate']>();
    expectTypeOf<'amendments'>().not.toMatchTypeOf<keyof RecordOf['seam']>();
    expectTypeOf<'boundarySamples'>().not.toMatchTypeOf<keyof RecordOf['seam']>();
    expectTypeOf<keyof SeamEdge>().toEqualTypeOf<Exclude<(typeof SEAM_EDGE_FIELDS)[number], 'frontageSide'>>();
  });

  it('is stable: the committed snapshot holds every kind\'s order', () => {
    const snap = JSON.parse(readFileSync(new URL('./schema-order.json', import.meta.url), 'utf8')) as { order: Record<string, string[]> };
    expect(Object.keys(snap.order)).toEqual([...M0_KINDS]);
    for (const kind of M0_KINDS) expect(schemaOrder(kind), kind).toEqual(snap.order[kind]);
  });

  it('returns a fresh array; the table is frozen; a kind with no M0 schema is refused', () => {
    const a = schemaOrder('gate');
    a.push('junk' as never);
    expect(schemaOrder('gate')).not.toContain('junk');
    for (const kind of M0_KINDS) expect(Object.isFrozen(SCHEMA_ORDER[kind]), kind).toBe(true);
    expect(Object.isFrozen(SCHEMA_ORDER)).toBe(true);
    expect(() => schemaOrder('building')).toThrow(RangeError);
    expect(() => schemaOrder('cell')).toThrow("schemaOrder: no M0 schema for the kind 'cell'");
    expect(() => schemaOrder('')).toThrow(RangeError);
  });
});
