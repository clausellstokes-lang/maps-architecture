// Dry-run a Workflow script with stubbed agent()/parallel()/phase()/log(): verifies it executes end to end and saves
// every seat's exact prompt + opts to an output dir. Usage: node tools/dryrun-workflow.mjs <script> <outdir> '<args-json>' | @<args-file.json>  (use @file for large args: a long argv gets the process killed at launch)
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
const [,, script, outdir, argsJson] = process.argv;
const src = fs.readFileSync(script, 'utf8').replace(/^export const meta/m, 'const meta');
fs.mkdirSync(outdir, { recursive: true });
const seen = [];
const stubFor = (schema) => ({ key: 'stub', file: 'stub', headline: 'stub', items: [], ref: 'stub', lens: 'stub', verdict: 'stub',
  capabilities: [], overall: { functional: 0, visual: 0, algorithm_identity: 0, seed_exact: 0, effort_person_weeks: 0, one_paragraph: '' },
  adjustments: [], scores: [], winner: 'stub', grafts: [], findings: [], unresolved: [], new_findings: [], reviewed: [], design_impacts: [] });
const ctx = {
  args: JSON.parse(argsJson && argsJson.startsWith('@') ? fs.readFileSync(argsJson.slice(1), 'utf8') : (argsJson || '{}')), console,
  agent: async (prompt, opts) => {
    if (process.env.DRY_FAKE && opts.schema) { const fake = (sc) => sc.enum ? sc.enum[0] : sc.type === 'object' ? Object.fromEntries(Object.entries(sc.properties || {}).map(([k, v]) => [k, fake(v)])) : sc.type === 'array' ? (process.env.DRY_CLEAN && sc.items && sc.items.properties && sc.items.properties.why !== undefined || process.env.DRY_CLEAN && sc.items && sc.items.properties && sc.items.properties.claim !== undefined && sc.items.properties.owner !== undefined ? [] : [fake(sc.items), fake(sc.items)]) : sc.type === 'number' ? 1 : sc.type === 'boolean' ? false : 'x'; seen.push({ label: opts.label, phase: opts.phase, model: opts.model, standIn: prompt.includes('STAND-IN NOTICE') }); fs.writeFileSync(path.join(outdir, (opts.label || 'seat').replace(/[:/]/g, '_') + '.prompt.txt'), `MODEL ${opts.model} | PHASE ${opts.phase} | LABEL ${opts.label}\n\n` + prompt); return fake(opts.schema); } seen.push({ label: opts.label, phase: opts.phase, model: opts.model, standIn: prompt.includes('STAND-IN NOTICE') }); fs.writeFileSync(path.join(outdir, (opts.label || 'seat').replace(/[:/]/g, '_') + '.prompt.txt'), `MODEL ${opts.model} | PHASE ${opts.phase} | LABEL ${opts.label}\n\n` + prompt); return stubFor(opts.schema); },
  parallel: async (thunks) => Promise.all(thunks.map((t) => t().catch((e) => { console.log('thunk error', e.message); return null; }))),
  pipeline: async (items, ...stages) => Promise.all(items.map(async (item, i) => { let r = item; try { for (let k = 0; k < stages.length; k++) r = await stages[k](k === 0 ? item : r, item, i); return r; } catch (e) { console.log('pipeline stage error', e.message); return null; } })),
  phase: () => {}, log: (m) => console.log('LOG', m), budget: { total: null, spent: () => 0, remaining: () => Infinity },
};
vm.createContext(ctx);
const result = await new vm.Script('(async () => {\n' + src + '\n})()').runInContext(ctx);
const byPhase = {};
for (const s of seen) { const k = `${s.phase}/${s.model}${s.standIn ? '/stand-in' : ''}`; byPhase[k] = (byPhase[k] || 0) + 1; }
console.log('seats:', seen.length, JSON.stringify(byPhase));
console.log('result keys:', Object.keys(result || {}).join(','));
