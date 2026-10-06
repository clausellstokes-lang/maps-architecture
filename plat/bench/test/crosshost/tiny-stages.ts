// A tiny stage table for the bench runner's tests (M0-d-06): two pure stages over @plat/kernel's H128, one unseeded.
import { H128, utf8Bytes } from '@plat/kernel';
import type { CrossHostStage } from '@plat/testkit';

const hex = (t: string): string =>
  H128(utf8Bytes(t))
    .map((w) => w.toString(16).padStart(8, '0'))
    .join('');

export const crosshostStages: readonly CrossHostStage[] = [
  { id: 'once', seeded: false, run: () => ({ model: hex('once'), records: null }) },
  { id: 'per-seed', run: (seed) => ({ model: hex(`per-seed/${String(seed)}`), records: hex(`rec/${String(seed)}`) }) },
];
