---
name: resume-safeguards
description: "Workflow resumeFromRunId works only in the session that started the run; in a new session relaunch the same script fresh (seats' RESUME/CONTINUE rules recover from disk) and recreate the lane-check cron from workflows/lane-prompts/lane-check-cron.txt; tools/snapshot.sh backs up docs/workflows/tools every half hour"
metadata:
  type: project
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

Set up 2026-09-29 ~10:15 after the owner asked for regular saving ("so in case another interruption happens, we can assure
smooth resume"). Facts learned the hard way that morning: the owner's chat interrupt (the stop button) kills every running
workflow agent at once (07:51, six seam checkers); a same-session resume with resumeFromRunId did NOT reuse the finished
seam/reconcile rounds (the cache matches only the longest unchanged prefix of agent calls, and parallel ordering breaks it),
so the run replayed them — cheap where a seat's RESUME rule returned its file, costly where re-summarised results widened
later briefs. Remedy built into workflows/18-coherence.js: every seat writes its exact structured return to
docs/validation/coherence/results/<lane>.json before LANDED and returns it verbatim on resume.

**Why:** the owner is anxious about losing progress; interrupts and session ends are the two real threats.

**How to apply:** same session: Workflow({scriptPath, resumeFromRunId, args}) + tools/lanes.py --run. New session: the
Workflow tool cannot resume another session's run — relaunch the same script fresh with the same args; recreate the cron
(CronCreate 7,37 * * * *, prompt = workflows/lane-prompts/lane-check-cron.txt); read docs/HANDOFF.md "RESUME HERE" first.
Backups: backups/snap-<time>.tar.gz (newest 24); restore with tar -xzf <snap> <path>. Tell the owner to send messages
without pressing stop.

Related: [[maps-project-state]], [[record-state-at-spawn-time]], [[record-progress-for-account-switch]].
