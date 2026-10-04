// The authored site primitives in their basic form (M0-e-01; §4.2 S1 (1): "hill, spur, valley along the river bearing,
// terrace, cliff, ravine, hollow … — VG's idea of authored mount, hollow and ridge primitives"): hill, valley, terrace
// and cliff, each a height offset in centimetres added to the fBm at a point. Spur, ravine and the hollow of a lake or an
// oasis are M1's, with the coast, lakes and the oasis (C-0165 (2)). Every parameter is the request's; nothing is drawn.
//
// Bearings are compass bearings in centidegrees, clockwise from north (+y): the direction (sin θ, cos θ), its right-hand
// normal (cos θ, −sin θ) (C-0165 (2)); the trigonometry is dmath's (§6.5 (2)).
import { dmath, ratio } from '@plat/kernel';
import type { CliffPrimitive, HillPrimitive, SitePrimitive, SitePrimitiveKind, TerracePrimitive, ValleyPrimitive } from './types.js';

/** π, to the double. */
const PI = 3.141592653589793;
/** Radians per centidegree: π ÷ 18 000. */
const RAD_PER_CDEG = PI / 18000;

/** The smooth bump (1 − t²)² for t² < 1, else 0: 1 at its centre, 0 with zero slope at its rim. */
function bump(t2: number): number {
  if (!(t2 < 1)) return 0;
  const u = 1 - t2;
  return u * u;
}

/** smoothstep: 0 below 0, 1 above 1, t²(3 − 2t) between. */
function smoothstep(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t * t * (3 - 2 * t);
}

/** 1 ÷ v for a length v ≥ 1 cm, else a RangeError naming the primitive's field. */
function inverse(v: number, what: string): number {
  const r = ratio(1, v, 'length');
  if (!r.ok) throw new RangeError(`site primitive: ${what} must be at least 1 cm, got ${String(v)}`);
  return r.value;
}

/** A primitive prepared for evaluation: its height offset at (x, y), in cm. */
export interface PreparedPrimitive {
  readonly kind: SitePrimitiveKind;
  offsetCm(x: number, y: number): number;
}

function finite(v: number, what: string): number {
  if (!Number.isFinite(v)) throw new RangeError(`site primitive: ${what} is not finite`);
  return v;
}

function prepareHill(p: HillPrimitive): PreparedPrimitive {
  const h = finite(p.heightM, 'hill heightM') * 100;
  const r = finite(p.radiusM, 'hill radiusM') * 100;
  const invR = inverse(r, 'hill radiusM');
  const ax = p.at.x;
  const ay = p.at.y;
  return {
    kind: 'hill',
    offsetCm(x, y) {
      const dx = (x - ax) * invR;
      const dy = (y - ay) * invR;
      return h * bump(dx * dx + dy * dy);
    },
  };
}

function direction(bearingCdeg: number): { sx: number; cy: number } {
  const th = finite(bearingCdeg, 'bearingCdeg') * RAD_PER_CDEG;
  return { sx: dmath.sin(th), cy: dmath.cos(th) };
}

function prepareValley(p: ValleyPrimitive): PreparedPrimitive {
  const d = finite(p.depthM, 'valley depthM') * 100;
  const invHalf = inverse(finite(p.widthM, 'valley widthM') * 50, 'valley widthM ÷ 2');
  const { sx, cy } = direction(p.bearingCdeg);
  const ax = p.at.x;
  const ay = p.at.y;
  return {
    kind: 'valley',
    offsetCm(x, y) {
      // The signed distance from the valley's line along its right-hand normal (cos θ, −sin θ).
      const s = ((x - ax) * cy - (y - ay) * sx) * invHalf;
      const b = bump(s * s);
      return b === 0 ? 0 : -d * b;
    },
  };
}

function prepareTerrace(p: TerracePrimitive): PreparedPrimitive {
  const h = finite(p.heightM, 'terrace heightM') * 100;
  const invR = inverse(finite(p.radiusM, 'terrace radiusM') * 100, 'terrace radiusM');
  if (!(Number.isInteger(p.steps) && p.steps >= 1)) throw new RangeError(`site primitive: terrace steps must be an integer ≥ 1, got ${String(p.steps)}`);
  const steps = p.steps;
  const invSteps = inverse(steps, 'terrace steps');
  const ax = p.at.x;
  const ay = p.at.y;
  return {
    kind: 'terrace',
    offsetCm(x, y) {
      const dx = (x - ax) * invR;
      const dy = (y - ay) * invR;
      return h * Math.floor(steps * bump(dx * dx + dy * dy)) * invSteps;
    },
  };
}

function prepareCliff(p: CliffPrimitive): PreparedPrimitive {
  const h = finite(p.heightM, 'cliff heightM') * 100;
  const w = finite(p.widthM, 'cliff widthM') * 100;
  const invW = inverse(w, 'cliff widthM');
  const half = finite(p.lengthM, 'cliff lengthM') * 50;
  if (!(half >= 0)) throw new RangeError('site primitive: cliff lengthM must not be negative');
  const { sx, cy } = direction(p.bearingCdeg);
  const ax = p.at.x;
  const ay = p.at.y;
  return {
    kind: 'cliff',
    offsetCm(x, y) {
      const rx = x - ax;
      const ry = y - ay;
      const along = rx * sx + ry * cy;
      const across = rx * cy - ry * sx;
      const end = (half + w - Math.abs(along)) * invW;
      if (!(end > 0)) return 0;
      return h * smoothstep(across * invW + 0.5) * (end < 1 ? end : 1);
    },
  };
}

/**
 * The four primitive kinds M0 builds (§4.2 S1 (1)), each a preparer: the request's primitive → its height offset in
 * centimetres at any point of the arena. A preparer refuses (RangeError) a non-finite value, a radius, width or step
 * count below one, so a request never divides by nothing.
 */
export const sitePrimitives: Readonly<{ [K in SitePrimitiveKind]: (p: Extract<SitePrimitive, { kind: K }>) => PreparedPrimitive }> = Object.freeze({
  hill: prepareHill,
  valley: prepareValley,
  terrace: prepareTerrace,
  cliff: prepareCliff,
});

/** Prepares one primitive by its kind. */
export function preparePrimitive(p: SitePrimitive): PreparedPrimitive {
  switch (p.kind) {
    case 'hill':
      return sitePrimitives.hill(p);
    case 'valley':
      return sitePrimitives.valley(p);
    case 'terrace':
      return sitePrimitives.terrace(p);
    case 'cliff':
      return sitePrimitives.cliff(p);
  }
}

/** The summed offset of prepared primitives at (x, y), in cm, added in the request's order. */
export function primitivesOffsetCm(prepared: readonly PreparedPrimitive[], x: number, y: number): number {
  let sum = 0;
  for (const p of prepared) sum += p.offsetCm(x, y);
  return sum;
}
