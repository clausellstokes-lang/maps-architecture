// Probe 1: the draft's straight fixture (A, C, x) and N-23's P3 on TODAY's code — does v exist, what does it carry,
// what do the two predicates say, what happens on x's lifecycle and on A's removal while C lives.
import { A, S, ins, rem, describeV, nearest, predicates, live, plant } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
function scenario(name: string, cPts: [number, number][], vAt: [number, number]) {
  log(`\n=== ${name}`);
  const p = S.framed(4000);
  const a = ins(p, 2, [[3142, 2862], [499, 2966]], 'base:A');
  log('A', a.ok, a.code, a.warnings.join(','), 'vertices', live(p).length);
  const afterA = S.snapshot(p);
  const c = ins(p, 2, cPts, 'base:C');
  log('C', c.ok, c.code, c.warnings.join(','), 'placed', c.placed.map((v: number) => `(${p.vertices.x[v]},${p.vertices.y[v]})`).join(' '), 'vertices', live(p).length);
  const v = nearest(p, vAt[0], vAt[1]);
  log('v', describeV(p, v));
  for (const u of new Set(c.placed as number[])) log('  placed', describeV(p, u), JSON.stringify(predicates(p, u, 'base:C', 2)));
  log('allProblems', S.allProblems(p).length, 'dissolvable', S.dissolvableProblems(p).length);
  const beforeX = S.snapshot(p);
  const nBefore = live(p).length;
  const x = ins(p, 2, [[0, 3501], [735, 705], [p.vertices.x[v], p.vertices.y[v]]], 'x:1');
  log('x', x.ok, x.code, x.warnings.join(','), 'v now', describeV(p, v));
  const rx = rem(p, 2, { role: 'invisible', entity: 'x:1' });
  const afterX = S.snapshot(p);
  log('x removed', rx.ok, rx.code, 'vertices', nBefore, '->', live(p).length, 'print equal to before x:', afterX.print === beforeX.print, 'v', describeV(p, v));
  return { p, v, afterA };
}
const straight = scenario('straight form (draft leg 2 LINE 1 / leg 3 LINE 1 (a))', [[3142, 2862], [1800, 2915], [499, 2966]], [1800, 2915]);
scenario('N-23 P3 fold-back', [[3142, 2862], [499, 2966], [2430, 2874]], [2431, 2890]);

// A removed while C lives (ruling B), today's code and with a proxy row planted.
for (const planted of [false, true]) {
  log(`\n=== A removed while C lives; ${planted ? 'a proxy non-indexed non-knot vertex row (junction, base:C) PLANTED on v' : 'today (no row)'}`);
  const p = S.framed(4000);
  ins(p, 2, [[3142, 2862], [499, 2966]], 'base:A');
  const c = ins(p, 2, [[3142, 2862], [1800, 2915], [499, 2966]], 'base:C');
  const v = nearest(p, 1800, 2915);
  if (planted) log('planted', plant(p, 2, v, 'junction', 'base:C'));
  log('v', describeV(p, v));
  const r = rem(p, 2, { role: 'invisible', entity: 'base:A' });
  log('remove A', r.ok, r.code, 'v', describeV(p, v), 'vertices', live(p).length, 'allProblems', S.allProblems(p).length, 'dissolvable', S.dissolvableProblems(p).length);
  // The arena of C alone, at C's INPUT points and at C's PLACED points.
  const q = S.framed(4000);
  ins(q, 2, [[3142, 2862], [1800, 2915], [499, 2966]], 'base:C');
  const placedPts = (c.placed as number[]).map((u: number) => [p.vertices.x[u], p.vertices.y[u]]);
  const q2 = S.framed(4000);
  ins(q2, 2, placedPts as [number, number][], 'base:C');
  log('equal to C alone (input points)?', S.contentPrint(p) === S.contentPrint(q), '| (placed points)?', S.contentPrint(p) === S.contentPrint(q2));
  const a = S.contentPrint(p).split('\n'); const b = S.contentPrint(q2).split('\n');
  log('  lines only in A+C−A:', a.filter((l: string) => !b.includes(l)).join(' || '));
  log('  lines only in C alone (placed):', b.filter((l: string) => !a.includes(l)).join(' || '));
}
