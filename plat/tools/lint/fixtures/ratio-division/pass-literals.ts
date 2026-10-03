// Divisors that are non-zero literals, or same-file consts bound to one; ratio() itself.
const HALF_DIVISOR = 2;
const NEGATIVE = -0.5;
const CM_PER_M = 100 as const;
export function f(x: number, big: bigint): number {
  let y = x / 2 + x / -0.5 + x / 1e3 + x / HALF_DIVISOR + x / NEGATIVE + x / CM_PER_M;
  y /= 4;
  return y + Number(big / 3n);
}
export function ratio(num: number, den: number): number {
  return num / den;
}
export const ratioArrow = { ratio: (a: number, b: number): number => a / b };
