# Integration of the design volumes V01–V12 (chief architect's seat)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — continued by opus standing in for the Fable seat volumes/_integrate after reconciliation round 4 (§8); covered by the whole-design retrovalidation (J84).

Lane `volumes/_integrate`, 2026-09-29. Inputs: `docs/volumes/V01`–`V12` as landed by their second-round revisions
(last LANDED 01:56), `docs/volumes/critique/*.md`, `docs/AMENDMENTS-2026-09-28g.md` (items 102–110), `docs/ARCHITECTURE.md`
(md5 01fea21f…, which already contains the bundled pass c + d + e: `amendments-c/closing LANDED` 16:13). Outputs: this
file, `docs/AMENDMENTS-2026-09-28f.md` (the base change requests, items from 200), and dated "Integration notes" sections
appended to each volume changed.

PROGRESS
- §1 Bundled owner rules (items 102–110, J98) — coverage by volume: done
- §2 Cross-volume coherence — censuses, decisions J-VI.1–J-VI.22, hand-off census H1–H35: done (by census; the whole-read pass is §8, open)
- §3 Base change requests — collection, deduplication, conflicts → file f (items 200–566): done
- §4 Clean-room scan: done
- §5 Volumes changed (Integration notes index): done
- §6 Owner questions carried: done
- §7 CONFIRMED versus PLAUSIBLE: done
- §8 The whole-read pass — continuation after reconciliation round 4 (censuses, J-VI.23–J-VI.30, file f items 581–582): done

## 1 The bundled owner rules — coverage by volume

Method: every part the brief's NEW OWNER RULES paragraph assigns to a volume was searched in that volume by its own
terms (script `tools/integrate/cov2.py`, counting hits only inside §1b–§5 and §7, the build-depth sections), and the
enclosing subsections were read where the count was low (V10's unwalled sides, V01's district supply term, V08's
`activeChains`, V11's `ruin` naming slice, V02's split sites, V05's three suns, V06's siting drift). **Result: every
assigned part is designed in its volume; nothing had to be written in by this lane.** The reason is procedural and
recorded: after the item-110 critique addenda (23:35–00:41) every volume ran a second-round revision (00:33–01:56)
that consumed its addendum, so the routes the 23:09–00:06 notes sent to `volumes/_integrate` (V01, V03, V05, V06, V07,
V09, V10, V11 and V12's item-110 parts) arrived already carried. File f (§3) cites g's items for the base mechanisms
and never copies them.

| g item | volume | assigned part | where it is designed (subsection, hits) |
|---|---|---|---|
| 102/J98 | V05 | island underside profile | §3.9(5) §5.3(4) §1b(2) §3.10(2) |
| 102/J98 | V05 | shade strip | §7(22) §3.19(21) §2.3a(10) §1b(7) |
| 102/J98 | V05 | three suns | §7(5) §5.3(3) |
| 102 | V06 | shade drift | §3.4(20) §2.6(4) §4.5(3) §3.2(2) |
| 103 | V06 | siting drift | §3.9.8(2) §1b(1) §7(1) |
| 103 | V11 | signature pairs | §2.4(3) §3.3.4(1) §3.8(1) §4.2(1) |
| 103 | V11 | coverage rows | §3.5.1(4) §2.4(3) §2.3(2) §3.4(2) |
| 103 | V11 | families | §3.6.1(13) §3.13.2(12) §3.5.1(11) §3.4(9) |
| 104 | V11 | 17 archetypes | §3.13.2(2) §2.1(1) §3.1(1) §3.2.6(1) |
| 104 | V11 | keyword table | §3.13.2(3) §3.24.3(2) §2.10(1) §3.1(1) |
| 104 | V11 | category/tag deltas | §3.1(1) §3.4(1) §3.13.1(1) §3.13.2(1) |
| 104h | V11 | custom chain placement | §3.13.4(5) §2.5(1) §3.18(1) §3.20.1(1) |
| 104 | V08 | library definition fields | §2.6(8) §2.8(5) §3.11(2) §3.13(1) |
| 104 | V08 | custom chains arrival | §1b(2) §2.6(1) §2.8(1) §3.5(1) |
| 102/103 | V01 | V01 reads shade | §3.3.3(8) §2.2(4) §3.8.2(4) §4.5(3) |
| 103 | V01 | V01 reads siting | §7(5) §5.1(3) §2.2(2) §3.1(2) |
| 102 | V09 | shade map view | §2.7(3) §7.1(2) §1b(1) §4.15(1) |
| 103 | V09 | siting explanations UI | §1b(8) §7.1(3) §4.9(2) §4.11(2) |
| 103 | V10 | clerk why | §3.4(1) |
| 105 | V11 | goods table | §2.5(2) §3.7.1(2) §2.3(1) §2.10(1) |
| 105 | V11 | orientation rows | §3.23.4(2) §2.3(1) §2.5(1) §2.10(1) |
| 105h | V11 | split rows | §3.5.4(3) §4.2(3) §3.5.5(2) §2.3(1) |
| 107 | V11 | balance rows | §2.3(2) §3.7.3(2) §2.4(1) §2.8(1) |
| 108 | V11 | ladder step types | §3.12(81) §3.5.5(35) §3.11(23) §3.10(17) |
| 106 | V11 | wall rows | §2.7(2) §3.1(2) §3.16.2(2) §2.10(1) |
| 105 | V01 | street-scale closeness | §3.5.2(2) §3.5.7(2) §3.7.3(2) §3.5.6(1) |
| 105g | V01 | district supply term | §3.2(1) |
| 108 | V01 | quarter records own members | §4.5(7) §3.5.12(4) §7(4) §2.3(3) |
| 105h | V02 | works+shop buildings | §3.14.3(2) §3.2(1) |
| 106 | V05 | island rim barrier | §3.21(9) §7(3) §1b(1) §3.22(1) |
| 105 | V06 | links re-binding | §1b(3) §3.9.1(1) §3.9.5(1) §3.9.10(1) |
| 105h | V06 | splits over epochs | §3.9.10(10) §2.10(4) §3.9.2(2) §3.15.1(2) |
| 106 | V06 | later rings on barriers | §3.7.6(6) §3.7.1(2) §3.7.4(2) §1b(1) |
| 107 | V06 | coverage gaps reopen | §2.10(2) §3.9.6(2) §3.11.2(2) §2.2(1) |
| 108 | V06 | ladder steps over epochs | §1b(8) §3.17(6) §7(6) §2.10(5) |
| 106 | V07 | palisade barrier closure | §3.4(11) §2.2(2) §3.11(2) §5.1(2) |
| 105i | V08 | activeChains input | §1b(1) §2.6(1) §3.5(1) |
| 108 | V08 | ladder data, qualifiers | §3.5.1(13) §2.6a(6) §1b(4) §2.5(4) |
| 105j | V09 | link view/edits | §5.4(9) §4.7(4) §1b(3) §2.7(3) |
| 106g | V09 | wall snapping | §3.4(11) §3.8(6) §2.11(5) §7.1(4) |
| 105 | V10 | link explanations | §3.13(11) §2.13(7) §3.9(6) §3.4(5) |
| 106 | V10 | unwalled sides | §3.3(1) |
| 108 | V10 | record's members | §3.9(5) §2.13(3) §2.6(2) §2.10(2) |
| 109 | V04 | ruin ancient plan | §1b.1(1) §2.3(1) §3.5.0a(1) |
| 109 | V04 | ruin decay | §2.3(8) §3.5.0a(6) §1b.1(2) §3.10(2) |
| 109 | V04 | cavern boost, fissure | §3.5.2(8) §2.3(3) §3.5.0(3) §7(2) |
| 109 | V04 | ruin dwellings | §3.4(4) §7(4) §3.10(3) §1b.1(2) |
| 109 | V08 | dossier ruin/magic | §2.6(6) §2.6a(4) §2.5(1) §3.11(1) |
| 109 | V08 | dossier mining | §2.6(4) §1b(1) §2.6a(1) §7.1(1) |
| 109 | V11 | ancient-culture rows | §3.23(2) §3.18(1) §3.20.1(1) §3.23.4(1) |
| 109 | V11 | persistence order | §3.18(3) §3.23(2) §3.23.5(2) §2.8b(1) |
| 109 | V11 | ruin naming slice | §3.10(2) §2.8(1) §3.23(1) |
| 109 | V11 | cavern/ruin chance rows | §3.23.1(2) §3.23(1) §3.23.9(1) |
| 109 | V06 | ruins over epochs/excavation | §3.18.1(12) §1b(2) §2.10(2) §4.2(2) |
| 109 | V07 | voids under villages | §3.16(25) §1b(8) §5.1(6) §3.11(4) |
| 109 | V09 | draw/view ruins | §4.17.2(7) §1b(6) §4.17.1(5) §4.3(4) |
| 109 | V10 | ruin explanations | §2.13(7) §3.9a(7) §3.12(6) §1b.1(2) |
| 109-3b | V04 | overlap access | §3.5.7(12) §2.2(5) §7(5) §3.10(4) |
| 109k | V04 | catacomb rules | §2.2(2) §3.5.1(2) §7(2) §1b.1(1) |
| 109k | V06 | catacomb growth epochs | §3.18.2(2) §1b(1) §3.17(1) §3.18.3(1) |
| 109-3b | V06 | overlap access epochs | §1b(5) §3.18.1(5) §3.19.2(5) §3.2(4) |
| 109k | V11 | catacomb/dig rows | §3.23.7(3) §3.23.8(3) §2.8b(2) §3.1(1) |
| 109c | V11 | distinctness rows | §3.23.4(2) §3.23(1) §7.2(1) |
| 109k | V08 | dossier cathedral/churches/cemetery | §2.6a(9) §3.5.1(5) §2.6b(2) §7.1(2) |
| 110 | V01 | terraced wards | §3.17.1(13) §2.3(10) §7(10) §3.6(7) |
| 110 | V02 | stepped massing | §3.15.1(70) §2.6(58) §4.6(57) §7.7(42) |
| 110 | V02 | deck-plot buildings | §3.16(37) §2.6(22) §7.7(16) §4.6(9) |
| 110 | V03 | plans of tiers | §3.3(12) §1b(7) §2.4(7) §7(7) |
| 110 | V04 | vaults under raised ways | §3.5.0(8) §3.5.4(8) §7(7) §2.2(5) |
| 110 | V04 | ruins' stepped monuments | §3.5.0a(16) §2.3(5) §2.2(4) §3.6(4) |
| 110 | V06 | retaining walls over time | §3.19.4(8) §1b(6) §3.5.2(4) §2.10(2) |
| 110 | V06 | decks over time | §3.19.5(21) §1b(7) §3.8.2(6) §3.19(6) |
| 110 | V06 | raised ways over time | §3.19(22) §1b(15) §2.13(9) §7(8) |
| 110 | V09 | tools | §4.9(29) §4.20.2(29) §4.20.5(16) §1b(15) |
| 110 | V10 | clerk calls | §3.9(15) §7.1(14) §2.13(9) §3.3(9) |
| 110 | V11 | terrace/deck/tier/raised rows | §2.8c(21) §3.24.4(12) §3.1(11) §3.24.1(10) |
| 110 | V12 | second fixture bars | §2.12(3) §3.14.2(3) §7.1(2) §1b(1) |

Spot reads at build depth (CONFIRMED by reading): V05 T-V5-13 tests the underside's shadow under the fixed, path and
cursor suns with a hand-built island (J98); V10 §2's explanation records carry `closure` arcs with their barrier and
defensibility class (item 106 (g)) and the why-provider list names item 106 (g)'s unwalled sides; V01 §1b row for g
item 105 (g) reads S7b (1)'s district supply term into χ̃ (5) and never assigns a quarter; V02 §3.14.3 composes the
works and the shop of a split class from `Use.branchOf`; V11 §3.20 carries `naming.ruin` with its two corpora; V08
§2.6 traces `economicState.activeChains[]` into `economy.chains` and `chainStatus`; V06 §3.9.5 re-sites a revised
custom use and applies item 104 (h) (7) over epochs.

## 2 Cross-volume coherence

### 2.1 Method and what it found

The twelve volumes each ran two revision rounds; the **second rounds ran in parallel** (V08 landed 00:54, V05 00:57,
V07 00:59, V06 01:04, V03 01:11, V04 01:17, V09 01:21, V10 01:24, V01 01:28, V02 01:37, V11 01:43, V12 01:56). A hand-off
written by a later-landing volume to an earlier-landing one could not be seen, and several were not. This lane therefore
ran three checks: (1) a **hand-off census** — every cross-volume request in every volume's §10/§13 (V02 X1–X29, V03's
hand-offs, V04's, V05's items 1–17, V06 X1–X24, V07 FL-1–FL-3, V08 X1–X13, V09 XV-V9-1–16, V10 CVR-V10-1–14, V11
X-V11-1–13, V12 X-V12-1–14, V01's notes (1)–(15)) turned into a search of the target volume for the requested name or
rule (scripts `tools/integrate/hand.py` with `h-v02.txt` and `h-all.txt`), each zero-hit result then read in context;
(2) an **enumeration census** — every quoted literal union (`field: 'a'|'b'`) in the volumes and the base, grouped by
field name, and every field whose value set differs across volumes read in context (`enum-diff.txt`, 48 non-generic
names; most are different records sharing a field name); (3) the **base-change overlap census** of §3 (BCRs quoting the
same current text, and the item-110 record cluster). Every decision below is recorded as J-VI.n (vetoable) and applied in
the named volumes as a dated "Integration notes" section (§5 lists them); where a sentence in a volume would otherwise
contradict the decision, the sentence itself was also edited in place and the edit is listed in that volume's note.

### 2.2 Decisions

| id | subject (volumes) | decision | why |
|---|---|---|---|
| J-VI.1 | clean-room (V01, V07, V09) | four reference identifiers renamed or reworded in place (§4) | §17.1; RV-pc-2's rule that a coincidence of our name with a reference name of the same role is renamed |
| J-VI.2 | the raised way's reason (V01, V04, V06, V09, V10, V12) | the raised-way record (g item 110 (b), homed in §2.7 by the coherence pass; file f item 244) stores, for generated ways, `reason: RaisedReasonKey` (V06 §2.13, the single source); its `source` is derived at read, never stored — `declared` when the way's lifecycle cause is an edit or a skeleton file, else `generated`, with no `carried` value and no stored founding rung (amended by reconciliation round 1, seam-time-r0 ST-06; file f item 244); the **reason word** every reader, panel and export shows is derived from the key's kind — viaduct → `'drop'`, elevated road → `'link'`, aqueduct → `'water'` — and a reader that folds the source into the word (V01's `DistrictContext.raised`, V09's GeoJSON) shows `'declared'` for a declared way. V09's and V10's `'waterNeed'` becomes `'water'` | four volumes spelled the same fact three ways; g item 110 (f) asks for "its reason recorded (drop, link or water need)", which the key records and the word names; V01 and V12 already spell it `'water'` |
| J-VI.3 | barrier kinds of a closure arc (V05, V07, V09, V10, V11) | the barrier vocabulary of a closure arc is V10's: `'shore'\|'cliff'\|'gorge'\|'marsh'\|'sheer'\|'enceinte'` (`sheer` an island's rim, V05 §3.21; `enceinte` an earlier ring closing a later one, g item 106 (f)); V09's preview arcs (`PreviewResult.arcs.barrier`, BCR-V9-11) adopt it; V11's `walls.barriers` rows are defensibility classes keyed by these kinds, not a second vocabulary | V09's four-value list could not carry an island rim or a later ring, which V05 and V06 generate |
| J-VI.4 | **refusals versus bends** (V02, V05, V09, V10) | **Item 101 R2 governs every tool: a declaration is refused only where it contradicts a dossier fact or a lock** (§7.1's authoring-toolkit paragraph); every other infeasible declaration is **bent** to the nearest lawful one and the dry run names the bend in one line, the former offer becoming the bend or its first alternative. Withdrawn: V09's "added refusal class" (J-V9.67, V9 §4.9, §4.20.5 (4), T-V9-13's list), V05 §3.1 (3)–(4)'s and §4.2's refusals, V10's `rule`-category refusals of item 110. The bends, decided: (a) a fourth declared island joins the nearest open island as a district on it ("At most three islands float here; this quarter joins {island}"), and an `islands.count` below the forced count is raised to it; (b) a sky access of a kind the circumstances do not admit takes the nearest admitted kind in V5 §3.10's order, and a foot a deck or raised-way pier blocks moves to the nearest admissible foot by V5 §3.22 (3), each line naming the kinds or the obstacle; (c) deleting an island's last access moves it to the next admissible site ("An island keeps one way up; moved to {site}"), with "Place a different access" as the alternative; (d) a T4 `raised` stroke ending on a rim becomes `placeSkyAccess` with the stroke's ends as top and foot and the admitted kind (V05's offer, now the bend; "Draw a road to its foot" the alternative); an aqueduct stroke ending on a rim ends at its last ground vertex outside the island's footprint ("An island's water is its own; the aqueduct ends here"); (e) a `raised` stroke wholly on an island's key drops `raised` and is drawn as the island's own way; an aqueduct stroke there becomes a fountain pin at its end; (f) a raised course that would cut an access's column or rope line, where `skyAccessObstacles` offers no re-route, ends at the last ground vertex before it ("this would cut {island}'s hoist; it ends here"); (g) a retaining wall or terrace on or along a rim moves inward past the rim walk ("The rim walk stays level; the wall stands inside it"); (h) an uphill aqueduct with no source above its terminal within reach becomes a well at the terminal (V09's J-V9.75 action, now the bend); (i) the five stack refusals become V02's bends (V2 §1b's bend ids, V2 §4.6). Message keys `refuse.raised.island`, `refuse.aqueduct.island`, `refuse.raised.onIsland`, `refuse.aqueduct.uphill`, `refuse.retaining.rim` and `refuse.stack.*` are renamed `bend.*` with the same words; the clerk (V10) files them in the `bend` category | the owner's rule outranks every volume (brief: "THE OWNER'S RULES OUTRANK EVERYTHING"); V02's second revision had already ruled so for tiers (V2C-47) and V09 and V10 landed before it; V05 cited item 101 as having a "refusal-with-offer form", which it has only for dossier facts and locks |
| J-VI.5 | V02's second-revision tier contract (V02 → V03, V04, V06, V09, V10) | V02's second revision (landed 01:37, after V04, V06, V09 and V10) is adopted by them as V02 states it: `drawTiers` (ST1 on two streams), the pure `layTiers` with `TierInput` and its typed `TierFailure`, `massStepped`, `TierCells.heights`, the stair form `none` and `MassingRef.stack.grade`, the bends of V2 §1b, `rebaseStack`, the stack order under Works in `heightsAt`, and `vaultClamp` reading a chamber's ceiling. Consequences: V04's ruin stage calls `drawTiers` and `layTiers` alone with `TierCells.heights`, `plinthCm` 0, `parapetCm` 0, `scale` 1 on its ruin stream and handles a `TierFailure` by truncating the monument (X19, X29), and its `archVault` chamber record gives its soffit as the ceiling V02's `vaultClamp` reads; V06 runs `rebaseStack` on every epoch terrain change, builds a stack's Works in stack order and clears every building meeting a new raised way's supports or under-deck strip by V6 §3.19 (7), households displaced with cause `clearance` (X23; V2 §3.17 (b) as reconciled, S23-01; ST-08 withdrew the low-building exception — amended by reconciliation round 2, 2026-09-29, seam-time-r1 TR-24 with seam-stage2-3-r1 S23R1-13); V09's T9 tier controls gain the shape, skirt and solid chips, the shrine-inset handle, the centre and radius handles on a round or octagonal tier 0 and the `none` choice ("Sealed") on the stair chip (X21); V10's `tiers` form gains `stairs: 'none'` and the clerk reads the facts `massing/bend/<id>`, `stack.grade` and the derived aspect (X22) | single source: the tier contract is V02's; the siblings had quoted the pre-revision fold |
| J-VI.6 | the catacomb growth cap (V04, V06, V11) | `growthCapShare` is V11's **0.01 per year, compounded over the epoch's span** (V11 §3.23.8, J-V11.32; V06's X1 reads it so): an epoch's growth is at most `max(extent × ((1 + 0.01)^years − 1), growthFloorM2)`; V04's 0.1 per epoch and its formula (V4 §2.3 defaults table, §3.5.1 l. 1405, l. 1899, T-V4-52) are superseded; V04's defaults table cites V11 §3.23 for every row V11 owns (X-V11-4) | the value lives in V11's tables (the content volume owns the rows); at the default 52-week cadence both readings agree to 5 %, but over a long epoch V04's would let a catacomb grow ten times faster than the owner's "moderately" |
| J-VI.7 | the island crypt's wording (V02, V05) | V02's X20 reads "an island palace or temple may take a stepped row; its crypt is the rim-slab crypt vault under the building's lowest massing tier, inside underside tier 0 (the rim slab)" (C5-55; J-V5.66) | "tier 0" named two different things (the massing tier and the underside tier) |
| J-VI.8 | the bridge's mid-span landmark slot (V09, V11) | the cell is V11's `deck.landmarks` row `bridgeMid`, cell `minSpanM` (40 m, V11 §3.24.4); V09's `deck.landmarkMinSpanM` names that cell and is not a second constant | one value, two names |
| J-VI.9 | the aqueduct's terminal (V01, V04, V08, V11) | V01's recommendation (V1-3.17.8) is adopted: the terminal's outlet is a `conduit_house` where the roster (a standalone document) or the dossier (its `aqueduct_or_water_system` record, V11 §3.11's mapping; V08's `waterUse`) holds one, else a fountain `Pin`; V04's `terminal.kind` is `cistern` only under such a conduit house's yard, else `fountain` or `basin`; V11 §3.24.7 (1)'s criteria row is written only on a conduit house the roster or the dossier holds | no institution the dossier does not list may appear (item 20 (h)); the four volumes described the same outlet from four sides |
| J-VI.10 | owner-rule stamps (V11, V12) | V11 adopts X-V12-9: the `ownerRule` stamp (BCR-V12-5) on every cell of an owner-rule row — the raised-way rung gate (`ownerRule: '110 (b)'`), the catacomb TOWN gate, the cemetery-only sources, the cathedral's `always` crypt, the underground's any-tier existence — and the calibration minima 0.02 (chance) and 1 (cap) on the CITY and METROPOLIS `raisedWays` columns, binding calibration runs, fallbacks and corpus packs only (never a pin, a parity preset's zero or a user's edit); the compiler writes the stamped-clause list V12's register reads | V11 landed before V12 asked; the stamps are what keep a calibration from tuning an owner's rule away |
| J-VI.11 | V11's missing cells (V02, V09 → V11) | V11's `terrace` table gains `retainingReachM` 15 m, `flatDepthM` 12 m and `coverShare` 0.8 (XV-V9-13; V9 §4.20.1 (3)'s bend); V11's `building.wingRole` slice gains "the seating" and "a gate passage" (V02 X6, X27) | values stated by their requesters, own, calibrate-later |
| J-VI.12 | the history's forward path (V06, V09) | V06's "Change from here: make a copy at year N" is V09's **"Open a copy from here"** (a `forkAt`); the words are V09's | the application owns its labels |
| J-VI.13 | derivation-row numbers (V01, V05, V06, V08) | DR26 = V01's DR-V1.1; DR27 = V05's DR-SKY; DR28 = V06's DR-V6.1, which **is** V08's DR-V8.6 (one row: calamities as hazard events); DR29 = DR-V8.1 (latitude); DR30 = DR-V8.2; DR31 = DR-V8.3; DR32 = DR-V8.4; DR33 = DR-V8.5 (`activeChains` → the supply web, g item 105 (i)); DR34 = DR-V8.7 (the water system → the aqueduct); DR35 = DR-V8.8 (landmarks on high ground). The volumes keep their working names as aliases; file f item 383 carries the table | V05, V06 and V08 each asked the integrator; four volumes had proposed "DR26" |
| J-VI.14 | removals that hold (V05, V06, V08, V09, V10) | one mechanism: a `delete` of generated content that a re-adding generator would recreate writes a **suppression** keyed by that generator's key — a raised way's `RaisedReasonKey`, a harbour-mouth chain, a quay wall, a retaining wall and a deck plot (BCR-V6-24; file f item 260) — counted as filled against the generator's cap; islands and sky accesses hold by volume 5's record form (`SkyIsland.removed`, `.removedAccesses`) under the same lift rule, never in `detail.suppress` (ST-05 — amended by reconciliation round 2, 2026-09-29, TR-24); a cap increase opens only new keys; lifted only by the delete's undo or by the user re-adding what serves the same key (V08 X8, C5-51) | V05 and V06 had built the same idea twice under two names |
| J-VI.15 | the raised way's water link (V08) | V08's `waterUse` joins the raised-way record (file f item 244); V08's report notes `aqueduct_no_source` and `toll_bridge_dry` join §5.4's report vocabulary (file f item 337) | V08 X10 |
| J-VI.16 | the village's open hand-offs (V07 ← V04, V06, V11) | V07's FL-2 is closed by V04's second round (`blockedBy 'rung'`, `v.parish_church` counted (SR1-24), the maintenance mode, the ruin centre, the well pins, the `DigRule` rows — V04 §13); FL-3 is closed by V04's arch-vault source (the span rule's `land`/`chance` spans; country spans open where no vault stage registers), V06 §3.19's raised-way ledger (its lapse and repair only at a village rung, V6 X22), and the village cap of the specialisation rows is V07's `rules.tiers.capPerSettlement`, per settlement (V11 §3.24.3 has no rung column; SS-31, SR1-10, SR1-11 — amended by reconciliation round 3, 2026-09-29, seam-settlements-r2 SR2-09) | the owners landed their sides |
| J-VI.17 | hand-offs unmet at landing (all) | every zero-hit hand-off of the census (§2.3) is adopted by its target volume as the requester states it, by an Integration note citing the requester's section (single source: the rule is stated once, where it was written) | the parallel second rounds could not see each other |
| J-VI.18 | GeoJSON names for item 110 (V09, V12) | one text for both GeoJSON variants (file f item 447): every way `part`; a raised way `raisedKind`, `source`, `reason` (J-VI.2's words, absent when declared), `deckMinCm`, `deckMaxCm`; each support a Polygon of kind `raisedSupport` (`way`, `key`, `state`); each span a Polygon of kind `span` (`use`); a retaining wall a LineString of kind `retaining` per run of equal state along its chain (`wall`, `highSide`, `stepMinCm`, `stepMaxCm`, `material`, `state` absent when standing); `stair`/`ramp` flags on way segments; `onDeck` and `deck` on deck plots and buildings; `tiers` on a stepped building. V09's `raisedSupports` MultiPolygon and `retainingWall` kind were edited in place. Item 447's text governs where this summary differs (amended by reconciliation rounds 1–2, 2026-09-29: ST-33's span `state` and the way's `underuseSince`; TR-14's one retaining LineString per run of equal state) | BCR-V9-31 and BCR-V12-17 named the same entities twice; per-support polygons carry the per-support `state` volume 6 writes; `retaining` is the `drawWall` kind's own word |
| J-VI.19 | `showUnexcavated` (V04, V09) | a per-viewer view key (BCR-V9-20), never a `LayerSpec` field; V04 BCR-10's field is dropped and V04 reads the view key | V09's J-V9.38 and XV-V9-3; a knowledge-gated view is per viewer, and a layer spec is document state |
| J-VI.20 | a custom kind's class (V08, V11) | `PortRows.customKinds` carries no `fallbackClass`: a custom kind's class is item 104 (a)'s resolution (V11 §3.13); V08-29's read-time overlay stays (file f item 425) | V11's BCR-V11-26 and X-V11-1; two sources for one class would disagree |
| J-VI.21 | where the raised way lives (all) | a raised way is a `Way` on a ground arena part ≥ 1 with a `raised?: RaisedWayRecord` block (file f item 244), not a separate entity kind; its supports and spans are sub-records addressed under the way; a retaining wall is its own `RetainingWall` record (item 245); a deck plot is a `Plot` with a `deck?` block (item 246) | the volumes already address raised ways as ways (T4 `drawWay { raised }`, the router, the export's LineString, V01's `raised.way`); one entity kind keeps naming, routing, labels and exports on one path |
| J-VI.22 | milestone ids (V02, V04, V09, V12) | "M6" is volume 2's stage 3 (M6a–M6c), as §16's roadmap order (neighbourhoods M5, then buildings) and volume 12's sitting list read it; the underground layer's milestone is renamed **M6-U** (edited in place: 17 uses in V04, 2 in V09), beside M6-sky and M6-E | two volumes had each named their staged milestone "M6" |

*Note (reconciliation round 2, 2026-09-29; volumes/reconcile-BASE-F-r2, opus stand-in for the Fable seat, PENDING FABLE REVIEW).* J-VI.5's V06 consequence and H3 now read V02's X23 as reconciled — every building meeting a new raised way's supports or strip is cleared by V6 §3.19 (7), households displaced with cause `clearance` — the low-building exception under `raised.clearCm` having been withdrawn (ST-08; seam-time-r1 TR-24 and seam-stage2-3-r1 S23R1-13, one text for both); J-VI.14 lists the five suppression kinds of file f item 260 and returns islands and sky accesses to volume 5's record form (ST-05; TR-24); J-VI.18 defers to file f item 447 as amended (ST-33; TR-14).

*Note (reconciliation round 3, 2026-09-29; volumes/reconcile-BASE-F-r3, opus stand-in for the Fable seat, PENDING FABLE REVIEW).* J-VI.16 now reads `v.parish_church` among the counted churches (SR1-24) and the village cap of the specialisation rows as volume 7's `rules.tiers.capPerSettlement`, per settlement, since volume 11 §3.24.3 has no rung column and no `villageCap` (SS-31; SR1-10; SR1-11, whose `_integrate.md` half no integration round had applied; seam-settlements-r2 SR2-09).

*Continuation (2026-09-29, after reconciliation round 4):* decisions J-VI.23–J-VI.30 are in §8.4.

### 2.3 Hand-off census — the requests unmet at landing, and their disposition

Of 220-odd cross-volume requests, the census found the following **not carried** by their target (zero hits, each read
in context to exclude a different wording); every other request was found carried (the counts and patterns are in
`tools/integrate/h-v02.txt` and `h-all.txt`, run by `hand.py`). Each row below is applied as an Integration note in the
target volume (§5), citing the requester; the requester's text stays the single statement of the rule.

| # | from → to | request (requester's section) | disposition |
|---|---|---|---|
| H1 | V02 → V04 | ruin monuments: `drawTiers` + `layTiers` alone, `TierCells.heights`, zero plinth and parapet, scale 1, `TierFailure` handled; the chamber's soffit as `vaultClamp`'s ceiling (V02 X19, X29) | J-VI.5 |
| H2 | V02 → V04 | the dig draw's key carries the wing key of a wing the mutator adds; item 109 (k) (5)'s obstacle test reads V02's footprint and basement floor (V02 X12; V2 §3.9 W6, §3.14.5 (f)) | adopted (IN-V04) |
| H3 | V02 → V06 | `rebaseStack` on an epoch's terrain change; a stack's Works in stack order and solid wings by courses (BCR-V2-40); the raised way clearing every building meeting its supports or strip by V6 §3.19 (7), households displaced with cause `clearance` (V02 X23; V2 §3.17 (b); ST-08 — amended by reconciliation round 2, 2026-09-29, TR-24 with S23R1-13) | J-VI.5 |
| H4 | V02 → V09 | the tier controls of the second revision and the bend words; J-V9.67 withdrawn (V02 X21) | J-VI.4, J-VI.5 |
| H5 | V02 → V09 | the `FM` building look in the style panel; tool rows for `setComposition room`, the secondary porch and `moveTower { shape }`; the `fantasyShapes` control in the advanced panel (V02 X10; V2 §4.4–§4.5) | adopted (IN-V09) |
| H6 | V02 → V10 | the `tiers` fields incl. `stairs: 'none'`, the bends as bend lines, the facts `massing/bend/<id>`, `stack.grade`, the derived aspect (V02 X22) | J-VI.5 |
| H7 | V02 → V11 | `building.wingRole` gains "the seating", "a gate passage" (V02 X6, X27) | J-VI.11 |
| H8 | V02 → V01 | the NG draw-style bars re-measured on the `roofscape` construction at M6b (V02 X14; V2 §5.3) | adopted (IN-V01) |
| H9 | V05 → V02 | X20's wording (C5-55) | J-VI.7 |
| H10 | V03 → V02 | BCR-V2-33's external-access condition as V3C-82 words it; the pointer "volume 3 placing its door by its tomb-door rule (V03 §3.7.1)"; V2 §3.17 (a)'s walk-out sentence pointing at BCR-V3-27 (a); the `tiers` op's dry run listing volume 3's orphaned rooms (V03 §13, second round) | adopted (IN-V02) |
| H11 | V10 → V02 | a registry path `deck/landmarks/<head\|mid>` naming a deck's landmark plots (`DeckContext.landmark`); `massing/stack` readable with each tier's wing key in tier order (CVR-V10-8) | adopted (IN-V02) |
| H12 | V03 → V04 | `archVault` chambers record their grade faces (`gradeFaces`: the ring sides open to ground part 0); a building seated in one takes its frontage entrance on a grade face with `faces` `street`, `lane`, `alley` or `yard`, never `tunnel` (V03 §13, second round; V03 3.12 (9)) | adopted (IN-V04) |
| H13 | V05 → V04 | the arch vaults beneath a span a landfall ruins follow the span's state by V04's own rule (V05 §13 item 16; critique-V4 C4-110-2) | adopted (IN-V04) |
| H14 | V08 → V04 | the readers of `site.ruinEvidence`'s seven kinds in V4 §3.5.0a's order; DR-V8.3's relief and mining inputs; DR-V8.4's burial faces, rank and church count as V08 §2.6a states them (V08 X13) | adopted (IN-V04) |
| H15 | V09 → V04 | the reader's fact `under/wayIn` on a cavern or ruin cluster (the connection graph's path from the nearest surface access); the `why` path `catacomb` on a burial face with its candidate-pass reason; §8.2's access symbol by `cause.rule` (XV-V9-4) | adopted (IN-V04) |
| H16 | V10 → V04 | `catacombOutcome(doc, face)`, read-only; the `underground` section provider with V10 §3.9a's rows; arch-vault, stepped-monument, terminal-cistern and support-footing rows (CVR-V10-1, CVR-V10-10) | adopted (IN-V04) |
| H17 | V11 → V04 | `growthCapShare` per year, compounded; the defaults table cites V11 §3.23 (X-V11-4) | J-VI.6 |
| H18 | V10 → V03 | the `crypt` section provider over `Basement.crypt` with its `info.crypt.*` keys; a catalogue key per item-110 room cause in the `plan` section (CVR-V10-2, CVR-V10-9) | adopted (IN-V03) |
| H19 | V03 → V06 | stored plans re-matched by wing-relative storey when tiers are added or removed over epochs (BCR-V3-29); plans beside an epoch's levelling, retaining wall or raised way marked stale by BCR-V3-28's outside-ground digest | adopted (IN-V06) |
| H20 | V05 → V06 | `sky.clearance` at `afterGrowth`, order 50, `reclearIsland` among a participant's ops (BCR-V5-28); the course solver reads `skyAccessObstacles` (V5 §2.3b) (V05 §13 item 10) | adopted (IN-V06) |
| H21 | V12 → V06 | the pins read "off" as V11 §3.24.0's switch table: T-V6-65's "the `deck` budget 0, the terrace thresholds off" reads "every `deck.offer` 0, `terrace.enabled` false" (X-V12-11) | adopted (IN-V06) |
| H22 | V06 → V09 | "Change from here" | J-VI.12 |
| H23 | V04 → V09 | the span's `use` and the monument's count on T9 `shape` (V04 §13) | adopted (IN-V09) |
| H24 | V12 → V09 | the cell inspector reads `dist/evidence.json` (status in plain words, "the owner's rule" for a stamped cell); the preset dialog lists adopted historical packs as "historical (<era>, <region>)" only for documents of that era and region (X-V12-6); K2-4 reads "≥ 8 jetties outside the basin, deck buildings on ≥ 4"; the fixture inputs in `plat/tests/fixtures/known-city/K2/` (X-V12-8) | adopted (IN-V09) |
| H25 | V11 → V09 | `minSpanM` is V11's cell | J-VI.8 |
| H26 | V04 → V11 | the vaults slice's name "the ⟨way⟩ Arches" (V04 §13) | adopted (IN-V11) |
| H27 | V09 → V11 | `terrace.retainingReachM`, `flatDepthM`, `coverShare` (XV-V9-13) | J-VI.11 |
| H28 | V12 → V11 | owner-rule stamps and calibration minima (X-V12-9) | J-VI.10 |
| H29 | V05 → V12 | `accessSiting.deckGapM` and `lineClearM` listed in the register as V05's `IslandRule` cells (V05 §13 item 13) | adopted (IN-V12) |
| H30 | V08 → V07 | village births carrying `Toll bridge` read the `kinds` cell's `implies: 'bridge'` in the village site rule (V08 X7) | adopted (IN-V07) |
| H31 | V11 → V07 | the palisade's barrier arcs read `walls.barriers` (V11 §3.16.1) (X-V11-2) | adopted (IN-V07) |
| H32 | V09 → V07 | the palisade's "show circuit" reads BCR-V9-25's `LayerSpec.showCircuit` (XV-V9-9) | adopted (IN-V07) |
| H33 | V03 → V01 | V01's crypt sentence reads "a crypt is `Basement.crypt`, a basement fact (V03 §3.7.4, BCR-V3-20)" | edited in place (IN-V01) |
| H34 | V11 → V06 | an always-crypt target is V11's `crypt: 'always'` column, not a boolean (V06 l. 1625 read "`crypt: true`") | edited in place (IN-V06) |
| H35 | V07 FL-2, FL-3 | closed by the owners' second rounds | J-VI.16 (IN-V07) |

## 3 Base change requests — collection, deduplication, conflicts → file f

**Output:** `docs/AMENDMENTS-2026-09-28f.md`, items **200–566** (367 items under 73 base sections, in the design's section
order; 108 BASE, 259 STAGED), NOT applied — the coherence pass applies them after file g. Generator:
`tools/integrate/gen_f.py` (re-runnable; it reads the volumes' `## 10` sections, the section order of
`docs/ARCHITECTURE.md` and this lane's merge table).

**Collection.** 397 request records were parsed from the twelve `## 10` sections (V01 and V04 number theirs `BCR-n`; the
others `BCR-Vnn-n`); six are V11's amendment notes to its own earlier requests (read with them), two are withdrawn by
volume 9 (BCR-V9-4, BCR-V9-6), and five are not base changes (V04 BCR-34 and BCR-44, pointers carried by other requests;
BCR-V5-23 and BCR-V5-28, requests to volume 6; BCR-V11-9, a request to volume 8) — file f lists them under *Not items*.

**Deduplication and conflicts.** Two censuses: (1) every pair of requests whose quoted current text shares a 40-character
run (38 pairs in 30 groups, `bcr-overlaps.txt`), each read; (2) the item-110 record cluster (47 requests touching the
raised way, 8 the retaining wall, 7 the deck plots), read. Outcome: **one true duplicate** (the three public-opening kinds,
V01 BCR-37 = V04 BCR-29 → item 554); **three conflicts resolved** — the GeoJSON names of item 110 (BCR-V9-31 against
BCR-V12-17, J-VI.18 → item 447), `showUnexcavated`'s home (V04 BCR-10 against BCR-V9-20, J-VI.19 → item 413), the custom
kinds' fallback class (BCR-V8-29 against BCR-V11-26, J-VI.20 → item 425); **one absorption** (BCR-V7-18 into BCR-V6-1 →
item 317); **one merged text** (BCR-V10-12 = BCR-V9-16 (a) → item 348); **one superseded sentence** (V04 BCR-20's cistern
sentence by V04 BCR-45 → item 559); **the package list** (four requests on one §14 line → item 505); and **five
consolidated records** where file g homes a record several volumes extend — the raised-way record (item 244; J-VI.2,
J-VI.15, J-VI.21), the `RetainingWall` record (245), deck plots (246), the one suppression mechanism for removals that
hold (260; J-VI.14) and the raised ways' generation slot, stream, ledger and gate (290) — plus the derivation-row numbers
(383; J-VI.13) and the two report codes of volume 8 (337; J-VI.15). The other 25 overlap groups are complementary (two
requests adding different things to one sentence); each such item carries an application-order note.

**Rules on every item** (file f's preamble): item 101 R2 over any "refused" (J-VI.4); one vocabulary for the raised
way's reason and the barrier kinds (J-VI.2, J-VI.3); volume 11 owns values (J-VI.6, J-VI.8); milestone ids (J-VI.22).
**BASE or STAGED** is set per request from the requesting volume's own build plan (its §8's place in §16): V09, V11 and
V12 build inside the base's milestones except their underground and corpus parts; item 110's base parts are BASE at
M3a wherever a staged volume requested them (V01 BCR-39–44, BCR-V2-01/02/28/31–39/41/42, V04 BCR-45's record and span rule,
BCR-V6-20/24/25, BCR-V7-33–35, BCR-V8-31, BCR-V10's oracle and tool-API requests); everything else STAGED with its
volume's milestone.

## 4 Clean-room scan

**Method.** The volumes' own C1 check (`docs/validation/bench/doc_checks.py`) reads only the FTG protocol names
(`research/findings/ftg-payload-visual.md` §7.2), which RV-pc-2 (`docs/retrovalidation/pipeline-content.md`) showed blind
to MFCG, NG, VG, Dwellings and open-source identifiers. This lane therefore ran two wider scans over `docs/volumes/V*.md`
(scripts `tools/integrate/cleanroom2.py` and the inline census recorded in this lane's scratch): (1) every code-shaped
backticked token (an inner capital, a dotted path or an upper-case constant) of `research/findings/code-*.md` (including
`code-impact.md`), `os-*.md`, `profile-*.md` and `ftg-payload-visual.md` — 3 193 tokens — matched whole-word against
every line of every volume, with each match marked as present in the base or new; (2) every camel-case token of the
volumes that the base does not contain (2 363 tokens) intersected with every camel-case token anywhere in
`research/findings/*.md`; (3) RV-pc-2's own list (the district-builder and grower names, the edge and patch tests, the
hole check, the stop test, the inner-lot filter, front indentation, the cutter and field splitter, point allocation, line
intersection, the deflection field, the delta-river option, the land-component build, the outskirts filter, the
hole-aware bisector, the canal builder, the deck-selection idea, the hash map, the topology graph, shortest-path routing,
road tidying, the shape routine, the green routine) grepped by name in every volume — **0 hits**.

**Hits and dispositions (every hit read in context).**

| volume | token (as found) | where | reference of the same role? | disposition |
|---|---|---|---|---|
| V01 | a block-content type name identical to NG's content base class | §2, l. 371 and 447 | yes (NG's block content, `code-neighbourhood.md` §2.9) | **renamed `BlockKind`** in place (2 lines) |
| V07 | the request field named as VG's own field-demand multiplier | §1b W53, §2 l. 875 and 890, §3.9 l. 1619–1620, §9 J-V7.72 | yes (`code-village.md`, VG's request mapping) | **renamed `arableFactor`** in place (6 lines) |
| V07 | VG's running large-house counter used as a bare, undefined name | §3.8 l. 1501 | yes (`code-village.md`, VG's frontage rule) | **reworded** as our own definition: "`0.15 ÷ k`, where `k` is 3 plus the number of large houses already laid in this village" (the numbers stay — a constant may carry the provenance "read in the reference code readings"; a reference name may not) |
| V09 | a handle kind named as MFCG's exported tower-size field | §2, l. 499 | yes (`mfcg-devlogs-b.md`, the export's field) | **renamed `'towerResize'`** in place (1 line) |
| V07 | `household.minSize` | §2 l. 418, 468; §3.11 l. 1820–1821; §7 T-V7-2 | no — the open-source model's `minSize` counts patches; ours is a household's least mean size | allowed, reviewed once |
| V09 | `bend.room.minArea` | §5 l. 1463 | no — MFCG's cutter minimum; ours is a plan room's bend id | allowed, reviewed once |
| V03, V12 | `minWidth` (a room-table column; the `plot.minWidth` metric) | V03 §2 l. 554; V12 §3 l. 979 | no — VG's house width; ours are a room's and a plot's measured width | allowed, reviewed once |
| V03 | `circulationShare` | §2 l. 468 | no — its other occurrence is our own synthesis (`dwellings-synthesis.md`), not reference code | allowed |
| V01, V08, V09, V12 | `LineString`, `GeoJSON` | exports | no — the open GeoJSON standard | allowed |
| V01–V12 | `drawWall`, `drawGreen`, `setStyle`, `splitFace`, `Basement.access`, `Heights.floors`, `RoofSpec`, `moveTo` | many | base names (RV-pc-2's list of our own coinciding names, and the canvas path API) | allowed (the base's) |
| all | file names that tokenise as dotted identifiers (`*.md`, `events.log`, `seeds.json`, `index.html`) | citations | no | allowed |

**Result.** Four reference identifiers found and reworded in place (V01 ×2 lines, V07 ×7 lines, V09 ×1 line); every
other hit reviewed and allowed with its reason; each changed volume carries an Integration notes entry (§5).
**Recommendation carried into file f** (item in §3's list, citing RV-pc-2 (a)): the C1 corpus of `doc_checks.py` widens to
the code-shaped backticked identifiers of every reference reading, with allow rows for our coinciding names, so the
volumes' own checks stop reporting a blind 0.

## 5 Volumes changed — the Integration notes

Every changed volume ends with a section "Integration notes (volumes/_integrate, 2026-09-29)" (with the PENDING FABLE
REVIEW banner) listing what changed and why; in-place edits are named there. Backups of the volumes before this lane's
in-place edits: this session's `scratchpad/volumes/pre-integrate/` (and, for the three clean-room renames, `scratchpad/volumes/V01-…`,
`V07-…`, `V09-…`). Every in-place edit was made by an exact-match script that asserted the match count
(`tools/integrate/wsedit.py`).

| volume | notes | in-place edits |
|---|---|---|
| V01 | IN-V01-1 – IN-V01-7 | `BlockKind` (2 lines); the crypt sentence |
| V02 | IN-V02-1 – IN-V02-5 | §13 X20's wording |
| V03 | IN-V03-1 – IN-V03-3 | none |
| V04 | IN-V04-1 – IN-V04-12 | the catacomb growth cap (4 places); M6 → M6-U (17 uses) |
| V05 | IN-V05-1 – IN-V05-5 | every refusal of §3.1, §3.21, §3.22, §4.1, §4.2, J-V5.61, BCR-V5-10 and BCR-V5-29 turned into its bend (J-VI.4) |
| V06 | IN-V06-1 – IN-V06-7 | the always-crypt column |
| V07 | IN-V07-1 – IN-V07-5 | `arableFactor` (6 lines); the VG large-house probability |
| V08 | IN-V08-1 – IN-V08-4 | none |
| V09 | IN-V09-1 – IN-V09-12 | `'towerResize'`; the `refuse.*` keys of item 110 and the sky renamed `bend.*` (29); the barrier kinds; the reason words; the clerk entries; the stair chip; §4.9 and §4.20.5 (4) refusals withdrawn; T-V9-13; J-V9.67 withdrawn; GeoJSON names; M6-U |
| V10 | IN-V10-1 – IN-V10-4 | the reason words; `stairs: 'none'`; item 110's refusals as bends; the uphill aqueduct's well |
| V11 | IN-V11-1 – IN-V11-7 | none (additions stated in the notes) |
| V12 | IN-V12-1 – IN-V12-4 | BCR-V12-15's barrier kinds |

## 6 Owner questions carried

The volumes ask twenty-five questions; none is changed by integration, and none is answered here (they are the owner's by
rule). They group into three kinds.

**Product order (one roadmap, eight questions).** V01 Q-V1-1 (the default map changes at M5 — rec. yes), V03 Q1 (floor
plans on the base's buildings right after M4 — rec. yes), V04 Q1 (the underground as M6-U right after M5, beside it if a
second pair is free, its ruin-distinctness step and undercity parent then waiting on V01's W15 services — rec.; V04 §8, SLR1-05), V05 Q1 (the underground before the sky — rec.), V06 Q1 (the evolution engine right after M4 —
rec. (a)), V07 Q1 (the village right after M4, parallel with M5 — rec. (a)), V08 Q4 (the SettlementForge connection after
M-CAL — rec.), V10 Q4 (the built-in clerk as M3c beside M3b — rec.). **The recommendations are mutually consistent**
(checked by this lane): after M4, four lanes with no shared package can run side by side — M5 (stage 2), V-M (the village),
M6-E (evolution), and the plan rung's P0–P1 on base buildings; then M6 (stage 3 buildings) and M6-U (underground) after
M5; then M6-sky; then M-CAL (after M4, M5, M6 and V-M4); then M-SF. M3c runs beside M3b. The one dependency the owner
should see together: V05's answer presupposes V04's, and V08's presupposes V12's placement of M-CAL.

**Money, hosting and the owner's time (nine).** V04 Q2 (28.25–39.25 pw for the underground; updated by volumes/reconcile-V04-r2, 2026-09-29, J-V4.114), V08 Q1 (the module's web origin), V08 Q2 (plans,
save limits, backups), V09 Q1 (a private preview host), V09 Q2 (the first-five-minutes participants and any thank-you),
V10 Q1 (the user's own API key versus a relay), V10 Q5 (the clerk's live-evaluation spend, about US$790–1 190 through M3c),
V12 Q-V12-1 (one month of FTG's premium tier — rec. no), V12 Q-V12-2 (the owner's sittings).

**Capabilities across the SettlementForge boundary, product identity and defaults (eight).** V02 Q-V2-1 (SettlementForge prescribing a
building's shape — rec. not now), V08 Q3 (scene files inside SettlementForge's export bundle), V08 Q5 (a live party map —
rec. pictures now), V10 Q2 (SettlementForge's assistant or ours — rec. SettlementForge's), V10 Q3 (the model tier — rec.
keep the current model, evaluate the cheaper one before switching), V11 Q-V11-1 (the sensitive catalogue kinds — rec. keep,
concealed), V09 Q3 (the product's public name), V12 Q-V12-3 (historical layers as defaults — rec. only where the sitting
passes).

**Integration adds no owner question.** Every decision of §2 is within the delegated authority (vetoable J-VI.n); J-VI.4
applies an owner rule (item 101 R2) and changes no owner-facing capability.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** the coverage of every bundled owner-rule assignment by term counts inside the
build-depth sections, with spot reads (§1); the clean-room scans and the four renames, each re-grepped to zero (§4); the
hand-off census's zero-hit list, each read in context (§2.3); the enumeration census (§2.1); the request census — 397
records, 367 items, 108 BASE and 259 STAGED, every item carrying a label (counted by script after generation); the 30
overlap groups read; every in-place edit applied by an exact-match script that asserted its count; J-VI.4's edits in V05,
V09 and V10 applied by exact match; the old `refuse.*` keys of item 110 and the sky
layer renamed `bend.*` in V09 (29 mentions) and V05 (2), re-grepped to zero outside the
Integration notes (which name the old keys for the record).

**PLAUSIBLE (reasoned, not executed):** that the volumes are coherent beyond what the three censuses can see — a
semantic conflict that shares no quoted text, no field name and no requested name would pass them (settle: §8's pass);
that each request's BASE or STAGED label is right where it follows the rule of its volume's build plan rather than a
reading of the request (the consolidated items were read); that "needed by" is complete (it lists exact citations of a
request's id); that J-VI.4's chosen bends are the nearest lawful declarations (settle: each bend's dry run at M3a, T-V9-13
and T-V9-14's bars); that V05's test clauses and V09 §4.9's other rows read consistently after the in-place edits (they are
covered by IN-V05-1 and IN-V09-2's statements, not each re-edited).

## 8 The whole-read pass — continuation (2026-09-29, after reconciliation round 4)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate (continuation under its CONTINUE RULE); covered by the whole-design retrovalidation (J84).

*What the checkpoint left open.* At the 02:29 checkpoint this section was planned: the nine volume pairs of the brief
read through their §1b wiring tables and §2 records whole, J-VI.23 onward. The substitute for the whole read that the
checkpoint relied on (three censuses) is recorded in §7's PLAUSIBLE line.

### 8.1 What stands in for the whole read, and what it left

Between the checkpoint and this continuation the workflow's Reconcile phase ran: six **seam checks** per round, each
reading its volumes whole with this file and file f (rounds r0–r3, all LANDED; r4 STARTED 07:42 and cut with skeletons
only, so not an input here), and thirteen **reconcile lanes** per round applying their findings (rounds r1–r4, all
LANDED by 07:41). The nine pairs map onto the seams as follows.

| brief's pair | seam that read both volumes whole (r0–r3) |
|---|---|
| neighbourhoods–buildings; buildings–interiors | `stage2-3` (V01, V02, V03) |
| underground–neighbourhoods; sky–neighbourhoods | `layers` (V04, V05, V01) |
| evolution–everything | `time` (V06 with V01–V05, V07); `content-calibration` (V06 with V11, V12) |
| the application–the clerk | `surfaces` (V09, V10, V08) |
| content–everything | `content-calibration` (V11 with V12, V02, V06); `settlements` (V11 with V07, V08) |
| the village–the base; SettlementForge–content | `settlements` (V07, V08, V11, with the base sections they share) |

**Left unread together by any seam:** V06 with V08, V09, V10; V11 with V01, V03, V04, V05, V09, V10; V08 with V01–V06
and V12; V09 and V10 with V01–V07, V11 and V12; V12 with V01, V03–V05, V07–V10. This continuation checked those pairs,
and re-checked the whole set, by the censuses of §8.2 (J-VI.29), each hit read in context.

### 8.2 The censuses (scripts and outputs: this session's `scratchpad/volumes/integ/`)

| # | census | denominator | result |
|---|---|---|---|
| 1 | bundled-rule coverage, re-run (`tools/integrate/cov2.py`) | 77 assignments of the brief's NEW OWNER RULES paragraph | all 77 with hits in the build-depth sections; the same six low-count rows as at the checkpoint, spot-read then (§1) — **§1 holds on the volumes as reconciled** |
| 2 | cross-volume section citations (`seccite.py`) | 8 856 citations "V0n §x" / "volume n §x" in the volumes and file f | 4 unresolved, all false positives (an inline bold subsection of V11 §3.19, a base §10.2 citation, a base §16 row) |
| 3 | identifiers cited to another volume (`identcite.py`) | backticked code names on a line citing exactly one other volume, absent from it, the base, f and g: 464; 46 after dropping the citing volume's own names; 99 on the unread pairs | each read: **3 defects** — V07's misnamed deposits field (J-VI.25), V10's terrace stroke (J-VI.26), the raised way's two held measures the record lacked (J-VI.27); the rest the citing volume's own names |
| 4 | new edit-event kinds | 7 kinds beyond the base's 70 | each has a volume-9 tool row; volume 10 reaches the five it has no encoder row for through each tool's raw `events` array (V10 §4.1), checked by T-V10-1 — no change |
| 5 | dossier field paths | backticked dossier-namespace paths in V01–V07 and V09–V12, against volume 8 and the base's `DossierDigest` | **2 misnamed digest fields**: V07's `nearbyResources[]`, V11's `site.terrainType` (J-VI.25); the rest model data keys (`site.*` of S1) or raw SettlementForge keys volume 8 maps |
| 6 | volume-11 cells cited by other volumes | table-prefixed cells absent from V11: 76 | all namespaced keys of the citing volume's own registered tables (V01's `hood.constants`, V06's evolution constants, V07's rules, V02's composition constants) — no change; one real gap found beside it: the pier cells had no reader (J-VI.27) |
| 7 | the requests (file f) | 404 requests opening a bold heading in the twelve `## 10` | every one cited by an item; no item cites an undefined request; **BCR-V11-31 was uncarried** (it landed after file f's round-4 lane) → item 581 (J-VI.24) |
| 8 | id hygiene | J-V, T-V and BCR ids per volume; file f's items | no duplicate in any volume; items 200–582 contiguous, none duplicated |
| 9 | integrator decisions still held | J-VI.2, 4, 6, 19, 20, 22 by their tell-tale strings | 0 stale `'waterNeed'`, 0 item-110 `refuse.*` keys outside notes, V04's growth cap V11's, no `fallbackClass` written by V08, no bare "M6" for the underground; **J-VI.19 stale in V04's text** (two rows and BCR-10 still named `LayerSpec.showUnexcavated`) → J-VI.28; **J-VI.4 stale in V09's BCR-V9-26 (b)** (two "refused" clauses) and in three V09 message rows that mirror a pre-item-101 base sentence → J-VI.30 |
| 10 | clean-room | §8.3 | 4 hits reworded |

### 8.3 Clean-room re-run

Scan 1 (`tools/integrate/cleanroom2.py`, whole-token against the 3 193 code-shaped identifiers of the reference readings)
over the volumes as reconciled: 85 hits, 19 on names the base lacks; new since the checkpoint only file-name tokens
(`events.log` in V05 and V11). Scan 2 (the volumes' and file f's camel-case tokens the base lacks, against every camel-case
token of `research/findings/*.md`): 9 tokens, of which three were reference identifiers — each in **this lane's own
Integration notes**, which named the retired name while recording its renaming (IN-V01-1, IN-V07-1, IN-V09-1): reworded to
say the former name coincided with a reference name without repeating it. Scan 3 (new: a reference camel-case identifier of
7 or more characters as a substring of our tokens, over the volumes, file f and this file): one more — J-V1.31's
alternative event name built on the retired type — reworded. Allowed after reading: `towerRadiusW` (V02: a wing's corner
tower's radius as a share of the wing's width; the reference token is the town wall's tower size in a public export —
a different role), `openSettings` (V09, V10: a generic search term's substring), `MultiPolygon` (the GeoJSON standard),
and the checkpoint's allow rows (`minSize`, `minWidth`, `circulationShare`, `LineString`, `kB`, V09's `bend.room.minArea`).
File f: 0 hits. The final re-run after the last edit is in §8.6.

### 8.4 Decisions of the continuation

| id | subject (volumes) | decision | why |
|---|---|---|---|
| J-VI.23 | clean-room in the Integration notes (V01, V07, V09) | a note recording a clean-room rename says the former name coincided with a reference name and does not repeat it; J-V1.31's alternative is worded without the retired type's name; `towerRadiusW` is allowed | a volume is an implementer input (§17.1), so its notes are too; RV-pc-2's rule renames only a name of the same role |
| J-VI.24 | BCR-V11-31 (V11 → file f) | carried as item 581 beside item 377, STAGED with the village product | a request written after file f's last lane had no item |
| J-VI.25 | dossier field names in wiring traces (V07, V11) | a trace names the digest's field as volume 8 traces it: V07's deposits read `site.deposits` → DR19; V11's W21 reads `site.terrain`, `site.culture` | the port reads only its digest (§7.7 item 1); a name no digest carries is an unwired input |
| J-VI.26 | the clerk's terrace encoder (V10, V09) | its stroke carries `falloff: 'cosine'` and `amount: 1`, as volume 9's mapper sets them | §7.1's `FieldStroke` requires both; T-V10-1's schema check would fail every clerk terrace |
| J-VI.27 | the raised way's piers and held measures (file f item 244; V01, V04, V05, V06, V07, V09, V11) | item 244 gains the **support step** — stations at a pitch drawn in volume 11's `pierSpacingM` band (or the held `spanSpacingCm`), rectangles of `pierWidthShare`/`pierMinCm`, slid clear of crossed ways and water, keys kept through an unchanged course — and the held fields `clearanceCm` and `spanSpacingCm` with the clearance rule over crossed ways | the record's `supports` had readers in seven volumes and no producer; volume 9 edited two fields the record did not carry; volume 11's pier cells had no reader. Chose one step in the base record's item over a volume-4 or volume-6 stage because every rung and every path (generation, declaration, epoch) lays piers the same way |
| J-VI.28 | integrator decisions applied in the text (V04) | a decision that retires a field is applied in the rows and requests that name it, not only by note: V04's §1b and §2 rows and BCR-10 edited in place for J-VI.19 | an implementer reads the row, and a note three thousand lines later does not override it reliably |
| J-VI.29 | the method of this pass | the seams' four whole-read rounds stand for the whole read of the nine pairs; the pairs no seam read together were checked by the censuses of §8.2, every hit read in context, instead of a sixth whole read of about 6 MB | the seams read the pairs whole four times with this file and file f; a census over names, citations, fields, kinds and requests reaches every pair at once; a semantic conflict sharing no name stays PLAUSIBLE (§8.6) |
| J-VI.30 | item 101 R2 over three base refusals (V09, V10; file f item 582) | a user's placement no plot fits, one over its disruption budget, and a join or split that removes an occupied building are **bent** by the dry run and named in one line; accepting the dry run is item 31's confirmation of a demolition; V09's rows are `bend.place.noSite`, `bend.place.overBudget`, `bend.vacate`; an assignment or a `rejectSite` re-placement that no plot fits stays F-EDIT (a dossier fact's conflict); V09's BCR-V9-26 (b) reads the bends of J-VI.4 (d), (e), (h) | §7.1's pre-item-101 sentence contradicted its own authoring paragraph ("refused only where it contradicts a dossier fact or a lock"); J-VI.4 had ruled R2 over every tool but listed only item 110's and the sky's refusals |

### 8.5 What changed (index; backups of every file before this continuation: `scratchpad/volumes/integ/pre-cont/`)

| file | notes | in-place edits |
|---|---|---|
| V01 | IN-V01-8, IN-V01-9 | IN-V01-1's wording; J-V1.31's alternative |
| V04 | IN-V04-13, IN-V04-14 | §1b's and §2's `showUnexcavated` rows; BCR-10's §8.4 new text |
| V07 | IN-V07-6, IN-V07-7 | IN-V07-1's wording; §1b's deposits trace |
| V09 | IN-V09-13 – IN-V09-16 | IN-V09-1's wording; BCR-V9-26 (b)'s two bends; the three message rows |
| V10 | IN-V10-5 | the T2 `terrace` encoder row |
| V11 | IN-V11-8 – IN-V11-10 | W21's dossier column |
| file f | *Integration continuation* section; header banner | item 244 (the support step, two held fields, requests and needed-by); item 364's note; **item 581** (BCR-V11-31); **item 582** (J-VI.30) |

Every edit was made by an exact-match script asserting its count (`tools/integrate/wsedit.py`) or by an assertion-checked
replacement.

### 8.6 CONFIRMED versus PLAUSIBLE (continuation)

**CONFIRMED (executed in this continuation):** the ten censuses of §8.2 with the counts stated; every flagged hit read in
context; the four clean-room rewordings and the final clean-room re-run (below); the request census after items 581 and
582 (below); the V04, V07, V09, V10 and V11 edits each applied by an exact-match assertion.

**PLAUSIBLE (reasoned, not executed):** that the pairs no seam read together hold no semantic conflict that shares no
name, field, kind, citation or request with the other volume (settle: the seam-r4 round the workflow resumes after this
lane, or a seventh seam over those pairs); that item 244's support step lays piers the reference would recognise (settle:
T-V1's and T-V12's raised-way fixtures at M3a, the pitch band being volume 11's calibratable cells); that item 582's bends
are the nearest lawful declarations (settle: T-V9-13 and T-V9-14's dry-run bars at M3a).

**Final re-run after the last edit** (appended by the run itself): see the line below.

*Final re-run after the last edit (2026-09-29 continuation):* clean-room scan 1 — 84 hits, 18 on names the base lacks, all
file names or the allowed `minSize`; scan 2 — `LineString`, `circulationShare`, `kB`, `minArea`, `minSize`, `minWidth`
(all allow rows); scan 3 — `MultiPolygon`, `minSize`, `openSettings` (allowed); the three retired reference names — 0 hits
in the volumes, file f and this file. Requests: 404 in the twelve `## 10`, 0 uncited, 0 cited-undefined; file f items
200–582 contiguous (383 items), none duplicated. Coverage (§1): 77 of 77 assignments with build-depth hits. Stale strings:
`nearbyResources`, `site.terrainType`, `LayerSpec.showUnexcavated` and the three `refuse.*` keys remain only inside the
Integration notes that record their replacement.
