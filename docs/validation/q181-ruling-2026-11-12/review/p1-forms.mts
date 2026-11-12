// Probe 1: the Q181 forms, each ending at A alone (or at the survivors inserted fresh), on the kernel KW names.
// No proxy row is planted: the design head has no `shape` row, and none of these forms needs one.
//   F1 stretch end   — C has its own point v on A's run; a StretchRef removal of C from v to its far end; then C's rest.
//   F2 rekey cut     — the same C; a rekey of that stretch to K (the cut at v); then C and K removed.
//   F3 crossing+rider (the session's second form) — X crosses A at v; B along A from A's end to v; X removed; B removed.
//   F3b T+rider      — the same with a T (Y ends on A at v) instead of a crossing.
//   F4 rider, then the crossing removed by a stretch — X crosses A at v, B along A to v; a stretch of X ending at v removed
//                      (X's far half), then the rest of X, then B.
//   F5 mixed levels  — A L1, C L2 coincident along A's whole run, Y L1 crossing at v (an L1 vertex); a StretchRef of A
//                      from v to its far end removed (that side demoted to L2), Y removed, A's rest removed → C alone.
//   F6 mixed levels, a finer v — the same with X L2 crossing at v (an L2 Steiner vertex on A's L1 edge).
// After each step: the vertex v described, allProblems; at the end: equal to the survivors inserted fresh?
import { A, S, TX, T, ins, rem, describeV, nearest, live } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
const P = (x: number, y: number) => S.pt(x, y);
const AA: [number, number][] = [[3142, 2862], [499, 2966]];
const yA = (x: number) => Math.round(2862 + ((3142 - x) * 104) / 2643);
const probs = (p: any) => { const x = S.allProblems(p); return x.length === 0 ? 'ok' : `PROBLEMS ${x.length}: ${x[0]}`; };
const stretch = (p: any, level: number, entity: string, from: [number, number], to: [number, number], role = 'invisible') =>
  TX.tx(p, T.spec(level), (o: any) => TX.removeEdges(o, { chain: { role, entity }, from: P(...from), to: P(...to) }));
const rekey = (p: any, level: number, entity: string, from: [number, number], to: [number, number], into: string) =>
  TX.tx(p, T.spec(level), (o: any) => TX.retypeEdges(o, { chain: { role: 'invisible', entity }, from: P(...from), to: P(...to) }, [], [], { from: entity, to: into }));
const at = (p: any, v: number): [number, number] => [p.vertices.x[v], p.vertices.y[v]];
function verdict(name: string, p: any, fresh: (q: any) => void): boolean {
  const q = S.framed(4000);
  fresh(q);
  const a = S.contentPrint(p).split('\n');
  const b = S.contentPrint(q).split('\n');
  const eq = S.contentPrint(p) === S.contentPrint(q);
  log(`  ${name}: equal to the survivors inserted fresh? ${eq} | vertices ${live(p).length} vs ${live(q).length} | ${probs(p)}`);
  if (!eq) {
    log('    only here:  ', a.filter((l: string) => !b.includes(l)).filter((l: string) => !l.startsWith('f')).join(' || '));
    log('    only fresh: ', b.filter((l: string) => !a.includes(l)).filter((l: string) => !l.startsWith('f')).join(' || '));
  }
  return eq;
}
const r = (x: any) => (x.ok ? 'ok' : `REFUSED ${x.code} ${x.detail}`);
const results: Record<string, boolean> = {};

{ // F1
  log('=== F1 stretch end');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, [[3142, 2862], [2400, yA(2400)], [499, 2966]], 'base:C');
  const v = nearest(p, 2400, yA(2400));
  log(' v after C:', describeV(p, v));
  log(' stretch v → (499,2966):', r(stretch(p, 2, 'base:C', at(p, v), [499, 2966])), '|', describeV(p, v));
  verdict('after the stretch (fresh: A, then C\'s rest)', p, (q) => { ins(q, 2, AA, 'base:A'); ins(q, 2, [[3142, 2862], at(p, v)], 'base:C'); });
  log(' C\'s rest removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:C' })), '|', describeV(p, v));
  results.F1 = verdict('F1 final (fresh: A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
{ // F2
  log('=== F2 rekey cut');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, [[3142, 2862], [2400, yA(2400)], [499, 2966]], 'base:C');
  const v = nearest(p, 2400, yA(2400));
  log(' rekey v → (499,2966) to K:', r(rekey(p, 2, 'base:C', at(p, v), [499, 2966], 'base:K')), '|', describeV(p, v));
  verdict('after the rekey (fresh: A, C\'s rest, K)', p, (q) => { ins(q, 2, AA, 'base:A'); ins(q, 2, [[3142, 2862], at(p, v)], 'base:C'); ins(q, 2, [at(p, v), [499, 2966]], 'base:K'); });
  log(' C removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:C' })), '|', describeV(p, v));
  log(' K removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:K' })), '|', describeV(p, v));
  results.F2 = verdict('F2 final (fresh: A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
for (const kind of ['crossing', 'T'] as const) { // F3, F3b
  const name = kind === 'crossing' ? 'F3' : 'F3b';
  log(`=== ${name} ${kind} at v, then a rider B along A ending at v; the ${kind} removed; B removed`);
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, kind === 'crossing' ? [[1800, 2400], [1800, 3400]] : [[1800, 2400], [1800, yA(1800)]], 'base:X');
  const v = nearest(p, 1800, yA(1800));
  log(' v after X:', describeV(p, v));
  ins(p, 2, [[3142, 2862], at(p, v)], 'base:B');
  log(' v after B:', describeV(p, v));
  log(' X removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:X' })), '|', describeV(p, v));
  verdict('after X (fresh: A, then B)', p, (q) => { ins(q, 2, AA, 'base:A'); ins(q, 2, [[3142, 2862], at(p, v)], 'base:B'); });
  log(' B removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:B' })), '|', describeV(p, v));
  results[name] = verdict(`${name} final (fresh: A alone)`, p, (q) => ins(q, 2, AA, 'base:A'));
}
{ // F4
  log('=== F4 crossing X at v, rider B to v; X\'s far half removed by a stretch ending at v; X\'s rest; B');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, [[1800, 2400], [1800, 3400]], 'base:X');
  const v = nearest(p, 1800, yA(1800));
  ins(p, 2, [[3142, 2862], at(p, v)], 'base:B');
  log(' stretch of X v → (1800,3400):', r(stretch(p, 2, 'base:X', at(p, v), [1800, 3400])), '|', describeV(p, v));
  log(' X\'s rest removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:X' })), '|', describeV(p, v));
  log(' B removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:B' })), '|', describeV(p, v));
  results.F4 = verdict('F4 final (fresh: A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
for (const xl of [1, 2] as const) { // F5, F6
  const name = xl === 1 ? 'F5' : 'F6';
  log(`=== ${name} mixed levels: A L1, C L2 along A whole, a crossing at L${xl} at v; A's stretch v → far end removed; the crossing; A's rest → C alone`);
  const p = S.framed(4000);
  ins(p, 1, AA, 'base:A');
  ins(p, 2, AA, 'base:C');
  ins(p, xl, [[1800, 2400], [1800, 3400]], 'base:X');
  const v = nearest(p, 1800, yA(1800));
  log(' v after X:', describeV(p, v));
  try {
    log(` stretch of A v → (499,2966) at L1:`, r(stretch(p, 1, 'base:A', at(p, v), [499, 2966])), '|', describeV(p, v));
  } catch (e: any) {
    log(` stretch of A v → (499,2966) at L1: THROWS ${String(e.message).split('\n')[0]} | cause: ${String(e.cause?.message ?? '')}`);
    results[name] = false;
    continue;
  }
  log(` X removed (L${xl}):`, r(rem(p, xl, { role: 'invisible', entity: 'base:X' })), '|', describeV(p, v));
  log(' A\'s rest removed (L1):', r(rem(p, 1, { role: 'invisible', entity: 'base:A' })), '|', describeV(p, v));
  results[name] = verdict(`${name} final (fresh: C alone at L2)`, p, (q) => ins(q, 2, AA, 'base:C'));
}
{ // G: the guard — A's stretch ending at C's OWN point (the RQ2 class): with no `shape` row, does a kept flag dissolve C's point?
  log('=== G (guard) C\'s own point v on A; a stretch of A ending at v removed; A\'s rest removed → C alone (no shape row on this head)');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, [[3142, 2862], [1800, 2915], [499, 2966]], 'base:C');
  const v = nearest(p, 1800, 2915);
  log(' v after C:', describeV(p, v));
  log(' stretch of A v → (499,2966):', r(stretch(p, 2, 'base:A', at(p, v), [499, 2966])), '|', describeV(p, v));
  log(' A\'s rest removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:A' })), '|', describeV(p, v));
  results.G = verdict('G final (fresh: C alone)', p, (q) => ins(q, 2, [[3142, 2862], [1800, 2915], [499, 2966]], 'base:C'));
}
log('SUMMARY', process.env.KW ?? 'tree', JSON.stringify(results));
