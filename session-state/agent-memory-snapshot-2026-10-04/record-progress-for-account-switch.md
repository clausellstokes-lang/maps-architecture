---
name: record-progress-for-account-switch
description: Owner directive — keep an on-disk per-lane progress ledger current because they switch Claude accounts at unknown times
metadata:
  type: feedback
---

Owner (2026-09-21): "make sure that you are recording progress regularly because I will switch accounts later at an unknown time. So record both what has landed and progress per agent/lane."

**Why:** a new account/session inherits no chat context and cannot resume a Workflow run cache; only files in the project folder survive.
**How to apply:** in `/Users/cstokes/Desktop/Maps` keep `docs/PROGRESS.md` current — run `python3 tools/progress.py --log "<what landed / what is running / run ids>"` after every landing, launch, or decision (the lane tables are regenerated from disk state; a lane is LANDED only if its output file exists). Save every workflow script into `workflows/` so missing lanes can be re-run elsewhere. Have every subagent write its work to a file as it goes. See [[maps-project-state]].

**Refinement (owner, 2026-10-18 00:58Z; J391 addendum):** "save progress per agent per task regularly as we are going to lose 5 hour window soon" — the five-hour usage limit kills every running seat at once (J365, J373), so: every seat writes its record file AS IT GOES under docs/validation/<program>/ and a lane line per checkpoint; a 5-minute loop autosaves the records to the session branch and snapshots the whole tree to a wip/cloud-autosave-* branch; HANDOFF carries each run's id, script, args and a continuation recipe that reads landed records from disk (a plain resume replays only an unchanged prefix).


## Addendum 2026-10-18 ~20:20Z (J401: the owner's "find a good stopping point for everything")

A stopping point = launch nothing new; bank what landed (a round whose check LANDED waits on its own backup branch, ready for land_child.py); stop the round with the most left to run with a STOPPED hand-back after a final snapshot; let rounds already deep in their final test run finish and hand back; write the per-round table (round, state, branch, next step) at the TOP of docs/HANDOFF.md. For a check-only child resume, pass args.from equal to the killed round and have the child echo its two lane keys before it launches.
