// Q133 overlay probe (read-only; offline): replays the kernel's `buildOverlay` (arr/winding.ts:112–190) on S6's union
// operands — [the boundary], [its full convolution] — segment by segment, with the kernel's own modules (createPlat,
// attachIndex, insertTx, insertChain: the same module instances winding.ts imports), to name the input segment whose
// two-point mandatory chain insertChain refuses (the relay at winding.ts:189), or to report that every segment inserts
// (then the refusal would be bridgeGaps' at :256).
// usage (from <plat>): corepack pnpm exec tsx --conditions=plat-source <scratch>/q133/overlay-probe.mts <s6in.json>... [--plat <plat root>]
import { pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const argv = process.argv.slice(2);
const pi = argv.indexOf('--plat');
const plat = resolve(pi >= 0 ? argv[pi + 1] : process.cwd());
const files = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1] === '--plat'));
const src = (p: string) => pathToFileURL(join(plat, 'packages/kernel/src', p)).href;
const { createPlat } = await import(src('arena/index.ts'));
const { attachIndex } = await import(src('index/index.ts'));
const { insertTx } = await import(src('insert/classes.ts'));
const { insertChain } = await import(src('insert/insertChain.ts'));
const { LATTICE } = await import(src('num/index.ts'));
const { distinctRing } = await import(src('geom/common.ts'));
const L = await import(pathToFileURL(join(plat, 'packages/layout/src/index.ts')).href);
const { convolution, mergeCollinear } = L;
type P = { x: number; y: number };
const fmt = (p: P) => `(${p.x}, ${p.y})`;
const FRAME_MARGIN_CM = 4096;
function gridCellFor(minX: number, minY: number, maxX: number, maxY: number, segments: number): number {
  const area = (maxX - minX + 1) * (maxY - minY + 1);
  let cell = 64;
  while (cell < 1_048_576 && cell * cell * Math.max(1, segments) < area) cell *= 2;
  return cell;
}
for (const f of files) {
  const j = JSON.parse(readFileSync(f, 'utf8'));
  const b: P[] = mergeCollinear(j.boundary.map(([x, y]: number[]) => ({ x, y })));
  const full: P[] = convolution(b, 5000, 'arc');
  const operands = [[b.slice()], [full]];
  const segments: { a: P; b: P; op: number; idx: number }[] = [];
  const byKey = new Map<string, number>();
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let k = 0; k < operands.length; k += 1) {
    for (const ringIn of operands[k]) {
      const ring = distinctRing(ringIn) as P[];
      const n = ring.length;
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const c = ring[i + 1 === n ? 0 : i + 1];
        minX = Math.min(minX, a.x); minY = Math.min(minY, a.y); maxX = Math.max(maxX, a.x); maxY = Math.max(maxY, a.y);
        const fw = a.x < c.x || (a.x === c.x && a.y < c.y);
        const key = fw ? `${a.x},${a.y},${c.x},${c.y}` : `${c.x},${c.y},${a.x},${a.y}`;
        if (!byKey.has(key)) {
          byKey.set(key, segments.length);
          segments.push({ a, b: c, op: k, idx: i });
        }
      }
    }
  }
  const p = createPlat({ layer: 'ground', part: 0 }, { widthCm: 2 * LATTICE.rangeCm, heightCm: 2 * LATTICE.rangeCm, aspect: 1, marginShare: 0 });
  attachIndex(p, { gridCellCm: gridCellFor(minX, minY, maxX, maxY, segments.length) });
  const tx = insertTx(p, 0);
  const lim = LATTICE.rangeCm - 1;
  const fx0 = Math.max(-lim, minX - FRAME_MARGIN_CM), fy0 = Math.max(-lim, minY - FRAME_MARGIN_CM);
  const fx1 = Math.min(lim, maxX + FRAME_MARGIN_CM), fy1 = Math.min(lim, maxY + FRAME_MARGIN_CM);
  const fr = insertChain(tx, [{ x: fx0, y: fy0 }, { x: fx1, y: fy0 }, { x: fx1, y: fy1 }, { x: fx0, y: fy1 }], [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true });
  if (!fr.ok) {
    console.log(`== seed ${j.seed}: the frame refused: ${fr.code} ${fr.detail}`);
    continue;
  }
  let failed = false;
  for (let s = 0; s < segments.length; s += 1) {
    const seg = segments[s];
    const r = insertChain(tx, [seg.a, seg.b], [{ role: 'invisible', entity: `arr:s${s}` }], 'mandatory');
    if (!r.ok && !(r.code === 'E_DEGENERATE' && r.detail === 'empty')) {
      console.log(`== seed ${j.seed}: input segment s${s} of ${segments.length} refused (the relay at winding.ts:189): operand ${seg.op === 0 ? 'A (the boundary)' : 'B (the full convolution)'}, its segment #${seg.idx} ${fmt(seg.a)}→${fmt(seg.b)} (${Math.hypot(seg.b.x - seg.a.x, seg.b.y - seg.a.y).toFixed(0)} cm), after ${s} segments inserted: ${r.code} ${r.detail}`);
      failed = true;
      break;
    }
  }
  if (!failed) console.log(`== seed ${j.seed}: every one of ${segments.length} input segments inserted (a refusal would then be bridgeGaps', winding.ts:256)`);
}
