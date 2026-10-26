// N-25's case named and counted (checks/M0-b-03-notes.md N-25; session ruling J489 (d); C-0426 corrects C-0344's KI): a
// split block's kerb at the cut, less its spine's band, may hold two parts on ONE side of the spine (a non-convex kerb
// whose one side the band cuts in two); the block records one seed per L1 face (the record's format, which waits for
// M1's records), so one part is seedless. C-0344 said the case was "not seen on the registered seeds"; it is seen on
// integrated CITY 5 (`block:db2f94wpgb4e9`: the child face's kerb in two parts, 431.7 and 42.7 m², one seed). This
// reading names the case and counts its seedless parts, as a harness reads a split block back (the parent's kerb at the
// cut less the spine's band, side by side): the registered block reads one seedless part; an ordinary split none.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { chainRuns } from '../../../src/index.js';
import { GROUND, runFixture, twoDistricts, waySegments } from './support.js';

type XY = { x: number; y: number };

const CASE = JSON.parse(readFileSync(new URL('./seedless-part.json', import.meta.url), 'utf8')) as { block: string; seeds: XY[]; kerb: XY[]; spine: { way: string; widthCm: number; points: XY[] } };

function inRing(ring: readonly XY[], p: XY): boolean {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) c = !c;
  }
  return c;
}

/** The distance from p to a polyline and the side of it p lies on (the nearest segment's cross sign). */
function toLine(line: readonly XY[], p: XY): { d: number; side: number } {
  let best = { d: Infinity, side: 0 };
  for (let i = 0; i + 1 < line.length; i += 1) {
    const a = line[i];
    const b = line[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    const t = l2 > 0 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2)) : 0;
    const d = Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
    if (d < best.d) best = { d, side: Math.sign(dx * (p.y - a.y) - dy * (p.x - a.x)) };
  }
  return best;
}

/**
 * The parts of a split block's kerb at the cut less its spine's band (a 50 cm raster, 4-connected), each with its side
 * of the spine, its area (m²) and whether a recorded seed lies in it; parts under `minM2` (the raster's fringe) dropped.
 */
function splitParts(kerb: readonly XY[], spine: readonly XY[], hw: number, seeds: readonly XY[], minM2 = 5): { side: number; m2: number; seeded: boolean }[] {
  const cell = 50;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of kerb) {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  }
  const nx = Math.ceil((x1 - x0) / cell);
  const ny = Math.ceil((y1 - y0) / cell);
  const label = new Int32Array(nx * ny).fill(-1);
  const land = new Int8Array(nx * ny);
  const at = (i: number, j: number): XY => ({ x: x0 + (i + 0.5) * cell, y: y0 + (j + 0.5) * cell });
  for (let i = 0; i < nx; i += 1) {
    for (let j = 0; j < ny; j += 1) {
      const p = at(i, j);
      if (!inRing(kerb, p)) continue;
      const t = toLine(spine, p);
      if (t.d <= hw) continue;
      land[i * ny + j] = t.side > 0 ? 1 : 2;
    }
  }
  const parts: { side: number; cells: number; seeded: boolean }[] = [];
  for (let s = 0; s < nx * ny; s += 1) {
    if (land[s] === 0 || label[s] >= 0) continue;
    const id = parts.length;
    const side = land[s];
    let count = 0;
    const stack = [s];
    label[s] = id;
    while (stack.length > 0) {
      const c = stack.pop() as number;
      count += 1;
      const i = Math.floor(c / ny);
      const j = c % ny;
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const a = i + di;
        const b = j + dj;
        if (a < 0 || b < 0 || a >= nx || b >= ny) continue;
        const n = a * ny + b;
        if (land[n] === side && label[n] < 0) {
          label[n] = id;
          stack.push(n);
        }
      }
    }
    parts.push({ side, cells: count, seeded: false });
  }
  for (const q of seeds) {
    const i = Math.floor((q.x - x0) / cell);
    const j = Math.floor((q.y - y0) / cell);
    if (i < 0 || j < 0 || i >= nx || j >= ny) continue;
    const l = label[i * ny + j];
    if (l >= 0) parts[l].seeded = true;
  }
  return parts.map((p) => ({ side: p.side, m2: (p.cells * cell * cell) / 1e4, seeded: p.seeded })).filter((p) => p.m2 >= minM2);
}

describe('a split block’s seedless part, named and counted (notes N-25; the KI of C-0344 corrected by C-0426)', () => {
  it(`integrated CITY 5 ${CASE.block}: its back lane leaves two parts on one side, one of them seedless (≈ 43 m²) — the case, seen on a registered seed`, () => {
    const parts = splitParts(CASE.kerb, CASE.spine.points, CASE.spine.widthCm / 2, CASE.seeds);
    const seedless = parts.filter((p) => !p.seeded);
    expect(seedless).toHaveLength(1);
    expect(seedless[0].m2).toBeGreaterThan(30);
    expect(seedless[0].m2).toBeLessThan(60);
    // Its side holds a seeded part too (≈ 432 m²): two parts on one side, one seed.
    const same = parts.filter((p) => p.side === seedless[0].side);
    expect(same).toHaveLength(2);
    expect(same.find((p) => p.seeded)?.m2).toBeGreaterThan(380);
    // Each recorded seed lies in a part of its own.
    expect(parts.filter((p) => p.seeded)).toHaveLength(2);
  });

  it('an ordinary split (the two-district fixture’s back lanes and through alleys): every part holds a seed', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const out = runFixture(f);
    let read = 0;
    for (const b of out.blocks.filter((x) => x.interior === 'back_lane' || x.interior === 'through_alley')) {
      const bf = out.infill.blockFaces.find((x) => x.block === b.id);
      if (bf === undefined) continue;
      // The block's own spine: the S8 lane whose chain passes inside its kerb at the cut.
      const lane = out.lanes.find((l) => waySegments(f.plat, l.id).some(([a, c]) => inRing(bf.kerb, { x: (a.x + c.x) / 2, y: (a.y + c.y) / 2 })));
      if (lane === undefined) continue;
      const pts = chainRuns(f.plat, GROUND, lane.spine)[0] ?? [];
      read += 1;
      expect(splitParts(bf.kerb, pts, (lane.width as number) / 2, bf.seeds).filter((p) => !p.seeded)).toEqual([]);
    }
    expect(read).toBeGreaterThan(0);
  });
});
