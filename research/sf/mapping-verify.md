# Adversarial verification of the dossier-to-design mapping (sf/verify)

> PENDING FABLE REVIEW — Opus-produced (sf/verify).

## PROGRESS

| step | what | state |
|---|---|---|
| 0 | lane logged STARTED (18:41); read `research/sf/mapping.md` in full (lines 1–759); claim list chosen | done |
| 1 | proved the scratch copy `scratchpad/sf/tree/` byte-identical to branch commit `5d699cc683` (`src/`, 2 320 files, and `package.json`) | done — `sf/verify/treecheck.out` |
| 2 | load-bearing claims: ids, the clock, what is spatial (V1–V12) | done 18:58 |
| 3 | mapping-table claims (V13–V31) | done 19:02 |
| 4 | gap claims (V32–V44) | done 19:08 |
| 5 | conflict claims (V45–V55) | done 19:08 |
| 6 | change-feed claims (V56–V69) | done 19:10 |
| 7 | fresh executions (same-seed identity, reroll, a year of ticks) with a no-write proof; section F (V70–V72) | done 19:12 |
| 8 | outcome section, verdict index; queue row B-sf/verify; LANDED line | done 19:13 |

## 0. Outcome — what holds, and what the plan must carry instead

Seventy-one claims of `research/sf/mapping.md` were re-derived from SettlementForge's source at `5d699cc683` or from real
outputs (V1–V71), plus one interaction the mapping did not state (V72). **53 are CONFIRMED, 18 CORRECTED, none
REJECTED.** The three things the plan rests on hold: the settlement `id` is a seed hash that survives reloads, same-seed
regeneration and section rerolls (V1); SettlementForge's clock is one week per tick, a 52-week 4-4-5 year, spring first
(V7); and the dossier holds no coordinate of anything, its only place-like list fixed at generation (V9, V55). Every
count the mapping took from its census was reproduced by independent code, and the lit year the surveys ran was re-run
here and came out byte-identical (exec2).

**The corrections, in the order the plan would meet them** (each is CONFIRMED by the source line or output cited in
its V-entry):

1. **`catalogId` is often missing (V3).** 695 of 5 846 birth records (11.9 %, in 129 of 155 dossiers) have none —
   every `cascade` record, 49 of 64 `coherence_repair`, all 14 `faction_boost` — and none of SettlementForge's six ways
   of adding an institution later writes one (V57). They bind by `name:` (or `uid:`), and T10 must class them by name,
   category and tags. At birth every present `catalogId` equals the slug of its record's name.
2. **Institution renames (V5, V62, V69).** The institution rename writer (36 declared surfaces, 33 observed) has no
   caller on the branch and there is no `rename-institution` edit. Institutions are renamed only by a calamity
   demotion (`demotedFrom`, `worldPulseFate: 'demoted_by_disaster'`, id re-minted) and a reconstruction upgrade
   (`promotedFrom`, `upgraded_by_reconstruction`); both keep the OLD kind's `catalogId`, so the port must re-class the
   record from its new name (F15 plus an F3 re-designation), and J-M4's receipt list must add both stamps.
3. **`controlledInstitutions` is not keyed by `catalogId` (V30, V54).** It holds `stablePart(id || name)` — the slug
   of the institution's own id, else its name; equal to `catalogId` at birth by construction, different for minted ids
   and cascade records. Only the first twelve roster positions can be captured.
4. **A rival neighbour trades (V31).** SettlementForge blocks goods links only for a `hostile` neighbour or a suppressed
   economy; R3 and row 49 must not zero a rival's or cold-war partner's trade while the dossier lists links with it.
5. **Closures are `remnant`, not `removed` (V59).** Economic closures, abolitions and every tier-demotion fate except
   `abandoned` write `status: 'remnant'` with `_worldPulseInactive: true`; T11 and F2 must key on `worldPulseFate` and
   `_worldPulseInactive` before `status`, and F2 must add `abolished`, `disbanded` and `abandoned_with_the_settlement`.
   SettlementForge's closed list of 18 fates is `domain/worldPulse/worldPulseFates.js:56-75`.
6. **`captured_by_local_powers` is a closure (V60)** of a criminal house after a tier demotion — it names no power and
   is not a change of power association.
7. **Additions without receipts (V57, V58).** The upswing founding writes only `name, category, status, worldPulseFate`
   (dated by arrival alone); an ADD of an existing name is a reopen (F6); `foundedAt` is written by two paths only, so
   its absence does not mean "stood since the founding" (row 40).
8. **`destroyedByEventId` belongs to the settlement (V61)** — DESTROY_SETTLEMENT writes it on the root; drop it from F5
   and row 41.
9. **Tiers change without proposals (V47, V64):** a calamity lowers `tier` directly with no `tierHistory` entry, a
   resettlement forces `thorp`, and presets that lift proposal gating auto-apply; F8 must fire on a bare `tier` change.
10. **Quarters (V10):** 14 names are coded but the 155 show 13 (no Roadside Shrine, phrase "At the settlement edge");
    the Waterfront District carries one of two phrases (coast or river). T6 and T7 need both rows.
11. **An economy slot already exists (V35):** the Blueprint names an untyped `circumstances.economy` (§4.2 S0, §7.7
    item 2); G-D3's sector shares should type that slot rather than add `EconomyShares` beside it.
12. **Record counts (V46):** cities hold 33–55 records (not 33–52), metropolises 47–61.
13. **The arrival week is outside the dossier (V70):** the port's last dating rung needs the campaign week as an
    optional host input, or an unreceipted change applies finished.
14. **Realm bearings (V71):** two placements' `x, y` give a placed partner's bearing; pack centroids matter only for
    unplaced partners; row 16's digest list omits `costField`, `biomes`, `climate`, `lakes`.
15. **New interaction (V72, PLAUSIBLE consequence):** under J-M9 almost every yearly epoch carries a changed population
    target, so every map rejection would lapse yearly (J-A20.74) — round the target or say that it is intended.

**Precision notes that change nothing the plan rests on** are kept in their entries: the id hash is FNV-1a plus a
second mix (V1); `elapsedMonths` is a derived legacy field and `history.age` is a second, frozen clock (V7); the
catch-up exists only in living or autonomous worlds (V8); three counts come from sf/outputs' smaller denominators (V11,
V27); `port` has two prose strings (V12); unknown culture tokens pass through (V14); twelve non-numeric name qualifiers
(V15); `impaired` is derived from impairments (V16); walls and gates are two keyword tests (V19); `magical_transit` is
unseen (V22); T16 lacks `wartime` and `slave_revolt` (V27); T8 lacks six landmark strings (V37); 96 of 155 dossiers
list a depleted deposit at birth (V38); the record count can grow (V48); the 12-entry population history loses long
advances' interiors (V63); a decree cause may carry no world effect (V67).

## Method, baseline and scope decisions

**What was verified.** `research/sf/mapping.md` (landed 18:40, read in full, lines 1–759) states SettlementForge facts it
took from the four surveys and from its own census of scratch dossiers; it read no SettlementForge file itself. This
lane re-derives each chosen claim from SettlementForge's SOURCE at the branch baseline or from a real output, with a
file and line or an output path, and gives one verdict per claim: **CONFIRMED** (holds as stated, possibly with a
precision note that changes nothing the plan rests on), **CORRECTED** (the substance is wrong or incomplete in a way the
plan would carry; the correction is stated), **REJECTED** (does not hold at all).

**Baseline (CONFIRMED by execution).** Branch `fp/integration-2026-09-23` is still at `5d699cc683` (branch-tip listing,
18:43). The scratch copy `scratchpad/sf/tree/` that the surveys generated from is byte-identical to that commit:
`sf/verify/treecheck.py` walked the commit's `src/` with `git show 5d699cc683:<path>` for every file — 2 320 files,
2 320 identical, 0 differ, 0 missing, 0 extra; `package.json` identical (`sf/verify/treecheck.out`). Source is therefore
quoted from the copy, as `src/<path>:<line>`. SettlementForge was touched only by read-only `git show` and
`git log --branches --no-walk`; nothing ran inside it.

**Outputs.** Counted claims were re-derived by an INDEPENDENT census (`sf/verify/census_v.py`, own code, not the mapping
lane's `census.py`) over the same 155 generated dossiers (`scratchpad/sf/outputs/r2/gen/*.json` minus `_runs.json`, and
`r2/soak/*.json`), whose provenance the treecheck above makes branch-true. Fresh executions of this lane (same-seed
identity, reroll, ticks) are in step 7.

**Scope decisions (recorded).** Read in part, as the legacy map's INPUT adapter: `src/domain/townMap/anchors.js` lines
36–62 only (the institution identity key the legacy entry used; sf/seam read it in full as input-side). Not read:
anything else under `src/domain/townMap/`; a grep once printed one line each of `townMap/mapDress.js` and
`townMap/townLayoutV2.js` (a `calendar.elapsedWeeks` read and a `spatialLayout.quarters` read) — nothing more of either
file was opened and neither is cited. No SettlementForge map design doc was read.

**Sources scanned in full for this lane:** `generators/spatialGenerator.js` (335 lines), `domain/clock.js` (85),
`domain/worldPulse/intervalWeeks.js`, `domain/worldPulse/worldPulseFates.js` (1–104), `domain/normalizeSettlement.js`
(1–215). Everything else is quoted by range, with the grep that found the range.

## A. The claims the plan rests on — ids, the clock, what is spatial

**V1 — the settlement `id` (mapping row 1, J-M12, 4.11).** Claim: `id` is `s_` + 16 hex, an FNV-1a hash of `_seed`;
stable across reload and a same-seed regeneration; a new seed is a new id.
Re-derivation: `src/domain/normalizeSettlement.js:63-79` (`idFromSeed`): FNV-1a 32-bit (offset `0x811c9dc5`, prime
`0x01000193`) gives the first 8 hex; a second FNV-style pass (`h2 = h1 ^ 0xdeadbeef`, character codes shifted by
position) gives 8 more; `return s_${part1}${part2}`. `:190-192`: `if (!out.id) { out.id = out._seed ? idFromSeed(out._seed)
: contentId(out); }` — stamped only when absent, so a stored id is never recomputed. `src/generators/steps/assembleSettlement.js:328-351`
attaches `_seed` before that normalize so a generated id derives from the seed. Section rerolls
(`generators/generateSettlementPipeline.js:481-482`, `:649-661`) mint a fresh seed and return it as the root
`_regenSeed`; `src/domain/regenerationMode.js:52` lists `'_seed', 'id', 'name', 'tier'` among the "Hard anchors that even
a Reforge keeps". Executed (`sf/verify/exec1.mjs` → `sf/verify/gen/exec1.log`): the sf/outputs town config and seed
`sfout-town-1` generated twice here are byte-identical to each other AND to sf/outputs' `gen/town-1.json`
(`s_a37904e104ba189e`, "Berghafen", 59 institutions); seed `sfverify-town-x` gives `s_2e64421d62a623d0`; all 155
dossiers carry `id == idFromSeed(_seed)` and keep it through `normalizeSettlement` (a reload); an NPC reroll returns
only `npcs, relationships, factions, conflicts, _regenSeed` — `id` and `_seed` are not among the parts it replaces.
**Verdict: CONFIRMED**, with two precision notes: the hash is FNV-1a for the first half and a second FNV-style mix for
the second, not one FNV-1a; and "a new seed is a new id" is true of `_seed` only — a section reroll's fresh seed
(`_regenSeed`) never changes the id, which is exactly what J-M11 needs.

**V2 — institutions carry no id at birth; the name is SF's join key (rows 26, 27; conflict 4.2).**
Re-derivation: census_v C1: 5 846 institution records, 0 with an `id` key, 0 with a `status` key.
`src/domain/institutionRename.js:4`: "An institution's NAME is its join key"; `:13-14`: "17,361 of 17,361 generated
records carry `name`; none carries `id` or `localUid`". Ids appear later only where a writer mints one:
`src/domain/worldPulse/institutionLifecycle.js:979` (a pulse-built institution: `id: institution.<slug>`) and
`src/domain/worldPulse/calamityKernel.js:311-313` (a demoted one, re-minted from its new name). **Verdict: CONFIRMED.**

**V3 — uniqueness, and the `catalogId` the binding key starts with (row 26, 28; 4.2).** Claim: within each of the 155
dossiers no two records share a `catalogId` or a name; binding precedence `cat:` → `uid:` → `name:`; `catalogId` is
"a KIND key, stable".
Re-derivation (`sf/verify/catalog.out`): 0 duplicate non-empty `catalogId`s and 0 duplicate names in any of the 155.
BUT **695 of 5 846 records (11.9 %), in 129 of 155 dossiers, have no `catalogId` key at all**: every `cascade` record
(631 of 631), 49 of the 64 `coherence_repair` records, all 14 `faction_boost` records and the one `custom` record
(which has a `localUid`); all 695 carry a `category`, 627 carry `tags`. A pulse-built institution is also created with
no `catalogId` (`institutionLifecycle.js:978-990`: `id`, `name`, `category: patch.category || 'civic'`, …). And at
birth every present `catalogId` equals the slug of the record's own name (5 151 of 5 151): catalogue ids ARE name
slugs, so `cat:` and `name:` agree at birth and part only after a rename or a demotion (V5).
**Verdict: CORRECTED.** Uniqueness holds. The correction: `catalogId` is absent on about one record in eight at birth
and on every institution the simulator builds; those bind by `name:` (or `uid:`), so their binding key breaks on any
name change, and T10's class lookup must fall back on name, category and tags for them — row 28's fallback is written
only "for unknown and custom kinds".

**V4 — SF's anchor precedence (row 26, s C-7).** Re-derivation: `src/domain/townMap/anchors.js:50-56`
(`anchorForInstitution`): `cat:${catalogId}` when a non-empty string, else `uid:${localUid}`, else
`name:${slugify(inst?.name)}`; its typedef (`:40`) calls `catalogId` the "catalog identity anchor (regen-stable slug)".
**Verdict: CONFIRMED.** (With V3: the first rung is missing on 11.9 % of records.)

**V5 — renames and their receipts (row 27, F15, J-M4).** Claims: "SF's rename writer cascades a new name across 33
stored-handle paths (m§1) and it arrives as a change"; F15 detects "`rename-*` committed edits and SF's rename
cascades" for settlement, power, institution and NPC; J-M4 rests on "SF routes its renames through one cascade writer
with receipts".
Re-derivation: `src/domain/institutionRename.js:124-125`: "36 declared rows, 33 of them observed carrying an exact
roster name". A search of all of `src/` for its writers (`applyInstitutionRenameToSettlement`,
`institutionRenameChanges`) and for the removal sweep that reuses its list
(`src/domain/institutionRemoval.js:150`, `:166`) finds NO caller; the only mention outside the two files is a comment
in `domain/factionRename.js:286`. The committed rename ops named anywhere in `src/` are `'rename-faction'` (18 sites),
`'rename-npc'` (15) and `'rename-settlement'` (16); there is no `rename-institution`. The one institution rename the
branch performs is a calamity DEMOTION, `src/domain/worldPulse/calamityKernel.js:301-317`: "rename in place, keeping the
slot standing" — `name` becomes the lesser's, `id: institution.<slug of the new name>`, `description: ''`, `tags: []`,
`worldPulseFate: 'demoted_by_disaster'`, `demotedFrom: <old name>`; `catalogId` and `category` ride along unchanged
from the spread.
**Verdict: CORRECTED.** (a) The institution rename writer (36 declared surfaces, 33 observed) is built but unwired on
the branch: no edit can rename an institution today. (b) Power, NPC and settlement renames are wired
(`rename-faction`, `rename-npc`, `rename-settlement`). (c) The institution renames that DO reach a dossier are
demotions, and their receipt is `demotedFrom` plus `worldPulseFate: 'demoted_by_disaster'` — F15 and J-M4's receipt
list must add it. (d) A demoted record keeps the GREATER kind's `catalogId` under the lesser's name, so the binding key
`cat:` survives (good) but a T10 lookup by `catalogId` would keep the old class: the port must re-class a record whose
`worldPulseFate` is `demoted_by_disaster` from its new name — an F3-style conversion of the use, not "no change".

**V6 — NPC ids (row 63, F17).** Claims: `npc_<n>` survives reload and edits, NOT a regeneration or a reroll
(renumbered); structural seats `npc.<power>_<role>_<i>`; a successor takes a NEW id `npc.successor_<n>` and
`replacedNpc` holds the old NAME.
Re-derivation: `src/domain/regenerationPreservation.js:16-18`: "NPC ids are positional. generateNPCs stamps
`npc_${idx + 1}` over the finished roster, so a reroll re-issues npc_1..npc_N to entirely different characters";
executed (exec1 E4): after an NPC reroll 7 of the town's 8 NPC ids name a different person. Census_v C23b: 1 288
`npc_<n>` and 152 structural ids (`npc.thieves_guild_kingpin_0`, `npc.landed_gentry_lord_mayor_0` …).
`src/domain/worldPulse/successorNpc.js:33`: `id: npc.successor_${num}` with `num = rng.randInt(100000, 999999)`;
`:51`: `replacedNpc: ousted.name || null`. **Verdict: CONFIRMED**, with one note for G-D5 (staged): the successor copies
the ousted NPC's `institutionId` (`:38`), not its `institution` name field, so a successor of a notable with a named
workplace may carry no workplace name.

**V7 — the clock's unit (row 76, conflict 4.8, part 5.3).** Claims: one tick is one week; a 52-week year of 4-4-5
months; 13-week seasons, spring first; `worldState.tick` and `calendar {elapsedWeeks, month, year, season}`; "our week
= SF's `calendar.elapsedWeeks`, no conversion".
Re-derivation: `src/domain/worldPulse/worldState.js:23-33` ("INTEGER WEEKS ARE CANONICAL. The temporal constitution
fixes tick = 1 week and year = 52 weeks … four 13-week seasons, each split into months of 4, 4, and 5 weeks");
`:41-46` (`WEEKS_PER_YEAR = 52`, `WEEKS_PER_SEASON = 13`, `MONTH_END_WEEKS = [4, 8, 13, 17, 21, 26, 30, 34, 39, 43, 47, 52]`);
`:57` (`SEASONS = ['spring', 'summer', 'autumn', 'winter']`); `:305-313` (a new world: `tick: 0`,
`calendar {elapsedWeeks: 0, elapsedMonths: 0, month: 1, year: 1, season: 'spring'}`); `:718-738` (`calendarFromWeeks`:
year = ⌊weeks ÷ 52⌋ + 1). `src/domain/worldPulse/advanceInterval.js:97-101`: "an Advance runs N REAL one-week ticks …
ALWAYS at one_week granularity"; `src/domain/worldPulse/pulseKernel.js:201-209`: each kernel call sets `tick + 1` and
advances the calendar one interval; `src/domain/worldPulse/intervalWeeks.js`: one_week 1, one_month 4, one_season 13,
one_year 52. So `tick` and `elapsedWeeks` start at 0 and move together.
**Verdict: CONFIRMED**, with two precision notes: the calendar also carries a derived legacy `elapsedMonths`
(weeks × 3 ÷ 13), and an old save that holds only `elapsedMonths` is read as weeks = months × 4
(`worldState.js:694-698`), so the port should read `elapsedWeeks` and never `elapsedMonths`; and `history.age` is NOT
on this clock — `worldState.js:705-713`: "THIS IS THE MOVING CLOCK, AND THE ESTATE RUNS TWO … `calendar.year` and
`history.age` answer different questions and must never be compared or added" (G-D9's `age` → stage count must not
be advanced by SF weeks).

**V8 — catch-up and who ticks (4.8).** Claims: a catch-up may run up to 26 weeks; only canon members of a campaign tick;
a draft or a standalone settlement never does.
Re-derivation: `src/domain/worldPulse/simulationRules.js:1388`: `CATCH_UP_CAP_WEEKS = 26`;
`src/store/campaignAdvanceSession.js:1388-1420`: the catch-up runs "for a LIVING/AUTONOMOUS world" on open ("a
dm_advanced open — the default — returns WITHOUT loading the sim chunk"), past the cap the overflow weeks are dropped;
`src/domain/worldPulse/worldSnapshot.js:107-109`: the pulse reads only saves listed in `campaign.settlementIds` that pass
`isCanonSave` (`src/domain/campaign/canon.js:38-40`: phase `canon` or a `canonizedAt`). **Verdict: CONFIRMED**, with a
precision note: the capped catch-up exists only for worlds that opted into living or autonomous time; a default world
moves only when the DM advances.

**V9 — no coordinate anywhere in the dossier (part 3's opening, o§6.2).** Re-derivation: census_v C17 scanned every key
of the 155 dossiers against 40 coordinate-like names (x, y, lat, lon, position, point, bearing, angle, heading,
azimuth, cellId, centroid, polygon, geometry, bbox, bounds, compass, direction, orientation, side …): the only hits are
`economicState.tradeLinks[].direction` (import or export, 4 values) and `powerStructure.factionRelationships[].direction`
(a trend word such as `stable`), plus false positives on `goal.long`. **Verdict: CONFIRMED.**

**V10 — the quarter list (rows 19–20, T6, T7).** Claims: "14 fixed names; 0–8 per settlement"; "one FIXED phrase per
name (14 phrases)"; "Eastern district (traditional)" on every Religious Quarter (154 of 154), the only compass statement.
Re-derivation: `src/generators/spatialGenerator.js:59-222` codes 14 quarter names, each switched on by a case-sensitive
substring test over the institution NAMES (`:21`: `has = (keyword) => instNames.some(n => n.includes(keyword))`):
Market Quarter, Religious Quarter, Roadside Shrine, Noxious Trades Quarter, Waterfront District, Alehouse & Common,
Fishing Landing, Woodcutters' Ground, Artisan Quarter, Government Quarter, Mages' Quarter, Shadows District, Wealthy
Residential, Common Residential. Religious Quarter's location is the literal `'Eastern district (traditional)'` (`:77`).
Waterfront District has TWO phrases (`:121`: `maritime ? 'Along the coast' : 'Along the river'`, from
`worldLaw.supportsMaritime()`). Census_v C9: 13 names seen (Roadside Shrine in 0 of 155), 14 name–phrase pairs
(Waterfront District 14 × coast, 11 × river), 0–8 quarters per settlement, Religious Quarter 154 of 154 "Eastern".
**Verdict: CORRECTED (small).** SF has 14 quarter names but the 155 show 13; the 14 phrases belong to 13 names because
Waterfront District carries one of two. T6 and T7 have no row for Roadside Shrine and its phrase
`'At the settlement edge'` (a shrine claim, a soft edge row), and T7 must key Waterfront's phrase per value. The
compass claim holds.

**V11 — the Market Quarter artefact (conflict 4.12, o§6.1).** Claim: "a Market Quarter in 36 of 36 towns, 0 of 24
cities". Re-derivation: census_v C9d over the 155: 38 of 38 towns, 0 of 24 cities, 3 of 23 metropolises, none below
town; the switch is `spatialGenerator.js:62` `if (has('Market'))`, a case-sensitive `Market` in some institution name.
**Verdict: CONFIRMED**, with a denominator note: "36 of 36" is sf/outputs' figure over its own 153-dossier set
(`dossier-outputs.md:436`); over the 155 it is 38 of 38 towns, 0 of 24 cities and 3 of 23 metropolises. The
conclusion — SF's absences are artefacts of a name test, so an absent quarter is never a fact (J-M1) — stands. (The
same source line says every name carries ONE phrase "except the Waterfront District" — the mapping dropped that
exception, V10.)

**V12 — access key and its prose (row 10).** Claim: `spatialLayout.tradeAccess` is "one prose string per key, paired 1:1
in 155 of 155". Re-derivation: `spatialGenerator.js:318-333`: `TRADE_ACCESS_BY_ROUTE` fixes one string for
crossroads, river, road and isolated, but `port` has two (`portAccess`: 'Coastal port (harbour and shipyards)' when the
world law supports maritime, else 'Inland river port (wharves and barge docks)'), and any other key is passed through
verbatim (`|| tradeRoute`). Census_v C8b: in the 155 each key had one string; C8c: `economicState.tradeAccess` equals
the key in 155 of 155. **Verdict: CONFIRMED for the sample**, with a precision note: the 1:1 pairing is a property of the
sample (every port was maritime), not of SF; the port must read the key, never the prose — as row 10 already does.

## B. The mapping table (part 1)

Counts below are census_v (`sf/verify/census_v.out`) and census_v2 (`sf/verify/census_v2.out`) over the 155; source
lines are the branch copy.

| id | mapping claim (row) | re-derivation | verdict |
|---|---|---|---|
| V13 | row 9: `config.terrainType` plains 35, coastal 25, riverside 23, hills 21, mountain 20, forest 19, desert 12; `config.terrain` null in 155 of 155 | census_v C6: identical counts; `config.terrain` is None in 155 | CONFIRMED |
| V14 | row 13: `config.culture` = `cultureProfileKey` (11 keys, 155 of 155); raw `mediterranean` → `latin` 18 of 18 | census_v C7: 155 equal, 11 keys, 18 of 18 → latin; `src/data/cultureProfiles.js:527-529` `CULTURE_ALIASES = { mediterranean: 'latin' }`; `:531-535` "Unknown values retain their authored token and use the neutral mixed grammar" | CONFIRMED; note: an unknown culture token passes through as the key, so the port's culture table needs a fallback row |
| V15 | row 29: 22 count-range name patterns incl. the housing records `Dwellings (…)`, `Housing (… structures)` | census_v C3: 22 distinct range-bearing names, the same list; C3b: 14 NON-numeric parenthesised qualifiers also occur — (district) 47, (established) 44, (multiple) 38, (guild) 36, (red light district) 34, (commercial) 33, (part-time) 30, (official) 27, (if walled) 26, (resident) 24, (open cast) 15, (word of mouth) 7, (divine, 1st level) 3, (powerful) 2 | CONFIRMED; note: only numeric ranges are counts — the parser must leave the other twelve qualifiers in the kind label |
| V16 | row 37, T11: `status` absent at birth; later `active`, `impaired`, `remnant`, `ruined`, `removed`, `destroyed`, `vacant`; `vacant` is an empty seat | census_v C1: 0 of 5 846 with `status`; `src/domain/entities/status.js:23-30` types five (`active`, `impaired`, `removed`, `destroyed`, `vacant` — "institution exists but lacks leadership (an NPC slot is empty)"); the pulse writes `remnant` and `ruined` (13 write sites); `:191-195` `effectiveStatus` DERIVES `impaired` from visible impairments | CONFIRMED; note: read `impaired` from `impairments[]` (visible ones), not from a stored status |
| V17 | row 38: impairment types split physical (capacity, infrastructure, access, supply_starved) / non-physical (legitimacy, influence, wealth, staffing, corruption) | `status.js:31` `InstitutionImpairmentType` = exactly those nine | CONFIRMED |
| V18 | row 43: 30 income sources; percentages sum to 100 in 155 of 155 | census_v C4: 30 sources; sums {100: 155} | CONFIRMED |
| V19 | row 52: `hasWalls` = `hasGates` in 155 of 155 (104 both true, 51 both false) | census_v C5: identical; but `src/generators/priorityHelpers.js:56-57` computes them by DIFFERENT keyword lists (walls: walls, citadel, gates (if walled), inner citadel, massive walls, palisade, earthwork; gates: gates, town walls, city walls, massive walls, palisade); census_v2 R66: `hasWalls` ⇔ a non-empty walls bucket in 155 of 155 | CONFIRMED for the sample; note: equality is not a law — a Citadel-only roster would be walled without gates; key R2 on the walls bucket, as it does |
| V20 | row 66: wall records per settlement, towns 0 / 1 / 2 = 5 / 15 / 18 of 38 | census_v C22 and v2 R66: identical; also 9 thorps, 6 hamlets and 9 villages carry one wall record (Palisade, Palisade or earthworks) | CONFIRMED |
| V21 | row 60: `controlsInstitutionIds`, `funds…`, `staffs…`, `protects…` declared, never generated | the four names occur in 5 files only (`settlement.schema.js`, `factionProfile.js`, `explanation.js`, `entities/propagate.js`, `prose/entryLexicons.js`) — typedefs, copies and reads, no writer; 0 of 155 births and 0 of the 16 tick files (12 settlements, 4 world states) carry them | CONFIRMED |
| V22 | row 17: `isolationSupport.paths[].type` ∈ local_foodshed, hinterland, reserves, seasonal_access, patronage, magical_transit; `connected` 136 of 155 | `src/generators/isolationSupport.js:54` and `settlement.schema.js:125`: the six; census_v C20: connected 136; types seen: local_foodshed 18, seasonal_access 19, patronage 11, reserves 9, hinterland 3 — `magical_transit` 0 | CONFIRMED; note: `magical_transit` is real but unseen in the 155 |
| V23 | row 42: prosperity is a seven-step ladder (Subsistence internal … Wealthy); at birth Poor 42, Prosperous 41, Comfortable 36, Moderate 25, Struggling 11 | `src/data/constants.js:85-94` `PROSPERITY_TIERS` (Subsistence "remapped to Struggling/Poor before emission"); census_v C21: identical counts | CONFIRMED |
| V24 | rows 55–57: 17 government names (counts as listed), `government` = `governingName`; 44 power names; categories economy 295, military 146, noble 124, religious 116, government 114, criminal 53, other 47, magic 46; 2–10 per settlement; relation types dependent 273, tense 178, subordinate 134, competitive 134, symbiotic 66, corrupted 4 | census_v C11–C13: every count identical; 0 powers with an `id` | CONFIRMED |
| V25 | rows 46, 47, 53, 54, 61, 63: name joins — chain processors 2 585 of 3 381 (27 unresolved names), trade dependencies 1 001 of 1 001, services 8 933 of 9 065 (six parenthesised pseudo-names), institutional services 578 of 578 case-folded, social groups' power 393 of 393, NPC institution 92 of 92, NPC power 1 440 of 1 440 | census_v2 R46–R61 and census_v C23: every figure identical, the same 27 unresolved names and the same six pseudo-names | CONFIRMED |
| V26 | row 48: `tradeLinks` only with an imported neighbour; `direction` is the flow; partner by NAME | `src/domain/region/tradeLinks.js:12-14` ("Empty when there's no neighbour, the relationship is hostile/suppressed, or there's no overlap"), `:45-60` (`direction` 'import'/'export', `partner: np.name`); census_v C19: 4 links in 1 of 155 (`town-nb-1`, partner "Pianopagus") | CONFIRMED |
| V27 | row 71, 4.17 (a): `stress` = `stressors`: null 97, one object 38, an array 3; 14 of the 15 types seen | census_v C14 over the 155: null 108, object 43, array 4; `stress == stressors` 155 of 155; `src/generators/stressPriority.js:10-26`: 15 types; census_v2 R71: 14 seen (`slave_revolt` never) | CONFIRMED with a denominator note: 97 / 38 / 3 is sf/outputs' 138-dossier census (`dossier-outputs.md:92`); T16 has no row for `wartime` or `slave_revolt` |
| V28 | row 77: `simulationTrace` is 23 % of a dossier's bytes | census_v C18: median 23.8 %, range 15.8–31.1 % (compact JSON) | CONFIRMED (as a median) |
| V29 | row 15: 34 deposit keys seen in `config.nearbyResources`; `resourceAnalysis.availableResources` 57 keys | census_v2 R15: 34 and 57 | CONFIRMED |

**V30 — who controls an institution after ticks (row 59, conflict 4.6, F10).** Claim: `controlledInstitutions` is
"SIMULATOR-written (absent at generation), keyed by `catalogId`: 28 of 28 resolve to a kind of the same dossier; two
powers may hold one kind".
Re-derivation: absent in 0 of 155 births (grep); present in 9 of the 12 after-tick settlement files (28 entries). The writer is the faction contest:
`src/domain/worldPulse/factionCompetition.js:155-166` builds the target list as
`id: stablePart(entry.id || entry.name || entry.label || institution_${index})` over the settlement's institutions,
`.slice(0, 12)`; `:867` picks the target; `:904` accretes `target.id` into `controlledInstitutions`; `:590` calls the
projected lists "institution ids". `src/domain/worldPulse/brokerageStamps.js:254-257` confirms: "`stablePart(id or name
or label or the positional fallback)` is exactly what factionCompetition's institution target uses … RECORDED EDGE: the
capture chooser looks at the first twelve institutions only". `src/domain/worldPulse/brokeragePatronage.js:219-221`:
two powers may claim one house ("which the accreting union permits"; ties break by codepoint of the faction-state
key). Executed (`sf/verify` inline check over the 12 after-tick settlement files): 28 of 28 entries equal BOTH a
`catalogId` and the slug of a name — the census cannot tell the two apart because at birth every catalogue id is its
name's slug (V3).
**Verdict: CORRECTED.** `controlledInstitutions` is keyed by the SLUG OF THE INSTITUTION'S OWN `id`, else of its NAME
(`stablePart`: lower-case, non-alphanumerics to `_`, 80 characters) — never by `catalogId`. It equals the `catalogId` of
an untouched catalogue record by construction, but differs for a record that carries a minted `id` (a pulse-built or
demoted institution: `institution.x` slugs to `institution_x`) and names cascade records that have no `catalogId` at
all. The port must resolve these entries by `stablePart(id)` then `stablePart(name)` against the current roster, not
by `catalogId`; and only the first twelve institutions in roster order can ever be captured.

**V31 — a rival neighbour's trade (rows 48–49, R3).** Claim: "hostile and rival partners carry no trade road" (R3) and
"no trade weight" (row 49). Re-derivation: `tradeLinks.js:26`: `NO_TRADE_RELATIONSHIPS = new Set(['hostile'])`, and
`:48` also stops links when the neighbour's `dynamics.economyMode === 'suppress'`; the relationship vocabulary includes
`rival` and `cold_war` (`src/domain/worldPulse/relationshipCompatibility.js:41-52`, `src/store/neighbourSlice.js:24-34`).
So SettlementForge generates goods links with a RIVAL (and a cold-war) neighbour.
**Verdict: CORRECTED.** SF blocks trade only for a `hostile` neighbour or a suppressed economy. Under item 20 (h) (iii)
the map must not contradict a dossier fact, so R3 and row 49 must read: a hostile partner carries no trade road; a
rival or cold-war partner carries whatever trade the dossier's `tradeLinks` list (its weight may be damped, never
zeroed while links exist).

## C. Gaps in the design (part 2)

Each gap has two halves: the dossier fact and "the design today". Both were re-derived — the SF half from source or
outputs, the design half from `docs/ARCHITECTURE.md`, unchanged at sha256 `e9c0b828c9dd1779…` (re-hashed 18:59).

| id | gap | re-derivation | verdict |
|---|---|---|---|
| V32 | G-D1 (a): powers of category military (146) and magic (46) have no `Faction.kind` | census_v C12: military 146, magic 46; `ARCHITECTURE.md:1588` `Faction.kind: 'guild'\|'religion'\|'lordship'\|'company'\|'criminal'\|'council'` | CONFIRMED |
| V33 | G-D1 (b): `Faction` is "base schema from M1, materialised by the module" — the base never materialises it | `ARCHITECTURE.md:8862-8864` ("Base schema from M1, materialised by the module: the relation store …, factions with roles and goals, religions, the government's offices"); `:11360` M4b "the content module `@plat/sim` … factions with roles, goals and reconciliation" | CONFIRMED |
| V34 | G-D1 (e): shared control needs more than `Institution.faction?: Id` | `ARCHITECTURE.md:1580` `faction?: Id`; SF: `brokeragePatronage.js:219-221` two powers may both claim one house (the accreting union); exec2: `ale_house` and `fish_market` held by two powers in `village-1` | CONFIRMED |
| V35 | G-D3: "no sector list, no class-to-sector table, no input slot" for the economy dial | no economic sector list or table exists (every "sector" in the design is geometric: `:4792`, `:10626`, `:12250`); BUT the Blueprint already has an `economy` circumstance — `ARCHITECTURE.md:3370-3371` "circumstances (era, government, biome, economy, landscape toggles …)" and §7.7 item 2 `:7327-7328` — named, untyped | CORRECTED (small): the slot exists as an untyped `circumstances.economy`; the plan should type THAT slot as the sector shares instead of adding `EconomyShares` beside it (one field, not two) |
| V36 | G-D6: `Building.condition` is wear only; non-physical impairments have no home | `ARCHITECTURE.md:969` `condition: 'kept'\|'worn'\|'neglected'` "the fabric's wear … never a shape input and not an existence state"; SF `entities/status.js:31` lists the five non-physical types | CONFIRMED |
| V37 | G-D8: an assignment's target is "one building / plot or one district"; `Identity.dossier` foresees a named feature; `Pin.kind` has no notice post | `ARCHITECTURE.md:7337`, `:1662` ("a named feature: a bridge, a well, a gate"), `:1576` (Pin kinds: well … lamp — no notice post); census_v C10: 26 fixed landmark strings | CONFIRMED; note: T8 has no rows for six of the 26 strings (`Alehouse`, `Net mending post`, `Beaching ground`, `Timber stacks`, `Tool shed`, `Charcoal pit`) |
| V38 | G-D13: `SiteResources` is a raster; deposits have state (depleted, discovered, removed) | `ARCHITECTURE.md:1573` (six `Float32Array` layers); SF config keys `nearbyResourcesDepleted`, `…NativeDepleted`, `…Custom`, and `nearbyResourcesState` (`lib/settlementConfigMigration.js:51`, read by `generators/foodGenerator.js:66`); 96 of 155 dossiers list a depleted deposit AT BIRTH | CONFIRMED; note: the worked-out land use of T5 / R19 is a creation-time case in 62 % of dossiers, not only a change |
| V39 | G-D14: `EditBase.dossier` is `DossierRef {element, version?}` — no week, cause or fate | `ARCHITECTURE.md:6398`, `:6403` | CONFIRMED |
| V40 | G-D15: nothing states what crossing 10 000 or 30 000 does at an epoch | `:210` ("the band chooses the rung", at creation); every "rung" in §4.11's range (4950–5330) is the wealth ladder's; no rung-crossing rule anywhere (grep of the whole file) | CONFIRMED (a negative, by exhaustive grep) |
| V41 | G-D16: no state for "listed but ruined" | `ARCHITECTURE.md:7337-7345` (`Assignment` has `existence` and no state); `:1583` (`Use` has `opened` / `closed` only) | CONFIRMED |
| V42 | G-D17: SF custom content declares `CRITICALITY`, `ECONOMIC_WEIGHT`, `DEFENSE_ROLES`, `POWER_AUTHORITIES` | `src/domain/customContentSchema.js:67-110` (four frozen vocabularies and their key lists) | CONFIRMED |
| V43 | G-D7: epochs carry `circumstances` and `events`; nothing holds a condition between epochs | `ARCHITECTURE.md:5270` (`EpochInputs {years, populationTarget, circumstances, events}`); SF condition shape `activeConditions.js:10-26` (`id 'condition.<archetype>.<short>'`, `triggeredAt {tick, sourceEventType, sourceEventTargetId}`, `duration {elapsedTicks, expiresAtTicks}`) | CONFIRMED |
| V44 | G-D2: no trade record; `Way.from / to` can name an "external bearing" | `ARCHITECTURE.md:809` (`from / to: … gate, plaza, bridge, harbour, junction, external bearing`); no partner, direction or gate-weight record in the design | CONFIRMED |

## D. Conflicts of model (part 4)

**V45 — 4.1 households.** Claim: no household, family, class or occupation record exists in SF's source or outputs.
Re-derivation: a key scan of the 155 for `household`, `famil*`, `social class`, `occupation`, `profession`,
`resident` finds none; `population` is a single integer (`data/constants.js:7-14` bands it). **Verdict: CONFIRMED.**

**V46 — 4.3 counts.** Claim: towns hold 40–65 records, cities 33–52. Re-derivation: census_v C16: town 40–65, city
33–55, metropolis 47–61, village 25–42, hamlet 8–24, thorp 7–12. **Verdict: CORRECTED (numbers only):** cities hold
33–55 records, and metropolises 47–61 (unmentioned); "towns hold the most" holds only for the maximum (65). The
resolution (n derived inside each record's range) is unaffected.

**V47 — 4.8 the clock and what moves.** The SF half: unit and calendar CONFIRMED (V7), catch-up and canon-only CONFIRMED
(V8); the design half: `ARCHITECTURE.md:9065-9068` (`@plat/sim`'s calendar in hours, the view key `time`, advanced by
`sim.advance { hours }`, "neither changes the model or logs an event") and `:5270` (`EpochInputs.years`); no weekly model
clock (the word "week" occurs only in person-week estimates and one undo note). But "tiers [move] rarely and only
through proposals" is wrong: `src/domain/worldPulse/tierResourceDynamics.js:223-237` makes a tier change a proposal only
while `majorChangesRequireProposal` is on (auto under a preset that turns it off, e.g. the dramatic one), and
`src/domain/worldPulse/calamityKernel.js:482-486` LOWERS `tier` directly after a calamity ("EMERGENT tier demotion via
popToTier … the tier follows the pop") with no `tierHistory` entry; `settlementLifecycleFirstClass.js:710` forces
`thorp` on a resettlement; `src/domain/highWater.js:24-29` names these three lowering paths. **Verdict: CORRECTED:** the
unit claim stands; tiers also change without a proposal — by calamity, by resettlement, and by auto-apply under
presets that lift proposal gating.

**V48 — 4.9 ruined but listed.** Claim: soft removal — removed, ruined and remnant institutions stay listed; "the
record count never changed in any tick run". Re-derivation: `src/domain/events/mutateEntities.js:187`
(REMOVE_INSTITUTION: `status: STATUS_REMOVED, removedByEventId`), `calamityKernel.js:248-256` (`ruinInstitution`:
`status: 'ruined'`, fate, reason, inactive flags), `institutionLifecycle.js:1006-1021` (closure: `status: 'remnant'`);
the only hard-removal code (`institutionRemoval.js`, rule `drop-record`) has no caller (V5). Executed (exec2, the lit
year re-run): 59 → 59, 49 → 49 and 29 → 29 records, with 3 `ruined | destroyed_by_disaster` in `city-1`, impaired
records in place, 0 minted ids. **Verdict: CONFIRMED**, with a note: the count can GROW (pulse builds,
`institutionLifecycle.js:978-1002`; foundings, `upswingKernel.js:763`; ADD_INSTITUTION, `mutateEntities.js:237-246`),
it only never shrinks.

**V49 — 4.10 undo.** Claim: `undoLastEvent` restores from the event log's snapshot; `undoLastPulse` from a pre-advance
snapshot, session only, ten deep. Re-derivation: `src/domain/events/undoEvent.js:5` ("undoLastEvent (settlementSlice)
restores systemState from the log entry"); `src/store/pulseUndoCap.js:32` `PULSE_UNDO_CAP = 10` ("available for the last
ten advances of this session", `:7-8`; "A reload clears it", `store/npcVerbsBody.js:25`). **Verdict: CONFIRMED.**

**V50 — 4.11 rerolls keep the id; NPC ids renumber.** Re-derivation: V1 and V6 (source and exec1 E4). **Verdict:
CONFIRMED.**

**V51 — 4.15 determinism.** Claim: same seed and inputs reproduce a dossier byte for byte within one SF line, not across
lines at one `generatorVersion`. Re-derivation: exec1 E1 (byte-identical twice, and identical to sf/outputs' file);
across lines, from sf/outputs' real outputs: `outputs/r2/disk/city-1.json` "Flachturm" and `outputs/r2/gen/city-1.json`
"Pianopagus", both `generatorVersion` 0.9.0 (read, not re-executed on the disk tree). **Verdict: CONFIRMED.**

**V52 — 4.16 whole dossiers in, no change stream.** Re-derivation: `src/domain/worldPulse/pulseKernel.js:1868-1870`
(`settlementUpdates` = `{saveId, settlement}`, the whole settlement, projected); the interval result's keys (sf/outputs
`tick/_summary.json`, reproduced by exec2): `campaignId, interval, tick, calendar, worldState, regionalGraph, wizardNews,
settlementUpdates, candidates, selected, rollExplanations, autoApplied, proposals, resolvedStressors, majors,
deferredMajors, tempoDeferred, pulseRecord, status`; no revision counter on the dossier (the one "revision" in the
simulator is a comment, `forecastFingerprint.js:7`). **Verdict: CONFIRMED.**

**V53 — 4.7 prosperity moves one step at a time.** Re-derivation (exec2, lit year): Prosperous → Wealthy (town-1),
Comfortable → Prosperous (city-1, village-1); the default-rules year moved none (sf/outputs tick files). **Verdict:
CONFIRMED** — one step per settlement per year in this sample (the claim's "Comfortable → Prosperous → Wealthy" is two
settlements, not one moving twice).

**V54 — 4.6 faction-to-institution links "by `catalogId`".** See V30. **Verdict: CORRECTED** (keyed by the slug of the
institution's own id or name; first twelve roster positions only).

**V55 — 4.12 quarters are declared once.** Claim: chosen at generation and never updated by the simulator.
Re-derivation: `generateSpatialLayout` has ONE caller in `src/`, the generation pipeline step
`generators/steps/economyReconcilePass.js:193`; no simulator file writes `spatialLayout`; exec2: `spatialLayout`
byte-unchanged after a lit year in 3 of 3 (and in the 12 sf/outputs tick files). **Verdict: CONFIRMED.**

## E. The change feed (part 5)

**V56 — 5.1 what arrives.** Claim: every change reaches a consumer as a WHOLE new dossier with partial receipts, no
revision counter, and after a multi-week advance only the end state. Re-derivation: V52; `advanceInterval.js:1-6` (an
advance runs `tickCount` one-week kernel calls and "composes one result"), `:120` ("Collapse a multi-tick interval's
pulseHistory to ONE composed record"). **Verdict: CONFIRMED.**

**V57 — F1 an institution ADDED: its receipts.** Claim: detect by a new binding key; receipts `createdByEventId`
(ADD_INSTITUTION), decree `add-institution`, `requiredForTier` + `createdByWorldPulseOutcomeId`, `builtReason` /
`_worldPulseEconomyBuilt` / `institutionHistory` fate `built`, `foundedAt`. Re-derivation — the creation paths and what
each stamps: ADD_INSTITUTION `mutateEntities.js:215-246` (`id`, category default `civic`, `createdByEventId`; and if a
record of that name already exists it is RE-OPENED — removal cleared, status `active` — not added); tier addition
`tierOutcomeApply.js:95-107` (`id`, `_worldPulseTierAdded`, `requiredForTier`, `createdByWorldPulseOutcomeId`);
economic build `institutionLifecycle.js:978-1002` (`id`, `_worldPulseEconomyBuilt`, `createdByWorldPulseOutcomeId`,
`builtReason`, `foundedAt`); patron-seat founding `:1125-1140` (`id`, `_worldPulseFounded`,
`foundedByWorldPulseOutcomeId`, `builtReason`, `foundedAt`); entrepôt founding `entrepotKernel.js:63-78` (`id`,
`_worldPulseEconomyBuilt`, `createdByWorldPulseOutcomeId`, `builtReason`, history entry without a tick); upswing
founding `upswingKernel.js:763` — `{ name: 'Academy', category: 'academic', status: 'active', worldPulseFate:
'founded_by_flourishing' }` and NOTHING else (no id, no `catalogId`, no outcome id, no `foundedAt`). These are the six persisted creation paths a search of `src/` finds (`institutions: [...`, `.push(` —
the edit guard's `project` in `domain/edit/guardRules.js:393-401` only projects a hypothetical world); none of the six
writes a `catalogId`. **Verdict: CORRECTED:** detection by the diff holds; the receipt list must add `founded_by_flourishing`
(dated only by the arrival week), `_worldPulseTierAdded`, `_worldPulseFounded` / `foundedByWorldPulseOutcomeId`; an
ADD of an existing name is a REOPEN (F6); and every added institution binds by `name:` (V3).

**V58 — row 40 `foundedAt`: "written once by the simulator's foundings; absent = stood since the founding".**
Re-derivation: `institutionLifecycle.js:921-926` ("WRITE-ONCE — the two constructions that create a NEW institution stamp
`foundedAt`"), written only as `...(stamp ? { foundedAt: stamp } : {})` at `:990` and `:1139`; `foundingStampFrom`
(`:892-898`) returns `{year, tick}` or null. The tier-addition, entrepôt, upswing and ADD_INSTITUTION paths (V57) never
write it; exec2's lit year minted no `foundedAt` at all. **Verdict: CORRECTED:** `foundedAt` marks only the economic
lifecycle's two new-institution paths, and only when a calendar stamp is passed; its ABSENCE does not mean "stood since
the founding" — four other paths add institutions without it. The port must date an addition from the diff and the
other receipts (5.3's fallback order), never infer "original" from a missing `foundedAt`.

**V59 — F2 and T11: a REMOVED institution.** Claim: F2 detects `status: 'removed'` + `removedByEventId`, or the closure
fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered` (`closedByWorldPulseOutcomeId`);
T11 groups them under "`removed`, and the fates … → `unassign`", separate from "`remnant` … → kept at a smaller
designation". Re-derivation: `src/domain/worldPulse/worldPulseFates.js:56-75` — the CLOSED vocabulary of 18 fates with
kinds: `closure` for abandoned, abandoned_with_the_settlement, abolished, bankrupt, captured_by_local_powers,
closed_for_want_of_custom, destroyed_by_disaster, disbanded, downsized, hollowed_out, privatized,
reduced_to_watch_post, ruined_by_decree (declared, not yet producible), shuttered, survives_as_remnant; `standing` for
demoted_by_disaster; `rise` for founded_by_flourishing, upgraded_by_reconstruction. Status written with them: economic
closure `institutionLifecycle.js:1006-1021` → `status: 'remnant'`, `_worldPulseInactive: true`,
`closedByWorldPulseOutcomeId`; abolition `:1048-1062` → the same with fate `abolished` or `disbanded`; tier demotion
`tierOutcomeApply.js:138-169` → `remnant` for every fate except `abandoned` (`removed`), all `_worldPulseInactive: true`,
`demotedByWorldPulseOutcomeId`; REMOVE_INSTITUTION `mutateEntities.js:187` → `removed` + `removedByEventId`.
**Verdict: CORRECTED:** (a) the closure fates bankrupt, closed_for_want_of_custom, shuttered and hollowed_out come with
`status: 'remnant'`, not `removed`, so T11 and F2 must key on `worldPulseFate` and `_worldPulseInactive` FIRST and on
`status` only when no fate is present — keyed on status, T11 would keep a bankrupt shop open as a "smaller
designation"; (b) F2's list lacks `abolished`, `disbanded` and `abandoned_with_the_settlement` (the last with F20);
(c) `ruined_by_decree` is declared for a coming op (the ruin path of F5).

**V60 — T11 and F3: `captured_by_local_powers`.** Claim: "the power association changes (row 59); the building kept".
Re-derivation: `tierOutcomeApply.js:147` — `captured_by_local_powers` is the tier-DEMOTION fate of a criminal house
(`/thief|smuggl|criminal|gang/`), with `status: 'remnant'` and `_worldPulseInactive: true` (`:158-162`); it names no
power. The faction mechanism that moves control is `controlledInstitutions` (V30), a different writer. **Verdict:
CORRECTED:** treat `captured_by_local_powers` as a closure of a criminal house after demotion (its use closes, or
survives only as a front — item 63's concern), not as a change of power association.

**V61 — F5 RUINED: its receipts.** Claim: `status: 'ruined'`, `worldPulseFate: 'destroyed_by_disaster'`,
`remnantReason`, `calamityHistory[].targets`; `destroyedByEventId`. Re-derivation: `calamityKernel.js:248-256`
(`ruinInstitution`: `status: 'ruined'`, `_worldPulseInactive`, `_worldPulseEconomyClosed`, fate, `remnantReason`);
exec2: three `ruined | destroyed_by_disaster` records in `city-1`. `destroyedByEventId` is written only on the
SETTLEMENT root by DESTROY_SETTLEMENT (`mutateEntities.js:66-78`); on an institution it is only ever read
defensively (`mutateEntities.js:226-227`, `provenance/rosterProvenance.js:254`). **Verdict: CORRECTED (small):**
drop `destroyedByEventId` from the institution receipts (F5, row 41); it is F20's receipt for a destroyed settlement.

**V62 — F6 REOPENED or RECONSTRUCTED.** Claim: `reopenedByWorldPulseOutcomeId`, status back to `active`, an upgrade at
completion under the upswing mover. Re-derivation: `institutionLifecycle.js:943-962` (reopen: `status: 'active'`, fate
cleared to `null`, `reopenedByWorldPulseOutcomeId`, economic wear cleared, corruption kept); `upswingKernel.js:516` —
the reconstruction UPGRADE renames the record in place: `name: upgrade.to, promotedFrom: upgrade.from, worldPulseFate:
'upgraded_by_reconstruction'`, keeping `catalogId` and any `id`. **Verdict: CONFIRMED for the reopen; CORRECTED for the
upgrade:** it is a RENAME and a kind change in place (receipt `promotedFrom`), so the port must process it as F15 plus
an F3-style re-designation (re-class from the new name — the kept `catalogId` is the lesser kind's).

**V63 — F7 POPULATION.** Claim: `populationHistory[] {tick, delta, population, reason, outcomeId}` (the last 12).
Re-derivation: ten writers (`populationDynamics.js:597-606`, `demographicsKernel.js:356-362`, `calamityKernel.js:477-480`,
`tierOutcomeApply.js:362-370`, …), each keeping `slice(-11)` plus one = 12; `tick` is
`outcome.generatedAtTick || outcome.tick || null` in the pulse writers (may be null) and the calamity entry has no
`outcomeId`; exec2 and sf/outputs: town-1 already holds 12 entries after one season. **Verdict: CONFIRMED**, with a
note: at SF's weekly drift the 12-entry cap loses the interior of any advance longer than about a season, so 5.3's
"sooner when the population moves past tolerance" can be judged only at arrival, not week by week.

**V64 — F8 TIER.** Claim: `tierHistory[] {fromTier, toTier, direction, outcomeId, institutionFates[]}` with no week field,
the outcome-id suffix giving the week; a DM `SHIFT_TIER` as `dm_shift_tier:<id>:town>city`. Re-derivation:
`tierOutcomeApply.js:379-388` (the entry, capped at 12); `tierResourceDynamics.js:223`
(`candidate.tier.${direction}.${save}.${tick}`); `mutateEntities.js:1025` (`dm_shift_tier:${id}:${from}>${to}`).
**Verdict: CONFIRMED**, with the V47 addition: a calamity lowers `tier` with NO `tierHistory` entry
(`calamityKernel.js:482-486`), so F8 must also fire on a bare `tier` change in the diff, dated by `calamityHistory`.

**V65 — F11 GOVERNMENT.** Claim: `previousGovernments[] {label, cause, tick}`. Re-derivation: `src/domain/rulingPower.js:92`
(typedef) and `:629-632` (the write, bounded by `MAX_PREVIOUS_GOVERNMENTS`). **Verdict: CONFIRMED.**

**V66 — F12 CONDITION.** Claim: `activeConditions[] {id, archetype, severity, status, triggeredAt {tick, sourceEventType},
duration}`; one overlay per stable id. Re-derivation: `src/domain/activeConditions.js:10-26` (id
`condition.<archetype>.<short>`, `triggeredAt {tick, sourceEventType, sourceEventTargetId}`, `duration {elapsedTicks,
expiresAtTicks}`). **Verdict: CONFIRMED.**

**V67 — F18 DECREES.** Claim: decrees apply at the head of their tick; causes in `pulseRecord.decreeCauses[]`.
Re-derivation: `src/domain/worldPulse/decreeHook.js:1-13` ("The pulse's head takes the pending decrees in order, applies
each as a cause, then runs the simulation"; "a cause whose verb is not yet bound still lands as a cause rather than as
nothing"); `pulseKernel.js:1950` (the key only when non-empty); `advanceInterval.js:217-230` (composed across the
advance). **Verdict: CONFIRMED**, with a note: a decree cause can arrive with no world effect yet (unbound verb), so the
port must not expect a diff for every decree.

**V68 — 5.3 dating from `institutionHistory[].tick`.** Claim: lifecycle entries carry a tick, tier-fate entries none.
Re-derivation: `institutionLifecycle.js:908-912` (`stamp ? { ...entry, ...stamp } : entry`, capped at 24);
`tierOutcomeApply.js:389-395` (tier-fate entries: `{...fate, outcomeId, reason}`); `entrepotKernel.js:76-78` (entrepôt
`built` entries also without a tick, but an outcome id ending `.${tick}`). **Verdict: CONFIRMED**, with the entrepôt
case added to the "no tick, use the outcome-id suffix" rung.

**V69 — F15 RENAMES and J-M4's receipts.** See V5 and V62: institution renames arrive only as `demotedFrom`
(`demoted_by_disaster`) and `promotedFrom` (`upgraded_by_reconstruction`); powers, NPCs and the settlement through
`rename-faction`, `rename-npc`, `rename-settlement`. **Verdict: CORRECTED.**

## F. Three further load-bearing checks (the week, realm bearings, the epoch cadence)

**V70 — the week a dossier arrives is not inside the dossier (row 76, 5.3's last dating rung).** Claim (5.3): a change
with no receipt takes "the week the dossier arrived (the campaign's `calendar.elapsedWeeks` at the advance's end)"; row
76 labels the clock CAMPAIGN state. Re-derivation: a key scan of the three after-year dossiers of exec2 finds no
top-level week, tick, calendar or pulse key; the only week-bearing fields are receipts (`populationHistory[].tick`,
`activeConditions[].triggeredAt.tick`, `calamityHistory[].tick`, `history.historicalEvents[].tick`, NPC
`compromiseLifecycle.*Tick`, `traditions[].window`); `economicState.foodSecurity.stockpile.lastTick` reads 1 after 52
weeks (not a clock); `tick` and `calendar` live on `worldState` (`worldState.js:305-313`). **Verdict: CORRECTED
(incomplete):** the clock is campaign state, as row 76 says, so under the one-contract rule the port cannot date an
unreceipted change from the dossier alone; the plan must name the campaign week as an OPTIONAL host input beside the
dossier (like the realm block), and say what happens without it (the change applies finished, as a draft's does,
J-M10).

**V71 — realm bearings (row 16, R3).** Claim: "the digest holds cell ids, no coordinates; a bearing needs the FMG
pack's centroids (g§2.5)". Re-derivation: `src/store/mapSlice.js:387-419` — `addPlacement({ burgId, settlementId, x,
y, cellId, via })` records `mapState.placements[burgId] = { settlementId, x, y, cellId, placedAt }`, the realm-map
position of every placed settlement; `src/domain/spatial/spatialDigest.js:902-921` — the digest is `spatialGeometryVersion,
costLawVersion, overlayVersion, settlementIds, cellCount, landCellCount, skippedSettlements, costField, territory, tiers,
distanceMatrix, gates, routeReceipts, reserved` plus optional `biomes, climate, lakes, captureReceipt` (which holds
`terrainDisagreements`, `:885-889`) and `kmScale` — no x or y. **Verdict: CORRECTED (small):** the digest holds no
coordinates, but a placed partner's bearing needs no pack centroids — two placements' `x, y` give it (sf/seam §4 said
"placement positions or pack centroids"); centroids matter only for unplaced partners. Row 16's digest listing also
omits `costField`, `biomes`, `climate` and `lakes`.

**V72 — J-M9's yearly epochs meet the rejection lapse (a consequence, not a claim of the mapping).** Re-derivation:
`docs/ARCHITECTURE.md:7400-7405` — a rejection "lapses … at the first `epoch` event folded after it whose
`populationTarget` differs from `held.populationTarget`"; SF population drifts almost every week (sf/outputs tick
files: town-1 2 130 → 2 132 after one week, 2 156 after a season, 2 175 after a year; city-1 23 178 → 22 629 after a
year; village-1 unchanged). **Finding (PLAUSIBLE consequence of CONFIRMED inputs):** under J-M9 the yearly epoch of
nearly every SettlementForge town carries a changed `populationTarget`, so every map rejection lapses once a year even
for a growth of a few people. The plan should either carry a rounded target (the roster's Δ = 10 grid or the ± 5 %
tolerance) in `EpochInputs.populationTarget`, or state that yearly lapsing is intended.

## Executions and the no-write proof (step 7)

| receipt | what it shows | file |
|---|---|---|
| treecheck | the scratch branch copy equals commit `5d699cc683` (2 320 of 2 320 `src/` files, `package.json`) | `sf/verify/treecheck.out` |
| census_v, census_v2, catalog | independent recounts over the 155 generated dossiers | `sf/verify/census_v.out`, `census_v2.out`, `catalog.out` |
| exec1 E1 | seed `sfout-town-1` twice → byte-identical, and byte-identical to sf/outputs' `gen/town-1.json` | `sf/verify/gen/exec1.log`, `gen/town-1-again.json` |
| exec1 E2–E3 | a new seed gives a new id; 155 of 155 ids equal `idFromSeed(_seed)` and survive `normalizeSettlement` | `sf/verify/gen/exec1.log` |
| exec1 E4 | an NPC reroll returns `npcs, relationships, factions, conflicts, _regenSeed` only; 7 of 8 NPC ids now name another person | `sf/verify/gen/exec1.log` |
| exec2 | the lit year (`realistic_regional`, one_year) re-run: all three after-year dossiers byte-identical to sf/outputs' tick files; counts, fates, `spatialLayout`, `controlledInstitutions` read off this run | `sf/verify/gen/exec2.log`, `gen/rr-one_year--*.json` |
| no-write | `find /Users/cstokes/Desktop/settlement-engine -newer marker-start` (18:43, excluding `node_modules` and `.claude/worktrees`) and `find …/node_modules -maxdepth 3 -newer marker-start` — both EMPTY after every run (19:08) and at close (19:15); `.git/index` mtime 2026-09-24 11:38 | `sf/verify/nowrite-1.txt`, `nowrite-2.txt`, `nowrite-3.txt` |

All executions imported the scratch copy (`scratchpad/sf/tree/src`, whose `node_modules` is a symlink to
SettlementForge's, read only) and wrote only under `scratchpad/sf/verify/`. Paths in this file that begin `sf/` are
relative to `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/`.

## Verdict index

| verdicts | ids |
|---|---|
| CONFIRMED (53) | V1 V2 V4 V6 V7 V8 V9 V11 V12 · V13–V29 · V32 V33 V34 V36–V44 · V45 V48 V49 V50 V51 V52 V53 V55 · V56 V63 V64 V65 V66 V67 V68 |
| CORRECTED (18) | V3 V5 V10 · V30 V31 · V35 · V46 V47 V54 · V57 V58 V59 V60 V61 V62 V69 · V70 V71 |
| REJECTED (0) | — |
| new interaction | V72 |

Coverage against the brief: mapping-table claims V1–V31 (29, of which V1–V12 are the load-bearing ones on ids, the
clock and what is spatial); gaps V32–V44 (13 of G-D1–G-D17); conflicts V45–V55 (11 of 4.1–4.17); change feed V56–V69
(14 of 5.1–5.3 and F1–F22); further load-bearing V70–V72.

**Labels.** Every verdict above is CONFIRMED in the lane's sense — read on disk at the cited line or executed with the
cited receipt — except V72's consequence, which is PLAUSIBLE (its inputs are CONFIRMED; the lapse rate under J-M9 was
reasoned, not simulated). The experiment that would settle V72: fold sf/outputs' default year for `town-1` through a
J-M9 cadence with one rejection recorded at week 0, and read `lapsedAt`.

**Not done here (stated plainly).** No claim about the design's own consumers, transformations or tables (T1–T16's
right-hand sides, R1–R24, J-M1–J-M12) was judged — those are the mapping's proposals, PLAUSIBLE by its own label, and
belong to Fable and the plan seat. SettlementForge's working tree and `master` were not re-read; the disk-line
difference (V51) is read from sf/outputs' files, not re-executed. No SettlementForge map program or map design was
read.


## Fable review (2026-09-27) — B-sf/verify

**Verdict: CONFIRMED** (Fable reviewer, lane fable-review/main/sf; the full review is `docs/fable-review/main/sf.md`).

**Re-derived and CONFIRMED** by a different method where one existed: the treecheck by blob hash (`git ls-tree -r` against
`git hash-object --no-filters`: 2 320 of 2 320 `src/` files identical — `scratchpad/fable-review/treecheck2.out`); `census_v.py`
re-run (C1 5 846 / 0 / 0, C9 13 names and 14 pairs, C9c the Religious Quarter east in 154 of 154, C9d the Market Quarter in
38 towns and 3 metropolises, C11 17 governments, C12 44 powers with the stated categories, C13 the six relation types, C16
city 33–55 and metropolis 47–61, C21 the prosperity counts) and an independent census agreeing on every figure; V3 (695
without `catalogId`, in 129 dossiers, cascade 631 / coherence_repair 49 / faction_boost 14 / custom 1; every present
`catalogId` = slug of the name, 5 151 of 5 151); V5 (no caller of the rename writer outside its file; no `rename-institution`;
`rename-faction` at 18 sites); V30 (`domain/worldPulse/factionCompetition.js:155-166, 904` — `stablePart(entry.id || entry.name
|| …)`, `.slice(0, 12)`); V47 (`calamityKernel.js:482-486`); V57 and V62 (`upswingKernel.js:516, 763`); V59
(`institutionLifecycle.js:1006-1021`; `worldPulseFates.js:56-75`; `tierOutcomeApply.js:138-169`); V60 (`tierOutcomeApply.js:147`);
V61 (`mutateEntities.js:66-78`); V70 (no week, tick or calendar key at the top level of the three after-year dossiers; `tick`
and `calendar` on the world state, read as 1 / 13 / 52); V72's inputs (the drift in the tick files; §7.7 item 3 at
l. 7405-7409 of the live design) — its consequence is right and the plan's J-P6 (27d item 76 (d)) answers it.

**Labels:** honest — every verdict CONFIRMED by a cited line or receipt, V72's consequence alone PLAUSIBLE as stated, and
"Not done here" says what was left to Fable and the plan. **Two precision notes, no correction:** V1's second note ("a new
seed is a new id" holds of `_seed`, a section reroll's `_regenSeed` never changing the id) is exactly what J-M11 needs; the
scope note (one grep line each of `townMap/mapDress.js` and `townLayoutV2.js` printed, neither cited) is a clean
disclosure within J67's seam scope (J-Fsf-6).
