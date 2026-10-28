// The guards of S5b's roads and of the strips' water proof on hand fixtures (C-0244 (6); C-0449 (3), (16); notes N-3,
// N-16): each fault `roadFault` names, on a polyline built here to have it and only it; the fallback order of
// `smoothestLawful` (the smoothed course, the simplified one, the lattice courses, else `invalid`); and `wetPointOn`, the
// strips' proof that no setback edge crosses the water between two dry ends. On geometry alone (no arena).
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import { wetPointOn } from '../../../src/growth/boundary.js';
import { roadFault, smoothestLawful, type Seg } from '../../../src/growth/mainRoads.js';
import { barRowText, writeBarRows } from './bar.js';
import { P } from './support.js';

/** The junction, a destination 100 m east, the frame 200 m east: a straight road along y = 0. */
const J = P(0, 0);
const D = P(10_000, 0);
const ROAD: LatticePoint[] = [J, P(5_000, 0), D, P(20_000, 0)];
/** A stage outline crossed by y = 0 once, at the destination (a square about the junction, its east side x = 10 000). */
const OUTLINE: LatticePoint[] = [P(-10_000, -10_000), P(10_000, -10_000), D, P(10_000, 10_000), P(-10_000, 10_000)];
/** The standing way the junction lies on: north – south through it. */
const WAY: Seg[] = [
  [P(0, -8_000), J],
  [J, P(0, 8_000)],
];

describe('roadFault: each rule a road keeps, one fixture per fault (C-0244 (6))', () => {
  it('a road keeping every rule has no fault', () => {
    expect(roadFault(ROAD, J, D, [], WAY, OUTLINE)).toBeNull();
    expect(roadFault(ROAD, J, D, [], WAY, null)).toBeNull();
  });

  it("'start': the polyline does not begin at its junction", () => {
    expect(roadFault([P(1, 0), ...ROAD.slice(1)], J, D, [], WAY, OUTLINE)).toBe('start');
    expect(roadFault([J], J, D, [], WAY, OUTLINE)).toBe('start');
  });

  it("'self': the polyline crosses itself, or folds back onto its own segment", () => {
    const loop = [J, P(6_000, 0), P(6_000, 3_000), P(3_000, 3_000), P(3_000, -3_000), D, P(20_000, 0)];
    expect(roadFault(loop, J, D, [], WAY, null)).toBe('self');
    const fold = [J, P(6_000, 0), P(3_000, 0), D, P(20_000, 0)];
    expect(roadFault(fold, J, D, [], WAY, null)).toBe('self');
  });

  it("'obstacle': the polyline meets a wall, the plaza or the water anywhere (the walls among the obstacles)", () => {
    const wall: Seg[] = [[P(15_000, -1_000), P(15_000, 1_000)]];
    expect(roadFault(ROAD, J, D, wall, WAY, OUTLINE)).toBe('obstacle');
    // An obstacle beside the road, not on it: no fault.
    expect(roadFault(ROAD, J, D, [[P(15_000, 500), P(15_000, 1_000)]], WAY, OUTLINE)).toBeNull();
  });

  it("'way': the polyline meets a standing way off its junction, or runs along its way from the junction", () => {
    const across: Seg[] = [...WAY, [P(7_000, -1_000), P(7_000, 1_000)]];
    expect(roadFault(ROAD, J, D, [], across, OUTLINE)).toBe('way');
    // Its first segment along its own way from the junction (overlapping it) is no T junction.
    const along: Seg[] = [[P(-5_000, 0), J], [J, P(3_000, 0)]];
    expect(roadFault(ROAD, J, D, [], along, OUTLINE)).toBe('way');
    // A later segment touching the junction's way at a vertex of it is a meeting too.
    const back = [J, P(4_000, 4_000), P(0, 6_000), P(4_000, 7_000), D, P(20_000, 0)];
    expect(roadFault(back, J, D, [], WAY, null)).toBe('way');
  });

  // Within the attraction distance (26 cm) is a meeting (§3.6 step 2; C-0449 (3)): the insertion would lay the one onto
  // the other, a meeting no junction records — as CITY seed 79's way:21 lay along way:15 from its junction for 1.9 m.
  it("'way': a vertex of the road within the attraction distance of a way, or a way's vertex within it of the road", () => {
    // The road's second vertex 20 cm off its own way, 3 m from the junction: laid along the way, its branching unrecorded.
    const along = [J, P(20, 300), D, P(20_000, 0)];
    expect(roadFault(along, J, D, [], WAY, null)).toBe('way');
    // A way's vertex 25 cm beside the road's middle: the road would be routed through it.
    expect(roadFault(ROAD, J, D, [], [...WAY, [P(7_000, 25), P(7_000, 3_000)]], OUTLINE)).toBe('way');
    // 30 cm off, the road keeps clear.
    expect(roadFault(ROAD, J, D, [], [...WAY, [P(7_000, 30), P(7_000, 3_000)]], OUTLINE)).toBeNull();
    expect(roadFault([J, P(40, 300), D, P(20_000, 0)], J, D, [], WAY, null)).toBeNull();
  });

  it("'outline': a walled stage's road crosses its outline exactly once, at its destination", () => {
    // Crossing the outline twice (out through the north side and back): refused, though it ends at the frame.
    const twice = [J, P(2_000, 12_000), P(6_000, 0), D, P(20_000, 0)];
    expect(roadFault(twice, J, D, [], [], OUTLINE)).toBe('outline');
    // Crossing it once but elsewhere than the destination.
    expect(roadFault([J, P(5_000, 0), P(10_000, 5_000), P(20_000, 5_000)], J, D, [], [], OUTLINE)).toBe('outline');
    // No outline test for an unwalled stage.
    expect(roadFault([J, P(5_000, 0), P(10_000, 5_000), P(20_000, 5_000)], J, D, [], [], null)).toBeNull();
  });
});

describe("smoothestLawful: a course's smoothest level that keeps the rules, else invalid (C-0244)", () => {
  const wall: Seg[] = [[P(7_500, 100), P(7_500, 2_000)]];
  // A smoothed course bowing north into the wall, a simplified one bowing less, the lattice course straight.
  const smoothed = [J, P(5_000, 1_000), D, P(20_000, 0)];
  const simplified = [J, P(5_000, 80), D, P(20_000, 0)];
  const lattice = ROAD;

  it('takes the smoothed course when it keeps the rules (level 0)', () => {
    const r = smoothestLawful([lattice, smoothed, simplified, lattice], J, D, wall, WAY, OUTLINE);
    expect(r.level).toBe(0);
    expect(r.points).toBe(lattice);
    expect(r.faults).toEqual([]);
  });

  it('falls back to the simplified course (level 1), then to a lattice course (level 2)', () => {
    const one = smoothestLawful([smoothed, lattice, lattice, lattice], J, D, wall, WAY, OUTLINE);
    expect([one.level, one.points, one.faults]).toEqual([1, lattice, ['obstacle']]);
    const two = smoothestLawful([smoothed, smoothed, simplified, lattice], J, D, wall, WAY, OUTLINE);
    expect(two.level).toBe(2);
    expect(two.points).toBe(simplified);
    expect(two.faults).toEqual(['obstacle', 'obstacle']);
    const last = smoothestLawful([smoothed, smoothed, smoothed, lattice], J, D, wall, WAY, OUTLINE);
    expect(last.level).toBe(2);
    expect(last.points).toBe(lattice);
  });

  it('none keeping the rules: no course, every level\'s fault (the destination reported invalid)', () => {
    const block: Seg[] = [[P(8_000, -3_000), P(8_000, 3_000)]];
    const r = smoothestLawful([smoothed, simplified, lattice, lattice], J, D, block, WAY, OUTLINE);
    expect(r.points).toBeNull();
    expect(r.faults).toEqual(['obstacle', 'obstacle', 'obstacle', 'obstacle']);
  });
});

describe('wetPointOn: a setback edge crossing the water between two dry ends (C-0449 (16))', () => {
  const pond = { body: 'pond:1', ring: [P(0, 0), P(1_000, 0), P(1_000, 1_000), P(0, 1_000)] };

  it('finds the edge across a water corner whose two ends are dry', () => {
    const a = P(-100, 800);
    const b = P(200, 1_100);
    const q = wetPointOn(a, b, pond, 2);
    expect(q).not.toBeNull();
    if (q === null) return;
    // On the edge, inside the pond, deeper than 2 cm.
    expect(Math.abs((q.x - a.x) * (b.y - a.y) - (q.y - a.y) * (b.x - a.x))).toBeLessThan(1e-6 * 300 * 300);
    expect(q.x > 2 && q.x < 998 && q.y > 2 && q.y < 998).toBe(true);
  });

  it('an edge grazing the corner, or lying within the 2 cm a bank allows, is dry', () => {
    expect(wetPointOn(P(-100, 900), P(100, 1_100), pond, 2)).toBeNull();
    expect(wetPointOn(P(-100, 999), P(1_100, 999), pond, 2)).toBeNull();
    expect(wetPointOn(P(-100, 997), P(1_100, 997), pond, 2)).not.toBeNull();
  });

  it('an end in the water is found; the water\'s holes are dry land', () => {
    expect(wetPointOn(P(500, 500), P(500, 1_500), pond, 2)).toEqual(P(500, 500));
    const isle = { ...pond, holes: [[P(-10, 700), P(400, 700), P(400, 1_010), P(-10, 1_010)]] };
    expect(wetPointOn(P(-100, 800), P(200, 1_100), isle, 2)).toBeNull();
  });
});

describe("the bar's §13.2 rows, kept (N-8; C-0449 (8))", () => {
  it('writes one JSON line per seed to the file PLAT_S5B_ROWS names, nothing when none is named', () => {
    const dir = mkdtempSync(join(tmpdir(), 's5b-rows-'));
    const path = join(dir, 'rows.jsonl');
    const rows = [
      { seed: 1, primaryKmPerKm2: 4.25, gateShare: 1, gates: 15 },
      { seed: 2, primaryKmPerKm2: 4.5, gateShare: 1, gates: 15 },
    ];
    writeBarRows(path, rows);
    expect(readFileSync(path, 'utf8').split('\n').filter((l) => l !== '').map((l) => JSON.parse(l) as unknown)).toEqual(rows);
    expect(barRowText(rows[0])).toBe('1: 4.250 km/km², gates on primaries 1 of 15');
    writeBarRows(undefined, rows);
    writeBarRows('', rows);
    expect(existsSync(join(dir, 'undefined'))).toBe(false);
    rmSync(dir, { recursive: true, force: true });
  });
});
