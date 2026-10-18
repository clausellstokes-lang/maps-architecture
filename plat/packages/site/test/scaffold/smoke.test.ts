// Scaffold smoke test of @plat/site (M0-s-01): the package index loads from its source, every workspace dependency
// imported by name resolves through the `plat-source` condition to the very module its src/ path gives (C-0013), and
// fast-check runs exactly PLAT_FUZZ_RUNS cases (C-0057).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import * as self from '../../src/index.js';
import * as kernelByName from '@plat/kernel';
import * as kernelByPath from '../../../kernel/src/index.js';
import * as modelByName from '@plat/model';
import * as modelByPath from '../../../model/src/index.js';
import * as tablesByName from '@plat/tables';
import * as tablesByPath from '../../../tables/src/index.js';

describe('@plat/site scaffold', () => {
  it('loads its index from source', () => {
    expect(self).toBeTypeOf('object');
  });

  it('resolves each workspace dependency by name to its source module', () => {
    expect(kernelByName).toBe(kernelByPath);
    expect(modelByName).toBe(modelByPath);
    expect(tablesByName).toBe(tablesByPath);
  });

  it('runs fast-check under the PLAT_FUZZ_RUNS contract', () => {
    const expected = process.env.PLAT_FUZZ_RUNS ? Number(process.env.PLAT_FUZZ_RUNS) : 10_000;
    expect(fc.readConfigureGlobal().numRuns).toBe(expected);
    let runs = 0;
    fc.assert(
      fc.property(fc.integer(), (n) => {
        runs += 1;
        return n - n === 0;
      }),
    );
    expect(runs).toBe(expected);
  });
});
