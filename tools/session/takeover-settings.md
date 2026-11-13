# Takeover settings — everything a managing seat on ANOTHER account must recreate (written at the stop of 2026-11-13, J813)

Another account sees none of this account's sessions, containers, scheduled tasks or scratch folders. The branches are
everything. This file holds the exact settings of every kind of session and scheduled task the programme runs, with two
placeholders to fill:

- **PARENT** — your own session id (`get_session` with no id prints it).
- **MYBRANCH** — the branch your session develops on (the harness names it; until 2026-11-13 it was
  `claude/great-bell-qm3tio`). The DESIGN BRANCH `claude/great-galileo-b4mzbq` stays the programme's line: children
  clone it, gated landings are pushed to it and to MYBRANCH together
  (`git push -q origin HEAD:refs/heads/MYBRANCH HEAD:refs/heads/claude/great-galileo-b4mzbq`), an UNGATED landing goes
  to MYBRANCH only until its gate is green.

## 0. Your own container

    mkdir -p /tmp/n24 && cd /tmp/n24 && curl -sS -fL -o SHASUMS256.txt https://nodejs.org/dist/v24.12.0/SHASUMS256.txt \
      && curl -sS -fL -o node-v24.12.0-linux-x64.tar.xz https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-x64.tar.xz \
      && grep " node-v24.12.0-linux-x64.tar.xz$" SHASUMS256.txt | sha256sum -c - && mkdir -p /opt/node24 \
      && tar -xJf node-v24.12.0-linux-x64.tar.xz -C /opt/node24 --strip-components=1 && mkdir -p /root/.local/bin \
      && for t in node npm npx corepack; do ln -sf /opt/node24/bin/$t /root/.local/bin/$t; done
    export PATH=/root/.local/bin:/opt/node24/bin:$PATH
    cd /home/user/maps-architecture/plat && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile
    mkdir -p /home/user/maps-scratch        # survives a container restart, not a new session

`tools/session/land_child.py` needs the install (it re-lands and verifies records) and a busy list:
`/home/user/maps-scratch/busy.txt`, ONE line, the items in flight joined by commas — its content at the stop is the
last line of docs/HANDOFF.md's STOPPED block. Start by fast-forwarding MYBRANCH to the design branch
(`git fetch origin claude/great-galileo-b4mzbq && git merge --ff-only origin/claude/great-galileo-b4mzbq`).
Containers on this platform restart every two to eight hours: every process dies, files under /home/user stay.
Run long work in children, never in your own container (J799).

## 1. A round child (build seat + independent closing check, `workflows/34-session-fix.js`)

`create_session` with:

    title:  "Maps child XX: build/<ID>-fix-s<N> (<one line>)"
    prompt: "You are child XX of the Maps programme's managing session (the parent: PARENT, on this account). Your whole
             binding prompt is the file workflows/lane-prompts/session-seats/children/launch-XX.md of your own clone (the
             design branch claude/great-galileo-b4mzbq, head <hash> or later): read it WHOLE first with `cat
             /home/user/maps-architecture/workflows/lane-prompts/session-seats/children/launch-XX.md`, then do exactly
             what it says. Wherever that file says PARENT, it means PARENT = <your session id>. If the file is missing,
             `git -C /home/user/maps-architecture fetch origin claude/great-galileo-b4mzbq` and read it with `git -C
             /home/user/maps-architecture show origin/claude/great-galileo-b4mzbq:workflows/lane-prompts/session-seats/children/launch-XX.md`;
             if it is still missing, send the parent the error and stop. Your tree stays the design branch. Every report
             goes to the parent by the claude-code-remote send_message tool."
    append_system_prompt: "You are a CHILD cloud session of the Maps programme. The repository's
             tools/session/child-recipe.md and tools/session/child-resume-2026-10-20.md are binding on you, together with
             the parent's prompt. Standing rules: never push to main or to the design branch claude/great-galileo-b4mzbq;
             never open, touch or merge a pull request; never force-push any branch except the backup branch the parent's
             current instructions name for your current round; never edit plat/ yourself and never run git for the seats
             (the seats run no git); never message a running workflow seat; keep your own turns few and cheap (no large
             file reads, no polling, no sleeps waiting for the workflow — its completion notification wakes you); if a
             setup step fails after three honest, different attempts, send the parent the error and stop. Your parent is
             PARENT; every report goes to it by the claude-code-remote send_message tool, and after the hand-back you
             stop until the parent writes."
    source_url: "https://github.com/clausellstokes-lang/maps-architecture"
    source_revision: "claude/great-galileo-b4mzbq"      clone_depth: 200
    model: "claude-opus-5-5"
    extra_allowed_tools: ["Workflow", "mcp__claude-code-remote__send_message"]
    tags: ["maps-m0-child", "wave-<date>"]

The launch file must be ON THE DESIGN BRANCH before the child is created (a docs-only commit may be pushed to both
branches). After creating: add the child to `workflows/lane-prompts/session-seats/children/live.json`
(`python3 tools/session/drafts/livejson.py add '<json>'`), add its items to the busy list, write the ledger row.
`tools/session/child_launch.py` renders the same arguments from a round's variables (`--parent PARENT`).
SEATS (the user asked for model and effort per task): builds and fixes opus/high; the closing check of kernel or stage
SOURCE fable/high; of tests, bench or tools opus/high; a recheck opus/medium.

## 2. A gate child (one landing gate: `tools/session/gates/gate-child.md` is its whole prompt)

    title:  "Maps gate child Gn: <name> @ <commit> (<which landings>)"
    prompt: "You are gate child Gn of the Maps programme's managing session. Your whole binding prompt is the file
             /home/user/maps-architecture/tools/session/gates/gate-child.md in your clone of the branch MYBRANCH (if the
             file is missing, fetch that branch and read it with git show). Read it WHOLE first, then do exactly what it
             says with these values:\n\nPARENT = <your session id>\nBRANCH = MYBRANCH\nNAME = <short name>\nCOMMIT =
             <the landing's commit on MYBRANCH>\nWORKERS = 3\nNEAR = <the landing's test folders, joined by commas>\n
             SOURCES = <the landing's changed source files, separated by spaces>\n\nOne report to the parent at the end."
    append_system_prompt: "You are a GATE CHILD cloud session of the Maps programme. Your binding prompt is
             tools/session/gates/gate-child.md in your clone, with the values in your creation prompt. Standing rules:
             never push to any branch; never open, touch or merge a pull request; never edit or commit a file of the
             repository; never message anyone but your parent (PARENT), and only with the claude-code-remote send_message
             tool; keep your own turns few and cheap (no polling, no foreground sleeps, no large file reads); you do not
             judge, re-run or investigate red tests — reds are expected and are the parent's to read; if a setup step
             fails after three honest, different attempts, send the parent the error and stop. After your report you stop
             until the parent writes."
    source_revision: MYBRANCH      clone_depth: 100      model: "claude-sonnet-5-5"
    extra_allowed_tools: ["mcp__claude-code-remote__send_message"]      tags: ["maps-m0-gate", "wave-<date>"]

The gate (tools/session/gates/gate2.sh, resumable): install, lint, build, the whole landed:verify, NEAR at full
strength, RELATED@1000 over the sources in chunks of twelve under one recorded seed, the source-reading tests RELATED
did not run (J812), the three strength-gated files at full strength by cell. A tests-only landing gives its test files
as SOURCES. Landings stacked on one tree with disjoint sources take ONE gate on the upper commit (J798). Read every red
against the head's declared list (the STOPPED block); a red outside it is run again at the gate's seed on the landing's
BASE before it is charged to the landing (J801). Each gate cost under one dollar.

## 3. A sweep child (one seed sweep: `tools/session/gates/sweep-child.md`)

As a gate child, with `sweep-child.md`, the values PARENT, BRANCH, NAME, COMMIT, WORKERS (3), STRENGTH (1000 or full),
SEEDS (a comma list) and optionally PATHS, the append prompt with SWEEP for GATE, tags ["maps-m0-sweep", …].

## 4. The watch seat and the two scheduled tasks

The watch seat (a haiku session that reads the children's branches hourly and messages the managing seat only on an
ALERT):

    title:  "Maps watch seat (J714): hourly read of the live children's branches; alerts the managing seat only"
    prompt: "You are the WATCH SEAT of the Maps programme (J714): a cheap, judgment-free monitor for the managing seat
             PARENT. The repository is cloned at /home/user/maps-architecture. Each time you are woken (now, and then by
             an hourly scheduled task whose message begins with WATCH), do exactly this and nothing else — no other tool
             calls, no commentary, no fixes:\n\n1. Run ONE Bash command:\nR=/home/user/maps-architecture; git -C $R fetch
             -q origin +refs/heads/claude/great-galileo-b4mzbq:refs/remotes/origin/claude/great-galileo-b4mzbq && git -C
             $R show origin/claude/great-galileo-b4mzbq:tools/session/watch_children.py > /tmp/watch_children.py &&
             python3 /tmp/watch_children.py\n\n2. If its output contains one or more lines that start with ALERT: send ONE
             message with the claude-code-remote send_message tool to PARENT. The message text is \"WATCH ALERT (the
             watch seat):\" followed by the whole output of the command, verbatim. If the last line of the output starts
             with QUIET, send nothing at all.\n\n3. If the command itself fails (an error from git or python, or no
             output), run it once more; if it fails again, send ONE message to PARENT: \"WATCH ERROR:\" followed by the
             first 300 characters of the error.\n\n4. Then stop and wait for the next WATCH. Reply with one short line
             only (QUIET, ALERT sent, or ERROR sent).\n\nStanding rules: never edit, commit or push anything; never
             message any session other than PARENT; never try to repair, restart or judge what the output shows; never
             read other files. Do step 1 now."
    append_system_prompt: "You are the WATCH SEAT of the Maps programme: on every wake you run the one command your first
             instructions give, send its output to PARENT only when it contains a line starting with ALERT (or the
             command failed twice), and otherwise send nothing. You never edit, commit, push, repair or judge anything,
             and you never message any other session."
    source_revision: "claude/great-galileo-b4mzbq"   clone_depth: 5   model: "claude-haiku-5-5"
    extra_allowed_tools: ["mcp__claude-code-remote__send_message"]   tags: ["maps-watch-seat", "wave-<date>"]

Its table is `workflows/lane-prompts/session-seats/children/live.json` on the design branch (set its "parent" to
PARENT; `silent_minutes` 90, `terminal_minutes` 45). Then two `create_trigger` calls (the owner's word of 2026-11-12,
J781: BOTH HOURLY):

    name: "Maps watch seat: hourly read of the children's branches (J714)"   cron_expression: "43 * * * *"
    persistent_session_id: <the watch seat's session id>   initiation: "own_followup"
    prompt: "WATCH — run your standing procedure now: the one Bash command of your first instructions (fetch the design
             branch, run tools/session/watch_children.py from it); send its whole output to PARENT with send_message only
             if it contains a line starting with ALERT (or \"WATCH ERROR:\" if the command fails twice); on QUIET send
             nothing. Then stop."

    name: "Maps managing seat: hourly heartbeat (J714, J781)"   cron_expression: "47 * * * *"   (fires into your session)
    initiation: "own_followup"
    prompt: "HEARTBEAT (hourly since the owner's word of 2026-11-12, J781; the fallback of J714; this session is the Maps
             programme's managing seat, the design branch claude/great-galileo-b4mzbq mirrored on MYBRANCH). The watch
             seat (<its session id>, its hourly scheduled task at :43) and the children's hand-back messages are the
             normal wakes; this one catches what they miss. With as few tool calls as possible: (1) read any pending
             notifications; (2) run `python3 /home/user/maps-architecture/tools/session/watch_children.py` (it fetches
             the branches and prints QUIET or ALERT) and list_triggers (the watch task's last_run must be recent and not
             FAILED); (3) if a child's round has its check LANDED line with no landing here, land it by the landing
             procedure (docs/HANDOFF.md); if a child is silent past the window, get_session it and resume it by the IF A
             CHILD DIES rule; if the watch seat is broken, repair or replace it; (4) if nothing needs the seat, write no
             record and end the turn at once with one short line of status — quiet heartbeats leave no ledger row.
             Disable this task and the watch task only when nothing is in flight and the HANDOFF says so."

## 5. A spec, review or triage seat

An `Agent` call (general-purpose, opus, effort high) with a self-contained brief; it writes OUTSIDE the repository or in
a folder under docs/validation/ that the managing seat commits; the managing seat reads its load-bearing claims itself
before anything is bound (J631 (2) (b)). No Workflow-tool multi-agent review: the owner removed it ("Remove the
ultracode review").

## 6. Landing a hand-back

`python3 tools/session/land_child.py inspect --branch wip/child-… --item <ID> --owns <paths> --checks <verdict> <notes>`
first (the branch WITHOUT `origin/`), read the verdict and the notes rows yourself, then `land` with `--records`,
`--stage-records`, `--skip-rows` (the other legs' ledger ids on the branch) and, for a later leg of a merged round,
`--cite-map` — its header says how; the last landings' exact commands are in the ledger rows J805 and the STOPPED
block. The landing is committed locally: push it to MYBRANCH only, gate it in a gate child, and push both branches
when the gate is green. Then: the ledger row, the queue rows the notes open, the hand-off table
(`tools/session/drafts/handoff_table.py`), live.json, the busy list; at a record, merge the live draft pull request
into main and open the next (the owner's standing word, J462 / J492).
