import { createRegistry, registerBase, run, FLAT_BLUEPRINT, baseArena } from '@plat/layout';
const seed = Number(process.argv[2] ?? 1);
const reg = createRegistry();
registerBase(reg);
const prod = reg.products.get('base')!;
const times: Record<string, number> = {};
prod.stages.forEach((s, i) => {
  const orig = s.run;
  prod.stages[i] = { ...s, run: (inp: any, ctx: any) => { const t = performance.now(); const r = orig.call(s, inp, ctx); times[String(s.id)] = (performance.now() - t) / 1000; return r; } } as any;
});
const t0 = performance.now();
const { model, report } = run(reg, { ...FLAT_BLUEPRINT, seed } as any, { kind: 'all' }, { arenas: () => [baseArena(FLAT_BLUEPRINT)] });
console.log(JSON.stringify({ seed, secs: (performance.now() - t0) / 1000, times, order: model.order, bugs: report.bugs }));
