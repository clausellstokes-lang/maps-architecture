// F-WALL's trace rungs M0 builds (§5.2 F-WALL: "Trace (fixed before growth, gates pinned — S3 for stage 1, S5a later):
// re-offset with a larger radius → topology-preserving union-simplify (booleans, §3.7) → …"; C-0085; M0-c-02).
// Detection: the smoothed trace self-intersects (two sides within the attraction distance, or folding back) or crosses
// the core (a reservation, or the previous enceinte at k ≥ 2).
//
// * The re-offset (C-0224 (6)): the trace's region re-offset out and back by the band's radius — the closing of the
//   region by a disc of radius `searchBandM` (the union of the region with its buffer, less the buffer of that union's
//   boundary), whose outer ring fills every notch narrower than twice the band and departs from the trace by at most
//   the band; each pin must still lie on it (within the attraction distance), where it is put back as a vertex.
// * The union-simplify: the trace's region under the non-zero rule (`booleans`' union), its outer ring — a crossing
//   resolved, the pinched-off loop dropped — with every pin on it; the caller simplifies it (the kernel's
//   topology-preserving `simplify`) and checks it as any trace.
// Both build only through the kernel's `buffer` and `booleans` (§3.7); a rung whose result fails the caller's checks is
// reported `held: false` and the next rung runs; the later rungs (open chains anchored on a barrier, arterial diversion,
// posterns, the setback cut) are M1's and the raised-way rung M3a's (C-0085), so a trace no M0 rung repairs is refused.
import { booleans, buffer, err, type KernelResult, type LatticePoint, type Ring } from '@plat/kernel';
import { area2, ccw, crossesCore, d2, footOn, inside, lat, openRing, selfTouches, TOUCH_CM } from './plane.js';
import type { XY } from './types.js';

/** What the detection found on a line: null when it is a lawful trace. */
export function defectOf(line: readonly XY[], core: readonly (readonly XY[])[]): 'self_touch' | 'core' | null {
  if (selfTouches(line)) return 'self_touch';
  if (crossesCore(line, core)) return 'core';
  return null;
}

/** The ring of `rings` that stands for the trace: the counter-clockwise one holding the core's first point, else the largest. */
export function outerOf(rings: readonly Ring[], core: readonly (readonly XY[])[]): LatticePoint[] | null {
  const outers = rings.filter((r) => area2(r) > 0);
  if (outers.length === 0) return null;
  const probe = core.length > 0 && core[0].length > 0 ? core[0][0] : null;
  if (probe !== null) {
    const holding = outers.filter((r) => inside(r, probe));
    if (holding.length > 0) return openRing(holding[0]) as LatticePoint[];
  }
  let best = outers[0];
  for (const r of outers) if (area2(r) > area2(best)) best = r;
  return openRing(best) as LatticePoint[];
}

/**
 * Each pin put back on the ring as a vertex: a pin already a vertex stays; one within the attraction distance of a side
 * is inserted there; null when a pin lies off the ring (the rung lost it).
 */
export function placePins(ring: readonly LatticePoint[], pins: readonly LatticePoint[]): LatticePoint[] | null {
  let cur: LatticePoint[] = [...ring];
  for (const p of pins) {
    if (cur.some((q) => q.x === p.x && q.y === p.y)) continue;
    let best = Infinity;
    let at = -1;
    for (let i = 0; i < cur.length; i += 1) {
      const f = footOn(p, cur[i], cur[i + 1 === cur.length ? 0 : i + 1]);
      if (f.d2 < best) {
        best = f.d2;
        at = i;
      }
    }
    if (at < 0 || best > TOUCH_CM * TOUCH_CM) return null;
    // A neighbour within the attraction distance of the pin gives way to it.
    const next = [...cur.slice(0, at + 1), p, ...cur.slice(at + 1)];
    const k = at + 1;
    cur = next.filter((q, i) => i === k || d2(q, p) > TOUCH_CM * TOUCH_CM || pins.some((r) => r.x === q.x && r.y === q.y));
  }
  return cur;
}

/** The ring closed (its first point repeated last), as `buffer` reads a chain. */
function closedChain(ring: readonly LatticePoint[]): LatticePoint[] {
  return [...ring, ring[0]];
}

/**
 * The re-offset rung: the closing of the line's region by a disc of `radiusCm` (see the module comment), its outer ring
 * with the pins put back; E_DEGENERATE `empty` when nothing is left, `fixed` when a pin is lost.
 */
export function reoffset(line: readonly LatticePoint[], radiusCm: number, pins: readonly LatticePoint[], core: readonly (readonly XY[])[]): KernelResult<LatticePoint[]> {
  const region = booleans('union', [ccw(line)], [], 'nonzero');
  if (!region.ok) return err(region.code, region.detail);
  const grown = buffer(region.value.map((r) => closedChain(openRing(r))), radiusCm, 'round', 'round');
  if (!grown.ok) return err(grown.code, grown.detail);
  const dilated = booleans('union', region.value, grown.value, 'nonzero');
  if (!dilated.ok) return err(dilated.code, dilated.detail);
  const rim = buffer(dilated.value.map((r) => closedChain(openRing(r))), radiusCm, 'round', 'round');
  if (!rim.ok) return err(rim.code, rim.detail);
  const closed = booleans('difference', dilated.value, rim.value, 'nonzero');
  if (!closed.ok) return err(closed.code, closed.detail);
  const outer = outerOf(closed.value, core);
  if (outer === null) return { ok: false, code: 'E_DEGENERATE', detail: 'empty' };
  const placed = placePins(outer, pins);
  if (placed === null) return { ok: false, code: 'E_DEGENERATE', detail: 'fixed' };
  return { ok: true, value: placed.map((p) => lat(p)), warnings: [] };
}

/**
 * The union-simplify rung's union: the line's region under the non-zero rule, its outer ring with the pins put back;
 * E_DEGENERATE `empty` / `fixed` as `reoffset`.
 */
export function unionOuter(line: readonly LatticePoint[], pins: readonly LatticePoint[], core: readonly (readonly XY[])[]): KernelResult<LatticePoint[]> {
  const region = booleans('union', [ccw(line)], [], 'nonzero');
  if (!region.ok) return err(region.code, region.detail);
  const outer = outerOf(region.value, core);
  if (outer === null) return { ok: false, code: 'E_DEGENERATE', detail: 'empty' };
  const placed = placePins(outer, pins);
  if (placed === null) return { ok: false, code: 'E_DEGENERATE', detail: 'fixed' };
  return { ok: true, value: placed, warnings: [] };
}
