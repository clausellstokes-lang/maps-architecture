// Local bindings named like the globals are not global reads; code-unit comparison needs no locale.
declare function makeClock(): { now(): number };
export function f(performance: { now(): number }, a: string, b: string): number {
  const Date = makeClock();
  const order = a < b ? -1 : a > b ? 1 : 0;
  return performance.now() + Date.now() + order + Math.floor(1.5) + String(1).length;
}
export const ok = globalThis.Math.max(1, 2) + (1).toString().length;
// globalThis as a member's object with a static name, or in a type, reads no forbidden global (C-0128).
export const n: typeof globalThis.Number = globalThis.Number;
