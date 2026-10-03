# Rewrite — design volume V06 (evolution)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V06; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V06`, 2026-10-03; the files on disk are the truth)
- P1 inputs gathered (canon unit V06, conflicts, f items, g 111/113 base texts, wiring, elegance, ids, hand-offs, edges, inventory); mechanical pass work/rewrite-V06/convert.py → converted.md: done
- P2 parts 00-head, 01-s0, 02-s1, 03-s1b: done
- P3 §2 data model (04-s2a, 05-s2b): done
- P4 §3.1–§3.9 (06–09): done
- P5 §3.10–§3.19 (10–13): done
- P6 §3.20 history replay (item 113), §3.12.1 failing springs (item 111), §3.21 edges: done
- P7 §4–§6: done
- P8 §7 tests, §8 build plan: done
- P9 §9 decisions, §10 pointers, §11–§13, integration notes: done
- P10 assemble, verify ids, references, terms, sizes: done
- P11 report, result file, LANDED: done

Source: `docs/volumes/V06-evolution.md` (4 631 lines; 106 357 words by the canon's count; 665 661 bytes; md5 95ed7b33e00cb9ad0a37548052555112).
Output: `docs/validation/coherence/new/volumes/V06-evolution.md` (3 931 lines; 93 952 words by the same count; 578 594 bytes). Working parts and scripts: `docs/validation/coherence/work/rewrite-V06/` (`parts/`, `assemble.sh`, `convert.py`, `edits/`, `mapping.py`, this report's `report.py`).

## 1 Sizes

**650.1 KB → 565.0 KB; 106 357 → 93 952 words (canon count), 11.7 % fewer.** The band set for this unit is 63 814 – 79 768 words.

| part | words before | words after | change | source |
|---|---|---|---|---|
| head | 2 279 | 185 | −2 094 | narration: banner blocks, the eight revision and reconciliation ledgers, PROGRESS and the reading record (V06-NARR-1); one marker line and the citation paragraph kept |
| §0 | 1 344 | 1 275 | −69 | narration ids out; item 113 and item 111 in plain words added |
| §1 | 2 922 | 2 943 | +21 | J-V6.4's out-of-scope bullet retired (V06-XCONF-1); hook rows for the replay and the spring added |
| §1b | 6 359 | 7 034 | +675 | critique ids out; W82–W87 and the history rows of the dossier trace (DR36–DR39, DR40, the wealth diff row) added; DR aliases numbered |
| §2 | 10 278 | 11 122 | +844 | restatements of base fields cut (§2.7, §2.8, §2.9 cite §2.4 and §2.7); spring and replay rows, `advance.stoppedAt?`, `HazardRow` `drought`, §2.14 added |
| §3.1 | 799 | 841 | +42 | narration ids out |
| §3.2 | 2 521 | 2 329 | −192 | the arch-vault reconcile cites V04 §3.5.4 (d); `sky.clearance` folds IN-V06-3 |
| §3.3 | 761 | 910 | +149 | degenerate `advance` inputs defined (EI-V06-EDGE-1) |
| §3.4 | 1 343 | 1 316 | −27 | narration ids out |
| §3.5 | 2 415 | 2 448 | +33 | narration ids out |
| §3.6 | 906 | 909 | +3 | narration ids out |
| §3.7 | 2 944 | 2 917 | −27 | narration ids out |
| §3.8 | 1 301 | 1 260 | −41 | narration ids out |
| §3.9 | 4 684 | 4 636 | −48 | narration ids out |
| §3.10 | 682 | 682 | +0 | narration ids out |
| §3.11 | 1 478 | 1 475 | −3 | narration ids out |
| §3.12 | 576 | 1 429 | +853 | item 111 (b) written: §3.12.1 failing springs and oases |
| §3.13 | 676 | 746 | +70 | IN-V06-2 folded (*Stacks*) |
| §3.14 | 389 | 390 | +1 | narration ids out |
| §3.15 | 1 294 | 1 389 | +95 | narration ids out |
| §3.16 | 820 | 859 | +39 | narration ids out |
| §3.17 | 443 | 482 | +39 | narration ids out |
| §3.18 | 3 676 | 3 874 | +198 | item 113 (d)–(e): the LOST state, growth over a sealed or lost void |
| §3.19 | 6 199 | 6 125 | −74 | V11 row list cut to a pointer; `skyAccessObstacles`; IN-V06-4 folded |
| §4 | 3 618 | 4 060 | +442 | advance undo cases (EI-V06-EDGE-2); the standalone neighbourhood document's decided rule (CANON-C02); replay hand forms |
| §5 | 1 825 | 2 087 | +262 | *Open a copy from here* (V06-ICONF-4); spring and replay drawing and words |
| §6 | 3 141 | 2 775 | −366 | V05 §6's rows cited by name, no quotation (V06-RESTATE-1); §6.7 replay budget added |
| §7 | 7 446 | 8 464 | +1 018 | T-V6-70 – T-V6-74 and the edge clauses added; narration out |
| §8 | 3 099 | 3 449 | +350 | E9 and the spring line added; M6-E's slot in the combined order (J122); register narration out |
| §9 | 8 629 | 9 131 | +502 | revision narration out (V06-NARR-2); E-24 marks; J-V6.127 – J-V6.135 added |
| §10 | 5 588 | 662 | −4 926 | restatement: 28 request blocks quoting base text → one pointer table (the base text is file f's) |
| §11 | 288 | 105 | −183 | Q1 answered (J122); the pricing history out (V06-NARR-3) |
| §12 | 2 208 | 421 | −1 787 | narration: receipts, md5s, per-round reading records out; two current paragraphs kept (V06-NARR-4) |
| §13 | 5 139 | 30 | −5 109 | the fix list's narration and the X1–X49 table out; every row closed at its target (V06-WGAP-2) |
| Integration notes | 429 | 99 | −330 | every note folded into the body at its home; one pointer paragraph |
| ledgers | 7 851 | 0 | −7 851 | narration: eleven reconciliation and finalization ledgers |
| §3.20 | 0 | 2 267 | +2 267 | new: item 113's history replay at generation |
| §3.21 | 0 | 2 819 | +2 819 | new: every edge and combination defined (principle (11)) |

**By source** (words removed; estimates where a passage mixed sources): NARRATION ≈ 18 800 — the head's banners and ledgers (2 094), the reconciliation and finalization ledgers (7 851), §12's receipts and reading records (1 787), §13's fix-list narration and hand-off table (5 109), Q1's pricing history (183), the integration notes' preamble (330), and the critique, seam and round ids and revision marks inside the body (≈ 1 450); RESTATEMENT ≈ 5 700 — the 28 request blocks (4 926 words of text file f now carries in the base) became one 662-word pointer table, V05 §6's quoted rows became row names (V06-RESTATE-1), §2.7's field meanings, §3.19's V11 cell list, the `deckOk` reading stated three times more, the rebase bend line and W86's story quotes became citations; DUPLICATED MECHANISMS ≈ 100 — E-01's two stretch-state rows cite §2.2 rule 5; VERBOSE PROSE — none cut beyond the above. **Added** ≈ 12 100: item 113's part (§3.20 2 267, §2.14 412, §6.7 231, E9 93, W83–W87, the hook, report, rendering, export and decision rows), item 111's part (§3.12.1 848 with its rows, W82, T-V6-71), principle (11)'s edge catalogue (§3.21 2 819, T-V6-73 and T-V6-74, the T-V6-23 (h)–(i) clauses), J-V6.127 – J-V6.135 (656), and the fixes the canon routed here (the conflicts' rulings, the folded integration notes, the wiring rows, the volume prefix on every element of a reference list).

**Below the band, and why.** Without the added design the volume shrank by ≈ 23 % (≈ 24 500 of 106 357 words), at the band's lower edge; with it, by 11.7 %. What remains is build-depth content of this volume's own: the record and table declarations (§2, 11 122), the phase order and its participants (§3.1–§3.3), the engine's rules phase by phase with their constants (§3.4–§3.19), the wiring table and the dossier trace (§1b, 7 034, principle (7)), the 74 bars (§7), the build plan (§8) and the 135 reasoned decisions (§9). Every paragraph left was read for restatement, narration and duplication; none was thinned to reach the band (the guard: never from content). Not a defect (principle (9)); the shrink is under half, so no nuance audit is triggered.

## 2 What the canon routed here, and where it stands

* **STATE (455 facts) and HISTORY OUT (V06-0497).** Every home fact is stated once in the new text (mapping table, §13 of this report). A token check (each fact's identifiers, dotted cells, ids and decimal values searched in the new text) finds 452 of 455 at full or ≥ 75 % coverage; the three below are plurals or truncations of present names (`MutationPlans`, `splitThro…`, `WhyProviders`); the 27 facts with no identifier token were read by hand. V06-0502 (the reconciliation notes) is narration and leaves the volume; V06-0497 (§12's history) leaves with it, §12 keeping its two current paragraphs.
* **REFERENCE (14).** Each restatement now cites its home (mapping table). Four are `[REF-HOME]`: the canon matched `EvolveOp`'s members (V06-0111 – -0113) to pipeline §4.11 and `Use.strain` (V06-0115) to model §2.7 only *near*; the landed base names `EvolveOp` in §4.11's union and defers its members to V06 (model §2.8's cause comment, determinism §7.1's "V06's EvolveOp"), and model §2.7's `Use` carries no `strain`, so the one statement stays at V06 §2.8 and V06 §2.9 (cross-part notes 1, 2).
* **Index rows (8)** stay as pointer rows (§1.3's six out-of-scope rows, W80, §3.18's opening paragraph).
* **§10 (28 requests; 21 blocks).** One pointer table: request → item → base section → this volume's side (ID-BCR). No `BCR-` id remains in the volume.
* **Owner question (V06-0496).** §11 Q1 is marked *Answered: J122 — (a), right after M4* (CANON-C03, V06-MISSING-1), with the current price 29–41.5 pw and no pricing history (V06-NARR-3); §8 states M6-E's slot in J122's combined order (four streams after M4).
* **Fix list and hand-offs (V06-0498, V06-0499).** §13 reads "None open"; every row of the former X1–X49 table is closed at its target (§9 of this report).
* **File f items cited as base text (46 routed):** every one is cited at the place it governs — 202, 206, 209, 226, 244, 245, 246, 252, 254, 260, 263, 264, 265, 266, 268, 270, 274, 275, 290, 291, 293, 317, 318, 319, 321, 322, 335, 336, 339, 342, 343, 347, 370, 388, 409, 429, 443, 458, 478, 479, 550, 568 (V06 §8: §16's totals computed once), 573, 574, 575, 581 (V06 §2.2: the table under `VG` at a village rung). Also cited where they govern: 207, 296, 346, 408, 436, 447.
* **Terms (G-cite, G-standalone, G-unitinput, G-forkat, G-strike, G-hollow, G-DR, G-lot, G-newrandom, G-dwell):** 0 retired forms remain (sweep, §11 of this report). Every volume reference carries its prefix, a list's every element included (`V04 §3.5.4, V04 §3.10`); a range keeps one prefix (`V06 §3.1–§3.2`); the head states the rule.

## 3 Elegance rulings applied

**E-01 — UNIFY the stretch-state profiles** (home §2.2 rule 5). V06 §2.12's two rows (`Enceinte.condition`, `RetainingWall.state`) cite §2.2 rule 5 for the mechanism and state only their own value set, knot role, absent default, writers and readers. Equivalence list:
* [x] canonical form — §2.2 rule 5's (cited, not restated)
* [x] write — near knot / far knot, `splitThrough`, a no-stretch writer writes the whole chain — §2.2 rule 5's; V06's writers each name their `StretchRef` ("the whole trace when it names none")
* [x] read — `sampleProfile` by arc length — §2.2 rule 5's
* [x] regenerate — carry by lattice point, `retaining.settings.stateSnapCm` — §2.2 rule 5's carry, cited in both rows
* [x] cut or join — J-K23's rekey pairing — §2.2 rule 5's
* [x] undo — the writing op's undo record — both rows (`repairWall`'s undo also restores the record's former lifecycle)
* [x] migrate — absent reads the default — both rows ("absent = standing")
* [x] RetainingWall keeps: `standing` · `decayed` · `ruined`; `retaining_state_knot`; writers the pool's `breach` (→ `decayed`) and `dismantle` (→ `ruined`) — V07's house-platform walls through the same pool — V05's landfall (`decayed`), `repairRetaining`; the restoration rule; readers V06 §3.19.4, V04's footings, the renderer, item 447's export, the clerk
* [x] Enceinte keeps: `standing` · `breached` · `dismantled`; `wall_state_knot`; writers `breach`, `dismantle`, V05's landfall (`breached`), `repairWall`; the record's lifecycle rules (the no-stretch `repairWall` lifting the neglect, V06 §2.8); §8.2's gap glyphs and trace discs; §11.1's per-run LineStrings

**E-02 — KEEP APART the removals that hold** (home item 260, §2.8, one lift rule). V06 §2.13 keeps `LifecycleEvent.detail.suppress` for raised ways, harbour-mouth chains, quay walls, retaining walls and deck plots, and states that islands and sky accesses keep V05's record form (`SkyIsland.removed`, `.removedAccesses`) under the same lift rule, kept apart (E-02, §2.8); V06 §3.19.3 says the same in one sentence. [x] the lift rule stated once (item 260), cited; [x] no second record form introduced.

**E-24 — UNIFY the superseded and amended marks.** One mark at the start of the decision row: J-V6.4 *superseded by J-V6.127* (item 113, V06-XCONF-1); J-V6.5 *amended by J-V6.61*; J-V6.111 *amended by J-V6.126*. The reverse marks (J-V6.126's "amends", J-V6.127's "supersedes") and the inline "revised" / "Amended (…)" forms are gone. [x] no row dropped (J-V6.1 – J-V6.135 all present); [x] the governing row keeps the reason (J-V6.61, J-V6.126, J-V6.127).

**E-39 — KEEP APART the closure and decline states.** The way decline ladder (V06 §3.5.2, V07's hollow way), the wall stretch condition (E-01), the building lifecycle (§2.8) and the access states (V04) stay at their homes; item 113 (e)'s LOST state is V04's access state, read by V06 §3.18 (growth over a sealed or LOST void) and §3.20.5, not a new V06 state. [x] no state set merged; [x] LOST cited at V04.

## 4 Conflicts resolved (9)

| id | ruling | where in the new text |
|---|---|---|
| V06-ICONF-1 | a no-stretch `repairWall` on a ring with nothing to lift is a no-op with its line ("this wall is in use"), never a refusal | V06 §2.8's `repairWall` comment; V06 §4.2's repair row |
| V06-ICONF-2 | J-V6.92 reworded: the water-system record makes the need count as met, raises the aqueduct cap and total by `capPerSizeMember` per SIZE member, binds the terminal, never scales the chance | V06 §9 J-V6.92; V06 §3.19 (3), §3.19.6; §1b's trace (DR34) |
| V06-ICONF-3 | `EpochInputs.advance` carries `stoppedAt?` | V06 §2.3 (the one statement), §2.12's row, §10's row for item 343 ("with `stoppedAt?`"); T-V6-23 |
| V06-ICONF-4 | the disabled-tool offer is V09's *Open a copy from here* | V06 §5.1; G-forkat swept (0 "Change from here") |
| V06-XCONF-1 | g item 113 governs: J-V6.4 superseded, §1.3's bullet retired, the replay written at build depth | V06 §1.3, §3.20, §2.14, §6.7, §7 T-V6-70, T-V6-72, §8 E9, §9 J-V6.4 / J-V6.127 – J-V6.135 |
| V06-XCONF-2 | DR28 (one row with V08's) and DR29 by number; no alias, no "numbers it" | V06 §1b's dossier trace, §2.4, §10's DR28 row |
| V06-AGREE-1 | every delete dry-run line cites V09's `info.remove.holds` with its `{kind}` slot; the deck-plot wording is a V09 variant row | V06 §3.19.3 (6), §4.2's remove rows (cross-part note 4) |
| CANON-C02 | a standalone neighbourhood document has no clock: the time card absent; `advance` bends to "a neighbourhood alone has no history yet — open it in its town to advance time"; no deferral wording | V06 §4.1, J-V6.102, T-V6-23; V09 and V10 rows (cross-part note 3) |
| CANON-C03 | the owner questions are answered (J121/J122): V06 Q1 → (a) right after M4 | V06 §11, §8 |

## 5 Renumberings and new ids

* **Derivation rows (ID-DR):** DR-V6.1 → **DR28** (one row with V08's DR-V8.6); DR-V8.1 → **DR29**; "the coherence pass's row for item 105 (i) / 109 (b) / 109 (k) / 110 (b)" → **DR33**, **DR30** / **DR31**, **DR32**, **DR34** and **DR35** (V06-BREF-1, W-DOS-10d); the history rows **DR36 – DR39** and the oasis row **DR40** added to the trace.
* **Base change requests (ID-BCR):** BCR-V6-1 – BCR-V6-28 → items 317, 321, 254, 429, 209, 206, 264, 342, 343, 443, 458, 388, 275, 339, 409, 550, 335, 336, 293, 265, 266, 478, 479, 260, 290, 291, 573, 574 (V06 §10). Other volumes' requests cited in the body became their items (BCR-V2-32 → item 370, BCR-V2-40 → item 318, BCR-V3-29 → items 346, 347, BCR-V5-23 / BCR-V5-28 → the V05 sections that carry them).
* **Row ids (ID-WX):** the X1 – X49 hand-off table leaves the volume (each closed at its target, §9 of this report); IN-V06-1 – IN-V06-7 are folded into the body; other volumes' row ids are written with their volume (`V07 W70`); critique and seam ids are gone from normative text.
* **New ids:** W82 – W87 (§1b), T-V6-70 – T-V6-74 (§7), J-V6.127 – J-V6.135 (§9), §2.14, §3.12.1, §3.20, §3.21, §6.7. Existing ids keep their numbers: T-V6-1 – T-V6-69, J-V6.1 – J-V6.126, W1 – W81 (checked: each defined once, none missing, none cited undefined).

## 6 g items written at build depth

* **Item 113 — the history replay at generation (V06's part):** V06 §3.20 (3.20.1 where it runs — §4.11's history-first generation after S0 – S13a at the start population; 3.20.2 the plan — start, the undated peak, coarse epochs within `replay.maxEpochs` 60, signed weeks before creation, targets; 3.20.3 the event-to-epoch mapping — effect kinds `hazard`, `condition`, `slice`, `request`, `population`, `destroy`, `refound` from V11's rows, unmapped events reported; 3.20.4 lazy detail — participants' `replay` mode `every` / `last`; 3.20.5 destruction, refounding and burial — DR38, DR39, the LOST state at V04; 3.20.6 the `HistoryRecord` written once at the last coarse epoch's close, the read-only past range; 3.20.7 failure and limits), V06 §2.14 (`ReplayPlan`, `ReplayEpoch`, `ReplayEffect`, `EpochInputs.replay`), the replay epoch key `0x8000 + r` (V06 §3.16, §6.1's range), V06 §6.7's budget (≤ 10 / 30 / 90 s at TOWN / CITY / METROPOLIS, the coarsening fallback), W83 – W87, the dossier trace's DR36 – DR39, the report's `replay` section, chronicle and rendering rows, V06 §4.4's bend inside the past, T-V6-70 and T-V6-72 (bar, E9), §8's E9 (2.75 – 4.25 pw), J-V6.127 – J-V6.131 and J-V6.135.
* **Item 111 (b) — failing springs and oases over epochs (V06's part):** V06 §3.12.1 (the inputs over the span — drought years from `drought` events or the replay's condition effect, the town's draw against the spring's yield, a dossier `oasis_water` deposit turned `depleted` or `removed` (DR40); the new flow through `dmath`, floored at `spring.floorFlow`; the `setAttr(spring.flow)` write; below `spring.failFlow` the garden faces beyond `⌈flow × n⌉` wither to `commons` by `retypeLand` and the grove thins after their drawn spans, re-taken from `spring.regrowFlow` as the hinterland re-takes ground; the quarters around declining through the prosperity water term — no term of the engine's own; drying after `spring.dryAfterYears`), the `spring.*` rows of V06 §2.2, `HazardRow` `drought`, W82, the report's `springs` section and its chronicle kinds, the rendering and export rows, V06 §4.2's hand form (T2 `ground`'s flow), T-V6-71 (bar, E5), J-V6.132 and J-V6.134.

## 7 Wiring gaps closed

* **W-DOS-02** — the prosperity word over time: V06 §1b's trace reads V08 §3.5's `wealth` diff row into `EpochInputs.wealthLevel` (W27, DR6, item 343); V08 carries the row (cross-part note 6).
* **W-DOS-09** — the history as a derivation input: DR36 – DR39 in the trace and §3.20 (closed by g item 113's §7.7 part).
* **W-DOS-10d** — the trace cites DR33, DR34 and DR35 by number.
* **V06-WGAP-1a / 1b** — the standalone neighbourhood document's bend line is stated in V06 §4.1 and cited for V09's `bend.*` rows and V10's bend category (cross-part note 3).
* **V06-WGAP-2** — the hand-off table: every row verified at its destination (§9 of this report); the table leaves the volume; §13 keeps none open.

## 8 Edges defined (principle (11))

Every mechanism edge (110 from edges.md — 46 UNDEFINED, 64 UNTESTED — and the inventory's EI-V06-EDGE-1 and -2, UNDEFINED: 48 and 64 in all) and every owned combination (42 and the owner's two) now has its outcome, failure rung and test in V06 §3.21 (the general rule for degenerate geometry, E-GEN-1; one row per mechanism; one row per combination), tested by T-V6-73 (a)–(q) and T-V6-74 (a)–(f) and the named existing bars.

| edge | status before | defined at — test |
|---|---|---|
| M-V06-524-E5-data | UNDEFINED | V06 §3.21 row: the engine's interfaces — T-V6-26; T-V6-73 (a) |
| M-V06-689-E5-data | UNDEFINED | V06 §3.21 row: the trajectory and `advance` — T-V6-23 (h) |
| M-V06-724-E5-data | UNTESTED | V06 §3.21 row: hazard rows and the calamity table — T-V6-27; T-V6-73 (b) |
| M-V06-761-E5-data | UNDEFINED | V06 §3.21 row: `MutationPlan` — T-V6-15; T-V6-73 (c) |
| M-V06-774-E5-data | UNDEFINED | V06 §3.21 row: `BuildingShadeMask` — T-V6-12; T-V6-73 (d) |
| M-V06-795-E5-data | UNDEFINED | V06 §3.21 row: `EvolveOp` — T-V6-73 (e) |
| M-V06-821-E5-data | UNDEFINED | V06 §3.21 row: the epoch report and chronicle — T-V6-73 (f) |
| M-V06-935-E5-data | UNDEFINED | V06 §3.21 row: suppressions and the ledger — T-V6-58; T-V6-73 (g) |
| M-V06-973-E4-degenerate | UNDEFINED | V06 §3.21 row: the runner and the phase order — T-V6-2; T-V6-29 |
| M-V06-1024-E4-degenerate | UNDEFINED | V06 §3.21 row: the runner and the phase order — T-V6-2; T-V6-29 |
| M-V06-1104-E1-none | UNTESTED | V06 §3.21 row: epoch inputs — T-V6-23; T-V6-27; T-V6-51 |
| M-V06-1104-E2-one | UNTESTED | V06 §3.21 row: epoch inputs — T-V6-23; T-V6-27; T-V6-51 |
| M-V06-1104-E4-degenerate | UNDEFINED | V06 §3.21 row: epoch inputs — T-V6-23; T-V6-27; T-V6-51 |
| M-V06-1104-E5-data | UNTESTED | V06 §3.21 row: epoch inputs — T-V6-23; T-V6-27; T-V6-51 |
| M-V06-1104-E6-rungs | UNTESTED | V06 §3.21 row: epoch inputs — T-V6-23; T-V6-27; T-V6-51 |
| M-V06-1104-E8-lifecycle | UNTESTED | V06 §3.21 row: epoch inputs — T-V6-23; T-V6-27; T-V6-51 |
| M-V06-1154-E4-degenerate | UNDEFINED | V06 §3.21 row: `BuildingShadeMask` — T-V6-12; T-V6-73 (d) |
| M-V06-1154-E6-rungs | UNDEFINED | V06 §3.21 row: `BuildingShadeMask` — T-V6-12; T-V6-73 (d) |
| M-V06-1227-E1-none | UNTESTED | V06 §3.21 row: decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| M-V06-1227-E2-one | UNTESTED | V06 §3.21 row: decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| M-V06-1227-E3-cap | UNTESTED | V06 §3.21 row: decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| M-V06-1227-E4-degenerate | UNDEFINED | V06 §3.21 row: decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| M-V06-1227-E5-data | UNTESTED | V06 §3.21 row: decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| M-V06-1227-E6-rungs | UNTESTED | V06 §3.21 row: decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| M-V06-1227-E8-lifecycle | UNTESTED | V06 §3.21 row: decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h) |
| M-V06-1368-E1-none | UNTESTED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1368-E2-one | UNTESTED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1368-E3-cap | UNTESTED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1368-E4-degenerate | UNDEFINED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1368-E5-data | UNTESTED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1368-E6-rungs | UNDEFINED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1368-E7-toggles | UNTESTED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1368-E8-lifecycle | UNTESTED | V06 §3.21 row: growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i) |
| M-V06-1427-E1-none | UNTESTED | V06 §3.21 row: fortification — T-V6-9 – T-V6-11; T-V6-73 (j) |
| M-V06-1427-E2-one | UNTESTED | V06 §3.21 row: fortification — T-V6-9 – T-V6-11; T-V6-73 (j) |
| M-V06-1427-E3-cap | UNTESTED | V06 §3.21 row: fortification — T-V6-9 – T-V6-11; T-V6-73 (j) |
| M-V06-1427-E4-degenerate | UNDEFINED | V06 §3.21 row: fortification — T-V6-9 – T-V6-11; T-V6-73 (j) |
| M-V06-1427-E5-data | UNTESTED | V06 §3.21 row: fortification — T-V6-9 – T-V6-11; T-V6-73 (j) |
| M-V06-1427-E6-rungs | UNDEFINED | V06 §3.21 row: fortification — T-V6-9 – T-V6-11; T-V6-73 (j) |
| M-V06-1427-E8-lifecycle | UNTESTED | V06 §3.21 row: fortification — T-V6-9 – T-V6-11; T-V6-73 (j) |
| M-V06-1599-E1-none | UNTESTED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1599-E2-one | UNTESTED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1599-E3-cap | UNTESTED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1599-E4-degenerate | UNDEFINED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1599-E5-data | UNTESTED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1599-E6-rungs | UNTESTED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1599-E8-lifecycle | UNTESTED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1678-E4-degenerate | UNDEFINED | V06 §3.21 row: regrowth and uses — T-V6-7; T-V6-13; T-V6-51 |
| M-V06-1934-E1-none | UNTESTED | V06 §3.21 row: mutation plans over epochs — T-V6-15 |
| M-V06-1934-E2-one | UNTESTED | V06 §3.21 row: mutation plans over epochs — T-V6-15 |
| M-V06-1934-E3-cap | UNTESTED | V06 §3.21 row: mutation plans over epochs — T-V6-15 |
| M-V06-1934-E5-data | UNTESTED | V06 §3.21 row: mutation plans over epochs — T-V6-15 |
| M-V06-1934-E8-lifecycle | UNTESTED | V06 §3.21 row: mutation plans over epochs — T-V6-15 |
| M-V06-1975-E1-none | UNTESTED | V06 §3.21 row: hazards — T-V6-16; T-V6-17; T-V6-73 (k) |
| M-V06-1975-E2-one | UNTESTED | V06 §3.21 row: hazards — T-V6-16; T-V6-17; T-V6-73 (k) |
| M-V06-1975-E3-cap | UNTESTED | V06 §3.21 row: hazards — T-V6-16; T-V6-17; T-V6-73 (k) |
| M-V06-1975-E4-degenerate | UNDEFINED | V06 §3.21 row: hazards — T-V6-16; T-V6-17; T-V6-73 (k) |
| M-V06-1975-E5-data | UNTESTED | V06 §3.21 row: hazards — T-V6-16; T-V6-17; T-V6-73 (k) |
| M-V06-1975-E6-rungs | UNDEFINED | V06 §3.21 row: hazards — T-V6-16; T-V6-17; T-V6-73 (k) |
| M-V06-1975-E8-lifecycle | UNDEFINED | V06 §3.21 row: hazards — T-V6-16; T-V6-17; T-V6-73 (k) |
| M-V06-2063-E1-none | UNDEFINED | V06 §3.21 row: terrain and water — T-V6-18; T-V6-71; T-V6-73 (l) |
| M-V06-2063-E2-one | UNDEFINED | V06 §3.21 row: terrain and water — T-V6-18; T-V6-71; T-V6-73 (l) |
| M-V06-2063-E3-cap | UNTESTED | V06 §3.21 row: terrain and water — T-V6-18; T-V6-71; T-V6-73 (l) |
| M-V06-2063-E4-degenerate | UNDEFINED | V06 §3.21 row: terrain and water — T-V6-18; T-V6-71; T-V6-73 (l) |
| M-V06-2063-E5-data | UNTESTED | V06 §3.21 row: terrain and water — T-V6-18; T-V6-71; T-V6-73 (l) |
| M-V06-2063-E7-toggles | UNTESTED | V06 §3.21 row: terrain and water — T-V6-18; T-V6-71; T-V6-73 (l) |
| M-V06-2063-E8-lifecycle | UNDEFINED | V06 §3.21 row: terrain and water — T-V6-18; T-V6-71; T-V6-73 (l) |
| M-V06-2097-E1-none | UNTESTED | V06 §3.21 row: Works scheduling — T-V6-19; T-V6-73 (m) |
| M-V06-2097-E2-one | UNTESTED | V06 §3.21 row: Works scheduling — T-V6-19; T-V6-73 (m) |
| M-V06-2097-E4-degenerate | UNDEFINED | V06 §3.21 row: Works scheduling — T-V6-19; T-V6-73 (m) |
| M-V06-2097-E5-data | UNDEFINED | V06 §3.21 row: Works scheduling — T-V6-19; T-V6-73 (m) |
| M-V06-2097-E8-lifecycle | UNDEFINED | V06 §3.21 row: Works scheduling — T-V6-19; T-V6-73 (m) |
| M-V06-2138-E5-data | UNTESTED | V06 §3.21 row: people — T-V6-20 |
| M-V06-2138-E8-lifecycle | UNTESTED | V06 §3.21 row: people — T-V6-20 |
| M-V06-2163-E1-none | UNTESTED | V06 §3.21 row: the history record and frames — T-V6-21 |
| M-V06-2163-E2-one | UNTESTED | V06 §3.21 row: the history record and frames — T-V6-21 |
| M-V06-2163-E4-degenerate | UNDEFINED | V06 §3.21 row: the history record and frames — T-V6-21 |
| M-V06-2163-E5-data | UNTESTED | V06 §3.21 row: the history record and frames — T-V6-21 |
| M-V06-2163-E8-lifecycle | UNTESTED | V06 §3.21 row: the history record and frames — T-V6-21 |
| M-V06-2243-E4-degenerate | UNDEFINED | V06 §3.21 row: *The general rule* (§5.1's E-GEN-1) — T-V6-73 |
| M-V06-2293-E1-none | UNTESTED | V06 §3.21 row: failure handling — T-V6-2; T-V6-73 (n) |
| M-V06-2293-E2-one | UNTESTED | V06 §3.21 row: failure handling — T-V6-2; T-V6-73 (n) |
| M-V06-2293-E4-degenerate | UNDEFINED | V06 §3.21 row: failure handling — T-V6-2; T-V6-73 (n) |
| M-V06-2293-E5-data | UNTESTED | V06 §3.21 row: failure handling — T-V6-2; T-V6-73 (n) |
| M-V06-2293-E8-lifecycle | UNDEFINED | V06 §3.21 row: failure handling — T-V6-2; T-V6-73 (n) |
| M-V06-2323-E4-degenerate | UNDEFINED | V06 §3.21 row: the underground over epochs — T-V6-33; T-V6-35; T-V6-74 (a) |
| M-V06-2540-E4-degenerate | UNDEFINED | V06 §3.21 row: raised ways over epochs — T-V6-57; T-V6-73 (o) |
| M-V06-2905-E1-none | UNTESTED | V06 §3.21 row: the trajectory and `advance`; the group's undo — T-V6-23 (h), (i) |
| M-V06-2905-E2-one | UNTESTED | V06 §3.21 row: the trajectory and `advance`; the group's undo — T-V6-23 (h), (i) |
| M-V06-2905-E4-degenerate | UNDEFINED | V06 §3.21 row: the trajectory and `advance`; the group's undo — T-V6-23 (h), (i) |
| M-V06-2905-E5-data | UNTESTED | V06 §3.21 row: the trajectory and `advance`; the group's undo — T-V6-23 (h), (i) |
| M-V06-2905-E8-lifecycle | UNTESTED | V06 §3.21 row: the trajectory and `advance`; the group's undo — T-V6-23 (h), (i) |
| M-V06-2939-E1-none | UNTESTED | V06 §3.21 row: hand forms — T-V6-73 (p) |
| M-V06-2939-E2-one | UNTESTED | V06 §3.21 row: hand forms — T-V6-73 (p) |
| M-V06-2939-E4-degenerate | UNDEFINED | V06 §3.21 row: hand forms — T-V6-73 (p) |
| M-V06-2939-E5-data | UNTESTED | V06 §3.21 row: hand forms — T-V6-73 (p) |
| M-V06-2939-E6-rungs | UNDEFINED | V06 §3.21 row: hand forms — T-V6-73 (p) |
| M-V06-2939-E8-lifecycle | UNTESTED | V06 §3.21 row: hand forms — T-V6-73 (p) |
| M-V06-2988-E1-none | UNDEFINED | V06 §3.21 row: locality — T-V6-3 |
| M-V06-2988-E2-one | UNDEFINED | V06 §3.21 row: locality — T-V6-3 |
| M-V06-3004-E8-lifecycle | UNDEFINED | V06 §3.21 row: forks and re-runs — T-V6-22; T-V6-70 (k) |
| M-V06-3029-E6-rungs | UNDEFINED | V06 §3.21 row: the clerk's view — T-V6-53 |
| M-V06-3064-E1-none | UNTESTED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| M-V06-3064-E2-one | UNTESTED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| M-V06-3064-E4-degenerate | UNDEFINED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| M-V06-3064-E5-data | UNTESTED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| M-V06-3064-E7-toggles | UNTESTED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| M-V06-3064-E8-lifecycle | UNDEFINED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| M-V06-3103-E4-degenerate | UNDEFINED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| M-V06-3126-E4-degenerate | UNDEFINED | V06 §3.21 row: rendering, labels, exports — T-V6-21; T-V6-73 (q) |
| EI-V06-EDGE-1 | UNDEFINED | V06 §3.3.2 *degenerate requests* (each a bend with its line: a span under half a week takes one week; a cadence below a week or fractional takes `max(1, ⌈cadenceWeeks⌉)`; `points` sorted, a repeated week keeping the last, a point at or before `W0` fixing the held value; `perYear ≤ −1` empties the town; a negative population reads 0; a non-finite number rejected by §11.2's schema) and V06 §3.21's trajectory row — T-V6-23 (h) |
| EI-V06-EDGE-2 | UNDEFINED | V06 §4.1's undo cases 1–3 (in the session that ran it; after a save and a reload; in a shared document), J-V6.133, and V06 §3.21's undo row — T-V6-23 (i) |

| combination | rungs | defined at — test |
|---|---|---|
| C-cliff-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-cliff-works | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (c) |
| C-steep-epoch | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-62 |
| C-steep-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-steep-works | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (c) |
| C-river-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-coast-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-harbour-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-moat-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-moat-works | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (c) |
| C-deckplot-history | VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (d) |
| C-square-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-square-works | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (c) |
| C-oasis-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-oasis-works | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (c) |
| C-frame-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (b) |
| C-frame-works | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (c) |
| C-hood-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-30; T-V6-70 (h) |
| C-terraced-ward-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (d) |
| C-composed-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (d) |
| C-tiers-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (d) |
| C-crypt-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (d) |
| C-plan-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (d) |
| C-sewer-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-33 – T-V6-40; T-V6-70 (f) |
| C-cavern-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-33 – T-V6-40; T-V6-70 (f) |
| C-ruin-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-33 – T-V6-40; T-V6-70 (f) |
| C-catacomb-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-33 – T-V6-40; T-V6-70 (f) |
| C-undercity-history | TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-33 – T-V6-40; T-V6-70 (f) |
| C-void-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-35; T-V6-74 (a) |
| C-access-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-33 – T-V6-40; T-V6-70 (f) |
| C-access-works | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (c) |
| C-vault-history | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-33 – T-V6-40; T-V6-70 (f) |
| C-island-history | CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-30; T-V6-66 |
| C-shade-history | CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-30; T-V6-66 |
| C-skyaccess-history | CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-30; T-V6-66 |
| C-landfall-history | CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-30; T-V6-66 |
| C-epoch-light | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (e) |
| C-history-lock | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (f) |
| C-history-saveload | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-12; T-V6-21; T-V6-70 (j) |
| C-history-light | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (e) |
| C-history-export | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-21; T-V6-70 (j) |
| C-works-light | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS | V06 §3.21's combination rows — T-V6-74 (e) |
| a settlement that grows over a sealed void (owner) | every rung | V06 §3.18 (growth over a sealed or LOST void) and V06 §3.21 — T-V6-35; T-V6-74 (a) |
| an epoch undone after a save (owner) | every rung | V06 §4.1's undo case 2 and V06 §3.21 — T-V6-23 (i) |

## 9 Hand-offs closed

**Routed to V06 (19), each verified in the new text:**

| hand-off | closed at |
|---|---|
| V02:X8 | V06 §3.4 — casters rasterised per wing (W6) |
| V07:FL-3 | V06 §3.2 — the arch-vault reconcile at every village rung in V04's maintenance mode; V06 §3.19 |
| V08:X3 | V06 §3.18.2 — `CalamityRef.deaths` into the catacomb need |
| V08:X11 | V06 §4.5 — the raised-way readings for V10 §3.9 (closed-stated; confirmed) |
| V08:X21 | V06 §2.10 — `EpochReport.raised.suppressedFired` (confirmed) |
| V08:X24 | V06 §3.2 row 12 and V06 §2.1 — the records placement at an epoch |
| V09:XV-V9-23 | V06 §3.19.3 (7) — each suppressed kind's serving re-add (confirmed) |
| V09:XV-V9-28 | V06 §2.10, V06 §3.19.3 (2) (confirmed) |
| V10:CVR-V10-5 | V06 §3.15 — the chronicle through `report(h)`, `locate(w)` and the frame builder |
| V10:CVR-V10-11 | V06 §3.19 (8), V06 §4.5 — `detail.why` with its reason values; the ledger's single-subject read |
| V11:X-V11-11 | V06 §2.2, V06 §3.19 — V11 §3.18's and V11 §3.24.2's rows cited, no copy |
| V11:X-V11-15 | no change in V06 (confirmed closed) |
| V11:X-V11-16 | no change in V06 (the rows it names are cited at their V11 homes) |
| V12:X-V12-4 | V06 §8 — the V6-E7 `PanelSpec` sitting |
| V12:X-V12-10 | V06 §3.19.3 — a removal keyed to its reason, never its course |
| V12:X-V12-11 | V06 §7 T-V6-65 — "off" read from V11 §3.24.0's switch table (IN-V06-5) |
| V12:X-V12-15 | V06 §8 — the register lines and bar registrations at each exit |
| V12:X-V12-17 | V06 §8 — every register line names its exit step `--milestone V6-E<n>` and its due; no V06 line is a corpus stage, so nothing is owed (the default `M-CAL/evolution` is V12 §3.11's rule) |
| V12:X-V12-19 | V06 §8, J-V6.126 — register lines dated by exit step (confirmed) |

**V06's own table X1 – X49 (removed from §13), each verified at its destination** (V01 – V05 and V07 in their landed coherence text, V08 – V12 in their current text, the base in the landed coherence base):

| row | target | closed by |
|---|---|---|
| X1 | V04 | `growthCapShare`, the primary and rank cap, `opts` with the calamity deaths in V04's `CatacombGrowth.grow` |
| X2 | V04 | `AccessPass.run` over `EpochScope`; the void vacating with cause `void` |
| X3 | V02, V03 | V03 §3.7.4's rank and the `undercroft` role |
| X4 | V07 | `ProductDecl.phases` as phase ids; the clamp's union (V06 §3.3.2) |
| X5 | V08 | `CalamityRef` with `deaths`; the port's carried facts |
| X6 | V09 | the history settings, the time card, *Open a copy from here*, the grey range |
| X7 | V10 | the four `WhyProvider`s; the `advance` shapes |
| X8 | V11 | the `crypt: 'always'` column; the calamity words in V06 §2.4 |
| X9 | V12 | T-V6-38's monotone bar and the epoch forms registered |
| X10 | V05 | `demandTaken` and cause `island` (landed) |
| X11 | V01 | `hood.fabric` at `afterGrowth` order 40 |
| X12 | base | DR28 and DR33 numbered in §7.7 |
| X13 | base | items 260, 290, 291 and `repairRaised` (item 209) applied |
| X14 | V04 | `ArchVaults.reconcile` over `scope.raised`; the invert drops; the tombstoned retaining wall as a step |
| X15 | V05 | `sky.clearance` at order 50; the landfall's ruined parts in `scope.raised` |
| X16 | V01 | `hood.fabric` over crossed close-ups; the terrace district; `raised.stripMarginM` |
| X17 | V10 | the raised-way provider's epoch readings (`raisedOutcome`) |
| X18 | V03 | the outside-ground row (nothing further owed) |
| X19 | V12 | the `raised.*` guards; T-V6-65's declared shift |
| X20 | V11 | answered (V11 §3.24.2, §3.24.1, §3.24.4) |
| X21 | V09 | `info.remove.holds`; the time card's raised-way badge; the hand forms |
| X22 | V07 | carried suppressions and ways; lapse and repair only at a village rung |
| X23 | V08 | the water-system record and landmarks carried (`aqueduct_or_water_system`) |
| X24 | V02 | nothing owed (V02 §3.16 (3)) |
| X25 | V04 | `Foundations.apply` exported, its epoch caller `under.extend`; the maintenance mode |
| X26 | V05 | the landfall writes `Way.formerClass` |
| X27 | V07 | `ProductEpochRows` from V07 §2.2's `epoch.rows` |
| X28 | V01 | `EpochScope.recut` for S9b; fabric and pins only under a new strip |
| X29 | base | item 573 applied; items 264, 275, 443 as amended |
| X30 | V09, V10 | the standalone neighbourhood document's bend line — not yet in V09's `bend.*` rows or V10's bend category: cross-part note 3 (V06-WGAP-1a / 1b) |
| X31 | V12 | §3.11's register names V11's four cells |
| X32 | V07 | `retireWay`, `effaceWay`, `reopenWay`; tier (5′) |
| X33 | V04 | *Access closures* and the landfall clearance; item 574 before item 319 |
| X34 | base | item 574 applied; items 268 and 209 as stated |
| X35 | V11 | the web's off form as one cell set (T-V6-44 cites it) |
| X36 | V07 | the placement rule's `reopenWay` before a toft placement |
| X37 | V05 | `breached` written, V06 §3.7.5 cited (met) |
| X38 | V12 | the `bar.<barId>` family; the split `decline` line |
| X39 | V09 | XV-V9-23 met |
| X40 | V01 | note (26) met |
| X41 | V05 | towers and gates draw by their run's `condition` |
| X42 | base | item 575's lifecycle sentence with the no-stretch `repairWall` |
| X43 | V07 | `VS1` / `VS2` stages for the participants |
| X44 | V09, V08 | `suppressedFired` read (met) |
| X45 | V01, V11 | the way-surface epoch clause met by V06 §3.4 (9) |
| X46 | V05 | the resize row prices the re-claimed landing yards |
| X47 | V08, V07 | closed |
| X48 | V10 | prompt rule 17 (met) |
| X49 | V12 | register lines dated `V6-E7` / `V6-E8` (and `V6-E9`, J-V6.126) |

## 10 Open findings closed (51)

| finding | closed by |
|---|---|
| VOL-V05-V06-RESTATEMENTS-013, V06-RESTATE-1 | V06 §6.2 names V05 §6's rows and takes their bounds by name; no quotation, no dated reading |
| V06-ICONF-1 – -4, V06-XCONF-1, -2, V06-AGREE-1 | §4 of this report |
| V06-ELEG-1 | E-02 (kept apart; one lift rule, item 260) |
| V06-EDGE-1 | V06 §3.3.2's degenerate requests; T-V6-23 (h) |
| V06-EDGE-2 | V06 §4.1's undo cases 1–3, J-V6.133; T-V6-23 (i) |
| V06-WGAP-1 | V06 §4.1's line; cross-part note 3 |
| V06-WGAP-2 | §9 of this report; §13 none open |
| V06-MISSING-1 | V06 §11 Q1 answered; V06 §8's slot in J122's order |
| V06-MISSING-2 | item 111 (b) written (§6 of this report) |
| V06-MISSING-3 | item 113 written (§6 of this report) |
| V06-TERM-1 | G-cite: every reference `Vnn §x.y` |
| V06-TERM-2 | one name each: *hollow way* (V07's), *strike pool* (defined once at V06 §3.5.2) |
| V06-DEFER-1 | the standalone neighbourhood document's decided rule (CANON-C02); no deferral wording |
| V06-NARR-1 – -5 | narration out: banners, ledgers, reading record, revision marks, pricing history, receipts, critique and seam ids (sweep: 0) |
| V06-BREF-1 (and .r32 – .r35) | DR33, DR30 / DR31, DR32, DR34, DR35 by number |
| V06-BREF-2 (and .r19 – .r31) | every scratch-file and receipt pointer removed with the narration (sweep: 0 "scratchpad") |
| V06:IN-V06-1 – -7 | folded at their homes (mapping V06-0500, -0501; the *Integration notes* paragraph) |

## 11 Checks run

* Ids: T-V6-1 – T-V6-74, J-V6.1 – J-V6.135, W1 – W87 each defined once, none missing, none cited undefined; no X or IN row; no `BCR-` id.
* References: every `§` token classified (direct volume prefix, list continuation, bare). 1 489 prefixed references, each resolving to a heading of its volume (six of them are `§1b` and `V04 §1b.2`, sections the numeric heading scan does not list, read by hand); 17 range ends (`V06 §3.1–§3.2`) inside their volume; 470 bare references exist only in the base; 274 bare references exist in both the base and V06 and were read one by one — each means the base (the ten that meant V06 were prefixed, and `§2.2's deriveBase` corrected to §2.6's); 0 bare references to a V06-only section remain.
* Retired terms and narration (sweep): 0 for `V6 §`, `BCR-`, `IN-V06`, `X<n>` rows, `DR-V`, critique and seam ids (C6-, ST-, TR- … SCC-, SR, SLR, V<n>C-), `round <n>`, `reconcile-V`, `coherence pass`, `scratchpad`, `md5`, `lottery`, `retired way`, `decline pool`, `Change from here`, `hand-over`, `scoped re-roll`, `lot(s)`, `first text`; one marker line.
* Section structure: the title line and §0 – §13 with *Integration notes* as before; §2.14, §3.20 and §3.21 added.
* Intra-volume duplication: 14-word shingle scan; the remaining repeats are decision rows stating their choice (the §9 form) and short cross-references.
* `docs/validation/bench/doc_checks.py --doc …/new/volumes/V06-evolution.md`: C1 0, C2 0, C4 0, S1 0 (as before the pass); C3 247 hits (411 before), S2 542 unreviewed (569 before). **Provisional:** the reference corpus is absent from this checkout (the script says so), so these results are not authoritative and C3/S2 are unreviewed counts, not findings.

## 12 Cross-part notes

1. **pipeline §4.11 / model §2.8 (item 209).** The landed base names `EvolveOp` in `ConversionOp`'s union and defers its members to V06 (model §2.8's cause comment; determinism §7.1 "V06's EvolveOp"); V06 §2.8 is the statement. If the base takes the members, V06 §2.8 becomes a citation.
2. **model §2.7 (items 429, 335).** `Use.strain?` and `Household.transit?` are stated at V06 §2.9 and V06 §2.1; model §2.7's `Use` and `Household` should declare them citing V06 (or carry them and V06 cites).
3. **V09 and V10 (V06-WGAP-1a / 1b, X30, CANON-C02).** V09's `bend.*` rows need the line "a neighbourhood alone has no history yet — open it in its town to advance time" and V10's bend category its clerk row, citing V06 §4.1.
4. **V09 (V06-AGREE-1).** A deck-plot variant row of `info.remove.holds` ("No house will be built on this spot of the bridge"); model §2.8 and determinism §7.1, which quote "The city will not rebuild …", should cite V09's key.
5. **pipeline §4.11 (item 343).** `EpochInputs` lacks `wealthLevel?` and `advance? { group, index, of, stoppedAt?, trajectory? }`; V06 §2.3 states them (V06-ICONF-3's `stoppedAt?` included).
6. **V08 §3.5 (W-DOS-02).** The settlement diff table's `wealth` row (`label` → `attr`, response `epoch`) feeding `EpochInputs.wealthLevel` through `tables/dossier/wealth` (DR6).
7. **pipeline §4.11 (items 266, 336, 479, 264 (b), 206 (b)).** The landed base still reads the epoch-spread mutation "over the ladder's rung durations", lacks tiers (5′) / (5″) and the two stage exceptions, keeps "deciding whose households leave first" in step (c), lacks `mutate`'s `step` field and the oxbow minted by `shiftCourse`; V06 §3.10, §3.6 / §3.8.2, §3.5.1 and §3.12 state V06's side.
8. **model §2.7 (item 409 (c)).** The naming feature `formerWall` (V06 §5.2) has no base row.
9. **model §2.7's `Enceinte.underuseSince` comment** names "V11's `contract.occupiedShareMax`"; the row is V06 §2.2's (`tables/evolution.json`, V11 registry row 60).
10. **pipeline / model LandUse kinds.** Pipeline writes `garden_irrigated` where model's `LandUse` kind is `garden` (V06 §3.12.1 reads `garden` with `fedBy`).
11. **II.7.6 (item 113 (c)).** `RaiseGrade.cause` needs `'burial'` for the replay's burial (V06 §3.20.5).
12. **pipeline §4.11 *The clock*.** Signed weeks before creation (the replay's coarse epochs) and the week-of-year by floor-mod.
13. **V11 (item 113, item 111).** The history cells V06 reads: `history.epochYears`, `.burialYears`, `.symbolicQuantile`, `.reuseCost`, `.replay`, a `history.defaultAgeYears` per rung, the burial factors (flood, silt, rebuild, rock), the event-to-epoch rows for SettlementForge's 29 history event types (effect kind and parameters), the citadel and hostel classes. (The `spring.*` rows are V06 §2.2's, in `tables/evolution.json`, V11's registry row 60.)
14. **scope §16 / INDEX §4 (item 568).** M6-E's price is 29–41.5 pw (E9 and the spring line added); §16's totals move by the same amount; scope §13's test range "T-V6-1 – T-V6-69" reads "T-V6-1 – T-V6-74".
15. **V12.** Register `bar.T-V6-71` (E5) and `bar.T-V6-72` (E9) and the `V6-E9` due; the `spring.*` register line at E5.
16. **V08 (history reading).** DR36 – DR39's inputs read by the port (the history events' types, years ago and severity; the peak; destruction and resettlement).

## 13 Mapping table (502 inventory ids → new location)

| inventory id | kind | old § | canon role | new location |
|---|---|---|---|---|
| V06-0001 | summary | 0 | home | V06 §0 |
| V06-0002 | summary | 0 | home | V06 §0 |
| V06-0003 | summary | 0 | home | V06 §0 |
| V06-0004 | summary | 0 | home | V06 §0 |
| V06-0005 | summary | 0 | home | V06 §0 |
| V06-0006 | summary | 0 | home | V06 §0 |
| V06-0007 | summary | 0 | home | V06 §0 |
| V06-0008 | summary | 0 | home | V06 §0 |
| V06-0009 | summary | 0 | home | V06 §0 |
| V06-0010 | scope | 1.1 | home | V06 §1.1 |
| V06-0011 | hooktable | 1.2 | home | V06 §1.2 |
| V06-0012 | scope | 1.3 | index-row | V06 §1.3 (pointer row: V05 §3.15) |
| V06-0013 | scope | 1.3 | index-row | V06 §1.3 (pointer row: V04 §3.10, V04 §2.3, V04 §3.5) |
| V06-0014 | scope | 1.3 | index-row | V06 §1.3 (pointer row: V03 §3.7.4, V02's crypt ladder) |
| V06-0015 | scope | 1.3 | index-row | V06 §1.3 (pointer row: items 105–108's base side, V11's rows, V07 §3.12) |
| V06-0016 | scope | 1.3 | index-row | V06 §1.3 (pointer row: the port's carriage, V08) |
| V06-0017 | scope | 1.3 | index-row | V06 §1.3 (pointer row: item 110's base half, V04, V02, V01) |
| V06-0018 | decision | 1.3 | home | V06 §1.3 |
| V06-0019 | wiring | 1b | home | V06 §1b W1 |
| V06-0020 | wiring | 1b | home | V06 §1b W2 |
| V06-0021 | wiring | 1b | home | V06 §1b W3 |
| V06-0022 | wiring | 1b | home | V06 §1b W4 |
| V06-0023 | wiring | 1b | home | V06 §1b W5 |
| V06-0024 | wiring | 1b | home | V06 §1b W6 |
| V06-0025 | wiring | 1b | home | V06 §1b W7 |
| V06-0026 | wiring | 1b | home | V06 §1b W9 |
| V06-0027 | wiring | 1b | home | V06 §1b W10 |
| V06-0028 | wiring | 1b | home | V06 §1b W11 |
| V06-0029 | wiring | 1b | home | V06 §1b W12 |
| V06-0030 | wiring | 1b | home | V06 §1b W14 |
| V06-0031 | wiring | 1b | home | V06 §1b W17 |
| V06-0032 | wiring | 1b | home | V06 §1b W19 |
| V06-0033 | wiring | 1b | home | V06 §1b W20 |
| V06-0034 | wiring | 1b | home | V06 §1b W23 |
| V06-0035 | wiring | 1b | home | V06 §1b W27 |
| V06-0036 | wiring | 1b | home | V06 §1b W31 |
| V06-0037 | wiring | 1b | home | V06 §1b W32 |
| V06-0038 | wiring | 1b | home | V06 §1b W34 |
| V06-0039 | wiring | 1b | home | V06 §1b W36 |
| V06-0040 | wiring | 1b | home | V06 §1b W38 |
| V06-0041 | wiring | 1b | home | V06 §1b W40 |
| V06-0042 | wiring | 1b | home | V06 §1b W42 |
| V06-0043 | wiring | 1b | home | V06 §1b W44 |
| V06-0044 | wiring | 1b | home | V06 §1b W45 |
| V06-0045 | wiring | 1b | home | V06 §1b W46 |
| V06-0046 | wiring | 1b | home | V06 §1b W48 |
| V06-0047 | wiring | 1b | home | V06 §1b W49 |
| V06-0048 | wiring | 1b | home | V06 §1b W51 |
| V06-0049 | wiring | 1b | home | V06 §1b W52 |
| V06-0050 | wiring | 1b | home | V06 §1b W55 |
| V06-0051 | wiring | 1b | home | V06 §1b W57 |
| V06-0052 | wiring | 1b | home | V06 §1b W58 |
| V06-0053 | wiring | 1b | home | V06 §1b W60 |
| V06-0054 | wiring | 1b | home | V06 §1b W61 |
| V06-0055 | wiring | 1b | home | V06 §1b W62 |
| V06-0056 | wiring | 1b | home | V06 §1b W64 |
| V06-0057 | wiring | 1b | home | V06 §1b W65 |
| V06-0058 | wiring | 1b | home | V06 §1b W68 |
| V06-0059 | wiring | 1b | home | V06 §1b W70 |
| V06-0060 | wiring | 1b | home | V06 §1b W72 |
| V06-0061 | wiring | 1b | home | V06 §1b W74 |
| V06-0062 | wiring | 1b | home | V06 §1b W76 |
| V06-0063 | wiring | 1b | home | V06 §1b W77 |
| V06-0064 | wiring | 1b | home | V06 §1b W79 |
| V06-0065 | wiring | 1b | index-row | V06 §1b W80 (pointer row: V12's `BenchBarDef`) |
| V06-0066 | wiring | 1b | home | V06 §1b W81 |
| V06-0067 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0068 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0069 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0070 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0071 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0072 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0073 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0074 | dossier | 1b | home | V06 §1b *The dossier trace* |
| V06-0075 | rule | 2 | home | V06 §2 |
| V06-0076 | type | 2.1 | home | V06 §2.1 |
| V06-0077 | interface | 2.1 | home | V06 §2.1 |
| V06-0078 | interface | 2.1 | home | V06 §2.1 |
| V06-0079 | interface | 2.1 | home | V06 §2.1 |
| V06-0080 | interface | 2.1 | home | V06 §2.1 |
| V06-0081 | interface | 2.1 | home | V06 §2.1 |
| V06-0082 | interface | 2.1 | home | V06 §2.1 |
| V06-0083 | interface | 2.1 | home | V06 §2.1 |
| V06-0084 | interface | 2.1 | home | V06 §2.1 |
| V06-0085 | interface | 2.1 | home | V06 §2.1 |
| V06-0086 | interface | 2.1 | home | V06 §2.1 |
| V06-0087 | rule | 2.1 | home | V06 §2.1 |
| V06-0088 | record | 2.2 | home | V06 §2.2 |
| V06-0089 | record | 2.2 | home | V06 §2.2 |
| V06-0090 | constant | 2.2 | home | V06 §2.2 |
| V06-0091 | constant | 2.2 | home | V06 §2.2 |
| V06-0092 | constant | 2.2 | home | V06 §2.2 |
| V06-0093 | constant | 2.2 | home | V06 §2.2 |
| V06-0094 | constant | 2.2 | home | V06 §2.2 |
| V06-0095 | constant | 2.2 | home | V06 §2.2 |
| V06-0096 | constant | 2.2 | home | V06 §2.2 |
| V06-0097 | constant | 2.2 | home | V06 §2.2 |
| V06-0098 | rule | 2.2 | home | V06 §2.2 |
| V06-0099 | rule | 2.2 | reference | V06 §2.2 — cites V11 §3.18 (the four cells named, no values) |
| V06-0100 | rule | 2.2 | reference | V06 §2.2 — cites V09 §9's *History* settings |
| V06-0101 | interface | 2.3 | home | V06 §2.3 |
| V06-0102 | interface | 2.3 | home | V06 §2.3 |
| V06-0103 | table | 2.3 | home | V06 §2.3 |
| V06-0104 | rule | 2.3 | home | V06 §2.3 |
| V06-0105 | record | 2.4 | home | V06 §2.4 |
| V06-0106 | record | 2.4 | home | V06 §2.4 |
| V06-0107 | table | 2.4 | home | V06 §2.4 |
| V06-0108 | record | 2.5 | home | V06 §2.5 |
| V06-0109 | record | 2.6 | home | V06 §2.6 |
| V06-0110 | record | 2.7 | reference | V06 §2.7 — cites §2.7's `Enceinte` for the fields; keeps only their rules (fate drawn once, keep, eligibleWeek, edit source, the occupied-share row) |
| V06-0111 | interface | 2.8 | reference | V06 §2.8 [REF-HOME] — `EvolveOp` stated here: the landed base names it in §4.11's union and defers its members to V06 (model §2.8's cause comment; determinism §7.1 "V06's EvolveOp"); cross-part note 1 |
| V06-0112 | interface | 2.8 | reference | V06 §2.8 [REF-HOME] — `repairWall` as one `EvolveOp` member (no-op with its line on a ring with nothing to lift, V06-ICONF-1); cross-part note 1 |
| V06-0113 | interface | 2.8 | reference | V06 §2.8 [REF-HOME] — `retypeLand` as one `EvolveOp` member; cross-part note 1 |
| V06-0114 | record | 2.8 | reference | V06 §2.8 — cites §2.4's `Way.formerClass` (item 209) |
| V06-0115 | record | 2.9 | reference | V06 §2.9 [REF-HOME] — `Use.strain` stated here (the landed base §2.7 `Use` lacks it); cross-part note 2 |
| V06-0116 | record | 2.10 | home | V06 §2.10 |
| V06-0117 | record | 2.10 | home | V06 §2.10 |
| V06-0118 | rule | 2.10 | home | V06 §2.10 |
| V06-0119 | record | 2.11 | home | V06 §2.11 |
| V06-0120 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0121 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0122 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0123 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0124 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0125 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0126 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0127 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0128 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0129 | lifecycle | 2.12 | reference | V06 §2.12 — the crypt row cites V03 §3.7.2's lifecycle row |
| V06-0130 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0131 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0132 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0133 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0134 | lifecycle | 2.12 | home | V06 §2.12 |
| V06-0135 | type | 2.13 | home | V06 §2.13 |
| V06-0136 | record | 2.13 | home | V06 §2.13 |
| V06-0137 | record | 2.13 | home | V06 §2.13 |
| V06-0138 | rule | 2.13 | home | V06 §2.13 |
| V06-0139 | step | 3.1 | home | V06 §3.1 |
| V06-0140 | rule | 3.1 | home | V06 §3.1 |
| V06-0141 | step | 3.1 | home | V06 §3.1 |
| V06-0142 | step | 3.1 | home | V06 §3.1 |
| V06-0143 | step | 3.1 | home | V06 §3.1 |
| V06-0144 | rule | 3.1 | home | V06 §3.1 |
| V06-0145 | rule | 3.1 | home | V06 §3.1 |
| V06-0146 | table | 3.2 | home | V06 §3.2 |
| V06-0147 | rule | 3.2 | home | V06 §3.2 |
| V06-0148 | table | 3.2 | home | V06 §3.2 |
| V06-0149 | table | 3.2 | home | V06 §3.2 |
| V06-0150 | rule | 3.2 | reference | V06 §3.2 — the arch-vault reconcile cites V04 §3.5.4 (d) for what it lays, collapses and deletes; keeps only its place in the order |
| V06-0151 | rule | 3.2 | home | V06 §3.2 |
| V06-0152 | rule | 3.2 | home | V06 §3.2 |
| V06-0153 | rule | 3.2 | home | V06 §3.2 |
| V06-0154 | rule | 3.3 | home | V06 §3.3 |
| V06-0155 | rule | 3.3 | home | V06 §3.3 |
| V06-0156 | rule | 3.3 | home | V06 §3.3 |
| V06-0157 | rule | 3.3 | home | V06 §3.3 |
| V06-0158 | rule | 3.3 | home | V06 §3.3 |
| V06-0159 | rule | 3.3 | home | V06 §3.3 |
| V06-0160 | rule | 3.4 | home | V06 §3.4 |
| V06-0161 | rule | 3.4 | home | V06 §3.4 |
| V06-0162 | rule | 3.4 | home | V06 §3.4 |
| V06-0163 | rule | 3.4 | home | V06 §3.4 |
| V06-0164 | rule | 3.4 | home | V06 §3.4 |
| V06-0165 | rule | 3.4 | home | V06 §3.4 |
| V06-0166 | rule | 3.4 | home | V06 §3.4 |
| V06-0167 | rule | 3.4 | home | V06 §3.4 |
| V06-0168 | rule | 3.5.1 | home | V06 §3.5.1 |
| V06-0169 | rule | 3.5.1 | home | V06 §3.5.1 |
| V06-0170 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0171 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0172 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0173 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0174 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0175 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0176 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0177 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0178 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0179 | rule | 3.5.2 | home | V06 §3.5.2 |
| V06-0180 | rule | 3.5.3 | home | V06 §3.5.3 |
| V06-0181 | rule | 3.5.3 | home | V06 §3.5.3 |
| V06-0182 | rule | 3.6 | home | V06 §3.6 |
| V06-0183 | rule | 3.6 | home | V06 §3.6 |
| V06-0184 | rule | 3.6 | home | V06 §3.6 |
| V06-0185 | rule | 3.7.1 | home | V06 §3.7.1 |
| V06-0186 | rule | 3.7.1 | home | V06 §3.7.1 |
| V06-0187 | rule | 3.7.2 | home | V06 §3.7.2 |
| V06-0188 | rule | 3.7.2 | home | V06 §3.7.2 |
| V06-0189 | rule | 3.7.2 | home | V06 §3.7.2 |
| V06-0190 | rule | 3.7.3 | home | V06 §3.7.3 |
| V06-0191 | rule | 3.7.4 | home | V06 §3.7.4 |
| V06-0192 | rule | 3.7.4 | home | V06 §3.7.4 |
| V06-0193 | rule | 3.7.5 | home | V06 §3.7.5 |
| V06-0194 | rule | 3.7.5 | home | V06 §3.7.5 |
| V06-0195 | rule | 3.7.6 | home | V06 §3.7.6 |
| V06-0196 | rule | 3.7.6 | home | V06 §3.7.6 |
| V06-0197 | rule | 3.7.6 | home | V06 §3.7.6 |
| V06-0198 | rule | 3.7.6 | home | V06 §3.7.6 |
| V06-0199 | rule | 3.7.6 | home | V06 §3.7.6 |
| V06-0200 | rule | 3.7.6 | home | V06 §3.7.6 |
| V06-0201 | rule | 3.8.1 | home | V06 §3.8.1 |
| V06-0202 | rule | 3.8.2 | home | V06 §3.8.2 |
| V06-0203 | rule | 3.8.2 | home | V06 §3.8.2 |
| V06-0204 | rule | 3.8.2 | home | V06 §3.8.2 |
| V06-0205 | rule | 3.8.3 | home | V06 §3.8.3 |
| V06-0206 | rule | 3.8.4 | home | V06 §3.8.4 |
| V06-0207 | rule | 3.9 | home | V06 §3.9 |
| V06-0208 | rule | 3.9.1 | home | V06 §3.9.1 |
| V06-0209 | rule | 3.9.1 | home | V06 §3.9.1 |
| V06-0210 | rule | 3.9.2 | home | V06 §3.9.2 |
| V06-0211 | rule | 3.9.3 | home | V06 §3.9.3 |
| V06-0212 | rule | 3.9.4 | home | V06 §3.9.4 |
| V06-0213 | rule | 3.9.5 | home | V06 §3.9.5 |
| V06-0214 | rule | 3.9.5 | home | V06 §3.9.5 |
| V06-0215 | rule | 3.9.5 | home | V06 §3.9.5 |
| V06-0216 | rule | 3.9.6 | home | V06 §3.9.6 |
| V06-0217 | rule | 3.9.6 | home | V06 §3.9.6 |
| V06-0218 | rule | 3.9.6 | home | V06 §3.9.6 |
| V06-0219 | rule | 3.9.7 | home | V06 §3.9.7 |
| V06-0220 | rule | 3.9.8 | home | V06 §3.9.8 |
| V06-0221 | table | 3.9.9 | home | V06 §3.9.9 |
| V06-0222 | rule | 3.9.10 | home | V06 §3.9.10 |
| V06-0223 | rule | 3.9.10 | home | V06 §3.9.10 |
| V06-0224 | rule | 3.9.10 | home | V06 §3.9.10 |
| V06-0225 | table | 3.9.11 | home | V06 §3.9.11 |
| V06-0226 | rule | 3.9.11 | home | V06 §3.9.11 |
| V06-0227 | rule | 3.10.1 | home | V06 §3.10.1 |
| V06-0228 | rule | 3.10.2 | home | V06 §3.10.2 |
| V06-0229 | rule | 3.10.3 | home | V06 §3.10.3 |
| V06-0230 | rule | 3.11.1 | home | V06 §3.11.1 |
| V06-0231 | rule | 3.11.2 | home | V06 §3.11.2 |
| V06-0232 | rule | 3.11.2 | home | V06 §3.11.2 |
| V06-0233 | rule | 3.11.3 | home | V06 §3.11.3 |
| V06-0234 | rule | 3.11.4 | home | V06 §3.11.4 |
| V06-0235 | rule | 3.11.5 | home | V06 §3.11.5 |
| V06-0236 | rule | 3.11.6 | home | V06 §3.11.6 |
| V06-0237 | rule | 3.12 | home | V06 §3.12 |
| V06-0238 | rule | 3.12 | home | V06 §3.12 |
| V06-0239 | rule | 3.13 | home | V06 §3.13 |
| V06-0240 | rule | 3.13 | home | V06 §3.13 |
| V06-0241 | rule | 3.13 | home | V06 §3.13 |
| V06-0242 | rule | 3.14 | home | V06 §3.14 |
| V06-0243 | rule | 3.15.1 | home | V06 §3.15.1 |
| V06-0244 | rule | 3.15.2 | home | V06 §3.15.2 |
| V06-0245 | rule | 3.15.2 | home | V06 §3.15.2 |
| V06-0246 | rule | 3.15.4 | home | V06 §3.15.4 |
| V06-0247 | rule | 3.15.5 | home | V06 §3.15.5 |
| V06-0248 | rule | 3.16 | home | V06 §3.16 |
| V06-0249 | rule | 3.16 | home | V06 §3.16 |
| V06-0250 | rule | 3.16 | home | V06 §3.16 |
| V06-0251 | rule | 3.17 | home | V06 §3.17 |
| V06-0252 | rule | 3.17 | home | V06 §3.17 |
| V06-0253 | scope | 3.18 | index-row | V06 §3.18 (pointer paragraph: V04 §2.2–§2.3, V04 §3.5, V04 §3.8, V04 §3.10) |
| V06-0254 | rule | 3.18.1 | home | V06 §3.18.1 |
| V06-0255 | rule | 3.18.1 | home | V06 §3.18.1 |
| V06-0256 | rule | 3.18.1 | home | V06 §3.18.1 |
| V06-0257 | rule | 3.18.1 | home | V06 §3.18.1 |
| V06-0258 | rule | 3.18.1 | home | V06 §3.18.1 |
| V06-0259 | rule | 3.18.1 | home | V06 §3.18.1 |
| V06-0260 | rule | 3.18.1 | home | V06 §3.18.1 |
| V06-0261 | rule | 3.18.2 | home | V06 §3.18.2 |
| V06-0262 | rule | 3.18.2 | home | V06 §3.18.2 |
| V06-0263 | rule | 3.18.2 | home | V06 §3.18.2 |
| V06-0264 | rule | 3.18.2 | home | V06 §3.18.2 |
| V06-0265 | rule | 3.18.3 | home | V06 §3.18.3 |
| V06-0266 | rule | 3.18.3 | home | V06 §3.18.3 |
| V06-0267 | rule | 3.19 | home | V06 §3.19 |
| V06-0268 | rule | 3.19 | home | V06 §3.19 |
| V06-0269 | rule | 3.19 | home | V06 §3.19 |
| V06-0270 | rule | 3.19 | home | V06 §3.19 |
| V06-0271 | rule | 3.19 | home | V06 §3.19 |
| V06-0272 | rule | 3.19 | home | V06 §3.19 |
| V06-0273 | rule | 3.19 | home | V06 §3.19 |
| V06-0274 | rule | 3.19 | home | V06 §3.19 |
| V06-0275 | rule | 3.19 | home | V06 §3.19 |
| V06-0276 | rule | 3.19 | home | V06 §3.19 |
| V06-0277 | rule | 3.19 | home | V06 §3.19 |
| V06-0278 | rule | 3.19 | home | V06 §3.19 |
| V06-0279 | rule | 3.19 | reference | V06 §3.19 — *The rows the pass reads* cites V11 §3.24.2 (names only, no values) |
| V06-0280 | rule | 3.19.1 | home | V06 §3.19.1 |
| V06-0281 | rule | 3.19.1 | home | V06 §3.19.1 |
| V06-0282 | rule | 3.19.2 | home | V06 §3.19.2 |
| V06-0283 | rule | 3.19.2 | home | V06 §3.19.2 |
| V06-0284 | rule | 3.19.2 | home | V06 §3.19.2 |
| V06-0285 | rule | 3.19.3 | home | V06 §3.19.3 |
| V06-0286 | rule | 3.19.3 | home | V06 §3.19.3 |
| V06-0287 | rule | 3.19.3 | home | V06 §3.19.3 |
| V06-0288 | rule | 3.19.3 | home | V06 §3.19.3 |
| V06-0289 | rule | 3.19.4 | home | V06 §3.19.4 |
| V06-0290 | rule | 3.19.4 | home | V06 §3.19.4 |
| V06-0291 | rule | 3.19.4 | home | V06 §3.19.4 |
| V06-0292 | rule | 3.19.5 | home | V06 §3.19.5 |
| V06-0293 | rule | 3.19.5 | home | V06 §3.19.5 |
| V06-0294 | rule | 3.19.6 | home | V06 §3.19.6 |
| V06-0295 | rule | 4.1 | home | V06 §4.1 |
| V06-0296 | rule | 4.1 | home | V06 §4.1 |
| V06-0297 | rule | 4.1 | home | V06 §4.1 |
| V06-0298 | rule | 4.1 | home | V06 §4.1 |
| V06-0299 | table | 4.2 | home | V06 §4.2 |
| V06-0300 | table | 4.2 | home | V06 §4.2 |
| V06-0301 | table | 4.2 | home | V06 §4.2 |
| V06-0302 | rule | 4.2 | home | V06 §4.2 |
| V06-0303 | rule | 4.3 | home | V06 §4.3 |
| V06-0304 | rule | 4.4 | home | V06 §4.4 |
| V06-0305 | rule | 4.4 | home | V06 §4.4 |
| V06-0306 | rule | 4.5 | home | V06 §4.5 |
| V06-0307 | rule | 4.5 | reference | V06 §4.5 — cites V10 §3.9's raised-way provider; keeps what this volume records for it |
| V06-0308 | table | 5.1 | home | V06 §5.1 |
| V06-0309 | table | 5.1 | home | V06 §5.1 |
| V06-0310 | rule | 5.1 | home | V06 §5.1 |
| V06-0311 | rule | 5.2 | home | V06 §5.2 |
| V06-0312 | rule | 5.3 | home | V06 §5.3 |
| V06-0313 | budget | 6 | home | V06 §6 |
| V06-0314 | fallback | 6 | home | V06 §6 |
| V06-0315 | budget | 6.2 | home | V06 §6.2 |
| V06-0316 | budget | 6.2 | home | V06 §6.2 |
| V06-0317 | budget | 6.2 | home | V06 §6.2 |
| V06-0318 | budget | 6.3 | home | V06 §6.3 |
| V06-0319 | budget | 6.5 | home | V06 §6.5 |
| V06-0320 | rule | 7 | home | V06 §7 (families and fixtures) |
| V06-0321 | test | 7 | home | V06 §7 T-V6-1, T-V6-2 |
| V06-0322 | test | 7 | home | V06 §7 T-V6-5, T-V6-6 |
| V06-0323 | test | 7 | home | V06 §7 T-V6-9 |
| V06-0324 | test | 7 | home | V06 §7 T-V6-12 |
| V06-0325 | test | 7 | home | V06 §7 T-V6-13 |
| V06-0326 | test | 7 | home | V06 §7 T-V6-16 |
| V06-0327 | test | 7 | home | V06 §7 T-V6-19 |
| V06-0328 | test | 7 | home | V06 §7 T-V6-22 |
| V06-0329 | test | 7 | home | V06 §7 T-V6-25 |
| V06-0330 | test | 7 | home | V06 §7 T-V6-27 |
| V06-0331 | test | 7 | home | V06 §7 T-V6-33, T-V6-34 |
| V06-0332 | test | 7 | home | V06 §7 T-V6-38, T-V6-39 |
| V06-0333 | test | 7 | home | V06 §7 T-V6-41, T-V6-42, T-V6-43 |
| V06-0334 | test | 7 | home | V06 §7 T-V6-46, T-V6-47 |
| V06-0335 | test | 7 | home | V06 §7 T-V6-51 |
| V06-0336 | test | 7 | home | V06 §7 T-V6-52 |
| V06-0337 | test | 7 | home | V06 §7 T-V6-57 |
| V06-0338 | test | 7 | home | V06 §7 T-V6-59 |
| V06-0339 | test | 7 | home | V06 §7 T-V6-62 |
| V06-0340 | test | 7 | home | V06 §7 T-V6-64 |
| V06-0341 | test | 7 | home | V06 §7 T-V6-67 |
| V06-0342 | rule | 7 | home | V06 §7 T-V6-1 |
| V06-0343 | plan | 8 | home | V06 §8 |
| V06-0344 | plan | 8 | home | V06 §8 |
| V06-0345 | rule | 8 | reference | V06 §8 — *Exits and the calibration register* cites V12 §3.11 and its lint |
| V06-0346 | rule | 8 | reference | V06 §8 — bar registrations cite V12 §2.1's `BenchBarDef` |
| V06-0347 | table | 8 | home | V06 §8 |
| V06-0348 | plan | 8 | home | V06 §8 |
| V06-0349 | decision | 9 | home | V06 §9 J-V6.1 |
| V06-0350 | decision | 9 | home | V06 §9 J-V6.2 |
| V06-0351 | decision | 9 | home | V06 §9 J-V6.3 |
| V06-0352 | decision | 9 | home | V06 §9 J-V6.4 (*superseded by J-V6.127*, E-24) |
| V06-0353 | decision | 9 | home | V06 §9 J-V6.5 (*amended by* mark, E-24) |
| V06-0354 | decision | 9 | home | V06 §9 J-V6.6 |
| V06-0355 | decision | 9 | home | V06 §9 J-V6.7 |
| V06-0356 | decision | 9 | home | V06 §9 J-V6.8 |
| V06-0357 | decision | 9 | home | V06 §9 J-V6.9 |
| V06-0358 | decision | 9 | home | V06 §9 J-V6.10 |
| V06-0359 | decision | 9 | home | V06 §9 J-V6.11 |
| V06-0360 | decision | 9 | home | V06 §9 J-V6.12 |
| V06-0361 | decision | 9 | home | V06 §9 J-V6.13 |
| V06-0362 | decision | 9 | home | V06 §9 J-V6.14 |
| V06-0363 | decision | 9 | home | V06 §9 J-V6.15 |
| V06-0364 | decision | 9 | home | V06 §9 J-V6.16 |
| V06-0365 | decision | 9 | home | V06 §9 J-V6.17 |
| V06-0366 | decision | 9 | home | V06 §9 J-V6.18 |
| V06-0367 | decision | 9 | home | V06 §9 J-V6.19 |
| V06-0368 | decision | 9 | home | V06 §9 J-V6.20 |
| V06-0369 | decision | 9 | home | V06 §9 J-V6.21 |
| V06-0370 | decision | 9 | home | V06 §9 J-V6.22 |
| V06-0371 | decision | 9 | home | V06 §9 J-V6.23 |
| V06-0372 | decision | 9 | home | V06 §9 J-V6.24 |
| V06-0373 | decision | 9 | home | V06 §9 J-V6.25 |
| V06-0374 | decision | 9 | home | V06 §9 J-V6.26 |
| V06-0375 | decision | 9 | home | V06 §9 J-V6.27 |
| V06-0376 | decision | 9 | home | V06 §9 J-V6.28 |
| V06-0377 | decision | 9 | home | V06 §9 J-V6.29 |
| V06-0378 | decision | 9 | home | V06 §9 J-V6.30 |
| V06-0379 | decision | 9 | home | V06 §9 J-V6.31 |
| V06-0380 | decision | 9 | home | V06 §9 J-V6.32 |
| V06-0381 | decision | 9 | home | V06 §9 J-V6.33 |
| V06-0382 | decision | 9 | home | V06 §9 J-V6.34 |
| V06-0383 | decision | 9 | home | V06 §9 J-V6.35 |
| V06-0384 | decision | 9 | home | V06 §9 J-V6.36 |
| V06-0385 | decision | 9 | home | V06 §9 J-V6.37 |
| V06-0386 | decision | 9 | home | V06 §9 J-V6.38 |
| V06-0387 | decision | 9 | home | V06 §9 J-V6.39 |
| V06-0388 | decision | 9 | home | V06 §9 J-V6.40 |
| V06-0389 | decision | 9 | home | V06 §9 J-V6.41 |
| V06-0390 | decision | 9 | home | V06 §9 J-V6.42 |
| V06-0391 | decision | 9 | home | V06 §9 J-V6.43 |
| V06-0392 | decision | 9 | home | V06 §9 J-V6.44 |
| V06-0393 | decision | 9 | home | V06 §9 J-V6.45 |
| V06-0394 | decision | 9 | home | V06 §9 J-V6.46 |
| V06-0395 | decision | 9 | home | V06 §9 J-V6.47 |
| V06-0396 | decision | 9 | home | V06 §9 J-V6.48 |
| V06-0397 | decision | 9 | home | V06 §9 J-V6.49 |
| V06-0398 | decision | 9 | home | V06 §9 J-V6.50 |
| V06-0399 | decision | 9 | home | V06 §9 J-V6.51 |
| V06-0400 | decision | 9 | home | V06 §9 J-V6.52 |
| V06-0401 | decision | 9 | home | V06 §9 J-V6.53 |
| V06-0402 | decision | 9 | home | V06 §9 J-V6.54 |
| V06-0403 | decision | 9 | home | V06 §9 J-V6.55 |
| V06-0404 | decision | 9 | home | V06 §9 J-V6.56 |
| V06-0405 | decision | 9 | home | V06 §9 J-V6.57 |
| V06-0406 | decision | 9 | home | V06 §9 J-V6.58 |
| V06-0407 | decision | 9 | home | V06 §9 J-V6.59 |
| V06-0408 | decision | 9 | home | V06 §9 J-V6.60 |
| V06-0409 | decision | 9 | home | V06 §9 J-V6.61 |
| V06-0410 | decision | 9 | home | V06 §9 J-V6.62 |
| V06-0411 | decision | 9 | home | V06 §9 J-V6.63 |
| V06-0412 | decision | 9 | home | V06 §9 J-V6.64 |
| V06-0413 | decision | 9 | home | V06 §9 J-V6.65 |
| V06-0414 | decision | 9 | home | V06 §9 J-V6.66 |
| V06-0415 | decision | 9 | home | V06 §9 J-V6.67 |
| V06-0416 | decision | 9 | home | V06 §9 J-V6.68 |
| V06-0417 | decision | 9 | home | V06 §9 J-V6.69 |
| V06-0418 | decision | 9 | home | V06 §9 J-V6.70 |
| V06-0419 | decision | 9 | home | V06 §9 J-V6.71 |
| V06-0420 | decision | 9 | home | V06 §9 J-V6.72 |
| V06-0421 | decision | 9 | home | V06 §9 J-V6.73 |
| V06-0422 | decision | 9 | home | V06 §9 J-V6.74 |
| V06-0423 | decision | 9 | home | V06 §9 J-V6.75 |
| V06-0424 | decision | 9 | home | V06 §9 J-V6.76 |
| V06-0425 | decision | 9 | home | V06 §9 J-V6.77 |
| V06-0426 | decision | 9 | home | V06 §9 J-V6.78 |
| V06-0427 | decision | 9 | home | V06 §9 J-V6.79 |
| V06-0428 | decision | 9 | home | V06 §9 J-V6.80 |
| V06-0429 | decision | 9 | home | V06 §9 J-V6.81 |
| V06-0430 | decision | 9 | home | V06 §9 J-V6.82 |
| V06-0431 | decision | 9 | home | V06 §9 J-V6.83 |
| V06-0432 | decision | 9 | home | V06 §9 J-V6.84 |
| V06-0433 | decision | 9 | home | V06 §9 J-V6.85 |
| V06-0434 | decision | 9 | home | V06 §9 J-V6.86 |
| V06-0435 | decision | 9 | home | V06 §9 J-V6.87 |
| V06-0436 | decision | 9 | home | V06 §9 J-V6.88 |
| V06-0437 | decision | 9 | home | V06 §9 J-V6.89 |
| V06-0438 | decision | 9 | home | V06 §9 J-V6.90 |
| V06-0439 | decision | 9 | home | V06 §9 J-V6.91 |
| V06-0440 | decision | 9 | home | V06 §9 J-V6.92 (reworded to the ruled form, V06-ICONF-2) |
| V06-0441 | decision | 9 | home | V06 §9 J-V6.93 |
| V06-0442 | decision | 9 | home | V06 §9 J-V6.94 |
| V06-0443 | decision | 9 | home | V06 §9 J-V6.95 |
| V06-0444 | decision | 9 | home | V06 §9 J-V6.96 |
| V06-0445 | decision | 9 | home | V06 §9 J-V6.97 |
| V06-0446 | decision | 9 | home | V06 §9 J-V6.98 |
| V06-0447 | decision | 9 | home | V06 §9 J-V6.99 |
| V06-0448 | decision | 9 | home | V06 §9 J-V6.100 |
| V06-0449 | decision | 9 | home | V06 §9 J-V6.101 |
| V06-0450 | decision | 9 | home | V06 §9 J-V6.102 (decided rule, CANON-C02) |
| V06-0451 | decision | 9 | home | V06 §9 J-V6.103 |
| V06-0452 | decision | 9 | home | V06 §9 J-V6.104 |
| V06-0453 | decision | 9 | home | V06 §9 J-V6.105 |
| V06-0454 | decision | 9 | home | V06 §9 J-V6.106 |
| V06-0455 | decision | 9 | home | V06 §9 J-V6.107 |
| V06-0456 | decision | 9 | home | V06 §9 J-V6.108 |
| V06-0457 | decision | 9 | home | V06 §9 J-V6.109 |
| V06-0458 | decision | 9 | home | V06 §9 J-V6.110 |
| V06-0459 | decision | 9 | home | V06 §9 J-V6.111 (*amended by* mark, E-24) |
| V06-0460 | decision | 9 | home | V06 §9 J-V6.112 |
| V06-0461 | decision | 9 | home | V06 §9 J-V6.113 |
| V06-0462 | decision | 9 | home | V06 §9 J-V6.114 |
| V06-0463 | decision | 9 | home | V06 §9 J-V6.115 |
| V06-0464 | decision | 9 | home | V06 §9 J-V6.116 |
| V06-0465 | decision | 9 | home | V06 §9 J-V6.117 |
| V06-0466 | decision | 9 | home | V06 §9 J-V6.118 |
| V06-0467 | decision | 9 | home | V06 §9 J-V6.119 |
| V06-0468 | decision | 9 | home | V06 §9 J-V6.120 |
| V06-0469 | decision | 9 | home | V06 §9 J-V6.121 |
| V06-0470 | decision | 9 | home | V06 §9 J-V6.122 |
| V06-0471 | decision | 9 | home | V06 §9 J-V6.123 |
| V06-0472 | decision | 9 | home | V06 §9 J-V6.124 |
| V06-0473 | decision | 9 | home | V06 §9 J-V6.125 |
| V06-0474 | decision | 9 | home | V06 §9 J-V6.126 |
| V06-0475 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-1 → item 317 |
| V06-0476 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-2 → item 321 |
| V06-0477 | bcr | 10 | bcr-pointer | V06 §10 pointer rows: BCR-V6-3 → item 254; BCR-V6-7 → item 264; BCR-V6-4 → item 429 |
| V06-0478 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-5 → item 209 |
| V06-0479 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-6 → item 206 |
| V06-0480 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-7 → item 264 |
| V06-0481 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-8 → item 342 |
| V06-0482 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-9 → item 343 |
| V06-0483 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-10 → item 443 |
| V06-0484 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-11 → item 458 |
| V06-0485 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-12 → item 388 |
| V06-0486 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-13 → item 275 |
| V06-0487 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-15 → item 409 |
| V06-0488 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-17 → item 335 |
| V06-0489 | bcr | 10 | bcr-pointer | V06 §10 pointer rows: BCR-V6-19 → item 293; BCR-V6-20 → item 265 |
| V06-0490 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-21 → item 266 |
| V06-0491 | bcr | 10 | bcr-pointer | V06 §10 pointer rows: BCR-V6-23 → item 479; BCR-V6-24 → item 260 |
| V06-0492 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-25 → item 290 |
| V06-0493 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-26 → item 291 |
| V06-0494 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-27 → item 573 |
| V06-0495 | bcr | 10 | bcr-pointer | V06 §10 pointer row: BCR-V6-28 → item 574 |
| V06-0496 | question | 11 | answer-J121-J122 | V06 §11 Q1 — *Answered: J122 — (a), right after M4*; price 29–41.5 pw; the pricing history out (V06-NARR-3) |
| V06-0497 | status | 12 | history-out | V06 §12 — the two current paragraphs (CONFIRMED, PLAUSIBLE); the receipts, md5s and per-round reading records out (V06-NARR-4) |
| V06-0498 | handoff | 13 | handoff | V06 §13 — *None open*; the measurement items are §12's PLAUSIBLE paragraph (E0, E7, E9) |
| V06-0499 | handoff | 13 | handoff | V06 §13 — *None open*; X1–X49 each closed at its target (this report, *Hand-offs closed*) |
| V06-0500 | decision | IN | home | folded: IN-V06-1 → V06 §3.10.1 (the `crypt: 'always'` column); IN-V06-2 → V06 §3.13 (4) *Stacks* and V06 §3.19 (7); IN-V06-3 → V06 §3.2's participant table (`reclearIsland`), V06 §3.19 (2), (5) (ground-arena candidates, `skyAccessObstacles`) |
| V06-0501 | decision | IN | home | folded: IN-V06-4 → V06 §3.19.4 (5); IN-V06-5 → V06 §7 T-V6-65; IN-V06-6 → V06 §5.1 (*Open a copy from here*); IN-V06-7 → V06 §2.13 |
| V06-0502 | record | RC | home | out of the volume (narration): the reconciliation ledgers are lane history; their decisions stand in the body; this report and the inventory record them |

