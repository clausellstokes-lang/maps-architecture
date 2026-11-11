// Follow-up probe: the session's REFINED rule (entity-based write and maintenance) against the review's F2 rule, on
// today's code with the proxy row (`junction`), the maintenance emulated after each removal batch (bare strip /
// flag clear on v — in the round it runs inside the batch, before the dissolution; every emulated decision below falls
// on a batch where v has degree ≥ 3, so the order does not matter there).
import { A, S, TX, T, ins, rem, describeV, nearest, live, plant, rowText } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
const AA: [number, number][] = [[3142, 2862], [499, 2966]];
const C3: [number, number][] = [[3142, 2862], [1800, 2915], [499, 2966]];

const ent = (p: any, r: number) => A.idOf(p, p.roles.entity[r]);
/** e's edges at v, and whether some other-entity row KEY is on both (refined) / whether the two sets are identical with another key (F2). */
function read(p: any, v: number, e: string) {
  const at = A.outgoing(p, v);
  const eOn = at.filter((h: number) => A.rowsOn(p, 'edge', h).some((r: number) => ent(p, r) === e));
  const keys = (h: number) => new Set(A.rowsOn(p, 'edge', h).filter((r: number) => ent(p, r) !== e).map((r: number) => `${p.roles.kind[r]}/${ent(p, r)}/${p.roles.ordinal[r]}`));
  const common = eOn.length === 2 && [...keys(eOn[0])].some((k) => keys(eOn[1]).has(k));
  const otherAny = eOn.length === 2 && (keys(eOn[0]).size > 0 || keys(eOn[1]).size > 0);
  const identical = eOn.length === 2 && rowText(p, 'edge', eOn[0]) === rowText(p, 'edge', eOn[1]) && keys(eOn[0]).size > 0;
  const split = (p.vertices.flags[v] & A.VERTEX_SPLIT) !== 0;
  return { two: eOn.length === 2, common, otherAny, identical, split };
}
function hasRow(p: any, v: number, e: string) {
  return A.isVertexLive(p, v) && A.rowsOn(p, 'vertex', v).some((r: number) => ent(p, r) === e);
}
function stripRow(p: any, v: number, e: string) {
  for (const r of A.rowsOn(p, 'vertex', v)) if (ent(p, r) === e) A.removeRoleRow(p, r);
}
/** The maintenance step after a removal batch, emulated on v. */
function maintain(p: any, v: number, e: string, rule: 'F2' | 'refined') {
  if (!A.isVertexLive(p, v) || !hasRow(p, v, e)) return;
  const s = read(p, v, e);
  const keep = rule === 'F2' ? s.identical : s.split && s.two && s.common;
  if (!keep) stripRow(p, v, e);
  if (rule === 'refined' && s.two && !s.otherAny) A.setVerticesFlags ? A.setVerticesFlags(p, v, p.vertices.flags[v] & ~A.VERTEX_SPLIT) : (p.vertices.flags[v] &= ~A.VERTEX_SPLIT);
}

// (b) the session's X-and-rider sequence.
for (const rule of ['F2', 'refined'] as const) {
  log(`\n=== (b) X + rider, ${rule}`);
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, C3, 'base:C');
  const v = nearest(p, 1800, 2915);
  plant(p, 2, v, 'junction', 'base:C');
  log(' X', ins(p, 2, [[1800, 1500], [1800, 3600]], 'base:X').ok, '| B', ins(p, 2, [[3142, 2862], [1800, 2915], [2300, 1000]], 'base:B').ok, '| Y', ins(p, 2, [[900, 1600], [1800, 2915]], 'base:Y').ok);
  log(' v', describeV(p, v));
  for (const e of ['base:Y', 'base:B', 'base:X']) {
    const r = rem(p, 2, { role: 'invisible', entity: e });
    maintain(p, v, 'base:C', rule);
    log(` remove ${e}:`, r.ok, describeV(p, v));
  }
  log(' C\'s point kept?', A.isVertexLive(p, v) && p.vertices.x[v] === 1800);
}

// (b') the write hole: a finer rider R on one side at C's commit (R leaves A at v; C's point lands on R's vertex).
for (const rule of ['ruling2', 'refined'] as const) {
  log(`\n=== (b') finer rider at C's commit, ${rule} write`);
  const p = S.framed(4000);
  ins(p, 1, AA, 'base:A');
  log(' R(L2)', ins(p, 2, [[3142, 2862], [1800, 2915], [2300, 1000]], 'base:R').ok);
  const c = ins(p, 1, C3, 'base:C');
  const v = nearest(p, 1800, 2915);
  log(' C(L1)', c.ok, c.code, 'v', describeV(p, v));
  const s = read(p, v, 'base:C');
  const write = rule === 'ruling2' ? s.split && s.identical : s.split && s.two && s.common;
  log(' writes?', write);
  if (write) plant(p, 1, v, 'junction', 'base:C');
  const r = rem(p, 2, { role: 'invisible', entity: 'base:R' });
  if (rule === 'refined') maintain(p, v, 'base:C', 'refined');
  log(' remove R:', r.ok, r.code, describeV(p, v));
}

// (c1) the flag clear when C is alone on its two edges but another chain D passes through v (crossing): A, C(v), D
// crosses at v, A removed (refined clears v's flag: no other row on C's two edges), then C removed.
{
  log('\n=== (c1) refined flag-clear vs a crossing D through v');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, C3, 'base:C');
  const v = nearest(p, 1800, 2915);
  plant(p, 2, v, 'junction', 'base:C');
  ins(p, 2, [[1800, 1500], [1800, 3600]], 'base:D');
  rem(p, 2, { role: 'invisible', entity: 'base:A' });
  maintain(p, v, 'base:C', 'refined');
  log(' after A removed + maintenance:', describeV(p, v));
  rem(p, 2, { role: 'invisible', entity: 'base:C' });
  const q = S.framed(4000);
  ins(q, 2, [[1800, 1500], [1800, 3600]], 'base:D');
  log(' after C removed:', describeV(p, v), '| equal to D alone?', S.contentPrint(p) === S.contentPrint(q));
  // The same without the flag clear (today's rule 3 (b) left alone):
  const p2 = S.framed(4000);
  ins(p2, 2, AA, 'base:A');
  ins(p2, 2, C3, 'base:C');
  const v2 = nearest(p2, 1800, 2915);
  plant(p2, 2, v2, 'junction', 'base:C');
  ins(p2, 2, [[1800, 1500], [1800, 3600]], 'base:D');
  rem(p2, 2, { role: 'invisible', entity: 'base:A' });
  stripRow(p2, v2, 'base:C');
  rem(p2, 2, { role: 'invisible', entity: 'base:C' });
  log(' without the flag clear (row stripped only): equal to D alone?', S.contentPrint(p2) === S.contentPrint(q), describeV(p2, v2));
}

// (c2) a rider B removed with no crossing: does rule 3 (b) clear v's flag (then the refined KEEP strips the row and v
// stays on A for ever)?
{
  log('\n=== (c2) rider B on one side, removed; then C removed');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, C3, 'base:C');
  const v = nearest(p, 1800, 2915);
  plant(p, 2, v, 'junction', 'base:C');
  ins(p, 2, [[3142, 2862], [1800, 2915], [2300, 1000]], 'base:B');
  rem(p, 2, { role: 'invisible', entity: 'base:B' });
  log(' after B removed (before maintenance):', describeV(p, v));
  maintain(p, v, 'base:C', 'refined');
  log(' after maintenance:', describeV(p, v));
  stripRow(p, v, 'base:C'); // the round's whole-chain strip, emulated ahead of C's removal batch (strip before dissolution)
  rem(p, 2, { role: 'invisible', entity: 'base:C' });
  const q = S.framed(4000);
  ins(q, 2, AA, 'base:A');
  log(' after C removed:', describeV(p, v), '| equal to A alone?', S.contentPrint(p) === S.contentPrint(q));
}

// (c3) an INSERT batch clears the flag (a coarser chain ending at v promotes it): the kept row then fails the converse
// oracle (it demands VERTEX_SPLIT), and maintenance does not run on an insert batch.
{
  log('\n=== (c3) a coarser chain ends at v (promotion) — insert batch');
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  ins(p, 2, C3, 'base:C');
  const v = nearest(p, 1800, 2915);
  plant(p, 2, v, 'junction', 'base:C');
  const w = ins(p, 1, [[1800, 1000], [1800, 2915]], 'base:W');
  log(' W(L1)', w.ok, w.code, 'v', describeV(p, v), '| converse oracle holds?', read(p, v, 'base:C').split && read(p, v, 'base:C').two && read(p, v, 'base:C').common);
}
