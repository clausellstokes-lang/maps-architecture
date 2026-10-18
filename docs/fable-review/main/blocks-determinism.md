# Blocks — lane fable-review/main/determinism (Fable reviewer, 2026-09-27)

Text before the first "=== " line is ignored by the assembler. Blocks follow as the review (docs/fable-review/main/determinism.md)
rules them; each block is closed with "=== END ===" the moment it is complete (kill-safe). Every block carries its J-ROWS
line and RATIONALE-A entry in the J-ROWS and RATIONALE-A blocks that close this file.

=== APPEND TO SECTION ### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===

**Independence through the input layer (Fable review 2026-09-27; J-Fdet-1).** The independence check above reads
touched sets and effective-scope faces, which see geometry and records but not the inputs a derivation reads, so it
also holds a later live event **dependent** on its target when the target changed an input that event's derivation
read. For an `editTable` or `editPreset`: when an entity the later event derived — one in its touched set whose leaf
digest a stage, S13a's delta, a re-cut or a rung wrote, which the touched set marks apart from the addresses the event
merely set — cites, in its derivation record, its naming record or its provenance (§2.8), a slice whose hash the
target's row operations changed (the slices, recomputed from the target's operations and their base rows by §7.6's
slice kinds). For an `adjust` — a parameter, a Re-derive from stage k or the pack list — and for a town-wide
`rerollLayer` of `naming`: whenever the later event derived any entity, because every derivation reads the effective
parameters, the pack set and the town salt. An `undo` or `redo` whose target is one of these events counts as one.
An event that derived nothing depends on no such target. So an input change is undone through its dependants, as the
chain rule above states, or stays; the state after a permitted undo is the fold of the log without its target, and no
derivation record is left citing a slice the effective tables no longer hold. The check costs the later events'
touched sets and their records' slice references, kept for every event (Records on other clients, above). *Fixtures
(B-EDIT, §13.2):* an `editTable` on a heights row followed by a `build` on a plot the edit did not touch, an `adjust`
followed by a `drawWay`, and a town-wide `rerollLayer(naming)` followed by a scoped regeneration that draws a name — each
later event is reported dependent, and once it is undone first the target's undo gives the model digest and records
digest of the log without the pair; an `editTable` followed by a `build` whose derivation cites none of the changed
slices is independent, and the target's undo gives the digests of the log without the target.

=== END ===
=== APPEND TO SECTION ### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3) ===

**Precision (Fable review 2026-09-27).** In (b) 3, "every other L1 edge the new banks will cross that is no way" reads
"every other **structural edge, of any level**, that the new banks will cross and that is no way": the
settlement-perimeter and district-boundary stretches are L1, a setback or glacis line outside a re-traced run is L3
(the faces §5.3's NF-P5 row names) — each split at its two bank points as stated.

=== END ===
=== J-ROWS ===
| J-Fdet-1 | the undo independence check also reads the input layer: a later event that derived an entity citing a slice an `editTable` / `editPreset` changed, or that derived anything after an `adjust` or a town-wide naming `rerollLayer`, depends on it | §7.4 |
=== END ===
=== RATIONALE-A ===
| J-Fdet-1 | Chose to extend §7.4's independence check through the input layer — a later live event depends on an `editTable` or `editPreset` when an entity it derived cites, in its derivation record, naming record or provenance, a slice the target's row operations changed, and on an `adjust` (a parameter, a Re-derive from stage k or the pack list) or a town-wide `rerollLayer(naming)` whenever it derived any entity, an `undo` or `redo` of such an event counting as one — over the touched-set-and-faces rule alone and over accepting a non-exact undo and saying so, because the rule as written passes an undo whose later dependants have touched sets disjoint from the target's (a `build` on an untouched plot after a heights-table edit; a `drawWay` after an `adjust`; a scoped regeneration that draws a name after a naming reroll), after which the target's undo restores its own scope from its record while the later content stands as derived under the withdrawn input: the head-applied undo differs from the fold of the log without its target — the exactness the check exists to keep, and which the truncation-identity and convergence tests assume — and the later entity's derivation record cites a slice hash the effective tables no longer hold, which §7.6's invalidation-by-slice never repairs because an undo is not a table edit, so the inconsistency would be silent and permanent, against "nothing is lost silently"; the slice rule is exact for tables and presets because §7.6's oracle audits that every consulted slice is recorded, the conservative rule for parameters and salts is what "a whole-town event is undoable only while it is the latest live event" already says of upgrades, rebases and a Re-derive from S1, the user path is the existing one (the dependants listed, the session undoes its own first, an owner undoes through a chain), and the check reads only the later events' touched sets and their records' slice references, which the undo section already keeps. Written as an APPEND TO SECTION so pass c's editors can fold it into the Independence bullet (§7.4; Fable review 2026-09-27, lane determinism; found under A-fixall/draft-determinism-r2). |
=== END ===
