// Probe 4: the pin candidates of the Q181 line and the mutants they kill, on the kernel KW names. On the patched mirror
// the environment's Q181_MUT selects a scratch mutant of the amended flag step: unset (the amendment), 'rowoff' (no
// row test: live, one level, on-run — the old S06), 'before' (a row in common read BEFORE the batch, its strip left out,
// at the lowest incident level). KW=base is the design head (mutant OLD: the whole-row-set comparison).
//   Q1 the stretch end (the RQ2 fixture's v1), then C's rest → A alone.
//   Q2 the rekey cut at v1, then C, then K → A alone.
//   Q3 a crossing X at v, a rider B along A ending at v, X removed, B removed → A alone.
//   Q4 a T: X ends on C at v; a rider D along C west of v ending there; C rekeyed WHOLE to K (flag kept); then D, then X
//      → K alone.
//   Q5 two riders round a T: X ends on C at v, A along C west of v ending at v, B along C east of v from v; C removed →
//      the flag cleared and listed (no row in common: A | B); then X removed → v stays: A and B inserted fresh.
//   Q6 N-19's case re-recorded: an L0 way split by an L0 T, an L0 retype adding a shore row east of v → the flag KEPT,
//      `unflagged` empty, the rows kept.
import { S, TX, T, ins, rem, nearest, live, A } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
const P = (x: number, y: number) => S.pt(x, y);
const AA: [number, number][] = [[3142, 2862], [499, 2966]];
const yA = (x: number) => Math.round(2862 + ((3142 - x) * 104) / 2643);
const at = (p: any, v: number): [number, number] => [p.vertices.x[v], p.vertices.y[v]];
const eq = (p: any, fresh: (q: any) => void) => { const q = S.framed(4000); fresh(q); return S.contentPrint(p) === S.contentPrint(q) && S.allProblems(p).length === 0; };
const res: Record<string, boolean> = {};
const C4: [number, number][] = [[3142, 2862], [2400, yA(2400)], [1800, 2915], [499, 2966]];
{
  const p = S.framed(4000); ins(p, 2, AA, 'base:A'); ins(p, 2, C4, 'base:C');
  const v = nearest(p, 2400, yA(2400));
  TX.tx(p, T.spec(2), (o: any) => TX.removeEdges(o, { chain: { role: 'invisible', entity: 'base:C' }, from: P(...at(p, v)), to: P(499, 2966) }));
  rem(p, 2, { role: 'invisible', entity: 'base:C' });
  res.Q1 = eq(p, (q) => ins(q, 2, AA, 'base:A'));
}
{
  const p = S.framed(4000); ins(p, 2, AA, 'base:A'); ins(p, 2, C4, 'base:C');
  const v = nearest(p, 2400, yA(2400));
  TX.tx(p, T.spec(2), (o: any) => TX.retypeEdges(o, { chain: { role: 'invisible', entity: 'base:C' }, from: P(...at(p, v)), to: P(499, 2966) }, [], [], { from: 'base:C', to: 'base:K' }));
  rem(p, 2, { role: 'invisible', entity: 'base:C' }); rem(p, 2, { role: 'invisible', entity: 'base:K' });
  res.Q2 = eq(p, (q) => ins(q, 2, AA, 'base:A'));
}
{
  const p = S.framed(4000); ins(p, 2, AA, 'base:A'); ins(p, 2, [[1800, 2400], [1800, 3400]], 'base:X');
  const v = nearest(p, 1800, yA(1800));
  ins(p, 2, [[3142, 2862], at(p, v)], 'base:B');
  rem(p, 2, { role: 'invisible', entity: 'base:X' }); rem(p, 2, { role: 'invisible', entity: 'base:B' });
  res.Q3 = eq(p, (q) => ins(q, 2, AA, 'base:A'));
}
{
  const p = S.framed(4000); ins(p, 2, AA, 'base:C'); ins(p, 2, [[1800, 2400], [1800, yA(1800)]], 'base:X');
  const v = nearest(p, 1800, yA(1800));
  ins(p, 2, [[3142, 2862], at(p, v)], 'base:D');
  const r = TX.tx(p, T.spec(2), (o: any) => TX.retypeEdges(o, { role: 'invisible', entity: 'base:C' }, [], [], { from: 'base:C', to: 'base:K' }));
  const kept = (p.vertices.flags[v] & A.VERTEX_SPLIT) !== 0;
  rem(p, 2, { role: 'invisible', entity: 'base:D' }); rem(p, 2, { role: 'invisible', entity: 'base:X' });
  res.Q4 = r.ok && kept && eq(p, (q) => ins(q, 2, AA, 'base:K'));
}
{
  const p = S.framed(4000); ins(p, 2, AA, 'base:C'); ins(p, 2, [[1800, 2400], [1800, yA(1800)]], 'base:X');
  const v = nearest(p, 1800, yA(1800));
  ins(p, 2, [[3142, 2862], at(p, v)], 'base:A');
  ins(p, 2, [at(p, v), [499, 2966]], 'base:B');
  const r = TX.tx(p, T.spec(2), (o: any) => TX.removeEdges(o, { role: 'invisible', entity: 'base:C' }));
  const cleared = (p.vertices.flags[v] & A.VERTEX_SPLIT) === 0 && r.ok && (r.value?.record?.unflagged ?? []).includes(v);
  rem(p, 2, { role: 'invisible', entity: 'base:X' });
  log('  Q5 cleared at C\'s removal:', cleared, '| final', S.contentPrint(p).split('\n').filter((l: string) => l.startsWith('v 1800')).join(' '));
  res.Q5 = cleared && eq(p, (q) => { ins(q, 2, [[3142, 2862], at(p, v)], 'base:A'); ins(q, 2, [at(p, v), [499, 2966]], 'base:B'); });
}
{
  const p = S.framed(4000);
  ins(p, 0, [[0, 2000], [4000, 2000]], 'way:1', {}, 'way');
  ins(p, 0, [[2000, 2000], [2000, 4000]], 'way:2', {}, 'way');
  const v = S.vertexAtPoint(p, 2000, 2000);
  const r = TX.tx(p, T.spec(0), (o: any) => TX.retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: P(2000, 2000), to: P(4000, 2000) }, [{ role: 'shore', entity: 'water:1' }], []));
  res.Q6 = r.ok && (p.vertices.flags[v] & A.VERTEX_SPLIT) !== 0 && (r.value?.record?.unflagged ?? []).length === 0 && S.allProblems(p).length === 0;
}
log('SUMMARY', process.env.KW ?? 'tree', 'mutant', process.env.Q181_MUT ?? (process.env.KW === 'base' ? 'OLD' : 'none'), JSON.stringify(res), live.name ? '' : '');
