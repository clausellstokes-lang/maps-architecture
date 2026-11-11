// Probe 4: Q78's claim "no op returns — committed or refused — with two live records claiming one ring", checked after
// the op of every batch of tx's fuzz families (randomBatch is ONE op per batch, so the check sits in the callback after
// it, before the commit); and how often those families reach the coincident class (split, unpinned, degree 2, identical
// rows of two or more keys) — the class leg 3's oracle needs a writer-path family to see.
const W = '/home/user/maps-scratch/gates-a11s6/plat/packages/kernel';
const A = await import(`${W}/src/arena/index.ts`);
const WK = await import(`${W}/src/arena/walk.ts`);
const TX = await import(`${W}/src/tx/index.ts`);
const FG = await import(`${W}/test/tx/fuzzgen.ts`);
const T = await import(`${W}/test/tx/support.ts`);
const S = await import(`${W}/test/insert/step3-5/support.ts`);
const log = (...a: unknown[]) => console.log(...a);

function claimed(p: any): string[] {
  const out: string[] = [];
  for (const l of [0, 1, 2, 3, 4]) {
    const owner = new Map<number, number>();
    for (let f = 0; f < p.slots.face[l].top; f++) {
      if (!A.isFaceLive(p, l, f)) continue;
      for (const ring of WK.faceWalk(p, l, f)) for (const h of ring) {
        const o = owner.get(h);
        if (o !== undefined && o !== f) out.push(`L${l} half-edge ${h} on records ${o} and ${f}`);
        owner.set(h, f);
      }
    }
  }
  return out;
}
function coincident(p: any): number {
  const R = p.roles;
  const text = (h: number) => A.rowsOn(p, 'edge', h).map((r: number) => `${R.kind[r]}/${R.entity[r]}/${R.ordinal[r]}/${R.level[r]}`).sort().join(';');
  let n = 0;
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!A.isVertexLive(p, v)) continue;
    const f = p.vertices.flags[v];
    if ((f & A.VERTEX_SPLIT) === 0 || (f & A.VERTEX_PINNED) !== 0) continue;
    const at = A.outgoing(p, v);
    if (at.length !== 2 || p.halfEdges.level[at[0] >> 1] !== p.halfEdges.level[at[1] >> 1] || text(at[0]) !== text(at[1])) continue;
    const keys = new Set(A.rowsOn(p, 'edge', at[0]).map((r: number) => `${R.kind[r]}/${R.entity[r]}/${R.ordinal[r]}`));
    if (keys.size > 1) n++;
  }
  return n;
}
for (const [name, mix] of [['DEFAULT_MIX', FG.DEFAULT_MIX], ['ALONG_MIX', FG.ALONG_MIX]] as const) {
  let ops = 0, refused = 0, bad = 0, maxCoin = 0, commitsWithCoin = 0;
  const first: string[] = [];
  for (let seed = 1; seed <= 6; seed++) {
    const p = S.framed(4000);
    const live = { ways: [], kerbs: [], next: 0 };
    const r = FG.rng(seed * 7919);
    for (let i = 0; i < 120; i++) {
      const snap = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
      const b = FG.randomBatch(p, live, r, mix);
      const res = TX.tx(p, T.spec(b.level, { rederivesFrom: 0 }), (o: any) => {
        const x = b.fn(o);
        ops++;
        if (!x.ok) refused++;
        const c = claimed(p);
        if (c.length > 0) { bad++; if (first.length < 3) first.push(`seed ${seed} batch ${i} ${b.kind} ok=${x.ok}: ${c[0]}`); }
        return x;
      });
      if (!res.ok) { live.ways = snap.ways; live.kerbs = snap.kerbs; }
      else { const c = coincident(p); if (c > 0) commitsWithCoin++; maxCoin = Math.max(maxCoin, c); }
    }
  }
  log(`${name}: ops ${ops}, refused ${refused}, ops returning with a ring claimed twice ${bad}; commits holding coincident-class vertices ${commitsWithCoin}, max per arena ${maxCoin}`);
  for (const f of first) log('  ', f);
}
