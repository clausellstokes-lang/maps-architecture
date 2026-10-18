---
name: elegance-without-losing-nuance
description: "Owner directive 2026-09-28: design passes make the architecture elegant where appropriate but NEVER lower nuance; every unification needs a full equivalence list or is not made; lost nuance is a blocker, missed elegance a minor"
metadata:
  type: feedback
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

Owner, 2026-09-28 ~23:00: "in the eventual coherence pass, also integrate elegance into it as well where appropriate but not
lowering nuance". Implemented as principle (9) of workflows/18-coherence.js (J112 in docs/PROGRESS.md): one mechanism per job,
one record per thing, tables for disguised special cases, derivations for repeated stored values, volumes reusing base
mechanisms, one shape per kind of rule — under an absolute guard (no case, exception, constant, band row, fallback, failure
rung, provenance, bar, owner rule or behaviour removed or blurred; nothing merged that differs; no vague wording).

**Why:** the owner values both a clean design and the realism and nuance built up over many rounds; simplification that
drops a case is the failure they fear.

**How to apply:** any future design, review or rewrite pass carries the same rule: a unification is a recorded ruling with an
EQUIVALENCE LIST (every behaviour, case, bar and owner rule of each original and where it now lives), else KEEP APART with
the separating nuance named; verifiers treat NUANCE-LOST as a blocker and missed elegance as a minor so loops still converge.

Related: [[wired-architecture-directive]], [[no-defer-directive]], [[design-tiebreaker-realism]].

2026-09-29 ~02:25 (J119): the owner said the shrink goal was meant to be part of this elegance directive: about a third fewer words across the design, removed only from restatement, narration, duplicated mechanisms and verbose prose — never content; the nuance guard wins over the number.
