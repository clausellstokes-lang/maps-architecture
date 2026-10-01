# Repair round 2 — V05 (the sky) — lane coherence/repair-V05-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V05-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 18–24.75 pw (unchanged; R2-06 (c)) — no phase gains or loses work; §8's dependency line only places Find.
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first "=== " line is
# ignored. One FILE line (docs/volumes/V05-sky.md), then 10 REPLACE blocks of leaf subsections: §1.2, §1b, §3.21, §3.23,
# §4.5, §5.6, §7, §8, §9, §13. 0 RULING REQUEST blocks. Source: the live V05 as assemble-r1 installed it (sha256
# b5f310b6269b2897…; no round-2 assemble has run). Each REPLACE body is the live subsection with count-asserted
# substitutions — generator docs/validation/coherence/work/repair-V05-r2/build.py with edits_a.py (17 substitutions, each
# tagged with its issue ids; edits.log, diff.txt); every untouched line is verbatim; `python3 build.py` there reproduces
# the blocks and V05.new.md (sha256 7617d87cff902216…).
#
# PROGRESS
# - P0 brief read whole (4 issues; ROUND-2 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r2's TOC row,
#   R2-05, R2-06, R2-08, R2-09, R2-10, R2-32, R2-34, R2-35, R2-39 and Part H · V05 read whole: done
# - P1 issue sources (verify-agree-host-r1t, -agree-proof-r1t, -agree-time-r1t, -vol-V05-V06-r1t), V01 §3.16 and §5.4
#   (with V01 r2's in-progress text of §3.16), base §11.2's `WhyAnswer` and `FieldDrivers`, base §13.2's T117/T118/T119
#   bars and take-over table, V12 r2's §2.13 pin rows, and V05 §1.2, §1b, §3.5, §3.20 (3), §3.21, §3.23, §4.5, §5.1,
#   §5.6, §7, §8, §9, §13 whole: done
# - P2 the count-asserted edit set over the live V05 (17 substitutions, 10 blocks): done
# - P3 dry run on a copy, references, doc_checks, the report, the result, LANDED: done
#
# DISPOSITIONS — 3 FIXED in the text, 1 INVALID by ruling (no block)
# - VAH-r1-15 (minor; FIX per R2-10): §1.2's hook row splits into a V10 §2.13 row (`WhyProvider`) and a §11.2 row
#   (`FieldDrivers`, `WhyAnswer.closure`); §3.21 (1) cites §11.2's `WhyAnswer.closure`; §4.5 cites §11.2's `FieldDrivers`
#   and §11.2's `FieldDrivers.terms` (both places). The same moved type in §1b's wiring row is split likewise — the
#   sky's `WhyProvider` (V10 §2.13) and the daylight term's per-island attribution, the `sources` of §11.2's
#   `FieldDrivers.terms` (producer the field's `drivers()` over the held strips, consumer §11.2's `WhyAnswer.drivers`) —
#   and §13's fix list names "V10 §2.13 and §11.2" as the homes its items closed at. `PlacementSolver.explain` and
#   `Explanation.terms` stay V10 §2.13's (the solver's explanation, R2-10).
# - VAP-r1-06 (major; FIX per R2-08): T-V5-34's head reads "(item 117; V05 §5.1; takes T117-1 – T117-8's island
#   clauses …)" and T-V5-35's "(item 118; V05 §5.1; takes T118-1 – T118-6's island clauses …)", each head saying which
#   bars have no island clause and why (T117-3's rows and T117-6's opening week: the island takes the ground's rows at the
#   view's week; T118-5's staging: V11's `SKY` row names no staging place). Each lettered clause re-running a bar names
#   it: T-V5-34 (a) T117-1, (c) T117-2, (d) T117-4 and T117-5, (e) T117-7, (h) T117-8; T-V5-35 (a) and (e) T118-1, (b)
#   T118-2, T118-4 and T118-6, (c) T118-3. To make each named take-over whole, (c) reads the bar's week (the
#   leaf-colour weeks' middle week), (d) adds the spring pond's first ice week at or before the conjured river's (T117-5's
#   still-before-flowing order), (e) runs T112-1's contrast and colour-blind checks at each season's middle week (T117-7),
#   T-V5-35 (b) adds no ground tier row's kind on an island (T118-4) and the label's keep-out (T118-6).
# - VAT1-01 (major; FIX per R2-34): V05 §5.6 (4) reads VAT1-01's text — Show gaps' units on an island are V01 §5.4 (3)'s
#   `gapUnits` over the island's arena, restating none: its districts (a class with no coverage row, or one counted by
#   district or neighbourhood); the whole island one unit for a walking-radius row (V01 §3.16; V05 §3.5 (3)); V01's
#   per-plot `households` reading for a households row — with the rest of the sentence kept, and one clause added so the
#   outline agrees with V01's per-plot gap (a per-plot row's gap the unserved plots of each district). T-V5-36 (g),
#   §3.23's Find row (the brief's "V05 §3.21's Find row": §3.21 holds none; the Find row is §3.23's), §1b's Find wiring
#   row and J-V5.89 read the same (J-V5.89 no longer names V05 §3.5 (3)'s allocation units as Show gaps' units; those
#   units stay S7b (1)'s coverage step's, unchanged).
# - VV56-r1-05 (minor): INVALID by R2-39 (c) — closed, no block. V05 §3.23's seasonal row and T-V5-34 (d) stand as
#   written ("an arid row draws no ice and no snow on an island"); the defect is fixed at rendering §8.2 (R2-39 (a)),
#   which V05 §5.1 (4)'s "snow lies on the island as on the ground" follows.
#
# RECEIVING ENDS WRITTEN (R2-05)
# - R2-09: T-V5-34 – T-V5-36 state their registrations in R2-09's form — "the `item117.season` / `item118.festival` /
#   `item120.find` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; …), written by the M6-sky seat
#   landing P3" — agreeing with V12 r2's §2.13 rows (the sky goldens (V05, T-V5-34 / -35 / -36)).
# - R2-32 and R2-35: T-V5-36's head "(item 120; V05 §5.6; takes T120-1's registration and T120-4's and T120-5's sky
#   clauses)"; (a) names T120-1 (and "every chip off" beside Clear), (d) T120-5 (each match carrying its chip's second
#   cue), (f) T120-4 (every band and layer change, an `advance` with its epochs, undo, redo, regenerate, load and
#   migration, and a chip whose last match goes staying at count 0, dark). §8's dependency line: V09's Find panel and
#   `live.find` land at M5 (Find's milestone; §16) before P3, so T-V5-36 lands with P3 at M6-sky — "a fixture provider
#   until then" removed, since no order lets P3 precede M5 (V05 §8, V05 §11 Q1).
# - R2-08 (its head rule, both ends): T-V5-18's head names "takes T119-2 – T119-5's island clauses" (scope's VAP-r1-09
#   writes the sky row's T119 column); §7's head lists every base bar V05 takes — T10-1, T13-1, T15-1, T102-2, and the
#   island clauses of T117-1 – T117-8 (T-V5-34), T118-1 – T118-6 (T-V5-35), T119-2 – T119-5 (T-V5-18), T120-1's
#   registration with T120-4 and T120-5 (T-V5-36) — "as §13.2's take-over table names them".
# - R2-06: no V05 figure is restated elsewhere by this seat; the §8 total is unchanged (above).
#
# RECEIPTS
# - Dry run (docs/validation/amendments-b/apply-blocks.py on copies of the live V05 and the rationale, the FILE line left
#   out as assemble's route.py does): 10 found, 10 applied, 0 skipped; audit 10 OK, 0 not OK; headings 62 → 62; fences
#   balanced (14 → 14); title block unchanged; rationale byte-identical; output byte-identical to V05.new.md
#   (sha256 7617d87cff902216…).
# - References (assemble-r1's refs.py on mirrors of the live set, live V05 and new V05): V05 resolved 1 994 → 2 052,
#   ambiguous 3 → 3, external 1 → 1; 9 BROKEN, all the forward cites T120-1, T120-4 and T120-5 (§7's head, T-V5-36's head
#   and its clauses (a), (d), (f)) — R2-35's ids scope's round-2 seat writes in §13.2 this round; T117-*, T118-* and
#   T119-* resolve; base and every other unit's counts unchanged.
# - doc_checks (`--doc` V05 `--heads docs/ARCHITECTURE.md`), live → new: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0;
#   C3 238 → 238 hits (227 → 227 unreviewed: common phrases and digit runs, none new); S2 254 → 260 hits (13 → 13
#   unreviewed; the six new are V05's own section pointers). WARNING recorded: "reference corpus INCOMPLETE (missing:
#   captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT
#   authoritative" — provisional.
# - Size: V05 66 710 → 67 247 words (+537, +0.8 %): the named take-overs and their completed clauses (T-V5-18, -34,
#   -35, -36, §7's head), the split hook and wiring rows, and the Show gaps reading at §5.6 (4), §3.23 and J-V5.89. No
#   narration added. The shrink band is not this round's: the growth is cited bars and one defined edge (principle (9)'s
#   guard).
#
# HAND-OFFS (for round 3's verifiers; each other end is named by a ruling and written by its own seat this round)
# - scope §13.2: the ids T120-1, T120-4, T120-5 (R2-35) — V05's nine citations resolve when scope's §13.2 lands; the
#   sky take-over row's base-bar column names T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35)
#   (VCS-10), T119-2 – T119-5's (T-V5-18) (VAP-r1-09), and T120-1's registration, T120-4 and T120-5 (T-V5-36) (R2-35),
#   as V05 §7's head names them; item 118's runs list reads "volume 5 the sky islands' pennants (T-V5-35)" (VCS-10).
# - scope §16: the M5 row names item 120's Find (R2-32 (1)); V05 §8 cites "M5 (Find's milestone; §16)".
# - T-V5-36 (b), (e) and (h) check on the islands what T120-2, T120-3 and T120-6 check; R2-35's table assigns those bars
#   to V09, V01, V08, V10 and V12, so the clauses stay the sky's own and name no bar (both ends agree as ruled).
# - rendering §8.2: R2-39 (a)'s arid rule (no snow, falling or lying, whatever the view's `weather` holds), which V05
#   §5.1 (4) and §3.23 follow unchanged.

=== FILE docs/volumes/V05-sky.md ===

=== REPLACE ### 1.2 The base hooks this volume consumes (cited, never restated) ===
### 1.2 The base hooks this volume consumes (cited, never restated)

An index of citations; the values stay at the cited home.

| home | what this volume builds on it |
|---|---|
| II.6 (the island rule, `IslandRule`, `SkyStrategy`; file f items 546, 547) | the rule at depth (V05 §2.4, V05 §3.2–V05 §3.7) |
| II.1 rule (5), V01 §2.4, V01 §3.10.3 | the sky call and the island's unit inputs (V05 §2.3, V05 §3.12) |
| §1.1 `RungProfile.layers.islands` | the rung gate (V05 §3.2 (1)) |
| §2.1, §2.2 (file f items 203, 204) | the island's arena, roles and void face |
| §2.3 `Terrain`, `WaterBody.fall` (file f item 252) | the island's terrain and conjured river (V05 §3.8) |
| §2.5 (file f items 213, 286) | the sky allocation, the landing rows and yards, the context vector, the rim strip |
| §2.7 (file f items 244, 245, 251–253, 575) | the records this volume declares and the ones its landfall writes |
| §2.8 (the registry; the suppression's two record forms, file f item 260), §2.9 (`Document.nextSkyPart`; the shade basis on load, item 274) | identity, the removal's hold and its lift rule, the load path |
| §3.2, §3.4, §3.7 | the lattice, the kernel's buffer and simplification |
| §4.1 (SKY in the stage graph and its data keys, file f item 282), §4.12 | V05 §3.1 |
| §4.2 S0, S1 (1)–(5), S3 (2) and (8) | the `magic` circumstance and relief classes, the outline routine, rivers by descent, crossing sites; the reservations an institution island leaves (item 286) |
| §4.3 (file f item 290) | the raised parts SKY reads; the accesses' obstacles (V05 §2.3b, V05 §3.22) |
| §4.5 *Fields*, S7b (1), (5) (file f items 295, 296) | the supplies, the fill, the strips' fold (V05 §3.3, V05 §3.5, V05 §3.19) |
| §4.6 (the landing attach as an infill destination, file f item 299) | V05 §3.10 (4) |
| §4.7 S10–S11, S10b, *Light sources* (file f items 307–309) | levelled ground, the landing plots, the route, the lights |
| §4.8, §4.9 (the churchyard row; the rim-walk row, file f item 313) | bridges on the island's river; burial; the rim walk |
| §4.11 (file f items 320, 322) | V05 §3.15, V05 §3.16 |
| §5.1–§5.3 (the F-SKY rows and the sky invariants, file f item 331) | V05 §3.17 |
| §6.1, §6.2, §6.3 (`island.place`, the hash, the anchor table; file f item 476) | V05 §3.18, V05 §2.5 |
| §7.1–§7.8 (file f items 356, 375, 383, 387) | V05 §4 |
| §8.1, §8.2, §8.4, §8.8 (file f items 408, 415, 416) | V05 §5.1–V05 §5.3 |
| §9.1, §9.2; §11.1 (file f item 415) | V05 §5.4, V05 §5.5 |
| §11.2 (`FieldDrivers`, `WhyAnswer.closure`) | the daylight term's per-island attribution and the rim's `sheer` closure in the clerk's island answers (V05 §4.5, V05 §3.21 (1)) |
| §12, §13.2, §13.3, §14, §16 (file f items 476, 568) | V05 §6–V05 §8 |
| items 102–120 of `docs/AMENDMENTS-2026-09-28g.md` as the coherence pass applies them to the base | their island parts (V05 §1.1 items 13–18) |
| §2.9's view state (the year position and its follow flag, the festival display, the view key `find`), §7.7's DR42 and DR43, §8.2's season and festival rows, §11.1, §11.2's gazetteer under knowledge admission, §12.1's comfort level and §12.5 (items 117–120) | the island's seasonal look and its pennants (V05 §5.1), Find on Sky (V05 §5.6), the exports' looks (V05 §5.5), the one-time waits (V05 §6) |
| V01 §2.3, V01 §3.1, V01 §3.2 (5), V01 §3.5.5, V01 §3.8.2, V01 §3.14, V01 §3.16, V01 §3.17.7 (2) | the hooks S7c and S9b, `DistrictContext.shade`, χ̃'s supply term, `hood.constants.sky.plotShare`, `skyDistrictCount`, `plantRimWalk`, `terraceState` |
| V02 §2.6 (`DeckContext`), V02 §3.15.2 (the stack envelope), V02 §3.16 | the caster ceiling, the surface top, deck plots |
| V04 §3.5.0a (9) (`ruin.node`), V04 §3.5.1 (3), V04 §3.10; V04 §2.3 `CatacombRule.count` | the clerk's node line; the catacomb count; the landfall's members read by the access closures |
| V06 §2.1 (`EpochParticipant`, `EpochOps`, `EpochScope`), V06 §2.8, V06 §2.12, V06 §3.2, V06 §3.4, V06 §3.5.2, V06 §3.7.5, V06 §3.8.1, V06 §3.19, V06 §6.8 | the island's two participants, the household channels, the landfall's clearance and repair, an `advance`'s comfort estimate over the islands |
| V08 §2.6 (the deposits row), V08 §3.5 (the site latitude) | the node term; the sampler's latitude |
| V09 §2.7, V09 §4.2 (the working layer), V09 §4.9 (the `bend.*` rows), V09 §4.20.3, V09 §4.20.9, V09 §4.21.9 (the progress view), V09 §5.4, V09 §6.4; V09's Find panel and its `live.find` provider (item 120) | the Shade view, the island's bends, the delete row and suppression card, the progress shown past one second, Find on Sky |
| V10 §2.13 (`WhyProvider`) | the clerk's island answers (V05 §4.5) |
| V11 §3.1 (rows 51 and 56), V11 §3.5 (the institution classes), V11 §3.9 (district kinds), V11 §3.24.0 (the switch table), V11 §3.25.6 – V11 §3.25.8 (the season, festival and quality-spend rows) | the tables this volume's rows join; the looks' and the waits' rows it reads |
| V12 §2.8, V12 §2.13, V12 §3.7.6, V12 §3.7.8, V12 §3.9.1, V12 §3.11, V12 §3.15.9, V12 §3.15.10 | the register, the pins and their registrations, the M6-sky sitting, the wait timer, Find's measurements |
=== END ===

=== REPLACE ## 1b Wiring table — every new piece, what feeds it and what it feeds ===
## 1b Wiring table — every new piece, what feeds it and what it feeds

Every state field this volume adds or gives a producer — the island and access records' fields, the shade basis, the
strips, the rim strip and claims, the landing rows, the landfall's writes, the hand-over's reservation fields — is wired
in V05 §2.6, whose create and read columns name its producer and consumers and whose rows name the base hook (the
staged records are declared in §2.7's staged block as V05 §2.1–V05 §2.2 give them, built by this volume). The
table below wires every other piece.

| piece (home) | fed by (producer) | feeds (consumer) | base hook |
|---|---|---|---|
| the gate result `skyGate` (V05 §3.2 (1)) | `recipe.layers.islands`, `RungProfile.layers.islands`, the `magic` circumstance DR27 derives from `site.magic` | S7b (5)'s slot draw; §7.8's control state; the report | II.6 (1)–(2), §7.7 |
| the slot draw (V05 §3.2) | `island.place`, II.6 (4)'s chances, `h_town`, the forced slots, `recipe.params['islands.count']`, the held slots | the reason draw (V05 §3.4), the fill (V05 §3.5) | II.6 (4), §4.5 S7b (5) |
| `S_town` (V05 §3.3) | field pass 1 over built district cells; at an epoch the re-evaluated field's island-free value | `h_town`; `SkyIsland.supply.town`; `IslandEpochStep` | §4.5 *Fields*, II.6 (3) |
| the node term of `h_town` (V05 §3.3) | the digest's `site.deposits` (a `magical_node` `available`, or `discovered` from the next epoch) by V08 §2.6's deposits row; `IslandRule.node.bonus`; for the clerk alone, the report's `ruin.node` line (V04 §3.5.0a (9)) | `h_town`; the clerk's `why`; the CSV | II.6 (3) |
| `S_carried` (V05 §3.3) | the carried households' bands and `FieldBands.cuts`; an institution row's `requirementBand` | `h_carried`; `SkyIsland.supply.carried`; the island field (V05 §3.11) | §4.5 bands, II.6 (3) |
| the rule table `islands.json` (`IslandRule` with `CarryRule`, `IslandInstitution`, `SkyAccessRow`; V05 §2.4) | its defaults; `editTable` (§7.6); M6-sky's P0 run for the three ⟨P0⟩ cells (V05 §8) | every mechanism of V05 §3 that cites a cell; the register (next row) | II.6's `IslandRule`, V11 §3.1 row 56 |
| the calibration register entries of `islands.json`'s calibratable columns and of `lights.json`'s `radiusMarginM` (V05 §8) | the seats landing P1 and P2, by `plat calibrate register --defaults` with their `--milestone` (V12 §3.11's default line; no line of this volume's own, J-V5.80) | `plat calibrate register --check` (T-V12-20) at P1's and P2's exits; V12's register report; the corpus stage, which closes the island columns `fixed` "no admissible frame" | §13.7, §13.9 (V12 §3.11) |
| the institution rows and their `handover` and `archetypes` columns (V05 §2.4) | the table; the roster's demand (S2), `Government.kind`, the dossier's institutions (DR9, DR24), a custom institution's resolved archetype (item 104 (a)) | the reason draw (V05 §3.4); the claim (V05 §3.10 (5)); S10b's placement of a hand-over instance (V05 §3.5); `SkyUnitInput.context` | II.6's `institutions` column; §4.2 S3 (2), (8) |
| `IslandRule.carry` (V05 §2.4) | the table; item 107 (a)'s balance profiles, item 103 (a)'s EMITS and NEEDS, item 105 (h)'s `split` rows, the active chains (item 104 (b), `activeChains[]`) | the sky fill: what never goes up, what goes up by share, what may split (V05 §3.5 (3)) | §4.5 S7b (5) |
| the sky `Allocation` (V05 §3.5) | S7b (5) under the supply law | the unit run's S7b split, S10a and S10b; S7b (1) (the remainder, with the island's coverage units) | §2.5 `Allocation`, §4.5 S7b (1), (5) |
| the island's coverage units (V05 §3.5 (3)) | item 103 (f)'s coverage rows; the island's district count by `districtHa`; its carried households | the fill's carried workplaces; S7b (1)'s coverage step | §4.5 S7b (1), (5) |
| the island arena's L0 — outer ring, void face, land face, `rim` chain, water faces (V05 §3.8) | SKY's island L0 batch | the unit run (its land face), the rim's draw, the resize, exports | §2.2 rule 1 |
| the island's `Terrain` with the echo (V05 §3.8 (3)) | S1's machinery on the island's key, the ground's relief class and river | the island's context vector, the surface layer, glTF, the conjured river, `levelledGroundCm` on the sky key (its raster fallback) | §2.3, §4.2 S1 |
| the conjured river, a `WaterBody` with `fall` (V05 §3.8 (4)) | S1's rivers by descent on the island's key | its crossing sites, built by the unit run (V01 §3.10.3 (4)); the waterfall mark; `dist.water`; exports | §2.3 `WaterBody` |
| `skyUnitInput(doc, island)` → `SkyUnitInput` (V05 §2.3; derived, never stored) | `@plat/sky`, from the committed record, arena, claims and allocation | volume 1's unit runner (V01 §3.10.3) — at generation, and after generation for `raiseIsland` and New random on the island | II.1 (5), II.6's `SkyStrategy`, V01 §2.4 |
| `undersideTiers(island)` (V05 §3.9 (2); view data) | the island's `underside`, rim, anchor and elevation | the slab list (V05 §5.3), the offset view's silhouette, glTF's underside; with `rough: false` over the shade basis, the strip's solid (V05 §3.19 (2)) | §8.4 (a) |
| `islandShadeStrip(doc, island, samples, onto)` and the island's `shadeSky` (V05 §2.3a, V05 §3.11, V05 §3.19) | the caster's and receiver's `shadeBasis`, the unlevelled receiver heights (§4.7 S10–S11, file f item 309), §4.5's model sampler — once per shade evaluation (V05 §3.19 (6)) | the readers of V05 §2.3a's *Where it lives*; T-V5-19 – T-V5-21 | §4.5 *Fields* (v) |
| `skyRoute(doc, from, to)` (V05 §3.20 (1)) | both arenas' class distance rasters, each admitted access's run, `routing.transferM`, the island's land centroid | S10b's relation rows and supply edges across arenas (the pooled S10b and the unit run's); the island context's `dist.market`, `dist.plaza`, `dist.gate`; coverage; the clerk | §4.7 S10b (file f item 308) |
| cross-arena links, splits and orders (V05 §3.20 (9)–(12)) | items 104 (h), 105 and 107 as applied; `skyRoute`; the accesses; `activeChains[]`; for S7b (1)'s term each island's land centroid's world point | S10b's binding, two-way pull, relaxation and split placement on both arenas; S7b (1)'s supply term (read by V01 §3.2 (5)'s χ̃); the clerk; the CSV | §4.7 S10a–S10b, §4.5 S7b (1) |
| the island's `districtHa`, `fabricPrior`, `fabricRingHa` and the `sky-*` district kinds (V05 §2.4) | the table | volume 1's unit runner through `SkyUnitInput.context` | §10.2's district-kind rows (file f item 213) |
| the landing classes `sky_landing` and `sky_landing_top` (V05 §2.4) | this volume's facts; their rows volume 11's | S10b and S12a (the plots), S11 (the landing houses), the reader, exports | §10.2's class table (file f item 213) |
| the landing classes' siting facts (V05 §2.4) | this volume; their rows volume 11's | S10b's neighbours on both arenas; the clerk | §10.2's profile columns (item 103 (a)) |
| the rim as a barrier (V05 §3.21) | the island's `rim` chain; volume 11's `sheer` defensibility row; an author's T3 wall on the island's key | item 106's barrier closure on the island; the clerk's unwalled side; T-V5-27 | §2.7 `Enceinte.closure`, `BarrierKind` `sheer` (J-VI.3) |
| the access admissibility transform (V05 §3.7 (2)) | the 64 m class raster; the raised parts' pier footprints, dilated deck plans and deck faces | S7b (5)'s candidate filter | §4.5 S7b (5) |
| the ground landing destination (V05 §3.10 (4)) | SKY's ground L1 batch where no spine lies within reach | S8's first cut in the face; SKY-F's check | §4.6 (file f item 299) |
| the sky's semantics and the `sky.ground` role (V05 §5.1) | this volume's per-family facts; volume 11's palette rows (row 52) | §8.2's loader and every shipped sheet | §8.2 (file f item 408) |
| the sky's `WhyProvider` (V05 §4.5) | `@plat/sky` | volume 10's `why` on islands, accesses, landfalls and shaded ground | V10 §2.13 |
| the daylight term's per-island attribution, the `sources` of §11.2's `FieldDrivers.terms` (V05 §4.5) | the prosperity field's `drivers()` (§4.5 *Fields*) over the islands' held strips and their sample bits (V05 §3.19) | §11.2's `WhyAnswer.drivers` in volume 10's `why` on shaded ground | §11.2 (`FieldDrivers`); §4.5 *Fields* |
| the sky light rows `rim`, `keel`, `skyAccess` (V05 §3.13) | the light table; `h_carried` | `LightSource` records, §8.4's light pass, night exports | §4.7 *Light sources* (file f item 307) |
| the island's name and `QuarterNode` root (V05 §3.14) | S13a with the island's naming features | `LabelEntity` (quarter), the gazetteer, exports | §9.1, §10.4 |
| the island's districts' character and identity | S12c, which runs after SKY-F | labels, names, the clerk | §4.5 (S12c's coverage) |
| the slab tiers and the sky surface layer (V05 §5.3) | S14 from the island record and `undersideTiers` | §8.4's traversal and light pass | §8.4 (a), (f), §8.8 (file f items 415, 416) |
| `IslandEpochStep` as the participant `sky.islands` (V05 §3.15) | the epoch's field, rung and demand; the dossier's institution records | `ConversionOp`'s island kinds; `EpochOps.demandTaken`; the displaced pool (cause `island`), which the epoch's `siting` step houses | §4.11 (file f item 320); V06 §2.1, V06 §3.2 |
| `sky.clearance` and the op `reclearIsland` (V05 §3.15 (7)) | every caster the epoch committed under an island (V06's `EpochScope.built`, `.raised`, `.levelled`) | the island's `groundRefCm`, `altitudeCm` and, where the floor fails, `elevationCm`; the fate list; never `shadeBasis` | V06 §3.2's `afterGrowth` table; §4.11 `ConversionOp` |
| `fallIsland` and the landfall (V05 §3.16) | the epoch's step 4 or a hand `convert` | the covered set's state changes of V05 §3.16's table and their readers there; the salvage ledger | §4.11 (file f item 320); §2.7 `Decoration`, `LandUse` |
| raised parts, retaining walls, massing tiers and levelled platforms as casters under an island (V05 §3.22 (1)) | item 110's generation and edits (§4.3, §4.7 S10–S11, file f items 244, 290, 309); volume 2's stack envelope (V02 §3.15.2); volume 11's height rows | the caster ceiling at SKY, SKY-F's clearance check, `sky.clearance`, a ground edit's re-read (V05 §4.3) | §4.3, §4.7 S10–S11, §8.4's casters |
| `skyAccessObstacles(doc)` (V05 §2.3b) | the committed `SkyAccess` records, their islands' anchors and rim bases, `accessSiting.lineClearM` | item 110 (b)'s course solver for every raised part laid after SKY (an epoch's raised-way pass, a new stage's S4 in an epoch) and T4 `road`'s `raised` dry run | §4.3 (file f item 290 (5)) |
| the accesses' admissible ground without decks, raised-way piers and rubble (V05 §3.7 (2), V05 §3.10 (3)–(4)) | the committed raised parts' piers and dilated deck plans; item 110 (d)'s deck faces; a live landfall's members | S7b (5)'s transform, SKY's feet and yards, the rope-line clearance, F-SKY-ACCESS, a landfall's re-landing (V05 §3.16) | §4.5 S7b (5) |
| the generator's reads of the sky (V05 §3.22 (5)) | this volume's rule | item 110 (b)'s elevated-road and aqueduct sources | §4.3 (file f item 290 (1), (5)) |
| the strip's receiver heights — the unlevelled ground raster (V05 §3.19 (3)) | S1's `Terrain` raster with the T2 terrain strokes | every strip onto the ground, its `basis`, the load path | §2.3, §4.7 S10–S11 (file f item 309) |
| `levelledGroundCm(doc, key, p)` on the island's key (§4.7, file f item 309) | the island unit run's platform datums; else the island's terrain SKY writes | this volume's surface top, crypt re-test and clearance check (V05 §3.9 (4)–(5), V05 §3.10 (5)); the island bridge build (V01 §3.10.3 (4)) | §4.7 S10–S11 |
| `removedSlots(doc)` (V05 §2.1) | the island records in state `removed` and every `removedAccesses` | V09's `info.remove.holds` card and history row (V09 §4.20.3); the clerk | §2.8 (file f item 260) |
| DR27 (V05 §4.4) | the dossier's population, `wealth.label`, `site.magic`, `site.deposits`, institutions, ladder and district-defining records, `government`, `activeChains[]` | the gate, `S_town` through DR6, the node term, the institution rows, the fill's held shares, the chain rule | §7.7 (file f items 383, 387) |
| the events (V05 §4.2): `placeSkyAccess`; `quarter` with `sky`; `key` on the point-form events; `setField` with `key`; `regenerate` with the scope `shade`; `convert removeIsland`; `reclearIsland`; the bends | the tools T2–T6, T8–T12, the history tool, V09's delete row, the clerk; `sky.clearance` | the fold; §7.4's lifecycle rows (file f item 375) | §7.1 (file f item 356) |
| the F-SKY rows and the sky invariants (V05 §3.17) | every SKY step | §5.4's report; the dry run | §5.2, §5.3 (file f item 331) |
| the island's seasonal look (V05 §5.1 *Seasons on the island*) | §2.9's year position and follow flag (DR42); the document's one climate row as DR42 resolves it; §8.2's season rows with V11 §3.25.6's tables; the island's crowns, faces, water and roofs | S14's sky marks' `season` column (§8.1 item 8) and the tile worker's re-skin of the sky base and surface layer; picture exports; the clerk's seasonal line (V10) | §2.9, §8.2, §12.5 |
| the islands' pennant places — the rim run and the landing tops (V05 §5.1 *Festival pennants*) | the island's rim chain, its landing yards and the waterfall's lip (V05 §3.8, V05 §3.10); §2.9's festival display with DR43's schedule; V11 §3.25.7's `SKY` row and motif rows | `live.festival`'s places `rims` and `landings` (§8.2), so its marks on the sky base; picture exports | §8.2, §2.9, §7.7 |
| Find on Sky — the sky's matches, ghost pins, bubbles and gaps units (V05 §5.6) | V09's `live.find` over §11.2's gazetteer at the view's key; the committed island records and their arenas; V01 §5.4 (3)'s `gapUnits` over each island's arena (V05 §5.6 (4)) | the glow, pins and bubbles on the sky layer; the ghost pins of sky matches on Ground and Below; the panel's "on Sky" count and **Go there** (V09) | §2.9, §8.2, §11.2 |
| the budgets and the comfort level (V05 §6) | M6-sky's measurements; §12.1's comfort level | §12's rows; T-V5-18; V06 §6.8's estimate (the resize row's figures) | §12.1, §12.4, §12.6 (file f item 476) |
=== END ===

=== REPLACE ### 3.21 The rim as a barrier (the owner's item 106 where it reaches islands; J-V5.49) ===
### 3.21 The rim as a barrier (the owner's item 106 where it reaches islands; J-V5.49)

An island is barrier all round: its rim is a sheer drop, and its only approaches are its landing yards.
1. **The rim is a barrier edge.** For item 106 (a)'s closure and every "enclosed" or "sealed" test, the island's `rim`
   chain is a natural barrier of kind `sheer` (J-VI.3; §2.7's `BarrierKind`) — closure only, no wall; volume 11's
   `walls.barriers` row keyed `sheer` gives its defensibility class and wall `none`. The clerk's `closure` answer names it
   as barrier `sheer` (§11.2's `WhyAnswer.closure`).
2. **Generation never walls an island.** No stage lays an enceinte on a sky arena; the island's defence is its rim and
   its landings. A prison island's is its rim plus its `guarded` landing, the one approachable arc, whose role already
   admits only its institution's and the law-and-enforcement classes' rows (V05 §3.20 (2)).
3. **An author's wall on an island** (T3 `wall` in one of its **enclosure** kinds with the `key` parameter naming the
   island; `drawWall` with `key`, V05 §4.2) is an `Enceinte` of closure `barrier` on the island's arena — T3's `retaining`
   kind and a T2 terrace stroke's edge are never enclosures and lay an island `RetainingWall` instead (V05 §3.22 (4)): its
   approachable arcs are the landing yards' frontages — each landing yard is closed across its inner side by one stretch on
   the rim strip's `setback` line, both ends anchored on the rim (a tower at each anchor, item 106 (a)'s anchor rule) and a
   gate at the yard's attach — and every other arc of the rim is closed by the barrier, with zero wall edges. The tool
   snaps the stroke's ends to the rim and shows the rim arcs as part of the circuit (item 106 (g)); a stroke drawn along
   the rim away from a landing is bent at its dry run to the landing stretches only, with the line "the drop is the wall
   here" (J-VI.4), and a stroke that crosses the island's interior is an inner wall laid as drawn (§4.8's furniture). The
   stretch profile (item 106 (c)) grades each stretch: the full curtain across a landing yard, the strongest towers where
   it meets the rim. Adding or removing an access re-evaluates the circuit by item 22's least disruption: a new landing
   gets its stretch and gate, a removed one's stretch is removed (listed fates).
4. **The clerk** explains an unwalled rim: "the drop is the wall here" (V05 §4.5).
5. **The no-op pin.** With item 106's `barrier` closure and the stretch profile off, an author's island wall is the base's
   ring along the rim strip's line, byte-identical to the base (T-V5-27).
=== END ===

=== REPLACE ### 3.23 Edges — every mechanism at its limits (principle (11)) ===
### 3.23 Edges — every mechanism at its limits (principle (11))

Each row gives an edge of a mechanism of V05 §2–V05 §5, or a combination with another unit's feature, its defined outcome,
its rung on §5.1's ladder (never a whole-map retry) and its test; **T-V5-33** runs one fixture per row that names it.
Degenerate geometry a kernel transaction refuses is handled by the stage's failure class on its ladder (§5.1's general
rule).

**(a) The mechanisms.**

| edge | defined outcome | rung | test |
|---|---|---|---|
| the island record at load | §7.5's validation repairs what one value re-derives from the others: `anchor` snapped to the lattice, `areaHa` re-read from the land face, `altitudeCm` raised to the floor (a fate), `removed` read from `state`, a missing `removedAccesses` read as []; a slot another live record holds is given the lowest free slot, else the record is loaded in state `removed` (its slot held, `generated` false) — each reported | repair locally | T-V5-33 |
| the access record | a top whose rim vertex is gone is re-seated (V05 §4.3); an access whose island is tombstoned is tombstoned with it; a kind the `magic` circumstance no longer admits stays until the next re-siting, which bends it to the nearest admitted kind (a fate); a foot outside the ground frame is re-landed at the nearest admissible foot inside it; the lifecycle is V05 §2.6's rows | repair locally; substitute | T-V5-33; T-V5-16 |
| the unit inputs | an island with no river, no claim (a prosperity island) or one landing carries none, none or one; the view is re-assembled identically after a save, load or replay (never stored) | check | T-V5-9; T-V5-21 (d) |
| the strip | a caster fallen, removed or without a basis casts nothing; a receiver without a basis receives nothing; a mask whose sampler digest differs is recomputed whole; a window with no cell gives `w` = `h` = `cells` = 0; save, load and replay rebuild the same bits | check; retry that piece | T-V5-33; T-V5-21 (h) |
| the rule table | a missing cell reads its default; an edited cell out of range or order is bent by §7.6's cell validation to the nearest valid value (the supply rows sorted by `v` and made non-decreasing in `h` within [0, 1]; `altitudeM` ordered; counts ≥ 1; shares within [0, 1]), the line naming it | repair locally | T-V5-33 |
| identity and lifecycle | V05 §2.5's anchors and V05 §2.6's rows at save, load, undo, redo, regenerate and migrate | check | T-V5-15; T-V5-16 |
| the supplies | with no built district cell `S_town` is 0 and no slot opens (`no supply`); below CITY the gate fails before any supply is read (`gated: rung`), and at an epoch whose rung row is `none` the target is 0 (V05 §3.15 (6)); `supply` is recomputed at S7b and each epoch, restored by undo, and an older record's value is read until the next evaluation | check | T-V5-3; T-V5-33 |
| purpose | no candidate closes the slot (`no supply` / `nothing to carry`); one candidate is taken by the same draw, its uniform consumed; a dossier institution with no roster class of the row's tags counts by its archetype or not at all; the reason is re-drawn only by a Re-derive from S7b, kept by every island edit, restored by undo | substitute; leave out and report | T-V5-4 |
| the fill | the fill stops at its first cap (plot land, 3 × `H_d`, the band's demand) within 100 batches; `A` equal to `minAreaHa` passes and below it closes; below CITY no fill runs; the sky `Allocation` is re-made by a re-derivation from S7b, kept by island edits, restored by undo | leave out and report | T-V5-4 |
| the shape | a secant step that misses `A` by more than 1 % or a non-simple outline takes F-OUTLINE's rungs; a declared lasso that is not simple, has fewer than three distinct points or zero area is bent at its dry run to the routine's clamp, else to a disc of the kind's area at its centroid (item 101 R2) | simpler shape | T-V5-6 |
| placement | no candidate runs F-SKY-PLACE; one candidate is drawn from a top-K of one; a frame smaller than the outline and its inset gives no candidate; no ground river gives a uniform bearing; no reserved precinct scores the plaza | simpler shape; leave out and report | T-V5-5 |
| the arena | the frame of a single-island document is sized as any; no ground river means no conjured river and a spring pond by its draw; a ground river with no reach near the anchor reads its nearest reach's accumulation; the hydro cell follows the rung (12.5 m CITY, 16 m METROPOLIS) | substitute | T-V5-6; T-V5-7 |
| the underside and the altitude | `flat` has no root tiers; a ring below 1 % of the land ends the stack; `depthCm` is capped by `maxDepthM`; a floor above `E_max` wins (the altitude exceeds the row, a listed fate); a surface top with no building reads the terrain; the clearance rule's lag survives save and load | check | T-V5-10; T-V5-21 (h) |
| access | every removed ordinal skipped and counted; one admitted kind drawn from a set of one; the altitude over a row's limit drops that row; a crypt with no passing site takes the half-sunk form; a foot on a deck, a pier's footprint or rubble counts as none (F-SKY-ACCESS) | substitute; leave out and report | T-V5-8; T-V5-26 |
| the island's field | computed only at CITY and METROPOLIS, where islands exist | check | T-V5-1 |
| the unit run's contract | no claim or one landing is served as any; the district count is V01 §3.16's, bounded by the fill's household cap; an outline face below one district's size makes no district and sends the allocation to F-SKY-UNIT; the run exists only where islands do | leave out and report | T-V5-9 |
| lights | a settled island's magical lights stand at 0 cd; a `flat` island's keel hangs at the rim slab's base; one access has one lantern; a missing light row reads its default | check | T-V5-11 |
| names and labels | only islands of CITY and METROPOLIS are named; an island whose land face cannot hold its `quarter` label at the city band drops it by §9.3's area rule, the name kept for the gazetteer | leave out and report | T-V5-11; T-V5-12 |
| over time | a resize whose erosion would split the land face or leave no land beyond the rim strip and the yards stops, by the buffer bisection, at the least area that keeps one face with land beyond them, listed in the epoch's report; a downward rung crossing wanes every island over its dwells, an upward one lets empty slots re-open | repair locally | T-V5-14 |
| the landfall | a footprint that covers nothing on land lays no decoration, leaves `landfall` absent and reports "sank in <water body>"; one covered entity gives one member; covered content that is locked stays; a fall runs at any rung (after a downward crossing included); undo restores everything of V05 §3.16 (8) | leave out and report | T-V5-14 |
| determinism with one island | its draws are slot 1's and its own lineage's; the goldens hold | check | T-V5-15 |
| the strip's geometry | a tier ring that sets no mask cell blocks nothing; a sun at the reach cap sweeps 8 × the height; a receiver above the apex is never blocked | check | T-V5-20 |
| the route | a foot coincident with its class gives `d_G` = 0; an island with no admitted access routes nothing (∞, `unreachable`); the route exists only at CITY and METROPOLIS | leave out and report | T-V5-22 (g) |
| the rim as a barrier | an island with one landing gets one stretch; a stroke of fewer than two distinct points emits no event; a stroke wholly along the rim is bent to the landing stretches | check | T-V5-27 |
| item 110 under the island | a caster whose footprint touches the projected solid only at an edge or a corner is read by cell centres, as V05 §3.9 (3) states | check | T-V5-31 |
| the declarations | every tool gains at most one parameter; a zero-length T4 stroke emits nothing; a degenerate T5 lasso is bent as the shape row states; every declaration's lifecycle is §7.4's row | check; simpler shape | T-V5-16 |
| the events | a resize to 0 or below the claim floor is bent to the floor; a `moveVertex` or `warp` that would make the rim non-simple is bent back along its drag to the last simple position (bisection, ≤ 12 steps); below CITY T5's `sky` parameter is disabled with the islands control's reason (§7.8), and an API or clerk event carrying it is bent to the plain quarter on the ground ("Floating islands need a city; this quarter is laid on the ground") — refused only where the rung is a dossier fact (F-EDIT `dossier-owned`) | simpler shape; substitute | T-V5-16 |
| locality | a one-island document's edit scopes are V05 §4.3's; an edit whose effective scope is empty (a move by zero, a `setAttr` to the same value) folds with no change | check | T-V5-16 |
| the dossier | no deposits, no node term; more eligible institutions than slots are drawn among by V05 §3.4, three at most; many nodes add one bonus; a dossier population at a village or TOWN rung fails the gate (`gated: rung`); a derivation record written under the working name DR-SKY reads as DR27 (file f item 383); an absorb's changes reach the islands at the next epoch and undo with it | check | T-V5-25; T-V5-33 |
| the clerk | an island without a basis is named "not yet in the ground's shade"; one caster over a point gives one attribution; a removed island answers "removed by you"; answers are the same before and after a save and load | check | T-V5-33 |
| marks | a strip with no cell at three samples draws no outline; an unfallen island draws its land, rim and shadow at every band; every shipped sheet of §8.2's presets table (V05 §5.1's list, the ink-family variants and `painterly` among them) resolves every sky semantic (a user sheet missing one resolves it by §8.2's slot resolution); no island, no sky mark; the parity presets carry the rows; marks are view data rebuilt by S14 after undo and redo | check | T-V5-12 |
| light and shadow | no island, no slab and no second base, and the cursor sun's floor is off; a degenerate tier ring drops its slab; a hidden sky layer's slabs light nothing and are not drawn (§8.4), the model's strips unchanged; each occlusion mode lights as V05 §5.3 states | check | T-V5-13 |
| exports | with the setting on and no island the `sky` FeatureCollection is present and empty, with it off absent; a strip with no cells omits its MultiPolygon features; the parity presets export no sky content; an export mid-lag writes `basisCurrent` false, and an export after a load equals the one before | check | T-V5-17 |
| a lock against a dossier removal | V05 §3.15 (1b)'s lock clause | check | T-V5-14 |
| a landfall on another island's landing | V05 §3.16 (4)'s row | substitute; leave out and report | T-V5-14 |
| the most accesses | at most `accessCount.max` generated and `accessCount.handMax` hand-placed per island; a `placeSkyAccess` past the hand-placed cap is bent into a move of the island's nearest hand-placed access to the requested site ("An island takes at most {n} ways up by hand; moved {access} here"), with "Delete one first" as the alternative; an `editTable` lowering the cell below an island's count removes nothing — the accesses stand and only a new placement is bent; `skyAccessObstacles` ≤ 27 entries at the defaults | substitute | T-V5-16; T-V5-18 |
| a lock under `sky.clearance` | V05 §3.9 (5)'s lock clause | check | T-V5-31 (f) |
| the seasonal look (V05 §5.1) | every week of 0–51 the same model, hash, save, bases and strips; an arid row draws no ice and no snow on an island; a week in no band of a phase keeps the row's last phase (§8.2's cyclic read); a document whose pinned tables hold no item-117 rows draws §8.2's four override rows on the island as on the ground; a river all of whose stretches are fast draws no ice, a spring pond freezes as any `pond`; a `settled` or `waning` island dresses as a floating one; a `fallen` or `removed` island has no sky look (its landfall takes the ground's); a moved island's leaf cover moves with it | check | T-V5-34 |
| the pennants (V05 §5.1) | no festival in the view's week, or the display off: none; two festivals in one week: both, in window order (§8.2); an island with no landing: rim pennants only; a rim stretch wholly inside landing yards or the waterfall's lip: none there; a `fallen` or `removed` island: none; an island an epoch carried below CITY: V11's `SKY` row as at any rung; a ground landing: none of the `SKY` row's | check; leave out and report | T-V5-35 |
| Find on Sky (V05 §5.6) | no island: no sky entry and no "on Sky" count; one island: its matches alone; a hidden sky layer: its matches still counted and shown as ghost pins; a bubble never joins two islands' or two layers' pins; a match withheld by the key: absent everywhere; a `fallen` island: its matches dark, its landfall a Ground place; a `removed` island: never offered; Show gaps on an island (V05 §5.6 (4)): V01 §5.4 (3)'s `gapUnits` over its arena — under a walking-radius row an island holding no member a gap over every residential plot of it, whatever the ground beneath holds, and one holding a member no gap; under a households row each district's unserved plots; a district with no residential plot no per-plot unit; a class `IslandRule.carry.never` excludes a gap like any other | check | T-V5-36 |
| the one-time waits (V05 §6) | each wait at CITY and METROPOLIS with three islands, up to the population cap, within §12.1's comfort level, a row past its target only with its recorded measured gain; a wait past one second shows progress; the interactive rows never relaxed | check | T-V5-18 |

**(b) The combinations** (every one at CITY and METROPOLIS, where islands exist).

| combination | defined outcome | rung | test |
|---|---|---|---|
| cliff × shade; steep × shade | the receiver heights are the unlevelled raster, bilinear across the cliff; terrain shade (pass 1) and the island's bits are OR-ed, a point counted once; the pre-test reads the frame's `g_min` and `g_max` | check | T-V5-19; T-V5-33 |
| cliff × landfall; steep × landfall | the terrain is never a member and never changed: the rubble lies on each level where it covers a member; covered retaining walls step to `decayed` | check | T-V5-14 |
| coast × shade; harbour × shade; moat × shade | bits are set on every receiver cell, water included; no plot reads a water cell, and `S_town` leaves harbour basins and moats out; the clerk's and the CSV's areas count every covered cell | check | T-V5-33 |
| coast × landfall; moat × landfall | the part over water sinks ("sank in <water body>"); a quay, pier or mole deck covered on land is `ruined`; a moat is never a member | leave out and report | T-V5-14 |
| moat × sky access | a moat is water and its wall strip a strip: neither is admissible ground; a moat bridge's deck face is excluded as a deck | substitute | T-V5-8 |
| bridge × shade; deck plot × shade | a deck is no receiver height: its cells read the field at the unlevelled ground, and a deck plot takes that cell's value | check | T-V5-33 |
| retaining wall × shade | a retaining wall is a pass-1 caster of the daylight term (file f item 290) and a caster to the island's clearance; its levelled platforms move no receiver | check | T-V5-21 (h) |
| square × landfall | a covered plaza or market reservation is left vacant under the rubble; its market use is relocated first | substitute | T-V5-14 |
| oasis × shade | the strips set bits over an oasis as over any ground; the ground's weight is §4.5's `w_sun` × the climate row's sunlight cell, so in a hot arid row an island's under-hang reads as valued shade by the ground's own rule, while `P_I` on the island reads `w_sun` alone (V05 §3.11 (4)); with item 111's cells neutral, byte-identical to the run without item 111 | check | T-V5-33 |
| frame × shade | F-SKY-SHADE clips the window, reported as the clipped share | leave out and report | T-V5-19 (e) |
| frame × sky access | a foot is searched on the ground frame's raster cells only; a slanted row whose only admissible point lies beyond the frame is not admitted there — F-SKY-ACCESS's next rung | substitute | T-V5-8 |
| frame × landfall | the part of the footprint beyond the ground frame covers nothing; the ledger counts covered land only | check | T-V5-14 |
| neighbourhood fabric × sky access | in a ground district whose S8 is volume 1's template fabric, a ground landing's attach is a gate-ranked portal of that district's template, which a seed or a lane must reach, as on an island (V01 §3.10.3 step 4); SKY-F's check and repair lane stand | repair locally | T-V5-8 |
| terraced ward × shade | levelling moves no receiver: the strips computed at S10a equal a load's rebuild | check | T-V5-21 (h) |
| terraced ward × sky access | a landing yard is a reservation hole the ward's levelling leaves unplotted; the hoist's run reads `levelledGroundCm` at the foot; a retaining wall follows plot and block edges and never crosses a yard | check | T-V5-33 |
| terraced ward × landfall | covered retaining walls `decayed`, platforms keep their datums, buildings demolished | check | T-V5-14 |
| composed building × shade; × landfall | a composed (stage-3) building casts at an epoch through volume 6's mask and is a caster to the clearance at its stack envelope's top; covered, it is demolished with its composition | check | T-V5-31; T-V5-14 |
| floor plan × landfall | a covered building's plan records (volume 3) are tombstoned with it and restored by the fall's undo | check | T-V5-14 |
| vault × island; × shade; × sky access | nothing of the sky reads or writes an underground part (item 2): vaults are no receivers and no members (a ruined span's arch vaults follow the span by volume 4's rule); an access foot never stands under a raised deck, so never on an arch vault | check | T-V5-26; T-V5-8 |
| shade × lock | a lock never holds a basis or a strip (derived, no edit kind): evaluations write every live island's basis, locked or not; a locked or pinned ground plot keeps its content while its field value follows the strips | check | T-V5-33 |
| shade × undo | an island edit's undo touches no basis; the undo of an evaluation's event (an epoch, Update shade now, a re-derivation) restores the former bases, strips and field cells | check | T-V5-16; T-V5-21 (b) |
| landfall × save and load | the decoration, its `members`, the ways' `formerClass`, the walls' profiles and the quarry's `source` persist in the model digest; a replay of the `fallIsland` event reproduces them byte for byte | check | T-V5-15 |
| season × offset; pennants × offset; Find × offset | the island's season, pennants, glow and pins drawn in its frame and displaced with it; the ground's look beneath unchanged | check | T-V5-34; T-V5-35; T-V5-36 |
| season × shade | the strips and `shadeSky` identical in every week; only the drawn shadow follows the view sun's height | check | T-V5-34 |
| season × landfall | the landfall's rubble and quarry face are ground faces: they take the ground's snow and leaf cover; nothing of the fallen island is drawn on the sky | check | T-V5-34 |
| festival × landing yard; festival × waterfall | no pennant in a yard's passage or at the waterfall's lip; a yard's two pennants flank its access top | check | T-V5-35 |
| Find × season; Find × festival | Find draws over both, under its veil, never re-rendering the sky base tiles | check | T-V5-36 |
=== END ===

=== REPLACE ### 4.5 The clerk's view ===
### 4.5 The clerk's view

**Registration.** `@plat/sky` registers one `WhyProvider` (V10 §2.13) with `kinds` `SkyIsland`, `SkyAccess` and the
`fallen_island` decoration, answering from the committed model and the report, filtered by the caller's key. The
prosperity field's `drivers()` (§11.2's `FieldDrivers`; §4.5 *Fields*) gives the daylight term one entry as the base
defines it and, beside it, one attribution per island whose strip covers the point: `{ driver: 'daylight', delta, sources:
{ caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] }`, each source's `samples` the sample bits it blocks
at the point and the entry's `delta` the OR-ed total × `w_sun` ÷ `bits` (a sample blocked by a hill and an island is
listed under both and counted once, J-V5.38) — the `sources` list is this volume's member of §11.2's
`FieldDrivers.terms`. Pulls across arenas reach `PlacementSolver.explain` (volume 10's `Explanation.terms`) with the access
`skyRoute` returned, so every cross-arena term names its landing.

The reader (§11.2's `query`) lists each island in the gazetteer with its name, reason, state, area, altitude, supply and
accesses. `why` on an island answers with its gate, its slot's draw against `chance · h_town`, its reason's candidates and
weights (a custom institution's matched archetype named), its fill's bands and their shares of its land, its stop cause,
the trades it left on the ground by `carry` (each with its reason: heavy works, noxious, a need an island cannot meet, a
chain's working step) and the split shops it carried, the coverage instances it took per island district, the S3
reservation it handed over and to whom ("the old cathedral close — now the mother church"), its cathedral's crypt ("cut
into the island's rock; the largest crypt in the town"; half-sunk where the rock is too thin), its placement's class
shares, its reachability and score, its underside's kind, and its strip — how many hectares it shades for at least one
(`cells`), three and five of the samples, when the ground last took it (`evaluated`), and whether the field still reads
it where it hung (the basis, V05 §3.19 (8)); an island with no basis yet is "not yet in the ground's shade" — filtered by
the caller's key (a `secret` service hoist to a prison is withheld). `why` on a ground plot or quarter under an island
names each island whose strip covers it and for how many samples, the term's share of the plot's value, and whether the
ground has caught up; `why` on a use on an island, or on a ground use pulled by one, names the rows and the links that
pulled it — the good, the bound provider or consumers, the orientation (item 105 (j)) — and the landing each cross-arena
pull or link went through with its route length (V05 §3.20 (8), (10)); on a split shop it names its works below and the
route between them; on a node of a chain that crosses an island, it names the chain, the node's step in its flow, the
landing its link crosses and why its working steps stayed on the ground (V05 §3.20 (9)); on an island's rim with no wall,
"the drop is the wall here" (V05 §3.21); on a landfall, the island that fell, when, and what it broke (the walls breached,
the ways buried, the arches and raised-way piers ruined, the terrace walls broken, the shops that fell with their bridge,
the fountain an aqueduct no longer feeds, the accesses of other islands re-landed) with the clearance still owed; on the
town supply, the `magical_node` deposit when the node term acts — "the node beneath the old ruins" when the report's
`ruin.node` line names the deposit (V04 §3.5.0a (9); V05 §3.3).

**The clerk's island rows** (volume 10's categories; CVR-V10-14): on a removed island or access, "removed by you" with the
event — "the town had raised it" or "the island you drew" by `removed.generated` — and what alone would re-open its slot
(undo, or a new island drawn when no other slot is free — never a new island count); on an island the clearance raised,
"raised clear of the aqueduct" (or of the viaduct, the terrace wall, the stepped temple), naming the caster and the epoch;
a lock holding an island, "clearance held by your lock" or "held without its institution". **Its bend rows** (J-VI.4) are
V09 §4.9's lines, carried in V10's `bend` category: `bend.raised.island`, `bend.aqueduct.island`, `bend.raised.onIsland`,
`bend.aqueduct.onIsland`, `bend.retaining.rim`, and this volume's `bend.island.keepRoom` and `bend.island.rimStop` (V05
§4.2), with the lines of V05 §3.23 for the hand-placed cap and the rung. A clerk's proposals are these events as ghosts: "a
floating palace over the river" is T5 with `sky` and the palace kind; "raise it higher" T9's `setAttr(altitudeCm)`; "let
the ground catch up" Update shade now; "bring it down" `convert fallIsland` with V05 §3.16's fates. It never writes a
dossier fact and meets DR27's refusal as any author does.

**The looks** (items 117 (h), 118 (g), 120 (i); the lines volume 10's). The clerk's seasonal line on an island reads the
ground's climate row and the island's water as V05 §5.1 draws them ("the island's pond is frozen: it is midwinter, and
winters here are cold; the waterfall keeps running"); its festival line names the pennants on the island's rim and
landing tops while a festival shows; and its "show me …" sets Find's chips, whose matches on the islands are V05 §5.6's —
each a view action, never an edit.
=== END ===

=== REPLACE ### 5.6 Find on Sky (item 120, the sky's part; J-V5.89) ===
### 5.6 Find on Sky (item 120, the sky's part; J-V5.89)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the gaps
switch), outside the document, its hash and the log, kept across bands, layers, weeks, epochs and edits until **Clear**
or the panel's close. The panel, the type-ahead, the chip grid, the results and the `live.find` overlay provider are
V09's; the veil, halo, outline, pin and count-bubble rows §8.2's; the gazetteer's class counts and its match listing by
class, area and layer §11.2's, under knowledge admission at the view's effective key (item 120 (h)). This section states
what the sky offers and how a match on an island reads.
1. **What the sky offers** (item 120 (b)), by §11.2's gazetteer over the committed records of every island not `fallen`
   or `removed` (V05 §4.5's island entries): **kinds** — the uses on the islands' plots by their classes, the island
   institution's and the landing tops' (`sky_landing_top`) among them, each class counted once over all layers with
   its split by layer shown; **named institutions** — an institution island's institution (V05 §3.4), the dossier's
   name first; **areas** — each island by its name, the root of its own quarter tree (V05 §3.14: the whole island lifted
   from the veil), and its districts as V01 offers every district; **named places** — the island's own, as the gazetteer
   names them. An access is no target (it has no name and no class); a fallen island's landfall is a Ground place by its
   `place` label's name (V05 §5.4).
2. **On the Sky layer** (item 120 (e), (f)). With Sky the working layer (V09 §4.2), matches on the islands glow over the
   veil by §8.2's rows, each halo, outline, label and city-band pin drawn in its island's frame and displaced with it
   under `offset`, as its marks are (V05 §5.2); an island chip lifts the island's land from the veil and glows along its
   rim. Pins merge into a count bubble only with pins of the same layer and, on Sky, of the same island, so a bubble
   never joins an island's matches to the ground's beneath it or to another island's; a bubble's click zooms in as on
   the ground.
3. **Ghost pins and Go there** (item 120 (f)). With Ground or Below working, each match on an island shows as a ghost
   pin where its mark is drawn — over its ground footprint under `ghost` and `opaque`, displaced under `offset` — and the
   panel counts it "on Sky"; **Go there** sets V09 §4.2's working layer to Sky with its island menu's `key` on the
   match's island and flies to the band that shows it. With Sky working, the ground's and the underground's matches
   show as ghost pins and counts in turn. A hidden sky layer (§8.4) keeps its matches' ghost pins and counts, so a match
   is never lost, and Go there turns its visibility on, as switching the working layer does.
4. **Show gaps** (item 120 (i)). On an island Show gaps' units are V01 §5.4 (3)'s `gapUnits` over the island's arena,
   restating none: its districts for a class with no coverage row or a row counted by district or neighbourhood; the
   whole island as one unit for a row counted by walking radius (V01 §3.16; the route to the ground passes every walking
   radius, V05 §3.5 (3)), so a member on the island serves every residential plot of it, a member beneath it on the
   ground none; and V01's per-plot `households` reading over the island's plots for a row counted by households — each
   unit with no member of the class outlined dashed along its land's edge and labelled "none here", a per-plot row's
   gap the unserved plots of each district as V01 §5.4 (3) draws it. A class `IslandRule.carry.never` excludes reads as
   any gap; the clerk's why names the carry rule (V05 §4.5).
5. **Over time, edits and knowledge** (item 120 (f), (h)). Every commit, regenerate, undo and epoch re-evaluates the
   chips: a raised or declared island's matches glow in its commit, a moved island's glow moves with it, a fallen
   island's go dark with its landfall then offered on Ground, and a removed island offers nothing. A `secret` access's
   landing yards, and a concealed use or institution on an island, are never suggested, counted, glowed or pinned under
   a key that withholds them (V05 §5.5's *Knowledge*; §11.2).
6. **Exports and cost** (item 120 (i), (j)). A picture export draws Find on the sky layer as shown (V05 §5.5); the
   islands' entities join `live.find`'s index, rebuilt once per commit, and the overlay never re-renders the sky base —
   V05 §6's Find row.
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. They take over the base's
island bars T10-1, T13-1, T15-1 and T102-2 (file f item 476), the island clauses of T117-1 – T117-8 (T-V5-34),
T118-1 – T118-6 (T-V5-35) and T119-2 – T119-5 (T-V5-18), and T120-1's registration with T120-4's and T120-5's sky
clauses (T-V5-36), as §13.2's take-over table names them. Every clause that restates an owner item's
no-op or view pin registers its fixture on V12 §3.7.8's engine under its V12 §2.13 pin, naming the pin, its off form and
the seat that writes the registration (X-V12-11): T-V5-15's item-110 clause, T-V5-19 (c), T-V5-22 (b) and (k), T-V5-27's
two, T-V5-33's item-111 clause and T-V5-34 – T-V5-36.

* **T-V5-1 — the gate** [C]. TOWN and every village rung never carry a sky allocation; a CITY with the setting off carries
  none and its ground digest equals the realism golden (T13-1); the `MFCG` and `FTG` presets carry none; a dossier-bound
  CITY whose `site.magic` resolves `none` refuses the setting (F-EDIT `dossier-owned`).
* **T-V5-2 — the count** [C]. 500 CITY seeds at the target at `wealthLevel` 0.5 and 1: every count 0–3 within ± 3 s.e. of
  the slot law at each seed's own `h_town`; slots never skip; `islands.count` 0–3 give exactly that many open slots on 200
  seeds each (their supply permitting, each empty slot reported).
* **T-V5-3 — the supply** [C, O]. V05 §3.3's calibration bars at P0; `A` monotone non-decreasing in `h_town` and
  `h_carried` over the rows (T10-1); `S_carried` equals the mean of the carried households' band values to 10⁻⁹; a
  fixture with no built district cell gives `S_town` 0 and no slot open (`no supply`).
* **T-V5-4 — the fill** [C]. On 500 CITY seeds with islands: ground plus sky households equal the roster's total exactly;
  carried households by band never include a band poorer than a band left uncarried; the stop cause is one of V05 §3.5's
  three; the fill converges within 100 batches; a slot below `minAreaHa` closes and its rows return, one at exactly
  `minAreaHa` passes; an institution slot carries exactly one instance of one of its tags and its staff, never a COUNT,
  GUILD or QUARTER record or member; with no candidate a slot closes (`no supply` / `nothing to carry`) and with one it
  takes it; no S3 reservation is left without an owner by an institution slot (100 %: the hand-over instance or `park`,
  F-SKY-HANDOVER counted); no household a dossier district-defining record's raised share holds is carried (100 %).
* **T-V5-5 — placement** [C, O]. 1 000 islands on B-CITY: no island without an assignment or declaration has more than 10 %
  of its outline cells over `core`; 0 islands within `gapM` of another; 100 % inside the frame inset; ≥ 80 % of prisons
  ≥ 1 000 m from the plaza and ≥ 80 % of palaces within 1 000 m of it; every F-SKY-PLACE rung counted in the report, a
  fixture with no candidate and one with a single candidate among them; 100 % of islands placed by rule have a rim cell on
  admissible ground or within an admitted slanted row's run of it, including on the lake, estuary and sea fixtures.
* **T-V5-6 — outline and arena** [C]. 10 000 sky outlines per template: simple (§13.2's outline property), area within
  1 % of `A`; each arena's rim is one closed chain carrying `rim`; exactly one void and one land face at L0 before water;
  every SKY commit record writes only its island's key and the ground's landing claims; for every template at every aspect
  its row admits, 100 % of outlines grown by the buffer resize to 1.5 × `areaHaMax` lie inside their frame; a degenerate
  declared lasso is bent as V05 §3.23 states.
* **T-V5-7 — terrain and the conjured river** [C]. On 500 islands with a river: its mean bearing within ± 15° of the ground
  river's; 0 non-monotonic beds; every river ends at the rim with `fall`; its width inside its clamp; F-SKY-TERRAIN's rungs
  counted; with no ground river no conjured river is drawn and a spring pond appears at its draw's rate.
* **T-V5-8 — access** [C]. Every island placed by rule has ≥ 1 access (0 % `unreachable`); a declared island has ≥ 1 or is
  reported `unreachable`; every hoist and stair foot lies on land in an admissible face (never water, a moat, a wall strip,
  a deck face, a pier's footprint, rubble, or beyond the ground frame); every ground landing plot fronts a way or has its
  trail; rope lines ≤ 350 m and bridges of light ≤ 600 m of horizontal run; every stair's helix ends at its top with a
  landing every 20 m of rise; no stair or bridge of light where `magic` is `none`; `guarded` only on a prison; after SKY-F
  every island landing attach is met by an island way, and 100 % of ground landing attaches are met by a walkable part-0
  way after S8 — in a district laid by volume 1's template fabric as in one laid by §4.6; the ground landing of a `secret`
  access is fronted and withheld from every key that does not admit it (100 %). **With item 110** (on 500 CITY and
  METROPOLIS seeds with islands and item 110's rows on, and on hand-built fixtures): 0 raised decks or raised-way piers
  inside any access column or any landing yard dilated by `deckGapM` (100 %, whether the raised part came before SKY or
  after it); every rope line and bridge of light ≥ `lineClearM` over every raised deck and raised-way pier it crosses; 0
  feet and 0 landing yards on a deck face; 0 landing attaches met only by a raised deck or an aqueduct; a T4 `raised`
  stroke ending on a rim leaves 0 ways on the sky arena and places 1 access of an admitted kind (J-VI.4 (d)), an aqueduct
  stroke to a rim and a `raised` or aqueduct stroke on an island's key are bent (J-VI.4 (d)–(f)), each with its line, and
  a `raised` stroke across an access's column is re-routed or, where `skyAccessObstacles` offers no re-route, ends at the
  last ground vertex before it with "this would cut <island>'s hoist; it ends here".
* **T-V5-9 — the unit run's contract** [C]. The rim strip is never cut or plotted; `SeamReport.portalsTotal` = 0; the
  island's district count equals V01 §3.10.3 (2)'s count for its allocation read with `districtHa`; an island with
  `h_carried` = `h_town` = 1 has 3 districts at METROPOLIS and at least 2 at CITY on ≥ 90 % of seeds; every island
  district's kind is a `sky-*` kind of V05 §2.4 and every fabric hint a valid `FabricStrategyId`; on 500 seeds, 0
  households re-homed from an island by S10a's band-range step, and each carried band's share of the island's plot land
  within ± 5 % of its carried share; its housed households equal its allocation's, or F-SKY-UNIT's overflow is reported
  (a fixture island whose land is all rim strip and claims among them); the runner lays no second terrain on the island
  and its field step reads the unit inputs' values; an island with no river, no claim or one landing is served; the
  inputs re-assembled after a save and load equal the session's.
* **T-V5-10 — underside and altitude** [C, O]. The apex clears the tallest caster beneath by ≥ `clearanceM` on 100 % of
  islands after SKY-F, locked ones excepted as V05 §3.9 (5) lists them; the altitude fixed at SKY stands (no F-SKY-CLEAR
  raise) on ≥ 99 % of 1 000 islands at CITY and METROPOLIS (V05 §3.9 (5)'s measurement, with item 110's terrace,
  raised-way and deck-plot rows on at their defaults), and the 100 % clause holds after every epoch of a century run
  (`sky.clearance`); each underside tier's ring lies inside the one above it translated by the apex step, with decreasing
  area; each profile's measured radius ratio (the tier rings' equivalent radii ÷ R) within 0.05 of ρ(z_i) at every tier;
  a `flat` island has no root tier, a floor above `E_max` wins (listed), and `depthCm` never exceeds `maxDepthM`.
* **T-V5-11 — lights and names** [C]. Rim orbs at 40 m ± 1 m; the keel light's intensity 4 000 × `h_carried`; a settled
  island's magical lights 0 cd and back at a refloat; every island named; its `quarter` label drawn at the city band at the
  reference viewport on 100 % of visible islands whose land face holds it.
* **T-V5-12 — labels and occlusion** [C]. Under `opaque`, 0 ground labels drawn inside a visible island's land face;
  under `ghost`, a sky label wins a collision against a ground label of equal priority; under `offset`, sky labels drawn at
  their displaced positions; with the sky layer hidden, 0 sky labels and no model digest changed (T15-1); every shipped
  sheet of §8.2's presets table — V05 §5.1's list, the ink-family variants `parchment`, `bw-print` and `night` and, from
  volume 7's V-M1, `painterly` among them — loads at every band with every sky semantic resolved, and the `fallen` row
  draws over the landfall's members; a strip with no three-sample cell draws no outline.
* **T-V5-13 — the underside's shadow under the fixed, path and cursor suns** (the owner's J98) [C, O]. A hand-built
  island (8 ha, `root` profile, 100 m altitude) above the golden TOWN, `ghost` occlusion (and (a)–(c) again under
  `opaque`), the view at the 1:500 stop, CPU reference and GPU pass: (a) under the fixed sun set to 15°, 30° and 60° and
  the path sun at three hours, the shadow's boundary on open ground within max(1 px, §8.4 (c)'s floor-cell diagonal) of the
  analytic union of the tiers' projections; (b) the shadow's area strictly increasing as the sun lowers; (c) the same
  island with a `flat` profile: at 15° the `root`'s shadow reaches past the `flat`'s by `depth · cot 15°` within 1 px
  toward the sun (toward the footprint); (d) the cursor sun at nine pointer positions at the 1:500 and 1:2 000 stops: the
  shadow falls away from the pointer, `H` ≥ 1.5 × the list's top, the GPU within §13.4's tolerance, and at a fixed zoom
  panning the island into and out of view changes `H` by 0; (e) at 15° a ground point under the island's centroid but
  outside the root's projection is lit (V > 0); (f) the penumbra's width at 200 m altitude exceeds that at 100 m; (g) the
  `flat` island with a 30 m rim against a 10 m rim: at 15° its shadow reaches 20 m · cot 15° farther toward the sun within
  1 px (the owner's "thickness"); (h) at 15° the `root`'s rung-3 shadow is one connected region (the prism form); (i) with
  the sky layer hidden no slab is lit or drawn and the ground's picture equals the map without islands, and with no island
  no second base exists; §13.4's base island-shadow golden stands.
* **T-V5-14 — over time** [C]. T8-6 stands (a CITY dropping below 10 000 loses its islands through waning, settled and
  fallen over their dwells); on the hook fixture a settled island refloats before any island is raised; a resize keeps
  every plot address away from the rim (100 %); after a growing and a shrinking resize and a rim reshape on the hook
  fixture's institution island, the rim strip lies `rimStripM` inside the new rim everywhere and every landing yard meets
  its top on it (100 %), the rim walk stands on the re-laid strip — one `esplanade` and one `street_trees` `Greenery` after
  each — 0 ways cross the strip, a growing resize re-derives exactly the districts that receive band faces and the district
  whose institution claim is re-searched, a shrink and a reshape's inward stretch no district but that claim's district
  where the claim is re-searched (every other island district byte-identical, the district count unchanged), after a
  re-search the institution stands on its new claim in one building with the old one demolished, a shrink requested below
  the institution floor is bent to it with the claim keeping a site in its own district, and an epoch's erosion toward a
  sliver stops at the one-face floor, listed (J-V5.77). **The landfall:** it adds and removes no ground edge, demolishes
  exactly the covered set's buildings, keeps every locked entity, credits the ledger with the covered land area × 3 m³,
  relocates every dossier use before its building goes; on a fixture whose footprint covers a wall stretch, a `main`
  gate, a tower, a bridge deck, a market reservation, a way, a harbour quay, the sea and a cliff, each covered entity takes
  its row of V05 §3.16 (4)'s table — the `breached` run with a knot at each end (a `dismantled` run kept) standing again at
  the next `fortification` phase when the ring is in use (V06 §3.7.5; T-V6-11), the tower and the gate inside it with no
  state written to any `Tower` or `Gate`, the market's use relocated, the way a `track` holding its former class in
  `Way.formerClass` (a lane volume 6 had downgraded keeping its earlier one; 0 covered ways without one) until an epoch's
  clearance restores it (V06 §3.5.2; T-V6-66), the landfall's quarry carrying its `source` and read by no underground
  quarry rule — the part over the sea reported sunk, the cliff unchanged, a locked wall kept, each listed as a fate, and the
  undo restoring every class, `formerClass`, profile and state; a fall wholly over water lays no decoration and reports
  "sank in <water body>"; a fall covering another island's hoist foot and landing plot re-lands that access as a
  `ropeway` from the same top (or by F-SKY-ACCESS's ladder), the other island keeping a way up or reported `unreachable`,
  and the undo restores it; a covered composed building and its floor plans go with it and return with the
  undo. **The dossier:** an absorb removing an
  island's palace leaves the island at once without it, and at the next epoch the island takes the next palace instance
  where one exists, else becomes a prosperity island where the rich band admits it, else wanes (the three cases on
  fixtures); with the island locked, the palace still leaves at once, the island keeps its reason and vacant claim listed
  `held without its institution` at every epoch, and (1b) runs at the first epoch after the unlock; each
  conversion's undo restores the model byte for byte. **With item 110:** the landfall fixture also covers an aqueduct span,
  a viaduct's raised-way pier and the span it carries (itself less than half covered), a generated retaining wall on a
  terraced ward and a bridge carrying deck plots — each by its row of V05 §3.16 (4)'s table: the span on the ruined pier
  `ruined` with it, the viaduct's crossing closed and the ways beneath touched only where covered, the aqueduct's lost
  supply read at that epoch's `raisedWays` step when the fall is an epoch's (its ruined parts in `EpochScope.raised`; the
  next epoch's for a hand `convert`), the wall still `decayed` after a re-derivation until an epoch's restoration, the
  platforms' datums unchanged, 0 vacant plots left on the ruined deck and its later repair re-offering its faces to new
  lineages; the covered spans, piers and walls in `members` as `{ raised, span: [a, b] }`, `{ raised, support }` and `Id`s,
  the same members after a re-derivation of the viaduct, each leaving in the batch of the op that ends its cover (V06
  §3.5.2), the deck plots listed as fates, never members; all of it in V05 §5.5's per-landfall CSV, and 0 edges of the
  ground's streets and plots added or removed beyond the tombstoned deck plots' lines.
* **T-V5-15 — goldens and determinism** [C]. Two sky fixtures join §13.3's goldens — a CITY with a prosperity island and a
  conjured river; a METROPOLIS with a palace island and a prison island — identical on the five engines; every stream key
  distinct (§6.1's sky fixture); a one-island document draws slot 1's indices only; an island raised after a fall takes a
  new part; a document with an island declared, moved, resized, given an access and brought down replays to the session's
  digest, and a saved and reloaded landfall equals the session's byte for byte. **Item 110's pin and shift** (J-V5.67):
  the suite registers on V12 §3.7.8's engine (X-V12-11); with item 110's rows off, read as V11 §3.24.0's switch table,
  both sky goldens are byte-identical to their pre-item-110 digests (V12 §3.7.8's off-state set); switching the rows on at
  their defaults changes both once, recorded as one declared shift naming the two fixtures by V12 §3.7.6's rule (raised
  ways and retaining walls beneath and on the islands; `groundRefCm` and the altitudes where a raised part stands under a
  solid); the METROPOLIS fixture pins one raised way under an island (T-V5-31 (a)).
* **T-V5-16 — editing** [C, O]. Every event of V05 §4.2 undoes exactly; §7.3's oracle checks byte for byte outside V05
  §4.3's scopes on B-EDIT sequences with island edits (10³ in the PR tier, 10⁴ nightly); a move keeps every address on the
  island; New random on an island keeps the ground's digest; a declaration where `h_town` = 0 carries the `held against
  its supply` fate; a fourth island is bent to join the nearest island (J-VI.4 (a)); the dossier-magic refusal holds; a
  resize below the claim floor and a reshape past it are bent with `bend.island.keepRoom` and `bend.island.rimStop`, a
  reshape toward a non-simple rim is bent back to the last simple position; a seventh hand-placed access on one island is
  bent into a move of its nearest hand-placed access; a `sky` quarter at a TOWN rung is bent to the ground
  on a standalone map and refused on a dossier-bound one; every tool gains at most one parameter; an edit with an empty
  effective scope folds with no change; the undo of an epoch, of Update shade now and of a re-derivation restores the
  former bases, strips and field cells, while an island edit's undo touches none.
* **T-V5-17 — exports** [C]. GeoJSON sky coordinates equal `anchor` + local exactly and validate; the `sky` collection is
  present and empty with the setting on and no island, absent with it off; each island's VTT scene imports with no manual
  steps; the glTF island mesh is a closed manifold and validates; CityJSON with PLAT's extension validates; the parity
  presets export no sky content; an export mid-lag carries `basisCurrent` false and one after a load equals the one before.
* **T-V5-18 — budgets and the comfort level** (item 119; takes T119-2 – T119-5's island clauses) [C]. V05 §6's rows
  on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their fallbacks applied and reported, the obstacle
  row with 27 accesses; the one-click path unchanged (§12.5). Item 119's comfort level at every island rung — CITY and METROPOLIS, each at its top and at the population
  cap, with three islands: each one-time wait of V05 §6's list, five seeds, p95 ≤ 10 000 ms from the click to the complete
  result on V12 §3.15.9 (2)'s wait timer (T119-2), an `advance` with islands timed in total (V06's T-V6-24 fixtures with
  their islands); every wait over one second naming its stage within one second, never an empty frame (T119-3); every
  sky row above its target holding its `perf.qualitySpend` row (T119-4); V05 §6's interactive rows not relaxed against
  the previous release (T119-5).
* **T-V5-19 — the shade strip moves the field, gently** (item 102 (g)'s island clause) [C, O]. A uniform district — level
  ground, one district kind, no driver varying across it — with a hand-built island (8 ha, `root`, underside 100 m above its
  ground) over its southern edge, latitude 50°, `w_sun` at its default: (a) the mean pass-2 prosperity over the cells the
  strip blocks for at least three samples is lower than over the district's unblocked cells by the expected difference —
  `w_sun` × the mean shade share of those cells, passed through the field's smoothing computed on the same fixture, never
  assumed — within ± 10 % of it; (b) no plot's band differs by more than one from the same fixture with the strip left out;
  (c) with `w_sun` = 0 the field and the town are byte-identical to the run without the island term, and with no island
  every strip is empty and the field byte-identical to the base's pass 2 (no-op pins) — this fixture's NoOpPin
  registration on V12 §3.7.8's engine under `item102.sun` (V12 §2.13; its off form the cells T102-1 names, `w_sun` 0),
  written by the M6-sky seat landing P1; (d) the strip identical on the five engines;
  (e) an island at the frame's edge reports F-SKY-SHADE's clipped share; (f) V05 §6's strip row; (g) over a cliff
  and a steep valley the island's bits and the terrain's are OR-ed, each point counted once.
* **T-V5-20 — the model and the picture agree; the underside shapes the strip** (J98) [C]. For each sample, the CPU
  reference's rung-3 shadow of the smooth tiers under the path sun set to the equinox at that sample's hour, on flat
  ground, covers exactly the cells the strip marks for that sample except cells its boundary crosses; a `root` island's
  strip at sample 0 reaches past a `flat` island's of the same outline by its depth × `c` within one cell along +ŝ (toward
  the footprint); a 30 m rim against a 10 m rim lengthens the `flat` island's strip at sample 0 by 20 m × `c` within one
  cell along +ŝ; the basis rim's simplification (≤ 256 vertices) moves no strip bit on the fixtures; a tier ring below one
  mask cell blocks nothing and a receiver above the apex is never blocked.
* **T-V5-21 — order, lag and the supply** [C]. (a) `S_town` at S7b and at an epoch equal to 10⁻⁹ between `w_sun` at its
  default and 0 when only the islands' strips differ; (b) after a move, an altitude, a resize and New random on an island,
  the ground's field rasters, every plot's derivation record and the shade view's veil byte-identical to before — only the
  pending outline moves — the strip's basis stale and the fate listed; at the next epoch (or after Update shade now, over
  its two windows only, the basis's `by` reading `update`) the strip recomputed from the island's new state and the field
  moved; (c) the epoch after a fall carries no bits from that island; (d) a document with an island moved and an epoch run
  replays to the session's field byte for byte; (e) a lower island under a higher one reads `shadeSky` > 0 on its cells in
  the higher one's strip and 0 elsewhere; (f) on a fixture where a house (volume 6's building shade mask, after one epoch)
  and the island shade the same sample point at the same sun, the OR counts it once, at the default sampler and at four
  points per cell alike, and the strip's `bits` equals the mask's; (g) the participant `sky.islands` runs once per epoch at
  `afterField`, after S6's re-evaluation, and a history run with the engine's other participants switched off draws the
  same island values; ground plus sky households equal the epoch's target after `siting` (100 %), the released households
  placed first from the displaced pool with cause `island` and the taken ones subtracted by `demandTaken`; (h) **the lag
  survives a save**: move an island, save, reload, then re-derive a block with a prosperity brush — the field raster and
  every derivation record equal those of the same session without the save, byte for byte; the same after an F-SKY-CLEAR
  raise and after a `w_sun` = 0 table (the strips still computed and held); the same on a **terraced fixture**: an island
  over a ward that S10 and S11 level with retaining walls — the strips computed at S10a equal those a load rebuilds after
  the levelling, bit for bit — and after a T2 terrain stroke under a strip (the bits re-read over its scope from the
  unchanged basis equal a load's rebuild); **a raised island**: an island raised at an epoch (after S6) and one declared by
  T5 between epochs, each saved and reloaded before the next evaluation — the load writes no basis, neither casts nor
  receives a strip, and the field raster and every derivation record equal those of the same session without the save,
  byte for byte; after the next epoch's S6 (or Update shade now on it) each casts; a document whose `schemaVersion`
  predates the basis step loads with the basis of every unfallen island computed once, and never again; **one strip per
  evaluation**: with volume 1's S9b registered, the strips S9b's manor sun factor reads and those field pass 2 folds are the
  same held strips, bit for bit, at generation and at a re-derivation from S10a (whose bases are written at S10a's start,
  before step (i)).
* **T-V5-22 — siting across the island** (item 103) [C, O]. On 300 CITY seeds with islands, in the siting statistics suite
  (item 103 (e)): (a) no class `IslandRule.carry.never` excludes is carried by any island (100 %) and no NEEDS row is
  satisfied by island water; (b) a class with a district coverage row serves the island's districts at or above the
  ground's served share of districts, its island members spaced by its same-kind row, and with the coverage weight 0 the
  run is byte-identical to one without coverage (no-op pin: these seeds' NoOpPin registration on V12 §3.7.8's engine
  under `item103.coverage`, its off form the cells T103-3 names, written by the M6-sky seat landing P2); (c) island classes
  with a ground supply edge stand at a mean route distance to their providers below that under random placement on the
  island; (d) the ground's suppliers of island
  classes stand nearer the landing feet than under random placement; (e) a `secret` access carries no pull of a class
  whose clientele is not clandestine (100 %); (f) the crime-aligned classes stand farther from a prison's guarded hoist
  foot than their baseline; (g) on hand-built fixtures every route distance equals the sum of its legs to the centimetre (a
  foot outside the walls reaching an inner class through its gate; a foot coincident with its class), `skyRoute` names the
  access of the least sum, a `river` or `sea` edge across arenas is ∞, and an island with no admitted access routes
  nothing; mirroring item 105 (k) across the arenas: (h) a multi-output producer with island consumers sits nearer its
  dominant output's landing foot than its random baseline, and island consumers of a shared ground provider bind to it by
  the route; (i) split pairs across the arenas appear for split classes past the threshold, are reported, and never appear
  in the parity presets; (j) the per-arena relaxation settles within its cap, the second pass moving fewer members than the
  first, byte-stable across runs and worker interleavings; (k) with the web's weights, `comfortM` and the spacing at 0, the
  result is byte-identical to the run without items 105 and 107 (no-op pin: these seeds' NoOpPin registration on V12
  §3.7.8's engine under `item105.web` and `item107.spread`, their off form V11 §3.7.4's web off form with the cells
  T107-4 names, written by the M6-sky seat landing P2).
* **T-V5-23 — custom institutions on islands** (item 104) [C]. A dossier custom institution of archetype `exotic-tower` is
  a `tower` candidate where the world has magic and not where `magic` is `none`; a `martial-keep` is a palace candidate at
  `landmarkLevel: landmark` and not at `standard`; a revision that changes its archetype keeps it on its island unless a
  hard row of its new profile fails there, and then re-sites it on the ground by least disruption, the claim standing
  vacant until a later epoch re-occupies it with the next instance first; zero placement failures.
* **T-V5-24 — custom chains across the island** (item 104 (h)) [C, O]. On 200 CITY seeds with islands and a fixture set of
  active custom chains — a perishable food chain, a luxury chain whose consumers are rich households, and a chain one of
  whose processors is a custom `exotic-tower` carried as the island's `tower` — in the siting statistics suite: (a) no
  chain's resource or processing node is carried by an island except the island institution, and no chain resource is
  sited on an island's conjured water (100 %); (b) the ground end of every cross-arena link stands nearer to the landing
  foot of its shortest route than under random placement of that node; (c) the flow order by route distance holds in at
  least the share the base's ground-only bar declares for the same chains; (d) a chain with nodes on two arenas is never
  reported as close at street scale across the arenas, and a quarter name, when one arises past item 72's threshold, lies
  on the ground; the same bars hold for a dossier's `activeChains[]` fixture; (e) an import or export store of a chain with
  an island node stands at a ground gate or quay (100 %); (f) a chain toggled off and on returns its island nodes to their
  sites where nothing else changed; (g) a T6 declaration of a processing node onto an island is held and lists the
  "crosses the hoist" fate; zero placement failures.
* **T-V5-25 — the magical node** [C]. On 300 CITY seeds each of a dossier fixture without deposits and the same dossier with
  a `magical_node` `available`: `h_town` rises by exactly `node.bonus` (clamped at 1) wherever the interpolated value is
  above 0 and not at all where it is 0; the count, `A` and `E` move monotonically with it (T10-1's monotonicity); two nodes
  add one bonus; `discovered` adds nothing at generation and the bonus at the next epoch; `depleted` and `removed` add
  nothing, and a node removed at an absorb leaves every island floating until the next epoch's evaluation, when the law may
  start its wane (never a vanishing); a standalone map's `h_town` equals the dossier-free fixture's; with a ruin fixture
  holding the node, the term is unchanged and no island rule reads the underground arena; on that fixture the `why` on the
  town supply names that ruin from the report's `ruin.node` line (V04 §3.5.0a (9)) — its new name after a rename of the
  ruin — while on the fixture with no ruin it names the deposit and no ruin; a dossier at a TOWN population fails the
  gate (`gated: rung`).
* **T-V5-26 — the island cathedral's crypt; no catacomb in the sky** (item 109 (k), J111) [C]. On 200 CITY and METROPOLIS
  seeds with a cathedral island: the cathedral carries the settlement's largest crypt, inside the island's rim slab — its
  floor ≥ `cryptFloorM` above the slab's base at every point of the claim — or, where no site passes, the half-sunk form
  with its fate (100 %); on a `flat` island likewise; 0 underground parts, links or catacomb sources on any island (100 %);
  every catacomb lies under a ground cemetery or a quarry ossuary; no island churchyard is a candidate or ranked as the
  largest cemetery; island churches are counted once in the catacomb count; the S3 precinct passes to the largest ground
  church (or `park`), whose crypt is never ranked above the cathedral's.
* **T-V5-27 — the rim as a barrier** (item 106) [C]. Generation lays 0 enceintes on any sky arena; a wall drawn on an
  island with two landings gives exactly two walled stretches, each across its landing yard with a gate at its attach and a
  tower at each rim anchor, and 0 wall edges elsewhere on the rim; one landing gives one stretch; the enclosure test reads
  the island as sealed, the barrier's kind `sheer`; a stroke along the rim away from a landing is bent to the landing
  stretches with "the drop is the wall here" (J-VI.4); adding a third access adds a third stretch; with item 106's `barrier`
  closure and profile off, byte-identical to the base (no-op pin: this fixture's NoOpPin registration on V12 §3.7.8's
  engine under `item106.barrier`, its off form the cells T106-5 names, written by the M6-sky seat landing P2). **With
  item 110:** 0 island `RetainingWall`s classed as an `Enceinte` or a member of a barrier circuit; a T3 `retaining` stroke or T2 terrace stroke on an island lays a
  `RetainingWall` on the island's arena, drawn in its frame and displaced with it under `offset`, tombstoned at a fall and
  exported in `sky`; a retaining stroke on the rim strip or along the rim is bent inward — every point in the strip moved
  radially to 1 m inside the `setback` line, the others unchanged — with `bend.retaining.rim` (J-VI.4 (g)); the unit run's
  levelling lays 0 retaining walls on the rim strip; with item 110's terrace rows off, the island is byte-identical (no-op
  pin: the same fixture registered under `item110.terrace`, its off form V11 §3.24.0's `terrace` row, by the same seat).
* **T-V5-28 — ladders across the arenas** (item 108) [C]. On the surveyed dossiers with islands: no ladder pair is counted
  twice across the arenas; every COUNT, GUILD and QUARTER record's members, counted on both arenas, lie inside its range; a
  cathedral island's subsumed parish churches, resident priest and wayside shrine each count once as its members, on the
  ground or carried, never as additions; an island institution is a singular or SIZE record (100 %).
* **T-V5-29 — the suppression's island form holds** (J-V5.62) [C]. On 200 CITY and METROPOLIS seeds with at least two
  islands: remove a generated island and a generated access on another island, then run a Regenerate, a Re-derive from
  S7b, New random on the other island, a save and reload, and a century of epochs at `auto`: both stay removed (100 %) —
  the removed slot never drawn, filled or re-opened, its outcome `removed by you` in the report; the higher slots' islands
  identical to a run where the removed island was never there but its slot counted filled; the deleted ordinal never
  re-sited and the island keeping a `main` access (the lowest surviving generated ordinal); 0 households allocated to a
  removed slot and ground plus sky households equal to the roster's total at every step; with `islands.count` pinned at 2
  and one of the two removed, 1 island after every re-derivation; an `adjust('islands.count')` to 3 after the removal
  releases nothing — the held slot stays `removed by you`, only the free slots open, and with every slot held the adjust
  opens none and lists its fate — a T5 declaration takes a held slot only when no slot is free, and the removal's undo
  restores the island byte for byte.
* **T-V5-30 — what the raised-way generator reads of the sky** (J-V5.63) [C]. At generation (§4.3's slot) the generated
  raised-way set is byte-identical with the islands setting on and off; on 500 CITY and METROPOLIS seeds with islands and
  on the epoch fixtures of volume 6's raised-way pass: 0 raised ways with a sky endpoint, sky evidence or a sky water source
  (100 %); an elevated road bound to a precinct whose cathedral an institution slot took up still stands, its reason naming
  the hand-over; the aqueduct's need at an epoch counts 0 island households; 0 aqueduct terminals, basins, cisterns or
  fountains on an island.
* **T-V5-31 — item 110 under and on the island** [C, O]. (a) The METROPOLIS sky golden pins one raised way under an
  island: the caster ceiling at SKY reads its deck top with its parapet and its raised-way piers, and the apex clears it by
  ≥ `clearanceM`. (b) On the epoch fixture where volume 6's raised-way pass builds an aqueduct under a floating island and
  a new stage raises a stepped temple beneath another: after the epoch, `sky.clearance` has raised each island's
  `groundRefCm` to the caster (its `elevationCm` kept unless the floor failed, a listed fate "raised clear of the
  aqueduct"), `shadeBasis` untouched, and a replay of the epoch gives the same values. (c) A stepped island temple (volume
  2's `stepped-temple` row): the surface top reads the highest massing tier at each point, and the crypt lies under massing
  tier 0 inside underside tier 0 with its floor ≥ `cryptFloorM` above the slab's base, re-tested at the levelled datum. (d)
  A raised way removed beneath an island leaves its `elevationCm` unchanged. (e) An `own` island's
  `terrainEcho.reliefClass` is the class its `island.place` draw (index `relief`) gives, 100 % over 500 seeds; New random
  re-draws it with the terrain; an `own` record loaded without it gets the same class, written and reported; an `echo` or
  `none` island carries none; and volume 1's `terraceState` on the island's districts reads that class, `plain` for `echo`
  and `none` (T-V1-21). (f) **A lock under the clearance**: on fixture (b) with one island locked (and
  again with only its `altitudeCm` path locked), `sky.clearance` rewrites its `groundRefCm` and `altitudeCm`, keeps its
  `elevationCm` where the floor then fails, lists "clearance held by your lock", and the invariant suite passes by the
  island's exemption; unlocked, the same island is raised. (g) A composed (stage-3) building beneath an island is read at
  its stack envelope's top.
* **T-V5-32 — the stage order and SKY's data keys** (J-V5.70) [C]. With `@plat/hood` and `@plat/sky` both registered, the
  `StageDecl`s sort at load with no cycle, SKY after S7b (its S7c hook included) and before S8, S10a and S12a; S7c's
  declared read-set holds neither `reservations.landing` nor `allocations.landing` (volume 1's read-set test, T-V1-35); S7b
  (1)'s supply term reads each sky pseudo-district at its island's `anchor` + the outline's centroid (100 %); on 500 CITY
  seeds with islands SKY's ground commit records write no data key but those two, and after S10a every host district's
  `modest` residential households plus its landing rows' staff equal the `modest` households S7b allocated it (100 %);
  with the islands setting off neither key carries a row and the ground digest equals the realism golden (T13-1).
* **T-V5-33 — the edge suite** (principle (11)) [C]. One fixture per row of V05 §3.23 whose test column names it — the
  island and access records at load, the strip with no caster, receiver or cell, the rule table's bends, the supplies with
  no built land, the dossier's caps and rung, the clerk's answers without a basis and after a save and load, the coastal,
  harbour and moat shade, the deck receivers, the oasis in a hot arid row, the terraced ward's landing yard, a lock and the
  shade — each asserting the row's outcome with its rung reported, and no crash, hang, lost datum, silent wrong result or
  whole-map retry. **Item 111 on the island** (g item 111; V05 §3.8 (4), V05 §3.11): on an arid fixture with an oasis, the water
  pull and the climate cell at their arid values, no oasis, spring or oasis grove stands on any island, every island's
  `P_I` and water are byte-identical to the same fixture with item 111's cells neutral, an island may float over the oasis
  (its class `water`) and the aqueduct's source search may take the oasis's spring but never an island's water — the arid
  fixture's NoOpPin registration on V12 §3.7.8's engine under `item111.water`, its off form V11 §3.24.0's `climate`
  dry-cell row, written by the M6-sky seat landing P1.
* **T-V5-34 — the island through the year** (item 117; V05 §5.1; takes T117-1 – T117-8's island clauses — T117-3's
  rows and T117-6's opening week have none, the island taking the ground's season rows at the view's week) [C]. On the
  two sky goldens (T-V5-15) and two METROPOLIS fixtures — an `arid` and a `cold` climate row, each with a prosperity
  island carrying a conjured river and one carrying a spring pond, deciduous crowns on both: (a) (T117-1) the same
  document hashes identically in all 52 weeks, its saved bytes, `shadeBasis`, strips and `shadeSky` unchanged — the
  `item117.season` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin over weeks 0–51),
  written by the M6-sky seat landing P3; (b) each island face and crown draws, week by week, the look a ground face or
  crown of its kind draws in the same week under the same climate row — never a row of the island's own (an `own`
  `mountainous` island over `plain` ground included); (c) (T117-2) at the leaf-colour weeks' middle week at least five
  distinct crown colours across a deciduous island's trees, its leaf cover deepening week by week through the leaf-fall
  weeks, on the island's surfaces only, and moving with the island after a move; (d) (T117-4) the arid fixture draws no
  ice and no snow on any island in any week; (T117-5) on the cold fixture the spring pond freezes in the ice weeks, its
  first ice week at or before any of the conjured river's, the river's fast stretches and the waterfall's 12 m lip disc
  stay open water, and `sky.fall` and `sky.mist` draw in every week; (e) (T117-7) at each season's middle week the
  island's look passes T112-1's contrast and colour-blind checks, and in a snow week the island's land, field faces and
  roofs draw `snow` and its rim ticks separate it from the snowy ground by the ink / ground row of §8.2's contrast
  matrix; (f) the drawn shadow's length follows the view sun's week while the strips do not change; (g) every picture
  export of an island draws and names the chosen season, and a VTT island scene carries its frozen water as `ice`
  polygons (§11.1); (h) (T117-8) the season switch re-skins the sky tiles within V05 §6's season row (R12-30).
* **T-V5-35 — festival pennants on the islands** (item 118; V05 §5.1; takes T118-1 – T118-6's island clauses —
  T118-5's staging has none, V11's `SKY` row naming no staging place) [C]. On the two sky goldens with a festival
  fixture (a dossier tradition with a two-week window, a culture motif row and a deity) and with a previewed generic
  festival: (a) (T118-1) the document hashes identically with decorations on and off and in every week — the
  `item118.festival` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; a `view` pin with its `tiles`
  clause), written by the M6-sky seat landing P3; (b) pennants stand on every island not `fallen` or `removed` exactly in
  the window's weeks (T118-2), at V11 §3.25.7's `SKY` row's counts, along the rim and two at each landing top, with no
  kind of a ground tier's row on any island of either golden (T118-4), and none in a landing yard's passage, at the
  waterfall's lip, on a ground landing, on the void or over a label's keep-out (T118-6); (c) (T118-3) the same festival
  draws byte-stable sky tiles per seed across views and exports, and a moved island's pennants move with it; (d) a
  picture export draws them and names the festival, a VTT island scene draws them in its image only; (e) (T118-1) with
  no tradition and no preview, the sky tiles are byte-identical to the base's (the pin's `tiles` clause).
* **T-V5-36 — Find on Sky** (item 120; V05 §5.6; takes T120-1's registration and T120-4's and T120-5's sky clauses)
  [C]. On the two sky goldens and B-CITY-lite's CITY and METROPOLIS seeds with islands, on V09's app harness, each with
  three chip sets — a class the islands hold, an island institution's name and an island by its name — with Show gaps
  off and on: (a) (T120-1) the document hashes identically with Find on and off, and every chip off, or **Clear**,
  restores byte-identical sky tiles — the `item120.find` registration of the sky goldens on V12 §3.7.8's engine (V12
  §2.13; a `view` pin with its `tiles` clause), written by the M6-sky seat landing P3; (b) each chip's sky matches equal
  §11.2's gazetteer rows on the islands at the key, the panel's "on Sky" count their number; (c) with Ground working,
  every sky match shows a ghost pin at its drawn position under each occlusion mode, with the sky layer shown and hidden,
  and Go there sets Sky with the match's island; (d) (T120-5) at the city band every sky match has a pin or a bubble,
  each carrying its chip's second cue, and no bubble joins two islands' or two layers' pins; (e) under a player view on
  an island form of T-V9-66's knowledge canary — a `secret` access's landing yard and a concealed use on an island —
  nothing withheld surfaces in a suggestion, count, glow, pin or ghost pin; (f) (T120-4) the chips survive every band
  and layer change and a raise, a move (the glow moving with the island), a fall (its matches dark, its landfall offered
  on Ground), an `advance` with its epochs, an undo, a redo, a regenerate, a load and a migration, each match set equal to a
  fresh evaluation there, and a chip whose last match goes — an island institution's after its island falls — stays at
  count 0, dark; (g) Show gaps outlines exactly V01 §5.4 (3)'s `gapUnits` on the islands as V05 §5.6 (4) reads them —
  each island district for a class with no coverage row or a row counted by district or neighbourhood; under a
  walking-radius row every residential plot of an island holding no member, whatever the ground beneath holds, and none
  of one holding a member; under a households row each district's unserved plots by V01's per-plot reading — a class
  `IslandRule.carry.never` excludes among them; (h) item 120 (j)'s suggestion and glow timings hold with three islands at
  the METROPOLIS cap (V05 §6's Find row).

**Parity.** No reference has islands (II.6 (8)), so no parity number binds them. The nearest look is Neighbourhood's lone
patch — its own ground tone and a drop shadow marking its extent on an empty field (`research/findings/vg-ng-devlogs.md`
§B3.5) — so M6-sky's sitting is V12 §3.9.1's `PanelSpec` for M6-sky, a descriptive NG set (X-V12-4): five island
close-ups in `hatched` beside five Neighbourhood patches, rated for "reads as a floating patch" — information for the
owner, never a gate.
=== END ===

=== REPLACE ## 8 Build plan ===
## 8 Build plan

**Milestone M6-sky** — after M6-U in J122's combined order (§16; V05 §11), its P0 spike beside M5 so the island's unit
inputs to volume 1's unit run are settled while volume 1 is built; it needs volume 1's unit run (M5) and M4's hooks (S7b
(5), the island conversion kinds).

| phase | content | exit (executed) | pw |
|---|---|---|---|
| P0 — spikes | the supply calibration run (V05 §3.3); placement over 1 000 islands with the reachability filter; the unit inputs to volume 1's unit runner on a hand-built arena (with `districtHa` and the gradient: the band shares and the re-homed count); the caster allowance measurement (V05 §3.9 (5)) with item 110's rows on; the strip against the rung-3 shadow on one fixture; the save-and-reload of a lagging strip | the ⟨P0⟩ rows set or the fallbacks applied; T-V5-5's rates; the runner's contract passes T-V5-9 on the fixture; T-V5-10's ≥ 99 % clause; T-V5-20 on the fixture; T-V5-21 (h) on the fixture | 1.5–2 |
| P1 — the model | the records (file f items 203, 204, 213, 251–253, 274, 282, 286, 295, 296, 546, 547); `nextSkyPart`; `shadeBasis` and its load path; S7b (5)'s gate, slots, reasons (the archetype match and the ladder filter included), fills with `carry`, the held shares and the node term, the hand-over of S3 reservations, outline, reachability and placement; the arena with its outline-sized frame, the terrain echo, the river; the underside, the ground reference and the altitude at SKY (item 110's raised parts, retaining walls and levelled platforms among the casters); the claim search with the crypt test; the gradient field; the strips from the bases on the unlevelled receivers, their fold into field pass 2 and the island-free value; the sky receivers; F-SKY-FILL, -PLACE, -TERRAIN, -SHADE, -CRYPT, -HANDOVER; SKY's own ground data keys; the strips held from their first read and the bases at S10a's start; the optional basis and its schema-chain step | T-V5-1 to T-V5-7, T-V5-10, T-V5-19, T-V5-21 (a), (e), (f), (h), T-V5-25, T-V5-26, T-V5-32, T-V5-33's rows of these mechanisms; `plat calibrate register --check` green over the cells it lands (`islands.json` whole, V11 §3.1 row 56) | 3.75–4.75 |
| P2 — access, the unit inputs and siting | access tops, feet and landing claims (ground and hinterland) with the S8 destinations (file f item 299), the rim strip and its walk, the island's context vector, the `sky` request and `skyUnitInput` with `districtHa`, the kinds and the fabric prior, SKY-F with the clearance check and both repairs, the sky lights (item 307), names; the route distance in both S10b runs and the island's coverage units (item 308); the supply web, splits, per-arena order and relaxation, the district term, `comfortM` and spacing across the arenas (V05 §3.20 (10)–(12)); chains across the island, custom and `activeChains[]`; the rim as a barrier; item 110 against the accesses — admissible ground without decks and raised-way piers, `lineClearM`, `skyAccessObstacles` for the raised-way solver and T4, the island's retaining walls in the unit run's contract, the generator's reads of the sky (items 245, 290, 309) | T-V5-8, T-V5-9, T-V5-11, T-V5-22, T-V5-23, T-V5-24, T-V5-27, T-V5-28, T-V5-30 (with T-V5-8's and T-V5-27's item-110 clauses), T-V5-33's rows of these mechanisms; `plat calibrate register --check` green over the cells it lands (the sky rows of `lights.json`, V11 §3.1 row 51, with the `keel` row's `radiusMarginM`) | 4–5.25 |
| P3 — the picture | the marks with their sheet rows (file f item 408), the three occlusion modes with the underside and tether, the sky surface layer in the tile worker and the light pass (CPU reference and GPU) with the window without slabs (item 416), rung 3's prism tiers, the cursor sun's floor, labels (item 415); the strip's outlines in volume 9's shade map view; the island's seasonal look, its festival pennants and Find on Sky (items 117, 118, 120; V05 §5.1, V05 §5.6) | T-V5-12, T-V5-13, T-V5-20, T-V5-34, T-V5-35, T-V5-36 | 3.75–5.5 |
| P4 — editing | V05 §4.2's events and parameters (the island brushes, the access `setAttr` semantics, the pointer mapping in `offset`, an island wall, the hand-placed cap), dry runs with the shade fate and the bends, Update shade now, locality, undo (items 356, 375), DR27 and its coherence with the dossier-removal path (item 387), the clerk's `WhyProvider` with the strip, route, link and siting answers; `convert removeIsland` and the removed ordinals with their holds (item 260) | T-V5-16, T-V5-29 | 2.25–3 |
| P5 — exports | GeoJSON (the strip features included), SVG, PNG, VTT, glTF, CityJSON's extension types, the statistics rows | T-V5-17 | 1–1.5 |
| P6 — time | `IslandEpochStep` with the household channels and the re-reasoning of an island whose institution left (its lock clause included), the bases and strips re-read at each epoch and the lag, the landfall over every covered kind (item 110's raised spans, raised-way piers, retaining walls and deck plots, and other islands' accesses, included), the participant `sky.clearance` with `reclearIsland` and the ledger by hand and on the M4 grow path (item 320); the engine-driven schedule joins volume 6's milestone; the one-time waits timed against item 119's comfort level | T-V5-14, T-V5-15, T-V5-18 (its comfort-level clause included), T-V5-21 (b)–(d), (g), T-V5-31, T-V5-33's remaining rows | 1.75–2.75 |
| **total** | | | **18–24.75** |

V09's AP7 (the sky's screens) is built beside P4 and priced in §16's line of the application's staged screens, outside
this total (XV-V9-8).

**Dependencies:** P0 needs M4's hooks and the unit runner's first cut from volume 1 (M5); P1 needs §4.5's daylight term
with its per-sample mask and model sampler (item 102; file f item 296) and item 103's profile columns for the noxious
exclusion (with a fixture profile set until volume 11's rows land); P1 → P2 → P3; P2's route distance needs item 308 and
its archetype match item 104's profile resolution (fixtures until then); P2's chain rules need item 104 (b)'s active chains
through the port (volume 8) and volume 1's working-quarter reading (fixture chains and a stub reading until then); P1's
node term needs volume 8's deposits row (a fixture digest until then); P6's registration needs volume 6's
`EpochParticipant` (a direct call from the M4 grow path until then); P6's household channels need volume 6's
`demandTaken` row and the displaced pool's cause `island` (§4.7's overflow pass inside the conversion until then); P1's
crypt test needs volume 2's basement ladder and volume 11's crypt column (the full form and a fixture column until then);
P2's web, splits and spread need items 105 and 107 as applied and volume 11's goods, balance and `split` rows (fixture rows
until then), and the rim barrier item 106's `barrier` closure and volume 11's `sheer` row; item 110's parts need items 244,
245, 246, 290 and 309 as applied, volume 2's stack envelope (V02 §3.15.2) and volume 11's raised-way height and terrace
rows (fixture rows until then), and P6's `sky.clearance` needs volume 6's `afterGrowth` participant table and `EpochScope`
(a direct call after the M4 grow path's growth until then); P3's looks need §8.2's season and festival rows with V11
§3.25.6 – V11 §3.25.7's tables (fixture rows until then) and its Find part V09's Find panel and `live.find`, which land
at M5 (Find's milestone; §16) before P3, so T-V5-36 lands with P3 at M6-sky; P6's comfort-level runs need V12 §3.15.9's
wait timer and V06 §6.8's estimate; P4 and P5 after P2;
P6 after P4. **Risks, in order:** the two-surface light pass's frame cost (P3; fallback: half resolution, then rung 3 for
the sky base); the field's power to
tell rich towns from poor (P0; fallback: the `wealthLevel` blend); the unit-run contract across volumes (P0; tested as a
contract, T-V5-9); the strip's cost at METROPOLIS under the low samples (P1; fallback: V05 §6's coarser step and mask,
then the reach cap); the route distance's share of the pooled S10b (P2; fallback: island classes stand at the land
centroid for every ground-side read, post-build included); placement on awkward sites (P0; F-SKY-PLACE's ladder);
watertight lofting of rough tiers in glTF (P5; fallback: roughness 0 in the mesh only); the gradient's band shares under
the smoothing (P0; fallback: `field.bandInset` 0.1 → 0.2, then the smoothing's width halved on the island, re-measured);
the light pass on uncovered tiles (P3; fallback: the exact per-tile slab cull, V05 §6); item 110's arches and decks under
islands against `casterAllowanceM` (P0; fallback: V05 §3.9 (5)'s measured 99.9th percentile with item 110's rows on). **In
§16:** the row M6-sky after M6-U at 18–24.75 pw, outside the base total as a staged subject, the totals computed once
there (file f items 476, 568).

**The register at the exits** (J-V5.80; X-V12-16). Every phase that lands a registry table, or a calibratable column or
cell of one, exits with `plat calibrate register --check` (T-V12-20) green over the cells it lands. Two phases do: P1
lands `islands.json` whole (V05 §2.4's default rows, `accessSiting.deckGapM`, `lineClearM` and `accessCount.handMax`
among them, although their readers are built at P2, P4 and P6), and P2 lands the sky rows of `lights.json` with the `keel`
row's `radiusMarginM` cell. The landing seat writes the entries in the same change with `plat calibrate register
--defaults --milestone V5-P1` (or `V5-P2`, V12 §2.8's volume-qualified form; X-V12-17) — V12 §3.11's default line — for
every calibratable column of those cells that has no entry yet; a light-table column the base landed already holds one and
takes none, since the command never touches an existing entry. This volume writes no register line of its own. The three
⟨P0⟩ cells (`townSupply`, `carriedSupply`, `casterAllowanceM`) are set by P0's spikes, which run on a spike branch with a
draft `islands.json`, land no cell, and apply their fallbacks (V05 §3.3, V05 §3.9 (5)) before P1 lands the table; so each
lands as an `own` value whose provenance note names the run that set it ("set by M6-sky's P0 run, V05 §3.3", or "…, V05
§3.9 (5)" for the caster allowance; never a `fixed:` note), and T-V5-3 and T-V5-10 then hold it as ordinary bars at the
phase exits, where a failure fails the exit. No frame holds an island, so the corpus stage closes each default-line
column of `islands.json` `fixed` with "no admissible frame" (V12 §3.11). In J122's order M6-sky lands before M-CAL, so
its default-line entries fall due at M-CAL's corpus run; were it to land after M-CAL's `ReconciliationRecord`, they fall
due at `M-CAL/sky` (V12 §3.11's *The due's corpus run*; J-V12.75; X-V12-17). P3's sheet rows are semantics whose values
are volume 11's palette rows; P0, P4, P5 and P6 land no calibratable cell, their constants being P1's rows.
=== END ===

=== REPLACE ## 9 Decisions (each vetoable) ===
## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V5.1 | Chose to lay each island in its own local frame and stand it over the ground by one integer translation (`anchor`), over laying it in world coordinates, because a move then changes one attribute instead of warping every vertex, keeps every logged position on the island valid, and keeps every lattice point a lattice point; no rotation, since a turned island would leave the lattice (a turn is a reshape). |
| J-V5.2 | Chose sky part numbers from a never-reused document counter (`nextSkyPart`), the count-law slot a separate field, over the base's "sky parts 1–3", because an island raised after a fall would otherwise reuse a part whose addresses stand as tombstones, against §6.3's never-reused rule. |
| J-V5.3 | Chose to read both supplies on the field's absolute value with value-keyed rows, over the base's town cut, because the cuts are per-town quantiles: a town mean against its own quantile measures the distribution's shape, never the town's wealth, and a mean never reaches the field's top (RV-pc-3); the rows are calibrated at P0 with a pre-decided fallback. |
| J-V5.4 | Chose to give each slot its purpose by one weighted draw among a prosperity island and the eligible institution rows, the institution taken from the roster's own demand, over adding an institution the roster did not ask for, because the roster decides demand (§4.2 S2) and the population stays whole. |
| J-V5.5 | Chose to settle each island's outline and placement inside S7b (5), before S7b (1) allocates the ground, over placing islands after S7b, because a slot that cannot be placed must return its households before the ground's allocation, never through a second S7b run. |
| J-V5.6 | Chose to floor the altitude at the rim, the root and a 25 m clearance over the tallest thing beneath, over clamping the root's depth, because the owner asked for the rock beneath to shape the shadow (J98): a deep root lifts its island rather than being cut short. |
| J-V5.7 | Chose to resize an island by eroding or dilating its rim with the kernel's buffer, over re-drawing the outline from its stream, because a re-draw moves every rim point and re-cuts plots all round, while a buffer changes only a band at the rim and keeps the shape. |
| J-V5.8 | Chose hoists — a winch house and a cage on ropes, as clifftop monasteries were reached — as the default access, rope lines over water, and floating stairs and bridges of light only where the world has magic, over bridges of light everywhere, because the realism tiebreaker tempers the fantasy: the island is the one magic the setting asks for. |
| J-V5.9 | Chose to leave the island's magical lights ungated by the `magic` circumstance, over hiding them when it is `none`, because the island exists by its own setting and its magic is what holds it up; the circumstance still gates the stairs, the bridges of light and the ground's magical lights. |
| J-V5.10 | Chose to make generation and epochs obey the supply law strictly while letting an author's declaration or lock hold an island against it, with the fate `held against its supply` listed, and to keep the rung gate absolute, over refusing such a declaration or letting the rung be overridden, because everything is editable yet the base disables the setting below CITY. |
| J-V5.11 | Chose to make the landfall a conversion of everything it covers, one outcome per covered kind (V05 §3.16 (4)), the stone credited to the salvage ledger and no edge added or removed, over cutting a new ruin face, leaving no mark, or covering plots and fields only, because it stays local, undoes exactly, keeps the old plan for regrowth, ties the fall into the ledger's salvage demand, and leaves no intact wall or open street standing in a field of fallen rock. |
| J-V5.12 | Chose to draw everything on existing concerns (`island.place`, `terrain.noise`, `water.river`, `field.chance`, `naming`) with named creation indices, over a new concern, because §6.1's registry already reserves `island.place` for the islands and no draw here reads another concern's order. |
| J-V5.13 | Chose to redraw only empty slots at an epoch, a supplied island staying, over reading that a slot may close and send its island down the decline ladder, because an island falls for want of magic, never by chance while it is paid for. |
| J-V5.14 | Chose to floor the cursor sun's height at 1.5 × the display list's top whenever the sky layer is visible and the document holds an island that is not fallen, over letting the sun stand below an island at close zooms or flooring it only while an island is in view, because a sun below a floating island casts its shadow upward and reads as an error, and a floor that switched on as an island panned into view would jolt every shadow on screen mid-pan. |
| J-V5.15 | Chose an underside of nested prism tiers following a profile function (cone, bowl, root, flat), over the base's one slab and over a full mesh in the light pass, because the tiers give the rock's silhouette to the existing slab traversal at a few records per island. |
| J-V5.16 | Chose a second base and surface layer only on tiles an island covers, lit separately and composed by the occlusion mode, over lighting the ghosted ground as the island's surface, because the ground seen through a ghosted island must take its own light and the island's shadow. |
| J-V5.17 | Chose to claim the ground landing yards at SKY, before S8, touching a way spine, over placing landings after the plots are cut, because the yard then fronts a way by construction and no plot is re-cut. |
| J-V5.18 | Chose a rank gradient on a prosperity island — each carried band given its carried share of the island's land, mapped onto its own band's inner range, the richest on the high ground and the rim that looks over the city (0.6 elevation, 0.4 view) — with a small noise term, the shade and the brush on top, over one uniform value or a driver raster, because a uniform value houses only one band and S10a would re-home the rest to the ground (the owner's "prosperity is a gradient and a band"), while an island has no market, wall, tannery or low damp ground to drive a raster; an institution island stays uniform. |
| J-V5.19 | Chose to refuse the setting where a bound dossier's `site.magic` is `none`, and to keep the setting and the circumstance independent without a dossier, because a floating island would contradict a dossier's magic-less world (item 20 (h)'s coherence) while a standalone map's two toggles are the author's. |
| J-V5.20 | Chose to re-land an island's accesses after a move by closing and opening the landing designation on two ground plots each, over re-deriving the ground under the old and new feet, because a move then touches no ground geometry. |
| J-V5.21 | Chose `delete` of an island to relocate its households to the ground without a ruin, the ruinous path being `fallIsland`, over one behaviour for both, because an author removing an island and a history bringing one down are different acts. |
| J-V5.22 | Chose to release a waning island's households in reverse ordinal order into each epoch's ground demand, over moving them all at the wane, because §4.11 empties a declining town by its suffix with a lag, and a wane is a decline. |
| J-V5.23 | Chose the conjured river's width by the ground's width law on a conjured share of the ground river's flow, over a fixed width, because the owner asked for a river that echoes the ground's, and the law keeps the echo proportional; its water is magic's own and satisfies no need. |
| J-V5.24 | Chose the prison row's requirement band to be its paymaster's (`prosperous`), over its inmates', because the owner names a prison island as possible and the town's rulers keep it aloft. |
| J-V5.25 | Chose to hold the islands setting off under the `MFCG` and `FTG` presets, because no reference has islands and the parity presets switch every extension off (item 23). |
| J-V5.26 | Chose an unbuilt rim strip of 6 m inside the rim, planted as a rim walk with a row of trees, over plots to the edge — the Neighbourhood look, whose blocks are clipped by the patch's ragged edge (`research/findings/vg-ng-devlogs.md` §B2) — because no house stands on a cliff edge (the realism tiebreaker), the strip keeps the rim legible at every band, and the trees on the rim keep the floating patch's look `docs/IMPROVEMENTS.md` S1 asks for. |
| J-V5.27 | Chose to let an island edit leave the ground's field and its strips at their basis until the next epoch or a Re-derive from S10a — the fate listed, Update shade now offered for an immediate scoped change, the basis persisted so the lag survives a save (J-V5.47) — over re-evaluating the field at every island edit and re-deriving the blocks past τ as the terrain brush does, because the owner asked that shade move the town over time by the normal lag (item 102 (e)), and a drag of an island would otherwise re-cut plots under two strips far from the island for one gesture. |
| J-V5.28 | Chose to take volume 1's partition and district count for an island's districts and drop this volume's own count and seeds, over keeping both, because volume 1 lays them by the bent cut (J-V1.17) and two counts for one island would be two sources of one fact; V01 §3.10.3 carries the inputs this volume governs. |
| J-V5.29 | Chose to fix the ground reference and the altitude at SKY from the casters already placed, the tower rows of the allocated classes and a caster allowance, over reading the built casters at SKY-F, because field pass 2 must read the island's shade before any plot is cut and the altitude must not move after that read; the rare taller caster raises it at SKY-F with the strip's basis kept, a share measured at P0 with a pre-decided fallback. |
| J-V5.30 | Chose the model's strip as a derived record over the tiers without roughness, carrying no edit kind, over the view's rough tiers or an editable strip, because the roughness is view data keyed by the render key (§6.2), which the model must never read, and a strip is a consequence of its island — edited through the island, item 102's weight and the brush; at the field's 32 m cell the roughness is below one cell. |
| J-V5.31 | Chose a fourth island institution row, the arcane `tower`, admitted only where the world has magic and taking a custom kind of the `exotic-tower` archetype, and the archetype column on the palace and cathedral rows, over leaving custom institutions off the islands, because item 104 asks that custom content land sensibly with no hand-written rules and a tower "on its own ground, apart" is the owner's unique institution in its plainest fantasy form; it arises only when the roster or the dossier demands one. |
| J-V5.32 | Chose to leave on the ground, by the editable table `IslandRule.carry`, the top-step emitters, the heavy processors and wholesale and storage, the classes with a hard need an island cannot meet, and an active chain's working nodes (V05 §3.5 (3) (a)), over excluding the top-step emitters only, because an island has no downwind, downstream or extramural ground, no quay or gate, and no water that satisfies a need (its conjured river is magic's own), and the owner's rule that the tannery goes "down river" and away from homes cannot be met there. |
| J-V5.33 | Chose to let an island's own terrain cast nothing on its own context, over running the terrain shade on the island's terrain, because that relief is a gentle dome at a quarter of the ground's amplitude whose self-shade stays below a field cell; a higher island's shade on it is real and kept, and at an epoch its own buildings cast on it through volume 6's mask on its lattice, as item 102 (b) asks of every building. |
| J-V5.34 | Chose to keep the island's own placement score (V05 §3.7) apart from item 103's relation families, over scoring the island's position with them, because the island is placed as one body at S7b (5) before any plot exists, while the families score plots against placed neighbours; its purpose rows are the island-scale reading of the institutions' profiles, aligned by volume 11. |
| J-V5.35 | Chose to export the strip as a thematic layer only — GeoJSON features, the shade map view's SVG, the statistics — over carrying it in the lit raster, VTT, glTF and CityJSON, because those formats already carry the island's physical shadow and solid, and a model day's shade share is a statistic, not a picture. |
| J-V5.36 | Chose to measure every pull that crosses arenas by the route through the island's admitted accesses — the island's street leg, a 100 m transfer, the ride and the ground's street leg, as §4.7's `road` mode runs through a gate — and every nuisance by the straight distance in three dimensions, over one straight distance for all, because goods and people ride the hoist while smoke, smell and noise travel through the air. |
| J-V5.37 | Chose to count an island as k units for coverage rows counted by district or neighbourhood (k its district count by `districtHa`), one unit for walking-radius rows and ⌈H ÷ N⌉ for household rows, over one unit for every row, because the island's districts are real districts and the owner's example is "one apothecary per district", while the ride to the ground passes every walking radius. |
| J-V5.38 | Chose to OR the islands' shade into the daylight term sample by sample, over adding their shares to pass 1's, because a cell in a hill's shade and an island's at the same hour is in shade once — an added share would count it twice and could pass the term's all-day bound. |
| J-V5.39 | Chose to keep an active custom chain's resource and processing nodes on the ground — only its final seller and its consumers going up by the carried share, the island's own institution keeping its links by the route, an author's declaration outranking the rule with a listed fate — over carrying chain nodes by the proportional share alone, because the owner asked that a chain be placed as one connected thing: splitting its working steps across a hoist breaks it at its most visible point, and an island offers no terrain feature, extramural edge or water leg for a chain's upstream steps. |
| J-V5.40 | *amended by J-VI.13.* Chose to leave the new derivation row's number to the integration, over taking DR26, because volumes 1, 6 and 8 each proposed a DR26 in parallel and one number for four rows would make the derivation table's references ambiguous; the row is DR27 (file f items 383, 387). |
| J-V5.41 | Chose to read the dossier's `magical_node` deposit as a flat, positionless addend to `h_town`, acting only where the town already supplies some magic, over a placement pull toward the node or a multiplier, because the node's position — at a ruin's centre where a ruin exists (item 109 (f)), else S12a's decoration site — is volume 4's and volume 8's and is fixed after S7b (5) places the islands, reading it would tie the islands to the underground (item 2), a multiplier would vanish exactly where a node matters most (a middling town), and the owner's "no prosperity, no islands" forbids a node lifting a town that supplies nothing. |
| J-V5.42 | Chose the model sampler's default — nine suns at the midpoints of nine equal slices of the equinox day at the site latitude; one point per field cell — with volume 6's per-cell layout of points × suns, stated at §4.5 (file f item 296), over leaving it unstated, because the strip and volume 6's building mask must OR bit for bit and neither can be built on an unstated layout; the strip reads whatever the sampler holds. |
| J-V5.43 | Chose a vault in the island's own rock — the rim slab, underside tier 0, present under every underside kind — for an island cathedral's crypt, the settlement's largest, over a ground crypt or no crypt, because only that keeps both the owner's crypt rule (item 109 (k) (2), J111: "cathedral also gets crypts but cemetaries get catacombs") and item 2's "no relation with the sewer system or underground"; island churchyards are surface burial grounds only, never catacomb candidates, while island churches still count toward the catacomb count. |
| J-V5.44 | Chose to state the reach cap of 8 × the caster's height as the model sampler's rule for every source — terrain, walls, islands and volume 6's building mask — over leaving each source its own reach, because the sources are OR-ed into one mask, which must follow one reach law (§8.4's cap). |
| J-V5.45 | Chose an island district size of its own, `districtHa`, over the town's mean district area, because with the town's mean a full CITY island is always one district and three never occur at METROPOLIS, so the owner's "a collection of neighbourhoods" could not happen; the count is volume 1's `skyDistrictCount` with volume 1's `plotShare`, the same cell the fill's stop and the coverage overshoot read, so one edit moves the count, the fill and the overshoot together. |
| J-V5.46 | Chose to hand an S3 reservation an institution island leaves to the row's hand-over classes — the cathedral's close to the town's largest parish church (or temple), the palace's site to the town hall or a guild hall, else a park — and to skip the reservation where the creation prefix already sends the institution up, over leaving it empty or re-planning S3, because a reserved site with no owner is a hole no stage fills, the old close as the mother church's and the old palace as the town hall are the historical pattern, and the castle holds its own S3 reservation (so handing the palace's to the castle row would reserve twice). |
| J-V5.47 | Chose to persist, per island, the `shadeBasis` its strips were last computed from — written only by a shade evaluation — over recomputing the strips on load from the live island or storing the strips' bits, because the owner's lag (item 102 (e)) must survive a save and a replay (the base recomputes the fields on load, §2.9), and a basis of ≤ 2.5 KB rebuilds the strips exactly where the bits would cost up to 60 KB. |
| J-V5.48 | Chose island district kinds keyed `sky-island`, `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower`, owned by this volume and adopted by volume 1, and a fabric hint that is a prior (× 3 on the hinted template at S7c) and never a forced strategy, over reusing the ground's kinds or forcing the template, because `temple` is already a ground kind (one table, one row per key), and the owner's islands should vary as neighbourhoods do while leaning toward the fitting form. |
| J-V5.49 | Chose to read the rim as a `sheer` natural barrier (closure, no wall), never to wall an island by generation, and to make an author's island wall a barrier-closure enceinte walling only the landing yards with a gate at each attach, over walling the rim or refusing island walls, because item 106 asks walls to use natural barriers and an island is barrier all round, approachable only at its landings. |
| J-V5.50 | Chose to bind consumers to providers across the arenas by the route and to count a cross-arena consumer at the access's foot (or top) for its provider's two-way pull, over binding by the straight distance or counting it at its world position, because goods ride the hoist and arrive at the landing, never at the fields beneath the island. |
| J-V5.51 | Chose to let a split class's shop go up by the carried share while its works stays on the ground, joined by `branchOf` and the route, over keeping the whole class on the ground, because item 105 (h)'s split exists exactly so a noxious works and its retail can stand apart, and a rich island's butcher's stall or taphouse is historically faithful. |
| J-V5.52 | Chose to run item 105 (f)'s order and relaxation on each arena on its own at generation, each reading only the other's proxies (the island's land centroid; the ground's S10a block), over one joint order across the arenas, because the island's unit run and the pooled S10b run concurrently and a joint order would make placements depend on the worker's interleaving. |
| J-V5.53 | Chose to re-reason an island whose institution the dossier removes — the next instance of its row, else a prosperity island, else a wane — at the next epoch, the institution itself leaving at once and a lock holding the re-reasoning until it is lifted, over deleting the island or leaving a vacant claim, because the dossier is truth (item 20 (h)) while the island is the map's and changes only by its own law. |
| J-V5.54 | Chose to admit an island site only where its rim meets or lies within an admitted slanted access's run of admissible ground, over placing freely and reporting an unreachable island, because an island over open water beyond a rope line's run has no access at all, which no rung repairs. |
| J-V5.55 | Chose to project every island tier in the `prism` form at rung 3, over the `drop` form, because a drop offsets a tier by one height only and a root's thin tiers then draw as disjoint beads; `drop` stays only for the rung-3 budget fallback, with tiers subdivided so drops overlap. |
| J-V5.56 | Chose to take the global light's window from the surface layers' own top and to test each slab over its own reach, over one window from a top that counts the island's slab, because an island 150–250 m up would otherwise lengthen every ground ray's window five- to eightfold on every tile, for the same result. |
| J-V5.57 | Chose to let an island institution be only one building or compound — a singular record or a SIZE step — and to send a subsuming greater up alone, its lessers staying separate members, over admitting any record, because a COUNT, GUILD or QUARTER record is many buildings (item 108) and one island cannot carry all of them, while a member taken alone would count twice. |
| J-V5.58 | Chose to give the cathedral row a second tag, the great temple of a non-default religion, over the cathedral alone, because item 23 forbids hard-coded universals and volume 11 already treats the great temple "as cathedral". |
| J-V5.59 | Chose an exact O(1) pre-test per corridor cell (its own ray's track against the solid's bounding box) for the strip's window in rough relief, over two-pass extremes, because extremes taken over a smaller window can miss a low cell far from the island that the ray still reaches, while the pre-test is exact and as cheap. |
| J-V5.60 | Chose to stand every access foot and landing yard on part-0 land only, clear of piers, dilated decks and deck faces (V05 §3.22 (3)), and to make the accesses overhead obstacles every raised course laid after SKY keeps clear of, over letting a deck span a landing yard or a rope line, because a hoist's cage and a rope line need open air while item 110 (b) lets a deck span anything, and a yard on a mid-span deck or beside an aqueduct is reachable by nobody. |
| J-V5.61 | *amended by J-VI.4.* Chose that no raised way reaches an island and no raised part stands on one, and that no `SkyAccess` is a way or carries deck plots, over admitting a raised way into the sky or a second sky part per island, because II.1's sky has "no portals, no roads in or out", sky access is `SkyAccess` only, and item 110 (b)'s decks live in ground parts; a T4 `raised` or aqueduct stroke ending on a rim, or lying on an island's key, is bent (J-VI.4 (d), (e)), never refused. |
| J-V5.62 | *amended by J-VI.14.* Chose to keep a removed island as a live record in state `removed` that holds its slot closed and counted as filled at every re-derivation and epoch (V05 §3.2 (6)), and a deleted generated access's ordinal likewise (V05 §3.10 (1)), over re-drawing the slot, matching tombstones or reading the log ahead, because the owner's removal "holds through regeneration" (item 110 (b)), the base's collision rule re-mints over a tombstone, and a live record read at every derivation is the base's own pattern (a fallen island's record) — the owner removed that island, not the town's quota of islands; one suppression rule in two record forms, a count never releasing a hold (file f item 260). |
| J-V5.63 | Chose that item 110 (b)'s generator reads the sky only as V05 §3.22 (5) states — endpoints bound to reservations, ground-arena entities only by `PlatKey.layer`, the water need by arena, ground hydrology only — with every generated raised part committed before S7b (1) (§4.3's slot, file f item 290), over letting the generator read islands, because at generation the sky fill runs after the generator, a list of `sky-*` kinds would drift from the arena test, and an island's spring pond 60–220 m up is exactly what a naive search for a higher spring would find. |
| J-V5.64 | Chose that a landfall ruins the raised spans and piers it covers, steps the retaining walls it covers to `decayed` (kept decayed through a re-derivation until an epoch's restoration) and brings down the deck plots on a covered deck with their deck, as V05 §3.16 (4)'s table states, over re-deriving generated retaining walls "under the rubble" or leaving raised parts untouched, because re-derivation would stand an intact wall in a field of fallen rock, and the landfall's own rule is that states change and each change is a listed fate. |
| J-V5.65 | Chose the strip's receiver heights to be the unlevelled ground raster the field reads (S1 with the T2 terrain strokes), item 110 (a)'s levelling kept as platform datums (file f item 309), the basis's receiver version the hash of those heights, and a ground terrain edit re-reading strip bits over its scope from the unchanged bases, over a stored terrain version on the basis, because a load cannot rebuild from a superseded terrain version while the unlevelled raster is what the field and volume 6's shade mask already read (V06 §3.4), and a terrain edit moves the receiver, not the caster whose lag item 102 (e) asks for. |
| J-V5.66 | Chose to write "underside tiers" for the rock beneath an island and "massing tiers" for item 110 (c)'s stacked wings wherever both could be meant, the crypt lying "under the building's lowest massing tier, inside underside tier 0 (the rim slab)" and the surface top reading each point's highest massing tier, over one bare "tier", because a stepped temple on an island puts both in one sentence. |
| J-V5.67 | Chose to record item 110's arrival as one declared shift of both sky goldens with a no-op pin (item 110's rows off: byte-identical), the METROPOLIS golden pinning a raised way under an island, over re-recording the goldens silently, because the owner's default at CITY and METROPOLIS legitimately changes both, and a shift that rides silently hides every later regression behind it. |
| J-V5.68 | Chose to re-check every island's clearance after each epoch's growth by a second participant `sky.clearance` (V05 §3.15 (7)) and to let the island yield to the city (V05 §3.22 (2)), over checking at `afterField`, constraining the raised-way solver by islands, or re-evaluating the strip at the raise, because an epoch's raised parts, new stage and close-ups exist only after growth, a city builds its aqueduct where the water is, and item 102 (e)'s lag keeps the strip's basis to the next evaluation. |
| J-V5.69 | Chose to lay an island's retaining walls — the unit run's levelling and an author's T3 `retaining` or T2 terrace stroke — as `RetainingWall` records on the island's own arena, never an enclosure, never on the rim strip or along the rim (a stroke there bent inward past the rim walk, J-VI.4 (g)), over reading T3 on an island as an enceinte or keeping retaining walls on the ground layer only, because item 110 (a) says a retaining wall "is not an `Enceinte`" and holds the terrain it levels, which on an island is the island's, while the rim strip is never cut. |
| J-V5.70 | Chose to give SKY's ground writes data keys of their own, `reservations.landing` and `allocations.landing`, declared only by their readers (S8, S10a with S9b, S12a), S10a taking a landing's two staff households from its host district's `modest` demand, over SKY writing `reservations` and `allocations` as S3 and S7b do or SKY running before S7c, because with §4.12's hooks united into S7b's declared I/O a SKY that writes S7b's keys after S7b closes a cycle in §4.1's sort, while a SKY before S7c would split S7b; own keys order SKY after S7b and before its readers with no cycle, and SKY then rewrites no row S7b wrote. |
| J-V5.71 | Chose to compute the strips onto the ground once per shade evaluation, at their first read — volume 1's S9b at S10a's `afterDrivers` hook where it is registered, else field pass 2 — and hold them for every later reader, and at a re-derivation starting after SKY to write the islands' bases at S10a's start, before step (i) and every hook, over computing bases and strips at field pass 2 alone, because S9b's manor sun factor, the hood pins' shade gate and `DistrictContext.shade.islandShare` read the strips before pass 2, and a re-derivation from S10a would otherwise let the manor pick read strips from the old bases while the field folds the new. |
| J-V5.72 | Chose an optional `shadeBasis` — absent on an island raised at an epoch after S6 or declared between evaluations, which casts and receives no strip until the next evaluation — and a load that computes bases only through §7.5's schema chain for a document older than the basis step, never from an absent basis, over writing a basis at the raise or computing an absent one at load, because a basis written at the raise would move the field before the owner's lag lets it (item 102 (e)), and a basis invented at load gives a strip the session never had, breaking T-V5-21 (h). |
| J-V5.73 | Chose to write a covered way's class to volume 6's `Way.formerClass` in the `fallIsland` batch, keeping a `formerClass` the way already carries, over a landfall field of this volume's own or no record, because volume 6's landfall clearance restores the class from `formerClass` alone (V06 §3.5.2) — without the write every covered primary would stay a track for ever — and a lane volume 6 had downgraded should get back the class it had before its decline, not the lowered one. |
| J-V5.74 | Chose to read an epoch's island laws at the fold's rung (`ctx.rung`, V06 §3.1 (3)) over the rung at the epoch's population target, because inside the hand-off band the two differ and file f item 322 makes the fold's the epoch's rung for every reader, so the islands' gate agrees with the product and rung the rest of the epoch runs with. |
| J-V5.75 | Chose to read a sky pseudo-district in S7b (1)'s district supply term at its island's land centroid's world point (`anchor` + the outline's centroid, fixed by S7b (5)'s placement) over its main landing's foot, because the feet are sited only at SKY, after S7b, while volume 1's χ̃ reads the term at S7c by centroid distance; the centroid is the proxy the ground pool already reads for an island's classes (V05 §3.20 (1)), so both volumes read one point that exists when the term runs. |
| J-V5.76 | Chose to type a landfall's `members` as `DecorationMember` — an `Id` for a plot, land use, reservation, way or retaining wall, and `{ raised, span: [a, b] }` or `{ raised, support }` on item 244's support keys for a raised part — over storing volume 6's `SpanRef` or keeping raised parts out of the list, because a span and a pier have no `Id` of their own and a `SpanRef` is batch-local and never stored, while the support keys are minted once and never reused (file f item 244), so volume 6 can remove each raised member in the batch of the op that ends its cover. |
| J-V5.77 | Chose to make a resize and a rim reshape re-lay the rim strip, re-claim the landing yards and keep or re-search the institution claim inside the district that holds it, in the same commit, the rim walk re-planted whole by volume 1's `plantRimWalk` (V05 §4.2), and to floor a resize (or bend a reshape back) where no site in that district would fit, over leaving the strip and the claims where SKY laid them, re-running the unit run, re-searching the claim anywhere on the island, or releasing the institution to the ground, because a strip left behind either widens into dead land (growing) or is cut by the rim (shrinking), a re-search confined to the claim's district keeps every district's kind and volume 1's rule that only a unit run re-partitions an island (J-V1.90), and a floor keeps an institution island's reason without a second re-reasoning path beside V05 §3.15 (1b). |
| J-V5.78 | Chose to store an `own` island's drawn relief class on `terrainEcho.reliefClass`, written by SKY at the draw, over re-drawing it wherever it is read, because volume 1's terrace rule reads it after SKY and a second draw on one stream index would be a second writer of one value; `echo` and `none` carry none and read as `plain` (V01 §3.17.7 (2); J-V1.94). |
| J-V5.79 | Chose to let a covered tower and gate (a `Gate` of any kind — `main`, `postern`, `water`, `gatehouse` or `castle`) follow its run's `condition` — the `breached` length extended over its footprint's chord along the trace, or that chord alone where its stretch is not covered — over giving `Tower` a `ruined` state, because the base's `Tower` and `Gate` carry no state or lifecycle, file f item 575 draws a tower by its run, and volume 6's repair of a ring in use then stands tower, gate and wall together with nothing further to restore (V06 §3.7.5). |
| J-V5.80 | Chose to write no register line of this volume's own — every calibratable column P1 and P2 land takes V12 §3.11's default line, and their exits carry the register check (V05 §8) — over a line of `measure` entries due at M6-sky for the three ⟨P0⟩ cells with T-V5-3 and T-V5-10 registered as V12 `BenchBarDef`s, because P0's spikes set those cells and apply their fallbacks before P1 lands the table, so no measurement of a landed cell is left to register (the two tests hold them as ordinary bars at the exits); a whole-bar verdict would open a supply or caster fallback on a clause about another quantity (T-V5-10's ring nesting, T-V5-3's monotonicity); and no corpus frame holds an island, so "no admissible frame" is the honest status of a fantasy table. |
| J-V5.81 | Chose to price a resize and a rim reshape at every piece of work V05 §4.2 commits (V05 §6's row: each re-claimed yard's top at §12.6's placement rate and the plots re-cut outside the re-derived districts at its scoped-regeneration law), over keeping those inside a fixed ≤ 5 ms or batching the tops into the island L1 batch, because the base prices a `placeAt` and a local operator at those rates (§12.6), V01 §6's sky row and T-V1-21 leave that work to this row, and volume 6 sums its century from this row by citation — its worst case ≈ 97 ms more per growing resize at CITY, its bounds re-declared under D-18 (CITY ≤ 115 s, METROPOLIS ≤ 215 s, TOWN ≤ 25 s; J-V6.118). |
| J-V5.82 | Chose to cap an island's hand-placed accesses at `accessCount.handMax` (6), a seventh bent into a move of the island's nearest hand-placed access, over leaving hand placements unbounded or refusing past a cap, because the access obstacles, the route and their budgets need a stated maximum, a refusal is item 101 R2's only for a dossier fact or a lock, and a move is the nearest lawful form of the author's request; the cap is a table cell. |
| J-V5.83 | Chose to let the clearance rule's lock clause, and a lock's hold on the re-reasoning of an island whose institution the dossier removed, apply wherever those rules run (SKY-F, `sky.clearance`, a ground edit beneath; each epoch), the dossier's removal still taking effect at once, over exempting locks from the rules or letting a lock block the dossier, because a lock holds the author's island while the dossier stays the truth about its institution (items 20 (h), 101). |
| J-V5.84 | Chose that an island's seasonal look reads the document's one climate row as DR42 resolves it — the ground's, its height correction by the ground's relief class included — over correcting it for the island's altitude or its own relief, because one town lies in one climate: an island floats 60–220 m above its ground reference (V05 §2.4's `altitudeM`), under one climate step of lapse (≈ 0.4–1.4 °C at 0.65 °C per 100 m), while DR42's steps are a winter class apart, and an `own` relief is the island's texture, not upland; an island whose pond froze in weeks the ponds below stay open would show a climate the town does not have (item 117 (d): "climate decides"). |
| J-V5.85 | Chose to lay an island's fallen-leaf cover on a grid in the island's local frame and to read only the island's own crowns, the ground's cover never reading an island's, over §8.2's world-aligned grid and a cover shared across the layers, because the island moves by one translation (J-V5.1) and its look must move with it rather than reshuffle under a drag or the `offset` displacement, and a cover read across the layers would make a ground tile's look depend on crowns at another height, a coupling the two bases of V05 §5.3 do not have. |
| J-V5.86 | Chose to read the waterfall's lip as an outfall for §8.2's open leads, open in every week, and the spring pond as an ordinary `pond`, over freezing the fall into an icefall or keeping the pond open, because the conjured river is the island's magic, not a winter catchment's, so its fall keeps running (item 117 (e) keeps outfalls open), while the pond is still water like any pond and freezes first, as item 117 (e) asks. |
| J-V5.87 | Chose that an island draws V11's `SKY` row alone — pennants along its rim and two flanking each landing top, at whatever rung the island stands — over drawing the ground's tier rows on it or none below CITY, because item 118 (d) names the sky's own decoration ("pennants on their rims and landings") apart from the tiers, the ground rows' places (towers, squares, the procession route) are the ground arena's, and an island an epoch carried below CITY still stands in the sky; the rim run skips the yards' fronts and the waterfall's lip, so no pennant stands in a passage or a fall. |
| J-V5.88 | Chose to class among the sky's one-time waits under item 119's comfort level a generation and a Re-derive with islands, declaring an island and a hand `fallIsland`, opening a document with islands, a dossier change reaching them, an `advance` and an export, and among the interactive rows every other island edit (`setAttr`, a move, a resize, a reshape, New random, an access placed or deleted, Update shade now), the pending strip and the season, festival and Find switches, over binding every island edit by the comfort level, because a declaration and a fall relocate households and re-derive an island and its landings — a wait the user sits through once — while the other edits are moment-to-moment feedback whose budgets item 119 (d) leaves as they are; both kinds keep their rows as targets. |
| J-V5.89 | Chose that on Sky pins merge into a count bubble only within one layer and one island, that a hidden sky layer keeps its matches' ghost pins and counts, that Go there sets the match's island `key`, and that Show gaps on an island reads V01 §5.4 (3)'s `gapUnits` over the island's arena, the whole island one catchment for a walking-radius row (V05 §5.6 (4)), over merging pins across layers, dropping a hidden layer's matches and a gap reading of the sky's own, because a bubble joining an island's matches to the ground's beneath would send its click to the wrong layer, item 120 (e) and (f) ask that a match is never lost and that the filter hold across layers, and `gapUnits` is Show gaps' one definition on every layer, counting a unit served as V11 §2.3's `CoverageSpec` counts it, an island one walking unit because the ride to the ground passes every walking radius (V05 §3.5 (3)). |
=== END ===

=== REPLACE ## 13 Fix list ===
## 13 Fix list

No item is open: each is closed at its home — V05 §8's P0 exits; V01 §3.10.3; V04 §3.5.1, V04 §3.10; V06 §2.1, V06 §3.2, V06 §3.4
(8), V06 §3.5.2, V06 §3.7.5, V06 §6.2; V09 §4.9, V09 §4.20, V09 §5.4; V10 §2.13 and §11.2; volume 11's rows; volumes 2 and 3's rim-slab crypt; V12
§3.11; and file f (V05 §10).
=== END ===
