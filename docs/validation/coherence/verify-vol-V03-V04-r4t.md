# Verify round 4 — volumes V03 (Interiors) and V04 (the underground) — lane coherence/verify-vol-V03-V04-r4t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V03-V04-r4t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V03-V04-r4t`, 2026-10-01)
- P0 brief read whole (ROUND-4 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-3 result (6 issues) read; adjudication-r4's R4-01 – R4-04, R4-09 – R4-12, Part H (V03, V04, and the units owning my round-3 ids and END lines) read; repair-r4-V03 and -V04 reports read; live V03 9af5ffd5…, V04 6aebc1e1… equal assemble-r4's after: done
- P1 round-3 ids VV34-r3-01 – -06 re-checked at their owners (V06, V03, model, V10, rendering, V09, scope): done — all six FIXED (VV34-r3-01 closed by VV56-r2-06's fix per R4-03, every end written)
- P2 round-4 fixes in scope (V03: VAP-r3-04, VAT3-r3-07, VV12-r3-04, VV12-r3-06; V04: VAL-R3-03, -05, -09, VAP-r3-05, END of VAL-R3-01) and their second ends: done — all applied, ends at V05, V06, V09, V01 present; V04's hand-off on the frame growth's deck extension checked against §2.7 (5) and §3.2 (9): one new MAJOR drafted (model)
- P3 every round-4 block of V03 (10) and V04 (18) read, each changed subsection whole: done (V03 18 hunks, V04 29 hunks; r3 text from commit 96bdae2, sha256 f4458cf4… and 0e3bcacd…)
- P4 references, ids, terms, phone, deferral, review ids; §8 against §16 and INDEX; doc_checks (provisional): done
- P5 issues, result saved, LANDED: done

Scope: V03 (`docs/volumes/V03-interiors.md`, 3 304 lines) and V04 (`docs/volumes/V04-underground.md`, 3 628 lines) after
repair round 4 as assemble-r4 installed them (V03 f4458cf4… → 9af5ffd5…, V04 0e3bcacd… → 6aebc1e1…; live hashes equal
assemble-r4's "after"). Binding: adjudication-r4 (R4-01 – R4-16, Part H) and the earlier adjudication files where not
superseded by name. Grades by J141's severity standard.

## 1 Round-3 findings re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| VV34-r3-01 (blocker) | V06 | **FIXED** — MERGED into VV56-r2-06, fixed per R4-03 with all its ends | V06 §3.23 (3) (l. 3433–3447: "save that an element a restoring event's re-cut mints … enters the plan, for its damage, at the week that restoration ends: its `repair` Works' FINISHED week, or the week a decay run that begins before then starts … with no Works, the event's effective week. Before that week it is drawn as built"); `decayPeak`'s `since` comment (l. 3408); §3.21's decay row (l. 3300: the `reoccupy` case and its outcome); T-V6-76 (b) (l. 4184); J-V6.139. Ends: V03 §5.6 (2) (a) ("an element is compared with the level only from its entry week ((b); V06 §3.23 (3))") and (b) (the restoring re-cut's entry week), V03 §1b's and §2.5's `planDamage` rows, §3.13's damage row, T-V3-39 (c), §13's V06 row; model §2.6 step 7 (base l. 2100); V10 §3.9a (l. 1856). |
| VV34-r3-02 (major) | rendering | **FIXED** as written | base §8.6's floor-area row (l. 14084: by kind — `upperFloor` a hole, `groundFloor` a rotten patch "at ground level, under it, or a wing's first storey on a solid wing"); the `ruined` sentence (l. 14095: "leaving the ground storey — with a solid wing's first storey — the only one that can be walked"). |
| VV34-r3-03 (major) | V09 | **FIXED** as written | V09 §4.21.13 (1) (l. 3684: "`storeyGone` once every `upperFloor` area of a storey shows damaged (V03 §4.6's rule)"); T-V9-86 (l. 4409: "a `ruined` building at level 1 shows no `storeyGone` line for its ground storey"); row 92 agrees. |
| VV34-r3-04 (minor) | scope | **FIXED** as written | §16's M6-U row (base l. 20199: "item 123's damage below ground at the later of U5 and V03's P4 (V04 §5.6 (6))"). |
| VV34-r3-05 (minor) | V03 | **FIXED** as written | V03 §7's damage fixtures (l. 2850–2852: "a district of houses ruined by a fixture calamity through its linked `reconstruction` condition's `ConditionOverlay` (V08 §3.16 (7) (b): `event` `calamity`; …) and under a `disaster` preview"); T-V3-40's head (l. 2907). |
| VV34-r3-06 (minor) | V03 | **FIXED** as written (agrees with R4-03) | `PlanDamage.own`'s comment (V03 l. 2682–2683: "0 for a standing building outside a run and any restoration (V06 §3.23 (2)–(3))"). |

## 2 Round-4 fixes in scope and their second ends

**V03** (6 issues, 1 END line; repair-r4-V03):
* **VAP-r3-04** (FIX per R4-11) — T-V3-40 (b) stages no withholding key: "under View as at `public`, `local` and `secret`
  the same drawing, the condition `public` (§7.7's DR44); a `none`-row condition carried beside it draws, lists and counts
  nothing at any key" — R4-11's text. Sweep: §3.13's look row conformed (edge "a `none`-row condition carried beside the
  look, and View as at each key", outcome in R4-11's form). §5.6 (4)–(5)'s general sentences stand (R4-11). **Applied.**
* **VAT3-r3-07** — §5.6 (4): "draws its own level from the week its change shows (V06 §3.23 (1))". **Applied.**
* **VV12-r3-04** (FIX per R4-04) — §5.6 (4) "on a plot V07's `villageUnitPlots(doc, unit)` gives a unit it returns (V07
  §5.6 (3): its ends, or in an end-less thorp its toft groups)"; §1b's row "V07 §5.6 (3)'s units and `villageUnitPlots`";
  §3.13's look row (the issue's "§3.18" is V03 §3.13's row at l. 2095). R4-04 (a)'s sweep: ## 1, §1b's dossier bullet,
  §5.6's lead, ## 6's look row, J-V3.139, J-V3.140. The edge's test: T-V3-40 (b) gains the village clause on V07's
  T-V7-69 fixtures, which hold THORP, HAMLET and VILLAGE fixtures with and without an end (V07 l. 3676); its landing (the
  later of P4 and V-M3) matches V07's (V-M3 carries `villageDisasterUnits`, V07 l. 3709; T-V7-69's "later of V-M3 and
  M5"). R4-04 (b)'s predicate was already §5.6 (4)'s reading. **Applied.**
* **VV12-r3-06** — `PlanDamage.look`'s comment names V02 §2.4's `pattern` (V02 l. 568: `pattern: 'fire' | 'flood' |
  'scatter'`). **Applied.**
* **VV34-r3-05**, **VV34-r3-06** — section 1.
* **END of VV56-r2-06** (R4-03) — section 1's VV34-r3-01 row.

**V04** (4 issues, 1 END line; repair-r4-V04):
* **VAL-R3-03** (FIX per R4-09, amended: one trigger) — `ArchVaults.reconcile` and the `foundationObstacles` re-read run in
  the commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it: §1b.2's row (l. 328),
  §2.6's arch-vault row (l. 867), §4.3's edit row (l. 2579; the issue's "§3.10's edit row (l. 2572)" is §4.3's row — the
  span-`use` row folded into it with its outcome kept in a parenthesis: equivalence holds, a `use` edit moves no support,
  so the wider re-reads return the same), §1b.3's edit row (T3 `wall` added), §3.5.0 *At an epoch*, §3.10's epoch
  reconcile bullet, ## 6's edit budget; T-V4-63's fixture (an epoch circuit and a hand `drawWall` across a viaduct with a
  `vault` span; a frame growth extending an aqueduct's deck). V06's END (`EpochScope.raised`, V06 l. 465; W64, l. 347)
  reads R4-09's text. The V04 repair's hand-off on the frame growth's deck extension is section 3's VV34-r4-01.
  **Applied.**
* **VAL-R3-05** (FIX per R4-12) — §5.1 *Find on Below*: `underFindPlaces`' `doc` is the model the view draws; (6) re-reads
  at each change of §2.9's `week`; new (7) *At a drawn week*; the rows at §1b.1, §1b.2 and §2.6; UE32's E8; T-V4-81 (j).
  Ends: V05 §5.6 (5) (l. 2336: "At a drawn week whose frame is not the head …, an island's matches, glow, pins, ghost pins
  and gaps are §11.2's listing at that week, each drawn at its island's anchor in that frame"); V09 §4.21.10 (7) (l. 3523–
  3525: "each passed the model the view draws (at a drawn week whose frame is not the head, that frame, V06 §3.15.2)") and
  (8)'s drawn-week sentence; V01's `gapUnits(chip, key, week?)` (V01 l. 547, §5.4 (3)). **Applied, both ends present.**
* **VAL-R3-09** (FIX per R4-04) — §5.6 (1): "at the village rungs V07 §5.6 (3)'s units, its ends or an end-less thorp's
  toft groups, all of part 0's plots (V01 §3.16 (1)) — so no look stands over it", and the look clause in R4-04 (b)'s
  predicate. Sweep: UE33's E7, J-V4.130. **Applied.**
* **VAP-r3-05** (FIX per R4-11) — T-V4-82 (i): the withholding key dropped; "under View as at `public`, `local` and
  `secret` the same drawing, the condition `public` (§7.7's DR44), and a `none`-row condition carried beside it changing
  no crypt's drawing at any key". **Applied.**
* **END of VAL-R3-01** (R4-02) — §5.1's lead: "When the underground layer is drawn — visible, or Below the view's working
  layer (§8.4) — one depth band draws at a time". Rendering's ends (§8.4's *Toggles are visibility*, l. 13577 ff.; §9's
  candidate set, l. 14797; `ExportOpts.layers`, l. 16215) are written. V04's sweep: §5.1 (2)'s **Go there** ("view keys
  only, Below drawn whatever its visibility (§8.4), no event sent"), §5.1's document-open sentence, §5.4's candidates,
  ## 6 *View*, UE20 E7, UE27 E7, UE32 E7, T-V4-81 (b) ("0 events logged and `LayerSpec.visible` unchanged"), and "active
  layer" → the glossary term "working layer" (principle (2); V09 §4.2). **Applied.**

## 3 Round-4 blocks read whole — new problems

Every changed subsection of both volumes was read whole against the r3 text (word diff), the rulings and the texts it
cites. One new problem:

* **VV34-r4-01 (MAJOR, model) — a frame growth's deck extension: old stations kept or re-spaced?** V04's round-4 trigger
  names "the frame growth's deck extension" among the epoch changes to a raised way (§3.5.0 *At an epoch*, l. 1340–1343;
  §3.10, l. 2286–2289; §1b.2; T-V4-63), and §3.5.0 keeps "An epoch op removes no obstacle … so the element set it
  collapses is the one a regeneration of the same state collapses (T-V4-65; V06's T-V6-67)" — `Foundations.apply` being
  collapse-only. Whether the extension keeps the old deck's stations is stated nowhere. §3.2 (9) (base l. 3667) and
  `RaisedFoot` (l. 2313–2317) say only "the raised way's re-derivation then extends the deck to the new ring … as §4.11
  continues a through-road"; the support step that re-derivation runs spaces the n − 1 interior stations evenly at
  L ÷ n over the whole deck ((2), l. 2534) and, for a changed course, keeps only the *key* of a station within p ÷ 2 of a
  former one ((5), l. 2571–2573), so as L grows every old pier may move by up to p ÷ 2; support step (6) (b) (l. 2596–2598)
  holds a standing raised way ("nothing laid later … moves, adds or omits a station") but lists "a frame growth's
  extension of its deck, §3.2 (9)" among the ops that change it without saying how; T110-2's frame-growth clause (l.
  18394–18397) tests only the foot's ends. One builder re-spaces the whole deck: old footings leave, V04's collapse-only
  `Foundations.apply` keeps elements `collapsed` and pillars standing under no pier (unequal to a regeneration —
  T-V4-65's at-epoch bar fails), and a re-sited pier can land on a building raised since generation (plots and
  footprints are no obstacle of (3); S8 holed them round the old rings), against (6) (b)'s held reservation. Another
  keeps the old stations and lays stations on the extension only. The V04 repair left exactly this as a hand-off ("the
  base's text decides"); the base's text does not decide it. Graded MAJOR (two builders, two behaviours; the frame
  growth over a ring-end raised way is not the common path — the re-spacing reading's pier-in-a-building outcome would
  be a blocker's impossible result there).

Checked, not raised (each with its reason):
* **V04 §4.1's toggle coupling (inventory V04-0168).** The archive's "showing the underground layer makes it the active
  layer until the user picks another" is gone; §4.1 now reads "The toolkit's layer is the view's working layer (V09
  §4.2's switch, a per-viewer view key; Below drawn whatever its visibility, §8.4)". Since R3-21 (a) the layer's
  visibility is document style written by a logged `setLayer` (a host's command included), and R4-02's home text (§8.4,
  l. 13581–13585) and V09 §4.2 enumerate what switches the working layer (the view bar, Find's **Go there**, a clerk's
  `useTool`); the toggle is none of them. The repair resolved a conflict at the base's home (principle (3) (b), R4-02),
  recorded with its reason; no builder reading the set builds the coupling. Not raised.
* **V04's trigger list naming `crossings`** (§1b.2, §2.6, §4.3) — the `setAttr` path V09 l. 1699 offers on a selected
  raised way (`crossings/<wall>/form`); a form edit moves no foot, support or span, and the reconcile is idempotent, so
  nothing built changes. Not raised.
* **V03's hand-off 1 (§16's M3b row and V-M3)** — §16's village row (base l. 20195) already places "items 111, 113–120
  and 122 at the village rungs" in V-M1 – V-M4, which agrees with V03 §8, T-V3-40 and V07 §8. No finding.
* **T-V3-39 (c)'s new case** (a restoring re-cut under a `repair` Works running past its epoch's week) names its fixture
  inline ("a `reoccupy` from derelict by other occupants"); V06's T-V6-76 (b) bars the same case. No finding.
* **"shown" in T-V4-81 (b) and §5.1 (3)** — pre-existing wording; R4-02 (d) reads "the layers the view shows" as "draws",
  and V04's UE32 E7 now says when a Below match is a ghost pin. No finding.
* **Arch vaults beside a new crossing station** (§3.5.4 (d) (2) reads a bounding support's `state`; a crossing station's
  support has none) — a stretch under a crossing station is breached only by a landfall, which ruins the spans beside
  it, or after both spans have fallen (§2.7's support step (3)), so the span's own `state` collapses the vault in every
  case. No finding.

## 4 Standing checks

* **Ids.** No T-V3, T-V4, J-V3, J-V4, UE or UC id added or removed this round; no duplicate id in either volume (40 T-V3
  rows, 82 T-V4 rows checked).
* **References.** assemble-r4's resolver: 0 broken across the set; V03's 12 and V04's 1 ambiguous-form references are
  the pre-existing ones (the four new ambiguous ones of the round lie in the base, V06 and V11); every citation the
  round's text added was read at its target (sections 1–3).
* **Review ids, deferral, phone.** The 110 added lines hold no `R2-`/`R3-`/`R4-` or verifier id but the record ids of
  V03 §13's Fix-list row (`VV56-r2-06, VAT2-r2-09`, a record, as R3-02 allows); every "later" is temporal ("the later of",
  "a later `extend`"); no phone clause (item 126 (a2)).
* **Retired terms.** The canon's 35 retired patterns over both volumes: only false positives — "hand-over" (the disaster
  look's hand-over, V06 §3.22 (3), not G-unitinput's retired unit-run view) and "standalone neighbourhood document" (the
  canonical term, which G-standalone's pattern matches inside "lone neighbourhood document").
* **Cohesion.** V03 §8's total 19–26 pw (base §16's effort row 18.25–25 = 19–26 less PE's 0.75–1) and V04 §8's 28.5–39.5
  pw (§16's M6-U row and effort row) unchanged; V03's P4 exit and T-V3-40's how-measured cell agree on the village
  clause's landing; §16's M6-U row now names the later of U5 and V03's P4.
* **Size.** Words (wc -w): V03 77 506 → 77 889 (+383; archive 81 106, −4.0 % overall); V04 83 268 → 84 394 (+1 126;
  archive 82 301, +2.5 % overall). Neither unit shrank by more than half, so no NUANCE-LOST audit is triggered; this
  round's additions are the fixes' design.
* **doc_checks** (`docs/validation/bench/doc_checks.py --heads docs/ARCHITECTURE.md`): WARNING — reference corpus
  INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing); the result is
  NOT authoritative, PROVISIONAL. V03: C1 0, C2 0, C3 367 (281 unreviewed), C4 2 (0), S1 0, S2 197 (0) — no new
  unreviewed C3 run against r3. V04: C1 0, C2 0, C3 219 (195 unreviewed; one new run against r3, "re read in the same",
  own common phrasing from "re-read in the same commit"), C4 0, S1 0, S2 153 (2 unreviewed, the pre-existing §3.24
  pointers).

## 5 Issues

**1 issue — 0 blocker, 1 major, 0 minor.** Round 3's six are closed.

| id | severity | kind | owner | claim (short) |
|---|---|---|---|---|
| VV34-r4-01 | major | EDGE-UNDEFINED | model | a frame growth's deck extension may re-space the old deck's stations by §2.7 (2)/(5), against V04 §3.5.0's collapse-only equality and support step (6) (b)'s held raised way |

**VV34-r4-01** — required change. Model §2.7's support step (6) (b), after "… a frame growth's extension of its deck,
§3.2 (9)), and none drops it.": add "A frame growth's extension keeps every station of the old deck — its key, position
and support `ring` — and every span between them with its `use` and `reason`; (1)–(5) and the span rule run on the
extension alone, from the old deck's last interior station to the deck's new end on the new ring, its stations' keys
minted after the largest the way has held ((5)); so no pier of the old deck moves and no footing leaves (V04 §3.5.0 *At an
epoch*)." The `RaisedFoot` comment's "then extends the deck to the new ring as §4.11 continues a through-road" adds "(the
old deck's stations kept, the support step's (6) (b))". Ends: scope §13.2's T110-2 frame-growth clause adds "every
station of the old deck at its key, position and ring after the growth"; V04 T-V4-65's at-epoch clause adds "and an
aqueduct whose deck a frame growth extends over a cavern chamber within reach of its piers: no old pier moved, the
collapsed set equal to a regeneration's".
