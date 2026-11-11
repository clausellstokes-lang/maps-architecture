// The session's diagnosis for Q180 (c): what makes a district face `notSimple` for the skeleton's reader?
// Run from <worktree>/plat: corepack pnpm exec tsx --conditions=plat-source /home/user/maps-scratch/a11s6/pinch.mjs <out.json> <fixture> <config> <seed…>
import { writeFileSync } from 'node:fs';
const W = process.cwd();
const { prepareRings, segmentsMeet } = await import(`${W}/packages/kernel/src/skeleton/prepare.ts`);
const { deriveSpike } = await import(`${W}/bench/src/site/compose.ts`);
const { fixtureNamed } = await import(`${W}/bench/src/site/fixtures.ts`);
const { spikeFaces } = await import(`${W}/bench/src/site/receipts.ts`);
const [out, fixture, config, ...seeds] = process.argv.slice(2);
const key = (p) => `${String(p.x)},${String(p.y)}`;
const cross = (a, b, c) => (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
const sgn = (v) => (v > 0n ? 1 : v < 0n ? -1 : 0);
function classify(ring) {
  const n = ring.length;
  const seen = new Map();
  const repeats = [];
  ring.forEach((p, i) => { const k = key(p); if (seen.has(k)) repeats.push([seen.get(k), i, k]); else seen.set(k, i); });
  const spikes = [];
  for (let i = 0; i < n; i += 1) if (key(ring[(i + n - 1) % n]) === key(ring[(i + 1) % n])) spikes.push(i);
  const meets = [];
  for (let i = 0; i < n; i += 1) {
    const a = ring[i], b = ring[(i + 1) % n];
    for (let j = i + 2; j < n; j += 1) {
      if (i === 0 && j === n - 1) continue;
      const c = ring[j], d = ring[(j + 1) % n];
      if (!segmentsMeet(a, b, c, d)) continue;
      const shared = [a, b].some((p) => [c, d].some((q) => key(p) === key(q)));
      const s1 = sgn(cross(a, b, c)), s2 = sgn(cross(a, b, d)), s3 = sgn(cross(c, d, a)), s4 = sgn(cross(c, d, b));
      let kind;
      if (s1 === 0 && s2 === 0 && s3 === 0 && s4 === 0) kind = shared ? 'collinear, sharing a vertex (overlap or fold-back)' : 'collinear overlap';
      else if (shared) kind = 'two edges meet at a shared vertex (a pinch)';
      else if (s1 * s2 < 0 && s3 * s4 < 0) kind = 'proper crossing';
      else kind = 'a vertex of one edge lies on the other (a T touch)';
      meets.push({ i, j, kind, a: key(a), b: key(b), c: key(c), d: key(d) });
    }
  }
  return { n, repeats, spikes, meets };
}
const result = [];
const fx = fixtureNamed(fixture);
for (const seed of seeds.map(Number)) {
  const d = deriveSpike(fx, seed, config, 'city');
  const p = d.model.plats.get('ground/0');
  const s6 = d.model.data.get('s6') ?? null;
  const water = d.model.data.get('water') ?? { bodies: [], bridges: [] };
  const f = p === undefined ? { district: [], water: [] } : spikeFaces(p, s6, water);
  f.district.forEach((rings, i) => {
    const prep = prepareRings(rings, 'spine');
    if (prep.ok || prep.refusal !== 'notSimple') return;
    const rs = rings.map((r, k) => ({ ring: k, ...classify(r) }));
    result.push({ id: `${fixture}/${config}-${String(seed)}-district#${String(i)}`, at: prep.at, rings: rs, raw: rings });
    console.log(`${fixture}/${config} seed ${String(seed)} district#${String(i)}: ${rs.map((r) => `ring ${String(r.ring)} n=${String(r.n)} repeats=${String(r.repeats.length)} spikes=${String(r.spikes.length)} meets=[${[...new Set(r.meets.map((m) => m.kind))].join('; ')}]`).join(' | ')}`);
  });
  console.log(`seed ${String(seed)}: ${String(f.district.length)} district faces read`);
}
writeFileSync(out, `${JSON.stringify(result, null, 1)}\n`);
