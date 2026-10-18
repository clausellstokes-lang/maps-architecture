# Fix-all master list — every item the no-defer pass must fix (lane fixall/index)

> PENDING FABLE REVIEW — Opus-produced (fixall/index), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

**In plain words.** This is the complete to-do list for the pass that repairs `docs/ARCHITECTURE.md` under the owner's 2026-09-25 rule: *"I would prefer if there is no defer and everything is fixed as soon as possible."* It holds **299 items**. 27 of them repeat a defect another item already names (they keep their own id and point at the primary), so the pass must defeat **272 distinct defects**. Every item is given to exactly one of five areas — the one that owns the architecture sections the fix must change — and names any other area that must also touch its text. Every item must end FIXED (the architecture now contains a concrete mechanism that defeats the failure) or INVALID (the premise is factually wrong, with evidence a verifier can check). Nothing may end deferred; where the owner's own roadmap puts a subject in a later stage (marked *staged* below), the item is FIXED once the architecture carries concrete hooks for it.

The machine-readable twin is `docs/validation/fix-all/index.json` (one object per item: `id`, `kind`, `owner`, `also`, `duplicate_of`, `related`, `source`, `section`, `severity`, `claim`, `claim_full`, `required_change` as stated by the source, `evidence`, `staged_by_owner`, `note`, `batch_hint`).

## 1. What is on the list, and what is not

| class | ids | items | rule applied |
|---|---|---|---|
| red-team findings | GEO-, LC-, SCL-, VIS-, MFP-, FTG-, IMP- | 163 (9 blocker, 97 major, 57 minor) | every row of the seven `docs/validation/redteam-*.md` findings tables, extracted by script; one item per finding id |
| coverage-audit gaps | COV-<slice>-<row> | 96 (MFCG 18, VG 8, NG 16, FTG 54) | every master-checklist row marked PARTIAL, MISSING or PRECLUDED (none is PRECLUDED); counts match each audit's own summary |
| audit caveats, wording corrections, observations | COV-VG-VN-002/003/090/156, COV-VG-WC1–WC5, COV-NG-OBS3, COV-FTG-OBS1, COV-FTG-OBS5 | 12 | **added by this lane** under the no-defer rule: each names a concrete ARCHITECTURE.md defect (a VILLAGE-LATER caveat, a wording error, a miscitation) that no PARTIAL/MISSING row carries; kind = coverage |
| owner amendments | AM-1 … AM-7 | 7 | the seven numbered rules of `docs/AMENDMENTS-2026-09-25.md` |
| manager notes | MN-1 … MN-4 | 4 | the four numbered notes of `docs/ARCHITECTURE-VALIDATION.md` §0.M |
| deferrals | DEF-1 … DEF-17 | 17 | DEF-1–DEF-15 are the fifteen entries of the architecture's `# Deferrals` section, in its order; **DEF-16 and DEF-17 are added by this lane**: an in-text deferral (§4.1 worker pools) and a §16 out-of-scope entry (stage-3 compositions) that the Deferrals section does not list |
| **total** | | **299** | |

**Not items** (by the lane's definition, and because none names a defect): coverage rows marked COVERED, NOT-PRECLUDED (without a caveat), NOT-REQUIRED or n/a (OUT); the audits' scope-creep verdicts (unmotivated enum values such as `Pin.kind` gallows / shrine / pump, `glacis`, `earthwork`, `fjord`, canals) — they cost almost nothing and fail no scenario, so pruning them is the scope lane's option, not an obligation; the lenses' "what the design already gets right" sections. FTG coverage observation 3 (numbers traced to `docs/improvements/ftg.md`) and 4 (critic rulings carried correctly) and NG observation 4 (timing) confirm the text and are not items; NG observations 1, 2, 5 and 6 are carried by COV-VG-WC1, COV-NG-N18, COV-VG-WC3 and VIS-16.

**Owner assignment rule.** Each item's `owner` is the area whose sections the fix must change (the section map in the lane brief: kernel = §2 storage and §3; determinism = §5, §6, §7, §2.8–§2.9; pipeline = §4, §10, the entity schemas the stages produce, PART II, PART III; rendering = §8, §9, §11, §12; scope = §1, §13–§17 and the decision / judgment / deferral tables). A finding about a test or an acceptance number is owned by scope even when its subject is the kernel (GEO-12); a finding whose fix is a mechanism is owned by the mechanism's area even when a §13/§15 row must also change (listed in `also`).

## 2. Counts per area

| area | blocker | major | minor | coverage | amendment | manager-note | deferral | total | of which duplicates | distinct defects | listed in `also` of other items |
|---|---|---|---|---|---|---|---|---|---|---|---|
| kernel | 2 | 11 | 3 | 2 | 0 | 0 | 3 | **21** | 1 | 20 | 28 |
| determinism | 3 | 14 | 19 | 10 | 1 | 0 | 0 | **47** | 2 | 45 | 42 |
| pipeline | 2 | 41 | 11 | 62 | 4 | 2 | 6 | **128** | 16 | 112 | 34 |
| rendering | 1 | 21 | 12 | 24 | 0 | 1 | 5 | **64** | 6 | 58 | 44 |
| scope | 1 | 10 | 12 | 10 | 2 | 1 | 3 | **39** | 2 | 37 | 39 |
| **all** | 9 | 97 | 57 | 108 | 7 | 4 | 17 | **299** | 27 | 272 | 187 |

**Staged by the owner (19 items; FIXED once the hooks are concrete):** COV-VG-VN-179, COV-NG-N06, COV-NG-N12, COV-NG-N27, COV-NG-XA07, COV-NG-XA36, COV-NG-XB23, COV-VG-VN-002, COV-VG-VN-003, COV-VG-VN-090, COV-VG-VN-156, COV-VG-WC4, AM-2, MN-4, DEF-7, DEF-8, DEF-9, DEF-15, DEF-17.

**Suggested sub-batches** (field `batch_hint`; non-binding — the fix pass may re-cut them, but each keeps one owner):

| batch | scope | items |
|---|---|---|
| P1 | pipeline — site, terrain and water (S1) | 12 |
| P2 | pipeline — order before growth, backbone, growth, walls, gates, castle, harbour, evolution (S2–S5, S7, §4.11) | 29 |
| P3 | pipeline — districts, prosperity, allocation and siting, the evaluation model (S6, S10b, §4.1) | 13 |
| P4 | pipeline — infill, plots, footprints and heights, stage-3 hook (S8–S11) | 29 |
| P5 | pipeline — greenery, hinterland decoration and furniture (S12, pins) | 13 |
| P6 | pipeline — content, people and simulation (§10) | 19 |
| P7 | pipeline — stage 2, sky layer and village readiness (PART II, PART III) | 13 |
| R1 | rendering — the city-zoom look, styles and paint programs (§8.2–§8.4) | 24 |
| R2 | rendering — tiles, LOD, decoration streams, worker and performance budgets (§8.1, §8.5, §12) | 16 |
| R3 | rendering — labels and map furniture (§9) | 12 |
| R4 | rendering — export and interop (§11) | 12 |
| D1 | determinism — ids, streams, hashes, failure ladder (§5, §6, §2.8) | 16 |
| D2 | determinism — document, replay, undo, snapshots, migration (§2.9, §7.4–§7.5) | 16 |
| D3 | determinism — edit actions, locks, assignments, controls (§7.1–§7.3, §7.6–§7.8) | 15 |
| K1 | kernel — all (§2 storage, §3) | 21 |
| S1 | scope — acceptance, tests and parity metrics (§13, §15) | 20 |
| S2 | scope — plan, effort, clean room, licences, scope decisions (§1, §14, §16, §17, decision tables) | 19 |

## 3. Duplicates (secondary → primary; both keep their id and share the owner)

| secondary | primary | owner | the shared defect |
|---|---|---|---|
| SCL-22 | GEO-9 | kernel | the shipped pure-JS boolean fallback; SCL-22 is its cost side, GEO-9 its numeric side, and removing the fallback settles both |
| VIS-5 | LC-20 | rendering | decoration streams keyed by LOD band re-roll trees and roof detail between bands; LC-20 adds the missing instance edit |
| VIS-6 | SCL-7 | rendering | per-district retained tiles cannot follow continuous zoom; same repair (a screen-space tile pyramid) |
| VIS-18 | SCL-14 | rendering | the layered SVG export has no LOD rule, size budget or instance aggregation at METROPOLIS |
| FTG-1 | LC-2 | pipeline | the FTG lens states it: lazy per-district S10–S14 against a global siting fill (same scenario, same repair: an eager allocation before any lazy stage) |
| FTG-3 | MFP-3 | pipeline | both ask for large claims (castle, plaza, precincts, institutions) to be reserved before the fabric is cut (named in the lane brief) |
| FTG-10 | LC-16 | pipeline | the FTG lens states it: "pinned once seen" turns reading into writing |
| COV-MFCG-C07 | FTG-8 | pipeline | the enceinte of a coastal town is undecided / forced closed — open waterfront versus sea wall with water gates |
| COV-NG-N18 | MN-3 | pipeline | §4.6 step 2 uses the wrong statistic for the cut start; MN-3 states the measured recipe that replaces it |
| COV-NG-N27 | VIS-8 | pipeline | the compound's enclosure wall and its gate on the access edge have no geometry |
| COV-NG-XB23 | COV-FTG-J02 | pipeline | `Pin.kind` lacks a monument / statue kind |
| COV-NG-XB32 | COV-VG-VN-158 | rendering | tree instances are render-time only and no exporter emits them |
| COV-NG-CR02 | COV-MFCG-L03 | determinism | Rotate must turn the whole map with the compass decoupled; L03 maps every warp kernel (carry CR02's severity M) |
| COV-NG-CR23 | COV-FTG-J02 | pipeline | `Pin.kind` lacks statue / bandstand / monument; J02 also asks for the weighted per-lot furniture row |
| COV-FTG-B09 | FTG-7 | pipeline | raw-resource availability and outside-settlement land; FTG-7's repair cites B09 explicitly |
| COV-FTG-C04 | FTG-9 | pipeline | no schema for family units, partnerships and friend groups; FTG-9's relation store is the repair |
| COV-FTG-C07 | FTG-11 | pipeline | sub-location capacities and tags unspecified; FTG-11 adds the SubLocation schema |
| COV-FTG-D26 | FTG-5 | pipeline | no control over wide versus elongated growth; FTG-5's travel-cost ratio is that control |
| COV-FTG-F16 | COV-MFCG-G05 | pipeline | non-rectangular landmark silhouettes are pushed to stage 3 although they show at city zoom |
| COV-FTG-F23 | VIS-8 | pipeline | no fence / wall / hedge treatment on plot edges |
| COV-FTG-H11 | IMP-9 | pipeline | distributaries (a delta) have no mechanism; IMP-9 lists the delta among its promised configurations |
| COV-FTG-L08 | COV-MFCG-L10 | rendering | no measure / ruler tool (IMPROVEMENTS R10) |
| COV-FTG-N07 | DEF-12 | rendering | hosted share links sit under the recorded "a sync service" deferral |
| COV-VG-VN-003 | MN-4 | pipeline | the village palisade is built before the roads on the live build |
| COV-VG-VN-090 | COV-NG-XA36 | determinism | no `ruined` lifecycle state |
| COV-NG-OBS3 | MFP-8 | scope | §13.5's MFCG metric scale rests on the wrong unit (4.00 m per unit, not ≈ 3.7 m) |
| DEF-1 | IMP-6 | scope | the J-T placeholder deferral is exactly what IMP-6 attacks (thresholds no planned step can set) |

Pairs the lenses cite as overlapping but that are **not** duplicates (different defects, one decision should settle them together) are recorded in each item's `related` field — for example GEO-11 with LC-10 (weld order versus replay order), GEO-5 / GEO-34 under LC-1, GEO-29 with LC-17, FTG-4 with MFP-4, COV-MFCG-E04 with MFP-4, MFP-5 with MN-1 / MN-2, LC-6 with AM-6, AM-3 with FTG-13.

## 4. The master table (grouped by owner, then by suggested batch)

Columns: **id** · **kind** · **sev** (red-team severity, or the audit's H/M/L; n/a for rules, notes, deferrals) · **also** (other areas whose text changes) · **dup of** · **claim** (one line) · **source** (file and section). The required change for every item is in `index.json`.

### kernel — 21 items

**K1 · all (§2 storage, §3)** (21)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| GEO-1 | blocker | — | pipeline | — | Exact nesting of five separate per-level DCELs is unrealisable on the integer lattice | rt-geometry §2 findings table (line 72) |
| SCL-2 | blocker | — | — | — | The static index rebuilt at every batch commit makes S10 and S11 cost seconds | rt-scale §2 findings table (line 82) |
| GEO-10 | major | — | determinism | — | The vertex-move predicate for smoothing and warp is wrong, and warp has no level across five separate DCELs | rt-geometry §2 findings table (line 81) |
| GEO-11 | major | — | determinism | — | Weld makes the plat depend on insertion order, so the locality oracle and the K-3 load check cannot pass for geometric edits | rt-geometry §2 findings table (line 82) |
| GEO-15 | major | — | pipeline | — | Terrain heights in `Int16Array` centimetres overflow at 327.67 m, and flats after priority-flood are unresolved | rt-geometry §2 findings table (line 86) |
| GEO-20 | major | — | pipeline | — | The kerb is built three different ways, and per-edge insets of concave faces have no primitive | rt-geometry §2 findings table (line 91) |
| GEO-3 | major | — | determinism, scope | — | The 5 cm weld / 25 cm minEdge dead band rejects about one cut in ten, and F-NUM cannot repair it | rt-geometry §2 findings table (line 74) |
| GEO-4 | major | — | pipeline | — | One type and one entity per half-edge cannot represent coincident features; sliver absorption deletes typed edges | rt-geometry §2 findings table (line 75) |
| GEO-5 | major | — | determinism | — | Raw arena indices are persisted in entity records, seam contracts and edit events, with no lineage on split, merge or weld | rt-geometry §2 findings table (line 76) |
| GEO-6 | major | — | pipeline | — | `splitFace` does not define contact for the degenerate cases the lattice makes common | rt-geometry §2 findings table (line 77) |
| GEO-7 | major | — | — | — | The null-OBB class survives: the OBB contract contradicts itself, and NaN or ±∞ silently become vertices at the origin | rt-geometry §2 findings table (line 78) |
| GEO-8 | major | — | pipeline, determinism | — | The straight skeleton's "exact rational event times" are impossible; near-simultaneous events are the normal case for roofs, and nothing validates the output | rt-geometry §2 findings table (line 79) |
| GEO-9 | major | — | scope, determinism | — | Two boolean engines with different numerics ship, and the fallback cannot offset | rt-geometry §2 findings table (line 80) |
| GEO-32 | minor | — | — | — | "Areas are exact in doubles" holds per product, not per sum; ring orientation must not depend on it | rt-geometry §2 findings table (line 103) |
| GEO-35 | minor | — | determinism | — | Minimum-feature tolerances differ between writers and invariants | rt-geometry §2 findings table (line 106) |
| SCL-22 | minor | — | rendering | GEO-9 | The pure-JS boolean fallback is budgeted nowhere | rt-scale §2 findings table (line 102) |
| COV-VG-VN-156 | coverage | L | scope | — | World frames are stated as single sizes (2 / 5 / 8 km); VG shows non-square maps are structural. *(staged)* | cov-vg §2.3 VILLAGE-LATER caveats (line 101) |
| COV-VG-WC3 | coverage | L | — | — | §3.1 Poisson row says "a domain-warped variant for wood edges"; the creator's warp is on the density noise, not the sampler (V15 / pv N3; VN-120). §4.9 is already right. | cov-vg §2.4 wording corrections item 3 (also coverage-audit-ng-shared §6 item 5) |
| DEF-13 | deferral | — | scope | — | A WASM kernel | ARCHITECTURE # Deferrals (line 2167) |
| DEF-2 | deferral | — | — | — | The boolean library choice (M0 benchmark) | ARCHITECTURE # Deferrals (line 2167) |
| DEF-3 | deferral | — | — | — | The straight-skeleton port versus in-house decision (M0) | ARCHITECTURE # Deferrals (line 2167) |

### determinism — 47 items

**D1 · ids, streams, hashes, failure ladder (§5, §6, §2.8)** (16)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| GEO-2 | blocker | — | kernel, rendering | — | A wall-clock watchdog changes the model, so the same seed gives different towns on different machines | rt-geometry §2 findings table (line 73) |
| LC-1 | blocker | — | kernel, pipeline | — | One id string is both the address and the stream key; it breaks under re-parenting, recycles dead ids, and encodes JOIN membership | rt-lifecycle §2 findings table (line 76) |
| SCL-1 | blocker | — | kernel, scope | — | The invariant suite and a whole-model canonical hash run after every batch and every edit | rt-scale §2 findings table (line 81) |
| LC-3 | major | — | scope | — | Stream paths embed creation-order ids, so upstream changes reshuffle every descendant; the golden protocol's byte-identity claim is false | rt-lifecycle §2 findings table (line 78) |
| LC-5 | major | — | — | — | The failure ladder and "New random" share the `attempt` segment | rt-lifecycle §2 findings table (line 80) |
| SCL-12 | major | — | — | — | String-path stream keys cost a third of the CITY budget, and the encoding is frozen after M1 | rt-scale §2 findings table (line 92) |
| GEO-31 | minor | — | scope | — | The floating-point lint is a short denylist and misses ` | rt-geometry §2 findings table (line 102) |
| GEO-34 | minor | — | kernel | — | Quantised anchors flip under 1 cm upstream shifts, and the on-edge anchor tie-break is unstated | rt-geometry §2 findings table (line 105) |
| LC-25 | minor | — | — | — | Version stamps in the hashed model | rt-lifecycle §2 findings table (line 100) |
| LC-26 | minor | — | — | — | A single-valued lifecycle state drops pins | rt-lifecycle §2 findings table (line 101) |
| LC-28 | minor | — | — | — | Enter, clone, document identity and forward compatibility | rt-lifecycle §2 findings table (line 103) |
| LC-29 | minor | — | — | — | Ids and stream paths are not layer-qualified | rt-lifecycle §2 findings table (line 104) |
| LC-30 | minor | — | — | — | Session state outside the recipe: proxies, "Surprise me", entry mode | rt-lifecycle §2 findings table (line 105) |
| SCL-16 | minor | — | rendering, pipeline | — | Proxy thumbnails lost their "at town size" | rt-scale §2 findings table (line 96) |
| VIS-11 | minor | — | rendering | — | The roof downgrade "hip-from-OBB" is itself a visual surprise | rt-visual §2 findings table (line 121) |
| COV-VG-WC1 | coverage | L | — | — | §6.1 calls NG / VG successor seeds "irreproducible"; pv R6 / P0 show VG's successor seed is reproducible per build (VN-007). | cov-vg §2.4 wording corrections item 1 (also coverage-audit-ng-shared §6 item 1) |

**D2 · document, replay, undo, snapshots, migration (§2.9, §7.4–§7.5)** (16)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| LC-10 | major | — | — | — | Drawn constraints are hoisted before their stage on replay but applied at their log position interactively | rt-lifecycle §2 findings table (line 85) |
| LC-11 | major | — | pipeline | — | Epochs are not events in the ordered log | rt-lifecycle §2 findings table (line 86) |
| LC-13 | major | — | — | — | Choosing the snapshot (or keeping the old model) leaves a document whose later undo, migration and verification switch back silently | rt-lifecycle §2 findings table (line 88) |
| LC-14 | major | — | scope | — | Migration: unspecified id mapping, silent mis-binding, orphan locks that no longer protect, and no mechanism for "the last N versions" | rt-lifecycle §2 findings table (line 89) |
| LC-15 | major | — | — | — | The recipe and the permalink omit model-affecting inputs; an assignment hash cannot reproduce assignments; `&doc=<id>` needs a server that does not exist | rt-lifecycle §2 findings table (line 90) |
| SCL-11 | major | — | kernel | — | The document persists derivable rasters and five copies of shared boundaries | rt-scale §2 findings table (line 91) |
| SCL-5 | major | — | rendering | — | The undo snapshot ring multiplies the model by eight; the CITY heap is over budget even without it | rt-scale §2 findings table (line 85) |
| FTG-21 | minor | — | rendering | — | The wire-format bar is quoted but not budgeted, and the compact twin uses another origin | rt-ftg §2 findings table (line 101) |
| LC-21 | minor | — | — | — | Table-edit invalidation by cited rows is too narrow | rt-lifecycle §2 findings table (line 96) |
| LC-22 | minor | — | — | — | JSON-Patch overrides silently retarget after a table update | rt-lifecycle §2 findings table (line 97) |
| LC-24 | minor | — | — | — | Duplicated document state | rt-lifecycle §2 findings table (line 99) |
| LC-27 | minor | — | kernel | — | Two inverses are not inverses | rt-lifecycle §2 findings table (line 102) |
| LC-31 | minor | — | rendering, scope | — | Host inputs are not required to reach the document | rt-lifecycle §2 findings table (line 106) |
| SCL-20 | minor | — | pipeline | — | Evolution state has no compaction rule | rt-scale §2 findings table (line 100) |
| COV-NG-XA36 | coverage | L | pipeline, rendering | — | PARTIAL [STAGE-2] — `LifecycleState` has demolished / altered / converted but no ruined state and no ruin program, although `docs/IMPROVEMENTS.md` SC-2 and V3 expect 'ru… *(staged)* | cov-ng-shared §3 XA. Watabou extra posts, older half — `watabou-extra-a.md` (line 155) |
| COV-VG-VN-090 | coverage | L | pipeline, rendering | COV-NG-XA36 | No `ruined` lifecycle state or ruin roof kind, although IMPROVEMENTS V3 counts on "the EVO lifecycle gives ruin as a state". *(staged)* | cov-vg §2.3 VILLAGE-LATER caveats (line 100) |

**D3 · edit actions, locks, assignments, controls (§7.1–§7.3, §7.6–§7.8)** (15)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| LC-4 | major | — | scope | — | "Adjust … locality guaranteed" cannot hold for the basic panel's parameters, and O2 (c) is vacuous as defined | rt-lifecycle §2 findings table (line 79) |
| LC-7 | major | — | pipeline | — | Coarse-level edits have no local re-derivation operator | rt-lifecycle §2 findings table (line 82) |
| LC-8 | major | — | — | — | The fate of edits inside a regenerate scope is undefined; overrides follow ids to other entities or vanish | rt-lifecycle §2 findings table (line 83) |
| LC-9 | major | — | pipeline | — | Assignments override locks, dispersed re-solves move untouched placements, and assignments enter by two paths | rt-lifecycle §2 findings table (line 84) |
| GEO-33 | minor | — | kernel | — | The authoring boundary neither resamples strokes nor lets a user draw an island | rt-geometry §2 findings table (line 104) |
| GEO-41 | minor | — | pipeline, scope | — | Control continuity is asserted over decisions that are inherently discrete | rt-geometry §2 findings table (line 112) |
| MFP-12 | minor | — | pipeline | — | MFCG's first-level Features toggles are demoted behind the advanced panel | rt-mfcg §2 findings table (line 106) |
| COV-FTG-C12 | coverage | L | pipeline | — | PARTIAL [BASE (module)] — locks / pins on ids (§7.2) and `regenerate` on an id scope (§7.1); field-level locks inside one person are not stated | cov-ftg §3 C. People and simulation (line 200) |
| COV-FTG-C13 | coverage | L | rendering, pipeline | — | PARTIAL [BASE (module)] — `setAttr` batches (§15.1 E2) and the `query` gazetteer (§11); person-search facets unspecified | cov-ftg §3 C. People and simulation (line 201) |
| COV-FTG-M01 | coverage | M | pipeline | — | PARTIAL [BASE] — §7.1 covers paint (`setAttr` colour / roof), demolish (`delete`, `convert: demolish`), vertex moves (`moveVertex`), splits and joins, and a one-building… | cov-ftg §3 M. Editing and regeneration (line 400) |
| COV-FTG-M04 | coverage | L | rendering | — | PARTIAL [BASE] — `setField` brushes exist for prosperity, density, greenery and terrain (§7.1–7.2) and per-entity `setAttr`; no area brush paints roof kinds, colours or… | cov-ftg §3 M. Editing and regeneration (line 403) |
| COV-MFCG-L03 | coverage | L | kernel | — | PARTIAL [BASE] — §3.4 / §7.1 warp kernels move, rotate, equalize, bloat, pinch, smooth, shift, random with dry-run validation and undo; the mapping to MFCG's Displace /… | cov-mfcg §3 L. Editing and interaction (10 rows) (line 289) |
| COV-NG-CR02 | coverage | M | kernel | COV-MFCG-L03 | PARTIAL [BASE] — §3.4 / §7.1 warp kernels with Equalize = angles and Bloat = larger cells as ruled, but 'rotate' is a local brush kernel (centre, radius, strength) — the… | cov-ng-shared §3 CR. Critic ruling file — `_critic.md` (capabilities it names or rules on |
| COV-VG-VN-008 | coverage | L | — | — | PARTIAL (low) [BASE (IMPR R8 keep-test: per-layer rerol] — isolation holds by construction (§6.1 per-concern streams `forest`, `render.trees`, `style/*`); missing: a nam… | cov-vg §3 3.1 Pipeline, determinism, failure handling, process lessons (line 138) |
| AM-5 | amendment | — | pipeline, rendering | — | Everything is editable (base principle). Every generated element (terrain, water, roads, districts, plots, buildings, walls, greenery, labels, layers) and every rule tab… | AMENDMENTS-2026-09-25 item 5 |

### pipeline — 128 items

**P1 · site, terrain and water (S1)** (12)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| GEO-13 | major | — | kernel | — | S1's closed-outline routine has no simplicity guarantee (islands, fjords, sky islands) | rt-geometry §2 findings table (line 84) |
| GEO-14 | major | — | determinism | — | "Contours and coast agree by construction" is false, and the hard invariant that polices it has no ladder | rt-geometry §2 findings table (line 85) |
| GEO-16 | major | — | kernel | — | S4 smooths each route separately, so shared runs become braided near-duplicate spines | rt-geometry §2 findings table (line 87) |
| GEO-17 | major | — | determinism | — | Bridges must be within ±10° of the channel normal (a hard invariant), but nothing constructs that angle | rt-geometry §2 findings table (line 88) |
| IMP-9 | major | — | scope | — | Must-have letters promise configurations no mechanism can produce | rt-improve §2 findings table (line 78) |
| FTG-19 | minor | — | scope | — | An island town has nowhere to send its external roads | rt-ftg §2 findings table (line 99) |
| GEO-36 | minor | — | — | — | S1 river construction: loops, unbounded carving, and vanishing islands | rt-geometry §2 findings table (line 107) |
| COV-FTG-H04 | coverage | L | — | — | PARTIAL [BASE] — §4.2 S1 coast from a bearing and an intent (bay / headland / straight / fjord / islands) through one closed-outline routine with domain-warped fBm; per-… | cov-ftg §3 H. Water, coast, bridges and harbours (line 306) |
| COV-FTG-H06 | coverage | L | rendering | — | PARTIAL [BASE] — §4.2 S1 (7) bank classes per shore segment (beach / rock / cliff / quay / marsh) from slope and exposure; §2.3 `bankKinds[]`. The bay-versus-headland cl… | cov-ftg §3 H. Water, coast, bridges and harbours (line 308) |
| COV-FTG-H07 | coverage | L | — | — | PARTIAL [BASE] — water ∩ footprints = ∅ (§5.3); no shore setback band for plots or fields is specified | cov-ftg §3 H. Water, coast, bridges and harbours (line 309) |
| COV-FTG-H11 | coverage | L | — | IMP-9 | PARTIAL [BASE] — §4.2 S1 rivers by descent (cannot bend back into the sea), tributaries from secondary inlets, river islands by branch-and-rejoin, width `w0 · acc^0.4`;… | cov-ftg §3 H. Water, coast, bridges and harbours (line 313) |
| COV-VG-WC2 | coverage | L | scope | — | §4.2 S1 (3) cites VG's river course as a Chaikin-smoothed control polyline with alternating offsets; on the live build the knots are not strictly alternating and the cur… | cov-vg §2.4 wording corrections item 2 |

**P2 · order before growth, backbone, growth, walls, gates, castle, harbour, evolution (S2–S5, S7, §4.11)** (29)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| FTG-3 | major | — | kernel | MFP-3 | FTG's landmark-first fix is lost: large claims are cut from the fabric after the fabric exists | rt-ftg §2 findings table (line 83) |
| FTG-4 | major | — | — | — | The arterial network is frozen at S4: no growth stage can add a main road | rt-ftg §2 findings table (line 84) |
| FTG-5 | major | — | scope | — | Stage boundaries are isotropic level sets: on open ground every stage is a disc, the look FTG's creator retired in V2 | rt-ftg §2 findings table (line 85) |
| FTG-6 | major | — | scope | — | The `ringed` preset cannot produce rings | rt-ftg §2 findings table (line 86) |
| FTG-8 | major | — | determinism | — | An enceinte must be a closed ring: water-anchored walls are impossible and a coastal town is sealed from its own quays | rt-ftg §2 findings table (line 88) |
| GEO-18 | major | — | determinism | — | The wall trace is drawn after streets and districts and pulled up to 40 m: ungated secondary crossings have no remedy | rt-geometry §2 findings table (line 89) |
| GEO-19 | major | — | kernel | — | Harbour basins, moats and canals are carved into L0 after the streets and districts already cover that ground | rt-geometry §2 findings table (line 90) |
| GEO-27 | major | — | determinism | — | The one incremental path the base builds grows streets through built plots; nothing stops or converts them | rt-geometry §2 findings table (line 98) |
| LC-12 | major | — | determinism | — | An epoch re-solves the global fields while promising survivors are not re-rolled | rt-lifecycle §2 findings table (line 87) |
| MFP-2 | major | — | scope | — | FTG growth does MFCG's street work at block scale, so the bent cut rarely fires and nothing measures MFCG's street signature | rt-mfcg §2 findings table (line 96) |
| MFP-3 | major | — | kernel, determinism | — | Nothing reserves the castle, the main plaza or institution precincts before streets are grown | rt-mfcg §2 findings table (line 97) |
| MFP-4 | major | — | — | — | `gates = N` does not give MFCG's roads = gates: extra arterials dead-end at the wall and missing ones become road-less posterns | rt-mfcg §2 findings table (line 98) |
| MFP-6 | major | — | scope | — | The default walled share and the suburb regime turn every one-click town into MFCG's size-80 shanty case: the wall encloses a minority of the town | rt-mfcg §2 findings table (line 100) |
| FTG-17 | minor | — | — | — | The growth heading model is under-specified; its curvature-continuous reading curls 600 m streets through 73–108° | rt-ftg §2 findings table (line 97) |
| FTG-18 | minor | — | — | — | "Trim arterials to the boundary" between stages contradicts S4's through-roads | rt-ftg §2 findings table (line 98) |
| FTG-20 | minor | — | — | — | The suburb regime has no perimeter road | rt-ftg §2 findings table (line 100) |
| GEO-37 | minor | — | — | — | S5's separation rule covers only parallel spines | rt-geometry §2 findings table (line 108) |
| GEO-38 | minor | — | kernel | — | Wall bands and towers straddle the L1 wall edge, and wall→road conversion has no clearance rule | rt-geometry §2 findings table (line 109) |
| MFP-9 | minor | — | determinism | — | "Buildings never touch the wall" is stated for one face and is not a hard invariant; the ribbon regime's densest plots start at the gate | rt-mfcg §2 findings table (line 103) |
| COV-FTG-D26 | coverage | L | — | FTG-5 | PARTIAL [BASE] — the suburb and ribbon regimes have no control over the wide ↔ elongated balance (the distance-to-gate kernel is fixed per preset) | cov-ftg §3 D. Road-graph substrate and street growth (line 232) |
| COV-FTG-G07 | coverage | L | — | — | PARTIAL [BASE] — §4.8 setback band inside the wall; enceinte per growth stage (the historical boundary); wall → ring road conversion (§4.11). No intervallum lane is gene… | cov-ftg §3 G. Walls, gates, towers and the castle (line 293) |
| COV-FTG-G09 | coverage | M | — | — | PARTIAL [BASE] — §4.2 S3 castle siting by score (inside / on the enceinte / outside) and government as a table row (§10.3); §4.8 claim → bailey inset → keep by `lir` → o… | cov-ftg §3 G. Walls, gates, towers and the castle (line 295) |
| COV-FTG-G10 | coverage | L | — | — | PARTIAL [BASE] — `Gate.kind gatehouse`, `Tower.kind round / square / bastion` (§2.7), keep by `lir` (rectangular); octagonal keeps and an inner ward are unspecified | cov-ftg §3 G. Walls, gates, towers and the castle (line 296) |
| COV-FTG-H17 | coverage | L | — | — | PARTIAL [BASE] — §4.8 a basin carved from the waterfront district (a template shape scaled to port demand), moles, quays as `quay` ways, piers as `pier` ways at 12–20 m;… | cov-ftg §3 H. Water, coast, bridges and harbours (line 319) |
| COV-MFCG-A03 | coverage | M | determinism | — | PARTIAL [BASE] — S0 keeps MFCG flags as intent toggles with auto values recorded (§4.2, §5.4), walls on at TOWN+ by default (§1.2) and a random intent behind Surprise me… | cov-mfcg §3 A. Determinism, seeds, parameters, retry (9 rows) (line 125) |
| COV-MFCG-C07 | coverage | M | — | FTG-8 | PARTIAL [BASE] — water first and water ∩ footprints = ∅ (§4.1, §5.3), docks typing (§4.5) and piers (§4.8) are covered, but the enceinte of a coastal or riverside town i… | cov-mfcg §3 C. Terrain, coast and water (7 rows) (line 157) |
| COV-MFCG-E04 | coverage | H | — | — | PARTIAL [BASE] — through-roads continue to the context margin at their bearings (§4.3, §4.9), but external bearings are derived only for river and coastal towns ("a road… | cov-mfcg §3 E. Streets, roads and the street graph (12 rows) (line 184) |
| COV-MFCG-Q01 | coverage | L | rendering | — | PARTIAL [BASE] — lifted: several enceintes (§2.7, §4.8), continuous zoom (§8.5), documents (§2.9), non-circular forms (§7.7), islands and confluences (§4.2 S1), routed n… | cov-mfcg §3 Q. Reference limits and stated design stance (context rows, not parity items) (3 rows) (line 332) |
| DEF-8 | deferral | — | determinism | — | The evolution engine beyond the one incremental path *(staged)* | ARCHITECTURE # Deferrals (line 2167) |

**P3 · districts, prosperity, allocation and siting, the evaluation model (S6, S10b, §4.1)** (13)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| FTG-1 | blocker | — | determinism, rendering | LC-2 | Lazy per-district S10–S13 cannot coexist with a global roster siting solver: the town's content depends on which districts are looked at first | rt-ftg §2 findings table (line 81) |
| LC-2 | blocker | — | determinism, rendering | — | Lazy per-district derivation of S10–S14 makes the model depend on the order districts are viewed | rt-lifecycle §2 findings table (line 77) |
| FTG-2 | major | — | determinism | — | The stage budget is computed in the wrong currency, before the field that sets plot size exists, with a misderived constant | rt-ftg §2 findings table (line 82) |
| FTG-7 | major | — | determinism | — | Outside-settlement buildings and farm households are demanded in S2 but their land is made in S12, after siting | rt-ftg §2 findings table (line 87) |
| LC-6 | major | — | determinism | — | Quantile bands with hysteresis, and band-only re-derivation, make prosperity results path-dependent and non-local | rt-lifecycle §2 findings table (line 81) |
| MFP-7 | major | — | scope | — | Siting separates dwellings from workplaces and districts are typed by social class, so blocks zone into residential and commercial — MFCG's "no residential wards" semant… | rt-mfcg §2 findings table (line 101) |
| SCL-4 | major | — | rendering | — | The one-click view defeats the laziness the METROPOLIS budget relies on | rt-scale §2 findings table (line 84) |
| MFP-10 | minor | — | rendering | — | The district band and the district-count law contradict each other above ≈ 275 ha; at MFCG-80 scale the city view carries twice MFCG's labels | rt-mfcg §2 findings table (line 104) |
| COV-FTG-B09 | coverage | M | — | FTG-7 | PARTIAL [BASE] — §10.2 `requires: water / coast / route / farmland`, `firstAtPopulation`, the farmland gate; `LandUse` has `quarry`. Missing: raw-resource availability d… | cov-ftg §3 B. Size ladder and the content roster (line 178) |
| COV-FTG-E02 | coverage | L | — | — | PARTIAL [BASE] — §2.5 `venueMix`, the mixed-use floor (§4.5) and siting by district affinity (§4.7 S10b); no sub-district level — industry clusters inside a district eme… | cov-ftg §3 E. Districts (line 240) |
| COV-FTG-I03 | coverage | L | — | — | PARTIAL [BASE] — §4.9 arable per capita from an era table, farmsteads beside their fields; neither a count-driven division nor the "similar features together" clustering… | cov-ftg §3 I. Hinterland, farmland, forests and landscape features (line 330) |
| AM-6 | amendment | — | determinism | — | Prosperity is a gradient and a band, not binary. Wealth is a continuous field over the town: smooth gradients with predictable drivers (centre, market, main streets, gat… | AMENDMENTS-2026-09-25 item 6 |
| DEF-16 | deferral | — | rendering | — | Per-district worker pools for S10–S11 are "deferred behind a measured need" (§4.1; J-12; D-18 "per-district workers only after profiling"), while §12 says METROPOLIS rel… | ARCHITECTURE §4.1 "One generation worker" bullet (line 635) |

**P4 · infill, plots, footprints and heights, stage-3 hook (S8–S11)** (29)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| FTG-13 | major | — | rendering | — | Heights have no ground datum, so on PLAT's own terrain 3-D export, shadows and bridges cannot stand on the ground | rt-ftg §2 findings table (line 93) |
| GEO-21 | major | — | kernel, rendering | — | S8 turns NG's drawing rule into model topology: cut spines end at the kerb, not at the crossed spine | rt-geometry §2 findings table (line 92) |
| GEO-22 | major | — | kernel | — | The bent cut's rules are undefined on curved, round-joined kerbs and on non-quadrilateral faces | rt-geometry §2 findings table (line 93) |
| GEO-23 | major | — | determinism | — | The F-CUT ladder turns large concave faces into single court blocks — MFCG's "empty areas inside walls" returns | rt-geometry §2 findings table (line 94) |
| GEO-24 | major | — | kernel | — | Frontage-first strips overlap or cross at reflex corners and concave frontages; "never emits hourglasses" is only asserted | rt-geometry §2 findings table (line 95) |
| GEO-25 | major | — | kernel | — | S10's rear lanes write L1 from a per-block L3 batch, leaving sibling blocks stale in an unbounded loop | rt-geometry §2 findings table (line 96) |
| GEO-26 | major | — | kernel | — | Row-house footprints fitted as frontage-aligned rectangles cannot share bent or curved party walls | rt-geometry §2 findings table (line 97) |
| IMP-8 | major | — | scope | — | The alley rule and the courtyard rule fire on the same condition; dense quarters lose their courts | rt-improve §2 findings table (line 77) |
| SCL-13 | major | — | rendering, scope | — | The stage-3 hook has no cost contract, and laziness cannot apply at the city view | rt-scale §2 findings table (line 93) |
| VIS-10 | major | — | rendering | — | Single-wing L/T footprints and model-fixed roof kinds cannot produce NG's per-wing "fake" gables | rt-visual §2 findings table (line 120) |
| VIS-8 | major | — | rendering, kernel | — | Plot boundaries have no walls, fences, hedges or gates | rt-visual §2 findings table (line 118) |
| GEO-42 | minor | — | determinism | — | A bent cut that continues across a street bounding another district writes into that district's batch | rt-geometry §2 findings table (line 113) |
| COV-FTG-E07 | coverage | L | rendering | — | PARTIAL [BASE] — §4.5 squalid / shanty type after the first half of the stages, outside the enceinte (FTG's staging rule); dirt `surface`; §15.1 C7 promises a small-tent… | cov-ftg §3 E. Districts (line 245) |
| COV-FTG-F09 | coverage | L | — | — | PARTIAL [BASE] — building scale interpolates with prosperity (§4.7); a small-tents row is only promised by §15.1 C7; no per-district or per-regeneration scale knob (½, 2… | cov-ftg §3 F. Blocks, plots and buildings (line 267) |
| COV-FTG-F16 | coverage | M | — | COV-MFCG-G05 | PARTIAL [BASE] — §4.7 S11 institution site plans ("the claim's own template: keep by `lir`, church nave + tower, market hall"); §15.1 C9 defers non-rectangular landmark… | cov-ftg §3 F. Blocks, plots and buildings (line 274) |
| COV-FTG-F20 | coverage | M | rendering | — | PARTIAL [BASE] — §2.6 `roof.material?`; §8.2 colour roles. No material rule table (by stage, district kind, class or prosperity), no wall-material field on `Enceinte`, a… | cov-ftg §3 F. Blocks, plots and buildings (line 278) |
| COV-FTG-F21 | coverage | L | — | — | PARTIAL [BASE] — §2.6 `Building {class, use, entrance, heights, roof, occupants, assignment}` and names from the naming streams; description and opening times absent fro… | cov-ftg §3 F. Blocks, plots and buildings (line 279) |
| COV-FTG-F23 | coverage | L | — | VIS-8 | PARTIAL [BASE] — §2.5 typed `YardPart`s (yard, garden, court, pen, forecourt …); no fence feature — no edge type, yard-boundary attribute or furniture kind | cov-ftg §3 F. Blocks, plots and buildings (line 281) |
| COV-MFCG-C05 | coverage | L | — | — | PARTIAL [BASE] — the real heightfield feeds costs, stage boundaries, siting and the context vector (slope, aspect) (§2.3, §4.2–4.4, §2.5) — beyond MFCG — but the S8 bent… | cov-mfcg §3 C. Terrain, coast and water (7 rows) (line 155) |
| COV-MFCG-G03 | coverage | L | kernel | — | PARTIAL [BASE] — the bisect family is the bent cut (§4.6); the radial and semi-radial fans (MFCG park groves) and the ring cut (a cloister / quadrangle band around a cou… | cov-mfcg §3 G. Blocks, lots and building footprints (19 rows) (line 212) |
| COV-MFCG-G05 | coverage | M | — | — | PARTIAL [BASE] — the base outline builder emits a rectangle or an L/T composition (§2.6, §4.7 S11) and the keep a single lir rectangle (§4.8); MFCG's axis-locked composi… | cov-mfcg §3 G. Blocks, lots and building footprints (19 rows) (line 214) |
| COV-NG-N18 | coverage | M | — | MN-3 | PARTIAL [BASE (shared: NG-measured law of the bas] — §4.6 step 2 draws the start foot along the start side as N(0.5, 0.06) clamped to [0.40, 0.60], citing BG-2's corner-… | cov-ng-shared §3 N. Neighbourhood generator — `profile-neighbourhood.md` (incl. CA, RA, Critic-2, BG, PF, PP, AN addenda) (line 84) |
| COV-NG-N19 | coverage | L | — | — | PARTIAL [BASE (shared: NG-measured law of the bas] — §4.6 step 4 has the 0.5 probability and an equal-chord arc '15 m ± 3' but no size law; PF-2 (e): tangent length ≈ 0.… | cov-ng-shared §3 N. Neighbourhood generator — `profile-neighbourhood.md` (incl. CA, RA, Critic-2, BG, PF, PP, AN addenda) (line 85) |
| COV-NG-N20 | coverage | L | — | — | PARTIAL [BASE (shared: NG-measured law of the bas] — §4.6 step 6 keeps w = a + b·L (a per district); the free-end term (≈ +5 mu of length per free end) and the fixed per… | cov-ng-shared §3 N. Neighbourhood generator — `profile-neighbourhood.md` (incl. CA, RA, Critic-2, BG, PF, PP, AN addenda) (line 86) |
| COV-NG-N27 | coverage | L | — | VIS-8 | PARTIAL [STAGE-2] — §4.7 S11 set-back compound + §4.9 grove rule (NG C3); the compound's stone enclosure wall is implied ('a gate on the access edge') but modelled neith… *(staged)* | cov-ng-shared §3 N. Neighbourhood generator — `profile-neighbourhood.md` (incl. CA, RA, Critic-2, BG, PF, PP, AN addenda) (line 93) |
| COV-VG-VN-170 | coverage | M | — | — | PARTIAL (medium) [BASE (IMPR R3 names "partly built fronta] — `vacant` residue exists and suburb plots carry a density Bernoulli (§4.4), but no rule leaves frontage runs… | cov-vg §3 3.14 Neighbourhood (NG) capabilities in this slice (line 365) |
| AM-3 | amendment | — | rendering | — | Height for shadows (base data model; stage-3 builder). Every building, wing, tower and roof carries height values (floors, eave height, ridge height, tower height) even… | AMENDMENTS-2026-09-25 item 3 |
| MN-3 | manager-note | — | — | — | Bent-cut recipe not yet in §4 (queue B12). Adopt, as the measured default for bent cuts: the start point at a fraction of the parent face's OBB MAJOR axis drawn from ≈ N… | ARCHITECTURE-VALIDATION §0.M item 3 |
| DEF-17 | deferral | — | rendering | — | Stage-3 building compositions are out of scope ("interface and the outline builder only") — an out-of-scope entry the Deferrals section does not list. *(staged)* | ARCHITECTURE §16 "Deliberately out of scope" list (line 1933) |

**P5 · greenery, hinterland decoration and furniture (S12, pins)** (13)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| MFP-11 | minor | — | — | — | The `greens` toggle has no defined effect on the greenery rule table, and MFCG's green spacer before an inner castle is missing | rt-mfcg §2 findings table (line 105) |
| COV-FTG-I09 | coverage | L | rendering | — | PARTIAL [BASE] — §4.9 avenues (tier-1 ways in rich / planned districts), hedgerow lines, woods, yard planting; ambient landscape scatter and shoreline bands are not spec… | cov-ftg §3 I. Hinterland, farmland, forests and landscape features (line 336) |
| COV-FTG-I11 | coverage | L | rendering | — | MISSING [BASE] — no species model: §4.9 kinds are land-use and greenery kinds, crowns are one style program | cov-ftg §3 I. Hinterland, farmland, forests and landscape features (line 338) |
| COV-FTG-I12 | coverage | M | — | — | PARTIAL [BASE] — §15.1 C16 claims "decorations as typed symbols / faces (ponds, copses, stone circles, ruins with tracks — a decoration table)", but no body section spec… | cov-ftg §3 I. Hinterland, farmland, forests and landscape features (line 339) |
| COV-FTG-I15 | coverage | L | rendering | — | PARTIAL [BASE] — §7.7 biome as a circumstance; §15.1 C16 "climate as a circumstance + style preset (should-have depth)"; no climate table (ground cover, tree species, fa… | cov-ftg §3 I. Hinterland, farmland, forests and landscape features (line 342) |
| COV-FTG-J02 | coverage | L | — | — | PARTIAL [BASE] — §4.9 yard-planting rows and the "tree by the well" pin rule; `Pin` kinds (well, fountain, large tree, cross, shrine, pump, gallows, PART II); `deck(tabl… | cov-ftg §3 J. In-town greenery, decoration and open space (line 350) |
| COV-FTG-J05 | coverage | L | rendering | — | MISSING [BASE] — no stall symbol or placement rule; §4.7 has only the institution template "market hall" (grep: no "stall") | cov-ftg §3 J. In-town greenery, decoration and open space (line 353) |
| COV-MFCG-I01 | coverage | M | — | — | PARTIAL [BASE] — the Pin entity (well, fountain, cross, shrine, pump …) exists from M1 (§II.1) and squares are sized from population (§4.7 S9), but the base states no ru… | cov-mfcg §3 I. Special wards and landmarks (5 rows) (line 245) |
| COV-MFCG-I03 | coverage | L | — | — | PARTIAL [BASE] — parks are placed and sized by rule (§4.9 parks and ornamental grounds, 0.4–0.8 ha per 1 000) and planted at render, but their internal layout (paths, gr… | cov-mfcg §3 I. Special wards and landmarks (5 rows) (line 247) |
| COV-NG-CR23 | coverage | L | — | COV-FTG-J02 | PARTIAL [BASE] — decorations as a table with per-class rows (§15.1 FTG C16–C17); `Pin.kind` lacks statue and bandstand | cov-ng-shared §3 CR. Critic ruling file — `_critic.md` (capabilities it names or rules on |
| COV-NG-VS27 | coverage | M | rendering | — | PARTIAL [BASE] — `lit` names 'tiled land-use textures with tint' + light, but `LandUse.kind` has no crop / livestock attribute (wheat, grain, flax, cotton, sheep, pig, t… | cov-ng-shared §3 VS. Visual specification — `visual-spec.md` (line 274) |
| COV-NG-XB23 | coverage | L | — | COV-FTG-J02 | PARTIAL [STAGE-2] — `SquareFabric` + pins in squares (II.2–II.3); `Pin.kind` has no monument / statue kind *(staged)* | cov-ng-shared §3 XB. Watabou extra posts, newer half — `watabou-extra-b.md` (line 183) |
| AM-1 | amendment | — | rendering | — | Greenery by prosperity (base). Trees and greens here and there, parks, and artificial landscapes (formal gardens, orchards, avenues, ornamental grounds) placed by rules… | AMENDMENTS-2026-09-25 item 1 |

**P6 · content, people and simulation (§10)** (19)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| FTG-10 | major | — | determinism | LC-16 | "Pinned once seen" turns reading into writing | rt-ftg §2 findings table (line 90) |
| FTG-11 | major | — | rendering | — | The simulation is specified as a per-person pure query, but FTG's schedules read other people and capacity-limited sub-locations | rt-ftg §2 findings table (line 91) |
| FTG-14 | major | — | determinism | — | The roster is a capped fixed-point iteration, not FTG's sequential loop, so it need not be prefix-stable in population | rt-ftg §2 findings table (line 94) |
| FTG-9 | major | — | determinism | — | FTG's content is global and relational; PLAT's person identity is per household and its locality is spatial | rt-ftg §2 findings table (line 89) |
| LC-16 | major | — | determinism | — | "A person is pinned once seen" turns reading into writing, and pinned people dangle when their household moves | rt-lifecycle §2 findings table (line 91) |
| COV-FTG-B06 | coverage | L | — | — | PARTIAL [BASE] — §10.2 fixed-point loop "until the employed share stabilises"; the ratio-matching alternative is not offered | cov-ftg §3 B. Size ladder and the content roster (line 175) |
| COV-FTG-B11 | coverage | L | — | — | PARTIAL [BASE (module)] — §10.2 `HouseholdRow` size distributions; §10.3 households per plot and greedy profession ↔ workplace matching in the module; re-matching after… | cov-ftg §3 B. Size ladder and the content roster (line 180) |
| COV-FTG-B12 | coverage | L | — | — | PARTIAL [BASE (module)] — §2.7 `Faction {kind, seats, turf, influence}`, `Institution.faction`; meetings in `@plat/sim` (§10.1); roles, criteria, goals and the reconcili… | cov-ftg §3 B. Size ladder and the content roster (line 181) |
| COV-FTG-B13 | coverage | L | — | — | PARTIAL [BASE] — S2 "castle if lordship" (§4.2), "government type gates the castle as a table row" (§10.3), `InstitutionRow`, military / administration near the castle (… | cov-ftg §3 B. Size ladder and the content roster (line 182) |
| COV-FTG-B14 | coverage | L | — | — | PARTIAL [BASE (module)] — `Faction.kind = religion`, religious precincts as siting attractors (§4.7 S10b), "religions' meetings" in the module; the pantheon / worship mo… | cov-ftg §3 B. Size ladder and the content roster (line 183) |
| COV-FTG-C01 | coverage | L | — | — | PARTIAL [BASE (module)] — §10.3 `derivePerson(seed, id)` "yields name, age, role and appearance from tables"; append-only dictionaries; setting packs later (D-6). Partne… | cov-ftg §3 C. People and simulation (line 189) |
| COV-FTG-C02 | coverage | L | — | — | PARTIAL [BASE (module)] — "appearance from tables" (§10.3); the template grammar is unspecified (the §10.4 Tracery-class engine could host it) | cov-ftg §3 C. People and simulation (line 190) |
| COV-FTG-C04 | coverage | L | — | FTG-9 | PARTIAL [BASE (module)] — §10.1 "relations by the family-unit model" (named); friend groups and rivalries via §15.1 B6 (`@plat/sim`); no schema | cov-ftg §3 C. People and simulation (line 192) |
| COV-FTG-C05 | coverage | L | — | — | PARTIAL [BASE (module)] — "events as templates" (§10.1, §10.3) — named only | cov-ftg §3 C. People and simulation (line 193) |
| COV-FTG-C07 | coverage | L | — | FTG-11 | PARTIAL [BASE (module)] — §10.3 "sub-locations per building class — slots now, rooms at stage 3"; capacities and tags unspecified | cov-ftg §3 C. People and simulation (line 195) |
| COV-FTG-C08 | coverage | L | — | — | PARTIAL [BASE (module)] — §2.7 `Person {role, workplace}`; reference integrity is an invariant (§5.3); person types and caregiver-following unspecified | cov-ftg §3 C. People and simulation (line 196) |
| COV-FTG-E10 | coverage | L | — | — | PARTIAL [BASE] — §2.5 District {kind, faces, boundary, venueMix, name, labelSpine}; a generated description of the district's mix is not specified | cov-ftg §3 E. Districts (line 248) |
| COV-FTG-L06 | coverage | L | — | — | PARTIAL [BASE (module)] — §10.4 one original English-fantasy grammar and syllable / Markov generators over our own corpora; setting packs later (D-6); per-culture genera… | cov-ftg §3 L. Labels, names and map furniture (line 391) |
| DEF-10 | deferral | — | scope | — | Setting packs | ARCHITECTURE # Deferrals (line 2167) |

**P7 · stage 2, sky layer and village readiness (PART II, PART III)** (13)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| GEO-30 | major | — | kernel | — | Stage-2 rule (3) forbids the geometry NG close-ups are made of | rt-geometry §2 findings table (line 101) |
| LC-18 | major | — | determinism | — | Stage-2 close-ups have no persistence status | rt-lifecycle §2 findings table (line 93) |
| COV-NG-N06 | coverage | L | — | — | PARTIAL [STAGE-2] — the district boundary is the outline at stage 2 (II.1; NG B1); standalone / sky outlines come from §4.2's closed-outline routine — template-specific… *(staged)* | cov-ng-shared §3 N. Neighbourhood generator — `profile-neighbourhood.md` (incl. CA, RA, Critic-2, BG, PF, PP, AN addenda) (line 72) |
| COV-NG-N12 | coverage | L | — | — | PARTIAL [STAGE-2] — II.2 lays 'radials' as template seed geometry before the bent cut, but NG's radial streets are each band's own bent cuts (first cut = slit), staggere… *(staged)* | cov-ng-shared §3 N. Neighbourhood generator — `profile-neighbourhood.md` (incl. CA, RA, Critic-2, BG, PF, PP, AN addenda) (line 78) |
| COV-NG-XA07 | coverage | L | — | — | PARTIAL [STAGE-2] — institutions claim whole blocks (§4.7 S10 (3)); dome / cupola roofs; greenery around them (§4.9) — mutual spacing between landmark / manor blocks is… *(staged)* | cov-ng-shared §3 XA. Watabou extra posts, older half — `watabou-extra-a.md` (line 126) |
| COV-VG-VN-002 | coverage | L | scope | — | VG computes density before its network; the base computes it in S6 after growth, and §4.1 draws the stages as a fixed chain — a village needs a density stage ahead of S4… *(staged)* | cov-vg §2.3 VILLAGE-LATER caveats (line 98) |
| COV-VG-VN-003 | coverage | L | — | MN-4 | On the live VG build the palisade precedes the roads and trackers query it each step; the base traces walls after growth, NetworkStrategy.grow has no enceinte input and… *(staged)* | cov-vg §2.3 VILLAGE-LATER caveats (line 99) |
| COV-VG-VN-179 | coverage | L | — | — | COVERED (live) / PARTIAL (low) [STAGE-2] — `SquareFabric` rectangular or round plaza (II.2); IMPR S4's restraint "keep NG's square as a void in the fabric beside planned… *(staged)* | cov-vg §3 3.14 Neighbourhood (NG) capabilities in this slice (line 374) |
| COV-VG-WC4 | coverage | L | scope | — | §1.6 / PART III say "Nothing in §2–§4 assumes walls, districts or a market", but Block.district / Plot.district are required and §5.3 enforces building ⊂ plot ⊂ block ⊂… *(staged)* | cov-vg §2.4 wording corrections item 4 |
| AM-2 | amendment | — | kernel, rendering | — | Floating islands, refined (toggle, after the neighbourhood stage). No relation to the sewer/underground layer. An island may carry its own terrain, somewhat independent… *(staged)* | AMENDMENTS-2026-09-25 item 2 |
| MN-4 | manager-note | — | — | — | Village build change. The Village Generator's palisade is built BEFORE roads on build 19365073 (New-build addendum, queue B08) — relevant only to PART III (village readi… *(staged)* | ARCHITECTURE-VALIDATION §0.M item 4 |
| DEF-15 | deferral | — | scope | — | The village product (PART III) *(staged)* | ARCHITECTURE # Deferrals (line 2167) |
| DEF-7 | deferral | — | kernel | — | The sewer and floating-island rule design beyond the hooks *(staged)* | ARCHITECTURE # Deferrals (line 2167) |

### rendering — 64 items

**R1 · the city-zoom look, styles and paint programs (§8.2–§8.4)** (24)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| MFP-1 | blocker | — | pipeline, scope | — | At city zoom the plot model plus negative-space ink streets makes the street network unreadable | rt-mfcg §2 findings table (line 95) |
| VIS-1 | major | — | — | — | The `ink` preset is written in MFCG's unit, and nothing maps PLAT's realistic model to drawn symbols | rt-visual §2 findings table (line 111) |
| VIS-2 | major | — | — | — | Roles and the contrast test cannot separate gardens from buildings, trees from water, or yards from streets | rt-visual §2 findings table (line 112) |
| VIS-3 | major | — | — | — | The city LOD drops every way below tier 2, so the suburb's streets and the extramural lanes vanish | rt-visual §2 findings table (line 113) |
| VIS-7 | major | — | scope | — | The `lit` preset cannot be built as specified on either backend, and its assets have no budget | rt-visual §2 findings table (line 117) |
| VIS-9 | major | — | — | — | The style families are not defined across the four LOD bands | rt-visual §2 findings table (line 119) |
| VIS-12 | minor | — | — | — | The display list has no raster mark | rt-visual §2 findings table (line 122) |
| VIS-13 | minor | — | — | — | Shore treatments need per-segment shore marks | rt-visual §2 findings table (line 123) |
| VIS-14 | minor | — | — | — | Avenue crowns cover the tier-1 casings at city zoom | rt-visual §2 findings table (line 124) |
| VIS-15 | minor | — | — | — | A paper-role halo misfires once blocks have a ground tone | rt-visual §2 findings table (line 125) |
| VIS-16 | minor | — | scope | — | "Layer order equal to the recorded order" is undefined for PLAT's new semantics | rt-visual §2 findings table (line 126) |
| VIS-17 | minor | — | pipeline | — | The sky layer has no occlusion policy | rt-visual §2 findings table (line 127) |
| COV-FTG-I05 | coverage | L | — | — | MISSING [BASE] — no feathered-edge paint program in §8.2 (grep: no "blur" / "feather") | cov-ftg §3 I. Hinterland, farmland, forests and landscape features (line 332) |
| COV-FTG-K05 | coverage | L | — | — | PARTIAL [BASE] — §8.4 `ShadowPass(layer, sun)` with a sun vector (fixed in the base) and the `night` preset; a time-of-day sun path and the sun controls are unspecified | cov-ftg §3 K. Rendering and style (line 364) |
| COV-FTG-K06 | coverage | L | — | — | PARTIAL [BASE] — season and weather exist only as circumstances (§7.7) and one `night` style file; no seasonal or weather paint programs (IMPROVEMENTS R13 lists them as… | cov-ftg §3 K. Rendering and style (line 365) |
| COV-FTG-K07 | coverage | L | — | — | PARTIAL [BASE] — §8.2 has a `vignette` program and `parchment` / `bw-print` style files; §15.1 D6 cites "§8.5 WebGL2 post hooks", but §8.5 specifies no post-processing h… | cov-ftg §3 K. Rendering and style (line 366) |
| COV-FTG-K13 | coverage | L | pipeline | — | PARTIAL [BASE (module)] — thematic overrides by attribute (§8.2) and `whereIs` (§10.3); live people positions as a map layer are unspecified | cov-ftg §3 K. Rendering and style (line 372) |
| COV-MFCG-K06 | coverage | M | scope | — | PARTIAL [BASE] — §8.2 says ink reproduces the building drop shadow (shadowPass offset), but §1.2 and §8.4 put shadows off in the one-click default; MFCG ships Raised ON… | cov-mfcg §3 K. Rendering, styles and palette (17 rows) (line 270) |
| COV-MFCG-K12 | coverage | L | — | — | PARTIAL [BASE] — per-entity jitter attributes (§8.1) and thematic overrides keyed by prosperity / use / epoch / owner (§8.2) cover weathering and theming, but no distric… | cov-mfcg §3 K. Rendering, styles and palette (17 rows) (line 276) |
| COV-MFCG-K16 | coverage | L | — | — | PARTIAL [BASE] — §8.2 ships MFCG's recorded order, but that list has no slot for trees and forest (recorded: after wards and fields, before walls, with the forest over r… | cov-mfcg §3 K. Rendering, styles and palette (17 rows) (line 280) |
| COV-NG-XB17 | coverage | L | — | — | PARTIAL [BASE (shared)] — palette roles accept `Color[]` (§14 `StyleSheet.palette`); the pick rule (random per individual, index 0 for aggregate fills) is not stated | cov-ng-shared §3 XB. Watabou extra posts, newer half — `watabou-extra-b.md` (line 177) |
| COV-VG-VN-029 | coverage | M | scope | — | PARTIAL (medium) [BASE (IMPR §5.2 should-have "O12 extras:] — a `contourMarks(levels, mark)` program exists (§8.2) but only the reserved `painterly` preset uses it; §15.… | cov-vg §3 3.2 Terrain and relief (line 164) |
| COV-VG-VN-031 | coverage | M | — | — | MISSING (medium) [BASE (IMPR §5.2 O12 extras "hillshade")] — no hillshade paint program in §8.2's vocabulary (`texture + light(dir)` is FTG's roof lighting); only the re… | cov-vg §3 3.2 Terrain and relief (line 166) |
| COV-VG-WC5 | coverage | L | — | — | §8.4 lists buildings, walls, towers and trees as shadow casters; bridges (which cast shadows on water in VG) are not named (VN-051). | cov-vg §2.4 wording corrections item 5 |

**R2 · tiles, LOD, decoration streams, worker and performance budgets (§8.1, §8.5, §12)** (16)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| GEO-28 | major | — | — | — | Per-district raster tiles break the global "every casing before any body" order at district seams, and adjacent fills leave seams | rt-geometry §2 findings table (line 99) |
| LC-20 | major | — | determinism, pipeline | — | Render-time instances are keyed by LOD band and cannot be edited | rt-lifecycle §2 findings table (line 95) |
| MFP-5 | major | — | scope | — | The speed claim is anchored on MFCG size 80 but compares a rung with a third of its buildings; at equal output the budget is 4–7× slower and MFCG's large sizes have no r… | rt-mfcg §2 findings table (line 99) |
| SCL-3 | major | — | pipeline | — | The CITY per-stage split omits the dominant term of several stages | rt-scale §2 findings table (line 83) |
| SCL-6 | major | — | scope, pipeline | — | The worker boundary is unspecified, and the typed API clones the model on every call | rt-scale §2 findings table (line 86) |
| SCL-7 | major | — | — | — | Per-district retained tiles break under continuous zoom, and print has no assembly path | rt-scale §2 findings table (line 87) |
| SCL-8 | major | — | pipeline, kernel | — | Trees generated at render with per-tree Poisson sampling and per-tree crowns cannot meet the 16 ms claim | rt-scale §2 findings table (line 88) |
| SCL-9 | major | — | determinism | — | Edits cost what the city costs, not what the scope costs | rt-scale §2 findings table (line 89) |
| VIS-5 | major | — | determinism | LC-20 | Decoration is keyed by LOD band, so trees and roof detail re-roll at every band switch | rt-visual §2 findings table (line 115) |
| VIS-6 | major | — | — | SCL-7 | Per-district tiles "re-rasterised only when marks change" cannot follow continuous zoom | rt-visual §2 findings table (line 116) |
| LC-23 | minor | — | pipeline | — | Caches keyed by entity id serve stale content | rt-lifecycle §2 findings table (line 98) |
| SCL-15 | minor | — | scope | — | "Reference hardware" is never defined | rt-scale §2 findings table (line 95) |
| SCL-17 | minor | — | scope | — | First-map targets disagree, and METROPOLIS's depends on an optional backend without text | rt-scale §2 findings table (line 97) |
| COV-FTG-OBS5 | coverage | L | — | — | §12 compares against "FTG ≈ 3–7 s server + 4.6 s client"; the 4.6 s is the client's busy time during the create step, while the scene build is 6.4–7.0 s after the click… | cov-ftg §6 consistency observations item 5 |
| MN-1 | manager-note | — | scope | — | MFCG export units (J19). MFCG's GeoJSON export is in METRES; only its SVG uses 4 m units (road width 8 in the JSON vs 2 in the SVG, exactly 4×; consistent with the MFP-8… | ARCHITECTURE-VALIDATION §0.M item 1 |
| DEF-6 | deferral | — | — | — | WebGL2 SDF text | ARCHITECTURE # Deferrals (line 2167) |

**R3 · labels and map furniture (§9)** (12)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| GEO-29 | major | — | determinism | — | Label fitting depends on the host's text engine, so model hashes differ across browsers and between UI and headless | rt-geometry §2 findings table (line 100) |
| LC-17 | major | — | determinism | — | Every local regeneration re-runs names and labels for the whole town | rt-lifecycle §2 findings table (line 92) |
| SCL-10 | major | — | — | — | Label placement is priced for district spines but specified for every label at every LOD | rt-scale §2 findings table (line 90) |
| VIS-4 | major | — | pipeline | — | District labels cannot fit PLAT's districts at CITY zoom under "≥ 99 % inside" and the protected features | rt-visual §2 findings table (line 114) |
| GEO-39 | minor | — | kernel | — | Label spines on holed faces are undefined | rt-geometry §2 findings table (line 110) |
| COV-FTG-L08 | coverage | M | scope | COV-MFCG-L10 | MISSING [BASE] — no measuring tool in §7–§9 or §14 (`grep -w ruler`: 0 hits); IMPROVEMENTS R10 lists "a ruler" among the properties a rewrite must keep | cov-ftg §3 L. Labels, names and map furniture (line 393) |
| COV-MFCG-A06 | coverage | L | — | — | PARTIAL [BASE] — only "framing = camera fit over world units" (§15.1 E4); no rule for the initial view or export frame when ribbons or a river tail stretch the extent (M… | cov-mfcg §3 A. Determinism, seeds, parameters, retry (9 rows) (line 128) |
| COV-MFCG-J04 | coverage | L | — | — | PARTIAL [BASE] — §9 lists a legend generated from the symbol registry and an annotation layer with numbered markers, but not the MFCG legend content (numbered districts… | cov-mfcg §3 J. Names, labels, legend, text (5 rows) (line 258) |
| COV-MFCG-L10 | coverage | M | scope | — | MISSING [BASE] — no measure / ruler tool anywhere: §9 furniture lists scale bar, compass, grid, title, legend, annotation layer and north arrow; §7 edits and §14 @plat/a… | cov-mfcg §3 L. Editing and interaction (10 rows) (line 296) |
| COV-MFCG-M06 | coverage | L | — | — | PARTIAL [BASE] — emblem deferred as "a later symbol" (§15.1 D3); no heraldry generator or import slot specified | cov-mfcg §3 M. Export, integration, 3D and companion tools (8 rows) (line 307) |
| COV-NG-XB08 | coverage | L | — | — | PARTIAL [BASE] — §9 procedural compass with a per-document reroll; its placement rule (minimise occluded content, away from the centre) and manual placement are not stat… | cov-ng-shared §3 XB. Watabou extra posts, newer half — `watabou-extra-b.md` (line 168) |
| COV-NG-XB15 | coverage | L | — | — | PARTIAL [BASE (shared furniture)] — §9 grid at a round ground distance, fading, VTT 1.5 m / 5 ft; a hex grid and 'skip water tiles' are not stated | cov-ng-shared §3 XB. Watabou extra posts, newer half — `watabou-extra-b.md` (line 175) |

**R4 · export and interop (§11)** (12)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| FTG-12 | major | — | determinism | — | The embedding bridge copies FTG's `stateId` protocol without the store that makes it converge | rt-ftg §2 findings table (line 92) |
| SCL-14 | major | — | — | — | The layered SVG export has no LOD rule and no size budget | rt-scale §2 findings table (line 94) |
| GEO-40 | minor | — | — | — | 3-D export: coplanar ground surfaces z-fight, and a river is not a plane | rt-geometry §2 findings table (line 111) |
| VIS-18 | minor | — | — | SCL-14 | SVG export has no size budget at METROPOLIS scale | rt-visual §2 findings table (line 128) |
| COV-FTG-N06 | coverage | L | — | — | PARTIAL [BASE] — beyond FTG for scene data: native VTT exports (Foundry JSON, Universal VTT) with walls, doors, lights and regions, one scene per layer (§11); but a live… | cov-ftg §3 N. Export, formats and integration (line 420) |
| COV-FTG-N07 | coverage | L | — | DEF-12 | PARTIAL [BASE] — §6.4 permalinks for unedited towns and `&doc=<id>` for edited ones; a hosted share service with access levels is a recorded deferral ("a sync service") | cov-ftg §3 N. Export, formats and integration (line 421) |
| COV-NG-XB32 | coverage | L | — | COV-VG-VN-158 | PARTIAL [BASE] — §11 JSON / GeoJSON / glTF carry footprints, heights, roofs, ways with widths, water; tree instances are render-time only (§2.7 `treeStream`) and no expo… | cov-ng-shared §3 XB. Watabou extra posts, newer half — `watabou-extra-b.md` (line 192) |
| COV-VG-VN-158 | coverage | L | — | — | PARTIAL (low) [BASE (IMPR §5.2 O11 extras 3-D)] — glTF covers buildings, walls, towers, terrain and water (§11); tree instances are "never stored" (§2.7, §4.9) and no ex… | cov-vg §3 3.13 Export and integration (line 348) |
| DEF-11 | deferral | — | determinism, scope | — | Host inputs | ARCHITECTURE # Deferrals (line 2167) |
| DEF-12 | deferral | — | scope | — | A sync service | ARCHITECTURE # Deferrals (line 2167) |
| DEF-4 | deferral | — | — | — | The dd2vtt profile details | ARCHITECTURE # Deferrals (line 2167) |
| DEF-5 | deferral | — | — | — | CityJSON as a second 3-D format (D-8) | ARCHITECTURE # Deferrals (line 2167) |

### scope — 39 items

**S1 · acceptance, tests and parity metrics (§13, §15)** (20)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| FTG-15 | major | — | — | — | Two FTG parity metrics measure the polyline representation, not the town, and the junction row hides which reference is the target | rt-ftg §2 findings table (line 95) |
| FTG-16 | major | — | — | — | The FTG half of the owner's acceptance cannot be run with the captures on disk | rt-ftg §2 findings table (line 96) |
| GEO-12 | major | — | kernel | — | B-FUZZ's random inputs almost never hit exact degeneracies, and two of its stated properties are wrong | rt-geometry §2 findings table (line 83) |
| IMP-4 | major | — | — | — | The first-weighted improvements are measured by conformance checks only | rt-improve §2 findings table (line 73) |
| IMP-5 | major | — | determinism | — | "Zero whole-map restarts" is true by construction and measures nothing | rt-improve §2 findings table (line 74) |
| IMP-6 | major | — | — | — | M2's exit needs numbers that J-T forbids passing and nothing can set before the corpus phase | rt-improve §2 findings table (line 75) |
| IMP-7 | major | — | determinism | — | The faithfulness test O9 (c) fails a perfect regenerator | rt-improve §2 findings table (line 76) |
| IMP-10 | minor | — | — | — | §15.2 silently drops acceptance clauses that measured named weaknesses | rt-improve §2 findings table (line 79) |
| IMP-11 | minor | — | — | — | Human-subject criteria have no subjects, and D-5 has no protocol | rt-improve §2 findings table (line 80) |
| IMP-12 | minor | — | — | — | Between-seed variety has no base metric | rt-improve §2 findings table (line 81) |
| IMP-16 | minor | — | determinism | — | "The twelve MFCG edit asks are expressible 12/12" counts vocabulary | rt-improve §2 findings table (line 85) |
| MFP-8 | minor | — | rendering | — | MFCG calibration anchors: the exports give an exact metric scale and ARCH quotes a wrong one; B-REF has no MFCG baselines although they are now measurable | rt-mfcg §2 findings table (line 102) |
| SCL-18 | minor | — | — | — | The test plan has no compute budget | rt-scale §2 findings table (line 98) |
| SCL-19 | minor | — | rendering | — | Cost-model tests cannot see the super-linear mechanisms that matter | rt-scale §2 findings table (line 99) |
| SCL-21 | minor | — | rendering | — | The per-generation statistics record is unbudgeted and partly uncomputable in the model | rt-scale §2 findings table (line 101) |
| COV-FTG-OBS1 | coverage | L | — | — | Five §15.1 FTG parity rows cite sections that do not carry the mechanism they name (C16 → §4.9 decoration table; D6 → §8.5 post hooks; C7 → tent row; C17 → per-class dec… | cov-ftg §6 consistency observations items 1 and 2 |
| COV-NG-OBS3 | coverage | L | — | MFP-8 | §13.5 quotes "MFCG ≈ 13–14 m across at size 25" as CONFIRMED, but it rests on visual-spec's ≈ 3.7 m per world unit, which visual-spec §7 #10 leaves OPEN by a factor of 2. | cov-ng-shared §6 other observations item 3 |
| COV-VG-VN-010 | coverage | L | — | — | PARTIAL (low) [BASE (B-REF provenance; owner non-negoti] — §13.5 B-REF reads "the capture records already on disk" and quotes VG / NG numbers as bands (VG 5.196 : 2.828… | cov-vg §3 3.1 Pipeline, determinism, failure handling, process lessons (line 140) |
| MN-2 | manager-note | — | rendering | — | Acceptance-test size mapping (J20). TOWN = MFCG size 40, CITY = size 80, METROPOLIS = size 130 (matched on the architecture's rung building counts: 1 200–1 500 / 4 500–6… | ARCHITECTURE-VALIDATION §0.M item 2 |
| DEF-1 | deferral | — | — | IMP-6 | Final numeric targets for every band and threshold (J-T: set from M-1 and B-REF by the validation lanes; no acceptance run may treat a placeholder as passed) | ARCHITECTURE # Deferrals (line 2167) |

**S2 · plan, effort, clean room, licences, scope decisions (§1, §14, §16, §17, decision tables)** (19)

| id | kind | sev | also | dup of | claim | source |
|---|---|---|---|---|---|---|
| IMP-1 | blocker | — | — | — | The clean-room chain hands implementers GPL source and the references' creative data, and polices only file paths | rt-improve §2 findings table (line 70) |
| IMP-2 | major | — | — | — | D-20's effort basis leaves out scope the base contains | rt-improve §2 findings table (line 71) |
| IMP-3 | major | — | rendering | — | The build plan contradicts D-7 and D-1 and overloads M3; re-cut the base release | rt-improve §2 findings table (line 72) |
| LC-19 | major | — | determinism | — | The build plan ships permalinks and goldens at M1, the shift protocol at M4, and version retention nowhere | rt-lifecycle §2 findings table (line 94) |
| FTG-22 | minor | — | rendering | — | §11 re-uses FTG's Foundry message vocabulary while §17 puts that module's field names off-limits | rt-ftg §2 findings table (line 102) |
| IMP-13 | minor | — | — | — | The fusion gate runs on a flat synthetic site | rt-improve §2 findings table (line 82) |
| IMP-14 | minor | — | — | — | The licence table has one wrong entry and no rules for scope, notices or versions | rt-improve §2 findings table (line 83) |
| IMP-15 | minor | — | rendering | — | The clean-room rule is applied too loosely to style tests and too strictly to fonts | rt-improve §2 findings table (line 84) |
| COV-FTG-A24 | coverage | L | — | — | PARTIAL [BASE] — the gazetteer `query` (§11) gives list and search access; accessibility of `@plat/app` is not addressed anywhere | cov-ftg §3 A. Pipeline, determinism, persistence and the creator's stance (line 163) |
| COV-FTG-A25 | coverage | L | determinism | — | PARTIAL [BASE] — §7.8 100 % of parameters documented (registry test) and release notes naming known defects; context-aware links from the UI to documentation (an R15 kee… | cov-ftg §3 A. Pipeline, determinism, persistence and the creator's stance (line 164) |
| COV-FTG-B10 | coverage | M | pipeline | — | MISSING [BASE (module)] — none of it in §10 or the schema; §10.2 only says FTG's 323 items are not reused; not in the module scope (§10.1), not in the Deferrals — an unr… | cov-ftg §3 B. Size ladder and the content roster (line 179) |
| COV-FTG-C03 | coverage | M | pipeline | — | MISSING [BASE (module)] — absent from §10 and the schema; not listed as out of scope — an unrecorded scope decision | cov-ftg §3 C. People and simulation (line 191) |
| COV-FTG-C11 | coverage | L | pipeline | — | MISSING [BASE (module)] — no view over the family-unit model is specified | cov-ftg §3 C. People and simulation (line 199) |
| COV-MFCG-L08 | coverage | L | — | — | PARTIAL [BASE] — UI idioms and hotkeys are delegated to @plat/app with no stated scheme (§15.1 F3); MFCG's click edit / shift reroll / ctrl reset idiom is recorded as wo… | cov-mfcg §3 L. Editing and interaction (10 rows) (line 294) |
| COV-VG-VN-088 | coverage | M | pipeline | — | PARTIAL (medium) [BASE (the size ladder's floor, IMPR O6; ] — TOWN is ≈ 5 000 people / 1 200–1 500 buildings (§1.1, §12); §4.2 S0 accepts `population?` but no section st… | cov-vg §3 3.6 Buildings, placement, classes, population (line 243) |
| AM-4 | amendment | — | rendering, pipeline | — | Size ladders. The town/city generator scales TOWN → CITY → METROPOLIS; the village generator (separate product) scales THORP → HAMLET → VILLAGE. Size classes, budgets, p… | AMENDMENTS-2026-09-25 item 4 |
| AM-7 | amendment | — | — | — | Adopted defaults (owner deferred, 2026-09-25; judgment table J10–J16). Default look = clean ink (MFCG family), second preset FTG-like textured/lit, house style later. Er… | AMENDMENTS-2026-09-25 item 7 |
| DEF-14 | deferral | — | — | — | The owner's own licence (D-22) | ARCHITECTURE # Deferrals (line 2167) |
| DEF-9 | deferral | — | — | — | The corpus calibration pass *(staged)* | ARCHITECTURE # Deferrals (line 2167) |

## 5. Notes for the fix lanes

**5.1 A premise to settle before fixing.** MFP-5 compares CITY with MFCG size 80 at 13 349–36 480 buildings; manager
note MN-1 (seed 555001, no river or coast) measures size 80 at ≈ 5 242 buildings and MN-2 maps CITY = size 80 on building
count. If MFP-5's counts came from shanty-town or sprawl options, the "4–7× slower at equal output" part is at least
partly INVALID; the rendering lane recomputes from `captures/mfcg/exports-sweep-2026-09-25/README.md` before choosing
FIXED or INVALID (MFP-5's `note` field says so).

**5.2 The amendments.** `docs/AMENDMENTS-2026-09-25.md` says the architecture does not yet contain its seven rules, while
ARCH §0.4 lists where each one "lands". AM-1 … AM-7 are therefore verify-and-complete items: each clause of the owner's
rule must be found as a concrete mechanism at the §0.4 landing (or added), not re-folded as a second copy.

**5.3 Decisions that span areas.** The lenses group these; one decision should settle each group, taken by the owner
area named first and read by the others before they write:

| decision | items | areas |
|---|---|---|
| what is fixed before growth (reservations, gate sites, wall and water traces, district claims) | MFP-2, MFP-3 (+FTG-3), MFP-4, GEO-18, GEO-19, FTG-5, FTG-8 (+COV-MFCG-C07), COV-MFCG-E04, IMP-13 | pipeline, then determinism (F-WALL, F-CASTLE rows) |
| the evaluation model: eager allocation, first paint, laziness | LC-2 (+FTG-1), SCL-4, DEF-16, MFP-1, SCL-9, SCL-13 | pipeline, rendering (§12) |
| identity, lineage keys and one replay fold | LC-1, GEO-5, GEO-34, LC-10, GEO-11, LC-14, LC-29, SCL-12 | determinism, kernel |
| the cross-level vertex protocol and edge roles | GEO-1, GEO-3, GEO-4, GEO-20, GEO-30, SCL-11 | kernel, pipeline (PART II) |
| label placement status (model or view) | GEO-29, LC-17, SCL-10, VIS-4 | rendering, determinism |
| tiles and decoration under continuous zoom | GEO-28, SCL-7 (+VIS-6), LC-20 (+VIS-5), SCL-8, COV-VG-VN-158 | rendering |
| heights and the ground datum | AM-3, FTG-13, GEO-15, GEO-40, COV-VG-WC5 | pipeline, kernel, rendering |
| the bent-cut recipe on PLAT's kerbs | MN-3 (+COV-NG-N18), COV-NG-N19, COV-NG-N20, GEO-21, GEO-22, GEO-42, COV-MFCG-C05 | pipeline |
| speed anchoring and reference hardware | MFP-5, MN-1, MN-2, SCL-3, SCL-15, SCL-17, COV-FTG-OBS5 | rendering, scope |
| epochs and the one incremental path | LC-11, LC-12, GEO-27, FTG-4, FTG-14, SCL-20, DEF-8 | pipeline, determinism |
| the content model (relations, pins, sub-locations, roster) | FTG-9, LC-16 (+FTG-10), FTG-11, FTG-14, COV-FTG-B10, COV-FTG-C03 | pipeline, scope |
| one geometry engine | GEO-9 (+SCL-22), DEF-2, DEF-3, GEO-8, DEF-13 | kernel, scope (§17, D-14) |
| acceptance that measures, with thresholds that can be set | IMP-4 – IMP-7 (+DEF-1), IMP-10 – IMP-12, IMP-16, FTG-15, FTG-16, LC-19, MN-2 | scope |
| clean room and licences | IMP-1, IMP-14, IMP-15, FTG-22 | scope |

**5.4 Owner-gated subjects inside the list.** Three items touch decisions the doctrine reserves to the owner; each must
still end FIXED by recording a concrete default that keeps the owner's options open and flagging it for veto, never by
leaving it open: DEF-14 (the owner's own licence), FTG-16 and MN-2 (a paid FTG account for METROPOLIS captures — a
purchase), and COV-FTG-B10 / COV-FTG-C03 (whether economy and personality content enter the product — new capability
versus repair).

**5.5 Clean room.** Several red-team findings and audit rows quote reference code, grammars, palettes and constants as
evidence (IMP-1 counts them). The fix lanes describe mechanisms in their own words and numbers only and never paste a
quoted excerpt into ARCHITECTURE.md; `required_change` text in `index.json` is the source's wording, kept for tracing,
not for copying into the architecture.

**5.6 Evidence status.** CONFIRMED (executed): the 163 red-team rows (9 blocker, 97 major, 57 minor) were extracted by
script from the seven findings tables and match every lens's stated counts; the 96 coverage gaps were extracted by script
from the four master checklists and match each audit's own summary (MFCG 17 PARTIAL + 1 MISSING; VG 7 PARTIAL + 1
MISSING; NG 16 PARTIAL; FTG 47 PARTIAL + 7 MISSING; 0 PRECLUDED); the Deferrals section has fifteen entries; every id is
unique, every `duplicate_of` and `related` id exists, no duplicate chains, and each duplicate shares its primary's owner
(checked by script). PLAUSIBLE (this lane's judgement): each owner and `also` assignment, each duplicate call, the twelve
added audit items, DEF-16 / DEF-17, and the batch hints — a reading of the claims and required changes, with full
finding text consulted where the owner was unclear.
