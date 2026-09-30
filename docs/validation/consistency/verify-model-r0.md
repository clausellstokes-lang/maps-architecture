# Consistency verification — MODEL part (§2), round 0

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-model-r0`, 2026-09-26. Status: COMPLETE. Verifies `## §2 Domain model and schemas` of the
assembled `docs/ARCHITECTURE.md` (l. 298–1525, byte-identical to `new/model/01-domain-model-and-schemas.md` — diff 0)
against the archive `docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md` (§2, l. 512–2122), `inventory-model.json`
(431 items + 12 internal conflicts), `canon.json` (by-id routing, the 18 conflicts touching the model, the 20 open-item
routings) and the mapping table of `rewrite-model.md` (all 431 rows; none sampled). Both §2 texts were read in full;
every reference target named below was read at its place in the new document.

## 1. Outcome

§2 is sound: every one of the 431 inventory ids survives with its meaning at the mapped place or at a target that
states it, the seven routed open-item edits (VK5-1, VK5-2, VK5-3, NP5-1, NP5-4, VD5-5, VS5-1) and the VD5-3 / NP5-2
companions are in, and all 12 MODEL-C conflicts plus KERNEL-C07, CANON-C02 and SCOPE-C06 are resolved as the canon
rules. No open item is owned by this part (UNFIXED: none). **13 minor issues**, no blocker or major: 5 details lost
because §2 now points at a home that does not carry them (owners kernel ×1, scope ×3, determinism ×1), 1 pointer whose
target states only half the fact (determinism), 2 small meaning changes in §2's own wording (model), 1 restatement the
rewrite said it had turned into a pointer (model), and 4 cross-part disagreements (model ×1 pre-existing, kernel ×1,
pipeline ×1 from deviation D1, determinism ×1). Every note the other five rewrites addressed to §2 is reflected, except one optional rendering suggestion judged
unnecessary (§5).
Size: §2 is 75.7 % of its old bytes (report's figure, re-read), above the pass's 55–65 % target for the reason the
report gives (304 of 431 items are homes; ≈ 50 KB of interface code).

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| V-MODEL-01 | minor | lost | kernel | MODEL-093: archived §2.2 rule 5 said a resolved reference is "valid until the next commit (a debug build asserts the version)"; §2 now points to §3.4, whose `resolve` says only "current slots, stamped with the arena version" — the debug assertion is stated nowhere (grep 0). The model report's cross-part note 2 asked for it. | §3.4 `resolve` comment: add "valid until the next commit (a debug build asserts the version)". |
| V-MODEL-02 | minor | lost | scope | MODEL-169: the archived S1 fixture was "3 000 m of relief with a hill-acropolis site"; §2.3 now points to §13.1, which says only "a 3 000 m relief fixture stores without a clamp" (grep "acropolis": only the §7.7 form name). | §13.1: "a 3 000 m relief fixture with a hill-acropolis site stores without a clamp …". |
| V-MODEL-03 | minor | lost | scope | MODEL-264: §13.2's "§2.6's test" (the only statement now) lacks four archived clauses: (a) every carried ring simple; (b) a neighbouring plot re-fitted onto a shared party wall adds its corner to the wing ring along that wall; (c) a replay reproduces the rings; (d) the hand-built composition's shape — composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on a corner and one inside, rooms in one wing (the NP5-1 case). Grep finds none of them as test text. | Add (a)–(d) to §13.2's "§2.6's test". |
| V-MODEL-04 | minor | lost | scope | MODEL-403 / MODEL-408: §13.2's load-verification fixtures (canon home SCOPE-205) lack the archived pass criteria: the corrupt snapshot is "never offered as the saved town" and "the session's digest after the replay equals a fresh replay's"; the altered-naming-record case ends "a corpus selection made afterwards renames exactly what a session that never saved renames"; the 100 ms case: "the edit is applied at once, and after either choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no mismatch". | Add the four criteria to §13.2's load-verification sentence. |
| V-MODEL-05 | minor | lost | determinism | MODEL-399: the disabled keep's label "checking the saved copy…" existed only in archived §2.9; §2 points to §6.2 (iii), which says "shown disabled" (grep 0). | §6.2 (iii): "shown disabled ("checking the saved copy…")". |
| V-MODEL-06 | minor | broken-reference | determinism | MODEL-370: §2.9 ("The blueprint's own assignments and edits enter as the log's first events (§7.7)") and §4.2 S0 point to §7.7, whose "One path" names assignments only ("A blueprint's assignments become `assign` events at log positions 0…k"). The archive's §2.9 and §4.2 had "assignments and edits … assign and edit events"; the pipeline report's note D-6 asked for the same. | §7.7 One path: "A blueprint's assignments and edits become `assign` and edit events at log positions 0…k when the document is created". |
| V-MODEL-07 | minor | conflict | model | MODEL-407 / deviation D3: the report says the bridge-policy sentence "points to §11.3", but §2.9 step 4 still states the policy (owner-only keep; others take the replayed town, report, record their root at `h₀`, keep the `doc.load` bytes ≤ 3 MB at CITY until settled or the session ends). §11.3 (canonical, RENDERING-471) states it too, without the root at `h₀`, the ≤ 3 MB and the session-end release — two statements of one fact with different detail. | §2.9 step 4: reduce the policy sentence to a pointer to §11.3 (keep the install mechanics, D3); rendering companion: §11.3 adds "records its root at `h₀`", "(≤ 3 MB at CITY)" and "or its session ends". |
| V-MODEL-08 | minor | changed | model | MODEL-006 / MODEL-C10: §2.1's lint now refuses "any length **or angle** field" without a unit name or type; the archive and the canon's resolution cover length fields (angles "where stored, are i32 centidegrees"; `aspect` typed `Cdeg`). The extension would also refuse §8.4's `SunSpec.latitudeDeg` (degrees) if the style schema is linted (PLAUSIBLE: the lint's schema scope is unstated). | Restore "a schema lint refuses any length field that has neither", keeping the `Cdeg` convention for stored angles; or record the angle lint as a decision and give `latitudeDeg` its exception (rendering). |
| V-MODEL-09 | minor | changed | model | MODEL-069: the promotion paragraph now says the promoted vertex "lies within that route's hot pixel"; the archive said "the hot pixel of the route it was placed on". After later same-level changes a finer vertex may stand ≈ 1.25–1.49 cm off the current route (§3.6, J-K32), so the new wording asserts a standing distance the document says does not hold. | Restore "(it lies within the hot pixel of the route it was placed on, §3.6)". |
| V-MODEL-10 | minor | conflict | model | MODEL-214 vs DETERMINISM-388: §2.5 says a field brush or an epoch "re-derives only plots whose current sample differs … by more than τ"; §7.2 (canonical for brushes; §7.3 (a) 3 and §7.4's `setField` row agree) says a stroke "re-derives every block whose plot samples moved by more than τ" — the unit differs. Pre-existing (archive l. 1238 vs l. 4224, 6041); the canon kept both as homes. PLAUSIBLE (reading). | §2.5's bullet: "a field brush or an epoch re-derives only what §7.2's τ rule selects (τ = 0.01 of the field range, the same τ on replay)". |
| V-MODEL-11 | minor | conflict | kernel | MODEL-028 / NP5-1: §2.2 rule 7 adds the indexed vertex role `composition`; §3.10's stored-reference row still enumerates the indexed roles "(attach, anchor, weld, deck end, gate end, gate opening)", so its one-per-ordinal check reads as not covering it (model cross-part note 3). §3.9's role list says "included" and is not exhaustive — no change needed there. | §3.10: "every indexed role of §2.2 rule 7 (attach, anchor, weld, deck end, gate end, composition, gate opening) finds exactly one vertex or edge set per ordinal". |
| V-MODEL-12 | minor | conflict | pipeline | MODEL-322 / deviation D1: with `Polygon` declared one ring and `PolygonCm` = rings, §4.11's `ConversionOp` member `{ op: 'build'; …; footprint?: Polygon }` — declared to be "§7.1's `build` event" — now takes one ring while §7.1's `build` takes `footprint?: PolygonCm`; a holed footprint (§2.6's test has one) fits §7.1 but not §4.11. Under the canon's alias (`Polygon = PolygonCm`) they agreed. | §4.11: `build.footprint?: PolygonCm`, as §7.1. Fable: re-check D1 with this case (every other `Polygon` field reads as one ring — grep of the 15 `Polygon` and 8 `PolygonCm` field uses; `BuildingInput.lot` is the one other place a holed shape is conceivable, PLAUSIBLE). |
| V-MODEL-13 | minor | conflict | determinism | MODEL-260 / NP5-1: §2.6 stored composition (1) puts the building's own yard parts, a row neighbour's footprint and wing rings and a neighbouring plot's L4 face in the storing edit's scope, each "equal to its prior ring with those vertices removed (…; the check of §7.3 item 7 (ii))"; §7.3 item 7 (ii) computes only item 1's seam exception and names neither these faces nor the `composition` role rows (model cross-part note 8, not applied). PLAUSIBLE (the oracle might read them as excepted faces). | §7.3 item 7 (ii): add "and, for an edit that stores a stage-3 composition, the faces §2.6 (1) adds to its scope and the `composition` role rows it adds". |

## 3. Open items

* **Owned by this part:** none (`still-open-r5.json`, canon `open_item_routing`) — UNFIXED: [].
* **Routed §2 edits, all present:** VK5-1 (§2.9 no longer lists chunk membership; §3.9 holds "the vertices that belong
  to it by §3.3's rebuild rule"; `LevelIndex.tombstones` points to §3.3, which holds "moved to another level or
  partition"); VK5-2 (flags comment and rule 3 (b): "other than knot rows", pin set only by `pinVertices`; §3.4's
  `opts.pinned` agrees); VK5-3 (the "by construction" wording; the 0.54–0.66 % figure lives in J-K28, rationale A and F.1);
  NP5-1 (levels, all sharing faces, `('composition', buildingId, i)` guard, scope — see V-MODEL-13 for §7.3's side);
  NP5-4 (`Room`, relative `Porch`, `ComposedTower`; §2.7's wall `Tower` comment; §14 holds no copy); VD5-5 (§2.8's
  route-independent rule and `DerivationRecord.epoch`; §7.3 item 6 and oracle (i) rely on it and say so); VS5-1 (§2.9
  step 5; §16 M1 agrees). Companions: VD5-3 (§2.9 step 2 → §7.4's rebase row, which runs case (4) over every unedited
  name; §6.3's trigger list names the `frozenImport`); NP5-2 (rule 3 (c) and rule 7 point to §4.2 S1 (5), which lists
  S5b's shore-split batch).

## 4. Canon conflicts touching §2 (18) — all resolved as ruled

MODEL-C01 (move clearing → §3.6 "The `split` flag under moves", which states (b)/(b′)); C02 (both places cite "§3.8's
convex near-rectangle test"; §3.8 names it so); C03 (`ComposedTower`); C04 (`Castle.surround` gloss; §4.8 lists the same
values, moat separate); C05 (§2.5 and §2.9 step 4 scope to "a kind that declares one (§2.8)"); C06 (opened people in
view state, both places); C07 (rule 5's non-vertex-points clause; `LatticePoint` comment and §2.4 point there); C08
(aliases in §2.8; D1 — see V-MODEL-12); C09 ("every in-window load (step 3)"); C10 (unit-branded types, no field
renamed — see V-MODEL-08 for the lint wording); C11 (deck placement → §4.2 S1 (5), complete there); C12 ("the canonical
style state" in §2.9's intro). KERNEL-C07 (no "soft"; values kept, D6, agreeing with §3.2 (2)); CANON-C02 (directions →
§3.2 (5)); SCOPE-C06 (VS5-1). Where §2 is the home: KERNEL-C10 (§3.8 draws the ridge on `ridgeAxis`'s line), CF-PIPE-06
(§7.4, §7.6, §10.4 point to §2.9's pack set), CANON-C01 (§8.2, §8.3 say "every `Pin.kind` of §2.7").

## 5. Cross-part notes addressed to §2 — reflected (one optional suggestion not taken)

| from | note | verdict |
|---|---|---|
| kernel 1 (a) | drop "soft" in `LatticeSpec` | reflected |
| kernel 1 (b) | flags comment / rule 3 (b): pointer to §3.6, "other than knot rows", pin set by `pinVertices` | reflected |
| kernel 1 (c) | tombstones: "deleted, moved to another level or partition, or changed" | reflected by pointer: the comment now defers to §3.3, which carries that wording (single source) — valid, judged satisfied |
| kernel 1 (d) | drift figures and placement bound → §3.6 / §3.10 | reflected |
| kernel 1 (e) | drop VK5-3's column clause; 0.54–0.66 % "may" be cited | reflected (figure moved to J-K28, D9) |
| kernel 1 (f) | pool-copy figures are §3.3 pool step 1's | reflected |
| kernel 2 | §2.9 chunks: VK5-1 wording; block-group fallback and load steps stay §2.9's | reflected (membership sentence moved to §3.9 entirely; §3.9 points back for the fallback) |
| kernel 3 | cite §3.8's convex near-rectangle test twice | reflected |
| pipeline M-1…M-8 | waterfront, hydrology, datum, flats, deck, walls/castle/staged layers, decline hooks, FieldBands/Seams/vacancy/site-plan, relation store/people → pointers; NP5-1/NP5-4 | all reflected (targets read) |
| determinism 2 | keep the contact-name choice in §2.2 rule 7 | reflected (entity choice in rule 7; the ordinal is §3.3 rule 2's per canon KERNEL-118; §7.3 (b) 3 points to rule 7) |
| determinism 4 | §2.8 VD5-5 rule; §2.9 step 2: case (4) renames and the 2 MB cap; no records-tree grouping restated | reflected ("the cap above applies" to the CLI copy is the refusal §7.5 cites) |
| rendering | §2.9 step 3 "may" carry ≈ 35–38 ms | not taken; optional and harmless (§6.2 carries 31–34 + 4 ms, §12.6 the 35–38 ms) |
| rendering | `LayerSpec` → §8.4; Greenery comment → §8.1 / §8.10; `logHead` → §11.3 | reflected |
| scope 5 | §2.3 / §2.6 keep the values D-19 points to | reflected (terrain resolution; heights always populated) |
| scope 9 | "§2.6's test" is §13.2's under that name | reflected (content gaps: V-MODEL-03) |

## 6. The rewrite's deviations D1–D9 (judged)

D1 `Polygon` = one ring: right for every `Polygon` field in §2, §4.11 (`carve`, `contractWall`, `outskirtToDistrict`),
§4.12 and §14 — but see V-MODEL-12 (`build.footprint`). D2 root-of-record rule in §2.9 step 3: right (§7.5 (2), §5.3,
§7.4 cite it; no duplicate). D3 install mechanics in §2.9 step 4: right; the policy sentence was not in fact reduced
(V-MODEL-07). D4 dormancy in §2.8: right (§6.3 points to "§2.8's dormant record"; the two agree). D5 field glosses:
right. D6 `LatticeSpec` literals: right (agree with §3.2). D7 role name `composition`: right. D8 `Porch` / `Room`
shapes: right (NP5-4's first option). D9 0.54–0.66 % to J-K28: right (history of a rejected test).

## 7. Mechanical checks (executed)

* §2 in the document equals the rewrite file (`diff` exit 0, trailing newline only).
* All 431 inventory ids in the mapping table, 0 unmapped, 0 extra; every disposition matches the canon role (script).
* Token diff archive §2 → new §2 (backticked identifiers and numbers): 82 absent; each accounted for — line-break
  variants, targets that state them (§3.x, §4.2, §6.2, §7.x, §10.3, §11.1, §13.x), rationale (J-K7, J-K12, J-K23,
  J-K28, J-K31, J-P1, J-P49) or receipt-only history (11 838 / 12 000, 3 574, "0.25, 1"). Reverse: 32 new tokens, all
  from the open items (`composition`, `Room`, `Porch`, `ComposedTower`), MODEL-C10's types or new pointers.
* All 37 J-ids cited in §2 have an index row in the document and a rationale Part A row; F.1 holds every one of the 28
  moved passages (J-P50 and J-DET-52 are the new rows).
* 108 distinct references into §2 from other sections: every `§2.x` anchor, rule number, step and named paragraph
  exists; every named anchor §2 cites elsewhere exists (§3.3 "No item changes in place", clear-region rules, pool steps
  1/5, same-level-split rule; §3.6 "The `split` flag under moves", step 5, candidate (b); §3.8's test; §6.2
  "Maintenance", (iii); §7.3 items 2, 4, 6, 7 (ii)/(vi), (a) 4, (b) 1/3/9; §7.4 "Sessions", rebase row; §7.5 (2)).
* Deferral scan of §2 (TBD, later, deferred, open question, for now, future): only temporal "later" (a later edit or
  call); no "round N" narration; no `PENDING FABLE REVIEW` line; no fix-round ids (the COV-/FTG-/LC-/GEO- audit ids are
  kept by the rewrite's stated rule).

## 8. Observations (not issues)

* Tag style: §2 keeps requirement and audit ids (COV-, FTG-, LC-, GEO-, SCL-, VIS-, MFP-, AM-, DEF-), §5–§7 and the scope
  sections dropped them; the assemble seat already left the one-style ruling to the validator.
* §2.6 used to give the stage-3 tile bound as "16 ms of frame work"; §12.7 (the home) says "of pool time". The pointer
  resolves the old disagreement toward the home.
* NEW-PIPE-1 (sea wall's water gates): CONFIRMED the archive's §2.7 ("only at the harbour mouth") disagreed with its
  §4.4 S5a and §4.8 ("every quay access under either wall"); §2 now defers to §4.4. That §4.4's reading is the intended
  design is PLAUSIBLE — for Fable.

CONFIRMED vs PLAUSIBLE: CONFIRMED (executed or read at the place) — every verdict in §9 and V-MODEL-01…07, 09, 11, 12;
PLAUSIBLE (reading of intent) — V-MODEL-08's lint scope, V-MODEL-10 and V-MODEL-13, and meaning-level equivalence of
the reworded prose beyond the items checked.

## 9. Checked list — every inventory id

Verdicts: **OK** (same meaning at the mapped place; for a reference, the pointer is present and its target, read,
states the fact) or the issue id of §2. "script" = checked by the J-id / token script; "read" = target read in place.

| id | disposition | verdict | note |
|---|---|---|---|
| MODEL-001 | state | OK | intro kept; "added later" reworded to "owner-staged … need no change of the model" (no deferral wording) |
| MODEL-002 | state | OK | §2.1 Units — present |
| MODEL-003 | reference | OK | pointer "inside the arena frame of §3.2 (9)"; §3.2 (9) states area × aspect frames (read) |
| MODEL-004 | reference | OK | pointer to §3.2 (6); §3.2 (6) states area2 exact twice-areas and orient2d orientation (read) |
| MODEL-005 | state | OK | directions → §3.2 (5) (CANON-C02); §3.2 (5) read |
| MODEL-006 | state | V-MODEL-08 | lint now also refuses angle fields — beyond MODEL-C10 |
| MODEL-007 | state | OK | §2.1 Layers — present |
| MODEL-008 | state | OK | §2.1 Layers (arena per layer, PlatKey) + §2.2 rule 2 (never cut ground faces; cross-arena ids) — present |
| MODEL-009 | section restatement | OK | section restatement; §8.4 states sky shadows onto ground and `exportSeparately` (read) |
| MODEL-010 | state | OK | §2.1 Layers — present |
| MODEL-011 | reference | OK | §8.4 declares LayerSpec (read) |
| MODEL-012 | state | OK | §2.1 Layers wording — present |
| MODEL-013 | state | OK | §2.1 Ids — present |
| MODEL-014 | reference | OK | §6.3 states the two identities, anchor/hysteresis table, succession, JOIN, collision rule (read) |
| MODEL-015 | state | OK | §2.1 Ids (interned u32 / strings; parent a field; the arena-slot clause points to §2.2 rule 5) — present |
| MODEL-016 | state | OK | §2.2 types — present |
| MODEL-017 | state | OK | §2.2 types — present |
| MODEL-018 | state | OK | §2.2 types — present |
| MODEL-019 | state | OK | §2.2 types — present |
| MODEL-020 | state | OK | §2.2 types — present |
| MODEL-021 | state | OK | VK5-2 "other than knot rows" and "set only by pinVertices"; move clearing → §3.6 (MODEL-C01) |
| MODEL-022 | state | OK | §2.2 types (vertices.level) — present |
| MODEL-023 | state | OK | §2.2 types (halfEdges) — present |
| MODEL-024 | state | OK | §2.2 types — present |
| MODEL-025 | state | OK | literal values kept (D6), agree with §3.2 (1)–(2); "soft" dropped (KERNEL-C07) |
| MODEL-026 | state | OK | §2.2 LevelFaces — present |
| MODEL-027 | state | OK | §2.2 RoleTable — present |
| MODEL-028 | state | OK | rule 7 indexed list + `composition` (NP5-1); see V-MODEL-11 for §3.10's stale list |
| MODEL-029 | state | OK | §2.2 comment after RoleTable (J-K22) — present |
| MODEL-030 | reference | OK | pointer is in §2.2 *Size* ("§3.3 pool step 1's"), not in the comment; §3.3 pool step 1 states the ArrayBuffer copy (read) |
| MODEL-031 | state | OK | §2.2 types — present |
| MODEL-032 | state | OK | tombstone semantics now by pointer to §3.3; §3.3 "Tombstones and rebuilds" and pool step 1 state keys, "moved to another level or partition", rebuild empties, empty at every freeze (read) |
| MODEL-033 | state | OK | pointer now §3.3 rule 2 (kernel allocation) — rule 2 read |
| MODEL-034 | state | OK | §2.2 types — present |
| MODEL-035 | state | OK | §2.2 types comment — present |
| MODEL-036 | state | OK | §2.2 types — present |
| MODEL-037 | state | OK | §2.2 types — present |
| MODEL-038 | state | OK | §2.2 types — present |
| MODEL-039 | state | OK | §2.2 types — present |
| MODEL-040 | state | OK | §2.2 types — present |
| MODEL-041 | state | OK | comment points to rule 5 (MODEL-C07); alias in §2.8 (MODEL-C08) |
| MODEL-042 | state | OK | §2.2 types — present |
| MODEL-043 | state | OK | §2.2 types — present |
| MODEL-044 | state | OK | §2.2 rule 1 — present |
| MODEL-045 | state | OK | §2.2 rule 1 — present |
| MODEL-046 | state | OK | §2.2 rule 1 — present |
| MODEL-047 | state | OK | §2.2 rule 1 — present |
| MODEL-048 | state | OK | §2.2 rule 1 — present |
| MODEL-049 | state | OK | §2.2 rule 1 — present |
| MODEL-050 | state | OK | §2.2 rule 1 — present |
| MODEL-051 | reference | OK | §3.7 l. 2303 states bandUnion per-side parts; §4.8 wall strips + S10 step (0) (read) |
| MODEL-052 | state | OK | §2.2 rule 1 — present |
| MODEL-053 | state | OK | §2.2 rule 1 — present |
| MODEL-054 | state | OK | §2.2 rule 1 — present |
| MODEL-055 | state | OK | §2.2 rule 2 — present |
| MODEL-056 | reference | OK | §3.10 nesting row (read) |
| MODEL-057 | state | OK | §2.2 rule 2 — present |
| MODEL-058 | state | OK | §2.2 rule 2 — present |
| MODEL-059 | state | OK | §2.2 rule 2 — present |
| MODEL-060 | state | OK | §2.2 rule 2 — present |
| MODEL-061 | state | OK | §2.2 rule 3 — present |
| MODEL-062 | state | OK | §2.2 rule 3 — present |
| MODEL-063 | state | OK | §2.2 rule 3 — present |
| MODEL-064 | state | OK | §2.2 rule 3 — present |
| MODEL-065 | state | OK | §2.2 rule 3 — present |
| MODEL-066 | state | OK | §2.2 rule 3 (J-K32 sentence; standing-distance figures referenced to §3.6/§3.10) — present |
| MODEL-067 | reference | OK | §3.6 placement-rule paragraph carries 1.25 / 1.36 / 1.49 cm with both receipts (read) |
| MODEL-068 | reference | OK | §3.10 placement-bound row + §3.3 route-edge boxes (read) |
| MODEL-069 | state | V-MODEL-09 | parenthetical now asserts the vertex lies in the current route's hot pixel |
| MODEL-070 | reference | OK | §3.3 clear-region rules 1–3 + §3.6 candidate (c) state clear region, prepared contacts, E_LEVEL/E_KEPT (read) |
| MODEL-071 | state | OK | §2.2 rule 3 Promotion paragraph (J-I12) — present |
| MODEL-072 | state | OK | §2.2 rule 3 — present |
| MODEL-073 | state | OK | §2.2 rule 3 "The split flag" (clearing (b) → §3.6) — present |
| MODEL-074 | reference | OK | §3.6 "The `split` flag under moves" states (b)/(b′) (read); §2.2 keeps (a), (c) and names (b) by pointer |
| MODEL-075 | reference | OK | §3.6 flag-under-moves paragraph carries the warped-T-junction consequence (read) |
| MODEL-076 | state | OK | §2.2 rule 3 demotion — present |
| MODEL-077 | state | OK | §2.2 rule 3 (a) — present |
| MODEL-078 | state | OK | §2.2 rule 3 (b) — present |
| MODEL-079 | state | OK | VK5-2 applied ("other than knot rows", "keeping any knot row") |
| MODEL-080 | state | OK | placement list → §4.2 S1 (5), which lists L1 (preparation) and L0 (S1, S3, S4/S5b/edit shore splits) placers (read); "only then takes its way's level" follows from (c)'s general rule |
| MODEL-081 | state | OK | §2.2 rule 3 (c) — present |
| MODEL-082 | state | OK | §2.2 rule 3 demotion (c) (the flag is the whole guard) — present |
| MODEL-083 | state | OK | §2.2 rule 3 "So a plot-line end…" — present |
| MODEL-084 | state | OK | VK5-3 wording applied; 0.54–0.66 % now only in J-K28 (rationale Part A row and F.1, read) — D9 |
| MODEL-085 | reference | OK | §3.6 (read) |
| MODEL-086 | reference | OK | §3.3 "No item changes in place" / "What each level's index holds" and §3.6 step 5 (read) |
| MODEL-087 | reference | OK | §3.10 level-consistency row (read) |
| MODEL-088 | reference | OK | §3.4 doors paragraph and §3.6 steps 1–5 (read) |
| MODEL-089 | reference | OK | still stated in rule 4 with pointer; §3.6 step 5 states the local re-walk (read) |
| MODEL-090 | state | OK | §2.2 rule 5 — present |
| MODEL-091 | state | OK | §2.2 rule 5 (plus the canon's non-vertex-points clause, MODEL-C07) — present |
| MODEL-092 | state | OK | §2.2 rule 5 — present |
| MODEL-093 | reference | V-MODEL-01 | "valid until the next commit (a debug build asserts the version)" now nowhere |
| MODEL-094 | state | OK | §2.2 rule 5 — present |
| MODEL-095 | state | OK | §2.2 rule 5 Stretches (J-K31) — present |
| MODEL-096 | state | OK | §2.2 rule 5 Stretches — present |
| MODEL-097 | reference | OK | §3.4 Stretches paragraph (read) |
| MODEL-098 | state | OK | §2.2 rule 5 knot profiles (J-K10) — present |
| MODEL-099 | state | OK | §2.2 rule 5 chain attributes — present |
| MODEL-100 | state | OK | §2.2 rule 5 chain attributes — present |
| MODEL-101 | state | OK | §2.2 rule 5 chain attributes — present |
| MODEL-102 | state | OK | §2.2 rule 5 chain attributes — present |
| MODEL-103 | state | OK | §2.2 rule 5 cutting/joining (J-K23; ≤ 6.8 × 10⁻¹³ cm receipt) — present |
| MODEL-104 | history out | OK | history out; receipt "≤ 6.8 × 10⁻¹³ cm … r3_checks.out B" kept; 8.47 m in J-K23 (F.1) |
| MODEL-105 | state | OK | §2.2 rule 5 cutting/joining — present |
| MODEL-106 | history out | OK | history out; receipt r4_checks.out C kept; 8.36 m / 25.8 m in J-K31 (F.1) |
| MODEL-107 | state | OK | §2.2 rule 5 cutting/joining — present |
| MODEL-108 | state | OK | §2.2 rule 5 positions in log — present |
| MODEL-109 | state | OK | §2.2 rule 5 positions in log — present |
| MODEL-110 | reference | OK | §7.4 moveCourseKnot row: half control spacing, nearest knot of the body, orphaned, never another body (read) |
| MODEL-111 | reference | OK | §3.6 kernel-pinned paragraph (read) |
| MODEL-112 | state | OK | §2.2 rule 6 — present |
| MODEL-113 | reference | OK | §7.3 item 2 tree scoping (read) |
| MODEL-114 | reference | OK | §3.3 kept content + clear-region rule 1 (read) |
| MODEL-115 | state | OK | §2.2 rule 7 — present |
| MODEL-116 | state | OK | §2.2 rule 7 — present |
| MODEL-117 | state | OK | §2.2 rule 7 — present |
| MODEL-118 | state | OK | + `composition` (NP5-1, D7) |
| MODEL-119 | state | OK | + `composition` |
| MODEL-120 | state | OK | role definition only; placement → §4.2 S1 (5) (MODEL-C11) (read) |
| MODEL-121 | state | OK | §2.2 rule 7 — present |
| MODEL-122 | state | OK | §2.2 rule 7 (structural/partition bullet) — present |
| MODEL-123 | state | OK | §2.2 rule 7 (structural/partition bullet) — present |
| MODEL-124 | state | OK | §2.2 rule 7 anchors (J-K29) — present |
| MODEL-125 | state | OK | §2.2 rule 7 anchors — present |
| MODEL-126 | reference | OK | §3.3 rule 2 states the kernel-allocated smallest free ordinal from 2 on an enceinte; uniqueness via §3.10's per-ordinal row (read) |
| MODEL-127 | reference | OK | §3.3 rules 2–3 (read) |
| MODEL-128 | state | OK | §2.2 rule 7 anchors (gate ends) — present |
| MODEL-129 | reference | OK | §4.4 S5a states generated (L1 Steiner / attracted L0) and edited (promoted L0) gate ends, held unless fromLevel = 0 (read) |
| MODEL-130 | state | OK | §2.2 rule 7 — present |
| MODEL-131 | state | OK | §2.2 rule 7 — present |
| MODEL-132 | state | OK | §2.2 rule 7 — present |
| MODEL-133 | reference | OK | still stated in rule 8 with pointer (§3.3, §3.10) |
| MODEL-134 | state | OK | §2.2 Size — present |
| MODEL-135 | state | OK | §2.2 Size — present |
| MODEL-136 | reference | OK | §3.3 pool step 1 carries 60 000–90 000 items, ≤ ≈ 15 MB, ≈ 20 MB with ≈ 0.5 MB home column (read) |
| MODEL-137 | state | OK | §2.2 Size — present |
| MODEL-138 | state | OK | §2.2 Size (receipts) — present |
| MODEL-139 | rationale out | OK | J-K1: index row + rationale A + F.1 (script) |
| MODEL-140 | rationale out | OK | J-K3 (script) |
| MODEL-141 | rationale out | OK | J-K9 (script) |
| MODEL-142 | rationale out | OK | J-K10 (script) |
| MODEL-143 | rationale out | OK | J-K11 (script) |
| MODEL-144 | rationale out | OK | J-K22 (script) |
| MODEL-145 | rationale out | OK | J-K23 (script) |
| MODEL-146 | rationale out | OK | J-K28 (script) |
| MODEL-147 | rationale out | OK | J-K29 (script) |
| MODEL-148 | rationale out | OK | J-K31 (script) |
| MODEL-149 | rationale out | OK | J-K32 (script) |
| MODEL-150 | state | OK | §2.3 Terrain — present |
| MODEL-151 | state | OK | §2.3 Terrain — present |
| MODEL-152 | state | OK | §2.3 HydroGrid — present |
| MODEL-153 | state | OK | §2.3 HydroGrid + hydrology grid — present |
| MODEL-154 | state | OK | §2.3 TerrainSampler — present |
| MODEL-155 | state | OK | §2.3 WaterBody — present |
| MODEL-156 | state | OK | §2.3 WaterBody comment — present |
| MODEL-157 | state | OK | §2.3 prose — present |
| MODEL-158 | state | OK | §2.3 prose — present |
| MODEL-159 | rationale out | OK | J-K12 (script) |
| MODEL-160 | state | OK | §2.3 hydrology grid — present |
| MODEL-161 | state | OK | §2.3 hydrology grid — present |
| MODEL-162 | state | OK | §2.3 hydrology grid — present |
| MODEL-163 | reference | OK | §13.1 l. 7613: D8 on 100 % of hydro land cells over frame and margin (read) |
| MODEL-164 | move out | OK | moved in: §4.2 S1 (3) states trace on hydro, carve, D8 re-computation on the corridor, ≈ 2 ms (read) |
| MODEL-165 | reference | OK | §12.4 M0 site-and-fields fallback 25→32 / 32→40 / 16→20 m (read) |
| MODEL-166 | rationale out | OK | J-K7 (script) |
| MODEL-167 | move out | OK | moved in: §4.2 S1 (1) (read) |
| MODEL-168 | state | OK | §2.3 Heights — present |
| MODEL-169 | reference | V-MODEL-02 | "with a hill-acropolis site" lost at §13.1 |
| MODEL-170 | reference | OK | §4.2 S1 (3): bucket-queue flood, never raised by ε, lake threshold (read) |
| MODEL-171 | state | OK | §2.3 Flats — present |
| MODEL-172 | state | OK | §2.3 Flats — present |
| MODEL-173 | state | OK | §2.3 Terrain is not in the plat — present |
| MODEL-174 | state | OK | §2.3 — present |
| MODEL-175 | state | OK | §2.3 — present |
| MODEL-176 | state | OK | §2.3 Water attributes — present |
| MODEL-177 | reference | OK | §7.3 (b) 1: moveCourseKnot, moved shore/coast vertex, level-0 warp, drawWater triggers (read) |
| MODEL-178 | state | OK | §2.4 types — present |
| MODEL-179 | state | OK | `width: Cm \| ChainProfile<Cm>` (MODEL-C10 typing; no field renamed) |
| MODEL-180 | state | OK | §2.4 Junction — present |
| MODEL-181 | state | OK | §2.2 rule 7 (merged with MODEL-122; §2.4 prose points there) — present |
| MODEL-182 | state | OK | §2.2 rule 7 (`reserved` edge role; open wall chain) — §2.4 prose points there — present |
| MODEL-183 | state | OK | §2.4 prose (points to §2.2 rule 5 and its exception, MODEL-C07) — present |
| MODEL-184 | state | OK | §2.4 prose — present |
| MODEL-185 | section restatement | OK | section restatement → §6.1 |
| MODEL-186 | state | OK | §2.5 District — present |
| MODEL-187 | state | OK | §2.5 District — present |
| MODEL-188 | reference | OK | §9.1 QuarterNode.cityCut with min(N_q, L) (read) |
| MODEL-189 | state | OK | §2.5 SubDistrict — present |
| MODEL-190 | state | OK | §2.5 Reservation — present |
| MODEL-191 | state | OK | §2.5 Allocation — present |
| MODEL-192 | state | OK | §2.5 FieldBands — present |
| MODEL-193 | state | OK | §2.5 Block — present |
| MODEL-194 | state | OK | §2.5 Frontage — present |
| MODEL-195 | state | OK | §2.5 Plot — present |
| MODEL-196 | reference | OK | §5.2 F-PLOT row (read) |
| MODEL-197 | state | OK | §2.5 PlotBound — present |
| MODEL-198 | state | OK | §2.5 comment — present |
| MODEL-199 | state | OK | §2.5 SitePlan — present |
| MODEL-200 | state | OK | §2.5 BuildingSlot — present |
| MODEL-201 | state | OK | §2.5 SlotPlan — present |
| MODEL-202 | state | OK | obbW/obbD and dist.* typed `M`, aspect `Cdeg` (MODEL-C10) |
| MODEL-203 | state | OK | §2.5 prose — present |
| MODEL-204 | state | OK | §2.5 prose — present |
| MODEL-205 | reference | OK | §4.7 S11 keyed class × prosperityBand × density; §4.5 Bands interpolation between band rows (read) |
| MODEL-206 | rationale out (new id) | OK | new row J-P50 in index and rationale A + F.1 (script, read) |
| MODEL-207 | rationale out | OK | J-P1 (script) |
| MODEL-208 | reference | OK | §9.4 Quarters: MFCG label count, district band labels districts; §4.5 N_q law (read) |
| MODEL-209 | state | OK | §2.5 "What the records are for" — Reservations — present |
| MODEL-210 | state | OK | §2.5 — Allocations (stream keys → §6.1) — present |
| MODEL-211 | section restatement | OK | section restatement; §6.1 lists alloc.district / alloc.block (read) |
| MODEL-212 | reference | OK | II.1 Seam record and "Seam records" rule (read) |
| MODEL-213 | reference | OK | §4.5 Bands: setAttr re-derivation, hysteresis 0.02, replay reproduces bands (read) |
| MODEL-214 | state | V-MODEL-10 | τ clause says plots; §7.2/§4.5 say blocks (pre-existing) |
| MODEL-215 | state | OK | §2.5 — PlotBound bullet — present |
| MODEL-216 | reference | OK | §4.7 S10 (8) vacancy runs (read) |
| MODEL-217 | state | OK | §2.6 Heights — present |
| MODEL-218 | state | OK | §2.6 BaseWing — present |
| MODEL-219 | state | OK | §2.6 BaseWing comment — present |
| MODEL-220 | state | OK | §2.6 BaseWing.corners — present |
| MODEL-221 | state | OK | §2.6 BaseWing.ridgeAxis — present |
| MODEL-222 | state | OK | §2.6 Building — present |
| MODEL-223 | state | OK | `pitch` "a ratio, not an angle" (MODEL-C10, canon PLAUSIBLE reading; no other part reads pitch as an angle — grep) |
| MODEL-224 | state | OK | §2.6 MaterialRow — present |
| MODEL-225 | state | OK | §2.6 OpeningRow — present |
| MODEL-226 | state | OK | §2.6 SubLocation — present |
| MODEL-227 | state | OK | NP5-4: ComposedTower[], Room defined |
| MODEL-228 | state | OK | NP5-4: relative Porch; ComposedTower (MODEL-C03) |
| MODEL-229 | state | OK | §2.6 BuildingInput — present |
| MODEL-230 | state | OK | §2.6 BuildingGenerator — present |
| MODEL-231 | state | OK | §2.6 ClassRules — present |
| MODEL-232 | state | OK | §2.6 code comment — present |
| MODEL-233 | state | OK | §2.6 carryWings — present |
| MODEL-234 | state | OK | §2.6 base outline builder — present |
| MODEL-235 | state | OK | §2.6 base outline builder 1 — present |
| MODEL-236 | state | OK | §2.6 base outline builder 2 — present |
| MODEL-237 | state | OK | §2.6 wings paragraph (J-P17) — present |
| MODEL-238 | state | OK | §2.6 wings paragraph — present |
| MODEL-239 | rationale out | OK | J-P17 (script) |
| MODEL-240 | state | OK | §2.6 Row footprints are quads — present |
| MODEL-241 | state | OK | §2.6 Row footprints — present |
| MODEL-242 | state | OK | §2.6 Row footprints — present |
| MODEL-243 | reference | OK | §3.8 "the convex near-rectangle test" (read); MODEL-C02 |
| MODEL-244 | reference | OK | §13.2 l. 7672–7674 curved-street row fixtures with oblique rear lines (read) |
| MODEL-245 | rationale out | OK | J-P31 (script) |
| MODEL-246 | rationale out | OK | J-P39 (script) |
| MODEL-247 | state | OK | §2.6 wing-carrying rule intro — present |
| MODEL-248 | state | OK | §2.6 carry intro "When it runs is stage-agnostic (J-P47)" — present |
| MODEL-249 | state | OK | §2.6 wing-carrying rule intro — present |
| MODEL-250 | state | OK | §2.6 wing rule 1 — present |
| MODEL-251 | state | OK | §2.6 wing rule 2 — present |
| MODEL-252 | state | OK | §2.6 wing rule 3 (cites §3.8's convex near-rectangle test, MODEL-C02) — present |
| MODEL-253 | state | OK | §2.6 wing rule 4 (J-P49) — present |
| MODEL-254 | state | OK | §2.6 wing rule 4 — present |
| MODEL-255 | state | OK | figures kept; M3a measurement and fallback → §12.6 (read) |
| MODEL-256 | reference | OK | §12.6 warp-preview bullet states the fallback (read) |
| MODEL-257 | history out | OK | history out; receipt pointer kept; 75 884 in J-P49 rationale |
| MODEL-258 | state | OK | §2.6 wing rule 5 — present |
| MODEL-259 | state | OK | §2.6 "A stored composition is carried with its wings (J-P48)" — present |
| MODEL-260 | state | OK | NP5-1 applied in full (levels, faces, `composition` guard, scope); see V-MODEL-13 for §7.3 item 7 (ii) |
| MODEL-261 | state | OK | §2.6 stored composition (2)–(5) — present |
| MODEL-262 | state | OK | §2.6 stored composition (failure paragraph) — present |
| MODEL-263 | state | OK | §2.6 stored composition (failure paragraph, last sentence) — present |
| MODEL-264 | reference | V-MODEL-03 | §13.2's "§2.6's test" lost four clauses |
| MODEL-265 | reference | OK | §13.2 l. 7700–7702 compound generation = regeneration (read) |
| MODEL-266 | history out | OK | history out; receipt pointer kept |
| MODEL-267 | rationale out | OK | J-P42 (script) |
| MODEL-268 | rationale out | OK | J-P49 (script) |
| MODEL-269 | state | OK | §2.6 Heights and the ground datum — present |
| MODEL-270 | state | OK | §2.6 Heights and ground datum — present |
| MODEL-271 | state | OK | §2.6 Heights and ground datum — present |
| MODEL-272 | state | OK | §2.6 Heights and ground datum — present |
| MODEL-273 | state | OK | §2.6 Heights and ground datum — present |
| MODEL-274 | move out | OK | moved in: §13.2 l. 7666–7668 heights acceptance (read) |
| MODEL-275 | state | OK | §2.6 Materials — present |
| MODEL-276 | state | OK | §2.6 Descriptions — present |
| MODEL-277 | state | OK | §2.6 stage-3 hook (budgets → §12.7; the contract stated once here) — present |
| MODEL-278 | reference | OK | §12.7 stage-3 hook bullet (read); purpose clause "so the METROPOLIS city view composes no manor" survives as §2.6 "the city view never waits for a manor" |
| MODEL-279 | reference | OK | §12.7: ≤ 1 ms per building, 16 ms of pool time amortised — the archived §2.6 said "frame work"; canonical home wins (canon merged into RENDERING-577) |
| MODEL-280 | reference | OK | §13.2 stage property tests list the stage-3 contract (read) |
| MODEL-281 | state | OK | §2.6 stage-3 intake bullet (the 10 µs median cited as §12.7's) — present |
| MODEL-282 | reference | OK | §13.2 l. 7707–7708 intake runs the same test with compositions stored (read) |
| MODEL-283 | state | OK | waterfront gloss defers water gates to §4.4 S5a (NEW-PIPE-1: archive §4.4/§4.8 put a gate at every quay access under either wall — CONFIRMED old disagreement) |
| MODEL-284 | state | OK | §2.7 Gate — present |
| MODEL-285 | state | OK | §2.7 Tower (the wall tower keeps the name, MODEL-C03) — present |
| MODEL-286 | state | OK | MODEL-C04 comment applied |
| MODEL-287 | state | OK | §2.7 Bridge — present |
| MODEL-288 | state | OK | §2.7 Greenery — present |
| MODEL-289 | reference | OK | §8.1 item 2 and §4.9 trees-at-render row (render.instances/<entity> by ordinal) (read) |
| MODEL-290 | state | OK | §2.7 LandUse — present |
| MODEL-291 | state | OK | §2.7 SiteResources — present |
| MODEL-292 | state | OK | §2.7 Decoration — present |
| MODEL-293 | state | OK | §2.7 Pin — present |
| MODEL-294 | reference | OK | §9.1 LabelEntity / QuarterNode (read) |
| MODEL-295 | state | OK | §2.7 Institution — present |
| MODEL-296 | state | OK | §2.7 Household — present |
| MODEL-297 | state | OK | §2.7 Person — present |
| MODEL-298 | state | OK | §2.7 Faction — present |
| MODEL-299 | state | OK | §2.7 Government — present |
| MODEL-300 | state | OK | §2.7 Religion — present |
| MODEL-301 | reference | OK | §10.1 base schema from M1; §10.3 module persists with lifecycle and reference integrity (read) |
| MODEL-302 | state | OK | §2.7 relation store records — present |
| MODEL-303 | state | OK | §2.7 SkyIsland (+ "The staged layers" paragraph for field meanings) — present |
| MODEL-304 | state | OK | §2.7 Tunnel (+ "The staged layers" paragraph) — present |
| MODEL-305 | reference | OK | §10.3 derivePerson, pinning an explicit edit, diffed re-derive (read) |
| MODEL-306 | state | OK | MODEL-C06 applied |
| MODEL-307 | state | OK | §2.7 people paragraph — present |
| MODEL-308 | reference | OK | §4.4 S5a open chains, enclosed/sealed test, waterfront rows, aroundStage (read); NEW-PIPE-1 |
| MODEL-309 | state | OK | §2.7 "Both faces of a wall are unbuildable" — present |
| MODEL-310 | reference | OK | §4.8 wall strips + §3.3 pool steps 1/3 (read) |
| MODEL-311 | reference | OK | §4.8 castle + §4.2 S3 (8) gate fixed before S4 (read) |
| MODEL-312 | reference | OK | §4.8 water furniture + §4.2 S1 (5) (read) |
| MODEL-313 | reference | OK | §4.2 S1 (5) fourth bullet (read) |
| MODEL-314 | reference | OK | §4.2 S1 (5) (read) |
| MODEL-315 | reference | OK | §4.2 S1 (5) second bullet incl. crossing.snapM in the third (read) |
| MODEL-316 | reference | OK | §4.2 S1 (5) third bullet, S5b included (NP5-2) (read) |
| MODEL-317 | state | OK | §2.7 "What the content records settle" — present |
| MODEL-318 | reference | OK | II.6 rules; field meanings kept (D5); "after the city is mastered" is II.6's (read) |
| MODEL-319 | state | OK | "inputs of its derivation" (not "last") — consistent with VD5-5 |
| MODEL-320 | state | OK | §2.8 intro — present |
| MODEL-321 | reference | OK | MODEL-C09 "every in-window load"; §6.2 records digest (read) |
| MODEL-322 | state | OK | MODEL-C08 aliases; D1 (Polygon = one ring) — see V-MODEL-12 for its §4.11 consequence |
| MODEL-323 | state | OK | §2.8 Identity — present |
| MODEL-324 | state | OK | §2.8 Existence — present |
| MODEL-325 | state | OK | §2.8 LifecycleFlags — present |
| MODEL-326 | state | OK | §2.8 Lifecycle — present |
| MODEL-327 | state | OK | §2.8 LifecycleEvent — present |
| MODEL-328 | state | OK | §2.8 Tombstone — present |
| MODEL-329 | state | OK | MODEL-C05 comment; epoch "of the derivation that wrote it" (VD5-5) |
| MODEL-330 | state | OK | §2.8 NamingRecord — present |
| MODEL-331 | state | OK | §2.8 Provenance — present |
| MODEL-332 | state | OK | §2.8 SliceRef — present |
| MODEL-333 | state | OK | §2.8 One existence state — present |
| MODEL-334 | reference | OK | §4.11 ConversionOp union holds abandon, decay, ruin, robStone, clear, rebuild, plotToGarden, contractWall; epoch-stream rule table (read) |
| MODEL-335 | state | OK | §2.8 History — present |
| MODEL-336 | state | OK | §2.8 History — present |
| MODEL-337 | state | OK | §2.8 History — present |
| MODEL-338 | state | OK | §2.8 History — present |
| MODEL-339 | move out | OK | moved in: §13.2 20-epoch test (read) |
| MODEL-340 | state | OK | §2.8 History — present |
| MODEL-341 | rationale out | OK | J-DET-33 (script) |
| MODEL-342 | state | OK | VD5-5 preferred option applied; §7.3 item 6 relies on it (read) |
| MODEL-343 | state | OK | §2.8 Naming records (J-DET-41 left as the id) — present |
| MODEL-344 | state | OK | §2.8 Naming records — present |
| MODEL-345 | reference | OK | D4: record-level dormancy kept; §6.3 case (4) lists the ending events, the record's salt, confirmation (read) |
| MODEL-346 | rationale out | OK | J-DET-46 (script) |
| MODEL-347 | rationale out | OK | J-DET-41 (script) |
| MODEL-348 | state | OK | §2.8 Provenance bullet — present |
| MODEL-349 | state | OK | §2.8 Provenance bullet — present |
| MODEL-350 | reference | OK | §6.4 "a release that changes no output keeps its output version" (read) |
| MODEL-351 | reference | OK | §6.2 excluded-provenance clause + §2.9 digests list (read) |
| MODEL-352 | state | OK | §2.8 Rules cite slices — present |
| MODEL-353 | state | OK | §2.8 entity registry — present |
| MODEL-354 | move out | OK | moved in: §13.2 Document tests (read); the "VG's palisade ghost" motive dropped (not normative) |
| MODEL-355 | state | OK | MODEL-C12 applied |
| MODEL-356 | state | OK | §2.9 Document — present |
| MODEL-357 | state | OK | §2.9 Document.packs — present |
| MODEL-358 | reference | OK | §7.4 records: 64 events or 20 MB (read) |
| MODEL-359 | state | OK | §2.9 Base — present |
| MODEL-360 | state | OK | §2.9 Seed — present |
| MODEL-361 | state | OK | §2.9 Recipe — present |
| MODEL-362 | state | OK | §2.9 PackData / HostContent — present |
| MODEL-363 | state | OK | MODEL-C09 applied |
| MODEL-364 | state | OK | §2.9 ChunkRef — present |
| MODEL-365 | state | OK | MODEL-C06 applied |
| MODEL-366 | state | OK | §2.9 EpochRecord — present |
| MODEL-367 | state | OK | §2.9 RebaseReason — present |
| MODEL-368 | state | OK | §2.9 UndoRecord — present |
| MODEL-369 | state | OK | §2.9 One source of truth — present |
| MODEL-370 | reference | V-MODEL-06 | §7.7 names assignments only |
| MODEL-371 | reference | OK | §5.4 timings telemetry (read); caches in `Document.derived` comment |
| MODEL-372 | state | OK | §2.9 One source of truth — present |
| MODEL-373 | state | OK | §2.9 pack set bullet — present |
| MODEL-374 | state | OK | §2.9 pack set bullet — present |
| MODEL-375 | reference | OK | §7.5 (2) packs-stop-shipping bullet (read) |
| MODEL-376 | state | OK | §2.9 pack set bullet — present |
| MODEL-377 | state | OK | §2.9 pack set bullet — present |
| MODEL-378 | state | OK | §2.9 pack set bullet — present |
| MODEL-379 | state | OK | §2.9 pack set bullet — present |
| MODEL-380 | rationale out | OK | J-DET-35 (+J-DET-50) (script) |
| MODEL-381 | state | OK | §2.9 load step 1 — present |
| MODEL-382 | state | OK | §2.9 load step 2 — present |
| MODEL-383 | state | OK | §2.9 load step 2 — present |
| MODEL-384 | state | OK | VD5-3 companion pointer; §7.4 rebase row states case (4) over every unedited name (read) |
| MODEL-385 | rationale out | OK | J-DET-44 (script) |
| MODEL-386 | state | OK | §2.9 load step 2 — present |
| MODEL-387 | state | OK | §2.9 load step 3 "Decode and check" — present |
| MODEL-388 | reference | OK | §6.2 Bars: ≈ 31–34 / 95–101 ms and records ≈ 4 / 11 ms with receipts (read) |
| MODEL-389 | state | OK | §2.9 load step 3 "Corrupt cache" — present |
| MODEL-390 | reference | OK | D2: kept; §7.5 (2) re-rooting cites §2.9 step 3 (read), no disagreement |
| MODEL-391 | state | OK | §2.9 load step 3 "A rebased base" — present |
| MODEL-392 | state | OK | §2.9 load step 3 "Working state and verification replay" — present |
| MODEL-393 | state | OK | §2.9 load step 3 "Working state and verification replay" — present |
| MODEL-394 | state | OK | §2.9 load step 3 "Edits held for provenance" — present |
| MODEL-395 | state | OK | §7.3 item 6 (records identical by §2.8's rule) (read) |
| MODEL-396 | state | OK | §2.9 load step 3 "Verified" — present |
| MODEL-397 | state | OK | §2.9 load step 3 "Records mismatch (J-DET-52)" — present |
| MODEL-398 | rationale out (new id) | OK | new row J-DET-52 (script, read) |
| MODEL-399 | reference | V-MODEL-05 | label "checking the saved copy…" lost |
| MODEL-400 | state | OK | §2.9 load step 3 "Budget and measurement" — present |
| MODEL-401 | state | OK | §2.9 load step 3 "Budget and measurement" — present |
| MODEL-402 | state | OK | §2.9 load step 3 "Budget and measurement" (fallbacks) — present |
| MODEL-403 | reference | V-MODEL-04 | pass criteria lost at §13.2 |
| MODEL-404 | state | OK | §2.9 load step 4 — present |
| MODEL-405 | state | OK | §2.9 load step 4 — present |
| MODEL-406 | state | OK | §2.9 load step 4 — "every entity of a kind that declares one (§2.8)" (MODEL-C05) — present |
| MODEL-407 | reference | V-MODEL-07 | policy restated in §2.9 and §11.3 with differing detail |
| MODEL-408 | reference | V-MODEL-04 | pass criteria lost at §13.2; §11.3 convergence clause present (read) |
| MODEL-409 | rationale out | OK | J-DET-38 / J-DET-42 (script; F.1 holds all three "Chose" sentences) |
| MODEL-410 | state | OK | VS5-1 applied; §16 M1 agrees (read) |
| MODEL-411 | state | OK | §2.9 snapshot holds — present |
| MODEL-412 | state | OK | §2.9 snapshot holds — present |
| MODEL-413 | state | OK | §2.9 snapshot holds — present |
| MODEL-414 | reference | OK | §5.4 (read) |
| MODEL-415 | reference | OK | §3.9 Chunks (VK5-1 wording) (read) |
| MODEL-416 | reference | OK | §3.9 (read) |
| MODEL-417 | reference | OK | §3.9 rewrite scope (read) |
| MODEL-418 | rationale out | OK | J-DET-36 (+J-DET-19) (script) |
| MODEL-419 | state | OK | §2.9 Size budget — present |
| MODEL-420 | state | OK | §2.9 Size budget (measurement) — present |
| MODEL-421 | state | OK | §2.9 Size budget (fallback 1) — present |
| MODEL-422 | state | OK | §2.9 Size budget (fallback 2) — present |
| MODEL-423 | state | OK | §2.9 Formats — present |
| MODEL-424 | reference | OK | §11.1 compact twin row: CBOR typed-array tags, settlement centre in header (read) |
| MODEL-425 | state | OK | §2.9 Canonical form and digests — present |
| MODEL-426 | section restatement | OK | section restatement; §6.2 says which checks read which digest (read) |
| MODEL-427 | reference | OK | §11.3 logHead (read) |
| MODEL-428 | state | OK | §2.9 View state (opened people added to the list) — present |
| MODEL-429 | reference | OK | §7.4 "Sessions" (read) |
| MODEL-430 | move out | OK | moved in: §13.2 Document tests (read) |
| MODEL-431 | section restatement | OK | section restatement |
