# Coherence verify — the determinism part (§5, §6, §7), round 2 (seat coherence/verify-determinism-r2t)

Written by Opus (verifier seat). Scope: base `## §5 `, `## §6 `, `## §7 ` after repair round 2 (coherence/assemble-r2, base
sha256 `4ed292e9…`), checked against the pre-round text (assemble-r1's `137ecc0e…`), the archive, the inventory, the canon
(with its dated rulings), the adjudicator's binding rulings `adjudication-r2.md` (R2-01 – R2-42), the eighteen
`repair-r2-*.md` files and `assemble-r2.md`. Nothing in the design files was edited.

PROGRESS (lane `coherence/verify-determinism-r2t`, 2026-10-01)
- P1 inputs extracted (pre-round and live base; the blocks routed into §5–§7 identified): done
- P2 the 27 round-1 findings re-checked against the live text and the rulings: done
- P3 the replaced subsections diffed whole against the pre-round text; every changed hunk read with its targets: done (references in progress)
- P4 g items 120–126 parts (determinism's: 122 DR44, 123 §6.3, 124 §6.1, 125 §7.7; 126 phone clauses): done
- P5 cross-unit seams the round touched (the 18 repair preambles' hand-offs to or from §5–§7): done
- P6 terms, deferral, narration, references, ids over §5–§7: pending
- P7 issues, result file, LANDED: pending
