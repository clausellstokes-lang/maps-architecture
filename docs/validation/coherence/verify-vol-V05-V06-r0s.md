# Verify — design volumes V05 (the sky layer) and V06 (evolution), coherence pass round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V05-V06-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r0`; cloud continuation 2026-10-03; resumed once after a cut at P3)
- P1 inputs gathered (canon routing for V05/V06, edges, cross-part notes from every rewrite report): done
- P2 mechanical checks (ids, references, terms, deferral, mapping table, per-item tokens): done
- P3 V05 archive → new review, section by section: done
- P4 V06 archive → new review, section by section: done
- P5 cross-unit agreement, cohesion, wiring, edges, canon routes, open findings, cross-part notes: done
- P6 report, results JSON, LANDED: done

Scratch: `/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/vv56/`.

## 1. Outcome

**22 issues: 1 blocker, 8 major, 13 minor.** By owner: V06 11, V05 6, scope 2,
model 1, determinism 1, pipeline 1. Texts verified: `docs/volumes/V05-sky.md` (64 229 words by `wc`) and
`docs/volumes/V06-evolution.md` (92 442) as assembled by coherence/assemble-r0 (01:53 UTC), against
`docs/archive/volumes-pre-coherence-2026-09-28/V05-sky.md` (79 756) and `…/V06-evolution.md` (104 574), the inventory
(1 046 ids), the canon, the two rewrite reports' mapping tables, `edges.json` and every rewrite report's cross-part notes.

**Method.** Each volume split by section on both sides; the archive normalised for the canon's renames (G-cite, G-DR, ID-BCR,
G-unitinput, G-strike, G-hollow, G-forkat, the BCR → item map) and word-diffed per section; every deleted run carrying a
backticked name, a number with a unit, an id, a camel-case identifier or a normative word (never, only, unless, except,
must, always, at most, at least, no, none, not) read with its context, and every run of 25 words or more read whole
(V05: 283 hunks; V06: 560); every §1b row, §2.6 / §2.12 lifecycle row, test row and decision row compared one to one;
every inventory id token-checked against its mapped location (856 at the location, 66 elsewhere in the volume, 124 read by
hand); every canon route for V05 and V06 checked at its target (conflicts, wiring gaps, elegance rulings, id rulings,
terms, g parts, owner questions, the 120 open findings, the 36 hand-offs to close).

**Shrink.** Neither volume shrank by more than half (V05 −19.5 %, V06 −11.6 % by `wc`; −22.8 % and −16.6 % by the section
scan), so no whole-volume nuance audit was due; both sit below the 25–40 % band and their rewrite reports state the
irreducible content and the added design (items 111, 113, the edge sections) that holds them there — not a defect.
One nuance loss was found all the same (V06-BUDGET-1).

**Results file:** `docs/validation/coherence/results/coherence_verify-vol-V05-V06-r0.json`.

## 2. Issues

| id | severity | kind | owner |
|---|---|---|---|
| V06-BUDGET-1 | blocker | NUANCE-LOST | V06 |
| V05-G114 | major | F-MISSING | V05 |
| V06-G114 | major | F-MISSING | V06 |
| MODEL-G114 | major | F-MISSING | model |
| DET-G114 | major | F-MISSING | determinism |
| V05-LOCK-1 | major | CONFLICT | V05 |
| V06-WIRE-1 | major | WIRING | V06 |
| V06-AGREE-2 | major | CONFLICT | V06 |
| V06-COH-1 | major | COHESION | scope |
| V05-COH-1 | minor | COHESION | scope |
| V05-REF-1 | minor | BROKEN-REFERENCE | V05 |
| V05-ROW-1 | minor | BROKEN-REFERENCE | V05 |
| V05-IN-1 | minor | ID | V05 |
| V05-DUP-1 | minor | ELEGANCE | V05 |
| PIPE-NODE-1 | minor | CONFLICT | pipeline |
| V06-TERM-1 | minor | TERM | V06 |
| V06-REF-2 | minor | BROKEN-REFERENCE | V06 |
| V06-BCR-1 | minor | BROKEN-REFERENCE | V06 |
| V06-COH-2 | minor | COHESION | V06 |
| V06-PART-1 | minor | WIRING | V06 |
| V06-STREAM-1 | minor | TERM | V06 |
| V06-NARR-1 | minor | NEW-PROBLEM | V06 |

### V06-BUDGET-1 — blocker, NUANCE-LOST, owner V06

**Claim.** V06 §6.2's *The sky's island events* (l. 3394–3409) keeps the sums (a growing resize ≈ 228 / 255 ms, a shrink ≈ 209 / 227 ms, the century 68.4 / 76.5 / 9.6 s) but the cut that removed the verbatim V05 quotation (V06-RESTATE-1) also removed the derivation and the worst-case argument the century bounds of D-18 rest on: §12.6's law applied per term (3 × 6 ms + 60 µs × 300 / 750 ≈ 36 / 63 ms; a shrink's claim district 'a third of the island' ≈ 12 / 21 ms; the yards' re-cut, ≤ 9 buildings ≈ 7 ms; a shrink's rim ring 'at most a third of the island' ≈ 12 / 21 ms; 3 × 30 ≈ 90 ms for the tops and as much for the feet; the shrink sums 5 + 12 + 12 + 90 + 90 and 5 + 21 + 21 + 90 + 90); the access distinction 'a vertical access's foot re-lands only when its top's move leaves its landing plot (a slanted one only past its run), but a top moves along its ray at least as far as the rim does'; the travel bound 'over a century the rim can travel 2.5 · r (≈ 450 / 630 m), ≈ 150 / 210 least plot widths, more than the century's 100 resizes'; the perimeter bound's reason (the disc of the island's area has the least perimeter); the fall-with-raise figure (≈ 80 + 120 / 110 + 160 ms); TOWN's 'the target 0, and no slot re-opens'; and 'V05's hysteresis 0.05'. The kept rate now reads 'a rim moves at most `0.025 · years · r` a year (… ≈ 4.5 m at CITY's `areaHaMax` …)' — a per-year rate written with `years` in it — where the archive read 'at most `growthPerYear` · years · A ÷ P ≤ 0.025 · years · r …, ≈ 4.5 m a year'.

**Required change.** In V06 §6.2 restore, from the archived paragraph (docs/archive/volumes-pre-coherence-2026-09-28/V06-evolution.md §6.2, 'The sky's island events, re-derived from V05 §6's rows'), without its round and seam ids and without the verbatim V05 quotation: (a) after 'buildings at CITY / METROPOLIS, §12.5's table)': '§12.6's law (≤ 3 ms + 60 µs × the buildings in scope, plus ≤ 3 ms of deltas, once per district) gives a growing resize re-deriving all three of its districts ≈ 3 × 6 ms + 60 µs × 300 / 750 ≈ 36 / 63 ms, and a shrink re-deriving at most the claim's district (a third of the island) ≈ 12 / 21 ms; the plots re-cut outside those districts, one scope, are a growing resize's yards' (≤ 3 plots a yard by V05 §6's basis, ≤ 9 buildings: ≈ 7 ms) and a shrink's rim ring (its eroded band ≤ 0.025 · r a year; at most a third of the island: ≈ 12 / 21 ms); with ≤ 3 accesses, each yard's top placed and each foot re-landed (3 × 30 ≈ 90 ms for the tops, as much for the feet)', and the shrink sums as '≈ 5 + 12 + 12 + 90 + 90 ≈ 209 ms and ≈ 5 + 21 + 21 + 90 + 90 ≈ 227 ms'; (b) replace 'a rim moves at most `0.025 · years · r` a year (V05's dynamics row; ≈ 4.5 m at CITY's `areaHaMax`, ≈ 6.3 m at METROPOLIS's), a ground plot may be 3 m wide (§15.2's O5 (b)), and' by 'a vertical access's foot re-lands only when its top's move leaves its landing plot (a slanted one only past its run), but a resize moves the rim by the buffer distance, at most `growthPerYear` · years · A ÷ P ≤ 0.025 · years · r for the disc of the island's area (the least perimeter for an area; V05's dynamics row), ≈ 4.5 m a year at CITY's `areaHaMax` and ≈ 6.3 m at METROPOLIS's, while a ground plot may be 3 m wide (§15.2's O5 (b)), and a top moves along its ray at least as far as the rim does, so one resize can carry a foot off its plot; over a century the rim can travel 2.5 · r (≈ 450 / 630 m), ≈ 150 / 210 least plot widths, more than the century's 100 resizes; and'; (c) write '(≈ 80 + 120 / 110 + 160 ms)' after 'a fall with a raise', '(V05 §3.15 (1): the target 0, and no slot re-opens)' for TOWN, and '(V05's hysteresis 0.05 against a target that follows a town growing 1 % a year)' in the one-epoch-in-five sentence.

### V05-G114 — major, F-MISSING, owner V05

**Claim.** File g item 114 (OWNER RULE, filed 2026-10-03 02:35 UTC after the V05 rewrite landed; J126; it takes precedence over file f item 260 and J-VI.14) names V05's part — 'islands and accesses: removed slots not counted as filled' — and withdraws the held removal ('the islands' and sky accesses' removed slots counted as filled, V05 §2.1'). V05 still states the withdrawn rule throughout: §0 ('a hoist you remove stays removed … unless you undo'), §1.1 ('the removals that hold'), §2.1 `removed` / `removedAccesses` and `removedSlots(doc)`, §2.6's `removed` and `removedAccesses` rows ('held: never drawn, filled or re-opened by a re-derivation or an epoch'), §3.2 (6) ('A count never releases a hold'), §3.10 (1), §3.15 (5) ('counts as filled … only item 260's lift rule releases it'), §3.22 (7) ('Removals … holds through regeneration … stays removed'), §4.2's delete, §4.5's held-slot line, T-V5-29 ('a removal holds'), J-V5.62, IN-V05-2 and §8 P4 ('the removed ordinals with their holds'); it has no *Built by the town* row for floating islands and their sky accesses (114 (a)), no switch semantics (114 (b)), no lapse at the next change (114 (c)), no preview and history words (114 (d)), no bars (114 (e)) and no migration of an older document's removal records; its head cites 'file g 102–113'.

**Required change.** Write item 114's V05 part at build depth as an addition: (a) V05 §3.2 states the *Built by the town* row 'floating islands and their sky accesses' (V09 §4.14's group; its default the islands setting's, so a document that never touches the list generates as before) and how it relates to `recipe.layers.islands` (one switch or two, stated); a dossier-bound island (DR27, an institution the dossier places on an island) is never touched by the switch; (b) turning the row off removes the generator's standing islands and accesses, never a declared or drawn one, each listed in the preview; turning it on lets S7b (5) and SKY build them at the next derivation; one `adjust` event, never written to the dossier; (c) a delete of a generated island or access removes it 'for now': it holds while the town is unchanged (a plain Regenerate, a reload and crash recovery give the map as left) and lapses at the next change that re-reads the kind (an epoch's `IslandEpochStep`, a New random over a place it crossed, a Re-derive from S7b or SKY), the slot and the ordinal then drawn afresh and never counted as filled or against any cap; the archived arena part and households are kept for undo; Undo restores; **Build it again** makes it the author's (a declared island); rewrite §2.1, §3.22 (7), §2.6's `removed` / `removedAccesses` rows (create, read, persist, regenerate, undo, migrate — an older document's records read as plain deletions that lapse at the next change), §3.2 (6), §3.10 (1), §3.15 (5), §4.2, §4.5, §0 and §1.1 to that rule; (d) the delete's dry run and history row cite V09's rewritten `info.remove.holds` ('Removed for now — the town may build one again when it changes. To stop it building floating islands, turn them off in Advanced › Built by the town.'); (e) T-V5-29 becomes item 114 (e)'s bars for islands and accesses (switched off: none at every rung and epoch on the calibration seeds; on again: back at the next derivation; delete then plain Regenerate byte-identical and still absent; delete then one epoch: may rebuild, counted against no cap; a dossier-bound island survives every switch; every row at its default byte-identical, the no-op pin); J-V5.62 marked 'superseded by J-V5.86 (item 114, an owner rule)' with a new decision row; IN-V05-2 dropped; the head cites 'file g 102–114'.

### V06-G114 — major, F-MISSING, owner V06

**Claim.** File g item 114 (OWNER RULE; J126) names V06's part — '§2.13's ledger and §3.19 without the suppressed set' — and withdraws the reason-keyed suppression (`LifecycleEvent.detail.suppress`, file f item 260, J-VI.14). V06 still states it in 75 places: §0 ('one you remove stays removed (undo brings it back)'), §1b's W19, W57–W59 and the suppressed-key rows, §2.10's `EpochReport.raised.suppressedFired`, §2.12 and §2.13 (the suppressed set, `detail.suppress`), §3.19.3 'A removal holds' with its serving re-adds (7), §4.2's delete dry run ('the city will not rebuild …' through `info.remove.holds`), §10's row 'a removal that suppresses its generator's key | item 260', T-V6-58, J-V6.83, J-V6.120 and the build plan's lines; it gives no per-kind switch read by the raised-way pass, the terrace, deck-plot, quay-wall, harbour-mouth-chain and oasis steps (114 (a)–(b)), no lapse of a deletion at the next epoch (114 (c): 'the next growth or decline step (an epoch) … The generator then decides afresh'), no words (114 (d)) and no bars (114 (e)); E-02's separating nuance rests on the withdrawn rule; its head cites 'file g 102–113'.

**Required change.** Write item 114's V06 part at build depth as an addition: (a) every epoch phase that builds a listed kind (V06 §3.19's raised-way pass split into its kinds — viaducts, elevated roads, aqueducts —, the terrace retaining walls, building plots on bridges and decks, quay walls with their sea gates, the harbour-mouth chain, oases, and the participants that build islands and the underground's optional systems) reads its *Built by the town* switch at the epoch and builds nothing of a kind switched off, never touching a drawn or dossier-bound instance; (b) a deleted generated instance lapses at the next epoch: the generator decides afresh at that epoch and, while the kind is on, may build one again on another course or the same, the deleted one counting against no cap; rewrite V06 §2.13 and §3.19.3 without the suppressed set (the reason key stays the single source of a raised way's identity and draw), drop `EpochReport.raised.suppressedFired` or restate it as the epoch's re-built-after-delete count with its readers, rewrite W19, W57–W59, §2.10, §2.12, §4.2 and §0 to the rule, and §10's item-260 row to cite item 114; (c) the dry-run and chronicle lines cite V09's rewritten `info.remove.holds` ('Removed for now — the town may build one again when it changes …'); (d) T-V6-58 becomes item 114 (e)'s epoch bars (a kind switched off: none at every epoch; on again: back at the next epoch; a delete then one epoch: may rebuild, against no cap; a migrated suppression record a plain deletion that lapses at the next epoch; every row at its default byte-identical); J-V6.83 and J-V6.120 marked 'superseded by' a new J-V6.136 (item 114, an owner rule); the head cites 'file g 102–114'.

### MODEL-G114 — major, F-MISSING, owner model

**Claim.** Item 114's HOMES name §2.8 ('the suppression bullet replaced by (c)'); base §2.8 (l. 2567–2579) still states the removal that holds 'in two record forms' (`LifecycleEvent.detail.suppress`; `SkyIsland.removed` and `.removedAccesses` counted as filled), §2.8's `suppress?` field (l. 2479) and §2.7's SkyIsland comment (l. 2217, 'the suppression's island form, §2.8'). V05's and V06's item-114 parts (V05-G114, V06-G114) cite this home.

**Required change.** Replace base §2.8's suppression bullet by item 114 (c) — a delete of one generated instance holds while the town is unchanged and lapses at the next change that re-reads its kind; a deleted instance never counts against its kind's caps; Undo restores; Build it again makes it the author's — with the migration of an older document's `detail.suppress` and island removal records as plain deletions that lapse at the next change; rewrite §2.8's `suppress?` field and §2.7's SkyIsland comment to that rule (or drop them with their readers listed).

### DET-G114 — major, F-MISSING, owner determinism

**Claim.** Item 114's HOMES name §7.1 and §7.4 (the delete's dry run and lifecycle rows) and §7.6 and §7.8 (the switch rows in the settings registry). Base §7.1 (l. 9600, 'what the removal suppresses'), the T10 `hold` rows (l. 9739, 'the removal of generated content holds') and §7.4's `convert removeIsland` row (l. 10276, 'honoured as a hold') keep the withdrawn rule, and §7.6 / §7.8 carry no *Built by the town* switch rows — the homes V05 §2.6 and V06 §2.12 cite.

**Required change.** Write item 114 (b)–(d) into §7.1 (the delete's dry run: 'Removed for now …', the lapse at the next change), §7.4 (the delete and `convert removeIsland` rows: held while the town is unchanged, lapsing at the next epoch, New random over its place or Re-derive of its stage; the switch's `adjust` row), §7.6 (the switches on the settings layers: this town, the user's defaults, a preset) and §7.8 (one row per kind of the comprehensive list, each default its kind's current default).

### V05-LOCK-1 — major, CONFLICT, owner V05

**Claim.** V05 §3.15 (1b) *Against a lock* (l. 1232) and J-V5.82 (l. 2838) rest on 'the dossier outranks a lock (§7.7; item 20 (h))', but §7.7's one precedence order reads 'lock > dossier existence > assignment > …' (base l. 10870) and states no rule for a dossier change that targets a locked element (verify-edges-life EL-01, BLOCKER, owner determinism). V05 attributes to §7.7 a rule §7.7 contradicts.

**Required change.** Once §7.7 states the outcome of a dossier change against a lock (EL-01), V05 §3.15 (1b) and J-V5.82 cite that rule instead of 'the dossier outranks a lock (§7.7; item 20 (h))': where §7.7's rule is the behaviour V05 states (the dossier's removal acts at once — the building vacated, the uses closed — while the lock holds the island's reason, claim and state), V05 cites it as §7.7's; otherwise V05 §3.15 (1b), J-V5.82 and T-V5-14's locked-island clause are rewritten to §7.7's rule.

### V06-WIRE-1 — major, WIRING, owner V06

**Claim.** V04 declares `BuriedFormer.lay(doc, epoch, former: Id[]): { system: Id } | null` (V04 §3.5.5 (b), l. 306, 1696) with its caller 'V06's history replay … inside the batch of the coarse epoch whose age first passes `history.burialYears`', the former records cleared on the ground in that batch and a null return reported `W_BURIED_FORMER_SKIPPED`; V11 §3.25.2 says V04's `BuriedFormer.lay` reads the threshold; V04's cross-part note 7 hands V06 the call. V06 never names it: V06 §3.20.5 (3) buries 'by II.7.6's burial of the former settlement — the `raiseGrade` conversion with cause `burial` over the region' (V04 l. 305 gives `raiseGrade`'s operator to the epoch hazard path, not to the replay), §1b has no row for it and the null return has no outcome on V06's side. A hook with one end and two descriptions of one step.

**Required change.** V06 §3.20.5 (3) reads: the region is buried by V04's `BuriedFormer.lay(doc, epoch, former)` (V04 §3.5.5 (b)) in the batch of that coarse epoch, `former` the region's ruined buildings, hollow ways, walls, gates and squares, which the same batch ends on the ground (existence `cleared`); the returned system's id is written into `HistoryRecord.buried`; a null return (no former element can be laid, `W_BURIED_FORMER_SKIPPED`) leaves the ruins on the surface, reported; where the replay also raises the grade over the region (so later coarse epochs build on raised ground), the text says so and that `raiseGrade`'s own buried-system builder is not called for cause `burial`. V06 §1b gains the W row (`BuriedFormer.lay` ← the replay's burial test; → `HistoryRecord.buried`, V04's `buried` system), §1.2 the hook, and J-V6.131 (l. 3835, 'by `raiseGrade` with cause `burial`') is amended to the same mechanism (E-24's mark).

### V06-AGREE-2 — major, CONFLICT, owner V06

**Claim.** The burial threshold's bare-rock factor differs between its home and its reader: V11 §3.25.2 (l. 4079–4084, the formula's home) sets `[on rock]` by 'the dossier's `site.terrain` rocky or mountainous …, on a standalone map the region's ground class `rock` (§4.2 S1 (10))'; V06 §3.20.5 (3) (l. 2961) restates the factors and reads bare rock 'by `site.terrain`' only, so on a standalone map V06's rule never lengthens the threshold where V11's does (V11's cross-part note 7 asked V06 to confirm the standalone reading).

**Required change.** V06 §3.20.5 (3) cites the threshold as V11 §3.25.2's `B` (its factors and bounds, the standalone reading by the region's ground class `rock` included) instead of restating the factors.

### V06-COH-1 — major, COHESION, owner scope

**Claim.** V06 §8 prices M6-E at 29–41.5 pw over E0–E9 (E9 the history replay at generation, item 113; 'E9 after E1–E6, its burial clause after M6-U's buried system'); base §16's staged row (l. 17639: 'M6-E — the evolution engine (V06 §8: E0–E8) … 25.25–35.75 pw'), §16's effort line (l. 17680: 'the evolution engine (volume 6) | 25.25–35.75') and INDEX §1 (l. 44: 'M6-E (E0–E8) | 25.25–35.75') disagree (the same defect as VAP-13, AT-25 and VS0-17).

**Required change.** §16's staged row reads '(V06 §8: E0–E9)', adds 'E9 after E1–E6, its burial clause after M6-U's buried system' and prices 29–41.5 pw; §16's effort line reads 29–41.5; INDEX §1's V06 row reads 'M6-E (E0–E9) | 29–41.5'; item 568's totals are recomputed once.

### V05-COH-1 — minor, COHESION, owner scope

**Claim.** Base §13.2 cites the two families by stale closed ranges: 'T-V5-1 – T-V5-32' (l. 15620 and l. 16159) and 'T-V6-1 – T-V6-69' (l. 16158); V05 §7 holds T-V5-1 – T-V5-34 and V06 §7 T-V6-1 – T-V6-74 (the same defect as VAP-01 and VS0-18).

**Required change.** §13.2 reads 'T-V5-1 – T-V5-34' at l. 15620 and l. 16159 and 'T-V6-1 – T-V6-74' at l. 16158 (or cites 'V05 §7' and 'V06 §7' without a range).

### V05-REF-1 — minor, BROKEN-REFERENCE, owner V05

**Claim.** V05's *Citations* paragraph (l. 7–8) keeps a list rule of its own — 'a list or range after a volume prefix stays in that volume (`V06 §2.1, §3.2` is two sections of volume 6)' — and the text carries 132 bare continuations after a `Vnn §` prefix (e.g. l. 116 'V05 §3.11, §3.12', the §12 list l. 2896–2899), 45 of which also name an existing base section; canon S7 rules 'Vnn §x.y everywhere, self-references included', and V06's head states the opposite rule ('the prefix written on every section of a list'), so one string reads two ways in two volumes.

**Required change.** Write the volume prefix on every section of a list in V05 ('V05 §3.11, V05 §3.12'; 'V06 §2.1, V06 §3.2'), a range written once ('V05 §3.2–§3.7'), and replace the *Citations* sentence by V06's: 'the prefix written on every section of a list and once before a range'.

### V05-ROW-1 — minor, BROKEN-REFERENCE, owner V05

**Claim.** V05 cites row ids that no longer exist or are cited bare (ID-WX): 'V06 X10' (l. 246, l. 1474) and 'V06 (X10)' (§10 BCR-V5-23's row, l. 2873), 'V06 (IN-V06-3)' (§10 BCR-V5-28's row, l. 2878) — V06's X1–X49 table and its IN notes left the volume; 'X-V12-11' (l. 2343), 'X-V12-4' (l. 2686), 'X-V12-16' (l. 2732), 'X-V12-17' (l. 2737) — V12 carries no X-V12 rows; 'V02 §3.15.2 and X20' (§13, l. 2924) cites V02's row bare.

**Required change.** Replace each by the section that now holds the closure: 'V06 §2.1, V06 §3.8.1' (l. 246, l. 2873), 'V06 §3.4 (8)' (l. 1474), 'V06 §3.2's `afterGrowth` participant table' (l. 2878), 'V12 §3.7.8' (l. 2343), 'V12 §3.9.1' (l. 2686), 'V12 §3.11' (l. 2732), 'V12 §2.8' (l. 2737); write 'V02 X20' at l. 2924.

### V05-IN-1 — minor, ID, owner V05

**Claim.** V05's *Integration notes* (l. 2938–2946) keep the five rows IN-V05-1 … IN-V05-5 with their ids; ID-WX rules 'The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records', and the canon's closure for V05:IN-V05-1 … -5 is 'fold the note into the body at its home, then drop the note (S9, ID-WX)'; V06 did so (one pointer paragraph, no ids).

**Required change.** Replace V05's *Integration notes* list by one pointer paragraph without the IN ids, as V06's reads: 'Every integration decision on this volume is folded into the body at its home: the bends (V05 §4.2's table, V05 §3.2 (3)–(4), §3.21 (3), §3.22 (3)–(4)); DR27 (V05 §4.4); the rim's closure-arc kind `sheer` (V05 §3.21 (1)); the fix list's cross-volume items (V05 §13)' (the removal-form note is replaced by item 114's part, V05-G114).

### V05-DUP-1 — minor, ELEGANCE, owner V05

**Claim.** The routed V05-DUP-1 ('state the shade-evaluation schedule once (V05 §3.19 (6)) and cite it elsewhere') is only partly applied: §2.6's intro says 'the shade-evaluation moments a create cell cites are V05 §3.19 (6)'s', yet the create cells of `IslandShadeStrip` onto the ground (l. 626: '… at its first read — volume 1's S9b at S10a's `afterDrivers` hook where registered, else field pass 2 — and each epoch's S6 re-evaluation') and onto an island (l. 627: 'SKY's last step …; a re-derivation starting after SKY, at S10a's start after the bases; each epoch') and §3.1's S10a row (l. 656: '… at S10a's start, before step (i) and every hook — the `shadeBasis` of every live island, then the strips onto islands') restate the moments.

**Required change.** Write each of those cells as 'at every shade evaluation (V05 §3.19 (6))' plus only what is the row's own (the strip's first-read hold; 'none from an island without a `shadeBasis`'; the OR with V06's mask at an epoch), and §3.1's S10a row as 'the strips onto the ground at each shade evaluation of V05 §3.19 (6), OR-ed by pass 2 into the daylight term's per-sample mask'.

### PIPE-NODE-1 — minor, CONFLICT, owner pipeline

**Claim.** The routed V05-RESTATE-3 (one home for the node bonus's value) is open at the base: II.6 (3) (l. 18282) writes 'by the rule's `node.bonus` (0.25, clamped to 1)' while the value's home is V05 §2.4's `node` row ('bonus 0.25', l. 538) and II.6's own `IslandRule` comment (l. 18315) says 'its node.bonus is (3)'s' — two homes for one constant.

**Required change.** II.6 (3) reads 'by the rule's `node.bonus` (V05 §2.4; clamped to 1)', and l. 18315's comment reads 'its node.bonus is V05 §2.4's, read by (3)'.

### V06-TERM-1 — minor, TERM, owner V06

**Claim.** G-dwell (routed to V06's one hit) retires D, D_b, D_v, D_o for dwellings ('N (N_b, N_v = N − N_o); D(x) is item 102's daylight share everywhere'); V06 §3.5.1 (2) (l. 1122) still names the candidate dwellings `D_b`.

**Required change.** V06 §3.5.1 (2) reads 'The candidate dwellings `N_b` = …' and every later use of `D_b` in V06 §3.5.1 reads `N_b`.

### V06-REF-2 — minor, BROKEN-REFERENCE, owner V06

**Claim.** V06 §2.12's crypt row (l. 776) sends every cell to 'V03 §3.7.2' ('its lifecycle row is V03 §3.7.2's'); V03 §3.7.2 is *Access heads*; the crypt's lifecycle row is V03 §2.5's `Basement.crypt` row (V03 l. 845; its ring, rank and entry V03 §3.7.4). The canon's reference routing for V06-0129 was a near-match to V03-0234 (access heads), which the rewrite followed.

**Required change.** Replace every 'V03 §3.7.2' in V06 §2.12's crypt row by 'V03 §2.5's `Basement.crypt` row' (the trim cell 'V03 §3.7.4 (3)').

### V06-BCR-1 — minor, BROKEN-REFERENCE, owner V06

**Claim.** V06 §10's pointer table names its 28 requests by description and item only; the request ids are still cited elsewhere — BCR-V6-26 in the base (2×) and V07, BCR-V6-1 in V07 and `_integrate.md`, BCR-V6-12 in V08, BCR-V6-20 and BCR-V6-24 in `_integrate.md` — and V05 §10 keeps the request id in its first column (one form for one kind of table, principle (9)).

**Required change.** V06 §10's first column carries each request's id with its description, in V05 §10's form ('BCR-V6-1 — the phase-based `EvolutionStrategy` …' through 'BCR-V6-28 — the crowding hook's void part at any rung'), by the canon's mapping (BCR-V6-1 → item 317 … BCR-V6-28 → item 574).

### V06-COH-2 — minor, COHESION, owner V06

**Claim.** V06 §11 Q1 (l. 3885) lists the four streams as '(M5, the village's V-M, M6-E, the plan rung's P0–P1; §16)'; V06 §8 (l. 3585), §16's M6-P row ('P0, P1 and P3 after M4') and INDEX §4 read 'the plan rung's P0, P1 and P3'.

**Required change.** V06 §11 Q1 reads 'the plan rung's P0, P1 and P3'.

### V06-PART-1 — minor, WIRING, owner V06

**Claim.** V07 §6 (l. 3253–3254) prices the participant `village.density` at a base-product epoch while a superseded plan exists (≤ 6 ms at the VILLAGE top's box) and says 'V06 §6.2's row cites this bound' (V07's cross-part note 4 to V06); V06 §6.2's participants table (l. 3381–3389) has rows for `sky.islands`, the four `under.*`, `hood.fabric` and `sky.clearance` but none for the village participants (`village.plan`, `village.density`, `village.pins`, `village.records`), which V06 §3.2 registers at every epoch, so the 'participants total' omits them.

**Required change.** Add to V06 §6.2's participants table the row '`village.plan`, `village.density`, `village.pins` and `village.records` (V07's participants; at a base-product epoch only `village.density`'s re-run of VS2 while a superseded plan exists) | V07 §6's bounds | V07 §6', and state that the participants total includes it.

### V06-STREAM-1 — minor, TERM, owner V06

**Claim.** V06 names the raised-way gate's stream by description — 'the base's raised-way stream' (W59 l. 299, §2.12 l. 785, §3.16 l. 2189 and l. 2226, §3.19 l. 2554) — while the base's stream table names it `raised.reason` (§6.1, l. 8714); determinism's cross-part note to V06 ('"the base's raised-way stream" is `raised.reason`') is not applied.

**Required change.** Each of those places reads 'the stream `raised.reason` (§6.1)'.

### V06-NARR-1 — minor, NEW-PROBLEM, owner V06

**Claim.** V06 §3.21's edge rows cite validation-record ids in normative text: 'EI-V06-EDGE-1' (l. 3001) and 'V06 §4.1; EI-V06-EDGE-2' (l. 3002) — edge-catalogue ids, which principle (5) keeps in the validation records.

**Required change.** Delete 'EI-V06-EDGE-1' and '; EI-V06-EDGE-2' from V06 §3.21's two rows.

## 3. Checked and found closed

* **V05.** §1b's stored-field rows moved to §2.6's lifecycle table (its intro says so): every removed row's producer and
  consumer found in §2.6 or at its base home (`levelledGroundCm`'s other readers at §4.7; the seven unit inputs at
  V01 §3.10.3; the lifecycle rows of `placeSkyAccess`, `convert removeIsland`, `reclearIsland` and the shade `regenerate`
  at §7.4). §2.4's split "new cells" rows merged with every value kept. §3.3's `A` and `E` at II.6 (5); §3.19's reach
  law at §4.5 (item 296); §3.22 (5)'s ground-only clauses at §4.3 (item 290 (5)); J-V5.81's stale "≈ 97 ms" dropped
  (V06 §6.2 now prices 228 / 255 ms); J-V5.80's three cells named at §8. Tests 32 / 32 kept (T-V5-33, -34 new);
  decisions 81 / 81 kept (J-V5.82 – J-V5.85 new); §10's 30 rows each with its f item. Conflicts MC-05, MC-07,
  CF-PIPE-06, V05-ICONF-1, V05-XCONF-1, CANON-C03 applied; wiring V05-WGAP-2a / 2b (V09 l. 1901, V10 l. 2158), -3
  (each reader named), W-HOOK-02 closed; g item 111's part (§3.8 (4), §3.11, J-V5.85) present; E-01, E-16, E-24 applied;
  17 hand-offs closed at their homes; the routed open findings closed except V05-RESTATE-3 (PIPE-NODE-1) and V05-DUP-1
  (part, V05-DUP-1 above).
* **V06.** §1b's 104 archived rows kept (W82 – W87 and the history rows new); tests 69 / 69 kept (T-V6-70 – 74 new);
  decisions 126 / 126 kept (J-V6.127 – 135 new; E-24's one mark on J-V6.4, .5, .111); §10's 28 rows equal BCR-V6-1 … 28
  by item; the arch-vault reconcile at V04 §3.5.4 (d); `CalamityRef` at §4.11; `Way.formerClass` at §2.4; the
  `raised.stripMarginM` cell at V01 §3.17.3; the advance group's undo in V06 §4.1's three cases. Conflicts V06-ICONF-1
  – 4, V06-XCONF-1, -2, V06-AGREE-1, CANON-C02, CANON-C03 applied; wiring W-DOS-02, -09, -10d, V06-WGAP-1a / 1b
  (`bend.time.hoodAlone`, V09 l. 1902), -2 closed; g items 111 (V06 §3.12.1) and 113 (V06 §3.20; J-V6.4 superseded by
  J-V6.127) present; 19 hand-offs closed at their homes.
* **Ids.** T-V5-1 – 34, J-V5.1 – 85, T-V6-1 – 74, J-V6.1 – 135, V06 W1 – W87 unique; DR26 – DR40 only (no alias left);
  no retired term left but G-dwell's `D_b` (V06-TERM-1); no deferral wording; no scratchpad path.
* **Edges.** V05's 108 entries and 31 combinations were closed by coherence/verify-edges-world-r0 (V05 §3.23 (a) – (g),
  T-V5-31, -33, -34); V06's by coherence/verify-edges-life-r0, which raised EL-08 and EL-10 for V06 — not repeated here.
* **Cohesion.** V05 §8 agrees with INDEX §3 / §4 and §16 (M6-sky after M6-U, its P0 beside M5, 17.25 – 23.25 pw, AP7 in
  §16's staged-screens row); V06 §8 states J122's slot and the four streams as INDEX §4 does, but its price and E9 are not
  in §16 or INDEX (V06-COH-1) and §11 misnames one stream (V06-COH-2). Both §11s mark their question answered (J122).

## 4. Cross-lane notes

* **File g item 114** was filed at 02:35 UTC, after every rewrite and the assembly had landed, and is in no canon route.
  Beyond the four issues above (V05, V06, model §2.8, determinism §7.1 / §7.4 / §7.6 / §7.8), its HOMES name scope
  (§13.2's bars), every stage that builds a listed kind (pipeline), and the volumes V04, V07, V08, V09 (§4.14's list,
  §4.20.3's delete, `info.remove.holds`), V10, V11 (the switch rows and defaults) and V12 (the bars) — their verifiers
  should raise F-MISSING where each part is absent. E-02 (KEEP APART) rests on the withdrawn rule and needs re-ruling
  with it.
* Duplicates kept for the adjudicator: V06-COH-1 = VAP-13 = AT-25 = VS0-17; V05-COH-1 = VAP-01 = VS0-18. V05-LOCK-1
  depends on EL-01 (determinism).
* The canon's reference routing for V06-0129 (a near-match to V03-0234, V03's access heads) caused V06-REF-2; a canon
  near-match should be confirmed by section before a rewrite cites it.
* `docs/validation/bench/doc_checks.py` was not re-run here; the rewrite reports' runs are provisional (the reference
  corpus is absent in this checkout).
