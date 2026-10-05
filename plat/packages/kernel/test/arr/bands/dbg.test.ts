import { it } from 'vitest';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner } from '../../../src/tx/index.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { readKerb } from '../../../src/arr/kerb.js';
import { commit, framed, pt, profile, widthsOf, AT_S9, ringsOf, boundaryRows, way, own, faceAt, edgesWithRole } from './support.js';
it('dbg', () => {
  const p = framed();
  way(p, 'way:1', [[0, 2000], [4000, 2000]], [0, 1]);
  way(p, 'way:2', [[2600, 0], [2600, 4000]]);
  own(p, 'district:1', [[1000, 1000]]);
  const ws = widthsOf({ 'way:1': profile([200, 600]), 'way:2': 350, 'lane:1': 150, 'lane:2': 120 });
  commit(p, 1, (o) => insertChain(o, [pt(900, 0), pt(1400, 900), pt(1100, 2000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
  commit(p, 1, (o) => insertChain(o, [pt(0, 900), pt(1290, 720)], [{ role: 'way', entity: 'lane:2' }], 'mandatory'));
  const kids = [[300, 300], [300, 1500], [2000, 1000]].map(([x, y]) => faceAt(p, 1, x, y));
  commit(p, 1, (o) => setOwner(o, kids, 'district:1'));
  for (const f of kids) {
    const r = readKerb(p, f, ws);
    if (r.ok) console.log('face', f, JSON.stringify(ringsOf(p, 1, f)), '\nkerb', JSON.stringify(r.value.kerb), '\nsplits', JSON.stringify(r.value.splits));
  }
  const r = commit(p, 2, (o) => corridorUnion(o, kids, ws), AT_S9);
  console.log(JSON.stringify(r.value));
  console.log(edgesWithRole(p, 'corridor_split'));
});
