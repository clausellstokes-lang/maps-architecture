// M0-a-05: the item's listed test "the Chaikin×2 spine cut-endpoint fixture (§3.6: ≈ 6.4 % attracted, p50 displacement
// ≈ 13 cm, shortest edge ≥ 25.5 cm) reproduced in order". §3.6 *Existing geometry wins* reports, on cut endpoints of
// Chaikin×2 spines with 7.9 m median segments, 6.38 % attracted, the attracted ones displaced p50 12.9 cm and at most
// 26 cm, the shortest resulting edge 25.6 cm. The fixture here is built from that description alone (the design's script
// is a review record this seat does not read, §17.1 (1)): seeded spines — control polylines of ≈ 31 m steps with lateral
// jitter, smoothed by Chaikin×2 (M0-a-10's `chaikin`) — inserted as L1 chains; cut endpoints dropped uniformly by arc
// length on each inserted spine (the exact point on its lattice polyline, a double) and inserted as the end of an L2 cut
// arriving across the spine. An endpoint is *attracted* when it lands on a vertex the spine already had (step 2's vertex
// or endpoint rule), else it splits the spine (the placement rule). "In order": each figure within a stated band of the
// design's — the attracted share 4 – 9 %, the p50 displacement 10 – 16 cm, the largest at most attractCm plus the hot
// pixel, the shortest edge at or above 25.5 cm — and the spines' median segment within 6.5 – 9.5 m (C-0177 (14)).
import { describe, expect, it } from 'vitest';
import { isVertexLive, outgoing, type Plat, type VertexId } from '../../../src/arena/index.js';
import { chaikin } from '../../../src/geom/index.js';
import { allProblems, framed, generator, ins, tx } from './support.js';

const SIDE = 40_000;

/** The spine's vertices in chain order, as `placed` names them (decimated points share a vertex: kept once). */
function spineVertices(placed: readonly VertexId[]): VertexId[] {
  const out: VertexId[] = [];
  for (const v of placed) if (out.length === 0 || out[out.length - 1] !== v) out.push(v);
  return out;
}

/** The shortest edge at a vertex. */
function shortestAt(p: Plat, v: VertexId): number {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let best = Infinity;
  for (const h of outgoing(p, v)) {
    const w = p.halfEdges.origin[h ^ 1];
    best = Math.min(best, Math.sqrt((X[w] - X[v]) * (X[w] - X[v]) + (Y[w] - Y[v]) * (Y[w] - Y[v])));
  }
  return best;
}

const median = (xs: readonly number[]): number => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 === 1 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};

describe('the Chaikin×2 spine cut-endpoint fixture (§3.6 Existing geometry wins), reproduced in order', () => {
  it('≈ 6.4 % of cut endpoints attracted, displaced p50 ≈ 13 cm and at most attractCm; every resulting edge ≥ 25.5 cm', () => {
    const segs: number[] = [];
    const moves: number[] = [];
    let endpoints = 0;
    let shortest = Infinity;
    for (let seed = 1; seed <= 60; seed++) {
      const rnd = generator(seed * 92_821);
      const p = framed(SIDE);
      // The control polyline: west to east across the frame in ≈ 31 m steps, each ± 9 m off the line.
      const ctrl: { x: number; y: number }[] = [];
      const y0 = 8000 + rnd() * 24_000;
      for (let x = 1000; x <= SIDE - 1000; x += 2800 + rnd() * 700) ctrl.push({ x, y: y0 + (rnd() - 0.5) * 1800 });
      const spinePts = chaikin(ctrl, { closed: false, iterations: 2 });
      const s = ins(tx(p, 1), spinePts.map((q) => [q.x, q.y] as [number, number]), [{ role: 'way', entity: `way:spine${seed}` }]);
      expect(s.ok).toBe(true);
      if (!s.ok) continue;
      const X = p.vertices.x;
      const Y = p.vertices.y;
      const spine = spineVertices(s.value.placed);
      const before = new Set<string>(spine.map((v) => `${X[v]},${Y[v]}`));
      const cum: number[] = [0];
      for (let i = 1; i < spine.length; i++) {
        const d = Math.sqrt((X[spine[i]] - X[spine[i - 1]]) ** 2 + (Y[spine[i]] - Y[spine[i - 1]]) ** 2);
        segs.push(d);
        cum.push(cum[i - 1] + d);
      }
      const total = cum[cum.length - 1];
      // Cut endpoints every 6 – 9 m of arc (never two within reach of each other), each the end of a 6 m cut arriving
      // across the spine from alternate sides.
      let side = 1;
      for (let at = 300 + rnd() * 600; at < total - 300; at += 600 + rnd() * 300) {
        let i = 1;
        while (cum[i] < at) i += 1;
        const a = spine[i - 1];
        const b = spine[i];
        const t = (at - cum[i - 1]) / (cum[i] - cum[i - 1]);
        const ex = X[a] + t * (X[b] - X[a]);
        const ey = Y[a] + t * (Y[b] - Y[a]);
        const len = cum[i] - cum[i - 1];
        const nx = (-(Y[b] - Y[a]) / len) * side;
        const ny = ((X[b] - X[a]) / len) * side;
        side = -side;
        const c = ins(tx(p, 2), [[ex + 600 * nx + 37 * (rnd() - 0.5), ey + 600 * ny + 37 * (rnd() - 0.5)], [ex, ey]], [{ role: 'way', entity: `way:cut${seed}:${endpoints}` }]);
        expect(c.ok).toBe(true);
        if (!c.ok) continue;
        endpoints += 1;
        const v = c.value.placed[1];
        expect(isVertexLive(p, v)).toBe(true);
        if (before.has(`${X[v]},${Y[v]}`)) moves.push(Math.sqrt((X[v] - ex) ** 2 + (Y[v] - ey) ** 2));
        shortest = Math.min(shortest, shortestAt(p, v));
      }
      expect(allProblems(p)).toEqual([]);
    }
    const share = moves.length / endpoints;
    const p50 = median(moves);
    const most = Math.max(...moves);
    console.log(`Chaikin×2 spines: median segment ${(median(segs) / 100).toFixed(2)} m over ${segs.length}; ${endpoints} cut endpoints, ${(100 * share).toFixed(2)} % attracted, displaced p50 ${p50.toFixed(1)} cm, at most ${most.toFixed(1)} cm; shortest resulting edge ${shortest.toFixed(2)} cm (§3.6: 7.9 m, 6.38 %, 12.9 cm, 26 cm, 25.6 cm)`);
    expect(endpoints).toBeGreaterThan(2000);
    expect(median(segs)).toBeGreaterThanOrEqual(650);
    expect(median(segs)).toBeLessThanOrEqual(950);
    expect(share).toBeGreaterThanOrEqual(0.04);
    expect(share).toBeLessThanOrEqual(0.09);
    expect(p50).toBeGreaterThanOrEqual(10);
    expect(p50).toBeLessThanOrEqual(16);
    expect(most).toBeLessThanOrEqual(26 + 0.71);
    expect(shortest).toBeGreaterThanOrEqual(25.5);
  }, 600_000);
});
