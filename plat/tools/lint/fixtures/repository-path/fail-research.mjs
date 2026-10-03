// lint-as: scripts/zz-fixture-research.mjs
// Paths that leave plat/ are refused lexically, before anything outside plat/ is touched (§17.1 (3)): one planted line
// per form the rule judges (C-0127 (2), C-0130) — static import and re-exports, URL, joined and resolved paths from
// import.meta.dirname and __dirname (a call or a member's), import.meta.resolve, dynamic import, require.
import data from '../../research/x.json' with { type: 'json' }; // planted: outside
import { join, resolve } from 'node:path';
import * as path from 'node:path';
const capture = new URL('../../captures/y.json', import.meta.url); // planted: outside
const reference = join(import.meta.dirname, '..', '..', 'reference', 'z'); // planted: outside
const absolute = () => import('/etc/hosts'); // planted: outside
const missing = () => import('zz-no-such-package-inside-plat'); // planted: unresolved
export * from '../../research/all.mjs'; // planted: outside
export { named } from '../../captures/named.mjs'; // planted: outside
const resolved = import.meta.resolve('../../research/x.json'); // planted: outside
const fromResolve = resolve(import.meta.dirname, '../../research'); // planted: outside
const viaMember = path.join(import.meta.dirname, '..', '..', 'captures'); // planted: outside
const commonDir = join(__dirname, '..', '..', 'reference'); // planted: outside
const required = require('../../research/x.json'); // planted: outside
export { data, capture, reference, absolute, missing, resolved, fromResolve, viaMember, commonDir, required };
