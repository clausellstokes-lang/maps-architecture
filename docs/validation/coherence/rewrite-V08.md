# Coherence rewrite of volume 8 — the SettlementForge stage

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V08; covered by the whole-design retrovalidation (J84).

**Output:** `docs/validation/coherence/new/volumes/V08-settlementforge.md` (the complete new text; same title line and
section structure, one marker line; new subsections §2.6c and §3.15). Working files: `work/rewrite-V08/` (inputs,
transform script, parts, mapping).

## 1 Sizes (principle (9)'s shrink goal)

| measure | words (wc) |
|---|---|
| before (`docs/volumes/V08-settlementforge.md`) | 82 775 (the canon's count 84 356) |
| after | 69 322 |
| net change | −13 453 (−16.3 %) |
| new design written at build depth (g items 111 and 113, W-DOS-01b's field table, the export bundle route, the edge catalogue §3.15, T-V8-48 – T-V8-55, J-V8.116 – J-V8.128, the new wiring and lifecycle rows, the diff's three new rows, the controls' keys) | ≈ 8 800 |
| carried text after (after − new design) | ≈ 60 500: −27 % against the text before |
| bytes | 545 534 → ≈ 447 000 |

Words removed, by source (≈ 22 250): **narration** ≈ 16 200 — the eight stacked banner lines, the revision note, the
PROGRESS and REVISION ledger (NARR-1, NARR-2), the ten reconciliation-round notes and the finalization note (NARR-8),
§12's per-lane reading records (NARR-6), §13's fix-list history and its closed hand-off table (NARR-7), the history
dividers of §1b (V08-TERM-1), the estimate history of §8.2 (NARR-4), the decision rows' revision histories (NARR-5), the
ladder re-check's disagreement list (NARR-3) and the provenance ids in the body (C8-n, SS-n, SRn-n, seam and round
names); **restatement** ≈ 5 600 — §10's 32 full request texts (a pointer table now), the derivation-row tables DR29,
DR30–DR32, DR33, DR34 and DR35 (§7.7's), the `DossierBinding`, `PortResult`/`PortNote`, `RealmBlock.cell.latDeg` and
extended-message blocks, `CustomChainRecord`/`CustomServiceRecord` and the key-law additions (§2.7, §7.7's), `Assignment.custom`'s
type, §1b's fact-trace paragraphs (replaced by §2.4's field table, the one list), V11's chain-status weights (S2);
**duplicated mechanisms** ≈ 150 — the toll-bridge rule's second shape folded into one rung table (E-31; V07 cites it), the
"host computes nothing" rule stated once (§3.7); **verbose prose** ≈ 300. No rule, case, value, bar, record field,
lifecycle row, test or reasoned decision was dropped.

**Why the net shrink is below the band (25–40 %).** The carried text shrank by ≈ 27 %, inside the band; the net figure
is held above it by ≈ 8 800 words of design this pass had to add at build depth — g item 111's and g item 113's V08
parts (routed, F-MISSING if absent), W-DOS-01b's adapter field table, V08-XCONF-5's export-bundle route, the 61 edges
and 62 combinations of the edge catalogue (principle (11)), and their tests and decisions. What remains is irreducible
content: §9's 128 reasoned decisions (8 700 words), §7's 55 bars (6 400), the dossier row sets' vocabularies (§2.6,
4 300), the wiring table (3 650) and the lifecycle table (2 300).

## 2 Conflicts resolved (12, as the canon rules)

| conflict | resolution in the text |
|---|---|
| SCOPE-C07 | V08 §4.2's Assistant-settings row and §4.4 (6): SettlementForge's assistant is configuration C (J121/J122); the built-in clerk ships at M3c and runs only where `clerk.config` enables it; provider, model tier and key path are inputs from SettlementForge's AI setup (J121) |
| V08-XCONF-1 | V08 §3.1 step 2 and §4.4 (6) read "none under C (SettlementForge's own assistant; follows SettlementForge, J121/J122)" |
| V08-XCONF-2 | `MapHostConfig` gains `moduleOrigin` (SF's), `locale`, `backupDepth`, `quotaBytes` (V08 §2.2); `MapRecord.backups` is `[0..backupDepth)` and `replaceSnapshot` drops beyond it (§2.1, §2.2, §3.7); the draft mirror follows SF's origin (§3.7); §6's storage row, risk 5 and J-V8.5 (marked amended by J121) cite the input; Q1, Q2 marked follows SettlementForge (J121) |
| V08-XCONF-3 | V08 §0, §3.9 B7 and §3.10: small settlements are drawn by the village product, registered before M-SF by J122's order; the held state only in a build without the village package; B7's copy loses "coming later" |
| V08-XCONF-4 | V08 §1, §3.14 (6), §11: "decided under J122: pictures and player views now; a live shared map after M-SF" |
| V08-XCONF-5 | V08 §5.4 (2) states the export-bundle call at build depth (`exportBundle` over `export.request { opts: { bundle: true } }`, `dd2vtt` and `foundry`, opaque blobs, the key lowered only, refused before M-SF); §5.4's structural rule narrowed to "no call returns a structured format as data"; door 1 kept closed (J86); T-V8-48; J-V8.116; J-V8.37 marked amended |
| V08-XCONF-6 | V08 §5.5: the frame's language is SettlementForge's (`MapHostConfig.locale` in the frame's `src`, V08 §3.1 step 1); English is the catalogue's source language, never a product default; J-V8.118; T-V8-53 |
| V08-XCONF-7 | V08 §8.1 and §11: Q4 decided under J122 (M-SF after M-CAL), J122's combined order written into §8.1 |
| V08-XCONF-8 | V08 §11 is the table of the five decisions, each carried into its section |
| V08-XCONF-9 | V08 §2.6's `era` row is the derivation's one home: culture → era, never the tier (V11 §3.19.2 cites it: cross-part note) |
| CANON-C03 | V08 §11 holds no open question |
| CANON-C04 | V08 §13 is empty; SR6-05 (b) left with §12's narration; SR6-04 closed (the frame's words keyed, V08 §3.7, §4.2, §5.1; T-V8-14) |

## 3 Elegance rulings applied (equivalence lists ticked)

**E-17 — one knowledge admission (§9.2).** V08 cites §9.2's one admission function at every reader it has — the chains'
knowledge rule (V08 §5.2; W75), the party render (§3.14 (1)), the history lines (§3.1 step 7 (b)), the host projection
(§5.4 (3)) — and states no admission of its own.
- [x] the band each reader admits at kept: the chains as a band-less reader (as at the city band), the party gazetteer
  band-less, each picture at its export's band, the frame's view at its effective key;
- [x] V09's `admitAs` and V10's filtered dry runs cite it (V08 cites `admitAs`, item 572).

**E-24 — one mark on a superseded or amended decision.** J-V8.5 "amended by J121", J-V8.37 "amended by J-V8.116",
J-V8.88 "amended by J-V8.94"; the "REVISED …" histories of J-V8.2, .9, .21, .22, .26, .27, .34, .39, .43, .70, .106 folded
into each row's final choice.
- [x] no row dropped (J-V8.1 – J-V8.115 all present, J-V8.116 – J-V8.128 added);
- [x] the governing row keeps the reason (J-V8.94, J-V8.116 and J121's decisions carry theirs).

**E-31 — one toll-bridge watercourse rule at V08 §2.6b (3) with a rung column; V07 cites it.**
- [x] geometry by rung: base — the brook crosses the through route of the longest approach inside the frame; village — the
  course between the two frame arcs the through road's entries divide, the topology raised to `through` (table rows 1 and
  3);
- [x] coastal dry site by rung: base — a brook; village — an estuary (row 2);
- [x] failure → `toll_bridge_dry` at every rung on any of: a desert with no `oasis_water` and no river the arid row draws
  (g item 111); relief that cannot carry the brook; a fixed isolated or none access word — the union, each at both rung
  ranges (row 5), plus the TOWN no-raised-way and CITY/METROPOLIS viaduct cells kept (row 6).

## 4 Id rulings and renumberings

| ruling | applied |
|---|---|
| ID-DR | DR-V8.1 … DR-V8.8 → DR29, DR30, DR31, DR32, DR33, DR28, DR34, DR35 everywhere (119 hits); history rows cited as DR36–DR39, the oasis as DR40 |
| ID-WX | §1b's rows numbered W1 – W80 by subject, history dividers dropped (V08-TERM-1); the volume's X1 – X25 and IN-V08-1 – IN-V08-4 ids left the text (their content closed or folded); other volumes' rows cited with their volume (`V02 X17`, `V06 W27`) |
| ID-BCR | every BCR id in the body replaced by its applied item (`item N`); §10 is the BCR-V8-n → item table (32 rows) |
| ID-DUPDEF | one definition per id: J-V8.1 – J-V8.128, T-V8-1 – T-V8-55, W1 – W80 each defined once (checked by script) |
| ID-TOOL | the bare `T9` (research mapping's table) retired: "the `distribution` row" (V08 §1b W40, W49; §3.5.1 (a)) |
| new ids | W1 – W80; T-V8-48 – T-V8-55; J-V8.116 – J-V8.128; receipt row F-V8-8; note kind `frozen_fact_changed`; catalogue keys `host.status.quota`, `host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView`, `host.status.retry`, `host.mirror.dropped` |

Retired terms replaced: G-cite (V9 §/V6 § → V09 §/V06 §; "the base's §" → §), G-DR, G-firstmap (none left),
G-lot (none in V08's text after the transform), G-fallbackclass (V08 §3.11: "its class is item 104 (a)'s resolution at
fold"), G-portpath (`ProductDecl` in `StrategyRegistry.products`, item 202).

## 5 Wiring gaps closed (7)

| gap | closed at |
|---|---|
| W-DOS-01a | V08 §2.4's field table is the list §7.7 item 1's closed-digest rule names; `npcLadder` and `traditions` read as on §7.7 item 1's never-read list |
| W-DOS-01b | V08 §2.4 *The adapter's field table* — every SettlementForge path (41 required keys, the optional keys read, the realm block and the week) → digest field → reader, or ignored with its reason; `keyList`, T-V8-20's proxy, §14's lint read it (T-V8-49; W27) |
| W-DOS-02 | the settlement fact carries `wealth`; V08 §3.5's diff row `wealth` → `prosperity` (F9), response `epoch` → `EpochInputs.wealthLevel` (W35; T-V8-50; J-V8.119) |
| W-DOS-07 | a notable's `importance` orders the host projection's `people` rows (V08 §5.4 (3); W62; T-V8-50; J-V8.121) |
| W-DOS-08 | carried `site` and `history` singletons; the diff's `site` and `history` rows (F-V8-8, response `none`) write one `frozen_fact_changed` event note pointing to "Make a new map from the record"; DR1's bar stated as a creation bar (V08 §3.5, §3.6 (1), §4.6; W36; T-V8-50; J-V8.120) |
| W-DOS-09 | closed by g item 113's §7.7 rows (DR36 – DR39); V08 §2.6c supplies their inputs (W57) |
| W-HOOK-02 | V08 §1b W58 names the staged records this volume builds (ConditionOverlay, DepositSite, PowerRelation, HistoryHint, the dossier-backed Person, CustomChainRecord, CustomServiceRecord) |

## 6 The g items written at build depth

- **Item 111 (V08's part):** V08 §2.6's `site` row reads a desert with or without `oasis_water` and a desert with a river,
  lake or coast (the dossier's water words at chance 1, the arid row's chances where it says nothing, the oasis beside
  them); the `deposits` row's `oasis_water` → DR40's oasis; the toll-bridge rule's dry desert (V08 §2.6b (3), E-31's
  failure condition); W41; T-V8-51; J-V8.123; §0's plain words.
- **Item 113 (V08's part):** new V08 §2.6c — what the line gives (`AGE_BY_TIER`, the founding, the 29 event templates
  with years ago and severity, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle's terminal death and
  resettlement, opt-in ancient ruins, `peakTier` and its documented gap); the digest's history additions; `HistoryHint`'s
  additions (the replay's inputs); one clock of years ago; the lifecycle and the ancient fall; the effective peak's
  evidence order; creation-only reading and the frozen rewrite; edges; the `tiers` row's `band` column; the shape check's
  `history.age`; lifecycle row; W57; T-V8-52; J-V8.124 – J-V8.126.

## 7 Hand-offs closed here (20)

| hand-off | closed |
|---|---|
| V02:X9 | V08 §2.6 `materials` names V11's material rows only (the `materialFamily` reaches the material row, DR15) — met |
| V06:X5 | V08 §3.6 (3): calamities as `{ week, kind: 'calamity', calamity: CalamityRef }` with severity, targets and `deaths`; chains, ladder receipts, burial and walls records carried (V08 §2.5, §2.6a); the owner's "Update the map engine" is `HostContext`'s upgrade request (V08 §3.8) — met |
| V06:X23 | the water records and high-ground landmarks reach the epochs through DR34/DR35 read from carried facts at every epoch (V08 §2.6b, §2.7's row) — met |
| V06:X29 | the file-f items it asked for are applied (§7.7's DR28, items 264, 275, 443); V08 cites them — met |
| V06:X44 | V08 §4.6 item 3 reads `EpochReport.raised.suppressedFired` (T-V8-45) — met |
| V06:X47 | V08 §3.5.1 (c), (d), J-V8.113, J-V8.114 — met |
| V09:XV-V9-17, -20, -21, -24, -26, -29 | V08 §3.1 step 7 (a)–(d), §3.14 (5), §4.6, §5.1, §5.2, J-V8.106, J-V8.109 as stated in each row — met (the "Met" provenance left the text) |
| V10:CVR-V10-3 | V08 §3.1 step 2's `connect-src` by configuration; T-V8-27's list; V08 §4.4 (4) — met |
| V10:CVR-V10-14 | V08's part: V08 §4.6 item 3, T-V8-45 — met (V05's and V07's parts are theirs) |
| V11:X-V11-1 | V08 §2.4's catalogue manifest with `ladderPairs`; §2.6's `kinds`, `categorySynonyms`, `keywords` shapes; `customKinds` without `fallbackClass` (V08 §3.11); goodWords by V11 §3.13.5 — met |
| V11:X-V11-6 | V08 §2.6's `keywords` shape carries `class` and `specialisation` — met |
| V11:X-V11-15 | V08 §2.6b (2)/DR35 read V11 §3.24.2's `elevated.landmarkMinSignificance`; `customWeights` in V11's row 63 — met |
| V11:X-V11-17 | (c) V08 §4.6's `unmapped_kind` and `custom_resolved` rows read "built like any {class}", so no article precedes the slot and no indefinite form is needed — met |
| V12:X-V12-5 | V08's surveyed-dossier, custom-chain, catacomb and landmark fixtures are test fixtures, none a calibration seed family; the dossier row sets are not calibratable (V08 §2.6's header, J-V8.107) — met |
| V12:X-V12-16 | V08's clause replaced by "V08's dossier row sets are not calibratable" (V11 §3.1 rows 63–66) — agrees with V08 §2.6's header — met |

## 8 Open findings closed (36)

| finding | outcome |
|---|---|
| VOL-V07-V08-RESTATEMENTS-008, -009 | FIXED: the port's message fields are §11.3's; V08 §2.2 keeps the TS types, which §11.3 itself names V08 §2.2's (the base as rewritten makes V08 the type home; one home either way) |
| -010 | FIXED: V08 §2.3 cites §7.7 item 12's `DossierBinding` fields |
| -011 | FIXED: V08 §2.4 cites §14's `PortResult`/`PortNote` (adding only `frozen_fact_changed`) |
| -012 | FIXED: the digest's additions stay typed in V08 §2.5, the home §14 names ("V08 §2.5's fields (typed there)") |
| -013, V08-RESTATE-1 | FIXED: V08 §10 is the pointer table |
| V08-XCONF-1 … -9 | FIXED (section 2 above) |
| V08-ELEG-1 | FIXED by E-31 (V08 §2.6b (3)) |
| V08-TERM-1 | FIXED: W1 – W80, dividers dropped |
| V08-TERM-2 | FIXED: DR28 – DR35 everywhere, aliases dropped |
| V08-DEFER-1 | FIXED: `Intent.latitudeDeg` is §7.7's (cited, V08 §3.5); §16's order is J122's (V08 §8.1); DR numbers ID-DR's |
| V08-DEFER-2 | FIXED: F1 — `raider` never produced, an unknown archetype `unmapped_word` with no key (V08 §2.6 `threats`); F2 — the relay needs no survey (V08 §4.4 (1), risk 6 recast); F3 — the reading and its declared remap (V08 §3.11, J-V8.63); F4 — T-V8-34 measures, no fuzzy matching (J-V8.82); F5 — T-V8-30, T-V8-41 with V08 §6's fallbacks; §13 (a) deleted |
| V08-DEFER-3 | FIXED: SR6-05 (b) left with §12's narration; SR6-04 closed (V08 §3.7, §4.2, §5.1 keys; T-V8-14) |
| V08-NARR-1 … -8 | FIXED (section 1 above) |
| SR6-05 (b), SR6-04 | FIXED (as DEFER-3) |
| V08:IN-V08-1 … -4 | FIXED: folded (mapping row V08-0165) |

## 9 Edges (principle (11))

The 41 UNDEFINED and 20 UNTESTED mechanism edges routed here are defined in V08 §3.15.1 (five general rules: degenerate
geometry, data, rungs, toggles, lifecycle) and §3.15.2 rows (a)–(v) — every mechanism the catalogue names (§2.1, §2.2,
§2.3, §2.5, §2.8, §3.1, §3.2, §3.4, §3.5, §3.5.1, §3.6, §3.7, §3.8, §3.9, §3.10, §3.12, §3.13, §3.14, §4.1, §4.2, §4.3,
§4.4, §4.5, §4.6, §5.1, §5.2, §5.3, §5.4, §5.5) — with outcome, failure rung and test (T-V8-54). The 62 UNDEFINED
combinations owned here and the named combination "a dossier removing what an edit pinned" are §3.15.3 rows (w1)–(z),
tested by T-V8-55. No edge ends in a crash, hang, lost data, silent wrong result or whole-map retry.

## 10 Agreement (principle (10))

The four disagreements on the subject `SettlementForge` (with V09: SCOPE-C07, V08-XCONF-6; with V10: SCOPE-C07; with
rendering: V08-XCONF-5; with scope: SCOPE-C07) are fixed at V08's side as ruled; the other sides are the cross-part
notes below. Cohesion: §8 agrees with J122's order (INDEX §4's, §16's); §11 marks every question answered; §1b names
every piece's producer and consumer; one marker line, no ledgers.

## 11 Cross-part notes (for the Assemble seat and the sibling editors)

1. **scope §14 `PortNote`** — the kind union gains `frozen_fact_changed` (class `event`, words at V08 §4.6), written by
   V08 §3.5's `site` and `history` rows (W-DOS-08).
2. **determinism §7.7 item 13** — the port's receipt rows read "F-V8-1 … F-V8-8": F-V8-8 is the `site` and `history`
   singletons (arrival; response `none`; the frozen note), defined at V08 §3.6 (1). The prosperity word's change is F9
   with element `settlement`, op `prosperity` (the op the base's union already holds).
3. **determinism §7.7 DR1** — its failure clause should read as E-31's union: "on a `desert` site with no `oasis_water`
   and no river the arid row draws or the dossier gives, where S1's relief cannot carry the brook, or with a fixed
   `isolated` or `none` access word, no brook, the build report noting `toll_bridge_dry` (V08 §2.6b (3); item 399)"
   (today: "on `desert` without an oasis, or where S1's relief cannot carry it").
4. **model §2.7 `HistoryHint`** — its comment should cite V08 §2.6c for the replay's inputs it carries under item 113
   (`events`, `peakTier`, `peakPopulation`, `tierHistory`, `populationHistory`, `calamityHistory`, `lifecycle`,
   `ancientFallYearsAgo`, `peakEvidence`), declared there.
5. **scope §14 `DossierDigest.history`** — its comment should cite V08 §2.6c's additions (`events[].template`,
   `.ancientRuin`, `peakTier`, `tierHistory`, `populationHistory`, `lifecycle`), as it cites V08 §2.5's.
6. **rendering §11.3** — the sentence "in host mode the module answers an `export.request` for any format other than
   `png`, `svg` and `print` with `E_HOST_FORMAT` (V08 §5.4)" should add "save, from M-SF, the export bundle's `dd2vtt` and
   `foundry` requests with `opts: { bundle: true }` (V08 §5.4 (2))" so §11.3 and §11.4's bundle paragraph agree.
7. **scope §16 and INDEX §3/§4** — M-SF's price is now 17.75–23.5 pw (V08 §8.2: +0.25 SF3 field table, +0.75 SF4 g items
   and diff rows, +0.25 SF5 SettlementForge's inputs, +0.25 SF6 export bundle, +0.5 SF7 edges); VH sits inside M-SF.
8. **V06** — (a) W27 reads V08 §3.5's `wealth` row as a `prosperity` change (F9), not `attr`; (b) V06 §3.20.1 (2): the
   effective peak's tier is the highest tier V08 §2.6c (5)'s evidence list shows, its entries the record's evidence; the
   symbolic size reads the band of V08 §2.6's `tiers` row; (c) a stamped `peakTier` with no high-water population in its
   band (`peakPopulation` absent) needs V06's sizing rule stated (the band at V11's quantile, marked `symbolic`, is the
   consistent reading); (d) the ancient fall arrives as `HistoryHint.ancientFallYearsAgo`, not as an event.
9. **V10** — the host-mode `people` answers and the party gazetteer are ordered by the carried `importance` (V08 §5.4 (3));
   V10's people answer in host mode follows the projection.
10. **V11** — (a) §3.19.2 cites V08 §2.6's `era` row without naming the tier (V08-XCONF-9); (b) row 63's `dossier.tiers`
    gains the `band` column (SettlementForge's population band per tier word; not calibratable); (c) the `history.*`
    event-to-epoch rows key on SettlementForge's `templateType` (V08 §2.6c).
11. **V09** — (a) the `button.*` family gains `button.showEverything` "Show everything" (the strip's button, V08 §5.1;
    SR6-04 (a)); (b) V9 §4.9's `host.*` sentence loads V08's new keys (`host.control.*`, `host.dialog.*`, `host.undo.*`,
    `host.playersView`, `host.status.retry`, `host.status.quota`, `host.mirror.dropped`); (c) the frame reads its locale
    from the `lang` of its `src` (V08 §3.1 step 1), a locale file per V9 §2.9's *Locales*.
12. **V07** — §3.1 (1) cites V08 §2.6b (3)'s rung table (E-31) as it already does; its failure list now includes relief
    that cannot carry the brook at village rungs (the union).
13. **V12** — no register entry: the dossier row sets (the new `band` column included) are not calibratable; T-V8-48 –
    T-V8-55 register no calibration line.

## 12 The mapping table (every inventory id of the volume → where it lives now)

165 ids mapped, 0 unmapped. "(kept)" means the fact stays at its home section, narration and restatement around it cut.

| inventory id | section before | role | where it lives now |
|---|---|---|---|
| V08-0001 | header Conventions | home | V08 head, *How to read this volume* (citation conventions; the base now "with files f and g applied") |
| V08-0002 | 0 | home | V08 §0 (kept) |
| V08-0003 | 0 | home | V08 §0 (kept) |
| V08-0004 | 0 | home | V08 §0 (kept) |
| V08-0005 | 0 | home | V08 §0 (kept) |
| V08-0006 | 0 | home | V08 §0 *Where it lives* (origin, backups follow SettlementForge, J121; V08-XCONF-2) and *When something goes wrong* (village product, V08-XCONF-3) |
| V08-0007 | 1 | home | V08 §1 (kept) |
| V08-0008 | 1 | home | V08 §1 (kept) |
| V08-0009 | 1 | reference | cited: V08 §1 *Base hooks consumed* (a citation list; DR1–DR40, F-V8 rows, §7.7) |
| V08-0010 | 1 | home | V08 §1 *Out of scope* (Q5 decided under J122, V08-XCONF-4; J121 inputs; J-Fsf-1 seam) |
| V08-0011 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0012 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0013 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0014 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0015 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0016 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0017 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0018 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0019 | 1b | home | V08 §1b (numbered W-row, same content) |
| V08-0020 | 1b | home | V08 §1b W52 (DR34; numbered, ID-DR) |
| V08-0021 | 1b | home | V08 §1b W13 (history divider dropped, V08-TERM-1) |
| V08-0022 | 1b | home | V08 §1b W71 (divider dropped) |
| V08-0023 | 1b | home | V08 §1b W29 (divider dropped) |
| V08-0024 | 1b dossier trace | home | V08 §1b and V08 §2.4 field table (the fact-trace paragraphs replaced by the field table, W-DOS-01b) |
| V08-0025 | 2.1 | home | V08 §2.4 field table (W-DOS-01b) |
| V08-0026 | 2.1 | home | V08 §2.4 field table; V08 §2.6b (W-DOS-01b) |
| V08-0027 | 2.1 | home | V08 §2.4 field table (derived land use: V08 §2.6 `deposits`) |
| V08-0028 | 2.1 | home | V08 §2.1 MapRecord (backups[0..n), n = MapHostConfig.backupDepth, V08-XCONF-2) |
| V08-0029 | 2.2 | reference | cited: §11.3 *Vocabulary* lists the port messages; V08 §2.2 keeps their TS types (§11.3 names them V08 §2.2's) |
| V08-0030 | 2.2 | reference | cited: §11.3 (one comment line in V08 §2.2) |
| V08-0031 | 2.2 | home | V08 §2.2 (kept) |
| V08-0032 | 2.2 | home | V08 §2.2 (kept) |
| V08-0033 | 2.3 | reference | cited: §7.7 item 12 `DossierBinding` (adapter, quarantined, notes, absorbed); V08 §2.3 names their readers |
| V08-0034 | 2.3 | home | V08 §2.3 (kept) |
| V08-0035 | 2.3 | home | V08 §2.3 (kept) |
| V08-0036 | 2.3 | home | V08 §2.3 (kept) |
| V08-0037 | 2.4 | home | V08 §2.4 (kept) |
| V08-0038 | 2.4 | reference | cited: §14 `PortResult`, `PortNote` (item 508); V08 §2.4 keeps the note identity rule and adds `frozen_fact_changed` |
| V08-0039 | 2.4 | home | V08 §2.4 (kept) |
| V08-0040 | 2.4 | home | V08 §2.4 (kept) |
| V08-0041 | 2.5 | reference | V08 §2.5 (the typed home §14 names: "V08 §2.5's fields (typed there)"; item 509) |
| V08-0042 | 2.5 | reference | V08 §2.5 (the event's rules; §7.1 declares the union member and cites V08 §2.5) |
| V08-0043 | 2.5 | reference | V08 §2.5 (`PortValues`, whose home §7.7 names V08 §2.5) |
| V08-0044 | 2.6 | home | V08 §2.6 (kept) |
| V08-0045 | 2.6 | home | V08 §2.6 (kept) |
| V08-0046 | 2.6 | home | V08 §2.6 (kept) |
| V08-0047 | 2.6 | home | V08 §2.6 `deposits` (provenance id dropped) |
| V08-0048 | 2.6 | home | V08 §2.6 (kept) |
| V08-0049 | 2.6 | home | V08 §2.6 (kept) |
| V08-0050 | 2.6 | home | V08 §2.6 (kept) |
| V08-0051 | 2.6 | home | V08 §2.6 (kept) |
| V08-0052 | 2.6 | home | V08 §2.6 (kept) |
| V08-0053 | 2.6 | home | V08 §2.6 `kinds` (V11 §3.11 cited) |
| V08-0054 | 2.6 | home | V08 §2.6 `relations` and `era` (era's one home, V08-XCONF-9) |
| V08-0055 | 2.6 | home | V08 §2.6 (kept) |
| V08-0056 | 2.6 | home | V08 §2.6 (kept) |
| V08-0057 | 2.6a | home | V08 §2.6a intro |
| V08-0058 | 2.6a | home | V08 §2.6a (kept) |
| V08-0059 | 2.6a | home | cited: §7.7 DR30–DR32 (V08 §2.6a (2) is a pointer; ID-DR) |
| V08-0060 | 2.6a | home | V08 §2.6a (kept) |
| V08-0061 | 2.6a | home | V08 §2.6a (kept) |
| V08-0062 | 2.6b | home | V08 §2.6b (kept) |
| V08-0063 | 2.6b | home | cited: §7.7 DR34; V08 §2.6b (1) (a)–(i) keep the port's reading (IN-V08-3 folded into (c)) |
| V08-0064 | 2.6b | home | cited: §7.7 DR35; V08 §2.6b (2) |
| V08-0065 | 2.6b | home | V08 §2.6b (3): one toll-bridge rule with a rung table (E-31), item 111's dry desert |
| V08-0066 | 2.6b | home | V08 §2.6b (4) |
| V08-0067 | 2.7 | home | V08 §2.7 (kept) |
| V08-0068 | 2.7 | home | V08 §2.7 (kept) |
| V08-0069 | 2.7 | home | V08 §2.7 (kept) |
| V08-0070 | 2.7 | home | V08 §2.7 (kept) |
| V08-0071 | 2.8 | home | V08 §2.8 (kept) |
| V08-0072 | 2.8 | reference | V08 §2.8 `CustomRecordRef` (§14's `custom?: CustomRecordRef /* V08 §2.8 */`) |
| V08-0073 | 2.8 | reference | V08 §2.8 carried-fact additions (the union's home §7.7 names V08 §2.3/§2.8) |
| V08-0074 | 2.8 | reference | cited: §7.7 item 12's key law (chain:, res:uid:, svc:uid:, def:); V08 §2.8 *Keys* keeps J-V8.42's identity rule |
| V08-0075 | 3.1 | home | V08 §3.1 (kept) |
| V08-0076 | 3.1 | home | V08 §3.1 (kept) |
| V08-0077 | 3.1 | home | V08 §3.1 (kept) |
| V08-0078 | 3.2 | home | V08 §3.2 (kept) |
| V08-0079 | 3.3 | home | V08 §3.3 (kept) |
| V08-0080 | 3.4 | home | V08 §3.4 (kept) |
| V08-0081 | 3.5 | home | V08 §3.5 (kept) |
| V08-0082 | 3.5 | home | V08 §3.5 (kept) |
| V08-0083 | 3.5 | home | V08 §3.5 (kept) |
| V08-0084 | 3.5 | home | V08 §3.5 (kept) |
| V08-0085 | 3.5 | home | cited: §7.7 DR33; V08 §3.5 *The chains' links* |
| V08-0086 | 3.5 | home | cited: §7.7 DR29; V08 §3.5 *The latitude row* |
| V08-0087 | 3.5.1 | reference | V08 §3.5.1 (a) (the `distribution` row's input; bare T9 retired, ID-TOOL) |
| V08-0088 | 3.5.1 | home | V08 §3.5.1 (kept) |
| V08-0089 | 3.5.1 | home | V08 §3.5.1 (kept) |
| V08-0090 | 3.5.1 | home | V08 §3.5.1 (kept) |
| V08-0091 | 3.5.1 | home | V08 §3.5.1 (kept) |
| V08-0092 | 3.5.1 | home | V08 §3.5.1 (kept) |
| V08-0093 | 3.6 | home | V08 §3.6 (kept) |
| V08-0094 | 3.6 | home | V08 §3.6 (kept) |
| V08-0095 | 3.6 | home | V08 §3.6 (kept) |
| V08-0096 | 3.6 (7) | home | V08 §3.6 (7) (kept) |
| V08-0097 | 3.7 | home | V08 §3.7 (kept) |
| V08-0098 | 3.7 | home | V08 §3.7 (backups by backupDepth, mirror follows SettlementForge's origin, sizes against quotaBytes; V08-XCONF-2) |
| V08-0099 | 3.8 | home | V08 §3.8 (kept) |
| V08-0100 | 3.8 | home | V08 §3.8 (kept) |
| V08-0101 | 3.9 | home | V08 §3.9 (kept) |
| V08-0102 | 3.9 | home | V08 §3.9 (kept) |
| V08-0103 | 3.10 | home | V08 §3.10 (kept) |
| V08-0104 | 3.11 | home | V08 §3.11 (kept) |
| V08-0105 | 3.11 | home | V08 §3.11 (kept) |
| V08-0106 | 3.11 | home | V08 §3.11 (kept) |
| V08-0107 | 3.12 | home | V08 §3.12 (kept) |
| V08-0108 | 3.13 | home | V08 §3.13 (kept) |
| V08-0109 | 3.13 | home | V08 §3.13 (kept) |
| V08-0110 | 3.14 | home | V08 §3.14 (kept) |
| V08-0111 | 3.14 | home | V08 §3.14 (6) (Q5 decided under J122, V08-XCONF-4) |
| V08-0112 | 4.1 | home | V08 §4.1 (kept) |
| V08-0113 | 4.2 | home | V08 §4.2 (kept) |
| V08-0114 | 4.2 | home | V08 §4.2 (kept) |
| V08-0115 | 4.3 | home | V08 §4.3 (kept) |
| V08-0116 | 4.4 | home | V08 §4.4 (kept) |
| V08-0117 | 4.4 | home | V08 §4.4 (kept) |
| V08-0118 | 4.6 | home | V08 §4.6 (kept) |
| V08-0119 | 4.6 | home | V08 §4.6 (kept) |
| V08-0120 | 4.6 | home | V08 §4.6 (kept) |
| V08-0121 | 5.1 | home | V08 §5.1 (kept) |
| V08-0122 | 5.1 | home | V08 §5.1 (kept) |
| V08-0123 | 5.2 | home | V08 §5.2 (kept) |
| V08-0124 | 5.2 | home | V08 §5.2 (kept) |
| V08-0125 | 5.3 | home | V08 §5.3 (kept) |
| V08-0126 | 5.4 | home | V08 §5.4 (2) (the export bundle route, J122 Q3, V08-XCONF-5) |
| V08-0127 | 5.5 | home | V08 §5.5 (the frame's locale is SettlementForge's, V08-XCONF-6) |
| V08-0128 | 6 | home | V08 §6 (kept) |
| V08-0129 | 6 | home | V08 §6 (kept) |
| V08-0130 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0131 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0132 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0133 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0134 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0135 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0136 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0137 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0138 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0139 | 7.1 | home | V08 §7.1 (same bar) |
| V08-0140 | 7.2 | home | V08 §7.2 (kept) |
| V08-0141 | 8.1 | home | V08 §8.1 (J122's combined order; Q4 decided, V08-XCONF-7) |
| V08-0142 | 8.2 | home | V08 §8.2 (kept) |
| V08-0143 | 8.3 | home | V08 §8.3 (kept) |
| V08-0144 | 8.4 | home | V08 §8.4 (kept) |
| V08-0145 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0146 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0147 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0148 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0149 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0150 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0151 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0152 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0153 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0154 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0155 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0156 | 9 | home | V08 §9 (same rows; narration cut, E-24 marks) |
| V08-0157 | 10 | bcr-pointer | V08 §10 pointer row (BCR-V8-1 → item 472) |
| V08-0158 | 10 | bcr-pointer | V08 §10 pointer row (BCR-V8-4 → item 508) |
| V08-0159 | 10 | bcr-pointer | V08 §10 pointer row (BCR-V8-9 → item 202 (withdrawn)) |
| V08-0160 | 10 | bcr-pointer | V08 §10 pointer row (BCR-V8-15 → item 410) |
| V08-0161 | 10 | bcr-pointer | V08 §10 pointer row (BCR-V8-21 → item 394) |
| V08-0162 | 10 | bcr-pointer | V08 §10 pointer row (BCR-V8-28 → item 244) |
| V08-0163 | 11 | answer-J121-J122 | V08 §11 decisions table (J121/J122; V08-XCONF-8, CANON-C03) |
| V08-0164 | 12 | home | V08 §12 (one CONFIRMED list, one PLAUSIBLE table with settling bars; NARR-6) |
| V08-0165 | Integration notes | home | folded into the body (S9): IN-V08-1 → DR28–DR35 everywhere (ID-DR); IN-V08-2 → V08 §4.3 (the slot = §7.1's one suppression mechanism, J-VI.14) and V08 §2.6b (1) (b), (e) (`waterUse`, `aqueduct_no_source`, `toll_bridge_dry` in §5.4); IN-V08-3 → V08 §2.6b (1) (c); IN-V08-4 → V08 §3.11 *Custom kinds* (no `fallbackClass`; G-fallbackclass) |
