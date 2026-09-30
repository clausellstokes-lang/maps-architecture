# Review of draft items 114 and 115: nuance and edges

**Reviewer's lens.** Does the ceiling's binding lose any distinction the design draws today? Does the island gate break
any V05 behaviour, or leave a state undefined? Is every edge defined with an outcome, a fallback on §5.1's ladder and a
test that would catch a regression?

**What I reviewed.** `items-114-115.md` as it stood at 01:55, and `draft-notes.md`. I used the readers' notes only as a
map. Every claim below was checked against the design files themselves.

**Abbreviations.** Every base path is under `docs/validation/coherence/new/base/`. Line numbers are from the files as read
on 2026-09-30.

| short name | file |
|---|---|
| PIPE | `pipeline/01-s4-generation-pipeline.md` |
| CONT | `pipeline/02-s10-simulation-content.md` |
| II6 | `pipeline/09-ii6-staged-layers.md` |
| EDIT | `determinism/03-s7-editing.md` |
| MODEL | `model/01-domain-model-and-schemas.md` |
| R8 | `rendering/01-s08-rendering-and-the-style-system.md` |
| R9 | `rendering/02-s09-labels-and-map-furniture.md` |
| S13 | `scope/06-s13.md` |
| DRAFT | `items-114-115.md` |

Volumes are the live files `docs/volumes/Vnn-*.md`. The exceptions are V03 and V04, whose rewrites have landed in
`docs/validation/coherence/new/volumes/`.

**Verdict.** The core of item 114 is sound, and so is the core of item 115:

- the S2 fold is continuous;
- the default is the identity;
- the wealth floor never binds standalone;
- the gate comes before the count, and the islands already standing are left to the supply law.

Twenty-nine defects must still be fixed before the items are filed:

- **Eleven block agreement.** The parallel editors would build different things, or the text contradicts a rule it cites.
- **Eleven are major.** An edge is undefined, or a bar cannot catch the regression.
- **Seven are minor.** Wording, labels or homes.

Each defect below gives its evidence and the exact change required. The points I checked and found sound are listed at
the end.

---

## A. Blocking defects

### E1. The ceiling's reads step at every whole band, against the design's own continuity rule

**Where.** 114 (c) (1) and (c) (4) (DRAFT l.66–82). The claim of continuity is in (b) (1) l.51–52 and (i) (4) l.159–160.

**Evidence.**

- §7.7 layer 1 (EDIT l.1399–1401) says: "**Rows are continuous**: no rounding and no comparison inside a continuous
  control — a discrete outcome is a probability drawn per entity or a discrete control that declares itself (§7.8)".
- §7.8 (EDIT l.1980–1981) says: "Continuous controls are smooth maps with no thresholds inside (VG's '1 vs 0.999' is the
  failure)".
- §4.5 reads every band-keyed table by interpolating between band centres, with "an end band tak[ing] the end row"
  (PIPE l.1222–1224).

**The failure.** `⌈at⌉` is a comparison inside the Economy, and three reads turn on it.

1. **Tables read along the value.** Take a position just above a whole band, `at = k + ε`. Band `k + 1` holds `ε·W`, so its
   centre lies near 1. Values in band `k`'s upper half then interpolate toward row `k + 1`, and reach it at a value of 1.
   At `at = k` exactly, band `k` is the end band, and the same values read row `k` flat.
   - Example: the class mix at economy 33⅓ (`at` = 4), whose rows are prosperous "manor 0.15" and rich "manor 1.0"
     (CONT l.358–363 via PIPE §4.7). The expected share of manors in the top plots jumps as the Economy crosses 33⅓.
   - The same step happens at 16⅔ in every table with its own rows at comfortable and prosperous.
2. **Named-band reads in (c) (1) and (c) (4).** These are a workplace's lifestyle band, an institution's band, a template
   row, `requirementBand` and a `prosperityBands` filter.
   - At `at = k + ε` a rich goldsmith row reads `rich`. At `at = k` it reads `prosperous`.
   - Its plot land therefore jumps between bands in S2's stage land. That land is `Σ n(c,b,k) · plotArea(c,b)`
     (PIPE l.434–441). The jump moves the cuts and the rich band's extent.
3. **A band without a row of its own.** The four-row tables (granularity, templates) have no row for `comfortable`. When
   the highest allowed band is comfortable (`at` ∈ (2, 3], economy ∈ (0, 16⅔]), "never a row above it" leaves the end
   row undefined.

T114-3's sweep samples economies 15, 20, 30 and 35. It may pass on the median plot area while the class mix and the band
land shares step. The draft's claim that the Economy is "a continuous, monotone control as §7.8 demands" is false as
written.

**Required change.** Replace (c) (4)'s first sentence with a continuous rule, and extend (c) (1):

> "(4) *Reads — continuous at every position.* With `c = ⌈at⌉` and `f` its share, every rule table read along the value
> reads no row above `c`, and reads band `c`'s row as `R*_c = lerp(R(c − 1), R(c), f)`, where `R(b)` is the table's own
> row for band `b` or, for a band it carries no row for, the row interpolated at `b`'s rank between its nearest rowed
> bands (on the four-row tables `R(comfortable) = ½ R(modest) + ½ R(prosperous)`); values between band `c − 1`'s centre
> and band `c`'s centre interpolate from `R(c − 1)` to `R*_c`, and values above band `c`'s centre read `R*_c`. At `f = 1`
> this is §4.5's end-band rule; as `f → 0` it tends to the rule at `c − 1`. A discrete read keyed by a named band at or
> above `c` — a demand row's lifestyle or institution band ((c) (1)), a template row, an `IslandInstitution.requirementBand`,
> a `prosperityBands` filter — reads `c` with probability `f` and `c − 1` otherwise, one draw per entity on the concern
> that already draws it (`roster` by the row's ordinal; `siting` for a placement; `island.place` `reason:k` for an island
> row), so every expectation is continuous in `at` and no band above `c` is ever read."

Add two cases to T114-3:

- a continuity check across the knots, at economy 16 ↔ 17 and 33 ↔ 34;
- two metrics beside the median plot area: the class mix's manor share, and the land share of workplaces in the top two
  bands.

### E2. The fallback in (i) (4) would move cells that the owner-rule stamp protects

**Where.** 114 (i) (4) (DRAFT l.159–160): "failing the sweep, §7.8's smoothstep then discrete fallback".

**Evidence.**

- §7.8's fallback "replace[s]" the control's expansion row by a smoothstep (EDIT l.1982–1986).
- V12 §1 (l.150–153) says of an owner's rule: "No tuning run, no fallback and no historical map may move them".
- IN-V11-1 (V11 l.5044–5048) says the `ownerRule` stamp binds "calibration runs, fallbacks and corpus packs".
- The draft stamps the ceiling rows `ownerRule: '114 (b)'` (l.43).

**The failure.** The ceiling rows are exactly the cells whose steps E1 describes, and a fallback may not move them. The
fallback as drafted either breaks V12 §1 or has nothing it may edit.

**Required change.** Rewrite (i) (4):

> "(4) The knots and every fractional position: continuous by construction ((c) (1), (c) (4)). Should §7.8's sweep
> still fail, its fallback replaces only the layer 1 derivation row `wealthLevel = economyPriority ÷ 100` over the failing
> interval; the `BandSet.ceiling` rows and the `IslandRule.gate` cells carry `ownerRule` and no fallback, calibration or
> corpus pack moves them (V12 §1; IN-V11-1); if the sweep still fails, the control is declared discrete at the steps
> its report lists (§7.8 (2))."

### E3. In the standalone neighbourhood, the share `f` has no effect, so the hood's Economy steps

**Where.**

- 114 (c) (2): "the upper values of a fixed-cut set … band at the ceiling" (DRAFT l.69–71).
- Edge (i) (9): "fixed cuts clamped at the ceiling" (l.164–166).

**Evidence.** A lone neighbourhood takes its households "by band from field pass 1's shares" under the band set's
**default cuts**, 0.12, 0.25, 0.45, 0.62 and 0.80 (V01 V1-3.10.1 steps 3 and 5, l.1900–1921; J-V1.9). The S2 fold
reaches only the virtual host town's dispersed demand.

**The failure.** Clamping a fixed cut uses `c` and never `f`.

- At economy 40 (`at` 4.4, rich with `f` 0.4), rich still holds every value above 0.80.
- At economy 33 (`at` 3.98) all of that land drops to prosperous at once.

So the hood's top-band land jumps at 33⅓ and again at 16⅔. This is the same failure as E1, with no smoothing across
seeds.

**Required change.** Add to (c) (2):

> "A fixed-cut set (a standalone neighbourhood's default cuts, J-V1.9) applies the share by one cut: every cut at or above
> band `c`'s upper boundary reads 1, and the cut between bands `c − 1` and `c` is raised to
> `lower_c + (1 − f) · (1 − lower_c)`, so band `c` keeps the top `f` of its value range — J-V1.9's cuts at `f = 1`, band
> `c` empty as `f → 0`."

Add a case to T114-9: a hood swept over economies 30–40 shows no step at 33⅓.

In V01's unit line, keep the shanty condition as `intent.wealth ≤ 0.2`, read as the wealth in force (V01 l.1874–1875).
Do not restate it as "economy ≤ 20": that gives one condition two terms, and it is wrong wherever an author sets the
wealth level.

### E4. A stored wealth level decouples the basic Economy control, and every older document has one

**Where.** 114 (a) (2) (DRAFT l.24–32) and §7.5's row "a stored `wealthLevel` stays" (l.219).

**Evidence.**

- `Intent.wealthLevel: number /* 0–1 */` is required today (EDIT l.1474). Every document written before this item
  stores it, set by the basic wealth slider.
- The draft keeps the stored level, and reads the economy as 50.

**The failure.** On every older standalone document, T1's control is relabelled "Economy" and shows 50. Dragging it no
longer moves the wealth, which is what the slider did. Below 50 it only folds the top bands, and above 50 it moves
nothing but item 115's gate. The same holds on any new document where an author once touched the advanced Wealth level.

The clerk's wealth words set `economy` (h), so "make it opulent" on such a document changes nothing but the cap. Surprise
me "draws every intent field" (EDIT l.1409–1411). Unless the item says otherwise, it would also draw a wealth level and
decouple every surprise town.

**Required change.** Add to (a) (2):

> "Where a wealth level is stored (every document older than this item; any document whose advanced Wealth level an author
> set), the basic Economy control moves only the economy priority and shows the hint `hint.wealthSeparate` — 'Wealth level
> {w} is set separately (Advanced)'; the advanced Wealth level carries **Follow the Economy**, an
> `adjust('intent.wealthLevel', null)` (Re-derive from S0) that clears it. The clerk's wealth words set `economy` and,
> where a wealth level is stored, `wealth` to the same value ÷ 100. Surprise me writes the economy priority and no wealth
> level."

Add the lifecycle row for clearing the level, and add to T114-13: an older document at wealth 0.2 shows Economy 50 with the
hint; Follow the Economy re-derives it with the wealth at 0.5; undo restores the digest.

### E5. `factTier` for the dossier's economy, and for the creation slice's magic, flips on a later offer

**Where.**

- 114 (a) (1): "`factTier` reads `dossier` … exactly when the settlement's carried facts hold a value for it" (DRAFT
  l.22–23).
- 115 (a) (1), the same rule for the creation slice's `magic` (l.266–267).

**Evidence.**

- `factTier` reads `dossier` when "the carried facts under that ref's binding key hold that field" (MODEL l.2037–2041).
- The carried facts are rewritten at every absorb (EDIT l.1574–1577, item 12).
- The port has never read `config.priority*`. Every existing dossier document carries no economy: the key was
  `ignored_key` (EDIT l.1587–1588; `read-sf.md` §6).

**The failure.** There are three cases.

1. **A value arrives after creation.** The creation dossier lacked the value, so the Economy was a map fact at 50, which
   the author may have edited to 30. A later same-id offer supplies 70. The tier flips to `dossier`, and the control now
   shows the recipe's 30 locked as "Set by SettlementForge", a value SettlementForge never stated.
2. **A value is withdrawn.** A later offer drops the value. The Economy becomes editable on a map whose ceiling came from
   SettlementForge.
3. **Every migrated dossier document** meets case 1 at its first absorb after the upgrade.

The creation slice's `magic` flips the same way when `magicLevel` appears or disappears.

**Required change.** Key both rules to the creation:

> "§2.8's `factTier` reads `dossier` for `Recipe.intent.economyPriority`, and for the creation slice's `magic`, exactly
> when the creation prefix's `dossierFacts` carried a value for it; a later offer never changes that tier (the economy:
> receipt F-V8-8, `creation_only`; the magic: the next epoch's slice, whose own tier is keyed to that epoch's carried
> value). The host frame shows the recorded value, and a later SettlementForge value beside it as a note."

Add to T114-7:

- a migrated dossier document absorbs an offer that now carries `priorityEconomy`. The Economy stays an editable map
  fact at 50, with F-V8-8 reported `creation_only`.
- an offer that drops the value changes no tier.

### E6. An epoch that lifts the ceiling: whether the cuts move, and how far a plot's band may move

**Where.** 114 (d) (l.105–106), (e) (l.114–121) and T114-8 (l.192–194).

**Evidence.**

- §4.5 says the cuts move "only by an explicit `setAttr` … or by an epoch" (PIPE l.1235–1236). No base text says when an
  epoch rewrites them.
- §4.11 step (a) "re-bands every live plot's `fieldBand` … by §4.5's rule" at once (PIPE l.3076–3080).
- SettlementForge's word steps one band a year (`read-sf.md` §4). An absorb after several years can therefore raise the
  floor by several bands at once.

**The failure.**

1. **The lift may do nothing.** If an epoch keeps the cuts, the cuts above the old ceiling stay at 1 and no plot bands
   above it.
2. **The draft only half-states the rule.** "The cuts the epoch writes computed from the folded demand" does not say
   whether the demand is the delta or the whole town, or whether an unchanged ceiling rewrites the cuts at all.
3. **T114-8 asserts something the mechanism does not do.** It says "no plot's band moves by more than one band in an
   epoch through the ceiling's change". Under a two-band lift, §4.11 (a) moves `fieldBand` by two bands in one epoch.
4. **(e) states it wrongly.** It says survivors "re-band by the ladder, never in one epoch". That is true of geometry
   (the manifested band) and false of the field band.

**Required change.** Add to (e):

> "An epoch whose `at` differs from the recorded one rewrites the cuts by §4.5's rule over the whole town's residential
> demand folded at the new `at`; one whose `at` is unchanged keeps the recorded cuts. The rise is limited to one rank per
> epoch — `at_e ≤ at_{e−1} + 1`, `at_{e−1}` read from the previous epoch's `FieldBands.ceiling` (model data, so no hidden
> state) — while a fall is immediate to the floor's position, never below the founding's row."

In (e), replace "re-band by the ladder, never in one epoch" with:

> "their occupants' field band re-bands at the epoch by §4.5's rule, and the built geometry follows by the ladder."

Reword T114-8 as "no plot's field band moves by more than one band in an epoch through the ceiling's rise". Add a fixture
of a two-band word jump.

D114-9's rejection of a ratchet ("needs history state") does not apply to this rate limit. The previous `at` is recorded
model data.

### E7. The record `BandSet` is declared nowhere, and the item adds a field to it

**Where.** 114 (b) (1): `BandSet.ceiling: { economy; band }[]` (DRAFT l.42). In (k), model states only `FieldBands.ceiling`
(l.207–208), and pipeline states "(b)'s table" (l.210).

**Evidence.** `BandSet` appears only as a name:

- in §4.5 ("`prosperity.bands` (`BandSet`; §7.6)", PIPE l.1203);
- in V11's catalogue row 6 (V11 l.867).

Neither the base section files nor any volume declares an interface for it. A grep over `new/base/` and `docs/volumes/`
finds no `interface BandSet`.

**The failure.** The parallel editors must each invent `BandSet`'s shape to place `ceiling` in it: the band ids, the
shares, the reference-tier columns and the interpolation blend of item 23. That is a shared decision with no home.

**Required change.** Name one home and its full declaration in (k). The model late seat states it in §2.5 beside
`FieldBands`:

> `interface BandSet { id: string; version: string; bands: { id: string; share: number; ftgTier: string; mfcgClass: string }[]; middleRule: 'median-household'; blend: 'linear'|'step'; ceiling: { economy: number; band: string }[] /* 114 (b); ≥ 1 row, economy ascending, band ranks non-decreasing, each band an id of this set */ }`

Then:

- §4.5 and V11 reference it;
- define a pack's band set without `ceiling` rows: it reads the single row `{ 0, <its top band> }`, no ceiling;
- a malformed table is refused at load by the table validation (§5.1 tier 1, the table's reason row).

### E8. Author edits and table edits of the ceiling and the gate have no precedence and no lifecycle

**Where.**

- 114 (c) (7) (l.89–93): precedence, but only for locked, pinned or declared entities.
- 114 (d): "no edit kind" for `FieldBands.ceiling` (l.108).
- 115 (b): the gate's cells, "never calibrated" (l.278–280).

**Evidence.**

- A `setAttr` on the town's `FieldBands` is an authorial re-banding (EDIT l.310; PIPE l.1235), and the draft does not
  say how it meets the ceiling.
- IN-V11-1 says the `ownerRule` stamp never binds "a pin, a parity preset's zero or a user's edit" (V11 l.5048). So an
  author's `editTable` of `BandSet.ceiling` or of `IslandRule.gate` is allowed. That includes `economyMin` 0, and a
  last ceiling row above 75.
- 115 (e) promises that an island town is never capped "because 75 > 50". That holds only at the default rows.

**The failure.** These states are undefined:

- an author's `setAttr` of the cuts reopening a band above the ceiling;
- a user's table edit of either table;
- an edited table under which a gate-admitted town is capped.

**Required change.**

1. Add to (c) (7):

   > "An author's `setAttr` on `FieldBands.cuts` that opens a band above the prosperity ceiling holds as declared
   > (`held above the prosperity ceiling`, listed); a re-derivation that recomputes the cuts re-applies the ceiling to
   > every cut the author did not set."

2. Add the lifecycle rows:
   - `editTable` on `BandSet.ceiling`: create by the edit; read by S2 and S6; persist in the pack and the `tablePins`;
     re-derive from S2; undo by the edit's inverse; migrate so that absent reads `{ 0, top }`.
   - `editTable` on `IslandRule.gate`: re-derive from S7b.
   - Each report names the departure: "islands gate edited: economy 0 (owner rule 115)".
3. Add to 115 (e):

   > "Where an edited table admits a capped town (the gate's `economyMin` below the economy of the ceiling's last row),
   > generated islands fill from the highest allowed band down and an institution island reads its `requirementBand` at
   > it, as a held island does."

4. Add these to T114-10 and T115-4.

### E9. Declaring an island with the setting off, under a parity preset, or by a `sky: true` assignment is undefined

**Where.** 115 (c) "The count" (l.297–299) and 115 (d) (4) (l.315–321).

**Evidence.**

- A T5 `sky` declaration's dry run requires "the gate (V5 §3.2 (1)) and `h_town > 0`" (V05 l.2057–2058).
- The gate begins with the setting clause and the parity clause.
- "Every assignment whose criteria carry `sky: true`" forces a slot, just as a creation-prefix declaration does (V05
  §3.2 (3), l.845–848).

**The failure.** The draft defines the outcome for rung (absolute), magic and economy (held), and a dossier's `none`
(refused). It defines none for:

- clause (1), a declaration when `recipe.layers.islands` is off;
- clause (2), a declaration under `MFCG` or `FTG`;
- a creation-prefix `assign` carrying `criteria.sky`, in a map assignment or a skeleton, under a failed gate. Only "a
  creation-prefix declaration" is named.

**Required change.** Add to (d) (4):

> "A T5 `sky` declaration or a T6 island placement with the setting off is bent: its dry run carries
> `adjust('layers.islands', 'on')` in the same group, listed ('Islands switched on for your island'); under a parity
> preset it is refused with `refuse.islandsParity` — 'The MFCG and FTG presets have no floating islands (J-V5.25)' — and
> the action 'Leave the preset'. A creation-prefix `assign` whose criteria carry `sky` is a forced slot like a declaration:
> under a failed magic or economy clause its island is held with the same fates."

Pin the fate of a locked generated island under a failed clause as `held against its magic` or `held against its
economy`. T115-4 says only "its fate listed". Add all three cases to T115-4.

### E10. Migrating islands: what re-imposition keeps, what each state becomes, and an old `none` that was never stated

**Where.** 115 (d) (9) (l.330–334) and edge (f) (15).

**Evidence.**

1. `raiseIsland`'s declared form is `{ ring; anchor; kind; altitudeCm? }` (V05 §4.2, l.1978). A declaration after
   generation fills "by **relocating** the richest households from the ground" (V05 l.2061–2063). No event carries "its
   households as they stood".
2. §7.5's precedent re-imposes an orphaned *lock's geometry* (EDIT l.1177–1179). It re-imposes no content, and applies to
   no unlocked entity.
3. Island states are `floating`, `waning`, `settled`, `fallen` and `removed` (MODEL `SkyIsland.state`). The draft speaks
   only of "each island the upgraded replay no longer raises".
4. The old magic row mapped an absent `magicLevel` to "else `none`, noted" (V08 l.952–954). An older dossier document
   therefore carries `site.magic: 'none'` that the dossier never stated. Under the new rule a declaration there would be
   refused `dossier-owned` (d) (4).

**Required change.** Rewrite (d) (9):

> "(9) *Migrate:* the schema chain reads the economy absent (50) and the magic as stored, except that a carried
> `site.magic` whose standing port note is `unmapped_word` (the old row's 'else') reads absent. An older document replays
> unchanged at its own output version. Its `upgrade` to a version with the gate re-imposes, at the upgrade's position,
> each island the upgraded replay no longer raises, by its state at the upgrade: a floating or waning island as a
> declared island — ring, anchor, altitude and kind (an institution island's institution named by its `sky`
> assignment) — held against its magic or economy, its fill by V05 §4.2's relocation (its households listed in the diff,
> never promised as they stood); a settled island the same, followed by `settleIsland`; a fallen island's landfall is
> ground content the upgraded replay no longer holds, listed in the diff and not re-imposed; a removed island nothing.
> The user may drop any of them there (§7.5's orphaned-lock rule, extended to islands)."

Change T115-7 to match. Add an older dossier fixture whose dossier lacked `magicLevel`: after the upgrade its magic is an
editable `none`.

### E11. The units line routes a part to V04, whose rewrite has already landed

**Where.** 115 (h) and 114 (k): "the landed base parts in a late rewrite seat each, every other unit in its main rewrite"
(l.205–207). The V04 entry is at l.230.

**Evidence.**

- Commit `5bd15d2` ("V03 and V04 rewrites landed", 01:35) and the files `new/volumes/V03-interiors.md` and
  `new/volumes/V04-underground.md`.
- `rewrite-V04.md` l.78–82 and l.892–894 say: "Items 114 and 115 were not in … when this lane landed … item 114 reaches
  the underground only through the ground prosperity field … no V04 text unless the filed item names one."
- The workflow gives a late seat only to the units in `lateUnits` (`workflows/18-coherence.js` l.37–43).

**The failure.** Item 114 names a V04 part: "REFERENCES (c) 6 in one pointer at F2 and C5". No seat will apply it.

**Required change.** In (k):

1. Replace the header's rule with:

   > "the landed units — the base parts model, kernel, pipeline, determinism and rendering, and the volumes V03 and
   > V04 — in a late rewrite seat where they have a part; every other unit in its main rewrite."

2. Set V04 to "no part". The underground inherits the clamp through II.7's banding by the town's `FieldBands`
   (pipeline's REFERENCES). V04's own note records it.
3. Keep V03 at "no part".

If V04 keeps its pointer, V04 must be listed among the late units.

---

## B. Major defects

### E12. Lowering the band range removes the richest quarter's exclusivity

**Where.** 114 (c) (5) (l.83–87).

**Evidence.** Today the rich band's range row is "rich alone in its upper half" (CONT l.397–399; §4.5 (5), PIPE
l.1424–1425). The richest districts are an enclave of the top band, the patriciate.

**The failure.** Under a ceiling at prosperous (economy 33⅓), the top district's row `prosperous: comfortable–rich` is
lowered to `[comfortable, prosperous]`. The capped town's richest quarter always mixes in the band below it. So the
distinction between an enclave and a mixed quarter disappears at every economy below 50. The draft neither states nor
justifies this.

**Required change.** Decide it in the item. I recommend adding to (c) (5):

> "A district in the upper half of band `c` takes the end row's form, `[c, c]`, with probability `f` (one draw on
> `alloc.district` keyed by the district, read by S7b's provisional range and S10a's written range alike), and
> `[c − 1, c]` otherwise — so at a whole band the richest quarter is an enclave of the richest band as the `rich` row's
> upper half is today, and the expectation is continuous."

Add a bar to T114-6: at economy 0, a district in modest's upper half has the range `[modest, modest]`.

### E13. `FieldBands.ceiling` has no rule for when it is written, so the no-op pin fails

**Where.** 114 (d) "The record" (l.104–109), and T114-1's claim that the result is byte-identical (l.176–179).

**Evidence.** `FieldBands` is model data inside the digest (DET6 l.243–254; `read-base.md` C3).

**The failure.** If S6 writes `{ at: 5, by: 'economy' }` at economy ≥ 50, the digest differs from today's, and T114-1 and
the golden no-op pin fail. The draft says only "absent means no ceiling". It also leaves `by` undefined when the two terms
are equal: a Moderate word, whose floor is at 3, meets economy 16⅔, whose row is also at 3.

**Required change.** Add to (d):

> "S6 writes `FieldBands.ceiling` only where `at` lies below the band set's top rank; at the top rank the record carries
> none, so an uncapped town's digest is today's. Where the two terms give the same position, `by` reads `economy`."

### E14. T114-4 claims the field is the same cell for cell. The mechanism does not deliver that

**Where.** T114-4 (l.184–186), and the reasoning in (c) (3) (l.76–78).

**Evidence.**

- S2's stage land is `A_k = Σ n(c, b, k) · plotArea(c, b) · (1 + λ_b) / plotShare` (PIPE l.438–441).
- The fold moves households between bands whose plot areas differ, so the town's extent changes. It changes through S5,
  S5d's check (PIPE l.1020–1027) and S6's typing.
- It also changes which institutions S10a places, and so pass 2's kernels (PIPE l.1147–1149).

**The failure.** Take one seed at economy 20 and at 50 with the wealth held equal. The two runs have different geometry,
so their fields differ nearly everywhere, and the bar fails on correct behaviour. Also, (c) (3) rejects a compression
because it "would move the absolute values `S_town` … read". The fold moves them too, through the extent.

**Required change.**

- Replace T114-4's first clause with two checks:
  1. The drivers oracle on capped fixtures holds no ceiling term, and its terms sum to the stored value (T-V10-10).
  2. On a skeleton-imported document (item 101), whose drawn roads, walls and districts pin S5's output, economy 20 and 50
     with the wealth level held equal give the same pass-1 field cell for cell.
- Change (c) (3)'s phrase to "would move … *directly*".
- State the interplay: a lower Economy builds a smaller town, because modest plots are smaller.

### E15. Edge (13)'s condition for the identity is wrong

**Where.** Edge (i) (13): "A town whose demand holds nothing above the ceiling … byte-identical" (l.170–171).

**Evidence.** The fold (c) (1) moves `(1 − f)·W` of the mass at and above `c` down to `c − 1`. That includes band `c`'s own
share. Take a THORP (rich 0, prosperous 0.08; V07 l.677) at economy 25, where `at` = 3.5. Its prosperous share becomes
0.04, so it is not identical, even though its demand holds nothing above the ceiling.

**Required change.** Restate the edge:

> "(13) The fold is the identity exactly when `at ≥ r_max`, the highest rank with a non-zero household share: a THORP
> (rich 0) at economy ≥ 33⅓, a band set's top at ≥ 50; there the run is byte-identical but for `FieldBands.ceiling`
> (T114-4)."

### E16. Declaring an island: which dossier statement the refusal reads

**Where.** 115 (d) (4) (l.319–320) and (d) (3) (l.312–313).

**Evidence.** A typed-slice change "rides the epoch the cadence schedules" (EDIT l.1681–1683). On a dossier document
without epochs, the magic in force is the creation slice. The carried `site.magic` holds the latest absorbed word.

**The failure.** A dossier changes its magic from `high` to `none` between epochs. The gate reads the magic in force,
still `high`. The draft does not say whether the `dossier-owned` refusal of a declaration reads the carried word (`none`)
or the magic in force (`high`). The Islands control's state has the same ambiguity.

**Required change.** Add to (d) (4):

> "The refusal reads the dossier's current statement — the carried `site.magic` — since it guards against contradicting
> what the dossier says now (item 20 (h)); the gate reads the magic in force. The Islands control's disabled reason names
> the carried word when the two differ ('SettlementForge now says this world has no magic; it takes effect at the next
> period')."

Add the case to T115-4.

### E17. A band with a tiny share, and the Economy's numeric domain

**Where.** 114 (b) and (h), T114-2's "± 1 household per band and stage", and 115 (b)'s "≥ 75 inclusive".

**The failures.**

1. **An empty highest band still names itself.** When `f·W·N` < 0.5, the roster's rounding gives band `c` no household,
   yet `c` is the highest allowed band. The draft still has it named by `info.ceiling` "caps … at {band}", by the legend's
   "richest: {band}", and by T5's bend target, even though no plot is that band.
2. **The domain is not stated.** The draft never says whether the economy priority is a real or an integer. With T1's
   slider continuous, 74.6 may display as "75" and fail the gate beside a message that says "75 or more".

**Required change.**

- Add to (b):

  > "Words name `⌈at⌉`; the legend's 'richest' and `info.ceiling` name the highest band the model holds, which the report
  > gives beside `⌈at⌉` and `f`."

- Add to (a):

  > "the economy priority is a real in [0, 100], stored as given; T1 steps by 1; the gate compares the stored value
  > (≥ 75); every display shows the stored value unrounded where it is fractional."

- Add an edge: an economy whose band `c` rounds to no household (for example 16.67 at TOWN, where `f` ≈ 0.0002 and
  `f·W·N` < 0.5). Its outcome is reads per E1 and labels per this rule, tested in T114-2.

### E18. Refounding, from item 113 (b): the old settlement's bands and islands are undefined

**Where.** 114 (f) (l.129–134) and 115 (d) (1). Neither mentions destruction and refounding.

**Evidence.** In a refounding, "the old settlement's geometry becomes ruins — every building `ruined`, every way a trace —
and the new settlement … is generated on top" (PIPE l.3327–3333, §4.11 (4)). The draft's replay text covers growth and
decline only.

**The failure.** Two things are undefined:

- whether the destroyed settlement was generated under the same recorded ceiling;
- what happens at the destruction to the old settlement's floating islands. "Every building `ruined`" says nothing about
  an island. Item 22 forbids a vanish, and nothing says whether the island falls at once or wanes over its dwells.

**Required change.** Add to 114 (f):

> "In a destruction and refounding both settlements are generated under the recorded ceiling; their ruins and buried
> remains carry no band beyond their `builtBand`."

Add to 115 (d) (1):

> "At a destruction outright every island of the old settlement falls in that epoch (`fallIsland`, its landfall among the
> ruins) — an outright destruction is the one case where an island falls without its dwells, reported; the refounded
> settlement's islands rise only through the gate."

Add both to T114-12 and T115-5, with a refounded fixture.

### E19. Accesses whose kind the magic in force no longer admits

**Where.** 115 (d) (2), where standing islands keep their state under a magic change (l.308–311).

**Evidence.**

- `lightBridge` needs `high`, and `stair` needs `low` or `high` (V05 §2.4 l.714–719).
- The kinds are chosen "among the access rows admitted by the recipe's `magic`" (V05 §3.10 (3), l.1174).
- The re-check exists only at the dry run of `setAttr(kind)` or `placeSkyAccess` (V05 l.2071, l.2083–2085).

**The failure.** Under item 115 every generated island is born at `high` magic, so bridges of light become ordinary. The
draft keeps standing islands through a fall to `low`. The epoch path is undefined for a bridge of light in a `low` world,
or a stair in a `none` world. J-V5.8 says "bridges of light only where the world has magic".

**Required change.** Add to (d) (2):

> "At the epoch a magic change reaches, every generated access whose kind the magic in force no longer admits is
> converted to the nearest admitted kind in V05 §3.10's order (a listed fate); an author's placed access holds, listed
> `held against its magic`."

Add the case to T115-3.

### E20. The messages when the gate fails: wrong wording, and alternatives missing

**Where.** 115 (d) (5) (l.321–327), and V09's line "the hint 'Richest: {band}'" (l.237).

**Evidence.** The dossier-owned refusal must offer "the map-side alternative … where one exists" (EDIT l.1800–1802). A
disabled control needs a reason row (EDIT l.1949–1951).

**The failures.**

1. **The text blames SettlementForge wrongly.** `refuse.islandsDossier` says "SettlementForge sets this world's magic to
   {magic} and its economy to {economy}". When the magic comes from the dossier and the economy is a map fact at 50, that
   text is false.
2. **It offers no alternative.** It omits the hand-declared island that (d) (4) allows under a failed economy clause.
3. **The buttons are not tied to their clauses.** Nothing says each button appears only for a failing clause the map
   owns.
4. **The Islands control has no reason row under a parity preset.**
5. **One message key is unpinned.** "Richest: {band}" appears only in the units line.

**Required change.** In (d) (5), pin three variants of the refusal:

| variant | text |
|---|---|
| `refuse.islandsDossier.magic` | "SettlementForge sets this world's magic to {magic}; floating islands need high magic." |
| `refuse.islandsDossier.economy` | "SettlementForge sets this town's economy to {economy}; floating islands need 75 or more." |
| `refuse.islandsDossier.both` | "SettlementForge sets this world's magic to {magic} and its economy to {economy}; floating islands need high magic and an economy of 75 or more." |

Then:

- Each variant carries `button.drawIsland`, "Place an island by hand" (T5 `sky`), unless the dossier states `none`.
- `info.islandsGated` names only the failing clauses, and shows `button.magicHigh` or `button.economyHigh` only for a
  failing clause that belongs to the map.
- Under `MFCG` and `FTG`, the control is disabled with `refuse.islandsParity` (E9).
- Pin `hint.economyRichest`, "Richest: {band}", shown below 50 only.

Add each variant to T115-6.

### E21. V08's `magic` row lacks SettlementForge's own word `moderate`

**Where.** 115 (a) (1)'s mapping, "none → none; low → low; medium → low; high → high", together with "a word the row lacks
… `unmapped_word`" (l.262–265).

**Evidence.** SettlementForge's vocabulary is "`magicLevel` ∈ none, low, moderate→`medium`, high"
(`research/sf/dossier-model.md:90`). The draft reads "moderate as Low" in (a) (2) (l.269).

**The failure.** Under the draft's absent rule, a dossier that carries `moderate` literally reads as no magic at all: the
map's `none`.

**Required change.** Add `moderate → low` to the row in (a) (1) and in V08's unit line. Add a `moderate` fixture to T115-2.

### E22. The village manor: its compound and a capped toft

**Where.** Edges (i) (6) and (7): "the lord's household at the highest allowed band in its standing manor" (l.161–163).

**Evidence.**

- The manor's toft is the rich row: "toft (rich: the manor) 40–80 / 40–80 / 100–300 m" (V07 §2.2 l.710).
- Its compound has a hall, chamber block, kitchen, barn, stables and dovecote (V07 l.936).
- Under (c) (4), a band-keyed read above the ceiling reads the highest allowed band. At economy 0 that is the modest toft,
  12–18 m frontage.
- The seat is forced "at every village rung" by the government (V07 l.2329–2333). A THORP (rich 0) already has a forced
  manor with no rich household.

**The failure.** The draft asserts that the manor stands, but its own read rule may leave the compound without room. That
would mean F-PLAN, or a manor on a peasant's toft. The outcome is not defined.

**Required change.** Add to (c) (7):

> "A government-forced seat (V07's `v.manor_house`, the base's government seats) keeps its class's own toft and template
> row — its geometry is the seat's, as at THORP today — while its occupants' band, condition and upkeep are capped at the
> highest allowed band."

Add to T114-9: a seigneurial VILLAGE at economy 0 keeps its manor on the manor toft, with no F-PLAN.

---

## C. Minor defects

### E23. The legend's home, and a rule that would change uncapped maps

**Where.** 114 (h) (l.148–149); rendering's line "STATES §8.2's legend rule" (l.221).

**Evidence.**

- The legend panel and each thematic row's key belong to §9.5 (R9 l.338–344). §8.2 supplies the rows (R8 l.519–523).
- Today a prosperity key lists its bands whether or not any plot holds them.

**The failure.** "A thematic legend lists only the bands the model holds" changes the legend of every uncapped town that
lacks a band, such as a TOWN with no squalid plot. That breaks render goldens, against T114-1.

**Required change.** Move the home to §9.5, with §8.2 citing it, and restrict the rule:

> "where `FieldBands.ceiling` lies below the top, the prosperity key omits the bands above the highest allowed band and
> closes with 'richest: {band}'; uncapped, it is unchanged."

### E24. The draft states unconfirmed SettlementForge facts as confirmed

**Where.**

- 114 (a) (1): `economicState.priorities.economy`, "a copy of the same value" (l.21).
- 115 (a) (1): `magicLevel`, "the word its generation resolves from its magic slider and toggle", and `priorityMagic`,
  "its effect already sits in `magicLevel`" (l.260–263).
- 114 (g) (l.142).

**Evidence.**

- `read-sf.md` §1 labels the copy's equality P: `resolveConfig` floors one priority.
- `read-sf.md` §2 marks how `magicLevel` is resolved as **N**. Hypothesis A is only P.

**Required change.** Relabel these as PLAUSIBLE, and rest the decisions on established grounds:

- `magicLevel` is SettlementForge's resolved word, the one its own world law reads (`dossier-generation.md:441-443`), and
  it already flows through the port;
- reading `priorityMagic` would need a threshold of ours (J121);
- `economicState.priorities` is a second home of the value, which the closed-digest rule leaves unread.

### E25. The Economy's registry row must declare the island clause's step

**Where.** 114 (a) (4) (l.35–37).

**Evidence.** §7.8 says a continuous control has no thresholds inside, and that discrete effects "declare their effect in
the report" (EDIT l.1980–1981). Item 115's clause is a step at 75 inside the Economy.

**The failure.** The row also names two output metrics where §7.8 sweeps one ("the mean of the control's metric").

**Required change.** Add to (a) (4):

> "the island clause of item 115 is a declared owner step at 75, reported, outside the sweep (which runs with islands
> off); the sweep's monotone check reads the median plot area, and the top band's share is its second continuity check."

### E26. T114-5 cannot fail

**Where.** T114-5, "over the 35 births and the 12 after-tick dossiers no plot lies above its ceiling …" (l.187–188).

**Evidence.** Every census dossier sits at economy 50 (`read-sf.md` §1), which is no ceiling. The bar has no power.

**Required change.** Run each birth and each after-tick dossier re-offered at `priorityEconomy` 0 and 10, as modified
fixtures. T73-7 must pass wherever it passes uncapped, with `by: 'wealth'` wherever the floor binds.

### E27. Terms: bare "ceiling" and three different floors

**Where.** Throughout DRAFT: "the ceiling", "the wealth floor".

**Evidence.**

- The base keeps "ceiling band" for item 72's range end (MODEL l.590; PIPE l.1482).
- "Floor" already names item 72's floor band and item 31's geometry floor (PIPE l.3035).

**Required change.** Pin, in (k)'s terms, that design text writes "prosperity ceiling" and never a bare "ceiling" for this
concept. Rename "the wealth floor" to "the wealth lift" (with `by: 'wealth'` unchanged), so that one term serves each
concept.

### E28. S5d and the epoch's S5d must read the fold and the clamp

**Where.** The pipeline unit line (l.209–213) names §4.2 S2, §4.5 and §10.2 only.

**Evidence.** S5d prices each face against "provisional cut points computed as §4.5 computes the recorded bands" and
against the stage's demand (PIPE l.1020–1027).

**Required change.** Add one sentence to the pipeline seat: "S5d's provisional cuts, at generation and at an epoch, are
§4.5's folded and clamped cuts."

### E29. The reason for gating a settled island's refloat is wrong, and so is the default's anchor

**Where.** `draft-notes.md` D115-6: "A settled island's refloat counts as rising, because it lifts from the ground". The
scope part will write judgment J-A115.46 from this note. Also T114-1's anchor at "`wealthLevel` 0.5".

**Evidence.**

- A settled island is still aloft: "settled (elevation at the floor of its band, districts declined)" (PIPE l.3596). V05
  §0 says "the island sinks to its lowest height and stands empty" (V05 l.169).
- The base declares no default wealth level (`read-base.md` C1).

**Required change.**

- Restate the reason: "a settled island is empty at its floor; re-peopling it is a rising, which V05 already gates by the
  rung (§3.15 (4), l.1420)".
- Pin in (a) (2): "the one-click default intent is economy 50, the wealth level derived as 0.5". This closes the base's
  gap that T114-1 relies on.

---

## D. Points checked and found sound

- **The S2 fold is continuous and monotone at whole positions.** At `at = k⁺`, band `k` holds `W_{≥k}`. At `at = k`, it
  holds `W_{≥k}`. It is the identity at the top rank, and feasible by construction.
- **The wealth floor never binds standalone.** I checked every interval between V08's rows (l.828–830), for
  `wealthBand(e/100) + 1 ≤ 2 + 3·min(e, 50)/50` at every `e`. On a dossier, Prosperous and Wealthy lift to rich,
  Comfortable to prosperous, and Moderate to comfortable, as the draft states.
- **The numbers in the draft are right.**
  - Economy 0 gives modest whole, with 0.978 of the default town's households.
  - `button.economyUp` gives 17, 34 and 50.
  - Parity uses the single row `{0, top}`.
- **The district range still holds its own band.** A district's band is banded by the clamped cuts, so it never lies above
  the ceiling (J-A72.50). The pressure's excess is measured against the clamped range, so nothing is counted twice.
- **The underground and the undercity** are banded by the town's `FieldBands` (II.7.3, II.7.5), so the clamp reaches them
  with no new text.
- **The terms of items 102 and 111** stay value terms, and their bars hold a fortiori with fewer, wider bands.
- **An island town is never capped under the default tables.** Every economy the gate admits (≥ 75) has `at` = 5 at
  creation, and at every epoch by the `max` with the founding's row. E8 covers edited tables.
- **Skipping a draw under a failed gate shifts no other draw.** Every island draw is keyed by lineage and index (V05
  §3.18, l.1565–1578).
- **Rising and standing are handled soundly.** The gate binds generation, `raiseIsland` and a settled refloat. Floating
  and waning islands follow the supply law, which keeps item 22's "wane, never vanish" and J-V5.10's holds intact. Magic
  `none` wanes islands over their dwells in every document. Declared and locked islands hold.
- **The node bonus is unchanged.** It stays a term of the supply law, applied after the gate, and T-V5-25's fixtures are
  covered by "every island fixture … with the gate held".
- **The count, pins and locks are handled.** An integer count under a failed gate opens nothing, and forced slots stay
  held. A locked slot is neither opened nor closed (II6 (7)).
- **Thorp, village, town, metropolis and hood** are gated by the rung first, or by the hood's recipe. A village product
  carried down from a town continues V05's steps. V07's contradiction is assigned for a fix.
- **The census effect is correctly stated.** Every census dossier is at economy 50, and 32 of the 35 births are `medium`,
  which reads low.
- **Replaying a history from item 113 is sound.** The ceiling is held at the present word, and a symbolic peak only sizes
  remnants (DR36). No `builtBand` rises above the ceiling. E18 covers refounding.
- **Save, load, undo and redo are sound.** `FieldBands` is model data inside the digest. Each Economy change is one undo
  step. Load recomputes from the recipe and the log.
- **J-M5 is narrowed coherently.** The other four sliders stay unread. F-V8-8 extends the `ReceiptRow` range, whose
  comment must read "F-V8-1 … F-V8-8".
- **No deferral wording.** A grep of DRAFT for TBD, pending, later, optional, "if needed" and "may be" finds only "a later
  change", which describes a case.

---

## Summary of the required changes

1. **E1.** Make every read continuous: blend band `c`'s row by `f`; read named bands at `c` with probability `f`; define a
   row for comfortable on the four-row tables. Add knot and manor-share cases to T114-3.
2. **E2.** The sweep's fallback may touch only the layer 1 derivation row, never the owner-stamped cells.
3. **E3.** Give fixed cuts their share, `lower_c + (1 − f)(1 − lower_c)`. Keep V01's shanty condition on the wealth.
4. **E4.** Define the Economy control, the clerk and Surprise me where a wealth level is stored. Add Follow the Economy.
   Test on older documents.
5. **E5.** Key `factTier` for the economy and the creation slice's magic to the creation. Show the recorded value. Test
   migrated dossier documents.
6. **E6.** An epoch rewrites the cuts only when `at` changes. The rise is limited to one rank per epoch. Correct (e)'s
   sentence and T114-8.
7. **E7.** Declare `BandSet` once, with `ceiling`, and give it a home. Define packs without the rows.
8. **E8.** Precedence for an author's cut edits. `editTable` lifecycle for both tables. 115 (e) must hold under edited
   tables.
9. **E9.** Declaring with the setting off (bent) or under parity (refused). A `sky` assignment is a forced slot. Pin the
   locked island's fate.
10. **E10.** Island migration by state, with an honest account of what is kept. An old unstated `none` reads absent.
11. **E11.** V03 and V04 have landed. V04 gets no part, or a late seat. Fix (k)'s header.
12. **E12.** The richest quarter's enclave kept, with probability `f`, or its loss stated. Add a bar.
13. **E13.** `FieldBands.ceiling` is written only below the top. `by` ties read `economy`.
14. **E14.** Restate T114-4 around the oracle and a pinned skeleton. Qualify (c) (3)'s reason. State that a lower economy
    builds a smaller town.
15. **E15.** Edge (13)'s identity holds iff `at ≥ r_max`.
16. **E16.** The declaration refusal reads the carried word, and the gate reads the magic in force. The control names the
    difference.
17. **E17.** Labels name the highest band the model holds. The economy priority is a real, with T1 stepping by 1 and no
    rounding at the gate. Add an edge for an empty band.
18. **E18.** A refounding happens under the recorded ceiling. At a destruction outright, the old settlement's islands fall.
19. **E19.** At an epoch, a generated access the magic no longer admits converts to an admitted kind. A placed one holds.
20. **E20.** The dossier refusal gets per-clause variants and the hand-drawn island alternative. Buttons only for failing
    clauses the map owns. A parity reason row. Pin the hint key.
21. **E21.** Add `moderate → low` to the magic row, with a fixture.
22. **E22.** A forced seat keeps its own toft and template. Add a VILLAGE bar at economy 0.
23. **E23.** The legend's home is §9.5, and the rule applies only to capped maps.
24. **E24.** Relabel the PLAUSIBLE SettlementForge facts, and rest the choices on established grounds.
25. **E25.** The registry declares the island step at 75, and names the sweep's metric.
26. **E26.** T114-5 runs on modified fixtures at economy 0 and 10.
27. **E27.** Write "prosperity ceiling", never a bare "ceiling". Rename "wealth floor" to "wealth lift".
28. **E28.** S5d uses the folded, clamped cuts.
29. **E29.** Fix the reason for gating a settled refloat. Pin the one-click default: economy 50, wealth 0.5.
