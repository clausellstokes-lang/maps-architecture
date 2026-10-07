import { corridorUnion, faceRings, kerb, pointLocate, STAGES } from '@plat/kernel';
import { spineWidthsOf } from '@plat/layout';
import { derive, sideOfRing, GROUND } from './runs.js';
import { widthMap } from './measure.js';
import { hausdorffCm, canonicalRing } from './hausdorff.js';
const seed = Number(process.argv[2] ?? 1);
const d = derive((process.argv[3] ?? 'fusion') as any, seed, { frameHa: 900, walledHa: 30 });
const k = d.model.kernel; const p = k.plat(GROUND);
const infill: any = d.model.data.get('infill');
const widths = spineWidthsOf(widthMap(d));
const spec = (level: 1|2): any => ({ key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 }, stage: STAGES.S8, rederivesFrom: STAGES.S8, workLimit: 1e9 });
const now: any[] = [];
k.tx(spec(1), (o) => { for (const b of infill.blockFaces) { const s = b.seeds[0]; const at: any = pointLocate(p, GROUND, 1, s); const kr: any = kerb(o, at.face, widths); const hold = kr.ok ? kr.value.find((r: any) => sideOfRing(s, r) === 'in') : null; now.push({ b, hold }); } return { ok: true, value: undefined, warnings: [] } as any; });
const ids = d.ins.standIns.map((x) => x.id);
for (const id of ids) { const r = k.tx(spec(2), (o) => corridorUnion(o, { owner: id, level: 1 } as any, widths)); if (!r.ok) console.log('refused', id, r.code); }
const stats = { recVsNow: [0,0], nowVsS9: [0,0], recVsS9: [0,0] } as any;
const worst: any[] = [];
for (const { b, hold } of now) {
  if (b.seeds.length > 1) continue;
  const at: any = pointLocate(p, GROUND, 2, b.seeds[0]); const s9 = at.on === 'face' ? faceRings(p, 2, at.face)[0] : [];
  const a = hold ? hausdorffCm(b.kerb, hold) : Infinity; const c = hold ? hausdorffCm(hold, s9) : Infinity; const e = hausdorffCm(b.kerb, s9);
  stats.recVsNow[a === 0 ? 0 : 1]++; stats.nowVsS9[c === 0 ? 0 : 1]++; stats.recVsS9[e === 0 ? 0 : 1]++;
  if (e > 1) worst.push({ block: b.block, recVsNow: a, nowVsS9: c, recVsS9: e, nRec: canonicalRing(b.kerb).length, nNow: hold ? canonicalRing(hold).length : -1, nS9: canonicalRing(s9).length });
}
console.log(JSON.stringify(stats)); console.log(JSON.stringify(worst, null, 0));
const lanes: any[] = (d.model.data.get('lanes') as any[]);
const { wayLines } = await import('@plat/layout');
const ends: any[] = []; for (const l of wayLines(k, lanes.map((w) => w.id), GROUND)) for (const r of l.runs) { ends.push({ way: l.way, p: r.points[0] }); ends.push({ way: l.way, p: r.points[r.points.length - 1] }); }
const order = new Map(lanes.map((w, i) => [w.id, i]));
for (const name of ['block:81dr0xz05xteq', 'block:0w11hazddsbyv', 'block:bz9accnftq4f6']) {
  const e = now.find((x) => x.b.block === name); if (!e) continue;
  const rec = canonicalRing(e.b.kerb); const nw = canonicalRing(e.hold);
  const key = (q: any) => `${q.x},${q.y}`; const rs = new Set(rec.map(key));
  const extra = nw.filter((q: any) => !rs.has(key(q)));
  console.log(name, 'extra', extra.map((q: any) => { let best = Infinity, w = ''; for (const x of ends) { const dd = Math.hypot(x.p.x - q.x, x.p.y - q.y); if (dd < best) { best = dd; w = x.way; } } return { q, nearestLaneEndCm: Math.round(best), laneIdx: order.get(w) }; }));
  const ns = new Set(nw.map(key)); console.log(' missing', rec.filter((q: any) => !ns.has(key(q))));
}
