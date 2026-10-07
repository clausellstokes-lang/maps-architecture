// kernel-boundary's clean file: geometry vocabulary only; the comments may name a wall, a street or a district freely.
export interface Segment { readonly a: number; readonly b: number }
export const bufferRing = (ring: readonly number[], halfWidthCm: number): number[] => ring.map((v) => v + halfWidthCm);
export const plotline = 'plotline'; // one word, not `plot`: matching is by whole word after camelCase/underscore splitting
export const message = 'a ring must close';
