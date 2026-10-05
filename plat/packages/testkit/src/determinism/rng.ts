// The harness's own seeded generator (M0-d-08): mulberry32, a published 32-bit generator, used only to draw the
// harness's permutations (slot permutations, op orders, rotation starts). It never reaches a model digest — the harness
// moves slots and op orders, never content — so the model's xoshiro128** streams (§6.1) are not spent on it.

/** A seeded generator of doubles in [0, 1). */
export type HarnessRng = () => number;

/** mulberry32 over a u32 seed. */
export function harnessRng(seed: number): HarnessRng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A whole number in [0, n). */
export function below(r: HarnessRng, n: number): number {
  return Math.floor(r() * n);
}

/** A Fisher–Yates shuffle of a copy. */
export function shuffled<T>(xs: readonly T[], r: HarnessRng): T[] {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = below(r, i + 1);
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}
