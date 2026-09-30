# Consistency verification — MODEL part (§2), round 1

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-model-r1`, 2026-09-26. Status: COMPLETE. Re-checks `## §2 Domain model and schemas` of
`docs/ARCHITECTURE.md` (sha256 `ddd48f07…`, 9 670 lines; §2 = l. 298–1524) after repair round 1, against the archive
`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`, `inventory-model.json`, `canon.json`, `rewrite-model.md`'s
mapping table, the six `repair-r1-*.md` files and the round-0 report `verify-model-r0.md` (cited as "r0").

**Method.** The pre-repair document was regenerated with `assemble-r0.py` (sha256 `ee314f23…`, equal to assemble-r1's
"before") and diffed against the current one: 114 hunks, all inside the 49 replaced subsections. Every hunk was read;
each one that changes a statement (62; the other 52 only drop fix-round tags) was mapped to the model
ids whose home or reference it touches (§4). Every r0 issue was re-read at its place (§3). Every pointer into §2 that r1
added was resolved, and a scan paired every number in §2 with the § pointer beside it. An id whose home and references
all lie outside the replaced subsections keeps its r0 verdict (63 ids, marked "kept" in §8); the other 368 were
re-checked.

## 1. Outcome

All 13 r0 issues are fixed, each confirmed at its place (§3). Two new minor issues, no blocker or major. Both were
already present at r0 and my r0 report missed them; the re-check of the touched subsections found them:

* **V-MODEL-R1-01** (scope): three archived details of the load-verification fixtures are still missing from §13.2.
* **V-MODEL-R1-02** (model): §2.6 wing rule 4's cost paragraph credits the 25 µs compound bound to §3.7. §3.7 does not
  state it; the figure lives in §12.4's S11 row.

No open item is owned by this part (UNFIXED: none). The seven routed open-item edits are still present. The canon
conflicts are still resolved as ruled, and MODEL-C08, C09, C10 and C11 now also agree in the other parts' text. Round 1
introduced no new problem in §2. The four §2 hunks are exactly the model repair's four substitutions, each block
appears verbatim once in the document, every pointer resolves, and §2 holds no deferral wording, no fix-round tag and no
review marker. Verdicts over the 431 ids: 428 OK, 2 on V-MODEL-R1-01 (MODEL-403, MODEL-408) and 1 on V-MODEL-R1-02
(MODEL-255).

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| V-MODEL-R1-01 | minor | lost | scope | MODEL-403 / MODEL-408. The archive's §2.9 step 3–4 tests (l. 1991–1998, 2026–2030) carried three details that §13.2's load-verification fixtures still lack after V-MODEL-04's repair: (a) the 100 ms case runs on "an edited CITY document"; (b) its mismatch is forced by "a snapshot in which one building's footprint was moved and whose recorded digest was recomputed to match it" — the detail that makes it a step-4 mismatch and not a corrupt cache, which §13.2 builds from the same moved footprint with the digest left unchanged; (c) the forced-§6.2 (iii) case ends "the mismatch withdraws the keep, and the snapshot is never kept", but §13.2 has only "the snapshot is never kept". The rule in (c) is still stated in §6.2 (iii) ("A mismatch withdraws the keep for good"); only the test's pass criterion is lost. All three were already absent at r0; my V-MODEL-04 listed only four criteria. | §13.2 load verification: "an edit within 100 ms of the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint has its recorded digest recomputed to match, each choice taken in turn: …"; forced-(iii) case: "… wait for the recomputation, the mismatch withdraws the keep, and the snapshot is never kept". |
| V-MODEL-R1-02 | minor | broken-reference | model | MODEL-255. §2.6 wing rule 4 *Cost* (l. 963) reads "bounded by S11's compound geometry share (≤ 25 µs, §3.7; PLAUSIBLE)". §3.7's M0 criterion (ii), as re-read after H44, states S11's bar only as "S11's geometry share against its §12.4 row". Neither r0's nor r1's §3.7 contains "25 µs". Under canon R8 the figure's home is §12.4's S11 row (RENDERING-524: "compound ≤ 40 µs (25 + 15)"), and KERNEL-318 is a restatement of it. The pointer has been stale since the r0 rewrite. | §2.6 rule 4: "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)". |

## 3. The r0 issues — all fixed

| r0 issue | owner | repaired by (hunk, document line) | now reads | verdict |
|---|---|---|---|---|
| V-MODEL-01 | kernel | repair-kernel-r1, §3.4 (H28, l. 1972) | `resolve` … "current slots, stamped with the arena version — valid until the next commit (a debug build asserts the version)" | FIXED |
| V-MODEL-02 | scope | repair-scope-r1, §13.1 (H107, l. 7640) | "a 3 000 m relief fixture with a hill-acropolis site stores without a clamp" | FIXED |
| V-MODEL-03 | scope | repair-scope-r1, §13.2 (H109, l. 7729–7737) | "every carried ring simple", "a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall", "undo restoring every ring byte for byte and a replay reproducing them", and the composition's shape ("its composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on a corner and one inside, rooms in one wing") | FIXED |
| V-MODEL-04 | scope | repair-scope-r1, §13.2 (H109, l. 7737–7747) | all four required criteria are present: "never offered as the saved town", "the session's digest after the replay equal to a fresh replay's", the corpus-selection clause, and the 100 ms case's "the edit applies at once … and that load reports no mismatch" | FIXED as required; the further details are V-MODEL-R1-01 |
| V-MODEL-05 | determinism | repair-determinism-r1, §6.2 (iii) (H71, l. 4312) | "shown disabled ("checking the saved copy…")" | FIXED |
| V-MODEL-06 | determinism | repair-determinism-r1, §7.7 (H81, l. 5394) | "A blueprint's assignments and edits become `assign` and edit events at log positions 0…k" | FIXED |
| V-MODEL-07 | model, rendering | repair-model-r1, §2.9 step 4 (H5, l. 1448); repair-rendering-r1, §11.3 (H94, l. 7013–7021) and §12.8 (H101) | §2.9: the policy "is §11.3's ("Bridged load verification"); what follows is the install mechanics". §11.3: owner-only keep; every other client takes the replayed town, reports, "records its root at `h₀`" and keeps the bytes "(≤ 3 MB at CITY, §2.9's size budget; counted in §12.8) until the mismatch is settled or its session ends". §12.8 now points to §11.3. | FIXED — one statement of the policy remains |
| V-MODEL-08 | model | repair-model-r1, §2.1 (H2, l. 314–316) | "a schema lint refuses any length field that has neither"; angles "`i32` centidegrees, named `…Cdeg` or typed `Cdeg` (§2.8's type list)" — §2.8 declares `Cdeg` | FIXED |
| V-MODEL-09 | model | repair-model-r1, §2.2 rule 3 (H3, l. 437) | "(it lies within the hot pixel of the route it was placed on, §3.6)" — the archive's wording (archive l. 666–667); §3.6's placement rule (i) states it | FIXED |
| V-MODEL-10 | model (§7.2: determinism) | repair-model-r1, §2.5 (H4, l. 798); repair-determinism-r1, §7.2 (H76, l. 4818) | §2.5: "compares each plot's current sample with the recorded one and re-derives only what §7.2's τ rule selects"; §7.2: "every block whose plot samples moved — against the samples their `DerivationRecord` holds (§2.8) — by more than τ"; §2.8's `DerivationRecord.fields` holds them | FIXED |
| V-MODEL-11 | kernel | repair-kernel-r1, §3.10 (H54, l. 2492) and §3.9 (H49, l. 2433) | "every indexed role of §2.2 rule 7's registry other than a knot role finds exactly one vertex or edge set per ordinal". Rule 7 marks attach, anchor, weld, deck_end, gate_end, composition, gate_opening and the knot roles indexed, so this is the archive's list plus `composition` | FIXED |
| V-MODEL-12 | pipeline | repair-pipeline-r1, §4.11 (H59, l. 3767) | `footprint?: PolygonCm /* as §7.1's build event */`, as §7.1 l. 4644. The Fable seat's D1 re-check (queue row A-consistency/repair-pipeline-r1) keeps every other `Polygon` single-ring | FIXED |
| V-MODEL-13 | determinism | repair-determinism-r1, §7.3 item 7 (ii) (H78, l. 5052) | "… and, for an edit that stores a stage-3 composition, each face §2.6's composition rule (1) adds to its scope equal to its prior ring after removing the vertices that rule inserted, with the `composition` role rows it adds present" | FIXED (see observation O1) |

## 4. What round 1 changed, mapped to the model ids

Of the 114 hunks (258 lines out, 290 in), 52 only drop fix-round tags (VK…, NF-…, NP…, VP…, VD…, K4-1). The other 62
were read in full. The table lists those that touch a model id's home or reference.

| hunk (line) | subsection | change | model ids | verdict |
|---|---|---|---|---|
| H2 (314) | §2.1 Units | angle-naming clause moved; lint over length fields | MODEL-002, 005, 006 | V-MODEL-08 fixed |
| H3 (437) | §2.2 rule 3 | promotion parenthetical | MODEL-069, 071 | V-MODEL-09 fixed |
| H4 (798) | §2.5 | τ unit deferred to §7.2 | MODEL-214 | V-MODEL-10 fixed |
| H5 (1448) | §2.9 step 4 | bridge policy → §11.3; install mechanics kept | MODEL-404–409 | V-MODEL-07 fixed |
| H1 (108) | §0.2 row 5 | "§2.8 (edit paths in the entity registry, whose completeness test is §13.2's)" | MODEL-353 | agrees with §2.8 l. 1251 |
| H14 (1735) | §3.3 rule 2 | "no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal check)" | MODEL-033, 070, 126, 127 | agrees with rule 7 |
| H19 (1823) | §3.3 pool step 1 | receipt named `fixall_kernel_r4_bench.out` A | MODEL-030, 136 | figures unchanged |
| H28 (1972) | §3.4 | `resolve` validity clause | MODEL-093 | V-MODEL-01 fixed |
| H44 (2326) | §3.7 M0 (ii) | S9's per-district bar restored; S11's bar is "its §12.4 row" | MODEL-255 | → V-MODEL-R1-02 |
| H49 (2433) | §3.9 roles | persisted indexed rows named by rule 7's registry | MODEL-028, 098 | agrees with rule 7 |
| H54 (2492) | §3.10 | stored-reference row by registry | MODEL-028, 118, 119, 126 | V-MODEL-11 fixed |
| H56 (3172) | §4.5 S6 | district `faces` a `FaceRef` (§2.5); containment through `parent` (§2.8) | MODEL-044, 048, 049, 186 | agrees (O2) |
| H57 (3595) | §4.8 | S3's decks → §4.2 S3 (2), (10) | MODEL-312 | stated there |
| H58 (3687) | §4.9 trees row | jittered lines for avenues, street trees and hedgerows | MODEL-288, 289 | now agrees with §2.7's "line layout" |
| H59 (3767) | §4.11 | `build.footprint?: PolygonCm` | MODEL-322, 334 | V-MODEL-12 fixed |
| H69–H71 (4280–4313) | §6.2 | "every in-window load (§2.9 step 3)"; the disabled label | MODEL-319, 321, 351, 388, 399 | MODEL-C09 wording now shared; V-MODEL-05 fixed |
| H73 (4589) | §6.5 (9) | a `lock` + `unlock` pair; the freeing event runs case (4) | MODEL-343–345 | agrees with §2.8's dormancy rule |
| H74, H79 (4728, 5230) | §7.1, §7.4 | drawn bridge placed wholly by §4.2 S1 (5) | MODEL-313–316 | MODEL-C11 tightened |
| H75 (4760) | §7.1 | "its completeness test is §13.2's (§2.8)" | MODEL-353 | agrees |
| H76 (4818) | §7.2 | τ against `DerivationRecord` samples (§2.8) | MODEL-214, 329 | agrees (O4) |
| H77 (4867) | §7.3 item 2 | replay mode names the undo of an upgrade after a reload | MODEL-392, 393 | agrees with §2.9 step 3 |
| H78 (5052) | §7.3 item 7 (ii) | composition faces and role rows | MODEL-260 | V-MODEL-13 fixed |
| H81 (5394) | §7.7 | "assignments and edits" | MODEL-370 | V-MODEL-06 fixed |
| H84 (5722) | §8.2 | contours clipped to land faces in vector space | MODEL-045, 173 | agrees |
| H94 (7015–7026) | §11.3 | whole bridge policy; host commands `author: 'host'` | MODEL-407–409 | V-MODEL-07 fixed |
| H101 (7449) | §12.8 | pointer → §11.3; digest-tree sizes | MODEL-407 | agrees (O3) |
| H104–H107 (7576–7642) | §13.1 | outer-moat fixture; "every other role unchanged"; `insetRing`; acropolis site | MODEL-103, 105, 163, 169 | V-MODEL-02 fixed |
| H109 (7730–7759) | §13.2 | §2.6's test; load-verification criteria | MODEL-264, 403, 408 | V-MODEL-03, V-MODEL-04 fixed; V-MODEL-R1-01 |
| H113 (9447) | Judgment index | J-DET-36 row: splits "keyed by their route edge's endpoints" | MODEL-418 | agrees with §3.9; Part A keeps the moved sentence |

The other substantive hunks touch no model fact: H43 (§3.7 engine id), H55 (§4.2 S1 (2)'s clamp reader), H60–H68
(§5.2 test cells, §5.3, §5.4's warning list, §6.1's stamp-tile key), H72, H80, H82, H87–H88, H92, H95–H96, H98–H99,
H102, H108, H110–H112 and H114.

## 5. Open items, canon conflicts, cross-part

* **Open items:** none owned by §2; UNFIXED: []. The routed §2 edits are still present, read after r1: VK5-1 (§3.9 "the
  vertices that belong to it by §3.3's rebuild rule"), VK5-2 (flags comment and rule 3 (b) "other than knot rows"),
  VK5-3 (rule 3 "by construction for any number of later same-level vertices"), NP5-1 (§2.6 (1)), NP5-4 (`Room`,
  relative `Porch`, `ComposedTower`), VD5-5 (§2.8 l. 1220; §7.3 l. 5040) and VS5-1 (§2.9 step 5 "a document of the running
  output version").
* **Canon conflicts touching §2:** all still resolved as ruled. Round 1 aligned four of them further: MODEL-C08 (§4.11
  `build` now takes `PolygonCm`), MODEL-C09 (§6.2 now says "every in-window load"), MODEL-C10 (the lint is back to
  length fields) and MODEL-C11 (the drawn-bridge rows defer wholly to §4.2 S1 (5)). The rulings on KERNEL-C07
  (§3.2 (2) "value only + class pointer"), CANON-C01 (§8.2 l. 5716 and §8.3 l. 5853 "every `Pin.kind` of §2.7") and
  CF-PIPE-06 (§7.4 and §7.6 point to §2.9's pack set) hold in the replaced text.
* **Cross-part dependencies of the model repair:** its header's one dependency (§11.3 must carry the root at `h₀`,
  ≤ 3 MB and the session end) is met (H94), and the §12.8 pointer it asked rendering for is made (H101).

## 6. Mechanical checks (executed)

* `python3 docs/validation/consistency/assemble-r0.py <scratch>` reproduces sha256 `ee314f23…`, assemble-r1's
  "before". The current document is sha256 `ddd48f07…`. Diff: 114 hunks; the only hunks inside §2 are H2–H5.
* Each of the four `repair-r1-model.md` blocks is found verbatim, exactly once, in the document (script).
* `python3 docs/validation/bench/doc_checks.py --sections "2"`: exit 0. C1 5/0 unreviewed, C2 0, C3 58/0, C4 2/0, S1 0,
  S2 0.
* `assemble-r0-refs.py` on the current document: 134 headings, 35 D-ids, 276 J-ids, 0 broken internal references (the
  same 2 external ones as r0).
* All seven quoted anchors that §2 cites exist: §3.6 "split flag under moves", §3.3 "No item changes in place", §6.2
  "Maintenance", §11.3 "Bridged load verification", §7.4 "Sessions", §2.8 "Regenerate (keep settings)" and §2.9
  "Canonical form and digests".
* All 37 J-ids cited in §2 have an index row and a Part A row. The 28 "rationale out" ids resolve. The scope lane edited
  only Part A's J-DET-36 row and the F.2 heading ("Nothing else in that file changed"), so F.1 is unchanged.
* Number-and-pointer scan of §2: every number that §2 attributes to another section appears there, except the 25 µs
  (V-MODEL-R1-02). The reverse scan over the rest of the document finds no figure attributed to §2 that §2 lacks
  (§7.3's "≈ 16–17 ms, §2.3" rounds §2.3's 15.9–17.2 ms).
* Tag and deferral scans of §2: 0 fix-round tags. The only "later" is temporal, and there is no "PENDING FABLE REVIEW"
  line; the document keeps one banner.

## 7. Observations (not issues)

* **O1 (V-MODEL-13's edge).** §2.6 (1) also puts "a row neighbour's wing rings" into the storing edit's scope. §7.3
  item 7 (ii)'s new clause names faces; the wing rings fall under the clause's first half ("each excepted … footprint and
  wing ring (a stored composition's rings included, §2.6)"). PLAUSIBLE; no change.
* **O2 (§4.5's `parent`, pipeline).** "The finer faces inherit the district through `parent` (§2.8)". The face nesting is
  `LevelFaces.parent` (§2.2), while the record containment that §5.3's row counts (building ⊂ plot ⊂ block ⊂ district) is
  `Identity.parent` (§2.8). The pipeline's Fable seat chose §2.8, and either reading holds. PLAUSIBLE; no change.
* **O3 (§12.8, rendering).** "keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled (§11.3)" leaves
  out "or its session ends". As a memory bound it is still true, and it points to the full rule. No change.
* **O4 (epochs under §2.5's τ sentence).** "A field brush or an epoch … re-derives only what §7.2's τ rule selects" is
  the archive's scope (archive l. 1236–1238). For an epoch, §4.11 changes survivors only by rate-limited transformation
  events, so "only" reads as an upper bound and there is no conflict. PLAUSIBLE.
* **O5 (cosmetic).** H5 left a short line in §2.9 step 4 ("… when that `rebase`" / "arrives stops it"). It renders as one
  paragraph.
* **O6 (for the rendering and kernel verifiers).** §12.7's stage-3 hook bullet (not replaced in r1) cites "(≤ 3 µs per
  plot median, §3.7)". §3.7 states that bar as "against its §12.4 row", and the figure is §12.4's. This is the same
  pattern as V-MODEL-R1-02, but it resolves in two hops. PLAUSIBLE.
* **O7 (pipeline/determinism, noted by the pipeline Fable seat).** §4.11's `build` member ("`build` below is §7.1's
  `build` event") lacks §7.1's optional `use?` and `heights?`. The archive had the same difference (archive l. 4839–4846
  vs 5848), so it predates this pass. This is not a model item.
* **Tag style:** as at r0, §2 keeps its requirement and audit ids. The document-wide convention is the validator's or
  Fable's to rule.

CONFIRMED vs PLAUSIBLE: CONFIRMED (executed or read at the place) — the 13 fixes in §3, both new issues, every verdict
tied to a hunk in §4 and the mechanical checks in §6. PLAUSIBLE (a reading of intent) — O1, O2, O4, O6. The 63 "kept"
verdicts rest on r0's reading of text that r1 did not change.

## 8. Checked list — every inventory id (431)

Verdicts: **OK** (same meaning at the mapped place; for a reference, the target still states the fact) or the issue
id. "re-checked": the id's home or a reference lies in a replaced subsection, and it was re-verified against the diff
(the note names the hunk where one touched it). "kept": the home and every reference lie outside the replaced
subsections, and r0's verdict stands (`verify-model-r0.md` §9).

| id | disposition | r1 verdict | how | note |
|---|---|---|---|---|
| MODEL-001 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: intro kept; "added later" reworded to "owner-staged … need no change of the model" (no deferral wording)) |
| MODEL-002 | state | OK | re-checked | §2.1 Units: H2 moved the angle-naming clause into the angle sentence; lengths, origin, axes unchanged |
| MODEL-003 | reference | OK | re-checked | text at its place and at §2.1, §3.2 unchanged by r1 at this fact (diff) — r0: pointer "inside the arena frame of §3.2 (9)"; §3.2 (9) states area × aspect frames (read) |
| MODEL-004 | reference | OK | re-checked | text at its place and at §2.1, §3.2 unchanged by r1 at this fact (diff) — r0: pointer to §3.2 (6); §3.2 (6) states area2 exact twice-areas and orient2d orientation (… |
| MODEL-005 | state | OK | re-checked | H2 re-worded the sentence; stored angles still "`i32` centidegrees", directions still §3.2 (5)'s (CANON-C02; §3.2 (5) read) |
| MODEL-006 | state | OK | re-checked | **V-MODEL-08 fixed** (H2): the lint again refuses "any length field that has neither" (O6 (a), G-R14); stored angles "`i32` centidegrees, named `…Cdeg` or typed `Cdeg`" — §2.8's type list declares `Cdeg` (read); MODEL-C10 as ruled |
| MODEL-007 | state | OK | re-checked | text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Layers — present |
| MODEL-008 | state | OK | re-checked | text at its place and at §2.1, §2.2 unchanged by r1 at this fact (diff) — r0: §2.1 Layers (arena per layer, PlatKey) + §2.2 rule 2 (never cut ground faces; cross-are… |
| MODEL-009 | section restatement | OK | re-checked | text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: section restatement; §8.4 states sky shadows onto ground and `exportSeparately` (read) |
| MODEL-010 | state | OK | re-checked | text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Layers — present |
| MODEL-011 | reference | OK | re-checked | text at its place and at §2.1, §7.1 unchanged by r1 at this fact (diff) — r0: §8.4 declares LayerSpec (read) |
| MODEL-012 | state | OK | re-checked | text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Layers wording — present |
| MODEL-013 | state | OK | re-checked | text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §2.1 Ids — present |
| MODEL-014 | reference | OK | re-checked | text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: §6.3 states the two identities, anchor/hysteresis table, succession, JOIN, collision ru… |
| MODEL-015 | state | OK | re-checked | text at its place and at §2.1, §2.2 unchanged by r1 at this fact (diff) — r0: §2.1 Ids (interned u32 / strings; parent a field; the arena-slot clause points to §2.2 … |
| MODEL-016 | state | OK | re-checked | text at its place and at §2.2, §2.1 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-017 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-018 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-019 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-020 | state | OK | re-checked | text at its place and at §2.2, §3.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-021 | state | OK | re-checked | unchanged; §3.4's `opts.pinned` and `pinVertices` comments lost only their fix-round tags (H24, H27) and still say only `pinVertices` sets the flag |
| MODEL-022 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types (vertices.level) — present |
| MODEL-023 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types (halfEdges) — present |
| MODEL-024 | state | OK | re-checked | text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-025 | state | OK | re-checked | text at its place and at §2.2, §3.10, §3.2 unchanged by r1 at this fact (diff) — r0: literal values kept (D6), agree with §3.2 (1)–(2); "soft" dropped (KERNEL-C07) |
| MODEL-026 | state | OK | re-checked | text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 LevelFaces — present |
| MODEL-027 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 RoleTable — present |
| MODEL-028 | state | OK | re-checked | **V-MODEL-11 fixed** (H54): §3.10's row now "every indexed role of §2.2 rule 7's registry other than a knot role" = attach, anchor, weld, deck_end, gate_end, composition, gate_opening (rule 7 read); §3.9's roles row names them by the same registry (H49) |
| MODEL-029 | state | OK | re-checked | text at its place and at §2.2, §3.3, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 comment after RoleTable (J-K22) — present |
| MODEL-030 | reference | OK | re-checked | §3.3 pool step 1 copy text unchanged except its receipt name (H19) |
| MODEL-031 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-032 | state | OK | re-checked | §3.3 "Tombstones and rebuilds" and pool step 1 unchanged except tags (H23) |
| MODEL-033 | state | OK | re-checked | §3.3 rule 2 (kernel allocation) unchanged; r1 added the anchor-key uniqueness clause (H14) |
| MODEL-034 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-035 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types comment — present |
| MODEL-036 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-037 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-038 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-039 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-040 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-041 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: comment points to rule 5 (MODEL-C07); alias in §2.8 (MODEL-C08) |
| MODEL-042 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-043 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 types — present |
| MODEL-044 | state | OK | re-checked | §2.2 rule 1 byte-identical; §4.5's restored sentence (H56: finer faces nested in the district's L1 faces, containment 100 % by construction) agrees |
| MODEL-045 | state | OK | re-checked | §2.2 rule 1 byte-identical; §8.2 now also says contours are clipped to the land faces in vector space before emission (H84) — they stay raster products, never plat edges |
| MODEL-046 | state | OK | re-checked | text at its place and at §2.2, §3.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present |
| MODEL-047 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present |
| MODEL-048 | state | OK | re-checked | §2.2 rule 1 byte-identical; §4.5's restored sentence (H56: finer faces nested in the district's L1 faces, containment 100 % by construction) agrees |
| MODEL-049 | state | OK | re-checked | §2.2 rule 1 byte-identical; §4.5's restored sentence (H56: finer faces nested in the district's L1 faces, containment 100 % by construction) agrees |
| MODEL-050 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present |
| MODEL-051 | reference | OK | re-checked | §3.7 `bandUnion` and §4.8 wall strips unchanged (H44 and H57 are elsewhere in those subsections) |
| MODEL-052 | state | OK | re-checked | text at its place and at §2.2, §3.3, §4.9 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present |
| MODEL-053 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present |
| MODEL-054 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 1 — present |
| MODEL-055 | state | OK | re-checked | text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present |
| MODEL-056 | reference | OK | re-checked | text at its place and at §2.2, §3.10 unchanged by r1 at this fact (diff) — r0: §3.10 nesting row (read) |
| MODEL-057 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present |
| MODEL-058 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present |
| MODEL-059 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present |
| MODEL-060 | state | OK | re-checked | text at its place and at §2.2, §2.1 unchanged by r1 at this fact (diff) — r0: §2.2 rule 2 — present |
| MODEL-061 | state | OK | re-checked | text at its place and at §2.2, §3.3, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present |
| MODEL-062 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present |
| MODEL-063 | state | OK | re-checked | text at its place and at §2.2, §3.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present |
| MODEL-064 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present |
| MODEL-065 | state | OK | re-checked | text at its place and at §2.2, §6.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present |
| MODEL-066 | state | OK | re-checked | text at its place and at §2.2, §3.10, §3.6, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (J-K32 sentence; standing-distance figures referenced to §3.6/§3.10) — pres… |
| MODEL-067 | reference | OK | re-checked | text at its place and at §2.2, §3.10, §3.6, Judgment index unchanged by r1 at this fact (diff) — r0: §3.6 placement-rule paragraph carries 1.25 / 1.36 / 1.49 cm with both receipts (read) |
| MODEL-068 | reference | OK | re-checked | text at its place and at §2.2, §3.10, §3.3, §3.6, Judgment index unchanged by r1 at this fact (diff) — r0: §3.10 placement-bound row + §3.3 route-edge boxes (read) |
| MODEL-069 | state | OK | re-checked | **V-MODEL-09 fixed** (H3): "(it lies within the hot pixel of the route it was placed on, §3.6)" — the archive's wording; §3.6 placement rule (i) states the 0.71 cm hot pixel at placement (read) |
| MODEL-070 | reference | OK | re-checked | §3.3 clear-region rules 1–3 read after r1: tags dropped (H9–H13) and rule 2 gains the anchor-key uniqueness clause (H14); §3.6 candidate (c) unchanged |
| MODEL-071 | state | OK | re-checked | promotion paragraph re-flowed by H3; content (clear regions → §3.3; deck span; J-I12) unchanged |
| MODEL-072 | state | OK | re-checked | text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 — present |
| MODEL-073 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 "The split flag" (clearing (b) → §3.6) — present |
| MODEL-074 | reference | OK | re-checked | text at its place and at §2.2, §3.6, §3.4 unchanged by r1 at this fact (diff) — r0: §3.6 "The `split` flag under moves" states (b)/(b′) (read); §2.2 keeps (a), (c) and nam… |
| MODEL-075 | reference | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §3.6 flag-under-moves paragraph carries the warped-T-junction consequence (read) |
| MODEL-076 | state | OK | re-checked | text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 demotion — present |
| MODEL-077 | state | OK | re-checked | text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (a) — present |
| MODEL-078 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (b) — present |
| MODEL-079 | state | OK | re-checked | VK5-2 wording unchanged in §2.2; §3.4 comments lost only tags (H24, H27) |
| MODEL-080 | state | OK | re-checked | text at its place and at §2.2, §3.6, §4.2, §3.3, §7.3 unchanged by r1 at this fact (diff) — r0: placement list → §4.2 S1 (5), which lists L1 (preparation) and L0 (S1, S3, S4/S5b/edit … |
| MODEL-081 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 (c) — present |
| MODEL-082 | state | OK | re-checked | text at its place and at §2.2, §3.6, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 demotion (c) (the flag is the whole guard) — present |
| MODEL-083 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 3 "So a plot-line end…" — present |
| MODEL-084 | state | OK | re-checked | text at its place and at §2.2, §3.10, Judgment index unchanged by r1 at this fact (diff) — r0: VK5-3 wording applied; 0.54–0.66 % now only in J-K28 (rationale Part A row and F.1, rea… |
| MODEL-085 | reference | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §3.6 (read) |
| MODEL-086 | reference | OK | re-checked | text at its place and at §2.2, §3.3, §3.6, §6.2, §7.4 unchanged by r1 at this fact (diff) — r0: §3.3 "No item changes in place" / "What each level's index holds" and §3.6 step 5 (read) |
| MODEL-087 | reference | OK | re-checked | §3.10 level-consistency row unchanged except its tag (H53) |
| MODEL-088 | reference | OK | re-checked | text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §3.4 doors paragraph and §3.6 steps 1–5 (read) |
| MODEL-089 | reference | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: still stated in rule 4 with pointer; §3.6 step 5 states the local re-walk (read) |
| MODEL-090 | state | OK | re-checked | text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 — present |
| MODEL-091 | state | OK | re-checked | text at its place and at §2.2, §2.1 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 (plus the canon's non-vertex-points clause, MODEL-C07) — present |
| MODEL-092 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 — present |
| MODEL-093 | reference | OK | re-checked | **V-MODEL-01 fixed** (H28): §3.4 `resolve` "current slots, stamped with the arena version — valid until the next commit (a debug build asserts the version)" |
| MODEL-094 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 — present |
| MODEL-095 | state | OK | re-checked | text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 Stretches (J-K31) — present |
| MODEL-096 | state | OK | re-checked | text at its place and at §2.2, §3.10, §3.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 Stretches — present |
| MODEL-097 | reference | OK | re-checked | text at its place and at §2.2, §3.4 unchanged by r1 at this fact (diff) — r0: §3.4 Stretches paragraph (read) |
| MODEL-098 | state | OK | re-checked | unchanged; §3.9's roles row (H49) persists "every role §2.2 rule 7's registry marks indexed, the knot roles among them" — rule 7 marks the knot roles indexed (read) |
| MODEL-099 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attributes — present |
| MODEL-100 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attributes — present |
| MODEL-101 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attributes — present |
| MODEL-102 | state | OK | re-checked | text at its place and at §2.2, §3.7, §6.2, §3.4 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 chain attributes — present |
| MODEL-103 | state | OK | re-checked | §2.2 rule 5 byte-identical; §13.1's knot fixture (r4_checks C) gained "every other role unchanged" (H105) — compatible |
| MODEL-104 | history out | OK | re-checked | text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: history out; receipt "≤ 6.8 × 10⁻¹³ cm … r3_checks.out B" kept; 8.47 m in J-K23 (F.1) |
| MODEL-105 | state | OK | re-checked | §2.2 rule 5 byte-identical; §13.1's knot fixture (r4_checks C) gained "every other role unchanged" (H105) — compatible |
| MODEL-106 | history out | OK | re-checked | text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: history out; receipt r4_checks.out C kept; 8.36 m / 25.8 m in J-K31 (F.1) |
| MODEL-107 | state | OK | re-checked | text at its place and at §2.2, §3.4, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 cutting/joining — present |
| MODEL-108 | state | OK | re-checked | text at its place and at §2.2, §7.1, §7.4 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 positions in log — present |
| MODEL-109 | state | OK | re-checked | text at its place and at §2.2, §3.4, §7.3 unchanged by r1 at this fact (diff) — r0: §2.2 rule 5 positions in log — present |
| MODEL-110 | reference | OK | re-checked | text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §7.4 moveCourseKnot row: half control spacing, nearest knot of the body, orphaned, neve… |
| MODEL-111 | reference | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §3.6 kernel-pinned paragraph (read) |
| MODEL-112 | state | OK | re-checked | text at its place and at §2.2, §6.1 unchanged by r1 at this fact (diff) — r0: §2.2 rule 6 — present |
| MODEL-113 | reference | OK | re-checked | text at its place and at §2.2, §7.3 unchanged by r1 at this fact (diff) — r0: §7.3 item 2 tree scoping (read) |
| MODEL-114 | reference | OK | re-checked | text at its place and at §2.2, §3.3, §7.3, §7.1 unchanged by r1 at this fact (diff) — r0: §3.3 kept content + clear-region rule 1 (read) |
| MODEL-115 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present |
| MODEL-116 | state | OK | re-checked | text at its place and at §2.2, §6.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present |
| MODEL-117 | state | OK | re-checked | text at its place and at §2.2, §4.2, §4.8 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present |
| MODEL-118 | state | OK | re-checked | unchanged; `composition` now also covered by §3.10's one-per-ordinal check (V-MODEL-11) |
| MODEL-119 | state | OK | re-checked | unchanged; `composition` now also covered by §3.10's one-per-ordinal check (V-MODEL-11) |
| MODEL-120 | state | OK | re-checked | text at its place and at §2.2, §3.3, §4.11, §4.2, §7.3, Judgment index unchanged by r1 at this fact (diff) — r0: role definition only; placement → §4.2 S1 (5) (MODEL-C11) (read) |
| MODEL-121 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present |
| MODEL-122 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (structural/partition bullet) — present |
| MODEL-123 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (structural/partition bullet) — present |
| MODEL-124 | state | OK | re-checked | text at its place and at §2.2, §3.3, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 anchors (J-K29) — present |
| MODEL-125 | state | OK | re-checked | text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 anchors — present |
| MODEL-126 | reference | OK | re-checked | §3.3 rule 2 now adds "no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal check)" (H14); §3.10's row covers `anchor` (H54) — agrees with rule 7 |
| MODEL-127 | reference | OK | re-checked | §3.3 rules 2–3 read after r1: allocation, canonical op order, strip by the promoting batch |
| MODEL-128 | state | OK | re-checked | text at its place and at §2.2, §7.3, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 anchors (gate ends) — present |
| MODEL-129 | reference | OK | re-checked | text at its place and at §2.2, §3.6, §3.3, Judgment index unchanged by r1 at this fact (diff) — r0: §4.4 S5a states generated (L1 Steiner / attracted L0) and edited (promoted L0) gate end… |
| MODEL-130 | state | OK | re-checked | text at its place and at §2.2, §3.6, §5.3 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present |
| MODEL-131 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present |
| MODEL-132 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 — present |
| MODEL-133 | reference | OK | re-checked | text at its place and at §2.2, §3.10, §3.3 unchanged by r1 at this fact (diff) — r0: still stated in rule 8 with pointer (§3.3, §3.10) |
| MODEL-134 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 Size — present |
| MODEL-135 | state | OK | re-checked | text at its place and at §2.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.2 Size — present |
| MODEL-136 | reference | OK | re-checked | §3.3 pool step 1 figures unchanged (60 000–90 000 items, ≤ ≈ 15 MB, ≈ 20 MB, ≈ 0.5 MB home column); receipt now named `fixall_kernel_r4_bench.out` A (H19), the file §2.2 *Size* cites |
| MODEL-137 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 Size — present |
| MODEL-138 | state | OK | re-checked | text at its place and at §2.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.2 Size (receipts) — present |
| MODEL-139 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K1: index row + rationale A + F.1 (script) |
| MODEL-140 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K3 (script) |
| MODEL-141 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K9 (script) |
| MODEL-142 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K10 (script) |
| MODEL-143 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K11 (script) |
| MODEL-144 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K22 (script) |
| MODEL-145 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K23 (script) |
| MODEL-146 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K28 (script) |
| MODEL-147 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K29 (script) |
| MODEL-148 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K31 (script) |
| MODEL-149 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K32 (script) |
| MODEL-150 | state | OK | re-checked | text at its place and at §3.2 unchanged by r1 at this fact (diff) — r0: §2.3 Terrain — present |
| MODEL-151 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 Terrain — present) |
| MODEL-152 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 HydroGrid — present) |
| MODEL-153 | state | OK | re-checked | text at its place and at §12.4, Judgment index unchanged by r1 at this fact (diff) — r0: §2.3 HydroGrid + hydrology grid — present |
| MODEL-154 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 TerrainSampler — present) |
| MODEL-155 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.3 WaterBody — present |
| MODEL-156 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 WaterBody comment — present) |
| MODEL-157 | state | OK | re-checked | text at its place and at §3.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.3 prose — present |
| MODEL-158 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 prose — present) |
| MODEL-159 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K12 (script) |
| MODEL-160 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 hydrology grid — present) |
| MODEL-161 | state | OK | re-checked | text at its place and at §12.4, Judgment index unchanged by r1 at this fact (diff) — r0: §2.3 hydrology grid — present |
| MODEL-162 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.3 hydrology grid — present |
| MODEL-163 | reference | OK | re-checked | §13.1 D8 clause unchanged (same sentence as H107) |
| MODEL-164 | move out | OK | re-checked | text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: moved in: §4.2 S1 (3) states trace on hydro, carve, D8 re-computation on the corridor, … |
| MODEL-165 | reference | OK | re-checked | text at its place and at §12.4 unchanged by r1 at this fact (diff) — r0: §12.4 M0 site-and-fields fallback 25→32 / 32→40 / 16→20 m (read) |
| MODEL-166 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-K7 (script) |
| MODEL-167 | move out | OK | re-checked | text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: moved in: §4.2 S1 (1) (read) |
| MODEL-168 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 Heights — present) |
| MODEL-169 | reference | OK | re-checked | **V-MODEL-02 fixed** (H107): §13.1 "a 3 000 m relief fixture with a hill-acropolis site stores without a clamp" |
| MODEL-170 | reference | OK | re-checked | text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: §4.2 S1 (3): bucket-queue flood, never raised by ε, lake threshold (read) |
| MODEL-171 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 Flats — present) |
| MODEL-172 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 Flats — present) |
| MODEL-173 | state | OK | re-checked | §2.3 unchanged; its targets §4.2 S1 (2) (H55 is the clamp sentence; the contour clip is kept, "(§8.2)") and §8.2 (H84: "clipped to the land faces in vector space before emission") both state the clip |
| MODEL-174 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.3 — present) |
| MODEL-175 | state | OK | re-checked | text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: §2.3 — present |
| MODEL-176 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.3 Water attributes — present |
| MODEL-177 | reference | OK | re-checked | text at its place and at §7.3 unchanged by r1 at this fact (diff) — r0: §7.3 (b) 1: moveCourseKnot, moved shore/coast vertex, level-0 warp, drawWater triggers … |
| MODEL-178 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.4 types — present) |
| MODEL-179 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: `width: Cm \| ChainProfile<Cm>` (MODEL-C10 typing; no field renamed)) |
| MODEL-180 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.4 Junction — present) |
| MODEL-181 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (merged with MODEL-122; §2.4 prose points there) — present |
| MODEL-182 | state | OK | re-checked | text at its place and at §2.2, §4.2 unchanged by r1 at this fact (diff) — r0: §2.2 rule 7 (`reserved` edge role; open wall chain) — §2.4 prose points there — present |
| MODEL-183 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.4 prose (points to §2.2 rule 5 and its exception, MODEL-C07) — present |
| MODEL-184 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.4 prose — present) |
| MODEL-185 | section restatement | OK | re-checked | text at its place and at §6.1, §2.5 unchanged by r1 at this fact (diff) — r0: section restatement → §6.1 |
| MODEL-186 | state | OK | re-checked | §2.5 unchanged; §4.5 now restates "a district's `faces` is a `FaceRef` (§2.5): its L1 faces and every face nested in them" (H56) — agrees with the comment "L1 coarse faces, before and after infill"; see observation O2 |
| MODEL-187 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 District — present |
| MODEL-188 | reference | OK | re-checked | text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §9.1 QuarterNode.cityCut with min(N_q, L) (read) |
| MODEL-189 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 SubDistrict — present |
| MODEL-190 | state | OK | re-checked | text at its place and at §2.5, §2.2 unchanged by r1 at this fact (diff) — r0: §2.5 Reservation — present |
| MODEL-191 | state | OK | re-checked | text at its place and at §2.5, §4.9 unchanged by r1 at this fact (diff) — r0: §2.5 Allocation — present |
| MODEL-192 | state | OK | re-checked | text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §2.5 FieldBands — present |
| MODEL-193 | state | OK | re-checked | text at its place and at §2.5, §4.8 unchanged by r1 at this fact (diff) — r0: §2.5 Block — present |
| MODEL-194 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 Frontage — present |
| MODEL-195 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 Plot — present |
| MODEL-196 | reference | OK | re-checked | §5.2 F-PLOT row unchanged (r1 changed only other rows' test cells, H60–H65) |
| MODEL-197 | state | OK | re-checked | text at its place and at §2.5, §2.2 unchanged by r1 at this fact (diff) — r0: §2.5 PlotBound — present |
| MODEL-198 | state | OK | re-checked | text at its place and at §2.5, §4.11, §4.5 unchanged by r1 at this fact (diff) — r0: §2.5 comment — present |
| MODEL-199 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 SitePlan — present |
| MODEL-200 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 BuildingSlot — present |
| MODEL-201 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 SlotPlan — present |
| MODEL-202 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: obbW/obbD and dist.* typed `M`, aspect `Cdeg` (MODEL-C10) |
| MODEL-203 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 prose — present |
| MODEL-204 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 prose — present |
| MODEL-205 | reference | OK | re-checked | text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §4.7 S11 keyed class × prosperityBand × density; §4.5 Bands interpolation between band … |
| MODEL-206 | rationale out (new id) | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: new row J-P50 in index and rationale A + F.1 (script, read) |
| MODEL-207 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-P1 (script) |
| MODEL-208 | reference | OK | re-checked | text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §9.4 Quarters: MFCG label count, district band labels districts; §4.5 N_q law (read) |
| MODEL-209 | state | OK | re-checked | text at its place and at §2.5, §4.2, §4.5 unchanged by r1 at this fact (diff) — r0: §2.5 "What the records are for" — Reservations — present |
| MODEL-210 | state | OK | re-checked | text at its place and at §2.5, §4.5, §6.1 unchanged by r1 at this fact (diff) — r0: §2.5 — Allocations (stream keys → §6.1) — present |
| MODEL-211 | section restatement | OK | re-checked | text at its place and at §2.5, §6.1 unchanged by r1 at this fact (diff) — r0: section restatement; §6.1 lists alloc.district / alloc.block (read) |
| MODEL-212 | reference | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: II.1 Seam record and "Seam records" rule (read) |
| MODEL-213 | reference | OK | re-checked | text at its place and at §2.5, §4.5 unchanged by r1 at this fact (diff) — r0: §4.5 Bands: setAttr re-derivation, hysteresis 0.02, replay reproduces bands (read) |
| MODEL-214 | state | OK | re-checked | **V-MODEL-10 fixed** (H4): "compares each plot's current sample with the recorded one and re-derives only what §7.2's τ rule selects (τ = 0.01 …, the same τ on replay)"; §7.2 re-derives every block whose plot samples moved beyond τ against the `DerivationRecord` samples (H76); §7.3 (a) 3 and §7.4 setField agree (read); see observation O4 |
| MODEL-215 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.5 — PlotBound bullet — present |
| MODEL-216 | reference | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §4.7 S10 (8) vacancy runs (read) |
| MODEL-217 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Heights — present) |
| MODEL-218 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing — present) |
| MODEL-219 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing comment — present) |
| MODEL-220 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing.corners — present) |
| MODEL-221 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 BaseWing.ridgeAxis — present) |
| MODEL-222 | state | OK | re-checked | text at its place and at §6.1, §8.2 unchanged by r1 at this fact (diff) — r0: §2.6 Building — present |
| MODEL-223 | state | OK | re-checked | text at its place and at §3.8 unchanged by r1 at this fact (diff) — r0: `pitch` "a ratio, not an angle" (MODEL-C10, canon PLAUSIBLE reading; no other part read… |
| MODEL-224 | state | OK | re-checked | text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.6 MaterialRow — present |
| MODEL-225 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 OpeningRow — present) |
| MODEL-226 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 SubLocation — present) |
| MODEL-227 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: NP5-4: ComposedTower[], Room defined) |
| MODEL-228 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: NP5-4: relative Porch; ComposedTower (MODEL-C03)) |
| MODEL-229 | state | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §2.6 BuildingInput — present |
| MODEL-230 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 BuildingGenerator — present) |
| MODEL-231 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 ClassRules — present) |
| MODEL-232 | state | OK | re-checked | text at its place and at §3.6, §6.5, §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 code comment — present |
| MODEL-233 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 carryWings — present) |
| MODEL-234 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 base outline builder — present) |
| MODEL-235 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 base outline builder 1 — present) |
| MODEL-236 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 base outline builder 2 — present) |
| MODEL-237 | state | OK | re-checked | text at its place and at Judgment index unchanged by r1 at this fact (diff) — r0: §2.6 wings paragraph (J-P17) — present |
| MODEL-238 | state | OK | re-checked | text at its place and at §8.2 unchanged by r1 at this fact (diff) — r0: §2.6 wings paragraph — present |
| MODEL-239 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-P17 (script) |
| MODEL-240 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Row footprints are quads — present) |
| MODEL-241 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Row footprints — present) |
| MODEL-242 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Row footprints — present) |
| MODEL-243 | reference | OK | re-checked | text at its place and at §3.8 unchanged by r1 at this fact (diff) — r0: §3.8 "the convex near-rectangle test" (read); MODEL-C02 |
| MODEL-244 | reference | OK | re-checked | text at its place and at §13.2 unchanged by r1 at this fact (diff) — r0: §13.2 l. 7672–7674 curved-street row fixtures with oblique rear lines (read) |
| MODEL-245 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-P31 (script) |
| MODEL-246 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-P39 (script) |
| MODEL-247 | state | OK | re-checked | text at its place and at §2.2, §3.3, §4.9, §7.4, Judgment index unchanged by r1 at this fact (diff) — r0: §2.6 wing-carrying rule intro — present |
| MODEL-248 | state | OK | re-checked | text at its place and at Judgment index, §3.3 unchanged by r1 at this fact (diff) — r0: §2.6 carry intro "When it runs is stage-agnostic (J-P47)" — present |
| MODEL-249 | state | OK | re-checked | text at its place and at §7.3 unchanged by r1 at this fact (diff) — r0: §2.6 wing-carrying rule intro — present |
| MODEL-250 | state | OK | re-checked | text at its place and at §3.10, §3.4 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 1 — present |
| MODEL-251 | state | OK | re-checked | text at its place and at §6.5 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 2 — present |
| MODEL-252 | state | OK | re-checked | text at its place and at §3.8 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 3 (cites §3.8's convex near-rectangle test, MODEL-C02) — present |
| MODEL-253 | state | OK | re-checked | text at its place and at Judgment index, §3.7 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 4 (J-P49) — present |
| MODEL-254 | state | OK | re-checked | text at its place and at §3.6, §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 4 — present |
| MODEL-255 | state | V-MODEL-R1-02 | re-checked | figures kept; but "(≤ 25 µs, §3.7; PLAUSIBLE)" points to §3.7, which states S11's bar only as "against its §12.4 row" (H44 re-read) — the 25 µs is §12.4's S11 row ("compound ≤ 40 µs (25 + 15)", canon R8 / RENDERING-524); missed by r0 |
| MODEL-256 | reference | OK | re-checked | text at its place and at §12.6, Judgment index unchanged by r1 at this fact (diff) — r0: §12.6 warp-preview bullet states the fallback (read) |
| MODEL-257 | history out | OK | kept | r0 verdict kept (verify-model-r0 §9: history out; receipt pointer kept; 75 884 in J-P49 rationale) |
| MODEL-258 | state | OK | re-checked | text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 wing rule 5 — present |
| MODEL-259 | state | OK | re-checked | text at its place and at Judgment index unchanged by r1 at this fact (diff) — r0: §2.6 "A stored composition is carried with its wings (J-P48)" — present |
| MODEL-260 | state | OK | re-checked | **V-MODEL-13 fixed** (H78): §7.3 item 7 (ii) now checks "each face §2.6's composition rule (1) adds to its scope equal to its prior ring after removing the vertices that rule inserted, with the `composition` role rows it adds present" |
| MODEL-261 | state | OK | re-checked | text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 stored composition (2)–(5) — present |
| MODEL-262 | state | OK | re-checked | text at its place and at §7.3 unchanged by r1 at this fact (diff) — r0: §2.6 stored composition (failure paragraph) — present |
| MODEL-263 | state | OK | re-checked | text at its place and at §2.2, §5.3, §7.3, §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 stored composition (failure paragraph, last sentence) — present |
| MODEL-264 | reference | OK | re-checked | **V-MODEL-03 fixed** (H109): §13.2's "§2.6's test" now has every carried ring simple, the party-wall re-fit adding its corner to the wing ring, undo restoring every ring and a replay reproducing them, and the hand-built composition's shape |
| MODEL-265 | reference | OK | re-checked | text at its place and at §13.2, §7.3 unchanged by r1 at this fact (diff) — r0: §13.2 l. 7700–7702 compound generation = regeneration (read) |
| MODEL-266 | history out | OK | kept | r0 verdict kept (verify-model-r0 §9: history out; receipt pointer kept) |
| MODEL-267 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-P42 (script) |
| MODEL-268 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-P49 (script) |
| MODEL-269 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Heights and the ground datum — present) |
| MODEL-270 | state | OK | re-checked | text at its place and at §7.3, §7.4 unchanged by r1 at this fact (diff) — r0: §2.6 Heights and ground datum — present |
| MODEL-271 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Heights and ground datum — present) |
| MODEL-272 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: §2.6 Heights and ground datum — present |
| MODEL-273 | state | OK | re-checked | text at its place and at §8.1 unchanged by r1 at this fact (diff) — r0: §2.6 Heights and ground datum — present |
| MODEL-274 | move out | OK | re-checked | text at its place and at §13.2, §7.3 unchanged by r1 at this fact (diff) — r0: moved in: §13.2 l. 7666–7668 heights acceptance (read) |
| MODEL-275 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Materials — present) |
| MODEL-276 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.6 Descriptions — present) |
| MODEL-277 | state | OK | re-checked | text at its place and at §3.3 unchanged by r1 at this fact (diff) — r0: §2.6 stage-3 hook (budgets → §12.7; the contract stated once here) — present |
| MODEL-278 | reference | OK | re-checked | text at its place and at §12.4, §3.7 unchanged by r1 at this fact (diff) — r0: §12.7 stage-3 hook bullet (read); purpose clause "so the METROPOLIS city view composes … |
| MODEL-279 | reference | OK | kept | r0 verdict kept (verify-model-r0 §9: §12.7: ≤ 1 ms per building, 16 ms of pool time amortised — the archived §2.6 said "frame work"; canonical h…) |
| MODEL-280 | reference | OK | re-checked | text at its place and at §13.2, Judgment index unchanged by r1 at this fact (diff) — r0: §13.2 stage property tests list the stage-3 contract (read) |
| MODEL-281 | state | OK | re-checked | text at its place and at §16 unchanged by r1 at this fact (diff) — r0: §2.6 stage-3 intake bullet (the 10 µs median cited as §12.7's) — present |
| MODEL-282 | reference | OK | re-checked | text at its place and at §13.2 unchanged by r1 at this fact (diff) — r0: §13.2 l. 7707–7708 intake runs the same test with compositions stored (read) |
| MODEL-283 | state | OK | re-checked | text at its place and at §2.2 unchanged by r1 at this fact (diff) — r0: waterfront gloss defers water gates to §4.4 S5a (NEW-PIPE-1: archive §4.4/§4.8 put a ga… |
| MODEL-284 | state | OK | re-checked | text at its place and at §2.2, §3.6 unchanged by r1 at this fact (diff) — r0: §2.7 Gate — present |
| MODEL-285 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Tower (the wall tower keeps the name, MODEL-C03) — present) |
| MODEL-286 | state | OK | re-checked | text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: MODEL-C04 comment applied |
| MODEL-287 | state | OK | re-checked | text at its place and at §2.2, §4.8 unchanged by r1 at this fact (diff) — r0: §2.7 Bridge — present |
| MODEL-288 | state | OK | re-checked | §4.9 trees row now lays avenues, street trees and hedgerows as jittered lines (H58), agreeing with `Greenery.along` and `overrides.recorded` ("a line layout's recorded generated point") |
| MODEL-289 | reference | OK | re-checked | §4.9 row still keys instances by entity and ordinal from `render.instances/<entity>` (§6.1), never stored (H58 read); §8.1 item 2 unchanged |
| MODEL-290 | state | OK | re-checked | text at its place and at §4.9 unchanged by r1 at this fact (diff) — r0: §2.7 LandUse — present |
| MODEL-291 | state | OK | re-checked | text at its place and at §4.2 unchanged by r1 at this fact (diff) — r0: §2.7 SiteResources — present |
| MODEL-292 | state | OK | re-checked | text at its place and at §4.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.7 Decoration — present |
| MODEL-293 | state | OK | re-checked | text at its place and at §4.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.7 Pin — present |
| MODEL-294 | reference | OK | re-checked | text at its place and at §2.5 unchanged by r1 at this fact (diff) — r0: §9.1 LabelEntity / QuarterNode (read) |
| MODEL-295 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Institution — present) |
| MODEL-296 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Household — present) |
| MODEL-297 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Person — present) |
| MODEL-298 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Faction — present) |
| MODEL-299 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Government — present) |
| MODEL-300 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Religion — present) |
| MODEL-301 | reference | OK | kept | r0 verdict kept (verify-model-r0 §9: §10.1 base schema from M1; §10.3 module persists with lifecycle and reference integrity (read)) |
| MODEL-302 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 relation store records — present) |
| MODEL-303 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 SkyIsland (+ "The staged layers" paragraph for field meanings) — present) |
| MODEL-304 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 Tunnel (+ "The staged layers" paragraph) — present) |
| MODEL-305 | reference | OK | kept | r0 verdict kept (verify-model-r0 §9: §10.3 derivePerson, pinning an explicit edit, diffed re-derive (read)) |
| MODEL-306 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: MODEL-C06 applied |
| MODEL-307 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.7 people paragraph — present) |
| MODEL-308 | reference | OK | re-checked | text at its place and at §4.8, §2.2 unchanged by r1 at this fact (diff) — r0: §4.4 S5a open chains, enclosed/sealed test, waterfront rows, aroundStage (read); NEW-PI… |
| MODEL-309 | state | OK | re-checked | text at its place and at §5.3 unchanged by r1 at this fact (diff) — r0: §2.7 "Both faces of a wall are unbuildable" — present |
| MODEL-310 | reference | OK | re-checked | §4.8 wall-strip and castle paragraphs unchanged (H57 is the bridges sentence) |
| MODEL-311 | reference | OK | re-checked | §4.8 wall-strip and castle paragraphs unchanged (H57 is the bridges sentence) |
| MODEL-312 | reference | OK | re-checked | §4.8 now points S3's decks to §4.2 S3 (2), (10) (H57), which state them (canal decks at `canalDeckSpacingM`; one deck at a ring castle moat's gate; one at every main and harbour gate across a city moat — read); §4.2 S1 (5) unchanged |
| MODEL-313 | reference | OK | re-checked | §4.2 S1 (5) unchanged; §7.1 and §7.4's drawn-bridge rows now defer the whole placement to it (H74, H79) — MODEL-C11 tightened |
| MODEL-314 | reference | OK | re-checked | §4.2 S1 (5) unchanged; §7.1 and §7.4's drawn-bridge rows now defer the whole placement to it (H74, H79) — MODEL-C11 tightened |
| MODEL-315 | reference | OK | re-checked | §4.2 S1 (5) unchanged; §7.1 and §7.4's drawn-bridge rows now defer the whole placement to it (H74, H79) — MODEL-C11 tightened |
| MODEL-316 | reference | OK | re-checked | §4.2 S1 (5) unchanged; §7.1 and §7.4's drawn-bridge rows now defer the whole placement to it (H74, H79) — MODEL-C11 tightened |
| MODEL-317 | state | OK | re-checked | text at its place and at §4.9 unchanged by r1 at this fact (diff) — r0: §2.7 "What the content records settle" — present |
| MODEL-318 | reference | OK | re-checked | text at its place and at §2.1 unchanged by r1 at this fact (diff) — r0: II.6 rules; field meanings kept (D5); "after the city is mastered" is II.6's (read) |
| MODEL-319 | state | OK | re-checked | §2.8 intro "every in-window load" — §6.2 now says the same (H69, H70) |
| MODEL-320 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 intro — present) |
| MODEL-321 | reference | OK | re-checked | MODEL-C09: §6.2 now "every in-window load (§2.9 step 3)" twice (H69, H70), so both statements agree word for word |
| MODEL-322 | state | OK | re-checked | **V-MODEL-12 fixed** (H59): §4.11 `build` now `footprint?: PolygonCm /* as §7.1's build event */`, matching §7.1 (read); D1 (`Polygon` = one ring) holds for every other use; §2.1 cites "§2.8's type list" for `Cdeg` (H2) — present |
| MODEL-323 | state | OK | re-checked | text at its place and at §2.1, §2.2, §6.1 unchanged by r1 at this fact (diff) — r0: §2.8 Identity — present |
| MODEL-324 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 Existence — present) |
| MODEL-325 | state | OK | re-checked | text at its place and at §7.2 unchanged by r1 at this fact (diff) — r0: §2.8 LifecycleFlags — present |
| MODEL-326 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 Lifecycle — present) |
| MODEL-327 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 LifecycleEvent — present) |
| MODEL-328 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 Tombstone — present) |
| MODEL-329 | state | OK | re-checked | §2.8 `DerivationRecord.fields` holds the samples §7.2 now compares against ("the samples their `DerivationRecord` holds (§2.8)", H76) |
| MODEL-330 | state | OK | re-checked | text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.8 NamingRecord — present |
| MODEL-331 | state | OK | re-checked | text at its place and at §7.3, §7.4, §7.6 unchanged by r1 at this fact (diff) — r0: §2.8 Provenance — present |
| MODEL-332 | state | OK | re-checked | text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.8 SliceRef — present |
| MODEL-333 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 One existence state — present) |
| MODEL-334 | reference | OK | re-checked | §4.11 `ConversionOp` still holds abandon, decay, ruin, robStone, clear, rebuild, plotToGarden, contractWall (H59 changed only `build`) |
| MODEL-335 | state | OK | re-checked | text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §2.8 History — present |
| MODEL-336 | state | OK | re-checked | text at its place and at §6.5, §7.4 unchanged by r1 at this fact (diff) — r0: §2.8 History — present |
| MODEL-337 | state | OK | re-checked | text at its place and at §6.2 unchanged by r1 at this fact (diff) — r0: §2.8 History — present |
| MODEL-338 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 History — present) |
| MODEL-339 | move out | OK | re-checked | text at its place and at §13.2, §16 unchanged by r1 at this fact (diff) — r0: moved in: §13.2 20-epoch test (read) |
| MODEL-340 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 History — present) |
| MODEL-341 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-33 (script) |
| MODEL-342 | state | OK | re-checked | text at its place and at §2.5, §7.3 unchanged by r1 at this fact (diff) — r0: VD5-5 preferred option applied; §7.3 item 6 relies on it (read) |
| MODEL-343 | state | OK | re-checked | §6.5 (9) now adds a lock + unlock pair whose freeing event re-draws the name by §6.3's case (4) (H73) — the rule §2.8 states for the end of a protection (read) |
| MODEL-344 | state | OK | re-checked | §6.5 (9) now adds a lock + unlock pair whose freeing event re-draws the name by §6.3's case (4) (H73) — the rule §2.8 states for the end of a protection (read) |
| MODEL-345 | reference | OK | re-checked | §6.5 (9) now adds a lock + unlock pair whose freeing event re-draws the name by §6.3's case (4) (H73) — the rule §2.8 states for the end of a protection (read) |
| MODEL-346 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-46 (script) |
| MODEL-347 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-41 (script) |
| MODEL-348 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 Provenance bullet — present) |
| MODEL-349 | state | OK | kept | r0 verdict kept (verify-model-r0 §9: §2.8 Provenance bullet — present) |
| MODEL-350 | reference | OK | re-checked | text at its place and at §6.2 unchanged by r1 at this fact (diff) — r0: §6.4 "a release that changes no output keeps its output version" (read) |
| MODEL-351 | reference | OK | re-checked | §6.2's excluded-provenance clause unchanged; H69 adds only "in-window" |
| MODEL-352 | state | OK | re-checked | text at its place and at §7.6 unchanged by r1 at this fact (diff) — r0: §2.8 Rules cite slices — present |
| MODEL-353 | state | OK | re-checked | §2.8 registry unchanged; §7.1 (H75) and §0.2 row 5 (H1) now name its completeness test as §13.2's, as §2.8 does; §13.2 Document tests unchanged |
| MODEL-354 | move out | OK | re-checked | §13.2 Document tests unchanged (read after r1) |
| MODEL-355 | state | OK | re-checked | text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: MODEL-C12 applied |
| MODEL-356 | state | OK | re-checked | text at its place and at §2.9, §6.5, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 Document — present |
| MODEL-357 | state | OK | re-checked | text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 Document.packs — present |
| MODEL-358 | reference | OK | re-checked | text at its place and at §7.4 unchanged by r1 at this fact (diff) — r0: §7.4 records: 64 events or 20 MB (read) |
| MODEL-359 | state | OK | re-checked | text at its place and at §2.9, §7.1 unchanged by r1 at this fact (diff) — r0: §2.9 Base — present |
| MODEL-360 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Seed — present |
| MODEL-361 | state | OK | re-checked | text at its place and at §2.9, §6.1, §6.2, §7.1, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 Recipe — present |
| MODEL-362 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 PackData / HostContent — present |
| MODEL-363 | state | OK | re-checked | text at its place and at §2.9, §6.2 unchanged by r1 at this fact (diff) — r0: MODEL-C09 applied |
| MODEL-364 | state | OK | re-checked | text at its place and at §2.9, §3.3 unchanged by r1 at this fact (diff) — r0: §2.9 ChunkRef — present |
| MODEL-365 | state | OK | re-checked | text at its place and at §2.9, §11.3, §7.4 unchanged by r1 at this fact (diff) — r0: MODEL-C06 applied |
| MODEL-366 | state | OK | re-checked | text at its place and at §2.9, §7.1 unchanged by r1 at this fact (diff) — r0: §2.9 EpochRecord — present |
| MODEL-367 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 RebaseReason — present |
| MODEL-368 | state | OK | re-checked | text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 UndoRecord — present |
| MODEL-369 | state | OK | re-checked | text at its place and at §2.9, §7.1, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 One source of truth — present |
| MODEL-370 | reference | OK | re-checked | **V-MODEL-06 fixed** (H81): §7.7 One path "A blueprint's assignments and edits become `assign` and edit events at log positions 0…k" |
| MODEL-371 | reference | OK | re-checked | text at its place and at §2.9, §5.4 unchanged by r1 at this fact (diff) — r0: §5.4 timings telemetry (read); caches in `Document.derived` comment |
| MODEL-372 | state | OK | re-checked | text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: §2.9 One source of truth — present |
| MODEL-373 | state | OK | re-checked | text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present |
| MODEL-374 | state | OK | re-checked | text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present |
| MODEL-375 | reference | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §7.5 (2) packs-stop-shipping bullet (read) |
| MODEL-376 | state | OK | re-checked | text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present |
| MODEL-377 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present |
| MODEL-378 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present |
| MODEL-379 | state | OK | re-checked | text at its place and at §2.9, §11.2, §11.3, §5.2 unchanged by r1 at this fact (diff) — r0: §2.9 pack set bullet — present |
| MODEL-380 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-35 (+J-DET-50) (script) |
| MODEL-381 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 1 — present |
| MODEL-382 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 2 — present |
| MODEL-383 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 2 — present |
| MODEL-384 | state | OK | re-checked | text at its place and at §2.9, §7.1, §7.4, §6.2 unchanged by r1 at this fact (diff) — r0: VD5-3 companion pointer; §7.4 rebase row states case (4) over every unedited name (read) |
| MODEL-385 | rationale out | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: J-DET-44 (script) |
| MODEL-386 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 2 — present |
| MODEL-387 | state | OK | re-checked | text at its place and at §2.9, §6.2, §3.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Decode and check" — present |
| MODEL-388 | reference | OK | re-checked | §6.2 bars unchanged (≈ 31–34 / 95–101 ms; records ≈ 4 / 11 ms); H70 adds "in-window" |
| MODEL-389 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Corrupt cache" — present |
| MODEL-390 | reference | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: D2: kept; §7.5 (2) re-rooting cites §2.9 step 3 (read), no disagreement |
| MODEL-391 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "A rebased base" — present |
| MODEL-392 | state | OK | re-checked | unchanged; §7.3's replay-mode list now also names the undo of an upgrade after a reload (H77), which §2.9 step 3 covers ("the undo of an upgrade, replaying under `from`") |
| MODEL-393 | state | OK | re-checked | unchanged; §7.3's replay-mode list now also names the undo of an upgrade after a reload (H77), which §2.9 step 3 covers ("the undo of an upgrade, replaying under `from`") |
| MODEL-394 | state | OK | re-checked | text at its place and at §2.9, §7.6 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Edits held for provenance" — present |
| MODEL-395 | state | OK | re-checked | text at its place and at §2.9, §7.3 unchanged by r1 at this fact (diff) — r0: §7.3 item 6 (records identical by §2.8's rule) (read) |
| MODEL-396 | state | OK | re-checked | text at its place and at §2.9, §6.2 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Verified" — present |
| MODEL-397 | state | OK | re-checked | text at its place and at §2.9, §6.2, Judgment index unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Records mismatch (J-DET-52)" — present |
| MODEL-398 | rationale out (new id) | OK | re-checked | J-row in the index (r1 changed only the J-DET-36 and J-S43 rows) and in rationale Part A; F.1 unchanged — r0: new row J-DET-52 (script, read) |
| MODEL-399 | reference | OK | re-checked | **V-MODEL-05 fixed** (H71): §6.2 (iii) "shown disabled (“checking the saved copy…”)"; "A mismatch withdraws the keep for good" also stated there |
| MODEL-400 | state | OK | re-checked | text at its place and at §12.6, §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Budget and measurement" — present |
| MODEL-401 | state | OK | re-checked | text at its place and at §12.6, §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Budget and measurement" — present |
| MODEL-402 | state | OK | re-checked | text at its place and at §12.6, §2.9, §3.9, §6.2, §3.3 unchanged by r1 at this fact (diff) — r0: §2.9 load step 3 "Budget and measurement" (fallbacks) — present |
| MODEL-403 | reference | V-MODEL-R1-01 | re-checked | V-MODEL-04's criteria for this case fixed (H109: never offered as the saved town; digest equal to a fresh replay's; the later corpus selection renames what an unsaved session renames); still lost: the forced-(iii) case's "the mismatch withdraws the keep" |
| MODEL-404 | state | OK | re-checked | §2.9 step 4 byte-identical outside the bridge sentence (H5) |
| MODEL-405 | state | OK | re-checked | §2.9 step 4 byte-identical outside the bridge sentence (H5) |
| MODEL-406 | state | OK | re-checked | §2.9 step 4 byte-identical outside the bridge sentence (H5) |
| MODEL-407 | reference | OK | re-checked | **V-MODEL-07 fixed** (H5 + H94): §2.9 step 4 points to §11.3 "Bridged load verification" for the policy and keeps the install mechanics; §11.3 states owner-only keep, replayed town, report, root at `h₀`, `doc.load` bytes (≤ 3 MB at CITY) kept until settled or session end; §12.8 points to §11.3 (H101) |
| MODEL-408 | reference | V-MODEL-R1-01 | re-checked | V-MODEL-04's 100 ms criteria fixed (H109); still lost: the fixture runs on "an edited CITY document" and forces the mismatch with "a snapshot in which one building's footprint was moved and whose recorded digest was recomputed to match it"; §11.3's convergence clause present (read) |
| MODEL-409 | rationale out | OK | re-checked | J-DET-38 / J-DET-42 rows unchanged; §11.3 now also cites J-DET-42 (H94) |
| MODEL-410 | state | OK | re-checked | text at its place and at §16, §2.9, Judgment index unchanged by r1 at this fact (diff) — r0: VS5-1 applied; §16 M1 agrees (read) |
| MODEL-411 | state | OK | re-checked | §2.9 "What the snapshot holds" byte-identical; §3.9 load paragraph unchanged |
| MODEL-412 | state | OK | re-checked | §2.9 "What the snapshot holds" byte-identical; §3.9 load paragraph unchanged |
| MODEL-413 | state | OK | re-checked | §2.9 "What the snapshot holds" byte-identical; §3.9 load paragraph unchanged |
| MODEL-414 | reference | OK | re-checked | text at its place and at §2.9, §5.4 unchanged by r1 at this fact (diff) — r0: §5.4 (read) |
| MODEL-415 | reference | OK | re-checked | §3.9 chunk text unchanged except tags (H50–H52) |
| MODEL-416 | reference | OK | re-checked | §3.9 chunk text unchanged except tags (H50–H52) |
| MODEL-417 | reference | OK | re-checked | §3.9 chunk text unchanged except tags (H50–H52) |
| MODEL-418 | rationale out | OK | re-checked | index row J-DET-36 amended by the scope lane (H113: "keyed by their route edge's endpoints", §3.9's rule); rationale Part A row keeps the moved "Chose" sentence, amendment appended; F.1's §2.9 passage unchanged |
| MODEL-419 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget — present |
| MODEL-420 | state | OK | re-checked | text at its place and at §16, §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget (measurement) — present |
| MODEL-421 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget (fallback 1) — present |
| MODEL-422 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Size budget (fallback 2) — present |
| MODEL-423 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Formats — present |
| MODEL-424 | reference | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §11.1 compact twin row: CBOR typed-array tags, settlement centre in header (read) |
| MODEL-425 | state | OK | re-checked | text at its place and at §2.9 unchanged by r1 at this fact (diff) — r0: §2.9 Canonical form and digests — present |
| MODEL-426 | section restatement | OK | re-checked | text at its place and at §2.9, §6.2 unchanged by r1 at this fact (diff) — r0: section restatement; §6.2 says which checks read which digest (read) |
| MODEL-427 | reference | OK | re-checked | §11.3 `logHead` unchanged |
| MODEL-428 | state | OK | re-checked | §11.3 Roles bullet (a bridged client takes its session from `doc.load`) unchanged |
| MODEL-429 | reference | OK | re-checked | §11.3 Roles bullet (a bridged client takes its session from `doc.load`) unchanged |
| MODEL-430 | move out | OK | re-checked | §13.2 Document tests unchanged (read after r1) |
| MODEL-431 | section restatement | OK | re-checked | text at its place and at §2.9, §7.4 unchanged by r1 at this fact (diff) — r0: section restatement |
