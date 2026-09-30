# Seam critique, reconciliation round 3: settlements (V07 village, V08 SettlementForge, V11 content)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-settlements-r3; covered by the whole-design retrovalidation (J84).

PROGRESS
- §1 Inputs and method | done
- §2 Round-2 re-check (SR2-01..15) | done
- §3 Sweep findings (SR3-nn) | done
- §4 Census: every dossier kind at every size lands in a class row | done
- §5 Summary table and CONFIRMED versus PLAUSIBLE | done

## 1 Inputs and method

**Inputs** (md5 at the lane's start, re-checked unchanged before §3 was written; the base unchanged since round 0):

| file | md5 | lines | state |
|---|---|---|---|
| `docs/volumes/V07-village.md` | fb232447… | 3 707 | after reconcile-V07-r3 (LANDED 06:21, with its 06:22 after-note applying V6 X36) |
| `docs/volumes/V08-settlementforge.md` | c30a39c9… | 3 165 | after reconcile-V08-r3 (06:30) |
| `docs/volumes/V11-content.md` | 3679161b… | 4 417 | after reconcile-V11-r3 (06:25) |
| `docs/volumes/_integrate.md` | d868438e… | 369 | after reconcile-BASE-F-r3's half (06:08) |
| `docs/AMENDMENTS-2026-09-28f.md` | 38c29d39… | 1 238 | after reconcile-BASE-F-r3 (06:08) |
| `docs/ARCHITECTURE.md` | 01fea21f… | 17 297 | unchanged |
| `docs/volumes/V02-buildings.md` | 77417d41… | — | after reconcile-V02-r3 (06:08); read for SR2-10 only |
| `docs/volumes/critique/seam-settlements-r2.md` | — | 367 | round 2, re-checked issue by issue (§2) |

**How the seam was read** (J-SR3.1). The round-2 snapshots the round-3 reconcile lanes kept are md5-equal to round 2's
inputs (`rcV7r3/V07-pre-r3.md` 3a6cc3d2…, `rcV8r3/V08-pre-r3.md` d32c6a0e…, `rcV11r3/V11-pre-reconcile-r3.md` 4cf57d39…,
`rcBFr3/integrate-pre-r3.md` a8c72fb4…, `rcBFr3/f-pre-r3.md` a85996a2…, `rcV2r3/V02-pre-r3.md` dc951b81…), so every byte
round 2 read whole or by diff is unchanged but what the round-3 diffs show. Those diffs were read whole (scratch
`scratchpad/volumes/ssr3/d07.diff` 843 lines, `d08.diff` 693, `d11.diff` 349, `df.diff` 191, `dint.diff` 20; `d02.diff`
by grep for SR2-10). Then the seam's core sections were re-read whole in the live text, so an unchanged passage that now
contradicts a changed one is caught: V07 §2.4 (every table and paragraph), §3.2 (3), §3.6, §3.9 (1)–(2), §3.10, §3.11's DR1,
DR9, DR11, DR19 and step 1, §3.0's key table, §8's V-M0 – V-M2 rows, BCR-V7-36 and BCR-V7-37; V08 §2.6 (every row set),
§2.6a, §3.5.1, §3.10; V11 §3.11's head, §3.12 whole, §3.13.1 – §3.13.2's archetype table, §3.13.4, the keyword rows V07 reads,
§3.21.1 – §3.21.3, §3.22, the §3.5 class rows the census flags and §3.6.1's claim-sized families. Base passages at the
lines a finding cites: §2.5 `Reservation` (l. 989–992), §2.7 `DepositSite` (l. 1866), §4.2 S2's *Government* and
*Religion* sentences (l. 11546–11550), §4.7's *Furniture pins* (l. 5442–5451) and *Markets* paragraph (l. 5453–5456);
file g item 108 (a)–(b) (l. 375–410).

**Scripts** (scratch `scratchpad/volumes/ssr3/`): round 2's `census.py` and `census3.py`, re-run on the live V11 with the
class-table window moved from line numbers to §3.5's section bounds (V11 grew 127 lines above it) — `census.out` is
byte-identical to round 2's (md5 00d6640f…); a scan of every `` `v.` `` id in V07, V08, V11, V02, V03, V04, V06, V09, V10
and V12 against V07's 25 rows; the BCR ids of V07 (37), V08 (32) and V11 (30) against file f by an exact-id regex (every one
carried; BCR-V8-9 withdrawn); greps for `splitSites`, `rules.market`, `villageSeat`, `guard post`, `lesser class`,
`V-M0`, the keyword rows and the market-family rows.

**Severity** as rounds 0–2: blocker (the subject cannot be built as written), major (a contradiction or an unwired piece a
builder would hit), minor (wording, a pointer, a restated value, a stale record). Each finding names ONE owning volume (V01…
V12, or BASE-F for file f and the integration notes the BASE-F lane keeps) and an exact required change; a companion is its
own finding. Ids are **SR3-nn**.

## 2 Round-2 re-check — every issue, now

Round 2 raised 15 issues (0 blockers, 4 majors, 11 minors). The owning lanes report all of them FIXED (reconcile-V07-r3:
SR2-02, -03, -07, -08, -11 – -15; reconcile-V11-r3: SR2-05, -06; reconcile-V08-r3: SR2-04 (settlements); reconcile-V02-r3:
SR2-10; reconcile-BASE-F-r3: SR2-01, -09). Each was re-checked against the live text. **Result: 15 of 15 FIXED at the
places round 2 named; none reopened.** Four fixes left a residue — a sentence another lane's later landing made stale, a
title that no longer fits, or a new rule that meets an older one — raised in §3 as new findings (the residue column).

| id | owner | status | evidence (live text) | residue |
|---|---|---|---|---|
| SR2-01 | BASE-F | FIXED | file f item 576 carries BCR-V7-36 ((a) after item 432; (b) "in the text seam SR2-02 widens it to"), *Needed by* V07, V11, STAGED (l. 646); item 577 carries BCR-V7-37 under a new PART III heading, applied with item 202 (l. 1019–1021); item 310's note carries BCR-V7-24 as SR2-15 reduces it (l. 320); census: all 37 BCR-V7, 32 BCR-V8, 30 BCR-V11 ids carried (script) | items 576 and 310 keep titles V07 has since changed (SR3-05) |
| SR2-02 | V07 | FIXED | BCR-V7-36 (b) widened to `dist.market` (the principal market's reservation, else the first nucleus's open space, else the heart; the fair field never) and `dist.harbour` (the wharf's `quay` way, else absent; "at a port" = "a wharf is laid") (l. 3402–3413); §2.4's context paragraph (l. 820–828); §3.6 (4) defines a dossier market record (l. 1655–1662); §3.6 (4b) the fair field (l. 1676–1684), F-V-FAIR, `rules.market` `{ law, fairHa, fairAspect }`; §3.11's chain bullet cites V11 §3.13.4's `resourceSite`, `firstProcessor`, `stepInward`, `finalSeller`, `compatible`, `endpointStore` — each a cell of V11 §3.13.4 (l. 2645–2655); W64, W66; T-V7-13's fixtures; J-V7.111 | the fair field meets the base's per-market furniture (SR3-02) |
| SR2-03 | V07 | FIXED | `rules.claimArea` (§2.2a's type, l. 619–622, and its cell row, l. 664); §2.4's class-column sentence (l. 771–773); §3.6 (4a) (l. 1663–1675); §3.8's join law and VS6's estimate; W65; T-V7-42's finite-plot compile check; T-V7-13's monastery fixture; J-V7.112. V11 §3.6.1's `market-hall` (footprint 250 / 350 / 500 / 700, plot "the claim's") and `cloister` rows and the `church` footprint the reference reads exist (V11 l. 1464–1472) | (4a) takes `slave_market` to the market's rim against its own rows (SR3-06); §3.0's VS4 row does not name the halls (SR3-09) |
| SR2-04 | V08 | FIXED | V08 §2.6's `deposits` row: a derived `DepositSite` `res:derived:<k>` for a class with a hard `near` → `landuse:<k>` row within 0 (V11 §3.5.10's `salt_works` and `peat_works`, l. 1369, 1375), `derived_landuse`, its life and the custom-record exception (l. 733–747); §2.4's note kind, BCR-V8-4, §3.11, §5.2, §2.7, §1b; T-V8-18's salt-works mutation, totality compile check and VH peat clause; J-V8.95. V07's DR19 reads deposits in §3.9's claim (V07 l. 2137), and V07 §3.9 (2) yields the `pasture`, `wildwood` and orchard faces the other hard land-use rows need (V07 l. 1876–1883) | — |
| SR2-05 | V11 | FIXED | V11 §3.5.1: "except at the rungs whose `RungProfile.frameLaw` is `territory`, where it adds no member and a `V` cell is a siting pull only" (l. 1112–1115); T-V11-13's village clause; W37; J-V11.73 | — |
| SR2-06 | V11 | FIXED | V11 §3.12: "V07 §2.4's range row … by V08 §3.5.1 (b)'s rule — keyed by step type and the class that plays the member class, the qualifier the row's label (J-V7.105)" (l. 2196–2199) | V07 §1 (9) still lists it as pending (SR3-04) |
| SR2-07 | V07 | FIXED | (a) §2.4's range prose ends "V08 §3.5.1 (b) reads it 'for its step type and member class'" (l. 987); (b) §1 (8) and (9) mark every companion landed with its place and withdraw the fallbacks (l. 283–298); (c) FL-2, FL-3 "closed by IN-V07-2 (J-VI.16)" (§13) | (b)'s one "Pending" line is now itself stale (SR3-04) |
| SR2-08 | V07 | FIXED | §2.4's guild row (l. 998) and §3.11 DR9 (l. 2150–2152) bind a GUILD record's hall "into a guild COUNT record of its `categories` family by V08 §3.5.1 (c) (J-V8.83) … a GUILD record of another family keeps its own hall"; T-V7-35's clause | — |
| SR2-09 | BASE-F | FIXED | `_integrate.md` J-VI.16 reads "`v.parish_church` counted (SR1-24)" and the village cap as V07's `rules.tiers.capPerSettlement`, per settlement (l. 158), with a dated round-3 note (l. 168) | — |
| SR2-10 | V02 | FIXED | V02 X13 (l. 4222) "Taken by volume 7 for the budget rows only (J-V7.82 as amended …; J-V7.101)", J-V2.56's round-3 note (l. 3498) | — |
| SR2-11 | V07 | FIXED | §2.4's *Item 104 at village rungs* cites V11 §3.13.2's `village` cells and keeps only the ruined landmark's ruin source and marker and the mercantile-market record's market reading (l. 928–936); V11's `mercantile-market` cell is "pin `@pin:market_cross`, with V07 §3.10's stalls on the green" (V11 l. 2381), which V07's reading completes | — |
| SR2-12 | V07 | FIXED | §3.11 step 4 names `brewer`, `brewery` (family `food-works`), `tavern`, `alehouse` (family `lodging`) (l. 2102–2104); each is a V11 keyword row of that family (V11 l. 2510–2544 by grep) | — |
| SR2-13 | V07 | FIXED | §3.11 DR9's `town_watch` member carries the assignment's soft row `near` → `open:green`, `open:square` 80 soft 0.8 (l. 2156–2159); §2.4's ladder cell (l. 1002); V11 §3.22's parenthesis (l. 3078–3079) and §3.12's `town_watch` row (l. 2295) now hold as written | — |
| SR2-14 | V07 | FIXED | §2.4's forced seats: "A forced seat stands even where an `@absent:` record zeroes the class its `with` or `×` cell names", its rows neutral, no F-SITING report (l. 882–886); DR11 (l. 2128); T-V7-13's ecclesiastical fixture; J-V7.113 | — |
| SR2-15 | V07 | FIXED | `RungProfile.splitSites` withdrawn (W40, §2.1, §2.6's row removed, §3.12, §3.15, V07 §4.1, BCR-V7-24 reduced, J-V7.115); no `splitSites` remains in any volume, file f, file g or the base but the history rows (grep); V11 §3.7.4's `splitEnabled` carries `presets.MFCG`, `.FTG`, `.VG` false (V11 §2.2) | — |

## 3 Sweep findings

Each: **id** · severity · kind · **owner** — the claim with its evidence, then the exact required change. Majors first.

### Majors

**SR3-01** · major · unwired reading, contradiction with the base · **V07** — The government row's town-side forcing at a
village rung. The base's S2 reads the government with no rung gate: "the blueprint's `government` circumstance selects a
`GovernmentRow` whose offices force seats — … — plus a military share (guard posts per 1 000 inhabitants; barracks at CITY
and above …)" (§4.2 S2, *Government (COV-FTG-B13)*, l. 11546–11550). V11 §3.21.1's rows (l. 3037–3043) give each kind a
seat class (`crown` `palace`, else `castle`; `seigneurial` `castle`, a `tower_house` below CITY with the toggle off;
`ecclesiastical` `palace` beside the `cathedral`; `chartered_commune` `town_hall`; `merchant_oligarchy` `guildhall`),
offices with their seat classes (crown: chancellor and treasurer · `palace`, sheriff · `castle`, mayor · `town_hall`;
seigneurial: steward · `castle`, bailiff · `courthouse`; ecclesiastical: bishop · `palace`, dean and archdeacon ·
`cathedral`; commune: guild wardens · `guildhall` 0.3 per 1 000; oligarchy: harbour reeve · `harbour_master` at a port),
and guard posts 0.8–1.5 per 1 000. V07 §3.2 (3) runs "the sequential roster (§10.2) … with the village class rows (§2.4)
and the village's household rows" (l. 1272–1273), §3.0 lets S2 run as a base stage on village rows, and DR11 forces the
`villageSeat` (l. 2124–2129; J-V7.104) — but no sentence of V07 says the row's seat class, its offices' seat classes or
its military share are not read at the territory rungs (grep: V07 names none of them; its §3.11 step 1 even reads "`@seat`
to the government row's seat class", l. 2088). `palace` and `castle` carry no village form (T-V11-37) and V11 §3.22 gives `cathedral` none, so they
play themselves; `town_hall` plays `v.reeve_house` and `guard_post` plays `v.watchtower` through V11 §3.22. A builder
running S2 at VILLAGE therefore forces a palace and a castle into a crown village beside its forced manor, a courthouse
into a seigneurial one, a bishop's palace and a cathedral into an ecclesiastical one — against V07's own "No `cathedral` or
`great_temple` is placed at a village rung" (l. 915–916) — and adds a guard post, that is a `v.watchtower`, to every village
of 700 people or more, against the watchtower's presence row (`threat` : 1; `defence ≥ 0.6` : 0.3; l. 810) that T-V7-12
bars at ± 5 %. A standalone village has a government kind too (the request's; §2.4's `gov` condition, l. 868), so the gap
is not the dossier's alone. **Required change:** V07 §3.2 (3) adds: "At the rungs whose `RungProfile.frameLaw` is
`territory`, S2's government step reads the row's `villageSeat` alone — its class present with one member (§2.4's forced
seats; J-V7.104) — and reads neither the row's seat class, nor its offices' seat classes, nor its military share (guard
posts, barracks): a village's officers sit in the seat's house and its watch keeps no post of its own. A dossier office
(`@office`) binds to the `villageSeat` member's building, a religious office (`priest_resident`) to the parish church
(V11 §3.11); a `guard_post` member arises only from a town-watch record (§3.11 DR9) or the `v.watchtower` presence row."
BCR-V7-36 gains a part (c) on `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1
boundary and its trace`, quoting once "the blueprint's `government` circumstance selects a `GovernmentRow` whose offices
force seats" (it occurs once) with that mechanism, and is retitled "a class's presence entries, the context readings and
the government step at village rungs" (the title's "two context readings" has been stale since SR2-02 made them four);
§3.11 step 1's `@seat` reads "to the government row's `villageSeat` (V11 §3.21.1)"; T-V7-13 gains "a crown, a seigneurial,
an ecclesiastical and a chartered-commune fixture at VILLAGE place no palace, castle, cathedral, courthouse or guildhall of
the government row's, and no `v.watchtower` beyond its presence row"; a J-V7 row. (V11's and file f's companions: SR3-03,
SR3-05.)

**SR3-02** · major · contradiction with the base · **V07** — Two furniture passes at a village rung, and a furnished fair
field. V07 §3.0 runs "S7 and S7b–S14 … unchanged on a village" (l. 1136–1137; S11 in the stage list, l. 1155) and makes VS8
the village's pin stage (output `pins`, l. 1190): §3.6 (5)'s centrepiece, "VS8 places it; decided here" (a well, a large
tree, a pond, a cross or nothing; l. 1685–1688), and §3.10's wells, moot place, cross, stocks, maypole, shrine, troughs and
market stalls, "one per `stalls.perHouseholds` (40) households, at least `stalls.min` (3)" (l. 1963–1972). The base's S11
furniture step (§4.7 *Furniture pins*, l. 5442–5451; "S11's furniture step", l. 5568) also runs there and nothing in V07
stops it: "The main plaza always gets one centrepiece — statue 0.6, fountain 0.3, market cross 0.1"; "each gate plaza gets
a well, cross or trough with probability 0.5"; "every block draws one weighted decoration row"; "singletons — bandstand,
statue, monument — are placed once per district"; "market stalls … line each market square's edge band … the principal one
per ≈ 150 m² of square (≤ 40), a secondary one per ≈ 200 m² (≤ 20)", and the *Markets* paragraph gives "every market
square — … each secondary claim —" those pins (l. 5453–5456). So a builder lays a statue or a fountain beside VS8's
centrepiece on the green, two sets of stalls on it, a bandstand in the one `village` district, and — new with round 3 — up
to twenty stall tents and a 0.5 centrepiece on the fair field (§3.6 (4b): a `market` reservation of rank `secondary`,
l. 1681–1682), which V07 means as common grazing between fairs and draws "as the common it is" (§5.3). **Required
change:** V07 decides that at the rungs whose `RungProfile.frameLaw` is `territory` S11's furniture step places no pin —
VS8's rows (§3.6 (5), §3.10) are the village's whole furniture, so the open space carries only VS8's centrepiece and
stalls and the fair field carries none — stated in §3.0 beside "run unchanged" and in §3.10's VS8 paragraph, with a base
change request on `### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and
footprints — the plot model`, *Furniture pins*, quoting once "The main plaza always gets one centrepiece" (it occurs
once) with the mechanism "the step places nothing at the rungs whose `frameLaw` is `territory`, where the product's own
pin stage places the furniture"; a J-V7 row; T-V7-13's fair fixture gains "0 pins on the fair field", and a bar asserts
at every village rung 0 `statue`, `fountain`, `bandstand` and `monument` pins and no stall beyond VS8's count.

### Minors

**SR3-03** · minor · companion · **V11** — V11 §3.21.1 states each government kind's seat class, offices and guard posts
per 1 000 beside its `villageSeat` column (l. 3037–3043) with no word on which columns a territory rung reads, and W63's
consumer is the `@seat` pseudo-class only (l. 263). **Required change:** a sentence under the table — "At the rungs whose
`RungProfile.frameLaw` is `territory`, S2 reads the `villageSeat` column alone; the seat class, the offices' seat classes
and the guard posts are the base rungs' (V07 §3.2 (3); BCR-V7-36 (c); SR3-01)" — and W63's consumer column adds "S2's
government step at the territory rungs".

**SR3-04** · minor · stale record · **V07** — V07 §1's dependency (9) still carries "**Pending**: V11 §3.12's range
sentence still reads 'for its qualifier and member class' (SR2-06, V11's round); *fallback*: V11's lookup by qualifier
finds the village step row by its label, so both readings name one row" (l. 298–300), and §12's PLAUSIBLE row reads "(all
landed since but V11 §3.12's range wording, §1 (9))" (l. 3533–3534). V11's round 3 landed SR2-06 at 06:25, after V07's
lane at 06:21: V11 §3.12 now reads "V07 §2.4's range row … by V08 §3.5.1 (b)'s rule — keyed by step type and the class
that plays the member class, the qualifier the row's label (J-V7.105)" (V11 l. 2196–2199). **Required change:** (9) reads
"— all landed", adding "V11 — the village range row cited by V08 §3.5.1 (b)'s rule (SR2-06; V11 §3.12)" to its list and
deleting the pending sentence and its fallback; §12's row reads "(all landed since, §1 (9))".

**SR3-05** · minor · stale titles, companion · **BASE-F** — File f item 310 is titled "splits by rung, and a declared
split" (l. 320), BCR-V7-24's old title; V07 retitled it "a declared split, and split pairs across a rung change" (V07
l. 3279) when SR2-15 withdrew the rung switch. Item 576 is titled "a class's presence entries, and two context readings
at village rungs" (l. 646), V07's title, which SR2-02 made stale (the readings are four) and SR3-01 extends. **Required
change:** item 310's title reads V07's current title; item 576's reads V07's title as SR3-01 sets it and carries part (c)
with "Also touches: §4.2 (S2's *Government* sentence)"; SR3-02's base change request is carried as its own item under
`### 4.7`, *Needed by* V07, **STAGED (the village product, V-M0 to V-M4)**; the census re-runs (0 uncarried).

**SR3-06** · minor · contradiction · **V07** — §3.6 (4a) takes a slave market to the market's rim against its own rows.
The claim is cut at the rim for "a class of the `market-hall` template family that plays itself at a village rung (V11's
`market_hall` for a `fish_market` record; `slave_market`)" (l. 1663–1675), on J-V7.112's ground that "a market hall stood
on its market". V11's `market_hall` row carries `nearMarket` 60 hard (V11 l. 1238), so the rim is its site; V11's
`slave_market` row carries no market row — "`nearHarbour` 300 or `nearGate` 300 soft *ext*" (l. 1252) — and at a base
rung its "the claim's" plot is S7b's claim sited by those rows (§4.5 S7b (3)), not the market's edge. At a village rung the
fixed rim claim, taken claims-first, overrides both rows. **Required change:** (4a) applies to a `market-hall`-family class
whose rows pull it to the market (a `nearMarket` row; today `market_hall`); any other `market-hall`-family class that plays
itself at a village rung (`slave_market`) takes the same plot area `A_h` by S10's join law, sited by its own rows as a
`cloister`-family class joins slots (§3.8), with no claim on the open space; W65 and J-V7.112 follow; T-V7-13 gains a
`slave_market` fixture on a coast whose market lies nearer the wharf or an entry than its random baseline.

**SR3-07** · minor · milestone disagreement · **V11** — V11 lands the `VG` preset with V07's **V-M0** in six places —
W68 (l. 268), §2.1's `presetsRequired` comment (l. 292), registry row 73 (l. 787), §3.2.1 step 4 (l. 830), §8 (l.
3744–3745: "in the change that ships the `VG` preset file …, written by the seat landing V-M0"), J-V11.74 (l. 3842) and the
round-3 note (l. 4403) — while V07 §8 puts "the `VG` preset with the request mapping" in **V-M1**'s content (l. 2939), V-M0
being the headless tracker spike that only compares the road-topology shares with VG's roll (l. 2938). **Required
change:** each place reads "V07's V-M1 (the milestone whose content ships the `VG` preset, V07 §8)"; the round-3 note may
keep its history with "V-M1 (as corrected, SR3-07)".

**SR3-08** · minor · unwired from the builder's side · **V07** — V07 §8's V-M1 row (l. 2939) builds "the `VG` preset with
the request mapping" but not V11's `presets.VG` entries on `siting.web.bulkyWater`, `.perishableShort`, `.orientEnabled`,
`.splitEnabled` and `terrace.enabled`, which V11 assigns to "the seat landing" that milestone (V11 §2.2, §8, l. 3744–3746)
and without which V11's compiler stops the build once the `VG` file ships (V11 §3.2.1 step 4, l. 828–834). A V-M1
implementer holding the base and V07 does not meet them. **Required change:** V-M1's content adds "V11's `presets.VG`
entries on its five cells — `bulkyWater` and `perishableShort` 1, `orientEnabled`, `splitEnabled` and `terrace.enabled`
false — written from V11 §2.2's rule in the change that ships the `VG` preset file (V11 §8; file f item 377)", and §3.15's
`VG` list cites them beside V11 §3.7.4's `web.off`.

**SR3-09** · minor · incomplete record · **V07** — §3.0's key table gives VS4 the input "`roster` (`D` for the piers, the
`v.landing` for the pier head)" (l. 1187), but VS4 now also reads the roster's `market-hall`-family members to cut their
claims (§3.6 (4a); W65 names "S2's manifest (a cloister- or market-hall-family class playing itself)" as the producer and
VS4 as the consumer). **Required change:** the parenthetical adds "the `market-hall`-family members for the halls' claims
(§3.6 (4a))" (after SR3-06, those with a `nearMarket` row).

**SR3-10** · minor · term disagreement · **V07** — V07 keys the village range rows by "(step type, lesser class)" (l. 983),
heads the table's column "lesser class" (l. 1004), and counts "the per-capita count of the lesser class" (l. 981) and "that
many members of the lesser class" (§3.11 DR9, l. 2148), using file g item 108's word for the class whose buildings the
record counts. V11 §3.12's table separates *lesser kinds* from *member class*, and they differ (`hospital_network`: lessers
`almshouse`, `foundling_home`, member class `hospital`; `inns_and_taverns_district`: lessers `inn_multiple`,
`taverns_5_20`, member class `inn`; l. 2235, 2250), and V08 §3.5.1 (b) and V11 §3.12 key the village row "for its step type
and member class" / "the class that plays the member class". A builder keying `rules.ladders.ranges` by V07's word could
key a QUARTER or COUNT record's row by a lesser kind's class. **Required change:** the four places read "member class"
with, once in §2.4's range prose, "(V11 §3.12's *member class* column, played at a village rung through its village form;
item 108 (b)'s 'lesser class')".

## 4 Census: every dossier kind at every size lands in a class row

**(A) Kinds to class rows** (round 2's `census.py` re-run on the live V11, its class-table window bound to §3.5's section;
`census.out` byte-identical to round 2's, md5 00d6640f…). 280 kinds; tiers T, H and V carry 97 and tier W 85, six in both,
so **176** reach a village rung at birth. At a village rung **34** go to a pseudo-class, **31** to a class with a village
form (V11 §3.22's 32 entries onto 21 of V07's `v.` rows), **111** to a class that plays itself, **0** to the tag fallback;
every kind maps (T-V7-42's parenthetical agrees). Every `v.` id used in V07, V08, V11, V02, V03, V04 and V06 is one of V07's
25 rows (V09, V10, V12 use none). **Beyond landing** (`census3.py`: the hard rows and template sizes of the 111
self-playing kinds' classes): round 2's four gaps are closed — `nearMarket` and `nearHarbour` read BCR-V7-36 (b)'s
`dist.market` and `dist.harbour` (W64), the fair field is laid (W66), the claim-sized `cloister` and `market-hall`
families read `rules.claimArea` (W65; T-V7-42's compile check), and the salt and peat land uses are derived by V08's
`deposits` row when no deposit opens them (J-V8.95); the other hard land-use rows (`sheepfold`'s `pasture`, `druid_grove`'s
`wildwood`) are met by V07 §3.9 (2)'s claim. What is left is not a kind's landing but a rule's reach: the government row's
town-side forcing (SR3-01), the base's furniture on the village's market squares (SR3-02) and the slave market's rim
claim (SR3-06).

**(B) The small-settlement hand-off.**

| check | round 3 reading | verdict |
|---|---|---|
| registration | one `ProductDecl` (V07 §2.1; file f item 202); V08 §3.10 consults `LadderRouter`; V07's W1, W30, V-M2 say so | holds |
| the band and the epoch's product | V07 §2.1's fold = V08 §3.10 = file f items 322 and 317; unchanged this round | holds |
| the floor | creation below 1 refused; 0 at an absorb → THORP and desertion (V07 §2.1; V08 §3.6 (7); item 202) | holds |
| burial records | `churchyard` on the church families, `burial` on the cloister and burial ground; `parish_burial_grounds` a COUNT over the churchyards (V11 §3.12 l. 2242); V08 §2.6a (3)–(4) | holds |
| `@absent` at a village rung | V07 §3.11 step 1, V11 §3.11 and W35, V08 §2.6 and §2.6a (3), T-V8-46 at VH | holds |
| seats | forced by DR11 through `villageSeat`, standing even where `@absent:` zeroes its partner (SR2-14 fixed); the row's other seat, office and guard-post columns unscoped at territory rungs | unwired (SR3-01) |
| markets and harbours | `dist.market`, `dist.harbour` defined (BCR-V7-36 (b)); a dossier market record defined; the fair field laid | holds; the fair field's furniture (SR3-02), the slave market's site (SR3-06) |
| claim-sized classes | `rules.claimArea` for `cloister` and `market-hall` | holds |
| derived land uses | V08's `res:derived:<k>` for `saltpan` and `marsh`; V07 §3.9 reads it unchanged (T-V8-18's VH clause) | holds |
| water, toll bridge, latitude | unchanged since round 2 | holds |
| the `VG` preset | V07 ships it at V-M1; V11 lands its `presets.VG` entries "with V-M0" | milestone disagreement (SR3-07, SR3-08) |

**(C) The ladders meeting.** The name grammar and the four qualifiers agree (V08 §3.5.1 (a), V07 §3.11). Step types agree
(V11 §3.12; V07 §2.4 lists only the differing readings, each checked against V11's rows: `tanners` COUNT with no range,
`town_watch` REPLACEMENT onto `guard_post` → `v.watchtower`, `fish_market` REPLACEMENT over `fishmonger`, `parish_church`
REPLACEMENT over `wayside_shrine`, `multiple_water_sources` a floor). Unnumbered ranges: all three volumes now read V07's
row by step type with the qualifier as label — V08 §3.5.1 (b), V11 §3.12 (SR2-06 fixed), V07 §2.4 — and V07's rows are
`calibratable: false` like V11's (J-V7.114; V11 §3.12, l. 2204–2206; V12's register line for the port's ranges, l. 1843,
"never entries"); V07 alone names the key's class "lesser class" (SR3-10). No double counting: V08 §3.5.1 (c), V11 §3.12
and V07 (§2.4, DR9, T-V7-35) bind a GUILD hall by the `categories` family (SR2-08 fixed).

**(D) Records, ids, terms, units and base change requests across the seam.**

| subject | V07 | V08 | V11 | verdict |
|---|---|---|---|---|
| village class keys | `v.<id>`, 25 typed rows | five `v.` ids, all V07's | `v.` namespace; `villageForm` → `v.` only | agreed |
| the `presence` column and the coverage option | typed (BCR-V7-36 (a)); no member from the option at village rungs | — | carried (§2.3); the option exempts `territory` rungs (§3.5.1) | agreed (SR2-05 fixed) |
| `dist.*` at territory rungs | `centre`, `gate`, `market`, `harbour` (BCR-V7-36 (b)) | — | read by the self-playing rows and §3.13.4's `stepInward`, `finalSeller` | agreed (SR2-02 fixed) |
| a dossier market record | V11's `market` family or a `mercantile-market` record | `kinds` rows | `market`, `market_hall`, `fair_ground`, `slave_market` rows; the archetype's `village` cell | agreed |
| archetype village cells | cited (§2.4) | shape cites V11 §2.8 | typed cells | agreed (SR2-11 fixed) |
| the government row at a village rung | `villageSeat` forced; the rest unstated | `government` names → kinds | seat class, offices, guard posts, `villageSeat` | unscoped (SR3-01, SR3-03) |
| split switch | V11's `splitEnabled` (J-V7.115) | — | `siting.web.splitEnabled` | agreed (SR2-15 fixed) |
| range-row key | by step type, "lesser class" | by step type and member class | by step type and the class playing the member class | term (SR3-10) |
| the `VG` preset's milestone | V-M1 | — | V-M0 | disagree (SR3-07, SR3-08) |
| file f | BCR-V7-1 – -37 carried; items 310, 576 titled as before | every BCR-V8 carried | every BCR-V11 carried | titles (SR3-05) |
| `_integrate.md` J-VI.16 | IN-V07-2 | — | — | agreed (SR2-09 fixed) |

## 5 Summary, decisions, CONFIRMED versus PLAUSIBLE

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V07 | 0 | 2 (SR3-01, SR3-02) | 5 (SR3-04, -06, -08, -09, -10) | 7 |
| V11 | 0 | 0 | 2 (SR3-03, SR3-07) | 2 |
| BASE-F | 0 | 0 | 1 (SR3-05) | 1 |
| V08 | 0 | 0 | 0 | 0 |
| **total** | **0** | **2** | **8** | **10** (SR3-01 – SR3-10) |

**Round 2's 15:** all FIXED at the places named (§2); none reopened. The seam's census holds (176 kinds reach a village rung,
every one lands); the three volumes now agree on the class keys, the presence column and the coverage option, the four
context readings, the market and harbour, the claim-sized plots, the derived land uses, the archetype cells, the split
switch, the range-row key and the GUILD hall. V08 has no finding this round.

**Order of work.** V07's SR3-01 first (it adds BCR-V7-36 (c) and a title), with SR3-02 (a new base change request); then
V11's SR3-03 citing SR3-01, and BASE-F's SR3-05 carrying both requests and the two titles, its census re-run; V11's SR3-07
with V07's SR3-08 (one milestone, both sides); then V07's SR3-04, -06, -09, -10.

**J-SR3 rows (this lane's own calls, vetoable).**
* **J-SR3.1** — Read the five seam files by whole diffs against the round-2 snapshots (md5-equal to round 2's inputs) plus
  the seam's core sections re-read whole in the live text, over re-reading about 1.4 MB whole again, because rounds 0 and
  1 read every unchanged byte whole and round 2 every changed byte, and the one risk left — an unchanged passage meeting a
  changed one — is what the core-section re-read and the greps meet. Two of this round's findings (SR3-01, SR3-02) sit in
  unchanged text that the round-3 repairs newly reach, which is that risk found, not missed.
* **J-SR3.2** — Rated SR3-01 major, not blocker: the village can be built as written, but a builder running the base's S2
  government step on V07's rows places town seats and guard posts V07's own laws and bars exclude.
* **J-SR3.3** — Rated SR3-02 major although the base's furniture step predates round 3: severity follows what a builder
  meets (two stages deciding the green's centrepiece), not when the gap arose; the fair field is the round-3 repair that
  makes it visible.
* **J-SR3.4** — Gave SR3-01's rule (the `villageSeat` alone; officers in the seat's house; no watch post but a record's) and
  SR3-02's (VS8's rows the village's whole furniture) as the recommended decisions, so V07 can apply them without
  re-deciding; each is V07's to veto, the realism reading being that a village kept no palace, courthouse, statue or
  bandstand and its watch no post.
* **J-SR3.5** — Named V-M1 (V07's plan) over V-M0 (V11's) in SR3-07, because V07 owns the `VG` preset (BCR-V7-13) and its
  build table puts the preset in V-M1's content; V-M0 only compares a draw with VG's roll.
* **J-SR3.6** — Raised the slave market's rim claim (SR3-06) as minor, not major: V07 names the class explicitly, so a
  builder meets no ambiguity — only a siting that overrides V11's soft rows.

**CONFIRMED (read or executed in this lane).** The inputs' md5s at the start, before §3, and before this section (§1); the
round-2 snapshots md5-equal to round 2's inputs; the round-3 diffs read whole; every quotation at its line in the live
file; the census by script (280 kinds, 176 reaching a village rung, 34 / 31 / 111 / 0, 32 `villageForm` entries onto 21
`v.` rows; `census.out` byte-identical to round 2's) and the self-playing classes' hard rows (`census3.out`); every `v.` id
in ten volumes one of V07's 25 (script); every BCR-V7, BCR-V8 and BCR-V11 id carried in file f (exact-id script); no
`splitSites` outside history rows (grep); V11 §3.13.4's six rule cells, the four keyword rows and the `mercantile-market`
cell V07 cites (read); the base's S2 *Government* sentence, the §4.7 *Furniture pins* and *Markets* paragraphs,
`Reservation` and `DepositSite` at their lines, and each base quote the required changes name occurring exactly once
(grep); V07's silence on the government row's other columns and on S11's furniture step (grep for `offices`, `military`,
`guard post`, `seat class`, `furniture`, `bandstand`, `singleton`).

**PLAUSIBLE (reasoning).** The consequences in SR3-01 and SR3-02 (what a builder would place — read from the base's S2 and
S11 rules and V11's rows, not executed); SR3-06's claim that the base sites a slave market by its S7b claim (read from
§4.5 S7b (3)'s rule for claims larger than a block, not traced for this class); the recommended rules in SR3-01, SR3-02 and
SR3-06 and the new fixtures' bars (V07's to calibrate at V-M2); that no other base stage the village runs "unchanged" (S7,
S7b, S12b – S14) meets a village-only rule the way S2's government step and S11's furniture step do — checked for these two
by reading, not for every paragraph of the others.
