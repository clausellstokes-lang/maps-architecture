// F-WALL's gate rungs by fixture (§4.2 S3 (7), §5.2; C-0085; M0-c-01): two routes reaching T = t₁ at one point
// re-draw the later pick from its next candidate (≤ 3 attempts), then drop it and report.
import { describe, expect, it } from 'vitest';
import { angularGap, bearingCdeg, fieldT, flatFixture, GATE_REDRAWS, pickCandidates, s3Slice, type GatePick, type S3Slice } from '../../src/index.js';
import { smallSite } from './support.js';

const SITE = smallSite(11);
const PLAIN = s3Slice(SITE);

/** The pick-contour candidate farthest round from every node of `from` (seen from the nucleus). */
function farFrom(s: S3Slice, ...from: number[]): number {
  const pts = s.lattice.points;
  const bs = from.map((a) => bearingCdeg(pts[a].x, pts[a].y));
  let best = -1;
  let gap = -1;
  for (const c of pickCandidates(s.pickSet)) {
    const g = Math.min(...bs.map((b) => angularGap(bearingCdeg(pts[c].x, pts[c].y), b)));
    if (g > gap) {
      gap = g;
      best = c;
    }
  }
  return best;
}

function pick(ordinal: number, node: number, ranked: number[], s: S3Slice): GatePick {
  return { ordinal, node, at: s.lattice.points[node], ranked, forced: false };
}

describe("F-WALL's gate rungs (C-0085)", () => {
  it('the plain fixture reaches no gate rung', () => {
    expect(PLAIN.report.gateRungs).toEqual([]);
    expect(PLAIN.report.gatesDropped).toBe(0);
    expect(PLAIN.gates.length).toBe(PLAIN.n);
  });

  it('two routes at one point: the later pick is re-drawn from its next candidate, and both then stand as gates', () => {
    const a = PLAIN.picks[0].node;
    const c = farFrom(PLAIN, a);
    const s = s3Slice(SITE, { requestedN: 2, picks: [pick(0, a, [a], PLAIN), pick(1, a, [a, c], PLAIN)] });
    expect(s.report.gateRungs).toEqual([{ rung: 'redraw', ordinal: 1, with: 0, attempt: 1, from: a, to: c }]);
    expect(s.gates.length).toBe(2);
    expect(s.gates[0].at).not.toEqual(s.gates[1].at);
    expect(s.picks.map((p) => p.node)).toEqual([a, c]);
    expect(s.report.gatesDropped).toBe(0);
    // T and the boundary are those of the routes that stand (the re-drawn route among them).
    expect(Buffer.from(s.field.T.buffer).equals(Buffer.from(fieldT(s.lattice, s.routes, 1.3).T.buffer))).toBe(true);
  });

  it(`a pick whose ${String(GATE_REDRAWS)} re-draws all coincide is dropped and reported; main gates fall below N`, () => {
    expect(GATE_REDRAWS).toBe(3);
    const a = PLAIN.picks[0].node;
    const s = s3Slice(SITE, { requestedN: 2, picks: [pick(0, a, [a], PLAIN), pick(1, a, [a, a, a, a], PLAIN)] });
    expect(s.report.gateRungs).toEqual([
      { rung: 'redraw', ordinal: 1, with: 0, attempt: 1, from: a, to: a },
      { rung: 'redraw', ordinal: 1, with: 0, attempt: 2, from: a, to: a },
      { rung: 'redraw', ordinal: 1, with: 0, attempt: 3, from: a, to: a },
      { rung: 'drop', ordinal: 1, with: 0, attempt: 0, from: a, to: -1 },
    ]);
    expect(s.n).toBe(2);
    expect(s.gates.length).toBe(1);
    expect(s.routes.map((r) => r.ordinal)).toEqual([0]);
    expect(s.report.gatesDropped).toBe(1);
    expect(s.gateSites.map((g) => g.ordinal)).toEqual([0]);
  });

  it('re-draws walk the ranked list in score order: a coinciding next candidate is tried, then the one after it (C-0201 (6))', () => {
    // ranked [a, a, c, d]: attempt 1 re-draws to a (coincides again), attempt 2 to c (stands); d is never reached.
    const a = PLAIN.picks[0].node;
    const c = farFrom(PLAIN, a);
    const d = farFrom(PLAIN, a, c);
    expect(new Set([a, c, d]).size).toBe(3);
    const s = s3Slice(SITE, { requestedN: 2, picks: [pick(0, a, [a], PLAIN), pick(1, a, [a, a, c, d], PLAIN)] });
    expect(s.report.gateRungs).toEqual([
      { rung: 'redraw', ordinal: 1, with: 0, attempt: 1, from: a, to: a },
      { rung: 'redraw', ordinal: 1, with: 0, attempt: 2, from: a, to: c },
    ]);
    expect(s.picks.map((p) => p.node)).toEqual([a, c]);
    expect(s.gates.length).toBe(2);
    expect(s.report.gatesDropped).toBe(0);
  });

  it(`GATE_REDRAWS itself caps the re-draws: a pick ranking more coinciding candidates is dropped after ${String(GATE_REDRAWS)}`, () => {
    // ranked [a, a, a, a, a, c]: a fourth re-draw (to a) or a fifth (to c) would pass the cap.
    const a = PLAIN.picks[0].node;
    const c = farFrom(PLAIN, a);
    const s = s3Slice(SITE, { requestedN: 2, picks: [pick(0, a, [a], PLAIN), pick(1, a, [a, a, a, a, a, c], PLAIN)] });
    expect(s.report.gateRungs.map((r) => [r.rung, r.attempt, r.to])).toEqual([
      ['redraw', 1, a],
      ['redraw', 2, a],
      ['redraw', 3, a],
      ['drop', 0, -1],
    ]);
    expect(s.picks.map((p) => p.node)).toEqual([a]);
    expect(s.report.gatesDropped).toBe(1);
  });

  it('a pick with fewer ranked candidates than the cap is dropped once they run out', () => {
    const a = PLAIN.picks[0].node;
    const s = s3Slice(SITE, { requestedN: 2, picks: [pick(0, a, [a], PLAIN), pick(1, a, [a, a], PLAIN)] });
    expect(s.report.gateRungs.map((r) => `${r.rung}:${String(r.attempt)}`)).toEqual(['redraw:1', 'drop:0']);
    expect(s.gates.length).toBe(1);
  });

  it('the earlier pick keeps its gate: only the later is re-drawn (the third coinciding with the first)', () => {
    const [p0, p1] = PLAIN.picks;
    const c = farFrom(PLAIN, p0.node, p1.node);
    const s = s3Slice(SITE, {
      requestedN: 3,
      picks: [pick(0, p0.node, [p0.node], PLAIN), pick(1, p1.node, [p1.node], PLAIN), pick(2, p0.node, [p0.node, c], PLAIN)],
    });
    expect(s.report.gateRungs).toEqual([{ rung: 'redraw', ordinal: 2, with: 0, attempt: 1, from: p0.node, to: c }]);
    expect(s.picks.map((p) => p.node)).toEqual([p0.node, p1.node, c]);
    expect(s.gates.length).toBe(3);
  });

  it('a route that re-enters the stage after its gate has its outward stretch re-solved outside: roads leaving = N (C-0201 (6))', () => {
    // A tilted site (8 % east, 3 % north) bends one route of seed 5 back into the stage beyond its gate.
    const site = flatFixture(5);
    const t = site.terrain;
    for (let j = 0; j < t.rows; j += 1) {
      for (let i = 0; i < t.cols; i += 1) t.heightCm[j * t.cols + i] = Math.round(0.08 * (t.originX + (i + 0.5) * t.cellCm) + 0.03 * (t.originY + (j + 0.5) * t.cellCm));
    }
    const s = s3Slice(site);
    const re = s.report.gateRungs.filter((r) => r.rung === 'reroute');
    expect(re.length).toBeGreaterThan(0);
    for (const r of re) {
      expect(r.to).not.toBe(-1);
      expect(r.attempt).toBeGreaterThanOrEqual(1);
      expect(r.attempt).toBeLessThanOrEqual(3);
    }
    expect(s.gates.length).toBe(s.n);
    let leaving = 0;
    s.routes.forEach((r, k) => {
      const g = s.gates[k];
      // Leaves once, at its gate, and never comes back.
      for (let i = 0; i <= g.routeIndex; i += 1) expect(s.levelSet.selected[r.nodes[i]]).toBe(1);
      for (let i = g.routeIndex + 1; i < r.nodes.length; i += 1) expect(s.levelSet.selected[r.nodes[i]]).toBe(0);
      expect(s.lattice.rim[r.nodes[r.nodes.length - 1]]).toBe(1);
      expect(s.levelSet.contour.some((q) => q.x === g.at.x && q.y === g.at.y)).toBe(true);
      leaving += 1;
    });
    expect(leaving).toBe(s.n);
    // T is the field of the routes that stand.
    expect(Buffer.from(s.field.T.buffer).equals(Buffer.from(fieldT(s.lattice, s.routes, 1.3).T.buffer))).toBe(true);
  });
});
