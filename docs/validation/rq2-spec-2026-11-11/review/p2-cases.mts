// Probe 2: the case matrix of attack area 1 on TODAY's code. For each case: the last chain's placed points, what the
// draft's predicate (degree 2) and ruling 2's (two incident pairs carry the chain's row, degree free) would write, and
// the lifecycle consequence of each (simulated by planting the proxy row `junction` — a non-indexed, non-knot vertex
// role, the registry flags `shape` will carry — where a predicate writes).
import { A, S, ins, rem, describeV, nearest, predicates, live, plant } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
const AA: [number, number][] = [[3142, 2862], [499, 2966]];
const C3: [number, number][] = [[3142, 2862], [1800, 2915], [499, 2966]];

function report(p: any, r: any, own: string, n: number) {
  log('  result', r.ok, r.code, r.warnings.join(','));
  for (const u of new Set(r.placed as number[])) log('   placed', describeV(p, u), JSON.stringify(predicates(p, u, own, n)));
}

// (1) T-junction end: B ends on A's edge.
{
  log('\n=== (1) T-junction: B (1800,1500)→(1800,2915) ends on A');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  report(p, ins(p, 2, [[1800, 1500], [1800, 2915]], 'base:B'), 'base:B', 2);
}
// (2) An end on a run shared on ONE side: C (3142,2862)→(1800,2915) along A, ending inside it.
{
  log('\n=== (2) end on a run shared on one side');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  report(p, ins(p, 2, [[3142, 2862], [1800, 2915]], 'base:C'), 'base:C', 2);
}
// (3) An own point on an EXISTING split vertex where a third chain attaches (B first, then C through v).
for (const which of ['draft', 'ruling2'] as const) {
  log(`\n=== (3) own point on an existing split vertex (B's T-junction), then B removed — ${which}`);
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, [[1800, 1500], [1800, 2915]], 'base:B');
  const r = ins(p, 2, C3, 'base:C');
  report(p, r, 'base:C', 2);
  const v = nearest(p, 1800, 2915);
  const pr = predicates(p, v, 'base:C', 2);
  if (pr[which]) log('  planted proxy', plant(p, 2, v, 'junction', 'base:C'));
  const rb = rem(p, 2, { role: 'invisible', entity: 'base:B' });
  log('  B removed', rb.ok, rb.code, 'v', describeV(p, v), 'vertices', live(p).length);
  // The arena of A and C (with the row the predicate would write), never B.
  const q = S.framed(4000);
  ins(q, 2, AA, 'base:A');
  ins(q, 2, C3, 'base:C');
  const vq = nearest(q, 1800, 2915);
  if (predicates(q, vq, 'base:C', 2)[which]) plant(q, 2, vq, 'junction', 'base:C');
  log('  equal to A + C never B?', S.contentPrint(p) === S.contentPrint(q));
  const rc = rem(p, 2, { role: 'invisible', entity: 'base:C' });
  log('  then C removed', rc.ok, 'vertices', live(p).length, 'dissolvable', S.dissolvableProblems(p).length);
}
// (4) A closed chain whose seam point is a two-key point.
{
  log('\n=== (4) closed chain, seam on A between two shared runs');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  // y on A at x: 2862 + (3142 - x) * 104 / 2643
  const yA = (x: number) => Math.round(2862 + ((3142 - x) * 104) / 2643);
  report(p, ins(p, 2, [[1800, yA(1800)], [1200, yA(1200)], [1200, 1500], [2600, 1500], [2600, yA(2600)]], 'base:R', { closed: true }), 'base:R', 2);
}
// (5) An L2 chain along an L1 chain.
{
  log('\n=== (5) L2 chain along an L1 chain');
  const p = S.framed(4000);
  ins(p, 1, AA, 'base:A');
  const r = ins(p, 2, C3, 'base:C');
  report(p, r, 'base:C', 2);
}
// (6) Three coincident chains: A, C (own point at v), D along both with no point there; then D with its own point there.
{
  log('\n=== (6) three coincident chains');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, C3, 'base:C');
  const rD = ins(p, 2, AA, 'base:D');
  report(p, rD, 'base:D', 2);
  const rE = ins(p, 2, C3, 'base:E');
  report(p, rE, 'base:E', 2);
}
// (7) A chain of two rows of two entities.
{
  log('\n=== (7) one chain, two rows of two entities');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  const r = ins(p, 2, C3, 'base:C', {}, 'invisible', 'mandatory', [{ role: 'invisible', entity: 'base:C2' }]);
  report(p, r, 'base:C', 2);
  for (const u of new Set(r.placed as number[])) log('   (for base:C2)', JSON.stringify(predicates(p, u, 'base:C2', 2)));
}
// (8) A same-key second op: an absorbed copy (RQ3) after a T-junction on the shared run.
{
  log('\n=== (8) same key again: A, C straight (no point at 1800), B T-junction at 1800, then C again WITH the point');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, AA, 'base:C');
  ins(p, 2, [[1800, 1500], [1800, 2915]], 'base:B');
  const before = S.contentPrint(p);
  const r = ins(p, 2, C3, 'base:C');
  report(p, r, 'base:C', 2);
  log('  the copy changed the arena?', S.contentPrint(p) !== before);
}
