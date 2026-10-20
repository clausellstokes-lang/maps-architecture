# Child resume wave of 2026-10-20 — the parent's deltas to tools/session/child-recipe.md (binding with the recipe)

**Why this wave exists.** The eleven children of 2026-10-19 (V2, Lb, Ob2, Cb, X, Y, Z, AB, AE, AF, AG, on account A)
died with their managing session when that account's five-hour window exhausted at ~15:05Z on 2026-10-19; nobody
resumed them, their containers are gone, and their hand-backs went to a dead session. Each round's whole tree is on
its NEW branch (its last snapshot 14:32–15:05Z). This wave resumes every round in a FRESH child on another account,
from its branch, under the CONTINUE RULE (HANDOFF's "IF THIS SESSION IS LOST" recipe; J408 (3) (b)). The parent is
session_01F1FyLSKVBzYwVs2sNL8bcS (Fable 5.1, the managing seat); every hand-back goes to it.

## The deltas

1. **The base is the DESIGN BRANCH, not main.** main (4d5c192b) lacks the week's landings (J406–J443). In step 1
   replace `origin/main` by `origin/claude/great-galileo-b4mzbq`:
   `git -C $R fetch origin claude/great-galileo-b4mzbq && git -C $R checkout -q -B main origin/claude/great-galileo-b4mzbq`,
   then the OLD overlay exactly as step 1 says (`rm -rf $R/plat && git -C $R checkout origin/OLD -- plat docs/lanes.json`,
   OLD's lane lines the log lacks appended, `git -C $R reset -q`). plat/ is then EXACTLY the dead child's tree at its
   last snapshot. Files the design branch gained since that child's base show as deleted in `git status`: right, and
   it stays uncommitted. Confirm the round's lines with the two lane keys the parent gave, written out
   (`grep -c -E "<build key>|<check key>" $R/docs/lane-events.log` ≥ the parent's count).
2. **Never touch main, the design branch or any pull request; force-push only NEW** (rule 1). NEW is the new branch
   the parent names; OLD stays frozen as the record.
3. **Step 4's scratch is persistent:** set `"scratch"` to `/home/user/maps-scratch/waves` (never the session
   scratchpad; `mkdir -p` it) — a path that survives a container restart, so a finished RELATED or census log with its
   done-file is found again after a restart. `root` stays `$R`. The briefs are rendered on THIS machine, never copied;
   the design branch's specs.json carries every entry this wave needs (the parent added M0-c-01 S3, M0-b-02 S2 and
   M0-c-03 S4 for the rounds whose workflow-internal further round was killed).
4. **The killed round is the round** (step 5): FROM is the parent's number; set `"from": FROM` on the spec entry whose
   id is ID and whose round is TAG upper-cased, and with FROMDISK=yes set `"fromDisk": true` on it. Before launching,
   echo the two lane keys the rendered brief carries and confirm they equal the parent's BUILDLANE / CHECKLANE — if
   not, stop and report.
5. **The CONTINUE RULE, concretely.** The round's CHECKPOINT lines are in docs/lane-events.log (from OLD) and its
   files stand in the tree; a seat keeps what stands and continues from the first unfinished part. Anything that lived
   only in the dead container is GONE — mirrors, scratch logs, text drafted in a seat's scratch, a RELATED or census
   run without a done-file — and is re-run or redrafted; a LANDED build returns from disk (the RESUME RULE;
   `corepack pnpm landed:verify -- flow-7 --item ID` prints ok). The lesson of 2026-10-19: RELATED@1000 and any census
   or sweep over an hour run in the BACKGROUND with a log and a done-file under the lane's scratch
   (`( cmd > out.log 2>&1; touch done ) &`), waited for in the foreground in ten-minute chunks (the WAITING RULE); a
   finished log with its done-file is REUSED, never re-run; an unfinished one is re-run.
6. **Seats:** exactly the parent's SEATS — the workflow args' `"seats"` object, model and effort per kind (build, fix,
   check, recheck). The launch: `Workflow({scriptPath: "/home/user/maps-architecture/workflows/34-session-fix.js",
   args: {"id": ID, "briefs": "<absolute path of the brief>", "maxRounds": 3, "from": FROM, "seats": SEATS}})`,
   plus `"lane"` only when the parent names one.
7. **The window.** This account's five-hour window resets at 2026-10-20 20:00Z, then five hours after each window's
   first use. If the seats die of "You've hit your session limit" (the workflow ends with errors, or your own turn
   stops): snapshot once when you can and WAIT — the parent messages the resume after the reset (TaskStop the dead
   run; confirm the machine id and re-render by step 4 only if it changed; relaunch step 5 with the same args and the
   same FROM; restart the snapshot loop; one hand-back). If your CONTAINER restarts (uptime resets; /home/user/maps-scratch
   survives, /tmp does not): re-check Node 24 (step 2) and the install (step 3), confirm the machine id, re-render only
   if it changed, relaunch step 5 with the same args, restart the snapshot loop (step 6), and say so in the hand-back;
   after a second restart, snapshot, message the parent and stop.
8. **Mirrors.** rsync is absent on these containers: build a mirror with `cp -a` or tar, as the brief's MIRROR text
   says; never run `pnpm install` at the project root (child AB's incident of 2026-10-19 14:49Z left package.json,
   pnpm-lock.yaml and a node_modules/ stub at the root of wip/child-a07s1; a fresh child does not inherit them, since
   only plat/ and docs/lanes.json are overlaid — if any appears at $R's root, delete it: it is not the project's).
9. **Hand-back** (step 7): ONE message to the parent session_01F1FyLSKVBzYwVs2sNL8bcS in the recipe's format, its
   "notes" naming the machine id, the fitted args, any restart or relaunch, every REPORTED row, and whether
   landed:verify printed ok. A MERGED ROUND (two IDs on one branch, the MERGED-ROUND RULE of J443): the recipe run once
   per ID in the parent's order on ONE branch, no reset between, one LANDED line and landed record per ID, one hand-back
   naming both.
10. **The snapshot loop** to NEW (step 6) runs from right after the launch until the hand-back is sent; restart it
    each time it ends.
11. **Pre-round images** (the session's ruling J457 on d-05b s1's N-cs1-2): a closing checker that needs a file's
    pre-round image takes it from the author's change list and the landed record's hashes first; when those cannot
    give the content, it MAY read the plat/ blobs from the repository's object store with a read-only reader (a
    Python parse of .git/index and an inflate of the blob) on three conditions — no git binary is run and nothing is
    written; only plat/ paths are inflated (the index walk over every entry name stays in memory, nothing printed or
    used); and the verdict never rests on the image (scope claims come from the record and the diff; the image only
    says whether a pin is new). Disclose the read in the verdict and the CLEAN-ROOM row.
