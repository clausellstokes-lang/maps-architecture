// TEMPORARY timing probe (M0-b-04 build seat); deleted before landing.
import fc from 'fast-check';
import { attachIndex, createKernel, createPlat, faceRings, isFaceLive, seedKey, STAGES, area2, type Cm, type Frame, type KernelTx, type LatticePoint, type PlatKey, type PolygonCm } from '@plat/kernel';
import { granularityBands, runS8, spineWidthsOf, type S8District } from '@plat/layout';
import { mint, type LiveEntry } from '@plat/model';
import { rungProfile, loadWorkLimits, type WorkLimitsTable } from '@plat/tables';
const base = loadWorkLimits();
const wl1: WorkLimitsTable = { ...base, has: (c) => base.has(c), law: (c) => (c === 'cut.recursionDepth' ? { counter: c, unit: 'fixed', perUnit: 0, floor: 1 } : base.law(c)) } as WorkLimitsTable;
const DEPTH1 = process.env.DEPTH1 === '1';
import { arb, seedFamily, type FuzzFaceKind } from '@plat/testkit';

const GROUND: PlatKey = { layer: 'ground', part: 0 };
const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as never }, stage: stage as never, rederivesFrom: stage as never, workLimit: 100_000_000 };
}
function one(polygon: PolygonCm, seed: number) {
  const side = 600_000;
  const frame: Frame = { widthCm: side as Cm, heightCm: side as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<string, number>();
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  k.tx(spec(0, STAGES.S1), (o) => k.geom.insertChain(o, [P(-side, -side), P(side, -side), P(side, side), P(-side, side)], [{ role: 'margin', entity: 'terrain:t' }], 'mandatory', { closed: true }));
  const r1 = k.tx(spec(1, STAGES.S5), (o) => {
    const a = k.geom.insertChain(o, polygon[0].map((q) => P(q.x, q.y)), [{ role: 'district_bound', entity: 'district_bound:f' }], 'mandatory', { closed: true });
    if (!a.ok) return { ok: false as const, code: a.code, detail: a.detail };
    for (let i = 1; i < polygon.length; i++) {
      const h = k.geom.insertChain(o, polygon[i].map((q) => P(q.x, q.y)), [{ role: 'reserved', entity: `reservation:h${i}` }], 'mandatory', { closed: true });
      if (!h.ok) return { ok: false as const, code: h.code, detail: h.detail };
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r1.ok) throw new Error(r1.code);
  let face = -1;
  let best = -1;
  const holes: number[] = [];
  for (let f = 0; f < plat.slots.face[1].top; f++) {
    if (!isFaceLive(plat, 1, f)) continue;
    const rr = faceRings(plat, 1, f);
    const a = Math.abs(area2(rr[0]));
    if (a >= 2 * side * side) continue;
    if (rr.length === polygon.length && a > best) { best = a; face = f; }
  }
  for (let f = 0; f < plat.slots.face[1].top; f++) {
    if (!isFaceLive(plat, 1, f) || f === face) continue;
    const a = Math.abs(area2(faceRings(plat, 1, f)[0]));
    if (a < 2 * side * side) holes.push(f);
  }
  const sk = seedKey(seed);
  const live: LiveEntry[] = [];
  const m = mint([{ kind: 'district', key: { arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: 0, reroll: 0 } }], live, [], sk)[0];
  const district = { id: m.identity.id, kind: 'craft', quarter: 'quarter:q', faces: { owner: m.identity.id, level: 1 }, seams: [], growthStage: 1, fabric: 'bent-cut', fabricParams: {}, lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } } } as never;
  live.push({ id: m.identity.id, lineage: m.identity.lineage });
  k.tx(spec(1, STAGES.S6), (o) => {
    for (let i = 0; i < holes.length; i++) { const r = k.geom.setOwner(o, [holes[i]], `reservation:h${i + 1}`); if (!r.ok) return r; }
    return k.geom.setOwner(o, [face], m.identity.id);
  });
  const sd: S8District = { district, lineage: [m.identity.lineage[0], m.identity.lineage[1]], prosperity: 0.3, density: 0.5, bands: granularityBands(0.3, rungProfile('CITY')) };
  return runS8({ kernel: k, key: GROUND, seedKey: sk, rung: 'CITY', districts: [sd], ways: [], seams: [], widths, live, ...(DEPTH1 ? { tables: { workLimits: wl1 }, deepFactor: 1e9 } : {}) }, { report: undefined } as never);
}
const kinds = (process.argv[2] ?? 'concave,holed').split(',') as FuzzFaceKind[];
const n = Number(process.argv[3] ?? 10);
const size = process.argv[4] ? (process.argv[4].split(',').map(Number) as [number, number]) : undefined;
for (const kind of kinds) {
  const faces = fc.sample(arb.faceSet(kind, size ? { sizeCm: size } : {}), { seed: seedFamily(`probe/${kind}`, 0), numRuns: n });
  let t = performance.now();
  let calls = 0, maxCalls = 0, faceN = 0, blocks = 0, lanes = 0, refused = 0;
  const rungs: Record<string, number> = {};
  for (let i = 0; i < faces.length; i++) {
    const t1 = performance.now();
    const r = one(faces[i].polygon, i);
    if (!r.ok) { refused++; continue; }
    if (r.value.infill.report.refused.length > 0) refused++;
    const d = r.value.infill.report.districts[0];
    if (!d) continue;
    for (const f of d.faces) { calls += f.kernelCalls; maxCalls = Math.max(maxCalls, f.kernelCalls); faceN++; }
    for (const ru of d.rungs) if (ru.outcome === 'cut' || ru.outcome === 'slit') rungs[ru.rung + ru.attempt] = (rungs[ru.rung + ru.attempt] ?? 0) + 1;
    blocks += d.blocks; lanes += d.lanes;
    if (i < 3) console.log(kind, i, faces[i].radiusCm, (performance.now() - t1).toFixed(0), 'ms', d.blocks, 'blocks');
  }
  console.log(kind, n, 'faces', ((performance.now() - t) / n).toFixed(1), 'ms/face', { faceN, calls, maxCalls, blocks, lanes, refused, rungs });
}
