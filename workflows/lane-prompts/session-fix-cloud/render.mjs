#!/usr/bin/env node
// Session-round brief renderer (a rebuild of the WSL-only ~/maps-scratch/session-fix/render-generic.mjs, lost with the
// owner's WSL logout, J250). Evaluates workflows/23-build-m0-waves.js's buildPrompt and closingCheckPrompt with the
// machine-fitted args and renders, per round spec, the JSON file workflows/34-session-fix.js reads (keys build, check).
//   node render.mjs <specs.json> <outDir>
// specs.json: { args: <fitted args path>, workflow: <path of workflows/23>, rounds: [ { id, round: 'S3', from: 3,
//   lines: [{line, evidence, required_change}], session: '<why the session opened this round>', buildExtra?, checkExtra? } ] }
// THREE MODES (J269, J270/J271): a SESSION FIX ROUND (default; lanes build/<id>-fix-s<n>, check/<id>-close-s<n>; verdict checks/<id>-s<n>.md),
// a CONSOLIDATION ROUND (r.consolidation: {plan, findings}; lanes build/<id>-consolidate-<n>, check/<id>-consolidate-close-<n>; verdict
// checks/<id>-c<n>.md) and a FLOW ROUND (r.flow: true, r.wave = the stage group; from 0 = the item's first build and first check under
// build/<id>, check/<id>; from n ≥ 1 = fix round n under build/<id>-fix<n>, check/<id>-close-r<n>; verdict checks/<id>.md appended, the
// flow's convention; r.continue = the builder continues an unfinished build under the CONTINUE RULE). Every mode carries the same tail:
// the VERDICT FILE sentence for its mode, ZERO REFUSALS (J264) and the WAITING RULE (J258).
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

const ZERO = `ZERO REFUSALS (the owner, 2026-10-11, J264): the target for every kernel operation and pipeline stage is zero refusals of LAWFUL input over the registered families; a refusal of a lawful input is a defect — fix it by making the operation succeed (better routing, a fallback, a deterministic documented clean-up of the input), and use detect-and-refuse only for unlawful input or where success needs design not yet built (a named notBuilt milestone); an unlawful-input refusal stays a typed, visible outcome. A builder reports the refusal count of the item's registered families (its B-FUZZ families, registers, edge states or seed sweeps) BEFORE and AFTER the round in its result notes and its choices row; a closing checker re-measures it and FAILS the round if it rose, and routes any remaining lawful-input refusal it sees to the session as a finding with its seed.`;
const WAIT = `WAITING RULE (J258; a schema'd seat's final text IS its answer): never end a turn before you have returned your structured result. Run a long test, sweep or probe in the background only with a done-file ('( cmd > out.log 2>&1; touch done ) &') and wait for it in the FOREGROUND in chunks of at most ten minutes — timeout 570 bash -c 'until [ -e done ]; do sleep 15; done' — repeating the chunk (and writing a CHECKPOINT line every twenty minutes) until the done-file exists; never 'wait' by ending the turn, never with a Monitor, never with pgrep of your own command line (J227).`;

for (const r of specs.rounds) {
  const wave = r.wave || 'S';
  const mode = r.flow ? 'flow' : r.consolidation ? 'consolidation' : 'session';
  const n = r.from;
  const lanes = mode === 'flow'
    ? { build: n === 0 ? `build/${r.id}` : `build/${r.id}-fix${n}`, check: n === 0 ? `check/${r.id}` : `check/${r.id}-close-r${n}`, tag: `f${n}` }
    : mode === 'consolidation'
      ? { build: `build/${r.id}-consolidate-${n}`, check: `check/${r.id}-consolidate-close-${n}`, tag: `c${n}` }
      : { build: `build/${r.id}-fix-s${n}`, check: `check/${r.id}-close-s${n}`, tag: `s${n}` };
  const buildLane = lanes.build;
  const checkLane = lanes.check;
  const verdict = mode === 'flow'
    ? `VERDICT FILE (the flow's convention, J270): the checker writes its verdict to plat/docs/build/checks/${r.id}.md — the item's FIRST check creates it; a later check APPENDS a dated section headed by its lane key and verdict and never rewrites the earlier sections — and records it with corepack pnpm landed -- check-${r.id} --lane ${checkLane} --wave flow-7 --owns plat/docs/build/checks/${r.id}.md (re-landing the record an earlier check made is right here); its notes rows go to checks/${r.id}-notes.md recorded as check-${r.id}-notes under the same lane.`
    : `VERDICT FILE (J269): the closing checker writes its verdict to plat/docs/build/checks/${r.id}-${lanes.tag}.md — NEVER into checks/${r.id}.md, which is the first check's file and stays as committed — and records it with corepack pnpm landed -- check-${r.id}-${lanes.tag} --lane ${checkLane} --wave flow-7 --owns plat/docs/build/checks/${r.id}-${lanes.tag}.md; its notes rows go to checks/${r.id}-notes.md recorded as check-${r.id}-notes under the same lane; where the brief above names checks/${r.id}.md, this paragraph wins.`;
  const consolidation = mode !== 'consolidation' ? '' : `\n\nCONSOLIDATION ROUND (J260, J263; lane ${buildLane} / ${checkLane}; the owner, 2026-10-11: clean up, consolidate, make the code and comments elegant and coherent, at the same quality or higher). This round applies the findings ${r.consolidation.findings} of the architect's plan ${r.consolidation.plan} (read the plan's §0, the sections named, §2's comment rewrite for the files in your owns, §3's test plan for your test folders and §4 whole BEFORE anything else): each finding's EQUIVALENCE list, NUANCE list and ORACLE are BINDING — a nuance lost is a blocker (J112), and the pass changes NO behaviour: every level digest, golden, registered seed's output, refusal code and pinned message text stays bit-identical; no export of any folder index or of the barrel is added, removed or renamed (J263 Q1); a shared helper lives where the plan puts it and is imported by path. The builder applies the findings inside the item's owns, rewrites the comments of its files as §2 says (the design as it stands, citing C-rows and design sections, never the history of rounds), consolidates the tests as §3 says keeping every describe/it title and mapping each merged case to the earlier mutants it kills, appends the old-file → new-file map to checks/${r.id}-notes.md (J263 Q8), re-lands the item's record under lane ${buildLane}, appends its choices row (what was unified, the equivalence shown) and its CLEAN-ROOM row, and runs the self-check as a NO-SHIFT proof: the item's whole test set green, the digests and goldens identical before and after (keep the before-values from a mirror of the tree as it was), and a sample of the earlier rounds' mutants (from the checks' mutant tables) re-killed by the consolidated tests. The closing checker confirms every finding against its oracle with its own evidence, diffs the exported names of every index in the owns before and after (identical), re-kills the earlier mutants named in the plan's oracles, reads every rewritten comment against the code (a comment that no longer matches the code is a blocker), and judges a new finding by the blocker rule only. ${r.session}`;
  const sessionFix = `\n\nSESSION FIX ROUND (J186, J192; lane ${buildLane} / ${checkLane}): this round was opened by the SESSION, not by a failed check of the item. ${r.session} The "failing lines" above are the round's required changes, written as the closing checker reads them: the builder fixes every one inside the item's owns with a test that pins it, re-lands the item's record under lane ${buildLane} (corepack pnpm landed -- ${r.id} --lane ${buildLane} --wave flow-7), and the closing checker (J162) confirms each line with its own evidence, re-runs the gates and judges new findings by the blocker rule only. The item is committed by the session with tools/flow_stage.mjs once the closing check passes; no seat runs git.`;
  const flowRound = `\n\nFLOW ATTEMPT 14 ROUND (J245, J250, J259, J270; lane ${buildLane} / ${checkLane}): item ${r.id} belongs to flow-7's stage group ${wave} and is run in the cloud by the session as a DISPATCHED ROUND (workflows/34 in flow mode) in place of workflows/23's steward and seat loop; the flow's rules stand unchanged for the seats: the item's record is landed or re-landed under lane ${buildLane} with --wave flow-7; the gates, the here-bars and M0.md §3 exactly as the brief above says; no seat runs git — the session commits through tools/flow_stage.mjs once the check passes. ${r.continue ? `CONTINUE (the CONTINUE RULE above applies to you): your lane key ${buildLane} has CHECKPOINT lines and a landed record (plat/docs/build/landed/${r.id}.json) but NO LANDED line; its files stand in the tree. Read them and the CHECKPOINT lines, keep what stands, and continue from the first unfinished part — on the tree as it is NOW, which carries the committed rounds the session note lists. ` : ''}${r.session}`;
  const session = (mode === 'flow' ? flowRound : mode === 'consolidation' ? consolidation : sessionFix) + ' ' + verdict + ' ' + ZERO + ' ' + WAIT;
  const fromDisk = r.fromDisk ? `RESUME FROM DISK (the RESUME RULE below applies to you, J252): docs/lane-events.log already carries the LANDED line of your exact lane key ${buildLane}, written on the owner's WSL machine, and the files it names stand in the tree unchanged (corepack pnpm landed:verify -- flow-7 --item ${r.id} prints ok). Verify that with landed:verify and a read of the LANDED line, then return the structured result from the landed record and the LANDED line WITHOUT rebuilding, re-testing or writing anything (no mirror, no self-check, no new lane lines beyond one CHECKPOINT 'returned from disk'). Only if the LANDED line is missing or landed:verify fails do you build.\n\n` : '';
  const fix = mode === 'flow' ? (n === 0 ? null : { round: n, lines: r.lines }) : { round: r.round, lines: r.lines };
  const build = fromDisk + P.buildPrompt(r.id, wave, buildLane, fix) + session + (r.buildExtra ? `\n\n${r.buildExtra}` : '');
  const check = (mode === 'flow' && n === 0 ? P.checkPrompt(r.id, wave, checkLane) : P.closingCheckPrompt(r.id, wave, checkLane, r.lines)) + session + (r.confirmOnly ? P.CONFIRM : '') + (r.checkExtra ? `\n\n${r.checkExtra}` : '');
  const out = join(outDir, `prompts-${r.id.toLowerCase().replace(/^m0-/, '')}${lanes.tag}.json`);
  writeFileSync(out, JSON.stringify({ id: r.id, from: r.from, build, check }, null, 1));
  console.log(`${out}: ${mode} build ${build.length} chars, check ${check.length} chars`);
}
