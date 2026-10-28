// The profile tool's hand-made fixtures (seat T1): a two-function generated source with an inline source map, a six-sample
// CPU profile over it, a driver record whose stage window holds five of the samples and two cut stamps, and a coverage
// of the same script. Small and fixed: the analysers' tests run no derivation.
import type { Coverage, CpuProfile, ProfileRecord, Sources } from '../../src/profile/index.js';

/** Line 1 maps to kernel/a/outer.ts:1, line 2 to layout/b/inner.ts:5 ("AAAA;ACIA": source +1, line +4). */
export const MAP = { version: 3, sources: ['../../packages/kernel/src/a/outer.ts', '../../packages/layout/src/b/inner.ts'], names: [], mappings: 'AAAA;ACIA' };
const LINE1 = 'function outer(){inner()}';
const LINE2 = 'function inner(){}';
export const SOURCE = `${LINE1}\n${LINE2}\n//# sourceMappingURL=data:application/json;base64,${Buffer.from(JSON.stringify(MAP)).toString('base64')}\n`;
export const INNER_OFFSET = LINE1.length + 1;
export const SOURCES: Sources = { '7': { url: 'file:///x/driver.mjs', source: SOURCE } };

const frame = (functionName: string, lineNumber: number, scriptId = '7', url = 'file:///x/driver.mjs'): CpuProfile['nodes'][number]['callFrame'] => ({ functionName, scriptId, url, lineNumber, columnNumber: 0 });

/** Samples at 1050 (before the stage), 1100, 1200, 1300, 1400, 1500 µs, each 100 µs but the first 50; ends at 1600. */
export const PROFILE: CpuProfile = {
  nodes: [
    { id: 1, callFrame: frame('(root)', -1, '0', ''), children: [2, 5] },
    { id: 2, callFrame: frame('outer', 0), children: [3] },
    { id: 3, callFrame: frame('inner', 1) },
    { id: 5, callFrame: frame('(garbage collector)', -1, '0', '') },
  ],
  startTime: 1000,
  endTime: 1600,
  samples: [2, 3, 3, 2, 5, 3],
  timeDeltas: [50, 50, 100, 100, 100, 100],
};

/** The stage S8 from 1100 µs to 1600 µs (500 µs); cuts at 1250 and 1450 µs, one kerb read at 1150 µs. */
export const RECORD: ProfileRecord = {
  run: 'fusion', seed: 3, stage: 'S8', mode: 'cpu', interval: 100, cuts: true, node: 'v24.12.0', v8: 'x', debugBuild: false,
  root: 'ab', stageRoots: {}, marks: { S5: { t0: '0', t1: '1000000', ms: 1 }, S8: { t0: '1100000', t1: '1600000', ms: 0.5 } }, totalMs: 2, lanes: 2, blocks: 2,
  cutCounts: { split: 1, hole: 1, kerbFace: 1 },
  armed: ['split@driver.mjs:1:0 -> {}', 'hole@driver.mjs:1:0 -> {}', 'kerbFace@driver.mjs:2:0 -> {}'],
  cutStamps: [['kerbFace', '1150000'], ['split', '1250000'], ['hole', '1450000']],
};

export const COVERAGE: Coverage = [
  {
    scriptId: '7',
    url: 'file:///x/driver.mjs',
    functions: [
      { functionName: 'outer', start: 0, count: 10 },
      { functionName: 'inner', start: INNER_OFFSET, count: 40 },
      { functionName: 'splitFace', start: 0, count: 4 },
      { functionName: 'connectHole2', start: 0, count: 1 },
      { functionName: 'rollback', start: 0, count: 2 },
      { functionName: 'rollback2', start: INNER_OFFSET, count: 3 },
    ],
  },
  { scriptId: '9', url: 'file:///y/other.mjs', functions: [{ functionName: '', start: 12, count: 7 }] },
];
