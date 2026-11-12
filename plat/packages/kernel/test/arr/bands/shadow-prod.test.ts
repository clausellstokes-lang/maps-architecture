// M0-a-09 hardening round S20, line 4 (refute-bars BARS-10; dryrun.test.ts's vi.mock form): the shadow in a PRODUCTION
// build. With invariants/debug.js mocked to DEBUG_BUILD false (what a production bundle's `define` makes it), the shadow
// is not installed — setExactShadow(o) returns false and a read makes no record — unless `anyBuild` is passed (line 9's
// forced production measurement, in a mirror, alone): then it installs and a read makes one record.
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/invariants/debug.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/invariants/debug.js')>();
  return { ...real, DEBUG_BUILD: false };
});

import { DEBUG_BUILD } from '../../../src/invariants/debug.js';
import { readKerb } from '../../../src/arr/kerb.js';
import { setExactShadow, type ExactShadowRead } from '../../../src/arr/kerbExact.js';
import { network, readIn, widthsOf } from './support.js';

afterEach(() => {
  setExactShadow(null);
});

describe('line 4: the shadow installs only in a debug build, or where anyBuild asks (DEBUG_BUILD mocked false)', () => {
  it('DEBUG_BUILD false: setExactShadow(o) returns false and a read makes 0 records; { anyBuild: true } installs it and a read makes 1', () => {
    expect(DEBUG_BUILD).toBe(false);
    const { p, faces, table } = network([{ a: 500, b: 8500, hw: 60, knots: null, ends: 'round' }]);
    const ws = widthsOf(table);
    const records: ExactShadowRead[] = [];
    const o = { read: (r: ExactShadowRead) => records.push(r) };
    expect(setExactShadow(o)).toBe(false);
    readIn(p, 1, (t) => readKerb(t, faces[0], ws));
    expect(records.length).toBe(0);
    expect(setExactShadow(o, { anyBuild: true })).toBe(true);
    readIn(p, 1, (t) => readKerb(t, faces[0], ws));
    expect(records.length).toBe(1);
    expect(setExactShadow(null)).toBe(false);
    readIn(p, 1, (t) => readKerb(t, faces[0], ws));
    expect(records.length).toBe(1);
  });
});
