// kernel-boundary's planted file: scanned IN MEMORY as packages/kernel/src/zz-probe/leak.ts, never written there.
// Each `// planted:` line must be reported, and nothing else. Comments may say wall, street, district: they are exempt.
export interface StreetSegment { readonly a: number; readonly b: number } // planted: ident street
export const wallThicknessCm = 120; // planted: ident wall
export const PLOT_MIN_AREA = 4; // planted: ident plot
export function buildingFootprint(r: readonly number[]): number[] { return r.slice(); } // planted: ident building
export const KIND = 'market_square'; // planted: string market
export const label = `the ${KIND} of the town`; // planted: string town
export const geometricOnly = (ring: readonly number[]): number => ring.length; // a district is not named here
