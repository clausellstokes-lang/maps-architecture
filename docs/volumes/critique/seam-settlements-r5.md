# Seam critique, reconciliation round 5: settlements (V07 village, V08 SettlementForge, V11 content)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-settlements-r5; covered by the whole-design retrovalidation (J84).

PROGRESS
- §1 Inputs and method | done
- §2 Round-4 re-check (SR4-01..12) | done
- §3 Sweep findings (SR5-nn) | done
- §4 Census: every dossier kind at every size lands in a class row | done
- §5 Summary table and CONFIRMED versus PLAUSIBLE | done

## 1 Inputs and method

**Inputs** (md5 at the start, 13:14, re-checked before §3 and before §5; the base unchanged since round 0):

| file | md5 | lines | state |
|---|---|---|---|
| `docs/volumes/V07-village.md` | 75393e28… | 4 331 | after reconcile-V07-r5 (LANDED 13:07; its shared-file edit of V06 included) |
| `docs/volumes/V08-settlementforge.md` | 8be737e0… | 3 745 | after reconcile-V08-r5 (LANDED 12:49) |
| `docs/volumes/V11-content.md` | 08213668… | 4 972 | after reconcile-V11-r5 (LANDED 12:51) |
| `docs/volumes/_integrate.md` | 965ab696… | 468 | unchanged since round 4 |
| `docs/AMENDMENTS-2026-09-28f.md` | e4c1756e… | 1 709 | after reconcile-BASE-F-r5 (LANDED 12:39) |
| `docs/ARCHITECTURE.md` | 01fea21f… | 17 297 | unchanged |
| `docs/volumes/critique/seam-settlements-r4.md` | 3290556d… | 381 | round 4, re-checked issue by issue (§2) |

**How the seam was read** (J-SR5.1). Round 4's inputs are kept md5-equal in scratch (`scratchpad/volumes/ssr4b/*-in.md`:
V07 a2279e33…, V08 bb42f20b…, V11 04fb8f43…, file f 0da3c86c…, `_integrate` 965ab696…). The diffs from those copies to
the live files were read whole as word diffs (`git diff --no-index --word-diff=plain --unified=0`; scratch
`scratchpad/volumes/ssr5/wV07.txt` 376 lines, `wV08.txt` 97, `wV11.txt` 105, `wf.txt` 115; `_integrate.md` unchanged).
Then the sections those diffs touch were re-read whole in the live text, with the unchanged passages they now meet:
V07 §1's dependencies (10)–(12), §2.1's `ProductDecl`, §2.4 (the pins paragraph, the archetype paragraph, the third
table), §2.6's new rows, §3.0's key table, §3.10 whole, §3.11 whole (DR rows, the four-step resolution order, the absorb
half), §3.12 from *Which path runs* to *Pins over epochs*, §3.14, §8's milestone table, W19, W25, W28, W65, W66,
W70–W73, T-V7-13, T-V7-21, T-V7-57, J-V7.104, J-V7.125–J-V7.128 and BCR-V7-18; V08 §1b's ladder and `PortNote` rows,
§3.5 step 5, §3.5.1 (a)–(e) whole, §3.6 steps 4–7, §4.6's `unmapped_kind` and `custom_resolved` rows, T-V8-46, J-V8.111,
J-V8.112, §12's round-5 paragraph and §13's X22; V11 §2.3's `BuildingClassRow` additions, §3.1 rows 17 and 61, §3.11's
pseudo-classes, §3.12's COUNT-pin rule and ladder rows, §3.13.2's `village` cells, §3.20.5's slices and §12's round-5
paragraph; file f items 202, 317, 322, 516, 576, 579 and 581. Outside the three volumes, read for what the seam's texts
cite: the base's §7.7 (*One path — placement, then mutation*, the dossier contract's items 1–2), §4.7 S10b's
closest-option sentence, §4.11 *Dossier content across epochs*, §9.5 and §10.2's `BuildingClassRow`; V6 §2.1's
`ProductDeclEpoch` and `EpochPlacement`, §3.2's step table, BCR-V6-1 and the addendum volume 7's lane wrote; V09's
BCR-V9-8, §3.3's roster reader (step 3) and §4.2's T6 row. The round-5 checks of the neighbouring seams that were written
while this one ran (`seam-time-r5.md`, TW-01 – TW-09; `seam-surfaces-r5.md`, partial) were read so that no finding here
repeats or contradicts one there: where a subject is theirs, this round adds only the settlements side (§3's preamble).

**Scripts** (scratch `scratchpad/volumes/ssr5/`): round 4's `census.py`, re-pointed at the live V11 (`census.out`), and a
second pass over all 280 kinds (`census_all.py`); a scan of every `` `v.` `` id in the twelve volumes, `_integrate.md` and
file f against V07's 25 rows; the BCR ids of V07, V08 and V11 checked against file f with an exact-id regex; the
`@pin:` kinds across the three volumes; and greps named with each finding.

**Severity** as in rounds 0–4: a blocker means the subject cannot be built as written; a major is a contradiction or an
unwired piece a builder would hit; a minor is wording, a pointer, a restated value or a stale record. Each finding names
ONE owning volume (V01…V12, or BASE-F for file f) and an exact required change; a companion change in another volume is
its own finding. Ids are **SR5-nn**; the surfaces seam numbers its findings SR5-nn too, so a reconcile lane cites these as
"SR5-nn (settlements)".

## 2 Round-4 re-check — every issue, now

Round 4 raised 12 issues (0 blockers, 1 major, 11 minors). Their owning lanes report all of them fixed: reconcile-V07-r5
(SR4-01, -04, -08 – -11), reconcile-V08-r5 (SR4-06, -07, -12), reconcile-V11-r5 (SR4-02) and reconcile-BASE-F-r5 (SR4-03,
-05). Each was re-checked against the live text. **Result: 12 of 12 FIXED; none reopened.** Three fixes leave a residue,
raised in §3 as new findings (residue column): SR4-01/-06's pin lesser is bound at a pair's first reading but not when the
pair arrives over time; SR4-07's note now names a class whose words no table holds; SR4-06's companion record in V08 (X22)
and SR4-02's in V11 (§12) still read the sibling lanes as open.

| id | owner | status | evidence (live text) | residue |
|---|---|---|---|---|
| SR4-01 | V07 | FIXED | §3.10 *A pin record forces its pin* (l. 2111–2124): an unbound standing pin of the record's kind within `presence.siteReachM` bound nearest the heart first, else one pin forced on `pin.decor` keyed by the binding key — the shrine by the shrine row's siting, the `market_cross` at the centre of the reservation carrying the market, a `well` record bound to the coverage wells, the merged shrine's `cross` in the `churchyard` part nearest the door; "the same rule runs in `village.records`". Also §2.2a's `presence` row (l. 774), §2.4's pins paragraph (l. 997–999), REPLACEMENT row (l. 1103) and `mercantile-market` sentence (l. 1043–1044), §3.11 step 1 (l. 2248), *Records at a village epoch* item 3 (l. 2478–2479), W25 (l. 408), V07 §5.1's glyphs (l. 3080–3081), T-V7-13's three clauses and T-V7-21's (l. 3204, 3212), J-V7.127 (l. 3478). The `@pin:` kinds in the three volumes are `shrine`, `well` and `market_cross` only (grep), all covered | the pair `wayside_shrine` (T, H) / `parish_church` (V) reaches a map chiefly by promotion over time, where no rule lays the cross and V08's (d) re-keys the shrine as the church (SR5-01, SR5-02) |
| SR4-02 | V11 | FIXED | §3.11's `@pin:<kind>` (l. 2030–2033): "at the base rungs; at a village rung VS8's pins, a record forcing its pin where none stands (V07 §3.10; SR4-01) …"; §3.12's `parish_church` row (l. 2362) names both producers | the row's "VS8 lays the cross" names one of the rule's runners (SR5-11); §12's round-5 PLAUSIBLE still reads V07 as open (SR5-09) |
| SR4-03 | BASE-F | FIXED | item 576 (c) (l. 666): "on §10.2's *Government (COV-FTG-B13)* sentence, the paragraph under (a)'s heading"; *Also touches* "§2.5 (part (b)); part (c) is in §10.2 with (a), §4.2 S2's citation of the sentence unchanged (seam SR4-03 …)" | — |
| SR4-04 | V07 | FIXED | §1 (10) (l. 354–356): "File f — landed: item 576 (c) on §10.2's *Government (COV-FTG-B13)* sentence … its fallback is withdrawn (reconciliation round 5, SR4-04)"; §12's round-4 line (l. 3989–3990) drops file f, with the round-5 CONFIRMED bullet | — |
| SR4-05 | BASE-F | FIXED | item 581 (l. 519): title "amended in V11's round-4 continuation, SCC-R3C-15; J-V11.91"; note "requires an entry on … `VG` on the tables a stage of the village product reads … Under `VG` every other table resolves by §7.6's order … a categorical `option` cell … to its `MFCG` entry"; the round-4 clause withdrawn; *Needed by* names V07's readers | — |
| SR4-06 | V08 | FIXED | §3.5.1 (c) (l. 1644–1649): "save a lesser that is a pin record … binds the shrine's key to the churchyard `cross` pin … while at a base rung … it aliases the church building …; the target is chosen where the merge is first read … and kept across a later rung change"; J-V8.111 (l. 2833); T-V8-46's hamlet clause and `town-1` counterpart (l. 2612) | (c)'s absorb sentence and (d)'s promotion still re-key a placed lesser as the greater's member #1, a pin included (SR5-01); "laid by VS8" names one of the rule's two runners (SR5-01) |
| SR4-07 | V08 | FIXED | §4.6's `unmapped_kind` row (l. 2332): "the display label (§9.5) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give … or the pin kind its cell names — read after the fold"; `custom_resolved` (l. 2354) cites it with the market-cross case; §3.5 step 5 (d)–(e) (l. 1510–1512) and §3.6 (4) (l. 1740–1744) write the note after the fold; J-V8.112 (l. 2834); T-V8-46's `lodging` → `v.alehouse` and market-cross clauses. V07's `lodging` fallback reads "`v.inn` on a through road, else `v.alehouse`" (l. 2263), as T-V8-46 assumes | the words the `class` arg shows have no producer — §9.5 holds the title and legend, no class row carries a label, a pin kind has none, and the `market` fallback builds no class (SR5-03, SR5-07, SR5-10) |
| SR4-08 | V07 | FIXED | §3.11 step 4 (l. 2260–2261): "the port's one `unmapped_kind` note names the class the fallback gives (V08 §4.6; SR4-07, SR4-08), and no second report is written"; W19 (l. 402) | — |
| SR4-09 | V07 | FIXED | "present with at least one member" at l. 986, 1402, 2289 and J-V7.104 (l. 3455) with its round note; no bare "one member" seat sentence remains (grep; l. 4131 is round 1's history row) | — |
| SR4-10 | V07 | FIXED | §3.11 step 4 (l. 2267–2268): "`healing` → V11's `healer` class, playing itself on a toft slot (its `dwelling-row` template read as §2.4's dwelling plot; SR4-10)" | — |
| SR4-11 | V07 | FIXED | §3.15 (l. 2729): "(this volume's `rules.terrace.enabled` false, §2.2a; SR4-11)"; §2.2a's `terrace` row (l. 786) says V11 §3.24.1's `enabled` column is not read at a village rung; l. 2725's "V11's `terrace.enabled` false" names V11's `presets.VG` entry, as intended | — |
| SR4-12 | V08 | FIXED | §1b's ladder row (l. 308): "at village rungs V07's readings — V07 §2.4's range rows (`rules.ladders.ranges`), DR9's members and V07 §3.10's QUARTER end claim — and a pin lesser's churchyard `cross`" | — |

## 3 Sweep findings

**What this round adds to the neighbouring seams.** `seam-time-r5` was written beside this round, and its findings
already cover five subjects: the records placement's keys and mint (TW-01), a removed record's tombstones (TW-02), the
build order of the records call and the pins participant against file f item 317's M6-E staging (TW-03, which moves file
f's text to item 202), the pins participant's well scope, orphan pins and a market cross replacing a held centrepiece
(TW-06), and the undo of a record's ops (TW-07). This round does not repeat them. Where a settlements finding touches the
same text, it says so and adds only the settlements side (SR5-05, SR5-14, SR5-15). Seam-time-r5 checked how the village's
warning codes are reported and raised nothing. SR5-13 below makes a different point: one of those codes against the
base's own report.

Each finding gives its **id** · severity · kind · **owner**, then the claim with its evidence, then the exact required
change. Majors come first.

### Majors

**SR5-01** · major · contradiction at the ladders' meeting · **V08** — A REPLACEMENT that arrives over time re-keys the
lesser's thing as the greater's, even where the greater is a different thing. V08 §3.5.1 (c)'s absorb sentence
(l. 1649–1653): "At an absorb where the lesser was already placed and the greater arrives beside it, the lesser's placed
members are re-bound as the greater's members `#1…#n` … and DR9 adds members up to the greater's count". (d)
(l. 1662–1666): "A `promotedFrom` receipt … re-keys the singular record's binding row to the greater's `#1` (`rebind`)
and DR9 adds the rest inside the new range", and a lesser that leaves the list in the absorb that adds its greater "is
read the same way". The digest's receipt table carries the same rule: "a greater of a ladder whose lesser is carried →
`add` with the lesser's members re-bound (V08 §3.5.1 (d))" (l. 1563). Round 4's pin-lesser branch (SR4-06; J-V8.111)
covers only the case "where the merge is first read — the creation, or the absorb that brings the pair". Three REPLACEMENT
pairs reach the village rungs over time, and in each the greater is a new thing:
* **`parish_church` over `wayside_shrine`.** The two never share a birth tier: `wayside_shrine` is tiers T and H,
  `parish_church` tier V (V11 l. 2327, 2320). So the pair reaches a map when a hamlet grows into a village and the shrine
  record is promoted by its receipt, or leaves the list as the church arrives. Under (d) the shrine's binding row, a pin
  (`@pin:shrine`), becomes `parish_church #1`, and DR9 adds nothing, because a REPLACEMENT greater is singular. The result
  is a church record bound to a roadside pin and no church built. V11 §3.12's reading keeps "the shrine's pin … as the
  churchyard cross" (l. 2362), which needs a church.
* **`fish_market` over `fishmonger`** (both tier V; V11 l. 2183, 2080; row l. 2445: "the fishmongers trade in the
  hall"). A `fish_market` record added beside a standing fishmonger re-binds the fishmonger's shop as the fish market's
  `#1`. V07, meanwhile, places the added record's hall on the market's rim (V07 §3.12 (b); *Records at a village epoch*
  item 1; T-V7-13's epoch clause). One key then binds two things: the shop and the hall.
* **`town_walls` over `palisade` / `palisade_or_earthworks`** (tier T, or H and V, → W). (d) re-keys the palisade's binding
  to the town walls' `#1`. But V07 §3.11's palisade REPLACEMENT (l. 2356–2363) rebuilds on the palisade's trace only when
  at least 80 % of the dwellings lie inside. Otherwise it builds a new ring and supersedes the palisade, so the key ends up
  on the ring that is left to decay.
Both of V08's tests of the shrine pair (T-V8-46's hamlet clause and its `town-1` counterpart, l. 2612) build the pair at
creation, which SettlementForge never emits. The promotion path is untested.
**Required change:** (c)'s absorb sentence, (d) and the receipt row read: "… are re-bound as the greater's members
`#1…#n` where the greater's thing is the lesser's. That covers every COUNT, GUILD and SIZE step, and the REPLACEMENT rows
whose V11 §3.12 reading keeps the lesser's thing (`graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`,
`mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`); a `@none` lesser has no member to
re-bind. For the other REPLACEMENT rows, the greater is placed new by DR9 in the absorb or the epoch that brings it: an
`assign` of its member, placed as any added record is (at a village rung through V07's records placement, V07 §3.12).
The lesser's key then binds as at a first reading. For `fish_market` over `fishmonger` it is an alias on the greater's
building, and the fishmonger's shop keeps its use, unbound, left to the use step. For a pin-record lesser it is the
churchyard `cross` at a village rung, laid in that commit by V07 §3.10's pin-record rule (SR5-02), and an alias on the
church at a base rung; the lesser's former pin is left standing, unbound. For a `@wall` lesser it is the enceinte the
fortification's dossier path yields (at a village rung V07 §3.11's palisade REPLACEMENT: the rebuilt palisade, else the
new ring), and the superseded palisade keeps no alias. Each re-binding is a `rebind`, noted `ladder_promoted` or
`ladder_merged`." (c)'s pin-lesser branch changes "laid by VS8 at a village rung" to "laid by V07 §3.10's pin-record rule —
VS8 at generation, `village.records` at an epoch or an absorb". J-V8.111 is amended in place. T-V8-46's VH clauses gain:
"a hamlet fixture with `Wayside shrine`, whose record a `promotedFrom` receipt promotes to `Parish church` at an absorb,
stands one `v.parish_church` and binds the record's key to one churchyard `cross`, the old roadside shrine standing
unbound; a village fixture with `Fishmonger` that gains `Fish market` binds the fish market's key to one hall on the
market's rim, with the fishmonger's key as its alias". (V07's companion: SR5-02. V06's: SR5-04.)

**SR5-02** · major · unwired across the seam (a producer missing) · **V07** — V07 has no village reading of a REPLACEMENT
that arrives over time. §3.11's absorb half (l. 2352–2355): "an upgrade keeps the standing building as member #1 and places
the rest". §3.10's pin-record rule runs "in `village.records` for a record added at a village epoch" (l. 2123–2124), and
*Records at a village epoch* calls the placement "once for each dossier record the step adds" (l. 2469–2470). A promotion
by receipt adds no record; it re-keys one. The `parish_church` a promotion brings is also not on the list: a church
record is declined to the base's placement, which runs after `village.records`. So once the pair arrives over time,
nothing in V07 lays the churchyard `cross` that V08 §3.5.1 (c) and V11 §3.12 bind the shrine's key to. `village.pins`
step 4 re-binds only "a record whose bound pin went with its host" (l. 2511). V06's dossier-phase ladder step runs at
village epochs (V07 §3.12: "every other phase … the dossier … is the engine's"), and it converts the lesser's building
in place (V6 §3.9.11's REPLACEMENT row), which a pin does not have. Nor does V07 say which enceinte the `town_walls` key
binds when its palisade REPLACEMENT builds a new ring.
**Required change:** *Records at a village epoch*'s list gains item 4: "a REPLACEMENT greater whose lesser stands on the
map — brought by a promotion receipt, by the change that adds it beside its lesser, or by a lesser leaving the list in
that change (V08 §3.5.1 (c), (d)) — is placed as a new member where V08 §3.5.1 (d) places it new. `parish_church` over
`wayside_shrine`: the church by S10b's `dossier` request in this batch, then the lesser's churchyard `cross` by §3.10's
pin-record rule, and the lesser's former pin left standing and unbound (least disruption; a wayside shrine outlived its
role). `fish_market` over a standing fishmonger: by item 1 ((b)'s rim hall), the fishmonger's shop keeping its use". The
call sentence reads "once for each dossier record the step adds **or re-keys to a REPLACEMENT greater**", and the absorb
path says the same (J-V7.128). §3.10's last sentence reads "… runs in `village.records` for a record added at a village
epoch or an absorb, and for a pin-record lesser whose REPLACEMENT greater arrives (item 4)". §3.11's absorb-half upgrade
sentence adds "— save a REPLACEMENT whose greater is a new thing, placed by *Records at a village epoch* item 4 (V08
§3.5.1 (d))". §3.11's palisade REPLACEMENT adds "the `town_walls` record's key binds the rebuilt enceinte, else the new
ring, with the palisade's key as its alias; the superseded palisade keeps no binding". §2.4's REPLACEMENT row cites item
4. T-V7-13's village-history clause gains "a `Wayside shrine` hamlet fixture whose record is promoted to `Parish church`
at a village epoch stands its church and one bound churchyard `cross` in that epoch, the roadside shrine standing
unbound", with the same promotion at V-M2 on the absorb path. A J-V7 row records the choice. (V08's side: SR5-01. V06's:
SR5-04.)

**SR5-03** · major · unwired (consumed, never produced) · **V11** — No class row carries the display words that the host's
notes, the palette and the roster reader show. File f item 516 carries BCR-V9-8 (V09 l. 3676–3681): "Every table the UI
shows rows of (class rows, district kinds, goods, style presets) carries a display `label` cell and an optional `icon` cell,
and the class rows also `synonyms` and `commonness` cells for the roster reader (volume 9 §4.16); volume 11 writes the
rows." These cells have readers:
* V09 §3.3's roster reader, step 3 (V09 l. 2113–2116), which matches "the class rows' display labels and synonyms (volume
  11's `label` and `synonyms` cells)" and breaks ties by "the row's `commonness` cell";
* V09's T6 stamp palette (l. 1487: "V11's labels and icons");
* the `refuse.roster.dossier` message's `{thing}` slot, "the class's display label when the name is `''`" (V09 l. 1629), which
  V10's clerk renders;
* on this seam, V08 §4.6's `unmapped_kind` and `custom_resolved` notes, whose `class` argument is "the display label … of
  the class that builds the record", tested as "`v.alehouse`'s label" (T-V8-46, l. 2612).
V11 adds to `BuildingClassRow` only `profile`, `staff`, `villageForm`, `templateFamily`, `crypt`, `cryptM2` and `deckOk`
(§2.3, l. 447–460 and 703; registry row 17, l. 821). No `label`, `icon`, `synonyms` or `commonness` cell appears anywhere in
V11 (grep), and item 516's *Needed by* names only V09. The generated `generic-<family>` classes (V11 §3.13.3) and V07's 25
`v.` rows have no words either.
**Required change:** V11 §2.3's `BuildingClassRow` additions (BCR-V11-1, amended) gain four cells, each `own` and
`calibratable: false`: `label: string` (plain words for one member, such as "fish market"), `icon?: string` (an id in V9
§5.1's sprite), `synonyms: string[]` (whole words and word pairs the roster reader matches, case-folded) and
`commonness: number` (0–1, the reader's tie-break). §3.5's class tables carry a label cell and a synonyms cell for every
authored row. §3.13.3's compiler writes each `generic-<family>` class's `label` from its family's `trade.noun` entry
(§3.20.5; "a {noun}"), with `synonyms` [] and `commonness` 0. T-V11-4's row check refuses a class row without `label`,
and registry row 17 lists the four cells. The same `label` (and `icon?`) cell goes on the other tables BCR-V9-8 names that
V11 writes (district kinds, goods, the profile families, the style presets), so the surfaces seam finds them there. File f
item 516's *Needed by* gains V11 (SR5-15 (b)). (V07's rows: SR5-10.)

### Minors

**SR5-04** · minor · companion, generic rule · **V06** — V6 §3.9.11's REPLACEMENT row (l. 1904–1906) reads "the lesser's
use replaced by the greater's in place — a `convert` of designation on the same building". At a village epoch this is the
engine's dossier phase (V07 §3.12). It cannot apply to a pin lesser, and for `fish_market` over `fishmonger` it
contradicts V07 §3.12 (b)'s rim hall. **Required change:** the row adds "— save where V08 §3.5.1 (d) places the greater new
(SR5-01): a pin-record lesser (`parish_church` over `wayside_shrine`: the church placed by the `dossier` request, the
shrine's key bound as V08 §3.5.1 (c) states) and a greater of another template family than the lesser's building
(`fish_market` over `fishmonger`); at a village rung, both through V07's records placement (V07 §3.12 *Records at a
village epoch* item 4)". T-V6-45's no-double-count clause gains the shrine promotion.

**SR5-05** · minor · contradiction with V08 · **V07** (on the absorb path, beside seam-time-r5 TW-01 and TW-07) — On the
absorb path without an epoch, V07's ops schedule Works. §3.12 (b) (l. 2436) builds the hall by "S11 (a `build`, its Works
scheduled by V6 §3.13)", and (c) (l. 2451) says "S11 builds on it (a `build`, Works by V6 §3.13)". *Records at a village
epoch* runs the same list on an absorb without an epoch (l. 2486–2490; J-V7.128). V6 §3.13's Works belong to an epoch's
`works` step (V6 §3.2 row 18). V08 §3.6 (6) (l. 1758–1760) applies an element event outside an epoch finished: "undated
ones follow the last epoch, applied finished (no Works)". **Required change:** (b)'s and (c)'s parentheses read "(a
`build` — at an epoch its Works scheduled by V6 §3.13; on an absorb without an epoch it stands finished in the absorb's
commit, as V08 §3.6 (6) applies an element event)". T-V7-13's absorb clause adds "the hall stands finished (no Works)".

**SR5-06** · minor · wrong words at the seam · **V08** — V08 §3.6 (5) (l. 1746–1747) words the port's emission of an added
record as "`assign` → an `assign` of a dossier-backed assignment (§7.7 One path: placed by S10b's `dossier` request, the
least-disruption order)". At a village rung, the product's records placement places a market, claim-sized or pin record
first: at an epoch in the dossier step, and without an epoch through §7.7's placement calling it (V07 §3.11's absorb half,
l. 2345–2348; *Records at a village epoch*; J-V7.128; V6 §2.1's `ProductDeclEpoch.records`). S10b's request "receives
neither" (T-V7-13's absorb clause). **Required change:** the parenthesis reads "(§7.7 One path: placed by S10b's `dossier`
request, the least-disruption order — at a rung of a product that declares a records placement, that placement first, V6
§2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*)". Only the wording changes: the port emits the
same events, and the call itself is file f's (seam-time-r5 TW-03).

**SR5-07** · minor · consumed, never produced · **V08** — The words a note's `class` argument shows. V08 §4.6's
`unmapped_kind` row (l. 2332) reads "`class` the display label (§9.5) of the class that builds the record … or the pin kind
its cell names", and `custom_resolved` (l. 2354) names "the market cross". Three things are wrong. (i) §9.5 is *Furniture,
framing and tools*: the title's tier word and the legend, with no class label (base l. 11347–11411). The class's words are
BCR-V9-8's `label` cell, which V11 does not yet write (SR5-03). (ii) A pin kind (`market_cross`, `shrine`) has no class
row, and no volume gives it words. (iii) V07 §3.11 step 4's `market` fallback (l. 2262–2263: "`market` → the open space's
market") builds no class of its own, so there is none to name. **Required change:** the `class` cell reads "the `label`
cell (V11 §2.3, BCR-V9-8; SR5-03) of the class that builds the record at the document's rung — at a village rung the class
V07 §3.11 steps 2–4 give (the `villageForm`, the archetype's `village` cell, or the tag fallback, whose `market` entry names
V11's `market` class) — or, for a pin kind a cell names, the pin kind's word in the legend's symbol key (§9.5, generated
from the registry, O12 d); read after the fold". `custom_resolved` cites it. T-V8-46's two clauses read "`v.alehouse`'s
`label`" and "the market cross's symbol-key word".

**SR5-08** · minor · stale record · **V08** — V08 §13's X22 (l. 3383) reads "OPEN until both lanes land (started 12:36 and
12:39)". §12's round-5 paragraph (l. 3298–3302) keeps as PLAUSIBLE "that V07 §3.10 lays the churchyard `cross` a pin lesser
binds and V11 §3.11–§3.12 read as seam-settlements-r4 SR4-01 and SR4-02 require". Both lanes have landed:
reconcile-V11-r5 at 12:51 and reconcile-V07-r5 at 13:07. Their texts read as X22 asks. V07 §3.10 (l. 2120–2123) lays
the churchyard cross in the `churchyard` part nearest the door. V07 §3.11 step 4 (l. 2260–2261) cites V08 §4.6's one
`unmapped_kind` note. V11 §3.11 (l. 2030–2033) and the §3.12 `parish_church` row (l. 2362) name both readings. V07's lane
note of 12:59 also says "V08 §13 X22 may close". **Required change:** X22 is marked **CLOSED**, citing those four places,
and §12's PLAUSIBLE sentence moves to CONFIRMED, dated, with the same citations.

**SR5-09** · minor · stale records · **V11** — (a) V11 §12's round-5 paragraph (l. 4623–4624) keeps "**PLAUSIBLE:** that
V07's text lands as read". V07 landed at 13:07 with §3.10's rule and the churchyard cross as V11 reads them (V07 l.
2111–2124). (b) Registry row 61's reader gloss (l. 866) explains `VS8` and `S10b` only by generation and by "the
`village.plan` and `village.density` participants". It omits the round-5 readers under those ids: the participant
`village.pins` (stage `VS8`, V07 W72), the records placement `village.records` (stage `S10b`, W70) and the siting step (m)
(`EVO_SITING`, W71). The ids themselves are listed, so T-V11-1 (b) passes; only the gloss is stale. **Required change:**
(a) the clause moves to CONFIRMED, citing V07 §3.10 and J-V7.127. (b) Row 61's parenthesis adds "`village.pins` re-runs
VS8's rows at a village epoch (stage `VS8`); `village.records` places a record's market, claim or pin under `S10b`; the
siting step (m) reads under `EVO_SITING` (V07 §3.12; W70–W72)".

**SR5-10** · minor · companion · **V07** — V07 §2.4's class columns (l. 871–888) give its 25 `v.` rows no `label`,
`synonyms` or `commonness` cell, though the roster reader, the palette and V08's notes need them for a village class
(T-V8-46: "`v.alehouse`'s label"). **Required change:** once SR5-03 lands, the class columns add *label · synonyms*,
filled for every `v.` row in plain words ("cottage", "longhouse", "alehouse", "parish church", "chapel of ease",
"reeve's house", "smithy" and so on for all 25), with synonyms where a reader would type another word ("forge" for
`v.smithy`, "mill" for `v.watermill` and `v.windmill`). The `commonness` cell is the row's roster share at VILLAGE (own).
The pin kinds take no row; their words are the symbol key's (SR5-07). T-V7-56's compile clause adds V11's `label` check
over the `v.` rows.

**SR5-11** · minor · restated producer · **V11** — Two V11 cells restate a V07 producer too narrowly. (a) §3.13.2's
`mercantile-market` village cell (l. 2525) reads "pin `@pin:market_cross`, with V07 §3.10's stalls on the green". V07
stands the cross "at the centre of the reservation that carries the market (the open space, or the flanking square …)",
or on the through road's frontage for an epoch's street market (l. 2116–2119; T-V7-21). (b) The `parish_church` row
(l. 2362) reads "at a village rung VS8 lays the cross". V07's rule runs in VS8 at generation and in `village.records` at
an epoch or an absorb, and with SR5-02 at a promotion too. **Required change:** (a) reads "pin `@pin:market_cross`, placed
with its stalls by V07 §3.10's pin-record rule". (b) reads "(at a village rung V07 §3.10's pin-record rule lays the cross
and the shrine record binds it — at generation, when either record arrives, or when the shrine is promoted, V07 §3.12
*Records at a village epoch*; at a base rung …)".

**SR5-12** · minor · gap · **V07** — A `Roadside Shrine` quarter that arrives after generation forces no shrine. VS8's
shrine row reads "0.3; a dossier's Roadside Shrine forces it" (l. 2106–2107), and DR5 reads the quarter as "a shrine at
the perimeter on a road, and its name on that end" (l. 2218–2219). At a village epoch the pins run through `village.pins`,
whose steps 1–4 (l. 2496–2511) add wells, stalls, the new hosts' rows and the pin records' re-binding, but no quarter's
shrine. The pin-record rule covers `@pin` records, not quarters. The quarter is one of a small dossier's five fixed
phrases (§3.11), and one gained as the settlement grows anchors nothing. **Required change:** `village.pins` step 3 adds "a
`Roadside Shrine` quarter the epoch's dossier step added (DR5): its shrine placed by the shrine row where none stands within
`presence.siteReachM`, on `pin.decor` keyed by the quarter's claim". On an absorb without an epoch, the shrine is laid at
the next village epoch; until then the claim anchors as DR5's claim without an anchor does ("a `claim` anchor at the
claimed class's place", §3.11). T-V7-57's village-history clause gains the case.

**SR5-13** · minor · contradiction with the base · **V07** — §3.12 (c)'s last rung (l. 2452–2453) reads "a record never
waits — its last rung is the base's `dossier` request's closest option (J-A20.71), reported `W_CLAIM_CLOSEST`". The base
reports that outcome as F-SITING. A `dossier` request "places at its first closest option with the hard rows it fails
reported (§7.7's precedence, J-A20.71)" (§4.7 S10b, base l. 5284–5287), and a dossier-backed element takes "its first
closest option … with the rows it fails reported (§5.2 F-SITING), never omitted (J-A20.71)" (§7.7, base l. 9110–9114).
No volume defines `W_CLAIM_CLOSEST`, and it occurs only here. **Required change:** the clause reads "… closest option,
reported as the base's F-SITING with the rows it fails (§5.2; J-A20.71)", and the code is deleted.

**SR5-14** · minor · contradiction · **V07** (beside seam-time-r5 TW-06) — `village.pins` removes stalls whose host stands.
Step 2 (l. 2501–2504) brings each market's stalls to count, "the surplus removed last-placed first; a market that closed
loses its stalls". A closed market keeps its square (l. 2461: "its square kept; its stalls removed by `village.pins`"), and
l. 2514 counts "a removed stall's tombstone" among the participant's ops. Yet l. 2512 reads "It removes no pin whose host
stands", and T-V7-57's village-history clause checks "0 standing pins moved and 0 removed whose host stands". TW-06 adds an
orphan step and a market-cross exception to the same sentence and test, but not this one. **Required change:** l. 2512
reads "It removes no pin whose host stands, save step 2's stalls (the surplus as households fall, and a closed market's)",
and T-V7-57's clause adds the same exception, applied in one edit with TW-06's.

**SR5-15** · minor · pointer and *Needed by* · **BASE-F** — (a) This part goes with seam-time-r5 TW-03 (3), which moves
`ProductDecl.records` and its two calls to item 202. The requests word the absorb-path call as "§7.7 item 2's placement"
(BCR-V7-18's round-5 sentence; BCR-V6-1 (a); V6 §2.1's comments). But the dossier contract's item 2 is *Existence* (base
l. 9158–9165) and places nothing. The placement is §7.7's *One path — placement, then mutation* paragraph: "every `assign`
event — from the blueprint, the dialog, the host bridge or the host door (§11.4) — is placed by §4.7 S10b's one solver for
its scope" (base l. 9124–9125). **Required change:** the item that carries the calls (item 202 after TW-03) names the
target: "the absorb-path call is inserted in §7.7's *One path* sentence 'every `assign` event … is placed by §4.7 S10b's
one solver for its scope': at a rung of a product that declares `ProductDecl.records`, an added record is first offered
to that placement, which places or declines it; the requests' '§7.7 item 2's placement' means this sentence". (b) Item
516 (BCR-V9-8, l. 891) reads *Needed by:* V09. **Required change:** it reads "*Needed by:* V07, V08, V09, V10, V11
(volume 11 writes the `label`, `icon`, `synonyms` and `commonness` cells, and volume 7 its `v.` rows' cells; volume 8's
notes and the refusal V10 renders read the label; SR5-03, SR5-10)".

## 4 Census: every dossier kind at every size lands in a class row

**(A) Kinds to class rows.** Round 4's `census.py`, re-pointed at the live V11 (scratch `ssr5/census.py`), gives a
`census.out` byte-identical to rounds 2–4 (md5 00d6640f…). There are 280 kinds. Tiers T, H and V carry 97 and tier W 85,
six of them in both, so **176** reach a village rung at birth. At a village rung, **34** of them go to a pseudo-class,
**31** to a class with a village form (V11 §3.22's 32 entries onto 21 of V07's `v.` rows), **111** to a class that plays
itself, and **0** to the tag fallback. The second pass over **all 280** kinds (`census_all.py`) also covers the 104 kinds
of tiers C and M, which reach a village rung only by a hand-down or a later addition: 41 pseudo, 39 village form, 200 own
row, 0 missing. Every kind at every size lands in a class row. The round's changes to V11 (the registry's `S5` group and
S5b rows; §3.11's `@pin` sentence; §3.12's `parish_church` reading) touch no kind's row.

Every `` `v.` `` id in the twelve volumes, `_integrate.md` and file f is one of V07's 25 rows (script). V02, V03, V07 and
V11 use all 25; V08 now uses 7 (T-V8-46's `v.alehouse` among them); V04, V06, `_integrate.md` and file f one each; V01,
V05, V09, V10 and V12 none. The `@pin:` kinds in V07, V08 and V11 are `shrine`, `well` and `market_cross` (grep), and V07
§3.10's pin-record rule places each.

What remains is not a kind's landing but three things beside it. A promoted REPLACEMENT greater gets no building of its
own (SR5-01, SR5-02). A pin-record lesser gets no pin over time (SR5-02). And no class row, village or town, carries the
words the host's notes show (SR5-03, SR5-10).

**(B) The small-settlement hand-off.**

| check | round 5 reading | verdict |
|---|---|---|
| registration | one `ProductDecl` (V07 §2.1; file f item 202); V08 §3.10 consults `LadderRouter`; `ProductDecl.records?` added (V07 §2.1; V6 §2.1's `ProductDeclEpoch.records`) | holds; the member's staging and its calls are TW-03's (seam-time-r5); the target sentence in §7.7 is SR5-15 (a) |
| the band and the epoch's product | V07 §2.1's fold = V08 §3.10 = file f items 322 and 317; unchanged | holds |
| the floor | creation below 1 refused; 0 at an absorb → THORP and desertion (V07 §2.1; V08 §3.6 (7), §3.9's three `E_RUNG_UNAVAILABLE` cases; item 202) | holds |
| the participants across the hand-off | `village.plan` `VS1`, `village.density` `VS2`, and now `village.pins` `VS8` (V07 §2.1, §3.12; V6 §3.2's table; V11 row 61's ids) | holds; row 61's gloss is stale (SR5-09 (b)) |
| a record placed at a village rung after creation | `village.records` at an epoch's dossier step and on an absorb without an epoch — market, claim-sized and pin records, the rest declined to S10b (V07 §3.12; J-V7.125, J-V7.128) | holds for an added record; not for a REPLACEMENT greater arriving over its standing lesser (SR5-01, SR5-02, SR5-04); V07's Works on the absorb path (SR5-05) and V08's emission words (SR5-06); the keys, removals and undo are seam-time-r5's (TW-01, TW-02, TW-07) |
| burial records | `churchyard` on the church families, `burial` on the cloister and burial ground; `parish_burial_grounds` a COUNT over the churchyards; `graveyard` over `burial_ground` re-binds the face (V11 §3.12; V08 §2.6a; V07 DR9) | holds; the one REPLACEMENT row whose re-key fits (SR5-01 keeps it) |
| `@absent` at a village rung | V07 §3.11 step 1, V11 §3.11, V08 §2.6 and §2.6a, T-V8-46 at VH | holds |
| seats | forced by DR11 through `villageSeat`, "at least one member" in every place (SR4-09 fixed); the government step reads `villageSeat` alone at the `territory` rungs; item 576 (c) on §10.2 | holds |
| furniture | VS8's rows are the village's whole furniture; the pin-record rule forces a record's pin; `village.pins` runs VS8's rows at a village epoch (V07 §3.10, §3.12; BCR-V7-38 = item 579; V11 §3.11) | holds at generation and for an added record; a `Roadside Shrine` quarter gained later (SR5-12); the stall exception (SR5-14, beside TW-06) |
| markets and harbours, at creation and over epochs | `dist.market`, `dist.harbour`; the fair field; the halls' claims by `nearMarket`; §3.12 (a)–(f) with step (m) and `village.records` | holds; (c)'s report code (SR5-13) |
| derived land uses | V08's `res:derived:<k>`; V07 §3.9 reads it unchanged | holds |
| the `VG` preset | V07 §3.15 (with its own `rules.terrace.enabled`, SR4-11 fixed), V11 §3.2.2, file f item 581 as amended (SR4-05 fixed) | holds |
| the notes the host shows for a village | V08 §4.6's `unmapped_kind` and `custom_resolved` written after the fold, naming the class built at the document's rung (SR4-07 fixed) | the words for that class, a pin kind or the `market` fallback have no producer (SR5-03, SR5-07, SR5-10) |

**(C) The ladders meeting.** The name grammar and the four qualifiers agree (V08 §3.5.1 (a), V07 §3.11). The step types
agree (V11 §3.12, V07 §2.4's third table). Unnumbered ranges: all three volumes read V07's row by step type and member
class. Every ladder row set is `calibratable: false`. No double counting at a first reading: V08 §3.5.1 (c), V11 §3.12
and V07 (§2.4, DR9, T-V7-35) agree, and the pin lesser binds the churchyard cross at a village rung and the church at a
base rung (SR4-06 fixed). **Over time they part.** V08 (c)'s absorb sentence and (d), and V6 §3.9.11's REPLACEMENT row,
make the lesser's thing the greater's for every pair. V11's readings and V07's village rules place the greater new for
`parish_church` over `wayside_shrine`, `fish_market` over `fishmonger` and `town_walls` over a palisade (SR5-01, SR5-02,
SR5-04). Of V11 §3.12's REPLACEMENT rows (l. 2362–2445), the four whose reading keeps the lesser's thing keep the re-key
(SR5-01's list). The walls' rows go through the fortification path, and at a village rung through V07's palisade rule.
`cathedral_10_000_only` absorbs its lessers and reaches no village rung.

**(D) Records, ids, terms, units and base change requests across the seam.**

| subject | V07 | V08 | V11 | verdict |
|---|---|---|---|---|
| village class keys | `v.<id>`, 25 typed rows | seven `v.` ids, all V07's | `v.` namespace; `villageForm` → `v.` only | agreed |
| `@pin` records | forced by §3.10's rule (VS8; `village.records`) | a pin lesser's churchyard `cross` (§3.5.1 (c)) | §3.11 at base and village rungs; the `parish_church` row | agreed at a first reading; V11's restated producers narrow (SR5-11); over time SR5-01, SR5-02 |
| the records placement | `village.records`, stage `S10b`, W70 | not named in §3.6 (5)'s emission (SR5-06) | row 61 lists `S10b`, gloss stale (SR5-09) | wording only |
| a class's display words | no cells on the `v.` rows | `class` "display label (§9.5)" | no `label` column | unwired (SR5-03, SR5-07, SR5-10) |
| a closest-option report | `W_CLAIM_CLOSEST` | — | — | against the base's F-SITING (SR5-13) |
| dossier row sets | read (DR1, DR2, DR11, DR19) | every cell `calibratable: false`; `customWeights` | rows 63–66 | agreed |
| file f | BCR-V7-1 – -38 carried (exact-id script) | BCR-V8-1 – -32 carried | BCR-V11-1 – -31 carried | carried; item 576 (c) and item 581 fixed; item 202/317's call target (SR5-15 (a), with TW-03); item 516's *Needed by* (SR5-15 (b)) |
| `_integrate.md` | IN-V07-6, -7 | — | IN-V11-8 – -10 | unchanged, agreed |

## 5 Summary, decisions, CONFIRMED versus PLAUSIBLE

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V07 | 0 | 1 (SR5-02) | 5 (SR5-05, -10, -12, -13, -14) | 6 |
| V08 | 0 | 1 (SR5-01) | 3 (SR5-06, -07, -08) | 4 |
| V11 | 0 | 1 (SR5-03) | 2 (SR5-09, -11) | 3 |
| V06 | 0 | 0 | 1 (SR5-04) | 1 |
| BASE-F | 0 | 0 | 1 (SR5-15) | 1 |
| **total** | **0** | **3** | **12** | **15** (SR5-01 – SR5-15) |

**Round 4's 12:** all FIXED where round 4 said (§2), none reopened. The census holds as in rounds 2–4. The three volumes
agree on the class keys, the government step and its "at least one member", the furniture stage and the pin-record rule,
the context readings, the claim-sized plots, the markets over epochs, the range-row key, the GUILD hall, the `VG` preset
and V07's own terrace switch, the dossier row sets' flag and the digest's field names; file f carries every request.

What round 5 finds sits where round 4's repairs meet time. SR4-06 settled the pin lesser's key at a pair's first
reading, but `wayside_shrine` and `parish_church` never share a birth tier, so the pair really arrives by promotion. There
V08's (d) and V06's in-place conversion turn the shrine into the church, and no rule builds the church or lays the cross
(SR5-01, SR5-02, SR5-04). `fish_market` over `fishmonger` and the town walls over a palisade meet the same generic re-key.
SR4-07 made the host's notes name the class the map builds, and that exposed an older gap: no class row carries display
words, though V09's request asks volume 11 for them (SR5-03, SR5-07, SR5-10, SR5-15 (b)). The rest are small: the absorb
path's Works (SR5-05), the port's emission words (SR5-06), two stale records (SR5-08, SR5-09), two restated producers
(SR5-11), a quarter's shrine gained late (SR5-12), one warning code against the base's (SR5-13), the stall exception
beside TW-06 (SR5-14), and the §7.7 target sentence beside TW-03 (SR5-15 (a)).

**Order of work.** First SR5-01 (V08), SR5-02 (V07) and SR5-04 (V06) together, since each cites the others' text. Then
SR5-03 (V11), followed by SR5-10 (V07), SR5-07 (V08) and SR5-15 (b) (BASE-F), which read its column. Then SR5-15 (a)
with seam-time-r5 TW-03's file f change, SR5-14 with TW-06, and SR5-05 with TW-01 and TW-07 (all V07 §3.12). Last,
SR5-06, SR5-08, SR5-09, SR5-11, SR5-12 and SR5-13.

**J-SR5 rows (this lane's own calls, vetoable).**
* **J-SR5.1** — Read the five seam files as word diffs against round 4's kept inputs (md5-equal copies), with every section
  those diffs touch re-read whole, including the unchanged passages they now meet, and targeted greps for each new
  mechanism's other ends. The alternative was re-reading about 1.9 MB whole. Rounds 0–4 read every unchanged byte, and
  the diffs show every changed word. Three of this round's findings sit partly in unchanged text: V08 (d), V11's
  `BuildingClassRow` and V6 §3.9.11. Each was reached by following a changed passage to its partner, which is how this
  method is meant to catch them.
* **J-SR5.2** — Read the concurrently written `seam-time-r5.md` and did not repeat its findings. Where a subject is shared
  (TW-01, TW-03, TW-06, TW-07), this round adds only the settlements side and names the pairing. The alternative, raising
  each independently, would hand the V07 lane two required changes for one sentence.
* **J-SR5.3** — Gave SR5-01 to V08, which owns the general merge rule (as J-SR4.5 did), with a per-row reading taken from
  V11 §3.12. The alternative was to keep V08's generic re-key and bend V11's and V07's readings to it. That fails on its own
  terms: a roadside pin cannot become a parish church, and V07 already places an added fish market's hall on the rim.
  Realism agrees. A village that got its church kept its wayside cross, and a market hall was a new building.
* **J-SR5.4** — Rated SR5-02 major rather than a minor companion. Without it, SR5-01's fix binds the key to a cross that
  nothing lays. The recommended producer places the church by S10b's `dossier` request inside `village.records`' batch and
  then lays the cross. The alternative was `village.pins` step 4 at `afterGrowth`. That is rejected because the absorb path
  has no participant step, and one call covers both paths, as J-V7.128 intends.
* **J-SR5.5** — Rated SR5-03 major and gave it to V11, because BCR-V9-8 says "volume 11 writes the rows". The other
  UI tables are included in the one change so the surfaces seam does not meet the same gap next round. The generic
  classes' labels come from V11's own `trade.noun` slice, not a new word list.
* **J-SR5.6** — For SR5-12's absorb case, chose to lay the quarter's shrine at the next village epoch, with the claim's own
  anchor meanwhile. The alternative was calling `village.records` for a quarter, which is not a record the dossier step
  adds. A quarter is a naming claim, and DR5 already gives a claim without an anchor its place.
* **J-SR5.7** — Left the build order of the records call and of the village's epoch participants against M6-E to
  seam-time-r5 TW-03, which states it in full, and added only the §7.7 target sentence (SR5-15 (a)). The alternative was
  raising a second, differently worded staging change for the same item.

**CONFIRMED (read or executed in this lane).**
* The inputs' md5s at the start, before §3, before §4 and before this section (§1).
* Round 4's inputs kept md5-equal in scratch.
* The four word diffs read whole; `_integrate.md` unchanged (diff empty).
* Every quotation checked at its line in the live file.
* The census by script: 280 kinds; 176 reach a village rung, 34 / 31 / 111 / 0; all 280 land, 41 / 39 / 200 / 0.
  `census.out` is byte-identical to rounds 2–4.
* Every `v.` id in fourteen files is one of V07's 25 rows (script).
* The `@pin:` kinds across the three volumes are three, all covered (grep).
* Every BCR-V7 (38), BCR-V8 (32) and BCR-V11 (31) heading id is carried in file f (exact-id script).
* The tiers of every REPLACEMENT pair that reaches a village rung (V11's kinds rows, read): `wayside_shrine` T, H and
  `parish_church` V; `fishmonger` and `fish_market` V; `palisade` T, `palisade_or_earthworks` H, V and `town_walls` W;
  `burial_ground` T, H and `graveyard` V; `citizen_militia` `@none`.
* V08 §3.5.1 (c)'s absorb sentence and (d), and the digest's receipt row.
* V6 §3.9.11's REPLACEMENT row, and V6 §3.2's step order (dossier 12 before `afterGrowth` 15).
* That no `label`, `icon`, `synonyms` or `commonness` cell occurs in V11 (grep), and BCR-V9-8's text and its readers in
  V09.
* The base's §7.7 *One path* sentence (l. 9124) and item 2 (l. 9158); its closest-option reports (l. 5284–5287,
  9110–9114); and §9.5's contents.
* The two V07 sentences on removing stalls (l. 2501–2504, 2512, 2514).

**PLAUSIBLE (reasoning).**
* That SettlementForge brings `parish_church` to a grown hamlet by a `promotedFrom` receipt or by the shrine leaving the list
  in the same absorb (V08 §3.5.1 (d)'s two cases), rather than as a fresh record beside a kept shrine. This was not counted
  over the 155 dossiers. Either way SR5-01 applies: a fresh record beside a kept shrine takes (c)'s absorb sentence, and
  its re-key has the same defect.
* SR5-01's per-row split of V11's REPLACEMENT readings, and SR5-02's producer and its placement order, as recommended
  decisions.
* That the base's legend symbol key carries a word per pin kind (§9.5: "the symbol key generated from the registry"; O12
  d). SR5-07 relies on it, and no registry row was read that names the words.
* That no other generic rule of V06's dossier phase meets a village-only reading the way §3.9.11's REPLACEMENT row does.
  This round read §3.9.11 whole but not the rest of V06's dossier phase against V07.
