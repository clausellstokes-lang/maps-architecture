// Renders a stage-group INTEGRATION CHECK prompt of flow-7 (workflows/23-build-m0-waves.js's integrationPrompt, J173)
// for the session to run as a dispatched seat (a background Opus/high agent, as J259 (2) runs the flow's remainder in
// the cloud), with the machine-fitted args. Usage:
//   node render-int.mjs <specs.json> <group> <ids,comma,separated> <busy,comma,separated> <out.json> [prevLinesJson]
// specs.json is the session-fix specs file (its `args` and `workflow` keys are read; nothing else). The lane key is
// check/integration-<label>-g<group>, or check/integration-<label>-g<group>-close when prevLinesJson (the previous
// check's failing lines, a JSON array) is given — the re-check after an integration fix.
import { readFileSync, writeFileSync } from 'node:fs';

const [specsPath, group, idsArg, busyArg, outPath, prevArg] = process.argv.slice(2);
if (!specsPath || !group || !idsArg || !outPath) throw new Error('usage: render-int.mjs <specs.json> <group> <ids> <busy> <out.json> [prevLinesJson]');
const specs = JSON.parse(readFileSync(specsPath, 'utf8'));
const args = JSON.parse(readFileSync(specs.args, 'utf8'));
args.flow = { ...(args.flow || {}), attempt: 14 };
const src = readFileSync(specs.workflow, 'utf8');
const cutAt = src.indexOf('const VENDOR_FACTS');
const intAt = src.indexOf('const ATTEMPT');
const intEnd = src.indexOf('const INTFIX');
if (cutAt < 0 || intAt < 0 || intEnd < 0) throw new Error('workflow 23: a marker was not found');
const head = src.slice(0, cutAt).replace('export const meta', 'const meta');
const intSrc = src.slice(intAt, intEnd);
const factory = new Function('args', 'agent', 'log', `${head}\n${intSrc}\nreturn { integrationPrompt, GROUND };`);
const P = factory(args, () => { throw new Error('agent() is never called by the renderer'); }, () => {});

const ids = idsArg.split(',').filter(Boolean);
const busy = (busyArg || '').split(',').filter(Boolean);
const prev = prevArg ? JSON.parse(prevArg) : null;
const label = args.flow.label;
const lane = `check/integration-${label}-g${group}` + (prev ? '-close' : '');
const prompt = P.integrationPrompt(group, ids, lane, prev, busy);
writeFileSync(outPath, JSON.stringify({ group, ids, lane, busy, prompt }, null, 1));
console.log(`${outPath}: ${lane} (${ids.length} items, ${busy.length} busy) ${prompt.length} chars`);
