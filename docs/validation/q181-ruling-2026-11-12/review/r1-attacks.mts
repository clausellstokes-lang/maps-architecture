// Review probe r1: attacks on the amended rule 3 (b) flag step (Q181), run on the patched mirror (KW=tree) under
//   Q181_MUT unset  -> NEW (the amendment)          Q181_MUT=old -> OLD (the head's identical-rows test, re-implemented
//   in the mirror; r0's check: p1-forms under it is byte-identical to the ruling seat's p1-forms.base.log)
// and, with W=1 Q181_MAINT=junction, RQ2 emulated: W's predicate (J776 R2) written after each insertion on a proxy role,
// M1 - M4 run in rewriteRows after (b) (the ruling seat's rq2-emulation.diff; no commit hook).
//   S1  weak point 1: a chain's own LEAVE point v on another chain's run, bend swept; one-step and two-step removal of A
//   S2  warp (b'): a rider kept beside a T whose flag the amendment keeps; a warp moves the spine's vertex beside it
//   S3  the dropped BEFORE comparison: a rekey that JOINS two chains of one entity at a split vertex
//   S4  a chain's own collinear point at a CROSSING of another chain (W writes nothing there), with and without a rider
//   S5  the StretchRef throw: an L1 chain's stretch ending at an L2 Steiner vertex on its route
import { A, S, TX, T, describeV, nearest, live } from './lib.mts';
const W = await import(`/home/user/maps-scratch/q181/${process.env.KW ?? 'tree'}/plat/packages/kernel/test/warp/support.ts`);
const log = (...a: unknown[]) => console.log(...a);
const MODE = `${process.env.Q181_MUT ?? 'NEW'}${process.env.W ? '+RQ2' : ''}`;
const PROXY = process.env.Q181_MAINT ?? '';
const P = (x: number, y: number) => S.pt(x, y);
const ent = (p: any, r: number) => A.idOf(p, p.roles.entity[r]);
function writeW(p: any, placed: number[], entity: string, level: number): void {
  if (!process.env.W) return;
  const at: number[] = [];
  for (const v of new Set(placed)) {
    if (!A.isVertexLive(p, v) || (p.vertices.flags[v] & A.VERTEX_SPLIT) === 0) continue;
    const inc = A.outgoing(p, v);
    const mine = inc.filter((h: number) => A.rowsOn(p, 'edge', h).some((q: number) => ent(p, q) === entity));
    if (mine.length !== 2) continue;
    const others = (h: number) => new Set(A.rowsOn(p, 'edge', h).map((q: number) => ent(p, q)).filter((x: string) => x !== entity));
    const o0 = others(mine[0]);
    if (![...others(mine[1])].some((x) => o0.has(x))) continue;
    if (A.rowsOn(p, 'vertex', v).some((q: number) => A.roleInfo(p.roles.kind[q]).name === PROXY && ent(p, q) === entity)) continue;
    at.push(v);
  }
  if (at.length === 0) return;
  const r = TX.tx(p, T.spec(level), () => {
    for (const v of at) A.addRole(p, v, { role: PROXY, entity }, level);
    return { ok: true, value: null, warnings: [] };
  });
  if (!r.ok) throw new Error(`W write refused ${r.code}`);
  log(`    [W wrote (${PROXY}, ${entity}) on ${at.map((v) => `(${p.vertices.x[v]}, ${p.vertices.y[v]})`).join(' ')}]`);
}
function ins(p: any, level: number, pts: [number, number][], entity: string, role = 'invisible'): string {
  let placed: number[] = [];
  const r = TX.tx(p, T.spec(level), (o: any) => {
    const x = (globalThis as any).IC.insertChain(o, pts.map(([a, b]) => P(a, b)), [{ role, entity }], 'mandatory', {});
    if (x.ok) placed = x.value.placed;
    return x;
  });
  if (r.ok) writeW(p, placed, entity, level);
  return r.ok ? 'ok' : `REFUSED ${r.code} ${r.detail}`;
}
(globalThis as any).IC = await import(`/home/user/maps-scratch/q181/${process.env.KW ?? 'tree'}/plat/packages/kernel/src/insert/insertChain.ts`);
const run = (p: any, level: number, fn: (o: any) => any): string => {
  try {
    const r = TX.tx(p, T.spec(level), fn);
    return r.ok ? `ok${r.value?.record?.unflagged?.length ? ` unflagged=[${r.value.record.unflagged.map((v: number) => `(${p.vertices.x[v]},${p.vertices.y[v]})`).join(' ')}]` : ''}` : `REFUSED ${r.code} ${r.detail}`;
  } catch (e: any) {
    return `THROWS ${String(e.message).split('\n')[0]}`;
  }
};
const remove = (p: any, level: number, entity: string, role = 'invisible') => run(p, level, (o: any) => TX.removeEdges(o, { role, entity }));
const stretch = (p: any, level: number, entity: string, from: [number, number], to: [number, number], role = 'invisible') =>
  run(p, level, (o: any) => TX.removeEdges(o, { chain: { role, entity }, from: P(...from), to: P(...to) }));
const flagAt = (p: any, x: number, y: number): string => {
  const v = S.vertexAtPoint(p, x, y);
  return v < 0 ? 'gone' : describeV(p, v);
};
function verdict(name: string, p: any, fresh: (q: any) => void): boolean {
  const q = S.framed(4000);
  const saveW = process.env.W;
  fresh(q);
  if (saveW === undefined) delete process.env.W;
  else process.env.W = saveW;
  const a = S.contentPrint(p).split('\n');
  const b = S.contentPrint(q).split('\n');
  const eq = S.contentPrint(p) === S.contentPrint(q);
  const pr = S.allProblems(p);
  log(`  ${name}: equal to the survivors inserted fresh? ${eq} | vertices ${live(p).length} vs ${live(q).length} | ${pr.length === 0 ? 'allProblems ok' : `PROBLEMS ${pr[0]}`}`);
  if (!eq) {
    log('    only here:  ', a.filter((l: string) => !b.includes(l) && !l.startsWith('f')).join(' || '));
    log('    only fresh: ', b.filter((l: string) => !a.includes(l) && !l.startsWith('f')).join(' || '));
  }
  return eq;
}
const res: Record<string, string> = {};
log(`##### MODE ${MODE}`);

// ---------------------------------------------------------------------------------------------------------------- S1
// A L2 (0,2000)-(4000,2000). C L2 (500,2000) (2000,2000) (3000, 2000+d): C runs along A from 500 to v = (2000,2000) and
// leaves at v toward (3000, 2000+d). Small d: the kernel shares the stretch (C follows A past v; v is then an interior
// point with A on both sides — the guard class G); large d: a true leave vertex. Weak point 1 needs a LEAVE vertex whose
// two C edges are on-run (v within the hot pixel, 0.71 cm, of the segment between its neighbours on C).
for (const d of [20, 27, 35, 45, 60, 90, 150]) {
  for (const steps of [1, 2] as const) {
    const name = `S1 d=${d} ${steps === 1 ? 'one-step' : 'two-step'}`;
    log(`=== ${name}`);
    const p = S.framed(4000);
    ins(p, 2, [[0, 2000], [4000, 2000]], 'base:A');
    const c = ins(p, 2, [[500, 2000], [2000, 2000], [3000, 2000 + d]], 'base:C');
    log(`  C: ${c} | v: ${flagAt(p, 2000, 2000)}`);
    if (steps === 1) {
      log(`  A removed whole: ${remove(p, 2, 'base:A')} | v: ${flagAt(p, 2000, 2000)}`);
    } else {
      log(`  A's stretch v -> (4000,2000) removed: ${stretch(p, 2, 'base:A', [2000, 2000], [4000, 2000])} | v: ${flagAt(p, 2000, 2000)}`);
      log(`  A's rest removed: ${remove(p, 2, 'base:A')} | v: ${flagAt(p, 2000, 2000)}`);
    }
    res[name] = verdict(`${name} final (C alone)`, p, (q) => { process.env.W = ''; ins(q, 2, [[500, 2000], [2000, 2000], [3000, 2000 + d]], 'base:C'); }) ? 'EQ' : 'DIFF';
  }
}

// ---------------------------------------------------------------------------------------------------------------- S2
// way:1 L1 (0,2000) (1000,2000) (4000,2000); way:2 a T at j = (2000,2000) up to (2000,4000) (j split, same level);
// way:3 a rider along way:1 from (1000,2000) to j. way:2 removed: NEW keeps j's flag (pair {w1,w3} | {w1}), OLD clears.
// Then a warp moves way:1's vertex (1000,2000) — the nearest vertex beside j along the run — by `dy`: §3.6 (b') says j's
// flag clears and j is listed in `unflagged`. Then way:3 removed. §3.6: "removing the lane that ended there never
// straightens the warped spine" — j must stay.
for (const order of ['T-first', 'rider-first'] as const) {
  for (const dy of [1, 30]) {
    const name = `S2 ${order} dy=${dy}`;
    log(`=== ${name}`);
    const p = S.framed(4000);
    const way = (pts: [number, number][], e: string) => run(p, 1, (o: any) => (globalThis as any).IC.insertChain(o, pts.map(([a, b]) => P(a, b)), [{ role: 'way', entity: e }], 'mandatory'));
    way([[0, 2000], [1000, 2000], [4000, 2000]], 'way:1');
    way([[2000, 2000], [2000, 4000]], 'way:2');
    way([[1000, 2000], [2000, 2000]], 'way:3');
    log(`  j after the three ways: ${flagAt(p, 2000, 2000)}`);
    if (order === 'T-first') log(`  way:2 removed: ${remove(p, 1, 'way:2', 'way')} | j: ${flagAt(p, 2000, 2000)}`);
    const w = W.warpBatch(p, 1, W.drag(0, dy), W.box(990, 1990, 1010, 2010));
    const rep = w.ok ? w.value.value : null;
    log(`  warp of (1000,2000) by (0,${dy}): ${w.ok ? `applied=${rep.applied} moves=${rep.moves.map((m: any) => `${m.kind}(${m.from.x},${m.from.y})->(${m.to.x},${m.to.y})`).join(' ')} report.unflagged=[${rep.unflagged.map((v: number) => `(${p.vertices.x[v]},${p.vertices.y[v]})`).join(' ')}]` : `REFUSED ${w.code}`} | j: ${flagAt(p, 2000, 2000)}`);
    log(`  way:3 removed: ${remove(p, 1, 'way:3', 'way')} | j: ${flagAt(p, 2000, 2000)}`);
    if (order === 'rider-first') log(`  way:2 removed: ${remove(p, 1, 'way:2', 'way')} | j: ${flagAt(p, 2000, 2000)}`);
    res[name] = S.vertexAtPoint(p, 2000, 2000) >= 0 ? 'j KEPT (as §3.6 b\' promises)' : 'j DISSOLVED (the warped spine straightened)';
    log(`  -> ${res[name]} | ${S.allProblems(p).length === 0 ? 'allProblems ok' : S.allProblems(p)[0]}`);
  }
}

// ---------------------------------------------------------------------------------------------------------------- S3
// Q L2 (0,2000)-(4000,2000); C L2 (0,2000)-(2000,2000) (its end splits Q at v); K L2 (2000,2000)-(4000,2000) (lands on v).
// v: {Q,C} | {Q,K}. (a) C rekeyed whole to K (a rekey that JOINS K at v), then Q removed. (b) control, the head's own
// one-step form: Kw and Ke inserted as two chains of entity K, then Q removed.
{
  log('=== S3a rekey join then Q removed');
  const p = S.framed(4000);
  ins(p, 2, [[0, 2000], [4000, 2000]], 'base:Q');
  ins(p, 2, [[0, 2000], [2000, 2000]], 'base:C');
  ins(p, 2, [[2000, 2000], [4000, 2000]], 'base:K');
  log(`  v: ${flagAt(p, 2000, 2000)}`);
  log(`  C rekeyed whole to K: ${run(p, 2, (o: any) => TX.retypeEdges(o, { role: 'invisible', entity: 'base:C' }, [], [], { from: 'base:C', to: 'base:K' }))} | v: ${flagAt(p, 2000, 2000)}`);
  log(`  Q removed: ${remove(p, 2, 'base:Q')} | v: ${flagAt(p, 2000, 2000)}`);
  res['S3a'] = S.vertexAtPoint(p, 2000, 2000) >= 0 ? 'v kept' : 'v dissolved';
  verdict('S3a vs K inserted as (0,2000)(2000,2000)(4000,2000)', p, (q) => { process.env.W = ''; ins(q, 2, [[0, 2000], [2000, 2000], [4000, 2000]], 'base:K'); });
  verdict('S3a vs K inserted as (0,2000)(4000,2000)', p, (q) => { process.env.W = ''; ins(q, 2, [[0, 2000], [4000, 2000]], 'base:K'); });
}
{
  log('=== S3b control (the head): Kw and Ke, two chains of one entity, then Q removed');
  const p = S.framed(4000);
  ins(p, 2, [[0, 2000], [4000, 2000]], 'base:Q');
  log(`  Kw: ${ins(p, 2, [[0, 2000], [2000, 2000]], 'base:K')}  Ke: ${ins(p, 2, [[2000, 2000], [4000, 2000]], 'base:K')} | v: ${flagAt(p, 2000, 2000)}`);
  log(`  Q removed: ${remove(p, 2, 'base:Q')} | v: ${flagAt(p, 2000, 2000)}`);
  res['S3b'] = S.vertexAtPoint(p, 2000, 2000) >= 0 ? 'v kept' : 'v dissolved';
}

// ---------------------------------------------------------------------------------------------------------------- S4
// A L2 (0,2000)-(4000,2000). C L2 crossing it with an OWN point at the crossing, collinear within the hot pixel:
// (2000,1000) (2000,2000) (2001,3000) — v's offset from its neighbours' segment is 0.5 cm. W (R2) writes nothing at v:
// C's two edges carry no other entity. (a) A removed whole. (b) a rider R along C from (2000,3000)... no: R along C's
// north edge from v to (2001,3000)'s side is C's own edge; R is inserted as (2000,2000) (2001,3000), riding C's north
// edge and ending at v; then A removed; then R removed.
for (const variant of ['a', 'b', 'c'] as const) {
  const name = `S4${variant}`;
  log(`=== ${name} ${variant === 'a' ? 'A removed whole' : variant === 'b' ? 'rider R on C north of v; A removed; R removed' : 'rider R; R removed; A removed (the order the head already dissolves)'}`);
  const p = S.framed(4000);
  ins(p, 2, [[0, 2000], [4000, 2000]], 'base:A');
  log(`  C: ${ins(p, 2, [[2000, 1000], [2000, 2000], [2001, 3000]], 'base:C')} | v: ${flagAt(p, 2000, 2000)}`);
  if (variant !== 'a') log(`  R: ${ins(p, 2, [[2000, 2000], [2001, 3000]], 'base:R')} | v: ${flagAt(p, 2000, 2000)}`);
  if (variant === 'c') log(`  R removed: ${remove(p, 2, 'base:R')} | v: ${flagAt(p, 2000, 2000)}`);
  log(`  A removed: ${remove(p, 2, 'base:A')} | v: ${flagAt(p, 2000, 2000)}`);
  if (variant === 'b') log(`  R removed: ${remove(p, 2, 'base:R')} | v: ${flagAt(p, 2000, 2000)}`);
  res[name] = verdict(`${name} final (C alone)`, p, (q) => { process.env.W = ''; ins(q, 2, [[2000, 1000], [2000, 2000], [2001, 3000]], 'base:C'); }) ? 'EQ' : 'DIFF';
}

// ---------------------------------------------------------------------------------------------------------------- S5
// A L1 (0,2000)-(4000,2000); X L2 (2000,1000)-(2000,3000) crossing it (v an L2 Steiner vertex on A's L1 run). A StretchRef
// of A from v to (4000,2000) at L1 — §3.4: "an end finer than the chain is first promoted to the chain's level". (b): A
// with an own L1 point at (1000,2000) between its start and v. (c): a rekey of the same stretch.
for (const variant of ['a', 'b', 'c'] as const) {
  log(`=== S5${variant}`);
  const p = S.framed(4000);
  ins(p, 1, variant === 'b' ? [[0, 2000], [1000, 2000], [4000, 2000]] : [[0, 2000], [4000, 2000]], 'base:A');
  ins(p, 2, [[2000, 1000], [2000, 3000]], 'base:X');
  log(`  v: ${flagAt(p, 2000, 2000)}`);
  const out = variant === 'c'
    ? run(p, 1, (o: any) => TX.retypeEdges(o, { chain: { role: 'invisible', entity: 'base:A' }, from: P(2000, 2000), to: P(4000, 2000) }, [], [], { from: 'base:A', to: 'base:A2' }))
    : stretch(p, 1, 'base:A', [2000, 2000], [4000, 2000]);
  log(`  ${variant === 'c' ? 'rekey' : 'StretchRef removal'} of A from v to (4000,2000) at L1: ${out} | v: ${flagAt(p, 2000, 2000)}`);
  res[`S5${variant}`] = out.startsWith('THROWS') ? 'THROWS' : out;
}
log('SUMMARY', MODE, JSON.stringify(res));
