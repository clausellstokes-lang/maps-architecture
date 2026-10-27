// M0-a-09's vacuity guard pinned (§13.1: "the harness … drawing ≥ 10⁵ unattracted cases per operation"; the spec note
// N-14; C-0196 (7)'s rule): each agreement test asserts min(10⁵, ⌈⅒ × runs⌉) unattracted draws per operation, so the
// nightly 10⁶ run asserts §13.1's 10⁵ exactly and the PR's 10⁴ a floor of 1 000. This file holds the guard's arithmetic
// and the corridor judge's own pins: kerb(F) = F for a face with no bounding spine, and a crossing's corner square.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { UNATTRACTED_DRAW_MIN } from '../../../src/oracles/index.js';
import { corridorCaseArb, FRAME_MARGIN_CM, guardFor, MIN_UNATTRACTED_SHARE, oursCorridor, drawCase } from './support.js';

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

describe('the corridor cases stay inside the judge’s own frame (hardening round S14, notes row 7)', () => {
  it('every chord across a corridor case ends inside the frame oursCorridor lays round the case’s box, and still crosses the box', () => {
    // 4 000 draws of the agreement's own arbitrary (seed fixed: a property of the generator, not of the kernel): before
    // the clamp about one chord case in eight left the frame (the whole box diagonal and 400 cm from the centre), and the
    // arena refused the judge's chord E_LEVEL — 4 % of the agreement's draws settled `input-refused`
    let chords = 0;
    for (const c of fc.sample(corridorCaseArb, { seed: 20_261_014, numRuns: 4000 })) {
      if (c.chord === null) continue;
      chords += 1;
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      for (const q of c.ring) {
        x0 = Math.min(x0, q.x);
        y0 = Math.min(y0, q.y);
        x1 = Math.max(x1, q.x);
        y1 = Math.max(y1, q.y);
      }
      for (const q of c.chord) {
        expect(q.x > x0 - FRAME_MARGIN_CM && q.x < x1 + FRAME_MARGIN_CM && q.y > y0 - FRAME_MARGIN_CM && q.y < y1 + FRAME_MARGIN_CM, JSON.stringify(c)).toBe(true);
      }
      // past the box on both sides: the chord crosses the whole ring (the tunnel fixture's trunk is M0-k-02's own)
      if (c.source === 'fix/tunnel-corridor') continue;
      const [a, b] = c.chord;
      const out = (q: { x: number; y: number }): boolean => q.x < x0 || q.x > x1 || q.y < y0 || q.y > y1;
      expect(out(a) && out(b), JSON.stringify(c)).toBe(true);
    }
    expect(chords).toBeGreaterThan(1000);
  });
});
