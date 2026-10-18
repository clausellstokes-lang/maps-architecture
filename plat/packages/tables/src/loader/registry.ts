// The tables M0-s-02 ships (§14's @plat/tables: data/*.json): each file imported here, so the package carries its data
// in every build (tsc -b, the esbuild bundle, vitest) with no file system — a model package has no Node globals
// (§14). The id is the file's stem; the design's dotted names map onto it as ⟨table⟩.⟨row⟩ or the `settings` row's
// cell (C-0153). workLimits.json is M0-f-03a's and is read through its own loader (C-0021).
import bands from '../../data/bands.json';
import cut from '../../data/cut.json';
import district from '../../data/district.json';
import faces from '../../data/faces.json';
import fields from '../../data/fields.json';
import granularity from '../../data/granularity.json';
import interior from '../../data/interior.json';
import ladder from '../../data/ladder.json';
import lattice from '../../data/lattice.json';
import regimes from '../../data/regimes.json';
import terrain from '../../data/terrain.json';
import walls from '../../data/walls.json';
import ways from '../../data/ways.json';

/** The ids of M0's tables, written once, in the order the census and the view's hash read them. */
export const TABLE_IDS = [
  'ladder',
  'granularity',
  'faces',
  'regimes',
  'ways',
  'cut',
  'interior',
  'walls',
  'lattice',
  'district',
  'fields',
  'bands',
  'terrain',
] as const;

export type M0TableId = (typeof TABLE_IDS)[number];

/** Each table's JSON by id; the record's type makes it name every id of the list and nothing else. */
const JSON_OF: Readonly<Record<M0TableId, unknown>> = {
  ladder,
  granularity,
  faces,
  regimes,
  ways,
  cut,
  interior,
  walls,
  lattice,
  district,
  fields,
  bands,
  terrain,
};

/** Each table's raw JSON, unchecked, in TABLE_IDS' order; `loadTable` checks it before anything reads it. */
export const TABLE_SOURCES: ReadonlyMap<M0TableId, unknown> = new Map(TABLE_IDS.map((id) => [id, JSON_OF[id]]));

/** Is `id` one of M0's tables? */
export function isTableId(id: string): id is M0TableId {
  return TABLE_SOURCES.has(id as M0TableId);
}
