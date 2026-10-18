# Seam critique, reconciliation round 4: settlements (V07 village, V08 SettlementForge, V11 content)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-settlements-r4; covered by the whole-design retrovalidation (J84).

PROGRESS
- §1 Inputs and method | done
- §2 Round-3 re-check (SR3-01..10) | done
- §3 Sweep findings (SR4-nn) | done
- §4 Census: every dossier kind at every size lands in a class row | done
- §5 Summary table and CONFIRMED versus PLAUSIBLE | done

## 1 Inputs and method

**Resumed.** This lane started at 07:42 and was cut with the skeleton only; it resumed at 12:00 under the CONTINUE rule
(lane-events NOTE of that time). By then every round-4 reconcile lane on the seam's files had landed, among them the
continuations of rounds 1–4 re-issued on wider briefs (reconcile-V07-r3/-r4, -V08-r1/-r2/-r3/-r4, -V11-r2/-r3/-r4,
-BASE-F-r1/-r2/-r3/-r4, and `_integrate`'s continuation of 08:13). So this round reads the files as they stand after all
of those, not as they stood at 07:42.

**Inputs** (md5 at the resume, re-checked before §3 and before §5; the base unchanged since round 0):

| file | md5 | lines | state |
|---|---|---|---|
| `docs/volumes/V07-village.md` | a2279e33… | 4 090 | after reconcile-V07-r4's continuation (LANDED 11:38) |
| `docs/volumes/V08-settlementforge.md` | bb42f20b… | 3 681 | after reconcile-V08-r4's continuation (11:54) |
| `docs/volumes/V11-content.md` | 04fb8f43… | 4 904 | after reconcile-V11-r4's continuation (11:54) |
| `docs/volumes/_integrate.md` | 965ab696… | 468 | after `_integrate`'s continuation (08:13) |
| `docs/AMENDMENTS-2026-09-28f.md` | 0da3c86c… | 1 616 | after reconcile-BASE-F-r4's continuation (11:44) |
| `docs/ARCHITECTURE.md` | 01fea21f… | 17 297 | unchanged |
| `docs/volumes/critique/seam-settlements-r3.md` | 9704f41d… | 327 | round 3, re-checked issue by issue (§2) |

**How the seam was read** (J-SR4.1). Round 3's inputs are kept md5-equal in scratch: `rcV7r4/V07-pre-r4.md` fb232447…,
`rcV8r4/V08-pre-r4.md` c30a39c9…, `rcV11r4/V11-pre-reconcile-r4.md` 3679161b…, `rcBFr4/f-pre-r4.md` 38c29d39… and
`integ/pre-cont/_integrate.md` d868438e…. Every byte round 3 read whole or by diff is therefore unchanged except where the
diffs from those copies to the live files show a change. Those diffs were read whole as word diffs (`git diff --no-index
--word-diff=plain --unified=0`, scratch `scratchpad/volumes/ssr4b/wV07.txt` 530 lines, `wV08.txt` 781, `wV11.txt` 670,
`wf.txt` 502, `wint.txt` 125; line diffs `d*.diff` beside them). A word diff shows only the changed words inside each changed
paragraph, so a paragraph rewritten in part is read in full with its changes marked. Then the seam's core sections were
re-read whole in the live text, so that an unchanged passage now contradicted by a changed one is caught. The core
sections are listed in §3's preamble.

**Scripts** (scratch `scratchpad/volumes/ssr4b/`): round 3's `census.py`, re-run on the live V11 with the class-table
window bound to §3.5's section; a scan of every `` `v.` `` id in the volumes against V07's rows; the BCR ids of V07, V08 and
V11 checked against file f with an exact-id regex; and greps named with each finding.

**Severity** as in rounds 0–3. A blocker means the subject cannot be built as written. A major is a contradiction or an
unwired piece a builder would hit. A minor is wording, a pointer, a restated value or a stale record. Each finding names ONE
owning volume (V01…V12, or BASE-F for file f and the integration notes the BASE-F lane keeps) and an exact required change.
A companion change in another volume is its own finding. Ids are **SR4-nn**. `seam-surfaces-r4` numbers its findings
SR4-nn too, as rounds 2 and 3 of the two seams did, so a reconcile lane cites these as "SR4-nn (settlements)".

## 2 Round-3 re-check — every issue, now

Round 3 raised 10 issues (0 blockers, 2 majors, 8 minors). The owning lanes report all of them fixed: reconcile-V07-r4
(SR3-01, -02, -04, -06, -08, -09, -10), reconcile-V11-r4 (SR3-03; SR3-07 settled on the other side) and
reconcile-BASE-F-r4 (SR3-05). Each was re-checked against the live text. **Result: 10 of 10 FIXED; none reopened.** SR3-07
was settled by moving both volumes to V-M0 rather than to V-M1 as round 3 asked (J-V7.120, J-V11.79, with SCC-79). The
disagreement is gone, and round 3's reason for V-M1 (J-SR3.5) is superseded by SCC-79. Three fixes leave a residue
(SR3-01, SR3-02, SR3-05), raised in §3 as new findings (residue column).

| id | owner | status | evidence (live text) | residue |
|---|---|---|---|---|
| SR3-01 | V07 | FIXED | V07 §3.2 (3) *The government step at village rungs* (l. 1347–1359): at `territory` rungs S2 reads the row's `villageSeat` alone. A request government forces nothing and feeds only the `gov` presence conditions. The seat class, the offices' seat classes and the military share are not read. `@office` binds to the `villageSeat` member's building and `priest_resident` to the parish church. A `guard_post` member comes only from a town-watch record or the watchtower's presence row. Also: §3.0's note (l. 1196–1199), §3.11 step 1's `@seat` and `@office` (l. 2177–2179), W18, T-V7-13's four government fixtures (l. 3040–3041), J-V7.117, BCR-V7-36 retitled with part (c) (l. 3596, 3626–3634). V07 places (c) under §10.2's *Government (COV-FTG-B13)*, where the sentence stands (base l. 11546, under `### 10.2`, l. 11467), not under §4.2 as round 3's text had it | file f item 576 still names §4.2 (SR4-03). The seat's member count reads "one member" in three places and "at least one member" in three (SR4-09) |
| SR3-02 | V07 | FIXED | §3.0 (l. 1196–1198) and §3.10 (l. 2056–2066): at `territory` rungs S11's furniture step places no pin, and VS8's rows are the village's whole furniture. The light rows run unchanged. BCR-V7-38 is written at l. 3636–3644 and carried as file f item 579. W25; T-V7-13's "0 pins on it"; T-V7-57 (l. 3084); J-V7.118 | with VS8 now the village's only pin stage, the pin records VS8 never guarantees (SR4-01, SR4-02) |
| SR3-03 | V11 | FIXED | V11 §3.21.1's sentence (l. 3171–3174); W63's consumer adds "S2's government step at the territory rungs, which reads this column alone" (l. 284) | — |
| SR3-04 | V07 | FIXED | §1 (9) reads "all landed" and lists V11's range row (l. 325–333). The pending sentence is gone. §12's round-2 row reads "(all landed since, §1 (9))" (l. 3786) | — |
| SR3-05 | BASE-F | FIXED | Item 310 carries V07's title (l. 331). Item 576 carries SR3-01's title and part (c) (l. 665). Item 579 carries BCR-V7-38, **STAGED (the village product)** (l. 333). BASE-F's census reports 0 uncarried (its round-4 note) | item 576 (c) names §4.2, the pointer round 3's text gave it; V07's lane-events note of 07:31 asked for §10.2, and no BASE-F lane has applied it (SR4-03) |
| SR3-06 | V07 | FIXED | §3.6 (4a): the rim claim applies only to a `market-hall`-family class "whose rows pull it to the market — a `nearMarket` row" (l. 1740–1741). Any other such class (`slave_market`) joins slots up to `A_h`, sited by its own rows (l. 1752–1755). Also §3.8 (l. 1843–1845), VS6's estimate, W65, J-V7.112's amendment, and T-V7-13's coastal `slave_market` fixture | — |
| SR3-07 | V11 | FIXED (settled at V-M0) | V07's V-M0 row ships the `VG` preset file with V11's five entries (l. 3105; J-V7.120). V11 names the milestone by its content in every place: W68 (l. 289), §2.1's `presetsRequired` comment (l. 321), row 73, §3.2.1 step 4, §8, J-V11.74 and J-V11.79 (l. 4027). The two volumes agree | — |
| SR3-08 | V07 | FIXED (at V-M0) | V-M0's content names "V11's five `presets.VG` entries written by V11 §2.2's rule (V11 W68)" (l. 3105). §3.15 cites them beside `web.off` (l. 2565–2567). W67 | — |
| SR3-09 | V07 | FIXED | §3.0's VS4 row reads `roster` (… "the `market-hall`-family members with a `nearMarket` row for the halls' claims, §3.6 (4a)") (l. 1250) | — |
| SR3-10 | V07 | FIXED | "member class" is used in §2.4's range prose (l. 1036–1046, with item 108 (b)'s word once, l. 1041–1042), in the range table's column head (l. 1063) and in §3.11 DR9 (l. 2238). §2.2a's field is renamed `ranges[].member` (l. 693). No "lesser class" remains except that one quotation (grep). V08's and V11's `lesser` fields are the ladder rows' subsumed kinds (V08 l. 682, V11 l. 513), a different thing, and V07 no longer uses the word for them | — |

## 3 Sweep findings

**What was read whole in the live text** (beyond the diffs of §1). V07: §2.1, §2.4 (every table and paragraph), §3.0 (the
stage set, the writer order, the key table), §3.2 (3) and the rest of §3.2, §3.6, §3.10, §3.11 (every DR row, the resolution
order, the absorb half), §3.12 (whole), §3.15, the wiring rows W2, W18, W19, W25, W37, W44, W48, W56, W64–W69 and the dossier
trace, §8's rows, BCR-V7-36 and BCR-V7-38. V08: §2.6 (every row set), §2.6a, §3.5 step 5, §3.5.1, §3.10, §3.11, §4.6's note
table, and §1b's ladder, row-set and custom rows. V11: §3.2 (the compiler, the loader), §3.11's head and the pseudo-class
kinds, §3.12 (whole), §3.13.2's archetype table, §3.21, §3.22, §3.24.0–§3.24.1, the class rows V07 cites (`market_hall`,
`fair_ground`, `slave_market`, `monastery`, `cemetery`, `healer`), and registry rows 17, 61 and 78. Base: §4.7's
*Furniture pins* (l. 5443) and §10.2's *Government (COV-FTG-B13)* (l. 11546, under `### 10.2`, l. 11467), located by grep.
V06 §3.2's phase table and §3.16's stage ids were read for the epoch readings. Each finding cites its evidence where it
is stated.

Each finding gives its **id** · severity · kind · **owner**, then the claim with its evidence, then the exact required
change. The major comes first.

### Major

**SR4-01** · major · unwired across the seam · **V07** — Pin records at a village rung bind to pins that VS8 lays only
by chance, or never. At a village rung, a `@pin:<kind>` record "binds to VS8's pins" (V07 §3.10, l. 2061–2062; §3.11 step 1,
l. 2178). Three records at the village rungs need a pin that no village rule guarantees:
* **`wayside_shrine`** (tiers T, H → `@pin:shrine`, V11 l. 2309). VS8's shrine row is "a **shrine** at the perimeter on a
  road (0.3; a dossier's Roadside Shrine forces it)" (V07 l. 2051–2052). "Roadside Shrine" is the quarter phrase (DR5,
  l. 2148–2149), not this institution record. So a thorp or hamlet with a `Wayside shrine` record and no Roadside Shrine
  quarter has no shrine pin 70 % of the time, and the record binds to nothing.
* **A custom record of archetype `mercantile-market`.** Its village cell is "pin `@pin:market_cross`, with V07 §3.10's
  stalls on the green" (V11 §3.13.2, l. 2507), and V07 §2.4 says "its `market_cross` pin stands there with VS8's stalls"
  (l. 992–994). No VS8 row lays a `market_cross`: the centrepiece options are well, large tree, pond, cross or none (§2.2
  `open.centrepiece`, l. 558, 625; §3.6 (5), l. 1766–1769), and §3.10 lists no market cross. The base's S11 furniture
  step, whose main-plaza centrepiece could be a market cross (0.1), places nothing at `territory` rungs since this round's
  BCR-V7-38 (V07 l. 2056–2062). Nothing produces the pin.
* **A custom record of archetype `sacred-shrine`** (village cell "pin `@pin:shrine`", V11 l. 2510) has the same 0.3 as the
  shrine row.

The ladder reading has the same gap. A wayside shrine merged into a parish church (REPLACEMENT, V11 §3.12's
`parish_church` row, l. 2344: "the shrine's pin kept as the churchyard cross") "binds the churchyard's `cross` pin" (V07
§2.4, l. 1053). No VS8 row lays a cross in a churchyard; §3.10's `cross` stands "at a crossroads inside the perimeter
(0.4)". W25's dossier column names only `Common well`, Roadside Shrine and DR11 (l. 382). T-V7-13 asks every institution
record to be "placed or bound by §3.11's resolution order" (l. 3040), and these records fail it by chance or always.

**Required change:** V07 §3.10's VS8 paragraph adds one rule after the troughs: "**A pin record forces its pin.** A
`@pin:<kind>` record (V11 §3.11) whose kind no standing pin of the village holds within its site's reach is given one pin
of that kind in VS8's batch, on `pin.decor` keyed by the record's binding key, and binds to it. A `shrine` is placed as
the shrine row places it (at the perimeter on a road). A `market_cross` stands at the centre of the open space that
carries the market, replacing the drawn centrepiece there; with no open space it stands on the through road's frontage
nearest the heart, beside the street market's stalls (§3.12 (d)). A `well` record binds to the coverage wells, as
`multiple_water_sources` does (§2.4). The churchyard `cross` of a wayside shrine merged into a parish church (§2.4's
REPLACEMENT row) is laid in the parish church's `churchyard` part, the one nearest the church's door. The same rule runs
in the phase that brings a record at a village epoch (§3.12)." W25's producer and dossier columns name the records
(`wayside_shrine`, `water_source`, `multiple_water_sources`, and the `mercantile-market` and `sacred-shrine` archetype cells).
Add a J-V7 row. T-V7-13 gains: "a thorp fixture with a `Wayside shrine` record and no Roadside Shrine quarter stands one
`shrine` pin bound to that record; a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record to a
`cross` pin inside the churchyard". T-V7-21 gains: "a `mercantile-market` custom record at VILLAGE binds a `market_cross` at
the centre of the market's open space". (V11's companion: SR4-02. V08's, on the binding target: SR4-06.)

### Minors

**SR4-02** · minor · companion, stale scope · **V11** — (a) V11 §3.11 defines `@pin:<kind>` as "the pins of §4.7's
furniture step — wells, shrines — whose coverage rows hold" (l. 2014–2015). At the `territory` rungs that step places
nothing (BCR-V7-38, file f item 579), and a village's pins are VS8's (V07 §3.10), whose shrine row is a chance, not a
coverage row. (b) The `parish_church` row's reading, "the shrine's pin kept as the churchyard cross" (l. 2344), names no
producer at a base rung. The base's furniture step lays no churchyard cross, and V08 §3.5.1 (c) aliases a REPLACEMENT
lesser to the greater's building (SR4-06). **Required change:** (a) the definition adds "— at a village rung VS8's pins,
a record forcing its pin where none stands (V07 §3.10; SR4-01), since §4.7's furniture step places none at the
`territory` rungs (BCR-V7-38)". (b) The row's reading adds "(at a village rung VS8 lays the cross and the shrine record
binds it, V07 §3.10; at a base rung the shrine record's key aliases the church, V08 §3.5.1 (c))".

**SR4-03** · minor · stale pointer · **BASE-F** — File f item 576 (c) reads "on §4.2's S2 *Government* sentence" and "Also
touches: §2.5 (part (b)), §4.2 (S2's *Government* sentence; part (c))" (l. 665). The quoted sentence stands under
`### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)`, in its *Government (COV-FTG-B13)*
paragraph (base l. 11546; the heading at l. 11467). §4.2 S2's institution list only cites it. V07's BCR-V7-36 (c) names
§10.2's heading (V07 l. 3626–3634). V07's lane-events note of 07:31 asked for the change, and no BASE-F lane has applied
it: the continuation of 11:44 re-verified 576's title and part (c) as they stood. The slip was round 3's own: SR3-01's and
SR3-05's text named §4.2. **Required change:** item 576's part (c) reads "(c) on §10.2's *Government (COV-FTG-B13)*
sentence, the paragraph under (a)'s heading (…)". Its *Also touches* reads "§2.5 (part (b))", and part (c) is noted "in
§10.2 with (a); §4.2 S2's citation of the sentence unchanged".

**SR4-04** · minor · companion, stale record · **V07** — V07 §1's dependency (10) holds "Pending, with its fallback: file f
— item 576 (c) points at §10.2's *Government* sentence … *fallback*: the quote occurs once in the base" (l. 342–344).
**Required change:** once SR4-03 lands, (10) reads "file f — landed: item
576 (c) on §10.2's *Government* sentence (SR4-03)", and the fallback is withdrawn. §12's round-4 PLAUSIBLE line, "that V06,
V11, V12 and file f land the companions of §1's dependency (10) as read" (l. 3799), is moved to CONFIRMED for file f.

**SR4-05** · minor · stale summary against its request · **BASE-F** — File f item 581's note reads "§7.6's per-preset
sentence names the tables each parity preset resolves (`MFCG` and `FTG` every table; `VG` only the tables a stage of the
village product reads, volume 11 §3.2.1 step 4)" (l. 518). BCR-V11-31 was amended by V11's round-4 continuation
(SCC-R3C-15; J-V11.91; V11 §10, l. 4285–4298). It now requires a `VG` entry on the village-read tables and resolves every
other table under `VG` by §7.6's order, a categorical cell to its `MFCG` entry. V11 §3.2.2 does the same: "the preset step
resolves every table". The item says the opposite ("only"). V11's lane-events notes of 11:44 and 11:52 gave the text,
after the BASE-F continuation's landing had already been written. V07 is on the item's *Needed by*: its §3.15 and W67 read
the loader under `VG`. **Required change:** item 581's title parenthesis adds "amended in its continuation, SCC-R3C-15;
J-V11.91". Its note reads "§7.6's per-preset sentence names the tables each parity preset requires an entry on (`MFCG`
and `FTG` every table; `VG` the tables a stage of the village product reads, volume 11 §3.2.1 step 4); under `VG` every
other table resolves by §7.6's order, a categorical cell by its `MFCG` entry (SCC-R3C-15)". The rest stands.

**SR4-06** · minor · contradiction · **V08** — The key a REPLACEMENT lesser binds. V08 §3.5.1 (c): the lesser's "binding
key becomes an alias row on the greater's member #1 (for SIZE and REPLACEMENT, the greater's building)" (l. 1636–1638). For
the one REPLACEMENT pair whose lesser is a pin record — `parish_church` over `wayside_shrine` (`@pin:shrine`) — V11 §3.12
keeps "the shrine's pin … as the churchyard cross" (l. 2344), and V07 §2.4 has "the shrine record binds the churchyard's
`cross` pin instead" (l. 1053). A builder of the merge meets two targets for one key: the church building, or the cross.
**Required change:** V08 §3.5.1 (c) adds, after "the greater's building": "— save a lesser that is a pin record, which
V11 §3.12's row keeps as a pin of the greater's plot: `parish_church` over `wayside_shrine` binds the shrine's key to the
churchyard `cross` pin, laid by VS8 at a village rung (V07 §2.4, §3.10; seam-settlements-r4 SR4-01), while at a base
rung, where no churchyard cross is laid, it aliases the church building as above". T-V8-46's VH clauses gain the
hamlet fixture of SR4-01.

**SR4-07** · minor · wrong words at the seam · **V08** — The `class` a note names at a village rung. V08 §4.6's
`unmapped_kind` row reads "{name} is a kind the map does not know yet, so it is built as a {class}", with `class` "the
class's display label" (l. 2317). The port fills it at digest from DR24's chain: the tags rung's generic class, else the
category's (V08 §3.5 step 5 (d)–(e), l. 1501–1506). At a village rung such a kind "takes the tag fallback" (V07 §3.11
step 4, l. 2190–2200): `lodging` → `v.inn` or `v.alehouse`, `civic` → `v.reeve_house`, and so on, some of them by the
site (a through road) or by the population (400 people). So the note names a generic class the map does not build.
`custom_resolved` ("{name} is built as a {class} ({rung})", l. 2339) has the same gap: at a village rung the archetype's
`village` cell comes before the resolved class (V07 §2.4; V11 §3.13.2), and a `mercantile-market` record is built as a
market cross and the open space's market, not as a `market_hall`. **Required change:** both rows' `class` arg reads "the
class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (the
`villageForm`, the archetype's `village` cell, or the tag fallback), or the pin kind its cell names — read after the
fold". `unmapped_kind` is written, as `custom_resolved` already is, after creation's `generate` or the absorb's dry run
(V08 §3.3), so its args hold the built class. T-V8-46's VH clauses gain a hamlet fixture with an unmapped `lodging` kind
whose note names `v.alehouse`. (V07's companion: SR4-08.)

**SR4-08** · minor · companion, unnamed report · **V07** — V07 §3.11 step 4 reads "only a kind that fell to V11's
`generic-<family>` class (reported `unmapped_kind`) takes the tag fallback (our rows), reported" (l. 2190–2191). The
second "reported" names no record. §4.6's note kinds and V07's warning codes hold no fallback report, and W19's consumer
column reads "the report (`unmapped_kind` through the fallback)" (l. 376). **Required change:** step 4 reads "… takes the
tag fallback (our rows); the port's one `unmapped_kind` note names the class the fallback gives (V08 §4.6; SR4-07), and
no second report is written". W19 cites the same.

**SR4-09** · minor · term disagreement · **V07** — The size of a forced seat. §2.4's *Forced seats* read "present with
**at least one** member at every village rung, whatever its presence entries" (l. 937–938), as BCR-V7-36 (a) and (c) do
(l. 3605, 3630). §3.2 (3)'s new government step (l. 1349), DR11 (l. 2217–2218) and J-V7.104 (l. 3291) read "present with
**one** member". The presence column still adds per-capita and `perOther` members after the drawn ones (l. 920–922). A
`v.parsonage` forced by an `ecclesiastical` government in a village whose COUNT record stands two parish churches takes
two by `×1 v.parish_church`. A builder who reads "one member" as "exactly one" clamps them. **Required change:** l. 1349,
l. 2217 and J-V7.104 read "present with at least one member (§2.4's forced seats)". J-V7.104's decision text is amended in
place with a round note.

**SR4-10** · minor · undefined reference · **V07** — V07 §3.11 step 4's tag fallback maps `healing` to "a `v.cottage` with
the healer specialisation" (l. 2196). No volume defines a healer specialisation. `v.cottage` has no specialisation column
(§2.4, l. 845), and V11's specialisations are the culture rows `stepped_temple`, `terraced_palace` and `tiered_tower`
(V11 §3.24.3). V11 does hold a `healer` class, family `healing`, template `dwelling-row` (V11 l. 1432). **Required
change:** the entry reads "`healing` → V11's `healer` class, playing itself on a toft slot (its `dwelling-row` template read
as §2.4's dwelling plot)".

**SR4-11** · minor · one name for two cells · **V07** — V07 §3.15 names two switches `terrace.enabled` five lines apart.
The first is "V11's `terrace.enabled` false", one of V11's five `presets.VG` entries (l. 2566). The second is "no platform
levelling (`terrace.enabled` false)" (l. 2570). That second one is this volume's own `village.json` cell,
`rules.terrace.enabled` (§2.2a, l. 700 and 738), which gates the village's levelling (§3.8a, l. 1892). V11's switch is the
`enabled` column of V11 §3.24.1's TOWN, CITY and METROPOLIS rows (V11 l. 3383–3390). The village reads only that table's
`slopeMin`, `stepMinCm`, `stepMaxCm` and `minTerraceDepthM`, by reference, never its `enabled`. No sentence says which switch
gates a village, so a builder could gate village levelling on both, or on V11's. **Required change:** l. 2570 reads "(this
volume's `rules.terrace.enabled` false, §2.2a)". §2.2a's `terrace` row adds "`enabled` is this volume's switch for the
village rungs; V11 §3.24.1's `enabled` column (the TOWN–METROPOLIS rows' switch, with its own `presets.VG` entry) is not read
at a village rung".

**SR4-12** · minor · incomplete wiring row · **V08** — V08 §1b's row for `DossierInstitution.step`, `.lesser`,
`.popQualifier` and the ladder merge names as consumers "DR9's member counts; V01's quarter records; V06's ladder steps;
V10's members answer; the count parity" (l. 304). It leaves out the village readings that V08's own text routes to V07:
the unnumbered range rows (V08 §3.5.1 (b): "V07 §2.4's range row for its step type and member class") and the QUARTER
record's end claim (§2.6's `distribution` row: "at a village rung, V07 §3.10's end claim", l. 817). **Required change:**
the consumer cell adds "at village rungs V07's readings — §2.4's range rows (`rules.ladders.ranges`), DR9's members and
§3.10's QUARTER end claim".

## 4 Census: every dossier kind at every size lands in a class row

**(A) Kinds to class rows.** Round 3's `census.py` was re-run on the live V11, with the class-table window bound to §3.5's
section (scratch `ssr4b/census.py`). Its `census.out` is byte-identical to rounds 2 and 3 (md5 00d6640f…): 280 kinds;
tiers T, H and V carry 97 and tier W 85, six in both, so **176** reach a village rung at birth. At a village rung **34**
of them go to a pseudo-class, **31** to a class with a village form (V11 §3.22's 32 entries onto 21 of V07's `v.` rows),
**111** to a class that plays itself, and **0** to the tag fallback. A second pass over **all 280** kinds
(`census-all.out`) covers the 104 kinds of tiers C and M, which reach a village rung only after a hand-down (a shrunk city
keeps its records, or its dossier adds one). All of them land too: 41 pseudo, 39 village form, 200 own row, 0 missing. So
every kind at every size lands in a class row.

Every `` `v.` `` id in the twelve volumes, `_integrate.md` and file f is one of V07's 25 rows (script `vids.out`: V02, V03,
V07 and V11 use all 25; V04, V06, V08, file f and `_integrate.md` use one to five; V01, V05, V09, V10 and V12 use none).

What remains is not a kind's landing but its binding: the pin-class records (`@pin:shrine` of `wayside_shrine`, and the
`mercantile-market` and `sacred-shrine` archetype cells) find no guaranteed pin at a village rung (SR4-01, SR4-02).

**(B) The small-settlement hand-off.**

| check | round 4 reading | verdict |
|---|---|---|
| registration | one `ProductDecl` (V07 §2.1; file f item 202); V08 §3.10 consults `LadderRouter`; V07 V-M2 and V08's VH row say so | holds |
| the band and the epoch's product | V07 §2.1's fold = V08 §3.10 = file f items 322 and 317; unchanged | holds |
| the floor | creation below 1 refused; 0 at an absorb → THORP and desertion (V07 §2.1; V08 §3.6 (7), §3.9 B7's three `E_RUNG_UNAVAILABLE` cases; item 202) | holds; V08's new `.village`, `.cap` and `.empty` rows match V07's floor and ceiling |
| the participants across the hand-off | `village.plan` `stage: 'VS1'`, `village.density` `stage: 'VS2'` (V07 §2.1, §3.12; V6 §3.16; V11 row 61 and §3.1's *Readers*) | holds |
| burial records | `churchyard` on the church families, `burial` on the cloister and burial ground; `parish_burial_grounds` a COUNT over the churchyards (V11 §3.12; V08 §2.6a (3)–(4); V07 DR9) | holds |
| `@absent` at a village rung | V07 §3.11 step 1, V11 §3.11, V08 §2.6 and §2.6a (3), T-V8-46 at VH | holds |
| seats | forced by DR11 through `villageSeat`, standing where `@absent:` zeroes its partner; the government step reads `villageSeat` alone at the `territory` rungs (V07 §3.2 (3), V11 §3.21.1, BCR-V7-36 (c)) | holds; "one" versus "at least one" member (SR4-09); item 576 (c)'s section (SR4-03) |
| furniture | VS8's rows the village's whole furniture; S11's furniture step places none (BCR-V7-38 = item 579; T-V7-57) | holds; the pin records' pins (SR4-01) |
| markets and harbours, at creation and over epochs | `dist.market` and `dist.harbour` (BCR-V7-36 (b)); the fair field; the halls' claims by `nearMarket` (SR3-06 fixed); §3.12's *Markets, halls and the fair over epochs* over V6 §3.9.6 | holds |
| claim-sized classes | `rules.claimArea` for `cloister` and `market-hall`, and at epochs through V6 §3.9.6 | holds |
| derived land uses | V08's `res:derived:<k>`; V07 §3.9 reads it unchanged (T-V8-18's VH clause) | holds |
| the `VG` preset | the file, V11's five entries and every village-read `presetsRequired` cell's entry at V-M0 (V07 §3.15, §8; V11 §8, W68, W70); `productStages.village`, `villageRead` and `villagePresetCells` wired both ways; the loader resolves every table under `VG`, a categorical cell of a non-village-read table by its `MFCG` entry (V11 §3.2.2, J-V11.91) | holds in V07 and V11; file f item 581's summary stale (SR4-05) |
| the notes the host shows for a village | V08 §4.6's table; `unmapped_kind`'s and `custom_resolved`'s `class` at a village rung | wrong words (SR4-07, SR4-08) |

**(C) The ladders meeting.** The name grammar and the four qualifiers agree (V08 §3.5.1 (a), V07 §3.11). The step types
agree (V11 §3.12, V07 §2.4's differing readings, each checked against V11's rows). Unnumbered ranges: all three volumes
read V07's row by step type and member class, the qualifier as its label — V08 §3.5.1 (b), V11 §3.12, V07 §2.4 with the
field `ranges[].member` (SR3-10 fixed). Every row set involved is `calibratable: false`: V07's ranges (J-V7.114), V11's
ladder rows, and V08's row sets (J-V8.107). No double counting: V08 §3.5.1 (c), V11 §3.12 and V07 (§2.4, DR9, T-V7-35)
bind a GUILD hall by the `categories` family, and V08's new `count_over_range` note covers a COUNT record the GUILD records
push past its top, which V07's DR9 reaches by citing V08 §3.5.1 (c). One disagreement is left: the key a REPLACEMENT
lesser binds when it is a pin record (SR4-06).

**(D) Records, ids, terms, units and base change requests across the seam.**

| subject | V07 | V08 | V11 | verdict |
|---|---|---|---|---|
| village class keys | `v.<id>`, 25 typed rows | five `v.` ids, all V07's | `v.` namespace; `villageForm` → `v.` only | agreed |
| the government row at a village rung | `villageSeat` alone (§3.2 (3)) | `government` names → kinds | the sentence under §3.21.1; W63 | agreed (SR3-01, SR3-03 fixed) |
| furniture | VS8 whole; BCR-V7-38 | — | `@pin` defined by §4.7's step | V11's definition stale (SR4-02) |
| range-row key | step type and member class; `ranges[].member` | "for its step type and member class" | "the class that plays the member class" | agreed (SR3-10 fixed) |
| the `VG` preset's milestone | V-M0 (J-V7.120) | — | V-M0, named by content (J-V11.79) | agreed (SR3-07 settled) |
| `terrace.enabled` | its own `rules.terrace.enabled` and V11's, both named in §3.15 | — | the TOWN–METROPOLIS rows' switch | one name for two cells (SR4-11) |
| dossier row sets | read (DR1, DR2, DR11, DR19) | every cell `calibratable: false`; `customWeights` new | row 63 lists `customWeights`; rows 63–66 non-calibratable | agreed |
| the digest's deposit field | `site.deposits` (J-VI.25) | `site.deposits` | — | agreed (`_integrate` J-VI.25) |
| file f | BCR-V7-1 – -38 carried (38; exact-id script) | BCR-V8-1 – -32 carried | BCR-V11-1 – -31 carried | carried; items 576 (c) and 581 stale (SR4-03, SR4-05) |
| `_integrate.md` | IN-V07-6, -7 | — | IN-V11-8 – -10 | agreed |

## 5 Summary, decisions, CONFIRMED versus PLAUSIBLE

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V07 | 0 | 1 (SR4-01) | 5 (SR4-04, -08, -09, -10, -11) | 6 |
| V08 | 0 | 0 | 3 (SR4-06, -07, -12) | 3 |
| V11 | 0 | 0 | 1 (SR4-02) | 1 |
| BASE-F | 0 | 0 | 2 (SR4-03, -05) | 2 |
| **total** | **0** | **1** | **11** | **12** (SR4-01 – SR4-12) |

**Round 3's 10:** all FIXED where round 3 said (§2), and none reopened. SR3-07 was settled at V-M0 in both volumes rather
than at V-M1. The seam's census holds: 176 kinds reach a village rung at birth and all 280 land at every size. The three
volumes agree on the class keys, the government step, the furniture stage, the four context readings, the claim-sized
plots, the markets over epochs, the range-row key and field, the GUILD hall, the `VG` preset's milestone and scope, the
dossier row sets' flag and the digest's field names. What round 4 finds is mostly at the edges of this round's repairs.
SR3-02 made VS8 the village's only pin stage, which exposes the pin records that VS8 never guarantees (SR4-01, SR4-02).
SR3-05 carried round 3's own section slip into file f (SR4-03, SR4-04). V11's continuation amended a request after file f's
continuation had landed (SR4-05). V08's new note table names classes that a village does not build (SR4-07, SR4-08). Four
older minors were found by re-reading unchanged text: SR4-06, SR4-09, SR4-10 and SR4-12.

**Order of work.** V07's SR4-01 comes first, with V11's SR4-02 and V08's SR4-06, which cite it. Then V08's SR4-07 with
V07's SR4-08. BASE-F's SR4-03 and SR4-05 go in one pass, then V07's SR4-04, which follows SR4-03. Then V07's SR4-09 –
SR4-11 and V08's SR4-12.

**J-SR4 rows (this lane's own calls, vetoable).**
* **J-SR4.1** — Read the five seam files as word diffs against round 3's inputs (the kept copies, md5-equal), plus the
  seam's core sections re-read whole in the live text, over re-reading about 1.9 MB whole. Rounds 0–3 read every
  unchanged byte, and the diffs show every changed word inside its paragraph. The risk left is an unchanged passage that
  a changed one now contradicts, and that is what the core-section re-read and the greps look for. Four of this round's
  findings sit in unchanged text (SR4-06, -09, -10, -12). Every earlier round read those sections too, so they are older
  misses, now found.
* **J-SR4.2** — Resumed on the live files, not on the 07:42 snapshot of the cut run. The brief asks whether each round-3
  issue "must now be fixed", and the reconcile lanes' continuations landed after 07:42.
* **J-SR4.3** — Rated SR4-01 major. A builder of VS8 from V07 §3.10 lays no market cross and lays a shrine only by
  chance, so records the dossier names bind to nothing, against T-V7-13's "placed or bound". Gave the forcing rule as the
  recommended decision (the shrine row's own placement, a market cross at the market's centre, the churchyard cross by the
  church door). Each is V07's to veto. On realism: a village market cross stood in the market place, and a wayside cross
  taken into a churchyard stood there as its cross.
* **J-SR4.4** — Rated SR4-05 minor although item 581's note states the opposite rule. A file f item summarises, and the
  coherence pass applies the request's exact text, which is V11 §10's amended one (file f's header: "with its exact text;
  it is not repeated here").
* **J-SR4.5** — Gave SR4-06 to V08, the owner of the general merge rule, as an exception for pin lessers. The alternative
  was bending V11's and V07's shrine reading to V08's alias. The exception keeps the record's key on the object it names,
  and it leaves a base rung, where no churchyard cross is laid, on the general rule.
* **J-SR4.6** — Gave SR4-07 to V08 with "the class that builds the record at the document's rung". The alternative was to
  reword the notes so they name no class. Naming the built class is what the note promises its reader, and
  `custom_resolved` is already written after the fold, where that class is known.
* **J-SR4.7** — Counted SR3-07 FIXED although it was settled against round 3's required change. The defect was the
  disagreement, which is gone. SCC-79's reason (V-M0's exit already runs under `VG`) outranks round 3's (V-M1's content
  row).

**CONFIRMED (read or executed in this lane).**
* The inputs' md5s at the resume, before §3, before §4 and before this section (§1).
* Round 3's inputs kept md5-equal in scratch.
* The five word diffs read whole.
* Every quotation checked at its line in the live file.
* The base's *Government (COV-FTG-B13)* paragraph at l. 11546 under `### 10.2`, and *Furniture pins* at l. 5443 under
  `### 4.7` (grep with section search).
* The census by script: 280 kinds; 176 reach a village rung, 34 / 31 / 111 / 0; all 280 land, 41 / 39 / 200 / 0.
  `census.out` is byte-identical to rounds 2 and 3.
* Every `v.` id in fourteen files is one of V07's 25 rows (script).
* Every BCR-V7 (38), BCR-V8 (32) and BCR-V11 (31) heading id is carried in file f (exact-id script).
* That no VS8 row lays a `market_cross` or a churchyard cross, and that the shrine row is a 0.3 chance forced only by the
  Roadside Shrine quarter (V07 §2.2, §3.6 (5), §3.10, W25, read and grepped).
* V11's pseudo-class kinds reaching a village rung (`census.out`'s list), the archetype village cells, and the
  `parish_church` REPLACEMENT row.
* V08 §3.5.1 (c)'s alias rule, and §4.6's `unmapped_kind` and `custom_resolved` rows with §3.5 step 5's digest-time class.
* V07's three "one member" and three "at least one member" sentences (grep).
* The `healer` references in the three volumes (grep).
* The two `terrace.enabled` cells: V07 §2.2a and §3.8a, V11 §3.24.0–§3.24.1.
* File f items 576 and 581 as they stand, and V11's BCR-V11-31 as amended.

**PLAUSIBLE (reasoning).**
* How often SR4-01's gap shows: the co-occurrence of a `Wayside shrine` record without a Roadside Shrine quarter in real
  small dossiers was not counted over the 35 births. The chance and the missing rows are read, not executed.
* SR4-01's placement choices and SR4-06's exception, as recommended decisions.
* The consequence in SR4-07, that a village's history panel shows a class the map does not build. This is read from V08's
  digest order and V07's fallback, not traced in code.
* That the epoch-time market placements of V07 §3.12 (a) and (b) record their `village.json` reads under stage ids that
  registry row 61 lists. The `dossier` step (V6 §3.2 row 12) has no `EVO_*` id of its own (V6 §3.16), and V07 names none
  for those reads. Read as V11's *Readers* rule has it (the step running VS5's and VS4's code under those ids, which row 61
  lists), there is no gap; if T-V11-1 (b)'s recorded reads tag them otherwise, the seat landing V-M3 writes that id into
  row 61 by V11 §8's writer rule.
* That no other base stage the village runs "unchanged" meets a village-only rule the way S2's government step and S11's
  furniture step did (rounds 3–4). This round did not re-read the base's S7, S7b and S12a–S14 paragraphs against V07's
  village rules; the claim rests on rounds 3–4 and on V07 §3.0's list.
