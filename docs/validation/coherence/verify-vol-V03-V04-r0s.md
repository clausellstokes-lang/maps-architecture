# Verify — design volumes V03 (interiors) and V04 (the underground), coherence pass round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V03-V04-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V03-V04-r0`; started 2026-10-03 in the cloud continuation; no earlier output on disk)
- P1 inputs gathered (canon routing for V03/V04, rulings, edges, cross-part notes from every rewrite report): done
- P2 mechanical checks (ids, references, terms, deferral, narration tags, mapping table, per-item tokens): done
- P3 V03 archive → new review (low-aligned units, keyed row diffs, decisions, narration ranges): done
- P4 V04 archive → new review (the same, plus the moved declarations against the base and V11 §3.23): done
- P5 cross-unit agreement, cohesion, wiring, edges, g items 113 and 114: done
- P6 report, results JSON, LANDED: done

Scratch: `/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/v34/`
(`routing-V03.txt`, `routing-V04.txt`, `rulings.txt`, `edges-V0?.txt`, `xnotes.txt`, `mapping.json`, `refs-*.txt`,
`tokmiss-*.txt`, `align-*.json`, `low-*.txt`, `rowsig-*.txt`, `jdiff-*.txt`, `jspan-*.txt`, `numdrop-*.txt`, `narr-*.txt`,
`notes.md` and the scripts that made them).

## 1. Outcome

**26 issues: 1 blocker, 7 majors, 18 minors.** By owner: V03 8 (1 blocker, 1 major, 6 minors), V04 4 (3 majors,
1 minor), determinism 2 (1 major, 1 minor), rendering 1 major, V06 2 (1 major, 1 minor), pipeline 1 minor, V05 1 minor,
scope 1 minor, V02 1 minor, V07 1 minor, V09 1 minor, V11 2 minors, V12 1 minor. The live files are the assembled ones:
`docs/volumes/V03-interiors.md` is `cmp`-identical to `docs/validation/coherence/new/volumes/V03-interiors.md`;
`docs/volumes/V04-underground.md` differs from its rewrite output only by the Assemble seat's one mechanical fix
(`V07 §1 (5)` → `V07 §1's facts (1)`, line 3365).

Both volumes keep their content well:

* **Every inventory id is mapped and traced.** All 873 ids (V03 513, V04 360) are in the two mapping tables and every
  target heading resolves. Of the 46 ids whose backticked names, quotations or numbers were not found verbatim, every one
  is a formatting artefact (`x` for `×`, thin-space digit groups, archive line numbers in the inventory statement), a value
  now homed at its owner (V11 §3.23, base §4.2 S2, §4.11, §8.4, §12.4, item 244 — each checked present there), a stale
  price removed by V04-ICONF-2, or J-V3.110 (a process record removed under NARR-8).
* **The canon's routes are applied.** V03: MC-01, V04-XCONF-2, V04-XCONF-3, V09-XAGREE-2, V10-XAGREE-4, CANON-C03; E-24,
  E-28 and E-29 with their equivalence lists (each item checked against the archive: `basementDoor(b)`'s three rules and
  door-point clause and `stackAccessDoor(b, a)`'s admissibility are `doorRunPoint`'s two calls exactly); W-HOOK-02,
  V03-WGAP-1; ID-BCR, ID-DUPDEF; G-cite, G-floorvault, G-firstmap; all 36 open findings; all 13 hand-offs. V04: MC-11,
  V04-ICONF-1 – -5, V04-XCONF-1 – -3, V07-XCONF-2, CANON-C03, CANON-C04; E-03 (its six-point equivalence list held),
  E-16 (vacuous), E-24, E-39; W-DOS-10c, W-IF-01, W-HOOK-02, V04-WGAP-2 – -4; ID-BCR, ID-WX, ID-DR, ID-DUPDEF; all five
  terms; all 59 open findings; all 31 hand-offs; **g item 113's V04 part at build depth** (`BuriedFormer.lay` with its
  gate, depth law, elements, failure, keys, lifecycle row, export, budget, bar T-V4-76 and J-V4.123; the `lost` reading,
  `ExcavationRecord`, vacate-and-return, T-V4-77 and J-V4.122). The edge catalogue's 29 + 26 (V03) and 52 + 62 (V04)
  entries and every owned combination (V03 6, V04 62) have an outcome, a rung and a test (V03 §3.13 with T-V3-36,
  T-V3-37; V04 §3.13 with T-V4-78).
* **What is wrong is narrow:** V03 thinned the reasons of six reconciliation-era decisions (the blocker); V04 types the
  undercity's source rank under a second name and record; **g item 114** (filed 2026-10-03 02:35 UTC, after both rewrites
  landed) has no V04 part; V04 still calls `ruinMasonry` "the `ruin` program"; and several units have not closed V04's
  cross-part notes (the base's warning list, the dwelling closure and the lost void's drawing; II.6's `flowToward`;
  V06's burial mechanism) or V04's renaming of its build steps (`U3` → `V4-U3`) and span cells (`raised.*` → `span.*`).

**Sizes** (whitespace words, the canon's count): V03 82 788 → 66 643 (−19.5 %), V04 83 966 → 74 335 (−11.5 %; the
rewrite's 74 333 plus the Assemble seat's fix). Both are below the 25–40 % band; each rewrite names the irreducible
content and the mandated additions (V03 ≈ 3 900 words; V04 ≈ 7 600) that hold it — not a defect. Neither unit shrank by
more than half; the chapters that did (V03 §10, §12, §13, the head; V04 §10, §12, §13, the head) are pointer or status
chapters, and each was audited: every §10 row's request, item and base home checked against the canon's
`requests_in_f` (V03 34, V04 46; the canon's `bcr_pointer` row giving V04 BCR-45 → item 291 is the canon's slip — item
291 is BCR-V6-26, and V04's 244 and 559 are right); §12 and §13 read whole; the narration ranges (V03 head, §12–§13 rounds,
reconciliation rounds 1–6 and the finalization; V04 the same) read for any rule found nowhere else (none: each round
record names a change the body already carries).

## 2. Method (nothing sampled)

* **Mapping.** `mapping.json` from the two reports' tables: 873/873 ids, 0 unresolved targets, 26 "folded/removed"
  dispositions each read (J-V3.110 removed; 19 V03 decisions' round labels folded; V04's two IN notes folded).
* **References.** Every `§` token of both volumes classified (V03 1 561, V04 1 364); the 44 not resolving at first pass
  read one by one — all list continuations or line-wrapped prefixes except the three bare forms of V03-CITE-2 and
  V04-CITE-1. Incoming: no `V03 §` or `V04 §` in the set fails to resolve.
* **Ids.** T-V3-1 – T-V3-37 and T-V4-1 – T-V4-79 each defined once; J-V3.1 – J-V3.130 (without J-V3.110) and
  J-V4.1 – J-V4.126 each defined once; every citation in the set resolves.
* **Terms and narration.** Every retired pattern of the canon glossary (35) — 0 true hits; narration tags (C4-, V3C-,
  SL-, ST-, TR-, TT-, SLR, SCC-, S23-, RC, receipts, hashes) 0; deferral wording 0 (21 "later"/"until" hits read: all
  descriptive).
* **Tokens.** `tokens.py`: every inventory statement's code names, quotations and numbers looked up (46 flagged, each
  read, §1).
* **Keyed rows.** Every table row matched by its first cell and word-diffed (V03 574 rows, V04 690): 52 + 92 rows whose
  removed words were more than ids and citation forms read in full; rows with no same-key row covered by the sentence
  alignment.
* **Sentence alignment.** Every archived prose unit outside the narration ranges aligned to its best new unit (V03 1 609,
  V04 1 776); every unit below 0.7 containment read (V03 134, V04 121); numbers dropped from matched units listed and each
  traced (V03 4, V04 79 — tag digits, homed values, ruled price changes).
* **Decisions.** Every J-V3 and J-V4 row compared: content retention, "because"/"over"/"since"/"rather than" counts,
  and every removed span of six words or more (V03 10 rows, V04 8 rows) read — the source of V03-DEC-1.
* **Agreement.** Each V03/V04 statement that another unit also states was read at that unit: base §2.3, §2.6, §2.7,
  §4.1, §4.7, §4.12, §5.4, §7.3, §8.4, §11.1, §14, §16, II.6, II.7.4–II.7.6; V02 §10, V05 §1b, V06 §3.20, V09 §4.9 and
  §4.17, V10 §3.9a and §10.2, V11 §3.23–§3.24, V12 §3.11, INDEX §3–§4; and every cross-part note addressed to V03 or V04
  in the other fifteen rewrite reports (§5).

## 3. Issues

### Blocker

**V03-DEC-1 · NUANCE-LOST · V03.** Six decisions written in the reconciliation rounds lost reasons or rejected
alternatives when their round labels were folded (the guard: no reasoned decision thinned):
* J-V3.122 (l. 2660) lost why T28-1's soft-room clause takes the exception: "since 'each with its tier in the report'
  would otherwise fail the same building's soft rooms".
* J-V3.123 (l. 2661) lost the rejected tune's consequence "(T28-13's fixtures and the goldens re-signed at M6-P)" and the
  alternative "over leaving that order unstated, which would leave the P1 seat a restatement the lint refuses".
* J-V3.124 (l. 2662) lost the sub-choice's alternative "over a text the base could read as moving S11's entrance draws
  after the basement's".
* J-V3.125 (l. 2663): (a) lost "rather than falling to a higher side or to the trapdoor"; (c) lost the reason's force
  "so a `door.mainCm` span held within its side would bar on a church a side every other building may use, and one not
  held within it could slide past the side's end".
* J-V3.126 (l. 2664): (c) lost the alternative "over reverting the arch to an opening outside the tree, which re-strands
  that undercroft".
* J-V3.127 (l. 2665): (a) lost "since a wing that only touches the vault stands over no part of it"; (d) lost "over 'from
  the room the basement's tree enters first'".

*Required change:* restore each quoted clause in its row from `docs/archive/volumes-pre-coherence-2026-09-28/V03-interiors.md`
§9 (rows J-V3.122 – J-V3.127), removing only round labels, seam and critique ids and "recorded"/"refinement" narration.

### Majors

**V03-MOAT-1 · CONFLICT · V03** (coincides with verify-agree-fabric AF-06; apply once). V03 §3.13 (f)'s row "a coast, a
moat, an oasis" says "a building on a bridge over a moat is a deck building", and T-V3-37 (d) builds "a gatehouse on a
moat with a deck building on its bridge"; the base offers deck plots "on no moat deck at a gate (a gate's approach stays
clear; realism tiebreaker)" (§4.7 S10, l. 6280), so the fixture asks for a building the generator never makes and the
outcome row describes a case the base excludes. *Required change:* the row reads "a moat deck at a gate holds no deck
plot (§4.7 S10), so no building stands on it and the gatehouse's entrance opens onto the deck; a deck plot on any other
bridge is a deck building (V03 §3.7.2 (0))", and T-V3-37 (d) asserts that no plan exists on a gate's moat deck and that
the gatehouse's entrance lies on the deck.

**V04-RANK-1 · CONFLICT · V04** (coincides with verify-agree-layers AL-11 and verify-vol-V11-V12 VV1112-08; apply once).
One cell has two names, two records and two types: the base declares `UndercityRule.sourceRank:
Partial<Record<UndergroundSystem['kind'], number>>` (II.7.5, l. 18762, 18889; registry row 59) and V11 §3.23.6 states its
values under that name, but V04 declares `RuinRule.sourceWeight: Record<…>` (l. 673) and reads it at l. 700, 1127, 1299,
1892, 3045 and J-V4.117 (l. 3211), registering its calibration on the `under.ruin` line (58a) instead of row 59. V11's
cross-part note 1 asked for the base's name; it was not applied. *Required change:* V04 drops `sourceWeight` from
`RuinRule` (l. 673), reads `UndercityRule.sourceRank` (II.7.5; V11 §3.23.6) at every listed line, and names the
calibration line as row 59's `undercity` line; §2.3's defaults row lists `UndercityRule.sourceRank` → V11 §3.23.6.

**V04-G114-1 · F-MISSING · V04.** g item 114 (OWNER RULE, filed 2026-10-03 02:35 UTC; applied "like items 111 to 113",
J126) names V04 — "the underground's optional systems on the list" — and "every stage that builds a listed kind (reads its
switch)", and withdraws deletions that hold for ever. V04 carries none of it: no **Built by the town** rows for its
generated kinds, no stage reading a switch, and three deletions that still hold for ever against 114 (c) — a deleted
generated run's tombstone on its creation key with cost ∞ (V04 §3.2 N3a (2), l. 980), the catacomb `tombstones` "growth
never digs them again" (l. 482; J-V4.56; V04 §4.3's delete row; T-V4-39's epoch clause) and the arch vault's "a
regeneration after a removal lays none" (V04 §2.6, l. 848, following the base's suppression). *Required change (new
design at build depth, V04's editor):* (a) a V04 §2.3 table of the underground's switch rows — the blueprint ruin, the
generated catacombs, caverns (and fissures), quarries and mine voids, the street, bridge and arch vaults, the buried old
town, the public openings, the dig accesses and the generated undercity — each with its default (as the rules say), the
stage that reads it and the dossier-bound instances it never touches (a dossier `ancient_ruins` deposit or ruined
landmark, a subterranean or catacomb record, `require`); (b) each stage of V04 §3 reading its switch, and OFF removing
only that kind's generated standing instances (listed in the `adjust` preview), never an author-drawn or dossier-bound
one; (c) the three deletions above made "for now": they hold through a plain Regenerate, a reload and crash recovery and
lapse at the next epoch, New random or Re-derive of the building stage (J-V4.56 amended by a new decision; T-V4-39
reworded); (d) lifecycle rows (V04 §2.6), wiring (V04 §1b), edges (V04 §3.13 (c)) and a bar (a switch off: none at every
rung and epoch; back on: present at the next derivation; a delete then Regenerate byte-identical; a delete then one epoch
may rebuild; every row at its default byte-identical to the base).

**V04-PROG-1 · TERM · V04** (coincides with verify-agree-layers AL-16; apply once). V04 calls `ruinMasonry` "the `ruin`
program" (V04 §5.2's heading bullet l. 2726 "**The `ruin` program** (g item 109 (g); `ruinMasonry`)", and l. 1384, 3070,
3269, 3350 "the ruin program"), while §8.2 defines two different programs — `ruin` (the `ruined` state's dashed outline,
fill and stipple) and `ruinMasonry` (the ancient ruin system's double wall). One name then means two programs.
*Required change:* every one of the five places reads "the `ruinMasonry` program" (BCR-V4-40's row in §10 included).

**DET-V04-2 · CONFLICT · determinism.** §7.3 item 9 (d) (l. 10201) defines the dwelling closure for "an underground cluster
nobody can reach (V04's excavation reading `unexcavated`)"; under g item 113 (e) a `lost` cluster is equally unreachable,
and V04 §3.8, §4.1 and §4.3 already treat "`unexcavated` or `lost`". Read as written, a declaration placing dwellings in a
lost cluster builds no way in. V04's cross-part note 2 asked for it. *Required change:* "(V04's excavation reading
`unexcavated` or `lost`)".

**REN-V04-1 · CONFLICT · rendering.** V04 rules (V04 §5.1, §5.2, J-V4.122; V09 §4.17.3 and V10 follow) that a `lost`
cluster is drawn faded by the `unexcavated` program and labelled "once known" for every key its `knownTo` admits, whatever
`showUnexcavated` says, and that only an unexcavated element is `secret`-only; the base's drawing and admission homes are
silent on `lost` — §8.4 (l. 12183) draws unexcavated voids under `showUnexcavated`, §11.1 (l. 14113) admits an
unexcavated element at `secret` only, and §2.7 (l. 2421) says "drawn faded like an unexcavated void" — so a renderer
following the base hides a publicly known lost void or shows it only under the secret view key. V04's cross-part note 3
asked for the rule. *Required change:* §8.4 and §11.1 state that a `lost` element, its label ("once known") and its links
are drawn by the `unexcavated` program and exported for every key its `knownTo` admits, independent of
`showUnexcavated`; only an `unexcavated` element is `secret`-only and drawn under `showUnexcavated`.

**V06-V04-1 · CONFLICT · V06** (coincides with verify-vol-V05-V06's burial issue; apply once). V06 §3.20.5 (3) buries a
former settlement "by II.7.6's burial of the former settlement — the `raiseGrade` conversion with cause `burial` over the
region … so later coarse epochs build on the raised ground", with no size gate; V04 §3.5.5 (b) (the builder) lays it by
`BuriedFormer.lay(doc, epoch, former)` in that epoch's batch — no grade raise, the former records cleared, elements
`riseCm` below today's levelled ground, only a former fabric that stood at TOWN or above, `W_BURIED_FORMER_SKIPPED` when
nothing can be laid, the returned id written into `HistoryRecord.buried` — and the base's II.7.6 (l. 19037) says "buried
the same way" as the scar town, with no `raiseGrade` recorded. V04 §13 lists this hand-off as closed at V06; it is not.
*Required change:* V06 §3.20.5 (3) calls V04's `BuriedFormer.lay` as V04 §3.5.5 (b) states (its gate, its depth law, the
clearing of the former records in the batch), writes the returned id into `HistoryRecord.buried`, and drops the
`raiseGrade` conversion and "later coarse epochs build on the raised ground".

### Minors

**V03-CITE-1 · TERM · V03** (partly coincides with verify-agree-fabric AF-23). The canon's S1 has a volume cite the base
section where an applied request's fact now lives; V03's body still names other volumes' requests 66 times instead (V04's
rewrite converted every such citation to its item): BCR-V2-33 15×, BCR-V2-41 9×, BCR-V2-34 6×, BCR-V2-28 6×, BCR-V2-27 5×,
BCR-V2-42 3×, BCR-V2-01 3×, BCR-V5-30 2×, BCR-V4-30 2×, BCR-V2-32, BCR-V2-31, BCR-V11-13, BCR-V1-43 2× each, BCR-V4-29,
BCR-V2-39, -38, -20, -18, -15, -04, -03, BCR-V11-1, BCR-V10-3 once each — several as the only pointer ("volume 2's
BCR-V2-33 (c) states it", "which volume 2's BCR-V2-33 bars"), and `stepProfile(wall)` "(BCR-V1-43; V01 §3.11 (7))"
(l. 133, 1485) although the base declares it at §2.7 (item 245, l. 2148), `levelledGroundCm` "(BCR-V5-30)" although its
home is §4.7 (item 309). *Required change:* outside §10's "Other volumes' requests" paragraph, write each as the base
section and item the request became (V02 §10's pointer rows give them: BCR-V2-33 → §2.6, item 371; BCR-V2-41 → §2.6
*Entrances*, item 230; BCR-V2-28 → §2.6, item 226; …; BCR-V1-43 → §2.7, item 245; BCR-V5-30 → §4.7, item 309; BCR-V4-29,
-30 → II.7.4, items 554, 557; BCR-V10-3 → §2.8, item 270; BCR-V11-1, -13 → their items).

**V03-CITE-2 · TERM · V03.** Citation forms outside S7: l. 1606 "volume 4's §3.5.1 (9)" (a bare § that means V04's);
l. 2815 "stated in V02 (its §1b, §2, §3.13, §3.17, §4.6, §5.2)" (bare §s that read as the base's); l. 2392 "volume 2's X17
cap" (a volume-local row id, ID-WX). *Required change:* "V04 §3.5.1 (9)"; "V02 §1b, V02 §2, V02 §3.13, V02 §3.17,
V02 §4.6, V02 §5.2"; "V02 X17's cap".

**V03-IN-1 · ID · V03.** The *Integration notes* table keeps the ids IN-V03-1 – IN-V03-3 with a restated summary, and
cites "J-VI.17 H18" with `_integrate`'s volume-local row id bare (l. 2828); ID-WX keeps IN ids only in the validation
records and has another unit write "_integrate H18". *Required change:* replace the table with V04's form — one paragraph
naming each J-VI decision (J-VI.17's H18 as "_integrate H18", J-VI.4, J-VI.5) and the V03 home it is folded into — and
drop the IN ids.

**V03-HO-1 · COHESION · V03.** V03 §13's *Hand-offs from this volume* gives four rows a process status, "V04's editor
(this pass)", "V09's editor (this pass)", "V10's editor (this pass)", "V05's editor (this pass)" (l. 2811, 2816–2818),
though three are now stated at their homes (T-V4-50's elaboration-independence clause, V04 §7; V09 §4.9's
`bend.crypt.*` rows and §4.17.5; V10 §3.9a's crypt rows and §10.2's CVR-V10-9) and the fourth is open (V05-V03-1).
*Required change:* each status cell names its destination home ("stated at V04 §7's T-V4-50", "stated at V09 §4.9 and
§4.17.5", "stated at V10 §3.9a and V10 §10.2"), and the V05 row "stated at V05 §1b" once V05-V03-1 lands.

**V03-PLAN-1 · COHESION · V03.** V03 §8 ends "§16 computes the total once; this volume states none of its own" (l. 2531)
while its own table states "**total** 18.5–25.25" — two readings of one fact. *Required change:* V04 §8's sentence:
"§16's totals are computed once from the volumes' lines (item 568); this volume states its own estimate only."

**V03-RAISED-1 · CONFLICT · V03.** V03 §4.2's raised-way bullet (l. 2106) restates the base's delete rule "(a removal of a
generated way holds through regeneration)"; g item 114 (c) changes it (it holds while the town is unchanged and lapses
at its next change), so the restatement will disagree with the base the moment the base applies item 114. *Required
change:* cite the rule instead of stating it — "the base's edit (its hold is §2.8's delete rule, item 114 (c))" — and the
fate line names the plan as lost "with the way" in either case.

**V04-CITE-1 · TERM · V04.** l. 162 "V06 §3.18 (§3.18.1 (2c), (4), (6); §3.18.2 (3))" — bare §s that read as the base's;
and the four citations of V10's request BCR-V10-3 (V04 §1b.2 l. 323, §4.5 l. 2591, T-V4-79 l. 2967, J-V4.125 l. 3219)
where V04's own rule (its §10 preamble) cites the applied item. *Required change:* "V06 §3.18.1 (2c), (4), (6), V06 §3.18.2 (3)"; "the explainer registry (§2.8, item 270)".

**DET-V04-1 · CONFLICT · determinism.** §5.4's `warnings` comment (l. 8481) names seven underground codes; V04 §1b.1's list
(item 338, BCR-V4-41) has twelve — `W_RUIN_SOURCE_REMOVED`, `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR`,
`W_TERMINAL_CISTERN_SKIPPED`, `W_BURIED_FORMER_SKIPPED` missing (V04-WGAP-3, g item 113). V04 §13 lists the hand-off as
closed at §5.4; it is not. *Required change:* the comment reads "the underground's codes (V04 §1b.1's list; item 338)".

**PIPE-V04-1 · TERM · pipeline.** II.6 (l. 18243, 18245) still lists "the ways with `flowToward` (§2.4)" among
`SewerStrategy`'s inputs and has mains "falling with `flowToward`"; item 208 retired the stored field for the derived
reading `wayFall(way)` (§2.4, l. 1033, which drops a stored value on load). V04's cross-part note 4 asked for it.
*Required change:* "the ways' `wayFall` reading (§2.4, item 208)" and "falling with `wayFall`".

**V05-V03-1 · WIRING · V05.** V05 §1b's row for `levelledGroundCm` on a sky key (l. 253) lists its readers as V05's
surface top, crypt re-test and clearance check and V01's island bridge build, "never a field reader"; V03 §3.6's W2
outside sample reads it on a building's own arena key, a sky island's included (V03 §3.6, l. 1410), for the exposure
gates, `Entrance.storey`, the walk-out and the outside digest. A consumer is missing at its producer (V03 §13's open
hand-off). *Required change:* the row's readers add "V03 §3.6's W2 outside sample (the exposure gates, `Entrance.storey`,
the walk-out door, the outside digest) on an island building".

**ID-U-scope · ID · scope.** V04 renamed its build steps `V4-U0` – `V4-U5`, `V4-U3b` (V12's form) so that a bare U1 – U3
names only II.7.3's owner rules; the base and INDEX still cite the steps bare: §16 l. 17628 ("M6-U's U3–U5"), l. 17639
("after V04's U5"), l. 17642 ("its U3 distinctness and U4 undercity parent"; "U4 carries the crypt derivation"); INDEX
l. 119, 143 ("U0"), 144 ("V04's U5", "U3/U4"). *Required change:* each reads `V4-U0`, `V4-U3`, `V4-U4`, `V4-U5`
(`V4-U3–V4-U5`).

**ID-U-V02 · ID · V02.** V02 l. 1854 "`panel` at U5 (V4-U5, …)". *Required change:* "`panel` at V4-U5 (`realism`; …)".

**ID-U-V06 · ID · V06.** V06 l. 3602 "the burial clause after M6-U's buried system (as E8 after U5)". *Required change:*
"(as E8 after V4-U5)".

**ID-U-V07 · ID · V07.** V07 l. 3401 "the dig rows are rows of V04's tables (landed at V04's U3b)". *Required change:*
"(landed at V04's V4-U3b)".

**ID-U-V09 · ID · V09.** V09 §8's AP6 row (l. 3819) "M6-U (with V04's U3, U3b and U4)". *Required change:* "M6-U (with
V04's V4-U3, V4-U3b and V4-U4)".

**V11-SPAN-1 · TERM · V11.** V04 renamed the span-rule cells to the base's names (`span.vaultShare`, `span.vaultCap`,
`span.supportFoundationCm`; item 244; V11's `raisedWays.structure.span.*`), but V11 still names them by V04's retired
names: l. 513 "V04's `raised.vaultShare`", l. 650 "(`raised.vaultShare`)", l. 652 "(`raised.vaultCap[rung]`)", and
l. 3866's prose-name list (`raised.vaultShare`, `raised.vault.maxHeightCm`, `raised.vaultCap` …). *Required change:* each
reads the base's `span.*` name; the prose-name list is dropped (one name per cell).

**V11-U-1 · ID · V11.** V11 l. 4440 "`panel` (V4-U5, `realism`) at U5". *Required change:* "at V4-U5".

**V12-SPAN-1 · TERM · V12.** V12 l. 2147 "(V04's `raised.vaultShare`, …)" names V04's retired cell name, and l. 2119
registers "`under.ruin` `sourceWeight`" — V04's second name for the base's `UndercityRule.sourceRank` (V04-RANK-1).
*Required change:* "`span.vaultShare`"; the line keyed to row 59's `UndercityRule.sourceRank` (V11 §3.23.6).

## 4. Checked and found right (no issue)

* **E-28** — `PlanReport.warnings` holds the seven `W_` codes only, `notes` the three ids; base T28-1 (l. 15697), V10
  l. 168 and l. 3159 read `notes`.
* **E-29** — `doorRunPoint` reproduces both archived door-point definitions exactly (a run under two modules gives none;
  `ok` always true gives the midpoint; the nearest admissible point, ties toward the first vertex); the tomb door keeps its
  own slide; the new cliff clause of rule 3 has its fallback in §3.13 (f).
* **V03-DUP-2** — every archived §2.5 "read" cell (35 rows) is in a §1b row or, for the edit consequences, in §2.5's own
  regenerate cell.
* **V09-XAGREE-2 / J-V3.130** — the archive kept and announced the removal of an `always` building's crypt; the canon's
  ruling bends the principal's removal to its smallest lawful size; V03 §4.2 keeps "kept and announced" for a non-principal
  `always` crypt and a principal shrunk below an edited crypt, so no case is lost.
* **V04's moved declarations** — every field and comment of the archive's §2.2 code block (`Outfall` with `stream` and
  `field`, `Tunnel`'s `serves`/`chambers`/`depthOffsetCm`/`grilles`, `ChamberKind`, `Chamber.span`, `monument` with
  `standing`, `moundCm`, `count`, `reusedBy`) is in the base's §2.3 and §2.7 declarations or in V04's body (§3.5.0a (5a),
  (6); §2.6).
* **V04's V11-owned values** — every value the archive's §2.3 defaults table held for `RuinRule.chance`, `.survival`,
  `.cultures`, `OpeningRow`, `DigRule` and `CatacombRule` is in V11 §3.23.2 – §3.23.8 unchanged.
* **The engine count** — the archive's "nine engines" against a ten-row table; V04 now says ten, matching the table.
* **Cohesion** — V03 §8 and V04 §8 agree with §16's M6-P and M6-U rows and INDEX §3/§4 (orders, dependencies, 18.5–25.25
  with M6-P 17.75–24.25 and PE 0.75–1; 28.25–39.25); each §11 marks its questions answered (J122) and the body reads them;
  one marker line each.
* **Hand-offs into the volumes** — all 13 (V03) and 31 (V04) closed at the homes the reports name.

## 5. Cross-part notes addressed to V03 and V04 (all read)

| from | note | state |
|---|---|---|
| V02 | V02 §3.18 (f) cites `basementDoor(b)`; the decided order for `facadeBays`, `endMarginM`, `bayM` | V03 §3.6 W2, §8 agree |
| V06 | X1, X2, X14, X25, X33 (V04); X3, X18 (V03) | closed at V04 §3.5.1, §3.5.7, §3.10, §3.5.0, §3.5.4; V03 §3.7.4, §2.5 |
| V07 | V04's "V07 §1 (5)" and "V07 FL-3" | fixed by the Assemble seat (l. 3365) |
| V09 | the lost void drawn with `info.under.lost` | agrees with V04 §5.1, §5.2 |
| V10 | `deckNoCellar`, `PlanReport.notes` | agree (V03 §2.3, §4.6) |
| V11 | note 1: `UndercityRule.sourceRank` for V04's `RuinRule.sourceWeight` | **not applied** — V04-RANK-1 |
| V12 | note 6: T-V4-77 an `exactStates` spec | consistent with T-V4-77 |
| determinism | F-PLAN at §5.2 (V03); F-NET, F-UNDER, F-VOID, §6.1's fixed-key pattern, §7.4's AccessPoint row (V04) | applied |
| rendering | `ruinMasonry` and the `unexcavated` program (V04) | half applied — V04-PROG-1 |
| model | §2.6's `FurnitureItem` and record additions (V03); `Outfall` at §2.3, oxbow → `'lake'`, `ChamberKind` at §2.7, the lost void (V04) | applied |
| scope | §14's PageUp/PageDown precedence (V03, V04) | applied (§14 l. 17300) |

V04's own cross-part notes to other units were checked at their destinations: 1 (determinism §5.4) open — DET-V04-1;
2 (determinism §7.3) open — DET-V04-2; 3 (rendering) open — REN-V04-1; 4 (pipeline II.6) open — PIPE-V04-1; 5 (scope §14)
applied; 6 (V03) applied; 7 (V06) open — V06-V04-1; 8 (V07) applied; 9 (V09) applied; 10 (V10) applied; 11 (V11) the
`buried` slice's former form applied; 12 (V12) applied; 13 (V08) nothing owed; 14 (model) applied. V03's notes: 1 (V04)
applied; 2 (V09) applied; 3 (V10) applied; 4 (V05) open — V05-V03-1; 5 (V01) nothing owed; 6–11 applied or standing.

## 6. Coincidences with sibling lanes (apply once)

V03-MOAT-1 = AF-06; V03-CITE-1 ⊇ AF-23; V04-RANK-1 = AL-11 = VV1112-08; V04-PROG-1 = AL-16; V06-V04-1 = the V06 burial
issue of verify-vol-V05-V06. The sibling issues AF-28, AF-30, AT-21 (V03) and AL-17, AL-18, VAP-07 (V04) were not
re-raised here.
