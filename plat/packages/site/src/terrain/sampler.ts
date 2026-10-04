// The TerrainSampler (M0-e-01; §2.3: "Point queries go through a TerrainSampler (bilinear), which is how slope queries
// inside the built extent and S11's ground datum read a 2.5 m refinement without storing one"). heightAt is the
// bilinear surface through the cell centres' values (a point beyond the outermost centres reads the edge, clamped);
// slopeAt is that surface's gradient by central differences at ± the slope step (`settings.slopeQueryM`, 2.5 m),
// computed on demand and never stored; flowAt reads the hydrology grid S1 (3) fills (M0-e-02) — on a terrain whose
// flow arrays are not yet written it refuses, naming the step, rather than read zeros as flow.
import { ratio, type Cm, type Point } from '@plat/kernel';
import type { Terrain, TerrainSampler } from '@plat/model';

/** The bilinear surface through the cell centres, in cm (unrounded). */
function surface(t: Terrain, invCell: number): (x: number, y: number) => number {
  const cols = t.cols;
  const rows = t.rows;
  const h = t.heightCm;
  const ox = t.originX;
  const oy = t.originY;
  return (x, y) => {
    let u = (x - ox) * invCell - 0.5;
    let v = (y - oy) * invCell - 0.5;
    if (!(u > 0)) u = 0;
    if (!(v > 0)) v = 0;
    if (u > cols - 1) u = cols - 1;
    if (v > rows - 1) v = rows - 1;
    let i = Math.floor(u);
    let j = Math.floor(v);
    if (i > cols - 2) i = cols > 1 ? cols - 2 : 0;
    if (j > rows - 2) j = rows > 1 ? rows - 2 : 0;
    const s = u - i;
    const r = v - j;
    const i1 = cols > 1 ? i + 1 : i;
    const j1 = rows > 1 ? j + 1 : j;
    const a = h[j * cols + i];
    const b = h[j * cols + i1];
    const c = h[j1 * cols + i];
    const d = h[j1 * cols + i1];
    return (1 - r) * ((1 - s) * a + s * b) + r * ((1 - s) * c + s * d);
  };
}

/**
 * The TerrainSampler over `terrain` (§2.3): `heightAt(p)` the bilinear height at p rounded to the centimetre (exactly
 * the stored value at a cell centre); `slopeAt(p)` the rise over run of the bilinear surface at p by central differences
 * at ± `slopeQueryCm` (terrain.json's `settings.slopeQueryM`, 250 cm), so on a plane it is the plane's gradient;
 * `flowAt(p)` the D8 direction and accumulation of the hydrology cell containing p (§2.3), clamped to the grid.
 */
export function terrainSampler(terrain: Terrain, slopeQueryCm: number): TerrainSampler {
  if (!(terrain.cols >= 1 && terrain.rows >= 1 && terrain.heightCm.length === terrain.cols * terrain.rows)) {
    throw new RangeError('terrainSampler: the height raster does not match its cols × rows');
  }
  const inv = ratio(1, terrain.cellCm, 'length');
  const inv2d = ratio(1, 2 * slopeQueryCm, 'length');
  if (!inv.ok) throw new RangeError(`terrainSampler: cell ${String(terrain.cellCm)} cm`);
  if (!inv2d.ok) throw new RangeError(`terrainSampler: slope step ${String(slopeQueryCm)} cm`);
  const at = surface(terrain, inv.value);
  const d = slopeQueryCm;
  const k = inv2d.value;
  const hydro = terrain.hydro;
  const invHydro = ratio(1, hydro.cellCm, 'length');
  return {
    heightAt(p: Point): Cm {
      const z = Math.round(at(p.x, p.y));
      return (z === 0 ? 0 : z) as Cm;
    },
    slopeAt(p: Point): number {
      const gx = (at(p.x + d, p.y) - at(p.x - d, p.y)) * k;
      const gy = (at(p.x, p.y + d) - at(p.x, p.y - d)) * k;
      return Math.sqrt(gx * gx + gy * gy);
    },
    flowAt(p: Point): { dir: number; accum: number } {
      const n = hydro.cols * hydro.rows;
      if (!(n > 0 && terrain.flowDir.length === n && terrain.flowAccum.length === n && invHydro.ok)) {
        throw new Error('flowAt: this terrain carries no hydrology yet — S1 (3) writes flowDir and flowAccum (M0-e-02)');
      }
      let i = Math.floor((p.x - hydro.originX) * invHydro.value);
      let j = Math.floor((p.y - hydro.originY) * invHydro.value);
      if (i < 0) i = 0;
      if (j < 0) j = 0;
      if (i > hydro.cols - 1) i = hydro.cols - 1;
      if (j > hydro.rows - 1) j = hydro.rows - 1;
      const c = j * hydro.cols + i;
      return { dir: terrain.flowDir[c], accum: terrain.flowAccum[c] };
    },
  };
}
