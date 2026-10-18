// The bar's growth-drift clause can fail at every chunk size (C-0258 (5); the checker's B-3): `driftRow` over synthetic
// chunks — one window above 90° fails a chunk of fewer than 100 windows, a median outside 15–30° fails a chunk of 20 or
// more, and a small chunk inside the clause passes.
import { describe, expect, it } from 'vitest';
import { driftRow, type BarRow } from './bar.js';

function chunk(...drifts: number[][]): BarRow[] {
  return drifts.map((drift, i) => ({ seed: i + 1, p5: 60, median: 90, share4: 0, cliff: false, drift, grown: 1, doc: { ways: [] } }));
}

describe('the bar’s growth-drift clause (driftRow)', () => {
  it('one window above 90° fails a chunk below 100 windows; ⌊1 %⌋ of 100 or more may lie above', () => {
    expect(() => driftRow(chunk([20, 95], [18]))).toThrow();
    expect(() => driftRow(chunk([20], [18]))).not.toThrow();
    const hundred = Array.from({ length: 100 }, (_, i) => 15 + (i % 10));
    expect(() => driftRow(chunk(hundred.slice(0, 99).concat([120])))).not.toThrow();
    expect(() => driftRow(chunk(hundred.slice(0, 98).concat([120, 130])))).toThrow();
  });

  it('a median outside 15–30° fails a chunk of 20 windows, and is not judged below 20', () => {
    expect(() => driftRow(chunk(Array.from({ length: 20 }, () => 40)))).toThrow();
    expect(() => driftRow(chunk(Array.from({ length: 20 }, () => 10)))).toThrow();
    expect(() => driftRow(chunk(Array.from({ length: 20 }, () => 22)))).not.toThrow();
    expect(() => driftRow(chunk(Array.from({ length: 19 }, () => 40)))).not.toThrow();
    expect(driftRow(chunk([10, 20], [30]))).toEqual({ windows: 3, p50: 20, over90: 0 });
  });
});
