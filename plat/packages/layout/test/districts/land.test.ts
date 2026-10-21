// S6 under S1's land components (M0-e-04; N-51; C-0265 refining C-0245 (2)). The real S1 owns every L0 land face by its
// land component `land:<n>` (C-0229 (3)) and the L1 faces inherit it (§2.2 rule 4); S6 re-owns those L1 faces exactly
// as unowned ones — a district inside the perimeter, the hinterland outside it — through the one rule `s6Takes`, while
// the L0 faces keep `land:<n>` and a reservation's face keeps its owner. On the district fixture with the L0 face given
// `land:0` (support.ts `landOwner`), S6 claims land (landHa > 0, districts > 0) and its result equals the run on the
// same fixture with no S1 owner: the same report, the same District records, the same L1 owners face by face once
// `land:0` reads as no owner.
import { idOf, isFaceLive, type Plat } from '@plat/kernel';
import { canonicalText, type Id } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { isS1LandOwner, runS6, s6Takes, type CoarseFace, type S6Output } from '../../src/index.js';
import { cityRun, ownerAt, ownersL1, P, s6Run, town, type Town } from './support.js';

const SEED = 4;
const LAND: Id = 'land:0';

/** Every live L0 face's owner, by slot. */
function ownersL0(p: Plat): Map<number, Id | null> {
  const out = new Map<number, Id | null>();
  for (let f = 0; f < p.slots.face[0].top; f += 1) {
    if (!isFaceLive(p, 0, f)) continue;
    const h = p.faces[0].owner[f];
    out.set(f, h >= 0 ? idOf(p, h) : null);
  }
  return out;
}

interface Pair {
  readonly land: Town;
  readonly plain: Town;
  readonly landBefore: Map<number, Id | null>;
  readonly landOut: S6Output;
  readonly plainOut: S6Output;
}

let PAIR: Pair | undefined;
function pair(): Pair {
  if (PAIR === undefined) {
    const land = town(SEED, { landOwner: LAND });
    const landBefore = ownersL1(land.plat);
    const plain = town(SEED);
    const a = runS6(land.input);
    const b = runS6(plain.input);
    if (!a.ok) throw new Error(`S6 under land:0 was refused: ${a.code} ${a.detail}`);
    if (!b.ok) throw new Error(`S6 was refused: ${b.code} ${b.detail}`);
    PAIR = { land, plain, landBefore, landOut: a.value, plainOut: b.value };
  }
  return PAIR;
}

describe('S6 takes the L1 faces S1’s land components own (N-51; C-0265)', () => {
  it('the fixture is S1’s: before S6 every L1 face but the plaza’s inherits land:0 from its L0 face', { timeout: 120_000 }, () => {
    const { land, landBefore } = pair();
    const owners = [...landBefore.values()];
    expect(owners.length).toBeGreaterThan(10);
    expect(owners.filter((o) => o === null)).toEqual([]);
    expect(owners.filter((o) => o !== LAND)).toEqual([land.plaza.id]);
  });

  it('S6 claims land: landHa > 0 and districts > 0, with the report of the run with no S1 owner', { timeout: 120_000 }, () => {
    const { landOut, plainOut } = pair();
    expect(landOut.report.landHa).toBeGreaterThan(0);
    expect(landOut.districts.length).toBeGreaterThan(0);
    expect(landOut.report.districts).toBe(landOut.districts.length);
    expect(landOut.report).toEqual(plainOut.report);
    expect(landOut.districts).toEqual(plainOut.districts);
    expect(landOut.seams).toEqual(plainOut.seams);
    expect(landOut.quarters).toEqual(plainOut.quarters);
    expect(landOut.typing).toEqual(plainOut.typing);
  });

  it('every L1 face is re-owned as on the run with no S1 owner (districts inside, the hinterland outside); the L0 face keeps land:0', { timeout: 120_000 }, () => {
    const { land, plain, landOut } = pair();
    const a = ownersL1(land.plat);
    const b = ownersL1(plain.plat);
    expect([...a.keys()]).toEqual([...b.keys()]);
    for (const [f, o] of a) expect(o === LAND ? null : o, `L1 face ${String(f)}`).toBe(b.get(f));
    const districtIds = new Set(landOut.districts.map((d) => d.id));
    const vals = [...a.values()];
    expect(vals.filter((o) => o !== null && districtIds.has(o)).length).toBeGreaterThan(0);
    expect(vals.filter((o) => o === landOut.hinterland).length).toBeGreaterThan(0);
    // the hinterland holds the land just outside the perimeter (between the boundary's ring + 50 m and the frame)
    const out = land.boundary.reduce((m, q) => Math.max(m, Math.hypot(q.x, q.y)), 0) + 20_000;
    expect(ownerAt(land, P(out, 0))).toBe(landOut.hinterland);
    // the L0 faces keep S1's owner
    const l0 = [...ownersL0(land.plat).values()];
    expect(l0.length).toBeGreaterThan(0);
    expect(l0.every((o) => o === LAND)).toBe(true);
  });

  it('a reservation’s face keeps its owner: the plaza is never claimed', { timeout: 120_000 }, () => {
    const { land, landOut } = pair();
    expect(ownerAt(land, P(0, 0))).toBe(land.plaza.id);
    const districtIds = new Set(landOut.districts.map((d) => d.id));
    expect(districtIds.has(land.plaza.id)).toBe(false);
  });
});

describe('the wall strips keep their owners under S1’s land owner (C-0245 (2), C-0265; note 16)', () => {
  it('the CITY run with land:0: every strip face keeps its owner through S6, beside the land S6 re-owns', { timeout: 300_000 }, () => {
    const c = cityRun(1, 150, 180, new Map(), LAND);
    const before = ownersL1(c.plat);
    const strips = [...before].filter(([, o]) => o !== null && o.startsWith('wall_strip:'));
    // the fixture is S1's and S3's: the strips owned, the land inheriting land:0
    expect(strips.length).toBeGreaterThan(4);
    expect([...before.values()].filter((o) => o === LAND).length).toBeGreaterThan(50);
    const out = s6Run(c.input);
    expect(out.report.landHa).toBeGreaterThan(0);
    expect(out.report.unowned).toBe(0);
    const after = ownersL1(c.plat);
    for (const [f, o] of strips) expect(after.get(f), `L1 face ${String(f)}`).toBe(o);
    const districtIds = new Set(out.districts.map((d) => d.id));
    const vals = [...after.values()];
    expect(vals.filter((o) => o !== null && districtIds.has(o)).length).toBeGreaterThan(50);
    expect(vals.filter((o) => o === out.hinterland).length).toBeGreaterThan(0);
  });
});

describe('S6’s output records have a canonical text (§6.2: the model digest reads them; C-0265)', () => {
  it('districts, seams, quarters and typing serialise; an inadmissible kind’s score is null, never −∞', { timeout: 120_000 }, () => {
    const { landOut } = pair();
    for (const [name, rec] of [['districts', landOut.districts], ['seams', landOut.seams], ['quarters', landOut.quarters], ['typing', landOut.typing]] as const) {
      expect(() => canonicalText(rec), name).not.toThrow();
    }
    const scores = landOut.typing.flatMap((t) => t.scores.map(([, v]) => v));
    expect(scores.some((v) => v === null)).toBe(true);
    expect(scores.every((v) => v === null || Number.isFinite(v))).toBe(true);
  });
});

describe('the one rule s6Takes and S1’s owner ids', () => {
  const face = (owner: Id | null, side: CoarseFace['side'], water = false): CoarseFace => ({ face: 0, key: [0, 0, 1, 0], areaCm2: 1, perimeterCm: 4, owner, water, side, centroid: { x: 0, y: 0 } });

  it('isS1LandOwner reads land:<n> only', () => {
    for (const id of ['land:0', 'land:1', 'land:12']) expect(isS1LandOwner(id), id).toBe(true);
    for (const id of [null, '', 'land:', 'land:01', 'land:x', 'land:1a', 'land:-1', 'island:0', 'plaza:0', 'Land:0', ' land:0']) expect(isS1LandOwner(id), String(id)).toBe(false);
  });

  it('inside: unowned or land:<n>, no water; outside the same for the hinterland; the margin, water and any other owner never', () => {
    for (const side of ['inside', 'outside'] as const) {
      const other = side === 'inside' ? 'outside' : 'inside';
      expect(s6Takes(face(null, side), side)).toBe(true);
      expect(s6Takes(face('land:3', side), side)).toBe(true);
      expect(s6Takes(face('land:3', side, true), side)).toBe(false);
      expect(s6Takes(face(null, side, true), side)).toBe(false);
      expect(s6Takes(face('plaza:0', side), side)).toBe(false);
      expect(s6Takes(face('enceinte:0/strip', side), side)).toBe(false);
      expect(s6Takes(face('land:3', other), side)).toBe(false);
      expect(s6Takes(face(null, 'margin'), side)).toBe(false);
      expect(s6Takes(face('land:3', 'margin'), side)).toBe(false);
    }
  });
});
