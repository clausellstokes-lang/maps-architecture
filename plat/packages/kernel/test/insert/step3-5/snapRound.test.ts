// M0-a-05: iterated snap rounding and the router (§3.6 steps 3 – 4; *Existing geometry wins*; *Chain classes*). The
// item's listed test "§13.1: snap rounding idempotent and terminating within 3 passes" is here, with the checker's line
// "the four edge kinds of §3.6 ('Existing geometry wins') each have a fixture that produces them and none shorter than
// minEdge", the face corners below minFaceAngle (W_ACUTE_CORNER / E_BELOW_MIN_ANGLE), and an acute corner's twin
// vertices, which take no new edge (C-0177 (7)).
import { describe, expect, it } from 'vitest';
import { outgoing, resolve, type Plat, type VertexId } from '../../../src/arena/index.js';
import { chainJournal, type ChainCtx } from '../../../src/insert/stretch.js';
import { MAX_PASSES, routeAlongExisting } from '../../../src/insert/snapRound.js';
import type { Level } from '../../../src/types/index.js';
import { genChain } from './gen.js';
import { allProblems, contentPrint, edgeRows, fingerprint, framed, generator, indexed, ins, intIn, liveEdges, tx, vertexAtPoint } from './support.js';

/** A loop over hundreds of arenas: its own hard timeout on the shared machine (never a timing). */
const SLOW = 120_000;

const len2 = (p: Plat, a: VertexId, b: VertexId): number => (p.vertices.x[a] - p.vertices.x[b]) ** 2 + (p.vertices.y[a] - p.vertices.y[b]) ** 2;

describe('§13.1: snap rounding idempotent and terminating within 3 passes', () => {
  it('re-inserting a chain\'s rounded output (each run of its edges) into the arena it made changes nothing (content, slots and index alike), over 400 random arenas', () => {
    let checked = 0;
    for (let seed = 1; seed <= 400; seed++) {
      const rnd = generator(seed * 104_729);
      const p = framed();
      for (let s = 0; s < intIn(rnd, 0, 4); s++) {
        const g = genChain(p, rnd, 4000, intIn(rnd, 1, 2) as Level);
        ins(tx(p, g.level), g.points, [{ role: 'way', entity: `way:${s}` }], 'mandatory', { closed: g.closed });
      }
      const g = genChain(p, rnd, 4000, 2);
      const r1 = ins(tx(p, 2), g.points, [{ role: 'kerb', entity: 'way:x' }], 'mandatory', { closed: g.closed });
      if (!r1.ok) continue;
      const before = fingerprint(p);
      const content = contentPrint(p);
      // The rounded chain — every run of its edges (resolve), read on its own level's route — rounds to itself.
      const res = resolve(p, { role: 'kerb', entity: 'way:x' }, p.key);
      if (res.view !== 'edges') continue;
      for (const run of res.runs) {
        const O = p.halfEdges.origin;
        const vs = run.map((h) => O[h]);
        const last = O[run[run.length - 1] ^ 1];
        const ring = last === vs[0];
        if (!ring) vs.push(last);
        const pts = vs.filter((v) => p.vertices.level[v] <= 2).map((v) => [p.vertices.x[v], p.vertices.y[v]] as [number, number]);
        const r2 = ins(tx(p, 2), pts, [{ role: 'kerb', entity: 'way:x' }], 'mandatory', { closed: ring });
        expect(r2.ok).toBe(true);
        expect(contentPrint(p)).toBe(content);
        expect(fingerprint(p)).toBe(before);
      }
      checked += 1;
    }
    expect(checked).toBeGreaterThan(300);
  }, SLOW);

  it(`every segment's routing ends within ${MAX_PASSES} passes (W_SNAP_PASSES never reported), over 1 500 random multi-chain arenas`, () => {
    let most = 0;
    let crossings = 0;
    for (let seed = 1; seed <= 1500; seed++) {
      const rnd = generator(seed * 7_727);
      const p = framed();
      let level = intIn(rnd, 1, 2) as Level;
      for (let s = 0; s < intIn(rnd, 2, 7); s++) {
        if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
        const g = genChain(p, rnd, 4000, level);
        const t = tx(p, level);
        const r = ins(t, g.points, [{ role: 'way', entity: `way:${s}` }], g.cls, { closed: g.closed });
        const j = chainJournal(t);
        most = Math.max(most, j.passes);
        crossings += t.work.counts.get('insert.crossings') ?? 0;
        if (r.ok) expect(r.warnings.map((w) => w.code)).not.toContain('W_SNAP_PASSES');
        expect(j.passes).toBeLessThanOrEqual(MAX_PASSES);
      }
    }
    console.log(`snap rounding: the most passes any segment took ${most}; ${crossings} crossings resolved`);
    expect(crossings).toBeGreaterThan(1000);
  }, SLOW);
});

describe('§3.6 Existing geometry wins: the four edge kinds a batch creates, each at least minEdge (the checker\'s line)', () => {
  it('(a) a chain segment between consecutive chain vertices: two free points 27 cm apart make one 27 cm edge; 25.5 cm apart they merge (attraction), never a shorter edge', () => {
    const p = framed();
    const r = ins(tx(p, 1), [[2000, 2000], [2027, 2000]], [{ role: 'way', entity: 'way:a' }]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const [u, w] = r.value.placed;
    expect(len2(p, u, w)).toBe(27 * 27);
    expect(allProblems(p)).toEqual([]);
    // 25 cm apart: decimation keeps both (≥ minEdge), attraction then brings the second onto the first — the chain is
    // left below one edge (the class's code, nothing written; C-0177 (12)).
    const before = contentPrint(p);
    const q = ins(tx(p, 1), [[1000, 1000], [1025, 1000]], [{ role: 'way', entity: 'way:a2' }]);
    expect(q.ok).toBe(false);
    if (!q.ok) expect(q.code).toBe('E_DEGENERATE');
    expect(contentPrint(p)).toBe(before);
  });

  it('(b) a sub-edge of a split existing edge: a chain ending 27 cm along a street from its vertex splits it, both sub-edges ≥ minEdge', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [1000, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    for (const off of [27, 28, 40]) {
      const r = ins(tx(p, 2), [[1000 + off + 300 * (off === 40 ? 1 : 0), 1500], [1000 + off + 300 * (off === 40 ? 1 : 0), 2010]], [{ role: 'kerb', entity: `way:b${off}` }]);
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      const v = r.value.placed[1];
      expect(Math.abs(p.vertices.y[v] - 2000)).toBeLessThanOrEqual(0.71);
      for (const h of outgoing(p, v)) expect(len2(p, v, p.halfEdges.origin[h ^ 1])).toBeGreaterThanOrEqual(625);
    }
    expect(allProblems(p)).toEqual([]);
  });

  it('(c) a chain segment ending at a split point or a crossing: a chain vertex 30 cm past a street, the chain crossing it — the segment to the crossing ≥ minEdge', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    const r = ins(tx(p, 2), [[1500, 1000], [1600, 2030], [1700, 1000]], [{ role: 'kerb', entity: 'way:c' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    const X = p.vertices.x;
    const Y = p.vertices.y;
    for (const [a, b] of liveEdges(p)) expect((X[a] - X[b]) ** 2 + (Y[a] - Y[b]) ** 2).toBeGreaterThanOrEqual(625);
  });

  it('(d) the span between two crossings: at least minEdge — placed in turn where the corner lies farther than attractCm (N-38), never cut shorter', () => {
    for (const d of [30, 40, 47, 50, 70]) {
      const p = framed();
      ins(tx(p, 1), [[2388, 2449], [2000, 1000], [1612, 2449]], [{ role: 'way', entity: 'way:v' }]);
      const r = ins(tx(p, 2), [[1500, 1000 + d], [2500, 1000 + d]], [{ role: 'kerb', entity: 'way:d' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      const X = p.vertices.x;
      const Y = p.vertices.y;
      for (const [a, b] of liveEdges(p)) expect((X[a] - X[b]) ** 2 + (Y[a] - Y[b]) ** 2).toBeGreaterThanOrEqual(625);
      if (!r.ok) continue;
      // Below 2 · d · tan 15° < 25 (d < 46.65) the crossings stand closer than minEdge, but the corner lies d > attractCm
      // from the chain: no wedge route (N-38); the second crossing is placed at least minEdge from the first.
      expect(r.warnings.some((w) => w.code === 'W_WEDGE_ROUTED')).toBe(false);
      const span = liveEdges(p).filter(([a, b]) => Y[a] > 1000 && Y[b] > 1000 && Y[a] < 1100 && Y[b] < 1100 && Math.abs(X[a] - 2000) < 60 && Math.abs(X[b] - 2000) < 60);
      expect(span).toHaveLength(1);
    }
  });
});

describe('face corners below minFaceAngle (§3.6 Chain classes)', () => {
  it('a chain leaving a street\'s vertex at 3° along it: a mandatory chain commits with W_ACUTE_CORNER; an optional one is refused E_BELOW_MIN_ANGLE and writes nothing', () => {
    for (const cls of ['mandatory', 'optional'] as const) {
      const p = framed();
      ins(tx(p, 1), [[500, 2000], [1000, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
      const before = contentPrint(p);
      const t = tx(p, 2);
      // From the street's vertex (1000, 2000) at 3°, 2 m long: its far end 10.5 cm off the street at 200 cm — the end is
      // the street's own band, so it lands on the street (attracted) unless farther: 6 m out, 31 cm off.
      const r = ins(t, [[1000, 2000], [1600, 2031]], [{ role: 'kerb', entity: 'way:k' }], cls);
      if (cls === 'mandatory') {
        expect(r.ok).toBe(true);
        if (r.ok) expect(r.warnings.map((w) => w.code)).toContain('W_ACUTE_CORNER');
        expect(allProblems(p)).toEqual([]);
      } else {
        expect(r.ok).toBe(false);
        if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_ANGLE');
        expect(contentPrint(p)).toBe(before);
        expect(t.warnings).toEqual([]);
      }
    }
  });
});

describe('an acute corner\'s twin vertices take no new edge (C-0177 (7))', () => {
  it('two antenna tips 10 cm apart: a chain landing on one leaves along its arm, the arena valid', () => {
    const b = indexed({
      vertices: [[-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], [-5000, 0, 1], [0, 0, 1], [30, 0, 1], [30, 10, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0], [4, 5, 1], [5, 6, 1], [5, 7, 1]],
    });
    const p = b.plat;
    expect(allProblems(p)).toEqual([]);
    const r = ins(tx(p, 1), [[40, -2], [600, 600]], [{ role: 'way', entity: 'way:t' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    const tip = vertexAtPoint(p, 30, 0);
    if (r.ok) expect(r.value.placed[0]).toBe(tip);
    // The tip keeps its one edge (its arm, now shared): no new edge at either tip.
    expect(outgoing(p, tip)).toHaveLength(1);
    expect(outgoing(p, vertexAtPoint(p, 30, 10))).toHaveLength(1);
    expect(edgeRows(p, [30, 0], [0, 0])).toContain('way:way:t'.replace('way:way', 'way/way'));
  });

  it('two consecutive chain points 42.6 cm apart, attracted onto the two tips (10 cm apart), merge, the later into the earlier (§3.6 step 2), either way round', () => {
    // (52, −12) is 25.1 cm from the tip (30, 0) and (45, 30) 25 cm from the tip (30, 10): no decimation in step 1.
    for (const [first, second] of [[[52, -12], [45, 30]], [[45, 30], [52, -12]]] as const) {
      const b = indexed({
        vertices: [[-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], [-5000, 0, 1], [0, 0, 1], [30, 0, 1], [30, 10, 1]],
        edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0], [4, 5, 1], [5, 6, 1], [5, 7, 1]],
      });
      const p = b.plat;
      const r = ins(tx(p, 1), [[...first], [...second], [600, 600]], [{ role: 'way', entity: 'way:t' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      if (!r.ok) continue;
      expect(r.value.placed[1]).toBe(r.value.placed[0]);
      expect(r.value.placed[0]).toBe(vertexAtPoint(p, 30, first[0] === 52 ? 0 : 10));
      expect(r.warnings.find((w) => w.code === 'W_ATTRACTED')?.count).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('the router\'s regressions from B-FUZZ (≥ 300-vertex self-touching walks; C-0177 (5), (13)) — each arena valid', () => {
  /** An L0 mandatory or optional chain into the framed arena: the result and the arena. */
  const run = (pts: [number, number][], cls: 'mandatory' | 'optional'): { p: Plat; r: ReturnType<typeof ins> } => {
    const p = framed();
    const r = ins(tx(p, 0), pts, [{ role: 'way', entity: 'way:w' }], cls);
    return { p, r };
  };

  it('a crossing closer than minEdge to the segment\'s own end is the corner beside that end; the wedge would move the chain 26.0 cm > attractCm: a mandatory chain has the crossing placed instead (N-38), an optional one is refused, nothing written', () => {
    // The chain's own acute corner at (2997, 3812): its later segment leaves (3023, 3810) — on one arm — and crosses the
    // other arm 15 cm away. Bent along that arm to keep minEdge from its end, the next pass met a vertex beside it and
    // left a crossing vertex standing 22 cm from an edge outside its one-ring.
    const pts: [number, number][] = [[3051, 3808], [2997, 3812], [3053, 3772], [3023, 3808], [3009, 3716]];
    const m = run(pts, 'mandatory');
    expect(m.r.ok).toBe(true);
    expect(allProblems(m.p)).toEqual([]);
    if (m.r.ok) expect(m.r.warnings.map((w) => w.code)).not.toContain('W_WEDGE_ROUTED');
    expect(edgeRows(m.p, [2997, 3812], [3009, 3716])).toEqual(['way/way:w']);
    expect(edgeRows(m.p, [2997, 3812], [3053, 3772])).toEqual(['way/way:w']); // the arm unsplit
    const o = run(pts, 'optional');
    expect(o.r.ok).toBe(false);
    if (!o.r.ok) expect(o.r.code).toBe('E_BELOW_MIN_EDGE');
    expect(contentPrint(o.p)).toBe(contentPrint(framed()));
  });

  it('the same corner beside the segment\'s own end: a last segment ending on one arm crosses the other 15 cm before its end — beyond attractCm no wedge (N-38): the mandatory chain follows the existing arms, the arm unsplit; optional: refused', () => {
    const pts: [number, number][] = [[3051, 3808], [2997, 3812], [3053, 3772], [3009, 3716], [3023, 3808]];
    const m = run(pts, 'mandatory');
    expect(m.r.ok).toBe(true);
    expect(allProblems(m.p)).toEqual([]);
    if (m.r.ok) expect(m.r.warnings.map((w) => w.code)).not.toContain('W_WEDGE_ROUTED');
    expect(edgeRows(m.p, [3009, 3716], [2997, 3812])).toBeNull();
    expect(edgeRows(m.p, [3053, 3772], [3009, 3716])).toEqual(['way/way:w']);
    expect(edgeRows(m.p, [2997, 3812], [3053, 3772])).toEqual(['way/way:w']);
    const o = run(pts, 'optional');
    expect(o.r.ok).toBe(false);
    if (!o.r.ok) expect(o.r.code).toBe('E_BELOW_MIN_EDGE');
  });

  it('a design route that leaves clearance broken is undone; with the strict route broken too, the chain follows existing edges (W_STRETCH_SHARED)', () => {
    // The last segment (2997, 3812) → (3032, 3777): step 3 routes it through (3023, 3810) and (3007, 3775), whose
    // sub-route then wedges round (3014, 3747), leaving the new edge (3023, 3810)–(3007, 3775) 21.9 cm from (3032, 3777).
    const pts: [number, number][] = [[3051, 3808], [2997, 3812], [3014, 3747], [3050, 3815], [3023, 3808], [3019, 3756], [2990, 3771], [2983, 3795], [3039, 3773]];
    const m = run(pts, 'mandatory');
    expect(m.r.ok).toBe(true);
    expect(allProblems(m.p)).toEqual([]);
    expect(edgeRows(m.p, [3023, 3810], [3007, 3775])).toBeNull();
    for (const [a, b] of [[[2997, 3812], [3007, 3775]], [[3007, 3775], [3014, 3747]], [[3014, 3747], [3032, 3777]]] as const) expect(edgeRows(m.p, a, b)).toEqual(['way/way:w']);
    if (m.r.ok) expect(m.r.warnings.map((w) => w.code)).toContain('W_STRETCH_SHARED');
  });

  it('where the design route leaves clearance broken and the strict route keeps it, the strict route stands: one edge past a vertex 25.9 cm off it', () => {
    // The segment (1240, 3048) → (1254, 3085) passes (1267, 3046) at 25.9 cm: step 3's band routes it there, and the
    // sub-route back out passes (1240, 3048) — an end of the first part — 24.98 cm off. Within minEdge only: no detour.
    const pts: [number, number][] = [[1252, 3023], [1228, 3012], [1211, 3037], [1240, 3048], [1267, 3046], [1225, 3043], [1254, 3085]];
    for (const cls of ['mandatory', 'optional'] as const) {
      const m = run(pts, cls);
      expect(m.r.ok).toBe(true);
      expect(allProblems(m.p)).toEqual([]);
      expect(edgeRows(m.p, [1240, 3048], [1254, 3085])).toEqual(['way/way:w']);
      expect(edgeRows(m.p, [1267, 3046], [1254, 3085])).toBeNull();
    }
  });
});

describe('routeAlongExisting: the route along existing edges (C-0177 (13))', () => {
  /** A context for the router on the batch's arena at L1, of a class. */
  const ctxOf = (p: Plat, cls: 'mandatory' | 'optional'): ChainCtx => {
    const t = tx(p, 1);
    return { tx: t, p, n: 1, cls, rows: [{ role: 'way', entity: 'way:r' }], warnings: [], journal: chainJournal(t), maxPass: 0, strict: false, undo: [] };
  };
  /** The frame and an L1 dog-leg (1000, 2000) – (1500, 2040) – (2000, 2000): its kink 40 cm off the straight line. */
  const dogLeg = (): Plat => {
    const p = framed();
    expect(ins(tx(p, 1), [[1000, 2000], [1500, 2040], [2000, 2000]], [{ role: 'way', entity: 'way:1' }]).ok).toBe(true);
    return p;
  };

  it('a mandatory chain from one end to the other shares the dog-leg (W_STRETCH_SHARED), however far it bends', () => {
    const p = dogLeg();
    const c = ctxOf(p, 'mandatory');
    const r = routeAlongExisting(c, vertexAtPoint(p, 1000, 2000), vertexAtPoint(p, 2000, 2000));
    expect(r).toMatchObject({ ok: true, value: true });
    expect(edgeRows(p, [1000, 2000], [1500, 2040])).toEqual(['way/way:1', 'way/way:r']);
    expect(edgeRows(p, [1500, 2040], [2000, 2000])).toEqual(['way/way:1', 'way/way:r']);
    expect(c.warnings.map((w) => w.code)).toEqual(['W_STRETCH_SHARED']);
    expect(allProblems(p)).toEqual([]);
  });

  it('an optional chain it would move 40 cm > attractCm is refused E_BELOW_MIN_EDGE, nothing written; with no path in reach: false', () => {
    const p = dogLeg();
    const before = contentPrint(p);
    const r = routeAlongExisting(ctxOf(p, 'optional'), vertexAtPoint(p, 1000, 2000), vertexAtPoint(p, 2000, 2000));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_EDGE');
    expect(contentPrint(p)).toBe(before);
    // The street's end and the frame's corner: no path of level ≤ 1 within 4 · attractCm of their segment.
    expect(routeAlongExisting(ctxOf(p, 'mandatory'), vertexAtPoint(p, 1000, 2000), vertexAtPoint(p, 0, 0))).toMatchObject({ ok: true, value: false });
  });
});
