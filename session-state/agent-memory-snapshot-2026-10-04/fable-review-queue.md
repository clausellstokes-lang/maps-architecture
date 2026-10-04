---
name: fable-review-queue
description: Owner rule (2026-09-25) — when Fable is unavailable, Fable-role work runs on Opus as marked stand-ins and everything Fable has not touched is queued for review
metadata:
  type: feedback
---

Owner, 2026-09-25 (Fable exhausted mid-review): "run the rest on Opus 5.5, but mark everything that has not gone through the touch of Fable for review next time we have Fable."

Protocol in the Maps project: Fable-role seats (manager, judgment, architect, validator) run on Opus as STAND-INS (workflow args `{fableModel: 'opus', standInPhases: [...]}`; finished Fable seats keep model 'fable' so they replay from cache); each stand-in puts `> PENDING FABLE REVIEW — …` under its file title (or under changed section headings) and appends a row to `docs/FABLE-REVIEW-QUEUE.md` (class A). Opus-role work no Fable critic has checked is class B with the same marker. When Fable returns, run `workflows/05-fable-review.js` before building on the queued items. The main session running on Opus is itself row A-M1 (its judgment calls J18+ get re-judged).

**Why:** the owner's staffing rule puts judgment, architecture and validation on Fable; work done without it must stay visibly provisional until Fable has seen it.
**How to apply:** every new Opus lane or manager decision made while Fable is unavailable gets a queue row and a marker; never remove a marker except through a Fable review. See [[agent-model-tiers-directive]], [[maps-project-state]].

**2026-09-27 ~01:45 — Fable weekly limit imminent (owner):** on failure, resume 09 (wf_b8631ab1-21c) and 11 (wf_8ba454ea-179) with `fableModel: "opus"` (HANDOFF 6g): landed Fable seats return from disk, unfinished ones run as MARKED stand-ins (A rows), Opus readers get B rows from the stand-in critic; every Opus-manager judgment carries '(Opus 5.5 manager — pending Fable review, A-M1)'; run workflows/05 over the whole PENDING queue when Fable is back, before the M1 build spec.

**2026-09-27 ~17:00 — Fable is back** (the owner: "please continue the pending work with the appropriate task split between fable and opus"). From this point Fable-role seats run on model `fable` with no stand-in marker; Opus seats of the hand-fix and survey workflows still append class-B rows (their scripts mark unconditionally; consistent with the class-B definition). The review order is J76 in `docs/PROGRESS.md`: the extended 05 runs BEFORE pass c; the survey's rows are reviewed in a short second run when the survey lands. `workflows/05-fable-review.js` must be EXTENDED first to the families A/B-amendments-b/*, A/B-handfix-b/*, B-code/*, A-code/_critic, A-code/_impact, B-sf/*, A-sf/plan, B-amendments-c/route and A-M2 (Opus-manager judgments J52–J74).

**2026-09-27 ~18:40 — Fable continuation of a stand-in seat (hand-fix workflow 13):** when a stand-in's LANDED line and report carry PENDING FABLE REVIEW, the computed task's CONTINUATION clause outranks the generic RESUME rule: the Fable seat re-reads every block against the issues and the live text, re-executes the receipts on copies (apply alone and combined with the sibling r2 files, swap, probes, refs, doc_checks three-copy), appends `## Fable continuation (date)` to the report with an `ITEM fable-continuation … | done` PROGRESS line, leaves the PENDING line and the queue row untouched (the row is appended only if missing, produced-by 'opus stand-in, finished by fable'), and writes a second LANDED line (PROGRESS.md mirrors lane-events.log by itself). Hazard: a report that already has a `## Fable continuation` section is FINISHED — a later re-run of that seat takes the RESUME rule (return the summary, touch nothing), or the continuation would loop.

**2026-09-27 ~23:00 — owner ruling (J84): "I just want retrovalidation on the full architecture. Not every opus work."** The row-by-row review is superseded by `workflows/16-retrovalidate.js` (ten Fable validators over the whole design; the close seat marks every still-PENDING queue row SUPERSEDED and replaces the file markers). Do not restart the per-row review; new stand-in work, if Fable is ever unavailable again, is validated by re-running 16 over the changed parts.

