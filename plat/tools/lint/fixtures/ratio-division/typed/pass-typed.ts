// With type information, an imported const whose type is a non-zero literal is a literal divisor.
import { CM_PER_M } from './constants.js';
export const metres = (cm: number): number => cm / CM_PER_M;
// A cast of a literal-typed const keeps its own type.
export const widenedCast = (cm: number): number => cm / (CM_PER_M as number);
// Hardening round S1 (note N13; C-0128 (4)): `n!` is judged by its own type — the literal 2 once undefined is removed —
// not by the declared `2 | undefined` of `n` under it.
declare const maybeTwo: 2 | undefined;
export const halved = (x: number): number => x / maybeTwo!;
