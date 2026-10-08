// M0-a-08 under the re-read rule (N-53 (4), (5); plat.ts's growth header; C-0292): the scratch overlay's writers read
// the arena's vertex columns only after their last allocation, so a table that grows mid-call — and a growth REPLACES
// the arrays it grows — never feeds them a dead copy. The guard plants the growth and makes a dead copy loud: every
// arena this file makes runs in the tiny-tables mode (M0-a-02's `setTinyTables`: every table starts at capacity 1 and
// every allocation replaces it), and `createPlat` is wrapped so that each vertex table a growth replaces is poisoned —
// its x and y columns overwritten with distinct points far off the lattice. A stale read then turns into an off-lattice
// bridge or a wrong gap test, never into the right answer. `bridgeGaps` (winding.ts) is the one capture of the class in
// this item's five files (N-53's census; this round's audit of winding.ts, booleans.ts, buffer.ts, offsetFace.ts and
// insetRing.ts found no other function that both holds a table or column and allocates): the case below inserts two
// bridges in one ring, the first crossing an edge of the other operand, so the vertex table grows between the two gap
// readings. Each result equals the default-size result and its hand answer.
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { setTinyTables, tinyTables } from '../../../src/arena/debug.js';
import { handleOf } from '../../../src/arena/index.js';
import { booleans, buffer, buildOverlay, faceEdges, insetRing, offsetFace } from '../../../src/arr/index.js';
import { arenaFace, R, rect } from './support.js';

const poison = vi.hoisted(() => {
  /** Far off the lattice (|v| < 2²³) and distinct per slot, so a stale gap reading is never 0 and never on the lattice. */
  const BASE = 0x3f00_0000;
  const state = { armed: false, replaced: 0 };
  function poisonOnGrowth<T extends object>(p: T): T {
    let cur = (p as unknown as { vertices: { x: Int32Array; y: Int32Array } }).vertices;
    Object.defineProperty(p, 'vertices', {
      configurable: true,
      enumerable: true,
      get: () => cur,
      set: (next: { x: Int32Array; y: Int32Array }) => {
        if (next !== cur && state.armed) {
          state.replaced += 1;
          for (let i = 0; i < cur.x.length; i += 1) {
            cur.x[i] = BASE + i;
            cur.y[i] = -(BASE + i);
          }
        }
        cur = next;
      },
    });
    return p;
  }
  return { state, poisonOnGrowth };
});

vi.mock('../../../src/arena/index.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arena/index.js')>();
  return { ...real, createPlat: (...args: Parameters<typeof real.createPlat>) => poison.poisonOnGrowth(real.createPlat(...args)) };
});


type Run<T> = () => T;

/** The call in the default sizes, unpoisoned, then under planted growth with every replaced vertex table poisoned. */
function both<T>(f: Run<T>): { plain: T; grown: T; replaced: number } {
  const was = tinyTables();
  setTinyTables(false);
  poison.state.armed = false;
  const plain = f();
  setTinyTables(true);
  poison.state.armed = true;
  poison.state.replaced = 0;
  try {
    const grown = f();
    return { plain, grown, replaced: poison.state.replaced };
  } finally {
    poison.state.armed = false;
    setTinyTables(was);
  }
}

let before = false;
beforeAll(() => {
  before = tinyTables();
});
afterAll(() => {
  setTinyTables(before);
  poison.state.armed = false;
});

// A square whose right side starts with a run of ten 10 cm steps and whose left side ends with a run of four — every
// step collapses alone and each run spans minEdge or more, so each is bridged (C-0196 (1)); the second operand's bar
// crosses the right run's 100 cm bridge at (1000, 50), beyond attraction from both its ends, so the first bridge splits
// the bar's edge and allocates a vertex (a growth in the tiny-tables mode) before the second gap is read.
const RIGHT_RUN: [number, number][] = Array.from({ length: 10 }, (_, i) => [1000, 10 * (i + 1)]);
const STAIRS = R([0, 0], [1000, 0], ...RIGHT_RUN, [1000, 1000], [0, 1000], [0, 990], [0, 980], [0, 970], [0, 960]);
const BAR = rect(900, 50, 1100, 150);

describe('the scratch overlay reads the vertex columns after its last allocation (N-53 (5))', () => {
  it('two bridges in one ring, the vertex table grown between them: the result of the default sizes', () => {
    const r = both(() => booleans('union', [STAIRS], [BAR], 'nonzero'));
    expect(r.replaced).toBeGreaterThan(0);
    expect(r.plain).toMatchObject({ ok: true, value: [R([0, 0], [1000, 0], [1000, 50], [1100, 50], [1100, 150], [1000, 150], [1000, 1000], [0, 1000])] });
    // a dead copy read for the second gap loses the square without a refusal (the pre-fix code: only the bar is left)
    expect(r.grown).toEqual(r.plain);
  });

  it('the overlay of the stairs alone inserts both bridges, and its rings are the square', () => {
    const r = both(() => {
      const ov = buildOverlay([[STAIRS]]);
      if (!ov.ok) return { ok: false as const, code: ov.code };
      // the input's 18 segments, none repeated: the bridges are segments 18 and 19
      return { ok: true as const, bridges: [handleOf(ov.value.plat, 'arr:s18') >= 0, handleOf(ov.value.plat, 'arr:s19') >= 0] };
    });
    expect(r.plain).toEqual({ ok: true, bridges: [true, true] });
    expect(r.grown).toEqual(r.plain);
    const u = both(() => booleans('union', [STAIRS], [], 'nonzero'));
    expect(u.plain).toMatchObject({ ok: true, value: [rect(0, 0, 1000, 1000)] });
    expect(u.grown).toEqual(u.plain);
  });

  it('booleans, buffer, offsetFace and insetRing under planted growth equal their default-size results', () => {
    const A = [rect(0, 0, 1000, 1000)];
    const B = [rect(500, 500, 1500, 1500)];
    for (const op of ['union', 'intersection', 'difference', 'xor'] as const) {
      const r = both(() => booleans(op, A, B, 'evenodd'));
      expect(r.grown).toEqual(r.plain);
    }
    const chain = R([0, 0], [3000, 0], [3000, 2000], [500, 2500]);
    for (const joins of ['round', 'square', 'miter'] as const) {
      const r = both(() => buffer([chain], 300, joins, 'round'));
      expect(r.plain.ok).toBe(true);
      expect(r.grown).toEqual(r.plain);
    }
    const L = R([0, 0], [3000, 0], [3000, 1000], [1000, 1000], [1000, 3000], [0, 3000]);
    const off = both(() => {
      const { tx, face } = arenaFace([L]);
      return offsetFace(tx, face, faceEdges(tx, face).map((_, i) => 100 + 50 * i));
    });
    expect(off.plain.ok).toBe(true);
    expect(off.grown).toEqual(off.plain);
    const inset = both(() => {
      const { tx, face } = arenaFace([rect(0, 0, 2000, 1000)]);
      return [insetRing(tx, face, 200), insetRing(tx, face, -150), insetRing(tx, face, 600)];
    });
    expect(inset.plain[0].ok).toBe(true);
    expect(inset.grown).toEqual(inset.plain);
  });
});
