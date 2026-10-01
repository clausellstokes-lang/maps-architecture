# Repair round 4 — V05 (the sky) — lane coherence/repair-V05-r4

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V05-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V05-sky.md. Live unit: V05 as assemble-r3 left it (sha256
# cc1dfa61fe882bcb…, 398 194 bytes, 3 052 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (docs/validation/coherence/work/repair-V05-r4/build.py: 24 edits, each applied exactly its asserted count,
# each tagged with its END line, ruling or sweep; edits.log and diff.txt there); every untouched line is verbatim.
# Blocks: 11, all REPLACE — ## 1b, §3.16, §3.23, §5.1, §5.2, §5.3, §5.4, §5.6, ## 6, ## 7, ## 9 (## 1b, ## 6, ## 7 and
# ## 9 have no subsections, so each is the smallest block holding its lines). No heading retitled or added, no
# whole-volume REPLACE, the title block untouched. Ruling requests: 0.
# Binding rulings applied (adjudication-r4, Part H · V05): R4-01, R4-02, R4-09, R4-12; R3-01 – R3-03 stand.
#
# PROGRESS
# - P0 brief read whole (empty issue list; ROUND-4 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r4's TOC
#   row, R4-01, R4-02, R4-09, R4-12 and Part H · V05 read whole; R3-01 – R3-03 read: done
# - P1 issue sources and counterparts (VAL-R3-01, VAL-R3-05, VEW-r3-04; the model, rendering, V04, V06, V09 r4 texts);
#   live V05 §3.16, §5.6 whole; the sweep of V05 for the terms R4-02, R4-09, R4-12 change: done
# - (resumed after a container restart, CONTINUE rule) every edit re-checked against the landed round-4 counterparts
#   (rendering §8.2/§11.2, model §2.7 (3), V04 §5.1 (7), V06 T-V6-73, V09 §4.21.10 (7)-(8), scope's item-114 group): done
# - P2 count-asserted edit set (24 edits, 11 blocks; work/repair-V05-r4/build.py) incl. scope's T-V5-14 hand-off: done
# - P3 dry run on a copy, references, doc checks, words, report, result, LANDED: done
#
# DISPOSITIONS — Part H · V05: no issue of its own this round (none FIX, MERGED or INVALID); it runs for its three END
# lines (R4-01 (4)), each written as given:
# - END of VAL-R3-01 (V09; R4-02) — §5.6 (3): "and Go there turns its visibility on, as switching the working layer
#   does" → "and Go there makes Sky the working layer, which the view draws whatever its visibility (§8.4), no event sent
#   (item 120 (a))", verbatim.
# - END of VAL-R3-05 (V04; R4-12) — §5.6 (2)–(5): "At a drawn week whose frame is not the head (V06 §3.15.2), an
#   island's matches, glow, pins, ghost pins and gaps are §11.2's listing at that week, each drawn at its island's anchor
#   in that frame." added verbatim, in (5) *Over time, edits and knowledge* — the item that holds the time readings; the
#   sentence names every reading of (2)–(4): matches and glow (2), pins and ghost pins (3), gaps (4).
# - END of VEW-r3-04 (model; R4-09) — §3.16 (4)'s raised-way pier row: "raised-way pier (its footprint)" →
#   "raised-way pier (its footprint; a crossing station's support is its wall stretch, §2.7: the wall row's breach)",
#   verbatim.
#
# SWEEP (R4-01 (2): every V05 restatement of the term, key or rule the three rulings change, conformed in the same block)
# - R4-02 (the view draws its working layer; every switch, Go there included, writes nothing). Searched: "hidden",
#   "visible", "visibility", "LayerSpec", "working layer", "Go there", "view shows", "sky layer". Conformed:
#   * §3.23's light-and-shadow row: "a hidden sky layer's slabs light nothing and are not drawn (§8.4)" → "a sky layer the
#     view does not draw (hidden, and not the view's working layer; §8.4): its slabs light nothing and are not drawn".
#   * §3.23's Find-on-Sky row: "a hidden sky layer: its matches still counted and shown as ghost pins" → "a hidden sky
#     layer with Ground or Below working: its matches still counted and shown as ghost pins, and Go there makes Sky the
#     working layer, drawn whatever its visibility, no event sent" (§5.6 (3)'s words).
#   * §5.1's pennants: "none while the sky layer is hidden" → "none while the view does not draw the sky layer (hidden,
#     and not the view's working layer; §8.4)"; §5.2: "A hidden sky layer draws and lights nothing (§8.4)" → "A sky layer
#     the view does not draw — hidden, and not the view's working layer (§8.4) — draws and lights nothing".
#   * §5.3 (4) and J-V5.14: "whenever the sky layer is visible" → "whenever the view draws the sky layer (visible, or Sky
#     the view's working layer, §8.4)"; §5.4: §9.2's candidate set "sky rows only while the sky layer is visible" → "…
#     while the view draws the sky layer (visible, or Sky the view's working layer, §8.4)" (rendering §9's END form).
#   * T-V5-12 and T-V5-13 (i): "with the sky layer hidden" → "with the sky layer hidden and Ground the working layer" (the
#     bars' 0 sky labels and unlit slabs hold only then); T-V5-36 (c): Go there's bar adds "— Sky then drawn whatever its
#     visibility, 0 events logged and its `LayerSpec.visible` unchanged (V05 §5.6 (3))" (T-V9-83 (g)'s form).
#   * Left as they stand (they agree): §4.1's T12 `dress` row (a logged `setLayer`, R4-02 (a)); §5.5's *The looks* ("as
#     the view shows them" names the looks drawn, not which layers); §5.6 (2) ("With Sky the working layer"); T-V5-36
#     (c)'s "with the sky layer shown and hidden" (Ground working); J-V5.89 (a hidden sky layer keeps its ghost pins and
#     counts; Go there sets the island `key` — no visibility claim).
# - R4-12 (Find at a drawn week reads the frame). Searched: "live.find", "gapUnits", "gazetteer", "week", "Find".
#   Conformed:
#   * §5.6's lead: knowledge admission "at the view's effective key" adds "and at its drawn week (§2.9's `week`; §11.2's
#     *At a drawn week*)"; (5): "Every commit, regenerate, undo and epoch" → "Every commit, regenerate, undo, epoch and
#     change of the drawn week (§2.9's `week`)" (§8.2's re-run list).
#   * §5.6 (6) and §6's Find row: `live.find`'s index "rebuilt once per commit" adds "and at each change of the drawn
#     week" (V09 §4.21.10 (7), the index's home, rebuilds it "at each change of §2.9's `week`").
#   * §1b's Find-on-Sky row: its inputs read at the view's key and drawn week, the frame's island records at a drawn week
#     whose frame is not the head, `gapUnits` at that week (V09 §1b's `live.find` row, as V09 landed it).
#   * Principle (11) for the new reading: §3.23's Find-on-Sky row adds the edge "at a drawn week whose frame is not the
#     head, an island raised, resized, moved, fallen or removed since that week" (its matches, pins and gaps the frame's
#     listing, drawn on its land and at its anchor in that frame, one raised since offering none); T-V5-36 gains (i):
#     (f)'s fixture after an `advance` raising one island and resizing another, then a hand move and a removal, and
#     T-V5-14's falling CITY, each scrubbed to a week before those epochs — every case the edge row names, and the head's
#     reading back at the head. The same shape as V04 §5.1 (7)'s edge row and T-V4-81's clause (V04, landed). The frame
#     claims follow V06 §3.15.2: the frame at w is the log prefix through the first epoch at or after w, later-dated
#     changes undone, so an island fallen, moved, resized or removed since is held as it was and one raised since is absent.
# - R4-09 (supports placed last at generation; a standing raised way held). Searched: "support step", "re-site",
#   "crossing station", "W_RAISED_CROSSING", "under-deck", "wait", "raised way", "raised part". Conformed, both in §3.16:
#   * (4)'s pier row's outcome: "a span whose pier is ruined becomes `ruined` with it" → "a span whose pier is ruined — or
#     whose crossing station's stretch the wall row breaches — becomes `ruined` with it": §2.7's support step (3) as model
#     landed it, "a landfall over it breaches it and ruins the spans beside it (V05 §3.16's landfall table)"; without it
#     the END's parenthetical would leave the spans beside a breached station standing.
#   * (5)'s `members`: "— never a deck plot, which is tombstoned with its deck and listed as a fate —" adds "nor a
#     crossing station's support, which is its wall stretch (the wall row)": the station's `supports` entry carries no
#     `state` and no support op takes it (§2.7 (3)), so a `{ raised, support }` member for it would never leave the list;
#     the walls are drawn by their runs' `condition`, as (5) already says.
#   * Left as they stand: §3.1's "every generated raised part is committed before S7b (1)" (the last support run is after
#     S7's batches and before S7b, so it holds, and S7b (5) reads the final piers); §3.22 (1)–(3) and (7) (casters, the
#     island yields, the access foot's dry run, removals); §4.2's foot meeting standing raised parts.
#
# JUDGMENT CALLS (vetoable)
# 1. Scope's round-4 HAND-OFF to V05 written in this round (R3-01: both ends land in one round; this seat had not landed
#    when scope's did). Scope landed §13.2's T114-3 "landfall clause, on volume 5's landfall (V05 §3.16): a landfall over
#    a raised gate, then the deck's repair — the stretch repaired with the deck, never a deck on a breached run", its
#    take-over row "T114-3's landfall clause (T-V5-14)" and the runs list "volume 5 T114-3's landfall clause on its
#    landfall fixture (T-V5-14)"; V06 (landed) reads "save T114-3's landfall clause". So V05 §7's take-over list names it,
#    T-V5-14's head reads "(takes T114-3's landfall clause)", and its landfall fixtures gain **A raised gate**: the
#    station's stretch `breached` by the wall row and the spans either side `ruined` with it, the station's `supports`
#    entry with no `state` and no `{ raised, support }` member; the deck's repair by hand and, on a second run, by V06
#    §3.19.2 (5) at the next epoch, each `repairRaised` repairing the stretch first by `repairWall` in the same batch
#    (§2.7's support step (3)); the landfall's undo restoring the stretch and both spans. Without it the take-over row
#    names a clause no V05 bar runs. Both repair paths are model §2.7 (3)'s ("whether V06 §3.19.2 (5)'s or a hand Repair").
# 2. The VAL-R3-05 END sentence sits in §5.6 (5) rather than repeated in each of (2), (3) and (4): one sentence naming
#    every reading those items define, in the item that already holds the readings over time (single source in the unit).
# 3. Two wordings of the drawn-layer predicate are used, each where it reads naturally: "the view draws the sky layer
#    (visible, or Sky the view's working layer, §8.4)" and its negation "hidden, and not the view's working layer"; both
#    are R4-02 (d)'s "draws: visible, or the working layer".
#
# HAND-OFFS (R3-01 (3); R4-01 (2)): none open. Every V05 end the other round-4 seats name is written here — V09's and
# V04's (the END lines of VAL-R3-01 and VAL-R3-05; V09 §4.21.10 (7) passes V05 §5.6 the model the view draws), rendering's
# (§11.2's readers "V04's and V05's Find places"), model's (§2.7 (3) cites "V05 §3.16's landfall table") and scope's
# (judgment 1).
#
# CHECKS (on the expected volume; scratch coherence/V05r4)
# - apply-blocks dry run over a copy of the live V05 with these blocks: 12 found, 11 applied, 1 skipped (the FILE routing
#   line, read by the assembler, never a block), audit not-OK 0; headings 62 → 62, fences balanced (14 → 14), title block
#   unchanged, PENDING FABLE REVIEW lines 1 → 1; output byte-identical to build.py's expected volume (sha256
#   ef99abd9b5a84c8a…, 401 398 bytes, 3 075 lines); the rationale (a throwaway input) unchanged. The live V05 was
#   unchanged (cc1dfa61…) from P1 to the dry run.
# - references (assemble-r3's refs.py on mirrors of the live set and of the set with this V05): V05 resolved 2 062 →
#   2 087, ambiguous 3 → 3 (pre-existing), external 1 → 1, broken 0; every other unit's counts unchanged. (A first draft's
#   "(§2.7's support step (3))" after "V06 §3.19.2 (5)" read as ambiguous; it now stands before the V06 citation.)
# - ids: no T-V5, J-V5 or W id added or removed; one new citation of a base bar (T114-3); no review id (R2-nn, R3-nn,
#   R4-nn, a verifier issue id) and no deferral word in any added line.
# - doc_checks.py --heads docs/ARCHITECTURE.md: WARNING reference corpus INCOMPLETE (captures, research/patreon,
#   research/devlogs, research/ftg-docs, research/external missing) — NOT authoritative, provisional: live → new C1 0 → 0,
#   C2 0 → 0, C3 237 → 237 hits (the same hit set; a draft's generic run "layer that is not the" reworded away), C4 0 → 0,
#   S1 0 → 0, S2 260 → 264 hits with 1 → 1 unreviewed (the pre-existing §4.20 pointer of §13). Exit 1 live and new, for
#   pre-existing hits only.
# - words (wc -w): 66 122 → 66 672 (+550, +0.8 %): the three END lines ≈ 76; the R4-02 sweep ≈ 109; the R4-12 sweep ≈ 55
#   and its edge row and test clause ≈ 176; the R4-09 sweep ≈ 13; scope's T114-3 landfall clause ≈ 130. No shrink source
#   applies: every change adds a ruled behaviour, its edge or its bar, or conforms a V05 statement to a ruling while
#   citing the rule's home (§8.4, §11.2, V09 §4.21.10 (7), §2.7); none of it is restatement or narration.

=== FILE docs/volumes/V05-sky.md ===

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
| Find on Sky — the sky's matches, ghost pins, bubbles and gaps units (V05 §5.6) | V09's `live.find` over §11.2's gazetteer at the view's key and drawn week; the committed island records and their arenas — at a drawn week whose frame is not the head, that frame's (V06 §3.15.2; V05 §5.6 (5)); V01 §5.4 (3)'s `gapUnits` over each island's arena at that week (V05 §5.6 (4)) | the glow, pins and bubbles on the sky layer; the ghost pins of sky matches on Ground and Below; the panel's "on Sky" count and **Go there** (V09) | §2.9, §8.2, §11.2 |
| the budgets and the comfort level (V05 §6) | M6-sky's measurements; §12.1's comfort level | §12's rows; T-V5-18; V06 §6.8's estimate (the resize row's figures) | §12.1, §12.4, §12.6 (file f item 476) |
=== END ===

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
   | raised span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint; a crossing station's support is its wall stretch, §2.7: the wall row's breach) | `ruined` (item 244's span and support `state`); a span whose pier is ruined — or whose crossing station's stretch the wall row breaches — becomes `ruined` with it (arches fall with their piers, whatever their own cover); a raised way with a ruined span has its crossing closed — it has no junctions with the ways beneath, so the `track` fallback does not apply to it, and the ways beneath are touched only where the footprint covers them; an aqueduct ruined this way loses its terminal's supply, a listed fate ("the fountain in <square> runs dry") | item 110's state rows | volume 6's `repairRaised`; the vaults beneath follow the span's state by volume 4's rule (this volume writes nothing underground) |
   | `RetainingWall` stretch, generated or drawn (its band) | `decayed` over its covered length (item 245's state, the `breach` op's result; a state, no edge removed), keyed by the wall's lineage address, so a later re-derivation of a generated wall keeps it `decayed` until an epoch's restoration re-derives it (V06 §3.19.4 (6)); a drawn wall is restored by hand | its state row | volume 6's restoration or `repairRetaining` |
   | another island's ground landing plot, yard or access foot | the plot's use closed with its building demolished like any covered building; in the `fallIsland` batch the access is re-landed as a move re-lands it (V05 §4.2): a slanted access at the nearest admissible point outside the covered set within its run; a vertical access becomes a `ropeway` from the same top where its row admits one, else F-SKY-ACCESS's ladder from its top; an access no rung places is dropped, reported, and an island left with none is reported `unreachable` (V05 §3.17) | its new landing's rows | its island's own re-derivation (V05 §3.10) |

   **Inside an epoch** the op's ruined raised parts are lifecycle entries of the epoch event, so they stand in
   `EpochScope.raised` (V06 §2.1), and volume 6's raised-way pass reads an aqueduct's lost supply at that epoch's
   `raisedWays` step (V06 §3.19.2 (4)); after a hand `convert`, at the next epoch's.
5. **The landfall record** (§2.7, file f item 252; J-V5.76). One ground `Decoration` of kind `fallen_island` whose
   `members` (`DecorationMember[]`) are the covered plots, land uses, reservations, ways and retaining walls, each by its
   `Id`, and the covered raised spans and raised-way piers, each by its raised way and item 244's support keys (`{ raised,
   span: [a, b] }`, `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate,
   nor a crossing station's support, which is its wall stretch (the wall row) — `source` the island's address and
   `name` the grammar's fallen form of its name. Each member leaves the list in the
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
| light and shadow | no island, no slab and no second base, and the cursor sun's floor is off; a degenerate tier ring drops its slab; a sky layer the view does not draw (hidden, and not the view's working layer; §8.4): its slabs light nothing and are not drawn, the model's strips unchanged; each occlusion mode lights as V05 §5.3 states | check | T-V5-13 |
| exports | with the setting on and no island the `sky` FeatureCollection is present and empty, with it off absent; a strip with no cells omits its MultiPolygon features; the parity presets export no sky content; an export mid-lag writes `basisCurrent` false, and an export after a load equals the one before | check | T-V5-17 |
| a lock against a dossier removal | V05 §3.15 (1b)'s lock clause | check | T-V5-14 |
| a landfall on another island's landing | V05 §3.16 (4)'s row | substitute; leave out and report | T-V5-14 |
| the most accesses | at most `accessCount.max` generated and `accessCount.handMax` hand-placed per island; a `placeSkyAccess` past the hand-placed cap is bent into a move of the island's nearest hand-placed access to the requested site ("An island takes at most {n} ways up by hand; moved {access} here"), with "Delete one first" as the alternative; an `editTable` lowering the cell below an island's count removes nothing — the accesses stand and only a new placement is bent; `skyAccessObstacles` ≤ 27 entries at the defaults | substitute | T-V5-16; T-V5-18 |
| a lock under `sky.clearance` | V05 §3.9 (5)'s lock clause | check | T-V5-31 (f) |
| the seasonal look (V05 §5.1) | every week of 0–51 the same model, hash, save, bases and strips; an arid row draws no ice and no snow on an island; a week in no band of a phase keeps the row's last phase (§8.2's cyclic read); a document whose pinned tables hold no item-117 rows draws §8.2's four override rows on the island as on the ground; a river all of whose stretches are fast draws no ice, a spring pond freezes as any `pond`; a `settled` or `waning` island dresses as a floating one; a `fallen` or `removed` island has no sky look (its landfall takes the ground's); a moved island's leaf cover moves with it | check | T-V5-34 |
| the pennants (V05 §5.1) | no festival in the view's week, or the display off: none; two festivals in one week: both, in window order (§8.2); an island with no landing: rim pennants only; a rim stretch wholly inside landing yards or the waterfall's lip: none there; a `fallen` or `removed` island: none; an island an epoch carried below CITY: V11's `SKY` row as at any rung; a ground landing: none of the `SKY` row's | check; leave out and report | T-V5-35 |
| Find on Sky (V05 §5.6) | no island: no sky entry and no "on Sky" count; one island: its matches alone; a hidden sky layer with Ground or Below working: its matches still counted and shown as ghost pins, and Go there makes Sky the working layer, drawn whatever its visibility, no event sent; a bubble never joins two islands' or two layers' pins; a match withheld by the key: absent everywhere; a `fallen` island: its matches dark, its landfall a Ground place; a `removed` island: never offered; Show gaps on an island (V05 §5.6 (4)): V01 §5.4 (3)'s `gapUnits` over its arena — under a walking-radius row an island holding no member a gap over every residential plot of it, whatever the ground beneath holds, and one holding a member no gap; under a households row each district's unserved plots; a district with no residential plot no per-plot unit; a class `IslandRule.carry.never` excludes a gap like any other; at a drawn week whose frame is not the head, an island raised, resized, moved, fallen or removed since that week: its matches, pins and gaps §11.2's listing at that week, drawn on its land and at its anchor in that frame (V05 §5.6 (5)), one raised since offering none | check | T-V5-36 |
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

=== REPLACE ### 5.1 Marks (S14; every sky coordinate is `anchor` + the local one) ===
### 5.1 Marks (S14; every sky coordinate is `anchor` + the local one)

| semantic | kind | what | bands |
|---|---|---|---|
| `sky.island.land` | `area` | the land face, in the style's `sky.ground` role | all |
| the island's fabric | as any district's | ways, blocks, plots, buildings, greens, water — `layer: 'sky'`, `z` above the ground | as the ground's |
| `sky.island.rim` | `outline` | the rim chain with the `cliff` bank program's outward ticks | all |
| `sky.island.shadow` | `shadow` | rung 3: the projected tier stack (V05 §5.3); `hatched`: the patch's drop shadow, as the Neighbourhood look draws its lone patch (`research/findings/vg-ng-devlogs.md` §B3.5; `research/findings/watabou-extra-a.md` §3) | all |
| `sky.island.underside` | `area` | `offset` occlusion only: the tier stack's silhouette swept along the offset vector — the rock hanging beneath the lifted island | all |
| `sky.island.tether` | `outline` | `offset` only: the true ground footprint dashed, and a hairline from the lifted centroid to the true one | district and finer |
| `sky.fall`, `sky.mist` | `glyph`, `area` | the waterfall's lip on the rim; a soft mist disc on the ground below it | district and finer |
| `sky.island.shadeStrip` | `outline` | the shade map view only (volume 9's thematic view of item 102 (f)), **outlines only — the veil of shade shares is volume 9's alone**: each island's held strip onto the ground at its basis as one solid ink line around the cells it blocks for at least three of the samples, traced by marching squares over the mask at the field cell, labelled with the island's name along it; a strip with no such cell draws none | city and district |
| `sky.island.shadePending` | `outline` | the shade map view only, while the caster's `shadeBasis` differs from its live island (V05 §3.19 (8)): the strip the island would cast now, its three-sample area as a dashed ink line — so a dashed line always means "where the shade will move" | city and district |
| `sky.access.<kind>` | `glyph` + `ribbon` | hoist: a glyph at the top and at the foot, joined only in `offset`; stair: the same glyphs, and in `offset` the helix of V05 §2.2 as a stepped spiral line; rope line: a hairline from the top's world point to the foot; bridge of light: a glowing ribbon with `light` marks along it at night | district and finer (the foot glyph at the city band) |

**States** (§8.2's `states`; file f items 408, 415): the base's island rows stand — the `fallen` row draws its rubble over
the faces and bands of the `fallen_island` decoration's members (V05 §3.16), and the `removed` row draws nothing, no label
and no shadow; a settled island's buildings draw their own existence rows. **The access rows are this volume's** (the
base's `skyAccess` row cites them): an access reads `closed` (a bar glyph), `unserved` (alpha 0.5) and is not drawn once
`ruined`. The landfall's breached walls with their towers and gates (by their runs' `condition`), ruined bridges, rubble
ways, ruined raised spans and raised-way piers and decayed retaining walls draw by their own state rows (§8.2; item 110's
rows); the deck plots tombstoned with their ruined decks draw nothing. The island's own retaining walls (V05 §3.22 (4))
draw by the base's retaining-wall semantic in the island's frame, on the sky layer's list, displaced with the island under
`offset`, their low-side shadow cast by the light pass on the island's sky surface layer.

**Sheets.** The sky layer composes its own list with §8.2's layer order, each sky semantic in the layer-order slot §8.2
gives it (file f item 408); every shipped sheet — §8.2's presets table: `ink`, `lit`, `hatched`, the ink-family variants
`parchment`, `bw-print` and `night`, `painterly` once volume 7 ships it (V07 §8's V-M1), and the parity presets, which carry
the rows though their recipes hold islands off — resolves every sky semantic, so the loader never refuses one. The
per-family facts are this volume's, their values volume 11's palette rows (row 52):

| semantic | per-family facts |
|---|---|
| `sky.island.land` | role `sky.ground`: in `ink` and its variants `parchment` and `bw-print` one step lighter than `ground` (`bw-print` on its grey ramp); in `hatched` the patch tone; in `lit` and `night` the `ground` albedo lit by the light pass; in `painterly` one step of its colour ramp lighter than `ground`, the relief tier shading the island's terrain as it shades the ground's |
| `sky.island.underside` | role `sky.ground` darkened one step, `ink` outline; `offset` only; drawn under the land, so the lifted land covers its top |
| `sky.island.rim` | the `cliff` bank program's ticks in `ink`, in every family — `parchment` and `bw-print` as `ink`; in `painterly` the rim one of its selectively outlined lines, so it is always drawn |
| `sky.island.shadow` | role `shadow` (rung 3); `hatched` the patch's drop shadow |
| `sky.island.tether` | `ink` hairline, dashed; `offset` only |
| `sky.fall`, `sky.access.*` | glyphs in `ink`, in every family (`parchment`, `bw-print` and `painterly` as `ink`); a bridge of light's ribbon in role `light` (the glyph tone; its night glow is the `glow` sprite of its `light` marks, E-16) |
| `sky.mist` | role `water` lightened, alpha 0.5 |
| `sky.island.shadeStrip`, `sky.island.shadePending` | `ink` lines, solid and dashed, label in role `label` |

The style role **`sky.ground`** (§8.2's *Roles*) is the land of a sky island: never `ground` itself, so an island reads
against the ground beneath it in every family. The island's own fabric resolves by the ground's semantics.

**Seasons on the island** (item 117, the sky's part; J-V5.84 – J-V5.86). A look, never a change (item 117 (a)): no week
changes an island's record or arena, the model's hash, a save, the island's `shadeBasis`, its strips or its `shadeSky`.
The season is §2.9's year position with its follow flag (§7.7's DR42), drawn by the tile worker from the display list
(§8.1 item 8; §8.8's key), so a week change re-skins the sky base and surface layer and re-emits no sky mark.
1. **The climate.** An island reads the document's one climate row as DR42 resolves it — the ground's, with its height
   correction by the ground's S0 relief class — never a row of its own: neither its altitude nor an `own` relief class
   (V05 §3.8 (3)) corrects it (J-V5.84).
2. **Its fabric** (item 117 (f), (f2)). Every face and crown the unit run lays on the island — its gardens, greens and
   orchards, any field face, the rim walk's planting (V01 §3.10.3 step 4), its trees and hedges (§8.10's instances) and
   its buildings' creepers — takes §8.2's season rows by its kind, as a ground face or crown of that kind does in the
   same week: the growing year's looks; autumn's crown colour per tree, by the keyed draw on each crown's render key, with
   the early green, the thinning and the bare crowns. The **fallen-leaf cover** lies by §8.2's rule on the island's own
   surfaces — its ways, greens, gardens, roofs and the spring pond's still water — on a 1.5 m grid laid in the island's
   local frame (cell (0, 0) at its local origin), so the cover moves with the island under a move and under `offset`; it
   reads only the island's own deciduous crowns and never lies on the void, and the ground's cover never reads an
   island's crowns (J-V5.85).
3. **Its water in winter** (item 117 (e)). The island's water takes §8.2's ice rule by its own kinds: the spring pond
   freezes as any `pond` (it carries no item-111 `spring`, V05 §3.8 (4)); the conjured river takes the ice kind its
   course's mean fall gives — at the default `tiltPerMille` a `river`, so it freezes only where the winter reaches that
   row's `freezesFrom` — and every stretch of it falling 2 m per km or more stays an open lead, as §8.2 keeps every fast
   current; the waterfall's lip — the river's stretch carrying both `rim` and `shore` — is an outfall for §8.2's leads,
   its 12 m disc open water in every week, so the fall keeps running and `sky.fall` and `sky.mist` draw all year
   (J-V5.86). An island in an arid row never freezes.
4. **Snow and the sun** (item 117 (g)). While the view's `weather` is `snow` — by default the climate row's snow band in
   a `cold` or `severe` winter, never in an arid row — snow lies on the island as on the ground: the `snow` role over
   `sky.island.land`, its field faces and its roofs, `road` keeping its value. Snow is the one look under which the
   island's land shares the ground's colour; the island then reads against the ground beneath by its rim's `ink` ticks,
   its shadow and, in `offset`, its underside, all drawn in every week. The view sun's height by week (§8.4's *Sun*)
   lengthens the island's drawn shadow (V05 §5.3) in winter and shortens it in summer; the strips and `shadeSky` read
   item 102's model daylight and never move with the week (V05 §3.19), so V05 §5.3 (5)'s agreement is read at an
   equinox week, where the view's path sun stands on the model's day.
5. **The off form and the other states.** A document whose pinned tables hold no item-117 season rows draws the island
   by §8.2's four override rows, as it draws the ground. A `waning` or `settled` island dresses as a floating one; a
   `fallen` or `removed` one has no sky look, its landfall's rubble and quarry face taking the ground's (V05 §3.16).
   Picture exports draw and name the chosen season (V05 §5.5); the re-skin's cost is V05 §6's season row.

**Festival pennants** (item 118 (d), the sky's part; J-V5.87). A look, never a change (item 118 (a)). While the view's
week lies inside a festival's weeks under §2.9's festival display — following §7.7's DR43 schedule, or previewing one
festival — every island not `fallen` or `removed` carries pennants by V11 §3.25.7's `SKY` row (its counts and its band).
The ground's tier rows and their places (`towers`, `walls`, the squares and ways) are the ground arena's: an island draws
the `SKY` row alone, at whatever rung it stands. The row's two places stand on the island as:
* `rims` — the island's rim chain: a run item at the row's spacing from a keyed offset (§8.2's run rule, keyed by the
  island's render key and the festival's id), each pennant on the land side of the rim; the run skips the rim's
  stretches fronting a landing yard, where that landing's own pennants stand, and the waterfall's lip;
* `landings` — each access top's landing yard (`sky_landing_top`, V05 §3.10 (5)): its two pennants at the two ends of
  the yard's front on the rim, flanking the access top, so the yard's passage from the top to its attach on the
  island's way stays clear. A ground landing carries none of the `SKY` row's.
Colours and motifs are §8.2's — the festival's culture and deity rows with the season's motifs (V11 §3.25.7). The
pennants are `live.festival`'s marks on the sky base (§8.2's slot 19b, under every label), drawn in the island's frame
and displaced with it under `offset`, faded with the sky layer under `ghost`, and none while the view does not draw the
sky layer (hidden, and not the view's working layer; §8.4); the seed, the festival and the island fix them, so they
draw the same in every view and export (byte-stable tiles) and a
moved island carries its pennants with it. Picture exports draw them and a VTT island scene in its image only (V05 §5.5;
§11.1); their cost is V05 §6's pennant row.
=== END ===

=== REPLACE ### 5.2 Occlusion ===
### 5.2 Occlusion

`ghost` by default (§8.4), `opaque` and `offset` as the sky `LayerSpec` sets them or an island's own `occlusion`
overrides. In `offset` the island's marks, labels and shadow-free silhouette draw displaced by `elevation ×
offsetPerMetre`, while its cast shadow stays where the sun truly puts it; the sky base is **lit at the island's true
position** and drawn displaced (V05 §5.3 (2)), and every pointer and tool point on it is un-displaced before the anchor
conversion (V05 §4.2). A sky layer the view does not draw — hidden, and not the view's working layer (§8.4) — draws and
lights nothing; the islands still exist and the model is unchanged (T15-1).
=== END ===

=== REPLACE ### 5.3 Light and shadow — the underside's shadow (the owner's J98) ===
### 5.3 Light and shadow — the underside's shadow (the owner's J98)

1. **The slab list** (§8.4 (a); file f item 415) holds, per island and under every occlusion mode, underside tier 0 and
   underside tiers 1 … n of V05 §3.9 (2), each its world ring, its top and its underside, so the island's shadow is the
   shadow of its whole rock: a `root` casts a long tapering tail under a low sun, a `flat` only its rim; the ground right
   beneath is shaded from above yet lit from the side through the gap under the root; and the penumbra widens with the
   distance from the underside, so a higher island's shadow is softer (§8.4 (c)'s law). An island is never written into
   the ground's surface layer as a column, whose shadow would start at the footprint's edge and lose the gap and the
   profile (J-V5.15).
2. **The sky surface layer** (§8.4 (f); J-V5.16). Where an island's drawn land face touches a tile, the tile worker rasters
   that tile's sky marks into a second base and a second surface layer (the island's terrain at its datum, its roofs,
   towers and crowns), each with its max-height pyramid. The light pass lights the sky base over the sky surface layer — its
   rays reading the ground's pyramids, the other islands' slabs and its own island's surface — and the ground base over the
   ground surface layer with the whole slab list; then composes: `opaque`, the lit sky over its coverage; `ghost`, the lit
   sky × (1 − `ghostAlpha`) over the lit ground × `ghostAlpha`; `offset`, the lit ground everywhere and the lit sky over its
   displaced coverage. The CPU reference and the GPU pass run the same law. A tile no island's land touches takes no second
   base, but it is re-lit where an island's shadow falls on it — the shadow reaches up to 8 × the island's height from its
   footprint. **The global light's window** reads the surface layers' own top, without the slabs, and each slab whose
   shadow sweep crosses the ray's plan is tested exactly over its own reach (§8.4 (c), §8.1's `surfaceLayerTopCm`; file f
   item 416; J-V5.56), so an island lengthens no ground ray's window; a tile culls the slabs whose sweep's bounding box
   misses it. A degenerate tier ring drops its slab.
3. **Rung 3** (the vector rung): the island's shadow is the union over its underside tiers of each tier projected in the
   **`prism` form** — its ring swept along the sun vector from its underside's offset `b · c` to its top's `t · c`, then
   unioned — whatever `vector.projected` says for other casters, since an island is a floating solid (J-V5.55); the rim
   slab sweeps from its base to the surface top. So a `root`'s thin lower tiers join into one tapering tail instead of a
   row of beads. Only when §8.4's rung-3 budget fallback fires is the `drop` form used, and then the tiers are subdivided
   so that no tier's sweep `(t − b) · c` exceeds its ring's inradius, which keeps successive drops overlapping.
4. **The cursor sun under an island** (J-V5.14). The cursor sun's height is floored by §8.4 (d) at 1.5 × the list's
   `surfaceTopCm` above the view's ground whenever the view draws the sky layer (visible, or Sky the view's working
   layer, §8.4) and the document holds an island that is not fallen — whatever is in view — so no sun ever stands below
   a floating island and panning never changes `H`: it moves with the zoom alone; the path and fixed suns are
   unchanged.
5. **The picture and the model agree.** The light pass's shadow (from the rough tiers, at any sun) and the model's strip
   (from the smooth tiers, at the sampler's fixed suns, V05 §3.19) read one solid: under the path sun set to the equinox at
   a sample's hour, the style's `sun.latitudeDeg` set to the site latitude, the rung-3 shadow of the smooth tiers on flat
   ground covers exactly the cells the strip marks for that sample, within one field cell at the boundary (T-V5-20) — so
   the shade map and the drawn shadow never disagree about where an island's shade falls.
=== END ===

=== REPLACE ### 5.4 Labels ===
### 5.4 Labels

The island's `quarter` label draws at the city band along its long axis (§9.3's area rule on its land face), its
districts' labels from the district band, an institution's `landmark` label, a landfall's `place` label; accesses carry
no label, and neither does a strip (the shade map view's legend names the islands). Candidates of sky entities are held in
the island's local frame and translated by S14 (§9.1; file f item 415). §9.2's candidate set: sky rows only while the
view draws the sky layer (visible, or Sky the view's working layer, §8.4); under `opaque`, a ground row whose anchor
lies inside a visible island's drawn land face is no candidate; under `ghost` both are candidates, the sky rows at 1.5
× their priority; under `offset`, sky candidates at their displaced positions at the stop.
=== END ===

=== REPLACE ### 5.6 Find on Sky (item 120, the sky's part; J-V5.89) ===
### 5.6 Find on Sky (item 120, the sky's part; J-V5.89)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the gaps
switch), outside the document, its hash and the log, kept across bands, layers, weeks, epochs and edits until **Clear**
or the panel's close. The panel, the type-ahead, the chip grid, the results and the `live.find` overlay provider are
V09's; the veil, halo, outline, pin and count-bubble rows §8.2's; the gazetteer's class counts and its match listing by
class, area and layer §11.2's, under knowledge admission at the view's effective key (item 120 (h)) and at its drawn
week (§2.9's `week`; §11.2's *At a drawn week*). This section states what the sky offers and how a match on an island
reads.
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
   is never lost, and Go there makes Sky the working layer, which the view draws whatever its visibility (§8.4), no
   event sent (item 120 (a)).
4. **Show gaps** (item 120 (i)). On an island Show gaps' units are V01 §5.4 (3)'s `gapUnits` over the island's arena,
   restating none: its districts for a class with no coverage row or a row counted by district or neighbourhood; the
   whole island as one unit for a row counted by walking radius (V01 §3.16; the route to the ground passes every walking
   radius, V05 §3.5 (3)), so a member on the island serves every residential plot of it, a member beneath it on the
   ground none; and V01's per-plot `households` reading over the island's plots for a row counted by households — each
   unit with no member of the class outlined dashed along its land's edge and labelled "none here", a per-plot row's
   gap the unserved plots of each district as V01 §5.4 (3) draws it. A class `IslandRule.carry.never` excludes reads as
   any gap; the clerk's why names the carry rule (V05 §4.5).
5. **Over time, edits and knowledge** (item 120 (f), (h)). Every commit, regenerate, undo, epoch and change of the drawn
   week (§2.9's `week`) re-evaluates the chips: a raised or declared island's matches glow in its commit, a moved
   island's glow moves with it, a fallen island's go dark with its landfall then offered on Ground, and a removed island
   offers nothing. At a drawn week whose frame is not the head (V06 §3.15.2), an island's matches, glow, pins, ghost
   pins and gaps are §11.2's listing at that week, each drawn at its island's anchor in that frame. A `secret` access's
   landing yards, and a concealed use or institution on an island, are never suggested, counted, glowed or pinned under
   a key that withholds them (V05 §5.5's *Knowledge*; §11.2).
6. **Exports and cost** (item 120 (i), (j)). A picture export draws Find on the sky layer as shown (V05 §5.5); the
   islands' entities join `live.find`'s index, rebuilt once per commit and at each change of the drawn week (V09
   §4.21.10 (7)), and the overlay never re-renders the sky base — V05 §6's Find row.
=== END ===

=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

All PLAUSIBLE until M6-sky measures them (V05 §8), on §12.1's reference machine; the sky is off on the one-click path, so
§12.3–§12.5's laws are unchanged there. The rows are the targets; the comfort level below binds every one-time wait the
sky takes part in (item 119).

| work | CITY, three islands | METROPOLIS, three islands | basis |
|---|---|---|---|
| S7b (5): `S_town`, slots, reasons, fills | ≤ 3 ms | ≤ 5 ms | one mean over ≈ 24 000 / 62 000 field cells; ≤ 100 fill batches per slot |
| S7b (5): outlines and placement | ≤ 8 ms | ≤ 20 ms | the 64 m class raster once (≈ 6 000 / 15 600 cells); ≈ 15 600 / 40 000 candidates × ≤ 30 / 60 outline cells |
| S7b (5): the reachability transform (V05 §3.7 (2)) | ≤ 0.5 ms | ≤ 1 ms | one two-pass chamfer transform over the class raster, the raised parts' piers, dilated deck plans, deck faces and any landfall's members rasterised into it once (≤ 40 raised parts at METROPOLIS); one read per rim cell of a candidate |
| SKY, per island | ≤ 7 ms | ≤ 10 ms | one L0 and one L1 batch; terrain ≈ 4 000–16 000 cells and `hydro` ≈ 1 700–6 500 on a 520–1 010 m frame (a disc to a grown spindle, V05 §3.8 (1)); the river; the claim search (≤ 2 000 sites at 10 m, each an O(1) fit and the crypt test); the ground landing claims |
| SKY: the island's gradient field (V05 §3.11) | ≤ 0.5 ms | ≤ 1 ms | ≤ 200 / 400 lattice cells: two ranks, one sort, the band map, ε and the three-box blur |
| the unit run, per island (volume 1's rate) | ≈ 8–12 ms, on the generation worker concurrent with the pool | ≈ 12–18 ms | ≤ 3 districts' worth, ≈ 2–5 % of the town's plots |
| SKY: the ground reference and the altitude, per island | ≤ 1 ms | ≤ 1 ms | ≤ 300 / 800 field cells under the projected solid, each a terrain read and a ceiling from the placed casters and the allocated tower rows |
| field pass 2: the strips onto the ground, per island (and per epoch) | ≤ 4 ms | ≤ 6 ms | ≈ 4 600 cell-sample tier walks at METROPOLIS's largest island (the low samples' long sweeps dominate), each ≤ 7 tiers × ≤ 20 steps of O(1) mask reads, most ending at the first hit, after the corridor's O(1) pre-test per cell (V05 §3.19 (5)); ring masks ≤ 60 000 / 160 000 bits, built once from `shadeBasis`; measured on the flat B-CITY fixtures and on a mountainous METROPOLIS fixture (relief class `mountainous`, island over a valley) |
| SKY's last step: strips onto islands and `shadeSky` | ≤ 1 ms | ≤ 1 ms | ≤ 500 lattice cells per receiving island, only under a higher island |
| the route distance (V05 §3.20) | ≤ + 5 % of the unit run's S10b and of the pooled S10b of the districts holding a landing | same | ≤ 9 admitted accesses × 3 raster reads per pull that crosses arenas |
| SKY-F | ≤ 3 ms | ≤ 4 ms | the clearance check over the projected faces; ≤ 60 lights per island |
| **the model's critical path** | **+ ≤ 55 ms p50, ≤ 68 ms p95** | **+ ≤ 84 ms p50, ≤ 104 ms p95** | the unit runs hidden by the pool while the generation worker's concurrent work (hinterland unit + islands) stays below the pooled time; the ground's work falls by the carried share |
| S14, per island | ≤ 4 ms, ≤ 5 000 marks | ≤ 6 ms | the district rate on its fabric plus rim, shadow, access and slab records (≤ 7 slabs, ≤ 256 vertices each) |
| rendering, a tile an island covers | ≤ + 30 % of that tile's raster and light-pass time | same | the second base and surface layer (V05 §5.3) |
| rendering, the light pass on tiles no island's land covers | ≤ + 5 % against the same map without islands | ≤ + 5 % with three islands | the window without slabs and the per-tile slab cull; measured at P3; **fallback:** cull the slabs per tile by the exact union of their shadow sweeps (not the bounding box), re-measured |
| `setAttr` altitude, occlusion, underside, name | ≤ 5 ms | ≤ 5 ms | the record, a marks delta and a slab delta |
| a move | ≤ 65 ms | ≤ 70 ms | 5 ms plus two post-build placements (§12.6's 30 ms each) |
| a resize, a rim reshape (J-V5.81) | ≤ 5 ms + §12.6's scoped regeneration of each receiving district and of the district whose institution claim is re-searched where it receives no face (at most k ≤ 3 in all; V01 §6's sky row) + §12.6's scoped-regeneration law once over the plots the event re-cuts outside those districts (each re-claimed yard's covered plots by §7.3's local operator; a shrink's or an inward stretch's cleared and re-cut plots, §4.7 S10 (7)) + §12.6's 30 ms per re-claimed landing yard's top placement (`placeAt`, one per access; a reshape's on the moved stretch's yards only) + §12.6's 30 ms per re-landed foot's placement | same | the buffer bisection (≤ 12 steps), one island L1 batch re-laying the strip and yards, the claim re-search (≤ 2 000 sites at 10 m, SKY's rate) only where the claim no longer fits; a yard's 12 × 14 m touches ≤ 3 plots, a shrink's re-cut plots those its eroded band and re-laid strip line cross; volume 1's `plantRimWalk` once (two `Greenery` records); volume 6 sums its century from this row by citation (V06 §6.2) |
| New random on an island | ≤ 40 ms | ≤ 55 ms | SKY plus its unit run |
| `placeSkyAccess`, an access `delete` | ≤ 35 ms | ≤ 40 ms | an island L1 batch, a local re-derive and one placement |
| declaring an island after generation | ≤ 120 ms | ≤ 160 ms | the fill with its relocations, SKY, the unit run |
| `fallIsland` | ≤ 80 ms | ≤ 110 ms | relocations, demolitions, the archive, and ≤ 30 ms per other island's re-landed access |
| `IslandEpochStep`, per island | ≤ 2 ms plus its conversions at the rows above | same | the epoch's strips are the field pass 2 row |
| `sky.clearance`, per island and epoch (V05 §3.15 (7)) | ≤ 1 ms | ≤ 1 ms | the epoch scope's elements under the projected solid (≤ 300 / 800 field cells), each a footprint test and a top read; no geometry written |
| `skyAccessObstacles` and its callers' tests | ≤ 0.15 ms per call | same | ≤ 27 entries at the defaults (V05 §2.3b); the raised-way solver tests each candidate span against them in O(entries), inside its own budget (the base's) |
| the shade map view's pending strip after an island edit | ≤ the field pass 2 row, computed only while that view is shown | same | never on the edit's own path |
| Update shade now | ≤ the field pass 2 row for one island + the field's recomputation over the two windows (≤ 2 ms) + §12.6's rate for the blocks it re-derives | same | a scoped evaluation, never a whole pass |
| the season switch, on a tile an island covers (item 117) | within §12.5's re-skin budget (R12-30) for the sky base and surface layer with the ground's; the island's leaf cover and ice inside R12-30's 20 % of the tile's raster time | same | a re-skin of the sky marks' `season` column and the sky surface layer's light at the week's view sun; no S14 re-emit, no model work |
| the pennants, on a tile an island covers (item 118) | inside R12-30's 20 % with the ground's decorations, made lazily per visible tile (§12.5) | same | `live.festival`'s run on the rim and the pennants at ≤ 9 landing tops an island (`accessCount.max` + `accessCount.handMax`): a few dozen glyphs an island at V11's `SKY` row |
| Find on Sky (item 120) | inside item 120 (j)'s overlay budget (§12.5: suggestions ≈ 50 ms of a key, a chip's glow ≈ 100 ms of the click) with three islands at the METROPOLIS cap | same | the islands' entities in `live.find`'s index, rebuilt once per commit and at each change of the drawn week (≈ 2–5 % of the town's plots, the unit-run row's basis); an overlay above the sky base, which is never re-rendered |
| memory | ≤ 5.2 MB for three islands (the strips ≤ 30 KB each, `shadeBasis` ≤ 2.5 KB each) | ≤ 9.3 MB (≤ 60 KB each; bases ≤ 2.5 KB each) | an island's arena ≈ 0.5 MB per district's worth; its rasters ≤ 0.1 MB; the sky surface layers only on covered tile positions, inside §8.8's canvas budget B |
| document | ≤ §2.9's 320 B per island building, plus ≤ 2 KB per island record and ≤ 2.5 KB for its `shadeBasis` (the rim copy ≤ 256 vertices × 8 B, the rest ≤ 0.5 KB) | same | |

The strip rows assume the sampler's default of one point per cell; at four points per cell (§4.5's `daylight.pointsPerCell`
fallback) they scale by four — ≤ 16 ms at CITY and ≤ 24 ms at METROPOLIS per island — and the memory row's strips by two
and a half (two bytes per cell become five). The chain rule of V05 §3.20 (9) and the node term add no measurable work: the
one is a filter on the sky fill and the route reads already costed, the other one addend per evaluation. **Pre-decided
fallbacks:** the strip row missed → `shade.stepM` 8 → 16 m and `shade.ringMaskM` 4 → 8 m, re-measured (T-V5-20's
one-cell agreement re-checked), then the samples' reach cap for the strips 8 → 4, recorded as a declared shift of the term;
the model rows missed at M6-sky → the placement lattice coarsens 40 → 80 m and the island units join the pool as units
(pool size ≥ 1), re-measured; the rendering row missed → the sky surface layer at half resolution (rung 2's method), then
rung 3 for the sky base only, reported in the view telemetry; any other row missed is re-declared at its measured value as
a target miss inside the comfort level (D-18) — a one-time wait past the comfort level is never declared: its path changes
first (§12.10's R12-31).

**The targets and the comfort level** (item 119, the sky's part; J-V5.88). The rows above are the targets — as fast as
possible, the build pressing every one toward its figure (item 119 (a)). Every one-time wait the sky takes part in
completes within §12.1's comfort level — ten seconds of total time from the click to the complete result on §12.1's
reference hardware, at CITY and METROPOLIS with three islands, from each rung's bottom to the population cap — the island
rows above being its parts:
* a generation, and a regenerate or Re-derive from S7b with islands — the model's critical path with S14's sky marks and
  the first map's sky tiles;
* declaring an island after generation, and `fallIsland` by hand — each with its relocations, its scoped re-derivation
  and its redraw;
* opening a document with islands, the island-basis migration step included (§7.5, file f item 274), and a dossier
  change that reaches the islands (DR27);
* an `advance` whose epochs run the island laws — the island events an epoch can run priced into V06 §6.8's estimate from
  this section's resize row (`epoch.islandMs`, `epoch.handAccessMs`), so the `advance` as a whole stays inside the
  comfort level, in total (item 119 (a2); J132);
* an export with the sky layer, in every format and size the export dialog offers (§12.1).
A wait past about one second shows its progress, SKY and the islands' unit runs posting as stages (§11.2's `Progress`;
V09 §4.21.9), never an empty screen (item 119 (c)). A row runs slower than its target only for a recorded measured gain
inside the comfort level, as its `perf.qualitySpend` row (V11 §3.25.8; none ships for a sky stage) (item 119 (b)). The
interactive rows — `setAttr`, a move, a resize and a rim reshape, New random on an island, `placeSkyAccess` and an
access `delete`, Update shade now, the pending strip, the season and festival switches and Find on Sky — are
interaction budgets and keep their figures (item 119 (d)). The low tier aims at the same ten seconds, a size it cannot
reach declared per device (item 119 (e)). T-V5-18 measures the comfort level at every island rung.
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
  ground's streets and plots added or removed beyond the tombstoned deck plots' lines. **A raised gate** (T114-3's
  landfall clause): on a fixture whose footprint covers a viaduct's crossing station on a raised gate, the station's
  stretch is `breached` by the wall row and the spans either side of it `ruined` with it, the station's `supports` entry
  carrying no `state` and `members` holding no `{ raised, support }` for it; then the deck's repair (§2.7's support step
  (3)), by hand and, on a second run, by V06 §3.19.2 (5) at the next epoch: each `repairRaised` beside the station
  repairs its stretch first by `repairWall` in the same batch — the stretch repaired with the deck, never a deck on a
  `breached` run at any commit — and the landfall's undo restores the stretch and both spans.
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
  nothing withheld surfaces in a suggestion, count, glow, pin or ghost pin; (f) (T120-4) the chips survive every band
  and layer change and a raise, a move (the glow moving with the island), a fall (its matches dark, its landfall offered
  on Ground), an `advance` with its epochs, an undo, a redo, a regenerate, a load and a migration, each match set equal to a
  fresh evaluation there, and a chip whose last match goes — an island institution's after its island falls — stays at
  count 0, dark; (g) Show gaps outlines exactly V01 §5.4 (3)'s `gapUnits` on the islands as V05 §5.6 (4) reads them —
  each island district for a class with no coverage row or a row counted by district or neighbourhood; under a
  walking-radius row every residential plot of an island holding no member, whatever the ground beneath holds, and none
  of one holding a member; under a households row each district's unserved plots by V01's per-plot reading — a class
  `IslandRule.carry.never` excludes among them; (h) item 120 (j)'s suggestion and glow timings hold with three islands at
  the METROPOLIS cap (V05 §6's Find row); (i) at a drawn week whose frame is not the head (V05 §5.6 (5)), on (f)'s
  fixture after an `advance` whose epochs raise one island and resize another, then a hand move of one island and
  the removal of another, and on T-V5-14's falling CITY, each scrubbed to a week before those epochs: every sky
  match, glow, pin, ghost pin and gap unit those of §11.2's listing at that week, drawn on its island's land and at
  its anchor in that frame — the raised island offering none, the moved one's at its former anchor, the removed one's
  offered, and the fallen island's on Sky as the frame holds it, never its landfall on Ground; the head's reading
  back when the scrub returns to the head.

**Parity.** No reference has islands (II.6 (8)), so no parity number binds them. The nearest look is Neighbourhood's lone
patch — its own ground tone and a drop shadow marking its extent on an empty field (`research/findings/vg-ng-devlogs.md`
§B3.5) — so M6-sky's sitting is V12 §3.9.1's `PanelSpec` for M6-sky, a descriptive NG set (X-V12-4): five island
close-ups in `hatched` beside five Neighbourhood patches, rated for "reads as a floating patch" — information for the
owner, never a gate.
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
| J-V5.14 | Chose to floor the cursor sun's height at 1.5 × the display list's top whenever the view draws the sky layer (visible, or Sky the view's working layer) and the document holds an island that is not fallen, over letting the sun stand below an island at close zooms or flooring it only while an island is in view, because a sun below a floating island casts its shadow upward and reads as an error, and a floor that switched on as an island panned into view would jolt every shadow on screen mid-pan. |
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
