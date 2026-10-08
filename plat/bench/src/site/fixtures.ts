// The site spike's fixtures (M0-e-06; §16 M0 (e), §13.1 "a 3 000 m relief fixture with a hill-acropolis site", §2.3
// "D8 … on 60 m and 3 000 m relief"; C-0048, C-0264 (4)): the base's river fixture (M0-x-04's RIVER_BLUEPRINT — a river
// arriving from the west, mouth none) on two reliefs — S0's rolling class (amplitude 60 m) and a hill-acropolis site (a
// 3 000 m hill under the town's centre on hilly ground), the two relief fixtures M0-e-01's and M0-e-02's exit bars name.
// The spike runs at §12.2's CITY size (the base's frame law, 220 ha walled); the `test` size — M0-x-04's 900 ha frame
// with 30 ha walled (C-0264 (10)) — is the harness's own test size, never a bar's (C-0271 (3)).
import type { Cm } from '@plat/kernel';
import { RIVER_BLUEPRINT, type BaseBlueprint } from '@plat/layout';
import type { SiteRequest } from '@plat/site';

/** A named fixture: a base blueprint the runner derives at a seed. */
export interface SiteFixture {
  readonly name: string;
  readonly blueprint: BaseBlueprint;
}

/** The 60 m relief: S0's rolling class (terrain.json's relief amplitude 60 m), as M0-e-02's relief bar builds it. */
export const RELIEF_60: SiteRequest = Object.freeze({ relief: 'rolling' as const });

/** The 3 000 m relief: a hill-acropolis site — a 3 000 m hill of 1 200 m radius under the town's centre, hilly ground. */
export const RELIEF_3000: SiteRequest = Object.freeze({
  relief: 'hilly' as const,
  primitives: Object.freeze([Object.freeze({ kind: 'hill' as const, at: Object.freeze({ x: 0 as Cm, y: 0 as Cm }), radiusM: 1200, heightM: 3000 })]),
});

/** The sizes the harness derives at: §12.2's CITY (the bars') and the test size (C-0264 (10); C-0271 (3)). */
export type SpikeSize = 'city' | 'test';

/** The test size: a 900 ha frame with 30 ha walled (M0-x-04's run tests). */
export const TEST_SIZE = Object.freeze({ areaHa: 900, walledHa: 30 });

/** A fixture's blueprint at a size: the CITY frame law's, or the test size's frame and walled land. */
export function sized(bp: BaseBlueprint, size: SpikeSize): BaseBlueprint {
  if (size === 'city') return bp;
  return { ...bp, size: { ...bp.size, areaHa: TEST_SIZE.areaHa }, walledHa: TEST_SIZE.walledHa };
}

/** The river fixture on a relief: RIVER_BLUEPRINT's river (from the west, no mouth) on the site request given. */
export function riverOn(relief: SiteRequest): BaseBlueprint {
  return { ...RIVER_BLUEPRINT, site: { ...relief, river: RIVER_BLUEPRINT.site.river ?? null }, terrain: 'base' };
}

/** The spike's two fixtures (M0.md §1 (e): "CITY fixtures with 60 m and 3 000 m relief and a river"). */
export const SITE_FIXTURES: readonly SiteFixture[] = Object.freeze([
  Object.freeze({ name: 'relief-60', blueprint: riverOn(RELIEF_60) }),
  Object.freeze({ name: 'relief-3000', blueprint: riverOn(RELIEF_3000) }),
]);

/** A fixture by name (the harness's `--fixture`). */
export function fixtureNamed(name: string): SiteFixture | undefined {
  return SITE_FIXTURES.find((f) => f.name === name);
}
