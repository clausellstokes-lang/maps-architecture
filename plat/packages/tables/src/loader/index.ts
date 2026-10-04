// @plat/tables' loader (M0-s-02): the shipped tables by id, the checked Table, §7.6's TableView, §1.1's RungProfile,
// §4.5's band readings and the calibratable census (C-0070).
export { isTableId, TABLE_IDS, TABLE_SOURCES, type M0TableId } from './registry.js';
export { cellPinning, checkTable, loadTable, parseTable, rowPinning, Table, TableError, type Row } from './table.js';
export { tableView, type TableView } from './view.js';
export {
  BAND_IDS,
  bandCentres,
  bandInterpolate,
  bandOf,
  bandRows,
  defaultBandCuts,
  discreteCell,
  middleBand,
  type BandCuts,
  type BandRows,
  type Blendable,
  type ProsperityBand,
} from './bands.js';
export {
  BASE_RUNGS,
  inPopulationBand,
  rungForPopulation,
  rungProfile,
  type BaseRung,
  type BudgetRef,
  type FtgSize,
  type LawRef,
  type RungProfile,
  type SewerExistenceRow,
  type StageRowRef,
  type UndercityExistenceRow,
} from './ladder.js';
export { calibratableCensus, minCorridorM } from './census.js';
