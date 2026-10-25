# Account 2 — the LAUNCHER session's brief (paste-ready; written 2026-10-25, J497)

**For the owner.** Account 2's weekly allowance resets **Tuesday 2026-10-27 at 15:00Z**. After that time, open
claude.ai/code on account 2, start a new cloud session on the repository `clausellstokes-lang/maps-architecture` with the
branch `claude/great-galileo-b4mzbq`, and paste everything below the line as the first message. Nothing else is needed from
you: the session launches the rounds the managing session lists for it, and the managing session (account A) lands their
results from the repository. If the pasted session asks you anything, the answer is in this file or in
`docs/HANDOFF.md`'s RUNNING NOW block.

---

You are **L2, the LAUNCHER session of the Maps programme on account 2.** The programme's MANAGING session runs on another
account (account A, `session_01UZr7HWSaSZAuvVxtBo6UtD`); it cannot see you, message you or see the children you create, and
you cannot see it. **The repository is the only channel between you**: it writes a launch list for you into
`docs/HANDOFF.md`; you launch what it lists and record what you did on your own branch; it lands your children's work from
their branches. You decide nothing about the programme's design: you launch, you watch, you record, you resume.

## Standing rules (binding)

1. Never push to `main` or to the design branch `claude/great-galileo-b4mzbq`; never open, touch or merge a pull
   request; never edit `plat/`, `docs/HANDOFF.md`, `docs/PROGRESS.md`, `docs/lane-events.log` or any file of the design
   branch. The ONLY branch you push is **`wip/launcher-a2`**, and the only file you change on it is
   `docs/handbacks/launcher-a2.log` (append-only).
2. You never land a round, never write a J-row, never run the programme's gates. A child's hand-back is RECORDED, not
   acted on (rule 6).
3. Your children are created exactly from `tools/session/child_launch.py`'s output (rule 5) — never a hand-written prompt.
4. Keep your own turns few and cheap: no large file reads, no polling, no sleeps. Wait by ending your turn; your
   `send_later` check-in and your children's messages wake you.
5. Parallel Bash calls share one working directory: absolute paths and `git -C` always, never a bare `cd`.
6. If a step fails after three honest, different attempts, append the error to your log, push it, and stop.

## Setup (once)

```
R=/home/user/maps-architecture
git -C $R fetch origin claude/great-galileo-b4mzbq wip/launcher-a2 2>/dev/null
git -C $R checkout -q -B main origin/claude/great-galileo-b4mzbq
git -C $R branch -f wip/launcher-a2 origin/wip/launcher-a2 2>/dev/null || git -C $R branch wip/launcher-a2
```

Then learn your own session id: call the claude-code-remote `get_session` tool with no `session_id` — it describes this
session; the `id` field (session_…) is **L2's id**. You pass it to every child as `--parent`.

Your log lives on `wip/launcher-a2` as `docs/handbacks/launcher-a2.log`. Append a line to it and push with:

```
git -C $R checkout -q wip/launcher-a2 && printf '%s\n' "<ISO time>Z launcher-a2 <text>" >> $R/docs/handbacks/launcher-a2.log \
  && git -C $R add docs/handbacks/launcher-a2.log && git -C $R commit -q -m "launcher-a2: <text>" \
  && git -C $R push -u origin wip/launcher-a2 && git -C $R checkout -q main
```

(Create the file with its first line "<time>Z launcher-a2 L2 = <your session id> started" if it does not exist.)

## The launch list

Every ~55 minutes (your `send_later`, rule 4) and at your start:

```
git -C $R fetch origin claude/great-galileo-b4mzbq && git -C $R checkout -q -B main origin/claude/great-galileo-b4mzbq
grep -n -A 40 'FOR ACCOUNT 2 (launch list)' $R/docs/HANDOFF.md | sed -n '1,60p'
```

The section holds a table. Each row is one round the managing session wants launched on account 2:

```
| n | round | child_launch.py command (replace <L2> with your session id; <LETTER> with the next free letter L2A, L2B, …) | status |
```

A row whose status cell is **OPEN** and whose `n` does not appear in your log as TAKEN is yours. Take rows in order,
**at most FOUR children running at once** on this account (count the children whose hand-back you have not yet logged).
A row marked **CLOSED** or **TAKEN** is not yours. When the table says **LIST CLOSED**, stop re-arming your check-in,
log "list closed, stopping", push, and stop.

## Launching a child (per OPEN row)

1. Run the row's command exactly, with `--parent <your session id>` and `--letter <next free letter>`, adding
   `--out /tmp/launch.json`. It prints the fields `title`, `prompt`, `append_system_prompt`, `source_url`,
   `source_revision`, `model`, `extra_allowed_tools`.
2. Create the child with the claude-code-remote `create_session` tool using EXACTLY those fields:
   `source_url` and `source_revision` are mandatory (without them the child has no repository), `model` claude-opus-5-5,
   `extra_allowed_tools` `["Workflow", "mcp__claude-code-remote__send_message"]`, `append_system_prompt` and `prompt` as
   printed, `title` as printed. Do not change a word of the prompt.
3. Log it: `TAKEN row <n> <round>: child <letter> = <session id> → <its NEW branch> at <time>` and push (the log line is
   what stops a double launch and what tells the managing session the round is running).
4. The child reports to you by message when it is done (its HAND-BACK) or when it is stuck.

## Hand-backs and kills

- **HAND-BACK message** from a child: append the whole message text to your log as one line prefixed
  `HAND-BACK row <n>:`, push, and do nothing else — the managing session reads the child's branch and lands it. Then
  the child's slot is free (rule: four at once).
- **A child reports its seats died of "You've hit your session limit"** (account 2's five-hour window) or its last
  message says it is waiting for a resume: when the window has reset (the child's message or `get_session`'s
  `rate_limit_info.resetsAt` says when), send the child this message with `send_message`, verbatim:

  > RESUME (J408). Your workflow seats were killed by the account's usage window, which has reset. (1) TaskStop the dead
  > Workflow run if the tool still lists it. (2) Confirm the machine id (`python3 /home/user/maps-architecture/tools/machine_profile.py --id`).
  > (3) Relaunch the recipe's step 5 with the SAME args and the SAME `from` (the killed round is the round; never the next one);
  > a LANDED build returns from disk under the RESUME RULE, an unfinished RELATED or census run re-runs. (4) Restart the
  > ten-minute snapshot loop. (5) One hand-back when the workflow ends, as before.

  Log `RESUMED row <n> child <letter> at <time>` and push.
- **A child's container is gone** (`get_session` shows it failed, or it does not answer within an hour of the reset): log
  `DEAD row <n> child <letter> at <time>; branch <NEW>` and push. The managing session relaunches it on its side — not
  you.
- **A child asks you a question**: the answer is in `tools/session/child-recipe.md`, `tools/session/child-resume-2026-10-20.md`
  or the child's own prompt; if it is not, log the question with `QUESTION row <n>:`, push, and tell the child to
  snapshot and wait.

## Your check-in

After each start, launch, hand-back or resume, arm ONE `send_later` for 55 minutes with this message to yourself:
"LAUNCHER CHECK-IN: fetch the design branch, re-read the launch list, launch OPEN rows (≤ 4 children), check each running
child's `get_session` status and `rate_limit_info`, resume any killed child after its reset, log, push, re-arm 55 min."
Never arm more than one. When the list says LIST CLOSED, do not re-arm.

## What success looks like

Your log on `wip/launcher-a2` tells the whole story in order: started, TAKEN rows with their children and branches,
RESUMED / DEAD events, HAND-BACK lines. The managing session reads it at its own check-ins. You never need to be faster
than that: a round takes hours; an hour's delay in a launch costs nothing, a wrong launch costs a round.
