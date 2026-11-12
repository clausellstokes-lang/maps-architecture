// The Q181 sequence fuzzer: the same random sequence on the design head's kernel (OLD, KW=base) and the patched mirror
// (NEW, KW=tree), compared with each other and with the survivors inserted fresh. Run with
//   tsx --conditions=plat-source fuzz.mts <sequences> <seed>
// A sequence: 2 – 4 chains on (or crossing) the shared line y = 2000 — straight along it (with 0 – 2 own interior points
// on it), one-bend (arriving from off the line and running along it, or the reverse), or crossing it — the first one at L1
// with probability 0.3, the others at L2; then 2 – 5 ops among: an END stretch removed (from a route vertex of the chain
// to one of its ends), the same stretch rekeyed to a fresh entity, a whole chain removed, one more chain inserted. Ops are
// drawn on the OLD arena's routes and applied to both; a stretch's cut vertex must be live in both.
// The model keeps each surviving entity's polyline (cut at the stretch's cut vertex) so the FRESH form is every survivor
// inserted in its order of creation. Per sequence: OLD == NEW? each == FRESH? distance = |symmetric difference of the
// content prints|. Reported: the class counts, every sequence where NEW is further from FRESH than OLD, and every
// sequence where NEW lacks a vertex both FRESH and OLD have (a vertex a survivor owns, dissolved).
const mk = async (kw: string) => {
  const W = `/home/user/maps-scratch/q181/${kw}/plat/packages/kernel`;
  return {
    A: await import(`${W}/src/arena/index.ts`),
    TX: await import(`${W}/src/tx/index.ts`),
    IC: await import(`${W}/src/insert/insertChain.ts`),
    S: await import(`${W}/test/insert/step3-5/support.ts`),
    T: { spec: (level: number) => ({ key: { layer: 'ground', part: 0 }, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: 8 }, stage: 8, rederivesFrom: 8, workLimit: 1_000_000 }) },
  };
};
const OLD = await mk('base');
const NEW = await mk('tree');
type K = typeof OLD;
type Pt = [number, number];
const N = Number(process.argv[2] ?? 200);
const SEED = Number(process.argv[3] ?? 1);
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const Y = 2000;
const RQ2 = Boolean(process.env.Q181_MAINT);
const PROXY = process.env.Q181_MAINT ?? '';
/** RQ2's W (J776 R2), emulated with the proxy row: on each landed point of the chain carrying VERTEX_SPLIT, the chain's
 * entity on exactly two incident edges and another entity on both. */
function writeW(k: K, p: any, placed: number[], entity: string, level: number): void {
  const ent = (r: number) => k.A.idOf(p, p.roles.entity[r]);
  const at: number[] = [];
  for (const v of new Set(placed)) {
    if (!k.A.isVertexLive(p, v) || (p.vertices.flags[v] & k.A.VERTEX_SPLIT) === 0) continue;
    const inc = k.A.outgoing(p, v);
    const mine = inc.filter((h: number) => k.A.rowsOn(p, 'edge', h).some((q: number) => ent(q) === entity));
    if (mine.length !== 2) continue;
    const others = (h: number) => new Set(k.A.rowsOn(p, 'edge', h).map(ent).filter((x: string) => x !== entity));
    const o0 = others(mine[0]);
    if (![...others(mine[1])].some((x) => o0.has(x))) continue;
    if (k.A.rowsOn(p, 'vertex', v).some((q: number) => k.A.roleInfo(p.roles.kind[q]).name === PROXY && ent(q) === entity)) continue;
    at.push(v);
  }
  if (at.length === 0) return;
  const r = k.TX.tx(p, k.T.spec(level), () => {
    for (const v of at) k.A.addRole(p, v, { role: PROXY, entity }, level);
    return { ok: true, value: null, warnings: [] };
  });
  if (!r.ok) throw new Error(`W write refused ${r.code}`);
}
function ins(k: K, p: any, level: number, pts: Pt[], entity: string): boolean {
  let placed: number[] = [];
  const r = k.TX.tx(p, k.T.spec(level), (o: any) => {
    const x = k.IC.insertChain(o, pts.map(([a, b]) => k.S.pt(a, b)), [{ role: 'invisible', entity }], 'mandatory', {});
    if (x.ok) placed = x.value.placed;
    return x;
  });
  if (r.ok && RQ2) writeW(k, p, placed, entity, level);
  return r.ok;
}
function routeVertices(k: K, p: any, entity: string): { all: number[]; ends: number[] } {
  const deg = new Map<number, number>();
  const T = p.halfEdges;
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!k.A.isHalfEdgeLive(p, 2 * e)) continue;
    if (!k.A.rowsOn(p, 'edge', 2 * e).some((r: number) => k.A.idOf(p, p.roles.entity[r]) === entity)) continue;
    for (const v of [T.origin[2 * e], T.origin[2 * e + 1]]) deg.set(v, (deg.get(v) ?? 0) + 1);
  }
  const all = [...deg.keys()].sort((a, b) => p.vertices.x[a] - p.vertices.x[b] || p.vertices.y[a] - p.vertices.y[b]);
  return { all, ends: all.filter((v) => deg.get(v) === 1) };
}
const xy = (p: any, v: number): Pt => [p.vertices.x[v], p.vertices.y[v]];
const vertexAt = (k: K, p: any, q: Pt): number => k.S.vertexAtPoint(p, q[0], q[1]);
/** Cut a polyline at q (a point on it within 1 cm), keeping the side of `keepFirst`; returns [kept, removed]. */
function cut(pts: Pt[], q: Pt, keepFirst: boolean): [Pt[], Pt[]] | null {
  let best = -1;
  let bd = Infinity;
  for (let i = 0; i + 1 < pts.length; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((q[0] - ax) * dx + (q[1] - ay) * dy) / (dx * dx + dy * dy)));
    const d = Math.hypot(ax + t * dx - q[0], ay + t * dy - q[1]);
    if (d < bd) { bd = d; best = i; }
  }
  if (best < 0 || bd > 1) return null;
  const same = (a: Pt, b: Pt) => a[0] === b[0] && a[1] === b[1];
  const first = pts.slice(0, best + 1);
  if (!same(first[first.length - 1], q)) first.push(q);
  const second: Pt[] = [q, ...pts.slice(best + 1).filter((x, i) => !(i === 0 && same(x, q)))];
  if (first.length < 2 || second.length < 2) return null;
  return keepFirst ? [first, second] : [second, first];
}
interface Ent { name: string; pts: Pt[]; level: number; order: number; }
function genChain(R: () => number): Pt[] {
  const x = () => 600 + Math.floor(R() * 28) * 100 + Math.floor(R() * 3) * 7;
  const kind = R();
  if (kind < 0.5) {
    let a = x(), b = x();
    while (Math.abs(a - b) < 300) b = x();
    if (a > b) [a, b] = [b, a];
    const pts: Pt[] = [[a, Y]];
    const nIn = Math.floor(R() * 3);
    const inner = new Set<number>();
    for (let i = 0; i < nIn; i++) { const m = a + 50 + Math.floor(R() * (b - a - 100)); inner.add(m); }
    for (const m of [...inner].sort((u, w) => u - w)) pts.push([m, Y]);
    pts.push([b, Y]);
    return R() < 0.5 ? pts : pts.reverse();
  }
  if (kind < 0.8) {
    let a = x(), b = x();
    while (Math.abs(a - b) < 300) b = x();
    const off = (R() < 0.5 ? -1 : 1) * (200 + Math.floor(R() * 600));
    const pts: Pt[] = [[a + (a < b ? -150 : 150) * (R() < 0.5 ? 1 : 0), Y + off], [a, Y], [b, Y]];
    return R() < 0.5 ? pts : pts.reverse();
  }
  const c = x();
  return R() < 0.5 ? [[c, Y - 500], [c, Y + 500]] : [[c, Y - 500], [c, Y]];
}
function fresh(k: K, ents: Ent[], order: Ent[]): any {
  const q = k.S.framed(4000);
  for (const e of order) ins(k, q, e.level, e.pts, e.name);
  return q;
}
function orders(ents: Ent[], R: () => number): Ent[][] {
  const base = [...ents].sort((a, b) => a.order - b.order);
  if (base.length <= 4) {
    const out: Ent[][] = [];
    const perm = (pre: Ent[], rest: Ent[]) => { if (rest.length === 0) out.push(pre); rest.forEach((x, i) => perm([...pre, x], [...rest.slice(0, i), ...rest.slice(i + 1)])); };
    perm([], base);
    return out;
  }
  const out: Ent[][] = [base];
  for (let i = 0; i < 30; i++) out.push([...base].sort(() => R() - 0.5));
  return out;
}
const lines = (k: K, p: any) => new Set<string>(k.S.contentPrint(p).split('\n'));
const dist = (a: Set<string>, b: Set<string>) => { let n = 0; for (const x of a) if (!b.has(x)) n++; for (const x of b) if (!a.has(x)) n++; return n; };
const vset = (s: Set<string>) => new Set([...s].filter((l) => l.startsWith('v ')).map((l) => l.split(' ')[1]));
const stats: Record<string, number> = { sequences: 0, ops: 0, refusedBoth: 0, refusedSplit: 0, throws: 0, oldEqNew: 0, differ: 0, newEqFresh_oldNot: 0, oldEqFresh_newNot: 0, neitherEqFresh: 0, newFurther: 0, newCloser: 0, newLacksOwned: 0, newFurtherVertices: 0, newCloserVertices: 0, oldLacksOwned: 0, problemsNew: 0, problemsOld: 0 };
const reports: string[] = [];
for (let s = 0; s < N; s++) {
  const seed = SEED * 1_000_003 + s;
  const R = rng(seed);
  const po = OLD.S.framed(4000);
  const pn = NEW.S.framed(4000);
  const ents: Ent[] = [];
  const trace: string[] = [];
  let order = 0;
  let fresh_ok = true;
  const insert = (first: boolean) => {
    const pts = genChain(R);
    const level = first && R() < 0.3 ? 1 : 2;
    const name = `c:${order}`;
    const a = ins(OLD, po, level, pts, name);
    const b = ins(NEW, pn, level, pts, name);
    trace.push(`ins ${name} L${level} ${JSON.stringify(pts)} ${a}/${b}`);
    if (a !== b) { stats.refusedSplit++; fresh_ok = false; }
    if (a && b) ents.push({ name, pts, level, order });
    order++;
  };
  try {
    const n0 = 2 + Math.floor(R() * 3);
    for (let i = 0; i < n0; i++) insert(i === 0);
    const nOps = 2 + Math.floor(R() * 4);
    for (let i = 0; i < nOps; i++) {
      stats.ops++;
      const kind = R();
      if (ents.length === 0 || kind > 0.85) { insert(false); continue; }
      const e = ents[Math.floor(R() * ents.length)];
      if (kind > 0.65) {
        const a = OLD.TX.tx(po, OLD.T.spec(e.level), (o: any) => OLD.TX.removeEdges(o, { role: 'invisible', entity: e.name })).ok;
        const b = NEW.TX.tx(pn, NEW.T.spec(e.level), (o: any) => NEW.TX.removeEdges(o, { role: 'invisible', entity: e.name })).ok;
        trace.push(`rem ${e.name} ${a}/${b}`);
        if (a !== b) { stats.refusedSplit++; fresh_ok = false; }
        if (a && b) ents.splice(ents.indexOf(e), 1);
        continue;
      }
      // an end stretch, removed or rekeyed
      const rv = routeVertices(OLD, po, e.name);
      if (rv.ends.length !== 2) { trace.push(`skip ${e.name} (ends ${rv.ends.length})`); continue; }
      const inner = rv.all.filter((v) => !rv.ends.includes(v) && vertexAt(NEW, pn, xy(po, v)) >= 0);
      if (inner.length === 0) { trace.push(`skip ${e.name} (no inner)`); continue; }
      const q = xy(po, inner[Math.floor(R() * inner.length)]);
      const endIdx = R() < 0.5 ? 0 : 1;
      const end = xy(po, rv.ends[endIdx]);
      // which model side holds `end`?
      const keepFirst = !(Math.hypot(end[0] - e.pts[0][0], end[1] - e.pts[0][1]) < 2);
      const c = cut(e.pts, q, keepFirst);
      if (c === null) { trace.push(`skip ${e.name} (cut)`); continue; }
      const ref = (k: K) => ({ chain: { role: 'invisible', entity: e.name }, from: k.S.pt(q[0], q[1]), to: k.S.pt(end[0], end[1]) });
      if (kind < 0.4) {
        const a = OLD.TX.tx(po, OLD.T.spec(e.level), (o: any) => OLD.TX.removeEdges(o, ref(OLD))).ok;
        const b = NEW.TX.tx(pn, NEW.T.spec(e.level), (o: any) => NEW.TX.removeEdges(o, ref(NEW))).ok;
        trace.push(`stretch ${e.name} ${q}→${end} ${a}/${b}`);
        if (a !== b) { stats.refusedSplit++; fresh_ok = false; }
        if (!a && !b) stats.refusedBoth++;
        if (a && b) e.pts = c[0];
      } else {
        const to = `c:${order++}`;
        const a = OLD.TX.tx(po, OLD.T.spec(e.level), (o: any) => OLD.TX.retypeEdges(o, ref(OLD), [], [], { from: e.name, to })).ok;
        const b = NEW.TX.tx(pn, NEW.T.spec(e.level), (o: any) => NEW.TX.retypeEdges(o, ref(NEW), [], [], { from: e.name, to })).ok;
        trace.push(`rekey ${e.name} ${q}→${end} to ${to} ${a}/${b}`);
        if (a !== b) { stats.refusedSplit++; fresh_ok = false; }
        if (!a && !b) stats.refusedBoth++;
        if (a && b) { e.pts = c[0]; ents.push({ name: to, pts: c[1], level: e.level, order: order - 1 }); }
      }
    }
  } catch (err: any) {
    stats.throws++;
    reports.push(`seed ${seed}: THROWS ${String(err.message).split('\n')[0]}\n    ${trace.join('\n    ')}`);
    continue;
  }
  stats.sequences++;
  if (OLD.S.allProblems(po).length > 0) stats.problemsOld++;
  if (NEW.S.allProblems(pn).length > 0) { stats.problemsNew++; reports.push(`seed ${seed}: NEW allProblems ${NEW.S.allProblems(pn)[0]}\n    ${trace.join('\n    ')}`); }
  const lo = lines(OLD, po);
  const ln = lines(NEW, pn);
  if (dist(lo, ln) === 0) { stats.oldEqNew++; continue; }
  stats.differ++;
  if (!fresh_ok) { reports.push(`seed ${seed}: differ, a refusal split the kernels\n    ${trace.join('\n    ')}`); continue; }
  // FRESH: the survivors inserted in every order (≤ 4 survivors) or in 31 orders; the distance is the least over them.
  let lf = new Set<string>();
  let dO = Infinity;
  let dN = Infinity;
  let pO = Infinity;
  let pN = Infinity;
  let owned: Set<string> | null = null;
  const pos = (x: Set<string>) => vset(x);
  const po0 = pos(lo), pn0 = pos(ln);
  for (const ord of orders(ents, R)) {
    const l = lines(NEW, fresh(NEW, ents, ord));
    const pf = pos(l);
    owned = owned === null ? pf : new Set([...owned].filter((x) => pf.has(x)));
    pO = Math.min(pO, dist(po0, pf));
    pN = Math.min(pN, dist(pn0, pf));
    const a = dist(lo, l);
    const b = dist(ln, l);
    if (b < dN || (b === dN && a < dO)) lf = l;
    dO = Math.min(dO, a);
    dN = Math.min(dN, b);
  }
  if (dN === 0 && dO > 0) stats.newEqFresh_oldNot++;
  else if (dO === 0 && dN > 0) stats.oldEqFresh_newNot++;
  else stats.neitherEqFresh++;
  if (dN > dO) {
    stats.newFurther++;
    const nf = (a: Set<string>, b: Set<string>) => [...a].filter((x) => !b.has(x) && !x.startsWith('f')).join(' || ');
    reports.push(`seed ${seed}: NEW further from FRESH (${dN} vs OLD ${dO})\n    ${trace.join('\n    ')}\n    OLD-only: ${nf(lo, ln)}\n    NEW-only: ${nf(ln, lo)}\n    FRESH(best for NEW) vs NEW, fresh-only: ${nf(lf, ln)} ; new-only: ${nf(ln, lf)}`);
  }
  if (dN < dO) stats.newCloser++;
  if (pN > pO) { stats.newFurtherVertices++; reports.push(`seed ${seed}: NEW's VERTEX SET further from FRESH (${pN} vs OLD ${pO})\n    ${trace.join('\n    ')}`); }
  if (pN < pO) stats.newCloserVertices++;
  const vo = vset(lo), vn = vset(ln);
  const lackN = [...(owned ?? [])].filter((v) => vo.has(v) && !vn.has(v));
  const lackO = [...(owned ?? [])].filter((v) => vn.has(v) && !vo.has(v));
  if (lackN.length > 0) { stats.newLacksOwned++; reports.push(`seed ${seed}: NEW lacks vertices every fresh order and OLD have: ${lackN.join(' ')}\n    ${trace.join('\n    ')}`); }
  if (lackO.length > 0) stats.oldLacksOwned++;
  if (dN !== 0 && dN <= dO && reports.length < 400) reports.push(`seed ${seed}: differ; NEW ≠ FRESH in every order (${dN}; OLD ${dO})\n    ${trace.join('\n    ')}`);
}
console.log(`fuzz N=${N} seed=${SEED} rq2=${RQ2 ? PROXY : 'off'}`, JSON.stringify(stats));
for (const r of reports) console.log(r);
