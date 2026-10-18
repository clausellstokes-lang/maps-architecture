// The unit vocabulary (§2.1): every table column, metric and field that names its unit by a word takes it from this
// one list, `perKm2` and `per100m` included; volume 11's `ColumnSpec.unit` and volume 12's metric `Unit` are named
// subsets of it. The type is derived from the list, so the words are written once.

/** §2.1's `Unit` list in §2.1's order, word for word. */
const UNIT_WORDS = [
  'm',
  'm2',
  'ha',
  'cm',
  'cdeg',
  'deg',
  'share',
  'weight',
  'people',
  'count',
  'yr',
  'wk',
  'm3',
  'lvl',
  'perHa',
  'perKm',
  'perKm2',
  'per100m',
  'ratio',
  'bits',
  'ms',
  's',
  'luma',
  'rb',
  'chroma',
  'z',
  'none',
] as const;

/** §2.1's `Unit`: one word of the list. */
export type Unit = (typeof UNIT_WORDS)[number];

/** The list in §2.1's order, frozen; the cell check refuses every other word. */
export const UNITS: readonly Unit[] = Object.freeze(UNIT_WORDS);

const UNIT_SET: ReadonlySet<string> = new Set<string>(UNITS);

/** Is `u` a word of §2.1's unit list? */
export function isUnit(u: unknown): u is Unit {
  return typeof u === 'string' && UNIT_SET.has(u);
}
