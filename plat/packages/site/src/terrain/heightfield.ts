// S1 (1)'s heightfield (M0-e-01; §4.2 S1 (1), §2.3, §12.4): 5-octave fBm with a low base frequency and the relief
// class's amplitude, plus the request's authored primitives, stored as Int32 centimetres above the datum through the
// range check (./range.ts). *Mechanism* (§4.2 S1 (1)): the fBm is evaluated on the coarse grid (`fbm.baseGridM`, 32 m)
// over frame + margin; the stored raster (the rung's cell, §2.3) is its bilinear refinement plus the fine octave(s)
// inside the built extent — at S1 the frame, the margin being context (C-0165 (3)) — faded in over one coarse cell
// inside the frame's edge so the raster has no seam; the primitives are evaluated at the stored cells, so an authored
// cliff keeps its edge. Slope queries at 2.5 m go through the TerrainSampler (./sampler.ts), never a stored refinement.
//
// The draws (§6.1, `terrain.noise` on the town root's key): one seeded sampler of octaves + fineOctaves octaves
// (noiseStream: per octave 255 + 2 uniforms), drawn before anything else S1 draws on that stream.
import { fbmRow, noiseStream, octaveNorm, octaveRow, ok, err, ratio, type Frame, type KernelResult, type Stream, type Warning } from '@plat/kernel';
import type { Cm, Id, Lifecycle, PlatKey, SiteFeature, Terrain } from '@plat/model';
import { centreX, centreY, heightGrid, hydroGridOver, type CellGrid } from './grid.js';
import { BASE_WAVELENGTH_M, type TerrainParams } from './params.js';
import { preparePrimitive, primitivesOffsetCm, type PreparedPrimitive } from './primitives.js';
import { heightWriter, type HeightWriter } from './range.js';
import type { SiteRequest } from './types.js';

/** What `buildTerrain` and `flatTerrain` read besides the noise. */
export interface TerrainSpec {
  /** The terrain entity's address (§6.3; minted by the caller). */
  id: Id;
  /** Its arena: the ground's, or a sky island's (§2.3). */
  key: PlatKey;
  /** The frame (§3.2 (9)); the raster covers it and its margin. */
  frame: Frame;
  /** The rung's terrain cells. */
  params: TerrainParams;
  /** The epoch the record is made in (its lifecycle's `since`). */
  epoch: number;
}

/** The ground arena's key (§2.1): layer `ground`, part 0. */
export const GROUND_KEY: PlatKey = Object.freeze({ layer: 'ground', part: 0 }) as PlatKey;

function generated(epoch: number): Lifecycle {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch, seq: 0 } };
}

/** The record around a written raster: the hydrology grid sized over its extent, its arrays empty until S1 (3). */
function record(spec: TerrainSpec, grid: CellGrid, heights: Int32Array, datumCm: number, request: SiteRequest | null): Terrain {
  const features: SiteFeature[] = [];
  for (const p of request?.primitives ?? []) features.push({ kind: p.kind, at: { x: p.at.x, y: p.at.y } });
  const wind = request?.wind;
  return {
    id: spec.id,
    key: { layer: spec.key.layer, part: spec.key.part },
    cellCm: grid.cellCm as Cm,
    cols: grid.cols,
    rows: grid.rows,
    originX: grid.originX as Cm,
    originY: grid.originY as Cm,
    datumCm: datumCm as Cm,
    heightCm: heights,
    reliefLimitCm: spec.params.reliefLimitCm as Cm,
    // S1 (3) (M0-e-02) fills the flow arrays on this grid (and may coarsen it, R12-5); S1 (9) (M0-e-03) the outfalls.
    hydro: hydroGridOver(grid, spec.params.hydroCellCm),
    flowDir: new Uint8Array(0),
    flatRank: new Uint32Array(0),
    flowAccum: new Uint32Array(0),
    outfalls: [],
    // No coast at M0 (C-0048): sea level is mean sea level, the datum's own elevation below it.
    seaLevelCm: (datumCm === 0 ? 0 : -datumCm) as Cm,
    wind: wind === undefined ? { bearingCdeg: 0, strength: 0 } : { bearingCdeg: wind.bearingCdeg, strength: wind.strength },
    features,
    lifecycle: generated(spec.epoch),
  };
}

function datumOf(request: SiteRequest): number | null {
  const m = request.baseElevationM ?? 0;
  if (!Number.isFinite(m)) return null;
  const cm = Math.round(m * 100);
  return cm === 0 ? 0 : cm;
}

/**
 * S1 (1): the terrain of `request` over `spec.frame`, its noise drawn from `stream` (`terrain.noise`, town root). The
 * heights are written through the range check; a clamp is reported as W_HEIGHT_CLAMPED with the cell count. Refused
 * with E_OUT_OF_RANGE when the relief class is unknown (`relief`), the base elevation is not finite (`datum`), a
 * primitive cannot be prepared (`primitive <index>: <reason>`), or the noise shape is out of range (`noise.*`).
 */
export function buildTerrain(spec: TerrainSpec, request: SiteRequest, stream: Stream): KernelResult<Terrain> {
  const p = spec.params;
  const amp = (p.amplitudeCm as Readonly<Record<string, number>>)[request.relief];
  if (typeof amp !== 'number') return err('E_OUT_OF_RANGE', 'relief');
  const datumCm = datumOf(request);
  if (datumCm === null) return err('E_OUT_OF_RANGE', 'datum');
  const prepared: PreparedPrimitive[] = [];
  const prims = request.primitives ?? [];
  for (let i = 0; i < prims.length; i += 1) {
    try {
      prepared.push(preparePrimitive(prims[i]));
    } catch (e) {
      return err('E_OUT_OF_RANGE', `primitive ${String(i)}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  const made = noiseStream(stream, p.shape, p.octaves + p.fineOctaves);
  if (!made.ok) return err(made.code, made.detail);
  const ns = made.value;
  const grid = heightGrid(spec.frame, p.cellCm);
  const perCm = ratio(1, BASE_WAVELENGTH_M * 100, 'length');
  const invG = ratio(1, p.baseGridCm, 'length');
  if (!perCm.ok || !invG.ok) return err('E_OUT_OF_RANGE', 'grid');
  const f = perCm.value;
  const ig = invG.value;
  const G = p.baseGridCm;

  // The coarse fBm: nodes every G from the raster's south-west corner, one beyond its far edge.
  const nx = Math.ceil(grid.cols * grid.cellCm * ig) + 1;
  const ny = Math.ceil(grid.rows * grid.cellCm * ig) + 1;
  const coarse = new Float64Array(nx * ny);
  const row = new Float64Array(nx);
  for (let l = 0; l < ny; l += 1) {
    fbmRow(row, grid.originX * f, G * f, nx, (grid.originY + l * G) * f, p.octaves, ns);
    coarse.set(row, l * nx);
  }

  // Per column: its centre, its coarse cell and weight, and the columns inside the frame (the built extent).
  const cols = grid.cols;
  const cxs = new Float64Array(cols);
  const ks = new Uint32Array(cols);
  const ts = new Float64Array(cols);
  const halfW = spec.frame.widthCm * 0.5;
  const halfH = spec.frame.heightCm * 0.5;
  let in0 = cols;
  let in1 = 0;
  for (let i = 0; i < cols; i += 1) {
    const cx = centreX(grid, i);
    cxs[i] = cx;
    const gx = (cx - grid.originX) * ig;
    let k = Math.floor(gx);
    if (k > nx - 2) k = nx - 2;
    ks[i] = k;
    ts[i] = gx - k;
    if (halfW - Math.abs(cx) > 0) {
      if (i < in0) in0 = i;
      in1 = i + 1;
    }
  }
  const fine = new Float64Array(cols);
  const term = new Float64Array(cols);
  const value = new Float64Array(cols);
  const norm = octaveNorm(p.octaves, ns);
  const heights = new Int32Array(cols * grid.rows);
  const out: HeightWriter = heightWriter(heights, p.reliefLimitCm);
  const half = amp * 0.5;
  for (let j = 0; j < grid.rows; j += 1) {
    const cy = centreY(grid, j);
    const gy = (cy - grid.originY) * ig;
    let l = Math.floor(gy);
    if (l > ny - 2) l = ny - 2;
    const s = gy - l;
    const inY = halfH - Math.abs(cy);
    const fineRow = inY > 0 && in1 > in0 && p.fineOctaves > 0;
    if (fineRow) {
      // The fine octave(s) inside the frame, faded in over one coarse cell inside its edge.
      fine.fill(0);
      for (let o = p.octaves; o < p.octaves + p.fineOctaves; o += 1) {
        octaveRow(term, cxs[in0] * f, grid.cellCm * f, in1 - in0, cy * f, o, ns);
        for (let i = in0; i < in1; i += 1) fine[i] += term[i - in0];
      }
    }
    const base = l * nx;
    for (let i = 0; i < cols; i += 1) {
      const t = ts[i];
      const a = base + ks[i];
      let n = (1 - s) * ((1 - t) * coarse[a] + t * coarse[a + 1]) + s * ((1 - t) * coarse[a + nx] + t * coarse[a + nx + 1]);
      if (fineRow && i >= in0 && i < in1) {
        const inX = halfW - Math.abs(cxs[i]);
        const w = Math.min(1, Math.min(inX, inY) * ig);
        n += w * fine[i] * norm;
      }
      const prim = prepared.length === 0 ? 0 : primitivesOffsetCm(prepared, cxs[i], cy);
      value[i] = half * (n + 1) + prim;
    }
    out.writeRow(j * cols, value, cols);
  }
  const warnings: Warning[] = out.warnings();
  return ok(record(spec, grid, heights, datumCm, request), warnings);
}

/**
 * The flat fixture's constant raster (M0-c-01's fusion spike; C-0016): every cell `heightCm` above the datum (0 by
 * default), written through the same range check, with the hydrology grid sized as `buildTerrain`'s and no feature.
 */
export function flatTerrain(spec: TerrainSpec, heightCm = 0, datumCm = 0): KernelResult<Terrain> {
  if (!Number.isInteger(datumCm)) return err('E_OUT_OF_RANGE', 'datum');
  const grid = heightGrid(spec.frame, spec.params.cellCm);
  const heights = new Int32Array(grid.cols * grid.rows);
  const out = heightWriter(heights, spec.params.reliefLimitCm);
  for (let i = 0; i < heights.length; i += 1) out.write(i, heightCm);
  return ok(record(spec, grid, heights, datumCm === 0 ? 0 : datumCm, null), out.warnings());
}
