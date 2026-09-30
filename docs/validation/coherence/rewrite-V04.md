# Rewrite — design volume V04 (the underground)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V04; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V04`, 2026-09-29 → 2026-09-30): P1–P12 done. Inputs gathered; head, §0–§13, §1b, §3.13
and the Integration notes written as parts (`docs/validation/coherence/work/rewrite-V04/parts/00`–`14`); assembled to
`docs/validation/coherence/new/volumes/V04-underground.md`; checks run; this report, the result file and LANDED.

## 1 Sizes

| | words |
|---|---|
| before (`docs/volumes/V04-underground.md`, 4 168 lines) | 83 966 |
| after (`new/volumes/V04-underground.md`, 3 335 lines) | 72 422 |
| change | −11 544 (−13.7 %) |
| the goal band (25–40 %) | 50 380 – 62 974 |

**Sources of the words removed** (≈ 18 050 removed, ≈ 6 500 added): NARRATION ≈ 11 800 (the eleven stacked banners, the
PROGRESS/REVISION/RECONCILIATION ledgers, the six reconciliation-round and finalization sections, the Fix list's round
paragraphs, the CONFIRMED receipts, provenance tags C4-/SL-/ST-/TR-/TT-/SLR/SCC/SR in bars and decisions, "amended by the
revision", round labels on J-V4.117–121) — 65 %; RESTATEMENT ≈ 3 300 (the 40 REFERENCE items and 14 restatement findings:
V11-owned values of the ruin, openings, dig and catacomb rows, the ossuary law, `accessReachM`, the capacity law and depth,
the persistence rate, the ambient, the dense-core share, the span constants, the base total, the opening-pass commit list
stated once in V04 §3.10, the 46 BCR blocks now a pointer table to file f) — 18 %; DUPLICATED MECHANISMS ≈ 700 (E-03's
fixed-key draw stated once in §6.1 and one V04 §3.12 table; the superseded pricing decisions folded into J-V4.114) — 4 %;
VERBOSE PROSE ≈ 2 250 — 13 %. **Words added, all new design at build depth:** V04 §3.13 edges and combinations (2 550),
T-V4-76 – T-V4-81 (920), g item 113's buried former settlement (V04 §3.5.5 (b), 750) and the lost reading (V04 §3.5.7
(g), 600), the providers (V04 §4.5, 490), J-V4.122 – J-V4.126 (590), grade faces (V04 §3.5.4 (f), 160), the L5 release,
J-VI.4's bends and the smaller edge sentences (≈ 440).

**Why the unit sits below the band (not a defect).** Net of the ≈ 6 500 words of new design the canon routed here (g item
113 and principle (11)'s edge catalogue: 52 undefined and 62 untested edges, 62 owned combinations), the original content
shrank by 21.5 %. What holds the rest is irreducible build-depth content: 10 engines' step-by-step algorithms with every
constant; 11 rule tables with their defaults; the 50-row hook table and the 1b wiring tables (principle (7) requires them);
the 30-row lifecycle table; 81 test bars; 126 vetoable decisions with their reasons; the build plan's register tables.
No rule, case, value, bar, record field, lifecycle row, test, owner rule or reasoned decision was dropped to meet the goal.
The unit shrank by less than half, so no nuance audit is triggered.

## 2 What was applied

**Conflicts resolved (12, each as the canon rules):**

| id | ruling applied | where |
|---|---|---|
| MC-11 | `Outfall` declared in the base (§2.3); V04 cites it | V04 §2.1, §1b.1 |
| V04-ICONF-1 | `AccessPoint.state`'s lifecycle is §7.4's row as item 555 amends it; V04's own row dropped | V04 §2.6 closing paragraph |
| V04-ICONF-2 | one pricing decision J-V4.114 (28.25–39.25 pw, U5 3–4.25); J-V4.71, J-V4.94, J-V4.104 marked "superseded by J-V4.114", stale figures dropped | V04 §9, §8 |
| V04-ICONF-3 | VTT portals only at openings in a wall line; every vertical access a shaft light plus a `plat` object; T-V4-28 and BCR-V4-16 reworded; J-V4.35 aligned | V04 §5.5, §7 T-V4-28, §10, §9 |
| V04-ICONF-4 | BCR-V4-18's "a catacomb reading its source church's name" dropped | V04 §5.4, §10 |
| V04-ICONF-5 | heights from V11's stepped-shrine row; ST0 retry with `clearM` halved, then skip with `W_RUIN_MONUMENT_SKIPPED`; `TierFailure` and ceiling cut counted in `lay.truncated`; `standing` the decay's only; IN-V04-2 dropped | V04 §3.5.0a (5a) *Failure and truncation, stated once* |
| V04-XCONF-1 | `showUnexcavated` a view key, removed from `setLayer`'s targets | V04 §1b.3 |
| V04-XCONF-2 | PageUp/PageDown precedence stated once in §14's keymap (storey switcher when a plan is open, else the band); V04 cites it | V04 §5.1, §10 BCR-V4-10 |
| V04-XCONF-3 | T-V4-50 gains the elaboration-independence clause; V03's hand-off closed | V04 §7 T-V4-50, §3.5.7 (c) |
| V07-XCONF-2 | the span rule's `country` reason (the base home, item 244) read; T-V4-62 gains the clause | V04 §3.5.4 (d), §7 T-V4-62, §10 BCR-V4-45 |
| CANON-C03 | §11 a table of decisions (J122) | V04 §11 |
| CANON-C04 | the Fix list holds no open item | V04 §13 |

**Elegance rulings applied (4 routed), equivalence lists ticked:**
* **E-03 (UNIFY, the fixed-key draw).** Stated once in the base's §6.1 (determinism's text, checked on disk); V04 §3.12
  keeps its exception list as one table and each site cites the pattern. ✓ catacomb source re-compared against CITY's chance
  when the rung rises (V04 §3.5.1 (3), §3.12 table); ✓ overlap shaft with its own key and chance row (§3.5.7 (a), table);
  ✓ crypt join's own/other split kept (§3.5.7 (c), table); ✓ dig: a made access persists, "appears when the chance later
  rises" kept (§3.5.7 (d), table); ✓ public opening's candidate order kept (§3.5.7 (e), table); ✓ §3.12's exception list
  kept verbatim as the pattern's exceptions (the five rows).
* **E-16 (UNIFY, `wash`/`edgeFade`/`glow`).** No occurrence of `tint`, `vignette` or the role `lights` in V04; nothing to
  rename (✓ the three equivalence items are rendering's).
* **E-24 (UNIFY, one supersede/amend mark).** ✓ no row dropped (J-V4.71, .94, .104 "superseded by J-V4.114"; J-V4.62
  "amended by J-V4.122"; J-V4.89 "amended by J-VI.4"); ✓ the governing row J-V4.114 keeps the reason.
* **E-39 (KEEP APART).** The access-state set (`unexcavated`, `accessible`, `lost`) is V04's own and stays apart from the way
  ladder, the stretch condition and the building lifecycle (V04 §2.2's comment), the LOST state joining it as ruled.

**Renumberings.** ID-BCR: V04's BCR-n → BCR-V4-n (the number kept; V04 §10). ID-WX: V04's row ids (W15, IN-V04-n …) not
cited bare outside V04; IN-V04-n folded into the body, listed in the Integration notes table only. ID-DR: DR-V8.2 → DR30,
DR-V8.3 → DR31, DR-V8.4 → DR32, DR-V8.7 → DR34; the history rows DR36–DR39 as the determinism editor numbered them.
ID-DUPDEF: one definition per id (81 tests T-V4-1 – T-V4-81, 126 decisions J-V4.1 – J-V4.126, each defined once; checked
by script). New ids: T-V4-76 – T-V4-81, J-V4.122 – J-V4.126 (none used elsewhere in the set, checked).

**Retired terms replaced.** G-firstmap (13 × "first paint" → "first map"); G-cite (722 × `V4 §n`, `V1-3.x` … → `Vnn §n`;
bare self-references to V04-only sections prefixed, V04-BREF-1); G-standalone; G-DR; G-unexcavated (`LayerSpec.showUnexcavated`
→ the view key); G-strike ("the underground's own lottery" → "its own strikes after the fabric's strike pool"). Checked: 0
occurrences of each retired form; every `V04 §x` reference resolves to a heading of the new text.

**Wiring gaps closed (6 routed).** W-DOS-10c: V04 §1b.5 rows name DR34 and DR37 for the water system and the age and scars.
W-IF-01: the underground `WhyProvider` and `WhySectionProvider` with implementer `@plat/under`, callers V10 and V09, their
rows and catalogue keys (V04 §1b.2, §4.5; T-V4-79). W-HOOK-02: V04's staged records (`Tunnel`, `UndergroundSystem`,
`Gallery`, `Chamber`, `UndergroundLink`) built here (V04 §1.1, §1.2). V04-WGAP-2: T-V4-76 (c)–(e). V04-WGAP-3:
`W_RUIN_SOURCE_REMOVED` in §1b.1's list and T-V4-73 (a); the base's list is item 338's (the canon's "item 558" is BCR-V4-42's
number — see cross-part note 10). V04-WGAP-4: `Chamber.gradeFaces`, a view exported as `gradeFaces(chamberId)`, its producer,
lifecycle row and T-V4-63 clause (V04 §3.5.4 (f), §2.2, §2.6).

**g item 113 (routed part, written at build depth as an addition).** Buried former-town ruins: `BuriedFormer.lay` (V04
§1b.2, §3.5.5 (b)) with its inputs, rise law, laying rules, keys, failure (`W_BURIED_FORMER_SKIPPED`), access and
afterwards; its identity (§2.5), lifecycle (§2.6), drawing (§5.2), labels (§5.4), exports (§5.5), budget (§6), bars
(T-V4-77 = the base's T113-4), migration (§4.6), decision J-V4.123. Lost access: the access-state set and
`ExcavationRecord` (§2.2), the reading's open-path rule and lost state (§3.5.7 (g)), vacancy and return of dwellings, the
drawing for every admitting key, the edits (§4.2, §4.3), undo (§4.4), providers (§4.5), bars (T-V4-76 = the base's T113-5),
decision J-V4.122. Item 113 (d) (sewers reopen in the replay) cited in V04 §3.10 and T-V4-23.

**Owner rulings.** J121: no V04 question concerns hosting, accounts or the assistant (V04 §11). J122: Q1 yes, Q2 accepted;
the decided order written in V04 §8 and §9 J-V4.46 (V04-DEFER-1, V04-MISSING-2).

**J-VI.4 applied to V04's edits** (an integration decision the volume had not applied; precedence J-VI > a volume): a
depth offset past the cover limit, a public opening with no candidate, a hand crypt join without a crypt, a `setAttr` out of
range or to or from `archVault`, a `drawWay` on the underground, a small or self-touching chamber, a `placeAccess` with no
element, an `addLink` on one part, and a skeleton declaration a stage cannot honour are bent, the dry run naming the bend;
refusals stay only for locks and dossier facts (V04 §4.1, §4.2, §4.7, T-V4-36, J-V4.89).

## 3 Open findings routed to V04 (59), each closed

| finding | severity | closure |
|---|---|---|
| VOL-V03-V04-RESTATEMENTS-005 | — | FIXED: V04 §3.3 P2 cites §4.2 S2 without the value |
| VOL-V03-V04-RESTATEMENTS-006 | — | FIXED: V04 §3.3 P4 cites II.7.3's capacity law and depth; §2.4's comment carries no law |
| VOL-V03-V04-RESTATEMENTS-007 | — | FIXED: V04 §3.10 cites §4.11's persistence row and dwell bands |
| VOL-V03-V04-RESTATEMENTS-008 | — | FIXED: V04 §5.3 cites §8.4's underground ambient; T-V4-25 likewise |
| VOL-V03-V04-RESTATEMENTS-009 | — | FIXED: V04 §3.5.7 (c) cites II.7.3's `accessReachM`; (d) cites §2.6's basement depth |
| VOL-V03-V04-RESTATEMENTS-010 | — | FIXED: V04 §3.5.0 and §6 cite item 244's `span.supportFoundationCm` and `span.vaultCap` without values |
| VOL-V03-V04-RESTATEMENTS-011 | — | FIXED: V04 §3.5.1 (2) cites II.7.6's ossuary law (item 560), keeping only the burial share and the additions |
| VOL-V03-V04-RESTATEMENTS-012 | — | FIXED: V04 §2.3 and §3.5.1 (6) cite V11 §3.23.8 for `growthCapShare` |
| VOL-V03-V04-RESTATEMENTS-013 | — | FIXED: V04 §2.3 keeps the schema and cites V11 §3.23 for its rows; §3.5.0a, §3.5.1, §3.5.7 cite the values |
| VOL-V03-V04-RESTATEMENTS-014 | — | FIXED: V04 §8 and §11 cite §16's totals (item 568); no base total restated |
| V04-RESTATE-1 | minor | FIXED: as RESTATEMENTS-012 |
| V04-RESTATE-2 | minor | FIXED: as RESTATEMENTS-014 |
| V04-RESTATE-3 | minor | FIXED: as RESTATEMENTS-013 |
| V04-DUP-1 | minor | FIXED: the opening-pass commit list stated once in V04 §3.10; §1b.2, §3.1, §3.11 and §4.3 cite it |
| V04-ICONF-1 | minor | FIXED by ruling (V04 §2.6) |
| V04-ICONF-2 | minor | FIXED by ruling (V04 §9, §8) |
| V04-ICONF-3 | major | FIXED by ruling (V04 §5.5, T-V4-28, §10) |
| V04-ICONF-4 | minor | FIXED by ruling (V04 §5.4, §10) |
| V04-ICONF-5 | minor | FIXED by ruling (V04 §3.5.0a (5a)) |
| V04-XCONF-1 | minor | FIXED by ruling (V04 §1b.3) |
| V04-XCONF-2 | minor | FIXED by ruling (V04 §5.1; §14 keymap) |
| V04-XCONF-3 | minor | FIXED by ruling (T-V4-50) |
| V04-ELEG-1 | minor | FIXED by E-03 (V04 §3.12 table; §6.1) |
| V04-EDGE-1 | major | FIXED: V04 §3.7 L5 *When the dossier removes or closes the institution*; §4.4; J-V4.124; T-V4-78 (a) |
| V04-EDGE-2 | minor | FIXED: V04 §3.5.7 (g) (2) rules gated, secret and locked paths with item 113 (e); J-V4.122; T-V4-76 (b) |
| V04-WGAP-1 | minor | FIXED: V04 §1b.5 names DR37 (history) and DR36, DR38, DR39 for the former settlement |
| V04-WGAP-2 | major | FIXED: T-V4-76 (c)–(e) |
| V04-WGAP-3 | minor | FIXED: V04 §1b.1 list; T-V4-73 (a); cross-part note 1 |
| V04-WGAP-4 | major | FIXED: V04 §3.5.4 (f), §2.2, §2.6, T-V4-63 |
| V04-WGAP-5 | minor | FIXED: V04 §1b.2, §4.5, T-V4-79 |
| V04-MISSING-1 | major | FIXED: g item 113 at build depth (V04 §3.5.5 (b), §3.5.7 (g), T-V4-76, T-V4-77, J-V4.122, J-V4.123) |
| V04-MISSING-2 | major | FIXED: V04 §11 (J122), §8 slot, §10 BCR-V4-13 |
| V04-TERM-1 | minor | FIXED: BCR-V4-n (ID-BCR); `V04 §n` throughout |
| V04-DEFER-1 | major | FIXED: V04 §8 states the decided order (J122) |
| V04-NARR-1 | minor | FIXED: one marker line |
| V04-NARR-2 | minor | FIXED: ledgers removed |
| V04-NARR-3 | minor | FIXED: V04 §6 *Epochs* and *Edits* paragraphs, no round label |
| V04-NARR-4 | minor | FIXED: tags dropped from V04 §7 |
| V04-NARR-5 | minor | FIXED: V04 §9 rows in final form |
| V04-NARR-6 | minor | FIXED: V04 §10 a pointer table, no amendment narration |
| V04-NARR-7 | minor | FIXED: round sections removed; IN notes folded; one §12 list; hand-offs in this report |
| V04-BREF-1 | minor | FIXED: every self-reference prefixed `V04 §` (script-checked) |
| SLR6-02 | minor | FIXED: V04 §6 *Edits* prices the stage-2 switch's edit |
| SLR6-03 | minor | FIXED: §12's hedge gone with the narration; J-V4.121 cites §7.4's undo row |
| SCC-113 | minor | FIXED: V04 §8's span row confirms at the M4 panel's M4-110 group, T-V4-62 at `'V4-U3'`, the V4-U5 panel, cells by V11's names |
| V04:IN-V04-1 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-2 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-3 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-4 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-5 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-6 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-7 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-8 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-9 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-10 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-11 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-12 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-13 | minor | FIXED: folded at its home (Integration notes table) |
| V04:IN-V04-14 | minor | FIXED: folded at its home (Integration notes table) |

## 4 Hand-offs routed to V04 (31), each closed in the text

| hand-off | closed at |
|---|---|
| V02:X12 | V04 §3.5.7 (d): the dig key carries a mutator's wing key; the obstacle test reads V02 §3.14.5 (f) |
| V06:X1 | V04 §3.5.1 (5), (6): `opts.capM2`, the per-year compounded `growthCapShare`, the derived primary and the rank cap against it |
| V06:X2 | V04 §3.5.7 *With a scope*; §3.5.7 (g) (4): vacated households returned as displaced (cause `void`) for re-housing the same epoch; V04 §3.10: U-NET whole at the first sewers epoch |
| V06:X14 | V04 §3.10 (`ArchVaults.reconcile` over `EpochScope.raised`, the wall drops over `scope.levelled`); §3.5.4 (d) (2) (breach and dismantle collapse the chamber); §3.5.5 (a) (the tombstoned wall as a step) |
| V06:X25 | V04 §3.5.0 *At an epoch*, §1b.2 (`Foundations.apply`), §3.1 (maintenance mode), §3.4 F6 and §3.10 (F6 filled by V06's relocation) |
| V06:X29 | file f's item for BCR-V6-27 (closed-stated; nothing for V04) |
| V06:X33 | V04 §3.10 *Access closures*: the host leaving its `fallen_island` decoration by whichever op ends its cover |
| V07:FL-2 | V04 §2.2 (`'rung'`), §3.5.1 (3) (`v.parish_church`), §3.1 (maintenance mode) |
| V07:FL-3 | V04 §3.5.4 (d): the span rule's `country` reason read (item 244); T-V4-62 |
| V08:X3 | V04 §3.5.1 (2), (5): `CalamityRef.deaths` through `opts.deaths` |
| V08:X13 | V04 §3.5.0a (1): `site.ruinEvidence`'s seven kinds in V04's order; §1b.5: DR30–DR32 |
| V09:XV-V9-3 | V04 §1b.1, §1b.3, §2.6, §5.1: `showUnexcavated` a view key |
| V09:XV-V9-4 | V04 §4.5 (`under/wayIn`, the burial face's section via `catacombOutcome`), §5.2 (7) (symbol by `cause.rule`), §4.1 (`drawChamber`'s `system` union, item 361; the dwelling closure, item 372) |
| V09:XV-V9-8 | V04 §8: V09's AP6 lands with U3, U3b and U4, priced in V09's total |
| V09:XV-V9-14 | V04 §5.1: an arch vault's `span` names its raised way and span; V09 lists it at street level, never hidden by the band filter |
| V09:XV-V9-27 | V04 §3.8 *Voids and bans*, *The dwelling closure's way in*; T-V4-48 (closed-stated) |
| V10:CVR-V10-1 | V04 §4.5: `catacombOutcome`, the `underground` section provider, one catalogue key per union value; T-V4-79 |
| V10:CVR-V10-10 | V04 §4.5's rows for an arch vault, a monument, the terminal cistern and a void met by a footing |
| V11:X-V11-4 | V04 §2.2 (`CatacombRule.order`), §2.3 (V11's rows cited, no values), §3.5.1 (6) |
| V11:X-V11-10 | V04 §1.2 (`span.vaultShare` × `era.raisedVaultM` × `culture.raisedVaultM`), §2.3 (`CultureRow.monument`'s values V11's) |
| V11:X-V11-14 | V04 §3.10 (the participants register `stage: 'U-FADE'`); §8 (each landing names its `U-*` id in the registry rows' readers) |
| V11:X-V11-15 | V04 §1b.1: the dossier row sets not calibratable |
| V11:X-V11-17 | V04 §8's span row and J-V4.93 name `raisedWays.structure.span.*` |
| V12:X-V12-4 | V04 §7 *V12's forms* (the `StatBarSpec`s, `undergroundInputOf`) and the owner's panel as `PanelSpec` V4-U5, SOLO |
| V12:X-V12-11 | T-V4-69 registered on V12 §3.7.8's engine, "off" read as V11 §3.24.0's switch table |
| V12:X-V12-13 | T-V4-54 over V12's deep voids; T-V4-43/58 parameters; T-V4-51's step script; `CatacombComplex` keyed by its source lineage (V04 §2.5); T-V4-44 never reads tiers |
| V12:X-V12-15, X-V12-16 | V04 §8 *The register at each exit*: no register line of V04's own; the named lines' cells; `--defaults` writes no empty-table entry |
| V12:X-V12-17 | V04 §8 *The due steps*: the default line's due as M-CAL or the underground's later corpus run |
| V12:X-V12-18 | V04 §8's rows as one entry with `stages` in the line's order (closed-stated) |
| V12:X-V12-19 | V04 §8's span row (cells by V11's names; values in item 244) |

Agreement disagreements (4): T-V3-23 (V04-XCONF-3), PageUp and PageDown (V04-XCONF-2), `AccessPoint` (V04-ICONF-1) — each
fixed by its ruling above.

## 5 Edges (principle (11))

The canon's catalogue routed 52 UNDEFINED and 62 UNTESTED edges of V04's mechanisms and 62 owned combinations (plus the
named combinations "a catacomb growing into a sewer" and V04's parts of "a settlement that grows over a sealed void" and "a
raised way over a harbour mouth"). All are defined and tested in V04 §3.13: (a) degenerate geometry (E4 of every
mechanism; the kernel's general rule and each stage's failure class; V04 §4.1's degenerate forms), (b) every rung THORP to
the METROPOLIS cap and the hood document (E6), (c) every toggle and preset (E7), (d) missing, empty and contradictory data,
the dossier included, and save, load, undo, redo, regenerate and migrate (E5, E8; V04 §4.6's item-113 migration; T-V4-80
(d)), (e) every combination row, each a clause of T-V4-81. E1 (no input) and E2 (one item) edges are defined at their
homes (V04 §2.4's all-zero transients, §3.7a's empty T8, §4.5's empty providers, §5.1's empty band ladder, §5.5's empty
band) and covered by T-V4-80 (d). No outcome is a crash, a hang, lost data or a whole-map retry.

## 6 CROSS-PART NOTES

1. **determinism (§5.4):** the `GenerationReport.warnings` comment lists seven underground codes (item 338); V04 §1b.1 also
   produces `W_RUIN_SOURCE_REMOVED` (V04-WGAP-3), `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR`,
   `W_TERMINAL_CISTERN_SKIPPED` (item 558's round) and `W_BURIED_FORMER_SKIPPED` (g item 113). The field is an open
   `Record<string, number>`, so nothing breaks; the comment should list them or cite V04 §1b.1.
2. **scope (§13.2, lines on T-V4 ranges):** V04's bars now run T-V4-1 – T-V4-81; the base's T113-4 is run as T-V4-77 and
   T113-5 as T-V4-76 (V04 §7); §13.2's staged table's "T-V4-1 – T-V4-75" should read T-V4-81.
3. **V10 §3.9a:** a lost cluster's row — "once known, its way in closed" (`info.under.lost`) — and the keys V04 §4.5 names
   for the item-110 and item-113 subjects (`info.under.arch.<reason>`, `info.under.monument`, `info.under.terminal`,
   `info.under.footing`, `info.under.former`, `info.catacomb.outcome.<value>`).
4. **V09:** the LOST void's panel line (V09-WGAP-1) reads `excavation(...) === 'lost'` (V04 §3.5.7 (g)); V09 §4.9's
   catalogue carries the keys of note 3.
5. **V12:** `undergroundInputOf`'s `state` gains `'lost'` (V04 §3.5.7 (g) (6)); T-V4-76 and T-V4-77 join the item-113 bar
   map at the later of M6-U and M6-E; the `buried` part holds the former settlement's elements.
6. **V06:** `BuriedFormer.lay(doc, epoch, former)` is called by the replay at the epoch a former fabric passes the burial
   threshold, inside that batch; V06 passes the `former` ids (records left ruined and not reused, on their last live state),
   tombstones the surface records itself and writes the returned id into `HistoryRecord.buried`; `null` means nothing laid.
   Households vacated from a cluster that turns `lost` or `unexcavated` return as displaced with cause `void`.
7. **V11:** V04 reads the product of the burial-threshold factors (`burialFactor`) in the rise law (V04 §3.5.5 (b)); the
   `buried` row's new params (`formerStoreyMinM2`, `formerWallCm`, `formerGateM2`, `formerMinGalleryM`,
   `formerRiseCmPerCentury`, `formerRiseMaxCm`, `formerMinHeadroomCm`) are `under.systems` (row 59) params landing at U3
   by the default line.
8. **V03:** V03 cites `Chamber.gradeFaces` at V04 §2.2 — agreed: it is a view named there and defined at V04 §3.5.4 (f),
   exported as `gradeFaces(chamberId)`; a street vault's downhill side and a bridge vault's side away from the deck are its
   other grade faces (V03's list agrees).
9. **pipeline (II.7.6) and model:** item 113 (e)'s "open links" is read by V04 §3.5.7 (g) (2) as links of kind `open`,
   `gated` or `secret` and accesses `open` or `locked` (J-V4.122); II.7.6's sentence may cite it. An oasis's pond (item
   111) is never an outfall candidate (V04 §3.2 N2 via §3.13 (e); J-V4.126): the base's outfall producer (§2.3, S1 (3))
   may leave the pond out of `Terrain.outfalls` or keep it with N2 filtering it; either agrees.
10. **canon:** V04-WGAP-3's ruling cites "file f item 558" for BCR-41's list; BCR-V4-41 is item 338 (item 558 is
    BCR-V4-42). V04 applied the ruling's substance at item 338's home.
11. **INDEX.md §3 (dependency graph):** M6-U's exits now include T-V4-76 – T-V4-81; the price is unchanged (item 113's parts
    absorbed, J-V4.114, J122).
12. **J-VI.4 across V04:** V04's own tool refusals are now bends (V04 §4.1, §4.2, §4.7); V09's bend catalogue should carry
    the bend keys for them (a depth offset bent to the cover limit, a public opening bent to the nearest candidate, a crypt
    added before a hand crypt join, a chamber enlarged to `minM2`).
13. **V07:** the buried former settlement is laid at every rung (V04 §3.5.0, §3.5.5 (b)), so "a village over a former
    city" carries it under the village when the replay has buried it.

## 7 MAPPING TABLE (every inventory id of V04 → where it now lives)

Classes: STATE — stated here (V04 owns it); REFERENCE — the canon's REFERENCE list, cited at its home and not restated;
BCR→f — a base change request, now a row of V04 §10 pointing at its file f item; TERM — a glossary item, the term used in
the text.

| inventory id | kind | old § | class | where it now lives | item (abridged) |
|---|---|---|---|---|---|
| V04-0001 | summary | 0 | STATE | V04 §0 | Plain words: the underground is built from rules, same seed, after the streets and houses  |
| V04-0002 | summary | 0 | STATE | V04 §0 | Plain words: people live along walkable sewers in rooms cut into both tunnel walls, one or |
| V04-0003 | summary | 0 | STATE | V04 §0 | Plain words: under the arches of a viaduct, raised road or aqueduct some arches are walled |
| V04-0004 | summary | 0 | STATE | V04 §0 | Plain words: caves and ruins can lie under a hamlet as under a city; most start sealed; a  |
| V04-0005 | scope | 1.1 | STATE | V04 §1.1 | Nine engines, one view and editing in one package @plat/under: U-NET sewer network (SewerS |
| V04-0006 | rule | 1.1 | STATE | V04 §1.1 | The underground's light rows (§4.7 LightRule, arena underground) are placed by the engines |
| V04-0007 | hook | 1.2 | STATE | V04 §1.2 | Hooks: existence by tier, S0 draw, Features.sewers, Features.underground, toggle as visibi |
| V04-0008 | hook | 1.2 | STATE | V04 §1.2 | Hooks (cont.): light table and lighting model (§4.7 Light sources, §8.4) -> V4 §3.9, §5.3; |
| V04-0009 | hook | 1.2 | STATE | V04 §1.2 | Hooks (item 110 and volumes): RetainingWall and S10-S11 levelled ground; raised way record |
| V04-0010 | term | 1.2 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | The ground = {layer ground, part 0} unless a raised part is named: every ground read (poin |
| V04-0011 | rule | 1.2 | STATE | V04 §1.2 | The sky layer is never read: every building, basement, crypt, plot, district, reservation  |
| V04-0012 | term | 1.2 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | Public ground (stated once): a way corridor, an L1 square or gate-plaza face, or a block w |
| V04-0013 | scope | 1.3 | STATE | V04 §1.3 | Out of scope: evolution engine's scheduling (when an epoch runs, target, strike lottery) i |
| V04-0014 | scope | 1.3 | STATE | V04 §1.3 | Out of scope with owners: the plan rung's basement plan (stage 3, V03) draws the stair, la |
| V04-0015 | rule | 1b | STATE | V04 §1b | Wiring rule: every record, field, table, stage output, interface, edit kind and entity kin |
| V04-0016 | record | 1b.1 | REFERENCE | cited at its home (model §2.3); V04 §1b.1 keeps the pointer | Outfall type: producers S1 (3) writes Terrain.outfalls, U-NET N2 writes Tunnel.outfall; co |
| V04-0017 | record | 1b.1 | REFERENCE | cited at its home (model §2.4); V04 §1b.1 keeps the pointer | Junction on an underground part with chamber flag: producers U-NET N9, U-CITY C3 (walkway  |
| V04-0018 | record | 1b.1 | REFERENCE | cited at its home (model §2.7); V04 §1b.1 keeps the pointer | Tunnel.depthOffsetCm (setAttr -> N7 added to derived invert; every re-derivation); Tunnel. |
| V04-0019 | record | 1b.1 | REFERENCE | cited at its home (model §2.5); V04 §1b.1 keeps the pointer | District.core: U-CITY C2 -> C3 (walkways end at its plaza rim), C4 (black market's plot an |
| V04-0020 | table | 1b.1 | STATE | V04 §1b.1 | Tables (shipped defaults; editTable §7.6): NetworkRule tables/under/network.json -> U-NET  |
| V04-0021 | table | 1b.1 | REFERENCE | cited at its home (pipeline §4.7); V04 §1b.1 keeps the pointer | Underground light rows (rows of lights.json, arena underground): shipped defaults (3.9) -> |
| V04-0022 | record | 1b.1 | REFERENCE | cited at its home (pipeline §4.5); V04 §1b.1 keeps the pointer | NetworkForecast (derived, never persisted): U-FORECAST at S7b (in a hood document after th |
| V04-0023 | record | 1b.1 | REFERENCE | cited at its home (pipeline §4.1); V04 §1b.1 keeps the pointer | StageDecl.phase: registry declarations of the nine engines -> §4.1's scheduler (the tail a |
| V04-0024 | record | 1b.1 | REFERENCE | cited at its home (determinism §7.8); V04 §1b.1 keeps the pointer | Controls layers.sewers.family, layers.sewers.preset: recipe params (§2.9), advanced panel  |
| V04-0025 | record | 1b.1 | REFERENCE | cited at its home (rendering §8.2); V04 §1b.1 keeps the pointer | LayerSpec.underView and colour roles rock, void (BCR-10): style sheet and setLayer -> S14  |
| V04-0026 | table | 1b.1 | REFERENCE | cited at its home (determinism §7.7); V04 §1b.1 keeps the pointer | Dossier row sets tables/dossier/sanitation and tables/dossier/subterranean (V4 §2.3a): shi |
| V04-0027 | record | 1b.1 | REFERENCE | cited at its home (determinism §5.2); V04 §1b.1 keeps the pointer | F-NET (BCR-7): U-NET detections -> report requestedVsBuilt and ladder counts (§5.4). Stage |
| V04-0028 | record | 1b.1 | REFERENCE | cited at its home (model §2.7); V04 §1b.1 keeps the pointer | RuinRecord (V4 §2.2): U-SYS 3.5.0a -> U-SYS layout and decay, U-ACCESS (entrance at its ma |
| V04-0029 | record | 1b.1 | REFERENCE | cited at its home (model §2.7); V04 §1b.1 keeps the pointer | CatacombComplex (V4 §2.2): U-SYS 3.5.1 -> U-SYS (growth, ratchet, rank cap against the pri |
| V04-0030 | record | 1b.1 | REFERENCE | cited at its home (pipeline II.7.4); V04 §1b.1 keeps the pointer | AccessPoint.cause (BCR-30): every creator (N11, U-SYS entrances, U-ACCESS, F5, L1, L3, L5, |
| V04-0031 | interface | 1b.1 | STATE | V04 §1b.1 | excavation(cluster) (derived, never stored): U-ACCESS (g) over the connection graph -> U-C |
| V04-0032 | record | 1b.1 | REFERENCE | cited at its home (model §2.7); V04 §1b.1 keeps the pointer | UndergroundSystem.variant: U-SYS 3.5.2 (a fissure) -> S14, V12 (cavern with its variant),  |
| V04-0033 | record | 1b.1 | STATE | V04 §1b.1 | Register entries of V04's calibratable columns (V12 §2.6 CalibrationEntry, one per column) |
| V04-0034 | record | 1b.1 | REFERENCE | cited at its home (determinism §7.8); V04 §1b.1 keeps the pointer | recipe.layers.ruins: recipe params, advanced panel's Ancient ruins -> U-SYS 3.5.0a (no-dos |
| V04-0035 | interface | 1b.1 | STATE | V04 §1b.1 | underDistance(member, target) (3.6a): the part's walkway, gallery and tunnel graph and the |
| V04-0036 | record | 1b.1 | REFERENCE | cited at its home (pipeline §4.7); V04 §1b.1 keeps the pointer | T8's writes: U-RECONCILE -> the ground's model digest (finalised after T8), report request |
| V04-0037 | record | 1b.1 | REFERENCE | cited at its home (model §2.7); V04 §1b.1 keeps the pointer | ChamberKind archVault and the arch-vault chambers (3.5.4 (d); C4-110-1): U-SYS vaults step |
| V04-0038 | interface | 1b.1 | STATE | V04 §1b.1 | foundationObstacles(doc) (derived): base raised-way piers (to raised.supportFoundationCm,  |
| V04-0039 | record | 1b.1 | STATE | V04 §1b.1 | Wall-crossing knots and drops (3.2 N6-N7): U-NET from the base's RetainingWalls and levell |
| V04-0040 | interface | 1b.2 | STATE | V04 §1b.2 | SewerStrategy.derive (U-NET, @plat/under/net): callers the tail scheduler first after firs |
| V04-0041 | interface | 1b.2 | STATE | V04 §1b.2 | NetworkForecaster.forecast (U-FORECAST, @plat/under/forecast): S7b (6),(7) in @plat/conten |
| V04-0042 | interface | 1b.2 | STATE | V04 §1b.2 | Buried-system builder (3.5.5; U-SYS @plat/under/sys): T2's buried step (a history scar at  |
| V04-0043 | interface | 1b.2 | STATE | V04 §1b.2 | AccessPass.run(doc, scope?: EpochScope) with excavation(doc, cluster) (@plat/under/access) |
| V04-0044 | interface | 1b.2 | REFERENCE | cited at its home (V01 V01 §3.7.1); V04 §1b.2 keeps the pointer | V01's opening pass (V1-3.7.1), called only while registered (fabric.extensionWeight > 0; V |
| V04-0045 | interface | 1b.2 | STATE | V04 §1b.2 | ArchVaults.reconcile(doc, raised, cause) (3.5.4 (d); U-SYS): tail T2 vaults step (every ra |
| V04-0046 | interface | 1b.2 | STATE | V04 §1b.2 | underDistance (@plat/under/distance) -> S10b's scorer on underground parts. CatacombGrowth |
| V04-0047 | interface | 1b.2 | STATE | V04 §1b.2 | DugGenerators (basement, target, connector, system, access, reservation, link; U-DIG) -> a |
| V04-0048 | rule | 1b.2 | STATE | V04 §1b.2 | Every stage output consumed: the sewer system record and part 0's tunnels by U-FRONT, U-AC |
| V04-0049 | edit | 1b.3 | STATE | V04 §1b.3 | Edit kinds (tool; lifecycle row; undo): drawTunnel with from (BCR-8; T4 road on the underg |
| V04-0050 | rule | 1b.4 | STATE | V04 §1b.4 | Entity kinds rendered/labelled/exported/persisted: Tunnel (band by kind and states; named  |
| V04-0051 | rule | 1b.5 | REFERENCE | cited at its home (determinism §7.7); V04 §1b.5 keeps the pointer | Dossier trace (fact -> field -> DR -> reader): population (DR7, DR17) -> II.7.1 law, II.7. |
| V04-0052 | rule | 1b.5 | REFERENCE | cited at its home (determinism §7.7); V04 §1b.5 keeps the pointer | Dossier trace (cont.): age and scars (history.ageYears, history.events -> HistoryHint, ite |
| V04-0053 | rule | 2.1 | REFERENCE | cited at its home (pipeline II.7.4); V04 §2.1 keeps the pointer | Read as declared: Features (II.7.4, §2.9), Tunnel, UndergroundSystem, Gallery, Chamber, Un |
| V04-0054 | record | 2.2 | REFERENCE | cited at its home (model §2.3); V04 §2.2 keeps the pointer | Outfall {into OutfallInto sea/lake/river/canal/ditch/moat/frame/stream/field (river, tribu |
| V04-0055 | record | 2.2 | REFERENCE | cited at its home (model §2.4); V04 §2.2 keeps the pointer | Way.flowToward no longer stored: the reading wayFall(way, t: TerrainSampler, rule: Network |
| V04-0056 | record | 2.2 | REFERENCE | cited at its home (model §2.7); V04 §2.2 keeps the pointer | Tunnel gains outfall? (Outfall), serves: Id[] (plots drained through this run, J-V4.43, so |
| V04-0057 | record | 2.2 | REFERENCE | cited at its home (model §2.7); V04 §2.2 keeps the pointer | ChamberKind = ossuary (catacomb) / hall, breakdown (cavern) / workings (quarry) / cistern, |
| V04-0058 | record | 2.2 | REFERENCE | cited at its home (model §2.7); V04 §2.2 keeps the pointer | MonumentRecord {host temple/hall/tomb (the CultureRow.monument host); lay TierLay (V02 lay |
| V04-0059 | record | 2.2 | REFERENCE | cited at its home (model §2.7); V04 §2.2 keeps the pointer | UndergroundSystem kind gains 'ruin' (g 109 (b)); gains variant?: 'fissure' (a cavern of or |
| V04-0060 | record | 2.2 | REFERENCE | cited at its home (pipeline II.7.4); V04 §2.2 keeps the pointer | AccessPoint.kind gains sinkhole, collapsed_shaft, ruin_entrance (public openings, 3.5.7 (e |
| V04-0061 | record | 2.2 | REFERENCE | cited at its home (model §2.7); V04 §2.2 keeps the pointer | LinkCause = proximity/overlap/mineBreach/reuse/lifeline/edit/dig/dossier/crypt/legacy; Und |
| V04-0062 | record | 2.2 | STATE | V04 §2.2 | RuinRecord {system; culture (RuinRule.cultures row id, V11's rows); family grid/axial/radi |
| V04-0063 | record | 2.2 | STATE | V04 §2.2 | CatacombComplex {id; system; source {kind churchyard/cemetery/network/monastery/quarryOssu |
| V04-0064 | rule | 2.3 | STATE | V04 §2.3 | Every value in §2.3 is our own (provenance own, extension: no reference has an underground |
| V04-0065 | table | 2.3 | STATE | V04 §2.3 | NetworkRule (tables/under/network.json; U-NET, U-FORECAST) schema and defaults: classes hi |
| V04-0066 | table | 2.3 | STATE | V04 §2.3 | UndergroundFadeRule (tables/under/fade.json; U-FADE): sampleM 25; neglectGain 1.5; ops: dr |
| V04-0067 | table | 2.3 | STATE | V04 §2.3 | Parameters added to UndergroundSystemRow.params (II.7.6; own, extension, calibratable; no  |
| V04-0068 | table | 2.3 | STATE | V04 §2.3 | UnderLayoutRule (tables/under/layout.json; U-CITY, U-LINK, light scope): undercity walkway |
| V04-0069 | table | 2.3 | STATE | V04 §2.3 | RuinRule (tables/under/ruin.json): chance magic 0.6, history 0.4, delvingFactor 1.5 (cappe |
| V04-0070 | table | 2.3 | STATE | V04 §2.3 | OpeningRow (tables/under/openings.json) {kind sinkhole/mouth/skylight/collapsed_shaft/ruin |
| V04-0071 | table | 2.3 | STATE | V04 §2.3 | CatacombRule (tables/under/catacomb.json; U-SYS 3.5.1, U-ACCESS (c), U-FADE, U-FORECAST P5 |
| V04-0072 | table | 2.3a | REFERENCE | cited at its home (determinism §7.7); V04 §2.3a keeps the pointer | Dossier row set tables/dossier/sanitation: a matching record turns toggles.sewers on and b |
| V04-0073 | table | 2.3a | REFERENCE | cited at its home (determinism §7.7); V04 §2.3a keeps the pointer | Dossier row set tables/dossier/subterranean (a record with facets.subterranean or a custom |
| V04-0074 | record | 2.4 | STATE | V04 §2.4 | Derived transients (never persisted): NetworkForecast {runs[] {lengthM, navigable, admissi |
| V04-0075 | table | 2.5 | REFERENCE | cited at its home (determinism §6.3); V04 §2.5 keeps the pointer | Lineage parent and creation key per generated entity (so an upstream change not touching a |
| V04-0076 | lifecycle | 2.6 | STATE | V04 §2.6 | Lifecycle rows (create; read; persist; regenerate; undo; migrate): Terrain.outfalls (S1 (3 |
| V04-0077 | lifecycle | 2.6 | STATE | V04 §2.6 | Lifecycle: RuinRecord (U-SYS 3.5.0a, a declared ruin element 4.7; entities block; kept who |
| V04-0078 | lifecycle | 2.6 | STATE | V04 §2.6 | Lifecycle: arch vault (archVault chamber, Chamber.span, its door): created by U-SYS's vaul |
| V04-0079 | rule | 3.1 | STATE | V04 §3.1 | The nine engines register as stages by declared I/O (§4.12) in @plat/layout's registry, co |
| V04-0080 | table | 3.1 | STATE | V04 §3.1 | Tail stage table (order; stage; reads; writes; streams; lineage unit; ladder): T1 U-NET Se |
| V04-0081 | rule | 3.1 | STATE | V04 §3.1 | At every rung: at THORP, HAMLET, VILLAGE and at a TOWN whose draw left Features.sewers fal |
| V04-0082 | rule | 3.1 | STATE | V04 §3.1 | Maintenance mode: at a village rung a system an earlier, larger rung left (V07's hand-off  |
| V04-0083 | rule | 3.1 | STATE | V04 §3.1 | Standalone neighbourhood document (V1-3.10.1 step 6, (7)): S0 writes Features.sewers false |
| V04-0084 | rule | 3.2 | STATE | V04 §3.2 | U-NET inputs: the rule families are II.6's; default family mixed (small streams culverted  |
| V04-0085 | rule | 3.2 | STATE | V04 §3.2 | N1 service region R: ground districts (never sky) whose kind is not hinterland, undergroun |
| V04-0086 | rule | 3.2 | STATE | V04 §3.2 | N2 outfalls: candidates Terrain.outfalls with into in {river, sea, lake, canal, ditch} wit |
| V04-0087 | mechanism | 3.2 | STATE | V04 §3.2 | N3 drainage graph and tree: way edges = every way spine between consecutive junctions with |
| V04-0088 | rule | 3.2 | STATE | V04 §3.2 | N3a declarations: (1) held runs (a drawTunnel without system, a locked or pinned run, a cr |
| V04-0089 | rule | 3.2 | STATE | V04 §3.2 | N4 served area: each ground plot of R adds its area to the node nearer by station to the p |
| V04-0090 | rule | 3.2 | STATE | V04 §3.2 | N6 runs and profiles: selected subgraph cut into runs at every node of degree != 2, every  |
| V04-0091 | mechanism | 3.2 | STATE | V04 §3.2 | N7 invert pass (every h = levelledGroundCm at the knot): (1) root-first: outfall knot floo |
| V04-0092 | rule | 3.2 | STATE | V04 §3.2 | N8 plot connections (serves): per plot of R (ground part 0), need = highest drain value am |
| V04-0093 | rule | 3.2 | STATE | V04 §3.2 | N9 passages (navigable only): for every pair of navigable runs not sharing a junction whos |
| V04-0094 | rule | 3.2 | STATE | V04 §3.2 | N10 commit on part 0: one L1 batch inserts every run's centreline in address order as a tu |
| V04-0095 | rule | 3.2 | STATE | V04 §3.2 | N11 network openings: on every main and culvert run, at its head where the head lies in R  |
| V04-0096 | rule | 3.2 | STATE | V04 §3.2 | N11a grilles at walls: Tunnel.grilles is a view: stations where a run's band crosses an en |
| V04-0097 | mechanism | 3.3 | STATE | V04 §3.3 | U-FORECAST: NetworkForecaster.forecast(doc, rules) at S7b before (5) (hood document: after |
| V04-0098 | mechanism | 3.3 | STATE | V04 §3.3 | P5 voids (floor area / m2PerHousehold, II.7.5): ruin by its own existence and extent draws |
| V04-0099 | rule | 3.4 | STATE | V04 §3.4 | U-FRONT: II.7.3's rules (U1-U3, occupants, cut, surface constraint, access, depth, lifecyc |
| V04-0100 | rule | 3.4 | STATE | V04 §3.4 | F4 placement and buildings: S10b places the allocation, relation families measured by unde |
| V04-0101 | rule | 3.4 | STATE | V04 §3.4 | F5 access, air, light: per neighbourhood (a connected component of open navigable run edge |
| V04-0102 | fallback | 3.4 | STATE | V04 §3.4 | Existence along the sewers: II.7.3's surface test excludes every footprint so sewer-front  |
| V04-0103 | table | 3.5.0 | STATE | V04 §3.5.0 | Existence order and rung gates (ruin laid first so every later system meets it, g 109 (c)) |
| V04-0104 | rule | 3.5.0 | STATE | V04 §3.5.0 | Each chance is one uniform on sewer keyed by (kind, source lineage); the parity presets se |
| V04-0105 | rule | 3.5.0 | STATE | V04 §3.5.0 | Shallow-element rule: an element of a system laid after the town whose ceiling lies within |
| V04-0106 | mechanism | 3.5.0 | STATE | V04 §3.5.0 | Foundations: foundationObstacles(doc) derived each derivation: (1) each raised-way pier's  |
| V04-0107 | mechanism | 3.5.0 | STATE | V04 §3.5.0 | At an epoch no V04 stage derives, so Foundations.apply(doc, scope, cause) (V06 under.exten |
| V04-0108 | table | 3.5.0 | STATE | V04 §3.5.0 | Gallery and chamber row defaults (own): ruin street at culture streetCm / 60 / 300, corrid |
| V04-0109 | rule | 3.5.0a | STATE | V04 §3.5.0a | Ruin existence, strongest first: a ruin already held is kept whole whatever its source now |
| V04-0110 | rule | 3.5.0a | STATE | V04 §3.5.0a | Ruin culture and axis: culture one draw over RuinRule.cultures by weight on the ruin's str |
| V04-0111 | rule | 3.5.0a | STATE | V04 §3.5.0a | Ruin depth: ancient ground g(p) = present terrain smoothed by a smoothM 50 m box kernel le |
| V04-0112 | rule | 3.5.0a | STATE | V04 §3.5.0a | Ancient plan by family (V11 row gives blockPitchM, streetCm, aspect, roomM, columnPitchM,  |
| V04-0113 | rule | 3.5.0a | STATE | V04 §3.5.0a | Stepped monuments (g 110 (c)): where the culture row carries monument, each named host kin |
| V04-0114 | rule | 3.5.0a | STATE | V04 §3.5.0a | Columns modelled: in every hall and temple chamber, in its rectangle's frame, the column g |
| V04-0115 | rule | 3.5.0a | STATE | V04 §3.5.0a | Ruin decay (persistence order): classes hall (halls, temples), cistern, gate, axis (main s |
| V04-0116 | rule | 3.5.0a | STATE | V04 §3.5.0a | Distinct from the town: after decay, V12's paired measures (ruin.blockArea, grid.r4, grid. |
| V04-0117 | rule | 3.5.1 | STATE | V04 §3.5.1 | Catacomb candidates, burial faces only (TOWN+): (a) the churchyard part of a church or tem |
| V04-0118 | rule | 3.5.1 | STATE | V04 §3.5.1 | Catacomb rank: at growth stage k of K burialShare_k(f) = share of that stage's households  |
| V04-0119 | rule | 3.5.1 | STATE | V04 §3.5.1 | Catacomb count: one at TOWN; CITY and METROPOLIS min(cap, 1 + floor(churches / churchesPer |
| V04-0120 | rule | 3.5.1 | STATE | V04 §3.5.1 | Catacomb layout: one CatacombComplex per formed complex; anchor the face's centroid (quarr |
| V04-0121 | rule | 3.5.1 | STATE | V04 §3.5.1 | The largest under the largest cemetery: every complex but the primary capped at rankCap 0. |
| V04-0122 | rule | 3.5.1 | STATE | V04 §3.5.1 | Ratchet (g 109 (k)(4)): generation lays each complex to its need (the generation stands fo |
| V04-0123 | rule | 3.5.1 | STATE | V04 §3.5.1 | Stagnation (a reading): a complex is stagnant when its need exceeds its laid capacity and  |
| V04-0124 | rule | 3.5.1 | STATE | V04 §3.5.1 | Catacomb entrance: a stair AccessPoint, source system, cause {system}, knownTo local, at t |
| V04-0125 | rule | 3.5.1 | STATE | V04 §3.5.1 | Dossier forcing: a catacomb record forces one complex within the count on the first burial |
| V04-0126 | rule | 3.5.2 | STATE | V04 §3.5.2 | Caverns at every rung (extent the site's): existence = geology flag (S1 with g 109 (a)(1)  |
| V04-0127 | rule | 3.5.3 | STATE | V04 §3.5.3 | Quarries: volume (II.7.6, J-A65.45) V = wasteFactor x (sum over stone buildings perimeter  |
| V04-0128 | rule | 3.5.3 | STATE | V04 §3.5.3 | Mine voids: same law on SiteResources.ore >= 0.5 cells, volume oreM3PerMine per mining cla |
| V04-0129 | rule | 3.5.3 | STATE | V04 §3.5.3 | New workings at an epoch: QuarryWorkings.extend(doc, scope, epoch) (TOWN+; V06 under.exten |
| V04-0130 | rule | 3.5.4 | STATE | V04 §3.5.4 | Vaults (a) bridge vaults: each deck end of a built part-0 Bridge deck over water (never a  |
| V04-0131 | mechanism | 3.5.4 | STATE | V04 §3.5.4 | Arch vaults (g 110 (b)): the base fixes each span's use eagerly (BCR-45), V04 reads it, ne |
| V04-0132 | rule | 3.5.4 | STATE | V04 §3.5.4 | Terminal cistern (e): an aqueduct whose terminal kind is cistern (BCR-45) takes one cister |
| V04-0133 | rule | 3.5.5 | STATE | V04 §3.5.5 | Buried old town: II.7.6's rule, region the growth-stage-1 districts; galleries those distr |
| V04-0134 | rule | 3.5.6 | STATE | V04 §3.5.6 | Forced vaults: where CircumstanceSlice.undercity = require and P6 finds no counted void wi |
| V04-0135 | rule | 3.5.7 | STATE | V04 §3.5.7 | U-ACCESS (a) overlap and mine breaches (T2b, after U-SYS, before U-FRONT; every link and a |
| V04-0136 | rule | 3.5.7 | STATE | V04 §3.5.7 | U-ACCESS (b) proximity links: for each pair of parts (a < b) and each element e of part a  |
| V04-0137 | rule | 3.5.7 | STATE | V04 §3.5.7 | U-ACCESS (c) crypt joins: a church-class building on ground part 0 (never sky; crypt colum |
| V04-0138 | rule | 3.5.7 | STATE | V04 §3.5.7 | U-ACCESS (d) dig from above: every ground building (ground part 0; a raised-way pier is no |
| V04-0139 | rule | 3.5.7 | STATE | V04 §3.5.7 | U-ACCESS (e) public openings: each candidate of 3.5.2 and 3.5.0a (sinkhole, mouth, skyligh |
| V04-0140 | rule | 3.5.7 | STATE | V04 §3.5.7 | U-ACCESS (f) reuse: an element adopted by another system keeps its place, part and kind an |
| V04-0141 | mechanism | 3.5.7 | STATE | V04 §3.5.7 | U-ACCESS (g) excavation reading: excavation(cluster) is accessible or unexcavated for ever |
| V04-0142 | rule | 3.5.7 | STATE | V04 §3.5.7 | Access-pass determinism: item 64's basement draw stays in U-LINK (T5); dig draws are U-ACC |
| V04-0143 | rule | 3.6 | STATE | V04 §3.6 | U-CITY: existence, size law, allocation, shadow rules, outskirts and light are II.7.5's; l |
| V04-0144 | rule | 3.6 | STATE | V04 §3.6 | C1 the voids read-only first: for each built system part whose kind the preset admits (Und |
| V04-0145 | rule | 3.6 | STATE | V04 §3.6 | C2 main chamber: the core (District.core) is in order a ruin court, temple or hall chamber |
| V04-0146 | rule | 3.6 | STATE | V04 §3.6 | C3 streets: the core's plaza = disc of radius sqrt(plazaShare x area / pi) about its centr |
| V04-0147 | rule | 3.6 | STATE | V04 §3.6 | C4 plots and buildings: S10 on the neighbourhood's blocks with frontages on walkway and ga |
| V04-0148 | rule | 3.6a | STATE | V04 §3.6a | Cross-arena distance: underDistance(member, target) for a member on an underground part =  |
| V04-0149 | rule | 3.7 | STATE | V04 §3.7 | L1 lifelines realised (II.7.5 (4)): for each undercity neighbourhood in address order L1 m |
| V04-0150 | rule | 3.7 | STATE | V04 §3.7 | L3 basement accesses (item 64): II.7.3's Basement accesses (1)-(5), building by building o |
| V04-0151 | rule | 3.7 | STATE | V04 §3.7 | L5 subterranean dossier institutions: an institution with facets.subterranean that S10b pl |
| V04-0152 | rule | 3.7a | STATE | V04 §3.7a | T8 U-RECONCILE (last eager tail stage): inputs what the tail could not seat below after ab |
| V04-0153 | rule | 3.8 | STATE | V04 §3.8 | U-DIG (pieces and order II.7.6's, closure mechanics §7.3 item 9's): target search: each pa |
| V04-0154 | rule | 3.8 | STATE | V04 §3.8 | U-DIG keys: an edit's pieces keyed by the event's seq (§7.3 item 9 (b)); a lifeline's at g |
| V04-0155 | rule | 3.8 | STATE | V04 §3.8 | Dwelling closure's way in (base §7.3 item 9 (d) as f item 372 applies BCR-V9-22; V9 §4.17. |
| V04-0156 | table | 3.9 | STATE | V04 §3.9 | Underground light rows (model §8.4: no global light, ambient.underground, shafts, hand lan |
| V04-0157 | rule | 3.9 | STATE | V04 §3.9 | Fuel: a door row's band's fuel by the plot's band and the era row: poor rushlight (6 cd, s |
| V04-0158 | rule | 3.10 | STATE | V04 §3.10 | Epoch callers: the evolution engine owns the epoch; V04's parts it calls (BCR-6), usable b |
| V04-0159 | rule | 3.10 | STATE | V04 §3.10 | UndergroundFade.candidates(doc, epoch): every tunnel, gallery and chamber neither locked n |
| V04-0160 | rule | 3.10 | STATE | V04 §3.10 | At an epoch: Foundations.apply (under.extend's first act; 3.5.0 At an epoch; returns Found |
| V04-0161 | rule | 3.10 | STATE | V04 §3.10 | At a village rung the maintenance mode makes U-FADE, the foundation rule, the arch-vault r |
| V04-0162 | rule | 3.10 | STATE | V04 §3.10 | Access at an epoch: under.access runs AccessPass.run(doc, scope): each building the epoch  |
| V04-0163 | rule | 3.10 | STATE | V04 §3.10 | Access closures: an access point's own state changes only with its host at the epoch or ed |
| V04-0164 | rule | 3.10 | STATE | V04 §3.10 | Opening places after generation: V01's opening pass (V1-3.7.1) runs inside every commit th |
| V04-0165 | table | 3.11 | STATE | V04 §3.11 | Failure ladder table: U-NET outfalls (no admitted candidate -> moat -> one field outfall;  |
| V04-0166 | rule | 3.12 | STATE | V04 §3.12 | Determinism: every draw on an existing concern keyed by stage id, entity key and salt: pit |
| V04-0167 | edit | 4.1 | STATE | V04 §4.1 | Declarations (points in, shape out; item 101 (i)): drawTunnel (sewer, no system): two poin |
| V04-0168 | rule | 4.1 | STATE | V04 §4.1 | Two reads every points form shares: a ground point is read on ground part 0 (on a raised d |
| V04-0169 | edit | 4.2 | STATE | V04 §4.2 | Attribute paths (setAttr) with ranges and effects: tunnel kind (drain, main, culvert, pass |
| V04-0170 | table | 4.3 | STATE | V04 §4.3 | Locality (re-derives / byte-identical): tunnel drawn, moved, re-profiled or deleted -> U-F |
| V04-0171 | rule | 4.4 | STATE | V04 §4.4 | Undo and closure record: every row is §7.4's; the closure record (§7.3 item 9 (c)) names U |
| V04-0172 | interface | 4.5 | STATE | V04 §4.5 | Clerk's view (§11.2 tool API), filtered by the viewer's knowledge key (§9.2): per system k |
| V04-0173 | lifecycle | 4.6 | STATE | V04 §4.6 | Migration (§7.5): a document saved before U-NET's output version holds Features.sewers tru |
| V04-0174 | rule | 4.7 | STATE | V04 §4.7 | Read-ahead (skeleton file's underground bones; §4.1 Declarations read ahead): each declara |
| V04-0175 | render | 5.1 | REFERENCE | cited at its home (rendering §8.4); V04 §5.1 keeps the pointer | Underground view: hidden by default at every rung (§8.4); when visible one depth band draw |
| V04-0176 | render | 5.2 | REFERENCE | cited at its home (rendering §8.1); V04 §5.2 keeps the pointer | Underground marks (S14 builder, per part and band; semantics under.rock, under.void, under |
| V04-0177 | render | 5.2 | REFERENCE | cited at its home (rendering §8.2); V04 §5.2 keeps the pointer | Added programs: chamber fill by kind (§8.2's chamber row keyed by Chamber.kind): streetVau |
| V04-0178 | render | 5.3 | REFERENCE | cited at its home (rendering §8.4); V04 §5.3 keeps the pointer | Light underground: the surface layer (§8.4 (a)) of a band: each void's floor at its elevat |
| V04-0179 | render | 5.4 | REFERENCE | cited at its home (rendering §9); V04 §5.4 keeps the pointer | Labels: trunk or culvert run: kind tunnel, curved along its centreline (§9.3 spine candida |
| V04-0180 | export | 5.5 | REFERENCE | cited at its home (rendering §11.1); V04 §5.5 keeps the pointer | Exports: GeoJSON (§11.1 rows; tunnel with kind, navigable, widthCm, headroomCm, invert pro |
| V04-0181 | budget | 6 | STATE | V04 §6 | Budgets (§12.1; p50 and p95 over the rung's golden seeds; tail off the first paint, first  |
| V04-0182 | budget | 6 | STATE | V04 §6 | Edit budgets (§12.6): tunnel edit <= 30 ms at CITY; depth offset <= 5 ms; addUndergroundAc |
| V04-0183 | test | 7 | STATE | V04 §7 T-V4-35 | §7 frame: §13's families; every bar runs on generated output from U1 and keeps the base's  |
| V04-0184 | test | 7 | STATE | V04 §7 T-V4-1 | T-V4-1 invert knots fall monotonically in flow order at >= minGradient, every branch's dow |
| V04-0185 | test | 7 | STATE | V04 §7 T-V4-8 | T-V4-8 forecast on 200 CITY seeds: navigable forecast capacity within +/-25 % of built on  |
| V04-0186 | test | 7 | STATE | V04 §7 T-V4-15 | T-V4-15 T65-8 extended: buried town's squares are square chambers; buildings' entrances ar |
| V04-0187 | test | 7 | STATE | V04 §7 T-V4-21 | T-V4-21 knowledge: T30-5's enumeration on an underground fixture: at public no secret acce |
| V04-0188 | test | 7 | STATE | V04 §7 T-V4-31 | T-V4-31 locality (§7.3 oracle; B-EDIT with underground events): a tunnel edit changes only |
| V04-0189 | test | 7 | STATE | V04 §7 T-V4-39 | T-V4-39 lifecycle: Re-derive from the network stage and an epoch's extend after a drawTunn |
| V04-0190 | test | 7 | STATE | V04 §7 T-V4-50 | T-V4-50 catacombs (500 seeds per rung): <= 1 complex at TOWN; counts within CatacombRule.c |
| V04-0191 | test | 7 | STATE | V04 §7 T-V4-51 | T-V4-51 ratchet (V12 exactMonotone): catacomb.extentM2 never decreases across every epoch  |
| V04-0192 | test | 7 | STATE | V04 §7 T-V4-62 | T-V4-62 arch vaults (200 CITY, 100 METROPOLIS seeds with raised ways, second known-city fi |
| V04-0193 | test | 7 | STATE | V04 §7 T-V4-71 | T-V4-71 layers (V05 T-V5-26): 0 dig, basement-access, crypt-join hosts or catacomb candida |
| V04-0194 | decision | 8 | REFERENCE | cited at its home (scope §16); V04 §8 keeps the pointer | Where it slots: the underground is staged 'after the city is mastered' (DEFINITION §4): mi |
| V04-0195 | table | 8 | STATE | V04 §8 | Steps: U0 spike (1.25-1.75 pw: U-NET N1-N10 on B-CITY-lite, tail scheduler with phase and  |
| V04-0196 | rule | 8 | STATE | V04 §8 | Item 110 dependencies: the raised-way record with span use (BCR-45), RetainingWall and lev |
| V04-0197 | rule | 8 | STATE | V04 §8 | Risks in order: (1) the tail's time at METROPOLIS navigable with a ruin and the access pas |
| V04-0198 | decision | 9 | STATE | V04 §9 J-V4.1 | J-V4.1: chose one package `@plat/under` for the engines (seven as landed, nine after the r |
| V04-0199 | decision | 9 | STATE | V04 §9 J-V4.2 | J-V4.2: chose to run the underground as a tail after the first paint, serially on the gene |
| V04-0200 | decision | 9 | STATE | V04 §9 J-V4.3 | J-V4.3: chose `mixed` (culverted drainage lines as trunks, street mains feeding them) as t |
| V04-0201 | decision | 9 | STATE | V04 §9 J-V4.4 | J-V4.4: chose the tree as a multi-source shortest-path search from the admitted outfalls o |
| V04-0202 | decision | 9 | STATE | V04 §9 J-V4.5 | J-V4.5: chose tunnel selection by accumulated served area against per-preset thresholds, w |
| V04-0203 | decision | 9 | STATE | V04 §9 J-V4.6 | J-V4.6: chose one leaves-to-root invert pass with a re-route, then truncate, ladder over l |
| V04-0204 | decision | 9 | STATE | V04 §9 J-V4.7 | J-V4.7: chose outfalls from S1's drainage outlets, admitted downstream of the harbour and  |
| V04-0205 | decision | 9 | STATE | V04 §9 J-V4.8 | J-V4.8: chose logical house connections (`serves`) over drawn house drains, and drains onl |
| V04-0206 | decision | 9 | STATE | V04 §9 J-V4.9 | J-V4.9: chose sewer chambers as flagged junction wedges on part 0 over `chamber_wall` chai |
| V04-0207 | decision | 9 | STATE | V04 §9 J-V4.10 | J-V4.10: chose navigable-preset passages at the mains' closest approaches over random cros |
| V04-0208 | decision | 9 | STATE | V04 §9 J-V4.11 | J-V4.11: chose the network's own gratings at a manhole spacing on public ground and mouths |
| V04-0209 | decision | 9 | STATE | V04 §9 J-V4.12 | J-V4.12: chose `Way.flowToward` as a derived reading over a stored field, because no stage |
| V04-0210 | decision | 9 | STATE | V04 §9 J-V4.13 | J-V4.13: chose a forecast that runs the network's own first steps at S7b for every family  |
| V04-0211 | decision | 9 | STATE | V04 §9 J-V4.14 | J-V4.14: chose to keep the network's plan through ground edits (only connections and the f |
| V04-0212 | decision | 9 | STATE | V04 §9 J-V4.15 | J-V4.15: chose `Tunnel.depthOffsetCm` as the one depth edit of a tunnel over editing inver |
| V04-0213 | decision | 9 | STATE | V04 §9 J-V4.16 | J-V4.16: chose catacombs as a level grid aligned to their burial face, grown breadth-first |
| V04-0214 | decision | 9 | STATE | V04 §9 J-V4.17 | J-V4.17: chose soluble caverns along the drainage lines at the water table and volcanic tu |
| V04-0215 | decision | 9 | STATE | V04 §9 J-V4.18 | J-V4.18: chose each quarry working as one chamber with its pillars drawn by the `quarry` p |
| V04-0216 | decision | 9 | STATE | V04 §9 J-V4.19 | J-V4.19: chose vaults under bridge approaches and steep streets and cisterns under old pre |
| V04-0217 | decision | 9 | STATE | V04 §9 J-V4.20 | J-V4.20: chose to bury a buried town's squares as `square` chambers and keep its buildings |
| V04-0218 | decision | 9 | STATE | V04 §9 J-V4.21 | J-V4.21: chose to apply the surface constraint to void elements and undercity plots only w |
| V04-0219 | decision | 9 | STATE | V04 §9 J-V4.22 | J-V4.22: chose to carve an undercity's main chamber where its void has none (within its ow |
| V04-0220 | decision | 9 | STATE | V04 §9 J-V4.23 | J-V4.23: chose walkways as a minimum spanning tree over each chamber's openings and a ring |
| V04-0221 | decision | 9 | STATE | V04 §9 J-V4.24 | J-V4.24: chose one neighbourhood per void cluster, a large cluster split by its chamber gr |
| V04-0222 | decision | 9 | STATE | V04 §9 J-V4.25 | J-V4.25: chose to realise lifelines in the order access, air, water, then an optional rout |
| V04-0223 | decision | 9 | STATE | V04 §9 J-V4.26 | J-V4.26: chose links by per-part index proximity with station-greedy spacing and `via` by  |
| V04-0224 | decision | 9 | STATE | V04 §9 J-V4.27 | J-V4.27: chose a local 1 m grid A\* for dug connectors over the terrain grid, because a 5– |
| V04-0225 | decision | 9 | STATE | V04 §9 J-V4.28 | J-V4.28: chose the fade weight as exposure × rate × chance × neglect-by-usage, and the op  |
| V04-0226 | decision | 9 | STATE | V04 §9 J-V4.29 | J-V4.29: chose, at a growth stage, to connect new faces to the existing network and reopen |
| V04-0227 | decision | 9 | STATE | V04 §9 J-V4.30 | J-V4.30: chose an undercity clearance only while `disorder` is below a threshold, at a per |
| V04-0228 | decision | 9 | STATE | V04 §9 J-V4.31 | J-V4.31: chose the dungeon-map figure-ground (a hatched rock halo, voids in paper) over th |
| V04-0229 | decision | 9 | STATE | V04 §9 J-V4.32 | J-V4.32: chose rock as a light-blocking prism to the band's roof and the plan lines compos |
| V04-0230 | decision | 9 | STATE | V04 §9 J-V4.33 | J-V4.33: chose "lived only" lighting of the network's junctions and accesses over item 68  |
| V04-0231 | decision | 9 | STATE | V04 §9 J-V4.34 | J-V4.34: chose labels for named runs, systems (in their main band), undercity neighbourhoo |
| V04-0232 | decision | 9 | STATE | V04 §9 J-V4.35 | J-V4.35: chose the VTT band scene's walls from void kerbs, chamber walls and underground f |
| V04-0233 | decision | 9 | STATE | V04 §9 J-V4.36 | J-V4.36: chose glTF voids as inward-facing solids with the rock not exported, over exporti |
| V04-0234 | decision | 9 | STATE | V04 §9 J-V4.37 | J-V4.37: chose to reuse `Junction` records on underground parts, over a separate record, b |
| V04-0235 | decision | 9 | STATE | V04 §9 J-V4.38 | J-V4.38: chose `Chamber.kind` as a stored row reference, over inferring a cistern or an os |
| V04-0236 | decision | 9 | STATE | V04 §9 J-V4.39 | J-V4.39: chose `District.core` for an undercity neighbourhood's main chamber, over a searc |
| V04-0237 | decision | 9 | STATE | V04 §9 J-V4.40 | J-V4.40: chose the connection stage as the one writer of `District.outskirts`, over the un |
| V04-0238 | decision | 9 | STATE | V04 §9 J-V4.41 | J-V4.41: chose the family and the preset as two model controls in the advanced panel, over |
| V04-0239 | decision | 9 | STATE | V04 §9 J-V4.42 | J-V4.42: chose `LayerSpec.underView` with three modes over one fixed cut-away, because rel |
| V04-0240 | decision | 9 | STATE | V04 §9 J-V4.43 | J-V4.43: chose `Tunnel.serves` to list plots only, over plots or buildings, because a plot |
| V04-0241 | decision | 9 | STATE | V04 §9 J-V4.44 | J-V4.44: chose `Tunnel.chambers` as a view over its junctions' flags, over a stored field, |
| V04-0242 | decision | 9 | STATE | V04 §9 J-V4.45 | J-V4.45: chose to read the dossier's sanitation and subterranean records through two row s |
| V04-0243 | decision | 9 | STATE | V04 §9 J-V4.46 | J-V4.46: chose M6-U after M5 as the default slot, a parallel lane permitted, because the o |
| V04-0244 | decision | 9 | STATE | V04 §9 J-V4.47 | J-V4.47: chose invisibility as the parity metric and an owner panel without a reference, o |
| V04-0245 | decision | 9 | STATE | V04 §9 J-V4.48 | J-V4.48: chose to declare `Outfall` with S1 as the producer of `Terrain.outfalls`, and the |
| V04-0246 | decision | 9 | STATE | V04 §9 J-V4.49 | J-V4.49: chose to make a pre-U-NET document's underground by the version's upgrade event w |
| V04-0247 | decision | 9 | STATE | V04 §9 J-V4.50 | J-V4.50: chose to hold L5's pieces while their dossier institution is live, a delete refus |
| V04-0248 | decision | 9 | STATE | V04 §9 J-V4.51 | J-V4.51: chose to have underground plots sample the ground's prosperity field with its day |
| V04-0249 | decision | 9 | STATE | V04 §9 J-V4.52 | J-V4.52: chose a ruin laid as an ancient plan from a culture row (grid, axial, radial, ter |
| V04-0250 | decision | 9 | STATE | V04 §9 J-V4.53 | J-V4.53: chose the excavation state as a reading derived from the connection graph, recomp |
| V04-0251 | decision | 9 | STATE | V04 §9 J-V4.54 | J-V4.54: chose that the undercity never excavates a sealed void — it settles only accessib |
| V04-0252 | decision | 9 | STATE | V04 §9 J-V4.55 | J-V4.55: chose catacombs only under burial faces ranked by the burials they serve, the chu |
| V04-0253 | decision | 9 | STATE | V04 §9 J-V4.56 | J-V4.56: chose that the author's `delete` of catacomb galleries lowers `extentFloorM2` and |
| V04-0254 | decision | 9 | STATE | V04 §9 J-V4.57 | J-V4.57: chose the ruin's depth band [4, 30] m drawn by age (BCR-31) over g's 8–30 m, beca |
| V04-0255 | decision | 9 | STATE | V04 §9 J-V4.58 | J-V4.58: chose to admit `ruin` among the `historical` preset's undercity sources (BCR-42), |
| V04-0256 | decision | 9 | STATE | V04 §9 J-V4.59 | J-V4.59: chose one declared tail stage, T8, as the only writer of ground uses and househol |
| V04-0257 | decision | 9 | STATE | V04 §9 J-V4.60 | J-V4.60: chose to measure sewer-front existence at U2 (T-V4-41) with a pre-decided fallbac |
| V04-0258 | decision | 9 | STATE | V04 §9 J-V4.61 | J-V4.61: chose forced vaults under the oldest district for a required undercity where no c |
| V04-0259 | decision | 9 | STATE | V04 §9 J-V4.62 (amended mark, E-24) | J-V4.62: chose that only cavern and ruin parts read the excavation state, every other part |
| V04-0260 | decision | 9 | STATE | V04 §9 J-V4.63 | J-V4.63: chose to keep item 64's basement draw in U-LINK (after U-FRONT and U-CITY, whose  |
| V04-0261 | decision | 9 | STATE | V04 §9 J-V4.64 | J-V4.64: chose, below TOWN, a catacomb record's charnel vault as one `ossuary` chamber of  |
| V04-0262 | decision | 9 | STATE | V04 §9 J-V4.65 | J-V4.65: chose L5's always-successful last rung — a cellar chamber under the basement reac |
| V04-0263 | decision | 9 | STATE | V04 §9 J-V4.66 | J-V4.66: chose `underDistance` as the walkway path to an admitted access plus the street d |
| V04-0264 | decision | 9 | STATE | V04 §9 J-V4.67 | J-V4.67: chose chain mines that reuse or make a working at the hinterland edge sized by th |
| V04-0265 | decision | 9 | STATE | V04 §9 J-V4.68 | J-V4.68: chose to key a way-following run by its upstream station rounded to 1 m, over its |
| V04-0266 | decision | 9 | STATE | V04 §9 J-V4.69 | J-V4.69: chose the dig draw keyed by (building, void kind) with no epoch component, evalua |
| V04-0267 | decision | 9 | STATE | V04 §9 J-V4.70 | J-V4.70: chose stagnation's `fill` as a monotone maximum of the derived shortfall over an  |
| V04-0268 | decision | 9 | STATE | V04 §9 J-V4.71 (superseded by J-V4.114; stale figures dropped, V04-ICONF-2) | J-V4.71: chose an estimate of 25.75–35.75 pw over the critique's 24.25–34.25, because it a |
| V04-0269 | decision | 9 | STATE | V04 §9 J-V4.72 | J-V4.72: chose root-first outfall inverts with `freeboardCm` above the shore height, the s |
| V04-0270 | decision | 9 | STATE | V04 §9 J-V4.73 | J-V4.73: chose to connect `channel` plots to mains and culverts (BCR-28), over mains only, |
| V04-0271 | decision | 9 | STATE | V04 §9 J-V4.74 | J-V4.74: chose tunnel grilles as a derived view over a stored field, because they follow t |
| V04-0272 | decision | 9 | STATE | V04 §9 J-V4.75 | J-V4.75: chose that an unexcavated element is drawn, labelled, explained and exported only |
| V04-0273 | decision | 9 | STATE | V04 §9 J-V4.76 | J-V4.76: chose F6's scattered dwellings as blocks of the one underground pseudo-district ( |
| V04-0274 | decision | 9 | STATE | V04 §9 J-V4.77 | J-V4.77: chose to read "secret passage" as a `dug` gallery, whose `knownTo` exists, over a |
| V04-0275 | decision | 9 | STATE | V04 §9 J-V4.78 | J-V4.78: chose the undercity's first pick as a weighted draw over capacity × source weight |
| V04-0276 | decision | 9 | STATE | V04 §9 J-V4.79 | J-V4.79: chose a span's `use` as an eager base fact, fixed at the raised way's generation  |
| V04-0277 | decision | 9 | STATE | V04 §9 J-V4.80 | J-V4.80: chose the arch vault as an at-grade chamber of the `vaults` system (`ChamberKind` |
| V04-0278 | decision | 9 | STATE | V04 §9 J-V4.81 | J-V4.81: chose that an arch vault is no undercity void, never a fade candidate and never a |
| V04-0279 | decision | 9 | STATE | V04 §9 J-V4.82 | J-V4.82: chose raised-way piers, retaining-wall footings and buried aqueduct stretches as  |
| V04-0280 | decision | 9 | STATE | V04 §9 J-V4.83 | J-V4.83: chose to keep the base's aqueduct need test on eager inputs and this volume's cis |
| V04-0281 | decision | 9 | STATE | V04 §9 J-V4.84 | J-V4.84: chose monuments laid by V02's `layTiers` from the culture row's `monument` cell w |
| V04-0282 | decision | 9 | STATE | V04 §9 J-V4.85 | J-V4.85: chose a drop at a retaining wall as a steep segment between two wall-face knots w |
| V04-0283 | decision | 9 | STATE | V04 §9 J-V4.86 | J-V4.86: chose to make the necropolis's block nearest the centre one mausoleum chamber whe |
| V04-0284 | decision | 9 | STATE | V04 §9 J-V4.87 | J-V4.87: chose a monument budget of 0.5 ms p95 each over the critique's 2 ms, because `lay |
| V04-0285 | decision | 9 | STATE | V04 §9 J-V4.88 | J-V4.88: chose to count the arch-vault cap in the order raised ways were founded (their cr |
| V04-0286 | decision | 9 | STATE | V04 §9 J-V4.89 (amended mark, E-24) | J-V4.89: chose that a hand access from a church-class building to a catacomb is a hand cry |
| V04-0287 | decision | 9 | STATE | V04 §9 J-V4.90 | J-V4.90: chose a maintenance mode at village rungs for every inherited system, the sewer n |
| V04-0288 | decision | 9 | STATE | V04 §9 J-V4.91 | J-V4.91: chose that S11, run by F4, F6 and C4, writes `Entrance.faces: 'tunnel'`, over a p |
| V04-0289 | decision | 9 | STATE | V04 §9 J-V4.92 | J-V4.92: chose column points modelled from the chamber, with a colonnade decay per row, ov |
| V04-0290 | decision | 9 | STATE | V04 §9 J-V4.93 | J-V4.93: chose to file the span rule's constants (`raised.vaultShare`, the headroom and fa |
| V04-0291 | decision | 9 | STATE | V04 §9 J-V4.94 (superseded by J-V4.114; stale figures dropped, V04-ICONF-2) | J-V4.94: chose an estimate of 27.25–38 pw (item 110's parts and the two hand-offs, +1.5–2. |
| V04-0292 | decision | 9 | STATE | V04 §9 J-V4.95 | J-V4.95: chose the catacomb primary as a reading — the complex whose source serves the mos |
| V04-0293 | decision | 9 | STATE | V04 §9 J-V4.96 | J-V4.96: chose volume 1's one visibility rule for an access's surface head — its ground sy |
| V04-0294 | decision | 9 | STATE | V04 §9 J-V4.97 | J-V4.97: chose to ship no `underground` rows of volume 1's `hood.pins`, so an underground  |
| V04-0295 | decision | 9 | STATE | V04 §9 J-V4.98 | J-V4.98: chose `workedOut` as a derived reading — a mine's use closed, a chain inactive, a |
| V04-0296 | decision | 9 | STATE | V04 §9 J-V4.99 | J-V4.99: chose to keep a ruin whose dossier source is removed — `source.ref` cleared, repo |
| V04-0297 | decision | 9 | STATE | V04 §9 J-V4.100 | J-V4.100: chose one definition of public ground (a way corridor, an L1 square or gate-plaz |
| V04-0298 | decision | 9 | STATE | V04 §9 J-V4.101 | J-V4.101: chose that the underground never reads the sky layer — no dig, basement-access o |
| V04-0299 | decision | 9 | STATE | V04 §9 J-V4.102 | J-V4.102: chose to run volume 1's opening pass and write the `ruin.node` report line in th |
| V04-0300 | decision | 9 | STATE | V04 §9 J-V4.103 | J-V4.103: chose the underground's own lottery at the `decline` step after the fabric pool  |
| V04-0301 | decision | 9 | STATE | V04 §9 J-V4.104 (superseded by J-V4.114; stale figures dropped, V04-ICONF-2) | J-V4.104: chose to price the epoch contracts this round adds — the network laid whole at t |
| V04-0302 | decision | 9 | STATE | V04 §9 J-V4.105 | J-V4.105: chose to read `Recipe.product` in this volume's hood line — U-FORECAST and T2 —  |
| V04-0303 | decision | 9 | STATE | V04 §9 J-V4.106 | J-V4.106: chose to run volume 1's opening pass inside every commit that creates, removes o |
| V04-0304 | decision | 9 | STATE | V04 §9 J-V4.107 | J-V4.107: chose to let `placeAccess` make a public opening of a named kind at the nearest  |
| V04-0305 | decision | 9 | STATE | V04 §9 J-V4.108 | J-V4.108: chose to schedule the ruin's distinctness step and the undercity's parent after  |
| V04-0306 | decision | 9 | STATE | V04 §9 J-V4.109 | J-V4.109: chose an exported `Foundations.apply(doc, scope, cause)` applying V4 §3.5.0's ru |
| V04-0307 | decision | 9 | STATE | V04 §9 J-V4.110 | J-V4.110: chose to fill F6's new dwellings at an epoch only by volume 6's relocation of th |
| V04-0308 | decision | 9 | STATE | V04 §9 J-V4.111 | J-V4.111: chose to take the span's calamity deaths as `CatacombGrowth.grow`'s `opts.deaths |
| V04-0309 | decision | 9 | STATE | V04 §9 J-V4.112 | J-V4.112: chose to lay a raised grade's buried floor on the old grade point by point — `le |
| V04-0310 | decision | 9 | STATE | V04 §9 J-V4.113 | J-V4.113: chose, at a village rung, to record a mining use's outside-plot working breaking |
| V04-0311 | decision | 9 | STATE | V04 §9 J-V4.114 | J-V4.114: chose to price the second reconciliation at 0.5 pw — 0.25 in U3b (the village wo |
| V04-0312 | decision | 9 | STATE | V04 §9 J-V4.115 | J-V4.115: chose to run volume 1's opening pass in two more commits — a `regenerate` of a ` |
| V04-0313 | decision | 9 | STATE | V04 §9 J-V4.116 | J-V4.116: chose, in a hood document, to run U-FORECAST after the one-district allocation a |
| V04-0314 | decision | 9 | STATE | V04 §9 J-V4.117 | J-V4.117: *Reconciliation round 3's continuation (SCC-R2C-14).* Chose to bind every calibr |
| V04-0315 | decision | 9 | STATE | V04 §9 J-V4.118 | J-V4.118: *Reconciliation round 3's continuation (SCC-R2C-14).* Chose the pre-decided move |
| V04-0316 | decision | 9 | STATE | V04 §9 J-V4.119 | J-V4.119: *Reconciliation round 4's continuation (SR3-11).* Chose to read the base's "grou |
| V04-0317 | decision | 9 | STATE | V04 §9 J-V4.120 | J-V4.120: *Reconciliation round 4's continuation (SR3-11).* Chose that in a skeleton prefi |
| V04-0318 | decision | 9 | STATE | V04 §9 J-V4.121 | J-V4.121: *Reconciliation round 5 (SLR4-06); revised in round 6 (SLR5-01).* Chose to gate  |
| V04-0319 | rule | 10 | STATE | V04 §10 | §10 preamble: each BCR names the base heading, quotes current text once and gives new text |
| V04-0320 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-1 → file f item 205 (base text) | BCR-1: Terrain.outfalls comment (S1 (3)'s drainage outlets: one per 50 m bank stretch of e |
| V04-0321 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-2 → file f item 208 (base text) | BCR-2: Way line without flowToward; wayFall(way) reading (spine from-end height less to-en |
| V04-0322 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-3 → file f item 247 (base text) | BCR-3: Tunnel line gains outfall comment (re-seated when its shore moves), serves (plots d |
| V04-0323 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-4 → file f item 212 (base text) | BCR-4: District.outskirts comment ends 'written by the connection stage (II.7.6)'; Distric |
| V04-0324 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-5 → file f item 325 (base text) | BCR-5: StageDecl txForm line gains phase?: 'main'/'tail' (tail runs after the first paint; |
| V04-0325 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-6 → file f item 574 (base text) | BCR-6: §4.11's tunnel sentence replaced: candidates, weights and conversions are Undergrou |
| V04-0326 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-7 → file f item 330 (base text) | BCR-7: F-UNDER's ladder cell drops its sewer clause; new row F-NET (the sewer network cann |
| V04-0327 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-8 → file f item 355 (base text) | BCR-8: drawTunnel gains from?: PointsForm (two points, route derived at the dry run); draw |
| V04-0328 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-9 → file f item 403 (base text) | BCR-9: the Sewers control bullet gains two model controls in the advanced panel: Sewer lay |
| V04-0329 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-10 → file f item 278 (base text) | BCR-10: LayerSpec gains underView?: cutaway/overlay/solo (default cutaway; showUnexcavated |
| V04-0330 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-11 → file f item 475 (base text) | BCR-11: §12.4 row for the underground tail: p95 <= 10 ms at each village rung; p50 26/71/1 |
| V04-0331 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-12 → file f item 505 (base text) | BCR-12: @plat/under line after @plat/hood: the underground layer (staged, M6-U): network,  |
| V04-0332 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-13 → file f item 526 (base text) | BCR-13: after the M5 row the row 'M6-U - the underground layer (staged by the owner; built |
| V04-0333 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-14 → file f item 386 (base text) | BCR-14: DR17's rule cell: II.7's feature law - a sanitation record (matching tables/dossie |
| V04-0334 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-15 → file f item 484 (base text) | BCR-15: after the closure rule's group: 'The underground layer built (M6-U). T-V4-1 - T-V4 |
| V04-0335 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-19 → file f item 551 (base text) | BCR-19: II.7.3's navigable-run prediction: both predicted at S7b by the network forecast ( |
| V04-0336 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-20 → file f item 559 (base text) | BCR-20: II.7.6's buried town: its chambers their buildings' ground storeys and its squares |
| V04-0337 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-21 → file f item 555 (base text) | BCR-21: AccessPoint.state comment: set by the rule's row, an edit, or the access closures  |
| V04-0338 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-24 → file f item 561 (base text) | BCR-24: II.7.6's dug passages include those the connection stage digs at generation for an |
| V04-0339 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-27 → file f item 552 (base text) | BCR-27 (applied only if T-V4-41 fails at U2; J-V4.60): II.7.3's surface test only for a pl |
| V04-0340 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-31 → file f item 563 (base text) | BCR-31: II.7.6 depth bands: ruins 4-30 m by age (item 109 (c); superseding g's 8-30 m). BC |
| V04-0341 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-36 → file f item 564 (base text) | BCR-36: II.7.6's catacomb chances (churchyard 0.25/0.4/0.5; cemetery or Cemetery network g |
| V04-0342 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-40 → file f item 407 (base text) | BCR-40: §8.2's states chamber row keyed by Chamber.kind (ossuary niche ticks densening wit |
| V04-0343 | bcr | 10 | BCR→f | V04 §10 row BCR-V4-45 → file f item 291 (base text) | BCR-45: the raised-way record (g 110 (b), homed in §2.7) gains supports {key minted once a |
| V04-0344 | owner-question | 11 | STATE | V04 §11 (Q1, Q2 answered, J122) | §11 Q1 when to build the underground: recommendation M6-U right after stage 2 (M5); if a s |
| V04-0345 | rule | 12 | STATE | V04 §12 (one CONFIRMED/PLAUSIBLE list; round receipts to the validation records) | CONFIRMED vs PLAUSIBLE: CONFIRMED (executed evidence at the recorded dates): the base read |
| V04-0346 | handoff | 13 | STATE | V04 §13 (empty) and this report's hand-off table | Hand-offs listed in §13 (to close at their destinations): V01 V1-3.15 'The switch's edit', |
| V04-0347 | rule | IN | STATE | folded into the body at its home; V04 Integration notes table lists it | IN-V04-1: growthCapShare is V11's 0.01 per year compounded over the epoch's span (V11 §3.2 |
| V04-0348 | rule | IN | STATE | folded into the body at its home; V04 Integration notes table lists it | IN-V04-2: the ruin stage lays a stepped monument by calling V02's drawTiers (ST1 on the ru |
| V04-0349 | term | 3.2 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | service region R, run, trunk, drop, field outfall, culvert: R = ground districts not hinte |
| V04-0350 | term | 3.5.0 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | within reach / foundation obstacle / pillar: an element's plan band meets an obstacle's fo |
| V04-0351 | term | 3.1 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | maintenance mode: an inherited system at a village rung re-derives its own part from kept  |
| V04-0352 | term | 3.1 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | hood line: the tail's rules in a standalone neighbourhood (Recipe.product 'hood'): the bel |
| V04-0353 | term | 3.5.7 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | cluster / excavation reading / accessible / unexcavated: a connected component of a part's |
| V04-0354 | term | 3.5.1 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | burial face / primary / stagnant / closed face / ratchet / quarry ossuary / charnel vault: |
| V04-0355 | term | 3.9 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | lived: a run, system or cluster carrying plots or within litReachM of one; lit only when l |
| V04-0356 | term | 3.5.3 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | working / surface quarry / worked out: a 4-connected group of taken stone or ore cells as  |
| V04-0357 | term | 3.5.4 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | arch vault / span / terminal cistern: an at-grade archVault chamber in a raised way's vaul |
| V04-0358 | term | 3.5.0a | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | ruin / culture row / significance / persistence class / mausoleum / monument / colonnade r |
| V04-0359 | term | 3.6 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | undercity core / plaza / walkway / carve / outskirts / underground pseudo-district: a neig |
| V04-0360 | term | 3.5.7 | TERM | the term as used in the text (canon glossary; retired synonyms replaced) | overlap / mine breach / proximity link / crypt join / dig / public opening / reuse: the U- |
