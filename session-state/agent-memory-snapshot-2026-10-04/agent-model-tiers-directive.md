---
name: agent-model-tiers-directive
description: "Owner directive on subagent models for the Maps program — Fable manages/judges/architects/validates, Opus verifies/scouts/implements/surveys under Fable"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3fbc58a0-613c-43b5-9c94-a4f47a8689a6
  modified: 2026-09-25T09:26:51.345Z
---

For multi-agent work in the Maps project the owner said (2026-09-21) "use opus to read them but fable critics", and widened it on 2026-09-25: **"fable as manager, judgement, architect, and validator. Opus as verifier, recon, implementer, and surveyor as managed by fable."**

Mapping used in `workflows/03-assess-design-validate.js` (2026-09-25): Fable = the orchestrating session, confidence assessors, skeptics, report synthesisers, architects, judges, chief architect, red-team lenses, reviser. Opus = weakness miners, coverage auditors, post-revision verifiers, capture/post readers, and (in later phases) implementers.

**Why:** matches the owner's global rule of staffing by judgment density: rulings and design on the strongest model; reading, measuring, verifying and building on the builder tier.
**How to apply:** set `model` per agent() call in Workflow scripts and per Agent call; never default every seat to the session model; when a new seat type appears, classify it by this list before spawning. See [[maps-project-state]], [[record-state-at-spawn-time]].
