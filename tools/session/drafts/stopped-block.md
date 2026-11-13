## STOPPED — 2026-11-13 «T» (THE OWNER'S STOP FOR A CHANGE OF ACCOUNT, J813 – «JLAST») — IF YOU ARE THE NEXT MANAGING SESSION, READ THIS BLOCK FIRST: IT IS THE STATE, AND IT REPLACES EVERY "RUNNING NOW" BLOCK BELOW

**What happened.** The owner said, in the managing session at 08:36Z on 2026-11-13: *"Find a good stopping point for everything. Assume I'm going to pick this up in a different account lose nothing for seemless resume. When you have found a good stopping point, end that agent and task."* Everything this account ran has been ended: every round child, gate child and sweep child and the watch seat is ARCHIVED, both scheduled tasks are DISABLED (they never fire again), no agent seat is running, and the managing seat (session_01FE9mEtLt7vrTK6rqujyvUK, account 3) wrote this block as its last act. **Nothing is running anywhere.** You cannot see any of those sessions, containers, scheduled tasks or scratch folders, and you do not need to: the repository holds everything.

**Where everything is.**
- **The line** is the design branch `claude/great-galileo-b4mzbq` at «HEAD». `main` is «MAIN». The old managing branch `claude/great-bell-qm3tio` is level with the design branch and is no longer anybody's: your session has its own branch (the harness names it) — fast-forward it to the design branch and use it as "MYBRANCH" (tools/session/takeover-settings.md).
- **The ledger** docs/PROGRESS.md ends at «JLAST»; the day of the stop is J808 – «JLAST». **The fix queue** docs/M0-FIX-QUEUE.md: the next free row is «QNEXT». **The landings:** «LANDINGS» are on the line; the next free ledger ids in plat/ are CLEAN-ROOM «LNEXT», choices «CNEXT».
- **The stopped rounds** are on `wip/child-*` branches, each with its tree, its lane log and — where a chain was cut — its chain files under `stash/<LETTER>/` (tools/session/stash_waves.py). The table below has one row per round to resume, and a launch file for each is already on the design branch.
- **The settings** of every kind of session and of the two scheduled tasks, word for word: tools/session/takeover-settings.md.

**Your first hour, in this order.**
1. Set yourself up (takeover-settings.md §0): Node 24.12.0, the install in plat/, `/home/user/maps-scratch/busy.txt` holding ONE line — `«BUSY»` —, your branch fast-forwarded to the design branch.
2. Read: this block; docs/PROGRESS.md rows J796 – «JLAST» (the last two days: the container restarts and the rules that came of them, the gate, the stop); docs/validation/pass-b-triage-2026-11-13/triage.md (the map of every open queue row); THE OWNER'S STANDING WORDS below.
3. Recreate the watch seat and the two hourly scheduled tasks (takeover-settings.md §4); set `"parent"` in workflows/lane-prompts/session-seats/children/live.json to your session id.
4. Resume the stopped rounds (the table): for each, `create_session` with takeover-settings.md §1's settings and PARENT = your session id; add the row's live.json entry (`python3 tools/session/drafts/livejson.py add '<json>'`); one ledger row for the wave. They do not depend on one another: launch them together.
5. Land what is passed and not landed («UNLANDED»).
6. Land hand-backs as they come (takeover-settings.md §6), each through a gate child; then bind what the landings open — THE PLAN below.

**THE STOPPED ROUNDS — what to resume.**

«TABLE»

**THE OWNER'S STANDING WORDS (each in force; none is to be re-argued).**
- "Please continue the pending work. Please use the best and appropriate combination of Claude AI models and effort per model for the most effective and efficient usage of tokens for each task. I also hereby give you full permission for anything you require and I also defer all judgement to you." — so: decide, record the ruling as vetoable in the ledger, tell the owner in plain language; ask only what is truly the owner's.
- J238: M0 is the bedrock — fix everything in M0. J754: the owner answered a finish-line proposal with "No… just keeo triaging" — NO FINISH LINE IS DRAWN; never re-raise it.
- "Remove the ultracode review": no Workflow-tool multi-agent review; single agent seats (the Agent tool) and children only.
- "Feel free to keep launching until we run out. Just know I'll pick it back up on a different account."
- "Make the heartbeat once every hour" (J781).
- Mills are no longer bound only to water (docs/AMENDMENTS-2026-11-09aa.md); "To the five questions I defer to you" (J806: the five proposals of item 995 stand as rulings).
- The owner's word J558 puts the Mac timing steps before M0-a-16's two public-API rows; the contracts round's façade member `dryRun` is built before them by ruling R7 (J803), said to the owner twice and vetoable.
- Privacy: the owner's e-mail address and project details never go to an outside service. Commits end with the two trailer lines of YOUR session (Co-Authored-By and Claude-Session); no model identifier in commits, pull requests or code comments beyond the seat-tier names the ledger already uses. A pull request is opened only under the programme's standing word (J462 / J492: the live draft from the design branch to main is merged at a record and the next one opened).
- The owner reads plain language: report in complete sentences, lead with what happened, and name every ruling that touches the owner's own words.

**THE DECLARED REDS OF THE HEAD (read every gate against this list; J786, J793, J798, J801, J812).** «REDS»

**THE PLAN FROM HERE (what binds when; every entry bound carries the RESTART paragraph, J810, and the SCAN TESTS sentence, J812).**
- **When the router round lands** (the resumed M0-a-05 S16; land it with the records of S14 and S15 before S16's; open the queue row of its residual — the 195, the trio's class-C case, the surviving mutants — and spec the residual round from plat/docs/build/checks/M0-a-05-s16-evidence/residual-cases.tsv; re-run S20's quoted runner on the merged tree, J769): bind **round 2B's round A** — docs/validation/2b-spec-2026-11-12/v5/ (spec-a09-s22.json; README.md says what the binding still owes); the two-leg child **M0-c-03 S5 + M0-a-08 S6** (Q187 (b); Q64 / Q83 B2; with Q211 and Q212); the RQ2 round's third leg (docs/validation/rq2-spec-2026-11-11/split-2026-11-13/README.md) once M0-a-06 S10 has landed too.
- **When M0-a-06 S10 lands** (the resumed second leg of child ED's round, with M0-a-02 S4): bind **the contracts round** — docs/validation/a05-contracts-spec-2026-11-13/ (rulings-final.md R1 – R13; three entries: M0-a-06 S11 → M0-e-03 S6 → M0-c-04 S8, each only if the one before PASSED; the stage legs also need M0-c-04 S7 landed); then **Q181's round** (M0-a-06 S12 → M0-a-13 S4, with Q194 – Q196, Q182 (a), Q183, Q184 and Q213 (a)).
- **Later, in J748 (2)'s order:** round 2B's round B (the shift; docs/validation/2b-spec-2026-11-12/v4/spec-a09-s22.json keyed S23, with Q110's parts, Q152's six, the amendment and the owner's paragraph); the re-profile (then decide Q129, Q130, Q69 (a), (d)); M0-b-03 S9 + M0-b-02 S3; round 3 (M0-a-03 S2); round 4; M0-f-03b S2; the end-of-phase batch (the final site-summary re-run with Q188, Q180 (c)'s reader line and (d), M0-c-06's corpusSpine re-fold; the edge suite's 1 000-seed write, Q177 (a); THE SEED SWEEP at full strength in sweep children; one whole-suite run); then the Mac timing steps (the owner), the re-budget decision, M0-a-16's held API rows, the ultra review, M1.
- **Small rows with no round yet** (pass B): Q213 (b) (M0-a-04 S8, a test); whatever the resumed rounds' closing notes open.

**WHAT DIED WITH THE ACCOUNT, AND WHERE ITS PRODUCT IS.** The managing container's scratch (/home/user/maps-scratch): the entry builders (copied to tools/session/drafts/entry-builders/), the gate and sweep logs (their summaries are in the ledger rows and under docs/validation/j795-gate83-2026-11-13/, j801-seed279-2026-11-13/, j809-seed-sweep-2026-11-13/, j812-one-door-2026-11-13/), the 2B prototype worktrees (their diffs are in docs/validation/2b-spec-2026-11-12/measurement/). The agent seats (the 2B spec seat and its reviewer, the contracts spec seat and its reviewer, the pass-B triage seat, the Q181 ruling seat and its reviewer): each one's whole product is its folder under docs/validation/ — brief a new seat from the folder. The session's transcript: the ledger is the record.

**THE BUSY LIST:** «BUSY».
