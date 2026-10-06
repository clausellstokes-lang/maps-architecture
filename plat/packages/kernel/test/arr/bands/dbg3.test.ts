import { it } from 'vitest';
import { createPlat } from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import { insertChain, insertTx } from '../../../src/insert/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import { LATTICE } from '../../../src/num/index.js';
import { bufferParts } from '../../../src/arr/buffer.js';
import { readFace } from '../../../src/arr/kerb.js';
import { commit, framed, pt, profile, widthsOf, spec } from './support.js';
const K = { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] };
it('replay on insertChain alone', () => {
  const p = framed();
  tx(p, spec(1), (o) => insertChain(o, [pt(0, 3022), pt(35, 0)], [{ role: 'way', entity: 'way:0' }], 'mandatory', K));
  tx(p, spec(1), (o) => insertChain(o, [pt(4000, 3017), pt(0, 552)], [{ role: 'way', entity: 'way:1' }], 'mandatory', K));
  const faces: number[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) faces.push(f);
  commit(p, 1, (o) => setOwner(o, faces, 'd:1'));
  const ws = widthsOf({ 'way:0': profile([76, 15]), 'way:1': profile([5, 325]) });
  const f = faces[1];
  const read = readFace(p, f, ws);
  const parts: { x: number; y: number }[][] = [];
  for (const s of [...read.spines.keys()].sort()) {
    for (const ln of read.spines.get(s)!.lines) {
      const r = bufferParts([ln.points], ln.hw, 'round', 'round');
      if (r.ok) parts.push(...r.value);
    }
  }
  // buildOverlay's order: the frame, then every distinct segment of operand 0 (F's rings), then of operand 1 (the parts)
  const q = createPlat({ layer: 'ground', part: 0 }, { widthCm: (2 * LATTICE.rangeCm) as never, heightCm: (2 * LATTICE.rangeCm) as never, aspect: 1, marginShare: 0 });
  const segs: [number, number, number, number][] = [];
  const seen = new Set<string>();
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const ring of [...read.rings, ...parts]) {
    const n = ring.length;
    for (let i = 0; i < n; i += 1) {
      const a = ring[i]; const b = ring[(i + 1) % n];
      if (a.x === b.x && a.y === b.y) continue;
      minX = Math.min(minX, a.x); minY = Math.min(minY, a.y); maxX = Math.max(maxX, a.x); maxY = Math.max(maxY, a.y);
      const fw = a.x < b.x || (a.x === b.x && a.y < b.y);
      const k = fw ? `${a.x},${a.y},${b.x},${b.y}` : `${b.x},${b.y},${a.x},${a.y}`;
      if (seen.has(k)) continue;
      seen.add(k); segs.push([a.x, a.y, b.x, b.y]);
    }
  }
  let cell = 64; while (cell < 1_048_576 && cell * cell * Math.max(1, segs.length) < (maxX - minX + 1) * (maxY - minY + 1)) cell *= 2;
  attachIndex(q, { gridCellCm: cell });
  const t = insertTx(q, 0);
  insertChain(t, [pt(minX - 4096, minY - 4096), pt(maxX + 4096, minY - 4096), pt(maxX + 4096, maxY + 4096), pt(minX - 4096, maxY + 4096)], [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true });
  let i = 0;
  for (const [ax, ay, bx, by] of segs) {
    try {
      const r = insertChain(t, [pt(ax, ay), pt(bx, by)], [{ role: 'invisible', entity: `arr:s${i}` }], 'mandatory');
      if (!r.ok && !(r.code === 'E_DEGENERATE')) { console.log('REPLAY REFUSED at segment', i, 'of', segs.length, [ax, ay, bx, by], r.code, r.detail); return; }
    } catch (e) { console.log('REPLAY THREW at segment', i, 'of', segs.length, [ax, ay, bx, by], String(e)); return; }
    i += 1;
  }
  console.log('REPLAY: no refusal in', segs.length, 'segments');
});
