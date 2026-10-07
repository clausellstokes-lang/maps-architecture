import { writeFileSync } from 'node:fs';
import { runBase, FLAT_BLUEPRINT, wayLines } from '@plat/layout';
const seed = Number(process.argv[2] ?? 1);
const { model, report } = runBase(FLAT_BLUEPRINT, seed as never, { kind: 'all' });
const st: any = model.data.get('s5.growth');
const infill: any = model.data.get('infill');
const s5: any = model.data.get('s5');
const out = {
  stagesReport: report.stages.map((s) => ({ name: s.name, work: s.work, warnings: s.warnings, ladder: s.ladderUses.length, inv: s.invariants })),
  kernel: report.kernel,
  growthStages: st.stages.map((g: any) => ({ k: g.k, regime: g.regime, walled: g.walled, gates: g.gates.length, gateIds: g.gates.map((x: any) => x.id), wall: g.wall?.length ?? null, folded: g.foldedInto, count: g.count })),
  gatesKey: (model.data.get('gates') as any[]).map((g) => ({ id: g.id, kind: g.kind, keys: Object.keys(g) })),
  gate0: (model.data.get('gates') as any[])[0],
  s5growth: s5.growth.map((g: any) => ({ k: g.k, keys: Object.keys(g), streets: g.streets.length, street0: { keys: Object.keys(g.streets[0] ?? {}) } })),
  s5cap: s5.capacity.map((c: any) => ({ k: c.k, keys: Object.keys(c), rungs: c.rungs })),
  s8: { lanes: infill ? (model.data.get('lanes') as any[]).length : 0, refused: infill.report.refused, d0: Object.fromEntries(Object.entries(infill.report.districts[0]).filter(([k]) => !['faces','stops','rungs','laneLengths'].includes(k))), rungs0: infill.report.districts[0].rungs.slice(0, 3), stop0: infill.report.districts[0].stops[0], blockFaces: infill.blockFaces.length, multi: infill.blockFaces.filter((b: any) => b.seeds.length > 1).length, hows: infill.blockFaces.reduce((m: any, b: any) => (m[b.how] = (m[b.how] ?? 0) + 1, m), {}) },
  lane0: (model.data.get('lanes') as any[])[0],
  block0: (model.data.get('blocks') as any[])[0],
  district0: (model.data.get('districts') as any[])[0],
  fieldsKeys: Object.keys(model.data.get('fields') as any),
  prosp: Object.keys((model.data.get('fields') as any).prosperity), bands: (model.data.get('fields') as any).prosperity.bands,
};
writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
