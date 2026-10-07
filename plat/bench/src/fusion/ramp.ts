// C-0034's synthetic prosperity ramp, read per stand-in district (M0-c-06; §4.6 "S8 per district at its pass-1 band",
// §16 M0 (c); C-0034, readings C-0268 (2)). The fusion run (a) has no S6: each walled S5 coarse face is its own stand-in
// district, and its band is the band set's cuts (bands.json's default cuts, the cuts of a uniform field, C-0155) applied
// to 1 − d ÷ R, d the distance from the face's centroid to the plaza and R the stage-1 level set's reach — so the infill
// is exercised at every band. The value goes to S8 as the district's pass-1 prosperity (S8 reads its granularity bands
// from it, M0-b-01); the band name is the report's grouping.
import { bandOf, defaultBandCuts, type BandCuts } from '@plat/tables';

/** A point in integer centimetres. */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** The ramp's reading of one face: the ramp value in [0, 1], its band and the distance it was read at. */
export interface RampReading {
  /** 1 − d ÷ R, clamped to [0, 1]. */
  readonly value: number;
  /** The band of the value under the band set's cuts. */
  readonly band: string;
  /** d (cm): the face centroid's distance to the plaza. */
  readonly distanceCm: number;
  readonly centroid: XY;
}

/** The area-weighted centroid of a ring (open or closed; integer cm); the vertex mean for a degenerate ring. */
export function ringCentroid(ring: readonly XY[]): XY {
  const n = ring.length > 1 && ring[0].x === ring[ring.length - 1].x && ring[0].y === ring[ring.length - 1].y ? ring.length - 1 : ring.length;
  if (n === 0) throw new RangeError('ringCentroid: an empty ring');
  // Relative to the first vertex, so the products stay small on a lattice of centimetres.
  const ox = ring[0].x;
  const oy = ring[0].y;
  let a2 = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < n; i += 1) {
    const p = ring[i];
    const q = ring[(i + 1) % n];
    const px = p.x - ox;
    const py = p.y - oy;
    const qx = q.x - ox;
    const qy = q.y - oy;
    const c = px * qy - qx * py;
    a2 += c;
    cx += (px + qx) * c;
    cy += (py + qy) * c;
  }
  if (a2 === 0) {
    let sx = 0;
    let sy = 0;
    for (let i = 0; i < n; i += 1) {
      sx += ring[i].x;
      sy += ring[i].y;
    }
    return { x: sx / n, y: sy / n };
  }
  return { x: ox + cx / (3 * a2), y: oy + cy / (3 * a2) };
}

/**
 * `syntheticBandRamp(face, plaza, R)` (C-0034): the band of a stand-in district's face — the ramp 1 − d ÷ R at the
 * face's outer-ring centroid, d its distance to `plaza`, clamped to [0, 1], cut by `cuts` (bands.json's default cuts
 * unless given). Refuses a reach that is not a length > 0.
 */
export function syntheticBandRamp(face: readonly XY[], plaza: XY, R: number, cuts: BandCuts = defaultBandCuts()): RampReading {
  if (!(Number.isFinite(R) && R > 0)) throw new RangeError(`syntheticBandRamp: the reach R is a length > 0 (cm), got ${String(R)}`);
  const c = ringCentroid(face);
  const d = Math.sqrt((c.x - plaza.x) * (c.x - plaza.x) + (c.y - plaza.y) * (c.y - plaza.y));
  const value = Math.min(1, Math.max(0, 1 - d / R));
  return { value, band: bandOf(value, cuts), distanceCm: d, centroid: c };
}
