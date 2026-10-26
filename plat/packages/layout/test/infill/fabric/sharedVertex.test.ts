// N-57 (1) (checks/M0-spec-notes.md; the session's diagnosis of M0-c-06's 50-seed CITY smoke, diagnosis-c06-smoke.md §3;
// C-0329): at a vertex several way chains share, S8's readings — the gap a planned end slides by, the seam its portal goes
// to, the continuation verdict, the antenna's tip — read every chain through the vertex, as the stage-end row
// `seam-portals` does (§13.2: "spaced by the portal gap" along each way chain). The fixtures are the smoke's
// configurations: a seam run of two ways with a bend and a portal 44 cm past the bend (seeds 20, 39, 44's figure read
// across the chain boundary), an antenna — a seam way's dead-end tip inside a district, carrying an earlier stage's
// junction, with a portal 44 cm from the tip (seeds 20, 39, 44 and 23 (i), CONFIRMED: `antennaCut` started the lane AT
// the tip), and an interior way's junction with a boundary arterial (seed 23 (ii)).
import { outgoing, pointLocate, splitThrough, STAGES, type KernelTx, type LatticePoint, type Plat } from '@plat/kernel';
import type { Portal, Seam } from '@plat/model';
import { describe, expect, it } from 'vitest';
import {
  chainRuns,
  continuationBounds,
  kerbPortals,
  portalGap,
  portalGapBreach,
  portalSeamAt,
  portalWaysAt,
  runS8,
  seamOfSpine,
  seamPortalProblems,
  spinePortals,
  straightCandidate,
  tipInPortalGap,
  vertexAt,
  vertexPoints,
  waysAt,
  widthCells,
  type KerbFace,
  type KerbSpine,
} from '../../../src/index.js';
import { CELLS, fixture, GROUND, kerbNow, P, type Fixture, type FixtureDistrict, type FixtureWay } from './support.js';
/** The lane the planner slides for: the lane band's top (ladderOn's and the planner's default). */
const NEW_LANE = widthCells('CITY').bands.lane[1];
const REACH = (w: number): number => portalGap(CELLS, w, NEW_LANE);
const W = 40_000;
const H = 30_000;

/** An earlier stage's portal (a vertex row and its record), as S5's growth portals stand in the seams. */
function plantedPortal(id: string, by: string, widthCm = 500): Portal {
  return { id, wayId: `way:${id}`, class: 'lane', widthCm: widthCm as never, at: { role: 'portal', entity: id }, bearing: 0 as never, from: 'growth', by };
}

/** Vertex rows planted on the L1 ways before the districts are owned (a portal, or an earlier stage's junction). */
function rowsAt(rows: readonly { at: LatticePoint; role: 'portal' | 'junction'; entity: string }[]): (k: Fixture['k'], plat: Plat) => void {
  return (k, plat) => {
    const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S6 }, stage: STAGES.S6, rederivesFrom: STAGES.S6, workLimit: 10_000_000 };
    const r = k.tx(spec, (o) => {
      for (const row of rows) {
        const loc = pointLocate(plat, GROUND, 1, row.at);
        let h: number;
        if (loc.on === 'edge') h = loc.edge;
        else if (loc.on === 'vertex' && outgoing(plat, loc.vertex).length > 0) h = outgoing(plat, loc.vertex)[0];
        else return { ok: false as const, code: 'E_INVARIANT' as const, detail: `(${String(row.at.x)}, ${String(row.at.y)}) is on no way` };
        const t = splitThrough(o, h, row.at, { role: row.role, entity: row.entity });
        if (!t.ok) return t;
      }
      return { ok: true as const, value: undefined, warnings: [] };
    });
    if (!r.ok) throw new Error(`rows: ${r.code} ${r.detail}`);
  };
}

/**
 * S6's minimal seam of one district pair holds every chain of their boundary run (C-0046; the smoke's seam cftw… holds
 * way:22, way:25 and way:52): the fixture's per-way seams of one pair merged into one record.
 */
function mergeSeams(f: Fixture): Seam[] {
  const out: Seam[] = [];
  for (const s of f.seams) {
    const same = out.find((x) => x.sides[0] === s.sides[0] && x.sides[1] === s.sides[1]);
    if (same === undefined) out.push({ ...s, edges: s.edges.slice(), portals: s.portals.slice() });
    else same.edges.push(...s.edges);
  }
  return out;
}

/** The arc length of q along a polyline (q on it). */
function along(line: readonly LatticePoint[], q: { x: number; y: number }): number {
  let acc = 0;
  let best = Infinity;
  let at = 0;
  for (let i = 0; i + 1 < line.length; i += 1) {
    const a = line[i];
    const b = line[i + 1];
    const l = Math.hypot(b.x - a.x, b.y - a.y);
    const t = Math.max(0, Math.min(1, ((q.x - a.x) * (b.x - a.x) + (q.y - a.y) * (b.y - a.y)) / (l * l)));
    const d = Math.hypot(a.x + t * (b.x - a.x) - q.x, a.y + t * (b.y - a.y) - q.y);
    if (d < best) {
      best = d;
      at = acc + t * l;
    }
    acc += l;
  }
  return at;
}

// ---- a seam run of two ways with a bend at V, a portal 44 cm past it -----------------------------------------------------

const V = P(20_000, 15_000);

/**
 * The bend: the west and east districts' boundary is the arterial `way:a` from the ring road at (110 m, 0) to V and on
 * from V as `way:b` due north to the ring road — one seam holding both chains; an earlier stage's portal on `way:b`
 * `pastCm` past V.
 */
function bend(pastCm: number, opts: { merged?: boolean; seed?: number } = {}): { f: Fixture; seams: Seam[]; west: string } {
  const ways: FixtureWay[] = [
    { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
    { id: 'way:a', cls: 'primary', widthCm: 1000, points: [P(11_000, 0), V] },
    { id: 'way:b', cls: 'primary', widthCm: 1000, points: [V, P(20_000, H)] },
  ];
  const districts: FixtureDistrict[] = [
    { seeds: [P(5_000, H / 2)], prosperity: 0.3, density: 0.5 },
    { seeds: [P(35_000, H / 2)], prosperity: 0.3, density: 0.5 },
  ];
  const f = fixture(60_000, ways, districts, { ...(opts.seed === undefined ? {} : { seed: opts.seed }), extraL1: rowsAt([{ at: P(20_000, 15_000 + pastCm), role: 'portal', entity: 'portal:g0' }]) });
  const west = f.districts[0].district.id;
  const seams = opts.merged === false ? f.seams.map((s) => ({ ...s, portals: s.portals.slice() })) : mergeSeams(f);
  const holder = seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:b'));
  if (holder === undefined) throw new Error('bend: no seam holds way:b');
  holder.portals.push(plantedPortal('portal:g0', west));
  return { f, seams, west };
}

describe('the gap a spine’s end slides by reads the portals of every seam chain through its end vertices (N-57 (1)(a))', () => {
  it('the bend: way:a carries no portal of its own, and the portal 44 cm past V on way:b stands at V on way:a’s line (clipped at its end); 20 m past V it is out of reach', { timeout: 120_000 }, () => {
    const { f, seams } = bend(44);
    const runA = chainRuns(f.plat, GROUND, { role: 'way', entity: 'way:a' })[0];
    expect(runA[runA.length - 1]).toEqual(V);
    const sa = seamOfSpine(seams, 'way:a');
    expect(sa).toBeDefined();
    // The old reading: way:a's own chain only — nothing (the portal is not on way:a).
    expect(kerbPortals(f.plat, GROUND, sa as Seam, 'way:a')).toEqual([]);
    const sp = spinePortals(f.plat, GROUND, seams, 'way:a', runA, [], REACH);
    expect(sp.bounding).toBe(true);
    expect(sp.portals).toEqual([{ at: V, laneWidthCm: 500 }]);
    // way:b reads its own portal where it is.
    const runB = chainRuns(f.plat, GROUND, { role: 'way', entity: 'way:b' })[0];
    expect(spinePortals(f.plat, GROUND, seams, 'way:b', runB, [], REACH).portals).toEqual([{ at: P(20_000, 15_044), laneWidthCm: 500 }]);
    const far = bend(2_000);
    const runFar = chainRuns(far.f.plat, GROUND, { role: 'way', entity: 'way:a' })[0];
    expect(spinePortals(far.f.plat, GROUND, far.seams, 'way:a', runFar, [], REACH).portals).toEqual([]);
  });

  it('an end planned on way:a 2 m before V slides out of the gap along way:a (≥ the gap from V); the old reading left it there', { timeout: 120_000 }, () => {
    const { f, seams } = bend(44);
    const at = pointLocate(f.plat, GROUND, 1, P(5_000, H / 2));
    expect(at.on).toBe('face');
    if (at.on !== 'face') return;
    const rings = kerbNow(f.k, at.face).filter((r) => r.length >= 3);
    const area = (r: readonly LatticePoint[]): number => r.reduce((s, q, i) => s + q.x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * q.y, 0);
    const outer = rings.filter((r) => area(r) > 0).sort((x, y) => area(y) - area(x))[0];
    const runA = chainRuns(f.plat, GROUND, { role: 'way', entity: 'way:a' })[0];
    const total = along(runA, V);
    // way:a's unit direction and its west normal; the kerb point on its corridor 2 m before V, and the far kerb point
    // on the ring road's kerb along the normal (a cut square to way:a).
    const d = { x: 9_000 / Math.hypot(9_000, 15_000), y: 15_000 / Math.hypot(9_000, 15_000) };
    const n = { x: -d.y, y: d.x };
    const onA = { x: V.x - 200 * d.x, y: V.y - 200 * d.y };
    const kerbA = { x: onA.x + 500 * n.x, y: onA.y + 500 * n.y };
    const t = (kerbA.x - 310) / -n.x;
    const kerbW = { x: 310, y: kerbA.y + t * n.y };
    const spine = (portals: KerbSpine['portals'], bounding: boolean): KerbFace => ({ rings: [outer], spines: [{ points: runA, halfWidthCm: 500, bounding, ...(portals === undefined ? {} : { portals }) }] });
    const sp = spinePortals(f.plat, GROUND, seams, 'way:a', runA, [], REACH);
    const fresh = straightCandidate(spine(sp.portals, sp.bounding), [outer], kerbW, kerbA, [0, 0], CELLS, NEW_LANE, 'c');
    const old = straightCandidate(spine(kerbPortals(f.plat, GROUND, seamOfSpine(seams, 'way:a') as Seam, 'way:a'), true), [outer], kerbW, kerbA, [0, 0], CELLS, NEW_LANE, 'c');
    expect(old).not.toBeNull();
    expect(total - along(runA, old?.ends[1].point ?? V)).toBeLessThan(250);
    const gap = portalGap(CELLS, 500, NEW_LANE);
    // Slid out of the gap along way:a, square to it (else it would be refused: the next rung), never within the gap of V.
    expect(fresh).not.toBeNull();
    if (fresh !== null) {
      expect(fresh.ends[1].kind).toBe('spine');
      expect(total - along(runA, fresh.ends[1].point)).toBeGreaterThanOrEqual(gap - 1);
      expect(fresh.ends[1].slidCm).toBeGreaterThan(0);
    }
  });

  for (const seed of [7, 13]) {
    it(`S8 on the bend (seed ${String(seed)}): every lane end near V keeps the gap of the portal 44 cm past it (before this round: ends 48–49 cm from V on way:a), and the row holds`, { timeout: 300_000 }, () => {
      const { f, seams } = bend(44, { seed });
      const r = runS8({ ...f.input, seams }, { report: undefined } as never);
      if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
      expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
      // The gap the planner slides by (the lane band's top) less the lattice's centimetre on each vertex.
      const gap = portalGap(CELLS, 500, NEW_LANE);
      let near = 0;
      for (const lane of r.value.lanes) {
        for (const run of chainRuns(f.plat, GROUND, lane.spine)) {
          for (const q of [run[0], run[run.length - 1]]) {
            const d = Math.hypot(q.x - V.x, q.y - V.y);
            if (d >= 1_500) continue;
            near += 1;
            expect(d).toBeGreaterThanOrEqual(gap - 2);
          }
        }
      }
      expect(near).toBeGreaterThan(0);
    });
  }

  it('the antenna’s tip: a tip inside a portal’s gap on its own way is refused (it cannot slide); outside every gap it is kept', { timeout: 120_000 }, () => {
    const line = [P(0, 0), P(0, 10_000)];
    const face = (bounding: boolean, at: number): KerbFace => ({ rings: [], spines: [{ points: line, halfWidthCm: 300, bounding, portals: [{ at: P(0, at), laneWidthCm: 340 }] }] });
    expect(tipInPortalGap(face(true, 9_956), P(0, 10_000), CELLS, NEW_LANE)).toBe(true);
    expect(tipInPortalGap(face(true, 44), P(0, 0), CELLS, NEW_LANE)).toBe(true);
    expect(tipInPortalGap(face(true, 8_000), P(0, 10_000), CELLS, NEW_LANE)).toBe(false);
    expect(tipInPortalGap(face(false, 9_956), P(0, 10_000), CELLS, NEW_LANE)).toBe(false);
    // A point that is no end of the spine is no tip of it.
    expect(tipInPortalGap(face(true, 5_000), P(0, 5_000), CELLS, NEW_LANE)).toBe(false);
  });
});

describe('the row read at the insertion: a portal inside another’s gap along a seam chain is taken out again (N-57 (1))', () => {
  it('at V, a new portal of the seam holding both chains lies 44 cm from the portal on way:b: a gap breach; 20 m past V none; on the portal’s own vertex two portals', { timeout: 120_000 }, () => {
    const { f, seams } = bend(44);
    const seam = seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:a')) as Seam;
    const v = vertexAt(f.plat, GROUND, V);
    expect(v).not.toBeNull();
    if (v === null) return;
    expect(portalGapBreach(f.plat, GROUND, seams, seam.id, v, 340, CELLS)).toBe('gap');
    const g = vertexAt(f.plat, GROUND, P(20_000, 15_044));
    expect(g).not.toBeNull();
    if (g !== null) expect(portalGapBreach(f.plat, GROUND, seams, seam.id, g, 340, CELLS)).toBe('two-portals');
    // A pending portal of the same insertion at the vertex is a second portal there too.
    expect(portalGapBreach(f.plat, GROUND, seams, seam.id, v, 340, CELLS, [{ seam: seam.id, at: V, widthCm: 340 }])).toBe('two-portals');
    const far = bend(2_000);
    const farSeam = far.seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:a')) as Seam;
    const fv = vertexAt(far.f.plat, GROUND, V);
    expect(fv).not.toBeNull();
    if (fv !== null) expect(portalGapBreach(far.f.plat, GROUND, far.seams, farSeam.id, fv, 340, CELLS)).toBeNull();
  });

  it('a pending portal of the same lane (its other end) is read as the row will read it: 44 cm along way:b from V, a gap breach', { timeout: 120_000 }, () => {
    const { f, seams } = bend(44);
    // The earlier portal's record taken out: its vertex stands as the lane's other end, not yet in the seam.
    const bare = seams.map((s) => ({ ...s, portals: [] as Seam['portals'] }));
    const seam = bare.find((s) => s.edges.some((e) => e.chain.entity === 'way:a')) as Seam;
    const v = vertexAt(f.plat, GROUND, V);
    expect(v).not.toBeNull();
    if (v === null) return;
    expect(portalGapBreach(f.plat, GROUND, bare, seam.id, v, 340, CELLS)).toBeNull();
    expect(portalGapBreach(f.plat, GROUND, bare, seam.id, v, 340, CELLS, [{ seam: seam.id, at: P(20_000, 15_044), widthCm: 340 }])).toBe('gap');
    // Pending in a seam that does not hold way:b: not on the row's reading of way:b.
    expect(portalGapBreach(f.plat, GROUND, bare, seam.id, v, 340, CELLS, [{ seam: 'seam:other', at: P(20_000, 15_044), widthCm: 340 }])).toBeNull();
  });

  it('it reads as the row: with one seam per way the portal at V is not on way:b’s seam, and the row finds no gap there either', { timeout: 120_000 }, () => {
    const { f, seams } = bend(44, { merged: false });
    const sa = seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:a')) as Seam;
    const v = vertexAt(f.plat, GROUND, V);
    expect(v).not.toBeNull();
    if (v !== null) expect(portalGapBreach(f.plat, GROUND, seams, sa.id, v, 340, CELLS)).toBeNull();
  });
});

// ---- the antenna: a seam way's dead-end tip inside a district, an earlier stage's junction on it -------------------------

/** The antenna's tip and the vertex 44.1 cm before it on the arterial (where an earlier stage's portal stands). */
const TIP = P(20_300, 22_500);
const Q = P(20_303, 22_456);

/**
 * The antenna (the smoke's seeds 20, 39, 44 and 23 (i)): the arterial `way:art` runs north from the ring road, bends at
 * (200 m, 200 m) and ENDS at the tip (203 m, 225 m) inside the north district; the cross street `way:cross` meets it at
 * (200 m, 150 m) and runs east. The north district A is the west half and the north-east quarter (the arterial's last
 * 75 m an antenna in its face); the south-east quarter is B. One seam (A, B) holds both chains. The tip carries an earlier
 * stage's junction (S5's, as junction:104 / :126 / :111 / :90); with `portal`, an earlier stage's portal at Q, 44 cm
 * before the tip (seed 20: lane 532's portal 44.2 cm from way:22's tip).
 */
function antenna(portal: boolean): { f: Fixture; seams: Seam[]; a: string } {
  const ways: FixtureWay[] = [
    { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
    { id: 'way:art', cls: 'primary', widthCm: 1000, points: [P(20_000, 0), P(20_000, 20_000), Q, TIP] },
    { id: 'way:cross', cls: 'secondary', widthCm: 600, points: [P(20_000, 15_000), P(W, 15_000)] },
  ];
  const districts: FixtureDistrict[] = [
    { seeds: [P(10_000, H / 2)], prosperity: 0.3, density: 0.5 },
    { seeds: [P(30_000, 7_500)], prosperity: 0.3, density: 0.5 },
  ];
  const rows: { at: LatticePoint; role: 'portal' | 'junction'; entity: string }[] = [{ at: TIP, role: 'junction', entity: 'junction:s5' }];
  if (portal) rows.push({ at: Q, role: 'portal', entity: 'portal:g0' });
  const f = fixture(60_000, ways, districts, { extraL1: rowsAt(rows) });
  const a = f.districts[0].district.id;
  const seams = mergeSeams(f);
  if (portal) {
    const holder = seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:art'));
    if (holder === undefined) throw new Error('antenna: no seam holds way:art');
    holder.portals.push(plantedPortal('portal:g0', a, 340));
  }
  return { f, seams, a };
}

describe('the antenna split keeps the portal gap at its tip (N-57 (1)(a); the smoke’s seeds 20, 39, 44, 23 (i))', () => {
  it('the fixture: the arterial’s tip is a spike of the north district’s face, its chain in the seam (A, B)', { timeout: 120_000 }, () => {
    const { f, seams, a } = antenna(true);
    const v = vertexAt(f.plat, GROUND, TIP);
    expect(v).not.toBeNull();
    if (v === null) return;
    expect(waysAt(f.plat, v)).toEqual(['way:art']);
    expect(seams.length).toBe(1);
    expect(seams[0].sides).toContain(a);
    expect(seams[0].edges.map((e) => e.chain.entity).sort()).toEqual(['way:art', 'way:cross']);
  });

  it('S8 commits and its row holds (before this round: refused, a gap of 44 cm): the tip is refused, no lane starts there', { timeout: 300_000 }, () => {
    const { f, seams } = antenna(true);
    const r = runS8({ ...f.input, seams }, { report: undefined } as never);
    if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
    expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
    for (const lane of r.value.lanes) {
      for (const run of chainRuns(f.plat, GROUND, lane.spine)) {
        for (const q of [run[0], run[run.length - 1]]) expect(q.x === TIP.x && q.y === TIP.y).toBe(false);
      }
    }
    // The antenna split was tried and found no candidate (its only tip in the gap), never reaching the kernel.
    const rungs = r.value.infill.report.districts.flatMap((d) => d.rungs.filter((x) => x.rung === 'antenna'));
    expect(rungs.length).toBeGreaterThan(0);
    expect(rungs.every((x) => x.outcome === 'none')).toBe(true);
    expect(r.value.lanes.length).toBeGreaterThan(5);
  });

  it('with no portal near the tip the antenna split starts at the tip and names the earlier stage’s junction there', { timeout: 300_000 }, () => {
    const { f, seams } = antenna(false);
    const r = runS8({ ...f.input, seams }, { report: undefined } as never);
    if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
    const names = (n: (typeof r.value.lanes)[number]['from']): boolean => n.kind === 'junction' && n.id === 'junction:s5';
    const atTip = r.value.lanes.filter((w) => names(w.from) || names(w.to));
    expect(atTip.length).toBe(1);
    expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
    // Its portal at the tip, in the seam holding the arterial.
    const portals = r.value.infill.seams.flatMap((s) => s.portals).filter((p) => p.from === 'baseLane' && p.wayId === atTip[0].id);
    expect(portals.map((p) => vertexPoints(f.plat, GROUND, p.at)[0])).toContainEqual(TIP);
  });
});

// ---- an interior way's junction with a boundary arterial (seed 23 (ii)) ---------------------------------------------------

/**
 * Two districts across the arterial (x = 200 m), the west one cut by the interior street `way:int` from the ring road to
 * the arterial at J = (200 m, 150 m): way:int has the west district on both sides (interior), the arterial bounds it.
 */
function junction(portalNorthCm: number | null = null): { f: Fixture; west: string; east: string } {
  const ways: FixtureWay[] = [
    { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
    { id: 'way:art', cls: 'primary', widthCm: 1000, points: [P(W / 2, 0), P(W / 2, H)] },
    { id: 'way:int', cls: 'lane', widthCm: 400, points: [P(0, H / 2), P(W / 2, H / 2)] },
  ];
  const districts: FixtureDistrict[] = [
    { seeds: [P(10_000, 7_500), P(10_000, 22_500)], prosperity: 0.3, density: 0.5 },
    { seeds: [P(30_000, H / 2)], prosperity: 0.3, density: 0.5 },
  ];
  const f = fixture(60_000, ways, districts, portalNorthCm === null ? {} : { extraL1: rowsAt([{ at: P(W / 2, H / 2 + portalNorthCm), role: 'portal', entity: 'portal:g0' }]) });
  const west = f.districts[0].district.id;
  if (portalNorthCm !== null) f.seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:art'))?.portals.push(plantedPortal('portal:g0', west, 340));
  return { f, west, east: f.districts[1].district.id };
}

describe('an end on the junction of an interior way and a boundary arterial reads the arterial (N-57 (1)(b); seed 23 (ii))', () => {
  const { f, west, east } = junction();
  const J = P(W / 2, H / 2);

  it('the fixture: way:int is interior (no seam), the arterial is the seam (west, east)', { timeout: 120_000 }, () => {
    expect(seamOfSpine(f.seams, 'way:int')).toBeUndefined();
    expect(seamOfSpine(f.seams, 'way:art')?.sides).toEqual([west, east].sort());
  });

  it('the continuation’s bounding reads every chain through the junction: an end typed as way:int’s at J crosses the district’s boundary; at way:int’s other end it does not', { timeout: 120_000 }, () => {
    const j = vertexAt(f.plat, GROUND, J);
    const w0 = vertexAt(f.plat, GROUND, P(0, H / 2));
    expect(j).not.toBeNull();
    expect(w0).not.toBeNull();
    if (j === null || w0 === null) return;
    expect(waysAt(f.plat, j)).toEqual(['way:art', 'way:int']);
    // The old reading (the end's spine only): interior.
    expect(seamOfSpine(f.seams, 'way:int')).toBeUndefined();
    expect(continuationBounds(f.plat, f.seams, west, 'way:int', j)).toBe(true);
    expect(continuationBounds(f.plat, f.seams, west, 'way:int', w0)).toBe(false);
    // The end's own spine in a seam still bounds (C-0298's reading kept).
    expect(continuationBounds(f.plat, f.seams, west, 'way:art', w0)).toBe(true);
    // A district that is no side of the arterial's seam: J bounds it not.
    expect(continuationBounds(f.plat, f.seams, 'district:other', 'way:int', j)).toBe(false);
  });

  it('an interior way ending at J reads a portal 3 m up the arterial at J, and turns bounding for the gap; none without it', { timeout: 120_000 }, () => {
    const g = junction(300);
    const run = chainRuns(g.f.plat, GROUND, { role: 'way', entity: 'way:int' })[0];
    const sp = spinePortals(g.f.plat, GROUND, g.f.seams, 'way:int', run, [], REACH);
    expect(sp.bounding).toBe(true);
    expect(sp.portals).toEqual([{ at: J, laneWidthCm: 340 }]);
    const none = spinePortals(f.plat, GROUND, f.seams, 'way:int', chainRuns(f.plat, GROUND, { role: 'way', entity: 'way:int' })[0], [], REACH);
    expect(none).toEqual({ portals: [], bounding: false });
  });

  it('a lane end at J typed as way:int’s is the arterial’s portal, in the seam of the district (the planned spine first, then the rest by id)', { timeout: 120_000 }, () => {
    const j = vertexAt(f.plat, GROUND, J);
    expect(j).not.toBeNull();
    if (j === null) return;
    expect(portalWaysAt(f.plat, j, 'way:lane', 'way:int')).toEqual(['way:int', 'way:art']);
    expect(portalWaysAt(f.plat, j, 'way:lane', null)).toEqual(['way:art', 'way:int']);
    const rec = portalSeamAt(f.plat, f.seams, west, 'way:lane', 'way:int', j);
    expect(rec?.way).toBe('way:art');
    expect(rec?.seam.sides).toContain(west);
    // A district that is no side of the arterial's seam has no portal there.
    expect(portalSeamAt(f.plat, f.seams, 'district:other', 'way:lane', 'way:int', j)).toBeNull();
  });

  it('S8 on it commits and its row holds', { timeout: 300_000 }, () => {
    const r = runS8(f.input, { report: undefined } as never);
    if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
    expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
    expect(r.value.lanes.length).toBeGreaterThan(5);
  });
});

// ---- the S4 round's survivors pinned (checks/M0-b-03-notes.md N-23; queue row L25; C-0426) --------------------------------

describe('the gap readings sized by both lanes, and the insertion read reached (N-23 (c), (d); queue row L25)', () => {
  it('the insertion read: a new lane wider than the portal it meets widens the gap (K13) — 6.4 m from a 3 m portal is a breach for a 3.4 m lane', { timeout: 120_000 }, () => {
    const { f, seams } = bend(640);
    const narrow = seams.map((s) => ({ ...s, portals: s.portals.map((p) => (p.id === 'portal:g0' ? { ...p, widthCm: 300 as never } : p)) }));
    const seam = narrow.find((s) => s.edges.some((e) => e.chain.entity === 'way:a')) as Seam;
    const v = vertexAt(f.plat, GROUND, V);
    expect(v).not.toBeNull();
    if (v === null) return;
    // The gap: max(6 m, 2 × max(300, 340)) = 6.8 m, less the row's 2 cm — 6.4 m lies inside it, not inside 2 × 300's.
    expect(portalGap(CELLS, 300, 340)).toBe(680);
    expect(portalGapBreach(f.plat, GROUND, narrow, seam.id, v, 340, CELLS)).toBe('gap');
    expect(portalGapBreach(f.plat, GROUND, narrow, seam.id, v, 290, CELLS)).toBeNull();
  });

  it('the antenna’s tip: a gap is max(6 m, 2 × max(the portal’s width, the lane band’s top)) (K16) — 8 m from a 2 m portal is in it', { timeout: 120_000 }, () => {
    const line = [P(0, 0), P(0, 10_000)];
    const face = (at: number): KerbFace => ({ rings: [], spines: [{ points: line, halfWidthCm: 300, bounding: true, portals: [{ at: P(0, at), laneWidthCm: 200 }] }] });
    expect(NEW_LANE).toBe(500);
    // 2 × 200 = 4 m < 8 m < 2 × 500 = 10 m.
    expect(tipInPortalGap(face(9_200), P(0, 10_000), CELLS, NEW_LANE)).toBe(true);
    expect(tipInPortalGap(face(8_900), P(0, 10_000), CELLS, NEW_LANE)).toBe(false);
  });

  it('with the planner’s and the ladder’s portal readings switched off (a test seam), only the insertion read keeps the gap: the tip’s lane is taken out again, S8 commits and its row holds (K12, K22)', { timeout: 300_000 }, () => {
    const { f, seams } = antenna(true);
    const r = runS8({ ...f.input, seams, faults: { portalsUnread: true } }, { report: undefined } as never);
    if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
    expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
    const rungs = r.value.infill.report.districts.flatMap((d) => d.rungs);
    expect(rungs.some((x) => x.rung === 'antenna' && x.outcome === 'refused' && x.why === 'portal-gap')).toBe(true);
    for (const lane of r.value.lanes) {
      for (const run of chainRuns(f.plat, GROUND, lane.spine)) {
        for (const q of [run[0], run[run.length - 1]]) expect(q.x === TIP.x && q.y === TIP.y).toBe(false);
      }
    }
  });
});

describe('a lane end on a vertex two seam chains of the district share goes under the planned spine’s seam (N-23 (b), K21)', () => {
  /**
   * The bend with one seam per chain (way:a south of V, way:b north of it) and an antenna in the west district along
   * y = 150.1 m: the antenna split's far end hits way:b 10 cm north of V — the planned spine way:b, not way:a (the lower
   * id) — and the insertion lands it on V, the vertex both chains share.
   */
  function antennaToV(): { f: Fixture; seams: Seam[] } {
    const ways: FixtureWay[] = [
      { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
      { id: 'way:a', cls: 'primary', widthCm: 1000, points: [P(11_000, 0), V] },
      { id: 'way:b', cls: 'primary', widthCm: 1000, points: [V, P(20_000, H)] },
      { id: 'way:ant', cls: 'lane', widthCm: 400, points: [P(0, 15_010), P(5_000, 15_010)] },
    ];
    const districts: FixtureDistrict[] = [
      { seeds: [P(5_000, 5_000)], prosperity: 0.3, density: 0.5 },
      { seeds: [P(35_000, H / 2)], prosperity: 0.3, density: 0.5 },
    ];
    const f = fixture(60_000, ways, districts);
    return { f, seams: f.seams.map((s) => ({ ...s, portals: s.portals.slice() })) };
  }

  it('the antenna’s lane ends on V and its portal is in way:b’s seam (the planned spine first), not way:a’s; the row holds', { timeout: 300_000 }, () => {
    const { f, seams } = antennaToV();
    expect(seams.map((s) => s.edges.map((e) => e.chain.entity).join()).sort()).toEqual(['way:a', 'way:b']);
    const r = runS8({ ...f.input, seams }, { report: undefined } as never);
    if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
    expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
    const atV = r.value.infill.seams.flatMap((s) => s.portals.filter((p) => p.from === 'baseLane').map((p) => ({ s, p }))).filter(({ p }) => {
      const q = vertexPoints(f.plat, GROUND, p.at)[0];
      return q !== undefined && q.x === V.x && q.y === V.y;
    });
    expect(atV).toHaveLength(1);
    expect(atV[0].s.edges.map((e) => e.chain.entity)).toEqual(['way:b']);
    const ant = r.value.infill.report.districts.flatMap((d) => d.rungs.filter((x) => x.rung === 'antenna'));
    expect(ant[0]).toMatchObject({ outcome: 'cut' });
  });
});
