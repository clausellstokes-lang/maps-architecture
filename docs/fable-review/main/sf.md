# Fable review — lane fable-review/main/sf (the SettlementForge dossier survey rows)

Reviewer: Fable (claude-fable-5-1), 2026-09-27 20:51–21:2x. Rows: every PENDING row of `docs/FABLE-REVIEW-QUEUE.md`
matching `B-sf/<lane>` (six) and `A-sf/plan` (no such row exists; the plan `research/sf/PLAN.md`, `SUMMARY.md` and
`docs/AMENDMENTS-2026-09-27d.md` are the Fable seat's own and are checked here against owner item 20 (h) inside the
B-sf/mapping row, not given a verdict of their own). Sections judged: §7.7, §10, §11, §14 of the live design
(`docs/ARCHITECTURE.md` sha256 357c02f2…, 13 025 lines; `docs/ARCHITECTURE-RATIONALE.md` 9575f26c…), read in full for those
sections today, with owner items 20, 20 (h), 22, 67, 72, `docs/OWNER-INSTRUCTIONS-2026-09-25.md` and `docs/DEFINITION.md`.

## PROGRESS

| row | planned | done |
|---|---|---|
| B-sf/model | read whole; re-derive ≥ 5 claims; verdict; append review section | done |
| B-sf/generation | read whole; re-derive ≥ 5 claims (executed); verdict; append | done |
| B-sf/outputs | read whole; re-derive ≥ 5 claims (own census, tick files); verdict; append | done |
| B-sf/seam | read whole; re-derive ≥ 5 claims; rule E-4/Q-1, E-5/Q-2, C-4/Q-3, C-1/C-3/C-8/C-9/C-11; scope disclosures; append | done |
| B-sf/mapping | read whole; re-run census scripts + own census; judge J-M1, J-M9, 4.1, 4.9/G-D16, G-D1–G-D3, T12–T15; check the plan against 20 (h); append | done |
| B-sf/verify | read whole; re-derive the treecheck by blob hash; V3/V30/V5/V59/V60, V70/V72; re-run census_v.py; append | done |
| blocks file, design impacts, LANDED | write; log | done |

## Verdict table

| row | verdict | one-line reason | corrections (where) |
|---|---|---|---|
| B-sf/model | CORRECTED | every fact re-derived holds (seed hash, name-as-key, the fourteen quarter names and their tests, the never-generated link lists, the tier bands, 41 keys, 280 distinct kinds); the file predates item 20 (h) and still frames three gaps as things SettlementForge might supply | §1's "or SF must mint ids first", §15 Q3's "or ask SF for instance ids", Q5's "until SF writes those lists", Q6's framing → closed by item 20 (h) (iv)–(v): the binding table and optional fields; two precisions (the Waterfront District carries two phrases; the teaching sample has 23 keys) — appended review section |
| B-sf/generation | CORRECTED | the 22-step order, same-seed identity, 41 event types, the weekly clock, the fork law, the decree head, the catch-up cap and the 13 committable kinds re-derived (five of them executed, byte-identical to the lane's probe); §8's receipt tables and §6.3's "tier only by proposal" are superseded by the verify lane's V47, V57–V62 and by 27d items 75, 76, 80 | §8.2 rows 1–5, §8.5's collective rule, §6.3's tier row, §9 Q1–Q11 dispositions — appended review section |
| B-sf/outputs | CORRECTED | every measured claim re-derived by an independent census and by the tick files (41/42 keys, 5 846 records with no id, walls = gates 155 of 155, 13 quarter names, the Market Quarter artefact, sizes, the sample's identity across four versions, the tick clock); one mechanism claim wrong and one PLAUSIBLE proposal overruled | §4 and Q4: `controlledInstitutions` is keyed by the slug of the institution's own id or name, not by `catalogId` (V30); §6.3 (2): the map's districts never follow `urbanFabric` (the ignore-list, 27d item 86) — appended review section |
| B-sf/seam | CORRECTED | the seam facts hold (entry signature, the strip, the origin, the dead burg path, the hash direction, the retired writers, the private-key filter, the split doc's branch absence, the six strip waves' commit counts); one candidate does not stand and one owner question needs its cost stated | C-4's rewind candidate REJECTED — a host's undo is a forward change (J-Fsf-2; 27d item 87); E-5/Q-2 option (b)'s cost stated; E-4/Q-1 ruled for our side (J-Fsf-1); the `townMap/` input-side reads and the doors 2–3 slip ruled (J-Fsf-6) — appended review section |
| B-sf/mapping | CORRECTED | the census reproduced to the number (re-run and independent); the mapping's calls stand with the verify lane's 18 corrections, the plan's J-P13 over G-D1 (b), and two refinements of mine | J-M1 gains a coherence bar (J-Fsf-5); collective-record states split by kind (J-Fsf-4, refining the plan's J-P12); T11 keyed on fates first (V59); T6–T8 rows (V10, V37); rival trade (V31); record counts (V46); G-D3 types the existing slot (V35); the plan checked against 20 (h): passes — appended review section |
| B-sf/verify | CONFIRMED | the treecheck re-derived by blob hash (2 320 of 2 320), the census re-run and an independent one agree, V3/V5/V30/V47/V57/V59/V60/V61/V62/V70 re-read at the cited lines; the labels are honest (V72 alone PLAUSIBLE, as it says) | none; two precision notes appended |

**Blocks written: none** (J-Fsf-7). Every design correction these six rows surface is already a candidate amendment of
`docs/AMENDMENTS-2026-09-27d.md` (items 73–88, the Fable plan seat's, to be applied by the pass after pass c) or a home
that pass c's item 20 (h) editors design; a block here would state the same fact twice and apply it out of the passes'
order. The design impacts below tell those editors what the current text must gain. `docs/fable-review/main/blocks-sf.md`
exists with a header only (the assembler ignores text before the first `=== ` line).

## What was re-derived, and how (the receipts)

**The baseline copy.** `scratchpad/sf/tree/src` (the copy every lane executed from) was compared file by file against
`fp/integration-2026-09-23` @ `5d699cc68` by blob hash (`git ls-tree -r` against `git hash-object --no-filters`):
2 320 of 2 320 files identical, 0 differ, 0 missing (`scratchpad/fable-review/treecheck2.out`). So a line quoted from the
copy is a line of the baseline. SettlementForge itself was touched only by read-only `git ls-tree`, `rev-parse`,
`cat-file`, `log`, `show` and `check-attr`; one node execution imported the COPY (its `node_modules` symlink read only) and
`find /Users/cstokes/Desktop/settlement-engine -newer <marker>` (excluding `node_modules` and `.git`, then `node_modules`
to depth 2) listed nothing afterwards (CONFIRMED, `scratchpad/fable-review/marker-exec`).

**Executed (`scratchpad/fable-review/exec-review.mjs`, `NODE_ENV=test`, from the copy):** `getStepOrder()` returns the 22
steps in the order §3.4 of the generation survey lists; the probe town (seed `plat-sf-probe-1`, the survey's config)
generated twice is byte-identical, and byte-identical to the generation lane's own `gen-rebase/br-dossier-town-probe1.json`
(Rundhausen, `s_9296d86fa969b198`, 4 694 people, 59 institutions, 0 with `id`, 0 with `status`, 41 top-level keys);
`EVENT_TYPES.length` = 41 and includes `CREATE_ROUTE`; the institutional catalogue holds thorp 19 / hamlet 37 /
village 59 / town 85 / city 90 / metropolis 26 tier entries and 280 distinct kinds.

**Independent census (`scratchpad/fable-review/mycensus.py`, own code) over the 155 generated dossiers
(`sf/outputs/r2/gen` minus `_runs.json`, `r2/soak`):** top-level key counts {41, 42}; 5 846 institution records, 0 with
`id`, 0 with `status`, 695 without `catalogId`, and every present `catalogId` equals the slug of its record's name
(5 151 of 5 151); no dossier with two records of one `catalogId` or one name; `hasWalls` = `hasGates` in 155 of 155
(104 both true, 51 both false); 13 quarter names, the Waterfront District alone carrying two phrases, "Eastern district
(traditional)" on 154 of 154 Religious Quarters; a Market Quarter in 38 of 38 towns, 0 of 24 cities, 3 of 23
metropolises; 75 of 155 below 1 500 people; 22 count-range name patterns; sizes per tier as sf/outputs §3.3 states them
(the town maximum 261 129 is the neighbour town). **Tick files (12 settlements, 4 world states):** `spatialLayout`
unchanged in 12 of 12; institution counts unchanged (49 / 59 / 29); 28 `controlledInstitutions` entries in 9 files;
3 `ruined` records in the lit city; 0 minted ids; world state `tick` 1 / 13 / 52 = `calendar.elapsedWeeks`, seasons
spring / summer / spring; populations and prosperity moves exactly as sf/outputs §4 and mapping k-ticks report.

**The lanes' own scripts re-run** (`sf/mapping/census.py`, `census2.py`, `census3.py`, `ticks.py`; `sf/verify/census_v.py`,
`census_v2.py`; outputs rewritten at 20:57–20:58): C1 5 846 / 0 / 0; C3 22 range patterns; C9 13 names, 14 pairs; C9c
Religious 154 eastern; C9d Market Quarter town 38, metropolis 3; C11 17 government names; C12 44 power names, categories
economy 295 … magic 46, 0 with an id; C13 six relation types; C16 city 33–55, metropolis 47–61; C21 the prosperity
counts; census3's rung table (city→CITY 20, city→TOWN 4, metropolis→METROPOLIS 21, →CITY 2, town→TOWN 33, →village 5,
70 below-town → village product); ticks.out `ctrl resolved` 28 of 28, `spatialLayout same True` 12 of 12; census.out
30 income sources, sums {100}, 17 governments; `catalog.out` 695 lacking `catalogId` (cascade 631, coherence_repair 49,
faction_boost 14, custom 1).

**Source lines re-read on the copy (file:line as quoted in the row sections):** `domain/normalizeSettlement.js:63-79,
190-192`; `domain/institutionRename.js:1-15`; `generators/spatialGenerator.js:18-24, 59-64, 74-79, 118-123, 316-334`;
`domain/entities/propagate.js:411`; `data/constants.js:3-14, 85-94`; `kernel/prng.js:73-90`;
`domain/worldPulse/worldState.js:23-33, 41-46, 57`; `domain/worldPulse/intervalWeeks.js:8-11`;
`domain/worldPulse/decreeHook.js:1-13`; `domain/worldPulse/simulationRules.js:1388`; `domain/pendingEdits.js:22-53`;
`domain/events/registry.js:197, 827`; `domain/worldPulse/institutionLifecycle.js:922, 990, 1006-1021, 1139`;
`domain/worldPulse/worldPulseFates.js:56-75`; `domain/worldPulse/tierOutcomeApply.js:138-169`;
`domain/worldPulse/factionCompetition.js:155-166, 900-906`; `domain/worldPulse/calamityKernel.js:301-317, 480-487`;
`domain/region/tradeLinks.js:24-28, 45-50`; `domain/regenerationPreservation.js:14-19`;
`domain/worldPulse/successorNpc.js:30-40, 50-52`; `domain/events/mutateEntities.js:64-80, 185-189`;
`domain/worldPulse/upswingKernel.js:512-518, 760-766`; `domain/entities/status.js:23-32`;
`domain/townMap/townMapModel.js:336` (the one signature line) and `domain/townMap/anchors.js:50-56` (the anchor key —
the seam's input side, nothing of the drawing); `components/OutputContainer.jsx:47-52`; `lib/mapRuntimeConfig.js:19-23`;
`domain/spatial/spatialSubstrateRead.js:210-223`; `store/operationRegistry.js:313-345`; `domain/display/publicSafe.js:110`;
`data/sampleDossier.json` (23 keys); a grep of `_cutRoutes` (absent under `src/generators`); a grep of the institution
rename writer's callers (none outside its file; no `rename-institution`; `rename-faction` at 18 sites); a grep of
`burgToConfig` (its definition and two comments only). Git: `DESIGN_MAP_MODULE_SPLIT.md` absent from `5d699cc68`, present
on the ledger HEAD; the six strip waves' commits 11 / 10 / 9 / 9 / 6 / 6 (`git log --grep`); the sample dossier one blob
(`3bdfea45…`, 7 237 bytes, sha1 `965cdb47…`) on the branch, the ledger HEAD, `master` and disk.

**A hazard met while re-deriving (recorded, memory `zsh-rev-path-modifier`):** in zsh `"$r:src/…"` is not `<rev>:<path>` — the
`:s` is a history modifier and the argument collapses to the bare revision, so `git show`, `cat-file` and `rev-parse`
silently answer for the COMMIT (sizes 51 875 / 3 171 / 270 bytes, unparsable). Written `"${r}:src/…"` the four versions
compare equal. The outputs lane's claim was right; my first comparison was wrong and is not recorded as a correction.

## B-sf/model — CORRECTED

**Re-derived (CONFIRMED):** (1) the settlement id — `normalizeSettlement.js:63-79` `idFromSeed`: FNV-1a 32-bit for the
first eight hex characters, a second FNV-style mix for the next eight, `s_` prefix; `:190-192` stamps it only when absent
(the survey's "an FNV-1a hash of `_seed`" is right for the first half; the verify lane's precision note stands). (2)
"An institution's NAME is its join key" — `institutionRename.js:4`; `:13-14` "17,361 of 17,361 generated records carry
`name`; none carries `id` or `localUid`". (3) The 14 quarter names, each a case-sensitive substring test over institution
names (`spatialGenerator.js:21` `has = keyword => instNames.some(n => n.includes(keyword))`; `:62` `has('Market')`;
`:74-77` the Religious Quarter with the literal `'Eastern district (traditional)'`). (4) The link lists "never write the
explicit link lists" — `propagate.js:411`. (5) `TIER_ORDER`, `POPULATION_RANGES` (thorp 8–60 … metropolis
25 001–100 000) and the seven-step `PROSPERITY_TIERS` — `constants.js:3-14, 85-94`. (6) 41 top-level keys and no
institution `id` on the branch — executed (above). (7) 280 distinct catalogue kinds and the per-tier counts 19 / 37 / 59 /
85 / 90 / 26 — executed. (8) The sample dossier is one blob on all four versions and has 23 top-level keys (the survey's
"21" undercounts `_comment` and `_version`, as sf/outputs already noted). **Accepted on the quoted evidence:** the
frozen-versus-live manifest rows, the alias resolvers, the campaign-level ledgers and the custom-content taxonomies
(their files were not re-opened; the claims are labelled CONFIRMED by reading and nothing downstream rests on a number
from them).

**Labels:** honest throughout — every executed or read fact CONFIRMED, every consequence PLAUSIBLE (§1's conclusion, §2's
bearing recovery, §7's trade direction, §14's "map use" column). The one `git status --porcelain` outside the allowed set
is disclosed with its evidence (`.git/index` mtime unchanged); ruled harmless (J-Fsf-6).

**Corrections (appended to the file):** the file was written at 14:36, before the owner's rule of the evening; three
passages still frame a dossier gap as something SettlementForge might supply — §1's conclusion ("or SF must mint ids first
(an interim ask, not ours to make)"), §15 Q3 ("or ask SF for instance ids. Owner-gated either way") and Q5 ("until SF
writes those lists"), with Q6's "the owner says world context comes through the dossier; today it does not". Under item
20 (h) (iv)–(v) each resolves on our side: the binding table (27d item 74) for identity, the class-to-power table with
the declared lists as OPTIONAL inputs for Q5 (27d 79 (c)), and the derived trade direction with an optional realm block
for Q6 (27d 77). Q1 (which line) and Q2 (which key) stand: owner Q1 of the plan; the dossier `id` (J-M12, confirmed).
Two precisions: `quarters[].location` is one fixed phrase per name EXCEPT the Waterfront District (`spatialGenerator.js:121`,
coast or river; V10), and `spatialLayout.tradeAccess` has two strings for `port` (`:318-320`; V12), so the port reads the
key, never the prose. The "(branch)" convention — the branch bullet describing the current product where it disagrees
with the working-tree text — is accepted as the file's own single-source device.

## B-sf/generation — CORRECTED

**Re-derived (CONFIRMED, five by execution):** (1) 22 steps in the stated order (executed). (2) Same seed and config →
byte-identical dossier, and identical to the lane's probe file (executed). (3) 41 event types with `CREATE_ROUTE`
(executed; `registry.js:197, 827`). (4) The fork law `createPRNG(`${seed}::${label}`)` — `prng.js:90`, with `:73-76`
stating the `::` delimiter is load-bearing. (5) The clock: "tick = 1 week and year = 52 weeks", the 4-4-5 month ends,
four seasons — `worldState.js:23-33, 41-46, 57`; `INTERVAL_WEEKS` one_week 1 / one_month 4 / one_season 13 / one_year 52 —
`intervalWeeks.js:8-11`. (6) The decree head — `decreeHook.js:1-13` ("takes the pending decrees in order, applies each
as a cause, then runs the simulation"; "a cause whose verb is not yet bound still lands as a cause"). (7)
`CATCH_UP_CAP_WEEKS = 26` — `simulationRules.js:1388`. (8) The 13 committable kinds — `pendingEdits.js:22-31` typedef.
(9) `foundedAt` written at exactly two sites — `institutionLifecycle.js:990, 1139`, the "WRITE-ONCE" comment at `:922`.
(10) `_cutRoutes` named by no file under `src/generators` (grep; it lives in `domain/region/deriveRegionalState.js`,
`events/undoEvent.js`, `events/mutateUserRoute.js`, `events/mutateWorld.js`, `store/settlementSlice.js`) — the §2.7
correction holds. **Accepted on the quoted evidence:** the working-tree figures (40 events, 20 steps, the first probes) —
the working tree is not the baseline and nothing rests on them; the op catalogue's off-stage names (labelled PLAUSIBLE by
the file itself); the presets' flag lists (executed by the lane, not re-executed here; the tick files' `urbanFabric`,
`npcLadder`, `traditions` keys under the lit preset confirm the consequence).

**Labels:** honest; §6.2's stage details are marked PLAUSIBLE from names and headers, §8's proposals as the program's,
and the re-base ledger (§11) states REVISED / CORRECTED / HOLDS per claim.

**Corrections (appended to the file):** the file predates the verify lane and the plan. (a) §8.2 row 1's receipts must
add `_worldPulseTierAdded`, `_worldPulseFounded` / `foundedByWorldPulseOutcomeId` and the upswing founding
`founded_by_flourishing` (which writes nothing else — `upswingKernel.js:763`), and an ADD of an existing name is a REOPEN
(V57); a missing `foundedAt` never means "stood since the founding" (V58). (b) Row 2's fates arrive with
`status: 'remnant'` and `_worldPulseInactive: true`, never `removed` (`institutionLifecycle.js:1006-1021`; `worldPulseFates.js:56-75`
lists the closed vocabulary of eighteen), so the fate and the inactive flag are keyed before the status (V59); the list
lacks `abolished`, `disbanded`, `abandoned_with_the_settlement`. (c) Row 4 and §7's stamp list: `destroyedByEventId` is
written on the settlement root only (`mutateEntities.js:66-78`; V61). (d) Row 14 / §8.5: institutions are renamed only by
a calamity demotion (`demotedFrom`, `calamityKernel.js:301-317`, the old `catalogId` kept) and a reconstruction upgrade
(`promotedFrom`, `upswingKernel.js:516`); the institution rename writer has no caller (V5, V62). (e) §6.3's "by default a
tier change is a PROPOSAL" is incomplete: a calamity lowers `tier` directly with no `tierHistory` entry
(`calamityKernel.js:482-486`), a resettlement forces `thorp`, and presets that lift proposal gating auto-apply (V47);
F8 fires on a bare `tier` change. (f) §8.5's collective-record status rule: ruled J-Fsf-4 (below). (g) §9's open questions
are disposed: Q1 → J-M11 (same id, least-disruption changes); Q2 → derived inside the range (R9); Q3 → J-Fsf-4;
Q4 → owner Q4 of the plan (recommendation: one map); Q5 → J-M10 (finished, no stages); Q6 → receipt-based; Q7 →
re-bind on receipts, else removal plus addition (J-M4 with the two institution stamps); Q8/Q11 → J-P8 with J-Fsf-9's
refinement (item 67 (i)'s table is keyed by the observed growth-or-decline RATE, so the presets change which rows occur,
not the calibration); Q9 → owner Q1; Q10 → owner Q6, recommendation accept the mismatch. All of these are already the
plan's §3 rulings; this review confirms them.

## B-sf/outputs — CORRECTED

**Re-derived (CONFIRMED):** (1) 41 top-level keys in 154 of 155 and 42 in the custom-content town (own census). (2)
5 846 institution records, 0 with `id` (own census). (3) `hasWalls` = `hasGates` in 155 of 155, 104 / 51 (own census).
(4) 13 quarter names with their counts (Religious 154, Government 75, Noxious Trades 59, Wealthy and Common Residential
47 each, Shadows 46, Mages' 42, Market 41, Waterfront 25, Alehouse & Common 19, Fishing Landing 7, Woodcutters' Ground 4,
Artisan 3 — the survey's slightly lower figures come from its 153-dossier census, the two sample towns excluded), the
Waterfront's two phrases, the Religious Quarter's east phrase on 154 of 154, the Market Quarter in every town and no city
(own census; `spatialGenerator.js:62`). (5) Sizes per tier: minima and maxima reproduced exactly; medians within the
difference of denominators (own census over 155 versus the survey's 20-seed soak). (6) The teaching sample: 23 top-level
keys and one blob on the branch, the ledger HEAD, `master` and disk (`rev-parse`, `cat-file -s`, sha1 965cdb47…, 7 237 B).
(7) The tick files: whole-object updates; `spatialLayout` byte-unchanged in 12 of 12; institution counts unchanged in
every run (ruin and impairment as status on the kept record — 3 `ruined` in the lit city); 28 `controlledInstitutions`
entries across 9 files; the world clock tick 1 / 13 / 52 with seasons spring / summer / spring; the populations
23 178 → 22 629 (default year) and → 17 827 (lit year), prosperity Comfortable → Prosperous (lit city) and Prosperous →
Wealthy (lit town). **Accepted on the quoted evidence:** the fixtures census of §2 (the branch's 72 entries and their
classification — read by the lane, not re-opened here; nothing in the design rests on it beyond "no full generated dossier
is stored", which 27d item 84 turns into our own fixture set).

**Labels:** honest; §6.3 and §8 are marked PLAUSIBLE proposals for the mapping lane.

**Corrections (appended to the file):** (a) §4 and §8 Q4: `controlledInstitutions` is not "keyed by `catalogId`"; the
writer is `factionCompetition.js:155-166` — `stablePart(entry.id || entry.name || …)` over the first twelve roster
positions (`.slice(0, 12)`), accreted at `:904`. At birth every `catalogId` equals the name's slug (own census, 5 151 of
5 151), which is why the values coincided in the tick files; a minted `id` or a cascade record breaks the coincidence
(V30; 27d item 74 (e)). (b) §6.3 (2)'s suggestion that the map's districts "follow the institutions and `urbanFabric`" is
overruled: `urbanFabric` is SettlementForge's own map memory and is on the port's ignore-list (mapping row 25; plan §2.6;
27d item 86); the districts follow the institutions, the conditions and the naming claims (J-M1). (c) §8 Q3 is thereby
answered (institutions and conditions are the inputs; `spatialLayout` a naming claim), Q4 by V30 and item 72 (d5)'s
partition, Q5 by the plan (`E_UNKNOWN_SHAPE`: the teaching sample is refused), Q2 is owner Q5 of the plan, Q1 owner Q1.

## B-sf/seam — CORRECTED

**Re-derived (CONFIRMED):** (1) `export function buildTownMapModel(settlement, mapEdits = null)` at
`townMapModel.js:336` — one grep line, the entry's signature only. (2) STRIP-1: "the legacy settlement-map tab is GONE
from the product. The dossier's tab set is Summary / Systems / World / Notes" — `OutputContainer.jsx:49-51`. (3)
`PRODUCTION_MAP_ORIGIN = 'https://map.settlementforge.com'`, fork revision `sfdrop16` — `mapRuntimeConfig.js:20-21`. (4)
`burgToConfig` has its definition at `mapSlice.js:872` and two comment mentions, no caller. (5) `approachOctant(a, b)` = a
hash of the unordered id pair modulo 8, "The realm-map bearing would be more precise but requires the (often-absent)
spatial digest + pack" — `spatialSubstrateRead.js:213-223`. (6) `applyMapEdit` and `applyFogEdit` retired, the save-time
`{ layoutLawVersion: 2 }` minting alive and load-bearing, no migration of old keys — `operationRegistry.js:313-345`. (7)
`PRIVATE_KEY_RE` with the tokens `secret`, `private`, `dm`, `gm`, `hook`, `compass`, `chronicle`, `notes`, `decrees`,
`seed`, `_config` — `publicSafe.js:110`. (8) `DESIGN_MAP_MODULE_SPLIT.md` absent from `5d699cc68` ("exists on disk, but
not in '5d699cc68'"), present on the ledger HEAD; the strip waves' commits on the branch 11 / 10 / 9 / 9 / 6 / 6. (9) The
anchor precedence `cat:` → `uid:` → `name:` — `anchors.js:50-56`. **Accepted on the quoted evidence:** the split doc's
quoted rulings and expectations E-1…E-11, the ODQ entries, the azgaar-bridge document and the map bridge's command list —
SettlementForge design text about the module slot, which J67's seam scope admits and which no design fact of ours depends
on beyond the constraints C-1…C-17 (each judged below on its own merits).

**Labels:** honest; each constraint states its SettlementForge fact as CONFIRMED with its source and its candidate as
the lane's proposal; the two scope disclosures are explicit.

**Rulings (vetoable; recorded here, and their design homes are 27d's):**
- **E-4 / Q-1 — J-Fsf-1.** For our side the seam is at the DOSSIER: the module plans and draws from the dossier as it is
  (`docs/DEFINITION.md` §1; item 20 (h) (ii) and (iv)); a plan artifact from SettlementForge, if one ever exists, can
  enter only as OPTIONAL hints. Whether the product adopts this module is the owner's reconciliation call, already parked
  by the standing rule; no decision is asked now. Chosen over adopting SettlementForge's plan-then-draw seam because the
  owner's rule already places derivation on our side and a required upstream plan would be a required field.
- **E-5 / C-16 / Q-2 (door 1) — J-Fsf-3.** The module adds no door: its exports are one-way outputs any host may read;
  §11.3's vocabulary carries nothing toward the dossier. Owner-gated (a new capability across the boundary), as the plan
  says. Recommendation restated with the cost the plan leaves implicit: (a) never is the clean answer; (b) a canonical-only
  export (seed and dossier history, no map edits) keeps item 20 (d) but shows the simulator a town the user does not see,
  so a fire "along a real street" may burn a street the user moved; (c) breaches item 20 (d) in spirit. Recommend (a);
  (b) only if the owner wants door 1 knowing that cost.
- **C-4 / Q-3 (an undo of the dossier) — J-Fsf-2. REJECTED as written.** The rewind candidate would delete dossier events
  from the map's history; §7.4 rules that a dossier event "is likewise no `undo`, `redo` or `revert` target of a map event"
  (`ARCHITECTURE.md` §7.4, l. 6974), and item 22 (c) chose continuity over path-independence. A host's restored dossier
  arrives as ordinary dossier changes; the solver's vacant-first order and `formerUses` return the elements it can, the
  residue is reported — the plan's J-P5, 27d item 87. Chosen because a rewind re-opens ruled undo text for a host-side
  convenience the forward path already approximates, and because "two histories reaching one dossier may give different,
  equally valid maps" is the owner's own ruling.
- **C-1, C-2, C-8, C-11, C-12, C-14, C-15** — the candidates are right and are carried by 27d items 73 (the port, C-15,
  C-14), 85 (correlation `re`, the source-window check, the before-`ready` queue, the SettlementForge iframe configuration,
  the one-way seed, per-export display names, the inert-export bar, the audience table). No block here (J-Fsf-7).
- **C-3** — the map's carried dossier facts are the "previous dossier" (27d 74–75). Right.
- **C-7** — the two-instances-one-`catalogId` hazard does not occur in any of the 155 dossiers (own census, 0 duplicates);
  the plan's `#k` member ordinal and array-order tie-break (27d 74 (b)) cover the case if it ever does.
- **C-9** — derived per-partner bearings on the partner's own stream; the optional realm block; north fitted first
  (27d 77). Right; V71's precision (two placements give a bearing without pack centroids) noted.
- **Scope — J-Fsf-6.** The lane read, inside `src/domain/townMap/`, only the entry's header, signature, input typedefs
  and the first lines of its body, `anchors.js` whole (an identity key), `mapEdits.js`'s container shape, the read-side
  headers of `fabricRead.js` and `ladderRead.js`, and `institutionAssignment.js`'s 25-line header; nothing of the layout or
  drawing bodies. These are the input side of the seam — "what a map receives and how it plugs in" — which J67 names in
  scope; the literal exclusion of `src/domain/townMap/**` is read as the drawing and layout program, not its input
  adapter. The first run's whole read of `DESIGN_MAP_DOORS.md` (doors 2 and 3 are SettlementForge map-feature designs) is
  a disclosed slip: only their persistence and projection laws were used and nothing of their design reached any file of
  ours; accepted, no contamination. The sf/model lane's one `git status --porcelain` likewise (index unchanged).

## B-sf/mapping — CORRECTED

**Re-derived (CONFIRMED):** the census figures the mapping states — re-run with the lane's scripts and reproduced by my
own: 5 846 records / 0 ids / 0 statuses; 0 duplicate keys; 22 range patterns; 30 income sources summing to 100 in 155 of
155; 17 government names; 44 power names in 8 categories with the stated counts; 6 relation types; 14 name–phrase pairs
over 13 names; `hasWalls` = `hasGates` 155 of 155; `config.terrain` null and the culture key equal to the profile key in
155 of 155; the joins (processors 2 585 of 3 381 and the 27 unresolved names; services 8 933 of 9 065; landmarks 537 of
1 281; trade dependencies 1 001 of 1 001; NPC institution 92 of 92; NPC power 1 440 of 1 440; social groups 393 of 393;
institutional services 578 of 578); T1's rung table (70 of 70 below town, town 33 / 5, city 20 / 4, metropolis 21 / 2;
75 below 1 500); after ticks `controlledInstitutions` 28 of 28 resolved, `spatialLayout` unchanged 12 of 12, successors
under new ids, ruins and impairments in place. **Accepted on the quoted evidence:** the SettlementForge facts relayed from
the four surveys (each judged in its own row above).

**Labels:** honest and unusually disciplined — every design consumer, transformation, table, derivation and judgment is
labelled P; every SettlementForge fact C with its source tag.

**Judgments on the rows the queue names first:**
- **J-M1 (an SF quarter is a naming claim) — CONFIRMED, refined (J-Fsf-5).** Right against items 22, 67 and 72: the list is
  a generation-time name test never refreshed (`spatialGenerator.js:21, 62`; `generateSpatialLayout`'s one caller is the
  pipeline step; `spatialLayout` unchanged in 12 of 12 tick files), and item 72 makes identity emergent. Refinement, so
  item 20 (h) (iii) holds: the quarter's kind bias enters the placement solver as a soft `districts` row for the claim's
  class family (churches prefer the district that will carry "Religious Quarter"), and a coherence bar reports — never
  refuses — when the district carrying a dossier quarter name does not meet that quarter's identity row at the epoch it
  is named (`claim_unmet`, a port note beside `unmapped_kind`). Chosen over a hard bar because a dossier can name a
  Religious Quarter for a roster with one chapel, and over no bar because a "Religious Quarter" of workshops would
  contradict the name the dossier gave. Home: the derivation table's R5 row (pass c's §7.7) and 27d item 82 (a).
- **J-M9 (epoch cadence) — CONFIRMED with 27d item 76.** Discrete changes at their week; an epoch at each 52-week boundary
  or when the population moved past ± 5 %; `years` fractional. The verifier's V72 is real: §7.7 item 3 as it stands lapses
  every rejection at any epoch whose target differs, and SettlementForge's population drifts weekly (town-1 2 130 → 2 132 →
  2 156 → 2 175, re-read in the tick files) — so does a standalone epoch whose target moves by one person. The plan's J-P6
  (the lapse threshold = the same ± 5 % tolerance; 27d 76 (d)) is the right fix and is a design correction the current
  text needs regardless of SettlementForge (J-Fsf-8). V63's note stands: the population tolerance is judged at arrival,
  the 12-entry history losing long advances' interiors.
- **4.1 ("the dossier's roster" re-read as derived households whose total is the dossier's) — CONFIRMED.** Item 20 (h) (i)
  names "the households the dossier does not enumerate" as map facts; the population count is the dossier fact; a
  household roster, if a host ever had one, is an optional input (iv). The design's phrases "the dossier's roster where one
  exists" (§10.2) and §7.7 item 2's "the population (the roster's demand, §10.2)" are compatible but loose — a design impact
  for pass c's 20 (h) editor, not a block here.
- **4.9 / G-D16 (a ruined institution stays listed) — CONFIRMED.** §7.7 item 2 knows only open or removed; SettlementForge
  never shrinks the list (`calamityKernel.js:248-256` ruin in place; `institutionLifecycle.js:1006-1021` closure to
  `remnant`; `tierOutcomeApply.js:138-169` demotion fates — `abandoned` alone `removed`); a ruined element must be present
  as its ruin. 27d item 80's `Assignment.state` and status table carry it, with V59's order (fate and inactive flag
  before status) and V60 (`captured_by_local_powers` is a criminal house's demotion closure, `tierOutcomeApply.js:147`,
  not a power change).
- **G-D1–G-D3 (the item 72 inputs) — CORRECTED by the plan, rightly.** G-D1 (b)'s "the base materialises one `Faction` per
  dossier power" is superseded by J-P13: typed circumstance slices (economy shares, trade partners with bearings, power
  standings) in the recipe and in `EpochInputs.circumstances`; `Faction` stays "base schema, materialised by the module"
  (§10.1). Confirmed: item 72 (d″) reads STANDINGS at epochs; entities are the module's. G-D1 (a) (military and arcane
  kinds), (e) (`Institution.powers?[]`, the (d5) partition) and (f) (`appliedStanding` with hysteresis) stand (27d 79).
  G-D2's `TradeFlow` stands as a derived record fed by `circumstances.trade` (27d 77). G-D3 is corrected by V35: the
  Blueprint already names `circumstances.economy`; it is typed as the sector shares, not doubled (27d 78).
- **T12–T15 — CONFIRMED as our own calibratable rows.** T12 equal steps; T13's revenue-category → sector rows with J-M6
  (Property Rents neutral; finance its own sector) — a defensible reading of item 72 (d4)'s "as SettlementForge names
  them", since SettlementForge names revenue categories, not sectors (4.13); T14 and T15 with 27d 79's two new kinds.
  T11 must be re-keyed on `worldPulseFate` and `_worldPulseInactive` first (V59); T6 and T7 gain the Roadside Shrine and
  the Waterfront's second phrase (V10); T8 six strings (V37); T16 `wartime` and `slave_revolt` (V27); 4.3's record counts
  city 33–55, metropolis 47–61 (V46); R3 and row 49: a rival or cold-war partner keeps its listed trade — only `hostile`
  or a suppressed economy carries none (`tradeLinks.js:26, 48`; V31).
- **Collective-record states — J-Fsf-4, refining the plan's J-P12.** J-P12 (the affected share equals the severity band,
  members chosen on the record's stream) stands for IMPAIRMENTS, which carry a severity; it is the derive-before-invent
  reading (item 20 (h) (ii) admits seeded chance exactly where the dossier gives nothing to derive from). For the TERMINAL
  states — `ruined`, `destroyed`, `removed`, `remnant` with a closure fate — the state applies to EVERY member: the
  dossier's fact is the KIND's state ("Merchant guilds (15-40)" ruined by the storm is the guilds destroyed, and the lit
  city's storm killed 2 081 and displaced 2 818), and a standing member would contradict a dossier fact (iii); `vacant`
  is an empty seat and touches no building. Chosen over a share for terminal states because SettlementForge has no partial
  terminal state in its closed vocabulary (`worldPulseFates.js:56-75`), and over uniform impairments because "some taverns
  closed" is what a 0.4 impairment says. Home: the derivation table's R26 row (pass c's §7.7).
- **J-M2–J-M8, J-M10–J-M12 — CONFIRMED** as the plan adopted them (J-P14), with J-M4's receipts limited to the two
  institution stamps plus `rename-settlement`, `rename-faction`, `rename-npc` and `replacedNpc` (V5, V69).

**The plan checked against owner item 20 (h) (the method's four tests).** (1) Every dossier gap resolves to DERIVE:
PLAN §2.8 adopts R1–R24 and adds R25 (class lookup) and R26; §0 (6) and 27d's preamble say "SettlementForge is asked
for nothing" — and I found no ask in PLAN.md, SUMMARY.md or 27d (the words "ask", "request" and "required" occur only
in the negative or for our own `E_*` refusals). PASSES. (2) Optional fields only: `HostContext` "every field OPTIONAL"
(`week`, `realm`, `audience`, `displayNames`, `line`), `RealmBlock` optional throughout (PLAN §2.2; 27d 73 (b), 77 (d),
85 (b)). PASSES. (3) The build order: M-1 and M0 gain nothing; M1, M2b, M3a, M4 gain +1.5 / +2, +0.5, +2 / +3, +0.5 pw with
"the build order of §16 is unchanged" (PLAN §5); the one deliberate deviation from 20 (h)'s scope sentence — the port's
CREATION half at M1, test-side (J-P1) — is stated, priced and vetoable; I concur (a real-dossier fixture generating a
town at M1 is the proof that connection is a registration). PASSES. (4) Nothing of SettlementForge's map programs or map
designs read: PLAN §1 and §9 say none was read by any lane; precisely, the seam lane read the input side of the legacy
entry and one map-feature design whole (disclosed) — ruled within the seam scope and uncontaminating (J-Fsf-6), so the
plan's sentence stands in substance. PASSES. Also checked: the sub-floor refusal (27d 81) is owner Q3 as the plan says;
the fixture home under `plat/tests/fixtures/dossier/` honours §17.1 (3); 27d's item texts quote SettlementForge field
names but no code (the owner's own project; their gate (2) says so) — none of that enters the design until the pass
applies them, and the 27d items are phrased as our own types and rows.

## B-sf/verify — CONFIRMED

**Re-derived (CONFIRMED):** (1) the treecheck, by a different method (blob hashes, not `git show` byte comparison):
2 320 of 2 320 identical. (2) V3 — 695 of 5 846 records without `catalogId`, in 129 of 155 dossiers, cascade 631 /
coherence_repair 49 / faction_boost 14 / custom 1; every present `catalogId` = slug of the name (own census;
`catalog.out`). (3) V5 — the institution rename writer's two functions have no caller outside `institutionRename.js`;
no `rename-institution` anywhere; `rename-faction` at 18 sites (grep). (4) V30 — `stablePart(entry.id || entry.name ||
entry.label || institution_${index})` over `.slice(0, 12)`, accreted into `controlledInstitutions`
(`factionCompetition.js:155-166, 904`). (5) V59 — closures write `status: 'remnant'`, `_worldPulseInactive: true`, a fate
from the closed vocabulary of eighteen (`institutionLifecycle.js:1006-1021`; `worldPulseFates.js:56-75`); demotion fates
all `remnant` except `abandoned` → `removed` (`tierOutcomeApply.js:138-169`). (6) V60 — `captured_by_local_powers` is
the criminal-house demotion fate, `status: 'remnant'` (`tierOutcomeApply.js:147`). (7) V61 — `destroyedByEventId` on the
root in `destroySettlement` (`mutateEntities.js:66-78`). (8) V62 — the reconstruction upgrade renames in place with
`promotedFrom` (`upswingKernel.js:516`); the founding writes `{ name, category, status, worldPulseFate }` only (`:763`).
(9) V47 — `calamityKernel.js:482-486` lowers `tier` by `popToTier` directly. (10) V70 — the three after-year dossiers hold
no top-level week, tick or calendar key; `tick` and `calendar` sit on the world state (own tick check). (11) The census
spot-checks the row asked for: `census_v.py` re-run (C1, C9, C16 reproduced) plus my independent census. **V72:** its
inputs re-read (the drift in the tick files; §7.7 item 3's text at l. 7405-7409); the consequence is a correct
inference and the plan's J-P6 answers it (J-Fsf-8).

**Labels:** honest — "every verdict above is CONFIRMED in the lane's sense … except V72's consequence, which is
PLAUSIBLE", and "Not done here" states what was not judged (the mapping's proposals, rightly left to Fable and the plan).
**Two precision notes appended:** V1's "a new seed is a new id" is right of `_seed` and the verifier says so; and the
verifier's scope note (one grep line each of two `townMap/` files printed, neither cited) is a clean disclosure. No
correction.

## Judgment calls of this review (vetoable; say "veto J-Fsf-<n>")

| id | chose | over | because |
|---|---|---|---|
| J-Fsf-1 | the seam at the dossier for our side; an SF plan artifact only ever an optional hint | adopting SF's plan-then-draw seam | DEFINITION §1 and item 20 (h) (ii)/(iv) already place derivation on our side; a required upstream plan is a required field |
| J-Fsf-2 | a host's undo is an ordinary forward dossier change (27d 87); the rewind candidate rejected | s C-4's rewind of dossier events after a matching absorbed state | §7.4's ruled text; item 22 (c)'s continuity over path-independence; the solver's vacant-first order already returns what it can |
| J-Fsf-3 | door 1: recommend (a) never; (b) only if wanted, with its cost stated (the simulator sees a town the user does not) | recommending (b) outright | (b) keeps item 20 (d) but buys incoherence between the picture and the simulation; owner-gated either way |
| J-Fsf-4 | collective-record states: impairments by severity share on the record's stream (J-P12); terminal states on every member | a share for every state, or uniform for every state | SF's fact is the kind's state and has no partial terminal state; a 0.4 impairment is "some taverns", a ruin is the guilds destroyed |
| J-Fsf-5 | J-M1 plus a soft solver bias toward the claim's class family and a `claim_unmet` report bar | J-M1 alone; or a hard bar | item 20 (h) (iii): a "Religious Quarter" of workshops contradicts the given name; a hard bar would refuse a dossier naming a quarter for one chapel |
| J-Fsf-6 | the seam lane's `townMap/` input-side reads are within J67's seam scope; the doors 2–3 read and the one `git status` are disclosed slips, uncontaminating | ruling the reads a scope breach | J67 excludes the drawing and layout program; the entry's inputs are the seam by definition; nothing of the designs entered any file |
| J-Fsf-7 | no design blocks from this review; corrections recorded as design impacts for the pass-c and 27d editors | blocks duplicating 27d items 73–88 | SINGLE SOURCE; the passes' order (c, then d); the blocks would state each fact twice |
| J-Fsf-8 | the lapse threshold = the ± 5 % roster tolerance (27d 76 (d)) is right and needed standalone too | leaving §7.7 item 3's "differs" | any epoch whose target moves by one person lapses every rejection; the owner's words were "grows or declines" |
| J-Fsf-9 | item 67 (i)'s share-in-works table is keyed by the observed growth-or-decline rate; the lit preset is the reference scenario (J-P8), not the calibration key | calibrating to one preset | item 67 (i) states the rule by rate; presets change which rates occur |
| J-Fsf-10 | the queue's marker lines and row statuses are left to the reconciler | replacing them here | the protocol forbids editing existing text in the files a row names; the queue is not among the files I may annotate |

## Design impacts (what another part must change; none applied here)

| part | impact |
|---|---|
| determinism | §7.7 item 3: the lapse condition "whose `populationTarget` differs from `held.populationTarget`" must become "differs by more than the roster tolerance (± 5 %)" — 27d item 76 (d); the current text lapses every rejection on any target change, standalone as well as under a weekly-drifting dossier (V72, J-Fsf-8) |
| determinism | §7.7's derivation table (pass c, item 20 (h) (ii)): row R5 carries the quarter-claim bias and the `claim_unmet` report bar (J-Fsf-5); row R26 states the collective-record rule — impairments by severity share on the record's stream, terminal states on every member (J-Fsf-4); rows R1–R25 as PLAN §2.8 adopts them |
| determinism | §7.7 item 2's "the population (the roster's demand, §10.2)" and the phrase "the dossier's roster where one exists" (§10.2, §4.7, §4.11, §2.6): under item 20 (h) (i) the population COUNT is the dossier fact and every household a map fact; a household roster can only ever be an optional input — restate once at §7.7 (pass c's 20 (h) editor) |
| determinism | §7.7 item 5 gains the host-undo sentence (27d 87); §7.4 is not edited (J-Fsf-2) |
| model | §2.7: `Faction.kind` gains `military` and `arcane`; `Institution.powers?[]`; `Assignment.state` (§7.7); the schema-complete empty records `ConditionOverlay`, `DepositSite`, `HistoryHint`, `PowerRelation`, the dossier-backed `Person` — 27d items 79, 80, 88; §10.1's "materialised by the module" stands (J-P13 over G-D1 (b)) |
| model | §4.11 / §4.2 S0: `CircumstanceSlice.economy`, `.trade`, `.powers` typed (27d 77–79); `EpochInputs.week?` and `EditBase.dossierChange?` (27d 75, 76) |
| pipeline | §4.5's typing reads a quarter naming claim as a soft bias and the solver takes the claim's class family as a soft `districts` row; `Assignment.target` widened to a way, bridge, quay or pin; `Pin.kind` gains `notice` (27d 82; J-Fsf-5) |
| scope | §14: `@plat/port` in the package list and the dependency rule, imported only by `api` and the host glue, SettlementForge shapes in one adapter folder per line (27d 73); §11.4: the port sentence and the ignore-list (27d 73 (c), 86); §11.3: reply correlation `re`, the source-window check, the before-`ready` queue, the SettlementForge iframe configuration (27d 85 (d)(e)); §11.1: the inert-export bar (27d 85 (c)) |
| scope | §13.2 / §16: the B-DOSSIER-lite creation bars and the absorb bars (27d 83); the frozen fixture set under `plat/tests/fixtures/dossier/` with its manifest, honouring §17.1 (3) (27d 84); §1.1: a sub-floor dossier refused by the port (27d 81, owner Q3) |
| rendering | none from these rows (item 67's stage rows are pass c's) |
| kernel | none |

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read by this reviewer):** the baseline copy's identity (2 320 of 2 320 blobs); the 22-step
order, the same-seed identity and the byte-identity with the lane's probe, 41 event types, the catalogue's 280 kinds and
per-tier counts (executed, no write into SettlementForge — `find -newer` empty); every census figure quoted in the
mapping and outputs rows (own script and the lanes' scripts re-run); the tick files' facts; the sample dossier's identity
and 23 keys; every source line quoted above at its file and line on the copy; the strip waves' counts and the split doc's
absence on the branch; the live design's text of §7.7, §10, §11, §14 and §7.4's undo rule at the lines cited.

**Accepted on the quoted evidence (not re-opened):** the model survey's manifest, alias, ledger and custom-content
readings; the generation survey's working-tree figures and preset flag lists; the outputs survey's fixture census; the
seam survey's readings of SettlementForge's split document, ODQ entries and bridge document; the verify lane's V-entries
not named above (their method is sound and their sample held on every entry I re-read).

**PLAUSIBLE (reasoning only, each with the experiment that would settle it):** J-Fsf-4's uniform terminal state — impair
and ruin a collective record in a scratch copy and check that no member stands; J-Fsf-5's bar — generate from `town-1`
and count `claim_unmet` notes; J-Fsf-8 / V72 — the verifier's own experiment (a rejection at week 0 through a J-M9
cadence, read `lapsedAt`); J-Fsf-3's cost of option (b) — a canonical-only replay compared with the edited map on a moved
street; the plan's person-week figures.

**Not done, stated plainly:** no block was written (J-Fsf-7); the queue's markers and statuses are the reconciler's
(J-Fsf-10); SettlementForge's working tree and `master` were not re-executed (nothing rests on them); no SettlementForge
map program or map design was opened by this review (the two `townMap/` reads were one signature line and the seven-line
anchor function the seam and verify lanes had already cited).
