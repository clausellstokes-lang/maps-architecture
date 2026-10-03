# Verify round 5 — V09 (the application) and V10 (the clerk) — lane coherence/verify-vol-V09-V10-r5t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V09-V10-r5t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V09-V10-r5t`, 2026-10-01)
- P1 brief read whole; r4t result (4 issues), adjudication-r5 (R5-01, R5-02's V09 lines, R5-04, R5-05, R5-08, R5-09, Part H rendering/V09/V10), repair-r5-V09/V10 headers, assemble-r5 read; live = assemble-r5 after shas (V09 7c91d3bf…, V10 847b3189…); pre-r5 = 52a16b0^: done
- P2 re-check the four round-4 findings at both ends: done (4 FIXED)
- P3 read every round-5 replaced unit in V09 (12) and V10 (10) for new problems: done (4 new)
- P4 mechanical checks (ids, refs, retired terms, deferral, phone, doc_checks): done
- P5 report and result: done

## Scope and inputs

* **Live files** (equal to assemble-r5's after-hashes): `docs/volumes/V09-application.md` sha256 `7c91d3bff549344b…`,
  `docs/volumes/V10-clerk.md` sha256 `847b3189f56daf45…`; base `docs/ARCHITECTURE.md` `2d84eac2d8a379d1…`. Pre-round copies
  from `52a16b0^` (V09 `b49c6014…`, V10 `3fd16e69…`, the round-4 hashes). Design files untouched by this seat.
* **What changed:** V09 12 REPLACE blocks (§1b, §2.12, §3.16, §4.2, §4.9, §4.20.2, §4.21, §5.8, §5.10, §5.15, §6.4, §7.1),
  35 changed hunks; V10 10 blocks (§1.2, §1b.1, §1b.2, §2.13, §3.5, §3.9, §3.9b, §3.23, §7.1, §8), 19 hunks. Each hunk was
  read as a word diff and then in its live subsection, with the base and volume homes it cites.
* **Binding:** adjudication-r5 (R5-01 – R5-10; Part H · V09: 10 ids, 4 END lines; Part H · V10: 4 ids, 2 END lines;
  rendering's VV910-r4-02 and the END of VV910-r4-03), adjudication-r2 – r4 where not superseded.

## P2 — round-4 findings re-checked (both ends)

| id | disposition (adjudication-r5) | verdict | evidence (live) |
|---|---|---|---|
| VV910-r4-01 | FIX per R5-08 (V09); END under V10 | **FIXED** | V09 §4.9 `info.crisis.<line>` (l. 2201): `lineUnnamedOpen`, `ruinedForOpen`, `ruinedForUnnamed`, `ruinedForUnnamedOpen`, `ruinedForPreview` with the ruled words; §4.21.12 (4) (l. 3637–3644) the neither-form and "in the form the line takes"; §4.21.13 (3) (l. 3728) "in the form V09 §4.21.12 (4) chooses (under a preview `ruinedForPreview`)"; row 90's edge and outcome aligned (l. 1610); row 92's preview outcome (l. 1612); T-V9-85, T-V9-86 clauses. V10 END: §2.13 `says` (l. 1015) lists `.lineUnnamedOpen`; §3.23 row 34 (l. 2711) edge "a condition with neither a name nor an `untilWeek`" → "worded `info.crisis.lineUnnamedOpen`"; §3.9b (8) and T-V10-52 conformed in the sweep. (The forms' V09 test coverage: VV910-r5-02 below.) |
| VV910-r4-02 | FIX per R5-08, amended (rendering) | **FIXED** | base §8.2 *The layer* (l. 13181–13185): each mark carries its look in `entity`, a preview "drawn alone, carries no condition, so its **Show** frames every crisis mark" — Part H's amended text; T-ER-27 (l. 14755) adds the siege-and-refugee-camp clause and outcome. V09 §4.21.12 (5) (l. 3662–3664) and §1b l. 377 read it in the same words. |
| VV910-r4-03 | FIX per R5-08 (V09); END under rendering | **FIXED** | base §11.2 `looks` `field?: Id` (l. 16338) and `LooksAnswer.crises[].over`'s field clause (l. 16385); V09 §4.21.12 (4) (l. 3652–3654) `query({ kind: 'looks', view, field })`; §1b l. 377 and §2.12 l. 1007; row 90 edge and outcome; T-V9-85's famine clause. Its fixture (a famine at severity 0.5 in V08 §7.1) is agree-proof's VAP-r5-02 (owner V08), confirmed here, not re-raised. |
| VV910-r4-04 | FIX per R5-08 (V10) | **FIXED** | V10 §3.23 row 34 (l. 2711): a `building` naming a district, a plot, a field or a building gone since its read → "`over` absent on every look, every other field as without `building`"; T-V10-50 (33) runs them; §2.13's `over` comment and §3.5's look read (l. 1458) state the mechanism. The unread address is given §3.5's universal refusal (row 6) rather than "`over` absent": V10's repair states why (the id never reaches the read), which R5-08 (e)'s own words ("a `building` that names no building answers no `over`") leave intact for every id that reaches it — accepted, no two outcomes for one case. |

Every END line for V09 and V10 in Part H is written: R5-02's V09 lines (§4.9's three bend rows and the new
`bend.raised.around`, §4.20.2 (4), T-V9-52 — verbatim), VAT-r4-02's (§5.15's notes row, §5.10's Picture cell), VRC4T-02's
(§5.15's link row), VAT-r4-01's (T-V9-86's scrubbed-week clause; V10 §2.13's `rows` signature, §3.9, row 14), VV910-r4-01's
(V10). The other seats' V09/V10 FIXes are present as their repair files state (VAH-r4-01/VAT-r4-04, VAP-r4-08, VDC4-06,
VDC4-07, VEL4-r4-02, VV12-r4-01, VV56-r4-01; VAT-r4-03/VAH-r4-02, VAP-r4-09); their reporters re-check them.

## P3 — the round-5 text read for new problems

**V09.** §1b rows 311–312 and 377; §2.12 rows 974 and 1007; §3.16 rows 21, 90, 92, 93 (edges and outcomes aligned one to
one); §4.2's working-layer rule (R5-09: Ground at the removing `doc.changed` and at a load, a redo leaving it Ground, a
drawn week lacking the island drawing the frame's layers); §4.9's bend rows (each equal to §7.1's rows l. 10630–10632 in
cause and outcome), `info.crisis.<line>` and `settings.weather.<word>`; §4.20.2 (4) (R5-02's sentence; the aqueduct arch
from both sides); §4.21.9 (1) (= V06 §6.8 (6)); §4.21.10 (3), (7), (14), (15) (the drawn-week budget = §12.5 l. 17176–17179);
§4.21.12 (4), (5); §4.21.13 (1)–(3) (= §6.3's one comparison from the entry week, R5-04); §4.21.14 (1), (4); §5.8, §5.10,
§5.15, §6.4; T-V9-52, -80, -83, -85, -86, -87. No nuance lost: the removed words are R5-02's superseded crossing-station
text, the silent second press (now a disabled button with its reason) and the narrower Find and damage glosses the
rulings widen.

**V10.** §1.2's §11.2 row; §1b.1, §1b.2; §2.13's `WhyView` alias (one name for the type `explain` already used, both
signatures reading it — no field moved), `rows(…, opts: { view?: WhyView })`, `says`, `over`, `FindAnswer.count`; §3.5's
look and why reads; §3.9's query paragraph; §3.9b (7), (8); §3.23 rows 14, 32, 34; T-V10-50, -51, -52; §8's C4 cell.

New findings (detail under *Issues*):

* **VV910-r5-01 (major, V09).** Round 5 makes the why answer read the view's drawn week (R5-08 (d)) and V09 §5.8 now
  says "the drawn week of the view the card opens on", but V09 rebuilds the non-modal card's answer only at open,
  `doc.changed` and `onEffectiveKey`; §2.12's damage-lines row says the card's `plan` section is recomputed at each week
  change. One card follows a scrub, another freezes at its opening week.
* **VV910-r5-02 (major, V09).** The why line's and `ruinedFor`'s unnamed forms are run by no V09 bar (and
  `ruinedForUnnamed` / `ruinedForUnnamedOpen` by no bar in the set), though row 90 names the edge with T-V9-85.
* **VV910-r5-03 (minor, V07).** V07 §4.5's village crisis line, W74 and T-V7-69 (e) restate `info.crisis.ruinedFor` in
  its one named form; V09 §4.21.12 (4) now has five (V03 was conformed, V07 not — blind spot (a)).
* **VV910-r5-04 (minor, V10).** The clerk explaining a field under a famine has no defined outcome: V10 sends no field
  and §3.9b (8) defines only the house case.

**Others' round-5 findings in V09/V10, confirmed and not re-raised:** VAP-r5-02 (agree-proof; V08 §7.1's famine severity
for T-V9-85), VDC5-05 (determinism; V09 `bend.raised.around` words a way only, §7.1 giving it a stopped channel too),
VRC5T-04 (rendering; V09 §4.21.11 (2) and T-V9-84 lack §8.8's once-in-10-s clause). V09 §6.4's new drawn-week budget
cites no V09 bar; base R12-35 runs it, and T120-6's missing drawn-week glow (which T-V9-83 (l) reports) is agree-proof's
VAP-r5-01.

## P4 — mechanical checks

* **Ids.** T-V9-1 – T-V9-87, J-V9.1 – J-V9.149, BCR-V9-1 – BCR-V9-37, T-V10-1 – T-V10-53, J-V10.1 – J-V10.128,
  BCR-V10-1 – BCR-V10-23, CVR-V10-1 – CVR-V10-22: each defined once in the set, no gap, every cited id defined. V09 §3.16's
  92 rows (3–94) and V10 §3.23's 45 rows: no duplicate number; round 5 added none.
* **References.** 3 606 volume pointers in V09/V10 and 15 780 in the base, INDEX and the other ten volumes, "(n)"
  sub-items included: 0 broken into or out of V09/V10 (the resolver's seven flags elsewhere are V04/V06/V08's own). The
  96 bare base pointers on V09's 158 changed lines and V10's 28 on its 29: 0 broken (one flag is "V09 / §4.21.12 (7)"
  wrapped across a line).
* **Retired terms** (canon glossary, 35 patterns, pre → live): 0 new hits in either volume.
* **Deferral wording:** 0 in round-5 text ("the later of" is a schedule; "For now" and "the open form" are UI strings).
* **Review ids:** none added to design text.
* **Item 126 (a2):** V09's ten "phone" words unchanged (pre 10 = live 10, each stating the rule); V10 none.
* **Cohesion.** V09 §8 and V10 §8's figures unchanged (V10's C4 cell gains only T-V10-51's drawn-week timing clause),
  equal to INDEX and §16; the drawn-week clauses' E6 timing is named in each test cell, as INDEX §5 risk 2 requires.
* **doc_checks** (`--heads docs/ARCHITECTURE.md`; WARNING printed: reference corpus INCOMPLETE — captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external missing — results NOT authoritative,
  PROVISIONAL; exit 1 for the unreviewed C3 runs, as every round): V09 C1 1/0 unreviewed, C2 1/0, C3 297/275, C4 0, S1 0,
  S2 456/89; V10 C1 0, C2 0, C3 165/146, C4 0, S1 0, S2 329/12. Every unreviewed S2 hit is a volume-prefixed pointer
  (checked line by line: 0 unprefixed); the C3 runs are common English.
* **Words** (wc): V09 123 141 → 124 150 (+0.8 %), V10 82 138 → 82 568 (+0.5 %), the defect fixes' design text; no unit
  shrank, so no nuance audit for a cut over half applies.

## Issues

| id | sev | kind | owner | claim (short) |
|---|---|---|---|---|
| VV910-r5-01 | major | WIRING | V09 | the why card's view-bound answer is never re-asked when the view's week, year position, festival or crises change while it is open; §2.12's rows disagree |
| VV910-r5-02 | major | EDGE-UNTESTED | V09 | no V09 bar runs the unnamed why-line and `ruinedFor` forms row 90 names; `ruinedForUnnamed(Open)` run nowhere |
| VV910-r5-03 | minor | CONFLICT | V07 | V07 §4.5, W74 and T-V7-69 (e) restate `info.crisis.ruinedFor` in one form; V09 now has five |
| VV910-r5-04 | minor | EDGE-UNDEFINED | V10 | the clerk's explanation of a field under a famine is undefined: no field read, only the house case |

### VV910-r5-01 — major — WIRING — owner V09

**Claim.** Round 5 makes the why answer's `plan` section read the view's drawn week (R5-08 (d): base §11.2's `why`
member, V10 §2.13 `rows(…, opts: { view?: WhyView })`, V03 §4.6), and V09 §5.8 (l. 4025) now reads "its damage lines at
the building's own level and the drawn week of the view the card opens on"; V07 §4.5's crisis, season and festival rows
already read the view (R4-05). V09 §2.12's `WhyCardModel` row (l. 986) rebuilds the answer only "at every open and on
`doc.changed` naming the subject", and V09 §2.7 (l. 620–622, 667) re-asks a cached answer only at `onEffectiveKey`. The card
is non-modal (§5.8), so it stays open across a timeline scrub, a Season change, a festival or crisis preview; §2.12's
damage-lines row (l. 1010) says the card's `plan` section is "recomputed at … each week change", which the `WhyCardModel`
row contradicts, and nothing re-reads V07's view-bound rows at a `yearWeek`, `festival` or `crises` change. One builder
re-asks `why` at each view change; another leaves the card stating the week it opened on while the map draws another.
T-V9-86's scrubbed-week clause passes either way when the card is opened after the scrub.

**Required change.** (1) V09 §2.7, after "… reads that view's week, year position, festival, crises and looks.": "While
its card or panel is open, a view-bound answer is re-asked at each change of that view's §2.9 `week`, `yearWeek`,
`festival` or `crises` — a scrub, the Season control, a festival or crisis preview, **Show crises** — as a cached answer is
at `onEffectiveKey`, so V07 §4.5's crisis, season and festival rows and V03 §4.6's `plan` damage rows state the view on
screen." (2) V09 §2.12's `WhyCardModel` row, regenerate cell: "rebuilt at every open and on `doc.changed` naming the
subject" → "rebuilt at every open, on `doc.changed` naming the subject, at `onEffectiveKey` and at each change of its
view's `week`, `yearWeek`, `festival` or `crises` (V09 §2.7)". (3) V09 §5.8: "at the building's own level and the drawn
week of the view the card opens on" → "at the building's own level and its view's drawn week, re-read as the week changes
(V09 §2.7)". (4) T-V9-86's last clause adds "; with the card left open while the timeline is scrubbed, its `plan` section
follows each drawn week".

### VV910-r5-02 — major — EDGE-UNTESTED — owner V09

**Claim.** Round 5 gives the why line and the card's `ruinedFor` row five forms each (V09 §4.9 l. 2201; §4.21.12 (4)
l. 3637–3644). Row 90 (l. 1610) lists "a condition the dossier names not" and "a condition with neither a name nor an
`untilWeek`", outcomes `info.crisis.lineUnnamed` and `info.crisis.lineUnnamedOpen`, its test cell T-V9-85. T-V9-85
(l. 4436) runs the named line ("{look}: {condition}, weeks {a}–{b}"), the preview's card row ("For now: Ruined quarters —
a preview") and "a look with no `untilWeek` the open form", but no unnamed form: `lineUnnamed` and `lineUnnamedOpen` are
run by no V09 bar, and `ruinedForUnnamed` and `ruinedForUnnamedOpen` by no bar in the set (a census finds them only in
V09 §4.9 and §4.21.12 (4); V10's T-V10-52 runs `.lineUnnamed` and `.lineUnnamedOpen` as the clerk's `says` key, not
V09's card or its `ruinedFor` row). A card that words an unnamed look by the named form, its `{condition}` empty, passes
every bar (R5-01's grading: an untested edge whose outcome the text defines).

**Required change.** T-V9-85, after "and a look with no `untilWeek` the open form": "; on a copy of the dossier crisis
fixture whose fire's linked `reconstruction` condition the dossier names not, given its `untilWeek` and then none, the why
line reads `info.crisis.lineUnnamed` and then `info.crisis.lineUnnamedOpen`, and the why card of a building its disaster
look stands over `info.crisis.ruinedForUnnamed` and then `info.crisis.ruinedForUnnamedOpen`" (its timing within the cell's
M5 and M-SF entries as they stand).

### VV910-r5-03 — minor — CONFLICT — owner V07

**Claim.** V07 §4.5's crisis line (l. 3138–3144) gives a disaster's `VillageEnd` and a famine's `VillageField` "V09
§4.21.12 (4)'s `info.crisis.ruinedFor` row ("For now: Ruined quarters, the mill-end fire, weeks 30–34")"; W74 (l. 282) "the
crisis line's V09 `info.crisis.ruinedFor`"; T-V7-69 (e) (l. 3702) "carries `info.crisis.ruinedFor`" — one form. Round 5's
V09 §4.21.12 (4) gives the row five (open, unnamed, neither, preview), and V03 was conformed ("in its forms", l. 198;
"under a preview `ruinedForPreview`", l. 2322); V07, the village restatement (R5-01 (2) (a)), was not. V07 §4.5 states "a
preview never handing over" and T-V7-69 previews every look kind at the village rungs, where a preview has no condition or
weeks. The cited home states the forms, so a builder following the citation gets them: a restatement differing in form.

**Required change.** V07 §4.5: "V09 §4.21.12 (4)'s `info.crisis.ruinedFor` row ("For now: Ruined quarters, the mill-end
fire, weeks 30–34"), the one row" → "V09 §4.21.12 (4)'s `info.crisis.ruinedFor` row ("For now: Ruined quarters, the
mill-end fire, weeks 30–34") in the form that section chooses — `ruinedForOpen`, `ruinedForUnnamed` or
`ruinedForUnnamedOpen` for a look with no `untilWeek`, no name or neither, `ruinedForPreview` under a preview —, the one
row"; W74: "the crisis line's V09 `info.crisis.ruinedFor`" → "the crisis line's V09 `info.crisis.ruinedFor` in its forms
(V09 §4.21.12 (4))"; T-V7-69 (e): "carries `info.crisis.ruinedFor` while the look stands" → "carries
`info.crisis.ruinedFor` in the form V09 §4.21.12 (4) chooses (under a preview `ruinedForPreview`) while the look stands".

### VV910-r5-04 — minor — EDGE-UNDEFINED — owner V10

**Claim.** Round 5 gives V09's why card a famine's bare field (R5-08 (c): §11.2's `looks` `field`, each famine entry's
`over`; V09 §4.21.12 (4) l. 3652–3654; row 90), and §4.21.12 (4) closes "Volume 10's explanation renders the same keys"
(l. 3656). V10 sends no field (§3.5 l. 1458: a `building` naming none "is not passed"; §3.23 row 34: "a field … `over`
absent"), and V10 §3.9b (8) defines only *A house under a disaster look* (l. 2046). At the town rungs the card's famine row
is the card's own, read from the `looks` reader, not a `WhyAnswer` row, so the clerk explaining a field under a famine
has neither the row nor a read telling a bare field from a sown one: its outcome for "why is this field bare?" is
undefined, and it may lay a sown, or seasonally bare (item 117), field to the famine. Off the common path, hence minor.

**Required change.** V10 §3.9b (8), after the *A house under a disaster look* item: "* *A field under a famine look.* "Why
is this field bare?" while a famine look stands: the clerk names the look and its weeks in V09's line and says the look
draws a share of the town's fields bare (§10.2 (d)'s `fields`), never that this field is one of them — the look read asks
no field (V10 §3.23 row 34) — then the field's own state from its `why` (its crop stage, item 117); at THORP, HAMLET and
VILLAGE the field's `why` carries V07 §4.5's crisis line itself." T-V10-52 adds "on a copy of the fixture with a famine
standing, "why is this field bare?" names the famine and its weeks and lays no field to it".

## Result

Saved verbatim to `docs/validation/coherence/results/coherence_verify-vol-V09-V10-r5t.json`: 4 issues — 0 blocker,
2 major, 2 minor; owners V09 2, V07 1, V10 1. Round 4's four findings all FIXED at both ends.
