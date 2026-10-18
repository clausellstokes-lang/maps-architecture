// @plat/tables' cell module (M0-s-02): §2.1's unit vocabulary, §17.1 (6)'s provenance forms and the cell check every
// table cell passes before it loads (C-0012).
export { isUnit, UNITS, type Unit } from './unit.js';
export { provenanceForm, REFERENCES, type ProvenanceForm } from './provenance.js';
export {
  checkCell,
  isRecord,
  type Cell,
  type CellAt,
  type CellValue,
  type ExtensionMode,
  type ExtensionOver,
  type PresetId,
  type PresetValue,
  type TableIssue,
} from './cell.js';
