// M0-a-09's vacuity guard pinned (§13.1: "the harness … drawing ≥ 10⁵ unattracted cases per operation"; the spec note
// N-14; C-0196 (7)'s rule): each agreement test asserts min(10⁵, ⌈⅒ × runs⌉) unattracted draws per operation, so the
// nightly 10⁶ run asserts §13.1's 10⁵ exactly and the PR's 10⁴ a floor of 1 000. This file holds the guard's arithmetic
// and the corridor judge's own pins: kerb(F) = F for a face with no bounding spine, and a crossing's corner square.
import { describe, expect, it } from 'vitest';
import { UNATTRACTED_DRAW_MIN } from '../../../src/oracles/index.js';
import { guardFor, MIN_UNATTRACTED_SHARE, oursCorridor, drawCase } from './support.js';

describe('the vacuity guard (§13.1, N-14)', () => {
  it('asserts 10⁵ unattracted draws at the nightly 10⁶ and a tenth of the draws below it', () => {
    expect(UNATTRACTED_DRAW_MIN).toBe(100_000);
    expect(MIN_UNATTRACTED_SHARE).toBe(0.1);
    expect(guardFor(1_000_000)).toBe(100_000);
    expect(guardFor(10_000_000)).toBe(100_000);
    expect(guardFor(999_990)).toBe(99_999);
    expect(guardFor(10_000)).toBe(1_000);
    expect(guardFor(1)).toBe(1);
  });

  it('M0-k-02’s spine-less face: kerb(F) = F, one built block (the judge reads it whole)', () => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const d = drawCase('limit/one-item-kerb-no-spine', seed);
      const ring = d.rings.face.slice();
      // a face bounded by a district boundary (no half-width): the case's ways declare none
      const ours = oursCorridor({ ring, chord: null, hw: 0, role: 'district_bound', key: { layer: 'ground', part: 0 }, source: 'limit/one-item-kerb-no-spine' });
      expect(ours).not.toBeNull();
      if (ours === null) continue;
      expect('refused' in ours).toBe(false);
      if ('refused' in ours) continue;
      expect(ours.bands).toEqual([]);
      expect(ours.blocks.length).toBe(1);
      let a = 0;
      let b = 0;
      for (let i = 0; i < ring.length; i += 1) a += ring[i].x * ring[(i + 1) % ring.length].y - ring[(i + 1) % ring.length].x * ring[i].y;
      const blk = ours.blocks[0];
      for (let i = 0; i < blk.length; i += 1) b += blk[i].x * blk[(i + 1) % blk.length].y - blk[(i + 1) % blk.length].x * blk[i].y;
      expect(b).toBe(a);
    }
  });
});
