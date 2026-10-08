// The stage ladder-coverage check (M0-x-05; §13.1 *Ladder coverage*, §5.2, §5.4, §16 M0 (a); C-0085, C-0109, C-0269):
// the stage-rung registry `STAGE_LADDERS`, one fixture per rung M0 builds on the real stages, and
// `stageLadderCoverage()`, which merges M0-k-04's `ladderCoverage()` (the kernel ladders) unchanged into one report over
// §5.2. The package index re-exports this folder with `export *`, so every name but the design's two carries the folder.
export { checkLadderTable, KERNEL_LADDERS, leafOf as ladderLeafOf, SECTION_5_2, STAGE_LADDERS } from './table.js';
export { coverageSummary as stageCoverageSummary, plainBaseline as ladderPlainBaseline, stageLadderCoverage, type StageCoverageOptions } from './coverage.js';
export { ANTENNA_DISTRICT as LADDER_ANTENNA_DISTRICT, LADDER_CONTROLS, LADDER_FIXTURES, SLID_DISTRICT as LADDER_SLID_DISTRICT, type LadderFixture } from './fixtures.js';
export { runChain as ladderChain, type BaseStageName, type ChainOverrides, type ChainRun, type ChainSpec } from './chain.js';
export { readModel as ladderReadModel, readS8 as ladderReadS8, sumLeaves as ladderSumLeaves } from './readers.js';
export { lowFloor as ladderLowFloor, heightStrategy as ladderHeightStrategy, smallFlat as ladderSmallFlat, smallRiver as ladderSmallRiver } from './support.js';
export type { LadderRung, Leaves as LadderLeaves, PlainBaseline, StageCoverageReport, StageCoverageRow } from './types.js';
