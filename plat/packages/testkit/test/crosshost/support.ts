// Shared fixtures of the cross-host tests (M0-d-06): the kernel fixture as committed, small fixtures over its stage
// table, and the legs this machine can run (planned exactly as the runner plans them).
import { crossHostFixtureFrom, loadCrossHostFixture, planCrossHostLeg, type CrossHostFixture, type CrossHostLegId } from '@plat/testkit';

/** The committed kernel fixture (the CLI's `crosshost run kernel`). */
export const KERNEL_FIXTURE_PATH = 'bench/src/crosshost/fixtures/kernel.json';

export function kernelFixture(): CrossHostFixture {
  return loadCrossHostFixture(KERNEL_FIXTURE_PATH);
}

/** The kernel fixture cut to a few seeds and stages (its inputs and entry unchanged). */
export function smallKernelFixture(seeds: number[], stages: string[], id = 'kernel-small'): CrossHostFixture {
  const k = kernelFixture();
  return { ...k, id, source: `${KERNEL_FIXTURE_PATH} (cut)`, seeds, stages };
}

/** A fixture over a test stage table in this folder (a plat/-relative entry). */
export function testFixture(entry: string, seeds: number[], stages: string[], id: string): CrossHostFixture {
  return crossHostFixtureFrom({ id, entry, seeds, stages }, `test fixture ${id}`);
}

/** Is this the reference Mac (macOS on arm64), where every Node leg must run? */
export const ON_REFERENCE_MAC = process.platform === 'darwin' && process.arch === 'arm64';

/** The Node legs runnable here. */
export async function runnableNodeLegs(): Promise<CrossHostLegId[]> {
  const out: CrossHostLegId[] = [];
  for (const leg of ['node-arm64', 'node-x64-rosetta'] as const) if ((await planCrossHostLeg(leg)).runnable) out.push(leg);
  return out;
}

/** The test timeout of a whole-fixture run (ms): the child legs bundle and run the full known-answer sets. */
export const RUN_TIMEOUT_MS = 600_000;
