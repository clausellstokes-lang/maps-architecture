# Review of item 116, lens: owner words and conflicts

Reviewer's note, 2026-09-30. Subject: `docs/validation/coherence/work/g116/item-116.md` (529 lines), read whole, with
`draft-notes.md`, `read-owner-decision.md`, `read-base.md`, `read-sf.md` and `read-vols.md`. I checked every claim below
against the design files themselves: the coherence pass's base sections under `docs/validation/coherence/new/base/`, the
volumes, the amendment files b, c and g, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, `docs/DEFINITION.md`,
`docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`, `docs/PROGRESS.md`, `docs/lane-events.log`, and the 114–115 draft in
`work/g114-115/items-114-115.md`. Line numbers refer to those files. "Item L" means line L of `item-116.md`.

**Verdict.** The draft quotes the owner exactly and gets the core of the ~01:10 refinement right. (b)'s "What never
licenses" and T116-3's exact bound of 0 mean no rung, growth, access key or generic import can create a non-native
material. It also correctly keeps item 19's "texture and colour, never shape" for buildings.

I found five major defects:
1. It exempts institutions from the neighbourhood band range. That contradicts owner rule item 72 (d‴), and the conflict
   is neither stated nor ruled.
2. It ignores the dossier records that state a native source: producing institutions, the `Stone Quarrying` income row
   and the settlement's own chains. This contradicts item 20 (b) and (h).
3. It misstates the conflict with item 19. The quote it gives is §2.6's, not item 19's. It overstates the default as
   "owner-approved". It leaves item 19's "never a universal ladder" and the roof-colour-by-band clause unruled.
4. It rules the conflict with "item 23's rows", which do not exist, instead of with the owner's own words ("emulation
   first") and §7.6's "tendencies, never fixed laws".
5. Its defaults do not reproduce the owner's first example: cob is the floor wall even where timber is native. The
   worked table also contradicts its own bar T116-5.

Sixteen further defects are listed below, from medium to minor.

---

## A. Defects and required changes (most severe first)

### R1 (major). Institutions are exempted from the neighbourhood's bounds, against owner rule item 72 (d‴)

**Evidence.**
- Item 186–189: "a class whose `MaterialPreference` row gives a `prestige` reads `M = means.top × prestige ×
  patronage × rungMeans` … and is not clamped by its district's range — an institution builds with its own purse, not
  its street's".
- The same exemption recurs:
  - item 294–296 (institutions bullet);
  - T116-29, item 484–485: "houses never outside their district's range, institutions not bound by it";
  - register J-A116.42, item 505: "institutions outside the band range".
- Owner, item 72 (d‴), `docs/AMENDMENTS-2026-09-27c.md:1174-1176`: "this neighborhood prosperities defines the bounds
  (floor, and ceiling) of what any building inside of it can be. So any amplifier specific to the institution regarding
  its prosperity let's stay with the neighborhood bounds until the neighborhood itself upgrades".
- Base §4.5 (5), `pipeline/01-s4-generation-pipeline.md:1422-1430`: "Every prosperity-driven state of a building inside
  the district stays in the range".
- Base §4.5 (8), `:1479-1485`: "What a dial or any building-specific amplifier would push past the range is kept" as
  `District.pressure`.
- The owner's new rule itself pairs material with "neighborhood prosperity".
- The only reason given is `draft-notes.md` D19: "the task's 'institutions funded above their neighbourhood'". That is
  computed task text, not the owner's words.
- `read-base.md` C3 and C6 had already warned that no institution exception exists.

**Defect.** Under item 116 a material is a prosperity-driven state of a building. Prestige and patronage are exactly "an
amplifier specific to the institution regarding its prosperity". The exemption therefore contradicts an owner rule and
the base's clamp. Item 116's words do not supersede (d‴): they reinforce it. The conflict is not even stated.

**Required change.**
1. In (f), replace the institutions sentence with the following.
   - An institution's means is its plot's means, read inside its district's band range, raised by `prestige ×
     patronage` and clamped at the range's ceiling band's `hi` (and its floor band's `lo`).
   - The amount the amplifier would push past the ceiling enters `District.pressure` by §4.5 (8). A richly endowed
     church therefore lifts its neighbourhood over epochs, and the neighbourhood's upgrade widens what the church can
     be rebuilt in.
   - State why: item 72 (d‴), quoted.
2. Keep works (walls, bridges, harbour works, raised ways, civic retaining walls, linings, paving) on the works means.
   State the reason: they are not "a building inside" a neighbourhood.
3. Treat the keep and the castle's buildings as buildings of their district. They are clamped the same way.
4. Amend T116-29 to "institutions and houses within their district's range; prestige moves an institution within it and
   its excess reaches the district's pressure".
5. Amend J-A116.42 to match.
6. Recompute the worked parish-church examples at item 213–214 and in (i).

### R2 (major). Dossier records that state a native source are not read, against item 20 (b) and (h)

**Evidence.**
- (b)'s native table, item 78–86, reads only a dossier deposit and the raster (plus toggles).
- SettlementForge has producing institutions that bind to our producer classes (`docs/volumes/V11-content.md`):
  - `stone_quarry` (H, V) → `quarry` (:2413);
  - `woodcutter_s_camp` (T) → `lumber_camp` (:2528);
  - `brickmaker` (V) → `brickworks` (:2372);
  - `thatcher`, `peat_cutter`, `sawmill` (`read-sf.md` §7, lines 373-400).
- The `Stone Quarrying` income row appears in 29 of 155 dossiers (`read-sf.md:304-305`; `research/sf/mapping.md:317`).
- `read-sf.md:566` names "the deposit, the terrain row, the `Stone Quarrying` or `Timber Trade` income rows and a
  `raw_extraction` chain" as the dossier's signals.
- Item 20 (b), `docs/AMENDMENTS-2026-09-25b.md:161-162`: everything the dossier specifies EXISTS on every map.
- Item 20 (h), `docs/OWNER-INSTRUCTIONS-2026-09-25.md:132`: "better if the rest of the map code coherently derives things
  from the dossier".
- Item 339–340: "§4.9 sites quarries, clay pits and lumber only on native sources".
- T116-14, item 464: "no `quarry` where it is not native".

**Defect.** Suppose a dossier village lists a `stone_quarry` institution, or a town earns from `Stone Quarrying`, and
lists no `stone_quarry` deposit on a site whose raster has no stone cell within 2 km. Then:
- the item's rules deny stone;
- the map shows a quarrying town built of no stone;
- a quarry must be placed (item 20 (b)) that §4.9 and T116-14 forbid.

The research does not establish whether SettlementForge always lists the deposit beside these records (`read-sf.md` §7
marks the reading P), so the item must rule the case either way.

**Required change.**
1. Add a dossier-records column to (b)'s table. Each of these makes its family native by land, with S1 raising the
   raster's floor exactly as a deposit does, and reason code `native_record` added to (d)'s list:
   - a dossier-backed extraction institution (`quarry` → stone; `lumber_camp` → timber; `peat_works` → the kiln fuel;
     `claypit`, where a kind binds to it → clay);
   - the `Stone Quarrying` income row → stone;
   - an active chain of the settlement's own whose `resourceKey` is a deposit of the family.
2. Rule the processors explicitly (`brickworks`, `sawmill`, `thatcher`, `Timber Trade`). Recommended: they state demand,
   not a source. They are served by a native source or a partner's store; otherwise they are reported under
   `material_unsupplied`, and they exist regardless (item 20 (b)).
3. Qualify (k) and T116-14 to "map-derived producers only; a dossier-backed producer always exists and, if extractive,
   makes its family native".
4. Extend T116-12 with the record cases.
5. Add the income row and the institutions to DR41's inputs in (r)'s determinism row.

### R3 (major). The conflict with item 19 is mis-quoted, overstated and incomplete

**Evidence.**
- Item 362–364: "Item 19 (owner-approved default) says wealth shows 'through the lifestyle-banded building pools and
  the roof-colour role by band … never by a material keyed to the prosperity band'".
- Those words are the base's §2.6 *Materials* rule (`new/base/model/01-domain-model-and-schemas.md:1166-1169`). The
  "absent from every default row" clause is `MaterialRow`'s comment (`:845`).
- Item 19's own text, `docs/AMENDMENTS-2026-09-25b.md:139-146`: "(emulation baseline: FTG sets one default material per
  stage … with wealth expressed through lifestyle pools and roof colour …; DEFAULT: that FTG model; our optional
  regional table may shift materials with prosperity within what the region builds with — never a universal ladder; a
  MATERIAL IS A RENDERING ATTRIBUTE ONLY …)".
- Item 19 (a) lists "materials and roofing" inside each designation's PROSPERITY-SCALED TEMPLATE (:137-139), under the
  owner's words "They should scale appropriately in size and structure … this goes for all of the buildings across
  prosperity bands" (:135-136).
- The FTG default came from J28 (`docs/PROGRESS.md:86`, `:533`): the program's application of the owner's 2026-09-26
  "emulation first" instruction, not an owner approval of FTG's material model.

**Defects.**
- (i) The quote is attributed to the wrong text.
- (ii) "Owner-approved default" overstates its standing.
- (iii) The item does not say that the owner's item 19 words, and item 19 (a)'s "materials and roofing" in the
  prosperity-scaled template, AGREE with pairing material to prosperity. Only the emulation default (J28) and the
  program's §2.6 wording conflict.
- (iv) Item 19's "never a universal ladder" is not ruled, although (g) introduces a cost order.
- (v) Retiring the roof-colour role by band from the default `lit` sheet ((n), item 380–383) supersedes the other half of
  item 19's wealth clause. (m) never says so; it says only "item 19's band clause".

**Required change.** Rewrite (m)'s first sentence in this substance:
- "Item 19's default (J28: the program's application of the owner's 2026-09-26 'emulation first', item 19's
  parenthesis in file b, restated in §2.6 as 'never by a material keyed to the prosperity band', and `MaterialRow.key.band`
  'absent from every default row') conflicts with the newer owner rule and is superseded as the DEFAULT.
- Item 19's owner words and its (a), which put 'materials and roofing' in the prosperity-scaled template, agree with item
  116.
- 'Never a universal ladder' holds: the cost order of (g) is per settlement, set by its supply, routes and the climate,
  culture, era and region rows, so no material sequence is fixed across settlements.
- The roof-colour role by band leaves the default sheets and is kept under the FTG parity preset (J-A19.81)."

Keep the rest of (m).

### R4 (major). The emulation-first conflict is ruled against "item 23's rows" instead of the owner's words and §7.6

**Evidence.**
- Item 365–366: "supersedes, as the DEFAULT, … item 23's FTG-reproducing material rows".
- Item 23 (`docs/AMENDMENTS-2026-09-25b.md:216-221`) has no material rows. It states the owner's words ("I still want it
  to be based in our base of MFCG and FTG emulation first") and two rules:
  - every DEFAULT reproduces MFCG and FTG;
  - "our extensions are layered on top as data-driven tendencies with chance or as options — never as fixed laws or
    fixed orders".
- §7.6 restates both, with the reading rule that "never" means "by default, as a table value"
  (`new/base/determinism/03-s7-editing.md:1316-1333`).
- (r)'s determinism row, item 503, gestures at "the reading rule's exception (item 23's material default superseded)"
  without saying what the exception is.

**Defect.** The conflict with the owner's own 2026-09-26 words is not quoted, so it is not visibly ruled.

The refinement ("cant have … or grow to have them until and unless") is an absolute. T116-3's exact bound of 0 is not a
tendency with a chance. That breaks item 23's "never as fixed laws" and needs its own ruling.

It is also not stated plainly that the refinement does not bind under a parity preset or with the switch off.

**Required change.**
1. Add to (m) a sentence quoting the owner's 2026-09-26 "I still want it to be based in our base of MFCG and FTG
   emulation first".
2. Rule that the 2026-09-30 rule prevails for the material default (newer owner rule), and that emulation is kept where a
   parity preset asks ((n)).
3. Add a sentence stating that the licence is an absolute of the model while `materials.supply.enabled` is on (the
   owner's "cant … until and unless"). It is the one exception to §7.6's "tendencies, never fixed laws". The reading rule
   is satisfied only in that the whole model is a cell that a preset or the author may switch off.
4. Say in (n) that under `MFCG`, `FTG`, `VG`, `NG` and with the switch off, the refinement does not bind (origin `rows`).
5. Replace "item 23's FTG-reproducing material rows" with "the FTG-reproducing default rows (V11 §3.19.3) that item 19's
   default and item 23 made the default".
6. Spell out the determinism row's "reading rule's exception" in the same words.

### R5 (major). The defaults do not reproduce the owner's first example, and the worked table contradicts T116-5

**Evidence.**
- Owner: "if you are in a river nearby a forrest for timber but no quarry, then most building material is going to be
  wood based". The owner's second example is a two-material order: wood cheaper, "the more expensive material stone".
- (b) makes earth native on every site (item 86), and (a) makes cob the cheapest wall (1.0, item 51).
- The worked table therefore gives the owner's forest case these rows (item 221–222):
  - squalid "cob" (100 % earth);
  - poor "cob 60 · wattle 40".
- T116-5, item 450–451: "woods, no quarry, no partner: … walls of timber mass ≥ 85 %". `cob`'s mass is earth (item 51).
  So T116-5 holds only if squalid + 0.6 × poor ≤ 15 % of buildings, which neither the item nor V11's band shares
  establish.
- The FTG parity rows the item replaces make the poorest timber-based: the shanty row is "wattle_daub 0.6, timber
  (boards) 0.4"; the outer stages carry cob at 0.1 at most (`docs/volumes/V11-content.md:3377, 3380`).

**Defect.** In both of the owner's examples, the poorest quarters are earth-walled by default. That is a departure from
the owner's picture which the item neither makes hold robustly nor states as an interpretation. The worked outcome and
bar T116-5 also disagree.

**Required change.** Pin one mechanism so that where timber is native by land, the cheapest admitted house wall is of
timber mass (wattle and daub, boards or log). Recommended: earth walls (`cob`, `adobe`) are admitted for houses only
where timber is not native or the climate row is arid, or earth walls' cost takes a factor where timber is native. Then:
1. Recompute the worked table's first and third rows.
2. Make T116-5 agree with the table.
3. Add a bar that on the owner's example fixture ≥ 50 % of walls are timber mass in every band below comfortable.

If the program keeps the earth floor instead:
1. Mark it as a vetoable departure from the owner's example, with its reason (cob and mud hovels).
2. Lower T116-5 to what the table gives.
3. Show that "most … wood based" still holds over all buildings.

### R6 (medium). The owner's wealth words are never mapped onto bands, and T116-10 contradicts the worked table

**Evidence.**
- The owner writes "the very rich", "the richer areas" and "the middling areas". The item uses these words nowhere as
  defined terms.
- Bars use bands ad hoc:
  - T116-4, item 448–450: rich; comfortable.
  - T116-10, item 455–457: "the mixed share highest in the comfortable and prosperous bands".
- The worked table, item 220, gives prosperous "rubble 96 · timber frame 4" with no mixed buildings, and modest none
  either. The owner's "middling" is the middle of six bands, not prosperous.

**Required change.**
1. Add to (f) a vetoable mapping, with its reason (FTG's lifestyle tiers, item 27):
   - "the very rich" = the `rich` band (for traded stone by river, its upper span, means ≥ 0.8 × the traded price);
   - "the richer areas" = `prosperous` and `rich`;
   - "the middling areas" = `modest` and `comfortable`;
   - the poorer = `squalid` and `poor`.
2. Restate T116-4 and T116-10 in those terms:
   - the mixed share, between buildings and within buildings, is highest in the middling bands;
   - the richer bands are ≥ 70 % stone where both are native;
   - traded stone only in the very rich.

### R7 (medium). Works read the richest purse, so the owner's timber town walls itself in imported stone

**Evidence.**
- (f), item 189–191: `W = means.top × rungMeans × works[kind]`, walls 1.0.
- In the owner's own example (woods native, no quarry, a river partner with stone) at TOWN:
  - W = 10 and rubble ≈ 10.6;
  - (g)'s t = (10 − 0.8 × 10.575) ÷ (0.2 × 10.575) ≈ 0.73, so the town's enceinte is imported rubble with probability
    ≈ 0.73;
  - by sea (rubble ≈ 8.55 ≤ 10) it is always rubble;
  - at CITY (W = 11.5) it is always rubble.
- T116-6, item 451–453, bounds houses and institutions only.

**Defect.** The owner reserved traded stone "for teh very rich as they are exotic and expensive to transport". The item
extends that purse, unstated, to whole circuits of wall, which are the largest single volume of stone a town lays. This
is an interpretation of the owner's words, and it is neither stated nor bounded.

**Required change.** State in (f) that public and lordly works are funded at the town's top purse scaled per work, as a
vetoable interpretation with its reason. Then either:
- lower the defaults (for example walls 0.8, so that a TOWN's circuit takes traded stone only by sea and a CITY's by
  river); or
- keep them and say plainly that a river-served town walls itself in imported stone.

In both cases, extend T116-6 to structures on the owner's example fixture.

### R8 (medium). Edits and district overrides let a settlement "grow to have" a non-native material; the conflict is unruled

**Evidence.**
- (l), item 350–355: a `setAttr` of a material and a district's `materialOverride` (retyped as walls and roof shares
  "whose shares its buildings draw directly") WIN "outside the supply", held through regeneration.
- Owner, on editability: "make sure that everything is editable … or if a user wants to change something to fit their
  preference" (`docs/OWNER-INSTRUCTIONS-2026-09-25.md:75-76`). `docs/DEFINITION.md:69`: "Everything is editable … edits
  are permanent … survive regeneration".
- Owner, ~01:10: "cant have non nattive materials or grow to have them until and unless they trade".

**Defect.**
1. Two owner rules meet here, and the item does not state the conflict or rule it. The reason sits only in
   `draft-notes.md` D38.
2. As written, a district override keeps feeding every later epoch's new builds in that district with non-native shares.
   The generator's growth therefore adds non-native fabric with no trade, which is exactly what "or grow to have them"
   forbids.

**Required change.** Add to (l) an explicit ruling, marked vetoable:
- An author's `setAttr` on an element wins on that element (the owner's editability), reported
  `material_edit_unsupplied`.
- A district `materialOverride` binds the buildings standing when it is set and every re-pick inside the supply. At later
  epochs, new builds in that district draw only the override's shares whose families the epoch's supply holds; the rest
  are dropped and the remainder renormalised. If none remains, they take (g)'s pick, reported. So growth never adds a
  non-native material.
- Add a bar to T116-30: 0 new traded or non-native materials from growth under an override on a native-only fixture.

### R9 (medium). The history replay projects today's partners into the past and treats `removed` deposits as once available

**Evidence.**
- (j) (7), item 323–327: "each coarse epoch reads the present partner set (the dossier names no dated partner, and none
  is invented for the past) and treats a deposit listed `depleted` or `removed` today as available in every replay epoch
  before the last".
- `removed` is the dossier's remove of a resource record, not a worked-out source: V08's resource change row reads
  "`remove` → the deposit's state `removed`" (`docs/volumes/V08-settlementforge.md:1572`).
- Item 20 (h) and J77 require derive before invent (`OWNER-INSTRUCTIONS:132-135`).
- SettlementForge's history carries dated trade events (`trade_collapse`, `market_crash`), and item 113 (a) (2) replays
  them (`docs/AMENDMENTS-2026-09-28g.md:726-729, 741-745`).

**Defect.**
1. Projecting the present partner set onto every past epoch asserts that the link existed through the whole history.
   That is an invention about the past, and it contradicts the item's own "none is invented". It is also a choice
   against the strict reading of "until and unless they trade", yet it is not marked as a choice.
2. A `removed` record gives no evidence of past availability.
3. What a dated trade event does to the replay's partners is not ruled.

**Required change.**
1. Drop `removed` from (j) (7). Only `depleted` implies past working.
2. Mark the partner reading as a vetoable choice, with its reason and the alternative. The alternative: a replay epoch
   before the present has no partner, so a peak built before the link is native-only.
3. Reword "none is invented for the past" to say exactly what is assumed.
4. State that no history event adds or removes a partner in the replay, since none names one.
5. Extend T116-24 to cover the chosen reading.

### R10 (medium). Material now changes structure kind and existence; (m) claims item 19's shape clause is "kept" without the reading

**Evidence.**
- (i), item 251–252: "a structure's KIND follows the picked material's mass". The effects include:
  - the enceinte over masonry, `timber` (a palisade) and `earth_bank` (a rampart). Palisade and earthwork are enceinte
    stage rows with their own profiles (§4.8, `pipeline/01-s4-generation-pipeline.md:2669-2670`);
  - the raised way's kind setting `pierSpacingM`;
  - `Bridge.kind`.
- Structures can also be omitted for want of material (item 262–275):
  - `bridge_no_material` (the route takes F-ROUTE's `no_crossing` rung);
  - `pier_no_material`;
  - `raised_no_material`.
- Owner, 2026-09-26: "It has nothing to do with the shape". (m), item 367–368: "Kept: … extended to every structure's
  material within its kind".

**Defect.** For structures the owner's clause is read as "within a kind". Supply and cost now choose the kind, which
moves geometry, and can remove a bridge or a pier, which changes the street network. That reading may well be right: the
base already chooses bridges "stone or timber by era and prosperity rows" (§4.8, `:2677-2678`), and item 110 (b) already
keys pier spacing by masonry or timber. But it is a reading of an owner rule, and (m) presents it as simply kept.

**Required change.** Add to (m), marked vetoable:
- For structures, "never shape" holds within a kind. A structure's kind (a stone or a timber bridge; a masonry wall, a
  palisade or a rampart; a masonry or a timber raised way) is a structural choice that the supply and cost constrain.
- Cite the base precedent above.
- State plainly that a settlement lacking every admitted material gets a ford or no bridge, no pier, and no raised way.
- Point to T116-2 and T116-27 as the bars.

### R11 (medium). "Expand this to all relevant pieces": Works and two boundary pieces are missing

**Evidence.**
- §4.11 *Works* reads material in three places (`pipeline/01-s4-generation-pipeline.md:3669-3677, 3751-3756`):
  - the duration rows ("kind × class … × size … × material");
  - the pauses ("`WorksTable.pauses`: masonry, stone and brick, pauses in winter");
  - the decay factor ("timber and thatch 0.6").
- The item mentions Works only as "a `repair` Works" (item 303). Its new ids (`adobe`, `log`, `mud`, `stone_slate`) have no
  duration, pause or decay class, and a mixed building has no rule for which part keys its Works.
- `read-base.md` A8 listed this.
- `PlotBound.treatment` has `wall` and `railing` (`model/01-domain-model-and-schemas.md:663, 749-751`). Field
  boundaries are hedgerows only (`:139`), where stone country historically walls its fields.

**Required change.**
1. Add a Works bullet to (i) and (j). Each `MaterialDef` gets a duration class and a pause row (earth walls pausing in the
   wet season, masonry in winter, as the base does). A mixed building's Works reads its heavier part. Recommended: a
   traded material adds no duration (keep "expensive" in cost only), or state a lead time, but decide.
2. Add §4.11 *Works* to (r)'s pipeline row and to the HOMES line.
3. Add the new ids to V11's `WorksTable` and decay rows in (r)'s V11 row.
4. Add one sentence naming the pieces deliberately left outside the rule, each with its reason:
   - plot boundary treatments and hedgerows are line roles with no texture (§8.2's boundary-treatment row,
     `rendering/01-s08-rendering-and-the-style-system.md:376`);
   - or, if the program includes them, dry-stone field walls where stone is native.

### R12 (medium). The interpretation choices carry no reasons in the item

**Evidence.**
- The item carries one umbrella "Program's interpretation (vetoable; …)" (item 26–27). Its reasons live only in
  `draft-notes.md`, which is not assembled.
- Items 114 and 115, filed with it, give a *Why* for each key choice (`items-114-115.md`, (b)'s "*Why:*", 115 (b)'s
  "*Why 75:*").
- The g file's legend: "the consequences are the program's vetoable interpretation" (`AMENDMENTS-2026-09-28g.md:6-7`).

**Required change.** Add a one-line reason at each of these choices:
- the ruins basis as native: owner, item 8: "what used to be old houses has been repurposed for building material"
  (`OWNER-INSTRUCTIONS:87`); item 113 (b) "quarries the ruins for stone"; DEFINITION §5 "robbed for stone";
- the landfall's rock as native stone: a fallen island's rock lies on the site; state it is vetoable;
- earth as the floor (totality);
- `nativeOnly` (bulky, low-value materials were not carried);
- `importPremium` and the route rates: the owner's "expensive to transport"; item 103 (a) "river and sea legs cheaper
  than carts";
- the means rows and `rungMeans`;
- mixing by mass (structural sense);
- frame-origin distances (no S2 → S3 loop);
- the radii (2 km stone, 5 km timber, 3 km reed and straw) against the owner's "nearby";
- the `lit` band tint's retirement.

The draft notes' text is enough, shortened.

### R13 (minor-medium). The standalone consequence is not stated plainly, and "Surprise me declares none" is unmarked

**Evidence.**
- (c) states the dossier consequence (item 133–136) but not the standalone one.
- Standalone partners are "empty by default (Surprise me declares none)" (item 123).
- Surprise me draws intent fields only (§7.7 layer 1, `determinism/03-s7-editing.md:1409-1411`). Partners are
  circumstances (layer 2).

**Defect.** In the default product experience, the one-click map and every Surprise me map, the owner's first example
("they can't have stone buildings … that would come from trade") never appears unless the user declares a partner. That
follows from the adopted recommendation ("empty by default"), but the item should say it as plainly as it says the
dossier case.

**Required change.**
1. Add to (c)'s consequence: "a standalone map is native-only until the author declares a partner in the Trade control;
   the owner's first example needs one declared partner".
2. Give "Surprise me declares none" its reason (partners are circumstances, not intent; the adopted empty default) and
   mark it vetoable, with the alternative (Surprise me declaring one named partner).

### R14 (minor). Header: the adoption's time, the bundling words and the filing row

**Evidence.**
- Item 2–3: "the trade partners ~01:15".
- `read-owner-decision.md:1` dates the adoption "~01:33". `docs/lane-events.log:1869`: "owner ~01:33 adopted".
  `draft-notes.md` Flag 1 raised it and left it.
- Item 15: "Bundled … (owner, ~01:12)" paraphrases. The log's words are "bundle all this with g114-115"
  (`lane-events.log:1850`).
- Item 114's header names its filing rows ("filed under J122 and J126"). Item 116 names none, and does not say where the
  owner's words are filed (the g file's legend: `docs/OWNER-INSTRUCTIONS-2026-09-25.md`).

**Required change.**
1. Change "~01:15" to "~01:33".
2. Quote "bundle all this with g114-115" verbatim.
3. Name the J row the orchestrator assigns, and state that the three messages are filed in
   `docs/OWNER-INSTRUCTIONS-2026-09-25.md`.

### R15 (minor). A hostile named neighbour is excluded without the reason

**Evidence.**
- The adopted recommendation says "every neighbour SettlementForge NAMES counts as a trade partner"
  (`read-owner-decision.md:10`).
- (c), item 125: "Never: … a partner of weight 0 (hostile, or a suppressed economy)".
- The justification exists but is not given: SettlementForge itself writes no trade links for a hostile or suppressed
  relationship (`read-sf.md:204-207`; `research/sf/mapping-verify.md` V26).

**Required change.** Add the reason to the "Never" clause: "SettlementForge makes no trade link with a hostile or
suppressed partner (J121)". Mark it vetoable.

### R16 (minor). The claim about item 115 is unsupported

**Evidence.**
- (f), item 196–197: "the high economy item 115 requires makes island fabric dearer, from the same supply".
- Item 115's economy clause is a gate on the slider value ≥ 75 that "reads the slider value — never the field, `S_town`
  or item 114's ceiling" (`items-114-115.md:273-282`).
- Item 114's ceiling is already absent at ≥ 50 (`items-114-115.md:38-47`).
- On a dossier map the wealth level comes from the prosperity word, not the economy.

**Required change.** Replace the sentence with: "Item 115's gate adds nothing to the means; an island's plots read their
own bands through (f), and its fabric draws on the settlement's supply ((i))."

### R17 (minor). The lit band tint moves even with the switch off, which breaks the no-op pin

**Evidence.**
- (n), item 380–383: the default `lit` sheet colours roofs by covering, and "its band-tint rows move to the FTG parity
  sheet".
- The same paragraph says a pre-116 document "reads it off, so it replays byte for byte".
- T116-1, item 442–443: "every golden … byte-identical to the base".

**Defect.** A pre-116 document with the switch off, in the default preset, would render its `lit` roofs differently. The
J-A19.81 ruling (R3) must hold for them.

**Required change.** The default `lit` sheet reads the band tint when `materials.supply.enabled` is off, and the covering
role when it is on. Alternatively, T116-1 names which goldens are model-only.

### R18 (minor). "Never-read list" is the wrong mechanism

**Evidence.**
- Item 121–122: "§7.7 item 1's never-read list admits exactly `neighborRelationship.primaryExports`, …".
- Those fields are not on item 86's never-read list (`determinism/03-s7-editing.md:1584-1593`). They are unread under
  the closed-digest rule, which reads only fields a `DossierDigest` field names (`:1594-1597`).

**Required change.** Reword as: "the closed-digest rule admits them through the three new
`DossierDigest.economy.partners[]` fields and V08 §2.4's field-table rows; item 86's never-read list is unchanged".

### R19 (minor). SettlementForge's `materialFamily` is called "the same concept" as our family

**Evidence.**
- Item 35–36.
- Its values are brick, stone, marble, ruined-stone, timber and steel. V08 maps each to one of our material ids:
  "`stone` → `ashlar`; `marble` → `ashlar`; `ruined-stone` → `rubble`; `timber` → `timber_frame`; `steel` → `ashlar`"
  (`docs/volumes/V08-settlementforge.md:961-962`).
- It is therefore a material token in our terms, not a family (one term per concept).

**Required change.** Reword: "SettlementForge's `materialFamily` names a material in its own words; V08's `materials`
row maps it to our material id and so to its family".

### R20 (minor). Deferral wording

**Evidence.** Item 132–133: "When the reworked model lands, V08 re-points DR3's inputs through the port's migration …".

**Required change.** State the rule in the present tense, as the adopted decision frames it ("a defined adapter, not a
deferral"): "DR3's supplies fill is the only reader of SettlementForge's trade fields; any SettlementForge line's
adapter fills `TradePartner.supplies`, and the port's migration and change envelope carry existing maps (J121)".

### R21 (minor). V02's "the mutator keeps the material" contradicts (j) (2)

**Evidence.**
- (r)'s V02 row, item 507: "the mutator keeps the material (§3.9)".
- (j) (2), item 305–306: a completed upward refurbishment, "the `mutate` that raises `builtBand`" (§4.11,
  `pipeline/01-s4-generation-pipeline.md:3062`), re-picks.
- Item 19 (c) (owner-rooted): "a smith moving into a richer street mutates toward the richer template".

**Required change.** Write V02's row as: "the mutator keeps the material, except a completed upward refurbishment,
which re-picks by (j) (2)".

---

## B. Points checked with no defect found

- **The owner's words.** All three messages are quoted verbatim, typos kept. The only change is the paragraph break
  after "paired with prosperity.", collapsed. The adopted recommendation is paraphrased faithfully (item 11–14), with
  every element in `read-owner-decision.md` present: named neighbours count with what their exports, goods or resources
  show; no named neighbour means native-only whatever the access; the route prices; one port-side record; standalone
  empty by default.
- **The refinement's core.**
  - (b)'s "What never licenses" (item 100–101): no rung, population, prosperity, era, epoch count or growth.
  - (c)'s "Never" list: derived partners, label lists, `tradeDependencies`, magical transit, the web's generic import.
  - The web's refusal of the generic import for material goods ((k)).
  - (j)'s arrival only "with the first epoch whose slice lists it".
  - T116-3's exact 0 and T116-25.

  Together these honour "cant have … or grow to have them until and unless they trade specifically with another
  settlement that has that material", apart from R8 and R9. Standing traded fabric outliving a closed link does not
  breach the words: the settlement did trade.
- **"Isolated" as one term.** Mapping the owner's word to "native-only" and leaving V07's road form and SettlementForge's
  access key their own meanings keeps one term per concept (item 32–34).
- **Texture and colour, never shape, for buildings.** (h)'s mixed building is "byte-identical to the same building
  unmixed". Roof coverings are admitted by the roof form, never the reverse (item 67–68). T116-2 covers both. No
  building-shape effect of material was found.
- **Parity presets keep emulation.** (n) switches the model off under `MFCG`, `FTG`, `VG` and `NG`, with the parity rows
  kept as our own rows, which matches §7.6. Beyond R4's statement, no defect.
- **Items 102–113.**
  - 103 (a) (water legs cheaper than carts) agrees with (e).
  - 104 (b) and (h) (6) (imports through the store at the gate or quay facing the partner) agree with (k).
  - 105 and 107 are untouched.
  - 106's trace, closure and grading are declared untouched (item 260).
  - 108, 109 and 111 raise no conflict (the oasis-grove edge follows from (b)'s threshold).
  - 110 is covered, apart from R10's reading.
  - 112's second cue is carried by the Materials view.
  - 113 (b)'s ruins quarrying is carried by the ruins basis.
  - Only 113's replay (R9) and item 72 (d‴) (R1) are in conflict.
- **J121 and J122.** The adapter follows the owner's adoption and J121 (SettlementForge's trade rework). The whole
  interpretation is marked vetoable under J122. No defect beyond R12's missing reasons.
- **Item 20 (h) for partners.** Partners, relationships, goods and deposit states are treated as dossier facts. A
  map-side partner on a dossier map is refused `dossier-owned`. A dossier-declared material is honoured. The supply and
  materials are map facts. No defect beyond R2 and R9.
- **Items 114 and 115 on prosperity.**
  - `means.top` as the highest allowed band's `hi`.
  - The district range lowered to the ceiling before it clamps.
  - The top band read up to its `hi`.
  - No second wealth term.

  All of these agree with 114 (b)–(c) and (e) as drafted. Only R16's sentence on item 115 is wrong.
- **Clean-room.** The culture and parity rows are declared our own. No reference table, palette or word list is
  reproduced. The example names ("Stone Row", "Brick Lane", "Kellmoor", "Hollins") appear in no reference or findings
  file in the repository.
- **No deferral.** Apart from R20's sentence, none found. The *STAGED* scope is milestone staging, as in items 110–113.

---

## C. Required changes, in one list

1. **R1.** Institutions' means inside their district's band range. Prestige and patronage move them within it, and the
   excess goes to `District.pressure` (item 72 (d‴), §4.5 (5) and (8)). Works stay on the works means with the reason.
   Amend (f), (i), T116-29 and J-A116.42.
2. **R2.** Add dossier records as native evidence (extraction institutions, `Stone Quarrying`, own chains' `resourceKey`;
   reason `native_record`). Rule the processors. Qualify (k), T116-14 and T116-12 for dossier-backed producers (item 20
   (b), (h)). Add to DR41's inputs.
3. **R3.** Rewrite (m)'s item 19 sentence:
   - the correct attribution (§2.6 versus item 19);
   - "J28's application of emulation first", not "owner-approved";
   - item 19's owner words and (a) agree with 116;
   - "never a universal ladder" ruled (the order is per settlement);
   - the roof-colour-by-band clause superseded as default and kept under FTG.
4. **R4.** Quote the owner's "emulation first" and rule it. State that the licence is an absolute of the default model
   (the exception to §7.6's "tendencies, never fixed laws"). Say that presets and the switch off lift it. Replace "item
   23's … rows". Spell out the determinism row's exception.
5. **R5.** Make timber-mass walls the floor where timber is native (or state the earth floor as a vetoable departure).
   Recompute the worked table. Make T116-5 agree. Add the owner's-example bar.
6. **R6.** Map "very rich", "richer" and "middling" onto bands in (f). Restate T116-4 and T116-10, with the mixed share
   highest in the middling bands.
7. **R7.** State the works-purse interpretation, and lower the walls factor or say plainly that river-served towns wall
   in imported stone. Extend T116-6 to structures.
8. **R8.** Rule edits against the refinement (owner's editability quoted). A district override feeds growth only within
   the epoch's supply. Add a bar.
9. **R9.** Drop `removed` from the replay. Mark the partner projection as a vetoable choice with its alternative, and
   reword "none is invented". No history event adds or removes a partner. Extend T116-24.
10. **R10.** State in (m) the "within a kind" reading for structures, with base precedent. State plainly that supply can
    remove a bridge, pier or raised way.
11. **R11.** Add Works (durations, pauses, decay rows for the new ids; mixed building keyed by its heavier part; decide
    on traded lead time) to (i), (j), (r) and HOMES. Name the deliberately excluded pieces (plot boundaries, hedgerows)
    with reasons.
12. **R12.** Add a one-line reason at each major interpretation choice, as items 114 and 115 do.
13. **R13.** State the standalone consequence plainly. Give "Surprise me declares none" its reason and mark it
    vetoable.
14. **R14.** Change ~01:15 to ~01:33. Quote "bundle all this with g114-115". Name the J row and the owner-instructions
    filing.
15. **R15.** Give the hostile or suppressed exclusion its reason (SettlementForge makes no link; J121).
16. **R16.** Replace the item 115 "makes island fabric dearer" sentence.
17. **R17.** The `lit` band tint follows the switch (off keeps it), or T116-1 names model-only goldens.
18. **R18.** "Never-read list admits" becomes the closed-digest rule and V08 §2.4 rows; item 86's list is unchanged.
19. **R19.** SettlementForge's `materialFamily` is a material token mapped to our id and family, not "the same concept".
20. **R20.** Present-tense adapter sentence in place of "When the reworked model lands …".
21. **R21.** V02's row: the mutator keeps the material except a completed upward refurbishment.
