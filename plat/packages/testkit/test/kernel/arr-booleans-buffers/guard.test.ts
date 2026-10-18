// M0-a-08's vacuity guard pinned (§13.1: "the harness … drawing ≥ 10⁵ unattracted cases per operation"; C-0196 (7);
// the spec note N-14): the agreement test asserts min(10⁵, ⌈⅒ × runs⌉) unattracted draws per operation, so the nightly
// 10⁶ run asserts §13.1's 10⁵ exactly and the PR's 10⁴ a floor of 1 000. This file holds the guard's arithmetic, which
// the agreement test reads but cannot check by itself, and the judge's split on a case attraction emptied.
import { booleans, type Cm, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { UNATTRACTED_DRAW_MIN } from '../../../src/oracles/index.js';
import { guardFor, MIN_UNATTRACTED_SHARE, warningsOf } from './support.js';

const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

describe('the vacuity guard (§13.1, C-0196 (7))', () => {
  it('asserts 10⁵ unattracted draws at the nightly 10⁶ and a tenth of the draws below it', () => {
    expect(UNATTRACTED_DRAW_MIN).toBe(100_000);
    expect(MIN_UNATTRACTED_SHARE).toBe(0.1);
    expect(guardFor(1_000_000, UNATTRACTED_DRAW_MIN)).toBe(100_000);
    expect(guardFor(10_000_000, UNATTRACTED_DRAW_MIN)).toBe(100_000);
    expect(guardFor(999_990, UNATTRACTED_DRAW_MIN)).toBe(99_999);
    expect(guardFor(10_000, UNATTRACTED_DRAW_MIN)).toBe(1_000);
    expect(guardFor(9_991, UNATTRACTED_DRAW_MIN)).toBe(1_000);
    expect(guardFor(1, UNATTRACTED_DRAW_MIN)).toBe(1);
  });

  it('the judge reads an empty result’s warnings, so a result attraction emptied is an attracted case (C-0196 (4))', () => {
    const sliver = booleans('intersection', [[pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)]], [[pt(990, 0), pt(2000, 0), pt(2000, 1000), pt(990, 1000)]], 'nonzero');
    expect(sliver.ok).toBe(false);
    expect(warningsOf(sliver).some((w) => w.code === 'W_ATTRACTED' || w.code === 'W_STRETCH_SHARED' || w.code === 'W_PLACED' || w.code === 'W_WEDGE_ROUTED')).toBe(true);
  });
});
