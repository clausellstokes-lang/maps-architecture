# IMPROVEMENTS — cross-reference improvement opportunities for the base town/city generator (MFCG ⊕ FTG), stage-2 neighbourhood composition, and the later village

Lane `IMPROVEMENTS` (Fable synthesis seat), 2026-09-25. STATUS: COMPLETE (2026-09-25, second seat). §0–§3 up to O12 were written by an earlier seat that was cut off before landing (file mtime 10:32; the 10:36 stop and the 11:12 interrupt); a fourth seat resumed at 11:45, re-read the inputs, folded in the three plot-model addenda (O17–O19) and the greenery / height / prosperity / defaults amendments, and completed O16, O10, O3, O8, O13, O14, §3.2–§3.3, §4–§7 and Appendix A.

Purpose: merge the four weakness ledgers into the cross-cutting opportunities the architects will be held to. Every
opportunity names the weaknesses it answers (with citations into the ledgers and the raw sources), the design idea, a
measurable acceptance criterion (a number or a test we can run against our captures or a generated corpus), the
restraint clause (what must not be lost), and its dependencies. Opportunities are tagged BASE / STAGE-2 / VILLAGE-LATER
and the BASE ones are ranked first. §4 lists what the references get right that a rewrite usually breaks; §5 is the
must-have / should-have / later split for the BASE, then the stage-2 list; §6 traces every one of the 165 ledger
entries to an opportunity so nothing was dropped; §7 records deferrals and evidence gaps.

Inputs: `docs/improvements/mfcg.md` (34 entries, Addendum 1 included), `docs/improvements/ftg.md` (37, Addendum 1 and its
errata included), `docs/improvements/ng.md` (44, the Plot-granularity addendum included), `docs/improvements/vg.md`
(50) — the Opus weakness-miner ledgers, all LANDED 2026-09-25, the addenda by 11:09 — read against the binding
critic rulings (`research/findings/_critic.md`, `_critic-ftg.md`, `_critic-os.md`, `_critic-vg-ng.md`) and spot-checked
at source (`research/patreon/**/post.md`, `research/devlogs/**/post.md`, `research/ftg-docs/*.md`, `captures/**`).

Citation form: `MFCG ROB-1` = entry ROB-1 of `docs/improvements/mfcg.md`; `FTG GEO-2`, `NG GQ-5`, `VG G7` likewise;
an 8–9-digit number is a Patreon post id under `research/patreon/<set>/<id>/post.md`; a 4–7-digit number is an itch
devlog id under `research/devlogs/`; `CR` = the creator, `US×n` = n distinct named commenters, `REC` = our recordings.

## §0 Reading record (what was and was not read in full)

This file was written by two seats. An earlier seat (cut off between 10:32 and 10:36 on 2026-09-25, before landing)
wrote §1–§3 up to O12; its own §0 recorded full reads of the four critic files and of the four ledgers as they stood
before the plot-model addenda (mfcg 1 204 lines, ftg 1 575, ng 900, vg 1 364), ≈ 175 k tokens of reading, and 33
source spot-checks whose script (`impr_spot.py`) and output survive in the session scratchpad. This seat (resumed
11:45) kept that text wherever the evidence still stands, re-read the inputs as listed below, re-executed the checks,
and wrote everything from O16 on, including O17–O19 from the addenda.

| # | file | this seat read | notes |
|---|---|---|---|
| 1 | `docs/IMPROVEMENTS.md` (the earlier seat's draft) | FULL (667 lines) | kept; header, counts, §1 paragraphs, §2 B-CITY and the §3.1 table updated for O17–O19 |
| 2 | `docs/improvements/mfcg.md` | lines 1–717 and 1207–1386 FULL: §0–§14 (all 34 entries, the top-15, the restraint list) and Addendum 1 (GEO-9, GEO-10); Appendix B (1176–1206) FULL | Appendix A per-source harvest (718–1175) by outline only |
| 3 | `docs/improvements/ftg.md` | lines 1–1228 and 1578–1904 FULL: all 37 entries, §13, §14, Addendum 1 with its census A1.1, GEO-8 to GEO-10 and the errata; Appendix B (1526–1577) FULL | Appendix A (1229–1525) by outline only |
| 4 | `docs/improvements/ng.md` | lines 1–713 and 856–1094 FULL: all 44 entries, §3 K1–K12, §4, §5, H9–H10, the Plot-granularity addendum PG-A1–A5 with K13–K14 | H1–H8 (714–855) by outline only |
| 5 | `docs/improvements/vg.md` | lines 1–1202 and 1336–1364 FULL: all 50 entries, §3, §4, H9–H10 | H1–H8 (1203–1335) by outline only |
| 6 | the four critic files | not re-read by this seat; the earlier seat's §0 recorded full reads, and the rulings are quoted in the task brief and cited inside every ledger entry used here | recorded in §7 as a limit of this seat |
| 7 | source spot-checks | the earlier seat's 33 checks re-executed by this seat (33/33 found) plus 36 checks of this seat's own (35/36 found at the cited id; the miss is explained in Appendix A): 68 of 69 quoted complaints and admissions found verbatim at source; the MFCG and VG console recounts re-derived; the FTG plot-granularity census re-run (Appendix A) | `impr_spot2.py` / `impr_spot2.out` in the session scratchpad |

Reading budget: ≈ 350 k tokens of reading in this seat (the draft plus all four ledgers less their per-source harvest
notes). The READING BUDGET switch therefore applied only to the harvest appendices (A.1–A.12, H1–H8), which are the
working notes the ledger entries were distilled from and which the entries cite by section; no ledger entry, restraint
list, top-15, user-voice tally or addendum was skimmed. No captured JavaScript bundle and no image was opened.
`research/findings/manor.md` (landed 07:24) is stage-3 evidence and was deliberately not an input to this lane.

## §1 Outcome first

**The four references fail in the same five places, and the fixes are shared.** Read side by side, the 165 ledger
entries (34 MFCG, 37 FTG, 44 NG, 50 VG, the three plot-model addenda included) collapse into 18 BASE opportunities,
6 stage-2 opportunities and 3 village-later items. The five shared failures:

1. **Water and terrain are fitted after the fact** (or absent), so the richest configurations are the least robust: MFCG
   restarts whole cities (24 restarts in 58 recorded attempts, 8 of 34 cities), VG discards whole villages (4 of 13
   highway maps) and silently swaps the user's seed, FTG's rivers can "bend back around into the ocean", and none of
   the four has a heightfield the layout responds to (FTG's was prototyped and shelved; NG is flat by construction;
   MFCG samples noise only for coasts). → O1, O3.
2. **Nothing is addressable or replayable.** No stable ids, one global RNG stream (MFCG, NG, VG) or no seed at all
   (FTG `seed: null`); one knob change re-rolls the town; edits cannot be saved (MFCG "no way to save those changes",
   NG/VG state = seed only) or destroy authored work (FTG regenerate "cannot be undone"); old towns never receive
   fixes (FTG), seeds drift across builds (VG 3131: 29 → 24 buildings in four days). → O2, O9, O11.
3. **Plots and streets are by-products.** Streets are cell edges (MFCG), a cut tree of T-junctions (NG), a proposal
   queue under a 15° clamp with no destinations (FTG) or tracker walks (VG); plots are recursive random cuts with a
   post-hoc filter (NG discards 42 % of lot leaves; FTG rewrote its splitter twice in a year and still ships hourglass
   footprints, 40 stacked duplicate houses and 10 % doorless buildings; MFCG's triangles were "an obligatory item of
   every change log"). No reference has a frontage model, and only FTG has metres. → O4, O5, O6. And no reference has a plot: MFCG
   paints every lot as a building or every lot as a detached house (a global display switch), FTG's lot is a tiling
   cell with no owner and 441 m² for every class, NG's grain has no spatial structure (Moran's I ≈ 0) and VG has no
   lots at all — the owner's plot-model and plot-granularity rulings name this gap. → O17, O18, O19.
4. **The map and the content do not know about each other.** watabou's wards are "hints" and population is
   ≈ 6.12 × buildings; FTG has the content but its handoff is one-way ("generates the details before the layout … I
   don't see this ever changing"), so factions, trades and wealth cannot shape the map. → O7, O8, O10.
5. **One scale, one picture.** No zoom in MFCG ("a big flaw", stated six times), NG (the wheel rotates) or VG (screen
   pixels on a fixed 1100² square); FTG zooms but recomputes roofs every render and tiers its looks off on weak devices;
   labels hide features and names are decoration; exports are one-way and non-standard in all four. → O12, O13, O11.

**The fusion thesis these opportunities imply** (recorded for the architects, judgment call J-F): a terrain- and
water-first site model that neither reference has (O1); FTG-class staged, destination-driven road growth as the
backbone — because growth extends naturally under the owner's evolution hook and satisfies the constraint-and-precision
tiebreaker — with MFCG/NG-class organic subdivision as the infill inside blocks, preserving the measured NG bent-cut
look (O4, O5); FTG-class content-first roster reconciled against the layout through a per-lot context vector (O7);
everything on stable ids and hash-derived sub-seeds (O2) in metres (O6), rendered as one semantic display list with
level of detail (O12). The creator of MFCG tried a road-first prototype in 2018 and judged "Merging these two techniques
also seems problematic" (devlog 31287, verified) — the merge is the risk the architecture must retire, and O4's
acceptance criteria are written to catch it (model time, junction statistics, block-shape statistics).

**Ranking headline (BASE, by (user value × evidence strength) ÷ cost, §2):** O6 metric units and furniture (20.0),
O2 deterministic recipe and stable ids (12.5), then a four-way tie at 8.3 broken by dependency order — O9 persistent
document, O11 entity model and schema, O18 prosperity field and plot-granularity law, O17 plot model and site plans —
then O5 frontage-first plots (6.7), a four-way tie at 6.25 in dependency order — O1 terrain and hydrology, O4 street
network, O7 content-first land use, O12 LOD rendering — then O16 workflow feedback and O19 greenery (6.0), O10 intent,
constraint and assignment inputs (5.3), O3 robust kernel and invariants (5.0), and O8 fortifications, O13 labels and
names, O14 hinterland (4.0 each). The must-have split in §5 is by necessity (the parity floor, the owner's base
rulings and the dependency graph), not by score alone: O3 ranks fifteenth by the formula only because its cost is the
highest, and it is a must-have because both base references crash, hang or restart today; O17 and O18 are must-haves
because the owner ruled the plot model and plot granularity base requirements.

## §2 Method

**Merging rule.** Two ledger entries merge when they name the same root cause or the same fix, not merely the same
symptom; a weakness that is one reference's only appearance of a cross-cutting theme is merged in and cited. Every
ledger entry maps to at least one opportunity in §6. Restraint items merge in §4 when two references keep the same
property for the same reason.

**Ranking.** Score = (V × E) ÷ C, with:
- **V, user value (1–5):** breadth and depth of demand — distinct named commenters across the four Appendix-B tallies,
  creator admissions, and the owner's goals (parity floor, "improve not recreate", the stage-2/3, assignment, layer and
  evolution hooks). V is a judgment (PLAUSIBLE); the commenter counts behind it are CONFIRMED (read in full by the four
  lanes).
- **E, evidence strength (1–5):** 5 = the weakness is CONFIRMED at source (creator quote or recorded count) in three or
  more references; 4 = in two; 3 = in one, with recorded numbers; 2 = stated once; 1 = inferred.
- **C, cost (1–5):** relative engineering effort and risk of the fix as designed (1 = data and conventions; 5 = a new
  kernel). Also a judgment (PLAUSIBLE).

**Standard benchmarks** used by the acceptance criteria (so the criteria are runnable, not aspirational):
- **B-CITY:** a generated corpus of 1 000 seeds × water configuration {none, coast, river, coast + river} × size class
  {TOWN, CITY, METROPOLIS} — the owner's base ladder — at ≈ 40 / 80 / 150 MFCG-cell equivalents (population targets
  ≈ 5 000 / 20 000 / 50 000), plus one small-town calibration rung (≈ 25 cells / 1 500) that exists only to compare
  against the MFCG size-25 recordings and is not a product size (the village ladder THORP → HAMLET → VILLAGE belongs
  to the later product), fixed generator version, every output's statistics and generation report written to disk.
- **B-EDIT:** 10⁵ scripted edit and regeneration sequences on B-CITY samples (add gate, move road, pin landmark, reroll
  block, resize district, change coast side), checking locality, planarity and persistence.
- **B-FUZZ:** 10⁶ random concave, holed, thin, near-collinear and snapped polygons per geometry primitive.
- **B-REF:** our capture measurements as baselines — MFCG console census (`docs/improvements/mfcg.md` §2), FTG decoded
  payloads (`docs/improvements/ftg.md` §2, `_critic-ftg.md` §4), NG vertex captures (`captures/neighbourhood/README-vertices.md`,
  `profile-neighbourhood.md` BG/PF addenda), VG console census (`docs/improvements/vg.md` H10).
- **B-ZOOM:** a zoom sweep 1:50 000 → 1:500 over B-CITY samples, checking legibility floors and feature pops.

**Tags.** [BASE] stage-1 fused town/city generator; [STAGE-2] neighbourhood composition readiness; [VILLAGE-LATER]
the later village product (not precluded, not paid for). Hooks carried by BASE items are marked S3 (building
compositions), ASSIGN (external assignment), LAYER (underground / ground / sky, sewers, floating islands), EVO
(evolution). Hooks are interfaces, ids and fields; they cost nothing when unused.

**Confidence.** Every "answers" line is CONFIRMED (quoted or counted by the ledgers, 68 quoted complaints and admissions re-verified at source in Appendix A).
Every design idea, target number and cost is PLAUSIBLE until built and measured. Baselines quoted from captures are
CONFIRMED for the recorded builds (MFCG 12710731, NG 11441280, VG 19251041 / 19365073, FTG server state of 2026-09-21
and 2026-09-25).

## §3 The cross-cutting opportunities

### 3.1 BASE opportunities, ranked

| rank | id | opportunity | V | E | C | score | hooks |
|---|---|---|---|---|---|---|---|
| 1 | O6 | Metric units end to end, cartographic furniture, exported statistics with provenance, the TOWN → CITY → METROPOLIS ladder | 4 | 5 | 1 | 20.0 | corpus calibration |
| 2 | O2 | Deterministic recipe: versioned blueprint, stable hierarchical ids, hash-derived sub-seeds, seeded decoration | 5 | 5 | 2 | 12.5 | ASSIGN, EVO |
| 3 | O9 | Persistent document: save/load/import, provenance and locks, faithful scoped regeneration, undo | 5 | 5 | 3 | 8.3 | ASSIGN, EVO |
| 4 | O11 | Complete entity model, one versioned schema, entity registry, round-trip and per-layer exports, embeddable API | 5 | 5 | 3 | 8.3 | LAYER, S2 |
| 5 | O18 | Prosperity field and one plot-granularity law: joins, splits, alleys and back lanes, seams as fields | 5 | 5 | 3 | 8.3 | ASSIGN, LAYER (sewer), EVO, S2 |
| 6 | O17 | Plot model: owned parcel, 0..n footprints + yard, per-plot site plan, heights, footprints and yards drawn — never the plot | 5 | 5 | 3 | 8.3 | S3, ASSIGN |
| 7 | O5 | Frontage-first typed plots in metres, every lot with an access edge, no silent discard | 4 | 5 | 3 | 6.7 | S3 |
| 8 | O1 | Terrain and hydrology first: heightfield, drainage, rivers by descent, water types; no whole-map restarts | 5 | 5 | 4 | 6.25 | LAYER (sewers, islands) |
| 9 | O4 | Destination-driven hierarchical street network (FTG-class staged growth) fused with organic infill (MFCG/NG-class) | 5 | 5 | 4 | 6.25 | EVO |
| 10 | O7 | Content-first land use: roster, rule-based siting on a per-lot context vector, plan–fit–reconcile, population as input | 5 | 5 | 4 | 6.25 | S3, ASSIGN |
| 11 | O12 | One semantic display list, level of detail, continuous zoom, retained rendering, style as data, layers, shadow hook | 5 | 5 | 4 | 6.25 | LAYER, S2, S3 |
| 12 | O16 | Workflow feedback: generation report in the UI, previews, regenerate-vs-new, discoverability, honest controls | 3 | 4 | 2 | 6.0 | — |
| 13 | O19 | Greenery by prosperity and district type: yard planting, parks, gardens, orchards, greens, avenues by rule | 3 | 4 | 2 | 6.0 | EVO |
| 14 | O10 | Intent, character and constraint inputs: intent vocabulary, character fields, circumstances, pins, forms catalogue, assignment and placement solver | 4 | 4 | 3 | 5.3 | ASSIGN, EVO |
| 15 | O3 | Robust, invariant-checked geometry and topology kernel with typed results, bounded retries, local repair, generation report | 5 | 5 | 5 | 5.0 | — |
| 16 | O8 | Fortification as a designed network: trace, gates on arterials, towers by rule, castle siting, several enceintes, conversions | 3 | 4 | 3 | 4.0 | EVO |
| 17 | O13 | Label engine and names grounded in the model; streets as named ways; annotation layer; typed text | 3 | 4 | 3 | 4.0 | — |
| 18 | O14 | Hinterland land use sized to the population; a context margin beyond the frame; extent from need | 2 | 4 | 2 | 4.0 | — |

(O15 was folded into O7 and O12 during merging: lazy deterministic derivation of people and building detail is a
consequence of O2 applied to those two. O17–O19 were added by the second seat from the three plot-model addenda that
landed after the first draft and from the owner's greenery, prosperity and height amendments — judgment call J-P, §7;
their V and E scores rest on owner rulings plus recorded evidence in three references each.) Dependency-aware build
order for the architects: O2 → O6 → O3 → O11 (its schema fixed early so every stage writes into it) → O1 → O4 → O5 →
O7 → O18 → O17 → O19 → O8 → O14 → O12 → O9 → O10 → O13 → O16.

---

### O6 · Metric units end to end, cartographic furniture, exported statistics with provenance [BASE] — score 20.0

**Answers.**
- MFCG GEO-6: "Dimensions are a mess in all my generators. Don't use them for planning anything real" (CR, 79147510,
  verified); "The scale in the generator is probably wrong. Buildings often seem way too large" (CR, devlog 345262);
  `size` counts cells while the UI reports buildings and population ≈ 6.12 × buildings (`_critic.md` C1); a
  factor-2 unit ambiguity in our own measurement (visual-spec §1.4, §7.10); US×6 (B11).
- FTG GEO-7: x/y were not 1:1 with metres for years, buildings ≈ 3× too large, found only because street view "felt"
  wrong (CR, 106664214, verified); the map is a fixed canvas per size class while population spans 550×.
- NG GQ-8, UX-2: widths in model units, the view rescales every map (scale 0.56–1.11 per map), no scale bar, compass
  or grid (REC; visual-spec §5 — NG is the only reference with none of the three).
- VG D2, L2, G12: "The scale there is very... vague" (CR, 84106820, verified), metric only on JSON export at 0.7 m per
  unit; users ask "What scale in miles?" and "is a 300x300 map what 300 meters?"; the terrain grid is 128² at every map
  size (REC).
- The owner's roadmap requires measurable outputs for corpus calibration, and the tiebreaker favours precision.

**Design idea.** Every model length is a metre (storage may be integer centimetres, as FTG does); footprints, street
widths, wall thickness, plot frontage and depth, tower spacing and terrain cell size are drawn from per-class
distributions held in data tables that carry a provenance field (source, date, confidence) so the later corpus phase can
replace them. Size is requested as population, area or building count, with the others derived and reported. The view
is a camera over world units (metres per pixel is a viewer property, never baked into geometry). Furniture: scale bar,
north arrow, optional grid in metres, feet or squares, all toggleable. Every generation writes a statistics record
(footprint-area distribution per class, street width and length per class, plot depth/width, block area, persons per
hectare, junction-degree mix, orientation entropy, farmland per capita, tower spacing) alongside the model.

**Acceptance criterion.** (a) A static check: 100 % of length-typed fields in the schema carry the unit `m`, and the
exporter refuses to write a length without one. (b) On B-CITY, ordinary-house footprint median within 60–160 m² and
p95 < 400 m² (FTG's decoded reference: median 103 m², p95 154 m²; MFCG's measured ≈ 13–14 m across at the ambiguous
scale is the failure to avoid); street widths per class inside their declared ranges 100 %. (c) Grid pitch accurate to
0.5 % at every zoom of B-ZOOM; scale bar present at every zoom. (d) The statistics record is emitted for 100 % of
B-CITY outputs and every table value has a provenance field (schema test).

**Restraint clause.** MFCG's legibility at a glance came from an exaggerated visual scale; solve legibility in rendering
(O12 symbol scaling), never by distorting the model. Keep FTG's ruler, scale bar, 2 m / 5 ft grid and unit toggle.
Keep VG's one-page composition as a print-first default frame. Absolute world units are a strength to keep: a
metropolis has the same house size as a small town, just more of them (`os-wards-render.md` §13.10).

**Dependencies.** Needs O2 (units live in the blueprint schema) and the schema of O11. Enables O5, O4, O8, O14, O13
(scale bar), and the corpus phase.

---

### O2 · Deterministic recipe: versioned blueprint, stable hierarchical ids, hash-derived sub-seeds, seeded decoration [BASE; ASSIGN, EVO hooks] — score 12.5

**Answers.**
- MFCG ROB-4, EDT-2: Enter drops explicit parameters (`gates=4` → `gates=-1`) and rolls size and flags from a
  non-seeded source; tree crowns and gable counts differ between two renders of one city; a permalink round trip
  "subtly changed the city geometry" (US, 102377277, verified); same seed with `gates` 0/1/4/9 re-rolls streets, wards,
  districts, buildings, fields and even the city name (REC, EG2-4); 2017: one global stream, "any change of evaluation
  order anywhere changes every downstream map", breadth-first tie-breaks follow the runtime's hash-map key order
  (`_critic-os.md` row 140).
- FTG ROB-4: `seed: null` in both captured requests; one changed leaf (`roadLength` 60 → 100) gave a different town —
  4 → 3 districts, 17 → 29 towers (REC); forests and decorations are "randomly filled … when the map is rendered";
  US×4 asked for reproducible towns, with watabou's `?seed=` URL as the model (75844005).
- NG ED-2, DM-1: one RNG stream — naming draws after the model "could still shift view-side randomness" (REC, RA-9);
  a missed random call once made the creator's step images diverge from the final map (41103311); no ids at all.
- VG R7, E2, E4: seed 3131 went from 29 to 24 buildings and 196 to 162 population between two builds four days apart,
  permalinks carry no version (REC); only trees have their own stream; house numbers are creation order.
- The owner's assignment hook (ids that survive regeneration and edits) and evolution hook (epoch N+1 from epoch N's
  persisted state, the inputs and the seed's epoch sub-stream; nothing that survives is re-rolled).

**Design idea.** The town is a pure function of (generator version, seed, parameter vector, assignments, edit log).
Every entity has a stable hierarchical id (settlement → district → block → lot → building → room; ways, walls, gates,
towers, water bodies likewise) minted from its parent's id and a stage counter, never from a list position. Every random
draw comes from a sub-stream keyed by (seed, stage, entity id, concern), derived by hashing, so a stage or entity can be
re-derived alone and naming, style jitter, content and geometry never share a stream. Render-time decoration (trees,
roof detail, scatter) is seeded by entity id and never stored. Retries within a stage use (seed, stage, attempt) and
are reported. Blueprints carry the version; golden seeds are kept per release, and every legitimate behaviour shift is
recorded with its cause (owner non-negotiable 10). Epoch sub-streams (seed, epoch) are reserved now.

**Acceptance criterion.** (a) B-CITY replayed on two machines and two browsers: model hash identical for 100 % of
seeds; two renders of one model pixel-identical. (b) Perturbation tests on B-CITY samples: changing the name grammar
changes 0 geometry or style values; adding a decoration layer changes 0 entities of other layers; rerolling one block
changes nothing outside it. (c) Locality index on B-EDIT: after a single-parameter edit (one more gate, coast side
west), the share of entities that do not depend on it and stay byte-identical ≥ 95 % (MFCG baseline: a `gates` change
re-rolls everything down to the name). (d) Id stability: 100 % of ids outside an edited region survive B-EDIT
sequences. (e) A golden-seed suite: stages untouched by a release stay byte-identical (VG baseline: unversioned drift).

**Restraint clause.** Determinism must not freeze the generator — pin versions rather than forbid improvement. Keep
MFCG's replayable attempts (every retry printable and reproducible, EG-3), NG's full determinism from its inputs
(byte-identical renders across page loads, RA-0), VG's independent tree stream (Shift+T). A seed is not a save: FTG's
durable, shareable, synced town stays (O9, O11).

**Dependencies.** Needs nothing; it is the first thing to build. Enables O9, O10 (assignment ids), O11, O7 (lazy
derivation of people from building ids), O12 (seeded decoration), and the EVO hook.

---

### O9 · Persistent document: save/load/import, provenance and locks, faithful scoped regeneration, undo [BASE; ASSIGN, EVO hooks] — score 8.3

**Answers.**
- MFCG EDT-1, EDT-2, EDT-3: "No manual changes made to a map are encoded into its URL (apart from the city name) …
  currently there is no way to save those changes" (CR, 102377277, verified); exported JSON "can't be imported back"
  (62336213); save/load waits "before the architecture is stable (currently it is not)" (32650629); points of interest
  are lost on regeneration; local churches used to "disappear after rerolling a ward"; warping "can't change the
  topology"; US×9 (B2) and US×12 (B6) — the two largest MFCG tallies after export; the documented workaround is
  exporting SVG twice and editing in Inkscape.
- FTG EDT-1, EDT-2, EDT-3: re-roll district "will delete any existing buildings + decoration"; bulk regenerate "cannot
  be undone"; the generator "doesn't know which ones you are happy to have edited" (guide, verified); a user will not
  re-roll a district because of "custom locations I already baked in" (US Dylan Kennedy, 120828892, verified);
  regenerated areas come out denser than the original with the same settings (US Deahal, 157283634); new features
  never reach existing towns ("no way to automatically regenerate settlements with these features", 151265004);
  accidental deletions were restored from the creator's backups.
- NG ED-1, ED-3: "there is no incremental update path"; the whole model and view rebuild on every Enter; state =
  (seed, tags); users reroll until right and export elsewhere, or assemble a city from slices by hand (H9 W1–W2).
- VG E1, E2, E3, D3: state is the seed; only the name, population text and house marks are editable; "hide" stands in
  for "not generated"; a user asks for "a picking UI and query/edit API" (169696051).
- The owner's evolution hook (every entity carries a lifecycle history; the pipeline runs incrementally) and assignment
  hook (an assignment input that takes precedence).

**Design idea.** The saved unit is a document: blueprint (O2) + ordered edit log of events on stable ids + lifecycle
state per entity (generated / edited / pinned / assigned / built / altered / converted / demolished). Regeneration is a
scoped transaction that re-derives only unlocked entities with the same pipeline, parameters and sub-seeds as the
original stage, so a regenerated region is statistically indistinguishable from a generated one; locked and edited
entities are never mutated; people are reconciled (households move, jobs re-match) rather than deleted. Full undo/redo.
Our own export imports back (O11). An opt-in upgrade replays the recipe under a new version, re-applies the edit log and
shows a diff before committing (FTG EDT-2). "Regenerate (keep settings)", "adjust" and "new random" are separate
actions.

**Acceptance criterion.** (a) save → load → save byte-identical on 100 % of B-CITY samples, including after B-EDIT
sequences; import of our own export reproduces the model hash. (b) Locked-entity preservation on B-EDIT = 100 %;
entities touched outside the declared scope = 0. (c) Faithful regeneration: two-sample KS tests of building density,
frontage width and footprint area, regenerated area vs original generation, p > 0.05 on ≥ 95 % of B-EDIT regenerations
(FTG baseline: "too snug"). (d) Undo coverage: every operation in the API is undoable (enumeration test). (e) Upgrade
test: a corpus of edited towns replayed under a new version keeps 100 % of edited entities and reports the diff.
(f) The 12 recorded MFCG edit asks (B6: add/delete district, add/remove roads, move/remove labels, set district
colours, add/delete vertices, place castle, size castle grounds, farms in chosen areas, draw walls/bridges, drag points
in the sea) are each expressible as an event with a locality guarantee — 12/12.

**Restraint clause.** Keep the one-line permalink for unedited seeds (all three watabou generators) and the one-click
whole-town reroll. Do not make regeneration timid: the scope is the user's choice, and FTG's "broad strokes or super
specific whenever I want" (US Deahal, 157283634, verified) is the most praised property in its threads. Never change
a user's town silently (FTG's rule); upgrades are explicit and reversible. Keep the cheap "hide layer X" toggles beside
"regenerate without X" (VG E3).

**Dependencies.** Needs O2 (ids, sub-seeds), O11 (schema), O3 (transactions that preserve planarity). Enables O10
(pins, assignment precedence), the EVO hook, O16 (undo in the UI).

---

### O11 · Complete entity model, one versioned schema, entity registry, round-trip and per-layer exports, embeddable API [BASE; LAYER hook; S2 readiness] — score 8.3

**Answers.**
- MFCG DAT-1, DAT-2, UX-2: GeoJSON abandoned — "My discontent with GeoJSON is just too strong to keep struggling" (CR,
  37407181, verified); the export "just resembles GeoJSON without being compatible with anything", QGIS cannot read
  it, a third party maintains a converter; schema drift broke City Viewer; OBJ merges everything into one mesh; height
  maps not exported; the largest single tally in the MFCG threads (US×15, B8: standards, CityJSON, QGIS, STL, UE4,
  transparent PNG, per-layer masks, an open format exposing cells and neighbours); inland roads cannot align with an
  overworld ("For inland settlements it doesn't work", 79147510).
- FTG DAT-1, DAT-2, DAT-3, PERF-3: districts missing from GeoJSON since 2025-01, still absent in the 2026-09 guide
  (F26); building JSON export ≠ edit-request format, "I don't really want to maintain that as an API" (120828892);
  "Currently there are no plans for a direct API" (CR, 75844005, verified); the wall exists only as tower points, only
  53 % of buildings lie in any serialised lot and 49 % / 36 % in no district ring (REC); appearance options stored by
  index so renaming 'brown' to 'red' recolours edited people; dangling references broke the simulation; VTT use is an
  iframe — tokens "flat out impossible" (US passivedragon, 120828892, verified), rewriting the renderer for Foundry
  "would double all future front-end work" (CR, verified).
- NG DM-1, DM-3, DM-4, UX-3: integration "via GET method requests"; the Procgen Mansion handoff "approximates irregular
  polygons with squares"; the family shares code by manual transplant so a district looks different in each product
  ("it really bother me", CR, 70917627, verified); a power user's wishlist — per-building objects so a mansion drops into
  a neighbourhood, neighbourhoods into cities, cities into the realm (103335095).
- VG R8, D1, D3, D4, D5, U2: the palisade shipped without JSON export or City Viewer support — "a whole chunk of
  functionality missing" (CR, devlog 740285); the exporter reported the wrong version; the palisade is "just another
  list of polylines"; height maps not exported; GM/player exports need an export → hide → export workaround;
  "Developing one giant … application is significantly more difficult for me than several smaller ones" (382428).
- The owner's roadmap: an embeddable library API with a clean boundary; per-layer export (separate VTT levels).

**Design idea.** One canonical, versioned, documented schema is the model: settlement → district/neighbourhood → block
→ lot → building → room; ways (named, classed streets), walls, gates, towers, water bodies, terrain, land-use areas,
people and households; every entity with a stable id (O2), a class, metres (O6), a layer (underground / ground / sky),
z-order, lifecycle state and provenance; references by id with integrity constraints and cascading migrations;
containment explicit and complete (every building in exactly one lot, every lot in one block and one district, suburbs
included). An entity-type registry: every type declares its generator stage, renderer, export mapping, persistence
encoding and picking behaviour, and CI fails when a type is missing from any path (the VG palisade "ghost" cannot
recur). Exports are views of the schema: GeoJSON profile in metres with a local CRS (districts included), layered
semantic SVG (one group per layer and class, ids preserved), PNG/tiles, an optional 3-D export (CityJSON-style or
glTF), a compact binary of the same schema, per-layer files (VTT levels) and VTT-native scene data (walls, doors,
lights, regions, journal links) at a declared grid scale. Import of our own export. An embeddable, headless library API
(seed + params + assignments → town; edit transactions; queries) with an optional persistence/sync service on top.

**Acceptance criterion.** (a) Registry round-trip test: 100 % of entity types survive save/load, JSON, GeoJSON, SVG,
PNG and permalink (VG baseline: palisade missing from two paths). (b) Containment completeness on B-CITY: 100 % of
buildings in a lot, lots in a block, blocks in a district (FTG baseline 53 % / 51–64 %). (c) export → import → export
byte-identical on 100 % of B-CITY. (d) The GeoJSON validates against RFC 7946 and opens in a GIS with districts as
features (test with an open validator plus a scripted GIS load). (e) 0 dangling references after every B-EDIT batch
operation; renaming a dictionary entry never changes another entity's meaning (test). (f) The headless API reproduces
the UI's model hash for 100 % of B-CITY; runs offline. (g) VTT export: grid alignment error 0 px per cell at the
declared scale; import needs no manual steps. (h) Layered SVG: every layer and class separable (group count test).

**Restraint clause.** "Ideally there would be two different formats … that would be too much code to maintain" (CR,
37407181): one canonical schema with thin, generated adapters, not N native exporters. Keep FTG's compact binary
economy (593 KB for 2 798 buildings, 4 125 trees and the whole population; integer centimetres; zig-zag sint32) as one
encoding of the schema. Keep FTG's live link (calendar sync, "mark as current location", journals) as an optional
service; keep the one-click PNG for users who want a picture. Keep small focused front-ends over the library.

**Dependencies.** Needs O2, O6. Enables O9, S1 (the seam contract is a schema contract), O12 (one display list is a
view of the schema), O13 (ways carry names), the LAYER hook, and the corpus phase.

---

### O5 · Frontage-first typed plots in metres, every lot with an access edge, no silent discard [BASE; S3 hook input] — score 6.7

**Answers.**
- MFCG GEO-2: triangular buildings were "the single most-discussed defect of the first year", "I can't eliminate them
  completely", "a rather silly algorithm" (devlogs 1367, 1579); "a lot of triangles (or 'triangle looking
  quadrangles')" (41711473); the creator wants "side walls being perpendicular to the street" (28088976); bent cuts
  "spawn very weird ones which need to be filtered out" (58808794); frontage is "an emergent side effect" in the 2017
  kernel (`os-wards-render.md` §13.9).
- FTG GEO-1, ROB-1: the lot-to-building splitter was rewritten twice in a year (longest-edge → centroid rule, 2025-07;
  projection-with-bend → shrink-then-split, 2026-07) and still ships hourglass footprints, "too many thin / sliver
  buildings", cross-lot coupling ("splits on one end affect the other side of the lot"), 40 pairs of houses on identical
  footprints (2.8 %), 3.9 % / 10.0 % doorless buildings (REC census); only 6.4 % of buildings share a vertex — no party
  walls; 22.9 % of block lots empty, 38 % lot coverage.
- NG RB-1, RB-3, GQ-4, DM-2: lots are made by partition-then-reject — ≈ 42 % of lot leaves silently discarded
  (1 333 leaves → 779 buildings), "the perimeter-block look is a filter, not a construction" (`_critic-vg-ng.md` V18);
  sliver drops 0–42 per map; only 42–63 % of footprints are 4-gons, 53–66 % of corners are right angles (REC vertex
  captures); discarded lots are neither drawn nor exported, so nothing can be assigned to them.
- VG G1: "the old buildings fail to form a streetwall" (CR on his own VG method, 141198168, verified); no lots, no
  frontage, rejection-sampled free rectangles at 63–82 % acceptance (REC).
- Stage 3 needs lots with access edges and a context vector as first-class inputs (owner).

**Design idea.** Plots are constructed from the frontage, not filtered from a bisection. For each block face, derive
the street frontages by road class (O4); lay plots as strips perpendicular to the frontage with target frontage-width
and depth distributions per district class in metres (data tables, calibratable); solve corner plots and reflex
vertices explicitly; leave rear yards, back lanes and shared courtyards as typed residue (courtyard / garden / yard /
green / vacant), so 100 % of a block's area is a typed entity; emit party walls as shared edges in dense classes and
detached plots as a class in semi-rural ones; keep a bounded, explicit wedge class at acute forks. Every plot carries
its frontage edge, access edge, depth, party-wall flags and the per-lot context vector (O7) — the stage-3 input.
Bent-cut subdivision (O4's infill) remains the way blocks are formed; plots inside blocks come from the frontage.

**Acceptance criterion.** On B-CITY: (a) share of plots with a street access edge = 100 % except declared backland
(MFCG/NG: undefined; FTG: 47 % of buildings in no serialised lot); (b) plots or buildings narrower than 3 m = 0;
minimum interior angle < 30° confined to the declared wedge class, and wedge share < 0.5 % of plots; (c) side-wall
angle to the frontage normal within ± 5° for ≥ 90 % of plots on straight frontage (NG baseline: 53–66 % right-angled
corners); (d) typed-area coverage of every block = 100 % and discard ratio ≤ 0.05 (NG baseline ≈ 0.42); (e) KS
distance of frontage-width and depth distributions to the class targets reported per district class; party-wall share
in dense classes within its target band; (f) self-intersecting or duplicate footprints = 0, buildings without an
entrance on the access edge = 0 (FTG baseline 3 hourglass, 40 duplicate pairs, 10 % doorless); (g) streetwall gap at
bends in urban classes ≤ 1 m (VG/NG baseline: gaps at every bend).

**Restraint clause.** Over-regular plots read as a modern subdivision: keep MFCG's `Offset` uneven facades and per-roof
weathering, NG's uneven streetwall ("I like the result a lot", 58808794) as a front-line jitter parameter, hollow
courtyards and partly built frontages as parameterised outcomes, FTG's sheared minority of quads (p95 corner deviation
22.9° reads as organic) and its dense → gaps → suburb gradient, VG's detached cottages with grass between them as a
semi-rural class. Keep NG's measured bent-cut signature for the block fabric (K1/K2, §4).

**Dependencies.** Needs O6 (metres), O3 (robust cuts), O4 (frontages by road class). Enables O7 (assignment of
functions to lots), the S3 interface, O13 (addresses).

---

### O1 · Terrain and hydrology first: heightfield, drainage, rivers by descent, water types; no whole-map restarts [BASE; LAYER hook] — score 6.25

**Answers.**
- MFCG ROB-1, GEO-4, GEO-5: 24 whole-city restarts in 58 recorded attempts, 8 of 34 cities needing ≥ 1 restart (21
  canal failures + 3 bad-poly restarts), 712 river-course rejections; size 80 + river + coast took 10 attempts for 3
  cities and 3.7–4.0 s (REC); water "always a rough parabola", "still no islands or landlocked lakes" (29813424,
  29538966); "People have been asking for river confluences and islands for a long time" (98918904); "so I can't make a
  moat of it" (devlog 11802); elevation declined because "such features are rarely present on city maps anyway"
  (41711473); `deltaRiver` is a widened mouth, not a delta (`_critic.md` C15); US×6 water (B7), US×4 terrain (B12).
- FTG GEO-3, GEO-5, ROB-3: a height map was prototyped and shelved — "not entirely sure how to display it on the 2-D
  map" (120828892); "Mountains aren't properly supported yet" (CR, 147332188, verified) — terrain is the most-repeated
  FTG user request (US×7, plus US×2 underground); rivers "may end up bending back around into the ocean" with advice as
  the only remedy (guide, verified); ocean-vs-river typing by border touch, lakes lumped with rivers (153121107); coasts
  grow "in two arms"; water outlines resampled at a uniform 50 m.
- NG GQ-6: no terrain, water, walls or context; the creator's own reason for abandoning composition ("rivers, city
  walls", 100431269) and for moving to a base mesh in Urban Places.
- VG G3, G4, G5, G12, P2, R4, R5: "all these villages seem aloof from the water" (US Allen Varney, 36199609, verified);
  "the water and the 'potential village area' are created independently" (CR, verified); rivers are decorative curves
  with no flow direction, bed slope or outfall; roads "appear to kind of ignore the terrain" and cliffs stayed
  unimplemented 2023–2026; fields on one bank only; piers never solved; the terrain grid is 128² at every map size;
  water extraction is the model's hot spot (`createDeflection` 17–87 ms, O(cells × segments) river carving).
- The owner's sewer hook needs drainage (flow direction, outfalls) queryable from the heightfield; the floating-island
  hook needs organic oval outlines from the same coast machinery.

**Design idea.** Generation starts from a site model: a heightfield in metres at a resolution set in metres (not a
fixed grid), with authored site features (hill, spur, valley, terrace, cliff, ravine) and sea level; hydrology derived
from it (flow direction, accumulation, outfalls) so rivers descend monotonically to a sea, lake or edge and cannot bend
back uphill; explicit water types (sea, lake, river, tributary, pond, moat, estuary) by construction, not by border
touch; river networks with confluences, distributaries, islands and widths that grow downstream; coasts, islands and
lake shores from one closed-outline routine (which also produces the sky-island outlines). The settlement is sited
against the site model (bridging points, fords, landings, harbour depth), and every later stage reads it as a
constraint (slope-costed streets, walls on crests and banks, castle sites scored by height and water). Land is a
multi-component polygon set from day one. Water extraction is linear-time (distance transforms, marching squares,
a segment index). Relief rendering is optional, off by default (hillshade/contour tiers in O12). Drainage remains
queryable per cell for the sewer add-on.

**Acceptance criterion.** (a) B-CITY: whole-map restarts = 0 and requested-feature presence = 100 % (MFCG baseline 24
restarts in 58 attempts; VG baseline 4 of 13 highway maps). (b) Rivers with a non-monotonic bed = 0; every river has an
outfall; width never decreases downstream; contours cross water 0 times; every terrain cell has a defined flow path to
an outfall (100 %). (c) Configuration catalogue achievable on request — coast, estuary, confluence, river island, lake
shore, delta, moat, island city, hill town, cliff/ravine site — 10/10, each verified by a scripted request on 100 seeds.
(d) building ∩ water area = 0 m² on 100 % of B-CITY (MFCG: "buildings overlap the river", 40345972). (e) The water
stage is O(cells): ≤ 5 ms at a 128² equivalent and linear in cell count (VG baseline 17–87 ms for one 128² village).
(f) Site types produce statistically distinct morphometrics (a classifier over the O6 statistics separates
hill/valley/coast/river sites with ≥ 90 % accuracy). (g) Eligible land components adjacent to the settlement left
unused = 0 (VG R4 baseline: fields on one bank only).

**Restraint clause.** Keep the tuned coincidence that the river runs through the town (MFCG 0.6.0 made it "more likely
to run through the city", devlog 67134): terrain realism must not push water out of the centre. Keep the minimalist
flat water read as the default style ("no beach, no ripple" is legible); relief shading stays off by default — "such
features are rarely present on city maps anyway" is right about rendering, wrong about the model. Keep VG's cheap
"course first, carve the terrain" trick and "relief follows rivers" (89314043); no meander or erosion simulation
("apophenia works better than detailed simulation", 41103311). Keep FTG's coast craft — per-segment beach/rock/cliff
classes, the "ease into detail" envelope near the centre, depth and foam, rivers bridged and oceans terminal as a hard
rule, desert fields hugging rivers. Keep a few piers as charm; not every shore is a port.

**Dependencies.** Needs O6, O2. Enables O4 (cost surface, destinations), O8 (trace), O7 (water-dependent uses), O14
(land components, woodland), the LAYER hook (drainage; island outlines), and O3's "no restarts" target.

---

### O4 · Destination-driven hierarchical street network (FTG-class staged growth) fused with organic infill (MFCG/NG-class) [BASE; EVO hook] — score 6.25

**Answers.**
- MFCG GEO-1, VAR-2, REN-2, DAT-2: "districts are the cells of this mesh, roads and rivers run along its edges" (22794);
  MFCG maps are "barely more than stylized Voronoi diagrams" (817711); "an illusion of streets following some kind of
  underlying landscape. There is no underlying landscape" (87882877); straight segments are "one of the things
  distinguishing generated maps from real ones most prominently" (28088976); curved streets shelved as "too risky";
  the road-first prototype rejected — "Merging these two techniques also seems problematic" (devlog 31287, verified);
  2017 roads aim at a phantom point 1 000 units out, streets are breadth-first paths with pure length cost, tie-breaks
  by hash-map order; intramural streets are unstroked gaps with no geometry of their own; US×3 planned X-crossings and
  road-first realism (49191011, 31287); inland roads cannot align with an overworld.
- FTG GEO-2: "most of the settlements in FTG look similar" — each starts at a 4-way crossroad that "blooms outward in
  a vaguely circular shape" (112861635); a hard 15° per-vertex turn cap (zero mass at 15–16°) and a flat heading
  spectrum (REC); sub-metre edges (shortest 0.05 m); no destinations, no terrain, no global goal function; three road
  algorithms coded and discarded, "no obvious best way"; 62 % degree-2 nodes — a road is an emergent run of edges, not
  an entity.
- NG GQ-1, GQ-2: a tree of T-junctions — "every junction lies on an earlier-drawn road: 361/361" (REC); ring radials
  staggered across bands; width = a + b·length, so a ring road can be narrower than an ordinary street; US×1 X-crossings.
- VG R1, G5, G6, G11: the whole map discarded when the single highway self-intersects or dies in water; crossroads
  "more difficult than I expected", then shipped with loops and cut-offs (116745476); roads "unreasonably curvy" even on
  flat land; `Elevation.g` called 1–5 times against 130–372 tracker steps (REC); roads end at the frame.
- The owner's tiebreaker (explicit constraints, precise geometry, measurable statistics) and evolution hook (a growth
  backbone extends naturally; a one-shot partition must show how).

**Design idea.** Two tiers. Tier 1, the backbone: arterials routed between real destinations — gates, bridges and fords
(from O1), the market, the harbour, and external destinations with bearings (an API input, O11) — over a cost surface
(slope by road class, water crossings, existing fabric, walls, land value), grown in stages as FTG does (each stage a
growth epoch with its own density regime), so the same machinery extends a town later (EVO). Tier 2, the infill: the
faces between backbone streets are subdivided by MFCG/NG-class bent-cut recursion into blocks, preserving the measured
NG signature (one bend near mid-course, right-angled arrival, OBB-chosen axis — §4 K1/K2) and its T-junction fabric;
a cut may continue across an existing street when collinear within a tolerance, which yields rare crossroads. Streets
are entities (ways) with class (through-road, primary, secondary, lane, alley, cul-de-sac), centreline, metric width by
class with jitter, surface, and curvature continuity instead of a per-vertex clamp; junction rules (minimum crossing
angle, merge junctions closer than a spacing threshold, T-preference in organic districts). The negative-space street
look remains a style (O12), because the geometry now exists underneath it.

**Acceptance criterion.** On B-CITY, with the O6 statistics record: (a) 100 % of through-roads end at a named
destination (gate, bridge, harbour, external bearing); given external bearings, 100 % leave within ± 10° of the
requested bearing (MFCG baseline: roads point at nothing and inland orientation is arbitrary). (b) Arterial detour
index (network ÷ straight distance, gate ↔ centre) ≤ 1.4 median; junction-angle p5 ≥ 30° (FTG "sharp points", NG
0–60° roof corners); turn-angle distribution has no cliff (FTG baseline: zero mass at 15–16°); 4-way share > 0 and
< 15 % in organic districts (NG baseline ≈ 0). (c) Width by role: Spearman(width, betweenness) > Spearman(width,
length) and 0 cases of a higher class narrower than a lower one (NG baseline: width = a + b·L). (d) Arterial slope
p95 ≤ the class limit once terrain exists; 0 % of arterial length above its grade limit (VG baseline: roads ignore
terrain). (e) Road edges shorter than the weld tolerance = 0 (FTG baseline 14 / 9 edges < 1 m). (f) The fusion risk
gate: model time for the network + infill stage ≤ 100 ms at the city size class on reference hardware (MFCG baseline:
whole model 125–260 ms at size 80; NG 10–96 ms per hood), and block-area and junction-degree distributions of the
infill within the NG-measured bands on the same district shapes (B-REF, NG vertex captures). (g) Requested N-way
external connections produce exactly N, with 0 loops or cut-offs (VG G6 baseline).

**Restraint clause.** The irregular T-junction fabric is historically authentic and is most of MFCG's and NG's charm:
crossroads stay rare and tied to the hierarchy, never a grid ("on average, places without this tag look better", the
creator on his `RIGID` tag, 139540343). Keep FTG's locally orthogonal junctions, real-metre segment lengths, legible
main/normal/suburb hierarchy and staged growth. Keep VG's organic tracker curves and the deliberately partial driveways
("like modern suburbia" if all connected, 104226049). Keep the sub-second model (34104): the creator measured road-first
growth as slower — criterion (f) is the guard. Keep the single-road village as a common case.

**Dependencies.** Needs O1 (cost surface, crossings), O3 (planar graph kernel), O6. Enables O5 (frontages), O8 (gates
where arterials cross), O13 (street names), O7 (siting by access), the EVO hook (growth stages).

---

### O7 · Content-first land use: roster, rule-based siting on a per-lot context vector, plan–fit–reconcile, population as input [BASE; S3, ASSIGN hooks] — score 6.25

**Answers.**
- MFCG SIM-1, GEO-7, PERF-2: population ≈ 6.12 × buildings, no household, trade or wealth model; ward names "a hint,
  not … a literal explanation" (46967); landmarks "not generated", a user list is "distributed across a city randomly"
  (38048182); 2017 zoning ≈ "14 constrained placements against a random background"; seams — "on one side of a street
  buildings are tiny and on the opposite side buildings are huge" (devlog 34104, verified), fixed by a `Continuous`
  option later removed; US×9 (B5): demographics, shop inventories, socio-economic classes, enough farms, numbered
  buildings; numbering rejected on performance ("hundreds" of houses, devlog 11802).
- FTG SIM-1, SIM-2, GEO-6, PERF-1: "generates the details before the layout … I don't see this ever changing" (CR,
  127128581, verified) — factions cannot shape the map, a layout preview before population was refused; resources "don't
  affect generation"; district type from "the remaining unplaced buildings, and what the lot is next to"; "more tanners
  than I would want", "20 adventurers in a small village of 100" (US×4); the allocation loop "prioritises minimising the
  unemployment" over configured ratios; everyone is instantiated up front — size capped at 50 000, files and loads grow
  with every person (PERF-1) although person details are already lazily derived.
- NG SC-1, VC-4, GQ-7: "They look better, but they don't provide more information per square unit" (CR, 59046807);
  landmarks placed by mutual distance only, "look like temples more than I'd like"; squares are shapes, not places;
  US×5 "what is where"; users keep shop spreadsheets and match them to the map by hand.
- VG V1, C1, C2, G10: population is an output ("you still can't request a village with a specific number of
  villagers", 56941736), early builds produced zero-population villages; POIs console-only since 1.2.2; a manor or
  fiefdom asked for (US×4); open space is one distorted circle — "I didn't actually know how village squares were
  supposed to look" (80494491).
- The owner's stage-3 hook (a per-lot context vector that class rules read; class rules as data tables) and assignment
  hook (an assignment input with precedence and drift bounds; a placement solver).

**Design idea.** Adopt FTG's guarantee — every building has a purpose, occupants and workers — and make the handoff
two-way. The economy proposes demand by class from data tables (per-capita ranges, hard min/max, size gates, dependency
ratios, resource availability — our own tables, FTG's ideas not its values); the layout proposes capacity as lots with a
**context vector** (lot area and shape, frontage length and road class, district type and venue mix, wealth/status
gradient, distances to centre, plaza, market, gate, wall and water, upstream/downstream position, slope, roster
assignment if any); an assignment solver matches buildings to lots under explicit siting rules held as data
(noxious trades downstream and extramural, mills on water, markets at crossroads or gates, wealth near the centre or on
high ground, religious precincts, faction turf), and feeds back (more housing where land allows, fewer mills without
water) in a bounded plan–fit–reconcile loop; population, area or building count is an input honoured within tolerance
and realised numbers are reported; open spaces are typed (market, green, churchyard, forecourt, crossroads square) and
sized from the population they serve; landmarks are placed by rule and are complexes, not stamps; a gazetteer indexes
every building without drawing it. Households and people are derived lazily and deterministically from the building's
id sub-seed (O2) and pinned once seen or edited; only aggregates, pinned people and edits are stored. Both entry points
exist: content-first (FTG's default) and layout-first (pick one of N seeded previews, then populate to fit). Layout
parameters are smooth fields that jump only at real boundaries (wall, river, main street) — the seam rule stage 2
inherits.

**Acceptance criterion.** On B-CITY: (a) every building has a function and an occupancy (100 %); every person a home
and a work or role (100 %); requested population honoured within ± 5 % on ≥ 95 % of seeds (VG baseline: output only;
MFCG: a multiplier). (b) Rule satisfaction rates per rule ≥ 95 % (e.g. share of noxious trades downstream or
extramural; water-dependent trades within X m of water; market on a tier-1 junction or gate), reported per city.
(c) Wealth spatial autocorrelation (Moran's I) > 0 and monotone in the requested gradient; faction-turf compactness
reported. (d) Constraint violations in the allocation = 0; per-capita ratio error vs table targets reported; no
occupation above its per-capita maximum (FTG baseline: 20 adventurers per 100 people). (e) Reconciliation converges in
≤ k iterations (bounded, k declared) on 100 % of seeds. (f) Parameter discontinuity across shared street edges (Δ
median footprint, Δ plot depth) below threshold except on declared boundaries (MFCG 34104 seam baseline). (g) Lazy
derivation stability: the same person on every view, 100 % across sessions and machines; stored bytes per 10 k
population reported (FTG baseline ≈ 600 KB per 9.5 k people with everything materialised). (h) Gazetteer completeness
100 %; a building can be addressed without being drawn.

**Restraint clause.** The map must stay a clean plan: content lives in data, hover, gazetteer and export, not as
clutter ("maps that look better but don't provide more information per square unit" cuts both ways). Keep MFCG's
mixed-use wards as venue mixes and hints — "a craftsmen ward doesn't consist entirely of workshops" (devlog 1579) — never
modern single-use zoning; rules stay probabilistic enough to surprise. Keep FTG's legible ratio rules ("1 farm per
25 people"), lifestyle-banded pools with rare outliers, sub-locations with purposes (the simulation needs rooms), and
its "consistent answer — if I see it, I can go there" (US Kitt Schlatter, 79527117). Keep watabou's deliberate refusal
of forced social assumptions: content is optional and data-driven, and one click never requires a questionnaire.
Keep random size as a default; honour tolerance bands, not exact counts.

**Dependencies.** Needs O5 (lots with context), O1 (water, slope), O4 (access classes), O2 (lazy derivation), O6.
Enables O13 (names from uses), O10 (assignment precedence), the S3 hook (context vector, class rules as data), the
optional simulation module (§5).

---

### O12 · One semantic display list, level of detail, continuous zoom, retained rendering, style as data [BASE; LAYER, S2, S3 hooks] — score 6.25

**Answers.**
- MFCG REN-1, REN-2, REN-3, PERF-1, PERF-2: "Currently there is no way to zoom in/out. I know it's a big flaw, but there
  are technical reasons for it" (CR, 27564017, verified) and five more statements; District View is "drawn exactly in
  the same way … no cupolas, shadows, cobbled roads", "often looks disjointed" (101942512); a fixed 1500 × 1100 canvas
  at 1× DPR; outline width in screen pixels while features scale, so at size 80 outlines swamp streets and buildings
  "read as texture"; one Canvas2D replay costs 170–230 ms at size 80 (as much as generating), the whole display tree is
  rebuilt on every regeneration, tree scatter reaches 1.37 M point tests; screen and SVG are two code paths ("all the
  'drawing' needs to be implemented two times", devlog 85275); silent option couplings (Block mode drops trees; the
  shipped default says Brightness, the app runs Spectrum); 8 MP bitmap ceiling; US×7 zoom (B1), US×7 style regressions.
- FTG PERF-2, REN-1, REN-2, REN-3: 3-D roofs recomputed "every render, it is not stored"; straight-skeleton roofs tiered
  off on weaker devices; > 50 k trees "drastically drop" the frame rate; "animating things are impossible"; market
  stalls and shanty tents share one glyph; fenced yards read as broken buildings; no print/ink style — alternative looks
  are post-process filters; SVG loses trees and textures; round-robin sprites, identical piers, template temples.
- NG SP-1, SP-2, RS-1, RS-3, RS-4, UX-2: rasterising (73–111 ms) costs more than generating; hatch triangles are
  55–80 % of draw ops; up to 528 GPU uploads per map (one canvas per tree); "real zoom is still impossible"; the mouse
  wheel rotates; palette keys parsed 15–20 k times per generation; `Details` doubles as a speed lever; a 20 000-building
  city at NG rates ≈ 1.7 s per full redraw (PLAUSIBLE arithmetic in NG SP-1).
- VG S1, S2, S3, S4, P1, P4, V4: geometry in screen pixels on a fixed 1100² square; no zoom; non-square maps "took much
  time … Too much time"; rotation removed to make them possible; trees "VERY slow" for years and sized for speed
  (546–751 crowns, each its own gradient); 250 k–515 k `lineTo` per map, 85 % of calls are engine plumbing; a 2.45 s
  cold load; the spotlight fights empty space instead of content; random styles "surprisingly hard".
- The owner's stage-3 rule (footprints identical at every zoom; LOD outline → wings/roofs → rooms), the layer hook
  (z-order, elevation, per-layer toggles and shadows) and stage 2 (a district at neighbourhood LOD inside its city).

**Design idea.** One semantic display list generated from the model (O11) and rendered by every back end (screen, PNG,
SVG, tiles, print). Semantic level of detail — city (blocks, landmarks, walls, water) → district (lots, roofs) →
neighbourhood (NG-class detail: hatching, cobbles, chimneys, trees, stage 2) → building (wings, roofs, rooms, stage 3)
— with style rules in paper units per zoom band, minimum symbol and label sizes, and detail budgets by zoom and
hardware. Geometry never changes with zoom; only what is drawn does. Retained scene with a spatial index, per-district
tiles or caches (MFCG's per-ward cache: 46 000 fills → 590 uploads), batched and instanced hatching and vegetation,
derived geometry (roofs, scatter) computed once per entity and cached by id (deterministic, so discardable), flat typed
arrays, no unused subsystems at start-up. Style is data over a symbol registry: every semantic class maps to one
distinguishable glyph and the legend is generated from it; complete style schemas (every role, every option) with
automated option-interaction tests; presets including a monochrome print/ink style (casing, hairlines, hatching — the
watabou idiom), the lit colour style (the FTG idiom), parchment; per-layer styles (underground / ground / sky) with
z-order and shadows; harmony and contrast constraints for random styles. Heights and storeys are model properties, so
shadows and 3-D agree.

**Acceptance criterion.** (a) B-ZOOM: continuous zoom without regeneration; footprint geometry hash identical at every
LOD; minimum drawn feature ≥ 2 px and labels above the legibility floor at every level; no feature pops more than once
across the sweep. (b) Pan and zoom at ≥ 60 fps with 40 000 buildings and 200 k trees on reference hardware, and ≥ 30
fps on a reference low-end laptop; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; draw calls
per 1 000 buildings and GPU uploads per frame within declared budgets (NG baseline 528 uploads per hood; MFCG 170–230
ms per frame at size 80). (c) Screen vs PNG vs SVG pixel difference below threshold across the full option matrix; 0
options that silently disable another (matrix test; MFCG baseline: Block mode drops trees). (d) Glyph → class
ambiguity = 0 over the registry; legend coverage of visible classes 100 %; every visible feature hit-testable (FTG
baseline: stalls = tents, unclickable yards). (e) Export at any resolution by tiling; 300 dpi A2 print without
artefacts (VG/MFCG baseline: 8 MP ceiling). (f) 100 % of random styles meet a minimum luminance contrast between
ground, road, building and water classes. (g) Time to first map < 1 s on reference hardware (VG baseline 2.45 s cold).

**Restraint clause.** "A whole city drawn like this with all these trees and cobblestones would look too visually
noisy" (CR, 58808794, verified): detail appears only as you zoom, and city zoom must pass a legibility check — "busier
is fine; noisier is not". Keep the minimal inked look as the default: one ink for outlines, 4–8 colour roles, round
joins and caps, casing + core ribbons, negative-space streets (MFCG); NG's tapered hatch, two-tone roofs, prism shadows,
"fake" gables over correct hips (K4, K5); VG's soft lights, single-pass shadows, selective outlining and one-page
composition; FTG's directional lighting, day/night, seasons, weather and hedgerow signature as one style among several.
Shadows, relief and heavy detail stay optional and off by default; no oblique or 3-D default view ("not very readable",
"10x more polygons", 114858238). Keep FTG's tiered defaults and on-demand rendering for weak devices; make the top tier
cheap, never mandatory.

**Dependencies.** Needs O11 (the display list is a view of the schema), O2 (seeded decoration), O6 (paper units per
zoom). Enables S5 (close-up tier), O13 (label LOD), the LAYER hook, and the stage-3 LOD contract.

### O16 · Workflow feedback: generation report in the UI, previews, regenerate-vs-new, discoverability, honest controls [BASE] — score 6.0

**Answers.**
- MFCG UX-1 (US×12, B10), ROB-2: SVG export hidden under Settlement (sehrgut42, 219273; SophieNicole, 494692); City
  Viewer drag-and-drop "causes too much confusion" (123268); Enter vs Rebuild vs URL confusion (Tubal, 47063541 —
  creator: "very confusing"; Killians, 494692); the display-mode auto-switch "confused me" (Daniel, 61026228); Copy URL
  shipped unable to reach the clipboard; option couplings and style state leaking between sessions through
  localStorage (ST-0, ST-2, ST-11); no undo outside the warp commit; partial failures ship silently — 28 street failures
  in 13 of 34 recorded cities, seed 777002 delivered with 0 outer roads and 0 farms (§2 census, EG-2), "Empty areas
  where they clearly shouldn't be" with a reroll as the only recovery (87882877, 98918904).
- FTG UX-1, UX-2 (US×4 + US×7): a spinner and "no stage/progress trace at all" (`ftg-payload-visual.md` §1); "I have
  made 6 half finished city's" and a request for "an are you sure box" (anonymous, 127128581, verified); a raw server
  error surfaced as `Unexpected token 'N' … is not valid JSON` (Chris Wilson, 106664214, verified); a preview "without
  having to generate an entire world" (Bri Rowland, 144226579) — "a nice to have"; "Generate 3 layouts BEFORE" refused
  (Peter Hawkins); a long-time user could not find the share link (Chris Wilson, 88558259); the creator pointed to the
  wrong place for roof colours; "What's a gender partner?" (149103655); the editor disabled below ≈ 900 px (Deahal,
  151265004); twelve form sections with ten save units.
- NG RB-4, ED-4, UX-2: failures leave two console lines and "nothing reaches the user or the export"; Enter with random
  tags re-rolls the template, so variants of one kind need a Tags-dialog or URL detour (H10.3); the wheel rotates.
- VG U1 (US×3), V2, R1: "How do you use the 'custom' palette" (Quenten Walker, 37407181); "I did not know about styles"
  (Johnn & Jochen, 117634240); "is this a usable software currently? if so, where do I download?" (killjinx, 2026);
  "I can't tell the difference between 'Some' and 'Many' trees" (Allen Varney, 42521165) — the creator: "sometimes its
  result is indistinguishable from 'many'"; "Setting this parameter to 1 and to 0.999 may produce very different
  results!" (169696051); `tags=river` silently came back as `river,isolated` (REC, R6); a failed highway silently
  swaps the user's seed (4 of 27 attempts, H10.1).

**Design idea.** Every generation returns a machine-readable report (stages and timings, attempts, fallback-ladder
uses with cause codes, invariant results, requested-vs-built diff, auto-resolved parameters and tags with their
reasons) — the same object O3 writes — surfaced as a compact, dismissable panel and returned by the API (O11). One
explicit state model (blueprint + edit log + style, O2/O9), nothing hidden in localStorage. Separate, named actions:
"Regenerate (keep settings)", "Adjust" (re-solve with the change, locality guaranteed), "New random", "Same kind, new
seed" and "Surprise me". Layout previews: N seeded thumbnails before committing (the model is sub-second, so a
content-free preview is cheap) and instant local previews for content settings (sample ten people). Drafts and
undo/redo everywhere (O9). Errors phrased as actions. Controls with monotone, continuous, documented semantics and a
one-line description each (VG's shift-click idea); the export menu discoverable and one-click; an
option-interaction test matrix in CI (O12) and a browser matrix; a responsive editor; contextual documentation inline
(FTG's context-aware links).

**Acceptance criterion.** (a) A report is emitted for 100 % of B-CITY generations; every fallback has a cause code;
the requested-vs-built diff is shown whenever non-empty (MFCG baseline: 28 street failures invisible to the user;
NG baseline: two console lines). (b) 100 % of auto-resolved parameters and tags are reported with a reason (VG
baseline: silent). (c) Scripted usability tasks — share a view link, export a layered SVG, change the coast side,
see five variants of one kind, recover from a mistaken regenerate — completed without help by ≥ 90 % of testers,
each in ≤ 1 action where the references need a detour (NG ED-4: Tags dialog or URL; FTG: the home button and a
support request). (d) Hidden option couplings in the matrix = 0 (MFCG baseline: Block mode drops trees; "Hidden"
shown while labels are drawn). (e) Six layout thumbnails in < 1 s at town size on reference hardware. (f) Every
numeric control's output metric is monotone and continuous (no jump > ε anywhere; VG baseline: 1 vs 0.999). (g) The
editor is usable at 768 px. (h) Seed → map identity 100 % (the shown seed is always the seed that produced the map).

**Restraint clause.** The minimal chrome, the context menu and the Shift/Ctrl-click idioms are loved (MFCG;
`mfcg-devlogs-b.md` §4.1); FTG's one-click "Create Settlement" with good defaults ("Every street, building, and
resident — ready in seconds") and NG's one action to a finished map (UX-4: p95 ≤ 0.5 s for a medium hood) are the
front door — previews and drafts must not add steps to it. "Keep the product quiet" (NG RB-4): the report is
available, never intrusive. Tool count is a budget ("too many buttons", Reddit 9ygosn; "too many parameters in this
generator as it is", 61026228, verified). Keep FTG's explanatory user guide, a rarity in this field.

**Dependencies.** Needs O3 (the report's content), O2 (the state model), O9 (undo, drafts). Enables O10 (intent
controls need feedback to be usable) and S6.

---

### O10 · Intent, character and constraint inputs: intent vocabulary, character fields, circumstances, pins, forms catalogue, assignment and placement solver [BASE; ASSIGN hook] — score 5.3

**Answers.**
- MFCG VAR-1 (US×6), VAR-2 (US×4), EDT-3 (US×12), GEO-7: the Buildings tab has "too many of them … I don't see a
  single combination … which would be definitely the best" and "there are too many parameters in this generator as it
  is" (61026228, verified); four options deleted and a user's favourite combinations lost (sb.works, 102377277); the
  harbour aimed and "Large" exceeded by hacking the URL (Silent Observer, 102377277, 106975409); `sea` an undocumented
  angle and no `farms` key (EG-2); Enter forgets the road count (Tubal, 47063541); a chaotic-vs-orderly control asked
  for (Ti Munro, 1367); City Painter lists what MFCG cannot make — any-shape or multi-cluster cities, non-radial roads,
  several walls or castles, islands, confluences (39697187); an island city (Nik Balson), a delta (Steve Mangione),
  planned X-crossings (Heath Rezabek, 49191011, verified); twelve users' edit asks (B6) that are constraints in
  disguise — place the castle, draw walls and bridges, farms in chosen areas, add or delete a district ("No. What would
  be on its place?"); district colours random and not settable (MrKella).
- FTG VAR-1 (US×6), VAR-2, VAR-3, SIM-2: 14–16 fields per stage, some never exposed (`roundedEdges`,
  `createPerimeterSpokes`); opaque knobs (`Number of districts` = Less/Normal/More with no stated effect; "this isn't
  guaranteed"); the form spans 12 sections; coast side reached by re-rolling — "render a bunch of maps till I get one
  on the side I want" (Kole D, 130937474); a castle-centred ringed city "tricky … it might be easier to manually place a
  castle" (CR to Jason DeGonia, 144226579, verified); a layout preview refused (Peter Hawkins); "lay down some initial
  walls and district boundaries" before generation (Kyle, 103668405, verified) — only water can be pre-drawn; "most of
  the settlements in FTG look similar" (112861635) with six presets and no hill, bridge, port or monastic forms; the
  roster's trade-offs (ratios vs unemployment) hidden.
- NG VC-1, VC-2, VC-3, VC-5: "there aren't many tools for this: it can only choose different values for the minimum and
  maximum street widths, the average building and block size" (70917627, verified); "wealthy, clean, large homes spaced
  out more … squalid shacks" (T Mexx, twice, verified); `large` = `medium` (762 vs 736–779 buildings); the planned
  Junction / Park / River bank / Bridge / Port templates never shipped (64375271); green share 23–58 % at identical tags.
- VG V1, V2, V3 (US×6), C2, C3: "you still can't request a village with a specific number of villagers" (56941736,
  verified); "Some" vs "Many"; "dirty up the place … Where are all the cows and horses kept?" (scott2020, 426543); biome,
  season and day/night drop-downs (RKB81Labs, 613514); a ruin slider (Tubal); a manor or fiefdom (Varpilah Chase);
  roundhouse villages (Maezar); economic tags (T Mexx); the creator: "I'm not sure that adding a bazillion of parameters
  to customize is a good idea" (53482923).
- The owner's rulings: the assignment hook (one building, one neighbourhood as one assignment with internal diversity,
  N dispersed buildings via a placement solver; precedence over class rules within drift bounds); "everything is
  editable" (every rule table and preset changeable by a user and by us, with a preference layer above the defaults);
  circumstances as time-varying inputs (EVO); the size ladder TOWN → CITY → METROPOLIS.

**Design idea.** Three input layers above the internal parameter vector, all persisted in the blueprint (O2). (1) An
**intent vocabulary** of outcome targets: form archetype, size as population, area or building count with a tolerance,
water setting and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient direction, era and
region preset, defence level, density — expanded deterministically into the full parameter vector (watabou's own
3 → ≈ 20 expansion, `watabou-extra-b.md` T28); every internal parameter documented with unit, range, effect and
provenance and reachable in an advanced panel. (2) A **character and circumstance layer**: a district character vector
(wealth, density, age, function mix, planned/organic, greenery, fortification) supplied automatically per district by
the base and overridable; circumstances (era, economy, lordship, biome, season, threat, trade) as data presets — the
same inputs the evolution stage varies over time. (3) A **constraint layer**: pins (walls, gates, roads, district
outlines, landmarks, water, reserved areas, specific buildings) and **assignments** (name, function or shape class for
one building, a whole neighbourhood or N dispersed buildings chosen by a placement solver under distance, spread and
context criteria) that take precedence over the class rules within declared drift bounds; the generator solves around
them and reports achieved against requested. Presets and rule tables are versioned data files, editable by the user
(with a preference/override layer above the defaults) and by us. A **forms catalogue** grounded in historical types —
organic, planned grid or bastide, linear street village, radial, hill or acropolis, bridge town, port with
quay-parallel streets, monastic or cathedral close, island city, confluence town — each a set of constraints plus a
growth programme (O4) with measurable morphometrics, composable by growth stage (an organic core with a planned
extension).

**Acceptance criterion.** (a) 100 % of internal parameters reachable through documented controls; scripted intent
tasks — harbour to the north, three gates, a planned grid, no walls, population 20 000, coast to the west, a
castle-centred ring, a valley town with only through-roads, a slum quarter and a patrician street — achievable without
URL editing, re-rolling or hand placement: 10/10 (MFCG and FTG baseline: URL hacking, "render a bunch of maps",
"easier to manually place a castle"). (b) Intent satisfaction: hard targets 100 %, soft targets within tolerance,
achieved-vs-requested reported for every target. (c) Monotonicity: raising a target never lowers its metric on the seed
benchmark (block size, wealth → plot area, density → buildings per ha). (d) Pinned-feature satisfaction 100 %; pins
retained across regeneration 100 %; invariant violations around pins 0 (O3 suite). (e) Assignments honoured ≥ 99 %
within drift bounds; the dispersed-placement solver meets its criteria in 100 % of feasible requests and reports
infeasibility otherwise. (f) Size target error p90 ≤ 10 % across forms (NG baseline: `large` = `medium`); requested
population within ± 5 % on ≥ 95 % of seeds. (g) Forms: a morphometric classifier separates ≥ 8 catalogue forms with
≥ 90 % accuracy while within-form variance stays above a floor. (h) An edited rule table or preset produces a diff,
is versioned and migrates across releases (owner amendment 5); the default path with no edits is byte-identical to the
shipped defaults.

**Restraint clause.** One click with good defaults stays the front door (FTG's basic form; MFCG's one click; NG's one
action; VG's few tags) — intent is never a mandatory questionnaire; random size remains the default; the circular walled
town remains the best-loved default and "I do want to keep it abstract" (22717) rules out hard-coding one culture — era
and region are presets. Too many forms dilute recognisability (FTG VAR-3). The City Painter lesson: the generator is not
a CAD editor — pins and assignments are inputs the generator solves around, not brush strokes.

**Dependencies.** Needs O2 (blueprint), O9 (pins and assignments as persisted events), O7 (roster, context vector),
O18 (the prosperity field is what "wealth level and gradient direction" steers), O16 (feedback). Enables the ASSIGN
hook in full, the EVO circumstance inputs, S4 (templates chosen by context) and stage 3 (class rules as editable data).

---

### O3 · Robust, invariant-checked geometry and topology kernel: typed results, bounded retries, local repair, no whole-map restarts, generation report [BASE] — score 5.0

**Answers.**
- MFCG ROB-1, ROB-2, ROB-3 (CR repeatedly, US×1, REC, OS): 24 whole-city restarts in 58 recorded attempts (21 canal
  + 3 bad-poly), and a geometry exception restarts the WHOLE city, wards included (Styles addendum ST-8); "For complex
  concave shapes it often produces far from perfect results and such defects as collapsed or intersecting edges can
  easily break it completely", with a failure ladder up to "Browser not responding" (87882877, verified); "the variable
  `rect` ends up null" (Daniel, 61026228); Voronoi lots "crashes the generator occasionally" (41711473); straight
  skeleton "glitches in special cases and I hate dealing with special cases" (101173551); bisection with holes "still
  pretty glitchy" (70917627, verified); 0.7.3 released mainly to fix "a pretty serious computer freeze" (112574); 19
  skipped cuts, 4 empty alley groups, 2 hole splits, 178 citadel equalize passes and 11 bloats in the census; 2017:
  `cut` with ≠ 2 crossings a silent no-op, no recursion depth guard, NaN circumcentres, parameter-space tolerances
  (`os-model.md` §13.4, `os-geometry.md` §4).
- FTG ROB-1, ROB-2, ROB-3 (REC, CR ×4, US×1): 40 pairs of houses on identical footprints (2.8 %), 3 hourglass
  footprints, 9–14 road edges shorter than 1 m (shortest 0.05 m), 3.9 % / 10.0 % of buildings without an entrance, 2–3
  buildings crossed by a road centreline (§2 census, executed); the heuristics "do not detect everything (e.g.
  hourglass shaped buildings)" (133016301, verified); a road drawn over a road "breaks" instead of snapping (75844005);
  the fill tool "sometimes just fills half of the town" on generated streets (Sazra); "Two different intersections could
  have the same world position … this breaks things" (153121107); a self-intersecting ocean "broke some of the logic in
  the server"; V1 "would regularly give up" (106664214, verified); shrink-then-split fails "if the area is too small to
  shrink, or there is an odd corner shape" with no fallback (164816716).
- NG RB-2, RB-3, RB-4 (CR, REC, US×1): "Alternative cut" on 4.1 % / 3.7 % of ring cuts and "Trying again" ≈ 1 %
  (RA-3); sliver drops 0–42 per map; roof faces with 0–60° corners (43/69 in the ring maps) and 14 triangular faces
  (ring 7172); failures leave no record.
- VG R1, R2, R3 (REC, CR ×4): 4 of 13 highway maps discarded whole and the seed silently replaced (H10.1); "Often
  fields along the main road have a small shape defect like a thorn. Most likely it's a bug in my library for Boolean
  operations with polygons" (50688261); "Bridges near confluences tend to cross the water at wrong angles" (91692684);
  crossroads branches "loop back to the original road or get cut off" (116745476); fields overlapping inside the
  palisade (104796798, verified); `PolyBool.and` 28–92 times per map on a kernel with non-robust predicates, exact float
  compares and NaN-swallowing clamps (`os-geometry.md` §4).

**Design idea.** One topology-and-geometry kernel used by generation and editing alike: a half-edge planar subdivision
on integer or fixed-point coordinates (FTG's integer centimetres), exact orientation and in-circle predicates, snap
rounding, split-on-cross and weld-within-tolerance as the only ways an edge enters the graph; faces (blocks, plots,
courts) as first-class records with stable ids (O2), never re-walked cycles; our own boolean, offset and
straight-skeleton engine proven on concave and holed inputs. Every primitive declares its preconditions and returns a
typed result (ok / degenerate with a reason / rejected with a reason). Every stochastic step has a deterministic,
bounded fallback ladder — retry with the next sub-seed → a simpler primitive (bent cut → straight cut on the mean
normal → axis cut) → landmark, green or court substitution (NG's own rule) → a documented omission — and no tier
restarts the map. A post-stage invariant suite (simple polygons; no footprint overlap; minimum width and area per
class; every plot with an access edge and every building with an entrance; no road crosses a building; no edge below
the weld tolerance; every gate joined to the network and the centre; water ∩ buildings = ∅; every requested feature
present; exclusive land uses never overlap; bridges within tolerance of the channel normal; no branch re-joins its parent
within k segments; a sealed enclosure only when declared) runs with local repair and writes the generation report
(O16). Feasibility by construction: the area budget is derived from the manifest before the fabric is cut, and hard
items reserve contiguous space first (FTG's V2 insight, generalised by O18's joins). Hard time budgets per stage;
validation at the authoring boundary (FTG) as a second line; property-based fuzzing (B-FUZZ) and a pathological-polygon
corpus in CI.

**Acceptance criterion.** (a) B-FUZZ: 10⁶ random concave, holed, thin, near-collinear and snapped polygons per
primitive → 0 crashes, 0 hangs (hard timeout), 0 self-intersecting outputs, 0 slivers below the declared minimum angle
and area. (b) B-CITY: whole-map restarts = 0; hard-invariant violations per 1 000 cities = 0 (duplicates, hourglasses,
doorless buildings, micro-edges, buildings in water, landlocked plots, undeclared sealed cities); fallback-ladder uses
reported per city with cause codes; stage retries ≤ 2 % of generations with p99 ≤ 3 attempts (MFCG baseline: 24
restarts in 58 attempts and 8 of 34 cities; VG: 4 of 13 highway maps; FTG: 40 stacked pairs, 10 % doorless). (c)
B-EDIT: 10⁵ random edit sequences (draw, move, delete, crossing walls, regenerate area) → 0 planarity violations, 0 lost
faces; face ids survive edits that do not touch the face; the fill and regenerate success rate on generated streets
equals that on hand-drawn streets (100 %; FTG baseline: "half of the town"). (d) Model time p50 / p95 / max per size
class within budget on reference hardware — TOWN ≤ 100 ms, CITY ≤ 300 ms, METROPOLIS ≤ 1 s (MFCG baseline 125–260 ms
at size 80; FTG ≈ 3 s server-side). (e) Identical model hash across platforms (integer coordinates remove float
non-determinism). (f) Seed → map identity 100 %: the user's seed is never swapped (VG baseline 4 of 27).

**Restraint clause.** The bent cut's organic look must survive: robustness comes from predicates and typed fallbacks,
never from straight cuts or a grid — NG's measured signature is the regression suite (one bend at 0.5 ± 0.1 in ≥ 80 %
of bent cuts, ≥ 85° arrival in ≥ 95 % of junction ends, K1/K2). MFCG's tiered policy (repair, local retry, skip) and
replayable attempts (EG-3) are the right shape minus the restart tier; keep NG's landmark substitution (K6); keep VG's
"repair over rejection, where cheap" (a truncated trail moves its house) and "make the rejection unit small where
rejection is likely" (57968729); keep FTG's "fix causes, validate at the authoring boundary" and its integer-centimetre
connectivity without epsilon geometry. Invariants police validity, not regularity — keep FTG's sheared minority of quads
(p95 corner deviation 22.9°) and NG's explicit wedge class. Keep the sub-second model: no slow CAD kernel. Permissive
combinations stay allowed and are made correct, not forbidden (VG R2).

**Dependencies.** Needs O2 (sub-seeds for retries), O6 (metric tolerances). Enables everything geometric — O1, O4, O5,
O18, O17, O8, O9 (transactions that preserve planarity) — and the S1 seam contract.

---

### O8 · Fortification as a designed network: trace on defensible ground, gates on arterials, towers by rule, castle siting, several enceintes, conversions [BASE; EVO hook] — score 4.0

**Answers.**
- MFCG GEO-3, EDT-4 (CR, US×3, REC, OS): one ring only — "multiple sets of city walls, both nested and independent"
  was a 2018 roadmap item that never shipped (22717, 39697187); the castle "always occupies one cell of the mesh"
  (41711473, verified) and can only be resized by warping; inner castles "surprisingly hard … a separate class of
  objects" (40345972); "sawtooths" (38048182); at size 80 the wall "no longer encloses the city" and the castle shrinks to
  "a tiny walled parcel" (`profile-mfcg.md` §10.6); a tower on every non-gate vertex (EG2-3); `gates=0` yields a sealed
  city with no fallback and a `gates` change re-rolls everything (EG2-4, EG2-5); the creator's later walls "looked wrong"
  for a long time (139540343, verified); castle size, keep and grounds (Allen Varney), castle placement (Quenten
  Walker), drawing walls (BCS); walls stranded by sprawl with no history.
- FTG GEO-4 and the Addendum-1 errata (REC, CR, US×1): the wall is a chain of edges in the planar graph (wire type 7)
  with every tower on one of its nodes (17/17, 29/29), median spacing 39 m, an open 473 m chain from river bank to coast
  (F15); gates are not objects — streets pass through the wall at 6 and 2 nodes with no gate marked, and the client
  draws the band and crenellation; wall placement is `Around all lots` / `Around stage lots` only; moats and bypasses
  "planned" (120828892); the castle is "a random wall layout" fitted into its district lot and generated only with a
  king or queen (137812814, 144226579); a castle-centred ringed city is "tricky … it might be easier to manually place a
  castle after generation" (CR to Jason DeGonia, 144226579, verified).
- VG G7, C2 (CR ×3, US×4 + US×4, REC): a convex hull wrapped around the finished village, 1 463 raster tests to push it
  off buildings (§4.9); "no real gates … regular houses placed where roads cross the wall" and the JSON "just another
  list of polylines" (105215836, verified); the wall cuts woods and fields overlap (104796798); no keeps or ditches;
  motte-and-bailey (Andonome), settlements "that have expanded beyond their walls" (Maseiken), the wall as a polygon
  (Sylvain Donnet), a manor or small castle (Varpilah Chase), fortress layouts (Sandbox Construction Kit).
- NG GQ-6: no walls at all — a gate quarter without a gate; Urban Places' wall: "There's nothing special about the
  algorithms, but for a long time, all the results looked wrong" (139540343).
- The owner's evolution hook (wall → ring road, gate → junction, an outer curtain around the grown town), the
  assignment hook (palace, prison, cathedral as institutions) and the design tiebreaker (defence as an explicit
  constraint).

**Design idea.** Fortification is a first-class network in the same planar graph (FTG's substrate): one or several
enceintes (citadel, inner and outer town circuits, suburb defences, a bailey) traced from a growth-stage boundary
(FTG's historical staging) and adjusted to defensible ground and water from O1 (crests, river banks, ditch lines),
enclosing the designated core with a metric setback band in which nothing is built (MFCG's rule, kept). Gates are
entities placed exactly where tier-1 arterials cross (O4 routes arterials to gates and gate count is a request honoured
exactly — zero gates is a declared postern or water gate, never an accident); gatehouses are a building class; towers are
spaced by rule (metres by era and wealth, corners, flanking gates) and wall thickness and walk width are metric; an
optional ditch or moat is fed from hydrology (O1); an intervallum lane, barbicans and bastions are era toggles. The
castle or citadel is a designed object sited by a defensibility score (height, water, gate control, distance to the
centre) with keep, bailey and grounds sized from the roster, on a plot obtained by O18's joins. The trace is a smoothed
polyline with a minimum segment length and interior-angle rules (no sawtooth). Every segment, tower and gate carries a
lifecycle state so conversions — wall → ring road or boulevard, gate → junction or square, suburb → district absorbing
the old line, a new outer curtain — are first-class geometry operations (EVO), and the wall exports as a polygon/way
entity with its gates and towers.

**Acceptance criterion.** On B-CITY: (a) every tier-1 arterial crossing a wall has a gate (100 %); streets crossing a
wall elsewhere = 0; the requested gate count is honoured exactly (MFCG baseline: `gates=0` seals the city; FTG baseline:
6 and 2 ungated crossings). (b) Buildings intersecting the wall or its setback band = 0; wood and field overlaps with
the wall = 0 (VG baseline: overlapping fields). (c) Tower spacing within the class band (reported; FTG's 39 m median is
one reference point, MFCG's tower on every vertex the failure); 0 wall segments below the minimum length or inside the
sawtooth angle. (d) Share of wall length on locally high ground or along water reported and ≥ its target once terrain
exists; the castle site scores ≥ p80 among candidate sites on ≥ 95 % of seeds. (e) Share of built area inside the
enceinte reported per size class, and at METROPOLIS an outer curtain or suburb defences are generated when requested
(MFCG size-80 baseline: the wall no longer encloses the city). (f) Nested and independent circuits achievable on
request — citadel + town, town + outer, bailey, two independent enceintes — 4/4 on 100 seeds. (g) EVO: a wall →
ring-road conversion preserves all abutting plot ids and every changed entity traces to an event. (h) The wall is a
polygon/way entity with gates and towers in every export (VG baseline: polylines only).

**Restraint clause.** Walls, towers and a castle are the signature silhouette — "walls make a pile of polygons look
like a fantasy city map" (devlog 1579, verified): bold, legible, on by default at TOWN and above. Keep FTG's
historically staged wall (it encloses an early growth stage — stage 1 = 20 % of buildings — and the town grows outside
it) and its configurable multi-ring walling; keep VG's cheap, pretty default and its gate shadows. Routing a wall is a
judgement problem ("nothing special about the algorithms … all the results looked wrong"): expect tuning by eye and
by the corpus later, and keep the parameters exposed. A deliberately sealed fort stays an explicit choice.

**Dependencies.** Needs O1 (terrain, water), O4 (arterials and gates), O3 (planar graph), O6 (metres), O18
(institution plots for the citadel). Enables the EVO conversions, O13 (gate and street names), S2 (walls as typed
boundary edges with gates).

---

### O13 · Label engine and names grounded in the model; streets as named ways; annotation layer; typed text [BASE] — score 4.0

**Answers.**
- MFCG LAB-1, LAB-2 (CR, US×3, REC): old labels "went beyond the borders of their areas and occasionally they were bent
  in the opposite direction" (102377277, verified); "far from perfect" (34104, 46967, 85275); arced labels "not great"
  (101173551); the sibling's curved labels don't "take holes into account", "curve too wildly" and are "sometimes
  (rarely) … simply drawn incorrectly" (109092851); no multi-line labels (27776897); "labels can only be placed
  automatically" (494692); labels cover gate blocks and the keep and straddle the wall (EG-1, EG2-1, EG2-4); "the
  lettering covers up buildings" in a 100 000+ city (Silent Observer, 102377277); move or remove labels (VampriruM,
  LionHeart5); "Quite often it produces silly names" (85275), "Not sure they got better" (100431269); names reroll only as
  a set; a user who renamed every district lost them on reload (102377277); no street names exist.
- FTG LAB-1, LAB-2 (US×2 + US×2 MFCG, US×4, CR, REC): "Have you considered adding names to roads?" (Pablo David Gaytan
  Rodriguez, 112861635, verified) and again in 2025 (rumyrrh) — "on the to-do list" both times; "No street names, no
  building labels on the map"; 62 % of road nodes have degree 2 — a road is an emergent run of edges; "Ashton is small and
  nearly hidden"; grid lines "too thin and won't be rendered" zoomed out (159738553); no compass; "Has Is clean shaven."
  and pronoun and is/are bugs whose fixes reach new settlements only (Lucy Jones, Gabriella Galvez, Bri Rowland);
  contraction erosion needed a ≤ 3-syllable budget (157283634).
- NG LT-1, LT-2 (CR, US×3, REC): exactly one `fillText` per map; "street names, POIs etc." promised (53106327) and never
  shipped; "where every baker is located" (Allen Call); names "generated purely randomly" here against MFCG's
  feature-conditioned ones (58808794); the grammar offers "Narrow Bridge" on water-free maps (H3.23); the regional-map
  lesson — labels "got too noisy", so the creator used a legend (44405211).
- VG L1 (CR ×4, US×1, REC), L3, L4: POIs were the reason VG was started, yet "I don't know where to place their
  descriptions on a map without obscuring too much" (38498864, verified) and "I am sick and tired of implementing the
  legend in my every generator" (57968729) — two POIs per village, console-only, in the 2026 builds; Allen Varney's
  pins, hover text, labels revealed on zoom and a separately exported legend (38498864); a title plate only; `JUCTION`
  and "Nothern" in the shipped word lists; `amelriceing` → Amelceing (2 of 23 generations); toponyms "pretty terrible.
  The more names there are, the more obvious it gets" (77490818).
- The owner's adopted default of original English-fantasy naming with setting packs later, and "everything is
  editable".

**Design idea.** Ways are entities (O4, O11), so streets, alleys, squares, gates, bridges, quays, landmarks and
districts can all carry names. Names are derived from the model by an original grammar of our own authoring — districts
from location, landmark, trade, family or landform; streets from destination (the mill, the gate, the bridge), trade,
institution or owner; gates from their road's destination — with folk-contraction recorded as an EVO change from an
original name (FTG's idea, rule-driven), a whimsical fantasy set that never claims an absent feature, curated and
spell-checked word lists in CI, and typed text templates with agreement for the content module. Naming draws from its
own sub-stream (O2) so names never move geometry; every name is rerollable, editable and persisted per entity (O9). A
**label engine** with per-zoom label sets (city: districts, water, major landmarks, gates; district: streets and
squares; neighbourhood: every named way, buildings on demand), curved area labels on hole-aware skeleton spines with a
curvature limit, path labels along centrelines with collision handling, multi-line labels sized by area and importance,
protected features (gates, landmarks, bridges, the keep) never covered, a minimum x-height and a paper halo; an
**annotation layer** of numbered markers with a legend as a sidebar or separate sheet and hover in the app (VG's L1
idea); user pinning, moving and hiding of labels as persisted edits; optional addresses (street + number, numbering
monotone along each street) as a layer and in exports; furniture from O6.

**Acceptance criterion.** On B-CITY and B-ZOOM: (a) label overlap with protected features = 0; label–label collisions
= 0; area labels wholly inside their area ≥ 99 %, curvature within the limit, 0 labels crossing holes (MFCG baseline:
gate blocks and the keep covered, walls straddled). (b) At neighbourhood LOD ≥ 90 % of named streets above a length
threshold are labelled; at every level the minimum rendered x-height is met and label density stays within its band
(NG and FTG baseline: none). (c) Name–feature consistency 100 % (a name that references a feature type has that feature
within X m; NG baseline: "Narrow Bridge" without water); the share of names traceable to a model feature ≥ 70 %, the
whimsical remainder flagged as such. (d) 0 spelling errors in content data; shortening never breaks a morpheme
boundary; 0 critical grammar errors on 10 k generated descriptions (automated checker plus a human sample). (e) 100 %
of edited names persist and reload (MFCG baseline: lost). (f) Annotation: ≥ 95 % of points of interest labelled at print
scale at ≥ 7 pt with 0 overlaps; the legend exports separately. (g) Address coverage 100 % of buildings when the layer
is on. (h) Labels are a toggleable layer thinned by LOD.

**Restraint clause.** The letter-spaced curved small caps with a paper halo are part of MFCG's beauty — keep the
style; keep names conditioned on the map's features (`profile-mfcg.md` §9) and VG's tags-feed-names trick; whimsical
fantasy names are wanted — keep a set; labels "got too noisy" (44405211): optional, LOD-thinned, with FTG's search box
and legend pattern beside them; VG's one-page cleanliness; FTG's folk-contraction charm; never always-on labels.

**Dependencies.** Needs O11 (ways as entities), O4 (streets), O7 (uses and owners for names), O2 (naming
sub-stream), O12 (LOD), O6 (scale bar), O9 (persisted edits). Enables the gazetteer UX and S5.

---

### O14 · Hinterland land use sized to the population; a context margin beyond the frame; extent from need [BASE] — score 4.0

**Answers.**
- MFCG GEO-8, VAR-2 (US×1 + 2, CR, REC): "I wish it generated more farms … It never feels like there are enough to
  support the population" (Justa Badge, 47063541, verified); "In reality cities should be surrounded by farms, but it
  just doesn't look interesting" (47063541, verified); "If you think they are drawn incorrectly, then you are not alone"
  (59798); forests "fill all available space" with edges "too straight" (114184619); fields degrade to stipple at
  metropolis zoom; roads end at the crop and stop at the forest edge (ST-2); without walls "the borders are too well
  defined" (Reddit 6cg1ol); MFCG forests are "historically incorrect anyway since they were cut down around settlements
  for timber" (CR, Reddit a1wx6h, verified in the archived copy).
- FTG GEO-7, REN-3, SIM-2, GEO-6 (CR, REC): the map is a fixed canvas per size class (HAMLET 1 500 m … METROPOLIS
  6 000 m) while population spans 550× — small towns float and big cities crowd; trees are 7 sprites round-robin with
  no minimum spacing (NN minimum 0.14 m); exactly 14 wells, bandstands and statues each; outer land placed "trying to
  place similar features next to each other"; "how do people get food in a desert town with no rivers" (144226579);
  `Default` farmland opaque. Strengths to keep: farmland modes, "1 farm per 25 people", desert fields hugging rivers,
  hedgerow rows.
- VG G8, G9, G11, R4, R6, S4 (CR ×4, US×3 + US×2, REC): "The part of the generator which is responsible for creating
  fields was (and still is) quite messy" and the sectors are "probably not a very realistic layout, but it looks nice"
  (88749133, verified); fields adjoin only the main road (50688261); Moritz Hackl's rings — gardens, paddocks and
  orchards near the centre, woods and meadows further out (38498864); fields should push back the trees (Allen Varney,
  42521165); a barn beside the fields (Quenten Walker); forests "creeping way close … I'd prefer larger (or
  configurable) clearings" (Allen Varney, 42144467, verified) — "it looks kind of more dramatic" (CR, verified);
  "roads, waterbodies end right where the original map ends" (37407181, verified) and the missing "bigger world …
  looks very silly" in City Viewer (45360377, verified); fields on one bank only; "lonely houses" an unplanned
  by-product tuned statistically (57968729); empty space fought with a vignette — "some kind of ground clutter would help
  more" (104226049).
- The owner's era centre of gravity (12th–15th-century Western Europe: open-field strips, commons, coppice) and the
  greenery ruling (orchards and greens at the edge of modest quarters → O19).

**Design idea.** The hinterland is a land-use model, not decoration: arable per capita from a data table by era and
region (with provenance), meadow and pasture, commons, gardens and closes and orchards nearest the edge (O19), managed
woodland (coppice, timber) and wild wood by distance, mills on water, quarries and clay pits where terrain says; field
systems as presets (open-field strips, enclosed fields, the genre "sector" look kept as a style preset) with patterns
tied to roads, water and settlement form; farmsteads placed by rule beside their fields with trails (VG R6 done on
purpose); every land component — both banks, islands — receives uses; woodland clearance from agrarian use plus a
"wildness" control with monotone semantics; semantic ground cover (tracks, hedges, pens, scrub) instead of a vignette.
A **context margin**: the generation domain is the frame plus a margin, so roads continue to named external
destinations with bearings (O4, O11), rivers enter and exit, terrain continues, and the crop is a display choice; the
extent is derived from built area + hinterland demand + margin, not a size-class lookup. A supply-chain feasibility
check that explains rather than blocks ("no food source: add a river, farmland or trade").

**Acceptance criterion.** On B-CITY: (a) farmland per capita within the table band (± 20 %) on 100 % of seeds unless the
request says otherwise (a trade port, a desert); land-use shares by distance band reported per preset. (b) 100 % of
fields have access; every farmstead within X m of its fields; eligible land components adjacent to the settlement left
unused = 0 (VG baseline: one bank); land-use overlaps = 0. (c) Forest-edge straightness below threshold; the
house-to-forest-edge distance distribution reported per preset; canopy fraction monotone in the wildness control (VG
baseline: "Some" ≈ "Many"). (d) 100 % of roads leaving the frame have a destination; export extent = frame + margin; 0
truncation in 3-D or viewer-style output (VG G11). (e) Built-area ÷ map-area within a band across the size ladder (FTG
baseline: a fixed canvas per class). (f) ≥ 95 % of the map carries a land-use class (VG S4). (g) Scatter: nearest-
neighbour p1 above the canopy-overlap threshold and a pair-correlation function per ecological class (FTG baseline
0.14 m).

**Restraint clause.** The creator's composition point is real — "a sea of fields can bore": keep a framing default
that looks good and VG's one-page composition; keep the genre "sector" look as a preset, VG's "Improved" three-zone
forest and `grove` tag, FTG's hedgerow signature and desert fields hugging rivers; keep lonely houses as intentional
farmsteads; keep the margin modest (cost).

**Dependencies.** Needs O1 (land components, water, terrain), O4 (external roads with bearings), O7 (population and
demand), O6 (metres, per-capita tables), O19 (edge greenery). Enables VILLAGE-LATER V2.

---

### O17 · The plot model: an owned parcel with 0..n footprints and a yard, a per-plot site plan (row, set-back compound, detached, hovel), footprints and yards drawn — never the plot; heights in the data model [BASE; S3 input; owner ruling] — score 8.3

**Answers.**
- The owner's PLOT MODEL ruling: the shapes MFCG and FTG lay out are plots, not buildings — "the illusion of
  buildings" — and the HEIGHT amendment (every building, wing, tower and roof carries floors, eave, ridge and tower
  heights for a later shadow pass).
- MFCG GEO-9, SIM-2 (owner, REC, CR, OS, US×3 + the nine B4 voices): the default Display mode is Lots, which "draws lots
  edge to edge" and paints every lot as a building — 33 746 of 34 950 recorded building fills have 5–8 path segments
  (§10.4); the `Building` class builds only 2–19 landmarks per city; `Complex` mode puts one detached rectangle house in
  every lot, so the lot/building split is a global display switch (ST-7); a 2017 garden is a leaf dropped with
  `emptyProb` — "a missing house, not part of anyone's plot" (`os-wards-render.md` §4.4, §6.2); the creator planned
  plots with buildings inside them in 2017 (Reddit 6cg1ol) and it shipped only as Complex (0.5.3); a user proposed "a
  triangular lot as a fence around a rectangular house" (agnate, devlog 1367, verified); "Create each individual
  building as a unique 'object'" (Javin Bond, 103335095, verified); nothing between a local church with its small
  square and a whole-ward cathedral — no inn with a yard and stables, no manor with outbuildings, no workshop court;
  mansion integration declined because "buildings are smaller on a city map" (100431269).
- FTG GEO-10, SIM-3 (owner, REC, CR): a lot → plot → building hierarchy exists (keep), but the wire lot has no owner,
  use, access edge or reference to its buildings (only 53 % of buildings lie in any serialised lot); a lot holds a median
  of two buildings, each with its own household — nothing groups a house, a workshop, a stable and a yard under one
  owner; residences share walls in 2–5 % of cases in the rings and 0 % in the suburb (industry 96–98 %, warehouses
  78–94 %, shops 43–46 % do), so there are no rows of houses; every institution is a single footprint (inns 326–700 m²,
  markets 956–1 168 m²) and the mansion is one fixed 889 m² eight-vertex template in both cities; land per building is
  ≈ 225 m² in every suburb lot and class, so coverage is not a rule (A1.1, executed); the farmstead — a house centred in a
  larger plot with a driveway (144226579, verified) — is FTG's one site plan with an access edge; "special landmark
  districts … groups of buildings to create a larger complex" is a stated, unbuilt wish (106664214); "a manor looks like
  a hovel with a bigger rectangle".
- NG PG-A1, PG-2, GQ-3 (REC, CR): 95–99 % of footprints share a wall and party walls are 39–43 % of perimeter — the
  family's party-wall reference — but there is no detached regime (1–5 % free) and no hovel; `Manor` blocks are never
  partitioned and hold about one hall: "A large building takes a whole block, but often fails to fill it all"
  (64375271, verified), later "trees are planted around it" (70917627, verified); 99 % of buildings are one oriented
  rectangle; the Procgen Mansion handoff "approximates irregular polygons with squares".
- VG G1, G2 (CR ×3, US×4): no lots and no streetwall — "the old buildings fail to form a streetwall" (141198168,
  verified); one rectangular archetype ("boring floor plans" in the sibling, 66544756); a farmhouse with an adjacent
  barn (Quenten Walker), a manor (Varpilah Chase), roundhouses (Maezar).

**Design idea.** The plot is the parcel entity of the schema (O11): owner (a household, business or institution from
the roster, O7), use, frontage edges, access edges, depth, party-wall flags, lifecycle, and the per-plot context vector.
It holds 0..n building footprints plus a yard partitioned into typed sub-areas (yard, garden, court, orchard, midden,
pen, vacant). A per-plot **site-plan step** — the outer layer of the building-generator interface — runs one rule
evaluation per plot, no search, reading data tables keyed by class × prosperity band × density: a coverage ratio and an
arrangement — **row** (end to end along the frontage with shared party walls and a rear yard, so the street keeps a
continuous frontage), **set-back compound** (house or hall plus several disjoint outbuildings — stables, workshop,
chapel, barn, kitchen, brewhouse — around one owner's court with a gate to the street or lane), **detached in a yard**
(cottage, farmstead with a path), **hovel** (one small footprint on a plot that is mostly yard), with explicit corner
and wedge rules, front-line jitter, the setback from the curtain wall (kept), and the separation rule between
neighbours (party wall / slot / passage, O18). Every footprint carries class, storeys and heights (floors, eave,
ridge, tower) from the class tables even though the top-down view never shows them; the display list has a shadow-layer
hook that a later pass drives from height and a sun vector. The interior composition (wings, roofs, rooms) is stage 3
behind the interface, generated lazily from the plot's own sub-seed, with a trivial outline builder until then.
Rendering draws footprints and yards at every level of detail; a plot outline is an optional cadastral layer, never
drawn as a building. FTG's plot-decoration vocabulary (lawns, fences, wells, gardens) is extended, not replaced.

**Acceptance criterion.** Per class and district on B-CITY: (a) coverage (footprint area ÷ plot area) within the table
targets (FTG baseline 0.51–0.58 in every class; MFCG Lots mode 1.0 everywhere). (b) Share of plots with ≥ 2 footprints
of one owner > 0 for institutions, manors, inns and farms and within target per class (FTG: owner undefined; NG: one
hall and a grove). (c) Party-wall share of frontage length on row classes within its band, attached share ≥ 90 % in
dense and poor classes (NG K13's 39–43 % of perimeter as the reference; FTG's 0–5 % for residences as the failure).
(d) Streetwall continuity on dense frontages ≥ MFCG Lots mode and FTG's dense core — the "not so urban" failure
avoided. (e) Every yard belongs to exactly one plot or a declared common court (100 %); every plot owner exists in the
roster (100 %). (f) 100 % of footprints fit their plots (setbacks, frontage); 0 fallback rectangles in the renderer.
(g) 100 % of buildings carry storeys and heights; with the shadow pass enabled, shadow length ∝ stored height
(r ≥ 0.99) and 2-D shadows agree with any 3-D export. (h) Site-plan cost ≤ 10 µs per plot median (MFCG's
`buildGeometry` ≈ 19.5 ms + 7.5 µs per building is the budget). (i) Footprint geometry hash identical at every LOD.

**Restraint clause.** Lots mode's wall-to-wall terraces are right for a medieval core: dense districts default to a
continuous frontage with the yards behind it, not gaps along the street (141198168); keep NG's terrace rhythm and
alternating roof tones (K3, K13), MFCG's `Offset` uneven facades and hollow courtyards, the walled compound in a grove
for landmarks (K14), FTG's farmstead-with-driveway and decoration vocabulary. Gabled rectangles are legible — simple
roofs at small scales through LOD. "From a giant manor to a small hovel" means diversity by rule, not manors
everywhere. Keep it cheap: store the rule inputs and derive each site plan lazily (FTG's 593 KB economy). Shadows stay
subtle and off by default ("a bit too dramatic … not very readable", 114858238).

**Dependencies.** Needs O5 (frontage-first plots and access edges), O18 (the granularity law decides plot size before
the site plan), O7 (owner, roster, context vector), O6, O3, O11 (the entity), O12 (LOD and the shadow-layer hook).
Enables stage 3 (the interface), S5 (close-up), the ASSIGN hook (a plot of the right size for an assigned building).

---

### O18 · A prosperity field and one plot-granularity law: joins, splits, alleys and back lanes from the same per-plot context vector; seams as fields [BASE; S2, ASSIGN, LAYER (sewer) hooks; owner rulings] — score 8.3

**Answers.**
- The owner's PLOT GRANULARITY and PROSPERITY rulings (one code path; a continuous, editable field with predictable
  drivers plus controlled chance, banded only where a table needs a class; quarters blend at their edges).
- MFCG GEO-10, GEO-7 (CR, US×1 twice + 2, OS, REC): 2017 lot size is `minSq` drawn once per ward from a class range
  (Slum 10–40 … Patriciate 80–110), jittered 0.33×–3.03× (`_critic-os.md` C4), blind to frontage, street class and
  distance to the market; alley frequency is an unplanned side effect of `minSq` at one width (0.6) everywhere
  (`os-wards-render.md` §4.3); the live build dropped the wealth axis — district types are locations (central, docks,
  gate, sprawl …) and "Slums" survives only as a sprawl label (`profile-mfcg.md` §9.2); no step merges lots for a larger
  use (the castle is a cell, the temple a ward, churches are inserts); the "Continuous" option that blended parameters
  across districts — "on one side of a street buildings are tiny and on the opposite side buildings are huge" (34104,
  verified) — was removed in 0.5.5 ("nobody cared", 59798); outskirts filtering that "decreases the density of streets
  there, while keeping the density of buildings along those streets relatively high" (87882877) is the one rule that
  varies grain with distance (keep); T Mexx twice — "wealthy, clean, large homes spaced out more, while a poorer part of
  town might be smaller, dense, squalid shacks" (70917627, verified) and "impoverished slums would be quite dense with
  adjacent buildings and more alleys than green space between streets" (141198168, verified, unanswered); a selectable
  "Population Density" (LionHeart5, 22717); "if streets and alleyways are sized up" (Matt Wallis, 58808794).
- FTG GEO-8, GEO-9, GEO-6, EDT-1 (REC A1.1 executed, CR, US×2): the residential class configs carry only a
  `decoration` block; in the suburb every class gets a 14.7 × 30 m lot of 441 m² with two ≈ 120 m² buildings, a 1.5 m
  gap (81–84 % of all gaps within 1.45–1.55 m) and 0.34 coverage; Spearman(wealth, footprint) is −0.06 and +0.38; the
  social geography is an accident of placement order (the upper class 329 of 330 outside the rings; `MOST_POPULOUS`
  default; an order option only since 2026-05); the 2023 rule that made "poor districts to be super dense" (84680671,
  verified) was lost in V2; no merge step — V1 "would regularly give up" on temples and mansions and V2 answered with
  landmark-first placement; the regenerate tool's only grain control is a ×0.5 / ×2 modifier; a regenerated area comes
  out "too snug" with buildings "lining invisible" edges and no density or padding control (Deahal, 157283634,
  verified); resources "don't affect generation" (guide, verified); no alley class — streets 323–332 m/ha, the wall
  19–21, no lane; 0 residences reached through a lane or court; lot interiors are leftovers (26–29 % of in-town lots
  empty → parks or dirt) and fenced boxes read as broken buildings — "what are the empty spaces for?" (Jason DeGonia,
  144226579, verified).
- NG PG-1, PG-2, PG-3, VC-1, VC-6 (REC, CR, US×1 twice): one granularity constant per hood — Spearman(distance to
  centre, footprint area) −0.06 to +0.02 and Moran's I −0.04 to +0.03 across eight captures (PG-A1, executed); "there
  aren't many tools for this" (70917627, verified); `Manor` = a whole block or nothing; alleys exist only as accidental
  slivers (49191011 images 09 and 11) and block interiors are unreachable; the seam problem is latent until
  neighbourhoods are composed (VC-6).
- VG G1, V3, C2: no plots at all; economic tags asked for; lordship absent.

**Design idea.** (1) A continuous **prosperity field** over the settlement, computed once per generation, stored per
plot and as a raster: a deterministic drivers term from data tables (distance-decay to the centre, market, main
streets, gates, water and harbour; high ground and upwind up, low, damp, downwind and flood-prone ground down; negative
kernels around tanneries, slaughterhouses, walls and prisons; attractors at the roster's institutions) plus the district
character offsets (O10) and a controlled random component from its own sub-stream (O2), smoothed so neighbouring plots
vary gradually; banded into classes only where a rule table needs one; editable as a layer (a brush) with the edit
persisted (O9); moved over time by the evolution stage's inputs (EVO). (2) **One plot-granularity law**: the block →
plot subdivision depth and the merge rules read the per-plot context vector (prosperity, district type, density,
assignment, frontage road class, distances to market, centre, gate and water) — a data table maps it to target bands of
frontage width, depth and area; frontage-first subdivision (O5) cuts down to the band's lower end and a **merge
operator** joins k adjacent plots (along one frontage, or back to back to a rear lane, always keeping a frontage) up to
its upper end — JOIN and SPLIT are the two directions of one law; an institution or an assigned building claims and
joins the contiguous plots its class requires BEFORE the fabric is cut (FTG's landmark-first, generalised; assignments
go first), and takes a whole block only when its requirement exceeds a threshold share of it; a merged plot keeps its
member ids as history so a later split restores them (EVO). (3) **Alleys and back lanes** are typed ways in the same
planar graph (O4, O11): inserted where a block is deeper than its class's depth band or where a split or merge creates
rear plots; a separation rule chooses between party wall, non-passable slot and walkable passage from the tables; dense
and poor classes get many narrow alleys and courts, rich classes a few wide back lanes with carriage access; every plot
and court has an access edge; a sliver below the minimum plot width becomes an alley if it connects two ways and is
otherwise absorbed (O3, O5); alleys are named ways (O13), part of the S1 seam contract, drawn by LOD (unstroked gaps at
city zoom as MFCG draws them inside the walls, stroked at neighbourhood zoom) and carry slope and flow direction for the
sewer hook. (4) **Continuous rules interpolate**: coverage, plot size, greenery (O19) and building scale read the field
directly; layout parameters are fields that jump only at hard boundaries (wall, river, a main street where flagged) —
the "Continuous" option done right, inherited by stage 2 (S3). (5) A variance floor around the mean keeps the dice: a
rich quarter keeps a few small houses and a poor one gets a large inn.

**Acceptance criterion.** On B-CITY, per district and zone: (a) Spearman(prosperity, plot area) ≥ 0.8 and
Spearman(prosperity, plots per hectare) ≤ −0.8 over parameter sweeps; within a zone the rank correlation of plot area
with prosperity exceeds a set threshold (FTG baseline ≈ 0 — 441 m² in every class; NG within-hood ≈ 0). (b) Moran's I of
plot area > 0 and its pattern follows the requested field (NG baseline −0.04 to +0.03). (c) As prosperity rises, the
detached share and the yard share rise and the attached share and coverage fall, all monotonically. (d) Alley length per
hectare falls with prosperity (Spearman ≤ −0.7) and median alley width rises; 0 alleys narrower than the class minimum;
the dead-end share of alleys within its band per class (FTG baseline: 0 alley length at every decile). (e) Access
completeness 100 %: every plot and court has an access edge, 0 landlocked buildings (FTG and NG baseline: interiors
unreachable). (f) 100 % of institutions and assigned buildings sit on a plot meeting their area and frontage
requirement; the share formed by joins is reported; a whole block is taken only above the threshold; placement never
gives up; a merge followed by a split restores the original ids and geometry. (g) **One code path, checked two ways** —
provenance: every plot records which context-vector fields its split-depth, merge and class decisions read;
perturbation: raising one district's prosperity by one step lowers its plot count, raises its median plot area and yard
share and lowers its alley length per hectare together, while ≥ 95 % of entities outside that district and its
soft-seam band stay identical. (h) Seams: Δ median plot frontage, footprint area and storeys across shared streets
within band on soft seams; hard seams only where flagged (MFCG 34104 baseline). (i) The field is smooth (gradient
magnitude below threshold except at declared boundaries), its random share is reported, and a field edit persists and
replays (O9). (j) Variance floor: the coefficient of variation of plot area within any quarter stays above a set floor.
(k) The gap-width distribution has one mode per separation rule (FTG baseline: a single 1.5 m spike).

**Restraint clause.** NG's uniform terraces are its look (95–99 % attached): the dense default keeps a continuous
streetwall, and detachment is a rich or semi-rural class used sparingly — "a special type of semi-rural blocks spawned
sparingly" (141198168, verified). FTG's zonal grain gradient by growth stage (dense core → gapped rings → suburb ribbons)
stays as the baseline that prosperity modulates; keep MFCG's ribbon development outside the walls (87882877). Mixed
use, never modern class zoning: in 2017 no purely residential wards except the rich patriciate ones (Reddit 6cg1ol),
FTG's districts mix classes and keep rare outliers. Random variety around the mean (`os-wards-render.md` §6.2) — a
checkerboard of rich and poor is less plausible than gradients plus frontage-versus-rear contrast. Alleys unobtrusive at
city zoom (the visual-noise ceiling); perimeter-block courtyards stay courtyards (K3) — not every interior needs a lane.
Keep FTG's lifestyle-banded decoration (fences and lawns as the upper-class tell) on top of real grain. The one-click
path derives all of this from the size and character inputs with no extra questions.

**Dependencies.** Needs O1 (terrain: high, low, damp, upwind; water), O4 (main streets and gates), O7 (roster,
institutions, noxious trades), O5 (frontage plots), O3 (merge and split as safe graph edits), O2 (own sub-stream), O11
(ways and ids). Enables O17 (the site plan reads the band), O19 (greenery reads the field), O8 (the castle's plot), the
ASSIGN hook, S1 and S3 (seams), the sewer hook (alleys carry flow) and the EVO stage (the field moves over time).

---

### O19 · Greenery by prosperity and district type: yard planting by plot class; parks, gardens, orchards, greens and avenues by rule; typed, owned, cheap [BASE; owner ruling] — score 6.0

**Answers.**
- The owner's GREENERY ruling: rich quarters get gardens, parks and tree-lined ways, modest ones a green or an orchard at
  the edge, poor ones little; yard planting follows the plot class; the same rule family as coverage and granularity.
- MFCG GEO-8, GEO-9, REN-3 (CR, REC, OS): forests "fill all available space" (114184619) and trees fill the leftover
  "shared courtyards" (62336213) — greenery is residue plus scatter (0.13–1.37 M point tests per city, ST-2); a 2017
  patriciate ward reads as "big houses in gardens" only because `emptyProb` = 0.2 drops leaves (§6.2); parks exist only
  as a district type; Block mode silently drops trees and forests.
- FTG GEO-8, GEO-9, REN-3 (CR, REC): "wealthy districts to have more trees and other decorations" (84680671, verified) —
  the right idea, as decoration only; unused plots get lawn, trees, fences or a single well; the suburb perimeter is
  widened "to suggest gardens" (144226579); 26–29 % of in-town lots are empty and become parks, plazas or dirt by
  leftover; seven tree sprites round-robin with no minimum spacing (NN minimum 0.14 m).
- NG VC-5, K12, K14 (REC, CR): `createGreen` on 23–58 % of Normal blocks with no target — a 35-point swing at identical
  tags; the grove around an oversized landmark (70917627).
- VG G9, G8, P1, V2 (US×2 with five comments, CR ×4, REC): "the forest is creeping way close … I'd prefer larger (or
  configurable) clearings" (Allen Varney, 42144467, verified), trees "encroach on the village layout to a disturbing
  degree" (42521165), "the whole map is thickly blanketed" (50688261) — "it looks kind of more dramatic" (CR, verified);
  gardens, paddocks and orchards near the centre (Moritz Hackl, 38498864); walled orchards (Maseiken, 613514); trees
  dominated cost for years — 546–751 crowns each with its own gradient, "Trees are still VERY slow" (50688261);
  "Some" vs "Many" indistinguishable.

**Design idea.** Greenery is a rule family that reads the prosperity field (O18) and the district type (O10), never
leftover space. (1) Yard planting by plot class from the site-plan tables (O17): kitchen gardens, orchards, formal
gardens, courts, middens, pens. (2) Public greenery by rule: parks and ornamental grounds in the most prosperous band
and beside institutions (a palace or cathedral close), tree-lined avenues along tier-1 ways in rich and planned
quarters, a green or commons at the edge of modest quarters, churchyards, a market green; poor quarters little. (3)
Artificial landscapes — formal gardens, orchards, avenues, deer parks — are typed land-use entities with owners in the
schema (O11), assignable, with a lifecycle (a park built over, an orchard cleared: EVO). (4) The hinterland ring (O14)
supplies orchards, commons and managed woods. (5) Rendering: seeded blue-noise instanced vegetation with spacing and
ecology rules, crown size in metres, LOD (area fill at city zoom → crowns at district → lobed trees at neighbourhood),
never stored (O2, O12); one greenery control with monotone semantics.

**Acceptance criterion.** On B-CITY: (a) private green share per plot class and per prosperity decile is monotone
(Spearman(prosperity, private green share) ≥ 0.7), within ± 5 points of the table mean, with σ ≤ 8 points across seeds at
fixed parameters (NG baseline: 23–58 %). (b) Public-green rule satisfaction ≥ 95 % (parks in the top band or beside
institutions; avenues on planned tier-1 ways; a green at the edge of modest quarters); park and green area per 1 000
inhabitants within its band, reported. (c) 100 % of greenery entities typed and owned or common in the export; untyped
leftover green area = 0 (MFCG and NG baseline: negative space plus scatter). (d) Tree scatter: nearest-neighbour p1
above the canopy threshold and a pair-correlation function per class (FTG baseline 0.14 m); crown diameters in metres
consistent with building sizes (VG baseline: "gigantic trees"). (e) ≥ 10 000 trees within a 16 ms frame at district LOD
(VG P1). (f) The greenery control is monotone and continuous (VG V2 test). (g) City-zoom greenery passes O12's
legibility check; option couplings that drop a layer = 0.

**Restraint clause.** "Busier, but not noisier": greenery is calm at city zoom; the `grove` tag and VG's dramatic
forest are legitimate styles, kept as options; MFCG's minimalist plan with trees as a layer toggle; NG's lobed crowns and
depth-sorted trees at neighbourhood LOD (K4, K12) and the walled compound in a grove (K14); FTG's hedgerow signature and
its lawns-and-fences tell. Keep it cheap: instanced, seeded, never stored. "Poor quarters little" is a rule, not zero
everywhere — a tree by the well is charm.

**Dependencies.** Needs O18 (the field), O17 (yards), O10 (district type), O14 (the edge ring), O12 (instanced LOD),
O11 (typed entities), O2. Enables S5 close-up detail and the floating-island "very prosperous quarter" character.

### 3.2 STAGE-2 opportunities — neighbourhood composition readiness (designed now to interface depth, built after the base)

The stage-2 items answer NG's ledger and the composition demand in MFCG's and VG's threads (US×11 on NG's own threads,
US×9 in MFCG's, B3). They rank by what makes a base district open as an NG-class close-up at all (S1–S3), then by what
makes the close-up realistic and fast (S4–S6). Every one of them is an interface the base must carry now (§5.5) and a
generator that is built after the base.

| id | opportunity | answers | acceptance headline | depends on |
|---|---|---|---|---|
| S1 | Boundary and seam contract: a neighbourhood is generated on an arbitrary boundary polygon with typed edges and fixed portals; shared edges are generated once and read by both sides | NG GQ-5 (U×11), DM-3; MFCG DAT-3 (US×9); VG D5; FTG DAT-2 (the S2 unit) | portal connection 100 %; cross-seam misalignment 0 by construction; 0 dangling seam spurs; Hausdorff distance 0 for shared entities between city and neighbourhood LOD | O11, O4, O18, O3 |
| S2 | Context features inside the neighbourhood: water → quays, banks, bridges; walls → intervallum, gatehouses; slope → stepped streets and platforms; roads → portals; sky context → no roads in or out | NG GQ-6 (C: coast/cliff wished; River bank / Bridge / Port templates never built), RS-1; MFCG REN-1 (District View "disjointed") | context coverage matrix full; 0 buildings in water; bridges within ± 10° of perpendicular to flow; every feature crossing the frame continues to its edge | O1, O8, S1 |
| S3 | Seam-continuous parameter fields with hard/soft flags — both sides of a shared street read the same edge parameters | NG VC-6; MFCG GEO-7 ("Continuous", 34104, removed 0.5.5) | Δ median plot frontage, footprint area and storeys across shared streets within band on soft seams; hard seams only where flagged | O18, S1 |
| S4 | Composable context templates, functional squares and landmark-centred neighbourhoods, chosen from the district's context | NG VC-3, GQ-7, VC-4 (U×2); VG G10 | every base district type has ≥ 1 template; ≥ 90 % of squares on a tier-1 junction or before a landmark; a requested landmark delivered ≥ 99 % | O7, O4, S1 |
| S5 | NG-class close-up render tier under LOD budgets: tapered hatch, two-tone roofs and prism shadows from stored heights, cobbles, chimneys, wells, lobed trees; batched, tiled, lazy | NG SP-1, SP-2, RS-2, RS-4, K4, K12; MFCG REN-1 ("no cupolas, shadows, cobbled roads") | one district opens at neighbourhood LOD in ≤ NG's 10–96 ms at comparable counts; draw ops and uploads within budget; style regression (K4) passes; footprint hash identical to the city LOD | O12, O17, O19 |
| S6 | Stage-2 workflow: "same kind, new seed" as the default regeneration, per-district reroll with locks, a standalone one-click hood mode, nested navigation region → city → district → building in one library | NG ED-4, ED-1, UX-1, UX-3, UX-4 (U×5 building zoom) | five variants of one template in five actions; default path one action with p95 ≤ 0.5 s; rerolling one district leaves 100 % of entities outside it identical; ids, names and footprints preserved across levels | O9, O16, S1 |

**S1 · Boundary and seam contract.** *Answers:* two NG hoods can never share a street — `<template>.createShape` owns
the outline and nothing is fixed at the edge (NG GQ-5); ring radials are staggered and truncated by "an
independently-generated patch outline" (RA-4, vnd B2.3); "I can generate a 'district' of any shape this way" (CR,
49191011); districts "that can congruently fit together … and all the roads would connect" (Matt Wallis, 58808794,
verified) and ten more commenters; "Most likely, it won't be possible to reproduce a district in Neighbourhood Generator
exactly as it looks in MFCG, and it really bother me" (70917627, verified); FTG's districts are rings whose lots are not
serialised (F13). *Design idea:* the neighbourhood generator's input is a boundary polygon with holes whose edges are
typed — shared street (with centreline, width, class and the frontage line on both sides), wall with gates, water quay
or bank, open field, cliff, sky edge — plus portals (position, bearing, width, class), the district's context vector,
prosperity field values (O18) and the plot lines and alleys the base already laid (O18): the base generates a shared
edge once and both districts read it; the generator must connect every portal and must not add street ends on a shared
edge; the city-LOD blocks are the close-up's blocks. *Acceptance:* portal connection 100 %; cross-seam misalignment 0;
dangling spurs on internal seams 0; ring-truncation incidents 0 once rings are fitted to the boundary; Hausdorff
distance 0 for shared streets, walls and water between LODs; block IoU city ↔ neighbourhood above threshold; 100 % of
districts of every B-CITY city open at neighbourhood LOD. *Restraint:* keep a standalone, no-portal mode — the floating
patch with trees on its rim is charming and is exactly what a sky island needs. *Depends on:* O11 (the contract is a
schema contract), O4, O18, O3.

**S2 · Context features inside the neighbourhood.** *Answers:* "Another thing these maps would benefit from is an
occasional natural feature like a stretch of coast or a cliff edge" (58808794) — never added; the planned River bank,
Bridge, Port, Junction and Park templates (64375271) never shipped; composition abandoned for want of "rivers, city
walls" (100431269, verified); District View "often looks disjointed with pieces of rivers, roads, city walls" and has
"no cupolas, shadows, cobbled roads" (101942512). *Design idea:* the close-up consumes the base's layers as constraints
and features — slope → stepped streets and building platforms; water polygons → quays, banks, bridges perpendicular to
flow, water gates; walls → an intervallum lane, gatehouses and towers; roads → portals; the chosen district renders at
neighbourhood LOD with its surroundings at lower LOD continuing to the frame; in the sky context (floating islands) no
roads in or out and the island's own terrain. *Acceptance:* a context coverage matrix (district context × generated
feature) with no empty cell — every waterfront district has a quay or bank path, every wall-side district an
intervallum or rear-lot rule; 0 buildings in water; bridges within ± 10° of perpendicular; 0 "pieces" at the frame; a
blind preference test of close-up screenshots against District-View-style ones, n ≥ 20 raters. *Restraint:* the
context-free standalone hood stays a one-click default. *Depends on:* O1, O8, S1.

**S3 · Seam-continuous parameter fields.** *Answers:* "on one side of a street buildings are tiny and on the opposite
side buildings are huge" (MFCG devlog 34104, verified), fixed by a `Continuous` blend and then removed; NG has no
neighbours, so the problem is latent until composition (VC-6). *Design idea:* O18's fields do the work — per-district
values plus interpolation near seams with a per-boundary hard/soft flag (hard at walls, rivers and planned breaks);
both sides of a shared street read the same edge parameters; the close-up inherits the field, never re-rolls it.
*Acceptance:* across every shared street the difference in median plot frontage, footprint area and storeys stays
within a set band on soft seams; hard seams only where flagged. *Restraint:* contrast between quarters is realistic (a
patrician square beside a tanners' lane) — keep hard seams where the city model says so. *Depends on:* O18, S1.

**S4 · Composable context templates, functional squares and landmark-centred neighbourhoods.** *Answers:* only area,
street, square and ring execute (NG VC-3); squares are shapes, not places — Urban Places needed "more right angles" and
a monument at the "nexus" "to look more like planned features rather than random empty spaces" (139540343); landmarks
"look like temples more than I'd like. Also their shapes are not diverse enough" (64375271, verified); "generate areas
around a central landmark" (Tubal); VG's one distorted circle — "I didn't actually know how village squares were
supposed to look" (80494491). *Design idea:* templates as data — seed features (spine street, plaza, ring, bridgehead,
gate approach, quay, market crossroads, "around a landmark") plus constraints — chosen automatically from the district's
context or requested; squares typed by function (market, church forecourt, well square, bridgehead, crossroads) placed
by rule and sized in m² from the population they serve; landmarks by function from the base's roster (O7) with
compounds from O17. *Acceptance:* every base district type has ≥ 1 template; distinct morphologies separable by
generated statistics; ≥ 90 % of squares on a tier-1 junction or in front of a landmark; square area per 1 000
inhabitants within band; a requested landmark delivered ≥ 99 %; rule satisfaction ≥ 95 %. *Restraint:* a template is
"seed geometry + how many sub-areas to hand to the generic bisector" (CA-2) — keep them that cheap; keep NG's square as
a void in the fabric beside planned ones; landmarks rare. *Depends on:* O7, O4, S1.

**S5 · NG-class close-up render tier under LOD budgets.** *Answers:* rasterising costs more than generating (73–111
ms), hatch triangles are 55–80 % of draw ops, up to 528 GPU uploads per map, `Details` doubles as a speed lever
(70917627), a 20 000-building city at NG rates ≈ 1.7 s per redraw (SP-1, PLAUSIBLE arithmetic); heights are a rendering
constant so shadows and 3-D disagree (RS-2); "a whole city drawn like this … would look too visually noisy"
(58808794, verified). *Design idea:* the neighbourhood LOD of O12's display list — tapered-triangle roof hatching,
two-tone roof faces and prism shadows driven by the stored heights (O17) and the shadow-layer hook, cobbles, chimneys,
wells, fountains, lobed depth-sorted trees (O19) — batched and instanced per layer, cached per district tile, generated
lazily from the district's sub-seed when first viewed at that level, with per-LOD detail budgets set by zoom and
hardware instead of one `Details` switch. *Acceptance:* time to open one district at neighbourhood LOD ≤ NG's 10–96 ms
at comparable building counts; ms per building for generation (NG 64–75 µs) and rendering (≈ 85 µs) as the bar; draw
ops per frame and GPU uploads within budget (NG baseline 528 uploads, hatch 55–80 % of ops); the K4 style regression
(per-wing op mix and colour laws) passes; shadow length ∝ stored height (r ≥ 0.99); footprint hash identical to the
city LOD; city-zoom legibility unchanged with the tier on. *Restraint:* the hand-inked tapered hatch, the "fake" gables
over correct hips (K5), subtle optional shadows; no oblique or 3-D default view ("not very readable", "10x more
polygons", 114858238). *Depends on:* O12, O17, O19.

**S6 · Stage-2 workflow.** *Answers:* Enter with random tags re-rolls the template (H10.3); nothing but the name can
be edited and the whole model and view rebuild on every Enter (ED-1); users hop generators for a region → city → floor
plan "zoom" with lossy hand-offs — "Cities really seem to need two different levels of Zoom" (T Mexx), Procgen Mansion
"approximates irregular polygons with squares" (70917627); NG was abandoned because "I can't see how it can be useful
for anything" (58808794) while nine users described campaigns run in it (H9 U9). *Design idea:* "same kind, new seed"
as the default regeneration and "surprise me" as a separate action; per-district and per-block reroll with the entity's
own sub-seed and locks (O9); a standalone one-click "urban location" mode for users who want a lone place; nested
navigation inside one library, each level derived deterministically from the level above plus its sub-seed, footprints
identical across levels. *Acceptance:* five variants of one template in five actions (NG baseline: a Tags-dialog or URL
detour); default path one action with p95 ≤ 0.5 s for a medium hood (NG UX-4); rerolling one district or block leaves
100 % of entities outside it identical in id and geometry; information preserved across levels (ids, names,
footprints) 100 %; 0 hops outside the tool. *Restraint:* do not force every user through a city first. *Depends on:*
O9, O16, S1.

### 3.3 VILLAGE-LATER items — not precluded, not paid for

The village (THORP → HAMLET → VILLAGE) is a separate later product. These three items are recorded so that the base's
model does not rule them out; they are checks on the base, not requirements of it.

**V1 · One engine across the ladder, downward.** *Answers:* "villages with 15K population should be generated in MFCG"
(38498864) and VG exists because "The smaller the town, the less it resembles anything real" (35854256); the
single-highway village is the common case and a through-highway is "atypical" (84106820); "lonely houses" as
farmsteads (57968729); MFCG VAR-2 and FTG VAR-3 carry the VG-np tag. *Not-precluded check on the base:* the O4 two-tier
network admits a backbone of one road with deliberately partial driveways (VG's "like modern suburbia" rule, 104226049);
the O17 class tables include cottage, farmstead and detached-in-yard; the O6 size ladder is open below TOWN and the
one-click default at small sizes is not a walled circle; model time is near-linear in building count (VG P3). *Restraint:*
the village feel must survive the city machine — a generator that neither does "so little" nor "too much" (rizen,
110526365).

**V2 · Rural land-use detail.** *Answers:* VG G8 ("quite messy", verified), G9, R4, S4, V3 (livestock, wells, "dirty up
the place", scott2020), Moritz Hackl's Rundling, commons and paddocks (38498864). *Not-precluded check:* O14's land-use
rings, field-system presets, farmstead-by-fields rule and typed ground cover are the substrate; the per-capita tables
are keyed by era and region with provenance, so a village preset is a data file.

**V3 · Village character, lordship and circumstances.** *Answers:* VG C2 (a manor or fiefdom, motte-and-bailey,
walled orchards — US×4), C3 (ruin as a state, expansion beyond the walls), V3 (biome, season, day/night), G7 (a simple
palisade default), G2 (rectangles and roundhouses as class options). *Not-precluded check:* O10's circumstance presets
and O17's class tables are data; O8 supports a palisade or simple enclosure as a cheap default; the EVO lifecycle
gives ruin as a state; O19's "grove" option keeps VG's dramatic forest. *Restraint:* not every village has a lord; keep
VG's terrain-and-water-as-one-picture, its single density field, its one-page composition and its independent tree
stream (VG §3).

## §4 Things the references get right that a rewrite usually breaks

Merged from MFCG §14 (12 items), FTG §14 (19), NG K1–K14 and VG §3 (12): a property appears here when two or more
references keep it for the same reason, or when one reference's loss of it is a recorded regression. Each carries a
keep-test the architecture and the validation lanes must run; losing any of these is a regression even if every
opportunity above is delivered.

| # | property | evidence | keep-test |
|---|---|---|---|
| R1 | **One click to a believable map in a fraction of a second.** "it never takes longer than a fraction of second to generate even a large city" (MFCG devlog 34104, verified); NG 10–96 ms per hood; VG 240–330 ms including rendering; FTG "ready in seconds" (≈ 3 s server). | MFCG §14.1/.6, NG K10/UX-4, VG §3.1, FTG §14 (front door) | default path = 1 action; model within the O3 budget per size class; p95 time to first map ≤ 1 s at TOWN, ≤ 0.5 s for a medium hood; no questionnaire before the first map |
| R2 | **Legibility first**: the minimalist inked plan, one ink for every outline, 4–8 colour roles, casing + core ribbons, negative-space streets; "busier is fine; noisier is not". | MFCG §14.2/.10, NG RS-4, VG §3.5 | city-zoom legibility check (O12); minimum luminance contrast on 100 % of styles; detail appears only as you zoom |
| R3 | **The organic fabric**: T-junction dominance, the bent cut with one bend near 0.5 and right-angled arrival, the OBB axis; shared courtyards, uneven streetwall, partly built frontages; crossroads rare ("places without this tag look better", 139540343, verified). | NG K1–K3, MFCG §14.4, VG §3.4 (tracker curves) | K1/K2 statistics within the measured spread on 1 000 seeds per template; 4-way share > 0 and < 15 % in organic districts; a front-line jitter parameter exists |
| R4 | **Continuous streetwall with party walls in dense cores, and a zonal grain gradient by growth stage.** NG 95–99 % attached, 39–43 % of perimeter; MFCG's Lots mode; FTG's warehouse and industry rows; FTG's dense core → gapped rings → suburb ribbons; MFCG's ribbon development outside the walls. | NG K13, MFCG §14.11, FTG §14.16/.19 | attached share ≥ 90 % in dense and poor classes; streetwall continuity ≥ the references' on dense frontages; the zonal gradient reported and monotone with growth stage |
| R5 | **Random variety around the mean, mixed use.** "a craftsmen ward doesn't consist entirely of workshops" (1579); FTG's mixed districts and rare outliers at weight 0.02; the skewed `minSq` draw gives the occasional grand house. | MFCG §14.5/.12, FTG §14.7, NG PG-1 risk | CV of plot area within any quarter above a floor; venue-mix entropy per district above a floor; no single-use district except by request |
| R6 | **Walls, towers and a castle as the signature silhouette**, on by default; FTG's historically staged wall; VG's cheap palisade. | MFCG §14.3, FTG §14.6, VG G7 risk | walls in the default request at TOWN and above; wall legible at city zoom; a wall traced in ≤ the O3 stage budget |
| R7 | **Every building has a purpose and people, consistently** — "If I see it, I can go there"; legible ratio rules ("1 farm per 25 people"); lifestyle-banded pools with rare outliers; sub-locations with purposes. | FTG §14.1/.7, NG SC-1 contrast | 100 % function and occupancy; the same person on every view across sessions; ratio rules readable in the data tables; rooms exist for every simulated building |
| R8 | **Broad strokes and fine control in one tool** — generation, hand editing, regenerate-area and bulk edits coexist and the fast path never pays; MFCG's context menu and Shift/Ctrl-click idioms; VG's layer toggles and "tag versus hide"; an independent tree stream. | FTG §14.3, MFCG UX-1 risk, VG §3.7/.8 | every improvement ships behind defaults; regeneration scope is the user's choice; per-layer reroll isolation (rerolling layer L leaves every other layer byte-identical) |
| R9 | **Determinism and replayability.** NG byte-identical across page loads; MFCG's printable, replayable attempts; VG's deterministic permalinks within a build; one-line permalinks for unedited seeds. | NG K9, MFCG §14.7, VG §3.11 | model hash identical across machines; a permalink replays its version; every attempt reproducible from its printed sub-seed |
| R10 | **Real units and furniture where they exist**: metre-labelled parameters, a ruler, a scale bar, a 2 m / 5 ft grid, a unit toggle, integer centimetres centred on (0,0). | FTG §14.4, VG L2 (Urban Places' later fix) | O6 (a)–(c) pass; furniture toggleable |
| R11 | **Water and terrain as one picture**: "course first, carve the terrain", "relief follows rivers", contours never cross a shore, one density field (VG); coast craft — beach/rock/cliff classes, the "ease into detail" envelope, rivers bridged and oceans terminal, desert fields hugging rivers (FTG); the river through the town (MFCG 0.6.0). | VG §3.2/.3, FTG §14.9, MFCG ROB-1 risk | contours cross water 0 times; the river runs through the core in the default river request at ≥ the MFCG rate; coast classes present; no meander or erosion simulation |
| R12 | **Repair over rejection where cheap; tiered failure handling; landmark substitution for a degenerate block; fix causes, validate at the authoring boundary; make the rejection unit small where rejection is likely.** | MFCG §14.8, NG K6, FTG §14.8, VG §3.6 | the fallback ladder includes substitution and is logged; whole-map restarts 0 while local repairs are counted; authoring-boundary validation present |
| R13 | **Style as data, one geometry many looks**: palettes and presets (MFCG; VG's twelve styles over one seed; NG's six presets; FTG's everything-is-user-data); selective outlining; soft lights and single-pass shadows (VG); tapered hatch, two-tone roofs, fake gables (NG); lighting, day/night, seasons, weather, hedgerows (FTG). | MFCG §14.7, VG §3.5/.10, NG K4/K5/K8, FTG §14.10/.13/.15 | palette file round-trip; ≥ 6 presets including ink and lit; style regression per LOD; the renderer survives no fills and no outlines; shadows and relief optional and off by default |
| R14 | **Storage economy and rendering tiers**: a 593 KB city with its whole population, lazy person details, the family-unit relation model, area-filled forests, tiered defaults for weak devices; MFCG's per-ward cache. | FTG §14.11/.12, MFCG PERF-1 | stored bytes per 10 k population reported; roof computations per frame after warm-up 0; a low-end tier exists and the top tier is cheap, never mandatory |
| R15 | **A small visible control surface**: tool count as a budget; a small tag vocabulary; "I do want to keep it abstract"; no forced social assumptions; explanatory documentation with context-aware links; honest, small, frequent releases with named known defects; presets as data files. | MFCG §14.1, VG §3.12/V2 risk, FTG §14.14/.15, NG K7 | an advanced panel behind the defaults; 100 % of parameters documented; a new template or preset is data, not code; the release notes name known defects |
| R16 | **Names conditioned on the map's features** (MFCG §9; VG's tags feed the names; FTG's folk-contraction charm); the title in the emptiest corner; small life details at close zoom only (chimneys, wells, pins, depth-sorted trees). | MFCG §14.7, VG §3.9, NG K11/K12, FTG LAB-2 risk | name–feature consistency 100 %; K11 in standalone mode; K12 present at neighbourhood LOD and absent at city LOD |

**Improvements deliberately NOT proposed** (each references rejected them, or their charm depends on the absence):
no oblique or 3-D default view ("not very readable", "10x more polygons", 114858238); no correct-hip roofs by default
(K5); no grid-like `RIGID` default (139540343); no always-on labels or shadows; no meander or erosion simulation
("apophenia works better than detailed simulation", 41103311); no heavy GPU pipeline for its own sake (MFCG PERF-1);
no questionnaire before the first map; no single-use zoning; no forced FTG-scale simulation in the one-click path (VG
C1); no hard-coded culture or era (22717).

## §5 The split the architects are held to

**Rule.** For every MUST-HAVE below the architecture must name a mechanism that would work (not a feature line) and
adopt the opportunity's acceptance criteria into its improvement matrix; a must-have without a mechanism, or with a
criterion it cannot run against B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM, is a validation failure. Should-haves need
a mechanism and a place in the build plan; later items need only the hooks in §5.4. Where MFCG-style and FTG-style
approaches conflict inside any item, the owner's tiebreaker applies: explicit constraints and precise, real-unit
geometry with measurable statistics — with legibility and one-click use as a floor, never as the tiebreaker.

### 5.1 BASE — must-have (parity floor, owner base rulings, dependency spine)

| id | must-have | why it is a must, not a should |
|---|---|---|
| O2 | Deterministic recipe: versioned blueprint, stable hierarchical ids, hash-derived sub-seeds (stage, entity, concern, attempt; epoch sub-streams reserved), seeded decoration | everything else keys on it; parity with NG/MFCG determinism and beyond FTG's `seed: null`; the ASSIGN and EVO hooks are ids and sub-streams |
| O6 | Metres end to end, per-class distributions in provenance-carrying tables, size as population/area/buildings on the TOWN → CITY → METROPOLIS ladder, statistics record per generation, scale bar / north arrow / grid | the tiebreaker (precision) and the corpus phase; FTG parity (its ruler, grid, units) |
| O3 | One robust topology-and-geometry kernel with typed results, bounded fallback ladders, no whole-map restarts, post-stage invariants, generation report | both base references crash, hang, restart or ship duplicates today; every geometric opportunity depends on it |
| O11 | One versioned schema and entity registry (settlement → district → block → plot → building → room; ways, walls, gates, towers, water, terrain, land use, greenery, people, layers), containment complete, references by id, round-trip native export, GeoJSON/SVG/PNG views, headless embeddable API | the library boundary the roadmap requires; FTG DAT-2's 53 % containment and VG's palisade ghost are parity failures to design out |
| O1 | Terrain and hydrology first: heightfield in metres, flow/accumulation/outfalls queryable, rivers by descent, explicit water types, one closed-outline routine for coasts, lakes and islands, land as multi-component from day one | 0 restarts needs water before the mesh; the sewer and island hooks need drainage and outlines; the most-repeated FTG request (US×7) |
| O4 | Two-tier street network: destination-driven, cost-surfaced, staged backbone (FTG-class) with MFCG/NG-class bent-cut infill; ways as entities with class and metric width; junction rules | the fusion core; the EVO hook needs growth; the road-first prototype's rejection ("merging … problematic") is the risk criterion (f) guards |
| O5 | Frontage-first typed plots in metres with access edges, corner and wedge rules, typed residue, no silent discard | the stage-3 input; the triangle/sliver/hourglass class of defects in all four references |
| O18 | Prosperity field (drivers + controlled chance, smooth, banded only where needed, editable, time-movable) and one plot-granularity law: joins, splits, institution claims before the fabric, alleys and back lanes as typed ways, seams as fields, variance floor | owner rulings (PLOT GRANULARITY, PROSPERITY); FTG 441 m² for every class and NG's Moran's I ≈ 0 are measured failures |
| O17 | Plot model: owned parcel with 0..n footprints and a typed yard, per-plot site plan (row / set-back compound / detached / hovel) from data tables, footprints and yards drawn — never the plot — heights (floors, eave, ridge, tower) on every building and a shadow-layer hook | owner rulings (PLOT MODEL, HEIGHT); the stage-3 interface's outer layer |
| O7 | Content-first land use: a roster from data tables (our own values), the per-plot context vector, rule-based siting, a bounded plan–fit–reconcile loop, population as an input, typed open spaces, rule-placed landmarks, a gazetteer, people derived lazily from building ids and pinned once seen | FTG parity ("every building has a purpose and people"); the context vector every other rule reads |
| O19 | Greenery by prosperity and district type: yard planting by plot class, parks/gardens/orchards/greens/avenues by rule as typed owned entities, instanced seeded rendering | owner ruling (base); same rule family as O17/O18 |
| O8 | Fortification as a network: trace on defensible ground from a growth stage, gates exactly on arterials, towers by rule, castle sited by score on a joined plot, several enceintes, lifecycle for conversions | MFCG parity (its signature) plus the two references' measured gaps (ungated crossings, sealed cities, castle = a cell); the EVO hook |
| O12 | One semantic display list with LOD (city → district → neighbourhood → building), retained rendering, style as data with an ink preset (default) and a lit FTG-like preset, layer concept (underground / ground / sky) with z-order and toggles, shadow-layer hook, option-interaction tests, one renderer for screen and every export | MFCG's "big flaw" (zoom), stage-2/3 readiness, the owner's default-look ruling |
| O9 | Persistent document: blueprint + ordered edit log on stable ids + lifecycle state; locks; faithful scoped regeneration with the original sub-seeds; undo/redo; import of our own export | "everything is editable" (owner); the largest MFCG asks (B2, B6) and FTG's "cannot be undone" |
| O16-core | The generation report surfaced in the UI and API; explicit "Regenerate (keep settings)" / "Adjust" / "New random" / "Same kind, new seed"; honest controls (auto-resolved values reported; monotone semantics); no hidden state | cheap, and O3's evidence needs a reader; the seed shown is the seed that produced the map |
| O13-core | Curved area labels on hole-aware spines that never cover protected features; scale bar and compass; names conditioned on the model with an original grammar; per-entity rename that persists | MFCG parity (curved labels, legend) with its measured defects removed |
| O14-core | A hinterland sized to the population (farmland per capita, woodland by distance, every land component used) and a context margin so roads leave to destinations and rivers enter and exit | MFCG/FTG parity (farms, forests, fields modes) with the "not enough farms" and "end at the frame" failures removed |

Milestone 1, "a viewable MFCG/FTG-class town" (`docs/PLAN.md`), is gated by O2, O6, O3, O11 (schema + PNG/SVG), O1, O4,
O5, O18, O17, O8, O12 (ink preset at city and district LOD) and O16-core; the base release adds O7, O19, O9, O13-core,
O14-core and the should-haves the build plan schedules.

### 5.2 BASE — should-have (in the base, may follow milestone 1)

- **O10** in full: the intent vocabulary and expansion, the district character vector as an input, circumstance
  presets, pins, the forms catalogue, the assignment input in full with the placement solver (the input *schema* and
  drift bounds are a must-have hook, §5.4).
- **O13** in full: ways named from destinations and uses, path labels with collision handling, addresses, the
  annotation layer with a separate legend, typed text templates with agreement.
- **O14** in full: land-use rings and field-system presets, farmsteads by their fields, the wildness control, semantic
  ground cover, extent from need, the supply-chain feasibility check.
- **O16** in full: seeded layout thumbnails, content previews, drafts, discoverable export, responsive editor, browser
  matrix.
- **O12** extras: relief tiers (hillshade, contours), tiled export at any resolution, print presets, the low-end tier.
- **O7** simulation module — FTG parity beyond the roster: households, relations by the family-unit model, hourly
  schedules, calendar and time, events, faction turf — as an optional module over the same ids (judgment call J-S, §7:
  parity with FTG requires it eventually; it does not gate the base's first release because its data model — roster,
  context vector, lazy derivation — is already in the must-haves).
- **O11** extras: VTT-native scene data at a declared grid scale (walls, doors, lights, regions, journal links),
  per-layer files, a compact binary encoding, an optional CityJSON-style or glTF 3-D export, a GIS-validated GeoJSON
  profile.
- **O9** extras: the opt-in upgrade that replays a recipe under a new version, re-applies the edit log and shows a
  diff.
- **O2 / O6** extras: the golden-seed suite per release with recorded behaviour shifts; the corpus-calibration
  interface for every table (a value can be replaced with its provenance updated).

### 5.3 Later (owner-gated; hooks only now)

The stage-3 building compositions (Fantasy Manor evidence, `research/findings/manor.md`, not an input here); the
sewer and floating-island add-ons; the evolution engine; a live sync and sharing service; the historical-corpus
calibration pass; setting packs for naming; host-application inputs.

### 5.4 Hooks the base must carry (must-have, zero cost when unused)

1. Stable hierarchical ids on every entity that survive regeneration and edits, and hash-derived sub-seeds per (stage,
   entity, concern, attempt) with epoch sub-streams reserved (O2).
2. A lifecycle and version history on every entity (generated / edited / pinned / assigned / built / altered /
   converted / demolished), an edit log of events, and a pipeline whose stages can run incrementally on an existing
   settlement (grow, extend, convert), with wall → road, gate → junction and suburb → district as first-class geometry
   operations (O9, O8, O4).
3. The assignment input (name, function and/or shape class; one building, one neighbourhood, N dispersed) with
   precedence over class rules and drift bounds, and a placement-solver interface (O10, O18).
4. The per-plot context vector in the data model (area and shape, frontage and road class, district type and venue mix,
   prosperity value and band, distances to centre / plaza / market / gate / wall / water, upstream-downstream position,
   slope, roster assignment, terrain) and class rules as data tables (O7, O17, O18).
5. The building-generator interface: lot polygon + access edges + context vector + assignment + the lot's sub-seed →
   a lazily generated composition with LOD outline → wings/roofs → rooms; a trivial outline builder satisfies it until
   stage 3; heights on every building, wing, tower and roof; a shadow-layer hook in the display list (O17, O12).
6. A layer concept (underground / ground / sky) with z-order, elevation, per-layer toggles, shadows and per-layer
   export; terrain drainage (flow direction, outfalls) queryable from the heightfield; the neighbourhood generator taking
   an arbitrary boundary polygon and a context (sky: no roads in or out); organic oval island outlines from the same
   coast machinery (O11, O12, O1, S1).
7. Editable, versioned rule tables and presets with a user preference layer above the defaults, every value carrying
   provenance (owner amendment 5; O10, O6).
8. Time-varying circumstance inputs as a data structure the evolution stage can drive, and the prosperity field as a
   stored, editable layer (O10, O18).

### 5.5 Stage-2 list (designed now to interface depth; built after the base)

Design now, to interface depth: **S1** the boundary and seam contract (typed edges, portals, shared edges generated once,
plot lines and alleys included) and **S3** seam-continuous fields — both are properties of the base's own data model and
cannot be retrofitted. Design to the depth needed to prove the base's model supports them, build later: **S2** context
features inside the neighbourhood, **S4** composable templates and functional places, **S5** the NG-class close-up render
tier, **S6** the stage-2 workflow. Acceptance for stage-2 readiness of the base itself: every district of every B-CITY
city carries a complete S1 contract (typed boundary, portals, context vector, prosperity values, plot lines, alleys) in
the schema — 100 % — even before any close-up generator exists.

## §6 Traceability — every ledger entry to an opportunity

165 entries (34 + 37 + 44 + 50). Every entry maps to at least one opportunity, stage-2 item, village-later item or §5.4 hook; nothing was dropped. The first id is the primary home.

**MFCG (`docs/improvements/mfcg.md`, 34)** — every entry, in ledger order.

| entry | weakness (short) | answered by |
|---|---|---|
| ROB-1 | a water constraint or geometry exception throws the city away | O1, O3 |
| ROB-2 | partial failures shipped silently | O3, O16 |
| ROB-3 | kernel breaks on concave, holed, degenerate shapes | O3 |
| ROB-4 | same inputs do not give the same city | O2 |
| GEO-1 | streets a by-product of the cell mesh | O4 |
| GEO-2 | plots ignore frontage: slivers, triangles | O5 |
| GEO-3 | fortifications = the outline of a cell set | O8 |
| GEO-4 | few water shapes; buildings overlap water | O1 |
| GEO-5 | no terrain in the layout | O1 |
| GEO-6 | scale and units cannot be trusted | O6 |
| GEO-7 | zoning weak; seams between districts | O7, O18, S3 |
| GEO-8 | hinterland is decoration | O14 |
| GEO-9 | a lot is drawn as a building; no parcel, no yard | O17 |
| GEO-10 | plot size a per-district dice roll; no joins; uniform alleys | O18 |
| VAR-1 | checkboxes plus hidden URL keys | O10, O16 |
| VAR-2 | narrow repertoire of forms | O10, V1 |
| EDT-1 | nothing saved or re-imported | O9 |
| EDT-2 | one knob change re-rolls the town | O2, O9 |
| EDT-3 | editing is vertex warping only | O9, O10 |
| EDT-4 | no growth or history (EVO hook) | O9, §5.4 hook 2, O8 |
| PERF-1 | drawing costs as much as generating | O12 |
| PERF-2 | size ceilings, no building index | O12, O7 |
| REN-1 | no zoom, no LOD | O12, S5 |
| REN-2 | streets not drawn objects; one ink | O4, O12 |
| REN-3 | style defects, silent option couplings | O12, O16 |
| LAB-1 | labels escape areas and hide features | O13 |
| LAB-2 | names are random decoration | O13 |
| DAT-1 | exports one-way, non-standard, drifting | O11 |
| DAT-2 | no context in or out; overworld links lossy | O11, O4, O14 |
| DAT-3 | city and neighbourhood are two unrelated models | S1 |
| SIM-1 | nobody lives or works anywhere | O7 |
| SIM-2 | undifferentiated blocks (S3 hook) | O17, §5.4 hook 5 |
| UX-1 | hidden features, confusing state | O16 |
| UX-2 | users finish maps elsewhere; exports fight them | O11, O16 |

**FTG (`docs/improvements/ftg.md`, 37)** — every entry, in ledger order.

| entry | weakness (short) | answered by |
|---|---|---|
| ROB-1 | geometry defects ship silently (duplicates, hourglasses, doorless) | O3 |
| ROB-2 | planarity and identity enforced piecemeal | O3 |
| ROB-3 | feasibility discovered late; give up or advice | O3, O1, O18 |
| ROB-4 | no seed, no replay | O2 |
| GEO-1 | recursive random cuts: slivers, no frontage model | O5, O17 |
| GEO-2 | 15-degree clamp, no destinations, no terrain | O4 |
| GEO-3 | no terrain at all | O1 |
| GEO-4 | fortifications thin; gates not objects | O8 |
| GEO-5 | water heuristic | O1 |
| GEO-6 | land use emergent, not rule-based | O7, O18 |
| GEO-7 | scale and extent: fixed canvas per size class | O6, O14 |
| GEO-8 | wealth is decoration, not grain; plots never join | O18 |
| GEO-9 | no alleys or back lanes | O18 |
| GEO-10 | plot is a tiling cell, not an owned parcel | O17 |
| VAR-1 | controls act on the process, not outcomes | O10 |
| VAR-2 | authored constraints cannot be input | O10, §5.4 hook 3 |
| VAR-3 | narrow repertoire of forms | O10, V1 |
| EDT-1 | regeneration destroys authored work | O9 |
| EDT-2 | existing towns frozen | O9 |
| EDT-3 | semantic and bulk editing coarse | O9, O11, O10 |
| EDT-4 | no years, no ageing (EVO hook) | O9, §5.4 hook 2, O2 |
| PERF-1 | everyone instantiated up front | O7, O2 |
| PERF-2 | rendering cost gates features | O12 |
| PERF-3 | server-bound product | O11 |
| REN-1 | glyph conflicts; unclickable features | O12 |
| REN-2 | one lit style; lossy SVG | O12 |
| REN-3 | cheap statistical shortcuts visible | O19, O14, O17 |
| LAB-1 | no street names; roads not entities | O13, O4 |
| LAB-2 | generated-text bugs baked in | O13 |
| DAT-1 | exports one-way, no API or schema | O11 |
| DAT-2 | model incomplete, index-keyed | O11, O2 |
| DAT-3 | VTT integration is an iframe | O11 |
| SIM-1 | content-to-map handoff one-way | O7 |
| SIM-2 | roster counts implausible | O7 |
| SIM-3 | a building is one footprint (S3 hook) | O17, §5.4 hook 5 |
| UX-1 | no feedback, no undo | O16 |
| UX-2 | discoverability and install friction | O16, O10 |

**NG (`docs/improvements/ng.md`, 44)** — every entry, in ledger order.

| entry | weakness (short) | answered by |
|---|---|---|
| RB-1 | partition-then-reject; 42 % of leaves discarded | O5, O17 |
| RB-2 | hole-aware bisection glitchy | O3 |
| RB-3 | hairline slivers, wedge lots | O3, O5, O18 |
| RB-4 | failures silent | O3, O16 |
| GQ-1 | a tree of T-junctions | O4 |
| GQ-2 | width follows length | O4 |
| GQ-3 | building diversity thin | O17, §5.4 hook 5 |
| GQ-4 | plots lose right angles | O5 |
| GQ-5 | boundary not an input | S1 |
| GQ-6 | no terrain, water, walls, context | S2 |
| GQ-7 | squares are shapes, not places | O7, S4 |
| GQ-8 | no metric scale | O6 |
| VC-1 | character = 4 tag slots | O10, O18 |
| VC-2 | size control loose | O10 |
| VC-3 | few templates | S4 |
| VC-4 | landmarks generic | O7, S4 |
| VC-5 | greenery uncontrolled | O19 |
| VC-6 | latent seam problem | S3, O18 |
| ED-1 | no editing; rebuild on Enter | O9 |
| ED-2 | one RNG stream | O2 |
| ED-3 | saves = seed + tags | O9, O11 |
| ED-4 | Enter re-rolls the template | S6, O16 |
| SP-1 | rasterising costs more than generating | O12, S5 |
| SP-2 | no zoom | O12 |
| SP-3 | cold-start overhead | O12, O16 |
| RS-1 | context-free patch; District View disjointed | S2, S5 |
| RS-2 | heights not a model property | O17, O12 |
| RS-3 | palette schema untied | O12 |
| RS-4 | detail vs legibility and speed | O12, S5 |
| LT-1 | only a title | O13, O6 |
| LT-2 | names not tied to content | O13 |
| DM-1 | no addressable entity model | O11, O2, O10 |
| DM-2 | lots and open space not entities | O5, O17 |
| DM-3 | code shared by transplant | O11, S1 |
| DM-4 | export carries no semantics | O11 |
| SC-1 | no content | O7 |
| SC-2 | no lifecycle, no ruins | O9, §5.4 hook 2 |
| UX-1 | the purpose gap | S6, S1 |
| UX-2 | no pan or zoom; wheel rotates | O12, O6 |
| UX-3 | hopping generators is lossy | S6, O12 |
| UX-4 | one-click simplicity (restraint entry) | §4 R1, O16 |
| PG-1 | granularity one constant per hood | O18 |
| PG-2 | joins all-or-nothing | O18, O17 |
| PG-3 | alleys not a designed output | O18 |

**VG (`docs/improvements/vg.md`, 50)** — every entry, in ledger order.

| entry | weakness (short) | answered by |
|---|---|---|
| R1 | whole-map discard; seed replaced | O3, O1, O4 |
| R2 | feature interactions ship with defects | O3, O8 |
| R3 | Boolean slivers (thorns) | O3 |
| R4 | land = one region | O1, O14 |
| R5 | piers never solved | O1, O7 |
| R6 | lonely houses unplanned | O14, V1 |
| R7 | seeds not durable across builds | O2 |
| R8 | entity lifecycle ghosting | O11 |
| G1 | no lots, no streetwall | O5, O17 |
| G2 | one building archetype | O17 |
| G3 | not organised by water | O1, O7 |
| G4 | rivers decorative, not drainage | O1 |
| G5 | roads ignore terrain | O4 |
| G6 | single highway; crossroads unsolved | O4 |
| G7 | wall = post-hoc convex hull | O8 |
| G8 | fields aesthetics-first | O14, V2 |
| G9 | forests hug the houses | O14, O19 |
| G10 | open space = one distorted circle | O7, S4 |
| G11 | nothing beyond the frame | O14 |
| G12 | terrain grid fixed at 128 x 128 | O1 |
| V1 | population an output | O7, O10 |
| V2 | opaque, discontinuous controls | O16, O10 |
| V3 | narrow character vocabulary | O10, V3 |
| V4 | random styles weak | O12 |
| E1 | no layout editing | O9 |
| E2 | locality only for trees | O2, O9 |
| E3 | hide stands in for not generated | O9, O11 |
| E4 | no stable identity | O2 |
| P1 | trees dominated cost | O19, O12 |
| P2 | water extraction hot spot | O1 |
| P3 | size ceiling; hamlet/city split | V1, O4 |
| P4 | heavy runtime and draw path | O12 |
| S1 | fixed frame, screen pixels, no zoom | O12, O6 |
| S2 | style churn; print users underserved | O12 |
| S3 | fragile visual controls | O16, O12 |
| S4 | empty space fought with a vignette | O14 |
| L1 | POIs never shown | O13 |
| L2 | no scale bar, compass, grid | O6 |
| L3 | title plate only | O13 |
| L4 | naming data typos | O13 |
| D1 | JSON non-standard, incomplete | O11 |
| D2 | no committed units | O6 |
| D3 | state = seed; GET integration | O9, O11 |
| D4 | no layered export | O11 |
| D5 | no nesting across scales | S1, O11 |
| C1 | content thin and hidden | O7 |
| C2 | no lordship structure | O17, V3 |
| C3 | static snapshot, no history | O9, §5.4 hook 2 |
| U1 | features hard to discover | O16 |
| U2 | integration by linking many apps | O11 |

Coverage check: every opportunity O1–O14, O16–O19, S1–S6 and V1–V3 appears at least once above; O15 was folded into O7 and O12 (§3.1).

## §7 Deferrals, evidence gaps and judgment calls

### 7.1 Judgment calls (delegated authority; each vetoable by the owner)

| id | call | rationale | to veto |
|---|---|---|---|
| J-A | (earlier seat) read the ledgers base-first (mfcg → ftg → ng → vg) rather than in the task's `{mfcg,vg,ng,ftg}` order | had the reading budget run out, the two files the architects are held to would have been complete | none needed — all four were read in full by both seats |
| J-F | (earlier seat, kept) the fusion thesis in §1: a terrain- and water-first site model; FTG-class staged, destination-driven growth as the backbone; MFCG/NG-class bent-cut infill inside blocks; the FTG-class content-first roster reconciled through a per-lot context vector; stable ids and sub-seeds in metres; one display list with LOD | the owner's tiebreaker (constraints and precision) and evolution hook favour growth; the measured NG signature and MFCG's charm favour bent-cut infill; the creator's "merging these two techniques also seems problematic" is the risk O4 (f) guards | strike the thesis paragraph; the opportunities stand without it |
| J-R | (this seat) resumed the unlanded draft instead of redoing it: §0–§3 to O12 kept, re-read and re-verified; nothing rewritten that the evidence still supports | the RESUME RULE did not apply (no LANDED line), but redoing 62 KB of sound text would have been the waste the efficiency standard forbids; §0 records both seats' reading | none; the draft's provenance is in §0 |
| J-P | added O17, O18, O19 from the three plot-model addenda (landed 10:49–11:09, after the draft) and the greenery / height / prosperity amendments, scored them (V = 5 or 3 by owner ruling plus recorded demand; E = 5 or 4 by the number of references with executed evidence), re-ranked §3.1 and placed O17/O18/O19 in the must-have tier | the owner ruled the plot model, plot granularity, prosperity and greenery BASE requirements; three references carry executed measurements (FTG A1.1, NG PG-A1, MFCG §2 and the 2017 constants) | delete the three sections and their rows; §6 will then show eight entries without a primary home |
| J-B | relabelled B-CITY's size classes to the owner's ladder TOWN / CITY / METROPOLIS, keeping one small-town calibration rung for the MFCG size-25 recordings | the base's ladder is the owner's; the village ladder belongs to the later product | restore "small town / town / city / large city" in §2 |
| J-S | FTG's simulation module beyond the roster (hourly schedules, calendar and time, events, relations) is a SHOULD-HAVE of the base, not a must-have; the roster, the context vector and lazily derived people are must-haves | "at parity with both" requires it eventually, but the base's first release is gated by geometry, the plot model and the display; its data model is already in the musts, so nothing precludes it | move the bullet from §5.2 to §5.1; the parity red-team lens may rule this way |
| J-H | heights on every building, wing, tower and roof and the shadow-layer hook are must-have at the data-model level (O17, O12); the shadow pass itself is later | owner amendment 3 ("effectively imaginary now") | none |
| J-G | greenery rules (O19) are a must-have of the base | owner amendment 1 | move O19 to §5.2 |
| J-K | "whole-map restarts = 0" is a hard criterion of O1 and O3 rather than "rare" | terrain-first construction makes it achievable by design, and MFCG's 24 restarts in 58 attempts are the cost the owner most feels (seconds on the richest configurations) | relax to a p99 bound |
| J-M | the milestone-1 gate list in §5.1 | `docs/PLAN.md` names "a viewable MFCG/FTG-class town" as the first build milestone; the list is the minimum that makes such a town honest (plots, not painted lots) | the architects may re-cut it with a stated reason |
| J-T | numeric targets written as "within band" or "threshold" are metrics with a placeholder, not final numbers | the references give no baseline for them; the corpus phase and the validation lanes set the numbers from B-REF before acceptance runs | none — but no acceptance run may treat a placeholder as passed |

### 7.2 Evidence gaps (recorded, not filled — the standalone rule forbids new outside inputs)

- The VG itch game-page comment board was never archived (VG §0): the usual home of bug reports, so VG's user-voice
  counts are lower bounds.
- NG's JSON, SVG and PNG export schemas and limits were never recorded (NG DM-4 stays PLAUSIBLE); one export capture
  would settle it.
- NG baselines measurable on the existing 2026-09-25 vertex captures but not yet measured: detour index, 4-way junction
  share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m (NG §5). The validation lanes should
  measure them before fixing the O4 (b) and O5 (c)/(g) numbers; "NG ≈ 0" for the 4-way share is inferred from the
  cut-tree identity, not counted.
- FTG: both captured cities come from one request, so "every class gets the same grain" (O18) is shown for the default
  configuration only; FTG's determinism is untested; the anywhere-in-lot mode was not captured; other presets and sizes
  need more capture days (one settlement per IP per day).
- MFCG: the per-district parameters cannot be observed, so the absence of a wealth axis in the live build is PLAUSIBLE;
  the `Block.filterInner` reading in GEO-9 is an inference from call counts; the labelled class tables carry the
  2026-09-25 label caveat (no row used here is affected).
- Urban Places, NG's successor, is unrecorded; every NG number is itch build 11441280.
- VG build drift: 19251041 (2026-09-21) and 19365073 (2026-09-25) differ (seed 3131: 29 → 24 buildings); every VG number
  here carries its stamp through the ledger.
- FTG errata: the wall is wire type 7 (a chain in the planar graph with the towers on its nodes), not tower points only;
  `_critic-ftg.md` and `ftg-docs-params.md` (Critic-2 item 5, "7 = minor") should be updated by their owners; O8 uses
  the corrected reading.
- Alley and sliver widths are not measurable from the draw records (centrelines only); the areas of discarded NG lots
  are not drawn.
- This seat did not re-read the four critic files (the earlier seat did; the rulings are quoted in the task brief and
  cited inside every ledger entry used).
- `research/findings/manor.md` (Fantasy Manor) exists but is stage-3 evidence and was not an input here; the stage-3
  interface in §5.4 hook 5 is written from the owner's ruling and the ledgers' S3-hook entries only.

### 7.3 Deliberately deferred (documented, not bugs to re-find)

- Final numeric targets for every "band" / "threshold" criterion (J-T): set by the corpus phase and B-REF.
- The village product's own ranking (VG §4) is not re-ranked here; V1–V3 are not-precluded checks only.
- The scope of the simulation module (J-S) and the choice of 3-D export format (CityJSON-style versus glTF): the
  architects' call, to be recorded in their delegated-decisions section.
- Sewer and floating-island rule design, the evolution engine, the corpus calibration pass, setting packs and host
  inputs: later phases, hooks only (§5.4).

### 7.4 CONFIRMED versus PLAUSIBLE, in one sentence

Every "Answers" line is CONFIRMED (quoted or counted by the ledgers; 69 of the quotations re-found verbatim at source in
Appendix A; the MFCG and VG console recounts and the FTG plot census re-executed by this seat); every design idea,
ranking score, target number and cost is PLAUSIBLE until built and measured against B-CITY, B-EDIT, B-FUZZ, B-REF and
B-ZOOM.

## Appendix A — source spot-checks (executed by this seat)

Script `impr_spot2.py`, output `impr_spot2.out` (session scratchpad). Each row opens the cited raw source
(`research/patreon/<set>/<id>/post.md`, `research/devlogs/<generator>/<id>*/post.md`, `research/ftg-docs/<page>.md`, or
the archived Reddit copy under `research/external/raw/`) and searches for the quoted phrase, case- and
punctuation-insensitive. Rows M/F/N/V are the earlier seat's 33 checks re-executed; rows X are this seat's 36 checks
for the citations used from O16 on and in the plot-model opportunities. Result: **69 of 69 found at source.** (X25's
post id 45360377 is correct, but the post is filed under the `watabou-extra` collection rather than `watabou-village`,
which the VG ledger does not say; the first run missed it for that reason only.)

| # | check (who: claim) | ledger entry → opportunity | result | source location |
|---|---|---|---|---|
| M1 | creator: twisted bisection breaks on concave | mfcg ROB-3 | FOUND | `research/patreon/watabou-city/87882877/post.md:L35` |
| M2 | creator: farms not interesting | mfcg GEO-8 | FOUND | `research/patreon/watabou-city/47063541/post.md:L68` |
| M3 | creator: no save of manual changes | mfcg EDT-1 | FOUND | `research/patreon/watabou-city/102377277/post.md:L74` |
| M3b | user: permalink changed geometry | mfcg ROB-4 | FOUND | `research/patreon/watabou-city/102377277/post.md:L71` |
| M4 | creator: dimensions are a mess | mfcg GEO-6 / ng GQ-8 | FOUND | `research/patreon/watabou-city/79147510/post.md:L71` |
| M5 | creator: merging road-first + block techniques problematic | mfcg GEO-1 (fusion thesis) | FOUND | `research/devlogs/medieval-fantasy-city-generator/31287-experimenting/post.md:L20` |
| M6 | creator: no zoom, big flaw | mfcg REN-1 | FOUND | `research/patreon/watabou-city/27564017/post.md:L39` |
| M7 | creator: discontent with GeoJSON | mfcg DAT-1 | FOUND | `research/patreon/watabou-city/37407181/post.md:L90` |
| M8 | creator: seam problem / Continuous option | mfcg GEO-7 / ng VC-6 | FOUND | `research/devlogs/medieval-fantasy-city-generator/34104-053-neighbourhoods-alleys-and-buildings/post.md:L65` |
| M9 | user Heath Rezabek: X crossings | mfcg GEO-1 / ng GQ-1 | FOUND | `research/patreon/watabou-extra/49191011/post.md:L79` |
| F1 | creator: details before layout, never changing | ftg SIM-1 | FOUND | `research/patreon/ftg/127128581/post.md:L111` |
| F2 | creator: double all future front-end work | ftg DAT-3 | FOUND | `research/patreon/ftg/120828892/post.md:L175` |
| F2b | user Dylan Kennedy: custom locations baked in | ftg EDT-1 | FOUND | `research/patreon/ftg/120828892/post.md:L188` |
| F2c | user passivedragon: combat impossible | ftg DAT-3 | FOUND | `research/patreon/ftg/120828892/post.md:L192` |
| F3 | creator: hourglass buildings not detected | ftg ROB-1 | FOUND | `research/patreon/ftg/133016301/post.md:L33` |
| F4 | creator: would regularly give up | ftg ROB-3 | FOUND | `research/patreon/ftg/106664214/post.md:L75` |
| F5 | user Deahal: broad strokes or super specific | ftg restraint 3 | FOUND | `research/patreon/ftg/157283634/post.md:L82` |
| F6 | creator: no plans for a direct API | ftg DAT-1 / PERF-3 | FOUND | `research/patreon/ftg/75844005/post.md:L80` |
| F7 | creator: mountains not properly supported | ftg GEO-3 | FOUND | `research/patreon/ftg/147332188/post.md:L201` |
| F8 | guide: generator does not know which are edited | ftg EDT-1 | FOUND | `research/ftg-docs/editSettlement__regenerate_area.md:L81` |
| F9 | guide: river bending back into the ocean | ftg ROB-3 / GEO-5 | FOUND | `research/ftg-docs/createSettlement__water.md:L174` |
| N1 | creator: lost interest in NG | ng UX-1 / mfcg DAT-3 | FOUND | `research/patreon/watabou-city/100431269/post.md:L61` |
| N2 | creator: too visually noisy | ng SP-2 restraint | FOUND | `research/patreon/watabou-extra/58808794/post.md:L67` |
| N2b | user Matt Wallis: congruently fit together | ng GQ-5 | FOUND | `research/patreon/watabou-extra/58808794/post.md:L70` |
| N3 | creator: not many tools for character | ng VC-1 | FOUND | `research/patreon/watabou-extra/70917627/post.md:L115` |
| N3b | creator: cannot reproduce a district exactly | ng DM-3 | FOUND | `research/patreon/watabou-extra/70917627/post.md:L116` |
| V1 | user Allen Varney: aloof from the water | vg G3 | FOUND | `research/patreon/watabou-village/36199609/post.md:L57` |
| V1b | creator: created independently | vg G3 | FOUND | `research/patreon/watabou-village/36199609/post.md:L59` |
| V2 | creator: fail to form a streetwall | vg G1 / ng GQ-4 | FOUND | `research/patreon/watabou-extra/141198168/post.md:L21` |
| V3 | creator: trees close because more dramatic | vg G9 | FOUND | `research/patreon/watabou-village/42144467/post.md:L68` |
| V4 | creator: scale very vague | vg D2 | FOUND | `research/patreon/watabou-village/84106820/post.md:L85` |
| V5 | creator: fields overlapping (palisade) | vg R2 | FOUND | `research/patreon/watabou-village/104796798/post.md:L22` |
| V6 | creator: nothing special about the algorithms, results looked wrong | vg G7 / mfcg GEO-3 | FOUND | `research/patreon/watabou-extra/139540343/post.md:L37` |
| X1 | user T Mexx: squalid shacks (wealth grain) | ng VC-1 / PG-1 -> O18 | FOUND | `research/patreon/watabou-extra/70917627/post.md:L114` |
| X2 | user T Mexx: more alleys than green space | ng PG-1 / ftg GEO-8 -> O18 | FOUND | `research/patreon/watabou-extra/141198168/post.md:L55` |
| X3 | user Deahal: regenerated buildings too close, lining invisible edges | ftg GEO-8 / EDT-1 -> O18, O9 | FOUND | `research/patreon/ftg/157283634/post.md:L82` |
| X4 | creator FTG: poor districts super dense | ftg GEO-8 -> O18 | FOUND | `research/patreon/ftg/84680671/post.md:L66` |
| X5 | creator NG: large building takes a whole block | ng PG-2 -> O18, O17 | FOUND | `research/patreon/watabou-extra/64375271/post.md:L37` |
| X6 | creator NG: trees planted around a large building | ng PG-2 -> O17 restraint | FOUND | `research/patreon/watabou-extra/70917627/post.md:L64` |
| X7 | user Allen Varney: forest creeping way close | vg G9 -> O19, O14 | FOUND | `research/patreon/watabou-village/42144467/post.md:L64` |
| X8 | user Justa Badge: never enough farms | mfcg GEO-8 -> O14 | FOUND | `research/patreon/watabou-city/47063541/post.md:L63` |
| X9 | creator VG: roads and water end where the map ends | vg G11 -> O14 | FOUND | `research/patreon/watabou-village/37407181/post.md:L40` |
| X10 | user Kyle: lay down initial walls and district boundaries | ftg VAR-2 -> O10 | FOUND | `research/patreon/ftg/103668405/post.md:L129` |
| X11 | creator FTG: easier to manually place a castle | ftg GEO-4 -> O8 | FOUND | `research/patreon/ftg/144226579/post.md:L139` |
| X12 | creator VG: no real gates | vg G7 -> O8 | FOUND | `research/patreon/watabou-village/105215836/post.md:L25` |
| X13 | creator MFCG: castle always occupies one cell | mfcg GEO-3 -> O8 | FOUND | `research/patreon/watabou-city/41711473/post.md:L57` |
| X14 | user anonymous: 6 half finished cities | ftg UX-1 -> O16 | FOUND | `research/patreon/ftg/127128581/post.md:L112` |
| X15 | user Chris Wilson: raw JSON error surfaced | ftg UX-1 -> O16 | FOUND | `research/patreon/ftg/106664214/post.md:L160` |
| X16 | creator MFCG: labels beyond the borders of their areas | mfcg LAB-1 -> O13 | FOUND | `research/patreon/watabou-city/102377277/post.md:L17` |
| X17 | creator VG: POI descriptions would obscure too much | vg L1 -> O13 | FOUND | `research/patreon/watabou-village/38498864/post.md:L62` |
| X18 | user Pablo: names to roads | ftg LAB-1 -> O13 | FOUND | `research/patreon/ftg/112861635/post.md:L126` |
| X19 | creator MFCG: too many parameters | mfcg VAR-1 -> O10 | FOUND | `research/patreon/watabou-city/61026228/post.md:L25` |
| X20 | creator MFCG devlog: walls make a pile of polygons | mfcg restraint 3 -> §4 | FOUND | `research/devlogs/medieval-fantasy-city-generator/1579-some-answers-and-comments/post.md:L11` |
| X21 | creator VG: cannot request a specific number of villagers | vg V1 -> O7, O10 | FOUND | `research/patreon/watabou-village/56941736/post.md:L29` |
| X22 | user Javin Bond: each building a unique object | mfcg GEO-9 -> O17 | FOUND | `research/patreon/watabou-extra/103335095/post.md:L58` |
| X23 | user agnate: triangular lot as a fence | mfcg GEO-9 -> O17 | FOUND | `research/devlogs/medieval-fantasy-city-generator/1367-tiny-fixes-and-preview-of-hatching/post.md:L23` |
| X24 | creator VG: field code quite messy | vg G8 -> O14 | FOUND | `research/patreon/watabou-village/88749133/post.md:L27` |
| X25 | creator VG (post filed under watabou-extra, not watabou-village): missing bigger world looks very silly | vg G11 -> O14 | FOUND | `research/patreon/watabou-extra/45360377/post.md:L23` |
| X26 | creator FTG: farmstead driveway | ftg GEO-10 -> O17 restraint | FOUND | `research/patreon/ftg/144226579/post.md:L49` |
| X27 | creator Reddit a1wx6h: forests cut down for timber | vg G9 -> O14, O19 | FOUND | `research/external/raw/wayback-old-a1wx6h-01fc604279.comments.txt:L24` |
| X28 | creator UP: places without RIGID look better | ng GQ-1 restraint -> O4, §4 | FOUND | `research/patreon/watabou-extra/139540343/post.md:L33` |
| X29 | creator MFCG devlog: fraction of second | mfcg PERF-1 restraint -> §4 R1 | FOUND | `research/devlogs/medieval-fantasy-city-generator/34104-053-neighbourhoods-alleys-and-buildings/post.md:L68` |
| X30 | FTG guide: resources do not affect generation | ftg GEO-6 -> O7, O18 | FOUND | `research/ftg-docs/createSettlement__overview.md:L294` |
| X31 | creator MFCG: continuous streetwall / not so urban | mfcg GEO-9 / ng PG-1 restraint -> O17 | FOUND | `research/patreon/watabou-extra/141198168/post.md:L21` |
| X32 | creator UP: semi-rural blocks spawned sparingly | ng PG-1 restraint -> O18 | FOUND | `research/patreon/watabou-extra/141198168/post.md:L28` |
| X33 | user Jason DeGonia: empty fenced boxes | ftg REN-1 / GEO-9 -> O18, O12 | FOUND | `research/patreon/ftg/144226579/post.md:L149` |
| X34 | creator NG: nothing to add water/walls -> lost interest (composition) | ng GQ-6 -> S2 | FOUND | `research/patreon/watabou-city/100431269/post.md:L61` |
| X35 | creator FTG: no way to automatically regenerate settlements with new features | ftg EDT-2 -> O9 | FOUND | `research/patreon/ftg/151265004/post.md:L123` |
| X36 | user Heath Rezabek VG: benchmark build before rewrite | vg R7 -> O2 | FOUND | `research/patreon/watabou-village/117634240/post.md:L59` |

**Recorded-count re-derivations (this seat, executed).** MFCG raw console lines across all 15 captures, not
de-duplicated by (seed, size): `Unable to build a street` 50, `Unable to build a canal` 35, `Failed to make a cut` 19,
`bad poly was provided` 3 — consistent with the ledger's de-duplicated census (28 street failures in 13 of 34 cities;
21 canal + 3 bad-poly restarts; 19 skipped cuts). VG raw highway-validator lines: "The highway intersects itself" 3,
"Unfinished bridge on the highway" 2, "The highway is terminated by water" 1 — six lines for the four discarded unique
attempts the ledger counts (repeated passes of one seed log the same failure twice). FTG plot-granularity census
(`research/ftg-capture/improvements-ftg/plot_granularity_census.py`, run from the project root): 159 lines of output,
byte-identical to the landed `plot_granularity_census.out.txt`, including the 441 m² median lot for every residence
class that O18 rests on.
