// The fields' readers of the committed arena (M0-e-05; §4.5's driver kernels: "distance decay to the plaza and to every
// market …, to main streets, gates, water …; walls (−)"; readings C-XXXX (2)). Read-only: they copy points out of the
// arena and write nothing.
//   * `fieldDriverSources`: the plaza (its reservation's L1 faces), the markets (every `plaza` or `market` reservation — the
//     principal market is the plaza's reservation at M0), the main streets (every edge carrying a `way` row of a listed
//     class), the gates (each listed gate's `gate` vertex), the water (each listed body's L0 faces, and every edge
//     carrying a `shore` or `bank` row) and the walls (every edge carrying a `wall` or `wall_gate` row). The rasters the
//     fields build from them are unions, so the order the arena's slots hold them in reaches no value.
//   * `fieldFaces`: every live L1 face with its owner and rings, in canonical face order (§3.3's keys, never slot order).
import { compareFaces, faceKey, faceRings, handleOf, idOf, isFaceLive, isHalfEdgeLive, roleIdOf, roleInfo, rowElement, rowsOfKey, rowsOn, type Plat } from '@plat/kernel';
import type { Gate, Reservation, WaterSet, Way } from '@plat/model';
import type { FieldFace, FieldSources, Path, XY } from './types.js';

/** The faces of `level` an entity owns, as their rings (outer first, then holes), in canonical face order. */
function ownedRings(p: Plat, level: 0 | 1, owner: string): Path[][] {
  const h = handleOf(p, owner);
  if (h < 0) return [];
  const faces: number[] = [];
  for (let f = 0; f < p.slots.face[level].top; f += 1) if (isFaceLive(p, level, f) && p.faces[level].owner[f] === h) faces.push(f);
  faces.sort((a, b) => compareFaces(p, level, a, b));
  return faces.map((f) => faceRings(p, level, f));
}

/** What `fieldDriverSources` reads besides the arena (the records of S3–S5; absent lists read as empty). */
export interface FieldSourceRecords {
  readonly reservations?: readonly Reservation[];
  readonly ways?: readonly Way[];
  readonly gates?: readonly Gate[];
  readonly water?: WaterSet;
  /** The classes the main-street kernel measures from (pass1.json's `mainStreet.classes`). */
  readonly mainStreetClasses: readonly string[];
}

/** The fields' sources read from arena `p` (see the module comment). */
export function fieldDriverSources(p: Plat, rec: FieldSourceRecords): FieldSources {
  const plaza: Path[] = [];
  const markets: Path[] = [];
  for (const r of rec.reservations ?? []) {
    if (r.kind !== 'plaza' && r.kind !== 'market') continue;
    for (const rings of ownedRings(p, 1, r.id)) {
      for (const ring of rings) {
        if (r.kind === 'plaza') plaza.push(ring);
        markets.push(ring);
      }
    }
  }
  const main = new Set<string>();
  const classes = new Set(rec.mainStreetClasses);
  for (const w of rec.ways ?? []) if (classes.has(w.class)) main.add(w.id);
  const mainStreets: Path[] = [];
  const walls: Path[] = [];
  const waterLines: Path[] = [];
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  for (let e = 0; e < p.slots.pair.top; e += 1) {
    const h = 2 * e;
    if (!isHalfEdgeLive(p, h)) continue;
    let isMain = false;
    let isWall = false;
    let isWater = false;
    for (const r of rowsOn(p, 'edge', h)) {
      const role = roleInfo(p.roles.kind[r]).name;
      if (role === 'way') {
        if (main.has(idOf(p, p.roles.entity[r]))) isMain = true;
      } else if (role === 'wall' || role === 'wall_gate') isWall = true;
      else if (role === 'shore' || role === 'bank') isWater = true;
    }
    if (!(isMain || isWall || isWater)) continue;
    const seg: Path = [
      { x: X[O[h]], y: Y[O[h]] },
      { x: X[O[h + 1]], y: Y[O[h + 1]] },
    ];
    if (isMain) mainStreets.push(seg);
    if (isWall) walls.push(seg);
    if (isWater) waterLines.push(seg);
  }
  const gates: XY[] = [];
  const gateRole = roleIdOf('gate');
  for (const g of rec.gates ?? []) {
    const hd = handleOf(p, g.id);
    if (hd < 0) continue;
    for (const r of rowsOfKey(p, gateRole, hd, 0)) {
      const v = rowElement(p, r);
      gates.push({ x: X[v], y: Y[v] });
    }
  }
  const water: Path[] = [];
  for (const b of rec.water?.bodies ?? []) for (const rings of ownedRings(p, 0, b.id)) for (const ring of rings) water.push(ring);
  return { plaza, markets, mainStreets, gates, water, waterLines, walls };
}

/** Every live L1 face of `p` with its owner and rings, in canonical face order (§3.3). */
export function fieldFaces(p: Plat): FieldFace[] {
  const live: number[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f)) live.push(f);
  live.sort((a, b) => compareFaces(p, 1, a, b));
  const X = p.vertices.x;
  const Y = p.vertices.y;
  return live.map((f) => {
    const [a, b] = faceKey(p, 1, f);
    const h = p.faces[1].owner[f];
    return { key: [X[a], Y[a], X[b], Y[b]] as const, owner: h >= 0 ? idOf(p, h) : null, rings: faceRings(p, 1, f) };
  });
}
