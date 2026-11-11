// Probe 5 (Q95): the B-1 repro (oracleRun(44_509_828, 12, DEFAULT_MIX)) on today's code — at every commit, the level ≥ 1
// records live before and after whose parent (read by the parent's face key) changed, and whether the record lists
// each (changed or created). Also: does the record ever carry a duplicate (tx.ts dirtyFaces dedupes — the DUP mutant).
const W = '/home/user/maps-scratch/gates-a11s6/plat/packages/kernel';
const A = await import(`${W}/src/arena/index.ts`);
const WK = await import(`${W}/src/arena/walk.ts`);
const TX = await import(`${W}/src/tx/index.ts`);
const DG = await import(`${W}/src/digest/index.ts`);
const FG = await import(`${W}/test/tx/fuzzgen.ts`);
const T = await import(`${W}/test/tx/support.ts`);
const log = (...a: unknown[]) => console.log(...a);
const pk = (p: any, l: number, f: number) => { const [a, b] = WK.faceKey(p, l, f); return `${p.vertices.x[a]},${p.vertices.y[a]}|${p.vertices.x[b]},${p.vertices.y[b]}`; };
function parents(p: any): Map<string, string> {
  const m = new Map<string, string>();
  for (let l = 1; l <= 4; l++) for (let f = 0; f < p.slots.face[l].top; f++) {
    if (!A.isFaceLive(p, l, f)) continue;
    const q = p.faces[l].parent[f];
    m.set(`${l}:${f}`, q < 0 ? '-' : pk(p, l - 1, q));
  }
  return m;
}
const tally = new Map<string, number>();
const MIXES = { D: FG.DEFAULT_MIX, L: FG.ALONG_MIX };
const RUNS: [number, number, 'D' | 'L'][] = [[44_509_828, 12, 'D'], ...Array.from({ length: 16 }, (_, i) => [(i + 1) * 7919, 30, 'D'] as [number, number, 'D']), ...Array.from({ length: 12 }, (_, i) => [(i + 1) * 15_485_863, 16, 'L'] as [number, number, 'L'])];
const VERBOSE = process.argv.includes('--verbose');
for (const [seed, steps, mk] of RUNS) {
  const r = FG.rng(seed);
  const p = T.framed();
  DG.attachLevelDigests(p);
  const live = { ways: [], kerbs: [], next: 0 };
  for (let step = 0; step < steps; step++) {
    const before = parents(p);
    const snap = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
    const b = FG.randomBatch(p, live, r, MIXES[mk]);
    const res = TX.tx(p, T.spec(b.level, { rederivesFrom: 0 }), b.fn, { onCommit: DG.updateLevelDigests });
    if (!res.ok) { live.ways = snap.ways; live.kerbs = snap.kerbs; continue; }
    const rec = res.value.record;
    if (rec === null) continue;
    const after = parents(p);
    const missing: string[] = [];
    for (const [k, was] of before) {
      const now = after.get(k);
      if (now === undefined || now === was) continue;
      const [l, f] = k.split(':').map(Number);
      const d = rec.faces.find((x: any) => x.level === l);
      const listed = d !== undefined && (d.changed.includes(f) || d.created.includes(f));
      if (!listed) missing.push(`L${l} record ${f}: parent ${was} → ${now}`);
    }
    const dups = rec.faces.some((d: any) => new Set([...d.created, ...d.changed]).size !== d.created.length + d.changed.length);
    if (missing.length > 0) tally.set(b.kind, (tally.get(b.kind) ?? 0) + 1);
    if (VERBOSE || (seed === 44_509_828)) log(`seed ${seed} step ${step} ${b.kind} L${b.level}: re-parented and unlisted ${missing.length}${missing.length ? ' — ' + missing.slice(0, 3).join('; ') : ''}; duplicate in a list: ${dups}`);
  }
}
log('batches with an unlisted re-parent, by kind (all runs):', JSON.stringify([...tally]));
