---
name: reissued-brief-resume-rule
description: "A workflow re-run can re-issue a lane key that already LANDED with a WIDER issue set; the resume rule covers only the landed subset — compare the brief's issue ids to the LANDED line, verify the landed ones by anchor, and do the new ones as a continuation (second LANDED under the same key)"
metadata:
  node_type: memory
  type: project
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

On 2026-09-29 the volumes workflow re-ran reconcile lanes whose keys had already LANDED (V02-r1, V08-r1, V09-r1,
V10-r1, BASE-F-r1 at ~08:33; V01-r2 at 09:16). Each re-issued brief carried the landed issues PLUS findings raised
afterwards by a seam round's continuation (e.g. seam-stage2-3-r1's 09:14 whole read of V01 raised S23R1-15..24; the
V01-r2 brief then listed S23R1-15/19/20/21/22 beside the 11 issues landed at 04:46).

**Why:** the RESUME RULE ("file exists AND a LANDED line for the lane key → return the summary") read literally would
silently drop the new issues, since no other lane is routed them.

**How to apply:** before returning a resume summary, diff the brief's issue ids against the ids named in the LANDED
line(s) for that key. Same set → resume (log a NOTE). Wider set → log a NOTE naming both subsets, grep the landed
issues' anchors in the live text (not redone), fix the new ones by exact-string edits with a fresh backup, append a
"continuation" note to the file, and write a second LANDED line under the same key.
