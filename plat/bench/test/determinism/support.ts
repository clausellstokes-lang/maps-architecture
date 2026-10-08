// Shared helpers of M0-d-09's tests (bench/test/determinism/, C-0114): the test frame, the Node leg this machine runs, a
// small configuration of the runner.
import { CROSSHOST_LEGS, CROSSHOST_PLAT_ROOT, planCrossHostLeg, type CrossHostLegId } from '@plat/testkit';
import { defaultConfig, type DeterminismConfig, type SpikeSize } from '../../src/determinism/index.js';

/** The tests' frame: sizes/test.json's (400 ha, 12 ha walled). */
export const TEST_SIZE: SpikeSize = Object.freeze({ areaHa: 400, walledHa: 12 });

/** The planted scratch table (plat/-relative) and its stages. */
export const PLANTED_ENTRY = 'bench/test/determinism/fixtures/planted-stages.ts';
export const PLANTED_STAGES = ['scratch.clean', 'scratch.planted', 'scratch.after'];

/** plat/ */
export const PLAT = CROSSHOST_PLAT_ROOT;

/** A Node leg this machine runs (the x86-64 one here, Rosetta's or native; arm64 on an arm64 host without it). */
export async function nodeLeg(): Promise<CrossHostLegId> {
  for (const leg of ['node-x64-rosetta', 'node-arm64'] as const) if ((await planCrossHostLeg(leg)).runnable) return leg;
  throw new Error('no Node leg runs on this machine');
}

/** A leg this machine cannot run (its run is `blocked`, the verdict at best `incomplete`), or null when every leg runs. */
export async function blockedLeg(): Promise<CrossHostLegId | null> {
  for (const leg of CROSSHOST_LEGS) if (!(await planCrossHostLeg(leg)).runnable) return leg;
  return null;
}

/** A small configuration: the test frame, one leg, no timing, one process. */
export async function testConfig(over: Partial<DeterminismConfig> = {}): Promise<DeterminismConfig> {
  return { ...defaultConfig(), size: 'test', legs: [await nodeLeg()], workers: ['off'], timing: false, jobs: 1, seeds: [1], pairs: 0, checks: 0, ...over };
}

/** The test timeout of a test that derives spikes. */
export const SLOW = 900_000;
