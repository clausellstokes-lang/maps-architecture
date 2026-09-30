# Rewrite — design volume V08 (the SettlementForge stage)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V08; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V08`, started 2026-09-30 20:20 in the cloud; stopped by an interrupt at ~20:38 and resumed 20:42; stopped by a container restart at ~21:21 and resumed 21:24)
- P1 inputs gathered (canon unit V08 → `work/rewrite-V08/routing.md`, `unit.json`, `inv.txt`, `f-items.md`, `f_parsed.json`, `edges-v08.md`; `src/transformed.md` the volume with the G-cite and G-DR transforms applied mechanically): done
- P2 the volume read whole; the base sections it cites (§7.7, §11.3, §11.4, §14) at their rewritten text; agreement, edges and hand-offs extracted: done
- P3 parts written (`work/rewrite-V08/parts/`, 17 files): 00 head, §0, §1 · 01 §1b · 02 §2.1–§2.5 · 03 §2.6 · 04 §2.6a–§2.6b · 05 §2.7–§2.8 · 06 §3.1–§3.4 · 07 §3.5 · 08 §3.6–§3.10 · 09 §3.11–§3.14 · 10 §3.15–§3.16 (new) · 10b §3.17 (new) · 11 §4 · 12 §5–§6 · 13 §7 · 14 §8–§9 · 15 §10–§13, Integration notes: done
- P4 assembled (`new/volumes/V08-settlementforge.md` = the parts concatenated in order, checked byte-equal after the restart); checks run with 41 fixes made in the parts in five batches, the volume re-assembled after each (§11 below): done
- P5 this report, the mapping table (`work/rewrite-V08/mapping.py` → `mapping.md`), the result file, LANDED: done

Source: `docs/volumes/V08-settlementforge.md`. Output: `docs/validation/coherence/new/volumes/V08-settlementforge.md`. Working parts:
`docs/validation/coherence/work/rewrite-V08/parts/` (concatenated in order).

## 1 Sizes

| | words (whitespace-split, the canon's count) | bytes | KB (÷ 1 024) | lines |
|---|---|---|---|---|
| before — `docs/volumes/V08-settlementforge.md` | 84 356 | 545 534 | 532.7 | 3 864 |
| after — `docs/validation/coherence/new/volumes/V08-settlementforge.md` | 77 137 | 489 737 | 478.3 | 3 363 |
| change | −7 219 (−8.6 %) | −55 797 (−10.2 %) | −54.4 | −501 |

**Below the band (25–40 %), and what holds it.** The net figure hides two movements (section-level sums; the within-section
movements are larger both ways). About **12 700 words were added**, all new design at build depth or design the canon routed
here: the port's parts of g items 111, 113, 114, 115, 117 and 118 — the new §3.15 (item 113's reading, ≈ 1 250) and §3.16
(items 111, 114, 115, 117, 118, ≈ 1 250), their row sets in §2.6 (`readiness`, `calendar`, `climates`, `historyEvents`,
`festivals`, the desert's water words), their digest and carried-fact additions (§2.3, §2.5), wiring rows W60–W66, bars
T-V8-50 – T-V8-55, decisions J-V8.116, J-V8.120 – J-V8.124 and their §6 costs and §8 prices; principle (11)'s edge work — the
new §3.17 (≈ 3 270; 29 mechanism rows, 14 feature rows) with T-V8-49 and J-V8.117; W-DOS-01b's adapter field table in §2.4
(≈ +750) with J-V8.126; W-DOS-02 and W-DOS-08's diff rows with T-V8-56 and J-V8.125; J121's SettlementForge inputs
(`moduleOrigin`, `backupDepth`, `quotaBytes`, `locale`; B21; T-V8-57; J-V8.118) and J122's export-bundle route (V08 §5.4 (2),
`exportScenes`, T-V8-48, J-V8.119); SR6-04's frame words keyed as catalogue rows (§5.1, ≈ +390); the §1b rows numbered W1–W94
with producer and consumer. About **19 900 words were removed**, only from the four allowed sources:

| source | ≈ words | ≈ share | where |
|---|---|---|---|
| NARRATION | 15 400 | 77 % | the eight stacked banners, the revision note and the PROGRESS/REVISION/RECONCILIATION ledgers (head 1 105 → 292); the reconciliation-round and finalization appendix (8 933); §12's per-lane reading records (3 061 → 701); §13's deferred list and hand-off table X1–X25 with its "CLOSED … Was:" histories (3 198 → 279); §8.2's estimate history (NARR-4); the decision rows' revision histories (NARR-5); every critique, seam and review-round id used as a reference (C8-n, SR-n, SS-n, SCC-n, the round markers) |
| RESTATEMENT | 4 100 | 20 % | §10's full request texts → the 32-row pointer table (4 520 → 655; V08-RESTATE-1); the base's vocabulary, binding fields, refusal code, note kinds and message list cited at §11.3, §7.7 item 12 and §14 (items 472, 390, 508, 509) instead of restated; thresholds and rules that are the base's or V11's (`viaduct.minDropM`, the ladder file's disagreement list — NARR-3, the `dossierRecord` event at §7.1) |
| DUPLICATED MECHANISMS | 100 | 0.5 % | the knowledge admission cited at §9.2's one function (E-17); the toll-bridge rule kept once at V08 §2.6b (3) with its rung column — V07's copy removed at V07 (E-31), V08 grew by the column |
| VERBOSE PROSE | 300 | 1.5 % | §0, §2.6a, §2.8, §3.3, §3.8 in fewer words |

The volume is almost wholly its own homes (146 of its 165 inventory facts are STATE facts of V08), so little restatement was
available to cut beyond §10; no rule, case, value, bar, record field, lifecycle row, test or reasoned decision was dropped or
thinned (the loss probe of §11 found only the ruled removals, and two trace links it found missing were restored).

## 2 The f and g items applied

**File f items this volume cites as base text** (never restated; V08 §10's pointer table and the sections that read them):
202, 244, 256, 257, 260, 322, 358, 359, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 410, 425, 453, 459, 464,
472, 473, 480, 486, 507, 508, 509, 510, 511, 512, 513, 516, 529, 568, 572, 573, 583 (and, where read, 343, 463, 519). The
applied texts of items 472, 508, 509 and 511 name V08 §2.2, §2.4, §2.5 and §2.8 as the TYPES' home (the rewritten §11.3 and
§14 cite them there), so those type blocks stay here and the vocabulary, the refusal code, the note kinds and the binding's
fields are cited.

**G items at build depth (new design, the port's part):**

| item | where it now lives in V08 | wiring | test | decision |
|---|---|---|---|---|
| 111 water in dry country | §3.16 (1); §2.6 `site` row (`desert` → the arid row; the water words force their water; the oasis exactly when `oasis_water` is listed, DR40); §3.17's oasis rows; the toll bridge's dry-site failure (§2.6b (3)) reads it | W60 | T-V8-50 | J-V8.116 |
| 113 SettlementForge's history | §3.15 (the facts read with `AGE_BY_TIER`, the founding, the 29 event types with years ago and severity, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle — terminal death, resettlement — the opt-in ancient ruins, `peakTier` and its documented gap; `HistoryHint`'s item-113 fields; the effective peak's evidence order; contradictions and gaps; the port after the replay); §2.6 `historyEvents`, `tiers` rows; §3.5's frozen `history` row | W61 | T-V8-51 | J-V8.120 |
| 114 walls decay and recover | §3.16 (2) (`defenseProfile.readiness` → `defence.readiness` through the `readiness` row; the wealth word through the `wealth` diff row; NEED = max(threat, readiness weight); MEANS the wealth level in force); §2.6 `readiness` row; §2.3 `port-values.readiness` | W62 | T-V8-52 | J-V8.121 |
| 115 grandeur ceiling by tier | §3.16 (3) ("specified": a dossier-bound record of a grand class, every placed member of such a collective; a seigneurial government's manor at VILLAGE — and the list of what is NOT a specification) | W63 | T-V8-53 | J-V8.122 |
| 117 seasons | §3.16 (4) (the client's `view.set { week }` under the follow flag, the `calendar` row's `sf445` year; the climate from `site.climate` through the `climates` row, else the terrain column, else the user's; the climate frozen with `site`) | W64 | T-V8-54 | J-V8.123 |
| 118 festival decorations | §3.16 (5) (`traditions` and `customContentRoster.traditions` read at the pinned baseline, off §7.7 item 1's never-read list by the owner's rule; keys, the `festivals` row's kinds, windows as weeks of the `sf445` year, staging reduced to V11's keywords, the deity; carried `tradition` facts; ledger-only changes) | W65 | T-V8-55 | J-V8.124 |

Items 116 and 119 name no V08 part (canon.md's dated rulings); V08 §3.17's frame row cites item 116's zoom-out limit and
V08 §6 keeps its budgets. Item 112 names no V08 part. The items are priced in V08 §8.2 (SF4 5.75–7.75 pw carries them; SF3,
SF5–SF7 the field table, the frozen facts, the J121 inputs, the bundle and the edge suite), total **18–24.5 pw** (map side).

**J121 / J122.** V08 §11 is the table of the five decisions — Q1 and Q2 follow SettlementForge (J121), read as
`MapHostConfig.moduleOrigin`, `backupDepth` and `quotaBytes`; Q3 yes from M-SF as opaque blobs (J122; V08 §5.4 (2)); Q4 M-SF
after M-CAL (J122; V08 §8.1); Q5 pictures and player views now, a live shared map after M-SF as its own item (J122; V08 §1,
§3.14 (6)) — each carried into its section. The interface language (`MapHostConfig.locale`, V08 §5.5) and the assistant
with its model tier (V08 §4.4) follow SettlementForge (J121); the built-in clerk is built at M3c and runs only where the
deployment enables it (J122 V10 Q4).

## 3 Conflicts resolved (12)

| id | ruling | where it now lives |
|---|---|---|
| SCOPE-C07 | SettlementForge's assistant drives the tool API through the host seam (configuration C, V10 Q2); the built-in clerk at M3c where the deployment enables it; provider, model tier and key path read from SettlementForge's AI setup (J121/J122) | V08 §4.4 (preface, (6)), §4.2's *Assistant settings* row, §3.1 (2) |
| V08-XCONF-1 | "none under C (SettlementForge's own assistant; follows SettlementForge, J121/J122)" | V08 §3.1 (2), §4.4 (6) |
| V08-XCONF-2 | SettlementForge's origin, backup depth and quota are inputs; `backups[0..n)` with n = `backupDepth`; the draft mirror on SettlementForge's origin | V08 §0, §2.1, §2.2 `MapHostConfig`, `MapStore.replaceSnapshot`, §3.7, §3.9 B21, §6 storage row, §8.4 risk 5, J-V8.5 (amended by J121), J-V8.118 |
| V08-XCONF-3 | small settlements drawn by the village product, registered before M-SF; the held state only in a build without it; B7's copy without "coming later" | V08 §0, §3.9 B7, §3.10 |
| V08-XCONF-4 | Q5 decided under J122 | V08 §1 *Out of scope*, §3.14 (6), §11 |
| V08-XCONF-5 | J122's export-bundle route: `MapSession.exportScenes` from M-SF returning opaque blobs SettlementForge packages unread; no call returns a structured format as data; door 1 closed (J86) | V08 §2.2, §5.4 (2), T-V8-48, J-V8.119, J-V8.37 (amended by J122) |
| V08-XCONF-6 | the frame's interface language is SettlementForge's (`MapHostConfig.locale` in the frame's `src`); English the catalogue's source language | V08 §2.2, §5.5 |
| V08-XCONF-7 | Q4 decided under J122: M-SF after M-CAL | V08 §8.1, §11 |
| V08-XCONF-8 | §11 is the table of the five decisions, each carried into its section | V08 §11 |
| V08-XCONF-9 | the era derivation's home is V08 §2.6's `era` row (culture → era, the tier no part); V11 §3.19.2 cites it | V08 §2.6 `era` row |
| CANON-C03 | every volume's §11 a table of decisions | V08 §11 |
| CANON-C04 | INDEX §7's items routed and fixed: SR6-05 (b) and SR6-04 (surfaces) for V08 | V08 §12, §4.2, §5.1 (§8 below) |

## 4 Elegance rulings applied, with their equivalence lists ticked

**E-17 (UNIFY: one admission function at §9.2, its readers listed).** V08's readers cite it: the party set and gazetteer
draw and name what §9.2's admission admits under the party key "as at the city band" (V08 §3.14 (2), §5.2's `CustomChainRecord` row; J-V8.105), and exports lower the requester's key through `knowledge?: Admission` (item 572; V08 §2.2, §5.3).
- [x] the band each reader admits at is kept: the party set as a band-less reader at the city band; an export at its own band; the thumbnails at `{ tier: 'public', places: [] }` (T-V8-16)
- [x] V09's `admitAs` and V10's filtered dry runs cite it (V08 §3.1 step 7 (b) reads through `admitAs`, V08 §4.4 (3) through V10's projection)

**E-24 (UNIFY: one mark on a superseded or amended decision row).** V08 §9's preface states the form; the rows carry
"amended by X": J-V8.5 (J121), J-V8.37 and J-V8.36's bundle clause (J122), J-V8.57 (J122 V08 Q5), and J-V8.88 (amended by
J-V8.94).
- [x] no row dropped (J-V8.1 – J-V8.115 all present; J-V8.116 – J-V8.126 added)
- [x] the governing row keeps the reason (each mark names its governing ruling; the reason stays at that ruling)

**E-31 (UNIFY: the toll-bridge watercourse rule once, at V08 §2.6b (3), with a rung column; V07 cites it).**
- [x] geometry by rung: base — the brook crosses the through route of the longest approach inside the frame; village — the course between the two frame arcs the through road's entries divide, the topology raised to `through`
- [x] coastal dry site by rung: base — a brook; village — an estuary
- [x] failure → `toll_bridge_dry` at every rung on any of: a desert with no `oasis_water` and no river the arid row draws (g item 111); relief that cannot carry the brook; a fixed `isolated` or `none` access word — each defined at both rung ranges (V08 §2.6b (3)'s table; T-V8-40 at base and village rungs)

No unification beyond these three was made.

## 5 Id rulings, renumberings and new ids

- **ID-DR:** DR28–DR35 by number everywhere (DR28 one row with V06's; DR29 latitude, DR30–DR32 item 109, DR33 the chains, DR34 the water system, DR35 the high-ground landmarks); every `DR-V8.n` alias retired (0 left). The history rows DR36–DR39 and the oasis row DR40 are §7.7's, cited.
- **ID-WX:** the §1b rows numbered **W1 – W94** by subject, the history dividers dropped (V08-TERM-1); other volumes' rows are written with their prefix (`V06 W82`, `V06 W19`); the old hand-off ids that no longer resolve were replaced by their destinations' sections (`V06 X23` → V06 §3.19.6; `V02 X17` → V11 §3.24.3). IN-V08-1 – IN-V08-4 are folded into the body; their ids stay in the validation records only.
- **ID-BCR:** V08's requests keep `BCR-V8-n` (1–32), each a pointer row to its f item and base home; other volumes' requests are cited with their family prefix at their items.
- **ID-DUPDEF:** one definition per id: T-V8-1 – T-V8-57, J-V8.1 – J-V8.126, W1 – W94, BCR-V8-1 – 32 and B1 – B21 each defined once.
- **New ids:** W60 – W94 (the rows numbered by subject include the new ones); T-V8-48 (the export bundle), T-V8-49 (the edge suite, clauses (a)–(m)), T-V8-50 – T-V8-55 (items 111, 113, 114, 115, 117, 118), T-V8-56 (the frozen facts and the wealth), T-V8-57 (SettlementForge's inputs); J-V8.116 – J-V8.126; the failure row B21 (the quota); the notes `frozen_fact_changed` and `history_gap`.
- **Retired terms (the canon's list):** G-lot (0 left), G-firstmap ("first map"; SettlementForge's own page "loads as before"), G-cite (every other volume as `Vnn §`), G-DR (above), G-fallbackclass (item 104 (a)'s resolution, V11 §3.13), G-portpath (`ProductDecl` in `StrategyRegistry.products`, item 202).

## 6 Wiring closed

| id | the link, both ends | where |
|---|---|---|
| W-DOS-01a | §7.7 item 1's never-read list and the closed-digest rule are the base's; V08's field table is the list it names; `traditions` leaves the list by item 118 and `defenseProfile` is read for `.readiness` only (item 114) | V08 §2.4 field table, §3.16 (2), (5); cross-part note to determinism |
| W-DOS-01b | THE ADAPTER'S FIELD TABLE for `fp-integration-2026-09-23`: every path → its `DossierDigest` field → the row or reader it feeds, or `ignored` with §7.7 item 1's reason; `keyList`, T-V8-20's ignore clause and §14's lint read it (the named paths `config.cultureProfileKey`, `config.nearbyResources*`, `neighborRelationship`/`neighbourNetwork`, `economicState.prosperity` included; `npcLadder` not read) | V08 §2.4, W22, J-V8.126 |
| W-DOS-02 | the diff's `wealth` row → `EpochInputs.wealthLevel` through the `wealth` row (DR6; receipt F9), read by V06 and item 114's MEANS | V08 §3.5, W37, T-V8-56 |
| W-DOS-07 | `notables[].importance` read by V10's people answer and V09's person card, which order a settlement's notables by it | V08 §2.4, §2.5, §3.11, W46 |
| W-DOS-08 | the diff's frozen-fact rows `site` and `history`: one `frozen_fact_changed` note (class report, its `host.note.*` row), no map event | V08 §3.5, §4.6, W38, T-V8-56, J-V8.125 |
| W-DOS-09 | closed by item 113's §7.7 rows DR36 onward; V08 §3.15 fills their inputs | V08 §3.15, W61 |
| W-HOOK-02 | `ConditionOverlay`, `DepositSite`, `PowerRelation`, `HistoryHint` and the dossier-backed `Person` name V08 as their building volume; V08 fills each | V08 §2.5 (the staged records' fill), §3.11, §3.15 (2), W34, W39 |

Two trace links the rewrite had dropped from the old dossier trace were restored in the field table: `security` →
`PortValues.crime` → the crime scalar DR16 and DR17 read; `npcs[]` → `notables[]` → the dossier-backed `Person`, DR22's
exception.

## 7 Hand-offs closed (20) and agreement

| hand-off | closed at |
|---|---|
| V02:X9 | V08 §3.13 step 2: `materialFamily` reaches the material row only; `MaterialRow`'s rows are V11's |
| V06:X5 | V08 §3.6 (3): calamity records `{ week, kind: 'calamity', calamity: CalamityRef }` with severity, targets and `deaths` (item 573), `activeChains[]` changes, ladder receipts, the church, cemetery, walls and ruin and mining records into `EpochInputs` |
| V06:X23 | V08 §2.6b (1), (2), W53, W54: the water-system record and the high-ground landmarks carried into `EpochInputs` for V06 §3.19.6's epoch builds |
| V06:X29 | BCR-V6-27 is file f item 573; V08 cites it (V08 §10, §13) and reads its `CalamityRef.deaths` in V08 §3.6 (3) |
| V06:X44 | V08 §12 PLAUSIBLE list reads `EpochReport.raised.suppressedFired` with T-V6-58 and T-V8-45; V08 §4.6's "kept removed" line |
| V06:X47 | V08 §3.5.1 (c), (d): a REPLACEMENT's lesser re-bound as the greater's member only where the greater's thing is the lesser's; `parish_church` over `wayside_shrine` |
| V09:XV-V9-17 | V08 §3.1 step 7 (a), (b): `ClerkMount.host` and `HostSlots.hostName` |
| V09:XV-V9-20 | V08 §3.1 step 7 (b), (c), §3.14 (5): the players'-view filter through `viewAs`, the frame's strips |
| V09:XV-V9-21 | V08 §3.1 step 7 (b), §4.6, §5.1: `HostSlots.historyLines`, `newDocuments: 'download'` |
| V09:XV-V9-24 | V08 §3.1 step 7 (b), §3.8, §5.2: the frozen view's `error.frozen` strip; the rebase's **Edit it with this version** |
| V09:XV-V9-26 | V08 §5.2: the gazetteer's `customChain` kind under the chains' knowledge rule |
| V09:XV-V9-29 | V08 §3.1 step 7 (b), J-V8.109: the per-key answer cache with `onChange` |
| V10:CVR-V10-3 | V08 §3.1 (2)'s `connect-src` by configuration; T-V8-27's list; V08 §4.4 (4)'s no-prose line |
| V10:CVR-V10-14 | V08 §4.6: the history panel's "kept removed" line from `info.raised.suppressed`; T-V8-45 |
| V11:X-V11-1 | V08 §2.4 (the catalogue manifest with `ladderPairs`, W24), §3.5 (6) (`goodWords` by V11 §3.13.5's rule), §3.5.1 (the ladder merge reads `identity`) |
| V11:X-V11-6 | V08 §2.6 `archetypes` and `keywords` shapes: the optional `village?: ArchetypeVillageCell` and the `class` and `specialisation` cells, item 104's resolver's as V11 §3.13.2 states them |
| V11:X-V11-15 | V08 §2.6b (2), W54, J-V8.70, T-V8-38: DR35's threshold is V11 §3.24.2's `elevated.landmarkMinSignificance` |
| V11:X-V11-17 | V08 §4.6's `class` argument reads V11 §2.3's `label` (item 516); the template reads "like any {class}", carrying no article (SR6-03's form is V09's) |
| V12:X-V12-5 | V08 §7.3 and W93: the fixtures' levels (item 108 (f)'s `exactMonotone`, item 104 (h) (8)'s, the step script's, the elevated road's `higherWith`); none a seed family; B-DOSSIER-lite |
| V12:X-V12-16 | V08 §2.6 and W94: the dossier row sets are `calibratable: false` with no V12 register line, so V08's exits land no register cell |

**Agreement (the canon's four disagreements).** With V09: SCOPE-C07 (V09's clerk slots receive SettlementForge's assistant
under configuration C) and V08-XCONF-6 (V09 §2.9's catalogue in SettlementForge's locale; the rewritten V09 already says
which locales ship follows SettlementForge, J121) — agree. With V10: SCOPE-C07 — V08 §4.4 and V10's configuration C agree.
With rendering: V08-XCONF-5 — the rewritten §11 carries the export bundle's opaque-blob route and door 1's narrowed rule, as
V08 §5.4 (2) does. With scope: SCOPE-C07 — §14's clerk paragraph and V08 §4.4 agree. The build-plan agreement with §16 is a
cross-part note (§12 note 1): §16 still prices M-SF at the earlier 15.75–21.5 pw.

## 8 Open findings closed (36 of 36)

| finding | closed by |
|---|---|
| VOL-V07-V08-RESTATEMENTS-008 | V08 §2.2 cites §11.3 for the vocabulary (item 472); the message TYPES stay, where item 472's applied text homes them |
| VOL-V07-V08-RESTATEMENTS-009 | V08 §2.2's "base messages extended" comment cites §11.3 (items 472, 459); no base message restated |
| VOL-V07-V08-RESTATEMENTS-010 | V08 §2.3 cites `DossierBinding`'s port fields at §7.7 item 12 (item 390) |
| VOL-V07-V08-RESTATEMENTS-011 | V08 §2.4 cites `E_OTHER_SETTLEMENT`, the note kinds and `PortNote`'s `msg`/`keys` at §14 (item 508) |
| VOL-V07-V08-RESTATEMENTS-012 | V08 §2.5 types the digest additions; §14 names them and cites these types (item 509) — one home |
| VOL-V07-V08-RESTATEMENTS-013 | V08 §10 is the pointer table |
| V08-RESTATE-1 | V08 §10: 32 rows `BCR-V8-n → item → base home`, plus the other volumes' requests cited at their items |
| V08-XCONF-1 – V08-XCONF-9 | §3 above |
| V08-ELEG-1 | E-31 (§4 above) |
| V08-TERM-1 | V08 §1b numbered W1 – W94, ordered by subject, no history dividers |
| V08-TERM-2 | DR28 – DR35 by number everywhere; no alias and no "the coherence pass numbers them" left |
| V08-DEFER-1 | V08 §10's rows carry no conditional wording: `Intent.latitudeDeg` is item 391's, the DR numbers settled (ID-DR), §16's sentence item 529's |
| V08-DEFER-2 | V08 §13 (a) F1–F5 closed at their homes: F1 the `threats` row's outcome for an unseen word, release row R9's census and a table fix (V08 §2.6, J-V8.50); F2 the assistant's loop is SettlementForge's (J121) and the relay holds wherever it runs (V08 §4.4 (1), risk 6); F3 T-V8-18 with its pre-decided fallback (V08 §3.11); F4 T-V8-34, no fuzzy matching whatever it shows (J-V8.82); F5 T-V8-30 and T-V8-41 with V08 §6's fallbacks |
| V08-DEFER-3 | SR6-05 (b) and SR6-04 (below) |
| V08-NARR-1 | one marker line under the title |
| V08-NARR-2 | the PROGRESS, REVISION and RECONCILIATION ledgers removed |
| V08-NARR-3 | V08 §3.5.1 (f) is one sentence: V11 §3.12's rows agree with the pinned ladder file; release row R2 checks it; a disagreement is a V11 table fix |
| V08-NARR-4 | V08 §8.2's total row states 18–24.5 pw and that V11 prices C4, no estimate history |
| V08-NARR-5 | V08 §9's rows carry their final choices; revision history out; E-24 marks where a later ruling amended a row |
| V08-NARR-6 | V08 §12: one CONFIRMED list of sources, one PLAUSIBLE list with the bar or milestone that settles each |
| V08-NARR-7 | V08 §13 (b)'s hand-off table deleted; §13 says each former item is closed at its home and names the homes |
| V08-NARR-8 | the reconciliation-round and finalization appendix removed |
| SR6-05 (b) | V08 §12's round-6 PLAUSIBLE sentence left with the narration |
| SR6-04 (surfaces) | V08 §4.2's controls and dialogs, §5.1's strip and the notice keyed as `host.control.*`, `host.dialog.*`, `host.frame.title`, `host.playersView` and `host.mirror.dropped` rows (V08 §5.1's table; W86) |
| V08:IN-V08-1 | folded: DR28 – DR35 by number (V08 §2.6a, §2.6b, §3.5, §3.6) |
| V08:IN-V08-2 | folded: the one suppression mechanism (item 260) and `waterUse` with the notes `aqueduct_no_source`, `toll_bridge_dry` (V08 §2.6b (1) (b), (e), (3), §4.3) |
| V08:IN-V08-3 | folded: a dossier-bound conduit house is the aqueduct's terminal; none created that the dossier or roster does not hold (V08 §2.6b (1) (c)) |
| V08:IN-V08-4 | folded: `PortRows.customKinds` carries no fallback class; item 104 (a)'s resolution at fold (V11 §3.13); the read-time overlay stays (item 425; V08 §3.5 step 5 (f), §3.11) |

The volume's §13 reads "No item is open"; nothing is marked for the adjudicator.

## 9 Edges defined (61 mechanism edges and 62 combinations)

V08 §3.17 (a) holds 29 mechanism rows (26 carrying routed edges; the row sets, the history's reading and items 111–118 at
the port are new mechanisms with their own rows), each with the extremes' outcome, its failure rung (§5's ladder, never a
whole-map retry) and its test; T-V8-49 runs one fixture per clause at THORP (P = 40) through the METROPOLIS cap and one
above it, with the village product registered and without it, and through save, load, undo, redo, regenerate and migrate.
V08 §3.17 (b) holds 14 feature rows (× the dossier, × custom content, × the players' view), each stating the port's part
over the feature owner's rule, their rung the feature's own (F-SITING's for a record that cannot be seated; `check` for the
party column), tested by T-V8-49 (m) at THORP, TOWN and METROPOLIS.

| §3.17 (a) row | routed edges it defines (old line–class, status) | tests |
|---|---|---|
| the map record (V08 §2.1) | 387-E5-data (undefined) | T-V8-49 (a), T-V8-5 |
| the messages (V08 §2.2) | 444-E5-data (undefined) | T-V8-49 (a), T-V8-2 |
| the carried facts and the binding (V08 §2.3) | 544-E5-data (undefined) | T-V8-49 (a), T-V8-5 |
| the digest's additions (V08 §2.5) | 677-E5-data (undefined) | T-V8-49 (a), T-V8-51 – T-V8-55 |
| custom content's records (V08 §2.8, §3.13) | 1218-E5-data (untested), 2032-E1-none (untested), 2032-E2-one (untested), 2032-E4-degenerate (undefined), 2032-E5-data (untested), 2032-E8-lifecycle (untested) | T-V8-49 (c), T-V8-25 |
| the embed (V08 §3.1) | 1312-E4-degenerate (undefined) | T-V8-49 (d), T-V8-1 |
| offering and coalescing (V08 §3.2) | 1417-E8-lifecycle (undefined) | T-V8-49 (d), T-V8-6, T-V8-7 |
| the refresh queue (V08 §3.4) | 1468-E1-none (undefined), 1468-E2-one (untested), 1468-E3-cap (untested), 1468-E5-data (undefined), 1468-E6-rungs (undefined), 1468-E8-lifecycle (untested) | T-V8-49 (e), T-V8-12 |
| the digest and the diff (V08 §3.5) | 1490-E4-degenerate (undefined) | T-V8-49 (f), T-V8-20 |
| the ladders (V08 §3.5.1) | 1623-E4-degenerate (undefined) | T-V8-49 (f), T-V8-44 |
| changes to events and epochs (V08 §3.6) | 1736-E1-none (untested), 1736-E2-one (untested), 1736-E4-degenerate (undefined), 1736-E5-data (untested), 1736-E6-rungs (untested), 1736-E8-lifecycle (undefined) | T-V8-49 (g), T-V8-42 |
| persistence (V08 §3.7) | 1813-E4-degenerate (undefined) | T-V8-49 (h), T-V8-5, T-V8-57 |
| versions and migrations (V08 §3.8) | 1862-E4-degenerate (undefined) | T-V8-49 (h), T-V8-10, T-V8-11 |
| failure handling (V08 §3.9) | 1898-E4-degenerate (undefined) | T-V8-49 (h), T-V8-14 |
| the village hand-off (V08 §3.10) | 1932-E5-data (undefined), 1932-E8-lifecycle (undefined) | T-V8-49 (i), T-V8-19 |
| determinism (V08 §3.12) | 2021-E8-lifecycle (undefined) | T-V8-3, T-V8-49 (i) |
| the players' view (V08 §3.14) | 2104-E6-rungs (undefined), 2104-E8-lifecycle (undefined) | T-V8-49 (j), T-V8-41 |
| editing (V08 §4.1, §4.3, §4.5) | 2175-E1-none (undefined), 2175-E2-one (untested), 2175-E5-data (untested), 2175-E8-lifecycle (undefined), 2227-E2-one (undefined), 2295-E1-none (undefined), 2295-E2-one (undefined), 2295-E5-data (undefined), 2295-E8-lifecycle (undefined) | T-V8-49 (k), T-V8-37 |
| the host actions (V08 §4.2) | 2197-E6-rungs (undefined) | T-V8-47 |
| the host clerk (V08 §4.4) | 2246-E1-none (untested), 2246-E2-one (untested), 2246-E5-data (untested), 2246-E8-lifecycle (undefined) | T-V8-49 (k), T-V8-27 |
| the DM's view (V08 §4.6) | 2306-E4-degenerate (undefined) | T-V8-14 |
| the Map tab and the frame (V08 §5.1) | 2418-E1-none (undefined), 2418-E4-degenerate (undefined) | T-V8-49 (d) |
| drawing the records (V08 §5.2) | 2461-E4-degenerate (undefined), 2461-E6-rungs (undefined) | T-V8-49 (l), T-V8-25 |
| pictures (V08 §5.3) | 2482-E1-none (undefined), 2482-E2-one (untested), 2482-E5-data (untested), 2482-E8-lifecycle (undefined) | T-V8-49 (l), T-V8-16 |
| what leaves the frame (V08 §5.4) | 2510-E5-data (undefined) | T-V8-48 |
| labels (V08 §5.5) | 2555-E1-none (undefined), 2555-E2-one (undefined), 2555-E5-data (untested) | T-V8-49 (l) |

| §3.17 (b) feature row | combinations it defines | test |
|---|---|---|
| cliff, steep ground | cliff×dossier, cliff×custom, cliff×players, steep×dossier, steep×custom, steep×players | T-V8-49 (m) |
| river, coast, harbour | river×custom, river×players, coast×dossier, coast×custom, harbour×dossier, harbour×custom, harbour×players | T-V8-49 (m) |
| moat | moat×dossier, moat×custom, moat×players | T-V8-49 (m) |
| raised ways, retaining walls, deck plots | raised×custom, raised×players, retaining×custom, retaining×players, deckplot×custom, deckplot×players | T-V8-49 (m) |
| squares and markets | square×dossier, square×custom, square×players | T-V8-49 (m) |
| the oasis | oasis×dossier, oasis×custom, oasis×players | T-V8-49 (m) |
| the frame and the zoom-out limit | frame×dossier, frame×custom, frame×players | T-V8-49 (m) |
| wards and terraced wards | hood×dossier, hood×custom, hood×players, terraced-ward×dossier, terraced-ward×custom, terraced-ward×players | T-V8-49 (m) |
| building tiers, plans, crypts | tiers×custom, crypt×players, plan×dossier, plan×custom | T-V8-49 (m) |
| the underground | sewer×custom, cavern×custom, ruin×custom, catacomb×custom, access×custom, vault×dossier, vault×custom | T-V8-49 (m) |
| sky islands, shade, sky access, landfall | island×players, shade×dossier, shade×custom, shade×players, skyaccess×dossier, skyaccess×players, landfall×custom, landfall×players | T-V8-49 (m) |
| the history | history×players | T-V8-49 (m) |
| light and the season | dossier×light, custom×light | T-V8-49 (m) |
| editing, undo and save or load | custom×edit, custom×undo, custom×saveload | T-V8-49 (m) |

## 10 Judgment calls of this seat

1. **A dossier desert without `oasis_water` has no oasis** (J-V8.116): the deposit list is SettlementForge's statement of what lies near the settlement, so the arid row's oasis chance is a standalone draw only; the water words force their water at every terrain.
2. **The readiness folds into NEED as max(threat, readiness weight)** (J-V8.121): a well-kept fortress keeps its walls in use, a frontier town's threat is never lowered by a weak readiness, and DR2's creation defence reads the threat alone.
3. **"Specified" under the ceiling** (J-V8.122) is a dossier-bound record of a grand class (every placed member of such a collective) or a seigneurial government's manor at VILLAGE; wealth, quarter names, roles, standings, a count's open top and unresolved keywords are not.
4. **The history is read at creation only** (J-V8.120) and later reaches the map through the live rows; a later change of the creation-time history or site is a frozen fact reported once (`frozen_fact_changed`, J-V8.125).
5. **Festival windows as weeks of the `sf445` year** (J-V8.124): campaign weeks reduced mod 52, a reversed window wrapping past week 51, 52 weeks or more the whole year, an unreadable window carried and shown only in the user's preview.
6. **The adapter's field table is the one list** (J-V8.126) that `keyList`, §14's lint and T-V8-20 read; two trace links the rewrite had lost from the old trace (DR16/DR17's crime scalar; DR22's exception) were put back in it.
7. **Canon, seam and review ids leave the design text** (XCONF-n, W-DOS-n, W-HOOK-02, E-17, E-31, SCOPE-C07, ID-DR), as in V07; each place cites its governing ruling (J121, J122, item n, §14's clerk) instead, and this report keeps the provenance. Another volume's hand-off id that no longer resolves is replaced by its destination (`V06 X23` → V06 §3.19.6; `V02 X17` → V11 §3.24.3, the row X17 routed to).
8. **§3.17 (b)'s rung** is stated once for the table (the feature's own; F-SITING's for a record that cannot be seated; `check` for the party column) rather than a rung column per row, since the port adds none.
9. **§4.5's own text defines its edges** (none, one, data, lifecycle); §3.17's editing row names them and T-V8-49 (k) tests them, rather than a separate row.
10. **The price is the sum of the step prices**: 18–24.5 pw (was 15.75–21.5), SF4 carrying items 111 and 113–118 at the port, SF3 the field table and frozen facts, SF1 and SF5 the J121 inputs, SF6 the bundle, SF7 the edge suite.

## 11 Checks run

- **Assembly:** after the restart, every part was checked to end cleanly and the assembled volume to equal their concatenation byte for byte; it was re-assembled after each fix batch (five batches, 41 fixes, all in the parts).
- **Ids:** T-V8-1 – T-V8-57, J-V8.1 – J-V8.126, W1 – W94 and BCR-V8-1 – 32 each defined once with no gaps; every T-V8, J-V8, W and BCR-V8 reference resolves; every other volume's T-V and J-V id cited exists in that volume (its rewritten text where one exists). DR numbers used: DR1 – DR7, DR9 – DR25, DR28 – DR40 (DR8, DR26, DR27 are not V08's inputs).
- **References:** 1 666 section references parsed with list continuations and line breaks joined: 705 to the base (resolved against `new/base/*` headings), 694 to this volume, 267 to V02, V04, V06, V07, V09 – V12 (the rewritten text where it exists, else `docs/volumes/`). One key resolves only as an inline bold label (V11 §3.19.2 *Era default from the dossier*), which is its form in V11. Three bare references that meant this volume were made explicit (V08 §3.4, §3.11, §3.13 (3)).
- **Terms:** no retired term left (G-lot, G-firstmap, G-cite, G-DR, G-fallbackclass, G-portpath: 0 hits).
- **Narration and deferral:** 0 critique, seam, canon or review-round ids (C8-n, SR-n, SS-n, SCC-n, XCONF-n, W-DOS-n, E-n, SCOPE-C, round markers); the remaining `C-n`/`E-n` are `research/sf/dossier-seam.md`'s own section ids, cited as sources; every "later" is temporal (a later dossier), none an unresolved choice; no "TBD", "coming later" or "until the owner".
- **Loss probe:** each of the 165 inventory facts' identifiers and numbers searched in the new text; the misses are the ruled removals (NARR-3's ladder list, NARR-4's estimate history, the BCR texts now the base's, withdrawn names) and two trace links, restored (§10 item 6).
- **Coverage:** f items 202 – 583 concerning V08 all cited; g items 111, 113, 114, 115, 117, 118 each with its section, wiring row, bar and decision; items 112, 116, 119 name no V08 part; 12 conflicts, 3 elegance rulings, 4 id rulings, 7 wiring gaps, 20 hand-offs, 36 open findings, 61 edges and 62 combinations each closed at a named place (§3 – §9 above).
- **`docs/validation/bench/doc_checks.py --doc <new volume>`** (provisional — the reference corpus is absent here: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative"): C1 0, C2 0, C3 184 hits (181 unreviewed), C4 2 hits (0 unreviewed), S1 0, S2 637 (unreviewed). The original volume under the same run: C1 0, C2 0, C3 229 (226 unreviewed), C4 0, S1 0, S2 647. C3's hits are common English runs and number sequences (section-number lists); S2 counts the bare base pointers, which resolve against the base, not the volume.

## 12 CROSS-PART NOTES

1. **scope §16 and INDEX §4** — the SettlementForge line (volume 8, map side) is **18–24.5 pw** (SF0 0.75–1, SF1 2–2.5, SF2 2–3, SF3 2.25–3.25, SF4 5.75–7.75, SF5 1.5–2, SF6 1.5–2, SF7 1.75–2.5, VH 0.5), the rewritten §16 still reading 15.75–21.5 in the staged-milestones row and the totals; SettlementForge's own side stays 1.5–2.5 pw outside the totals; M-SF after M-CAL (J122), SF0–SF3 may start earlier.
2. **scope §13** — the take-over row and the SettlementForge bullet read **T-V8-1 – T-V8-57** (T-V8-48 the export bundle, T-V8-49 the edge suite, T-V8-50 – T-V8-55 the port's bars for items 111, 113, 114, 115, 117, 118, T-V8-56 the frozen facts and the wealth, T-V8-57 SettlementForge's inputs); the rewritten text reads T-V8-1 – T-V8-47.
3. **determinism §7.7** — item 1's never-read list loses `traditions` (item 118; V08 §3.16 (5) reads it, with the custom-content traditions bucket) and states that `defenseProfile` is read for `.readiness` only (item 114); the item-114, item-117 and item-118 rows read V08's `readiness`, `calendar`, `climates` and `festivals` rows and the carried `tradition` facts; DR36 – DR39 take their inputs from V08 §3.15 (2)'s `HistoryHint` fields and DR40 from `oasis_water`; DR1's coastal bar is a creation bar (W-DOS-08).
4. **model §2.7** — `HistoryHint` gains V08 §3.15 (2)'s item-113 input fields (`founding`, `events`, `tiers`, `population`, `calamities`, `lifecycle`, `ancientFall`, `peak`), typed in V08 as the digest additions are (the rewritten model carries `ageYears` and `scars` on `HistoryHint` and the replay's output on `HistoryRecord`).
5. **rendering §11.3** — the frame's `src` carries `MapHostConfig.locale` (J121; V08 §5.5), and `export.request` gains `bundle?: true` for the M-SF scene route (V08 §2.2, §5.4 (2)); §11.4's bundle route already agrees.
6. **V11** — the rows V08 reads for the g items: `readiness` bands and weights, the `calendar` row (`sf445`), `climates` synonyms, `festivals` kinds, `historyEvents` and `historyScars`, the staging-keyword table (item 118), the ceiling table's grand classes (item 115), `history.symbolicQuantile`; V11 §3.19.2 cites V08 §2.6's `era` row (culture → era) without naming the tier (V08-XCONF-9).
7. **V07** — V08 §2.6b (3) carries the toll-bridge rule's village column (E-31), which V07 §3.1 (1), §3.11 DR1 and J-V7.97 cite (V07's cross-part note 5 is met).
8. **V06** — §3.7.7's NEED reads max(threat, the port's readiness weight) and MEANS the wealth level in force, both from V08 (`port-values.readiness`; the `wealth` diff row, W-DOS-02); §3.20.1 sizes the symbolic peak V08 §3.15 (3) marks; the epoch builds of §3.19.6 receive DR34's and DR35's inputs (V08 §2.6b).
9. **V10** — the clerk configuration in the SettlementForge module is C (SettlementForge's assistant; J121/J122), the built-in clerk at M3c where the deployment enables it (V08 §4.4); the explanations read the notes `frozen_fact_changed` and `history_gap` (V08 §4.6).
10. **V09** — its `host.*` catalogue carries V08's new rows (`host.note.frozen_fact_changed`, `host.note.history_gap`, `host.status.overQuota`, the frame words `host.control.*`, `host.dialog.*`, `host.frame.title`) in SettlementForge's locale (J121); the rewritten V09 already follows SettlementForge for the locales.
11. **V12** — V08's fixture levels at V08 §7.3 (X-V12-5) and no register line for the dossier row sets (W94; X-V12-16).
12. **assemble / INDEX** — V08 §11 is decided (Q1, Q2 J121; Q3 – Q5 J122) for INDEX §6; V08 shrinks 84 356 → 77 137 words (−8.6 %, below the band: ≈ 12 700 words of new design for items 111 and 113–118, the edges, the field table, the frozen facts and J121/J122; ≈ 19 900 removed: narration 77 %, restatement 20 %, duplicated mechanisms 0.5 %, verbose prose 1.5 %); doc_checks provisional (C1 0, C2 0, C4 0 unreviewed, S1 0; C3 181 and S2 637 unreviewed, the corpus absent).

## 13 MAPPING TABLE — every inventory id of V08 → where it now lives

165 facts (146 STATE, 12 REFERENCE, 6 BCR pointers, 1 owner questions) and the volume's 25 defined terms; 0 unmapped.
Generated by `docs/validation/coherence/work/rewrite-V08/mapping.py` (also at `work/rewrite-V08/mapping.md`), which checks
every placement's section against the rewritten volume's headings. A bare "V08 §x" means the fact stands at that
section's same place in the new text.

| inventory id | old section | kind | canon role | now lives |
|---|---|---|---|---|
| V08-0001 | header Conventions | rule | home | the head's *How to read this volume* paragraph (citation forms; DR numbers by §7.7; requests as V08 §10's pointer rows; tools, bars and wiring ids) |
| V08-0002 | 0 | summary | home | V08 §0 |
| V08-0003 | 0 | summary | home | V08 §0 |
| V08-0004 | 0 | summary | home | V08 §0 |
| V08-0005 | 0 | summary | home | V08 §0 |
| V08-0006 | 0 | summary | home | V08 §0 (the module's origin, backups and plans read from SettlementForge, J121; small settlements drawn by the village product, J122; XCONF-2, XCONF-3) |
| V08-0007 | 1 | scope | home | V08 §1 |
| V08-0008 | 1 | scope | home | V08 §1 |
| V08-0009 | 1 | interface | reference (determinism §7.7) | V08 §1 *Base hooks consumed* (cited: §7.7 layer 2, items 1–16, DR1–DR25, the key law) |
| V08-0010 | 1 | scope | home | V08 §1 *Out of scope* (Q5 decided under J122; XCONF-4) |
| V08-0011 | 1b | wiring | home | V08 §1b W1 (numbered row; history divider dropped) |
| V08-0012 | 1b | wiring | home | V08 §1b W5, W13, W14 (numbered row; history divider dropped) |
| V08-0013 | 1b | wiring | home | V08 §1b W20 (numbered row; history divider dropped) |
| V08-0014 | 1b | wiring | home | V08 §1b W30 (numbered row; history divider dropped) |
| V08-0015 | 1b | wiring | home | V08 §1b W75 (numbered row; history divider dropped) |
| V08-0016 | 1b | wiring | home | V08 §1b W79 (numbered row; history divider dropped) |
| V08-0017 | 1b | wiring | home | V08 §1b W81 (numbered row; history divider dropped) |
| V08-0018 | 1b | wiring | home | V08 §1b W49 (numbered row; history divider dropped) |
| V08-0019 | 1b | wiring | home | V08 §1b W48 (numbered row; history divider dropped) |
| V08-0020 | 1b | wiring | home | V08 §1b W53 (numbered row; history divider dropped) |
| V08-0021 | 1b | wiring | home | V08 §1b W17 (numbered row; history divider dropped) |
| V08-0022 | 1b | wiring | home | V08 §1b W82 (numbered row; history divider dropped) |
| V08-0023 | 1b | wiring | home | V08 §1b W25 (numbered row; history divider dropped) |
| V08-0024 | 1b dossier trace | trace | home | V08 §1b's dossier-trace paragraph, pointing to V08 §2.4's field table (W22; W-DOS-01b) |
| V08-0025 | 2.1 | rule | home | V08 §2.1 |
| V08-0026 | 2.1 | record | home | V08 §2.1 `MapRecord` (`backups` to `MapHostConfig.backupDepth`, J121; XCONF-2) |
| V08-0027 | 2.1 | record | home | V08 §2.1 |
| V08-0028 | 2.1 | rule | home | V08 §2.1 status semantics (backups by `backupDepth`; XCONF-2) |
| V08-0029 | 2.2 | interface | reference (rendering §11.3) | V08 §2.2 — the vocabulary cited at §11.3 (item 472); the message TYPES stay here, where item 472's applied text homes them |
| V08-0030 | 2.2 | interface | reference (scope §14) | V08 §2.2 — the base messages' extensions cited at §11.3 (items 472, 459); `AudienceWord` the type of §14's table |
| V08-0031 | 2.2 | interface | home | V08 §2.2 host client (`MapHostConfig` gains `backupDepth`, `quotaBytes`, `locale`, J121; `exportScenes`, J122) |
| V08-0032 | 2.2 | interface | home | V08 §2.2 |
| V08-0033 | 2.3 | record | reference (determinism §7.7) | V08 §2.3 — `DossierBinding`'s port fields cited at §7.7 item 12 (item 390); the carried shape, keys, `factHash` and row life kept |
| V08-0034 | 2.3 | record | home | V08 §2.3 `CarriedFact` (gains `wealth`, `site`, `history`, `tradition`, `readiness`) |
| V08-0035 | 2.3 | rule | home | V08 §2.3 |
| V08-0036 | 2.3 | lifecycle | home | V08 §2.3 |
| V08-0037 | 2.4 | record | home | V08 §2.4 `AdapterManifest` (item 508; `keyList` = the field table's read rows) |
| V08-0038 | 2.4 | interface | reference (scope §14) | V08 §2.4 — `E_OTHER_SETTLEMENT`, the note kinds and `PortNote`'s `msg`/`keys` cited at §14 (item 508); each note's identity and class kept |
| V08-0039 | 2.4 | rule | home | V08 §2.4 key sets, now THE ADAPTER'S FIELD TABLE (W-DOS-01b) |
| V08-0040 | 2.4 | rule | home | V08 §2.4 |
| V08-0041 | 2.5 | record | reference (scope §14) | V08 §2.5 — the digest additions typed here; §14 names them and cites these types (item 509) |
| V08-0042 | 2.5 | record | reference (model §2.7) | V08 §2.5 — the `dossierRecord` event cited at §7.1 (item 358); the records at §2.7 |
| V08-0043 | 2.5 | record | reference (pipeline §10.2) | V08 §2.5 `PortValues` (item 389; gains `readiness`, item 114) |
| V08-0044 | 2.6 | rule | home | V08 §2.6 |
| V08-0045 | 2.6 | table | home | V08 §2.6 |
| V08-0046 | 2.6 | table | home | V08 §2.6 |
| V08-0047 | 2.6 | rule | home | V08 §2.6 |
| V08-0048 | 2.6 | table | home | V08 §2.6 |
| V08-0049 | 2.6 | table | home | V08 §2.6 |
| V08-0050 | 2.6 | table | home | V08 §2.6 |
| V08-0051 | 2.6 | table | home | V08 §2.6 |
| V08-0052 | 2.6 | table | home | V08 §2.6 |
| V08-0053 | 2.6 | record | home | V08 §2.6 |
| V08-0054 | 2.6 | table | home | V08 §2.6 `relations` row; the `era` row states the culture-only derivation V11 §3.19.2 cites (XCONF-9) |
| V08-0055 | 2.6 | table | home | V08 §2.6 |
| V08-0056 | 2.6 | table | home | V08 §2.6 |
| V08-0057 | 2.6a | rule | home | V08 §2.6a (item 109 at the port) |
| V08-0058 | 2.6a | table | home | V08 §2.6a |
| V08-0059 | 2.6a | table | home | V08 §2.6a — DR30–DR32 by number, their rows §7.7's (item 398; ID-DR) |
| V08-0060 | 2.6a | table | home | V08 §2.6a |
| V08-0061 | 2.6a | rule | home | V08 §2.6a closures, steps and deaths (DR32) |
| V08-0062 | 2.6b | rule | home | V08 §2.6b (item 110 at the port) |
| V08-0063 | 2.6b | table | home | V08 §2.6b (1) — DR34's inputs (item 398) |
| V08-0064 | 2.6b | table | home | V08 §2.6b (2) — DR35's inputs; the threshold V11 §3.24.2's `elevated.landmarkMinSignificance` (X-V11-15) |
| V08-0065 | 2.6b | rule | home | V08 §2.6b (3) — the toll-bridge rule's one home with its rung column (E-31; item 399) |
| V08-0066 | 2.6b | rule | home | V08 §2.6b (4) (culture's reach; the era row V08 §2.6) |
| V08-0067 | 2.7 | lifecycle | home | V08 §2.7 |
| V08-0068 | 2.7 | lifecycle | home | V08 §2.7 |
| V08-0069 | 2.7 | lifecycle | home | V08 §2.7 |
| V08-0070 | 2.7 | lifecycle | home | V08 §2.7 |
| V08-0071 | 2.8 | rule | home | V08 §2.8 |
| V08-0072 | 2.8 | record | reference (scope §14) | V08 §2.8 — `DossierInstitution.custom` typed here (item 511; §14 cites) |
| V08-0073 | 2.8 | record | reference (model §2.7) | V08 §2.8 — carried-fact additions (item 390); the records at §2.7 (item 256) |
| V08-0074 | 2.8 | rule | reference (determinism §7.7) | V08 §2.8 — the keys, the key law §7.7 item 12's (item 256) |
| V08-0075 | 3.1 | mechanism | home | V08 §3.1 (1)–(2) (`connect-src`: none under C, follows SettlementForge, J121/J122; XCONF-1) |
| V08-0076 | 3.1 | mechanism | home | V08 §3.1 |
| V08-0077 | 3.1 | mechanism | home | V08 §3.1 step 7 (the bridge to the shell; XV-V9-17, -20, -21, -24, -29) |
| V08-0078 | 3.2 | mechanism | home | V08 §3.2 |
| V08-0079 | 3.3 | mechanism | home | V08 §3.3 |
| V08-0080 | 3.4 | mechanism | home | V08 §3.4 |
| V08-0081 | 3.5 | mechanism | home | V08 §3.5 |
| V08-0082 | 3.5 | mechanism | home | V08 §3.5 |
| V08-0083 | 3.5 | mechanism | home | V08 §3.5 |
| V08-0084 | 3.5 | table | home | V08 §3.5 |
| V08-0085 | 3.5 | rule | home | V08 §3.5 |
| V08-0086 | 3.5 | table | home | V08 §3.5 — DR29 by number, its row §7.7's (item 391) |
| V08-0087 | 3.5.1 | rule | reference (base?) | V08 §3.5.1 (1) — the name grammar (the base's T9 extended, item 509) |
| V08-0088 | 3.5.1 | rule | home | V08 §3.5.1 |
| V08-0089 | 3.5.1 | rule | home | V08 §3.5.1 |
| V08-0090 | 3.5.1 | rule | home | V08 §3.5.1 |
| V08-0091 | 3.5.1 | rule | home | V08 §3.5.1 |
| V08-0092 | 3.5.1 | rule | home | V08 §3.5.1 (f) — one sentence: V11 §3.12 agrees with the pinned ladder file; release row R2 checks it (NARR-3) |
| V08-0093 | 3.6 | mechanism | home | V08 §3.6 |
| V08-0094 | 3.6 | mechanism | home | V08 §3.6 |
| V08-0095 | 3.6 | mechanism | home | V08 §3.6 |
| V08-0096 | 3.6 (7) | rule | home | V08 §3.6 (7) |
| V08-0097 | 3.7 | mechanism | home | V08 §3.7 (persistence; the quota's trim order, J121) |
| V08-0098 | 3.7 | mechanism | home | V08 §3.7 (thumbnails; backups to `backupDepth`; the draft mirror on SettlementForge's origin, J121; XCONF-2) |
| V08-0099 | 3.8 | rule | home | V08 §3.8 |
| V08-0100 | 3.8 | rule | home | V08 §3.8 |
| V08-0101 | 3.9 | table | home | V08 §3.9 B1–B9 (B7's copy without 'coming later'; XCONF-3) |
| V08-0102 | 3.9 | table | home | V08 §3.9 B10–B21 (B21 the quota row, J121) |
| V08-0103 | 3.10 | rule | home | V08 §3.10 (J122's order registers the village product before M-SF; XCONF-3) |
| V08-0104 | 3.11 | mechanism | home | V08 §3.11 |
| V08-0105 | 3.11 | mechanism | home | V08 §3.11 |
| V08-0106 | 3.11 | mechanism | home | V08 §3.11 |
| V08-0107 | 3.12 | rule | home | V08 §3.12 |
| V08-0108 | 3.13 | mechanism | home | V08 §3.13 |
| V08-0109 | 3.13 | mechanism | home | V08 §3.13 |
| V08-0110 | 3.14 | mechanism | home | V08 §3.14 |
| V08-0111 | 3.14 | mechanism | home | V08 §3.14 (3), (6) (Q5 decided under J122; XCONF-4) |
| V08-0112 | 4.1 | rule | home | V08 §4.1 |
| V08-0113 | 4.2 | table | home | V08 §4.2 |
| V08-0114 | 4.2 | table | home | V08 §4.2 |
| V08-0115 | 4.3 | rule | home | V08 §4.3 |
| V08-0116 | 4.4 | rule | home | V08 §4.4 (1)–(2) (SettlementForge's assistant through the host seam, configuration C, J121/J122; SCOPE-C07) |
| V08-0117 | 4.4 | rule | home | V08 §4.4 (3)–(6) (the built-in clerk at M3c where the deployment enables it; XCONF-1) |
| V08-0118 | 4.6 | rule | home | V08 §4.6 (catalogue keys with args; SR6-04's frame words keyed) |
| V08-0119 | 4.6 | rule | home | V08 §4.6 |
| V08-0120 | 4.6 | table | home | V08 §4.6 notes table (gains `frozen_fact_changed`, `history_gap`) |
| V08-0121 | 5.1 | table | home | V08 §5.1 (the frame words keyed as `host.control.*`, `host.dialog.*`, `host.frame.title` rows; SR6-04) |
| V08-0122 | 5.1 | rule | home | V08 §5.1 |
| V08-0123 | 5.2 | table | home | V08 §5.2 |
| V08-0124 | 5.2 | table | home | V08 §5.2 |
| V08-0125 | 5.3 | rule | home | V08 §5.3 |
| V08-0126 | 5.4 | rule | home | V08 §5.4 (2) (J122's export-bundle route as opaque blobs; door 1 closed; XCONF-5) |
| V08-0127 | 5.5 | rule | home | V08 §5.5 (the frame's language SettlementForge's, J121; English the catalogue's source language; XCONF-6) |
| V08-0128 | 6 | table | home | V08 §6 (storage row by `backupDepth`, J121) |
| V08-0129 | 6 | table | home | V08 §6 |
| V08-0130 | 7.1 | test | home | V08 §7.1 |
| V08-0131 | 7.1 | test | home | V08 §7.1 |
| V08-0132 | 7.1 | test | home | V08 §7.1 |
| V08-0133 | 7.1 | test | home | V08 §7.1 |
| V08-0134 | 7.1 | test | home | V08 §7.1 |
| V08-0135 | 7.1 | test | home | V08 §7.1 |
| V08-0136 | 7.1 | test | home | V08 §7.1 |
| V08-0137 | 7.1 | test | home | V08 §7.1 |
| V08-0138 | 7.1 | test | home | V08 §7.1 |
| V08-0139 | 7.1 | test | home | V08 §7.1 |
| V08-0140 | 7.2 | test | home | V08 §7.2 |
| V08-0141 | 8.1 | plan | home | V08 §8.1 (Q4 decided under J122; the combined order cited at §16; XCONF-7) |
| V08-0142 | 8.2 | plan | home | V08 §8.2 (total 18–24.5 pw with items 111, 113–118, the edges and J121/J122 priced; no estimate history, NARR-4) |
| V08-0143 | 8.3 | plan | home | V08 §8.3 |
| V08-0144 | 8.4 | plan | home | V08 §8.4 (risk 5 reads `backupDepth`, J121) |
| V08-0145 | 9 | decision | home | V08 §9 J-V8.1 – J-V8.10 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0146 | 9 | decision | home | V08 §9 J-V8.11 – J-V8.20 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0147 | 9 | decision | home | V08 §9 J-V8.21 – J-V8.30 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0148 | 9 | decision | home | V08 §9 J-V8.31 – J-V8.40 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0149 | 9 | decision | home | V08 §9 J-V8.41 – J-V8.50 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0150 | 9 | decision | home | V08 §9 J-V8.51 – J-V8.60 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0151 | 9 | decision | home | V08 §9 J-V8.61 – J-V8.70 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0152 | 9 | decision | home | V08 §9 J-V8.71 – J-V8.80 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0153 | 9 | decision | home | V08 §9 J-V8.81 – J-V8.90 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0154 | 9 | decision | home | V08 §9 J-V8.91 – J-V8.100 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0155 | 9 | decision | home | V08 §9 J-V8.101 – J-V8.110 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0156 | 9 | decision | home | V08 §9 J-V8.111 – J-V8.115 (final choices, revision history out, E-24 marks; NARR-5) |
| V08-0157 | 10 | bcr | BCR pointer | V08 §10 pointer table (BCR-V8-1 → item 472 → §11.3, and the rows after it) |
| V08-0158 | 10 | bcr | BCR pointer | V08 §10 pointer table (BCR-V8-4 → item 508 → §14) |
| V08-0159 | 10 | bcr | BCR pointer | V08 §10 pointer table (BCR-V8-9 → item 202, withdrawn for the one registration → §1.1, §4.12, PART III) |
| V08-0160 | 10 | bcr | BCR pointer | V08 §10 pointer table (BCR-V8-15 → item 410 → §8.2, §8.3, §11.1, §11.2) |
| V08-0161 | 10 | bcr | BCR pointer | V08 §10 pointer table (BCR-V8-21 → item 394 → §7.7) |
| V08-0162 | 10 | bcr | BCR pointer | V08 §10 pointer table (BCR-V8-28 → item 244 → §2.7) |
| V08-0163 | 11 | question | owner questions | V08 §11 — the five decisions (Q1, Q2 follow SettlementForge, J121; Q3–Q5, J122), each carried into its section (XCONF-8) |
| V08-0164 | 12 | rule | home | V08 §12 — one CONFIRMED list and one PLAUSIBLE list with the bar that settles each (NARR-6; SR6-05 (b)) |
| V08-0165 | Integration notes | note | home | V08 *Integration notes* — IN-V08-1 – IN-V08-4 folded at their homes (DR28–DR35 by number; J-VI.14/J-VI.15; J-VI.9; J-VI.20) |
| term: Map tab | V08-0002 | term | glossary | V08 §0; §3.1 (1) |
| term: MapRecord | V08-0026 | term | glossary | V08 §2.1 |
| term: SnapshotBlock | V08-0027 | term | glossary | V08 §2.1 |
| term: PartyKnowledge | V08-0027 | term | glossary | V08 §2.1 |
| term: PartyPictureSet (party pictures) | V08-0110 | term | glossary | V08 §3.14 (the field in V08 §2.1) |
| term: MapStore, MapHostConfig | V08-0031 | term | glossary | V08 §2.2 |
| term: MapHost, MapSession | V08-0032 | term | glossary | V08 §2.2 |
| term: @plat/bridge-client (host client) | V08-0011 | term | glossary | V08 §2.2; W2 |
| term: port leader | V08-0012 | term | glossary | V08 §3.3 |
| term: refresh queue | V08-0012 | term | glossary | V08 §3.4 |
| term: lease | V08-0019 | term | glossary | V08 §2.1 (`MapRecord.refreshing`), §3.4 |
| term: row sets (tables/dossier/) | V08-0014 | term | glossary | V08 §2.6 |
| term: digest steps | V08-0081 | term | glossary | V08 §3.5 |
| term: diff table | V08-0084 | term | glossary | V08 §3.5 |
| term: AudienceWord | V08-0030 | term | glossary | V08 §2.2 (the left column of §14's audience table) |
| term: host mode | V08-0016 | term | glossary | V08 §5.1; W80 |
| term: custom content (CustomLibraryEntry, CustomChainDigest) | V08-0072 | term | glossary | V08 §2.8 |
| term: CustomChainRecord, CustomServiceRecord | V08-0073 | term | glossary | V08 §2.8 (field rules; the records §2.7, item 256) |
| term: AdapterManifest, AdapterRegistry | V08-0037 | term | glossary | V08 §2.4 |
| term: quarantined (binding state) | V08-0033 | term | glossary | §7.7 item 12 (item 390); V08 §2.3 cites it |
| term: held reason | V08-0023 | term | glossary | V08 §2.1 (`MapRecord.held`), §3.9 |
| term: standing notes | V08-0119 | term | glossary | V08 §4.6 |
| term: players' view (party group, player tab) | V08-0111 | term | glossary | V08 §3.14 |
| term: failure rows B1-B20 | V08-0101 | term | glossary | V08 §3.9 (B1–B21: B21 the quota row, J121) |
| term: SF0-SF7 and VH (build stages) | V08-0142 | term | glossary | V08 §8.2 |
