# Consistency rewrite — MODEL part (§2 domain model and schemas)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Output: `docs/validation/consistency/new/model/01-domain-model-and-schemas.md` — the whole
top-level section `## §2 Domain model and schemas`, its heading line and all nine subsection headings (2.1–2.9) exactly as
today, so no pointer into §2 needs renumbering. Inputs read in full: §2 of `docs/ARCHITECTURE.md` (l. 512–2122),
`inventory-model.md/.json`, the Part MODEL section of `canon.md` and every conflict it lists, `canon.json` (facts, by
inventory id, routing), `still-open-r5.json` (the seven routed items), the other parts' headings and, where a pointer's
target mattered, the landed `new/kernel/` and `new/pipeline/` texts and their reports, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`
and `docs/DEFINITION.md`.

## 1. Outcome and sizes

| measure | before | after |
|---|---|---|
| bytes | 186 697 | 141 264 (75.7 %) |
| lines | 1 611 | 1 227 |
| review markers | 9 per-subsection lines | 0 (the document-wide banner replaces them) |
| inventory ids mapped | — | 431 of 431 (0 unmapped) |

Per subsection (bytes, before → after): intro 949 → 948; 2.1 2 752 → 2 344; 2.2 52 678 → 33 639; 2.3 9 474 → 7 177; 2.4 2 079 → 1 675; 2.5 12 758 → 10 332; 2.6 34 236 → 27 793; 2.7 17 877 → 13 501; 2.8 14 010 → 12 000; 2.9 39 884 → 31 855.

**Why 76 % and not 55–65 %.** 304 of the part's 431 items are homed in §2 (record types, the plat's data rules, the wing
and composition carry, the document and load algorithm) and are stated here once, with their values; only 84
restatements, 5 section restatements, 6 move-outs, 28 rationale passages and 4 history passages could leave. About 50 KB
of the part is interface code, which this pass may not change. What was cut: the 28 "Judgment"/"Chose …" passages
(≈ 22 KB; their J-ids stay inline), every fix-round narration and fix-round finding id in the normative text (VK/VD/VP/
NP/VS/NR/NF/K4-1/C-5 …; requirement and audit ids — COV-, FTG-, MFP-, LC-, GEO-, SCL-, VIS-, O-, G-R, DEF-, AM- — kept),
the 84 restatements (now pointers), and the prose around them. The kernel rewrite, the comparable interface-heavy part,
landed at 75 %.

**Checks run (CONFIRMED, executed):** `python3 docs/validation/bench/doc_checks.py --doc <the new file> --heads
docs/ARCHITECTURE.md` → C1 0, C2 0, C3 58 hits / 0 unreviewed, C4 2 / 0, S1 0, S2 0 (every § pointer resolves; the archived
§2 run the same way had 2 unreviewed C3 hits, both removed by rewording). A script compared every number and camel-case
identifier of the 304 STATE items' inventory statements with the new text: all present except (a) the rejected round-4
distance test's 0.54–0.66 % (MODEL-084; it stays with J-K28's rationale), and (b) the near-rectangle test's 30 cm / 0.97,
now cited as "§3.8's convex near-rectangle test" (MODEL-C02). Every J-id of the RATIONALE OUT list is present inline.
Meaning-level equivalence of the rewording is PLAUSIBLE (read by me, not by an independent verifier).

## 2. Open items applied (the §2 edits the canon routed here; the items are owned by other parts)

| item | owner | what changed in §2 |
|---|---|---|
| VK5-1 | kernel | §2.9 no longer states which vertices a partition chunk holds; the chunk bullet points to §3.9, which carries VK5-1's "the vertices that belong to it by §3.3's rebuild rule". The `LevelIndex.tombstones` comment points to §3.3 for which items are tombstoned (VK5-1's "moved to another partition" lives there). |
| VK5-2 | kernel | `Plat.vertices.flags` comment and rule 3 (b): the pin is set only by `pinVertices` and cleared when a batch strips the vertex's last vertex role row **other than knot rows**; a deck's bank vertex that F-REDERIVE frees "keeps any knot row". |
| VK5-3 | kernel | Rule 3's evidence sentence: "restored vertex for vertex on 100 000 of 100 000 random routes (…r4_checks.out A) and, with the flag as the whole guard, by construction for any number of later same-level vertices on that route". |
| NP5-1 | pipeline | §2.6 stored composition (1): a boundary point becomes a footprint vertex by a same-level L4 split on an L4 edge, or by an L4 Steiner vertex `splitThrough` places on a plot line (L3) or kerb (L2), the point re-read at the placed vertex; each such vertex carries a `('composition', buildingId, i)` vertex role row while the composition is stored (no dissolution removes it; the row leaves on undo or orphaning); every face sharing a split edge — the building's own yard parts, a row neighbour's footprint (and its wing rings), a neighbouring plot's L4 face across the plot line — gains the vertex and is in the storing edit's effective scope, each ring its prior ring with those vertices removed. The indexed vertex role `composition` is added to §2.2 rule 7's registry list. |
| NP5-4 | pipeline | §2.6: `Room { ring: Polygon; wing: number; subLocation?: Id }` and `Porch { side; offsetCm; widthCm; depthCm }` (relative to its wing's side, no world point, moves with the wing, not carried) defined; the composition's `Tower` renamed `ComposedTower` (`Composition.towers: ComposedTower[]`); §2.7's wall `Tower` keeps its name. |
| VD5-5 | determinism | §2.8 Derivation records: "every derivation that changes the entity's leaf digest (§6.2) rewrites it; a re-derivation that reproduces the leaf digest exactly keeps the old record, as the dependency-graph route, which never touches it, does — so the record never depends on which route re-derived the entity" (the canon's choice of the preferred option). `DerivationRecord.epoch` reads "the epoch of the derivation that wrote it". |
| VS5-1 | scope | §2.9 load step 5: the M1-format regeneration is restricted to "a document of the running output version"; "M1's reader never root-checks a document of another output version: it opens as step 2's frozen view (§16 M1)". |
| (VD5-3, companion) | determinism | §2.9 step 2's `frozenImport` sentence adds a pointer: it "re-draws the names whose naming inputs changed as §7.4's rebase row states". No rule is stated in §2. |
| (NP5-2, robustness) | pipeline | §2.2 rule 3 (c) and rule 7 no longer enumerate which stages place L0 `deck_end` rows (the list lacked S5b under CF-PIPE-10); both point to §4.2 S1 (5). |

## 3. Conflicts resolved

| conflict | resolution in §2 |
|---|---|
| MODEL-C01 split flag under moves | Flags comment and rule 3 "The split flag": clearing case (b) is a pointer to §3.6 "The `split` flag under moves"; §2.2 keeps cases (a) promotion and (c) removal, the demotion steps and the definition. |
| MODEL-C02 near-rectangle test | Row footprints and wing rule 3 cite "§3.8's convex near-rectangle test" and restate none of its terms. |
| MODEL-C03 two `Tower`s | Composition's tower renamed `ComposedTower` (NP5-4); the wall `Tower` comment says so. |
| MODEL-C04 castle surround | `Castle.surround` comment names the type's values (esplanade, park with a perimeter path, plaza, cliff skirt) and says a moat is the separate `moat` field; the §2.7 Castles bullet is now a pointer to §4.8. |
| MODEL-C05 derivation-record holders | §2.5: "a plot's, block's or building's memory … §2.8"; §2.9 step 4: "every entity of a kind that declares one (§2.8)". |
| MODEL-C06 opened people | §2.7: "per-user view state (§2.9), outside every digest"; the §2.9 View state list (which the `ViewState` comment now names as its key list) includes "the people a user has opened". |
| MODEL-C07 stored positions | Rule 5 states the one exception and adds the canon's clause "a point that is no vertex … is an ordinary attribute of its record"; the `LatticePoint` comment and §2.4 point to rule 5. |
| MODEL-C08 point types | §2.8's type list: `PointCm = LatticePoint`, `Point = PointCm`, `VecCm = PointCm` — one shape, three names. `Polygon` declared as one ring (see deviation D1). |
| MODEL-C09 "every load" | §2.8 intro and the `Snapshot` comments say "every in-window load (step 3)". |
| MODEL-C10 unit suffixes | §2.1: a length or angle field carries its unit in its name or in a unit-branded type; §2.8 declares `M`, `Cdeg`, `CmArray`; `Way.width: Cm \| ChainProfile<Cm>`, `WaterBody.widthProfile: CmArray`, `ContextVector.shape.obbW/obbD` and `dist.*: M`, `aspect: Cdeg`; `RoofSpec.pitch` documented as "a ratio, not an angle". No field renamed, no value changed. |
| MODEL-C11 deck bank vertices | Rule 7 "The deck" defines the role and points to §4.2 S1 (5) for who places the bank vertices, at which level; rule 3 (c) and the `Bridge` comments point there too. |
| MODEL-C12 document contents | §2.9 intro: "Everything else in the file is the canonical style state, input recorded for replay, a verified cache, or per-user state." |
| KERNEL-C07 minFaceAngle class | `LatticeSpec` comment drops "soft"; meaning and class by pointer to §3.2 (2) and §3.10 (the literal values stay in the interface — deviation D6). |
| CANON-C02 directions | §2.1: "directions are §3.2 (5)'s". |
| SCOPE-C06 M1 reader | §2.9 step 5 per VS5-1 (above). |
| NEW-PIPE-1 (found by the pipeline rewriter, not in the canon) | `Enceinte.waterfront` comment no longer says `sea_wall` has "water gates only at the harbour mouth"; it glosses `quay_wall` / `sea_wall` and points to §4.4 S5a (the canonical home, which puts a water gate at every quay access under either wall). CONFIRMED that the old texts disagreed; PLAUSIBLE that §4.4's reading is the intended design. |

## 4. Deviations from the canon's routing (decided here, vetoable; Fable should re-check these first)

* **D1 — `Polygon` is one ring, not `PolygonCm` (MODEL-C08).** The canon's alias `Polygon = PolygonCm` (outer ring then
  holes) would change the meaning of every `Polygon` field, all of which are used as one ring: `BaseWing.ring`,
  `carryWings`' `before`/`after: Polygon[]` ("the footprint's rings, outer first"), `Wing.footprint`, courts, `Room.ring`,
  `SkyIsland.outline`, and §4.11 / §4.12 / §14's `ring: Polygon`. Declared `type Polygon = PointCm[] /* one ring */` beside
  `PolygonCm = PointCm[][]`; no field changes.
* **D2 — the root-of-record rule stays in §2.9 step 3 (MODEL-390 → DETERMINISM-530).** §7.5 (2), §5.3's load row, §7.4's
  upgrade row and J-DET-44 all cite "§2.9 step 3" for it; moving it out would leave those pointers circular. §2.9 keeps the
  check of a rebased base against its root of record; the upgrade's re-rooting (`baseDigest`) is referenced to §7.5 (2).
* **D3 — the bridged client's install mechanics stay in §2.9 step 4 (MODEL-407 → RENDERING-471).** §11.3's statement ends
  "it installs the saved town and re-applies events after h₀ (§2.9 step 4)"; the mechanics (decode from the kept bytes,
  check as step 3, `Base.seq = at`, re-apply, stop a running verification, the equal-root and hand-built-log no-ops, a
  loaded document already holding the owner's `keptSnapshot`) exist only in §2.9. The bridge policy sentence points to §11.3.
* **D4 — the naming record's dormancy stays in §2.8 (MODEL-345 → DETERMINISM-231).** §6.3 cites "§2.8's dormant record";
  §2.8 keeps the record-level facts (in place, unread and unrewritten while protected, still travels to a successor; the
  ending event's undo record keeps the former name and record; a never-drawn name has no record) and points to §6.3 for
  case (4) at the end of protection.
* **D5 — field meanings of the staged-layer and enceinte records stay with their types (MODEL-318, MODEL-308; rule R1).**
  `SkyIsland.reason`/`terrainEcho`, the tunnel's drain/fall/discharge fields, `Enceinte.closure`/`waterfront`/`placement`
  keep one-line glosses; their rules are pointers to II.6 and §4.4 S5a.
* **D6 — `LatticeSpec` keeps its literal values (KERNEL-C07 / rule R2).** They are the interface's literal types; removing
  them would change the interface. The comment points to §3.2 (2) for their meaning.
* **D7 — the NP5-1 role is named `composition`** (indexed vertex role, entity = the building). NP5-1 requires "an indexed
  vertex role row of the building" without naming it; no existing role fits.
* **D8 — the NP5-4 shapes:** `Porch { side; offsetCm; widthCm; depthCm }` (the item's first option, as the canon chose);
  `Room.wing` is an index into `Composition.wings`.
* **D9 — MODEL-084's 0.54–0.66 % figure left the normative text** with the rejected round-4 test it measures (J-K28's
  rationale); the kernel report notes the figure is still valid if a reader wants it cited.

## 5. Cross-part notes (other parts' canonical text; not edited here)

1. **kernel §3.6 / §3.10** — §2.2 rule 3 now points to "§3.6's placement rule, §3.10" for the placement bound and its
   measured drift (MODEL-067/068; the canon named §3.1, the kernel rewrite put them in §3.6/§3.10 — keep them there with
   the r4/r5 receipts: one promotion in ten ≈ 1.25 cm, ≈ 1.36 cm after two, ≈ 1.49 cm after three or four). §3.6's
   paragraph must keep the title "The `split` flag under moves" (cited by name) and carry MODEL-075's consequence (a
   warped same-level T-junction becomes a shape vertex; removing the lane never straightens the warped spine; a re-seated
   Steiner vertex keeps the flag).
2. **kernel §3.3** — cited by name from §2.2: "No item changes in place", the clear-region rules 1–3 (rule 2 owns the
   contact name's kernel-allocated ordinal from 2 on an enceinte, "no two vertices carry one anchor key"; rule 3 its
   stripping), pool steps 1 and 5 (the frozen copy's contents and size: ≤ ≈ 15 MB one-click, ≈ 20 MB after edits with
   ≈ 0.5 MB home column), and the same-level-split rule. §3.4 must say `resolve`'s result is valid until the next commit
   (a debug build asserts the version) (MODEL-093).
3. **kernel §3.9 / §3.10** — the new indexed vertex role `composition` (NP5-1) is serialised like the other indexed rows;
   §3.10's one-vertex-per-ordinal check covers it. VK5-1's chunk-membership wording now exists only in §3.9.
4. **pipeline §4.2 S1 (1)/(3)/(5)** — MOVE IN of MODEL-164 and MODEL-167 as the pipeline report states; §4.2 S1 (5) is
   now the only statement of which batches place `deck_end` bank vertices and at which level (L1 rows from a preparation
   batch — carve, outer moat by the carve path, S1's water operator, F-ROUTE's rung inside them; L0 rows from an L0 batch —
   S1's sites, S3's carved channels, the extra-bridge shore splits of S4 / S5b / an edit, an edit's new site); §2.2 rule 3
   (c) reads the level from the rows and depends on that list being complete.
5. **pipeline §4.4 S5a** — owns the generated and edited water gates' bank-vertex placement (L1 Steiner vertices on the L0
   shores or attracted L0 shore vertices; an edited gate's promoted to L0 by the water's batch) and the waterfront rows;
   §2.7's `Enceinte.waterfront` gloss now defers to it (NEW-PIPE-1).
6. **pipeline §4.8** — the castle's surround row must use `Castle.surround`'s values ('none', 'esplanade', 'park',
   'plaza', 'cliff'; moat = `Castle.moat`) (MODEL-C04).
7. **pipeline §4.11** — PIPELINE-353's hook list names `robStone`, `plotToGarden`, `contractWall` while §7.1's `convert`
   comment and the archived §2.8 name the decline hooks abandon, decay, ruin, clear, rebuild; §2.8 now points to §4.11's
   `ConversionOp` without listing, so §4.11 must state the complete kind list once.
8. **determinism §7.3 item 7 (ii)** — the seam-exception check must cover exactly the faces §2.6 composition rule (1) now
   names (the building's yard parts, a row neighbour's footprint and wing rings, a neighbouring plot's L4 face) and the
   `composition` role rows the storing edit adds (NP5-1 companion).
9. **determinism §7.4 rebase row / §6.3** — §2.9 step 2 points to "§7.4's rebase row" for a `frozenImport`'s renames;
   that row must state VD5-3's rule. §6.3's pointer "§2.8's dormant record" stays valid (D4).
10. **determinism §6.2 (iii)** — §2.9 step 3 points there for when "trust the saved town" is offered; the archived §2.9
    also listed "a `verified` report" among what waits for the off-edit-path recomputation — add it there if absent
    (MODEL-399).
11. **determinism §7.5 (2), §5.3, §7.4** — keep citing "§2.9 step 3" for the root of record (D2).
12. **determinism §6.5 (9), §7.3 item 7 oracle (i)** — VD5-5's equal-records-digest requirement; §2.8 now states the
    route-independent record rule they rely on.
13. **rendering §11.3** — state the bridge policy (only an `owner` client keeps the saved town; every other client takes
    the replayed town, reports the mismatch, records its root at h₀ and keeps the ≤ 3 MB `doc.load` bytes) and point to
    §2.9 step 4 for the install mechanics (D3); `logHead` is §11.3's alone.
14. **rendering §12.7 / §12.6** — the stage-3 hook budgets (base `outline()` inside S11's ≤ 3 µs share; stage-3 `outline()`
    ≤ 10 µs median with S11's §12.4 row re-declared by the measured difference; `compose()` ≤ 1 ms per building and one
    tile within 16 ms, amortised) are now stated only in §12.7; the warp Apply measurement at M3a and the wing-check
    fallback only in §12.6.
15. **scope §13.2** — MOVE IN: MODEL-274 (heights on 100 % of buildings, wings, towers and wall runs; 0 wings off the
    datum rule on the hilly goldens and after every terrain stroke, user-edited bases excepted), MODEL-339 (M4: a 20-epoch
    TOWN at ≈ 30 % churn keeps heap ≤ 1.3 × and document ≤ 2 × a fresh town's), MODEL-354 (the entity-registry CI test over
    generation, digest, render, export, persistence, edit, undo, migration; VG's palisade ghost), MODEL-430 (export → import
    → export byte-identical over the canonical form; O9 a, O11 c). §13.2 is now the only statement of "§2.6's test" — keep
    that name — including the generation-equals-regeneration compound (formal-garden grid and orchard edges on the house
    wall) and the stage-3 intake's stored-composition run, and of the load-verification fixtures (corrupt snapshots with
    and without a rewritten chunk hash, the forced §6.2 (iii) case, the altered naming record, the 100 ms edit under both
    choices).
16. **scope §14** — any copy of the composition types: rename `Tower` → `ComposedTower`; add `Room`, `Porch`; the unit
    types `M`, `Cdeg`, `CmArray`; `Point`/`PointCm`/`VecCm` aliases; `Polygon` = one ring (D1).
17. **scope, `docs/ARCHITECTURE-RATIONALE.md`** — add the new rows J-P50 (MODEL-206, the archived §2.5 slot paragraph) and
    J-DET-52 (MODEL-398, the archived §2.9 step 3 sentence) verbatim; §2 cites J-K1, J-K3, J-K7, J-K9–J-K12, J-K22, J-K23,
    J-K28, J-K29, J-K31, J-K32, J-K35, J-P1, J-P17, J-P31, J-P39, J-P42, J-P47–J-P50, J-DET-19, J-DET-33, J-DET-35,
    J-DET-36, J-DET-38, J-DET-41, J-DET-42, J-DET-44, J-DET-46, J-DET-50, J-DET-52, J-I12, J-I14, J-I19 inline, so each needs
    its index row.
18. **all parts** — cite the §2 anchors as they now read: §2.2 rules 1–8 and rule 3's (a)–(c), rule 5's Stretches / knot
    profiles / cutting and joining / positions in the log, rule 7's "The deck" and anchors; §2.6 rules 1–5, "the stored
    composition" (1)–(5), "§2.6's test" (a pointer to §13.2); §2.8 "Derivation records", "Naming records"; §2.9 load steps
    1–5 (step 3 now has named paragraphs: Decode and check, Corrupt cache, A rebased base, Working state and verification
    replay, Edits held for provenance, Verified, Records mismatch, Trust the saved town, Budget and measurement).

## 6. Mapping table — every inventory id of the part (431)

Dispositions follow `canon.json → by_inventory_id`: **state** (homed here, stated once at the named place), **reference** (a restatement replaced by a pointer to its home), **section restatement**, **move out**, **rationale out**, **history out**.

| id | kind | item (inventory statement, abridged) | disposition | where it lives now |
|---|---|---|---|---|
| MODEL-001 | summary | Plain-words intro: town stored as one precise plat (every area a face, every line an edge) in i… | state | §2 intro (plain words; the staged layers worded without "added later") |
| MODEL-002 | rule | Every model length is an integer number of centimetres (i32); world centred on (0,0), +x east, … | state | §2.1 Units |
| MODEL-003 | rule | The world lies inside a rectangular frame of the rung's area and the blueprint's aspect | reference | referenced to §3.2 (9) (KERNEL-092); pointer at §2.1 Units |
| MODEL-004 | rule | Twice-areas are exact integers from area2; ring orientation from orient2d | reference | referenced to §3.2 (6) (KERNEL-088); pointer at §2.1 Units |
| MODEL-005 | rule | Heights are centimetres; stored angles are i32 centidegrees; directions used in geometry are in… | state | §2.1 Units — heights cm, stored angles i32 cdeg; directions → pointer to §3.2 (5) (CANON-C02) |
| MODEL-006 | test | Schema lint refuses any length field without a unit suffix (…Cm, …M) | state | §2.1 Units — lint: unit in the name or in a unit-branded type (MODEL-C10) |
| MODEL-007 | rule | layer ∈ {underground, ground, sky} is a field on every geometric entity and every display-list … | state | §2.1 Layers |
| MODEL-008 | rule | Each layer has its own arena (G-R11): ground, underground, one per sky island, keyed by PlatKey… | state | §2.1 Layers (arena per layer, PlatKey) + §2.2 rule 2 (never cut ground faces; cross-arena ids) |
| MODEL-009 | rule | Per-layer toggles, shadows (sky layer casts onto ground via shadow pass) and per-layer export h… | section restatement | referenced to §8.4 (§2.1 Layers keeps "toggles, shadows and export hang off this one field" + LayerSpec pointer) |
| MODEL-010 | rule | The base populates only the ground layer; underground and sky are schema-complete and empty | state | §2.1 Layers |
| MODEL-011 | type | LayerSpec (order, elevation, visibility, shadow target, separate export, sky layers' occlusion … | reference | referenced to §8.4 (RENDERING-154); pointer at §2.1 Layers |
| MODEL-012 | defined-term | "layer" unqualified means one of the three model layers; toggleable drawing groups of §8–§9 (la… | state | §2.1 Layers wording |
| MODEL-013 | rule | Every entity has an address id kind:token, prefixed with its arena outside the ground layer (sk… | state | §2.1 Ids |
| MODEL-014 | rule | Every entity has a separate lineage key that keys its random streams; the two ids, anchor rule … | reference | referenced to §6.3 (DETERMINISM-209); pointer at §2.1 Ids |
| MODEL-015 | rule | In memory, addresses are interned u32 handles (kernel owner and role tables hold them); in the … | state | §2.1 Ids (interned u32 / strings; parent a field; the arena-slot clause points to §2.2 rule 5) |
| MODEL-016 | type | Cm = integer centimetres; a number becomes an arena coordinate only through snap(), in every bu… | state | §2.2 types |
| MODEL-017 | type | Level = 0\|1\|2\|3\|4: L0 land/water; L1 way skeleton; L2 kerbs, corridors, blocks; L3 plots + … | state | §2.2 types |
| MODEL-018 | type | PlatKey = {layer, part}: part 0 = the ground or underground arena; parts 1–3 = one arena per sk… | state | §2.2 types |
| MODEL-019 | type | VertexId, HalfEdgeId, FaceId are arena slots: kernel-internal, valid within one batch | state | §2.2 types |
| MODEL-020 | interface | Plat record: key, frame (§3.2 (9)), lattice; vertices {x,y,out,level,flags}; halfEdges {origin,… | state | §2.2 types |
| MODEL-021 | rule | Vertex flags: pinned (set by pinVertices; cleared when last vertex role row leaves), steiner, s… | state | §2.2 Plat.vertices.flags comment — "other than knot rows" (VK5-2); move clearing → §3.6 (MODEL-C01) |
| MODEL-022 | rule | Vertex birth level is lowered by promotion, raised by demotion | state | §2.2 types (vertices.level) |
| MODEL-023 | rule | twin(h) = h ^ 1: half-edges allocated in pairs; edge birth level stored per pair (h>>1) and is … | state | §2.2 types (halfEdges) |
| MODEL-024 | rule | indexHome: per slot, the static index partition (numbered across the levels) whose build holds … | state | §2.2 types |
| MODEL-025 | number | LatticeSpec: unitCm 1; minEdgeCm 25; attractCm 26; minFaceAngleCdeg 500 (soft, §3.10); rangeCm … | state | §2.2 LatticeSpec — literal values kept; "soft" dropped, meaning/class pointer to §3.2 (2), §3.10 (KERNEL-C07) |
| MODEL-026 | interface | LevelFaces: outer, holesStart, holes, kind (Uint16), owner (interned entity handle), parent (le… | state | §2.2 LevelFaces |
| MODEL-027 | interface | RoleTable: edgeFirst, vertexFirst (first slot of each set, −1 if none), kind (interned RoleName… | state | §2.2 RoleTable |
| MODEL-028 | rule | Indexed roles (ordinal ≠ 0 allowed) are exactly: knot, attach, anchor, weld, deck_end, gate_end… | state | §2.2 rule 7 (indexed roles; RoleTable.ordinal comment points there) — `composition` added (NP5-1) |
| MODEL-029 | mechanism | RoleHeadTable and OwnerTable are typed-array hash tables (VK2-9; J-K22): open addressing, linea… | state | §2.2 comment after RoleTable (J-K22) |
| MODEL-030 | rule | The arena is typed arrays throughout: a pool worker's frozen copy is ArrayBuffers with nothing … | reference | referenced to §3.3 step 1 (KERNEL-141); pointer at §2.2 comment |
| MODEL-031 | interface | RoleHeadTable {k0 entity handle, k1 = role<<16 \| ordinal, first (−1 empty), count}; OwnerTable… | state | §2.2 types |
| MODEL-032 | interface | LevelIndex: static PackedIndex[] partitions (one per arena at L0–L1; one per district + one out… | state | §2.2 LevelIndex — tombstone semantics pointer to §3.3 (VK5-1 wording lives there) |
| MODEL-033 | type | RoleRow = {role, entity, ordinal?}: row a writer adds; its level is always the adding batch's; … | state | §2.2 types |
| MODEL-034 | type | RoleKey = {role, entity, ordinal}: a row's identity without its level | state | §2.2 types |
| MODEL-035 | rule | FaceRef, ChainRef, EdgeSetRef, VertexRef (and batch-local StretchRef) are the only forms in whi… | state | §2.2 types comment |
| MODEL-036 | type | FaceRef = {owner, level}: view of faces whose owner at that level is the entity | state | §2.2 types |
| MODEL-037 | type | ChainRef = {role, entity}: the ordered edge chain carrying (role, entity) — way spine, wall tra… | state | §2.2 types |
| MODEL-038 | type | EdgeSetRef = {role, entity, ordinal?}: unordered edges carrying the role — plot frontage, acces… | state | §2.2 types |
| MODEL-039 | type | VertexRef = {role, entity, ordinal?}: the vertex carrying the role — junction, tower, gate, ent… | state | §2.2 types |
| MODEL-040 | type | StretchRef = {chain, from, to} (VertexRef or LatticePoint ends): chain edges between two vertic… | state | §2.2 types |
| MODEL-041 | type | LatticePoint = {x: Cm, y: Cm}: arena position, only in log events (with a VertexSig), view stat… | state | §2.2 LatticePoint comment → rule 5 (MODEL-C07); alias PointCm = LatticePoint in §2.8 (MODEL-C08) |
| MODEL-042 | type | VertexSig = {v: vertex's own (role,entity,ordinal) rows sorted; e: structural (role,entity) row… | state | §2.2 types |
| MODEL-043 | type | ChainProfile<T> = {knotRole, values[i] for the chain vertex carrying (knotRole, entity, i), int… | state | §2.2 types |
| MODEL-044 | rule | Everything with a boundary is a face; everything linear is an edge chain | state | §2.2 rule 1 |
| MODEL-045 | rule | L0 faces: land components, sea, lakes, river reaches, islets, ponds, moats — land and water onl… | state | §2.2 rule 1 |
| MODEL-046 | rule | Arena outer ring (frame + context margin §3.2 (9)) is one L0 chain carrying structural role mar… | state | §2.2 rule 1 |
| MODEL-047 | rule | L1 faces: coarse blocks between way spines and wall strips S7 cuts beside each trace; L1 edges:… | state | §2.2 rule 1 |
| MODEL-048 | rule | District boundaries are always L1 edges (a spine, a wall line, a reservation boundary, a shore … | state | §2.2 rule 1 |
| MODEL-049 | rule | L2 refines each L1 face into one half-corridor strip along each spine edge (road reserve on tha… | state | §2.2 rule 1 |
| MODEL-050 | defined-term | Corridor entity = FaceRef of the half-corridor faces on both sides of its spine; Junction = Fac… | state | §2.2 rule 1 |
| MODEL-051 | rule | Wall bands, glacis, towers and gatehouses built by bandUnion (§3.7) inside the two L1 wall-stri… | reference | referenced to §3.7 / §4.8 (rule 1 L3 bullet keeps which level holds the band parts) |
| MODEL-052 | rule | L3 faces: plots, courts, yards, greens, alleys-as-faces, wall-band/setback/glacis parts, margin… | state | §2.2 rule 1 |
| MODEL-053 | rule | L4 faces: building footprints (and wing sub-faces when stage 3 exists) plus yard sub-areas | state | §2.2 rule 1 |
| MODEL-054 | rule | Districts, blocks, merged plots and water bodies are multi-face FaceRefs, never single face ids… | state | §2.2 rule 1 |
| MODEL-055 | decision | J-K1: one arena per PlatKey; the five levels are views of it: all levels in one vertex-and-half… | state | §2.2 rule 2 |
| MODEL-056 | rule | Nesting holds by construction and is checked by index, not coordinates: every level-(n+1) face … | reference | referenced to §3.10 (KERNEL-372); pointer at §2.2 rule 2 |
| MODEL-057 | algorithm-step | Face walk at level n follows next and, around each vertex, skips edges of level > n (O(degree)) | state | §2.2 rule 2 |
| MODEL-058 | rule | A level's face records inside a parent face are materialised when the first edge of that level … | state | §2.2 rule 2 |
| MODEL-059 | rule | A shared boundary is one edge seen by every finer level (kerb, plot line, party wall); a warp m… | state | §2.2 rule 2 |
| MODEL-060 | rule | Ground, underground and each sky island are separate arenas and never share topology; cross-are… | state | §2.2 rule 2 |
| MODEL-061 | rule | Finer levels never move coarser geometry: a level-n batch creates vertices and edges of level n… | state | §2.2 rule 3 |
| MODEL-062 | mechanism | Where a level-n batch needs a vertex on a coarser edge, splitThrough inserts a level-n Steiner … | state | §2.2 rule 3 |
| MODEL-063 | evidence | 61 % of 5–60 m edges have no interior lattice point at all (GEO-1) | state | §2.2 rule 3 |
| MODEL-064 | rule | The coarser edge's endpoints, birth level, faces and own-level roles never change under a finer… | state | §2.2 rule 3 |
| MODEL-065 | defined-term | Level-n route of an edge = chain through its vertices of level ≤ n; every level-n query, level-… | state | §2.2 rule 3 |
| MODEL-066 | decision | J-K32 / K4-1: a route can change under finer vertices without moving them — a same-level split,… | state | §2.2 rule 3 (J-K32 sentence; standing-distance figures referenced to §3.6/§3.10) |
| MODEL-067 | evidence | One promotion in ten leaves another finer vertex up to 1.25 cm from its new route edge; same-le… | reference | referenced to §3.6 placement rule / §3.10 placement-bound row (canon: KERNEL-020 §3.1; the kernel rewrite states the drift figures there); pointer in §2.2 rule 3 first paragraph |
| MODEL-068 | rule | Hot pixel is a placement bound: every vertex placed, re-seated or slid onto a coarser route lie… | reference | referenced to §3.6 placement rule / §3.10 (KERNEL-020); pointer in §2.2 rule 3 first paragraph ("the hot pixel bounds placement, not a standing distance") |
| MODEL-069 | mechanism | Promotion: a coarser batch ending a chain on a route that already carries a finer vertex beside… | state | §2.2 rule 3 |
| MODEL-070 | mechanism | A coarse batch inserted into finished fabric (carve, re-carved reach, outer moat) clears finer … | reference | referenced to §3.3 (KERNEL-098); pointer at §2.2 rule 3 |
| MODEL-071 | decision | J-I12: a kept way's straight L1 edge between its two promoted bank vertices becomes the deck sp… | state | §2.2 rule 3 Promotion paragraph (J-I12) |
| MODEL-072 | mechanism | clearFiner (regeneration, undo) and removeEdges remove edges and roles then dissolve each degre… | state | §2.2 rule 3 |
| MODEL-073 | defined-term | split flag (C-5, VK2-5, VK3-3): marks a vertex whose dissolution restores the edge it was creat… | state | §2.2 rule 3 "The split flag" (clearing (b) → §3.6) |
| MODEL-074 | rule | split flag cleared (a) by promotion of a prepared contact or a stretch end (§3.4); (b) by a mov… | reference | referenced to §3.6 "The split flag under moves" (KERNEL-287, MODEL-C01); §2.2 rule 3 "The split flag" keeps clearing cases (a), (c) and names (b) by pointer |
| MODEL-075 | rule | A warped same-level T-junction or crossing becomes a shape vertex of the warped chains; removin… | reference | referenced to §3.6 "The split flag under moves" (KERNEL-287); §2.2 keeps "a chain's own shape vertices never carry it" in the flag's definition |
| MODEL-076 | decision | J-K28 / VK3-3: levels follow the rows (demotion). A row is always added at the adding batch's l… | state | §2.2 rule 3 demotion |
| MODEL-077 | algorithm-step | Demotion step (a) edges: removeEdges, clearFiner and retypeEdges' remove finish by giving an ed… | state | §2.2 rule 3 (a) |
| MODEL-078 | algorithm-step | Demotion step (b) flags: a split vertex keeps the flag only while a run it split survives whole… | state | §2.2 rule 3 (b) |
| MODEL-079 | algorithm-step | Demotion step (b) pin: a vertex from which the batch strips its last vertex role row loses its … | state | §2.2 rule 3 demotion (b) — "other than knot rows" (VK5-2) |
| MODEL-080 | algorithm-step | Demotion step (c) vertices, in canonical order (lattice y then x), each reading levels earlier … | state | §2.2 rule 3 demotion (c) — who places L0/L1 deck_end rows → §4.2 S1 (5) (MODEL-C11) |
| MODEL-081 | algorithm-step | Split restoration (after dissolution): a split vertex whose incident edges of its level or coar… | state | §2.2 rule 3 (c) |
| MODEL-082 | rule | The split flag is the whole guard (VK4-3): it stands only while neither the vertex nor the vert… | state | §2.2 rule 3 demotion (c) (the flag is the whole guard) |
| MODEL-083 | rule | A plot-line end or footprint corner that II.1 (3)'s neighbour step promoted to L2 returns to it… | state | §2.2 rule 3 "So a plot-line end…" |
| MODEL-084 | evidence | Route restored vertex for vertex on 100 000 of 100 000 random routes (fixall_kernel_r4_checks.o… | state | §2.2 rule 3 "So a plot-line end…" — 100 000/100 000 receipt kept; VK5-3 wording ("by construction for any number…"); the rejected distance test's 0.54–0.66 % left with J-K28 (rationale file) |
| MODEL-085 | rule | A promoted vertex that a warp moved (or beside which a warp moved its run) has lost its flag an… | reference | referenced to §3.6 (KERNEL-287); §2.2 rule 3: "A promoted vertex that a move has unflagged stays in the coarser route" |
| MODEL-086 | mechanism | Each demotion tombstones the vertex/edge static index item and the route-edge items of levels w… | reference | referenced to §3.3 "No item changes in place" (KERNEL-162) for re-indexing and §3.6 step 5 for the re-walk; the commit/undo listing of demotions and cleared flags stays in §2.2 rule 3 |
| MODEL-087 | test | Level consistency checked on every batch (§3.10 row): no edge coarser than its lowest row; no v… | reference | referenced to §3.10 (KERNEL-374); pointer at §2.2 rule 3 |
| MODEL-088 | rule | Edges enter only through insertChain (§3.4; semantics §3.6) — one door for generated chains, st… | reference | referenced to §3.4 (KERNEL-216); pointer at §2.2 rule 4 |
| MODEL-089 | rule | Faces are never re-walked globally; a split face's two parts both inherit its owner (and stage … | reference | referenced to §3.6 step 5 (KERNEL-254); pointer at §2.2 rule 4 |
| MODEL-090 | decision | J-K3: topology by index, references by role. Inside kernel topology keyed by VertexId/HalfEdgeI… | state | §2.2 rule 5 |
| MODEL-091 | rule | No record outside the kernel stores arena slots, and no entity record stores a vertex position … | state | §2.2 rule 5 (plus the canon's non-vertex-points clause, MODEL-C07) |
| MODEL-092 | rule | Entity-to-geometry by role/owner tables, examples: Way spine ChainRef(way, wayId); plot FaceRef… | state | §2.2 rule 5 |
| MODEL-093 | rule | References resolved on demand by resolve (§3.4), valid until the next commit (debug build asser… | reference | referenced to §3.4 (KERNEL-204); pointer at §2.2 rule 5 |
| MODEL-094 | rule | Splits carry roles to both parts, merges union them, attraction merges them onto the surviving … | state | §2.2 rule 5 |
| MODEL-095 | decision | J-K31 / VK3-9: stretches — an operator that removes or hands over part of a chain (carve cut st… | state | §2.2 rule 5 Stretches (J-K31) |
| MODEL-096 | rule | StretchRef semantics: chain edges between two of its vertices in chain order for an open chain;… | state | §2.2 rule 5 Stretches |
| MODEL-097 | rule | removeEdges/retypeEdges accept StretchRef: an end finer than the chain is first promoted to the… | reference | referenced to §3.4 (KERNEL-225); pointer at §2.2 rule 5 Stretches |
| MODEL-098 | rule | Chain attributes are knot profiles, never positional arrays (VK-2): way width, wall base elevat… | state | §2.2 rule 5 knot profiles (J-K10) |
| MODEL-099 | rule | Profile interpolation: linear by arc length along the route (linear) or held knot to next (step… | state | §2.2 rule 5 chain attributes |
| MODEL-100 | rule | A constant attribute is a scalar with no knots; the creating stage places each knot on an exist… | state | §2.2 rule 5 chain attributes |
| MODEL-101 | rule | splitThrough, attraction, crossings, promotion and warp never change a profile: a split adds a … | state | §2.2 rule 5 chain attributes |
| MODEL-102 | rule | kerb, bandUnion and every export sample the profile (§3.4, §3.7); the digest hashes its values … | state | §2.2 rule 5 chain attributes |
| MODEL-103 | decision | J-K23 / VK2-8: cutting a profiled chain (way split, partial wallToWay, carve cut) goes through … | state | §2.2 rule 5 cutting/joining (J-K23; ≤ 6.8 × 10⁻¹³ cm receipt) |
| MODEL-104 | evidence | Cut knots: 20 000 random ways split between two width knots — largest change 6.8×10⁻¹³ cm, 92 %… | history out | dropped from the normative text; one receipt kept in §2.2 rule 5 cutting/joining: "≤ 6.8 × 10⁻¹³ cm over 20 000 random ways, fixall_kernel_r3_checks.out B" (the 8.47 m comparison stays with J-K23) |
| MODEL-105 | rule | Removing a stretch of a profiled chain (VK3-9) gives each remaining part a cut knot at the stre… | state | §2.2 rule 5 cutting/joining |
| MODEL-106 | evidence | Stretch removal: 20 000 random ways with 2–5 width knots — max change 1.6×10⁻¹² cm vs 8.36 m wi… | history out | dropped; receipt pointer kept in §2.2 rule 5 cutting/joining ("fixall_kernel_r4_checks.out C"; the 8.36 m / 25.8 m comparisons stay with J-K31) |
| MODEL-107 | rule | Join of two chains concatenates knots in chain order and drops a knot at the join vertex only w… | state | §2.2 rule 5 cutting/joining |
| MODEL-108 | rule | Positions in the log (GEO-5 (b)): an event addressing a vertex by position (moveVertex, §7.1) s… | state | §2.2 rule 5 positions in log |
| MODEL-109 | algorithm-step | resolveVertexAt(key, at, sig) (§3.4) on replay maps the signature's entity ids through carry-ov… | state | §2.2 rule 5 positions in log |
| MODEL-110 | rule | River control knot is not an arena vertex but S1's recorded input (WaterBody.controls, §2.3); m… | reference | referenced to §7.4 (rule 5 keeps "binds by the knot's ordinal") |
| MODEL-111 | rule | Warp and pins (GEO-5 (c)): warp moves kernel-pinned vertices with everything else and holds ver… | reference | referenced to §3.6 (KERNEL-278); pointer at §2.2 rule 5 warp and pins |
| MODEL-112 | rule | Refinement is a pure function: L(n+1) = refine_n(level-n view, params, streams), streams keyed … | state | §2.2 rule 6 |
| MODEL-113 | rule | An edit at level n clears finer content under the touched level-n faces with clearFiner and re-… | reference | referenced to §7.3 (2) (DETERMINISM-399); pointer at §2.2 rule 6 |
| MODEL-114 | rule | Two kinds of finer content survive the clear: locked/pinned entities (returned as conflicts to … | reference | referenced to §3.3 (KERNEL-105); pointer at §2.2 rule 6 |
| MODEL-115 | rule | Roles, not a single type: each edge pair and vertex carries a small sorted set of (role, entity… | state | §2.2 rule 7 |
| MODEL-116 | rule | Any output reading a role set in order (digest §6.2, a contact name's entity) reads it by the r… | state | §2.2 rule 7 |
| MODEL-117 | defined-term | Edge roles: way, kerb, corridor_split, band, wall, wall_gate, shore, bank, border, margin, fiel… | state | §2.2 rule 7 |
| MODEL-118 | defined-term | Vertex roles: junction, tower, gate, entrance, portal, attach, anchor, weld, deck_end, gate_end… | state | §2.2 rule 7 |
| MODEL-119 | rule | Registry marks attach, anchor, weld, deck_end, gate_end, gate_opening and the knot roles indexe… | state | §2.2 rule 7 |
| MODEL-120 | rule | deck role: a Bridge's deck span = the way's own L1 edge between the bridge's two deck_end bank … | state | §2.2 rule 7 "The deck" — role definition; placement → §4.2 S1 (5) (MODEL-C11) |
| MODEL-121 | rule | Avenue and street-tree rows are Greenery.along records, not edges (§2.7) | state | §2.2 rule 7 |
| MODEL-122 | rule | A way's class, width profile and surface are attributes of the Way entity, not its edges (FTG's… | state | §2.2 rule 7 (structural/partition bullet) |
| MODEL-123 | rule | A wall chain may be open, its ends anchored on typed vertices (shore, cliff, castle) | state | §2.2 rule 7 (structural/partition bullet) |
| MODEL-124 | decision | J-K29 / VK3-2: anchor row marks the end of an open chain resting on a coarser feature (open wal… | state | §2.2 rule 7 anchors (J-K29) |
| MODEL-125 | rule | Contact name's entity = first row of the edge's own birth level in role order: district boundar… | state | §2.2 rule 7 anchors |
| MODEL-126 | rule | Contact-name ordinal = smallest unused ordinal of that entity's anchor role (role-head lookups)… | reference | referenced to §3.3 rule 2 (KERNEL-118); pointer at §2.2 rule 7 anchors |
| MODEL-127 | rule | A contact name lives only from the preparation batch to the batch that promotes its vertex, whi… | reference | referenced to §3.3 rule 3 (KERNEL-121); pointer at §2.2 rule 7 anchors |
| MODEL-128 | rule | Water gate's two bank vertices carry (gate_end, gateId, 0\|1), on a re-traced run from the prep… | state | §2.2 rule 7 anchors (gate ends) |
| MODEL-129 | rule | Generation-time water gate: gate_end rows on the trace's two vertices on the river's shores, pl… | reference | referenced to §4.4 S5a (PIPELINE-164); pointer at §2.2 rule 7 anchors |
| MODEL-130 | rule | Edge roles are structural (way, wall, wall_gate, shore, bank, border, margin, reserved, setback… | state | §2.2 rule 7 |
| MODEL-131 | rule | A vertex carrying any role row of a live entity is never dissolved | state | §2.2 rule 7 |
| MODEL-132 | rule | Coincident features are one edge with several roles (street on district boundary, quay on shore… | state | §2.2 rule 7 |
| MODEL-133 | rule | Every committed batch validates its declared invariants at their scopes (§3.10), writes a repor… | reference | referenced to §3.3 (KERNEL-102); pointer at §2.2 rule 8 |
| MODEL-134 | budget | Arena size at CITY: ≈80 k vertices, ≈240 k half-edges, role rows (2-byte ordinal) and five face… | state | §2.2 Size |
| MODEL-135 | budget | Spatial index (VK3-6): 38.4 B per item (packed partition: double box + 32-bit index per node, o… | state | §2.2 Size |
| MODEL-136 | budget | Pool worker frozen copy (§3.3 step 1) = arena + lookup tables + home column + static partitions… | reference | referenced to §3.3 step 1 (KERNEL-143); pointer at §2.2 Size |
| MODEL-137 | number | Knot rows are few: a constant-width way has none; a wall's base profile carries one knot per tr… | state | §2.2 Size |
| MODEL-138 | evidence | Lookup tables (fixall_kernel_r3_bench.out B): rebuilding heads as Maps would cost ≈10 ms (60 00… | state | §2.2 Size (receipts) |
| MODEL-139 | decision | J-K1: one arena per layer with level-tagged edges and per-level face records, over five separat… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K1; "(J-K1)" left at §2.2 rule 2 heading |
| MODEL-140 | decision | J-K3: role and owner tables with kernel-resolved views, over stored half-edge/vertex/face id li… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K3; "(J-K3)" left at §2.2 rule 5 heading |
| MODEL-141 | decision | J-K9 (GEO-5): every entity-held vertex is a role-carrying vertex (attach, anchor, weld, deck_en… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K9; "(J-K9)" left at §2.2 rule 5 heading |
| MODEL-142 | decision | J-K10 (VK-2): knot profiles at role-carrying vertices interpolated by arc length, over profiles… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K10; "(J-K10)" left at §2.2 rule 5 knot profiles |
| MODEL-143 | decision | J-K11 (VK-18): promote a finer vertex a coarser batch lands on, over clearing/re-deriving the n… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K11; "(J-K11)" left at §2.2 rule 3 Promotion |
| MODEL-144 | decision | J-K22 (VK2-9): typed-array open-addressing tables for role and owner heads over Maps; frozen co… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K22; "(J-K22)" left at §2.2 hash-table comment |
| MODEL-145 | decision | J-K23 (VK2-8): cut knots carrying the exact sampled double, over re-keying knots alone (8.47 m … | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K23; "(J-K23)" left at §2.2 rule 5 cutting/joining |
| MODEL-146 | decision | J-K28 (VK3-3, amended VK4-3): demotion (edge takes lowest level among rows; vertex never coarse… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K28; "(J-K28)" left at §2.2 rule 3 demotion |
| MODEL-147 | decision | J-K29 (VK3-2, amended VK4-6 (b)): gate_end vertex role on the water gate's own fresh Gate addre… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K29; "(J-K29)" left at §2.2 rule 7 anchors |
| MODEL-148 | decision | J-K31 (VK3-9): StretchRef view resolved in-batch and never stored, accepted by removeEdges and … | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K31; "(J-K31)" left at §2.2 rule 5 Stretches |
| MODEL-149 | decision | J-K32 (K4-1): hot pixel stated as a placement bound (≤0.71 cm when placed) and route-edge index… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K32; "(J-K32)" left at §2.2 rule 3 first paragraph |
| MODEL-150 | interface | Terrain record: id; key (ground or a sky island's terrain); height raster cellCm, cols, rows, o… | state | §2.3 Terrain |
| MODEL-151 | number | Terrain.reliefLimitCm = 1 000 000 cm (10 km): declared range every height write is checked agai… | state | §2.3 Terrain |
| MODEL-152 | interface | HydroGrid {cellCm, cols, rows, originX, originY}: same extent as the height raster | state | §2.3 HydroGrid |
| MODEL-153 | number | Hydrology raster cell: TOWN 16 m (1 600 cm), CITY 25 m (2 500 cm), METROPOLIS 32 m (3 200 cm) —… | state | §2.3 HydroGrid + hydrology grid |
| MODEL-154 | interface | TerrainSampler: heightAt(p) bilinear on height raster (2.5 m refinement computed on demand, nev… | state | §2.3 TerrainSampler |
| MODEL-155 | interface | WaterBody: id; kind ∈ sea\|lake\|river\|tributary\|distributary\|islet_channel\|pond\|moat\|est… | state | §2.3 WaterBody |
| MODEL-156 | rule | WaterBody course width/depth arrays are per course vertex — permitted because the course is the… | state | §2.3 WaterBody comment |
| MODEL-157 | number | Height raster resolution per size class: TOWN 5 m, CITY 8 m, METROPOLIS 10 m, over frame and co… | state | §2.3 prose |
| MODEL-158 | rule | Point queries go through TerrainSampler (bilinear); slope queries inside the built extent and S… | state | §2.3 prose |
| MODEL-159 | decision | J-K12 (VK-9): one hydrology raster hydro over frame and margin at 1.6× the former frame-only ce… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K12; "(J-K12)" left at §2.3 hydrology grid |
| MODEL-160 | rule | A hydro cell's height is the height raster's bilinear sample at the cell centre, rounded to the… | state | §2.3 hydrology grid |
| MODEL-161 | evidence | Hydrology timing (fixall_kernel_r2_hydro.out; bucket-queue flood, two-gradient flats, D8, accum… | state | §2.3 hydrology grid |
| MODEL-162 | rule | flowAt(p) returns the hydro cell containing p, so hinterland plot upstream (§2.5), water mill r… | state | §2.3 hydrology grid |
| MODEL-163 | test | O1 (b) "every terrain cell has a defined flow path to an outfall" is checked on the hydro grid … | reference | referenced to §13.1 (SCOPE-158); §2.3 hydrology grid "(§13.1)" |
| MODEL-164 | algorithm-step | River course (§4.2 S1 (3)) traced on hydro and carved into the height raster; after the carve D… | move out | moved to §4.2 S1 (3) (pipeline MOVE IN; §2.3 hydrology grid points there) |
| MODEL-165 | rule | Pre-decided fallback: the M0 site-and-fields spike's coarsening (§12.4) applies to hydro: CITY … | reference | referenced to §12.4 (RENDERING-533); §2.3 hydrology grid pointer |
| MODEL-166 | decision | J-K7 (GEO-15): heights are Int32 centimetres relative to a per-document datum, over Int16 decim… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-K7; "(J-K7)" left at §2.3 Heights |
| MODEL-167 | rule | S1 sets datumCm to sea level for a coastal site and to the site's base elevation otherwise; a 3… | move out | moved to §4.2 S1 (1) (pipeline MOVE IN; §2.3 Heights and Terrain.datumCm point there) |
| MODEL-168 | rule | Every write to a height or depth raster (S1, terrain brush, site primitive) goes through a rang… | state | §2.3 Heights |
| MODEL-169 | test | S1 tests include a mountainous fixture (3 000 m relief, hill-acropolis site) that must round-tr… | reference | referenced to §13.1 (SCOPE-158); §2.3 Heights pointer |
| MODEL-170 | algorithm-step | Flats (GEO-15): sinks filled by bucket-queue priority flood on integer hydro heights with exact… | reference | referenced to §4.2 S1 (3) (PIPELINE-069; the ε clause and lake typing now stated there); §2.3 Flats pointer |
| MODEL-171 | algorithm-step | Flow across every flat (filled depressions and level ground) resolved by two-gradient flat reso… | state | §2.3 Flats |
| MODEL-172 | rule | D8 ties break in the fixed neighbour order E, NE, N, NW, W, SW, S, SE, so flow is the same on e… | state | §2.3 Flats |
| MODEL-173 | rule | Terrain is not in the plat: water faces and their shore and bank edges enter L0 from S1 (§4.2);… | state | §2.3 Terrain is not in the plat |
| MODEL-174 | rule | Drainage (flow direction, flat rank, accumulation, outfalls) is queryable per hydro cell — the … | state | §2.3 |
| MODEL-175 | rule | A sky island's terrain is its own Terrain with own key, datum, frame and hydro grid (§4.2, II.1) | state | §2.3 |
| MODEL-176 | rule | Water attributes along a shore (VK-2): bank kind and shore class are step ChainProfiles on the … | state | §2.3 Water attributes |
| MODEL-177 | rule | River course and its width/depth arrays are recomputed by S1's water operator whenever a batch … | reference | referenced to §7.3 (b) 1 (DETERMINISM-428); §2.3 water attributes pointer |
| MODEL-178 | type | WayClass = through\|primary\|secondary\|lane\|alley\|cul_de_sac\|track\|path\|quay\|pier\|bridg… | state | §2.4 types |
| MODEL-179 | interface | Way: id; class; spine ChainRef(way,id) L1; width Cm \| ChainProfile (width_knot; constant way s… | state | §2.4 Way |
| MODEL-180 | interface | Junction: id; vertex VertexRef(junction,id); arms Id[]; kind T\|X\|Y\|end\|gate\|bridgehead\|sq… | state | §2.4 Junction |
| MODEL-181 | rule | Edges carry role sets, not a single type; FTG's 14 wire types become roles; a way's class, widt… | state | §2.2 rule 7 (merged with MODEL-122; §2.4 prose points there) |
| MODEL-182 | rule | A reservation's L1 boundary carries structural reserved role before growth (§4.2 S3); a wall ch… | state | §2.2 rule 7 (`reserved` edge role; open wall chain) — §2.4 prose points there |
| MODEL-183 | rule | Every record of §2.4–§2.7 and PART II reaches geometry only through FaceRef, ChainRef, EdgeSetR… | state | §2.4 prose (points to §2.2 rule 5 and its exception, MODEL-C07) |
| MODEL-184 | rule | Every record embeds the Identity and Lifecycle of §2.8 (the id and lifecycle fields) | state | §2.4 prose |
| MODEL-185 | rule | Random streams are derived from the entity's lineage on demand (§6.1); no record stores a seed … | section restatement | referenced to §6.1 (§2.4 prose: "streams derive from the entity's lineage on demand (§6.1)") |
| MODEL-186 | interface | District: id; kind DistrictKind (feature-named, data-defined: central, market, docks, gate, riv… | state | §2.5 District |
| MODEL-187 | number | District.buildingScale: 0.5–2, default 1 — FTG's smaller/bigger knob as a continuous multiplier… | state | §2.5 District |
| MODEL-188 | rule | Quarters are the QuarterNode merge tree of §9.1 built by S6 (§4.5); the min(N_q, L) nodes of it… | reference | referenced to §9.1 (RENDERING-327); pointer in the §2.5 Quarters comment |
| MODEL-189 | interface | SubDistrict {id, district, blocks, cluster (roster cluster tag e.g. trade group)}: FTG's sub-di… | state | §2.5 SubDistrict |
| MODEL-190 | interface | Reservation: id; kind castle\|plaza\|market\|precinct\|institution\|park\|harbour_basin\|moat\|… | state | §2.5 Reservation |
| MODEL-191 | interface | Allocation: id; level town\|district\|block; target (town, district, block, hinterland pseudo-d… | state | §2.5 Allocation |
| MODEL-192 | interface | FieldBands: field prosperity\|density\|greenery; cuts ascending on [0,1]; hysteresis default 0.… | state | §2.5 FieldBands |
| MODEL-193 | interface | Block: id; face FaceRef (L2 built blocks); district; subDistrict?; frontages Frontage[]; depthC… | state | §2.5 Block |
| MODEL-194 | interface | Frontage {id, way, edges EdgeSetRef(frontage, frontage id): the L2 kerb edges of this block on … | state | §2.5 Frontage |
| MODEL-195 | interface | Plot: id; face FaceRef L3; block; district; frontage EdgeSetRef(frontage, plot id); access Edge… | state | §2.5 Plot |
| MODEL-196 | rule | Invariant: every plot has ≥ 1 access edge | reference | referenced to §5.2 F-PLOT (DETERMINISM-055); pointer at §2.5 Plot.access comment |
| MODEL-197 | interface | PlotBound: id; edges EdgeSetRef(treatment, bound id) (treated sub-edges; a gate opening is the … | state | §2.5 PlotBound |
| MODEL-198 | rule | DerivationRecord (what S10–S12b read last time; Regenerate (keep) re-reads it, §4.5, §4.11) is … | state | §2.5 comment |
| MODEL-199 | interface | SitePlan {arrangement row\|compound\|detached\|hovel\|tents\|institution\|none; coverage; slots… | state | §2.5 SitePlan |
| MODEL-200 | interface | BuildingSlot {role (house, hall, stables, workshop, chapel, barn, kitchen, brewhouse, tent, …);… | state | §2.5 BuildingSlot |
| MODEL-201 | interface | SlotPlan extends BuildingSlot {hint: Polygon}: S11's working shape, transient, never stored; la… | state | §2.5 SlotPlan |
| MODEL-202 | interface | ContextVector (per-plot vector every rule table reads; owner hook O7/O17/O18/O19): areaM2; shap… | state | §2.5 ContextVector |
| MODEL-203 | rule | The context vector is stored as struct-of-arrays columns per district partition (one typed colu… | state | §2.5 prose |
| MODEL-204 | defined-term | plot = the parcel (owner's stage-3 wording and references' code say lot); building = a footprin… | state | §2.5 prose |
| MODEL-205 | rule | Coverage ratio, arrangement, separation rule and boundary treatment come from site-plan tables … | reference | referenced to §4.7 S11 (PIPELINE-276; interpolation between band rows at §4.5); pointer in §2.5 prose |
| MODEL-206 | decision | Slot shape is S11 working data, never stored: after S11 the footprint face and wings are the sl… | rationale out (new id) | rationale → new row J-P50 (scope adds it verbatim from the archive); the rule stays at §2.5 slot paragraph (unnamed judgment) with "(J-P50)" |
| MODEL-207 | decision | Districts are feature-named, never class-named; rich/poor quarter are descriptions derived from… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-P1; "(J-P1)" left at §2.5 districts bullet |
| MODEL-208 | rule | A quarter is a group of adjacent districts (often one at TOWN) whose count follows MFCG's measu… | reference | referenced to §9.4 (RENDERING-375); pointer in the §2.5 Quarters comment |
| MODEL-209 | rule | Reservations are large claims made before streets (§4.2 S3) or before lanes (§4.5 S7b): castle … | state | §2.5 "What the records are for" — Reservations |
| MODEL-210 | rule | Allocations are the persisted content decision (classes, counts, wealth band per district, sub-… | state | §2.5 — Allocations (stream keys → §6.1) |
| MODEL-211 | rule | Allocation stream keys: S7b's town-wide run draws from the town's alloc.district stream; S10a's… | section restatement | referenced to §6.1 (§2.5 Allocations bullet: "S7b and S10a draw from lineage-derived streams (§6.1)") |
| MODEL-212 | rule | Seams (II.1): one record per boundary run districts share, read by both; carries typed edges, p… | reference | referenced to II.1 (PIPELINE-403); District.seams comment + §2.5 last bullet |
| MODEL-213 | rule | FieldBands computed once per town from roster household wealth shares (§4.5), recorded, changed… | reference | referenced to §4.5 (PIPELINE-210; the setAttr re-derivation now stated there); FieldBands comment + §2.5 last bullet |
| MODEL-214 | rule | DerivationRecord is the per-plot memory of its last derivation inputs: Regenerate (keep setting… | state | §2.5 — DerivationRecord bullet (a plot's, block's or building's memory, §2.8; MODEL-C05) |
| MODEL-215 | rule | PlotBound gives every plot edge a treatment (none/fence/hedge/wall/railing) with gate openings … | state | §2.5 — PlotBound bullet |
| MODEL-216 | rule | Vacant frontage runs are ordinary plots with use = vacant (or a yard part joined to the neighbo… | reference | referenced to §4.7 S10 (8) (PIPELINE-265); §2.5 last bullet |
| MODEL-217 | interface | Heights {baseCm (ground datum: floor level in terrain cm, §4.7 S11); floors; eaveCm; ridgeCm; t… | state | §2.6 Heights |
| MODEL-218 | interface | BaseWing {kind rect\|quad\|polygon; ring Polygon (world lattice points, CCW; derived shape reco… | state | §2.6 BaseWing |
| MODEL-219 | defined-term | Wing kinds: rect = rectangle (four corners plus footprint/other-wing vertices on its sides); qu… | state | §2.6 BaseWing comment |
| MODEL-220 | rule | corners recorded by S11 when it clips a row (VP2-5) or when a rect's sides carry other vertices… | state | §2.6 BaseWing.corners |
| MODEL-221 | defined-term | ridgeAxis: rect 0 = along side 1, 1 = along side 2; quad 0 = ridge joins arc-length midpoints o… | state | §2.6 BaseWing.ridgeAxis |
| MODEL-222 | interface | Building: id; plot; slot; footprint FaceRef L4; wings BaseWing[] (≥ 1; footprint is their union… | state | §2.6 Building |
| MODEL-223 | type | RoofSpec {kind gable\|hip\|flat\|pyramid\|cone\|dome\|skeleton\|tent\|plain (F-SKELETON downgra… | state | §2.6 RoofSpec |
| MODEL-224 | interface | MaterialRow {key {districtKind, cls, band, era}; walls; roof; weight}: a rule table (§7.6), our… | state | §2.6 MaterialRow |
| MODEL-225 | interface | OpeningRow {dayType, openH, closeH} | state | §2.6 OpeningRow |
| MODEL-226 | interface | SubLocation {id, building, name, tags (table, counter, stage, bed, bath, pickup, deliver … data… | state | §2.6 SubLocation |
| MODEL-227 | interface | Composition {lod (outline\|wings\|rooms)[]; wings Wing[]; towers Tower[]; courts Polygon[]; roo… | state | §2.6 Composition — towers: ComposedTower[]; Room defined (NP5-4) |
| MODEL-228 | interface | Wing {footprint Polygon; heights; roof; dormers?; porch? Porch}; Tower {centre Point; radiusCm;… | state | §2.6 Wing (porch: Porch, relative form) and ComposedTower (renamed from Tower) (NP5-4, MODEL-C03) |
| MODEL-229 | interface | BuildingInput {lot Polygon; access Segment[]; slot SlotPlan (at S11 the working hint; at a late… | state | §2.6 BuildingInput |
| MODEL-230 | interface | BuildingGenerator (stage-3 hook split by cost, SCL-13): outline(input, k) → KernelResult<{wings… | state | §2.6 BuildingGenerator |
| MODEL-231 | interface | ClassRules.pick(ctx, assignment?) → {cls, heights (without baseCm), roof, template?}: a data ta… | state | §2.6 ClassRules |
| MODEL-232 | rule | Wing-carrying rule is pure, using + − × ÷ and sqrt only (§6.5); run by S11 at the end of its bl… | state | §2.6 code comment |
| MODEL-233 | interface | CarriedShapes {wings; composition? (only when stored: wing, court, room rings, tower centres, N… | state | §2.6 carryWings |
| MODEL-234 | mechanism | Base ships OutlineBuildingGenerator: site plan's rectangle; L or T of 2–3 rectangular wings (MF… | state | §2.6 base outline builder |
| MODEL-235 | mechanism | Footprint templates (COV-FTG-F16): data rows of normalised shapes (cruciform church nave/transe… | state | §2.6 base outline builder 1 |
| MODEL-236 | algorithm-step | Axis-locked composer (COV-MFCG-G05, own construction): take claim OBB axes; cut on the axis mor… | state | §2.6 base outline builder 2 |
| MODEL-237 | rule | Every footprint is stored as wings (VIS-10): rect (rectangles and L/T), quad (row house clipped… | state | §2.6 wings paragraph (J-P17) |
| MODEL-238 | rule | Roof construction the renderer draws (plain, skeleton-hip, skeleton-gable, fake gable per wing)… | state | §2.6 wings paragraph |
| MODEL-239 | decision | Unnamed judgment: wings stored in the base over a single-wing L/T, because NG's per-wing roofs,… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-P17; "(J-P17)" left at §2.6 wings paragraph |
| MODEL-240 | rule | Row footprints are quads (NF-P2): S11 builds each row house footprint by boolean plot ∩ frontag… | state | §2.6 Row footprints are quads |
| MODEL-241 | rule | On a slope beyond skirtMaxCm, S11 first splits a row footprint along the contour into stepped q… | state | §2.6 Row footprints |
| MODEL-242 | rule | Quad model ridge joins the arc-length midpoints of the two chains ridgeAxis names; a bent party… | state | §2.6 Row footprints |
| MODEL-243 | rule | Drawn roof per wing (§3.8): a quad passing the near-rectangle test (four OBB corners matched by… | reference | referenced to §3.8 (KERNEL-335; MODEL-C02); §2.6 Row footprints cites "§3.8's convex near-rectangle test" |
| MODEL-244 | test | Union rule, O17 (i)'s identical footprint hash at every LOD and the stage-3 contract hold for a… | reference | referenced to §13.2 (SCOPE-188); §2.6 Row footprints closing pointer |
| MODEL-245 | decision | J-P31: quad wing kind storing the clipped footprint, over re-fitting row houses as rectangles (… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-P31; "(J-P31)" left at §2.6 Row footprints heading |
| MODEL-246 | decision | J-P39 (VP2-5): store the quad's four corner indices over inferring sides from the ring (a bent … | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-P39; "(J-P39)" left at §2.6 Row footprints heading |
| MODEL-247 | rule | Wing rings (and a stored stage-3 composition) are the only entity records storing positions of … | state | §2.6 wing-carrying rule intro |
| MODEL-248 | decision | J-P47 (NP4-3): the carry is stage-agnostic — after every committed batch (generation or edit; d… | state | §2.6 carry intro "When it runs is stage-agnostic (J-P47)" |
| MODEL-249 | rule | The carry is pure and writes only the building's wings (and stored composition), which belong t… | state | §2.6 wing-carrying rule intro |
| MODEL-250 | algorithm-step | Wing rule 1 — boundary runs are footprint runs: the parts of a wing ring on the footprint bound… | state | §2.6 wing rule 1 |
| MODEL-251 | algorithm-step | Wing rule 2 — carry: (a) each boundary run re-read from the after-rings between its two end ver… | state | §2.6 wing rule 2 |
| MODEL-252 | algorithm-step | Wing rule 3 — kinds: rect and quad corners name the same corner vertices after the carry and ar… | state | §2.6 wing rule 3 (cites §3.8's convex near-rectangle test, MODEL-C02) |
| MODEL-253 | algorithm-step | Wing rule 4 — check: every carried ring simple and CCW; union of wings equals footprint face (i… | state | §2.6 wing rule 4 (J-P49) |
| MODEL-254 | rule | For warp/moveVertex the wing check is part of whole-step validation, which halves the step on f… | state | §2.6 wing rule 4 |
| MODEL-255 | budget | Wing carry+check cost (NP4-6; fixall_pipeline_r5_wingcost.mjs/.out, Node 24, per building per v… | state | §2.6 wing rule 4 Cost (M3a measurement and fallback → §12.6) |
| MODEL-256 | rule | Pre-decided fallback if M3a finds §12.6 warp Apply budget exceeded: wing check leaves whole-ste… | reference | referenced to §12.6 (RENDERING-561); §2.6 wing rule 4 closing pointer |
| MODEL-257 | evidence | Pairing equivalence: 75 884 tiled carries at 8 m amplitude, 3 574 failing — ring test with pair… | history out | dropped; receipt pointer kept in §2.6 "Test" paragraph (fixall_pipeline_r5_wingcost.mjs → .out: the pairing's agreement with the full edge test) |
| MODEL-258 | algorithm-step | Wing rule 5 — undo, replay, moveFootprint: undo record keeps former rings (§7.4); replay perfor… | state | §2.6 wing rule 5 |
| MODEL-259 | decision | J-P48 (NP4-2): a stored stage-3 Composition (derived lazily; stores no position until an edit s… | state | §2.6 "A stored composition is carried with its wings (J-P48)" |
| MODEL-260 | algorithm-step | Composition carry (1): the storing edit establishes rule 1 in the same batch — every ring point… | state | §2.6 stored composition (1) — rewritten per NP5-1 |
| MODEL-261 | algorithm-step | Composition carry (2)–(5): boundary runs re-read by identity, other points by mean-value coordi… | state | §2.6 stored composition (2)–(5) |
| MODEL-262 | rule | Composition carry failure: inside warp/moveVertex halves the step; after any other batch the st… | state | §2.6 stored composition (failure paragraph) |
| MODEL-263 | rule | Wherever the document names a building's wing rings as carried, re-based, excepted from localit… | state | §2.6 stored composition (failure paragraph, last sentence) |
| MODEL-264 | test | B-EDIT ("§2.6's test", §13.2): warp and moveVertex over a built block with two-wing L, overlapp… | reference | referenced to §13.2 (SCOPE-203); §2.6 "Test" paragraph names "§2.6's test" for its citers |
| MODEL-265 | test | Generation equals regeneration (NP4-3): on a rich compound whose yard holds a formal-garden gri… | reference | referenced to §7.3 item 7 (vi) and §13.2 (DETERMINISM-469, SCOPE-203); §2.6 "Test" paragraph |
| MODEL-266 | evidence | Wing model (fixall_pipeline_r4_wings.py/.out; smooth random displacement 0.25–8 m amplitude, 20… | history out | dropped; receipt pointer kept in §2.6 "Test" paragraph (fixall_pipeline_r4_wings.py → .out) |
| MODEL-267 | decision | J-P42 (NP3-1): carry stored wing rings with their footprint (boundary runs re-read, joints by m… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-P42; "(J-P42)" left at §2.6 wing-carrying rule heading |
| MODEL-268 | decision | J-P49 (NP4-6): check tiered by pairing (none for wholly re-read wings; simple CCW for tiled; ar… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-P49; "(J-P49)" left at §2.6 wing rule 4 |
| MODEL-269 | rule | Heights and ground datum (owner HEIGHT ruling; AM-3; FTG-13): every building, wing, tower, keep… | state | §2.6 Heights and the ground datum |
| MODEL-270 | mechanism | deriveBase(entity, sampler) is the one per-entity function computing every ground datum; called… | state | §2.6 Heights and ground datum |
| MODEL-271 | rule | Where the fall across a row footprint would exceed skirtMaxCm (table, default 300 cm) the footp… | state | §2.6 Heights and ground datum |
| MODEL-272 | rule | Walls store their base as a knot profile along the trace (§2.2 rule 5); gates and towers their … | state | §2.6 Heights and ground datum |
| MODEL-273 | rule | Shadows and the 3-D export (§11.1) read the same height numbers; the shadow pass is §8.4's (opt… | state | §2.6 Heights and ground datum |
| MODEL-274 | test | Heights acceptance: heights on 100 % of buildings, wings, towers and wall runs; on hilly golden… | move out | moved to §13.2 (scope MOVE IN; §2.6 Heights points: "The heights acceptance bar is §13.2's") |
| MODEL-275 | rule | Materials (COV-FTG-F20): MaterialRow rule table keyed by district kind × class × prosperity ban… | state | §2.6 Materials |
| MODEL-276 | rule | Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11): building description generate… | state | §2.6 Descriptions |
| MODEL-277 | rule | Stage-3 hook (owner-staged; DEF-17, SCL-13): stage 3 replaces OutlineBuildingGenerator with a l… | state | §2.6 stage-3 hook (budgets → §12.7; the contract stated once here) |
| MODEL-278 | budget | outline(): the base OutlineBuildingGenerator's outline() is part of S11's geometry share (≤ 3 µ… | reference | referenced to §12.7 (RENDERING-577); §2.6 stage-3 hook pointer |
| MODEL-279 | budget | compose(input, outline, lod): wings with roofs, dormers, porches, towers, courts, rooms, lazily… | reference | referenced to §12.7 (RENDERING-577); §2.6 stage-3 hook keeps compose()'s contract, budgets by pointer |
| MODEL-280 | test | Stage-3 contract test: the union of composed wings equals the outline's union exactly (integer … | reference | referenced to §13.2 (SCOPE-184) for the test; the contract rule itself is stated once in §2.6 stage-3 hook |
| MODEL-281 | rule | Stage-3 intake measurement and fallback (decided now): measures outline() time per building cla… | state | §2.6 stage-3 intake bullet (the 10 µs median cited as §12.7's) |
| MODEL-282 | test | Stage-3 intake also runs §2.6's test (B-EDIT) with every fixture building's composition stored:… | reference | referenced to §13.2 (SCOPE-203); §2.6 stage-3 intake bullet pointer |
| MODEL-283 | interface | Enceinte: id; kind citadel\|inner\|outer\|suburb\|bailey\|palisade\|earthwork; trace ChainRef(w… | state | §2.7 Enceinte (waterfront gloss aligned with §4.4 S5a, NEW-PIPE-1) |
| MODEL-284 | interface | Gate: id; enceinte; junction; way Id\|null (null: postern or water gate without outward way); k… | state | §2.7 Gate |
| MODEL-285 | interface | Tower (wall tower): id; enceinte; vertex VertexRef(tower,id); radiusCm; heights; kind round\|sq… | state | §2.7 Tower (the wall tower keeps the name, MODEL-C03) |
| MODEL-286 | interface | Castle: id; plot; reservation; curtain (own Enceinte kind bailey); cityWeld? [VertexRef, Vertex… | state | §2.7 Castle — surround comment names the values; moat is Castle.moat (MODEL-C04) |
| MODEL-287 | interface | Bridge: id; state site\|built (site: two pinned bank vertices, no span, no way, no furniture, n… | state | §2.7 Bridge |
| MODEL-288 | interface | Greenery: id; kind park\|garden\|formal_garden\|orchard\|green\|commons\|avenue\|street_trees\|… | state | §2.7 Greenery |
| MODEL-289 | rule | Tree instances are stamped at render from the render.instances/<entity> stream by ordinal (§6.1… | reference | referenced to §8.1 (2) §8.1 item 2 (RENDERING-022); pointer at §2.7 Greenery comment |
| MODEL-290 | interface | LandUse: id; kind arable\|strip_field\|meadow\|pasture\|commons\|orchard\|vineyard\|coppice\|wi… | state | §2.7 LandUse |
| MODEL-291 | interface | SiteResources {cellCm; ore, stone, timber, fish, clay, fertile: Float32Array}: S1 output on the… | state | §2.7 SiteResources |
| MODEL-292 | interface | Decoration: id; kind (pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows … | state | §2.7 Decoration |
| MODEL-293 | interface | Pin: id; kind well\|fountain\|large_tree\|cross\|market_cross\|shrine\|pump\|gallows\|statue\|m… | state | §2.7 Pin |
| MODEL-294 | rule | Labels are model records LabelEntity and QuarterNode, defined in §9.1 (names, candidates, pinne… | reference | referenced to §9.1 (RENDERING-325); pointer at §2.7 comment |
| MODEL-295 | interface | Institution {id, kind, plots, buildings, faction?, roster RosterRef, name NameRef, reservation?} | state | §2.7 Institution |
| MODEL-296 | interface | Household {id (address stable across re-derivation of its plot, §6.3; people keyed by it); plot… | state | §2.7 Household |
| MODEL-297 | interface | Person {id; key {household, ordinal, bornEpoch}; status worker\|unemployed\|retired\|student\|d… | state | §2.7 Person |
| MODEL-298 | interface | Faction {id; kind guild\|religion\|lordship\|company\|criminal\|council; seats; turf?; influenc… | state | §2.7 Faction |
| MODEL-299 | interface | Government {kind crown\|seigneurial\|ecclesiastical\|chartered_commune\|merchant_oligarchy; sea… | state | §2.7 Government |
| MODEL-300 | interface | Religion {id; name; deities {name, domain}[]; practiceShare; clergyPerThousand; temples; factio… | state | §2.7 Religion |
| MODEL-301 | rule | Relation store (FTG-9): schema in the base registry from M1; materialised by @plat/sim's first … | reference | referenced to §10.1 (PIPELINE-362); pointer at §2.7 comment |
| MODEL-302 | interface | FamilyUnit {id; kind couple\|parents_children\|single_parent\|extended; members; households}; R… | state | §2.7 relation store records |
| MODEL-303 | interface | SkyIsland {id; outline Polygon; elevationCm; terrain?; terrainEcho? {river? (ground river it ec… | state | §2.7 SkyIsland (+ "The staged layers" paragraph for field meanings) |
| MODEL-304 | interface | Tunnel {id; kind drain\|main\|culvert\|passage; centreline ChainRef(tunnel,id) in the undergrou… | state | §2.7 Tunnel (+ "The staged layers" paragraph) |
| MODEL-305 | rule | People are never materialised in the document unless an explicit edit pins them (FTG "locked in… | reference | referenced to §10.3 (PIPELINE-376); pointer at §2.7 people paragraph |
| MODEL-306 | rule | Which people a user has opened is per-user view state outside the document | state | §2.7 people paragraph → "per-user view state (§2.9), outside every digest" (MODEL-C06) |
| MODEL-307 | rule | Content references geometry by id and never the reverse, so the map can be regenerated without … | state | §2.7 people paragraph |
| MODEL-308 | rule | Open traces and waterfront (FTG-8, COV-MFCG-C07): an enceinte may be an open chain whose ends a… | reference | referenced to §4.4 S5a (PIPELINE-165); Enceinte closure/anchors/waterfront/placement comments keep the field meanings; sea_wall gloss aligned (NEW-PIPE-1) |
| MODEL-309 | rule | Both wall faces unbuildable (MFP-9): setbackCm.inner and .outer are unbuildable bands; invarian… | state | §2.7 "Both faces of a wall are unbuildable" |
| MODEL-310 | rule | Nesting and build order (GEO-38, NF-P5): S7 cuts two L1 wall strips off the faces beside each t… | reference | referenced to §4.8 (PIPELINE-285); Enceinte.strips/band comments + §2.7 "Both faces…" paragraph pointer |
| MODEL-311 | rule | Castles (COV-FTG-G09, G10): a castle is a reservation (§4.2 S3) with its own curtain, one town-… | reference | referenced to §4.8 castle (PIPELINE-291); Castle type comments (surround values, MODEL-C04) + §2.7 pointer |
| MODEL-312 | rule | Bridges (GEO-17, NF-P4, NP3-4): a deck pinned bank to bank perpendicular to local flow/channel,… | reference | referenced to §4.8 water (PIPELINE-297) and §4.2 S1 (5); Bridge type comments + §2.7 pointer |
| MODEL-313 | rule | A deck placed on the way that uses it before its water exists (carve's kept way §4.11, outer mo… | reference | referenced to §4.2 S1 (5) (PIPELINE-083, MODEL-C11); Bridge.over comment + §2.2 rule 7 "The deck" |
| MODEL-314 | rule | Ways route to a deck's endpoints as a fixed graph edge (§4.3) | reference | referenced to §4.2 S1 (5) (PIPELINE-081); §2.7 pointer |
| MODEL-315 | rule | A site no way uses by the end of S5 stays a site: not drawn, named, labelled or exported (S13a … | reference | referenced to §4.2 S1 (5) (PIPELINE-080); Bridge.state comment keeps the site's shape |
| MODEL-316 | rule | A deck where no site stands on already-standing water (F-ROUTE's extra bridge at generation or … | reference | referenced to §4.2 S1 (5) (PIPELINE-082); Bridge.over comment |
| MODEL-317 | rule | Content records settle: Faction gains goals, named roles with member criteria and secret flag (… | state | §2.7 "What the content records settle" |
| MODEL-318 | rule | Staged layers (AM-2, DEF-7): SkyIsland and Tunnel are schema-complete hooks, empty in the base;… | reference | referenced to II.6 (PIPELINE-438) for the rules; the field meanings of SkyIsland/Tunnel kept in §2.7 "The staged layers" (deviation D5) |
| MODEL-319 | rule | Every entity record has five parts: identity (what it is, where its random numbers come from — … | state | §2.8 intro ("every in-window load", MODEL-C09) |
| MODEL-320 | rule | An entity carrying a generated name also persists that name's naming record (naming inputs of i… | state | §2.8 intro |
| MODEL-321 | rule | The persisted derivation and naming records are covered by the snapshot's records digest, which… | reference | referenced to §6.2 (DETERMINISM-192); §2.8 intro: "form the records digest (§6.2), checked at every in-window load" (MODEL-C09) |
| MODEL-322 | type | Hash64 = [u32,u32]; Hash128 = 4×u32 lanes; LineageHash = Hash64; PointCm {x,y: Cm}; VecCm = Poi… | state | §2.8 types — PointCm = LatticePoint, Point, VecCm aliases; Polygon = one ring, PolygonCm = rings; M, Cdeg, CmArray (MODEL-C08, MODEL-C10; see deviation D1) |
| MODEL-323 | interface | Identity {id (address id, §6.3); kind; parent? (containment parent: a field, never parsed from … | state | §2.8 Identity |
| MODEL-324 | type | Existence = generated\|built\|altered\|converted\|abandoned\|decayed\|ruined\|demolished | state | §2.8 Existence |
| MODEL-325 | interface | LifecycleFlags {locked, pinned, edited, assigned; lockedPaths? (attribute-level locks §7.2; abs… | state | §2.8 LifecycleFlags |
| MODEL-326 | interface | Lifecycle {existence; flags; since {epoch, seq} (event that last changed existence)} | state | §2.8 Lifecycle |
| MODEL-327 | interface | LifecycleEvent {id; seq (causing EditEvent's seq; 0 for the generation run); epoch; kind Existe… | state | §2.8 LifecycleEvent |
| MODEL-328 | interface | Tombstone {id; kind; lineage; supersededBy?; seq; last: Uint8Array (compressed last record: orp… | state | §2.8 Tombstone |
| MODEL-329 | interface | DerivationRecord {ctx Hash64 (digest of context vector read); fields? {prosperity?, density?, g… | state | §2.8 DerivationRecord (epoch = the derivation that wrote it) |
| MODEL-330 | interface | NamingRecord {slices SliceRef[] (naming slices the last draw consulted: grammar rows and weight… | state | §2.8 NamingRecord |
| MODEL-331 | interface | Provenance {run StageRunRef (index into stage-run table {stage, outputVersion, tablePins}, inte… | state | §2.8 Provenance |
| MODEL-332 | interface | SliceRef {table TableId; version; kind row\|weights\|bracket\|thresholds\|match; key (row key; … | state | §2.8 SliceRef |
| MODEL-333 | rule | One existence state plus orthogonal flags (LC-26): pin then assignment leaves the entity both p… | state | §2.8 One existence state |
| MODEL-334 | rule | Decline hooks (owner's decline instruction; COV-NG-XA36, COV-VG-VN-090 — STAGED-BY-OWNER): aban… | reference | referenced to §4.11 (PIPELINE-353); §2.8 decline-hooks bullet keeps the existence states and the ruin drawing (RoofSpec none), without listing the ConversionOp kinds |
| MODEL-335 | rule | History lives outside the entity (SCL-20): the document keeps one lifecycle event block keyed b… | state | §2.8 History |
| MODEL-336 | rule | The lifecycle event block is not append-only (VD2-3): undo removes the entries whose seq is its… | state | §2.8 History |
| MODEL-337 | rule | Demolished and superseded entities move to the archive as tombstones: out of the working set, s… | state | §2.8 History |
| MODEL-338 | budget | Growth budget: working set grows only with live entities; document grows by at most the bytes o… | state | §2.8 History |
| MODEL-339 | test | M4 test (with the epoch path): a 20-epoch TOWN with ≈30 % churn per epoch keeps heap ≤ 1.3× and… | move out | moved to §13.2 (scope MOVE IN; §2.8 History points: "its M4 epoch test: §13.2") |
| MODEL-340 | rule | Pre-decided fallback: archive and lifecycle event block held compressed in memory, decompressed… | state | §2.8 History |
| MODEL-341 | decision | Unnamed judgment: lifecycle block ordered by seq from which undo removes its target's entries, … | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-DET-33; "(J-DET-33)" left at §2.8 History |
| MODEL-342 | rule | Derivation records (LC-12): a plot, block or building persists the inputs of its last derivatio… | state | §2.8 Derivation records — VD5-5 rule (a re-derivation reproducing the leaf digest keeps the old record) |
| MODEL-343 | rule | Naming records (VD3-2): every S13a generated-name draw writes the NamingRecord (naming slices c… | state | §2.8 Naming records (J-DET-41 left as the id) |
| MODEL-344 | budget | Naming record storage: offsets into the deduplicated slice-reference pool; ≈4–8 slices per name… | state | §2.8 Naming records |
| MODEL-345 | rule | A protected name keeps its record dormant (VD4-3): a setAttr on a generated name, a lock on its… | reference | §2.8 Naming records — record-level dormancy kept (deviation D4); case (4) at the end of protection referenced to §6.3 |
| MODEL-346 | decision | Unnamed judgment: keep the naming record dormant under protection and run case (4) when protect… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-DET-46; "(J-DET-46)" left at §2.8 Naming records (dormancy) |
| MODEL-347 | decision | Unnamed judgment: a persisted naming record per generated name over reading naming slices from … | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-DET-41; "(J-DET-41)" left at §2.8 Naming records |
| MODEL-348 | rule | Provenance is compact and outside the digest (LC-25, SCL-5): version stamps once in the stage-r… | state | §2.8 Provenance bullet |
| MODEL-349 | budget | Provenance target ≤ 64 B per entity at CITY, measured at M1 with §12's entity-memory test; pre-… | state | §2.8 Provenance bullet |
| MODEL-350 | rule | A release that changes no output changes no model digest | reference | referenced to §6.4 (DETERMINISM-260); sentence dropped from §2.8 (nothing in §2 needs it) |
| MODEL-351 | rule | Provenance, derivation records and naming records share their own digest, used only by the loca… | reference | referenced to §6.2 (DETERMINISM-192); §2.8 Provenance bullet points to the digests of §2.9 / §6.2 |
| MODEL-352 | rule | Rules cite slices, not rows (LC-21): a derivation records every table slice consulted by hash —… | state | §2.8 Rules cite slices |
| MODEL-353 | rule | Entity registry (@plat/model) declares per entity type: generator stage and lineage unit (§6.3)… | state | §2.8 entity registry |
| MODEL-354 | test | A CI test fails when a type is missing from any path — generation, digest, render, export, pers… | move out | moved to §13.2 (scope MOVE IN; §2.8 entity registry points) |
| MODEL-355 | rule | A document is a base plus an ordered log: base is the canonical recipe (replays from its seed) … | state | §2.9 intro — adds "the canonical style state" (MODEL-C12) |
| MODEL-356 | interface | Document {docId Uuid (minted at creation by @plat/api, kept on save, re-minted on clone and sav… | state | §2.9 Document |
| MODEL-357 | rule | Document.packs holds the content of every non-shipped pack of the pack set (base recipe packs +… | state | §2.9 Document.packs |
| MODEL-358 | number | Document.undo carries the session's undo records across a reload: the last 64 events or 20 MB, … | reference | referenced to §7.4 records (DETERMINISM-505); Document.undo comment: "their cap: §7.4" |
| MODEL-359 | type | Base = {kind recipe; recipe} (replay = G(outputVersion, recipe), then fold the log) \| {kind re… | state | §2.9 Base |
| MODEL-360 | type | Seed = u32 (0 … 2^32 − 1): records write it as decimal string (§13.3), permalinks in base 36 (§… | state | §2.9 Seed |
| MODEL-361 | interface | Recipe (canonical recipe: every model-affecting input and nothing else, §6.2; LC-15): seed; run… | state | §2.9 Recipe |
| MODEL-362 | interface | PackData {id, version, hash Hash128, author, content SettingPack (§10.4, schema-validated)}; Ho… | state | §2.9 PackData / HostContent |
| MODEL-363 | interface | Snapshot {seq (log head it materialises); chunks ChunkRef[] (content-addressed); digest Hash128… | state | §2.9 Snapshot — "every in-window load (step 3)" (MODEL-C09) |
| MODEL-364 | interface | ChunkRef {block geometry\|entities\|archive\|history\|fields; partition (PlatKey and L0-1 for l… | state | §2.9 ChunkRef |
| MODEL-365 | interface | ViewState {keys: Record<string, {value, lamport, session}>}: keys session (unshared document's … | state | §2.9 ViewState — key list is the "View state" bullet, the opened people included (MODEL-C06) |
| MODEL-366 | interface | EpochRecord {epoch, seq, inputs EpochInputs, postDigest Hash128}: derived from the log's epoch … | state | §2.9 EpochRecord |
| MODEL-367 | type | RebaseReason = keptSnapshot\|drawnConstraintsRebuilt\|frozenImport; keeping the old model at an… | state | §2.9 RebaseReason |
| MODEL-368 | interface | UndoRecord {session; of (seq of the event it undoes); record Uint8Array (its §7.4 undo record, … | state | §2.9 UndoRecord |
| MODEL-369 | rule | One source of truth (LC-24): locks, assignments, table and preset edits (incl. host-supplied ta… | state | §2.9 One source of truth |
| MODEL-370 | rule | The blueprint's assignments and edits become assign and edit events at log positions 0…k when t… | reference | referenced to §7.7 (DETERMINISM-575); §2.9 One source of truth pointer |
| MODEL-371 | rule | The report and the statistics record are caches; per-stage timings are session telemetry, never… | reference | referenced to §5.4 (DETERMINISM-132); §2.9 One source of truth pointer |
| MODEL-372 | rule | A rebase never deletes events: earlier events stay as history and as the rebase's undo path (§7… | state | §2.9 One source of truth |
| MODEL-373 | defined-term | Pack set (NF-D2, VD2-8, VD3-3): every setting pack identified by id, version, content hash; the… | state | §2.9 pack set bullet |
| MODEL-374 | rule | Pack retention: at creation, or when an adjust adds a pack (§7.6), the content of every pack-se… | state | §2.9 pack set bullet |
| MODEL-375 | rule | An upgrade whose to version does not ship a pack of the pack set copies that pack's content int… | reference | referenced to §7.5 (2) (DETERMINISM-532); §2.9 pack set and Recipe.packs.shipped comment point there |
| MODEL-376 | rule | A user-uploaded corpus is a pack like any other (§10.4): selecting it is an adjust of the recip… | state | §2.9 pack set bullet |
| MODEL-377 | rule | A host provider's outputs are copied into hostContent as they are produced (§11.4) | state | §2.9 pack set bullet |
| MODEL-378 | rule | On load each pack of the pack set is resolved by hash, first from packs, then from the library'… | state | §2.9 pack set bullet |
| MODEL-379 | budget | Pack data and host content are counted outside the per-building budget and capped at 2 MB gzipp… | state | §2.9 pack set bullet |
| MODEL-380 | decision | Unnamed judgment: the pack set (every pack the base recipe or any adjust event names) over the … | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-DET-35; "(J-DET-35)" left at §2.9 pack set (with J-DET-50) |
| MODEL-381 | algorithm-step | Load step 1: a schemaVersion newer than the library's opens read-only (view and export only); a… | state | §2.9 load step 1 |
| MODEL-382 | algorithm-step | Load step 2: an outputVersion outside the retention window (§6.4) opens as a frozen view from m… | state | §2.9 load step 2 |
| MODEL-383 | rule | A frozen view is never checked against its recorded model root (VD4-1): each chunk is checked a… | state | §2.9 load step 2 |
| MODEL-384 | algorithm-step | frozenImport rebase: decodes the state under the current version (fields recomputed from driver… | state | §2.9 load step 2 (+ pointer to §7.4's rebase row for frozenImport renames, VD5-3 companion) |
| MODEL-385 | decision | Unnamed judgment: check a frozen view by content hashes only, labelled not verified, over recom… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-DET-44; "(J-DET-44)" left at §2.9 load step 2 |
| MODEL-386 | rule | A document without model outside the window (only the CLI writes one) cannot be shown as a froz… | state | §2.9 load step 2 |
| MODEL-387 | algorithm-step | Load step 3: within the window (current, N−1 or N−2, §6.4) everything runs under that version's… | state | §2.9 load step 3 "Decode and check" |
| MODEL-388 | evidence | Load digest recomputation: §6.2's ≤ 150 ms bar at CITY; measured ≈31–34 ms CITY, ≈95–101 ms MET… | reference | referenced to §6.2 (DETERMINISM-200); §2.9 step 3 "within §6.2's bar" |
| MODEL-389 | rule | A differing model root or records root, or a chunk missing its content hash, is a corrupt cache… | state | §2.9 load step 3 "Corrupt cache" |
| MODEL-390 | rule | A rebased document's base.state is checked when a replay starts from it: records root vs base.s… | reference | §2.9 load step 3 "A rebased base" — kept (deviation D2); the upgrade's re-rooting referenced to §7.5 (2) |
| MODEL-391 | rule | The document's output version is always the version of its latest rebase or the to of its lates… | state | §2.9 load step 3 "A rebased base" |
| MODEL-392 | rule | On a matching root the decoded model is at once the working state (NR-8): edits are dry-run, lo… | state | §2.9 load step 3 "Working state and verification replay" |
| MODEL-393 | algorithm-step | Verification replay: folds (base, log) to h₀ = model.seq in replay mode (every model stage at i… | state | §2.9 load step 3 "Working state and verification replay" |
| MODEL-394 | rule | Edits needing provenance (editTable, editPreset — invalidation reads recorded slices, §7.6) are… | state | §2.9 load step 3 "Edits held for provenance" |
| MODEL-395 | rule | An Adjust made during verification uses tree scoping, which the oracle proves output-identical … | state | §2.9 load step 3 "Edits held for provenance" (oracle → §7.3 items 6–7) |
| MODEL-396 | rule | The working state is verified only when both model roots (decoded state's before first edit — o… | state | §2.9 load step 3 "Verified" |
| MODEL-397 | rule | Records mismatch (replay model root at h₀ equals model.digest but records root differs): change… | state | §2.9 load step 3 "Records mismatch (J-DET-52)" |
| MODEL-398 | decision | Unnamed judgment: re-apply the edits made meanwhile on the replay's records over replacing reco… | rationale out (new id) | rationale → new row J-DET-52 (scope adds it verbatim from the archive); the rule stays at §2.9 load step 3 with "(J-DET-52)" |
| MODEL-399 | rule | "Trust the saved town" ends the wait (keeps the saved town as in step 4); offered only once the… | reference | referenced to §6.2 (iii) (DETERMINISM-206); §2.9 step 3 "Trust the saved town" keeps the option and points for its timing |
| MODEL-400 | budget | Open-to-editable (file bytes in memory → working state accepts first edit) ≤ T(B), §12.5's law … | state | §2.9 load step 3 "Budget and measurement" |
| MODEL-401 | budget | On the reference 300-edit CITY document with pool size ≥ 1, an edit made 100 ms after the state… | state | §2.9 load step 3 "Budget and measurement" |
| MODEL-402 | rule | Pre-decided fallbacks for load: if recomputation passes §6.2's bar it leaves the edit path by §… | state | §2.9 load step 3 "Budget and measurement" (fallbacks) |
| MODEL-403 | test | B-EDIT (M2a) corrupt snapshot: one building's footprint moved, model.digest unchanged — with ch… | reference | referenced to §13.2 (SCOPE-205); §2.9 step 3 closing pointer |
| MODEL-404 | algorithm-step | Load step 4: a mismatch is never silent and is resolved once by the user's choice. Keep the sav… | state | §2.9 load step 4 |
| MODEL-405 | rule | After either choice the document is consistent, the next load does not report it again, and und… | state | §2.9 load step 4 |
| MODEL-406 | rule | A rebase fills in, from the rebased state, the derivation record of any entity that lacks one, … | state | §2.9 load step 4 — "every entity of a kind that declares one (§2.8)" (MODEL-C05) |
| MODEL-407 | rule | Host bridge (VD3-4): only an owner client may keep the saved town (its rebase travels through t… | reference | §2.9 load step 4 — install mechanics kept (deviation D3); the bridge rule (owner-only keep, keep the doc.load bytes) points to §11.3 |
| MODEL-408 | test | B-EDIT (M2a): open an edited CITY document, edit within 100 ms of editable, force a mismatch (m… | reference | referenced to §13.2 (SCOPE-205) and §11.3; §2.9 step 4 closing pointer |
| MODEL-409 | decision | Unnamed judgments (load step 4): apply edits at once on the displayed snapshot with verificatio… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-DET-38; "(J-DET-38)" left at §2.9 load step 4 (with J-DET-42 at the bridge sentence) |
| MODEL-410 | algorithm-step | Load step 5: a document without model inside the window loads by replay, as does a corrupt cach… | state | §2.9 load step 5 — regeneration restricted to a document of the running output version; other versions → step 2 frozen view (VS5-1, SCOPE-C06) |
| MODEL-411 | rule | What the snapshot holds (FTG-21, SCL-11): geometry stored once per arena — every boundary writt… | state | §2.9 snapshot holds |
| MODEL-412 | rule | Prosperity, density and greenery fields are not stored at full resolution: an editable document… | state | §2.9 snapshot holds |
| MODEL-413 | rule | Neither digest tree is stored: the snapshot holds the two roots (digest, recordsDigest) and the… | state | §2.9 snapshot holds |
| MODEL-414 | rule | The generation report records stream keys only for ladder uses (any rung from tier 2 up), never… | reference | referenced to §5.4 (sentence dropped from §2.9; the report is not part of the snapshot) |
| MODEL-415 | rule | Content-addressed chunks (NF-D5, VD2-9): a snapshot is serialised as chunks keyed by 128-bit co… | reference | §2.9 chunks — container semantics kept (128-bit content hash, written once); geometry chunk layout referenced to §3.9 (VK5-1 membership wording lives there) |
| MODEL-416 | rule | Every reference to geometry another chunk holds is by lattice point, never (chunk, index); an L… | reference | referenced to §3.9 (lattice-point references between chunks) |
| MODEL-417 | rule | Chunk rewrite locality: an edit renumbering one partition's vertices rewrites that chunk alone;… | reference | rewrite scope referenced to §3.9; entity/archive/history/field chunks and the rebased sharing kept in §2.9 chunks |
| MODEL-418 | decision | Unnamed judgments: content-addressed chunks over a bespoke delta format (partitions exist, dedu… | rationale out | rationale → docs/ARCHITECTURE-RATIONALE.md J-DET-36; "(J-DET-36)" left at §2.9 chunks (with J-DET-19) |
| MODEL-419 | budget | Document size budget: TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and ≤ 320 B per bu… | state | §2.9 Size budget |
| MODEL-420 | test | Document-size measurement: a test per rung in B-CITY-lite at M1; at M2a one on a CITY document … | state | §2.9 Size budget (measurement) |
| MODEL-421 | rule | Pre-decided fallback if CITY exceeds 320 B/building: vertex stream switches to second-order (pr… | state | §2.9 Size budget (fallback 1) |
| MODEL-422 | rule | Pre-decided fallback if the rebased document exceeds 1.25× (VD2-9): L2–L4 geometry and entity c… | state | §2.9 Size budget (fallback 2) |
| MODEL-423 | rule | Formats: canonical .plat container = JSON manifest (schema-validated, human-diffable: versions,… | state | §2.9 Formats |
| MODEL-424 | rule | Compact twin for embeds: CBOR with typed-array tags, same schema in world coordinates with sett… | reference | referenced to §11.1 (RENDERING-404); §2.9 Formats pointer |
| MODEL-425 | rule | Canonical document = docId, schemaVersion, outputVersion, nextSeq, base, log, packs, hostConten… | state | §2.9 Canonical form and digests |
| MODEL-426 | defined-term | Four digests: model digest (Merkle root over model content, §6.2 — goldens, verification, local… | section restatement | referenced to §6.2 (§2.9 Canonical form and digests keeps the four-digest list with pointers) |
| MODEL-427 | rule | Bridge concurrency token logHead = 128-bit hash of (docId, log length, hash of the last event) … | reference | referenced to §11.3 (RENDERING-461); §2.9 Canonical form and digests pointer |
| MODEL-428 | rule | View state (FTG-12, LC-16): time, location, favourites, notes and public notes, view pins, laye… | state | §2.9 View state (opened people added to the list) |
| MODEL-429 | rule | ViewState key session holds an unshared document's authoring session (VD2-4): minted once by @p… | reference | referenced to §7.4 "Sessions" (DETERMINISM-497); §2.9 View state pointer |
| MODEL-430 | test | Round trip is a hard test: export → import → export byte-identical over the canonical form (O9 … | move out | moved to §13.2 (scope MOVE IN; §2.9 last bullet points) |
| MODEL-431 | rule | Permalinks are §6.4; migrations §7.5; edit-log replay semantics, undo and redo §7.4 | section restatement | referenced to §6.4 / §7.5 / §7.4 (§2.9 last bullet) |

