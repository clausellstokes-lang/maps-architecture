// bench/src/host — the host record and the reference score (M0-f-01; §12.1; C-0025, C-0050, C-0075).
// The folder was created empty by the scaffold (M0-s-01, C-0013) and belongs to M0-f-01; `reference-score.json` is
// handed over to M0-t-01, whose timing-phase run writes the score once.
export { describeHost, hostKind, hostRecord, sysctl } from './record.js';
export type { HostKind, HostRecord } from './record.js';
export { NO_REFERENCE_SCORE, REFERENCE_SCORE, REFERENCE_SCORE_PATH, readReferenceScore, writeReferenceScore } from './reference.js';
export type { ReferenceRun, ReferenceScore } from './reference.js';
