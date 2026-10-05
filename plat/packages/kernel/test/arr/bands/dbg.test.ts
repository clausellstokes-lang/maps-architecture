import { it } from 'vitest';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { bandUnion } from '../../../src/arr/bandUnion.js';
import { commit, framed, pt, profile, widthsOf, AT_S9, spec } from './support.js';
it('dbg', () => {
  const p = framed();
  const K = { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] };
  // a=148 -> (148,0); b=14681 -> (0, 1319); a=13545 -> (0, 2455); b=60 -> (60,0)
  commit(p, 1, (o) => insertChain(o, [pt(148, 0), pt(0, 1319)], [{ role: 'way', entity: 'way:0' }], 'mandatory', K));
  commit(p, 1, (o) => insertChain(o, [pt(0, 2455), pt(60, 0)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  const faces: number[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) faces.push(f);
  commit(p, 1, (o) => setOwner(o, faces, 'd:1'));
  const ws = widthsOf({ 'way:0': profile([5, 83]), 'way:1': { halfWidthCm: 1, ends: 'round' } });
  const r = tx(p, spec(2, AT_S9), (o) => corridorUnion(o, faces, ws));
  console.log('corridor', r.ok ? 'ok' : `${r.code} ${r.detail}`);
  const b = tx(p, spec(3, AT_S9), (o) => bandUnion(o, [{ ref: { role: 'way', entity: 'way:0' }, halfWidthCm: profile([5, 83]), ends: 'round' }], faces, 'band', 'band:1'));
  console.log('band', b.ok ? 'ok' : `${b.code} ${b.detail}`);
});
