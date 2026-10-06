// A test stage table (M0-d-06's planted-difference test): three stages, the middle one with a planted Math.random in its
// digest — the nondeterminism §6.5 (3)'s lint forbids in model code, planted here in a TEST bundle so the harness has a
// difference to find. `steady` and `after` are pure; `throws` throws the same error on every leg (an error is compared
// like a digest and agrees). It imports only @plat/kernel at run time, so it bundles for Node and for browsers.
import { H128, utf8Bytes } from '@plat/kernel';
import type { CrossHostStage } from '@plat/testkit';

function hex(text: string): string {
  return H128(utf8Bytes(text))
    .map((w) => w.toString(16).padStart(8, '0'))
    .join('');
}

export const crosshostStages: readonly CrossHostStage[] = [
  { id: 'steady', run: (seed) => ({ model: hex(`steady/${String(seed)}`), records: null }) },
  { id: 'planted', run: (seed) => ({ model: hex(`planted/${String(seed)}/${String(Math.random())}`), records: hex(`records/${String(seed)}`) }) },
  { id: 'after', run: (seed) => ({ model: hex(`after/${String(seed)}`), records: hex(`after-records/${String(seed)}`) }) },
  {
    id: 'throws',
    run: (seed) => {
      throw new RangeError(`refused at seed ${String(seed)}`);
    },
  },
];
