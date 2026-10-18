// With type information, an imported const whose type is a non-zero literal is a literal divisor.
import { CM_PER_M } from './constants.js';
export const metres = (cm: number): number => cm / CM_PER_M;
// A cast of a literal-typed const keeps its own type.
export const widenedCast = (cm: number): number => cm / (CM_PER_M as number);
