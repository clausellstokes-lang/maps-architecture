// Review probe (read-only, the S20 branch's kerbExact.ts in a scratch kernel mirror): does exactRegion keep a long
// sub-centimetre kerb island between two bands, and does one collinear vertex that carries no geometry (a T-vertex on a
// strip's edge: what unreduced parts carry and reduced parts drop) change the island's extent by metres?
// Usage: tsx probe-island.ts <kmirror>
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

type P = { x: number; y: number };
const dir = process.argv[2];
const kx = (await import(pathToFileURL(join(dir, 'src/arr/kerbExact.ts')).href)) as { exactRegion: (r: P[][], parts: P[][]) => P[][] };

const area2 = (r: P[]): number => {
  let a = 0;
  for (let i = 0; i < r.length; i += 1) a += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
  return a;
};
const segDist = (q: P, a: P, b: P): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
  return Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy);
};
const toRings = (rs: P[][], q: P): number => {
  let d = Infinity;
  for (const r of rs) for (let i = 0; i < r.length; i += 1) d = Math.min(d, segDist(q, r[i], r[(i + 1) % r.length]));
  return d;
};
// directed Hausdorff over ring vertices and edge samples every 5 cm (boundary form, as hausdorffFast reads regions)
const samples = (rs: P[][]): P[] => {
  const out: P[] = [];
  for (const r of rs) for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 5));
    for (let k = 0; k < n; k += 1) out.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n });
  }
  return out;
};
const haus = (A: P[][], B: P[][]): number => Math.max(...samples(A).map((q) => toRings(B, q)), ...samples(B).map((q) => toRings(A, q)));
const show = (label: string, X: P[][]): void => {
  console.log(`${label}: ${X.length} ring(s)`);
  for (const r of X) {
    let w = 0;
    let len = 0;
    const xs = r.map((q) => q.x);
    len = Math.max(...xs) - Math.min(...xs);
    w = Math.abs(area2(r)) / 2 / Math.max(1, len);
    console.log(`   ${r.length} pts, area ${(Math.abs(area2(r)) / 2).toFixed(1)} cm², x-extent ${len} cm, mean width ${w.toFixed(3)} cm: ${r.map((q) => `${q.x},${q.y}`).join(' ')}`);
  }
};

// F: a 40 m × 30 m face. Band A (an edge spine's strip) holds y < 1000. Band B (a second spine's strip, 300 cm wide)
// starts on A's top-left corner and opens by 1 cm over 42 m: between them a kerb sliver ≤ 1 cm wide (the definition's
// own region: F − (A ∪ B) holds it). The rest of F's kerb lies above B.
const F: P[][] = [[{ x: 0, y: 0 }, { x: 4000, y: 0 }, { x: 4000, y: 3000 }, { x: 0, y: 3000 }]];
const A: P[] = [{ x: -100, y: -100 }, { x: 4100, y: -100 }, { x: 4100, y: 1000 }, { x: -100, y: 1000 }];
const B: P[] = [{ x: -100, y: 1000 }, { x: 4100, y: 1001 }, { x: 4100, y: 1301 }, { x: -100, y: 1300 }];
// the same band A with one collinear vertex on its top edge (a T-vertex: no geometry, one more hot pixel)
const At: P[] = [{ x: -100, y: -100 }, { x: 4100, y: -100 }, { x: 4100, y: 1000 }, { x: 1900, y: 1000 }, { x: -100, y: 1000 }];

const X = kx.exactRegion(F, [A, B]);
const Xt = kx.exactRegion(F, [At, B]);
show('X (reduced parts)', X);
show('X (A with a collinear T-vertex at (1900, 1000))', Xt);
console.log(`Hausdorff X vs X-with-T (boundary samples, cm): ${haus(X, Xt).toFixed(2)}`);
const big = (rs: P[][]): P[][] => rs.filter((r) => Math.abs(area2(r)) / 2 > 10_000);
console.log(`Hausdorff of the large components only: ${haus(big(X), big(Xt)).toFixed(2)}`);
