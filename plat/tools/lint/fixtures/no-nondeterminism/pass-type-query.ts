// Hardening round S1 (note N11): a global as the whole operand of a type query is a type, not a value read
// (inTypePosition's TSTypeQuery clause): `typeof globalThis` and `typeof Object` read nothing.
export type O = typeof Object;
export let g: typeof globalThis | null = null;
