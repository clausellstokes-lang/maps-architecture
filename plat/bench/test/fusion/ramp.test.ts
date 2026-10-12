// M0-c-06: C-0034's synthetic prosperity ramp per stand-in district — `syntheticBandRamp(face, plaza, R)`: the band set's
// cuts (bands.json's default cuts) applied to 1 − d ÷ R at the face's centroid, d its distance to the plaza.
import { bandOf, defaultBandCuts } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { ringCentroid, syntheticBandRamp } from '../../src/fusion/index.js';

/** A square face of side s (cm) centred on (cx, cy), counter-clockwise. */
function square(cx: number, cy: number, s: number): { x: number; y: number }[] {
  const h = s / 2;
  return [
    { x: cx - h, y: cy - h },
    { x: cx + h, y: cy - h },
    { x: cx + h, y: cy + h },
    { x: cx - h, y: cy + h },
  ];
}

describe("syntheticBandRamp (C-0034's ramp)", () => {
  const plaza = { x: 0, y: 0 };
  const R = 100_000;

  it('reads 1 − d ÷ R at the face centroid, clamped to [0, 1]', () => {
    expect(syntheticBandRamp(square(0, 0, 2_000), plaza, R).value).toBe(1);
    const half = syntheticBandRamp(square(50_000, 0, 2_000), plaza, R);
    expect(half.value).toBeCloseTo(0.5, 12);
    expect(half.distanceCm).toBeCloseTo(50_000, 9);
    expect(syntheticBandRamp(square(30_000, 40_000, 2_000), plaza, R).value).toBeCloseTo(0.5, 12);
    expect(syntheticBandRamp(square(100_000, 0, 2_000), plaza, R).value).toBe(0);
    expect(syntheticBandRamp(square(250_000, 0, 2_000), plaza, R).value).toBe(0);
    // The plaza's own position enters: the same face nearer another plaza reads higher.
    expect(syntheticBandRamp(square(50_000, 0, 2_000), { x: 50_000, y: 0 }, R).value).toBe(1);
    // R enters: a doubled reach halves the drop.
    expect(syntheticBandRamp(square(50_000, 0, 2_000), plaza, 2 * R).value).toBeCloseTo(0.75, 12);
  });

  it('is read at the area-weighted centroid, not at a vertex or the vertex mean', () => {
    // An L-shaped face: the vertex mean and the centroid differ.
    const L = [
      { x: 0, y: 0 },
      { x: 30_000, y: 0 },
      { x: 30_000, y: 10_000 },
      { x: 10_000, y: 10_000 },
      { x: 10_000, y: 30_000 },
      { x: 0, y: 30_000 },
    ];
    const c = ringCentroid(L);
    // Two 10 × 30 and 20 × 10 rectangles: area 500, centroid ((300·5 + 200·20) / 500, (300·15 + 200·5) / 500).
    expect(c.x).toBeCloseTo(11_000, 6);
    expect(c.y).toBeCloseTo(11_000, 6);
    const r = syntheticBandRamp(L, plaza, R);
    expect(r.centroid.x).toBeCloseTo(11_000, 6);
    expect(r.value).toBeCloseTo(1 - Math.sqrt(2 * 11_000 * 11_000) / R, 12);
    // A closed ring (its first vertex repeated) reads the same.
    expect(ringCentroid([...L, L[0]])).toEqual(c);
  });

  it("bands the value by bands.json's default cuts (every band reachable along the ramp)", () => {
    const cuts = defaultBandCuts();
    const seen = new Set<string>();
    for (let i = 0; i <= 100; i += 1) {
      const r = syntheticBandRamp(square((i / 100) * R, 0, 200), plaza, R);
      expect(r.band).toBe(bandOf(r.value, cuts));
      seen.add(r.band);
    }
    expect([...seen].sort()).toEqual([...cuts.bands].sort());
    // 0.5 lies between the cuts 0.239 and 0.674: the comfortable band; 0.95 above 0.891: rich.
    expect(syntheticBandRamp(square(50_000, 0, 200), plaza, R).band).toBe('comfortable');
    expect(syntheticBandRamp(square(5_000, 0, 200), plaza, R).band).toBe('rich');
    // Given cuts are the ones read.
    const shifted = { bands: cuts.bands, cuts: [0.6, 0.7, 0.8, 0.9, 0.95] };
    expect(syntheticBandRamp(square(50_000, 0, 200), plaza, R, shifted).band).toBe(cuts.bands[0]);
  });

  it('refuses a reach that is not a length > 0', () => {
    expect(() => syntheticBandRamp(square(0, 0, 100), plaza, 0)).toThrow(/reach/);
    expect(() => syntheticBandRamp(square(0, 0, 100), plaza, -5)).toThrow(/reach/);
    expect(() => syntheticBandRamp(square(0, 0, 100), plaza, Number.NaN)).toThrow(/reach/);
  });
});
