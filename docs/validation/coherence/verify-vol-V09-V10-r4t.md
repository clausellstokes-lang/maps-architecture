# Verify V09 and V10 after repair round 4 (coherence/verify-vol-V09-V10-r4t)

> PENDING FABLE REVIEW — written by opus standing in for the Fable verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V09-V10-r4t`, 2026-10-01)
- P1 brief read whole; round-3 result (8 issues) read; adjudication-r4 rulings binding V09/V10 (R4-01 – R4-05, R4-09, R4-10, R4-12, R4-14, R4-16) and Part H · V09, V10, END lines for V09/V10 read; live = assemble-r4 after shas (V09 b49c6014…, V10 3fd16e69…); pre-r4 = 6c640e5^ (V09 cfe4df19…, V10 382ea60e…): done
- P2 round-3 findings re-checked (VV910-r3-01..-08): all 8 closed — -01, -02 (per R4-04 (c), `over`), -03, -06, -07 FIXED; -04 via VAH-r3-01, -05 via VAH-r3-09 (V07), -08 via VAH-r3-03 (R4-14) FIXED as merged: done
- P3 round-4 blocks read whole (V09 12 replaced units, V10 15; every END line for V09/V10 and every other-seat issue V09/V10 own checked in the live text): done — 4 new issues (3 major, 1 minor); VDC4-06/-07 (determinism's, owner V09) confirmed, not re-raised
- P4 mechanical checks: ids unique, refs 0 broken, retired terms 0 new, deferral 0, phone ok, review ids only in records, totals unchanged, doc_checks provisional: done
- P5 report and result: written; LANDED

## Inputs and scope

* **Live text** = assemble-r4's output, sha256 checked: `docs/volumes/V09-application.md` b49c6014c7b8e61d… (760 527 B,
  4 993 lines), `docs/volumes/V10-clerk.md` 3fd16e696cb259f5… (515 733 B, 3 555 lines). **Pre-round-4** = commit
  6c640e5^ (V09 cfe4df195892…, V10 382ea60eedc4…, assemble-r3's after hashes). Design files untouched by this seat.
* **Round-4 blocks in scope:** repair-r4-V09 (12 REPLACE: §1b, §2.6, §2.7, §2.12, §3.16, §4.2, §4.9, §4.20.2, §4.21,
  §5.4, §5.8, §7.1) and repair-r4-V10 (15 REPLACE: §1.2, §1b.1, §2.3, §2.12, §2.13, §3.3, §3.5, §3.9, §3.9a, §3.9b,
  §3.17, §3.23, §7.1, §8, §10.2). A section-level word diff pre → live (scratch `v910r4/secdiff.py`) shows exactly these
  12 and 15 units changed; each diff was read whole, and the subsections they touch were read whole in the live text
  (V09 §4.20.2, §4.21.10 (7)–(10), §4.21.11, §4.21.12, §4.21.13, §4.21.14 (1)–(4), §5.8, §2.12's crisis, damage-line and
  `workingLayer` rows, §3.16 rows 21, 87–93, T-V9-52, -83 – -87; V10 §2.12's `read_map` look input, §2.13's `LookAnswer`
  and `WhyProvider.explain`, §3.3 rule 21, §3.5's reads, §3.9's query, §3.9a, §3.9b (5)–(8), §3.17's host projection,
  §3.23 rows 14, 26, 32–35 and C10, T-V10-29, -45, -49, -52, §8's C4 row, CVR-V10-22).
* **Rulings binding the scope:** adjudication-r4 R4-01 – R4-05, R4-09, R4-10, R4-12, R4-14, R4-16 (Part H · V09, V10 and
  every END line naming V09 or V10 under other units); adjudication-r2/-r3 stand except where R4 supersedes by name.
* **Homes checked against** (live): base §6.1 *The weather stream* (l. 9552–9560), §7.1's three new bend rows
  (l. 10592–10594) and table-edit row (l. 10586), §8.2 *Live layers* (l. 12963), *Crisis looks* (l. 13069–13142),
  §10.2's `CrisisLookRow` (l. 15272) and (c)–(f) (l. 15630–15716), §11.2's `why` and `looks` members (l. 16280, 16287)
  and `LooksAnswer` (l. 16318–16326); V03 §5.6 (`PlanDamage`, (2), (4)); V06 §3.22 (3), §6.8 (6); V07 §4.5 (l. 3118–3130),
  W84; V08 §3.6 (3) (l. 1868–1873), §3.16; V01 §5.4 (6); V11 §3.25.9 (the `reconstruction` row).

## P2 Round-3 findings re-checked (VV910-r3-01 – -08)

| id | round-4 disposition | verdict | evidence (live) |
|---|---|---|---|
| VV910-r3-01 | FIX | **FIXED** | V09 §4.21.12 (5) (l. 3641–3651): **Show** frames the box of the marks `live.crises` draws for that look at its row's `band` over `bounds` and §8.8's ring, or a `disaster`'s units' `FindArea` union, or the town's own frame where nothing is drawn; (7) Go to "as the card's **Show** does"; §1b row (l. 377) adds `live.crises`' marks by look; row 91 adds the two edges with outcomes; T-V9-85 adds the famine, rebellion and no-mark clauses. (The producer end this reading needs is VV910-r4-02, new.) |
| VV910-r3-02 | FIX per R4-04, amended | **FIXED as ruled** | §4.21.12 (4) (l. 3624–3638): R4-04 (b)'s predicate written whole, read from §11.2's `looks` asked with the building (`over`), no `yielded`; §4.21.13 (3) (l. 3700–3710) reads V03's `planDamage` (`PlanDamage.look`, `.level`) and states the after-hand-over case; §5.8 (l. 3992); §2.12's crisis-card row adds `doc.changed` (with its two causes) and the damage-lines row the `looks` re-reads (l. 1007–1010); row 92 adds the two building edges; T-V9-86 the rebuild and preview clauses. Second end: base §11.2 `building?` (l. 16280) and `over?` (l. 16325) written. |
| VV910-r3-03 | FIX | **FIXED** | V10 §2.13's `festivals[].name` comment and list comment (l. 1004–1007); §3.9b (5) (l. 1958–1961); T-V10-49 (l. 3139); §1b.1 row (l. 289). Second end: base l. 16320 ("standalone the list is empty … a previewed generic festival is no entry"). |
| VV910-r3-04 | MERGED into VAH-r3-01 | **FIXED** (by VAH-r3-01) | V10 l. 202, T-V10-29 (l. 3119), CVR-V10-22 (l. 3471) read the adjudicator's one text; 0 `crisis.look.` left in the set. |
| VV910-r3-05 | MERGED into VAH-r3-09 (V07) | **FIXED** (by VAH-r3-09) | V07 l. 3127: "For now: Ruined quarters, the mill-end fire, weeks 30–34". |
| VV910-r3-06 | FIX | **FIXED** | row 93 (l. 1613) and T-V9-87 (l. 4410) read the hours (midday shimmer, midnight dust under `light: 'time'`). |
| VV910-r3-07 | FIX | **FIXED** | §4.21.12 (4) `{condition}` the look's `name` (tier `dossier`), `lineUnnamed` "for a look that carries no `name`"; §1b row "each look's `name`"; §4.9's codes cell (l. 2192); 0 `ConditionOverlay.key` / "condition's entity" left. |
| VV910-r3-08 | MERGED into VAH-r3-03 (R4-14) | **FIXED** (by VAH-r3-03) | §4.21.13 (1) (l. 3680–3682): the roofless wing's roof bays whatever their threshold while `decayed` or `ruined` (§2.6 step 7). |

All eight closed. Every END line Part H routes to V09 (7) and V10 (3) is written as given (checked one by one: V09
§4.21.14 (4) and row 93; §4.21.10 (10)'s `gapUnits(chip, key, week)`; §4.21.10 (7)'s model the view draws; §4.21.10 (8)'s
"listing at that week"; §2.7's view-bound `why`; §4.9's `bend.raised.underSpan`; §4.21.11 (2)'s R4-10 phrase; V10
§2.13's `opts.view`, §3.9's query, §3.5's pass; §2.13's units comment; §3.9a's restoring re-cut). The other seats'
issues V09 and V10 own this round are in the live text as ruled (VAL-R3-01 per R4-02 in §4.2, row 21, §4.21.10 (8),
T-V9-83 (g); VAT-r3-03; VAT-r3-06's four canon ids gone; VDC3-06 per R4-09 with the three bend rows agreeing word for
word with §7.1 l. 10592–10594; VDC3-11; VRC3T-04 per R4-10; VV34-r3-03; VV56-r3-02 as R4-16 keeps it, agreeing with V06
§6.8 (6) and V08 §3.6 (3); VV1112-r3-05 agreeing with §7.1 l. 10586; VAH-r3-01, VAH-r3-08, VAT-r3-05, VCS-r3-04 in V10).

## P3 The round-4 blocks, subsection by subsection

**V09.** §1b, §2.12: the `workingLayer` writers (Find's **Go there**, a clerk's `useTool`, view keys only) and its
reader (§8.4's drawing) agree with R4-02 and §8.4; the crisis and damage-line rows' triggers agree with §8.2's re-run
rule (a week, the display, a `doc.changed`, the key). §2.6, §5.4: canon ids removed, nothing else. §2.7: the
view-bound `why` (R4-05) agrees with §11.2 l. 16287–16290. §3.16: rows 21, 87, 88, 89, 91, 92, 93 read their rulings;
row count 92 unchanged. §4.2: R4-02's text verbatim. §4.9: `refuse.table.required` and the three bend rows agree with
§7.1; the `info.crisis.<line>` codes cell reads each look's `name`. §4.20.2 (4): the later-work flow agrees with §2.7's
support step (6) (b) and §7.1, but keeps `bend.wall.aqueductArch` for the same hand case — raised this round by
verify-determinism-r4t as **VDC4-06** (owner V09), confirmed here and not re-raised. §4.21.9 (1): VV56-r3-02's clause,
as V06 §6.8 (6) and V08 §3.6 (3) state it. §4.21.10 (7), (8), (10): R4-12's frame reading and R4-02's view keys.
§4.21.11 (2): R4-10's phrase. §4.21.12 (4)–(5), (10): R4-04's phrases; **Show**'s frame (see VV910-r4-02); the
`ruinedFor` forms (VV910-r4-01); the famine field (VV910-r4-03). §4.21.13 (1)–(3): R4-14's roofless case,
`storeyGone`'s `upperFloor` rule (V03 l. 2294, 2381), `PlanDamage`'s look and level (V03 l. 2679–2690). §4.21.14 (4):
§6.1's press rule and replay inputs verbatim in meaning; its button stays enabled while a pressed spell waits — raised
this round by verify-determinism-r4t as **VDC4-07** (owner V09), confirmed here and not re-raised. §5.8, §7.1 (T-V9-52,
-83 – -87): each clause matches its rule.

**V10.** §1.2, §1b.1, §2.3: the hooks now read (`looks`' `building` and `over`; `why`'s `view`; V07 §5.6 (3)) named
with both ends. §2.12: `read_map { kind: 'look'; building?: Ref }` — new input; its non-building edge is VV910-r4-04.
§2.13: `WhyProvider.explain`'s `view` (R4-05's END verbatim), `LookAnswer.festivals` (VV910-r3-03), `districts`/`over`
projected from §11.2 as written there. §3.3 rule 21, §3.5, §3.9: the building ask and the view pass. §3.9a: R4-03's
entry week and minted elements; the disaster look per building through `over`, agreeing with V06 §3.22 (3), §10.2 (f)
and V03 §5.6 (4). §3.9b (5), (8): the festival list and the look read agree with §11.2. §3.17: `over` projected (no
geometry). §3.23: rows 14, 26, 34, C10 read their rulings. §7.1: T-V10-29, -45, -49, -52 as ruled. §8's C4 row and
§10.2's CVR-V10-22: R4-04's phrase.

**New problems the repair made or left at its edges.** Round 4 extended `info.crisis.ruinedFor` to every building of a
previewed disaster's units, whose look has no condition or weeks to fill its one form (VV910-r4-01); V09's per-look
**Show** frame reads a key of `live.crises`' marks that §8.2 never says it writes (VV910-r4-02); the per-entity `looks`
ask R4-04 (c) built covers a disaster's buildings but not the famine's fields the same card names (VV910-r4-03); V10's
new `building` input has no outcome for a reference that names no building (VV910-r4-04).

## P4 Mechanical checks

* **Ids.** T-V9-1 – T-V9-87, J-V9.1 – J-V9.149, BCR-V9-1 – BCR-V9-37, T-V10-1 – T-V10-53, J-V10.1 – J-V10.128,
  BCR-V10-1 – BCR-V10-23, CVR-V10-1 – CVR-V10-22: each defined once in the set, no gap; every T-V9/T-V10/J-V9/J-V10 id
  cited anywhere in the set is defined. V09 §3.16's numbered rows 92 (3–94), V10 §3.23's 45 rows: no duplicate number.
* **References.** Every "V09 §x" and "V10 §x" pointer in the base and the twelve volumes, and every "V0n §x" pointer in
  V09 and V10 (3 583 in V09/V10, 560 elsewhere), resolves to a heading or numbered sub-item, "(n)" sub-items included:
  0 broken (the script's two flags at V08 §3.16 (7) are V08's bold "(n)" items, which exist).
* **Retired terms** (canon glossary, 35 patterns, pre → live): 0 new hits but one pattern false positive — V10's
  "hand-over" (×3) is the crisis hand-over (§10.2 (f)'s own word), not G-unitinput's retired sky-unit view.
* **Deferral wording:** 0 in round-4 text ("Later" is the bold head **Later work across a standing raised way**).
* **Review ids** (R3-02): none in design text; V09's are §9/§10 records (J-V9.136, -144, -147, -149, BCR-V9-37, XV-V9-*).
* **Item 126 (a2):** V09's seven "phone" words unchanged (each states the rule); V10 none.
* **Cohesion.** V09 §8.1 and V10 §8 figures unchanged by round 4, equal to INDEX l. 32–33 and §16; V10 §8's C4 row and V09
  §4.21.12 (10) name V07's W84 at the village rungs, which V07 l. 292 places.
* **doc_checks** (`--heads docs/ARCHITECTURE.md`; WARNING printed: reference corpus INCOMPLETE — captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external missing — results NOT authoritative,
  PROVISIONAL; exit 1 for the unreviewed C3 runs as in every round): V09 C1 1/0 unreviewed, C2 1/0, C3 293/272, C4 0,
  S1 0, S2 453/89; V10 C1 0, C2 0, C3 163/144, C4 0, S1 0, S2 325/12. Every unreviewed S2 hit is a volume-prefixed
  pointer (checked line by line: 0 unprefixed); the C3 runs are common English.
* **Words** (wc): V09 121 337 → 123 141 (+1.5 %), V10 81 335 → 82 138 (+1.0 %) — the defect fixes' design text; no unit
  shrank, so no nuance audit for a cut over half applies.

## Issues

| id | sev | kind | owner | claim (short) |
|---|---|---|---|---|
| VV910-r4-01 | major | EDGE-UNDEFINED | V09 | `info.crisis.ruinedFor` has one form; round 4 gives it to a preview's buildings (no condition, no weeks), and no form serves an open or unnamed look, nor the why line a look with neither |
| VV910-r4-02 | major | WIRING | rendering | V09's **Show** reads `live.crises`' marks "keyed by its condition"; §8.2 never says a crisis mark carries its look, and the camp and barricade parts are shared between looks |
| VV910-r4-03 | major | WIRING | V09 | the why card's famine row on "a field a famine leaves bare" has no input: R4-04 (c)'s per-entity `looks` ask covers a disaster's buildings only |
| VV910-r4-04 | minor | EDGE-UNDEFINED | V10 | the new `read_map { kind: 'look'; building?: Ref }` has no outcome for a reference that names no building |

Confirmed and not re-raised (raised this round by verify-determinism-r4t, owner V09): **VDC4-06** (V09 §4.20.2 (4) gives
a wall drawn across a standing aqueduct both `bend.wall.aqueductArch` and `bend.wall.raisedCrossing`) and **VDC4-07**
(**Start a shower now** enabled while a pressed spell waits, a press then a silent no-op).

### VV910-r4-01 (major, EDGE-UNDEFINED, V09)

**Claim.** V09 §4.9's `info.crisis.<line>` row (l. 2192) gives the why line four forms — `line`, `lineOpen` (no
`untilWeek`), `lineUnnamed` (no `name`), `preview` — and `ruinedFor` one: "For now: {look}, {condition}, weeks {a}–{b}".
Round 4's §4.21.12 (4) (l. 3624–3634) gives `ruinedFor` as the why card's `facts` row to every building a disaster look
stands over, "under a preview … every building of the preview's units", and §4.21.13 (3) (l. 3700–3705) makes it the
plan panel's head there ("its words from the look's entry … or the preview's"); row 92 and T-V9-86 add "under a
`disaster` preview the look". A preview's entry has no condition, name or weeks (§11.2's `LooksAnswer.crises[]`:
`condition?` "absent on a preview", `sinceWeek?`, `untilWeek?`, l. 16321–16322; V10 §3.9b (8): "no condition, name,
source or weeks"), so on the standalone preview — "the only way to see a look on a map without a dossier" (§4.21.12
(2)) — the row's slots have no values. A standing look with no `untilWeek` (row 90's open condition) or no `name` meets
the same one form. And the why line has no form for a look with neither (`lineOpen` needs `{condition}`, `lineUnnamed`
`{b}`); V10 §2.13's `says` (l. 1013) lists the same four keys. Two builders render different words, or fail on a missing
slot, on a common path.

**Required change.** V09 §4.9's `info.crisis.<line>` row adds after `lineUnnamed`: `lineUnnamedOpen` "{look}, since week
{a}"; and after `ruinedFor`: `ruinedForOpen` "For now: {look}, {condition}, since week {a}" · `ruinedForUnnamed` "For
now: {look}, weeks {a}–{b}" · `ruinedForUnnamedOpen` "For now: {look}, since week {a}" · `ruinedForPreview` "For now:
{look} — a preview". §4.21.12 (4): after the `lineUnnamed` clause add "`info.crisis.lineUnnamedOpen` ("{look}, since
week {a}") for a look with neither"; after "(`info.crisis.ruinedFor`, "For now: {look}, {condition}, weeks {a}–{b}"; V09
§5.8)" add "— in the form the line takes: `ruinedForOpen`, `ruinedForUnnamed`, `ruinedForUnnamedOpen`, or under a
preview `ruinedForPreview` ("For now: {look} — a preview")". §4.21.13 (3): "under the head `info.crisis.ruinedFor`" →
"under the head `info.crisis.ruinedFor` in the form (4) chooses (under a preview `ruinedForPreview`)". Row 90 adds the
edge "a condition with neither a name nor an `untilWeek`" with the outcome "`info.crisis.lineUnnamedOpen`"; row 92's
outcome "the look's lines, a preview never handing over" reads "the look's lines under `info.crisis.ruinedForPreview`, a
preview never handing over". T-V9-85 adds "a previewed `disaster`'s why card on a building of its units carries "For
now: Ruined quarters — a preview", and a look with no `untilWeek` the open form"; T-V9-86's "and under a `disaster`
preview the look" reads "and under a `disaster` preview the look under `info.crisis.ruinedForPreview`". END (V10):
§2.13's `says` comment reads "V09's line — info.crisis.line, .lineOpen, .lineUnnamed, .lineUnnamedOpen or .preview —";
§3.23 row 34 adds the edge "a condition with neither a name nor an `untilWeek`" with the outcome "worded
`info.crisis.lineUnnamedOpen`".

### VV910-r4-02 (major, WIRING, rendering)

**Claim.** V09 §4.21.12 (5) (l. 3641–3651) frames the crisis card's **Show** — and (7) Find's **Go to** on a look — on
"the box of the marks `live.crises` draws for that look (§8.2's look rows, keyed by its condition, a preview by its look
kind …), asked of the provider in the generation worker at the look's row's `band` over the map's `bounds` and that ring
whatever the view (§8.2's `LiveLayerProvider.marks`)"; §1b (l. 377) reads "`live.crises`' marks by look (§8.2)". §8.2
states no such key: *The layer* (l. 13134–13142) gives the marks only "of semantics `crisis.<part>`", and no column of a
crisis mark is said to carry its look (`MarkTable.entity`, l. 12351, is unstated for them). The parts are shared
between looks (l. 13084–13096): `campCluster` by siege, blockade, refugeeCamp, quarantine and occupation; `barricade`
by blockade, raiders and rebellion; `crisis.ash` footprints by siege and raiders. With several looks standing — T-V9-85's
own dossier fixture holds a siege, a refugee wave and a plague — a builder of `live.crises` from §8.2 gives V09 no way to
tell one look's camps from another's, so **Show** and **Go to** cannot frame one look as V09 states: an input the build
needs with no producer. Round 4's repair asked rendering (HAND-OFFS) only to name the reader.

**Required change.** Rendering §8.2 *The layer*, after "… and, a `base` layer, joins the tile key (§8.8).": "Each mark
carries its look: in `entity`, the interned handle (§2.1) of the `ConditionOverlay` whose look draws it — a preview's
marks none, the preview drawn alone — so one look's marks are told apart; V09 §4.21.12 (5)'s **Show** and Find's **Go
to** on a look read them so, asking the provider in the generation worker for one look's marks at its row's `band` over
the map's `bounds` and §8.8's ring, whatever the view, and framing their box." T-ER-27 adds "with a siege and a refugee
camp standing together, every `live.crises` mark carries its own look's overlay, and the box of one look's marks holds
that look's parts alone". (V09's text stands; its §1b row then cites a stated producer.)

### VV910-r4-03 (major, WIRING, V09)

**Claim.** V09 §4.21.12 (4) (l. 3624–3625) and §5.8 (l. 3992–3993) give `info.crisis.ruinedFor` to the why card "of a
field a famine leaves bare". A famine bares a share of the `fields` place's faces — round(s × n) of them, by keyed draws
on the render keys from the seed and the condition's id (§10.2 (c) l. 15630–15635, (d) l. 15642 and 15682, (f)
l. 15710–15711) — so whether one field is bare is the generation worker's evaluation. Round 4 gave V09 that evaluation
for a disaster's buildings (§11.2's `looks` asked with `building`, each `disaster` entry's `over`; R4-04 (c)) and none
for a field: `building?` and `over` are defined for a building and a disaster look only (base l. 16280, 16325), and V09
may not run the placement on the main thread. So the card's famine row reads an input nothing produces: one builder
shows it on every field while a famine stands, another on none, and no row or bar covers it (row 90, T-V9-85). (At
THORP, HAMLET and VILLAGE a `VillageField`'s row is V07's provider's, R3-16 (e); this is the town ladder's field.)

**Required change.** END (rendering): §11.2's `looks` member adds `field?: Id /* g item 122 (f): with it, each famine
look says whether it draws that field bare (§10.2 (d)'s fields, (f)) */`, and `LooksAnswer.crises[].over`'s comment adds
"; with the query's field, whether this famine look draws that field bare at the view's week (§10.2 (d)'s `fields`),
evaluated in the generation worker". V09 §4.21.12 (4), after "… never a call to V01 or V06 on the main thread.": "A field
a famine leaves bare is one the famine look draws bare (§10.2 (d)'s `fields`, (f)): the card reads it from the same
reader asked with that field (`query({ kind: 'looks', view, field })`), each `famine` entry carrying `over`." §1b's
crisis-lines row (l. 377) and §2.12's crisis-card row (l. 1007) add "for a field's why card, asked with that field, each
`famine` entry's `over`"; row 90 adds the edge "the why card of a field a famine draws bare, and of one it leaves sown"
with the outcome "`info.crisis.ruinedFor`; no crisis row"; T-V9-85 adds "on the dossier fixture with a famine at
severity 0.5, the why card of a bare field carries `info.crisis.ruinedFor` and that of a field left sown none".

### VV910-r4-04 (minor, EDGE-UNDEFINED, V10)

**Claim.** Round 4 added `read_map { kind: 'look'; building?: Ref }` (V10 §2.12 l. 954; §3.5; prompt rule 21, l. 1280).
§3.23 row 34 (l. 2708) defines four building cases (one the look stands over, one whose rebuilding has begun, one of no
unit, one of a previewed `disaster`'s units under Works) but not a `building` that names no building — an address no read
returned, or an entity that is not a building (a district, a plot, a field). Row 6's `is_error` covers "an anchor naming
an address the session never read" only, and §11.2's `building?: Id` says nothing of a non-building id; builders may
answer an error, `over` false, or no `over`. Off the common path (the model sending a non-building), hence minor.

**Required change.** V10 §3.23 row 34's edges add "a read asked with a `building` that names no building — an address no
read returned, a district, a plot or a field" with the outcome "`over` absent on every look, every other field as
without `building`"; T-V10-50 (33) adds the two cases.

## Return

The structured result is `docs/validation/coherence/results/coherence_verify-vol-V09-V10-r4t.json` (4 issues: 0 blocker,
3 major, 1 minor; owners V09 2, rendering 1, V10 1).
