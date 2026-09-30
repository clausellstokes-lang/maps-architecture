---
name: github-repository
description: "Maps program backed up to PRIVATE repo github.com/clausellstokes-lang/maps-architecture (first push 2026-09-29, commit 5354c2a); the Maps folder is now a git repo; .gitignore keeps third-party captures/archives/images, browser profiles and backups local; pushes need the owner's word each session"
metadata:
  type: project
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

Owner asked on 2026-09-29 ~20:10: "find a decent stopping point as to not lose any progress. upload this all to a github
repository". Done: the coherence pass was stopped in its Rewrite phase (live design untouched), then /Users/cstokes/Desktop/Maps
was git-initialised (branch main, repo-local identity clausellstokes-lang with the GitHub noreply address) and pushed to the
PRIVATE repo https://github.com/clausellstokes-lang/maps-architecture (commit 5354c2a, 1,396 files, 186 MB). A secret scan of
the uploaded set found nothing. Excluded (kept local, reasons in .gitignore): captures/ (2.5 GB incl. reference program
bundles and session logs), reference/ (third-party repos), research/patreon, devlogs, ftg-docs, external, reference-maps
(third-party or copyrighted), profiler/.profiles (browser profiles that may hold logins), node_modules, backups/.

**Why:** the owner wanted progress preserved off-machine; the exclusions follow size limits, the clean-room rule and
copyright, and keep possible logins off GitHub.

**How to apply:** the Maps folder is a git repo now — follow the shared-tree git rules (explicit paths, verify staged hunks).
Commit new work as it lands; PUSH only when the owner says so in the current session (a recorded approval is history, not
permission). Never add the excluded folders; run the secret scan before any push. A repo README and session-state/ (a copy
of this memory) exist in the repo.

Related: [[resume-safeguards]], [[maps-project-state]], [[clean-room-input-hazard]].
