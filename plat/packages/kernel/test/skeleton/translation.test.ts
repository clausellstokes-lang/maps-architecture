// M0-a-11 (fix round 1, F-2): §3.8 *Numeric contract* — "event times are therefore computed in doubles with + − × ÷ √
// only (identical on every IEEE engine; no transcendental), on coordinates relative to the polygon's bounding-box
// corner" — judged by what it promises: the skeleton does not depend on where the face lies. The same rings near the
// origin and moved by integer offsets near ±(2²³ − 4 000) cm (the lattice's four far corners, where a double's spacing
// is 2⁻⁹ cm and an engine reading world coordinates loses digits it needs) give the same arcs, faces, edges and event
// count, the rings less the offset exactly and the nodes and times within 10⁻⁶ cm (the only difference allowed is the
// rounding of the world coordinates the output adds back), and, when the input takes a downgrade, the same downgrade
// with the same cause; and, read through the engine's `finished` hook, the vertices the engine ran on are the rings
// less their bounding-box corner, exactly (C-0171).
import { describe, expect, it } from 'vitest';
import type { KernelResult, Warning } from '../../src/num/index.js';
import { runSkeleton } from '../../src/skeleton/skeleton.js';
import { skeleton, type Skeleton, type SkeletonFailure, type SkeletonUse } from '../../src/skeleton/index.js';
import { TIMEOUT, generator, holedPolygons, intIn, jitteredStar, lShape, notched, pt, tShape, uShape, type Ring } from './support.js';

/** The far offset: 2²³ − 4 000 cm. Every face set below lies within ±3 999 cm of the origin, so every moved one is on the lattice. */
const FAR = 8_388_608 - 4_000;
/** The tolerance on node coordinates and times: far above the add-back's rounding (≤ 2⁻¹⁰ cm), far below a millimetre. */
const TOL_CM = 1e-6;

const move = (rings: readonly Ring[], dx: number, dy: number): Ring[] => rings.map((r) => r.map((p) => pt(p.x + dx, p.y + dy)));

/** The rings moved so their bounding box is centred on the origin (an integer shift), or null when they do not fit ±3 999 cm. */
function centred(rings: readonly Ring[]): Ring[] | null {
  let x0 = Number.POSITIVE_INFINITY;
  let y0 = Number.POSITIVE_INFINITY;
  let x1 = Number.NEGATIVE_INFINITY;
  let y1 = Number.NEGATIVE_INFINITY;
  for (const r of rings) {
    for (const p of r) {
      x0 = Math.min(x0, p.x);
      y0 = Math.min(y0, p.y);
      x1 = Math.max(x1, p.x);
      y1 = Math.max(y1, p.y);
    }
  }
  const out = move(rings, -Math.round((x0 + x1) / 2), -Math.round((y0 + y1) / 2));
  for (const r of out) for (const p of r) if (Math.abs(p.x) > 3_999 || Math.abs(p.y) > 3_999) return null;
  return out;
}

/** The face sets: random star rings, §13.1's holed polygons that fit, and the L, T, U and notched outlines rotated. */
function faceSets(): Ring[][] {
  const rnd = generator(2_323);
  const raw: Ring[][] = [];
  for (let i = 0; i < 240; i += 1) raw.push([jitteredStar(rnd, intIn(rnd, 5, 29), 300, 500 + intIn(rnd, 0, 3_100))]);
  raw.push(...holedPolygons(11, 160));
  for (let k = 0; k < 12; k += 1) {
    const deg = 7.5 * k + 0.37;
    raw.push([lShape(2_000, 500, 2_000, 600, deg)], [tShape(2_400, 600, 1_800, 700, deg)], [uShape(2_600, 500, 2_000, 600, deg)], [notched(2_000, 1_000, 100, 300, 200, deg)]);
  }
  const out: Ring[][] = [];
  for (const rings of raw) {
    const c = centred(rings);
    if (c !== null) out.push(c);
  }
  return out;
}

/** The lattice point a warning names moved back by (dx, dy). */
const warningBack = (w: Warning, dx: number, dy: number): Warning => (w.at === undefined ? w : { ...w, at: pt(w.at.x - dx, w.at.y - dy) });

/** A contract refusal's corner moved back by (dx, dy); every other cause names no point. */
const causeBack = (c: SkeletonFailure, dx: number, dy: number): SkeletonFailure => (c.code === 'contract' && c.at !== undefined ? { ...c, at: pt(c.at.x - dx, c.at.y - dy) } : c);

function valueOf(r: KernelResult<Skeleton>): { value: Skeleton; warnings: Warning[] } {
  if (!r.ok) throw new Error(`error ${r.code}: ${r.detail}`);
  return r;
}

describe('bounding-box-relative coordinates: the skeleton does not depend on where the face lies (§3.8)', () => {
  it('the same rings near the origin and near the lattice’s four far corners give the same skeleton', { timeout: TIMEOUT }, () => {
    const uses: SkeletonUse[] = ['roof', 'spine', 'regions'];
    const rnd = generator(4_646);
    const sets = faceSets();
    let validated = 0;
    let downgrades = 0;
    let worst = 0;
    for (let i = 0; i < sets.length; i += 1) {
      const rings = sets[i];
      const use = uses[i % 3];
      const home = valueOf(skeleton(rings, use));
      const a = home.value;
      for (const [sx, sy] of [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ]) {
        const dx = sx * (FAR - intIn(rnd, 0, 99));
        const dy = sy * (FAR - intIn(rnd, 0, 99));
        const far = valueOf(skeleton(move(rings, dx, dy), use));
        const b = far.value;
        expect(far.warnings.map((w) => warningBack(w, dx, dy))).toEqual(home.warnings);
        expect(b.kind).toBe(a.kind);
        if (a.kind === 'downgrade' || b.kind === 'downgrade') {
          if (a.kind !== 'downgrade' || b.kind !== 'downgrade') continue;
          expect(causeBack(b.cause, dx, dy)).toEqual(a.cause);
          expect({ ...b, cause: null }).toEqual({ ...a, cause: null });
          downgrades += 1;
          continue;
        }
        expect(b.arcs).toEqual(a.arcs);
        expect(b.faces).toEqual(a.faces);
        expect(b.edges).toEqual(a.edges);
        expect(b.events).toBe(a.events);
        expect(move(b.rings, -dx, -dy)).toEqual(a.rings);
        expect(b.nodes.length).toBe(a.nodes.length);
        for (let j = 0; j < a.nodes.length; j += 1) {
          const p = a.nodes[j];
          const q = b.nodes[j];
          const d = Math.max(Math.abs(q.x - dx - p.x), Math.abs(q.y - dy - p.y), Math.abs(q.t - p.t));
          if (!(d <= TOL_CM)) throw new Error(`face set ${i} moved by (${dx}, ${dy}): node ${j} differs by ${d} cm`);
          if (d > worst) worst = d;
        }
        validated += 1;
      }
    }
    console.log(`[M0-a-11 translation] face sets ${sets.length}, moved runs validated ${validated}, downgrades ${downgrades}, max |Δ| ${worst} cm`);
    expect(validated).toBeGreaterThan(sets.length * 3);
  });

  it('the engine reads the rings less their bounding-box corner: its input vertices span from (0, 0)', () => {
    const sets = faceSets().filter((_, i) => i % 20 === 0);
    expect(sets.length).toBeGreaterThan(15);
    let read = 0;
    for (const rings of sets) {
      for (const [dx, dy] of [
        [0, 0],
        [FAR, -FAR],
        [-FAR + 7, FAR - 3],
      ]) {
        let input: { x: number; y: number }[] = [];
        const r = runSkeleton(move(rings, dx, dy), 'spine', {}, { finished: (nodes) => void (input = nodes.map((q) => ({ x: q.x, y: q.y }))) });
        if (!r.ok || r.value.kind !== 'skeleton') continue;
        // nodes 0 … n − 1 are the cleaned rings' vertices in order, as the engine read them
        const world = r.value.rings.flat();
        let cx = Number.POSITIVE_INFINITY;
        let cy = Number.POSITIVE_INFINITY;
        for (const p of world) {
          cx = Math.min(cx, p.x);
          cy = Math.min(cy, p.y);
        }
        expect(input.slice(0, world.length)).toEqual(world.map((p) => ({ x: p.x - cx, y: p.y - cy })));
        read += 1;
      }
    }
    // the check is not vacuous: nearly every run validated and its engine input was read
    expect(read).toBeGreaterThan(sets.length * 2);
  });
});
