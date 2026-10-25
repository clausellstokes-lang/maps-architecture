// S6's cells (M0-e-04; §4.5; C-0035, C-0245): the design's laws and rates are `district.json`'s (M0-s-02's table:
// `district.growthRate`, the count law, the patch test's compactness, the perimeter's offset, the quarter law and its
// two penalties); the edge test's class, the typing stand-in's synthetic demand table and the synthetic roster's
// building count are this folder's own table `s6.json`, checked by @plat/tables' `parseTable` like every table
// (unit, provenance, calibratable on every cell). No rate or law constant is written in code.
import { parseTable, tableView, type Table, type TableView } from '@plat/tables';
import raw from './s6.json';
import type { SeedKind } from './types.js';

/** S6's own table, checked once. */
let S6_TABLE: Table | null = null;

/** The `s6` table (this folder's `s6.json`), parsed and checked on first use. */
export function s6Table(): Table {
  if (S6_TABLE === null) S6_TABLE = parseTable('s6', raw);
  return S6_TABLE;
}

/** One relation row of a kind (§4.5 *Typing*: `RosterTables.districtKinds[].relations`, its M0 stand-in, C-0035). */
export interface RelationRow {
  /** What the district must touch or be seeded at: 'plaza', 'water', 'extramural', 'seed.<seed kind>'. */
  readonly to: string;
  /** 'require': the kind is admissible only where the relation holds; 'prefer': the weight is added where it holds. */
  readonly mode: 'require' | 'prefer';
  readonly weight: number;
}

/** One kind of the synthetic demand table (C-0035). */
export interface KindRow {
  readonly kind: string;
  /** Its share of the settlement's land: the demand the scorer reads. */
  readonly share: number;
  /** Its quarter family (§4.5 *Quarters*: kinds of one family merge without the 1 000 ha penalty). */
  readonly family: string;
  readonly relations: readonly RelationRow[];
}

/** The typing stand-in's cells (C-0035). */
export interface TypingCells {
  readonly kinds: readonly KindRow[];
  readonly mixedUseFloor: number;
  readonly demandWeight: number;
  readonly randomWeight: number;
}

/** The typing cells of the `s6` table (or of `t`, a test's variant). */
export function typingCells(t: Table = s6Table()): TypingCells {
  const kinds: KindRow[] = [];
  for (const kind of t.strs('typing', 'kinds')) {
    const row = `demand.${kind}`;
    const rels = t.value(row, 'relations');
    const relations: RelationRow[] = [];
    if (!Array.isArray(rels)) throw new RangeError(`s6: ${row}/relations is not a list`);
    for (const r of rels as readonly unknown[]) {
      if (!Array.isArray(r) || r.length !== 3 || typeof r[0] !== 'string' || (r[1] !== 'require' && r[1] !== 'prefer') || typeof r[2] !== 'number') {
        throw new RangeError(`s6: ${row}/relations holds a row that is not [to, 'require' | 'prefer', weight]`);
      }
      relations.push({ to: r[0], mode: r[1], weight: r[2] });
    }
    kinds.push({ kind, share: t.num(row, 'share'), family: t.str(row, 'family'), relations });
  }
  return { kinds, mixedUseFloor: t.num('typing', 'mixedUseFloor'), demandWeight: t.num('typing', 'demandWeight'), randomWeight: t.num('typing', 'randomWeight') };
}

/** The edge test's class (§4.5: "no arterial of class ≥ primary"). */
export function minBarrierClass(t: Table = s6Table()): string {
  return t.str('edge', 'minBarrierClass');
}

/** The synthetic roster's building count B at a rung (§4.5's N_q; C-0035). */
export function rosterBuildings(rung: string, t: Table = s6Table()): number {
  return t.num('roster', `buildings.${rung}`);
}

/** The `district.json` cells S6 reads. */
export interface DistrictCells {
  /** `district.growthRate`, per seed kind (the kinds without a row read `other`). */
  readonly rate: (kind: SeedKind) => number;
  readonly countCoefficient: number;
  readonly countAreaHa: number;
  readonly band: readonly [number, number];
  readonly compactnessMin: number;
  readonly perimeterOffsetM: number;
  readonly quarterCoefficient: number;
  readonly quarterExponent: number;
  readonly familyCostHa: number;
  readonly barrierCostHa: number;
}

/** The kinds `district.growthRate` keeps a row for (§4.5: gate, castle and bridgehead 0.1, riverbank 0.5, other 1). */
const RATE_ROWS: readonly SeedKind[] = ['gate', 'castle', 'bridgehead', 'riverbank'];

/** `district.json`'s cells (from `tables`, the run's view). */
export function districtCells(tables: TableView = tableView()): DistrictCells {
  const t = tables.table('district');
  const rates = new Map<SeedKind, number>();
  for (const k of RATE_ROWS) rates.set(k, t.num('growthRate', k));
  const other = t.num('growthRate', 'other');
  return {
    rate: (kind) => rates.get(kind) ?? other,
    countCoefficient: t.num('countLaw', 'coefficient'),
    countAreaHa: t.num('countLaw', 'areaHa'),
    band: t.pair('countLaw', 'band'),
    compactnessMin: t.num('patch', 'compactnessMin'),
    perimeterOffsetM: t.num('perimeter', 'offsetM'),
    quarterCoefficient: t.num('quarters', 'coefficient'),
    quarterExponent: t.num('quarters', 'exponent'),
    familyCostHa: t.num('quarters', 'familyCostHa'),
    barrierCostHa: t.num('quarters', 'barrierCostHa'),
  };
}
