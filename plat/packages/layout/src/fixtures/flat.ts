// The flat fixture (M0-c-01; §16 M0 (c) "a flat synthetic site at CITY face counts"; C-0016, C-0032): a CITY frame of
// 25 km² at aspect 1 with the 30 % margin (§1.1's rung row, through @plat/site's `siteFrame` over ladder.json), flat
// terrain — a constant height raster through M0-m-01's Terrain record (@plat/site's `flatTerrain`), no water — the
// land of §12.2's CITY matched walled area, 220 ha, split by §1.1's CITY shares (C-0016: stage 1 0.55, stage 2 0.33,
// ribbon 0.12 of the walled 0.88 → 137.5 / 82.5 / 30 ha), and a single nucleus at the frame's centre (C-0032). The
// fixture writes no arena; S3's streams are keyed by the town root (§6.1) under S3's stage id.
import { createRng, entityKey, ratio, seedKey, STAGES, type ConcernId, type LatticePoint, type Stream } from '@plat/kernel';
import { flatTerrain, GROUND_KEY, siteFrame, terrainParams, TERRAIN_ID } from '@plat/site';
import { rungProfile, tableView, type BaseRung, type TableView } from '@plat/tables';
import type { Site, WaterPlan } from '../siting/types.js';

/**
 * §12.2's matched walled area at CITY (MFCG size 80: 5 242 buildings / 220 ha) — the fixture's land anchor (C-0016).
 * A design figure of the size table, not a calibratable cell: the fixture's input, as a test's own value.
 */
export const CITY_MATCHED_WALLED_HA = 220;

/** The flat fixture's options: a smaller frame (§4.13 EP-20's capped case), another walled area, an empty water plan. */
export interface FlatFixtureOptions {
  /** The frame's area (ha) in place of the rung's target (2 500 ha at CITY). */
  frameAreaHa?: number;
  /** The walled area the stage shares split (ha); default §12.2's 220. */
  walledHa?: number;
  /** Planned water and crossing sites (default none: the flat fixture has no water). */
  water?: WaterPlan;
  /** The terrain's constant height (cm above datum); default 0. */
  heightCm?: number;
  tables?: TableView;
}

/** Rounded to a millionth of a hectare (1 cm²): the shares' products carry the doubles' last-bit error. */
function hectares(v: number): number {
  return Math.round(v * 1_000_000) / 1_000_000;
}

/**
 * The flat fixture at `seed` (C-0016, C-0032): CITY, a 25 km² frame at aspect 1 with the 30 % margin, a constant height
 * raster, no water, 220 ha walled split 137.5 / 82.5 / 30 ha, one nucleus at the frame's centre.
 */
export function flatFixture(seed: number, opts: FlatFixtureOptions = {}): Site {
  if (!Number.isSafeInteger(seed)) throw new RangeError(`flatFixture: the seed is a safe integer, got ${String(seed)}`);
  const rung: BaseRung = 'CITY';
  const tables = opts.tables ?? tableView();
  const profile = rungProfile(rung);
  const frame = siteFrame(opts.frameAreaHa === undefined ? { aspect: 1 } : { areaHa: opts.frameAreaHa, aspect: 1 }, profile, tables);
  if (!frame.ok) throw new RangeError(`flatFixture: the frame: ${frame.code} ${frame.detail}`);
  const made = flatTerrain({ id: TERRAIN_ID, key: GROUND_KEY, frame: frame.value, params: terrainParams(tables, rung), epoch: 0 }, opts.heightCm ?? 0, 0);
  if (!made.ok) throw new RangeError(`flatFixture: the terrain: ${made.code} ${made.detail}`);

  // The stage lands (C-0016): the walled area is the walled shares' sum of the whole; each stage its share of it.
  const rows = profile.stageRows;
  const walledHa = opts.walledHa ?? CITY_MATCHED_WALLED_HA;
  let walledShare = 0;
  for (const s of rows.walledShares) walledShare += s;
  // The whole = walled ÷ Σ walled shares, divided in basis points (a count ≥ 1, §3.2 (8)'s floor).
  const whole = ratio(walledHa * 10_000, Math.round(walledShare * 10_000), 'count');
  if (!whole.ok) throw new RangeError('flatFixture: the walled shares sum below one basis point');
  const totalHa = whole.value;
  const stagesHa: number[] = [];
  for (const s of rows.walledShares) stagesHa.push(hectares(s * totalHa));
  stagesHa.push(hectares(rows.ribbonShare * totalHa));

  const w = frame.value.widthCm;
  const h = frame.value.heightCm;
  // The frame centred on (0, 0) (kernel frameOf): its rectangle on whole centimetres, counter-clockwise.
  const x0 = -Math.floor(w / 2);
  const y0 = -Math.floor(h / 2);
  const x1 = x0 + w;
  const y1 = y0 + h;
  const frameRing = [pt(x0, y0), pt(x1, y0), pt(x1, y1), pt(x0, y1)];
  const townKey = entityKey(seedKey(seed), [0, 0], GROUND_KEY);
  return {
    seed,
    rung,
    rungProfile: profile,
    tables,
    frame: frame.value,
    frameRing,
    terrain: made.value,
    water: opts.water ?? { faces: [], decks: [] },
    centre: pt(0, 0),
    land: { walledHa, stagesHa, regimes: [...rows.regimes] },
    townKey,
    stream(concern: ConcernId, attempt = 0): Stream {
      // A fresh derivation per call: the same concern asked twice starts its stream afresh, so each S3 step is a
      // function of its inputs alone.
      return createRng().stream(townKey, STAGES.S3, concern, { reroll: 0, attempt, epoch: 0, salt: 0 });
    },
  };
}

function pt(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}
