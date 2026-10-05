// M0-a-05 fix round S1: the session's ruling N-37 (J186; C-0202). The placement rule's clearance test (iii) exempts the
// edges at a crossing's ends, on the assumption that the edge to that end is written; where the re-route then reached
// that end through another vertex instead, the router found no route keeping clearance and threw. §3.6 promises the
// opposite — when no candidate qualifies the vertex moves onto the nearer endpoint and "each such re-route lands on an
// existing vertex, so the loop ends" — so before any refusal `routeSegment` re-routes the segment with every crossing on
// the placement's endpoint fallback (W_PLACED); only a route that still breaks clearance is refused, E_INVARIANT, never
// a bare Error. The repro is M0-a-08's (seven two-point mandatory chains of one self-crossing ring, from its §3.7 (i)
// buffer agreement); the seventh threw "insert: no route … keeps clearance".
import { describe, expect, it } from 'vitest';
import { createPlat, type Plat } from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import type { Cm } from '../../../src/types/index.js';
import { GROUND } from '../../arena/support.js';
import { allProblems, edgeRows, ins, liveEdges, tx } from './support.js';

/** M0-a-08's arena: a ground arena 2²⁴ cm wide (no margin), its index on a 64 cm grid. */
function wideArena(): Plat {
  const p = createPlat(GROUND, { widthCm: (1 << 24) as Cm, heightCm: (1 << 24) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(p, { gridCellCm: 64 });
  return p;
}

const RING: readonly (readonly [number, number])[] = [[-48863, 44833], [-48080, 46354], [-48522, 45607], [-48031, 46325], [-48468, 45739], [-47267, 47616], [-48140, 46382]];

/** §3.6 *Existing geometry wins*: an incoming chain vertex moves at most √2 · attractCm (the attracted bound of §3.7). */
const ATTRACTED_BOUND = Math.SQRT2 * 26;

/** The distance from (px, py) to the segment a–b. */
function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(ax + t * dx - px, ay + t * dy - py);
}

/**
 * The farthest any vertex of an edge carrying the entity's row stands from the entity's input segment a–b, in cm; −1
 * when no edge carries the row.
 */
function chainMove(p: Plat, entity: string, a: readonly [number, number], b: readonly [number, number]): number {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  let most = -1;
  for (const [u, v] of liveEdges(p)) {
    const rows = edgeRows(p, [X[u], Y[u]], [X[v], Y[v]]) ?? [];
    if (!rows.includes(`invisible/${entity}`)) continue;
    for (const w of [u, v]) most = Math.max(most, segDist(X[w], Y[w], a[0], a[1], b[0], b[1]));
  }
  return most;
}

describe('N-37: the router\'s endpoint-fallback route before any refusal', () => {
  it('the seven two-point chains of M0-a-08\'s self-crossing ring all commit, one by one, the arena valid after each (§3.10); the seventh lands its crossing on an existing vertex (W_PLACED)', () => {
    const p = wideArena();
    const t = tx(p, 0);
    for (let i = 0; i < RING.length; i++) {
      const r = ins(t, [RING[i], RING[(i + 1) % RING.length]], [{ role: 'invisible', entity: `s${i}` }]);
      expect(r.ok, `chain ${i}: ${r.ok ? '' : `${r.code} ${r.detail}`}`).toBe(true);
      expect(allProblems(p)).toEqual([]);
      if (i === RING.length - 1 && r.ok) expect(r.warnings.map((w) => w.code)).toContain('W_PLACED');
    }
  });

  // N-37 and C-0202 (1): the endpoint route lands each crossing on the crossed sub-edge's NEARER vertex (the placement
  // rule's fallback, §3.6), its other end only when the nearer one is already on the chain's path. The seventh chain,
  // (−48140, 46382) → (−48863, 44833), crosses the sub-edge (−48450, 45728)–(−48080, 46354) and lands on its nearer end,
  // 4.30 cm from the segment; the farther end stands 66.21 cm from it — beyond √2 · attractCm (fix round S2, mutant K7 of
  // the closing check: a fallback preferring the farther end). Every vertex of the chain's edges then stands within the
  // attracted bound of its segment (the farthest, an attracted vertex, 20.10 cm).
  it('the seventh chain\'s endpoint route lands its crossing on the nearer end of the crossed sub-edge, (−48450, 45728), and the chain stays within √2 · attractCm of its segment', () => {
    const p = wideArena();
    const t = tx(p, 0);
    for (let i = 0; i < RING.length - 1; i++) expect(ins(t, [RING[i], RING[i + 1]], [{ role: 'invisible', entity: `s${i}` }]).ok).toBe(true);
    const last = RING.length - 1;
    const r = ins(t, [RING[last], RING[0]], [{ role: 'invisible', entity: `s${last}` }]);
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    if (!r.ok) return;
    expect(r.warnings.filter((w) => w.code === 'W_PLACED')).toEqual([{ code: 'W_PLACED', count: 1, at: { x: -48450, y: 45728 } }]);
    expect(segDist(-48450, 45728, RING[last][0], RING[last][1], RING[0][0], RING[0][1])).toBeCloseTo(4.30, 2);
    expect(segDist(-48080, 46354, RING[last][0], RING[last][1], RING[0][0], RING[0][1])).toBeGreaterThan(ATTRACTED_BOUND);
    const move = chainMove(p, `s${last}`, RING[last], RING[0]);
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(ATTRACTED_BOUND);
    expect(allProblems(p)).toEqual([]);
  });

  it('inserted as one closed mandatory chain, the same ring commits and the arena is valid', () => {
    const p = wideArena();
    const r = ins(tx(p, 0), RING, [{ role: 'invisible', entity: 'ring' }], 'mandatory', { closed: true });
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    expect(allProblems(p)).toEqual([]);
  });
});

/**
 * M0-a-08's buffer case 391 of 3 000 (seed 23), the last of its overlays: a frame and 29 two-point mandatory chains. The
 * 29th threw "a stretch's join and leave points lie on one route piece": the route to the stretch's join point had split
 * the piece between join and leave.
 */
const FRAME_391: readonly (readonly [number, number])[] = [[19881, 54480], [30094, 54480], [30094, 66304], [19881, 66304]];
const CHAINS_391: readonly (readonly (readonly [number, number])[])[] = [
  [[24006, 58603], [25002, 60330]],
  [[25002, 60330], [25998, 62057]],
  [[25998, 62057], [25972, 62072]],
  [[25972, 62072], [24976, 60345]],
  [[24976, 60345], [23980, 58618]],
  [[23980, 58618], [24006, 58603]],
  [[25972, 62072], [25967, 62075]],
  [[25967, 62075], [25956, 62082]],
  [[25956, 62082], [25950, 62085]],
  [[25950, 62085], [24976, 60345]],
  [[24002, 58605], [24976, 60345]],
  [[25950, 62085], [25925, 62099]],
  [[25925, 62099], [24951, 60359]],
  [[24951, 60359], [23977, 58619]],
  [[23977, 58619], [24002, 58605]],
  [[25925, 62099], [25918, 62103]],
  [[25918, 62103], [25904, 62111]],
  [[25904, 62111], [25896, 62115]],
  [[25896, 62115], [24951, 60359]],
  [[24006, 58603], [24951, 60359]],
  [[25896, 62115], [25870, 62129]],
  [[25870, 62129], [24925, 60373]],
  [[24925, 60373], [23980, 58617]],
  [[23980, 58617], [24006, 58603]],
  [[25870, 62129], [25851, 62139]],
  [[25851, 62139], [25810, 62160]],
  [[25810, 62160], [25790, 62170]],
  [[25790, 62170], [24925, 60373]],
  [[24060, 58576], [24925, 60373]],
];

describe('N-37: a stretch whose join point\'s route split the piece before its leave point is walked along the run', () => {
  // The walk shares the run's pieces from join to leave as they stand. Routing join → leave as any segment instead (the
  // walk's own fallback) gives the same geometry here but re-attracts the vertex the join point's route split in — one
  // W_ATTRACTED and one W_STRETCH_SHARED more (5 and 5, measured with the walk removed), which pins the walk.
  it('M0-a-08\'s buffer case 391: every chain commits (or collapses, E_DEGENERATE empty), the arena valid; the last one shares a stretch by the run walk (W_STRETCH_SHARED 4, W_ATTRACTED 4)', () => {
    const p = wideArena();
    const t = tx(p, 0);
    expect(ins(t, FRAME_391, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
    CHAINS_391.forEach((c, i) => {
      const r = ins(t, c, [{ role: 'invisible', entity: `arr:s${i}` }]);
      if (!r.ok) expect(`${r.code} ${r.detail}`).toBe('E_DEGENERATE empty');
      if (i === CHAINS_391.length - 1) {
        expect(r.ok).toBe(true);
        if (r.ok) {
          const count = (code: string): number => r.warnings.find((w) => w.code === code)?.count ?? 0;
          expect(count('W_STRETCH_SHARED')).toBe(4);
          expect(count('W_ATTRACTED')).toBe(4);
        }
      }
    });
    expect(allProblems(p)).toEqual([]);
  });
});
