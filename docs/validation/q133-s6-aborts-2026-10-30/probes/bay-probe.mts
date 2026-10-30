// Q133 bay probe (read-only; offline): for each refusal location, the run of consecutive reflex vertices of S5's last
// boundary nearest it: the run's vertices, net turn, length and mean radius of curvature against the 50 m offset (a
// concave bay whose radius is below the offset folds its outward offset into a swallowtail; the full convolution runs
// a reverse arc at each reflex vertex inside it).
// usage (from <plat>): corepack pnpm exec tsx --conditions=plat-source <scratch>/q133/bay-probe.mts <s6in.json>:<x>,<y> ...
import { readFileSync } from 'node:fs';
type P = { x: number; y: number };
const d2 = (p: P, a: P, b: P) => {
  const dx = b.x - a.x, dy = b.y - a.y, L = dx * dx + dy * dy;
  let t = L === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / L;
  t = Math.max(0, Math.min(1, t));
  const qx = a.x + t * dx - p.x, qy = a.y + t * dy - p.y;
  return qx * qx + qy * qy;
};
for (const arg of process.argv.slice(2)) {
  const [file, xy] = arg.split(':');
  const [x, y] = xy.split(',').map(Number);
  const at = { x, y };
  const j = JSON.parse(readFileSync(file, 'utf8'));
  const b: P[] = j.boundary.map(([px, py]: number[]) => ({ x: px, y: py }));
  const n = b.length;
  const turn = (i: number) => {
    const a = b[(i + n - 1) % n], v = b[i], c = b[(i + 1) % n];
    let t = Math.atan2(c.y - v.y, c.x - v.x) - Math.atan2(v.y - a.y, v.x - a.x);
    while (t > Math.PI) t -= 2 * Math.PI;
    while (t < -Math.PI) t += 2 * Math.PI;
    return t;
  };
  // the reflex vertices within d + 10 m of the location, grouped into their maximal consecutive runs
  let best: { i0: number; i1: number; turn: number; len: number; dmin: number } | null = null;
  for (let i = 0; i < n; i += 1) {
    if (turn(i) >= 0 || turn((i + n - 1) % n) < 0) continue; // a run starts here
    let k = i;
    while (turn((k + 1) % n) < 0 && (k + 1) % n !== i) k = (k + 1) % n;
    let tt = 0, len = 0, dmin = Infinity;
    for (let m = i; ; m = (m + 1) % n) {
      tt += turn(m);
      dmin = Math.min(dmin, Math.sqrt(d2(at, b[m], b[(m + 1) % n])));
      if (m === k) break;
      len += Math.hypot(b[(m + 1) % n].x - b[m].x, b[(m + 1) % n].y - b[m].y);
    }
    if (best === null || dmin < best.dmin) best = { i0: i, i1: k, turn: tt, len, dmin };
  }
  if (best === null) continue;
  // the half-edges at the run's ends count half: the radius over the run's inner edges plus the two halves
  const half = (Math.hypot(b[best.i0].x - b[(best.i0 + n - 1) % n].x, b[best.i0].y - b[(best.i0 + n - 1) % n].y) + Math.hypot(b[(best.i1 + 1) % n].x - b[best.i1].x, b[(best.i1 + 1) % n].y - b[best.i1].y)) / 2;
  const L = best.len + half;
  const turns: string[] = [];
  for (let m = best.i0; ; m = (m + 1) % n) {
    turns.push(`${((turn(m) * 180) / Math.PI).toFixed(1)}`);
    if (m === best.i1) break;
  }
  console.log(`seed ${j.seed} at (${x}, ${y}): the nearest reflex run is vertices #${best.i0}–#${best.i1} (${turns.length} reflex vertices, turns ${turns.join(', ')}°), net ${((best.turn * 180) / Math.PI).toFixed(1)}° over ${(L / 100).toFixed(1)} m: mean radius of curvature ${(L / Math.abs(best.turn) / 100).toFixed(1)} m against the 50 m offset; the run passes ${(best.dmin / 100).toFixed(1)} m from the location`);
}
