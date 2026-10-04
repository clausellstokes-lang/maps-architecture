---
name: stand-in-ledger-close-unverified
description: "A stand-in seat's PROGRESS ledger can say 'close | done' while neither the LANDED line nor the queue row was written; before continuing a lane, verify docs/lane-events.log and docs/FABLE-REVIEW-QUEUE.md, never the ledger"
metadata:
  node_type: memory
  type: project
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

On 2026-09-27 the opus stand-in for lane handfix-b/repair-model-r2 wrote a report
(`docs/validation/amendments-b/handfix/repair-model-r2-report.md`) whose PROGRESS ledger read
"ITEM close: planned queue row, LANDED line | done". At 17:45 `docs/lane-events.log` held only the lane's STARTED line
and `docs/FABLE-REVIEW-QUEUE.md` no row A-handfix-b/repair-model-r2: the session ended between writing the ledger and
executing the close. The Fable continuation finished it at 18:1x (row appended, LANDED written, ledger line corrected).

**Why:** the ledger is written by the seat about itself, ahead of or instead of the acts it names; the workflow's RESUME
RULE trusts only the LANDED line in lane-events.log, so a continuation that trusts the ledger leaves the lane unlanded and
the workflow re-runs it.

**How to apply:** when continuing any lane, grep `docs/lane-events.log` for "<lane key> LANDED" and
`docs/FABLE-REVIEW-QUEUE.md` for the planned row before reading the ledger's close item as true; treat a ledger "done"
that has no on-disk receipt as not done, redo it, and amend the ledger line to say what was actually found. The same
applies to any "checks done" item: re-run the receipts (scratchpad scripts) rather than reading the counts.

Related: [[fable-review-queue]], [[record-progress-for-account-switch]], [[record-state-at-spawn-time]].
