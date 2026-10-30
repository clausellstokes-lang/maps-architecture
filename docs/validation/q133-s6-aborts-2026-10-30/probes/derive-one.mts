// Q133 driver (read-only diagnosis; writes only under the scratch folder): derives ONE seed of the flat CITY fixture in
// one run kind through the fusion harness's own `derive` (plat/bench/src/fusion/runs.ts — the same entry the old
// driver/chunk.mts reached through tasksOf/runTasks/runTask), and prints what the SeedRecord drops: every bug entry in
// full (cls, entity, key, stage), the runner's refusal per stage WITH its detail (model.refusals: the bug entry keeps
// the code only), the S6 stage's report entry, the stage stamps, the S5 / final stage roots (compared with the chunk
// record of the 1 000-seed run when a chunk holds the seed), and S6's input (S5's last boundary, the frame, the stage
// outlines, the walls, the ways) to a JSON file for offline reading. The S6 capture is a pure read of the stage input
// taken BEFORE the stage runs; the stage runs unchanged.
//
// usage (from <plat>, so tsx and the plat-source condition resolve as the bench's own scripts do):
//   corepack pnpm exec tsx --conditions=plat-source <scratch>/q133/derive-one.mts <seed> [integrated|fusion]
//     [--plat <plat root>] [--out <dir>] [--chunks <dir>] [--through-s6] [--tag <label>]
import { pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';

const argv = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = argv.indexOf(name);
  return i < 0 ? undefined : argv[i + 1];
};
const VALUED = new Set(['--plat', '--out', '--chunks', '--tag']);
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && VALUED.has(argv[i - 1])));
const seed = Number(positional[0]);
const kind = (positional[1] ?? 'integrated') as 'integrated' | 'fusion';
if (!Number.isInteger(seed) || seed < 1 || (kind !== 'integrated' && kind !== 'fusion')) throw new Error('usage: derive-one.mts <seed> [integrated|fusion] [--plat dir] [--out dir] [--chunks dir] [--through-s6] [--tag label]');
const SCRATCH = '/tmp/claude-0/-home-user-maps-architecture/d499ae8b-5088-523d-96b3-13eb55179f60/scratchpad/q133';
const plat = resolve(flag('--plat') ?? process.cwd());
const out = resolve(flag('--out') ?? join(SCRATCH, 'out'));
const chunks = resolve(flag('--chunks') ?? join(SCRATCH, 'chunks'));
const throughS6 = argv.includes('--through-s6');
let head = '?';
try {
  head = execFileSync('git', ['-C', plat, 'rev-parse', '--short=8', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
  /* not a git tree */
}
const tag = flag('--tag') ?? head;
mkdirSync(out, { recursive: true });

const fusion = await import(pathToFileURL(join(plat, 'bench/src/fusion/index.ts')).href);
const kernelMod = await import(pathToFileURL(join(plat, 'packages/kernel/src/index.ts')).href);
const { derive } = fusion;
const { STAGES } = kernelMod;

function hex(h: Iterable<number> | undefined): string {
  if (h === undefined) return '';
  return [...h].map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
}
const pts = (r: readonly { x: number; y: number }[] | null | undefined) => (r ?? []).map((q) => [q.x, q.y]);

// S6's input as the base composes it (base.ts growthOutlines / baseS6Input), read before the stage runs.
let s6Capture: Record<string, unknown> | null = null;
let s6Outcome: Record<string, unknown> | null = null;
const plant = (registry: { products: Map<string, { stages: { id: number; run: (i: unknown, c: unknown) => unknown }[] }> }) => {
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('no base product');
  if (throughS6) {
    const i8 = product.stages.findIndex((s) => s.id === STAGES.S8);
    if (i8 >= 0) product.stages.splice(i8, 1);
  }
  const i6 = product.stages.findIndex((s) => s.id === STAGES.S6);
  if (i6 < 0) return;
  const s = product.stages[i6];
  const orig = s.run;
  product.stages[i6] = {
    ...s,
    run(input: any, ctx: any) {
      if (input !== null && input !== undefined) {
        const st = input.state;
        const last = st.stages[st.lastWithLand - 1]?.boundary ?? null;
        s6Capture = {
          seed,
          kind,
          tree: tag,
          lastWithLand: st.lastWithLand,
          stages: st.stages.map((g: any) => ({ k: g.k, walled: g.walled, folded: g.boundary === null, outline: g.boundary === null ? null : pts(g.boundary.set.outline), wall: g.wall === null ? null : pts(g.wall) })),
          boundary: last === null ? null : pts(last.set.outline),
          frame: pts(input.slice.site.frameRing),
          ways: st.ways.map((w: any) => ({ id: w.id, class: w.class, growthStage: w.growthStage, provisional: w.provisional })),
        };
      }
      const r: any = orig.call(s, input, ctx);
      s6Outcome = r.ok
        ? { ok: true, districts: (r.value?.districts ?? []).length, perimeterPoints: r.value?.s6?.perimeter?.length ?? null, landHa: r.value?.s6?.report?.landHa ?? null }
        : { ok: false, code: r.code, detail: r.detail };
      return r;
    },
  } as any;
};

const t0 = performance.now();
const d = derive(kind, seed, { plant });
const wallMs = performance.now() - t0;

const report = d.report;
const model = d.model;
const s6Report = report.stages.find((x: { name: string }) => x.name === 'S6') ?? null;
const refusals: Record<string, unknown> = {};
for (const [name, r] of model.refusals) refusals[name] = r;

// the chunk record of the 1 000-seed run (tree 4abd334a), when a chunk file holds this seed
let chunkRec: any = null;
if (existsSync(chunks)) {
  for (const f of readdirSync(chunks).filter((n) => n.endsWith('.json.gz'))) {
    const j = JSON.parse(gunzipSync(readFileSync(join(chunks, f))).toString('utf8'));
    const rec = j.records.find((r: any) => r.seed === seed && r.run === kind);
    if (rec !== undefined) {
      chunkRec = { file: f, bugs: rec.bugs, rootS5: rec.rootS5, root: rec.root, order: rec.order, stampsMs: rec.stampsMs };
      break;
    }
  }
}
const rootS5 = hex(model.stageRoots.get('S5'));
const root = hex(model.root);
const summary = {
  seed,
  kind,
  tree: tag,
  plat,
  throughS6,
  wallMs: Math.round(wallMs),
  order: [...model.order],
  invocations: Object.fromEntries(d.ins.invocations),
  stampsMs: Object.fromEntries([...d.ins.stamps].map(([k, v]: [string, number]) => [k, Math.round(v)])),
  bugs: report.bugs,
  bugsAsRecord: report.bugs.map((b: { stage: string; cls: string }) => `${b.stage}:${b.cls}`),
  refusals,
  s6Outcome,
  s6Report,
  kernel: report.kernel,
  unplaced: report.unplaced.length,
  districts: ((model.data.get('districts') as unknown[] | undefined) ?? []).length,
  rootS5,
  root,
  stageRoots: Object.fromEntries([...model.stageRoots].map(([k, v]: [string, Iterable<number>]) => [k, hex(v)])),
  chunk: chunkRec === null ? null : { ...chunkRec, rootS5Equal: chunkRec.rootS5 === rootS5, rootEqual: throughS6 ? null : chunkRec.root === root, bugsEqual: JSON.stringify(chunkRec.bugs) === JSON.stringify(report.bugs.map((b: { stage: string; cls: string }) => `${b.stage}:${b.cls}`)) },
};
const base = `${tag}-${kind}-${String(seed).padStart(4, '0')}`;
writeFileSync(join(out, `${base}.json`), JSON.stringify(summary, null, 2));
if (s6Capture !== null) writeFileSync(join(out, `${base}.s6in.json`), JSON.stringify(s6Capture));
console.log(JSON.stringify(summary, null, 2));
