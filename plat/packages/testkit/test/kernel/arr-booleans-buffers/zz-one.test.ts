// SCRATCH (M0-a-08 seat; deleted before landing)
import { appendFileSync } from 'node:fs';
import { it } from 'vitest';
import { buffer, bufferParts, buildOverlay, isHalfEdgeLive, type LatticePoint } from '@plat/kernel';
import { buffer as bufferSrc } from '../../../../kernel/src/arr/buffer.ts';
import { partsOutline, UNION_FAN_IN } from '../../../../kernel/src/arr/buffer.ts';
import { overlayRegion } from '../../../../kernel/src/arr/winding.ts';
const log = (...a: unknown[]): void => appendFileSync(process.env.OUT as string, a.map(String).join(' ') + '\n');
type R = LatticePoint[];
it('one', () => {
  const full = [{"x":-3825,"y":-6840},{"x":-3800,"y":-6890},{"x":-7297,"y":-4449},{"x":-10660,"y":-2472},{"x":-10618,"y":-2507}];
  log('pkg', JSON.stringify(buffer([full] as never, 3, 'square', 'round')).slice(0, 300)); log('src', JSON.stringify(bufferSrc([full] as never, 3, 'square', 'round')).slice(0, 300));
  const parts = bufferParts([full] as never, 3, 'square', 'round');
  if (!parts.ok) return;
  let level: R[][] = (parts.value as R[]).map((p) => [p]);
  let lv = 0;
  for (;;) {
    const next: R[][] = [];
    for (let i = 0; i < level.length; i += UNION_FAN_IN) {
      const g = level.slice(i, i + UNION_FAN_IN);
      if (g.length === 1 && level.length > 1) { next.push(g[0]); continue; }
      const rings = partsOutline(g.flat());
      const ov = buildOverlay([rings]);
      if (ov.ok) {
        const p = ov.value.plat; const O = p.halfEdges.origin; const X = p.vertices.x; const Y = p.vertices.y;
        for (let e = 0; e < p.slots.pair.top; e++) { if (!isHalfEdgeLive(p, 2 * e)) continue; const a = O[2 * e], b = O[2 * e + 1]; const L = Math.hypot(X[a] - X[b], Y[a] - Y[b]); if (L < 25) log('level', lv, 'group', i, 'short edge', X[a], Y[a], X[b], Y[b]); }
      }
      const r = overlayRegion([rings], (w) => w[0] !== 0);
      log('level', lv, 'group', i, 'in', JSON.stringify(rings).slice(0, 600), 'out', r.ok ? JSON.stringify(r.value).slice(0, 400) : r.code);
      if (r.ok && r.value.length > 0) next.push(r.value as R[]);
    }
    if (next.length <= 1) break;
    level = next; lv++;
  }
});
