---
name: mac-session-environment
description: "Owner's Mac (2026-10-03) — it IS §12.1's bench; research archives live in ~/Desktop/research and are symlinked into Maps/research; disk 99 % full; pnpm only via corepack; Fable answers here"
metadata:
  node_type: memory
  type: project
  originSessionId: 2367ceda-b0ec-4fa5-94a3-059f82e2d4b7
  modified: 2026-10-03T07:32:31.053Z
---

Facts verified 2026-10-03 when the program moved from the cloud back to the owner's Mac (J157):

- **The machine is the design's reference bench** (§12.1): MacBookAir10,1, Apple M1 4P+4E, 16 GB, macOS 14.7.8, Node 24.12 arm64 at /usr/local/bin/node, Python 3.9, Apple clang 16, Rosetta 2 installed (a darwin-x64 Node runs as the x86-64 leg). Playwright browsers cached in ~/Library/Caches/ms-playwright (chromium 1223/1243, firefox 1522, webkit 2251). netlib, prng.di.unimi.it, nodejs.org, npm registry and the Playwright CDN all answer (the cloud refused them).
- **pnpm is not installed**; corepack 0.34.5 is — run `corepack pnpm …`, never a global install.
- **Corpus location:** the Maps folder was re-cloned 2026-10-03 03:15; its local-only research archives (patreon, devlogs, ftg-docs, external, reference-maps) live in `~/Desktop/research/` and are SYMLINKS in `Maps/research/`; `.gitignore` patterns for them have no trailing slash so git ignores the links. captures/, reference/, profiler/ are real folders in Maps. With the full corpus, doc_checks.py found 78 unreviewed base hits the cloud never saw.
- **Disk:** was 99 % full (2.8 GB free); on the owner's ok (J158) the Slack updater, Homebrew and npm caches (≈ 16 GB) were moved to the Trash and the owner emptied it → ≈ 17–18 GB free. Still never copy the archives; no git worktrees.
- **Fable answers** on this account (claude-fable-5-1 seats ran 2026-10-03).
- lane-events.log mixes UTC (cloud lines) and EDT (Mac lines); a NOTE line at 03:33 marks the switch.

**Why:** the handoff assumed the corpus sat inside Maps and the cloud's choices rows assumed a Linux container; both were wrong here.
**How to apply:** check `ls -la research/` and `df -h` at session start; give implementer seats the physical-firewall rule (search only inside plat/), since the corpus is present here. Related: [[maps-project-state]], [[clean-room-input-hazard]], [[doc-checks-corpus-drift]], [[resume-safeguards]].
