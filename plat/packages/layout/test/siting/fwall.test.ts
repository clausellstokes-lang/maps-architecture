// F-WALL's gate rungs by fixture (§4.2 S3 (7), §5.2; C-0085; M0-c-01): two routes reaching T = t₁ at one point
// re-draw the later pick from its next candidate (≤ 3 attempts), then drop it and report.
import { describe, expect, it } from 'vitest';
import { angularGap, bearingCdeg, fieldT, GATE_REDRAWS, pickCandidates, s3Slice, type GatePick, type S3Slice } from '../../src/index.js';
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
});
