// A test stage table (M0-d-06, hardening round S2, C-0466): one stage that digests the kernel's build flag DEBUG_BUILD
// (kernel/src/invariants/debug.ts: true in the debug build, false where the bundler defined PLAT_DEBUG_BUILD false), read
// from INSIDE the bundle a leg runs — so whether a leg's bundle is a production build is observed from the leg, never
// taken from the option the bundler was given. Engine-neutral: it imports only @plat/kernel at run time, so it bundles
// for Node and for browsers.
import { DEBUG_BUILD, H128, utf8Bytes } from '@plat/kernel';
import type { CrossHostStage } from '@plat/testkit';

/** The digest the stage writes for a build flag at a seed. */
export function crossHostDebugDigest(debugBuild: boolean, seed: number): string {
  return H128(utf8Bytes(`debug-build/${String(seed)}/${String(debugBuild)}`))
    .map((w) => w.toString(16).padStart(8, '0'))
    .join('');
}

export const crosshostStages: readonly CrossHostStage[] = [{ id: 'debug-build', run: (seed) => ({ model: crossHostDebugDigest(DEBUG_BUILD, seed), records: null }) }];
