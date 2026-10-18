// Red-team scale lens: (1) S10b siting as §4.7 states it ("each venue class has a score over the plot context ...
// plots are filled in descending score with capacity accounting", ≤ 3 plan-fit-reconcile rounds) at CITY counts;
// (2) document size: entity JSON (schema-shaped synthetic) and the snapshot's prosperity + density rasters, gzipped.
// Our own code. Run: node bench_siting_doc.mjs
import zlib from 'node:zlib';
const now = () => performance.now();
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
const R = rng(9);
// (1) siting
const P = 5500, CL = 80, F = 10; const ctx = new Float64Array(P * F); for (let i = 0; i < ctx.length; i++) ctx[i] = R();
const W = new Float64Array(CL * F); for (let i = 0; i < W.length; i++) W[i] = R() * 2 - 1; const demand = Array.from({ length: CL }, () => 5 + Math.floor(R() * 120));
function siteOnce() { const taken = new Uint8Array(P); let placed = 0; const idx = new Uint32Array(P), sc = new Float64Array(P);
  for (let c = 0; c < CL; c++) { for (let p = 0; p < P; p++) { let s = 0; for (let f = 0; f < F; f++) s += W[c * F + f] * ctx[p * F + f]; sc[p] = s; idx[p] = p; }
    const arr = Array.from(idx); arr.sort((a, b) => sc[b] - sc[a] || a - b); let need = demand[c]; for (const p of arr) { if (!need) break; if (!taken[p]) { taken[p] = 1; need--; placed++; } } }
  return placed; }
siteOnce(); let t = now(); for (let r = 0; r < 3; r++) siteOnce(); const tS = (now() - t) / 3;
console.log(`S10b naive: ${CL} classes x ${P} plots, full sort per class: ${tS.toFixed(1)} ms per round; x3 rounds = ${(3 * tS).toFixed(1)} ms (budget 8 ms)`);
// (2) document size
const ents = []; for (let i = 0; i < 22250; i++) ents.push({ id: `plot:d${i % 25}/b${i % 1750}/p${i}`, ctx: { areaM2: +(R() * 600).toFixed(2), prosperity: +R().toFixed(4), density: +R().toFixed(4), dist: { centre: +(R() * 900).toFixed(1), plaza: +(R() * 900).toFixed(1), market: +(R() * 900).toFixed(1), gate: +(R() * 900).toFixed(1), wall: +(R() * 300).toFixed(1), water: +(R() * 500).toFixed(1) }, venueMix: { house: 0.6, workshop: 0.2, inn: 0.05, shop: 0.1, church: 0.05 }, districtKind: 'craft', roadClass: 'lane', terrainClass: 'mid' }, lifecycle: { state: 'generated', epoch: 0, history: [{ epoch: 0, event: 'generated', cause: 'generation' }] }, provenance: { generatorVersion: '0.1.0', tableVersions: { granularity: '1.0.0', siteplan: '1.0.0', classRules: '1.0.0' }, stage: 'S10', streamKey: `S10/plot/${i}`, attempt: 0, rules: [`granularity@1.0.0#row${i % 9}`], deps: [`block:${i % 1750}`, `district:${i % 25}`, `way:${i % 3000}`, `gate:${i % 6}`] } });
const json = JSON.stringify(ents); const gz = zlib.gzipSync(json, { level: 9 });
console.log(`entity JSON (22 250 schema-shaped records): ${(json.length / 1e6).toFixed(1)} MB raw, ${(gz.length / 1e6).toFixed(2)} MB gzip-9`);
for (const [name, N] of [['CITY frame 625^2 @8 m', 625], ['CITY frame+margin 1000^2 @8 m', 1000], ['METRO frame+margin 1280^2 @10 m', 1280]]) {
  const f = new Float32Array(N * N); for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) f[y * N + x] = 0.5 + 0.3 * Math.sin(x / 90) * Math.cos(y / 70) + 0.05 * Math.sin(x / 13 + y / 17) + 0.01 * (R() - 0.5);
  const g = zlib.gzipSync(Buffer.from(f.buffer), { level: 9 }); console.log(`${name}: one Float32 field ${(f.byteLength / 1e6).toFixed(1)} MB raw, ${(g.length / 1e6).toFixed(2)} MB gzip-9; prosperity+density = ${(2 * g.length / 1e6).toFixed(2)} MB`); }
const keys = []; for (let i = 0; i < 1e5; i++) keys.push(`S11/siteplan/plot:d${i % 25}/b${i % 1750}/p${i}/arrangement`); const kj = JSON.stringify(keys); console.log(`report.streamKeysUsed 1e5 keys: ${(kj.length / 1e6).toFixed(1)} MB raw, ${(zlib.gzipSync(kj, { level: 9 }).length / 1e6).toFixed(2)} MB gzip-9`);
