// M0-c-02 hardening round S6: the arena's ways as the strips read them (§4.8 "the strips stop at each gate's corridor"
// and RQ5's every way the strips meet; C-0454).
// * Q131 (N-52): an arena way with no gate whose run ENDS inside a strip's band was read as a stop `at: run[0]`, and
//   `whyNot`'s gate-vertex clause took that end vertex for a gate's — the face beside the corridor holding it was barred
//   and the side refused E_INVARIANT "… vertex (-20750, -1000) is way:short's gate vertex …" (a lawful input). The
//   registered hand record is `fixtures/n52-gateless-way.json`; each case now commits, the strips beside the corridor
//   typed and the corridor's own face not.
// * Q132 (N-56): an arena way read as a stop took the widest given way stop's half-width; with the Way records given
//   (`LayStripsOptions.ways`) each stretch of the way takes its own width from its `width_knot` profile (§2.4), so the
//   strip beside a narrow stretch stops at that stretch's corridor, not the widest.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import type { Enceinte, Way } from '@plat/model';
import type { Row } from '@plat/tables';
import { commitOuterRing, layStrips } from '../../src/index.js';
import { localStretches } from '../../src/enceinte/strips.js';
import { GROUND, kernelFor, P, smallSite } from './support.js';

const L1_S5: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S5 as StageId }, stage: STAGES.S5 as StageId, rederivesFrom: STAGES.S5 as StageId, workLimit: 10_000_000 };
const L1_S4: KernelTx = { ...L1_S5, batch: { kind: 'stage', stage: STAGES.S4 as StageId }, stage: STAGES.S4 as StageId, rederivesFrom: STAGES.S4 as StageId, workLimit: 1_000_000 };

/** A hand-laid enceinte: its trace a closed L1 wall chain through `ring`, no gate on it. */
function handTrace(ring: readonly LatticePoint[]): { k: Kernel; enceinte: Enceinte; row: Row } {
  const site = smallSite(2);
  const { k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const laid = k.tx(L1_S5, (o) => k.geom.insertChain(o, ring, [{ role: 'wall', entity: 'enceinte:1' }], 'mandatory', { closed: true }));
  expect(laid.ok).toBe(true);
  const enceinte = { id: 'enceinte:1', trace: { role: 'wall', entity: 'enceinte:1' }, gates: [], stage: 1 } as unknown as Enceinte;
  return { k, enceinte, row: site.tables.table('walls').row('era.default') };
}

/** The owner of the L1 face at q ('' when none, 'edge' when q lies on an edge or vertex). */
function ownerAt(k: Kernel, q: LatticePoint): string {
  const loc = k.geom.pointLocate(GROUND, 1, q);
  return loc.on === 'face' ? (k.view(GROUND, 1).owner(loc.face) ?? '') : 'edge';
}

interface N52 {
  trace: [number, number][];
  wayHalfWidthCm: number;
  cases: { name: string; side: 'inner' | 'outer'; way: string; points: [number, number][]; inCorridor: [number, number]; beside: [number, number] }[];
}
const N52_FIXTURE = JSON.parse(readFileSync(new URL('./fixtures/n52-gateless-way.json', import.meta.url), 'utf8')) as N52;

describe('an arena way with no gate whose run ends inside a strip\'s band (Q131; N-52; the registered hand record)', () => {
  for (const c of N52_FIXTURE.cases) {
    it(`${c.name} on the ${c.side} side: the strips commit — its end vertex is no gate's — the strips beside its corridor typed, the corridor's own face not`, () => {
      const { k, enceinte, row } = handTrace(N52_FIXTURE.trace.map(([x, y]) => P(x, y)));
      expect(k.tx(L1_S4, (o) => k.geom.insertChain(o, c.points.map(([x, y]) => P(x, y)), [{ role: 'way', entity: c.way }], 'mandatory', {})).ok).toBe(true);
      const r = layStrips(enceinte, row, k, { stops: [], wayHalfWidthCm: N52_FIXTURE.wayHalfWidthCm });
      // Before the round: E_INVARIANT "layStrips: a side's lines closed no strip face — the <side> side: vertex (…) is
      // way:short's gate vertex (the face crosses its corridor)".
      expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
      if (!r.ok) return;
      expect(r.value.faces.inner).toBeGreaterThan(0);
      expect(r.value.faces.outer).toBeGreaterThan(0);
      expect(ownerAt(k, P(...c.inCorridor))).not.toMatch(/^wall_strip/);
      expect(ownerAt(k, P(...c.beside))).toBe(`wall_strip:1-${c.side}`);
      // The other side untouched by the way: its strip beside the corridor's stretch typed.
      const other = c.side === 'outer' ? P(-19600, 0) : P(-20500, 0);
      expect(ownerAt(k, other)).toBe(`wall_strip:1-${c.side === 'outer' ? 'inner' : 'outer'}`);
    }, 60_000);
  }
});

describe('an arena way\'s corridor at its local width (Q132; N-56)', () => {
  // A way 9 m outside the west side, 300 m long, its south half a lane 6 m wide and its north half a street 14 m wide: two
  // `width_knot`s on its middle vertex (S4's class runs; §2.4's profile, values 600 then 1 400 cm).
  const WAY = 'way:graded';
  const POINTS = [P(-20900, -15000), P(-20900, 0), P(-20900, 15000)];
  const RECORD = { id: WAY, width: { knotRole: 'width_knot', values: [600, 1400], interp: 'linear' } } as unknown as Pick<Way, 'id' | 'width'>;
  const laidWay = (): { k: Kernel; enceinte: Enceinte; row: Row } => {
    const t = handTrace([P(-20000, -20000), P(20000, -20000), P(20000, 20000), P(-20000, 20000)]);
    const knots = [{ index: 1, role: 'width_knot', ordinal: 0, entity: WAY }, { index: 1, role: 'width_knot', ordinal: 1, entity: WAY }];
    const ins = t.k.tx(L1_S4, (o) => t.k.geom.insertChain(o, POINTS, [{ role: 'way', entity: WAY }], 'mandatory', { knots }));
    expect(ins.ok ? 'ok' : `${ins.code} ${ins.detail}`).toBe('ok');
    return t;
  };

  it('the profile read along the run: the lane\'s stretch at 300 cm, the street\'s at 700 cm', () => {
    const { k } = laidWay();
    expect(localStretches(k, GROUND, RECORD, POINTS)).toEqual([
      { path: [POINTS[0], POINTS[1]], halfWidthCm: 300 },
      { path: [POINTS[1], POINTS[2]], halfWidthCm: 700 },
    ]);
    // A scalar width is one stretch at its half.
    expect(localStretches(k, GROUND, { id: WAY, width: 1000 } as unknown as Pick<Way, 'id' | 'width'>, POINTS)).toEqual([{ path: POINTS, halfWidthCm: 500 }]);
  }, 60_000);

  it('with the Way records given, the outer strip beside the lane stops at the lane\'s corridor (6 m outside the wall), not the street\'s width; beside the street it stops at the street\'s', () => {
    const { k, enceinte, row } = laidWay();
    const r = layStrips(enceinte, row, k, { stops: [], wayHalfWidthCm: 700, ways: [RECORD] });
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    // 4.5 m outside the wall beside the lane: between the wall and the lane's corridor (its edge 6 m out) — the strip's.
    // At the widest half-width (700 cm, the round's before) the corridor's edge stood 2 m out and this point lay in it.
    expect(ownerAt(k, P(-20450, -8000))).toBe('wall_strip:1-outer');
    // Beside the street the same point lies in the street's corridor (its edge 2 m out): no strip's.
    expect(ownerAt(k, P(-20450, 8000))).not.toMatch(/^wall_strip/);
    // Inside each corridor: no strip's.
    for (const q of [P(-20900, -8000), P(-20900, 8000)]) expect(ownerAt(k, q)).not.toMatch(/^wall_strip/);
  }, 60_000);

  it('without the records the way takes `wayHalfWidthCm` along its whole run, as before the round', () => {
    const { k, enceinte, row } = laidWay();
    const r = layStrips(enceinte, row, k, { stops: [], wayHalfWidthCm: 700 });
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    expect(ownerAt(k, P(-20450, -8000))).not.toMatch(/^wall_strip/);
    expect(ownerAt(k, P(-20450, 8000))).not.toMatch(/^wall_strip/);
  }, 60_000);
});
