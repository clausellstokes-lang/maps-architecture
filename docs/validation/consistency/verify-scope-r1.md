# Verify — scope part (title, summary, §0, PART I heading, §1, §13–§17, Delegated decisions, Judgment calls, Staged, Appendix A), consistency pass round 1

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-scope-r1`, 2026-09-26. Status: COMPLETE. Re-verifies the scope part of `docs/ARCHITECTURE.md`
after repair round 1 (`assemble-r1`, 49 blocks). Inputs: the archive `docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`,
`inventory-scope.json` (828 items + 11 conflict records), `canon.json`, `rewrite-scope.md`'s mapping table, the six
`repair-r1-*.md` files, `docs/ARCHITECTURE-RATIONALE.md`, `still-open-r5.json`, and this lane's round-0 report
`verify-scope-r0.md` (cited as "r0"). Method: the pre-repair document was rebuilt with `assemble-r0.py` (sha256
`ee314f23…d175`, equal to assemble-r1's "before"), the current document hashed (`ddd48f07…5ebb1`, equal to assemble-r1's
"after", so nothing has touched it since), and the two diffed (115 hunks, every one read). Re-checked: every id homed in
or pointing from a replaced scope subsection, every id referenced to a replaced subsection of another part, every scope
home that another part's replaced text now points to, and every issue the repairs claimed to fix. All other ids keep
their r0 verdict (§9 cites it). Line numbers are the current document's. Scratch files: a private scratchpad
subdirectory (`vs1/`).

## 1. Outcome

**All 12 r0 issues are FIXED** — V-SCOPE-01 … -07 and -10 … -12 by repair-scope-r1, V-SCOPE-08 and -09 by
repair-determinism-r1 at their home §6.5 (9) — and so are the two rendering findings the scope repair took on (VR-R0-12,
VR-R0-13). The six scope blocks landed byte-identical, and a word-level diff shows each changes only the words its issue
names (everything else is re-flow). The four open items this part owns — **VS5-1, VS5-2, VS5-3 and VD5-7 — stay FIXED**
(UNFIXED: none). Every canon conflict touching a replaced subsection is still resolved as ruled. No deferral wording, no
fix-round tag, no round narration and still exactly one review banner.

**2 new issues, both minor (0 blocker, 0 major), both owned by scope:**
* **V-SCOPE-R1-01** (lost) — three archived details of the load-verification fixtures are still missing from §13.2.
  They were missing at r0 too, and r0 did not catch them. This is the same finding as the model verifier's V-MODEL-R1-01.
* **V-SCOPE-R1-02** (broken reference) — §1.2 cites "§12.2's building range". The rendering repair moved that range to
  §1.1's rung table. This is a new problem, caused by two repairs that ran in parallel.

Verdicts over the 839 records (§9):
* **483 re-checked.** 473 are OK, 8 conflict records are resolved (or invalid) as the canon rules, and 2 carry the new
  issues: SCOPE-205 → V-SCOPE-R1-01 and SCOPE-077 → V-SCOPE-R1-02.
* **356 kept from r0.** 353 are OK and 3 conflict records are resolved.

Part size: 277 984 → 278 770 bytes (+786), which is 66.3 % of the archived part's 420 603 (r0: 66.1 %).

**CONFIRMED vs PLAUSIBLE.** CONFIRMED (executed): the rebuild and both hashes, the diff and word diff, block identity,
the rationale file's rebuild diff, the reference resolver, the J-id survival check, the scans, the size, and each
issue's absence (grep over the whole document and the archive). PLAUSIBLE (reading only): that none of the 479
pointers from this part into the 43 subsections other repairs replaced relies on anything those repairs changed,
beyond the one pointer raised here. Each change was read against the pointers it could affect, with no second reader.
The severities are also PLAUSIBLE.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| V-SCOPE-R1-01 | minor | lost | scope | SCOPE-205 is homed at §13.2, and its canon members are MODEL-408 and MODEL-403. §13.2 still lacks three of their details. Sources: the archive's §2.9 step 4 test (l. 2026–2030) and step 3 test (l. 1991–1998). (a) The 100 ms case runs on "an edited CITY document". (b) Its mismatch is forced by "a snapshot in which one building's footprint was moved and whose recorded digest was recomputed to match it". This detail makes it a step-4 mismatch, not the corrupt cache that the next fixture builds from the same moved footprint with the digest unchanged. (c) The forced-§6.2 (iii) case includes "the mismatch withdraws the keep"; §13.2 l. 7743–7744 keeps only "the snapshot is never kept". The rule itself stands at §6.2 (iii) (l. 4315). Grep finds no hit for "recomputed to match" or "edited CITY document" anywhere. §2.9 steps 3 and 4 (l. 1434, 1462) send these fixtures to §13.2. V-SCOPE-03's required criteria are present (l. 7737–7747); these details were outside r0's required change, and r0 missed them. Same finding as V-MODEL-R1-01. | §13.2 load verification: "an edit within 100 ms of the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match, each choice taken in turn: …"; forced-(iii) case: "… wait for the recomputation, the mismatch withdraws the keep, and the snapshot is never kept". |
| V-SCOPE-R1-02 | minor | broken-reference | scope | SCOPE-077, §1.2 l. 196: "(124–145 ms across §12.2's building range; §12.1)". Since repair-rendering-r1, §12.2 no longer gives the building range at the target (l. 7104–7115): it says "The rungs' population bands and targets, buildings at the target and frame areas are §1.1's rung table", and "whose building count §1.1's rung table gives as a range". The 124–145 ms figure is §12.5's TOWN law (40 ms + 70 µs × B) at §1.1's 1 200–1 500 buildings. The pointer now stops one hop short of the fact. This is a new problem of round 1: the rendering and scope repairs ran in parallel. | §1.2: "(124–145 ms across the target's building range, §1.1; §12.1)". Optional, same cause: §0.2 row 4's "§12.2 (bands and matched reference sizes)" → "§12.2 (matched reference sizes and the band ends in buildings)" (O-R1-3). |

## 3. The r0 issues — status after repair round 1

| r0 issue | owner | repaired by | now reads (current line) | verdict |
|---|---|---|---|---|
| V-SCOPE-01 (= V-MODEL-02) | scope | repair-scope-r1, §13.1 | "a 3 000 m relief fixture with a hill-acropolis site stores without a clamp" (l. 7640) | FIXED |
| V-SCOPE-02 (= V-MODEL-03) | scope | repair-scope-r1, §13.2 | §2.6's test: "after each", "every carried ring simple", "a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall", "undo restoring every ring byte for byte and a replay reproducing them", and the composition's shape (l. 7729–7737). Each clause matches the archive (l. 1453–1460). | FIXED |
| V-SCOPE-03 (= V-MODEL-04) | scope | repair-scope-r1, §13.2 | 100 ms case: "the edit applies at once, and after either choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no mismatch" (l. 7737–7740). Corrupt snapshot: "never offered as the saved town, the session's digest after the replay equal to a fresh replay's" (l. 7741–7742). Naming record: "… reported by the replay as a records mismatch, the edits made meanwhile re-applied, then verified, and a corpus selection made afterwards renames exactly what a session that never saved renames" (l. 7744–7747). | FIXED as required; the remaining details → V-SCOPE-R1-01 |
| V-SCOPE-04 (= VK-R0-10) | scope | repair-scope-r1, §13.1 | "… every remaining profile sample within 10⁻⁹ cm of its value before and every other role unchanged" (l. 7593) | FIXED |
| V-SCOPE-05 (= VK-R0-1) | scope | repair-scope-r1, §13.1 and §16 | §13.1: "an outer moat carved at S5a (§4.4) — every face outside its footprint byte-identical less the seam exception, attraction onto exactly its prepared vertices, every indexed role unique per ordinal and no contact name left" (l. 7576–7578). These are KERNEL-123's bars (archive l. 2398–2404). §4.4 states the S5a carve (l. 3050). §16 M3a's exit now points to "the carve fixtures of §13.1–§13.2 (§3.3's clear regions)" (l. 8648), as §3.3 does (l. 1757). | FIXED |
| V-SCOPE-06 (= VK-R0-13) | scope | repair-scope-r1, §13.1 | "`insetRing` empties monotonically" (l. 7626). §3.4 declares `insetRing` (l. 1980). "insetFace" occurs nowhere. | FIXED |
| V-SCOPE-07 (= VDC-16) | scope | repair-scope-r1, §0.2; repair-determinism-r1, §7.1 | §0.2 row 5: "§7.1 (the edit targets, clause by clause, and the edit-target table), §7.2–§7.6, §2.8 (edit paths in the entity registry, whose completeness test is §13.2's)" (l. 108). §7.1: "its completeness test is §13.2's (§2.8)" (l. 4760–4761). §2.8 (l. 1251) and §13.2's document tests (l. 7675) agree. §7.1's "Edit targets" paragraph lands the rule clause by clause. | FIXED |
| V-SCOPE-08 (= VDC-2) | determinism | repair-determinism-r1, §6.5 (9) | truncation identity: "a `setAttr(name)` + `undo` pair, a `lock` + `unlock` pair and a naming `rerollLayer` + `undo` pair, each around a corpus selection — the freeing event re-drawing the name by §6.3's case (4), listed, confirmed and stored in the event" (l. 4589–4592) | FIXED |
| V-SCOPE-09 | determinism | repair-determinism-r1, §6.5 (9) | cross-host: "… workers on and off, pool sizes 0–3" (l. 4574–4575). The optional reduction of §13.2's restatement was not made; the values are now equal (O-R1-1). | FIXED |
| V-SCOPE-10 | scope | repair-scope-r1 (rationale file edited by the lane; Judgment calls block) | In the rationale file, Part A's J-DET-36 row carries KERNEL-357's split-key passage under "*Amended by the consistency pass (KERNEL-357's split key, §3.9):*" (l. 136). The F.2 heading now reads "(inventory KERNEL-357; §3.9; appended to the Part A row by the consistency pass)" (l. 1106). Index row: "…; Steiner splits in their partition's chunk, keyed by their route edge's endpoints" (l. 9447). §3.9 cites J-DET-36 at the endpoint key (l. 2463). | FIXED |
| V-SCOPE-11 | scope | repair-scope-r1, §16 | "the subjects the owner's roadmap places after the base — stage 2 at M5 above, the others staged by the owner — … are the one list in *Staged by the owner's roadmap*" (l. 8703–8704). This agrees with the Staged preface (l. 9640–9642). | FIXED |
| V-SCOPE-12 | scope | repair-scope-r1, Judgment calls | J-S43: "the unpriced-mechanisms line of §16's effort table widened by 3–4 pw for six new components" (l. 9614), matching §16's line "mechanisms the lines above do not price" | FIXED |

## 4. The other claims of repair-r1-scope

| claim | checked | verdict |
|---|---|---|
| VR-R0-12: §13.2's seam check becomes a pointer to §8.3 | §13.2 now reads "the shipped stamp tiles pass §8.3's seam check (§8.10)" (l. 7685). §8.3's census row (l. 5884) carries every clause the dropped text had: "all 256 2 × 2 arrangements of cells drawing its four tiles", "each band's rank subset", "0 pairs of points in different cells closer than r₀". Every other seam-check mention points to §8.3 (§13.8 l. 8176, §16 M1 l. 8645). The canon had split one fact into two homes, RENDERING-147 and SCOPE-181; the rendering verifier chose §8.3 under R9's census exception. | FIXED |
| VR-R0-13: §13.7 O13 (a)'s fallback | The fallback now reads "a label still over the limit takes its next alternate (§9.2: its next spine, then §9.4's ladder)" (l. 8151). §9.2's greedy uses exactly that order, "its first alternate (its spines in order, then §9.4's ladder)" (l. 6428). §9.3 lists the candidates spine, trimmed spine, OBB axis, OBB arc, and defers the threshold and fallback to §13.7 (l. 6505–6509). This restores the archived §9.3 meaning, "takes the next candidate" (archive l. 8071). The resolution is recorded as vetoable in repair-r1-scope.md (O-R1-4). | FIXED |
| VK-R0-9: the nightly pool sizes | No block was needed. §13.3 still reads "pool sizes 0 and 3, the contract tests of §13.2 covering 0–3" (l. 7874–7875). §13.2's contract tests say 0–3 (l. 7679), and §6.5 (9) now says 0–3 too. The resolution ("the home §13.3 wins") is recorded. | consistent |
| §16 M3a's exit no longer restates the carve fixtures | The pointer (l. 8648) replaces the archived list. Its four fixtures — a canal across a CITY district, a canal across a walled CITY's wall between two towers, an outer moat at S5a, and a course-knot move and a river move across a street grid — are in §13.1 with their footprint, attraction and contact bars (l. 7567–7581). §3.3's pre-decided fallback is kept. | OK (SCOPE-462) |
| "Nothing else in that file changed" (rationale file) | The rewrite-scope seat's builder was re-run on a scratch copy with its output paths redirected. The rebuilt pre-edit file differs from the current one in exactly two lines, 136 and 1106. | CONFIRMED |

## 5. Open items owned by this part (VD5-7, VS5-1, VS5-2, VS5-3)

UNFIXED: none. §16 was replaced, but its M1 and M2a rows are word-identical to r0. The only §16 changes are M3a's
carve-fixture clause and the closing paragraph. Every phrase r0 cited for the four items still occurs exactly once
(grep):

| item | where (current line) | verdict |
|---|---|---|
| VS5-1 | §16 M1: "a saved town of the running output version opens by decoding its snapshot …", "is never root-checked: it opens as §2.9 step 2's frozen view …", "the `frozenImport` rebase arrives with M3a's rebases", "opens an M1 document of the running output version" (l. 8645). M1 exit: "a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message". The model companion, §2.9 step 5, holds "M1's reader never root-checks a document of another output version" (l. 1468–1469). | FIXED |
| VD5-7 | §16 M2a: "with the keep, §6.4's link rule that the base is the recipe …", "a rebased town, a kept saved town included, is offered as its `.plat` file" (l. 8646). Exit: "a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)". M3a keeps only "the pack and host-content link refusals (§2.9, §6.4)" (l. 8648). §6.4 was not replaced. | FIXED |
| VS5-2 | §13.6 (2) and II.2 were not replaced; the texts are unchanged. | FIXED (r0) |
| VS5-3 | §17.1 (4), D-29, §13.6 (2) and (9) were not replaced; the texts are unchanged. | FIXED (r0) |

The routed scope edits VK5-1, VK5-2, VD5-3, VD5-4 and VD5-5 are in the replaced §13.1 / §13.2 blocks, word-identical
to r0, and still present. NR5-1 / NR5-2 (§14) were not replaced; their target §8.9 now also declares `VectorBackend`
(l. 6172), so §14's pointer list (l. 8325) fully resolves (O-R1-5). NP5-2 (J-I18) and NP5-4 are unchanged.

## 6. Canon conflicts touching a replaced subsection

| conflict | verdict |
|---|---|
| SCOPE-C01 model time vs MFCG | RESOLVED — §12.9's r1 change is a tag deletion. 1.8× / 2.3× / 5.1× (l. 7504) and §12.3's table (l. 7137–7139) stand. |
| SCOPE-C03 campaign bound | RESOLVED — §13.2's campaign is word-identical to r0; "≥ 99.5 %" has 0 hits. |
| SCOPE-C05 / KERNEL-C01 Clipper2 | RESOLVED — §3.7 (kernel r1) still states the one case Clipper2 ships, the pre-decided fallback of bar (ii). §1.7 (l. 289), §16 (l. 8698), §17.4 (l. 8885) and D-14 (l. 9238) point to it. |
| SCOPE-C06 (VS5-1), SCOPE-C07 (VD5-7) | RESOLVED — §5 above. |
| SCOPE-C09 plot width | INVALID per canon, unchanged. §3.2's r1 change is a tag at item 6. |
| SCOPE-C10 CityJSON | RESOLVED — §16 M3b (l. 8649) and "CityJSON is built (§11.1)" (l. 8705) are unchanged. |
| SCOPE-C11 staged list | RESOLVED — one list, and §16's closing now agrees with it (V-SCOPE-11). |
| CANON-C03 frames | RESOLVED — §1.1's rung table keeps "frame at the target (area; side at the default aspect 1, §3.2 (9); + 30 % margin per side)". §3.2 (9) exists. §12.2 now points to §1.1 for frames. |
| CANON-C08 key components | RESOLVED — §6.1's r1 change (stamp-tile key components) leaves the structured key components in place. |
| KERNEL-C06 / -C12, DETERMINISM-C-2, CF-PIPE-10 | RESOLVED — the amended index rows J-K6, J-DET-20 and J-I18 are unchanged in the replaced Judgment calls block. |
| RENDERING-C01 / -C02 (NR5-1 / NR5-2) | RESOLVED — §8.9 declares every type §14 sends there. |
| SCOPE-C02, -C04, -C08, MODEL-C03, CF-PIPE-02, CANON-C09, CANON-C10 | not touched by round 1; r0 verdicts hold. |

RULING-1 (the owner's GPL-3 intent against §17.3 / D-22's proprietary default) remains owner-gated and unchanged.

## 7. What round 1 changed, and how each change was checked (executed)

1. **Rebuild and identity.** The pre-repair document was regenerated by `assemble-r0.py` from `new/` and its sha256
   matches assemble-r1's "before". The current document's sha256 matches assemble-r1's "after". `diff -U0`: 115 hunks,
   12 of them in this part (§0.2 1, §13.1 4, §13.2 2, §13.7 1, §16 2, Judgment calls 2).
2. **Blocks verbatim.** Each of repair-r1-scope's six blocks equals the current subsection line for line: §0.2 14 lines,
   §13.1 113, §13.2 144, §13.7 44, §16 85, Judgment calls 286.
3. **Word diff of the six blocks.** The only word changes are the fixes in §3 and §4 of this file. Everything else is
   re-flow at the 120-column width. So every id homed in these blocks keeps its r0 text word for word (§9: "word-identical
   to r0").
4. **Other parts' replaced subsections (103 hunks in 43 subsections).** Every hunk was read against the pointers this
   part makes into it: 479 occurrences, listed with their contexts in the scratch file. The per-section token deltas were
   checked for any fact a pointer relies on. Effects found:
   * §12.2's rung table moved to §1.1 → V-SCOPE-R1-02 and O-R1-3. §1.1's rung table now carries alone every value §12.2
     dropped, identical (SCOPE-066 … -068).
   * §6.5 (9) → V-SCOPE-08 and V-SCOPE-09 fixed.
   * §8.9 → `VectorBackend` declared (O-R1-5).
   * §5.2's test cells became pointers to scope homes → each target states what is pointed at. F-NUM goes to §13.1's
     bar at §13.8's sizes (10⁶ per primitive in the nightly tier, l. 8177). F-OUTLINE and F-BUDGET-STAGE go to §13.2's
     stage property tests, with "≥ 95 % of seeds" at l. 7690. F-SKELETON goes to §13.1's ladder coverage. F-SITING
     goes to §15.2's O18 (f). See O-R1-6.
   * §2.9 step 4's bridge policy moved to §11.3 → §16 M3a's "§11.3, §2.9 step 4" and §14's "(§2.9 step 4, §7.1)" still
     land on what they cite.
   * §4.8's bridge list now points to §4.2 S3 (2), (10), which states decks at every main gate across a city moat, at a
     ring castle moat's gate, and along canals. This agrees with the summary's SCOPE-011.
   * Every other change is a tag deletion or leaves the pointed-to fact in place.
5. **Canon unions (rule R13).** The 34 facts homed in the replaced scope blocks that have members in other parts
   (24 SCOPE facts and 10 MOVE IN facts) were read member by member against the current text. Only MODEL-403 / -408's
   details are missing (V-SCOPE-R1-01). The 10 MOVE IN facts are all present: MODEL-274, -339, -354 and -430,
   KERNEL-129, -131, -282, -343 and -363, and PIPELINE-228.
6. **References.** The resolver (`assemble-r0-refs.py`) finds 134 headings, 35 D ids and 276 J ids, with 0 internal
   broken references. The 2 external references are unchanged (`os-geometry.md` §2.1.4, RFC 7946 §3.1.6). No J id lost
   a mention in any section (a script compared every section's J-id set before and after).
7. **Scans of the six blocks.** No fix-round tag, round narration or deferral wording. Every hit was read: "open" as in
   open enceinte, open-to-editable and open entries; "later" as in later attribute edits, "may later re-sign" (the
   owner-staged corpus phase) and "puts later" (the Staged list); NF-P5 and NF-P6 are invariant names. The whole
   document has exactly one "PENDING FABLE REVIEW" line, the banner (l. 3).
8. **Size.** 277 984 → 278 770 bytes (§0 +39, §13 +939, §16 −266, Judgment calls +74), 66.3 % of the archived part.

## 8. Observations (not raised)

* **O-R1-1 SCOPE-176.** §13.2's stage contract tests (l. 7678–7679) still state the cross-host test in full. The mapping
  calls this a pointer, and the canon's home is §6.5 (9). The values are now equal (0–3 in both places), so it is not a
  conflict. Reducing §13.2's sentence to "§6.5 (9)'s cross-host test is the stage contract test" would remove the last
  duplicate. It is optional, as r0 said.
* **O-R1-2 The mapping table is not updated by repairs.** SCOPE-181 now lives at §8.3, with a pointer in §13.2. SCOPE-462's
  fixture list now lives in §13.1. §12.2 now points to §1.1 for the rung figures of SCOPE-066 … -068. `rewrite-scope.md`
  still gives the r0 places. §9 below records the current ones.
* **O-R1-3 §0.2 row 4 (SCOPE-045).** "§12.2 (bands and matched reference sizes)" is not wrong: §12.2 still states the
  band ends in buildings and the frame's scaling within a rung. But the population bands themselves are now stated only
  in §1.1, which the row lists first. A wording tweak is offered with V-SCOPE-R1-02.
* **O-R1-4 VR-R0-13's resolution is a reconciliation.** It went to the mechanism home's meaning (§9.3's "next
  candidate", which is §9.2's alternate order). The threshold table's archived "next ladder rung" lost. The canon listed
  no conflict here, and the repair recorded its reason: "next ladder rung" alone would skip the trimmed spine, which
  changes a mechanism. This is for Fable to confirm or veto.
* **O-R1-5 r0 corrections.** First, r0 marked SCOPE-384 (`VectorBackend` → §8.9) "present", but at r0 the interface was
  declared nowhere. The rendering verifier found this (VR-R0-1). The rendering repair declared it in §8.9 (l. 6172),
  identical to the archive's §14 line (archive l. 10133). Second, r0 missed V-SCOPE-R1-01's three details; its V-SCOPE-03
  named only the pass criteria.
* **O-R1-6 §5.2's new pointers into this part.** Each target carries what §5.2 dropped. DETERMINISM-061's "render every
  downgrade" is read as §13.1's "each downgrade … is exercised; … a skeleton failure is never a crash and never a
  visual surprise". §15.2 O18 (f) says "institutions placed 100 %, never gives up", while §5.2 F-SITING glosses it as
  "100 % of institutions on a plot meeting their requirement". The two are compatible wordings, and both were already
  in the archive.
* **O-R1-7 A pre-existing wording, identical to the archive (l. 9930).** §13.7 O19 (d)'s fallback raises "the class's
  stamp spacing range". That also covers orchards and avenues, which §4.9 draws as a jittered grid or line, not as
  stamps. Only the "scaled tiles" clause is stamp-specific. No consistency change is involved, so it is not raised.
* **O-R1-8 Unchanged from r0.** The audit tags in subsection headings await the document-wide convention (r0 O-2).
  RULING-1 is owner-gated (r0 O-5). The size is at the top of the 55–65 % target (r0 O-1).

## 9. Checked list — every inventory id (839 records; none sampled)

Scope column: "re-checked (…)" names why the id was re-checked in round 1. The reasons are its home or pointer in a
replaced scope block, a target subsection another repair replaced, or a scope home that replaced text now points to.
"kept" means round 1 did not touch the id's place or its targets, and the verdict is r0's (`verify-scope-r0.md` §8),
quoted after "r0:". "Word-identical to r0" means the id's text in the replaced block did not change a word (§7 item 3),
so r0's reading of it holds.

| id | kind | round-1 scope | verdict |
|---|---|---|---|
| SCOPE-001 | defined-term | kept | r0: OK — stated at the new location |
| SCOPE-002 | rule | kept | r0: OK — stated at the new location |
| SCOPE-003 | rule | kept | r0: OK — stated at the new location |
| SCOPE-004 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-005 | history | kept | r0: OK — stated at the new location |
| SCOPE-006 | marker | kept | r0: OK — stated at the new location |
| SCOPE-007 | rule | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-008 | rule | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-009 | restatement | re-checked (target §4.2) | OK — §4.2's r1 change (S1 (2)'s clamp reads the skeleton `spine`) does not touch it |
| SCOPE-010 | restatement | re-checked (target §4.2) | OK — §4.2's r1 change (S1 (2)'s clamp reads the skeleton `spine`) does not touch it |
| SCOPE-011 | restatement | re-checked (target §4.2) | OK — §4.2's r1 change (S1 (2)'s clamp reads the skeleton `spine`) does not touch it; §4.8's bridge list now points to §4.2 S3 (2), (10), which state the decks at every main gate across a city moat, a ring castle moat's gate and along canals |
| SCOPE-012 | restatement | re-checked (target §4.8) | OK — §4.8's r1 change (bridge list → §4.2 S3 (2), (10), which states it) does not touch it |
| SCOPE-013 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-014 | restatement | re-checked (target §4.5) | OK — §4.5's r1 change (district containment by `parent`) does not touch it |
| SCOPE-015 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-016 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-017 | restatement | re-checked (target §4.9) | OK — §4.9's r1 change (trees-at-render layouts) does not touch it |
| SCOPE-018 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-019 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-020 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-021 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-022 | restatement | kept | r0: OK — summary keeps "merged into named quarters at city zoom"; the MFCG count is §9.4's |
| SCOPE-023 | restatement | re-checked (target §7.1) | OK — §7.1's r1 change (drawn-bridge pointer; completeness-test pointer) does not touch it |
| SCOPE-024 | restatement | re-checked (target §7.3) | OK — §7.3's r1 change (replay mode; item 7 (ii) composition rings) does not touch it |
| SCOPE-025 | restatement | kept | r0: OK — no longer paraphrased in the summary; stated at its home §2.6 |
| SCOPE-026 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-027 | restatement | re-checked (target §2.9) | OK — §2.9's r1 change (step 4's bridge policy moved to §11.3) does not touch it |
| SCOPE-028 | restatement | re-checked (target §2.9) | OK — §2.9's r1 change (step 4's bridge policy moved to §11.3) does not touch it |
| SCOPE-029 | restatement | kept | r0: OK — no longer paraphrased in the summary; stated at §6.4 (and §16 M2a for VD5-7) |
| SCOPE-030 | restatement | re-checked (target §7.4) | OK — §7.4's r1 change (drawn-bridge row pointer) does not touch it |
| SCOPE-031 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-032 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-033 | restatement | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-034 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-035 | restatement | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-036 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-037 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-038 | history | kept | r0: OK — stated at the new location |
| SCOPE-039 | rule | kept | r0: OK — stated at the new location |
| SCOPE-040 | history | re-checked (home §0.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-041 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-042 | mapping | re-checked (home §0.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-043 | mapping | re-checked (home §0.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-044 | mapping | re-checked (home §0.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-045 | mapping | re-checked (home §0.2) | OK — row unchanged; its "§12.2 (bands …)" now lands on §12.2's pointer to §1.1's bands (observation O-R1-3) |
| SCOPE-046 | mapping | re-checked (home §0.2) | OK — **V-SCOPE-07 FIXED**: l. 108 "§7.1 (the edit targets, clause by clause, and the edit-target table) … §2.8 (…, whose completeness test is §13.2's)"; §7.1 l. 4760–4761 and §2.8 l. 1251 agree |
| SCOPE-047 | mapping | re-checked (home §0.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-048 | mapping | re-checked (home §0.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-049 | defined-term | kept | r0: OK — stated at the new location |
| SCOPE-050 | rule | kept | r0: OK — stated at the new location |
| SCOPE-051 | rule | kept | r0: OK — stated at the new location |
| SCOPE-052 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-053 | rule | re-checked (home §0.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-054 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-055 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-056 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-057 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-058 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-059 | restatement | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-060 | rule | kept | r0: OK — stated at the new location |
| SCOPE-061 | rule | kept | r0: OK — stated at the new location |
| SCOPE-062 | rule | kept | r0: OK — stated at the new location |
| SCOPE-063 | rule | kept | r0: OK — stated at the new location |
| SCOPE-064 | rule | kept | r0: OK — stated at the new location |
| SCOPE-065 | interface | kept | r0: OK — stated at the new location |
| SCOPE-066 | number | re-checked (§12.2 now points here) | OK — §1.1's rung table is now the only statement of band, target, buildings at the target and frame; each value equals the rows §12.2 dropped (l. 7104) |
| SCOPE-067 | number | re-checked (§12.2 now points here) | OK — as SCOPE-066 |
| SCOPE-068 | number | re-checked (§12.2 now points here) | OK — as SCOPE-066; the cap row stays in §12.2's new table |
| SCOPE-069 | budget | kept | r0: OK — pointer present; target §12.3 states it |
| SCOPE-070 | budget | kept | r0: OK — pointer present; target §12.3 states it |
| SCOPE-071 | budget | kept | r0: OK — pointer present; target §12.5 states it |
| SCOPE-072 | rule | re-checked (target §4.2) | OK — §4.2's r1 change (S1 (2)'s clamp reads the skeleton `spine`) does not touch it |
| SCOPE-073 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-074 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-075 | rule | kept | r0: OK — stated at the new location |
| SCOPE-076 | interface | kept | r0: OK — stated at the new location |
| SCOPE-077 | rule | re-checked (pointer to §12.2) | **V-SCOPE-R1-02** — "§12.2's building range" (l. 196): §12.2 no longer gives it; §1.1 does |
| SCOPE-078 | rule | kept | r0: OK — pointer present; target §8.5 states it |
| SCOPE-079 | rule | kept | r0: OK — stated at the new location |
| SCOPE-080 | rule | kept | r0: OK — stated at the new location |
| SCOPE-081 | mechanism | kept | r0: OK — stated at the new location |
| SCOPE-082 | decision | kept | r0: OK — stated at the new location |
| SCOPE-083 | rule | kept | r0: OK — stated at the new location |
| SCOPE-084 | decision | kept | r0: OK — stated at the new location |
| SCOPE-085 | decision | kept | r0: OK — stated at the new location |
| SCOPE-086 | decision | kept | r0: OK — stated at the new location |
| SCOPE-087 | decision | kept | r0: OK (signature measures → §13.5); observation O-3: the MFCG column lost "the 2017 ancestor drew streets on cell edges" (not an inventory clause) |
| SCOPE-088 | decision | kept | r0: OK — stated at the new location |
| SCOPE-089 | decision | kept | r0: OK — stated at the new location |
| SCOPE-090 | decision | kept | r0: OK — stated at the new location |
| SCOPE-091 | decision | kept | r0: OK — stated at the new location |
| SCOPE-092 | decision | kept | r0: OK — stated at the new location |
| SCOPE-093 | decision | kept | r0: OK — stated at the new location |
| SCOPE-094 | decision | kept | r0: OK — stated at the new location |
| SCOPE-095 | decision | kept | r0: OK — stated at the new location |
| SCOPE-096 | decision | kept | r0: OK — stated at the new location |
| SCOPE-097 | decision | kept | r0: OK — stated at the new location |
| SCOPE-098 | decision | kept | r0: OK — stated at the new location |
| SCOPE-099 | decision | kept | r0: OK — stated at the new location |
| SCOPE-100 | rule | kept | r0: OK — stated at the new location |
| SCOPE-101 | decision | kept | r0: OK — stated at the new location |
| SCOPE-102 | test | kept | r0: OK — stated at the new location |
| SCOPE-103 | mechanism | re-checked (target §4.11) | OK — §4.11's r1 change (`build` footprint typed `PolygonCm`) does not touch it |
| SCOPE-104 | rule | re-checked (target §4.11) | OK — §4.11's r1 change (`build` footprint typed `PolygonCm`) does not touch it |
| SCOPE-105 | rule | re-checked (target §4.11) | OK — §4.11's r1 change (`build` footprint typed `PolygonCm`) does not touch it |
| SCOPE-106 | rule | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-107 | rule | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-108 | decision | kept | r0: OK — stated at the new location |
| SCOPE-109 | decision | kept | r0: OK — stated at the new location |
| SCOPE-110 | decision | kept | r0: OK — stated at the new location |
| SCOPE-111 | decision | kept | r0: OK — stated at the new location |
| SCOPE-112 | decision | kept | r0: OK — stated at the new location |
| SCOPE-113 | decision | kept | r0: OK — stated at the new location |
| SCOPE-114 | decision | kept | r0: OK — stated at the new location |
| SCOPE-115 | decision | kept | r0: OK — stated at the new location |
| SCOPE-116 | rule | kept | r0: OK — stated at the new location |
| SCOPE-117 | rule | kept | r0: OK — stated at the new location |
| SCOPE-118 | rule | kept | r0: OK — stated at the new location |
| SCOPE-119 | acceptance-bar | re-checked (home §13.1) | OK — word-identical to r0; §5.2 F-NUM now points here ("B-FUZZ at §13.8's sizes against §13.1's bar"): the bar is here, 10⁶ per primitive at §13.8's nightly tier and §16 M0 (a); DETERMINISM-030's union present |
| SCOPE-120 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-121 | rule | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-122 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-123 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-124 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-125 | test | re-checked (home §13.1) | OK — **V-SCOPE-05 FIXED**: the outer moat at S5a with its bars (l. 7576–7578); §16 M3a points here |
| SCOPE-126 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-127 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-128 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-129 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-130 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-131 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-132 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-133 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-134 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-135 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-136 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-137 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-138 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-139 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-140 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-141 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-142 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-143 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-144 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-145 | test | re-checked (home §13.1) | OK — **V-SCOPE-04 FIXED**: "… and every other role unchanged" (l. 7593) |
| SCOPE-146 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-147 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-148 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-149 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-150 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-151 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-152 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-153 | invariant | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-154 | invariant | re-checked (home §13.1) | OK — **V-SCOPE-06 FIXED**: `insetRing` (l. 7626; §3.4 l. 1980) |
| SCOPE-155 | test | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-156 | invariant | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-157 | invariant | re-checked (home §13.1) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-158 | test | re-checked (home §13.1) | OK — **V-SCOPE-01 FIXED**: "with a hill-acropolis site" (l. 7640) |
| SCOPE-159 | test | re-checked (home §13.1) | OK — word-identical to r0; §5.2 F-SKELETON now points here; DETERMINISM-061's 0 crashes on the 1 000 holed polygons present, its "render every downgrade" read as "exercised … never a visual surprise" (O-R1-6) |
| SCOPE-160 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-161 | test | re-checked (target §5.3) | OK — §5.3's r1 change (METROPOLIS wording) does not touch it |
| SCOPE-162 | rule | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-163 | rule | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-164 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-165 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-166 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-167 | acceptance-bar | re-checked (target §12.6) | OK — §12.6's r1 change (a tag) does not touch it |
| SCOPE-168 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-169 | test | re-checked (target §12.8) | OK — §12.8's r1 change (digest-tree sizes, bridged bytes → §11.3, export crown sets) does not touch it |
| SCOPE-170 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-171 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-172 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-173 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-174 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-175 | rule | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-176 | test | re-checked (home §13.2 / target §6.5 (9)) | OK — **V-SCOPE-09 FIXED** at the home §6.5 (9) (l. 4574–4575: pool sizes 0–3); §13.2 l. 7678–7679 still states it, values now equal (O-R1-1) |
| SCOPE-177 | test | re-checked (target §6.5) | OK — §6.5 (9) re-read: time dilation, the derived-complete digest over three orders (S12b and the hinterland unit named), replay = session, truncation identity, the providers' double run and the links and documents without their inputs are all present (l. 4573–4599) |
| SCOPE-178 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-179 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-180 | test | re-checked (target §8.3) | OK — §8.3's r1 change (a tag) does not touch it |
| SCOPE-181 | acceptance-bar | re-checked (home §13.2) | OK — now a pointer: §13.2 l. 7685 "§8.3's seam check" → §8.3's census row l. 5884, which states every clause (VR-R0-12's resolution, R9 census exception) |
| SCOPE-182 | test | re-checked (target §8.3) | OK — §8.3's r1 change (a tag) does not touch it |
| SCOPE-183 | test | re-checked (home §13.2) | OK — word-identical to r0; §5.2 F-OUTLINE now points to this outline property test; DETERMINISM-037 / PIPELINE-064 / -262 unions present |
| SCOPE-184 | test | re-checked (home §13.2) | OK — word-identical to r0; §5.2 F-BUDGET-STAGE now points to this sweep; "≥ 95 % of seeds" present (l. 7690) |
| SCOPE-185 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-186 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-187 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-188 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-189 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-190 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-191 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-192 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-193 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-194 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-195 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-196 | rule | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-197 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-198 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-199 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-200 | test | re-checked (target §7.3) | OK — §7.3's r1 change (replay mode; item 7 (ii) composition rings) does not touch it |
| SCOPE-201 | test | re-checked (target §7.3) | OK — §7.3's r1 change (replay mode; item 7 (ii) composition rings) does not touch it |
| SCOPE-202 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-203 | test | re-checked (home §13.2) | OK — **V-SCOPE-02 FIXED**: every carried ring simple, the party-wall re-fit, undo of every ring and the replay, the composition's shape (l. 7729–7737) |
| SCOPE-204 | test | re-checked (target §6.5 (9)) | OK — §6.5 (9) truncation identity keeps the redo + user-created entity (l. 4587–4589); §13.2 keeps the reload undo fixture (l. 7723) |
| SCOPE-205 | test | re-checked (home §13.2) | **V-SCOPE-R1-01** — V-SCOPE-03's criteria FIXED (l. 7737–7742); MODEL-408's fixture set-up and MODEL-403's "the mismatch withdraws the keep" still missing |
| SCOPE-206 | test | re-checked (home §13.2) | OK — **V-SCOPE-03 FIXED**: rewritten record → records mismatch, edits re-applied, verified, later corpus selection renames what an unsaved session renames (l. 7744–7747) |
| SCOPE-207 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-208 | test | re-checked (target §6.5 (9)) | OK — **V-SCOPE-08 FIXED** at the home §6.5 (9): lock + unlock pair, case-(4) re-draw listed, confirmed and stored (l. 4589–4592) |
| SCOPE-209 | test | re-checked (target §6.5) | OK — §6.5 (9)'s checks under the recording version unchanged by r1 (l. 4594–4598) |
| SCOPE-210 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-211 | test | re-checked (target §7.4) | OK — §7.4's r1 change (drawn-bridge row pointer) does not touch it |
| SCOPE-212 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds; its other-part members re-read (R13): union present |
| SCOPE-213 | algorithm-step | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-214 | budget | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-215 | evidence | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-216 | rule | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-217 | rule | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-218 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-219 | test | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-220 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-221 | test | kept | r0: OK — stated at the new location |
| SCOPE-222 | rule | kept | r0: OK — stated at the new location |
| SCOPE-223 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-224 | rule | kept | r0: OK — stated at the new location |
| SCOPE-225 | type | kept | r0: OK — stated at the new location |
| SCOPE-226 | interface | kept | r0: OK — stated at the new location |
| SCOPE-227 | interface | kept | r0: OK — stated at the new location |
| SCOPE-228 | interface | kept | r0: OK — stated at the new location |
| SCOPE-229 | rule | kept | r0: OK — stated at the new location |
| SCOPE-230 | rule | kept | r0: OK — stated at the new location |
| SCOPE-231 | rule | kept | r0: OK — stated at the new location |
| SCOPE-232 | test | kept | r0: OK — stated at the new location |
| SCOPE-233 | rule | re-checked (target §6.5 (3)) | OK — §6.5's r1 change is in (9); (3)'s lint scope is unchanged |
| SCOPE-234 | test | kept | r0: OK — stated at the new location |
| SCOPE-235 | rule | kept | r0: OK — stated at the new location |
| SCOPE-236 | rule | kept | r0: OK — stated at the new location |
| SCOPE-237 | rule | kept | r0: OK — stated at the new location |
| SCOPE-238 | rule | kept | r0: OK — pointer present; target §6.4 states it |
| SCOPE-239 | rule | kept | r0: OK — stated at the new location |
| SCOPE-240 | test | re-checked (depends on §6.5 (9), §13.2) | OK — "pool sizes 0 and 3, the contract tests of §13.2 covering 0–3" (l. 7874–7875) agrees with §6.5 (9)'s 0–3; VK-R0-9's resolution recorded in repair-r1-scope.md |
| SCOPE-241 | test | kept | r0: OK — stated at the new location |
| SCOPE-242 | test | kept | r0: OK — stated at the new location |
| SCOPE-243 | test | kept | r0: OK — pointer present; target §9.4 states it |
| SCOPE-244 | test | re-checked (target §8.3) | OK — §8.3's r1 change (a tag) does not touch it |
| SCOPE-245 | acceptance-bar | re-checked (target §8.2) | OK — §8.2's r1 change (the relief tier's contour clip; a tag) does not touch it |
| SCOPE-246 | test | kept | r0: OK — stated at the new location |
| SCOPE-247 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-248 | test | kept | r0: OK — stated at the new location |
| SCOPE-249 | rule | kept | r0: OK — stated at the new location |
| SCOPE-250 | interface | kept | r0: OK — stated at the new location |
| SCOPE-251 | interface | kept | r0: OK — stated at the new location |
| SCOPE-252 | rule | kept | r0: OK — stated at the new location |
| SCOPE-253 | rule | kept | r0: OK — stated at the new location |
| SCOPE-254 | rule | kept | r0: OK — stated at the new location |
| SCOPE-255 | rule | kept | r0: OK — stated at the new location |
| SCOPE-256 | rule | kept | r0: OK — stated at the new location |
| SCOPE-257 | rule | kept | r0: OK — stated at the new location |
| SCOPE-258 | rule | kept | r0: OK — stated at the new location |
| SCOPE-259 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-260 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-261 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-262 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-263 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-264 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-265 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-266 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-267 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-268 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-269 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-270 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-271 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-272 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-273 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-274 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-275 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-276 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-277 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-278 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-279 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-280 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-281 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-282 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-283 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-284 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-285 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-286 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-287 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-288 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-289 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-290 | defined-term | kept | r0: OK — stated at the new location |
| SCOPE-291 | rule | kept | r0: OK — stated at the new location |
| SCOPE-292 | rule | kept | r0: OK — stated at the new location |
| SCOPE-293 | defined-term | kept | r0: OK — stated at the new location |
| SCOPE-294 | interface | kept | r0: OK — stated at the new location |
| SCOPE-295 | rule | kept | r0: OK — stated at the new location |
| SCOPE-296 | rule | kept | r0: OK — stated at the new location |
| SCOPE-297 | rule | kept | r0: OK — stated at the new location |
| SCOPE-298 | rule | kept | r0: OK — stated at the new location |
| SCOPE-299 | rule | kept | r0: OK — stated at the new location |
| SCOPE-300 | algorithm-step | kept | r0: OK — stated at the new location |
| SCOPE-301 | rule | kept | r0: OK — stated at the new location |
| SCOPE-302 | rule | kept | r0: OK — stated at the new location |
| SCOPE-303 | rule | kept | r0: OK — stated at the new location |
| SCOPE-304 | rule | kept | r0: OK — stated at the new location |
| SCOPE-305 | rule | kept | r0: OK — stated at the new location |
| SCOPE-306 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-307 | rule | kept | r0: OK — stated at the new location |
| SCOPE-308 | rule | kept | r0: OK — stated at the new location |
| SCOPE-309 | rule | kept | r0: OK — stated at the new location |
| SCOPE-310 | rule | kept | r0: OK — stated at the new location |
| SCOPE-311 | rule | kept | r0: OK — stated at the new location |
| SCOPE-312 | type | kept | r0: OK — stated at the new location |
| SCOPE-313 | type | kept | r0: OK — stated at the new location |
| SCOPE-314 | type | kept | r0: OK — stated at the new location |
| SCOPE-315 | interface | kept | r0: OK — stated at the new location |
| SCOPE-316 | rule | kept | r0: OK — stated at the new location |
| SCOPE-317 | rule | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-318 | rule | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-319 | rule | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-320 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-321 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-322 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-323 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-324 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-325 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-326 | acceptance-bar | re-checked (home §13.7) | OK — VR-R0-13 resolved: "takes its next alternate (§9.2: its next spine, then §9.4's ladder)" (l. 8151), matching §9.2 l. 6428 and §9.3's candidate order; vetoable (O-R1-4) |
| SCOPE-327 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-328 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-329 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-330 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-331 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-332 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-333 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-334 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-335 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-336 | acceptance-bar | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-337 | rule | re-checked (home §13.7) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-338 | budget | kept | r0: OK — stated at the new location |
| SCOPE-339 | budget | kept | r0: OK — stated at the new location |
| SCOPE-340 | budget | re-checked (§5.2 now points here) | OK — "B-FUZZ 10⁶ per primitive" in the nightly tier (l. 8177) is the size §5.2 F-NUM now cites |
| SCOPE-341 | rule | kept | r0: OK — pointer present; target §12.1 states it |
| SCOPE-342 | budget | kept | r0: OK — stated at the new location |
| SCOPE-343 | rule | kept | r0: OK — stated at the new location |
| SCOPE-344 | rule | kept | r0: OK — stated at the new location |
| SCOPE-345 | interface | kept | r0: OK — stated at the new location |
| SCOPE-346 | algorithm-step | kept | r0: OK — stated at the new location |
| SCOPE-347 | rule | kept | r0: OK — stated at the new location |
| SCOPE-348 | interface | kept | r0: OK — stated at the new location |
| SCOPE-349 | interface | kept | r0: OK — stated at the new location |
| SCOPE-350 | interface | kept | r0: OK — stated at the new location |
| SCOPE-351 | interface | kept | r0: OK — stated at the new location |
| SCOPE-352 | interface | kept | r0: OK — stated at the new location |
| SCOPE-353 | interface | kept | r0: OK — stated at the new location |
| SCOPE-354 | interface | kept | r0: OK — stated at the new location |
| SCOPE-355 | interface | kept | r0: OK — stated at the new location |
| SCOPE-356 | interface | kept | r0: OK — stated at the new location |
| SCOPE-357 | interface | kept | r0: OK — stated at the new location |
| SCOPE-358 | interface | kept | r0: OK — stated at the new location |
| SCOPE-359 | interface | kept | r0: OK — stated at the new location |
| SCOPE-360 | interface | kept | r0: OK — stated at the new location |
| SCOPE-361 | interface | kept | r0: OK — stated at the new location |
| SCOPE-362 | interface | kept | r0: OK — stated at the new location |
| SCOPE-363 | interface | kept | r0: OK — stated at the new location |
| SCOPE-364 | restatement | kept | r0: OK — paraphrase or pointer present; target states it |
| SCOPE-365 | rule | kept | r0: OK — stated at the new location |
| SCOPE-366 | rule | kept | r0: OK — stated at the new location |
| SCOPE-367 | rule | re-checked (target §6.5 (3)) | OK — §6.5's r1 change is in (9); (3)'s lint scope and vendored scan are unchanged |
| SCOPE-368 | rule | kept | r0: OK — stated at the new location |
| SCOPE-369 | interface | kept | r0: OK — stated at the new location |
| SCOPE-370 | type | kept | r0: OK — stated at the new location |
| SCOPE-371 | interface | kept | r0: OK — stated at the new location |
| SCOPE-372 | interface | kept | r0: OK — stated at the new location |
| SCOPE-373 | defined-term | re-checked (target §6.1) | OK — §6.1's r1 change (stamp-tile key components) does not touch it |
| SCOPE-374 | type | kept | r0: OK — stated at the new location |
| SCOPE-375 | interface | kept | r0: OK — stated at the new location |
| SCOPE-376 | interface | kept | r0: OK — stated at the new location |
| SCOPE-377 | interface | kept | r0: OK — stated at the new location |
| SCOPE-378 | interface | kept | r0: OK — stated at the new location |
| SCOPE-379 | interface | kept | r0: OK — stated at the new location |
| SCOPE-380 | interface | kept | r0: OK — stated at the new location |
| SCOPE-381 | interface | kept | r0: OK — pointer present; target §9.2 states it |
| SCOPE-382 | interface | kept | r0: OK — stated at the new location |
| SCOPE-383 | interface | re-checked (target §8.9) | OK — `TileAddress`, `TileRasterOpts`, `TileBackend`, `RasterJob` declared in §8.9 |
| SCOPE-384 | interface | re-checked (target §8.9) | OK — r0's "present" corrected: `VectorBackend` was declared nowhere at r0 (VR-R0-1); now §8.9 l. 6172, identical to the archive's §14 line; §14's pointer (l. 8325) resolves |
| SCOPE-385 | interface | kept | r0: OK — stated at the new location |
| SCOPE-386 | interface | kept | r0: OK — stated at the new location |
| SCOPE-387 | rule | kept | r0: OK — stated at the new location |
| SCOPE-388 | interface | kept | r0: OK — stated at the new location |
| SCOPE-389 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-390 | rule | kept | r0: OK — stated at the new location |
| SCOPE-391 | rule | kept | r0: OK — stated at the new location |
| SCOPE-392 | rule | kept | r0: OK — stated at the new location |
| SCOPE-393 | rule | kept | r0: OK — stated at the new location |
| SCOPE-394 | defined-term | kept | r0: OK — stated at the new location |
| SCOPE-395 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-396 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-397 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-398 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-399 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-400 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-401 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-402 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-403 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-404 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-405 | restatement | kept | r0: OK — pointer present; target §12.5 states it |
| SCOPE-406 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-407 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-408 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-409 | rule | kept | r0: OK — stated at the new location |
| SCOPE-410 | defined-term | kept | r0: OK — stated at the new location |
| SCOPE-411 | rule | kept | r0: OK — stated at the new location |
| SCOPE-412 | rule | kept | r0: OK — stated at the new location |
| SCOPE-413 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-414 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-415 | acceptance-bar | re-checked (§5.2 now points here) | OK — O3 (a) "B-FUZZ … 0 crash / hang / invalid output" matches §13.1's bar, which §5.2 F-NUM cites with O3 a |
| SCOPE-416 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-417 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-418 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-419 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-420 | acceptance-bar | re-checked (§5.2 now points here) | OK — O18 (f) "institutions placed 100 %, never gives up" is compatible with §5.2 F-SITING's "O18 (f) (§15.2): 100 % of institutions on a plot meeting their requirement" (O-R1-6) |
| SCOPE-421 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-422 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-423 | acceptance-bar | re-checked (target §4.9) | OK — §4.9's r1 change (trees-at-render layouts) does not touch it |
| SCOPE-424 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-425 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-426 | acceptance-bar | re-checked (home §13.2) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-427 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-428 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-429 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-430 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-431 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-432 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-433 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-434 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-435 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-436 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-437 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-438 | acceptance-bar | kept | r0: OK — stated at the new location |
| SCOPE-439 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-440 | budget | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-441 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-442 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-443 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-444 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-445 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-446 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-447 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-448 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-449 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-450 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-451 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-452 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-453 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-454 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-455 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-456 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-457 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-458 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-459 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-460 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-461 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-462 | acceptance-bar | re-checked (home §16) | OK — M3a exit points to "the carve fixtures of §13.1–§13.2 (§3.3's clear regions)" (l. 8648); the four fixtures it listed, with their bars, are in §13.1 (l. 7567–7581) |
| SCOPE-463 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-464 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-465 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-466 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-467 | acceptance-bar | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-468 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-469 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-470 | budget | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-471 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-472 | budget | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-473 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-474 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-475 | rule | re-checked (home §16) | OK — word-identical to r0 (re-flow only); r0 verdict holds |
| SCOPE-476 | rule | re-checked (home §16) | OK — **V-SCOPE-11 FIXED**: "places after the base — stage 2 at M5 above, the others staged by the owner —" (l. 8703–8704), as the Staged preface (l. 9640–9642) |
| SCOPE-477 | rule | kept | r0: OK — stated at the new location |
| SCOPE-478 | rule | kept | r0: OK — stated at the new location |
| SCOPE-479 | rule | kept | r0: OK — stated at the new location |
| SCOPE-480 | rule | kept | r0: OK — stated at the new location |
| SCOPE-481 | test | kept | r0: OK — stated at the new location |
| SCOPE-482 | test | kept | r0: OK — stated at the new location |
| SCOPE-483 | test | kept | r0: OK — stated at the new location |
| SCOPE-484 | test | kept | r0: OK — stated at the new location |
| SCOPE-485 | test | kept | r0: OK — stated at the new location |
| SCOPE-486 | test | kept | r0: OK — stated at the new location |
| SCOPE-487 | rule | kept | r0: OK — stated at the new location |
| SCOPE-488 | evidence | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-489 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-490 | rule | kept | r0: OK — stated at the new location |
| SCOPE-491 | rule | kept | r0: OK — stated at the new location |
| SCOPE-492 | mechanism | kept | r0: OK — stated at the new location |
| SCOPE-493 | rule | kept | r0: OK — stated at the new location |
| SCOPE-494 | rule | kept | r0: OK — stated at the new location |
| SCOPE-495 | rule | kept | r0: OK — stated at the new location |
| SCOPE-496 | rule | kept | r0: OK — stated at the new location |
| SCOPE-497 | rule | kept | r0: OK — stated at the new location |
| SCOPE-498 | rule | kept | r0: OK — stated at the new location |
| SCOPE-499 | rule | kept | r0: OK — stated at the new location |
| SCOPE-500 | decision | kept | r0: OK — stated at the new location |
| SCOPE-501 | rule | kept | r0: OK — stated at the new location |
| SCOPE-502 | decision | kept | r0: OK (proprietary default kept; RULING-1 is the owner's) |
| SCOPE-503 | rule | kept | r0: OK — stated at the new location |
| SCOPE-504 | rule | kept | r0: OK — stated at the new location |
| SCOPE-505 | rule | kept | r0: OK — stated at the new location |
| SCOPE-506 | rule | kept | r0: OK — stated at the new location |
| SCOPE-507 | decision | kept | r0: OK — stated at the new location |
| SCOPE-508 | rule | kept | r0: OK — stated at the new location |
| SCOPE-509 | rule | kept | r0: OK — stated at the new location |
| SCOPE-510 | decision | kept | r0: OK — stated at the new location |
| SCOPE-511 | decision | kept | r0: OK — stated at the new location |
| SCOPE-512 | decision | kept | r0: OK — stated at the new location |
| SCOPE-513 | decision | kept | r0: OK — stated at the new location |
| SCOPE-514 | decision | kept | r0: OK — stated at the new location |
| SCOPE-515 | decision | kept | r0: OK — stated at the new location |
| SCOPE-516 | decision | kept | r0: OK — stated at the new location |
| SCOPE-517 | decision | kept | r0: OK — stated at the new location |
| SCOPE-518 | decision | kept | r0: OK — stated at the new location |
| SCOPE-519 | decision | kept | r0: OK — stated at the new location |
| SCOPE-520 | decision | kept | r0: OK — stated at the new location |
| SCOPE-521 | decision | kept | r0: OK — stated at the new location |
| SCOPE-522 | decision | kept | r0: OK — stated at the new location |
| SCOPE-523 | decision | kept | r0: OK — stated at the new location |
| SCOPE-524 | decision | kept | r0: OK — stated at the new location |
| SCOPE-525 | decision | kept | r0: OK — stated at the new location |
| SCOPE-526 | decision | kept | r0: OK — stated at the new location |
| SCOPE-527 | decision | kept | r0: OK — stated at the new location |
| SCOPE-528 | decision | kept | r0: OK — stated at the new location |
| SCOPE-529 | decision | kept | r0: OK — stated at the new location |
| SCOPE-530 | decision | kept | r0: OK — stated at the new location |
| SCOPE-531 | decision | kept | r0: OK (RULING-1 is the owner's) |
| SCOPE-532 | decision | kept | r0: OK — stated at the new location |
| SCOPE-533 | decision | kept | r0: OK — stated at the new location |
| SCOPE-534 | decision | kept | r0: OK — stated at the new location |
| SCOPE-535 | decision | kept | r0: OK — stated at the new location |
| SCOPE-536 | decision | kept | r0: OK — stated at the new location |
| SCOPE-537 | decision | kept | r0: OK — stated at the new location |
| SCOPE-538 | decision | kept | r0: OK — stated at the new location |
| SCOPE-539 | decision | kept | r0: OK — stated at the new location |
| SCOPE-540 | decision | kept | r0: OK — stated at the new location |
| SCOPE-541 | decision | kept | r0: OK — stated at the new location |
| SCOPE-542 | decision | kept | r0: OK — stated at the new location |
| SCOPE-543 | decision | kept | r0: OK — stated at the new location |
| SCOPE-544 | decision | kept | r0: OK — stated at the new location |
| SCOPE-545 | rule | kept | r0: OK — stated at the new location |
| SCOPE-546 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-547 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-548 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-549 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-550 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-551 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-552 | mapping | kept | r0: OK — stated at the new location |
| SCOPE-553 | history | kept | r0: OK — stated at the new location |
| SCOPE-554 | history | kept | r0: OK — stated at the new location |
| SCOPE-555 | rule | kept | r0: OK — stated at the new location |
| SCOPE-556 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-557 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-558 | rule | kept | r0: OK — stated at the new location |
| SCOPE-559 | history | kept | r0: OK — verbatim in the rationale file (Part B / C / E / A preface) |
| SCOPE-560 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-561 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-562 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-563 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-564 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-565 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-566 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-567 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-568 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-569 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-570 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-571 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-572 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-573 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-574 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-575 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-576 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-577 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-578 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-579 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-580 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-581 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-582 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-583 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-584 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-585 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-586 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-587 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-588 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-589 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-590 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-591 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-592 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-593 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-594 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-595 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-596 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-597 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-598 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-599 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-600 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-601 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-602 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-603 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-604 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-605 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-606 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-607 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-608 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-609 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-610 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-611 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-612 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-613 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-614 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-615 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-616 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-617 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-618 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-619 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-620 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-621 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-622 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-623 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-624 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-625 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-626 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-627 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-628 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-629 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-630 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-631 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-632 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-633 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-634 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-635 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-636 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-637 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-638 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-639 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-640 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-641 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-642 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-643 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-644 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-645 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-646 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-647 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-648 | decision | re-checked (Judgment calls, rationale) | OK — **V-SCOPE-10 FIXED**: Part A row amended with KERNEL-357's split key (rationale l. 136), F.2 heading without the instruction (l. 1106), index row "…, keyed by their route edge's endpoints" (l. 9447) |
| SCOPE-649 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-650 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-651 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-652 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-653 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-654 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-655 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-656 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-657 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-658 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-659 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-660 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-661 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-662 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-663 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-664 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-665 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-666 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-667 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-668 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-669 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-670 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-671 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-672 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-673 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-674 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-675 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-676 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-677 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-678 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-679 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-680 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-681 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-682 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-683 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-684 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-685 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-686 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-687 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-688 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-689 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-690 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-691 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-692 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-693 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-694 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-695 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-696 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-697 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-698 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-699 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-700 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-701 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-702 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-703 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-704 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-705 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-706 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-707 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-708 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-709 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-710 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-711 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-712 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-713 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-714 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-715 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-716 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-717 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-718 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-719 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-720 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-721 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-722 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-723 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-724 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-725 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-726 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-727 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-728 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-729 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-730 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-731 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-732 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-733 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-734 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-735 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-736 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-737 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-738 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-739 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-740 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-741 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-742 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-743 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-744 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-745 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-746 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-747 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-748 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-749 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-750 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-751 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-752 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-753 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-754 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-755 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-756 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-757 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-758 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-759 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-760 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-761 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-762 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-763 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-764 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-765 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-766 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-767 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-768 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-769 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-770 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-771 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-772 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-773 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-774 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-775 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-776 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-777 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-778 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-779 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-780 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-781 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-782 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-783 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-784 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-785 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-786 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-787 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-788 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-789 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-790 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-791 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-792 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-793 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-794 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-795 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-796 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-797 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-798 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-799 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-800 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-801 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-802 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-803 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-804 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-805 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-806 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-807 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-808 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-809 | decision | re-checked (Judgment calls, rationale) | OK — **V-SCOPE-12 FIXED**: index row "the unpriced-mechanisms line of §16's effort table …" (l. 9614) |
| SCOPE-810 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-811 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-812 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-813 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-814 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-815 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-816 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-817 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-818 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-819 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-820 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-821 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-822 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-823 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-824 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-825 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-826 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-827 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-828 | decision | re-checked (Judgment calls) | OK — index row and Part A row unchanged by r1 (diffs); r0 verdict holds |
| SCOPE-C01 | conflict | re-checked | RESOLVED — unchanged; §12.9's r1 change is a tag; 1.8× / 2.3× / 5.1× at l. 7504, §12.3 l. 7137–7139 |
| SCOPE-C02 | conflict | kept | r0: resolved as the canon rules (§4 of this file) |
| SCOPE-C03 | conflict | re-checked | RESOLVED — §13.2's campaign word-identical to r0; "≥ 99.5 %" 0 hits |
| SCOPE-C04 | conflict | kept | r0: resolved as the canon rules (§4 of this file) |
| SCOPE-C05 | conflict | re-checked | RESOLVED — §3.7 (kernel r1) still states the one case Clipper2 ships; §1.7 l. 289, §16 l. 8698, §17.4 l. 8885, D-14 l. 9238 point to it |
| SCOPE-C06 | conflict | re-checked | RESOLVED — VS5-1's §16 M1 text unchanged (l. 8645); §2.9 step 5 agrees |
| SCOPE-C07 | conflict | re-checked | RESOLVED — VD5-7's §16 M2a / M3a text unchanged except M3a's carve-fixture pointer |
| SCOPE-C08 | conflict | kept | r0: resolved as the canon rules (§4 of this file) |
| SCOPE-C09 | conflict | re-checked | INVALID per canon — unchanged (§3.2's r1 change is a tag at item 6) |
| SCOPE-C10 | conflict | re-checked | RESOLVED — §16 M3b and "CityJSON is built (§11.1)" unchanged (l. 8649, 8705) |
| SCOPE-C11 | conflict | re-checked | RESOLVED — one list; §16's closing now agrees with it (V-SCOPE-11) |
