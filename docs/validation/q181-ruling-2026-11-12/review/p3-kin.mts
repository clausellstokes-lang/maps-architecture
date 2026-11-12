// Probe 3: Q181's kin and the mixed-level forms, on the kernel KW names (no proxy row; Q181_MAINT unset).
//   K1 the reverse order: C first with its own point v, A laid along C's run through v later, C removed → A alone?
//   K1b the same with a crossing X at v laid after A and removed before C.
//   K2 three coincident chains, the base removed first, then each survivor alone: see p2-rq2 (G3), which needs the row.
//   K3 a finer chain crossing a coarser one (B L2 across A L1 at v, an L2 Steiner vertex): A removed → B alone?
//   K4 the same at one level (B L2 across A L2): A removed → B alone? (the two-pair crossing, for contrast)
import { S, TX, T, ins, rem, describeV, nearest, live } from './lib.mts';
const log = (...a: unknown[]) => console.log(...a);
const AA: [number, number][] = [[3142, 2862], [499, 2966]];
const CG: [number, number][] = [[3142, 2862], [1800, 2915], [499, 2966]];
const yA = (x: number) => Math.round(2862 + ((3142 - x) * 104) / 2643);
const r = (x: any) => (x.ok ? 'ok' : `REFUSED ${x.code}`);
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
const res: Record<string, boolean> = {};
{
  log('=== K1 reverse order: C (own point v), then A along it, then C removed');
  const p = S.framed(4000);
  ins(p, 2, CG, 'base:C');
  const v = nearest(p, 1800, 2915);
  log('  v after C:', describeV(p, v));
  ins(p, 2, AA, 'base:A');
  log('  v after A:', describeV(p, v));
  log('  C removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:C' })), '|', describeV(p, v));
  res.K1 = verdict('K1 final (A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
{
  log('=== K1b reverse order with a crossing X at v laid after A and removed before C');
  const p = S.framed(4000);
  ins(p, 2, CG, 'base:C');
  ins(p, 2, AA, 'base:A');
  ins(p, 2, [[1800, 2400], [1800, 3400]], 'base:X');
  const v = nearest(p, 1800, 2915);
  log('  v after X:', describeV(p, v));
  log('  X removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:X' })), '|', describeV(p, v));
  log('  C removed:', r(rem(p, 2, { role: 'invisible', entity: 'base:C' })), '|', describeV(p, v));
  res.K1b = verdict('K1b final (A alone)', p, (q) => ins(q, 2, AA, 'base:A'));
}
for (const al of [1, 2] as const) {
  const name = al === 1 ? 'K3' : 'K4';
  log(`=== ${name} B L2 crossing A L${al} at v; A removed → B alone`);
  const p = S.framed(4000);
  ins(p, al, AA, 'base:A');
  ins(p, 2, [[1800, 2400], [1800, 3400]], 'base:B');
  const v = nearest(p, 1800, yA(1800));
  log('  v:', describeV(p, v));
  log(`  A removed (L${al}):`, r(rem(p, al, { role: 'invisible', entity: 'base:A' })), '|', describeV(p, v));
  res[name] = verdict(`${name} final (B alone)`, p, (q) => ins(q, 2, [[1800, 2400], [1800, 3400]], 'base:B'));
}
log('SUMMARY', process.env.KW ?? 'tree', JSON.stringify(res));
