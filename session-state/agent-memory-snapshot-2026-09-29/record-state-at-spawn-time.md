---
name: record-state-at-spawn-time
description: "Lesson from the 2026-09-21 continuation session — the owner's \"stop\" kills background agents instantly, so progress must be logged when work is launched, not when it lands"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3fbc58a0-613c-43b5-9c94-a4f47a8689a6
  modified: 2026-09-25T09:18:51.559Z
---

On 2026-09-21 07:17–07:27 EDT a Maps continuation session ("please continue the pending work") spawned three gap-closing agents and ran captures, then the owner typed "stop". The agents were killed before writing anything, the session ended before it could record state, and `docs/PROGRESS.md` stayed four hours stale. The next session (2026-09-25) had to reconstruct what happened from transcripts and file mtimes.

**Why:** the owner stops sessions and switches accounts without warning; a "stop" is immediate and the assistant's planned "I'll record state after halting" never ran.
**How to apply:** in the Maps project, run `python3 tools/progress.py --log "…"` BEFORE or in the same turn as spawning agents / launching a workflow (what was launched, prompts saved where, expected outputs), and have every agent write its file incrementally from its first minute. Save every agent prompt to disk (e.g. `workflows/` or the scratchpad) so a killed lane can be re-spawned verbatim. See [[record-progress-for-account-switch]] and [[maps-project-state]].

Also (2026-09-25): an interrupt from the owner's side (e.g. a stop tapped on the phone while the session is mid-turn) cuts off every in-flight subagent, including the seats of a running Workflow, which then waits with no failure event. After any '[Request interrupted by user]', check the active run's transcripts (tools/lanes.py) and stop/resume the run if its seats went silent.

**2026-09-28 (bitten again):** an owner-side interrupt at 10:48 cut the bundled pass's assembler; the Workflow task ended silently, and tools/lanes.py kept counting the dead transcript as live for its 4-minute window, so a status report at 10:50 wrongly said the seat was working. Fixed in tools/lanes.py (a transcript ending in '[Request interrupted by user' is never live). **How to apply:** before reporting a run as working, confirm its newest transcript is still being written AND does not end in the interrupt marker; after any owner message sent mid-turn, re-check live workflows.

