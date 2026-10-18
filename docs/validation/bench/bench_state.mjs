// Red-team scale lens: (1) the §6.2 model hash "over the canonical serialisation (sorted keys, integer coordinates,
// floats as shortest round-trip strings)", which §5.3 lists in the invariant suite "run after every batch and every
// edit"; (2) structured-clone cost of entity tables and of a Mark[] display list (the §14 PlatApi passes Document by
// value and DisplayListBuilder returns Mark[]; §4.1 runs generation in a worker); (3) stream-key derivation (§6.1).
// Synthetic data shaped by the §2 schemas at the §12 CITY counts. Our own code. Run: node --expose-gc bench_state.mjs [rung]
import v8 from 'node:v8';
const now = () => performance.now();
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
const R = rng(5); const ri = (a, b) => a + Math.floor(R() * (b - a + 1));
const scale = process.argv[2] === 'metro' ? 2.5 : 1;
const C = { plots: Math.round(5500 * scale), buildings: Math.round(6000 * scale), blocks: Math.round(1750 * scale), ways: Math.round(3000 * scale), households: Math.round(5000 * scale), greens: Math.round(1000 * scale), districts: Math.round(25 * Math.sqrt(scale)), vertsPerLevel: Math.round(60000 * scale) };
const lifecycle = () => ({ state: 'generated', epoch: 0, history: [{ epoch: 0, event: 'generated', cause: 'generation' }] });
const prov = (stage) => ({ generatorVersion: '0.1.0', tableVersions: { granularity: '1.0.0', siteplan: '1.0.0', classRules: '1.0.0', heights: '1.0.0', greenery: '1.0.0' }, stage, streamKey: `${stage}/x/${ri(0, 1e6)}`, attempt: 0, rules: [`granularity@1.0.0#row${ri(0, 9)}`, `siteplan@1.0.0#r${ri(0, 40)}`], deps: Array.from({ length: 12 }, () => `plot:d${ri(0, 24)}/b${ri(0, 80)}/p${ri(0, 9)}`) });
const ctx = () => ({ areaM2: R() * 600, shape: { obbW: R() * 20, obbD: R() * 40, compactness: R(), reflex: ri(0, 2), corner: R() < 0.2, wedge: false }, frontageM: R() * 15, roadClass: 'lane', roadWidthM: 4, districtKind: 'craft', venueMix: { house: 0.6, workshop: 0.2, inn: 0.05, shop: 0.1, church: 0.05 }, prosperity: R(), prosperityBand: 'modest', density: R(), dist: { centre: R() * 900, plaza: R() * 900, market: R() * 900, gate: R() * 900, wall: R() * 300, water: R() * 500 }, upstream: R(), slope: R() * 0.1, aspect: R() * 360, upwind: R(), terrainClass: 'mid', growthStage: 1, epoch: 0 });
function makeEntities() {
  const E = {};
  for (let i = 0; i < C.plots; i++) { const id = `plot:d${i % C.districts}/b${i % C.blocks}/p${i}`; E[id] = { id, face: { faces: [ri(0, 9e4)] }, block: `block:${i % C.blocks}`, district: `district:${i % C.districts}`, frontage: [ri(0, 5e5)], access: [ri(0, 5e5)], depthCm: ri(1200, 3000), frontageCm: ri(400, 1400), partyWalls: [{ edge: ri(0, 5e5), with: `plot:x${ri(0, 1e4)}` }], use: 'residential', sitePlan: { arrangement: 'row', coverage: R(), slots: [{ role: 'house', hint: [[ri(0, 1e5), ri(0, 1e5)], [ri(0, 1e5), ri(0, 1e5)], [ri(0, 1e5), ri(0, 1e5)], [ri(0, 1e5), ri(0, 1e5)]], entranceEdge: ri(0, 5e5) }], frontJitterCm: ri(0, 80), ruleRow: 'row/modest/dense' }, buildings: [`bldg:${i}`], yard: [{ kind: 'yard', face: ri(0, 9e4) }, { kind: 'garden', face: ri(0, 9e4) }], ctx: ctx(), lifecycle: lifecycle(), subseed: `S10/${id}`, provenance: prov('S10') }; }
  for (let i = 0; i < C.buildings; i++) { const id = `bldg:${i}`; E[id] = { id, plot: `plot:${i}`, slot: 0, footprint: { faces: [ri(0, 9e4)] }, class: 'house', use: 'house', entrance: { edge: ri(0, 5e5), posCm: ri(0, 900) }, heights: { floors: ri(1, 3), eaveCm: ri(300, 900), ridgeCm: ri(600, 1400) }, roof: { kind: 'gable', ridgeAxis: R() * 180, pitch: 45, material: 'thatch' }, compositionSeed: `S11/${id}`, occupants: [`hh:${i}`], lifecycle: lifecycle(), provenance: prov('S11') }; }
  for (let i = 0; i < C.blocks; i++) { const id = `block:${i}`; E[id] = { id, face: { faces: [ri(0, 9e4)] }, district: `district:${i % C.districts}`, frontages: Array.from({ length: 4 }, () => ({ way: `way:${ri(0, C.ways)}`, edge: ri(0, 5e5), class: 'lane', lengthCm: ri(1000, 8000) })), depthClass: 'modest', interior: 'plots', lifecycle: lifecycle(), provenance: prov('S9') }; }
  for (let i = 0; i < C.ways; i++) { const id = `way:${i}`; const n = ri(4, 30); E[id] = { id, class: 'lane', spine: Array.from({ length: n }, () => ri(0, 5e5)), widthCm: Array.from({ length: n }, () => 400), surface: 'cobble', from: `junction:${ri(0, 4000)}`, to: `junction:${ri(0, 4000)}`, growthStage: 1, epoch: 0, slopeP95: R() * 0.1, lifecycle: lifecycle(), provenance: prov('S5') }; }
  for (let i = 0; i < C.households; i++) { const id = `hh:${i}`; E[id] = { id, plot: `plot:${i}`, building: `bldg:${i}`, members: [], wealth: R() }; }
  for (let i = 0; i < C.greens; i++) { const id = `green:${i}`; E[id] = { id, kind: 'garden', face: { faces: [ri(0, 9e4)] }, owner: `plot:${i}`, rule: 'yard planting', density: R(), treeStream: `render.trees/${id}`, lifecycle: lifecycle() }; }
  return E;
}
function makePlat(nv) { const ne = nv * 3, nf = Math.round(nv / 3), rr = () => ri(-2e5, 2e5);
  const m = (T, n, f) => { const a = new T(n); for (let i = 0; i < n; i++) a[i] = f(); return a; };
  return { vertices: { x: m(Int32Array, nv, rr), y: m(Int32Array, nv, rr), firstOut: m(Int32Array, nv, () => ri(0, ne)), pinned: new Uint8Array(nv) },
    halfEdges: { origin: m(Int32Array, ne, () => ri(0, nv)), twin: m(Int32Array, ne, () => ri(0, ne)), next: m(Int32Array, ne, () => ri(0, ne)), prev: m(Int32Array, ne, () => ri(0, ne)), face: m(Int32Array, ne, () => ri(0, nf)), type: m(Uint16Array, ne, () => ri(0, 12)), entity: m(Int32Array, ne, () => ri(0, 2e4)) },
    faces: { outer: m(Int32Array, nf, () => ri(0, ne)), holesStart: new Int32Array(nf), holes: new Int32Array(0), type: m(Uint16Array, nf, () => ri(0, 30)), entity: m(Int32Array, nf, () => ri(0, 2e4)), parent: m(Int32Array, nf, () => ri(0, nf)) } }; }
function canonical(v) { // sorted keys; numbers via JSON (shortest round-trip); typed arrays as number lists
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (ArrayBuffer.isView(v)) { let s = '['; for (let i = 0; i < v.length; i++) { if (i) s += ','; s += v[i]; } return s + ']'; }
  if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
  return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canonical(v[k])).join(',') + '}'; }
function fnv1a(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
function makeMarks(n) { const out = []; const sem = ['building.body', 'building.roof', 'building.outline', 'yard.garden', 'plot.cadastral', 'way.lane', 'tree.instances', 'label.street'];
  for (let i = 0; i < n; i++) out.push({ entity: `bldg:${i >> 2}`, layer: 'ground', z: i & 7, semantic: sem[i & 7], kind: 'area', lod: ['city', 'district'], geom: { face: ri(0, 9e4), level: 4 }, attrs: { height: ri(300, 900), prosperity: R(), class: 'house', orientation: R() * 180, jitter: `style/jitter/bldg:${i}` }, group: `district:${i % 25}`, shadow: (i & 3) === 0 ? { heights: { floors: 2, eaveCm: 600, ridgeCm: 1000 }, footprint: { faces: [i] }, kind: 'prism' } : undefined });
  return out; }
function murmurLane(bytes, seed) { let h = seed >>> 0; for (let i = 0; i < bytes.length; i++) { let k = bytes[i]; k = Math.imul(k, 0xcc9e2d51); k = (k << 15) | (k >>> 17); k = Math.imul(k, 0x1b873593); h ^= k; h = (h << 13) | (h >>> 19); h = (Math.imul(h, 5) + 0xe6546b64) | 0; }
  h ^= bytes.length; h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return h >>> 0; }

const t0 = now(); const E = makeEntities(); const plats = [0, 1, 2, 3, 4].map(() => makePlat(C.vertsPerLevel)); const tMake = now() - t0;
console.log(`rung=${scale === 1 ? 'CITY' : 'METRO'} entities=${Object.keys(E).length} plat vertices/level=${C.vertsPerLevel} (build ${tMake.toFixed(0)} ms)`);
canonical({ a: 1 }); // warm
let t = now(); const sE = canonical(E); const tSerE = now() - t;
t = now(); const sP = plats.map(canonical); const tSerP = now() - t;
t = now(); let h = fnv1a(sE); for (const s of sP) h ^= fnv1a(s); const tHash = now() - t;
const bytes = sE.length + sP.reduce((a, s) => a + s.length, 0);
console.log(`canonical model hash: serialise entities ${tSerE.toFixed(0)} ms + plats ${tSerP.toFixed(0)} ms + hash ${tHash.toFixed(0)} ms = ${(tSerE + tSerP + tHash).toFixed(0)} ms; canonical text ${(bytes / 1e6).toFixed(1)} MB`);
t = now(); const cE = structuredClone(E); const tClE = now() - t;
t = now(); const buf = v8.serialize(E); const tSe = now() - t; t = now(); v8.deserialize(buf); const tDe = now() - t;
t = now(); structuredClone(plats); const tClP = now() - t;
console.log(`structuredClone(entities) ${tClE.toFixed(0)} ms (sender serialise ${tSe.toFixed(0)} ms + receiver deserialise ${tDe.toFixed(0)} ms; ${(buf.length / 1e6).toFixed(1)} MB); structuredClone(plats, copied) ${tClP.toFixed(0)} ms`);
for (const n of [Math.round(60000 * scale), Math.round(125000 * scale)]) { t = now(); const M = makeMarks(n); const tBuild = now() - t; t = now(); const b2 = v8.serialize(M); const s2 = now() - t; t = now(); v8.deserialize(b2); const d2 = now() - t;
  console.log(`display list ${n} Mark objects: build ${tBuild.toFixed(0)} ms; postMessage-equivalent sender ${s2.toFixed(0)} ms + main-thread receive ${d2.toFixed(0)} ms (${(b2.length / 1e6).toFixed(1)} MB)`); }
if (global.gc) { global.gc(); const m0 = process.memoryUsage().heapUsed; const keep = [structuredClone(E)]; global.gc(); const m1 = process.memoryUsage().heapUsed; console.log(`heap per entity-table copy ≈ ${((m1 - m0) / 1e6).toFixed(0)} MB; plat typed arrays per copy ≈ ${(plats.reduce((a, p) => a + Object.values(p).reduce((b, g) => b + Object.values(g).reduce((c, arr) => c + arr.byteLength, 0), 0), 0) / 1e6).toFixed(0)} MB`); keep.length = 0; }
// stream keys
const enc = new TextEncoder(); const nK = Math.round(1e5 * scale); t = now(); let acc = 0;
for (let i = 0; i < nK; i++) { const path = `S11/siteplan/plot:d${i % 25}/b${i % 1750}/p${i}/arrangement`; const b = enc.encode(path); acc ^= murmurLane(b, 0x9747b28c) ^ murmurLane(b, 0x5bd1e995) ^ murmurLane(b, 0x1b873593) ^ murmurLane(b, 0xcc9e2d51); }
console.log(`stream keys: ${nK} paths -> 128-bit keys in ${(now() - t).toFixed(0)} ms (${acc & 1})`);
