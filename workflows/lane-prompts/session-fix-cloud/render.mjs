#!/usr/bin/env node
// Session-round brief renderer (a rebuild of the WSL-only ~/maps-scratch/session-fix/render-generic.mjs, lost with the
// owner's WSL logout, J250). Evaluates workflows/23-build-m0-waves.js's buildPrompt and closingCheckPrompt with the
// machine-fitted args and renders, per round spec, the JSON file workflows/34-session-fix.js reads (keys build, check).
//   node render.mjs <specs.json> <outDir>
// specs.json: { args: <fitted args path>, workflow: <path of workflows/23>, rounds: [ { id, round: 'S3', from: 3,
//   lines: [{line, evidence, required_change}], session: '<why the session opened this round>', buildExtra?, checkExtra? } ] }
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const specs = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const outDir = process.argv[3];
mkdirSync(outDir, { recursive: true });
const args = JSON.parse(readFileSync(specs.args, 'utf8'));
const src = readFileSync(specs.workflow, 'utf8');
const cutAt = src.indexOf('const VENDOR_FACTS');
if (cutAt < 0) throw new Error('workflow 23: VENDOR_FACTS marker not found');
const head = src.slice(0, cutAt).replace('export const meta', 'const meta');
const confirm = src.match(/^const CONFIRM = .*$/m)[0];
const cut = src.match(/^const CUT = .*$/m)[0];
const factory = new Function('args', 'agent', 'log', `${head}\n${confirm}\n${cut}\nreturn { buildPrompt, closingCheckPrompt, checkPrompt, CONFIRM, CUT, GROUND };`);
const P = factory(args, () => { throw new Error('agent() is never called by the renderer'); }, () => {});

for (const r of specs.rounds) {
  const wave = r.wave || 'S';
  const buildLane = `build/${r.id}-fix-s${r.from}`;
  const checkLane = `check/${r.id}-close-s${r.from}`;
  const session = `\n\nSESSION FIX ROUND (J186, J192; lane ${buildLane} / ${checkLane}): this round was opened by the SESSION, not by a failed check of the item. ${r.session} The "failing lines" above are the round's required changes, written as the closing checker reads them: the builder fixes every one inside the item's owns with a test that pins it, re-lands the item's record under lane ${buildLane} (corepack pnpm landed -- ${r.id} --lane ${buildLane} --wave flow-7), and the closing checker (J162) confirms each line with its own evidence, re-runs the gates and judges new findings by the blocker rule only. The item is committed by the session with tools/flow_stage.mjs once the closing check passes; no seat runs git.`;
  const build = P.buildPrompt(r.id, wave, buildLane, { round: r.round, lines: r.lines }) + session + (r.buildExtra ? `\n\n${r.buildExtra}` : '');
  const check = P.closingCheckPrompt(r.id, wave, checkLane, r.lines) + session + (r.confirmOnly ? P.CONFIRM : '') + (r.checkExtra ? `\n\n${r.checkExtra}` : '');
  const out = join(outDir, `prompts-${r.id.toLowerCase().replace(/^m0-/, '')}s${r.from}.json`);
  writeFileSync(out, JSON.stringify({ id: r.id, from: r.from, build, check }, null, 1));
  console.log(`${out}: build ${build.length} chars, check ${check.length} chars`);
}
