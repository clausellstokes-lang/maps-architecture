// M0-a-11: §3.8's work limit — "the event queue runs under a work limit of 4 · (n + r) + 64 events for n vertices and
// r reflex vertices — a correct run needs at most about n + r — and exceeding it is E_WORK_LIMIT, a count and never a
// timeout" — and F-WORK's charge (`skeleton.events`, M0.md §2.2: the law stands as the floor of the table's row). A
// correct construction never needs more than its law on any input (every event retires a vertex or a reflex vertex),
// so the adversarial input is the fault the limit exists for: an event that resolves nothing and recurs forever, made
// by the engine's test hook (C-0168 (5)). It must end in E_WORK_LIMIT with the count, never a hang; and on inputs built
// to make many events (combs of reflex teeth, holed grids) the count stays inside the law.
import { describe, expect, it } from 'vitest';
import { runEngine } from '../../src/skeleton/engine.js';
import { runSkeleton } from '../../src/skeleton/skeleton.js';
import { skeleton, skeletonEventLimit } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { holedPolygons, pt } from './support.js';

/** A comb: a 60 m × 5 m base with `k` teeth 20 m tall standing on it — 4 + 4k vertices, 2k of them reflex. */
function comb(k: number): LatticePoint[] {
  const W = 6_000;
  const p = W / k;
  const ring: LatticePoint[] = [pt(0, 0), pt(W, 0), pt(W, 500)];
  for (let i = k - 1; i >= 0; i -= 1) {
    const x0 = Math.round(i * p + p / 4);
    const x1 = Math.round(i * p + (3 * p) / 4);
    ring.push(pt(x1, 500), pt(x1, 2_500), pt(x0, 2_500), pt(x0, 500));
  }
  ring.push(pt(0, 500));
  return ring;
}

describe('the work limit: 4 · (n + r) + 64 events (§3.8, F-WORK)', () => {
  it('the law', () => {
    expect(skeletonEventLimit(4, 0)).toBe(80);
    expect(skeletonEventLimit(6, 1)).toBe(92);
    expect(skeletonEventLimit(100, 40)).toBe(624);
  });

  it('an event that never resolves (the adversarial fault) ends in E_WORK_LIMIT at law + 1 events, never a hang', () => {
    const L = [pt(0, 0), pt(2_000, 0), pt(2_000, 500), pt(500, 500), pt(500, 2_000), pt(0, 2_000)];
    const law = skeletonEventLimit(6, 1);
    let calls = 0;
    const r = runSkeleton([L], 'roof', {}, { skipResolution: () => (calls += 1) > 0 });
    expect(r.ok).toBe(true);
    if (!r.ok || r.value.kind !== 'downgrade') throw new Error('expected a downgrade');
    expect(r.value.cause).toEqual({ code: 'E_WORK_LIMIT', count: law + 1, limit: law });
    expect(r.value.to).toBe('plainRoof');
    expect(r.value.events).toBe(law + 1);
    expect(r.warnings).toEqual([{ code: 'W_DOWNGRADE', count: 1 }]);
    expect(calls).toBe(law); // the (law + 1)-th event is refused before it runs
  });

  it('a fold that never resolves is charged the same way', () => {
    // a rectangle's first end event makes a fold; refuse every resolution from the second event on
    const rect = [pt(0, 0), pt(2_000, 0), pt(2_000, 1_000), pt(0, 1_000)];
    const r = runSkeleton([rect], 'spine', {}, { skipResolution: (e) => e >= 2 });
    if (!r.ok || r.value.kind !== 'downgrade') throw new Error('expected a downgrade');
    expect(r.value.cause).toEqual({ code: 'E_WORK_LIMIT', count: 81, limit: 80 });
    expect(r.value.to).toBe('medialAxis');
  });

  it('a table law above the floor raises the limit; one below it is raised to the floor', () => {
    const sq = [pt(0, 0), pt(1_000, 0), pt(1_000, 1_000), pt(0, 1_000)];
    const above = runSkeleton([sq], 'roof', { maxEvents: 500 }, { skipResolution: () => true });
    if (!above.ok || above.value.kind !== 'downgrade') throw new Error('expected a downgrade');
    expect(above.value.cause).toEqual({ code: 'E_WORK_LIMIT', count: 501, limit: 500 });
    const below = runSkeleton([sq], 'roof', { maxEvents: 3 }, { skipResolution: () => true });
    if (!below.ok || below.value.kind !== 'downgrade') throw new Error('expected a downgrade');
    expect(below.value.cause).toEqual({ code: 'E_WORK_LIMIT', count: 81, limit: 80 });
  });

  it('the engine itself under a limit the input needs more than: workLimit with the count', () => {
    const xs = new Float64Array([0, 2_000, 2_000, 500, 500, 0]);
    const ys = new Float64Array([0, 0, 500, 500, 2_000, 2_000]);
    const full = runEngine({ xs, ys, ringStart: new Int32Array([0, 6]) }, 1_000);
    expect(full.status).toBe('ok');
    const cut = runEngine({ xs, ys, ringStart: new Int32Array([0, 6]) }, full.events - 1);
    expect(cut.status).toBe('workLimit');
    expect(cut.events).toBe(full.events);
  });

  it('inputs built for many events stay inside the law: combs of reflex teeth and holed polygons', () => {
    let worst = 0;
    for (const k of [2, 5, 10, 20, 40]) {
      const ring = comb(k);
      const r = skeleton([ring], 'regions');
      expect(r.ok && r.value.kind).toBe('skeleton');
      if (r.ok && r.value.kind === 'skeleton') {
        const n = r.value.rings[0].length;
        expect(n).toBe(4 + 4 * k);
        expect(r.value.events).toBeLessThanOrEqual(skeletonEventLimit(n, 2 * k));
        worst = Math.max(worst, r.value.events / (n + 2 * k));
      }
    }
    for (const rings of holedPolygons(7, 100)) {
      const r = skeleton(rings, 'spine');
      if (r.ok && r.value.kind === 'skeleton') {
        let n = 0;
        for (const ring of r.value.rings) n += ring.length;
        expect(r.value.events).toBeLessThanOrEqual(skeletonEventLimit(n, 0));
      }
    }
    expect(worst).toBeLessThan(1.5);
  });
});
