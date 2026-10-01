# Repair round 6 — V05 (sky)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V05-r6; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V05-r6`, 2026-10-01)
- P0 brief, adjudication-r6 (header, summary, TOC, Part A, R6-01, R6-02 whole with its two tables, its attack list, its
  equivalence and its Ends, R6-09, R6-11, Part H · V05, Part P, Part I) read whole: done
- P1 live V05 text of every subsection concerned read whole (§3.16; ## 7's T-V5-14; ## 8), with the texts they cite
  (base §2.7's support step and span rule, V06 §3.19.2 (3)–(5), V07 §3.12, V11 §3.24.2's `span.vaultShare`); the sweep
  greps over V05: done
- P2 blocks (3 REPLACE, count-asserted edits on the live subsections) written and dry-applied on a copy: done
- P3 sweep report, doc_checks before and after, words: done
- P4 result saved; LANDED: done

Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
ignored; the FILE line routes every block to docs/volumes/V05-sky.md. Live unit: V05 as assemble-r5 left it (sha256
171db6516974533d…, 401 879 bytes, 3 078 lines). Each REPLACE body is the live subsection (apply-blocks.py's extent) with
count-asserted substitutions (scratch V05r6/gen.py: 6 edits, each applied exactly once); every untouched line is verbatim,
except two re-wrapped runs at 120 columns (§3.16 (5)'s three lines around the deleted clause; T-V5-14's last lines from
"ground's streets and plots added or removed" on; §8's dependencies lines from "`demandTaken` row" to "crypt test") —
words otherwise unchanged. Blocks: 3, all REPLACE — §3.16, ## 7, ## 8 (## 7 and ## 8 have no subsections). No heading
retitled or added; the title block untouched. Ruling requests: 0. Binding rulings applied: R6-01, R6-02 (as amended by
Part P); R3-01 – R3-03, R4-01 and R5-01 stand.

DISPOSITIONS — Part H · V05: V05 owns no issue this round (0 FIX, 0 MERGED, 0 INVALID); it runs for its one END line
(R6-01 (4)).

END LINES → WHERE WRITTEN (Part H · V05: "END of VM-R5T-02 (model): no crossing station — R6-02's (V5-1), (V5-2) and
(V5-3)"; each written exactly as R6-02's Ends give it)
- (V5-1) §3.16 (4)'s landfall table, the raised row: "raised-way pier (its footprint; a crossing station's support is its
  wall stretch, §2.7: the wall row's breach)" → "raised-way pier (its footprint)"; "a span whose pier is ruined — or whose
  crossing station's stretch the wall row breaches — becomes `ruined` with it" → "a span whose pier is ruined becomes
  `ruined` with it (a wall run beneath it breached by the wall row as any run the footprint covers)".
- (V5-2) §3.16 (5): "— never a deck plot, which is tombstoned with its deck and listed as a fate, nor a crossing station's
  support, which is its wall stretch (the wall row) —" → "— never a deck plot, which is tombstoned with its deck and listed
  as a fate —".
- (V5-3) T-V5-14, from "**A raised gate** (T114-3's landfall clause):" to "the landfall's undo restores the stretch and both
  spans." → "**A raised way over a wall** (T114-3's landfall clause): on a fixture whose footprint covers an aqueduct's
  span and the run beneath it, the run `breached` by the wall row and the span and the supports it covers `ruined` by
  theirs, `members` holding the span and the supports; then the deck's repair, by hand and, on a second run, by V06
  §3.19.2 (5) at the next epoch — `repairRaised` alone, no `repairWall` (§2.7's crossing table, *unchanged meeting*) —
  and the landfall's undo restoring the run and the span."

THE SWEEP (R6-01 (2): the terms, fields, keys and sections R6-02 changes, in V05's prose, tables, edge rows, tests and
cells; the four readers)
- Grep of V05 for "crossing station", "raised gate", "wall opening", "held stretch", "stretch held", `bend.wall.*`,
  `raisedCrossing`, `W_RAISED_CROSSING`, "support step", "(6) (d)", "(6) (b)", "wall arch", "under-deck strip", "its wall
  stretch", "span rule", "wall strip", `vault` span, "aqueduct", "viaduct", "elevated road", `lateCalamities`, "late
  calamit", phone text, and every ruling, probe and verifier id: before the blocks, the three END sites alone (l. 1342,
  l. 1353, l. 2556–2562); after them, none. V05's other wall-strip mentions (§3.7 (2)'s placement and §3.10 (3)'s
  admissible ground, l. 935 and 1057; §3.23's moat × sky access row; T-V5-8's foot bar) concern an island's site and its
  feet, which R6-02 does not touch: stand. §1b, §2.6's lifecycle rows, §4.5's clerk answer, §5.1, §5.5, the J-V5 rows
  (J-V5.11, J-V5.76, J-V5.79) and §13 name no station: stand.
- (c) The tests that must run a ruled case. Part P's new row W12 of §2.7's crossing table (amended, PRB6-13: "V05's
  landfall over a run beneath a deck") names T-V5-14 in nine cells — C2 (with T114-3's landfall clause), C3, C4, C5, C6,
  C8, C9, C12 and C13 — and R5-10 (kept by R6-11) has a test that names a case run it on a fixture that holds it. (V5-3)
  holds C2 only. So T-V5-14 gains, after (V5-3)'s text, one passage in V05's own words that runs the other eight cells as
  variants of (V5-3)'s fixture, each citing the table and never restating it (R6-01 (3)): the span over the run already
  `ruined` and `cleared` (C3), a `vault` one among them, read `open` under the wall (C6; the crossing table, *beneath*:
  no arch vault in a `vault` span under a wall); every span over the run fallen (C4); a support by the band `cleared` and
  toppled (C5); a frame growth's extension (C12) and a hand `spanSpacingCm` edit (C13); a VILLAGE the hand-off down made
  (C9; V07 §3.12: "An island still waning or settled when the fold gives the village product continues V05's steps");
  and the aqueduct locked (C8). Each is asserted as the cell's outcome, an *unchanged meeting* — the run by the wall row,
  the raised parts by theirs, neither row writing the other's record — with no value restated beyond (V5-3)'s. The locked
  case states V05 §3.16 (2)'s own rule (a locked entity is in no covered set, kept as content the ruin laps around;
  F-SKY-LANDFALL), the run beneath it `breached` all the same.
- (c) T114-3's landfall clause, which T-V5-14 takes (§7's lead), reads in R6-02's (S3) "then each repaired by its own op
  (`repairWall`, `repairRaised`), neither waiting on the other". (V5-3) runs the deck's repair without the wall's; the
  passage adds the converse in one sentence (the run standing again by its `repairWall`, V06 §3.7.5, with the span still
  `ruined`, no `repairRaised` in that batch), so the take-over runs the whole clause.
- (c) Scheduling (R6-09; R5-05 (c) and INDEX §5 risk 2: a clause whose provider lands later runs at the first exit after
  it, named in its volume). Every variant but C9 needs only what (V5-3) needs (P6's landfall; the frame growth and the
  `spanSpacingCm` edit are the base's, before M6-sky; the fallen and locked states are fixture states set by hand ops).
  C9 needs V07's hand-off down (T-V7-15, V07 §8's V-M3), which no V05 phase builds; the passage says "from the later of P6
  and V07's V-M3", §8's P6 exit cell says "T-V5-14 (its VILLAGE variant at the later of P6 and V07's V-M3)", and §8's
  dependencies sentence names it.
- (d) The base's summaries and index rows are not V05's. (a) and (b): V05 has no village restatement and no panel or
  clerk text of a crossing (§4.5's landfall answer names "the walls breached … the arches and raised-way piers ruined",
  which stands).

AGREEMENT CHECKED (no hand-off)
- R6-02's other texts that cite V05 agree with the blocks: W12's last column ("the landfall's batch (V05 §3.16 (4)–(5)) ·
  a covered tower or gate lies inside its `breached` run (no state of its own)") is §3.16 (4)'s tower-and-gate row, which
  stands; (S3)'s T114-3 landfall clause and (V6-16)'s V06 §3.19.2 (4) ("a run beneath them breached by the landfall's
  wall row, V05 §3.16") are the raised row as (V5-1) writes it.
- W12·C8 reads "as C2", C2's "the spans and supports its footprint covers" being V05 §3.16 (2)'s covered set, which leaves
  out a locked or pinned entity; so the locked variant (kept whole, the run beneath `breached`) is C2's outcome, not a
  second one, and the crossing table's C8 note ("a lock or pin never refusing work that passes beneath") holds: the
  landfall's work on the run is not refused. No text of another unit needs to change.
- The landfall's "covered spans and supports `ruined`" is V05's raised row; V06 §3.19.2 (4) cites it ("whatever their
  state … that is the island's law (V05 §3.16)"). The passage asserts each covered raised part "by theirs" and restates no
  value for a part already fallen.

HAND-OFFS: none.

DRY RUN (apply-blocks.py, unchanged, on copies; the FILE line removed as route.py's split does): files 1; blocks 3 found,
3 applied, 0 skipped; audit 3 blocks, not OK 0; headings 62 → 62; fences balanced (14 → 14); title block unchanged; PENDING
FABLE REVIEW lines 1 → 1; V05 401 879 → 403 128 bytes, 3 078 → 3 089 lines, sha256 a0dd3b65e35edef2…; the rationale
output byte-identical to its input. A word diff of the output against the live file shows exactly the six edits; a grep
of the output finds no "crossing station" or "raised gate".
DOC CHECKS (docs/validation/bench/doc_checks.py --doc <copy> --heads docs/ARCHITECTURE.md, before and after): WARNING
reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) —
clean-room results NOT authoritative, provisional. C1 0 → 0, C2 0 → 0, C3 237 → 237 hits (225 → 225 unreviewed, the same
list), C4 0 → 0, S1 0 → 0, S2 264 → 267 hits (1 → 1 unreviewed: "§4.20" in the Integration notes, l. 3068 → 3079, a
volume pointer the check resolves against the base; pre-existing, outside these blocks).

WORDS (V05, whitespace-split): 67 901 → 68 130 (+229, +0.34 %). Removed by the END lines 55 net (V5-1 −8, V5-2 −13, V5-3
−34): the crossing station's clauses, gone by R6-02's ruling (content superseded by name, R6-01 (5)), not a shrink source;
RESTATEMENT 0, NARRATION 0, DUPLICATED MECHANISMS 0, VERBOSE PROSE 0. Added 284 — content: T-V5-14's passage running
row W12's other eight cells and T114-3's converse repair (256), §8's timing for its VILLAGE variant (28). The unit grows:
the passage is a bar the crossing table's cells need (R5-10, principle (11)), and nothing restated was found to cut inside
the three subsections touched.

=== FILE docs/volumes/V05-sky.md ===

=== REPLACE ### 3.16 The fall and the landfall (`fallIsland`) ===
### 3.16 The fall and the landfall (`fallIsland`)

One `convert` event, as a declared sequence of batches (§4.11), whatever its author (the engine or a hand):

1. **Footprint.** The island's projected land face in world coordinates (`anchor` + the local ring).
2. **Covered set** (J-V5.11). Every ground entity of which at least `landfall.coverShare` of its face or band lies inside
   the footprint, by the kinds of the table below — less every locked or pinned entity and the plots that hold one (kept
   content, as §3.3's fixed obstacles; the ruin laps around them). A reservation or face that is water (a moat, a canal, a
   harbour basin, an oasis) is never covered: the part of the footprint over water leaves nothing on the ground, reported
   ("sank in <water body>"). The part of the footprint beyond the ground frame covers nothing.
3. **Relocation first.** Every use in a covered building or reservation is relocated by §4.11's rule for a step that
   empties a building (a dossier-backed use by the solver's `dossier` request; *Dossier content across epochs*), every
   household by §4.7's overflow pass inside the event — in an epoch, into volume 6's displaced pool with cause `island`
   (V05 §3.15) — the households of the deck plots that fall with their deck included, before their deck falls.
4. **The ground — one outcome per covered kind** (J-V5.11, J-V5.64, J-V5.73, J-V5.79). No edge of the ground's streets and
   plots is added or removed — the tombstoned deck plots' lines excepted, which go with them — so the plan survives under
   the rubble, ready for regrowth. Each change is a listed fate; the event's undo restores it from the undo record
   (§7.4's convert row).

   | covered kind | outcome | how it draws (§8.2) | cleared or restored by |
   |---|---|---|---|
   | building | demolished (cause `convert:fallIsland`) | gone | regrowth |
   | L3 plot (not a deck plot) | its use vacant with the `ruin` treatment | the `fallen` row's rubble over its face | volume 6's landfall clearance (V06 §3.5.2) |
   | reservation (plaza, market, precinct, park, castle bailey) | left vacant under the rubble, the `ruin` treatment | the `fallen` row's rubble | volume 6's landfall clearance |
   | hinterland `LandUse` face | kind `quarry`, owner `commons`, `source` the landfall decoration (§2.7, file f item 253): a surface rubble working that sources no underground quarry system, no mine–cavern breach and no dig-down draw (item 2) | the quarry row | volume 6's `retypeLand` of the quarry face |
   | way (its corridor band) | surface `rubble`, its routing class dropped to `track`, the class it had written to `Way.formerClass` in the `fallIsland` batch — a way already carrying a `formerClass` (a lane volume 6 downgraded) keeps it | its own state rows | volume 6's landfall clearance, which restores the class from `formerClass` and clears it (V06 §3.5.2), or a hand `setAttr` of `class` (V06 §2.8) |
   | wall stretch (its band) | `breached` over its covered length in the enceinte's `condition` (§2.2 rule 5's stretch-state profile, file f item 575): knots at the covered length's ends; a run already `breached` or `dismantled` kept, the ladder only stepping down; over every run the fall changes, the run's last-change epoch `conditionEpoch` written as the fall's epoch — the epoch in force at the `fallIsland` event — over the same stretch in the same batch, its material `conditionMaterial` kept (a `breached` patch keeps its patch row; item 114 (b); §2.7), so volume 6's oldest-patch-first order (V06 §3.7.7) reads the fall as the run's last change; the record's `lifecycle` `decayed` while any run is not `standing` — a state, no edge removed | §8.2's run `breached` row (a break with its rubble spill) | volume 6's repair of a breached ring in use (`repairWall`, V06 §3.7.5) |
   | tower; gate of any kind (`main`, `postern`, `water`, `gatehouse`, `castle`) | no state of its own (§2.7): the `breached` length on its stretch is extended over the chord of its footprint along the trace, so every covered tower's vertex and gate's junction lies inside a `breached` run; one covered while its stretch is not has `breached` written over its footprint's chord alone | by its run's `condition` | standing again with its run (V06 §3.7.5) |
   | bridge, pier, mole or quay-platform deck | `ruined` (the deck falls; under a bridge the river stays one L0 face and the way's crossing is closed) | its own state row | volume 6's `repairRaised` (item 246) |
   | deck plot on a covered deck | falls with its deck by item 110 (d)'s least disruption: its households relocated first ((3)), its building demolished, the plot **tombstoned with the deck**, as volume 6 does for a struck deck (V06 §3.19.5 (3)); never a vacant plot left on a ruined deck | nothing | a repaired deck re-offers its faces; the buildings raised on them are new lineages (V06 §3.19.5 (1), (4); V02 §3.16 (7)) |
   | raised span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint) | `ruined` (item 244's span and support `state`); a span whose pier is ruined becomes `ruined` with it (a wall run beneath it breached by the wall row as any run the footprint covers) (arches fall with their piers, whatever their own cover); a raised way with a ruined span has its crossing closed — it has no junctions with the ways beneath, so the `track` fallback does not apply to it, and the ways beneath are touched only where the footprint covers them; an aqueduct ruined this way loses its terminal's supply, a listed fate ("the fountain in <square> runs dry") | item 110's state rows | volume 6's `repairRaised`; the vaults beneath follow the span's state by volume 4's rule (this volume writes nothing underground) |
   | `RetainingWall` stretch, generated or drawn (its band) | `decayed` over its covered length (item 245's state, the `breach` op's result; a state, no edge removed), keyed by the wall's lineage address, so a later re-derivation of a generated wall keeps it `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6)); a drawn wall is restored by hand | its state row | volume 6's restoration or `repairRetaining` |
   | another island's ground landing plot, yard or access foot | the plot's use closed with its building demolished like any covered building; in the `fallIsland` batch the access is re-landed as a move re-lands it (V05 §4.2): a slanted access at the nearest admissible point outside the covered set within its run; a vertical access becomes a `ropeway` from the same top where its row admits one, else F-SKY-ACCESS's ladder from its top; an access no rung places is dropped, reported, and an island left with none is reported `unreachable` (V05 §3.17) | its new landing's rows | its island's own re-derivation (V05 §3.10) |

   **Inside an epoch** the op's ruined raised parts are lifecycle entries of the epoch event, so they stand in
   `EpochScope.raised` (V06 §2.1), and volume 6's raised-way pass reads an aqueduct's lost supply at that epoch's
   `raisedWays` step (V06 §3.19.2 (4)); after a hand `convert`, at the next epoch's.
5. **The landfall record** (§2.7, file f item 252; J-V5.76). One ground `Decoration` of kind `fallen_island` whose
   `members` (`DecorationMember[]`) are the covered plots, land uses, reservations, ways and retaining walls, each by its
   `Id`, and the covered raised spans and raised-way piers, each by its raised way and item 244's support keys (`{ raised,
   span: [a, b] }`, `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate —
   `source` the island's address and `name` the grammar's fallen form of its name. Each member leaves the list in the
   batch of the op that ends its cover (volume 6's member-leaving `setAttr`, V06 §3.5.2; J-V6.108). §8.2's `fallen` row
   draws its rubble over the members' faces and bands — a raised member's the span's deck band in plan or the support's
   `ring`; the walls with their towers and gates by their runs' `condition`, the bridges, raised parts and retaining walls
   by their own state rows. While a member stands, its face is no admissible ground for an access (V05 §3.10 (3)).
6. **The salvage ledger** is credited with `stone` = the covered land area × `stoneM3PerM2` m³, `from` the island (§2.7's
   `MaterialLedger`), so later building within the haul radius draws on it and §4.11's salvage demand weighs clearance
   near it.
7. **The sky.** Every entity of the island's arena — its own retaining walls and its bridges' deck plots included — and
   its accesses become tombstones (cause `convert:fallIsland`); each ground landing's use closes (`closeUse`), the landing
   house left vacant to step down the ladder; the island record stays live at its address with `state: 'fallen'` and
   `landfall` set, its slot freed.
8. **Undo** restores all of it from the event's undo record (§7.4's convert row) — each covered way's `class`, surface and
   prior `formerClass` (absent again where the fall wrote the first), each covered enceinte's `condition` and
   `conditionEpoch` profiles (its `conditionMaterial` untouched by the fall) and `lifecycle`, each covered retaining
   wall's `state`, and each re-landed access of another island.
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. They take over the base's
island bars T10-1, T13-1, T15-1 and T102-2 (file f item 476), the island clauses of T117-1 – T117-8 (T-V5-34),
T118-1 – T118-6 (T-V5-35) and T119-2 – T119-5 (T-V5-18), T114-3's landfall clause (T-V5-14), and T120-1's registration
with T120-4's and T120-5's sky clauses (T-V5-36), as §13.2's take-over table names them. Every clause that restates an
owner item's no-op or view pin registers its fixture on V12 §3.7.8's engine under its V12 §2.13 pin, naming the pin, its
off form and the seat that writes the registration (X-V12-11): T-V5-15's item-110 clause, T-V5-19 (c), T-V5-22 (b) and
(k), T-V5-27's two, T-V5-33's item-111 clause and T-V5-34 – T-V5-36.

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
  their displaced positions; with the sky layer hidden and Ground the working layer, 0 sky labels and no model digest
  changed (T15-1); every shipped
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
  the sky layer hidden and Ground the working layer no slab is lit or drawn and the ground's picture equals the map
  without islands, and with no island
  no second base exists; §13.4's base island-shadow golden stands.
* **T-V5-14 — over time** (takes T114-3's landfall clause) [C]. T8-6 stands (a CITY dropping below 10 000 loses its
  islands through waning, settled and fallen over their dwells); on the hook fixture a settled island refloats before
  any island is raised; a resize keeps
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
  ground's streets and plots added or removed beyond the tombstoned deck plots' lines. **A raised way over a wall**
  (T114-3's landfall clause): on a fixture whose footprint covers an aqueduct's span and the run beneath it, the run
  `breached` by the wall row and the span and the supports it covers `ruined` by theirs, `members` holding the span and
  the supports; then the deck's repair, by hand and, on a second run, by V06 §3.19.2 (5) at the next epoch —
  `repairRaised` alone, no `repairWall` (§2.7's crossing table, *unchanged meeting*) — and the landfall's undo restoring
  the run and the span. The other way round, the run stands again by its `repairWall` (V06 §3.7.5) with the span still
  `ruined`, no `repairRaised` in that batch. §2.7's crossing table (row W12) names this clause for the raised way's
  other states too, each on its own run of that fixture: a span over the run already `ruined` and, on a second run,
  `cleared` (on a third run, one whose record reads `vault`, read `open` under the wall, so no chamber stands under it);
  every span over the run fallen; a support by the run's band `cleared` and, on a second run, `ruined` with both its
  spans as a topple leaves it; the deck extended by a frame growth before the fall (a variant whose raised way over the
  run has a foot on the old frame ring) and, on another, re-spaced by a hand edit of its `spanSpacingCm`; and, from the
  later of P6 and V07's V-M3 (which builds the hand-off down), a VILLAGE whose hand-off down carried the raised way and
  made the ring its palisade (V07 §3.12), a settled island falling there at its dwell's end (V05 §3.15 (4)). Each is an
  *unchanged meeting*: the run `breached` by the wall row and the covered spans and supports by theirs, the wall row
  writing nothing of the raised way and the raised rows nothing of the run. With the aqueduct locked, it is kept as
  content the ruin laps around (V05 §3.16 (2); F-SKY-LANDFALL), `members` holding none of its parts, and the run beneath
  is `breached` all the same.
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
  and Go there sets Sky with the match's island — Sky then drawn whatever its visibility, 0 events logged and its
  `LayerSpec.visible` unchanged (V05 §5.6 (3)); (d) (T120-5) at the city band every sky match has a pin or a bubble,
  each carrying its chip's second cue, and no bubble joins two islands' or two layers' pins; (e) under a player view on
  an island form of T-V9-66's knowledge canary — a `secret` access's landing yard and a concealed use on an island —
  nothing withheld surfaces in a suggestion, count, glow, pin or ghost pin; (f) (T120-4; its fall cases from the later
  of P3 and P6, which builds the landfall, and its `advance` from the later of P3 and V06's E6, which builds `advance`)
  the chips survive every band and layer change and a raise, a move (the glow moving with the island), a fall (its
  matches dark, its landfall offered on Ground), an `advance` with its epochs, an undo, a redo, a regenerate, a load and
  a migration, each match set equal to a fresh evaluation there, and a chip whose last match goes — an island
  institution's after its island falls — stays at count 0, dark; (g) Show gaps outlines exactly V01 §5.4 (3)'s
  `gapUnits` on the islands as V05 §5.6 (4) reads them — each island district for a class with no coverage row or a row
  counted by district or neighbourhood; under a walking-radius row every residential plot of an island holding no
  member, whatever the ground beneath holds, and none of one holding a member; under a households row each district's
  unserved plots by V01's per-plot reading — a class `IslandRule.carry.never` excludes among them; (h) item 120 (j)'s
  suggestion and glow timings hold with three islands at the METROPOLIS cap (V05 §6's Find row); (i) from the later of
  P3, P6 and V06's E6 (P6's `IslandEpochStep` and landfall; V06's `advance` and history frames, V06 §3.15.2), at a drawn
  week whose frame is not the head (V05 §5.6 (5)), on (f)'s fixture after an `advance` whose epochs raise one island and
  resize another, then a hand move of one island and the removal of another, and on T-V5-14's falling CITY, each
  scrubbed to a week before those epochs: every sky match, glow, pin, ghost pin and gap unit those of §11.2's listing at
  that week, drawn on its island's land and at its anchor in that frame — the raised island offering none, the moved
  one's at its former anchor, the removed one's offered, and the fallen island's on Sky as the frame holds it, never its
  landfall on Ground; the head's reading back when the scrub returns to the head.

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
| P3 — the picture | the marks with their sheet rows (file f item 408), the three occlusion modes with the underside and tether, the sky surface layer in the tile worker and the light pass (CPU reference and GPU) with the window without slabs (item 416), rung 3's prism tiers, the cursor sun's floor, labels (item 415); the strip's outlines in volume 9's shade map view; the island's seasonal look, its festival pennants and Find on Sky (items 117, 118, 120; V05 §5.1, V05 §5.6) | T-V5-12, T-V5-13, T-V5-20, T-V5-34, T-V5-35, T-V5-36 (its (f) fall and `advance` cases and its (i) at the later exits it names) | 3.75–5.5 |
| P4 — editing | V05 §4.2's events and parameters (the island brushes, the access `setAttr` semantics, the pointer mapping in `offset`, an island wall, the hand-placed cap), dry runs with the shade fate and the bends, Update shade now, locality, undo (items 356, 375), DR27 and its coherence with the dossier-removal path (item 387), the clerk's `WhyProvider` with the strip, route, link and siting answers; `convert removeIsland` and the removed ordinals with their holds (item 260) | T-V5-16, T-V5-29 | 2.25–3 |
| P5 — exports | GeoJSON (the strip features included), SVG, PNG, VTT, glTF, CityJSON's extension types, the statistics rows | T-V5-17 | 1–1.5 |
| P6 — time | `IslandEpochStep` with the household channels and the re-reasoning of an island whose institution left (its lock clause included), the bases and strips re-read at each epoch and the lag, the landfall over every covered kind (item 110's raised spans, raised-way piers, retaining walls and deck plots, and other islands' accesses, included), the participant `sky.clearance` with `reclearIsland` and the ledger by hand and on the M4 grow path (item 320); the engine-driven schedule joins volume 6's milestone; the one-time waits timed against item 119's comfort level | T-V5-14 (its VILLAGE variant at the later of P6 and V07's V-M3), T-V5-15, T-V5-18 (its comfort-level clause included), T-V5-21 (b)–(d), (g), T-V5-31, T-V5-33's remaining rows | 1.75–2.75 |
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
`demandTaken` row and the displaced pool's cause `island` (§4.7's overflow pass inside the conversion until then);
T-V5-14's VILLAGE variant needs V07's hand-off down (V-M3) and runs at the later of P6 and V-M3; P1's crypt test needs
volume 2's basement ladder and volume 11's crypt column (the full form and a fixture column until then);
P2's web, splits and spread need items 105 and 107 as applied and volume 11's goods, balance and `split` rows (fixture rows
until then), and the rim barrier item 106's `barrier` closure and volume 11's `sheer` row; item 110's parts need items 244,
245, 246, 290 and 309 as applied, volume 2's stack envelope (V02 §3.15.2) and volume 11's raised-way height and terrace
rows (fixture rows until then), and P6's `sky.clearance` needs volume 6's `afterGrowth` participant table and `EpochScope`
(a direct call after the M4 grow path's growth until then); P3's looks need §8.2's season and festival rows with V11
§3.25.6 – V11 §3.25.7's tables (fixture rows until then) and its Find part V09's Find panel and `live.find`, which land
at M5 (Find's milestone; §16) before P3, so T-V5-36 lands with P3 at M6-sky, its (i) at the later of P3, P6 and V06's E6,
(f)'s fall cases at the later of P3 and P6 and (f)'s `advance` at the later of P3 and V06's E6; P6's comfort-level
runs need V12 §3.15.9's wait timer and V06 §6.8's estimate; P4 and P5 after P2;
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

