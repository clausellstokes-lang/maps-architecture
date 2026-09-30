# Seam critique, reconciliation round 2: settlements (V07 village, V08 SettlementForge, V11 content)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-settlements-r2; covered by the whole-design retrovalidation (J84).

PROGRESS
- §1 Inputs and method | done
- §2 Round-1 re-check (SR1-01..31) | done
- §3 Sweep findings (SR2-nn) | done
- §4 Census: every dossier kind at every size lands in a class row | done
- §5 Summary table and CONFIRMED versus PLAUSIBLE | done

## 1 Inputs and method

**Inputs** (md5 at the lane's start, re-checked unchanged before this file was finished; the base unchanged since round 0):

| file | md5 | lines | state |
|---|---|---|---|
| `docs/volumes/V07-village.md` | 3a6cc3d2… | 3 559 | after reconcile-V07-r2 (LANDED 05:11) |
| `docs/volumes/V08-settlementforge.md` | d32c6a0e… | 3 012 | after reconcile-V08-r2 (05:12) |
| `docs/volumes/V11-content.md` | 4cf57d39… | 4 290 | after reconcile-V11-r2 (05:09) |
| `docs/volumes/_integrate.md` | a8c72fb4… | 367 | after reconcile-BASE-F-r2's halves (04:55) |
| `docs/AMENDMENTS-2026-09-28f.md` | a85996a2… | 1 167 | after reconcile-BASE-F-r2 (04:55) |
| `docs/ARCHITECTURE.md` | 01fea21f… | — | unchanged |
| `docs/volumes/critique/seam-settlements-r1.md` | — | 489 | round 1, re-checked issue by issue (§2) |

**How the three volumes were read.** Round 1 read V07, V08, V11, `_integrate.md` and file f whole at the md5s its §0
lists. This round diffed each of the five against the round-1 snapshots the reconcile lanes kept (`rcV7r2/V07-pre-r2.md`
4b7155ac…, `rcV8r2/V08-pre-r2.md` f6549c4a…, `rcV11r2/V11-pre-reconcile-r2.md` 6968447a…, `rcBFr2/integrate-pre-r2.md`
1487de32…, `rcBFr2/f-pre-r2.md` 40e2f8d6… — each md5 equal to round 1's input) and read every diff whole (scratch
`scratchpad/volumes/ssr2/d07.diff`, `d08.diff`, `d11.diff`, `dint.diff`; `df.diff` by grep for the seam's items), then
re-read whole the seam's core sections in the live text: V07 §2.4 (the typed class rows, the presence column, the archetype,
supply and ladder tables), §3.0, §3.6, §3.8, §3.9, §3.10, §3.11, §3.13, §10's BCR-V7-36 and BCR-V7-37, §13 and the
integration notes; V08 §2.6a, §3.5.1; V11 §2.3, §3.3.3, §3.5.1, §3.5.2, §3.5.10, §3.6.1, §3.12's head and table, §3.13.2,
§3.13.5's rule, §3.21.1, §3.22, §3.24.4's `deckOk` paragraph. Consumers outside the three were read at the lines a finding
cites: V02 §3.2's resolution chain and §3.10.5, J-V2.56, J-V2.96, X13; V03 l. 806–811; V04 l. 478, 1493, T-V4-50, l. 3247;
the base's `ContextVector.dist` (l. 1038), `BuildingClassRow` and `RelationRule` (l. 11480–11500), §4.11's dossier-content
rule (l. 6459–6470), PART III's *Placement and designation* (l. 16233).

**Scripts** (scratch `scratchpad/volumes/ssr2/`): `census.py` → `census.out` (md5 00d6640f…) — V11 §3.11's 280 kind rows
and §3.22's `villageForm` entries parsed, every kind of tiers T, H, V or W routed at a village rung; `census3.py` — every
class a kind plays itself at a village rung, with its hard rows; a scan of every `v.` id in V07, V08 and V11 against V07's
25 rows; the BCR ids of V07, V08 and V11 against file f; greps for `site.latitude`, "qualifier and member class",
`villageCap` and the old ids.

**Severity** as rounds 0 and 1: blocker (the subject cannot be built as written), major (a contradiction or an unwired
piece a builder would hit), minor (wording, a pointer, a restated value, a stale record). Each finding names ONE owning
volume (V01…V12, or BASE-F for file f and the integration notes the BASE-F lane keeps) and an exact required change; a
companion is its own finding. Ids are **SR2-nn**.

## 2 Round-1 re-check — every issue, now

Round 1 raised 31 issues (1 blocker, 5 majors, 25 minors). The owning lanes report all of them FIXED (reconcile-V07-r2:
17 of its issues including SR1-01, -02, -04, -09 – -18, -31; reconcile-V11-r2: SR1-03, -07, -08, -19 – -23, -25;
reconcile-V08-r2: SR1-26 – -28; reconcile-V02-r2: SR1-05; reconcile-V03-r2: SR1-06; reconcile-V04-r2: SR1-24;
reconcile-BASE-F-r2: SR1-29, -30). Each was re-checked against the live text. **Result: 31 of 31 FIXED at the places
round 1 named.** Six fixes left a residue elsewhere — a companion sentence another volume did not follow, or a new
request not carried — raised in §3 as new findings (the residue column); none reopens a round-1 issue.

| id | owner | status | evidence (live text) | residue |
|---|---|---|---|---|
| SR1-01 | V07 | FIXED | V07 §2.4 restated as two typed tables (class columns l. 760–786; profile deltas and authored rows l. 788–826), the presence column and `PresenceWhen` conditions (l. 828–847), forced seats (l. 849), the supply cells compiled to `SupplyEdge`s (l. 910–937); BCR-V7-36 (a) `presence`/`PLaw`/`PresenceWhen`, (b) `dist.centre` and `dist.gate` at territory rungs (l. 3300–3325); T-V7-56; J-V7.101, J-V7.102, J-V7.108. Every family is a V11 §3.4 key, every template family a V11 §3.6.1 row (`pen` is the `farm` family's yard part), every need a V11 `Need`, every clientele and balance in V11 §2.3's enums, every `V` cell in V11 §3.5.2's form, every `to` in V11 §3.3.3's vocabulary or a base `RelationRule` kind, `deckOk` `v.chapel` `[bridge]` and `v.landing` `[pier, quay]`; V11 carries the column (§2.3 l. 377–380) | BCR-V7-36 not in file f (SR2-01); V11 §3.5.1's coverage option not told of the village exception (SR2-05) |
| SR1-02 | V07 | FIXED | V07 §3.11 step 1 (l. 2030–2035): `@absent:church` zeroes `v.parish_church`, `v.parsonage`, `v.tithe_barn`; the chapel of ease stands; W56, the §1b trace, T-V7-13, T-V7-42, J-V7.103. Companions: V11 §3.11 (l. 1844) and W35 (SR1-07); V08 §2.6's `kinds` comment (l. 815) and §2.6a (3)'s row (l. 942); T-V8-46's VH clauses (SR1-27) | — |
| SR1-03 | V11 | FIXED | V11 §3.6.1: `church` "churchyard 0.3", `cathedral` "churchyard 0.15", `cloister` and `burial-ground` keep `burial`, heading sentence (l. 1450–1465); §2.8 `TemplateFamilyRow.yard` (l. 514); W28 (l. 219); §3.12's `parish_burial_grounds` cell (l. 2201) | — |
| SR1-04 | V07 | FIXED | V07 §3.0's VS1 row (l. 1154), §3.2 (4) (l. 1257), W42 (l. 343): the latitude by V08 §2.5's rule as a recorded input; `site.latitude` named nowhere now but J-V7.110 and the round note (grep) | — |
| SR1-05 | V02 | FIXED | V02 §3.10.5 keyed by the 25 `v.` keys, `scope` withdrawn (`ClassFamilyRow` l. 605); the chain's step 3 reads `composition.classFamily[<v. key>]` before step 4's `templateFamily` (l. 867–871); J-V2.96 | X13 and J-V2.56 still say volume 7 declined the column (SR2-10) |
| SR1-06 | V03 | FIXED | V03's village rows keyed `v.longhouse`, `v.parish_church`, … (l. 806–811), with the `composition.classFamily` fallback | — |
| SR1-07 | V11 | FIXED | V11 §3.11's pseudo-class paragraph (l. 1844–1845) and W35 (l. 226) give the village reading | — |
| SR1-08 | V11 | FIXED | V11 §2.3 names V07's `presence?` (l. 377–380); §3.2.1 step 6 (l. 807–809), §3.5.14 (l. 1383) and T-V11-0 (l. 3600) run T-V11-3, -4, -5, -7, -25 over the `v.` rows | — |
| SR1-09 | V07 | FIXED | W1 (l. 302), W30 (l. 331), V-M2 (l. 2866) read "the port's consultation of `LadderRouter` (V08 §3.10; file f item 202)"; BCR-V7-17's title | — |
| SR1-10 | V07 | FIXED | V07 §2.4's stepped-massing paragraph (l. 865–867), §1's dependency (7) (l. 268–272), J-V7.94 | — |
| SR1-11 | V07 | FIXED | IN-V07-2's `villageCap` clause marked superseded (l. 3473–3474) | `_integrate.md` J-VI.16's same clause, left to "the integration lane's next round", unamended (SR2-09) |
| SR1-12 | V07 | FIXED | §1's hook paragraph cites V11 §3.24.1's TOWN row without numbers (l. 230–231); §3.16 (1), (3), (4) cite V11 §3.23.1, §3.23.2, §3.23.7 (l. 2384–2426); T-V7-44 covers §1 | — |
| SR1-13 | V07 | FIXED | T-V7-42: "176 at the pinned line: 97 … 85 … six in both" (l. 2830); this round's script agrees (§4) | — |
| SR1-14 | V07 | FIXED | V07 §2.4's forced seats paragraph, DR11 (l. 2065–2068), J-V7.104; the seat kinds match V11 §3.21.1 (`seigneurial`, `crown` → `v.manor_house`; `chartered_commune`, `merchant_oligarchy` → `v.reeve_house`; `ecclesiastical` → `v.parsonage`) | — |
| SR1-15 | V07 | FIXED | V07 §3.11's burial paragraph (l. 2055–2058), T-V7-45, J-V7.107 | — |
| SR1-16 | V07 | FIXED | `rules.ladders.ranges` keyed by `step` with the qualifier as label (l. 614–615); §2.4's range prose and table (l. 955–958, 975–981); J-V7.105. V08's companion applied (V08 §3.5.1 (b), l. 1496–1497) | V11 §3.12's range sentence still reads "for its qualifier and member class" (SR2-06) |
| SR1-17 | V07 | FIXED | §2.4's namespace sentence (l. 736–738) | — |
| SR1-18 | V07 | FIXED | §3.11 step 4 keys on V11 §3.13.2's keyword families (l. 2042–2049); every key it reads exists (`mill` in `food`, `kiln` in `industry`, the `port`, `timber-yard`, `food-works` and `lodging` rows); J-V7.106 | the drink test takes the whole `food-works` family, which holds `butcher` (SR2-12) |
| SR1-19 | V11 | FIXED | `exotic-tower`'s and `industrial-workshop`'s `village` cells in the notation (l. 2332, 2334) | V07 §2.4's archetype paragraph still restates the cells in words, now differing (SR2-11) |
| SR1-20 | V11 | FIXED | V11 §3.12 cites V08 §3.5.1 (c)'s family rule, J-V8.83 (l. 2264–2266) | V07 states the looser rule in two places (SR2-08) |
| SR1-21 | V11 | FIXED | "Four readings come before this column" (l. 3042–3046) | — |
| SR1-22 | V11 | FIXED | `toll_bridge` → `toll_house`; `implies: 'bridge'` (l. 2030) | — |
| SR1-23 | V11 | FIXED | registry row 77 (l. 761), §3.11's routing paragraph (l. 1853), W46, X-V11-1 (l. 4018) cite V08 §2.4's manifest shape | — |
| SR1-24 | V04 | FIXED | V04's church count reads `v.parish_church` (l. 478, 1493, T-V4-50, l. 3247) | — |
| SR1-25 | V11 | FIXED | F-V11-4 closed (l. 4176); §12's clause removed | — |
| SR1-26 | V08 | FIXED | V08 §3.5 step 6 cites V11 §3.13.5's rule (l. 1408–1409); V11 §3.13.5 holds the `import` fallback and the `unmapped_good` report | — |
| SR1-27 | V08 | FIXED | T-V8-46's SF3 part is a base-rung mutation of `town-1`, the hamlet clauses at VH; §8.2's VH exit lists them | — |
| SR1-28 | V08 | FIXED | V08 §12 CONFIRMS the companions; X14 CLOSED | — |
| SR1-29 | BASE-F | FIXED | file f item 202 amends §1.1's rung sentence and PART III's last paragraph (l. 53) | — |
| SR1-30 | BASE-F | FIXED | file f item 510: "(the `archetypes` row's optional `village` cell typed by volume V11 §2.8)" (l. 852) | — |
| SR1-31 | V07 | FIXED | BCR-V7-37 on PART III's *Placement and designation (items 16–19)*; its quote found once (line-broken at l. 16234–16235; V07's receipt `rcV7r2/quotes.out`) | not carried in file f (SR2-01) |

## 3 Sweep findings

Each: **id** · severity · kind · **owner** — the claim with its evidence, then the exact required change. Majors first.

### Majors

**SR2-01** · major · base change not carried · **BASE-F** — V07's round 2 added two base change requests that file f
does not carry. V07 §10 holds **BCR-V7-36** ((a) `presence?`, `PLaw` and `PresenceWhen` on §10.2's `BuildingClassRow`;
(b) `ContextVector.dist.centre` and `dist.gate` at the rungs whose `frameLaw` is `territory`; V07 l. 3300–3325) and
**BCR-V7-37** (PART III's *Placement and designation* sentence; l. 3327–3331). File f names BCR-V7-1 … BCR-V7-35 and no
other (script over both files); its round-2 lane closed at 04:55 with "census 0 uncarried BCRs", before V07's round landed
(05:11). V11 §2.3 (l. 377–380) already compiles the `presence?` column "as V07 types it", and every V08 and V11 BCR id is
carried (script), so these two are the only uncarried requests on the seam. A coherence pass working from file f would
ship a `BuildingClassRow` with no presence field — SR1-01's blocker again, one step later. **Required change:** file f
gains **item 576** — BCR-V7-36 (V07 §10): (a) on `### 10.2 Roster`'s `BuildingClassRow`, applied after item 432
(BCR-V11-1), which extends the same interface; (b) on `### 2.5`'s `ContextVector.dist`, in the text SR2-02 widens it to;
*Needed by:* V07, V11 (the compiler carries the column); **STAGED (the
village product, V-M0 to V-M4)** — and **item 577** — BCR-V7-37 (V07 §10), applied with item 202's PART III lines;
*Needed by:* V07; **STAGED (with item 202)**. When V07 applies SR2-15, item 310 (BCR-V7-24) carries the reduced request.
The lane re-runs its census (0 uncarried) after the three.

**SR2-02** · major · unwired reads · **V07** — The village's context vector has no market and no harbour for the classes
that play themselves at a village rung. BCR-V7-36 (b) redefines only `dist.centre` and `dist.gate` at territory rungs; the
base's `ContextVector.dist` has `market: M` ("the nearest market of either rank") and `harbour?: M` (base l. 1038), and S3
— which makes both — is not in the village set (V07 §3.0). V07 gives the open space the market rank only "with a market in
S2's manifest (a dossier market record, or the market law `rules.market`, (900, 0) → (1 300, 0.2))" (§3.6 (4)), never
defining "a dossier market record", and says "a village has no harbour basin" (l. 1989). The readers: `market_hall`
(`fish_market`, tier V) `nearMarket` 60 **hard**; `harbour_master` (`docks_port_facilities`, W) `nearHarbour` 60 **hard**;
`customs_house` (W) and `warehouse` (`merchant_warehouses`, W) "at a port" forms; `ropewalk` (W) `N+ harbour`; `granary`
(`town_granary`, W) `nearMarket` soft (V11 §3.5.4 – §3.5.9); and V11 §3.13.4's `stepInward` and `finalSeller`,
which read `dist.market` for every custom chain at every rung, while V07 §3.11 describes the village chain's steps in its
own words ("a step further in", "its final seller on the green or the through road"). `annual_fair` (W) plays
`fair_ground`, "a `market` reservation, secondary, extramural" — a rank V07 never builds. So a 400-person village whose
dossier lists a fish market has no market, and its hall's hard row finds no `dist.market`; a 1 300-person port town routed
to the VILLAGE rung with Docks and port facilities has a wharf but no `dist.harbour`; each falls to the base's closest
option (§4.11, J-A20.71) at an arbitrary plot. **Required change:** BCR-V7-36 (b) adds, at territory rungs: `dist.market`
measured to the open space that carries the market rank (§3.6 (4)), else to the first nucleus's open space, else to
`VillagePlan.heart` — so V11's `stepInward` and `finalSeller` read the village's own centre of trade and §3.11's chain
sentence becomes a citation of V11 §3.13.4; `dist.harbour` measured to the wharf's `quay` way (§3.10) when one is laid,
else absent, and a class row's "at a port" reads "a wharf is laid" at a village rung. §3.6 (4)'s "a dossier market record"
reads "a record whose class is of V11's `market` profile family (`market`, `market_hall`, `fair_ground`, `slave_market`) or
a custom record of archetype `mercantile-market`"; a `fair_ground` record is an extramural `market` reservation of rank
secondary on the commons beside the through road's entry nearest the heart, its area a new `rules.market` cell (own,
calibratable). T-V7-13 gains a fish-market fixture (the market on the open space, the hall at its rim) and a port fixture
with Docks and port facilities (the harbour master within 60 m of the wharf); a J-V7 row records the readings.

**SR2-03** · major · unwired size · **V07** — A claim-sized class has no plot size at a village rung. Three kinds reach a
village rung on classes whose template family sizes the plot by "the claim's": `monastery_or_friary` (W) → `monastery`,
family `cloister` (footprint and plot "the claim's (§4.2 S3)"); `fish_market` (V) → `market_hall` and `slave_market` (W) →
`slave_market`, family `market-hall` (plot "the claim's"); all three families `underSize` `refuse` (V11 §3.6.1: "a claim
that cannot be joined is reported, never squeezed"). No claim exists at a village rung (S3 is not in the set, V07 §3.0);
the slot race joins slots "up to its template's plot area" and VS6's capacity check sums "their templates' `plotAreaM2`"
(V07 §3.8), both of which read no number. V07 fixed the same gap for `v.parish_church` alone ("the family's 'the claim's'
has no claim at a village rung", its plot area 1 500 – 4 000 m² by band; J-V7.101). No kind of tiers T, H, V or W plays a
`castle`, `cathedral`, `arena` or `fort` family class (census, §4), so these three are the whole set. **Required change:**
V07 §2.2a gains a `claimArea` cell set read at village rungs for a class that plays itself with a claim-sized template
family: `cloister` — plot area 3 000 / 4 500 / 6 000 / 8 000 m² by band (a friary or small priory, not an abbey's
precinct; own, calibratable), its footprint p50 the `church` family's, sited by S10b like any institution with the town
row's authored rows; `market-hall` — plot = its footprint p50 ÷ 0.8, cut at the rim of the open space carrying the market
(SR2-02), taking no toft slot. §3.8's join law and VS6's estimate read them; T-V7-42 gains "every class a kind of tiers T,
H, V or W plays itself at a village rung has a finite plot area at all three village rungs (a compile check)"; a J-V7 row.

**SR2-05** · major · contradiction · **V11** — The roster's coverage option at a village rung. V11 §3.5.1 applies it to
"a class with a coverage row", with no rung exception: "Without a dossier count, a class with a coverage row draws its
count at S2's Δ grid point as `round((1 − w) × perCapitaCount + w × coverageCount)`". V07 §2.4's presence paragraph (l. 828–
847) and BCR-V7-36 (a)'s comment say the opposite at village rungs: "The roster's coverage option (V11 §3.5.1) adds no
member at a village rung — a `V` cell is a siting pull there, since the option's rounded count would step inside a band"
(J-V7.101). Seven `v.` rows carry `V` cells (`v.manor_house`, `v.parish_church`, `v.windmill`, `v.pound` `settlement : 1`;
`v.chapel` `walk : 800 m`; `v.bakehouse` `walk : 500 m`; `v.alehouse` `households : 1 per 55`), so a builder of V11's
option adds village members V07's laws and bars (T-V7-41's alehouse count) do not expect. V07's 05:11 lane note carried the
point after V11's round had landed (05:09). **Required change:** V11 §3.5.1's coverage-option paragraph adds: "— except at
the rungs whose `RungProfile.frameLaw` is `territory`, where it adds no member and a `V` cell is a siting pull only (V07
§2.4's presence column; BCR-V7-36 (a); J-V7.101)"; T-V11-13's roster no-op clause notes the village rows lie outside the
option.

### Minors

**SR2-04** · minor · unwired derivation · **V08** — Two village-tier kinds play classes whose hard row needs a land use the
village makes only from a deposit. `salt_works` (H, V) → `salt_works`: `near` → `landuse:saltpan` within 0, hard;
`peat_cutter` (H) → `peat_works`: `near` → `landuse:marsh` within 0, hard (V11 §3.5.10). At a village rung those land uses
exist only where DR19 opens them (V08 §2.6's `deposits` row: `salt_flats`, `desert_salt` → `saltpan`; `marshlands` → a
`marsh` land use; V07 §3.11 DR19: "V08's `deposits` rows open their land uses in §3.9's claim"; V07 §3.9 (2)'s claim list
names no saltpan or marsh). A dossier with Salt works but no salt deposit leaves the hard row unsatisfiable: the use takes
the base's closest option, a salt works with no pans (the gap is the same at base rungs, where no stage makes a saltpan
without a deposit either). **Required change:** V08 §2.6's `deposits` row (DR19) adds: "a record whose class carries a hard
`near` → `landuse:<k>` row within 0 (V11 §3.5.10: `salt_works` → `saltpan`, `peat_works` → `marsh`) opens a face of that
land use as its deposit would, where the dossier carries none (item 20 (h): derived, never asked), its `DepositSite`
family `salt` or `peat` at DR19's site, reported `derived_landuse`"; V07 §3.9 and the base's S12a read it unchanged;
T-V8-32 or a new bar gains the salt-works fixture.

**SR2-06** · minor · stale companion · **V11** — V11 §3.12 (l. 2156–2158) still reads "At a village rung (THORP, HAMLET,
VILLAGE) an unnumbered record takes V07 §2.4's range row for its qualifier and member class (`village.json`
`rules.ladders.ranges`), else this range unscaled", while V07 keys the rows by step type with the qualifier as label
(J-V7.105) and V08 §3.5.1 (b) (l. 1496–1498) reads "for its step type and member class". **Required change:** V11's
sentence cites instead of restating: "At a village rung an unnumbered record takes V07 §2.4's range row by V08 §3.5.1 (b)'s
rule (keyed by step type and the class that plays the member class, the qualifier the row's label; J-V7.105), else this
range unscaled (SS-08)".

**SR2-07** · minor · stale records · **V07** — Three places describe as pending what has landed. (a) §2.4 (l. 958): "V08
§3.5.1 (b)'s 'for its step type and member class', V08's next round" — V08's round landed it (V08 l. 1496). (b) §1's
dependency (9) (l. 281–292) lists V11's SR1-03, SR1-07, SR1-08 and V08's SR1-16 wording and SR1-27 as companions with
fallbacks ("the village readings V11 has not yet echoed", "V08's range lookup by qualifier finds the step row by its
label"); all landed but V11 §3.12's wording (SR2-06). (c) §13's FL-2 and FL-3 stand open, FL-2 with the reason "revise-V4
is in progress (its §3.5 and §3.10 unwritten at this revision)", while IN-V07-2 closes both and V04's round 2 landed
`'rung'`, `v.parish_church` and the maintenance mode (V04 l. 13, 478, 1493). **Required change:** (a) drops "V08's next
round"; (b) marks each companion landed with its place, keeping only V11 §3.12's wording pending (SR2-06), and deletes the
two moot fallbacks; (c) marks FL-2 and FL-3 "closed by IN-V07-2 (J-VI.16)" in the table.

**SR2-08** · minor · looser restatement · **V07** — The GUILD hall's binding is stated loosely in two places: §3.11 DR9's
ladder paragraph, "GUILD → one `guildhall` plus the trade's members, the hall being one member of a craft- or
merchant-guild COUNT record where one stands (V11 §3.12)", and §2.4's ladder table, "a trade's GUILD record's hall is one of
them, never a further hall". V11 §3.12 now cites V08 §3.5.1 (c)'s family rule (J-V8.83; SR1-20): only a guild whose
`categories` family is `craft` binds into `craft_guilds_*` and `trade` into `merchant_guilds_*`; "a GUILD record of another
family, or with no such COUNT record in the dossier, keeps its own hall". **Required change:** both read "its hall bound
into a guild COUNT record of its `categories` family by V08 §3.5.1 (c) (J-V8.83), never a further hall; a GUILD record of
another family keeps its own hall".

**SR2-09** · minor · stale text · **BASE-F** — `_integrate.md` J-VI.16 (l. 158) still reads "`parish_church` counted"
and "volume 11 §3.24.3's `villageCap` 1", the clause SR1-11 superseded in V07's IN-V07-2 and left to "the integration
lane's next round"; no integration round ran, and reconcile-BASE-F-r2, which keeps `_integrate.md`'s halves, did not
take it. **Required change:** J-VI.16 reads "`v.parish_church` counted (SR1-24)" and "… and the village cap of the
specialisation rows is V07's `rules.tiers.capPerSettlement`, per settlement (V11 §3.24.3 has no rung column; SS-31,
SR1-10, SR1-11)", with a dated round note.

**SR2-10** · minor · stale record · **V02** — V02 X13 (l. 4126) reads "**Declined by volume 7** (J-V7.82)" and J-V2.56
(l. 3435) "volume 7 declined the column", but V07's J-V7.82, amended by its round 2 (J-V7.101), takes a `templateFamily` on
every `v.` row for the budget rows while `composition.classFamily` stays the composition key read first (V07 §2.4's class
columns, l. 743–748; §1 (3), l. 259–261). V02's chain already behaves so (step 3's `composition.classFamily` before step
4's `templateFamily`, l. 867–871); only the records are stale. **Required change:** X13 and J-V2.56's round-2 note read
"taken by volume 7 for the budget rows only (J-V7.82 as amended, J-V7.101): every `v.` row names a V11 §3.6.1
`templateFamily`, read at the chain's step 4 after step 3; `composition.classFamily` stays the one source of the village
classes' composition keys".

**SR2-11** · minor · restated values · **V07** — V07 §2.4's "Item 104 at village rungs" paragraph (l. 895–908) restates
V11 §3.13.2's `village` cells in words and now differs from them: `exotic-tower` "the delta A `far` from the heart and S
noise" against V11's "`S+ noise 2` plus the authored row `far` → `#housing` 60 soft" (SR1-19); `martial-barracks` "C
`local`" against `clientele dailyLocal`; `industrial-workshop` "its N `clay` removed" against `N− deposit`. V11 calls the
cells "V07's values, written here as data"; V07 calls its paragraph "their village reading, the rows their home" — two
statements of one fact. **Required change:** V07's paragraph keeps what no cell holds (the ruined landmark's ruin source and
surface marker, the mercantile-market stalls on the open space that SR2-02 gives the market) and replaces the per-archetype
list with "each archetype's village reading — class, else-class, delta, composition, pin or ruin — is its `village` cell in
V11 §3.13.2 (`ArchetypeVillageCell`, SS-09), read before `villageForm`".

**SR2-12** · minor · rule gap · **V07** — The tag fallback's drink test (§3.11 step 4, l. 2042–2043) reads "`food` with a
keyword of family `food-works` or `lodging` in the record's name (a drink) → `v.alehouse`"; V11 §3.13.2's `food-works`
family holds `butcher` as well as `brewer` and `brewery`, so an unmapped food kind named for a butcher becomes an alehouse.
**Required change:** the test names its keys: "a keyword `brewer`, `brewery` (family `food-works`), `tavern` or `alehouse`
(family `lodging`) in the record's name"; any other `food` record takes the generic class as today.

**SR2-13** · minor · unwired prose · **V07** — §2.4's ladder table (l. 973) says "a town watch at a village rung takes the
`v.watchtower` row with a yard by the green", and V11 §3.22 (l. 3036) repeats it; no row carries it: `v.watchtower`'s
authored rows pull to the palisade, a gate and the heart (l. 826), and the `tower` template's yard is the default court.
**Required change:** V07 §3.11 DR9 gives a `town_watch` record's `v.watchtower` member the assignment's own soft row
(`PlacementCriteria`, base l. 9055; as the sea-threat row does, id `pc/…`): `near` → `open:green`, `open:square` 80 soft
0.8, and the ladder table's cell cites it; V11 §3.22's parenthesis then holds as written.

**SR2-14** · minor · precedence unstated · **V07** — A forced seat keyed on a zeroed class. V07's forced seats put the
`villageSeat` class "present with at least one member at every village rung, whatever its presence entries" (l. 849), and an
`@absent:` record "zeroes a class's presence entries and members … and with them every class whose `with` or `×` cell names
it" (l. 849–851; §3.11 step 1). An `ecclesiastical` government's seat is `v.parsonage` (V11 §3.21.1), whose roster is
`×1 v.parish_church`, so a hamlet with that government and `Access to parish church` (T, H) meets both rules and V07 names
no winner. **Required change:** the forced-seats paragraph adds "a forced seat stands even where an `@absent:` record zeroes
the class its `with` or `×` cell names — the government is its own dossier fact: the priest's house stands with no church
of its own, its `near` → `v.parish_church` rows finding no target (neutral)"; T-V7-13 gains the case; a J-V7 row.

**SR2-15** · minor · duplicate switch · **V07** — Two switches now suppress a generated works-and-shop split:
`RungProfile.splitSites` (BCR-V7-24, file f item 310; `true` on every row, "`false` only under the `VG` preset", V07
l. 414, l. 3201) and V11 §3.7.4's `siting.web.splitEnabled` (J-V11.72; false in the `MFCG`, `FTG` and `VG` presets, "equal
cell for cell" to the web's off form). V07 §3.15's `VG` list restates part of that off form ("the supply web's two-way
weights, `comfortM` and the same-kind spacing at 0 … no split", l. 2356–2360) and omits its orientation switch and factors.
**Required change:** V07 withdraws `RungProfile.splitSites` — BCR-V7-24 keeps its declared-split and never-merged clauses,
the generated split's off switch being V11's `splitEnabled` — and W40, §2.1 (l. 414), the lifecycle row (l. 1030), §3.12
(l. 2297) and J-V7.30 follow; §3.15 reads "the supply web's off form (V11 §3.7.4's `web.off`) and the same-kind spacing at 0
(item 107 (g))". (File f item 310's text follows by SR2-01.)

## 4 Census: every dossier kind at every size lands in a class row

**(A) Kinds to class rows** (script `census.py` over V11 §3.11's 280 rows and §3.22's `villageForm` entries; `census.out`).
Tiers T, H and V carry 97 kinds and tier W 85, six carrying both, so **176** kinds reach a village rung at birth (T-V7-42's
parenthetical agrees). At a village rung: **34** go to a pseudo-class, **31** to a class with a village form (§3.22's 32
entries onto 21 of V07's `v.` rows), **111** to a class that plays itself, **0** to the tag fallback; every kind maps.
(Round 1 counted 27 and 115 from a 28-entry parse of the same §3.22 sentence — unchanged since but for its last line — which
missed four entries, among them the "`watchtower` and `guard_post`" pair; the totals agree.) Every `v.` id used in V07, V08
and V11 is one of V07's 25 rows; four are village-only (`v.longhouse`, `v.parsonage`, `v.tithe_barn`, `v.pound`). The 25
rows now read in V11's vocabulary (families, template families, needs, clientele, balance, coverage units, `to` targets,
`deckOk`, powers and sectors at weight 1), checked by reading; T-V7-56 is the executed check. **Beyond landing** — whether
the row a kind lands on can be placed at a village rung (`census3.py`: the hard rows and template sizes of the 111
self-playing kinds' classes): the hard `nearWater`, `shore`, `runningWater`, `dryGround`, `space` and `frontage through`
rows are met by the village's water, through roads and entries (BCR-V7-36 (b)); four readings are not — `nearMarket` and
`nearHarbour` and the secondary market (SR2-02), the claim-sized families (SR2-03), the land-use seats of salt and peat
(SR2-04).

**(B) The small-settlement hand-off.**

| check | round 2 reading | verdict |
|---|---|---|
| registration | one `ProductDecl` (V07 §2.1; file f item 202); V08 §3.10 consults `LadderRouter`; V07's W1, W30, V-M2 say so | holds |
| the band and the epoch's product | V07 §2.1's fold = V08 §3.10 = file f items 322 and 317; the fold's product and rung (never the target's rung) choose an epoch's phases in V07 §3.12 and BCR-V7-18 (TR-01) | holds |
| the floor | creation below 1 refused; 0 at an absorb → THORP and desertion (V07 §2.1; V08 §3.6 (7); item 202) | holds |
| burial records | `churchyard` on the church and cathedral families, `burial` on the cloister and burial ground, in V11, V07, V04 and the base; `parish_burial_grounds` read by V07 as V11's COUNT; V08 §2.6a (4)'s re-binding | holds |
| `@absent` at a village rung | the same reading in V07 §3.11 step 1, V11 §3.11 and W35, V08 §2.6 and §2.6a (3), T-V8-46 at VH | holds |
| seats | forced by DR11 through `villageSeat`, the kinds matching V11 §3.21.1 | holds; the precedence against `@absent` unstated (SR2-14) |
| water, toll bridge, latitude | the wells' floor; `implies: 'bridge'` in V11's own row; the latitude by V08 §2.5's rule | holds |
| markets and harbours | no `dist.market` or `dist.harbour` at territory rungs; "a dossier market record" undefined | unwired (SR2-02) |
| claim-sized classes | no claim at a village rung for `cloister` and `market-hall` | unwired (SR2-03) |

**(C) The ladders meeting.** The name grammar and the four qualifiers agree (V08 §3.5.1 (a), V07 §3.11). Step types agree
(V11 §3.12; V07 §2.4 lists only the differing readings). Unnumbered ranges: V07 keys `rules.ladders.ranges` by step type
with the qualifier as label and plays the member class through its village form (V07 §2.4), V08 §3.5.1 (b) reads so, V11
§3.12 still says "qualifier" (SR2-06). No double counting: V08 §3.5.1 (c) and V11 §3.12 bind a GUILD hall by the
`categories` family; V07 states the looser rule twice (SR2-08).

**(D) Records, ids, terms, units and base change requests across the seam.**

| subject | V07 | V08 | V11 | verdict |
|---|---|---|---|---|
| village class keys | `v.<id>`, 25 typed rows | five `v.` ids, all V07's | `v.` namespace; `villageForm` → `v.` only | agreed; V02, V03, V04 now keyed `v.` (SR1-05, -06, -24) |
| the `presence` column | typed (BCR-V7-36 (a)) | — | carried as V07 types it (§2.3) | agreed; not in file f (SR2-01) |
| the coverage option at village rungs | adds no member (J-V7.101) | — | applies to every class with a `V` cell | contradiction (SR2-05) |
| `dist.*` at territory rungs | `centre`, `gate` (BCR-V7-36 (b)) | — | `market`, `harbour` read by self-playing rows and §3.13.4 | unwired (SR2-02) |
| archetype village cells | restated in words, differing | shape cites V11 §2.8 | typed cells | restated (SR2-11) |
| GUILD hall binding | "a craft- or merchant-guild COUNT record" | by `categories` family (J-V8.83) | cites V08 | V07 looser (SR2-08) |
| split switch | `RungProfile.splitSites` | — | `siting.web.splitEnabled` | two switches (SR2-15) |
| range-row key | by step type | by step type | "qualifier" | V11 stale (SR2-06) |
| churchyard part, latitude, `deckOk`, stepped cap, goods words, manifest | agreed | agreed | agreed | holds |
| file f | BCR-V7-1 – -35 carried; -36, -37 not | every BCR-V8 carried | every BCR-V11 carried | SR2-01 |
| `_integrate.md` J-VI.16 | IN-V07-2 amended | — | — | stale (SR2-09) |

## 5 Summary, decisions, CONFIRMED versus PLAUSIBLE

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V07 | 0 | 2 (SR2-02, SR2-03) | 7 (SR2-07, -08, -11, -12, -13, -14, -15) | 9 |
| V11 | 0 | 1 (SR2-05) | 1 (SR2-06) | 2 |
| V08 | 0 | 0 | 1 (SR2-04) | 1 |
| V02 | 0 | 0 | 1 (SR2-10) | 1 |
| BASE-F | 0 | 1 (SR2-01) | 1 (SR2-09) | 2 |
| **total** | **0** | **4** | **11** | **15** (SR2-01 – SR2-15) |

**Round 1's 31:** all FIXED at the places named (§2); none reopened.

**Order of work.** V07's SR2-02 first (it widens BCR-V7-36 (b)), then BASE-F's SR2-01 carrying the final BCR-V7-36 and
BCR-V7-37 (and item 310 after V07's SR2-15); V07's SR2-03; V11's SR2-05 with SR2-06; then the minors.

**J-SR2 rows (this lane's own calls, vetoable).**
* **J-SR2.1** — Read the three volumes, `_integrate.md` and file f by whole diffs against the round-1 snapshots (md5s equal
  to round 1's inputs) plus the seam's core sections re-read whole in the live text, over re-reading about 1.3 MB whole
  again, because round 1 read every unchanged byte at those md5s and every changed byte is in the diffs; the risk left —
  an unchanged passage now contradicting a changed one — was met by re-reading the core sections whole and grepping every
  term the diffs introduced. The lane resumed once after a cut (CONTINUE RULE, lane-events 05:33).
* **J-SR2.2** — Tested whether the row a kind lands on can be placed at a village rung (SR2-02, SR2-03, SR2-04), over the
  bare "lands in a class row" test, because the dossier is the sole truth and a kind landing on a row the village cannot
  place (no market, no harbour, no claim, no land use) falls to an arbitrary closest option.
* **J-SR2.3** — Rated SR2-01 major, not blocker: BCR-V7-36's text is complete in V07 §10 and the coherence pass can apply
  it; only file f's carrier list lacks it.
* **J-SR2.4** — Rated SR2-05 major, over minor: a builder of V11's option adds village members V07's laws exclude.
* **J-SR2.5** — Gave SR2-02's `dist.market` fallback chain and SR2-03's cloister areas as recommendations, so the owning
  lane can apply them without re-deciding; each is V07's to change.
* **J-SR2.6** — Raised V02's stale record (SR2-10) here, as J-SR1.3 did, because the column it misdescribes is this seam's
  fix (SR1-01).

**CONFIRMED (read or executed in this lane).** The five inputs' md5s at the start and again before this file was finished
(§1); the diffs against the round-1 snapshots, read whole; every quotation at its line in the live file; the census —
280 kinds, 176 reaching a village rung, 34 / 31 / 111 / 0, 32 `villageForm` entries onto 21 `v.` rows, every `v.` id one of
V07's 25 — by script (`census.out`, md5 00d6640f…); the self-playing classes' hard rows and template families by script
(`census3.py`) and by reading V11 §3.5.4 – §3.5.10 and §3.6.1; the BCR ids of V07, V08 and V11 against file
f by script (BCR-V7-36 and -37 the only uncarried); `site.latitude` absent outside history (grep); "qualifier and member
class" only in V11 §3.12 (grep); V04's, V03's and V02's `v.` keys at the lines cited; the base's `ContextVector.dist`,
`RelationRule` kinds, `PlacementCriteria` and PART III sentence at their lines.

**PLAUSIBLE (reasoning).** That the 25 typed rows compile under T-V11-3, -4, -5, -7 and -25 (read by hand; T-V7-56 is the
executed check at V-M2); the consequences named in SR2-02, SR2-03 and SR2-04 (what a builder would ship — read from the
base's closest-option rule, not executed); SR2-03's recommended cloister areas and SR2-02's `dist.market` chain (judgments,
V07's to veto); that no other self-playing class meets a village gap beyond the four named (the census reads hard rows and
template sizes; soft rows at a village rung only weaken).
