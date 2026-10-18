// arb.field (M0-k-01; the builds' "displacement fields for warps"; §3.4 `warp(tx, field, fromLevel, region)`, §3.6's
// moves, §7.1's brush table). A field is a brush about a lattice centre: `displace` drags by `dragCm` at full weight
// inside `innerRadiusCm`, falling linearly to 0 at `radiusCm`; `liquify` drags with a cosine falloff over the whole
// radius; `swirl` turns points about the centre by up to `strength` radians; `bloat` and `pinch` push points away from
// or toward the centre by `strength` of their distance; `jitter` moves each lattice point by a hashed amount in
// [−strength, strength] cm per axis — §7.1's pointwise kernels (C-0161 (6): `relax` and `equalize` read a cell's ring
// and are the edit layer's). Every field is a pure function of the point, exactly 0 at and beyond `radiusCm` (the
// held ground), bounded by `maxDisplacementCm`, and placed so that every point of its disc moved by it stays inside
// the range. `region` is the brush disc as a snapped counter-clockwise 16-gon (the `region` argument of `warp`).
import fc from 'fast-check';
import { dmath, fmix32, type LatticePoint } from '@plat/kernel';
import { TAU, place, posArb, pt, resolveLimit, resolveSize, scaleArb } from './lattice.js';
import type { FuzzBoundsOptions, FuzzRing } from './types.js';

/** The field kinds: §7.1's pointwise brush kernels. */
export type FuzzFieldKind = 'displace' | 'liquify' | 'swirl' | 'bloat' | 'pinch' | 'jitter';

/** Every field kind, in draw order. */
export const FUZZ_FIELD_KINDS: readonly FuzzFieldKind[] = Object.freeze(['displace', 'liquify', 'swirl', 'bloat', 'pinch', 'jitter']);

/** A displacement field for a warp (cm in, cm out). */
export interface FuzzField {
  readonly kind: FuzzFieldKind;
  readonly centre: LatticePoint;
  readonly radiusCm: number;
  readonly innerRadiusCm: number;
  /** swirl: radians (|·| ≤ π/4); bloat and pinch: a share of the distance (bloat > 0, pinch < 0, |·| ≤ ½); jitter: cm. */
  readonly strength: number;
  /** displace and liquify: the drag at full weight (cm). */
  readonly dragCm: { readonly x: number; readonly y: number };
  /** The brush disc as a snapped counter-clockwise 16-gon. */
  readonly region: FuzzRing;
  /** No point moves farther than this (cm). */
  readonly maxDisplacementCm: number;
  /** The displacement at (x, y), in cm (doubles): 0 at and beyond `radiusCm`. */
  displacement(x: number, y: number): { x: number; y: number };
}

/** The linear falloff: 1 inside the inner radius, 0 at and beyond the radius. */
function linear(r: number, inner: number, R: number): number {
  if (r >= R) return 0;
  if (r <= inner) return 1;
  return (R - r) / (R - inner);
}

/** The cosine falloff (1 + cos πr/R) / 2, 0 at and beyond the radius. */
function cosine(r: number, R: number): number {
  return r >= R ? 0 : (1 + dmath.cos((Math.PI * r) / R)) / 2;
}

/** A hashed number in [−1, 1] of a lattice point and a key (MurmurHash3's finaliser, the kernel's). */
function hashed(x: number, y: number, key: number): number {
  const h = fmix32((fmix32((x ^ key) >>> 0) ^ y) >>> 0);
  return (h / 4_294_967_295) * 2 - 1;
}

/** arb.field's options: the bounds (`sizeCm` bounds the radius; [100, 50 000] cm by default). */
export type FuzzFieldOptions = FuzzBoundsOptions;

/** Displacement fields; see the module comment. */
export function field(opts: FuzzFieldOptions = {}): fc.Arbitrary<FuzzField> {
  const limit = resolveLimit(opts.limitCm);
  const size = resolveSize(opts.sizeCm, [100, 50_000], Math.floor(limit / 4));
  return fc
    .record({
      kind: fc.integer({ min: 0, max: FUZZ_FIELD_KINDS.length - 1 }),
      R: scaleArb(size[0], size[1]),
      inner: fc.integer({ min: 0, max: 900 }),
      s: fc.integer({ min: 1, max: 1000 }),
      neg: fc.boolean(),
      dx: fc.integer({ min: -500, max: 500 }),
      dy: fc.integer({ min: -500, max: 500 }),
      key: fc.integer({ min: 0, max: 0x7fffffff }),
      fx: posArb,
      fy: posArb,
    })
    .map(({ kind, R, inner, s, neg, dx, dy, key, fx, fy }) => {
      const k = FUZZ_FIELD_KINDS[kind];
      // Every displaced point of the disc stays inside the range: |c| + R + max displacement ≤ limit.
      const c = pt(place(-limit + 2 * R, limit - 2 * R, fx), place(-limit + 2 * R, limit - 2 * R, fy));
      const innerR = Math.floor((R * inner) / 1000);
      const drag = { x: (R * dx) / 1000, y: (R * dy) / 1000 };
      const sign = neg ? -1 : 1;
      let strength = 0;
      let max = 0;
      if (k === 'displace' || k === 'liquify') max = Math.sqrt(drag.x * drag.x + drag.y * drag.y);
      else if (k === 'swirl') {
        strength = (sign * (Math.PI / 4) * s) / 1000;
        max = 2 * R * dmath.sin(Math.abs(strength) / 2);
      } else if (k === 'bloat' || k === 'pinch') {
        strength = ((k === 'bloat' ? 1 : -1) * s) / 2000;
        max = R * Math.abs(strength);
      } else {
        strength = Math.min(R / 4, 500) * (s / 1000);
        max = strength * Math.SQRT2;
      }
      const displacement = (x: number, y: number): { x: number; y: number } => {
        const vx = x - c.x;
        const vy = y - c.y;
        const r = Math.sqrt(vx * vx + vy * vy);
        if (!(r < R)) return { x: 0, y: 0 };
        if (k === 'displace') {
          const w = linear(r, innerR, R);
          return { x: drag.x * w, y: drag.y * w };
        }
        if (k === 'liquify') {
          const w = cosine(r, R);
          return { x: drag.x * w, y: drag.y * w };
        }
        if (k === 'swirl') {
          const a = strength * cosine(r, R);
          const ca = dmath.cos(a);
          const sa = dmath.sin(a);
          return { x: vx * ca - vy * sa - vx, y: vx * sa + vy * ca - vy };
        }
        if (k === 'bloat' || k === 'pinch') {
          const w = strength * cosine(r, R);
          return { x: vx * w, y: vy * w };
        }
        const w = strength * linear(r, innerR, R);
        const px = Math.round(x);
        const py = Math.round(y);
        return { x: w * hashed(px, py, key), y: w * hashed(py, px, key ^ 0x5bd1e995) };
      };
      const region: FuzzRing = [];
      for (let j = 0; j < 16; j += 1) region.push(pt(c.x + R * dmath.cos((TAU * j) / 16), c.y + R * dmath.sin((TAU * j) / 16)));
      const f: FuzzField = {
        kind: k,
        centre: c,
        radiusCm: R,
        innerRadiusCm: innerR,
        strength,
        dragCm: drag,
        region,
        maxDisplacementCm: max,
        displacement,
      };
      // fast-check prints a counterexample with this, so a failing field can be read and rebuilt.
      Object.defineProperty(f, fc.toStringMethod, {
        value: () =>
          `field(${k}, centre ${c.x},${c.y}, R ${R}, inner ${innerR}, strength ${strength}, drag ${drag.x},${drag.y}, key ${key})`,
      });
      return f;
    });
}
