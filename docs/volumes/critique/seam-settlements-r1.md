# Seam check: the village (V07), the SettlementForge stage (V08) and the content tables (V11) — round 1

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-settlements-r1; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Re-check of round 0 (SS-01 – SS-47): each FIXED, PARTIAL or NOT FIXED, with evidence | done
- §2 Census A again: dossier kinds x size rungs -> class rows | done
- §3 Census B again: the small-settlement hand-off | done
- §4 Census C again: the ladders meeting | done
- §5 Census D again: cross-seam records, ids, terms, units, BCRs, file f | done
- §6 New findings (SR1-01 onward) | done
- §7 Disposition summary by owning volume | done
- §8 Decisions and CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

**Read whole** (md5 at start, re-checked unchanged before writing; the base is unchanged since round 0):

| file | md5 | lines | state |
|---|---|---|---|
| `docs/volumes/V07-village.md` | 4b7155ac… | 3 305 | after reconcile-V07-r1 (LANDED 04:01) |
| `docs/volumes/V08-settlementforge.md` | f6549c4a… | 2 873 | after reconcile-V08-r1 (03:53) and V11's one edit (03:57) |
| `docs/volumes/V11-content.md` | 6968447a… | 4 169 | after reconcile-V11-r1 (04:04) |
| `docs/volumes/_integrate.md` | 1487de32… | 365 | after the BASE-F lane's J-VI.2 edit |
| `docs/AMENDMENTS-2026-09-28f.md` | 40e2f8d6… | 1 076 | after reconcile-BASE-F-r1 (03:39) |
| `docs/volumes/critique/seam-settlements-r0.md` | — | 506 | round 0, re-checked issue by issue (§1) |

**The base sections the three share** (`docs/ARCHITECTURE.md`, md5 01fea21f…, unchanged): §1.1 *Requests at the ends of
the ladder* (re-read from round 0's extract, identical bytes), PART III whole (l. 16189–16267), §10.2's `BuildingClassRow`
and `RelationRule` (l. 11480–11500), §4.9's churchyard row (l. 5935) and `YardPart.kind` (l. 1023). The round-0 reading of
§7.7 items 9–16 and §14's port passages stands (the base did not change).

**Read beyond the three volumes, where a seam finding needed a consumer's text** (each read at the lines cited, never
whole): V04 §3.5.1 (1) (l. 1405–1420), l. 1427, T-V4-50, l. 3101; V02 §3.10.3 and §3.10.5 (l. 1600–1616, 1750–1760); V03
l. 788–796, 970–974; V10 l. 372.

**Scripts** (scratch `scratchpad/volumes/ssr1/`): `census2.out` — the 280 rows of V11 §3.11 and the 28 `villageForm` entries
of V11 §3.22 parsed by script, every kind of tiers T, H, V or W routed at a village rung; `evidence.txt` — the line of the
fix for each of SS-01 – SS-47; a grep of every volume and file f for unprefixed village class ids; running notes
`notes.md`.

**What the checks were** (round 0's four, re-run on the repaired text, plus the round-0 issue list): (A) every catalogue
kind at every size lands in exactly one class row by one route; (B) the small-settlement hand-off — routing, registration,
the band, the population floor, the burial and water records, the toll bridge, the latitude; (C) the ladders — grammar,
step types, village ranges, no double counting; (D) every record, id, term, unit and base change request the three share,
and the file-f items that carry them. Severity as round 0: blocker (the subject cannot be built as written), major (a
contradiction or an unwired piece a builder would hit), minor (wording, a pointer, a restated value). Each finding names
ONE owning volume and an exact required change; a companion is its own finding. Ids are **SR1-nn** (seam-settlements
round 1), so they never collide with seam-surfaces-r0's `SS-` ids.

## 1 Re-check of round 0 — every issue, now

Round 0 raised 47 issues (2 blockers, 27 majors, 18 minors). The three volume lanes and the BASE-F lane report all of
their shares FIXED; each was re-checked here against the live text at the line given. **Result: 47 of 47 FIXED at the
places round 0 named.** Four fixes left residue elsewhere in the owning volume, which this round raises as new findings
(the pointer column); none reopens a round-0 issue.

| id | owner | status | evidence (live text) | residue |
|---|---|---|---|---|
| SS-01 | V11 | FIXED | `v.<id>` namespace, V11 §2.9 (l. 612), registry row 17 (l. 685), §3.5.8 village rows (l. 1274), T-V11-3's `v.` clause, J-V11.58 | consumers outside the seam still key unprefixed ids: SR1-05, SR1-06, SR1-24 |
| SS-47 | V07 | FIXED | V07 §2.4's namespace paragraph (l. 694); a script finds no unprefixed village id outside the allowed ones (V11's town rows, history) | §2.4's "only through a `villageForm`" wording: SR1-17 |
| SS-02 | V11 | FIXED | V11 §3.22 "Every other class has no village form and plays itself" (l. 2982); §3.11's routing order | — |
| SS-03 | V11 | FIXED | "`guildhall` has no village form" (l. 2980); `mercantile-guildhall`'s village cell | — |
| SS-04 | V07 | FIXED | V07 §2.4's COUNT row for the guild ranges and its separate GUILD row (l. 843–844); T-V7-35 | the family rule of the hall binding: SR1-20 |
| SS-05 | V11 | FIXED | `citizen_militia` → `@none` (l. 1905); `town_watch`'s note; `guard_post` → `v.watchtower` | — |
| SS-06 | V11 | FIXED | `GovernmentRow.villageSeat` (l. 486), §3.21.1's column; V07 DR11 cites it | the seat's presence at small rungs: SR1-14 |
| SS-07 | V11 | FIXED | "A COUNT whose member is a pin … sets a floor only" (l. 2104); `multiple_water_sources` "at least 2" | — |
| SS-08 | V08 | FIXED | V08 §3.5.1 (b)'s village-rung sentence (l. 1440–1442); V11 §3.12 cites it | the range rows' key: SR1-16 |
| SS-09 | V11 | FIXED | `ArchetypeVillageCell` (l. 493); §3.13.2's `village` column filled from V07 §2.4 | the `delta` cells' notation: SR1-19 |
| SS-10 | V08 | FIXED | `@absent:<class>[+<class>]` in the `kinds` shape (l. 792), `distribution`, §3.5 (5); T-V8-46 | the village-rung reading: SR1-02 (V07), SR1-07 (V11), SR1-27 (V08) |
| SS-11 | V08 | FIXED | the `keywords` shape's `class?`, `specialisation?`, `binds?` (l. 812–814); the archetypes' `village?` | ownership sentence: SR1-30 |
| SS-12 | V08 | FIXED | V08 §3.5 (5) (f) decides a custom class at fold (l. 1317–1323); T-V8-25 | — |
| SS-13 | V11 | FIXED | "No cell scales the chance by the dossier's water record" (l. 3219–3220); §3.24.7 (3) (b) | — |
| SS-14 | V07 | FIXED | DR2's sea threat is any key of `PortValues.threats` (l. 1860); §1b's trace split | — |
| SS-15 | V11 | FIXED | `WallBarrierRow.arcKind` (l. 444); §3.16.1's village water rule | — |
| SS-16 | V07 | FIXED | V07 §2.4's supply rows use V11 §3.7.1's ids (l. 791); every good checked against the goods table: `grain`, `flour`, `bread`, `beer`, `fodder`, `iron`, `charcoal`, `tools`, `firewood`, `logs`, `timber`, `clay`, `pottery`, `hides`, `bark`, `leather`, `fish`, `import` all present | — |
| SS-17 | V11 | FIXED | `endpointStore`'s village reading (l. 2559) | — |
| SS-18 | V11 | FIXED | `naming.villageEnd`, `naming.field`, the village features (l. 2856–2861); V07 §3.10 cites them | — |
| SS-19 | BASE-F | FIXED | file f item 202 (l. 50); items 326, 528 merged | stale "rung path" words in V07 and PART III: SR1-09, SR1-29 |
| SS-20 | V08 | FIXED | V08 §3.10's fold sentence (l. 1678–1681); T-V8-19's 1 480 / 1 520 clause | — |
| SS-21 | V08 | FIXED | population in [0, 10⁷] (l. 1302); §3.6 (7), B7, T-V8-15, J-V8.85 | — |
| SS-22 | V07 | FIXED | T-V7-42 reads tiers T, H, V and W from the manifest (l. 2684) | the parenthetical count is wrong (round 0's own error): SR1-13 |
| SS-23 | V08 | FIXED | V08 §3.5.1 (c)'s GUILD-hall binding and J-V8.83 (l. 2434); T-V8-44 | V11's looser sentence: SR1-20 |
| SS-24 | V11 | FIXED | registry row 63 carries the twelve sets (l. 732) | — |
| SS-25 | V11 | FIXED | `GoodWordRow` is V11's shape (l. 491) | V08 restates the matching rule: SR1-26 |
| SS-26 | V11 | FIXED | `parish_burial_grounds` COUNT and `graveyard` REPLACEMENT (l. 2146–2147); T-V11-2's chain clause | the churchyard's part name: SR1-03 |
| SS-27 | V07 | FIXED | V07 §3.1 (1)'s forced brook (l. 1052) and DR1 (l. 1851); J-V7.97; T-V7-13 | — |
| SS-28 | V08 | FIXED | V08 §3.10 "the port registers nothing and consults `LadderRouter`" (l. 1671); BCR-V8-9 WITHDRAWN | — |
| SS-29 | BASE-F | FIXED | file f item 510 (l. 837) | the archetypes cell's shape owner: SR1-30 |
| SS-30 | BASE-F | FIXED | file f item 430 carried by item 432 (l. 626) | — |
| SS-31 | V11 | FIXED | V11 §3.24.3's village-rung bullet (l. 3279–3283); `villageCap` gone from V11 | V07's chance wording and IN-V07-2: SR1-10, SR1-11 |
| SS-32 | V07 | FIXED | DR5 cites §7.7 item 16's quarter row (l. 1881) | — |
| SS-33 | V07 | FIXED | the chain weights cite V11 §3.7.4 (l. 1958) | — |
| SS-34 | V11 | FIXED | W11 and §3.16.1 read "V07 §3.4 step 5" (l. 194) | — |
| SS-35 | V08 | FIXED | "280 at the pinned line" (l. 797), J-V8.18 | — |
| SS-36 | V11 | FIXED | `access_to_external_mill` → `@absent:watermill+windmill` (l. 1917); BCR-V11-9's list | — |
| SS-37 | V08 | FIXED | V08 §3.11 "no `fallbackClass`" (l. 1731); BCR-V8-13, §5.2 | — |
| SS-38 | V08 | FIXED | V08 §2.6b (1) (c) (l. 987); X5 SUPERSEDED | — |
| SS-39 | V07 | FIXED | §2.2a's reference cells (l. 619), `deck.minDepthM` gone, §3.12 step 6 cites V11 §3.23.8 | restated values left elsewhere in V07: SR1-12 |
| SS-40 | V07 | FIXED | V07 §2.4 lists only differing readings, with the shrine and wells rows (l. 839–840) | — |
| SS-41 | V07 | FIXED | the landmark yard parts and the named beach (l. 671–676); §3.11 reads all seven strings; §5.4's `landmark_parts` | — |
| SS-42 | V08 | FIXED | the `distribution` row's QUARTER clause (l. 705) | — |
| SS-43 | V07 | FIXED | V07 §3.11 and W56 read `@absent:watermill+windmill` (l. 1921) | — |
| SS-44 | V11 | FIXED | `gates_if_walled` → `@none` (l. 1909); J-V11.64 | — |
| SS-45 | V08 | FIXED | V08 §2.6a (3)'s burial rows (l. 912–913) and (4)'s promotion pairs | — |
| SS-46 | V07 | FIXED | the seated churchyard reads V11 §3.6.1's `burial-ground` plot area (l. 1917); J-V7.100 | — |

## 2 Census A again — every dossier kind at every size lands in a class row

**The count.** Tiers T, H and V carry 97 kinds and tier W 85; six kinds carry both (`citizen_militia`, `multiple_water_sources`,
`adventurers_charter_hall`, `cartographer_s_workshop`, `weekly_market`, `underground_network`), so **176** distinct kinds
reach a village rung at birth — round 0's "182" added the six twice (script, `census2.out`; SR1-13).

**Routing at a village rung, by script** over V11 §3.11's 280 rows and §3.22's 28 `villageForm` entries: 34 kinds go to a
pseudo-class, 27 to a class with a village form, 115 to a class that plays itself; 0 fall to the tag fallback (every
kind is mapped); every `villageForm` target is one of V07's 25 `v.` rows and no `v.` key used anywhere in V11 is missing
from V07. The one-route rule holds (V07 §3.11 steps 1–4 = V11 §3.11's routing order = V11 §3.22). Two things still break a
kind's landing:

* **`access_to_parish_church` (T, H only) does nothing at the only rungs it occurs** — `@absent:church` zeroes the town
  class `church`, which never stands at a village rung; the village's church is `v.parish_church`, whose presence law runs
  untouched (SR1-02).
* **The rows the village kinds land on cannot be loaded.** Every village-form target and every village fallback is a `v.`
  row of V07 §2.4, and those rows are written in words, not in `BuildingClassRow`'s shape: no `family` (T-V11-4 refuses
  the row), profile cells outside V11 §2.3's enums (`sacredness` as an emission, a `clustered` distribution, coverage
  units "nucleus beyond 800 m of a church" and "1 per 500 people"), no designation template, no `deckOk`, and presence laws
  (`PLaw` with conditions) that no field of `BuildingClassRow` holds (SR1-01).

## 3 Census B again — the small-settlement hand-off

| check | round 1 reading | verdict |
|---|---|---|
| registration | one `ProductDecl` in `StrategyRegistry.products` (V07 §2.1, file f item 202); V08 §3.10 consults `LadderRouter` and registers nothing | holds; stale words remain in V07 W1, W30, V-M2 (SR1-09) and in the base sentences item 202 leaves (SR1-29) |
| the band | V07 §2.1's fold (1 575 / 1 425) = V08 §3.10 = T-V8-19 = T-V7-14 = file f items 322, 317 | holds; §1.1's "a dossier's rung follows its population … at each epoch's target" is not amended for the band (SR1-29) |
| the floor | creation below 1 refused, 0 at an absorb → THORP and desertion, a base-product document through the fold (V07 §2.1, V08 §3.6 (7), B7, J-V8.85, item 202) | holds |
| burial records across 1 500 | V11 §3.12's chain `burial_ground` → `graveyard` → `parish_burial_grounds` → `burial_grounds_and_charnel_house`; V08 §2.6a (4) re-binds; V07 §3.12 step 6 carries the opening year | holds as a ladder; the churchyard's part name differs between V11 (`burial`) and V07, V04 and the base (`churchyard`) (SR1-03); V07 never reads `parish_burial_grounds`, which every small SettlementForge town routed to the VILLAGE rung carries (SR1-15) |
| water records | `water_source` → `multiple_water_sources` COUNT of wells as a floor (V11 §3.12, V07 §2.4, T-V7-35) | holds |
| toll bridge on a dry site | V07 §3.1 (1) and DR1 read the `implies` cell; `toll_bridge_dry` | holds; the cell is absent from V11 §3.11's own row (SR1-22) |
| latitude | V08 feeds `Intent.latitudeDeg` and `PortValues.latitudeDeg` "to V07's village sweeps"; V07's VS1 reads a data key `site.latitude` that no stage produces | unwired (SR1-04) |
| seats | `@seat` binds `GovernmentRow.villageSeat` (V11 §3.21.1) | holds as a route; the seat class's presence law does not follow it (SR1-14) |

## 4 Census C again — the ladders meeting

* **Grammar and qualifiers.** V08 §3.5.1 (a) and its `qualifiers` row; V07 §3.11 reads the same four words. Agreed.
* **Step types.** V07 §2.4's ladder table now lists only the readings that differ at village rungs and cites V11 §3.12 for
  the rest; its guild rows, shrine row and wells row agree with V11's. Agreed.
* **Unnumbered ranges.** One precedence now (V08 §3.5.1 (b) = V11 §3.12): at a village rung V07's `rules.ladders.ranges`
  row "for its qualifier and member class", else V11's range unscaled. V07's rows are keyed by qualifier word, so a record
  stepped by V11's `dossier.ladders` with no qualifier in its name (`tanners`, the trade GUILD kinds of tier W) misses the
  village row and takes V11's town range at a 1 000-person village, against J-V7.39's intent (SR1-16).
* **No double counting.** V08 binds a GUILD hall into the guild COUNT record of its `categories` family (J-V8.83); V11
  §3.12 and V07 §3.11 state the looser "a craft- or merchant-guild COUNT record" (SR1-20).
* **The re-check against the ladder file.** V08's X1 is applied in V11 §3.12 (the file's pairs are rows; the twelve
  lesser lists close at C4 by T-V11-2's cross-check over `ladderPairs`). Agreed.

## 5 Census D again — records, ids, terms, units and base change requests across the seam

| subject | V07 | V08 | V11 | verdict |
|---|---|---|---|---|
| village class keys | `v.<id>`, 25 rows | — | `v.` namespace, `villageForm` → `v.` only | agreed inside the seam; V02's `composition.classFamily`, V03's village plan rows and V04's church count still use the old ids (SR1-05, SR1-06, SR1-24) |
| village class row shape | prose profile, `PLaw` presence, no family, template or `deckOk` | — | `BuildingClassRow` + `SitingProfile`; T-V11-3/-4/-7 over every class | unloadable (SR1-01, SR1-08) |
| `@absent` at a village rung | named classes zeroed | "a village using a neighbour's mill or parish church" | named classes zeroed | the church case is a no-op (SR1-02, SR1-07, SR1-27) |
| churchyard part | `churchyard` (base §4.9, V04 §3.5.1 (a)) | "churchyard part" | `burial` (V11 §3.6.1, W28, §3.12) | term conflict (SR1-03) |
| latitude | `site.latitude` data key | `Intent.latitudeDeg`, `PortValues.latitudeDeg` | — | unwired (SR1-04) |
| stepped massing at a village | cap `tiers.capPerSettlement`; chance "V11's TOWN value … 0 for …" | — | the row's chance (no rung column; European cultures have no row) | wording (SR1-10); IN-V07-2 still names `villageCap` (SR1-11) |
| deck admission at a village | "V11's `deckOk` … with the village reading" | — | "V07's village rows carry their own cells" | no cell exists (in SR1-01) |
| archetype village cells | V07 §2.4's list | shape cites V11 §2.8 | typed cell; `delta` free text | values agree; two deltas are not in the notation (SR1-19); item 510 names V08 the shape's owner (SR1-30) |
| goods words | — | restates the matching rule | V11 §3.13.5 is the rule | restated (SR1-26) |
| catalogue manifest | — | writes `catalogId`, name, tiers, category, `ladderPairs` | row 77 restates `{ kind, tiers, category }` "names, tiers and categories only" | restated shape (SR1-23) |
| GUILD hall binding | "one of them" | by `categories` family (J-V8.83) | "that COUNT record" | V11 looser (SR1-20) |
| file f | BCR-V7-11, -17, -21, -26 → items 202, 326, 528, 430, 322 | BCR-V8-9 withdrawn; BCR-V8-10 → 510 | BCR-V11-1, -4 → 432, 510 | consistent; two base sentences item 202 leaves unamended (SR1-29) |

## 6 New findings

Each: **id** · severity · kind · owner — the claim with its evidence, then the exact required change.

### Blocker

**SR1-01** · blocker · data model, unwired · **V07** — The village class rows cannot be loaded into `roster.classes`. V11
§3.1 row 17 homes them in "V07 §2.4 (village classes, keyed `v.<id>`)" and V11 §3.5.14 cites them "not restated", so
V11's compiler must build them; but V07 §2.4 writes them in words, not in `BuildingClassRow`'s shape (base l. 11480–11490,
as BCR-V11-1 extends it): (a) no row names a profile **family** — T-V11-4 refuses every one ("every class row names its
ONE family"); (b) the profile cells are outside V11 §2.3's types — `sacredness` as an emission (`v.parish_church`,
`v.chapel`; V11 §2.3 removed it: "Holiness is not a nuisance"), clientele `local` and two values at once (`v.smithy`
"travellers, local" where `clientele` is one value), alignment words (`common`, `elite`, `law`, `sacred`) for a
`{ law, sacred, status }` triple, needs with no `Need` id (`clay`, `the commons`, `the palisade`, `wood`), coverage units
V11's `CoverageSpec` has no form for ("nucleus beyond 800 m of a church : 1", "households : 1 per 250 people",
"settlement : 1 per 500 people"), balance words (`heavy processor`, `everyday service`) for the enum; (c) `K` reads the
base's `distribution` but writes `clustered` (`v.landing`, `v.wood_yard`, `v.charcoal_pit`, `v.potter`), not one of
`'district-defining'|'dispersed'|'singular'`; `significance`, `powers` and `sectors` are absent; (d) no designation
template — no footprint, plot area, floors or yard parts per band (T-V11-7: "every class's template compiles for every
band"; V07 §8's risk 3 leaves the rows "ours to author"); (e) no `deckOk` cell, while V07 §3.10a (4) reads "V11's `deckOk`
… with the village reading" and V11 §3.24.4 answers "V07's village rows carry their own cells" — so `v.chapel`, compiled to
`[]`, can never stand on a bridge although V07 T6 places "a chapel" on a deck face; (f) the **presence laws** — `PLaw`s
with conditions ("seigneurial government", "a reach with ≥ 1 m of fall within 1 km", "no watermill site", "with a church",
"timber ≥ 0.4", "`Intent.defence` ≥ 0.6") — have no field in `BuildingClassRow` (which holds `perCapita`, `min`,
`firstAtPopulation`, `requires`) and no base change request adds one, so S2 has nowhere to read them; (g) the signature
pairs are prose ("at the green or on the highest ground within 200 m of the heart") where the solver reads `RelationRule`
rows whose `to` lies in V11 §3.3.3's vocabulary (T-V11-3), which has no "heart". **Required change:** V07 §2.4 restates
its class table as typed rows a compiler can read, one row per `v.` class, with: `family` (one V11 §3.4 key —
recommended: the dwellings `housing`, `v.farmstead` `housing` with `E+ smell 2, traffic 1`, the churches and the chapel
`worship`, the parsonage `housing` with `alignment sacred +`, the mills `food`, the smithy `metalwork`, the alehouse and
inn `lodging`, the bakehouse `food`, the tannery `leatherwork`, the potter `craft`, the wood yard `timber-yard`, the
charcoal pit `extraction`, the landing `port`, the watchtower `fortification`, the reeve's house `civic-authority`, the
tithe barn and the pound `farming`, the shop `trade`); the profile as V11 §3.5.2 deltas on that family (sacredness →
`alignment sacred +`, no emission; `local` → `dailyLocal`; `town-wide` → `townWide`; a second clientele → an authored
`frontage` or `nearGate` row; `common` → `0 · 0 · 0`; `elite` → `status +`; `law` → `law +`; clay → `N+ deposit (hard)`
with `deposit:clay`; wood → `N+ woodEdge`; the commons → an authored `near` → `landuse:commons` row; the palisade → an
authored `near` → `wall` row); coverage in V11's units (`v.chapel` `walk : 800` per nucleus, `v.alehouse` `households :
1 per 55` = 250 people ÷ the 4.5 mean, `v.watermill`'s "1 per 500 people" as `perCapita [1, 500]` with no `V` cell);
`distribution` in the base's enum (`clustered` → `dispersed` with `K cluster`); `significance`, `powers`, `sectors`;
`deckOk` (recommended `v.chapel` `[bridge]`, `v.landing` `[pier, quay]`, every other `v.` row `[]`; the net shed and boat
shed are structures of the landing, not classes); a `templateFamily` naming the V11 §3.6.1 family its budget rows compile
from (V02's `composition.classFamily`, keyed `v.` per SR1-05, stays the composition key and is read before
`templateFamily` for a `v.` key — J-V7.82 amended by that one clause); the signature pairs as `RelationRule` rows (kind,
`to`, `withinM`/`beyondM`, weight), "the heart" read as the base's `nearCentre` with `dist.centre` measured to
`VillagePlan.heart` at village rungs; and a new **BCR-V7-36** to §10.2 `BuildingClassRow`: `presence?: { when?:
PresenceWhen; law: PLaw }[] /* read by S2 at the rungs whose RungProfile.frameLaw is 'territory' (the village rows):
the first member is drawn on roster/<class>/<ordinal> against the law of the first entry whose condition holds; further
members by perCapita; absent: perCapita, min and firstAtPopulation as today */` with `PresenceWhen` typed once (`gov?:
GovernmentRow['kind'][]; siteNeed?: Need; withClass?: string; resourceMin?: { key: string; min: number }; defenceMin?:
number`). A new bar T-V7-56: the village rows compile under T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 (T-V11-0 run
over V07's rows). Companion: SR1-08 (V11).

### Majors

**SR1-02** · major · unwired · **V07** — `@absent:church` is a no-op at the only rungs it occurs. V11 §3.11 maps
`access_to_parish_church` (tiers T and H only) → `@absent:church`; V08 §2.6a (3) reads it "S2's `church` `min` and
per-capita demand 0 … (the parish church is a neighbour's)" and T-V8-46 expects "a hamlet fixture … with `Access to parish
church` (`@absent:church`) no church of its own". At THORP and HAMLET S2 runs the village roster, whose church is
`v.parish_church` (presence (40, 0) → (200, 0.3) → (400, 1)); zeroing the town class `church` changes nothing, so a
300-person hamlet whose dossier says its church is a neighbour's still draws one at ≈ 0.7 (the law read in ln P). V07 §3.11 step 1 reads
"`@absent:<class>[+<class>]` to S2 — each named class's `min` and per-capita demand 0", names no village reading, and V07
mentions `access_to_parish_church` nowhere (the external mill works only because J-V7.58 names both village mills).
**Required change:** V07 §3.11 step 1's `@absent` clause adds: "at a village rung each named class is read through its
`villageForm` (V11 §3.22) — `@absent:church` zeroes `v.parish_church` (its presence law and its members, and with it the
rows keyed on a parish church: `v.parsonage`, `v.tithe_barn`), `@absent:watermill+windmill` zeroes `v.watermill` and
`v.windmill`; `v.chapel`'s 'no church' presence stands (a chapel of ease served a parish whose church was a neighbour's)";
W56 and the §1b trace gain `access_to_parish_church`; T-V7-13 gains "an `access_to_parish_church` fixture has no parish
church, no parsonage and no tithe barn of its own, and T-V7-42's `@absent` clause is asserted at THORP and HAMLET"; a J-V7
row records the reading. Companions: SR1-07 (V11), SR1-27 (V08).

**SR1-03** · major · term conflict · **V11** — The churchyard's yard-part name. The base names it `churchyard` (§4.9's row,
l. 5935: "every church / temple plot: a `churchyard` part ≥ 30 % of the plot's yard"; `YardPart.kind`, l. 1023); V04 §3.5.1
(1) (a) reads burial faces as "the `churchyard` part of a church or temple plot" and (d) "a monastery's `burial` yard
part"; V07 §2.4 names the village church's burial face "the parish church's `churchyard` yard part". V11 §3.6.1's yard
table gives the `church` family "burial 0.3" and the `cathedral` family "burial 0.15", and claims "V04 §3.5.1 reads every
burial face by this one part name"; V11 §3.12's `parish_burial_grounds` members are "the `burial` yard part of each church
plot", W28 and the `TemplateFamilyRow` comment say the same. A builder following V11's compiled templates ships church
plots with no `churchyard` part, so V04's candidate pass finds no churchyard and no catacomb forms under one; one
following V04 finds no `burial` part on a church plot, so `parish_burial_grounds` binds no member and places a spurious
cemetery plot (V11's "a `cemetery` plot where no church stands"). **Required change:** V11 §3.6.1's yard table names the
part `churchyard` on the `church` (0.3) and `cathedral` (0.15) families, keeps `burial` on `cloister` (V04 (d)) and on
`burial-ground`; the sentence reads "the `churchyard` part of a church or cathedral plot and the `burial` part of a cloister
or burial ground are burial faces — V04 §3.5.1 (1) (a) and (d) read them by these two names — and never the church
building"; §2.8's `TemplateFamilyRow.yard` comment, W28 and §3.12's `parish_burial_grounds` member cell ("the `churchyard`
part of each church plot, `v.parish_church`'s at a village rung") follow.

**SR1-04** · major · unwired key · **V07** — VS1 reads a data key no stage produces. V07 §3.0's stage table gives VS1 the
input "`site.latitude` (V08's latitude row, else the default)" and §3.2 (4) sweeps the sun "at the site's latitude, V08's
latitude row"; no stage, volume or base section produces `site.latitude` (grep: V07 alone names it). V08 delivers the
latitude as `Intent.latitudeDeg` at creation and `PortValues.latitudeDeg` at later epochs, with the resolution rule "the
site latitude in force is `port.latitudeDeg` when not null, else `Intent.latitudeDeg`, else 50" (V08 §2.5), and its §1b
row feeds them "to V07's village sweeps". T-V7-3 ("every input key of every stage in the set has exactly one producer in
it") fails on this key. **Required change:** V07 §3.0's VS1 row and §3.2 (4) read "the latitude in force by V08 §2.5's
resolution rule (`CircumstanceSlice.port.latitudeDeg`, else the blueprint's `Intent.latitudeDeg`, else 50)" from the
recipe and the epoch's slice (recorded inputs, not a stage data key), and W42's "fed by" cell says the same; the
`site.latitude` key is removed.

**SR1-05** · major · stale ids · **V02** — The village classes' composition keys are keyed by the old ids. V02 §3.10.5's
`composition.classFamily` — "the composition key of a class with no `templateFamily` (V07's village-only classes) and of a
shared class id at village rungs (scope `village`)" — lists `longhouse`, `farmstead`, `yeoman_house`, `manor_house`,
`parsonage`, `reeve_house`, `parish_church`, `tithe_barn` and the "scope `village`" rows `hovel`, `cottage`, `chapel`,
`inn`, `watchtower`, `watermill`, `windmill`, `smithy`, `potter`, `tannery`; §3.10.3 reads "(`manor_house` → `manor`)".
Since SS-01 and SS-47 the village rows are `v.<id>` keys that share nothing with the town ids (J-V7.95, J-V11.58), so every
village building's composition lookup misses (V07 J-V7.82 makes this table "the one source of the village classes'
composition keys"), and the "scope `village`" rows would re-dress the town classes of the same word at village rungs.
**Required change:** V02 §3.10.5 keys every row by V07's `v.` key (`v.longhouse`, `v.farmstead`, …, `v.tannery`), drops
the `scope` column (a `v.` key is village-only by construction), and adds rows for the village classes it lacks
(`v.alehouse`, `v.bakehouse`, `v.pound`, `v.shop`, `v.landing`, `v.wood_yard`, `v.charcoal_pit`, each with its key);
§3.10.3's parenthesis reads "(`v.manor_house` → `manor`)". (Also in seam-stage2-3's scope; named here because the ids
are V07's and V11's.)

**SR1-06** · major · stale ids · **V03** — The village plan rows are keyed by the old ids. V03's "village class rows (V07
§2.4's classes, same resolution)" (l. 791–796) and its dwelling-form rule (l. 970–974) name `longhouse`, `farmstead`,
`yeoman_house`, `manor_house`, `parish_church`, `parsonage`; after SS-01 none of these is a class key, so the plan rung finds
no room programme for a village building. **Required change:** V03's village rows and the dwelling-form sentence name the
`v.` keys (`v.longhouse`, `v.farmstead`, `v.yeoman_house`, `v.manor_house`, `v.parish_church`, `v.parsonage`), and V03's
programme rows keyed "by class and band" state that a `v.` key without a row of its own reads the row its V02
`composition.classFamily` key names (SR1-05).

### Minors

**SR1-07** · minor · companion · **V11** — V11 §3.11's `@absent` sentence ("S2 sets each named class's `min` and per-capita
demand to 0 … a village using a neighbour's mill or parish church") and W35 give no village-rung reading. **Required
change:** both add "(at a village rung, the `v.` class that plays each named class through its `villageForm`, V07 §3.11
step 1; SR1-02)".

**SR1-08** · minor · companion · **V11** — V11 §2.3's list of `BuildingClassRow` additions and §3.2.1 step 6 say nothing of
the village rows' `presence` column or of running the class invariants over the `v.` rows. **Required change:** V11 §2.3
names V07's `presence?` column (BCR-V7-36, SR1-01) among the row's fields, compiled as written; §3.2.1 step 6 and T-V11-0
run T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 over the `v.` rows as over every class; §3.5.14's "cited, not restated"
adds "compiled by the same rules".

**SR1-09** · minor · stale wording · **V07** — Three places still describe the withdrawn port path: W1's "feeds" cell
("V08's rung path"), W30's piece name ("the port's rung path `[1, 1 500)`"), V-M2's content ("the port's rung path").
**Required change:** read "the port's consultation of `LadderRouter` (V08 §3.10; file f item 202)" in all three.

**SR1-10** · minor · wording · **V07** — V07 §2.4's stepped-massing paragraph says the village cells are "this volume's …
the chance V11's TOWN value for a culture key outside those §2.2's `cultureForms` names, 0 for celtic, norse, …", and §1's
dependency (7) says "the village cells of the specialisation rows … and the village reading of `deckOk` … are this
volume's rows". V11's `CultureSpecialisationRow` has no rung column (one chance per culture, class and specialisation), the
European cultures have no row at all, and V07 holds no chance cell. **Required change:** "the chance is V11 §3.24.3's row's
(no rung column; the European cultures have no row, so their chance is 0); the one village cell is the cap
`tiers.capPerSettlement`"; dependency (7) drops the chance and names the `deckOk` cells of SR1-01; J-V7.94's
"chance 0 for the culture keys `cultureForms` names" reads "no row for them in V11".

**SR1-11** · minor · contradiction by precedence · **V07** — IN-V07-2 still says "volume 11 §3.24.3's `villageCap` 1 is the
village cell of the specialisation rows"; the note "supersedes any sentence of this volume that reads otherwise", so it
overrides §2.4's `tiers.capPerSettlement` with a column V11 dropped (SS-31). **Required change:** IN-V07-2 gains "(the
`villageCap` clause superseded by reconciliation round 1, SS-31: the village cap is `rules.tiers.capPerSettlement`, per
settlement)"; `_integrate.md` J-VI.16's same clause gets the same note from the integration lane's next round.

**SR1-12** · minor · restated values · **V07** — Values V11 or file g own are still restated: §1's hook paragraph gives
"`slopeMin` 0.15, `stepMinCm` 60, `stepMaxCm` 400, `minTerraceDepthM` 6 at TOWN"; §3.16 (1) states `RuinRule.chance` at
village rungs (0.02 / 0.03 / 0.05 / 0.06) citing "V04 §2.3's blueprint row" (the rows are V11 §3.23.2's, V11 §2.8b; rule
R-c) and `cavern.mineBoost` 1.4 capped at 0.9; §3.16 (3) `DigRule.reachM` 6 m and the ruin entrance 0.6 / 1; §3.16 (4)
`cavern.breachM` 40 m. **Required change:** each cites its cell (V11 §3.24.1's TOWN row; V11 §3.23.2, §3.23.7; file g item
109 (a)'s values as V11 §3.23.1 registers them) and drops the number; T-V7-44's scan covers §1.

**SR1-13** · minor · count · **V07** — T-V7-42's parenthetical "(182 at the pinned line)" double-counts six kinds that carry
both a village tier and W; the distinct count is 176 (97 + 85 − 6; script over V11 §3.11). Round 0's SS-22 carried the
error. **Required change:** "(176 at the pinned line)"; the bar's own count stays read from the manifest.

**SR1-14** · minor · unwired case · **V07** — A seat record may bind no building. `@seat` binds `GovernmentRow.villageSeat`
(V11 §3.21.1: seigneurial and crown → `v.manor_house`; commune and oligarchy → `v.reeve_house`), but V07 §2.4's presence
laws give `v.manor_house` 0.4 below 40 people and only 0.05–0.3 without a seigneurial government (so a crown village), and
`v.reeve_house` only under "chartered or council government" (so no merchant-oligarchy village), (40, 0.3) at a thorp; a
`lord_s_reeve` (T) or `village_headman` (H) record can then find no seat. **Required change:** V07 §3.11 DR11 adds "a
dossier's government (or an `@seat` record) forces its `villageSeat` class present with one member at every village rung,
whatever its presence law" and the two rows' presence cells read "forced by DR11 when the government's `villageSeat` names
it".

**SR1-15** · minor · missing reading · **V07** — Every small SettlementForge town routed to the VILLAGE rung carries
`Parish burial grounds` (its tier's burial record, V08 §2.6a (3)); V07's burial paragraph reads only `burial_ground` and
`graveyard`, and its ladder table lists no reading for `parish_burial_grounds`, whose V11 row is a COUNT over the church
plots' churchyards. **Required change:** V07 §3.11's burial paragraph adds "a `parish_burial_grounds` record (W) reads V11
§3.12's COUNT: one member per standing `v.parish_church`'s `churchyard` part (SR1-03), each bound `#k` and a burial face,
none enlarged; a `cemetery` plot at the edge only where no church stands"; T-V7-45 gains the clause.

**SR1-16** · minor · keying · **V07** — The village range rows (`rules.ladders.ranges`) are keyed by qualifier word, so an
unnumbered record stepped by V11's `dossier.ladders` with no qualifier in its name (`tanners`, COUNT 2–5; the trade GUILD
kinds of tier W, 3–12) misses them and takes V11's town range at a 1 000-person village, against J-V7.39 ("a village's
population supports only a few members"). **Required change:** key the rows by step type (`COUNT`, `GUILD`, `QUARTER`,
`SIZE`) with the qualifier as their label, so every unnumbered stepped record at a village rung reads its step's row;
V08 §3.5.1 (b)'s sentence then reads "for its step type and member class" (the one-word companion, applied by V08's next
round).

**SR1-17** · minor · wording · **V07** — V07 §2.4's namespace paragraph says "a town class reaches a village rung only
through a `villageForm` naming a `v.` key", while §3.11 step 3 and V11 §3.22 let every class without a village form play
itself once a dossier names it (115 kinds route so). **Required change:** "a town class that has a village form reaches a
village rung only through it; every other class plays itself once a dossier names it (§3.11 step 3)".

**SR1-18** · minor · data home · **V07** — The tag fallback (§3.11 step 4) keys rows on undefined word sets — "a drink
word", "a grain-processing or mill word", "fishing words", "timber words", "clay or pottery words" — which no table holds
(rules are data, item 23). **Required change:** each reads "a keyword of V11 §3.13.2's table of family `F` in the record's
name" (`food-works` or `lodging` for drink, `food` with the key `mill`, `port` for fishing, `timber-yard`, `industry` with
the key `kiln` for pottery), so the fallback reads one table.

**SR1-19** · minor · notation · **V11** — Two archetype `village` deltas are not in V11 §3.5.2's notation, which the `delta`
cell promises "where it has one": `exotic-tower`'s "apart from the heart" and `industrial-workshop`'s "`N− clay`" (`clay` is
no `Need` id). **Required change:** `exotic-tower` reads `S+ noise 2` plus the authored row `far` → `#housing` beyond 60 m
soft (the town archetype's own row); `industrial-workshop` reads `N− deposit`.

**SR1-20** · minor · looser restatement · **V11** — V11 §3.12 says a GUILD record's hall "IS one member of that COUNT record"
wherever "a craft- or merchant-guild COUNT record" stands; V08 §3.5.1 (c) and J-V8.83 bind it only into the COUNT record of
its `categories` family (`craft` → `craft_guilds_*`, `trade` → `merchant_guilds_*`), a guild of another family keeping its
own hall. V07 §3.11 cites V11's sentence. **Required change:** V11 §3.12's sentence cites V08 §3.5.1 (c)'s family rule
(J-V8.83) in place of its own wording.

**SR1-21** · minor · incomplete list · **V11** — V11 §3.22 says "Two readings come before this column: a scene archetype's
`village` cell … and a government seat's `villageSeat`"; V07 §3.11 also reads a `cemetery`-class record as the churchyard
before any class row plays, and `@absent` at a village rung (SR1-02). **Required change:** "Four readings come before this
column: … the `villageSeat`, V07 §3.11's burial-record seat and its `@absent` reading".

**SR1-22** · minor · missing cell · **V11** — V11 §3.24.7 (2) says "the row `toll_bridge` carries `implies: 'bridge'` (V11
§3.11)", but §3.11's row reads `| toll_bridge (Economy) | V | toll_house |` with no cell. **Required change:** the row reads
"`toll_house`; `implies: 'bridge'`" (the table's rows home, where V08's DR1 and V07's §3.1 (1) look).

**SR1-23** · minor · restated shape · **V11** — Registry row 77 and X-V11-1 give the catalogue manifest as "`{ kind, tiers,
category }[]` — names, tiers and categories only" plus `ladderPairs`; its writer, V08 §2.4, writes each kind's
`catalogId`, name, tiers and category. **Required change:** row 77 and X-V11-1 cite "V08 §2.4's manifest shape" and drop
their own.

**SR1-24** · minor · stale id · **V04** — V04's church count reads the class `parish_church` (l. 1427; T-V4-50; l. 3101,
BCR-36's count, which file f item 560 applies) — no longer a class key after SS-01. **Required change:** read
`v.parish_church` in all three (the catalogue kind `parish_church` elsewhere is a kind, correctly unprefixed).

**SR1-25** · minor · stale record · **V11** — §13's F-V11-4 and §12's PLAUSIBLE line still say V07's halves of SS-31,
SS-09, SS-06 and SS-18 await V07's lane; reconcile-V07-r1 applied all four (its note's last paragraph). **Required change:**
F-V11-4 marked closed by reconcile-V07-r1; the §12 clause removed.

**SR1-26** · minor · restated rule · **V08** — V08 §3.5 step 6 restates the good-word matching rule ("each token and each
adjacent pair is looked up; the label yields every good it matches, in order, de-duplicated") where V11 §3.13.5 is the
rule's one statement (SS-25) — and "in order" leaves open label order versus V11's "the table's row order". **Required
change:** step 6 reads "each label is resolved by V11 §3.13.5's matching rule; a label matching none is noted
`unmapped_good`".

**SR1-27** · minor · untestable bar · **V08** — T-V8-46 runs at SF3 with "a hamlet fixture with `Access to external mill`
… and one with `Access to parish church`", but a hamlet is refused (B7) until the village product registers (VH).
**Required change:** the two hamlet clauses move to VH (with V07's rows, after SR1-02), the SF3 part keeping the compile
check and a base-rung test-side mutation of a fixture carrying both `@absent` records.

**SR1-28** · minor · stale record · **V08** — V08 §12 still reads "PLAUSIBLE until reconcile-V11-r1 lands: V11's SS-26
burial pairs, SS-09's `village` archetype cell and SS-36's `+` spelling", and §13 X14 lists them as pending; V11 and V07
landed all of them (§1 above). **Required change:** §12 moves them to CONFIRMED (read at V11 §3.12 l. 2146–2147, §2.8
l. 493, §3.11 l. 1917; V07 l. 1921); X14 is marked closed.

**SR1-29** · minor · base text left unamended · **BASE-F** — File f item 202 adds to §1.1 and PART III but leaves two base
sentences that now read wrongly: §1.1's "A dossier's rung follows its population by these bands, at creation and at each
epoch's target (§4.11)" (inside item 322's band a 1 440-person town stays on the TOWN row), and PART III's last paragraph,
"waits for the village product's own port path, which registers its rung rows behind the same port (§14)" (the port
registers nothing). **Required change:** item 202 replaces the first with "… at creation and, at each epoch's target, by
§4.11's rung at an epoch (inside item 322's hand-off band the previous product's edge row)", and the second clause with
"waits for the village product's registration (its `ProductDecl`, §4.12), which the one port consults through
`LadderRouter`".

**SR1-30** · minor · ownership wording · **BASE-F** — File f item 510's sentence "the shapes of `kinds`, `archetypes`,
`categorySynonyms` and `keywords` are volume V08's" hides that the `archetypes` row's `village` cell is V11's
`ArchetypeVillageCell` (V11 §2.8; V08 §2.6 cites it). **Required change:** item 510 adds "(the `archetypes` row's optional
`village` cell typed by volume V11 §2.8)".

**SR1-31** · minor · base text · **V07** — PART III's *Placement and designation* says the solver's rows "already carry the
village classes — cottage, farmstead, mill, smithy, chapel, inn"; after SS-01 the village classes are V07's own `v.` rows,
added, not the town rows reused. **Required change:** a BCR-V7-37 on PART III, *Placement and designation (items 16–19)*:
"… whose rows gain the village classes as their own `v.` keys (V07 §2.4; V11 §2.9) — a village adds rows, not code".

## 7 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V07 | 1 (SR1-01) | 2 (SR1-02, SR1-04) | 11 (SR1-09 – SR1-18, SR1-31) | 14 |
| V11 | 0 | 1 (SR1-03) | 8 (SR1-07, 08, 19, 20, 21, 22, 23, 25) | 9 |
| V08 | 0 | 0 | 3 (SR1-26, 27, 28) | 3 |
| V02 | 0 | 1 (SR1-05) | 0 | 1 |
| V03 | 0 | 1 (SR1-06) | 0 | 1 |
| V04 | 0 | 0 | 1 (SR1-24) | 1 |
| BASE-F | 0 | 0 | 2 (SR1-29, 30) | 2 |
| **total** | **1** | **5** | **25** | **31** (SR1-01 – SR1-31) |

**Round 0's 47:** all FIXED at the places named (§1); none reopened.

**Order of work.** SR1-01 with its companion SR1-08 first — the village rows are the table every other village reading
lands on — together with SR1-05 and SR1-06 (the same rename's consumers) and SR1-03 (the churchyard's name, read by
SR1-15); then SR1-02 with SR1-07 and SR1-27, SR1-04; then the minors, each with its pair.

## 8 Decisions and CONFIRMED versus PLAUSIBLE

**J-SR1 rows (this lane's own calls, vetoable).**
* **J-SR1.1** — Finished in one pass past the ~300 k checkpoint, as round 0 did (J-SS.1), over checkpointing before
  writing, because a seam is judged on the three volumes read whole and a continuation would have had to re-read them;
  the base was read at the passages the seam touches, and the consumers outside the three volumes (V02, V03, V04, V10) only
  at the lines their findings cite.
* **J-SR1.2** — Rated SR1-01 a blocker, over a major, because it is round 0's SS-01 class: the table V07 homes cannot be
  compiled by V11's compiler (T-V11-4, T-V11-7) nor read by S2 (no presence field), so the village's institutions cannot
  be built as written.
* **J-SR1.3** — Raised the stale ids in V02, V03 and V04 (SR1-05, SR1-06, SR1-24) here, over leaving them to the other seams,
  because the ids are this seam's (V07's namespace, V11's rule) and round 0's fix created the mismatch; each finding notes
  the overlap so a later round does not double-count it.
* **J-SR1.4** — Gave SR1-01 a recommended family, `deckOk` and translation per word, over naming only the columns, so the
  owning lane can apply it without re-deciding; every recommendation is V07's to change (J-V7.41 keeps the village rows
  V07's).
* **J-SR1.5** — Corrected round 0's own count (SR1-13: 176, not 182) rather than let the bar's parenthetical stand, because
  the error was this lane's.

**CONFIRMED (read or executed in this lane).** Every quotation above was read at its line in the named file, whose md5
(§0) was unchanged when this file was written; each round-0 fix was read at the line in `evidence.txt`; the census —
280 kinds, 28 `villageForm` entries, 176 kinds reaching a village rung (97 T/H/V, 85 W, 6 both), 34 pseudo / 27 village
form / 115 own class / 0 fallback, every `v.` target present among V07's 25 rows — was counted by script
(`census2.out`); the grep for unprefixed village ids across every volume and file f (V02, V03, V04 hits; V10's are
catalogue kinds, correctly unprefixed); `site.latitude` named by V07 alone across the volumes, the base and files f and g
(grep); the base's `BuildingClassRow` (no presence field), `distribution` enum, `YardPart.kind` and §4.9's `churchyard` row
read at their lines; V04 §3.5.1 (1)'s two part names read.

**PLAUSIBLE (reasoning).** The consequences named in SR1-03 (what a builder following one text or the other would ship)
and SR1-02's ≈ 0.7 presence at 300 people (the `PLaw` read by hand, in ln P); the recommended values of SR1-01, SR1-16's
step-keyed rows and SR1-18's keyword families (judgments, vetoable by V07); that the coherence pass will not itself produce
a `site.latitude` key from file g item 102's text (item 102 names the latitude only as the path sun's input).
