// M0-a-13: §13.1's attraction-and-moves fixtures for `warp` (§3.6 *Moves: warp and smoothing*): a pinch that would
// shorten an edge below minEdge and a step that would stack two vertices on one lattice point both halve; a street
// ending on a shore slides its junction along the shore; the kerb (0, 0)–(1 000, 9) past (517, 30) commits with its
// re-seated vertex placed by the placement rule; two Steiner vertices re-seated close together give identical output
// after a slot renumbering; a locked plot and a pinned building hold every corner while the neighbour's footprint corner
// slides; a warped same-level T-junction stays a shape vertex when its lane goes; a re-seated Steiner vertex dissolves
// under clearFiner and the coarser edge is restored exactly; a warp with fromLevel = 1 over finished fabric gives no
// E_KEPT and over a generated and an edited water gate moves neither gate's bank vertices. And the checks each fixture
// isolates (hardening round S1, C-0361): the rotation and the mover-path checks one at a time, the placement bound's
// call site, the slide clamp on both sides of a held vertex, a two-round closure, the region against a wider brush,
// a rounding tie read through the warp's door, and the placement rule's per-candidate charge.
import { describe, expect, it } from 'vitest';
import { VERTEX_SPLIT, VERTEX_STEINER } from '../../src/arena/index.js';
import { pointLocate } from '../../src/index/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { clearFiner, removeEdges, setOwner, tx, type Committed } from '../../src/tx/index.js';
import { openTx } from '../../src/tx/state.js';
import { closerThan } from '../../src/warp/validate.js';
import { heldSet, warp, type MoveReport } from '../../src/warp/index.js';
import { at, box, brush, commit, contentPrint, drag, edgeRows, framed, healthy, movedLists, must, P, pointwise, pt, report, S4, S8, spec, state, vertexAtPoint, warpBatch } from './support.js';

const noVersion = (s: string): string => s.replace(/#v\d+$/, '');
/**
 * The placement candidates charged (N-r10c-1): the §13.1 kerb's re-seat tries its nearest (517, 5), then the band's
 * nearest (517, 4), which qualifies — 2; the slide beside the unlocked foot tries its nearest (2 090, 2 000), then the
 * shore's band points in pairs 1 … 14 cm either side (each fails minEdge from the foot, or lies past it), then (2 075,
 * 2 000) at 15 cm, the lower x of its pair — 1 + 28 + 1 = 30.
 */
const KERB_CANDIDATES = 2;
const SLIDE_CANDIDATES = 30;
const G = { layer: 'ground' as const, part: 0 };

describe('§13.1: a pinch that would shorten an edge below minEdge, and a step stacking two vertices — both halve', () => {
  it('a pinch pulling two way vertices 8 cm apart halves once and commits them 44 cm apart', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(1060, 2000), pt(1140, 2000), pt(1200, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const r = report(warpBatch(p, 1, pointwise([[1060, 2000, 36, 0], [1140, 2000, -36, 0]]), box(1050, 1990, 1150, 2010)));
    expect(r.committed).toBe(true);
    expect(r.report.halvings).toBe(1);
    expect(r.report.strength).toBe(0.5);
    expect(r.report.lastFailure).toMatch(/^minEdge/);
    expect(vertexAtPoint(p, 1078, 2000)).toBeGreaterThanOrEqual(0);
    expect(vertexAtPoint(p, 1122, 2000)).toBeGreaterThanOrEqual(0);
    expect(r.work).toBeGreaterThanOrEqual(1); // one warp.halvings charged
    healthy(p);
  });

  it('a pinch brush (§7.1) over the same way halves rather than committing a sub-minEdge edge', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(1070, 2000), pt(1130, 2000), pt(1200, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const r = report(warpBatch(p, 1, brush('pinch', 1100, 2000, 200, 0.95), box(900, 1900, 1300, 2100)));
    expect(r.report.halvings).toBeGreaterThanOrEqual(1);
    healthy(p);
  });

  it('a drag that would put a chain end on another chain\'s end halves, its first failure the shared lattice point', () => {
    const p = framed();
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(1000, 3000), pt(1000, 3500)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(1100, 3000), pt(1100, 3500)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const r = report(warpBatch(p, 1, pointwise([[1000, 3000, 100, 0]]), box(990, 2990, 1010, 3010)));
    expect(r.report.halvings).toBe(1);
    expect(r.report.lastFailure).toMatch(/^two vertices on the lattice point \(1100, 3000\)/);
    expect(vertexAtPoint(p, 1050, 3000)).toBeGreaterThanOrEqual(0);
    healthy(p);
  });

  it('a step that fails at every strength is a reported no-op after 8 halvings: nothing written, no commit', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(1200, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const before = state(p);
    // The strengths tried, as the record check sees them: 1, ½, … 2⁻⁸ — nine tries, eight halvings.
    const tried: string[] = [];
    const r = report(warpBatch(p, 1, drag(40, 0), box(990, 1990, 1010, 2010), { record: (step) => (tried.push(`${step.strength}/${step.halvings}`), false) }));
    expect(tried).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => `${2 ** -k}/${k}`));
    expect(r.report.applied).toBe(false);
    expect(r.report.halvings).toBe(8);
    expect(r.report.moves).toEqual([]);
    expect(r.report.lastFailure).toMatch(/^recordCheck/);
    expect(r.committed).toBe(false);
    expect(state(p)).toBe(before);
    // Exactly eight `warp.halvings` charged (the step's only work: its vertex is free, so no placement candidate): a work
    // limit of 8 allows the no-op, a limit of 7 refuses at the eighth halving.
    expect(report(warpBatch(p, 1, drag(40, 0), box(990, 1990, 1010, 2010), { record: () => false, spec: { workLimit: 8 } })).report.applied).toBe(false);
    expect(warpBatch(p, 1, drag(40, 0), box(990, 1990, 1010, 2010), { record: () => false, spec: { workLimit: 7 } })).toMatchObject({ ok: false, code: 'E_WORK_LIMIT', detail: 'warp.halvings' });
    expect(state(p)).toBe(before);
  });
});

describe('§13.1: a warp with fromLevel = 1 over a street ending on a shore — the junction slides along the shore', () => {
  it('the L1 junction on the L0 shore moves only along the shore, and the step commits', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const j = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[j]).toBe(1);
    const r = report(warpBatch(p, 1, drag(150, 40), box(1900, 1900, 2100, 2100)));
    expect(r.committed).toBe(true);
    expect(r.report.halvings).toBe(0);
    expect(r.report.moves.map((m) => [m.kind, `${m.from.x},${m.from.y}`, `${m.to.x},${m.to.y}`])).toEqual([['slide', '2000,2000', '2150,2000']]);
    expect(at(p, j)).toBe('2150,2000');
    expect(vertexAtPoint(p, 0, 2000)).toBeGreaterThanOrEqual(0);
    expect(vertexAtPoint(p, 4000, 2000)).toBeGreaterThanOrEqual(0);
    expect(edgeRows(p, [2150, 2000], [2000, 3000])).toEqual(['way/way:1']);
    healthy(p);
  });
});

describe('§3.6: a slide keeps attractCm from its fixed route\'s ends', () => {
  it('the shore junction dragged towards the shore\'s end stops 26 cm short of it', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const r = report(warpBatch(p, 1, pointwise([[2000, 2000, -1990, 0]]), box(1900, 1900, 2100, 2100)));
    expect(r.report.halvings).toBe(0);
    expect(r.report.moves.map((m) => `${m.kind} ${m.to.x},${m.to.y}`)).toEqual(['slide 26,2000']);
    healthy(p);
  });
});

describe('§3.6: a slide keeps attractCm from every held vertex on its fixed route', () => {
  it('the shore junction dragged 90 cm towards a locked way\'s foot 100 cm along the shore stops 26 cm short of it', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2100, 2000), pt(2100, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const foot = vertexAtPoint(p, 2100, 2000);
    const r = report(warpBatch(p, 1, pointwise([[2000, 2000, 90, 0]]), box(1900, 1900, 2200, 2100), { warp: { held: [{ entity: 'way:2', ref: { role: 'way', entity: 'way:2' } }] } }));
    expect(r.report.held).toContain(foot);
    expect(r.report.halvings).toBe(0);
    // Clamped to 100 − 26 = 74 cm (unclamped, the placement rule would take (2 075, 2 000), 25 cm from the held foot).
    expect(r.report.moves.map((m) => `${m.kind} ${m.to.x},${m.to.y}`)).toEqual(['slide 2074,2000']);
    expect(at(p, foot)).toBe('2100,2000');
    healthy(p);
  });

  it('the held vertex behind the slide: the junction dragged 90 cm back towards a locked way\'s foot 100 cm behind it stops 26 cm short of it', () => {
    // Note 10's probe P2: the clamp's lower side (a held vertex before the slider along its route).
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(1900, 2000), pt(1900, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const foot = vertexAtPoint(p, 1900, 2000);
    const r = report(warpBatch(p, 1, pointwise([[2000, 2000, -90, 0]]), box(1800, 1900, 2100, 2100), { warp: { held: [{ entity: 'way:2', ref: { role: 'way', entity: 'way:2' } }] } }));
    expect(r.report.held).toContain(foot);
    expect(r.report.halvings).toBe(0);
    // Clamped to 100 − 26 = 74 cm back (unclamped, the placement rule would take (1 925, 2 000), 25 cm from the foot).
    expect(r.report.moves.map((m) => `${m.kind} ${m.to.x},${m.to.y}`)).toEqual(['slide 1926,2000']);
    expect(at(p, foot)).toBe('1900,2000');
    healthy(p);
  });

  it('control: the same drag with way:2 unlocked (its foot outside the region) lands 25 cm from the foot', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2100, 2000), pt(2100, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const r = report(warpBatch(p, 1, pointwise([[2000, 2000, 90, 0]]), box(1900, 1900, 2050, 2100)));
    expect(r.report.held).toEqual([]);
    // The foot (outside the region) stays but is not held: the placement rule takes the point nearest 2 090 that keeps
    // minEdge from it.
    expect(r.report.moves.map((m) => `${m.kind} ${m.to.x},${m.to.y}`)).toEqual(['slide 2075,2000']);
    healthy(p);
  });
});

describe('§3.6 held (5): the downward closure holds the ends of a coarser run carrying a held finer vertex', () => {
  /** An L2 kerb (1 000, 1 000)–(2 000, 1 000) and an L3 plot line ending on it at (1 500, 1 000), locked. */
  function lockedOnKerb() {
    const p = framed();
    commit(p, 2, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'block:1' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(1500, 1000), pt(1500, 1500)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    return p;
  }

  it('an L2 drag over a locked L3 plot line ending on an L2 kerb: the kerb\'s ends are held and nothing moves', () => {
    const p = lockedOnKerb();
    const pts = [[1000, 1000], [1500, 1000], [2000, 1000], [1500, 1500]] as const;
    const ids = pts.map(([x, y]) => vertexAtPoint(p, x, y));
    expect(ids.every((v) => v >= 0)).toBe(true);
    const lock = { held: [{ entity: 'plot:1', ref: { role: 'plot_line', entity: 'plot:1' } }] };
    const c = commit(p, 2, (o) => ({ ok: true as const, value: heldSet(o, box(900, 900, 2100, 1600), lock), warnings: [] }));
    // The plot line's two vertices (held (1)) and, by the closure, the kerb's two ends.
    expect(c.value.vertices.map((v) => at(p, v))).toEqual(['1000,1000', '1500,1000', '2000,1000', '1500,1500']);
    const r = report(warpBatch(p, 2, drag(0, 40), box(900, 900, 2100, 1600), { warp: lock }));
    expect(r.report.held.map((v) => at(p, v))).toEqual(['1000,1000', '1500,1000', '2000,1000', '1500,1500']);
    expect(r.report.moves).toEqual([]);
    expect(ids.map((v) => at(p, v))).toEqual(pts.map(([x, y]) => `${x},${y}`));
    healthy(p);
  });

  it('two rounds: a locked L4 wall ending on the L3 plot line holds the plot line\'s ends, then the kerb\'s; nothing moves, no halving', () => {
    // Note 11's probe P3: the closure's second round (L4 → L3 → L2). Stopped after one round, the kerb's ends are not
    // held, the step halves on the held plot-line foot's placement bound, and the held list differs.
    const p = lockedOnKerb();
    commit(p, 4, (o) => insertChain(o, [pt(1500, 1250), pt(1700, 1250)], [{ role: 'party_wall', entity: 'bldg:1' }], 'mandatory'));
    const lock = { held: [{ entity: 'bldg:1', ref: { role: 'party_wall', entity: 'bldg:1' } }] };
    const r = report(warpBatch(p, 2, drag(0, 40), box(900, 900, 2100, 1600), { warp: lock }));
    expect(r.report.held.map((v) => at(p, v))).toEqual(['1000,1000', '1500,1000', '2000,1000', '1500,1250', '1700,1250', '1500,1500']);
    expect(r.report.heldEntities).toEqual(['bldg:1']);
    expect(r.report.halvings).toBe(0);
    expect(r.report.lastFailure).toBe('');
    expect(r.report.moves).toEqual([]);
    expect(r.committed).toBe(false);
    healthy(p);
  });

  it('control: unlocked, the same drag moves the kerb\'s ends and the plot line, re-seating its foot on the kerb', () => {
    const p = lockedOnKerb();
    const r = report(warpBatch(p, 2, drag(0, 40), box(900, 900, 2100, 1600)));
    expect(r.report.held).toEqual([]);
    expect(r.report.moves.map((m) => `${m.kind} ${m.to.x},${m.to.y}`)).toEqual(['free 1000,1040', 'reseat 1500,1040', 'free 2000,1040', 'free 1500,1540']);
    healthy(p);
  });
});

describe('§3.3, §3.6: the commit record lists every moved vertex', () => {
  it('a step of free moves and slides (the locked plot): record.moved is the report\'s moved vertices, by position', () => {
    const p = plots();
    const w = warpBatch(p, 3, drag(40, 30), box(900, 900, 2300, 1700), { warp: { held: [{ entity: 'plot:A', ref: { owner: 'plot:A', level: 3 } }] } });
    const r = report(w);
    expect(r.report.moves.some((m) => m.kind === 'slide')).toBe(true);
    expect(r.report.moves.some((m) => m.kind === 'free')).toBe(true);
    const m = movedLists(p, w.ok ? w.value.record?.moved : undefined, [r.report]);
    expect(m.reported.length).toBe(r.report.moves.length);
    expect(m.record).toEqual(m.reported);
    healthy(p);
  });

  it('a step with a re-seat (the kerb fixture): the re-seated Steiner vertex is in record.moved', () => {
    const p = kerbArena();
    const s = vertexAtPoint(p, 1517, 1000);
    const w = warpBatch(p, 2, shear, box(990, 400, 2010, 1001));
    const r = report(w);
    const record = w.ok ? w.value.record?.moved ?? [] : [];
    expect(record).toContain(s);
    const m = movedLists(p, record, [r.report]);
    expect(m.record).toEqual(m.reported);
  });

  it('a step that moves nothing commits no record; a no-op after 8 halvings commits none either', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(1200, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    expect(report(warpBatch(p, 1, drag(0.2, 0), box(990, 1990, 1010, 2010))).committed).toBe(false);
    expect(report(warpBatch(p, 1, drag(40, 0), box(990, 1990, 1010, 2010), { record: () => false })).committed).toBe(false);
  });

  it('two warps in one batch: record.moved lists each moved vertex once, by its final position', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(1200, 2000), pt(1400, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const c = commit(p, 1, (o) => {
      must(warp(o, drag(0, 30), 1, box(990, 1990, 1210, 2010)));
      return warp(o, drag(0, 30), 1, box(1190, 2020, 1410, 2040));
    });
    expect((c.record?.moved ?? []).map((v) => at(p, v))).toEqual(['1000,2030', '1200,2060']);
    healthy(p);
  });
});

describe('§3.6 whole-step validation: a step that would turn the edges around a vertex is refused', () => {
  it('a lane end swung from east of its junction to west of it, crossing nothing at its end, halves twice', () => {
    const p = framed();
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 1000), pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2000, 2000), pt(2500, 2000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    // At full strength the end lands at (1 500, 2 100): no crossing, nothing in its swept triangle, but the junction's
    // edges would turn from (N, E, S) to (N, S, W) in the half-edge rotation's order; at half it would overlap north.
    const r = report(warpBatch(p, 1, pointwise([[2500, 2000, -1000, 100]]), box(2490, 1990, 2510, 2010)));
    expect(r.report.halvings).toBe(2);
    expect(vertexAtPoint(p, 2250, 2025)).toBeGreaterThanOrEqual(0);
    healthy(p);
  });

  it('the rotation alone: two ends of a junction swung past each other, their paths crossing no unmoved edge, halve on the rotation', () => {
    // Note 1: the junction (2 000, 2 000) stays (no field there); at full strength its east end swings west to (1 500,
    // 2 100) while its north end swings to (2 300, 2 300). The east end's path passes north of the short north edge's
    // end and that edge moves, so the path check reads no unmoved edge; neither swept triangle holds an unmoved vertex;
    // no edge crosses; but the junction's edges turn from (E, N, S) to (N, E, S). At ½ the same; at ¼ the order holds.
    const p = framed();
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 1000), pt(2000, 2000), pt(2000, 2300)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2000, 2000), pt(2500, 2000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const r = report(warpBatch(p, 1, pointwise([[2500, 2000, -1000, 100], [2000, 2300, 300, 0]]), box(1990, 1990, 2510, 2310)));
    expect(r.report.halvings).toBe(2);
    expect(r.report.lastFailure).toMatch(/^rotation: the edges at \(2000, 2000\) change their order/);
    expect(r.report.moves.map((m) => `${m.kind} ${m.from.x},${m.from.y}->${m.to.x},${m.to.y}`)).toEqual(['free 2500,2000->2250,2025', 'free 2000,2300->2075,2300']);
    healthy(p);
  });

  it('the mover path alone: a free chain carried whole over an unmoved edge, no ring but its own, halves on the path', () => {
    // Note 1: the L2 chain (1 900, 1 900)–(2 000, 1 900) dragged 160 cm north over the L1 way y = 2 000 lands at y = 2 060
    // at full strength: its new edge crosses nothing, the way's ends (x = 1 000, 3 000) lie outside its swept triangles,
    // no vertex has three edges and the only ring its moved edges carry is its own (the nesting check reads nothing), so
    // only the movers' paths crossing the way refuse it. At ½ it stands 20 cm from the way (clearance); at ¼ it commits.
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(3000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(1900, 1900), pt(2000, 1900)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const r = report(warpBatch(p, 2, drag(0, 160), box(1800, 1800, 2100, 1950)));
    expect(r.report.halvings).toBe(2);
    expect(r.report.lastFailure).toMatch(/^clearance: the vertex \(1900, 1980\)/);
    expect(r.report.moves.map((m) => `${m.kind} ${m.to.x},${m.to.y}`)).toEqual(['free 1900,1940', 'free 2000,1940']);
    healthy(p);
  });
});

describe('§3.10\'s placement bound at the step: a re-seat placed before an end of its own route that is placed elsewhere', () => {
  it('the re-seat reads the sliding end at its rounded target, the end steps aside, the bound fails and the step halves once', () => {
    // Note 2: an L1 way (2 000, 2 000)–(2 000, 1 000) on the L0 shore y = 2 000, an L2 lane ending on it at (2 000,
    // 1 500), an unlocked L1 foot at (2 100, 2 000) outside the region. The way's shore end slides +90 cm: its rounded
    // target (2 090, 2 000) stands 10 cm from the foot, so the placement rule seats it at (2 075, 2 000). The lane's end,
    // lower in (y, x), is placed first, on the route read at (2 090, 2 000): at (2 045, 1 496) — 0.71 cm and more off the
    // route (2 075, 2 000)–(2 000, 1 000) as the step leaves it. At ½ the end keeps its rounded target and the step commits.
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 2000), pt(2000, 1000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2100, 2000), pt(2100, 3000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    commit(p, 2, (o) => insertChain(o, [pt(2000, 1500), pt(1500, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    expect(p.vertices.level[vertexAtPoint(p, 2000, 1500)]).toBe(2);
    const r = report(warpBatch(p, 1, pointwise([[2000, 2000, 90, 0]]), box(1900, 1900, 2050, 2100)));
    expect(r.report.halvings).toBe(1);
    expect(r.report.lastFailure).toMatch(/^placement bound: \(2045, 1496\) lies beyond the hot pixel of its route/);
    expect(r.report.moves.map((m) => `${m.kind} ${m.from.x},${m.from.y}->${m.to.x},${m.to.y}`)).toEqual(['reseat 2000,1500->2022,1499', 'slide 2000,2000->2045,2000']);
    healthy(p);
  });
});

/** The kerb fixture in local coordinates offset by (1 000, 1 000): kerb (0, 0)–(1 000, 0), a plot line ending on it at (517, 0), a vertex at (517, 30). */
function kerbArena() {
  const p = framed();
  const L = (x: number, y: number) => pt(1000 + x, 1000 + y);
  commit(p, 2, (o) => insertChain(o, [L(0, 0), L(1000, 0)], [{ role: 'kerb', entity: 'block:1' }], 'mandatory'));
  commit(p, 3, (o) => {
    must(insertChain(o, [L(517, 0), L(517, -500)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    return insertChain(o, [L(517, 30), L(517, 500)], [{ role: 'plot_line', entity: 'plot:2' }], 'mandatory');
  });
  return p;
}

/** The kerb's shear: (0, 9 · x / 1 000) in local coordinates, below the kerb line. */
const shear = { displacement: (x: number, y: number) => (y <= 1000 ? { x: 0, y: (9 * (x - 1000)) / 1000 } : { x: 0, y: 0 }) };

describe('§13.1: the kerb (0, 0)–(1 000, 9) past (517, 30) — its re-seated vertex placed by the placement rule', () => {
  it('commits, the plot-line end re-seated at (517, 4) — 25.999 cm from the edge — where plain rounding (517, 5) is 24.999 cm', () => {
    const p = kerbArena();
    const s = vertexAtPoint(p, 1517, 1000);
    expect(p.vertices.level[s]).toBe(3);
    expect(p.vertices.flags[s] & (VERTEX_STEINER | VERTEX_SPLIT)).toBe(VERTEX_STEINER | VERTEX_SPLIT);
    const r = report(warpBatch(p, 2, shear, box(990, 400, 2010, 1001)));
    expect(r.committed).toBe(true);
    expect(r.report.halvings).toBe(0);
    expect(at(p, vertexAtPoint(p, 2000, 1009))).toBe('2000,1009');
    const re = r.report.moves.find((m) => m.kind === 'reseat');
    expect(re).toBeDefined();
    expect(`${re?.to.x},${re?.to.y}`).toBe('1517,1004');
    expect(r.report.warnings.some((w) => w.code === 'W_PLACED')).toBe(true);
    // Plain rounding of the projection lands at (517, 5): the vertex (517, 30) then stands 24.999 cm from the kerb.
    expect(closerThan(1517, 1030, 1517, 1005, 2000, 1009, 25)).toBe(true);
    expect(closerThan(1517, 1030, 1517, 1004, 2000, 1009, 25)).toBe(false);
    // The re-seated vertex keeps its split flag (§3.6 (b)) and lies within the hot pixel of the moved kerb.
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const o = 1000 * 4 - 9 * 517;
    expect((o * o) / (1000 * 1000 + 81)).toBeLessThanOrEqual(0.71 * 0.71);
    healthy(p);
  });
});

/** A kerb with two plot lines ending on it at x = 500 and 527 (local), inserted in either order, with a decoy to shift slots. */
function twoSteiner(order: 'ab' | 'ba') {
  const p = framed();
  const L = (x: number, y: number) => pt(1000 + x, 1000 + y);
  commit(p, 2, (o) => insertChain(o, [L(0, 0), L(1000, 0)], [{ role: 'kerb', entity: 'block:1' }], 'mandatory'));
  if (order === 'ba') {
    // A decoy inserted and removed first: its freed slots go to the later chains, so every slot differs.
    commit(p, 3, (o) => insertChain(o, [L(100, -900), L(100, -700), L(300, -700)], [{ role: 'plot_line', entity: 'decoy:1' }], 'mandatory'));
    commit(p, 3, (o) => removeEdges(o, { role: 'plot_line', entity: 'decoy:1' }));
  }
  const a = (o: Parameters<typeof insertChain>[0]) => insertChain(o, [L(500, 0), L(500, -400)], [{ role: 'plot_line', entity: 'plot:a' }], 'mandatory');
  const b = (o: Parameters<typeof insertChain>[0]) => insertChain(o, [L(527, 0), L(527, -400)], [{ role: 'plot_line', entity: 'plot:b' }], 'mandatory');
  commit(p, 3, (o) => (order === 'ab' ? a(o) : b(o)));
  commit(p, 3, (o) => (order === 'ab' ? b(o) : a(o)));
  return p;
}

describe('§13.1: two Steiner vertices re-seated with projections within minEdge + 1 cm — identical output after a slot renumbering', () => {
  it('the same warp on the two slot orders gives the same arena and the same moves', () => {
    // The kerb's far end lifts by 40 cm and the field squeezes x towards 500, so the projections land ≈ 25.7 cm apart.
    const field = { displacement: (x: number, y: number) => (y <= 1000 ? { x: -0.05 * (x - 1500), y: (40 * (x - 1000)) / 1000 } : { x: 0, y: 0 }) };
    const out: string[] = [];
    const moves: string[] = [];
    const slots: string[] = [];
    for (const order of ['ab', 'ba'] as const) {
      const p = twoSteiner(order);
      const sa = vertexAtPoint(p, 1500, 1000);
      const sb = vertexAtPoint(p, 1527, 1000);
      slots.push(`${sa},${sb},${vertexAtPoint(p, 1500, 600)},${vertexAtPoint(p, 1527, 600)}`);
      const r = report(warpBatch(p, 2, field, box(1490, 800, 2010, 1001)));
      healthy(p);
      out.push(noVersion(contentPrint(p)));
      moves.push(JSON.stringify(r.report.moves.map((m) => [m.kind, m.from, m.to])) + `|${r.report.halvings}`);
      // Both Steiner vertices were re-seated, their projections within minEdge + 1 cm of each other.
      expect(r.report.halvings).toBe(0);
      const rs = r.report.moves.filter((m) => m.kind === 'reseat');
      expect(rs.length).toBe(2);
      const d = Math.hypot(rs[1].to.x - rs[0].to.x, rs[1].to.y - rs[0].to.y);
      expect(d).toBeGreaterThanOrEqual(25);
      expect(d).toBeLessThanOrEqual(27);
    }
    expect(slots[1]).not.toBe(slots[0]);
    expect(out[1]).toBe(out[0]);
    expect(moves[1]).toBe(moves[0]);
  });
});

/**
 * A diagonal kerb (0, 0)–(1 000, 1 000) with plot lines ending on it at (500, 500) and (519, 519) — 26.87 cm apart,
 * beyond attractCm — inserted in either slot order. A field sliding them 1.55 and 0.35 cm along the kerb puts their
 * projections 25.17 cm apart, and their rounded targets (502, 502) and (519, 519) 24.04 cm apart: the vertex placed
 * first must step aside, so the two possible orders give different points (§3.6's 6.8 % case).
 */
function diagonal(order: 'ab' | 'ba') {
  const p = framed();
  const L = (x: number, y: number) => pt(1000 + x, 1000 + y);
  commit(p, 2, (o) => insertChain(o, [L(0, 0), L(1000, 1000)], [{ role: 'kerb', entity: 'block:1' }], 'mandatory'));
  const a = (o: Parameters<typeof insertChain>[0]) => insertChain(o, [L(500, 500), L(700, 100)], [{ role: 'plot_line', entity: 'plot:a' }], 'mandatory');
  const b = (o: Parameters<typeof insertChain>[0]) => insertChain(o, [L(519, 519), L(900, 300)], [{ role: 'plot_line', entity: 'plot:b' }], 'mandatory');
  commit(p, 3, (o) => (order === 'ab' ? a(o) : b(o)));
  commit(p, 3, (o) => (order === 'ab' ? b(o) : a(o)));
  return p;
}

describe('§3.6 order within a step: a function of positions alone', () => {
  it('two re-seats whose rounded targets collide: the lower (y, x) is placed first, whatever the slots', () => {
    const field = pointwise([[1500, 1500, 1.55, 1.55], [1519, 1519, 0.35, 0.35]]);
    const region = [P(1300, 1300), P(1600, 1300), P(1600, 1600), P(1300, 1600)];
    const out: string[] = [];
    const slots: string[] = [];
    for (const order of ['ab', 'ba'] as const) {
      const p = diagonal(order);
      slots.push(`${vertexAtPoint(p, 1500, 1500)},${vertexAtPoint(p, 1519, 1519)}`);
      const r = report(warpBatch(p, 2, field, region));
      expect(r.report.halvings).toBe(0);
      // (500, 500) is placed first: its nearest point (502, 502) stands 24.04 cm from (519, 519), so it steps to
      // (501, 501); (519, 519) then keeps its point. Placed the other way round, (519, 519) would step to (520, 520).
      expect(r.report.moves.map((m) => `${m.kind} ${m.to.x - 1000},${m.to.y - 1000}`)).toEqual(['reseat 501,501']);
      expect(vertexAtPoint(p, 1519, 1519)).toBeGreaterThanOrEqual(0);
      healthy(p);
      out.push(noVersion(contentPrint(p)));
    }
    expect(slots[1]).not.toBe(slots[0]);
    expect(out[1]).toBe(out[0]);
  });
});

/** Two plots sharing the line x = 1 600, a footprint in each — the neighbour's with two corners on the shared line. */
function plots() {
  const p = framed();
  commit(p, 3, (o) => {
    must(insertChain(o, [pt(1000, 1000), pt(1600, 1000), pt(1600, 1600), pt(1000, 1600)], [{ role: 'plot_line', entity: 'plot:A' }], 'mandatory', { closed: true }));
    return insertChain(o, [pt(1600, 1000), pt(2200, 1000), pt(2200, 1600), pt(1600, 1600)], [{ role: 'plot_line', entity: 'plot:B' }], 'mandatory', { closed: true });
  });
  const fa = pointLocate(p, G, 3, pt(1300, 1300));
  const fb = pointLocate(p, G, 3, pt(1900, 1300));
  if (fa.on !== 'face' || fb.on !== 'face' || fa.level !== 3 || fb.level !== 3) throw new Error('no plot faces');
  commit(p, 3, (o) => {
    must(setOwner(o, [fa.face], 'plot:A'));
    return setOwner(o, [fb.face], 'plot:B');
  });
  commit(p, 4, (o) => {
    must(insertChain(o, [pt(1100, 1100), pt(1300, 1100), pt(1300, 1300), pt(1100, 1300)], [{ role: 'party_wall', entity: 'bldg:1' }], 'mandatory', { closed: true }));
    must(insertChain(o, [pt(1400, 1100), pt(1500, 1100), pt(1500, 1200), pt(1400, 1200)], [{ role: 'party_wall', entity: 'bldg:2' }], 'mandatory', { closed: true }));
    return insertChain(o, [pt(1600, 1200), pt(1800, 1200), pt(1800, 1400), pt(1600, 1400)], [{ role: 'party_wall', entity: 'bldg:3' }], 'mandatory', { closed: true });
  });
  const f1 = pointLocate(p, G, 4, pt(1200, 1200));
  if (f1.on !== 'face' || f1.level !== 4) throw new Error('no footprint face');
  commit(p, 4, (o) => setOwner(o, [f1.face], 'bldg:1'));
  return p;
}

describe('§13.1: a warp over a locked plot and a pinned building holds every corner (the neighbour\'s footprint corner slides)', () => {
  it('the locked plot\'s corners and its nested footprints stay; the neighbour\'s corners on the plot line slide along it', () => {
    const p = plots();
    const fixed = [[1000, 1000], [1600, 1000], [1600, 1600], [1000, 1600], [1100, 1100], [1300, 1100], [1300, 1300], [1100, 1300], [1400, 1100], [1500, 1100], [1500, 1200], [1400, 1200]];
    const ids = fixed.map(([x, y]) => vertexAtPoint(p, x, y));
    expect(ids.every((v) => v >= 0)).toBe(true);
    const r = report(warpBatch(p, 3, drag(40, 30), box(900, 900, 2300, 1700), { warp: { held: [{ entity: 'plot:A', ref: { owner: 'plot:A', level: 3 } }, { entity: 'bldg:1', ref: { owner: 'bldg:1', level: 4 } }] } }));
    expect(r.committed).toBe(true);
    expect(r.report.heldEntities).toEqual(['bldg:1', 'plot:A']);
    expect(ids.map((v) => at(p, v))).toEqual(fixed.map(([x, y]) => `${x},${y}`));
    const slid = r.report.moves.filter((m) => m.kind === 'slide');
    expect(slid.map((m) => `${m.from.x},${m.from.y}->${m.to.x},${m.to.y}`)).toEqual(['1600,1200->1600,1230', '1600,1400->1600,1430']);
    expect(r.report.moves.filter((m) => m.kind === 'free').map((m) => `${m.to.x - m.from.x},${m.to.y - m.from.y}`).every((d) => d === '40,30')).toBe(true);
    healthy(p);
  });

  it('without the injected locks the same warp moves the plot\'s corners', () => {
    const p = plots();
    report(warpBatch(p, 3, drag(40, 30), box(900, 900, 2300, 1700)));
    expect(vertexAtPoint(p, 1000, 1000)).toBe(-1);
    expect(vertexAtPoint(p, 1040, 1030)).toBeGreaterThanOrEqual(0);
    healthy(p);
  });
});

/** A spine way:1 along y = 2 000 through (1 500, 2 000), and a lane way:2 ending on it at (2 000, 2 000) — a same-level T. */
function tee() {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(1500, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
  return p;
}

describe('§13.1: a warp over a spine carrying a same-level T-junction, then the lane removed — the junction stays a shape vertex', () => {
  it('the warp moves the junction (b): its flag clears, and removing the lane leaves it on the warped spine', () => {
    const p = tee();
    const j = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.flags[j] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const r = report(warpBatch(p, 1, drag(0, 60), box(1900, 1900, 2100, 2100)));
    expect(r.report.flagCleared).toEqual([j]);
    expect(p.vertices.flags[j] & VERTEX_SPLIT).toBe(0);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    expect(vertexAtPoint(p, 2000, 2060)).toBe(j);
    expect(edgeRows(p, [1500, 2000], [2000, 2060])).toEqual(['way/way:1']);
    expect(edgeRows(p, [2000, 2060], [4000, 2000])).toEqual(['way/way:1']);
    healthy(p);
  });

  it('the warp moves the spine\'s vertex beside the unmoved junction (b′): the junction is unflagged and listed, and stays', () => {
    const p = tee();
    const j = vertexAtPoint(p, 2000, 2000);
    const w = warpBatch(p, 1, drag(0, 50), box(1400, 1900, 1600, 2100));
    const r = report(w);
    expect(r.report.unflagged).toEqual([j]);
    expect(w.ok && w.value.record?.unflagged).toEqual([j]);
    expect(p.vertices.flags[j] & VERTEX_SPLIT).toBe(0);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    expect(vertexAtPoint(p, 2000, 2000)).toBe(j);
    expect(edgeRows(p, [1500, 2050], [2000, 2000])).toEqual(['way/way:1']);
    healthy(p);
  });

  it('control: without a warp the lane\'s removal dissolves the junction', () => {
    const p = tee();
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    healthy(p);
  });
});

/** A spine through (1 000, 2 000) and (3 000, 2 000), its north block owned at S4, an L2 lane ending on it at (2 000, 2 000). */
function laned(lift: number) {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(1000, 2000), pt(3000, 2000 + lift), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  const f = pointLocate(p, G, 1, pt(2000, 3000));
  if (f.on !== 'face') throw new Error('no block');
  commit(p, 1, (o) => setOwner(o, [f.face], 'block:n'), { stage: S4, rederivesFrom: S4 });
  return p;
}

describe('§13.1: a warp that re-seats a Steiner vertex, then clearFiner — the vertex dissolves and the coarser edge is restored exactly', () => {
  it('the lane\'s end re-seated onto the lifted spine keeps its flag; clearFiner then restores the spine edge exactly', () => {
    const p = laned(0);
    const c2 = commit(p, 2, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const l2 = c2.record?.faces.find((d) => d.level === 2)?.created ?? [];
    expect(l2.length).toBe(2);
    commit(p, 2, (o) => setOwner(o, l2, 'cell:1'), { stage: S8, rederivesFrom: S8 });
    const s = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[s]).toBe(2);
    const r = report(warpBatch(p, 1, drag(0, 100), box(2900, 1900, 3100, 2100)));
    const re = r.report.moves.find((m) => m.kind === 'reseat');
    expect(re?.vertex).toBe(s);
    // The lane's end projected on the lifted route (1 000, 2 000)–(3 000, 2 100): within its hot pixel.
    const o = 2000 * ((re?.to.y ?? 0) - 2000) - 100 * ((re?.to.x ?? 0) - 1000);
    expect((o * o) / (2000 * 2000 + 100 * 100)).toBeLessThanOrEqual(0.71 * 0.71);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    healthy(p);
    commit(p, 1, (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 1), { stage: S8, rederivesFrom: S8 });
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2050)).toBe(-1);
    expect(edgeRows(p, [1000, 2000], [3000, 2100])).toEqual(['way/way:1']);
    // Exactly the arena the lifted spine gives without the lane.
    expect(noVersion(state(p))).toBe(noVersion(state(laned(100))));
  });
});

describe('§3.6 held vertices (2) – (4) and the dry run', () => {
  it('a deck_end vertex is held unless fromLevel = 0; a raised_foot vertex always', () => {
    for (const [role, level, moves] of [['deck_end', 1, false], ['deck_end', 0, true], ['gate_end', 1, false], ['raised_foot', 0, false]] as const) {
      const p = framed();
      commit(p, level, (o) => insertChain(o, [pt(1000, 1000), pt(1500, 1000)], [{ role: 'way', entity: 'way:1' }], 'mandatory', { knots: [{ index: 0, role, ordinal: 0, entity: 'bridge:1' }] }));
      const r = report(warpBatch(p, level, drag(50, 0), box(990, 990, 1010, 1010)));
      expect(r.report.moves.length > 0).toBe(moves);
      expect(r.report.held.length > 0).toBe(!moves);
      healthy(p);
    }
  });

  it('§13.1: a warp with fromLevel = 1 over a generated and an edited water gate moves neither gate\'s bank vertices', () => {
    // Note 9. Two waters between shores y = 1 500 and y = 2 500: the generated gate's L1 wall crosses the west one, its
    // gate_end vertices L1 Steiner vertices on the L0 shores (held (2)); the edited gate's L0 wall crosses the east one,
    // its gate_end vertices L0 (level < fromLevel). A drag along the shores slides the L1 way's foot and nothing else.
    const p = framed();
    commit(p, 0, (o) => {
      for (const [x0, x1, w] of [[0, 2400, 'west'], [2600, 4000, 'east']] as const) {
        must(insertChain(o, [pt(x0, 1500), pt(x1, 1500)], [{ role: 'shore', entity: `water:${w}` }], 'mandatory'));
        must(insertChain(o, [pt(x0, 2500), pt(x1, 2500)], [{ role: 'shore', entity: `water:${w}:far` }], 'mandatory'));
      }
      return insertChain(o, [pt(3000, 1500), pt(3000, 2500)], [{ role: 'wall', entity: 'wall:e' }], 'mandatory', { knots: [{ index: 0, role: 'gate_end', ordinal: 0, entity: 'gate:e' }, { index: 1, role: 'gate_end', ordinal: 1, entity: 'gate:e' }] });
    });
    commit(p, 1, (o) => insertChain(o, [pt(2000, 1000), pt(2000, 1500), pt(2000, 2500), pt(2000, 3000)], [{ role: 'wall', entity: 'wall:g' }], 'mandatory', { knots: [{ index: 1, role: 'gate_end', ordinal: 0, entity: 'gate:g' }, { index: 2, role: 'gate_end', ordinal: 1, entity: 'gate:g' }] }));
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1500), pt(1000, 500)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const banks = [[2000, 1500], [2000, 2500], [3000, 1500], [3000, 2500]];
    const ids = banks.map(([x, y]) => vertexAtPoint(p, x, y));
    expect(ids.map((v) => p.vertices.level[v])).toEqual([1, 1, 0, 0]);
    const r = report(warpBatch(p, 1, drag(60, 0), box(900, 1400, 3100, 2600)));
    expect(r.report.halvings).toBe(0);
    expect(r.report.moves.map((m) => `${m.kind} ${m.from.x},${m.from.y}->${m.to.x},${m.to.y}`)).toEqual(['slide 1000,1500->1060,1500']);
    expect(ids.map((v) => at(p, v))).toEqual(banks.map(([x, y]) => `${x},${y}`));
    // The generated gate's banks are held (2), with the ends of the shore runs they lie on (5); the edited gate's L0
    // banks stay because no vertex of level < fromLevel moves.
    expect(r.report.held.map((v) => at(p, v))).toEqual(['0,1500', '2000,1500', '2400,1500', '0,2500', '2000,2500', '2400,2500']);
    healthy(p);
  });

  it('§13.1: a warp with fromLevel = 1 over finished fabric gives no E_KEPT — a move batch keeps nothing (J-K27)', () => {
    // Note 9. A block owned at S4 holds an L2 cell owned at S4 and an L3 plot owned at S4: kept content for an insertion
    // of a batch that re-derives from S8 (the control's E_KEPT). The warp over them commits in a move batch (rederivesFrom
    // the first stage, §3.6) and in a batch re-deriving from S8 alike, re-seating the plot line's ends with the cell.
    const fabric = () => {
      const p = framed();
      commit(p, 1, (o) => {
        must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
        return insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
      });
      const b = pointLocate(p, G, 1, pt(1000, 3000));
      if (b.on !== 'face') throw new Error('no block');
      commit(p, 1, (o) => setOwner(o, [b.face], 'block:1'), { stage: S4, rederivesFrom: S4 });
      commit(p, 2, (o) => insertChain(o, [pt(500, 2500), pt(1500, 2500), pt(1500, 3500), pt(500, 3500)], [{ role: 'kerb', entity: 'cell:1' }], 'mandatory', { closed: true }), { stage: S4, rederivesFrom: S4 });
      const k = pointLocate(p, G, 2, pt(1000, 3000));
      if (k.on !== 'face') throw new Error('no cell');
      commit(p, 2, (o) => setOwner(o, [k.face], 'cell:1'), { stage: S4, rederivesFrom: S4 });
      commit(p, 3, (o) => insertChain(o, [pt(1000, 2500), pt(1000, 3500)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), { stage: S4, rederivesFrom: S4 });
      const q = pointLocate(p, G, 3, pt(800, 3000));
      if (q.on !== 'face') throw new Error('no plot');
      commit(p, 3, (o) => setOwner(o, [q.face], 'plot:1'), { stage: S4, rederivesFrom: S4 });
      return p;
    };
    const control = fabric();
    expect(tx(control, spec(1, { rederivesFrom: S8 }), (o) => insertChain(o, [pt(1000, 2000), pt(1000, 4000)], [{ role: 'way', entity: 'way:3' }], 'mandatory'))).toMatchObject({ ok: false, code: 'E_KEPT' });
    for (const rederivesFrom of [0, S8]) {
      const p = fabric();
      const w = tx(p, spec(1, { rederivesFrom: rederivesFrom as never }), (o) => warp(o, drag(30, -20), 1, box(400, 2400, 1600, 3600))) as KernelResult<Committed<MoveReport>>;
      expect(w.ok).toBe(true);
      if (!w.ok) continue;
      expect(w.value.record).not.toBeNull();
      expect(w.value.value.halvings).toBe(0);
      expect(w.value.value.moves.map((m) => `${m.kind} ${m.to.x},${m.to.y}`)).toEqual(['free 530,2480', 'reseat 1030,2480', 'free 1530,2480', 'free 530,3480', 'reseat 1030,3480', 'free 1530,3480']);
      healthy(p);
    }
  });

  it('heldSet lists the held vertices and entities a warp at the batch\'s level would hold', async () => {
    const { heldSet } = await import('../../src/warp/index.js');
    const p = plots();
    const c = commit(p, 3, (o) => ({ ok: true as const, value: heldSet(o, box(900, 900, 2300, 1700), { held: [{ entity: 'plot:A', ref: { owner: 'plot:A', level: 3 } }, { entity: 'ghost:1', ref: { owner: 'ghost:1', level: 3 } }] }), warnings: [] }));
    expect(c.record).toBeNull();
    expect(c.value.entities).toEqual(['plot:A']);
    expect(c.value.vertices.length).toBe(12); // four plot corners, eight footprint corners nested in the plot
  });

  it('a smoothing step holds kernel-pinned vertices; a user\'s warp moves them', async () => {
    const { VERTEX_PINNED } = await import('../../src/arena/index.js');
    for (const smoothing of [true, false]) {
      const p = framed();
      commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(1500, 1000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      p.vertices.flags[vertexAtPoint(p, 1000, 1000)] |= VERTEX_PINNED;
      const r = report(warpBatch(p, 1, drag(50, 0), box(990, 990, 1010, 1010), { warp: { smoothing } }));
      expect(r.report.moves.length).toBe(smoothing ? 0 : 1);
    }
  });
});

describe('§3.6: the field reads the brushes at each vertex; the step\'s report lists every move in canonical order', () => {
  it('a displace brush over a grid of ways moves only vertices inside the region, and the moves come by position', () => {
    const p = framed();
    commit(p, 1, (o) => {
      for (const x of [1000, 1500, 2000]) must(insertChain(o, [pt(x, 500), pt(x, 1500), pt(x, 2500)], [{ role: 'way', entity: `way:${x}` }], 'mandatory'));
      return { ok: true as const, value: null, warnings: [] };
    });
    // Note 3: the brush (radius 1 600 cm) is wider than the region, so the region does the work: every way vertex outside
    // it has a field displacement and stays.
    const field = brush('displace', 1500, 1500, 1600, 0, 60, -40);
    const outside = [[1000, 500], [1500, 500], [2000, 500], [1000, 2500], [1500, 2500], [2000, 2500]];
    for (const [x, y] of outside) expect(field.displacement(x, y).x).toBeGreaterThan(0);
    const r = report(warpBatch(p, 1, field, box(900, 1400, 2100, 1600)));
    const from = r.report.moves.map((m) => [m.from.y, m.from.x]);
    expect(from).toEqual([...from].sort((a, b) => a[0] - b[0] || a[1] - b[1]));
    expect(r.report.moves.every((m) => m.from.y === 1500)).toBe(true);
    for (const [x, y] of outside) expect(vertexAtPoint(p, x, y)).toBeGreaterThanOrEqual(0);
    healthy(p);
  });

  it('a finer vertex outside the region, on a run a region vertex ends, is re-seated with no field of its own', () => {
    // Note 3: an L2 lane ends on way:1500 at (1 500, 1 100), outside the region, where the brush gives (45, −30). It is a
    // candidate (re-seated with its run), but the field applies inside the region only: its target is its own point
    // projected on the moved route (1 500, 500)–(1 560, 1 460), the lattice point (1 537, 1 098). With the field's (45,
    // −30) it would project 30 cm further south along the route.
    const p = framed();
    commit(p, 1, (o) => {
      for (const x of [1000, 1500, 2000]) must(insertChain(o, [pt(x, 500), pt(x, 1500), pt(x, 2500)], [{ role: 'way', entity: `way:${x}` }], 'mandatory'));
      return { ok: true as const, value: null, warnings: [] };
    });
    commit(p, 2, (o) => insertChain(o, [pt(1500, 1100), pt(1200, 1100)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const field = brush('displace', 1500, 1500, 1600, 0, 60, -40);
    expect(field.displacement(1500, 1100)).toEqual({ x: 45, y: -30 });
    const r = report(warpBatch(p, 1, field, box(900, 1400, 2100, 1600)));
    expect(r.report.moves.map((m) => `${m.kind} ${m.from.x},${m.from.y}->${m.to.x},${m.to.y}`)).toEqual(['reseat 1500,1100->1537,1098', 'free 1000,1500->1041,1473', 'free 1500,1500->1560,1460', 'free 2000,1500->2041,1473']);
    healthy(p);
  });
});

describe('§3.6 whole-step validation: the swept triangles, the work limit, the batch\'s level', () => {
  it('a chain end dragged past an unmoved vertex (no crossing at the end) fails the swept test and halves', () => {
    const p = framed();
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(1000, 1000), pt(1000, 1500)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(1100, 1000), pt(1100, 500)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const r = report(warpBatch(p, 1, pointwise([[1000, 1000, 150, 0]]), box(990, 990, 1010, 1010)));
    // At full strength the end lands at (1 150, 1 000), clear of everything, but its edge swept over (1 100, 1 000).
    expect(r.report.halvings).toBe(1);
    expect(r.report.lastFailure).toMatch(/^swept: the unmoved vertex \(1100, 1000\)/);
    expect(vertexAtPoint(p, 1075, 1000)).toBeGreaterThanOrEqual(0);
    healthy(p);
  });

  it('a halving past the batch\'s work limit refuses E_WORK_LIMIT and leaves the arena as it was', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(1060, 2000), pt(1140, 2000), pt(1200, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const before = state(p);
    const r = warpBatch(p, 1, pointwise([[1060, 2000, 36, 0], [1140, 2000, -36, 0]]), box(1050, 1990, 1150, 2010), { spec: { workLimit: 0 } });
    expect(r).toMatchObject({ ok: false, code: 'E_WORK_LIMIT' });
    expect(state(p)).toBe(before);
  });

  it('a warp\'s fromLevel is its batch\'s level (§3.3): another is a programming error, the arena untouched', async () => {
    const { tx } = await import('../../src/tx/index.js');
    const { warp } = await import('../../src/warp/index.js');
    const { spec } = await import('../tx/support.js');
    const p = framed();
    const before = state(p);
    expect(() => tx(p, spec(1), (o) => warp(o, drag(10, 0), 2, box(0, 0, 10, 10)))).toThrow(/fromLevel is its batch's level/);
    expect(state(p)).toBe(before);
  });

  it('an empty region (fewer than three points) moves nothing and commits nothing', () => {
    const p = framed();
    const r = report(warpBatch(p, 0, drag(10, 0), [P(0, 0), P(10, 0)]));
    expect(r.report.moves).toEqual([]);
    expect(r.committed).toBe(false);
  });
});

describe('§3.6 order within a step: a rounded target on a tie, read through the warp\'s door (y, then x)', () => {
  it('a re-seat whose target is x.5 rounds to the lower x, and the re-seat placed before it reads that point', () => {
    // N-r10c-6. Two plot lines end on the L2 kerb y = 1 000 at x = 1 500 and 1 530. The second's target is (1 525.5,
    // 1 000), a tie between 1 525 and 1 526: the placement rule's nearest takes 1 525 (y, then x). The first, placed
    // before it (lower x), aims at (1 500.6, 1 000): its nearest (1 501, 1 000) stands 24 cm from the tie's rounded
    // target, so it keeps its own point (1 500, 1 000), a placed point (W_PLACED). Rounded the other way (1 526), the
    // first would take (1 501, 1 000) and the second (1 526, 1 000).
    const p = framed();
    commit(p, 2, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'block:1' }], 'mandatory'));
    commit(p, 3, (o) => {
      must(insertChain(o, [pt(1500, 1000), pt(1500, 600)], [{ role: 'plot_line', entity: 'plot:a' }], 'mandatory'));
      return insertChain(o, [pt(1530, 1000), pt(1530, 600)], [{ role: 'plot_line', entity: 'plot:b' }], 'mandatory');
    });
    const r = report(warpBatch(p, 2, pointwise([[1500, 1000, 0.6, 0], [1530, 1000, -4.5, 0]]), box(1490, 990, 1540, 1010)));
    expect(r.report.halvings).toBe(0);
    expect(r.report.moves.map((m) => `${m.kind} ${m.from.x},${m.from.y}->${m.to.x},${m.to.y}`)).toEqual(['reseat 1530,1000->1525,1000']);
    expect(r.report.warnings.map((w) => `${w.code} ${w.at?.x},${w.at?.y}`)).toEqual(['W_PLACED 1500,1000']);
    expect(vertexAtPoint(p, 1500, 1000)).toBeGreaterThanOrEqual(0);
    healthy(p);
  });
});

describe('the placement rule\'s work: every candidate charged to insert.placementCandidates (N-r10c-1)', () => {
  /** One warp batch at `level` and the batch's per-counter work when the warp returned. */
  function charged(p: Parameters<typeof warpBatch>[0], level: 1 | 2, field: Parameters<typeof warpBatch>[2], region: Parameters<typeof warpBatch>[3]): { counts: Record<string, number>; warnings: string[] } {
    let counts: Record<string, number> = {};
    let warnings: string[] = [];
    const r = tx(p, spec(level, { rederivesFrom: 0 as never }), (o) => {
      const x = warp(o, field, level, region);
      counts = Object.fromEntries(openTx(o).work.counts);
      if (x.ok) warnings = x.value.warnings.map((w) => `${w.code} ${w.at?.x},${w.at?.y}`);
      return x;
    });
    expect(r.ok).toBe(true);
    return { counts, warnings };
  }

  it('a slide whose nearest point qualifies: one candidate', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    expect(charged(p, 1, drag(150, 40), box(1900, 1900, 2100, 2100))).toEqual({ counts: { 'insert.placementCandidates': 1 }, warnings: [] });
  });

  it('the §13.1 kerb\'s re-seat (W_PLACED): its nearest point and every band point before (517, 4) charged', () => {
    const p = kerbArena();
    const c = charged(p, 2, shear, box(990, 400, 2010, 1001));
    expect(c.warnings).toEqual(['W_PLACED 1517,1004']);
    expect(c.counts).toEqual({ 'insert.placementCandidates': KERB_CANDIDATES });
  });

  it('the slide beside an unlocked foot (W_PLACED): its nearest point and the band points nearer 2 090 than 2 075', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2100, 2000), pt(2100, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const c = charged(p, 1, pointwise([[2000, 2000, 90, 0]]), box(1900, 1900, 2050, 2100));
    expect(c.warnings).toEqual(['W_PLACED 2075,2000']);
    expect(c.counts).toEqual({ 'insert.placementCandidates': SLIDE_CANDIDATES });
  });
});
