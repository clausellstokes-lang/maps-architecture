// S1 (5), (8), (9)'s parameters (M0-e-03; §4.2 S1 (5): "the search band (the base settings cell
// `crossing.searchBandM`)", "a minimum spacing (FTG's 40 m as the default)", "typed `ford` (width < table)"; S1 (9):
// "each 50 m bank stretch (`outfallStretchM`)"): terrain.json's crossing and outfall cells read once through the
// TableView, and the values the table does not hold, picked here as named constants (C-0229) — terrain.json is M0-s-02's
// and no later item writes it.
import type { TableView } from '@plat/tables';
import { ESTUARY_LENGTH_M } from '../hydro/params.js';

/** A water polygon's ring part smaller than this (cm², 4 m²) is a boolean's sliver, dropped (C-0229 (2)). */
export const SLIVER_AREA_CM2 = 40_000;

/**
 * A course point seeds its body's L0 face only this far (cm) inside its polygon: past the insertion's fidelity bound
 * (2 · √2 · attractCm ≈ 74 cm, §3.6), so the point lies inside the body's face in the arena too (C-0229 (3)).
 */
export const SEED_DEPTH_CM = 100;

/**
 * A deck end keeps this far (cm) from the arena's outer ring and from every other water body's polygon, so its
 * `deck_end` vertex lies on its own body's bank, never on a shared or a ring edge (C-0229 (5)).
 */
export const DECK_CLEARANCE_CM = 1_000;

/** A deck longer than this many times its reach's width there is a ray along a bend, not a crossing (C-0229 (5)). */
export const DECK_SPAN_SHARE_MAX = 3;

/**
 * The basic estuary's length: one quantity with M0-e-02's `ESTUARY_LENGTH_M` (§4.2 S1 (3) *Mouths*; C-0173 (7), C-0229
 * (4)) — the stretch the width law widens is the reach typed `estuary`.
 */
export const ESTUARY_SPLIT_M = ESTUARY_LENGTH_M;

/** One rung-independent set of S1 (5) and (9) cells, in centimetres. */
export interface WaterParams {
  /** crossing.searchBandM: the window along a reach in which its narrowest point becomes a site. */
  searchBandCm: number;
  /** crossing.minSpacingM: no two decks closer. */
  minSpacingCm: number;
  /** crossing.fordMaxWidthM: a site narrower than this is a ford. */
  fordMaxWidthCm: number;
  /** settings.outfallStretchM: one outfall per bank stretch and per frame-edge stretch of this length. */
  outfallStretchCm: number;
}

/** terrain.json's crossing and outfall cells (a missing or mistyped cell is the loader's refusal). */
export function waterParams(tables: TableView): WaterParams {
  const t = tables.table('terrain');
  return Object.freeze({
    searchBandCm: t.num('crossing', 'searchBandM') * 100,
    minSpacingCm: t.num('crossing', 'minSpacingM') * 100,
    fordMaxWidthCm: t.num('crossing', 'fordMaxWidthM') * 100,
    outfallStretchCm: t.num('settings', 'outfallStretchM') * 100,
  });
}
