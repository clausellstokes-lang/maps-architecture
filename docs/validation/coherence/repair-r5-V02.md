# Repair round 5 — V02 (buildings, stage 3) — lane coherence/repair-V02-r5

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V02-r5; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V02-r5`, 2026-10-01)
- P0 brief read whole (issue list empty; ROUND-5 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); resume check: no output,
  no LANDED line: fresh start; adjudication-r5's header, summary, table of contents, R5-01, R5-04 and Part H · V02 (no
  issue, one END line) read whole; adjudication-r4's R4-03 (standing) read: done
- P1 the live V02 units concerned read whole (§5.7; the sweep's §0, §1b, §1c, §1d, §2.4, §3.18, §7.8, §8.6, §13's X34 and
  X36); the homes cited checked (V03 §5.6 (2) (a)–(c), V03 §3.11, V06 §3.23 (1)–(3), V06 §3.8.2 (2), T-V3-39 (c),
  T-V6-76 (b), V06 §3.21's decay-level row; VAF-R4T-03's and VDC4-01's records; repair-r5-rendering's note on this end):
  done
- P2 count-asserted edits and generated blocks (scratch `coherence/repair-V02-r5/build.py`: 5 edits, each applied exactly
  once; 3 REPLACE blocks): done
- P3 dry run of apply-blocks.py on a copy (3 of 3 applied, byte-identical to the generator's volume); tables, ids,
  references, review-id scan, doc_checks: done
- P4 result file and LANDED: done

## Summary

* **Blocks:** 3 `REPLACE` blocks on `docs/volumes/V02-buildings.md` (no retitle, no insert): §3.18, §5.7, §7.8.
  **Ruling requests: 0.**
* **Live file** (assemble-r4's output): `docs/volumes/V02-buildings.md` sha256 2579cb1696f4…; every REPLACE body is the
  live subsection with count-asserted substitutions (the paragraphs touched re-wrapped at 120 columns, every line before
  the first change in each reproducing the live wrap); every untouched line is verbatim. Expected volume sha256
  ad3eda06394a….
* **Binding rulings applied:** R5-01 (the seat's own sweep, below; no review id in design text; J141 grades as Part H
  gives them), R5-04 (the one comparison — the level above 0 and at least t, compared from the element's entry week into
  the plan; for an element a restoring event's re-cut mints, the week that restoration ends, before which it draws as
  built — written at V02's restatements). R4-03 stands (its V06 §3.23 (3) text is the home this volume cites); R3-01 –
  R3-03 and R4-01 stand.
* **Issues routed:** none (Part H · V02: "V02 owns no issue this round and runs for its END line", R5-01 (4)).
* **END lines:** 1 under Part H · V02 — written as given (below).

## END lines → where written (1 of 1)

* **END of VAF-R4T-03 (rendering; R5-04).** V02 §5.7 (2), both texts as given:
  1. "damaged, by §6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed threshold t: §6.3's
     `plan.damage`, V11's ranges)" now continues "from the element's entry week into the plan (V03 §5.6 (2) (a))" before
     "; or repaired".
  2. "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut makes) is
     drawn as built" → "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut
     makes), or one a restoring event's re-cut mints (V06 §3.23 (3)), is drawn as built".
  Nothing else of §5.7 changes; the paragraph is re-wrapped from its fourth line on. With rendering's §8.6 lead and
  T-ER-28, determinism's §6.3 *Plan damage*, V03 §5.6 (2) (a)–(b) and V06 §3.23 (3), every restatement of the comparison
  V02 carries now reads the same case the same way: a minted roof bay or outer run under a restoring `reoccupy`'s
  running `repair` Works is drawn as built, as the plan V02 reads draws it.

## The seat's sweep (R5-01 (2))

V02 was searched for every term R5-04 changes or relies on — "Plan damage", "`plan.damage`", "threshold", "entry week",
"entered the plan", "as built", "re-cut", "restoring", "restoration", "`decayPeak`", "damage left", "`extend` adds",
"never patched", "never decayed" — in prose, tables, edge rows, tests, fixtures and milestone cells. Conformed, beyond the
END line's text:
* **§3.18 (e), the exterior's restoration row** (l. 2521). It restated §5.7 (2)'s case list word for word ("a wing an
  `extend` adds, or an element a re-cut makes, after the damage left" → "the new elements drawn as built, never patched").
  The case now adds "or one a restoring event's re-cut mints while its `repair` Works runs", its outcome "the new elements
  drawn as built, never patched, and one a restoring re-cut mints never damaged by that restoration (compared, and its
  `decayPeak` read, from its entry week into the plan, V03 §5.6 (2) (a)–(b): a restoring re-cut's the week that
  restoration ends, V06 §3.23 (3))". Cases and outcomes still pair 3 and 3; the row keeps its five cells.
* **§7.8's damage sub-fixture and T-V2-59 (c)** (the tests' blind spot, R5-01 (2) (c)): the row above names T-V2-59 as
  its bar, and no fixture of T-V2-59 held a restoring re-cut, so a build drawing the minted elements by the bare
  comparison passed every V02 bar. The sub-fixture adds "and once reoccupied from derelict by another household (V06
  §3.8.2 (2)), its re-cut (V03 §3.11) minting rooms for them while its `repair` Works runs past its epoch's week (T-V3-39
  (c)'s case)" — the house, since a new household's unit rooms fail V03 §3.11's kept-room test and are minted, so their
  roof bays (keyed by the room's address, V03 §5.6 (1)) are new elements; T-V2-59 (c) adds "and every roof bay over a room
  and every outer wall run of a wing's lowest storey that the house's restoring re-cut mints drawn as built in every week
  of its `repair` Works, never holed, gapped or patched by that restoration (V06 §3.23 (3))". T-V2-59 (a)'s agreement
  with the plan now runs the case too. The case mirrors T-V3-39 (c) and T-V6-76 (b) (a `reoccupy` from derelict whose
  `repair` Works runs past its epoch's week). The CI tier's ≈ + 4 s stands (one more house's restoration weeks).

Kept as written, each with its reason:
* **§13's X34** ("an element that entered the plan after its building's damage left drawn as built, V03 §5.6 (2) (b)")
  and **X36** (`decayPeak` "since an element's entry into the plan … the entry week V03 §5.6 (2) (b) passes"): neither
  carries the restrictive list §5.7 (2) had; each reads the entry week V03 defines, under which a restoring re-cut's
  minted element enters the plan when that restoration ends — R4-03's sweep named both "need no change", and R5-04's
  sweep adds no END there.
* **§1b's `exteriorDamage` row, §1c's §6.3 row, §1d's *Items 123 and 122's other homes*, §2.4's `ExteriorDamage`**: they
  name the inputs and homes (the damage layer, §6.3's `plan.damage`, V06's `decayPeak` through V03 §5.6 (2) (b)) and
  restate no comparison.
* **§5.7 (1)'s level-0 sentence and §3.18 (e)'s level-0 row** ("a building never abandoned, under no look"): they already
  carry R5-04's "only when no disaster look stands over it".
* **§3.18 (e)'s level-1 row** ("level 1 → every element the plan holds damaged"): a building in a decay run at level 1;
  a `reoccupy` restores only from vacant or derelict (V06 §3.8.2), so no restoring re-cut runs at level 1, and V03
  §3.13's damage-layer row (the home) reads the same.
* **§6.6's budgets, §8.6's milestone, §0's plain words**: no restatement of the comparison.

## HAND-OFFS

None. Rendering's T-ER-28 and §8.6 lead, determinism's §6.3 and V09's texts are their own seats' fixes this round
(R5-04's Texts and Ends); V03 §5.6 (2), V06 §3.23 (3), T-V3-39 (c) and T-V6-76 (b) already carry the case.

## Checks

* **Dry run** (`docs/validation/amendments-b/apply-blocks.py`, unchanged, on copies of the live V02 and the rationale,
  the block section with its `=== FILE` line routed off as the assembler does): 3 of 3 applied, 0 skipped, 0 malformed;
  audit 0 not OK; headings 77 → 77, none retitled; fences balanced (16 → 16); the title block unchanged; the output
  byte-identical to the generator's volume (sha256 ad3eda06394a…).
* **Tables.** Every table row of the expected volume has its header's cell count (0 mismatches).
* **Ids.** No test, decision or hand-off id added or removed: T-V2-1 – T-V2-60 (60), J-V2.1 – J-V2.113 (113), X1 – X37
  (37). Every pointer added resolves: V03 §5.6 (2) (a), (a)–(b); V03 §3.11; V06 §3.23 (3); V06 §3.8.2 (2); T-V3-39 (c).
* **Scans.** No `R2-nn` – `R5-nn` or verifier id in the blocks; no changed line over 120 columns outside a table row.
* **doc_checks** (WARNING printed: reference corpus INCOMPLETE — captures, research/patreon, research/devlogs,
  research/ftg-docs and research/external missing — so the clean-room results are NOT authoritative; provisional), on the
  volume with the base's headings for S2: before → after C1 0 → 0, C2 0 → 0, C3 599 → 600 (535 → 536 unreviewed: the
  numeral run "§3.8.2 (2)), its" of our own text), C4 1 → 1 (0 unreviewed), S1 0 → 0, S2 207 → 211 (10 → 10 unreviewed:
  the volume's own "V02 §6.6" read against the base's headings, the class present before this round).

## Size (principle (9))

V02 94 303 → 94 443 words (+140, +0.15 %): §3.18 +43, §5.7 +22, §7.8 +75. All of it is content the END line and the
sweep require (the entry-week comparison and the minted case at §5.7 (2) and §3.18, the fixture case and its bar); no
word was removed, since the three subsections hold no restatement, narration or duplicated mechanism the touched
sentences could drop. No content was thinned.

=== FILE docs/volumes/V02-buildings.md ===

=== REPLACE ### 3.18 Edges — every mechanism at its limits (principle (11)) ===
### 3.18 Edges — every mechanism at its limits (principle (11))

Every mechanism of V02 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home.

**(a) Degenerate geometry.** Every geometry stage 3 commits — the massing, a mutation's lay, a `setMassing` commit, a
stack's lay — passes M13's snap and validation (V02 §3.5: an edge below `minEdge` merged, every ring simple and
counter-clockwise, every wing at least 4 m² with every side at least `minEdge`) and commits through S11's kernel
transaction, so a zero-length, zero-area, self-touching, collinear or coincident ring is never committed: at generation
it is an M14 attempt and ends at worst at rung 3, the base rectangle the base guarantees (V02 §3.13); in an edit it is
bent to the least lawful size (`bend.wing.grow`, V02 §4.2 step 2). A degenerate slot hint (zero area, or narrower than
every family's least lengths) reaches rung 3 at once, and below it the base's F-SITEPLAN ladder (§2.6). The composer's
products (dormer rows, porches, rooms) that would be degenerate are dropped or shortened by F-COMPOSE's rungs (V02
§3.13); the view's derivations (the roofscape, `stairFlight`, the exports) skip a zero-area facet or a zero-length line
and never fail a tile or an export. Tests: T-V2-9, T-V2-17, T-V2-56.

**(b) Rungs.** Stage 3 runs at every rung; only its inputs differ:

| rung | stage 3 |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | V07's `v.` classes compose by `composition.classFamily` (V02 §3.10.5); a town class plays its `villageForm`'s `v.` class (V02 §3.2); no stepped building unless V11 §3.24.3's culture × class specialisation applies to the `v.` class under V07's `rules.tiers.capPerSettlement` (X26); deck buildings on a village bridge by V02 §3.16; no raised way (the base's rung gate); every dwelling but a `grandClasses` building reads its row under the rung's grandeur ceiling — at most `single`, `L` or `T`, no tower, turret, gate tower or court — while a manor S10b admits and a building the dossier or the author makes grand keep their full rows (V02 §3.2 step 2; item 115); a disaster's ruined look falls on every building of V07 §5.6 (3)'s units (`villageDisasterUnits`: its ends, or in an end-less thorp its toft groups), a unit's buildings those on the plots `villageUnitPlots(doc, unit)` gives it (V02 §5.7) |
| TOWN | stage 3 whole; raised ways only as declared (V02 §3.17 (b)); stepped buildings at V11's caps (≤ 0.1 % of buildings, V02 §6.5); the grandeur ceiling caps nothing (V02 §3.2 step 2) |
| CITY, METROPOLIS | stage 3 whole; generated raised ways; V02 §6.1's rung rows; the grandeur ceiling caps nothing |
| the population cap | V02 §6.1's cap row; nothing else changes |
| any rung, the `VG` preset | `sunBias` 0.5 (V02 §3.10.9's preset entries); the rest as the rung's row |

Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55, T-V2-58, T-V2-60.

**(c) Toggles and presets.**

| toggle or preset | stage 3 |
|---|---|
| `MFCG`, `FTG` | `massing.composed` off: every class's family `baseOutline`, the base outline builder's footprints byte for byte (V02 §3.1; T-V2-26); `sunBias` 0.5 |
| `NG` | the `hatched` family's constructions; the NG parity sheet's roof construction by V01 §7's rule (X14); T-V2-32 |
| `FM` | the `FM` building look and its calibrated cells (V02 §3.10.8); T-V2-31 |
| `massing.composed` off (an edit of the option) | as under `MFCG` and `FTG`: every class's family `baseOutline` (V02 §3.1) |
| `fantasyShapes` off (the default) / on | the three fantasy families never drawn / drawn at their row weights (V02 §3.3; V02 §4.4's control) |
| item 110's rows off (the `item110.stepped` and `item110.deck` overlays) | byte-identical to the composer without them (T-V2-50) |
| the grandeur ceiling off (V11 §3.24.0's off form: every `grandeur.ceiling` row `enabled` false) | no row capped: every rung reads as TOWN does, byte-identical to stage 3 without item 115 (the `item115.off` pin, V12 §2.13) |
| `elaborate: 'view'` off | the `wings` rung only on a click (V02 §3.11) |
| the export option `compositions` | V02 §5.5 |
| Show crises (§2.9's `crises`): `follow` (the default) / `off` / `preview` | the disaster looks drawn in the view fall on their units' buildings / no look: each building's exterior by its own decay alone, as if no disaster look stood / the previewed `disaster` look at §10.2's `previewSeverity` on the units its preview strikes (V02 §5.7); item 123's damage is never switched |

Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55, T-V2-58, T-V2-60.

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's cells are V02 §2.5's and every event's §7.4's
row (V02 §4.4); the elaboration cache and every derived view (V02 §2.4, the roofscape) are recomputed on load, undo,
redo and regenerate and never stored, so none goes stale in a save; a document without stage-3 fields loads by the
fallback migration row (T-V2-6), one without `MassingRef.stack` by the stack migration row (T-V2-46). The exterior's
damage and a disaster's ruined look (V02 §5.7) are derived at read and never stored: a load re-reads them from the
level, the plan in force and the looks, and an undo or redo of an epoch changes only the level they read, their damage
marks re-emitted with its delta (V02 §5.7 (8)). Tests: T-V2-6, T-V2-19, T-V2-20, T-V2-24, T-V2-34, T-V2-48, T-V2-59,
T-V2-60.

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory
data (E5), and degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| the stored composition (V02 §2.2) | a stored composition naming a wing key that left; an edited room whose host left; a secondary porch whose entrance left | listed in §7.3's orphan table with re-attach and discard (V02 §4.4), never dropped silently | leave out and report | T-V2-20 |
| the stored composition (V02 §2.2) | a stored composition whose `composition.json` slices a later table version changed | kept as stored (`edited` is never stale, V02 §3.11); its unedited parts re-derive only when the massing changes | — | T-V2-21 |
| the derived functions (V02 §2.4) | a side whose usable run is not positive; a `polygon` wing's free arc shorter than `bayM ÷ 2`; a wing with no ridge (`flat`, `none`) | no bay on that side or arc; no eave sides and so no dormer; `cryptSeedWings` on a building with none returns an empty list (V02 §3.14.5) | — | T-V2-53 |
| the row a building reads (V02 §3.2) | a class, family or structure with no row; a row breaking the arrangement law; V11's templates without the manor override, the role shares or item 427's columns | the chain's next key, ending at `default.<arrangement>/<band>`; the row skipped and reported at load (`arrangementSkip`); R7's defaults (V02 §8.4) | substitute | T-V2-33 |
| the rung ceiling (V02 §3.2 step 2) | a capped row keeping no family; an assignment's drift admitting none of the kept families; a `gatehouse` slot on a capped dwelling; a ceiling row that limits nothing or is off | the default row's capped families, else `baseOutline` (`ceilingEmpty`, reported); the drift's families read uncapped, the why fact naming it; the `outbuilding` row; no cap and no suffix | substitute | T-V2-58 |
| fitting (V02 §3.4) | the slot's `entranceOn` names no access segment; a zero-length access segment; `lir` of a sliver `H` | the plot's longest access segment gives `f`, and with none the massing takes rung 3, reported; a zero-length segment is never the longest; a clamped `w` below the least makes every family infeasible (M3), so rung 2, then rung 3 | substitute | T-V2-17, T-V2-56 |
| the massing (V02 §3.5) | a plot with no slot; a template that draws no structure | no `outline()` call; no building (open ground, V02 §3.10.7) | — | T-V2-56 |
| the massing (V02 §3.5) | one slot, one wing | the drawn family lays one range, or rung 2's `single` | simpler shape | T-V2-17 |
| the massing (V02 §3.5) | a hint below the family's least footprint `Amin`; a band above the plot's capacity | M3's budget test removes the family; M10's reverse-lattice shrink, then `overBudget` reported (T-V2-30) | simpler shape | T-V2-30 |
| the massing (V02 §3.5) | the most the rows draw (wings, blocks, towers, tiers) | every loop runs over a finite list — M7's and M8's candidates tried in drawn order until `k` are accepted or none remain — and at most three attempts of a family (M14), so no lay hangs; a lay the plot cannot hold is the next attempt | retry that piece | T-V2-17, T-V2-22 |
| the composer (V02 §3.6, V02 §3.7) | a building whose every eave has no bay; no main entrance side with room for a porch | no dormer; the porch ladder ends at `none` (F-COMPOSE (2)) | leave out and report | T-V2-12, T-V2-18 |
| the rooms rung (V02 §3.8) | a host shorter than the hall's least length; no host admitting a room | the room shortened once, then omitted, V03 placing that role (F-COMPOSE (3)) | leave out and report | T-V2-35 |
| the mutation (V02 §3.9) | a kept wing outside every target's ± 15 % side rule; a mutation toward the building's own family | the target unreachable, the next reachable family drawn; a mutation to its own family re-lays nothing (every wing kept) | substitute | T-V2-16 |
| elaboration (V02 §3.11) | a click on a building whose `wings` rung failed; a tile holding more buildings than one batch composes | the identity composition, reported (F-COMPOSE (4)); the batches of `viewBatchMs`, the massing's roofscape drawn meanwhile | substitute | T-V2-18, T-V2-22 |
| determinism (V02 §3.12) | two candidates at equal weight or distance; a row cell absent from `composition.json` | ties by the lowest key, then the fixed geometric enumeration order; an absent cell is resolved by V02 §3.2's chain before any draw, so no draw reads a missing range | — | T-V2-13, T-V2-33 |
| the owner's rules (V02 §3.14) | a split site whose works plot is lost; a ladder demotion with one member | the merge-back's two mutations in one event; the demotion keeps the member nearest its demand, the as-built bytes returning | — | T-V2-39, T-V2-40 |
| stepped massing (V02 §3.15) | a hint too small for a second tier; a draw of more tiers than fit | ST8's shrink, then the single fallback, reported (`tiersTruncated`, `shrineDropped`) | simpler shape | T-V2-46 |
| deck buildings (V02 §3.16) | a deck plot narrower than every family's least lengths; a deck whose `deckCm` is unset | F-MASSING to the base rectangle inside the plot; no deck plot at all (V02 §3.16 (1)) | simpler shape | T-V2-47 |
| item 110's rest (V02 §3.17) | a wall of zero height inside `terrace.wallBandCm`; a building meeting a raised way's pier strip | the wall-side sample equals the terrain's (nothing moves); the add path clears the building (V02 §3.17 (b)) | — | T-V2-51, T-V2-53 |
| the ops (V02 §4.1, V02 §4.2) | an op with no optional field; `addRange` whose two points coincide; a canvas drag to a zero-width range | every omitted value the row's central value (V02 §3.12); the zero-length centre line grows along the plot's frontage direction `f` (V02 §3.4) by `bend.wing.grow`'s rule, as a zero width grows to 2 m | repair locally | T-V2-19, T-V2-56 |
| `setComposition` (V02 §4.3) | `dormers` with count 0; `porch` with an `entrance` ordinal naming no current entrance | the eave's row stored with no dormer (`edited`); the op bends to the nearest side, rear or yard entrance (V02 §4.4's re-attach rule), and with none is a no-op, named | repair locally | T-V2-20, T-V2-56 |
| the skeleton file (V02 §4.5) | a `setMassing` line naming a key that no longer exists | orphaned and reported (§7.4's migrate cell) | leave out and report | T-V2-34 |
| editing stacks (V02 §4.6) | `centre` outside the plot; `radiusCm` giving tier 0 below 4 m² or a side below `minEdge` | the least move into the plot region; the ring grown to the least lawful size (`bend.wing.grow`), the stack re-inset | repair locally | T-V2-48 |
| drawing (V02 §5.1–§5.3, V02 §5.6) | a map with no building; a one-wing building; a sheet that omits one of V02 §5.3's cells | nothing drawn by stage 3; that wing's facets alone; the shipped default cell | — | T-V2-9, T-V2-56 |
| exports (V02 §5.5) | a scope with no building; a zero-area facet | no stage-3 entry; the facet skipped in every format | leave out | T-V2-24 |
| the exterior's damage (V02 §5.7) | level 0 (never abandoned, under no look); level 1; no plan in force (none stored, none current); a stale cached plan | nothing drawn, byte-identical (T123-7's no-op); every element the plan holds damaged, each from its entry week into the plan (V03 §5.6 (2) (a)); the massing reading, no hole or gap; the stale plan never read — the massing reading until the plan is re-derived | — | T-V2-59 |
| the exterior's damage (V02 §5.7) | a building with no roof bay over a room or no storeyed wing (a solid monument, a stack of solid tiers); a wing roofed `none` (the decline's roofless state, a fire's charred shell); a building under a Works whose stage draws no roof (`wallsRising`) or no building yet (`staked`, `groundBroken`) | no hole (gaps only where a storeyed wing has outer runs); no facet to hole — the gaps cut from its state row's outline, and every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while the building is `decayed` or `ruined`, damaged (§2.6 step 7); holes only in the facets the stage draws and gaps only on an outline it draws, nothing where it draws no building | — | T-V2-59 |
| the exterior's damage (V02 §5.7) | a restoration from level 1 to 0; a wing an `extend` adds, or an element a re-cut makes, after the damage left, or one a restoring event's re-cut mints while its `repair` Works runs; a building first met ruined (generated as a ruin, or reached by item 113's replay) | the damage leaving in reverse threshold order, each repaired bay patched and each repaired run drawn whole; the new elements drawn as built, never patched, and one a restoring re-cut mints never damaged by that restoration (compared, and its `decayPeak` read, from its entry week into the plan, V03 §5.6 (2) (a)–(b): a restoring re-cut's the week that restoration ends, V06 §3.23 (3)); its plan as built under its damage (V03), the exterior reading that plan | — | T-V2-59 |
| the damage marks (V02 §5.7 (8)) | a drawn week that moves a level without crossing a threshold; one that crosses one, a look's week edge or a rebuild's start; Show crises switched, a preview started or ended; View as changed; a plan entering force, or evicted from the elaboration cache; a commit that moves a level or a look's units; a cached tile holding a struck unit's buildings | nothing re-emitted; exactly the buildings whose marks change re-emitted, the rest untouched; the buildings of the looks' units before and after re-emitted; the looks' units at both keys tested and no building re-emitted where the same looks stand on the same units at both (every look-bearing condition is `public`, §7.7's DR44), the tile drawn under the new key (§8.8); that building re-emitted, its element reading joining or leaving; its marks in the commit's delta; the tile redrawn after each re-emission (its dirty box, §8.1 item 4) and keyed by the drawn week, `crises` and the effective key (§8.8) | — | T-V2-59, T-V2-60 |
| the ruined look (V02 §5.7) | severity 0 and 1; two disaster looks over one building; a condition the view's key withholds (a `none`-row one: a look-bearing condition is `public`, §7.7's DR44); a `preview` on a standalone document; a preview over buildings under a rebuild's Works; an overlay whose condition carries no calamity; an end-less thorp | the `disaster` row's two `lookLevel` ends; the higher level, with that look's pattern (ties: the lower condition id); no look on any building; the previewed look at `previewSeverity` on its preview's units; the look on every building of its units whatever their Works (a preview never hands over, V06 §3.22 (3)); the `scatter` pattern (V01 §3.16 (2)); its toft groups' buildings, by `villageUnitPlots` (V07 §5.6 (3)), and no other building | — | T-V2-60 |
| the ruined look (V02 §5.7) | a roofless building; a deck building; a tower; a stack; an underground building | its state row with the gaps; as any building (its own plan; no cellar); the tower room's roof bay opening its cone; each storeyed wing's own roof bays and lowest-storey runs, a solid wing none; none — below ground is V04's | — | T-V2-60 |

**(f) Combinations** — where another unit's feature meets a V02 mechanism at its limits; the rung column names the
§5 rung of a failure outcome, and — marks a rule with no failure:

| combination | outcome | rung | test |
|---|---|---|---|
| a cliff and a composed building | the massing stays inside `H` (V02 §3.4), which the base's plot model keeps off the cliff face; each wing's datum is `deriveBase` over its own samples (plinth and skirt, §2.6); a wing against a retaining wall at the cliff's foot takes the wall-side sample (item 231) | — | T-V2-1, T-V2-51 |
| steep ground and a composed building | above `axisSlope` a `fallLine` class lies along the fall line (V02 §3.4); every wing's datum per `deriveBase` | — | T-V2-41 |
| steep ground and tiers | tier 0's datum per `deriveBase`, the stack re-based by `rebaseStack`; a stair whose run the slope lengthens steepens up to `stairGradeMax`, reported `stairSteep` (V02 §3.15) | repair locally (the stair steepened, `stairSteep` reported) | T-V2-44, T-V2-45 |
| steep ground and a crypt | the crypt's floor at `max(lowest terrain sample under its ring, water table + crypt.freeboardCm)` (V02 §3.14.5 (d)) | — | T-V2-36 |
| a river, a coast, a moat or an oasis and a crypt | the water table decides the ladder's form — full, half-sunk or raised (V02 §3.14.5 (d)); the crypt is never refused | — | T-V2-36 |
| a coast or an oasis and a composed building | a `water`-axis class reads the nearest water face — an oasis's spring pool included (item 111) — within `axisWaterM` (V02 §3.4) | — | T-V2-41, T-V2-57 |
| a harbour and a composed building | deck plots on moles, piers, jetties and quay platforms by V02 §3.16; a bank quay's plots ground | — | T-V2-47 |
| a bridge over a river, or over a moat away from a gate, and a composed building | a deck plot's building by V02 §3.16 (deck datum, `maxFloors`, no basement); a ford, a drawbridge or a gate's moat deck carries no deck plot (§4.7 *Deck plots*) | — | T-V2-47 |
| a moat, a square, an oasis's spring pool or the map frame and a composed building, tiers or a crypt | none crosses the plot, so `H` excludes them, and a basement or crypt lies under its building inside the plot; an oasis's spring pool is water outside the plot (item 111), so `H` excludes it and a stack stands inside `H`, tier 0 on `deriveBase`'s datum over its own samples (V02 §3.15.2); a porch stays inside the plot, clear of ways (T-V2-12); the base's margin band keeps plots off the frame | — | T-V2-1, T-V2-12, T-V2-36, T-V2-57 |
| a raised way and a composed building, tiers or a crypt | the add path clears every building meeting its piers or strip (V02 §3.17 (b)); a cleared building's basement and crypt leave through V03 and V04's closure, never silently (V02 §3.14.5 (c)); a use a dossier crypt record binds is relocated by the base's relocation (§10.3), its crypt re-derived at its new building by the no-refusal ladder; a building inside an arch vault is clamped by `vaultClamp` (M11) | leave out and report (a cleared building, its basement and crypt); substitute (the bound use at its new building); repair locally (`vaultClamp`) | T-V2-53, T-V2-57 |
| a stage-2 neighbourhood (V01) and a composed building | the neighbourhood click raises the `wings` rung centre-out (V02 §3.11); V01's entrance reserve reads the `PorchKindRow`s (V02 §8.5) | — | T-V2-21 |
| a terraced ward (V01) and a composed building or a crypt | every building's datum within `plinthCm + 10 cm` of its own terrace's level (T-V2-51); a basement's and a crypt's floors read the levelled ground as their terrain samples | — | T-V2-51, T-V2-57 |
| a lock and a composed building | a lock on `wings/<key>` holds that wing against every mutation, re-derivation and edit of another wing (V02 §4.1); an op on it is refused with the lock named (item 101 R2) | — (a refusal, the lock named; item 101 R2) | T-V2-19 |
| a crypt and undo | undo of a `setMassing` or a mutation restores the former basement and crypt with every wing, byte for byte (V02 §4.2 step 5) | — | T-V2-36 |
| a settlement growing over a sealed void | a wing W6 adds over a sealed void draws its access once on V04's `sewer` key (V02 §3.9 W6); no `setMassing` op draws | — | T-V2-36 |
| a dossier removing what an edit pinned | the dossier fact wins (item 20): the building goes by its fate, and the `setMassing` and `setComposition` edits on it are orphaned and listed in §7.3's orphan table | leave out and report (the orphaned edits listed) | T-V2-57 |
| a rung change at an epoch and a standing composed building (item 115 (e)) | the crossing reshapes no standing building, up or down: its re-derivations read the ceiling of the rung its `MassingRef.row` records; a building new or rebuilt from that epoch reads the new rung's ceiling (V02 §3.2 step 2; V06 §3.8.5) | — | T-V2-58 |
| an epoch undone after a save | the epoch's recorded wing steps (`EditBase.mutations`) reverse exactly on the loaded document as before the save | — | T-V2-15, T-V2-57 |
| a disaster's look over a building really decayed | each element drawn at the higher of the two levels; an element the look's level does not reach keeps its real state, a repaired one its patch | — | T-V2-60 |
| a disaster's look and its aftermath (V06) | the look leaves a building where V06's `crisisLookYields` holds, so no week draws both the look and the rebuild's scaffolding; a building the next epoch really ruins or abandons reads its own level from the week its change shows (V06 §3.23 (1): the hazard's week, a `vacate`'s `decay` Works' start); an element only the look damaged is drawn in its real state when the look ends, never patched | — | T-V2-60 |
| a disaster's look and a Works on its building | a Works other than a `decay` Works begun by the week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) ends the look on that building (V06's `crisisLookYields`): its Works' stage and its own state drawn, never both; a `decay` Works, or one finished before the condition, leaves the look standing, its damage over what the stage draws — holes in the facets it draws, gaps on the outline it draws | — | T-V2-60 |
| a disaster's look over a deck building whose deck is ruined | the building by its own state row (§8.2's deck row) and the higher level; when the deck's fall tombstones it, nothing | — | T-V2-60 |
| a dossier change moving a condition's weeks or severity, or removing a building under a look | the look re-read at the next draw, no rung stale; a removed building drawn by its fate, no look on what is gone | — | T-V2-60 |
| an epoch undone, or a save and load, while a look stands | nothing stored: the exterior re-reads the restored level and the look's weeks, byte-identical to before | — | T-V2-59, T-V2-60 |
| a building's decline after its plan was derived (an epoch's `vacate`, a fire's `burn`, a flood's or a topple's `ruin`) | the `wings` and `rooms` rungs stay `current` (V02 §3.11) and the plan in force stands (§2.6 step 7); the exterior's element reading reads it at the rising level | — | T-V2-59 |
=== END ===

=== REPLACE ### 5.7 Ruin and disaster on the exterior (items 123 (d), 122) ===
### 5.7 Ruin and disaster on the exterior (items 123 (d), 122)

Two owner items reach the building's exterior, both looks: a building's floor plans show its ruin as a damage layer over
the same plan (item 123), and its exterior draws the same damage (item 123 (d)); a disaster's neighbourhoods look ruined
while it lasts (item 122 (b)). One reading, `exteriorDamage` (V02 §2.4), serves both. It changes no wing, `MassingRef`,
composition, stored plan, digest or hash, reads no model stream, and stores nothing.

**(1) The level.** A building's level is the higher of its **decay level** — V06's `decayLevel` for its lineage at
§2.9's `week`, 0 for a building never abandoned (item 123 (b)) — and the level of a **disaster look** over it: the
`disaster` row's `lookLevel` (§10.2; V11's values) at the condition's severity, linear between its two ends. A disaster
look lies over a building while the look is drawn in the view — its `ConditionOverlay` standing in the view's week by
§2.7's reader rule, its map row reading `disaster` (§7.7's DR44), admitted by the view's knowledge key (DR44's
admission; `ViewOpts.viewAs` lowering it, §9.2), and drawn by §2.9's `crises` in `follow` — or previewed: `crises` in
`preview` naming the `disaster` row, at §10.2's `previewSeverity`, with or without a dossier — while the building stands
in a unit the look strikes and has not handed over ((6); a preview never hands over, V06 §3.22 (3)). The units are those
V01's `disasterDistricts` returns (§10.2 (d)'s `neighbourhoods`) — for a preview, those it returns for the previewed
look, keyed on the look kind in the condition's stead (§10.2's placement; X35): at TOWN and above every district it
returns, and at THORP, HAMLET and VILLAGE every unit it returns there — V07 §5.6 (3)'s `villageDisasterUnits`, its ends
or in an end-less thorp its toft groups — a unit's buildings being those on the plots V07's
`villageUnitPlots(doc, unit)` gives it; every building of a unit draws the look, with no second, per-building share
(item 122 (b): whole neighbourhoods). Nothing of the look is drawn from a stream of its own: its units are V01's and
V07's (keyed by the condition's id), its elements' thresholds the building's lineage's (§6.3), its rubble the building's
render key's (§8.10). Of two looks over one building the higher level is drawn, with that look's pattern ((4); ties: the
lower condition id). At level 0 — a building never abandoned, under no look — nothing of this section is drawn: the
building draws byte-identically to stage 3 without items 122 and 123 (T123-7's no-op).

**(2) The element reading — where the building's plan is in force.** Where the building's plan rung is current or stored
(V03; a stale cached plan is not read, its elements no longer sure to lie on the massing's facets), the exterior draws
exactly the damage the plan shows at the level. V03's damage layer gives each element its state — intact; damaged, by
§6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed threshold t: §6.3's `plan.damage`, V11's
ranges) from the element's entry week into the plan (V03 §5.6 (2) (a)); or repaired, the level below its threshold and
V06's per-element `decayPeak` (the highest level since the element entered the plan, V06 §3.23 (3), read through V03
§5.6 (2) (b)) reaching it by the same comparison, its damage having left through a restoration (item 123 (b): a
`reoccupy` back into use, a repair), so an element added after its building's damage left (a wing an `extend` adds, an
element a re-cut makes), or one a restoring event's re-cut mints (V06 §3.23 (3)), is drawn as built — and V02 reads two
kinds of element, never a threshold of its own:
* **A roof bay over a room** (the roof over a room of the storey directly under it). Damaged, it is a **hole**: the
  room's ring clipped to the facets of the room's own wing (a tower room's to its tower's; never another wing's),
  removed from those facets and from every dormer facet over it, and drawn as §8.2's `decayed` row draws a roofless
  building (no roof construction, the fill at the row's alpha); the roof's lines (V02 §5.2 step 5) stop at its edge,
  which is drawn in `ink` at the `roofscape` program's `hipWeight`. A wing whose every roof bay is damaged draws no roof
  facet over its rooms: the lost upper storey item 123 (c) gives a `ruined` building, seen from above. Repaired, its
  facets take §8.2's patched-courses roof `pattern` (the `condition` row's) over its ring, at the neighbourhood band and
  finer — item 114's patch material on a roof.
* **An outer wall run of a wing's lowest storey** (a wall run of the plan with the outside on one face, on the first
  storey `storeyRange` gives that wing; a solid wing has none). Broken, it is a **gap**: the outline the drawing gives
  that wall — the footprint outline for a wing on the ground, the eave line of a wing standing on another — is not drawn
  over the run's span, and at the neighbourhood band and finer §8.2's rubble spill (the wall `breached` row's dots,
  keyed by the building's render key, §8.10 — never a model stream) covers a strip along the span reaching the
  `roofscape` program's cell `rubbleReachM` (1.5 m; V02 §5.3) to each side of the outline (at least 1 px), the fallen
  wall's spill inside and out. Repaired, the run's outline is drawn whole (its patch material the plan's to show, V03).

Marks standing on a hole go with it: the cupola, `sails` and every roof decoration whose foot lies in a hole are not
drawn; a plan chimney stands (its stack is masonry; §8.6 draws it as before). The porch and a secondary porch are drawn
only while the outer run carrying their entrance stands. A wing roofed `none` (the decline's roofless state, a fire's
charred shell) has no facet to hole: the building draws its state row, the gaps cut from that row's outline, and the
plan's open ceilings are the roof it lacks — every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while
the building is `decayed` or `ruined` (§2.6 step 7) — which T-V2-59 (b) holds (X34). Where a building at the decay
Works' `decaying` stage draws its roof with gaps along the ridge, §8.2's row draws the element reading's holes in their
place (X37).

**(3) The massing reading — where no plan is in force.** No element is known, so nothing is drawn that a plan could
contradict. A building's own decay draws its state row alone (§8.2, as before). A building under a disaster look draws,
over its state row, its roof tone lerped toward `ground` as the `abandoned` row lerps it (30 %) and its outline dashed
as the `decaying` row dashes it — the dash the look's second cue (item 112). When the building's plan comes into force
(a building click; V03's `view` derivation), the element reading's holes and gaps join that tone and dash; because every
threshold is keyed by the lineage and the element's id (§6.3), they are the same whenever, and by whichever trigger, the
plan is derived (V02 §3.11: no rung is raised for them).

**(4) The disaster's kind.** The look draws the damage of (2) and (3) whatever the disaster. Its kind — V01's
`disasterSource(doc, overlay, key).pattern` (V01 §2.3, V01 §3.16 (2): the overlay's calamity's type through V06 §2.4's
calamity table; `scatter` with no calamity, a preview's included) — adds one flavour: a `fire` pattern blackens, the
massing reading's tone lerping toward `ink` instead of `ground` and every hole drawn in the `charred` program's tone; a
`flood` and a `scatter` (an earthquake, every other kind, a preview) draw the damage alone — an earthquake's fallen
wings, towers and open roofs and a flood's fallen walls and outbuildings are that damage, and a flood's stained lower
storeys lie under the roofs a map draws from above (J-V2.113). The look leaves no patch: an element only the look
damaged is drawn in its real state again from the week the look no longer stands (V06's `decayPeak` never reads a look).

**(5) At each band.** City band: nothing of this section — the masses are the model's, and a ruined quarter's tone is
§8.2's crisis rows'. District band: the tone and the dash, and the element reading's holes and gaps. Neighbourhood band
and finer: the rubble spill and the patches as well, the composition's dormers, porches and decorations as (2) says.
Building band: where a building's plan is drawn, the plan draws its own damage (V03; §8.6); every other building's
exterior as at the neighbourhood band.

**(6) The hand-over** (item 122 (a)). The look leaves a building where V06 hands it over: from the week V06's
`crisisLookYields(doc, building, overlay, week)` holds — a Works other than a `decay` Works begun on the building by
that week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) — the
building draws its Works' stage and its own state, so no week draws both the ruined look and the rebuild's scaffolding;
a `decay` Works never ends the look. A building no rebuild reaches keeps the look until its condition no longer stands.
A building the next epoch really ruins or abandons reads its own level from the week its change shows (V06 §3.23 (1):
the hazard's week, a `vacate`'s `decay` Works' start), the look's level ruling only while it is the higher.

**(7) Exports.** A picture export — SVG, PNG, print — draws this section as the view draws it at its band, week and key
(item 122 (f)), from the damage marks of its transient list ((8)), the SVG carrying the holes in
`sem.building.roof.hole` and the rubble in `sem.building.rubble` (V02 §5.5); a battle map follows the damage by §11.1's
rule (item 123 (e)) and draws a disaster's look in its image only. The glTF, OBJ, CityJSON, GeoJSON and JSON exports
carry neither (J-V2.112).

**(8) Where it runs, and how it reaches the drawing.** `exteriorDamage` runs in the **generation worker**, where its
inputs live — the document, V06's levels over the lineage's lifecycle events, the plan in force in the elaboration cache
(§2.9), V01's `disasterSource` and V06's `crisisLookYields` — inside S14 (§8.1), for the buildings of each district
whose district, neighbourhood or building band S14 builds: a full build, a band request of the tiles entering the view
(§8.9), a picture export's transient list (§8.1 item 6), each at its drawn week, `crises` and effective knowledge key
(§2.9's keys, `ViewOpts.viewAs` lowering the key).
* **The damage marks.** Its result reaches the drawing as the building's damage marks, in its district's group (§8.1's
  `group`) of the display list or of a `DisplayDelta` (§8.9's generation → tile worker rows), each carrying the
  building's `entity`, its render key in `key` (the rubble's, §8.10), its `knownTo`, and one `revision`: a 32-bit hash
  of the building's leaf-digest revision, the plan's hash, its damaged and repaired element ids in plan order and its
  look's pattern (none without a look). A building under a disaster look has one `building.look` mark — kind `outline`,
  its footprint's outline; `building.look.fire` under a `fire` pattern — by which the drawing gives its roof the look's
  tone and its outline the dash ((3)) and, for a fire, its holes the charred tone ((4)). At the element reading each
  hole ring is an `area` mark `building.roof.hole`, each patched ring an `area` mark `building.roof.patch` and each gap
  span a `ribbon` mark `building.wall.gap` (its two points on its wing's outline), each naming its wing's key (a
  tower's) in its `wing` attribute column (§8.1's `attrs`), matched to the roofscape's `RoofFacet.wing`; their `lodMask`
  the district band and finer, the patches' the neighbourhood band and finer. The reading is their presence, and the
  level stays in the generation worker: every drawn form is decided there, so the tile worker reads none. A building
  with nothing of this section to draw — never abandoned and under no look, or at the massing reading under no look,
  where its state row draws its own decay — has no damage mark.
* **When it is sent again.** The generation worker keeps each building's last `revision` (4 B a building with damage
  marks) and re-emits, as a `DisplayDelta` over the districts whose bands the tile worker holds, exactly the buildings
  whose `revision` changes, removing the marks of a building left with none: when the drawn week moves — beside §8.1
  item 7's Works re-emission — testing the buildings with a plan in force whose level or peak is above 0 at either week
  and the buildings of the units of the looks standing in either week, a level that moves without crossing a threshold
  of its plan re-emitting nothing; when `crises` or the effective knowledge key changes (Show crises, a preview's start
  or end, View as), the buildings of the looks' units before and after; when a building's plan enters force (a building
  click, V03's `view` derivation answering a band request) or leaves it (evicted from the elaboration cache, or stale),
  that building; and after a commit — an edit, an epoch, an undo or redo, a regenerate, a dossier change applied — in
  §8.1 item 4's delta, the changed buildings and every building whose level, look units or hand-over the commit moves.
  Each delta's dirty boxes (§8.1 item 4) invalidate the cached tiles they meet.
* **In the tile worker.** The rasteriser clips each hole and patched ring against the facets of its wing in the
  roofscape it memoises (V02 §6.3), keeping the clipped rings beside it under the marks' `revision` (V02 §6.6), cuts the
  outline at each gap span and draws (2)–(5) by §5.3's `roofscape` program and the building's outline, which read the
  damage marks while they draw their building — no sheet entry paints a damage mark on its own, so none takes a slot
  (§8.2's slot resolution). A tile holding a damage mark is keyed by the drawn week, and one holding a `building.look`
  mark by `crises` and the effective knowledge key as well (§8.8's tile key; X37). The SVG writer draws the same marks
  from its transient list in the generation worker, clipping against the roofscape it derives there (V02 §5.2); a raster
  export's list carries them to the tile worker with its request.
=== END ===

=== REPLACE ### 7.8 Ruin and disaster on the exterior ===
### 7.8 Ruin and disaster on the exterior

**Fixtures.** A **damage sub-fixture** of B-MASS: a `dwelling-detached` house, an `inn-compound` round its court, a
manor with towers and a turret, a stepped temple with its shrine and solid tiers, a terraced palace, a deck building on
a bridge, a solid stepped monument and a `hovel`, each with its plan derived (V03), drawn at decay levels 0, 0.1, 0.2,
0.3, 0.5, 0.75 and 1 (V06's level, set by the building's existence state and years, in stone and in timber), then
restored from 1 to 0 by a `repair` Works — the manor then extended by a wing (`extend`) — and each once with no plan in
force; and the house once burned (`burn`), its shell charred, and once reoccupied from derelict by another household
(V06 §3.8.2 (2)), its re-cut (V03 §3.11) minting rooms for them while its `repair` Works runs past its epoch's week
(T-V3-39 (c)'s case). A **look fixture** on B-CITY-lite's TOWN and CITY seeds, B-VILLAGE's VILLAGE seed and an end-less
THORP of B-VILLAGE (V07 §5.6 (7)'s no-end case, as T-V7-69 (c) runs it: no anchor, so its units are its toft groups, V07
§5.6 (3)): a fire, a flood and an earthquake, each a calamity carried by V08's port with its linked `reconstruction`
condition (V08 §3.16 (7) (b)), whose map row then reads `disaster` (V11's map rows), at severities 0, 0.5 and 1, the
condition's `sinceWeek` 10 and `untilWeek` 20; on one seed a rebuild's `repair` Works beginning in week 18 on half the
struck buildings and a `decay` Works on two others, and a second calamity with its linked condition overlapping the
first; an `infiltrated` stressor (a `none`-row condition, V11's map rows) carried beside the looks, standing in their
weeks; the same documents with Show crises `off` and with no condition; and the `disaster` preview on a standalone
document and on the rebuilt seed, its units holding buildings under the rebuild's Works.

* **T-V2-59 the exterior agrees with the plan** (item 123 (d), (f); takes T123-5 and T123-7's exterior clause) — on the
  damage sub-fixture at every level and every restoration step: (a) the holes are exactly the plan's damaged roof bays
  over rooms (ring for ring after the clip to their wing's facets), the gaps exactly its broken outer runs of each
  wing's lowest storey (span for span) and the patched rings exactly its repaired roof bays — none drawn where the plan
  shows the element intact; (b) on each building while `decayed` or `ruined`, the burned house's charred shell among
  them, no roof facet is drawn over a wing roofed `none` and every roof bay over a room of such a wing is damaged
  whatever its threshold (§2.6 step 7); (c) the holes and gaps at a higher level contain those at a lower, and the
  restoration removes them in reverse threshold order, each repaired bay patched and each repaired run drawn whole, the
  wing the `extend` then adds drawn as built, never patched, and every roof bay over a room and every outer wall run of
  a wing's lowest storey that the house's restoring re-cut mints drawn as built in every week of its `repair` Works,
  never holed, gapped or patched by that restoration (V06 §3.23 (3)); (d) at level 0 before any decay every tile
  byte-identical to the same fixture without item 123 (T123-7's no-op) — the `item123.damage` registration of the damage
  sub-fixture's exteriors on V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's item-123 exterior step
  (M6b, V02 §8.6); (e) with no plan in force the massing reading — no hole, no gap — and, the plan then derived by a
  click and by V03's `view`, the same holes and gaps as from the stored plan; the plan then evicted from the elaboration
  cache, the building's damage marks re-emitted at the massing reading and its cached tile redrawn without them; a week
  step that moves a building's level without crossing a threshold re-emitting none of its marks, and one crossing a
  threshold re-emitting that building's alone; a plan derived while the building stood, the building then abandoned by
  an epoch's `vacate`, stays in force with its `wings` and `rooms` rungs `current`; (f) the model digest, every
  `MassingRef`, wing, stored composition and stored plan, and the saved bytes identical with the damage drawn and not,
  across a save and load and an undo and redo of the restoring epoch; (g) the glTF, OBJ and CityJSON exports
  byte-identical at every level, and an SVG at the neighbourhood band carrying the holes in `sem.building.roof.hole` and
  the rubble in `sem.building.rubble`, the outline open over each gap.
* **T-V2-60 a disaster's ruined look** (item 122; takes T122-1 and T122-7's `item122.crises` registration on the look
  fixture's exteriors) — on the look fixture: (a) every building of every unit `disasterDistricts` returns (at VILLAGE
  V07's ends, each on the plots `villageUnitPlots` gives it; on the end-less THORP its toft groups, likewise) draws the
  look in exactly the weeks it stands (10–19; 10–17 on a building whose rebuild's Works begins in week 18) and no
  building outside those units does (on the end-less THORP every building of a struck toft group draws it and no other
  building does) — at the element reading its holes and gaps equal its plan's damage at the higher of its own level and
  the look's, at the massing reading the toned roof and the dashed outline; (b) the model digest, every wing,
  `MassingRef`, stored composition and stored plan, and the saved bytes identical with Show crises `follow`, `off` and a
  preview and in every week; (c) with Show crises `off`, every building's exterior byte-identical to its drawing under
  no disaster look (its own decay alone), and with no condition and no preview every tile byte-identical to stage 3
  without item 122 (the `item122.crises` no-op — the `item122.crises` registration of the look fixture's exteriors on
  V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's ruined-look step (M6b, V02 §8.6)); (d) from week 18
  a building whose rebuild's Works began draws that Works' stage and not the look (V06's `crisisLookYields`), and a
  building under a `decay` Works keeps the look; the `disaster` preview on the rebuilt seed in week 18 draws the look on
  every building of its units, those under the rebuild's Works included (a preview never hands over); a building also
  really decayed drawn at the higher level; in week 20 every element in its real state, none patched by the look; (e)
  the disaster's condition, whose map row gives the look and so `public` (§7.7's DR44), draws the look on its units'
  buildings under View as at `public`, `local` and `secret` alike — the same drawing at each key, in every week of (a)
  and (d) — and the `infiltrated` stressor carried beside it (a `none`-row condition) draws no look on any building at
  any key; (f) the fire's buildings blackened (the `fire` pattern), the flood's and the earthquake's not (`flood`,
  `scatter`); of two overlapping looks the higher level drawn; (g) one building's holes and gaps identical across two
  views, at the district and neighbourhood bands and in an SVG and a PNG export; over a cached district-band tile
  holding a struck unit's buildings, Show crises switched `off` and back and a preview started and ended, the struck
  buildings' damage marks re-emitted and the tile redrawn after each, and View as changed among `public`, `local` and
  `secret`, the look standing at every key — the same drawing, no struck building's marks re-emitted (their `revision`
  unchanged, V02 §5.7 (8)) and the tile drawn under its new key (§8.8's tile key) — and the week step 17 → 18
  re-emitting exactly the buildings whose rebuild began; (h) the stepped temple, the deck building, a tower and a solid
  monument take V02 §3.18 (e)'s outcomes, and an underground building draws none of it.

**CI tiers for these:** T-V2-59 in the PR tier on the damage sub-fixture (≈ + 4 s); T-V2-60 in the PR tier on
B-CITY-lite's TOWN seed (≈ + 6 s) and nightly on every seed of the look fixture; both at the milestone on B-CITY
METROPOLIS with V02 §6.6's measurement.
=== END ===
