// The fields' readers of the arena (C-0255 (2)): the plaza and markets from their reservations' faces, the main
// streets from the `way` rows of the listed classes only, the gates from their `gate` vertices, the walls from the
// `wall` rows; the coarse faces in canonical order with their owners; the water from the bodies' L0 faces and their
// `shore` / `bank` edges, on M0-e-03's water fixture as S1 lays it (a real river, tributary and estuary).
import { compareFaces, faceRings, handleOf, isFaceLive, seedKey } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { fieldChanceStream, fieldDriverSources, fieldFaces, fieldsDrivers, fieldsPass1, type FieldPath, type FieldSite } from '../../src/index.js';
import { CELLS, fieldTown, insideRings, mainClasses, s1River, TABLES } from './support.js';

describe('fieldDriverSources and fieldFaces', () => {
  const ft = fieldTown(2);
  const t = ft.town;
  const s = ft.site.sources;
  it('the plaza\'s rings are its reservation\'s face (the hexagon at the centre); the markets hold the plaza (the principal market at M0)', () => {
    expect(s.plaza.length).toBe(1);
    expect(s.plaza[0].length).toBe(6);
    for (const p of s.plaza[0]) expect(Math.hypot(p.x, p.y)).toBeLessThan(4500);
    expect(s.markets).toEqual(s.plaza);
  });

  it('the main streets are the primary and through ways\' edges only; another class list reads other edges', () => {
    expect(mainClasses()).toEqual(['through', 'primary']);
    expect(s.mainStreets.length).toBeGreaterThan(0);
    const sec = fieldDriverSources(t.plat, { reservations: [t.plaza], ways: t.ways, gates: t.gates, mainStreetClasses: ['secondary'] });
    expect(sec.mainStreets.length).toBeGreaterThan(0);
    const key = (seg: readonly { x: number; y: number }[]) => `${seg[0].x},${seg[0].y},${seg[1].x},${seg[1].y}`;
    const a = new Set(s.mainStreets.map(key));
    for (const seg of sec.mainStreets) expect(a.has(key(seg))).toBe(false);
    // every main-street segment lies on a primary or through way's polyline from the plaza to the gate or the frame
    const none = fieldDriverSources(t.plat, { reservations: [t.plaza], ways: t.ways.filter((w) => w.class === 'secondary'), gates: t.gates, mainStreetClasses: mainClasses() });
    expect(none.mainStreets.length).toBe(0);
  });

  it('one gate point per gate, at its gate vertex on the wall; the walls are the wall ring\'s edges; no water on the dry fixture', () => {
    expect(s.gates.length).toBe(t.gates.length);
    for (const g of s.gates) expect(t.wall.some((q) => q.x === g.x && q.y === g.y)).toBe(true);
    expect(s.walls.length).toBeGreaterThanOrEqual(t.wall.length);
    expect(s.water).toEqual([]);
    expect(s.waterLines).toEqual([]);
    expect(fieldDriverSources(t.plat, { mainStreetClasses: mainClasses() }).plaza).toEqual([]);
  });

  it('the coarse faces: every live L1 face once, in canonical order (keys ascending by y then x), with its owner', () => {
    const faces = fieldFaces(t.plat);
    expect(faces).toEqual(ft.districts.faces);
    for (let k = 1; k < faces.length; k += 1) {
      const a = faces[k - 1].key;
      const b = faces[k].key;
      const cmp = a[1] - b[1] || a[0] - b[0] || a[3] - b[3] || a[2] - b[2];
      expect(cmp).toBeLessThan(0);
    }
    const owners = new Set(faces.map((f) => f.owner));
    for (const d of t.out.districts) expect(owners.has(d.id)).toBe(true);
    expect(owners.has('plaza:0')).toBe(true);
  });
});

describe('the water sources on M0-e-03\'s water fixture (S1\'s committed river, tributary and estuary)', () => {
  const fx = s1River(2);
  const s = fieldDriverSources(fx.plat, { water: fx.water, mainStreetClasses: mainClasses() });
  const text = (ring: readonly { x: number; y: number }[]) => ring.map((q) => `${String(q.x)},${String(q.y)}`).join(' ');
  /** Each body's L0 faces read here (the test's own walk over the level's faces), every ring, in canonical face order. */
  const l0Rings = (): string[] => {
    const out: string[] = [];
    for (const b of fx.water.bodies) {
      const h = handleOf(fx.plat, b.id);
      expect(h).toBeGreaterThanOrEqual(0);
      const faces: number[] = [];
      for (let f = 0; f < fx.plat.slots.face[0].top; f += 1) if (isFaceLive(fx.plat, 0, f) && fx.plat.faces[0].owner[f] === h) faces.push(f);
      expect(faces.length).toBeGreaterThan(0);
      faces.sort((a, c) => compareFaces(fx.plat, 0, a, c));
      for (const f of faces) for (const ring of faceRings(fx.plat, 0, f)) out.push(text(ring));
    }
    return out;
  };

  it('the water rings are the bodies\' L0 faces, every ring, body by body in canonical face order; the shore and bank edges are the water lines', () => {
    expect(fx.water.bodies.length).toBeGreaterThanOrEqual(2);
    const want = l0Rings();
    expect(want.length).toBeGreaterThanOrEqual(fx.water.bodies.length);
    expect(s.water.map(text)).toEqual(want);
    expect(s.waterLines.length).toBeGreaterThan(0);
    // no other source on a site of water alone
    expect(s.plaza).toEqual([]);
    expect(s.markets).toEqual([]);
    expect(s.mainStreets).toEqual([]);
    expect(s.gates).toEqual([]);
    // the bodies own no L1 face: a reader of another level finds no ring
    for (const b of fx.water.bodies) {
      const h = handleOf(fx.plat, b.id);
      for (let f = 0; f < fx.plat.slots.face[1].top; f += 1) if (isFaceLive(fx.plat, 1, f)) expect(fx.plat.faces[1].owner[f]).not.toBe(h);
    }
  });

  it('every cell whose centre lies in a body is a water source (distance 0), and the water kernel is ≈ its weight there', () => {
    const site: FieldSite = { frame: fx.plat.frame, rung: 'CITY', terrain: fx.terrain, sources: s };
    const st = fieldsDrivers(site, TABLES);
    if (!st.ok) throw new Error(st.detail);
    const g = st.value.grid;
    const d = st.value.distances.get('water');
    if (d === null || d === undefined) throw new Error('no water transform');
    const bodyRings: FieldPath[][] = [];
    for (const b of fx.water.bodies) {
      const h = handleOf(fx.plat, b.id);
      for (let f = 0; f < fx.plat.slots.face[0].top; f += 1) if (isFaceLive(fx.plat, 0, f) && fx.plat.faces[0].owner[f] === h) bodyRings.push(faceRings(fx.plat, 0, f));
    }
    const inside: { x: number; y: number }[] = [];
    for (let j = 0; j < g.rows; j += 1) {
      for (let i = 0; i < g.cols; i += 1) {
        const p = { x: g.originX + (i + 0.5) * g.cellCm, y: g.originY + (j + 0.5) * g.cellCm };
        if (!bodyRings.some((rings) => insideRings(rings, p.x, p.y))) continue;
        expect(d.d2[j * g.cols + i]).toBe(0);
        inside.push(p);
      }
    }
    expect(inside.length).toBeGreaterThan(20);
    const r = fieldsPass1(site, { districts: [], faces: [] }, TABLES, fieldChanceStream(seedKey(2)));
    if (!r.ok) throw new Error(r.detail);
    expect(r.value.report.sourced).toContain('water');
    for (const f of [r.value.prosperity, r.value.density, r.value.greenery]) {
      const w = CELLS.fields.find((x) => x.field === f.field)?.terms.find((t) => t.term === 'water')?.weight ?? 0;
      if (w === 0) continue;
      // the body's cells, blurred with their neighbours (σ 60 m): the kernel holds near its weight inside the river
      let best = 0;
      for (const p of inside) best = Math.max(best, (f.drivers([p]).terms.find((t) => t.term === 'water')?.value ?? NaN) / w);
      expect(best).toBeGreaterThan(0.9);
      expect(best).toBeLessThanOrEqual(1 + 1e-12);
    }
  });
});
