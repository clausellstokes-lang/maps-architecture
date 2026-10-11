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
  const cons = !!r.consolidation;
  const buildLane = cons ? `build/${r.id}-consolidate-${r.from}` : `build/${r.id}-fix-s${r.from}`;
  const checkLane = cons ? `check/${r.id}-consolidate-close-${r.from}` : `check/${r.id}-close-s${r.from}`;
  const consolidation = cons ? `\n\nCONSOLIDATION ROUND (J260, J263; lane ${buildLane} / ${checkLane}; the owner, 2026-10-11: clean up, consolidate, make the code and comments elegant and coherent, at the same quality or higher). This round applies the findings ${r.consolidation.findings} of the architect's plan ${r.consolidation.plan} (read the plan's §0, the sections named, §2's comment rewrite for the files in your owns, §3's test plan for your test folders and §4 whole BEFORE anything else): each finding's EQUIVALENCE list, NUANCE list and ORACLE are BINDING — a nuance lost is a blocker (J112), and the pass changes NO behaviour: every level digest, golden, registered seed's output, refusal code and pinned message text stays bit-identical; no export of any folder index or of the barrel is added, removed or renamed (J263 Q1); a shared helper lives where the plan puts it and is imported by path. The builder applies the findings inside the item's owns, rewrites the comments of its files as §2 says (the design as it stands, citing C-rows and design sections, never the history of rounds), consolidates the tests as §3 says keeping every describe/it title and mapping each merged case to the earlier mutants it kills, appends the old-file → new-file map to checks/${r.id}-notes.md (J263 Q8), re-lands the item's record under lane ${buildLane}, appends its choices row (what was unified, the equivalence shown) and its CLEAN-ROOM row, and runs the self-check as a NO-SHIFT proof: the item's whole test set green, the digests and goldens identical before and after (keep the before-values from a mirror of the tree as it was), and a sample of the earlier rounds' mutants (from the checks' mutant tables) re-killed by the consolidated tests. The closing checker confirms every finding against its oracle with its own evidence, diffs the exported names of every index in the owns before and after (identical), re-kills the earlier mutants named in the plan's oracles, reads every rewritten comment against the code (a comment that no longer matches the code is a blocker), and judges a new finding by the blocker rule only. ${r.session}` : '';
  const session = cons ? consolidation : `\n\nSESSION FIX ROUND (J186, J192; lane ${buildLane} / ${checkLane}): this round was opened by the SESSION, not by a failed check of the item. ${r.session} The "failing lines" above are the round's required changes, written as the closing checker reads them: the builder fixes every one inside the item's owns with a test that pins it, re-lands the item's record under lane ${buildLane} (corepack pnpm landed -- ${r.id} --lane ${buildLane} --wave flow-7), and the closing checker (J162) confirms each line with its own evidence, re-runs the gates and judges new findings by the blocker rule only. The item is committed by the session with tools/flow_stage.mjs once the closing check passes; no seat runs git. WAITING RULE (J258; a schema'd seat's final text IS its answer): never end a turn before you have returned your structured result. Run a long test, sweep or probe in the background only with a done-file ('( cmd > out.log 2>&1; touch done ) &') and wait for it in the FOREGROUND in chunks of at most ten minutes — timeout 570 bash -c 'until [ -e done ]; do sleep 15; done' — repeating the chunk (and writing a CHECKPOINT line every twenty minutes) until the done-file exists; never 'wait' by ending the turn, never with a Monitor, never with pgrep of your own command line (J227).`;
  const fromDisk = r.fromDisk ? `RESUME FROM DISK (the RESUME RULE below applies to you, J252): docs/lane-events.log already carries the LANDED line of your exact lane key ${buildLane}, written on the owner's WSL machine, and the files it names stand in the tree unchanged (corepack pnpm landed:verify -- flow-7 --item ${r.id} prints ok). Verify that with landed:verify and a read of the LANDED line, then return the structured result from the landed record and the LANDED line WITHOUT rebuilding, re-testing or writing anything (no mirror, no self-check, no new lane lines beyond one CHECKPOINT 'returned from disk'). Only if the LANDED line is missing or landed:verify fails do you build.\n\n` : '';
  const build = fromDisk + P.buildPrompt(r.id, wave, buildLane, { round: r.round, lines: r.lines }) + session + (r.buildExtra ? `\n\n${r.buildExtra}` : '');
  const check = P.closingCheckPrompt(r.id, wave, checkLane, r.lines) + session + (r.confirmOnly ? P.CONFIRM : '') + (r.checkExtra ? `\n\n${r.checkExtra}` : '');
  const out = join(outDir, `prompts-${r.id.toLowerCase().replace(/^m0-/, '')}${cons ? 'c' : 's'}${r.from}.json`);
  writeFileSync(out, JSON.stringify({ id: r.id, from: r.from, build, check }, null, 1));
  console.log(`${out}: build ${build.length} chars, check ${check.length} chars`);
}
