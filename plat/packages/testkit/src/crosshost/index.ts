// The cross-host harness (M0-d-06; §6.5 (9) cross-host, §13.2's stage contract tests, §13.3's five-engine run, §12.1's
// host record and in-Chrome figures; C-0028, C-0051, C-0067, C-0082): the legs Node arm64, Node x86-64 (under Rosetta 2
// on the reference Mac), Chromium, Firefox and WebKit from the Playwright cache, each with workers off and on; the
// esbuild bundles of a fixture's stage table for Node and for browsers; the runner, its timing mode and the report
// naming the first differing stage and seed; the kernel fixtures' stage table. The bench's command `crosshost run
// <fixture>` is bench/src/crosshost/. The scaffold created this index empty (M0-s-01, C-0013); it belongs to M0-d-06.
// The package index re-exports this folder with `export *`, so every name carries the cross-host prefix.
export {
  CROSSHOST_LEGS,
  CROSSHOST_REFERENCE,
  CROSSHOST_WORKERS,
  type CrossHostCell,
  type CrossHostDifference,
  type CrossHostDigest,
  type CrossHostFixture,
  type CrossHostFixtureFile,
  type CrossHostHex,
  type CrossHostJob,
  type CrossHostKind,
  type CrossHostLegHost,
  type CrossHostLegId,
  type CrossHostLegResult,
  type CrossHostReport,
  type CrossHostRun,
  type CrossHostStage,
  type CrossHostStageContext,
  type CrossHostWorkers,
} from './types.js';
export { CROSSHOST_NAN_WORDS, CrossHostDigestWriter, crossHostDigestOf, crossHostF64FromHex, crossHostF64Words, crossHostHex } from './digest.js';
export { crossHostCheckSeeds, crossHostResolveStages, crossHostThrownText, runCrossHostJob, type CrossHostStageTable } from './leg.js';
export { CROSSHOST_PLAT_ROOT, crossHostFixtureFrom, crossHostInsidePlat, loadCrossHostFixture } from './fixture.js';
export { buildCrossHostBundles, type CrossHostBundles } from './bundle.js';
export {
  CROSSHOST_BROWSERS,
  CROSSHOST_THIS_MACHINE,
  crossHostCacheRoot,
  crossHostPlaywright,
  planCrossHostBrowserLeg,
  planCrossHostLeg,
  planCrossHostNodeLeg,
  type CrossHostBrowser,
  type CrossHostLegPlan,
  type CrossHostMachine,
} from './legs.js';
export { crossHostNodeHost, crossHostNodeKind } from './node-main.js';
export { CROSSHOST_BROWSER_GLOBAL } from './browser-main.js';
export { compareCrossHostRuns, crossHostFirstDifference, crossHostReportLines, crossHostRunOrder, crossHostTimes, formatCrossHostDifference, type CrossHostRunTimes } from './report.js';
export { crossHostJobOf, runCrossHost, type CrossHostRunOptions } from './runner.js';
export {
  CROSSHOST_DMATH_ROUTINES,
  CROSSHOST_LANES_FILE,
  CROSSHOST_XOSHIRO_FILES,
  crosshostStages as CROSSHOST_KERNEL_STAGES,
  crossHostCircumcentreSets,
  crossHostKatExpected,
  crossHostRegularFitRings,
  crossHostResultData,
  crossHostStream,
} from './kernel-stages.js';
