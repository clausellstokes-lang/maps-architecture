// Shared helpers for the review's probes (read-only on the worktree; run with tsx --conditions=plat-source).
const W = '/home/user/maps-scratch/gates-a11s6/plat/packages/kernel';
export const A = await import(`${W}/src/arena/index.ts`);
export const TX = await import(`${W}/src/tx/index.ts`);
export const IC = await import(`${W}/src/insert/insertChain.ts`);
export const S = await import(`${W}/test/insert/step3-5/support.ts`);
export const T = await import(`${W}/test/tx/support.ts`);
export const NUM = await import(`${W}/src/num/index.ts`);

export type P = any;

export function ins(p: P, level: number, pts: [number, number][], entity: string, opts: any = {}, role = 'invisible', cls = 'mandatory', extraRoles: any[] = []): any {
  let placed: number[] = [];
  let warnings: string[] = [];
  const r = TX.tx(p, T.spec(level), (o: any) => {
    const x = IC.insertChain(o, pts.map(([a, b]) => S.pt(a, b)), [{ role, entity }, ...extraRoles], cls, opts);
    if (x.ok) {
      placed = x.value.placed;
      warnings = (x.warnings ?? []).map((w: any) => w.code ?? String(w));
    }
    return x;
  });
  return { ok: r.ok, code: r.ok ? '' : `${r.code} ${r.detail}`, placed, warnings };
}

export function rem(p: P, level: number, ref: any): any {
  const r = TX.tx(p, T.spec(level), (o: any) => TX.removeEdges(o, ref));
  return { ok: r.ok, code: r.ok ? '' : `${r.code} ${r.detail}` };
}

export function plant(p: P, level: number, v: number, role: string, entity: string): any {
  // A row planted INSIDE a committed batch (the arena's own writer, so the batch frame and the undo log see it).
  const r = TX.tx(p, T.spec(level), () => {
    A.addRole(p, v, { role, entity }, level);
    return NUM.ok(null);
  });
  return r.ok;
}

export function live(p: P): number[] {
  const out: number[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (A.isVertexLive(p, v)) out.push(v);
  return out;
}

export function rowText(p: P, kind: 'edge' | 'vertex', el: number): string {
  const R = p.roles;
  return A.rowsOn(p, kind, el).map((r: number) => `${A.roleInfo(R.kind[r]).name}/${A.idOf(p, R.entity[r])}/${R.ordinal[r]}/L${R.level[r]}`).sort().join(';');
}

export function describeV(p: P, v: number): string {
  if (v < 0 || !A.isVertexLive(p, v)) return `v${v}: dead`;
  const f = p.vertices.flags[v];
  const at = A.outgoing(p, v);
  const edges = at.map((h: number) => `L${p.halfEdges.level[h >> 1]}[${rowText(p, 'edge', h)}]`);
  return `(${p.vertices.x[v]}, ${p.vertices.y[v]}) L${p.vertices.level[v]} split=${(f & A.VERTEX_SPLIT) !== 0} pinned=${(f & A.VERTEX_PINNED) !== 0} deg=${at.length} vrows=[${rowText(p, 'vertex', v)}] edges=${edges.join(' | ')}`;
}

export function nearest(p: P, x: number, y: number): number {
  let best = -1;
  let bd = Infinity;
  for (const v of live(p)) {
    const d = (p.vertices.x[v] - x) ** 2 + (p.vertices.y[v] - y) ** 2;
    if (d < bd) {
      bd = d;
      best = v;
    }
  }
  return best;
}

/** The draft's predicate (degree 2) and ruling 2's (exactly two incident pairs carry the chain's own row at n, degree free), on vertex v for chain `own` (entity) at level n. */
export function predicates(p: P, v: number, own: string, n: number): { draft: boolean; ruling2: boolean; why: string } {
  const R = p.roles;
  if (!A.isVertexLive(p, v)) return { draft: false, ruling2: false, why: 'dead' };
  const f = p.vertices.flags[v];
  if ((f & A.VERTEX_SPLIT) === 0) return { draft: false, ruling2: false, why: 'no split flag' };
  if ((f & A.VERTEX_PINNED) !== 0) return { draft: false, ruling2: false, why: 'pinned' };
  const at = A.outgoing(p, v);
  const ownOn = (h: number): boolean => A.rowsOn(p, 'edge', h).some((r: number) => A.idOf(p, R.entity[r]) === own && R.level[r] === n);
  const otherOn = (h: number): boolean => A.rowsOn(p, 'edge', h).some((r: number) => A.idOf(p, R.entity[r]) !== own);
  const carrying = at.filter(ownOn);
  const pairOK = (hs: number[]): boolean => hs.length === 2 && p.halfEdges.level[hs[0] >> 1] === p.halfEdges.level[hs[1] >> 1] && rowText(p, 'edge', hs[0]) === rowText(p, 'edge', hs[1]) && otherOn(hs[0]);
  const draft = at.length === 2 && carrying.length === 2 && pairOK(at);
  const ruling2 = carrying.length === 2 && pairOK(carrying);
  return { draft, ruling2, why: `deg ${at.length}, own-carrying ${carrying.length}` };
}
