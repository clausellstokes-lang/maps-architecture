// fixall/draft-rendering-r5 (2026-09-26, opus stand-in, pending Fable review). OUR OWN code; plain Node, no dependencies.
// NR4-4: where an A2 300-dpi PNG's encoding time goes, and which fallback works on a host whose deflate has no level.
// The image is a SYNTHETIC map-like raster drawn here (paper, block ground, street gaps with 1-px ink casings, rows of
// building masses with party lines, a river with a depth ramp, park crowns with shading; anti-aliased edges), 7 016 x
// 4 961 px RGBA (A2 at 300 dpi), encoded as §8.8 does it: bands of 512 rows, each row filtered (PNG filter types 0-4),
// the filtered bytes deflated as one zlib stream. Timed: the JavaScript filter pass per rule - the per-row choice by the
// smallest sum of absolute values (all five filters tried), Sub for every row, None for every row - and the deflate of
// each result by Node's zlib at levels 1 / 3 / 6 and by CompressionStream('deflate') (the web standard's API, which
// takes no level; checked here with and without a { level } option). Seeded; deterministic output sizes.
// Run: node fixall_rendering_r5_png.mjs [flat|textured|relief]   (the .out holds the three runs)
import zlib from 'node:zlib';
const now = () => performance.now();
const W = 7016, H = 4961, BAND = 512, BPP = 4, STRIDE = W * BPP;
function xs(seed) { let a = seed >>> 0 || 1, b = 0x9e3779b9, c = 0x85ebca6b, d = 0xc2b2ae35;
  return () => { const t = b << 9; let r = Math.imul(a, 5); r = ((r << 7) | (r >>> 25)) >>> 0; r = Math.imul(r, 9) >>> 0;
    c ^= a; d ^= b; b ^= c; a ^= d; c ^= t; d = ((d << 11) | (d >>> 21)); return r / 4294967296; }; }
const hash = (i, j) => { let h = Math.imul(i, 0x27d4eb2d) ^ Math.imul(j, 0x165667b1); h = Math.imul(h ^ (h >>> 15), 0x85ebca6b); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
const PAPER = [246, 237, 222], GROUND = [222, 208, 187], BUILD = [164, 150, 137], INK = [41, 37, 34], WATER = [170, 187, 197], DEEP = [120, 150, 170], GREEN = [188, 200, 171], TREE = [126, 144, 122];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const cov = (d) => d <= -0.5 ? 1 : d >= 0.5 ? 0 : 0.5 - d; // coverage of a pixel by a half-plane at signed distance d
function pixel(x, y) {
  // river: a meandering band with a depth ramp
  const cx = 2600 + 700 * Math.sin(y / 900) + 250 * Math.sin(y / 230), dr = Math.abs(x - cx) - 160;
  if (dr < 0.5) { const t = Math.min(1, -dr / 160); const c = mix(WATER, DEEP, t); return mix(c, PAPER, cov(-dr)); }
  // blocks of ~120 px on a jittered grid; streets 10 px wide
  const B = 120, i = Math.floor(x / B), j = Math.floor(y / B), lx = x - i * B, ly = y - j * B, s = 10;
  const dStreet = Math.min(lx, ly, B - lx, B - ly) - s / 2;         // distance into the block from the street edge
  if (dStreet < -1.5) return PAPER;                                   // street: paper by omission
  let c = dStreet < 0.5 ? mix(PAPER, INK, cov(Math.abs(dStreet + 0.5) - 0.5)) : GROUND;   // 1-px ink casing at the kerb
  if (dStreet < 0.5) return c;
  if (hash(i, j) < 0.12) { // a park with crowns
    const g = 11, u = Math.floor(lx / g), v = Math.floor(ly / g), px = u * g + 3 + 5 * hash(i * 97 + u, j * 89 + v), py = v * g + 3 + 5 * hash(i * 83 + u, j * 79 + v);
    const dd = Math.hypot(lx - px, ly - py) - 4.5; if (dd < 0.5) { const sh = 0.75 + 0.25 * ((px - lx) + (py - ly)) / 9; return mix(GREEN, mix(TREE, INK, 0.2 * (1 - sh)), cov(dd)); }
    return GREEN; }
  // rows of houses along the block's four frontages, 14-24 px deep, 9-16 px wide, party lines between them
  const depth = 14 + 10 * hash(i + 7, j + 3), inner = dStreet - 3;
  if (inner > 0 && inner < depth) { const along = (lx < ly) === (lx < B - ly) ? ly : lx; const w = 9 + 7 * hash(i, j + 11); const k = along % w;
    const party = Math.min(k, w - k); const edgeIn = Math.min(inner, depth - inner);
    c = mix(GROUND, BUILD, Math.min(1, edgeIn + 0.5)); if (party < 0.6) c = mix(c, INK, 0.33 * (0.6 - party) / 0.6); if (edgeIn < 0.7) c = mix(c, INK, 0.5 * (0.7 - edgeIn)); return c; }
  return GROUND;
}
// LOOK = 'flat' (the ink family: flat role colours) or 'textured' (a lit-like look: every colour multiplied by a smooth
// value-noise texture of +/- 8 % at a 24-px period plus +/- 2 % per-pixel grain, standing in for tinted pattern textures;
// or 'relief': every colour multiplied by a smooth shading field of +/- 15 % at 90- and 400-px periods, standing in for hillshade)
const LOOK = ['textured', 'relief'].includes(process.argv[2]) ? process.argv[2] : 'flat';
const vn = (x, y) => { const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };
const img = new Uint8Array(STRIDE * H); let t0 = now();
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let c = pixel(x, y); const o = y * STRIDE + x * 4;
  if (LOOK === 'textured') { const m = 1 + 0.16 * (vn(x / 24, y / 24) - 0.5) + 0.04 * (hash(x, y + 7777) - 0.5); c = [c[0] * m, c[1] * m, c[2] * m]; }
  if (LOOK === 'relief') { const m = 1 + 0.3 * (0.6 * vn(x / 400, y / 400) + 0.4 * vn(x / 90 + 50, y / 90 + 50) - 0.5); c = [c[0] * m, c[1] * m, c[2] * m]; }
  img[o] = Math.max(0, Math.min(255, Math.round(c[0]))); img[o + 1] = Math.max(0, Math.min(255, Math.round(c[1]))); img[o + 2] = Math.max(0, Math.min(255, Math.round(c[2]))); img[o + 3] = 255; }
console.log(`synthetic A2 300-dpi map raster (${LOOK} look) ${W} x ${H} RGBA = ${(img.length / 1048576).toFixed(1)} MiB, drawn in ${(now() - t0).toFixed(0)} ms (not part of encoding)`);
function filterRows(rule) { // returns the filtered stream (1 filter byte + STRIDE per row), timing the JS pass only
  const out = new Uint8Array((STRIDE + 1) * H), cand = [0, 1, 2, 3, 4].map(() => new Uint8Array(STRIDE)); const counts = [0, 0, 0, 0, 0];
  const t = now();
  for (let y = 0; y < H; y++) {
    const row = y * STRIDE, prev = row - STRIDE, o = y * (STRIDE + 1);
    if (rule === 'none') { out[o] = 0; out.set(img.subarray(row, row + STRIDE), o + 1); counts[0]++; continue; }
    if (rule === 'sub') { out[o] = 1; for (let k = 0; k < STRIDE; k++) out[o + 1 + k] = (img[row + k] - (k >= BPP ? img[row + k - BPP] : 0)) & 255; counts[1]++; continue; }
    let best = 0, bestSum = Infinity;
    for (let f = 0; f < 5; f++) { const c = cand[f]; let sum = 0;
      for (let k = 0; k < STRIDE; k++) { const a = k >= BPP ? img[row + k - BPP] : 0, b = y > 0 ? img[prev + k] : 0, cc = (k >= BPP && y > 0) ? img[prev + k - BPP] : 0, v = img[row + k];
        let r;
        if (f === 0) r = v; else if (f === 1) r = v - a; else if (f === 2) r = v - b; else if (f === 3) r = v - ((a + b) >> 1);
        else { const p = a + b - cc, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - cc); r = v - (pa <= pb && pa <= pc ? a : pb <= pc ? b : cc); }
        r &= 255; c[k] = r; sum += r < 128 ? r : 256 - r; }
      if (sum < bestSum) { bestSum = sum; best = f; } }
    out[o] = best; out.set(cand[best], o + 1); counts[best]++; }
  return { out, ms: now() - t, counts };
}
async function viaCompressionStream(u8, opts) { const cs = opts === undefined ? new CompressionStream('deflate') : new CompressionStream('deflate', opts);
  const t = now(); const w = cs.writable.getWriter(); const chunks = []; const reader = cs.readable.getReader();
  const pump = (async () => { for (;;) { const { value, done } = await reader.read(); if (done) break; chunks.push(value); } })();
  for (let y = 0; y < H; y += BAND) { const a = y * (STRIDE + 1), b = Math.min(H, y + BAND) * (STRIDE + 1); await w.write(u8.subarray(a, b)); }
  await w.close(); await pump; return { bytes: chunks.reduce((s, c) => s + c.length, 0), ms: now() - t }; }
console.log(`\nCompressionStream.length (declared parameters) = ${CompressionStream.length}`);
const results = [];
for (const rule of ['adaptive', 'sub', 'none']) {
  const reps = rule === 'adaptive' ? 3 : 5; let best = null;
  for (let r = 0; r < reps; r++) { const f = filterRows(rule); if (!best || f.ms < best.ms) best = f; }
  const line = { rule, filterMs: best.ms, counts: best.counts };
  for (const level of [1, 3, 6]) { const t = now(); const z = zlib.deflateSync(best.out, { level }); line['z' + level] = { ms: now() - t, bytes: z.length }; }
  line.cs = await viaCompressionStream(best.out); line.cs9 = await viaCompressionStream(best.out, { level: 9 }); line.cs1 = await viaCompressionStream(best.out, { level: 1 });
  results.push(line);
}
const MB = (b) => (b / 1048576).toFixed(1) + ' MiB', s = (ms) => (ms / 1000).toFixed(2) + ' s';
console.log('\nfilter rule | JS filter pass | zlib L1 | zlib L3 | zlib L6 | CompressionStream (no option) | CompressionStream {level:9} / {level:1}');
for (const l of results) console.log(`${l.rule} (rows by filter type 0-4: ${l.counts.join('/')}) | ${s(l.filterMs)} | ${s(l.z1.ms)}, ${MB(l.z1.bytes)} | ${s(l.z3.ms)}, ${MB(l.z3.bytes)} | ${s(l.z6.ms)}, ${MB(l.z6.bytes)} | ${s(l.cs.ms)}, ${MB(l.cs.bytes)} | ${MB(l.cs9.bytes)} / ${MB(l.cs1.bytes)}`);
const ad = results[0], sb = results[1], nn = results[2];
console.log(`\nbrowser-path totals (JS filter + CompressionStream deflate): adaptive ${s(ad.filterMs + ad.cs.ms)} (${MB(ad.cs.bytes)}); Sub ${s(sb.filterMs + sb.cs.ms)} (${MB(sb.cs.bytes)}); None ${s(nn.filterMs + nn.cs.ms)} (${MB(nn.cs.bytes)})`);
console.log(`Node-path totals (JS filter + zlib): adaptive L6 ${s(ad.filterMs + ad.z6.ms)}; adaptive L3 ${s(ad.filterMs + ad.z3.ms)}; Sub L3 ${s(sb.filterMs + sb.z3.ms)}`);
