# HANDOFF — town-generator research program

## RESUME HERE (kept current; last updated 2026-10-03 17:10 EDT, on the owner's Mac)

**STATE AT 17:10 EDT 2026-10-03 (owner: "Save your progress").** Everything is committed and pushed to `origin/main`. (1) **M0 coding** — `workflows/23-build-m0-waves.js` run wf_ac63cb22-a54 (waves 1–2): wave 1's item M0-d-07 (the determinism lint) failed its first check (F1–F4), fix round 1 landed 17:02, re-check `check/M0-d-07-r1` running; wave 2 (M0-a-01, M0-d-02, M0-d-03, M0-f-01) follows, then waves 3–18 from M0-work.json (args `{root, scratch, maxLanes 4, maxFixRounds 2, waves:[{wave, items}]}`). In a NEW session relaunch the same script with waves 1–2 (seats' RESUME rules return landed work from the LANDED lines and landed records; a wave's steward re-takes no existing snapshot). (2) **J161 run** — `workflows/24-m1-rulings-cleanroom.js` run wf_1e71446d-1cb: the MFCG completion LANDED (seed 0 re-export byte-identical; 130/plain/8 froze again → its substitute waits for rulings-1's replacement rule, the owner's third approved load); `m1/rulings-1` LANDED (32 rulings, all 21 plan issues fixed, M-1-plan.md and M-1-work.json revised); `m1/plan-check-close-1` running; `design/cleanroom-fix-1` running (the FTG field family renamed to a 'Facility' family of our own, 115 places in 12 files; 9 study-map rewordings; doc_checks.py's corpus cut to reference material) → its verifier next. Relaunch the same script fresh in a new session (results on disk). (3) **FTG** — day 1 landed; days 2–6 by the session cron (recreate from `workflows/lane-prompts/ftg-daily-cron.txt`). OPEN QUESTION TO THE OWNER: signing in to FTG with the owner's Google account (the owner signs in themself in the capture profile; one account only; the free account's settlement cap, 10 in 2022, unverified today) could take the five remaining towns in one sitting — the owner has not yet said yes; nothing is done until they do. The owner's request to rotate IP addresses and scrub cookies to evade the one-a-day limit was DECLINED (logged). (4) **Next after the runs land:** read the closing checks; launch M0 waves 3–18; M-1 wave 2 from the revised plan (and a design seat for rulings-1's design corrections); the substitute MFCG seed load; push after each landing (J158).


**M0 CODING (2026-10-03 15:48):** the spec LANDED (closing check pass, J160; 72 items in plat/docs/build/M0-work.json). `workflows/23-build-m0-waves.js` runs the waves (args: root, scratch, maxLanes 4, maxFixRounds 2, waves = the numeric waves of M0-work.json as [{wave, items}]); run wf_ac63cb22-a54 does waves 1–2 first; then waves 3–18 (`<scratchpad>/waves-1-18.json` holds the list; rebuild it from M0-work.json in a new session). Waves T, T-fix, T2, 19 and AFTER-M-1 are opened by hand (T needs M-1's seats paused and the TIMING-PHASE OPEN line). A wave whose item fails its checker twice stops the run for the session to decide.

**FTG DAYS 2–6 (J159):** day 1 landed 2026-10-03 17:23 UTC (BIG_TOWN, none). A session cron (job f828f593, 13:43 EDT on Oct 4–8) launches each next day; in a NEW session recreate it from `workflows/lane-prompts/ftg-daily-cron.txt` (CronCreate is session-only). Day 2 no earlier than 13:30 EDT 2026-10-04. **M0 spec:** closing round running (J160; workflows/20 resumed with maxFixRounds 5, closingFrom 4). **M-1 wave 1:** workflows/22-m1-wave1.js (run wf_87d66fc8-4c8); its independent plan check returned fix with 21 issues (13 touch wave 1: ng-faces.json and the cut-lengths row M0 asks for, NG px vs metres, formula-seed rule C7, the 2026-09-25 FTG payload's non-default road length, the MFCG load count, denylist format) — the plan is revised before wave 2.

**ON THE MAC NOW (2026-10-03, J157).** The session runs in `/Users/cstokes/Desktop/Maps` on the owner's MacBook Air, which is §12.1's reference machine (Apple M1, 16 GB, Node 24.12). `main` = `origin/main` at the start. The five local-only research archives live in `~/Desktop/research/` and are symbolic links in `research/` (patreon, devlogs, ftg-docs, external, reference-maps); the disk is 99 % full (≈ 2.8 GB free) — never copy them. pnpm runs only as `corepack pnpm …`. Running: `workflows/20-build-m0-spec.js` (Mac version; cloud text in `20-build-m0-spec.pre-mac.js.bak`; args `{root, scratch: <scratchpad>/build, model: 'opus', specModel: 'fable'}`) and `workflows/21-mac-catchup.js` (the clean-room re-check with the full corpus, item 125 (d)'s SettlementForge check at `origin/master` 00b648c9d, the M-1 plan; args `{root, scratch: <scratchpad>/catchup}`; at most 3 seats). Both are resumable in a new session by relaunching the same script with the same args (RESUME/CONTINUE rules; results on disk). Next after they land: read `plat/docs/build/M0.md` and `docs/calibration/M-1-plan.md`, ask the owner for any owner-gated M-1 step (captures of third-party sites, logins), then run M0's waves (≤ 4 implementer seats; timing-phase bars alone on the machine) and M-1's first wave side by side. The owner's standing rule since 2026-10-03 (J158): push `main` to GitHub after each landing and at least every few hours while work lands (never force-push).


**NEXT SESSION RUNS ON THE OWNER'S MAC (owner, 2026-10-03: "We are going to run this on my Mac. But not now").** Everything is stopped; nothing runs in the cloud. On the Mac, in the Maps folder (`/Users/cstokes/Desktop/Maps`, a clone of this repository whose local-only folders — captures/, reference/, research/patreon|devlogs|ftg-docs|external|reference-maps/, profiler/.profiles — stay untouched, being ignored): (1) `git fetch origin && git checkout main && git pull` — `main` carries all the live work (the coherence pass to its end, the fix list, rules to 127, rulings to J156, the build's start); commit or stash any local change first. (2) Re-run the clean-room checker with the corpus present (`python3 docs/validation/bench/doc_checks.py`), since every cloud run of it was provisional. (3) Resume the build: `Workflow({ scriptPath: "/Users/cstokes/Desktop/Maps/workflows/20-build-m0-spec.js", args: { root: "/Users/cstokes/Desktop/Maps", scratch: "<the session scratchpad>/build", model: "opus" } })` — the M0 spec seat had read its sections and was writing `plat/docs/build/M0.md` when stopped (no code yet); the Mac can also run M-1 (captures, calibration, the implementer digest, baselines.json) and M0 (b), (c), which need the reference corpus, and item 125 (d)'s SettlementForge compatibility check. (4) Work merges to `main` at each milestone (J156). Timing bars measured on the Mac's bench (Node 24, Apple M1) are the authoritative ones.

**CURRENT (2026-10-03) — THE COHERENCE PASS HAS ENDED; THE BUILD IS STARTING.** By the owner's ruling J153 the loop ended with family check run r7y (all six checks landed: 3 majors, 18 minors, no blocker). Everything still open is in `docs/validation/coherence/fix-list.md` (62 findings: 0 blockers, 27 major — 13 of them owner rule 127's pending changes — 35 minor; 25 builders' valid choices; 28 held notes; J150's two round-8 hand-offs), written by `tools/coherence_fixlist.py`; the M0 subset is `plat/docs/build/open-design-findings.md`. No further fix pass, compression pass, round 8 or full sweep runs now; findings are fixed as the build reaches them. Owner rulings of the day: item 127 / J152 (the "Built by the town" switch list; delete-for-now), J153 (end the loop, build), J154 (how to build: agent teams, `plat/` here, §17.1's clean room, §0's stack), J155 (the duplicate session that started from the stale `main`), J156 (a scope line until M1 — new ideas to `docs/BACKLOG.md`; tangled features staged; the design a reference, not a contract — builders' choices in `plat/docs/build/choices.md`; `main` is the truth, merged at each milestone). **Next:** `workflows/20-build-m0-spec.js` (the M0 build spec deciding every M0 finding, the `plat/` scaffold, an independent checker); then the M0 work items in waves. M-1 and M0 (b), (c) need the reference corpus on the owner's Mac. The Fable review and item 125 (d)'s SettlementForge compatibility check stay pending. The block below is the coherence pass's record.

**Where things stand.** The coherence pass's Verify/Repair loop is run BY HAND from a cloud session (branch
`claude/ecstatic-gates-iyenrz`, draft PR #2). Every seat is an opus seat. The tools are in
`workflows/lane-prompts/coherence-cloud/_tools/` (family tools in `_tools/fam/`), and the briefs, `coherence_<lane>.prompt.txt`,
sit beside them.

Findings per round: 501 → 446 → 215 → 145 → 91 → 73 → 81. Round 6 had 0 blockers, 39 majors and 42 minors; about 30 of
the majors were in the raised-way × wall family.

The owner's decisions since:
* J142, narrowing that family: proposed, then withdrawn.
* J143: keep iterating.
* J144: a lock on walls, aqueducts and similar structures holds placement, not shape, with the program's guardrails G1–G3.
  The loop works this family ALONE until six family-focused checks find no major in it.
* J145: probes split into three parallel lenses; lane cap 10; a compression pass after the family closes.
* J146: after probe pass 3 (40 findings, 31 major; the enumerated table did not converge, 20 → 13 → 31), the family is
  governed by normative LAWS (adjudication-r7.md's Part L); R7-02's tables are worked examples. A family major is only a case
  the laws decide two ways or not at all, an owner-rule clash, or an unchecked law-1 invariant.
* J147: drawing or dragging holds nothing; locks have two axes, placement and shape (outline and plot size; cosmetics follow
  the neighbourhood); a shape lock is honoured where a raised way meets a wall. The family's laws adopt it now; the two-axis
  lock itself and its readers outside the family are a hand-off to round 8.
* J148: gates, posterns, towers and fixed places never move for a meeting (three tiers). J149: an aqueduct crosses a wall
  over (an arch clearing it) or merged (the wall built round its arch), by its level. J150: one plain shape-lock rule in
  the family; lock behaviour under undo, redo, re-grade and repair designed in round 8; Part L must not grow; back to the
  owner if a laws probe pass still finds 10 or more majors.

**Round 7 (family-only).** Its work set is the 53 family findings; the other 28 round-6 findings are held for round 8 in
`docs/validation/coherence/work/held-r8/`. adjudication-r7.md carries Part L (the laws, ~9,350 words; the design states them
at §2.7's support step (6)) and Part P passes 1–8 with "J147/J148/J149 applied". Laws probe majors per pass: 31, 29, 19, 15,
14, 12 (a plateau). The owner then ruled J151: where EVERY outcome keeps the law-1 invariants and owner rules, passes the
check and fails no named test, the case is a MINOR valid choice (the builder picks; fix-list.md lists it); probes stopped and
the family was repaired (14 seats) and assembled (assemble-r7).

The family loop since: six family checks (`famverify-{table,generation,epochs,hand,readers,tests}-r<label>`), then a fix
pass — adjudicate-r<next> → repairs → assemble-r<next> — then the checks again. Majors per check run: r7 13, r7v 8, r7w 4
distinct (all restatements of the laws; fix pass r7x replaced them with citations of the laws and swept the family).
famverify-*-r7x is the current check run. To run another fix pass (label `7y`, after checks `7x`):
* write `coherence_adjudicate-r7y.prompt.txt` from r7x's brief (counts, the r7x check files) and run it;
* `python3 _tools/fam/mkrepfam.py 7y 7x <units with work>` (run from a scratchpad copy beside prompts.mjs and finalize.py)
  renders the repair briefs; run them, up to 10 at once;
* build `coherence_assemble-r7y.prompt.txt` from r7x's (base = assemble-r7x's install, its sha256) and run it;
* `python3 _tools/fam/mkfam.py 7y` renders the six checks; run them.
Builders' choices collected for fix-list.md so far: VF7-GEN-06, VF7-RDR-07 (adjudication-r7v.md); VF7v-TBL-04, -TBL-05,
-GEN-05, -EPO-06, -RDR-05 (adjudication-r7w.md); and any in adjudication-r7x.md. Held notes for the next full round are in
each fix pass's "Held for the next full round".

Once the checks find no major: the family closes (J144); then the compression pass (J145); then round 8 — the 28 held
findings, J150's round-8 hand-offs (the two-axis lock and its readers; lock behaviour under undo, redo, re-grade and repair),
the held notes — and a full sweep of all twenty seats, looped to J141's bar.

**THE BAR (owner, J141).** The pass stops when a FULL SWEEP of all twenty verify seats finds ZERO blockers and ZERO majors
and the final validator signs off. Minors still open at the stop go to `docs/validation/coherence/fix-list.md`. FEATURE
FREEZE until the pass closes.

**At a clean sweep.** Write fix-list.md, run validate-v0, then write SUMMARY.md and validate.md for the owner. LAST comes the
SettlementForge compatibility check (item 125 (d); "read it from local"), on the owner's Mac. The Fable review stays the
owner's call.

**Never** run `tools/progress.py` in the cloud. Seats run no state-changing git.

## Earlier resume notes (superseded by the block above)

## RESUME HERE (2026-09-29) (kept current; last updated 2026-09-29 20:15 EDT)

**Where things stand — PAUSED at a clean point at the owner's request (2026-09-29 ~20:10).** (1) The twelve design volumes are DONE
(docs/volumes/V01–V12, INDEX.md, SUMMARY.md, file f items 200–582, the bundle `docs/ARCHITECTURE-FULL.md` current as of 15:44).
(2) The coherence pass `workflows/18-coherence.js` (run `wf_4465b207-520`) is STOPPED in its Rewrite phase: inventory, wiring and canon
LANDED (docs/validation/coherence/: inventory-*, wiring.*, canon.*, agreement.*, edges.*); all six BASE rewrites LANDED (drafts in
docs/validation/coherence/new/base/); volume rewrites V01–V05 were IN PROGRESS (drafts saved in new/volumes/, their CONTINUE rule picks
up); V06–V12 not started; the LIVE design files are untouched (only the assembly seat writes them). (3) Then the Fable review — ONLY on
the owner's word. All other decisions are delegated (J122). Owner rules: `docs/AMENDMENTS-2026-09-28g.md` (102–113).

**Continuing in a CLOUD session (from the GitHub repository).** Launch the coherence pass with the repository's own folder:
`Workflow({ scriptPath: "<checkout>/workflows/18-coherence.js", args: { maxLanes: 6, date: "2026-09-28", fableModel: "opus",
root: "<checkout>", scratch: "/tmp/maps-scratch/coherence" } })` where `<checkout>` is the absolute path of the clone (`pwd`). The
workflow harness runs at most (CPUs − 2) agents at once, so a smaller cloud machine runs fewer lanes — slower, not wrong. The
clean-room checker (`docs/validation/bench/doc_checks.py`) needs the reference corpus kept on the owner's Mac (captures/,
research/patreon, devlogs, ftg-docs, external); in the cloud it prints "reference corpus INCOMPLETE … NOT authoritative" — treat
its result as provisional and re-run it on the Mac before any freeze. SettlementForge's own folder is not in the repository; the
coherence pass needs only research/sf/. Commit work as it lands; push only on the owner's word.

**Repository.** The program is backed up in a PRIVATE GitHub repository: https://github.com/clausellstokes-lang/maps-architecture
(commit 5354c2a, 2026-09-29 20:20). This folder is now a git repository; commit new work with explicit paths and push only on the
owner's word. Third-party captures, source repositories, copied archives, study images, browser profiles and backups stay local
(`.gitignore`).

**To continue the coherence pass:** in a NEW session, launch `Workflow({ scriptPath: "/Users/cstokes/Desktop/Maps/workflows/18-coherence.js",
args: <workflows/lane-prompts/coherence-args.json> })` fresh; every landed seat returns its saved result from
docs/validation/coherence/results/ (or its LANDED summary) without redoing, and the in-progress editors continue from their drafts. Register
it with `tools/lanes.py --run <runId> <journal> --max-lanes 6` and recreate the lane check from `workflows/lane-prompts/lane-check-cron.txt`
(update its run id first). The lane-check cron was DELETED at the stop so nothing resumes by itself.

**Resume in the SAME session** (a run stopped by an interrupt or a usage limit): `Workflow({ scriptPath:
"/Users/cstokes/Desktop/Maps/workflows/18-coherence.js", resumeFromRunId: "wf_4465b207-520", args: <coherence-args.json> })`, then
`python3 tools/lanes.py --run <runId> <session>/subagents/workflows/<runId>/journal.jsonl --max-lanes 6`.

**Resume in a NEW session** (resumeFromRunId works only inside the session that started the run): launch the SAME script
fresh with the same args. Nothing is lost: every seat writes its file section by section and logs LANDED or CHECKPOINT
lines in `docs/lane-events.log`; its RESUME rule returns finished work from disk and its CONTINUE rule picks up an unfinished
file at its first open section. Re-register the run with `tools/lanes.py`, and recreate the half-hourly lane check (session-only)
with CronCreate, cron `7,37 * * * *`, prompt = the text of `workflows/lane-prompts/lane-check-cron.txt`.

**Backups.** `sh tools/snapshot.sh` copies docs/ (without docs/archive), workflows/ and tools/ to `backups/snap-<time>.tar.gz`,
keeping the newest 24; a background loop in the session runs it every half hour (the lane-check cron fires only when the session is idle, so it is not relied on), and it runs after each run. Restore one file:
`tar -xzf backups/snap-<time>.tar.gz docs/volumes/V04-underground.md`.

**Where the record lives.** `docs/PROGRESS.md` (judgment rows J1–J122 and the hand log), `docs/OWNER-INSTRUCTIONS-2026-09-25.md`
(the owner's words), this file's numbered chain below (6r–7c), and the auto-memory directory.

---


**Status of this file:** written 2026-09-21 ≈03:25 EDT at the Phase 0–3 stop point; **header updated 2026-09-25** when
the program resumed. Sections 1–6 below are the 2026-09-21 text (still accurate for what they describe); read
`docs/PROGRESS.md` for everything after that, in particular the Phase 3b table and the judgment-calls table.

**2026-09-25 resumption (owner: "please continue the pending work here", then "i defer and leave all judgement to you
and proactively give you any permission you may desire"):**
- A 2026-09-21 07:17–07:27 EDT continuation session had spawned gap-closers and was stopped by the owner before anything
  landed or was recorded; its state was reconstructed on 2026-09-25 (PROGRESS.md hand log, 05:15 entry).
- **Phase 3b (post-critic gap closers)** — second critic seats `_critic-ftg.md` and `_critic-os.md` LANDED (their
  rulings override the findings files like `_critic.md`; the FTG seat found that `ftg-payload-visual.md`'s original text
  decoded zig-zag `sint32` coordinates unsigned, so every FTG length there is ×2 and every area ×4 — corrected in its
  Critic-2 addendum); `External-sources addendum` LANDED in `mfcg-devlogs-a.md` (Internet Archive copies of watabou's
  Reddit statements, itch 422446, palette SVGs); three Opus capture readers (NG ring, MFCG gates=4, VG river/island at
  20 µs) append addenda to the profile-* files — state per lane in PROGRESS.md.
- **Owner directives added 2026-09-25:** at most FOUR lanes running at a time (workflow 03 gates every agent through a
  4-slot semaphore); staffing = Fable manager/judgment/architect/validator, Opus verifier/recon/implementer/surveyor.
- **Workflow 03 LAUNCHED 2026-09-25 07:36 EDT** (run `wf_e306f20c-a9f`, journal under the session's `subagents/workflows/wf_e306f20c-a9f/`; the parser had refused a first attempt over backticks inside prompt strings — fixed; check scripts with `tools/check-workflow.sh`). To resume in ANY session after a stop or account switch: re-launch the same script (`Workflow({ scriptPath: ... })`) — every lane whose file exists with a LANDED line in `docs/lane-events.log` is read from disk instead of redone (RESUME RULE); in the same session `resumeFromRunId: "wf_e306f20c-a9f"` also returns cached results. Lane utilisation: `python3 tools/lanes.py` (30-minute session cron) keeps four lanes busy from `docs/lane-backlog.md`. The script was patched on
  2026-09-25 (backup: `workflows/03-assess-design-validate.2026-09-21-original.js`): critic-2 files as overriding
  rulings; RESUME RULE (a lane whose file exists and has a LANDED line is read from disk, not redone — this is how a
  new account resumes a half-finished run: just re-launch the same script); READING BUDGET; coverage audit split into
  four Opus slices; Verify seats on Opus; a Fable final-validator seat before the loop may exit; 4-lane cap.
  Re-launch command for any session: `Workflow({ scriptPath: "/Users/cstokes/Desktop/Maps/workflows/03-assess-design-validate.js" })`.
- **Product scope (owner, 2026-09-25):** build FIRST the base = one general town/city generator, "MFCG/FTG using the
  best of both and your own improvements"; NEXT the same city composed of individual neighbourhoods (NG-class close-ups
  on the base); the VILLAGE is "its own thing for the moment" (separate, later; the base must not preclude it).
  Workflow 03 was re-scoped accordingly before launch (judgment J6 in PROGRESS.md).
- **Roadmap (owner, 2026-09-25):** the ultimate purpose is a settlement-map layer module for SettlementForge, but the
  generators are developed standalone first (town/city base → neighbourhoods → village); then reconciled with the
  historical + artistic corpus in `~/Desktop/settlement-engine/map-corpus` (built generator = BASE); only then
  SettlementForge inputs. The 2026-09-21 veto on reading/citing `settlement-engine` stays in force until the owner
  opens the reconcile step.
- **Design tiebreaker (owner, 2026-09-25):** "if you have to make a decision between MFCG and FTG on which direction to
  take for coding, lean into the corpus with constraint and precision" → conflicts resolve toward realism (explicit
  constraints, precise real-world geometry); legibility stays a floor; the corpus is still not read in this phase.
- **Stage 3 (owner, 2026-09-25):** after cities with neighbourhoods, the individual buildings are to be constructed the
  way watabou's Fantasy Manor generator does (https://watabou.itch.io/fantasy-manor), their footprint shapes showing at
  every zoom, with diversity "from a giant manor to a small hovel" decided by explicit per-plot rules (data tables
  reading a per-lot context vector). Not yet in the evidence base: needs its own archive/record/read round (backlog items `manor-archive`,
  `manor-capture`, `manor-read`). The base only carries hooks (per-lot sub-seed, building-generator interface, LOD).
- **IF THIS SESSION DIES OR FABLE RUNS OUT (owner warning 2026-09-25) — recovery procedure, any session, any account:**
  1. `python3 tools/progress.py` and `python3 tools/lanes.py` → what landed, what is live (nothing in chat is needed).
  2. Read `docs/OWNER-INSTRUCTIONS-2026-09-25.md` (every owner rule of 2026-09-25 in their words) and the judgment
     table in `docs/PROGRESS.md`.
  3. Re-launch the review: `Workflow({ scriptPath: ".../workflows/03-assess-design-validate.js" })` — landed seats are
     read from disk (RESUME RULE); in the SAME session add `resumeFromRunId: "wf_e306f20c-a9f"`. If Fable is
     unavailable, add `args: { fableModel: "opus" }` (judgment J17: roles unchanged, model swapped).
  4. When 03 completes, run the amendment pass: `Workflow({ scriptPath: ".../workflows/04-amendments.js" })` (same
     args rule) — it folds `docs/AMENDMENTS-2026-09-25.md` into ARCHITECTURE.md with a validate/verify round.
  5. Re-create the 30-minute lane check (`/loop 30m …` with the prompt in `docs/PROGRESS.md` hand log of 06:09) and
     register the run with `python3 tools/lanes.py --run <runId> <journal>`.
  6. Do NOT edit GROUND/SPEC of a script while its run is active — add owner rules to the amendments file instead.
  6b. **Fix-all pass (owner: no deferrals).** Workflow 03 ran through its red team (all 7 lenses + 4 coverage audits
     landed); its revise loop and workflow 04 are SUPERSEDED by `workflows/06-fix-all.js` (launched 2026-09-25 ~18:0x,
     outputs in `docs/validation/fix-all/`, the revised `docs/ARCHITECTURE.md`, the round tables in
     `docs/ARCHITECTURE-VALIDATION.md`, and `docs/validation/fix-all/SUMMARY.md` for the owner). To resume after a stop:
     re-launch the same script (`args: {maxLanes: 4}`; add `resumeFromRunId` in the same session) — every seat resumes
     from its landed file or continues its checkpoint.
  6c. After 08 completes, apply docs/AMENDMENTS-2026-09-25b.md (items 8–27) with `workflows/09-amendments-b.js`
     (defaults: Fable editors/validator, Opus router/assembler/verifiers; `{fableModel: "opus"}` only as a marked
     stand-in). 04 is superseded (J32). Then `workflows/05-fable-review.js` (restructured, J32), then the M1 build spec.
  6d. `partitioned/` holds the owner-requested PRELIMINARY corpus look (workflows/07-corpus-preview.js): it is NOT an input
     to the design or the build until the reconciliation stage (see partitioned/README.md).
  6e. **Consistency-and-compression pass (J29).** 06 finished (0 major, 20 minor left). `workflows/08-consistency.js`
     (run wf_d4604e7d-047) rewrites ARCHITECTURE.md so each fact is stated once; outputs in `docs/validation/consistency/`,
     the pre-pass copy in `docs/archive/`. To resume after a stop: re-launch the same script with the args in its J29 row
     (`fableModel/opusModel "opus"`, `maxLanes 4`, `maxRepairRounds 2`, `openIds` from still-open-r5.json grouped by owner;
     same session: add `resumeFromRunId`). If it stops AFTER the assembler wrote ARCHITECTURE.md and before verification,
     resume (do not restore the archive). Step 6c (amendments b) runs after 08, then a short M1 build spec.
     2026-09-26 14:5x: Fable is back (J31) — 08 resumed with `lateFableModel: "fable"` (validator, repairs, closing on
     Fable; verifiers on Opus). Order now: 08 → 05 (Fable review of the earlier queue) → 04 amendments b with
     `fableModel: "fable"` → M1 build spec.
  6f. **Amendments pass 09 (items 8–31) — RESUME AFTER A WINDOW CUT.** Run wf_b8631ab1-21c, `workflows/09-amendments-b.js`,
     args `{"items":"8-31","maxLanes":3,"lastParts":["model"],"date":"2026-09-26","tag":"b"}`. Same session: add
     `resumeFromRunId: "wf_b8631ab1-21c"` (completed seats replay from cache). New session: launch without it — every
     seat with a LANDED line in docs/lane-events.log returns from disk (RESUME RULE), and a seat whose files exist
     without a LANDED line continues from its PROGRESS ledger (CONTINUE RULE). Before resuming, check the tail of every
     docs/validation/amendments-b/blocks-*.md: a last block not closed by "=== END ===" (or another "=== " header) is
     truncated — the kill-safe rules added on 2026-09-26 22:55 make the continuing seat delete and rewrite it, and the
     assembler skips a truncated tail and reports it. Seats landed by 23:00: kernel, pipeline-evolution-islands,
     pipeline-sewers, pipeline-assignments; live at the cut: pipeline-prosperity-change-dossier-plan, determinism;
     queued: pipeline-emulation-hidden, rendering, scope, model (model last on purpose: it reads
     research/findings/dwellings-synthesis.md for item 28). After 09: run 05 (Fable review), then the M1 build spec.
     The consistency pass 08 is CLOSED (docs/validation/consistency/SUMMARY.md; three r3 leftovers applied by hand).
     The Dwellings review 10 is DONE (docs/CONFIDENCE.md, docs/confidence/dwellings*.md, research/findings/dwellings-*.md).
  6g. **FABLE WEEKLY LIMIT (expected 2026-09-27).** When Fable seats start failing ("weekly limit"), the running workflows
     return early (their guards) and the session may be switched to Opus. Then, in order: (1) resume 09 on Opus —
     `Workflow({scriptPath: "…/workflows/09-amendments-b.js", resumeFromRunId: "wf_b8631ab1-21c", args: {"items":"8-31",
     "maxLanes":4,"lastParts":["model"],"date":"2026-09-26","tag":"b","fableModel":"opus"}})` — completed Fable seats
     return from disk (RESUME RULE; no new queue rows), unfinished ones run as MARKED stand-ins (A rows in
     docs/FABLE-REVIEW-QUEUE.md; markers in their report files); (2) resume 11 the same way —
     `resumeFromRunId: "wf_8ba454ea-179", args: {"maxLanes":4,"date":"2026-09-27","fableModel":"opus"}` — the critic and
     impact seats become marked stand-ins and add B rows for the readers; (3) every manager judgment taken on Opus is
     recorded in docs/PROGRESS.md with "(Opus 5.5 manager — pending Fable review, A-M1)"; (4) when Fable is back, run
     `workflows/05-fable-review.js` over the whole PENDING queue before the M1 build spec. New session: launch without
     resumeFromRunId — the LANDED lines and CONTINUE ledgers recover every seat.
  6h. **ACCOUNT SWITCH 2026-09-27 ~15:10 — RESUME HERE (the new account has Fable).** Everything stopped cleanly: no
     workflow running, no assembly mid-write, every repair block file ends on "=== END ===", the lane-check cron deleted.
     A new session has no workflow cache, so relaunch WITHOUT resumeFromRunId: every seat with a LANDED line in
     docs/lane-events.log returns from disk, every partial seat continues from its file's PROGRESS ledger.
     FIRST, in each of workflows/12-amendments-c.js, 13-handfix-b.js and 14-dossier-survey.js, set the SCRATCH constant
     (and the scratch path inside 12's GROUND) to the NEW session's scratchpad directory (tmp paths are per session).
     Then, keeping the SUM of all running workflows' maxLanes ≤ 4 (owner's four-lane rule):
     (1) Hand-fix of pass b — `Workflow({scriptPath: "/Users/cstokes/Desktop/Maps/workflows/13-handfix-b.js",
         args: {"maxLanes": 2, "fableModel": "fable", "opusModel": "opus"}})`. State: 31/31 fixes applied; verify r0, repair
         r1, assemble r1, verify r1 landed; repair r2: kernel, determinism, pipeline landed; model, rendering, scope files
         complete-looking but not LANDED (continue); then assemble r2, verify r2, close (Fable).
     (2) Dossier survey, in parallel — `Workflow({scriptPath: ".../workflows/14-dossier-survey.js", args: {"maxLanes": 2,
         "fableModel": "fable", "opusModel": "opus"}})`. State: sf/model and sf/generation landed; sf/outputs and sf/seam
         partial; then mapping, verify, and the plan (Fable) → research/sf/PLAN.md, SUMMARY.md, docs/AMENDMENTS-2026-09-27d.md
         (from item 73). Read-only on ~/Desktop/settlement-engine; SettlementForge's own map designs stay unread (J67).
     (3) When (1) closes — pass c: `Workflow({scriptPath: ".../workflows/12-amendments-c.js", args: {"items": "20,32-72",
         "maxLanes": 2, "lastParts": ["model"], "date": "2026-09-27", "tag": "c", "fableModel": "fable", "opusModel":
         "opus"}})` (no stopAfter). Its route LANDED for 32–68; the router's coverage rule appends 69–72 (palette,
         informal clusters, class mix, the neighbourhood character vector with (d′) district/dispersed/anchor
         institutions, (d″) power dials and significance, (d‴) neighbourhood bounds, (d4) the economy dial by market share,
         (d5) partitioned shared buildings). Widen to 4 lanes once (2) lands (same session: stop + resumeFromRunId). AFTER pass c: a short pass over docs/AMENDMENTS-2026-09-27d.md
         (the survey's items 73+) and docs/AMENDMENTS-2026-09-27e.md (item 101, the authoring toolkit — owner rule of 2026-09-27 ~18:30, J79),
         same script with args.amendmentsFile and items, before the freeze.
         27c's HOLD parts (in items 37 and 62) stay unapplied until Fable has re-checked the code readings. Item 20 (h) (27c §G, the owner's 2026-09-27 evening data-flow refinement: derive every dossier gap, the dossier the sole immutable truth) is routed with pass c as item 20 — hence "20,32-72". Per J76 the extended Fable review runs BEFORE pass c.
     (4) The FABLE REVIEW of the queue (docs/FABLE-REVIEW-QUEUE.md, 181+ PENDING rows) — per J76 it runs BEFORE pass c, when (1)
         closes: `Workflow({scriptPath: ".../workflows/15-fable-review-b.js", args: {"maxLanes": 2, "date": "<today>"}})` (written
         2026-09-27 17:55 as the extension of 05 to every family: per-part fix-all seats, per-part amendments-b/hand-fix seats, red team,
         code readings with the HOLD evidence gate, evidence, integration, manager A-M1/A-M2, corpus; strict-parsed and dry-run). STATE 2026-09-27 20:45: (2) landed 19:55 (PLAN.md, AMENDMENTS-2026-09-27d.md 73–88, SUMMARY.md; O3/O4 owner-gated; J80);
         pass c's route landed (run wf_6fd23dd7-1a6, items 20,32-72); the review's step 1 (five design-independent Fable seats: sf, manager-corpus, code,
         evidence-captures, evidence-review) runs as wf_baf79644-bf7 with stopAfter review at 2 lanes; STEP 2 when the hand-fix closes:
         `Workflow({scriptPath: ".../workflows/15-fable-review-b.js", resumeFromRunId: "wf_baf79644-bf7", args: {"maxLanes": 4, "date": "2026-09-27", "run": "main", "continueKeys": ["code", "evidence-review"]}})` — LAUNCHED 22:05 after the 22:00 Fable session-limit reset (continueKeys makes a checkpointed or limit-killed seat continue instead of replaying its partial result)
         (the five replay from cache; the sf rows are in the main run, no separate sf run). New session without cache: launch 15 without resumeFromRunId —
         landed reviewer files return by the RESUME RULE.
     (5) Then one CONSOLIDATION pass (08-style; the design is ~13 000 lines), FREEZE the design for M1 (new owner ideas
         queue for later passes), the M1 BUILD SPEC and the builders' sanitised digest, and the M-1/M0 risk spikes.
     (6) Re-create the 30-minute lane check (/loop 30m … — prompt in docs/PROGRESS.md) in the new session.
  7c. **OWNER 2026-09-29 ~08:00 (J121, J122): SettlementForge settles its product questions; the owner delegates ALL other decisions except
     the Fable review.** Decisions: docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md; item 112 filed; 18 applies them. Do not re-ask these.
  7b. **OWNER 2026-09-29 ~03:05 (J120): item 111 (desert water incl. oases; water shaping the town; sun vs shade by climate)** filed;
     carried by the coherence pass to base AND volumes (g items from 111 onward), not by a restart of 17. f is items 200-566.
  7a. **OWNER 2026-09-29 ~02:25 (J119): the coherence pass runs at 6 lanes and carries a SHRINK GOAL inside elegance** — about a third
     fewer words, only from restatement, narration, duplication and verbose prose. coherence-args.json maxLanes 6; cron job ac88c998.
  6z. **OWNER 2026-09-29 ~00:00 (J117): the coherence pass sweeps EDGE CASES and cross-volume combinations** — edge catalogue + two checkers.
  6y. **OWNER 2026-09-28 ~23:30 (J115): item 110 filed and bundled** (retaining walls, raised ways, stepped massing, deck plots incl.
     bridge decks, the second known-city fixture). File f now numbers from 200. Run wf_153a2e0d-96a relaunched, same args.
  6x. **OWNER 2026-09-28 ~23:10 (J113): the coherence pass checks AGREEMENT BETWEEN VOLUMES systematically** — agreement matrix + six seam checkers.
  6w. **OWNER 2026-09-28 ~23:00 (J112): the coherence pass (18) also makes the design ELEGANT where appropriate, never losing nuance** —
     principle (9) with canon equivalence lists; NUANCE-LOST is a blocker. 18 not yet running; it starts when 17 completes (cron).
  6v. **OWNER 2026-09-28 ~19:55 (J110): item 109 (3b) overlap access and (k) catacombs, with the program's refinements, filed and bundled.**
     g items could not pass 109 while file f numbered from 110; f now numbers from 200 (J115), so owner rules continue at 110
     before its integrator runs. 17-volumes patched (backup workflows/17-volumes.pre-109k.js.bak); run relaunched, same args.
  6u. **OWNER 2026-09-28 ~19:30 (J109): item 109 with (j) filed and bundled** — caverns by mountains and mines, underground ruins
     (system kind ruin), any tier, access optional and growing with the settlement, dwellings only after access. 17-volumes patched
     (backup workflows/17-volumes.pre-109.js.bak); run wf_153a2e0d-96a relaunched, same args.
  6t. **OWNER 2026-09-28 ~18:20 (J105–J108): items 105–108 filed in docs/AMENDMENTS-2026-09-28g.md and bundled.** 105 the supply web,
     106 walls using natural barriers, 107 spread and pull in balance (104 (h) (3) revised), 108 SettlementForge institution ladders.
     17-volumes brief, assignments and integrator duty extended (backup workflows/17-volumes.pre-105.js.bak); run wf_153a2e0d-96a
     relaunched with the same args. The coherence pass (18) applies every g item to the base.
  6s. **OWNER 2026-09-28 ~17:55 (J104): item 104 (h) bundled.** Custom supply chains are placed as one connected unit (flow order, link
     strength, cluster or stretch, cross-links, trade endpoints, change, bars; docs/AMENDMENTS-2026-09-28g.md). 17-volumes names item 104
     with (h) in its owner-rules paragraph and its integrator duty; run wf_153a2e0d-96a relaunched 17:57 as task wq3u9xb1j, same args.
  6r. **OWNER 2026-09-28 ~16:35 (J97): Fable base review PAUSED (run wf_00c63d9d-efe, resumable); volumes NOW on Opus.** Chain: (1) 17-volumes
     (Opus; args workflows/lane-prompts/volumes-args.json) → (2) 18-coherence (Opus; workflows/lane-prompts/coherence-args.json) → (3) on the
     owner's word, the Fable retrovalidation over base and volumes: 16 with {"maxLanes": 4, "date": "<today>", "tag": "final"} (its base-only
     predecessor may instead be resumed first with resumeFromRunId wf_00c63d9d-efe and its saved args). Each fresh, 4 lanes.
  6q. **CHAIN as of 2026-09-28 16:30 (J94, J95).** (1) lane handfix-c/apply (Opus; applies docs/validation/amendments-c/closing-handfix-rows.py) →
     (2) `Workflow({scriptPath: ".../workflows/16-retrovalidate.js", args: <workflows/lane-prompts/retrovalidate-base-args.json>})` — Fable seats →
     (3) `Workflow({scriptPath: ".../workflows/17-volumes.js", args: <workflows/lane-prompts/volumes-args.json>})` — Opus only →
     (4) `Workflow({scriptPath: ".../workflows/18-coherence.js", args: <workflows/lane-prompts/coherence-args.json>})` — Opus only →
     (5) 16 again with {"maxLanes": 4, "date": "<today>", "tag": "final"} — Fable. Each fresh, 4 lanes, after the previous completes.
  6p. **OWNER 2026-09-28 ~15:05 (J93): a Fable retrovalidation of the completed BASE runs BEFORE the volumes.** When the bundled pass
     completes: `Workflow({scriptPath: ".../workflows/16-retrovalidate.js", args: {"maxLanes": 4, "date": "2026-09-28", "tag": "base", "scope": "base"}})`
     (Fable seats; outputs docs/retrovalidation/base/). Then 17 (volumes) → 18 (coherence) → 16 with tag "final" over the set.
  6o. **ORDER after the volumes (J91): the coherence, cohesion and wiring pass, then the Fable retrovalidation.** When the volumes run
     completes: `Workflow({scriptPath: ".../workflows/18-coherence.js", args: {"maxLanes": 4, "date": "2026-09-28", "fableModel": "opus"}})`
     (applies docs/AMENDMENTS-2026-09-28f.md, consolidates base + volumes, wires every piece, traces the dossier end to end; outputs
     docs/validation/coherence/, SUMMARY.md). When it completes: the Fable retrovalidation over the set —
     `Workflow({scriptPath: ".../workflows/16-retrovalidate.js", args: {"maxLanes": 4, "date": "<today>", "tag": "final"}})` (Fable seats; needs Fable).
     Then the freeze and the M1 build spec.
  6n. **OWNER 2026-09-28 ~04:00 — the volumes run AFTER the amendment pass, as one bundle (J90; supersedes 6m's parallel run).** Running now:
     only the bundled pass c+d+e, run wf_6fd23dd7-1a6 at 4 lanes (args workflows/lane-prompts/pass-cde-args.json). When it completes, launch
     `Workflow({scriptPath: ".../workflows/17-volumes.js", args: <workflows/lane-prompts/volumes-args.json>})` fresh at 4 lanes; its integrator
     regenerates docs/ARCHITECTURE-FULL.md. Then the Fable retrovalidation over base and volumes.
  6m. **OWNER 2026-09-28 ~03:50 — "bundle them all together" (J89): the volumes run NOW beside the bundled pass.** Running: the bundled
     pass c+d+e, run wf_6fd23dd7-1a6 at 2 lanes (args workflows/lane-prompts/pass-cde-args.json), and the volumes, run wf_2b5a20d5-a73 at 2
     lanes (args workflows/lane-prompts/volumes-args.json). When the pass completes: stop the volumes run and resume it with maxLanes 4
     (same args otherwise). One-file bundle: python3 tools/bundle_architecture.py → docs/ARCHITECTURE-FULL.md (regenerated by the volumes
     integrator). New session: relaunch both scripts with their saved args, without resumeFromRunId.
  6l. **NEXT after the bundled pass completes (J88): the twelve design volumes.** (superseded by 6m: it now runs in parallel) `Workflow({scriptPath: ".../workflows/17-volumes.js",
     args: {"maxLanes": 4, "date": "2026-09-28", "fableModel": "opus"}})` — full build depth for every staged subject; outputs docs/volumes/
     (V01–V12, critique/, INDEX.md, SUMMARY.md) and docs/AMENDMENTS-2026-09-28f.md (base change requests from 200, not applied; moved from 110 by J115). THEN the Fable
     retrovalidation (16) extended to the volumes, then an amendments pass for f, consolidation, freeze, the M1 build spec.
  6k. **OWNER 2026-09-28 ~00:30 — c, d and e BUNDLED into one pass (J87).** Running: workflows/12-amendments-c.js, run
     wf_6fd23dd7-1a6, args in the session scratchpad pass-cde-args.json (also quoted in J87): items "20,32-88,101", three amendment files,
     extraGround, fableModel opus, 4 lanes. New session: relaunch 12 with the same args (no resumeFromRunId) — landed and partial
     files recover by the RESUME/CONTINUE rules. After it: resume the Fable retrovalidation (16, wf_1190f2a5-870) over the result,
     then consolidation, freeze, the M1 build spec.
  6j. **OWNER 2026-09-27 ~23:15 — retrovalidation PAUSED; pass c runs on OPUS ONLY (J85).** Run wf_1190f2a5-870 stopped in Validate
     (kernel, pipeline-gen, pipeline-content landed; model, determinism, rendering partial; design untouched). Pass c: run
     wf_6fd23dd7-1a6 resumed at 4 lanes with fableModel opus (marked stand-ins). When the owner says resume: Workflow 16 with
     resumeFromRunId wf_1190f2a5-870 (this session) or a fresh launch (any session) — over the design AS PASS C LEAVES IT.
  6i. **OWNER RULING 2026-09-27 ~23:00 — retrovalidate the full architecture, not every Opus item (J84).** The row-by-row
     review (15, wf_baf79644-bf7) is stopped and superseded; its landed files under docs/fable-review/main/ are candidate
     inputs. RUNNING: `workflows/16-retrovalidate.js` (ten Fable validators over the whole design → Fable repairs → Opus
     assembly and verification, ≤ 2 rounds → Fable close: leftovers applied, every still-PENDING queue row marked SUPERSEDED,
     markers replaced, banner rewritten, docs/retrovalidation/SUMMARY.md for the owner). Resume in this session with
     resumeFromRunId (see PROGRESS.md hand log for the run id); in a new session launch it without resumeFromRunId — landed
     validator files return by the RESUME RULE. THEN pass c editors (resume wf_6fd23dd7-1a6 without stopAfter, or launch 12
     fresh with items "20,32-72"), then the short pass over 27d (73–88) + 27e (101), consolidation, freeze, the M1 build spec.
  7. **Fable ran out on 2026-09-25 ~15:30 EDT.** The review was finished on Opus 5.5 with marked stand-ins (J18); every
     item Fable has not touched is in `docs/FABLE-REVIEW-QUEUE.md` and carries a "> PENDING FABLE REVIEW" line in its
     file. **When Fable is available again, run `Workflow({ scriptPath: ".../workflows/05-fable-review.js" })`** before
     starting the build. Dry-run any workflow first with `node tools/dryrun-workflow.mjs <script> <outdir> '<args>'` (large args: `@file.json`)
     (executes it with stubbed agents and saves every seat's exact prompt).
- **Plot model + plot granularity (owner, 2026-09-25, BASE requirement):** the MFCG/FTG shapes are PLOTS holding 0..n
  buildings plus a yard; site-plan rules (coverage by class/wealth/density; row houses end to end along the frontage
  with party walls; manors/institutions set back with several disjoint buildings on one plot; hovels one footprint in a
  yard); wealth/assignment join plots in prosperous neighbourhoods and split them in poor ones; alleys and back lanes
  emerge between plots; footprints and yards are drawn, never a plot outline as a building. Injected into workflow 03
  before the architects started (J9: two stop/resumes of run wf_e306f20c-a9f).
- **Amendments after the architects were queued (2026-09-25):** greenery by prosperity (base) and floating-island
  refinements (own terrain echoing the ground; purpose = prosperous quarter or unique institution such as a palace,
  cathedral or prison; no relation to sewers) — see `docs/AMENDMENTS-2026-09-25.md`; applied by an amendment pass
  after the review completes.
- **Height for shadows (owner, 2026-09-25):** buildings carry heights (floors, eave, ridge, tower) even though unseen;
  a later shadow pass projects them from a sun vector; display list keeps a shadow-layer hook. In AMENDMENTS-2026-09-25.md.
- **Everything is editable (owner, 2026-09-25, base principle):** every generated element and every rule table/preset
  editable by users (preference) and by us (system change); edits persist, undo, survive regeneration, migrate; local
  repair around them. In AMENDMENTS-2026-09-25.md item 5 and SPEC item 7.
- **Prosperity is a gradient and a band (owner, 2026-09-25):** a continuous, editable wealth field with predictable
  drivers plus controlled chance; banded only where rules need classes; continuous rules interpolate; dynamic over time.
  AMENDMENTS item 6.
- **Size ladders (owner, 2026-09-25):** town/city generator = town → city → metropolis; village generator = thorp →
  hamlet → village.
- **Assignment hook (owner, 2026-09-25, for the SettlementForge-input phase):** buildings will be assigned names,
  functions or general shapes (drifting within bounds) at three granularities — one building, one whole neighbourhood
  as a single assignment with diversified buildings inside, or N dispersed buildings across neighbourhoods. Base keeps
  the hooks only (stable ids, assignment input above class rules, drift bounds, placement solver).
- **Evolution hook (owner, 2026-09-25, much later):** settlements must be able to grow/evolve over decades under
  circumstances (wall → ring road as a newer outer curtain is built, suburbs absorbed, gates → junctions). Base keeps
  hooks: lifecycles/versions, incremental pipeline mode, first-class conversions, time-varying inputs, per-epoch RNG.
  Coherent and from the SAME SEED (clarified): the seed defines the original town; the HISTORY is determined by the
  INPUTS applied to it as modifications/variations of the original; each epoch derives from the previous state;
  survivors are never re-rolled; every change traces to an event.
- **City add-on layers (owner, 2026-09-25), toggles, after the city generator is mastered:** SEWERS derived from the
  built city by medieval-appropriate rules (streets/terrain drainage/outfalls; realism preset default, fantasy-tunnel
  preset optional) and FLOATING ISLANDS (1–3 organic oval sky landmasses carrying neighbourhoods, shadows, no ground
  link by default). Base keeps hooks: layers (underground/ground/sky), drainage queries, neighbourhoods on any outline.
- Single-agent lane prompts are saved under `workflows/lane-prompts/`.

---

## 1. What this program is

Goal: (1) an honest, evidence-based answer to *"how confident are you of reproducing their code and deriving it"* for
four reference generators — watabou's Medieval Fantasy City Generator (MFCG), Village Generator (VG), Neighbourhood
(NG) and Thomas Allerton's Fantasy Town Generator (FTG); (2) a comprehensive, **adversarially validated, original**
code architecture that reaches parity with all four **and improves on them**; (3) a program that records what the CPU
does while each site generates a map, plus the visual side of the output.

Standing owner rulings (all 2026-09-21, binding on any future session):
1. **Completely standalone.** Nothing from any other project on this machine (in particular `settlement-engine`) is an
   input, a constraint, or a judging criterion. (Owner veto of an earlier "standalone but compatible" call.)
2. **Improve, not just recreate.** Parity is the floor; every improvement names the weakness it answers and how the
   gain is measured; restraint matters (do not lose what the references get right).
3. **Model tiers:** Opus for reader/extraction agents, Fable for critics, judges, architects and red team. *Widened by the owner on 2026-09-25:* Fable = manager, judgment, architect, validator; Opus = verifier, recon, implementer, surveyor — managed by Fable (workflow 03's post-revision Verify seats therefore run on Opus).
4. **Record progress regularly** in `docs/PROGRESS.md` (`python3 tools/progress.py --log "…"`), per lane.
5. **Clean-room:** TownGeneratorOS is GPL-3, the live builds are proprietary. Learn ideas, never copy/port code; agents
   do not open the captured JS bundles; the references' data assets quoted in findings (naming grammars, name corpora,
   palette values, FTG tables, textures) are documentation only — original content must be authored.

## 2. What exists on disk (all under `/Users/cstokes/Desktop/Maps`)

| Path | What |
|---|---|
| `docs/PROGRESS.md` | Per-lane ledger regenerated from disk state + append-only hand log. **Read first.** |
| `docs/PLAN.md` | Phases, ground rules, deliberate deferrals. |
| `research/patreon/` | 153 Patreon posts with full comment threads and images: `watabou-city` (30), `watabou-village` (28), `ftg` (30), `watabou-extra` (65 posts OUTSIDE the two collections — where "Recursive bisection with a twist", "Straight skeletons", Neighbourhood, City Viewer, Urban Places and the tutorials live). `watabou-all-posts.json` lists all 212 campaign posts. |
| `research/devlogs/` | 73 itch.io devlogs (MFCG 46, VG 21, NG 6) with images and comments. |
| `research/ftg-docs/` | 36 pages of FTG's public user guide + images. |
| `research/ftg-capture/` | `create-request.json` (the full generation-parameter body, "Medieval europe" preset), `presets.json` (buildings, resource graph, professions, items, sizes), `layout-structure.md` (schema-less decode of the 593 KB protobuf layout), reader scripts. |
| `research/findings/*.md` | **The expensive artefact.** 22 extraction files (≈1.6 MB) — every technique tagged STATED / SHOWN / INFERRED / NAMED-ONLY with source ids; plus `_critic.md`. |
| `research/worklists.json` | Exactly which source directories each reader lane covered. |
| `reference/` | `TownGeneratorOS` (GPL-3, read-only study), `towngenerator-foundrymodule` (MIT; entity model + postMessage protocol). |
| `profiler/` | The recording program (README inside): `record.mjs` (profile / coverage / draw passes), `analyze.mjs` (class-attributed reports), `session.mjs` + `drive.mjs` (step-by-step recorder for one-shot, server-side FTG). |
| `captures/` | MFCG ×2, Village ×3, Neighbourhood ×4 (incl. the post-critic `ring` capture), FTG ×2 — each with `report.md`. FTG settlement "Galeiaward" (City, Medieval europe, coastal, river, farms, forests, natural area, walled) created 2026-09-21 ≈05:17 UTC; FTG allows one new temporary settlement per IP per day. |
| `tools/` | `patreon_scrape.py`, `devlog_scrape.py`, `ftg_docs_scrape.py`, `pb_raw.py`, `progress.py`. |
| `workflows/` | `01-understand-town-generators.js` (done), `02-understand-watabou-extra.js` (done), **`03-assess-design-validate.js` (written, syntax-checked, NOT launched).** |

## 3. How to start the adversarial review later (Phase 4–6)

Say so in the new chat (the owner's go-ahead is required), then:

```
Workflow({ scriptPath: "/Users/cstokes/Desktop/Maps/workflows/03-assess-design-validate.js" })
```

What it does (≈40 agents; the largest spend of the program):
1. **Assess** — 4 Fable assessors (one per reference) → `docs/confidence/<ref>.md`: capability matrix with four separate
   confidences (functional equivalence · visual comparability · algorithm identity · seed-exact).
2. **Challenge** — 8 Fable skeptics (over-confidence and under-confidence lens per reference) spot-check the original
   sources → `docs/confidence/<ref>-challenge-{over,under}.md`.
3. **Mine** (parallel) — 4 Opus weakness miners over findings + original comment threads + recordings →
   `docs/improvements/<ref>.md`.
4. **Report** — Fable → `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md`.
5. **Design** — 3 independent Fable architects (geometry-kernel-first · pipeline/determinism-first ·
   renderer/product-first) against a 17-point specification → `docs/design/proposal-*.md`.
6. **Judge** — 3 Fable judges (capability parity · improvement realism & restraint · engineering soundness).
7. **Synthesize** — Fable → `docs/design/judging.md`, `docs/ARCHITECTURE.md`.
8. **Red team** — Opus coverage audit of every extracted capability + 6 Fable lenses (geometry robustness · determinism
   & state lifecycle · performance & scale · visual parity · FTG-class parity · improvement claims/scope/licences).
9. **Revise → Verify**, loop until no blocker/major remains (max 2 rounds) → `docs/ARCHITECTURE-VALIDATION.md`.

Every agent writes its file as it goes and appends to `docs/lane-events.log`, so a mid-run account switch loses nothing
that has landed. Workflow run caches do not travel between sessions: to resume a half-finished run elsewhere, check
`docs/PROGRESS.md`, delete the finished stages' agents from the script (or guard them on file existence) and re-run.
Cheaper variants if wanted: one skeptic per reference instead of two; one revise/verify round instead of two.

## 4. Things a newcomer would otherwise re-learn the hard way

- Patreon: the built-in browser blocks patreon.com; the public JSON:API works without login (`tools/patreon_scrape.py`).
- watabou builds keep `Var.__name__="pkg.Class"` markers → `analyze.mjs` attributes CPU time and exact call counts to
  original class names. Enter regenerates; the URL is rewritten with seed + blueprint after each generation; MFCG
  traces its own stage timings. Reload-mode captures must wait for the generator's console marker (fixed).
- FTG generates server-side (`PUT /prod/settlements` → id; `GET …/layout` → gzip'd protobuf streamed into a WASM
  decoder, so the normal DevTools body capture is EMPTY — `session.mjs` intercepts at the Fetch response stage). The
  create dialog has a same-named hidden button behind it; `drive.mjs clicktext` only clicks hit-testable elements.
- Profiler attribution was cross-checked against MFCG's own stage timer (profile 143/230/113 ms vs console
  162/260/125 ms for `buildGeometry`).

## 5. Critic outcome (`research/findings/_critic.md`, Fable, 42 KB)

**Coverage — complete.** All 226 worklist entries (153 Patreon posts, 73 devlogs), all 36 FTG guide pages, all 59
TownGeneratorOS source files, the Foundry module and `research/ftg-capture/*` are cited in the findings: **0 uncited
sources.** One real hole was found and closed by the critic: two Neighbourhood recordings (`large,square,leafy` and
`small,street`) that no reader had used; it analysed them and appended an addendum to `profile-neighbourhood.md`.

**Spot-checks — 24 `[STATED]` claims opened at source, 24 supported**, 0 unsupported (one wording nit). Recorded-count
claims re-derived from `calls.json` reproduce exactly.

**Contradictions between findings files — 15 found; 11 resolved, 3 reconciled, 1 open-but-narrowed.** The ones that
change what a designer would believe:
- MFCG population constant is ≈ **6.12–6.13 persons/building**, not 6.29 (C1).
- `PoissonPattern` is a domain-warped Poisson-disc sampler with **k = 50 candidates per step**, not an 80×80 lattice;
  static-initialised in MFCG, lazy in NG (C2/C3).
- MFCG `Castle.equalize` and the Warp "Equalize" tool equalise a cell's **angles**, not edge lengths (C4/C5).
- NG's four call-count "identities" are **template-specific**; general forms are in the addendum (C6).
- **VG stage order (measured from profile timestamps):** elevation first (river dug inside it) → water → density →
  roads (`Tracker`s inside `Region.roll`) → buildings → fields → forest (C7/C8). VG roads are steered agents, **not**
  A*/Dijkstra over the height field (C10). Fields come from Voronoi cells ringed round the village + OBB bisection (C9).
- **FTG pipeline order [STATED in its docs]: phase 1 decides buildings AND people before any geometry; phase 2 builds
  the map — water first → staged road network & districts → suburb → outer settlement (farms/forest)** (C12). The
  roster drives the map, not the other way round — relevant to any "simulation last and optional" design.
- Twisted bisection: the creator's stated construction (cut leaves and meets the boundary at right angles, one bend in
  the middle; FTG's author independently states the same 3 steps) is primary; the recorded OBB calls most plausibly
  choose where/which axis (C13, open-but-narrowed).
- `Canal.deltaRiver` = a river mouth that widens at the sea, **not** a braided delta (C15).
The critic wrote five addenda into the findings files themselves (`profile-neighbourhood`, `profile-village`,
`ftg-payload-visual`, `mfcg-devlogs-b`, `profile-mfcg`) and listed ~30 `[NAMED-ONLY]` items that another lane resolves
(cross-reference table in `_critic.md` §3 — **Phase-4 assessors should read that table first**).

**Remaining gaps at handoff (none blocks Phase 4; each is a way to raise confidence later):**
1. MFCG was recorded in its **default style only**: hip/gable skeleton roofs, trees, forests, alleys layer, district
   view, non-default tint methods and `gates ≠ −1` never executed. Needs a driven capture (style options live in the
   canvas menu, not the URL) — use `profiler/session.mjs --target mfcg --url <build url>` + `drive.mjs`. *Deferred.*
2. NG `ring` template — **recorded after the critic** (`captures/neighbourhood/2026-09-21T07-20-25`, `tags=ring,medium`,
   seeds 7171/7172; `RingHood` executed) but **not yet analysed by any reader**.
3. VG: what produces the river course before `createWater` (too cheap to be sampled at 100 µs). *Deferred.*
4. Twisted-bisection constants (bend position, edge choice, stop rule, street-width law, reject filter) are in no source.
5. External sources the posts reference but that are outside the corpus: watabou's Reddit outline of the generator and
   four other Reddit threads, itch post 422446, three r/FantasyCities write-ups, 13 Twitter/X videos, three palette SVGs.
   Two bodies are truncated at source (`ftg/99652534`, patron-only `watabou-city/46041997`). MFCG 0.11.3 has no post.
6. FTG unknowables from outside: road-legality thresholds, district-type scoring, wall tracing for "around all lots",
   render-time determinism (`seed: null` in our request), wire field 20.
7. The critic could not read all 1.63 MB of findings cover to cover (≈750k tokens); contradictions outside the ~30
   overlapping sections it cross-read may remain. Its own suggestion: a second critic seat on the FTG trio and on the
   `os-model` ↔ `os-wards-render` constant tables.

**Spend so far (for planning the next phase):** read workflow 01 = 20 agents, 5.17 M subagent tokens, 1 h 45 m;
workflow 02 = 2 agents, 0.55 M tokens, 23 m. Raw results/journals are saved in `research/findings/_workflow-results/`.

## 6. Provisional observations (NOT yet skeptic-challenged — treat as hypotheses for Phase 4)

- The posts state technique far more often than they merely show it (e.g. `mfcg-posts-a`: 90 STATED / 54 SHOWN /
  20 INFERRED / 5 NAMED-ONLY). Recordings then pin constants: MFCG seeds exactly `8·size + 4` cells; Delaunator +
  DCEL replaced the 2017 Voronoi; lots are cut by OBB-driven bisection; VG Poisson sampling uses exactly k = 50;
  128×128 heightmap; water-band widths 3^1.5 : 2^1.5 : 1; FTG's 15° turn cap and 50/60/30 m segment modes are visible
  in the payload statistics; FTG junctions are locally orthogonal with no global grid axis.
- Two algorithm families: watabou = partition space (cells → wards/districts → twisted bisection → lots);
  FTG = staged road-graph growth → districts from enclosed faces → lots → buildings. Both creators are converging on a
  planar subdivision as the single spatial truth (DCEL in MFCG, "base mesh" in Urban Places, road graph + polygon
  subtraction in FTG).
- Documented weaknesses to design against: whole-map discard-and-retry (MFCG river+coast size 80: 7 of 10 attempts
  discarded; VG highway validation failures), twisted bisection fragile on concave shapes, home-grown O(n²) straight
  skeleton that "glitches in special cases" yet feeds roofs, label spines and ridges, FTG duplicate-intersection and
  scale bugs. MFCG's citadel is already *repaired* rather than rejected — the principle to generalise.
- Design caution from the critic: FTG decides buildings and people BEFORE geometry (roster-first). A design that treats
  the people/economy layer as a late optional add-on must still let a roster drive building counts and types.
- Expected shape of the confidence answer: high for functional/visual parity of MFCG, medium-high VG/NG, medium FTG
  layout, lower FTG simulation/content (mostly authored data); algorithm identity varies stage by stage; seed-exact ≈ 0
  everywhere except where the 2017 source still applies.
