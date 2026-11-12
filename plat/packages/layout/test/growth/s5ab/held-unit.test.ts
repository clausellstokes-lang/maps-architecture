// The held enclosure on hand states (M0-c-04 hardening round S6; C-0475 (2) and the round's row; checks/M0-c-04-notes.md
// N-49): the enclosure of stage k − 1 a stage's boundary holds with the wall standing before it takes the previous
// selection and every REACHABLE dry interior node inside that wall's line or within its clearance — a node T cannot
// reach (T infinite: cut off by water or a reservation) is never held, so it never enters the union at T = 0 and the
// boundary's land is never a node no route reaches. On the small flat site (400 ha, 30 ha walled), S3 and S4 as
// support.ts runs them, S5's growth start, then stage 1's standing wall replaced by a hand ring 3 % beyond stage 2's
// plain outline (so that boundary crosses it and the repair runs) and one dry interior node between the two, outside
// stage 1's selection, cut off from T.
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import { flatFixture, growthStart, mainRoadsStep, mainRoadStream, stageBoundary, wallClearance } from '../../../src/index.js';
import { insideOf } from './sitefix.js';
import { baseRun } from './support.js';

describe('the held enclosure keeps a node T cannot reach out of the held set (N-49; C-0475 (2))', () => {
  it('a dry interior node inside the standing wall, cut off from T, stays out of stage 2\'s selection while the nodes beside it are held', { timeout: 300_000 }, () => {
    const b = baseRun(flatFixture(1, { frameAreaHa: 400, walledHa: 30 }));
    const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
    const lattice = state.field.lattice;
    const land = b.slice.site.land;
    const plain = stageBoundary(state.field, 2, land, { enclosure: state.enclosure });
    const c = b.slice.site.centre;
    // The hand wall: stage 2's plain outline 3 % farther from the centre — its first point (and most) outside that
    // boundary, so the boundary crosses it (the repair's trigger, the trace's `core` test).
    const ring = plain.set.outline.map((p) => ({ x: Math.round(c.x + (p.x - c.x) * 1.03), y: Math.round(c.y + (p.y - c.y) * 1.03) }) as LatticePoint);
    state.stages[0].wall = ring;
    expect(insideOf(plain.set.outline, ring[0])).toBe(false);
    // The nodes the held set may take: dry, interior, outside stage 1's selection and stage 2's plain selection, inside
    // the hand wall (and so not clear of it).
    const clearOf = wallClearance(state);
    const candidates: number[] = [];
    for (let u = 0; u < lattice.points.length; u += 1) {
      if (state.enclosure[u] === 1 || plain.set.selected[u] === 1 || lattice.interior[u] !== 1 || lattice.water[u] !== 0) continue;
      if (!(state.field.T[u] < Infinity) || clearOf(lattice.points[u]) || !insideOf(ring, lattice.points[u])) continue;
      candidates.push(u);
    }
    expect(candidates.length).toBeGreaterThan(10);
    // One of them cut off from T (as water or a reservation would cut it off).
    const cut = candidates[Math.floor(candidates.length / 2)];
    const T = Float64Array.from(state.field.T);
    T[cut] = Infinity;
    state.field = { ...state.field, T };
    const m = mainRoadsStep(state, 2, mainRoadStream(b.slice));
    expect(m.ok ? 'ok' : `${m.code} ${m.detail}`).toBe('ok');
    if (!m.ok) return;
    const sel = m.value.boundary?.set.selected;
    expect(sel).toBeDefined();
    if (sel === undefined) return;
    // The repair ran: the reachable nodes inside the hand wall are held, in stage 2's selection.
    expect(candidates.filter((u) => u !== cut && sel[u] !== 1)).toEqual([]);
    // The node T cannot reach is not: held at T = 0 it would have entered the union and the selection.
    expect(sel[cut]).toBe(0);
  });
});
