# Verify MODEL part (§2) after amendments-c repair round 2 (assemble-r2)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-model-r2).

PROGRESS
- READ: verify-model-r1.md (own earlier report), repair-model-r2-report.md, assemble-r2.md, the five sibling repair-r2 reports' cross-part notes, §2 now vs the pre-repair-r2 archive (vm2c/s2.diff, 10 hunks) — done
- RE-CHECK repaired §2.2, §2.3, §2.6, §2.7, §2.8 (§2.3 whole; §2.2 rule 1's underground paragraphs, §2.6 entrance rules 1–5, §2.7's underground, Works, light and staged records, §2.8's registry and dossier paths read whole) and the 10 routed issues (7 distinct) — done (§1)
- RE-CHECK the 5 V-MC1 issues owned by other parts at their homes (§4.7 (1) and S11, §7.1 two places, §7.4 light host faces, §9.2 / §11.1 / §11.2 / J-A20.82) — done (§1)
- CHECKS single-source / stale / cross-part / deferral / refs / new-problem / doc_checks — done (§2)
- ISSUES table — done (§3; 2 issues, both minor)
- queue row, LANDED — done

Design read: `docs/ARCHITECTURE.md` sha256 `3daa0b0731b8c76f…` (17 215 lines), §2 = l. 469–2451; rationale
`bfa20419ca4dd6e5…`; pre-repair archive `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md`
(`024c57da…`). Both design files are unchanged by this seat (hashes re-checked after the tool runs). Scratch:
`scratchpad/vm2c/`.

## Outcome

Repair round 2 fixed every issue routed to the model part: the six model-owned ids of `verify-model-r1.md` (V-MC1-01, -03,
-05, -06, -10, -11), the kernel's VKC1-02 and determinism's VD1-08, VD1-12 (duplicates of V-MC1-01 and -03) and VD1-13.
Each fix is in the installed text, worded as the repair report says. The five V-MC1 ids that other parts owned
(V-MC1-02, -04, -07, -08, -09) are also fixed at their homes. The §2 diff against the pre-repair archive has 10 hunks, and
every one of them is a claimed edit. Every item routed to the model part stays PRESENT, and no held part is written in
§2. Gates (b) and (c) hold on the new text. There is no new deferral wording. `doc_checks --sections "2"` exits 0 (C1
5/0, C2 0/0, C3 326/0, C4 3/0, S1 0, S2 0). The resolver finds the same 2 broken references, the two baseline external
citations. All 104 J ids that §2 cites resolve in both the index (733 rows) and Part A (733 entries). The new J-A65.22 and
the restated J-A63.22 each stand once.

Round 2 leaves 2 minor issues, both owned by the model part, and no major one. V-MC2-01 is one more stale "S0 input"
for `HistoryHint`, in §2.9 and in J-A88.21; round 1's V-MC1-05 named only §2.7's two places. V-MC2-02 is the pipeline
repair seat's unfolded cross-part note on `UndergroundSystem.sources`. II.7.6 points to §2.7 for a generation-time
buried system's `sources`, but §2.7's comment does not list that case.

## 1. Items and round-1 issues

**Items routed to the model part.** Round 2 touched the text of items 50, 63, 65, 68, 81 (frame growth) and 88. The
other items keep the verdicts in `verify-model-r1.md` §1.

| item | role | state | evidence after round 2 (quoted) |
|---|---|---|---|
| 50 | home | PRESENT | §2.6 rule 4: "the main entrance moves only along the footprint side rule 1 puts it on and is never removed" (l. 1507), which agrees with rule 1 (l. 1488–1494). §7.1 (l. 7862, 7980) and §4.7 S11 (l. 5388) now say the same thing. |
| 59, 60, 79 | home | PRESENT | Unchanged by round 2 (see `verify-model-r1.md` §1). |
| 88 | home | PRESENT, with a stale remnant | `HistoryHint` is "a recipe input read by S2's growth-stage count (§4.2 S2), by II.7.6's catacomb age (`ageYears`) and, for a `fire` or `flood` scar, by II.7.6's buried old town (J-A88.42)" (l. 1868). The staged paragraph lists "S2's stage count (§4.2 S2), II.7.6's catacomb age and buried old town" (l. 1926). Both match §4.2 S2 (l. 4054) and II.7.6 (l. 16000). Defect: V-MC2-01 (§2.9 and J-A88.21 still say "S0"). |
| 63 | ref | PRESENT | `concealmentSource`: "A dossier event that sets the mode clears it (an `edit` it displaces is reported and orphaned, §7.7 item 5; J-A20.73); one that withdraws the dossier's mode re-resolves the mode by §4.7's Concealed institutions (1) from the map-side sources … as that event's least-disruption mutation (§7.7 items 5, 11 (b)), writing their source … a mode the dossier set is dossier-owned, so a map setAttr of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22). Read by §11.2's `why`". This agrees with §4.7 (1) (l. 5500), §7.1's uses row (l. 8027), §7.7 items 5, 7 and 11, and J-A63.22 (index l. 17131, Part A l. 755). `concealment` now reads "re-resolved only when a dossier event withdraws the dossier's mode". |
| 65 | ref | PRESENT, with one gap | §2.2 rule 1's further parts: "bounded by the part's outer ring — the ground's frame plus its context margin, as the sewer's is (II.7.2), so every part grows with the frame by §3.2 (9) (J-A65.22)". This matches II.7.2 (l. 15578–15579) and §3.2 (9) (l. 2600–2602, "the sewer's, II.7.2; each further part's, §2.2 rule 1"). `geology` reads "or overridden by `setAttr` (§7.1's terrain row)" in §2.3 (l. 866) and in §2.8's registry (l. 2128), which matches §7.1's terrain row (l. 8019). Defect: V-MC2-02 (`UndergroundSystem.sources`). |
| 68 | ref | PRESENT | `LightSource.host` lists "the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point it belongs to — for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1)" (l. 1861). This covers every value of `LightRule.host` (l. 5575) and §7.1's `placeLight` (l. 7890). §7.4 gives a host face for each of these hosts (l. 8690–8697). |
| 81 (frame growth, via V-MC1-10) | — | PRESENT | §2.3: "a resolution set at creation by the size class … The resolution is kept when an epoch grows the frame: every raster of this section extends by whole cells on its own grid, keeping its `cellCm` (§3.2 (9); J-A81.31), and a re-grid at the new rung's cell is only that rule's pre-decided fallback". `HydroGrid.cellCm` reads "(table values at creation; kept through frame growth, §3.2 (9))". Both match §3.2 (9) (l. 2603–2616) and J-A81.31. |
| 20 (h) | ref | PRESENT | Unchanged in §2. "§2.8's marker" appears 0 times in the design and the rationale; the eight places now read "§2.8's `factTier`". |
| 44, 64, 66, 67, 70, 72, 74–77, 80, 82, 85, 87, 101 | ref | PRESENT | Unchanged by round 2, apart from the registry's `Works` pointer (VD1-13, below). The verdicts in `verify-model-r1.md` §1 stand. |

**Round-1 issues and the other routed ids.** All are FIXED. Each was read at its line in the installed design.

| id | owner | state | evidence |
|---|---|---|---|
| V-MC1-01 = VD1-08 | model | FIXED | §2.7 l. 1817 (quoted under item 63). The override clause is gone, both dossier paths are stated, and the reader is named. J-A63.22 is restated in the index and in Part A. |
| V-MC1-02 (= VPR1-08 = VD1-09) | pipeline | FIXED | §4.7 (1) l. 5500: "The resolved mode is stored on the concealed use, with its map-side source (`Use.concealmentSource`, §2.7) when the dossier gave none; … one the dossier set is dossier-owned, a map `setAttr` of it refused …; a dossier event that withdraws the mode it set re-resolves it by this order from the map-side sources (§2.7; J-A63.22)". |
| V-MC1-03 = VD1-12 | model | FIXED | §2.7 l. 1861 (quoted under item 68). |
| V-MC1-04 | determinism | FIXED | §7.4 l. 8690–8697 adds a tunnel's band faces at the junction, an access point's element faces, a castle's inner ward, bailey and gatehouse footprint, a decoration's face, and a hand-placed light's host face. |
| V-MC1-05 | model | FIXED | §2.7 l. 1868 and l. 1926 (quoted under item 88). The residual is V-MC2-01. |
| V-MC1-06 | model | FIXED | §2.6 rule 4 l. 1507. |
| V-MC1-07 (= VD1-06) | determinism | FIXED | §7.1 l. 7862 and l. 7980: "the footprint side §2.6 rule 1 puts it on". |
| V-MC1-08 (= VPR1-14) | pipeline | FIXED | §4.7 S11 l. 5388: "the main entrance on the footprint side facing the plot's frontage access edge, where §2.6's rule 1 places it". |
| V-MC1-09 (= VD1-11 = VRC1-10) | rendering | FIXED | 0 occurrences of "§2.8's marker"; J-A20.82's index row (l. 17076) reads "by §2.8's `factTier` (`dossier`, `declared`, `map`)". |
| V-MC1-10 | model | FIXED | §2.3 l. 880–884, `HydroGrid.cellCm` l. 867 (quoted under item 81). |
| V-MC1-11 | model | FIXED | §2.3 l. 866 and §2.8 l. 2128 (quoted under item 65). |
| VKC1-02 | model | FIXED | §2.2 rule 1 (quoted under item 65). New J-A65.22: index l. 17147, Part A l. 771. Kernel's VKC1-01 pointer ("each further part's, §2.2 rule 1") now lands on text that states the ring. |
| VD1-13 | model | FIXED | §2.8 l. 2113: "`Works` (§2.7; lineage unit its target's lineage with its start week, §6.3; its `works` draws keyed as §6.1 states". This matches §6.3's anchor row (l. 7542) and §6.1's `works` concern (l. 7162–7166). |

**The repair's deviations** (repair report, "Deviations"). I checked each one and accept it. The first cites "§7.7 items
5, 11 (b)" in place of the r1 text's "item 13". Item 13 is the change envelope, and the mutation is item 5's, so the new
citation is correct. The second adds the displaced-edit clause and the open-use clause; both agree with §7.7 item 5 and
J-A20.73. The third lists the catacomb-age reader; II.7.6 l. 16000 reads `HistoryHint.ageYears`. The fourth records the
frame-wide ring as J-A65.22, which is a vetoable call recorded in both files.

**Held parts (gate (a)).** None is written in §2. A grep of §2 for "cast shadow", "VG 1.6.9", "shading and occlusion",
"widths up to 16", "160 of 162", "16-cell" and "visibly differ" finds 0 hits. Item 50's MFCG clause stays labelled "by
inference".

## 2. Checks

* **Single source.** Round 2 adds no second statement of a rule. §2.7's `concealmentSource` comment names the
  re-resolution's source order in a pointer-led recap ("by §4.7's Concealed institutions (1) from the map-side sources —
  …"). §4.7 (1) remains the one statement of the order: "This paragraph is the one statement of how such an institution
  is resolved". The recap matches (1) word for word in substance. It is the field's lifecycle, not a competing rule, so
  it is not filed. The frame-wide ring is stated once, in §2.2 rule 1. §3.2 (9) and J-A65.22 point to it.
* **Stale.** §2 has no hit for the listed stale classes: lots as buildings, binary wealth, size fixed by tier, one central
  market, the map editing the dossier, a proprietary licence default, or terrain and water that never change. The phrases
  that round 1 retired ("street-facing side", "§2.8's marker", "outranks a map override", "S0's stage count") now occur 0
  times anywhere in the design and the rationale. Remaining stale wording: V-MC2-01, the §2.9 `Recipe.history` comment
  and J-A88.21 ("an S0 input" / "that S0 reads").
* **Cross-part.** Every pointer that the round-2 text adds resolves to text that states what it points to:
  * II.7.2 (the sewer's ring);
  * §3.2 (9) (the ring's growth, the kept `cellCm`, the pre-decided re-grid);
  * §7.1's terrain row;
  * §7.7 items 5, 7 and 11;
  * §11.2's `why` (l. 12057 ff.: the key-filtered oracle, which "reads the pair's own derivation whole" for a key that
    admits the concealed use);
  * §6.1 and §6.3 (Works);
  * §4.2 S2 and II.7.6 (history readers).

  The round-2 cross-part notes addressed to §2 are these:
  * The kernel's note (VKC1-01 depends on VKC1-02) is satisfied.
  * Determinism's notes are confirmations. §7.4's host list matches `LightSource.host`, and rule 4 was repaired.
  * Pipeline's note §4 (3) (`UndergroundSystem.sources`) is not folded; it is V-MC2-02.
* **Deferral wording.** There is none new. The new lines hold no "TBD", "later", "open" or "TODO".
* **References.** The resolver (`docs/validation/amendments-b/refs.py`) reports headings 141, D ids 35, J ids 730, and
  2 broken references, the baseline pair (`os-geometry.md` §2.1.4; RFC 7946 §3.1.6). §2 cites 104 J ids; none is missing
  from the index and none from Part A. C1 (reference identifiers) has 5 hits, 0 unreviewed. The new lines add only our
  own type names (`AccessPoint`, `HistoryHint`, `HydroGrid`, `TerrainSampler`, `UndergroundSystem`).
* **New problems.** Round 2 introduced none into §2. V-MC2-02 is older text that round 1's II.7.6 repair (the
  generation-time buried town) made incomplete.
* **Considered, not filed.**
  1. *Hydro grid after growth.* A TOWN grown to CITY keeps its 16 m `hydro` cells. At a CITY frame that is about 500²
     cells, above §2.3's "cell counts §12.4's S1 budget assumes" at the rungs' target populations. That sentence
     describes generation. The recompute is linear, at about 2.5 × the measured 16 ms, and §3.2 (9)'s fallback covers
     memory. No rule is broken.
  2. *A withdrawn mode that re-resolves to `none`.* `Building.concealed` is a derived link (§2.8's registry), so the use
     leaves it automatically. "The use then placed as an open use" hands the site to §7.7 item 5's mutation.
  3. *Rule 1's title.* §2.6 rule 1's title is still "always street-facing". It is the owner's rule (item 29), and the
     body defines the side for hidden plots and cluster structures. The earlier verdict stands.

## 3. Issues

| id | sev | kind | owner | item | claim | required change |
|---|---|---|---|---|---|---|
| V-MC2-01 | minor | stale | model | 88 | Round 2 moved `HistoryHint`'s reader to S2 in §2.7 (l. 1868, 1926) and J-A88.42 states the same. Three places still name S0: §2.9's `Recipe` (l. 2183, `history?: HistoryHint; // item 88: the dossier's pre-creation history, an S0 input (§2.7) — staged, absent in the base`), J-A88.21's index row (l. 16953, "`HistoryHint` on the recipe as an S0 input") and its Part A entry (rationale l. 577, "`HistoryHint` as a field of the recipe that S0 reads"). §4.2 S0 does not read the hint (§4.2 S2, l. 4054). | l. 2183: replace "an S0 input (§2.7)" with "a recipe input read by S2's growth-stage count and II.7.6's rules (§2.7; §4.2 S2)". J-A88.21's index row: replace "`HistoryHint` on the recipe as an S0 input" with "`HistoryHint` on the recipe as a generation input (its readers J-A88.42's)". Its Part A entry: replace "a field of the recipe that S0 reads" with "a field of the recipe that generation reads (S2's stage count and II.7.6's rules; J-A88.42)". The row is restated, so the assembler swaps it into place. |
| V-MC2-02 | minor | conflict | model | 65, 88 | §2.7 `UndergroundSystem.sources` (l. 1845) lists "the raiseGrade that buried a town" as what explains a `buried` system. II.7.6 (l. 16036) makes a generation-time buried system's region "the districts whose `growthStage` is 1 (its `sources`, §2.7)", which §2.7 does not list. A `raiseGrade` is also a conversion op carried by a `convert` event, not an entity with an `Id`; its region is `RaiseGrade.region: Id[]` (l. 16103). This is the pipeline repair seat's cross-part note (repair-pipeline-r2-report §4 (3)), which assemble-r2 §9 lists as unfolded. | In the `sources` comment, replace "the raiseGrade that buried a town" with "the blocks or districts a `raiseGrade` buried (its `region`, II.7.6) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42)". |

## 4. CONFIRMED versus PLAUSIBLE

**CONFIRMED** by runs in this seat:
* the hashes;
* the §2 extract and its 10-hunk diff against the pre-repair-r2 archive;
* each fix's quoted text, read at its line, and each other-part fix at its home;
* `doc_checks --sections "2"`, exit 0 with the counts above;
* the resolver (2 broken, the baseline);
* the J-id resolution of §2 (104 ids, 0 missing);
* the 0-hit scans for the held-part phrases and the retired phrases;
* both issues' quoted text.

**PLAUSIBLE**, resting on reasoning only:
* that the two remaining issues would mislead a builder: a reader looking for S0's use of the hint, and a `sources` list
  missing its generation-time case;
* the proposed wordings;
* the "considered, not filed" judgments.
