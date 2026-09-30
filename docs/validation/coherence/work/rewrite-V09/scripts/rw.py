import json,re
W='/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V09/'
rows=json.load(open('/tmp/maps-scratch/coherence/v09-map.json'))
roles={}
for l in open(W+'inv.tsv'):
    f=l.rstrip('\n').split('\t'); roles[f[0]]=f[3]
H=r'''# Coherence rewrite of volume 9 — the application

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V09; covered by the whole-design retrovalidation (J84).

**Output:** `docs/validation/coherence/new/volumes/V09-application.md` (the complete new text; same title line and
section structure, one marker line; new subsections V09 §3.16, V09 §4.21, V09 §4.22 and V09 §7.6). Working files:
`work/rewrite-V09/` (inputs, transform and check scripts, parts, the mapping). Only files under
`docs/validation/coherence/` were written; no row was added to `docs/FABLE-REVIEW-QUEUE.md`.

## 1 Sizes (principle (9)'s shrink goal)

| measure | before | after | change |
|---|---|---|---|
| words (the canon's count, whitespace-split) | 111 610 | 99 233 | −11.1 % |
| words (`wc -w`) | 109 687 | 97 443 | −11.2 % |
| bytes | 690 061 (673.9 KB) | 601 444 (587.3 KB) | −12.8 % |
| the canon's goal band (words) | — | 66 966 – 83 708 | above the band |

**Removed** (≈ 22 900 words). *Narration* ≈ 13 400: the eleven reconciliation and finalization change logs (7 700), the
title block's stacked banners and revision notes (≈ 890), §12's per-round reading logs (3 100), §13's round-by-round
"no deferred item" paragraphs (1 000), the integration notes' prose once each note was folded into its body home (650).
*Requests to pointers* ≈ 8 450: §10.1's 36 request blocks with their quoted current and new base text (6 380) became one
row each naming the applied file f item; §10.2's "Was:" histories (2 060) became one closure cell each. *Restatement*
≈ 1 050: the 62 inventory restatements became citations (the §1b hook cells; §4.3's binding columns, now §7.1's; §5.8's
why-card rules, now V10's and §9.2's; the history defaults, now V06 §2.2's; the latency and first-map numbers, now
§12.5's and §7.8's; V11's `terrace`, aqueduct and deck values; V04's dig and style values; V10's `info.under.*` words).

**Added at build depth** (≈ 10 500 words): V09 §3.16's edge catalogue (3 380: five rules, 44 mechanism rows, 25
combination rows); g item 111's and g item 113's screens (V09 §4.21, V09 §4.22: 1 320); g item 112's second cues, colour
vision and game-master trial (V09 §5.4, V09 §5.12, V09 §7.6: ≈ 800); §4.9's new rows (1 170: V02 §1b's 22 bend ids, the
oasis, history, replay and lost-void rows, `why.driver.<driver>`, `info.appNewer`, `span.open.country`); T-V9-71 –
T-V9-75 and the widened clauses (860); J-V9.126 – J-V9.135 (340); §2.12's new lifecycle rows (390); the new §1b wiring
rows (230); §8's AP11 and AP12 (210).

**Why the net figure is above the band.** Every removable word — narration, the request blocks, the restatements — is
removed (≈ 22 900 words, 20.5 % of the old text). What remains is design the rewrite may not cut, most of it rows rather
than prose: §4.9's catalogue (the words every screen shows, 8 000 words), §9's 135 reasoned decisions (9 350), §7.1's 75
bars (7 900), §1b's wiring and dossier-fact tables (4 300), §4.3's screens and §4.5's twelve tools (5 700). The ≈ 10 500
words the pass had to add (the g items' V09 parts, the edge catalogue principle (11) requires, their bars and decisions)
hold the net at −11 %. No sentence of content was cut to reach a number.

## 2 Conflicts resolved (28, as the canon rules)

| conflict | resolution in the text |
|---|---|
| DIC-06 | ID-TOOL: a tool is written with its word at first use (T8 `fill`), a bar group with its number (T8-1); stated in the head's *How to read* and followed throughout |
| DIC-07 | ID-LAYER: the toolkit layers carry their words (L0 INTENT, L1 GROUND AND BONES, L2 PROGRAMME, L3 FABRIC, L4 FINISH; V09 §4.2, V09 §2.3's `ToolLayer` comment); a bare L0–L4 is a refinement level |
| DXC-04 | V09 §4.3 is "The tool binding's screens", keyed to §7.1's binding rows (event kind, target class or path); the home tool is §7.1's; T-V9-12 walks the pairs |
| SCOPE-C07 | V09 §0 *The assistant*, V09 §2.10's `clerkMode` comment, V09 §4.11 *Which assistant*, V09 §5.12: in the module SettlementForge's assistant drives the map; the built-in clerk only where a deployment's configuration enables it; provider, model tier and key path are inputs (J121/J122); AP8 at M3c |
| SCOPE-C15 | V09 §5.1 *The application's name*: SettlementForge's public name on screen (J121); `.plat` and `@plat/*` keep the base's names; V09 §11 Q3 |
| V01-XCONF-2 | V09 §5.10's tabletop row: retaining walls and raised supports join `line_of_sight` by §11.1's one rule (items 447, 448) |
| V06-AGREE-1 | V09 §4.9: `info.remove.holds` with its `{kind}` slot and the deck-plot variant `info.remove.holds.deckPlot` |
| V08-XCONF-6 | V09 §2.9 *Locales* and V09 §5.12: the frame's language is the host's (V08 §5.5); English is the catalogue's source language |
| V09-ICONF-1 | V09 §2.1 "The five classes of state" |
| V09-ICONF-2 | V09 §4.3 and T-V9-12 keyed on (event kind, target class or path) |
| V09-ICONF-3 | V09 §4.20.5's leftover sentence and "kept for the record" deleted; V09 §4.9 states the bends once; T-V9-13 lists them as bends |
| V09-ICONF-4 | V09 §5.4: one channel per cue (goods: colour and dash; satisfaction below 1: a hollow arrowhead; an impaired chain: half width); V09 §4.15 cites it; it is also g item 112's second cue |
| V09-ICONF-5 | J-V9.40 carries *amended by J-V9.102* and states the four-step ladder |
| V09-XAGREE-1 | V09 §2.6 maps each screen to a cell V11 §4.2 declares; XV-V9-1 and XV-V9-2 closed at V11 §4.2 (cross-part note 3) |
| V09-XAGREE-2 | V09 §4.17.5 (e) words V03 §3.7.4's crypt-edit dry runs (`bend.crypt.largest` "stops at {share} of the cathedral's", `bend.crypt.cathedral`, `fate.crypt.joinCloses`); XV-V9-5 closed |
| V09-XCONF-1 | V09 §10.1's BCR-V9-3 row carries the corrected `workingLayer` text; V09 §2.4's `WorkingLayer` agrees (cross-part note 1: the model's §2.9 line) |
| V09-XAGREE-3 | V09 §4.9: one row per V02 §1b bend id (22), the unmatched keys and the `giveTiers` event form retired; V09 §4.20.5 and T-V9-59 re-pointed |
| V10-XAGREE-3 | V09 §4.5's T1 row is the size words' one home (the rung table's quantiles, J-V9.56); V10's lexicon cites it |
| V10-XAGREE-4 | V09 §4.17.5 cites V03 §3.7.4's wet-ground rule (the raised-choir crypt, else no crypt and ledger slabs); "floor vaults" gone |
| V09-J121-1 | V09 §0 *The assistant* reads SettlementForge's AI setup as an input |
| V09-J121-2 | V09 §1.3: hosting, accounts, plans, save limits and backups follow SettlementForge (J121); simultaneous editing is not offered (J122) |
| V09-J121-3 | V09 §2.9 *Locales* and V09 §5.12: which locales ship follows SettlementForge (J121); the locale-file mechanism stays |
| V09-J121-4 | V09 §2.10, V09 §4.11, V09 §4.9: the clerk mode and configuration come from SettlementForge's configuration; `clerk.key.missing` only under a configuration enabling the built-in clerk with a user key |
| V09-J122-1 | V09 §7.3 (2): five SettlementForge users per round from its community, thanked by credit and early access, no payments (J122) |
| V09-J121-5 | V09 §11's answers table; V09 §7.3 and V09 §8.1's AP2 read SettlementForge's staging host |
| CANON-C02 | V09 §4.9 `bend.epoch.hood`; V09 §4.22 (1) (the chip absent on a standalone neighbourhood); V09 §3.16 (ak); no deferral wording |
| CANON-C03 | V09 §11 is the table of answers |
| CANON-C04 | V09 §13 holds no open item; its table closes the 26 routed hand-offs |

## 3 Elegance rulings applied (equivalence lists ticked)

**E-04 — one event → tool binding (§7.1).** V09 §4.3 keeps only the screen, gesture and panel columns, keyed to §7.1's
rows; §7.4's tool names are cited by id.
- [x] every `EditEvent` kind (the base's and the volumes') has a row — T-V9-12's walker over the union;
- [x] the history kinds (`undo`, `redo`, `rebase`, `upgrade`, `epoch`, `closeup`) marked with their producer — V09 §4.3's "no tool" rows;
- [x] V09's per-target homes kept — `split`/`merge` at T5 for districts and T9 for ways and plots; `delete` at T10 and at T9 for access points and catacomb galleries; `instance` at T6, T8 and T9;
- [x] T-V9-12 checks completeness over the (event kind, target class or path) pairs.

**E-07 — one dry-run outcome table (§7.1).** V09 §4.9's opening keys every `bend.*` and `refuse.*` row to a row of §7.1's
outcome table.
- [x] each case's offered alternative stays its own row (the button column);
- [x] only a dossier fact and a lock refuse; the other `refuse.*` rows are availability gates (role, staged layer, rung, screen), named as such;
- [x] file f item 582's three bends as rows — `bend.place.noSite`, `bend.place.overBudget`, `bend.vacate`;
- [x] V09's `bend.*` and `refuse.*` keys map one to one onto the table's causes (T-V9-13, T-V9-15).

**E-16 — one name per mechanism (§8.2).** V09 names no post operation and no light role; its chrome's "vignette" is V01's
close-up slider, the §8.2 `vignette` program.
- [x] a program per mark, a post operation once per tile — nothing in V09 restates either;
- [x] the painterly family's spotlight vignette is the `vignette` program — V09 §4.5's T12 row cites V01;
- [x] the two roles' uses kept — V09 draws neither.

**E-17 — one knowledge admission (§9.2).** V09 §2.7's `admitAs` (J-V9.86) and every band-less read cite §9.2's function;
V09 §5.4's thematic rows cite §9.2's filter.
- [x] the band each reader admits at kept — each view at its band, each export at its band, a band-less read at the city band;
- [x] V09's `admitAs` and V10's filtered dry runs cite it.

**E-24 — one mark on a decision row.** V09 §9's rows carry *superseded by X* (J-V9.2, J-V9.25, J-V9.67, J-V9.76,
J-V9.117) or *amended by X* (J-V9.10, J-V9.24, J-V9.31, J-V9.40, J-V9.55) at the row's head.
- [x] no row dropped — J-V9.1 – J-V9.135 all present;
- [x] the governing row keeps the reason.

**E-32 — one row for an unreachable clerk.** V10's `refuse.clerk.offline`; `error.clerkOffline` is gone from V09 §3.14,
V09 §4.9 and T-V9-15.
- [x] same condition, same user outcome (V09 §3.16 (f)).

**E-33 — `ClerkHandle` everywhere.** The alias is gone from V09 §2.10, V09 §4.11, V09 §1b and the bars.
- [x] `createClerk(mount)` returns `ClerkHandle` (V09 §2.10).

## 4 Id rulings, renumberings and terms

- **Citations (S7, V09-BREF-3, V09-TERM-1).** Every volume citation reads `Vnn §x.y`, self-references included; every
  list continuation and range carries its prefix (27 continuations fixed after assembly); a bare `§` is the base's. A
  script resolves every citation against the section sets of the new base, the rewritten volumes 1–8, this volume and
  volumes 10–12 as they stand: 0 unresolved.
- **ID-TOOL, ID-LAYER** as in §2 above. **ID-WX:** other volumes' rows are cited with their volume (V06 W60, V02 X21,
  V08 X15 …); this volume's IN notes are folded (the Integration notes table). **ID-DR:** DR17, DR19, DR24, DR34–DR40 by
  their §7.7 ids. **ID-BCR:** no bare `BCR-n` remains.
- **Renumberings.** New subsections V09 §3.16 (edges), V09 §4.21 (oasis), V09 §4.22 (the history option), V09 §7.6
  (the game-master trial); §3.7's heading reads "New random over a scope" (number unchanged); T-V9-71 – T-V9-75 and
  J-V9.126 – J-V9.135 added after the last ids (no id reused); §10.1 is a pointer table; §13 is empty but for its
  hand-off table; the reconciliation and finalization sections are gone (S9).
- **Terms replaced.** first paint → first map; scoped re-roll → New random over a scope ("Try again" only its label);
  kept removed / removal holds → suppression (T-V9-53 "a suppression holds"; `import.removed` by key); Rebuild from →
  Re-derive (`button.rederiveFrom`); `refuse.raised.*`, `refuse.aqueduct.*`, `refuse.retaining.rim`, `refuse.stack.*` →
  `bend.*`; `LayerSpec.showUnexcavated` → the view key `showUnexcavated`; `ClerkHarness` → `ClerkHandle`;
  `error.clerkOffline` → `refuse.clerk.offline`; floor vaults → no crypt and ledger slabs (V03 §3.7.4); M6 (underground)
  → M6-U; AP7's milestone M6-sky; a raised way's span path `spans/<ordinal>` as §7.1 and §11.2 write it.

## 5 Wiring gaps closed (8)

| gap | closed at |
|---|---|
| W-IF-04 | V09 §4.14's cell inspector reads `dist/evidence.json` (status and lines, V12 §2.6, V12 §2.10); V09 §1b's row; a cell with no entry shows its provenance (V09 §3.16 (ae)) |
| W-EDIT-01 | closed by DXC-04 / E-04 (§7.1's binding; V09 §4.3 its screens) |
| W-FLD-11 | V09 §2.11: `LocalDocRecord.appVersion` read at open — a newer build's record opens read-only with `info.appNewer` (a new §4.9 row) and Download; V09 §2.12's row |
| V05-WGAP-1 | V09 §3.4 *Hit testing and the world point*: a sky hit or tool point un-displaced by elevation × `offsetPerMetre` (V05 §4.2); V09 §1b's row; V09 §4.20.8 |
| V05-WGAP-2a | V09 §4.9's V05 family row (`bend.island.*` incl. `.claimFloor` "keeps room" and `.rimStop`), texts loaded from V05 §4.2 |
| V06-WGAP-1a | V09 §4.9 `bend.epoch.hood`; V06 X30 closed (V09 §13) |
| V09-WGAP-1 | V09 §4.17.3: the lost void's panel line and legend (`info.under.lost`, `legend.under.lost`), its year rule and tier chip, read from V04 §3.5.7 (g)'s `lost` reading; T-V9-73 (c) |
| V09-WGAP-2 | the sixteen integration notes folded at their homes (the Integration notes table): toolkit rows, `HandleSet` kinds, binding screens, panel lines, item 447's names; the two contradictions resolved by J-VI.17's note |

## 6 The g items written at build depth (V09's parts)

- **g item 111 (V09 §4.21; J-V9.126; T-V9-72).** T2's Lake mode **Spring** chip (`toolkit.json` row, the mapper
  `drawWater { kind: 'lake', from: { points: [p], levelCm, spring: true } }`, `badge.oasis`, `hint.oasis`); T1's
  **Oasis** chip on arid site cards (`adjust('oasis', value)`); the delete's fates and effects (a dossier's refuses);
  the oasis panel with V06 §4.2's Spring flow slider; `why.driver.water` and `legend.shade.valued`; the Sky bend
  `bend.oasis.sky`; the history row; V09 §1b, V09 §2.12, V09 §6 and V09 §5.15 rows.
- **g item 112 (V09 §5.4, V09 §5.12, V09 §7.6; J-V9.128, J-V9.129; T-V9-74, T-V9-75).** (a) every thematic view's
  second cue (the second-cue table, §8.2's where the base names the meaning), the settings' **Colour vision** chip
  writing the view key `cvdVariant` (remembered in `AppPrefs`), the checked variants; (b) the game-master trial:
  10–20 SettlementForge game masters, ≥ 2 play sessions each, the `GmTrialRecord` with its release gate (the report
  exists, every finding entered as a calibration entry or a fix-list item, no payment), priced as AP12 at the release gate.
- **g item 113 (V09 §4.22, V09 §4.17.3; J-V9.127, J-V9.133; T-V9-73).** T1's **Its past** chip and its fields → one
  `adjust('history', HistoryHint)` in V08 §2.6c (2)'s shape (a stamped or a symbolic peak, `tierHistory`, `lifecycle`);
  its bends (`bend.invalid`, `bend.history.order`); the replay's cost line (`info.replay.steps`); the report's **What its
  past left** (`report.past.*`); `chip.symbolic`; `history.replay`; the lost voids' reading; village rungs; the clerk and
  skeleton sending the same event; priced as AP11 with M6-E.

## 7 Hand-offs closed here (26)

V06 X6, X21, X30, X39, X44; V08 X12, X15, X16, X17, X18, X20; V10 CVR-V10-4, CVR-V10-7, CVR-V10-15 – CVR-V10-20; V11
X-V11-13, X-V11-14 (e), X-V11-17 (a) and (c); V12 X-V12-6, X-V12-8, X-V12-10, X-V12-18 — each row of V09 §13's table
names where it lives. Folded in this pass beyond the earlier rounds: X-V11-17 (a) (the 45 family glyphs `fam.<family
key>` in V09 §5.1's sprite; V09 §4.16 (3) naming V11 §2.3's cells and V11 §3.5.15), X-V11-14 (e) (registry rows 86–87
named at V09 §2.3 and V09 §2.9), X-V12-18 (each calibrate-later constant names its confirming test: V09 §3.8 T-V9-17 and
T-V9-47, V09 §4.20 T-V9-3, V09 §6.2 T-V9-1, whose pass now carries §6.2's load times), X-V12-10 (V09 §4.20.3's
suppression keyed by reason), V06 X6's forward path ("Open a copy from here", V09 §3.9) and IN-V09-6's ruin monument
(**Standing tiers** → `setAttr` on `monument/count`, V09 §4.17.2, V09 §4.3). The 31 requests V09 made are closed in V09
§10.2 (XV-V9-31 at V11's row 87: cross-part note 2).

## 8 Findings closed (95)

| finding | closed at |
|---|---|
| VOL-V09-V10-RESTATEMENTS-001 … -017 | each fact stated once at the canon's home and cited elsewhere: -001 V09 §4.5's T12 row (New decoration), §1b cites; -002 §2.9 and §6.4 (the load outcomes) cited in V09 §1b and V09 §3.14; -003 V10 §2.6 and V08 §3.1 cited in V09 §2.10; -004, -005 V06 §2.2 (history defaults) cited in V09 §2.11 and V09 §5.12; -006 – -008 §1.2, §7.8, §12.5 cited in V09 §6; -009 V10 §3.9a cited in V09 §4.9 and V09 §4.17; -010 V04 §5.2; -011 V04's `DigRule`; -012, -013 V11 §3.24.1 (V09 §4.20.1); -014 V11's aqueduct rows (V09 §4.20.2); -015 §7.1 and item 465 (V09 §4.20.7); -016 V10 §2.10; -017 V09 §2.6 (`familyWeights`) |
| V09-RESTATE-1 … -6 | as the RESTATEMENTS rows; -4 the §4.17 and §4.20.6 quotations replaced by keys; -6 V09 §4.20's constants table holds only shell constants |
| V09-DUP-1 | the siting ladder at V09 §2.6; V09 §4.7 cites it |
| V09-ICONF-1 … -5, V09-XAGREE-1 … -3, V09-XCONF-1, V09-J121-1 … -5, V09-J122-1 | §2 above |
| V09-EDGE-1 | V09 §4.20.2 (6): a raised stroke across a sky access's hoist ramps down before it (`bend.raised.hoist`, V05 §4.2's row — the case canon names `bend.raised.skyAccess`, one id kept: cross-part note 6); T-V9-52's clause |
| V09-WGAP-1, -2 | §5 above |
| V09-MISSING-1, -2, -3 | §6 above |
| V09-TERM-1 … -4 | §4 above (M6-U in T-V9-33 – T-V9-38 and AP6; M6-sky for AP7; one name per concept) |
| V09-DEFER-1 | V09 §4.20.3 (4)'s deck-plot fallback dropped; the slot cites item 246 |
| V09-DEFER-2 | V09 §4.11 draws each bend line's `actions`, each roster line's `actions` and the turn's `refused` items; the effect lines with **Show**; V09 §2.9's `{a slot}` form; T-V9-15's and T-V9-27's scope; the provenance notes name their tests |
| V09-NARR-1 … -8 | one marker line; the pass history, review-round ids, "(formerly …)", critique ids, withdrawn-row chains, per-round logs and the reconciliation records removed; §12 is one CONFIRMED and one PLAUSIBLE paragraph; §13 is empty but for its hand-off table |
| V09-BREF-1, -2, -3 | DR ids by §7.7 and V04's request by its file f item; V01 §3.5.12 in place of a critique id; §4 above |
| V09-HANDOFF-1, -2 | V09 §10.2: every row closed at its destination section (XV-V9-3 V04 §1b.1; XV-V9-16 (a) V05 §2.6 and V05 §4.1; XV-V9-25 V05 §3.22; XV-V9-31 cross-part note 2), no "Was:" |
| VOL-V09-V10-EQUIVALENCES-001 … -011 | the glossary and id rulings: `ClerkHandle` (E-33), `refuse.clerk.offline` (E-32), New random, suppression, Re-derive, the ladder's one home, the size words' one home, V02's bend ids, M6-U and M6-sky |
| SR6-02 | V09 §4.11: a clerk card's effect lines carry **Show** only |
| SR6-03 | V09 §2.9's `{a slot}` form (V08's templates carry no article) |
| SR6-06 | T-V9-15's and T-V9-27's scope and the drawer's companion (V09 §7.1, V09 §4.11) |
| SCC-115 | the provenance notes name their confirming test (V09 §3.8, V09 §4.20, V09 §6.2; X-V12-18) |
| IN-V09-1 … -16 | the Integration notes table |

## 9 Edges (principle (11))

The 94 UNDEFINED and 67 UNTESTED edges of the edge census and the 25 combinations routed to V09 are defined in V09
§3.16: five rules for every mechanism (degenerate geometry — the kernel's refusal handled by F-EDIT's ladder, never a
whole-map retry; missing or contradictory data; every rung; toggles and presets; save, load, undo, redo, regenerate,
migrate), 44 mechanism rows (a) – (ar) and 25 combination rows (c1) – (c25), each with its outcome and rung; T-V9-71
takes each row as a clause named by its letter, at THORP, TOWN, CITY and the METROPOLIS cap, under the parity presets
and with every layer toggled. The named combinations are their owners' (none is V09's).

## 10 Agreement (principle (10))

The agreement matrix's eight V09 disagreements are closed: BCR-V9-31 with V01 (V01-XCONF-2), SettlementForge with V08,
V10 and scope (SCOPE-C07, SCOPE-C15, V08-XCONF-6, V09-J122-1), `EditEvent` and BCR-V10-20 with V10 and determinism
(DXC-04, V09-ICONF-2), T-V9-15 with V10 (V09-XAGREE-3).

## 11 Cross-part notes (for the Assemble seat and the sibling editors)

1. **model §2.9 (new base, `workingLayer`).** The line still reads "…or an underground depth band"; the canon's
   V09-XCONF-1 ruling (file f item 277 corrected) reads "…or the underground (its band the view key `depthBand`)". V09
   §2.4 and V09 §10.1 carry the corrected text.
2. **V11 §3.1, registry row 87 (XV-V9-31).** `en.json` typed `MsgRow`, every other locale's file `{ key; text }`, the
   loader refusing a locale file carrying `buttons`, `tone` or `codes` (V09 §2.9 *Locales*).
3. **V11 §4.2 (XV-V9-1, XV-V9-2; V09-XAGREE-1).** The union the canon rules: key forms `uid:`, `cat:`, `cls:`, `use:`;
   the kind keys admit `profile`, `familyWeights`, `quarter`, `place`, `split`; `use:` admits `place`, `pin`, `split`,
   `specialisation`; `siting.linkEdits` `{ bindTo?, avoid?, cut? }` with the three meanings. V10 §4.1's encoders write
   only declared cells.
4. **The span path (model §2.7 vs §7.1 and §11.2).** The model's `RaisedWayRecord.spans` comment names a held edit
   `spans/<a>-<b>/use`; §7.1's edit-target table and §11.2's hit-stack `sub` write `spans/<ordinal>`. V09 follows §7.1
   and §11.2; V10's encoders write `spans/<n>/use`. One form is needed across the base, V04 and V10.
5. **V10 (being rewritten beside this lane).** Its encoders send the forms V09 §4.21 and V09 §4.22 name
   (`drawWater { kind: 'lake', from: { points, levelCm, spring: true } }`, `adjust('oasis', value)`,
   `adjust('history', HistoryHint | null)`); `refuse.clerk.offline` is the one offline row (E-32); `ClerkHandle` has no
   alias (E-33); V09 now owns the `why.driver.<driver>` rows the why card's bars read, so a V10 driver wording cites them.
6. **V05 §4.2 / canon (V09-EDGE-1).** The canon's finding suggested a new id `bend.raised.skyAccess`; V05 §4.2 already
   holds the case as `bend.raised.hoist` (loaded by V09 §4.9's V05 family row). V09 uses V05's id: one id, no new row.
7. **V04 §3.5.7 (g).** V09 §4.17.3 is the lost void's consumer (`info.under.lost`, `legend.under.lost`, the year and
   tier rule); V04's wiring row for the `lost` reading may name it.
8. **V12 §2.6.** V09 §7.6's `GmTrialRecord.findings[].enteredAs.calibration` names a `CalibrationEntry` id; V12's
   register accepts entries raised from the trial's report (the release gate reads `allFindingsEntered`).
9. **V08 (X-V11-17 (c), SR6-03).** V09 §2.9's `{a slot}` form chooses "a" or "an"; V08's `host.*` templates carry no
   article of their own.
10. **J121 inputs.** SettlementForge's staging host (V09 §7.3, AP2), its public name (V09 §5.1), its languages (V09
    §2.9) and its assistant and AI configuration (V09 §2.10, V09 §4.11) are read as inputs; nothing in V09 decides them.

## 12 The mapping table (every inventory id of the volume → where it lives now)

'''
n=len(rows)
H+='%d ids mapped, 0 unmapped. *now* is the id\'s home in the new text; a `reference` item stays at its V09 section as a citation of its home, never a second statement.\n\n'%n
H+='| inventory id | kind | section before | role | where it lives now | note |\n|---|---|---|---|---|---|\n'
for iid,kind,sec,now,note in rows:
    note=note.replace('|','\\|')
    H+='| %s | %s | %s | %s | %s | %s |\n'%(iid,kind,sec,roles[iid],now.replace('|','\\|'),note)
open('/home/user/maps-architecture/docs/validation/coherence/rewrite-V09.md','w').write(H)
print(len(H.split()), H.count('\n'))
