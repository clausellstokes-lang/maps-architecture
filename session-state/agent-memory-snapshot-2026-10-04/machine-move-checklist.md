---
name: machine-move-checklist
description: What GitHub does NOT carry when the Maps program moves to another machine (2026-10-04 move to a new, larger machine) — local-only folders, FTG sign-in, Claude memory path, re-confirmed approvals, the timing bench
metadata:
  type: project
---

GitHub (clausellstokes-lang/maps-architecture, main) carries the design, plat/ (the build, incl. vendored C sources and test vectors), docs/, workflows/ with args files, research/baselines/ tools and derived inputs, and session-state/ (a memory snapshot). It does NOT carry, by design (.gitignore; size, copyright, clean room, privacy): captures/ (reference recordings incl. FTG slot payloads 0–18 and the MFCG sweep), reference/ (third-party repos), the research archives (patreon, devlogs, ftg-docs, external, reference-maps — on the old Mac in ~/Desktop/research, symlinked into research/), profiler/ (the recorder tools are needed; profiler/.profiles holds browser logins and must never be copied or pushed), backups/, node_modules.

**Why:** the M0 build (plat/) can continue from GitHub alone (implementer seats never read the corpus), but M-1's research seats, the FTG recording and the clean-room checker doc_checks.py (whose corpus must be complete, else its result is NOT authoritative) need the local-only folders.

**How to apply on a new machine:** copy those folders by drive/AirDrop/Migration Assistant (never via GitHub); re-link the archives under research/; the owner signs in to FTG again in a fresh profiler/.profiles/ftg (one account, premium until ~2026-11-03); copy ~/.claude/projects/<path-key>/memory/ (the key is the clone path with / replaced by -; cloning to /Users/cstokes/Desktop/Maps keeps "-Users-cstokes-Desktop-Maps") or restore from session-state/; pass args.root/scratch for the new paths; re-confirm push (J158) and FTG go (J165) with the owner in the new session; decide the timing bench (J157 named the old MacBook Air) before wave T. Related: [[maps-project-state]], [[mac-session-environment]], [[github-repository]], [[resume-safeguards]].
