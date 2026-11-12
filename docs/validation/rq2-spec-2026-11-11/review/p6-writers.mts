// Probe 6: the writer paths that can leave a `shape` row where its chain no longer passes through (an orphan by ruling
// A's reading), on TODAY's code with the proxy row `junction` planted on C's two-key own points (today strips no
// non-knot vertex row in removeEdges' StretchRef branch; rekey moves them except at cut vertices).
// C has two interior own points on A's edge: v1 (2400, ~2891) and v2 (1800, 2915).
import { A, S, TX, T, ins, rem, describeV, nearest, live, plant } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
const AA: [number, number][] = [[3142, 2862], [499, 2966]];
const yA = (x: number) => Math.round(2862 + ((3142 - x) * 104) / 2643);
const C4: [number, number][] = [[3142, 2862], [2400, yA(2400)], [1800, 2915], [499, 2966]];
const P = (x: number, y: number) => S.pt(x, y);

function setup() {
  const p = S.framed(4000);
  ins(p, 2, AA, 'base:A');
  const c = ins(p, 2, C4, 'base:C');
  const v1 = nearest(p, 2400, yA(2400));
  const v2 = nearest(p, 1800, 2915);
  plant(p, 2, v1, 'junction', 'base:C');
  plant(p, 2, v2, 'junction', 'base:C');
  return { p, c, v1, v2 };
}
{
  const { p, v1, v2 } = setup();
  log('=== setup'); log(' v1', describeV(p, v1)); log(' v2', describeV(p, v2));
  // A StretchRef from v1 to C's far end: v2 interior, v1 an END of the stretch (and of C's remaining part).
  const r = TX.tx(p, T.spec(2), (o: any) => TX.removeEdges(o, { chain: { role: 'invisible', entity: 'base:C' }, from: P(p.vertices.x[v1], p.vertices.y[v1]), to: P(499, 2966) }));
  log('=== StretchRef removal v1 → (499,2966):', r.ok, r.ok ? '' : `${r.code} ${r.detail}`);
  log(' v1 (the stretch END, C on one side only now)', describeV(p, v1));
  log(' v2 (interior)', describeV(p, v2));
  // The canonical form: C's remaining part inserted fresh along A (its end at v1), with no row at its end (ruling 2).
  const q = S.framed(4000);
  ins(q, 2, AA, 'base:A');
  ins(q, 2, [[3142, 2862], [p.vertices.x[v1], p.vertices.y[v1]]], 'base:C');
  const a = S.contentPrint(p).split('\n'); const b = S.contentPrint(q).split('\n');
  log(' lines only after the stretch removal:', a.filter((l: string) => !b.includes(l)).join(' || ') || '(none)');
  log(' lines only in the fresh insertion:', b.filter((l: string) => !a.includes(l)).join(' || ') || '(none)');
}
{
  const { p, v1, v2 } = setup();
  // A rekey of the stretch v1 → far end to base:K: v1 is the cut vertex (C's rest on one side, K's moved part on the other).
  const r = TX.tx(p, T.spec(2), (o: any) => TX.retypeEdges(o, { chain: { role: 'invisible', entity: 'base:C' }, from: P(p.vertices.x[v1], p.vertices.y[v1]), to: P(499, 2966) }, [], [], { from: 'base:C', to: 'base:K' }));
  log('=== rekey of the stretch v1 → (499,2966) to base:K:', r.ok, r.ok ? '' : `${r.code} ${r.detail}`);
  log(' v1 (cut)', describeV(p, v1));
  log(' v2 (moved part, interior)', describeV(p, v2));
}
{
  const { p, v1, v2 } = setup();
  // Today's whole-chain removal with the proxy planted: the proxy is not stripped (the round's leg 2 line 1 strips `shape`).
  const r = rem(p, 2, { role: 'invisible', entity: 'base:C' });
  log('=== whole-chain removal of C, proxy rows planted (today: no strip):', r.ok, 'v1', describeV(p, v1), '| vertices', live(p).length, '| dissolvable', S.dissolvableProblems(p).length);
}
// Every order back to A alone: after the stretch removal (and after the rekey), remove what is left of C (and K), with
// the proxy rows stripped by hand as the round's strip would (whole-chain: every row of the entity on its vertices).
for (const mode of ['stretch', 'rekey'] as const) {
  const { p, v1 } = setup();
  if (mode === 'stretch') TX.tx(p, T.spec(2), (o: any) => TX.removeEdges(o, { chain: { role: 'invisible', entity: 'base:C' }, from: P(p.vertices.x[v1], p.vertices.y[v1]), to: P(499, 2966) }));
  else TX.tx(p, T.spec(2), (o: any) => TX.retypeEdges(o, { chain: { role: 'invisible', entity: 'base:C' }, from: P(p.vertices.x[v1], p.vertices.y[v1]), to: P(499, 2966) }, [], [], { from: 'base:C', to: 'base:K' }));
  // Strip every proxy row (as if the round stripped every `shape` row of the removed entities).
  const strip = TX.tx(p, T.spec(2), (o: any) => {
    for (const v of live(p)) for (const r of A.rowsOn(p, 'vertex', v)) A.removeRoleRow(p, r);
    return { ok: true, value: null, warnings: [] };
  });
  log(`  (${mode}) hand strip in a batch:`, strip.ok, strip.ok ? '' : strip.code, '— rows left', live(p).reduce((n: number, v: number) => n + A.rowsOn(p, 'vertex', v).length, 0));
  for (const v of live(p)) { const rs = A.rowsOn(p, 'vertex', v); for (const r of rs) A.removeRoleRow(p, r); }
  log(`  (${mode}) then a bare strip — rows left`, live(p).reduce((n: number, v: number) => n + A.rowsOn(p, 'vertex', v).length, 0));
  for (const e of ['base:C', 'base:K']) rem(p, 2, { role: 'invisible', entity: e });
  const q = S.framed(4000);
  ins(q, 2, AA, 'base:A');
  log(`=== after the ${mode}, the rest removed: equal to A alone?`, S.contentPrint(p) === S.contentPrint(q), '| v1', describeV(p, v1), '| vertices', live(p).length, 'vs', live(q).length);
}
