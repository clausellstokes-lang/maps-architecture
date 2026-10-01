# Coherence verify — the determinism part (§5, §6, §7), round 1 (seat coherence/verify-determinism-r1t)

Written by Opus (verifier seat). Scope: base `## §5 `, `## §6 `, `## §7 ` after repair round 1 (coherence/assemble-r1, base
sha256 `137ecc0e…`), checked against the pre-round text (assemble-r0's `484af066…`), the archive, the inventory, the canon,
`repair-r1-*.md` and `assemble-r1.md`. Nothing in the design files was edited.

PROGRESS (lane `coherence/verify-determinism-r1t`, 2026-10-01)
- P1 inputs extracted (pre-round and live base, blocks routed into §5–§7 identified): done
- P2 the 36 round-0 findings re-checked against the live text: pending
- P3 the 13 replaced subsections diffed whole against the pre-round text; every changed hunk read: pending
- P4 g items 114–119 parts (re-check), 120 (G120), 121–124 (G121–G124) routing for determinism: pending
- P5 cross-unit seams the repairs touched (kernel's F-RIVER note, V09 keys, scope's tests, V08's port): pending
- P6 terms, deferral, references, ids over §5–§7: pending
- P7 issues, result file, LANDED: pending
