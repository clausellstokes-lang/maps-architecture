# Seam check — stage 2 · stage 3 · the plan rung (V01 neighbourhoods · V02 buildings · V03 interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-stage2-3-r0; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-stage2-3-r0`, 2026-09-29. Output: this file only — no volume, no amendment file and no base text is
edited by this lane. Every finding names one owning volume (or BASE-F, a base change request of
`docs/AMENDMENTS-2026-09-28f.md` that must change) and the exact change it needs; the owners' next revisions apply them.

PROGRESS
- §1 Method, inputs and the shared base sections: done
- §2 The record chain (block → plot → building → wing → storey → room): done
- §3 The elaboration ladder (bands, rungs, clicks, staleness): done
- §4 Classes, rows, terms, ids and units across the seam: done
- §5 Wiring across the seam (produced-never-consumed, consumed-never-produced): done
- §6 Base change requests across the seam (file f): done
- §7 Issue register (S23-01 … S23-40): done (resumed session)
- §8 Decisions, CONFIRMED versus PLAUSIBLE, and what lies outside the seam: done

**Outcome in one paragraph.** The three volumes agree on the chain's spine — V01's blocks and deck plots feed the base's
S10/S11, V02's massing writes `Building.wings` with keys, roles, `on` and `solid`, and V03 plans on those wings through
`storeyRange`, `deckLevel`, `stairChain` and `landingSide`; the composer's four room roles, the dormer precedence, the
façade-bay rhythm on eaves, the crypt as `Basement.crypt`, the solid stack's root and the sealed stack's
`W_TIER_UNREACHED` all match across the seam. **40 issues remain: 1 blocker, 21 majors, 18 minors** (V01 0/4/4, V02
1/7/7, V03 0/9/6, BASE-F 0/1/1). The blocker is V02's rule that keeps buildings under a newly raised deck, against g item
110 (b) and V01's under-deck strip (also seam-time ST-08). The majors cluster in six places: **drawing** (the `hatched`
roof construction and hatch after M6a, three tread laws for one flight, V02's per-building SVG groups, building-hosted
accesses drawn under their roofs and beside the plan's heads, hood pins on porches, V01's GeoJSON names); **identity**
(`StairCore.tower` by index, V03's core and chimney ids by wing index, no minting rule for plan room ids, `partName` with
no lifecycle); **the ladder** (the base's stale lists never split per rung, the district-band click unassigned, the
click and the `plan` query skipping `rooms`); **disagreements of rule** (a half cellar's floor, a terrace read from a
stale stack default, the manor's hall at a poor band, the deck basement still refused); **wiring** (the crypt's seed wings
unnamed); and **the build plan** (the crypt chain on three milestones, the plan rung absent from §16 while V01 and V02
rewrite one total, V02's M6b exit bar needing V03's plan).

## 1 Method, inputs and the shared base sections

**Read whole in this lane** (sampled nothing): `docs/volumes/V01-neighbourhoods.md` (3 276 lines),
`docs/volumes/V02-buildings.md` (3 942 lines), `docs/volumes/V03-interiors.md` (2 737 lines), each with its Integration
notes as `volumes/_integrate` left them (02:29); `docs/volumes/_integrate.md` (365 lines); `docs/AMENDMENTS-2026-09-28f.md`
(989 lines, items 200–566). **The base sections the three share, read whole** (`docs/ARCHITECTURE.md`, md5 01fea21f…):
§2.6 (l. 1111–1762: records, the outline builder, the wing-carrying rule, heights, entrances, basements, the requested
basement, the plan rung, elaboration, the interior ladder, the capacity, the re-cut); §2.7's records (l. 1764–1929);
§2.8's `ElaborationRecord` and state rules (l. 2030–2045); §4.1's trigger policy (l. 3824–3845); §8.2's paint-program
list and presets row for `hatched` (l. 9853, 10074); §8.6 (l. 10590–10622); §11.1's SVG row (l. 11906); II.4 whole
(l. 15354–15388). **File g item 110** (l. 599–653) was read for the raised-way and deck rules the seam turns on.

**How each check was made.** (1) Every pointer one volume makes into another (`V02 §…`, `volume 3`, `X18`, `H10` …) was
followed to its target and the two texts compared. (2) Every record the chain shares — `Block`, `Plot` with `deck`,
`Building`, `BaseWing`, `MassingRef`, `Composition`, `Room`, `Storey`, `StairCore`, `Chimney`, `Entrance`, `Basement`,
`AccessPoint`, `RetainingWall`, the raised-way record — was compared field by field across the three volumes, file f and
the base. (3) Every base change request of V01, V02 and V03 that touches §2.6, §2.8, §4.1, §6.3, §7.1, §7.4, §8.2, §8.6,
§11.1, §14 or §16 was compared with its file-f item, label and notes. (4) Targeted greps confirmed absences
(`partName` in V02: 0 hits; `refus` in V03: 12 hits, each read; the composer-room id rule in V03: none). Working notes:
this session's `scratchpad/volumes/seam23-notes.md`. The first session was cut after §6 (the ledger then read "done" for §7–§8 though neither
existed); a resumed session confirmed the inputs' hashes unchanged, re-read each issue at its cited lines and enclosing
sections, and wrote §7–§8 (notes: `scratchpad/volumes/s23b-*.md`).

## 2 The record chain — block → plot → building → wing → storey → room

| link | producer (volume, section) | consumer (volume, section) | holds? |
|---|---|---|---|
| `Block.content` (`manor`, `square`, `green`, `yard`) → the class mix and the compound site plan | V01 V1-3.5.10, BCR-9 | the base's S10b/S11; V02's `manor` override row (V2 §3.10.3, `dwelling-compound`) | yes |
| a deck plot (`Plot.deck`, file f item 246) → `DeckContext` → the `@deck` rows, the datum, no cellar | the base (item 110 (d)); V01 V1-3.17.6 (the owner district) | V02 §2.6, §3.16; V03 3.7.2 (0) | yes |
| the under-deck strip → no plot, no building | V01 V1-3.17.3 (2), V1-3.17.4 | V02 §3.17 (b) keeps "lower" buildings under a new deck | **no — S23-01** |
| `BaseWing.key`, `role`, `on`, `solid`; `MassingRef.stack` | V02 §2.1, §2.6 (BCR-V2-01, -02, -31) | V01 V1-5.1.3 (stack order); V03 3.3 (level reading) | yes, except a terrace read from `MassingRef.stack` (S23-12) |
| `BaseWing.partName` | V03 BCR-V3-13 (the base outline builder writes it) | V03 A5 (e), 3.7.4; V02 M8 (e) | **no lifecycle, no export, unnamed in V02 — S23-15, S23-33** |
| wing references by key (`Room.wing`, `StairCore.wing`, `Chimney.wing`, `Storey.wings`, `ProgramRoom.wing`, `Entrance.wing`) | V02 BCR-V2-27 | V03 3.1 ("wings are named by their key") | yes, but `StairCore.tower` is still an index (S23-09) and V03's core and chimney ids use the wing index (S23-13) |
| `Composition.rooms` (`hall`, `gatehall`, `chapel`, `towerRoom`) → fixed rings of the plan | V02 §3.8 | V03 A2 (11), E2, the role table | roles yes; **ids no — S23-14**; the hall at a poor band **no — S23-16** |
| `DormerRow` ↔ the plan's top-storey rooms | V02 §3.7 (precedence), §2.2 | V03 W4 | yes |
| `facadeBays` → windows, dormers, lit windows | V02 §3.7 | V03 W2 | eave sides yes; other sides restated (S23-30) |
| the crypt: seed wings → `Basement.crypt` → rank → the raised lift | V02 §3.14.5 (seed, lift, BCR-V2-28); V03 3.7.4 (BCR-V3-20) | V03 3.7.5–3.7.6; V01 V1-3.7.1 (no place); V04 | the rule yes; the seed function unnamed (S23-31); the milestones split (S23-20) |
| `Basement` floors → `floorCm` below ground, the dig floor | the base §2.6 (a half cellar at `baseCm − depth ÷ 2`) | V03 3.3 (`floorCm`); V02 §3.14.5 (a) (dig floor) | **no — both use the full depth, S23-10, S23-11** |
| `Entrance.storey`, the solid stack's root | V03 BCR-V3-26; V02 BCR-V2-41 | V03 S6, O2; V02 ST7 | yes (file f item 241 dedupes rule 5) |
| a building-hosted `AccessPoint` → the surface symbol and the plan head | V04; V01 V1-3.8.8 (symbol at `ground.at`); V03 3.7.2 (head within 3 m of it) | the map at the neighbourhood and building bands | **no — the symbol sits under the roof and doubles the head, S23-05** |

## 3 The elaboration ladder — bands, rungs, clicks and staleness

The chain of rungs is the base's (§2.6: outline → wings → rooms → plan; §4.1's trigger policy; J-A28.42). What each volume
says a gesture does:

| gesture | V01 | V02 | V03 | the base |
|---|---|---|---|---|
| click on a district at the city or district band | close-up + `wings` (V1-3.8.1) | "a neighbourhood click" → `wings` (V2 §3.1, §3.11) | — | "clicking a neighbourhood derives its close-up and raises the `wings` rung" (§4.1) |
| click on a building | — | `wings`, then `rooms`, then `plan` (V2 §3.11); but §0: "rooms; a second click gives the plan" | selects it, derives `wings` then `plan` (4.5) | "clicking a building raises its `plan` rung … after `wings`" |
| a click on a building **at the district band** | a district click | — | a building click | unassigned — **S23-18** |
| an outline close-up (V1-3.8.9) | close-ups of the districts and hinterland faces met | not a `wings` trigger | — | — (**S23-29**) |
| `view` | close-ups of visible tiles at the neighbourhood band | `wings` at the neighbourhood band and finer | plans at 1:350 and finer, ≤ 64 | per band request |

**Staleness.** V02 narrows the `wings` rung's recorded inputs to `wingsInputs` (BCR-V2-13) and requires a relet, a use
change, an access, a band drift and a Works stage to leave it current (T-V2-21); the base's §4.1 list (l. 3834–3838) and
§2.8's `stale` sentence (l. 2037–2040) still stale every derived rung on the band, the households, an access and the Works
stage, and V03's BCR-V3-19 and -28 add accesses, the crypt, retaining walls, terrain, decks and host chambers to that
unscoped list (**S23-06, S23-39**).

**Drawing across bands.** City: masses (all three agree). District: the base's `hatched` cell and V01 say
`fakeGablePerWing` over the stored wings; V02 draws the massing's roofscape in `ink`, `lit` and `hatched` from M6a
(**S23-02, S23-03**). Neighbourhood: V01's hatch per wing (world pitch, per roof kind) against V02's "each facet …
stopping at valley lines". Building: the plan as `ink`'s in `hatched` — V01 V1-5.1.1 and V03 5.1 agree.

## 4 Classes, rows, terms, ids and units across the seam

**Classes and rows — agreed.** One class id resolves each building in all three volumes (V11's registry; V02 §3.2's
chain; V03 A1's resolution by class id, specialisation, split half, family, building class). The `manor` block of V01
V1-3.5.10 draws a `compound`-arrangement class, which V02 composes by its `manor` override of `dwelling-compound` and V03
programmes by its `manor` class row. V02 §3.8's four composer roles exist in V03's role table under V02's spelling
(`hall`, `gatehall`, `chapel`, `towerRoom`, V03 2.4). The arena, the conduit house and the three stepped forms have rows
on both sides (V02 §3.10.3, §3.15.4; V03 2.4's class-id rows). **Disagreements:** the dwelling class's own rooms at a
non-`house` form (S23-16); "church-class" used by V01 without V03's definition (S23-22).

**Terms.** "Court": V01's `HoodPlace` court is a block's court residue (§4.7 S10 (6)); V02's court is a footprint hole
typed as a yard part `court` (BCR-V2-24) — distinct, and V01's `plotYard` pin site admits the second (S23-24). A retaining
wall "drawn" (V01) is the record's `source: 'declared'` (file f item 245; S23-04). A deck basement request's cause
`deckRefusal` (IN-V03-1) names a bend (S23-17).

**Ids.** Room addresses `room:<building>/<level>/<i>` are the base's; V02 fixes `i` for the composer's rooms and V03 never
says how the plan's read-back numbers the rest or that a composer room keeps its id (S23-14). V03's `core:` and `chim:`
ids use the wing index (S23-13). `StairCore.tower` stays an index into `Composition.towers` (S23-09).

**Units and constants.** A half cellar's floor: base `baseCm − depth ÷ 2`, V02 and V03 `baseCm − floors × depth`
(S23-10, S23-11). One stair's treads: V02's roof drawing every `treadM` 0.3 m, V02's glTF `⌈rise ÷ riserMaxCm⌉` risers of
20 cm, V03's plan every `goingCm` 23 cm (S23-07). `raised.clearCm` 250 cm (V02) against V11's `clearanceCm` (the
crossed class's soffit clearance V01 reads) — retired with S23-01. Storey heights: V02's J-V2.85 and V03 3.3 agree
(a principal first storey on every tier; `h` scaled to `E(w) = deckLevel(w) − baseCm`).

## 5 Wiring across the seam

| piece | produced by | consumed by | status |
|---|---|---|---|
| `Composition.rooms` | V02 §3.8 (the `rooms` rung) | V03 A2 (11), E2 | produced only when V03's click derives `rooms`; V03 4.5 and 4.6 omit it (S23-34) |
| `DormerRow.count` (unedited) | V03 W4 | V02 §3.7's precedence | wired |
| `facadeBays(w, eave)` | V02 §3.7 | V03 W2 (eave sides), §8.4's lit windows | wired for eaves; V03 restates a partial law for other sides (S23-30) |
| `cryptSeedWings` (the east-range seed) | V02 §3.14.5 (c) in prose | BCR-V3-20's basement function, V03 3.7.4 step 1 | no named function (S23-31) |
| `BaseWing.partName` | the base outline builder (BCR-V3-13) | V03 A5 (e), 3.7.4; V02 M8 (e) | no lifecycle row, no export, unnamed by V02 (S23-15, S23-33) |
| `stairChain`, `landingSide`, `storeyRange`, `deckLevel` | V02 §2.6 (@plat/plots, M3a) | V03 3.3, S5–S6, 3.4a | wired |
| the terrace `T(x)` | V03 3.4a | V03's draw, VTT, JSON | reads `MassingRef.stack.lowerRoof`/`top`, which a roof `setAttr` leaves stale (S23-12) |
| `W_TIER_UNREACHED` | V03 S6 (e) | V02 §4.6's `none` line, V10 | wired |
| the tier edit's orphan preview | V03 4.2 (the stored plan's rooms) | V02 §4.6 dry run (IN-V02-2 (c)) | wired |
| the stair tread law | V02 §5.6 (`treadM`), glTF risers | V01 V1-5.1.2, V03 5.1's exterior flights | three laws (S23-07) |
| building-hosted `AccessPoint` marks | V04's records | V01 V1-3.8.8's symbol; V03 3.7.2's head | double and occluded (S23-05) |
| the outline close-up | V01 V1-3.8.9 | V02's `wings` trigger | not consumed (S23-29) |
| the porch at the main entrance | V02 §3.7 (lazy) | V01's hood-pin clearance | not consumed (S23-23) |
| item 447's GeoJSON names | file f (J-VI.18) | V01 §5.3, V02 §5.5–§5.6 | V01 contradicts, V02 omits (S23-04, S23-32) |
| the plan rung's package and price | V03 §8 | §14 (file f item 505), §16 | unwired (S23-37, S23-19) |

Nothing else across the seam is produced without a consumer or consumed without a producer: every other pointer of §1b
of each volume into a sibling was followed to a text that states it.

## 6 Base change requests across the seam (file f)

| file f item | request(s) | finding |
|---|---|---|
| 226 · 234 · 238 | BCR-V2-28 (BASE, "with item 109 (k)'s crypt rule") · BCR-V3-13 and BCR-V3-20 (STAGED, "the plan rung, after M6b") | the crypt chain is split across two milestones although BCR-V2-28 applies "whether or not stage 3 has registered" and reads BCR-V3-20's seed rule, and V02 M8 (e) reads `partName` at M6a (S23-20) |
| 261 (BCR-V2-13) with 235 · 237 · 263 (BCR-V3-15, -19, -28) | the rungs' recorded inputs | the base's stale lists in §2.8 and §4.1 are not narrowed to the rung (S23-06, S23-39) |
| 305 | BCR-V2-34 ("every form fails at once and (4) applies, naming the deck") | a refusal with no bend for rule R-a to write (S23-17) |
| 351 · 352 · 374 | BCR-V2-12, BCR-V3-3, BCR-V3-4 | both insert after `setRoomUnit` and edit the buildings row, no application note (S23-21) |
| 406 (BCR-V2-15) with 405 (V01 BCR-14) | roofscape as every family's default; the `hatched` neighbourhood cell | §8.2's presets table and II.4's "two-tone roofs over the stored wings" left unamended (S23-03) |
| 447 | GeoJSON names | V01 §5.3 not conformed (S23-04); V02's rows omit the building properties (S23-32) |
| 449 (BCR-V2-21) | exports | V02's per-building SVG groups contradict §11.1's convention with no request (S23-08) |
| 505 | the §14 package list | the plan rung's home in `@plat/buildings` not named (S23-37) |
| 524 · 525 (BCR-V2-20, -37) and 474 (V01 BCR-19) | §16 | the plan rung has no line, and V01 and V02 each rewrite §16's total from the same current value (S23-19) |
| 560 · 564 | V01 BCR-36, V04 BCR-36 | one sentence rewritten twice, no dedupe — seam-layers-r0 SL-17's finding, not repeated here |
| 241 · 230 | BCR-V3-26 with BCR-V2-41 | deduped correctly (rule 5 carried once) |
| 346 · 347 | BCR-V2-11, BCR-V3-29 | ordered correctly (the note is present) |

## 7 Issue register (S23-01 … S23-40)

Each issue was re-read at the cited lines in the resumed session (inputs unchanged since the first read: V01 md5
9723667f…, V02 ba65e82f…, V03 ab275ff1…, file f 7e76cc92…, `ARCHITECTURE.md` 01fea21f…). Owners apply the required change
in their next revision; BASE-F means a file-f item (or the request it names) must change. Counts: **1 blocker, 21 major,
18 minor.**

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23-01 | blocker | V02 | contradiction (g 110 (b); V01) | an added raised way keeps "lower" buildings under its deck |
| S23-02 | major | V01 | contradiction (V02) | the `hatched` roof construction and hatch after M6a are two different ones |
| S23-03 | minor | V02 (BCR-V2-15; f 406) | base text left stale | §8.2's `hatched` district cell and II.4 still say `fakeGablePerWing` over stored wings |
| S23-04 | major | V01 | contradiction (base, f 447) | V01 §5.3's GeoJSON names for walls, raised ways, piers |
| S23-05 | major | V01 | contradiction / double mark (V03) | building-hosted accesses drawn as surface symbols under the roof and beside the plan's head |
| S23-06 | major | V02 (BCR-V2-13) | contradiction (base §2.8, §4.1) | the base's stale lists still stale the `wings` rung on band, households, access, Works |
| S23-07 | major | V02 | three laws for one thing | one stair flight drawn with three tread counts |
| S23-08 | major | V02 | contradiction (base §11.1) | V02's SVG groups per building against §11.1's compound path per (semantic, district) |
| S23-09 | major | V02 (BCR-V2-27) | identity | `StairCore.tower` stays an index into `Composition.towers` |
| S23-10 | major | V02 (BCR-V2-28) | contradiction (base §2.6; V03) | a half cellar's floor: the gate's datum − depth/2 against V02/V03's full depth |
| S23-11 | minor | V03 | consequence of S23-10 | V03's basement datum and bars do not name the half raise |
| S23-12 | major | V03 | stale read (V02 §4.6) | the roof terrace read from `MassingRef.stack`, which a roof `setAttr` leaves stale |
| S23-13 | major | V03 | identity (BCR-V2-27) | core and chimney ids by wing index |
| S23-14 | major | V03 | identity (V02 §3.8) | no minting rule for plan room ids beside the composer's |
| S23-15 | major | V03 (BCR-V3-13) | lifecycle | `BaseWing.partName` has no lifecycle row, migration or export |
| S23-16 | major | V03 | contradiction (V02 §3.8, J-V2.36) | the manor's hall and principal rooms at a poor band |
| S23-17 | major | V03 + BASE-F (f 305) | owner rule (item 101 R2) | the deck basement request still refused; the bend named is the wrong one |
| S23-18 | major | V03 | gesture unassigned (V01) | a click on a building at the district band |
| S23-19 | major | V03 + BASE-F (f 474, 524) | build plan | the plan rung has no §16 line; V01 and V02 rewrite one total separately |
| S23-20 | major | BASE-F (f 226, 234, 238) | milestone split | the crypt chain labelled BASE, STAGED-after-M6b and M6a at once |
| S23-21 | minor | BASE-F (f 351, 352, 374) | application order | two requests insert at one anchor of §7.1 with no order note |
| S23-22 | minor | V01 | term | "church-class" used without its definition, and in base text |
| S23-23 | major | V01 | unwired (V02 porch, V03 stoop) | hood pins do not clear the porch and the entrance steps |
| S23-24 | minor | V01 | term / site kind (V02 court) | `plotYard` admits the arena floor and footprint courts unqualified |
| S23-25 | minor | V01 | stale read (V02 §4.6) | the hook table reads `MassingRef.stack.lowerRoof` for the hatch; ties "by wing order" |
| S23-26 | minor | V03 | owner rule (item 101 R2) | `instance` on a room still refused when the room is full |
| S23-27 | minor | V03 | unwired (V02 F-COMPOSE (3)) | an omitted gate hall or tower room is placed by no programme row |
| S23-28 | minor | V02 | wording (V02 §3.11; V03 §0) | §0 says one click gives rooms and a second the plan |
| S23-29 | minor | V01 | trigger unassigned (V02) | the outline close-up raises no `wings` rung |
| S23-30 | minor | V02 | restated partial law (V03 W2) | `facadeBays` on sides other than eaves |
| S23-31 | major | V02 | unwired / unnamed (V03, BCR-V3-20) | the crypt's seed wings have no function; "where a composition's massing names them" names no field |
| S23-32 | minor | V02 | omission (f 447) | V02's GeoJSON rows do not point at `onDeck`, `deck`, `tiers` |
| S23-33 | minor | V02 | unwired (BCR-V3-13) | V02's record and writers never name `partName` |
| S23-34 | major | V03 | unwired (V02 §3.8) | the click and the `plan` query derive `wings` then `plan`, skipping `rooms` |
| S23-35 | minor | V02 | build order (V03 Q1) | "the plan rung waits on M6b" stated unconditionally |
| S23-36 | minor | V03 | double ownership (V02) | P1 would ship V02's `facadeBays` and constants |
| S23-37 | minor | V03 | package (f 505) | the plan rung's home `@plat/buildings` is in no §14 line |
| S23-38 | major | V02 | build-order cycle (V03) | M6b's exit bar T-V2-35 needs V03's plan and hall rows, which follow M6b |
| S23-39 | minor | V03 (BCR-V3-15, -19, -28) | consequence of S23-06 | V03's additions extend the unscoped stale list |
| S23-40 | minor | V02 | unwired (V03 3.11) | `setMassing`'s dry run and commit name no stored-plan re-cut or orphan list but for `tiers` |

### S23-01 — blocker — owner V02 — an added raised way keeps "lower" buildings under its deck

**Claim.** V02 §3.17 (b) (l. 2266–2270): "when the user adds one, or an epoch raises one (volume 6), the buildings whose
footprint meets a pier, or meets the strip under the deck with its envelope top above the deck's underside less
`raised.clearCm` (250 cm, own), take the base's least-disruption fates; **lower ones stay**". Against it: file g item 110
(b) (l. 617) — the spaces between piers "stay open or hold the base's vaults (II.7.6)" (an owner rule); V01 V1-3.17.3 (2)
(l. 1982–1988) — the under-deck strip is a hole: "no plot, block interior, seed or hood pin lies in it"; V1-3.17.4
(l. 2008–2013) — a part added later "removes the plots under its piers and strip"; and V02's own previous sentence
(l. 2264–2265: the piers and strip "are obstacles the base's plots avoid … so no `H` meets them"). Generation and the add
path disagree, so a way regenerated at the same address places nothing the add path kept. The same finding is
seam-time-r0 ST-08 (rated major there); it is a blocker here because the kept buildings break the owner's rule text.
**Required change (V02).** §3.17 (b): replace "the buildings whose footprint meets a pier, or meets the strip under the deck
with its envelope top above the deck's underside less `raised.clearCm` (250 cm, own), take the base's least-disruption
fates; lower ones stay" with "every building whose footprint meets a pier or the under-deck strip (V01 V1-3.17.3 (2))
takes the base's least-disruption fates, its plot removed by V01 V1-3.17.4's add path"; withdraw `raised.clearCm` from
§1b (l. 252), §3.10's constants (l. 1810), §12 (l. 3864) and X23's clause (l. 3908); the least soffit over a crossed way
stays volume 11's `raisedWays.structure.clearanceCm`, which V01 reads. One fix closes ST-08 as well.

### S23-02 — major — owner V01 — the `hatched` roof construction and hatch after M6a

**Claim.** V02 §5.3 (l. 2644) makes `'roofscape'` "the default construction of every shipped family from stage 3's
landing", M6a's exit draws "the `roofscape` construction in `ink`, `lit` and `hatched` at the district band" (l. 3160),
and §5.3's hatch bullet (l. 2663) has `hatched` hatch "each facet parallel to its ridge … stopping at valley lines".
V01 V1-5.1.1 (l. 2234) keeps "two-tone roofs by `fakeGablePerWing` over the stored wings" at the district band, and
V1-5.1.2 (l. 2251–2270) hatches "per wing, lines parallel to its ridge … across the whole footprint", with its own rules
per `RoofSpec.kind` (a pyramid's lines parallel to each face's eave). V01 never states the switch at M6a, and V02's
bullet restates a partial law (no rule for hip, pyramid, pent-band or flat facets). IN-V01-3 ("until M6b the NG parity
sheet keeps `fakeGablePerWing`") and V02 X14 / §5.3 ("re-measured … at M6b; fallback: the NG parity sheet keeps
`fakeGablePerWing`") describe the parity sheet differently between M6a and M6b.
**Required change (V01; V02 conforms by citation).** V1-5.1.1's district cell: "two-tone roofs by the sheet's
`roofConstruction` — `fakeGablePerWing` over the stored wings until stage 3 registers, then `roofscape('twoTone')` over
each building's facets (V02 §5.2–§5.3)". V1-5.1.2's *Hatch*: the law runs **per roof facet** — over `fakeGablePerWing`'s
two faces per wing before stage 3, over the roofscape's facets after — a long facet's lines parallel to its wing's ridge,
a hip, pyramid, pent-band or skeleton facet's parallel to its eave, a flat facet's parallel to its wing's OBB major axis,
a cone's or dome's as the rings already stated; every line clipped to its facet (so it stops at valley lines, at hip
lines and at the rings of wings standing on the wing); the two ridge tapers per ridge-bearing wing unchanged; the census
still counts per wing. V02 §5.3's `hatch` bullet then reads "the `hatched` family's hatch program is volume 1's
(V1-5.1.2), run per roofscape facet; the `FM` look hatches parallel to the eave at a fixed paper pitch (0.9 px)". One
sentence, in V01 V1-7's NG bars and V02 X14 alike: "from M6a the NG parity sheet keeps `fakeGablePerWing`; at M6b the NG
bars are re-measured on `roofscape` and the sheet switches to it when they pass, else keeps `fakeGablePerWing`, reported".

### S23-03 — minor — owner V02 (BCR-V2-15; file f item 406) — base text left stale

**Claim.** BCR-V2-15 adds `'roofscape'` to the `roofConstruction` union and a sentence to §8.6, but leaves §8.2's presets
table `hatched` district cell (base l. 10074: "two-tone roofs by `fakeGablePerWing`") and II.4's *Render tier* sentence
("two-tone roofs over the stored wings") unamended; V01 BCR-14 (file f 405) edits only the neighbourhood cell. An
implementer holding the base alone draws the old construction after stage 3.
**Required change (V02).** BCR-V2-15 gains: in §8.2's presets table, the `hatched` district cell current "two-tone roofs
by `fakeGablePerWing`" → "two-tone roofs by `fakeGablePerWing`; by `roofscape` once stage 3 registers (volume 2 §5.3)";
in II.4's *Render tier*, current "two-tone roofs over the stored wings" → "two-tone roofs over the stored wings (over the
roofscape's facets once stage 3 registers, volume 2 §5.2)". File f item 406's note: applied after item 405.

### S23-04 — major — owner V01 — V01 §5.3's GeoJSON names

**Claim.** V01 §5.3 (l. 2434) exports "each `RetainingWall` as a LineString `{ kind: 'retainingWall', source, material,
stepCm: [the derived profile] }`; raised parts as LineStrings with `part` and `raised: true`; piers as Polygons". File f
item 447 (J-VI.18) fixes one text for both GeoJSON variants: kind `retaining` with `highSide`, `stepMinCm`, `stepMaxCm`,
`material`, `state`; `part` on every way; a raised way's `raisedKind`, `source`, `reason`, `deckMinCm`, `deckMaxCm`;
supports as kind `raisedSupport` (`way`, `key`, `state`); spans as kind `span` (`use`); `stair` and `ramp` flags; `onDeck`
and `deck` on deck plots and buildings. V01's prose also calls a user's wall "drawn" where the record's value is
`source: 'declared'` (file f item 245). Same finding as seam-layers-r0 SL-20.
**Required change (V01).** §5.3's GeoJSON cell replaces the three clauses with "retaining walls, raised ways, their
supports and spans, stairs and ramps, and deck plots and buildings as file f item 447 states them (cited, never
restated)"; wherever V01 names the record's value, "drawn" reads `declared`. One fix closes SL-20.

### S23-05 — major — owner V01 — building-hosted accesses drawn twice or under the roof

**Claim.** V01 V1-3.8.8 (l. 1557–1563) draws **every** ground `AccessPoint` whose `ground.host` lies in the opened area
at `ground.at` in the pins slot (slot 10, under the buildings' slot 12), including "a building's dug access … on its plot"
and a `secret` access "at the building band". The base's `ground.host` may be "a building (for a basement access, its
basement)" (base l. 15877). At the neighbourhood band such a symbol lies under its roof; at the building band V03 3.7.2
(5) (l. 1444–1447) draws the access's **head**, up to `access.snapCm` (3 m) or more from `ground.at` ("the head is the
drawn position at the building band"), so the plan shows two marks for one access.
**Required change (V01).** V1-3.8.8: "…whose `ground.host` is a ground face (a corridor, square, yard or outside face)
in the opened area is drawn at `ground.at` …; an access whose `ground.host` is a building or its basement draws no
surface symbol — its roof covers it at the neighbourhood band, and at the building band the plan draws its head (V03
3.7.2 (5), 3.7.3, 5.1; a `secret` head by V03 5.4)"; the clause "a building's dug access shows on its plot only for a key
that admits it" is deleted; V1-3.8.2 step 5's clearance reads the drawn symbols only (a building-hosted access lies in
a footprint the step already clears).

### S23-06 — major — owner V02 (BCR-V2-13) — the base's stale lists are not narrowed per rung

**Claim.** V02 §3.11 (l. 1827–1838) and J-V2.52 make the `wings` rung's inputs exactly `wingsInputs` — "a relet, a
household move, a use change, an access, a facility, a band drift, a Works stage … leaves the rung `current`"
(T-V2-21). BCR-V2-13 writes that rule into the `slices` comment of §2.8's `ElaborationRecord` only. The record's
`inputs` comment ("for a building: its leaf digest (wings, heights, entrances, basement, class, use, assignment,
facilities, the wings' spans) … the occupants' band … the accesses … its running Works' stage … the households")
(base l. 2033), §2.8's `stale` sentence (l. 2037–2040) and §4.1's list (l. 3835–3837) still stale every derived rung of
the building on those inputs. An implementer following the base stales `wings` on every relet and fails T-V2-21.
**Required change (V02).** BCR-V2-13 amends, besides the `slices` comment: the `inputs` comment — "for a building, per
rung: `wings` — volume 2's `wingsInputs` (§3.11 there); `rooms` — `wingsInputs`, the occupants' band row and value, the
household count and the programme's hall row; `plan` — its leaf digest (…the current list…)"; the `stale` sentence —
"`stale`: an input **of that rung** changed (the per-rung lists of `inputs`) — …"; and §4.1's list, current "a batch that
changes one of its recorded inputs — a designation, an assignment, the band, …" → "a batch that changes one of the
rung's recorded inputs (§2.8's per-rung lists) — for the `plan` rung a designation, an assignment, the band, …".

### S23-07 — major — owner V02 — three tread laws for one flight

**Claim.** One exterior flight (a stair wing of a stack) is drawn on the map with a tread line "every `treadM` (0.3 m) of
plan" (V02 §5.6, l. 2703), exported as "`⌈rise ÷ riserMaxCm⌉` equal risers and treads" (l. 2717; `riserMaxCm` 20 cm), drawn
in the plan with "treads at `goingCm`" (V03 5.1, l. 1925; `goingCm` 23 cm), and hatched by `hatched` "at the stair's
world tread depth" (V01 V1-5.1.2, l. 2274), which none defines. At the grade V02 draws (up to `stairGradeMax` 1.3) the
three counts differ by up to half.
**Required change (V02; V01 and V03 cite).** V02 §2.6 declares one derived function, `stairTreads(w): { n: number;
goingCm: Cm }` for a stair wing — `n = ⌈rise ÷ riserMaxCm⌉`, `goingCm = ⌊run ÷ n⌋` by §6.5's integer arithmetic, `rise`
and `run` the flight's own — read by `stairFlight` (n − 1 tread lines at `goingCm`; below 2 px per tread omitted, as
now), the glTF, OBJ and CityJSON stair solids, V01 V1-5.1.2's stair-flight hatch and V03 5.1's exterior flights;
`treadM` is withdrawn (§1b l. 266, the constants l. 1811). V03 5.1 reads "treads by volume 2's `stairTreads`" for
exterior flights (its own `goingCm` stays for interior stairs, S1); V01 V1-5.1.2 reads "its treads by V02's
`stairTreads`".

### S23-08 — major — owner V02 — SVG groups against §11.1

**Claim.** V02 §5.5 (l. 2686): "at the district band and finer, one group per building: the roofscape facets grouped by
part and its lines, `data-wing` attributes carrying wing keys". The base's SVG row (l. 11906): groups "per layer and
semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index
ranges to entity ids, so every entity stays addressable without an element each", under §12.7's element budgets.
BCR-V2-21 does not touch the SVG row, so the two rules stand side by side. V03 5.2 and V01 §5.3 follow the base.
**Required change (V02).** §5.5's SVG cell: "the roofscape facets in `sem.building.roof` (and `sem.building.roof.dormer`,
`.porch`, `.tower`, `.cupola`; step 5's lines in `sem.building.roofline`), one compound path per (semantic, district) as
§11.1 states; the `<metadata>` map carries each subpath range to its wing address `wing:<building>/<key>` (replacing
`data-wing`)"; BCR-V2-21 gains the SVG row's clause "the stage-3 semantics above".

### S23-09 — major — owner V02 (BCR-V2-27) — `StairCore.tower` stays an index

**Claim.** The base's `StairCore` (l. 1174) has `tower?: number /* index into Composition.towers: a spiral in a round
wing */`. BCR-V2-27 turns `Room.wing`, `StairCore.wing`, `Chimney.wing`, `Storey.wings`, `ProgramRoom.wing` and
`Entrance.wing` into base wing keys (V02 l. 440–446) but not `StairCore.tower`; `Composition.towers` is re-derived from
the massing's towers (V02 §2.2), so removing a tower shifts every later index and a stored plan's spiral names the
wrong tower, failing T-V2-34 ("every stored … stair core … keeps its wing").
**Required change (V02).** BCR-V2-27's list gains: in `interface StairCore`, current "`tower?: number /* index into
Composition.towers: a spiral in a round wing */`" → "`tower?: number /* the key of the tower wing (BaseWing.key) whose
round room holds this spiral; Composition.towers is looked up by base key, never by position */`"; V02 l. 441's list
names `StairCore.tower`.

### S23-10 — major — owner V02 (BCR-V2-28) — a half cellar's floor

**Claim.** The base's terrain gate defines a half cellar by its floor, "the wing's `baseCm` less half the cellar depth"
(l. 1530), yet the same paragraph gives every basement "its floor `baseCm` less the depth per storey" (l. 1535). V02's
dig floor is "`baseCm − Basement.floors × cellar.depthCm`" (§3.14.5 (a), l. 1938–1940) and V03's storey datum for
`s < 0` "the `baseCm` of the ground wing above less `|s| × cellar.depthCm`" (3.3, l. 1061–1062): both put a half cellar's
floor a full depth down — below the water table the gate chose the half form to avoid. V03 W2 (l. 1377–1379) meanwhile
gives "a half cellar" `light` windows by its exposure (`baseCm` less the outside ground), which is ~0 when `baseCm` is
the datum. The half form has no consistent section.
**Required change (V02).** BCR-V2-28's *Basements* text adds: "A `half` basement raises the ground wings standing over
its ring by `cellar.depthCm ÷ 2` above the datum `deriveBase` gives, as the crawl form raises its storey — written by the
basement step as those wings' `Heights.baseCm` (through `rebaseStack` for a stack) — so its floor, `baseCm` less the depth
per storey, lies at the datum less half the depth, the floor the gate tests; for a crypt-only half basement only the seed
wings over the crypt's ring are raised (a raised choir over a half-sunk crypt)." V02 §3.14.5 (a)'s formula and V03 3.3's
then hold unchanged; `rebaseStack`'s pass (1) lists "the half cellar's raise" beside the crypt lift. Declared one-time
shift: buildings with a half cellar stand `depthCm ÷ 2` higher from the milestone that lands the rule (J-S23.2).

### S23-11 — minor — owner V03 — the basement datum and bars under S23-10

**Claim.** V03 3.3's `s < 0` sentence, 3.7.4's `half` crypt form and T-V3-30 name no source for a half basement's raised
`baseCm`; after S23-10 a reader cannot tell why level 0 of such a building stands above its datum.
**Required change (V03).** 3.3, after "less `|s| × cellar.depthCm`": "(for a `half` basement, the `baseCm` the basement
step raised by `cellar.depthCm ÷ 2`, BCR-V2-28; for a crypt-only half form, the seed wings' only — the choir flights of
3.7.6 (c) then climb the difference)"; T-V3-30 gains a half-cellar fixture: floor at the datum less half the depth within
1 cm, its walls' `light` windows present, the main entrance's stoop drawn.

### S23-12 — major — owner V03 — the roof terrace read from `MassingRef.stack`

**Claim.** V03 3.4a (l. 1177–1178) makes a terrace of "every wing `x` whose roof is flat — volume 2's
`MassingRef.stack.lowerRoof` `flat` below the top tier, its `top` `flat` or `shrine` at the top". V02 §4.6 (3)
(l. 2498–2502) lets `setAttr(wings/<key>/roof)` turn a lower tier to its pent kind or the top tier to `hip`, `pyramid` or
`cone`, and "`MassingRef.stack.lowerRoof` stays the laid default that a later `tiers` re-lay applies". After such an edit
V03 plans a walkable terrace on a pitched roof (or none on a tier set flat).
**Required change (V03).** 3.4a's first sentence: "For every wing `x` whose own roof kind (`RoofSpec.kind` on `x`) is
`flat` — whether laid (`MassingRef.stack.lowerRoof`, `top`) or set by an edit (V2 §4.6 (3)) — or that is solid with a
flat top …"; `MassingRef.stack` is read only for the shrine's identity (`top: 'shrine'`).

### S23-13 — major — owner V03 — core and chimney ids by wing index

**Claim.** V03 §2.2 (l. 441–442): a stair core is `core:<building>/<k>`, "k by wing index then bay's lowest-leftmost
lattice point", a chimney `chim:<building>/<k>`, "k by wing then column point". Under stage 3 wings are named by key and
kept in the canonical order (towers first; BCR-V2-27), so adding or removing a wing renumbers every later core and
chimney of a stored plan — the ids plan events name — although V03 3.1 itself says wings are "named by their key …
and ordered by key" (l. 889–891).
**Required change (V03).** §2.2: stair core `core:<building>/<wing key>/<j>`, `j` the rank of the bay's lowest-leftmost
lattice point among that wing's cores; chimney `chim:<building>/<wing key>/<j>`, `j` by column point; re-match unchanged.
No migration (V03 is unbuilt).

### S23-14 — major — owner V03 — plan room ids beside the composer's

**Claim.** V02 §3.8 (l. 1392–1393) fixes the composer's room ids: "`room:<building>/<level>/<i>`, `i` in the order hall, gate
hall, chapel, then the tower rooms by tower key", passed to the plan as fixed rings. V03 §2.2 (l. 430–436) keeps the
base's address but never says how the plan mints `i` for its other rooms, nor that a composer room keeps V02's `i`; V03
A2 (11) matches a composer room to a `ProgramRoom` (l. 960–962) without an id rule. Two rooms of one level can take one
id, and a composer room can change id between the `rooms` rung and the plan.
**Required change (V03).** §2.2's first paragraph adds: "A composer room keeps the id the `rooms` rung gave it (V02 §3.8).
Every other room of a level is minted `i = c + r`, `c` the count of composer rooms on that level and `r` its rank in
`readBack`'s canonical face order; a stored plan's re-cut keeps each kept room's id (3.11) and mints a new room from the
level's highest `i` + 1, never re-using an id."

### S23-15 — major — owner V03 (BCR-V3-13) — `BaseWing.partName` has no lifecycle

**Claim.** BCR-V3-13 adds `BaseWing.partName?: string`, "written by the outline builder and carried with the wing", read
by A5 (e), the crypt's seed (3.7.4) and V02's M8 (e) crossing tower (l. 1121–1123). No lifecycle row states its create,
read, persist, regenerate, undo and migrate (V03 §2.5 has none), no export carries it, and no writer other than the
outline builder is told what to do with it (V02's side: S23-33).
**Required change (V03).** §2.5 gains the row: create — the base outline builder at S11 from the template part (BCR-V3-13);
V02's M0 (d) passes it through; the wing writers keep it on the wing that keeps its key (a re-joined block keeps the
lowest key's), a new wing has none · read — A5 (e), 3.7.4, V02 M8 (e), the why provider · persist — in `Building.wings`,
in the leaf digest · regenerate — re-derived with the template · undo — restored with the wings · migrate — a document
without it re-derives it at load for template-family buildings by matching each wing's ring to its template part, else
absent (reported). BCR-V3-13 adds the JSON schema's wing record field `partName`.

### S23-16 — major — owner V03 — the manor's own rooms at a poor band

**Claim.** V02 §3.8 (l. 1359–1366; J-V2.36; T-V2-35): the hall and chapel are emitted "only where the interior-ladder row at
the occupants' band gives the unit form `house`"; "a rich manor whose occupants fall to the poor band has no hall ring, and
its main range divides into the units the ladder asks". V03's `manor` class row (l. 644) makes `hall`, `solar`,
`parlour`, `kitchen`, `buttery` hard at every band, and A2 (4) (l. 939–942) adds class rooms at band `b` besides the units
of A2 (1): a divided manor still gets a hard hall and solar, which the rooms rung has withdrawn.
**Required change (V03).** A2 (4) adds: "for a dwelling class row (`house`, `cottage`, `row_house`, `manor`), the class's
own rooms apply only where the ladder row's form at band `b` is `house`; at any other form the units of (1) and the
shared rooms of (2) replace them (V02 §3.8's rule, J-V2.36)"; the `manor` row's own-rooms cell notes "(form `house`
only)". T-V3-25 gains the clause "a rich manor at the poor band has no `hall` or `solar` room".

### S23-17 — major — owner V03, with BASE-F (file f item 305) — the deck basement request

**Claim.** V03 §4.2 (l. 1780–1784) still says "every `setAttr(basement)` is the base's deck-gate refusal (BCR-V2-34: 'on a
deck plot the request is refused at once, naming the deck')"; T-V3-11 (iii) and T-V3-31 require "refused with its gate and
one alternative"; P3 builds "the deck refusal"; 1b (l. 161, 267) names "4.2's refusal". BCR-V2-34 as revised (l. 3642)
reads "on a deck plot over water every form fails at once and (4) applies, naming the deck" — the requested-basement
ladder's refusal rung — which is neither a dossier fact nor a lock (item 101 R2; file f's rule R-a), and names no bend for
R-a to write. IN-V03-2 says the request is bent "(volume 2's `bend.deck.single`)" — that id is the family bend "A bridge
carries small, light buildings" (V02 l. 2527), not a basement bend. The plan report's cause `deckRefusal` (IN-V03-1) names
a fact of the deck as a refusal.
**Required change.** *BASE-F (item 305, BCR-V2-34):* "— on a deck plot over water every form fails at once and the request
bends (item 101 R2) to the same request on the nearest building on the ground of its plot group, else of its block
(volume 3 §4.2), named (`bend.deck.basement`)". *V03:* §4.2's deck sentence reads that bend ("A deck over water holds no
cellar: the cellar goes to <building> on the quay"); T-V3-11 (iii) and T-V3-31 read "bends to the nearest ground building
with a basement request, named"; P3 and 1b say "the deck bend"; IN-V03-2's `bend.deck.single` → `bend.deck.basement`,
registered in V02 §1b's bend list (V02 owns the ids) for V09's and V10's words; the cause `deckRefusal` → `deckNoCellar`
(IN-V03-1 and 4.6).

### S23-18 — major — owner V03 (V01 consequential) — a click on a building at the district band

**Claim.** V01 V1-3.8.1 (l. 1452–1453): "a click on a district (at the city or district band) derives its close-up and
raises its buildings' `wings` rung". V03 §4.5 (l. 1848–1851): "A click selects the building, opens the plan panel and …
derives `wings` then `plan`" — at no stated band. At the district band a click on a building is both; the base's §4.1
orders the gestures by the ladder but not by band. V02 §3.11 keeps the district band composition-free.
**Required change (V03; V01 one sentence).** V03 §4.5's *Click and double-click* opens with: "From the neighbourhood band
down, a click selects the building …; at the city and district bands a click on a building is the district's click (V01
V1-3.8.1: its close-up and the `wings` rung), which also selects the building and opens its panel without deriving
`rooms` or `plan`; a double-click, or 'Show plan', at any band zooms to the frame stop and derives the plan". V01
V1-3.8.1 adds: "a click on a building at these bands is this click (V03 §4.5)".

### S23-19 — major — owner V03, with BASE-F (file f items 474, 524) — the plan rung in §16

**Claim.** (a) V03 §8 (l. 2183–2185): the plan rung's 18.75–25.5 pw is "added to the program only when the owner opens
stage 3 — no change to §16's 185.5–248.5 pw"; V03 writes no §16 request, so §16 has no plan-rung milestone although V02
§8.1 schedules it after M6b and file f labels 30-odd items "STAGED (the plan rung, after M6b)". V02 does add its staged
stage 3 as a §16 row (BCR-V2-20) and V01 re-prices M5 (BCR-19): the three volumes treat §16 three ways. (b) V01 BCR-19
(l. 2910) rewrites §16's total "185.5–248.5" → "198.75–266.75"; V02 §8.3 (l. 3168) states "§16's total then reads
202.75–273.25 pw (the base's 185.5–248.5 plus this)". Both start from the same current value and neither includes the
other; file f items 474 and 524 carry no note.
**Required change.** *V03:* a new BCR-V3-30 on `## §16 Build plan …`: a row after BCR-V2-20's M6 row, "`| **M6-P — the plan
rung** (volume 3 §8) | P0 (the spike, may run after M4) … P6 | volume 3 §8's exits; the owner's twenty-plan review |
18.75–25.5 pw |`", a line in the effort table "plan rung (volume 3) | 18.75–25.5 | volume 3 §8", and the staged row's
hooks cell pointer "designed to build depth in `docs/volumes/V03-interiors.md` (milestone M6-P, §16)"; §8's closing
paragraph rewritten to say so; file f relabels V03's STAGED items "STAGED (M6-P, the plan rung)". *BASE-F:* one
consolidated §16 item replaces the hand-computed totals of V01 BCR-19 (d) and V02 §8.3: the coherence pass computes
§16's total once, as the sum of the effort table's lines after every request has added its line, with the staged
milestones (M6, M6-P, M6-U, M6-sky, M6-E, the village and SettlementForge stages) summed in a second "with the staged
stages" line; V01 and V02 cite that total instead of stating one.

### S23-20 — major — owner BASE-F (file f items 226, 234, 238) — the crypt chain's milestones

**Claim.** File f labels BCR-V2-28 (the raised crypt, which "carries" BCR-V3-20's text as its fallback) "BASE (with item
109 (k)'s crypt rule, J111)" (item 226), but BCR-V3-13 (part names, item 234) and BCR-V3-20 (`Basement.crypt` and the
basement function's crypt, item 238) "STAGED (the plan rung, after M6b)". V02 M6a builds "the crypt seed wings and the
raised crypt's lift (BCR-V2-28)" (l. 3160) and M8 (e) reads the part `crossing` at M6a (l. 1121–1122); V03 P2 builds
"`Basement.crypt` with the rank pass" (l. 2151); V03 3.7.4 (l. 1508–1511) has V04's crypt join, the rank, V10's why and
V01's no-place rule read `Basement.crypt` "at generation without elaborating any building"; file g's item 109 is "BASE
design; built with the underground layer as the roadmap stages it" (g l. 596–597). One chain carries three milestones,
and V02 R8 plans for the crypt landing after M6c.
**Required change (BASE-F).** Item 234 (BCR-V3-13) → "BASE (M3a, the base outline builder's templates carry their part
names)"; items 238 (BCR-V3-20) and 226 (BCR-V2-28) → one label, "BASE (item 109 (k)'s crypt rule, built with the
underground layer, M6-U; J111)", item 238 applied before item 226 (226 reads `Basement.crypt` and the seed rule); the
seed function of S23-31 goes with them. V03 §8 P2 drops "`Basement.crypt` with the rank pass" and BCR-V3-20 from its
content (the crypt's plan, columns, stairs and flights stay), re-priced; V02 §8.1's "BCR-V3-20's crypt derivation
(volume 3) before T-V2-36's crypt part" and R8 read "the crypt derivation (M6-U)".

### S23-21 — minor — owner BASE-F (file f items 351, 352, 374) — two requests at one anchor of §7.1

**Claim.** BCR-V2-12 (item 351) inserts `setMassing` and `setComposition` "after" the `setRoomUnit` member of §7.1's
`Edit` union and replaces the buildings row's text; BCR-V3-3 (item 352) inserts `setHearth` "after `setRoomUnit`" too;
BCR-V3-4 (item 374) adds `setHearth` and `instance` to the same buildings row. File f gives no application order, so
the union's member order and the row's text depend on who applies first. (Items 560 and 564 — V01 BCR-36 and V04 BCR-36
on one II.7.6 sentence — are seam-layers-r0 SL-17's and are not repeated here.)
**Required change (BASE-F).** Item 351's note: "Applied before items 352 and 374: in the `Edit` union the members after
`setRoomUnit` read `setMassing`, `setComposition`, then `setHearth`; in the buildings row, item 374 appends `setHearth`
and `instance` on a room's furniture to item 351's new text."

### S23-22 — minor — owner V01 — "church-class" undefined in V01 and in base text

**Claim.** V01 V1-3.7.1 (l. 1391) and BCR-36 (l. 3056) say "never inside a church-class building"; the term is V03's
(J-V3.73: a class whose `crypt` column is `always` or `basement`) and the base defines no such class. BCR-36's text would
enter II.7.6 undefined.
**Required change (V01).** Both places read "a building whose class's `crypt` column is `always` or `basement` (a
church-class building, volume 3 J-V3.73)".

### S23-23 — major — owner V01 — hood pins do not clear the porch and the entrance steps

**Claim.** V1-3.8.2 step 5 (l. 1490–1493) places a hood pin where its disc "clears every footprint, every model pin's
disc, every ground `AccessPoint` symbol's disc …, every way corridor, …"; `plotYard` sites include `forecourt` and `yard`
parts (l. 1464–1466). V02's porch (§3.7, l. 1318–1340; up to `depthM` outward at the main entrance, and the secondary
porch at a side, rear or yard entrance) stands outside the footprint in exactly those parts, raised by the same click
(V02 §3.11), and V03's stoop (O1 (e)) and tomb-door stair (3.7.1) also lie outside the footprint. A well or a tree can
be drawn on a porch or a stair.
**Required change (V01).** Step 5's clearance adds "every entrance's reserve: on the outside of each main entrance, and of
each side, rear or yard entrance, a rectangle `widthM[1]` wide and `depthM[1]` deep of the porch kind rows (V02 §3.7),
centred on the entrance's offset — read from the eager `Entrance` records, never the lazy composition, so the pins stay a
pure function of committed state". The chunk's inputs digest (V1-3.8.3) already holds the footprints; it adds the
buildings' entrance records.

### S23-24 — minor — owner V01 — `plotYard` and the two courts

**Claim.** V02's BCR-V2-24 types every hole of a footprint face as a yard part `court` — a manor's enclosed court and an
`ovalCourt` arena's floor alike (V02 §3.5 M5; V03 2.4's arena row: "the floor is a court, never a room"). V01's
`plotYard` sites (l. 1464–1466) take every yard part of kind `court` ≥ 30 m², so the arena floor draws wells and trees.
V01's `HoodPlace` "court" is a block's court residue (§4.7 S10 (6)), a different thing under one word.
**Required change (V01).** V1-3.8.2 step 1: "`plotYard` — its plots' yard parts of kind `yard`, `garden`, `court` (a
footprint's court, BCR-V2-24, except the floor of a building whose massing family is `ovalCourt`), `forecourt` or
`churchyard` …"; V1-3.7.1 states once that its place kind `court` names a block's court residue and that a footprint court
is named only as its building's yard part.

### S23-25 — minor — owner V01 — the hook table's stale read and the tie rule

**Claim.** V01 §1.2's V02 row (l. 240) and §12 (l. 3230) read `MassingRef.stack.lowerRoof` for "the ridgeless hatch";
V1-5.1.2's hatch reads each wing's `RoofSpec.kind`, which is right, since a roof `setAttr` leaves `lowerRoof` stale
(S23-12). V1-5.1.3 (l. 2358) orders a stack's wings "ties by wing order"; V02's order is by key (§2.1, BCR-V2-27).
**Required change (V01).** §1.2 and §12: "`MassingRef.stack.lowerRoof`" → "each wing's `RoofSpec.kind`"; V1-5.1.3: "ties
by wing key (V02 §2.1's canonical order)".

### S23-26 — minor — owner V03 — `instance` on a room still refused

**Claim.** V03 §4.2 (l. 1751–1752): an add or move of furniture "is refused only when the room has no free slot, the
refusal naming the nearest room of the building that has one" — a structural refusal that item 101 R2 does not admit
(V03's own J-V3.54; IN-V03-2: "no plan edit is refused on a structural ground").
**Required change (V03).** "…where the room has no free slot, the item bends to the nearest room of the building that has
one (by centroid distance, ties by room id), named ('no room for a bed in the pantry: placed in the chamber')".

### S23-27 — minor — owner V03 — an omitted gate hall or tower room

**Claim.** V02 F-COMPOSE (3) (l. 1890–1892): a composer room the seed contract refuses is shortened, "then omitted — the
plan rung's programme then places that role itself (volume 3)". V03's class rows list `hall` and `chapel` but `gatehall`
only for a gatehouse slot and `towerRoom` only for tower classes (l. 610, 646, 704); A2 (11) adds a `ProgramRoom` only
for a composer room that exists. An omitted gate hall leaves the court without O1 (b)'s arches (T28-2's reach), an
omitted tower room leaves the tower's piece to A5's leftovers.
**Required change (V03).** A2 (11) adds: "a composed `gate` wing whose `gatehall` room the composer omitted (V02 §3.13
F-COMPOSE (3)) adds a `ProgramRoom` `gatehall` (hard, origin `composer`) across that wing at the main entrance's offset,
`gateHallM`'s lower bound wide, clipped to its piece; a composed tower without its `towerRoom`s adds `towerRoom` × the
storeys it reaches (hard) in its tower piece". V02 F-COMPOSE (3) then reads "… then omitted — volume 3's A2 (11) places
that role itself".

### S23-28 — minor — owner V02 — §0's click words

**Claim.** V02 §0 (l. 81–82): "Click one building and you get its rooms … — and a second click gives the full floor plan
(volume 3)". V02 §3.11 (l. 1826): "A building click: `wings` (if absent or stale), then `rooms`, then `plan` (volume 3)";
V03 §0 and §4.5: a click selects and derives, a double-click zooms to the plan. The owner reads three gestures.
**Required change (V02).** §0: "Click one building and it is composed down to its rooms — the hall, the tower rooms, the
gate hall — and, with volume 3, its floor plan, which the plan panel lists; a double-click zooms in until the plan is
readable (volume 3)".

### S23-29 — minor — owner V01 (V02 one line) — the outline close-up raises no `wings` rung

**Claim.** V01 V1-3.8.1 (l. 1452–1455): a district click "derives its close-up and raises its buildings' `wings` rung";
"the outline close-up (V1-3.8.9) derives those of the districts and hinterland faces an outline meets" — close-ups only.
V02 §3.11's triggers (l. 1820–1826) are the neighbourhood click, `view` at the neighbourhood band and the building
click. Whether the buildings inside an outline (a cemetery chapel, a mill, the hinterland's farmsteads) are composed is
decided nowhere.
**Required change (V01; V02).** V1-3.8.1 and V1-3.8.9: "an outline close-up also raises the `wings` rung of every building
inside the outline, centre-out from the outline's centroid, as a district click does"; V02 §3.11's trigger bullet adds
"or an outline close-up (volume 1, V1-3.8.9)".

### S23-30 — minor — owner V02 — `facadeBays` on sides other than eaves

**Claim.** V02 §3.7 (l. 1270–1281) defines `facadeBays` "for a wing and one eave side" (the run less `endMarginM`, less the
projections of towers, blocks and other wings meeting it, less valley reaches) and states it is read by the plan's
windows and §8.4's lit windows. V03 W2 (l. 1370–1374) restates "on every other side … the same law" as the side's length
less `endMarginM`, cut into bays — without the deductions for the towers and wings that meet a gable or a tower's side.
A single-source law restated partially, and the lit windows have no rule on those sides.
**Required change (V02; V03 cites).** §3.7: `facadeBays(wing, side)` for every ring side — on an eave side as now; on any
other side the run is the side's length less `endMarginM` at each end, less the projection of every tower ring, block and
other wing that meets or overlaps the side (each widened by 0.6 m), with no valley term; read by §8.4's lit windows on
every side. V03 W2's "on every other side … `bayM`" sentence becomes "on every side, volume 2's `facadeBays(wing, side)`".

### S23-31 — major — owner V02 — the crypt's seed wings have no function

**Claim.** V02 §3.14.5 (c) (l. 1945–1948): "V02 supplies the east-range wings that seed its ring — the ranges whose ridge
end lies farthest toward world east (`+x`), or for a template the parts the seed rule names". V03 3.7.4 step 1
(l. 1486–1489) reads "under volume 2's east-range seed wings **where a composition's massing names them** …; else under the
template part `chancel`, else `apse`, else `crossing` (BCR-V3-13); else the third of the region farthest from the main
entrance". No record or function names the seed wings (the massing has no such field), the tie rule is missing, and the
two texts order the template case differently; BCR-V3-20's basement function (a base function, S23-20) must call
something.
**Required change (V02; V03 cites).** V02 declares, beside `massStepped` in `@plat/plots`, `cryptSeedWings(b: Building):
number[]` (wing keys): for a building with template part names, the wings whose `partName` is `chancel`, else `apse`, else
`crossing`; otherwise the storeyed ground wing of role `main`, `range` or `cross` whose ridge has the end with the largest
`x` (ties by key), alone; empty when no such wing exists. §3.14.5 (c) states it once; V03 3.7.4 step 1 reads "under
`cryptSeedWings(b)` (V2 §3.14.5 (c)); where it is empty, the third of the region farthest from the main entrance …";
BCR-V3-20's basement function cites it; its milestone is S23-20's.

### S23-32 — minor — owner V02 — V02's GeoJSON rows and item 447

**Claim.** V02 §5.5's GeoJSON row (l. 2689) and §5.6's export bullet add a `wings` layer with `key`, `role`, `floors`,
`eaveCm`, `ridgeCm`, `roof`, `building`, `on`, `solid`, `baseCm`; file f item 447 puts `onDeck`, `deck` and `tiers` on the
base's building features. V02 neither points at them nor says the `wings` layer omits them by design.
**Required change (V02).** §5.5's GeoJSON cell adds: "the base's building features carry `onDeck`, `deck` and a stepped
building's `tiers` (file f item 447); the `wings` layer repeats none of them".

### S23-33 — minor — owner V02 — V02's record and writers never name `partName`

**Claim.** `partName` appears 0 times in V02 although its M0 (d) passes the template's parts through (l. 925–927), M8 (e)
reads a part `crossing` (l. 1121–1122), and its writers (the mutator's W-steps, `setMassing` ops, the canonical
re-keying, `removeWing`'s re-joined block) rewrite `Building.wings`. A V02 builder has no instruction to carry the field.
**Required change (V02).** §2.1's `BaseWing` notes and §2.5's lifecycle table name `partName` (BCR-V3-13): passed through by
M0 (d); kept on the wing that keeps its key by every writer (a re-joined block keeps the lowest key's); absent on a wing
V02 adds; M8 (e) reads it; its lifecycle row is V03 §2.5's (S23-15).

### S23-34 — major — owner V03 — the click and the `plan` query skip the `rooms` rung

**Claim.** V02 §3.8 (l. 1350–1352): the `rooms` rung is "derived only as the plan rung's input — on the click that derives
the plan, `compose(…, 'rooms')` after `wings`", and V03's `plan(input, composition, …)` reads `Composition.rooms` (A2 (11),
l. 960–962). V03 §4.5 (l. 1849–1850) has the click derive "`wings` then `plan`", and §4.6's `plan` query (l. 1882–1884)
derives the plan "when `absent` or `stale`" without naming `rooms`. A builder following V03 hands the plan a composition
with no composer rooms: no composed hall, gate hall, chapel or tower rooms (T-V3-25 fails).
**Required change (V03).** §4.5: "derives `wings`, then `rooms` (V02 §3.8), then `plan`"; §4.6: "derived first — `wings`,
`rooms`, then `plan`, each where absent or stale — as a click does"; 3.1's input note adds "`composition` as the `rooms`
rung left it (`Composition.rooms`)"; `view`'s plans (4.5) likewise.

### S23-35 — minor — owner V02 — "the plan rung waits on M6b" stated unconditionally

**Claim.** V02 §8.1 (l. 3144–3145) and J-V2.32 (l. 3247): "Volume 3's plan rung starts after M6b". V03 §8 and §11 Q1 ask
the owner whether P0–P3 may land on base wings after M4, before V02, and recommend yes.
**Required change (V02).** §8.1's sentence and J-V2.32 add: "— unless the owner answers volume 3's Q1 yes, in which case
its P0–P3 run on base wings after M4 and take the composer's rooms and dormer rows when M6b lands (V03 §8)".

### S23-36 — minor — owner V03 — P1 would ship V02's `facadeBays`

**Claim.** V03 W2 (l. 1380–1381) and P1 (l. 2150): "Where volume 2's tables are absent (the plan rung shipped before volume
2, §11), V03's P1 ships volume 2's constants row and `facadeBays` loader unchanged (volume 2 stays their owner)". V02
builds and prices `facadeBays` at M6b (l. 3161) in `@plat/buildings` (BCR-V2-18). Under the Q1 order the function is built
twice or priced twice, and its package does not yet exist.
**Required change (V03; V02 one line).** W2's and P1's sentence: "under the Q1 order, volume 2's `facadeBays`, `endMarginM`
and `bayM` are built first as volume 2's own item, moved forward from its M6b and priced there, exported from
`@plat/plots` as `massStepped` is; P1 imports them and prices none of them". V02 §8.3's M6b row notes the item may move
forward.

### S23-37 — minor — owner V03 — the plan rung's package in §14

**Claim.** V03 1b (l. 289) homes `BuildingGenerator.plan` in `@plat/buildings`; BCR-V2-18's `@plat/buildings` line
(l. 3448–3455; file f item 505) lists "the massing (outline), the composer (compose), composition.json's loaders, the
roofscape and facadeBays" and its dependency rule imports `buildings` into `render` and `export` "for its pure `roofscape`
and `facadeBays` only". The plan rung appears in no §14 line, and under the Q1 order its package would precede V02's.
**Required change (V03).** A BCR on `## §14 …` (joining item 505, applied after BCR-V2-18): the `@plat/buildings` line gains
"the plan rung (volume 3: `plan()`, the programme, partition, openings, furnishing, the plan tables' loaders)"; the
dependency rule adds "`export` imports the plan's pure readers for the JSON `plan` block, VTT and CityJSON storeys"; where
the plan rung lands first (Q1), the package is created by M6-P.

### S23-38 — major — owner V02 — M6b's exit bar needs the plan rung

**Claim.** V02 M6b's exit (l. 3161) lists T-V2-35, whose clauses (l. 2934–2937) are "its plan houses at least three units
in its main range" and "every hall's area lies in its programme's `hall` row × the ladder's `sizeFactor`". The plan is
V03's, which V02 §8.1 schedules after M6b, and the class programme's `hall` rows are V03's default rows (V03 2.4). M6b
cannot exit before its successor lands; the hall clamp at M6b has no rows to read and no stated fallback.
**Required change (V02).** T-V2-35 at M6b keeps its composer clauses (no hall and no chapel ring at the poor band; the
return restores the as-built rooms; the gate hall and tower rooms at every band); its "plan houses at least three units"
clause moves to V03 (T-V3-25's manor clause, S23-16) and its hall-area clause runs from M6-P's P1; §3.8's hall clamp
reads the `hall` rule of the class's `RoomProgramRow` where one is loaded, and before V03's rows land clamps by `[1.4w,
length − 2 m]` alone, reported per building (`hallUnclamped`).

### S23-39 — minor — owner V03 (BCR-V3-15, -19, -28) — additions to the unscoped stale list

**Claim.** BCR-V3-15 (l. 2442–2448), BCR-V3-19 (l. 2469–2481) and BCR-V3-28 (l. 2570–2577) add declared rooms, "the accesses it
hosts … its crypt", "the outside ground … a retaining wall, the terrain, a deck or the host chamber beside it" to §2.8's
building-wide `inputs` comment and `stale` list — the list S23-06 must split per rung. Unsplit, a new retaining wall
beside a house stales its `wings` rung.
**Required change (V03).** The three requests target "the `plan` rung's inputs" in the per-rung `inputs` comment and
`stale` sentence of S23-06 (BCR-V2-13), applied after it (file f items 235, 237, 263 note it).

### S23-40 — minor — owner V02 — `setMassing` and a stored plan

**Claim.** V02 §4.2 step 3 (l. 2351–2358) re-matches a stored composition (W8) and marks an unstored `wings` rung stale;
it names no stored-plan re-cut. IN-V02-2 (c) (l. 3931) lists the orphaned plan rooms in the dry run for the `tiers` op
only. V03 3.11 and 4.3 re-cut a stored plan inside "the changing event" and orphan the rooms of a removed wing, which
`removeWing`, `reshapeRange`, `moveTower` and `setComposition room` all cause.
**Required change (V02).** §4.2 step 2: "the dry run lists, from volume 3's plan query, every stored-plan room, edited
opening and furnished room the op would orphan (V03 3.11)"; step 3: "a stored plan is re-cut inside the event by V03 3.11
around its edited parts"; §4.3 says the same for `room`; IN-V02-2 (c) widened from the `tiers` op to every `setMassing` op
and `setComposition room`.

## 8 Decisions, CONFIRMED versus PLAUSIBLE, and what lies outside the seam

**Findings by owner.**

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V01 | 0 | 4 | 4 | S23-02, S23-04, S23-05, S23-23; S23-22, S23-24, S23-25, S23-29 |
| V02 | 1 | 7 | 7 | S23-01; S23-06, S23-07, S23-08, S23-09, S23-10, S23-31, S23-38; S23-03, S23-28, S23-30, S23-32, S23-33, S23-35, S23-40 |
| V03 | 0 | 9 | 6 | S23-12, S23-13, S23-14, S23-15, S23-16, S23-17, S23-18, S23-19, S23-34 (S23-17 and S23-19 shared with BASE-F); S23-11, S23-26, S23-27, S23-36, S23-37, S23-39 |
| BASE-F | 0 | 1 | 1 | S23-20; S23-21 (and the file-f halves of S23-17, S23-19) |
| **total** | **1** | **21** | **18** | 40 |

**Decisions (vetoable; this lane's rulings where a required change had to choose).**

| id | decision |
|---|---|
| J-S23.1 | Chose **blocker** for S23-01 over seam-time-r0 ST-08's major, because V02's kept buildings break the owner's rule text (g item 110 (b): the spaces between piers "stay open or hold the base's vaults"), not only a sibling volume; the fix is one and closes both. |
| J-S23.2 | Chose to **raise a half cellar's ground storey by half the cellar depth** (S23-10) over conforming V02's dig floor and V03's floor datum to the gate's floor alone, because the latter leaves a 110 cm cellar storey the plan cannot furnish, while a raised ground floor over a half-sunk cellar is the historical form (realism tiebreaker; PLAUSIBLE, general knowledge), reconciles the base's two sentences, keeps both volumes' formulas and makes V03 W2's half-cellar light windows true; a crypt-only half form raises only the seed wings (a raised choir). It is a declared one-time shift for buildings with a half cellar. |
| J-S23.3 | Chose the milestone id **M6-P** for the plan rung (S23-19) over "M7", because V02 already names a massing step M7 and J-VI.22 names staged milestones M6-U, M6-sky and M6-E. |
| J-S23.4 | Chose **BASE at M3a** for template part names and **BASE with item 109 (k), built at M6-U** for `Basement.crypt`, its rank and the raised form (S23-20), over the file's "STAGED after M6b", because V01, V04 and V10 read the crypt at generation, V02 reads part names from M6a, and file g's item 109 is base design built with the underground layer. |
| J-S23.5 | Chose **the district click at the city and district bands, the building click from the neighbourhood band** (S23-18) over a building click at every band, because the base orders the gestures down the ladder and V02 keeps the district band free of compositions; a double-click reaches the plan at any band. |
| J-S23.6 | Chose **V02's riser-count law** for exterior flights (S23-07) over V03's `goingCm` or V02's `treadM`, because the flight's rise, run and grade are V02's, and the map, the plan and the 3-D solid must show one set of treads. |
| J-S23.7 | Chose an **entrance reserve read from the eager entrance records** for the pins' clearance (S23-23) over reading the lazy porch, so a close-up stays a pure function of committed state, whatever order the click derives the close-up and the `wings` rung in. |
| J-S23.8 | Chose **no surface symbol for a building-hosted access** (S23-05) over a symbol beside the plan's head, because the roof hides it at the neighbourhood band and the head is the access's drawn position at the building band. |
| J-S23.9 | Kept S23-01 and S23-04 in this register although seam-time-r0 ST-08 and seam-layers-r0 SL-20 found them, because each lies on this seam; each names the other, and one fix closes both. Items 560 and 564 are left to SL-17 alone. |

**CONFIRMED versus PLAUSIBLE.** Every claim of §2–§7 is **CONFIRMED** by reading: the three volumes, `_integrate.md` and
file f were read whole by this lane's first session (§1), and the resumed session re-read each issue's cited lines and
their enclosing sections (V01 §1.2, V1-3.8, V1-3.17, V1-5.1, §5.3, BCR-14, BCR-19, BCR-36, IN-V01; V02 §0, §2.2, §2.6,
§3.7, §3.8, §3.11, §3.13, §3.14.5, §3.16, §3.17, §4.2–§4.4, §5, §8, X list, BCR-V2-13, -15, -18, -20, -21, -24, -27,
-28, -34, -37, IN-V02; V03 §0, §2.2, 2.4's class rows, §3.1–§3.4a, W2, §3.7, §3.11, §4.2–§4.6, §5.1–§5.2, T-V3-11,
T-V3-31, §8, §11, BCR-V3-3, -4, -13, -15, -19, -28, IN-V03; base §2.6's basements, §2.8's record, §4.1's policy, §8.2's
presets row, II.4, §11.1's SVG row, the `StairCore` and `AccessPoint` records; file g item 110 and item 109's scope
line), with the inputs' hashes unchanged since the first read. The **required changes are PLAUSIBLE** until their owners
apply them and the coherence pass re-checks the wiring; J-S23.2's historical claim is PLAUSIBLE (general knowledge, no
source consulted). Nothing was executed: this lane writes a critique, and no measurement bears on its findings.

**What lies outside this seam.** The §16 total (S23-19 (b)) is summed across all twelve volumes, which only the coherence
pass sees; this lane states the rule, not the number. Seam-layers-r0 SL-17 (V01 BCR-36 against V04 BCR-36), SL-20
(= S23-04) and seam-time-r0 ST-08 (= S23-01) are those lanes'. V03's own internal cell counts (the manor's three-valued
hall area against A1's four band columns, l. 644) and V02's internal rows were not audited: they are the volumes' own
critiques' matter, not the seam's.
