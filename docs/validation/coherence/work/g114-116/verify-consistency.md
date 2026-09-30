# Verify — cross-item consistency, ids and routing (items 114, 115, 116 bundle)

> Verify seat, lens: CROSS-ITEM CONSISTENCY, IDS AND ROUTING. Opus 5.5 standing in, PENDING FABLE REVIEW. 2026-09-30.

**Read whole:** `work/g114-116/` — `items-114-116.md` (1 562 lines), `routing.json` (18 units), `canon-ruling.md`,
`j-rows.md`, `owner-instructions-entry.md`, `plain-summary.md`, `consistency-report.md`, `tmp/id-census.txt`,
`tmp/old-ids.txt`, `tmp/cap-stone.txt`. **Against:** `work/g114-115/` (`routing.json`, `canon-ruling.md`,
`final-notes.md` §5's J-A titles, `items-114-115.md`, `program-correction.md`), `work/g116/` (`routing.json`,
`canon-ruling.md`, `item-116.md`, `read-owner-decision.md`, `review-wiring.md`), and the design: `new/base/scope/12-judgment.md`
(the J-A rule), `05-s1.md` §1.2, `07-s14.md` (`DossierDigest`, `PortNote`), `new/base/determinism/01-s5-failure-handling.md`
(§5.4, `Diff`), `03-s7-editing.md` (`EditFate`, `CircumstanceSlice`, `TradePartner`, the DR table, §7.8),
`02-s6-determinism.md` (§6.1 streams), `new/base/pipeline/01-s4-generation-pipeline.md` (Works, `BandSet`),
`docs/volumes/` V05 (`IslandRule`, `skyGate`, J-V5.10), V08 (§2.4 note kinds, §2.5, §2.6 `access` row, §3.5 diff table),
V09 (§4.9, §4.14, key families), V10 (`IntendInput`, lexicon), V11 (goods, classes, row 6), V12 (`Level`), and
`workflows/18-coherence.js` (`lateItems`, `lateUnits`, `lateRouting`). **New receipts:** `tmp/vc-census.txt` (every
minted id against `new/`, `docs/volumes/`, `ARCHITECTURE.md`), `tmp/vc-routing-twins.txt` (the two twins' and the
bundle's STATES and REFERENCES per unit, side by side).

**Verdict.** The ids the three items mint do not collide with each other or with the set, the J-A ids follow the
index's rule and agree in every file, and `routing.json` covers the 18 units with the right modes and item lists. It
fails on 30 points, 7 of them major: one derived-fixture id written in two orders (VC-1); a routing part that item 115
denies (VC-2); shared decisions with two or three stating units, where routing and canon disagree (VC-3, VC-4); literal
75s that break T115-6 once `gate.magicMin` or `gate.economyMin` is edited (VC-5); J128 and the owner entry misstating
item 116's very-rich consequence (VC-6); and an undeclared type, `AccessKey` (VC-7). Every required change is listed
below and in the summary.

---

## 1. Where this lens finds no defect (checked, plainly)

- **Test ids.** T114-1 – T114-14, T115-1 – T115-10 and T116-1 – T116-34 are each defined once in their item's bars, and
  every edge, schedule, routing and canon reference names a defined one. None exists in the set outside the bundle
  (`vc-census.txt`: 0 in `new/`, `docs/volumes/`, `ARCHITECTURE.md` or any other `docs/` file). Every amended older id
  resolves: T8-5, T10-1, T13-1, T15-1, T19-3, T26-1, T71-1, T73-7, the T-V ids, CVR-V10-4, `J-M5` and research row 54
  (`research/sf/mapping.md`).
- **J-A ids.** J-A114.21, .41 – .48, .71 – .75, .81; J-A115.41 – .46, .71 – .75; J-A116.01, .21 – .24, .41 – .44, .61, .71,
  .81. Each first digit names the part whose section the canon's "where" gives (12-judgment.md l.8: 0 scope, 2 model,
  4 pipeline, 5–7 determinism, 8 rendering). The same set appears in items (k)/(h)/(r), the routing's scope part, the
  canon's table, J126 – J128 and the consistency report's renumber table. I checked every "was → now" row against the old
  titles (g114-115 `final-notes.md` l.165–192; g116 `item-116.md` l.789): all 34 agree. There are 0 prior uses.
- **Other minted ids, 0 prior uses each, none repeated across the items:** DR41 (the table ends at DR40); K19 (V10 has
  K1 – K18; J-K19 is the kernel's judgment); `F-MATERIAL`; `islands_gated` and the thirteen material codes; `value_absent`,
  `value_clamped` and `partner_no_supplies`; `held_above_ceiling`, `held_against_magic`, `held_against_economy` and
  `held_against_supply`; H-TRADE, H-NATIVE, H-QUARRY and H-WOODS (V06's H- set has no clash); every new V09 key; the event
  forms; `fire.ordinanceStretch`; `materials.*`; `SkyGate`, `MaterialSupply` and the `Material*` types; the goods `slate`,
  `lead` and `straw`. Reused on purpose and correct: `frozen_fact_changed` (W-DOS-08), `unmapped_word`,
  `refuse.islandsRung`, `button.showWhy`, `fate.*` and `host.note.<kind>` (V08 l.640: snake-case kind). Two further names
  are correct here: the `material` concern (§6.1 l.139, amended rather than minted) and `circumstances.trade`, which is
  item 77's slice path (AMENDMENTS 27d l.175), so the Trade control adjusts that field.
- **Shared names and values that agree across the items:** band ids and ranks, the knots 16⅔ and 33⅓, `rungMeans`,
  `ceilingAt` and its callers (S2, the prelude, S3, S4, S5a and S5b), the four-step prelude order in 114 (e) and 116 (d),
  "prosperity ceiling", "highest allowed band", "top means", "material supply" against "the supply law", and the parity
  preset set (`MFCG`, `FTG`, `VG`, `NG`; `FM` none). Also the stamps `'115 (b)'` and `'116 (n)'` (114 unstamped), the
  `dossier-owned` refusals in one §7.7 item 11 list, `frozen_fact_changed`'s args (`field`, `was`, `now`), and the 50
  defaults. The single T-V8-20 ignore clause agrees with T114-11 and T116-13, and the "17 / 29 / 42 km" figures agree with
  `cap-stone.txt`.
- **Routing coverage and modes.** `routing.json` has 18 entries. Each item list equals the union of the twins' lists: the
  items' (k), (h) and (r) name the same units and no item names a part for the kernel. The landed units with a part are
  `late`: model, pipeline, determinism, rendering, V03 and V04. The kernel is landed with no part and is marked `none`,
  with its reason stated. This is not a defect: the workflow never parses `mode`, and no late seat has anything to apply
  there. The other eleven units are `main`. The canon's "Seats" list and its per-unit list agree with these modes. Every
  STATES line of the two twins survives in the bundle routing (`vc-routing-twins.txt`).
- **Owner times.** Every file of the bundle carries the same times: ~00:50, ~00:55 (replaced ~00:58), ~01:00, ~01:05,
  ~01:10, ~01:12 and ~01:33.

---

## 2. Defects — evidence and the exact change required

### Major

**VC-1 — One derived fixture carries two ids: T115-5 chains the suffixes in the reverse of the order fixed for them.**
*Evidence:* the routing's V12 shared part (routing.json l.482) says the suffixes "`@economy<e>`, `@magic<m>`,
`@magicLevel<word>` chain after `@pop×k` in that order", and canon l.103 says the same. T115-5 (items l.634) and the
routing's V12 part for item 115 (l.482) write `'<dossier>@magic100@economy90'`, and so does the consistency report's
table §1 (g). A fixture written in the two orders has two ids.
*Change:* write `'<dossier>@economy90@magic100'` in T115-5 (items l.634), in the routing's V12 item-115 part and in
consistency-report §1. Add the order to the item text, which states none: in 115 (h) V12 (items l.714), after "the derived
fixture forms", add "chained after `'@pop×k'` and item 114's `'@economy<e>'`, in the order `@economy`, `@magic`,
`@magicLevel`".

**VC-2 — The routing gives item 115 a determinism §6.2 part that item 115 says does not exist.**
*Evidence:* 115 (h) determinism (items l.674) reads "§6: no part." The routing's determinism item-115 part (l.87) reads
"§6.2: the recipe's magic priority among the recorded inputs". Its states line (l.98) reads "114+115+116: §6.1 …; §6.2
recorded inputs", and the canon's per-unit determinism entry (l.114) includes §6.1 – §6.2. The routing is right on
substance: the corrected item 115 adds `Intent.magicPriority` to `Recipe.intent`, a recorded input like item 114's economy
priority.
*Change:* in 115 (h) (items l.674), replace "§6: no part." with "§6.2's recorded inputs gain the recipe's magic priority,
beside item 114's economy priority."

**VC-3 — V05 STATES decisions that the canon homes elsewhere and lists V05 only as citing.**
*Evidence:* the routing's V05 STATES include "115: §3.2 (1), (3), (4), (5)" (l.269: the parity clause dropped, the forced
slots, the gate before the count), "§3.15 (4), (5); wane under magic none; access conversion" (l.270), "§4.1 T1 row with
the Magic; §4.2 declaring rule and held fates" (l.271) and "§4.4 DR27 inputs and coherence" (l.272). 115 (h) V05 (items
l.684–689) says the same. The canon homes these elsewhere:
- the parity clause, forced slots, count after the gate, wane and access conversion at pipeline II.6, cited by V05
  (canon l.81);
- the DR27 inputs at determinism's derivation table, cited by V05 §4.4 (l.77);
- the held fates at determinism §7.4, cited by V05 §4.2 (l.93);
- the T1 binding row at determinism §7.1 (routing l.95).

The canon already splits rules from their build for the underground (l.90: "pipeline II.7 … (rules); V04 §3.5.3 and
U-FORECAST (build)").
*Change:*
1. Canon l.81: after "pipeline II.6 (and S7b (5), §4.11)" add "(rules); V05 §3.2 (3)–(5) and §3.15 (4)–(5) (build)".
2. Routing V05 STATES l.269–270: rename the two lines to "§3.2 (3)–(5) and §3.15 (4)–(5) built as II.6 states them".
3. Move "§4.4's DR27 inputs", "held fates" and "§4.1 T1 row with the Magic" from V05's STATES to its REFERENCES, as
   "DR27 (determinism)", "fates (§7.4)" and "§7.1's T1 row". V05 keeps "§4.2's declaring rule" and "§4.4's coherence
   (absorb wane withdrawn)".
4. In 115 (h) V05 (items l.684–689): change "§4.4's DR27 inputs and coherence restated" to "§4.4's coherence restated,
   citing DR27's inputs"; change "§4.2's declaring rule and fates" to "§4.2's declaring rule, citing §7.4's fates"; and
   move "§4.1's T1 row gaining the Magic" to REFERENCES ("§7.1's T1 row").

**VC-4 — The `ceiling` cell's parity entries have three stating units; the canon names one home.**
*Evidence:* the canon homes "the table's default rows, parity entries and limits" at pipeline §4.5 (l.71). The pipeline
STATES them (items l.332–333; routing l.49). Determinism STATES them too: 114 (k) reads "§7.6's `ceiling` cell with its
parity entries" (items l.349–350; routing l.87, l.98 "114+116: §7.6 ceiling cell parity entries"). So does V11: "row 6's
`ceiling` cell … its parity entries" (items l.386; routing l.453 "presets entries MFCG, FTG, VG; NG by MFCG; FM none").
*Change:* keep the entries stated at §4.5 only.
1. 114 (k) determinism (items l.349–350): write "§7.6 lists the `ceiling` cell among the cells that carry `presets`
   entries, citing §4.5 for them".
2. 114 (k) V11 (items l.386): write "its `presets` entries as §4.5 states them".
3. Routing determinism STATES l.98: write "114+116: §7.6 the ceiling cell listed (entries §4.5's); …".
4. Routing V11 part l.453: replace "presets entries MFCG, FTG, VG; NG by MFCG; FM none" with "presets entries as §4.5
   states them".

**VC-5 — Literal 75s where the editable `gate` cells rule: once an author edits them, the buttons and words are wrong and
T115-6 fails.**
*Evidence:* `gate.magicMin` and `gate.economyMin` are `own`, open to `editTable` and not bound by the stamp (115 (b)). Yet:
- `button.magicHigh` commits `adjust('intent.magicPriority', 75)` and `button.economyHigh` commits
  `adjust('intent.economyPriority', 75)` (items l.556–557).
- `info.islandsGated` and `refuse.islandsDossier.economy` / `.both` say "75 or more" (l.553–561).
- Item 114's Economy registry row has "a declared owner step at 75" (l.57), and the canon's registry row has "stepped at
  75" (l.70).

With `gate.economyMin` at 80, one click on `button.economyHigh` leaves the gate closed, against T115-6 ("one click on each
… opens the gate").
*Change:*
1. The commits become `adjust('intent.magicPriority', gate.magicMin)`, applied where the magic priority is below
   `gate.magicMin`, and `adjust('intent.economyPriority', gate.economyMin)`.
2. The three messages take `{magicMin}` and `{economyMin}` arguments in place of "75".
3. 114 (a) 4 (l.57) reads "item 115's economy clause, a declared owner step at `gate.economyMin` (75 by default)".
4. 115 (a) 2 keeps the control's own word step fixed at 75, as it already says.
5. Add to T115-10: "with `gate.magicMin` and `gate.economyMin` edited to 80, `button.magicHigh` and `button.economyHigh`
   each open the gate in one click, and the messages name 80".

**VC-6 — J128 and the owner entry misstate item 116's very-rich consequence; J126's reason overstates it.**
*Evidence:* 116 (f) (items l.1005–1012) says that below economy 50 the rich band shrinks, and that there is "no rich band
at all at 33⅓ and below". Between those points a TOWN's very rich take river-borne stone from economy 45.3
(`cap-stone.txt`). At 33⅓ and below, sea-borne stone still reaches the top from a partner within about 17, 29 or 42 km.

The bundle's other files say otherwise:
- J128 (j-rows.md): "so a town capped below `rich` has no very rich and builds no house or institution of river- or
  road-borne stone".
- The owner entry (l.32): "a town item 114 caps below `rich` has no very rich, so no traded stone for its houses".
- J126's reason column: "the very rich who alone pay for traded stone". This contradicts 116 (g)'s adopted reading, "a
  traded material reaches only the builders whose means pay its landed price … a cheap sea-borne family reaches further
  down", and plain-summary choice 41.

*Change:*
1. J128: "so a town capped at `prosperous` or lower (an economy of 33⅓ or less on the default table) has no very rich and
   builds no house or institution of river- or road-borne stone, and of sea-borne stone only from a near partner".
2. Owner entry l.32: "a town item 114 caps at `prosperous` or lower (an Economy of 33 or less) has no very rich, so no
   house there of stone brought by river or road (sea-borne only from a near port)".
3. J126 reason: "… and with them, by item 116, the very rich, whose purse alone reaches river- and road-borne stone at
   the defaults".

**VC-7 — `AccessKey` is used as a type but declared nowhere.**
*Evidence:* 116 (c) (items l.904) types `DossierDigest.economy.partners[].access?: AccessKey` and calls it "V08's
union". No `AccessKey` exists in the set (`vc-census`: 0). §14 types `site.access: string` (07-s14.md l.244). V08's
`access` row (V08 l.769–772) is a list of words: `road`, `crossroads`, `river`, `port`, `isolated`, `none`,
`mountain_pass`, else `road`.
*Change:* in 116 (c), write `access?: string /* a word of V08 §2.6's access row; an unknown word reads road, noted
unmapped_word */`, matching `site.access`. Alternatively, declare `type AccessKey` once, at §14 beside `DossierDigest`,
retype `site.access` to it, and add that line to the scope routing's §14 part.

### Minor

**VC-8 — The routing gives V08 a §2.5 part that no item names, and so gives the digest additions a second declaring
home.**
*Evidence:* the routing's V08 shared part (l.358) lists "§2.5's digest additions (settlement.economyPriority?, …,
economy.partners[].exports?/resources?/access?)". No item gives V08 a §2.5 part: 114 (k), 115 (h) and 116 (r) V08 name
the adapter rows, §2.6, §3.5, §4.6 and §2.7. The canon homes the additions at scope §14 (l.96), and its V08 row (l.97)
leaves out §2.5. V08 §2.5 is where V08 has declared "additions to §14's DossierDigest" (V08 l.677–682).
*Change:* in the routing's V08 part, replace "§2.5's digest additions (…)" with "§2.5 cites §14 for the digest additions
of the three items (no declaration)". The REFERENCES entry "§14 (DossierDigest, PortNote kinds)" is already present.

**VC-9 — Paving's gate has two stating units.**
*Evidence:* the canon homes "paving's gate over the surface table" at V01 §3.7.3 and lists pipeline S10a as citing it
(l.89). Yet 116 (r) pipeline STATES "S10a's surface gate over V01's table" (items l.1532), and so does routing l.59
("S10a surfaces"). V01 also STATES it (items l.1547; routing V01).
*Change:* in 116 (r)'s pipeline row and the routing's pipeline part and STATES, move "S10a's surface gate" to REFERENCES
as "S10a runs V01 §3.7.3's gate". The REFERENCES entry "V01's surface table" is already there.

**VC-10 — The prelude order is STATED by V06 as well as by pipeline §4.11.**
*Evidence:* the routing's V06 part (l.297, "Shared: EVO_PRELUDE's steps in §4.11's one order — …") restates the order,
and its STATES list (l.310) has "shared: EVO_PRELUDE order". The canon homes the order at pipeline §4.11 and says "V06
(EVO_PRELUDE builds it)" (l.79).
*Change:* routing V06 STATES l.310 becomes "EVO_PRELUDE built in §4.11's order". In the part's shared paragraph, delete
the restated list after "§4.11's one order".

**VC-11 — The Wealth key's closing line has two stating units and no key id.**
*Evidence:* the canon homes "the Wealth key's closing line ('Richest here: {band}')" at rendering §8.2 and lists V09 as
citing it (l.95; g114-115's ruling: "rendering §8.2 | V09 §5.4"). Routing V09 STATES "114: Wealth view legend line"
(l.399), as does 114 (k) V09 (items l.384). Every other user line of the three items has a V09 key; this one has none.
*Change:* in 114 (k) V09 and the routing, write "the Wealth view shows §8.2's closing line; its words are V09's key
`legend.wealth.richest`". Rendering keeps the rule. In the canon row l.95, add "(words: V09's `legend.wealth.richest`)".

**VC-12 — Both determinism and V09 say they state the advanced panel's grouping "once".**
*Evidence:* determinism's "Shared (stated once here)" paragraph (routing l.87) includes "the advanced panel groups them by
consuming stage (V09 §4.14): Site — Economy, Wealth level, Trade; Programme — Magic". V09's shared paragraph (l.392) also
states the placement. The canon homes it at V09 and lists determinism §7.8 as citing it (l.98).
*Change:* take that sentence out of determinism's "stated once here" paragraph. Put in REFERENCES: "V09 (placement)".

**VC-13 — The canon gives scope §1.2 a default that neither the routing nor item 116 routes there.**
*Evidence:* canon l.69 homes "the one-click defaults (… ; the materials switch on)" at scope §1.2. The routing's scope
STATES list only "114+115: §1.2 defaults" (l.150), and 116 (r) scope names §1's buildings row (§1.4's table), not §1.2.
*Change:* §1.2 is "stated once" for defaults, so add "116: §1.2 the materials switch on (item 116's supply model) in the
one-click default" to the routing's scope STATES and to 116 (r)'s scope row. The alternative is to strike "the materials
switch on" from canon l.69.

**VC-14 — The canon lost `painterly`'s home and now contradicts the routing.**
*Evidence:* g116's ruling homed "`painterly`'s material role values" at V07 §5.1 and listed rendering as citing it. The
bundle canon has no such row, and lists "V07 (`painterly`)" as citing rendering's row (l.95). Routing V07 STATES
"roof.palette and painterly values", and routing rendering's REFERENCES include "V07 (painterly values)".
*Change:* restore the row "`painterly`'s material role values | V07 §5.1 | rendering". In canon l.95, strike
"V07 (`painterly`)" from the citing units.

**VC-15 — The canon says all its listed ids are new except one; two more already exist.**
*Evidence:* canon l.180 says "Every id above is new … but `frozen_fact_changed`". Two ids in its table already exist:
- `BandSet`, named at pipeline §4.5 (01-s4 l.1203) and in V11's registry row 6 (V11 l.867);
- `skyGate`, V05's function (V05 l.353, §3.2).

The consistency report §3 notes `BandSet`.
*Change:* canon l.180 reads "… but `frozen_fact_changed` (W-DOS-08's note, reused), `BandSet` (named in §4.5 and V11
row 6, declared here for the first time) and `skyGate` (V05 §3.2 (1)'s function, re-specified)".

**VC-16 — "From economy 45" disagrees with its own receipt.**
*Evidence:* 116 (f) (items l.1012) and consistency-report C4 say "reaches the very rich from economy 45".
`cap-stone.txt` gives "economy 45.3". At 45 the top means is 8.35, below the 8.46 that 0.8 × 10.575 requires.
*Change:* "from an economy of about 45⅓ (45.3; receipt …)" in 116 (f) and C4.

**VC-17 — The plain summary disagrees with the items and with itself.**
*Evidence and change:*
1. Choice 3: "17 → 'comfortable', 34 → 'prosperous'" gives `button.economyUp`'s "reached whole" values as caps. At 34 a
   sliver of `rich` is allowed, which contradicts choice 48 ("33 or less … no top tier"). Write: "Economy 0 → at most
   'modest'; up to about 17 at most 'comfortable'; up to 33 at most 'prosperous'; 50 and above no cap; smooth between."
2. Line 18: "below about 33" disagrees with choice 48's "33 or less". Write "33 or less".
3. Choice 10: "so surprise towns look as before" contradicts 114 (a) 2 ("below 50 it now has a prosperity ceiling").
   Write: "so a surprise town's overall wealth is drawn as before; below 50 its top tiers are now capped."

**VC-18 — `bend.material.*` names a family of keys with no bend behind it.**
*Evidence:* 116 (r) V09 (items l.1544) and routing V09 (l.392) list `bend.material.*` among the catalogue keys, but no
bend on a material is defined anywhere in item 116. Material edits are honoured with `material_edit_unsupplied`, and
`MaterialSupply` has "no edit kind". g116 `review-wiring.md` l.179 found the name in the draft and nothing gave it a
rule.
*Change:* define the one bend, as item 114 defines `bend.ceiling.follows`:
1. In 116 (p): "a `setAttr` naming `Document.derived.materialSupply` bends with `bend.material.supplyFollows` — 'The
   materials follow what the land, the ruins and trade supply.' — and the Trade control's button".
2. In (r) V09 and the routing, list `bend.material.supplyFollows` in place of `bend.material.*`.

Alternatively, strike `bend.material.*`.

**VC-19 — The same word, "supply", names two concepts in newly minted ids.**
*Evidence:* item 114 mints `held_against_supply` and `fate.held.supply` for II.6's island supply law (items l.244; canon
l.93). Item 116 mints `SliceRef.kind 'supply'`, `materials.supply.enabled`, `partner_no_supplies` and
`material_unsupplied` for the material supply. The consistency report (C10; §5) kept the name because "the gloss removes
the ambiguity at less cost than a rename across V05, V09 and the fates". But both fate ids are new (`vc-census.txt`: 0).
V05 has only the words "held against its supply", which stay either way.
*Change:* rename the two new island ids to `held_against_island_supply` and `fate.held.islandSupply` in 114 (h), 115 (d)
4, routing (determinism, V09) and the canon (l.93 and the new-ids table). The gloss is then no longer needed.

**VC-20 — The mass `timber` collides with the retired material id `timber` in the Works keys.**
*Evidence:* `MaterialMass = 'masonry'|'timber'|'earth'` uses the same tokens as `MaterialFamily` (items l.767–768). 116
(i) Works (l.1199) reads `WorksRow.material` and `WorksTable.pauses.material` as "a material id or its mass …, an id's
row winning". But §7.5 reads a stored id `timber` as `boards` (l.1389), so a Works key `timber` is either the alias or the
mass. The base's pause rows are described as "masonry, stone and brick" (01-s4 l.3670), and `stone` is neither an id nor
a mass.
*Change:* in 116 (i) Works, write "a key `masonry`, `timber` or `earth` is the mass; any other key a material id (the
`timber` → `boards` alias applies to stored material fields only); the base's pause rows re-keyed by mass (`stone` →
`masonry`)". Add the re-key to 116 (r) V11's row list.

**VC-21 — The registry rows of 115 and 116 lack fields §7.8 requires, and "stepped" is not a continuity class.**
*Evidence:* §7.8 (03-s7 l.1943–1950) requires each row's output metric, range, consuming stage, locality class,
continuity class (*continuous* or *discrete*) and anchor. Item 114's Economy row has all of them. The other rows do not:
- `intent.magicPriority` (items l.446–448) has no output metric and is "stepped", as is the canon's "stepped at 75"
  (l.70);
- `circumstances.magic` has no label, metric or anchor;
- `circumstances.trade` (l.1424–1426) has no label, metric or levels;
- the `fissile` and `lead` toggles have no metric or anchor.

*Change:* give each row the full set.
1. `intent.magicPriority`: continuity *discrete*, levels [0, 75) and [75, 100], shown as a stepped slider; output metric
   "the magic in force's word (standalone) and the gate's magic clause".
2. `circumstances.magic`: label "No magic in this world"; metric "the magic in force"; anchor II.6.
3. `circumstances.trade`: label "Trade"; levels "the declared partners"; metric "the families traded"; anchor §7.7.
4. `fissile` and `lead`: metric "`Terrain.fissile` / `Terrain.lead`"; anchor §4.2 S1 (10).

Replace "stepped" with "discrete" in 115 (a) 2, the routing's determinism part and the canon (l.70).

**VC-22 — Item 116's held fate for a locked element has no reason id; items 114 and 115 name theirs.**
*Evidence:* 116 (l) and (o) say only "a locked one holds, its fate listed" (items l.1283, l.1369). Items 114 and 115 name
`held_above_ceiling` and `held_against_*`, each with a `fate.held.*` key, and the canon's fates row lists only those
four (l.93).
*Change:* in 116 (l), write "its fate `EditFate { fate: 'kept', reason: 'held_against_materials' }`, V09's
`fate.held.materials`". Add it to the canon's fates row and to routing determinism §7.4 and V09.

**VC-23 — The report's example names a word the record does not carry.**
*Evidence:* `SkyGate.failed[].value` holds "the magic in force", which V08's row maps `moderate` to (`low`). Yet the
examples of `report.islands.clause` (items l.433 and l.503, routing V09, consistency report §1) read "magic moderate,
slider 50 — SettlementForge". `refuse.islandsDossier.magic`'s `{magic}` would likewise print "low" for a SettlementForge
"moderate" world.
*Change:* the example reads "magic low, slider 50 — SettlementForge". If the DM should see SettlementForge's own word,
add `word?: string` to `SkyGate.failed[]` (the magic clause, from the carried raw word) and to V08's carried site fact,
and write the example as "magic low (SettlementForge: moderate), slider 50".

**VC-24 — `islands_gated`'s §5.4 row lacks its class cell.**
*Evidence:* §5.4's table gives each code a class and a landing (01-s5 l.277). Item 116 gives all thirteen of its codes
both. Item 115 gives `islands_gated` only its landing (`requestedVsBuilt`, items l.499–501).
*Change:* 115 (c) and (h): "§5.4's row `islands_gated` | the island gate closed (II.6; item 115), an outcome, never a
failure | `requestedVsBuilt`".

**VC-25 — "Recorded" and "unrecorded" describe the same three sample cards.**
*Evidence:* J127 says "meet the gate at their unrecorded values". T115-2 (items l.624) says "at its recorded values", and
routing V08 (l.358) says "at their recorded values".
*Change:* all three read "at the values their dossiers carry (not recorded by the survey)".

**VC-26 — Bare "ceiling" in owner-facing rows, against item 114's term rule.**
*Evidence:* J126 has "the founding ceiling carried" and "let the ceiling follow the slider". The owner entry has "no
ceiling at 50 and above" and "the founding ceiling carries". Item 114 (b) says design text writes "prosperity ceiling",
never a bare "ceiling".
*Change:* write "prosperity ceiling" in all four places.

**VC-27 — The reason given for Surprise me contradicts the rule it explains.**
*Evidence:* canon l.68 and 115 (a) 2 (items l.458) justify leaving `Intent.magicPriority` absent with "Surprise me draws
intent only". The magic priority is an intent.
*Change:* "Surprise me draws the economy priority in the wealth level's place and no other new intent; the magic priority
acts only through the world's magic, a circumstance Surprise me leaves."

**VC-28 — The routing adds item 114 to §7.1's T1 binding row, which item 114 does not name.**
*Evidence:* routing determinism STATES l.95 reads "T1 binding row (Economy, Magic)". 114 (k) determinism names §7.1's
early-parameter list, its edit-target row and the T5 sugar. Item 114's T1 row is §14's ("drag the Economy slider"),
routed to scope.
*Change:* write "T1 binding row (Magic)" there, or add "§7.1's T1 binding row (the Economy in the wealth slider's place)"
to 114 (k) determinism.

**VC-29 (PLAUSIBLE) — V12's one `Level` declaration can set magic but has no field for declared trade partners.**
*Evidence:* item 115 adds `Level.magic?`, a circumstance, and the routing makes it "one declaration" (l.482). Item 116's
bars on V12's bar-map rows (T116-4 – T116-7, T116-16 – T116-21) need fixtures with declared partners, such as "a river
partner that has stone". V12's `Level` has `site?`, a flat record, and `dossier?`, but nothing for partners
(V12 l.751–756).
*Change:* add `trade?: TradePartner[] /* declared partners, source 'declared' */` to the one `Level` declaration (routing
V12 shared; 116 (r) V12), or name the mechanism these fixtures use.

**VC-30 (PLAUSIBLE) — The `fissile` and `lead` toggles have no stated place beside the twelve-control budget.**
*Evidence:* 116 (p) puts them on "the site card" (items l.1426), which is T1's basic sheet (V09 l.1566). The canon's
placement row (l.98) says the basic panel keeps twelve controls but does not place the toggles.
*Change:* in the canon placement row and in 116 (p) / (r) V09, write "the `fissile` and `lead` toggles sit in the advanced
panel's 'Site' group (consuming S1); on the site card they are part of the site card's one control, as its water setting
and side are".

---

## 3. Note to the program (filing, no defect in the bundle)

The workflow's `lateRouting` default is still `work/g114-115/routing.json` (`18-coherence.js` l.43). The lane-events
log at l.1850 names `work/g114-116-routing.json`, a path that does not exist. The run must pass:
- `lateItems: '114-116'`;
- `lateRouting: 'docs/validation/coherence/work/g114-116/routing.json'`;
- `lateUnits: ['model', 'pipeline', 'determinism', 'rendering', 'V03', 'V04']` — no kernel, matching its `none`.

---

## 4. Required changes, by file

- **items-114-116.md:**
  - 114 (a) 4 (VC-5, VC-21).
  - 114 (h) (VC-19).
  - 114 (k): determinism (VC-4, VC-28), V09 (VC-11), V11 (VC-4).
  - 115 (a) 2 (VC-21, VC-27).
  - 115 (c) (VC-24).
  - 115 (d) 4–5 (VC-5, VC-19).
  - 115 (g) T115-2 (VC-25), T115-5 (VC-1), T115-10 (VC-5).
  - 115 (h): determinism §6 (VC-2), V05 (VC-3), V12 (VC-1).
  - 116 (c) (VC-7).
  - 116 (f) (VC-16).
  - 116 (i) Works (VC-20).
  - 116 (l) (VC-22).
  - 116 (p): bends (VC-18), registry (VC-21, VC-30).
  - 116 (r): pipeline (VC-9), scope (VC-13), V09 (VC-18, VC-30), V12 (VC-29).
- **routing.json:**
  - V12 (VC-1, VC-29).
  - determinism (VC-2, VC-4, VC-12, VC-21, VC-22, VC-28).
  - V05 (VC-3).
  - V11 (VC-4).
  - V08 (VC-8, VC-25).
  - pipeline (VC-9).
  - V06 (VC-10).
  - V09 (VC-11, VC-18, VC-19, VC-22).
  - scope (VC-13).
- **canon-ruling.md:**
  - l.68 (VC-27).
  - l.69 (VC-13).
  - l.70 (VC-5, VC-21).
  - l.81 (VC-3).
  - l.93 (VC-19, VC-22).
  - l.95 (VC-11, VC-14).
  - l.98 (VC-30).
  - l.103 (VC-1).
  - the restored `painterly` row (VC-14).
  - l.180 (VC-15).
- **j-rows.md:** J126 (VC-6, VC-26), J127 (VC-25), J128 (VC-6).
- **owner-instructions-entry.md:** l.32 (VC-6); the "ceiling" wording (VC-26).
- **plain-summary.md:** l.18, choices 3 and 10 (VC-17).
- **consistency-report.md:** §1 (g) row (VC-1), C4 (VC-16), C10 and §5's rationale (VC-19).
