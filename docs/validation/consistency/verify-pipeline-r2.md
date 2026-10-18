# Verify — pipeline part, consistency pass round 2 (§4, §10, PART II, PART III)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-pipeline-r2`, 2026-09-26. Status: COMPLETE. Re-verifies the pipeline part of
`docs/ARCHITECTURE.md` after repair round 2 — `## §4 Generation pipeline` (l. 2504–3915), `## §10 Simulation and content
layer` (l. 6618–6789), `# PART II` with `## II.1`–`## II.6` and `# PART III` (l. 8901–9169) — against the archive
`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`, `inventory-pipeline.json` (449 items + 10 internal conflicts),
`canon.json`, `rewrite-pipeline.md`'s mapping table, the six `repair-r2-*.md` files, `assemble-r2.md` and this lane's
earlier report `verify-pipeline-r1.md`.

## 1. Outcome

Round 2 fixed all three round-1 findings of this part and changed nothing else in it. One small new problem came with
the P1-2 fix: a qualifier of the moved test is now stated nowhere. It is **minor** and is scope's to fix at §13.2.

* **The three round-1 issues — all FIXED** at their places (§5): P1-1 (= VR-R1-4), P1-2 (= VDR1-2) and P1-3. No other
  repair-r2 file claims a fix in this part. Every pipeline-owned finding across the six r1 verify files was one of these
  three (the scope file has none).
* **Open items owned by this part — still FIXED:** NP5-1, NP5-2, NP5-3, NP5-4 and VD5-6 (§6). Round 2 touched only NP5-1's
  companion, §7.3 item 7 (ii), and that change now matches §2.6 rule (1). **UNFIXED: none.**
* **Round 2's footprint in this part is exactly three hunks** (6 lines out, 5 in, 201 423 → 201 284 bytes), one per
  finding. §10, PART II and PART III are byte-identical to round 1 (§2).
* **New issue (1, minor, owner scope):**
  * **P2-1** — the walled-share qualifier "inside its rung band" is lost. P1-2's fix made §4.4 S5d point to §13.2's
    B-CITY `wealthLevel` sweep, whose text says only "walled share in band". B-CITY runs three rungs, and everywhere else
    the document's "walled share … band" means MFCG's single band (§13.5, O8 (e), §16 M1). The rung qualifier is
    therefore load-bearing, and R13 puts it at the home. The repair lane offered this as its vetoable call (1), and
    assemble-r2 §6 declined it as optional; this report rules on it.
* **Scans of the part:**
  * no "PENDING FABLE REVIEW" line, no fix-round tag, no round narration and no deferral wording ("later", "open" and
    "pending" occur on the same lines as in round 1);
  * the resolver finds 0 broken references (the same 2 external pointers as before, neither in this part);
  * `doc_checks` on the part exits 0, with every hit reviewed; C3 goes from 142 to 141 hits;
  * every heading, list marker, table-row key and bold bullet label in the whole document is unchanged, 1 632 against 1 632.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution:
* the r0 → r1 → r2 rebuild, whose three sha256 values match `assemble-r1.md` and `assemble-r2.md`, with the landed file
  identical (`cmp`);
* the whole-document and part diffs;
* the resolver, `doc_checks` and the anchor comparison;
* each issue's evidence (quoted lines).

PLAUSIBLE (reading only): that none of the 13 hunks outside this part changes the meaning of a fact this part points to
(§8). Every hunk was read once, and there was no second reader.

## 2. What round 2 changed in this part (receipts)

* **Before and after.** `assemble-r0.py`, then `assemble-r1.py`, then `assemble-r2.py` were run into this lane's scratch
  directory. The results hash to r0 `ee314f23…afed175`, r1 `ddd48f07…ebb1` (assemble-r2's "before") and r2
  `d9d509fa…7a5d`. The r2 result is byte-identical to the landed `docs/ARCHITECTURE.md`. The whole-document diff has
  16 hunks, 64 lines out and 62 in, as assemble-r2 reports.
* **This part:** 1 854 → 1 853 lines and 201 423 → 201 284 bytes (−139, assemble-r2's §4 row). `diff` shows exactly three
  hunks, all from `repair-r2-pipeline.md`:

  | hunk (new lines) | subsection | finding | change |
  |---|---|---|---|
  | l. 2677–2679 | §4.2 S1 (2) Contours and coast | P1-1 = VR-R1-4 | "they are extracted per render tile and **clipped to the land faces in vector space before emission** (§8.2), so …" → "their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2), so …"; the coast construction, "cliffs and sub-cell spits included" and the golden-suite fixtures kept |
  | l. 3124 | §4.4 S5d | P1-2 = VDR1-2 | "B-CITY sweeps `wealthLevel` ∈ {0, 0.5, 1} and asserts population ± 5 % (on ≥ 95 % of seeds, §5.2) and the walled share inside its rung band." → "**Test:** §13.2's B-CITY `wealthLevel` sweep." |
  | l. 3590 | §4.8 castle acceptance | P1-3 | "… 178 equalise passes and 11 bloats, §5.2)" → "… 178 equalise passes and 11 bloats)" |

* **Numbers.** Every number the old hunks held is kept, and each now lives either in its hunk or at the target the hunk
  points to. In §4.4, {0, 0.5, 1}, ± 5 % and ≥ 95 % are stated at §13.2 (l. 7687–7688). Per render tile and the
  vector-space clip are stated at §8.2 (l. 5719–5722). Only the words "its rung" appear nowhere else (P2-1). The rest of
  §4.2, §4.4 and §4.8 is byte-identical to round 1.

## 3. Method

1. **Scope of the re-check.** 181 of the 459 records were re-checked:
   * every id whose home lies in a subsection this part's repair replaced (§4.2, §4.4, §4.8), J-id and receipt pointers
     left there included;
   * every id whose reference target, or the source it cites, lies in a subsection another r2 repair replaced (§0.2,
     §1.2, §2.6, §3.3, §5.1, §5.2, §7.3, §8.10, §12.6, §12.7, §12.8, §13.2), or which points into §4.2 from elsewhere;
   * the three round-1 issue ids and the ids tied to the open items;
   * the conflicts whose places round 2 replaced.

   The other 278 keep their round-1 verdict, which `verify-pipeline-r1.md` §10 records (and through it r0's side-by-side
   reading).
2. **Every hunk of the whole-document diff was read** and judged for its effect on this part's statements and pointers
   (§8). 82 lines of the part cite, by number, one of the 12 subsections other r2 blocks replaced. Each pointer was
   matched against that subsection's hunk. The only one that lands on a changed sentence is §4.11's "wall-crossing
   fixtures are §13.1's and §13.2's" (l. 3818–3819, PIPELINE-340), and that §13.2 case was only re-wrapped. Three
   links by name were checked the same way, and each agrees:
   * §4.7 S10 (4)'s "(F-SKELETON)" (PIPELINE-261) against the new F-SKELETON row;
   * the part's "locality oracle" mentions (§4.6 step 7, §4.11, §10.1 (3), II.4) against §7.3 item 7, whose (ii) change
     concerns stored compositions only;
   * §4.1's S11 row (NP5-1) against §7.3 item 7 (ii) and §2.6 rule (1).
3. **Targets re-read** for every new pointer: "§8.2's relief tier" (l. 5719–5722), "F-CONTOUR, §5.2" (l. 4009),
   "§13.2's B-CITY `wealthLevel` sweep" (l. 7687–7688), F-CASTLE's "§4.8's castle acceptance" (l. 4014) and
   F-SKELETON's "S1's coast simplicity clamp (§4.2 S1 (2))" (l. 4018 → l. 2667–2670).
4. **Anchors.** Headings, numbered-list markers, table-row keys and bold bullet labels were compared doc-wide between r1
   and r2 (1 632 = 1 632, identical), so every sub-anchor the part uses ("§4.2 S1 (5)", "§7.3 (b) 2", "§3.3 pool step
   3", …) names the same item.
5. **Scans** of the part in r1 and r2 give identical counts: 0 PENDING; `later` 26, `open` 17 and `pending` 1 (the
   design term "pending claims"); `R1`–`R8` are owner-rule ids; the one audit coverage id is `COV-NG-VS27`.
   The resolver (`assemble-r0-refs.py`) finds 0 broken references. `doc_checks.py --sections "4,10,PART II,II.1,…,II.6,
   PART III"` exits 0 on r1 and on r2, with C1 5/0, C2 0, C3 142 → 141 (0 unreviewed), C4 1/0 and S1, S2 0.
   Receipts are in the lane's scratch directory (`vp2/`).

## 4. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| P2-1 | minor | lost | scope | **The rung qualifier of the `wealthLevel` sweep is stated nowhere.** PIPELINE-187 (archive §4.4 S5d, l. 4111–4112): "B-CITY sweeps `wealthLevel` ∈ {0, 0.5, 1} and asserts population ± 5 % and the walled share **inside its rung band**". P1-2's fix reduced §4.4 S5d to "**Test:** §13.2's B-CITY `wealthLevel` sweep" (l. 3124), and F-BUDGET-STAGE points there too (l. 4012). §13.2 (l. 7687–7688) reads "(population ± 5 % on ≥ 95 % of seeds, walled share in band)", with no rung. The qualifier is load-bearing: B-CITY runs "× 3 rungs" (§13.2 l. 7649); the walled share is set per rung (§4.2 S2: ≈ 0.9 at TOWN, ≈ 0.88 at CITY and METROPOLIS); and the document's other "walled share … band" means MFCG's single 0.87–0.92 band (§13.5, O8 (e), §16 M1). In a sweep that moves the wealth bands, a bare "in band" can also be read as a wealth band. R13: a qualifier carried by a restatement is added to the home. The repair lane named this as its vetoable call (1), and assemble-r2 §6 declined it. | §13.2 "Stage property tests": "… (population ± 5 % on ≥ 95 % of seeds, walled share in band)" → "… (population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)". These are the archive's §4.4 words with a pointer to where the per-rung shares are stated. Nothing else changes: §4.4 S5d and F-BUDGET-STAGE keep their pointers. |

## 5. The three round-1 issues, re-checked

| r1 issue (also raised as) | fixed by | where, now (quoted) | verdict |
|---|---|---|---|
| P1-1 (VR-R1-4) | repair-r2-pipeline | §4.2 S1 (2) (l. 2677–2679): "contour lines are not model geometry: their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2), so a contour never crosses the shore, cliffs and sub-cell spits included (steep-coast and cliff fixtures in the golden suite)". §8.2 (l. 5719–5722) states that the marks are "extracted per render tile … by marching squares … and clipped to the land faces in vector space before emission". F-CONTOUR's row is at l. 4009. The coast construction (PIPELINE-065) is byte-identical. | FIXED — the clip is stated once, at the canon's home (RENDERING-084); PIPELINE-066 survives whole: per tile and the clip at §8.2, "not model geometry" and the fixtures here |
| P1-2 (VDR1-2) | repair-r2-pipeline | §4.4 S5d (l. 3124): "**Test:** §13.2's B-CITY `wealthLevel` sweep." This is F-BUDGET-STAGE's form (l. 4012). §13.2 (l. 7687–7688) states the sweep with "population ± 5 % on ≥ 95 % of seeds". The chain §4.4 → §5.2 → §13.2 is gone. | FIXED — the r1 required change's primary option (R9). It departs from the canon's per-fact home of PIPELINE-187 (§4.4 S5d) by R9, as r1 recorded. The lost rung qualifier is **P2-1** |
| P1-3 | repair-r2-pipeline | §4.8 (l. 3588–3590): "castle area and compactness inside the band on ≥ 99 % of seeds with a castle requested (0 ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats); every re-sited castle reported". F-CASTLE's test cell is "§4.8's castle acceptance; O8 (d)" (l. 4014), and its ladder still lists the equalise and bloat rungs. The Compactness sentence keeps "— never a restart (§5.2)". | FIXED — the r1 required change's first option |

## 6. Open items owned by this part

| item | places round 2 touched, re-checked | verdict |
|---|---|---|
| NP5-1 | §4.1's S11 row is unchanged (l. 2597: "L4: footprints and yard parts (a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows, §4.7)"). §2.6 rule (1) is unchanged, since round 2's §2.6 hunk is wing rule 4's cost pointer at l. 963. The companion check §7.3 item 7 (ii) now reads "each face **and wing ring** §2.6's composition rule (1) adds to its scope equal to its prior ring after removing the vertices that rule inserted" (l. 5052–5053; VDR1-1). That now matches rule (1)'s "together with a row neighbour's wing rings, which its carry changes the same way" (l. 985–988). §13.2's composition test is unchanged. | FIXED |
| NP5-2 | §4.2 S1 (5) and §4.4 S5b are byte-identical inside the replaced blocks. §4.1's S5 row ("k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch (§4.2 S1 (5))", l. 2589) and the L0-writer sentence are unchanged. F-ROUTE's "where" still names "S5b at stages k ≥ 2 and in every epoch" (l. 4011). J-I18's index row (l. 9630) is unchanged. | FIXED |
| NP5-3 | §10.4 (l. 6759–6761: "re-draws exactly the unedited names drawn from that field, listed for confirmation (§6.3 case (4)), and never the row's other names"), §7.6 and §7.4's warp paragraph have no round-2 hunk. | FIXED |
| NP5-4 | §2.6's `ComposedTower`, `Room` and `Porch` (l. 842–844) and §2.7's wall `Tower` (l. 1074) have no round-2 hunk. The part names none of them (grep: 0). | FIXED |
| VD5-6 | §2.9 and §10.4 have no round-2 hunk. §10.4's two pointers ("§2.9's pack-set rule", l. 6762 and 6778–6779) resolve. | FIXED |

GAP-1 (canon) stands as in r1: the part states no value for the branch re-join constant k, as the canon rules. That gap is
the owner's and Fable's, not an issue of this pass.

## 7. Conflicts whose places round 2 replaced

| conflict | re-check | verdict |
|---|---|---|
| CF-PIPE-01 | §4.2 S3 (12) is byte-identical in the replaced block. §4.5 S7b (3) and §4.1 (c) are untouched. | RESOLVED |
| CF-PIPE-03 | §4.1's S11 row is unchanged. Its companion §7.3 item 7 (ii) now names wing rings too, which agrees (§6, NP5-1). | RESOLVED |
| CF-PIPE-04 | F-SITING is untouched, since the only §5.2 change is F-SKELETON. §4.7 S10b is unchanged. | RESOLVED |
| CF-PIPE-09 | §4.2 S1 (2)'s outline-template list (disc, D-shape, lozenge, crescent, spindle) is byte-identical, and II.6 and II.1 still point to it. | RESOLVED |
| CF-PIPE-10 | §4.2 S1 (5), §4.4 S5b, §4.1's S5 row and F-ROUTE's "where" are all unchanged. | RESOLVED |
| KERNEL-C05 (who reads skeleton output; not in r1's list) | Round 2's F-SKELETON row now accounts for every §3.8 reader. It routes the `spine` readers, S1's coast clamp included (§4.2 S1 (2)), to a sampled medial axis, and the `regions` reader (S10) to F-PLOT's ladder. §4.2 S1 (2) and §4.7 S10 (4) agree. | RESOLVED |
| MODEL-C11, DETERMINISM-C-5 | §4.2 S1 (5)'s deck-before-water list and drawn-bridge rule are byte-identical. | RESOLVED |
| MODEL-C04 | §4.8's `Castle.surround` and `Castle.moat` text is byte-identical. The §4.8 hunk touched only the acceptance line. | RESOLVED |
| NEW-PIPE-1 | §4.4 S5a is byte-identical. §5.3's quay-reachability row and F-WALL are untouched. | RESOLVED (PLAUSIBLE intended design, as in r0) |
| KERNEL-C12 | §3.3 still says "three moments, never per batch". Round 2 dropped only "(K4)". | RESOLVED |

CF-PIPE-02, -05, -06, -07 and -08, CANON-C05, CANON-C09 and SCOPE-C09 have no place in a round-2 hunk. Their r1 verdict
(RESOLVED) holds.

## 8. Other parts' round-2 changes that this part points into

Every hunk of the whole-document diff outside this part was read. Each is listed with its effect here.

| changed subsection (repair) | what changed | effect on this part |
|---|---|---|
| §0.2 row 4 (scope) | "§12.2 (matched reference sizes and the band ends in buildings)" | none. The same row's "PART III (the village ladder THORP → HAMLET → VILLAGE and its ceiling)" still lands on PART III (5), l. 9158, which is unchanged |
| §1.2 (scope) | "(124–145 ms across the target's building range, §1.1; §12.1)" plus a re-wrap | none; the part states no one-click timing |
| §2.6 l. 963 (model) | wing rule 4's cost: "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)" | none; the part states no S11 µs cost (grep "µs": 0) |
| §3.3 l. 1695 (kernel) | " (K4)" dropped | none; the part's §3.3 pointers (pool steps, rule 3, same-level split, clear regions) are unchanged |
| §5.1 diagram (determinism) | tier-4 example "sampled medial axis (spine readers)" | agrees with §4.2 S1 (2)'s `spine` reader |
| §5.2 F-SKELETON (determinism, VDR1-3) | where "S1, S11, S13a"; `spine` readers incl. "S1's coast simplicity clamp (§4.2 S1 (2))"; "the `regions` reader (S10) takes F-PLOT's ladder" | agrees with §4.2 S1 (2) (PIPELINE-062) and §4.7 S10 (4)'s "(F-SKELETON), a reflex pre-cut partition" (PIPELINE-261), which is F-PLOT's first rung; see O-R2-2 |
| §7.3 item 7 (ii) (determinism, VDR1-1) | "each face and wing ring" | NP5-1's companion, which agrees (§6). The part's oracle mentions (§4.6 step 7, §4.11, §10.1 (3), II.4) do not concern (ii) |
| §8.10 (rendering) | the stamp tiles' random key "under the `render.stampTiles` key and components of §6.1's registry entry" | none; §4.9's pointer is to §8.10's layouts, which are unchanged |
| §12.6 (rendering) | the replay bullet points to §7.3 item 2's replay mode | none; II.5's "per-district regeneration ≤ 30 ms (§12.6)" lands on the unchanged scoped-regeneration law |
| §12.7 (rendering) | the lit export "from M2b"; stage-3 hook "§12.4's S11 row; the kernel's M0 bar, §3.7" | none; the tree tier (§4.9 (e)) and the simulation budget (§10.3) are unchanged |
| §12.8 (rendering) | "(a set is §12.7's 160 sprites)" | none; the part does not cite §12.8 |
| §13.2 B-EDIT (scope) | the load-verification case "on an edited CITY document, with a mismatch forced …"; the forced-§6.2 (iii) case "the mismatch withdraws the keep"; re-wrap | agrees with §4.1's "while a loaded document is verified … every edit runs … by the pool-size-0 path" (PIPELINE-047). The wall-crossing case §4.11 cites is re-wrapped only (l. 7753–7754) |

## 9. Observations (not raised)

* **O-R2-1 — §2.3's contour clause is now a two-hop chain (model's line).** §2.3 (l. 687–689) reads "clipped to the land
  faces (§4.2 S1 (2), §8, §11)". Its §4.2 target now points on to §8.2. The reference is not broken, because §8 is in the
  same list, and the values agree. The pipeline repair and assemble-r2 §6 name it for model, and the queue's assemble-r2
  row lists it for re-check.
* **O-R2-2 — F-SKELETON's "where" omits S10 (determinism's row).** The new ladder names "the `regions` reader (S10)" and
  sends it to F-PLOT's ladder, while the "where" column reads "S1, S11, S13a". This is the determinism lane's vetoable
  call (1). It reads consistently: F-SKELETON detects the failure, and S10 builds the downgrade under F-PLOT. §4.7 S10
  (4)'s "(F-SKELETON)" names that detection. There is no disagreement with this part.
* **O-R2-3 — two §4 tests are also stated in §13.2, values agreeing (for Fable).**
  * PIPELINE-123 (§4.2 S3 (9)): the gate and weld vertices lie on the trace, and the trace stays within 40 m of the
    boundary except along an `on_enceinte` castle's shared stretch. §13.2 (l. 7692–7693) and §5.3's row (l. 4058, which
    points here) state it too.
  * PIPELINE-190 (§4.4 table): the `ringed` fixture. §13.2 (l. 7686–7687) states it without "on a flat site" and "ring ×
    radial crossroads".

  The canon homes both at their §4 places, as facts separate from SCOPE-184 at §13.2. R9 read strictly would home them in
  §13, which is the tension P1-2 resolved by R9. Both pairs exist in the archive, round 2 changed neither, and no issue
  kind applies, since the statements agree and nothing was lost or introduced. They are ruled not an issue of this
  pass (INVALID as findings). A document-wide R9 ruling by Fable would settle all such pairs at once.
* **O-R2-4 — cosmetic.** The §4.2 hunk left l. 2679 short (104 columns); the paragraph was not re-wrapped. `doc_checks`
  passes.
* **Carried from r1, unchanged by round 2:**
  * O-1: which `parent` §4.5 means (PLAUSIBLE; for Fable);
  * O-2: §4.11's `build` member against §7.1's event;
  * O-3: `carve.polygon` is one ring (PLAUSIBLE; a design question for Fable);
  * O-5: values-agreeing restatements owned by other parts. §3.3 pool step 1's "≈ 2.3 ms" is the kernel's, and §2.8's
    decline hooks are the model's.

  These stand as recorded in `verify-pipeline-r1.md` §9. O-4, the shared F-SITING wording, needed no action.
* **Scratchpad hygiene.** Every scratch file of this lane is in its own subdirectory (`vp2/`), because the parallel lanes
  share one session scratchpad.

## 10. Checked list — every inventory id of the part (459; none sampled)

Verdicts:
* **FIXED** — an r0 or r1 issue, resolved at the place shown.
* **ISSUE P2-n** — see §4.
* **OK — re-checked** — the id's home lies in a block round 2 replaced (§4.2, §4.4, §4.8), or its target or cited source
  lies in a subsection another r2 repair replaced. It was re-read in the new text.
* **OK / RESOLVED / FIXED — not touched by round 2** — round 2 changed neither its text nor its target, so the r1 verdict
  holds (`verify-pipeline-r1.md` §10, and through it r0's side-by-side record).

Totals: 438 OK, 10 FIXED (P1-1, P1-3 and the eight r0 findings), 10 RESOLVED and 1 ISSUE. The ISSUE is PIPELINE-187:
P1-2 is fixed there, and P2-1 is open. Of the 459, 181 were re-checked this round and 278 hold their r1 verdict.

| id | kind | now (the rewrite's mapping) | r1 | r2 verdict |
|---|---|---|---|---|
| PIPELINE-001 | rule | §4 intro | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-002 | mechanism | §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-003 | interface | §4.12 `StageDecl` (the field list); §4.1 now reads "each stage registers a `StageDecl` (§4.12)… | OK | OK — target re-read: the `workLimits` comment's §5.1 (5) unchanged |
| PIPELINE-004 | rule | §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-005 | rule | §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-006 | rule | §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-007 | rule | §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-008 | rule | §4.1 "Why this order" (a) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-009 | rule | §4.1 "Why this order" (b) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-010 | rule | §4.1 "Why this order" (c) — "large institutions" are now S7b claims, pointer to §4.2 S3 (12) a… | OK | OK — target re-read: §4.2 S3 (12) byte-identical in the replaced block; §4.5 S7b (3) untouched (CF-PIPE-01) |
| PIPELINE-011 | rule | §4.1 "Why this order" (d); the construction itself §4.2 S3 intro and (4)–(10) | OK | OK — target re-read: §4.2 S3 intro and (4)–(10) byte-identical in the replaced block |
| PIPELINE-012 | rule | §4.1 "Why this order" (e) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-013 | rule | §4.1 laziness contract | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-014 | rule | §4.1 laziness contract | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-015 | rule | §4.1 laziness contract | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-016 | rule | §4.1 laziness contract | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-017 | rule | referenced to §5.2 F-CUT (moved out; §4.6 step 8 (d) reads the allocation's pending claims) | OK | OK — target re-read: §5.2 F-CUT row untouched by round 2 (only F-SKELETON changed in §5.2) |
| PIPELINE-018 | rule | referenced to §6.3 (DETERMINISM-224) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-019 | rule | referenced to §9.1 (RENDERING-330) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-020 | rule | §4.1 one-click first paint | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-021 | rule | §4.1 one-click first paint | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-022 | budget | referenced to §12.5 (RENDERING-538) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-023 | rule | referenced to §6.2 (DETERMINISM-597) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-024 | test | referenced to §6.5 (9) (DETERMINISM-293) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-025 | rule | referenced to §3.3 (KERNEL-103) | OK | OK — target re-read: §3.3 'one level per transaction' unchanged (round 2 dropped only "(K4)") |
| PIPELINE-026 | mechanism | §4.1 batch table, S1 row | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-027 | mechanism | §4.1 batch table, S3 row | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-028 | mechanism | §4.1 batch table, S4 row (NP5-2 context: S5b row added beside it) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-029 | mechanism | §4.1 batch table, S5 row — adds "k ≥ 2 — S5b L0 … two same-level shore splits before S5b's L1 … | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-030 | mechanism | §4.1 batch table, S6 row | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-031 | mechanism | §4.1 batch table, S7 row | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-032 | mechanism | §4.1 batch table, S7b row and S12a/S10a/S10b row | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-033 | mechanism | §4.1 batch table, S8 and S9 rows | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-034 | mechanism | §4.1 batch table, S10 row (step (0) contents point to §4.7 S10 (0)) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-035 | mechanism | §4.1 batch table, S11 row — corrected: "a row's party wall is the plot's shared L3 side line c… | OK | OK — re-read (NP5-1): §4.1's S11 row unchanged; §7.3 item 7 (ii) now checks "each face and wing ring §2.6's composition rule (1) adds to its scope" (VDR1-1), matching rule (1)'s "together with a row neighbour's wing rings" |
| PIPELINE-036 | mechanism | §4.1 batch table, S12b row + the carry sentence under the table | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-037 | mechanism | referenced to §7.3 (section restatement) | OK | OK — target re-read: §7.3's chain order unchanged (round 2 changed only item 7 (ii)) |
| PIPELINE-038 | rule | §4.1 sentence under the batch table — L0 writers now "S1, S3, S4 and S5b (F-ROUTE's extra brid… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-039 | decision | rationale → J-P46 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P46)" left at §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-040 | rule | §4.1 sentence under the batch table | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-041 | rule | referenced to §3.3 step 1 (KERNEL-138) | OK | OK — target re-read: §3.3's three rebuild moments, never per batch — unchanged |
| PIPELINE-042 | rule | referenced to §5.1 (5) (DETERMINISM-015) | OK | OK — target re-read: §5.1 (5) unchanged (round 2 changed only the tier-4 diagram label) |
| PIPELINE-043 | mechanism | referenced to §8.9 (RENDERING-241) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-044 | mechanism | §4.1 workers bullet | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-045 | rule | §4.1 workers bullet | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-046 | mechanism | §4.1 workers bullet (hinterland unit) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-047 | rule | §4.1 workers bullet | OK | OK — target re-read: §2.9 step 3 unchanged; §13.2's B-EDIT load-verification case (now on an edited CITY document with a forced mismatch) agrees with edits running by the pool-size-0 path |
| PIPELINE-048 | measurement | referenced to §12.3 (RENDERING-509) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-049 | fallback | referenced to §12.3 (RENDERING-500) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-050 | decision | rationale → J-P10 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P10)" left at §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-051 | decision | rationale → J-P27 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P27)" left at §4.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-052 | type | §4.2 S0 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-053 | rule | referenced to §7.7 (1) (DETERMINISM-564) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-054 | rule | referenced to §7.7 (DETERMINISM-575) | FIXED (P0-5) | FIXED (P0-5) — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §5) |
| PIPELINE-055 | rule | referenced to §1.1 (SCOPE-063) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-056 | mechanism | §4.2 S0 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-057 | rule | §4.2 S0 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-058 | mechanism | §4.2 S1 (1) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-059 | number | §4.2 S1 (1) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-060 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-061 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-062 | rule | §4.2 S1 (2) | FIXED (P0-7) | FIXED (P0-7) — re-checked: byte-identical; round 2's F-SKELETON row now names "S1's coast simplicity clamp (§4.2 S1 (2))" among the `spine` readers with the sampled-medial-axis downgrade (VDR1-3) and §5.1's tier-4 example reads "sampled medial axis (spine readers)" — both agree with this text and §3.8 |
| PIPELINE-063 | rule | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-064 | test | referenced to §13.2 (SCOPE-183) | OK | OK — target re-read: §13.2's 10 000-outline property test unchanged (round 2 changed only §13.2's B-EDIT load-verification case) |
| PIPELINE-065 | rule | §4.2 S1 (2) | OK | OK — re-checked: the coast construction (its home) is unchanged; its last words, "most sea level − 10 cm", open hunk line 2677, whose only change is the contour clause that follows (P1-1) |
| PIPELINE-066 | rule | referenced to §8.2; the clip-to-land rule (GEO-14) kept at §4.2 S1 (2) with the pointer | ISSUE P1-1 | FIXED (P1-1) — §4.2 S1 (2) (l. 2677–2679) now reads "contour lines are not model geometry: their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2), so a contour never crosses the shore, cliffs and sub-cell spits included (steep-coast and cliff fixtures in the golden suite)"; §8.2 (l. 5719–5722) states the per-tile marching-squares extraction and the vector-space clip before emission; nothing of the item lost |
| PIPELINE-067 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: byte-identical (its first words share hunk line 2679, whose text here is unchanged) |
| PIPELINE-068 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-069 | mechanism | §4.2 S1 (3) (flat resolution and lake typing unioned from §2.3) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-070 | mechanism | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-071 | number | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-072 | rule | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-073 | number | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-074 | mechanism | §4.2 S1 (3) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-075 | rule | §4.2 S1 (4) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-076 | interface | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-077 | number | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-078 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-079 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-080 | rule | §4.2 S1 (5) bullet "A site no way uses" ("not drawn, named, labelled or exported" unioned from… | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-081 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-082 | rule | §4.2 S1 (5) bullet "A deck where no site stands" — standing-water list adds S5b (NP5-2); "ever… | OK | OK — re-checked: byte-identical (S5b in the standing-water list, NP5-2); §7.1 and §7.4 untouched by round 2 |
| PIPELINE-083 | rule | §4.2 S1 (5) bullet "A deck placed before its water exists" — now the canonical list (carve, ou… | OK | OK — re-checked: byte-identical (MODEL-C11's canonical list); §7.3 (b) 3–4 and §3.3 cited here unchanged in substance (round 2: §7.3 item 7 (ii) and §3.3's "(K4)" only) |
| PIPELINE-084 | mechanism | §4.2 S1 (6) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-085 | rule | §4.2 S1 (7) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-086 | rule | §4.2 S1 (8) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-087 | number | §4.2 S1 (8) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-088 | mechanism | §4.2 S1 (9)-(10) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-089 | rule | referenced to §5.2 F-RIVER; "restart-free" sentence kept at §4.2 S1 with the pointer | OK | OK — re-checked: "restart-free" sentence byte-identical; F-RIVER's row untouched by round 2 (only F-SKELETON changed in §5.2) |
| PIPELINE-090 | mechanism | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-091 | rule | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-092 | rule | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-093 | rule | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-094 | number | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-095 | decision | rationale → J-P6 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P6)" left at §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-096 | measurement | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-097 | number | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-098 | decision | rationale → J-P5 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P5)" left at §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-099 | type | §4.2 S2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-100 | rule | §4.2 S3 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-101 | mechanism | §4.2 S3 (1) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-102 | mechanism | §4.2 S3 (1) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-103 | rule | §4.2 S3 (1) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-104 | number | §4.2 S3 (2) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-105 | rule | §4.2 S3 (2) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-106 | number | §4.2 S3 (2) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-107 | rule | §4.2 S3 (3) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-108 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-109 | mechanism | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-110 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-111 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-112 | measurement | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-113 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-114 | mechanism | §4.2 S3 (5) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-115 | mechanism | §4.2 S3 (6) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-116 | rule | §4.2 S3 (6) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-117 | rule | §4.2 S3 (7) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-118 | rule | §4.2 S3 (7) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-119 | rule | §4.2 S3 (7) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-120 | mechanism | §4.2 S3 (8) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-121 | rule | §4.2 S3 (8) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-122 | mechanism | §4.2 S3 (9) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-123 | test | §4.2 S3 (9) | OK | OK — re-checked: byte-identical at its canonical home (§4.2 S3 (9)); §13.2 and §5.3 also state the check, values agreeing — see O-R2-3 |
| PIPELINE-124 | evidence | dropped (history; validation record) — one receipt pointer kept at §4.2 S3 (9) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-125 | mechanism | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-126 | number | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-127 | number | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-128 | rule | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-129 | number | §4.2 S3 (10) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-130 | mechanism | §4.2 S3 (11) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-131 | test | referenced to §13.2 (SCOPE-191) | OK | OK — target re-read: §13.2's walled coastal harbour fixtures of §4.2 S3 (11) present, unchanged |
| PIPELINE-132 | rule | §4.2 S3 (12) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-133 | term | §4.2 S3 (13) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-134 | rule | §4.2 S3 (13) | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-135 | decision | rationale → J-P26 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P26)" left at §4.2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-136 | decision | rationale → J-P35 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P35)" left at §4.2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-137 | decision | rationale → J-P44 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P44)" left at §4.2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-138 | decision | rationale → J-P45 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P45)" left at §4.2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-139 | decision | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.2 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-140 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-141 | mechanism | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-142 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-143 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-144 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-145 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-146 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-147 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-148 | mechanism | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-149 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-150 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-151 | rule | referenced to §5.2 F-ROUTE; "decks are fixed graph edges" kept at §4.3 | OK | OK — target re-read: §5.2 F-ROUTE row untouched; S5b still in its 'where' |
| PIPELINE-152 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-153 | test | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-154 | rule | §4.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-155 | mechanism | referenced to §7.3 operator table (DETERMINISM-412) | OK | OK — target re-read: §7.3 operator table unchanged |
| PIPELINE-156 | rule | §4.4 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-157 | mechanism | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-158 | number | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-159 | rule | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-160 | rule | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-161 | test | referenced to §13.5 (B-REF anisotropy row); calibration target kept at §4.4 S5a | OK | OK — re-checked: the calibration target kept at §4.4 S5a byte-identical; §13.5 untouched by round 2 |
| PIPELINE-162 | mechanism | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-163 | rule | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-164 | rule | §4.4 S5a "Water and the waterfront" (§3.3 rule 3 promotion unioned) | OK | OK — re-checked: byte-identical; §3.3 rule 3 promotion unchanged (round 2 dropped "(K4)" on another bullet) |
| PIPELINE-165 | rule | §4.4 S5a "Water and the waterfront" (anchoring on shore/bank/cliff/enceinte and the enclosed/s… | OK | OK — re-checked: byte-identical (NEW-PIPE-1 wording); §5.3's quay-reachability row and F-WALL's test untouched by round 2 |
| PIPELINE-166 | rule | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-167 | rule | referenced to §5.2 F-WALL; the pull cap kept at §4.4 S5a | OK | OK — re-checked: the pull cap byte-identical; F-WALL's row untouched by round 2 |
| PIPELINE-168 | mechanism | §4.4 S5a | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-169 | rule | §4.4 S5b — routes under S4's F-ROUTE ladder incl. extra bridge; L0 batch before its L1 batch (… | OK | OK — re-checked: byte-identical (NP5-2: S5b under S4's F-ROUTE ladder, L0 batch before its L1 batch); F-ROUTE's 'where' still names S5b (l. 4011) |
| PIPELINE-170 | rule | §4.4 S5b | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-171 | test | §4.4 S5b | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-172 | mechanism | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-173 | rule | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-174 | acceptance | referenced to §13.5 table (SCOPE-263) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-175 | decision | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-176 | mechanism | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-177 | evidence | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-178 | rule | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-179 | rule | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-180 | rule | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-181 | rule | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-182 | rule | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-183 | number | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-184 | rule | §4.4 S5c | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-185 | mechanism | §4.4 S5d | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-186 | rule | §4.4 S5d | OK | OK — re-checked: byte-identical (its last clause, "… reported (F-BUDGET-STAGE, §5.2)", shares hunk line 3124 unchanged); F-BUDGET-STAGE's row untouched by round 2 |
| PIPELINE-187 | test | §4.4 S5d test ("on ≥ 95 % of seeds" unioned from §5.2 F-BUDGET-STAGE) | ISSUE P1-2 | FIXED (P1-2) as to the stale "§5.2" — §4.4 S5d (l. 3124): "**Test:** §13.2's B-CITY `wealthLevel` sweep", F-BUDGET-STAGE's pointer form (R9); §13.2 (l. 7687–7688) states {0, 0.5, 1}, ± 5 % on ≥ 95 % of seeds — but ISSUE P2-1: the qualifier "inside its rung band" is now stated nowhere (§13.2: "walled share in band") |
| PIPELINE-188 | number | §4.4 table | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-189 | rule | §4.4 table | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-190 | test | §4.4 table | OK | OK — re-checked: byte-identical at its canonical home (§4.4 table); §13.2 also names the `ringed` fixture — see O-R2-3 |
| PIPELINE-191 | decision | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-192 | acceptance | §4.4 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-193 | fallback | §4.4 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-194 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-195 | rule | §4.5 "Perimeter and margin band" — the margin band's one statement (perimeter and shared reser… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-196 | mechanism | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-197 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-198 | rule | referenced to §2.5 (section restatement) | FIXED (P0-2) | FIXED (P0-2) — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §5) |
| PIPELINE-199 | mechanism | §4.5 Quarters | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-200 | rule | §4.5 Quarters (receipts kept as pointers) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-201 | evidence | dropped (history; validation record) — receipts kept at §4.5 Quarters | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-202 | rule | referenced to §9.4; "S13a names every node of the tree" kept at §4.5 Quarters | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-203 | decision | rationale → J-P28 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P28)" left at §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-204 | decision | rationale → J-P2 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P2)" left at §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-205 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-206 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-207 | mechanism | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-208 | number | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-209 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-210 | rule | §4.5 Fields, Bands bullet ("`setAttr` … re-derives every block whose band changes" unioned fro… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-211 | rule | referenced to §7.2; "a field brush never moves FieldBands" kept at §4.5 Bands | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-212 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-213 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-214 | rule | §4.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-215 | rule | §4.5 S7b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-216 | mechanism | §4.5 S7b (1) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-217 | rule | §4.5 S7b (2) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-218 | rule | §4.5 S7b (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-219 | rule | §4.5 S7b (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-220 | decision | rationale → J-P41 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P41)" left at §4.5 S7b (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-221 | test | §4.5 S7b (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-222 | rule | §4.5 S7b (4) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-223 | rule | §4.5 S7b (5) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-224 | rule | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-225 | rule | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-226 | test | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-227 | rule | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-228 | test | referenced to §16 M0 (b) (moved out; §4.6 "Sides" points) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-229 | rule | §4.6 (1) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-230 | number | §4.6 (2) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-231 | rule | §4.6 (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-232 | rule | §4.6 (4) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-233 | measurement | §4.6 (4) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-234 | rule | §4.6 (5) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-235 | number | §4.6 (6) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-236 | rule | §4.6 (7) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-237 | rule | §4.6 (7) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-238 | rule | §4.6 (7) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-239 | rule | referenced to §7.3 item 1; one-sentence summary and pointer at §4.6 step 7 | OK | OK — target re-read: §7.3 item 1 unchanged; the oracle (item 7) changed only in (ii), which concerns stored compositions |
| PIPELINE-240 | decision | rationale → J-P32 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P32)" left at §4.6 (7) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-241 | rule | §4.6 step 8 ("each rung under an operation-count work limit; ≤ 3 candidates in all" unioned fr… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-242 | acceptance | §4.6 (8) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-243 | rule | §4.6 (9) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-244 | rule | §4.6 (10)-(11) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-245 | decision | rationale → J-P11 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P11)" left at §4.6 (10) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-246 | rule | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-247 | number | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-248 | rule | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-249 | interface | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-250 | interface | §4.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-251 | mechanism | referenced to §3.7; S9's per-district / hinterland runs and the strip's L2 kept at §4.7 S9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-252 | rule | §4.7 S9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-253 | mechanism | §4.7 S10a | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-254 | rule | §4.7 S10a | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-255 | rule | §4.7 S10 (0) (margin bands by pointer to §4.5) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-256 | number | referenced to §12.4 (RENDERING-523) | FIXED (P0-4) | FIXED (P0-4) — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §5) |
| PIPELINE-257 | rule | referenced to §7.3 item 2; the castle-curtain and hinterland-recipe clauses stay at §4.7 S10 (… | OK | OK — target re-read: §7.3 item 2 unchanged; §12.6 now points to its replay mode (agrees) |
| PIPELINE-258 | mechanism | §4.7 S10 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-259 | number | §4.7 table | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-260 | rule | §4.7 S10 (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-261 | rule | §4.7 S10 (4) | OK | OK — target re-read: round 2's F-SKELETON row routes "the `regions` reader (S10)" to F-PLOT's ladder, whose first rung is this same reflex pre-cut partition; §3.8's reader list agrees — no conflict with "(F-SKELETON)" here |
| PIPELINE-262 | test | referenced to §13.2 (SCOPE-183) | OK | OK — target re-read: §13.2's plots on concave, notched and curved blocks present |
| PIPELINE-263 | rule | §4.7 S10 (5)-(6) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-264 | rule | §4.7 S10 (7) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-265 | rule | §4.7 S10 (8) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-266 | rule | §4.7 S10 (9)-(10) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-267 | rule | §4.7 S10 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-268 | rule | §4.7 S10 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-269 | rule | §4.7 S10 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-270 | rule | §4.7 S10b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-271 | rule | §4.7 S10b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-272 | rule | §4.7 S10b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-273 | rule | §4.7 S10b — "never gives up" now reads "never silently", with F-SITING's last rung (CF-PIPE-04) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-274 | number | §4.7 S10b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-275 | rule | §4.7 S10b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-276 | rule | §4.7 S11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-277 | number | §4.7 S11 table | OK | OK — target re-read: §2.6 footprint templates and composer unchanged (round 2 changed §2.6 l. 963 only) |
| PIPELINE-278 | rule | referenced to §2.5 `PlotBound`; the streetwall-continuity and export clauses kept at §4.7 S11,… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-279 | rule | §4.7 S11 | OK | OK — target re-read: §2.6 unchanged in substance; the part states no S11 µs cost, so §2.6's and §12.7's new "§12.4's S11 row" pointers touch nothing here |
| PIPELINE-280 | rule | §4.7 S11 | OK | OK — target re-read: §2.6's wing-carrying rule and union check unchanged |
| PIPELINE-281 | rule | §4.7 S11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-282 | number | §4.7 pins | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-283 | rule | referenced to §8.5 (RENDERING-180) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-284 | rule | §4.8 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-285 | number | §4.8 wall strips | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-286 | rule | §4.8 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-287 | decision | rationale → J-P29 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P29)" left at §4.8 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-288 | rule | §4.8 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-289 | rule | §4.8 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-290 | number | §4.8 | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-291 | mechanism | §4.8 castle (surround named as `Castle.surround`, moat as `Castle.moat`, per MODEL-C04) | OK | OK — re-checked: byte-identical (`Castle.surround`, `Castle.moat`; MODEL-C04) |
| PIPELINE-292 | rule | §4.8 castle | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-293 | decision | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.8 castle | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-294 | rule | §4.8 castle | OK | OK — re-checked: byte-identical; its "— never a restart (§5.2)" is now the paragraph's one §5.2 citation and names F-CASTLE's ladder, which §5.2 still lists (l. 4014) |
| PIPELINE-295 | acceptance | §4.8 castle acceptance ("0 ways through reservations" and MFCG census baseline unioned from §5… | ISSUE P1-3 | FIXED (P1-3) — §4.8 (l. 3588–3590): "(0 ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats); every re-sited castle reported"; the stale "§5.2" dropped; F-CASTLE's test cell points here (l. 4014); the Compactness sentence keeps "— never a restart (§5.2)" for the ladder |
| PIPELINE-296 | rule | §4.8 | OK | OK — re-checked: byte-identical (its first words share hunk line 3590, unchanged) |
| PIPELINE-297 | rule | §4.8 water furniture (deck list unioned from §2.7) | FIXED (P0-6) | FIXED (P0-6) — re-checked: byte-identical; the pointer "(§4.2 S3 (2), (10))" intact |
| PIPELINE-298 | rule | referenced to §6.3 (bridge address); the re-base and gate-passage clauses kept at §4.8 | OK | OK — re-checked: byte-identical; §2.6's `deriveBase` and §7.3 (a) unchanged in substance (round 2: §2.6 l. 963 and §7.3 item 7 (ii) only) |
| PIPELINE-299 | number | §4.8 water | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-300 | rule | referenced to §5.3 (crossing invariant); the harbour-works list kept at §4.8 water furniture | OK | OK — re-checked: the harbour-works list byte-identical; §5.3's crossing invariant untouched |
| PIPELINE-301 | rule | §4.8 water | OK | OK — re-checked: its block was replaced in round 2; this text is byte-identical (the part diff has three hunks, none here) and its pointers resolve |
| PIPELINE-302 | rule | §4.9 S12a | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-303 | rule | §4.9 S12a | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-304 | mechanism | §4.9 S12a | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-305 | number | §4.9 S12a | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-306 | rule | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-307 | test | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-308 | mechanism | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-309 | rule | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-310 | mechanism | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-311 | rule | §4.9 S12b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-312 | rule | §4.9 S12b | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-313 | number | §4.9 table | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-314 | rule | §4.9 table | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-315 | number | §4.9 table | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-316 | number | §4.9 table | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-317 | rule | §4.9 table | FIXED (P0-1) | FIXED (P0-1) — target re-read: §8.10's layouts unchanged (round 2 changed only the stamp tiles' random-key wording) |
| PIPELINE-318 | rule | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-319 | rule | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-320 | rule | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-321 | acceptance | §4.9 | OK | OK — target re-read: §12.7's tree tier (10 000 trees in one 16 ms frame) unchanged (round 2: the lit export and the stage-3 hook lines only) |
| PIPELINE-322 | rule | referenced to §8.5; the `grove` tag / dramatic-forest options and the layer toggle kept at §4.… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-323 | rule | §4.9 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-324 | rule | §4.10 — names drawn "in §6.3's cases" (CF-PIPE-05) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-325 | rule | referenced to §9.1 (RENDERING-330) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-326 | rule | referenced to §8.1 (section restatement) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-327 | mechanism | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-328 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-329 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-330 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-331 | test | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-332 | type | §4.11 | FIXED (P0-8) | FIXED (P0-8) — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §5) |
| PIPELINE-333 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-334 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-335 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-336 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-337 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-338 | rule | part-specific use kept at §4.11 "Other crossings" (the carve's wall-run rule, J-I13); the shar… | OK | OK — target re-read: §7.3 (b) 2 unchanged |
| PIPELINE-339 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-340 | test | referenced to §13.1 (SCOPE-126) | OK | OK — target re-read: §13.1's fixture present; §4.11's "wall-crossing fixtures are §13.1's and §13.2's" still lands on §13.2's B-EDIT canal-across-a-wall and river-move case (re-wrapped only, l. 7753–7754) |
| PIPELINE-341 | mechanism | §4.11 batch (1) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-342 | mechanism | §4.11 batch (2) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-343 | mechanism | §4.11 batch (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-344 | rule | §4.11 batch (4) ("a carve costs its footprint, not the town" unioned from §3.3) | OK | OK — §3.3 clear regions unchanged in substance |
| PIPELINE-345 | test | referenced to §13.2; the result stated once in §4.11 batch (4) with the fixture pointer | OK | OK — target re-read: §13.2's canal across the perimeter, "0 district faces outside the perimeter", present |
| PIPELINE-346 | rule | referenced to §7.3 item 1; the carve's neighbour-step clause kept at §4.11 batch (4) | OK | OK — target re-read: §7.3 item 1's seam exception unchanged |
| PIPELINE-347 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-348 | decision | rationale → J-P30 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P30)" left at §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-349 | decision | rationale → J-P34 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P34)" left at §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-350 | decision | rationale → J-P43 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P43)" left at §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-351 | decision | rationale → J-P40 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P40)" left at §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-352 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-353 | rule | §4.11 evolution hooks (user-applied by hand, ruined-building drawing, engine rule table unione… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-354 | interface | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-355 | rule | §4.11 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-356 | interface | §4.12 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-357 | interface | §4.12 | OK | OK — target re-read: the `workLimits` comment's §5.1 (5) unchanged |
| PIPELINE-358 | interface | §4.12 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-359 | rule | §4.12 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-360 | rule | §10 intro | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-361 | rule | §10.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-362 | rule | §10.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-363 | rule | §10.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-364 | rule | §10.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-365 | decision | rationale → J-9 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-9)" left at §10.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-366 | rule | §10.1 | OK | OK — the locality oracle (§7.3 item 7) changed only in (ii) (stored compositions); the content-locality contract is unaffected |
| PIPELINE-367 | decision | rationale → J-P21 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P21)" left at §10.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-368 | interface | §10.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-369 | mechanism | §10.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-370 | test | §10.2 | OK | OK — target re-read: §13.2's roster manifest property test (1 000 seeds) present |
| PIPELINE-371 | rule | §10.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-372 | rule | §10.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-373 | rule | §10.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-374 | rule | §10.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-375 | rule | §10.2 Output paragraph — the reconcile sentence points to §4.7 S10b and F-SITING (CF-PIPE-04) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-376 | rule | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-377 | rule | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-378 | rule | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-379 | number | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-380 | interface | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-381 | rule | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-382 | rule | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-383 | mechanism | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-384 | mechanism | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-385 | mechanism | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-386 | budget | referenced to §12.7 (RENDERING-578) | OK | OK — target re-read: §12.7's simulation-module budget unchanged |
| PIPELINE-387 | rule | §10.3 calendar ("logs no event" unioned from §11.3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-388 | rule | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-389 | interface | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-390 | interface | §10.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-391 | rule | referenced to §11.2 (RENDERING-450) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-392 | mechanism | §10.4 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-393 | rule | referenced to §6.3 (DETERMINISM-224) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-394 | rule | §10.4 | OK | OK — target re-read: §2.6's building description unchanged |
| PIPELINE-395 | rule | §10.4 per-culture paragraph — the re-draw clause in NP5-3 (a)'s order, pointer to §7.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-396 | rule | referenced to §7.6; one clause kept at §10.4 in NP5-3 (a)'s order | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-397 | rule | referenced to §2.9 pack set bullet (MODEL-374) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-398 | interface | §10.4 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-399 | rule | §10.4 setting packs paragraph — retention is now a pointer to §2.9's pack-set rule (VD5-6, CF-… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-400 | rule | referenced to §7.6; the pack patch form (`baseRowHash`, `baseVersion`, orphans) kept briefly a… | FIXED (P0-3) | FIXED (P0-3) — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §5) |
| PIPELINE-401 | rule | §10.4 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-402 | rule | PART II intro — `area` = the base's bent-cut fabric (CF-PIPE-07) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-403 | interface | II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-404 | interface | II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-405 | interface | II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-406 | interface | II.1 `NeighbourhoodRequest` (comment: `bent-cut` is NG's `area` template; CF-PIPE-07) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-407 | interface | II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-408 | rule | II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-409 | rule | II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-410 | rule | II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-411 | rule | II.1 (1) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-412 | rule | II.1 (2) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-413 | rule | II.1 (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-414 | rule | II.1 (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-415 | rule | II.1 (3) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-416 | test | referenced to §13.1 (SCOPE-142) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-417 | acceptance | II.1 rule (3) and II.5 — spelled "stage-2 feature S1" (CF-PIPE-08) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-418 | rule | II.1 rule (4) (its persistence clause now points to II.4) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-419 | rule | II.1 rule (5) (outline list is a pointer to §4.2 S1 (2)) | OK | OK — target re-read: §4.2 S1 (2)'s outline-template list byte-identical in the replaced block |
| PIPELINE-420 | rule | II.1 (6) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-421 | decision | rationale → J-P33 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P33)" left at II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-422 | decision | rationale → J-P37 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P37)" left at II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-423 | decision | rationale → J-P38 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P38)" left at II.1 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-424 | mechanism | II.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-425 | rule | II.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-426 | decision | rationale → J-S42 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-S42)" left at II.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-427 | rule | II.2 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-428 | rule | II.2 — "the `area` template is the base's own bent-cut fabric … opened as a `refine` close-up"… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-429 | rule | II.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-430 | rule | II.3 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-431 | budget | referenced to §8.2 / §8.6; the stage-2-tier additions (road programs, hood title, instanced ha… | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-432 | rule | II.4 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-433 | rule | II.4 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-434 | rule | II.4 | OK | OK — target re-read: §7.3 item 1 and the oracle's byte-identity check unchanged |
| PIPELINE-435 | rule | II.5 | OK | OK — target re-read: §12.6's scoped-regeneration law (a district of ≤ 450 buildings in ≤ 30 ms) unchanged (round 2 changed only its replay bullet) |
| PIPELINE-436 | acceptance | II.5 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-437 | acceptance | II.5 | OK | OK — target re-read: §12.6's per-district ≤ 30 ms unchanged |
| PIPELINE-438 | rule | II.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-439 | rule | II.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-440 | rule | II.6 — "an outline template of §4.2 S1 (2)" (CF-PIPE-09) | OK | OK — target re-read: §4.2 S1 (2)'s outline-template list byte-identical (CF-PIPE-09) |
| PIPELINE-441 | interface | II.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-442 | interface | II.6 | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-443 | rule | PART III | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-444 | rule | PART III | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-445 | rule | PART III (1) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-446 | rule | PART III (2) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-447 | rule | PART III (3)-(4) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-448 | number | PART III (5) | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| PIPELINE-449 | acceptance | PART III | OK | OK — not touched by round 2; r1 verdict holds (verify-pipeline-r1.md §10) |
| CF-PIPE-01 | conflict | resolved at §4.1 "Why this order" (c) (§3 above) | RESOLVED | RESOLVED — §4.2 S3 (12) byte-identical in the replaced block; §4.5 S7b (3) and §4.1 (c) untouched |
| CF-PIPE-02 | conflict | resolved: §4.1 points to §4.12 `StageDecl` | RESOLVED | RESOLVED — not touched by round 2; r1 verdict holds |
| CF-PIPE-03 | conflict | resolved with NP5-1 at §4.1 S11 row | RESOLVED | RESOLVED — §4.1's S11 row unchanged; its companion §7.3 item 7 (ii) now names wing rings too (agrees) |
| CF-PIPE-04 | conflict | resolved at §4.7 S10b and §10.2 (pointers to F-SITING) | RESOLVED | RESOLVED — F-SITING untouched by round 2 (only F-SKELETON changed in §5.2); §4.7 S10b unchanged |
| CF-PIPE-05 | conflict | resolved: "in §6.3's cases" | RESOLVED | RESOLVED — not touched by round 2; r1 verdict holds |
| CF-PIPE-06 | conflict | resolved with VD5-6: pointers to §2.9 | RESOLVED | RESOLVED — not touched by round 2; r1 verdict holds |
| CF-PIPE-07 | conflict | resolved with VS5-2: `area` = bent-cut | RESOLVED | RESOLVED — not touched by round 2; r1 verdict holds |
| CF-PIPE-08 | conflict | resolved: "stage-2 feature S<n>" in text; two heading renames for the assembler | RESOLVED | RESOLVED — not touched by round 2; r1 verdict holds |
| CF-PIPE-09 | conflict | resolved: II.6 points to §4.2 S1 (2) | RESOLVED | RESOLVED — §4.2 S1 (2)'s outline-template list byte-identical; II.6 points to it |
| CF-PIPE-10 | conflict | resolved with NP5-2 (canon ruling, option 1) | RESOLVED | RESOLVED — §4.2 S1 (5) and §4.4 S5b byte-identical in the replaced blocks; §4.1's S5 row and F-ROUTE's 'where' unchanged |
