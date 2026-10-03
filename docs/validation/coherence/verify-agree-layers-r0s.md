# Seam check — agree-layers, round 0 (the underground, the sky islands and the village against the base)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-layers-r0; covered by the whole-design retrovalidation (J84).

PROGRESS
- [x] P1 inputs gathered (canon conflicts MC-05/07/11, CF-PIPE-06, V04/V05/V07 ICONF/XCONF, elegance E-01/02/03/16/38/39, matrix pairs, hand-offs, f routing for V04/V05/V07, the rewrite and assemble cross-part notes)
- [x] P2 the volumes' base change requests and the base homes they rely on (model §2.1–§2.3, §2.5, §2.7; pipeline §4.5, §4.11, II.6, II.7.1–II.7.6, PART III; rendering §8.2, §8.4, §8.5, §9.1, §9.5, §11.1, §12.4)
- [x] P3 the base homes read whole against V04 §1.2–§2.3, §3.1, §3.6, §3.9, §5; V05 §1.2, §2.1, §2.4, §3.2–§3.3, §3.8–§3.9, §3.11, §3.15, §3.23, §4.4, §5; V07 §1, §2.1, §3.12, §3.16, §5
- [x] P4 volume seams V04–V05–V07, the hand-offs among the members, matrix gaps
- [x] P5 issues table, results JSON, LANDED

Members: model, pipeline, rendering, V04, V05, V07. Current text read: `docs/ARCHITECTURE.md` as assembled by
coherence/assemble-r0 (line numbers below are that file's) and `docs/volumes/V04-underground.md`, `V05-sky.md`,
`V07-village.md`; the pre-rewrite texts (commit 5354c2a) only where a claim needed a former reading.

## Summary

31 issues: 5 blockers, 20 majors, 6 minors; by kind DISAGREE 20, DUPLICATE-HOME 4, MATRIX-GAP 4, HANDOFF-OPEN 3; by owner pipeline 8, V07 5, rendering 5, V04 4, determinism 4, V05 2, model 2, scope 1. The five blockers are places where the base's text and a volume would build different maps: the lost void's drawing (rendering §8.2) and its dwelling closure (determinism §7.3), both missing g item 113 (e)'s `lost` state; the no-outfall rule (II.7.2 against V04's field outfall); the rung an epoch reads inside the hand-off band (§4.11 and II.6 (2) against the fold of item 322); and an island's altitude law (II.6 (5) writes `elevationCm` where V05 and §2.7 write `altitudeCm` above the ground reference). Most majors are base restatements of a volume's rule left stale by the volume's later text, or a cell declared in two records. The machine twin of this list is `docs/validation/coherence/results/coherence_verify-agree-layers-r0.json`.

| id | severity | kind | owner |
|---|---|---|---|
| AL-01 | blocker | DISAGREE | rendering |
| AL-02 | blocker | DISAGREE | determinism |
| AL-03 | blocker | DISAGREE | pipeline |
| AL-04 | blocker | DISAGREE | pipeline |
| AL-05 | blocker | DISAGREE | pipeline |
| AL-06 | major | DISAGREE | pipeline |
| AL-07 | major | DUPLICATE-HOME | scope |
| AL-08 | major | DISAGREE | pipeline |
| AL-09 | major | DISAGREE | pipeline |
| AL-10 | major | DUPLICATE-HOME | pipeline |
| AL-11 | major | DUPLICATE-HOME | V04 |
| AL-12 | major | HANDOFF-OPEN | rendering |
| AL-13 | major | MATRIX-GAP | rendering |
| AL-14 | major | MATRIX-GAP | rendering |
| AL-15 | major | HANDOFF-OPEN | determinism |
| AL-16 | major | HANDOFF-OPEN | V04 |
| AL-17 | major | DISAGREE | V04 |
| AL-18 | major | DISAGREE | V04 |
| AL-19 | major | DISAGREE | V05 |
| AL-20 | major | DISAGREE | V07 |
| AL-21 | major | DUPLICATE-HOME | V05 |
| AL-22 | major | DISAGREE | model |
| AL-23 | major | MATRIX-GAP | V07 |
| AL-24 | major | DISAGREE | V07 |
| AL-25 | major | DISAGREE | determinism |
| AL-26 | minor | MATRIX-GAP | V07 |
| AL-27 | minor | DISAGREE | pipeline |
| AL-28 | minor | DISAGREE | rendering |
| AL-29 | minor | DISAGREE | model |
| AL-30 | minor | DISAGREE | V07 |
| AL-31 | minor | DISAGREE | determinism |

## Issues

### AL-01 · BLOCKER · DISAGREE · owner rendering
**Claim.** The `unexcavated` program and the lost void disagree. Base §8.2's program list (base l. 11776) defines `unexcavated` as "dashed kerbs at 40 % alpha, no fill, no light; drawn only for a `secret` key while the view key `showUnexcavated` is on", with no `lost` case. Model §2.7 (l. 2419–2421), pipeline II.7.6 (l. 19075) and V04 §5.1 / §5.2 (g item 113 (e), an owner rule) say a lost cluster is "remembered as once known, drawn faded like an unexcavated void" for every key its `knownTo` admits, whatever `showUnexcavated` says, its system label carrying "once known". A renderer built from §8.2 draws nothing of a lost void for a public key; one built from V04 draws it faded.
**Required change.** At rendering, §8.2's program list: the `unexcavated` program reads "(g item 109 (j) (2), g item 113 (e)): dashed kerbs at 40 % alpha, no fill, no light; an unexcavated cluster's elements drawn only for a `secret` key while the view key `showUnexcavated` is on; a lost cluster's for every key its `knownTo` admits, whatever `showUnexcavated` says, its system label carrying the line 'once known' (V04 §5.2)". §8.4's toggles bullet (l. 12183) adds "and lost voids for every key their `knownTo` admits (g item 113 (e))".

### AL-02 · BLOCKER · DISAGREE · owner determinism
**Claim.** The dwelling closure's trigger disagrees with V04's excavation states. Base §7.3 item 9 (d) (l. 10201) makes a closure of "a declaration that places dwellings in an underground cluster nobody can reach (V04's excavation reading `unexcavated`)". V04 §3.8 (*Voids and bans*, l. 2066, 2077) and V04 §3.4 (l. 1199; J-V4.53) apply the closure, and the no-dwelling rule, to a cluster whose reading is `unexcavated` or `lost` (g item 113 (e)). Built from the base, a `placeAt` of a dwelling class in a lost cluster digs no way in and leaves dwellings in a void with no access, against item 109 (j) (4) ("no dwelling stands in a void that has no access").
**Required change.** At determinism, §7.3 item 9 (d): "… a declaration that places dwellings in an underground cluster nobody can reach (V04's excavation reading `unexcavated` or `lost`, V04 §2.2) …".

### AL-03 · BLOCKER · DISAGREE · owner pipeline
**Claim.** The no-outfall case is decided two ways. Pipeline II.7.2 *Depth and fall* (base l. 18501) says "A settlement with no outfall (no water body and no frame edge the flow leaves by) drains every run to its lowest frame cell, reported." V04 §3.2 N2 (l. 945–950), the network's build home, admits the `moat` candidates at the start cost `outfall.moatPenalty × outfall.reachM`, and with none makes one `field` outfall: the D8 path from the hydro cell of largest accumulation on `R`'s boundary, followed outward to its first cell outside `R` beyond the outermost enceinte's outer strip, `into: 'field'` (§2.3's `OutfallInto` holds `'field'`), reported "sewers discharge to the town ditch / a cess field" (V04 §3.11). The two rules put the outfall in different places.
**Required change.** At pipeline, II.7.2 *Depth and fall*: replace the sentence with "Where no outfall candidate is admitted, the town ditch's `moat` candidates are admitted at a start penalty, and with none of those the network makes one `field` outfall beyond the outermost enceinte (V04 §3.2 N2), reported."

### AL-04 · BLOCKER · DISAGREE · owner pipeline
**Claim.** The rung an epoch reads disagrees inside the hand-off band. Pipeline §4.11 *The rung at an epoch* (base l. 7735) says "At each epoch the rung profile is read at the epoch's `populationTarget`", §4.11 *Islands and the underground over epochs* (l. 7913) "re-reads the rung from its population target", and II.6 (2) (l. 18272) gates islands by "the one the epoch's population target chooses". V07 §2.1's fold (item 322), V06 §3.1 (3) and §3.2 row 1 ("the rung every later step reads"), V05 §3.15 step 1 and J-V5.74 read the fold's rung: inside the band the previous product's own rung at the edge of its range (a 1 560-person village on the VILLAGE row). §1.1 (l. 353) already states the fold. A 1 560-person village would read TOWN's granularity, greenery, layer and budget rows by §4.11 and VILLAGE's by V06 and V07.
**Required change.** At pipeline: §4.11 *The rung at an epoch* reads "At each epoch the rung profile is that of the epoch's rung — the fold's (V07 §2.1; item 322): outside the hand-off band the rung the target's population chooses, inside it the previous product's own rung at the edge of its range — …"; §4.11 *Islands and the underground over epochs* reads "Each epoch reads its rung (*The rung at an epoch*, the fold's)"; II.6 (2) reads "… and, in an epoch, the epoch's rung (the fold's, §4.11 *The rung at an epoch*)".

### AL-05 · BLOCKER · DISAGREE · owner pipeline
**Claim.** An island's altitude law writes two different quantities. Pipeline II.6 (5) (base l. 18296) states "the altitude `elevationCm = E_min + (E_max − E_min) · h(S_town)`". Model §2.7 (l. 2215) reads `elevationCm` "as groundRefCm + altitudeCm", and V05 §2.1 and §3.9 (3)–(4) make the law's value `E` an altitude above the ground reference: `altitudeCm = max(E, rim + depth + clearanceM)`, `elevationCm = groundRefCm + altitudeCm`, with `groundRefCm` the terrain plus the caster ceiling under the island. Read by II.6 (5), an island floats `groundRefCm` lower (tens of metres) than by V05, and its shadow, clearance and slabs move with it.
**Required change.** At pipeline, II.6 (5): "… and the law's altitude `E = E_min + (E_max − E_min) · h(S_town)` above the island's ground reference — `SkyIsland.altitudeCm`, floored by V05 §3.9 (4); `elevationCm` = `groundRefCm` + `altitudeCm` (§2.7) — area from both supplies, altitude from the city's alone …".

### AL-06 · MAJOR · DISAGREE · owner pipeline
**Claim.** II.6 still names the retired stored field `flowToward`. The *Sewers* paragraph (base l. 18243, 18245) lists among `SewerStrategy`'s declared inputs "the ways with `flowToward` (§2.4)" and says mains fall "with `flowToward` to the outfalls". Model §2.4 (l. 1029–1033, 1053) declares the drainage direction as the reading `wayFall(way, sampler, rule)`, never stored, a stored `flowToward` dropped on load (item 208); V04 §1b.1 (l. 252) and J-V4.12 read `wayFall`. Stage registration is by declared I/O (§4.12), so the declared input names a field no stage produces.
**Required change.** At pipeline, II.6 *Sewers*: the declared inputs read "… the ways with their drainage direction `wayFall` (§2.4, a reading) …" and the family reads "`follow-streets` (mains under the ways, falling by `wayFall` to the outfalls)".

### AL-07 · MAJOR · DUPLICATE-HOME · owner scope
**Claim.** The village rung rows are stated in two homes with different values. Scope §1.1's ladder table (base l. 323–325) restates the THORP, HAMLET and VILLAGE rows with frames at the target of 1.2 km², 5.8 km² and 20 km² and says "The village rows are volume 7's"; V07 §2.1 (l. 349–351), their home, gives 1.1 km², 5.7 km² and 19.9 km² after E-38's derived `haPerHead` (2.275 ha per head, a −1.1 % territory area). (The same defect as verify-scope-r0's VS0-08; listed here because the rung rules are this seam's subject.)
**Required change.** At scope, §1.1: the three village rows of the ladder table are replaced by one row "THORP, HAMLET, VILLAGE — V07 §2.1's rows (bands [1, 80), [80, 400), [400, 1 500); frames by V07 §3.2 (1)'s territory law; layers none / never / never)", the values stated only in V07 §2.1; or, if the table keeps them, they read 1.1 km² (1.1 km), 5.7 km² (2.4 km) and 19.9 km² (4.5 km).

### AL-08 · MAJOR · DISAGREE · owner pipeline
**Claim.** Whether a sewer network can stand at a village rung disagrees. PART III's rung-rows paragraph (base l. 19194) says `layers.sewers.existence = 'never'` means "no network stage registers, a request's `toggles.sewers` reported as not applicable, the `drain` column read by nothing", and II.7.1 (l. 18443) lists "every village" among the settlements without a network. V04 §3.1 *The maintenance mode* (l. 891–898), V07 §1 and §3.12, and PART III's own *The underground below TOWN* paragraph keep a shrunk town's network registered in maintenance mode at a village rung (its stage re-derives its part from its kept elements, lays nothing new), and II.7.1 itself says `Features.sewers` is "once on, never off".
**Required change.** At pipeline: PART III's rung-rows paragraph reads "`layers.sewers.existence = 'never'` (II.7.1: no network is laid at a village rung, a request's `toggles.sewers` reported as not applicable; a shrunk town's network stays registered in maintenance mode, V04 §3.1)"; II.7.1's drain-rule sentence reads "Without a network — a TOWN whose draw came out `off`, a village rung with no inherited network —", and adds "an inherited network in maintenance mode keeps its recorded connections and connects nothing new (V04 §3.1)".

### AL-09 · MAJOR · DISAGREE · owner pipeline
**Claim.** The island resize rule is one-directional in the base and two-directional in V05. II.6 (6) (base l. 18302–18303) resizes "an island whose `A` shrinks by more than the hysteresis (0.05 of its area)", and §4.11 (l. 7913) "an island whose supported area shrinks past the hysteresis". V05 §3.15 step 2 resizes "if |`A_t` − `areaHa`| > `hysteresis` × `areaHa`" toward `A_t` "either way (magic accretes and erodes slowly)" at `growthPerYear`, and §4.11's own `resizeIsland` comment (l. 7946) grows new rim faces. Read from II.6, a richer town's island never grows.
**Required change.** At pipeline: II.6 (6) reads "an island whose `A` differs from its area by more than the hysteresis is resized toward it, at most `growthPerYear` of its area per year either way (V05 §3.15)" — the value 0.05 left to V05 §2.4's row; §4.11's islands bullet reads "an island whose supported area moves past the hysteresis is resized".

### AL-10 · MAJOR · DUPLICATE-HOME · owner pipeline
**Claim.** The forecast's cells are declared in two records. Pipeline II.7.4's `UndergroundRule` (base l. 18715) declares `voidDwellingHouseholds: number; accessForecastMin: number; forecastSafety: number /* 0.85 */` as rule cells, and II.7.3 states `forecastSafety` (0.85). V04 §2.3's `UnderLayoutRule` (`tables/under/layout.json`, V11 registry row 58; l. 625–628) declares `forecastSafety` 0.85, `voidDwellings { maxHouseholds 8, share 0.05 }` and `accessForecastMin` 0.5, which U-FORECAST reads (V04 §8, l. 3034), and V04 §2.4's `NetworkForecast.voidDwellingHouseholds` is a derived output (Σ min(maxHouseholds, capacity)), never a cell. Two tables would hold the same cells, and `voidDwellingHouseholds` is a stored cell in one and a derived value in the other.
**Required change.** At pipeline, II.7.4: `UndergroundRule` drops `voidDwellingHouseholds`, `accessForecastMin` and `forecastSafety`; II.7.3 (d) and its cap sentence cite them as "V04 §2.3's `UnderLayoutRule.forecastSafety` and `.accessForecastMin`, and the forecast's derived `voidDwellingHouseholds` (V04 §2.4)", stating no value; the base's part paragraph of II.7.4 lists `UndergroundRule` without them.

### AL-11 · MAJOR · DUPLICATE-HOME · owner V04
**Claim.** One cell, two records and two names. Pipeline II.7.5's `UndercityRule.sourceRank: Partial<Record<UndergroundSystem['kind'], number>>` (base l. 18889; II.7.5 (1)) holds the void-source rank, registered by V11 (row 59, V11 §3.23.6, "the cell V04 §2.3 reads as `RuinRule.sourceWeight`"). V04 §2.3 declares it again as `RuinRule.sourceWeight: Record<UndergroundSystem['kind'], number>` (l. 673; row 58a) and its readers read that name (V04 §2.3 l. 700, §3.3 l. 1127, §3.5.0a l. 1299, §3.6 C3 l. 1892, §8 l. 3045, J-V4.117). The two types differ (`Partial` against total).
**Required change.** At V04: `RuinRule.sourceWeight` is removed; V04 §2.3's table row, §3.3 P6, §3.5.0a, §3.6 ("ranked by `capacity × UndercityRule.sourceRank[kind]`, a kind absent from the row ranking 0"), §8's calibration lines and J-V4.117 read `UndercityRule.sourceRank` (II.7.5; V11 §3.23.6, registry row 59).

### AL-12 · MAJOR · HANDOFF-OPEN · owner rendering
**Claim.** What selects an underground access's symbol disagrees. Base §8.2's states table (access row, l. 11947: "override: the kind's `symbol` …") and the `symbol(glyph)` program ("for every `AccessPoint.kind` of II.7.4") pick the glyph by `AccessPoint.kind`. V04 §5.2 (7) (l. 2713: "its symbol chosen by `cause.rule`") and V09 §4.17.3 (l. 2449: "§8.2's access row draws it by `cause.rule`") pick it by the cause, and T-V9-37 bars that the symbol differs by cause. V09's hand-off XV-V9-4 asked §8.2 for exactly this and it is not in §8.2.
**Required change.** At rendering, §8.2's states table, the access row: "override: the symbol of its `cause.rule` (V09 §4.17.3's column; V04 §5.2) — with a bar when `locked`, filled solid in `wall` when `bricked`, as a trace with rubble stipple when collapsed"; the `symbol(glyph)` program's clause reads "for every `AccessPoint` where it breaks the surface, by its `cause.rule`".

### AL-13 · MAJOR · MATRIX-GAP · owner rendering
**Claim.** `LayerSpec.ghostAlpha` has one default in the base and another in V04, for two different uses; the matrix holds no row for it. Base §8.4's `LayerSpec` (l. 12166) defines `ghostAlpha` as "ghost: the covered ground shows through at this share (default 0.35)", the sky's occlusion. V04 §5.1 (l. 2671) draws the underground layer's `cutaway` ground ghost "at `ghostAlpha` (0.25)" and V04 §6 composites the cached ground tiles at it. A builder of the underground layer's `LayerSpec` takes 0.35 from the base or 0.25 from V04. Verdict: disagree.
**Required change.** At rendering, §8.4's `LayerSpec`: `ghostAlpha`'s comment reads "the share a ghosted layer shows through: `sky` (`ghost` occlusion) the covered ground at this share, default 0.35; `underground` (`underView: 'cutaway'`) the ground drawn as a ghost at this share, default 0.25 (V04 §5.1)"; V04 §5.1 cites it without restating the value.

### AL-14 · MAJOR · MATRIX-GAP · owner rendering
**Claim.** The underground view's default band is undefined where the layer holds no tunnel; the matrix holds no row for the view key's default. Base §8.4 (l. 12186) defaults `depthBand` to "the shallowest band holding a tunnel with frontage plots, else the shallowest tunnel". At every village rung (no network; V07 §3.16's caverns and ruins), at a TOWN whose sewer draw came out `off` but which holds a ruin, cavern or catacomb, and in a standalone neighbourhood document (V04 §3.1), the layer holds systems and no tunnel, so the default names no band; V04 §5.1 only covers the case "with no non-empty band". Verdict: an undefined edge at the seam (principle (11)).
**Required change.** At rendering, §8.4: "… default the shallowest band holding a tunnel with frontage plots, else the shallowest band holding a tunnel, else the shallowest non-empty band; with no non-empty band the layer draws the ghost alone (V04 §5.1)"; §2.9's `depthBand` comment keeps citing §8.4.

### AL-15 · MAJOR · HANDOFF-OPEN · owner determinism
**Claim.** V04's hand-off to §5.4 is not closed. V04 §13 asks determinism to list the underground's warning codes as V04 §1b.1's list (l. 278: twelve codes). Base §5.4's `warnings` comment (l. 8481) names seven — `W_NET_CROSS`, `W_BASEMENT_NEAR_VOID`, `W_VOID_UNDER_WATER`, `W_RUIN_SIMILAR`, `W_CATACOMB_BELOW_TOWN`, `W_SUBTERRANEAN_WET`, `W_OUTFALL_LOW` — and omits `W_RUIN_SOURCE_REMOVED`, `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR`, `W_TERMINAL_CISTERN_SKIPPED` and `W_BURIED_FORMER_SKIPPED`, so the base restates a stale copy of V04's list.
**Required change.** At determinism, §5.4's `warnings` comment: "a stage's own non-kernel warning codes — the underground's are V04 §1b.1's list (item 338)", naming none; or, if it names them, all twelve of V04 §1b.1.

### AL-16 · MAJOR · HANDOFF-OPEN · owner V04
**Claim.** V04 calls `ruinMasonry` "the `ruin` program". Base §8.2 defines two programs: `ruin` (the `ruined` state's program: dashed outline, 30 % fill, rubble stipple) and `ruinMasonry` (g item 109 (g): the ancient ruin system's double walls and column dots). V04 §5.2's bullet heading reads "**The `ruin` program** (g item 109 (g); `ruinMasonry`)", so one term names two programs. Rendering's cross-part note to V04 ("its underground `ruin` program is `ruinMasonry`") is not closed at V04.
**Required change.** At V04, §5.2: the bullet reads "**The `ruinMasonry` program** (§8.2; g item 109 (g)): …", and V04 uses "ruin program" nowhere else for it; §1b.4's ruin row already reads `ruinMasonry`.

### AL-17 · MAJOR · DISAGREE · owner V04
**Claim.** V04 writes an identity field the base does not have, on a district the base says has no identity of its own. V04 §3.6 C0 (l. 1879) gives the first undercity neighbourhood of an `Underground city` record "its `District.identity.dossier` … the record's binding key". Model §2.5's `District.identity` is `{ row, source: 'dossier'|'emergent'|'dominant'|'plain', sinceWeek }` (l. 1065), with no `dossier` field; a district's dossier binding is the ref of the dossier-backed assignment that targets it (§2.8's fact tiers, l. 2514); and II.7.5 (4) (l. 18831) and §4.5 *Which districts* say an undercity neighbourhood has "no identity of its own: it reads its parent's".
**Required change.** At V04, §3.6 C0: "… the first neighbourhood takes the `Underground city` record's assignment: the assignment targets its `District` (its dossier ref, §2.8's fact tiers), and its `name` is the record's name, a protected dossier name, never a naming-slice draw; its identity stays its parent's (II.7.5 (4))."

### AL-18 · MAJOR · DISAGREE · owner V04
**Claim.** V04's tail runs S12c for character where the base's coverage rule gives none. V04 §3.1's T6 row (l. 879: "the tail's S12c and S13a | the underground and undercity districts … | characters, names, label candidates") and §1b.2 (l. 332: "U-CITY's districts by S12c (character)") compute characters for the underground and undercity districts. Pipeline §4.5 *Which districts* (l. 5697–5700; CF-PIPE-06's ruling) gives character and identity to the ground's districts and a unit run's districts only: "The hinterland, sky and underground pseudo-districts take no character or identity; an undercity or underground neighbourhood reads the identity of the district above it."
**Required change.** At V04: T6's row reads "the tail's S13a (S12c computes nothing for the underground, §4.5 *Which districts*: an undercity or sewer-front neighbourhood reads its parent's identity) | … | names, label candidates of the underground; …"; §1b.2 reads "U-CITY's districts by S13a (names), §9.1's quarter tree"; V04 §6's T6 row is renamed "T6 tail S13a".

### AL-19 · MAJOR · DISAGREE · owner V05
**Claim.** V05's edge table says no island ever stands at a village rung; V07 and V05's own laws carry one there. V05 §3.23 (b) (l. 1767) gives THORP, HAMLET and VILLAGE "no island ever … the village product has no sky stage (V07)", while its TOWN row lets a carried-down island wane, settle and fall. V07 §3.12 (l. 2572–2575) states that "an island still waning or settled when the fold gives the village product continues V05's steps (`sky.islands` runs at every rung, V06 §3.2 …)", and V05 §3.15 step 1's `none` rung row only zeroes the target area. A city that falls into a village in one epoch, or a history replay of a former city, holds a carried island at a village rung.
**Required change.** At V05, §3.23 (b), the THORP/HAMLET/VILLAGE row: "none at generation: `RungProfile.layers.islands` admits none (§1.1); S7b (5) and SKY register and write nothing; a T5 `sky` declaration is bent to a ground quarter (`bend.island.rung`); an island carried down by a hand-off down (V07 §3.12) wanes, settles and falls by V05 §3.15 as at TOWN, `sky.islands` running at every rung, its landing houses ground uses"; T-V5-1's village clause gains the carried-island case.

### AL-20 · MAJOR · DISAGREE · owner V07
**Claim.** V07 §1 says an island is felled when the CITY band is left. Its out-of-scope paragraph (l. 156) reads "Floating islands (none reaches a village rung: §4.11 fells an island when the CITY band is left, and TOWN holds none …)". II.6 (4) says a closed slot "is read by the decline ladder, never as an instant removal"; §4.11 and V05 §3.15 wane, settle and fall an island over its dwell years; V05 §3.23 (b)'s TOWN row keeps a carried island at TOWN; and V07 §3.12 itself carries a waning island into the village product.
**Required change.** At V07, §1 *Out of scope*: "Floating islands (none is laid at a village rung, `RungProfile.layers.islands` being `none`; an island carried down by the hand-off down wanes, settles and falls by V05 §3.15, V07 §3.12, and the village phases read none) …".

### AL-21 · MAJOR · DUPLICATE-HOME · owner V05
**Claim.** The DR27 row is stated in full in two units. Base §7.7's derivation table holds DR27 (l. 11102: subject, inputs, rule, chance, totality bar). V05 §4.4 (l. 2111–2113) restates the whole row with its own glosses. The contract "the dossier rules" (agreement.md) homes DR1–DR35 at §7.7; V05 owns the rules the row points at (V05 §3.2–§3.10, §3.15 (1b), §3.20).
**Required change.** At V05, §4.4: the table is replaced by "The derivation row is §7.7's DR27 (item 387): its inputs are read by V05 §3.2–§3.10, §3.15 (1b) and §3.20 (9)–(12), each input's use stated there", keeping the *Coherence* and *The reverse* paragraphs; any gloss V05 needs beyond §7.7's cells moves into the section that reads the input.

### AL-22 · MAJOR · DISAGREE · owner model
**Claim.** The arena-parts rule omits the ground's parts from 1. Model §2.1 *Arena parts* (l. 517–528) lists the ground, the underground's parts and the sky's, and names only `Document.nextUndergroundPart` and `Document.nextSkyPart` as the never-reused counters; §2.2's `PlatKey` comment (l. 543) reads "part 0 = the ground … underground parts ≥ 1 … sky parts ≥ 1"; rule 1's *The other arenas* states no raised-way part. Model §2.4 (l. 1041), §2.9 (l. 2745, `nextGroundPart`), §3.4 and J-A110.21 put each raised way's deck on a ground part ≥ 1, and V07 §1 ("the ground arena's parts from 1 (§3.4)"), V04 §3.1 T2 (raised-way piers "on ground parts ≥ 1") and V05 §3.22 read them.
**Required change.** At model: §2.1 *Arena parts* adds "and ground parts from 1, one per raised way's deck (g item 110 (b); `Document.nextGroundPart`)" and its counters sentence names all three counters; §2.2's `PlatKey` comment reads "part 0 = the ground or the underground's sewer network; ground parts ≥ 1 = one arena per raised way's deck; underground parts ≥ 1 …; sky parts ≥ 1 …"; rule 1's *The other arenas* gains the raised way's part (its L0–L4 as §2.7 and §4.3 lay them).

### AL-23 · MAJOR · MATRIX-GAP · owner V07
**Claim.** The title plate's water-qualifier switch has two names and two homes; the matrix holds no row for it. Base §9.5 (l. 13401) puts it on the style sheet: `StyleSheet.plate.waterQualifier`. V07 lists `plate.qualifier` among `village.json`'s switch cells (§2.2, l. 491; J-V7.121, `calibratable: false`) and §5.3 (l. 3174) calls it `plate.qualifier`, "on by default in `painterly`". A sheet loader reads one key, the village table the other. Verdict: disagree; the base's style sheet is the plate's home (§9.5).
**Required change.** At V07: §5.3 reads "`StyleSheet.plate.waterQualifier` (§9.5), on in the `painterly` sheet"; `plate.qualifier` leaves §2.2's switch-cell list and J-V7.121's list.

### AL-24 · MAJOR · DISAGREE · owner V07
**Claim.** V07 restates V04's dig rule with a different test and different comparison moments. V07 §3.16 (3) (i) (l. 2821–2827): "Every village building standing over a chamber or gallery within `DigRule.reachM` … of its footprint's floor … draws once, when it is built". V04 §3.5.7 (d) (l. 1797–1810), the rule's home: a building whose footprint overlaps an element in plan below its dig floor, or whose basement ring lies within `DigRule.planReachM` (5 m) in plan, with `depthFactor(d)` by V11 §3.23.7's law, has an access by §6.1's fixed-key draw (E-03) "compared at every derivation and every scoped access pass", one not yet made appearing "when the building's chance later rises above its draw". By V07 a building that later gains a basement never reaches the void.
**Required change.** At V07, §3.16 (3) (i): "**(i) Dug from above** — V04 §3.5.7 (d)'s rule (§6.1's fixed-key draw), read at village rungs, its draws keyed by the building's lineage and the void kind on `sewer`. **The village classes' rows** of `DigRule.classRow` (this volume's, in V04's table; own): …" — keeping the class rows, dropping the restated geometry, formula and moment.

### AL-25 · MAJOR · DISAGREE · owner determinism
**Claim.** `TableId` is used across the base and V07 but declared nowhere. Model §2.8 (`SliceRef.table`, l. 2496), §2.9 (`Recipe.tablePins`, l. 2772), §7.1 (`editTable.table`, l. 9440), §10.4 (`tablePatch.table`) and V07 §2.1 (`ProductDecl.rows`, `ProductDecl.tables`) type fields as `TableId`; V11 §2.1 (l. 247) says "TableId is §7.6's type"; MC-11's ruling places its declaration at §7.6; base §7.6 holds no `type TableId` (the matrix's V07–model `TableId` disagreement stays open).
**Required change.** At determinism, §7.6: declare `type TableId = string; // a dotted, stable, never-reused table name ('roster.classes', 'village', 'under.layout' …), one per row of V11 §3.1's registry` (the meaning V11 §2.1 states), which V11 §2.1 and V07 §2.1 cite.

### AL-26 · MINOR · MATRIX-GAP · owner V07
**Claim.** E-16's post operation `edgeFade` and V07's program `way.edgeFade` are two mechanisms under one name, and V07's spotlight is not named as the base's `vignette` program. Base §8.2 renames the view's vignette post operation `edgeFade` (E-16; `PostOp`, l. 11545) and names the painterly spotlight "the `vignette` program" (l. 11751); V07 §5.1 (l. 3081) defines `way.edgeFade` (a road leaving the frame turning into a dotted trail) and its spotlight by the cells `spotlight.focus`, `.size`, `.core`, `.rim` without naming `vignette`; T-V7-25 lists `way.edgeFade` among its programs. Verdict: one term, two concepts (principle (2)).
**Required change.** At V07, §5.1 and T-V7-25: the road program is renamed `way.frameTrail`; *The spotlight* reads "the `vignette` program (§8.2; E-16) with the cells `spotlight.focus`, `spotlight.size`, `spotlight.core`, `spotlight.rim`".

### AL-27 · MINOR · DISAGREE · owner pipeline
**Claim.** PART III cites a section that does not exist. *Not-precluded checks* (base l. 19211) reads "(the parity judge's 44 / 44; V07 §15)"; V07 has no §15 (its sections run to §13), and the parity judge's rows are the base's §15.1 parity matrix.
**Required change.** At pipeline, PART III: "(the parity judge's 44 / 44; §15.1)".

### AL-28 · MINOR · DISAGREE · owner rendering
**Claim.** Base §8.2's chamber row points to a superseded home. The states table's chamber row (l. 11949) reads "its `Chamber.kind` (V04's `ChamberKind`; …)"; `ChamberKind` is declared at model §2.7 (l. 2236) and V04 §1.2 and §2.1 cite it there (model's cross-part note).
**Required change.** At rendering, §8.2's chamber row: "its `Chamber.kind` (`ChamberKind`, §2.7; II.7.6, II.7.5)".

### AL-29 · MINOR · DISAGREE · owner model
**Claim.** Two model glosses disagree with V04 and V05. §2.3's `OutfallInto` comment (l. 902) reads "declared here, V04 §2.2 cites it"; V04 cites it at §1.2 and §2.1 (l. 128, 430), not §2.2. §2.1's layer bullet (l. 506) glosses `elevationCm` as "base elevation: an island's altitude"; V05 §2.1 and model §2.7 make an island's `elevationCm` its surface datum, `groundRefCm` + `altitudeCm`, the altitude being the separate field `altitudeCm`.
**Required change.** At model: §2.3's comment reads "declared here; V04 §2.1 cites it"; §2.1's layer bullet reads "`elevationCm: i32` (base elevation above the datum: an island's surface datum, `groundRefCm` + `altitudeCm`, §2.7; a sewer's negative depth)".

### AL-30 · MINOR · DISAGREE · owner V07
**Claim.** Four V07 pointers disagree with their homes. (a) V07 §1's facts (1) and FL-2 place V04's maintenance mode at "V04 §3.10"; it is stated at V04 §3.1 (l. 891), §3.10 only applying it to U-FADE. (b) V07 §1's base-hooks paragraph lists V04's village subset as "T2 for `ruin` and `cavern` only, T2b, T3's F6, T5, T6 and T8, T7 on show"; V04 §3.1 (l. 885–889) and V07 §3.16 (1) include the vaults step for a raised way's arch vaults and terminal cistern and limit T5 to L3, L5 and L7. (c) V07 §1's out-of-scope paragraph gives "the unexcavated underground style and its toggle" to V09; the style is base §8.2's `unexcavated` program and V04 §5.2, V09 owning only the view key's control. (d) V07 §3.16 (1) calls the charnel vault "V07 §2.4's" and V07 §1 "V04's charnel vault (V07 §2.4)"; it is laid by V04 §3.5.1 (l. 1520).
**Required change.** At V07: (a) both pointers read "V04 §3.1"; (b) the paragraph reads "V04's underground tail at the village subset V04 §3.1 names, with its records … and tables …", listing no stages; (c) "the `unexcavated` program (§8.2; V04 §5.2) and its view key's control (V09)"; (d) both read "V04 §3.5.1's charnel vault (V07 §2.4's dossier fact)".

### AL-31 · MINOR · DISAGREE · owner determinism
**Claim.** Three determinism sites cite `ProductDecl` at a section that does not declare it. §5 (l. 8327), §7.7's DR23 row (l. 11098) and §7.7 item 15 (l. 11224) read "`ProductDecl`, §4.12"; §4.12 (l. 8141) and §14 (l. 17016) say the type is V07 §2.1's, where it is declared.
**Required change.** At determinism: the three sites read "`ProductDecl` (V07 §2.1; registered by §4.12's `StrategyRegistry.products`)".

## Canon rulings for these members, checked in the current text

| ruling | where it must hold | state |
|---|---|---|
| MC-05 (f item 213: `ContextVector.arena` gains `'sky'`) | model §2.5 l. 1155–1163; V05 §3.11 | applied; V05 §3.11's sky readings cited by the base comment |
| MC-07 (f item 251: `SkyIsland.rim` / `land`, no stored outline) | model §2.7 l. 2212–2219; V05 §2.1 | applied; every field the base reads exists in V05 §2.1 with the same type |
| MC-11 (every type a base record uses declared in the base) | `Rung` §1.1, `Outfall` §2.3, `Segment` §2.1 | applied; `TableId` not declared (AL-25) |
| CF-PIPE-06 (S12c's coverage) | pipeline §4.5 l. 5697–5700 | applied in the base; V04 not aligned (AL-18) |
| V04-ICONF-3 (VTT portals only in a wall line) | V04 §5.5, T-V4-28 | applied |
| V04-XCONF-1 (`showUnexcavated` a view key) | V04 §1b.1, §1b.3, §5.1; base §2.9, §8.4 | applied |
| V04-XCONF-2 (PageUp / PageDown precedence) | scope §14 l. 17300; V04 §5.1; V03 §4.5 | applied |
| V05-ICONF-1 (`by: 'update'`) | V05 §2.1 `ShadeBasis.by`, §2.3a `IslandShadeStrip.evaluated.by` | applied |
| V05-XCONF-1 (DR27 numbered) | V05 §4.4; base §7.7 | applied (the row restated in both: AL-21) |
| V07-ICONF-1, -3, -4 (the neighbourTracks, ends and nucleus-spacing glosses) | V07 §2.2, §3.10, §3.12 | applied (V07 l. 487 "4 from about 227 people", l. 1996 "6 from about 563", l. 2321 the polyfocal spacing at epochs) |
| V07-XCONF-2 (country spans open, reason `country`) | model §2.7's span rule l. 2135, 2323; V04 §3.5.4; V07 §1 (1), §3.5a (7), §3.16 (1) | applied; V07's fallback gone |
| E-01 (one stretch-state profile at §2.2 rule 5) | model §2.7 l. 2114, 2146, 2283; V05 §2.6, §3.16; V07 §1, §3.8a, §3.12a | applied |
| E-03 (fixed-key draws, §6.1) | determinism §6.1 l. 8645; V04 §3.5.1, §3.5.7, §3.12 | applied in V04; V07's restatement of the dig draw differs (AL-24) |
| E-16 (`wash`, `edgeFade`, `glow`) | rendering §8.2; V04, V05 | applied, no old name left in V04 or V05; V07's `way.edgeFade` collides (AL-26) |
| E-38 (`haPerHead` derived) | V07 §2.1, §3.9 (1) | applied in V07; scope §1.1 stale (AL-07) |
| E-39 (the access-state set kept apart; LOST joins it) | V04 §2.2; model §2.7 l. 2419 | applied in V04 and model; rendering and determinism miss `lost` (AL-01, AL-02) |

## Shared subjects checked and found in agreement (current text, whole subsections)

* **The island record** — model §2.7's read list (`key`, `slot`, `rim`, `land`, `anchor`, `elevationCm` = `groundRefCm` + `altitudeCm`, `state` with five values, `shadeBasis`, `removed`, `removedAccesses`, `supply`, `districts`, `allocation`, `reason`, `institution`, `terrain`, `terrainEcho`) against V05 §2.1: names, types and the five states agree; §8.2's island state rows (floating, waning, settled, fallen, removed) match V05 §5.1.
* **The island rule's values** — II.6 (3)–(4): slot chances 0.6 / 0.5 / 0.35, `redrawPerYear` 0.1 by `1 − (1 − r)^years`, `node.bonus` 0.25 clamped, never from 0, the count drawn on `island.place`; against V05 §2.4 (whose cells cite II.6 (4)), §3.2, §3.3 and §3.15 step 5: agree. The supply on absolute values and S7b (5)'s fill cap of three districts' households (`fill.householdCapDistricts`): agree.
* **The island arena** — §2.2 rule 1's sky part (outer ring with `margin`, the `rim`, the `void` face of L0 kind `sky`, the land face) against V05 §3.8 (1)–(2); item 111 stopping at the rim (II.6, §2.3, V05 §3.8 (4)): agree.
* **The sky's layer order** — §8.2's slot resolution names the sky entries at slots 2, 3, 8, 10, 17, 19 and 25, the same slots and semantics as V05 §5.1's slot table; the `sky.ground` role; `ghost` the sky's default occlusion: agree.
* **The island's slab and the light** — §8.4 (a) (the slab list holds the island's underside tiers under every occlusion mode) against V05 §5.3 (1)–(3); light shafts reading a sky island's slabs (§8.4 (b), V04 §5.3): agree.
* **The tunnel condition table** — II.6's one table (in use, neglected, partly caved in, collapsed, sealed, flooded for galleries and chambers only), the access state derived from its element, `reopen` returning the stored state; against V04 §2.3's `UndergroundFadeRule` rows and V04 §5.2: agree.
* **The access record** — II.7.4's `AccessPoint` (`kind`, `role`, `ground`, `under`, `state`, `knownTo`, `source`, `cause`) against V04 §2.2's `AccessCause` (`source: 'dig'` with `cause.rule: 'mineBreach'` for a village working, J-V4.113): agree.
* **The undercity's existence by rung** — §1.1's layers column (TOWN `law`, at most 1, above 6 000 people, chance 0.2; CITY 2; METROPOLIS 3; never at the village rungs) against II.7.5 and V04 §3.6 C0: agree; `m2PerHousehold` 40 and `mainChamberM2` 400: agree.
* **The light rows** — §4.7's `LightRule.host` (`tunnel`, `gallery`, `chamber`, `accessPoint`, `door` underground; `rim`, `keel`, `skyAccess` on the sky) against V04 §3.9 and V05 §3.13: every host V04 and V05 use exists.
* **The underground's labels and exports** — §9.1's label kinds `tunnel` and `system` against V04 §5.4; §11.1's VTT row (one scene per depth band) and the knowledge rule for unexcavated elements against V04 §5.5: agree.
* **Budgets** — §12.4's tail row (p95 ≤ 10 ms at each village rung; p50 26 · 71 · 162 ms; p95 36 · 112 · 253; navigable 61 · 192 · 343) and the S7b forecast row against V04 §6: the same figures.
* **The village** — §8.5's first view (the perimeter's box × 1.6, at least 400 m) against V07 §5.2; §9.5's tier word and `StyleSheet.plate.populationRound` (1, 10 under `VG`) against V07 §5.3; PART III (4)'s one `village` district and (5)'s bands against V07 §2.1; §1.1's hand-off band sentence against V07 §2.1; `ContextVector.dist` at territory rungs (f item 576) against V07 §2.4 and W64: agree.
* **The underground below TOWN** — PART III, II.7.6 (caverns and ruins at every rung, the other systems gated to TOWN and above) against V04 §3.1, §3.13 and V07 §3.16 (1): agree, save the maintenance-mode wording (AL-08).
* **Islands and the underground apart** — II.6 (\"it has no relation to the underground layer\") against V05 §3.3 (the node term positionless), §3.5 (no island churchyard a catacomb candidate) and V04 §3.5.1 (3), §3.5.3 (the landfall's sourced quarry outside the quarry rules): agree.

## Matrix gaps — shared subjects the matrix holds no row for

| subject | units | verdict |
|---|---|---|
| `LayerSpec.ghostAlpha` (the sky's occlusion and the underground cutaway's ghost) | rendering, V04, V05 | disagree — AL-13 |
| `depthBand`'s default where no tunnel exists | rendering, V04, V07 | undefined edge — AL-14 |
| the access symbol's selector (`kind` or `cause.rule`) | rendering, V04, V09 | disagree — AL-12 |
| the plate's water-qualifier switch | rendering, V07 | disagree — AL-23 |
| `edgeFade` / `way.edgeFade`, the spotlight as `vignette` | rendering, V07 | one term, two concepts — AL-26 |
| the void-source rank (`sourceRank` / `sourceWeight`) | pipeline, V04, V11 | two homes — AL-11 |
| U-FORECAST's cells (`forecastSafety`, `accessForecastMin`, `voidDwellingHouseholds`) | pipeline, V04 | two homes — AL-10 |
| the island's altitude (`elevationCm` against `altitudeCm`) | model, pipeline, V05 | disagree — AL-05, AL-29 |
| an island carried into the village product | V05, V07, pipeline | disagree — AL-19, AL-20 |

## Hand-offs among the members — closure at the destination

| hand-off | from → to | state at the destination |
|---|---|---|
| §5.4's warning codes as V04 §1b.1's list | V04 §13 → determinism | open — AL-15 |
| §14's keymap precedence | V04 §13 → scope | closed (§14 l. 17300) |
| the `ruin.node` line and the islands' exclusion from burial faces | V04 §13 → V05 | closed (V05 §3.3, §3.5 (3), §4.5) |
| FL-3: country spans open, V07's fallback dropped | V04 §13 → V07 | closed (V07 §1 (1), §3.5a (7), §3.16 (1)) |
| FL-1, FL-2, FL-4 | V07 §13 | closed; FL-2's pointer to V04 §3.10 should be §3.1 (AL-30) |
| `ruinMasonry` named as such | rendering's cross-part note → V04 | open — AL-16 |
| `Outfall`, `OutfallInto`, `ChamberKind` cited at §2.3 / §2.7 | model's cross-part note → V04 | closed (V04 §1.2, §2.1); rendering's chamber row still points to V04 (AL-28) |
| `SkyStrategy.place` returns `unitInputs` | pipeline's cross-part note → V05 | closed (V05 §2.3) |
| §8.2's access row draws by `cause.rule` | V09 XV-V9-4 → rendering | open — AL-12 |
| `showUnexcavated` a view key | V09 XV-V9-3 → V04 | closed |
| an arch vault's span recorded | V09 XV-V9-14 → V04 | closed (V04 §2.2, §5.1) |
| "T9's delete" → V09's delete row | V09 XV-V9-16 (a) → V05 | closed (no "T9's delete" left; V05 §2.6, §4.1) |
| the palisade's "show circuit" | V09 XV-V9-9 → V07 | closed (IN-V07-4) |
| the dig draw's wing key and V02's obstacle reads | V02 X12 → V04 | closed (V04 §3.5.7 (d)) |
| `CalamityRef.deaths` read by burial growth | V08 X3 → V04 | closed (V04 §1.3) |
| a `Toll bridge` birth's `implies: 'bridge'` | V08 X7 → V07 | closed (IN-V07-3) |
| the island and village clerk words | V10 CVR-V10-14 → V05, V07 | closed (V05 §4.5; V07 §4.5 with V10 l. 1656, 1676) |

## Doc checks

`docs/validation/bench/doc_checks.py` was not run for this lane: this lane edits no design file, and in this checkout the
reference corpus is absent, so its result would be provisional only (cloud continuation (4)).

