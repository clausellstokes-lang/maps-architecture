import { it } from 'vitest';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandUnion } from '../../../src/arr/bandUnion.js';
import { kerb } from '../../../src/arr/kerb.js';
import { commit, framed, pt, profile, widthsOf, AT_S9, spec, ringsOf, normals } from './support.js';
const K = { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] };
function net(chords: [number, number, number, number, number[] | null, number][]) {
  const p = framed();
  const table: Record<string, unknown> = {};
  chords.forEach(([ax, ay, bx, by, kn, hw], i) => {
    const r = tx(p, spec(1), (o) => insertChain(o, [pt(ax, ay), pt(bx, by)], [{ role: 'way', entity: `way:${i}` }], 'mandatory', kn ? K : {}));
    if (r.ok) table[`way:${i}`] = kn ? profile(kn) : { halfWidthCm: hw, ends: 'round' };
  });
  const faces: number[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) faces.push(f);
  commit(p, 1, (o) => setOwner(o, faces, 'd:1'));
  return { p, faces, ws: widthsOf(table as never) };
}
it('crash', () => {
  const { p, faces, ws } = net([[0, 3022, 35, 0, [76, 15], 1], [4000, 3017, 0, 552, [5, 325], 1]]);
  for (const f of faces) { try { commit(p, 1, (o) => { const k = kerb(o, f, ws); return k.ok ? { ok: true, value: null, warnings: [] } : k; }); } catch (e) { console.log('KERB THROW', f, String(e)); } }
  try { const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws)); console.log('corridor', r.ok); } catch (e) { console.log('CORRIDOR THROW', String(e)); }
  try { const r = tx(p, spec(3, AT_S9), (o) => bandUnion(o, [{ ref: { role: 'way', entity: 'way:0' }, halfWidthCm: profile([76, 15]), ends: 'round' }], faces, 'band', 'band:1')); console.log('band', r.ok); } catch (e) { console.log('BAND THROW', String(e)); }
});
it('area', () => {
  const { p, faces, ws } = net([[4000, 1048, 3078, 0, null, 14], [3500, 4000, 4000, 882, [40, 132], 0]]);
  for (const f of faces) {
    let k: string[] = [];
    commit(p, 1, (o) => { const r = kerb(o, f, ws); if (r.ok) k = normals(r.value); return { ok: true, value: null, warnings: r.ok ? [] : [] }; });
    const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, [f], ws));
    if (!r.ok) { console.log('refused', r.code); continue; }
    const v = r.value.value as { blocks: number[]; whole: number[]; wholeBand: number[]; band: number[] };
    console.log('face', f, JSON.stringify(normals(ringsOf(p, 1, f))).slice(0, 200), '\n kerb', JSON.stringify(k).slice(0, 300), '\n blocks', JSON.stringify(v.blocks.map((b) => normals(ringsOf(p, 2, b)))).slice(0, 300), 'whole', v.whole, 'wholeBand', v.wholeBand, 'band', v.band.length, JSON.stringify(r.value.record?.warnings));
  }
});
