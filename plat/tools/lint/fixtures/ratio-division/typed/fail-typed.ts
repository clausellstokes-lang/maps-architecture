// An imported const of literal type 0, and a widened number, are refused.
import { ZERO } from './constants.js';
export const bad = (x: number): number => x / ZERO; // planted: computedDivisor
export const widened = (x: number, n: number): number => x / n; // planted: computedDivisor
// A cast to a literal type is no literal divisor: the type judged is the expression's own (C-0128).
export const cast = (x: number, n: number): number => x / (n as 2); // planted: computedDivisor
