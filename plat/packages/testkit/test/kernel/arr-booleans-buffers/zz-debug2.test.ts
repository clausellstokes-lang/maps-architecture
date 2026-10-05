import { appendFileSync, readFileSync } from 'node:fs';
import { it } from 'vitest';
import { buildOverlay, windingLabels, isHalfEdgeLive } from '@plat/kernel';
const log = (...a: unknown[]): void => appendFileSync(process.env.DBG_OUT as string, a.map(String).join(' ') + '\n');

it('debug2', () => {
  (globalThis as any).__dbg = (m: string) => log(m);
  const fails = JSON.parse(readFileSync(process.env.DBG_FILE as string, 'utf8'));
  const k = Number(process.env.DBG_IDX);
  const c = fails[k].case;
  const ov = buildOverlay([c.a, c.b]);
  if (!ov.ok) { log('overlay refused', ov.code, ov.detail); return; }
  const o = ov.value;
  const p = o.plat;
  const lab = windingLabels(o);
  log('consistent', lab.consistent, 'warnings', JSON.stringify(o.warnings));
  const div = new Map<number, number[]>();
  for (let e = 0; e < p.slots.pair.top; e += 1) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const a = p.halfEdges.origin[2 * e];
    const b = p.halfEdges.origin[2 * e + 1];
    for (let j = 0; j < o.operands; j += 1) {
      const n = o.net[e * o.operands + j];
      if (n === 0) continue;
      const da = div.get(a) ?? [0, 0]; da[j] += n; div.set(a, da);
      const db = div.get(b) ?? [0, 0]; db[j] -= n; div.set(b, db);
    }
  }
  for (const [v, d] of div) if (d.some((x) => x !== 0)) log('divergence at', v, p.vertices.x[v], p.vertices.y[v], JSON.stringify(d));
  log('vertices', p.slots.vertex?.top ?? '?', 'pairs', p.slots.pair.top);
});
