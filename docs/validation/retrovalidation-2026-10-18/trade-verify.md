# Retrovalidation 2026-10-18 — trade-verify (facts check of research/sf/trade-system.md)

Lane: retrovalidation/trade-verify (opus; J390, Fable-checked). Verifier seat under J390: facts only; design soundness is the Fable validator's.

## Method

- Read `research/sf/trade-system.md` whole (1,307 lines) before characterizing.
- Host: `/home/user/clausellstokes-lang/settlement-engine`, HEAD = `81f1cd963553f226b222714914ff34584e9911b8` (read from `.git/HEAD` → `refs/heads/master`; no git command run). Read-only.
- Every cited host path:line opened with `sed -n`; every count recomputed with `wc -l` / `grep -c`; every quoted phrase re-found with `grep`.
- Findings recorded as they are found (below). Status: IN PROGRESS.

## Findings

| id | where (note line) | claim | verdict | evidence | fix |
|---|---|---|---|---|---|
