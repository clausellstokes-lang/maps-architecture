// Hardening round S1 (L14, note N8): a forbidden global named only as a type is no read — unresolvedValueRefs skips a
// type-only reference, so a Date or an Intl type in a signature passes.
export let stamp: Date | null = null;
export type Format = Intl.DateTimeFormat;
export function keep(d: Date, f: Intl.NumberFormatOptions): [Date, Intl.NumberFormatOptions] {
  return [d, f];
}
