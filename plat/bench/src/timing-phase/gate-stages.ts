// The Chromium-worker leg's stage table (M0-t-00; §12.1 "again inside Chrome's worker on the same seeds and sizes";
// C-0082, C-0440 (3)): bundled by M0-d-06's cross-host runner for the browser (no Node or DOM API here), run with workers
// on (a dedicated Web Worker) in its timing mode, which reads the harness's clock around each stage call. One stage per
// gate: the fusion run (a) at CITY (M0-c-06's `derive`) and each site fixture's derivation at CITY (M0-e-06's
// `deriveSpike`, the default configuration) — the same calls, seeds and sizes the Node leg times in-process. A call
// returns the derivation's model root, so the legs' runs stay comparable as M0-d-06 compares them.
import type { CrossHostDigest, CrossHostStage } from '@plat/testkit';
import type { Hash128 } from '@plat/kernel';
import { derive } from '../fusion/runs.js';
import { deriveSpike } from '../site/compose.js';
import { SITE_FIXTURES } from '../site/fixtures.js';

/** An H128 as 32 lower-case hexadecimal digits, word 0 first (the cross-host digest form). */
function hex(h: Readonly<Hash128>): string {
  let s = '';
  for (let i = 0; i < 4; i += 1) s += ((h[i] as number) >>> 0).toString(16).padStart(8, '0');
  return s;
}

/** The fusion gate's call. */
const fusionCall: CrossHostStage = {
  id: 'fusion.call',
  run: (seed): CrossHostDigest => ({ model: hex(derive('fusion', seed).model.root), records: null }),
};

/** Each site fixture's call. */
const siteCalls: CrossHostStage[] = SITE_FIXTURES.map((f) => ({
  id: `site.${f.name}.call`,
  run: (seed): CrossHostDigest => ({ model: hex(deriveSpike(f, seed, 'default', 'city').model.root), records: null }),
}));

/** The table the fixture's entry exports under this name (M0-d-06's form). */
export const crosshostStages: readonly CrossHostStage[] = Object.freeze([fusionCall, ...siteCalls]);
