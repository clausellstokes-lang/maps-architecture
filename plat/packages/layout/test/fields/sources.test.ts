// The fields' readers of the arena (C-0255 (2)): the plaza and markets from their reservations' faces, the main
// streets from the `way` rows of the listed classes only, the gates from their `gate` vertices, the walls from the
// `wall` rows; the coarse faces in canonical order with their owners.
import { describe, expect, it } from 'vitest';
import { fieldDriverSources, fieldFaces } from '../../src/index.js';
import { fieldTown, mainClasses } from './support.js';

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
