// M0-a-13: the whole-step validation's predicates on a step's view (validate.ts): the exact distance and triangle tests,
// one vertex per lattice point and minEdge on a mover, the rotation at a vertex, and §3.10's placement bound — a slid or
// re-seated vertex more than the hot pixel off its route as the step leaves it fails the step.
import { describe, expect, it } from 'vitest';
import { insertChain } from '../../src/insert/index.js';
import { routeOf } from '../../src/warp/held.js';
import { closerThan, inTriangle, placementBoundProblem, rotationKept, stepProblem, vertexProblem } from '../../src/warp/validate.js';
import { StepView } from '../../src/warp/view.js';
import { commit, framed, must, pt, vertexAtPoint } from './support.js';

const G = { layer: 'ground' as const, part: 0 };

describe('the exact predicates', () => {
  it('closerThan and inTriangle on lattice points', () => {
    expect(closerThan(0, 25, -100, 0, 100, 0, 25)).toBe(false);
    expect(closerThan(0, 24, -100, 0, 100, 0, 25)).toBe(true);
    expect(closerThan(117, 17, -100, 0, 100, 0, 25)).toBe(true); // beyond the end: 17² + 17² = 578 < 625 from (100, 0)
    expect(closerThan(118, 18, -100, 0, 100, 0, 25)).toBe(false); // 18² + 18² = 648
    expect(inTriangle(1, 1, 0, 0, 10, 0, 0, 10)).toBe(true);
    expect(inTriangle(5, 5, 0, 0, 10, 0, 0, 10)).toBe(true); // on the hypotenuse: closed
    expect(inTriangle(6, 6, 0, 0, 10, 0, 0, 10)).toBe(false);
    expect(inTriangle(1, 0, 0, 0, 5, 0, 10, 0)).toBe(false); // a degenerate triangle holds nothing
  });
});

describe('the view\'s checks', () => {
  function kerb() {
    const p = framed();
    commit(p, 2, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'block:1' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(1500, 1000), pt(1500, 600)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    return p;
  }

  it('a mover on another vertex\'s point, or too near its neighbour, fails; at a clear point it passes', () => {
    const p = kerb();
    const s = vertexAtPoint(p, 1500, 1000);
    const view = new StepView(p, G);
    view.set(s, 1000, 1000);
    expect(vertexProblem(view, s)).toMatch(/^two vertices/);
    view.set(s, 1980, 1000);
    expect(vertexProblem(view, s)).toMatch(/^minEdge/);
    view.set(s, 1600, 1000);
    expect(vertexProblem(view, s)).toBeNull();
    expect(stepProblem(view, [s], new Set())).toBeNull();
    expect(stepProblem(view, [s], new Set([s]))).toMatch(/^held/);
  });

  it('the placement bound: a re-seat 1 cm off its route fails, 0.7 cm passes', () => {
    const p = kerb();
    const s = vertexAtPoint(p, 1500, 1000);
    const route = routeOf(p, s);
    expect(route).not.toBeNull();
    const view = new StepView(p, G);
    view.set(s, 1500, 1001);
    expect(placementBoundProblem(view, [{ v: s, route: route as NonNullable<typeof route> }])).toMatch(/^placement bound/);
    // The route's far end lifted by 1.4 cm: (1 500, 1 001) is now 0.3 cm off the line (1 000, 1 000)–(2 000, 1 001.4…).
    view.set(vertexAtPoint(p, 2000, 1000), 2000, 1001);
    expect(placementBoundProblem(view, [{ v: s, route: route as NonNullable<typeof route> }])).toBeNull();
  });

  it('the rotation: a degree-3 vertex whose edge swings past another keeps no order', () => {
    const p = framed();
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 1000), pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2000, 2000), pt(2500, 2000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const j = vertexAtPoint(p, 2000, 2000);
    const e = vertexAtPoint(p, 2500, 2000);
    const view = new StepView(p, G);
    view.set(e, 2400, 2300);
    expect(rotationKept(view, j)).toBe(true);
    view.set(e, 1500, 2100);
    expect(rotationKept(view, j)).toBe(false);
  });
});
