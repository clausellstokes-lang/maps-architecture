// J712: at the seam seed, every fresh entity whose natural address was handed to a successor — where does it end? (§6.3, C-0274)
import { rederive, S5_REROLL, matchPair, STANDING } from '/home/user/maps-scratch/seam-c04/plat/bench/src/determinism/index.ts';
const TEST_SIZE = Object.freeze({ areaHa: 400, walledHa: 12 });
const seed = Number(process.argv[2] ?? '4');
const p = rederive(seed, { rerolls: S5_REROLL, spike: 'site', size: TEST_SIZE });
const r: any = matchPair(p);
const handed = new Map<string, string>([...r.result.handedOn].map(([f, a]: [string, string]) => [a, f]));
console.log(`seed ${seed}: handedOn ${r.result.handedOn.size} entries; minted.refused ${JSON.stringify(r.minted.refused)}; duplicateIds ${r.duplicateIds} silentRebinds ${r.silentRebinds}`);
for (const e of p.fresh.entities.entities.filter((x: any) => !STANDING.includes(x.by))) {
  const successor = handed.get(e.entity.id);
  if (successor === undefined || successor === e.entity.id) continue;
  const own = r.result.handedOn.get(e.entity.id);
  const final = r.minted.addressOf.get(e.entity.id);
  const ok = /~[1-9][0-9]*$/.test(String(final)) && String(final).startsWith(e.entity.id + '~');
  console.log(`  natural ${e.entity.id} handed to successor ${successor} (successor's final ${r.minted.addressOf.get(successor)}); this entity's own handed-on address ${own ?? 'NONE'}; its final ${final} ${ok ? '(~k)' : own !== undefined && final === own ? '(= its own succession: a chain)' : '(NEITHER)'}`);
}
