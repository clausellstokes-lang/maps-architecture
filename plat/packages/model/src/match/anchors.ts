// §6.3's anchor table as data, for the kinds M0 has (item M0-d-05b): block, cell, way, junction, gate, bridge,
// enceinte, water body, district, seam, portal — in the order the routine matches them, every kind after the kinds its
// anchors name (a bridge's river, a way's ends, a district's seed feature, a seam's districts and chain). The other
// rows of §6.3 — plots, buildings, yard parts, households, people, labels and every later kind — are added with their
// kinds (M1 and later; M0-work.json's defers). Radii are §6.3's, in metres; the bridge's is a table cell, which
// `resolveAnchors` reads through the caller (the model package imports no table, §14).
import type { EntityKind } from '../types/index.js';
import type { AnchorSpec, AnchorType, CellRef } from './types.js';

/** The cell holding the bridge's radius: the crossing-site search band of §4.2 S1 (5) (V11 §3.1's base settings row). */
export const CROSSING_SEARCH_BAND: CellRef = Object.freeze({ table: 'terrain', row: 'crossing', cell: 'searchBandM' });

/** §6.3's overlap threshold: IoU ≥ 0.5 for an area, ≥ 50 % of its length for a way. */
export const OVERLAP_THRESHOLD = 0.5;

const row = (spec: AnchorSpec): AnchorSpec => Object.freeze(spec);

/**
 * The M0 anchor table (§6.3), in matching order. The kind names are the address prefixes (§6.3's EntityKind); a water
 * body's is `water` (the hydrology's record ids, `@plat/site`).
 */
export const M0_ANCHORS: readonly AnchorSpec[] = Object.freeze([
  row({ kind: 'water', anchor: 'overlap', text: 'overlap ≥ 50 % (IoU)', overlap: OVERLAP_THRESHOLD, family: 'kind' }),
  row({ kind: 'enceinte', anchor: 'overlap', text: 'overlap ≥ 50 % (IoU)', overlap: OVERLAP_THRESHOLD, family: 'kind' }),
  row({ kind: 'junction', anchor: 'point', text: 'position', radiusM: 1, family: 'kind' }),
  row({ kind: 'gate', anchor: 'point', text: 'position', radiusM: 2, family: 'kind' }),
  row({ kind: 'portal', anchor: 'point', text: 'position', radiusM: 1, family: 'portal kind (baseLane, growth, edit)' }),
  row({ kind: 'block', anchor: 'point', text: 'centroid', radiusM: 2, family: '—' }),
  row({ kind: 'cell', anchor: 'point', text: 'centroid', radiusM: 5, family: '—' }),
  row({
    kind: 'bridge',
    anchor: 'point',
    text: "its deck's midpoint, on the same river (the water body's address or its successor)",
    radiusM: CROSSING_SEARCH_BAND,
    on: 'water',
    family: 'kind (bridge, ford)',
  }),
  row({
    kind: 'way',
    anchor: 'ends',
    text: "its end junctions' addresses; else overlap ≥ 50 % of its length",
    overlap: OVERLAP_THRESHOLD,
    family: 'way class family',
  }),
  row({ kind: 'district', anchor: 'key', text: "its seed feature's address", family: 'district kind family' }),
  row({ kind: 'seam', anchor: 'key', text: "its two districts' addresses and its first chain's address", family: '—' }),
]);

const TYPES: readonly AnchorType[] = ['point', 'overlap', 'ends', 'key'];

/** A spec checked and its radius in whole centimetres (`point` kinds; 0 otherwise). */
export interface CheckedSpec {
  readonly spec: AnchorSpec;
  readonly radiusCm: number;
  readonly overlap: number;
}

const isCell = (v: unknown): v is CellRef =>
  typeof v === 'object' && v !== null && typeof (v as CellRef).table === 'string' && typeof (v as CellRef).row === 'string' && typeof (v as CellRef).cell === 'string';

/**
 * Checks an anchor table and indexes it by kind, in its order. Refuses (RangeError): a kind given twice, an unknown
 * anchor type, a `point` row without a resolved radius of at least 1 cm (a cell not yet read by `resolveAnchors`
 * included), an `on` that names a kind not earlier in the table, an `overlap` or `ends` row without a threshold in
 * (0, 1].
 */
export function checkAnchors(anchors: readonly AnchorSpec[]): Map<EntityKind, CheckedSpec> {
  if (!Array.isArray(anchors)) throw new RangeError('match: the anchor table is not a list');
  const out = new Map<EntityKind, CheckedSpec>();
  for (const spec of anchors) {
    if (typeof spec !== 'object' || spec === null || typeof spec.kind !== 'string' || spec.kind === '') {
      throw new RangeError('match: an anchor row has no kind');
    }
    if (out.has(spec.kind)) throw new RangeError(`match: the anchor table gives the kind ${spec.kind} twice`);
    if (!TYPES.includes(spec.anchor)) throw new RangeError(`match: the kind ${spec.kind} has no anchor type (${String(spec.anchor)})`);
    let radiusCm = 0;
    let overlap = 0;
    if (spec.anchor === 'point') {
      const r = spec.radiusM;
      if (isCell(r)) throw new RangeError(`match: the kind ${spec.kind}'s radius is the cell ${r.table}/${r.row}.${r.cell}, not yet read (resolveAnchors)`);
      if (typeof r !== 'number' || !Number.isFinite(r)) throw new RangeError(`match: the kind ${spec.kind} has no hysteresis radius`);
      radiusCm = Math.round(r * 100);
      if (radiusCm < 1) throw new RangeError(`match: the kind ${spec.kind}'s radius is below 1 cm`);
      if (spec.on !== undefined && !out.has(spec.on)) throw new RangeError(`match: the kind ${spec.kind} lies on ${spec.on}, which the table does not match before it`);
    } else {
      if (spec.on !== undefined) throw new RangeError(`match: only a point-anchored kind names an \`on\` (${spec.kind})`);
      if (spec.anchor === 'overlap' || spec.anchor === 'ends') {
        overlap = typeof spec.overlap === 'number' ? spec.overlap : NaN;
        if (!(overlap > 0 && overlap <= 1)) throw new RangeError(`match: the kind ${spec.kind} has no overlap threshold in (0, 1]`);
      }
    }
    out.set(spec.kind, Object.freeze({ spec, radiusCm, overlap }));
  }
  return out;
}

/**
 * The anchor table with every radius that is a table cell read through `read` (metres): §6.3's bridge band from the
 * base settings row. Rows whose radius is a number are kept as they are.
 */
export function resolveAnchors(anchors: readonly AnchorSpec[], read: (cell: CellRef) => number): readonly AnchorSpec[] {
  return Object.freeze(
    anchors.map((spec) => {
      const r = spec.radiusM;
      if (!isCell(r)) return spec;
      const value = read(r);
      if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
        throw new RangeError(`match: the cell ${r.table}/${r.row}.${r.cell} read ${String(value)}, not a positive radius in metres`);
      }
      return Object.freeze({ ...spec, radiusM: value });
    }),
  );
}
