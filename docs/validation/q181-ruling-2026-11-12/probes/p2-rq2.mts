// Probe 2: the amended rule 3 (b) composed with RQ2's `shape` row, on the kernel KW names, run with Q181_MAINT=junction
// (the mirror's emulation of M1 – M4 in rewriteRows, rq2-emulation.diff; the commit-time hook is not emulated). The
// `shape` row is the review's proxy `junction`, written by this probe after each insertion exactly where RQ2's W writes
// it (J776 R2): on each of the chain's landed points that carries VERTEX_SPLIT, with the chain's entity on exactly two
// incident edges and another entity on both.
//   W1 the RQ2 fixture's stretch END, then C's rest removed → A alone.
//   W2 the stretch end, the stretch RE-INSERTED, then all of C removed → A alone.
//   W3 the rekey cut, then C and K removed → A alone.
//   G  C's own point v on A; a stretch of A ending at v; A's rest removed → C alone (the guard: a KEPT flag must not
//      dissolve C's own point — the row holds it, M3 settles it).
//   G2 the same with A's rest removed first by a second stretch from the far side (two stretches).
//   G3 three coincident chains: A, C (own point v), D along A whole; A removed; then D removed → C alone; or C removed → D alone.
import { A, S, TX, T, ins, rem, describeV, nearest, live, plant } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
const P = (x: number, y: number) => S.pt(x, y);
const AA: [number, number][] = [[3142, 2862], [499, 2966]];
const yA = (x: number) => Math.round(2862 + ((3142 - x) * 104) / 2643);
const PROXY = 'junction';
const r = (x: any) => (x.ok ? 'ok' : `REFUSED ${x.code} ${x.detail}`);
const at = (p: any, v: number): [number, number] => [p.vertices.x[v], p.vertices.y[v]];
const ent = (p: any, row: number) => A.idOf(p, p.roles.entity[row]);
function writeW(p: any, placed: number[], entity: string): string[] {
  const out: string[] = [];
  for (const v of new Set(placed)) {
    if (!A.isVertexLive(p, v) || (p.vertices.flags[v] & A.VERTEX_SPLIT) === 0) continue;
    const inc = A.outgoing(p, v);
    const mine = inc.filter((h: number) => A.rowsOn(p, 'edge', h).some((q: number) => ent(p, q) === entity));
    if (mine.length !== 2) continue;
    const others = (h: number) => new Set(A.rowsOn(p, 'edge', h).map((q: number) => ent(p, q)).filter((x: string) => x !== entity));
    const o0 = others(mine[0]);
    if (![...others(mine[1])].some((x) => o0.has(x))) continue;
    if (A.rowsOn(p, 'vertex', v).some((q: number) => A.roleInfo(p.roles.kind[q]).name === PROXY && ent(p, q) === entity)) continue;
    plant(p, 2, v, PROXY, entity);
    out.push(`${at(p, v)}`);
  }
  return out;
}
function insW(p: any, pts: [number, number][], entity: string): void {
  const x = ins(p, 2, pts, entity);
  log(`  insert ${entity}: ${x.ok ? 'ok' : x.code}; W writes at [${writeW(p, x.placed, entity).join(' ; ')}]`);
}
const stretch = (p: any, entity: string, from: [number, number], to: [number, number]) =>
  TX.tx(p, T.spec(2), (o: any) => TX.removeEdges(o, { chain: { role: 'invisible', entity }, from: P(...from), to: P(...to) }));
function verdict(name: string, p: any, fresh: (q: any) => void): boolean {
  const q = S.framed(4000);
  fresh(q);
  const a = S.contentPrint(p).split('\n');
  const b = S.contentPrint(q).split('\n');
  const eq = S.contentPrint(p) === S.contentPrint(q);
  const pr = S.allProblems(p);
  log(`  ${name}: equal? ${eq} | vertices ${live(p).length} vs ${live(q).length} | ${pr.length === 0 ? 'ok' : pr[0]}`);
  if (!eq) {
    log('    only here:  ', a.filter((l: string) => !b.includes(l) && !l.startsWith('f')).join(' || '));
    log('    only fresh: ', b.filter((l: string) => !a.includes(l) && !l.startsWith('f')).join(' || '));
  }
  return eq;
}
const C4: [number, number][] = [[3142, 2862], [2400, yA(2400)], [1800, 2915], [499, 2966]];
const res: Record<string, boolean> = {};
{
  log('=== W1 stretch end, then the rest');
  const p = S.framed(4000);
  insW(p, AA, 'base:A');
  insW(p, C4, 'base:C');
  const v1 = nearest(p, 2400, yA(2400));
  log('  stretch v1 → end:', r(stretch(p, 'base:C', at(p, v1), [499, 2966])), '|', describeV(p, v1));
  log('  C\'s rest removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:C' })), '|', describeV(p, v1));
  res.W1 = verdict('W1 final (A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
{
  log('=== W2 stretch end, the stretch re-inserted, all of C removed');
  const p = S.framed(4000);
  insW(p, AA, 'base:A');
  insW(p, C4, 'base:C');
  const v1 = nearest(p, 2400, yA(2400));
  const p1 = at(p, v1);
  log('  stretch v1 → end:', r(stretch(p, 'base:C', p1, [499, 2966])), '|', describeV(p, v1));
  insW(p, [p1, [1800, 2915], [499, 2966]], 'base:C');
  log('  after the re-insert:', describeV(p, v1));
  log('  C removed (ChainRef):', r(rem(p, 2, { role: 'invisible', entity: 'base:C' })), '|', describeV(p, v1));
  res.W2 = verdict('W2 final (A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
{
  log('=== W3 rekey cut, then C and K removed');
  const p = S.framed(4000);
  insW(p, AA, 'base:A');
  insW(p, C4, 'base:C');
  const v1 = nearest(p, 2400, yA(2400));
  log('  rekey v1 → end to K:', r(TX.tx(p, T.spec(2), (o: any) => TX.retypeEdges(o, { chain: { role: 'invisible', entity: 'base:C' }, from: P(...at(p, v1)), to: P(499, 2966) }, [], [], { from: 'base:C', to: 'base:K' }))), '|', describeV(p, v1));
  log('  C removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:C' })), '|', describeV(p, v1));
  log('  K removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:K' })), '|', describeV(p, v1));
  res.W3 = verdict('W3 final (A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
const CG: [number, number][] = [[3142, 2862], [1800, 2915], [499, 2966]];
{
  log('=== G stretch of A ending at C\'s own point, then A\'s rest');
  const p = S.framed(4000);
  insW(p, AA, 'base:A');
  insW(p, CG, 'base:C');
  const v = nearest(p, 1800, 2915);
  log('  stretch of A v → (499,2966):', r(stretch(p, 'base:A', at(p, v), [499, 2966])), '|', describeV(p, v));
  log('  A\'s rest removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:A' })), '|', describeV(p, v));
  res.G = verdict('G final (C alone)', p, (q) => ins(q, 2, CG, 'base:C'));
}
{
  log('=== G2 A removed by two stretches meeting at C\'s own point');
  const p = S.framed(4000);
  insW(p, AA, 'base:A');
  insW(p, CG, 'base:C');
  const v = nearest(p, 1800, 2915);
  log('  stretch of A (3142,2862) → v:', r(stretch(p, 'base:A', [3142, 2862], at(p, v))), '|', describeV(p, v));
  log('  stretch of A v → (499,2966):', r(stretch(p, 'base:A', at(p, v), [499, 2966])), '|', describeV(p, v));
  res.G2 = verdict('G2 final (C alone)', p, (q) => ins(q, 2, CG, 'base:C'));
}
for (const last of ['D', 'C'] as const) {
  log(`=== G3 three coincident: A, C (own point v), D along A; A removed; then ${last === 'D' ? 'D removed → C alone' : 'C removed → D alone'}`);
  const p = S.framed(4000);
  insW(p, AA, 'base:A');
  insW(p, CG, 'base:C');
  insW(p, AA, 'base:D');
  const v = nearest(p, 1800, 2915);
  log('  before:', describeV(p, v));
  log('  A removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:A' })), '|', describeV(p, v));
  verdict('  after A: (fresh: C then D)', p, (q) => { ins(q, 2, CG, 'base:C'); ins(q, 2, AA, 'base:D'); });
  log(`  ${last} removed:`, r(rem(p, 2, { role: 'invisible', entity: `base:${last}` })), '|', describeV(p, v));
  res[`G3-${last}`] = verdict(`G3 final (${last === 'D' ? 'C' : 'D'} alone)`, p, (q) => (last === 'D' ? ins(q, 2, CG, 'base:C') : ins(q, 2, AA, 'base:D')));
}
log('SUMMARY', process.env.KW ?? 'tree', 'maint', process.env.Q181_MAINT ?? 'off', JSON.stringify(res));
