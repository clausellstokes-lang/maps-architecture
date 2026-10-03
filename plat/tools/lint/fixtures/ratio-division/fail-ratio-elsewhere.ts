// lint-as: packages/layout/src/zz-fixture/fail.ts
// A function named ratio outside the kernel is no exemption: ratio() is the kernel's (§3.2 (8), C-0125).
export function ratio(num: number, den: number): number {
  return num / den; // planted: computedDivisor
}
