# Child cloud session — launch recipe (ACCOUNT SWITCH 2; the parent session's J339)

A CHILD is a Claude Code cloud session the parent creates to run ONE round of the M0 programme on its own container
(J252's THROUGHPUT clause, J253). Its parent gives it, in the prompt: LETTER, ID (the item, e.g. M0-a-16), TAG (the
round's file tag: c1 for a consolidation round, s6 for a session fix round), OLD (the backup branch of the earlier child
that ran the round, e.g. wip/child-a16c1 — absent for a fresh round), NEW (the child's own backup branch, e.g.
wip/child-a16c1b), FROM (the round number), LANE (consolidate | flow | default), BRIEF (the rendered brief's file name,
e.g. prompts-a-16c1.json), SEATS (the workflow's seats, J252), FROMDISK (yes when the round's BUILD already LANDED and
the build seat only returns from disk), the lane keys BUILDLANE / CHECKLANE, the VERDICT file and STATE (where the round
stands). The parent's session id is in the prompt; the child reports to it by message. Everything below is binding.

## Rules

0. A child's standing rule (the parent's `append_system_prompt` at its creation) names its backup branch GENERICALLY —
   "the branch the parent's current instructions name for your current round" — never one branch by name: a child whose
   standing rule names one branch cannot take a later round on another branch (child F refused M0-a-06 s6 on that rule,
   correctly, 2026-10-13 18:19Z; the round went to a fresh session). A re-used child's reset to main is
   `git checkout -q -B main origin/main && git checkout -q -- . && git clean -fdq -- plat docs` (the previous round's
   work is landed and frozen on its branch); where the harness classes that reset as destructive, `git stash -u` is
   the lawful substitute.

1. `main` is the production line: NEVER push to main, never open or touch a pull request, never force-push any branch
   except NEW. The parent lands the round from NEW (tools/session/land_child.py) once its closing check LANDED.
2. The clean-room rule: the child never edits plat/ itself and never runs git for the seats; the seats run no git (their
   briefs say so) and only the item's owns change.
3. J209: never message a running workflow seat (SendMessage or Agent to a seat's id resumes a duplicate). If the
   workflow ends blocked or fails, report to the parent and stop.
4. Keep the child's own turns few and cheap: no large file reads, no polling, no sleeps waiting for the workflow — it
   runs in the background and its completion notification wakes the child.
5. If a setup step fails after three honest, different attempts, send the parent the error and stop.
6. Parallel Bash calls share one working directory: use absolute paths and `git -C`, never a bare `cd` in a parallel call.

## Setup (in this order)

1. Tree. `R=/home/user/maps-architecture; git -C $R fetch origin main && git -C $R checkout -q -B main origin/main`.
   With OLD (a resumed round): `git -C $R fetch origin +refs/heads/OLD:refs/remotes/origin/OLD; rm -rf $R/plat &&
   git -C $R checkout origin/OLD -- plat docs/lanes.json && git -C $R show origin/OLD:docs/lane-events.log |
   grep -vxFf $R/docs/lane-events.log >> $R/docs/lane-events.log; git -C $R reset -q` — plat/ is now EXACTLY the earlier
   child's working tree at its last snapshot (its base main plus the round's work); files main gained since show as
   deleted in `git status`, which is right and stays uncommitted. Confirm the round's lines:
   `grep -c -E "<BUILDLANE>|<CHECKLANE>" $R/docs/lane-events.log` with the two lane keys the parent gave written out
   (the log lines carry the keys themselves, never the words BUILDLANE / CHECKLANE; child H, 2026-10-18) — ≥ the count
   the parent gave.
   Without OLD (a fresh round): the tree is main as cloned; nothing to overlay.
   A CONTINUATION ON THE CURRENT MAIN (an item whose earlier seat returned BLOCKED on cross-item defects now fixed on
   main, e.g. M0-c-06 after J318/J348): OLD is a SEED branch (wip/seed-…) the parent built with
   tools/session/seed_child.py — main as it stands plus only that item's unchecked files from the earlier child's branch,
   its ledger rows renumbered where main took the id (the ID RULE), its lane lines, and its record re-landed; step 1
   is unchanged (the seed's plat/ is main's plus the item), and `git status` then shows nothing deleted.
2. Node 24.12.0 (the container ships 22; plat/package.json is engine-strict):
   `mkdir -p /tmp/n24 && cd /tmp/n24 && curl -sS -fL -o SHASUMS256.txt https://nodejs.org/dist/v24.12.0/SHASUMS256.txt
   && curl -sS -fL -o node-v24.12.0-linux-x64.tar.xz https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-x64.tar.xz
   && grep " node-v24.12.0-linux-x64.tar.xz$" SHASUMS256.txt | sha256sum -c - && mkdir -p /opt/node24 && tar -xJf
   node-v24.12.0-linux-x64.tar.xz -C /opt/node24 --strip-components=1 && mkdir -p /root/.local/bin && for t in node npm
   npx corepack; do ln -sf /opt/node24/bin/$t /root/.local/bin/$t; done && printf 'export
   PATH=/root/.local/bin:/opt/node24/bin:$PATH\n' > /etc/profile.d/nodejs.sh && rm -f node-v24.12.0-linux-x64.tar.xz`.
   /root/.local/bin precedes /opt/node22/bin on this container's PATH; verify in a FRESH Bash call that `node --version`
   prints v24.12.0 (the seats inherit the environment). If it does not, put
   `export PATH=/root/.local/bin:/opt/node24/bin:$PATH;` first in every later command.
3. Install and a sanity check: `( cd $R/plat && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install
   --frozen-lockfile && corepack pnpm landed:verify -- flow-7 --item ID )` — with FROMDISK=yes it must print ok (the
   LANDED build's record claims its files); for an unfinished build it may print FAIL on files the builder changed after
   its record — expected, note it, continue. `python3 $R/tools/machine_profile.py --id` is expected to print an id of the class
   linux:Intel(R) Xeon(R) Processor[ @ <clock>]:4cpu:16gib (the CPU model string may carry a clock suffix, J340 (4)); if
   the core or memory counts differ, step 4 fits the args to this machine anyway — say so in the hand-back.
4. Briefs (rendered on this machine, never copied): `S=<this session's scratchpad>/session-fix; mkdir -p $S/../waves;
   cp $R/workflows/lane-prompts/session-fix-cloud/{specs.json,render.mjs,args.base.json} $S/`; with python3 load
   $S/args.base.json, set root=$R and scratch=$S/../waves, write $S/args.pre.json;
   `python3 $R/tools/machine_args.py $S/args.pre.json --out $S/args.fitted.json`; with python3 load $S/specs.json, set
   "args" to $S/args.fitted.json and "workflow" to $R/workflows/23-build-m0-waves.js, and with FROMDISK=yes set
   "fromDisk": true on the round whose id is ID and whose round is TAG upper-cased (C1 / S6), write it back;
   `node $S/render.mjs $S/specs.json $S/briefs` (one line per round). The brief is $S/briefs/BRIEF.
5. THE KILLED ROUND IS THE ROUND (J401; children E and H, 2026-10-18): for a check-only resume FROM is the number of the
   round whose check was killed, and the spec entry rendered for it carries that round number ("from": FROM), so the
   brief's check lane key names the killed round's lane (close-s<FROM>) — a brief rendered from an EARLIER round's spec
   replays that round's own LANDED check line under the RESUME RULE and pushes the workflow into one more no-op round.
   Before launching, echo the two lane keys computed from FROM and confirm they are the ones the parent named.
   Launch with the Workflow tool (ultracode): scriptPath /home/user/maps-architecture/workflows/34-session-fix.js,
   args {"id": ID, "briefs": "<absolute path of the brief>", "maxRounds": 3, "from": FROM, "lane": LANE (omit the key
   for the default session lanes), "seats": SEATS}. Exactly these seats. It runs in the background.
6. Backups: right after the launch start a bounded loop as a background Bash (run_in_background, timeout 7200000):
   `for i in $(seq 1 12); do WIP_BRANCH=NEW bash /home/user/maps-architecture/tools/wip_snapshot.sh; sleep 600; done`.
   It ends after two hours and its end wakes the child: restart it (the same command) every time until the hand-back is
   sent. A snapshot copies the whole tree, uncommitted work included, to NEW and force-pushes only NEW.
7. Hand-back. When the Workflow's completion notification arrives: one last snapshot (`WIP_BRANCH=NEW bash
   $R/tools/wip_snapshot.sh`), then `grep -E "BUILDLANE|CHECKLANE" $R/docs/lane-events.log | grep -E
   "LANDED|BLOCKED|FAIL" | cut -c1-400` and `git -C $R rev-parse --short refs/heads/NEW`, then ONE message with the
   claude-code-remote send_message tool to the parent session: "HAND-BACK child LETTER ID TAG: workflow <ok, rounds,
   built.status, check.verdict, failing_lines count>; LANDED lines: <the lines>; verdict file
   plat/docs/build/checks/VERDICT; records <the landed/*.json names>; branch NEW @ <hash> (final snapshot <time>Z);
   notes: <anything the parent must know: a blocked seat, a machine-id mismatch, a verify FAIL>". Then stop — no further
   commands and no further messages until the parent writes.
