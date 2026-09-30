# Consistency verification — MODEL part (§2), round 2

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-model-r2`, 2026-09-26. Status: COMPLETE. Re-checks `## §2 Domain model and schemas` of
`docs/ARCHITECTURE.md` (sha256 `d9d509fa…`, 9 668 lines; §2 = l. 298–1524) after repair round 2, against the archive
`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`, `inventory-model.json`, `canon.json`, `rewrite-model.md`'s
mapping table, the six `repair-r2-*.md` files and the round-1 report `verify-model-r1.md` (cited as "r1").

**Method.** The pre-repair document was regenerated (`assemble-r0.py`, then `assemble-r1.py`: sha256 `ddd48f07…`, which is
assemble-r2's "before"), and `assemble-r2.py` run on it reproduces the current document byte for byte. The diff has 16
hunks (H1–H16, §4), all inside the 15 replaced subsections. A word-level diff of each hunk lists exactly the words that
changed, so a re-wrapped paragraph cannot hide an edit. An id was re-checked when its home, one of its references, or the
text its r1 verdict rested on lies in a replaced subsection: 153 ids. They were found from the mapping table's place, the
canon home, the inventory's places and statement, r1's notes, and a scan of every pointer from §2 into a replaced
subsection. The other 278 ids keep their r1 verdict ("kept" in §8). Every repair-r2 claim was checked against its
required change in the word diff (§3).

## 1. Outcome

Both r1 model issues are fixed, each confirmed at its place. V-MODEL-R1-01 is fixed by the scope block (§13.2, H16), and
V-MODEL-R1-02 by the model block (§2.6 l. 963, H3). Two of r1's observations are closed as well. O1 is closed by
determinism's VDR1-1, since §7.3 item 7 (ii) now names wing rings (H10). O6 is closed by rendering's VR-R1-6 (§12.7's
stage-3 hook, H14). Every other repair-r2 claim is present as its required change asks (§3).

Round 2 introduced one new minor issue. There is no blocker and no major:

* **V-MODEL-R2-01** (rendering): H12 left §12.6's replay sentence without a verb ("… through the session's code path, the
  view stages once at the end (§7.3 item 2) — …"). The values and pointers agree; only the wording is broken.

No open item is owned by this part (UNFIXED: none), and the seven routed §2 edits are unchanged. Round 2 replaced the
places of four canon conflicts (MODEL-C02, C03, C04 and C11), and all four are still resolved as ruled. §2 changed on one
line only (l. 963), and the block that made the change appears verbatim once. Every pointer resolves, and §2 holds no
deferral wording, no fix-round tag and no review marker. All 431 ids are OK: 153 re-checked and 278 kept.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| V-MODEL-R2-01 | minor | new-problem | rendering | §12.6 *Replay and load verification* (l. 7329–7331) now reads "A replay (§7.3 item 2's replay mode) folds the log on the model through the session's code path, the view stages once at the end (§7.3 item 2) — S13a's scoped delta …". The clause "the view stages once at the end" has no verb. r1's text had "…, and S14 and S13b run once at the end", and VR-R1-3 (b)'s required change kept "run". The repair's vetoable call (2) put "the view stages" in place of "S14 and S13b" and dropped the verb, so the meaning can only be recovered through the pointer (§7.3 item 2, l. 4869–4870: "Only the view stages wait: S14 and S13b run once at the end"). The bullet holds the figures MODEL-409 cites (≈ 1.4 s, ≈ 11 s). It also points to the rule MODEL-393 states at §2.9 step 3 ("only the view stages S14 and S13b suppressed (§7.3)"). Both still agree, so the defect is one of wording only. | §12.6: "… folds the log on the model through the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta …". |

## 3. The issues repair round 2 claimed, and the r1 issues and observations about this part

Every claim was checked against the required change of the issue it fixes, in the word diff (§4) and at its place.

| issue | owner | repaired by (hunk, line now) | now reads | verdict |
|---|---|---|---|---|
| V-MODEL-R1-02 (MODEL-255) | model | repair-model-r2, §2.6 rule 4 *Cost* (H3, l. 963) | "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)". §12.4's S11 row (l. 7229): "its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7) plus rule evaluation ≤ 2 µs; compound ≤ 40 µs (25 + 15)". The archive's §3.7 (l. 3129–3133) split the 40 into 25 of geometry and 15 of rule evaluation, and §3.7 M0 (ii) now measures the share "against its §12.4 row". No "25 µs, §3.7" is left anywhere (grep). | FIXED |
| V-MODEL-R1-01 = V-SCOPE-R1-01 (MODEL-403, MODEL-408) | scope | repair-scope-r2, §13.2 B-EDIT (H16, l. 7734–7742) | (a) "on an edited CITY document"; (b) "with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match"; (c) "wait for the recomputation, the mismatch withdraws the keep, and the snapshot is never kept". All three are the archive's details (l. 1994–1995, 2026–2028), and the rule itself stays stated once, at §6.2 (iii) (l. 4314–4315). | FIXED |
| r1 O1 = VDR1-1 (MODEL-260) | determinism | repair-determinism-r2, §7.3 item 7 (ii) (H10, l. 5052) | "each face and wing ring §2.6's composition rule (1) adds to its scope". Rule (1) puts the faces "together with a row neighbour's wing rings" into that scope (l. 985–988). | FIXED — O1 closed |
| r1 O6 = VR-R1-6 (MODEL-278) | rendering | repair-rendering-r2, §12.7 stage-3 hook (H14, l. 7419) | "(≤ 3 µs per plot median, §12.4's S11 row; the kernel's M0 bar, §3.7)", which is §12.4's S11 row. | FIXED — O6 closed |
| VK-R1-1 | kernel | repair-kernel-r2, §3.3 (H4, l. 1695) | "**A batch's faces are the faces it names or creates**." | present as required. §2.6 (1) cites this same-level-split rule, whose text is otherwise unchanged. |
| VDR1-2 = P1-2 | pipeline | repair-pipeline-r2, §4.4 S5d (H6, l. 3124) | "**Test:** §13.2's B-CITY `wealthLevel` sweep." | present (P1-2's fuller form); no model id |
| VDR1-3 | determinism | repair-determinism-r2, §5.2 F-SKELETON (H9, l. 4018) and §5.1 (H8, l. 3988) | where "S1, S11, S13a"; "`spine` readers — label spines (§9.3) and S1's coast simplicity clamp (§4.2 S1 (2)): a sampled medial axis"; the roofs clause unchanged; "the `regions` reader (S10) takes F-PLOT's ladder" | present. The roofs clause is still MODEL-223's and MODEL-243's plain-roof downgrade, word for word. |
| P1-1 = VR-R1-4 | pipeline | repair-pipeline-r2, §4.2 S1 (2) (H5, l. 2677–2679) | the required sentence, verbatim | present. MODEL-045 and MODEL-173 agree (O-R2-1). |
| P1-3 | pipeline | repair-pipeline-r2, §4.8 (H7, l. 3590) | "(0 ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats)" | present; no model id |
| V-SCOPE-R1-02 = VR-R1-5 | scope | repair-scope-r2, §1.2 (H2) and §0.2 row 4 (H1) | the required §1.2 wording and the optional §0.2 wording | present; no model id (MODEL-353 cites §0.2 row 5, which is unchanged) |
| VR-R1-1 | rendering | repair-rendering-r2, §12.7 (H13, l. 7411) | "and from M2b, where `lit` ships, a `lit` export …" | present. The optional §16 pointer was declined by assemble-r2 (not model). |
| VR-R1-2 | rendering | repair-rendering-r2, §12.8 (H15, l. 7482) | "(a set is §12.7's 160 sprites)" | present; no model id |
| VR-R1-3 (a) | rendering | repair-rendering-r2, §8.10 (H11, l. 6261) | "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)". §6.1 (l. 4176–4179) keeps every component, and §8.10 keeps its own creation indices 0–3 and 4 (the band and tile steps). | present. MODEL-289 is unchanged. |
| VR-R1-3 (b) | rendering | repair-rendering-r2, §12.6 (H12, l. 7329) | the restated list is replaced by "(§7.3 item 2's replay mode)" | the duplicate is removed as required, but the new clause lost its verb → **V-MODEL-R2-01** |

r1's observations O2, O4, O5 and O7 lie in sentences that round 2 did not change, and they stand as recorded. O3's
sentence in §12.8 is also unchanged by H15 and stands; it needs no change.

## 4. What round 2 changed, mapped to the model ids

These are the 16 hunks of the whole-document diff, with their words taken from the word-level diff.

| hunk (line now) | subsection | change | model ids | verdict |
|---|---|---|---|---|
| H1 (107) | §0.2 row 4 | "§12.2 (bands and matched reference sizes)" → "§12.2 (matched reference sizes and the band ends in buildings)" | none (MODEL-353 cites row 5, unchanged) | no model fact |
| H2 (196–203) | §1.2 | "across §12.2's building range;" → "across the target's building range, §1.1;" + re-wrap | none | no model fact |
| H3 (963) | §2.6 rule 4 *Cost* | "§3.7;" → "§12.4's S11 row;" | MODEL-255 | V-MODEL-R1-02 fixed |
| H4 (1695) | §3.3 same-level-split bullet | " (K4)" dropped | MODEL-260 cites the rule; 35 re-checked ids point into §3.3 | tag only |
| H5 (2677–2679) | §4.2 S1 (2) | the contour clip → "their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2)" | MODEL-045, MODEL-173 | agree (O-R2-1) |
| H6 (3124) | §4.4 S5d | the test → "§13.2's B-CITY `wealthLevel` sweep" | none (MODEL-129, 179, 283, 308, 309, 313, 315 point to S5a or the trim, unchanged) | no model fact |
| H7 (3590) | §4.8 castle acceptance | "11 bloats, §5.2)" → "11 bloats)" | MODEL-311's castle facts unchanged | no model fact |
| H8 (3988) | §5.1 tier diagram | "medial axis (labels)" → "sampled medial axis (spine readers)" | MODEL-331 ("§5.1" for `attempt`) | unchanged |
| H9 (4018) | §5.2 F-SKELETON | S1 added; the reader downgrades named | MODEL-223, MODEL-243 (the roofs clause), MODEL-196 (F-PLOT) | agree |
| H10 (5052–5053) | §7.3 item 7 (ii) | "each face" → "each face and wing ring" | MODEL-260, MODEL-262, MODEL-263 | O1 closed |
| H11 (6261–6262) | §8.10 | the stamp-tile key's components → "§6.1's registry entry" | MODEL-289 | agree |
| H12 (7329–7331) | §12.6 replay bullet | the list → "(§7.3 item 2's replay mode)"; "S14 and S13b run once at the end" → "the view stages once at the end (§7.3 item 2)" | MODEL-393, MODEL-409 | agree; V-MODEL-R2-01 |
| H13 (7411–7414) | §12.7 export beside the view | "from M2b, where `lit` ships," | none | no model fact |
| H14 (7419–7422) | §12.7 stage-3 hook | "(≤ 3 µs per plot median, §3.7)" → "(… §12.4's S11 row; the kernel's M0 bar, §3.7)" + re-wrap | MODEL-277, 278, 279, 281 | O6 closed |
| H15 (7482–7487) | §12.8 canvases during an export | the per-set measurement claim → "(a set is §12.7's 160 sprites)" | none (MODEL-393's and MODEL-407's sentences in §12.8 are unchanged) | no model fact |
| H16 (7735–7757) | §13.2 B-EDIT load verification | the three details of V-MODEL-R1-01 + re-wrap | MODEL-403, MODEL-408 (fixed); MODEL-339 (its 20-epoch test re-wrapped, words unchanged) | V-MODEL-R1-01 fixed |

## 5. Open items, canon conflicts, cross-part

* **Open items:** none is owned by §2, and UNFIXED is []. The routed §2 edits are unchanged. NP5-1 (§2.6 (1)) and NP5-4
  (`Room`, the relative `Porch`, `ComposedTower`) lie in the §2.6 block, which is byte-identical to r1 outside l. 963.
  VK5-1, VK5-2, VK5-3, VD5-5 (§2.8; §7.3 item 6) and VS5-1 (§2.9 step 5) lie outside every round-2 hunk.
* **Canon conflicts:** the four whose places round 2 replaced were re-read, and all four hold as ruled:
  * MODEL-C02: §2.6 wing rule 3 and *Row footprints* cite §3.8's test, and §3.8 is unchanged.
  * MODEL-C03: `ComposedTower` (l. 842) and §2.7's `Tower` comment (l. 1074).
  * MODEL-C04: the castle surround row in §4.8; H7 changed a different sentence.
  * MODEL-C11: §4.2 S1 (5) and §4.4 S5a are unchanged, so the deck placement still lives there only.

  The other eight conflicts lie outside the replaced subsections, and r1's verdicts stand.
* **Cross-part:** the pipeline lane's residual for model (§2.3 l. 688) is O-R2-1, and it needs no change. The model
  repair asked nothing of another lane.

## 6. Mechanical checks (executed)

* **Regeneration.** `assemble-r0.py` and then `assemble-r1.py` give sha256 `ddd48f07…`, assemble-r2's "before".
  `assemble-r2.py` on that gives `d9d509fa…`, which is byte-identical (`cmp`) to the current document.
* **Diff.** The diff has 16 hunks, all inside the 15 replaced subsections, and the only §2 hunk is l. 963. The word-level
  diff of every hunk was read and is quoted in §4.
* **The model block.** The one block of `repair-r2-model.md` (250 lines) appears verbatim, exactly once, in the document
  (script).
* **`doc_checks.py --sections "2"`:** exit 0. The counts are the same as r1: C1 5/0 unreviewed, C2 0, C3 58/0, C4 2/0, S1
  0 and S2 0.
* **`assemble-r0-refs.py`:** 134 headings, 35 D-ids, 276 J-ids and 0 broken internal references. The same 2 external
  pointers remain, at l. 2036 and l. 6826.
* **Pointers from §2 into the replaced subsections: 113.** Each was checked against the hunk list. Six land on text that
  a hunk changed or re-wrapped, and each resolves:
  * l. 688 → §4.2 S1 (2) (H5; O-R2-1);
  * l. 988 and l. 1004 → §7.3 item 7 (ii) (H10);
  * l. 1213 → the M4 epoch test (re-wrapped in H16, words unchanged);
  * l. 1435 and l. 1462 → §13.2's load-verification fixtures (H16).

  The changed l. 963 now points to §12.4's S11 row, which states the 25.
* **Pointers into §2 from the other 14 replaced subsections: 81.** They form the same multiset in r1 and now.
* **Number-and-pointer scan** of §2 against the replaced subsections (and §12.4). It gives the same result as on r1's
  text, except the l. 963 clause, whose 25 is §12.4's "(25 + 15)" (read). Round 2 removed some numbers: the S5d test's
  ± 5 % and ≥ 95 %, §8.10's restated creation indices, and §12.8's "PLAUSIBLE until M2b". §2 attributes none of them to
  its old place (grep).
* **Tag, deferral and marker scans of §2:**
  * 0 fix-round tags; COV-NG-VS27 at l. 1136 is an audit id, as at r1.
  * Every "later" is temporal.
  * §2 holds no "PENDING FABLE REVIEW" line; the document keeps its one banner (l. 3).
* **J-ids.** No hunk touches the judgment index, and `docs/ARCHITECTURE-RATIONALE.md` has not changed since 16:23, before
  round 2. r1's J-row check therefore stands.

## 7. Observations (not issues)

* **O-R2-1 (MODEL-173, the residual the pipeline lane named for model).** §2.3 l. 688 keeps "clipped to the land faces
  (§4.2 S1 (2), §8, §11)". After H5, §4.2 S1 (2) states three things: the coast construction, that "contour lines are
  not model geometry", and that no contour crosses the shore. It forwards the extraction and the clip to §8.2. §8.2 is in
  the list as "§8", and it states them (l. 5719–5722). The list therefore resolves through §8 in one hop. It differs
  from r1's V-MODEL-R1-02, whose only target stated nothing. The wording is MODEL-173's canonical statement (canon:
  model, "state"). No change is needed.
* **O-R2-2 (cosmetic).** The model block made its substitution in place without re-wrapping. L. 963 is therefore 128
  characters, against the 120-column prose wrap. It renders as one paragraph.
* **r1's O2, O3, O4, O5 and O7** stand as recorded, because their sentences are unchanged.
* **Tag style** is unchanged. The document-wide audit-id convention is still for the validator or Fable to rule.

**CONFIRMED vs PLAUSIBLE.** Executed or read at the place, and so CONFIRMED:

* both r1 issues fixed, O1 and O6 closed, and every repair-r2 claim present (§3);
* V-MODEL-R2-01;
* the hunk-to-id mapping (§4) and the mechanical checks (§6).

PLAUSIBLE, as a reading of intent:

* that the 25 in §12.4's "(25 + 15)" is the compound geometry share (by the row's parallel with its median clause and
  the archive's §3.7 split);
* O-R2-1.

The 278 "kept" verdicts rest on r1's reading of text that round 2 did not change.

## 8. Checked list — every inventory id (431)

**Verdicts.** OK means the fact has the same meaning at its mapped place; for a reference, it means the target still
states the fact. Otherwise the verdict is an issue id.

**How each id was checked.**

* **re-checked:** the id's home, one of its references, or the text its r1 verdict rested on lies in a replaced
  subsection. It was re-verified against the word diff, and the note names any hunk that touched it.
* **kept:** the home and every reference lie outside the replaced subsections, so r1's verdict stands
  (`verify-model-r1.md` §8).

| id | disposition | r2 verdict | how | note |
|---|---|---|---|---|
| MODEL-001 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: intro kept; "added later" reworded to "owner-staged … need no change of the mode…) |
| MODEL-002 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.1 Units: H2 moved the angle-naming clause into the angle sentence; lengths, origin, axes unchanged) |
| MODEL-003 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1, §3.2 unchanged by r1 at this fact (diff) — r0: pointer "inside the arena frame of §3.2…) |
| MODEL-004 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1, §3.2 unchanged by r1 at this fact (diff) — r0: pointer to §3.2 (6); §3.2 (6) states ar…) |
| MODEL-005 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: H2 re-worded the sentence; stored angles still "`i32` centidegrees", directions still §3.2 (5)'s (CANON-C02; §3.2 (5)…) |
| MODEL-006 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-08 fixed** (H2): the lint again refuses "any length field that has neither" (O6 (a), G-R14); stored angles …) |
| MODEL-007 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Layers — present) |
| MODEL-008 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1, §2.2 unchanged by r1 at this fact (diff) — r0: §2.1 Layers (arena per layer, PlatKey) …) |
| MODEL-009 | section restatement | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: section restatement; §8.4 states sky shadows …) |
| MODEL-010 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Layers — present) |
| MODEL-011 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1, §7.1 unchanged by r1 at this fact (diff) — r0: §8.4 declares LayerSpec (read)) |
| MODEL-012 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Layers wording — present) |
| MODEL-013 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Ids — present) |
| MODEL-014 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §6.3 states the two identities, anchor/hyster…) |
| MODEL-015 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1, §2.2 unchanged by r1 at this fact (diff) — r0: §2.1 Ids (interned u32 / strings; paren…) |
| MODEL-016 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §2.1 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-017 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-018 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-019 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-020 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-021 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: unchanged; §3.4's `opts.pinned` and `pinVertices` comments lost only their fix-round tags (H24, H27) and still say on…) |
| MODEL-022 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types (vertices.level) — present) |
| MODEL-023 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types (halfEdges) — present) |
| MODEL-024 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 types — p… |
| MODEL-025 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.10, §3.2 unchanged by r1 at this fact (diff) — r0: literal values kept (D6), agree …) |
| MODEL-026 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 LevelFace… |
| MODEL-027 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 RoleTable — present) |
| MODEL-028 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-11 fixed** (H54): §3.10's row now "every indexed role of §2.2 rule 7's registry other than a knot role" = a…) |
| MODEL-029 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3, Judgment index unchanged by r1 at this fact (diff) — r0… |
| MODEL-030 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: §3.3 pool step 1 copy text unchanged except its receipt name (H19) |
| MODEL-031 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-032 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: §3.3 "Tombstones and rebuilds" and pool step 1 unchanged except tags (H23) |
| MODEL-033 | state | OK | re-checked | §3.3 rule 2 (kernel allocation, anchor-key uniqueness) unchanged; H4 dropped only "(K4)" at the same-level-split bullet |
| MODEL-034 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-035 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types comment — present) |
| MODEL-036 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-037 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-038 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-039 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-040 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-041 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: comment points to rule 5 (MODEL-C07); alias i…) |
| MODEL-042 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-043 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present) |
| MODEL-044 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.2 rule 1 byte-identical; §4.5's restored sentence (H56: finer faces nested in the district's L1 faces, containment…) |
| MODEL-045 | state | OK | re-checked | §2.2 rule 1 byte-identical; §4.2 S1 (2) still says contour lines are not model geometry and now sends their extraction and clip to §8.2's relief tier (H5), which states them (l. 5719–5722): raster products, never plat edges |
| MODEL-046 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present) |
| MODEL-047 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present) |
| MODEL-048 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.2 rule 1 byte-identical; §4.5's restored sentence (H56: finer faces nested in the district's L1 faces, containment…) |
| MODEL-049 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.2 rule 1 byte-identical; §4.5's restored sentence (H56: finer faces nested in the district's L1 faces, containment…) |
| MODEL-050 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present) |
| MODEL-051 | reference | OK | re-checked | r2 changed §4.8 only at the castle acceptance's pointer (H7), not at this fact (word diff); r1: §3.7 `bandUnion` and §4.8 wall strips unchanged (H44 and H57 are elsewhere in those subsecti… |
| MODEL-052 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3, §4.9 unchanged by r1 at this fact (diff) — r0: §2.2 rul… |
| MODEL-053 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present |
| MODEL-054 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present) |
| MODEL-055 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present) |
| MODEL-056 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.10 unchanged by r1 at this fact (diff) — r0: §3.10 nesting row (read)) |
| MODEL-057 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present) |
| MODEL-058 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present) |
| MODEL-059 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present) |
| MODEL-060 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §2.1 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present) |
| MODEL-061 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rul… |
| MODEL-062 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present) |
| MODEL-063 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present) |
| MODEL-064 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present) |
| MODEL-065 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §6.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present) |
| MODEL-066 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.10, §3.6, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (J-K…) |
| MODEL-067 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.10, §3.6, Judgment index unchanged by r1 at this fact (diff) — r0: §3.6 placement-r…) |
| MODEL-068 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.10, §3.3, §3.6, Judgment index unchanged by r1 at this fac… |
| MODEL-069 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-09 fixed** (H3): "(it lies within the hot pixel of the route it was placed on, §3.6)" — the archive's wordi…) |
| MODEL-070 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: §3.3 clear-region rules 1–3 read after r1: tags dropped (H9–H13) and rule 2 gains the anchor… |
| MODEL-071 | state | OK | re-checked | promotion paragraph (clear regions → §3.3; deck span; J-I12) unchanged; §3.3's clear-region rules untouched (H4 is the same-level-split bullet's tag) |
| MODEL-072 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present) |
| MODEL-073 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 "The split flag" (clearing …) |
| MODEL-074 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6, §3.4 unchanged by r1 at this fact (diff) — r0: §3.6 "The `split` flag under move…) |
| MODEL-075 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §3.6 flag-under-moves paragraph carries…) |
| MODEL-076 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 demotion — present) |
| MODEL-077 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (a) — present) |
| MODEL-078 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (b) — present) |
| MODEL-079 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: VK5-2 wording unchanged in §2.2; §3.4 comments lost only tags (H24, H27)) |
| MODEL-080 | state | OK | re-checked | §2.2 rule 3 demotion (c) / rule 7 deck unchanged; the placement pointer §4.2 S1 (5) unchanged (H5 is S1 (2)); §7.3 (b) 9 unchanged; §3.3 changed only by H4's tag — MODEL-C11 as ruled |
| MODEL-081 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (c) — present) |
| MODEL-082 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 demotion (c…) |
| MODEL-083 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 "So a plot-line end…" — pre…) |
| MODEL-084 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.10, Judgment index unchanged by r1 at this fact (diff) — r0: VK5-3 wording applied;…) |
| MODEL-085 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §3.6 (read)) |
| MODEL-086 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3, §3.6, §6.2, §7.4 unchanged by r1 at this fact (diff) — … |
| MODEL-087 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §3.10 level-consistency row unchanged except its tag (H53)) |
| MODEL-088 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §3.4 doors paragraph and §3.6 ste…) |
| MODEL-089 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: still stated in rule 4 with pointer; §3…) |
| MODEL-090 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 — present) |
| MODEL-091 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §2.2, §2.1 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 (p… |
| MODEL-092 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 — present) |
| MODEL-093 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-01 fixed** (H28): §3.4 `resolve` "current slots, stamped with the arena version — valid until the next comm…) |
| MODEL-094 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 — present) |
| MODEL-095 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 Stretches (J-K31)…) |
| MODEL-096 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.10, §3.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 Stretches — present) |
| MODEL-097 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.4 unchanged by r1 at this fact (diff) — r0: §3.4 Stretches paragraph (read)) |
| MODEL-098 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: unchanged; §3.9's roles row (H49) persists "every role §2.2 rule 7's registry marks indexed, the knot roles among the…) |
| MODEL-099 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attributes — present) |
| MODEL-100 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attributes — present) |
| MODEL-101 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attributes — present) |
| MODEL-102 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.7, §6.2, §3.4 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attribute…) |
| MODEL-103 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.2 rule 5 byte-identical; §13.1's knot fixture (r4_checks C) gained "every other role unchanged" (H105) — compatible) |
| MODEL-104 | history out | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: history out; receipt "≤ 6.8 ×…) |
| MODEL-105 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.2 rule 5 byte-identical; §13.1's knot fixture (r4_checks C) gained "every other role unchanged" (H105) — compatible) |
| MODEL-106 | history out | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: history out; receipt r4_check…) |
| MODEL-107 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 cutting/joining — pre…) |
| MODEL-108 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §7.1, §7.4 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 positions in log — pr…) |
| MODEL-109 | state | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §2.2, §3.4, §7.3 unchanged by r1 at this fact (diff) — r0: §2.2 rul… |
| MODEL-110 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §7.4 moveCourseKnot row: half control spacing…) |
| MODEL-111 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §3.6 kernel-pinned paragraph (read)) |
| MODEL-112 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §6.1 unchanged by r1 at this fact (diff) — r0: §2.2 rule 6 — present) |
| MODEL-113 | reference | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §2.2, §7.3 unchanged by r1 at this fact (diff) — r0: §7.3 item 2 tr… |
| MODEL-114 | reference | OK | re-checked | §3.3 kept content and clear-region rule 1 unchanged (H4 dropped only the same-level-split bullet's tag); §7.3 (2) unchanged |
| MODEL-115 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present) |
| MODEL-116 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §6.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present) |
| MODEL-117 | state | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5); §4.8 only at the castle acceptance's pointer (H7), not at this fact (word diff); r1: text at its place and at §2.2, §4.2, §4.8 unchanged by r1 at this fact (diff) — r0: §2.2 rul… |
| MODEL-118 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: unchanged; `composition` now also covered by §3.10's one-per-ordinal check (V-MODEL-11)) |
| MODEL-119 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: unchanged; `composition` now also covered by §3.10's one-per-ordinal check (V-MODEL-11)) |
| MODEL-120 | state | OK | re-checked | §2.2 rule 3 demotion (c) / rule 7 deck unchanged; the placement pointer §4.2 S1 (5) unchanged (H5 is S1 (2)); §7.3 (b) 9 unchanged; §3.3 changed only by H4's tag — MODEL-C11 as ruled |
| MODEL-121 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present) |
| MODEL-122 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (structural/partition bullet) — p…) |
| MODEL-123 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (structural/partition bullet) — p…) |
| MODEL-124 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3, Judgment index unchanged by r1 at this fact (diff) — r0… |
| MODEL-125 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 an… |
| MODEL-126 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: §3.3 rule 2 now adds "no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal c… |
| MODEL-127 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: §3.3 rules 2–3 read after r1: allocation, canonical op order, strip by the promoting batch |
| MODEL-128 | state | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §2.2, §7.3, Judgment index unchanged by r1 at this fact (diff) — r0… |
| MODEL-129 | reference | OK | re-checked | §4.4 S5a (generated and edited gate ends) unchanged (H6 is S5d's test); §3.3 rule 3 unchanged (H4 elsewhere) |
| MODEL-130 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6, §5.3 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present) |
| MODEL-131 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present) |
| MODEL-132 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present) |
| MODEL-133 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.10, §3.3 unchanged by r1 at this fact (diff) — r0: still s… |
| MODEL-134 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 Size — present) |
| MODEL-135 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 Size — pr… |
| MODEL-136 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: §3.3 pool step 1 figures unchanged (60 000–90 000 items, ≤ ≈ 15 MB, ≈ 20 MB, ≈ 0.5 MB home c… |
| MODEL-137 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 Size — present) |
| MODEL-138 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 Size (receipts) — present) |
| MODEL-139 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K1: i…) |
| MODEL-140 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K3 (s…) |
| MODEL-141 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K9 (s…) |
| MODEL-142 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K10 (…) |
| MODEL-143 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K11 (…) |
| MODEL-144 | rationale out | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.… |
| MODEL-145 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K23 (…) |
| MODEL-146 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K28 (…) |
| MODEL-147 | rationale out | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.… |
| MODEL-148 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K31 (…) |
| MODEL-149 | rationale out | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.… |
| MODEL-150 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §3.2 unchanged by r1 at this fact (diff) — r0: §2.3 Terrain — present) |
| MODEL-151 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 Terrain — present)) |
| MODEL-152 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 HydroGrid — present)) |
| MODEL-153 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §12.4, Judgment index unchanged by r1 at this fact (diff) — r0: §2.3 HydroGrid + hydrology g…) |
| MODEL-154 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 TerrainSampler — present)) |
| MODEL-155 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.3 WaterBody — present) |
| MODEL-156 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 WaterBody comment — present)) |
| MODEL-157 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §3.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.3 prose — present) |
| MODEL-158 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.3 prose — present) |
| MODEL-159 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K12 (…) |
| MODEL-160 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 hydrology grid — present)) |
| MODEL-161 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §12.4, Judgment index unchanged by r1 at this fact (diff) — r0: §2.3 hydrology grid — present) |
| MODEL-162 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.3 hydrology grid — present) |
| MODEL-163 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §13.1 D8 clause unchanged (same sentence as H107)) |
| MODEL-164 | move out | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: moved in: §4.2 S1 (3… |
| MODEL-165 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §12.4 unchanged by r1 at this fact (diff) — r0: §12.4 M0 site-and-fields fallback 25→32 / 32…) |
| MODEL-166 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K7 (s…) |
| MODEL-167 | move out | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: moved in: §4.2 S1 (1… |
| MODEL-168 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 Heights — present)) |
| MODEL-169 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-02 fixed** (H107): §13.1 "a 3 000 m relief fixture with a hill-acropolis site stores without a clamp") |
| MODEL-170 | reference | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: §4.2 S1 (3): bucket-… |
| MODEL-171 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 Flats — present)) |
| MODEL-172 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 Flats — present)) |
| MODEL-173 | state | OK | re-checked | §2.3 unchanged; of its list "(§4.2 S1 (2), §8, §11)", §4.2 S1 (2) keeps the coast construction, "not model geometry" and the never-crosses-the-shore consequence and forwards the clip to §8.2 (H5); §8.2 states the extraction per render tile and the clip (l. 5719–5722), so the list still resolves through §8 — O-R2-1 |
| MODEL-174 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.3 — present)) |
| MODEL-175 | state | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: §2.3 — present |
| MODEL-176 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.3 Water attributes — present) |
| MODEL-177 | reference | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §7.3 unchanged by r1 at this fact (diff) — r0: §7.3 (b) 1: moveCour… |
| MODEL-178 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.4 types — present)) |
| MODEL-179 | state | OK | re-checked | §4.4 inter-stage trim unchanged (H6 is S5d's test) |
| MODEL-180 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.4 Junction — present)) |
| MODEL-181 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (merged with MODEL-122; §2.4 pros…) |
| MODEL-182 | state | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §2.2, §4.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (`… |
| MODEL-183 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.4 prose (points to §2.2 rule 5 and its exc…) |
| MODEL-184 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.4 prose — present)) |
| MODEL-185 | section restatement | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §6.1, §2.5 unchanged by r1 at this fact (diff) — r0: section restat… |
| MODEL-186 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.5 unchanged; §4.5 now restates "a district's `faces` is a `FaceRef` (§2.5): its L1 faces and every face nested in …) |
| MODEL-187 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 District — present) |
| MODEL-188 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §9.1 QuarterNode.cityCut with min(N_q, …) |
| MODEL-189 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 SubDistrict — present) |
| MODEL-190 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §2.2 unchanged by r1 at this fact (diff) — r0: §2.5 Reservation — present) |
| MODEL-191 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.9 unchanged by r1 at this fact (diff) — r0: §2.5 Allocation — present) |
| MODEL-192 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §2.5 FieldBands — present) |
| MODEL-193 | state | OK | re-checked | r2 changed §4.8 only at the castle acceptance's pointer (H7), not at this fact (word diff); r1: text at its place and at §2.5, §4.8 unchanged by r1 at this fact (diff) — r0: §2.5 Block — p… |
| MODEL-194 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 Frontage — present) |
| MODEL-195 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 Plot — present) |
| MODEL-196 | reference | OK | re-checked | §5.2 F-PLOT row unchanged; H9's F-SKELETON row now sends the `regions` reader (S10) to F-PLOT's ladder, as §3.8's reader list does (l. 2373–2374) |
| MODEL-197 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §2.2 unchanged by r1 at this fact (diff) — r0: §2.5 PlotBound — present) |
| MODEL-198 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.11, §4.5 unchanged by r1 at this fact (diff) — r0: §2.5 comment — present) |
| MODEL-199 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 SitePlan — present) |
| MODEL-200 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 BuildingSlot — present) |
| MODEL-201 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 SlotPlan — pres… |
| MODEL-202 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: obbW/obbD and dist.* typed `M`, aspect `Cdeg`…) |
| MODEL-203 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 prose — present) |
| MODEL-204 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 prose — present) |
| MODEL-205 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §4.7 S11 keyed class × prosperityBand ×…) |
| MODEL-206 | rationale out (new id) | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: new row…) |
| MODEL-207 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-P1 (s…) |
| MODEL-208 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §9.4 Quarters: MFCG label count, distri…) |
| MODEL-209 | state | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §2.5, §4.2, §4.5 unchanged by r1 at this fact (diff) — r0: §2.5 "Wh… |
| MODEL-210 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.5, §6.1 unchanged by r1 at this fact (diff) — r0: §2.5 — Allocations (stream keys →…) |
| MODEL-211 | section restatement | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §6.1 unchanged by r1 at this fact (diff) — r0: section restatement; §6.1 lists alloc.d…) |
| MODEL-212 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: II.1 Seam record and "Seam records" rule (read)) |
| MODEL-213 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §4.5 Bands: setAttr re-derivation, hyst…) |
| MODEL-214 | state | OK | re-checked | §2.5 τ sentence unchanged; §7.2 unchanged; §7.3 (a) 3 unchanged (H10 is item 7 (ii)); r1 O4 stands |
| MODEL-215 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 — PlotBound bullet — present) |
| MODEL-216 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §4.7 S10 (8) vacancy runs (read)) |
| MODEL-217 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Heights — present) |
| MODEL-218 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing — present) |
| MODEL-219 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing comment — present) |
| MODEL-220 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing.corners — present) |
| MODEL-221 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing.ridgeAxis — present) |
| MODEL-222 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §6.1, §8.2 unchanged by r1 at this fact (diff) — r0: §2.6 Building … |
| MODEL-223 | state | OK | re-checked | `RoofSpec` 'plain' comment ("the F-SKELETON downgrade: no ridge or hip lines, §3.8") byte-identical; H9 kept F-SKELETON's roofs clause word for word |
| MODEL-224 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.6 MaterialRow — p… |
| MODEL-225 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 OpeningRow — present) |
| MODEL-226 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 SubLocation — present) |
| MODEL-227 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: NP5-4: ComposedTower[], Room defined) |
| MODEL-228 | state | OK | re-checked | §2.6 `Wing` (relative `Porch`) and `ComposedTower` byte-identical (NP5-4); MODEL-C03 as ruled |
| MODEL-229 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.6 BuildingInput —… |
| MODEL-230 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 BuildingGenerator — present) |
| MODEL-231 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 ClassRules — present) |
| MODEL-232 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §3.6, §6.5, §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 cod… |
| MODEL-233 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 carryWings — present) |
| MODEL-234 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 base outline builder — present) |
| MODEL-235 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 base outline builder 1 — present) |
| MODEL-236 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 base outline builder 2 — present) |
| MODEL-237 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at Judgment index unchanged by r1 at this fact (diff) — r0: §2.6 wings… |
| MODEL-238 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §8.2 unchanged by r1 at this fact (diff) — r0: §2.6 wings paragraph… |
| MODEL-239 | rationale out | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.… |
| MODEL-240 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Row footprints are quads — present) |
| MODEL-241 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Row footprints — present) |
| MODEL-242 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Row footprints — present) |
| MODEL-243 | reference | OK | re-checked | §2.6 Row footprints byte-identical; the plain-roof downgrade it cites is still F-SKELETON's roofs clause (H9 changed only the where column and the spine readers); §3.8's near-rectangle test unchanged (MODEL-C02 as ruled) |
| MODEL-244 | reference | OK | re-checked | §2.6 Row footprints byte-identical; §13.2's curved-street row fixtures (l. 7696) lie outside H16 |
| MODEL-245 | rationale out | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.… |
| MODEL-246 | rationale out | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.… |
| MODEL-247 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3); §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.2, §3.3, §4.9, §7.4, Judgment index unchanged by r1 at this fact… |
| MODEL-248 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3); §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at Judgment index, §3.3 unchanged by r1 at this fact (diff) — r0: §2.6… |
| MODEL-249 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3); §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §7.3 unchanged by r1 at this fact (diff) — r0: §2.6 wing-carrying r… |
| MODEL-250 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §3.10, §3.4 unchanged by r1 at this fact (diff) — r0: §2.6 wing rul… |
| MODEL-251 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §6.5 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 2 — p… |
| MODEL-252 | state | OK | re-checked | §2.6 wing rule 3 byte-identical; it still cites §3.8's convex near-rectangle test (unchanged) — MODEL-C02 as ruled |
| MODEL-253 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at Judgment index, §3.7 unchanged by r1 at this fact (diff) — r0: §2.6… |
| MODEL-254 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §3.6, §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule… |
| MODEL-255 | state | OK | re-checked | **V-MODEL-R1-02 fixed** (H3): "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)"; §12.4's S11 row (l. 7229) reads "compound ≤ 40 µs (25 + 15)" after "its geometry share ≤ 3 µs … plus rule evaluation ≤ 2 µs" (the archive's §3.7 l. 3129–3133 split 40 into 25 geometry + 15 rule evaluation), and §3.7 M0 (ii) measures the share "against its §12.4 row"; every other figure unchanged; no "25 µs, §3.7" left anywhere (grep) |
| MODEL-256 | reference | OK | re-checked | §12.6 warp-preview bullet (Apply budget, fallback, M3a measurement, "§2.6 rule 4") unchanged; H12 is the replay bullet |
| MODEL-257 | history out | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: history out; receipt pointer kept; 75 884 in J-P49 rati… |
| MODEL-258 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 5 — p… |
| MODEL-259 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at Judgment index unchanged by r1 at this fact (diff) — r0: §2.6 "A st… |
| MODEL-260 | state | OK | re-checked | **O1 closed** (H10 = VDR1-1): §7.3 item 7 (ii) now checks "each face and wing ring §2.6's composition rule (1) adds to its scope", matching rule (1)'s faces "together with a row neighbour's wing rings" (l. 985–988); the §3.3 same-level-split rule it cites lost only its tag (H4) |
| MODEL-261 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 stored composit… |
| MODEL-262 | state | OK | re-checked | failure paragraph byte-identical; its list "§7.3 (a) 4 and items 1 and 7 (ii)" still lands — item 7 (ii) keeps "a stored composition's rings included, §2.6" and after H10 also names the wing rings of rule (1) |
| MODEL-263 | state | OK | re-checked | last sentence byte-identical; every place it lists (§2.2 rule 5, §4.6 step 7, §5.3, §7.3 (a) 4 and items 1 and 7 (ii), §7.4, II.1 (3), II.4) still names wing rings; item 7 (ii) after H10 names them in both clauses |
| MODEL-264 | reference | OK | re-checked | §2.6 "Test" paragraph byte-identical; §13.2's "§2.6's test" (l. 7726–7734) lies before H16 and is unchanged |
| MODEL-265 | reference | OK | re-checked | §2.6 "Test" paragraph byte-identical; §13.2's generation-equals-regeneration fixture (l. 7722–7725) lies before H16; §7.3 item 7 (vi) unchanged (H10 is (ii)) |
| MODEL-266 | history out | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: history out; receipt pointer kept) |
| MODEL-267 | rationale out | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.… |
| MODEL-268 | rationale out | OK | re-checked | J-P49 index row and rationale row unchanged (no hunk in the index; the rationale file untouched since 16:23); "(J-P49)" at §2.6 rule 4 unchanged |
| MODEL-269 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Heights and the ground datum — present) |
| MODEL-270 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3); §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §7.3, §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 Heights a… |
| MODEL-271 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Heights and ground datum — present) |
| MODEL-272 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.6 Heights and gro… |
| MODEL-273 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: text at its place and at §8.1 unchanged by r1 at this fact (diff) — r0: §2.6 Heights and gro… |
| MODEL-274 | move out | OK | re-checked | §2.6 "The heights acceptance bar is §13.2's" unchanged; §13.2's heights bar (l. 7689) lies outside H16; §7.3 (a) unchanged (H10 is item 7 (ii)) |
| MODEL-275 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Materials — present) |
| MODEL-276 | state | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: r0 verdict kept (verify-model-r0 §9: §2.6 Descriptions — present) |
| MODEL-277 | state | OK | re-checked | §2.6 stage-3 hook byte-identical; the four budgets it sends to §12.7 are all there (l. 7418–7422): `outline()` inside S11's geometry share, admission ≤ 10 µs, the re-declaration of S11's §12.4 row, `compose()` ≤ 1 ms and 16 ms of pool time |
| MODEL-278 | reference | OK | re-checked | **O6 closed** (H14 = VR-R1-6): §12.7 now "(≤ 3 µs per plot median, §12.4's S11 row; the kernel's M0 bar, §3.7)"; §12.4's S11 row states "its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7)" |
| MODEL-279 | reference | OK | re-checked | §12.7 still states `compose()` ≤ 1 ms per building median at `wings` and one tile's compositions within 16 ms of pool time, amortised (H14 re-wrapped the bullet; those words unchanged) |
| MODEL-280 | reference | OK | re-checked | the stage-3 contract stated once in §2.6 (byte-identical); §13.2's stage property test (l. 7686) lies outside H16 |
| MODEL-281 | state | OK | re-checked | §2.6 intake bullet byte-identical; "§12.7's 10 µs median" = §12.7's "admitted at ≤ 10 µs per building median" (unchanged by H14) |
| MODEL-282 | reference | OK | re-checked | §2.6 intake bullet byte-identical; §13.2's "the stage-3 intake runs the same test with every fixture building's composition stored" (l. 7733–7734) lies just before H16 and is unchanged |
| MODEL-283 | state | OK | re-checked | §4.4 S5a traces, waterfronts and ribbon-plot text unchanged (H6 is S5d's test); §4.8 strips unchanged (H7 is the castle acceptance) |
| MODEL-284 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.7 Gate — present) |
| MODEL-285 | state | OK | re-checked | §2.7 `Tower` comment "a composition's tower is §2.6's ComposedTower" lands on §2.6 l. 842 (byte-identical; H3 is l. 963); MODEL-C03 as ruled |
| MODEL-286 | state | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: MODEL-C04 comment ap… |
| MODEL-287 | state | OK | re-checked | r2 changed §4.8 only at the castle acceptance's pointer (H7), not at this fact (word diff); r1: text at its place and at §2.2, §4.8 unchanged by r1 at this fact (diff) — r0: §2.7 Bridge — … |
| MODEL-288 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §4.9 trees row now lays avenues, street trees and hedgerows as jittered lines (H58), agreeing with `Greenery.along` a…) |
| MODEL-289 | reference | OK | re-checked | §8.10 still stamps instances from the entity's `render.instances` stream (§6.1) and never writes them to the document except as overrides; H11 replaced only the stamp-tile key's restated components with a pointer to §6.1's entry, which keeps them (l. 4176–4179) |
| MODEL-290 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §4.9 unchanged by r1 at this fact (diff) — r0: §2.7 LandUse — present) |
| MODEL-291 | state | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: §2.7 SiteResources —… |
| MODEL-292 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §4.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.7 Decoration — present) |
| MODEL-293 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §4.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.7 Pin — present) |
| MODEL-294 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §9.1 LabelEntity / QuarterNode (read)) |
| MODEL-295 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 Institution — present)) |
| MODEL-296 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 Household — present)) |
| MODEL-297 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 Person — present)) |
| MODEL-298 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 Faction — present)) |
| MODEL-299 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 Government — present)) |
| MODEL-300 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 Religion — present)) |
| MODEL-301 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §10.1 base schema from M1; §10.3 module persists with lifecycle and reference in…) |
| MODEL-302 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 relation store records — present)) |
| MODEL-303 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 SkyIsland (+ "The staged layers" paragraph for field meanings) — present)) |
| MODEL-304 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 Tunnel (+ "The staged layers" paragraph) — present)) |
| MODEL-305 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §10.3 derivePerson, pinning an explicit edit, diffed re-derive (read))) |
| MODEL-306 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: MODEL-C06 applied) |
| MODEL-307 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.7 people paragraph — present)) |
| MODEL-308 | reference | OK | re-checked | §4.4 S5a traces, waterfronts and ribbon-plot text unchanged (H6 is S5d's test); §4.8 strips unchanged (H7 is the castle acceptance) |
| MODEL-309 | state | OK | re-checked | §4.4 S5a traces, waterfronts and ribbon-plot text unchanged (H6 is S5d's test); §4.8 strips unchanged (H7 is the castle acceptance) |
| MODEL-310 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4); §4.8 only at the castle acceptance's pointer (H7), not at this fact (word diff); r1: §4.8 wall-strip and castle paragraphs unchanged (H57 is the bridges sentence) |
| MODEL-311 | reference | OK | re-checked | §4.8 castle paragraph unchanged but for H7 (the acceptance's trailing "§5.2" dropped); the castle facts (reservation, curtain, gatehouse, keep, surround row) unchanged; MODEL-C04 as ruled |
| MODEL-312 | reference | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5); §4.8 only at the castle acceptance's pointer (H7), not at this fact (word diff); r1: §4.8 now points S3's decks to §4.2 S3 (2), (10) (H57), which state them (canal decks at `can… |
| MODEL-313 | reference | OK | re-checked | §4.2 S1 (5) unchanged (H5 is S1 (2)); §4.4 S5a unchanged (H6); §3.3 rule 3 unchanged (H4); §7.3 (b) rows unchanged (H10) — MODEL-C11 as ruled |
| MODEL-314 | reference | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: §4.2 S1 (5) unchanged; §7.1 and §7.4's drawn-bridge rows now defer the whole placement to it… |
| MODEL-315 | reference | OK | re-checked | §4.2 S1 (5) unchanged (H5 is S1 (2)); §4.4 S5a unchanged (H6); §3.3 rule 3 unchanged (H4); §7.3 (b) rows unchanged (H10) — MODEL-C11 as ruled |
| MODEL-316 | reference | OK | re-checked | r2 changed §4.2 only at S1 (2)'s contour clause (H5), not at this fact (word diff); r1: §4.2 S1 (5) unchanged; §7.1 and §7.4's drawn-bridge rows now defer the whole placement to it… |
| MODEL-317 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §4.9 unchanged by r1 at this fact (diff) — r0: §2.7 "What the content records settle" — pres…) |
| MODEL-318 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: II.6 rules; field meanings kept (D5); "after …) |
| MODEL-319 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.8 intro "every in-window load" — §6.2 now says the same (H69, H70)) |
| MODEL-320 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 intro — present)) |
| MODEL-321 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: MODEL-C09: §6.2 now "every in-window load (§2.9 step 3)" twice (H69, H70), so both statements agree word for word) |
| MODEL-322 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-12 fixed** (H59): §4.11 `build` now `footprint?: PolygonCm /* as §7.1's build event */`, matching §7.1 (rea…) |
| MODEL-323 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.1, §2.2, §6.1 unchanged by r1 at this fact (diff) — r0: §2.8 Identity — present) |
| MODEL-324 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 Existence — present)) |
| MODEL-325 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §7.2 unchanged by r1 at this fact (diff) — r0: §2.8 LifecycleFlags — present) |
| MODEL-326 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 Lifecycle — present)) |
| MODEL-327 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 LifecycleEvent — present)) |
| MODEL-328 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 Tombstone — present)) |
| MODEL-329 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.8 `DerivationRecord.fields` holds the samples §7.2 now compares against ("the samples their `DerivationRecord` hol…) |
| MODEL-330 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.8 NamingRecord — present) |
| MODEL-331 | state | OK | re-checked | §2.8 `Provenance` unchanged; "attempt … (§5.1)" and "the locality audit, §7.3" still land (H8 and H10 are elsewhere in those subsections) |
| MODEL-332 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.8 SliceRef — present) |
| MODEL-333 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 One existence state — present)) |
| MODEL-334 | reference | OK | re-checked | r2 changed §2.6 only at l. 963 (H3), not at this fact (word diff); r1: §4.11 `ConversionOp` still holds abandon, decay, ruin, robStone, clear, rebuild, plotToGarde… |
| MODEL-335 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §2.8 History — present) |
| MODEL-336 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §6.5, §7.4 unchanged by r1 at this fact (diff) — r0: §2.8 History — present) |
| MODEL-337 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §6.2 unchanged by r1 at this fact (diff) — r0: §2.8 History — present) |
| MODEL-338 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 History — present)) |
| MODEL-339 | move out | OK | re-checked | H16 re-wrapped the B-EDIT bullet that holds the 20-epoch test; its words are unchanged (word diff: ≈ 30 % churn, heap ≤ 1.3 ×, document ≤ 2 ×, M4) |
| MODEL-340 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 History — present)) |
| MODEL-341 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-3…) |
| MODEL-342 | state | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §2.5, §7.3 unchanged by r1 at this fact (diff) — r0: VD5-5 preferre… |
| MODEL-343 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §6.5 (9) now adds a lock + unlock pair whose freeing event re-draws the name by §6.3's case (4) (H73) — the rule §2.8…) |
| MODEL-344 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §6.5 (9) now adds a lock + unlock pair whose freeing event re-draws the name by §6.3's case (4) (H73) — the rule §2.8…) |
| MODEL-345 | reference | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: §6.5 (9) now adds a lock + unlock pair whose freeing event re-draws the name by §6.3's case … |
| MODEL-346 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-4…) |
| MODEL-347 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-4…) |
| MODEL-348 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 Provenance bullet — present)) |
| MODEL-349 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: r0 verdict kept (verify-model-r0 §9: §2.8 Provenance bullet — present)) |
| MODEL-350 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §6.2 unchanged by r1 at this fact (diff) — r0: §6.4 "a release that changes no output keeps …) |
| MODEL-351 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §6.2's excluded-provenance clause unchanged; H69 adds only "in-window") |
| MODEL-352 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.8 Rules cite slices — present) |
| MODEL-353 | state | OK | re-checked | §2.8 registry unchanged; §0.2 row 5 unchanged (H1 is row 4); §13.2 Document tests (l. 7672) lie outside H16 |
| MODEL-354 | move out | OK | re-checked | §13.2 Document tests (l. 7672) lie outside H16 and are unchanged |
| MODEL-355 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: MODEL-C12 applied) |
| MODEL-356 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §6.5, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 Document — present) |
| MODEL-357 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 Document.packs — present) |
| MODEL-358 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §7.4 records: 64 events or 20 MB (read)) |
| MODEL-359 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.1 unchanged by r1 at this fact (diff) — r0: §2.9 Base — present) |
| MODEL-360 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Seed — present) |
| MODEL-361 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §6.1, §6.2, §7.1, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 Recipe — present) |
| MODEL-362 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 PackData / HostContent — present) |
| MODEL-363 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §6.2 unchanged by r1 at this fact (diff) — r0: MODEL-C09 applied) |
| MODEL-364 | state | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: text at its place and at §2.9, §3.3 unchanged by r1 at this fact (diff) — r0: §2.9 ChunkRef … |
| MODEL-365 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §11.3, §7.4 unchanged by r1 at this fact (diff) — r0: MODEL-C06 applied) |
| MODEL-366 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.1 unchanged by r1 at this fact (diff) — r0: §2.9 EpochRecord — present) |
| MODEL-367 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 RebaseReason — present) |
| MODEL-368 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 UndoRecord — present) |
| MODEL-369 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.1, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 One source of truth — present) |
| MODEL-370 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-06 fixed** (H81): §7.7 One path "A blueprint's assignments and edits become `assign` and edit events at log…) |
| MODEL-371 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §5.4 unchanged by r1 at this fact (diff) — r0: §5.4 timings telemetry (read); caches i…) |
| MODEL-372 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 One source of truth — present) |
| MODEL-373 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present) |
| MODEL-374 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present) |
| MODEL-375 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §7.5 (2) packs-stop-shipping bullet (read)) |
| MODEL-376 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present) |
| MODEL-377 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present) |
| MODEL-378 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present) |
| MODEL-379 | state | OK | re-checked | r2 changed §5.2 only at the F-SKELETON row (H9), not at this fact (word diff); r1: text at its place and at §2.9, §11.2, §11.3, §5.2 unchanged by r1 at this fact (diff) — r0: … |
| MODEL-380 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-3…) |
| MODEL-381 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 1 — present) |
| MODEL-382 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 2 — present) |
| MODEL-383 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 2 — present) |
| MODEL-384 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.1, §7.4, §6.2 unchanged by r1 at this fact (diff) — r0: VD5-3 companion pointer; §7…) |
| MODEL-385 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-4…) |
| MODEL-386 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 2 — present) |
| MODEL-387 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §6.2, §3.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Decode and chec…) |
| MODEL-388 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §6.2 bars unchanged (≈ 31–34 / 95–101 ms; records ≈ 4 / 11 ms); H70 adds "in-window") |
| MODEL-389 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Corrupt cache" — present) |
| MODEL-390 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: D2: kept; §7.5 (2) re-rooting cites §2.9 step…) |
| MODEL-391 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "A rebased base" — present) |
| MODEL-392 | state | OK | re-checked | §2.9 "at §12.6's edit cost" unchanged; §12.6's edit-cost bullets unchanged (H12 is the replay bullet) |
| MODEL-393 | state | OK | re-checked | §2.9 "only the view stages S14 and S13b suppressed (§7.3)" agrees with §7.3 item 2 ("Only the view stages wait: S14 and S13b run once at the end"); §12.6 now points there (H12; its wording is V-MODEL-R2-01); §12.8's replay-model sentence unchanged (H15 elsewhere); §3.3 pool steps 1 and 5 unchanged |
| MODEL-394 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Edits held for proven…) |
| MODEL-395 | state | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: text at its place and at §2.9, §7.3 unchanged by r1 at this fact (diff) — r0: §7.3 item 6 (r… |
| MODEL-396 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §6.2 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Verified" — present) |
| MODEL-397 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §6.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Recor…) |
| MODEL-398 | rationale out (new id) | OK | kept | r1 verdict kept (verify-model-r1 §8: J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: new row…) |
| MODEL-399 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: **V-MODEL-05 fixed** (H71): §6.2 (iii) "shown disabled (“checking the saved copy…”)"; "A mismatch withdraws the keep …) |
| MODEL-400 | state | OK | re-checked | §2.9 budget byte-identical; T(B) is §12.5's (not replaced); the §12.6 bullets it relies on unchanged (H12 is the replay bullet) |
| MODEL-401 | state | OK | re-checked | "within its §12.6 cost + 10 ms" — §12.6's edit-cost bullets unchanged (H12 is the replay bullet) |
| MODEL-402 | state | OK | re-checked | fallbacks byte-identical; §3.3's canonical-key sort unchanged (H4 elsewhere); §12.6's bullets unchanged |
| MODEL-403 | reference | OK | re-checked | **V-MODEL-R1-01 fixed** (H16, detail (c)): the forced-§6.2 (iii) case now ends "wait for the recomputation, the mismatch withdraws the keep, and the snapshot is never kept" (archive l. 1994–1995); the other criteria kept; §2.9 step 3's closing pointer (l. 1434–1435) lands |
| MODEL-404 | state | OK | re-checked | r2 changed §7.3 only at item 7 (ii) (H10), not at this fact (word diff); r1: §2.9 step 4 byte-identical outside the bridge sentence (H5) |
| MODEL-405 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.9 step 4 byte-identical outside the bridge sentence (H5)) |
| MODEL-406 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.9 step 4 byte-identical outside the bridge sentence (H5)) |
| MODEL-407 | reference | OK | re-checked | §2.9 step 4 and §11.3's policy unchanged; §12.8's "keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled (§11.3)" unchanged (H15 is the export paragraph); O3 of r1 stands |
| MODEL-408 | reference | OK | re-checked | **V-MODEL-R1-01 fixed** (H16, details (a) and (b)): "an edit within 100 ms of the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match" (archive l. 2026–2028); §11.3's convergence test with two editors (l. 6991) unchanged |
| MODEL-409 | rationale out | OK | re-checked | J-DET-38 / J-DET-42 rows unchanged; the figures it cites (≈ 1.4 s reference mix, ≈ 11 s for 300 district regenerations) still stand in §12.6's replay bullet, whose first sentence lost its verb in H12 — V-MODEL-R2-01 (rendering), meaning intact |
| MODEL-410 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §16, §2.9, Judgment index unchanged by r1 at this fact (diff) — r0: VS5-1 applied; §16 M1 ag…) |
| MODEL-411 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.9 "What the snapshot holds" byte-identical; §3.9 load paragraph unchanged) |
| MODEL-412 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.9 "What the snapshot holds" byte-identical; §3.9 load paragraph unchanged) |
| MODEL-413 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §2.9 "What the snapshot holds" byte-identical; §3.9 load paragraph unchanged) |
| MODEL-414 | reference | OK | re-checked | r2 changed §5.1 only at the tier-4 example (H8), not at this fact (word diff); r1: text at its place and at §2.9, §5.4 unchanged by r1 at this fact (diff) — r0: §5.4 (read) |
| MODEL-415 | reference | OK | re-checked | r2 changed §3.3 only by a dropped tag (H4), not at this fact (word diff); r1: §3.9 chunk text unchanged except tags (H50–H52) |
| MODEL-416 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §3.9 chunk text unchanged except tags (H50–H52)) |
| MODEL-417 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §3.9 chunk text unchanged except tags (H50–H52)) |
| MODEL-418 | rationale out | OK | kept | r1 verdict kept (verify-model-r1 §8: index row J-DET-36 amended by the scope lane (H113: "keyed by their route edge's endpoints", §3.9's rule); rationale …) |
| MODEL-419 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget — present) |
| MODEL-420 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §16, §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget (measurement) — present) |
| MODEL-421 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget (fallback 1) — present) |
| MODEL-422 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget (fallback 2) — present) |
| MODEL-423 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Formats — present) |
| MODEL-424 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §11.1 compact twin row: CBOR typed-array tags…) |
| MODEL-425 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Canonical form and digests — present) |
| MODEL-426 | section restatement | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §6.2 unchanged by r1 at this fact (diff) — r0: section restatement; §6.2 says which ch…) |
| MODEL-427 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §11.3 `logHead` unchanged) |
| MODEL-428 | state | OK | kept | r1 verdict kept (verify-model-r1 §8: §11.3 Roles bullet (a bridged client takes its session from `doc.load`) unchanged) |
| MODEL-429 | reference | OK | kept | r1 verdict kept (verify-model-r1 §8: §11.3 Roles bullet (a bridged client takes its session from `doc.load`) unchanged) |
| MODEL-430 | move out | OK | re-checked | §13.2 Document tests (l. 7672) lie outside H16 and are unchanged |
| MODEL-431 | section restatement | OK | kept | r1 verdict kept (verify-model-r1 §8: text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: section restatement) |
