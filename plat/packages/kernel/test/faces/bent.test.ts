// M0-a-07, integration g8 B-1 part 2 (C-0214): a judged cut that the insertion brings back bent is refused, never
// thrown. The contact decision now foresees every bend this item knows of (isolated.test.ts), so the guard is driven
// here by a planted fault: insertChain (mocked) inserts the chain with one extra point beside a chosen segment, as an
// attraction the decision did not foresee would, and returns `placed` for the judged points. splitFace and connectHole
// must refuse E_NOT_TWO_CROSSINGS with the insertion undone by their own savepoint (a batch that goes on and writes
// holds only its later write); radialSplit and ringBand must refuse with their op savepoint put back. Before C-0214
// each of these threw 'a judged cut is inserted unbent' (faces/split.ts) or 'an unbent core ring …' (faces/fan.ts).
import { describe, expect, it, vi } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import { connectHole, pinVertices, radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import type * as Insert from '../../src/insert/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import type { Overlay } from '../../src/tx/index.js';
import { commit, content, faceAt, framed, pt } from './support.js';

/** The planted fault: off, or on for the `nth` insertion (0-based) from now, bending its segment `seg`. */
const fault = vi.hoisted(() => ({ on: false, nth: 0, seg: 0, seen: 0, bent: 0, move: false }));

vi.mock('../../src/insert/index.js', async (importOriginal) => {
  const k = await importOriginal<typeof Insert>();
  const bending: typeof k.insertChain = (tx, points, rows, cls, opts) => {
    if (!fault.on || fault.seen++ !== fault.nth) return k.insertChain(tx, points, rows, cls, opts);
    const n = points.length;
    const i = fault.seg;
    if (fault.move) {
      // The interior point `seg` inserted 40 cm off where it was judged (as if drawn onto a vertex there); `placed` as given.
      const moved = points.map((q, j) => (j === i ? { ...q, x: (q.x + 40) as typeof q.x } : q));
      const r = k.insertChain(tx, moved, rows, cls, opts);
      if (r.ok) fault.bent++;
      return r;
    }
    const a = points[i];
    const b = points[(i + 1) % n];
    // A point 60 cm left of the segment's midpoint: the chain no longer joins a and b by one edge.
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const extra = { x: Math.round((a.x + b.x) / 2 - (60 * dy) / len), y: Math.round((a.y + b.y) / 2 + (60 * dx) / len) };
    const pts = [...points.slice(0, i + 1), extra as typeof a, ...points.slice(i + 1)];
    const r = k.insertChain(tx, pts, rows, cls, opts);
    if (!r.ok) return r;
    fault.bent++;
    const placed = [...r.value.placed.slice(0, i + 1), ...r.value.placed.slice(i + 2)];
    return { ...r, value: { ...r.value, placed } };
  };
  return { ...k, insertChain: bending };
});

const DB = [{ role: 'district_bound', entity: 'd:9' }];

/** The frame, the closed square [1000, 3000] × [500, 1800], optionally a hole, and a `junction` knot to pin at (2000, 1800). */
function square(hole = false): Plat {
  const p = framed();
  const sq = [[1000, 500], [3000, 500], [3000, 1800], [2000, 1800], [1000, 1800]] as const;
  commit(p, 1, (o) => insertChain(o, sq.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'r:1' }], 'mandatory', { closed: true, knots: [{ index: 3, role: 'junction', ordinal: 0 }] }));
  if (hole) commit(p, 1, (o) => insertChain(o, [pt(1800, 1000), pt(2200, 1000), pt(2200, 1200), pt(1800, 1200)], [{ role: 'district_bound', entity: 'h:1' }], 'mandatory', { closed: true }));
  return p;
}
const pin = (o: Overlay) => pinVertices(o, [{ role: 'junction', entity: 'r:1' }]);

/**
 * The op under the fault (its `nth` insertion bent at segment `seg`), in a batch that then pins the junction: the op
 * refuses with `code`, the fault fired, and the arena equals a twin that only pinned (nothing of the op left).
 */
function bentRefused(hole: boolean, nth: number, seg: number, op: (o: Overlay, f: number) => KernelResult<unknown>, move = false): { code: string; detail: string } {
  const twin = square(hole);
  commit(twin, 1, pin);
  const p = square(hole);
  const f = faceAt(p, 1, 1100, 600);
  let out = { code: 'ok', detail: '' };
  Object.assign(fault, { on: true, nth, seg, seen: 0, bent: 0, move });
  try {
    commit(p, 1, (o) => {
      const r = op(o, f);
      if (!r.ok) out = { code: r.code, detail: r.detail };
      return pin(o);
    });
  } finally {
    fault.on = false;
  }
  expect(fault.bent, 'the planted bend fired').toBe(1);
  expect(content(p)).toBe(content(twin));
  return out;
}

describe('a judged cut the insertion brings back bent is refused, never thrown (C-0214)', () => {
  it('splitFace: E_NOT_TWO_CROSSINGS naming the bent segment; its own savepoint puts the insertion back', () => {
    const r = bentRefused(false, 0, 0, (o, f) => splitFace(o, f, [pt(1500, 500), pt(1500, 1800)], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(/the insertion bent the judged cut between \(1500, 500\) and \(1500, 1800\)/);
  });

  it('splitFace bent at a later segment of a bent cut (a bend the first-edge check alone would accept)', () => {
    const r = bentRefused(false, 0, 1, (o, f) => splitFace(o, f, [pt(1500, 500), pt(1700, 1100), pt(1500, 1800)], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(/between \(1700, 1100\) and \(1500, 1800\)/);
  });

  it('splitFace whose interior point comes back off where it was judged (each segment still one edge): refused', () => {
    const r = bentRefused(false, 0, 1, (o, f) => splitFace(o, f, [pt(1500, 500), pt(1700, 1100), pt(1500, 1800)], { rows: DB }), true);
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toMatch(/between \(1500, 500\) and \(1700, 1100\)/);
  });

  it('connectHole: E_NOT_TWO_CROSSINGS, the slit put back', () => {
    const r = bentRefused(true, 0, 0, (o, f) => connectHole(o, f, [pt(1000, 1100), pt(1800, 1100)], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('radialSplit: its later ray bent after the first cut wrote — refused, the op savepoint put back', () => {
    const r = bentRefused(false, 1, 0, (o, f) => radialSplit(o, f, pt(2000, 1100), [0, 9000, 27000], { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('ringBand: the core ring bent at a side other than its first — E_DEGENERATE collapsed, put back', () => {
    const r = bentRefused(false, 0, 2, (o, f) => ringBand(o, f, 200, { rows: DB }));
    expect(r).toEqual({ code: 'E_DEGENERATE', detail: 'collapsed' });
  });

  it('ringBand: a corner cut bent after the core and the slit wrote — refused, put back', () => {
    const r = bentRefused(false, 2, 0, (o, f) => ringBand(o, f, 200, { rows: DB }));
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
  });

  it('the control: with the fault off, the same ops commit', () => {
    const p = square();
    const f = faceAt(p, 1, 1100, 600);
    expect(commit(p, 1, (o) => splitFace(o, f, [pt(1500, 500), pt(1700, 1100), pt(1500, 1800)], { rows: DB })).value).toHaveLength(2);
    const q = square();
    expect((commit(q, 1, (o) => ringBand(o, faceAt(q, 1, 1100, 600), 200, { rows: DB })).value as { band: number[] }).band.length).toBeGreaterThanOrEqual(4);
  });
});
