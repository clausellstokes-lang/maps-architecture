# Repair round 2 — V01 (neighbourhoods, stage 2) — lane coherence/repair-V01-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V01-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 27.5–36.75 pw (was 27.25–36.25) — R2-06 (c); V01 §8.2's W10 gains item 122's disaster units (0.5–1 → 0.75–1.5 pw).
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; one FILE line routes every block to docs/volumes/V01-neighbourhoods.md. Target: V01 sha256 1480993bec654309…
# (assemble-r1's install, live and unchanged at landing); base docs/ARCHITECTURE.md 137ecc0e4fe12c44… (no round-2
# assemble has run). Each block body is the live subsection with count-asserted substitutions (work/repair-V01-r2/gen.py
# over edits_a.py and edits_b.py: 85 substitutions, each applied exactly once); every untouched line is verbatim.
# Blocks: 28 REPLACE — ## 0; ### 1.1, 1.2, 1.3, 1b; ### 2.1, 2.2, 2.3, 2.4, 2.6, 2.7; ### 3.12, 3.14, 3.16; #### 3.17.3;
# ### 3.18; ### 4.5; #### 5.1.4; ### 5.3, 5.4; ## 6; ## 7; ### 8.1, 8.2, 8.3; ## 9; ## 11; ## 12. Ruling requests: 0.
# Binding rulings applied: adjudication-r2's R2-05, R2-06, R2-08, R2-10, R2-13, R2-26, R2-32, R2-34, R2-35, R2-36, R2-37
# (Part H · V01), with R2-09 kept (V01 registers no pin: T-V1-60 re-runs none) and R2-07 (V01's two owner-item lists are
# subsets, kept explicit and brought to item 122).
#
# PROGRESS
# - P0 brief read whole (13 issues; ROUND-2 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r2's TOC, Part H · V01
#   and R2-05, R2-06, R2-08, R2-10, R2-13, R2-26, R2-32, R2-34, R2-35, R2-36, R2-37 read whole: done
# - P1 issue sources, file g item 122 with (h)–(i), the canon's routings (J135, J138) and its adjudication-r2 entry; the base
#   homes cited (live and the landed round-2 model, pipeline and determinism blocks: ConditionOverlay, crises, DR44,
#   RosterTables.crisis and *Crisis looks*, CalamityRef, Terrain.wind, LandUse); V02's, V06's and V09's landed round-2 text;
#   V06 §2.4's calamity table; rendering's in-progress crisis.place tag; every V01 section concerned, whole: done
# - P2 count-asserted edit set over the live V01 (work/repair-V01-r2/edits_a.py 43 edits, edits_b.py 42 edits): done
# - P3 blocks generated, applied on a copy, checks, result saved, LANDED: done
#
# ISSUES → WHERE FIXED (13 routed ids, 12 distinct defects; 12 FIXED in text — 11 defects and 1 new design; 0 INVALID; 0 parked)
#  VAF-R0S-04 (FIX per R2-13). §2.3: `DistrictContext.raised[].kind: RaisedKind /* §2.7 */` and
#        `WayNamingContext.raised?: RaisedKind /* §2.7: a raised way's kind, for naming.way's guard (V01 §3.7.2) */`.
#  VAF-R0S-15 = VPC-R1-11 (ONE FIX, R2-13; VAF-R0S-15's text). §2.2: the `interface SquareQuotaRow { … }` line replaced by
#        "// SquareQuotaRow is §10.2's (the base table `squares.quota`, read by S7b (3) from M2b and by S9b); this volume
#        authors its default rows (V01 §3.5.2; V11 registry row 91)", the two comment lines above kept. §10.2's declaration
#        holds every field and comment V01's line held (band, haPer1000, kind factor) — nothing lost.
#  VAF-R1T-05 (FIX per R2-13). §2.4 opens "…are II.1's (item 539), with their fields' presence rules and the derived mode
#        (J-V1.3); this volume's unit runner, close-ups and SKY-F hand-over fill them (V01 §3.8–V01 §3.11)"; the restated
#        presence, mode and reason sentences deleted — each is II.1's (the request's comments, the mode comment, the result's
#        `districts` and `hoodPins` comments, `SeamReport.landingsReached`), checked line by line. The callers sentence's
#        stale "the three services of V01 §3.16" reads "the services of V01 §3.16 by the callers each names there".
#  VAF-R1T-07 (FIX per R2-32: Find lands at M5). T-V1-59 reads "From M5, Find's milestone (§16's M5 row), on the services and
#        on V09's app harness with V09's Find panel"; §8.2's W11: "T-V1-59 Find's, at M5 (Find's milestone)…"; `findAreas`
#        and `gapUnits` stay in W10 at M5.
#  G122-V01 (NEW DESIGN per R2-37 (4)–(5), R2-36). Item 122's V01 part, a look only:
#        * `disasterSource(doc, overlay, key)` / `disasterDistricts(doc, overlay, key)` (= `.units`) at §3.16 with
#          `DisasterUnit` and `DisasterSource` at §2.3 — whole districts (R2-37 (4); no per-building share); (1) the units:
#          ground part-0 districts the key admits, the hinterland pseudo-district never; at THORP–VILLAGE V07's units (its
#          ends, or an end-less thorp's toft groups) in the same shape, the same rule; (2) the overlay's calamity: the
#          committed `epoch` events' `CalamityRef` whose week lies in the overlay's weeks (latest; ties by severity band, id),
#          its pattern by V06 §2.4's calamity table (fire, flood, else scatter); (3) the targets matched to a district,
#          quarter or `HoodPlace` (R2-37 (4)), a withheld one skipped unreported, an unmatched one reported in the view
#          telemetry, the pattern filling the share; (4) one strike order (matched first, then fire downwind over district
#          adjacency / flood lowest from the water / scatter by keyed uniforms) on render-key draws `RH32('crisis.place', …,
#          H32(condition id))` — a preview's on H32('disaster'); (5) the share from the `disaster` row's `scale` at the rung
#          and severity (or `previewSeverity`), k ≥ 1 while the share > 0, never fewer than the matched units — a prefix,
#          so monotone in severity and the same in every week, view and export.
#        * `campLand(doc)` at §3.16 (R2-37 (5)): the hinterland's `commons` and fallow faces within `camp.reachM` (a new
#          `hood.constants` column, 600 m, §3.14) of the built edge and the open verges of the arterials within that reach;
#          never another kind, a gate's passage or an under-deck strip; keep-outs cut by §10.2 (d)'s placement; empty for a
#          standalone neighbourhood document; lands at M3b with item 122's base parts (§8.1; J-V1.105).
#        * Wiring and records: §0's plain words; §1.1 item 14; §1.2's g-item-122 hook row; §1.3's out-of-scope bullet; §1b's
#          two wiring rows, the dossier row and the dossier-change sentence; §2.7's derived list; §3.12 (no concern);
#          §3.18 (b) village row, (c) Show crises row, (e) two mechanism rows (no unit; one unit; the hinterland pseudo-
#          district; severity 0 and 1; a target naming no place; a withheld target; several crises; the aftermath arriving;
#          a standalone document; no common land — the verges; an island town), (f) three combinations; §5.1.4 (V02 §5.7's
#          damage over the `hatched` hatch); §5.3 (exports); §5.4 (6) (a disaster look's place in Find — the Find listing);
#          §6's crisis line (lazy per visible tile, an interaction, item 119 (d)); T-V1-60; §8.1 M3b, §8.2 W10/W11, §8.3;
#          J-V1.104, J-V1.105; §11's list; §12. Every verifier version is met: agree-fabric (units by targets then pattern;
#          camp land; test), agree-time (a draw-free service over committed state — named `disasterSource` per R2-37, not
#          `crisisUnits`; the camp land read by §10.2; its three edges; a T-V1 test with the hash unchanged), edges-world (the
#          district as unit; the share by severity; the pattern; the targets; camp land; the three edges), vol-V01-V02
#          (1)–(9) as listed above, its per-building "keyed share" overridden by R2-37 (4), its no-op-pin clause met by
#          T-V1-60 (f)'s "no call with no condition and no preview" — the `item122.crises` pin stays V12's (R2-09's list
#          names no V01 registration).
#  VAH-r1-12 (FIX per R2-10). §1.2's hook row split into "| §11.2 | `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull`
#        with V11's families |" and "| V10 §2.13 | `WhyProvider` |"; §4.5's "(`WhyPull.family`, §11.2)". R2-10's "every
#        citation of a moved type" also applied at §4.5's three field citations: "§11.2's `WhyAnswer.evaluated.drifted`",
#        "§11.2's `WhyAnswer.members`", "§11.2's `WhyAnswer.closure`" (they read "volume 10's").
#  VAP-r1-07 (FIX per R2-08). T-V1-29: "**item 119's one-time waits** (V01 §6; J-V1.103; takes T119-2 and T119-3's stage-2
#        clauses)".
#  VM-R1T-03 (FIX per R2-13). §2.6 reads "`HoodRecipe` (`Recipe.hood`, item 272) is §2.9's; its rules are V01 §3.10.1's",
#        the layers note kept. §2.9's declaration (model, landed round 2) carries every field and comment V01's held —
#        checked field by field. The pointers that named V01 §2.6 as HoodRecipe's home follow it: §1.2's §2.9 row, §1b's
#        `HoodRecipe` and `HoodRecipe.edges.slope` rows; §1b's `HoodKindRow` row now points at its declaration, V01 §2.2.
#  VM-R1T-04 (FIX). §2.1: "`FabricStrategyId` (a registered fabric: `bent-cut`, a `hood.templates` row key or V07's
#        `village-ways`), `BlockKind`, `SquareType`, `SeamRun` and `TypedBoundary` are declared in §2.5".
#  VV12-r1-03 (FIX per R2-34). §3.16's `catchmentOf` reads `walk`, `households`, `parish` (and `district`, `settlement`) as
#        V11 §2.3's `CoverageSpec` defines them, cited; it keeps only `neighbourhood` as `district` (J-V1.35), `underDistance`
#        for the disc's radius underground, a sky island one `walk` unit, and a district with no residential plot holding no
#        unit. Dependents: §5.4 (3)'s parish line and *Evaluation* (one pass per member over the 16 m raster per radius in
#        use; underground by `underDistance`; the island whole), §6's services and Show-gaps lines with their fallbacks,
#        J-V1.102's reason, T-V1-42 (one count of served: `gapUnits`' unserved plots equal V12 §3.6's `servedShare` plot by
#        plot on `walk`, `households`, `parish`, `district`) and T-V1-59 (b); also §2.3's signature comment and parts table
#        (no `catchmentOf('walk')` row reads ways now), §1b's row, §3.18's services row, §12's Find-lines clause.
#  VV12-r1-04 (FIX). §0: "making a standalone neighbourhood document".
#  VV1112-r1-05 (FIX per R2-10). §2.3: `step: LadderStep /* V11 §2.6 */`.
#
# RECEIVING ENDS WRITTEN THIS ROUND (R2-05)
#  * R2-26 (d): §3.14 drops `raised.stripMarginM` (its row keeps `raised.clearWidthM` and `raised.squareDeg`) and lists
#    `raisedWays.structure`'s `stripMarginM` among the cited cells; §3.17.3 (2) reads "`raisedWays.structure.stripMarginM`
#    (V11 §3.24.2) each side, §4.6 S8's one strip"; §12's PLAUSIBLE list drops the old key. No other V01 site named it.
#  * R2-35 / R2-08: T-V1-59's head "takes T120-2 and T120-4's town clauses", clause (a) "(T120-2's town clause)" with each
#    area chip's matches equal to §11.2's gazetteer listing, clause (c) "(T120-4's town clause)".
#  * R2-06 (c): the §8 total in the first lines above; J-V1.26 now cites V01 §8.2's total instead of restating the figure.
#  * R2-32: T-V1-59 at M5 (Find's milestone), W11 as written.
#  * X35 (V02 r2's hand-off to V01): `disasterDistricts` answers a preview (`overlay` null, keyed on H32('disaster')), and
#    the calamity's type V02 §5.7 (4) reads is `disasterSource(…).calamity.type`, its fire flavour `pattern === 'fire'`.
#
# HAND-OFFS for round 3's verifiers (R2-05 (3): cross-unit ends no ruling names; V01's side is written)
#  - V07: its THORP–VILLAGE units for `disasterSource` in V01 §2.3's `DisasterUnit` shape — its `VillageEnd`s, or an
#    end-less thorp's contiguous toft groups — each `id` an entity's whose render key keys the draws; `campLand` acts at the
#    village rungs too (V01 §3.18 (b)).
#  - V02: §5.7 (4)'s "the calamity's type V01's `disasterDistricts` reads for its pattern" is `disasterSource(…).calamity`'s
#    `type` / `.pattern` (V01 §2.3); `ExteriorDamage.look.kind` may read either.
#  - pipeline (§10.2 *Crisis looks* (d)): `affectedQuarter` takes `disasterSource(doc, overlay, key).matched[0]` for a
#    quarantine overlay (V01 §3.16); `neighbourhoods` passes `null` for a preview; `campLand(doc)`'s faces are V01 §3.16's.
#  - rendering: V01's draws use §8.1's render tag `crisis.place` (rendering's round-2 patch adds it); §8.2's `disaster` row
#    "by its pattern" reads `DisasterSource.pattern`; V01 §6's crisis line sits in §12.5's lazy per-tile crisis budget.
#  - V08: V01 associates a disaster overlay with its calamity by week among the committed `epoch` events' `CalamityRef`s
#    (V01 §3.16 (2)), the targets as the use ids V08 §3.6 resolves; V08's item-122 part ("the calamities' targets read for
#    the disaster look") should say the same.
#  - V09: the crisis card's **Show** and Find's `crises` **Go to** for a disaster look frame V01 §5.4 (6)'s shapes.
#  - scope: §16's M5 row and V01's price read V01 §8.2's 27.5–36.75 (R2-06 (b)); §16's M3b item-122 line absorbs V01's
#    `campLand` (≈ 0.25 pw, V01 §8.1); scope's take-over table needs no V01 row for item 122 (T-V1-60 takes no base bar).
#  - V11: `hood.constants` (registry row 62) gains the column `camp.reachM` (number · m, [100, 3 000], not calibratable).
#
# CHECKS (receipts in work/repair-V01-r2/)
#  - Dry run: apply-blocks.py on a copy of the live V01 — 28 found, 28 applied, 0 skipped; audit 0 not OK; headings 123 →
#    123; fences balanced (14 → 12 fence lines: §2.6's code block replaced by its citation); title block unchanged;
#    output == V01.new.md byte for byte (sha256 fb2d14965bdcae74…); the rationale untouched.
#  - refcheck.py over the added lines: 74 section references, 0 unresolved (V01 against V01.new.md; volumes against live
#    text plus their landed round-2 repair files; the base against live plus the landed round-2 base files); every T-V1 and
#    J-V1 id named defined exactly once. Forward citations, written this round by their owners: T120-2 and T120-4 (scope,
#    R2-35), §8.1's `crisis.place` and §12.5's crisis budget (rendering).
#  - doc_checks.py (PROVISIONAL — WARNING: reference corpus INCOMPLETE, missing captures, research/patreon, research/devlogs,
#    research/ftg-docs, research/external; not authoritative): C1 0, C2 0, C4 2 hits 0 unreviewed, S1 0 — as live; C3 391 →
#    401 hits (12 new generic-English collisions, e.g. "just outside the town it is", "the owner asked for a", "units in the
#    same shape", none an identifier, grammar, word list, palette or table); S2 3 → 13 unreviewed — the 10 new are all
#    `V02 §5.7`, a volume pointer S2 checks only against base headings, resolving in V02's landed round-2 §5.7.
#  - Deferral words, retired terms ("standalone neighbourhood" without "document"), phone clauses (item 126), adjudication
#    ids in design text: 0 in the new V01.
#
# WORDS (principle (9)'s shrink report). V01 79 160 → 83 025 words (wc -w; +3 865, +4.9 %). Removed: ≈ 320 words, all
#  RESTATEMENT (§2.4's II.1 rules, §2.6's HoodRecipe, §3.16's way-graph metric now V11 §2.3's, §6's walk and radii terms,
#  J-V1.26's price) — none from NARRATION, DUPLICATED MECHANISMS (the disaster rule is one rule over districts and V07's
#  units) or VERBOSE PROSE beyond those. Added: ≈ 4 190 words — ≈ 240 the issues' required clauses (T-V1-42's one count of
#  served, the T-V1-59 clauses, the §6 lines, J-V1.102's reason) and ≈ 3 950 item 122's new design, which the owner's rule
#  requires at build depth (records, rule, edges, budget, test, decisions). The unit grows: irreducible owner-item content,
#  not a defect (brief: "a unit shrinking by less than the band says what irreducible content holds it").
#
# ASSEMBLE NOTE: none — no text of V01's title block changes.

=== FILE docs/volumes/V01-neighbourhoods.md ===

=== REPLACE ## 0 In plain words ===
## 0 In plain words

Stage 2 makes every part of a town open up into a detailed neighbourhood, the way watabou's Neighbourhood generator
draws one — rows of houses with hatched roofs, courts behind them, wells, fountains and big trees, small squares, street
names — except that ours is a close-up of a real part of a real town, so its streets are the town's streets and its
edges fit its neighbours exactly.

**How it feels to use.** You click a district; the view glides in and the district becomes a neighbourhood: hand-inked
roof hatching, every lane named, each court with its well or tree, the little squares with a cross, a statue or a trough,
and the district's name in the emptiest corner like a title. Nothing about the town changes — the houses are the same
houses, drawn closer — so closing and reopening a district never alters the town. A small panel shows the
neighbourhood's name, what it has become (a craftsmen's, merchants' or religious quarter …) and a row of layout cards:
**Organic** (the town's own lanes), **Main street**, **Square**, **Rings**, and the ones the place suggests
(**Quayside** by the water, **Wall-side** under the wall, **Crossroads** at a busy junction, **Around the church** where
a church stands, **Bridgehead** at a bridge, **Green** round a park). Picking a card shows a faint preview with what
would change; accepting it re-lays that one district and leaves the neighbours exactly as they were. **New look** gives
the same layout with a new seed; locks keep what you like. Everything is undoable, and every change made inside the
close-up is saved with the town. Nothing you ask for is refused unless the dossier or a lock forbids it: a layout that
does not fit, a value past its range, or a square where the neighbours are already full is bent to the nearest thing
that works, and one line says what happened ("14 households move to the Weavers' quarter").

**The town itself is made of neighbourhoods.** At generation each district chooses its layout from what it will hold
and where it lies — a trading quarter on a through-road may get a main street, a quarter round a great church rings, a
harbour quarter a quay street; most keep the organic lanes. Its blocks then get their character: most are ordinary rows
of houses round courts; some small ones become squares — before a church, at a crossroads, at a bridgehead — some
greens, and in rich quarters a few whole blocks go to one great house with its yard. How many squares and greens a
district gets follows how many people live there and how well off they are. Before any street is drawn the town sets
aside the land each chosen layout needs — the square, the ring roads, the main street — so nobody loses a home to a
square: households that no longer fit move to a district with room, as the allocation already moves them.

**A standalone neighbourhood document.** From the start screen you can make a neighbourhood on its own, as Neighbourhood does:
pick a shape (or draw one), a size (small, medium or large — about 85, 700 or 1 050 houses, Neighbourhood's own sizes),
what kind of place it is, and whether it is leafy or has no church; one click gives a finished neighbourhood with no town
around it. Its outline follows its layout: a main-street neighbourhood is a long strip round its street, a square
neighbourhood sits round its square. It has no floating islands, sewers or undercity, no old quarry, no generated vaults
and no buried older town; a cave or ruin may lie under it, with a few squatters once someone has dug a way down, and at
most one catacomb. Floating islands use the same machinery: each island volume 5 builds is laid out as one to three
neighbourhoods on its own land, every landing reached by a street, with no roads in or out. A **Neighbourhood** preset
reproduces watabou's own rules exactly, so the side-by-side comparison compares like with like.

**The owner's rules (file g items 102–109), street by street.** Sunlight matters a little: a quarter in shadow — under a
cliff, behind the wall, under a floating island all morning — is a little less often laid out as a grand square or
rings, and its great houses take the sunnier blocks, so cheaper lodging and workshops gather in the shade. Everyday
services spread out: the neighbourhood you open is the unit the siting rules count, so "one apothecary per neighbourhood"
means one per district you can click, and a great house or a green is never put beside a tannery or a midden. Trades that
supply each other sit close at street scale; a trade whose steps cannot stand each other stretches along its road, the
smelly steps at the edge; a street full of one trade takes that trade's name — but no neighbourhood is ever assigned to a
trade: a quarter is named for it only when enough of it gathers there, or when the SettlementForge dossier or you say
so. When the dossier says "the smiths' quarter" or "the weavers' guild", the close-up shows that record's buildings, here
and elsewhere in town, each counted once. Where the wall ends on a cliff, a gorge, a marsh or the sea, the neighbourhood
treats that edge as a cliff or a shore, not as a wall. Cave mouths, sinkholes, collapsed shafts and the doors of ancient
ruins become small named places with a symbol; a cellar that broke into a cave shows its stair in the house's floor plan
— and a stair dug in a yard as a mark on the plot — only to those who know of it; a cave nobody has reached shows nothing
on the street. Catacomb doors appear only in cemeteries — a churchyard, a burial ground, a monastery's graves, a cemetery
outside the walls (opened by drawing round it) or, in a city, the surface head of an old quarry turned ossuary. Churches,
and always the cathedral, keep crypts in their basements, with no entrance of their own on the street: you go down from
inside the church. A great temple built solid in tiers is entered at its foot by its own door — straight into the crypt,
or into a cellar beside it and on into the crypt — drawn with the building; where a storeyed annex stands beside such a
temple, the way down is through the annex, into the cellar under it and through one door into the crypt (V03 §3.7.4).
Rebuilding a district never moves the cemetery a catacomb grows under.

**Terraces, arches and houses on the water (item 110).** On a hill a quarter can be laid in terraces: streets along the
slope a double row of houses apart, stairs climbing between them, and a retaining wall wherever the quarter's edge
stands well above the land below; a quarter over a dry ravine is terraced on both sides with a stair-stepped path down the
middle. A city may carry a road over a valley on arches, join two high quarters by a raised road, or bring water in on an
aqueduct; in a close-up you see the arches, the streets passing under them and no house beneath, and from the
neighbourhood's panel you can remove one the generator raised (it stays removed) or draw your own. Houses and shops on a
bridge, a mole or a jetty, and the towers and forts on a harbour mole, appear in the close-up of the quarter the bridge
or mole starts from. A stepped temple is drawn tier on tier, each tier casting its own shadow on the one below. In a
standalone neighbourhood document the Terraces card lays its streets on a hillside, so it always gives terraces.

**The look.** The hatched family (Neighbourhood's look, in our own colours) can draw the whole town: at city zoom simple
masses on warm paper; closer in, two-tone roofs; at neighbourhood zoom the full hatching, shadows, trees and cobbles; at
building zoom each roof face hatched and, once stage 3 exists, the plans. Once stage 3 draws the real roofs — valleys,
hips, towers — the hatching follows each roof face and stops at its edges.

**Finding things, and waiting (items 119 and 120).** Find, the map's filter view, can pick out a whole district,
neighbourhood or quarter: it lifts from the dimmed map and glows along its edge. Its **Show gaps** switch outlines the
parts of town that have none of what you are looking for (V01 §5.4). Opening a district stays as quick as it is; the
longer waits stage 2 adds once — generating a town, laying a new layout, making a standalone neighbourhood document —
finish within ten seconds and show their progress as they go (V01 §6).

**Crisis looks (item 122).** While the SettlementForge record says a disaster has struck, whole neighbourhoods are drawn
ruined — the ones the record names first, else as the disaster runs: a fire through neighbouring quarters downwind, a
flood over the low ground by the water, an earthquake here and there — more of them the worse it is; and the camps of
refugees, the sick or an army stand on the common and fallow land just outside the town. It is only a look: the town
itself is unchanged, and what the crisis leaves behind arrives through the town's own history (volume 6).
=== END ===

=== REPLACE ### 1.1 What this volume builds (to build depth) ===
### 1.1 What this volume builds (to build depth)

1. **The fabric machine** — `FabricStrategy` registrations for the four NG templates (`area` = the base's bent cut,
   `street`, `square`, `ring`) and seven context templates (`quay`, `wallside`, `crossroads`, `landmark`, `bridgehead`,
   `stepped`, `park`), all built from four seed primitives (a spine, a ring course, a plaza, a fan) laid in the district's
   **template face** before the base's bent cut runs on the rest (V01 §3.4).
2. **Fabric selection (S7c)** — the eager, town-wide rule that gives each district its fabric from its context and its
   **provisional character** (item 72's vector on the district's allocation before placement), so the character drives
   the template (V01 §3.2, V01 §3.3). S7c runs inside S7b (1), between its greedy pass and its reconcile, and the reconcile
   moves the households a template's land displaces, so the population stays whole (V01 §3.3.7).
3. **Block dispatch (S9b)** — the eager step that types every built block `ordinary`, `manor`, `square`, `green` or
   `yard` from quotas (typed squares per 1 000 inhabitants, the sub-block green quota, the manor-block share) and a
   weighted draw, its land accounted in the programme (V01 §3.5).
4. **Context features** — the per-district rules giving every waterfront, wall-side, sloping, bridge-end and gate district
   its feature (stage-2 feature S2's coverage matrix) (V01 §3.6).
5. **Local identities** — named local places (`HoodPlace`: squares, greens, yards, courts, openings), the way-naming context
   that makes local street names reflect the street, and the way-surface rule (V01 §3.7).
6. **The close-up** — the `refine` derivation (neighbourhood-tier pins, the hood title), its trigger, cache, staleness
   and persistence; the `replace` close-up as a model edit (V01 §3.8, V01 §3.9).
7. **The unit run** — the generation path for a close-up with no base under it: the standalone neighbourhood document
   and each sky island's districts (V01 §3.10), at generation and inside an island's raise, late declaration or New
   random (V01 §3.10.3 (6)), with the island river's bridges (V01 §3.10.3 (4)).
8. **Seams** — what stage 2 adds to II.1: template portals, the ring-radial stagger, the dispatch seam guard, the
   `SeamReport` computation (V01 §3.11).
9. **Editing, the `hatched` family at all four bands, labels and exports, budgets, tests and the M5 build plan**
   (V01 §4–§8).
10. **File g's neighbourhood parts** (each base mechanism cited to its item): item 102's shade in the context, the fabric
    weights, the manor siting and the close-up's pins (V01 §3.3.3, V01 §3.5.5, V01 §3.8.2); item 103 (f)'s catchment unit,
    `catchmentOf` and the EMITS / SENSITIVE-TO pushes in the dispatch, which runs after S10a (i) (V01 §3.5, V01 §3.16); items
    104 (h) (3) as revised by 107 (e) and 105 (a), (g), (i): the allocation-level supply links in χ̃ and the chains in the
    context, never a quarter assigned (V01 §3.2, V01 §3.3.3); item 108's QUARTER, GUILD and SIZE records reaching the identity,
    the dispatch, the panel and the title (V01 §3.5.12, V01 §4.5, V01 §5.2.1); item 106's barrier closure in the typed boundary
    and the wall-side reads (V01 §2.3, V01 §3.6); item 109's surface side — public openings as places and symbols, a symbol for
    every access opening on a ground face (a building's own access is its plan's head, volume 3), the undercity's parent
    district, the voids under a district, `districtsAbove` and `fabricSignature` (V01 §3.7.1, V01 §3.8.8, V01 §3.16) — and item
    109 (k) (2): catacomb entrances only on cemetery ground or a CITY / METROPOLIS quarry ossuary's surface head, crypts
    with no place or pin, the source cemetery a fixed input, the `blockLifted` notice, and the outline close-up that opens
    the hinterland's extramural cemeteries (V01 §3.7.1, V01 §3.8.9, V01 §3.9).
11. **The `NG` preset** — a zeroing parity preset whose entries select Neighbourhood's own rules, so the NG panel compares
    like with like (V01 §3.15; §7.6, item 584; item 23) — and **`hood.constants`**, the table every numeric rule of this
    volume reads (V01 §3.14; item 23, DEFINITION §5).
12. **Item 110's neighbourhood parts** (each base mechanism cited to its item): the terrace state and the `stepped` row's
    contour series with a ravine's two flanks; the inputs of the ward-edge wall the base's levelling raises and the
    locality of every wall (its step profile derived); stair crossings in drawing and naming; the raised ways as committed
    inputs of a close-up — the under-deck strip, crossings under open spans, the arena parts each reader reads, their land,
    their removal and addition; the district that owns a deck's plots; the hatch of ridgeless roofs and the stack order of
    stepped tiers with their shadows; a street round every precinct; the exports; the Terraces hillside of a standalone
    neighbourhood document (V01 §2.3, V01 §3.4.3, V01 §3.4.4, V01 §3.6, V01 §3.11, V01 §3.17, V01 §5).
13. **File g items 119 and 120's neighbourhood parts**: the one-time waits stage 2 adds or lengthens held within item
    119's ten-second comfort level, every line of V01 §6 kept as its target and every interactive budget unchanged
    (V01 §6); Find's area targets — districts, neighbourhoods, quarters and regions — and Show gaps' units over the
    catchments, through `findAreas` and `gapUnits` (V01 §5.4, V01 §3.16).
14. **File g item 122's neighbourhood part** (a look only; J135, J138): the units a disaster look ruins — whole
    districts, the calamity's targets first, else its pattern, as many as its severity asks — through `disasterSource`
    and `disasterDistricts`, and the outskirts' land the camp looks may take, through `campLand` (V01 §3.16,
    V01 §5.4 (6)).
=== END ===

=== REPLACE ### 1.2 The base hooks this volume consumes ===
### 1.2 The base hooks this volume consumes

Each row names the hook's home and what this volume does with it; the hook's content is stated at its home.

| hook (home) | what this volume consumes | how this volume uses it |
|---|---|---|
| II.1 | `Seam`, `SeamEdge`, `Portal`, `SeamAmendment`, `SeamContract`, `NeighbourhoodRequest` / `Result` (item 539), `SeamReport`, rules (1)–(6), the neighbour step, `Sample` (declared beside `Seam`, item 540) | template portals and radial ends are II.1 (3) amendments (V01 §3.11); the request and result as V01 §2.4 reads them |
| II.2 | the template rows, `RingFabric`'s ring courses (item 58 (a)), template road widths | the template face, the seed primitives, the other templates and every ladder (V01 §3.4) |
| II.3 | the dispatch idea, the pin gate with weight decay (item 58 (c)), local identities, compounds | S9b (V01 §3.5), the hood pins (V01 §3.8.2), local places (V01 §3.7) |
| II.4 | persistence (LC-18, J-P23), the workflow, elaboration by click (item 28) | V01 §3.8, V01 §3.9, V01 §4 |
| II.5 | stage-2 readiness and the M5 exit | V01 §7's tests extend them |
| II.6 | the sky call, `SkyStrategy`, `IslandRule` | the unit run lays each island's districts (V01 §3.10.3); volume 5 owns placement and supply |
| §2.4, §2.5, §2.7 | `Way` (`surface`, `slopeP95`), `District` (`fabric`, `fabricParams`, `identity`, `terrace`), `Block` (`content`, `squareType`, `ringCentre`, `voidCorner`, `overrides`), `Plot`, `Allocation`, `Pin`, `Greenery`, `HoodPlace`, `RetainingWall`, a way's `raised` record, deck plots; the types `FabricStrategyId`, `TypedBoundary`, `BlockKind`, `SquareType` (§2.5, item 505) | written and read as V01 §2.7's lifecycle rows state |
| §2.8, §2.9 | the elaboration record's `closeup` rung, the elaboration cache, the `closeups` digest block, `Recipe.product` / `hood` | the close-up's record and cache (V01 §2.5, V01 §3.8); `HoodRecipe`'s rules (V01 §3.10.1) |
| §4.1 | the stage graph, the laziness contract, the pool and the hinterland unit, elaboration by click | S7c and S9b placed in it; the unit run a unit of its kind (V01 §3.1) |
| §4.2 S1 (2), S1 (5), S2; §4.8's bridge rule | the closed-outline routine and outline templates; crossing sites, spans and the bridge build (`deckCm`, `kind`, `piers`); the programme's land estimate | the standalone outline rows (V01 §3.10.2); the island crossing sites (V01 §3.10.3 (4)); the square and green land (V01 §3.5.9) |
| §4.5 | the grower, typing, fields, `FieldBands`, S7b, item 72's character, identities, the band range | χ̃ = §4.5 (2)'s function over allocation rows (V01 §3.2); S7b's capacity less the dispatch land (V01 §3.5.9) |
| §4.6 | the bent cut (steps 1–11), holed laws, the slit, the portal gap, the ladder, the strategy slot | every template calls it on its remainder; its holed laws cut ring bands (V01 §3.4) |
| §4.7 | S9, S10a, S10 (0)–(10), S10b, S11, the levelling and its district-edge source, the deck row | S10a reads `Block.content`; S10 (7) joins a manor block; S11 places square centrepieces (V01 §3.5.10); V01 §3.17 |
| §4.9 | the greenery rule table, S12b | the court-greening and green-block rows (V01 §3.5.7) |
| §4.12 | `StrategyRegistry`, the hook points `S7b.afterGreedy` and `S10a.afterDrivers` | S7c and S9b registered by `@plat/hood` (V01 §3.1) |
| §6.1, §6.3 | streams, concerns, lineage, the anchor rule, successions, the stage id `S8.seed` | three concerns (V01 §3.12); successions in `SeamReport.superseded` |
| §7.1–§7.4, §7.6, §7.7 | the events, the tool binding, the dry run and its bends, locality, the lifecycle table, editable tables, the parity presets, the derivation rows | no new event kind; T1, T6, T8 and T12 gain one parameter each (V01 §4); `NG` joins the parity presets (V01 §3.15); DR26 (V01 §1b) |
| §8.1–§8.6, §8.10 | the display list, the `hatched` family, programs, states, crowns, the neighbourhood band | the `hatched` family at all four bands (V01 §5.1) |
| §9 | label entities, the knowledge admission, spines, floors, the title rule | place labels, the hood title, local names (V01 §5.2) |
| §10.4 | the naming engine | the way-naming context and place names (V01 §3.7) |
| §11.1 | formats; SVG at the neighbourhood band for a district scope; VTT scope a district | per-format stage-2 content (V01 §5.3) |
| §12.4–§12.6, §12.8 | the CITY split, the neighbourhood-band open bound, the scoped regeneration law, the elaboration cache | the stage-2 budget split (V01 §6) |
| §13.5, §13.6 (2), §13.7 | NG baselines, the NG panel, the S4 (d) band, S3's seam band | V01 §7's bars |
| §14 | `@plat/hood`, `FabricStrategy`, `StrategyRegistry` | the package's contents (V01 §8.3) |
| §15.2 | stage-2 letters S1–S6 | each tested in V01 §7 (S4 (e), (f): T-V1-48, T-V1-49) |
| §16 M5 | the milestone | V01 §8 |
| g item 102 (a)–(d) | `shade(x)` from terrain and walls (field pass 1) and island strips (pass 2); the sunlit-side preference | `DistrictContext.shade`, S7c's `shade` term, S9b's manor sun factor, the close-up's fountain and bandstand gates (V01 §3.3.3, V01 §3.5.5, V01 §3.8.2); on a sky arena volume 5's `shadeSky` (V05 §3.11 (4); J-V1.87) |
| g item 103 (a), (f); V11 §2.3–§2.4 | `SitingProfile` (emits, sensitive, coverage), `RelationFamilyRow`, `CoverageSpec.unit` | the catchment unit and `catchmentOf` (J-V1.35; V01 §3.16); the dispatch's EMITS / SENSITIVE-TO pushes (V01 §3.5.4, V01 §3.5.5) |
| g items 104 (b), (h) (3) as revised by 107 (e); 105 (a), (g), (i) | active chains (dossier and custom), S7b (1)'s district supply term, allocation-level links | χ̃ (5)'s `c`, `DistrictContext.chains`, S7c's `chain` term; never a quarter assigned (V01 §3.2, V01 §3.3.3) |
| g item 108 (a)–(c) | the ladder table's step types; QUARTER, GUILD and SIZE records with members `#k` | the identity, the forecourt landmark, the dispatch's fixed inputs, the panel's members (V01 §3.5.12, V01 §4.5) |
| g item 106 (a)–(c) | `Enceinte.closure` `barrier`, the defensibility classes, the `ChainProfile` stretch, intramural gardens | seam typing of barrier arcs (II.1, item 541), `wallShare` and `noIntervallum` over walled stretches only, gardens excluded (V01 §2.3, V01 §3.6) |
| g item 109 (e), (g), (j) (3), (k) (2)–(5); II.7.4–II.7.6; V04 §3.1, V04 §3.3 (P7, `forecastSafety`), V04 §3.4 (F6), V04 §3.5.1, V04 §3.6a (`underDistance`), V04 §3.7a (T8), V04 §3.10, V04 §4.3 | `AccessPoint` (the kinds item 554 adds; `source`, `role`, `cause.system`), `UndergroundSystem.sources`, the catacomb's ratchet and stagnation, undercity neighbourhoods, `Features.sewers`, the undercity circumstance, the below-TOWN set, the ground-edit row, P7's void-dwelling forecast | openings and catacomb entrances as places and symbols; the fixed-input set, `blockLifted`, the undercity's parent (II.7.5 (2) through `districtsAbove`), `under[]`, `fabricSignature`, `catchmentOf` underground, the standalone document's layers, a replace close-up's cross-arena scope, the hood's void part (V01 §3.7.1, V01 §3.8.8, V01 §3.9, V01 §3.10.1, V01 §3.16) |
| V05 §2.3, V05 §2.3a, V05 §2.4, V05 §3.2, V05 §3.5 (3), V05 §3.8 (4), V05 §3.12, V05 §3.15 (5), V05 §4.2, V05 §4.3; item 280's sky stage | `SkyUnitInput` (the island's unit inputs: land, rim strip, claims, landings, field, district kind, fabric hint), `IslandShadeStrip`, the `sky-*` kinds, the islands gate, an island as one walk unit, the unit run's contract (`plantRimWalk`, the district ids, `portalsTotal` 0, the river's crossing sites), `raiseIsland`, New random on an island, the resize and the rim reshape, the island re-read of a ground edit, a ground landing's S8 destination | the sky unit run (V01 §3.10.3); S7c's κ (V01 §3.3.3); the strips read by S9b and the close-up (V01 §3.5.5); `catchmentOf` on a sky arena (V01 §3.16); the destination lane (V01 §3.4.2 (a)) |
| V06 §2.1 | `EpochParticipant` | `hood.fabric` at `afterGrowth` (V01 §3.3.6, V01 §3.5.11) |
| §11.2 | `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull` with V11's families | V01's providers (V01 §4.5) |
| V10 §2.13 | `WhyProvider` | V01's providers (V01 §4.5) |
| V11 §2.3 (`naming.district`, `naming.way`, `naming.place`) | the grammar slices | the features V01 derives for them (V01 §3.7) |
| g item 110 (a)–(e); items 244, 245, 246, 260, 290, 302 | `RetainingWall` and S10–S11's levelling with its district-edge source; raised ways with their generator, supports, spans and suppression; deck plots with the `deck` row; stepped tiers; the second known-city fixture | the terrace state and the contour series (V01 §3.17.1, V01 §3.4.3); held walls, strips, crossings, the parts each reader reads, their land and removal (V01 §3.17.2–V01 §3.17.5, V01 §2.3); deck ownership (V01 §3.17.6); stack order and tier shadows (V01 §5.1.3); T-V1-50–T-V1-54 |
| V11's item-110 rows | `terrace` (`slopeMin`, `stepMinCm`), the relief rows' `terracedEdges`, `ways.crossing` (`rampMaxGrade`, `stair`), `raisedWays.structure` (`clearanceCm`), `aqueduct.terminal` | `terraceState` (V01 §2.3), the stair-stepped way (V01 §3.6 (3)), crossings under arches (V01 §3.17.3), the terminal (V01 §3.17.8) |
| V02 §2.1, V02 §2.6, V02 §3.7, V02 §3.11, V02 §3.15–V02 §3.17, V02 §5.2–§5.3 | the wings' canonical order by key, `BaseWing.on` and `solid`, each wing's `RoofSpec.kind`, the `stairFlight` program and `stairTreads(w)`, `DeckContext` (item 305), `PorchKindRow` and the secondary porch, the `wings` rung's triggers, `roofscape` facets and the `roofConstruction` switch, `MassingRef.family` `ovalCourt` | stack ties, tier shadows, the ridgeless hatch and the treads (V01 §5.1.2–V01 §5.1.3); deck buildings in the owner's close-up (V01 §3.17.6); the entrance reserve (V01 §3.8.2 step 5); the outline close-up's trigger (V01 §3.8.1); the arena floor's exclusion (V01 §3.8.2 step 1) |
| V03 §3.3, V03 §3.7.1–V03 §3.7.3, V03 §5.1, V03 §5.4, O1 (e), J-V3.73 | the access head at the building band, the ground predicate `ground(b)`, `stackAccessDoor(b, a)`, `basementDoor(b)` (both over V03 §3.7.1's one door helper), the stoop, the church class | one mark per access (V01 §3.8.8); the entrance reserve (V01 §3.8.2 step 5); the church class in V01 §3.7.1 |
| V07 (item 506) | `FabricStrategy.levelledUnits`, `terracedEdges` | `TemplateFabric` returns the bent cut's levelled units and declares terraced edges (V01 §3.17.1 (4)) |
| V04 §3.5.4 (item 244's span rule) | a raised part's spans with their `use` (`open`, `vault`) | crossings through `open` spans only (V01 §3.17.3) |
| V05 §3.22; V06 §3.19 | the island's walls and raised-way rules; raised ways, walls and decks over epochs; V06 §3.19 (7)'s clearing under a new strip | V01 §3.17.7; V01 §3.17.4's epoch clause and V01 §3.3.6 (3) |
| V12 §3.4, V12 §3.6b | the metrics `block.area`, `grid.r4`, `grid.axis`; the `paired` margins | `fabricSignature(region)` returns the town side (V01 §3.16); T-V1-46 |
| items 447, 448 (§11.1); J-VI.3 | item 110's GeoJSON names and the VTT rule; the six closure barrier kinds | V01 §5.3; II.1's seam typing (item 541) |
| g item 119 (a)–(f) (J130); §12.1 (the targets and the comfort level), §12.6, §12.7, §12.10; V11 §3.25.8; V09 §4.21.9 | the targets; the ten-second comfort level for one-time waits; the measured-gain rule and its `perf.qualitySpend` rows; the progress rule and the progress view; the interaction budgets kept | V01 §6's lines kept as the targets, stage 2's one-time waits held to the comfort level, its interactive lines unchanged (J-V1.103); T-V1-29's one-time-wait clause |
| g item 120 (a)–(k) (J133); §2.9's view key `find`, §8.2's Find rows, §11.1, §11.2's gazetteer match listing and admission, §12.5's overlay budget; V09's Find panel and `live.find` overlay; V10 §2.13's `FindAnswer`; V11's lexicon (labels, synonyms, groups) | the per-viewer chips and the Show gaps switch; the veil, halo, outline, pin and count-bubble rows; each chip's matches at the view's effective key | the town's area targets and Show gaps' units (`findAreas`, `gapUnits`; V01 §5.4, V01 §3.16; J-V1.102); T-V1-59 |
| g item 122 (a)–(f), (i) (J135, J138); §2.7's `ConditionOverlay` and its reader rule, §2.9's `crises` key, §4.11's `CalamityRef` in the committed `epoch` events (DR28), §7.7's DR44, §10.2's `RosterTables.crisis` (the `disaster` row's `scale`, `previewSeverity`) and *Crisis looks* (d)–(h), §8.1's render tag `crisis.place`, §2.3's `Terrain` (`heightCm`, `wind`), §4.9's land use and rotation, §11.2's admission; V06 §2.4's calamity table; V07 §3.10's ends; V02 §5.7 | the standing overlays a look draws and a preview; the calamities the port carries; the look rows and the placement that reads the outskirts | `disasterSource`, `disasterDistricts` and `campLand` (V01 §3.16); a disaster look's framed place in Find (V01 §5.4 (6)); T-V1-60 |
=== END ===

=== REPLACE ### 1.3 Out of scope, and whose it is ===
### 1.3 Out of scope, and whose it is

* **Stage-3 compositions and plans** (the `wings`, `rooms` and `plan` rungs beyond the base's stored wings) — volumes 2
  and 3. A close-up raises the `wings` rung by §4.1's policy and draws whatever the registered `BuildingGenerator`
  returns; at M5 that is the base's outline builder, so the stored base wings.
* **Sky-island existence, count, supply, size, altitude, placement, terrain echo, shadows and their epochs** — volume 5.
  This volume gives an island's districts their fabric through the unit run (V01 §3.10.3) and nothing else.
* **Underground content** (the sewer-front and undercity rows, the systems, their access chances, the catacomb's growth,
  ratchet and stagnation, the ruin's plan) — volume 4. The close-up machinery opens an underground district as a `refine`
  close-up (II.1) with no hood pins (V01 §3.8.2). This volume builds only item 109's **surface side**: the places and
  symbols of openings, dug accesses and catacomb entrances, the undercity's parent district, the voids a district sits
  over, the fixed-input protection of a catacomb's source cemetery, the `blockLifted` notice, and the two services volume
  4 reads (`districtsAbove`, `fabricSignature`; V01 §3.16).
* **The siting rulebook's rows** (every class's profile, the families, the signature pairs, the goods, the coverage and
  balance rows, the ladder step types) — volume 11; the placement solver that reads them — the base (§4.7 S10a–S10b).
  This volume reads the rows where the neighbourhood makes a choice (the fabric, the dispatch, the pins) and defines the
  catchment unit (J-V1.35).
* **Epochs** re-running S7c and S9b, and the dispatch under decline — volume 6. This volume registers the participant
  (`hood.fabric`, V01 §3.3.6, V01 §3.5.11): both steps run on an epoch's new and due blocks only, never on survivors; the
  shade drift (item 102 (e)) reaches them through it.
* **Screens and flows of the application** — volume 9; this volume fixes the tool parameters and the events they emit
  (V01 §4).
* **The clerk's prompts and model** — volume 10; this volume fixes what the clerk reads and proposes for stage 2
  (V01 §4.5).
* **Word lists and the grammar's rows** — volume 11 authors them; this volume fixes the naming features they read
  (V01 §3.7).
* **Find's panel, type-ahead, chip grid, results and overlay** (item 120) — volume 9; the veil, halo, outline and pin
  rows §8.2's; the gazetteer's counts and match listing §11.2's; the search words V11's; the clerk's "show me" volume
  10's. This volume gives the town's area targets and Show gaps' units (V01 §5.4).
* **Crisis looks** (item 122) — the table, the closed mapping and the placement §10.2's, the derivation §7.7's DR44,
  the drawing §8.2's, a building's ruined look V02 §5.7's, the hand-over V06's, the village rungs' units V07's, the
  switch, the preview, the crisis card and Find's `crises` section volume 9's, the explanations volume 10's, the rows
  V11's and the bars V12's. This volume gives the disaster's units and the outskirts' land (V01 §3.16).
* **Calibration runs** — volume 12; every calibrate-later constant here names its default, its measurement and its
  fallback (V01 §3.14).
=== END ===

=== REPLACE ### 1b WIRING TABLE — every new piece, what feeds it and what it feeds ===
### 1b WIRING TABLE — every new piece, what feeds it and what it feeds

| piece (home) | fed by | feeds | base hook |
|---|---|---|---|
| provisional character `χ̃(D)` (V01 §3.2) | S7b (1)'s greedy `Allocation` rows, §10.2 class rows (significance, families, sectors, powers), §4.3 `TradeFlow`, S3 reservations, the allocation-level supply links (item 105 (g)), dossier `Institution.powers` (§7.7) | S7c's weights; S9b's square-type split; a replace dry run's ghost (V01 §3.9); the fabric why provider (V01 §4.5) | §4.5 (2)'s character function |
| S7c fabric selection (V01 §3.3) | `DistrictContext`, `χ̃`, `DistrictIntent.planned`, `TemplateRow`s, `hood.constants`, the `fabric.select` stream | `District.fabric`, `District.fabricParams`, `templateLandM2` for S7b's reconcile | §4.5 S7b (1)'s hook `S7b.afterGreedy` (§4.12); §4.5 typing's "fabric is bent-cut unless" |
| `templateLandM2(D, row)` (V01 §2.2, V01 §3.3.7) | the row's seeds, `DistrictContext` (face OBB, inscribed radius, inhabitants), `w_tpl`'s band top | S7b (1)'s reconcile (capacity less the template's land); S8's land caps (the plaza's `A`, the ring series) | §4.5 S7b (1) |
| `DistrictContext` (V01 §2.3) | `District`, its `Seam`s, S3/S7b reservations, S1 terrain, §4.3 trade flow, `DistrictIntent`, item 102's shade sampler and volume 5's strips (on a sky arena `shadeSky`, V05 §3.11 (4)), each live island's `shadeBasis`, the chains (items 104, 105), the ladder records (item 108), volume 4's systems (`under`) | S7c, every `FabricStrategy.partition`, S9b, the close-up panel, the clerk's why; `shade.islandShare` and `under` only after generation — the panel's reader query, the why, volume 9's voids and shade views (no stage reads `under` before the underground tail) | §14 `FabricStrategy` signature |
| `TypedBoundary` view (§2.5; assembled in V01 §2.3) | `District.seams` (barrier arcs typed by II.1, item 541) | `DistrictContext`, the templates' portal choice, the unit run's outline | §2.5 `District.boundary` |
| `DistrictSignature` (V01 §2.3) | D's committed ways, junctions, blocks, squares, terrain | T-V1-5's classifier | — (a derived view) |
| template face (V01 §3.4.1) | D's L1 faces after S7b's claims, less intramural gardens (item 106 (b)) | the seed primitives | §4.6's strategy slot |
| seed primitives spine / ring / plaza / fan (V01 §3.4.2) | the template face, portals, the `hood.template` and `cut.arc` streams, `TemplateRow.seeds`, the land caps | L1 spines and `square` / `park` faces in S8's district batch, then §4.6's bent cut | §3.4 kernel ops (`insertChain`, `splitThrough`, `connectHole`, `ringBand`, `insetRing`); §6.3's `S8.seed` stage id |
| `TemplateRow` table `hood.templates` (V01 §2.2) | authors (`select.ngOdds` among them, V01 §3.3.5), `editTable` | S7c, the seed primitives, the land estimate, the panel's cards, the S4 (b) classifier, the kind-coverage table (V01 §3.3.8) | §7.6 editable tables |
| S9b block dispatch (V01 §3.5) | S9's built blocks, S10a (i)'s placements, `DistrictContext`, `χ̃`, `squares.quota`, `DispatchRow`s, the siting families (V11), shade, the `hood.dispatch` stream | `Block.content`, `squareType`, `voidCorner` | §4.7 S10a's hook `S10a.afterDrivers` between steps (i) and (ii); §2.5 `Block` |
| `squares.quota` (§4.7, item 301; V01 §3.5.2) | authors (base rows) | S7b (3)'s square claims larger than a block; S9b's sub-block remainder | §4.7 S9, §4.5 S7b (3) |
| `Block.content` (§2.5) | S9b, `setAttr` | S10a (iii) (capacity 0 for square / green / yard; one item for manor), S10 (7) (whole-block join), S11 (square centrepiece), S12b (green blocks), S13a (places, the district's naming features), S14 (square and green fills), exports | §4.7 S10a; §8.5 (1) figure-ground |
| dispatch land in the programme (V01 §3.5.9) | quota rows at each band's centre | S2's land estimate, S7b (1)'s district capacity | §4.2 S2, §4.5 S7b (1) |
| court-greening and green-block rows (V01 §3.5.7) | band, court residues, the `greenery` stream | S12b's yard planting of courts | §4.9 table |
| context features (V01 §3.6) | `DistrictContext` water / wall / slope / bridge / gate facts | a bank path or the rear-plot water rule; the wall-side rule; stair-stepped way marks | §4.6 S8, §4.7 S10 (6), §8.2 programs |
| way-surface rule (V01 §3.7.3) | way class, the band of its fronting plots, era row | `Way.surface` | §2.4 `Way.surface`; §7.3 item 1's seam exception |
| way-naming context (V01 §3.7.2) | frontage uses, landmarks, destinations, shape, slope, unnamed `HoodPlace`s | S13a's way names | §10.4 naming engine |
| district naming features (V01 §3.7.4) | `District.fabric`, the dispatch's blocks, ring centre, area | §10.4's district names (V11's `naming.district`) | §10.4 |
| `HoodPlace` (§2.7; V01 §3.7.1) | S13a's local-place step over square / green / yard blocks, courts, square centrepiece pins; the opening pass in the commits V04 §3.10 names (the stage-2 switch's edit among them, V01 §3.15) over public openings (source `opening`, role `access`) and catacomb entrances (a catacomb system's `stair`); T11's name tool on an unnamed court, yard or square | `LabelEntity` kind `place`, the reader, exports, the way-naming context | §2.7 records, §9.1 label kinds |
| ground `AccessPoint` symbols (V01 §3.8.8) | volume 4's `AccessPoint` records hosted on a ground face with `ground.at` outside every footprint (gratings, stairs, public openings, outfall mouths, catacomb entrances, dug accesses opening in a yard), each keyed by `accessSymbolKind(a)` and sized by `hood.constants`' `access.<accessSymbolKind>M`; a building-hosted access feeds volume 3's plan head instead | S14's neighbourhood-band `glyph` marks in the pins slot; the hood pins' clearance; exports | §8.1 marks; §9.2's admission |
| hood pins `HoodPin` (derived; V01 §3.8.2) | committed blocks, yards, courts, squares, hinterland sites; the entrance reserve; `HoodPinRow`s; `CloseupParams.pinGate`; model pins (prior picks); shade; `pin.decor` at `STAGE_VIEW` | S14's neighbourhood-band `glyph` and `shadow` marks; picture and scene exports; the pin why provider | §8.1 marks, §8.10 instance overrides |
| `CloseupParams`, `CloseupRecord` (V01 §2.5) | the `closeup` event | the refine derivation; the `closeups` digest block; §7.4's independence check (`since`) | §7.1 `closeup` event; §2.9 / §6.2 `closeups` |
| `Block.overrides` (§2.5) | `instance` events on hood pins | the refine derivation's override pass (§8.10's resolution); the reader | §2.7's uniform `overrides` field; §8.10 |
| the close-up elaboration record (V01 §3.8.4) | §2.8's record with rung `closeup` | `live.stale`'s district marker, the click re-derivation | §2.8, §4.1, §8.5 change markers |
| the outline close-up (V01 §3.8.9) | a view gesture (rectangle, lasso, named site) | the refine close-ups of the districts it meets, the hinterland's per-face chunks | §4.1's elaboration by click; §9.5's framing rule |
| catacomb source protection (V01 §3.5.12, V01 §3.9) | volume 4's `UndergroundSystem.sources` and entrance `AccessPoint` | the fixed-input set of S9b's re-derivation, a replace close-up and a content edit; the dry run's closed-source line (V04 §3.5.1 (8)) | §7.2 fixed inputs |
| `blockLifted` notice (V01 §3.9) | a replace close-up's or content edit's fates over a stagnant catacomb's extent | volume 4's catacomb growth (item 109 (k) (5)) | the event's fate report (§7.1) |
| `catchmentOf`, `districtsAbove`, `fabricSignature` (V01 §3.16) | committed districts, plots, ways; V11 §2.3's coverage units (its discs on the 16 m raster, its parish partition); volume 4's void footprints and `underDistance`; V05 §3.5 (3)'s island unit; V12 §3.4's metric definitions | S10a / S10b's coverage term (V11's `cov/<class>` rows), volume 4's C5 parent and the ruin's distinctness step (V04 §3.5.0a (7)), V11's `naming.ruin` and culture rows, V10's explanations, Find's Show gaps (`gapUnits`, V01 §5.4, into which item 120 (i) folds volume 9's Coverage view) and volume 9's voids view | §4.7 S10b (item 103 (f)); II.7.5 (2) |
| Find's area targets `findAreas` and Show gaps' units `gapUnits` (V01 §5.4, V01 §3.16; item 120) | committed districts of every layer, §9.1's city-cut `QuarterNode`s and `RegionGroup`s with their `LabelEntity` names, `District.identity`, the districts' L1 faces; `catchmentOf` (V01 §3.16) over the class's compiled `profile.coverage` (V11 §2.3); the chip's matches the view's key admits (§11.2's match listing) | volume 9's Find panel (the list's area entries) and `live.find` overlay (an area's lift, halo and pin; Show gaps' dashed outlines and their "none here" labels); V10's `FindAnswer` (a chip's `none`); §11.1's picture exports; T-V1-59 | §2.9's view key `find`; §11.2; §8.2's Find rows; §12.5 |
| the disaster look's units `disasterSource` and `disasterDistricts` (V01 §3.16; item 122) | a standing `ConditionOverlay` whose look DR44 reads as `disaster`, admitted at the key, or a preview (§2.9's `crises`); the committed `epoch` events' `CalamityRef`s (§4.11; V08 §3.6 carries them) and V06 §2.4's calamity table; the ground districts (`DistrictContext.inhabitants`, `.water`), their seams, `Terrain.heightCm` and `Terrain.wind` (§2.3); §10.2's `disaster` row (`scale`) and `previewSeverity`; the view's key (§11.2's admission); at THORP, HAMLET and VILLAGE V07's units (V07 §3.10) | V02 §5.7's ruined look (every building of each unit; the fire's blackening from `pattern`); §8.2's disaster row (the `ruinTone` over the units, by its pattern); §10.2's `neighbourhoods` place, and its `affectedQuarter` place through `matched`; volume 9's crisis card **Show** and Find's `crises` row **Go to** (V01 §5.4 (6)); the view telemetry (unmatched targets, a fire's shortfall); T-V1-60 | §7.7's DR44; §10.2 *Crisis looks* (d); §8.2 |
| the outskirts' land `campLand` (V01 §3.16; item 122) | the ground's hinterland `LandUse` faces (`commons`; `arable` and `strip_field` in their rotation's fallow course, §4.9; the open verges of the arterials leaving the town), the districts' outer boundary and the outermost enceinte's outer strip, the gates' passages, the under-deck strips (V01 §3.17.3); `hood.constants`' `camp.reachM` | §10.2's camp places (`beyondWalls`, `approachRoads`' fallback, `approachByGate`, `outside`, `gatesAndKeep`'s camp), which rank its faces — the refugee camp's by V06's `frontierFor`; T-V1-60 | §10.2 *Crisis looks* (d) |
| `skyDistrictCount` (V01 §3.16) | the sky allocation's plot land, `IslandRule.districtHa` (V05 §2.3), `hood.constants`' `sky.plotShare` | the unit run's partition (V01 §3.10.3 (2)); V05 §2.3's unit inputs and V05 §3.5 (3)'s coverage units | II.6 (at most three districts per island) |
| hood title (V01 §5.2.1) | the district's `name`, `identity`, a QUARTER record's label | the close-up view's furniture; the district export's title | §9.5 title rule |
| unit run (V01 §3.10) | `HoodRecipe` (standalone) or `skyUnitInput(doc, island)` (V05 §2.3); the request without `seam`, `context`, `params`, `closeup` (V01 §2.4); after generation, volume 5's `raiseIsland` (an epoch's `sky.islands` participant, a late `convert`) and New random on an island (V01 §3.10.3 (6)) | the unit's districts, blocks, plots, buildings, names on its own arena; `NeighbourhoodResult.districts` → SKY-F → `SkyIsland.districts`; `SeamReport.landingsReached` (T-V1-21) | §4.1 units; II.1 (5) |
| the rim walk `plantRimWalk(doc, island)` (V01 §3.10.3 step 4, V01 §3.16) | the committed rim strip — its `rim_strip` face and inner setback line, as the unit inputs carry it at generation and as volume 5's island L1 batch re-lays it (V05 §4.2); §4.9's street-trees spacing row | one `esplanade` and one `street_trees` `Greenery` per strip → S14's green and tree marks (slots 5 and 16), the exports' greenery rows | §4.9's rim-walk row (item 313), planted by this function once per event and never by a district's S12b; §2.7 `Greenery.along` |
| the entrance reserve (V01 §3.8.2 step 5) | the buildings' `Entrance` records (main, side, rear, yard, service — a concealed use's door among them), `Basement.access` and `basementDoor(b)`, the building-hosted `AccessPoint`s of a building with neither a basement nor `ground(b)` at `stackAccessDoor(b, a)` (V03 §3.3, V03 §3.7.1–V03 §3.7.2), volume 2's `PorchKindRow`s | the hood pins' clearance; the chunk's inputs digest (V01 §3.8.3) | §2.6 `Entrance` and *Basements*; V02 §3.7; V03 §3.7.1–V03 §3.7.2 |
| an island's crossing-site spans (V01 §3.10.3 (4)) | volume 5's conjured river and its sites (`SkyUnitInput.river`; `Bridge` records in state `site`, V05 §3.8 (4)); the unit's outline face; `levelledGroundCm` on the island's key (its raster fallback, item 309), read for `deckCm` by the after-S8 build | each district's `bridge` template portals; built `Bridge`s with their ways (`deckCm`, `kind`, `piers` by §4.8's rule) → volume 2's deck-plot rule at S10 and `DeckContext` at S11 (V02 §3.16 (1), (5)), S13a's bridge names, S14, the exports, V01 §3.17.6's deck plots and volume 5's landfall fates (V05 §3.16 (7), V05 §3.22 (6)); F-TEMPLATE's report | §4.2 S1 (5) as item 580 extends it to the sky unit run; §4.8's bridge rule |
| a ground landing's destination lane (V01 §3.4.2 (a)) | SKY's ground `landing` reservation and its attach (V05 §3.10 (4)) | S8's first cut in the face, before the seeds; SKY-F's check; `landingsReached` | §4.6 |
| `HoodRecipe` (§2.9; its rules V01 §3.10.1) | T1 `intend` with `product: 'hood'`, a skeleton file, the API | the unit run's S0–S2; the layer defaults (V01 §3.10.1 (7)) | §2.9 `Recipe` |
| the hood's void part (V01 §3.10.1 step 6) | P7's forecast at the hood's `contextRung` (V04 §3.3), capped at `forecastSafety`; the one-district allocation's poorest-band households | the underground pseudo-district's `Allocation` → volume 4's T3 F6 (V04 §3.4); F6's misses → volume 4's T8 (V04 §3.7a); T-V1-20 | §4.5 S7b (6) (d) |
| `HoodKindRow` table `hood.kinds` (V01 §2.2) | authors | the standalone programme's anchors and affinity | §7.6 editable tables |
| `star`, `ring_star`, `spindle_street`, `plaza_rect`, `plaza_star` outline rows (V01 §3.10.2) | `blueprint.features` (the standalone S0's draws) | the standalone outline | §4.2 S1 (2) |
| `hood.constants` (V01 §3.14; one `settings` row in V11's settings form, each key a column with its `ColumnSpec`) | authors; `editTable` | every rule of V01 §3 that cites a key; the `NG` preset's entries (V01 §3.15); each calibratable column's register entry (V01 §8.1) | §7.6 editable tables; V11 §2.1's settings form (registry row 62) |
| the `NG` preset (V01 §3.15): its entries on `hood.constants` — the stage-2 switch `fabric.extensionWeight`, the eight `ng.*` switches, `pin.decayScope` — and the default cell `ng.plazaM2` | authors (`ref:NG 1.2.2 … (code)` entries; the switch's fixed on value); the NG harness's and the M5 panel's preset choice | S7c's weights in town and standalone; S9b's squares, manors, small blocks and greens and its land in the programme; the court-greening row; the hood pins; the plaza size; B-REF's NG rows (T-V1-31) and the NG panel (T-V1-32), arm `NG`; T-V1-4's resolution test; V11's compiler (`PresetId`) and V12's `PresetArm` | §7.6's parity presets (item 584); item 23 |
| the stage-2 switch's edit (V01 §3.15) | an `editTable` or `editPreset` changing the resolved `fabric.extensionWeight` (the tables editor or the presets dialog); the NG harness's and the M5 panel's preset choice | a Re-derive from S2 with §6.3's carry-over: S2's land estimate (`λ_b`), S7c's weights, S9b, the local-place step, the hood pins' chunks (stale), the underground tail's T6 opening pass (V04 §3.10; J-V4.121); the dry run's fates (V01 §4.1), the oracle (V01 §4.3), V01 §4.4's row, V01 §6's line, T-V1-4's switch clause | §7.6's first-reader-stage re-derivation; §7.4's `editTable` / `editPreset` row; §12.6's Re-derive-from-Sk line |
| the calibration register entries of this volume's cells (V01 §8.1) | the compiled `hood.*` tables (V11 registry row 62), `way.surface` and `squares.quota`, each column's `ColumnSpec.calibratable` (V11 §2.1) — each `hood.constants` key its own column and entry `cal.hood.constants.*.<key>`, each `hood.templates` column its entry from M3a's `stepped` row — and provenance; the landing seat's `plat calibrate register --defaults --milestone <id>` with the landing milestone (M1, M2b, M3a or M5; V12 §2.8, V12 §3.11), and `--defaults --milestone M5` for a value this volume's M5 tuning moves before its due (V01 §8.1) | `plat calibrate register --check` at M1's, M2b's, M3a's and M5's exits (V12 §3.11's lint, T-V12-20); M-CAL's corpus run, which may move an `own` cell (V12 §3.10); `MilestoneRecord.exitCriteria`; the tables editor's cell inspector (volume 9) and the clerk's provenance answer (volume 10), as every entry's (V12 §1b) | V12 §2.6 `CalibrationEntry`, V12 §3.11 |
| `SeamReport` fields (V01 §3.11) | every close-up and unit run | M5's S1 acceptance, the report panel | II.1 |
| `hatched` family rows (V01 §5.1) | `StyleSheet` data | the tile worker's raster at every band | §8.2 |
| F-TEMPLATE, F-DISPATCH, F-UNIT (V01 §3.13) | the three stages' failures | the generation report (§5.4); their tests (V01 §3.13's test column) | §5.2 |
| concerns `fabric.select`, `hood.dispatch`, `hood.template` (V01 §3.12) | the concern registry | S7c, S9b, the seed primitives | §6.1 |
| `hood.fabric` epoch participant (V01 §3.3.6, V01 §3.5.11) | volume 6's epoch engine (`afterGrowth`), the epoch's new faces and due blocks, `EpochScope.recut` and `.raised` (V06 §2.1) | `District.fabric`, `Block.content`, `squareType` on those only | V06 §2.1 `EpochParticipant` (registered in §4.12's `StrategyRegistry`) |
| why providers for fabric, content, square type, places, hood pins, the terrace, the ward-edge wall and the under-deck strip (V01 §4.5) | committed state only (terrain, `terraceState`, the raised way's recorded reason) | volume 10's `why` query; volume 9's "why?" panel | V10 §2.13 (§2.8's explainer registry, item 270) |
| T1 `product`, T6 furniture stamp, T8 `fabric` and `terrace`, T12 `pinGate` parameters (V01 §4.2) | the canvas, the clerk's API, the skeleton file | `generate` with `Recipe.hood`; `instance`; `setAttr(district.fabric)` or `setAttr(district.terrace)` + `regenerate`; `closeup` | §7.1's tool binding (items 272, 349, 350) |
| stage-2 budgets (V01 §6) | measurements at M5; item 119's comfort level for one-time waits (§12.1) | §12's rows; T-V1-29 (its one-time-wait clause) | §12.4–§12.6 (item 474); §12.1 (item 119) |
| `terraceState(D)` = `DistrictContext.terrace` (V01 §2.3, V01 §3.17.1) | S0's relief class and the relief rows' `terracedEdges` (V11); S1's `terrace` site primitives; `District.terrace`; `slope.meanPct`; V11's `terrace.slopeMin` | S7c's `stepped` factor; S8's contour series (`stepCm`); the base's district-edge source (item 302); the elevated-road generator's terrace endpoints (V06 §3.19.3); the panel; the terrace why provider; `naming.district`'s `terraced` | §4.2 S0, S1; §4.7 S10; §2.5 |
| `District.terrace` (§2.5, item 211) | T8's Terraces chip (`setAttr`); a skeleton `quarter`'s `terrace` (item 350); the clerk's API | `terraceState` | §2.5 |
| the contour series and the thalweg path (V01 §3.4.3) | the template face; the unlevelled terrain's level lines; S1's drainage (the valley line); `fabricParams.terraceSpacingM`; `slope`; no draw | S8's L1 spines; `WayNamingContext.terraceIndex`; the base's S10–S11 levelling (each plot row levels to its fronting street); `templateLandM2` | §4.6's strategy slot; §4.2 S1 |
| `TemplateFabric.levelledUnits`, `terracedEdges` (V01 §3.17.1 (4)) | the bent cut's blocks, plots and ward on the template's remainder | the base's S10–S11 levelling and its district-edge source | §14 `FabricStrategy` (item 506) |
| `stepProfile(wall)` (§2.7, item 245; V01 §2.3) | both sides' committed levels (`levelledGroundCm` for ground, item 309; a way's level where a way bounds it) | S14's wall shadow; item 447's `stepMinCm` and `stepMaxCm`; the VTT threshold (§11.1, item 448); the replace dry run's notice (V01 §3.9); the wall why provider; volume 4's buried floor under a raised grade (V04 §3.5.5); volume 3's walk-out at a retaining wall in S11's basement decision (item 242) and `basementDoor(b)`'s rule 1 (V03 §3.7.1), both at M3a | §2.7 |
| held walls (V01 §3.17.2) | T3 `wall` in its `retaining` kind; a T2 terrace stroke's edge | V01 §3.5.12's fixed inputs; V01 §3.4.2 (d)'s validation; the chunk digest (V01 §3.8.3); the dry run's fates | §7.2 fixed inputs |
| the under-deck strip (V01 §3.17.3) | the committed raised part (the base's generator, T4 `road` with `raised`, the aqueduct class; its spans and piers, item 244) | V01 §3.4.1's holes; S7b (1)'s capacity; the pins' clearance; the chunk digest; exports; the strip why provider | §4.5 S7b (1); §4.6's holed laws |
| the arena parts per reader (V01 §2.3) | `PlatKey.part` of each way | every reader it lists | — (a rule table) |
| deck-plot ownership (V01 §3.17.6) | the base's deck row (item 246); `Bridge.deck`; the outermost enceinte | `inhabitants`; S7b (1)'s capacity; S10a; the close-up's frame and chunk | §4.7's deck row |
| `way.stair`, ramp hairlines, `retaining`, `raisedWay` programs (§8.2; drawn per V01 §5.1.2) | the base's stair and ramp intervals; `RetainingWall`s; raised parts | S14 from the district band (raised parts at every band) | §8.2 programs |
| the hatch per roof facet; the stack order with tier shadows (V01 §5.1.2–V01 §5.1.3) | the sheet's `roofConstruction` facets (`fakeGablePerWing`'s faces by `RoofSpec.kind`; volume 2's `roofscape` facets); `BaseWing.on` and the wing keys; volume 2's `stairFlight` and `stairTreads` (V02 §2.6) | S14's slot 12 | §8.2; §8.6 (items 406, 419) |
| the precinct rings (V01 §3.4.4) | the qualifying reservations in σ order | S8's seeds; `templateLandM2` | §4.6 |
| `HoodRecipe.edges.slope` (§2.9; V01 §3.10.1 step 2) | T1's hillside edge; the Terraces card's default | the unit run's S1 and relief class | §2.9 `Recipe` |
| item-110 export rows (V01 §5.3) | walls, strips, piers, decks | SVG, GeoJSON, VTT, glTF | §11.1 (items 447, 448) |
| the terminal-as-centrepiece rule (V01 §3.17.8) | the aqueduct's terminal pin or `conduit_house` frontage | S11's centrepiece draw (skipped); the hood pins' prior picks | §4.7 S11 |

**Dossier facts stage 2 reads — each through its derivation row (§7.7, item 20 (h)); stage 2 invents none.**

| stage-2 reader | dossier field (the neutral digest, §14) | derivation row | how it reaches stage 2 |
|---|---|---|---|
| χ̃'s plot mix, S9b's forecourt and landmark siting | `institutions[]` (kind, count, districtScale, facets) | DR9 (instances), DR10 (positions), DR24 (class) | as S7b allocation rows and S3 / S7b reservations — the instances the dossier lists stand where the one solver puts them |
| χ̃'s political alignment and economic role | `powers[]` (standing, governing, controlled), `economy.incomeSources` | DR11, DR12, DR13 | §4.5 (2)'s partition over the allocation rows, with `Institution.powers` overrides |
| S7c's kind factors, the provisional identity | quarter claims (`quarters[]`), district-scale records, ladder QUARTER records (item 108 (a)) | DR5; DR9 as item 108 extends it | S6's typing and item 72's identities; a dossier-defined district's identity is the dossier's (V01 §3.5.12) |
| the dispatch's fixed inputs; the panel's members | ladder COUNT, QUARTER, GUILD and SIZE records with their members `#k` (item 108 (a)–(c)) | DR9 as item 108 extends it | the members as allocation rows keyed `#k`; a SIZE record's compound block and a GUILD hall's reservation (V01 §3.5.12) |
| χ̃ (5)'s `c`, `DistrictContext.chains` | `activeChains[]` (processors, outputs, `upstreamChains`, status) (item 105 (i)); custom institutions' active reviewed chains (item 104 (b)) | DR33; DR24's custom row | allocation-level links between the chains' member rows (V01 §3.2, V01 §3.3.3) |
| every band read (S7c terms, S9b rows, surfaces, hood pins) | `wealth.label` | DR6 | `intent.wealthLevel` into the prosperity field |
| the shade terms | the site latitude (`cell.latDeg`, `site.culture`) | DR29 | item 102's model-side sampler, through the field's pass 1 and volume 5's strips |
| manor blocks | `wealth.label` through the class mix | DR8 | the class mix's compound share at the band |
| waterfront and wall-side context | `site.terrain`, `site.access`, water deposits; `walls.records`, `walls.flagged`; the sea threats (item 106 (d)) | DR1, DR2 | the site, the enceintes and their barrier closure the base builds |
| openings, dug accesses and ruin entrances | `resources` (`ancient_ruins`, the mining deposits), `magical_node`, ley-line income rows, `magical` history events (item 109 (b)) | DR30 (ruin evidence), DR31 (relief and mining) | volume 4's systems and their `AccessPoint`s, read by V01 §3.7.1 and V01 §3.8.8 |
| catacomb entrances and their protection | the church records and ranges (item 108's members), the Cemetery network (METROPOLIS), `Graveyard` | DR32 (burial and crypt trace), with DR9 as item 108 extends it | volume 4's catacomb sources and entrance `AccessPoint`s (V01 §3.5.12, V01 §3.9) |
| place names; a claimed quarter's name | `quarters[].name`, `landmarks`, the dossier's names | DR14 (extended by item 384 to `HoodPlace` names) | a dossier-named place's name is dossier-owned; generated names never repeat one |
| a place's knowledge | `facets`, covert impairments | DR20 (extended by item 384) | a covert fact never reaches a public view; `hood.placeKnowledge` is the map-side default |
| the layout and block content | none — no dossier field names a district's fabric or a block's content | **DR26** (§7.7, item 384) | derived by S7c and S9b from the rows above; a dossier element's plot is never typed away (V01 §3.5.12's fixed inputs) |
| the aqueduct's terminal | `conduit_house` records | DR34 | V01 §3.17.8's terminal form |
| the terraced ward (`terraceState`, V01 §3.17.1) | `site.terrain` | DR1 | S0's relief class → the relief rows' `terracedEdges` cell (V11) → `terraceState`; no other field is read. Raised ways are map-derived (item 20 (h)): their dossier factors are the base generator's (DR34, DR35) and volume 8's; a deck plot reads no dossier field |
| the disaster look's units (`disasterSource`, V01 §3.16) | `calamityHistory[]` (`type`, `tick`, `targets`) as V08's `calamities`; the stressors and active conditions as `ConditionOverlay`s | DR28 (the calamity's `CalamityRef` in `EpochInputs.events`), DR44 (the crisis look) | read from the committed `epoch` events and overlays at the view's key; a look only, never a model write |

**A dossier change reaches stage 2's facts** through the change envelope and the epoch or event fold (§7.7, items 22, 75,
76) and least-disruption mutation: a changed row above re-derives the facts its readers produce inside the scope the
fold re-derives — S7c's fabric and S9b's content on an epoch's new and due blocks only, never on survivors (V01 §3.3.6,
V01 §3.5.11); a place's name or knowledge in S13a's scope (V01 §3.7.1); an opening or catacomb entrance through volume 4's
commits and the opening pass (V04 §3.10) — and a fixed input (V01 §3.5.12) is never typed away. A condition or calamity
the dossier changes reaches the disaster's units at the commit that carries it (V01 §3.16): a look re-read, nothing
re-derived. Every field stage 2 does not read is another reader's or on §7.7 item 1's ignore-list.
=== END ===

=== REPLACE ### 2.1 Identifiers and the fabric table ===
### 2.1 Identifiers and the fabric table

`FabricStrategyId` (a registered fabric: `bent-cut`, a `hood.templates` row key or V07's `village-ways`), `BlockKind`,
`SquareType`, `SeamRun` and `TypedBoundary` are declared in §2.5 (item 505); `OutlineTemplateId` is §4.2 S1 (2)'s row
key, its standalone rows added by item 285 (V01 §3.10.2).

```ts
type HoodSite = 'court'|'plotYard'|'yardBlock'|'square'|'green'|'cemetery'|'fieldEdge'|'outsideYard';   // hood-pin sites (V01 §3.8.2); the last three hinterland
```
=== END ===

=== REPLACE ### 2.2 Rows (editable tables, §7.6) ===
### 2.2 Rows (editable tables, §7.6)

Every `hood.*` table and `squares.quota` carries §7.6's per-preset cells: the `default` value and the `MFCG` and `FTG`
entries where they differ; `NG` entries stand only on the `hood.constants` cells V01 §3.15 lists — never on another
`hood.*` table, on `squares.quota` or on a base table, each of which resolves under `NG` as under `MFCG` (§7.6, item
584). Every cell has `{ value, unit, provenance, calibratable }`. A row or column marked `extension` has its **switch
cells** — chances, gates, weights, gains, quotas and options — 0 or off in the `MFCG` and `FTG` presets (§7.6's marker;
T-V1-4), and so under `NG` unless V01 §3.15 lists an `NG` entry for them; its **geometry cells** — sizes, heights,
clearances, distances, angles, thresholds and factors read only inside a switched step — carry no marker, so every preset
reads them at their values (J-V1.98).

```ts
// ---- `hood.templates` — one row per fabric (V01 §3.4); read by S7c, the land estimate, S8's template machine, the panel's cards and the S4 (b) classifier
interface TemplateRow {
  id: FabricStrategyId; label: string /* the card's name: Organic, Main street, Square, Rings, Quayside, Wall-side, Crossroads, Around the church, Bridgehead, Terraces, Green */;
  seeds: SeedSpec[] /* laid in order in the template face (V01 §3.4.1); [] for 'bent-cut' */;
  requires: TemplateRequirement /* eligibility on DistrictContext (V01 §3.3.2) */;
  select: { base: number; kind: Partial<Record<DistrictKind, number>>; terms: CharacterTerm[]; plannedGain: number; ngOdds?: number /* the standalone auto draw (V01 §3.3.5) */ };
  params: Record<string, { default: number; range: [number, number]; unit: string }> /* the District.fabricParams keys the row reads; every seeded row has `streetWidthM` (V01 §3.4.2 (b)) */;
  fallback: FabricStrategyId[] /* F-TEMPLATE's substitution rung (V01 §3.13), ending in 'bent-cut' */;
  outline?: OutlineTemplateId /* the standalone outline family this fabric draws (V01 §3.10.1 step 1); absent → the kind row's weights */;
  extension: boolean /* true for every row but 'bent-cut': the parity presets zero its S7c weight */; provenance: string }
// templateLandM2(D, row): number — the built land (m²) the row's seeds take from D, a pure function of the row and DistrictContext (V01 §3.3.7); 0 for 'bent-cut'
type SeedSpec =
  | { prim: 'spine'; from: Anchor; to: Anchor | { parallel: 'water'|'wall'|'contour'; offset: 'onEdge'|'plotRow'|'contour' }; role: 'main'|'quay'|'wall'|'contour'|'cross';
      series?: true /* contour only: a contour series with a ravine's thalweg path (V01 §3.4.3; the `stepped` row) */ }
  | { prim: 'ring'; centre: 'centroid'|'landmark'; courses: 'law'|1 }
  | { prim: 'plaza'; at: 'centroid'|'crossing'|'bridgeEnd'|'gate'; mode: 'carved'|'void'|'green'; shape: 'coin'|'rect'|'round'; type?: SquareType /* absent for 'green' */; through: boolean }
  | { prim: 'fan'; from: 'plaza'|'ring'; portals: [number, number] /* at least, at most */; cls: 'secondary'|'path' };
type Anchor = 'portal:best'|'portal:gate'|'portal:bridge'|'pair:1'|'pair:2'|'axis';   // V01 §3.4.2 (a); 'pair:1'/'pair:2' the crossroads' two crossing pairs
interface TemplateRequirement { minFaceAreaM2Law: 'ring'|'plaza'|'spine'|'none'; portals?: number /* usable portals on the template face, at least */;
  waterShare?: number; wallShare?: number /* share of the district's boundary length of that seam type, at least; `wall` counts walled stretches only (V01 §2.3) */; noIntervallum?: boolean;
  landmarkSigma?: number; bridgePortal?: boolean; slopeMeanPct?: number; crossingPairs?: boolean; arenas: ('ground'|'sky')[] }
type CharacterTerm = { of: 'mix'|'sectors'|'trade'|'mainRoad'|'identity'|'shade'|'chain'; key?: string; gain: number };
  // factor (1 + gain × value), value in [0, 1]; 'identity' 1 when χ̃'s provisional identity row is `key`; 'shade' DistrictContext.shade.meanShare;
  // 'chain' 1 when a context chain has `alongWay`; 'shade' and 'chain' terms are `extension` (0 gain in the parity presets)

// ---- `squares.quota` — the one square quota, a base table (§4.7 S9, item 301) whose rows this volume authors (defaults V01 §3.5.2; V11 registry row 91):
//      S7b (3) claims the squares larger than a block from it, S9b the sub-block remainder
// SquareQuotaRow is §10.2's (the base table `squares.quota`, read by S7b (3) from M2b and by S9b); this volume authors its default rows (V01 §3.5.2; V11 registry row 91)
// ---- `hood.dispatch` — one row per band of §4.5's band set (a band without a row interpolates, item 27); read by S9b (V01 §3.5)
interface DispatchRow { band: string;
  manorBlockShare: number /* share of eligible blocks given whole to one compound (V01 §3.5.5) */;
  small: { ordinary: number; yard: number; green: number } /* phase-2 weights for small blocks (V01 §3.5.6) */;
  yardPaved: number /* a yard block's chance of paving, else grass (V01 §3.5.6) */; extension: true }
// ---- `hood.squares` — one row per SquareType; read by the plaza primitive (V01 §3.4.5) and S9b (V01 §3.5.3)
interface SquareRow { type: SquareType; m2PerInhabitant: number /* the square-sizing row S4 (d)'s fallback rescales (§13.7) */; minM2: number; maxShareOfFace: number;
  centrepiece: { kind: Pin['kind']; weight: number }[] /* S11's centrepiece draw on `pin.centrepiece`; II.2's centrepiece rule reads this row (item 542) */ }
  // a place's knowledge defaults from `hood.placeKnowledge`, not from this row
// ---- `hood.pins` — the neighbourhood-tier pin rows (V01 §3.8.2; II.3's gate and decay); arena-keyed, the underground's rows as V01 §3.8.2 states
interface HoodPinRow { kind: Pin['kind'] /* well, pump, trough, fountain, large_tree, statue, monument, bandstand, cross, shrine */; arena: 'ground'|'sky'|'underground';
  sites: HoodSite[]; gate: { band: string; p: number }[] /* per-site probability at the band for square, yard-block and green sites, interpolated; court, plot-yard and
    hinterland sites × `hood.constants`' pin.courtFactor */;
  weight: number; identity?: Partial<Record<string, number>> /* factor by the district's placed identity row (V01 §3.8.2) */;
  shadeGain: number /* the gate × (1 + shadeGain × shade at the site): −0.5 for fountain and bandstand, 0 otherwise (item 102) */;
  sizeM: [number, number]; heightM: number /* its prism shadow (V01 §5.1.4) */; clearanceM: number; extension: boolean }
// ---- `hood.placeKnowledge` — { kind: HoodPlace['kind']; subtype?: string; knownTo: 'public'|'local'|'secret' }[] (V01 §3.7.1)
// ---- `hood.defaultCuts` — per band set: number[] (V01 §3.10.1 (5); derived from the band set's default shares unless a row is authored)
// ---- `hood.kinds` — the standalone programme's rows (V01 §3.10.1); DistrictKind values only
interface HoodKindRow { kind: DistrictKind; weight: number /* S0's draw when the recipe names no kind */; areaHa: [number, number];
  anchors: { cls: string /* a roster class id */; count: number }[] /* singular or defining classes the hood holds (a temple hood its church) */;
  affinity: Record<string /* class family, §10.2 */, number> /* × the family's share of the dispersed demand */;
  outline: Partial<Record<OutlineTemplateId, number>> /* the fallback outline weights for a context-row fabric (V01 §3.10.1 step 1) */;
  needs?: 'waterEdge'|'riverEdge'|'wallEdge'; maxWealth?: number /* shanty: drawn only when intent.wealth ≤ this */ }
// ---- `hood.constants` — every constant of V01 §3 that is not a cell of another row (V01 §3.14): ONE row, key 'settings', in volume 11's settings form
//      (V11 §2.1): each V01 §3.14 key is a column — its dotted name the key — whose ColumnSpec holds its type, unit, range, `calibratable` and
//      `extensionAllowed`; the compiled cell takes unit and `calibratable` from it (V11 §2.2), and each calibratable column takes its own register entry
//      `cal.hood.constants.*.<key>` (V12 §3.11; V01 §8.1). The only `presets.NG` entries of this volume stand here (V01 §3.15; J-V1.99).
interface HoodSettings { key: 'settings';
  [column: string]: unknown /* §7.6's cell as V11 §2.2 compiles it, one per row of V01 §3.14's column table: `{ value, unit, provenance, calibratable, extension?, presets? }` — a number,
    a bool (the `ng.*` switches), an enum string (`pin.decayScope`), a [lo, hi] range (`tpl.arrivalDeg`) or a list (`ng.plazaM2`), as its ColumnSpec types it */ }
// ---- `way.surface` — V01 §3.7.3's rule rows
interface SurfaceRow { wayClass: WayClass; era?: string; band: string; surface: Way['surface'] }
```

The base records this volume writes are declared at their homes: `District.terrace` (§2.5, item 211); `Block.content`,
`squareType`, `ringCentre`, `voidCorner`, `overrides` (§2.5, item 210); `HoodPlace` (§2.7, item 207); a template plaza's
`Reservation` of stage S8 — kind `plaza` for a carved plaza, a `square` face to S9 whose `SquareType` S11 reads from the
row that laid it; kind `park` for a green-mode plaza, planted by §4.9's parks row (§2.5, item 210 (c)).
=== END ===

=== REPLACE ### 2.3 Views and services (derived, never stored) ===
### 2.3 Views and services (derived, never stored)

`DistrictContext` is the district-level view over the one context vector, `ContextVector` (§2.5): its `kind`, `prosperity`, `band`,
`density`, `growthStage` and `arena` read the same fields the context vector samples per plot, aggregated over D, never a
second copy; the rest are stage 2's own reads of committed state. `TypedBoundary` is assembled from `District.seams` on
demand (§2.5).

```ts
interface DistrictContext {   // the one context every stage-2 rule reads; assembled by `@plat/hood` from committed state, draw-free
  district: Id; arena: 'ground'|'sky'|'underground'; kind: DistrictKind; regime: StageRegimeId /* §4.4's regime of its growth stage */;
  areaM2: number /* intramural-garden faces (item 106 (b)) and every raised part's under-deck strip (V01 §3.17.3) excluded */; templateFace: FaceRef | null /* V01 §3.4.1 */; templateFaceAreaM2: number;
  faceObb: { majorM: number; minorM: number; axisCdeg: Cdeg };
  inscribedRadiusM: number /* the template face's largest inscribed circle, by §3.8's `spine` reader's clearance */;
  prosperity: number /* area-weighted pass-1 value; pass 2 once S10a (ii) has run */; band: string; density: number; growthStage: number;
  inhabitants: number /* Σ of its allocation's household rows × the roster's mean household size (the greedy allocation at S7c, the committed one after);
    intramural gardens hold none — they are not built land (item 106 (b)); the deck plots D owns count (V01 §3.17.6) */;
  eLo: M; eHi: M; dBar: M /* §4.6 step 1's block-depth range and band plot depth */; wMin: M /* §4.6 step 6's minimum plot frontage */;
  character: CharacterVector; characterSource: 'provisional'|'placed' /* V01 §3.2: provisional before S12c, placed after */; identityRow?: string;
  identitySource?: 'dossier'|'emergent'|'dominant'|'plain' /* a QUARTER ladder record makes it 'dossier' (V01 §3.5.12) */;
  intent: DistrictIntent /* §7.7 layer 2, resolved: absent fields derived by §7.7's rules */;
  portals: { id: Id; class: WayClass; at: PointCm; bearingCdeg: Cdeg; kind: 'way'|'gate'|'bridge'|'landing'; onTemplateFace: boolean }[] /* ranked (V01 §3.4.2 (a)); 'landing' a
    landing's attach vertex — a sky island's (V01 §3.10.3) or a ground landing's S8 destination — a template portal, never counted in SeamReport.portalsTotal (V01 §3.11 (6)) */;
  water: { lengthM: number; share: number; bodies: ('sea'|'river'|'lake'|'canal'|'harbour')[]; quayWay: boolean };
  walls: { lengthM: number; share: number; intervallum: boolean } /* over walled stretches only: `full` and `parapet` runs; a `parapet` run never has an intervallum */;
  barriers: { cliffM: number; marshM: number; closureWaterM: number } /* barrier-closure arcs on D's boundary (item 106 (a)), read by the wall-side feature and the panel */;
  slope: { meanPct: number; p95Pct: number; fallCdeg: Cdeg } /* on the unlevelled terrain */;
  terrace: TerraceState /* terraceState(D), below (V01 §3.17.1) */;
  raised: { way: Id; kind: RaisedKind /* §2.7 */; reason: 'drop'|'link'|'water'|'declared'; stripM2: number }[]
    /* the raised parts whose under-deck strip meets D's faces, with their reason word — derived from the raised-way record's `RaisedReasonKey`
       (V06 §2.13; J-VI.2): viaduct → 'drop', elevated road → 'link', aqueduct → 'water'; 'declared' where the way's lifecycle cause is an edit or a
       skeleton file (item 244's derived source) — read by the panel and the why providers (V01 §4.5) */;
  shade: { meanShare: number /* area-weighted mean of item 102's shade(x) over D from terrain and walls (field pass 1's sampler); on a sky arena
      shade(x) is volume 5's shadeSky(x) on the island's 32 m lattice (V05 §3.11 (4)) and meanShare its area mean over D — no sky reader reads the ground's
      pass-1 mask */;
    islandShare?: number /* D's area share inside any island's shade strip (V05 §2.3a) — on a sky arena, inside a higher island's strip onto this island
      (V05 §3.19 (3)); absent before SKY has written the islands' shade basis; read by the panel's reader query, the clerk's why and volume 9's shade view
      (post-generation; S9b and the pins read the strips themselves, V01 §3.5.5) */ };
  landmarks: { reservation: Id; cls: string; sigma: number; centroid: PointCm; guild?: Id /* a GUILD ladder record's hall (V01 §3.5.12) */ }[] /* S3 and S7b reservations inside it, σ by §4.5 (1) */;
  records: { record: Id; step: LadderStep /* V11 §2.6 */; membersHere: number; membersTotal: number }[] /* ladder records with members in D (item 108) */;
  chains: { chain: Id; compatible: boolean; membersHere: number; alongWay?: Id /* an incompatible chain's tier-1 way through D along which its members lie in ≥ 2 districts */ }[];
  under: { part: number; element: Id; access: boolean; shareOfD: number }[] /* volume 4's cavern, ruin, quarry and catacomb elements whose footprint overlaps D; `access` — the
    element's cluster's `excavation` reading is `accessible` (V04 §3.5.7 (g)); a quarry or catacomb element always true (item 109 (j) (3)); filled only once the
    underground tail has run, so no stage reads it before the tail: its readers are post-generation — the panel's reader query, the clerk's why, volume 9's voids view */;
  squaresM2: number /* existing square area inside it: the main plaza, §4.8 forecourts, gate plazas, S7b square and market claims, template plazas, void squares */ }
interface TerraceState {   // terraceState(D): pure, draw-free, in @plat/model beside DistrictContext; lands at M3a (V01 §8.1)
  asks: boolean /* D.terrace 'on' → true, 'off' → false; absent → the relief rows' `terracedEdges` cell at the site's relief class — on a sky arena the island's (V01 §3.17.7 (2)) —
    (V11; item 110 (a) "when the relief row asks for terraces") OR an authored S1 `terrace` site primitive (§4.2 S1 (1)) under ≥ terrace.siteShare of D's area */;
  source: 'declared'|'relief'|'site'|'none';
  walls: boolean /* slope.meanPct ≥ 100 × the rung's `terrace.slopeMin` (V11's TerraceRow, a share; this volume's percent = 100 × share): walls may stand; below it terraced streets only (V01 §3.6 (8)) */;
  stepCm: Cm /* Δz of V01 §3.4.3's series at D's `terraceSpacingM` (its default when D is not `stepped`): the expected rise between two contour streets */ }
  // read by S7c, S8's series, the base's district-edge source (item 302), the elevated-road generator's terrace endpoints (V06 §3.19.3), the panel,
  // the terrace why provider and naming.district's `terraced`; computed from records eager at S6's end, never from District.fabric (so no cycle with S7c)
// Provisional character χ̃ (V01 §3.2): §4.5 (2)'s CharacterVector computed over the allocation rows; no type of its own
interface DistrictSignature {   // derived; every component in [0, 1]; T-V1-5's classifier standardises it over B-CITY
  loopShare: number /* share of D's way length on closed loops */; spineShare: number /* the longest spine's share of D's way length */;
  squareShare: number /* square and plaza share of D's area */; bearingOrder: number /* 1 − the normalised entropy of D's lane bearings (18 bins of 10°) */;
  orthogonality: number /* share of junction angles within ± 10° of 90° */; edgeAligned: number /* share of frontage within 15° of the nearest `water` or walled run */;
  contourAligned: number /* share of lane length within 15° of the contour */ }
interface FabricSignature {   // fabricSignature's answer (V01 §3.16; J-V1.78): the town side of V12 §3.4's paired measures over a region, by V12's definitions
  blockAreaM2: number | null /* V12's `block.area` over the built blocks inside the region (the town side of `ruin.blockArea`) */;
  r4: number | null /* V12's `grid.r4` over the committed part-0 ways inside the region */; axisDeg: number | null /* V12's `grid.axis` */ }
  // null where V12 reads `notApplicable`
// Find's area targets and Show gaps' units (V01 §5.4; item 120): view data — derived per commit and per view key, outside the document, its hash and the log
interface FindArea {   // findAreas' row (V01 §5.4 (1))
  id: Id /* the District's, the city-cut QuarterNode's or the RegionGroup's */; kind: 'district'|'quarter'|'region';
  word: 'district'|'neighbourhood'|'quarter'|'region' /* the panel's word: 'neighbourhood' for an `undercity` or `underground` district and a standalone
    neighbourhood document's district, 'district' for every other (J-V1.35: one target per area, never two) */;
  name: NameRef /* its LabelEntity's text, `displayText` where set */; identity?: string /* a district's identity row label (item 72): a search word */;
  districts: Id[] /* itself, or its member districts the key admits, in address order */;
  shapes: { layer: 'ground'|'underground'|'sky'; area: PolygonCm[] /* the union of those districts' L1 faces on the layer, one per component;
    a sky shape in its island's local frame (S14 places it, V05 §5.4) */ }[];
  anchor: { layer: 'ground'|'underground'|'sky'; at: PointCm } /* on its largest shape: its label's first spine's midpoint, else that shape's pole of
    inaccessibility — the pin below item 120 (e)'s pin threshold and the ghost pin on another layer (V01 §5.4 (2)) */ }
interface GapUnit {   // gapUnits' row (V01 §5.4 (3)): one per unit holding no member of the chip that the key admits
  unit: CoverageSpec['unit'] /* the unit read (V01 §5.4 (3)): the class's, 'neighbourhood' read as 'district' (J-V1.35), 'district' for a class with none */;
  id: Id /* the district (a `district` unit, and the district holding a per-plot unit's gap); a parish cell's church member (the district before any church);
    `TOWN_ROOT` (§6.1, §14) for `settlement` */;
  layer: 'ground'|'underground'|'sky';
  plots: Id[] /* the gap's plots: a partition unit's plots; a per-plot unit's unserved residential plots */;
  area: PolygonCm[] /* a `district` unit's faces united, else the union of `plots`' faces; one per component, each drawn dashed with one "none here" */ }
// Item 122's disaster units (V01 §3.16): view data — derived per commit, overlay and key, outside the document, its hash and the log
interface DisasterUnit {   // one unit a disaster look may ruin: a ground district at TOWN and above; at THORP, HAMLET and VILLAGE V07's unit, built in this shape by V07
  id: Id /* an entity's, whose render key keys the draws (V01 §3.16 (4)) */; centroid: PointCm /* its land's area centroid */; inhabitants: number /* a district's DistrictContext.inhabitants */;
  meanHeightCm: Cm /* Terrain.heightCm's mean over its land (§2.3) */; waterFront: boolean /* a district's: DistrictContext.water.lengthM > 0 */;
  neighbours: Id[] /* the units it shares a boundary run with (a district: a seam, II.1), in address order */ }
interface DisasterSource {   // disasterSource's answer (V01 §3.16)
  calamity: CalamityRef | null /* the overlay's calamity (§4.11; V01 §3.16 (2)): its `type` read by V02 §5.7 (4); null for a preview or where none falls in its weeks */;
  pattern: 'fire'|'flood'|'scatter' /* the calamity's hazard in V06 §2.4's calamity table: fire, flood, else scatter; read by §8.2's disaster row and V02 §5.7 (4) */;
  units: Id[] /* the units ruined: a prefix of the strike order, in that order (V01 §3.16 (4)–(5)) */;
  matched: Id[] /* the units the calamity's targets name, admitted at the key: the first read by §10.2's `affectedQuarter` place */;
  unmatched: Id[] /* its target ids, admitted at the key, that name no unit: reported in the view telemetry */ }
// @plat/hood services (V01 §3.16), pure and draw-free:
//   catchmentOf(plot: Id, unit: CoverageSpec['unit'] | 'neighbourhood', per?: number): Id[] /* the plots of the plot's unit as V11 §2.3 defines it (V01 §3.16) */
//   districtsAbove(part: number, element: Id): { district: Id; share: number }[] /* area overlap of a void's footprint with each surface district, shares
//     descending, ties by district address — so its first entry is II.7.5 (2)'s parent for an undercity's main chamber */
//   fabricSignature(region: PolygonCm): FabricSignature /* volumes 4 and 11 pass a ruin's outline */
//   skyDistrictCount(plotLandM2: number, districtHa: number): number /* a sky island's district count, 1–3 (V01 §3.16) */
//   findAreas(key: Admission): FindArea[] /* Find's area targets on every layer, at the view's effective key (V01 §5.4 (1)) */
//   gapUnits(chip: { classes: string[] }, key: Admission): GapUnit[] /* Show gaps' units of a kind chip on every layer (V01 §5.4 (3)) */
//   disasterSource(doc: Document, overlay: ConditionOverlay | null, key: Admission): DisasterSource /* a disaster look's units; null: a preview of the `disaster` look; its only draws view render hashes (V01 §3.12, V01 §3.16) */
//   disasterDistricts(doc: Document, overlay: ConditionOverlay | null, key: Admission): Id[] /* disasterSource(doc, overlay, key).units — §10.2's `neighbourhoods` (item 122) */
//   campLand(doc: Document): FaceRef[] /* the outskirts' land a camp look may take, in address order (V01 §3.16; item 122) */
interface HoodPin {   // derived by the refine close-up (V01 §3.8.2); never stored; its overrides are Block.overrides
  host: Id /* the block, or a hinterland face */; ordinal: number; kind: Pin['kind']; site: HoodSite; host2: Id /* the court residue, yard part, block face or land-use face it stands on */;
  at: PointCm; sizeCm: Cm; angleCdeg: Cdeg; heightCm: Cm; state: 'generated'|'moved'|'restyled'|'added'|'rematched' }
interface WayNamingContext {   // S13a's naming input for a way (V01 §3.7.2), derived at S13a
  cls: WayClass; lengthM: number; shape: 'straight'|'bent'|'curved'|'ring'|'stepped' /* 'stepped': a stair-stepped way (V01 §3.6 (3)) */;
  to?: 'gate'|'market'|'bridge'|'church'|'castle'|'harbour'|'square'|'well'; landmark?: { cls: string; name: NameRef };
  trade?: string /* the class family of ≥ 0.3 of its σ-weighted frontage uses */; band: string;
  districtIdentity?: string; water: boolean; slopePct: number; placeOnIt?: Id /* a HoodPlace record its course passes (created before the ways are named, V01 §3.7.1) */;
  terraceIndex?: number /* a contour-series street's rank from the lowest level laid, 0 (V01 §3.4.3) */;
  raised?: RaisedKind /* §2.7: a raised way's kind, for naming.way's guard (V01 §3.7.2) */ }
```

A retaining wall's step profile is §2.7's derived view `stepProfile(wall)` (item 245), which this volume reads (V01 §3.11
(7), V01 §3.17.2).

**Arena parts per reader** (item 110 (b); J-V1.66). Item 110 (b) puts every raised deck in a ground arena part from 1
(`PlatKey.part ≥ 1`; §3.4). Every rule of this volume that reads `ways` reads the parts this table gives, and cites it.
On a sky arena the island's one part (V05 §2.1) reads as part 0 in every row and wherever this volume says "part 0" —
an island carries no raised way (V05 §3.22 (3) (d)) — and "raised" means a ground-arena part ≥ 1 (J-V1.95).

| reader | part 0 (a sky island's own part) | a raised road (viaduct, elevated road) | an aqueduct |
|---|---|---|---|
| χ̃'s frontage, `mainRoad` and trade (V01 §3.2); `chains[].alongWay`; S7c's `chain` term | yes | no — nothing fronts a deck | no |
| portals and their ranks, `bridgePortal`, `portal:gate`, `portal:bridge`, the bridgehead template, S9b's bridgehead squares (V01 §3.4.2 (a), V01 §3.4.5, V01 §3.5.3) | part-0 gates; part-0 decks over water only — on a sky arena the island's own decks over its conjured river among them (V01 §3.10.3 (4)) | no; each ramp or stair end is an ordinary ground junction ranked by its carried class | no, never a portal |
| S9b's junction arms and the void junction; the greens' tier-1 frontage; manor prestige; the bank path; the quay way (V01 §3.4.5 (c), V01 §3.5.3–V01 §3.5.5, V01 §3.6) | yes | its ramp and stair ends, as junctions of its class | no |
| the surface rule (V01 §3.7.3) | by its fronting blocks | the base's value for its class (it has no fronting blocks) | none |
| the naming context (V01 §3.7.2) | as V01 §3.7.2 states | `shape`, `to` (from its ends), `landmark` and `raised`; no `trade`, no `band`; its kind word the base's | none — the base names it as a feature |
| `DistrictSignature`, `fabricSignature` (V01 §2.3, V01 §3.16) | yes | no | no |
| `SeamReport.portalsConnected`'s walk (V01 §3.11 (6)) | yes | yes, as one edge between its two end vertices | no |
| `TypedBoundary`'s runs (V01 §3.11 (8)) | yes | never a seam: its strip is a hole (V01 §3.17.3) | never |

Raised decks carry no deck plots (V02 §3.16, J-V2.71): item 110 (d)'s plots stand on part-0 decks over water, moles, piers
and quay platforms (V01 §3.17.6).
=== END ===

=== REPLACE ### 2.4 The request, the result and the report ===
### 2.4 The request, the result and the report

`NeighbourhoodRequest`, `NeighbourhoodResult` and `SeamReport` are II.1's (item 539), with their fields' presence rules
and the derived mode (J-V1.3); this volume's unit runner, close-ups and SKY-F hand-over fill them (V01 §3.8–V01 §3.11).

**Implementers and callers.** II.1's `NeighbourhoodStrategy.generate(req)` is implemented once, in `@plat/hood`, and
dispatches on the derived mode: `refine` → the close-up deriver (V01 §3.8), called by the generation worker when §4.1's
trigger fires (a click, an outline, or a visible tile under `'view'`); `unit` → the unit runner (V01 §3.10), called by
`generate` for a standalone neighbourhood document and by SKY for each island (reading `skyUnitInput(doc, island)`,
V05 §2.3), returning the unit's `districts`; `replace` is never a `generate` call — it is `setAttr` + `regenerate`
through the edit engine (V01 §3.9), whose S8 calls `FabricStrategy.partition`, implemented by `TemplateFabric` (and the
base's `BentCutFabric` for `bent-cut`). The `DistrictContext` builder is called by S7c, `TemplateFabric`, S9b, the why
providers and the reader's `query` for the close-up panel and the clerk (V01 §4.5); the services of V01 §3.16 by the
callers each names there.
=== END ===

=== REPLACE ### 2.6 The standalone neighbourhood document's recipe ===
### 2.6 The standalone neighbourhood document's recipe

`HoodRecipe` (`Recipe.hood`, item 272) is §2.9's; its rules are V01 §3.10.1's. The layers a standalone neighbourhood
document may hold are fixed by V01 §3.10.1 (7) through the inputs its S0 writes.
=== END ===

=== REPLACE ### 2.7 Lifecycle of every state field this volume adds (create · read · persist · regenerate · undo · migrate) ===
### 2.7 Lifecycle of every state field this volume adds (create · read · persist · regenerate · undo · migrate)

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `District.fabric`, `fabricParams` (base fields written by S7c) | S7c (V01 §3.3) inside S7b (1) at generation; `setAttr` (declared, held, §7.2); a skeleton `quarter` with `fabric` (item 349); a dossier naming claim never sets it | S8's template machine, S7b's reconcile (the land), the panel, the clerk, the S4 (b) classifier, the district naming features | the district's leaf digest (§6.2) | S7c re-runs only on a Re-derive from S7b or earlier, never over an edited path; New random on the district keeps it (the draw is keyed by the district's lineage, V01 §3.12) | the `setAttr`'s undo record restores the former value; the grouped `regenerate`'s undo restores the district | absent reads `'bent-cut'`; an unknown row id falls back by §7.5's table-row migration to `'bent-cut'`, reported |
| `Block.content`, `squareType`, `ringCentre` | S9b (V01 §3.5) | S10a (iii), S10, S10b, S11, S12b, S13a, S14, exports | the block's leaf digest | re-derived with the block by any re-derivation that re-runs S9b for it (from S8, or S10a (i) of its district); a block re-derived from S10 keeps it | the event's undo record | absent → `'ordinary'`, no squareType; a stored `'market'` square type reads `'trading'` (§7.5, item 210) |
| `Block.voidCorner` | S9b for a void square (V01 §3.4.5) | S10's claims-first step | leaf digest | as `content` | undo record | absent → none |
| `Block.overrides` | an `instance` event on a hood pin (V01 §4.1) | the refine derivation's override pass (§8.10's resolution), the reader | leaf digest (hashed with the block) | resolved by §8.10's law at each derivation; a superseded block's rows move to its `supersededBy` successor (§8.10) | the `instance` event's inverse | schema row; an unknown pin kind → the row orphaned, reported |
| `HoodPlace` (square, green, yard, court) | S13a's creation pass (V01 §3.7.1); T11's name tool on an unnamed court, yard or square (minted from the event's seq) | the way-naming context, S13b through its `LabelEntity`, the reader, exports | entity leaf; names in the naming records (§2.8) | succeeded by §6.3's anchor rule with its host; a host that ceases to qualify tombstones it (its name kept in the archive); a user-created place stays while its host face exists; a switch edit to 0 retires every derived one, one raising it makes them again (V01 §3.15) | the event's undo record | registry row; none before M5 |
| `HoodPlace` (opening) | the opening pass (V01 §3.7.1) from a public-opening or catacomb-entrance `AccessPoint`, in every commit V04 §3.10 names that creates, removes or re-kinds one, the underground tail's T6 at generation first | labels, the reader, exports, the pins' clearance | entity leaf | lives as long as its host `AccessPoint` while the local-place step runs (the stage-2 switch > 0): re-derived with it by the same pass in each such commit, tombstoned with it, retired by a switch edit that lowers the switch to 0 and made again by one that raises it (V01 §3.15; V04 §3.10); a closure state on the host changes its symbol, never its name | undone with its host's event, or with the switch edit's | registry row; none before the underground layer |
| `HoodPlace.name`, `.knownTo` | S13a's naming pass; `setAttr` | the knowledge admission (§9.2), labels | naming record; leaf | §6.3's naming cases; an edited value held (§7.2) | undo record | §7.5 |
| `CloseupRecord` | the first `closeup` event on the district (V01 §3.8.6) | the refine derivation (its params); §7.4's independence check (`since`) | the `closeups` block of the model digest | survives any re-derivation of the district (keyed by its address); carried to the anchor successor of a merge or split; a district tombstoned takes it to the archive | the `closeup` event's undo (§7.4's independence check) | `params` schema-versioned; an older `tableVersion` keeps deriving with that version while §6.4's retention window holds it, then migrates to the current and reports |
| `Way.surface` (base field, derived by V01 §3.7.3 unless edited) | S10a's end (V01 §3.7.3) | S14's road programs, the reader, exports, naming | way leaf | re-derived when its fronting blocks' pass-2 band changes, unless the path is edited; a bounding way's surface is inside the re-derived district's seam exception (§7.3 item 1, item 369) | undo record | absent → the rule's value at load |
| `Recipe.hood` | T1 `intend` with `product: 'hood'`, a skeleton file, the API | the unit run's S0–S2 (V01 §3.10) | recipe (canonical) | a Re-derive from S0 re-reads it | a recipe `adjust`'s undo | `Recipe.product` absent → `'town'`; a stored `kind` that is not a `DistrictKind` (`residential`, `manor`, `slum`) → `central`, `central` with wealth 0.9 and planned 0.5, `shanty` with wealth 0.1, reported; an absent `edges.slope` reads flat |
| `District.terrace` | `setAttr` (T8's chip, V01 §4.1); a skeleton `quarter` with `terrace` (item 350) | `terraceState` → S7c, S8's series, the district-edge source (item 302), the elevated-road generator (V06 §3.19.3), the panel, the why provider, naming | the district's leaf | held (a declaration, §7.2); absent re-derives with its inputs | the event's undo record | absent → derived |
| a `RetainingWall` as this volume reads it (its record, lifecycle and state profile item 245's, §2.7; source `generated` by the base's S10–S11 levelling, the ward edge's source included, item 302; `declared` by T3 `retaining` or a T2 terrace stroke's edge) | the base | the seeds' validation (V01 §3.4.2 (d)), the fixed inputs (V01 §3.5.12), the court sites (V01 §3.8.2), the chunk digest (V01 §3.8.3), S14, the exports, the why provider, the dry run's fates | the base's entity leaf — never the step profile | `generated`: with its district's S10 (a replace close-up, New random, §7.3's terrain operator through D); `declared`: held, a fixed input (V01 §3.17.2) | the event's undo | a document without item 110 has none |
| the rim walk's pair — one `esplanade` and one `street_trees` `Greenery` on a sky island's rim strip (base records, item 313) | `plantRimWalk` (V01 §3.10.3 step 4): the unit run, after its districts' S12b; each event that re-lays the strip (V05 §4.2's resize and rim reshape) | S14's green and tree marks, the exports' greenery rows, the reader | the base's entity leaves on the island's arena | re-planted whole by `plantRimWalk` at every unit run and strip re-lay, §6.3's carry-over retiring the old pair in the same batch; never by a district's re-derivation | the calling event's undo record (the pair restored with the strip) | none: the pair lands with the unit run (W8), before any document holds an island (M6-sky) |
| the unit's `Allocation` (standalone) | S7b in the unit run (V01 §3.10.1), less the void part step 6 hands to the underground pseudo-district's `Allocation` (S7b (6) (d)) | S10a | as every `Allocation` | re-derived with S7b | undo record | as §2.5 |
| `hood.constants` (one `settings` row; the `NG` preset's entries among its cells), `squares.quota` | authors (`@plat/tables`) | every rule that cites a key (V01 §3.14); S7b (3) (`squares.quota`) | the table files; a document pins the versions it read (§7.6) | an `editTable` re-derives from the first stage that reads the cell (§7.6) — for the stage-2 switch `fabric.extensionWeight`, from S2 with §6.3's carry-over (V01 §3.15) | `editTable`'s (or `editPreset`'s) undo | §7.6's table-row migration |

Derived and never stored: χ̃ (V01 §3.2), `templateLandM2`, `DistrictContext`, `terraceState`, `stepProfile`, the
under-deck strips as holes (V01 §3.17.3), deck-plot ownership (V01 §3.17.6), `TypedBoundary`, `DistrictSignature`,
`FabricSignature`, the three services' answers, Find's area targets and Show gaps' units (`FindArea`, `GapUnit`: view
data, outside the document, its hash and the log; V01 §5.4), the crisis services' answers (`DisasterUnit`,
`DisasterSource` and `campLand`'s faces: view data likewise; V01 §3.16), `HoodPin`, the ground `AccessPoint` symbols (V01 §3.8.8),
`WayNamingContext`, `SeamReport` (recomputed with each close-up or re-derivation and written to the generation report),
the close-up's cache chunk (V01 §3.8.3: non-canonical, dropped on mismatch) and every `WhyAnswer` (V01 §4.5). The
`blockLifted` notice is a line of the event's fate report, logged with the event; volume 4 reads it from the log
(V01 §3.9). Every row above is exercised by T-V1-55's round trip (V01 §7).
=== END ===

=== REPLACE ### 3.12 Determinism ===
### 3.12 Determinism

**Concerns** (§6.1, item 340; appended with the next u16 ids, so no key moves; each non-rerollable):
* `fabric.select` — S7c's draw (V01 §3.3.4): keyed by **the district's own lineage key with the reroll component forced
  to 0**, attempt cap 0; a merge or split successor inherits its anchor predecessor's key (§6.3's anchor rule carries each
  district's lineage); a district minted by an edit keys by its creating event's `seq` lineage (§6.3). So a New random on
  D, a declared quarter, a merge or split elsewhere, or a Re-derive that renumbers S6's seed order moves no district's
  draw but its own inputs'.
* `hood.dispatch` — S9b's picks (V01 §3.5): a block's own draws (phase 2's content, pick ordinal 0; a yard's paving, pick
  ordinal 1; a ring centre's pick, ordinal 0) keyed by the block's lineage (whose derivation unit carries D's reroll);
  the manor picks keyed by the district as derivation unit (its lineage with its current reroll) with the pick ordinal
  as the creation index; attempt cap 0; the void-junction choice draws nothing.
* `hood.template` — the seed primitives' draws (V01 §3.4.2 (f)): keyed by the template face's cell with the seed's
  creation index, attempt cap 3 (F-TEMPLATE's redraw rung).

The contour series, the thalweg path and the precinct rings draw nothing (level lines, flow lines and outline offsets
are deterministic), and neither do `terraceState`, the parts table, the strips or deck ownership. Existing concerns read:
`cut.*` (the bent cut; `cut.arc` also the ring courses, II.2 — the radii's u at index 0, the district's one growth factor
at index 1), `pin.decor` (hood pins, keyed by the block or hinterland face **with the stage component `STAGE_VIEW`**, so no
hood-pin draw aliases S11's decoration draws on the same concern), `pin.centrepiece` (square centrepieces, keyed by the
block), `greenery` (court greening, keyed by the block), `blueprint.features` (the standalone S0's draws, appended in
V01 §3.10.1's order), `naming` (place names), `epoch.transform` (the `hood.fabric` participant's draws, item (1)'s S7c rule included, all under its
registered stage `S9b`, V01 §3.3.6).

**Crisis looks draw from no concern** (item 122): `disasterSource`'s draws are view draws on §8.10's render keys under
§8.1's render tag `crisis.place`, keyed by the condition's id (a preview's by its look kind), so a disaster strikes the
same districts in every view and export and no stream, digest or hash moves (V01 §3.16 (4)); `campLand` draws nothing.

**Stage components** (§6.3's lineage key). Template seed ways and plazas take `S8.seed`, a registered stage id of their
own (item 345), so a seed's lineage key never equals a lane's minted by the same cell's S8 run; T-V1-36's
address-collision test runs per template row over B-FUZZ's faces.

**Reroll semantics.** New random on a district advances its reroll: S8's streams (`cut.*`, `hood.template`, the ring's
`cut.arc`), S9b's `hood.dispatch` (the blocks' lineage and the district's manor key carry the reroll) and everything
below re-draw; its fabric does not (V01 §3.3.4). New random on a block re-draws S10 onward for that block; its content
stays (S9b is upstream). Hood pins re-draw only when their block re-derives: `pin.decor` is a geometry concern, so no
`rerollLayer` reaches it — a user wanting other pins re-rolls the block or edits the pins.

**Order.** S7c and S9b visit districts in lineage order and blocks in lineage order; seeds in row order; ring courses
innermost first; hood-pin sites in V01 §3.8.2's order. The pool changes nothing (S7c and S9b are eager hooks on the
generation worker; the refine derivation is a pure function), so pool sizes 0–3 give one digest; §6.5 (9)'s
derived-complete test covers the close-up by deriving every district's close-up in two orders and comparing the chunks'
hashes.
=== END ===

=== REPLACE ### 3.14 Constants (with provenance and table home) ===
### 3.14 Constants (with provenance and table home)

Every numeric constant of V01 §3 is a cell of a table (item 23; DEFINITION §5 "Rules are data"): of its own row's table
where it belongs to a row, else a column of **`hood.constants`** (V01 §2.2) — its one `settings` row, each key a column
with its own `ColumnSpec` — whose key the rule's text cites. Only `editTable` changes them (§7.6). Style values are §8.2's
style-sheet cells. Values another unit owns are cited, never restated: volume 11's `ways.crossing` (`rampMaxGrade`,
`stair`), `terrace` (`slopeMin`, `stepMinCm`, `enabled`), the relief rows' `terracedEdges`, `raisedWays.structure`
(`clearanceCm`, `stripMarginM`, the material rows), `aqueduct.terminal`; the base's `character.anchorSigma` (§4.5) and §11.1's
`vtt.retainingMinCm`.

**Row cells.** Constants that belong to a row live in that row's table:

| constant | used in | table · key | provenance |
|---|---|---|---|
| S7c row weights and gains; eligibility shares (water, wall 0.2; slope 8 %; `landmarkSigma` `character.anchorSigma`) | V01 §3.3.2, V01 §3.3.3 | `hood.templates` · `select.*`, `requires.*` | `own`, calibrate at M5 (non-bent share 15–35 % at CITY; S4 (b)) |
| standalone `auto` odds 0.7 / 0.3 / 0.1 / 0.1 | V01 §3.3.5 | `hood.templates` · `select.ngOdds` | `ref:NG 1.2.2 random template weights (code)` |
| ring radii law (one factor per district), `ringJitter` 0.15, `ringPasses` 3 | V01 §3.4.4, II.2 | `hood.templates` · `params` | `ref:NG 1.2.2 ring courses (code)` (II.2, item 543) |
| series spacing `2 × dBar + w_tpl` (range `1.5–3 × dBar + w_tpl`) | V01 §3.4.3 | `hood.templates` · the `stepped` row's `params.terraceSpacingM` | `own` (hill-town practice: two plot rows and a street to a terrace) |
| plaza aligned to the face's OBB | V01 §3.4.5 | — (a rule, no value) | `own` (J-V1.5) |
| square quota rows, kind factors | V01 §3.5.2 | `squares.quota` (base) | `own`, target S4 (d) 0.03–0.15, median 0.08 (§13.7) |
| `manorBlockShare` rows | V01 §3.5.2 | `hood.dispatch` · `manorBlockShare` | `own`, anchored on NG's 6–11 % |
| small-block weights, `yardPaved` | V01 §3.5.6, V01 §3.5.10 | `hood.dispatch` · `small`, `yardPaved` | `own`, calibrate at M5 on the NG pairs |
| court-greening rows | V01 §3.5.7 | §4.9's table (item 313) · the court-greening row | `own`, anchored on NG's 23–58 % (item 58 (b)) |
| `way.surface` rows | V01 §3.7.3 | `way.surface` | `own` |
| hood-pin rows | V01 §3.8.2 | `hood.pins` | `own`; decay ÷ 10 `ref:NG 1.2.2 pin decay (code)`, P20 |
| `hood.kinds` rows, area bands, outline weights | V01 §3.10.1 | `hood.kinds` | `own` |
| default cuts `c → 0.1 + 0.75 c`; the six-band row | V01 §3.10.1 | `hood.defaultCuts` | `own` |
| place knowledge defaults | V01 §3.7.1 | `hood.placeKnowledge` | `own` |
| `star` (vertex count and angle laws, aspect `0.4 + 0.6 u`, ± 45° at 0.3), `star_round`, `street_strip`, `plaza_frame` | V01 §3.10.2 | the outline rows (§4.2 S1 (2), item 285) | `ref:NG 1.2.2 hood outline (code)` |

**The columns of `hood.constants`** (J-V1.99). The table is one row, key `settings`, in volume 11's settings form (V11
§2.1): each key below is a column, its dotted name the key the rules cite, with the `ColumnSpec` this table gives — its
`unit` and `calibratable` reach the compiled cell (V11 §2.2), its `range` clamps an edit (V11 §2.1; V11 §4.1's rule), and
`extensionAllowed` is true exactly where the marker column names a mode. Each calibratable column takes its own register
entry `cal.hood.constants.*.<key>` (V12 §3.11; V01 §8.1). Angle columns hold centidegrees (`cdeg`, §2.1) — a key's `Deg`
suffix names the quantity and the table gives degrees; `Pct` columns hold percent (`none`). **Marker**: `weight` or
`option` — a switch cell (V01 §2.2), `extension` with that mode, 0 or off in the `MFCG` and `FTG` presets; `—` — a
geometry cell, read at its value in every preset. **`NG`**: the column's `presets.NG` entry (V01 §3.15); `—` — none, the
cell resolving under `NG` as under `MFCG`. Provenance `own` unless the row names another.

| column(s) | used in | default | type · unit | range | calibratable | marker | `NG` | provenance |
|---|---|---|---|---|---|---|---|---|
| `fabric.extensionWeight` — the stage-2 switch | V01 §3.3.3, V01 §3.15 | 1 | number · `weight` | [0, 1] | no | `weight` | 1 (`own`; `fixed: the NG preset runs stage 2 (V01 §3.15)`) | `own` |
| `ng.fabric`, `ng.squares`, `ng.manors`, `ng.smallBlocks`, `ng.greens`, `ng.courts`, `ng.pins`, `ng.plazaByTag` — NG's rule switches | V01 §3.15 | off | bool · `none` | — | no | — | on (`ref:NG 1.2.2 ⟨the rule's behaviour⟩ (code)`, V01 §3.15's reference column) | `own` |
| `ng.plazaM2` — the plaza areas by size tag (small, medium, large), read wherever `ng.plazaByTag` is on | V01 §3.15 | 450, 1 800, 7 200 | list · `m2` | [100, 20 000] each | yes | — | — | `own`, calibrate at M5 on the NG pairs by T-V1-31's plaza share |
| `auto.contextFactor` | V01 §3.3.5 | 0.7 | number · `share` | [0, 1] | yes | `weight` | — | `own` |
| `elig.ringELo`, `elig.plazaFaceMult`, `elig.spineEHi`, `elig.runEHi` | V01 §3.3.2 | 2.5, 6, 3, 3 | number · `none` (multiples of `eLo`, of the plaza's area, of `eHi`) | [1, 5], [2, 12], [1.5, 6], [1.5, 6] | yes | — | — | `own` |
| `elig.crossAngleDeg`, `fan.sepDeg`, `hood.edgeDeg` | V01 §3.3.2, V01 §3.4.2 (a), V01 §3.4.6, V01 §3.10.1 | 45°, 45°, 60° | number · `cdeg` | [30°, 90°] each | yes | — | — | `own` |
| `anchor.spanShare`, `tpl.widthLow`, `tpl.crossDelta` | V01 §3.4.2 (a)–(b), V01 §3.4.3 | 0.7, 0.8, 0.05 | number · `share` | [0.3, 1], [0.5, 1], [0, 0.15] | yes | — | — | `own`; `tpl.widthLow`'s per-map template width idea `ref:NG 1.2.2 template widths (code)` (II.2) |
| `tpl.courseDelta`; `tpl.segMin`, `tpl.segSpan` | V01 §3.4.3 (δ ± 0.15, 3–7 segments, ½-segment jitter, passes 4 − ⌊n/2⌋) | 0.15; 3, 4 | number · `share`; integer · `none` | [0, 0.3]; [2, 6], [0, 6] | no (`ref:NG` code values) | — | — | `ref:NG 1.2.2 main street course (code)`, in metres |
| `tpl.arrivalDeg` | V01 §3.4.3, V01 §3.4.4 | 85°–95° | range · `cdeg` | [60°, 120°] | yes | — | — | `own` |
| `ring.insetELo`; `ring.portalGapM` | V01 §3.4.4 (the fit inset's multiple of `eLo`; the portal gap's floor) | 1 (× `eLo`); 6 m | number · `none`; number · `m` | [1, 2]; [4, 12] | yes | — | — | `own` (§4.6 step 7's law on rings) |
| `land.spineFactor`; `land.ringSlack`, `land.smallShare` | V01 §3.3.7, V01 §3.5.9 | 1.15; 0.10, 0.12 | number · `none`; number · `share` | [1, 1.5]; [0, 0.3], [0, 0.4] | yes | — | — | `own`, calibrate at M5 (T-V1-12); the small share measured at M5 |
| `plaza.aspectMin`, `sq.smallDiv` | V01 §3.4.5 (the rectangle's least drawn aspect), V01 §3.5.3 (`smallBlockM2`'s divisor of `eLo²`) | 1.2, 2 | number · `none` | [1, 2], [1, 4] | no (`ref:NG` code values) | — | — | `ref:NG 1.2.2 square plaza (code)`; `ref:NG 1.2.2 small-block rule (code)`, restated on our extents |
| `plaza.voidRadius`; `park.minM2`; `park.maxShareOfFace` | V01 §3.4.5 | 1.2; 3 000 m²; 0.4 | number · `none`; `m2`; `share` | [0.8, 2]; [1 000, 10 000]; [0.1, 0.8] | yes | — | — | `own`; the park floor §4.9's 0.3 ha |
| `sq.forecourtM`, `sq.bridgeM`; `sq.maxM2`; `sq.overTake`, `dispatch.overQuota` | V01 §3.5.3, V01 §3.5.6 | 60 m, 40 m; 5 000 m²; 1.5, 1.5 | number · `m`; `m2`; `none` | [20, 120], [10, 80]; [1 000, 10 000]; [1, 3] each | yes | — | — | `own` |
| `green.maxMedian`, `green.spacingEHi`, `green.leafyCourt` | V01 §3.5.4, V01 §3.5.7, V01 §3.10.1 | 1.5, 2, 1.5 | number · `none` | [0.5, 3], [1, 5], [1, 3] | yes | — | — | `own` |
| `manor.fitLow`, `manor.fitHigh`, `manor.spacingEHi` | V01 §3.5.5 | 1.0, 3.0, 2 | number · `none` | [0.5, 2], [1.5, 5], [1, 5] | yes | — | — | `own`; the spacing idea `ref:NG 1.2.2 manor spacing (code)` |
| `manor.sunWeight` | V01 §3.5.5 | 0.5 | number · `weight` | [0, 1] | yes | `weight` | — | `own`; item 102 (d) |
| `guard.softShare`; `guard.bands` | V01 §3.5.8 | 0.3; 1 | number · `share`; integer · `none` | [0, 1]; [0, 3] | yes; no | — | — | `own` |
| `feature.runM`, `name.landmarkM` | V01 §3.6, V01 §3.7.2 | 60 m, 50 m | number · `m` | [20, 150], [10, 150] | yes | — | — | `own` |
| `name.tradeShare`, `name.curvedShare`; `name.bentDeg` | V01 §3.7.2 | 0.3, 0.3; 15° | number · `share`; `cdeg` | [0, 1] each; [5°, 45°] | yes | — | — | `own` |
| `terrace.askGain` | V01 §3.3.3 | 1 | number · `weight` | [0, 3] | yes | `weight` | — | `own`, calibrate at M5 (T-V1-50) |
| `terrace.siteShare`, `terrace.minGapShare` | V01 §2.3, V01 §3.4.3 | 0.3, 0.6 | number · `share` | [0, 1], [0.3, 0.9] | yes | — (thresholds: `asks` is inert wherever `terrace.askGain` is 0 and volume 11's `terrace.enabled` off; J-V1.99) | — | `own`, calibrate at M5 (T-V1-50) |
| `terrace.maxLevels`; `terrace.profileNoticeCm` | V01 §3.4.3 (per flank); V01 §3.9, V01 §3.11 (7) | 15; 50 cm | integer · `none`; number · `cm` | [4, 31]; [10, 200] | no (a work limit); yes | — | — | `own` |
| `raised.clearWidthM`; `raised.squareDeg` | V01 §3.17.3 (arch clear width + 1 m; ± 30° of square) | 1 m; 30° | number · `m`; `cdeg` | [0, 3]; [10°, 45°] | yes | — | — | `own` |
| `landmark.maxRings` | V01 §3.4.4 | 2 | integer · `none` | [1, 4] | no | `option` — the precinct multi-ring; its off value 1 is its `presets.MFCG` and `presets.FTG` entry (`own`; `fixed: the parity off value`) | — | `own` |
| `landmark.roundTol` | V01 §3.4.4 | 0.9 | number · `share` | [0.7, 1] | yes | — | — | `own` |
| `hood.hillsidePct`; `hood.hillsideMaxPct` | V01 §3.10.1, V01 §4.1 | 20; 60 | number · `none` (percent) | [0, 60]; [20, 100] | yes; no | `weight` (the hillside default: a hood is flat under the parity presets and `NG`); — | — | `own` |
| `court.nameMinM2`, `pin.siteMinM2` | V01 §3.7.1, V01 §3.8.2 | 200 m², 30 m² | number · `m2` | [50, 1 000], [5, 200] | yes | — | — | `own` |
| `pin.cap`, `pin.courtFactor`; `pin.edgeInsetM` | V01 §3.8.2 | 0.6, 0.2; 3 m | number · `share`; `m` | [0, 1] each; [0, 10] | yes | — | — | `own` (the court factor from NG C6's density) |
| `pin.decayScope` | V01 §3.8.2 | `'block'` | enum · `none` (`block`, `district`) | — | no | — (a categorical cell: `presets.MFCG` and `presets.FTG` `'block'`, `own`, `fixed: the parity value`, as §7.6 requires of one) | `'district'` (`ref:NG 1.2.2 pin decay (code)`, P20) | `own` |
| `access.<accessSymbolKind>M` — twelve columns, one per `AccessSymbolKind` value (V01 §3.8.8); the column set is held by T-V1-4's registry test (set equality with the enum), not by a `TotalityRule` — a `coversEnum` checks one column's values across a table's rows, and this is one settings row (V11 §2.1); V01 §3.8.8's kind list and these columns change together in one change | V01 §3.8.8, V01 §5.1.2 | `stair` 2.5, `ladder` 1.2, `hatch` 1.2, `shaft` 1.5, `well` 1.6, `cellar_stair` 1.5, `grating` 1.0, `mouth` 3.0, `sinkhole` 4.0, `collapsed_shaft` 3.0, `ruin_entrance` 3.0, `catacomb` 2.5 (m) | number · `m` | [0.5, 8] each | no (drawing sizes) | — | — | `own` |
| `closeup.chunkKB` | V01 §3.8.3 | 32 | integer · `none` (KiB) | [8, 128] | no (an engineering budget) | — | — | `own` |
| `size.small`, `size.medium`, `size.large` | V01 §3.10.1, V01 §3.15, V01 §4.2 | 85, 700, 1 050 | integer · `none` (buildings) | [20, 3 000] each | no (NG's measured bands) | — | — | NG's size bands (`docs/confidence/ng.md` C8) |
| `hood.frameMargin`, `hood.starRadiusFloor`, `sky.plotShare` | V01 §3.10.1, V01 §3.10.2, V01 §3.16 | 0.3, 0.35, 0.62 | number · `share` | [0.1, 1], [0.2, 0.6], [0.3, 0.9] | yes | — | — | `own`; `sky.plotShare`'s default the base's dense-core plot share (0.62, §4.2 S2) |
| `camp.reachM` | V01 §3.16 (`campLand`: the outskirts' depth beyond the built edge and along the approach roads) | 600 m | number · `m` | [100, 3 000] | no (a drawing extent) | — | — | `own` (about ten minutes' walk beyond the edge) |
=== END ===

=== REPLACE ### 3.16 Services other volumes call (`@plat/hood`) ===
### 3.16 Services other volumes call (`@plat/hood`)

Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V01 §6; Find's two and
the crisis services by their own lines; `disasterSource`'s keyed render hashes are view draws, V01 §3.12):
* **`catchmentOf(plot, unit, per?)`** — the plots in a plot's coverage unit for item 103 (f) (V11's `CoverageSpec.unit`
  and `per`): each unit is read at the plot exactly as V11 §2.3's `CoverageSpec` defines it — `walk` and `households`
  its discs on the 16 m raster, `parish` the plot's cell of its parish partition, `district` the plot's district,
  `settlement` the town — cited, never restated, so the solver, Show gaps and V12 §3.6's `servedShare` count served one
  way; the plot is always in its own catchment. This volume adds only its own readings: **`neighbourhood` is read as
  `district`**, the district a close-up opens (J-V1.35); **on an underground arena** `walk` and `households` measure
  the disc's radius by volume 4's `underDistance` (V04 §3.6a (1)) in place of the straight distance, and each undercity
  neighbourhood and the underground pseudo-district (the sewer-front neighbourhoods and F6's void dwellings) is its own
  `district` unit (V04 §3.6a (5)); **on a sky arena** the island is one `walk` unit (V05 §3.5 (3): the route to the
  ground passes every walking radius), its districts its `district` units; **a district with no residential plot
  holds no unit** — V11 §2.3's skipped term (no household there to serve), so no gap is drawn in it (V01 §5.4 (3)).
  Callers: S10a / S10b's coverage term (V11's `cov/<class>` rows, the base solver), volume 10's explanations,
  `gapUnits` (Find's Show gaps, V01 §5.4, into which item 120 (i) folds volume 9's Coverage view).
* **`districtsAbove(part, element)`** — the area overlap of an underground element's projected footprint with each
  surface district, shares descending, ties by district address; an element whose footprint lies under no district (the
  hinterland, water) returns the empty list. **An undercity neighbourhood's `parent`** is II.7.5 (2)'s — the surface
  district above the largest share of its main chamber in plan, ties by address — computed as the first entry of
  `districtsAbove(part, District.core)` (II.7.5 (2)'s one rule; this volume states no rule of its own); volume 4's U-CITY
  C5 writes it through this call. `DistrictContext.under` is this service's inverse for D. Callers: volume 4 (C5's
  parent), V11's `naming.ruin` rows ("the ruins under the old quarter"), volume 10, volume 9's voids view.
* **`fabricSignature(region)`** (J-V1.78) — the town side of volume 12's paired measures over a region
  (`FabricSignature`, V01 §2.3), each computed by V12 §3.4's definition, `null` where V12 reads `notApplicable` (a region
  with no built block or no part-0 way). V04 §3.5.0a (7) calls it with a ruin's outline and tests the ruin's plan
  against it by V12 §3.6b's `paired` margins, and V11's culture rows read it likewise (J-V11.30); the test and its
  margins are theirs, cited, never restated — template fabrics are measured like any (a ring over a radial citadel, a
  main street over a grid).
* **`skyDistrictCount(plotLandM2, districtHa)`** — `clamp(⌈plotLandM2 ÷ (sky.plotShare × districtHa × 10 000)⌉, 1, 3)`,
  `plotLandM2` in m², `districtHa` in hectares, `sky.plotShare` the `hood.constants` cell (V01 §3.14): the one count of a
  sky island's districts; `plotLandM2` 0 gives 1. Callers: the unit runner (V01 §3.10.3 (2)), volume 5's unit inputs (V05
  §2.3) and its coverage units (V05 §3.5 (3)'s k), each through this call, never a copy of the formula; volume 5's fill
  and coverage overshoot read the same `sky.plotShare` cell (V05 §3.5 (2)–(3)), not the count.

* **`findAreas(key)`** and **`gapUnits(chip, key)`** — Find's area targets and Show gaps' units (item
  120), memoised per commit and per key, stated with their rules at V01 §5.4. Callers: volume 9's Find panel and
  `live.find` overlay, volume 10's `FindAnswer`, §11.1's picture exports.
* **`disasterSource(doc, overlay, key)`** and **`disasterDistricts(doc, overlay, key)`** (item 122 (b); J-V1.104) —
  the units a disaster look ruins: whole neighbourhoods, never a share of the buildings inside one. `disasterDistricts`
  is `disasterSource(…).units`, which §10.2's `neighbourhoods` place reads; every building of each unit draws the
  ruined look (V02 §5.7). `overlay` is a standing `ConditionOverlay` admitted at the key, or `null` for a preview of
  the `disaster` look (§2.9's `crises`): `units` is read for an overlay whose look §7.7's DR44 reads as `disaster`, and
  `matched` for any — §10.2's `affectedQuarter` place takes the first `matched` unit of a `quarantine` overlay as the
  quarter its cordon closes. Memoised per commit, overlay and key:
  1. **The units.** At TOWN and above — a standalone neighbourhood document at its `contextRung` — every district of the
     ground arena's part 0 that the key admits, the hinterland pseudo-district excepted, each read as a `DisasterUnit`
     (V01 §2.3). At THORP, HAMLET and VILLAGE, where the village product holds one district (PART III (4)), the units
     are V07's — its ends (`VillageEnd`, V07 §3.10), or in an end-less thorp its contiguous toft groups — in the same
     shape, and the same rule picks among them.
  2. **The calamity.** The overlay's calamity is the `CalamityRef` (§4.11; carried by the port, V08 §3.6) of the
     `calamity` entries of the committed `epoch` events whose week — the entry's `week`, else its epoch's — lies in the
     overlay's weeks ([`sinceWeek`, `untilWeek`), or from `sinceWeek` on with no `untilWeek`): the latest, ties by
     the higher severity band, then by `CalamityRef.id`. None falling there, or a preview, gives no calamity. Its
     **pattern** is its type's hazard in V06 §2.4's calamity table: `fire` → **fire**, `flood` → **flood**; a
     `collapse`, a `drought`, a `null` hazard, a type no row matches and no calamity → **scatter**.
  3. **The targets.** Each id of the calamity's `targets` names a unit: a use, or any entity on a plot, by its plot's
     district, closed or not; a district, itself; a city-cut `QuarterNode`, each of its member districts; a
     `HoodPlace`, its host's district (at the village rungs, V07's unit holding it). A target the key withholds
     (§9.2's admission) is skipped and never reported to that key; one that names no unit — its plot re-derived away,
     in the hinterland, on another arena — is `unmatched`, reported in the view telemetry, and the pattern fills the
     share.
  4. **The strike order.** Every draw is a view draw: `u(unit) = RH32('crisis.place', the unit's render key, salt,
     H32(the condition's id)) ÷ 2³²` (§8.1; a preview keys on `H32('disaster')`, its look kind, in the condition's
     stead). The order opens with the matched units by ascending `u`, then grows by the pattern —
     * **fire**: from the first matched unit, else from a seed picked by inhabitants (the unit of least
       −ln u ÷ (inhabitants + 1)), each next unit the neighbour of a taken one lying farthest downwind of the seed
       (`Terrain.wind`, §2.3; centroid to centroid) — under no wind (`strength` 0) the neighbour nearest the seed; the
       order ends when no neighbour is left, so a fire never jumps a gap in the adjacency;
     * **flood**: each next unit the lowest by `meanHeightCm` among the water-fronting units and the neighbours of the
       taken ones — with no water-fronting unit, the lowest of all first;
     * **scatter**: the remaining units by ascending `u` —
     ties by `u`, then by address.
  5. **The share.** With n units and s the `disaster` row's `scale` at the map's rung at the severity — the overlay's,
     clamped to [0, 1], or `previewSeverity` for a preview — linear between its two ends (§10.2's *Crisis looks* (c)),
     k is 0 where s ≤ 0, else round(s × n) clamped to [1, n]; `units` is the first max(k, |`matched`|) units of the
     order — all of a shorter fire order, the shortfall reported in the view telemetry. So the set grows with the
     severity, holds every matched target, and is the same in every week the overlay stands, every view and every
     export.
  Several disasters at once are computed apart, each keyed by its own condition; a unit in two sets draws the higher
  level (V02 §5.7 (1)). The look's end in the week the `reconstruction` Works begins is V06's hand-over, which this
  service does not read; an edit or epoch that splits or merges a struck district changes the units at that commit,
  each successor drawn by its own key.
* **`campLand(doc)`** (item 122 (a)–(c); J-V1.105) — the outskirts' land a camp look may take: `FaceRef`s in address
  order, on the ground arena's part 0 at every rung, memoised per commit. (1) The hinterland's `LandUse` faces of kind
  `commons`, and the `arable` and `strip_field` faces in their rotation's fallow course (§4.9), whose nearest point lies
  within `camp.reachM` (V01 §3.14) of the **built edge** — the outer boundary of the ground districts' union, the
  hinterland pseudo-district left out, or the outermost enceinte's outer strip where that lies beyond it; (2) the
  **verges of the approach roads** — the `meadow`, `pasture`, `arable` and `strip_field` faces bordering an arterial
  that leaves the settlement, within `camp.reachM` of where it leaves (its gate, else the built edge). Never a face of
  another kind (no water, marsh, wood, quarry, garden or orchard is camp land), one meeting a gate's passage (its
  opening and 4 m along its way each side, §10.2 (d)), or one an under-deck strip crosses (V01 §3.17.3); a label's
  keep-out is the band's, cut by §10.2 (d)'s placement. §10.2's camp places rank these faces — the refugee camp's by
  V06's `frontierFor`. A standalone neighbourhood document holds no hinterland land use (V01 §3.10.1), so its
  `campLand` is empty.

One **writer** other volumes call: **`plantRimWalk(doc, island)`** — the rim walk's one planting (V01 §3.10.3 step 4): it
writes the island's `esplanade` and `street_trees` pair into the calling commit's batch, a function of the committed rim
strip and §4.9's street-tree row, draw-free, ≤ 0.2 ms per call (V01 §6). Callers: the unit runner (V01 §3.10.3 step 4)
and volume 5's resize and rim reshape (V05 §4.2), each once per event; never a district's S12b.
=== END ===

=== REPLACE #### 3.17.3 Raised ways in the close-up (J-V1.65) ===
#### 3.17.3 Raised ways in the close-up (J-V1.65)

1. **Committed inputs.** A raised part — item 110 (b)'s viaduct, elevated road or aqueduct on a ground part ≥ 1 —
   generated or declared, is committed before S7b (1) (item 290) and is an input of every stage-2 step. This volume never
   creates, moves or removes one: the generator's reason, chance, cap and rung bars are the base's and volume 11's rows'
   (item 110 (f)); this volume owns the bars inside a close-up (T-V1-51). Its piers are those item 244's support step
   lays, which this volume's crossings and under-deck strip read (J-VI.27).
2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus
   `raisedWays.structure.stripMarginM` (V11 §3.24.2) each side, §4.6 S8's one strip — is a **hole** in the faces it
   crosses, as an S7b claim is (V01 §3.4.1): where it crosses a face from boundary to boundary it cuts it; no plot, block
   interior, seed or hood pin lies in it; the base's
   arch vaults (II.7.6; volume 4's `vault` spans) fill it where they exist, and an `open` span stays open ground, a way
   passing under it or bare ground (item 110 (b): "the spaces between piers stay open or hold the base's vaults").
   `DistrictContext.areaM2` and the pre-claim template face exclude it.
3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a strip only
   through an `open` span (the span's `use`, an eager base fact; item 244's span rule) whose clear width is ≥ the way's
   width + `raised.clearWidthM` and whose soffit meets item 244's clearance rule for the crossed way — the way's held
   `clearanceCm` first, else volume 11's `raisedWays.structure.clearanceCm` for the crossed class (cart or foot) —
   within ± `raised.squareDeg` of square to the deck; never along the strip, never through a pier. A seed that would
   cross elsewhere takes F-TEMPLATE rung 1 (redraw), then rung 2 (its crossing shifted along the strip to the nearest
   qualifying span); a bent-cut lane takes §4.6's ladder and, finding no span, ends at the strip's edge as at a
   reservation.
4. **Ends.** Each ramp or stair end is a ground vertex on part 0 (item 110 (b)); V01 §3.6 (4)'s portal gap applies to it
   as to a bridge end and extends over the ramp's or stair's rise, so no lane joins it mid-rise; it is an ordinary
   junction of its carried class (V01 §2.3's parts table).
5. **Pins.** V01 §3.8.2 step 5's clearance holds every pier footprint and the whole strip: no hood pin stands under a
   deck.
6. **Wall openings are not gates.** An aqueduct's arch through a curtain wall and a viaduct's or elevated road's raised
   gate at deck level are wall openings: no gate portal, no `gate` rank or kind factor, no gate plaza, no wall-side
   feature and no S9b square reads them.
7. **Boundaries.** A raised part never bounds a district (V01 §3.11 (8)).

A raised part whose strip lies wholly on hinterland land-use faces crosses no district: stage 2 reads nothing of it (the
span stays open by J-C4's rule). A strip that covers a district's whole template face leaves D with no template face
(V01 §3.3.2).
=== END ===

=== REPLACE ### 3.18 Edges — every mechanism at its limits (principle (11)) ===
### 3.18 Edges — every mechanism at its limits (principle (11))

Every mechanism of V01 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home section.

**(a) Degenerate geometry.** Every step of this volume that commits geometry — S8's seeds and plazas, the unit run's
outline and partition, an island's spans — commits through kernel transactions: a degenerate result (zero-length,
zero-area, self-touching, collinear, coincident) is refused by the kernel (§3.1's `E_DEGENERATE` family; §5.1's general
rule) and taken by the step's failure class on its ladder (F-TEMPLATE, F-UNIT; V01 §3.13). Steps that write attributes
only (S7c, S9b, the local-place step, the surface rule) meet degenerate geometry only as input: a zero-area face or block
is no template face (V01 §3.3.2), no candidate (V01 §3.5.1), no pin site (V01 §3.8.2) and no place host (V01 §3.7.1).
The view's derivations (hood pins, symbols, programs, labels, the frame, exports) skip a degenerate mark — a zero-area
facet, site, hull or label box draws nothing — and never fail a tile. Tests: T-V1-9, T-V1-56.

**(b) Rungs.** Stage 2 is the base product's:

| rung | stage 2 |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | no S7c, no S9b, no refine or outline close-up, no hood pins or places: the village product registers neither hook and has no stage-2 close-up (V07 J-V7.24); the `hatched` family draws the village's own records at its four bands by V01 §5.1.1's rows with no stage-2 marks; a village that grows into the town ladder takes its fabrics and block contents from the first S7b and S10a the base product runs on it; item 122's two services act — `campLand` as at every rung, `disasterSource` over V07's units (V01 §3.16) |
| TOWN | stage 2 whole, except: no raised way generated (item 290's rung gate; a way an epoch carried down from CITY is read as any committed raised part), no quarry-ossuary catacomb entrance (CITY and METROPOLIS only, V01 §3.7.1), no islands (volume 5's gate) and so no sky unit run |
| CITY | stage 2 whole: generated raised ways, quarry-ossuary entrances, islands |
| METROPOLIS, to its population cap | stage 2 whole; the Cemetery network's extramural grounds first among the outline close-up's named sites (V01 §3.8.9); the METROPOLIS budget lines (V01 §6); at the cap the district count is S6's, and no stage-2 quota binds beyond its own rows |
| a standalone neighbourhood document | its `contextRung` (TOWN, CITY or METROPOLIS) selects the rung-scaled rows it reads; its layers are V01 §3.10.1 (7)'s |

Test: T-V1-57.

**(c) Toggles and presets.**

| toggle or preset | stage 2 |
|---|---|
| `MFCG`, `FTG` | `fabric.extensionWeight` 0: every district `bent-cut`, every block `ordinary`, no place, no hood pin, `λ_b` 0; the M4 goldens byte-identical (T-V1-4); a declared fabric, content or place is held and laid (the switch gates what stage 2 derives, never what the author declared, V01 §3.15) |
| `NG` | V01 §3.15's rules (T-V1-4, T-V1-31, T-V1-32) |
| `VG` | the village product's; stage 2 is not registered at its rungs ((b)) |
| `FM` | stage 3's building-scope preset; stage 2 reads it as the default preset |
| the stage-2 switch set to 0 by an edit | V01 §3.15's switch edit |
| the islands off | no sky unit run, no strip or `shadeSky` read, `shade.islandShare` absent |
| the underground off | no opening pass, place, access symbol or `under[]` entry; no void part in a standalone neighbourhood document |
| item 110's switches off (V11 §3.24.0) | nothing of V01 §3.17 acts; byte-identical to the build without them (T-V1-4 (e)'s no-op pin, registered on V12 §3.7.8's engine as `item110.*`) |
| the `pins` and `trees` layers; the style's `details` and `shadows` | view only (V01 §5.1.2, V01 §5.1.3) |
| GeoJSON `closeup: true` | hood pins exported as presentation features (V01 §5.3) |
| Find on or off; Show gaps on or off (item 120) | view only: the document, its hash, the log and the tiles byte-identical; the area targets and gap units recomputed per commit (V01 §5.4) |
| Show crises on or off, or a preview (§2.9's `crises`; item 122) | view only: with Show crises off nothing calls `disasterSource`; a preview reads no calamity, the scatter pattern at `previewSeverity`; the document, its hash, the log and every model value byte-identical (V01 §3.16) |

Tests: T-V1-4, T-V1-56 (c), T-V1-59 (d).

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's six cells are V01 §2.7's and every event's
V01 §4.4's; every derived view (the list after V01 §2.7's table) is recomputed on load, undo, redo and regenerate and
never stored, so none goes stale in a save; the close-up chunk is non-canonical and dropped on mismatch (V01 §3.8.3).
Tests: T-V1-19, T-V1-34, T-V1-55.

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory data
(E5), and the degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| identifiers and tables (V01 §2.1, V01 §2.2) | a `fabric` row id no table holds (a later version's, or a row an `editTable` removed); a `fallback` naming an absent row; a band with no row | the district reads `bent-cut`, reported (§7.5's table-row migration); V11's compiler refuses such a table (its reference check), so none loads; the band interpolates (item 27) | substitute; check | T-V1-55, T-V1-56 |
| `DistrictContext` (V01 §2.3) | no portal, water, wall, chain, record or landmark; no island shade basis; `under` before the tail | each list empty or each value 0; `islandShare` absent; `under` is read only after the tail | check | T-V1-35, T-V1-56 |
| request, result, report (V01 §2.4) | a regenerate or undo after a run | the report is recomputed with every run and written to the generation report, never stored | — | T-V1-55 |
| stage graph (V01 §3.1) | a town of one district; a town with no district S7c lays | S7c and S9b run once; nothing written | — | T-V1-56 |
| χ̃ (V01 §3.2) | an allocation with no instance; more rows than §6's 100; a town with no arterial frontage; a row whose class the roster no longer holds | zero plot mix, no anchors, identity `plain`; computed over every row, §6's fallback taken; trade 0 in every district (a largest sum of 0 gives 0, never a division); resolved by §7.5's table-row migration before S7b allocates it | check | T-V1-2, T-V1-56 |
| S7c (V01 §3.3.1–V01 §3.3.3) | no district to lay; one eligible row; every non-`bent-cut` weight 0; `slope.meanPct` 0; an absent kind factor | nothing written; that row or `bent-cut` by the draw; `bent-cut`; the `stepped` factor 0; κ = 1 | substitute | T-V1-4, T-V1-6, T-V1-56 |
| the kinds and their layouts (V01 §3.3.8) | a district kind the table does not list (a registration's new kind) | it offers every eligible row at κ = 1; `bent-cut` always among them | substitute | T-V1-6, T-V1-56 |
| the standalone `auto` (V01 §3.3.5) | a degenerate outline | F-UNIT repairs it before S7c; `bent-cut` is always eligible | repair locally | T-V1-20 |
| the epoch participant (V01 §3.3.6) | no new face, due block or scope; one new district; a zero-area new face; an absent `scope.recut` or `scope.raised` | nothing written; S7c once; volume 6's growth decision types no zero-area face, so S7c never sees one; read as empty | check | T-V1-39, T-V1-56 |
| template land and the reconcile (V01 §3.3.7) | a face too small for any seed; a capacity the subtraction takes below 0; households no district can hold | `templateLandM2` 0; capacity 0, the households moved; S7b's unplaced tail, reported by F-SITING (§5.2) and counted by T-V1-12 | leave out and report | T-V1-12 |
| the template face (V01 §3.4.1) | one qualifying face; every face a hole, strip or zero-area piece; a face in no district | it is the template face; no template face, F-TEMPLATE's chain ends at `bent-cut`; never a template face | substitute | T-V1-9 |
| portals and anchors (V01 §3.4.2) | no usable portal; one usable portal; an unreachable landing attach or deck end | the spine's anchors are the `axis` ends; a spine needing two anchors takes the `axis` ends; F-TEMPLATE's last rung lays a lane to it | simpler shape | T-V1-8, T-V1-21 |
| spine, series, ring, plaza, fan (V01 §3.4.3–V01 §3.4.6) | a chord below `2 × eHi`; flat ground under a series; `R ≤ eLo`; `landmark.maxRings` reached; a non-convex precinct outline; 0 inhabitants; no void junction; fewer portals than a fan's minimum | no spine, the row bends; level 0 alone; no ring, the row bends; the precinct series ends, reported; the buffer union (V01 §3.4.4 (3); §3.7 *Insets*); the plaza at `minM2`; no void square, reported; every portal there is, or none | substitute; leave out and report | T-V1-7, T-V1-8, T-V1-9, T-V1-38, T-V1-56 |
| the rows (V01 §3.4.7) | a table holding only `bent-cut`; a seeded row whose seeds all lay nothing | every district `bent-cut`; the bent cut on the whole face, reported as rung 4 | substitute | T-V1-56 |
| unit runs (V01 §3.4.8, V01 §3.10) | a unit of one district; a degenerate outline | the partition makes one district; F-UNIT (V01 §3.13) | repair locally; substitute | T-V1-20, T-V1-21 |
| S9b and its quotas (V01 §3.5.1–V01 §3.5.2) | no candidate block; 0 inhabitants; one candidate; quotas above what the candidates hold; a band or kind factor missing | none typed; every quota 0, phase 2 only; it alone is weighed; the unmet remainder rolls and is reported (F-DISPATCH); interpolated (item 27), a missing kind factor 1 | leave out and report | T-V1-11, T-V1-56 |
| squares, greens, manors, phase 2 (V01 §3.5.3–V01 §3.5.6) | no candidate for a type; one; an empty fit band or no compound class; every remaining manor weight 0; no small block | its quota rolls to the next type, the last remainder reported; it is taken if it fits; M 0; the draw stops, the unmet manors reported; phase 2 types none | leave out and report | T-V1-10, T-V1-11 |
| the seam guard (V01 §3.5.8) | no soft seam; no district across | the guard does not apply | — | T-V1-13 |
| downstream (V01 §3.5.10) | a district with no typed block; a typed block whose residue face is zero-area | every block takes the base path; the block stays `ordinary`, reported | leave out and report | T-V1-56 |
| fixed inputs (V01 §3.5.12) | none; one; a dossier change removing the record behind one | nothing held; it is held; released at the next re-derivation of its block, a user's lock or pin on it reported orphaned | — | T-V1-18, T-V1-47 |
| context features (V01 §3.6) | no context run; a run shorter than `feature.runM`; a closure-only arc | none, nothing reported; the feature not applied there; typed by II.1's seam typing | — | T-V1-22 |
| places (V01 §3.7.1) | no square, green, yard or large court; the underground off; a court below `court.nameMinM2`; a host removed; a dossier-owned name | no place; no opening pass; no place; tombstoned, its name archived; the dossier's name kept | — | T-V1-24, T-V1-46 |
| the naming context (V01 §3.7.2) | a way with no feature | a proper name | — | T-V1-24 |
| surfaces (V01 §3.7.3) | a way with no fronting block; an era with no row | the row at the pass-2 value at its midpoint; the rows without `era` | — | T-V1-25 |
| the trigger and frame (V01 §3.8.1, V01 §3.8.7) | a click on no district (water, off the map); a district with no footprint | nothing opened; the frame is its boundary | — | T-V1-15, T-V1-23 |
| hood pins and the cache (V01 §3.8.2, V01 §3.8.3) | no site; `pin.cap` reached; one pin; a digest mismatch | no pin and an empty chunk; each site's probability capped; one; the chunk dropped and re-derived | — | T-V1-15, T-V1-26, T-V1-31 |
| staleness, overrides, persistence (V01 §3.8.4–V01 §3.8.6) | a document with no `closeups` block; an undo, redo or load | default params; the chunk stale by its digest | — | T-V1-19, T-V1-55 |
| access symbols (V01 §3.8.8) | an access with no stored state | the derived reading, else `open` | — | T-V1-46 |
| the outline close-up (V01 §3.8.9) | an outline over nothing; over one district; a degenerate outline | nothing, one line; that district's close-up; nothing, one line | — | T-V1-15, T-V1-56 |
| the replace close-up (V01 §3.9) | the district's own card; a card not eligible on the committed face | the refine close-up, no edit; its fallback chain, named | substitute | T-V1-18 |
| the standalone neighbourhood document (V01 §3.10.1–V01 §3.10.2) | an edge whose bearing no run faces; a hillside outside the range; a drawn outline F-OUTLINE cannot repair | the nearest run, named; clamped, named; the kind row's `auto` outline, named | repair locally; substitute | T-V1-20 |
| the sky unit run (V01 §3.10.3) | an island without a district's worth of land; a rim strip of zero length | no district, the allocation to F-SKY-UNIT, reported; no rim-walk pair | leave out and report | T-V1-21 |
| seams (V01 §3.11) | a district with no way | every portal `unconnected`, reported | check | T-V1-14 |
| constants (V01 §3.14) | a numeric `editTable` outside a column's range; its undo; a load of a document made under an older table version | clamped by V11 §4.1's rule (V11 §2.1's `ColumnSpec.range`); the undo restores the cell (§7.4, §7.6); the stage runs' `tablePins` resolve the cells the document was made with, a newer version by §7.5's migration | check | T-V1-34, T-V1-55 |
| services (V01 §3.16) | an element under no district; a region with no built block or part-0 way; `plotLandM2` 0; a plot whose unit holds no other plot; a district with no residential plot | the empty list; `null` measures; 1; the plot alone; no unit (V11 §2.3's skipped term) | — | T-V1-42, T-V1-46 |
| the disaster's units (V01 §3.16; item 122) | no unit (a document before S6, or every district withheld); one unit (a town of one district, a standalone neighbourhood document's preview, an end-less thorp of one toft group); the hinterland pseudo-district; severity 0 and 1; a share above 0 that rounds to none; more matched targets than k; a target naming no unit (its plot re-derived away, the hinterland, another arena); a target the key withholds; no calamity in the overlay's weeks; a calamity type no row of V06 §2.4 matches; a fire whose seed's adjacency component is smaller than k; calm (`Terrain.wind.strength` 0); a flood with no water-fronting unit; several disasters at once; an edit or epoch splitting or merging a struck district; the look standing when V06's real aftermath strikes its units | the empty list, nothing drawn; that unit; never a unit (V01 §3.16 (1)); the row's two ends; one unit; every matched unit (the dossier wins); `unmatched`, reported in the view telemetry, the pattern filling the share; skipped, never reported to that key; no target, scatter; scatter; the whole component, the shortfall reported in the view telemetry; the nearest neighbour first; the lowest unit first, then its neighbours; each set apart, a unit in two at the higher level (V02 §5.7 (1)); re-read at that commit, each successor drawn by its own key; the set unchanged — the aftermath is the epoch path's and the look yields per building by V06's hand-over | check; leave out and report | T-V1-60 |
| the outskirts' land (V01 §3.16; item 122) | no commons or fallow within reach; no approach road (an unserved mesa, S3 (9) (a)); an island town with no land beyond its shore; a standalone neighbourhood document; a face meeting a gate's passage or crossed by an under-deck strip; a face an epoch builds over or an edit re-uses while a camp stands | the verges alone; the commons and fallow alone; the empty list, so §10.2 (h)'s ring marks; the empty list (no hinterland land use); left out; re-read at that commit, the camp re-placed by §10.2 (d) (a look only) | leave out and report | T-V1-60 |
| Find's areas and gaps (V01 §5.4) | no district (a document before S6) or a layer with none; a town of one district; a city-cut quarter of one district; a quarter the key admits in part, or not at all; a class with no coverage row; a several-class chip whose classes' units differ; no admitted member; a member the key withholds; every member in the hinterland; a per-plot unit over a district with no residential plot; a chip's area no longer held (merged away, or rebuilt under another id); the METROPOLIS cap | no area target and no gap unit; one district target, no quarter; that district's target only; the admitted members' union, or not listed; the `district` unit; the `district` unit over every member of its classes; every unit a gap; a gap where it alone stands, at that key (never a hint, item 120 (h)); every `district` unit a gap, a per-plot plot served only where `catchmentOf` reaches a hinterland member; no unit there; the chip kept at count 0, dark, until removed or Clear; V01 §6's Find lines | check | T-V1-59 |
| terraces and walls (V01 §3.17.1–V01 §3.17.2) | no wall; a declared wall degenerate after its snap; a wall with no step | nothing held; bent by §7.1's dry run before it commits (item 245), never reaching stage 2; step 0, no shadow, no VTT line (§11.1's threshold), the why "no step" | repair locally | T-V1-50, T-V1-56 |
| raised ways (V01 §3.17.3–V01 §3.17.5) | no raised part; a strip over a whole template face; a part wholly on hinterland faces | nothing read; D has no template face; nothing read (its spans open by J-C4) | — | T-V1-51, T-V1-52 |
| deck plots (V01 §3.17.6) | a deck whose owner rule meets no district (`Bridge.deck[0]` in the hinterland); a gate's moat deck | the hinterland pseudo-district's allocation; no deck plot (§4.7) | — | T-V1-53 |
| editing (V01 §4.1–§4.4) | an edit on a target a dossier change removed; an edit under a parity preset | orphaned, reported (§7.4); a declared value held and laid ((c)) | — | T-V1-34, T-V1-40 |
| locality (V01 §4.3) | a fabric change or New random in a town of one district; the same under a parity preset | the effective scope is D and its seam exception, which has no neighbour: the hinterland and every way beyond D's seams byte-identical (the oracle); under `MFCG`, `FTG` or `NG` the declared fabric is held and laid (V01 §3.15) with the same scope | check | T-V1-17, T-V1-56 |
| why providers (V01 §4.5) | a subject no provider covers | volume 10's provider for its kind | — | T-V1-37 |
| rendering and labels (V01 §5.1, V01 §5.2) | an empty tile; a single wing; a sheet lacking a stage-2 program; a district with no name yet; a label fitting no candidate | the base marks only; its facets hatched; the base program (V01 §5.1.6); the identity label alone; dropped by §9.4's floors | — | T-V1-26, T-V1-28 |
| exports (V01 §5.3) | a scope with no stage-2 content; a close-up never opened | the base's content only; derived for the export, never stored | — | T-V1-33 |

**(f) Where this volume's features meet another unit's at their limits** (at TOWN, CITY and METROPOLIS unless a row says
otherwise; the rung is §5's for a cell that handles a failure, `—` for a cell that is a rule with no failure):

| combination | outcome | rung | test |
|---|---|---|---|
| a cliff and a district (a hard `cliff` run, item 106) | the run is portal-free; the district's plots back onto its setback line (the rear-plot rule), no wall street, no template face across it (V01 §3.6 (7)) | — | T-V1-45 |
| a cliff and a terraced ward | no ward-edge wall on the cliff run (item 302: none on a hard run); the levelled plots back onto its setback line | — | T-V1-50 (a) |
| steep ground and a terraced ward | levels closer than `terrace.minGapShare × s` clipped, the series stopped at `terrace.maxLevels` (reported), level 0 unlaid → F-TEMPLATE to `bent-cut`; the walls the base's | simpler shape (the levels clipped); leave out and report (the level cap); substitute (`bent-cut`) | T-V1-50 |
| a coast and a district | the shore run is `water`: the bank path, the rear-plot water rule or a quay (V01 §3.6 (1)); the water face never a template face | — | T-V1-22 |
| a coast and a terraced ward | no ward-edge wall on the shore run (hard); the contour streets end at the shore setback; the waterfront feature as above | — | T-V1-22, T-V1-50 |
| a moat and a district | the moat is the enceinte's reservation, outside every district: the district reads its `wall` run (wall-side, V01 §3.6 (2)), never a `water` run; a gate's moat bridge ends outside the wall strip, so the district reads the gate portal, and a bridge portal only where a landward end lies on its template face | — | T-V1-22 |
| a moat and a terraced ward | no ward-edge wall on the `wall` run (hard) | — | T-V1-50 (a) |
| a bridge over a moat and deck plots | none on a gate's moat deck (§4.7: the gate's approach stays clear); a fixed moat bridge away from a gate offers them by item 246's rule, owned as V01 §3.17.6 (1) states | — | T-V1-53 |
| a bridge and a terraced ward | the bridge's end is a part-0 junction ranked as a bridge portal; a lane crossing the ward-edge wall there takes a stair or ramp interval, never a gap; its deck plots belong to the intramural end (V01 §3.17.6) | — | T-V1-50 (e), T-V1-53 |
| a raised way and a district's close-up | V01 §3.17.3: the strip a hole, crossings only through qualifying `open` spans, no pin under a deck, no junction with a part-0 way | — | T-V1-51 |
| an oasis and a district (item 111) | its spring pool is water for every rule that reads water (item 111): a `lake` body for the waterfront feature and the rows' `waterShare`; its grove and irrigated gardens are land-use and greenery faces, never built land — no template face, no S9b candidate; item 111's well weighting is S10b's model pins, which the close-up counts as prior picks (V01 §3.8.2 step 2) | — | T-V1-58 |
| an oasis and a terraced ward | no ward-edge wall on the pool's shore run (hard); the contour streets end at its setback | — | T-V1-58 |
| the map frame and a district (a `frame` run) | hard and portal-free; the margin band lies along it, so no plot fronts the frame (in a standalone neighbourhood document the outline itself, V01 §3.10.1 step 6) | — | T-V1-20 |
| the map frame and a terraced ward | no ward-edge wall on a `frame` run (item 302); the levelling stops at the margin band | — | T-V1-58 |
| a terraced ward and a lock | a locked or pinned plot is a fixed input: its face a hole the series avoids (V01 §3.4.1, V01 §3.4.3), its plot and site kept by every re-derivation (§7.2); the walls round it are the base's levelling's | — | T-V1-18 |
| a terraced ward and save and load | `District.terrace` and the walls persist in their leaves; `terraceState` and `stepProfile` are recomputed on load; a load re-derives nothing (byte-identical) | — | T-V1-55 |
| a disaster look and an opened close-up (item 122) | the close-up's chunk unchanged — the look is no input of it (V01 §3.8.3); its buildings draw V02 §5.7's ruined look over the `hatched` hatch (V01 §5.1.4), its hood pins as derived | — | T-V1-60 |
| a disaster look and the dossier removing its calamity's target | the target `unmatched` at that commit, reported, the pattern filling the share | leave out and report | T-V1-60 |
| a camp and a raised way (items 122, 110) | no camp face under an under-deck strip or among its piers: `campLand` leaves the face out | — | T-V1-60 |
=== END ===

=== REPLACE ### 4.5 The clerk's view and the "why" providers (item 101; volume 10 builds the clerk) ===
### 4.5 The clerk's view and the "why" providers (item 101; volume 10 builds the clerk)

The clerk and the application's "why?" panel read stage 2 through `query` and the oracle under the viewer's key (§9.2,
§11.2). `@plat/hood` registers these **why providers** (V10 §2.13; §2.8's explainer registry, item 270), one provider per
kind or path; each recomputes its answer as a pure function of committed state — never from a stored report, so the
answer is the same before and after a save, a load or an unrelated edit (T-V1-37). The pulls they return name V11's
families (`WhyPull.family`, §11.2).
* **`district.fabric`** (and the section `fabric`) — "declared by the user" for an edited path; otherwise χ̃ over the
  committed allocation, the eligible rows with their weights (the shade and chain terms among them) and the keyed
  uniform. A committed fabric on the recomputed pick's fallback chain is reported as that pick bent to it (F-TEMPLATE's
  substitution writes the row built to `D.fabric`, V01 §3.13); a recomputed pick that differs otherwise sets §11.2's
  `WhyAnswer.evaluated.drifted` with its cause (the reconcile moved households after the draw, or the allocation changed since):
  the fabric stands, as survivors do.
* **`block.content`, `block.squareType`** — D's quotas, the candidate's siting rule, its score terms (prestige, spacing,
  and the sun factor and the siting pushes as `WhyPull`s of V11's families `sun` and `nuisance`), the keyed pick, or
  "declared"; a fixed input names why it stayed ordinary (a SIZE compound, a catacomb's churchyard).
* **`HoodPlace` names** — the grammar feature that fired (a trade, a landmark, a destination, the centrepiece, an
  opening's kind), recomputed from the place's naming record.
* **hood pins** — the site, the gate's terms (band, identity, shade as a `sun` pull, `pinGate`, the court factor), the
  prior picks and the decay; an override's state (`byOrdinal`, `rematched`, `orphaned`).
* **ladder records** — §11.2's `WhyAnswer.members` for a QUARTER, GUILD, COUNT or SIZE record: the step type, the range,
  the count and the member ids, each counted once (item 108 (c)).
* **an unwalled side** — §11.2's `WhyAnswer.closure` for a barrier run ("the cliff is the wall here", item 106 (g)).
* **openings and voids** — an opening's cause (its `AccessPoint`), and "the ruins under the old quarter" through
  `districtsAbove` (V01 §3.16); an unexcavated void is named only to a key that admits it.
* **`district.terrace`** — the state and its source (V01 §3.17.1): "the ground here falls 18 % and the relief is hilly:
  the quarter is terraced", "declared by the user", or "too gentle for retaining walls: terrace streets only".
* **`RetainingWall`** (every wall, one provider for the kind) — its producer and reading: a generated wall's levelled
  block, plot or ward (the base's S10–S11 levelling, or the district-edge source for a ward-edge wall, item 302), its
  slope against `terrace.slopeMin` and its step against `terrace.stepMinCm` from the derived step (`stepProfile`): "the
  quarter stands 3 m above the fields here"; a declared wall, "drawn by the user" (its `drawWall` or `terrace` event);
  each way that crosses it, "by a stair" or "by a ramp", with the way-class rule by slope.
* **`district.raised`** (an empty under-deck strip or a pier hole in D) — the raised way and its recorded reason (item
  110 (f); `DistrictContext.raised`): "under the arches of the Old Aqueduct, which carries water from the hill springs".
A subject no provider here covers (a deck plot, a raised way itself) takes volume 10's provider for its kind (V10 §3.9).

**The close-up panel's reader query** — `query({ kind: 'hood', id: D })` returns the district's name, identity (with a
QUARTER record's label), fabric, population, the ladder records with members in D (members here; members elsewhere with
their districts), the chains in its context, the voids under it the key admits, its shade share, its terrace state
(`DistrictContext.terrace`), the raised ways crossing it (`DistrictContext.raised`: the way, its kind and its recorded
reason), and the bends of its last re-derivation; volume 9 lays the panel out. The panel offers, beside the layout
cards, **remove** on a generated raised way (routed to the base's removal with its dry run, V01 §3.17.5), T4's `raised`
add, and the *Terraces: auto / on / off* chip (V01 §4.1).

Its **proposals** are previews of T8 (a fabric on a district, with the three variations), T9 (a block's content) and T6's
furniture stamp, shown as ghosts with a one-line reason (§14's clerk contract). Its **critiques** of a skeleton add, for
stage 2: a declared fabric whose requirement fails on the declared quarter (a ring on a narrow strip: "bends to a
square"), a district whose squares fall short of its quota with no sited block, and a quarter whose identity has no
anchor (§14's existing critique). It sees a court's or a yard's name only when its viewer's key admits `local` at the band
it asks for (§9.2).
=== END ===

=== REPLACE #### 5.1.4 Night and states ===
#### 5.1.4 Night and states

`hatched`'s night is §8.4 (h)'s — the ambience wash and a glow per lit building at the vector rung; the placed lights
(§4.7) light the streets. §8.2's `states` rows apply with `hatched`'s tones; a ruined or Works-stage building's hatch is
replaced by its state's program. Item 123's damage and a disaster's ruined look (item 122) are V02 §5.7's in `hatched`
as in every family: a hole takes its ring out of the hatched facets, the hatch per facet (V01 §5.1.2) stopping at its
edge as at a facet's, a gap leaves its run of the outline undrawn, and the massing reading's tone and dash fall on
`hatched`'s roof tones; no program of this volume draws either.
=== END ===

=== REPLACE ### 5.3 Exports ===
### 5.3 Exports

| format | stage-2 content (§11.1's rules otherwise) |
|---|---|
| SVG | a district scope — or an outline's — at the neighbourhood band (§11.1 allows it for a district-sized scope): the transient list is built with the close-up derived (a pure function, V01 §3.8) — hood pins in `<g id="sem.pin.hood.<kind>">`, ground access symbols in `<g id="sem.access.<kind>">` (the export key's admission applied), squares and greens by semantic, the hatch as filled paths, place labels, the title; retaining walls in `<g id="sem.wall.retaining">` with their shadows, raised parts in `<g id="sem.way.raised.<class>">` above the ground ways inside the layer group `layer.ground.raised`, piers in `<g id="sem.raised.pier">` (§11.1, item 447), and the deck plots and buildings the district owns (V01 §3.17.6); ids preserved |
| PNG, print | the same list through the tile assembly (§8.8, §11.1) |
| VTT (scene JSON, `.dd2vtt`) | scope a district or a rectangle (§11.1); the scene image drawn with the close-up; walls from footprints and boundary treatments as the base's; lights as the base's; hood pins in the image only (no wall, no light of their own); retaining walls and raised supports in `line_of_sight` by §11.1's VTT rule (items 447, 448: a wall whose derived step is ≥ `vtt.retainingMinCm`, broken over its stair and ramp intervals; supports' footprints as closed polylines), so no token walks off a terrace or through a pier; the decks the district owns in the scene |
| GeoJSON | model entities: blocks with `content` and `squareType`; squares, greens and yards as polygons of those kinds; `HoodPlace`s as features (`kind: 'place'`, its place kind and subtype, name, the knowledge admission applied, §11.1) — an opening as a point at its `AccessPoint`; with the option `closeup: true` on a district or outline scope, hood pins as point features `{ kind: 'hoodPin', pin, sizeM, derived: true }` in a `presentation` collection; retaining walls (kind `retaining`, per run), raised ways, their supports (kind `raisedSupport`, per support) and spans, stairs and ramps, and deck plots and buildings as §11.1 states them (item 447; J-VI.18) — a wall's derived step reaches GeoJSON only as that item's step bounds |
| JSON (full schema) | `Block.content`, `squareType`, `ringCentre`, `voidCorner`, `overrides`; `HoodPlace` (with `subtype`); the `closeups` block's records; `Recipe.product` and `Recipe.hood`; `District.fabric`, `fabricParams` and `terrace`; the `hood.constants` cells, their `NG` entries among them, a document pins (§7.6) |
| glTF / OBJ, CityJSON | model entities only: square and green faces as ground surfaces; model pins as §11.1's props; hood pins excluded (presentation); retaining walls as prisms from the low side up to the high side's level; raised decks at their height on their piers; deck buildings on their decks |
| skeleton file (§11.1) | the declared subset gains `setAttr` of `fabric`, `fabricParams`, `terrace`, `content`, `squareType`, `surface`, a place's name and knowledge (a new place's included), a `quarter`'s `fabric` (item 349) and `terrace` (item 350), `closeup` and `instance` events on hood pins, and a standalone recipe's `hood` |
| a standalone neighbourhood document | every format, as a town (it is a document) |

Every export honours §9.2's knowledge admission (a court's local name withheld from a public export above the
neighbourhood band) and records declared, derived and clerk-proposed provenance (§11.1; item 101 R19). A scope holding no
stage-2 content (a district before M5, a hinterland rectangle with no close-up) exports the base's content only. An export
of a district whose close-up was never opened derives it for the export (a pure function), never stores it. A picture
export draws Find as shown (V01 §5.4 (5)), and the crisis looks shown as §11.1 draws them — a VTT scene in its image
only, never as walls or obstacles (item 122 (f)); this volume adds nothing to them.
=== END ===

=== REPLACE ### 5.4 Find over the town — areas and gaps (item 120, the town's part; J-V1.102) ===
### 5.4 Find over the town — areas and gaps (item 120, the town's part; J-V1.102)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the Show
gaps switch), kept across zooms, bands, layers, the season, epochs and edits until **Clear** or the panel's close, and
outside the document, its hash and the log. The panel, the type-ahead, the chip grid, the results and the `live.find`
overlay are volume 9's; the veil, halo, outline, pin and count-bubble rows §8.2's; the search words and groups V11's
lexicon; the gazetteer's class counts and match listing §11.2's; the clerk's "show me" volume 10's. Every list entry,
count, glow, pin and gap passes §11.2's admission at the view's effective key, band-less as the gazetteer reads (as at
the city band; item 120 (h); V09 §4.8's View as). This section states what a town — TOWN to the METROPOLIS cap — and a
standalone neighbourhood document offer as **areas**, and how **Show gaps** reads its units, through `@plat/hood`'s
`findAreas` and `gapUnits` (V01 §2.3, V01 §3.16): pure, draw-free functions of committed state and the key over every
layer, each row carrying its layer, memoised per commit and per key, never stored. Below TOWN the village's reading is V07 §5.5's; a village grown into the town ladder
takes this one at its hand-off.

**(1) Areas — `findAreas(key)`** (item 120 (b), (e)). One `FindArea` per area the document holds:
* **Districts and neighbourhoods** — every `District` but the hinterland pseudo-district (the land outside
  the town; a match there is listed by itself, under no area): the base's districts on Ground; on Below each undercity
  neighbourhood and the underground pseudo-district (II.7.3, II.7.5; V04 §3.6a (5)); on Sky each island's districts
  (V01 §3.10.3); in a standalone neighbourhood document its one district. **A neighbourhood is the district a close-up
  opens** (J-V1.35): districts and neighbourhoods are one set of targets — one chip per area, never a district chip and a
  neighbourhood chip for the same land — and `word` reads `neighbourhood` for an `undercity` or `underground` district
  and a standalone neighbourhood document's district, `district` for every other. Its search words are its name (its
  `LabelEntity`'s, `displayText` where set) and its identity row's label (item 72; a dossier QUARTER record's label where
  it gives one, V01 §5.2.1), so "weavers" finds the weavers' quarter whichever word named it.
* **Quarters** — each `QuarterNode` of §9.1's tree in the **city cut** (`cityCut`: §4.5's quarters) with two or more
  member districts, the union of its members; a city-cut node of one district is that district's target, never a second
  chip. An undercity neighbourhood joins the tree under its parent's quarter node (II.7.5 (2)), so a quarter may have a
  shape on Ground and one on Below.
* **Regions** — each `RegionGroup` (item 101: an Upper, Lower or Outer City), the union of its quarters' districts,
  named by its `region` label.
Nothing the document lacks is listed: a TOWN whose city cut stands every district alone lists no quarter. An area the key
does not admit — on Below, a neighbourhood in a void the key withholds — is never listed, counted, lifted or pinned; a
quarter or region whose member districts the key admits only in part takes those members' union, and is not listed
when it admits none. **A named `HoodPlace`** (V01 §3.7.1: a square, green, yard, court or opening) is not an area and no
`findAreas` row: it is a place target of the gazetteer's place rows (§11.2), whose chip lifts its host face and glows
along it — an opening glows at its symbol (V01 §3.8.8) — admitted by its `knownTo` as the gazetteer admits it, so a
`local` court's name is offered only to a key that admits it there.

**(2) The look of an area chip** (item 120 (e), (f)). An area chip lifts its `shapes` on the layer shown from the veil
and draws §8.2's halo along their outlines; a hole in a shape (a district a quarter encloses but does not hold) stays
under the veil. On the city band an area whose shape spans less than item 120 (e)'s pin threshold (about 6 px) at the stop drawn
carries its chip's pin at its `anchor`, so a small district at item 116's zoom-out limit is never a lost speck. On a layer
that holds none of its shapes it shows as a ghost pin at its anchor and counts among the panel's "more Below" and "on
Sky" (item 120 (f); V04's and V05's parts draw them). An area chip never filters a kind chip's matches: the chips are a
union (item 120 (d)).

**(3) Show gaps — `gapUnits(chip, key)`** (item 120 (i)). For each kind chip (an area, place or person chip has
no gaps), the **unit** is its class's compiled `profile.coverage` — `unit` and `per` (V11 §2.3) — with `neighbourhood`
read as `district` (J-V1.35); a class without a coverage row reads the `district` unit, the "one in every district"
reading of the Coverage view this switch absorbs; a chip of several classes ("all smiths", item 120 (c)) reads their
common `unit` and `per` when all share one, else `district`, its members those of any of its classes. The **members**
are exactly the chip's matches the key admits (§11.2's match listing, the set the chip glows): a member the key
withholds counts toward no unit, so a unit reads as the viewer knows it and a gap never hints at what the key withholds.
The units are `catchmentOf`'s (V01 §3.16), which reads V11 §2.3's — never a second definition — each a `GapUnit`
holding no member:
* **Partition units.** `district` — every district the key admits but the hinterland (a member in the
  hinterland counts toward none), a gap when no member's plot lies in it, its area the district's faces united.
  `parish` — the cells of V11 §2.3's parish partition (`catchmentOf('parish')`; before any church, the district),
  built from the church members the key admits, so no cell outlines a church the key withholds (its plots fall to the
  cell of the nearest admitted church, item 120 (h)); a gap when the cell holds no member, its id the church member's
  (the district's before any church), its area the union of its plots' faces; a church class read on `parish` stands
  in every cell it makes, so it has no gap.
  `settlement` — one unit, the town, a gap only when the key admits no member on any layer, its id `TOWN_ROOT`, its area
  each layer's districts united (one `GapUnit` per layer that holds a district).
* **Per-plot units.** `walk` and `households` — each residential plot (one holding a household at S10a, §4.7: the plots
  V12 §3.6's `servedShare` counts for these units) whose `catchmentOf(plot, unit, per)` holds no member is unserved; a
  district's unserved plots form its gap unit (its id the district's, its area the union of their faces), and a district
  with no residential plot holds none (V11 §2.3's skipped term). On Below `catchmentOf` reads `underDistance`, and on Sky
  an island is one `walk` unit, as V01 §3.16 states.
Each gap's components are drawn by §8.2's dashed gap outline with one "none here" label per component, on the layer
shown; a gap on another layer is drawn when that layer is shown and is listed in V10's `FindAnswer.none` by its `id`.
**Evaluation.** A partition unit takes one pass over the members' plots. A per-plot unit takes one pass per member
over V11 §2.3's 16 m raster: a member serves every residential plot whose disc holds it, and the disc is symmetric, so
each member marks the cells within the radius about its plot — `per` for `walk`; for `households` the radius V11 §2.3
derives for each district, one pass per radius in use — and a residential plot is served when the marks of its own
district's radius reach its cell, which is V11 §2.3's count plot by plot. On Below the marks spread from the members by
`underDistance` (V04 §3.6a (1)); on Sky a member anywhere on the island serves every plot on it. T-V1-59 (b) holds the
unserved plots to V12 §3.6's `servedShare` count, plot by plot.

**(4) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, redo and epoch re-evaluates both services
with the overlay's index, rebuilt once per commit (item 120 (j)): a district an epoch creates is listed, and its gaps
drawn, in that commit; an edit that removes a district's last member of a chip's class makes it a gap, and its undo
removes the gap. A chip's area is held by its id: an area whose id the document no longer holds — a district merged or
split away under §6.3's succession, a quarter node a Re-derive from S6 rebuilds under another id — leaves its chip in the
grid at count 0, dark, until the viewer removes it or presses Clear (item 120 (a)). No commit writes the view key.

**(5) Exports and cost** (item 120 (i), (j)). A district or outline picture export (V01 §5.3) draws Find as shown — the
veil, each area's lift and halo, the gaps with "none here" — with the chips in the legend, by §11.1's rule; a VTT scene
leaves it off unless asked; no export stores it. Find is an interaction, not a one-time wait (item 119 (d)): `findAreas`
and `gapUnits` run within §12.5's overlay budget by V01 §6's Find lines, never re-rendering the base tiles, and a chip's
glow is never delayed by its gaps, which draw when computed.

**(6) Crisis looks in Find** (item 122 (f)). Find's `crises` section, a look's row and its crisis card are volume 9's
(V09 §4.21.12); a look is no chip and no `findAreas` row. A disaster look's place — the land its row's **Go to** and
its card's **Show** frame — is the union of the Ground shapes of its units' `FindArea`s: the districts
`disasterDistricts` returns at the view's effective key (V01 §3.16), at the village rungs V07's units' land. So the
frame and Find's halo are one set of shapes, and a unit the key withholds is neither framed nor listed.
=== END ===

=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

On §12.1's reference hardware, measured as §12 measures (p95 over the bench's seeds unless a line says otherwise); every
line is PLAUSIBLE until its milestone measures it, with its pre-decided fallback (§12.10's register shape). "B" is the
building count in scope.

| line | budget | where it sits in §12 | measured | pre-decided fallback |
|---|---|---|---|---|
| S7c fabric selection (S7b's hook) and its land estimate | ≤ 0.07 ms per district (context from cached records; χ̃ over ≤ 100 allocation rows and their allocation-level links; ≤ 12 rows' predicates; `templateLandM2` closed-form) — ≈ 1.8 ms at CITY, ≈ 3 ms at METROPOLIS; S7b's reconcile with the template land adds ≤ 1 ms at CITY | a row of §12.4's CITY split, inside S7b's line and the one-click model budget (item 474) | M5, B-CITY | the context's portal and landmark lists are cached per district from the greedy pass; if still over, eligibility tests the cheap predicates (areas, shares) before the geometric ones (crossing pairs) |
| template seeds (S8) | spine or parallel spine ≤ 0.3 ms per seed; a contour series ≤ 1.5 ms per district (≤ 31 level lines per flank by marching squares over the face's box); plaza ≤ 0.5 ms; ring series ≤ 2 ms per district (≤ 6 courses of 48 vertices with validation); the holed bent cut of ring bands ≤ 2.5 × a plain cut per street (NG measured 2–3 ×, `profile-neighbourhood.md` RA-6) | inside §12.4's S8 row: at the default 15–35 % template share, ≤ + 4 ms at CITY | M5 (spike S-V1-a) | the ring validation runs once per series instead of per course; a ring district's bands cut at the `landmark` variant's one-ring minimum when the series exceeds 2 ms |
| S9b block dispatch (S10a's hook) | ≤ 0.18 ms per district (≈ 60–150 blocks; junction and frontage lookups through the L2 index; the siting pushes over S10a (i)'s filled blocks by the family rows' radii; the island strips evaluated once per shade evaluation at S9b's first read and shared with field pass 2, V01 §3.5.5) — ≈ 5 ms at CITY | a row of §12.4 (item 474) | M5 | candidate lists by type built once per district from one junction scan; the pushes read a per-district list of emitter blocks |
| the services of V01 §3.16 (`catchmentOf`, `districtsAbove`, `fabricSignature`) | ≤ 1 ms per call at CITY, memoised per commit; `catchmentOf` on a disc unit (`walk`, `households`) ≤ 2 ms at METROPOLIS (the plots under its disc's cells of V11 §2.3's 16 m raster, by a plot index per cell) | inside the callers' lines (S10b's coverage term, volume 4's stage, the reader) | M5 | the plot index per raster cell built once per commit and shared by every call |
| Find's area targets (`findAreas`, V01 §5.4 (1)) | the list with its shapes, per commit and key: ≤ 3 ms at CITY, ≤ 8 ms at METROPOLIS (the districts' faces as committed; the city cut's ≤ 18 quarters and the region groups united by the kernel's union, memoised) | inside item 120 (j)'s index rebuild, once per commit, within §12.5's overlay budget | M5, on V09's app harness | a quarter's or region's union computed at its first use (a chip, the list scrolled to it) instead of at the rebuild |
| Show gaps' units (`gapUnits`, V01 §5.4 (3)) | per chip: a partition unit (`district`, `parish`, `settlement`) ≤ 2 ms at METROPOLIS (one pass over the admitted members' plots); `walk` and `households` ≤ 25 ms at METROPOLIS (one pass per member and per radius in use over the 16 m raster's cells within the radius, V01 §5.4 (3)), on the worker — never delaying a chip's glow (item 120 (j)), its gaps drawn when ready | §12.5's overlay budget, beside item 120 (j)'s glow | M5, B-CITY (METROPOLIS) on V09's app harness | the members nearest the view marked first and the rest on idle |
| the crisis services (`disasterSource` with `disasterDistricts`, `campLand`; V01 §3.16, item 122) | `disasterSource` ≤ 1 ms per standing disaster overlay or preview at the METROPOLIS cap (one pass over the units' adjacency; the units' facts built once per commit and shared by every overlay), memoised per commit, overlay and key; `campLand` ≤ 3 ms at the METROPOLIS cap (one pass over the hinterland's land-use faces within `camp.reachM` through the face index), memoised per commit | §12.5's lazy per-tile budget for crisis looks: computed at the first visible tile that draws a look — an interaction, never a one-time wait (item 119 (d)) | M5 (`disasterSource`), M3b (`campLand`), on V09's app harness | the units' mean heights read on the hydrology grid instead of the height raster; `campLand`'s faces gathered for the tiles in view first and the rest on idle |
| surface rule, local-place step, naming context | ≤ 1 ms, ≤ 1 ms + §12.4's S13a naming rate per place, ≤ 0.2 µs per way at CITY | §12.4's S10a and S13a rows | M5 | — |
| **one-click total added by stage 2** | ≤ 12 ms at CITY, ≤ 20 ms at METROPOLIS (the model path; nothing added to the city band's first map beyond the square and green fills) | §12.3's model law gains this term, declared (D-18's rule for a declared cost) | M5 | the parity presets pay 0 (no template, all ordinary); if the default exceeds it, S9b's phase 2 moves to the pooled S10 (it is block-local) |
| opening a district (refine close-up) — **model and display list** | the close-up derivation (hood pins over sites) plus S14's neighbourhood-band display list for the district: **non-ring fabrics ≤ 6 ms + 0.06 ms × B** (≤ 33 ms at 450, ≤ 51 ms at 750), **`ring` ≤ 10 ms + 0.07 ms × B** (≤ 100 ms at 1 300) — against NG's reset of 10–52 ms for medium area, street and square hoods (600–779 buildings) and 78–96 ms for ring (1 209–1 287), whose figures exclude raster (`docs/confidence/ng.md` H1; J-V1.48) | §12.5's neighbourhood-band line, made a law per fabric class (item 474) | M5, B-ZOOM | hood-pin symbols stamped per kind and size class (one sprite draw each) instead of drawn as paths |
| opening a district — **first visible tiles rastered** (measured separately) | ≤ NG's 73–111 ms raster at comparable counts (H1) | §12.5 | M5, B-ZOOM | the surface stamps drawn at the district band's flat tone on the first frame, the stipple on the next |
| the surface marks of one opened district (stamps, kerb dots, stair-stepped ticks) | ≤ 3 ms at 450 buildings | inside the display-list line above | M5 | a flat surface tone at the district band until the view settles |
| the walls and raised parts of one opened district (item 110) | ≤ 1 ms at 450 buildings, inside the display-list line; the same per district at METROPOLIS | §12.5 | M5, B-ZOOM | one path per district for all its walls |
| METROPOLIS: the largest district's open; its replace close-up; a large standalone neighbourhood document's first map (≈ 1 300 buildings) | open: the law above at its B; replace: §12.6's scoped law × the fabric's factor at its B; first map ≤ 0.8 s p95 | §12.5, §12.6 | M5, B-CITY (METROPOLIS) | open: hood pins derived for the visible blocks first, the rest on idle; replace: the dry run's overlay reused at commit; the hood: the one-district pool path skipped |
| per building (S5 (b)) | generation ≤ 75 µs (the standalone path, model only) and rendering ≤ 85 µs at the neighbourhood band | §12.5 | M5 on medium standalone neighbourhood documents | as above |
| draw calls and uploads (S5 (c)) | ≤ 80 path calls per tile (hatch batched per role) and ≤ 25 canvas operations per wing as the ceiling (II.4); uploads within §12.5's ≤ 4 per frame while moving | §12.5 | M5 census | the hatch's parity rule starts at 2 px instead of 1.5 px on screen (every second line drawn sooner) |
| a replace close-up (a fabric change, New random on a district) | §12.6's scoped law × the template's factor — `ring` 1.5, `crossroads`, `landmark` 1.2, others 1.1 — plus S9b's and S13a's deltas: ≤ 45 ms for a ring district of 450 buildings; its dry run the same, the commit reusing the dry run's overlay (≤ 2 ms) | §12.6 | M5, B-EDIT | as §12.6's fallbacks |
| a block's content edit | D from S10a: ≤ 3 ms + 60 µs × the buildings of the blocks whose allocation changes | §12.6 | M5 | — |
| a hood-pin edit | ≤ 1 ms model, the district's chunk re-derived ≤ its open line | §12.6's single-plot line | M5 | — |
| the stage-2 switch's edit (V01 §3.15) | a Re-derive from S2 of the whole document: §12.6's ≤ M(B) for a Re-derive from Sk, stage 2's per-district lines above included, the underground tail's after it | §12.6 | M5 (T-V1-4's switch clause, timed) | none needed: a rare parity edit whose dry run shows its fates before it commits |
| a standalone neighbourhood document | first map ≤ 0.5 s p95 for a medium one (`size.medium` buildings, V01 §3.14; S6 (b)); model ≤ 75 µs × B | §12.5's first-map law applied to the unit | M5 | the one-district pool path is skipped (the unit runs single-worker) when that is faster, measured |
| a sky island's districts | **generation**: the unit run ≈ 8–12 ms per island at CITY, ≈ 12–18 ms at METROPOLIS (≤ 3 districts' worth, ≈ 2–5 % of the town's plots, at this table's per-district rates), on the generation worker concurrent with the pool — the figure V05 §6 cites for its critical path; **after generation** (V01 §3.10.3 (6)): a raise, a late declaration or New random on an island runs the unit run inside its commit at these rates plus §12.6's commit overhead (II.6's `raiseIsland` line); a growing resize or a rim reshape costs §12.6's scoped law once per receiving district — for a resize every district bordering the rim — plus once for the district whose institution claim is re-searched where that district receives no face, at most k ≤ 3 in all, and a shrinking resize none but the district whose claim is re-searched, where one is (its plot clearing, re-cut and way cut-back are volume 5's, V05 §6); `plantRimWalk` adds ≤ 0.2 ms, once per event and once per unit run | §12.4 (inside SKY's line, V05 §6); §12.6 | with volume 5's stage (its fixture island first, T-V1-21) | the island's S12b and S13a join the ground's pooled batch instead of running serially on the worker |
| memory | the close-up chunk ≤ `closeup.chunkKB` per district inside §12.8's 8 MB elaboration cache (LRU); `Block.content` and flags 2 B per block; `HoodPlace` ≈ 80 B; `CloseupRecord` ≈ 40 B + 24 B per override row | §12.8 | M5 | the cache's existing halving fallback |
| document size | ≤ 1 KB per edited close-up; the town's document growth from stage 2 ≤ 2 % at CITY (places and flags) | §12.8's document line | M5 | place names stored by naming-record reference only |

**One-time waits (item 119, stage 2's part; J130; J-V1.103).** Every line above stays the **target** — as fast as
possible, the build pressing every path toward it (item 119 (a); §12.1's targets and comfort level). The one-time waits
stage 2 adds to or lengthens — generation with stage 2 (its one-click total and the first map), a standalone
neighbourhood document's first map, a replace close-up, the stage-2 switch's edit (a Re-derive from S2 of the whole
document, ≤ §12.6's M(B)), the sky unit run at generation and inside a raise, a late declaration or New random on an
island, and a district or outline export (V01 §5.3; §12.7's lines) — each completes within item 119 (a)'s **comfort
level** of ten seconds of total time, from the click to the complete result on §12.1's reference hardware, at TOWN, CITY
and METROPOLIS up to its population cap (a standalone neighbourhood document at each `contextRung`; the switch's edit at
the METROPOLIS cap among them); past it the wait fails T-V1-29's clause. Each wait past about one second shows progress —
the running stage by name and the map filling in, never an empty screen — through V09 §4.21.9's progress view (item 119
(c)); the first picture is still complete (§8.5). A step runs slower than its target only for a measured gain recorded
as its `perf.qualitySpend` row (V11 §3.25.8: the step, its cost and its gain) and still inside the comfort level (item
119 (b)); stage 2 ships none. The interactive lines — opening a district (its model and display list, and its first
visible tiles), the surface marks and the walls and raised parts of an opened district, a block's content edit, a
hood-pin edit, T8's preview (the replace dry run), Find's two lines and the crisis services — are interaction budgets,
unchanged by item 119 (d). The low tier (§12.1) aims at the same comfort level, a size it cannot reach declared per
device (item 119 (e)). At
the METROPOLIS cap the targets of these waits lie within a few seconds (§12.3's model law, §12.5's first-map law, §12.6's
M(B)), so item 119 moves no figure of this section; T-V1-29 times each.
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

Families are §13's (B-CITY and B-CITY-lite, B-EDIT, B-ZOOM, B-FUZZ, B-REF §13.5, the goldens §13.3, the D-5 panel
§13.6); classes are §15.2's: **C** a rule checked, **P** a measured NG number compared, **O** an outcome NG does not
reach. Every bar runs from M5 unless its row says otherwise; the last column is its stage-2 letter (§15.2's S1–S6).

| id | bar | family | class | letter |
|---|---|---|---|---|
| T-V1-1 | II.5's M1 readiness bars hold with `@plat/hood` registered: every district's `SeamContract` resolves; every seam edge typed (a barrier run by II.1's seam typing, item 541); every `baseLane` portal matches one lane or seed end | B-CITY | C | S1 |
| T-V1-2 | χ̃ (V01 §3.2, V01 §3.3.7): (a) its plot mix within 0.08 of the placed vector's (half the L1 distance) for ≥ 90 % of districts; (b) χ̃ over the greedy and over the reconciled allocation within 0.08 of each other for ≥ 95 % of districts | B-CITY | C | — |
| T-V1-3 | S7c: New random on a district never changes its fabric; changing one district's intent, declaring a `quarter` or merging two districts changes no other district's fabric (the lineage key, V01 §3.12); an edited fabric survives a Re-derive from S6 | B-EDIT | C | S6 |
| T-V1-4 | (a) the default preset's non-`bent-cut` share 15–35 % at CITY; (b) under `MFCG` and `FTG`: 0 templates, every block `ordinary`, 0 `HoodPlace`s, 0 greened courts from stage 2, and the M4 goldens **byte-identical** with `@plat/hood` registered (the way-surface rule and the naming context landed before M4, V01 §8.1, and are inside them); (c) a registry test: every `hood.*` switch cell — a chance, gate, weight, gain, quota or option — and every V01 step not in the M4 goldens carries the `extension` marker (a step: it runs only while `fabric.extensionWeight` > 0, V01 §3.15), no geometry cell carries it (V01 §2.2), and `hood.constants`' `access.*M` columns equal the `AccessSymbolKind` values as a set (V01 §3.8.8); (d) **under `NG`**, every cell of every table but `hood.constants` resolves to its `MFCG` value, and `hood.constants`' cells to V01 §3.15's entries where listed, else their `MFCG` value (a resolution test over the compiled tables); (e) **the no-op pin** (item 110 (f)): with V11 §3.24.0's item-110 switches off, byte-identical — a `NoOpPin` registration of the M5 neighbourhood suite on V12 §3.7.8's engine (`item110.*`), written by the M5 seat — and V01's item-110 rows — the series flag, `terrace.askGain`, the precinct multi-ring, the hillside default, the flatter-square tie-break — `extension`, off in `MFCG`, `FTG` and `NG`; (f) **the switch clause** (V01 §3.15): on a generated B-CITY document in the default preset with no held stage-2 edits, an `editTable` lowering `fabric.extensionWeight` from 1 to 0 leaves 0 `HoodPlace`s and 0 typed blocks, each retired place and block among the edit's fates, and what the stages before S2 commit byte-identical; raising it back to 1 makes the places V01 §3.7.1 selects, opening places included (T-V4-74 (b)); the undo of each restores the document byte for byte; the edit timed against V01 §6's switch line | B-CITY, goldens, CI | C | — |
| T-V1-5 | S4 (b): a nearest-centroid classifier over `DistrictSignature` (V01 §2.3), standardised over B-CITY, assigns ≥ 90 % of template districts to their template (eleven classes; held-out half of B-CITY) | B-CITY | C | S4 |
| T-V1-6 | S4 (a): every district kind V01 §3.3.8's table does not exclude has ≥ 1 of its rows eligible on ≥ 50 % of its districts of ≥ 3 ha — for every kind but `shanty` counting only its non-`bent-cut` rows | B-CITY | C | S4 |
| T-V1-7 | ring geometry: every laid ring whole (none meets the face inset), 48 vertices; one district's spacings in one geometric series (consecutive ratios equal within rounding, the factor in [1, 2); item 543); under `ringRadials` 0, 0 ring junctions with arms from both sides within the portal gap, and radials of adjacent bands never collinear through a ring (angle > 6° at every shared ring vertex); under 1, exactly one through crossing per band | B-CITY, B-FUZZ | C | S4 |
| T-V1-8 | the templates' shapes: `street` — the main spine joins its two anchors, ≥ 70 % of its frontage length plot frontage; `square` — the plaza's area within ± 10 % of V01 §3.4.5 (a)'s A after fit (or reported shrunk), its through streets reaching the face boundary; `quay` and `wallside` — the spine within ± 10° of its seam over ≥ 80 % of its length, offset within ± 0.5 m; `crossroads` — the two spines (`pair:1`, `pair:2`) crossing at ≥ 45° inside the plaza; `park` — the green plaza within ± 10 % of its A, every fan path reaching a portal; `landmark` — each precinct ring within `dBar + w_tpl / 2` ± 1.5 m of its precinct's outline over ≥ 90 % of its length, the first anchored on the highest-σ reservation, each of the second fixture's precincts ringed | B-CITY | C | S4 |
| T-V1-9 | B-FUZZ: 10⁴ random template faces per template (convex, concave, C- and L-shaped, holed, elongated, triangular; the `stepped` row's contour and ravine faces among them, V01 §8.4 (10)): 0 crashes, hangs or invalid outputs; completion 100 %; F-TEMPLATE rung counts reported; fallback rate ≤ 10 % on faces meeting the row's requirement (S-V1-a's bar, V01 §8.2) | B-FUZZ | C | S4 |
| T-V1-10 | S4 (d): square area per 1 000 inhabitants in 0.03–0.15 ha, median 0.08 ± 0.01, over districts of ≥ 1 000 inhabitants, **measured over every square source** (the main plaza, §4.8 forecourts, gate plazas, S7b claims, template plazas, void squares, S9b's); S4 (c): ≥ 90 % of squares at a junction with a tier-1 arm or two tier-2 arms, or before a landmark (item 523's reading); 0 churches with two forecourts; 0 S9b squares with stalls or a market rank; S2's market count and item 24's separation unchanged by stage 2 | B-CITY | C | S4 |
| T-V1-11 | (a) greens: the sub-block green quota met within ± 10 % in ≥ 95 % of districts that have one; (b) manor blocks: the share of eligible blocks within ± 3 points of the band row; court greening: the share of courts greened per band within ± 5 points of its row; (c) at fixed recipe parameters, the green-block and court-greening shares' standard deviation across seeds ≤ 8 points, means within ± 5 points of target; (d) a forced unmet quota rolls to the next type and is reported, and a household-less manor block reverts to `ordinary`, reported (V01 §3.13) | B-CITY | C | — |
| T-V1-12 | land: 0 households unplaced because of a dispatched block or a template, **reported per template class**, with a stress fixture forcing each class to 100 % of the districts in turn; population within ± 5 % of the request (± 0 of a dossier's, §7.7 item 2) with stage 2 on; a fixture with a generated aqueduct and elevated road across built districts plus a user-added viaduct: 0 households unplaced, the population whole | B-CITY, stress fixture | C | — |
| T-V1-13 | S3: across soft seams Δ median frontage ≤ 25 %, Δ median plot area ≤ 35 %, Δ median storeys ≤ 1 with stage 2 on (§13.7's band) | B-CITY | O | S3 |
| T-V1-14 | S1 (from `SeamReport`): portals connected 100 % (added included); shared-edge Hausdorff 0 (computed); field jumps on soft seams within band | B-CITY, every replace in B-EDIT | C | S1 |
| T-V1-15 | refine purity: opening, closing and reopening every district of a city — and outlines over the hinterland — in two random orders, at pool sizes 0 and 3, on Node and the five engines: the model digest unchanged, each chunk's hash identical across orders, pool sizes and engines, the raised-way set byte-identical across the orders; an outline close-up raises the `wings` rung of every building inside it, their records `current`, the model digest unchanged; an `editTable` of the cited `hood.pins` slice or of volume 2's `PorchKindRow`s changes the inputs digest of every chunk that reads it, so no cached chunk is served after the edit and each re-derives to the new rows | B-EDIT, nightly five-engine | C | S5 (f), S6 (d) |
| T-V1-16 | S5 (f): the footprint hash at the neighbourhood band equals the city band's for every entity a refine close-up covers | B-ZOOM | C | S5 |
| T-V1-17 | reroll isolation (R8, S6 (c)): New random on each of 20 districts per B-CITY-lite city, and a fabric change on each, leave every entity outside the district's seam exception — item 369's bounding-way surface and naming record in it, nothing else — byte-identical (the oracle, §7.3), every `RetainingWall` outside the district included (its derived profile recomputed); the scope includes the cross-arena consequences volumes 4 and 5 declare for a ground edit (V01 §3.9), which the oracle predicts from their rows; run on B-EDIT cities with the underground and the sky both on and both off | B-EDIT | C | S6 |
| T-V1-18 | a replace close-up keeps 100 % of locked, pinned, assigned, dossier-backed entities and V01 §3.5.12's fixed inputs in the district; a template infeasible for them **bends** and names the bend in the dry run; a parameter past its range clamps with its line; its fates, renames and changed shared ways listed before commit; 0 refusals; held retaining walls and under-deck strips kept 100 %, the walls added, removed, moved and kept listed | B-EDIT | C | — |
| T-V1-19 | persistence: a `closeup` then `instance` edits on hood pins → save, load, replay byte-identical (the `closeups` block and the overrides); the first `closeup` undo refused while an `instance` on its blocks with a later `seq` than its `since` is live (§7.4's independence); after a New random of the district, overrides resolved by §8.10's law — re-matched within 0.5 × the spacing in ≥ 95 % of cases on the fixture, the rest orphaned and reported, never silently dropped; a `restyle` to another `pinKind` applies; a T3 retaining wall drawn across an opened court stales its chunk, and the re-derived pins clear the wall | B-EDIT | C | — |
| T-V1-20 | the standalone neighbourhood document: (a) `generate` with `product: 'hood'` → a finished neighbourhood, first map ≤ 0.5 s p95 at medium (`size.medium` buildings; S6 (b)); the building count within ± 10 % of the chip's target at p90; 0 plots fronting the outline; each fabric's outline of its family (V01 §3.10.2); digests identical on the five engines; (b) 10 000 outlines of each row simple after F-OUTLINE (§13.2's property test extended); (c) Spearman ≥ 0.8 between the wealth slider and the neighbourhood's mean prosperity, and between the greenery slider and its green share; (d) an outline below `4 × eLo²` **scaled up** with its bend line, never refused; a drawn outline F-OUTLINE cannot repair replaced by the kind row's `auto` outline, named; (e) no island, sewer, undercity, quarry, generated vault or buried town at any `contextRung`, ≤ 1 catacomb, each through the input its S0 writes (V01 §3.10.1 (7); V04's T-V4-75); (f) on a fixture with a cavern under it and an access reaching it, F6 dwellings present, the underground pseudo-district's allocation ≤ `forecastSafety` × P7's forecast and taken from the one-district allocation's poorest band, the population whole; (g) a Terraces document from T1 with no other input lays its contour series and is never bent to organic, with walls where the hillside passes `terrace.slopeMin`; 0 generated raised ways | B-CITY (standalone variant), goldens | C / P | S6 |
| T-V1-21 | sky units, on volume 5's island fixture (a fixture island until V05's `SkyStrategy` lands): (a) the ground byte-identical with and without the island's districts; ≤ 3 districts per island; every island seam `sky` and hard; **every landing's attach vertex reached** by a seed or lane; `SeamReport.portalsTotal` 0 and `landingsReached` the island's landing count; `NeighbourhoodResult.districts` in partition order and equal to `SkyIsland.districts` after SKY-F; districts of `context.districtKind`, a `sky-temple` district's rows weighted by `temple`'s kind factors; S7c's hinted row's share above its base rate; the island's placements identical at pool sizes 0 and 3; (b) the rim strip untouched (0 plots, 0 cuts) and planted as the rim walk — one `esplanade` and one `street_trees` `Greenery` per strip, trees 10–14 m apart, 0 ways on it; (c) on the ground, every ground landing's S8 destination inside a template face reached by its lane laid before the seeds, 0 F-TEMPLATE bends caused by it; (d) an island district under a higher island reads `shadeSky` in S7c, S9b and the hood pins, with 0 reads of the ground's pass-1 mask on the sky arena; (e) every island crossing site whose two banks border built land a built bridge whose way reaches both banks, or reported unbridged, and 0 bridges at a site that does not qualify; every island bridge that offers deck plots has `deckCm`, `kind` and `piers` set before S10, each of its deck buildings' wings' `baseCm` equal to `deckCm` (V02 §3.16 (5)); (f) every island way read in the part-0 column of V01 §2.3's parts table — 0 island ways dropped from χ̃'s frontage, the portals, S9b's arms or `portalsConnected`'s walk; (g) after generation, an island raised at an epoch and one declared after generation each get their districts in the raising commit, the ground changed only by volume 5's listed fates; New random on an island keeps 100 % of its held entities, lists its successions in `SeamReport.superseded` and leaves the ground byte-identical; (h) after a growing resize, a shrinking resize and a reshape with one inward and one outward stretch: one `esplanade` and one `street_trees` `Greenery` per strip on the re-laid strip, and a replace close-up of an island district leaves the pair unchanged (`plantRimWalk`); a growing resize re-derives exactly the districts that receive new faces, a reshape exactly those that receive faces from its outward stretches, a shrink none — each plus the district whose institution claim is re-searched, where one is — every other island district's content changed only by volume 5's plot clearing, re-cut and way cut-back and the local operator over a re-claimed yard's plots, the district count unchanged; after a claim re-search the institution stands on its new claim, one building, the old one demolished and listed among the fates; (i) an `echo` island over mountainous ground carries 0 ward-edge walls from the relief rows | fixture | C | — |
| T-V1-22 | S2 (a): the context coverage matrix (district context × feature) has no empty cell — every waterfront district a quay, a bank path or the rear-plot water rule; every walled wall-side district an intervallum or the rear-plot rule; every barrier run the rear-plot rule; every slope district's lanes over the threshold stair-stepped; every terraced district a ward-edge wall or none with its reason; every wall crossing a stair or a ramp; (b) 0 buildings in water, bridges within ± 10° of the channel normal (the base's) | B-CITY | C | S2 |
| T-V1-23 | S2 (c): opening every district and a random outline per city, 0 fragments cut at the close-up frame — every way, wall (retaining walls included), water feature and raised part that crosses the frame continues to its edge | B-ZOOM | C | S2 |
| T-V1-24 | local identities: 0 duplicate names per district per kind; for every name a feature-guarded grammar rule produced — ways, places and districts (fabric, ring centre, small) — the feature holds on the model at naming (name–feature consistency 100 %, NG-LT-2, NG D1); a `local` court's label absent at the district band and present at the neighbourhood band for a public key (§9.2's admission table); every way's `shape` the same computed with and without its stair intervals, and the names of the ways of districts whose fabric and blocks are unchanged byte-identical with the terrace rows on and off | B-CITY, B-ZOOM | C | S2 |
| T-V1-25 | surfaces: 100 % of ways without an edited surface carry V01 §3.7.3's rule value; an edited surface held across Regenerate (keep) and New random | B-CITY, B-EDIT | C | — |
| T-V1-26 | `hatched` census (S5 (d)) at B-ZOOM's neighbourhood-band reference viewport: (a) 15–20 hatch triangles per wing (mean 17–19), the two ridge tapers of 30–50 % each included; the model's lines per wing invariant across the band's zoom range (the drawn set the model's or its parity subset); no ridge stroke; outline = footprint; `details` off → 0 hatch marks; the roof law within ± 0.02; ≤ 25 canvas operations per wing; gable and hip wings counted, and flat, pyramid, cone and dome wings hatched by their rule with a line count per wing invariant across the band's zoom; (b) large-tree pins drawn before buildings and block trees after them (order census); 0 hood pins of a singleton kind in a district holding that model singleton; (c) on the second fixture's stepped temple and B-ZOOM's stepped landmarks every tier k ≥ 1 casts a shadow on tier k − 1's roof at the fixed sun, its area within ± 10 % of the prism law's, the stack order never inverted; (d) the hatch per facet: under `roofscape` 0 hatch lines crossing a valley line, a hip line or a wing standing on the wing, every sloped facet's lines within 1° of parallel to its eave; under `fakeGablePerWing` (a)'s per-wing census; (e) 0 hood pins within their clearance of a retaining-wall line, a pier or a strip, or of an entrance reserve (the reserves at `service` entrances and at a stack-hosted access's outside door, `stackAccessDoor(b, a)`, V03 §3.7.2 (1), among them); with the `wings` and plan rungs derived, 0 within 0.3 m of a porch, a secondary porch, a stoop, an outside basement stair's steps or a stack access's outside door (*fallback*: the reserve's depth doubled) — the porch and secondary-porch clauses from M6b, the stoop and outside-stair clauses from M6-P, the stack-door clause and the reserve's own clauses from M5 on the eager records; (f) on volume 2's terrace-wall sub-fixture and the B-ZOOM hill seed with the most fall walk-outs, 0 hood pins inside the reserve at a walk-out's door (`basementDoor(b)`) and 0 basement-door rectangles on the main entrance's side of a walk-out building whose `basementDoor(b)` lies on another side (its main entrance keeps its own rectangle); 0 hood pins on an `ovalCourt` building's floor | B-ZOOM census | P | S5 |
| T-V1-27 | S5 (e): shadow length ∝ stored height under the fixed sun, r ≥ 0.99, pins, crowns and stepped tiers' shadows included | B-ZOOM | C | S5 |
| T-V1-28 | B-ZOOM `hatched`: role continuity ΔE2000 < 2 across every band switch; the contrast matrix on the shipped palette; the palette targets on the measurement render (§8.2, item 69); S5 (g) city-zoom legibility unchanged with the tier on | B-ZOOM | C | S5 |
| T-V1-29 | budgets, every line of V01 §6: opening a district per template against NG's per-template recordings at B = 150, 450, 750 and 1 300; the first visible tiles' raster against NG's at comparable counts, measured separately; the METROPOLIS lines; per building (S5 (b)); draw calls and uploads within §12.5 (S5 (c)); the one-click added cost at CITY; **item 119's one-time waits** (V01 §6; J-V1.103; takes T119-2 and T119-3's stage-2 clauses): on §12.1's reference hardware at TOWN, CITY and the METROPOLIS population cap, generation with stage 2, a standalone neighbourhood document's first map at each `contextRung`, a replace close-up of the largest district, the stage-2 switch's edit (at the METROPOLIS cap among them), the sky unit run at generation and inside a raise, and a district and an outline export each complete within 10 s from the click to the complete result; every wait past 1 s shows V09 §4.21.9's progress, never an empty screen; every step slower than its V01 §6 target has its `perf.qualitySpend` row with its recorded gain (0 rows and 0 slower steps at shipping); V01 §6's interactive lines hold unchanged | bench | P / C | S5 |
| T-V1-30 | S6 (a): five variants of one template in five actions (T10's New random on the district); (b) the default path one action with p95 ≤ 0.5 s for a medium standalone neighbourhood document; (d) addresses, names and footprints preserved across the bands 100 %; (e) 0 hand-offs to another tool | app harness (§13.4) | O / P | S6 |
| T-V1-31 | B-REF against NG (§13.5's NG rows, read from `baselines.json`), **under the `NG` preset** (V01 §3.15; each row's arm `preset: 'NG'`, V12 §2.1's `PresetArm`): districts and standalone neighbourhood documents matched to NG's by building count per template (NG C8's bands: medium area 600–779, ring 1 209–1 287) — blocks per 100 buildings inside NG's band by the band rule (KS); the bent-cut signature rows unchanged by stage 2; the court (hollow-block) share per band in band; the ring template's ring count and spacing-ratio distributions against NG's ring captures (`profile-neighbourhood.md` RA-2) by the band rule; **hood pins per 100 buildings per kind and template** inside NG's band under `NG` and within 3 × NG's under the default preset; the carved plaza's share of its neighbourhood's or district's area per size tag within ± 15 % of NG's median share, a scale-free ratio (`ng.plazaM2`'s tuning target, V01 §3.15) | B-REF | P | S4 |
| T-V1-32 | the D-5 panel against NG (§13.6 (2)), **under the `NG` preset** (the panel's NG groups `preset: 'NG'`, V12 §3.9.1): twenty pairs over the four NG templates — `area` a refine close-up, `street`, `ring` and `square` (carved, item 498) replace close-ups — rated pass at 14 of 20, no template worse on every pair; unrated → M5 *provisional — not rated* (§16); beside it, the same twenty seeds under the default preset shown to the owner unrated | D-5 | O | S2 (d) |
| T-V1-33 | exports: (a) a district or outline SVG at the neighbourhood band holds its hood pins, access symbols, squares, places and title; GeoJSON carries hood pins only with `closeup: true`; every export withholds local and secret names and access symbols by §9.2's table; the full JSON round-trips every V01 §2 field byte-identically; (b) a terraced ward's `.dd2vtt` export: `line_of_sight` along every retaining wall §11.1's rule admits (its derived step at or above `vtt.retainingMinCm`, broken over its stairs and ramps; item 448) and the raised supports' footprints as §11.1 joins them; the SVG groups `sem.wall.retaining`, `sem.way.raised.<class>` and `sem.raised.pier` present; (c) the GeoJSON rows for retaining walls, raised ways, supports, spans, stairs and ramps, deck plots and deck buildings carry exactly item 447's kinds and properties — a retaining wall one `retaining` LineString per run of equal state, each support one `raisedSupport` Polygon, a raised way its `raisedKind` — and no other kind, per-vertex step array or raised flag | export suite | C | — |
| T-V1-34 | editing lifecycle: every edit of V01 §4.1 in B-EDIT's random sequences (10⁴) — apply, undo, redo, replay, migrate — exact; `revert` on a district's fabric path returns it to S7c's choice | B-EDIT | C | — |
| T-V1-35 | registry completeness (§2.8's CI path-coverage test extended): every new record and field — `District.terrace`, `terraceState`, the strip holes and deck ownership among them — has its producer, consumer, edit kinds, lifecycle row, render semantics, label kind (where labelled), export rows and persistence; **read-set test**: each hook's recorded reads ⊆ its declared inputs (V01 §3.1) — on a seed with islands, S9b's reads of `reservations.landing`, `allocations.landing`, each island's `shadeBasis` and `terrain` inside its declared clause; on a sky unit, S7c's and S9b's reads of `shadeSky` inside theirs | CI | C | — |
| T-V1-36 | determinism: every stream key distinct in a B-CITY city with stage 2 on and in the sky fixture (the new concerns included, §6.1's distinctness test), hood-pin draws against S11's decoration draws on `pin.decor` included; no two addresses equal per template row over B-FUZZ's faces (seeds under `S8.seed`); digests identical on the five engines, pool sizes 0–3 | nightly | C | — |
| T-V1-37 | the clerk (volume 10's harness): `why` on a district's fabric, a block's content, a square type, a place's name, a hood pin, `District.terrace`, a ward-edge wall and an under-deck strip answers from committed state — the same before and after a save, a load and an unrelated edit; each provider's pushes carry V11's family ids (`sun`, `nuisance`; V01 §4.5); a T8 preview returns three distinct variations; a viewer's key without `local` never receives a court's name | clerk harness | C | — |
| T-V1-38 | void squares: the claimed square area within ± 15 % of A; 0 plots on a corner claim; the centrepiece at the junction wedge | B-CITY (void runs) | C | S4 |
| T-V1-39 | the epoch hook (with volume 6): the `hood.fabric` participant runs S7c and S9b only on new districts, new faces and due blocks rung 3 redevelops; standing squares, greens and manor blocks survive byte-identical; at an epoch that adds a raised way across an opened district the participant writes 0 plot removals and 0 household moves — the clearing and its re-housing are V06's, audited by its household ledger (V06 §3.19 (7)) — and the crossed districts' chunks read stale | hook fixture (M4's) | C | — |
| T-V1-40 | no wrong answers (item 101 R2): in B-EDIT's random sequences, 0 refusals other than dossier-owned and lock cases; every bend named in one line; a content edit in a full poor quarter re-homes its households and names where | B-EDIT | C | — |
| T-V1-41 | shade (item 102): with `w_sun`, the shade gains and `manor.sunWeight` at 0, byte-identical to the build without them; on volume 5's island fixture over a uniform district, the manor-block share inside the island's strip below the sunlit remainder's by the declared weight within tolerance; no block changes band from the term alone | fixture, B-CITY | C | — |
| T-V1-42 | catchment and siting (item 103): a class with a coverage row reaches the same served-district share whether S10b or `catchmentOf` counts it (one partition, J-V1.35); **one count of served**: over 200 B-CITY-lite seeds per rung, under the host's key, for every coverage unit (`walk`, `households`, `parish`, `district`) the plots `gapUnits` reads as unserved equal, plot by plot, those V12 §3.6's `servedShare` counts unserved, and `catchmentOf` at each plot equals V11 §2.3's unit at that plot; 0 manor or green blocks within an emitter row's radius when its weight is 1; 0 S9b typings on a block S10a (i) filled; on the underground and sky fixtures, `catchmentOf` on an undercity plot measures its disc by `underDistance` and counts its neighbourhood as its own `district` unit, on an island plot a walk row counts the island as one unit, equal to V05 §3.5 (3)'s count, and a district with no residential plot holds no unit | B-CITY, B-CITY-lite, fixtures (V04's, V05's) | C | — |
| T-V1-43 | chains (items 104 (h), 105, 107): on B-CITY with dossier and custom chains, ≥ 80 % of supply links inside one district fall within their good's `comfortM` along the way graph; 0 districts named for a chain below item 72's threshold; districts with an `alongWay` chain take `street` above their base rate | B-CITY (chain variant) | C | — |
| T-V1-44 | ladder records (item 108): on the surveyed dossiers, every QUARTER and GUILD record's members shown in the close-ups of the districts that hold them, member counts summing to the record's; 0 S9b typings on a SIZE record's block; 0 members double-counted | dossier suite | C | — |
| T-V1-45 | walls on barriers (item 106): on item 106's river-loop and cliff fixtures, 0 `wallside` templates on closure-only stretches, 0 template faces on intramural gardens, every barrier run typed hard by II.1's seam typing (item 541), 0 ground seams typed from `sheer` | fixtures | C | — |
| T-V1-46 | the surface of the underground (item 109): every public opening of source `opening` and role `access` a named place and a symbol in its district's close-up, and 0 places for skylights, sewer and adit mouths, gratings and stairs; symbols drawn only for accesses on a ground face with `ground.at` outside every footprint — 0 symbols under a roof, 0 accesses marked twice at the building band (a symbol and volume 3's head), a yard's dug access shown only under an admitting key; 0 surface marks over an unexcavated void; each undercity neighbourhood's `parent` equal to `districtsAbove(part, core)`'s first entry and to II.7.5 (2)'s largest-share rule on 100 % of V04's fixtures; `fabricSignature(region)` equal to V12 §3.4's town-side measures on the same region for 100 fixture regions (the distinctness bar itself is V04's T-V4-45); a landfall-bricked grating and a locked lifeline stair each draw their §8.2 form on the surface and underground alike, a grating whose element is sealed draws `bricked` and one whose element collapsed its rubble trace | fixtures (V04's), B-CITY | C | — |
| T-V1-47 | catacombs (item 109 (k) (2)): every catacomb entrance a place in the close-up of the district or hinterland area holding it, and a symbol unless its head stands in a cemetery chapel (V01 §3.8.8), on cemetery ground or at a CITY or METROPOLIS quarry ossuary's surface head; **0 catacomb entrances on a church building, the cathedral's included** (none inside the footprint of a building whose class's `crypt` column is `always` or `basement`); 0 places or pins for crypts, the cathedral's included; a crypt joined to a catacomb by a (3b) link adds 0 entrances; on the METROPOLIS fixture with the Cemetery network, every extramural ground's entrance reachable by the outline close-up; an untargeted replace close-up over a district holding a source cemetery moves 0 of the source faces, the owning church's plot and the entrance plot; a targeted edit's dry run names the closed source (V04 §3.5.1 (8)) in V01 §3.9's quoted line; every demolishing replace over a stagnant catacomb lists its `blockLifted` notice | fixtures (V04's), B-EDIT | C | — |
| T-V1-48 | S4 (e): a requested landmark — a `landmark` card on a district with a reservation of σ ≥ `character.anchorSigma` (§4.5), or a declared institution whose row asks for the landmark template — delivered with its ring and fans, or its bend named, in ≥ 99 % of B-EDIT's requests | B-EDIT | C | S4 |
| T-V1-49 | S4 (f): over B-CITY, every typed square's siting rule, every context feature's rule, every template requirement and the seam guard hold in ≥ 95 % of checks, each rule reported separately, the square score's flatter-block tie-break among them | B-CITY | C | S4 |
| T-V1-50 | terraced wards (item 110 (a), (e), (f)): (a) on B-CITY's hilly and mountainous seeds with the relief rows' `terracedEdges` on, every `stepped` district's consecutive contour streets ≥ 0.6 s apart along the fall everywhere and within [0.6 s, 1.4 s] over ≥ 80 % of their length (the terrain's own variation beyond, reported; *fallback*: Δz taken per level from the slope along the fall line through the pole, re-measured), and every district with `asks` and `walls` whose fabric declares terraced edges carries a ward-edge wall on each qualifying run (item 302) and none on a hard or `reserve` run; (b) 0 ward-edge walls in districts below `terrace.slopeMin`, and 0 walls of any source on a levelled unit whose mean slope is below it ("nowhere flat"); (c) 0 wall lines doubled (a plot wall within 0.5 m of and parallel to a ward-edge wall); (d) on the second fixture's ravine and B-CITY's ravine seeds, both flanks carry contour streets and lanes join the thalweg path to each flank's series; (e) inside every opened close-up every way crossing a wall carries a stair or ramp interval by the way-class crossing row, 0 gaps | B-CITY, fixture | C | S2 |
| T-V1-51 | raised ways in close-ups (item 110 (b), (f)): (a) 0 junctions between a raised part and a part-0 way in any opened close-up; (b) 0 plots, blocks or hood pins in an under-deck strip, the base's vaults excepted; (c) every ground crossing of a strip through an `open` span meeting the clear-width row and item 244's clearance rule, within ± 30° of square; (d) 0 bridge portals or bridgehead squares at a raised deck; (e) part-0 way names, and χ̃ of every district crossed only by raised ways, byte-identical with the raised-way rows on and off, except where a portal moved; (f) 0 generated raised ways inside TOWN-rung close-ups and standalone neighbourhood documents; (g) 0 squares with two fountains (a centrepiece and an aqueduct's outlet, V01 §3.17.8) | B-CITY (CITY, METROPOLIS), fixture | C | — |
| T-V1-52 | removal (item 110 (b)): on each B-EDIT CITY seed, removing a generated viaduct leaves every district outside the changed-way set byte-identical; the viaduct stays absent after Regenerate (keep), after New random on each crossed district and after a Re-derive from S6; its freed strip is re-plotted | B-EDIT | C | — |
| T-V1-53 | deck plots (item 110 (d)): 0 deck plots typed by S9b; 0 hood pins on deck plots; every deck plot in exactly one district's allocation (its owner's), the population whole — a deck whose owner rule meets no district in the hinterland pseudo-district's; the owner's close-up draws them; the second fixture's mole with its mid-mole tower and the fort at its mouth drawn in the harbour district's close-up; a fallen deck's plots fated and the owner's chunk re-derived; on a walled, moated fixture with stone moat bridges, 0 deck plots on a gate's moat deck (§4.7), and a fixed moat bridge declared away from a gate offering its plots by item 246's rule to the district at its intramural end | fixture, B-CITY (harbour seeds) | C | — |
| T-V1-54 | the second known-city fixture at M5 (item 110 (e)): its skeleton re-run with stage 2 on — its declared quarters' fabrics laid (the terraced wards `stepped` with their walls, the precincts' `landmark` rings, the ravine's flanks), its drawn ways and walls held byte-identical, its hand-authored version's close-ups opened with every held entity kept; V12 owns the fixture's own golden | fixture | C / O | S2 |
| T-V1-55 | lifecycle round trip (V01 §2.7, V01 §3.18 (d)): on B-EDIT documents with stage 2 on — a terraced ward, an opened close-up with overrides, a standalone neighbourhood document and the sky fixture among them — every stored field of V01 §2.7 created by its producer, then saved, loaded, undone, redone, regenerated (Regenerate (keep), New random, Re-derive from S6) and migrated from the previous schema and table versions, each cell of its row exact: a load re-derives nothing (the model digest byte-identical); `District.terrace` and the walls persisted in their leaves, `terraceState` and `stepProfile` recomputed equal; every derived view of V01 §2.7's list recomputed and absent from the saved file, `SeamReport` rewritten with each run; a `fabric` row id no table holds read as `bent-cut` and reported (§7.5); the stage runs' `tablePins` resolving the cells the document was made with | B-EDIT, CI | C | — |
| T-V1-56 | edges (V01 §3.18): a fixture per row of V01 §3.18 (e), run under the default preset and both parity presets — (a) no input and one item: an empty town, a town of one district, a district with no portal, block, site or name, one eligible row, one candidate; (b) the caps: `pin.cap`, `landmark.maxRings`, `terrace.maxLevels`, quotas above what the candidates hold, §6's row-count fallback; (c) every toggle and preset of V01 §3.18 (c) on and off, each with its row's outcome; (d) degenerate geometry — zero-length, zero-area, self-touching, collinear and coincident faces, outlines, seams and marks — taken by the kernel's refusal and the step's failure class (V01 §3.18 (a)); (e) missing, empty or contradictory data: an absent row, band, kind factor or `fallback`, an absent `scope` field, a dossier change removing a fixed input's record. Each case meets its row's outcome and rung, reported in the generation report, with 0 crashes, hangs, invalid outputs, silent drops or whole-map retries | B-FUZZ, CI | C | — |
| T-V1-57 | rungs (V01 §3.18 (b)): B-CITY-lite at every rung from THORP to the METROPOLIS cap — at THORP, HAMLET and VILLAGE no stage-2 hook registered, 0 templates, typed blocks, places, hood pins or close-ups, and `hatched` drawing the village's records by V01 §5.1.1's rows; at TOWN 0 generated raised ways, 0 quarry-ossuary entrances and no sky unit run; at CITY and METROPOLIS stage 2 whole; at the METROPOLIS cap the district count S6's, V01 §6's METROPOLIS lines met and no stage-2 quota binding beyond its own rows; a village grown into the town ladder takes its fabrics and block contents from its first S7b and S10a; a standalone neighbourhood document at each `contextRung` reads that rung's rows | B-CITY-lite, fixture | C | — |
| T-V1-58 | item 111 and the map frame against stage 2 (V01 §3.18 (f)): on item 111's oasis fixture, the spring pool read as a `lake` body by the waterfront feature and the rows' `waterShare`; 0 template faces or S9b candidates on its grove and irrigated gardens; its wells counted as prior picks by the close-up (V01 §3.8.2 step 2); with a terraced ward beside the pool, 0 ward-edge walls on the pool's shore run and the contour streets ending at its setback; on a hillside seed whose terraced ward meets the map frame, 0 ward-edge walls on a `frame` run and the levelling stopping at the margin band | fixture (item 111's), B-CITY | C | — |
| T-V1-59 | Find over the town (item 120 (k)'s town clauses; V01 §5.4; takes T120-2 and T120-4's town clauses): on B-CITY-lite at TOWN, CITY and the METROPOLIS cap, a standalone neighbourhood document, V04's undercity fixture and V05's island fixture — (a) **areas** (T120-2's town clause): `findAreas` lists every district of each layer but the hinterland pseudo-district, each once (0 areas with both a district and a neighbourhood entry), every city-cut `QuarterNode` of two or more members and every `RegionGroup`, and nothing the document lacks; each area's shapes equal the union of its admitted districts' faces per layer (symmetric difference 0 at the lattice); each area chip's matches equal §11.2's gazetteer match listing by area at the view's effective key; under a player view an area the key withholds is never listed, counted, lifted or pinned; at every city-band stop from item 116's limit inward, an area drawn under the pin size carries its pin; (b) **gaps**: for each coverage unit (`walk`, `households`, `parish`, `district`), and a class with no coverage row, over 200 seeds per rung, `gapUnits`' unserved plots equal, plot by plot, those V12 §3.6's `servedShare` counts unserved under the host's key, and V01 §5.4 (3)'s one-pass evaluation equals the brute-force reading of each plot's `catchmentOf` with the members the key admits; a fixture whose only member in one district is concealed shows that district as a gap under the player view and not under the host's, and no parish cell outlines a withheld church; a several-class chip reads one unit as V01 §5.4 (3) states; an area, place or person chip yields no gap; (c) **over time** (T120-4's town clause): an edit removing a district's last member adds its gap in that commit and its undo removes it; an epoch that creates a district lists it with its gaps in that commit; a chip whose area an edit or epoch removes stays at count 0, dark, until removed or Clear; (d) **a view only**: the document hash, the log and the tiles byte-identical with Find and Show gaps on and off; (e) **cost**: `findAreas` and `gapUnits` within V01 §6's Find lines at the METROPOLIS cap. From M5, Find's milestone (§16's M5 row), on the services and on V09's app harness with V09's Find panel | B-CITY-lite, fixtures (V04's, V05's), app harness | C | — |
| T-V1-60 | the disaster's units and the outskirts' land (item 122; V01 §3.16): on B-CITY-lite at TOWN, CITY and the METROPOLIS cap and on a standalone neighbourhood document, with fixture calamities of every pattern — a fire under wind and under calm, a flood, an earthquake, a type no calamity row matches — and a preview: (a) **whole districts**: `disasterDistricts` returns districts of the ground's part 0 only, never the hinterland pseudo-district, max(k, matched) of them for V01 §3.16 (5)'s k; a fire's set connected over district adjacency, each unit after the first the frontier's farthest downwind of the seed (nearest under calm); a flood's grown from the water-fronting districts, lowest first; (b) **monotone**: at one seed and condition the set at a lower severity a prefix of the set at a higher, severity 0 to 1 in steps of 0.05; (c) **stable**: the same set in every week the overlay stands, in every view and export, at pool sizes 0 and 3, on the five engines, with Show crises toggled and across a save and a load; (d) **the targets**: a calamity naming a district's institution always strikes that district; a target an edit removed, or one in the hinterland, reported in the view telemetry and the pattern filling the share; under T-V9-66's canary player view a withheld target neither struck by name nor reported; (e) **`campLand`**: only `commons` faces, fallow `arable` and `strip_field` faces within `camp.reachM` of the built edge and the open verges of the arterials within that reach; 0 faces meeting a gate's passage or crossed by an under-deck strip, 0 on the sky or underground arenas; the same on a VILLAGE fixture; empty on a standalone neighbourhood document and on an island town with no land beyond its shore; (f) **a look only**: the model digest, the document hash and the log byte-identical with every service called and not; no call for an overlay in a week outside its weeks, and none with no condition and no preview; (g) V01 §3.18 (e)'s two crisis rows and (f)'s crisis combinations, each with its outcome and rung; (h) **cost**: V01 §6's crisis line at the METROPOLIS cap. From M5; clause (e) from M3b, with `campLand` (V01 §8.1) | B-CITY-lite, fixtures, CI | C | — |

**Parity against NG** (the reference that owns the close-up; run under the `NG` preset): T-V1-26 (draw style), T-V1-29 (open time per template, raster, per building, uploads),
T-V1-31 (block and pin counts per template by building count, bent-cut signature, courts, ring statistics), T-V1-32 (the
panel). Everything else is conformance (C) or an outcome NG cannot reach (seams, context, editing, persistence,
knowledge, the owner's file-g rules). **The NG parity sheet's roof construction:** from M6a the NG parity sheet keeps
`fakeGablePerWing`; at M6b the NG draw-style bars (T-V1-26) are re-measured on `roofscape` and the sheet switches to it
when they pass, else keeps `fakeGablePerWing`, reported (V02 §5.3 supplies `roofscape`; J-VI.17 H8); every other
`hatched` sheet's switch is V01 §5.1.2's.
=== END ===

=== REPLACE ### 8.1 Where it slots into §16 ===
### 8.1 Where it slots into §16

Stage 2 is **M5** (§16's M5 row; J122's order, INDEX §3): it starts after M4 and runs beside the village's V-M1 – V-M4
(V07), M6-E (V06) and the plan rung's P0, P1 and P3 (V03); M6 (V02) follows it, and M6-U (V04) follows it or runs beside
it with a second pair, V04's U3 distinctness and U4 undercity parent then waiting on W15 (V01 §8.2). Its price is
V01 §8.2's. Four small pieces land earlier because the base reads them or its goldens would otherwise shift twice:

* **M1** — the schema only: `Block.content` (always `ordinary`), `Block.overrides`, `HoodPlace`'s registry row (no
  producer yet), `DistrictContext` declared beside §2.5's `TypedBoundary` (II.5's readiness reads the boundary view),
  `Recipe.product` (`town`), the three concerns' ids and the `S8.seed` stage id reserved in the registry (append-only,
  §6.1, item 345); the way-naming context's features in S13a with the M1 grammar authored against them (V01 §3.7.2);
  `hood.constants`' one `settings` row shipped whole, every column at its V01 §3.14 default (a compiled row holds every
  cell, V11 §2.2), read before M3a by the naming context only. ≈ 0.5 pw inside M1's naming and schema lines.
* **M2b** — `Way.slopeP95` written by S9 for every way and the way-surface rule (V01 §3.7.3) with field pass 2, since
  `lit`'s and `ink`'s close-up bands draw surfaces at M2b; the hook points S7b and S10a declare (item 323; inert until
  M5 registers them); the base's `squares.quota` table, from which S7b (3) sizes its square claims (item 301). ≈ 0.25 pw
  inside M2b's content line.
* **M3a** — with item 110's base milestone and the second known-city fixture: `District.terrace` (item 211),
  `terraceState` (V01 §2.3), `stepProfile` (item 245) and the bent cut's `levelledUnits` / `terracedEdges` declaration
  (item 506), since the base's district-edge source reads them from M3a (item 302); `hood.templates`' `stepped` row
  shipped whole. The second fixture's terraced wards and precinct rings are authored by hand at M3a — no stage 2 exists
  yet — and T-V1-54 re-runs its skeleton with stage 2 on at M5. ≈ 0.25 pw inside the base's M3a item-110 line.
* **M3b** — `campLand` (V01 §3.16) with item 122's base parts, since §10.2's camp placement reads it from M3b; its one
  cell, `hood.constants`' `camp.reachM`, ships with the row at M1 and is not calibratable (no register entry), and
  clause (e) of T-V1-60 runs with it. ≈ 0.25 pw inside the base's M3b item-122 line.
* **M5** — everything else. **The M5 way-name shift, declared:** the naming context's features exist from M1, but at M5
  S9b's squares and S13a's places appear for the first time, so every way that now ends at a new square or passes a
  named place gains a `to` or `placeOnIt` feature and its name may change once; M5 writes the shift record for S13a with
  that cause (§13.3), beside the templates' and the typed squares' shift of the default-preset goldens (V01 §8.4 (6)).
  The parity presets create no places and shift nothing (T-V1-4). Retaining walls and stair or ramp intervals shift no
  name: a way's shape reads the unlevelled `slopeP95` (V01 §3.6 (3); T-V1-24).

**The register at every exit** (V12 §3.11; J-V1.97). Each milestone above exits with `plat calibrate register --check`
green over the cells it lands, their entries written from V12 §3.11's default line by `plat calibrate register
--defaults --milestone <id>` with the landing milestone's id (M1, M2b, M3a or M5; V12 §2.8) unless this volume's own line
in V02 §3.10.10's form names the column. The cells each lands: **M1** the `hood.constants` row, whole — the naming
context reads four of its columns (`name.curvedShare`, `name.bentDeg`, `name.landmarkM`, `name.tradeShare`;
V01 §3.7.2), the rest inert until their readers land, and every calibratable column takes its entry here; **M2b** the
`way.surface` rows (V01 §3.7.3) and the base table `squares.quota` (item 301; its entries' `owner` `base`, the base's
seat writing the table's source file — V12 §3.11's owner rule, J-V12.73); **M3a** `hood.templates`' `stepped` row,
whole — every calibratable column of `hood.templates` takes its entry here, the `select.*` weights W3 tunes at M5 and
`params.terraceSpacingM` (the cell `terraceState` reads with `hood.constants`' `terrace.siteShare`, landed at M1;
V01 §2.3) among them; **M5** every cell of the other `hood.*` tables (V11's registry row 62; V01 §8.3's list) and
`hood.templates`' other rows (rows only; their columns' entries written at M3a). This volume writes no register line of
its own: every calibratable `own` column takes the default line's one entry (`corpus` at M-CAL) — each `hood.constants`
key its own entry `cal.hood.constants.*.<key>` — and a `ref:…` cell passes the lint with none (V12 §3.11); the `NG`
preset's entries are code-read reference values or the switch's fixed on value and take none (V01 §3.15).

**Tuning before M5's exit.** The constants V01 §3.14 marks "calibrate at M5" or "measured at M5" are tuned by this
volume's bars inside the work items that land them: S7c's weights to T-V1-4's share (W3), the land factors to T-V1-12
(W16), the small-block weights and `yardPaved` on the NG pairs (W4), `land.smallShare` (S-V1-b), the terrace gain and
share to T-V1-50 (W18), the `NG` plaza reading `ng.plazaM2` on the NG pairs to T-V1-31's plaza share (W17;
V01 §8.4 (9)) and the hatch pitch to T-V1-26's census (W9; a style-sheet cell, §8.2). The landed value is the tuned one.
A tuning that moves a value an earlier milestone landed (a `hood.constants` column, landed at M1; a `hood.templates`
column, entered at M3a — `terraceSpacingM` and the `select.*` weights among them) appends a history row to its one entry
(`plat calibrate register --defaults --milestone M5`; V12 §3.11's *A value moved by its owning seat before its due*);
those bars stay this volume's acceptance bars (V01 §7), never register metrics.
=== END ===

=== REPLACE ### 8.2 M5's work items, dependencies and estimates (person-weeks, expert; PLAUSIBLE) ===
### 8.2 M5's work items, dependencies and estimates (person-weeks, expert; PLAUSIBLE)

| item | content | depends on | pw |
|---|---|---|---|
| S-V1-a spike (first week) | the ring and holed-band cutting on 1 000 real template faces from B-CITY walled districts, the contour series on 1 000 hillside and ravine faces of B-CITY's hilly and mountainous seeds, and B-FUZZ's template generator; bar: T-V1-9's fallback ≤ 10 %; on failure the ring inset widens to `1.5 × eLo` and the series cap drops to 4, re-measured, then the `landmark` one-ring form becomes `ring`'s first fallback | M0's bent cut, M4 | 0.75–1 |
| S-V1-b spike | the dispatch's land accounting against the population-whole guarantee on B-CITY-lite (T-V1-12), and λ's small-block share measured | M2b (S7b, S10a, S10b) | 0.5 |
| S-V1-c spike | `hatched` at the neighbourhood band: operations per wing and tile raster time at 450 and 750 buildings (T-V1-26, T-V1-29) | M2b's tile pyramid, M3b's families | 0.5 |
| W1 template machine | the four primitives, the template face, validation, F-TEMPLATE, the four NG rows (`TemplateFabric` over `FabricStrategy`) | S-V1-a | 3–4 |
| W2 context rows and features | six of the seven context rows (`park` is W17's); V01 §3.6's features (bank path, rear-plot water rule, stair-stepped ways, barrier edges) | W1 | 1.5–2 |
| W3 S7c and χ̃ | `DistrictContext`, the provisional character, eligibility, weights, the draw, the report; the calibration sweep for the 15–35 % share and T-V1-5's classifier | M2b's S12c, W1 | 1–1.5 |
| W4 S9b dispatch | quotas, squares with siting and types, greens, manors, phase 2, ring centres, void squares, the seam guard; the S10a, S10, S11 and S12b consequences; court greening; item 284's programme and capacity terms | S-V1-b | 2–2.5 |
| W5 local identities | the local-place step and `HoodPlace`, place labels and knowledge (the naming context and surfaces are M1's and M2b's) | W4 | 0.75–1 |
| W6 refine close-up | hood pins and rows, the chunk, staleness, overrides and re-match, `closeup` persistence, framing and vignette | M3a (instance events, dry run; volume 3's `basementDoor(b)` with the walk-out at a wall and its `stackAccessDoor(b, a)`, both built at M3a; volume 2's `PorchKindRow`s, M3a-V2), W4 | 1.5–2 |
| W7 replace workflow and tools | T8's `fabric`, T9 on blocks, T6's furniture stamp, T12's slider; the ghost and count badge for a fabric change; the close-up panel (volume 9 lays out the screens) | M3a, W1, W6 | 1.5–2 |
| W8 unit runs | the standalone neighbourhood document (`Recipe.hood`, S0–S2's one-district programme, the `star` row, the border, default cuts), T1's `product`; the sky unit's district partition and split on a fixture island (volume 5's `SkyStrategy` plugs in at M6-sky), its crossing-site spans and their bridges built after S8, `levelledGroundCm`'s dispatch on a sky key with its raster fallback — the island's terrain raster, nothing levelled before S10 (item 309's M5 part, built with item 580; volume 5 adds the island's datums at M6-sky) —, the rim walk's `plantRimWalk` with its two callers, and its runs after generation with each receiving district and a re-searched claim's district re-derived at the rim (V01 §3.10.3 (4), (6)) | W1, W3, W4 | 2–3 |
| W9 `hatched` at all four bands | roof law, hatch, lobed crowns, road surfaces and modes, stair-stepped ticks, pin symbols, the per-band order, night, states; its measurement render and B-ZOOM continuity | S-V1-c | 3–3.5 |
| W10 labels, exports, Find's areas and the disaster's units | the hood title, place labels, per-format content (V01 §5.3); Find's area targets and Show gaps' units (`findAreas`, `gapUnits`; V01 §5.4, item 120); the disaster look's units (`disasterSource`, `disasterDistricts`; V01 §3.16, item 122), reading V07's village units in the same shape | W5, W9, the base's item-122 parts (M3b) | 0.75–1.5 |
| W11 verification | every T-V1 test (V01 §7; T-V1-50 – T-V1-54 with W18; T-V1-55 – T-V1-58 the lifecycle, edge, rung and item-111 and frame suites of V01 §3.18; T-V1-59 Find's, at M5 (Find's milestone) on V09's app harness with V09's Find panel; T-V1-60 the crisis units' and the camps' land, its clause (e) from M3b; T-V1-29's one-time-wait clause, item 119), B-REF's NG template rows in `baselines.json` (research-side, numbers only; NG's plaza share of the neighbourhood's area per size tag among them, T-V1-31), the NG panel tooling (§13.6 (2)'s seeds and counts), goldens and shift records; the register entries of the cells M5 lands (`--defaults --milestone M5`, then `--check`; V01 §8.1) and the history rows of the M1 `hood.constants` and M3a `hood.templates` columns S-V1-b, W3, W16, W17 and W18 tune before M5's exit | all | 2–2.5 |
| W12 shade and siting reads | `DistrictContext.shade`, S7c's shade term, S9b's sun and siting factors, the strips shared with field pass 2, S9b's move after S10a (i) with its hook point, the pins' shade gain (items 102, 103) | W4, the base's item 102 and 103 work | 0.75–1 |
| W13 chains, links, ladder members | χ̃'s allocation-level `c`, `DistrictContext.chains` and `records`, S7c's chain term, the fixed SIZE and GUILD inputs, the panel's reader query and the title's QUARTER label (items 104, 105, 107, 108) | W3, W4, the base's item 105 and 108 work | 1–1.5 |
| W14 barrier-closure reads | the barrier seam typing (item 541), walled-stretch shares, intramural gardens excluded (item 106) | W2, the base's item 106 work | 0.25 |
| W15 item 109's surface parts | first the three services volume 4's M6-U reads — `fabricSignature`, `districtsAbove` and the opening pass, which read only committed records (V04 §8) — then the places, the ground access symbols, the undercity parent rule, `under`, the outline close-up with its hinterland rows and chunks, the catacomb source protection and the `blockLifted` notice | W5, W6, volume 4's underground tail at its milestone (the parts that read V04's records land with it; the outline close-up lands at M5 regardless) | 1.5–2 |
| W16 the template's land | S7c as S7b's hook, `templateLandM2`, the reconcile with template land, S8's land caps, the stress fixture | W3, S-V1-b | 0.5 |
| W17 emulation and legibility | the `NG` preset (V01 §3.15: the stage-2 switch and its edit — the Re-derive from S2 with its fates, T-V1-4's switch clause —, the eight `ng.*` rules and their switches, `pin.decayScope`'s entry, `ng.plazaM2` tuned to T-V1-31's plaza share), the `park` row, the outline by fabric (V01 §3.10.2), `hood.constants` in the settings form with its column table (V01 §3.14), the kind coverage table, the `WhyProvider`s and the `hood.fabric` participant (J-V1.51) | W1, W4, W8 | 1–1.5 |
| W18 item 110's neighbourhood parts | `terraceState` and `District.terrace` (landed with the base at M3a), the contour series and ravine flanks, `TemplateFabric`'s levelled units and terraced edges, held walls and the digest, the strip holes and arch crossings, the parts-per-reader table, raised-way land and the add and remove paths, deck-plot ownership in the close-up, the hatch by roof kind and the stack order with tier shadows, `way.stair`, `retaining` and `raised`, the precinct rings, the exports and item 448, the Terraces hillside, the panel's rows and three why providers; T-V1-50 – T-V1-54 | W1, W4, W6, W9, the base's item-110 work (M3a) | 1.75–2.5 |
| **M5 total** | | | **27.5–36.75** |

Items 119 and 120 add no line: Find's two pure services lie within W10's range and the one-time-wait clause of
T-V1-29 and T-V1-59 within W11's. Item 122's disaster units are W10's 0.25–0.5 pw of new work, T-V1-60 lies within
W11's range, and `campLand` is M3b's (V01 §8.1).

This is 13.5–18.75 pw above the base's hook-depth M5 line of 14–18: the seven context templates, S7c's selection with
the template land in the allocation, the dispatch at generation with its land accounting, local places, the sky and
standalone unit runs, the file-g reads W12–W15, the emulation preset W17, item 110's neighbourhood parts W18 and item
122's disaster units in W10. §16's
M5 row carries this price (item 474), and §16 computes the two totals once from every volume's lines (item 568); the M1,
M2b and M3a pieces of V01 §8.1 are absorbed by those milestones' lines, as §16's pricing rule allows for a refinement a
line already prices.
=== END ===

=== REPLACE ### 8.3 `@plat/hood`'s contents (§14, item 505) ===
### 8.3 `@plat/hood`'s contents (§14, item 505)

`TemplateFabric` (one `FabricStrategy` implementation reading `hood.templates`; the base's `BentCutFabric` stays the
`bent-cut` row's), the seed primitives, `FabricSelector` (S7c, S7b's hook) with `templateLandM2`, `BlockDispatcher`
(S9b, S10a's hook), the local-place step (an S13a registration with its opening pass for the underground tail),
`CloseupDeriver` (the refine derivation, the outline close-up and the ground access symbols), the unit runner
(`HoodUnit`: standalone and sky, the latter reading `SkyUnitInput`), the `DistrictContext` and `DistrictSignature`
builders (with `terraceState`, whose pure function lives in `@plat/model` beside them from M3a), `TemplateFabric`'s
`levelledUnits` and `terracedEdges` (item 506), the services `catchmentOf`, `districtsAbove`, `fabricSignature`,
`skyDistrictCount`, `findAreas`, `gapUnits`, `disasterSource` with `disasterDistricts`, and `campLand`, and the writer
`plantRimWalk` (V01 §3.16, V01 §5.4), the symbol key `accessSymbolKind` (V01 §3.8.8), the
`WhyProvider`s (V01 §4.5), the `hood.fabric` epoch participant (V01 §3.3.6); the tables `hood.templates`,
`hood.dispatch`, `hood.squares`, `hood.pins`, `hood.kinds`, `hood.placeKnowledge`, `hood.defaultCuts` and
`hood.constants` — one `settings` row in V11's settings form, holding the `NG` preset's entries (V01 §3.14, V01 §3.15) — in
`@plat/tables`, where the base's `squares.quota` also lives (item 301); and the `hatched` sheet's stage-2 programs, in
`@plat/render` as every family's programs are. `hood` depends on `layout` and `plots` only through their interfaces
(§14's dependency rule), which item 505 extends with `DistrictContext`, the hook registrations and the services.
=== END ===

=== REPLACE ## 9 Decisions ===
## 9 Decisions

Each is vetoable; "chose X over Y because Z". A decision another one changes carries one mark, *superseded by* or
*amended by* that decision, which holds the reason.

| id | decision |
|---|---|
| J-V1.1 | Chose to compute a **provisional character χ̃** by §4.5 (2)'s own function over S7b's allocation rows (size 1) over reading the placed character (it exists only after S12c, after the layout it should choose) or a separate "intended character" input, because the allocation is eager and complete before S8, the function is the one item 72 defines (no second meaning of "character", J-A72.41), and T-V1-2 checks it tracks the placed vector (V01 §3.2). |
| J-V1.2 | Chose to **select each district's fabric at generation** (S7c) from its context and χ̃, on in the default preset and off in the parity presets, over templates only on request, because "the city composed of neighbourhoods" and IMPROVEMENTS S4 ask for templates chosen by context, S4's bars need them by default, and item 23's rule (defaults emulate where the reference has the behaviour; our extensions ride on top as weights) keeps the `MFCG` and `FTG` presets exact (V01 §3.3; V01 §11). |
| J-V1.3 | Chose to **derive the request's mode** (refine when the strategy equals the committed fabric, replace otherwise, unit when nothing is laid) over passing it, because a passed mode could contradict the model and the three cases are fully determined by it; and to drop `reason` from the request, since it is `SkyIsland.reason` (V01 §2.4). |
| J-V1.4 | Chose S7c's default weights so that 15–35 % of a CITY's districts take a template, organic the rest, over NG's standalone odds (≈ 42 % non-`area`) in a town, because realism (the tiebreaker) makes organic fabric the medieval norm with named morphologies the exception, and legibility gains most from a few distinct quarters; NG's odds stay the standalone `auto` (V01 §3.3.3, V01 §3.3.5). |
| J-V1.5 | Chose to **align a carved plaza with the template face's grain** (its OBB major axis) over NG 1.2.2's random rotation, because a square aligned with its streets is the faithful form and legibility gains; the coin between a rectangle and a round plaza stays NG's (V01 §3.4.5). |
| J-V1.6 | Chose **`carved` as the `square` row's default** over J-S42's `void`, because J-S42's premise — "NG's own square is the void its unbuilt plots leave" — rests on a 1.1.0 devlog image, while NG 1.2.2's code (the build every recording and the D-5 panel use) carves a rectangular or round plaza with a through street (`code-neighbourhood.md` §2.1, CONFIRMED); emulation-first makes the reference's behaviour the default and the panel must compare like with like; `void` stays the row's other mode (items 542, 498). |
| J-V1.7 | Chose to **run the block dispatch for every fabric at generation** (S9b), the base's bent cut included, over dispatching only template districts or only inside a close-up, because typed squares, greens and manor blocks are content (they change capacity and must be in the model, eager, the laziness contract), S4 (d) is a town-wide bar, and a refine close-up may not change geometry (V01 §3.5). *Amended by J-V1.40.* |
| J-V1.8 | Chose **typed squares by a per-1 000-inhabitants quota, sited at main junctions and before landmarks**, over NG 1.2.2's rule that every small block is empty, because S4 (c) and (d) set exactly that, a square where town logic puts it is the realistic reading (NG-GQ-7), and the small-block emptiness survives as phase 2's yard and green weights (V01 §3.5.3, V01 §3.5.6) and as the `NG` preset's rule (V01 §3.15, J-V1.98). |
| J-V1.9 | Chose **fixed default cuts** for a standalone neighbourhood document's `FieldBands` over §4.5's land-share cuts, because it has no town whose shares could set them and land-share cuts would force every such document to span every band, so a "rich neighbourhood" could not be rich (V01 §3.10.1). |
| J-V1.10 | Chose the **largest L1 face as the template face** over laying the template across the whole district, because a district's faces are separated by arterials and district-scale secondaries a template must not cross (§4.6 step 10's rule against crossing district structure), and NG's neighbourhood is one outline (V01 §3.4.1). |
| J-V1.11 | Chose **whole rings only** (the series ends at the first ring that does not fit) over NG 1.2.2's rings clipped by the outline, because a broken ring is the truncation NG-GQ-5 names as a weakness and a ring fitted to its boundary reads as planned (V01 §3.4.4). |
| J-V1.12 | Kept II.3's **hood pins as derived presentation** over model entities, because several hundred per district would bloat the model and the digest for picture-level detail, and the base's model pins already carry every pin a rule or a reader needs; edits persist as `instance` overrides (V01 §3.8). |
| J-V1.13 | Chose a model record **`HoodPlace`** with `local` knowledge by default for courts and yards over unnamed places or labels hung on blocks, because the owner's "local identities" and item 30's "known only locally" meet naturally in the places a neighbour would name, the knowledge filter needs a target with a `knownTo`, and names must be model data (§9.1) (V01 §3.7.1). |
| J-V1.14 | Chose to **condition way names on a derived naming context at S13a, from M1**, over naming ways again when a close-up opens, because names are eager model data (§4.10); the features land with the M1 grammar, and the places they read are created before the ways are named (V01 §3.7.1); the one M5 shift the new squares and places cause is declared (V01 §8.1). |
| J-V1.15 | Chose to **derive way surfaces at S10a's end** from the fronting blocks' pass-2 band over setting them when a way is created, because a way is created (S4, S5, S8) before the field that should set it exists, and pass 2 is the first reading every block shares (V01 §3.7.3). |
| J-V1.16 | Chose the **unit run** (II.1 (5), II.6) and gave the standalone neighbourhood document a **virtual host town's programme** carved to one district over a roster run at the document's own population, because a town-scale roster for 3 000 people would build a small town's institutions (a town hall, walls) into one neighbourhood, while a district's share of a host town's demand is what a neighbourhood holds (V01 §3.10.1). |
| J-V1.17 | Chose to **partition a multi-district island by the bent cut at district scale** over S6's grower, because the grower claims coarse faces and an island's arena has one; the cut makes the island's streets its district seams at once (V01 §3.10.3). |
| J-V1.18 | Chose to key `fabric.select` on **the district's own lineage key with the reroll forced to 0** over the town root and S6's seed-order index, which edits renumber, so New random on a district keeps its fabric (II.4's "same kind, new seed") and no declared quarter, merge, split or renumbering Re-derive moves another district's draw (V01 §3.3.4, V01 §3.12). |
| J-V1.19 | Chose to type every end **S8** makes on a shared spine `baseLane` — at generation or in any fabric's re-derivation — and to keep `tJunction` for an end an **edit event** inserts itself, over typing a replace close-up's ends `tJunction`, because a replace close-up is S8 re-run, so its ends are S8's, and one kind per writer keeps the seam records' provenance exact (V01 §3.11, item 539). |
| J-V1.20 | Chose to give a standalone neighbourhood document's town root **creation index 1** over sharing the town's index 0, so the document and a town of one seed share no stream and a user comparing them sees two independent draws (V01 §2.8, item 340). |
| J-V1.21 | Chose **one new parameter on four existing tools** (T1 `product`, T6's furniture stamp, T8 `fabric`, T12's `pinGate`) over a stage-2 tool, because item 101's rule forbids a thirteenth tool and each is the tool whose layer the action belongs to (V01 §4.2). |
| J-V1.22 | Chose **manor blocks by a band share capped by the district's top-band households** over NG 1.2.2's count law (one per eight blocks, at random), because the class mix (item 71) and the allocation already say how many rich households live there, and a manor block must house one of them (V01 §3.5.5). |
| J-V1.23 | Chose **court-greening probabilities per band** over NG 1.2.2's complete-frontage-ring rule, as II.3 (item 58 (b)) ruled "ours has a target per band"; NG's 23–58 % is the calibration anchor (V01 §3.5.7). |
| J-V1.24 | Chose to re-derive the **district from S10a** when a block's content is edited over re-deriving the block alone, because the block's households must be re-homed within the district by S10a's distribution, and blocks whose allocation does not change re-derive byte-identically (V01 §4.1). |
| J-V1.25 | Chose a **bank path** for docks, riverbank and comfortable-or-richer waterfront districts without noxious water trades, else the **rear-plot water rule**, over one waterfront treatment everywhere, because working riverbanks kept their plots to the water while promenades and quays belong to harbour and richer quarters (V01 §3.6). |
| J-V1.26 | Chose to price **M5 at build depth** (V01 §8.2's total), over absorbing the additions in the base's 14–18, because the context templates, the selection with its land, the dispatch with its land accounting, local places, the unit runs, the file-g reads, the emulation preset and item 110's neighbourhood parts are new mechanisms §16's pricing rule says must be itemised (item 474). |
| J-V1.27 | Chose our own **lobed crown** (arcs on a jittered polygon, a lit cap) over NG 1.2.2's midpoint-bulging crown, because the clean room forbids transferring its construction and the look (lobed, two greens, a lit cap) is what the census and the panel judge (V01 §5.1.2). |
| J-V1.28 | Chose a **per-band order list for `hatched`** at the neighbourhood and building bands over the shared list, because NG's order (pins under houses, block trees above, greens first) differs from MFCG's and §8.2 already keys the order by band (V01 §5.1.3). |
| J-V1.29 | Chose the **hood title as view furniture** (model only in a district export and a standalone neighbourhood document) over a model label per district, because the district's name is already model data and a close-up is a view (II.4's persistence status) (V01 §5.2.1). |
| J-V1.30 | Kept II.4's **`closeup` event before the first close-up edit** and gave it one parameter (`pinGate`) over a free parameter map, because the only derived content is the hood pins and a typed record migrates exactly (V01 §2.5, V01 §3.8.6). |
| J-V1.31 | Chose **no new event kind** over a `setFabric` or a block-kind-setting event, because `setAttr` + `regenerate` already carries dry run, fates, undo and migration, and II.4 already names the replace close-up that way (V01 §4). |
| J-V1.32 | Chose a **per-district template street width** `w_tpl` in the `secondary` band over §4.6 step 9's length law for seed streets, because a template's streets are its planned frame (NG draws them at one width per map, COV-NG-N20) and lanes the bent cut adds keep the length law (V01 §3.4.2 (b)). |
| J-V1.33 | Chose to land the **naming context at M1 and the surface rule at M2b** over at M5, because names are in every golden from M1 and surfaces are drawn by the M2b close-up bands; the squares and places that first appear at M5 still shift some way names once, which V01 §8.1 declares. |
| J-V1.34 | Chose to let a template district's regeneration cost **its fabric's factor over §12.6's scoped law** (≤ 45 ms for a ring district of 450 buildings) over holding every district to 30 ms, because a ring's holed band cuts cost 2–3 × a plain cut (NG measured it) and the bar was set before templates existed; a `bent-cut` district keeps ≤ 30 ms, and the relaxation is declared for the owner's veto (D-18's rule; item 474). |
| J-V1.35 | Chose to make **the `district` and `neighbourhood` catchment units one unit — the district a close-up opens** (item 103 (f)'s "one apothecary per district"), over a finer neighbourhood partition inside districts, because the owner's words use the two interchangeably, V11's `CoverageSpec` already counts by district, and one partition makes the served share the same whoever counts it (V01 §3.16; T-V1-42). |
| J-V1.36 | Chose to fix a **standalone neighbourhood document's layers** — islands off, sewers off, undercity never, caverns and ruins by relief, at most one catacomb from its own cemetery ground, no epochs: such a document has no clock (no S4–S5 route), so `advance` and a skeleton's `history` bend (V06 §1.3, V06 §4.1; J-V6.102) — over leaving them to the town defaults, because the owner limited islands to cities and metropolises, such a document has no church count or growth programme to read, and an implementer must not guess (V01 §3.10.1 (7)). *Amended by J-V1.77.* |
| J-V1.37 | Chose **one ring growth factor per district** (NG 1.2.2's geometric law) over II.2's fresh factor per ring, because emulation-first makes the reference's law the default and the whole-rings rule already departs from NG where it must; II.2's sentence changes by item 543 (V01 §3.4.4). |
| J-V1.38 | Chose to run **S7c as S7b's hook between its greedy pass and its reconcile**, the draw made once on the greedy χ̃, the reconcile moving the households a template's land displaces, and S8 capping the plaza and the ring series at the land reserved — over S7c after S7b (land nobody planned) or before it (χ̃ needs the allocation) — because it is the only order in which the character chooses the layout and the population stays whole (V01 §3.3.7). |
| J-V1.39 | Chose to hold **the one square quota in a base table `squares.quota`**, read by S7b (3) for squares larger than a block and by S9b for the sub-block remainder, over putting it in the stage-2 `hood.dispatch` table, because S7b's claims are base behaviour from M2b and a stage-2 table must not drive a base stage; the quota stays one count (V01 §3.5.2; item 301). |
| J-V1.40 | Chose to run **S9b as S10a's hook after step (i) and before step (ii)**, over before S10a, so the dispatch sees the tanneries, middens, prisons and institutions (i) places and never types a manor or a green beside them, while (ii)–(iii) still read `Block.content`; a forecourt at generation is sited only against a reservation, a block-sized church taking S11's forecourt yard part (V01 §3.5.1, V01 §3.5.3). |
| J-V1.41 | Chose to add an **`NG` preset** reproducing Neighbourhood's own dispatch, manors, pins and plaza sizes, over comparing our extensions with the reference, because item 23 makes the reference's behaviour the default configuration and the D-5 panel must compare like with like; the default preset keeps our rules as declared extensions (V01 §3.15). *Superseded by J-V1.98.* |
| J-V1.42 | Chose to draw **a standalone neighbourhood document's outline by its fabric** (star, rounder star, a strip round the main street, a frame round the square) over the kind's weights, because Neighbourhood's outline belongs to its template (NG B1) and a main-street neighbourhood on a star is another morphology; context rows keep the kind's weights (V01 §3.10.1, V01 §3.10.2). |
| J-V1.43 | Chose to **divide the court and plot-yard pin gates by 5** (`pin.courtFactor`) and keep the square, yard-block and green gates, over the full gates everywhere, because Neighbourhood has 0–2 wells and 0–1 fountains per medium neighbourhood and the base asks for "charm, not zero", not saturation; T-V1-31 bars the density (V01 §3.8.2). |
| J-V1.44 | Chose to rename S9b's market square **`trading`** — a small open trading place with a market cross, no stalls, no market rank, never a market reservation — over deleting it, because a junction square where people trade is realistic while item 24 keeps the market count and separation for markets alone (V01 §3.5.3). |
| J-V1.45 | Chose the **outline close-up as a view action** (no event) that opens districts and the hinterland's faces inside an outline, chunked per hinterland face, over a unit run or a new district, because the ground already has a base and seeing an extramural cemetery or a quarry must not change the model; a `quarter` declaration stays the way to make a district (V01 §3.8.9). |
| J-V1.46 | Chose to make **a catacomb's source cemetery, its owning church's plot and its entrance plot fixed inputs** of every stage-2 re-derivation, while allowing an edit that targets them with the closed source named in one line (V04 §3.5.1 (8)), over forbidding such edits, because item 22's least disruption protects what the user did not touch and item 101 R2 forbids refusing what no lock or dossier fact protects; demolishing fates over a stagnant catacomb emit the `blockLifted` notice (V01 §3.5.12, V01 §3.9). |
| J-V1.47 | Chose a **world hatch pitch** (`hatch.pitchM`, calibrated so the census mean is 17–19) with a zoom-stable parity subset below 1.5 px, over a screen pitch, because the count per wing must not change with zoom (§8.2's census; NG's model-unit spacing) and the hatch must not re-scatter (V01 §5.1.2). |
| J-V1.48 | Chose to **split the open-time law** into model-and-display-list time (non-ring and ring laws) and first-tile raster, with METROPOLIS lines, over one law including raster, because NG's figures separate them and one law let a 750-building district take 60 % more than NG's non-ring maximum (V01 §6). |
| J-V1.49 | Chose to **consume volume 5's `SkyUnitInput`** — no S1, the rim strip untouched, the landings as gate-ranked portals, its field, kinds and fabric hint — over re-deriving the island, because V05 builds the island once and names this runner as its unit input's one caller (V01 §3.10.3). |
| J-V1.50 | Chose **bends, not refusals**, for every stage-2 dry run — the content edit re-homing its households, values clamped, a small outline scaled up — refusing only a dossier fact or a lock, because item 101 R2 is the owner's rule (V01 §4). |
| J-V1.51 | Chose to price **W17** (the `NG` preset, the park row, the outline by fabric, `hood.constants`, the why providers and the epoch participant) as its own work item beside W12–W16, over absorbing it, because the work is real and §16's rule itemises new mechanisms (V01 §8.2). |
| J-V1.52 | Chose **"why" providers that recompute from committed state**, flagging `drifted` when today's recomputation differs from the committed choice, over persisting S7c's and S9b's reports, because a stored report goes stale on the next edit while the recomputation is the same before and after a save, a load or an unrelated edit (V01 §4.5). |
| J-V1.53 | Chose to offer **through ring radials** as a vetoable fabric parameter (`ringRadials` 1), default staggered (NG's), over staggered only, because NG-GQ-1 asks for continuous radials as an option and the default must stay NG's (V01 §3.4.4). |
| J-V1.54 | Chose a **new hard seam type `marsh`** for deep-marsh closure arcs, over typing them `field` (soft) by J-P37's fallback, because a marsh that closes a wall circuit is a barrier no street crosses (item 106 (a); item 541). |
| J-V1.55 | Chose to key hood-pin draws with the **`STAGE_VIEW` stage component** over a creation-index offset, because it is §6.1's own marker for view-side draws and cannot collide with any stage's index space (V01 §3.8.2). |
| J-V1.56 | Chose a **distinct stage component `S8.seed`** for template seeds over giving seeds the first creation indices of the cell's S8 run, because it keeps the seeds' and the lanes' orders independent, so a lane added or removed never renumbers a seed (V01 §2.8; item 345). |
| J-V1.57 | Chose **`DistrictKind` values only** for a standalone neighbourhood document's kinds, with "great houses" and "slum" as wealth presets, over class-named kinds, because no district is zoned by class (J-P1, item 72 (d′)) and wealth is the field's (V01 §3.10.1). |
| J-V1.58 | Chose to read **shade** in S7c by the district's terrain-and-wall share only (islands are placed after S7b) and in S9b and the pins by the full share including the islands' strips, evaluated once per shade evaluation (V05 §3.19 (6)) at S9b's first read and shared with field pass 2 (on a sky arena every reader reads V05's `shadeSky`, J-V1.87), over waiting for pass 2, because the rich must seek the sun where the dispatch chooses and no strip may be computed twice (V01 §3.3.3, V01 §3.5.5). |
| J-V1.59 | Chose to let a **stretched incompatible chain raise the `street` row** and a chain's street take its trade's name, while S7c and S9b never name or assign a quarter, over a chain quarter by rule, because item 107 (e) revised item 104 (h) (3): a quarter only past item 72's threshold or by declaration (V01 §3.3.3, V01 §3.7.2). |
| J-V1.60 | Chose a **contour series** — streets on level lines one terrace apart (`2 × dBar + w_tpl`), level 0 at the pole — for the `stepped` row over one contour spine, because a terraced ward is a stack of contour streets a double plot row apart with stairs down the fall line, and one spine left the rest to the bent cut, which guarantees no second terrace street (V01 §3.4.3). |
| J-V1.61 | Chose **one producer for every generated wall line — the base's S10–S11 levelling, the ward-edge wall included** as its district-edge source (item 302) — over this volume raising the ward-edge wall at S8, because item 110 (a) homes the edge source inside S10 and S11's levelling, item 110 is base design built at M3a before this volume's M5 (the second fixture's terraced wards need edge walls then), and item 506 already routes the gate through the fabric; this volume supplies the state (`terraceState`) and `TemplateFabric`'s declaration, and the placement rule is item 302's (V01 §3.17.1 (4)). |
| J-V1.62 | Chose **`District.terrace` as a district field** over a `fabricParams` key, so a declared terracing survives a change of layout and the base's edge source and the elevated-road generator read it without reading the fabric (V01 §2.2; item 211). |
| J-V1.63 | Chose to **place every wall inside its producer's faces with a derived step profile** over a seam exception for walls, because the locality oracle then needs no new case and no re-derivation writes into a neighbour (V01 §3.11 (7); item 245). |
| J-V1.64 | Chose a **thalweg path and a series per flank** over one template face terraced on one flank, because a ravine town terraces both sides of its gully with a path down the floor; and **flank-encoded creation indices** (`f × 32 + (k + 16)`, \|k\| ≤ 15) over a single range k ∈ [−31, 31], because two flanks' streets share the template face's cell and must not share an index (V01 §3.4.3). |
| J-V1.65 | Chose the **under-deck strip as one hole crossed only through open spans** over treating each pier as a hole, because a row of small holes would drive the holed laws to thread lanes between piers, and streets pass under a viaduct only through its arches (V01 §3.17.3). |
| J-V1.66 | Chose **part-0 readings for every trade, frontage and portal rule** (V01 §2.3's table) over reading every part, because a river bridgehead gathers trade where the river is the barrier and a viaduct's approach does not; nothing fronts a deck. |
| J-V1.67 | Chose **the changed-way set** as the scope of a raised way's removal or addition over the crossed districts alone, because a cut route is re-routed by the base and the detour's districts change too; and gave the tombstone one reader, the base's generator (V01 §3.17.5). |
| J-V1.68 | Chose the **landward root's district** as the owner of a deck's plots over a deck pseudo-district, because a bridge's shops and houses belonged to the parish and ward of the bank they began from and a pseudo-district would add a kind with no layout; for a bridge, its **intramural end** over `Bridge.deck[0]` (kept as the tie-break), because the city side held its bridge while `deck[0]` is only the emitter's order (V01 §3.17.6). |
| J-V1.69 | Chose **one hatch rule per roof kind** (flat: parallel to the major axis, no ridge tapers; the faces of a pyramid, tent or skeleton: parallel to their eaves; cone and dome: rings) over hatching every roof as if pitched, because NG draws only pitched roofs so the rest needs our own rule, and a flat tier drawn with ridge tapers reads as a gable (V01 §5.1.2). |
| J-V1.70 | Chose **precinct rings that follow the precinct's outline**, up to two per district, over one circle at the circumradius, by the realism tiebreaker: real ring streets trace a close's or an arena's outline, and the second fixture asks for ring streets round precincts, plural (V01 §3.4.4). |
| J-V1.71 | Chose to **tilt a standalone neighbourhood document's ground on request** (T1's hillside edge, the Terraces card's default) over hiding the Terraces card on flat ground, because every card must be reachable and lay what it names (item 101 R2; V01 §3.10.1). |
| J-V1.72 | Chose to read **the stair-stepped threshold from the way-class crossing row's `rampMaxGrade`** (V11 `ways.crossing`) over a `stepped.minSlope` constant in `hood.constants`, because a lane is stair-stepped exactly when a ramp of its class could not climb it and one fact is stated once (item 23); the slope thresholds are related — a stair-stepped lane's grade and a wall crossing's stair or ramp read the same row, and II.7.6's `vaultSlope` is the base's vault source, which this volume neither draws nor reads (V01 §3.6 (3)). |
| J-V1.73 | Chose to run the `hatched` **hatch per roof facet** of the sheet's roof construction — `fakeGablePerWing`'s faces until stage 3 registers, volume 2's `roofscape` facets after, each sloped facet's lines parallel to its eave and clipped to the facet — over lines per wing across the whole footprint, because once the roofscape draws valleys, hips and stacked tiers a line crossing them paints over another facet; under `fakeGablePerWing` a gable or hip wing's faces split at its ridge, so NG's law and the census are unchanged, and the NG parity sheet keeps `fakeGablePerWing` until M6b's re-measure (V01 §5.1.2, V01 §7). |
| J-V1.74 | Chose to draw a **surface symbol only for an access on a ground face whose `ground.at` lies outside every footprint** over every ground access, because a building- or basement-hosted access lies under its roof at the neighbourhood band and volume 3's plan draws its head at the building band — one mark per access; a ladder, hatch or cellar stair opening in a yard draws its symbol, a neighbourhood or lifeline stair draws `stair`, and an arch vault's door is the vault's own drawing (V01 §3.8.8, V01 §5.1.2). |
| J-V1.75 | Chose an **entrance reserve** read from the eager `Entrance` records, sized by volume 2's porch rows (`composition.json`, shipped from M3a-V2) and repeated at an `external` basement's outside door (`basementDoor(b)`), at every `service` entrance and at the outside door volume 3 opens for an access hosted by a building with neither a basement nor `ground(b)` (`stackAccessDoor(b, a)`, J-V1.96), for the hood pins' clearance, over reading the lazy porch, stoop and outside basement stair, and over fallback sizes in `hood.constants` (a second copy of volume 2's facts), so a close-up stays a pure function of committed state whatever order the click derives it and the `wings` and plan rungs in, and a `table` edit of the porch rows re-derives the chunk through its digest; T-V1-26 measures what remains, with a doubled-depth fallback; each outside door's point is volume 3's one function of eager records, so the reserve and the plan agree on it and a walk-out's reserve stands at its real door, not the main side (V01 §3.8.2). |
| J-V1.76 | Chose to **select opening places by volume 4's record fields** — source `opening` with role `access`, or a catacomb system's `stair` — over the access kind, because `mouth` is also the kind of a sewer outfall, a culvert inlet, a quarry adit and a skylight, and a catacomb entrance is a `stair` (V01 §3.7.1). |
| J-V1.77 | Chose to fix a standalone neighbourhood document's layers **through the inputs volumes 4 and 5 read** — `recipe.layers.islands` off, `Features.sewers` false, the undercity `forbid`, the tail's below-TOWN set with the catacomb at TOWN's count (one) (V01 §3.10.1 (7)) — and to make **quarries, the generated vaults and the buried town none**, over V04's TOWN-and-above rows at `contextRung`, because no stage but S0 and V04's standalone line reads `Recipe.product`, and such a document has no host town whose building stone a quarry supplies, no growth history whose scar a buried town fills and no town bridges, streets or undercity whose vaults volume 4 generates; §0's promise (a cave or a ruin, at most one catacomb) holds. |
| J-V1.78 | Chose to make **`fabricSignature` return volume 12's town-side paired measures over a region** (the block-area median, the grid order R4, the grid axis) over a mapping from `DistrictSignature`'s components, because those components are not the measures (orthogonality is a junction-angle share, not R4; a bearing entropy is not an axis) and volumes 4 and 11 read the region under a ruin, not a district; the test and its margins stay V12's and V04's, cited (V01 §3.16). |
| J-V1.79 | Chose to leave **an epoch's clearing under a new raised strip to volume 6** (its ledger and `siting`), the `hood.fabric` participant only re-reading the committed plot set, over this volume's add path at the epoch, because one clearing and one re-housing channel keep the household ledger whole; an edit's added part keeps the add path (V01 §3.17.4, V01 §3.3.6 (3)). |
| J-V1.80 | Chose to report a sky unit run's landings in a **`SeamReport` field `landingsReached`**, with `portalsTotal` 0, over counting them as seam portals, because a sky seam is hard and portal-free (II.1 (5)) and volume 5 bars `portalsTotal` 0 while every landing must still be reached (V01 §3.11 (6); item 539 (e)). |
| J-V1.81 | Chose to plant the **rim walk** as one `esplanade` on the rim strip's face and one `street_trees` row along its inner setback line with no way — `Greenery.along.way` optional for that row — over laying a path way on the strip, because the strip is never cut (V05 §3.12) and a row of trees needs no carriageway (V01 §3.10.3; item 313 (c)). |
| J-V1.82 | Chose to state **no undercity-parent rule of this volume's own** and compute II.7.5 (2)'s through `districtsAbove(part, core)`'s first entry (ties by address), over the main plaza's projection, because one rule is stated once, in the base, and a plaza point and the chamber's largest share disagree on a core straddling two districts (V01 §3.16). |
| J-V1.83 | Chose to have **the outline close-up raise the `wings` rung** of every building inside the outline, centre-out from its centroid, as a district click does, over close-ups only, because a cemetery chapel, a mill or a farmstead opened by an outline must be composed by some rule (V01 §3.8.1, V01 §3.8.9). |
| J-V1.84 | Chose to lay **a ground landing's destination lane before the template seeds**, first in the district's S8 transaction, and rank its attach as a gate portal, over the seeds first, so no seed can pass the yard's attach side and leave the destination to a lane that no longer fits (V01 §3.4.2 (a); item 299). |
| J-V1.85 | Chose to type an **`enceinte` closure arc as a walled `wall` run**, which the wall-side feature and `wallShare` read like any walled stretch, and to read J-VI.3's other kinds by II.1's seam typing (item 541 (b)), over a list with an extra "escarpment" kind, because an earlier ring's curtain is a real wall with its intervallum or rear plots and J-VI.3's vocabulary is the one closure vocabulary (V01 §3.6 (7), V01 §3.11 (4)). |
| J-V1.86 | Chose to read **a `sky-*` district's S7c kind factor** from its ground counterpart (V05 §2.4) — `sky-island`'s as the kind of the ground district with the highest pass-1 mean value, ties by address — over factor 1 for every sky kind, so an island's template odds follow the institution it carries (V01 §3.3.3). |
| J-V1.87 | Chose to make **every shade reader on a sky arena read V05's `shadeSky`** (S7c's `shade` term through `DistrictContext.shade.meanShare`, S9b's manor sun factor, the hood pins' gate; `islandShare` a higher island's strip onto this island) and none read the ground's pass-1 mask, over letting island districts read the ground's mask under the island, because the ground's mask describes the ground's daylight, not an island's surface a hundred metres above it (V01 §2.3, V01 §3.5.5, V01 §3.8.2). |
| J-V1.88 | Chose to home **the sky district count as a pure service of this volume, `skyDistrictCount(plotLandM2, districtHa)`**, reading `hood.constants.sky.plotShare` (its default the base's dense-core share, V01 §3.14), called by the unit runner and by volume 5's unit input and coverage units, over each volume writing the formula with a literal share, because one count read in three places must have one formula and one table cell (V01 §3.10.3 (2), V01 §3.16). |
| J-V1.89 | Chose to have **the raised way's add path run as the epoch commit's operator** — removing the strip's plots as for an edit after volume 6's clearing, so its re-homing finds nobody to move — over a separate epoch-only removal path, because one operator keeps an edit and an epoch byte-identical on the plots and leaves the households to the one engine that re-houses at an epoch (V01 §3.17.4; V06 §3.19 (7)–(8)). |
| J-V1.90 | Chose to run the unit runner **after generation only where the whole island is laid anew** — `raiseIsland` (an epoch's, a late declaration's), New random on an island, a Re-derive from SKY or earlier — inside the calling commit with §6.3's carry-over, and to re-derive the faces a growing resize adds or a rim reshape moves by **each receiving district's scoped re-derivation from S8**, over giving the runner a scoped mode, because the runner partitions the whole island and would re-cut every district for one stretch of rim, while §7.3's district scope already carries the locality, fixed inputs and undo a local edit needs; the district count is therefore re-read only by a unit run; a resize dilates the whole rim, so every district bordering it receives faces. Chose also that the rim walk is one island-level pair, re-planted whole by `plantRimWalk` at every unit run and after any rim change, never by a district — over each receiving district re-planting "its stretch", which no district scope can write (the strip lies in no district), and over a separate rule for a shrink; a shrinking resize and a stretch moved inward give no face and re-derive no district; and that a re-searched institution claim re-derives the district that holds it from S8 with the island institution's use and building released from V01 §3.9's fixed inputs for that event alone — over keeping the fixed inputs whole, which would leave the new claim an empty hole and the institution on its old site, and over a unit run, which would re-cut every district (V01 §3.10.3 (6)). |
| J-V1.91 | Chose to lay each qualifying island crossing site's **span first, its two deck ends made bridge portals a seed or a lane must reach**, over routing an approach from each deck end to the nearest existing street by the lane rule, because before the seeds an island bank often holds no street to reach, while the portal machinery the landings already use (rank, anchors, F-TEMPLATE's lane rung) builds the street over the deck on both banks; the span's width is the mean of `w_tpl`'s range with no draw, so the bridge does not depend on which district's streams run first; and the span is **built after S8, before S9**, over building it with its furniture in the closing batch, because the island's deck plots (S10) and deck buildings (S11's `DeckContext`) read `deckCm`, `kind` and `piers`, and S8 is the first point at which the run knows which spans survive (V01 §3.10.3 (4)). |
| J-V1.92 | Chose to run a standalone neighbourhood document's **S7b (6)–(7) after its one-district allocation and take the void part from it**, P7's cap reading the document's own poorest-band households, over the town's order (the underground first, from the roster's demand) with the virtual host town's roster, because the document's demand is its capacity and the virtual town's poorest band would cap the void part at a whole town's share; taking the dwellers from the surface keeps the population exactly the capacity's, and the surface surplus it frees is where T8 re-seats anyone F6 cannot (V01 §3.10.1 step 6). |
| J-V1.93 | Chose to draw a surface access symbol **in §8.2's `states` form for its stored or derived state** — a sealed element reading `bricked`, a bar meaning `locked` — over a bar for a sealed element, because the base's one row serves the surface and the underground layer alike, so one access must read the same at both ends (V01 §3.8.8, V01 §5.1.2). |
| J-V1.94 | Chose to read **an `echo` or `none` island's relief class as `plain`** for `terraceState`, the drawn class only for `own`, over the ground's class, because an echo is a quarter of the ground's amplitude over a dome and asks for no terraces — an echo island over a mountain town would otherwise wall a nearly flat surface (V01 §3.17.7 (2)). |
| J-V1.95 | Chose to read **a sky island's one part as part 0** in the parts table and wherever this volume says "part 0", "raised" meaning a ground-arena part ≥ 1, over adding a sky column to the table or re-keying island ways to part 0, because an island carries no raised way (V05 §3.22 (3) (d)) and its part is minted from `nextSkyPart` ≥ 1 to keep its addresses apart from the ground's (J-V5.2), so every reader's island row is its part-0 row (V01 §2.3). |
| J-V1.96 | Chose to place a stack-hosted access's reserve rectangle **at volume 3's `stackAccessDoor(b, a)`** — a pure function of eager records in `@plat/plots` from M3a (V03 §3.7.2 (1)) — over this volume's own projection rule (the footprint side nearest `ground.at`), because one point stated twice diverged (stair 0 is a ground wing; the door is moved along its side), and the reserve stays a pure function of committed state in any order of click and rung (J-V1.75); T-V1-26's stack-door clause measures it from M5 on the eager records (0 hood pins within 0.3 m of the door; fallback the reserve's depth doubled). Chose also to add **whether each building has `ground(b)`** to the chunk's inputs digest (V01 §3.8.3), because a tier made solid or storeyed changes whether the rectangle exists while the footprint, the entrances and `basementDoor(b)` stay the same, and a digest that missed it would serve a stale chunk (T-V1-15's purity). |
| J-V1.97 | Chose to take **every calibratable `own` column of this volume's tables from V12 §3.11's default line** (`corpus` at M-CAL), and to treat the constants V01 §3.14 marks "calibrate at M5" or "measured at M5" as tunings this volume's bars make inside the work items that land them, before M5's exit — the landed value the tuned one, a later move a history row on its one entry — over writing this volume's own register lines in V02 §3.10.10's form with those bars (T-V1-4, T-V1-12, T-V1-26, T-V1-50, the NG pairs) registered as `BenchBarDef`s, because the bars already fail M5 when a tuning misses, so a `measure` entry due at M5 would record the same verdict a second time, and the corpus run at M-CAL is the only later measurement that can move these cells (V01 §8.1). *Fallback:* should V12's lint or the owner ask for an M5 `measure` status on them, this volume writes one line per family in V02 §3.10.10's form (method `measure` at M5, metric `bar.T-V1-<n>`, fallback "the default stays, reported"), restating the default entries in place by V12 §3.11's later-line rule, no value moving. |
| J-V1.98 | Chose to reproduce Neighbourhood's own dispatch, manors, pins and plaza sizes as a preset, because item 23 makes the reference's behaviour the default configuration and the D-5 panel must compare like with like, the default preset keeping our rules as declared extensions; and to state it as **`NG`, §7.6's zeroing parity preset** (item 584) — a cell resolves to its `presets.NG` entry, else as it resolves under `MFCG` — with its entries on `hood.constants` alone (the stage-2 switch `fabric.extensionWeight`, eight rule switches `ng.*` and `pin.decayScope`), over an `NG` column on every stage-2 table or a recipe profile outside §7.6, because the base under `NG` must be the base under `MFCG` (Neighbourhood's `area` fabric is MFCG's measured bent cut, II.2) so no base table should need an entry, NG's rules differ from ours as whole algorithms (a manor count, an empty-block rule, a pin site rule) that one switch per rule selects more plainly than value entries scattered over five tables, and a preset the compiler, the loader and the parity harness already resolve needs no second mechanism; chose also to name **the stage-2 switch** the steps read (`fabric.extensionWeight` > 0 for S9b, its programme land, the local-place step and the hood pins), over an unnamed "the step is `extension`", because a builder must find the cell that turns a step off under `MFCG` and on under `NG`; to split marked rows into **switch cells** (marked) and **geometry cells** (unmarked), over marking whole rows, because `MFCG`'s zeroing of a pin's size or a ring's portal gap would reach `NG` through the fallback, while no parity preset reads a geometry cell whose switch is off; that **no `NG` entry is a provisional number** — each a code-read reference value or the switch's fixed on value — and to hold the one metre reading `NG` needs, the plaza areas by size tag, as the default-column cell `ng.plazaM2` read wherever `ng.plazaByTag` is on, tuned by W17 to T-V1-31's scale-free plaza share under the default line's entry (J-V1.97), over an `own` entry `…@NG`, because the cell is one knob either way and the default line already binds it, and a scale-free share needs no unit-to-metre scale (J-A58.43's HOLD); that the pins keep their rows' `sizeM` under `NG`, over NG-sized pins, because no bar compares pin sizes and T-V1-26 already holds the draw style; and to take an in-town district's size tag from its allocated household count nearest a `size.*` chip (a building per household at NG's scale), because S8 lays the plaza before any building exists. |
| J-V1.99 | Chose to hold `hood.constants` as **one `settings` row in volume 11's settings form**, each V01 §3.14 key a column with its own `ColumnSpec` and register entry `cal.hood.constants.*.<key>`, keys unchanged, over rows of `{ key, value, unit, provenance, calibratable, extension }`, because V11's compiled cell takes its unit and `calibratable` from the column and V12 binds one entry per column, so the rows' units never reached the compiled cell and every constant shared one entry; chose also to state each column's type, unit, range, `calibratable` and marker in V01 §3.14's column table — the access-symbol sizes our own drawing sizes, not calibratable; the `ref:NG` code values, the work limit `terrace.maxLevels`, the budget `closeup.chunkKB`, NG's measured size chips and the switches not calibratable — and to leave the thresholds `terrace.siteShare` and `terrace.minGapShare` unmarked, over marking the share `extension`, because zeroing a threshold turns it on, while `asks` is inert under the parity presets through `terrace.askGain` 0 and volume 11's `terrace.enabled` off; to write the multi-ring's off value 1 as `landmark.maxRings`' `MFCG` and `FTG` entries, because §7.6's zeroing would give 0 rings; and to ship the row **whole at M1** (every column at its default), over growing its schema at M3a and M5, because a compiled row holds every cell (V11 §2.2) and a schema change is a major version, so the default line writes every calibratable column's entry at M1 (each holds a compiled cell, J-V12.73), the cells stay inert until their readers land, and a later tuning appends a history row (J-V1.97). |
| J-V1.100 | Chose to key the ground access symbols by a derived **symbol kind** — `accessSymbolKind(a)`: `catacomb` for a catacomb entrance, else the access's kind, `door` never passed (it draws no symbol) — and to hold `hood.constants`' `access.*M` column set equal to its values by T-V1-4's registry test, over moving the sizes to a row table keyed by kind with a `coversEnum` rule, because the sizes are twelve drawing constants read only by V01 §3.8.8 and V01 §5.1.2, the settings row already ships whole at M1 with every other `hood.constants` key (J-V1.99), and a second table would add a registry row, a schema and a register slice for no reader beyond this volume; and over sizing by `a.kind` alone, which would size a catacomb entrance as a plain stair and leave `access.catacombM` unread. |
| J-V1.101 | Chose to state the stage-2 switch's edit as V01 §2.7's **first-reader re-derivation from S2** (V01 §3.15, *The switch's edit*), with §6.3's carry-over retiring what stage 2 no longer makes and the underground tail re-deriving after the ground, over §7.6's slice invalidation, because the switch is read by S2's land estimate (`λ_b`, V01 §3.5.9), whose change moves every district's capacity and so every re-derivation downstream — slice invalidation would re-derive the same span with a scope no builder or oracle could name in advance — and because one named stage lets V04 §4.3's row and T-V4-74 (b) cite it; and chose to keep the held inputs (a declared `fabric` or `terrace`, a block's content set by hand, a place made by hand, the override rows) through the edit, over zeroing them with the switch, because the switch gates what stage 2 derives and the owner's everything-is-editable rule keeps what the author declared (§7.2). The opening place's lifetime (V01 §2.7, V01 §3.7.1) follows: it lives with its host while the local-place step runs. |
| J-V1.102 | Chose to give Find (item 120) the town's **area targets** as one target per district on every layer — the district a close-up opens being the neighbourhood (J-V1.35), so a district and a neighbourhood are never two chips for one area, the panel's word `neighbourhood` going to an undercity or underground district and a standalone neighbourhood document's — with the **city cut's quarters** of two or more districts and the **region groups**, over listing every node of §9.1's quarter tree, because the city cut is the base's definition of the town's quarters (§4.5) and the tree's other nodes would list one district many times under nested names; and to read **Show gaps' units through `catchmentOf`** (V01 §3.16), which reads V11 §2.3's `CoverageSpec` — the one count of served the siting solver, V12 §3.6's `servedShare` and the absorbed Coverage view read — a partition unit (`district`, `parish`, `settlement`) a gap when it holds no member, a per-plot unit (`walk`, `households`) as the residential plots whose catchment holds none, grouped by district (the plots V12 §3.6's `servedShare` counts), a class without a coverage row on the `district` unit and a several-class chip on its classes' common unit, else `district` — over a second, view-only unit definition or a way-graph walk of this volume's own, because one reading makes the gaps the panel draws the units the solver and the bars count, plot by plot (T-V1-42, T-V1-59 (b)); and to count only the members the view's key admits, with parish cells built from admitted churches, so a gap never hints at what the key withholds (item 120 (h); V01 §5.4). |
| J-V1.103 | Chose to read item 119 for stage 2 as V01 §6's lines kept as the targets, with the one-time waits stage 2 adds or lengthens — generation with stage 2, a standalone neighbourhood document's first map, a replace close-up, the stage-2 switch's edit, the sky unit run at generation and after it, a district or outline export — held to the ten-second comfort level at TOWN, CITY and METROPOLIS up to its cap and timed by T-V1-29, and every interactive line (opening a district and its first tiles, the surface marks, an edit's commit, a hood-pin edit, T8's preview, Find's lines) kept unchanged, over re-deriving any figure, because the targets of those waits lie within a few seconds at the cap and item 119 (d) forbids relaxing an interaction budget (V01 §6). |
| J-V1.104 | Chose to make **a disaster look's units whole districts** (item 122 (b): "whole neighborhoods"; the neighbourhood is the district a close-up opens, J-V1.35), taken as a prefix of one **strike order** — the calamity's matched targets first, then its pattern: a fire through district adjacency downwind from the first target or a seed weighted by inhabitants, a flood from the water-fronting districts lowest first on the terrain raster, an earthquake and every other kind scattered by keyed uniforms — the count the `disaster` row's share at the rung and severity, at least one while the share is above 0 and never fewer than the matched targets, over a per-building share or a fresh draw at each severity, because whole districts are what the owner asked for, a prefix makes the ruined set grow with severity and stay the same in every week, view and export, and the dossier's named place wins; to find **the overlay's calamity** among the committed `epoch` events' `CalamityRef`s by its week inside the overlay's weeks (the latest; ties by severity band, then id) and to read its pattern through V06 §2.4's calamity table (fire, flood, else scatter), over a new field on `ConditionOverlay` or a second table of calamity words, because item 122 adds nothing to the model (§2.7) and V06's table already types every calamity word the port carries; to state one unit shape, `DisasterUnit`, which V07 fills with its village units at THORP, HAMLET and VILLAGE, so one rule picks among districts and ends alike; and to report a target that names no unit in the view telemetry, the pattern filling the share, while a target the key withholds is skipped unreported, because a look must never point at what the viewer does not know (DR44's admission). The draws are view draws under §8.1's `crisis.place` tag, keyed by the condition's id (a preview's by its look kind), never a model stream (V01 §3.12). |
| J-V1.105 | Chose to give the camp looks **`campLand`** — the hinterland's `commons` faces and fallow fields within `camp.reachM` (600 m) of the built edge, and the open verges of the arterials within that reach of where they leave the town — as a pure function of the document, leaving a label's keep-out to §10.2 (d)'s placement at the band drawn, over a view-dependent list or a reach tied to `siegeStandoffM`, because the placement already keeps every look off the keep-outs per band, the outskirts are a fixed stretch of land whatever crisis stands, and the siege's standoff is another distance (the camps beyond bowshot) that §10.2 applies to `beyondWalls` itself; to leave out faces meeting a gate's passage or crossed by an under-deck strip, so a camp never blocks a gate or stands among piers; and to land it at M3b with item 122's base parts, over M5 with the disaster's units, because §10.2's camp placement reads it from M3b and it reads only records the base builds by M1. |
=== END ===

=== REPLACE ## 11 Owner questions ===
## 11 Owner questions

| question | decision |
|---|---|
| **Q-V1-1** — Should the default map change at M5 to show its neighbourhoods? | **Answered: yes (J122; `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`).** With stage 2 on, a default town's districts choose their layouts by what they hold and where they lie (about a quarter of a city's districts get a main street, a square, rings, a quayside, a wall-side street or a street round their church; the rest keep the organic lanes), and every district gets its squares, greens and manor blocks by its size and wealth; every default-preset town looks different from M4's, the change declared once as every golden shift is (V01 §8.1). The `MFCG` and `FTG` parity presets do not change, and the M5 panel re-offers their side-by-sides on the new default beside the NG panel, so the new look is rated. |

No other owner question arises: the file-g parts are the owner's rules (items 102–112, 119, 120 and 122, the catacomb and crypt rule of
item 109 (k) (2) among them), and every other choice is a vetoable decision (V01 §9).
=== END ===

=== REPLACE ## 12 CONFIRMED versus PLAUSIBLE ===
## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk):** the base's PART II whole and every base section this volume cites (among them §1, the
summary, §2.4–§2.9, §4.1–§4.12, §5.2, §6.1, §6.3, §7.1–§7.7, §8.1–§8.10, §9, §10.4, §11.1, §12, §13.5–§13.6, §14, §15,
§16), with files f and g as applied; `docs/DEFINITION.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md` whole; the
sections of volumes 2–12 this volume cites, as landed; the unit run as the retrovalidation proposed it
(`docs/retrovalidation/pipeline-content.md`). The base's gaps this volume fills were confirmed by search — no rule set
`Way.surface`, no generation path existed for a close-up with no base, and `DistrictContext`, `TypedBoundary` and
`FabricStrategyId` were used undeclared (now declared at §2.5, item 505). J-S42's premise is contradicted by the code
reading (`research/findings/code-neighbourhood.md` §2.1), the basis of J-V1.6. The NG mechanisms this volume emulates
(template seed geometry, the ring courses, the plaza coin, the main-street course, the small-block rule, manor spacing,
the pin decay, the hatch geometry, the random template odds, the layer order) are read and CONFIRMED in
`code-neighbourhood.md` §0, §2.0–§2.11 and §6, and the template's structure (seed geometry plus sub-areas for the bisector)
in `profile-neighbourhood.md` CA-2; NG's measured bands in `docs/confidence/ng.md` C8 and H1 (the size bands 71–96,
600–779 and 762–1 343 buildings; the reset and raster times); the NG weaknesses the context templates and local
identities answer in `docs/improvements/ng.md` (NG-GQ-5, -6, -7, NG-VC-1, -3, -5, -6, NG-LT-2, NG-UX-1). Clean room: no
reference identifier, grammar, word list, palette, table or asset is transferred; NG's numbers enter as mechanisms with
our own metric constants and provenance marks (§17.1). Items 119, 120 and 122 (with 122 (h)–(i)) were read at source
(`docs/AMENDMENTS-2026-09-28g.md`) with their routing (J130, J133, J135, J138), and the shapes this volume reads from
them — V11 §3.25.8's `perf.qualitySpend`, V09 §4.21.9's progress view, V10 §2.13's `FindAnswer`, §2.7's
`ConditionOverlay`, §4.11's `CalamityRef`, §10.2's crisis tables and *Crisis looks*, V06 §2.4's calamity table,
§2.3's `Terrain.wind` and §4.9's land use and rotation — as landed or as their round's repairs state them.

**PLAUSIBLE (reasoning; no engine exists), each with its measurement and pre-decided fallback:** every constant marked
`own` (V01 §3.14) and the column table's ranges — the land, manor-sun, court-pin and hatch-pitch constants, the `NG`
plaza areas, the access-symbol sizes, the terrace constants (`terrace.askGain`, `.siteShare`, `.minGapShare`,
`.maxLevels`, `.profileNoticeCm`, the series spacing), the raised-way constants (`raised.clearWidthM`,
`.squareDeg`), `landmark.maxRings`, `landmark.roundTol`, `hood.hillsidePct` and `camp.reachM`; every budget (V01 §6),
the split open-time laws, the METROPOLIS lines, the sky unit run's lines (volume 5's figures), `plantRimWalk`'s and the
switch edit's; Find's two lines (the area list's unions and the gaps' raster passes at the METROPOLIS cap) and the crisis services' and that every one-time wait of V01 §6 stays inside the ten-second comfort level at the cap (T-V1-29); the M5 estimate (V01 §8.2); that S7c's weights give 15–35 % templates and separable morphologies (T-V1-4,
T-V1-5); that χ̃ tracks the placed character and agrees over the greedy and the reconciled allocation (T-V1-2); that the
land estimate, the caps and the dispatch's land terms keep the population whole under every template class (T-V1-12's
stress fixture); that rings and the contour series fit real faces with ≤ 10 % fallback (S-V1-a, T-V1-9); that the lobed
crown and the per-facet hatch pass the NG panel and keep the census on the NG parity sheet, and that the M6b re-measure on
`roofscape` passes (else the sheet keeps `fakeGablePerWing`, reported; V01 §7); that the entrance reserve clears every
porch, stoop and tomb stair volumes 2 and 3 draw (T-V1-26; fallback the reserve's depth doubled); how often an island
crossing site qualifies or is left unbridged (T-V1-21) and the size of a standalone neighbourhood document's void part
(T-V1-20); that a growing resize reaches every island district and its new capacity, typed as surplus, reads well until
the island is next filled, and that a claim's district re-derived from S8 keeps every other fixed input where it stood
(T-V1-21); that `NG`'s fallback to `MFCG`'s resolution reproduces NG 1.2.2's base (T-V1-31's bent-cut signature rows),
that §13.5's NG baselines carry the plaza share per size tag (V01 §3.15 states the fallback) and that the household count
stands in fairly for NG's building count when an in-town district's size tag is chosen; that shipping `hood.constants`
whole at M1 moves no M1–M4 golden, its four naming columns, M3a's two terrace cells and M3b's `camp.reachM` (read only
while a crisis look stands) being the only `hood.*` cells read before M5 (T-V1-4); that a Re-derive from S2 on the switch's edit reproduces, under an unchanged value path, what the
stages after S2 made (T-V1-4's switch clause); that the disaster's three patterns read as a fire, a flood and an earthquake on B-CITY's
waterfront and windy seeds, and that `camp.reachM` holds the camp looks' ground without crossing the frame's margin
(T-V1-60); and that every bar of V01 §7 is met.
=== END ===
