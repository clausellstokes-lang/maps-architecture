# Retrovalidation 2026-10-18 — confirm-prosperity

Lane: retrovalidation/confirm-prosperity (Fable/high; J392), the confirming check on retrovalidation/apply-prosperity
(Opus/high; J390, Fable-checked). Checked 05:41–05:46 UTC.

**Verdict on apply-prosperity: PASS.** Every one of the 34 prosperity-family corrections landed exactly as
`prosperity.verdict.json` gives it, nothing else in the file moved, the notice line is the verdict's, the bundle is fresh.
Two pointers inside landed new texts have since drifted because other lanes edited the files they point at (not this
apply's doing), and eleven cross-family corrections of this verdict are still unapplied with no owning lane; both are
listed under "For close-gaps / J392" with exact fixes.

## Read whole

- `docs/validation/retrovalidation-2026-10-18/prosperity.verdict.json` (46 corrections: 41 research, 1 design, 4 record;
  52 rulings; `notice_replacement`; summary) — dumped readable to the scratchpad
  (`…/scratchpad/retro/confirm-prosperity/verdict-dump.txt`) and read entire.
- `docs/validation/retrovalidation-2026-10-18/apply-prosperity.md` (the lane record).
- The before-copy `…/scratchpad/retro/apply-prosperity/prosperity-system.before.md`: 1,116 lines, md5
  `2adf55d6b30854a5faa7f06d2ef0859a` (matches the record).
- The live `research/sf/prosperity-system.md`: 1,115 lines, md5 `da8834f375f056d1139d9a35c653c7cb` (matches the record),
  read whole in four passes (1–300, 301–600, 601–900, 901–1115).
- The full before→after diff (`diff -u`: 294 lines, 26 hunks; the record's "33 hunks" is the `-U0` count — 35 fragments
  less the two contiguous pairs C21/C22 at l. 100–104 and C26/C27 at l. 945–946 — so both counts are right for their context).

## Independent re-check (script `…/scratchpad/retro/confirm-prosperity/check.py`, 05:42 UTC)

| Check | Result |
|---|---|
| Each of C1–C34 `old` in the before-copy | exactly once, all 34 |
| Each of C1–C34 `new` in the before-copy | absent, all 34 |
| Each `new` in the live file | exactly once, all 34 |
| Each `old` in the live file | absent for 27; for C23, C26, C27, C31, C32, C33, C34 the old survives only as the prefix of its own new (the correction appends a dated bracket), once each |
| Line each `new` now sits on | equals the apply table's "Line after" for all 34 (C1 46, C2 675, C3 226, C4 275, C5 61, C6 912, C7 314, C8 337, C9 191, C10 1090, C11 702, C12 535, C13 546, C14 643, C15 878, C16 908, C17 654, C18 455, C19 570, C20 900, C21 102, C22 100, C23 772, C24 779, C25 783, C26 945, C27 946, C28 1097, C29 94, C30 776, C31 393, C32 924, C33 850, C34 939) |
| Forward replay (before-copy + notice swap + C1…C34 in order) | byte-identical to the live file |
| Reverse replay (live − C34…C1 + the old notice) | byte-identical to the before-copy |
| Lines beginning `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat` | 1 before (l. 3, seat `research/sf-prosperity`); 0 after |
| Live l. 3 | equals `notice_replacement` character for character; it occurs once in the file |
| The dated brackets | carried exactly as the verdict's `new` texts give them (no paraphrase) |
| `python3 tools/bundle_architecture.py --check` | "UP TO DATE", exit 0; the note is not a bundle source (no match in the tool) |
| Any correction aimed at `docs/PROGRESS.md` | none; the record's "For J392: nothing" is right |

So the record's claims — exact matches throughout, no adjustment, 1,116 → 1,115 (C3's join), both md5s, the round trip —
all reproduce.

## The host lines the landed new texts cite (read at 81f1cd96, read-only)

Confirmed as quoted or described: `econ/prosperity.js:182-192` (route base: crossroads/port 3; disconnected thorp or hamlet
0; disconnected with teleportation infra and magic 2, else 1; road/river 2) and `:160` (`plague_onset` −1); `rd/state.js:403`
(13 + round(26 × importance)); `wp/roadsKernel.js:827-836` (term-end pays both; party ransom the captor's step only; rescue,
captor gone, occupied, peace none); `wp/settlementLifecycleFirstClass.js:410-412` (:410 blank, "nearby prosperity" at
:411-412); `wp/conquestFeeds.js:61`, `:71`, `:77` (captive decay 0.06, loot decay 0.09, weight 0.35 — half-lives about 11
and 7 weeks); `sp/embattlement.js:82`, `:245-247` (`RELAX_RATE` 0.12 applied as `priorLevel × (1 − 0.12)`: multiplicative);
`src/domain/compendium/bandLadders.js:220` ("Not a dial you set. An output you read."); `wp/supplyKernel.js:590-591`
("economicState is NEVER written"); `src/domain/conditionPromotion.js:124` (clamp −0.25…0.18) and `:201` (the modifier only
when `severity == null`); `tr/genesis.js:394-398` (founding core takes the tier index; an addition draws between its birth
tier and the tier index); `wp/upswingKernel.js:121` ("receipted") and `:644-653` (`BOOM_EXIT_THROUGHPUT` is the building-phase
continuation threshold, not a boom-exit gate); `tm/townMapModel.js:368`, `:400`, `:485` (wealth carried on the model);
`wp/simulationRules.js:889-892` (the two declared paths); `wp/temperamentPresets.js:38-43` (two RR-based temperaments),
`src/components/temperament/TemperamentPicker.jsx:33-34`, `src/components/map/SimulationRulesDialog.jsx:70-81` (grid of SC,
NC, LR, FS), `src/hooks/useRealmInspector.js:247-250`; `tm/arch/settlementDress.js:37` and `tm/arch/conditionParams.js:46`
import the grammar; `src/domain/display/economyFreshness.js:6-12` (no economy pass; prosperity keeps its generation value);
`src/domain/events/registryRerunKeys.js:19-30` (a functional classifier for the freshness note) and `:68`;
`src/generators/steps/resolveStress.js:126-130` (overlays `config.stressorEdits.added`); `sp/migration.js:78-81` (0.15 /
0.4 / 0.25 / 0.2); host docs UPSWING `:12`, `:103` ("receipted", "receipt-visible"), FOLD `:340` ("EC-0..EC-18"), EC `:2240-2244`.

One wording checked harder: C19's "read by `src/domain/display/economyFreshness.js` alone". The table's importers are
`economyFreshness.js` (the functional read, `:116`, `:135`), `registryFull.js` (a bare re-export, `:38`) and nothing else;
`src/domain/events/batch.js` names it only in comments, and its own note (`:261-262`) says the rerun keys were REMOVED from
the batch envelope on 2026-07-14. The claim holds: one functional reader, no rerun engine. The mechanism C19 and C36 state
(no economy pass on Apply-stressor; the authored stress persists in `config.stressorEdits` and lowers the generated band
only at the next regeneration from config) stands at 81f1cd96.

## Cross-file pointers inside the landed new texts

| Pointer (where in the note) | Now | Status |
|---|---|---|
| `research/sf/fp-realm-review.md:611` J-RR.52 (l. 104, 181, 183) | J-RR.52 is at :611 | holds |
| `docs/PROGRESS.md:443` J384 (l. 101, 104, 772, 783, 945, 946) | J384 is at :443 | holds |
| `docs/AMENDMENTS-2026-10-17m.md:630` "never a garrison and standing split" (l. 180) | the phrase is at :630; "garrison and standing bands" and "a new banding of its strength facets" occur 0 times in that file | holds |
| `research/sf/trade-system.md` §9 item 6, §3.7 (l. 777, 850, 924) | section references | hold |
| `research/sf/population-system.md:417`, row C (l. 455, C18) | row C is at **:416** (apply-population's C-4a joined two lines at l. 141, 1,091 → 1,090, after the verdict was judged at 04:31) | **drifted by other lane's edit** — fix below |
| `research/sf/plague-system.md:364-366` and `:368-371` (l. 570, C19) | §3.12's heading is at :368, its pulse-lanes paragraph :370-371, its DM-authored paragraph :372-375 (apply-plague shifted the section +4 after judging; the before-copy had the heading at :364 and the DM paragraph at :368-371) | **drifted by other lane's edit** — fix below |

## The verdict's twelve non-family corrections (read-only, 05:43 UTC)

| Correction | File | Old / new now | Owner |
|---|---|---|---|
| C42 (design) | `docs/volumes/V13-world.md` §5.9 (7) drift note | old 0, **new 1** (l. 3405) | applied by apply-design (amendments file s items 935 and 930; bundle fresh) |
| C35 (research) | `research/sf/trade-system.md` l. 334 | old 1, new 0 | none — apply-trade left it as prosperity's, apply-prosperity as trade's; confirm-trade named it for close-gaps |
| C36–C41 (research) | `research/sf/plague-system.md` §3.12 (l. 372), §1, the DM walkthrough, the §7 row, P9, M7 | each old 1, new 0 | none — the plague lane's verdict (its notice: "sixteen research corrections") did not carry F17 |
| C43–C46 (record) | `docs/HOST-REQUIREMENTS-2026-10-18.md` l. 736, 412, 420, 425 | each old 1, new 0 | none — plus the verdict's note that the document's Claude-doc mirror is the session's to re-place |

All eleven unapplied `old` texts still occur exactly once in their files and none of the `new` texts is present, so each
is cleanly applicable by exact match now. The owner's "no deferrals" rule means they must land; they are outside this lane's
files, so they are named here for the close-gaps lane (or J392).

## For close-gaps / J392 — exact fixes

1. `research/sf/prosperity-system.md` l. 455: replace "`research/sf/population-system.md:417`, row C" with
   "`research/sf/population-system.md:416`, row C".
2. `research/sf/prosperity-system.md` l. 570: replace "`research/sf/plague-system.md:364-366` for the pulse lanes" with
   "`research/sf/plague-system.md` §3.12, first paragraph, for the pulse lanes" and "that note's :368-371 said" with
   "that note's §3.12, second paragraph, said" (a section pointer, because C36–C41 will move the lines again when applied).
3. Apply C35 to `research/sf/trade-system.md` (old once at l. 334).
4. Apply C36–C41 to `research/sf/plague-system.md` (each old once; C36 at l. 372–374).
5. Apply C43–C46 to `docs/HOST-REQUIREMENTS-2026-10-18.md` (old once at l. 736, 412, 420, 425) and re-place its Claude-doc
   mirror as the verdict's summary asks.

Nothing from this lane for `docs/PROGRESS.md` beyond those; no J-row is named by the prosperity verdict.

## Mechanics

No git command run; the host repository read only; no file edited but this record and `docs/lane-events.log`. Long output
in `…/scratchpad/retro/confirm-prosperity/` (`verdict-dump.txt`, `check.py`, `before-after.diff`).
