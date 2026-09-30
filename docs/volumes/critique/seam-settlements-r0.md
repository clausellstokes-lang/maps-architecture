# Seam check: the village (V07), the SettlementForge stage (V08) and the content tables (V11) — round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-settlements-r0; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Census A: dossier kinds x size rungs -> class rows (every kind at every size lands in a row) | done
- §2 Census B: the small-settlement hand-off (V08 -> V07 -> V11 and back) | done
- §3 Census C: the ladders meeting (item 108: V08 ladder data, V11 step-type rows, V07/base consumers) | done
- §4 Census D: cross-seam records, ids, terms, units, BCRs | done
- §5 Findings (SS-01 onward) | done
- §6 Disposition summary by owning volume | done
- §7 CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

**Read whole, line by line** (md5 at start and re-checked unchanged before writing):

| file | md5 | lines |
|---|---|---|
| `docs/volumes/V07-village.md` | 80591ffd… | 3 134 |
| `docs/volumes/V08-settlementforge.md` | 121043f8… | 2 746 |
| `docs/volumes/V11-content.md` | 954192b3… | 3 934 |
| `docs/volumes/_integrate.md` | e6808ba9… | 365 |
| `docs/AMENDMENTS-2026-09-28f.md` | 7e76cc92… | 989 |

**The base sections the three share** (`docs/ARCHITECTURE.md`, md5 01fea21f…): §1.1 (l. 274–350) whole; PART III (l.
16189–16267) whole; §7.7 items 9–16 with the derivation table DR1–DR25, the key law, the receipt table and the status
rows (l. 9266–9453) whole; §14's `DossierDigest`, `DossierInstitution`, `creation`, `absorb`, `HostContext`, the audience
table, item 7's row sets and the extension points (l. 14381–14421, 14466–14521, 14616–14626). §10.2 and
§4.11 were read only where a volume quotes them (their quoted sentences are the ones the BCRs carry, re-checked by the
volumes' own quote scripts); nothing in this critique rests on an unread passage of them.

**Scripts** (scratch `scratchpad/volumes/`): `ss-kinds.txt` — the 280 rows of V11 §3.11 extracted; `ss-census.out` —
every kind carrying tier T, H, V or W, classified by its routing at a village rung under V11 §3.22's `villageForm` list
(33 pseudo-class, 39 with a village form of which 15 map a class onto the SAME id, 110 with none). Running notes:
`ss-notes.md`.

**What the checks were.** (A) every catalogue kind at every size it can arrive at lands in a class row, one route only;
(B) the small-settlement hand-off — routing, registration, the band, population edges, the burial and water records
across 1 500; (C) the ladders — V08's grammar and qualifiers, V11's step rows, V07's village readings, DR9's counting;
(D) every record, id, term, unit and base change request the three share, and the file-f items that carry them.
Severity: blocker (the subject cannot be built as written), major (a contradiction or an unwired piece a builder
would hit), minor (wording, pointer, a restated value). Each finding names ONE owning volume (V07, V08, V11 or BASE-F)
and an exact required change; where two volumes must move, the companion is its own finding.

**Budget note (recorded, vetoable).** The lane's guidance is a checkpoint near 300 k tokens. Reading the three volumes
whole cost about that alone; a checkpoint before writing would have made the continuation re-read all of them (a seam
cannot be judged from notes), so this run finished in one pass and the base was read at the passages the seam touches
rather than whole — J-SS.1 below.

## 1 Census A — every dossier kind at every size lands in a class row

**The size map.** SettlementForge's tiers and our rungs (DR23: the rung is the population's; the tier word only titles):
thorp 8–60 → THORP; hamlet 61–400 → THORP below 80, HAMLET above; village 401–900 → VILLAGE; town 901–1 499 → VILLAGE
(the village product, V07 §3.11), 1 500–5 000 → TOWN; city 5 001–25 000 → TOWN below 10 000, CITY above; metropolis →
CITY or METROPOLIS. So a village rung receives every kind of tiers T, H, V (97 kinds) **and** every kind of tier W (85
kinds) — 182 kinds; a base rung receives all 280.

**Base rungs.** Every one of the 280 kinds has a `dossier.kinds` row naming a V11 class or pseudo-class (T-V11-2; the
script re-found 280 rows and every class defined in V11 §3.5). Two row-level defects remain there: `gates_if_walled` →
`@wall` makes a conditional gate record force a wall (SS-44), and `@absent:` is a pseudo-class V08's shape cannot carry
(SS-10).

**Village rungs.** The route is V07 §3.11's (J-V7.56): pseudo-reader → the class's `villageForm` → the class's own row
→ the tag fallback (only after `unmapped_kind`). The census (`ss-census.out`) splits the 182 kinds:

| route at a village rung | kinds | what breaks |
|---|---|---|
| pseudo-class (`@housing`, `@wall`, `@seat`, `@office`, `@pin:*`, `@landuse:*`, `@none`, `@absent:*`) | 33 | `@seat` resolves to a town seat class (castle, palace) with no village form (SS-06); `@absent:` has no V08 route (SS-10, SS-43) |
| a `villageForm` (V11 §3.22) | 39 | 15 map a class onto the same id (`smithy` → `smithy`, `farmstead` → `farmstead`, …): one `roster.classes` key would hold two rows (SS-01, SS-47); `guildhall` → `reeve_house` turns guild records into reeve houses (SS-03) |
| no `villageForm` | 110 | V07 says the class plays itself; V11 §3.22 says the record falls to V07's fallback rows — two different maps for the same dossier (SS-02) |

T-V7-42, the bar meant to hold this, counts "111 kinds of tiers T, H and V" (V11 has 97) and omits the 85 W kinds that
reach the VILLAGE rung (SS-22). Beyond routing: the 17 scene archetypes have no data home for V07's village readings
(SS-09); the militia, the town watch and the seats disagree between V07 and V11 (SS-05, SS-06).

## 2 Census B — the small-settlement hand-off

* **Routing and registration.** Two registrations of one product: V07's `ProductDecl` in `StrategyRegistry.products`
  (BCR-V7-11, file f item 326) and V08's `PortRungPath` through `registerRungPath` (BCR-V8-9, item 202), each stating
  the range and the strategies, with different strategy ids (SS-19, SS-28).
* **The band.** V07 hands over at 1 575 up and below 1 425 down (a fold, `handoff.band`; BCR-V7-26, item 322); V08 §3.10
  and T-V8-19 cross at 1 500 and read "the new rung's row" (SS-20).
* **The population floor.** V07 routes a population of 0 at an absorb to THORP's desertion (BCR-V7-17); V08's digest
  refuses any population below 1 as a malformed shape and holds the map (SS-21).
* **Burial records across the crossing.** `graveyard` / `burial_ground` (village) and `parish_burial_grounds` (town)
  have no ladder pair, so V08 §2.6a (4)'s "a tier change is not a closure" cannot re-bind the village's burial face and
  V07 §3.12 step 6's churchyard age has no binding to ride (SS-26).
* **Water records.** `water_source` → `multiple_water_sources` is a COUNT of 2–5 well pins in V11 while V07 sites wells
  by coverage (≈ 20 at 700 people) (SS-07).
* **A toll bridge on a dry village site** has no brook rule at village rungs (SS-27).
* **What holds.** The underground rows V07 reads (ruin chances by rung and relief, the mine boost, the dig rows, the
  openings, the catacomb TOWN chances, `cryptJoin`, `charnelMaxM2`) equal V11 §3.23's cells; the crypt column and the
  village church's crypt row are cited both ways; the maintenance mode, the ratchet and the catacomb step at the first
  TOWN epoch agree between V07 §3.12 and V08 §2.6a (4) (only restated numbers remain, SS-39).

## 3 Census C — the ladders meeting

* **Grammar and qualifiers** (V08 §3.5.1 (a), the `qualifiers` row): `multiple` → COUNT, `guild` → GUILD, `district` →
  QUARTER, `established` → SIZE — V07 §3.11 reads the same four words. Agreed.
* **Step types.** V11 §3.12 types `craft_guilds_*` and `merchant_guilds_*` as COUNT of guildhalls; V07 §2.4 types them
  GUILD (one hall plus trade members) (SS-04). V11 types `citizen_militia` → `town_watch` as REPLACEMENT with member
  `guard_post`; V07 gives the militia no building (SS-05).
* **Unnumbered ranges at village rungs.** Three statements, no precedence: V11's range (the kind's lowest tier, scaled
  only above it), V08 §3.5.1 (b)'s "V11's range column × its rung scale", V07's `rules.ladders.ranges` by qualifier and
  village rung (SS-08).
* **No double counting across records.** V11 §3.12 binds a GUILD record's hall into a craft- or merchant-guild COUNT;
  V08's merge (§3.5.1 (c)) covers only pairs of one ladder row (SS-23).
* **The village pairs V08's re-check added to V11** (wayside shrine → parish church, water source → multiple water
  sources, the mills, alehouses and inns) are missing from V07's village ladder table (SS-40).

## 4 Census D — records, ids, terms, units and base change requests across the seam

| subject | V07 | V08 | V11 | verdict |
|---|---|---|---|---|
| sea threat to a village | "V08's `threat` row" | `threats` row → `PortValues.threats`; 1b feeds "V07's watchtower row" | `WaterfrontThreatRow` keys | V07 names the wrong row (SS-14) |
| barrier rows | reads `walls.barriers` (IN-V07-4) keyed by J-VI.3's six kinds; every water arc closes | — | keys are eight defensibility classes; `shallowWater` walls full | keys and the water rule disagree (SS-15) |
| supply goods | `ale`, `hay`, `pots`, `wood`, `goods`, `lodging`, `shoeing` | — | `beer`, `fodder`, `pottery`, `logs`/`firewood`, `import` | V07's ids are not goods (SS-16) |
| custom-chain stores | entry store: a `store` use on the inn, landing or a farmstead | — | `endpointStore`: a new `warehouse` use | village reading missing (SS-17) |
| aqueduct chance | — | the water record never scales it (J-V8.67) | `dossierFactor` 1.5 (J-V11.48) | contradiction (SS-13) |
| custom class | — | archetype → group generic → generic Other, at digest | declaration, archetype, category, tags, definition fields, keyword `class`, fallback (J-VI.20) | two resolvers (SS-12) |
| keyword row shape | — | `{ key, family, weight, near? }` | adds `class`, `specialisation`, `binds` (X-V11-6) | V08 not updated (SS-11) |
| `@absent:` | `@none` | not in the `kinds` shape; `Access to parish church` → `@none` | `@absent:watermill, @absent:windmill`, `@absent:church` | unwired (SS-10, SS-36, SS-43) |
| dossier row sets in the registry | — | 31 sets (§2.6) | registry row 63 lists 19; the catalogue is closed | 12 unregistered (SS-24) |
| `goodWords` shape | — | "V11's `goodWords`" | "V08's shapes" | no owner (SS-25) |
| village names | settlement, ends, lanes, fields by our grammar rows | — | no village slice; `naming.settlement` features lack form and palisade | unwired (SS-18) |
| stepped massing at village rungs | eligible `parish_church`, `chapel`, `manor_house`, `reeve_house`, `watchtower`; `rules.tiers.capPerSettlement` 1 | — | rows keyed by town classes; `villageCap` 1 per row | reading and cap stated twice (SS-31) |
| kinds count | 111 T/H/V (T-V7-42) | "≈ 270" | 280 (97 T/H/V) | SS-22, SS-35 |
| BCRs in file f | BCR-V7-11, -17, -21, -26 | BCR-V8-9, -10 | BCR-V11-1, -4, -9 | registration and list overlaps unmerged (SS-19, SS-29, SS-30) |

## 5 Findings

Each: **id** · severity · kind · owner — the claim with its evidence, then the exact required change.

### Blockers

**SS-01** · blocker · data model · **V11** — One `roster.classes` key would hold two different rows. V11 §3.1 row 17 homes
"V11 §3.5 (town and city classes); V07 §2.4 (village classes)" in one table keyed by class id, and V11 §3.22 maps 13
town classes onto a village class of the SAME id (`hovel`, `cottage`, `farmstead`, `watermill`, `windmill`, `smithy`,
`alehouse`, `inn`, `shop`, `potter`, `tannery`, `chapel`, `watchtower`). The rows differ in substance — V07's `farmstead`
is a husbandman's dwelling in the village chosen by the class mix (V07 §2.4, §3.8), V11's is an outside hinterland farm
(V11 §3.5.10) that `dairy_farmer` and `agrarian-farmstead` bind to; V07's `chapel` is a crypt-less chapel of ease, V11's
a `basement` chapel (V07 §2.4 itself notes "the class id is shared with V11's town `chapel` row, and this row wins at village rungs", with no mechanism).
T-V11-3 refuses a reused key, so the compiler cannot build the table V07 and V11 describe, or one row silently shadows
the other. **Required change:** V11 §2.3 and §2.9 fix the village rows' namespace: every class row V07 §2.4 writes is keyed
`v.<id>` (`v.smithy`, `v.farmstead`, `v.parish_church`, `v.chapel`, …), `villageForm` must name a `v.` key (the compiler
refuses any other target and any unprefixed V07 row — a T-V11-3 clause), V11 §3.22's list is rewritten onto the `v.`
keys, V11 §3.1 row 17, §3.5.1's `church-family` tag list, §3.5.8's village-rows sentence and §3.23.8's church count name
`v.parish_church`; record the choice as a J-V11 row (chosen over a per-rung overlay on one row because the two rows share
no profile, template or presence law). Companion: SS-47 (V07).

**SS-47** · blocker · data model · **V07** — V07's class ids collide with V11's (SS-01). **Required change:** V07 §2.4's
class table, the supply table, the ladder table, the crypt rows, §2.2a, §3.8's class mix, §3.11's fallback rows and tag
fallback, §3.16 (3)'s dig rows, §4.5 and every T-V7 bar that names a village class use the `v.<id>` keys of SS-01;
§2.7's `BuildingClassRow.villageForm` sentence says "names a `v.` class".

### Majors

**SS-02** · major · contradiction · **V11** — A class with no village form: V11 §3.22 (l. 2898–2899) "at a village rung its
record falls to V07 §3.11's fallback rows (reported)"; V07 §3.11 step 3 and J-V7.56 "a class with its own row plays itself
— allowed at any rung once a dossier names it", the fallback reached "only [by] a kind that fell to V11's
`generic-<family>` class"; V11's own §3.11 routing order agrees with V07. 110 of the 182 kinds that reach a village rung
take this branch (census §1), so the two texts draw different villages from one dossier. **Required change:** V11 §3.22's
last two sentences read: "Every other class has no village form and plays itself at a village rung once a dossier names
it (V07 §3.11 step 3); the tag fallback is reached only by a kind that fell to a `generic-<family>` class
(`unmapped_kind`). Village classes no town class plays (`longhouse`, `parsonage`, `tithe_barn`, `pound`) stay
village-only."

**SS-03** · major · contradiction · **V11** — V11 §3.22 maps `guildhall` → `reeve_house`; V07 §2.4 reads a guild record as
"one guild hall (V11's guild-hall class, allowed at any rung once a dossier names it)". With V11 §3.12's COUNT rows
(`craft_guilds_5_15`: 5–15 guildhall members) a SettlementForge town of 901–1 499 people on the VILLAGE rung would stand
5–15 reeve's houses. **Required change:** V11 §3.22 maps only `town_hall` → `reeve_house`; `guildhall` has no village form
(it plays itself). The `mercantile-guildhall` archetype's village reading (V07: the reeve's row) moves to the archetype
cell of SS-09.

**SS-04** · major · contradiction · **V07** — V07 §2.4's ladder table types "Craft guilds, Merchant guilds (a range)" as
GUILD ("one guild hall … plus the record's members from the trades the roster already placed … topped up"); V11 §3.12
types `craft_guilds_5_15`, `_30_80`, `_100_150` and `merchant_guilds_3_8`, `_15_40`, `_50_100` as COUNT with member class
`guildhall`, and V08 §2.6's `distribution` row sends COUNT to dispersed members. **Required change:** V07 §2.4's row reads
"Craft guilds (5–15), Merchant guilds (3–8) | COUNT | that many `guildhall` members (V11 §3.12), each playing itself at a
village rung (SS-03), clamped into the record's range; a GUILD record's hall is one of them (V11 §3.12)", and a separate
row "A trade's guild — Cobblers', Tailors', Bowyers' and Fletchers' guild | GUILD | one `guildhall` plus the trade's
members (V11 §3.12's GUILD rows)"; T-V7-35's GUILD clause follows.

**SS-05** · major · contradiction · **V11** — V11 §3.11 maps `citizen_militia` (H, V, W) → `guard_post` and §3.12 makes
`town_watch` a REPLACEMENT of it with member `guard_post`; `guard_post` has no village form. V07 §2.4: "a militia has no
building (its muster is the green); a town watch at a village rung takes the `watchtower` row with a yard by the green".
**Required change:** V11 §3.11's row `citizen_militia` → `@none` at every rung (a muster, not a building; a J-V11 row), the
§3.12 `town_watch` row's note reads "the militia had no post; the watch builds its posts", and §3.22 gains `guard_post` →
`v.watchtower` (V07 §2.4's town-watch reading).

**SS-06** · major · unwired · **V11** — Government seats at village rungs. The `@seat` records (`lord_s_steward` H,V;
`lord_s_reeve` T; `village_elder`, `village_headman`, `village_reeve`) bind "to the government row's seat class, V11
§3.21.1": seigneurial → `castle` (a `tower_house` below CITY only when the castle toggle is off), ecclesiastical and
crown → `palace`. §3.22 gives `castle` and `palace` no village form, so a feudal hamlet's steward binds a castle. V07 §3.11
DR11: seigneurial → `manor_house`, an elder or household council or an elected reeve → `reeve_house` and the moot,
ecclesiastical → the parsonage. **Required change:** V11 §2.8's `GovernmentRow` gains `villageSeat: string` and §3.21.1
fills it from V07 §3.11 DR11 (cited): seigneurial `v.manor_house`, chartered_commune and merchant_oligarchy
`v.reeve_house` (with the moot pin), ecclesiastical `v.parsonage`, and crown `v.manor_house` (V07 names no crown row; the
lord's hall is its village seat — a J-V11 row); BCR-V11-8's type list carries the field; `@seat` at a
village rung binds `villageSeat`.

**SS-07** · major · contradiction · **V11** — Wells in a village with a water record. V11 §3.12 row `multiple_water_sources`
is a COUNT of `@pin:well` members, range 2–5, "every member count … clamped into the range"; V07 §3.10 sites wells by
coverage (one per 8 households within 120 m — ≈ 20 at 700 people). A pin has no per-capita row to clamp. **Required
change:** V11 §3.12 states that a COUNT whose member is a `@pin:*` kind sets a floor only: members = max(the range's low
end, the pin's own coverage count at the rung — V07 §3.10 at village rungs, §4.7's furniture step at base rungs), never
clamped to the range's top; the row's range cell reads "at least 2".

**SS-08** · major · contradiction · **V08** — Unnumbered ladder ranges at village rungs have three sources and no
precedence: V11 §2.6 / §3.12 (the range "at the kind's LOWEST tier", `rungScale` only above it), V08 §3.5.1 (b) ("V11's
range column × its rung scale"), V07 §2.4's `rules.ladders.ranges` by (qualifier, lesser class) per village rung
(J-V7.39, J-V7.41). `inn_multiple` (its name carrying "(multiple)") on the VILLAGE rung reads 2–6 in V11 and 2–4 in V07. **Required change:** V08 §3.5.1 (b)
adds: "At a village rung (THORP, HAMLET, VILLAGE) an unnumbered record takes V07 §2.4's range row for its qualifier and
member class (`village.json` `rules.ladders.ranges`), else V11's range unscaled"; V11 §3.12's range paragraph gains the
same sentence as a citation.

**SS-09** · major · unwired · **V11** — The scene archetypes at village rungs have no data home. V07 §2.4 (J-V7.78) maps
all 17 archetypes to village rows, some with profile deltas and two to pins (`mercantile-market` → a `market_cross` pin
with stalls; `sacred-shrine` → a `shrine` pin). V11 §3.13.2's rows (`id`, `class`, `family`) plus §3.22's single-class
`villageForm` reach a different village result for eight of them (`civic-archive` → `archive`, `exotic-tower` →
`mage_tower`, `industrial-workshop` → `workshop`, `martial-barracks` → `barracks` — no village form; `mercantile-market` →
`market_hall`; `sacred-sanctuary` → `church` → parish church where V07 says chapel; `sacred-shrine` → `chapel` where V07
says a shrine pin; `mercantile-guildhall` via SS-03), and V08 §2.6's `archetypes` shape can carry no delta or pin.
**Required change:** V11 §3.13.2's table gains a `village` column `{ class?: string /* a v. class */; pin?: string /* a
@pin:<kind> */; delta?: string /* V11 §3.5.2's delta notation */ }` filled from V07 §2.4's list (V07's values, cited), read
at village rungs before `villageForm`; V11 §10b asks V08 for the optional cell (with SS-11); T-V7-21 reads it.

**SS-10** · major · unwired · **V08** — The `@absent:` pseudo-class. V11 §3.11 maps `access_to_external_mill` →
"`@absent:watermill`, `@absent:windmill`" (two values in one cell) and `access_to_parish_church` → `@absent:church`, routed
to S2 (W35: the class's `min` and demand set to 0); V08 §2.6's `kinds` shape has `class: string` and lists no `@absent`,
and V08 §2.6a (3) routes `Access to parish church` → `@none`. DR24's builder finds no route and a two-valued cell.
**Required change:** V08 §2.6's `kinds` shape accepts `'@absent:<class>[+<class>]'` in its one `class` string (for
example `@absent:watermill+windmill`), routed by §3.5 (5) to S2 (each named class's `min` and per-capita demand 0 unless
another record names one); §2.6a (3)'s row reads `Access to parish church` | `@absent:church`. Companions: SS-36 (V11),
SS-43 (V07).

**SS-11** · major · unwired · **V08** — V08 §2.6's `keywords` shape is `{ key, family, weight, near? }`; V11 §3.13.2 writes
three more optional cells — `class`, `specialisation`, `binds: 'cryptAlways'` — requested as X-V11-6 / X-V11-1, which V08's
Integration notes do not adopt (IN-V08-1 – 4). **Required change:** V08 §2.6's `keywords` shape gains `class?: string`,
`specialisation?: 'stepped_temple'|'terraced_palace'|'tiered_tower'` and `binds?: 'cryptAlways'` (their effects are item
104's resolver's, V11 §3.13.2), and the `archetypes` shape gains SS-09's optional `village` cell.

**SS-12** · major · contradiction · **V08** — Two resolvers decide a custom record's class. V08 §3.5 step 5 (f): archetype
class → content group's or category's generic class → generic Other, at digest. V11 §3.13.1, BCR-V11-26 and J-VI.20: the
author's declaration, the archetype, the category, the tags, the definition fields, the keywords (whose `class` cell makes
a custom "lighthouse" a `lighthouse`), then `generic-other`. For a custom record with no archetype and a keyword or tag
signal the two differ. **Required change:** V08 §3.5 step 5 (f) reads: "a CUSTOM record's class and profile are not
decided at digest: the digest carries their inputs (`custom`, `tags`, `category`, the admitted `custom-def` fact, the
keyword keys) and item 104 (a)'s resolution with V11 §3.13.1's rungs decides both at fold (J-VI.20)"; the `custom_resolved`
note names the deciding rung from the fold's report.

**SS-13** · major · contradiction · **V11** — The dossier water record and the aqueduct chance. V08 §2.6b (1) (b) and
J-V8.67: the record "never scales a chance" (every SettlementForge city carries it at chance 1, so a factor would be one
constant). V11 §3.24.2's chance formula and §3.24.7 (3) (b) with J-V11.48: × `aqueduct.dossierFactor` 1.5 when the record
is present. Recommended resolution (vetoable): V08's — on dossier maps the factor applies to every city and marks only the
host, not the town. **Required change:** V11 removes `aqueduct.dossierFactor` from `RaisedWaySettings`, the chance
formula and §3.24.7 (3) (b); J-V11.48 is revised to cite J-V8.67 (the met need stays). The alternative, if the owner
prefers the factor, is that V08 revises J-V8.67 and T-V8-36 instead.

**SS-14** · major · wrong reference · **V07** — V07 §3.11 DR2 ("a threat that comes by sea (V08's `threat` row) raises the
`watchtower` row's chance to 1") and the §1b dossier trace ("the defence profile's threats → V08's `threat` row → the
`watchtower` row") cite V08's `threat` row, which maps `monsterThreat` to `Intent.defence`; the sea keys are V08's
`threats` row in `PortValues.threats`, which V08 §1b feeds to "V07's watchtower row". **Required change:** V07 §3.11 DR2
reads "a sea threat — any key of `PortValues.threats` (V08's `threats` row: `naval`, `hostileSeaPartner`, `seaMonster`;
`exposedPort` never fires below 20 000 people) — raises …"; the §1b trace gains the row "the sea threats → V08's `threats`
row → the watchtower at the wharf", keeping the `threat` row (Intent.defence ≥ 0.6) for the watchtower's presence;
T-V7-13 gains a coastal-with-`naval` clause.

**SS-15** · major · contradiction · **V11** — The barrier rows the palisade reads. IN-V11-6 says `walls.barriers` "rows are
keyed by the six closure-arc kinds (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`)", but V11 §2.7 and §3.16.1
still key eight defensibility classes (`sheerCliff`, `deepWater`, `gorge`, `cliff`, `steepSlope`, `marsh`, `shallowWater`,
`open`) and state no mapping; `deepWater` and `shallowWater` are both a `shore` with opposite outcomes. And the
`shallowWater` row walls a fordable river arc full (with water gates), while V07 §3.4 step 5 (J-V7.26) closes every water
arc of a village, a brook included. **Required change:** V11 §2.7's `WallBarrierRow` keeps `barrier` (the defensibility
class, the key) and gains `arcKind: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|null` (the closure-arc kind reported, J-VI.3):
`sheerCliff` → `cliff` (`islandRim` → `sheer`), `deepWater` and `shallowWater` → `shore`, `gorge` → `gorge`, `cliff` →
`cliff`, `marsh` → `marsh`, `steepSlope` and `open` → null (walled, no closure arc); `enceinte` is reported by the later-ring
rule, not a row; §3.16.1 adds "at village kinds every water arc closes (V07 §3.4 step 5 (a)): the `shallowWater` row reads
`closes: yes`, `wall: none` there"; IN-V11-6's sentence is replaced by this.

**SS-16** · major · wrong ids · **V07** — V07 §2.4's supply table names goods that are not V11 §3.7.1's ids — `ale`,
`hay`, `pots`, `wood`, `goods` — and two services as goods, `lodging` and `shoeing`, while stating that "the good's `bulk`,
`perishable`, `value` and `comfortM` are V11's goods table"; the compile's reference and totality checks (T-V11-3,
T-V11-28) fail on them. **Required change:** V07's rows read `beer` for ale, `fodder` for hay, `pottery` for pots, `import`
for the entry store's goods; the charcoal pit consumes `firewood` (coppice), the wood yard consumes `logs` and produces
`timber` and `firewood`; `lodging` and `shoeing` leave the goods columns and stay in the "village reading" column as
services.

**SS-17** · major · missing village reading · **V11** — V11 §3.13.4's `endpointStore` puts a chain's imports and exports
through "the nearest existing warehouse within 300 m of the gate or quay … else a new `warehouse` use placed there
(`nearGate` or `nearHarbour` 300 hard)"; V07 §3.11 (J-V7.29) uses an entry store — a `store` use on an existing plot (the
inn at the partner's entry, else the landing, else the nearest farmstead's barn), never a new building. **Required
change:** V11 §3.13.4's `endpointStore` cell adds "at village rungs, V07 §3.11's entry store (J-V7.29): no new warehouse
use".

**SS-18** · major · unwired · **V11** — Village names have no grammar slice. V07 §3.10 and §5.3 name the village from
descriptive tags (water type, form, relief, rung, palisade, a part-0 crossing, a wood), each end by its kind's pattern (a
church end, a mill end, the town's end, a green side, a wick), lanes from their anchors and each great field by its
bearing; V11 §3.20.1's slices (the catalogue is closed, T-V11-1) give `naming.settlement` only terrain, size rung and
culture, and no slice for village ends or fields. **Required change:** V11 §3.20.1 adds `naming.villageEnd` (features: the
end's kind, its anchor's name, its bearing from the heart) and `naming.field` (field kind, bearing, use), extends
`naming.settlement`'s features with V07's form, water type, palisade and crossing kind and `naming.way`'s with the anchor
lane forms; registry row 68 and §3.20.5's corpora rows follow.

**SS-19** · major · unmerged requests · **BASE-F** — Two registrations of the village product reach the base unmerged:
item 326 (BCR-V7-11: `StrategyRegistry.products: Map<'base'|'village', ProductDecl>`; `LadderRouter.route` returns a
registered product's rung) and item 202 (BCR-V8-9: `PortRungPath` and `registerRungPath` in `@plat/port`; `LadderRouter`
routes a population to a registered product's range), with item 528 (BCR-V7-17) "applied after" item 202 and item 322
(BCR-V7-26, the band) in another section. **Required change:** file f consolidates items 202, 326 and 528 into one item:
the one registration is `ProductDecl` in `StrategyRegistry.products` (V07 §2.1); `LadderRouter` reads it; the port asks
`LadderRouter` whether a population lies in a registered range (creation and absorb) and never registers anything itself
— `PortRungPath` and `registerRungPath` are dropped; §1.1's *Requests at the ends of the ladder* cites item 322's fold for
the product at an epoch.

**SS-20** · major · contradiction · **V08** — V08 §3.10: "a crossing at an epoch — a town shrinking below 1 500, a village
growing past it — is §4.11's rung change: the epoch reads the new rung's row"; T-V8-19 tests a crossing at 1 500. V07 §2.1
and BCR-V7-26: the product at an epoch is a fold with `handoff.band` (5 %) — up at 1 575, down below 1 425, and inside the
band the previous product runs on its own rung row at its range's edge (a 1 440-person town on the TOWN row).
**Required change:** V08 §3.10's paragraph reads "a crossing is §4.11's rung change as BCR-V7-26 states it: the product
at an epoch is V07 §2.1's fold (`handoff.band`); `LadderRouter` decides the product at creation, and at an absorb only
whether the population lies in a registered range"; T-V8-19 gains "a target alternating 1 480 / 1 520 changes the product
0 times, 1 400 / 1 600 at every epoch"; J-V8.12 cites the band.

**SS-21** · major · contradiction · **V08** — A deserted settlement. V07 §2.1 ("at an epoch, a target below 1 keeps the
THORP row and runs §3.12's desertion") and BCR-V7-17 ("at an absorb a population of 0 routes to THORP"); V08 §3.5 step 3
refuses any `population` outside [1, 10⁷] as `E_UNKNOWN_SHAPE` and holds the map, so SettlementForge's end of a settlement
(§7.7 row F20) never reaches V07's desertion. **Required change:** V08 §3.5 step 3's range reads [0, 10⁷]; §3.6 (7) and
§3.9 row B7 add: "a population of 0 at an ABSORB of a document whose product is the village routes to THORP and V07's
desertion; at a CREATION 0 is refused `E_RUNG_UNAVAILABLE` naming the floor (V07 §2.1)"; T-V8-15 gains the absorb clause.

**SS-22** · major · test gap · **V07** — T-V7-42 checks "every catalogue kind of tiers T, H and V (111 kinds, V11's rows)"
at the three village rungs; V11 §3.11 holds 97 kinds carrying T, H or V (script count), and the 85 kinds carrying W reach
the VILLAGE rung through SettlementForge towns of 901–1 499 people (V07 §3.11) — the bar leaves the census §1 conflicts
untested for them. **Required change:** T-V7-42 reads "every catalogue kind of tiers T, H, V and W — the count read from
`dossier.catalogue`'s manifest, never written into the bar (182 at the pinned line) — resolves at the three village rungs
to exactly one of pseudo-reader, village class, own class or fallback; the fallback only through `unmapped_kind`".

**SS-23** · major · unwired · **V08** — V11 §3.12: "where the settlement also holds a craft- or merchant-guild COUNT
record (`craft_guilds_*`, `merchant_guilds_*`), the GUILD record's hall IS one member of that COUNT record, never a
further hall". V08's no-double-counting (§3.5.1 (c)) merges only a greater and a lesser of ONE ladder row, and the
`distribution` row gives GUILD "a building (the hall) plus a dispersed collective"; the DR9 builder counts the guild's
hall twice. **Required change:** V08 §3.5.1 (c) adds: "and, by V11 §3.12, a GUILD record's hall binds as one member `#k` of
a `craft_guilds_*` (a craft family's guild) or `merchant_guilds_*` (a trade family's) COUNT record in the same dossier,
noted `ladder_merged`"; T-V8-44 gains the clause.

**SS-24** · major · unwired · **V11** — V11 §3.1 registry row 63 lists V08's row sets (tiers … tags) but omits twelve V08
§2.6 adds — `relations`, `historyScars`, `magic`, `era`, `materials`, `isolation`, `chainStatus`, `dependencySeverity`,
`calamitySeverity`, `qualifiers`, `threats`, `ruinEvidence` — while "the catalogue is closed" and T-V11-1 refuses a table a
document names and the registry lacks. **Required change:** row 63's list gains the twelve (rows home V08 §2.6 and §2.6a,
readers `port.digest`).

**SS-25** · major · unowned shape · **V11** — `dossier.goodWords`: V11 §3.1 row 65 says its shape is "V08's shapes", V08
§2.6 declares none and V08 §3.5 step 6 calls it "V11's `goodWords`"; BCR-V11-4 homes its rows in V11, BCR-V8-10 omits the
table. **Required change:** V11 §2.8 declares `GoodWordRow { words: string[]; good: string /* a roster.resources id */ }`
as V11's own shape (as `LadderStepRow` is), row 65 says so, and §3.13.5's matching rule is that shape's reader; V08 §3.5
step 6 already cites it.

**SS-26** · major · missing rows · **V11** — The burial records across 1 500. V11 §3.12 has no pair joining the village
burial records to the town's: `graveyard` (V) and `burial_ground` (T, H) are lessers only of the CITY
`burial_grounds_and_charnel_house`; nothing makes `parish_burial_grounds` (W) the greater of `graveyard`. V08 §2.6a (4)
("a tier change is not a closure … the port re-binds the lesser's faces to the greater's key" when "a pair in V11's
`dossier.ladders`" exists) and V07 §3.12 step 6 (the churchyard's opening year carried across the crossing) both need
that pair; without it a village-to-town promotion either closes the village's burial face (the lesser leaving) or binds
one churchyard to two records. **Required change:** V11 §3.12 gains `parish_burial_grounds` | COUNT | `graveyard`,
`burial_ground` | members the burial faces (one per church plot's churchyard, V08 §2.6a (3)) | inferred, and `graveyard` |
REPLACEMENT | `burial_ground` | the burial ground's face re-bound as the graveyard's | inferred. Companion: SS-45 (V08).

**SS-27** · major · unwired · **V07** — A toll bridge on a dry village site. V08 BCR-V8-32 / §2.6b (3) add a brook across
the longest approach at creation when terrain, access and realm cell give no water; IN-V07-3 says only that "the
settlement's through route crosses its water by a bridge", and V07's S0 water draw (§3.1 (1); DR1 `plains` keeps `none` at
0.33) is not told to force one. The village births V08 X7 names (`culture-norse`, `sample-cnocby`, `village-1`) can draw no
water and silently put the toll house at an entry. **Required change:** V07 §3.1 (1) and §3.11 DR1 add: "a dossier record
whose `kinds` row implies a bridge forces `water: brook` when terrain, access and the realm cell give no watercourse, its
course crossing the through road (BCR-V8-32 at village rungs); on `desert` without `oasis_water` no brook, the toll house
at an entry and `toll_bridge_dry` reported"; T-V7-13 gains the clause.

**SS-28** · major · restated contract · **V08** — V08 §3.10's `PortRungPath` restates the village range and lists the
strategies as "density StageDecl, palisade EnceinteStrategy, tracker NetworkStrategy, houses-along-ways FabricStrategy",
while V07 registers `tracker`, `palisade`, `village-ways` (not "houses-along-ways"), `course-first` and `toft` in its
`ProductDecl` (V07 §2.1, BCR-V7-10). **Required change:** with SS-19, V08 §3.10 drops `PortRungPath` and
`registerRungPath` and reads "the village product registers its `ProductDecl` (V07 §2.1; BCR-V7-11); the port consults
`LadderRouter`"; BCR-V8-9 is withdrawn in favour of file f's consolidated item; T-V8-19 registers a test `ProductDecl`.

### Minors

**SS-29** · minor · unmerged requests · **BASE-F** — File f items 510 (BCR-V8-10) and 520 (BCR-V11-4) edit the same §14
item-7 list: both add `archetypes`, `categorySynonyms` and `keywords` (a double add if applied literally), only BCR-V11-4
adds `ladders` and `goodWords`, and each states its own shape-and-row split. **Required change:** one consolidated item: the
list once (V08 §2.6's sets plus `ladders` and `goodWords`) with "the shapes of `kinds`, `archetypes`, `categorySynonyms`
and `keywords` are volume V08's; the shapes of `ladders` and `goodWords`, and the rows of all six, volume V11's".

**SS-30** · minor · unmerged requests · **BASE-F** — Items 430 (BCR-V7-21) and 432 (BCR-V11-1) both add
`villageForm?: string` to `BuildingClassRow`. **Required change:** item 430 gains the note "carried by item 432's field
list; applied once", with SS-01's `v.` rule in its comment.

**SS-31** · minor · reading gap · **V11** — V11 §3.24.3's specialisation rows key town classes (`church`, `palace`,
`tower_house`, `mage_tower`, `watchtower`); V07 §2.4 names the eligible village classes (`parish_church`, `chapel`,
`manor_house`, `reeve_house`, `watchtower`) without a rule that a row keyed `church` applies to the parish church that
plays it, and no row names `chapel` or `reeve_house`; the cap is stated twice with two meanings (V07
`rules.tiers.capPerSettlement` per settlement, V11 `villageCap` per row). **Required change:** V11 §3.24.3 adds "at a
village rung a row applies to the village class that plays its `cls` (§3.22); the village cap is V07's
`rules.tiers.capPerSettlement`, per settlement" and drops the `villageCap` column; V07 §2.4's eligible list is then the
classes the rows reach (`v.parish_church`, `v.manor_house`, `v.watchtower`).

**SS-32** · minor · wrong reference · **V07** — V07 §3.11 DR5's east phrase cites "V08's soft east row at V08's weight
(V08 §2.6's T6/T7 row)"; V08 §2.6 has no such row — it is the base's §7.7 item 16 quarter row (`tables/dossier/quarters`),
"a placeholder dropped on the owner's word (J80 Q5)". **Required change:** cite §7.7 item 16's quarter row, and note that
T-V7-13's east clause lapses if the owner drops the placeholder.

**SS-33** · minor · wrong reference · **V07** — V07 §3.11's supply-chain bullet: "an `impaired` or `vulnerable` chain's
links weaken by V08's status table"; the weights are V11's `siting.web.chainStatus` (J-V8.49: the port carries only the
neutral key). **Required change:** "by V11 §3.7.4's `chainStatus` weights, keyed by V08's neutral status".

**SS-34** · minor · pointer · **V11** — §1b W11 and §3.16.1 cite "V07's palisade barrier arcs (V07 §3.12 …)"; the palisade
is V07 §3.4 (step 5). **Required change:** read "V07 §3.4 step 5".

**SS-35** · minor · count · **V08** — V08 §2.6 (`kinds`) and J-V8.18 say "≈ 270" catalogue kinds; V11 maps 280 (T-V11-2).
**Required change:** "280 at the pinned line (read from `dossier.catalogue`)".

**SS-36** · minor · list · **V11** — BCR-V11-9's pseudo-class list for V08's `kinds` comment omits `@absent:<class>`, which
V11 §3.11 and W35 use. **Required change:** the list gains `'@absent:<class>[+<class>]'` (SS-10's spelling), and §3.11's
`access_to_external_mill` cell reads `@absent:watermill+windmill`.

**SS-37** · minor · superseded text · **V08** — V08 §3.11's custom-kinds bullet still writes "`fallbackClass` by V08 §3.5
(5) (f)" (IN-V08-4 supersedes it; the sentence stands), and BCR-V8-13 and §5.2's building row cite "V08 §3.5 (5) (e)" for
a custom record whose step is (f). **Required change:** delete the `fallbackClass` clause in place; the two pointers read
"(f)" (or SS-12's fold wording).

**SS-38** · minor · superseded text · **V08** — V08 §2.6b (1) (c) and §13 X5 still state that V11's `conduit_house` row
gains a hard `near` terminal row; V11 §3.24.7 (1) superseded X5 with the generator's `PlacementCriteria` row
`pc/aqueduct/<way lineage>` (and J-VI.9). **Required change:** (c) reads "the aqueduct's generator binds the conduit house
to the terminal by V11 §3.24.7 (1)'s criteria row"; X5 is marked superseded.

**SS-39** · minor · restated values · **V07** — V07 restates V11's cells: §2.2a's `terrace` defaults (0.15, 60 cm, 400 cm,
6 m), §3.10a (2)'s `deck.minDepthM` 4 m "V11's `deck` row when it lands" (it has landed: pier 2.5 m, bridge 3 m, mole 3 m,
quay 4 m), and §3.12 step 6's catacomb chances (0.25, 0.3, `cryptJoin` 0.7). **Required change:** each cites the V11 cell
and drops the number (the `terrace` `PLaw`s read V11's TOWN row by reference; `deck.minDepthM` is removed in favour of
V11's `minPlotDepthM` by deck kind).

**SS-40** · minor · incomplete table · **V07** — V07 §2.4's village ladder table ("the pairs … whose lesser is a village
class and whose greater can arrive in a dossier below 1 500") lacks rows V11 §3.12 now holds: `wayside_shrine` →
`parish_church` (REPLACEMENT, the shrine's pin kept as the churchyard cross), `water_source` → `multiple_water_sources`
(COUNT of wells, SS-07), `mill` → `mills_2_5`, `ale_house`/`alehouse` → `taverns_5_20`, `travelers_inn`/`wayside_inn` →
`inn_multiple` (COUNT). **Required change:** the table states that it lists only the readings that differ at village rungs
and cites V11 §3.12 for the rest, and adds the shrine and wells rows (their village readings).

**SS-41** · minor · undeclared kinds · **V07** — V07 §3.11's landmark readings (V08's `landmarks` row, "village-product
rows") land on yard-part kinds `net_rack`, `drying_rack`, `timber_stack` and a named `beach` bank stretch that §2.3's
added data rows (`croft`, `paddock`, `drive`, `stair`, `ramp`) do not declare. **Required change:** §2.3's data-row list
gains the three yard-part kinds (and the named beach as §4.2 S1 (7)'s `beach` bank with a name), each with its §5.1 role and
§5.4 export mapping.

**SS-42** · minor · missing reading · **V08** — V08 §2.6's `distribution` row sends step QUARTER to "`neighbourhood`,
owning the trade's members (V01)"; at a village rung a QUARTER record claims an end (V07 §3.10, §2.4). **Required change:**
add "(at a village rung, V07 §3.10's end claim)".

**SS-43** · minor · companion · **V07** — V07 §3.11 and W35/W56 read `access_to_external_mill` as "V11 → `@none`".
**Required change:** read "`@absent:watermill+windmill` (V11 §3.11; SS-10)", keeping V07's reported milling import
(J-V7.58).

**SS-44** · minor · row semantics · **V11** — V11 §3.11 maps `gates_if_walled` (W) → `@wall`, so a dossier listing only
"Gates (if walled)" would raise walls through DR2 ("walls exactly when the dossier lists a wall institution"); V08's
qualifier row keeps "if walled" as a label word. **Required change:** `gates_if_walled` → `@none` (its gates follow a wall
record when one exists), with a J-V11 row; or, if the census shows it never occurs without a wall record, a note saying so.
(PLAUSIBLE: the co-occurrence was not counted in this lane.)

**SS-45** · minor · companion · **V08** — V08 §2.6a (3)'s burial trace gives `Burial ground` and `Graveyard` the step
"—". **Required change:** after SS-26, their step cells read "REPLACEMENT (`graveyard` over `burial_ground`); both lessers
of `parish_burial_grounds` (COUNT)", and (4)'s promotion sentence cites the new pairs.

**SS-46** · minor · unnamed cell · **V07** — V07 §3.11 seats a `graveyard` or `burial_ground` record as the churchyard
"enlarged to the record's size row" — no row is named. **Required change:** name it: V11 §3.6.1's `burial-ground` template
family's plot area at the band, or a new `village.json` cell `rules.burial.churchyardHa` with its value and provenance.

## 6 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V11 | 1 (SS-01) | 13 (SS-02, 03, 05, 06, 07, 09, 13, 15, 17, 18, 24, 25, 26) | 4 (SS-31, 34, 36, 44) | 18 |
| V08 | 0 | 8 (SS-08, 10, 11, 12, 20, 21, 23, 28) | 5 (SS-35, 37, 38, 42, 45) | 13 |
| V07 | 1 (SS-47) | 5 (SS-04, 14, 16, 22, 27) | 7 (SS-32, 33, 39, 40, 41, 43, 46) | 13 |
| BASE-F | 0 | 1 (SS-19) | 2 (SS-29, 30) | 3 |
| **total** | **2** | **27** | **18** | **47** (SS-01 – SS-47) |

**Order of work.** SS-01 / SS-47 first (the namespace every other village row uses), then SS-02, SS-03, SS-05, SS-06,
SS-09 (V11's routing), SS-19 / SS-28 / SS-20 / SS-21 (the hand-off), then the rest; each companion lands with its pair.

**J-SS rows (this lane's own calls, vetoable).** J-SS.1: finished in one pass past the ~300 k checkpoint rather than
checkpointing before writing, because a continuation would have had to re-read the three volumes whole to judge a seam;
the base was read at the shared passages (§0). J-SS.2: SS-01's remedy is a `v.` namespace, not a per-rung overlay on one
row, because the village and town rows share no profile, template or presence law. J-SS.3: SS-13 recommends V08's
reading (no dossier factor), SS-05 V07's (a militia has no building), SS-15 V07's (a village never walls its water) —
each the more historically faithful and the one whose alternative adds a host artefact or a rule exception.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed in this lane):** every quotation above was read at its line in the named file (md5s of §0,
unchanged at writing); the 280-row kinds table and the 182-kind village-rung census were counted by script
(`ss-census.out`: 33 pseudo, 39 with a village form of which 15 onto the same id, 110 with none; 97 kinds carry T, H or V,
85 carry W); the absence of `@absent`, `historyScars`, `dependencySeverity`, `calamitySeverity` in the respective
volumes was counted by grep; file f's items 202, 322, 326, 425, 430, 432, 510, 520 and 528 were read whole.
**PLAUSIBLE (reasoning):** that `gates_if_walled` occurs without a wall record in some dossiers (SS-44); that the village
births V08 X7 names can draw no water (SS-27 — the draw's weights make it possible, the births were not re-run here); the
recommended sides of SS-05, SS-13 and SS-15 (J-SS.3) are judgments, vetoable.
