// Q133: is S6's input (S5's last boundary) lawful geometry? simple + CCW (perimeter.ts's simpleCcw), its least edge,
// its sharpest interior angle, its exactly collinear vertices, and its reflex-vertex share. Read-only.
// usage (from <plat>): corepack pnpm exec tsx --conditions=plat-source <scratch>/q133/boundary-lawful.mts <s6in.json>...
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
const plat = process.cwd();
const L = await import(pathToFileURL(join(plat, 'packages/layout/src/index.ts')).href);
const K = await import(pathToFileURL(join(plat, 'packages/kernel/src/index.ts')).href);
const { simpleCcw, mergeCollinear } = L;
const { area2, LATTICE } = K;
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(readFileSync(f, 'utf8'));
  const b = j.boundary.map(([x, y]: number[]) => ({ x, y }));
  const n = b.length;
  let minEdge = Infinity;
  let minAngle = 360;
  let reflex = 0;
  for (let i = 0; i < n; i += 1) {
    const a = b[(i + n - 1) % n], v = b[i], c = b[(i + 1) % n];
    minEdge = Math.min(minEdge, Math.hypot(c.x - v.x, c.y - v.y));
    const t1 = Math.atan2(a.y - v.y, a.x - v.x), t2 = Math.atan2(c.y - v.y, c.x - v.x);
    let ang = Math.abs(((t1 - t2) * 180) / Math.PI);
    if (ang > 180) ang = 360 - ang;
    minAngle = Math.min(minAngle, ang);
    if ((v.x - a.x) * (c.y - a.y) - (v.y - a.y) * (c.x - a.x) < 0) reflex += 1;
  }
  console.log(`seed ${j.seed}: ${n} pts, area2>0 ${area2(b) > 0}, simpleCcw ${simpleCcw(b)}, exactly-collinear merged ${n - mergeCollinear(b).length}, least edge ${minEdge.toFixed(0)} cm (minEdge ${LATTICE.minEdgeCm}), sharpest vertex angle ${minAngle.toFixed(1)}°, reflex vertices ${reflex} of ${n}; stages k: ${j.stages.map((s: any) => `${s.k}${s.walled ? 'w' : ''}${s.folded ? 'f' : ''}`).join(',')}`);
}
