// Q133 perimeter probe (read-only; offline): re-runs S6's perimeter (`settlementPerimeter`, M0-e-04) on the S6 input
// derive-one.mts captured (S5's last boundary, the frame) with the kernel's own `booleans` / `buffer` (pure value ops:
// no arena), and reads why each of its three constructions fails: the two fast rings (simpleCcw / isSumRing at
// SUM_TOLERANCE_CM), the overlay union (booleans 'union' of the boundary and its full convolution) and the overlay
// ring's sum check (isSumRing at OVERLAY_TOLERANCE_CM, re-done clause by clause to name the failing ring edge).
// usage (from <plat>): corepack pnpm exec tsx --conditions=plat-source <scratch>/q133/perimeter-probe.mts <s6in.json>... [--plat <plat root>]
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
const { booleans, buffer, area2, LATTICE } = K;
const { settlementPerimeter, settlementPerimeterByBuffer, convolution, unloop, simpleCcw, isSumRing, mergeCollinear, OVERLAY_TOLERANCE_CM, SUM_TOLERANCE_CM } = L;
const T = await import(pathToFileURL(join(plat, 'packages/layout/src/districts/table.ts')).href);
const { districtCells } = T;
const { distToSegment2, segmentsMeet, insideRing } = G;
type P = { x: number; y: number };
const kernel = { geom: { booleans, buffer } } as never;

function largestOuter(rings: readonly P[][]): P[] | null {
  let best: P[] | null = null;
  let bestArea = 0;
  for (const r of rings) {
    const a = area2(r);
    if (a > bestArea) {
      bestArea = a;
      best = r.slice();
    }
  }
  return best;
}
const fmt = (p: P) => `(${p.x}, ${p.y})`;
const dist = (p: P, a: P, b: P) => Math.sqrt(distToSegment2(p, a, b));

/** The nearest boundary edge to p: index and distance (cm). */
function nearestEdge(b: P[], p: P): { i: number; d: number } {
  let best = { i: -1, d: Infinity };
  for (let i = 0; i < b.length; i += 1) {
    const d = dist(p, b[i], b[(i + 1) % b.length]);
    if (d < best.d) best = { i, d };
  }
  return best;
}

/** The self-crossings of a closed ring (non-adjacent edges that meet), first few. */
function selfCrossings(r: P[], max = 6): { i: number; j: number; at: P }[] {
  const out: { i: number; j: number; at: P }[] = [];
  const n = r.length;
  for (let i = 0; i < n && out.length < max; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % n];
    for (let j = i + 2; j < n && out.length < max; j += 1) {
      if (i === 0 && j === n - 1) continue;
      const c = r[j];
      const d = r[(j + 1) % n];
      if (Math.max(a.x, b.x) < Math.min(c.x, d.x) || Math.max(c.x, d.x) < Math.min(a.x, b.x) || Math.max(a.y, b.y) < Math.min(c.y, d.y) || Math.max(c.y, d.y) < Math.min(a.y, b.y)) continue;
      if (segmentsMeet(a, b, c, d)) out.push({ i, j, at: { x: Math.round((a.x + b.x) / 2), y: Math.round((a.y + b.y) / 2) } });
    }
  }
  return out;
}


/** The signed turn (degrees) at boundary vertex i (CCW ring: + convex, − reflex) and the orient2d sign. */
function turnAt(b: P[], i: number): { deg: number; o: number } {
  const n = b.length;
  const a = b[(i + n - 1) % n];
  const v = b[i];
  const c = b[(i + 1) % n];
  const t1 = Math.atan2(v.y - a.y, v.x - a.x);
  const t2 = Math.atan2(c.y - v.y, c.x - v.x);
  let dt = t2 - t1;
  while (dt > Math.PI) dt -= 2 * Math.PI;
  while (dt < -Math.PI) dt += 2 * Math.PI;
  const o = (v.x - a.x) * (c.y - a.y) - (v.y - a.y) * (c.x - a.x);
  return { deg: (dt * 180) / Math.PI, o: Math.sign(o) };
}
/** min / max over 257 samples along pq of the distance (cm) to the boundary as a whole. */
function profile(b: P[], p: P, q: P): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (let s = 0; s <= 256; s += 1) {
    const x = { x: p.x + ((q.x - p.x) * s) / 256, y: p.y + ((q.y - p.y) * s) / 256 };
    const d = nearestEdge(b, x).d;
    min = Math.min(min, d);
    max = Math.max(max, d);
  }
  return { min, max };
}
/** The boundary edges i0..i1 (inclusive, ring order) with lengths and the turn at each inner vertex. */
function run(b: P[], i0: number, i1: number): string {
  const n = b.length;
  const out: string[] = [];
  for (let i = i0; ; i = (i + 1) % n) {
    const a = b[i];
    const c = b[(i + 1) % n];
    out.push(`#${i} ${Math.hypot(c.x - a.x, c.y - a.y).toFixed(0)} cm`);
    if (i === i1) break;
    const t = turnAt(b, (i + 1) % n);
    out.push(`turn ${t.deg.toFixed(3)}° (orient ${t.o})`);
    if (out.length > 40) break;
  }
  return out.join(', ');
}

/** isSumRing re-done clause by clause (perimeter.ts's order), naming the first failing ring edge and why. */
function sumCheckWhy(given: P[], ring: P[], d: number, tol: number): string {
  const boundary = mergeCollinear(given) as P[];
  const n = boundary.length;
  const m = ring.length;
  if (!insideRing(ring, boundary[0])) return 'enclosure: the boundary\'s first vertex is not inside the ring';
  const lo = d - tol;
  const hi = d + tol;
  const fails: string[] = [];
  for (let r = 0; r < m; r += 1) {
    const p = ring[r];
    const q = ring[(r + 1) % m];
    let near = false;
    let bestNear = { i: -1, dp: Infinity, dq: Infinity };
    for (let i = 0; i < n; i += 1) {
      const a = boundary[i];
      const b = boundary[(i + 1) % n];
      if (segmentsMeet(p, q, a, b)) {
        fails.push(`ring edge ${r} ${fmt(p)}→${fmt(q)} CROSSES boundary edge ${i} ${fmt(a)}→${fmt(b)}`);
        continue;
      }
      const dp = dist(p, a, b);
      const dq = dist(q, a, b);
      const da = dist(a, p, q);
      const db = dist(b, p, q);
      const low = Math.min(dp, dq, da, db);
      if (low < lo) fails.push(`ring edge ${r} ${fmt(p)}→${fmt(q)} (${Math.hypot(q.x - p.x, q.y - p.y).toFixed(0)} cm) comes ${low.toFixed(1)} cm from boundary edge ${i} ${fmt(a)}→${fmt(b)} (< d − tol = ${lo} cm)`);
      if (dp <= hi && dq <= hi) near = true;
      if (Math.max(dp, dq) < Math.max(bestNear.dp, bestNear.dq)) bestNear = { i, dp, dq };
    }
    if (!near) {
      const a = boundary[bestNear.i];
      const b = boundary[(bestNear.i + 1) % n];
      const np = nearestEdge(boundary, p);
      const nq = nearestEdge(boundary, q);
      const pr = profile(boundary, p, q);
      fails.push(`ring edge ${r} ${fmt(p)}→${fmt(q)} (${Math.hypot(q.x - p.x, q.y - p.y).toFixed(0)} cm) has no ONE boundary edge within d + tol = ${hi} cm of both ends: best edge ${bestNear.i} ${fmt(a)}→${fmt(b)} at ${bestNear.dp.toFixed(1)} / ${bestNear.dq.toFixed(1)} cm; p's nearest edge ${np.i} at ${np.d.toFixed(1)} cm, q's nearest edge ${nq.i} at ${nq.d.toFixed(1)} cm` +
        `\n        distance of the ring edge to the boundary AS A WHOLE over 257 samples: min ${pr.min.toFixed(1)} cm, max ${pr.max.toFixed(1)} cm (the shell is [${lo}, ${hi}])` +
        `\n        the boundary edges it runs beside: ${run(boundary, Math.min(np.i, nq.i), Math.max(np.i, nq.i))}`);
    }
    if (fails.length >= 8) break;
  }
  return fails.length === 0 ? 'passes' : fails.join('\n      ');
}

/** The boundary's narrowest necks: pairs of boundary vertices ≥ `skip` apart along the ring and closer than `below` cm (fewest). */
function necks(b: P[], below: number, skip = 8, max = 5): string[] {
  const n = b.length;
  const out: { d: number; i: number; j: number }[] = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = i + skip; j < n; j += 1) {
      if (n - (j - i) < skip) continue;
      const d = Math.min(dist(b[i], b[j], b[(j + 1) % n]), dist(b[j], b[i], b[(i + 1) % n]));
      if (d < below) out.push({ d, i, j });
    }
  }
  out.sort((x, y) => x.d - y.d);
  const keep: typeof out = [];
  for (const o of out) if (!keep.some((k) => Math.abs(k.i - o.i) < skip && Math.abs(k.j - o.j) < skip)) keep.push(o);
  return keep.slice(0, max).map((o) => `vertices ${o.i} ${fmt(b[o.i])} and ${o.j} ${fmt(b[o.j])} (${o.j - o.i} apart along the ring): ${o.d.toFixed(0)} cm`);
}

for (const f of files) {
  const j = JSON.parse(readFileSync(f, 'utf8'));
  const boundary: P[] = j.boundary.map(([x, y]: number[]) => ({ x, y }));
  const frame: P[] = j.frame.map(([x, y]: number[]) => ({ x, y }));
  const d = Math.round(districtCells(undefined).perimeterOffsetM * 100);
  const lines: string[] = [];
  lines.push(`== seed ${j.seed} (${j.tree}): S5's last boundary k=${j.lastWithLand}, ${boundary.length} points, area ${(area2(boundary) / 2 / 1e8).toFixed(2)} ha; offset d = ${d} cm; attractCm ${LATTICE.attractCm}, minEdge ${LATTICE.minEdgeCm}; SUM_TOL ${SUM_TOLERANCE_CM}, OVERLAY_TOL ${OVERLAY_TOLERANCE_CM}`);
  const t0 = performance.now();
  const r0 = settlementPerimeter(boundary, kernel, { frame });
  lines.push(`  settlementPerimeter (offline, no arena): ${r0.ok ? `ok, ${r0.value.length} points` : `${r0.code} ${r0.detail}`}  [${(performance.now() - t0).toFixed(0)} ms]`);
  const b = mergeCollinear(boundary) as P[];
  lines.push(`  mergeCollinear: ${boundary.length} → ${b.length} points`);
  const fast1 = unloop(convolution(b, d, 'miter'));
  const s1 = simpleCcw(fast1);
  lines.push(`  fast ring 1 (miter, unloop): ${fast1.length} pts, simpleCcw ${s1}, isSumRing(5 cm) ${s1 ? isSumRing(b, fast1, d, SUM_TOLERANCE_CM) : 'n/a'}`);
  if (s1 && !isSumRing(b, fast1, d, SUM_TOLERANCE_CM)) lines.push(`      why (fast 1, first clauses): ${sumCheckWhy(b, fast1, d, SUM_TOLERANCE_CM).split('\n')[0]}`);
  if (!s1) for (const c of selfCrossings(fast1, 3)) lines.push(`      self-crossing: edges ${c.i} and ${c.j} near ${fmt(c.at)} (nearest boundary edge ${nearestEdge(b, c.at).i} at ${nearestEdge(b, c.at).d.toFixed(0)} cm)`);
  const fast2 = unloop(convolution(b, d, 'onSegments') as P[]);
  const s2 = simpleCcw(fast2);
  lines.push(`  fast ring 2 (onSegments, unloop): ${fast2.length} pts, simpleCcw ${s2}, isSumRing(5 cm) ${s2 ? isSumRing(b, fast2, d, SUM_TOLERANCE_CM) : 'n/a'}`);
  if (!s2) for (const c of selfCrossings(fast2, 3)) lines.push(`      self-crossing: edges ${c.i} and ${c.j} near ${fmt(c.at)} (nearest boundary edge ${nearestEdge(b, c.at).i} at ${nearestEdge(b, c.at).d.toFixed(0)} cm)`);
  lines.push(`  boundary necks under 2d = ${2 * d} cm: ${necks(b, 2 * d).join('; ') || 'none'}`);
  const full = convolution(b, d, 'arc') as P[];
  const t1 = performance.now();
  const u = booleans('union', [b.slice()], [full], 'nonzero');
  lines.push(`  overlay: booleans('union', [boundary], [full convolution ${full.length} pts], 'nonzero'): ${u.ok ? `ok, ${u.value.length} rings; warnings ${JSON.stringify((u.warnings ?? []).map((w: { code: string }) => w.code).reduce((m: Record<string, number>, c: string) => ((m[c] = (m[c] ?? 0) + 1), m), {}))}` : `${u.code} ${u.detail}`}  [${(performance.now() - t1).toFixed(0)} ms]`);
  if (!u.ok) {
    const m = /from \((-?\d+), (-?\d+)\) to \((-?\d+), (-?\d+)\).*farthest vertex \((-?\d+), (-?\d+)\), ([\d.]+) cm/.exec(u.detail);
    if (m !== null) {
      const A = { x: +m[1], y: +m[2] };
      const B = { x: +m[3], y: +m[4] };
      const F = { x: +m[5], y: +m[6] };
      const na = nearestEdge(b, A);
      const nb = nearestEdge(b, B);
      lines.push(`      the refused segment ${fmt(A)}→${fmt(B)} (${Math.hypot(B.x - A.x, B.y - A.y).toFixed(0)} cm): its ends lie ${na.d.toFixed(0)} / ${nb.d.toFixed(0)} cm from the boundary (edges ${na.i}, ${nb.i}) — on the convolution curve (d = ${d})`);
      // which input segments of the convolution are that segment, and how many other convolution segments pass within 2·attractCm
      let segIdx = -1;
      for (let i = 0; i < full.length; i += 1) {
        const p = full[i];
        const q = full[(i + 1) % full.length];
        if ((p.x === A.x && p.y === A.y && q.x === B.x && q.y === B.y) || (p.x === B.x && p.y === B.y && q.x === A.x && q.y === A.y)) segIdx = i;
      }
      const close: string[] = [];
      for (let i = 0; i < full.length; i += 1) {
        if (Math.abs(i - segIdx) <= 1) continue;
        const p = full[i];
        const q = full[(i + 1) % full.length];
        const dd = Math.min(dist(p, A, B), dist(q, A, B), dist(A, p, q), dist(B, p, q));
        if (segmentsMeet(p, q, A, B) || dd < 4 * LATTICE.attractCm) close.push(`#${i} ${fmt(p)}→${fmt(q)} ${segmentsMeet(p, q, A, B) ? 'CROSSES' : `${dd.toFixed(0)} cm`}`);
      }
      lines.push(`      it is convolution segment #${segIdx} of ${full.length}; the farthest vertex of its design route ${fmt(F)} is ${m[7]} cm off (fidelity bound 2√2·attractCm = ${(2 * Math.SQRT2 * LATTICE.attractCm).toFixed(1)} cm)`);
      lines.push(`      convolution segments within 4·attractCm of it or crossing it (${close.length}): ${close.slice(0, 12).join('; ')}${close.length > 12 ? ' …' : ''}`);
      // the boundary edges near the refused segment (within d + 4·attract)
      const near: string[] = [];
      for (let i = 0; i < b.length; i += 1) {
        const p = b[i];
        const q = b[(i + 1) % b.length];
        const dd = Math.min(dist(A, p, q), dist(B, p, q));
        if (dd < d + 200) near.push(`#${i} ${fmt(p)}→${fmt(q)} (${Math.hypot(q.x - p.x, q.y - p.y).toFixed(0)} cm) at ${dd.toFixed(0)} cm`);
      }
      lines.push(`      boundary edges within d + 2 m of it (${near.length}): ${near.slice(0, 10).join('; ')}`);
      const idx = near.map((s) => Number(/^#(\d+)/.exec(s)![1]));
      if (idx.length > 0) {
        const i0 = Math.min(...idx);
        const i1 = Math.max(...idx);
        let sum = 0;
        let len = 0;
        for (let i = i0 + 1; i <= i1; i += 1) sum += turnAt(b, i).deg;
        for (let i = i0; i <= i1; i += 1) len += Math.hypot(b[(i + 1) % b.length].x - b[i].x, b[(i + 1) % b.length].y - b[i].y);
        lines.push(`      that boundary run #${i0}..#${i1}: ${run(b, i0, i1)}`);
        lines.push(`      net turn over the run ${sum.toFixed(1)}° over ${len.toFixed(0)} cm (mean radius of curvature ${(len / Math.abs((sum * Math.PI) / 180)).toFixed(0)} cm against d = ${d} cm)`);
      }
    }
  } else {
    const outer = largestOuter(u.value as P[][]);
    if (outer !== null) {
      lines.push(`      overlay outer ring: ${outer.length} pts, simpleCcw ${simpleCcw(outer)}, isSumRing(${OVERLAY_TOLERANCE_CM} cm) ${isSumRing(b, outer, d, OVERLAY_TOLERANCE_CM)}`);
      lines.push(`      why: ${sumCheckWhy(b, outer, d, OVERLAY_TOLERANCE_CM)}`);
    }
  }
  const t2 = performance.now();
  const bb = settlementPerimeterByBuffer(boundary, kernel, { frame });
  let bbCheck = '';
  if (bb.ok) bbCheck = `, simpleCcw ${simpleCcw(bb.value)}, isSumRing(${OVERLAY_TOLERANCE_CM}) ${isSumRing(b, bb.value, d, OVERLAY_TOLERANCE_CM)}`;
  lines.push(`  settlementPerimeterByBuffer (the buffer reference form): ${bb.ok ? `ok, ${bb.value.length} pts${bbCheck}` : `${bb.code} ${bb.detail}`}  [${(performance.now() - t2).toFixed(0)} ms]`);
  if (bb.ok && !isSumRing(b, bb.value, d, OVERLAY_TOLERANCE_CM)) lines.push(`      why: ${sumCheckWhy(b, bb.value, d, OVERLAY_TOLERANCE_CM)}`);
  console.log(lines.join('\n'));
}
