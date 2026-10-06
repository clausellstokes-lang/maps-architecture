// The settlement perimeter (M0-e-04; §4.5 *Perimeter and margin band*; §4.1's S6 row): the last stage's boundary
// offset outward by the ribbon regime's block-depth band top (50 m, `district.perimeter.offsetM`) and rounded — the
// union of the boundary and its ring's buffer with round joins and ends (§3.4's `buffer`, §3.7's chords), so every
// convex corner becomes an arc of the offset's radius (C-0242 (1)) — clipped to the frame where it would leave it
// (the map border closes it there). The ring is a value; S6's batch inserts it as an L1 chain carrying
// `district_bound`, closed against the arterials and shores it meets by the insertion rules (§3.6).
import { area2, err, ok, type Kernel, type KernelResult, type LatticePoint } from '@plat/kernel';
import type { TableView } from '@plat/tables';
import { districtCells } from './table.js';

/** The options of `settlementPerimeter`. */
export interface PerimeterOptions {
  /** The frame rectangle (counter-clockwise): the perimeter is clipped to it. Absent: no clip. */
  readonly frame?: readonly LatticePoint[];
  /** The offset (cm) in place of `district.perimeter.offsetM`. */
  readonly offsetCm?: number;
  readonly tables?: TableView;
}

/** The ring of largest area among the outer (counter-clockwise) rings, or null. */
function largestOuter(rings: readonly (readonly LatticePoint[])[]): LatticePoint[] | null {
  let best: LatticePoint[] | null = null;
  let bestArea = 0;
  for (const r of rings) {
    const a = area2(r as LatticePoint[]);
    if (a > bestArea) {
      bestArea = a;
      best = r.slice();
    }
  }
  return best;
}

/**
 * §4.5's settlement perimeter of `boundary` (a counter-clockwise ring of lattice points): the outer ring of the
 * boundary united with its buffer of the offset (round joins and ends), clipped to `opts.frame` when given. Refuses
 * E_DEGENERATE for a boundary of fewer than three points or of no area.
 */
export function settlementPerimeter(boundary: readonly LatticePoint[], k: Kernel, opts: PerimeterOptions = {}): KernelResult<LatticePoint[]> {
  if (boundary.length < 3 || area2(boundary as LatticePoint[]) <= 0) return err('E_DEGENERATE', 'settlementPerimeter: the boundary is no counter-clockwise ring of area above zero');
  const offsetCm = opts.offsetCm ?? Math.round(districtCells(opts.tables).perimeterOffsetM * 100);
  if (!(offsetCm >= 0 && Number.isFinite(offsetCm))) throw new RangeError(`settlementPerimeter: the offset is a finite length ≥ 0, got ${String(offsetCm)}`);
  let ring: LatticePoint[] = boundary.slice();
  if (offsetCm > 0) {
    const closed = [...boundary, boundary[0]];
    const b = k.geom.buffer([closed], offsetCm, 'round', 'round');
    if (!b.ok) return err(b.code, `settlementPerimeter: the buffer: ${b.detail}`);
    const u = k.geom.booleans('union', [boundary.slice()], b.value, 'nonzero');
    if (!u.ok) return err(u.code, `settlementPerimeter: the union: ${u.detail}`);
    const outer = largestOuter(u.value);
    if (outer === null) return err('E_DEGENERATE', 'settlementPerimeter: the offset has no outer ring');
    ring = outer;
  }
  if (opts.frame !== undefined) {
    const c = k.geom.booleans('intersection', [ring], [opts.frame.slice()], 'nonzero');
    if (!c.ok) return err(c.code, `settlementPerimeter: the frame clip: ${c.detail}`);
    const outer = largestOuter(c.value);
    if (outer === null) return err('E_DEGENERATE', 'settlementPerimeter: the perimeter lies outside the frame');
    ring = outer;
  }
  return ok(ring);
}
