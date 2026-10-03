// A division by a computed value goes through ratio() (§3.2 (8), C-0044).
declare function len(): number;
let mutable = 2;
export function f(x: number, y: number, o: { n: number }): number {
  let z = x / y; // planted: computedDivisor
  z += x / len(); // planted: computedDivisor
  z += x / (y + 1); // planted: computedDivisor
  z += x / o.n; // planted: computedDivisor
  z += x / mutable; // planted: computedDivisor
  z /= y; // planted: computedDivisor
  z += x / 0; // planted: zeroDivisor
  return z;
}
