---
name: record-progress-for-account-switch
description: Owner directive — keep an on-disk per-lane progress ledger current because they switch Claude accounts at unknown times
metadata:
  type: feedback
---

Owner (2026-09-21): "make sure that you are recording progress regularly because I will switch accounts later at an unknown time. So record both what has landed and progress per agent/lane."

**Why:** a new account/session inherits no chat context and cannot resume a Workflow run cache; only files in the project folder survive.
**How to apply:** in `/Users/cstokes/Desktop/Maps` keep `docs/PROGRESS.md` current — run `python3 tools/progress.py --log "<what landed / what is running / run ids>"` after every landing, launch, or decision (the lane tables are regenerated from disk state; a lane is LANDED only if its output file exists). Save every workflow script into `workflows/` so missing lanes can be re-run elsewhere. Have every subagent write its work to a file as it goes. See [[maps-project-state]].
