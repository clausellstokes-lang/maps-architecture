// SCRATCH (M0-a-08 seat debugging; deleted before landing): faces of one operand's overlay with their winding numbers.
import { appendFileSync, readFileSync } from 'node:fs';
import { it } from 'vitest';
import { buildOverlay, faceWalk, isFaceLive, windingLabels } from '@plat/kernel';
const log = (...a: unknown[]): void => appendFileSync(process.env.DBG_OUT as string, a.map(String).join(' ') + '\n');

it('debug6', () => {
  const fails = JSON.parse(readFileSync(process.env.DBG_FILE as string, 'utf8'));
  const c = fails[Number(process.env.DBG_IDX)].case;
  const which = process.env.DBG_WHICH ?? 'ab';
  const ops = which === 'a' ? [c.a] : which === 'b' ? [c.b] : [c.a, c.b];
  const ov = buildOverlay(ops);
  if (!ov.ok) return log('refused', ov.code);
  const o = ov.value;
  const p = o.plat;
  const lab = windingLabels(o);
  log('consistent', lab.consistent, JSON.stringify(o.warnings));
  for (let f = 0; f < p.slots.face[0].top; f += 1) {
    if (!isFaceLive(p, 0, f)) continue;
    const rings = faceWalk(p, 0, f);
    const desc = rings.map((r) => {
      let a = 0;
      const pts = r.map((h) => [p.vertices.x[p.halfEdges.origin[h]], p.vertices.y[p.halfEdges.origin[h]]]);
      for (let i = 0; i < pts.length; i += 1) {
        const [x0, y0] = pts[i];
        const [x1, y1] = pts[(i + 1) % pts.length];
        a += x0 * y1 - x1 * y0;
      }
      return `n${r.length} a2=${a}` + (process.env.DBG_V ? ' ' + JSON.stringify(pts) : '');
    });
    log('face', f, 'w', JSON.stringify(lab.winding.get(f)), desc.join(' | '));
  }
  const nets: string[] = [];
  for (let e = 0; e < p.slots.pair.top; e += 1) {
    const n = Array.from(o.net.slice(e * o.operands, (e + 1) * o.operands));
    const a = p.halfEdges.origin[2 * e];
    const b = p.halfEdges.origin[2 * e + 1];
    nets.push(`${e}:(${p.vertices.x[a]},${p.vertices.y[a]})->(${p.vertices.x[b]},${p.vertices.y[b]}) ${n.join('/')} L${lab.faceOf[2 * e]} R${lab.faceOf[2 * e + 1]}`);
  }
  if (process.env.DBG_E) log(nets.join('\n'));
});
