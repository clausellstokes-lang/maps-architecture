// M0-d-05a: §6.1's distinctness harness over a synthetic city of more than 10⁵ minted entities (the encoder guard: "the
// test guards the encoder, not the arithmetic") with §6.1's sky-island fixture beside it (two islands carrying
// districts; underground tunnels and a further underground part), and the exit bar's "0 duplicate ids on the minting
// fixtures". Every lineage hash goes into M0-d-01's KeyCensus with its lineage key's lanes as its source, so two
// different keys giving one hash is a collision. The city is built so that, for every lane of the key, some pair of its
// entities differs in that lane alone — an encoder that dropped or merged any lane would collide here.
import { KeyCensus, STAGES, seedKey, type PlatKey, type StageId } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { GROUND, lineageLanes, mint, mintTownRoot, type BatchRecord, type LineageKey, type LiveEntry, type Minted } from '../../src/index.js';

const SK = seedKey(20261004);

type Spec = { kind: string; parent: Minted; stage: StageId; index: number; arena?: PlatKey; epoch?: number; reroll?: number };

function rec(s: Spec): BatchRecord {
  return {
    kind: s.kind,
    parent: s.parent.identity.id,
    key: { arena: s.arena ?? GROUND, unit: s.parent.identity.lineage, stage: s.stage, epoch: s.epoch ?? 0, index: s.index, reroll: s.reroll ?? 0 },
  };
}

/** Builds the city stage by stage, each stage one batch minted against everything minted before it. */
function buildCity(): Minted[] {
  const all: Minted[] = [mintTownRoot(SK)];
  const town = all[0];
  const run = (specs: Spec[], replaced: readonly LineageKey[] = []): Minted[] => {
    const live: LiveEntry[] = all.map((m) => ({ id: m.identity.id, lineage: m.identity.lineage }));
    const batch = specs.map(rec);
    for (const k of replaced) batch.push({ kind: 'plot', key: k });
    const out = mint(batch, live, [], SK);
    all.push(...out);
    return out;
  };
  const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i);
  const sky1: PlatKey = { layer: 'sky', part: 1 };
  const sky2: PlatKey = { layer: 'sky', part: 2 };
  const under0: PlatKey = { layer: 'underground', part: 0 };
  const under1: PlatKey = { layer: 'underground', part: 1 };

  // Ground: 16 districts (S6, unit the town), 25 cells each, 6 blocks a cell, 10 plots a block; a building and two
  // households per plot (S11, unit the plot, indices 0 – 2).
  const districts = run(range(16).map((i) => ({ kind: 'district', parent: town, stage: STAGES.S6, index: i })));
  const cells = run(districts.flatMap((d) => range(25).map((i) => ({ kind: 'cell', parent: d, stage: STAGES.S5, index: i }))));
  const blocks = run(cells.flatMap((c) => range(6).map((i) => ({ kind: 'block', parent: c, stage: STAGES.S8, index: i }))));
  const plots = run(blocks.flatMap((b) => range(10).map((i) => ({ kind: 'plot', parent: b, stage: STAGES.S10, index: i }))));
  run(plots.flatMap((p) => range(3).map((i) => ({ kind: i === 0 ? 'building' : 'household', parent: p, stage: STAGES.S11, index: i }))));
  // Lane-alone pairs: a passage per plot of the first 500 at S10b, index 0 (stage alone apart from the building);
  // 100 blocks' plots re-cut at epoch 1 (epoch alone) and 100 under reroll 1 (reroll alone).
  run(plots.slice(0, 500).map((p) => ({ kind: 'passage', parent: p, stage: STAGES.S10b, index: 0 })));
  run(blocks.slice(0, 100).flatMap((b) => range(10).map((i) => ({ kind: 'plot', parent: b, stage: STAGES.S10, index: i, epoch: 1 }))));
  run(blocks.slice(100, 200).flatMap((b) => range(10).map((i) => ({ kind: 'plot', parent: b, stage: STAGES.S10, index: i, reroll: 1 }))));
  // Survivors: 50 plots re-derived around their locked originals mint the same keys, so each takes dup 1 (dup alone).
  const relocked = run([], plots.slice(0, 50).map((p) => p.key));
  expect(relocked.every((m) => m.dup === 1)).toBe(true);

  // §6.1's sky-island fixture: two islands (parts 1 and 2: part alone) carrying two districts each, five blocks a
  // district, ten plots a block; underground part 0 tunnels and part 1 entities keyed like sky part 1's districts
  // (layer alone).
  for (const arena of [sky1, sky2]) {
    const ds = run(range(2).map((i) => ({ kind: 'district', parent: town, stage: STAGES.S6, index: i, arena })));
    const bs = run(ds.flatMap((d) => range(5).map((i) => ({ kind: 'block', parent: d, stage: STAGES.S8, index: i, arena }))));
    run(bs.flatMap((b) => range(10).map((i) => ({ kind: 'plot', parent: b, stage: STAGES.S10, index: i, arena }))));
  }
  run(range(50).map((i) => ({ kind: 'tunnel', parent: town, stage: STAGES.S9b, index: i, arena: under0 })));
  run(range(2).map((i) => ({ kind: 'gallery', parent: town, stage: STAGES.S6, index: i, arena: under1 })));
  return all;
}

/** Whether `a` and `b` differ in exactly one lane, and which. */
function aloneLane(a: Uint32Array, b: Uint32Array): number {
  let at = -1;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === b[i]) continue;
    if (at >= 0) return -1;
    at = i;
  }
  return at;
}

describe('§6.1 distinctness: lineage hashes distinct over a synthetic city of more than 10⁵ entities', () => {
  let built: Minted[] | undefined;
  const cityOf = (): Minted[] => (built ??= buildCity());
  const LONG = 120_000; // a generous limit: seats share the machine, and no timing is taken here

  it('mints more than 10⁵ entities with 0 lineage-hash collisions in the census', () => {
    const city = cityOf();
    expect(city.length).toBeGreaterThan(100_000);
    const census = new KeyCensus(2, 1 << 17);
    for (const m of city) census.add(m.identity.lineage, lineageLanes(m.key));
    expect(census.firstCollision).toBeUndefined();
    expect(census.collisions).toBe(0);
    expect(census.reused).toBe(0);
    expect(census.size).toBe(city.length);
  }, LONG);

  it('gives 0 duplicate ids (the exit bar on the minting fixtures), every one a natural address', () => {
    const city = cityOf();
    const ids = new Set(city.map((m) => m.identity.id));
    expect(ids.size).toBe(city.length);
    expect(city.every((m) => m.suffix === 0)).toBe(true);
  }, LONG);

  it('holds a pair differing in each lane alone, so the census guards every lane of the encoder', () => {
    // One representative per (lanes with lane i blanked): two entities sharing it differ in lane i alone.
    const lanes = cityOf().map((m) => lineageLanes(m.key));
    const found = new Set<number>();
    for (let lane = 0; lane < 10; lane += 1) {
      const seen = new Map<string, Uint32Array>();
      for (const l of lanes) {
        const blank = Array.from(l);
        blank[lane] = 0;
        // The unit's two words are one field: blank both when either is the lane under test.
        if (lane === 3 || lane === 4) blank[3] = blank[4] = 0;
        const k = blank.join();
        const other = seen.get(k);
        if (other === undefined) seen.set(k, l);
        else if (aloneLane(other, l) === lane || ((lane === 3 || lane === 4) && other[2] === l[2] && other.every((v, i) => i === 3 || i === 4 || v === l[i]))) {
          found.add(lane);
          break;
        }
      }
    }
    // layer, part, unit (words 0 and 1), stage, epoch, index, reroll, dup; the unit flag (lane 2) is the town root's
    // alone and is held by lineage.test.ts's pair (the root and a unit of [0, 0]).
    expect([...found].sort((a, b) => a - b)).toEqual([0, 1, 3, 4, 5, 6, 7, 8, 9]);
  }, LONG);
});
