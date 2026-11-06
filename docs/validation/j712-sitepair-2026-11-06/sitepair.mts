// session/c04-s5-sitepair-1 (J710): which seeds of the site spike re-draw S5 under {S5:1} on c-04 S5's tree (the held enclosure)
import { rederive, S5_REROLL, matchPair } from '/home/user/maps-scratch/seam-c04/plat/bench/src/determinism/index.ts';
const TEST_SIZE = Object.freeze({ areaHa: 400, walledHa: 12 });
const rootAt = (p: any, side: 'old' | 'fresh', stage: string): string | undefined => p[side].run.stageRoots.find(([n]: [string, string]) => n === stage)?.[1];
const seeds = (process.argv[2] ?? '1,2,3,4,5,6').split(',').map(Number);
const spike = (process.argv[3] ?? 'site') as 'site' | 'fusion';
for (const seed of seeds) {
  const t0 = Date.now();
  try {
    const p = rederive(seed, { rerolls: S5_REROLL, spike, size: TEST_SIZE });
    const moved = ['S5', 'S6', 'S8'].map((s) => `${s}:${rootAt(p, 'old', s) === rootAt(p, 'fresh', s) ? 'UNMOVED' : 'moved'}`);
    const standing = ['S1', 'S3', 'S4'].map((s) => `${s}:${rootAt(p, 'old', s) === rootAt(p, 'fresh', s) ? 'same' : 'DIFF'}`);
    const r: any = matchPair(p);
    console.log(`${spike} seed ${seed}: ${moved.join(' ')} | standing ${standing.join(' ')} | redrawn ${JSON.stringify(r.redrawn)} | bugs old ${p.old.run.bugs.length} fresh ${p.fresh.run.bugs.length} | ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  } catch (e) {
    console.log(`${spike} seed ${seed}: ERROR ${String((e as Error).message).slice(0, 300)}`);
  }
}
