// check/M0-a-11-close-s6 — the measurement RL5 / J749 asks for, the closing checker's own (J761 (4) (i)): over the
// item's corpus, its fixtures, the M0 (b) face sets and the pipeline's district and water faces, every face whose
// cleaned rings' sharpest corner lies in [1°, 5°) — the faces the 1° bound of `spine` and `regions` newly admits — is
// read: does the skeleton validate it for spine and for regions, does the roof still refuse it, and does no other face move?
// It also counts every downgrade by use and cause (the refusal census of J264 / N-58).
//
//   corepack pnpm exec tsx --conditions=plat-source docs/build/checks/M0-a-11-s6-evidence/measure-band.mjs <out.json> <family> [args…]
//   families: corpus | holed <seed…> | squares <seed…> | faceset <seed> <n per kind> | fusion <seed…> | relief <fixture> <config> <seed…>
import { writeFileSync } from 'node:fs';
import { add, newTally, readFace } from './band-lib.mjs';

const [out, family, ...args] = process.argv.slice(2);
if (out === undefined || family === undefined) throw new Error('usage: measure-band.mjs <out.json> <family> [args…]');
const ints = (xs) => xs.map((x) => Number(x));
const groups = {};
const read = (group, id, rings) => {
  const t = (groups[group] ??= newTally());
  add(t, id, rings, readFace(rings), true);
};

if (family === 'corpus') {
  const { generateCorpus, FAMILIES } = await import('../../../../bench/src/skeleton/corpus.ts');
  const c = generateCorpus();
  c.faces.forEach((f, i) => read(`corpus/${FAMILIES[f.family]}`, `corpus#${String(i)}`, f.rings));
} else if (family === 'holed' || family === 'squares') {
  const s = await import('../../../../packages/kernel/test/skeleton/support.ts');
  for (const seed of ints(args)) {
    if (family === 'holed') s.holedPolygons(seed, 1000).forEach((rings, i) => read(`holed/seed-${String(seed)}`, `holed-${String(seed)}#${String(i)}`, rings));
    else s.rotatedSquares(seed, 1000).forEach((ring, i) => read(`squares/seed-${String(seed)}`, `squares-${String(seed)}#${String(i)}`, [ring]));
  }
} else if (family === 'faceset') {
  const { faceAt } = await import('../../../../bench/src/bentcut/faces.ts');
  const [seed, n] = ints(args);
  for (const kind of ['curved', 'round-joined', 'triangular', 'C-shaped', 'holed', 'concave']) {
    for (const scale of ['block', 'plot']) for (let i = 0; i < n; i += 1) read(`faceset/${kind}/${scale}`, `faceset-${kind}-${scale}-${String(seed)}#${String(i)}`, faceAt(kind, i, seed, scale).polygon);
  }
} else if (family === 'fusion') {
  const { derive, asPolygons } = await import('../../../../bench/src/fusion/runs.ts');
  const { spikeFaces } = await import('../../../../bench/src/site/receipts.ts');
  for (const seed of ints(args)) {
    for (const river of [false, true]) {
      for (const kind of ['fusion', 'integrated']) {
        const tag = `fusion/${kind}/${river ? 'river' : 'flat'}`;
        let d;
        try {
          d = derive(kind, seed, { frameHa: 900, walledHa: 30, river });
        } catch (e) {
          (groups[tag] ??= newTally()).deriveThrows = ((groups[tag].deriveThrows ?? 0) + 1);
          console.log(`${tag} seed ${String(seed)}: derive threw ${String(e && e.message).slice(0, 200)}`);
          continue;
        }
        const district = asPolygons(d.ins.districtFaces);
        district.forEach((rings, i) => read(`${tag}/district`, `${tag}-${String(seed)}-district#${String(i)}`, rings));
        const p = d.model.plats.get('ground/0');
        const water = d.model.data.get('water') ?? { bodies: [], bridges: [] };
        const wet = p === undefined ? [] : spikeFaces(p, null, water).water;
        wet.forEach((rings, i) => read(`${tag}/water`, `${tag}-${String(seed)}-water#${String(i)}`, rings));
        console.log(`${tag} seed ${String(seed)}: ${String(district.length)} district, ${String(wet.length)} water faces; bugs ${String(d.report.bugs.length)}`);
      }
    }
  }
} else if (family === 'relief') {
  const { deriveSpike } = await import('../../../../bench/src/site/compose.ts');
  const { fixtureNamed } = await import('../../../../bench/src/site/fixtures.ts');
  const { spikeFaces } = await import('../../../../bench/src/site/receipts.ts');
  const [fixture, config, ...seeds] = args;
  const fx = fixtureNamed(fixture);
  if (fx === undefined) throw new Error(`no fixture ${fixture}`);
  for (const seed of ints(seeds)) {
    const tag = `relief/${fixture}/${config}`;
    const d = deriveSpike(fx, seed, config, 'city');
    const p = d.model.plats.get('ground/0');
    const s6 = d.model.data.get('s6') ?? null;
    const water = d.model.data.get('water') ?? { bodies: [], bridges: [] };
    const f = p === undefined ? { district: [], water: [] } : spikeFaces(p, s6, water);
    f.district.forEach((rings, i) => read(`${tag}/district`, `${tag}-${String(seed)}-district#${String(i)}`, rings));
    f.water.forEach((rings, i) => read(`${tag}/water`, `${tag}-${String(seed)}-water#${String(i)}`, rings));
    console.log(`${tag} seed ${String(seed)}: ${String(f.district.length)} district, ${String(f.water.length)} water faces; bugs ${String(d.report.bugs.length)}`);
  }
} else throw new Error(`unknown family ${family}`);

const total = newTally();
for (const t of Object.values(groups)) {
  total.faces += t.faces;
  for (const k of ['classes', 'roof', 'spine', 'regions']) for (const [c, n] of Object.entries(t[k])) total[k][c] = (total[k][c] ?? 0) + n;
  for (const k of ['faces', 'spineValidated', 'regionsValidated', 'roofRefusedSharp', 'convex', 'reflex', 'holed']) total.band[k] += t.band[k];
  total.band.minDeg = Math.min(total.band.minDeg, t.band.minDeg);
  total.band.maxDeg = Math.max(total.band.maxDeg, t.band.maxDeg);
  total.movedOutsideBand += t.movedOutsideBand;
  total.causeMoved += t.causeMoved;
  for (const [c, n] of Object.entries(t.causeMoves)) total.causeMoves[c] = (total.causeMoves[c] ?? 0) + n;
  total.spineNeRegions += t.spineNeRegions;
  total.independentFails += t.independentFails;
  total.maxMs = Math.max(total.maxMs, t.maxMs);
}
const { kept: _k, ...head } = total;
const downgrades = (o) => Object.entries(o).filter(([c]) => c !== 'validated').reduce((a, [, n]) => a + n, 0);
const summary = { family, args, ...head, downgrades: { roof: downgrades(total.roof), spine: downgrades(total.spine), regions: downgrades(total.regions) } };
writeFileSync(out, `${JSON.stringify({ summary, groups }, null, 1)}\n`);
console.log(JSON.stringify(summary));
