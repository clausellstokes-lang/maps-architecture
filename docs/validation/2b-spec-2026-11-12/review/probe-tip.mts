// Review probe (scratch mirror: the S20 branch's kerb.ts / kerbExact.ts over the design head's kernel, readKerb given a
// probe-only provider hook). Question: under P, does S9's commit of X (corridorUnion at L2) stay within S8S9_BOUND_CM of
// X on a block with an ACUTE corner, or does the door fold X's thin tip — the plan-to-commit distance beyond the bound?
// For each angle: X (exactRegionOfFace), the construction's read (kerb() as served today), S9's commit under the
// construction and under P (the provider serves X as round 2B's line 1 specifies), the committed L2 face holding the
// block's seed (the pole of the component, read as measure.ts's s8s9 reads it), and the Hausdorff distances.
// Usage: tsx probe-tip.mts <kmirror>
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const dir = process.argv[2];
const im = async <T>(rel: string): Promise<T> => (await import(pathToFileURL(join(dir, rel)).href)) as T;
type P = { x: number; y: number };
type R<T> = { ok: true; value: T; warnings: { code: string }[] } | { ok: false; code: string; detail: string };
const kerbM = await im<any>('src/arr/kerb.ts');
const exactM = await im<any>('src/arr/kerbExact.ts');
const cuM = await im<any>('src/arr/corridorUnion.ts');
const txM = await im<any>('src/tx/index.ts');
const stateM = await im<any>('src/tx/state.ts');
const arenaM = await im<any>('src/arena/index.ts');
const queryM = await im<any>('src/index/query.ts');
const boundaryM = await im<any>('src/geom/boundary.ts');
const s35 = await im<any>('test/insert/step3-5/support.ts');

const S8 = 8;
const S9 = 9;
const spec = (level: number, stage = S8): unknown => ({ key: { layer: 'ground', part: 0 }, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage }, stage, rederivesFrom: stage, workLimit: 100_000_000 });
const pt = (x: number, y: number): P => ({ x, y });
function commit<T>(p: unknown, level: number, fn: (o: unknown) => R<T>, stage = S8): R<unknown> {
  return txM.tx(p, spec(level, stage), fn);
}
const ATTRACT = 26;
const BOUND = 2 * Math.SQRT2 * ATTRACT;

const segDist = (q: P, a: P, b: P): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.y - a.y) * dy) / l2));
  return Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy);
};
const toRings = (rs: P[][], q: P): number => {
  let d = Infinity;
  for (const r of rs) for (let i = 0; i < r.length; i += 1) d = Math.min(d, segDist(q, r[i], r[(i + 1) % r.length]));
  return d;
};
const samples = (rs: P[][]): P[] => {
  const out: P[] = [];
  for (const r of rs) for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 2));
    for (let k = 0; k < n; k += 1) out.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n });
  }
  return out;
};
const haus = (A: P[][], B: P[][]): number => (A.length === 0 || B.length === 0 ? Infinity : Math.max(...samples(A).map((q) => toRings(B, q)), ...samples(B).map((q) => toRings(A, q))));
const area2 = (r: P[]): number => {
  let a = 0;
  for (let i = 0; i < r.length; i += 1) a += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
  return a;
};
const inside = (r: P[], q: P): boolean => {
  let w = 0;
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    const s = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
    if (a.y <= q.y) { if (b.y > q.y && s > 0) w += 1; } else if (b.y <= q.y && s < 0) w -= 1;
  }
  return w !== 0;
};
const txt = (rs: P[][]): string => rs.map((r) => r.map((q) => `${q.x},${q.y}`).join(' ')).join(' | ');

// P's served read (round 2B line 1 as specified): readFace, the key content, X, the spine map, splitsOn over X.
function servedX(o: unknown, face: number, widths: unknown, cache: unknown, vc: boolean): R<unknown> {
  const p = stateM.openTx(o).plat;
  const f = kerbM.readFace(p, face, widths, cache ?? new Map(), vc);
  const c = exactM.exactKeyContentOfRead(f, vc);
  if (!c.ok) return c;
  const X = exactM.exactRegionOfKey(c.value);
  const spines = new Map(f.spines);
  for (const s of f.through) if (c.value.reaching.includes(s.key)) spines.set(s.key, s);
  const sp = kerbM.splitsOn(p, f.edges, spines, X.map((r: P[]) => r.slice()));
  if (!sp.ok) return sp;
  return { ok: true, value: { face, rings: f.rings, edges: f.edges, spines, kerb: sp.value.rings, splits: sp.value.splits, warnings: [], region: X }, warnings: [] };
}

function run(label: string, way2End: P, hw: number, extra: [string, P[]][] = [], hint?: P): void {
  const p = s35.framed(4000);
  const widths = (c: { role: string; entity: string }): unknown => (c.role === 'way' ? { halfWidthCm: hw } : null);
  const ins = (entity: string, pts: P[]): void => {
    const r = commit(p, 1, (o) => kerbM && (txM as any) && (globalThis as any).__ins(o, pts, entity));
    if (!r.ok) throw new Error(`${label}: ${entity} refused ${r.code} ${r.detail}`);
  };
  (globalThis as any).__ins = (o: unknown, pts: P[], entity: string) => s35 && (insertChainM as any).insertChain(o, pts, [{ role: 'way', entity }], 'mandatory');
  ins('way:1', [pt(0, 1000), pt(4000, 1000)]);
  ins('way:2', [pt(500, 1000), way2End]);
  for (const [e, pts] of extra) ins(e, pts);
  // the wedge face between way:1 and way:2 (a point just inside the acute angle, far from J)
  const seedHint = hint ?? pt(3800, Math.round(1000 + ((way2End.y - 1000) * 3300) / 3500 / 2));
  const F = (facesAtM as any).faceAt(p, 1, seedHint.x, seedHint.y);
  if (F < 0) throw new Error(`${label}: no face at the hint`);
  const own = commit(p, 1, (o) => txM.setOwner(o, [F], 'district:1'));
  if (!own.ok) throw new Error(`${label}: owner refused`);
  const Xr = exactM.exactRegionOfFace(p, F, widths);
  const X: P[][] = Xr.ok ? Xr.value.region : [];
  let C: P[][] = [];
  let cw: string[] = [];
  commit(p, 1, (o) => {
    const r = kerbM.kerb(o, F, widths);
    if (r.ok) {
      C = r.value;
      cw = [...new Set(r.warnings.map((w: { code: string }) => w.code))] as string[];
    }
    return { ok: true, value: null, warnings: [] };
  });
  const main = (rs: P[][]): P[] => rs.filter((r) => area2(r) > 0).sort((a, b) => area2(b) - area2(a))[0] ?? [];
  const Xm = main(X);
  // the block's seed: a point deep in X's main component (its centroid of vertices, nudged inside if needed)
  const seed = Xm.reduce((s, q) => ({ x: s.x + q.x / Xm.length, y: s.y + q.y / Xm.length }), { x: 0, y: 0 });
  const seedL = pt(Math.round(seed.x), Math.round(seed.y));
  const commitWith = (serve: boolean): { rings: P[][]; code: string } => {
    const q = s35.framed(4000);
    // rebuild the same arena (deterministic): two ways and the owner
    (globalThis as any).__p = q;
    const r1 = commit(q, 1, (o) => (insertChainM as any).insertChain(o, [pt(0, 1000), pt(4000, 1000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const r2 = commit(q, 1, (o) => (insertChainM as any).insertChain(o, [pt(500, 1000), way2End], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    if (!r1.ok || !r2.ok) throw new Error('rebuild refused');
    for (const [e, pts] of extra) { const r3 = commit(q, 1, (o) => (insertChainM as any).insertChain(o, pts, [{ role: 'way', entity: e }], 'mandatory')); if (!r3.ok) throw new Error('rebuild refused (extra)'); }
    const G = (facesAtM as any).faceAt(q, 1, seedHint.x, seedHint.y);
    commit(q, 1, (o) => txM.setOwner(o, [G], 'district:1'));
    if (serve) (globalThis as any).__servedRead = servedX;
    let code = 'ok';
    try {
      const r = commit(q, 2, (o) => cuM.corridorUnion(o, [G], widths), S9);
      if (!r.ok) code = `${r.code} ${r.detail.slice(0, 120)}`;
    } finally {
      delete (globalThis as any).__servedRead;
    }
    const probeAt = (globalThis as any).__probeAt as P | undefined;
    if (probeAt !== undefined) {
      const a2 = queryM.pointLocate(q, { layer: 'ground', part: 0 }, 2, probeAt);
      const rr: P[][] = a2.on === 'face' ? boundaryM.faceRings(q, a2.level, a2.face) : [];
      const kerbRole = arenaM.roleIdOf ? null : null;
      console.log(`   [${serve ? 'P' : 'construction'}] the L2 face at (${probeAt.x}, ${probeAt.y}): ${a2.on} level ${a2.level ?? '-'} ${txt(rr).slice(0, 300)}`);
    }
    const at = queryM.pointLocate(q, { layer: 'ground', part: 0 }, 2, seedL);
    const rings: P[][] = at.on === 'face' ? boundaryM.faceRings(q, at.level, at.face) : [];
    return { rings, code: at.on === 'face' ? code : `${code}; seed on an L2 ${at.on}` };
  };
  (globalThis as any).__probeAt = label.startsWith('F') ? pt(2500, 1165) : undefined;
  const s9c = commitWith(false);
  const s9x = commitWith(true);
  const Cm = main(C);
  console.log(`${label}: hw ${hw} cm, way:2 to (${way2End.x}, ${way2End.y})`);
  console.log(`   X main: ${Xm.length} pts; the construction's main: ${Cm.length} pts (warnings ${cw.join(',')}); X vs construction ${haus([Xm], [Cm]).toFixed(2)} cm`);
  console.log(`   S9 under the construction: ${s9c.code}; committed vs construction ${haus([Cm], s9c.rings).toFixed(2)} cm; committed vs X ${haus([Xm], s9c.rings).toFixed(2)} cm`);
  console.log(`   S9 under P (X served): ${s9x.code}; committed vs X ${haus([Xm], s9x.rings).toFixed(2)} cm (bound ${BOUND.toFixed(2)}) => ${haus([Xm], s9x.rings) > BOUND ? 'BEYOND' : 'within'}`);
  console.log(`   X main ring: ${txt([Xm])}`);
  console.log(`   X all rings: ${txt(X).slice(0, 600)}`);
  console.log(`   construction all rings: ${txt(C).slice(0, 600)}`);
  console.log(`   S9 under P, face of the seed (${seedL.x}, ${seedL.y}): ${txt(s9x.rings)}`);
}

const insertChainM = await im<any>('src/insert/index.ts');
const facesAtM = { faceAt: (p: unknown, level: number, x: number, y: number): number => {
  for (const f of s35.facesAt(p, level)) {
    const rings = arenaM.faceWalk(p, level, f);
    if (!s35.strictlyInsideRing(p, rings[0], x, y)) continue;
    if (rings.slice(1).some((r: unknown) => s35.strictlyInsideRing(p, r, x, y))) continue;
    return f;
  }
  return -1;
} };

for (const [label, end, hw, extra, hint] of [
  ['A (≈ 9.7°)', pt(4000, 1600), 150, [], undefined],
  ['B (≈ 16.0°)', pt(4000, 2000), 150, [], undefined],
  ['C (≈ 29.7°)', pt(4000, 3000), 150, [], undefined],
  ['D (≈ 6.5°)', pt(4000, 1400), 100, [], undefined],
  // E: a third way touching the wedge face at one vertex only (a vertex-only contact: it leaves way:2's far end outward)
  ['E (9.7°, a vertex-only contact)', pt(3000, 1429), 150, [['way:3', [pt(3000, 1429), pt(3000, 3900)]]], pt(2500, 1150 + 60)],
  // F: a lane parallel to way:1 at 330 cm (hw 150 each): a 30 cm kerb strip between the two bands (thinner than 2·attractCm)
  ['F (a 30 cm strip between two bands)', pt(4000, 3000), 150, [['way:3', [pt(1500, 1330), pt(3900, 1330)]]], pt(3700, 1165)],
] as [string, P, number, [string, P[]][], P | undefined][]) {
  try {
    run(label, end, hw, extra, hint);
  } catch (e) {
    console.log(`${label}: THREW ${String(e instanceof Error ? e.message : e).slice(0, 300)}`);
  }
}
