// lint-as: scripts/zz-fixture-research.mjs
// Paths that leave plat/ are refused lexically, before anything outside plat/ is touched (§17.1 (3)).
import data from '../../research/x.json' with { type: 'json' }; // planted: outside
import { join } from 'node:path';
const capture = new URL('../../captures/y.json', import.meta.url); // planted: outside
const reference = join(import.meta.dirname, '..', '..', 'reference', 'z'); // planted: outside
const absolute = () => import('/etc/hosts'); // planted: outside
const missing = () => import('zz-no-such-package-inside-plat'); // planted: unresolved
export { data, capture, reference, absolute, missing };
