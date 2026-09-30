# Verify MODEL part (§2) after amendments-c repair round 3 (assemble-r3)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-model-r3).

PROGRESS
- READ: verify-model-r2.md (own earlier report), repair-model-r3-report.md, assemble-r3.md, the four sibling repair-r3 reports' notes to the model part, §2 now vs the pre-repair-r3 archive (vm3c/s2.diff, 6 hunks) — done
- RE-CHECK repaired §2.7 and §2.9, the 2 routed issues (V-MC2-01, V-MC2-02) and the VD2-03 pointer rewrites inside §2 — done (§1)
- CHECKS single-source / stale / cross-part / deferral / refs / new-problem / gates — done (§2)
- doc_checks --sections "2" on the installed design — done (exit 0); proposals' check on a scratch copy over "2,7" — done (identical counts, exit 0)
- ISSUES table — done (§3; 3 issues, all minor)
- queue row, LANDED — done

Design read: `docs/ARCHITECTURE.md` sha256 `70ddb6e302ea06c1…` (17 305 lines), §2 = l. 469–2451; rationale
`e138da2377d31b9f…`; pre-repair archive `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r3-2026-09-28.md`
(`3daa0b07…`). This seat did not change either design file. Scratch: `scratchpad/vm3c/`.

## Outcome

Repair round 3 fixed both issues routed to the model part. V-MC2-01 and V-MC2-02 are in the installed text, worded as
the validator required. The repair seat's one widening, which names the building for a `dug` passage, is correct and
agrees with II.7.6 and §7.3 item 9. The §2 diff against the pre-repair archive has 6 hunks over 8 lines, and every one
is claimed:
* the two fixes;
* the VD2-03 pointer rewrites: six "§7.7 item 2" became "§7.7 layer 2", and one "§7.7 item 1's outcome targets" became
  "§7.7 layer 1's outcome targets".

Each rewritten pointer lands on the layer it means. `PowerStanding` and the port's category-and-name rows are layer 2's
records (§7.7, "layer 2's records"), and the `magic` circumstance is also layer 2's. Nothing in §2 still reads "§7.7
item 2". The one "§7.7 item 1" left (§2.9, l. 2216–2217, where the pointer wraps across the line) means the contract's
*One way*, the port's diff. That is correct.

Every item routed to the model part stays PRESENT, and §2 holds no held part. Gates (b) and (c) hold. There is no
deferral wording. `doc_checks --sections "2"` exits 0 (C1 5/0, C2 0/0, C3 326/0, C4 3/0, S1 0/0, S2 0/0), the same as
in round 2. The resolver finds 2 broken references, the baseline's two external citations. §2 cites 105 J ids, the same
set as before round 3, and all of them resolve in the index and in Part A (735 = 735, no duplicate). J-A88.21 is
restated in place in both tables.

This round leaves 3 minor issues and no major one. The assembler's §9 lists two open notes for the model's fields, and
each now has an exact change:
* **V-MC3-01** (model, duplicate). §2.7's `concealmentSource` comment restates §4.7 (1)'s re-resolution order and its
  open-use outcome. Round 3's pipeline repair made (1) state that outcome as well, so the model now duplicates it. This
  revises my round-2 verdict of "not filed" (pipeline r3 report §3; assemble-r3 §9 (3)).
* **V-MC3-02** (determinism, partial) with its follow-on **V-MC3-03** (model). The undercity-entrance closure can dig a
  `dug` passage, but §7.3 item 9 (d) names no subject for it, so `UndergroundSystem.sources` cannot list that case
  (repair-model-r3 cross-part note; assemble-r3 §9 (2)). Apply the two together.

## 1. Items and round-2 issues

**Items routed to the model part.** Round 3 touched the text of items 65 and 88 (`sources`, `HistoryHint`'s reader) and
the layer-2 pointers of items 77–79. The other items keep the verdicts in `verify-model-r2.md` §1 and
`verify-model-r1.md` §1.

| item | role | state | evidence after round 3 (quoted) |
|---|---|---|---|
| 50, 59, 60 | home | PRESENT | Unchanged by round 3 (`verify-model-r2.md` §1). Item 50's build-named parity sentence (§2.6, l. 1485–1487) and its §15.2 O5 note, rewritten by scope r3 as "the FTG client of the 2026-09-25 capture receives none (item 50)", name the same build. |
| 79 | home | PRESENT (pointers repaired) | `Institution.powers`: "a PowerStanding key (§7.7 layer 2)" (l. 1814). `Faction.kind`: "the port's category-and-name rows, §7.7 layer 2 … `PowerStanding.secret` in the base (§7.7 layer 2)" (l. 1824). The prose (l. 1901–1902) and J-A79.23's index row (l. 17040) read the same way. §7.7 declares `PowerStanding` among "layer 2's records". |
| 88 | home | PRESENT | §2.9 `Recipe.history`: "a recipe input read by S2's growth-stage count and II.7.6's rules (§2.7; §4.2 S2) — staged, absent in the base" (l. 2183). J-A88.21 index (l. 17041): "`HistoryHint` on the recipe as a generation input (its readers J-A88.42's)". Part A (l. 577): "a field of the recipe that generation reads (S2's stage count and II.7.6's rules; J-A88.42)". These agree with §2.7's `HistoryHint` comment (l. 1868), the staged paragraph (l. 1926), §4.2 S2 (l. 4054), II.7.6, J-A88.42 (l. 17228) and §13.2 T88-1 (l. 13645–13646). |
| 65 | ref | PRESENT | `UndergroundSystem.sources` (l. 1845): "the blocks or districts a `raiseGrade` buried (its `region`, II.7.6) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42), the building whose access edit dug a passage (`addUndergroundAccess`, item 66)". This matches `RaiseGrade.region: Id[]` "the blocks or districts raised", II.7.6's "its region the districts whose `growthStage` is 1 (its `sources`, §2.7)" and `addUndergroundAccess(building, target?)` (§7.1; §7.3 item 9 (d)). Defect: V-MC3-03 (the undercity lifeline closure's case). |
| 63 | ref | PRESENT | Unchanged. Defect: V-MC3-01 (duplicate recap). |
| 77, 78 | ref | PRESENT (pointers repaired) | Every layer-2 pointer in §2 now reads "§7.7 layer 2". "§7.7 item 2" occurs 0 times in §2. |
| 20 (h), 44, 64, 66, 67, 68, 70, 72, 74–76, 80, 82, 85, 87, 101 | ref | PRESENT | Unchanged by round 3. The verdicts of `verify-model-r2.md` §1 stand. |

**The round-2 issues.** Both are FIXED. Each was read at its line in the installed design.

| id | owner | state | evidence |
|---|---|---|---|
| V-MC2-01 | model | FIXED | The three places use the validator's texts verbatim (quoted under item 88). "S0 input" and "that S0 reads" occur 0 times in both files. The one "S0 reads" left (l. 9002, §7.7) is the timeline's creation slice, not the hint. |
| V-MC2-02 | model | FIXED | The validator's text is verbatim (quoted under item 65). "the raiseGrade that buried" occurs 0 times. |

**The repair's deviations** (repair report, "Deviations"). I accept both.
1. *The widened dug clause.* `sources` is `Id[]`, and "the access edit that dug a passage" named an event. The building
   is the entity `addUndergroundAccess` acts on. Tracing the lifecycle confirms the repair seat's claim. The closure
   writes the id with the passage. Its exact undo restores the system record (§7.3 item 9 (c)). A system that the edit
   created is removed whole.
2. *The history tag* in the Part A entry: "(item 88; repair round 3, V-MC2-01)". This follows J-A88.42's precedent.

**Held parts (gate (a)).** None is written in §2. A search of §2 for "cast shadow", "VG 1.6.9", "shading and occlusion",
"160 of 162", "160 / 162", "16-cell", "16 cells wide", "widths up to 16", "visibly differ", "door concept" and "MFCG
draws" finds 0 hits. Item 50's MFCG clause stays labelled "by inference" (l. 1486).

## 2. Checks

* **Single source.** Round 3 adds no second statement of a rule. The `sources` clauses cite II.7.6, which holds the
  rules. The history comment cites §4.2 S2 and II.7.6. One pre-existing recap is filed now: V-MC3-01. It restates
  §4.7's *Concealed institutions* (1), which says it is "the one statement of how such an institution is resolved".
  Canon R3 gives stage behaviour to §4, and R1 gives the record to §2. Round 3's VPR2-02 added to (1) "the use re-placed
  by (2)–(6) as that event's least-disruption mutation (§7.7 items 5, 11 (b)), as an open use where the order yields
  `none`". §2.7 already carried the same outcome, so the model now repeats (1)'s whole withdrawal sentence. The two
  agree today. The R13 union check found no detail in §2.7's recap that (1) lacks. The order, the `siting` draw, the
  mutation and the open-use outcome are all in (1). The displaced-edit clause is §7.7 item 5's (J-A20.73), and the
  proposed text keeps the pointer that leads there.
* **Stale.** §2 has no hit for any of these stale classes:
  * lots as buildings;
  * binary wealth;
  * size fixed by tier;
  * one central market;
  * the map editing the dossier;
  * a proprietary licence default;
  * terrain and water that never change.

  Phrases that earlier rounds retired occur 0 times in the design and in the rationale: "S0 input", "S0's stage count",
  "the raiseGrade that buried", "the access edit that dug", "street-facing side", "§2.8's marker" and "outranks a map
  override".
* **Cross-part.** Every pointer that round 3 adds or rewrites in §2 resolves to text that states what it points to:
  * II.7.6: the buried town's region, `RaiseGrade.region` and the dug connector;
  * J-A88.42: the readers;
  * §4.2 S2: the stage count;
  * §7.1 and §7.3 item 9: `addUndergroundAccess`;
  * §7.7 layers 1 and 2, whose convention is now stated at §7.7 by determinism r3.

  In the other direction, the texts that cite §2's changed fields read correctly: II.7.6's "(its `sources`, §2.7)",
  §4.2 S2, §13.2 T88-1, and J-A88.42's and J-A79.23's rows. Notes addressed to the model part:
  * pipeline r3 report §3 = assemble-r3 §9 (3): filed as V-MC3-01;
  * repair-model-r3's note to determinism = assemble-r3 §9 (2): filed as V-MC3-02 / V-MC3-03, so that it has a route.

  No other repair-r3 report addresses the model part. Scope r3's §15.2 O5 change agrees with §2.6's item-50 sentence.
* **Deferral wording.** There is none new. The changed lines hold no "TBD", "later", "open" or "TODO".
* **References.**
  * The resolver (`docs/validation/amendments-b/refs.py`) reports headings 141, D ids 35, J ids 732, and 2 broken
    references, the baseline pair (`os-geometry.md` §2.1.4; RFC 7946 §3.1.6).
  * §2 cites 105 J ids, the same set as before round 3. None is missing from the index (735 rows) or from Part A (735
    entries), and the two tables hold the same id set with no duplicate.
* **Gates (b), (c).** Round 3 adds no sentence that says what a reference does. I scanned the §2 sentences that the
  pass added and that name a reference (`vm3c/gateb.txt`, 13 lines). Each one does one of three things:
  * it names its build (MFCG 12710731, NG 1.2.2, Dwellings itch 17195045, the FTG client of the 25 September 2026
    capture);
  * it describes our own parity preset;
  * it predates the pass (the VG grid clause, the "no cellars" note).

  The identifiers the round adds are ours: `raiseGrade`, `region`, `fire`, `flood`, `addUndergroundAccess`. C1 finds
  5 hits, 0 of them unreviewed.
* **New problems.** Round 3 introduced none into §2. Neither V-MC3-01 nor V-MC3-02 is a new contradiction. Each is an
  older gap that round 3's texts made visible.
* **Document checks.** On the installed design, `doc_checks.py --sections "2"` gives C1 5/0, C2 0/0, C3 326/0, C4 3/0,
  S1 0/0, S2 0/0 and exits 0. The proposals of §3 were applied to a scratch copy and checked there over sections "2,7",
  against the untouched design over the same keys. Both runs give C1 5/0, C2 0/0, C3 442/0, C4 3/0, S1 0/0, S2 0/0 and exit 0, so the proposals add no hit (`vm3c/dcP.out`, `vm3c/dcU.out`).
* **Considered, not filed.**
  1. *A building id that outlives its passage.* A later deletion of the access point removes the unshared dug passage
     (§7.3 item 9 (c)), and the building's id stays in `sources` if the system survives. I read `sources` as provenance.
     The buried case lists blocks and districts that the conversion `cleared` by design (II.7.6: "the cleared records
     keeping their addresses"), so an id that outlives its element is consistent with the field. The old text ("the
     access edit that dug") had the same property.
  2. *Two build-name spellings.* §2.6 reads "the FTG client of the 25 September 2026 capture" and "MFCG 12710731", while
     the amendments file writes "the FTG client of the 2026-09-25 capture" and "MFCG itch 12710731". Both name the same
     build, and gate (b) requires the build to be named, not a spelling. `verify-model-r1.md` §1 accepted this form.
  3. *J-A88.21's "dossier keys" in Part A* against "binding keys" in the index row. §2.9 uses "dossier key" for the key
     that a binding row binds (l. 2212), so the two terms agree.

## 3. Issues

| id | sev | kind | owner | item | claim | required change |
|---|---|---|---|---|---|---|
| V-MC3-01 | minor | duplicate | model | 63 | §2.7's `Use.concealmentSource` comment (l. 1817) restates §4.7's *Concealed institutions* (1). It gives the re-resolution order ("a map assignment's value, else the class table on the institution's `siting` draw, else `none`"), the outcome ("the use then placed as an open use") and the mutation ("as that event's least-disruption mutation (§7.7 items 5, 11 (b))"). Round 3's VPR2-02 made (1) state that outcome too, and (1) calls itself "the one statement of how such an institution is resolved" (canon R3; RULE 1). The two texts agree now but can drift apart. The pipeline r3 report §3 and assemble-r3 §9 (3) route this to the model part. It revises `verify-model-r2.md` §2's "not filed", because round 3 extended (1). | In §2.7, l. 1817, replace "one that withdraws the dossier's mode re-resolves the mode by §4.7's Concealed institutions (1) from the map-side sources — a map assignment's value, else the class table on the institution's `siting` draw, else `none` (the use then placed as an open use) — as that event's least-disruption mutation (§7.7 items 5, 11 (b)), writing their source." with "one that withdraws the dossier's mode re-resolves it from the map-side sources, and writes their source here, by §4.7's Concealed institutions (1) (J-A63.22)." Change nothing else. J-A63.22's row already states the choice and needs no restatement. |
| V-MC3-02 | minor | partial | determinism | 65, 66 | §7.3 item 9 (d) (l. 8510–8512) makes "an undercity entrance that lacks its lifeline (II.7.5, item 65)" a closure, "built by … II.7.6's target, connector, access and link pieces". II.7.6's connector is a `dug` passage in the `dug` system's part. No edit kind or subject is declared for this closure, and §7.1 has no undercity edit. So the entity whose id a `dug` system's `sources` should hold for such a passage is undefined. Generation-time lifelines dig nothing (II.7.5 "Lifelines and light": access, air shaft and water links), so only this closure path is affected. This is repair-model-r3's cross-part note, carried as assemble-r3 §9 (2). | In §7.3 item 9 (d), replace "and an undercity entrance that lacks its lifeline (II.7.5, item 65) are closures too," with "and an undercity neighbourhood (a `District`, II.7.5, item 65) whose entrance lacks its lifeline — the closure's subject that neighbourhood, which the `dug` system's `sources` names (§2.7) — are closures too,". Land it with V-MC3-03. |
| V-MC3-03 | minor | partial | model | 65, 66 | `UndergroundSystem.sources` (l. 1845) lists only the building of an `addUndergroundAccess` as what explains a `dug` passage. A passage dug by the undercity-entrance closure (V-MC3-02) has no entry. | Together with V-MC3-02: in §2.7, l. 1845, replace "the building whose access edit dug a passage (`addUndergroundAccess`, item 66) */" with "the building whose access edit dug a passage (`addUndergroundAccess`, item 66), the undercity neighbourhood (a `District`, II.7.5) whose lifeline a closure dug (§7.3 item 9 (d)) */". |

## 4. CONFIRMED versus PLAUSIBLE

**CONFIRMED** by runs in this seat:
* the hashes;
* the §2 extract and its 6-hunk diff against the pre-repair-r3 archive;
* each fix's text, read at its line;
* the placement of J-A88.21's restated row in both tables, once;
* the 27 §7.7 pointers in §2, each read against §7.7's layer and contract lists;
* the retired-phrase and held-phrase scans (0 hits);
* `doc_checks --sections "2"`, exit 0 with the counts above;
* the resolver (2 broken, the baseline);
* the J-id resolution (105 cited, 0 missing, 735 = 735);
* the gate-(b) sentence scan;
* the absence of an undercity edit kind in §7.1;
* the scratch-copy application of the three proposed texts, each asserted to match once.

**PLAUSIBLE**, resting on reasoning only:
* that V-MC3-01's recap risks drift and is better as a pointer;
* the choice of the undercity neighbourhood as the lifeline closure's subject in V-MC3-02 / V-MC3-03;
* the "considered, not filed" readings.
