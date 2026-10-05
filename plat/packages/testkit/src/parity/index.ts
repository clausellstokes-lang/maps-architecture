// @plat/testkit's parity module (M0-k-05; §13.5, §17.1 (4); C-0068, C-0092, C-0101, C-0113, C-0116, C-0180): the
// `Baseline` and `ParityReport` types, the `baselines.json` reader, the band rule, the parity CLI (`corepack pnpm
// parity`), `plat baselines check` in its M0 form (`corepack pnpm baselines:check -- <file>`) with the minimal
// `CrossingRecord`, and the `ng-faces.json` loader. The scaffold created this index empty (M0-s-01, C-0013); it belongs
// to M0-k-05.
export type {
  Baseline,
  BaselineReference,
  BaselineValues,
  FtgSize,
  ParityOurs,
  ParityReport,
  ParityRow,
  ParityUnread,
  ParityVerdict,
  PresetArm,
  WaterSetting,
} from './types.js';
export { ParityStop, PRESET_ARMS, WATER_SETTINGS } from './types.js';
export { EMPTY_BASELINES, memberCount, PROVENANCE_FIELDS, readBaselines, type BaselineFile } from './baselines.js';
export { bandRule, KS_FACTOR, NOTE_V12_AT_M1, type BandOutcome, type OursCell } from './band.js';
export { cellKey, NOTE_M1_MISSING, parityReport, rowRung, selectRows, type ParityInput, type Selected, type Selection } from './report.js';
export { EMPTY_OURS, EMPTY_SEED_FAMILY, OURS_SCHEMA, oursFromDocs, readOurs } from './ours.js';
export { BASELINES_FILE, judgesNothing, NOTE_JUDGES_NOTHING, parityArgs, PARITY_USAGE, runParity, type ParityRun } from './cli.js';
export { canonicalJson as parityCanonicalJson, hash128Hex } from './canonical.js';
export { insidePlat, platRelative, resolveInPlat } from './paths.js';
export {
  loadNgFaces,
  loadNgFacesFile,
  NG_FACES_SCHEMA,
  NgFacesRefusal,
  ngFacesProblems,
  type NgCut,
  type NgFace,
  type NgFacesFile,
  type NgHood,
  type NgPoint,
} from './ngfaces.js';
export { DENYLIST_SCHEMA, denylistProblems } from './denylist.js';
export { CROSSING_MEMBERS, crossingRecordProblem, recordCheck, type CrossingRecord, type RecordOutcome } from './crossing.js';
export { baselinesCheck, CHECKS_RUN, kindOfFile, rowCount, type BaselinesCheckReport, type CheckKind, type CheckLine } from './check.js';
export { BASELINES_CHECK_USAGE, runBaselinesCheck, type BaselinesCheckRun } from './check-cli.js';
