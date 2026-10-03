// Renders the coherence workflow's repair / adjudicate / validate / verify prompts from workflows/18-coherence.js itself.
// usage: node prompts.mjs <kind> <json-args-file> <out-file>
//   kind repair:     {"unit":"model","round":1,"issues":[...],"rulingsFile":""}
//   kind adjudicate: {"round":3,"history":[..],"work":[..]}
//   kind verify:     {"key":"model","round":1,"tag":"t"|"s"}   (base part, vol pair, seam or edge key)
//   kind validate:   {"vround":0,"material":[...],"rulingsFile":""}
import fs from 'node:fs'; import vm from 'node:vm';
const [,, kind, argFile, out] = process.argv;
const A = JSON.parse(fs.readFileSync(argFile, 'utf8'));
const src = fs.readFileSync('/home/user/maps-architecture/workflows/18-coherence.js', 'utf8').replace(/^export const meta/m, 'const meta');
const lines = src.split('\n');
const idx = (re) => lines.findIndex((l) => re.test(l));
const head = lines.slice(0, idx(/^\/\/ ───────── Inventory/)).join('\n');
const defs = lines.slice(idx(/^const VUNITS/), idx(/^const verifyAll/)).join('\n');
const asmDef = lines.slice(idx(/^const assemblePrompt/), idx(/^phase\('Assemble'\)/)).join('\n');
const repBody = lines.slice(idx(/^const repairRound/), idx(/^outer:/)).join('\n');
const adjTpl = repBody.match(/fableSeat\(`([\s\S]*?)`, `coherence\/adjudicate-r/)[1];
const valTpl = src.match(/fin = await fableSeat\(`([\s\S]*?)`, `coherence\/validate-v/)[1];
const args = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/args.json', 'utf8'));
const ctx = { args, agent: async () => null, parallel: async () => [], phase: () => {}, log: () => {}, JSON, Math, String, Number, Set, Array, Object };
vm.createContext(ctx);
const code = head + '\n' + asmDef + '\n' + defs + `
;globalThis.__r = { assemblePrompt, GROUND, standInNote, repairPrompt, verifyPrompt, seamPrompt, edgePrompt, VUNITS, SEAM_UNITS, EDGE_UNITS, unitNames, DIR, FFILE, DATE, STANDIN };`;
new vm.Script(code).runInContext(ctx);
const R = ctx.__r;
let text;
if (kind === 'repair') {
  text = R.repairPrompt(A.unit, A.round, A.issues) + (A.rulingsFile ? ` BINDING RULINGS: apply ${A.rulingsFile} where it concerns your unit.` : '');
  if (R.STANDIN) text += R.standInNote(`coherence/repair-${A.unit}-r${A.round}`);
} else if (kind === 'adjudicate') {
  const f = new vm.Script('(round, history, work, GROUND, DIR, JSON) => `' + adjTpl + '`').runInContext(ctx);
  text = f(A.round, A.history, A.work, R.GROUND, R.DIR, JSON) + R.standInNote(`coherence/adjudicate-r${A.round}`);
} else if (kind === 'validate') {
  const f = new vm.Script('(vround, material, rulingsFile, GROUND, DIR, DATE, unitNames, JSON) => `' + valTpl + '`').runInContext(ctx);
  text = f(A.vround, A.material, A.rulingsFile || '', R.GROUND, R.DIR, R.DATE, R.unitNames, JSON) + R.standInNote(`coherence/validate-v${A.vround}`);
} else if (kind === 'assemble') {
  text = R.assemblePrompt(A.round);   // an opusSeat in the workflow: no stand-in note
} else if (kind === 'verify') {
  const u = [...R.VUNITS, ...R.SEAM_UNITS, ...R.EDGE_UNITS].find((x) => x.key === A.key);
  const full = A.tag === 's';
  text = (u.seam ? R.seamPrompt(u.seam, A.round, full) : u.edge ? R.edgePrompt(u.edge, A.round, full) : R.verifyPrompt(u, A.round, full)).replace(`verify-${u.key}-r${A.round}.md`, `verify-${u.key}-r${A.round}${A.tag}.md`);
}
fs.writeFileSync(out, text);
console.log(kind, 'ok', text.length);
