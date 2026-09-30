
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
