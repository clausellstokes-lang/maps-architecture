// @plat/layout's fields module (M0-e-05; §4.5 *Fields*, *Soft terms*, *The band set*, *Bands*; §2.5 FieldBands; §6.1
// `field.chance`; §12.4's S6 row; §17.1 (8)'s exact distance transform and three-box blur; §5.2 F-WORK; R12-5; C-0049,
// C-0085; readings C-XXXX): the prosperity, density and greenery fields' pass 1 — the driver kernels on 32 m cells over
// frame + margin, the district-type term after typing, ε from the `field.chance` stream, the three-box Gaussian, the
// clamp, the raster and the per-face values — FieldBands' cuts at the default household shares with the middle band and
// the hysteresis, `drivers(points)` for the oracle, `field.cells` charged with F-WORK's coarser rung and R12-5's
// `fieldsCoarsen` switch. Created empty by the scaffold (M0-s-01, C-0013); this index and its folder belong to M0-e-05.
export {
  DISTANCE_CLASSES,
  DRIVER_TERMS,
  FIELD_NAMES,
  SOFT_TERMS,
  type CutResult,
  type DensityField,
  type DistanceClass,
  type DriverField,
  type DriverTerm,
  type DriverValue,
  type FaceValue,
  type FieldDistricts,
  type FieldDrivers,
  type FieldFace,
  type FieldGrid,
  type FieldName,
  type FieldSources,
  type FieldsReport,
  type FieldsWorkCut,
  type GreeneryField,
  type Path as FieldPath,
  type ProsperityField,
  type ScalarField,
} from './types.js';
export { fieldsCells, fieldsOwnTable, type FieldCells, type FieldsCells, type TermCells } from './table.js';
export { cellOf as fieldCellOf, fieldGrid, fillRings, markArea, markPath, markPoint, markSegment } from './grid.js';
export { distanceTransform, type DistanceField } from './edt.js';
export { blur3, boxFor, type BoxSpec } from './blur.js';
export { cutPoints, fieldBands, holdBand, middleOf } from './cuts.js';
export { fieldFaces, fieldDriverSources, type FieldSourceRecords } from './sources.js';
export {
  fieldCellsLimit,
  fieldChanceStream,
  fieldsDigest,
  fieldsDrivers,
  fieldsPass1,
  type FieldSite,
  type FieldsDriverState,
  type FieldsOptions,
  type FieldsPass1,
} from './pass1.js';
