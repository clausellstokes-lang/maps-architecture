import { runS8 } from '../../../src/index.js';
import { twoDistricts } from './support.js';
const f = twoDistricts();
const t0 = Date.now();
const r = runS8(f.input, { report: undefined } as never);
console.log('ms', Date.now() - t0, r.ok);
