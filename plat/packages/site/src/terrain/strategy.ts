// The base TerrainStrategy (M0-e-01; §4.12, §4.2 S1 (1), §3.2 (9), §6.1): `terrain(bp, ctx, k)` reads the rung's
// terrain cells and the frame law from the context's tables, draws `terrain.noise` on the town root's key and builds
// S1 (1)'s heightfield. At M0 the strategy is S1 (1)'s; S1 (3)'s hydrology (M0-e-02) fills the record's flow arrays,
// S1 (9)'s outfalls (M0-e-03) its outfalls, and S1 (10)'s resources are `siteResources`, which the S1 stage calls after
// the water (C-0165 (5)).
import { CONCERNS, err, frameOf, ratio, type Frame, type Handle, type KernelResult } from '@plat/kernel';
import type { Id, StageContext, Terrain } from '@plat/model';
import { BASE_RUNGS, type BaseRung, type RungProfile, type TableView } from '@plat/tables';
import { buildTerrain, GROUND_KEY } from './heightfield.js';
import { terrainParams } from './params.js';
import type { SiteEnv, TerrainBlueprint, TerrainStrategy } from './types.js';

/**
 * §14's TOWN_ROOT: the town root's handle, whose cached entity key keys every town-level draw (§6.1) — S0's feature
 * draws, terrain noise, the per-document furniture. §14 names it without a value; S1 is its first reader at M0, so it
 * is declared here as handle 0, the first address a derivation interns (C-0165 (6)); the runner (M0-x-02) binds it.
 */
export const TOWN_ROOT = 0 as Handle;

/** The ground terrain's address at M0 (C-0165 (6)): §6.3's minting (M0-d-05a) gives the record its lineage address. */
export const TERRAIN_ID: Id = 'terrain:ground';

/** Is `r` one of the base ladder's rungs (`@plat/tables`' BASE_RUNGS)? File-level: shared by path inside `@plat/site`,
 * not part of the package's API (J263 Q1's convention). */
export function isBaseRung(r: string): r is BaseRung {
  return (BASE_RUNGS as readonly string[]).includes(r);
}

/**
 * The frame of the request (§3.2 (9), the `base` frame law): area A = `areaHa` when given, else A_target · population ÷
 * target (population the rung's target when absent), at the request's aspect (1 by default) with the rung's
 * `frameMarginShare` — through the kernel's `frameOf`, which refuses an aspect outside [0.5, 2] and an out-of-range
 * arena. The village rungs' `territory` law is volume 7's.
 */
export function siteFrame(size: TerrainBlueprint['size'], rung: RungProfile, tables: TableView): KernelResult<Frame> {
  if (rung.frameLaw !== undefined && rung.frameLaw !== 'base') return err('E_OUT_OF_RANGE', 'frameLaw');
  const marginShare = tables.table('ladder').num(rung.rung, 'frameMarginShare');
  let areaM2: number;
  if (size.areaHa !== undefined) {
    areaM2 = size.areaHa * 10_000;
  } else {
    const share = ratio(size.population ?? rung.populationTarget, rung.populationTarget, 'count');
    if (!share.ok) return err('E_OUT_OF_RANGE', 'population');
    areaM2 = rung.frameAreaKm2AtTarget * 1_000_000 * share.value;
  }
  return frameOf(areaM2, size.aspect ?? 1, marginShare);
}

/**
 * The base TerrainStrategy (§4.12; registered as `base` by M0-x-04): the frame from the blueprint's size, the rung's
 * terrain cells, the `terrain.noise` stream of the town root (S1's stage id, the context's options), then
 * `buildTerrain`. The kernel façade is not read: S1 (1) writes no arena.
 */
export const baseTerrain: TerrainStrategy = Object.freeze({
  terrain(bp: TerrainBlueprint, ctx: StageContext<SiteEnv>, _k: SiteEnv['kernel']): KernelResult<Terrain> {
    const rung = ctx.rung.rung;
    if (!isBaseRung(rung)) return err('E_OUT_OF_RANGE', 'rung');
    const frame = siteFrame(bp.size, ctx.rung, ctx.tables);
    if (!frame.ok) return err(frame.code, frame.detail);
    const params = terrainParams(ctx.tables, rung);
    const concern = CONCERNS['terrain.noise'];
    const stream = ctx.stream(concern, TOWN_ROOT, ctx.streamOpts(concern, TOWN_ROOT));
    return buildTerrain({ id: TERRAIN_ID, key: GROUND_KEY, frame: frame.value, params, epoch: ctx.epoch }, bp.site, stream);
  },
});
