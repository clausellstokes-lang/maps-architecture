// M0-c-06's measures on plain geometry: roads leaving a walled stage (passages through its wall line), lanes inside a
// wall strip, a face inside a wall line, the work law inverted (C-0091), the junction row's pooling inputs.
import { loadWorkLimits } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { junctionRow, lanesInStrips, ringPassages, segmentEnters, sideOfRing, unitsOf } from '../../src/fusion/index.js';
import { faceInside } from '../../src/fusion/runs.js';

const wall = [
  { x: 0, y: 0 },
  { x: 10_000, y: 0 },
  { x: 10_000, y: 10_000 },
  { x: 0, y: 10_000 },
];

describe('roads leaving a walled stage (passages through its wall line)', () => {
  it('a way through a gate vertex on the wall is one road leaving; so are two ways meeting there', () => {
    expect(ringPassages([[{ x: 5_000, y: 5_000 }, { x: 10_000, y: 5_000 }, { x: 15_000, y: 5_000 }]], wall)).toBe(1);
    expect(ringPassages([[{ x: 5_000, y: 5_000 }, { x: 10_000, y: 5_000 }], [{ x: 10_000, y: 5_000 }, { x: 15_000, y: 5_000 }]], wall)).toBe(1);
    // a segment straight across the line, no vertex on it
    expect(ringPassages([[{ x: 5_000, y: 5_000 }, { x: 15_000, y: 5_100 }]], wall)).toBe(1);
    // a way out through one gate and back through another: two
    expect(ringPassages([[{ x: 5_000, y: 5_000 }, { x: 10_000, y: 5_000 }, { x: 15_000, y: 5_000 }, { x: 15_000, y: 8_000 }, { x: 10_000, y: 8_000 }, { x: 5_000, y: 8_000 }]], wall)).toBe(2);
    // a way that only touches the wall (a T onto it from inside) and one wholly outside: none
    expect(ringPassages([[{ x: 5_000, y: 5_000 }, { x: 10_000, y: 5_000 }], [{ x: 12_000, y: 0 }, { x: 15_000, y: 3_000 }]], wall)).toBe(0);
    // a way along the wall for a stretch, then out: one passage (the on-ring run touches both sides)
    expect(ringPassages([[{ x: 5_000, y: 5_000 }, { x: 10_000, y: 5_000 }, { x: 10_000, y: 6_000 }, { x: 15_000, y: 6_000 }]], wall)).toBe(1);
    // three ways at one gate vertex: still one road leaving there
    expect(ringPassages([[{ x: 5_000, y: 5_000 }, { x: 10_000, y: 5_000 }], [{ x: 10_000, y: 5_000 }, { x: 15_000, y: 5_000 }], [{ x: 10_000, y: 5_000 }, { x: 15_000, y: 9_000 }]], wall)).toBe(1);
    // within 1 cm of the line is on it
    expect(sideOfRing({ x: 10_001, y: 5_000 }, wall)).toBe('on');
    expect(sideOfRing({ x: 10_002, y: 5_000 }, wall)).toBe('out');
    expect(sideOfRing({ x: 9_998, y: 5_000 }, wall)).toBe('in');
  });

  it('a face lies inside a wall line when no vertex is outside and one is inside', () => {
    expect(faceInside([{ x: 0, y: 0 }, { x: 5_000, y: 0 }, { x: 5_000, y: 5_000 }], wall)).toBe(true);
    expect(faceInside([{ x: 0, y: 0 }, { x: 10_000, y: 0 }, { x: 10_000, y: 10_000 }], wall)).toBe(false);
    expect(faceInside([{ x: 5_000, y: 5_000 }, { x: 12_000, y: 5_000 }, { x: 5_000, y: 6_000 }], wall)).toBe(false);
  });
});

describe('lanes crossing a wall strip', () => {
  const strip = [
    { x: 0, y: 0 },
    { x: 10_000, y: 0 },
    { x: 10_000, y: 1_000 },
    { x: 0, y: 1_000 },
  ];
  it('a lane through the strip crosses it; along its edge, ending on it or outside it does not', () => {
    expect(segmentEnters({ x: 5_000, y: -500 }, { x: 5_000, y: 1_500 }, strip)).toBe(true);
    expect(segmentEnters({ x: 5_000, y: 500 }, { x: 5_000, y: 2_000 }, strip)).toBe(true);
    expect(segmentEnters({ x: 0, y: 1_000 }, { x: 10_000, y: 1_000 }, strip)).toBe(false);
    expect(segmentEnters({ x: 5_000, y: 3_000 }, { x: 5_000, y: 1_000 }, strip)).toBe(false);
    expect(segmentEnters({ x: 5_000, y: 3_000 }, { x: 5_000, y: 1_002 }, strip)).toBe(false);
    expect(lanesInStrips([[{ x: 5_000, y: 3_000 }, { x: 5_000, y: 1_000 }], [{ x: -100, y: 500 }, { x: 20_000, y: 500 }], [{ x: 20_000, y: 0 }, { x: 30_000, y: 0 }]], [strip])).toBe(1);
    expect(lanesInStrips([], [strip])).toBe(0);
  });
});

describe('the work law inverted (C-0091)', () => {
  it('the unit count a limit was read at: (limit − floor) ÷ perUnit, at least 1', () => {
    const wl = loadWorkLimits();
    for (const c of ['cut.kernelCalls', 'cut.candidates', 'growth.proposals']) {
      const law = wl.law(c);
      expect(unitsOf(c, law.floor + law.perUnit * 37)).toBeCloseTo(37, 9);
      expect(unitsOf(c, law.floor)).toBe(1);
    }
  });
});

describe('the junction row on a doc', () => {
  it('nodes of degree ≥ 3, their arm gaps and the 4-way count', () => {
    const doc = {
      ways: [
        { id: 'a', class: 'secondary' as const, line: [{ x: -1_000, y: 0 }, { x: 0, y: 0 }, { x: 1_000, y: 0 }] },
        { id: 'b', class: 'lane' as const, line: [{ x: 0, y: 0 }, { x: 0, y: 1_000 }] },
        { id: 'c', class: 'lane' as const, line: [{ x: 0, y: 0 }, { x: 0, y: -1_000 }] },
        // a T with no shared vertex is no node (the street graph merges by exact position)
        { id: 'd', class: 'lane' as const, line: [{ x: 5_000, y: 0 }, { x: 5_000, y: 1_000 }] },
        { id: 'e', class: 'secondary' as const, line: [{ x: 4_000, y: 0 }, { x: 6_000, y: 0 }] },
      ],
    };
    const j = junctionRow(doc);
    expect(j.nodes).toBe(1);
    expect(j.nodes4).toBe(1);
    expect(j.gaps.map((g) => Math.round(g))).toEqual([90, 90, 90, 90]);
    expect(j.share4).toBe(1);
  });
});
