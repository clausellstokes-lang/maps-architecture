// The main plaza (§4.2 S3 (2), MFP-3; M0-c-01): "a compact 4–6-vertex polygon at the nucleus aligned to the contours,
// compactness ≥ 0.8, whose vertices are the attach points arterials end at", in the rung's area band (TOWN 0.25–0.45 ha,
// CITY 0.35–0.6, METROPOLIS 0.45–0.8). No quadrilateral reaches 4π·A ÷ P² ≥ 0.8 (the square's π ÷ 4 ≈ 0.785 is the
// most), so the plaza draws 5 or 6 vertices (C-0201 (3)). The draws come from the `reserve.plaza` stream in a fixed
// order: the vertex count, the area, the phase (when no contour bearing aligns it), then per vertex an angle and a
// radius jitter; the polygon is scaled about the nucleus to the drawn area and snapped (§3.2 (7)).
import { dmath, type LatticePoint, type Stream } from '@plat/kernel';
import type { BaseRung } from '@plat/tables';
import { area2Of, compactnessOf, latticeAt, PI, quot, type XY } from './geom.js';
import type { Plaza } from './types.js';

/**
 * §4.2 S3 (2)'s plaza area bands (ha) by rung — design values held here until M1's reservation rows (the tables'
 * files are M0-s-02's; C-0201 (3)).
 */
export const PLAZA_AREA_BAND_HA: Readonly<Record<BaseRung, readonly [number, number]>> = Object.freeze({
  TOWN: Object.freeze([0.25, 0.45] as const),
  CITY: Object.freeze([0.35, 0.6] as const),
  METROPOLIS: Object.freeze([0.45, 0.8] as const),
});

/** §4.2 S3 (2)'s compactness floor of the main plaza (4π·A ÷ P²). */
export const PLAZA_COMPACTNESS_MIN = 0.8;

/** The vertex counts the plaza draws among (C-0201 (3): the design's 4–6 less the quadrilateral). */
export const PLAZA_VERTICES: readonly [number, number] = Object.freeze([5, 6] as const);

/** The per-vertex jitter: ± 3° of angle and ± 5 % of radius (an own pick, C-0201 (3); compactness stays ≥ 0.83). */
const ANGLE_JITTER = (3 * PI) / 180;
const RADIUS_JITTER = 0.05;

/** The plaza's options: the rung's band and a contour bearing to align a side with (§4.2 S3 (2)). */
export interface PlazaOptions {
  rung?: BaseRung;
  /** The contour direction at the nucleus (cdeg, compass); absent on flat ground: the phase is drawn. */
  contourBearingCdeg?: number;
}

/**
 * The main plaza at `centre` (§4.2 S3 (2)): 5 or 6 vertices, its area drawn inside the rung's band, compactness
 * ≥ 0.8, counter-clockwise; its vertices are the attach points. Reads `stream` (the `reserve.plaza` concern).
 */
export function plaza(centre: LatticePoint, stream: Stream, opts: PlazaOptions = {}): Plaza {
  const band = PLAZA_AREA_BAND_HA[opts.rung ?? 'CITY'];
  const n = stream.int(PLAZA_VERTICES[0], PLAZA_VERTICES[1]);
  // The area inside the band, kept 1 % of the band off each end so the snap's sub-centimetre moves stay inside.
  const areaHa = band[0] + (band[1] - band[0]) * (0.01 + 0.98 * stream.float01());
  let phase: number;
  if (opts.contourBearingCdeg === undefined) {
    phase = 2 * PI * stream.float01();
  } else {
    // A side along the contour: the first side's direction is the bearing; side k runs from vertex k to k + 1, so the
    // first vertex sits at the bearing's angle − 90° − 180°/n from the centre (polar, counter-clockwise from +x).
    const th = (9_000 - opts.contourBearingCdeg) * (PI / 18_000);
    phase = th - PI / 2 - quot(PI, n, 'count', 'plaza phase');
  }
  const raw: XY[] = [];
  for (let k = 0; k < n; k += 1) {
    const a = phase + quot(2 * PI * k, n, 'count', 'plaza angle') + ANGLE_JITTER * (2 * stream.float01() - 1);
    const r = 1 + RADIUS_JITTER * (2 * stream.float01() - 1);
    raw.push({ x: r * dmath.cos(a), y: r * dmath.sin(a) });
  }
  const unit = Math.abs(area2Of(raw)) * 0.5;
  const scale = Math.sqrt(quot(areaHa * 100_000_000, unit, 'count', 'plaza scale'));
  const ring = raw.map((p) => latticeAt(centre.x + p.x * scale, centre.y + p.y * scale));
  return { ring, areaCm2: Math.abs(area2Of(ring)) * 0.5, compactness: compactnessOf(ring), vertices: n };
}
