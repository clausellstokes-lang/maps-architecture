// The finaliser round's inverse (item M0-d-01; C-0143 (1)): shared by mixer.test.ts, which proves the round a bijection
// on 128 bits, rng.test.ts, which builds entity keys whose stream keys share Rng.stream's 30-bit bucket, and
// stream.test.ts, which builds a key whose first output is int's rejection limit (inverseOdd). Test-only.
import type { Hash128 } from '../../src/hash/index.js';

/** The multiplicative inverse of an odd a modulo 2³² (Newton's iteration). */
export function inverseOdd(a: number): number {
  let y = a;
  for (let i = 0; i < 5; i += 1) y = Math.imul(y, 2 - Math.imul(a, y));
  return y >>> 0;
}

/** fmix32⁻¹. */
export function unfmix32(h: number): number {
  let x = h | 0;
  x ^= x >>> 16;
  x = Math.imul(x, inverseOdd(0xc2b2ae35));
  x ^= (x >>> 13) ^ (x >>> 26);
  x = Math.imul(x, inverseOdd(0x85ebca6b));
  x ^= x >>> 16;
  return x >>> 0;
}

/** The finaliser round's inverse: undo the sums, fmix32 on every lane, undo the sums. */
export function unfinalise(k: readonly number[]): Hash128 {
  const unsum = (h1: number, h2: number, h3: number, h4: number): [number, number, number, number] => {
    const b2 = (h2 - h1) | 0;
    const b3 = (h3 - h1) | 0;
    const b4 = (h4 - h1) | 0;
    return [(h1 - b2 - b3 - b4) | 0, b2, b3, b4];
  };
  const [a1, a2, a3, a4] = unsum(k[0] | 0, k[1] | 0, k[2] | 0, k[3] | 0);
  const [c1, c2, c3, c4] = unsum(unfmix32(a1), unfmix32(a2), unfmix32(a3), unfmix32(a4));
  return [c1 >>> 0, c2 >>> 0, c3 >>> 0, c4 >>> 0];
}
