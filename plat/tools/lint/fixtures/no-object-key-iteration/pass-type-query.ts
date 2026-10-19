// Hardening round S1 (note N11): a global as the whole operand of a type query is a type, not a value use
// (inTypePosition's TSTypeQuery clause): `typeof Object` names no enumeration, and `typeof globalThis` reads nothing.
type O = typeof Object;
export let g: typeof globalThis | null = null;
export const keyOf = (o: O | null): boolean => o === null;
