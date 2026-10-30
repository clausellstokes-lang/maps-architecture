// Q133 spike probe (read-only; offline): for the sum-check seeds, every overlay outer-ring edge measured against the
// boundary AS A WHOLE (257 samples per edge: is the ring the sum's outer ring within OVERLAY_TOLERANCE_CM by the
// definition?), and around the worst vertex: the overlay ring's vertices, the buffer form's, the input segments (the
// boundary's edges and the full convolution's segments) within 2 m, and the vertex's distance to the nearest input
// segment against the router's fidelity bound (2·√2·attractCm).
// usage (from <plat>): corepack pnpm exec tsx --conditions=plat-source <scratch>/q133/spike-probe.mts <s6in.json>... [--plat <plat root>]
import { pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const argv = process.argv.slice(2);
const pi = argv.indexOf('--plat');
const plat = resolve(pi >= 0 ? argv[pi + 1] : process.cwd());
const files = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1] === '--plat'));
const K = await import(pathToFileURL(join(plat, 'packages/kernel/src/index.ts')).href);
const L = await import(pathToFileURL(join(plat, 'packages/layout/src/index.ts')).href);
const G = await import(pathToFileURL(join(plat, 'packages/layout/src/siting/geom.ts')).href);
const { booleans, area2, LATTICE } = K;
const { convolution, mergeCollinear, OVERLAY_TOLERANCE_CM } = L;
const { distToSegment2 } = G;
type P = { x: number; y: number };
const d = 5000;
const tol = OVERLAY_TOLERANCE_CM as number;
const FID = 2 * Math.SQRT2 * LATTICE.attractCm;
const dist = (p: P, a: P, b: P) => Math.sqrt(distToSegment2(p, a, b));
const fmt = (p: P) => `(${p.x}, ${p.y})`;
function toBoundary(b: P[], p: P): { i: number; d: number } {
  let best = { i: -1, d: Infinity };
  for (let i = 0; i < b.length; i += 1) {
    const x = dist(p, b[i], b[(i + 1) % b.length]);
    if (x < best.d) best = { i, d: x };
  }
  return best;
}
function largestOuter(rings: P[][]): P[] {
  let best: P[] = [];
  let bestArea = 0;
  for (const r of rings) {
    const a = area2(r);
    if (a > bestArea) {
      bestArea = a;
      best = r;
    }
  }
  return best;
}
for (const f of files) {
  const j = JSON.parse(readFileSync(f, 'utf8'));
  const b: P[] = mergeCollinear(j.boundary.map(([x, y]: number[]) => ({ x, y })));
  const full: P[] = convolution(b, d, 'arc');
  const u = booleans('union', [b.slice()], [full], 'nonzero');
  if (!u.ok) {
    console.log(`== seed ${j.seed}: union refused (${u.code}) — not a sum-check seed`);
    continue;
  }
  const ring = largestOuter(u.value);
  // every ring edge against the boundary as a whole
  let worst = { r: -1, min: Infinity, max: -Infinity };
  let outShell = 0;
  let maxAll = -Infinity;
  for (let r = 0; r < ring.length; r += 1) {
    const p = ring[r];
    const q = ring[(r + 1) % ring.length];
    let mn = Infinity;
    let mx = -Infinity;
    for (let s = 0; s <= 256; s += 1) {
      const x = { x: p.x + ((q.x - p.x) * s) / 256, y: p.y + ((q.y - p.y) * s) / 256 };
      const dd = toBoundary(b, x).d;
      mn = Math.min(mn, dd);
      mx = Math.max(mx, dd);
    }
    if (mn < d - tol || mx > d + tol) outShell += 1;
    maxAll = Math.max(maxAll, mx);
    if (mn < worst.min) worst = { r, min: mn, max: mx };
  }
  console.log(`== seed ${j.seed}: overlay outer ring ${ring.length} pts; ring edges leaving the shell [${d - tol}, ${d + tol}] measured against the boundary as a whole: ${outShell}; the ring's least distance ${worst.min.toFixed(1)} cm (edge ${worst.r}), its greatest ${maxAll.toFixed(1)} cm`);
  // around the worst vertex
  const r0 = worst.r;
  const vtx = [ring[r0], ring[(r0 + 1) % ring.length]].sort((a, c) => toBoundary(b, a).d - toBoundary(b, c).d)[0];
  console.log(`   the deepest ring vertex ${fmt(vtx)}: ${toBoundary(b, vtx).d.toFixed(1)} cm from the boundary (edge ${toBoundary(b, vtx).i}), i.e. ${(d - toBoundary(b, vtx).d).toFixed(1)} cm inside the offset (tolerance ${tol} cm)`);
  const lines: string[] = [];
  for (let k = -5; k <= 6; k += 1) {
    const v = ring[(r0 + k + ring.length) % ring.length];
    lines.push(`${fmt(v)} ${toBoundary(b, v).d.toFixed(1)}`);
  }
  console.log(`   overlay ring vertices around it (point, cm to the boundary): ${lines.join(' → ')}`);
  // input segments within 2 m of the vertex
  const near: { what: string; dd: number; toB: number }[] = [];
  for (let i = 0; i < full.length; i += 1) {
    const a = full[i];
    const c = full[(i + 1) % full.length];
    const dd = dist(vtx, a, c);
    if (dd < 200) near.push({ what: `conv #${i} ${fmt(a)}→${fmt(c)} (${Math.hypot(c.x - a.x, c.y - a.y).toFixed(0)} cm; its ends ${toBoundary(b, a).d.toFixed(0)} / ${toBoundary(b, c).d.toFixed(0)} cm from the boundary)`, dd, toB: 0 });
  }
  near.sort((x, y) => x.dd - y.dd);
  console.log(`   input segments within 2 m of that vertex (${near.length}); nearest ${near.length > 0 ? near[0].dd.toFixed(1) : '—'} cm (router fidelity bound ${FID.toFixed(1)} cm):`);
  for (const n of near.slice(0, 10)) console.log(`      ${n.dd.toFixed(1)} cm  ${n.what}`);
  // the exact sum boundary near the vertex: the nearest point at distance exactly d along the inward normal is unknown;
  // report the convolution's outermost envelope proxy: the max over the convolution vertices within 3 m of their distance
  let env = -Infinity;
  for (const c of full) if (Math.hypot(c.x - vtx.x, c.y - vtx.y) < 300) env = Math.max(env, toBoundary(b, c).d);
  console.log(`   convolution vertices within 3 m of it lie up to ${env.toFixed(1)} cm from the boundary`);
  console.log(`   overlay warnings: ${JSON.stringify(u.warnings)}`);
}
