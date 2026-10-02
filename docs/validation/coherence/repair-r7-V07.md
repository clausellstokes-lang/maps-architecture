# Repair round 7 — V07 (the village) — lane coherence/repair-V07-r7

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V07-r7; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V07-village.md. Live unit: V07 as assemble-r6 left it (sha256
# 46dfede9907ee1a6…, 613 621 bytes, 4 098 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (scratch rV07r7/edits.py; every untouched line verbatim). Blocks: 10, all REPLACE — ## 1, §3.4, §3.5a, §3.8a,
# §3.11, §3.12a, §3.13, §3.17, ## 7, ## 8. No heading retitled, no whole-volume REPLACE, the title block untouched.
# Ruling requests: 0.
# Binding rulings applied: adjudication-r7 — Part L (the laws; read whole first), R7-01, R7-02 as worked examples (its
# banner; the W1, W9, W13, W14 rows; Block 2's lead), R7-04 (e), R7-06 (a), R7-07, Part H's head (the citation rule and the
# one rule for the rest, J148/J149) and Part H · V07, Part P (passes 1–8, J147/J148/J149 applied); R3-01 – R3-03, R4-01,
# R5-01, R6-01 stand. Owner rules J144, J146 – J151 respected; nothing written for J150's round-8 lock hand-offs.
#
# PROGRESS
# - P0 brief read whole; adjudication-r7 read (How to read, Summary, contents, Part A, R7-01, Part L whole, R7-02's
#   banner, sentences, W1/W9/W13/W14 rows and Block 2's lead, R7-04, R7-05, R7-06, R7-07, Part H's head and · V07, Part P
#   rows touching V07): done
# - P1 live V07 subsections concerned read whole (## 1 (14), §3.4, §3.5a, §3.8a (3), §3.11's REPLACEMENT, §3.12's hand-offs,
#   §3.12a (4), §3.13, §3.17's raised-way rows, ## 7 T-V7-32 and T-V7-48, ## 8's V-M3 cell and risks (8), (10), ## 9, ## 12,
#   ## 13, Integration notes); unit swept for the family's terms: done
# - P2 edits written (scratch rV07r7/edits.py, count-asserted; word-level diff of every block against its live section shows
#   only the changes listed below): done
# - P3 dry run of apply-blocks.py on copies: 10 section blocks applied (the FILE routing line skipped by the applier as in
#   every volume repair file), audit not-OK 0, headings 58 → 58, fences balanced, title block unchanged; output equal to the
#   independent application (sha256 346c8b5a2dabff46…, 621 436 bytes, 4 123 lines); every touched table row keeps its 4
#   cells; doc_checks.py on the output copy: S1 0 hits, S2 0 unreviewed, C1/C2 0, C4 unchanged (1 reviewed), C3 364 → 366
#   (two generic runs from the END lines' words, "law 1 (5)), and 0 on a" and "crossing of the palisade's"; no reference
#   identifier, list or table) — with its WARNING that the reference corpus is incomplete in this checkout, so the clean-room
#   result is NOT authoritative (provisional): done
# - P4 result saved; LANDED: done
#
# ISSUES → WHERE FIXED (4 routed ids, all FIX in Part H · V07; 4 FIXED in text; none MERGED, none INVALID)
#  VAL-R6-02 (major; FIX, R7-04 (e): its first form) — §3.5a (3) *Under a span*: "a `cleared` span's ground is free, as a
#        `cleared` support's is ((2))" → "a `cleared` support's ring is open ground ((2); §4.3 *Lattice and costs*), and a span
#        is crossed by this rule whatever its `state`", as written. Root cause closed in the bar too: T-V7-48 adds the
#        declared viaduct's `vault` and `open` spans `ruined` then `cleared` (the state sweep's scripted ops), the next
#        derivation's VS4 ways crossing each by the same rule — none over the cleared `vault` span's strip (its arch vault
#        `collapsed`, V04 §3.5.4 (d) (2)), the cleared low `open` span still bound by clear width, clearance and `squareDeg`
#        — so a build reading the old clause fails a bar (scheduled as an arch-vault clause, ## 8).
#  VAL-R6-06 (minor; FIX per R7-06) and VV78-r6-01 (minor; FIX per R7-06) — one text, E-V7-1 at T-V7-48: the W1 report
#        clause and the CITY fixture handed down over the state sweep (§13.2; row W9), each state made before the hand-off,
#        the hand-off writing nothing of the raised way or the ring's runs, the palisade read by §2.7's laws at that state.
#        The sweep (R7-06 (a)) holds every W9 cell VAL-R6-06 lists: C3, C4, C5 (cleared and toppled), C6, C8 (locked),
#        C10 (repaired by `repairRaised`), C13 (Arch spacing, Deck height, re-shape); C12 is the frame-growth clause.
#  VV78-r6-02 (minor; FIX per R7-06) — E-V7-3: ## 8's V-M3 cell as written (T-V7-48's carried-down clauses — the CITY fixture
#        handed down, its frame growth, the palisade's decay beneath its deck and the hand `absorbWall` —) with "and its
#        state-sweep runs (§13.2)", its `topple` runs at the later of that exit and V06's E5 (E-V7-3) and, by R7-06 (a)'s
#        schedule, its runs with a `vault` span breached and its arch-vault clauses at the later of that exit and V04's U3
#        (risk (8)); T-V7-48's tier cell "V-M3 (its carried-down clauses and state-sweep runs as V07 §8's V-M3 exit states)"
#        ("## 8's" written "V07 §8's", the volume's own reference form); ## 1 (14) as written, plus "and for T-V7-48's state
#        sweep a `topple` (V06 §3.11, E5)" so the hook list names every V06 step the V-M3 clauses now run.
#
# END LINES WRITTEN (Part H · V07: E-V7-1 – E-V7-7, all written; markers "(amended, PRB7…)", "(J146, PRB7…)" dropped)
#  E-V7-1 → T-V7-48 (four insertions as given). E-V7-2 → §3.5a (4). E-V7-3 → ## 8 and ## 1 (14). E-V7-4 → §3.13's ladder
#  table (F-V-RAISED after F-V-ANCHOR) and the sentence after the table. E-V7-5 → §3.5a (3) and T-V7-48. E-V7-6 → §3.11's
#  REPLACEMENT and T-V7-32. E-V7-7 → §3.4 step 6.
#  Changes to the END lines' quoted text, each under Part H's head (named here as it requires):
#  (1) Citation form (Part H's head; Part L's correction 4): "§2.7's crossing table, row W1" → "§2.7's laws, law 4; its
#      worked example row W1"; "(§13.2; row W9)" → "(§13.2; §2.7's laws, law 4; its worked example row W9)"; "by §2.7's
#      crossing table, *beneath*" (twice) → "by §2.7's laws … (law 1 (2)–(9); its worked example(s) *beneath* …)"; "(§2.7's
#      crossing table, (G3))" and E-V7-4's "(§2.7's crossing table, (G3); *beneath*)" → "§2.7's laws, law 2 (c) (its worked
#      examples (G3) and *beneath*)"; the fixed-place sentence → "§2.7's laws, law 1 (6), law 2 (a) / with law 2"; "(row W14
#      at a village, its C9 cell)" → "(§2.7's laws, law 4; its worked example row W14 …)"; E-V7-2's "the crossing table's
#      bent-group sentence" → "§2.7's laws (law 1 (2)–(4), law 2 (a), law 3; its worked example the bent-group sentence)";
#      E-V7-4's closing "by §2.7's crossing table" → "by §2.7's laws".
#  (2) The one rule for the rest, correction 7 (J149: the aqueduct's form by its level): E-V7-1's REPLACEMENT clause "its
#      band at most touching a support's ring, re-traced locally … where its new band would not cross lawfully" → "crossing
#      the aqueduct in the form its level gives against the stone wall's new top (law 1 (2)), re-traced locally where its new
#      band would cross in neither form"; its F-V-RAISED variant gains "whose declared aqueduct's channel runs above the
#      palisade's top all along" so that no merged crossing is lawful and the variant holds its case; E-V7-2's "crossing an
#      aqueduct under a span" → "crossing an aqueduct's deck line in the form the aqueduct's level there gives"; E-V7-2's
#      "crosses it *over the band*, on a span" → "crosses it in the form the aqueduct's level there gives (law 1 (2): over, on
#      a span clearing the palisade's top, or merged, never into a shape-locked palisade, law 1 (10); its worked example
#      *over the band*)"; E-V7-6's "where a gate's stone footprint would meet a strip" → "where a kept gate would then stand
#      where law 1 (5) bars one" (law 1 (5) admits a gate under an aqueduct's arch that clears it and the wall: W14's own
#      cell and E-V7-1's clearing-arch variant read so).
#  (3) The one rule reaching T-V7-48's live words (Part H's head, PRB7F-TIM-04: the bar E-V7-1 appends to), correction 7:
#      "its line bent to cross the declared aqueduct under a span" → the planned line across a standing support whose channel
#      runs above the palisade's top, bent to the nearest span clearing it (law 1 (2), law 2 (a), law 3); "0 gates in an
#      under-deck strip" → "… but under an aqueduct's arch clearing the palisade and the gate (law 1 (5))"; "0 palisade runs
#      above a standing span's soffit" → a road deck's, the palisade at its own top beneath the declared aqueduct (law 1 (7));
#      "a hand aqueduct … — its supports off the band, a span over it" → the form by its level, over, and merged on a stone
#      `inner` variant whose channel lies within the circuit's height (no gate in it, nothing of either record written);
#      "(its aqueduct created across that ring on a span)" → "in the form its level there gives"; the T3 `wall` stroke "bent
#      locally to cross under its nearest span (*beneath*)" → drawn at a standing support with the channel above the
#      palisade's top, bent to the nearest span clearing it; the hand `placeGate` "in its under-deck strip … to the nearest
#      point clear of it" → where §2.7's laws bar a gate (law 1 (5)), to the nearest lawful point (law 2 (a), law 3); "the gate
#      opened as any (none under the deck)" → "(§2.7's laws, law 4; its worked example row W6)". Each clause keeps its case
#      on a fixture that holds it (round-7 note (c)). F-V-RAISED's variant names `W_RAISED_MEETING`.
#  (4) Owner rule J147 (drawing holds nothing; Part L's correction 6): E-V7-2's "— drawn by hand and so locked, or not (the
#      crossing table's lock sentence) —" → "— the palisade placement-locked by the user or not, the drawing holding nothing
#      (§2.7's laws, law 2; its worked example the lock sentence; J147) —".
#  (5) Correction 1 (J148: no gate moved for a meeting): E-V7-6's T-V7-32 text "keeps the trace's vertices and gates (save
#      where a raised way crosses it …)" → "keeps the trace's vertices (save where a raised way crosses it: §2.7's laws, law 2
#      (a); T-V7-48) and gates", so the saving clause no longer reaches the gates.
#  (6) References: E-V7-7's "§3.11's REPLACEMENT" and "(§3.12)" → "V07 §3.11's REPLACEMENT", "(V07 §3.12)" (a bare "§n" names
#      the base, principle (1)); E-V7-4's "VS3's barrier reach" gains "(V07 §3.4 step 5 b)".
#
# SWEEP (R7-01 (2), blind spot (a); round-7 note (a): every other site cites "§2.7's laws")
#  Conformed: §3.5a (4)'s remaining clauses cite their laws (law 1 (1), (3), (8); law 4 with row W9; *down before the wall*
#  with law 1 (3) and law 2 *Carried way*), and (4) now names both ends the base cites at V07 §3.5a — VS3's
#  `W_RAISED_CROSSING` (§5.4; a T3 `wall` stroke's in `bend.wall.raisedCrossing`'s line) and, with no lawful shape, VS3's
#  F-V-RAISED and a T3 `wall` stroke's `refuse.raised.meeting` (law 2 (c)); §3.17's row "a raised way over the palisade" —
#  it restated *beneath* and *over the band* in pre-J149 words (an aqueduct crossed under a span; no gate under the deck) —
#  reduced to the laws' citation, its rung F-V-RAISED's ladder; §3.12a (4) (d) "§2.7's crossing table does not apply" →
#  "§2.7's laws do not apply"; §3.8a (3) "The author may level any of them …", which named the under-deck strip among what a
#  stroke may level, now excepts it (R7-02's lock sentence's retaining wall: a stroke across a standing raised way levels no
#  ground inside its under-deck strip and passes beneath it, a support on its line built against it; law 1 (2)).
#  Standing (searched): §3.12's hand-off down ("the palisade the innermost standing enceinte"), §3.5a (1), (2), (5)–(11)
#  ((5)'s readers are V11's END), §3.17's other raised-way rows, J-V7.83, ## 12's historical readings, ## 13 and the
#  Integration notes. Not written, by J150/Part A (round 8): the lock texts V07 restates outside the family's meetings —
#  §3.12 item 7's "crosses held", §4.1's "held, never an enclosure" and "declarations, held through Regenerate (keep)",
#  §4.4's lifecycle "held" column, T-V7-51's "held".
#
# HAND-OFFS: none. This text relies on END lines other units write this round: the model's §2.7 (E-M1: Part L at the
#  support step's (6), R7-02's blocks as worked examples, the lock sentence's retaining wall among them), determinism's §5.4
#  (VS3's `W_RAISED_CROSSING` and `W_RAISED_MEETING`; R7-07, E-D11), scope's §13.2 state sweep (E-S0) and §13.8 schedule
#  (R7-06 (a)), V09's `refuse.raised.meeting`, V11's row 80 (§3.5a (5)'s readers).
#
# WORDS (principle (9)): V07 99 665 → 100 998 (+1 333, +1.3 %). A family-only round: the four shrink sources do not
#  apply to these sites (no narration or duplicated mechanism found in them; §3.17's row and §3.5a (4) cite the laws in
#  place of their restatements, the row gaining F-V-RAISED's cap); the growth is irreducible content — the END lines' new bar clauses (the
#  state sweep over W9 and W14, the REPLACEMENT's variants, F-V-RAISED's row), J149's two crossing forms at each bar that
#  names an aqueduct, and VAL-R6-02's bar. By block: ## 1 +24, §3.4 +76, §3.5a +245, §3.8a +46, §3.11 +76, §3.12a −1, §3.13
#  +127, §3.17 +14, ## 7 +681, ## 8 +63.

=== FILE docs/volumes/V07-village.md ===

=== REPLACE ## 1 Scope, the base hooks consumed and what is out of scope ===
## 1 Scope, the base hooks consumed and what is out of scope

**In scope (build depth).** The village product's ladder rows and population bands (THORP, HAMLET, VILLAGE; V07 §2.1), its
territory frame, the landscape first (the course-first river, the site, the heart), the density stage before the network,
the plan forms, the palisade before the roads, the tracker-steered network (through roads, lanes, tracks, fords, bridges,
wharf and piers), the green or square, the perimeter as the one `village` district, the "houses along ways" fabric with
toft-and-croft plots and the slot race, the village institutions (parish church, chapel, manor house, mill, smithy, alehouse
and inn, bakehouse, pound, tithe barn, parsonage, the reeve's house and the moot, wells, pond, cross), the hinterland
(field systems, meadow, commons, woods, outlying farmsteads), the village ends, the SettlementForge small-settlement
dossiers the port accepts, the ladder hand-off in both directions, the village's epochs (infill, green encroachment,
extension; desertion), the `painterly` family and the `VG` parity preset, editing with item 101's tools, labels, exports,
budgets, tests and the build plan. The village's part of the owner's items: item 102 (the settlement prefers the sunny
slope; fields and woods sort by it); items 103–104 (the village classes' profiles, coverage rows, signature pairs and the
village reading of the scene archetypes; the rulebook is file g's and V11's); items 105–108 (the palisade's barrier closure
and graded stretches, V07 §3.4; the supply web's links and stores at village scale, V07 §2.4, V07 §3.8, V07 §3.11; the balance of
spread and pull inside one district, V07 §2.4, V07 §3.10; the institution ladders' members at village rungs, the palisade's
replacement by a town wall included, V07 §2.4, V07 §3.11, V07 §3.12); item 109 (caverns and ruins under a village with their access
and the dwellings that follow it, V07 §3.16; the crypt cells and burial faces, V07 §2.4; the catacomb gate at the hand-off
up and a shrunk town's standing underground, V07 §3.12); item 110 ((a) the house platform with its walls, stairs and ramps
and their decline into the scarps of a deserted village, V07 §3.8a, V07 §3.12; (b) a raised way on a village map, declared or
carried down, read-only to every village stage, with the router's rung gate, V07 §3.5, V07 §3.5a, V07 §3.12; (c) stepped massing by
the culture-and-era rows only, V07 §2.4; (d) deck plots on a pier head or placed by the author, V07 §3.10a); item 111 (the
crowding map's water pull and the oasis village, V07 §3.3, V07 §3.2 (4)); item 113 (a village over a former city and refounding
at village rungs, V07 §3.12a); item 114 (the palisade's patches, decay and recovery, V07 §3.4 (8)); item 115 (the village class
mix under the grandeur ceiling, V07 §3.8); item 116 (the township view at the zoom-out limit, V07 §5.2); item 117 (the fields,
strips, commons, green and ponds through the year, autumn's fall covers included, V07 §5.1); item 118 (the festival decorations
of the village rungs, V07 §5.1); item 119 (the village's one-time waits inside the comfort level, V07 §6); item 120 (Find at
the village rungs: the ends, fields and places as targets and the ends as Show gaps' units, V07 §5.5); item 122 (the
crisis looks at the village rungs: §10.2's places read on the village's records, the ends as a disaster's units, the
village tiers' scale and the hand-over through the village's epochs, V07 §5.6).

**Base hooks consumed** (cited, never restated): the rung profile, the village rows and `LadderRouter` (§1.1, D-33; items
201, 202); the Blueprint, the feature table and `autoResolved` (§4.2 S0); S1 whole (§4.2 S1); S2's roster, the farm table,
need propagation and the fixed dossier rows (§4.2 S2, §10.2); S3's centre scoring (§4.2 S3 (1)) and, done by VS1 since S3 is
not in the village's set, S3's map border (§3.2 (9)), lattice and edge costs (§4.2 S3 (3)), typed destinations (§4.2 S3
(13)) and L0 ponds (§4.2 S3 (10)); the stage graph, laziness and registration by declared I/O (§4.1, §4.12); the strategy
registry and `ProductDecl`'s place in it (§4.12, §14; item 202); the prosperity and density fields (§4.5); S7b (§4.5 S7b);
S7's wall and bridge furniture (§4.8); S9–S11 with the relation and supply rows and the designation mutator (§4.7); S12a,
the hinterland unit, the farm table and modes, decorations and S12b (§4.9); names and labels (§4.10, §9); the display list,
style sheets, the `painterly` slot and the relief tier (§8.1, §8.2); the light model (§8.4); identity and lifecycle (§2.8);
the document and recipe (§2.9); streams and addresses (§6.1–§6.3); edits, locality, lifecycle rows and migrations
(§7.1–§7.5); the override layer, reference cells and parity presets (§7.6); the dossier contract, DR1–DR35 and items 12–16
(§7.7); the port (§14); exports (§11.1); budgets and test families (§12, §13); the epoch, the rung and product at an epoch,
frame growth and `ConversionOp` (§4.11, §3.2 (9)); items 102–108 through their base mechanisms (the daylight share, the
profile columns and families, the supply web, the barrier closure with its defensibility classes and stretch profile, the
balance profile, the ladder step-type table); item 110's base side — `RetainingWall` with its state profile (§2.7, §2.2
rule 5), S10–S11's levelling and the levelled ground they publish (§4.7), the ground arena's parts from 1 and the raised
way's deck, supports, ends and span rule (§2.7, item 244), the deck invariant (§5.3), the way-class stair and ramp rule, the
deck plots and their budget, T3 `wall`'s `retaining` kind and T4 `road`'s `raised` flag (§7.1); item 122's base side —
`ConditionOverlay` and
its reader comment (§2.7), §2.9's `crises` key and *The crisis framing*, §7.7's DR44, §10.2's crisis look table and its
*Crisis looks*, §8.2's `live.crises` rows and §8.8's ring marks, §11.1's exports. The sibling volumes' parts
read here: V04's underground tail at the village subset (V04 §3.1: T2 for `ruin` and `cavern`, T2b, T3's F6, T5, T6, T8, T7
on show) with its records and tables (V04 §2.2, V04 §2.3); V11's crypt column (`crypt`, `cryptM2`; item 436) and V03's crypt
rule (V03 §3.7.4); V11 §3.24.1's TOWN `terrace` row, its `deck` table and compiled `deckOk` (V11 §3.24.4) and its
culture-and-era specialisation rows (V11 §3.24.3); V02's `DeckContext`, `@deck` rows, `stepped` family and `stairFlight`
program (V02 §3.15, V02 §3.17); V04's arch-vault source and foundation reach (V04 §3.5.4 (d), V04 §3.5.0); V06's raised-way step,
cap and decline (V06 §3.19); V09's delete; V01's aqueduct terminal form (V01 §3.17.8); item 122's sibling parts —
V01's `disasterDistricts` and `campLand`, V06's `frontierFor` and `crisisLookYields` (V06 §3.22), V08's reading of the
conditions with their closed mapping, V11's crisis rows, V09's Show crises, preview, crisis lines and Find's crisis section
(V09 §4.21.12), V02's ruined exterior and V03's look damage (item 123's layer).

**Out of scope, and why.** Floating islands are V05's: no new island arises at a village rung (`layers.islands`
`none`), and an island a fallen city leaves wanes, settles and falls over its dwells at whatever rung (V05 §3.15 (6); V07
§3.12), the village phases reading none; the sewer network, catacombs, quarries, vaults, the buried town and the
undercity at village rungs — they keep their TOWN-and-above gates (item 109 (j) (1), (k) (1)), save that a shrunk town's standing systems keep
their records in maintenance mode (V07 §3.12; V04 §3.1) and a dossier catacomb fact below TOWN is V04's charnel vault (V07
§2.4); the construction of caverns and ruins (V04's); the **generation** of raised ways — the base's route solve and V06
§3.19's founding, at CITY and METROPOLIS only (item 110 (b)) — and the second known-city fixture (item 110 (e);
V12); the stepped family's construction (V02), the plans of tiers (V03) and the arch vaults' chambers (V04); stage-2
close-ups of the village district (the village's fabric is its neighbourhood-band picture, J-V7.24); stage-3 compositions
and the plan rung (V02's and V03's machinery unchanged; this volume supplies only the village class rows they read); the
content rows of every SettlementForge catalogue kind (V11); the host bridge (V08); the built-in clerk (V10) and the
application shell (V09), which this volume feeds through the base's API; the unexcavated underground style and its toggle
(V09) and the clerk's underground explanations (V10). VG's request settings are named only in `matched.vg` and in the
research-side request mapping (item 495).

**Cross-volume facts this volume relies on**, each at its home: (1) V04 — `CatacombComplex.blockedBy` holds `'rung'` for a
town's catacomb carried into a village (V04 §2.2, V04 §3.5.1 (6); V07 §3.12); V04 §3.5.1 (3)'s counted classes include
`v.parish_church` (V11 §3.23.8; V07 §2.4); V04's stages in maintenance mode at a village rung (V04 §3.1, V04 §3.10). (2) V11 —
the crypt and cellar cells of `v.parish_church` and `v.chapel` are this volume's rows (V07 §2.4; J-V7.41), and V11's compile
check counts `v.parish_church` as a church. (3) V02 — every village row names a `templateFamily` of V11 §3.6.1 for its
budget rows, while V02's `composition.classFamily` (V02 §3.10.5) is the one source of the village classes' composition
keys and is read first (V07 §2.4). (4) V09 and V10 — the unexcavated style, the shade map and link views, and
the explanations (V07 §4.5, V07 §5.1). (5) V04 — the arch-vault source registered at every village rung (V04 §3.5.4 (d)); the
span rule's `country` reason keeps a span over hinterland faces open at every rung (§2.7, item 244; J-C4). (6) V06 — the
raised-way ledger's suppressions and carried ways cross both hand-offs unchanged and the raised-way step's founding never
runs at a village rung (V06 §3.19, V06 §3.19.1 (5)); a carried raised way declines and is repaired by V06 §3.19.2, and a
removal holds by V06 §3.19.3. (7) V11 — the one village cell of the specialisation rows is this volume's
`tiers.capPerSettlement` (V11 §3.24.3; V07 §2.4); the `deckOk` cells of the village rows are this volume's (V07 §2.4) and
the `terrace` cells of V07 §2.2a are reference cells to V11's TOWN row. (8) V11 — the `v.` namespace and `villageForm`
naming a `v.` key with its compile check (V11 §2.3, V11 §2.9); `guildhall` without a village form (V11 §3.22); the wells floor of
`multiple_water_sources` (V11 §3.12); V08 — the `@absent:<class>[+<class>]` shape (V08 §2.6's `kinds` row); V06 —
`ProductDeclEpoch.rows` (V06 §2.1) and the restoration of retaining walls (V06 §3.19.4 (6)); item 244's derived `source`.
(9) V06 — the `street` row's `again` and `reopen` members and their issuers (V06 §2.1, V06 §3.5.2, V06 §3.8.2 tier (5′)); V11 — the
`churchyard` part of the `church` and `cathedral` families (V11 §3.6.1), the village reading of `@absent` (V11 §3.11), the
`presence` column compiled with the class invariants over the `v.` rows (V11 §2.3, V11 §3.2.1 step 6, T-V11-0) and the village
range row keyed by step type and the class that plays the member class (V11 §3.12); V02 — `composition.classFamily` keyed
by the `v.` keys (V02 §3.10.5); V03 — the village plan rows keyed by the `v.` keys; V04 — its church count reading
`v.parish_church` (V04 §3.5.1); V08 — V08 §3.5.1 (b)'s range read "for its step type and member class" and T-V8-46's hamlet
clauses at VH. (10) V06 §3.9.6's claim-sized classes at a village rung, reading `rules.claimArea` (J-V6.119); V11 — a
territory rung reads the `villageSeat` column alone (V11 §3.21.1); the village-read scope (`productStages.village`, each
table's `villageRead` flag, the compile's `villagePresetCells`; V11 §3.2.1) and its `VG` entries kept with V-M0 (J-V11.79);
V12 §3.7.1 (c) and V12 §3.7.2 (3) naming `rules.race.densityPower@VG` as the one `VG` run's cell; item 576 (c) on §10.2's
government sentence. (11) V11 §8's preset-entries paragraph: the seat landing a change that makes a table village-read, or
adds a `presetsRequired` column to one, writes those cells' `presets.VG` entries by V07 §3.15's rule in that change
(J-V11.87; J-V7.123). (12) V06 — `ProductDeclEpoch.records` and `EpochPlacement` (V06 §2.1), the `dossier` step's call
(V06 §3.2 row 12), V06 §3.9.6's companion sentence and the clauses of T-V6-51 and T-V6-26; the participant table's
`village.pins` row (V06 §3.2: `afterGrowth`, order 60, `@plat/village`, stage `VS8`); V11 — V11 §3.11's `@pin:<kind>` read
at a village rung as VS8's pins, a record forcing its pin (V07 §3.10), and V11 §3.12's `parish_church` row naming the
churchyard cross VS8 lays; V08 — V08 §3.5.1 (c) binding a pin-record lesser to the churchyard `cross` (J-V8.111) and V08
§4.6's notes naming the class V07 §3.11 steps 2–4 give (J-V8.112). (13) V06 — `EpochPlacement.place(ctx, record, event)`
keyed by the dossier event's `seq` and `remove?(ctx, record, event)` after the base's removal on both paths (V06 §2.1, V06 §3.16
*Keys*); item 202's records hook, its calls on both paths, the two phase overrides and the participants on M4's grow path,
and the absorb-path call in §7.7's *One path* sentence; V06 §3.9.11's REPLACEMENT row for a greater V08 §3.5.1 (d) places
new (J-V6.125; T-V6-45) and a record's claim-sized joins charged to no churn cap (V06 §3.9.6, J-V6.123); V08 §3.5.1 (c)'s
three cases and (d)'s one-key receipt (J-V8.113, J-V8.114) and the `town_walls` key; V11's display cells on
`BuildingClassRow` (V11 §2.3, V11 §3.5.15; T-V11-4), which V07 §2.4's column fills for the `v.` rows. (14) V06's engine
(M6-E) for V-M3's clauses that run its steps: the desertion's street candidate and hollow ways (V06 §3.5.2, E2), a
claim-sized roster member's opening and the counts (V06 §3.9.6, V06 §3.9.1, E4), a ladder step carried by an epoch (V06
§3.9.11, E4), a carried raised way's decline (V06 §3.19.2, E3) and the walls step's condition and `absorbWall` on the
palisade (V06 §3.7.7, V06 §2.8, E3), and for T-V7-48's state sweep a `topple` (V06 §3.11, E5); the grow path reaches
the village's phases and participants at item 202's call points with V06 §2.1's `ProductEpochContext`; *fallback*: V07 §8's risk (10). (15) V01 —
`disasterSource` reads V07 §5.6 (3)'s units, in V01 §2.3's `DisasterUnit` shape, at THORP, HAMLET and VILLAGE, and
`campLand` the village's records as V07 §5.6 (2) states; V06 — `frontierFor` at a village rung answers the through
road's entry (V06 §3.22 (2)), here V07 §5.6 (2)'s main approach road, and `crisisLookYields` yields a building to its
rebuild (V06 §3.22 (3)); §10.2's *Crisis looks* — its places read at the village rungs as V07 §5.6 (2) states.
=== END ===

=== REPLACE ### 3.4 VS3 — the palisade, before the roads ===
### 3.4 VS3 — the palisade, before the roads

Only when S0 resolved a palisade (or a dossier lists a wall record, V07 §3.11). The construction is VG's (`ref:VG 1.6.9
palisade from the populated lattice (code)`; PART III item 2), restated over the density box. **The strategy's binding**
(§4.12's `EnceinteStrategy.trace`; J-V7.77): `boundary` = the density box (V07 §3.3), over which step 1 lays its lattice;
`gateSites = []` (the gates are VS4's, where roads cross); `reservations` = the mill reservation; `terrain` and `water` as
given; `policy = { waterfront: 'open', placement: 'aroundAll' }`; the density raster is read through the stage's declared
input `village.density` in `ctx`. The result is the planned trace (step 7), committed by VS4.
1. **Lattice.** A `palisade.lattice` × `palisade.lattice` (10 × 10) lattice over the box (step ≈ 0.32·R_s); each point is
   offset within its own cell, on both axes, by `(0.1 + 0.8·B3)` × the step, and survives with chance
   `density(p) − palisade.keepBelow`, on `village.palisade` keyed by the lattice index.
2. **Hull and flattening.** The convex hull of the kept points; the flattest vertex is dropped while its triangle's
   `2·area ÷ (distance between its neighbours)²` is below `palisade.flatten` (0.1).
3. **Smoothing.** A closed interpolating cubic through the hull at 12 samples per span, resampled every `palisade.resampleM`
   (17 m), the last point dropped when within half a step of the first.
4. **Defensible ground** (our extension, off under `VG`): each vertex is pulled up to `palisade.pullM` (10 m) toward the
   highest ground in its normal band, the base's S5a pull in miniature, keeping the vertex order.
5. **Barriers — the barrier closure** (item 106 (a), (b) at village scale; off under `VG`, whose rule is the water cut
   alone: the stretches in water or within `palisade.bandM` of a shore are cut and the open chains take `closure: 'shore'`).
   By default:
   a. *The barriers.* Every shore — the sea, a lake, a pond, a river and a brook alike (a village never fences its own water;
      J-V7.26) — the bank segments of kind `cliff` and `marsh` (§2.3's bank kinds), the terrain runs steeper than the
      defensibility table's cliff threshold over its height (V11 §3.16.1's `walls.barriers` rows, `WallBarrierRow`), and the
      gorge features.
   b. *Reaching the barrier.* With `reach = min(wall.barrierReachM, palisade.barrierReachShare · R_s)` (the base's 150 m cap
      at the VILLAGE target, ≈ 120 m at the HAMLET target, ≈ 50 m at a 40-person thorp), each maximal run of trace vertices
      whose outward normal meets a barrier within `reach` is replaced by a connector from the run's first vertex to its
      nearest barrier point, the barrier's edge from there to the point nearest the run's last vertex, and a connector back —
      so a village in a river bend is enclosed by the bend and fenced across its neck only, and one backed by a scarp or a
      marsh is fenced on its approachable side only. The spare ground between the old trace and the barrier is inside the
      enclosure and the perimeter (VS5 unites the enclosure): VS6 marks every block face there that lies outside the
      pre-reach trace as **reached** (`village.reached`, V07 §2.7; no frontage runs on it); S10's `toft` strategy lays one
      commons-owned `close` plot per reached face, split at `palisade.reachedCloseHa` (1 ha); S12b types its yard parts —
      paddock, orchard or garden by suitability — as item 106 (b)'s intramural gardens at village scale. The reached ground is
      excluded from S10a's quotas and from VS6's capacity check, and VS5's cut of interiors over 2 ha never applies to it
      (J-V7.75).
   c. *Classifying the arcs* by the barrier table's `arcKind` column (V11's `WallBarrierRow`, keyed by J-VI.3's closure-arc
      kinds): every water arc and every arc within `palisade.bandM` of a shore, a sheer cliff and a gorge **close** (no wall);
      a steep slope and deep marsh take a **light** stretch; open ground the **full** section. A non-water closing arc shorter
      than `palisade.minStretchM` between two walled stretches is walled through, so the circuit does not stop and restart for
      a boulder; a water arc is never walled.
   d. *Anchors.* Each walled stretch's two ends anchor on their barriers (§2.7's shore, bank and cliff anchor kinds), with the
      kind's anchor furniture — an end post for `palisade` and `earthwork`, a small tower for `inner` (item 312); the
      enceinte's `closure` is `barrier` when any arc closes, else `ring`.
6. **Kind and section, graded by stretch** (item 106 (c)'s stretch profile at village kinds). The full stretches take
   the kind's section (`palisade.heightCm`, `palisade.section`): `palisade` (timber stakes, 300 cm, 40 cm thick),
   `earthwork` (a bank 4 m wide and 180 cm high with its ditch 3 m wide outside), `inner` (a small stone circuit, 500
   cm, 120 cm thick, `material: 'stone'` — the one masonry enceinte of a village, J-V7.15). The light stretches take
   `palisade.lightHeightCm`: a wattle fence or dead hedge of 150 cm on a palisade, a low bank of 100 cm without its
   ditch on an earthwork, a parapet of 250 cm on a stone circuit. Closing arcs carry nothing. The band `palisade.bandM`
   (8.5 m) each side of every walled stretch is the no-build band every later stage reads — the wall strips of a village
   enceinte laid by VS3's construction (VS3, or a village kind's `drawWall` or `repairWall`'s new stretch at a village
   rung, which run VS3's form) or rebuilt by V07 §3.11's REPLACEMENT, in which a raised way's support may stand, the
   band §2.7's laws read being the section above; a town's ring handed down as the palisade (V07 §3.12) keeps its own
   band and strips (§2.7's laws, law 1's terms: *the band*).
7. **Planned, then committed.** The trace is data (`village.palisadePlan`) that every tracker reads at every step (V07 §3.5
   step 3); VS4 commits it with the network in one L1 batch as an `Enceinte` of stage 1 (`placement 'aroundAll'`,
   `waterfront 'open'` at every village rung, V07 §3.11's DR2), its gates the crossings VS4 made, split at them. A walled
   stretch that touches no gate after VS4 is kept by default — a stretch between two barriers need not hold a gate, the
   enclosure's gates being where its roads cross (J-V7.27) — and dropped under `VG` (VG's rule). S7 builds the furniture
   (§4.8): a gatehouse across each gate of `through` class, a timber gate elsewhere, and the anchor furniture at every barrier
   anchor. The palisade's "show circuit" control is V09's `LayerSpec.showCircuit` (item 413; V07 §5.1).
8. **Condition, patches and recovery** (item 114, the palisade's part; J-V7.135). Each run of the palisade carries
   `Enceinte.condition` (§2.7: `standing` · `worn` · `patched` · `breached` · `dismantled`, a stretch-state profile, §2.2 rule 5) and
   its run's material — **robust** (the kind's own section, step 6, the light section on a light stretch) or a **patch row**.
   The village kinds' patch rows are `walls.patchMaterials`' (V11 §3.25.3: by wall kind and culture, drawn by weight among
   the rows admitted for the kind and culture, V06 §3.7.7 (3); V11 holds the values): `palisade` — `odd_stakes` (mismatched
   posts driven into the gap), `hurdles` (woven wattle panels lashed between posts), `brush` (a dead hedge of thorn and cut
   brush); `earthwork` — `brush_and_turf` (brush and re-cut turf on the bank's crest, without its ditch), `hurdles`; `inner` —
   V11's masonry rows, as a town wall's. A patch is a condition of a run
   that was breached, never a light stretch: a light stretch is a standing run of the light section graded at generation by
   its ground (step 6), and a breached light stretch is patched by the same rows. **Decay and recovery** follow V06 §3.7's
   transitions with item 114's need and means (V06 §3.7.3 neglect, V06 §3.7.5 repair) — the palisade is an `Enceinte` like any
   ring, and V06's walls step runs over it at every village epoch; nothing here restates them: need decides whether a gap is
   closed, means whether it is closed robust or patched, a patch replaced oldest first when means return, a `dismantled` run a
   gap for good unless a hand edit or a new wall decision rebuilds it. **At generation** with no replay, each run's condition
   is §7.7's DR41 (item 114 (d); a dossier village's `readiness` label and wealth, V08), and
   with item 113's replay the replay's; a request without a dossier reads the row's neutral inputs, every run `standing`.
   Under `VG` every run is `standing` (the parity preset reads no condition). The look is V07 §5.1's; the repair tool's
   material is V07 §4.1's T3 row; the clerk tells each run's story (V07 §4.5).

Fewer than three kept points or a trace that holds no nucleus go to F-V-PAL, a walled stretch whose end finds no barrier to
anchor on to F-V-ANCHOR, and a trace with no gate after VS4 to F-V-GATE (V07 §3.13) — never a rebuild of the map.
=== END ===

=== REPLACE ### 3.5a A raised way on a village map (item 110 (b); J-V7.83) ===
### 3.5a A raised way on a village map (item 110 (b); J-V7.83)

The owner: "i think raised ways for cities is fair for the genertor to generate adn then a user can decide to add or
remove". A village never generates one (the rung gate, V07 §3.5), but a user may add one at any rung, and one generated in
a city epoch stays when the place falls through TOWN below the hand-off band (V07 §3.12; V06 §3.19: a fall below CITY never
removes one). On every derivation and every village epoch the village's own stages lay their ways, plots and fields around
it.

**(1) Sources at village rungs.** Exactly two: a **declaration** — T4 `road` with `raised`, or the aqueduct class, or the
skeleton file's line (V07 §4.1) — and a way **carried down** through the hand-off from a CITY epoch (V07 §3.12). No village
stage and no village phase creates one. No village tool refuses a raised stroke that contradicts no dossier fact and no
lock (item 101 R2; J-VI.4): the rung gate binds only generation (item 290).

**(2) The data key.** `raised` (§4.1's `RaisedRead`): the ground arena's parts from 1 read as one key — per raised way
its deck strip, its supports and spans by their keys with their `state`, two feet and, for an aqueduct, its channel —
published by the declaration layer (V07 §3.0). VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit and VS8 declare it as an
input (V07 §3.0's table). No village stage writes a part from 1. **A support stands for the village while its `state` is
absent or `ruined`** (a ruined pier is a stump of masonry): such a support is an obstacle ((3)), built into the palisade's
line where it stands in its band ((4)), and a hole in the faces beneath ((5), (6)); a `cleared` support (taken down in
V06 §3.19.2's decline, its stone credited) is none of these, its ground free at the next derivation.

**(3) VS4 — the trackers around it.**
* **Merging on part 0 only.** The merge test (V07 §3.5 step 4), and S4's router whenever a village stage calls it, read ways
  on ground part 0 only; of a raised way only its two feet may be merged onto.
* **Supports are obstacles.** A support whose `state` is absent or `ruined`, the raised way's ramps and stairs, and the
  under-deck strip of each `vault` span (impassable by §4.3 *Lattice and costs*, but one §2.7's laws read `open`,
  law 1 (8)), each grown by `raised.supportClearM` (1 m), is an obstacle, looked up in a uniform grid index
  of those obstacles (cell 10 m). When a step would enter one, the heading turns by `raised.turnStepCdeg` (15°) steps —
  first to the side nearer the tracker's target, else to the side of higher density, alternating sides — up to
  `raised.turnMaxCdeg` (60°) either way; failing that the tracker goes to F-V-TRACK's first rung.
* **Under a span.** A tracker crosses the under-deck strip only where §4.3 *Lattice and costs* admits a part-0 way —
  under an `open` span whose clear width between the standing supports' rings is at least the way's width +
  `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The clearance* for the way's class, within ±
  `raisedWays.structure.squareDeg` of square to the deck, never along the strip. A step that would enter the strip
  elsewhere turns by the rule above. Where it crosses there is no junction, no crossing record, no gate and no stop; a
  `cleared` support's ring is open ground ((2); §4.3 *Lattice and costs*), and a span is crossed by this rule whatever its
  `state`.
* **The feet.** After the rounds and before the finish, at every derivation, each foot joins the nearest part-0 way vertex
  within `raised.endSnapM` (20 m) as a `T` junction (the vertex attracted onto the foot by §3.6's attraction); with no vertex
  in reach, a stub `track` is routed by S4's router (rung gate closed) from the foot to the nearest way, lineage
  `way:raised/<raised way>/foot<0|1>` (V07 §2.5), reported `W_RAMP_STUB`; failing that, F-V-FOOT (V07 §3.13). The joins and
  stubs are in VS4's L1 batch.
* **No frontage.** A raised way, its ramps included, carries no frontage run (VS6) and is never a way VS5's interior cut
  measures from (V07 §3.7 (1)).

**(4) VS3 — the palisade.** A palisade meets a raised way by §2.7's laws (their worked examples §2.7's crossing table).
Laid after it — VS3's trace at generation and at every derivation that re-lays it, or a palisade T3 `wall` draws — it is
*beneath* (§2.7's laws, law 1 (2)–(9); its worked example *beneath*): its band laid through each road deck's support
standing in it, so it stands whole where one goes (law 1 (3)); its line by §2.7's laws (law 1 (2)–(4), law 2 (a), law 3;
its worked example the bent-group sentence) — crossing an aqueduct's deck line in the form the aqueduct's level there
gives and a road deck's carried way beyond its foot, never across a ramp, stair or foot, never running along within or
ending inside an under-deck strip — and its anchors by law 1 (6) with law 2 (its worked example the fixed-place
sentence); no arch vault in a `vault` span under it (law 1 (8); V04 §3.5.4 (d)); its top as §2.7's laws give it (law 1
(7): capped beneath a road deck's standing span, an aqueduct capping none); no gate on the deck, and a gate VS4 makes
placed by §2.7's laws (law 1 (5), law 2 (a), law 3: off a road deck's under-deck strip and `raised.supportClearM` off a
support's ring, under an aqueduct's arch only where the crossing is over and every span over it clears it), the track
following it. Each crossing of its line with a deck line is reported once, in VS3's `W_RAISED_CROSSING` (§5.4) for a
palisade VS3 lays and in `bend.wall.raisedCrossing`'s line for a T3 `wall` stroke (§2.7's laws, law 4; its worked
example *beneath*, *Reported*); with no lawful shape VS3 takes F-V-RAISED (V07 §3.13) and a T3 `wall` stroke is refused,
`refuse.raised.meeting` (§2.7's laws, law 2 (c)). A hand aqueduct drawn across the standing palisade — the palisade
placement-locked by the user or not, the drawing holding nothing (§2.7's laws, law 2; its worked example the lock
sentence; J147) — crosses it in the form the aqueduct's level there gives (law 1 (2): over, on a span clearing the
palisade's top, or merged, never into a shape-locked palisade, law 1 (10); its worked example *over the band*), and a
hand raised road comes down before it (law 1 (3), law 2 *Carried way*; its worked example *down before the wall*;
`bend.raised.wall`). A raised way carried down with the town (V07 §3.12) meets the palisade — the innermost standing
enceinte — as it met that enceinte (§2.7's laws, law 4; its worked example row W9). A raised way crossing the circuit
makes no gate (its deck passes over; law 1 (1)). The barrier closure never treats a raised way as a barrier.

**(5) VS5, VS6 and S10 — no house under the arches.** The **under-deck strip** — §4.6 S8's: the deck's ground projection
over its piers and spans, widened each side by `raisedWays.structure.stripMarginM` (V11 §3.24.2) — holds no toft yard part
and no building. S10's `toft` strategy lays a frontage slot whose toft
would meet the strip as a **close** by V07 §3.8's close rule (a paddock, orchard or garden, joined to or held by the nearest
built dwelling's household), never raced; VS6's capacity estimate subtracts those slots before F-V-SLOT's rungs; S10a's
quotas are allocated over the raceable slots only, so `N_v` stays exact. Crofts, closes (a reached close included) and
paddocks may pass beneath, the supports whose `state` is absent or `ruined` cut out as holes (§3.6's hole rule). The
perimeter is not changed by a raised way.

**(6) S12a and the hinterland unit.** Field, meadow, common, pasture and wood faces pass beneath, the supports whose
`state` is absent or `ruined` as holes (fields under arches are the historical sight); a furlong's strips run through; no
hedge, headland or field line follows a deck; V07 §3.9's outward claim and suitability ignore the deck.

**(7) The spans.** V04's arch-vault source is registered at every village rung (V04 §3.5.4 (d): arch vaults follow their
raised way at every rung; V07 §3.16 (1)); the span rule (§2.7, item 244) decides each span, and its `country` reason keeps a
span over hinterland faces — field, meadow, common, pasture or wood — open at every rung (J-C4). Inside the perimeter the
strip holds no plot, so a vault there is `storage` by V04's chamber row and holds an institution only by declaration. The
street-vault and bridge-vault sources keep their TOWN gate.

**(8) An aqueduct at a village.** Its terminal is a fountain `Pin` or a basin, as its declaration says (a basin by default;
V01 §3.17.8's terminal form); a cistern terminal comes only by declaration (V04 §3.5.4 (e)). VS8's well coverage (V07 §3.10)
counts each delivery point of an aqueduct whose channel is unbroken as a well, so no well is sited within
`pins.wellWithinM` (120 m) of one. When a span is ruined or cleared in the engine's decline (V06 §3.19.2), the channel is
broken, its points stop counting, and the coverage rule sites wells at the next derivation or epoch.

**(9) VS8 and names.** A raised way is never an end anchor: `crossing` reads part-0 bridges and fords only (as V01 §3.4.2 (a)
reads bridgeheads). The name's descriptive tags (V07 §3.10) and the plate's water qualifier (V07 §5.3) read part-0 crossings
only; a raised way's own label is the base's way label and V07 §5.3's landmark word.

**(10) Adding and removing are local** (V07 §4.3's rows).
* **Adding** (T4 `road` with `raised`, or the aqueduct class): the declaration's commit joins its feet to ground vertices by
  the base's rule, and VS4 re-joins them at every later derivation. The dry run re-races the blocks whose raceable slots the
  strip removes — each keeping its recorded quota; a block that can no longer hold its quota passes the shortfall to its
  neighbouring blocks (those sharing a frontage way with it) by largest remainder on their free slots' density, failing that
  F-V-SLOT's rungs — so `N_v` stays exact; it re-cuts the hinterland faces beneath with the support holes, and shows the
  count badge (item 101 R14): "the arches pass over 6 tofts; 4 houses move within their blocks".
* **Removal** is V09's delete of a declared way (the declaration's inverse) or, for a carried generated way, V06 §3.19.3's
  suppression (its reason key in the log), the dry run saying "the town will not rebuild this aqueduct; undo brings it
  back". The strip's slots return to the race in their blocks, the faces beneath are re-cut, and V04's vaults under it go in
  the same commit (V04 §3.5.4 (d)).

**(11) Order and determinism.** Every rule above is draw-free — the turns, joins, strip, holes and coverage are pure
functions of `raised` and the recorded inputs — so with no raised part on the map every village stage's output is
byte-identical to the build without this section (T-V7-46, T-V7-52), and with one it is the same on every engine.
=== END ===

=== REPLACE ### 3.8a Levelling and retaining walls at village rungs (item 110 (a); J-V7.84 – J-V7.89) ===
### 3.8a Levelling and retaining walls at village rungs (item 110 (a); J-V7.84 – J-V7.89)

Item 110 (a)'s units — a plot, a block, a ward — are each the wrong size in a village: a toft-and-croft plot runs up to
380 m deep (V07 §2.2), a block is a whole face between lanes (VS6: every face is a block), and the ward is the one `village`
district. Levelling any of them would terrace a yeoman's croft, flatten the ground between two lanes, or — by the
district-edge source — wall a hill village's perimeter. A medieval hillside village levelled its **house platforms** and let
its crofts and fields follow the ground. S11 levels after the site plan (the footprints must exist first) and before the
heights are set, so the heights read the levelled ground.
1. **The levelled unit is the house platform.** For each built plot: the union of its building footprints (S11's site plan)
   grown by `terrace.apronM` (4 m) and clipped to the plot's toft yard part; for the manor, its `platform` yard part where
   the moat draw laid one, else as a dwelling; for an institution, the yard part holding its buildings (the churchyard part
   excluded). A least-squares plane is fitted to at most `terrace.fitSamples` (12) samples of the base's refined 2.5 m raster
   (the platform's outline vertices, simplified to at most 8, and 4 interior points on the diagonals at ⅓ and ⅔). When
   `terrace.enabled` holds and the plane's gradient exceeds `terrace.slopeMin` (a share, rise ÷ run; V11's TOWN value by
   reference, V07 §2.2a), the platform is **levelled**: its datum is the mean of its samples — the spoil of the upslope cut
   filling the downslope side (J-V7.84) — published as levelled ground through the base's S10/S11 levelling output (§4.7,
   item 309), which the ground datum (§2.6's `deriveBase`), §8.4's shadows and V04's foundation reach (V04 §3.5.0) read.
   Below the threshold the platform follows the ground and the base's plinth and skirt carry the fall.
2. **The walls.** Along each levelled platform's edge the step `|datum − natural ground|` is sampled every
   `terrace.edgeSampleM` (2.5 m); each maximal interval whose step exceeds `terrace.stepMinCm` (V11's, by reference) is one
   generated `RetainingWall` (keyed per V07 §2.5), its step profile the sampled steps, its high side the platform on a fill
   edge (datum above the ground) and the natural ground on a cut edge (datum below it) — so a platform on a slope has a cut
   face upslope and a revetment downslope; its material the base's `RetainingWall` material row at the geology (dry stone by
   the village row, V11). A step above `terrace.stepMaxCm` (V11's) splits the platform along the contour into two levels,
   each levelled at its own datum, the footprints split with it by the base's stepped-wing rule; a level shallower than
   `terrace.minDepthM` (V11's `minTerraceDepthM`) is not levelled — the whole platform keeps the base's skirt and stepped
   wings. Two adjoining platforms share one wall on their common edge (V07 §2.5's owner rule), its step the difference of
   their datums. **No wall on a cliff** (§4.7 S10's hard-line rule, J-A110.43, read at the village rungs): an interval of a
   platform's edge that runs along a bank of kind `cliff`, a closure arc of kind `cliff` or `sheer` (§4.4) or a cliff inside
   the district (§4.7) takes no `RetainingWall`, whatever its step — the cliff face holds the ground; the platform, clipped to
   its toft, keeps the cliff setback S10's regions keep (§4.2 S1 (8)'s `cliff` row; §4.7), so no platform is levelled across
   a cliff.
3. **What generation never levels at village rungs**: the croft; a close (paddock, orchard or garden, a reached close
   included); the reached ground; the green; the churchyard part; the pound; the charcoal pit; the under-deck strip of a
   raised way; and every hinterland face. The author may level any of them with T2 `ground`'s terrace stroke or T3
   `wall` `retaining` (V07 §4.1) but the under-deck strip, which no stroke levels: a retaining wall or a terrace
   stroke's edge drawn across a standing raised way passes beneath it, a support on its line built against it (§2.7's
   laws, law 1 (2); its worked example the lock sentence's retaining wall).
4. **The longhouse is exempt** (J-V7.86). Its platform is never levelled: the base's skirt and stepped wings carry the fall,
   so its hard rule (V07 §2.4) reads the natural ground and the byre end stays downslope, draining as it was built to.
5. **No district-edge source for this fabric** (J-V7.85). Item 110 (a)'s terraced-district edge source never applies to a
   district whose `fabric` is `village-ways`, at any rung — the village district, and the old core after a hand-off up (V07
   §3.12) — since its perimeter is a density contour, not the edge of a levelled ward. The rule is keyed by the fabric, not
   by the rung or the district kind, so it holds across both hand-offs. The hook is `FabricStrategy.levelledUnits` (item
   506): the bent cut returns item 110 (a)'s blocks, plots and wards and declares its terraced edges; `village-ways` returns
   the house platforms and declares none.
6. **Access across a platform wall — stairs and ramps** (J-V7.88). A dwelling stands at the front of its toft (V07 §3.8), so
   on a slope its platform's cut or fill edge often runs along the frontage, the houses standing above or below the lane
   behind a revetment. Where a platform wall separates the main door from the frontage, S11 lays the path from the frontage
   to the door as a `stair` yard part when the step there exceeds `terrace.stairFromCm` (60 cm), else as a `ramp` yard part;
   and the class's `drive` part, where V07 §2.4's row asks for one, as a `ramp` yard part of grade at most
   `rules.grade.track` (20 %), laid along the wall inside the toft yard (a dog-leg) when a straight ramp would be steeper.
   Failing both, F-V-TERRACE (V07 §3.13). `stair` and `ramp` are yard-part kinds added as data rows (V07 §2.3).
7. **The village way-class crossing rule** (item 110 (a)'s way-class rule read at village classes; its threshold
   `terrace.stairFromCm`). Where a way crosses a retaining wall — a drawn wall, a terrace stroke's edge, or a shrunk town's
   standing wall — `through`, `secondary` and `track` cross as ramps only, within `rules.grade` (they carry carts); `lane` and
   `path` cross as a stair where the step exceeds `terrace.stairFromCm`, else as a ramp. Never a gap in the wall. The house
   platforms' own walls stand inside tofts and are crossed only by the plots' accesses (6).
8. **Order, locality and determinism.** The levelling is S11's, per plot, draw-free; the walls and yard parts are plot-level
   writes, never L1, so the village writer order (V07 §3.0, item 283) and T-V7-3's writer check hold. A re-derivation of one
   plot re-levels that plot and the wall it shares with a neighbour, nothing else.
9. **Decline** (V07 §3.12; J-V7.89). A generated wall re-derives with its terrain only while its platform's dwelling stands
   short of `cleared`; after that it is kept and decays by stretch, so a deserted hillside village keeps its scarps.

With `heart.slopeMax` 0.1 and VS2's slope term from 0.15, platforms are levelled mainly in hilly and mountainous villages,
as they should be. Field terraces and strip lynchets are not generated (J-V7.87): a field terrace is the author's T2
`ground` terrace stroke.
=== END ===

=== REPLACE ### 3.11 The SettlementForge small-settlement dossiers — what the village product accepts, and how ===
### 3.11 The SettlementForge small-settlement dossiers — what the village product accepts, and how

**Routing.** The village package registers its `ProductDecl` (V07 §2.1; range `[1, 1 500)`), which the one port consults
through `LadderRouter` (§1.1; item 202): a dossier whose population lies in that range — every SettlementForge thorp (8–60),
hamlet (61–400) and village (401–900) and every town from 901 to 1 499 (the mapping's population census,
`research/sf/mapping.md`: 70 of 70 small dossiers and 5 of 38 towns in the surveyed 155) — is created on the village rows,
and the port stops refusing it. The rung follows the population (DR23); the dossier's own tier word titles the map (§9.5): a
1 105-person SettlementForge town is drawn by the village product on the VILLAGE rung and titled a town.

**What a small dossier holds** (`research/sf/dossier-outputs.md` §3.4, §6): one population integer; a tier word; 7–42
institution records, one of them a housing record with a count range (4–16, 17–80 or 80–180 dwellings); a government name
(an elder or household council, a feudal stewardship, an elected reeve); a terrain word, an access word, deposit keys; a
wall record in 6–8 of 20 dossiers per tier (`hasWalls` and `hasGates` together); 0–2 quarters with fixed location phrases
(Religious Quarter, Alehouse & Common, Fishing Landing, Woodcutters' Ground, Roadside Shrine; the small towns' Market
Quarter); 0–4 landmark strings; culture, wealth and power records; no port institution below the town tier; no coordinate of
anything. Every gap is derived by our rules (items 20 (h), 22).

**The derivation rows at village rungs** (§7.7's DR table read with the village's values; only what differs from the base's
rows is stated; the row sets are V08 §2.6's):
* **DR1 site.** `plains` → the water draw with the coast, island and estuary weights 0; `riverside` → a brook, stream or
  river by the water row's flowing weights (renormalised), course-first (V07 §3.2 (2)); `coastal` → a coast; `hills` → the
  `hilly` relief row; `mountain` → `mountainous` and a pass when `defended_pass` is listed; `forest` → the forest toggle,
  woods × 2 in V07 §3.9's claim and `forest_strip` and `infield_outfield` × 2; `desert` → the arid row: S0's
  water weights re-weighted by V07 §3.1 (1) (each type at its class's arid chance — a brook, stream, river, pond or coast all
  stay possible) and the oasis exactly when `oasis_water` is listed (DR40; V08 §2.6's `site` row). A bridge-implying record
  (`Toll bridge`) applies V08 §2.6b (3)'s rule at the village rung (V07 §3.1 (1)). `site.culture` → `cultureForms` (V07 §2.2)
  and the longhouse factor.
* **DR2 walls.** A wall record → the palisade stage runs and its chance draw is skipped; its kind from the record's words:
  `Palisade` alone → `palisade`; "Palisade or earthworks" (the small dossiers' other wall record) leaves the choice open, so
  it is drawn from `palisade.kinds` restricted to `palisade` and `earthwork` and renormalised, on `blueprint.features`,
  recorded in `autoResolved`; a record naming a bank and ditch → `earthwork`; a record naming stone, "Town walls" or "City
  walls and gates" (a small town's greater ladder tiers, V07 §2.4's third table) → `inner`. No wall record → no palisade
  (walls exactly when the dossier lists one, DR2's bar). The palisade's generation-time condition is §7.7's DR41
  (the dossier's `readiness` label and wealth; V07 §3.4 (8)). **The waterfront** (item 106 (d) at village rungs) is `open`
  whatever the threats: a village's palisade never fences its water (V07 §3.4 step 5); a **sea threat** — any key of
  `PortValues.threats` (V08's `threats` row: `naval`, `hostileSeaPartner`, `seaMonster`; `exposedPort` never fires below
  20 000 people) — raises the `v.watchtower` row's chance to 1 and sites it at the wharf or chief landing instead of a gate —
  a lookout, not a sea wall (J-V7.28) — and no harbour-mouth chain is built (a village has no harbour basin). The access word
  → the road topology: `road` → `through`; `crossroads` → `crossroads`; `river` → `through` along the river with a landing
  (and a wharf when the water is navigable); `port` → `through` with a wharf; `isolated` → `isolated`; `none` → `dead_end`;
  `mountain_pass` → `through` along the pass. An unwalled village's "gates" are its road entries (V08 §2.6's `access` row).
* **DR3 partners.** A `road` partner's bearing is a through road's or neighbour road's entry bearing (V07 §3.5 seeding 1, 7).
* **DR5 districts → ends.** One district. Each quarter claims an **end** by §7.7 item 16's naming claim, anchored as its
  phrase says: Religious Quarter → the church end; Alehouse & Common ("Village centre") → the green end with the alehouse on
  the green; Fishing Landing ("At the water's edge") → the wharf end with the `v.landing`; Woodcutters' Ground ("At the
  forest edge") → an end at the wood edge with the `v.wood_yard`; Roadside Shrine ("At the settlement edge") → a shrine at
  the perimeter on a road, and its name on that end when houses stand there; Market Quarter ("Central") → the open space's
  end, which carries the market; Noxious Trades Quarter → the downstream end with the tannery; Government Quarter → the
  manor's or reeve's end; Artisan Quarter → the smithy's end; Waterfront District → the wharf end; Shadows District → the
  lowest-value end; Mages' Quarter → an end apart (`far` from the heart); **Wealthy Residential** ("High ground, good
  views") → a `claim` end on the plots of highest mean prosperity (pass 1), on the high ground, its band bias applied to that
  end's plots only, never to the one district (a one-district village would otherwise shift its whole wealth); **Common
  Residential** ("Spread throughout") → no end and no bias (the village is its common residence) (J-V7.59). A claim with no
  anchor makes a `claim` anchor at the claimed class's place (V07 §3.10). **The Religious Quarter's east phrase** ("Eastern
  district (traditional)"), the one compass statement a small dossier makes: the parish church's siting gains the base's soft
  east row at its low weight (§7.7 item 16's quarter row, `tables/dossier/quarters`), so the church end tends east of the
  heart — a placeholder the owner may drop (J80 Q5), with which T-V7-13's east clause lapses.
* **DR6 wealth.** `wealth.label` → `intent.wealthLevel` (V08's `wealth` row) shifts `bandShares` as §4.2 S2 shifts the
  base's; the bar (the population-weighted mean band within one band of the label's) holds at village rungs. A band moves a
  dwelling only along its capped row, and the manor count never rises with wealth (item 115; V07 §3.8's ceiling).
* **DR7 households** (J-V7.55). `H₀ = round(P ÷ meanSize)`; with the housing record's range `[min, max]`:
  1. **Too few households** (`H₀ < min`): `H = min(min, max(1, ⌊P ÷ household.minSize⌋))` — the mean household size falls to
     `P ÷ H`, never below `household.minSize` (1.5 persons) — and `N = min`, one household a dwelling; when `H < min` the
     `min − H` surplus dwellings are built **vacant** and reported (`W_VACANT_TO_RANGE`; a village in decline is the
     historical reading). A 10-person thorp with the thorp record's range 4–16: `H₀ = 2`, `H = 4`, `N = 4`, sizes 3, 3, 2, 2.
  2. **Otherwise** `H = H₀` and `N_raw = Σ_b round(H_b ÷ (1 + share2_b))`. If `N_raw > max`, the doubling is re-solved band by
     band from the poorest up, at most two households a dwelling, only until `N = max`; if even full doubling leaves
     `⌈H ÷ 2⌉ > max`, the household size rises instead (`H = 2 · max`), reported. If `N_raw < min`, the doubling is undone
     band by band from the richest doubling band down until `N = min` (reachable, since `H ≥ min`).
  3. **The members sum to `P` exactly**: each household gets `⌊P ÷ H⌋` persons and the remainder goes one each to the
     households in address order (largest remainder over equal shares).
  `N = N_v + N_o` (V07 §3.2 (3)) — the outlying farmsteads count as dwellings of the settlement — so the residential building
  count lies inside the record's range (DR7's bar) and every household is housed once.
* **DR9 and DR24 institutions → classes** (J-V7.56). DR24's class rule (item 12; V11's catalogue rows) gives each record's
  class or pseudo-class; at a village rung it resolves in this order, the first that applies deciding:
  1. **a pseudo-class** goes to its reader and builds nothing of its own (V11 §3.11): `@office` binds to its seat's building —
     at a village rung the `villageSeat` member's, a religious office the parish church's (V07 §3.2 (3)); `@seat` to the
     government row's `villageSeat` (V11 §3.21.1); `@pin:<kind>` to VS8's pins, forcing its pin where none stands (V07
     §3.10); `@landuse:<kind>` to V07 §3.9's claim; `@housing` to DR7; `@wall` to DR2; `@layer:*` to the layer toggles;
     `@none` to the gazetteer only; `@absent:<class>[+<class>]` to S2 — each named class's `min` and per-capita demand 0
     unless another record names one, and at a village rung each named class read through its `villageForm` (V11 §3.22):
     `@absent:church` (`access_to_parish_church`, tiers T and H) zeroes `v.parish_church` — its presence entries and its
     members — and with it the classes keyed on a parish church, `v.parsonage` (its `×1 v.parish_church`) and `v.tithe_barn`
     (its `with v.parish_church`), while `v.chapel`'s `without v.parish_church` entry stands (a chapel of ease served a
     parish whose church was a neighbour's); `@absent:watermill+windmill` zeroes `v.watermill` and `v.windmill` (J-V7.103) —
     never to the fallback, so a `priest_resident` binds to the parish church and a `village_musician` stays a gazetteer
     entry;
  2. **a class with a `villageForm`** (V11 §3.22) is substituted by the `v.` class that plays it;
  3. **a class with its own row** plays itself — allowed at any rung once a dossier names it (a `pawnshop`, a
     `smugglers_store`);
  4. **only a kind that fell to V11's `generic-<family>` class** takes the **tag fallback** (our rows); the port's one
     `unmapped_kind` note names the class the fallback gives (V08 §4.6), and no second report is written: `religious` →
     `v.parish_church` from 400 people, else `v.chapel`; `market` → the open space's market (V07 §3.6 (4)); `lodging` →
     `v.inn` on a through road, else `v.alehouse`; `food` with a keyword `brewer`, `brewery` (family `food-works`), `tavern` or
     `alehouse` (family `lodging`) in the record's name (a drink) → `v.alehouse` (any other `food` record goes on down this
     list); `metalwork` → `v.smithy`; a keyword of family `food` with the key `mill` in the name → `v.watermill`, else
     `v.windmill`; `law_enforcement` or `defense` → `v.watchtower`; `civic` or `legal` → `v.reeve_house`; `healing` → V11's
     `healer` class, playing itself on a toft slot (its `dwelling-row` template read as V07 §2.4's dwelling plot); `leather`
     with `industry` → `v.tannery`; `port`, or a keyword of family `port` in the name → `v.landing`; a keyword of family
     `timber-yard` in the name → `v.wood_yard`; a keyword of family `industry` with the key `kiln` in the name → `v.potter`;
     else the generic class itself. Every keyword is a row of V11 §3.13.2's keyword table (`dossier.keywords`), matched whole
     on the case-folded name as that table states, so the fallback reads one table (J-V7.106).
  **The burial records** (J-V7.57): a `cemetery`-class record (`burial_ground` at tiers T and H, `graveyard` at V; V11's
  rows) is seated as the parish church's **churchyard** when a church stands, its yard part enlarged to V11 §3.6.1's
  `burial-ground` family plot area at the church plot's band (the churchyard part grown by S10 (7)'s join law over the
  adjacent slots until it holds that area, the church's own template unchanged; J-V7.100); else as its own `cemetery` plot at
  the settlement's edge on a road (S10b; `use: 'cemetery'`), with a `v.chapel` only where a religious record also asks for
  one. The seat carries the record's binding key and is a burial face (V07 §2.4) — the face the town's catacomb rule reads
  after a hand-off up (V07 §3.12 step 6; J111: catacombs lie only under cemeteries). A `parish_burial_grounds` record (tier W;
  every small SettlementForge town carries one) reads V11 §3.12's COUNT: one member per standing `v.parish_church`'s
  `churchyard` part, each bound `#k` and a burial face, none enlarged; a `cemetery` plot at the settlement's edge only where
  no church stands (J-V7.107).
  **The external mill**: `access_to_external_mill` (`@absent:watermill+windmill`, V11 §3.11) suppresses S2's mill demand —
  neither a watermill nor a windmill — and makes milling an import through the entry store (below), reported (J-V7.58).
  A count range clamps the class's count; a singular record is placed once (DR9's bars). The housing record assigns nothing
  (DR7).
* **DR11 seats.** `Feudal Stewardship` (seigneurial) → the `v.manor_house` as the seat; an elder, household or free elder
  council or an elected reeve (chartered commune; V08 §2.6's `government` row set) → the `v.reeve_house` and the moot place;
  ecclesiastical → the `v.parsonage` beside the church — the `@seat` binding being V11 §3.21.1's `GovernmentRow.villageSeat`.
  A dossier's government (or an `@seat` record) forces its `villageSeat` class present with at least one member (V07 §2.4's
  forced seats) at every village rung, whatever its presence entries and whatever an `@absent:` record zeroes (J-V7.104,
  J-V7.113) — so a crown village has its manor house and a merchant-oligarchy village its reeve's house, and a
  `lord_s_reeve` or `village_headman` record always finds its seat; a forced manor is "specified" under item 115's ceiling
  (V07 §3.8).
* **DR16–DR18.** The hidden share is 0 and a clandestine record takes the front mode (PART III). The underground at village
  rungs: caverns and ruins by the site (item 109 (j) (1); V07 §3.16) with access by dig, well, opening, a dug passage or a
  mine breach, and scattered dwellings only after access; no sewer network, undercity, catacomb, quarry, vaults or buried
  town (their TOWN gates, item 109 (j) (1), (k) (1)) — save a shrunk town's standing systems in maintenance mode (V07 §3.12)
  and a dossier catacomb fact, which is V04's charnel vault (V07 §2.4); an author's dug passage (item 66) as everywhere;
  informal clusters appear only under a migration condition (tents at the perimeter; V08 §2.6's `conditions` row set), the
  squalid band otherwise living in hovels at the green's or common's edge (V07 §3.12's encroachment).
* **DR19 deposits.** V08's `deposits` rows open their land uses in V07 §3.9's claim; `river_mills` forces a `v.watermill`
  when a mill seat exists; `grazing_land` doubles the commons' share; `managed_forest` doubles the coppice. The mining
  deposits (iron, precious metals, gemstones, coal, copper) raise the cavern chance by `cavern.mineBoost` and make a mining
  class's working a breach candidate (V07 §3.16 (4)); `ancient_ruins`, `magical_node` and the ley-line income rows are ruin
  sources (V07 §3.16 (1); V08's ruin and magic rows).
* **Landmark strings** (V08's `landmarks` row, the village-product rows): `Alehouse` → the alehouse use's name; `Common well`
  → the green's well pin; `Net mending post` → a `net_rack` yard part of the landing; `Drying racks` → `drying_rack` yard parts
  of the landing; `Beaching ground` → the named beach (V07 §2.3); `Timber stacks` → a `timber_stack` yard part of the wood
  yard; `Tool shed` → a named outbuilding in a farmstead; `Charcoal pit` → the charcoal pit's name.
* **DR9 with item 108 — ladder records.** A record whose name carries a count range, or a ladder qualifier ("(multiple)",
  "(guild)", "(district)", "(established)"), or whose kind is a greater tier of a ladder pair, is read by its step type (V11's
  step-type table; V08 parses the qualifier): COUNT → that many members of the member class keyed `#k`, their count S2's
  per-capita rows at `P` clamped into the range (V07 §2.4's third table for an unnumbered one), spaced by the class's
  same-kind row; QUARTER → an end claimed and owning its members (V07 §3.10); GUILD → one `guildhall` plus the trade's
  members, its hall bound into a guild COUNT record of its `categories` family by V08 §3.5.1 (c) (J-V8.83), never a further
  hall; a GUILD record of another family, or with no COUNT record of its family in the dossier, keeps its own hall; SIZE → one
  larger building by the class's template; REPLACEMENT → the greater only. Where a greater and a lesser of one ladder both
  arrive (a custom kind, an event adding the lesser, a stale record) the lesser becomes a member of the greater's collective,
  and the roster's own per-capita members of that class **are** the record's members (item 108 (c)): no double count. A
  small-town dossier's count-range records (8–10 in a town's records, `research/sf/dossier-outputs.md` §3.4) are the common
  case at the VILLAGE rung's top. A `town_watch` record's member (V11's `guard_post`, played by `v.watchtower` through its
  village form) carries the assignment's own soft row (`Assignment.criteria`, the base's `PlacementCriteria`; id `pc/…`, as
  DR2's sea-threat row): `near` → `open:green`, `open:square` 80 soft 0.8 — the watch's yard by the green.
* **Supply chains (item 105 (i)).** The dossier's `activeChains[]` (0–4 in a thorp, 2–9 in a hamlet, 6–13 in a village,
  `research/sf/dossier-outputs.md` §3.4) become links between the bound members through V08's chain row: each processor name
  resolves by kind family to the village class that plays it (DR24 with `villageForm`); a chain whose processor is absent
  from the map binds nothing and is reported, never invents a building (the dossier is the truth of what exists; DR9 places
  what it lists); an `impaired` or `vulnerable` chain's links weaken by V11 §3.7.4's `chainStatus` weights, keyed by V08's
  neutral status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls, served by the **entry store**.
* **The entry store** (imports and exports at village scale). A village has no warehouse district: the store is a `store` use
  (§2.7's `Use`, assigned by S10b, never a new building) on the plot that faces the partner — the inn on the through road's
  entry at the partner's bearing (DR3) when there is one (the carriers' inn); else the wharf's or chief landing's `v.landing`
  for water trade; else the farmstead nearest that entry, whose barn holds it (J-V7.29). Its pulls are item 104 (b)'s and 105
  (i)'s; the clerk names it ("the carriers' store at the inn").
* **Item 104 at village rungs.** A custom institution resolves its profile by item 104's order, its archetype read through V11
  §3.13.2's `village` cells (V07 §2.4); an **active custom chain** is placed as one connected thing (item 104 (h)) by V11
  §3.13.4's rules (`siting.custom`), read through the village's context (item 576 (b)): its resource at its terrain feature in
  the hinterland (`resourceSite`; V07 §3.9's claim reserves the face), its first processor by the resource or on the road
  toward it (`firstProcessor`, outside the perimeter when it emits a nuisance), its later processors each a step nearer the
  village's centre of trade and its final seller by it (`stepInward` and `finalSeller`, reading `dist.market`: the market's
  open space, else the first nucleus's, else the heart; J-V7.111); a compatible chain sits close at street scale
  (`compatible`, item 104 (h) (3) as revised by item 107) and names the end it stands in only when item 72's quarter-identity
  threshold is crossed there or the dossier or the author declares it (a chain is never assigned an end); an incompatible
  one stretches along its road; its imports and exports pass the entry store (`endpointStore`'s village reading).

**The absorb half at village rungs.** Every later dossier change is the base's absorb (§7.7, V08): an added institution is
placed first by `village.records` — a market, claim-sized or pin record by V07 §3.12's *Records at a village epoch*, at an
epoch in its `dossier` step and without one in the absorb's commit (item 202; J-V7.125, J-V7.128) — and otherwise by a
`dossier` request to S10b on the current map; a removed one closes its use and is then handed to `village.records`' `remove`
for the fair field's reservation and the pins it forced or bound (V07 §3.12 *Records at a village epoch*); a population
change moves the epoch's target (V07 §3.12); a new wall record builds a palisade by `drawWall` in its derived form (the VS3
construction over the current density and the barrier closure, gates where the ways cross it); a changed access word adds or
retires a through road's classification (never its geometry); an added or changed supply chain re-derives the links it names
(links are never stored, item 105 (a)); and a ladder step — a promotion or a demotion carried by the record's `promotedFrom` /
`demotedFrom` receipt — changes the members by item 108 (d)'s least disruption: an upgrade keeps the standing building as
member #1 and places the rest — save a REPLACEMENT whose greater is a new thing, placed by V07 §3.12 *Records at a village
epoch* item 4 (V08 §3.5.1 (d)); a demotion keeps the member nearest its demand and vacates the rest by fate (item 17).
**The palisade's REPLACEMENT** ("Palisade or earthworks" → "Town walls"): when at least `ladders.replaceShare` (80 %) of
the standing dwellings lie inside the palisade's enclosure, the wall is **rebuilt on the palisade's trace** — `setAttr`
of the enceinte's kind to `inner`, `material: 'stone'`, its full stretches taking the stone section and its light ones
the parapet (item 106 (c)), gates kept, every run `standing` and robust (a patched run rebuilt in stone) — where a
standing raised way crosses the trace, the run laid again in its new section by §2.7's laws (law 2 (a): its line kept
where its new band is lawful, re-traced locally where not, its gates kept — never moved for a meeting (J148): where a
kept gate would then stand where law 1 (5) bars one, or with no other lawful shape, the REPLACEMENT waiting, law 2 (c);
its worked example row W14) — the least disruptive reading, and the historical one where a stone wall replaced a timber
circuit on its line; otherwise the town wall is a new ring by the base's later-ring rule, anchoring on the barriers and
on the palisade (item 106 (f)), and the palisade is `supersededBy` the new ring and decays by the persistence rows
(J-V7.32). The `town_walls` record's key binds the rebuilt enceinte, else the new ring, with the palisade's key as its
alias — after a `promotedFrom` receipt the record's one key is re-pointed to that enceinte and no alias is written (V08
§3.5.1 (d)); the superseded palisade keeps no binding.
=== END ===

=== REPLACE ### 3.12a A village over a former town, and refounding at village rungs (item 113, the village's part; J-V7.138) ===
### 3.12a A village over a former town, and refounding at village rungs (item 113, the village's part; J-V7.138)

§4.11 *History-first generation* generates a settlement with a known history as its past and ages it to the present, V06's
replay engine running the coarse epochs, V08 reading SettlementForge's history, V04 burying the former fabric. This section
is what happens at the village rungs; every epoch it names is an ordinary village epoch of V07 §3.12, run inside the
replay's creation prefix (§7.4: never an undo target).
1. **A village over a former town or city.** A history whose peak (§4.11 (1): `peakTier`, the high-water population, or the
   effective peak from evidence, V08) lies at TOWN or above and whose present lies below the hand-off band is generated at
   the peak and declined by the replay's epochs to the present. The epoch whose target first falls below `1 500 × (1 −
   handoff.band)` is an ordinary **hand-off down** (V07 §3.12): the `VillagePlan` is created from the standing fabric (the
   heart at the principal market's centroid, the form `nucleated`, the palisade the innermost standing enceinte, the ends one
   per standing district), and from then on the village phases run to the present. The remnants are what the village's rules
   leave of the town, never a separate construction: its walls far beyond the houses (every enceinte a standing ring decaying
   by V06 §3.7's need and means, item 114); its abandoned street lines as hollow ways by the village street row (`retireWay`,
   V07 §3.12 *Decline and desertion*) and, past the dwell bands, as field boundaries where V07 §3.12's land use takes their
   faces; a church too big for today's congregation (the persistence rows keep it; a cathedral stays a cathedral, V07 §3.12
   *The hand-off down*); a market square too large for its market (the square kept, its rank by V07 §3.12 (d)); empty plots
   as closes and paddocks; roofless and ruined buildings by the dwell bands; the grander buildings kept as they stand under
   the village's grandeur ceiling (V07 §3.8). The present dossier's facts are met exactly at the end (item 20): the present
   population by the roster, the present institutions by the last epoch's dossier step through `village.records` (V07
   §3.12). **A symbolic peak** (§4.11 (1); item 113 (f)): a village dossier that holds a ruined or remnant record of a higher
   tier (a ruined "City walls and gates", a remnant cathedral) has its peak at that tier, sized at `history.symbolicQuantile`
   of the tier's population range (V11), every remnant the replay sizes carrying provenance `symbolic`; with no evidence there
   is no peak and the village is generated at its present. The clerk tells the story from the replay record (V10; V07 §4.5).
2. **Buried remnants under a village.** Where the former town's ruins pass `history.burialYears` (DR39) during the replay, V04
   §3.5.5 (b) lays them as the buried former settlement at their old ground level — whatever the rung at that epoch, since the
   former settlement stood at TOWN or above — and at a village rung the buried system stays registered in maintenance mode
   (V07 §3.12 *The hand-off down*; V04 §3.1), its access by item 109 (j) through the village's own openings (V07 §3.16 (3)–(5)).
   A former settlement that stood below TOWN at its peak lays no buried system (V04 §3.5.5 (b) returns null): its house
   platforms and hollow ways stay the surface earthworks of a deserted village (V07 §3.12), past any burial threshold.
3. **Refounding at village rungs** (item 113 (b); §4.11 (4)). Where the history says the place was destroyed outright
   (SettlementForge's terminal death and resettlement — a resettled place forced to THORP — a catastrophic event, or an ancient
   "Fall of" event on the site; DR38) and the new settlement is a thorp, hamlet or village, the old geometry becomes ruins
   (§4.11 (4): every building `ruined`, every way a trace) and the village product generates the new settlement on top, its S0
   draws reading the refounders' culture where the history gives one (V07 §3.1 (2)'s `cultureForms`), so it may follow a
   different plan. The rules (4)–(6) below make it reuse the old fabric wherever it helps; the rest of its generation is V07
   §3.1–V07 §3.16 unchanged.
4. **The old roads, gate gaps and bridges.** (a) VS1's lattice (V07 §3.2 (8)) prices a ruined way trace of the former
   settlement at V11's `history.reuseCost` through `existingFabricCost` (§4.3), so every router call a village stage makes —
   the neighbour roads, the polyfocal joins, the `row` spine, F-V-TRACK's third rung, a stub track — follows the old roads
   where they serve. (b) Every tracker's steer gains the **trace term** (V07 §3.5 step 5): `refound.traceWeight` × the unit
   tangent of the nearest ruined way trace within `refound.traceReachM` of the tracker's position, signed to agree with its
   heading (0 where none), so the village's lanes lean onto the old streets without being forced onto them. (c) A ruined
   bridge's deck site is one of S1 (5)'s crossing sites; a tracker taking it (V07 §3.5 step 2) rebuilds it (the `Bridge`
   `built` again), so the old crossings are reused first. (d) A ruined enceinte run of the former settlement is standing
   ruin, never the village's palisade: a tracker crosses it freely at a gate gap or a `breached` or `dismantled` run (item
   114's openings); where a step would cross a standing run away from any opening within `refound.traceReachM`, a `road` or
   `track` stops there as at a walled stretch (V07 §3.5 step 3), and a `through` tracker crosses, the run set `dismantled`
   over the crossing's width by `setAttr` in VS4's batch (the ruin's stone taken for the road). The village's own palisade,
   where drawn, is traced by V07 §3.4 over its own density, and a stretch running within `palisade.bandM` of a standing ruined
   run abuts it — its stretch ending against the ruined run's faces and closed against it, never laid through it. A ruin is
   no raised way: §2.7's laws do not apply.
5. **The old foundations.** In the slot race (V07 §3.8) a slot whose toft holds a ruined building's footprint of the former
   settlement weighs × `refound.foundationSlot`, so the new houses stand on the old ones first; a raced slot's ruin is taken
   by `clear` and its dwelling built by `reuse … build`, crediting and debiting the salvage ledger within the haul radius
   (§4.11 *Salvage*); a ruin on a slot the race leaves unbuilt stands, the close around it (the old plan persisting wherever it
   helps).
6. **The ruins' fate over time.** The former settlement's surface ruins decay by the dwell bands (walls one band slower) and,
   past `history.burialYears`, are buried by (2) when the former settlement stood at TOWN or above; the village's own decline
   and growth treat them as standing fabric (V07 §3.12's regrowth-first order rebuilding on a ruin's platform first).
7. **Edges and bars.** With the replay off (`history.replay` false, the parity presets — `VG` included) no rule of this section
   runs and the output is byte-identical (T-V7-59's no-op clause); a refounding with no ruined way within the territory leaves
   the trace term 0 and the lattice unpriced; a history whose peak lies below TOWN with a village present replays the village's
   own epochs (V07 §3.12) and lays no buried system; a peak above the cap is sized at the cap (§4.11 (7)). T-V7-59 is the
   village's half of T113-1 and T113-3.
=== END ===

=== REPLACE ### 3.13 Failure handling — the village ladders (never a whole-map retry, §5) ===
### 3.13 Failure handling — the village ladders (never a whole-map retry, §5)

VG retries a failed build on the next generator state without bound (`ref:VG 1.6.9 retry on the next state (code)`); we
never do. Every village stage's ladder is below; each rung is bounded, each outcome reported with its delivery tier (§5.4).

| class | detected at | ladder (in order) | test |
|---|---|---|---|
| F-V-HEART no heart candidate | VS1 | slope limit `heart.slopeMax` 0.1 → `heart.slopeRelaxed` 0.2 → any dry cell above the flood line → the driest cell of the frame's middle half, reported | T-V7-4 |
| F-V-DENS populated area below the demand's `A_s` | VS2 | `δ` × `fail.dialStep` (1.25) `fail.dialTries` (2) times → `reachShare` × `fail.reachStep` (1.25) → carry on; F-V-SLOT covers capacity | T-V7-5 |
| F-V-PAL fewer than 3 kept points (collinear points counting as fewer), or no nucleus inside | VS3 | `keepBelow` → 0 → a ring through the `fail.palRingPoints` (12) densest lattice points around the heart → the palisade omitted, reported (a dossier's wall: kept as a ring of `fail.palRingShare · R_s` (0.8) around the heart) | T-V7-6 |
| F-V-ANCHOR a walled stretch whose end finds no barrier to anchor on (item 106 (h)'s F-WALL at village kinds) | VS3 step 5 d | the stretch follows the pre-reach trace around the barrier's end until it meets another barrier → it closes the ring on the pre-reach trace (that run's reach undone) → the barrier closure off for this enceinte (VG's water cut), reported | T-V7-31 |
| F-V-RAISED a palisade line with no lawful crossing of a standing raised way, a fixed place with no clear point in reach, or a held building's widened strip it cannot keep clear (§2.7's laws, law 2 (c); its worked examples (G3) and *beneath*) | VS3 | its rung alone, no other rung of this table running on it: the ring re-laid once with law 1's exclusions impassable and its search band widened to VS3's barrier reach (V07 §3.4 step 5 b), so that it may pass round the raised way (§2.7's laws, law 2 (c)) → the palisade omitted, reported (VS3's `W_RAISED_MEETING`, §5.4) | T-V7-48 |
| F-V-GATE a palisade with no gate | VS4 finish | a gate where the nearest road to the heart crosses the trace → a gate stub way from the nearest junction square to the trace (`placeGate`'s form, §7.1) | T-V7-6 |
| F-V-TRACK a tracker that meets itself, is stopped by water with no crossing, leaves an unfinished crossing, exceeds its step limit, or is still blocked by a raised way's obstacle or its under-deck strip after its turns (V07 §3.5a (3)) | VS4 step | retreat `branch.retreatSteps` (3) and re-steer along the contour vector → the nearest crossing site within `branch.crossingSearchShare` × `bridgeSnapM` → for a through road, the remainder routed by S4's router (§4.3) to its target; for others, stop and record a landing → reported | T-V7-7 |
| F-V-OPEN the open space meets water, the mill or leaves the palisade | VS4 seeding 2 | shrink × `openShape.shrink` (0.8) up to `openShape.shrinkTries` (3) times → the next densest populated point → no open space, reported (the market to a flanking square) | T-V7-8 |
| F-V-FAIR the fair field meets water, the mill reservation, a raised way's strip or support, or the frame's margin | VS5 (V07 §3.6 (4b)); at a village epoch `village.records` (a record) or step (m) (a roster member; V07 §3.12 (a)) | slid outward along its road one field length at a time, up to `R_s` → the other side of the road, slid likewise → the nearest dry hinterland face adjoining a road that holds its area → no reservation: the fair is held on the reservation that carries the market (the member bound to it), reported `W_FAIR_ON_GREEN` | T-V7-13 |
| F-V-SLOT fewer slots than dwellings and institutions | VS6's capacity check (rungs 1–3); S10a and S10b (rungs 4–5) | slot widths to the band minimum → track frontage at full weight → up to `fail.slotTopUp` (3) top-up road trackers from the densest perimeter junctions, grown inward, VS6's second L1 batch → the doubled-household share to the templates' `households.max` → the unhoused households reported, never dropped (§5.2 F-PLAN's rule) | T-V7-9 |
| F-V-MILL no mill seat | VS1 | the leat limit `mill.leatMaxM` 300 → `mill.leatFallbackM` 600 m → a `v.windmill` by its row → the milling imported, reported (the need propagation's substitution, §4.2 S2) | T-V7-10 |
| F-V-FOOT a raised way's foot with no part-0 way vertex within `raised.endSnapM` | VS4 (V07 §3.5a (3)) | a stub `track` routed by S4's router (rung gate closed) from the foot to the nearest way, reported `W_RAMP_STUB` → the foot left unjoined, reported `W_RAMP_UNJOINED` (the way still reached by its other foot); never a moved foot, never a raised part laid | T-V7-48 |
| F-V-TERRACE a platform wall between the door and the frontage whose drive or path cannot meet its grade inside the toft | S11 (V07 §3.8a (6)) | the ramp laid along the wall inside the toft yard → the platform's frontage edge dropped to the way's level (two levels, the wall moved back by the ramp's length) → a stair only, the drive omitted, reported `W_TERRACE_NO_CART`; never a gap in the wall, never a retry of the map | T-V7-47 |
| F-V-FIELD arable short of its demand | S12a | wood and pasture faces re-claimed by suitability → the import share raised and reported (§4.9's rule) | T-V7-11 |

Every other rung of this table re-lays the palisade by VS3, so by §2.7's laws as VS3's line meets it. Every base ladder
a reused stage has (F-RIVER, F-ROUTE, F-PLOT, F-SITING …) applies as in the base; the edges of every village mechanism
are V07 §3.17's.
=== END ===

=== REPLACE ### 3.17 Edges — every mechanism at its limits (principle (11)) ===
### 3.17 Edges — every mechanism at its limits (principle (11))

Every village mechanism's extremes have a defined outcome (J-V7.143), a rung of its failure ladder (§5: check, repair locally, retry that
piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test; T-V7-60 runs every row on the
edge fixtures, at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo,
redo, regenerate and migrate. The edge classes: **none** (no input), **one** (exactly one item), **cap** (the maximum and its
caps), **degenerate** (zero-length, zero-area, self-touching, collinear, coincident), **data** (missing, empty or contradictory,
the dossier included), **rungs** (every rung and toggle), **lifecycle** (save, load, undo, redo, regenerate, migrate). At a base
rung (TOWN to the cap) no village stage runs — the product's stage set decides (V07 §3.0) — so every row's rungs clause is its
THORP–VILLAGE range plus that statement.

**(a) The mechanisms.**

| mechanism | the extremes and their defined outcome | rung | test |
|---|---|---|---|
| the records (V07 §2.3): yard-part kinds, the named beach | data: a landmark string whose host is absent (no landing for `Net mending post`, no wood yard for `Timber stacks`) lays nothing and is listed in the gazetteer, reported `W_LANDMARK_NO_HOST`; `Beaching ground` with no `beach` run on any shore takes the landing's own shore run, and with no landing no label, reported; an unknown yard-part kind in a table row fails the table compile (§7.6) | leave out and report | T-V7-60 (a) |
| the request block and `villageForm` (V07 §2.7) | data: a `villageForm` naming no `v.` key fails the compile (V11 §2.3), never a run; a request `densityDial` outside [0.5, 2] is clamped and reported; `arableFactor` outside [0, 4] clamped; `water: 'island'` with an explicit `roads` other than `isolated` is an F-EDIT conflict whose dry run offers `isolated` | check | T-V7-60 (a) |
| the pipeline (V07 §3.0) | none: P = 1 runs every stage (one household, one dwelling, no institution by the presence laws at 1 person) and the frame is `territory.minKm2`; degenerate: a stage whose inputs are empty (no water, no road topology `isolated`) runs on empty inputs and writes empty outputs, T-V7-3's one-producer check unchanged | check | T-V7-3, T-V7-60 (a) |
| S0's draws (V07 §3.1) | none: every field `auto` draws in the stated order; one: a single-entry weight row (every other weight 0) draws that entry with no draw consumed beyond the one `u`; data: a dossier's fixed access word (`isolated`, `none`) beside a bridge-implying record reads V08 §2.6b (3)'s failure (`toll_bridge_dry`); a request and a dossier never both fill one field (the dossier fills the request, V07 §3.11); rungs: every weight read at `P` by the anchor law, clamped at the THORP anchor below 40 and the VILLAGE anchor above 700; lifecycle: `autoResolved` recorded, Regenerate (keep) re-reading it, New random on the village scope redrawing the `auto` fields, a changed request re-deriving from S0, an absent block reading all-`auto` on load of an older document | check | T-V7-1, T-V7-60 (b) |
| VS1 (V07 §3.2) | degenerate: a lattice with no dry cell above the flood line → F-V-HEART; polyfocal nuclei that cannot all be spaced → as many as fit, `k` reduced and reported; a course whose chord passes outside the frame is re-drawn by F-RIVER's rung (§5.2); zero-length resampled course segments dropped; lifecycle: the plan's recorded inputs (heart, nuclei, character, `R_s`) kept by Regenerate (keep), re-derived by Re-derive from VS1, a moved heart undone by `setAttr`'s inverse | repair locally | T-V7-4, T-V7-24, T-V7-60 (b) |
| VS2's density (V07 §3.3) | cap: the box clipped to the frame, so the raster never exceeds (frame side ÷ `densityCm`)² cells (≈ 314 000 at P = 1 499), priced by V07 §6; `δ` clamped to `density.dial`; `Δh` 0 (a flat box) reads `bandMinM`; an arid row with `w_water` at its maximum and no reliable water leaves `wp` 0 | check | T-V7-19, T-V7-60 (b) |
| VS3's palisade (V07 §3.4) | none: no kept point → F-V-PAL; one: one kept point → F-V-PAL; degenerate: collinear kept points count as fewer than 3; a reach replacement whose connector would cross the trace is not made (that run keeps its trace), so the trace never self-touches; data: a dossier wall record over an empty density box → F-V-PAL's dossier rung (a ring of `0.8 · R_s`); a `patched` run with no patch row for its kind and culture takes V11's kind default row; rungs: THORP with a palisade (chance 0.10) traces as every rung; every run `standing` under `VG` | simpler shape | T-V7-6, T-V7-31, T-V7-62, T-V7-60 (c) |
| VS4's network (V07 §3.5) | degenerate: a zero terrain gradient (a flat cell) gives `t` = the current heading; a step that would re-enter the tracker's own last four steps → F-V-TRACK; a frame shorter than one step lays no tracker and records the entries at the frame; branch spacing wider than the frame: no branch; lifecycle: ways keep their lineages (V07 §2.5) through Regenerate (keep) and every re-derivation, an edit's undo restoring its ways by the event's inverse | retry that piece | T-V7-7, T-V7-46, T-V7-60 (c) |
| a raised way on a village map (V07 §3.5a) | degenerate: two feet within `raised.endSnapM` of one vertex join it once (two `T` junctions on one vertex); a zero-length span (coincident supports) is one support; a raised way wholly outside the perimeter changes no slot; a support on the frame's edge is clipped to the frame as an obstacle | check | T-V7-46, T-V7-52, T-V7-60 (c) |
| the open space (V07 §3.6) | none: `open: 'none'` or the `dispersed` form: no reservation, the market to a flanking square; one: one nucleus; degenerate: a rim of `open.rim`'s minimum on a shape meeting water → F-V-OPEN; data: a dossier market record with no open space → the flanking square; rungs: the space scaled by `open.scale` at every `P`; lifecycle: a hand-moved space held (V07 §4.3) | simpler shape | T-V7-8, T-V7-60 (d) |
| VS5's perimeter (V07 §3.7) | none: no populated cell → the perimeter is the open spaces and the mill reservation united (F-V-DENS having run), else a disc of radius `R_s` about the heart, reported; one: one nucleus; degenerate: a perimeter touching the frame is clipped to it; an interior of exactly `slot.backCloseHa` stays (the cut is "more than"); rungs: every rung | substitute | T-V7-5, T-V7-60 (d) |
| VS6 and the slot race (V07 §3.8) | none: no frontage run → F-V-SLOT; one: one slot takes the whole quota's first dwelling; cap: a quota above the raceable slots → F-V-SLOT's rungs; degenerate: a run shorter than one slot's minimum width lays none; data: a housing range forcing more dwellings than slots → F-V-SLOT (never a drop); rungs: every rung; the grandeur ceiling at THORP, HAMLET and VILLAGE (item 115) | simpler shape | T-V7-2, T-V7-9, T-V7-63, T-V7-60 (d) |
| levelling (V07 §3.8a) | degenerate: a platform of zero area (a footprint outside its toft) is not levelled; a walled interval shorter than one `edgeSampleM` step lays no wall; a plane fit on fewer than 3 distinct samples is flat (gradient 0, not levelled) | check | T-V7-47, T-V7-60 (d) |
| the hinterland (V07 §3.9) | degenerate: a hinterland face of zero area is skipped; a furlong below `fields.furlongHa`'s lower end joins its neighbour in the same great field; a great field left without a face keeps its slot and is tombstoned (V07 §2.6) | repair locally | T-V7-11, T-V7-17, T-V7-60 (e) |
| the wharf, ends and pins (V07 §3.10) | none: no dockable run → no wharf, the landings' single piers; one: one pier; cap: the pier count's law, the ends' cap 6; degenerate: a dockable run shorter than one pier spacing lays one pier at its densest vertex; data: a `market_cross` record with no market → the through road's frontage nearest the heart; a `@pin:<kind>` of a kind VS8 has no row for is placed at the heart's nearest free junction; rungs: every rung; lifecycle: a forced pin across undo, redo and an absorb follows V07 §2.6's rows | substitute | T-V7-13, T-V7-35, T-V7-60 (e) |
| deck plots (V07 §3.10a) | degenerate: a pier shorter than `deck.headM`'s length takes no head; a head over dry ground (a pier ending on a shoal) takes no plot | leave out | T-V7-49, T-V7-60 (e) |
| the dossier readings (V07 §3.11) | degenerate: a quarter claim with no anchor → a `claim` anchor at the claimed class's place; data: a housing range with `min > max` is the port's refusal (V08), never read here; a population outside `[1, 1 500)` never reaches the village rows (§1.1, item 202) | check | T-V7-13, T-V7-21, T-V7-60 (f) |
| epochs and the hand-offs (V07 §3.12, V07 §3.12a) | degenerate: an epoch whose target equals the standing population adds nothing and removes nothing; a hand-off down whose principal market's centroid lies in water puts the heart at the nearest dry cell; a replay with no peak runs no history (§4.11 (7)); lifecycle: an epoch undone after a save restores its record's ops on load, since the log is the document (§2.9) | check | T-V7-13, T-V7-14, T-V7-59, T-V7-60 (f) |
| the failure ladders (V07 §3.13) | none: a ladder with nothing to act on returns unchanged and reports nothing; degenerate: a ladder whose every rung fails ends at its last rung's report, never a retry; data: a contradictory dossier (a wall record at a `none`-access dossier) builds the wall and the dead-end topology | leave out and report | T-V7-4 – T-V7-11, T-V7-60 (f) |
| determinism (V07 §3.14) | none: a stage with no draws consumes no stream index | check | T-V7-18 |
| the underground at village rungs (V07 §3.16) | none: no cavern and no ruin → the tail lays nothing, byte-identical; one: one void element takes the access draws alone; degenerate: a void element whose headroom falls below V04's minimum is created collapsed (V04 §3.5.5 (b), V04 §3.5.0a) | leave out | T-V7-38, T-V7-60 (g) |
| editing (V07 §4.1–V07 §4.4) | none: an undo with no village edit in the log changes nothing; one: a lasso holding one plot declares a one-plot end; degenerate: a zero-length stroke (T4 `road`'s walk mode, T3 `wall`, a lasso of zero area in `declareEnd`) is a dry-run F-EDIT refusal of shape, never an event; data: an edit whose target a dossier absorb removed is a dry-run F-EDIT naming the absorb; rungs: every tool at every village rung; lifecycle: every edit kind's V07 §4.4 row | check | T-V7-22, T-V7-54, T-V7-60 (h) |
| the clerk (V07 §4.5) | degenerate: a `why` on a zero-area end or a field with no face answers its anchor's or system's line; data: a `why` on a superseded `VillagePlan` answers from its record with the "when this was a village" line; a village with no end answers the one district; lifecycle: the provider reads committed records only | check | T-V7-61, T-V7-60 (h) |
| rendering, labels, exports (V07 §5.1–V07 §5.4) | none: a village with no palisade, green or field draws the rest; one: a one-dwelling THORP exports every format; degenerate: a label on a zero-area end is dropped by §9's rules; data: a dossier title word absent → the rung's word; rungs: every rung, `painterly` and `ink`; lifecycle: every export re-derived from the committed model | leave out | T-V7-25, T-V7-60 (h) |
| the one-time waits (V07 §6) | cap: every one-time wait at P = 1 499 on the largest frame, an epoch and the history replay included, within the comfort level, the target misses declared; a wait past one second shows its progress; rungs: every village rung on the reference machine, the low tier's unreachable sizes declared per device (item 119 (e)) | check | T-V7-67 |
| Find at the village rungs (V07 §5.5) | none: no chip on, the view unchanged; one: a class with one member glows once, its count 1; data: a chip whose end or field an epoch, an edit or a hand-off removed stays at count 0, dark, until removed or revived; rungs: THORP with no end (the village itself the one area and gaps unit), HAMLET, VILLAGE, under `VG`; lifecycle: the `find` key in no digest — saved with the other view keys (§2.9) and in view pins, untouched by undo, redo, regenerate and migrate, re-evaluated at every commit and every change of the drawn week (a week whose frame is not the head read over that frame, V07 §5.5) | check | T-V7-68, T-V7-60 (h) |
| the crisis looks at the village rungs (V07 §5.6) | none: no condition and no preview, nothing drawn; one: a THORP of one house, one unit, ruined at any positive share at `lookLevel`'s depth; data: an unmatched target reported and the pattern used, a calamity naming more units than the share's count striking every named unit, a fire whose order ends before that count reporting the shortfall (V01 §3.16 (5)), an unmapped condition read `none` (V08); no walled stretch, green, market, entry, outlying farmstead, arable face or end — V07 §5.6 (7)'s outcomes; cap: a force beyond the frame and its margin, the ring marks; rungs: THORP, HAMLET and VILLAGE, the parity presets none; lifecycle: nothing stored, every look re-derived from the committed state and the view at save, load, undo, redo, regenerate and migrate | substitute | T-V7-69, T-V7-60 (h) |

**(b) Combinations** (two units' features meeting at their limits; the rung is a failure ladder's where the outcome is one,
"—" where it is a rule):

| combination | defined outcome | rung | test |
|---|---|---|---|
| a village that grows over a sealed cavern or ruin | each building the epoch adds over the void takes V04 §3.5.7 (d)'s draw (V07 §3.16 (7)); dwellings only after access | — | T-V7-38 |
| a raised way over the palisade | the palisade laid after a raised way, and a raised way created across the standing palisade, meet by §2.7's laws (law 1 (1)–(9), law 2; V07 §3.5a (4)), an aqueduct in the form its level there gives (law 1 (2)); cap: with no lawful crossing (a table edit narrowing every span of an aqueduct whose channel runs above the palisade's top below the palisade's band) VS3 takes F-V-RAISED and a hand stroke is refused, `refuse.raised.meeting` (law 2 (c)) | F-V-RAISED's ladder (V07 §3.13) | T-V7-48 |
| a raised way beside the fair field | the fair field slides clear of the strip and the standing supports | F-V-FAIR's ladder | T-V7-13 |
| a deck plot on a bridge over a moat | none at a village rung: the manor's moat is a yard part, never water a bridge crosses (V07 §3.8) | — | T-V7-60 (i) |
| a retaining wall on a cliff edge | no house platform's wall stands along a cliff bank, a cliff or sheer arc or a cliff inside the district: the cliff face holds the ground and the platform keeps the cliff setback (V07 §3.8a (2)); the palisade's barrier closure treats the cliff as a barrier, never the wall | — | T-V7-47, T-V7-31 |
| an oasis inside the palisade's reach | its shore is a barrier (V07 §3.4 step 5 a); the palisade never fences it | — | T-V7-58 |
| an oasis village with an arid climate cell | the sun terms at the climate cell (0 or toward shade), the water pull carrying the crowding (V07 §3.3) | — | T-V7-58 |
| a dossier removing what an edit pinned | the dossier wins (item 20); the pin lapses by §7.7's lapse rule, reported | leave out and report | T-V7-13 |
| an epoch undone after a save | the undo record in the saved log restores it on load (§2.9, §7.4) | — | T-V7-14 |
| a patched palisade at the hand-off up | the runs keep their condition and material (V07 §3.12 step 1); the town's walls step governs from TOWN | — | T-V7-62 |
| a manor specified at a HAMLET by a dossier | kept with its full design (item 115 (c)); a second manor never generated | — | T-V7-63 |
| a refounded village over a ruined town wall | trackers cross at its gate gaps and breaches (V07 §3.12a (4) (d)) | — | T-V7-59 |
| a village over a buried former city and a well that meets it | the well is an access (V07 §3.16 (3) (ii)); the buried system in maintenance mode | — | T-V7-59, T-V7-38 |
| the zoom-out limit at a village that grows its frame | the limit moves with the bounds (item 116 (d); V07 §5.2) | — | T-V7-64 |
| a Find chip on an end at the hand-off up | the end superseded, the chip kept at count 0; the hand-off down revives the end at its address and the chip lights again (V07 §5.5) | — | T-V7-68 |
| a siege of a village whose palisade closes only by barrier arcs | the closing arcs take no camp; with no walled stretch the siege draws the blockade on the entries' ways (§10.2 (h); V07 §5.6 (2)) | — | T-V7-69 |
| a crisis look over a hand-off epoch | from that epoch the look draws on the places of the rung in force — the town's districts after a hand-off up, V07 §5.6 (3)'s units (its ends, or an end-less thorp's toft groups) after a hand-off down (V07 §5.6 (4)) | — | T-V7-69 |
| a refugee look beside DR18's tent clusters | the look on `campLand`, never on a plot; the clusters stay the model's (V07 §5.6 (2)) | — | T-V7-69 |
| a famine in the harvest weeks | the bare fields drawn over the harvest's crop stage (§8.2's slot 15b) | — | T-V7-69 |
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

**The bench.** `B-VILLAGE`: 200 seeds per village rung × four water settings (none, a stream, a river, a coast) × the seven
forms at their default weights (PR tier: 20 seeds per rung; nightly: the full bench; §13.8's tiers), plus an arid set (item
111), the frozen small-dossier fixtures (the 70 thorps, hamlets and villages and the 5 small towns of the 155 surveyed,
`research/sf/dossier-outputs.md` §3) and the 10-person thorp fixture, plus `B-VG`: 200 seeds per VG request-tag set under the
`VG` preset, each request set mapped onto `VillageRequest` by the request-mapping table (item 495). Each bar is labelled C (a
rule followed), P (parity with a measured VG number) or O (an outcome VG does not reach), as §13 labels them. A class a bar
names in words (the church, the smithy, every watermill) is its `v.` row of V07 §2.4 (J-V7.95). These tests take over the
village rungs' clauses of the base's hook bars (§13.2's take-over row: T13-1, T14-1, T30-4, T65-2, T102-1, T110-7, T111-1 –
T111-5, the village halves of T113-1 and T113-3, and the village clauses of items 114–120's bars and of item 122's T122-5 and
T122-6, each test naming in its head the bars it takes over); every no-op pin registers on V12 §3.7.8's engine — its test
stating that registration in one clause — and reads "off" as V11 §3.24.0's switch table.

| id | bar | class | milestone |
|---|---|---|---|
| T-V7-1 | routing: populations 1, 8, 79, 80, 399, 400 and 1 499 build THORP, THORP, THORP, HAMLET, HAMLET, VILLAGE and VILLAGE; 1 500 builds a TOWN; with the product unregistered a dossier below 1 500 is refused naming the village product, registered it is created | C | V-M1 |
| T-V7-2 | population exact: the households' members sum to `P` on every bench seed; `N_v + N_o = N` and every household is housed once; with a dossier, the residential building count (`N_v + N_o`) lies inside the housing record's range on every fixture; the 10-person thorp (range 4–16) builds 4 households in 4 dwellings; a fixture below `household.minSize` builds the surplus vacant and reports `W_VACANT_TO_RANGE` | C | V-M1, V-M2 |
| T-V7-3 | registration: every input key of every stage in `ProductDecl('village').stages` has exactly one producer in the set (the declaration layer counting as the one producer of `declarations.*` and `raised`, V07 §3.0); no village stage writes a ground part from 1; the order has VS2 and VS3 before VS4 and VS5 before S7, and contains none of S3–S6, S8; on a registration fixture L0 is written only by S1 and VS1 and L1 only by VS1 (the border first), VS4, VS5, S7, S7b and VS6, in that order, none after S9 (the kernel's writer check) | C | V-M1 |
| T-V7-4 | the heart is dry, above the flood line and within its slope limit, or F-V-HEART's rung is reported | C | V-M1 |
| T-V7-5 | density: under `VG` the raster equals the restated formula's reference implementation bit for bit on 100 fixtures; the mean populated area is monotone in `δ` | C | V-M1 |
| T-V7-6 | palisade: every nucleus inside the trace; every gate on a way; no footprint in the band; a dossier wall record gives a palisade on 100 % of fixtures, none without one | C | V-M1, V-M2 |
| T-V7-7 | network: one connected component; every through road reaches its entries; 0 self-intersections; every bridge within ± 10° of the channel normal; through-road length over its grade limit ≤ 5 % outside `VG` | C, O | V-M1 |
| T-V7-8 | the open space lies inside the palisade and clear of water and the mill; its area grows with `√(P ÷ target)` within the scale clamp | C | V-M1 |
| T-V7-9 | every built plot has an access edge on a way and every dwelling's main door faces it (the hidden share 0); every built plot's access edge reaches its main door on the ground, directly or by a `ramp` or `stair` yard part; every drive that crosses a platform wall is a ramp within `rules.grade.track`, or F-V-TERRACE's rung is reported | C | V-M1 |
| T-V7-10 | every watermill stands on a reach with ≥ 1 m of fall and a leat within its limit, else F-V-MILL's outcome is reported | C | V-M2 |
| T-V7-11 | hinterland: arable per head within ± 20 % of its row outside `VG`; ≥ 80 % of meadow below the flood line; great fields within ± 25 % of each other; the furrow axis downslope on ≥ 90 % of furlongs steeper than 2 %; the territory's area per head equals the sum of the farm rows and moves with an `editTable` of one | C, O | V-M2 |
| T-V7-12 | institutions: each V07 §2.4 presence row's rate within ± 5 % of its anchor law at the fixture's population over 1 000 seeds; the church within 200 m of the heart or on the green on ≥ 80 % | C | V-M2 |
| T-V7-13 | dossiers: every small fixture is created; every institution record placed or bound by V07 §3.11's resolution order; every quarter on an end; walls exactly per record; the title word the dossier's; a `burial_ground` or `graveyard` record resolves to one burial face (the churchyard enlarged or its own `cemetery` plot) carrying its binding key; `access_to_external_mill` gives 0 mills and a reported milling import; Wealthy Residential claims the end of highest mean prosperity and biases only its plots, Common Residential claims nothing; the Religious Quarter's east phrase puts the church east of the heart more often than its random baseline (while §7.7 item 16's east row stands; the clause lapses with it, J80 Q5); a `Toll bridge` fixture on a dry `plains` site gets a brook its through road crosses by a bridge, and on `desert` without `oasis_water` its toll house stands at an entry with `toll_bridge_dry` reported (V08 §2.6b (3)); a coastal fixture whose `PortValues.threats` holds `naval` stands its watchtower at the wharf or chief landing and walls none of its water; an `access_to_parish_church` fixture at THORP and at HAMLET has no parish church, no parsonage and no tithe barn of its own (a chapel of ease by its row); a crown fixture and a merchant-oligarchy fixture each stand their `villageSeat` class; an `ecclesiastical` hamlet fixture with `Access to parish church` stands its `v.parsonage` with no parish church and no F-SITING report; a `fish_market` fixture puts the market on the open space and its hall's plot on the space's rim — the hall within 60 m of the market, no toft slot taken, the open ground left no smaller than the unhalled size; a port fixture with `Docks and port facilities` stands its harbour master within 60 m of the wharf's quay; an `annual_fair` fixture lays one secondary `market` reservation of `market.fairHa` outside the perimeter at the through road's crossing nearest the heart, claimed as common, with 0 pins on it, or reports F-V-FAIR's rung; a `monastery_or_friary` fixture seats its cloister on joined slots of `claimArea.cloister`'s area at its band; a `town_watch` fixture's `v.watchtower` lies nearer the green than its random baseline; a crown, a seigneurial, an ecclesiastical and a chartered-commune fixture at VILLAGE place no `palace`, `castle`, `cathedral`, `courthouse` or `guildhall` of the government row's and no `v.watchtower` beyond its presence row, each standing its `villageSeat` class; a coastal `slave_market` fixture seats its slave market on joined slots with no claim on the open space, its site nearer the wharf or an entry than its random baseline; a thorp fixture with a `Wayside shrine` record and no Roadside Shrine quarter stands exactly one `shrine` pin bound to that record, on every seed; a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record to a `cross` pin inside the church's `churchyard` part, nearest its door, with no shrine pin at the settlement edge bound to it; a `Water source` thorp fixture binds its record to a well pin. **Its village-history clause** (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): an `annual_fair` record arriving at an epoch lays its fair field outside the perimeter on `commons` faces, never inside the district, still extramural after an (8v) extension and standing as a secondary market after the hand-off up; a `fish_market` record arriving at an epoch cuts its hall's claim from the rim with the open space not grown and the encroached share within `epoch.encroachShareMax`, else its reported rung; a `monastery_or_friary` record arriving at an epoch opens on joined plots of `claimArea.cloister`'s area or an outside plot, else its reported rung; every record the port adds at a village epoch is placed or bound in that epoch's `dossier` step — by `village.records` for the market, claim-sized and pin records, by the base's placement for the rest — with 0 records left unplaced at the `epoch` event's check; the `fish_market` record's hall stands **built with its use open** (`openUse`, cause `dossier`) in the epoch the record arrives, its plot the rim claim or joined plots, and a `monastery_or_friary` record's cloister likewise, its outside plot cut from a hinterland face whose remnant keeps its land use; a roster `fair_ground` member with no standing field — the fixture's field held on the green at creation by F-V-FAIR's last rung — is laid by step (m) at the first epoch whose perimeter crossings offer a dry face, outside the perimeter on `commons` faces, each face gone from its `VillageField`'s `furlongs` in that batch; a `Wayside shrine` record added at an epoch stands its bound `shrine` pin at that epoch; an `annual_fair` record removed at a later epoch leaves its reservation tombstoned in that epoch and its faces `commons`, and a `Wayside shrine` record removed leaves its forced pin tombstoned, while one whose record had bound a chance shrine leaves that pin standing, unbound; a `weekly_market` record removed below the law's crossing clears the principal market rank in that batch, 0 stalls at the next village epoch and `dist.market` measured to the first nucleus's open space, and one removed above it keeps the market by the law, its stalls at count; a `Wayside shrine` hamlet fixture whose record is promoted to `Parish church` at a village epoch stands its church bound to the record's key and one churchyard `cross` laid for the record with no binding row, the roadside shrine standing unbound, a hamlet fixture whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt binds the shrine's key to the churchyard `cross`, the church bound to its own key, and a `fish_market` record added at an epoch beside a standing fishmonger stands its hall on the market's rim with the fishmonger's shop keeping its use; and, at V-M2, an `annual_fair` and a `fish_market` record absorbed without an epoch lay the fair field and the built, open hall in that absorb's commit — the hall standing finished, with no Works — and S10b's `dossier` request receives neither (J-V7.128); two `fish_market` records absorbed in two weeks between the same pair of epochs stand two halls with two distinct use addresses, each minted from its own dossier event's `seq`, and a record carried by an epoch mints the addresses and draws the values the same dossier event mints and draws folded standalone at that `seq` (J-V7.129); the `Wayside shrine` promotion to `Parish church` absorbed without an epoch stands the church on the record's key and its churchyard `cross` with no binding row in that absorb's commit | C, O | V-M2 (its village-history clause at V-M3) |
| T-V7-14 | the hand-off up: a fixture village grown past the band over epochs keeps every surviving entity byte-identical, retypes its district `central` keeping `village-ways`, turns its green into the market (its `Greenery` a `market_green` part) when the town has none, and grows the town's first stage from its perimeter; a re-derivation of the old core after the hand-off runs the village fabric on its recorded inputs, the participants registered with stage `VS1` (`village.plan`) and `VS2` (`village.density`), T-V11-1 (b) recording their reads of `village.json` under those two ids and never under a participant id; a target alternating 1 480 / 1 520 changes the product 0 times and one alternating 1 400 / 1 600 at every epoch; no catacomb exists before the first TOWN epoch; after it at most one, sourced at a burial face, 0 sourced at a church; a drawn crypt stays with its church, unchanged by the crossing, joining only by the crypt-join draw; the churchyard's age at the crossing equals its creation age plus the logged years; an epoch undone after a save restores on load; one document | C | V-M3 |
| T-V7-15 | the hand-off down: a TOWN fixture falling below the band creates a `VillagePlan` (a former village revives its one plan at the same address, its declared fields kept), re-cuts no district and runs the village phases at later epochs; a second crossing up and down leaves one plan record | C | V-M3 |
| T-V7-16 | desertion: a target of 0 vacates every dwelling but a locked or pinned one, which keeps its state — with 0 households under a dossier fall, with its last household under any other (V06 §3.5.1 (5)); after ten epochs the church stands on ≥ 60 % of seeds and the hollow ways persist; the replay reproduces the history | C, O | V-M3 |
| T-V7-17 | locality: a block's re-race changes nothing outside the block; a density stroke changes only its blocks; a field-system switch — `forest_strip` included, its strips starting at the crofts' rear lines — changes nothing inside the perimeter (the oracle of §7.3) | C | V-M3 |
| T-V7-18 | determinism: digests identical across the five engines of §13.3 on 100 seeds per rung; removing one branch (a density stroke that suppresses it) leaves every draw of every other tracker identical and changes the geometry only of the trackers in its computed influence set — those that merge onto, or test junctions within `branchSpacingM` of, the removed branch's ways — asserted on 100 fixtures; a stage with no draws consumes no stream index | C | V-M1 |
| T-V7-19 | item 102 at village rungs (T102-1's village clause): with `sunTerm` and `woodShade` at 0 the output equals the build without them byte for byte; at their defaults the dwellings' mean daylight share exceeds the density box's and the woods' mean share is below the arable's, across the bench | C, O | V-M2 |
| T-V7-20 | item 103 at village rungs (the statistics suite, village rows): the smithy's distance to the through road and the church's to the heart below their random baselines; the tannery downstream in ≥ 70 % of river villages that hold one | O | V-M2 |
| T-V7-21 | item 104 at village rungs: the custom fixtures (a category only; tags; an archetype; an active chain) resolve, site and report; a chain's nodes closer than a random baseline; the flow order holds; a `mercantile-market` custom record at VILLAGE binds a `market_cross` pin at the centre of the reservation carrying the market (the open space, else the flanking square), in place of the drawn centrepiece, and a `sacred-shrine` custom record binds a `shrine` pin at the perimeter on a road | C, O | V-M2 |
| T-V7-22 | editing: each V07 §4.1 row's event is identical from the canvas, the tool API and the skeleton file; a declared heart, green, end and walked road survive Regenerate (keep); a lassoed end holds exactly the plots inside its lasso and survives the merge and the cap however few its plots; the dry runs of `declareEnd`, `drawGreen` and the density brush return the count badge; an unlawful form edit under `forest_strip` is bent to `open_field` with its note; a zero-length stroke or zero-area lasso is refused by its dry run as a shape, never logged | C | V-M3 |
| T-V7-23 | parity with VG (`B-VG`, under `VG`): dwellings per village in VG's recorded range per tag set; the accepted-frontage share (`vg.acceptedShare`) in VG's measured 63–82 %; the square's rim radius, the trail and approach counts, bridges per river map, the palisade rate on dry maps (0.2, 0.3 when dense) and the road-topology shares, the orchard share and the wood cover per map each within the band rule of §13.5 against `baselines.json`'s VG rows; the arena's frame VG's view at `rules.vg.frameM` for the matched size plus `rules.vg.marginM` on each side (the base's `Frame.marginShare`, §3.2 (9)) | P | V-M4 |
| T-V7-24 | performance: V07 §6's laws and bars on `B-VILLAGE`; `R_s` recomputed from `village.json` at each rung target lies within 5 % of V07 §3.2 (6)'s figures (≈ 100, 245 and 480 m) and the density box's cell count within 10 % of V07 §3.3's; `village.density` at a base-product epoch within its bound (V07 §6) | C | V-M1 (the epoch clause at V-M3) |
| T-V7-25 | renders: B-ZOOM's role continuity across every band switch of `painterly` and `ink` at village rungs, the programs `roof.faces`, `roof.palette`, `roof.ruin`, `way.edgeFade`, `bridge.shadow`, `crown.bands`, `crown.groupShade`, `spotlight.focus` and `spotlight.size` in its role list | C | V-M3 |
| T-V7-26 | labels: no end label over the church, a gate or a well; the title plate never over the heart | C | V-M3 |
| T-V7-27 | exports: the GeoJSON village layers validate (with `hollow_ways`, `house_platforms`, `landmark_parts`, a strip's `holder`, a declared end's flag, a reached close's flag); `VillagePlan`, `VillageEnd` and `VillageField` round-trip through `.plat` byte-identical | C | V-M3 |
| T-V7-28 | robustness: 10 000 seeds per rung — 0 whole-map retries, 0 crashes, 0 tier-6 omissions of a requested feature; every F-V rung counted in the report | C, O | V-M1 |
| T-V7-29 | the owner's side-by-side against VG (§13.6's D-5 protocol, twenty pairs over VG's tag sets, the `VG` preset beside VG and the default beside VG) — rated, or the owner's acceptance recorded; unrated, the milestone is *provisional — not rated* | O | V-M4 |
| T-V7-30 | desertion traces: after a desertion fixture every hollow way is a way of a land class on ground part 0 in the `abandoned` existence with its disuse epoch and every house platform a dwelling in the `cleared` existence; 0 hollow ways on a deck, a ford or a raised part (T-V7-50); every retirement is a `retireWay` op (a primary included), struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight `E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), and every effacement an `effaceWay`, while 0 `downgradeWay` lowers a primary at any rung; both render in every family, export in their GeoJSON layers, round-trip through `.plat`, and regrowth rebuilds on the platforms and reopens the hollow ways first | C | V-M3 |
| T-V7-31 | the barrier closure (item 106 at village kinds): a river-bend fixture is fenced across its neck only and its enclosure is sealed; a scarp-backed fixture has 0 walled edges along its sheer arcs; no walled edge lies within `palisade.bandM` of any shore; 100 % of landings and wharves are reached from the heart without crossing a walled stretch; every walled stretch's ends anchor on a barrier, or F-V-ANCHOR's rung is reported; the reached ground holds only commons-owned closes typed by S12b, no dwelling, and is excluded from S10a's quotas and VS6's capacity; under `VG` the palisade is byte-identical to the build with the closure off | C | V-M1 |
| T-V7-32 | the palisade's REPLACEMENT: with ≥ `ladders.replaceShare` (80 %) of dwellings inside, a town-wall promotion keeps the trace's vertices (save where a raised way crosses it: §2.7's laws, law 2 (a); T-V7-48) and gates, retypes the kind to stone and stands every run robust; below it, a new ring anchors on the barriers and the palisade, and the palisade is superseded; one document | C | V-M3 |
| T-V7-33 | the supply web at village rungs: every good of V07 §2.4's supply rows is an id of V11 §3.7.1 and every provider class produces the good it provides (T-V11-3 and T-V11-28 pass over the village rows); with its weights at 0 the output is byte-identical (item 105 (k)'s no-op pin — the `item105.web` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat); the district term changes nothing (one district); every dwelling's toft is identical with the web on and off; across the bench the bakehouse and the alehouse lie nearer the open space, the smithy nearer a through-road entry or the crossroads, and the charcoal pit and the wood yard nearer the wood edge than their random baselines; with two mills each consumer binds to the nearer | C, O | V-M2 |
| T-V7-34 | balance at village rungs: with `comfortM` and the spacing at 0 the output equals items 103 and 105 alone byte for byte; the nearest-alehouse distance between alehouses exceeds its random baseline; every end of ≥ 40 households lies within 400 m walk of an alehouse on ≥ 80 % of VILLAGE seeds; no end is named for a trade without a dossier claim, a declaration or item 72's threshold (0 on the bench) | C, O | V-M2 |
| T-V7-35 | ladders at village rungs: on the small-town fixtures every COUNT (save `multiple_water_sources`, a floor), QUARTER and GUILD record shows members inside its range, non-decreasing across a population sweep from 900 to 1 499; a `Blacksmiths` record's smithies spaced by the row's `K spread 200`; a craft- or merchant-guild COUNT record stands that many `guildhall` members, a GUILD record of that COUNT's `categories` family adds no hall beside them (its hall one of the COUNT's members), and one of another family keeps its own hall (V08 §3.5.1 (c)); a `multiple_water_sources` record's wells number at least the range's low end and the coverage count; a `Wayside shrine` beside a `Parish church` record leaves no edge shrine and one churchyard cross bound to it; a lesser record beside its greater adds no building; a SIZE record is one building; a promotion whose greater's thing is the lesser's (V08 §3.5.1 (c)'s first case) keeps member #1 byte-identical, and one to a REPLACEMENT greater of a new thing places the greater new and leaves the lesser's former thing byte-identical and unbound; a demotion keeps the member nearest its demand | C | V-M2, V-M3 |
| T-V7-36 | chains and the entry store: every dossier chain whose members stand on the map becomes links on 100 % of fixtures with chains; a chain with an absent processor binds nothing, adds no building and is reported; an `entrepot` chain's store stands at the entry facing its partner (the inn, else the landing, else a farmstead) on 100 % | C | V-M2 |
| T-V7-37 | splits at village rungs: 0 split pairs below 900 people across the bench and 0 under `VG`; above 900, pairs only where item 105 (h)'s threshold fires; an author's `branchOf` assignment makes one, held through Regenerate (keep) and removed by its inverse; a town shrinking into a village keeps its standing pairs | C | V-M3 |
| T-V7-38 | caverns and ruins at every village rung: across the bench (with a mountainous-relief set and a dossier-ruin set) caverns and ruins occur at THORP, HAMLET and VILLAGE at their rows' rates within ± 3 s.e.; cavern frequency higher with mining than without per relief class; a dossier `ancient_ruins` fixture gets a ruin with its marker linked, or a reported reason; with the ruin chance 0 and the base's relief, boost and fissure rows the village is byte-identical to the build without these kinds (a `NoOpPin` — the `item109.underground` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2u seat); the village rungs' levels of item 109's presence and access bars join at V-M4, `notApplicable` before, never `insufficient` (V12) | C | V-M2u |
| T-V7-39 | access grows with the village: across a growth sweep from 40 to 1 499 people over one fixed void, the accessible share rises monotonically with the buildings over it; a 40-person thorp over a void is sealed on ≥ 60 % of seeds; a mining working with a gallery within `breachM` at its depth gives a `mineBreach` access on 100 %; a dug passage crossing a sealed void makes it accessible, transitively through its links | C, O | V-M2u |
| T-V7-40 | dwellings only after access: 0 dwellings in a void without an access; every `AccessPoint` carries its `cause`; 0 undercity at any village rung; 0 catacomb, quarry, vaults or buried systems created at a village rung save the charnel vault of a dossier catacomb fact and a replay's buried former settlement (V07 §3.12a (2)) | C | V-M2u |
| T-V7-41 | smooth scaling: across a population sweep from 60 to 1 499 in steps of 10, every presence rate and every count is monotone non-decreasing within its tolerance and no rate changes by more than 0.1 between adjacent steps — the grandeur ceiling's rung step (V07 §3.8) excepted and asserted by T-V7-63; at 40, 200 and 700 people every cell equals its rung column | C | V-M1 |
| T-V7-42 | the resolution order: every catalogue kind of tiers T, H, V and W — the count read from `dossier.catalogue`'s manifest, never written into the bar (176 at the pinned line: 97 kinds of tiers T, H and V and 85 of W, six in both) — resolves at the three village rungs to exactly one of pseudo-reader, village class (a `v.` key), own class or fallback; no pseudo-class builds a building (an `@absent:` kind zeroes its classes' demand through their village forms, asserted at THORP and HAMLET for `@absent:church`); the fallback is reached only through `unmapped_kind` and is reported; the compile refuses an unprefixed village row and a `villageForm` naming a non-`v.` key (V11's T-V11-3 clause); every class a kind of tiers T, H, V or W plays itself at a village rung has a finite plot area at THORP, HAMLET and VILLAGE (a compile check: a template family whose plot is "the claim's" reads `rules.claimArea`, V07 §2.2a) | C | V-M2 |
| T-V7-43 | the hand-off down's underground: a TOWN fixture with sewers and a catacomb shrinks into a village over epochs; every tunnel record survives; the catacomb's extent is non-decreasing (never below `extentFloorM2`), its state `stagnant` with `'rung'` in `blockedBy`, its `fill` non-decreasing, its `source` a burial face; after the parish's desertion the reason is `'sourceClosed'` and the complex stays; a fixture town with a cathedral keeps the cathedral and its crypt at every village epoch; a later rise past the band resumes the catacomb's growth | C | V-M3 |
| T-V7-44 | rules are data: a scan of V07 §1 and V07 §3 finds no numeric rule constant that is not a `village.json` cell (V07 §2.2, V07 §2.2a), a class row of V07 §2.4 or a cited base, V04 or V11 cell (every reference cell of V07 §2.2a resolving to an existing cell of its unit, and no `village.json` cell copying a value it could reference) — unit words, section pointers and the restated reference constructions' literals excepted by an allow list keyed to row D5 (V07 §2.2a's reference trace), and implementation parameters that change no output (a spatial index's cell size); the item-110 constants of V07 §3.5a, V07 §3.8a and V07 §3.10a included in the scan; `epoch.rows.persistence`'s church keys equal V11 §3.5.1's `church-family` members; the table compile refuses a switch or mode cell of `village.json` marked calibratable (`terrace.enabled`, the `vg.*` switches and `vg.forestMode`, `plate.qualifier`, the `epoch.rows` op, class-list and order cells), and a reference cell so marked, as T-V11-37 refuses V11's | C | V-M1 |
| T-V7-45 | crypts and burial faces: over every parish church built across the village bench, the crypt share lies within the binomial band of 0.1; 0 chapels carry a crypt or a churchyard part; below TOWN 0 catacomb complexes and 0 gallery systems sourced at a burial face; every dossier-bound `graveyard` or `burial_ground` record resolves to exactly one burial face, a churchyard it enlarges holding at least V11's `burial-ground` plot area at its band; a dossier crypt fact gives its church a crypt on 100 %; a church's crypt state is identical before and after a rung change; a `parish_burial_grounds` record binds one member per standing parish church's churchyard, enlarges none, and places a `cemetery` plot only where no church stands | C | V-M2 |
| T-V7-46 | no generation below TOWN (item 110 (b)): across `B-VILLAGE` with a ravine-and-valley set (a dry gorge across a neighbour bearing, mountainous relief), 0 raised parts created by generation, by any router call a village stage makes or by a village epoch at THORP, HAMLET and VILLAGE; with item 110 (b)'s rows on, the output is byte-identical to rows off when no declaration is held; the rung gate is no `village.json` cell (an `editTable` on it is refused) | C | V-M1 |
| T-V7-47 | levelling (V07 §3.8a): on a flat fixture (every platform below `terrace.slopeMin`) 0 retaining walls; on the hilly and mountainous sets, walls only on house-platform edges whose step exceeds `terrace.stepMinCm`; 0 walls on a croft, close, reached ground, green, churchyard, under-deck strip, hinterland face or the district's perimeter; on a cliff-edge village fixture 0 walls on a cliff bank segment, a `cliff` or `sheer` arc or a cliff inside the district, every platform there keeping the shore setback's `cliff` distance from it (V07 §3.8a (2)); the longhouse's byre end downslope on ≥ 95 % where the ground falls > 3 %; every plot's access reaches its door on the ground, by a ramp or by a stair, and every drive crossing a wall is a ramp within grade or F-V-TERRACE is reported; a re-derivation of one plot changes no other plot's walls but a shared one | C, O | V-M1 |
| T-V7-48 | a raised way on a village map (a declared viaduct and aqueduct, and one carried down from a CITY fixture): 0 junctions between VS4's ways and a raised part except its two feet; 0 VS4 ways on a ramp, a stair or a `vault` span's under-deck strip (but one §2.7's laws read `open`, law 1 (8); its way-and-channel table) or along the strip, each VS4 way crossing a span under an `open` span within §4.3's clear width, clearance and `squareDeg` (the declared viaduct crossing the populated area with a `vault` span and an `open` span whose soffit is below §2.7's *The clearance* for a `road`), and, with both those spans `ruined`, then `cleared`, by `DeclineOp`'s `breach` and `dismantle` as the state sweep scripts them (§13.2), the next derivation's VS4 ways crossing each by the same rule whatever its `state` — none over the `cleared` `vault` span's strip (its arch vault `collapsed`, V04 §3.5.4 (d) (2)), the `cleared` `open` span's crossed only within that clear width, clearance and `squareDeg`, never along the strip (V07 §3.5a (3)); 0 toft yard parts or buildings in the under-deck strip; 0 hinterland faces over a standing support (a support whose `state` is absent or `ruined` is a hole); the palisade's band laid through each support of the declared viaduct standing in it, no gap in the line, its line — planned across a standing support of the declared aqueduct whose channel there runs above the palisade's top — bent locally to cross under the nearest span clearing that top (§2.7's laws, law 1 (2), law 2 (a), law 3) and bent to pass beyond each ramp's foot, no ramp, stair or foot in it, each crossing of the palisade's line with a deck line reported `W_RAISED_CROSSING` once (§2.7's laws, law 4; its worked example row W1), and no arch vault in a `vault` span under it (on a declared viaduct with a `vault` span in the planned palisade's band); 0 gates in an under-deck strip but under an aqueduct's arch clearing the palisade and the gate (§2.7's laws, law 1 (5)), and 0 on a deck; 0 palisade runs above a road deck's standing span's soffit, at a span or at a support bearing it, and the palisade at its own top beneath the declared aqueduct (§2.7's laws, law 1 (7)); a hand aqueduct drawn across the standing palisade crossing it in the form its level there gives (§2.7's laws, law 1 (2)): over — its supports off the band and a span over it clearing the palisade's top — where its channel runs above that top, and, on a variant whose palisade is the stone `inner` circuit and whose aqueduct is drawn with its channel within the circuit's height, merged, the circuit built up round its arch or pier at its own top, no gate in it, nothing of either record written; a hand raised road drawn across the standing palisade brought down before it, with `bend.raised.wall`; the carried-down raised way meeting the palisade as it met its CITY fixture's innermost ring (its aqueduct created across that ring in the form its level there gives, §2.7's laws, law 1 (2)); a palisade stretch T3 `wall` draws across it at a standing support, its channel there above the palisade's top, bent locally to cross under its nearest span clearing that top (§2.7's laws, law 1 (2), law 2 (a), law 3; its worked example the bent-group sentence), with `bend.wall.raisedCrossing`, and a hand `placeGate` whose `at` lies in its under-deck strip where §2.7's laws bar a gate (law 1 (5): the span over `at` not clearing the gate) moved along the palisade to the nearest lawful point (law 2 (a), law 3; its worked example row W13), the stub with it; after a support is `cleared` the band stands whole across its footprint and the next derivation makes no obstacle or hole at it; a village Regenerate of the carried-down fixture (the palisade re-laid as before); a V07 §3.4 (8) decay, a hand `convert` `breach` and `dismantle`, a `repairWall` and a hand `delete` of the palisade's run beneath the carried-down deck — each an *unchanged meeting* (§2.7's laws, law 4), the deck unchanged; a hand `convert` `gateToJunction` of a palisade gate, and `wallToWay` and `absorbWall` of the palisade beneath it — the gate opened as any (§2.7's laws, law 4; its worked example row W6), the ring road by §2.7's way-and-channel table (row c), the absorbed palisade's runs dismantled in time as any; and its CITY fixture's aqueduct sourced beyond the frame, its deck extended by a frame growth before the hand-off down, carried down and meeting the palisade as a standing raised way does; that CITY fixture handed down over the state sweep (§13.2; §2.7's laws, law 4; its worked example row W9), each state made before the hand-off — the hand-off writing nothing of the raised way or the ring's runs, and the palisade read by §2.7's laws at that state (law 1 (2)–(9); its worked example *beneath*: its run at its own top beneath each fallen span, no chamber under the `vault` span, the band whole across a cleared support's footprint); VS3's later re-lay of the palisade on that fixture over the state sweep — the palisade by §2.7's laws at each state (law 1 (2)–(9); its worked examples *beneath* and row W1 at a village); the palisade's REPLACEMENT under the declared aqueduct, rebuilt in stone on its trace (V07 §3.11) — crossing the aqueduct in the form its level gives against the stone wall's new top (§2.7's laws, law 1 (2)), re-traced locally where its new band would cross in neither form (law 2 (a), law 3; its worked examples the bent-group sentence and row W14); and, on a variant whose palisade gate stands under the declared aqueduct's arch, the arch clearing the palisade and the gate but not the stone wall's top, the REPLACEMENT waiting (`walls.waited`), the palisade, its gate and the aqueduct unchanged (§2.7's laws, law 1 (5), law 2 (c)); and, on a variant whose declared aqueduct's channel runs above the palisade's top all along and whose `raisedWays.structure.pierSpacingM` band a table edit narrows so that no span of it admits the palisade's band, F-V-RAISED's ladder — the ring re-laid once round the aqueduct, else the palisade omitted, reported `W_RAISED_MEETING` (V07 §3.13; §2.7's laws, law 2 (c)); VS3's palisade on a river village whose shore anchor falls in the declared viaduct's fixed-place zone — the anchor moved along the shore clear of it with its end post (§2.7's laws, law 1 (6), law 2 (a); its worked example the fixed-place sentence); and the REPLACEMENT under a carried-down raised way, over the state sweep (§2.7's laws, law 4; its worked example row W14 at a village, its C9 cell); `N_v` exact before and after the add; after Regenerate (keep) the feet re-join within `raised.endSnapM` or `W_RAMP_STUB` / `W_RAMP_UNJOINED` is reported; the add's dry run shows the count badge; every span over a hinterland face open (the span rule's `country`); an unbroken aqueduct's delivery point counts as a well (no well within 120 m), and after a span is ruined or cleared a well is sited at the next derivation; 0 ends anchored on a raised way | C | V-M3 (its carried-down clauses and state-sweep runs as V07 §8's V-M3 exit states) |
| T-V7-49 | deck plots (V07 §3.10a): every deck plot inside its deck's width and budget, and no deck face buildable below V11's `minPlotDepthM` for its kind; 0 dwellings on a deck generated at village rungs; `N_v` and every toft byte-identical with the deck rows on and off; the pier head's rate within ± 3 s.e. of `deck.headChance` at the fixture's population over 1 000 seeds with a landing; each deck plot falls with its deck and is re-offered when the deck is rebuilt; every deck plot inside the village district or the hinterland pseudo-district | C | V-M3 |
| T-V7-50 | decline: 0 hollow ways on a deck, a ford or a raised part; on a hilly desertion fixture every generated wall persists as a decaying scarp beside its platform, none removed by a re-derivation after its dwelling is cleared; regrowth rebuilds on the platforms first and repairs their walls at the datum | C | V-M3 |
| T-V7-51 | hand-offs: a CITY fixture with a generated aqueduct and a viaduct falls to VILLAGE, and both stand, with their supports and reasons, at every village epoch, declining only by stretch; 0 raised ways created at a TOWN or village-rung epoch; a removed generated way stays removed through the fall, the village epochs and a rise back to CITY; a village's declared raised way crosses the hand-off up held; the old core keeps the house-platform rule at TOWN; a shrunk town's deck plots keep their dwellings | C | V-M3 |
| T-V7-52 | no-op pins (item 110 (f); T110-7's village clause): with every `deck.offer` 0 and `terrace.enabled` false (V11 §3.24.0's switch table) and no raised way declared, `B-VILLAGE` is byte-identical to the pre-110 build; under `VG`, byte-identical to the pre-110 `VG` preset; the suite registers on V12 §3.7.8's engine with its `terrace.enabled` switch, its switch-on shifts following V12 §3.7.6's four bumps | C | V-M1 |
| T-V7-53 | renders: B-ZOOM's role continuity for §8.2's item-110 roles (the retaining wall, the raised way with its piers and channel, the stair and ramp intervals, the tier roles) drawn by the painterly programs (`retaining.wall`, `way.stair`, `way.ramp`, `raised.deck`, `raised.support`, `raised.ruin`, `aqueduct.channel`) and by `ink` at village rungs; every retaining wall draws its low-side shadow and every raised deck its shadow on the surface beneath | C | V-M3 |
| T-V7-54 | editing: each item-110 row of V07 §4.1 (the terrace stroke, `retaining`, `raised` and the aqueduct class, a deck face, the removal) gives the same event from the canvas, the tool API and the skeleton file; a drawn wall, a declared raised way and a placed deck plot survive Regenerate (keep); `walk` with `raised` is bent to the points form with its note; each dry run returns the count badge | C | V-M3 |
| T-V7-55 | performance: the platform levelling ≤ 1 ms at the VILLAGE top; VS4 with a declared raised way within its 4.5 ms; the item-110 edit budgets of V07 §6 | C | V-M3 |
| T-V7-56 | the village rows compile: V11's compile checks T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 pass over every `v.` row of V07 §2.4 (V11's T-V11-0 run over them); every row names one family of V11 §3.4, one template family of V11 §3.6.1 whose template compiles for every band, a `deckOk` list, a `distribution` of the base's enum and a significance; every presence entry names only `PresenceWhen` conditions and a `PLaw`, and the class order has no cycle; every authored row's `to` is a class id, a `#tag` or a feature class of V11 §3.3.3; every supply cell compiles to a `SupplyEdge` whose good is a V11 §3.7.1 id; with a dossier government, its `villageSeat` class stands with at least one member at THORP, HAMLET and VILLAGE on 100 % of fixtures; every `v.` row carries a `label` (T-V11-4's display-cell check), the 25 labels distinct, and each row's `commonness`, compiled by V11 at step 5a, equals its roster share at VILLAGE recomputed from the compiled rows within 0.01 (J-V7.133) | C | V-M2 |
| T-V7-57 | the village's furniture (J-V7.118): across `B-VILLAGE` and the dossier fixtures at every village rung, 0 `statue`, `fountain`, `bandstand` and `monument` pins; every pin placed by a VS8 row (its row recorded in the pin's provenance), 0 by S11's furniture step (its trace); each open space carries at most one centrepiece and, where it carries the market, exactly VS8's stall count (V07 §3.10); 0 pins on a fair field; on the village-history fixture at every village epoch (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): every housed household served by a well, pump or aqueduct delivery point within `pins.wellWithinM` under the coverage row's capacity, every market (a street market included) at VS8's stall count for the epoch's households and a closed market with 0 stalls, a new nucleus's open space with its centrepiece, 0 standing pins moved and 0 removed whose host stands — save step 2's stalls (the surplus as households fall, and a closed market's), an engine-placed centrepiece no one holds that a market cross replaced and a forced pin whose record the dossier removed — every pin whose host face an epoch tombstoned gone in that epoch (step 0), every housed household served after an epoch that took a well with its host or broke an aqueduct's delivery point, a `Roadside Shrine` quarter added at an epoch anchored on a shrine in that epoch and one added by an absorb anchored at the next village epoch, each new host's row pin (a cross, trough, maypole or centrepiece) the one a regeneration of the grown village places on that host; after the hand-off up the green made the market carries its stalls; after the hand-off down a shrunk town's standing statues, fountains and bandstands stand unchanged and no new one appears | C | V-M1 (the fair-field clause at V-M2; the village-history clause at V-M3) |
| T-V7-58 | item 111 at village rungs (T111-1 – T111-5's village clauses): on the arid set the share of households within `pins.wellWithinM` of water exceeds the non-arid baseline; an oasis stands only on an arid site unless drawn (T2 `ground`) or given by `oasis_water`; arid sites still draw rivers, ponds and coasts at the arid row's re-weighted shares (a rate `StatBarSpec` per water kind); the richest band's mean distance to reliable water below the middle band's on arid seeds; the density's `wp` term leans the dwellings toward reliable water on arid seeds (their mean `pw` above the box's); an oasis village's heart, `site water` test and wells read the oasis as water, its spring never a well access, its shore a barrier the palisade never fences; with the oasis chance, `w_water` and the climate cell at their neutral values the output is byte-identical to the build before item 111 (a `NoOpPin` — the `item111.water` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M1 seat) | C, O | V-M1 (the dossier clause at V-M2) |
| T-V7-59 | item 113 at village rungs (the village halves of T113-1 and T113-3, and T114-9's village clause; run on V06's replay engine): a CITY-to-VILLAGE history fixture shows walls and street lines beyond the village's fabric, hollow ways on the old streets, an oversized church and a kept market square, with a `VillagePlan` created at the replay's hand-off down epoch and the dossier's present population and institutions matched exactly; a symbolic-peak fixture (a village with a ruined "City walls and gates" record) sizes its remnants inside CITY's range at `history.symbolicQuantile`, each remnant fact `symbolic`, and a fixture with no evidence has no peak; a refounded-village fixture over a ruined town reuses the old roads (the share of new way length within `refound.traceReachM` of a ruined way trace above the same site's unrefounded baseline), rebuilds its ruined bridges where its trackers cross, crosses the ruined wall only at gate gaps and breaches save a through road's cut (the run set `dismantled` over its width, V07 §3.12a (4) (d)), with 0 violations of §5.3's wall-crossing row (T114-9), and races slots over ruined footprints above their random baseline; a former city buried past `history.burialYears` lies under the village as V04's buried former settlement in maintenance mode, a former hamlet's refounding lays none; the replay is byte-stable per seed and history on the five engines; with the replay off the output is byte-identical (a `NoOpPin` — the `item113.history` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat) | C, O | V-M3 (with M6-E) |
| T-V7-60 | the edge suite (V07 §3.17): each clause runs its V07 §3.17 rows on their edge fixtures at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo, redo, regenerate and migrate — each case ending in its row's defined outcome and reported rung, with 0 crashes, 0 hangs, 0 lost records, 0 whole-map retries and 0 silent changes (every changed output named in the report). The clauses: **(a)** the records, the request block and the pipeline; **(b)** S0, VS1 and VS2; **(c)** VS3, VS4 and the raised way; **(d)** the open space, VS5, VS6 and levelling; **(e)** the hinterland, the wharf, ends and pins, and deck plots; **(f)** the dossier readings, the epochs and hand-offs, and the failure ladders; **(g)** the underground; **(h)** editing, the clerk, rendering, labels and exports, Find and the crisis looks; **(i)** every combination row of V07 §3.17 (b). (Determinism's row is T-V7-18's, the one-time waits' T-V7-67's.) | C | (a), (b), (d) at V-M1, (a)'s landmark-part clause at V-M2; (c) at V-M1, its raised-way row at V-M3; (e) at V-M2, its deck-plot row at V-M3; (f) at V-M2, its epoch and hand-off row at V-M3; (g) at V-M2u; (h) at V-M3; (i) each row at the later milestone of the two mechanisms it joins |
| T-V7-61 | the village `WhyProvider` (item 270's completeness test over V10 §3.9's owed kinds for V07): a `why` on every `VillagePlan`, `VillageField` and `VillageEnd` of the bench answers in both modes with at least one row whose key resolves in V09 §4.9's catalogue (`info.village.*`, V07 §4.5); the heart's terms recomputed equal VS1's recorded score; a `dossier`-sourced form and an `edit`-sourced heart answer with their sources; a superseded plan answers with its superseded line; the provider reads committed records only (a pending proposal changes no answer) | C | V-M3 |
| T-V7-62 | item 114 at village rungs (item 114 (g)'s village clauses; takes T114-1 – T114-8's village clauses): a poor, threatened palisade fixture shows patched runs in its kind's `walls.patchMaterials` rows (V11 §3.25.3), each drawn by its row's `look` role, and no robust rebuild; a rich, threatened one rebuilds its breached runs robust; a safe one wears through `worn` to `breached`; recovery replaces patches oldest first; no run changes condition without a sustained driver (no flicker across two epochs at a threshold); every state distinguishable in greyscale at its bands; a dossier village's generation-time conditions follow its readiness and wealth by §7.7's DR41; `VG` draws every run standing; with need and means at neutral values the existing neglect and repair behaviour is reproduced (a `NoOpPin` — the `item114.condition` registration of the palisade goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat); a patched run exports as a wall and a breached one as an opening; `repairWall` with a material is undone by its inverse | C, O | V-M2 (generation), V-M3 (epochs, with M6-E) |
| T-V7-63 | item 115 at village rungs (item 115 (f)'s village clauses; takes T115-1 – T115-4's village clauses): rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum have no `H`, `U`, court, tower or turret dwelling but the manor; at most one manor, only with a lord or when specified (V08 §3.16 (3); none at THORP and HAMLET otherwise); a dossier-specified grand building — a manor record, and at a HAMLET a `castle` or `tower_house` record, a town class playing itself (V07 §3.11 step 3) — and a hand-placed manor keep their design, the clerk noting the excess; a village grown into a town builds its new grand buildings from that epoch, a shrunk town keeps its grand buildings as they stand; the manor count never rises with wealth (a wealth sweep at a fixed population and government leaves it unchanged); with every `grandeur.ceiling` row's `enabled` false (V11 §3.24.0's off form) `B-VILLAGE` is byte-identical to the build before item 115 — the `item115.off` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat (T115-4) | C | V-M2 (the class mix, the manor rule and the `item115.off` pin); the composition clause with V02's M6 (`notApplicable` before) |
| T-V7-64 | item 116 at village rungs (takes T116-1 – T116-4's village clauses): at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) the zoom-out limit shows the whole territory frame with one stop of margin and no stop beyond it is reachable in the view; the pyramid draws every stop from the limit inward and none beyond; the first view unchanged; an epoch that grows the frame moves the limit; an export frames within it | C | V-M3 |
| T-V7-65 | item 117 at village rungs (item 117 (i)'s village clauses, (f2) included; takes T117-1 – T117-8's village clauses): the same village document hashes identically in all 52 weeks — the `item117.season` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat; every village surface (each great field by its slot, the strips, orchards, meadow, commons, green, gardens, ponds, the moat, the leat, the stream) has a season row in every week of every climate with no gap; an arid fixture never draws ice or snow; a cold fixture freezes the ponds and the moat before the leat's slow reach and the leat before the stream, and keeps open water at the mill race, the leat's take-off and springs; stooks only in the harvest weeks; in autumn a wood's rim crowns take several colours (their count per wood above a floor), the leaf cover's density non-decreasing through the leaf-fall weeks on the green, lanes, tofts, churchyard and roofs; a dossier village opens on its present week (its latest stamped tick), one with no stamped tick on the season control's midsummer; each week's look passes the contrast and colour-blind checks (item 112) | C | V-M3 |
| T-V7-66 | item 118 at village rungs (item 118 (h)'s village clauses; takes T118-1 – T118-6's village clauses): the same document hashes identically with decorations on and off and in every week; a festival shows exactly in its window's weeks; the same festival draws identically across views and exports (byte-stable tiles per seed); a THORP fixture shows only a garland or a bonfire at the heart, a HAMLET a maypole or a bonfire on the green and door garlands, a VILLAGE a maypole, church-lane bunting and the green's stalls and tables — no larger tier's kinds; staging lands on the named or keyed village place of §8.2's place table, else its kind's fallback; nothing blocks a gate or covers a label's keep-out; with no traditions and no preview, byte-identical (a `NoOpPin` — the `item118.festival` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat) | C | V-M3 (the dossier-window clause with V08's reading of `traditions`) |
| T-V7-67 | the one-time waits (item 119 (f)'s village clauses; takes T119-2 – T119-4's village clauses): on §12.1's reference machine, at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499), each on its largest frame, generate, regenerate, opening a map from SettlementForge (the small-dossier fixtures), a dossier change applied, an epoch and the history replay (V07 §3.12a's fixture; each timed as V06's part of item 119 times it), every export format and a migration each complete within 10 s from the click to the complete result; every wait past 1 s shows V09 §4.21.9's progress, never an empty screen; every step slower than its §12 or V07 §6 target has its `perf.qualitySpend` row with its recorded gain (0 rows and 0 slower steps at shipping); V07 §6's edit and switch budgets and §12.5's frame budgets hold unchanged | C | V-M3 |
| T-V7-68 | Find at the village rungs (item 120 (k)'s village clauses; takes T120-1's and T120-4's village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures, with and without a dossier, the document hashes identically with Find on and off and turning every chip off restores byte-identical tiles — the `item120.find` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat; each chip's matches equal the gazetteer query's rows at the key — the `v.` classes by their labels and synonyms (a "farms" chip holding the village's farmsteads and the outlying ones), the dossier's names, the village, the ends, the field groups and V07 §5.3's places — and the list offers nothing the village lacks; Show gaps outlines exactly the ends (with one end or none, the village) holding no member of the chip's class and never a class its row sites outside the perimeter; at the township view every match has a pin or a count bubble; an epoch that opens a smithy lights it and one that closes its use darkens it in that commit; an end's chip reads 0 after the hand-off up and lights again after the hand-off down; under a player view the knowledge canary (T-V9-66's fixture read at a village rung) surfaces in no suggestion, count, glow or pin; the chips survive every band and layer change, a village epoch and an undo; at a scrubbed week whose frame is not the head, on a VILLAGE fixture whose later epoch opened a smithy, closed another's use and merged two ends, each chip's matches, the ends listed and Show gaps' units equal §11.2's listing at that week, re-evaluated within 100 ms of that frame being drawn, and the head's are back at the head; suggestions within 50 ms and a chip's glow within 100 ms at the VILLAGE top | C | the later of V-M3 and M5 (Find's milestone; risk (13)); its scrubbed-week clause at the latest of V-M3, M5 and V06's E6 (V06 §3.15.2's frames) |
| T-V7-69 | item 122 at village rungs (item 122 (g)'s village clauses; takes T122-5's and T122-6's village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures — with and without a palisade (one closing only by barrier arcs among them), a green, a market, an entry, an outlying farmstead, an arable field and an end — each look kind previewed at severity 0, 0.5 and 1 and, from M-SF, a dossier fixture carrying each mapped condition, among them a disaster whose rebuild Works begin on some of an end's buildings inside its weeks; and two test-side mutations of one of V07 §7's frozen small-dossier VILLAGE fixtures, each from M-SF — a calamity whose `targets` name uses on more ends than its severity's share k of the village's units, and a fire at severity 1 whose `targets` name a use on an end that no other end neighbours (V07 §5.6 (3)'s `neighbours`: an end parted from the rest by a water face or by land no plot of either touches), its order ending at that end before k, the harness asserting the end's isolation before the clause reads it: **(a)** each look's extent lies within its rung's `scale` cell, linear in severity, a camp the dossier sizes taking `areaPerHeadM2` × its heads within 10 %, and no siege at THORP or HAMLET draws a trench or earthwork line (T122-5); **(b)** 0 look elements on water, in a gate's passage (a palisade gate's opening and 4 m along its way each side) or over a label's keep-out, and no camp on the green or on a plot — a toft, a close, a croft, a plot of DR18's clusters (T122-6); **(c)** a disaster ruins whole units of `villageDisasterUnits` — the ends, or the toft groups of a village with no end — each unit's `DisasterUnit` fields as V07 §5.6 (3) reads them, the calamity's matched targets first, every building the look stands over (§10.2 (f): a building of a returned unit until V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over) drawing the ruined look, a building of a returned unit whose rebuild Works begin in the condition's weeks drawing its Works from that week, and none outside; a look scaled as a share of its place's n units at share s takes round(s × n) clamped to [1, n] where s is above 0 — a disaster's units the first max(k, \|`matched`\|) of its order, k that count, or all of a shorter fire order (V01 §3.16 (5)) — on a VILLAGE fixture whose calamity names more ends than k (every named end struck) and on a fire whose order ends before k (the shortfall reported); **(d)** each place reads as V07 §5.6 (2) states: a siege of a village with no walled stretch draws the blockade on its entries' ways, a palisaded one its camps beyond the walled stretches and its engines facing the weakest runs, then the gates; beast's torn sections only on a standing palisade, else watch-fires along the perimeter; famine bares every arable face, the meadow and the commons, its pens empty and the market's stalls shuttered; raiders burn the outermost outlying farmsteads, else the farm tofts farthest from the heart; the refugee camp on `campLand` by the main approach road's gate; the quarantine's marked doors and cordon in one unit of V07 §5.6 (3); **(e)** the answer to a `why` carrying the view (`opts.view`; §11.2's view-bound `why`) on an end of a disaster look's units and on a field a famine look leaves bare carries `info.crisis.ruinedFor` in the form V09 §4.21.12 (4) chooses (under a preview `ruinedForPreview`) while the look stands at the viewer's key, and none otherwise, an end every building of which has begun its rebuild's Works (the look standing over none of them, its `ruinTone` gone) among the none, a `why` without a view included; **(f)** an epoch, an edit or a hand-off that changes the ends re-derives the units in that commit, a look over a hand-off reads the rung in force, and under `VG` no look draws | C | V-M3 (the previews and the readings); the dossier clauses with V08's reading at M-SF; the disaster clause at the later of V-M3 and M5 (V01's `disasterSource`), the refugee camp's frontier clause at the later of V-M3 and M6-E (V06's `frontierFor`) (risk (14)) |

**Parity metrics** read from `baselines.json`'s VG rows (item 495; `referenceBuild` 19365073 = VG 1.6.9, §13.5's stamp),
generated research-side from the existing recordings (`captures/village/*`, `research/findings/profile-village.md` §3.3, §5 and
its addenda N1–N5): dwellings per village by tag set, the accepted share of frontage draws, the square's rim radius, trackers
per village (4–11) and steps per village (≈ 200), bridges and piers per water map, the palisade's kept lattice points (13–20)
and the model time per stage — V12's `vg.*` family, each metric `vg.<name>` (the accepted share `vg.acceptedShare`, the one a
register entry names, V07 §3.15). The village's panels are `PanelSpec`s on V12 §3.9's engine, their `D5Pair` variants V12's and
their reference rows `Baseline` rows of input `counts` or `geo` under V12's `'VG'` reference.

**Goldens and the one-time shift** (item 110; a legitimate change of outputs is stated, never silent). The village goldens are
re-recorded once, with the terrace and deck rows on, and item 110 is stated as the cause beside them: hilly and mountainous
fixtures gain house-platform walls and their stairs and ramps, fixtures with a landing and a pier gain pier heads at
`deck.headChance`'s rate; T-V7-52 pins that nothing else moved. Items 111 (the water pull at its temperate weight), 115 (the
manor rule) and the derived area per head (V07 §3.9 (1); the territory 1.1 % smaller) are stated the same way when their changes land: the goldens re-recorded
once each, the cause named beside them, their no-op pins (T-V7-58) and T-V7-11's clause pinning that nothing else moved.
=== END ===

=== REPLACE ## 8 Build plan ===
## 8 Build plan

The village product is built on the finished base in J122's order (`docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`; §16's
staged table and INDEX §4 carry the same slot): **V-M0, the tracker spike, right after M0**, on M0's kernel, M0 (b)'s tables and
its own fixtures (synthetic flat, river and coast sites and its own frontage slotting; no M2b input), beside M1; **V-M1 – V-M4
after M4**, in parallel with M5 (different packages, no shared file), needing S1, the plot model and the one solver (M2b), the
relief tier (M2b), item 101's tools and the port's absorb half (M3a) and the epoch path (M4); V-M3's clauses that run V06's
steps exit with M6-E's E2–E4 (V07 §1 (14)); **V-M2u after M6-U's tail** (V04). Its milestones:

| milestone | content | exit (executed) | est. (pw) |
|---|---|---|---|
| **V-M0 — the tracker spike** | VS2 + VS3 + VS4 + the slot race on flat, river and coast sites at the VILLAGE target, headless, on the spike's own fixtures; `village.json` whole — its three rung rows, every column of V07 §2.2 and V07 §2.2a — with its register entries (*The register at the exits*, below); the `VG` preset file (item 377): V07 §3.15's `VG` column and switches, V11's five `presets.VG` entries written by V11 §2.2's rule, and the `presets.VG` entry of every `presetsRequired` cell of a table a village stage reads, from V07 §3.15's list and rule; the source manifest's `productStages.village` from V07 §3.0's stage set, conditional registrations included (V11 §3.2.1 step 1) | 0 whole-map retries on 1 000 seeds; VS2 + VS4 ≤ 8 ms at VILLAGE; under `VG` the road-topology shares within ± 5 % of VG's roll; the legibility check of risk (1) below on 20 renders; V11 §3.2.1 step 4's preset check green with the `VG` file shipped; `plat calibrate register --check` green over the cells it lands | 1.25–1.75 |
| **V-M1 — the village core** | `@plat/village`; the `ProductDecl` (with `extraInputs`) and the ladder rows; the anchor law and the typed rule cells (their readers; the table's rows shipped whole at V-M0); S0's village draws with item 111's arid water weights and the oasis reading; the course-first river; VS1 with S3's jobs (border, lattice, destinations, L0 ponds) and the daylight sweeps; VS2 with item 111's water pull; VS3–VS6 and VS8 in the village writer order; the `toft` plot strategy; the `VG` request mapping; the palisade's barrier closure and graded stretches (item 106); the `painterly` family's ground, water, ways (with the edge fade and bridge shadows), palisade, spotlight (focus and size) and building programs (roof faces, palette, ruin) at the city and district bands; labels; `B-VILLAGE` in CI; item 110's levelling at village rungs (V07 §3.8a) and the router's rung gate (V07 §3.5), once the base's item 110 has landed (its M3a) | T-V7-1 – T-V7-9, T-V7-17's block clause, T-V7-18, T-V7-24, T-V7-28, T-V7-31, T-V7-41, T-V7-44, T-V7-46, T-V7-47, T-V7-52, T-V7-57 (its fair-field clause at V-M2), T-V7-58, T-V7-60's V-M1 clauses; `plat calibrate register --check` green over the cells it lands | 9–11.25 |
| **V-M2 — institutions, fields and dossiers** | V07 §2.4's class rows and templates with the presence laws, the crypt cells and the burial faces; items 103, 104, 105, 107 and 108 at village rungs (the supply, balance, spacing and ladder rows, the placement order, the entry store); item 115's grandeur ceiling in the class mix and the manor's rule; the three field presets, great fields, meadow, commons, woods (with the request's forest and the `VG` forest modes), outlying farms (`N_o`) and decorations; the port's consultation of `LadderRouter` (V08 §3.10; item 202), the village DR rows in the resolution order with the burial, mill and residential readings, the chains and the ladder records, the market and harbour readings with the market halls' claims, the fair field and `rules.claimArea`, VS8's pin-record rule and the records placement `village.records` (`place`, with item 4's REPLACEMENT greaters, and `remove`, keyed by the dossier event's `seq`) with `village.outsidePlot`, called on the absorb path without an epoch, and the product registration's hooks that call it — `ProductDecl.records`, the *One path* placement's and §7.7 item 2's removal's calls, and the dossier step's call on M4's grow path (item 202; J-V7.128 – J-V7.132); item 114's generation-time palisade conditions and patch rows; the small-dossier fixtures | T-V7-2's dossier clause, T-V7-6's dossier clause, T-V7-10 – T-V7-13, T-V7-19 – T-V7-21, T-V7-33 – T-V7-36 (T-V7-35's promotion clause at V-M3), T-V7-42, T-V7-45, T-V7-56, T-V7-58's dossier clause, T-V7-62's generation clause, T-V7-63's class-mix clause, T-V7-60's V-M2 clauses; `plat calibrate register --check` green over the cells it lands | 7.5–10.75 |
| **V-M2u — the underground under a village** (after V04's tail milestone) | the registration of V04's tail at the village subset, with the source manifest's `productStages.village` gaining its stage ids (V11 §3.2.1 step 1) and, in the same change, the `presets.VG` entry of every `presetsRequired` cell of a table that registration makes village-read, by V07 §3.15's rule; the village dig rows, the well and mine-working readings, the ruin marker's site, dwellings after access; the growth draws at epochs wired to V07 §3.12 | T-V7-38 – T-V7-40, T-V7-60 (g); V11 §3.2.1 step 4's preset check green under `VG`, T-V11-9's equality of `villagePresetCells` with V07 §3.15's list included; `plat calibrate register --check` green over the cells it lands | 1–1.5 |
| **V-M3 — editing, time and output** | V07 §4's tool forms, events and locality rows (the lassoed ends with the count badge, the wall tool's barrier snapping and its repair material, the declared split, the form-edit bend); the epoch phases, desertion with the hollow ways and house platforms as records, the ladder steps and the palisade's replacement; the markets, halls and the fair over epochs (V07 §3.12) with the dossier step's call of `village.records` (built at V-M2), `village.outsidePlot` from V06 §3.9.6 and the siting step (m), and the pins over epochs (`village.pins`), these grow-path parts on M4's grow path at item 202's call points (V-M2) until V06's engine carries them — V-M3's clauses that run V06's steps exiting with M6-E (risk (10)); both hand-offs with the band, the one revived plan, the old core's fabric participants, the catacomb step and the maintenance mode; item 113's village part (V07 §3.12a) on V06's replay; item 114's epochs and condition looks; `painterly` at the neighbourhood band with the crown bands and group shade; the night view; the village through the year and its festivals (items 117, 118); the township view at the zoom-out limit (item 116); exports; the village `WhyProvider`; item 110's village parts — the raised way on a village map (V07 §3.5a), deck plots and the pier head (V07 §3.10a), the decline rows, the hand-offs' item-110 state, the painterly item-110 programs and the item-110 edit rows; item 119's one-time waits (V07 §6); Find at the village rungs (item 120; V07 §5.5); the crisis looks at the village rungs (item 122; V07 §5.6: the places' village readings, `villageDisasterUnits`, the crisis lines); the edge suite's V-M3 clauses | T-V7-13's village-history clause, T-V7-57's village-history clause, T-V7-14 – T-V7-17, T-V7-22, T-V7-25 – T-V7-27, T-V7-30, T-V7-32, T-V7-35's promotion clause, T-V7-37, T-V7-43, T-V7-48 – T-V7-51, T-V7-53 – T-V7-55, T-V7-59, T-V7-60's V-M3 clauses, T-V7-61, T-V7-62's epoch clause, T-V7-64 – T-V7-67, T-V7-68 at the later of V-M3's exit and M5's (Find's milestone; its scrubbed-week clause at the latest of V-M3's, M5's and V06's E6's, V06 §3.15.2's frames), T-V7-69 (its dossier clauses at M-SF, its disaster and camp clauses as its row states) — the clauses that run V06's steps (T-V7-16, T-V7-30, T-V7-48's carried-down clauses — the CITY fixture handed down, its frame growth, the palisade's decay beneath its deck and the hand `absorbWall` — and its state-sweep runs (§13.2), T-V7-50's desertion clause, T-V7-35's promotion clause over epochs, T-V7-51, T-V7-59, T-V7-62's epoch clause) at V-M3's exit where M6-E's E2–E4 have landed, else at the first V07 exit after E4 (risk (10)), T-V7-48's `topple` runs at the later of that exit and V06's E5 and its runs with a `vault` span breached and its arch-vault clauses at the later of that exit and V04's U3 (risk (8)); `plat calibrate register --check` green over the cells it lands | 9.75–14.75 |
| **V-M4 — parity and the owner's panel** | `baselines.json`'s VG rows; T-V7-23 under `VG`; the one `reference` run on `rules.race.densityPower@VG` (risk (2); register entry `cal.village.*.rules.race.densityPower@VG`, V07 §3.15), only if T-V7-23's accepted-share row misses its band; the D-5 panel against VG | T-V7-23; T-V7-29 rated or accepted; `plat calibrate register --check` green over the cells it lands | 2–3 |
| **total** | | | **30.5–43** |

The total is the product's own 26.5–36.5 pw plus the parts of items 111–120 and 122 routed here (item 111 at V-M1, + 0.25–0.5;
items 114 and 115 at V-M2, + 0.5–0.75; at V-M3 item 113's village part + 0.75–1.25, item 114's epochs and looks + 0.25–0.5,
items 117 and 118 + 1–1.5, item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's
one-time waits + 0.25, item 120's Find at the village rungs + 0.25–0.5, item 122's crisis looks at the village rungs
+ 0.25–0.5); §16's village line and INDEX §1 carry it (item 568 computes the totals once).

**The register at the exits** (J-V7.124). Every milestone above that lands a registry table of this volume, or a
calibratable column of one, exits with "`plat calibrate register --check` green over the cells it lands — their entries from
V12 §3.11's default line (`plat calibrate register --defaults --milestone <id>`, the landing change's id in V12 §2.8's
volume-qualified form: `V-M0` – `V-M4`, `V-M2u`) unless this volume's own line names the column". The lint runs at PR tier
from M1 (T-V12-20), so the change that lands a column carries its entry, never a later change (V12 §3.11). The entries follow a
table's first rows, not its first compile: every registry row compiles from C0 as its schema's empty table (V11 §2.1's
empty-table rule, J-V11.84), and `--defaults` writes an entry only for a column that holds a compiled cell (V12 §3.11,
J-V12.73); so a table or column that first ships rows in an earlier milestone than planned below takes its entries there, the
check failing that milestone otherwise. Every entry the default line writes here is due at M-CAL (V12 §3.11), which opens only
after V-M4 has exited (V12 §3.10.1), so each falls due after the milestone that writes it. The landing seat writes the named
entry first, then runs `--defaults` for the rest (V12 §3.11's order). Keys, switches, modes, reference cells and
`rules.ladders.ranges` take no entry (`calibratable: false`; V07 §2.2, V07 §2.2a, J-V7.114, J-V7.121), the derived territory per
head is no column (its farm rows are the base's `FarmTable` cells), and a `VG` entry passes by its `ref:VG` provenance or
its `fixed:` note (V07 §3.15), save the one named below. The rows this volume adds to other tables — the village rows of
`ladder.json` (item 201), of §4.3's width table (item 292) and of §4.9's farm table (item 314), V07 §2.4's `v.` rows of
`roster.classes`, the supply, balance, spacing and ladder rows of V11's tables, V02's `composition.classFamily` rows and V04's
dig rows — take no entry: a column entry's `rows` is absent, so it binds every row, and those columns were bound when their
owners landed them. This volume writes no register line of its own (J-V7.124). As planned:

| milestone | first ships rows here — holds a compiled cell (registry row) | each column's entry from |
|---|---|---|
| V-M0 | `village.json` (61), every column of V07 §2.2 and V07 §2.2a: its three rung rows are written whole with the `VG` preset file, whose entries sit on cells of both (V07 §3.15) | `rules.race.densityPower`'s `VG` entry: the named `cal.village.*.rules.race.densityPower@VG` (method `tune`, due V-M4; V07 §3.15), written first; every other calibratable column by the default line (owner `V07`, the table's rows home), `rules.race.densityPower`'s default value among them — a cell's default and its `VG` entry are two knobs, told apart by `preset` (V12 §2.6) |
| V-M1 | none: the typed rule cells' readers read the rows V-M0 shipped, and its village rows of `ladder.json`, the width table and the farm table add rows only | — (the check runs and is green) |
| V-M2 | the `presence` column of `roster.classes` (17; item 576 (a)), whose first cells are V07 §2.4's `v.` rows: its law anchors are numbers and calibratable (`own`; §12), the column's flag as this volume types it | the default line |
| V-M2u | none: the dig rows are rows of V04's tables (landed at V04's U3b), the well and mine-working readings `village.json`'s cells (V-M0) | — (the check runs and is green) |
| V-M3 | none: the epoch rows and the `handoff`, `raised`, `deck` and `refound` cells are `village.json`'s (V-M0) | — (the check runs and is green) |
| V-M4 | none; `cal.village.*.rules.race.densityPower@VG` falls due, its history row and status by V12 §3.11's milestone exits (V07 §3.15) | — |

**Risks and spikes, in order.** (1) **Legibility at the VILLAGE top** — VG's trackers make 5–60 houses; a 1 500-person village
has ≈ 300 dwellings, and a walk-grown network may tangle. Spike: V-M0's 20 renders at 1 400 people, judged against the
figure-ground metrics of §8.5. *Pre-decided fallback:* above 800 people the tracker branch spacing takes the `nucleated` law and
faces larger than 4 ha inside the perimeter get the base's bent-cut lanes (S8's `BentCutFabric` on those faces only, registered
for the village district by `fabricParams`), re-measured. (2) **The exact-count race's look against VG's independent
acceptances** — measured by T-V7-23's accepted-share row and the V-M4 panel; *fallback:* the race draws its keys from a density
raised to a power fitted so the built share per density band matches VG's — the cell `rules.race.densityPower`, whose `VG` entry
the one `reference` run at V-M4 fits, the default staying 1 (J-V7.119). (3) **Content** — the class rows and templates of V07
§2.4 are ours to author (≈ 1.5 pw inside V-M2), with V11's rows cited. (4) **The `painterly` family** — reserved and never built
in the base; its programs at build depth (the roof faces, palette and ruin, the edge fade, bridge shadows, crown bands and group
shade, the spotlight's modes, the condition looks, the season and festival rows) are priced inside V-M1 and V-M3 (≈ 3–4 pw).
(5) **The hand-offs' coherence** — the epoch fixtures T-V7-14 and T-V7-15 run from V-M3's first week. (6) **File g's base
mechanisms** — the barrier closure, the supply web, the balance profile and the ladder table are the base's; *pre-decided
fallback:* if the barrier closure has not landed when V-M1 starts, V-M1 ships the palisade with VG's water cut (`closure:
'shore'`) and T-V7-31 moves to V-M2's exit; if the web or the ladder table has not landed by V-M2, those bars move to V-M3 and
V-M2 exits on the rest. (7) **V04's tail** — V-M2u registers V04's stages and cannot start before V04's tail milestone;
*pre-decided fallback:* until it lands the village ships with no cavern or ruin (the author's dug passage stays, item 66), T-V7-38
– T-V7-40 move to the first milestone after V04's, and V07 §3.12's hand-off down keeps a shrunk town's underground records
untouched and unregistered (read-only, drawn, never re-derived) until the maintenance mode exists. (8) **The base's item 110** —
the levelling, the ground parts from 1 and the deck plots are the base's (M3a); *pre-decided fallback:* if the base's item 110
has not landed when V-M1 starts, V-M1 ships with the terrace, raised-way and deck rows off (T-V7-52's state) and T-V7-46 and
T-V7-47 move to V-M3's exit; if V04's arch-vault source or V06's raised-way decline has not landed by V-M3, a raised way on a
village map stands with open spans and without decline, reported, and the clauses of T-V7-48 and T-V7-51 that read them move to
the first milestone after theirs. (9) **The registration's hooks** — `ProductDecl.records`, its calls on both paths, the phase
overrides and the participants on M4's grow path are item 202's; *pre-decided fallback:* V-M2 builds the village's side against
item 202's text, the base's side landing with it in the same milestone; if the base's side is not in place when V-M2 exits,
T-V7-13's absorb clause and its village-history clause move to V-M3's exit and a record at a village rung is reported as placed
by S10b's request until then. (10) **A village epoch on the grow path before M6-E** — the grow path runs V-M3's grow-path parts
at item 202's call points but none of V06's steps; *pre-decided fallback:* such an epoch strikes no way (no hollow way until
E2), applies a ladder step or a walls record the epoch carries by the base's dossier step as V07 §3.11's absorb half applies it
(member #1 kept where the greater's thing is the lesser's, the rest by S10b's `dossier` request; the palisade's REPLACEMENT;
V08 §3.5.1 (c), (d)'s bindings), and leaves a claim-sized roster member waiting in its deficit, each reported in the epoch
event's generation report (§5.4); T-V7-16, T-V7-30, T-V7-50's desertion clause, T-V7-35's promotion clause over epochs and
T-V7-51 then exit at the first V07 exit after E4, priced inside V-M3's range. (11) **Item 113's replay** runs on V06's engine
(M6-E); *pre-decided fallback:* until it lands a village is generated at its present (the replay off, as §4.11 (7) states) and
T-V7-59 exits at the first V07 exit after M6-E's replay. (12) **The season, festival and zoom-limit rows** are §8.2's
and §8.8 rows and V11's tables (items 116–118); *pre-decided fallback:* if they have not landed by V-M3, the village draws its
one default season (midsummer) with no decorations and the base's zoom-out range, and T-V7-64 – T-V7-66 exit at the first V07
exit after them. (13) **Find** (item 120) is V09's panel and `live.find` overlay over §11.2's gazetteer and §8.2's rows,
landing at M5 (Find's milestone, with V01's area and gap services); *pre-decided fallback:* if M5 has not exited when V-M3
does, the village's readings (V07 §5.5) ship as the gazetteer's rows and area targets alone, and T-V7-68 exits with M5's
exit; its scrubbed-week clause reads V06 §3.15.2's history frames and exits at the latest of V-M3, M5 and V06's E6. (14)
**The crisis looks** (item 122) are §8.2's `live.crises` over §10.2's table (M3b) and V11's rows, the conditions'
`crisis.map` rows with V08's reading (M-SF), V01's `campLand` (M3b) and `disasterSource` (M5) and V06's `frontierFor` (M6-E);
*pre-decided fallback:* the village's readings (V07 §5.6) and `villageDisasterUnits` ship at V-M3, exercised by previews, and a
clause of T-V7-69 whose service has not landed exits at the first V07 exit after it.
=== END ===
