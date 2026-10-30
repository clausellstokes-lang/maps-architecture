// Q133 substitution probe (read-only diagnosis; NOT a fix — nothing under plat/ changes): derives ONE seed's integrated
// run through the fusion harness's `derive` exactly as derive-one.mts does; when S6 refuses in `settlementPerimeter`,
// the planted wrapper then asks one question — is the perimeter S6's only obstacle? — by building S6's input as the base
// does (`baseS6Input`, pipeline/base.ts:629), taking the perimeter from `settlementPerimeterByBuffer` (perimeter.ts:300,
// the reference form M0-e-04's test holds equal; it runs no sum check) and running S6's own batch (`s6Batch`,
// stage.ts:249) through the kernel's tx. It records the batch's outcome, then hands the runner the ORIGINAL refusal, so
// the runner rolls the stage back whole (runner.ts:369–373) and the derivation goes on exactly as before.
// usage (from <plat>): corepack pnpm exec tsx --conditions=plat-source <scratch>/q133/substitute-probe.mts <seed> [--plat <plat root>]
import { pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';

const argv = process.argv.slice(2);
const pi = argv.indexOf('--plat');
const plat = resolve(pi >= 0 ? argv[pi + 1] : process.cwd());
const seed = Number(argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1] === '--plat'))[0]);
const OUT = '/tmp/claude-0/-home-user-maps-architecture/d499ae8b-5088-523d-96b3-13eb55179f60/scratchpad/q133/out';
mkdirSync(OUT, { recursive: true });
const fusion = await import(pathToFileURL(join(plat, 'bench/src/fusion/index.ts')).href);
const K = await import(pathToFileURL(join(plat, 'packages/kernel/src/index.ts')).href);
const L = await import(pathToFileURL(join(plat, 'packages/layout/src/index.ts')).href);
const { STAGES } = K;
const { baseS6Input, s6Batch, settlementPerimeterByBuffer, isSumRing, simpleCcw, mergeCollinear, OVERLAY_TOLERANCE_CM } = L;
let probe: Record<string, unknown> = { seed, reached: false };
const plant = (registry: any) => {
  const product = registry.products.get('base');
  const i6 = product.stages.findIndex((s: any) => s.id === STAGES.S6);
  const s = product.stages[i6];
  const orig = s.run;
  product.stages[i6] = {
    ...s,
    run(input: any, ctx: any) {
      const r: any = orig.call(s, input, ctx);
      if (r.ok || input === null || !String(r.detail).startsWith('settlementPerimeter')) return r;
      probe = { seed, reached: true, original: { code: r.code, detail: r.detail } };
      const k = ctx.kernel;
      const s6in = baseS6Input(input, k, ctx);
      if (!s6in.ok) {
        probe.substitute = { stage: 'baseS6Input', code: s6in.code, detail: s6in.detail };
        return r;
      }
      const t0 = performance.now();
      const per = settlementPerimeterByBuffer(s6in.value.boundary, k, { frame: s6in.value.frame });
      probe.bufferMs = Math.round(performance.now() - t0);
      if (!per.ok) {
        probe.substitute = { stage: 'settlementPerimeterByBuffer', code: per.code, detail: per.detail };
        return r;
      }
      probe.bufferRing = { points: per.value.length, simpleCcw: simpleCcw(per.value), isSumRing104: isSumRing(mergeCollinear(s6in.value.boundary), per.value, 5000, OVERLAY_TOLERANCE_CM) };
      const key = s6in.value.key;
      const b = s6Batch(k.plat(key), s6in.value, per.value);
      const t1 = performance.now();
      const tx = k.tx(b.spec, b.fn);
      probe.batchMs = Math.round(performance.now() - t1);
      probe.substitute = tx.ok
        ? { stage: 'S6 batch (s6Batch through kernel.tx)', ok: true, districts: tx.value.value.districts.length, landHa: tx.value.value.report.landHa, seams: tx.value.value.seams.length, warnings: tx.warnings }
        : { stage: 'S6 batch (s6Batch through kernel.tx)', ok: false, code: tx.code, detail: tx.detail };
      return r; // the original refusal: the runner rolls the stage (and this probe's commit) back whole
    },
  };
};
const d = fusion.derive('integrated', seed, { plant });
probe.bugs = d.report.bugs.map((x: any) => `${x.stage}:${x.cls}`);
probe.refusalStillReported = d.model.refusals.get('S6')?.detail ?? null;
writeFileSync(join(OUT, `substitute-${String(seed).padStart(4, '0')}.json`), JSON.stringify(probe, null, 2));
console.log(JSON.stringify(probe));
