# Verify — volumes V09, V10 after repair round 2 (coherence/verify-vol-V09-V10-r2t)

> PROGRESS: P1 done (inputs) · P2 done (round-1 findings re-checked) · P3 done (every round-2 block in scope read whole as a
> pre → live word diff) · P4 done (owner items 114–126's parts in V09 and V10) · P5 done (mechanical checks) · report and
> result written; LANDED.

Seat: opus verifier (stand-in), PENDING FABLE REVIEW. Design files untouched.

## P1 Inputs

* Live: `docs/volumes/V09-application.md` sha256 `23398a30…` (4 905 lines), `docs/volumes/V10-clerk.md` `6efb987b…`
  (3 507 lines) — assemble-r2's after hashes; base `docs/ARCHITECTURE.md` `4ed292e9…`, INDEX `1774db18…`.
* Before round 2: git `d49a590` (V09 `c2dc5b80…`, V10 `f8f591b3…`, base `137ecc0e…`) — assemble-r2's before hashes.
* Round-1 findings: `results/coherence_verify-vol-V09-V10-r1t.json` (17 issues). Rulings: `adjudication-r2.md` R2-02,
  R2-05 – R2-11, R2-21 – R2-23, R2-30 – R2-42 and Part H · V09, V10, rendering. Repairs: `repair-r2-V09.md` (52 REPLACE),
  `repair-r2-V10.md` (28 REPLACE); `assemble-r2.md` (all applied, 0 skipped; title blocks set in R2-07's form).
* Owner items: `docs/AMENDMENTS-2026-09-28g.md` items 120 – 126 with 122 (h)–(i) and 126 (a2); canon dated routings for
  items 114 – 126 (canon.md l.5476 – l.5668).

## P2 Round-1 findings re-checked against the live text

| id | owner | verdict | evidence |
|---|---|---|---|
| VV910-02 | rendering | FIXED (R2-10 (b), ONE FIX with VAH-31 (b)) | base l.16004–16006: `register?: { status: CalibrationEntry['status'] \| 'owner'; entry?: …; method?: …; due?: string }` with V12 §2.10's `dist/evidence.json` comment, word for word |
| VV910-20 | V09 | FIXED | l.2745 "a T6 `place` `placeAt`"; l.3325 "A T6 `place` placement"; whole-word scan: 0 bare first uses in V09's prose (the 8 hits are code comments in §2.3's `ToolDraft`, unchanged) |
| VAT-20 | V10 | CLOSED — INVALID in its rung clause (R2-02) | not re-raised; V10 §3.16's `rule` row stands |
| G120-V09 | V09 | FIXED (NEW DESIGN per R2-32 – R2-35; phone sheet MOOT per R2-41) | §4.21.10 (1)–(15); §1b's four Find rows; §2.10 eight kinds; §2.11 `hintsDone`; §2.12 `find` and index rows; §3.16 rows 86–88; §4.4 Find all; §4.9 `find.*`, `find.group.*`, `hint.find`; §4.11's `find`; §5.4 (Coverage folded, cue-column row, `live.coverage` gone); §5.10; §5.15; §6.4; T-V9-83; J-V9.138 – J-V9.140; AP11 at M5, AP4 "the voids view". New defect at its scrubbed-week edge: VV910-r2-09 |
| G121-V09 | V09 | FIXED (R2-35, R2-36) | §4.21.11; §5.12 Display › Resolution; §2.11 `AppPrefs.resolution`; §2.12 rows; §3.16 row 89; §4.9 rows; T-V9-84 (T121-1, -4, -7); J-V9.141; AP11 at M4 |
| G122-V09 | V09 | FIXED (R2-37 (2), (9)) | §4.21.12 (1)–(10); §5.4 Show menu; §5.8 `facts` row; §5.10; §5.15; §2.12; §4.9 rows; §3.16 row 90; T-V9-85; J-V9.142. New defects: VV910-r2-04, VV910-r2-08 |
| G122h-V09 | V09 | FIXED (R2-37 (8), R2-30) | §4.21.6 (1), (2), (4); §4.21.12 (5), (8); `info.zoom.limitCamps`, `info.zoom.coarsest`; §2.12 framing row; §3.16 row 91; T-V9-76's crisis and stop-0 clauses |
| G123-V09 | V09 | FIXED (R2-38 (4)) | §4.21.13 (1)–(5); §5.8 `plan` section; §4.9 `info.damage.*`; §2.12; §3.16 row 92; T-V9-86; J-V9.143. New defect: VV910-r2-05 |
| G124-V09 | V09 | FIXED (R2-39 (b), R2-35; phone default MOOT) | §4.21.14 (1)–(7); §4.14 device group; §2.11 `AppPrefs.weatherEffects`; §4.19 and §4.21.7 (3) snow rule; §3.16 row 93; T-V9-87 (T124-5); J-V9.144. New defect: VV910-r2-01 |
| G125-V09 | V09 | FIXED (R2-40 (1)) | §1b dossier row l.410 (the dossier's latest stamped tick); §4.21.7 (2), (5); `view.season.noWeek`; §3.16 row 94; T-V9-77's item-125 clauses; J-V9.148. New defect: VV910-r2-02 |
| G119a2-V09 | V09 | FIXED (R2-31 (e)) | §4.9 `progress.<wait>` `{, steps}` and `{, catchUp}` (`epoch`, `history`, `dossier`) and `verify`; §4.21.9 (1)–(2); §6's head; T-V9-79 |
| G122-V10 | V10 | FIXED (R2-37 (9)) | V10 §2.13 `LookAnswer.crises`; §3.9b (8); prompt rule 21; §3.23 row 34 and C10; T-V10-52; J-V10.125; §6.1 row; §8 C4 |
| G123-V10 | V10 | FIXED (R2-38 (4)) | V10 §3.9a's damage table over V03 §4.6's `plan` rows; §3.23 row 35; T-V10-53; T-V10-29's walker; J-V10.126; §6.1 row |
| VV910-r1-01 | rendering | FIXED (R2-42) | base l.15845 `generate`'s and l.15865 `export`'s `signal?: AbortSignal`; V09 §4.21.9 (2) cites both |
| VV910-r1-02 | V09 | FIXED (R2-42) | base l.15868 `stopAfter?: number`; V09 §3.8 (3) l.1297–1299 re-issues with `stopAfter`; T-V9-17's `stopAfter: 1` clause; J-V9.149; BCR-V9-37 closed as applied |
| VV910-r1-03 | V09 | FIXED | l.1686 "a standalone neighbourhood document's outline"; l.989 "New random"; "Go back to here (from a history row or a restore point, V09 §3.9)" in §4.9 and §4.21.9 (1); 0 hits of the three slips |
| VV910-r1-04 | V10 | FIXED (ONE FIX with VAH-r1-01; R2-33 (c)) | V10 l.1975–1978 is the required sentence; T-V10-51 adds "a host message never sets a chip" |

All seventeen round-1 findings are closed (fifteen FIXED as ruled, VAT-20 INVALID in R2-02, the ONE FIX pair counted once).

## P3 Round-2 blocks in scope, read whole

A section-level word diff of pre-r2 → live was read hunk by hunk: V09 63 changed sections (head through §12, every
REPLACE body of repair-r2-V09 plus the title block assemble set), V10 29 changed sections. The new parts were read whole
in the live text: V09 §4.21.6 – §4.21.14, §4.12, §1b's new rows, §2.12's new rows, §3.16 rows 86–94, §4.9's new rows,
T-V9-83 – T-V9-87; V10 §2.13's `LookAnswer.crises` and `FindAnswer`, §3.9a's damage table, §3.9b (7)–(8), prompt rule 21,
§3.23 rows 33–35 and C10, T-V10-51 – T-V10-53, §8. The receiving ends Part H names are in place (R2-21 (a) §4.9's lead;
R2-30 `info.zoom.coarsest`; R2-32 AP4 and AP11; R2-42 §3.8 (3), §4.21.9 (2), `progress.verify`; V11's VAH-r1-07 at
V09 §2.6; R2-33 (c) and R2-35 at T-V10-51). No nuance was lost: the removals are item 126's narrow class (a ruled design
change, R2-41), R2-21's withdrawn `refuse.table.ownerRule` and `reroute` clause, and R2-22/R2-23/R2-42's replaced
wordings — each the ruling's text.

## P4 Owner items 114–126 in V09 and V10

Items 114 – 119's parts stand as round 1 found them, with 119 (a2) now written. Items 120 – 125's V09 parts and items
122 – 123's V10 parts are written at build depth with wiring, lifecycle, edge rows, tests and decisions; item 126's V09
part follows (a2): two layout classes, no phone layout, screen, notice, catalogue row, Send button, default or test
(T-V9-22 holds T126-1 – T126-3); the remaining "phone" words (V09 l.100, l.186, l.2533, l.3644, l.4258, l.4532, l.4549,
l.4611) state the rule or its removal and design nothing for a phone; V10 has none. The new design's defects are the
issues below: one disagreement with V11 on Start a shower now (VV910-r2-01), one with the base on what a host's week
command writes (VV910-r2-02), an enumeration gap in V10's Find (VV910-r2-03), two wiring gaps in the crisis card
(VV910-r2-04, VV910-r2-08), a panel/clerk split on a disaster's damage lines (VV910-r2-05), and Find's scrubbed-week
edge at V09's end (VV910-r2-09).

## P5 Mechanical checks

* **Ids.** T-V9-1 – T-V9-87, J-V9.1 – J-V9.149, BCR-V9-1 – BCR-V9-37 each defined once; T-V10-1 – T-V10-53,
  J-V10.1 – J-V10.128, BCR-V10-1 – BCR-V10-23, CVR-V10-1 – CVR-V10-22 each once; V09 §3.16 rows 1–94, V10 §3.23 rows 1–35
  and C1–C10; T-V10-50's clause numbers continue 32–35 for the new rows.
* **References.** assemble-r2's resolver: 0 broken. Every "V09 §4.21.n (m)" across the set resolves (0 of all citations
  broken; §4.21.10 has items 1–15, §4.21.12 1–10, §4.21.13 1–5, §4.21.14 1–7); every "V10 §3.9b (n)" resolves (1–8). The
  nine ambiguous forms in V09 (l.318, l.4268, l.4642, l.4698 ×3) and V10 (l.1868, l.2706, l.2731) are confirmed the base's
  (S7). One reference states a reading its target does not hold (V10 l.1010 → V09 §4.21.12 (4)): VV910-r2-04.
* **Tool words** (canon ID-TOOL, whole-word, first use per paragraph or table row): V09 0 bare in prose; V10 2 new bare
  (VV910-r2-06); code comments (V09 §2.3, V10 §2.6, §2.12) unchanged from round 1.
* **Retired terms** (canon glossary, R2-11): 0 new hits. Kept: `kept removed` as the import dialog's user words (unchanged);
  "Rebuild from {stage}" as `refuse.kept`'s and `refuse.water.reservation`'s user words, which V09 §4.9's lead glosses as
  §7.1's Re-derive; "M6" at T-V9-75 and AP11 is V02's stage, not the underground.
* **Deferral wording:** 0.
* **Cohesion.** V09 §8.1 re-summed: base line 16.0–23.5, staged 3.25–5.0, AP11 4.5–6.25, total 23.75–34.75 = INDEX l.32;
  §16's application row 19.5–28.5 = 16.0–23.5 + AP11's base parts 3.5–5, its staged-screens row 4.25–6.25 = 3.25–5.0 +
  1–1.25. V10 §8: 14.75–20.25 (15.25–20.75 with the command-line clerk) = INDEX l.33; M3c 11.25–15 = §16 l.19787. One
  disagreement: INDEX and §16 place Find's clerk content in C3, V10 §8 in C4 (VV910-r2-07).
* **doc_checks** (`--heads docs/ARCHITECTURE.md`; WARNING: reference corpus INCOMPLETE — captures, research/patreon,
  research/devlogs, research/ftg-docs, research/external absent — results NOT authoritative, PROVISIONAL): V09 C1 1/0,
  C2 1/0, C3 282/263 unreviewed, C4 0, S1 0, S2 426/92 unreviewed; V10 C1 0, C2 0, C3 162/142, C4 0, S1 0, S2 304/13.
  Every unreviewed S2 hit is a volume-prefixed pointer ("V09 §4.21", "V10 §5.8" …) that S2 reads against the base's
  headings (checked: 0 unprefixed); the C3 runs are common English and section-number runs.
* **Words** (wc): V09 107 149 → 119 682 (+11.7 %), V10 75 811 → 80 145 (+5.7 %); the growth is the owner items' new
  design (repair-r2-V09: +13 132 new design, −307 for item 126; repair-r2-V10: items 122 and 123), not restatement.

## Issues

| id | sev | kind | owner | claim (short) |
|---|---|---|---|---|
| VV910-r2-01 | major | CONFLICT | V09 | Start a shower now in a week with no live kind: V09 starts dust haze, V11 starts none |
| VV910-r2-02 | major | CONFLICT | V09 | a host's `view.set { week }` moves the Season control and turns follow off — per-viewer keys no host message writes |
| VV910-r2-03 | minor | CONFLICT | V10 | Find's address chips: V10 names place, area, person — §2.9 adds institution |
| VV910-r2-04 | minor | WIRING | V09 | a disaster look's districts have no reading in V09; V10 cites one at V09 §4.21.12 (4) |
| VV910-r2-05 | minor | CONFLICT | V09 | look-level damage lines put in the why card's `plan` section, whose provider rows carry the own level |
| VV910-r2-06 | minor | ID | V10 | two new bare "T1" first uses |
| VV910-r2-07 | minor | COHESION | scope | INDEX and §16 put Find's clerk content in C3; V10 §8 has it in C4 |
| VV910-r2-08 | minor | WIRING | V09 | the crisis card's Ask the assistant uses V10's `why` entry with no `WhyAnswer` to attach |
| VV910-r2-09 | major | EDGE-UNDEFINED | V09 | Find at a scrubbed week (V09's end of VRC2T-07) |

**VV910-r2-01 (V09; major; CONFLICT).** V09 §4.21.14 (4) (l.3651–3656) starts dust haze "where they give none — an arid
row's dry weeks"; §3.16 row 93 (l.1612) gives "dust haze" as that edge's outcome; T-V9-87 (l.4322) asserts "dust haze in an
arid row's dry weeks". V11 §3.25.11, the weather cells' home, rules otherwise: "a week with no live kind starts none"
(V11 l.4645–4647), EI-V11-EDGE-6 "no spell comes, and Start a shower now starts none" (T-V11-48), and "a kind absent from a
band stays absent through it (the arid dry months)". V11's arid row (l.4676) makes V09's example wrong both ways: in its
dry weeks 13–38 the commonest live kind is heat shimmer (2 an hour, dust 1), and in weeks 0–9 and 50–51 no kind is live,
so V09 would start a kind V11's band holds absent. V09's hand-off to V11 for the dust-haze case was not taken. *Required:*
V09 §4.21.14 (4) reads "It starts at once, as the timeline's next spell, the commonest live kind of the view's week (V11
§3.25.11's rule over the climate row's weather cells); in a week with no live kind it starts none, and the button is
disabled with `settings.weather.noneThisWeek` ("No weather comes here this week."). It never starts snow on an `arid` row
or on a row whose winter does not freeze (V11's compile rules hold the columns to it, and the button checks it again)." —
the dust-haze clause deleted; §4.9's `settings.weather.<word>` row adds `noneThisWeek`; §3.16 row 93's outcome "dust haze"
reads "the commonest live kind (heat shimmer in an arid row's dry weeks), or, with none live, the button disabled with
`settings.weather.noneThisWeek`"; T-V9-87's "dust haze in an arid row's dry weeks" reads "heat shimmer in an arid row's
dry weeks, and in a week with no live kind the button disabled with its line (V11 §3.25.11; T-V11-48)".

**VV910-r2-02 (V09; major; CONFLICT).** V09 §4.21.7 (2) (l.3369–3370): "A host's `view.set { week }` (§11.3) is a
command, never an input (item 125 (c)): it moves the control as a user's pick does, turning the switch off" — with §3.16
row 94 (l.1613), T-V9-77 (l.4313: "a host's `view.set { week }` moves the control and turns the switch off") and J-V9.148
(l.4750). The base's homes say otherwise: §2.9's `week` (l.3297–3300) is item 67's drawn week, which "a host's
`view.set { week }` sets … as a view command"; *The week's source* (l.3376–3377) calls it "a view command, as a user's
scrub is"; `yearWeek`'s writers are V09's Season control and DR42 only (l.3330–3332), `seasonFollow` turns false on a
user's "pick of a week or a season" (l.3341), "The `week` key … stays a different key … `yearWeek` is a look only"
(l.3370–3371);
and §11.3 (l.16278–16281) keeps `yearWeek` and `seasonFollow` among the per-viewer keys that never cross the bridge. V09's
clause makes a host message write two per-viewer keys and flip the viewer's follow switch, against V09's own §4.21.7 (1)
("per viewer, never over a bridge"). *Required:* V09 §4.21.7 (2)'s sentence reads "A host's `view.set { week }` (§11.3)
is a command, never an input (item 125 (c)): it sets §2.9's `week` key — item 67's drawn week, which the Works and the
crisis looks are read against — as a user's timeline scrub does, and never writes the year position or the follow switch,
per-viewer keys no host message sets (§2.9, §11.3)."; §3.16 row 94's edge "a host's `view.set { week }` against a moved
control" has the outcome "the drawn week moves; the Season control and its switch stay as the viewer left them"; T-V9-77's
clause reads "a host's `view.set { week }` moves the drawn week and leaves the Season control and its switch unchanged
(item 125 (c); §11.3)"; J-V9.148 drops "and to read a host's `view.set { week }` as a user's pick that turns the switch
off".

**VV910-r2-03 (V10; minor; CONFLICT).** Find's address chip names four target kinds in §2.9's `FindChip` (base l.3042:
"a place, an area (a FindArea.id, V01 §5.4), a person or an institution"), R2-33 (a) and V09 §4.21.10 (1); V10 names three
in three places — §2.13's `FindAnswer.chips[].id` comment (l.1019: "a place, an area (V01 §5.4's FindArea) or a person —
or a dossier chip's anchor"), §3.9b (7) (l.1960: "an address the chip for that place, area or person") and §3.13 step 4's
find form (l.2241: "a place, an area or a person"). *Required:* each of the three reads "a place, an area (V01 §5.4's
`FindArea`), a person or an institution", as §2.9's `FindChip` names them.

**VV910-r2-04 (V09; minor; WIRING).** A disaster look's units — V01's `disasterDistricts(doc, overlay, key)` (V01 §3.16),
at the village rungs V07's units — have no reading in V09 (0 hits), though V09 uses them three times: §4.21.12 (4)'s
`info.crisis.ruinedFor` on "a building in a district a disaster look ruins" (l.3580), §4.21.12 (5)'s **Show** "framing
the look's camps" (l.3588–3589; a disaster look has no camps) and (7)'s **Go to**, "as the card's **Show** does". V01
names "volume 9's crisis card **Show** and Find's `crises` row" as consumers (V01 l.282) and states the frame — the union
of the units' `FindArea` shapes (V01 §5.4 (6), l.3205–3210); V10 §2.13's `LookAnswer.crises.looks[].districts` (l.1010)
reads them "as V09 §4.21.12 (4) reads them", a reading that section does not state, and CVR-V10-22 asks V09 for it.
*Required:* V09 §4.21.12 (4): "… a building in a district a disaster look ruins — one of the districts V01's
`disasterDistricts(doc, overlay, key)` returns at `effectiveKey()` (V01 §3.16), at the village rungs V07's units — …";
(5): "**Show**, framing the look's place — its camps, or for a `disaster` look the union of its units' `FindArea` shapes
(V01 §5.4 (6)) — as **Fit the town** frames the town"; §1b's crisis-lines row adds the input "V01's `disasterDistricts`
for a disaster look's units (V01 §3.16)". V10 l.1010's citation and CVR-V10-22 then resolve.

**VV910-r2-05 (V09; minor; CONFLICT).** V09 §4.21.13 (1) (l.3614–3616) gives the damage lines to "the plan panel … and
the why card's `plan` section", and (3) (l.3629–3631) draws a disaster district's building's lines "at the look's
`lookLevel` … under the head `info.crisis.ruinedFor`". The why card's sections are §11.2's `WhySection` rows (V09 §2.7),
here V03 §4.6's `plan` provider, which carries the building's own level only — "A disaster's look is no row: the clerk
tells it from the look read (V10 §3.9b (8)), and the panel shows it (V03 §4.5)" (V03 l.2384); V10 §3.9a and V10 §3.23 C10
("the `plan` rows stay the building's own"); V03 §4.5 (l.2318–2322) puts the look's lines on the plan panel only. So the
why card and the clerk would list different damage for one building, and T-V9-86's last clause ("volume 10's explanation
of the same building renders the same keys", after the disaster clause) asserts the opposite of C10. *Required:* V09
§4.21.13 (3) reads "In a district a disaster look ruins, the plan panel (V03 §4.5) shows the building's lines at the look's
`lookLevel` by severity, or at its own level where that is higher, under the head `info.crisis.ruinedFor` — a look:
nothing stored, ids and digests unchanged; the why card's `plan` section keeps the `plan` provider's rows at the
building's own level (V03 §4.6), the look named by the card's `facts` row `info.crisis.ruinedFor` (V09 §4.21.12 (4)), as
volume 10 tells it (V10 §3.9a; V10 §3.23 C10)."; T-V9-86's last clause reads "volume 10's explanation of each fixture
building renders the same `info.damage.*` rows at the building's own level, and for the building in the disaster's
district names the look by `info.crisis.*` (V10 §3.23 C10)".

**VV910-r2-06 (V10; minor; ID).** Two first uses written this round lack the tool word (canon ID-TOOL): l.1481 (§3.5 step 3,
"(V10 §4.1's T1 row)") and l.2337 (§3.16's `dossier` row, "(V10 §4.1's T1 row)"). *Required:* both read "V10 §4.1's
T1 `intend` row".

**VV910-r2-07 (scope; minor; COHESION).** INDEX l.33 (V10's row: "C3's Find content at M5's exit") and §16's M3c row
(base l.19741: "C3's item-120 content landing with M5's exit") place Find's clerk content in C3; V10 §8 holds it in C4
("item 120's find form and read (V10 §3.9b (7)), landing with V09's Find panel at M5 …, inside C4's range"; its total
"item 120's find form and read lie within C4's range"), and C3 holds none (repair-r2-V10's VAP-r1-13 note: R2-32 (2)'s
"C3" names the row that does not hold it). *Required:* INDEX l.33 reads "C4's Find content (the find form and read) at
M5's exit" and §16's M3c row "V10 §8's exits (C4's item-120 content — the find form and read — landing with M5's exit)".

**VV910-r2-08 (V09; minor; WIRING).** The crisis card's **Ask the assistant** (V09 §4.21.12 (5), l.3589) is "V10's `why`
entry", which V10 §3.1 (l.1091) and V09 §4.11 (l.2491–2492) define as the why card's question "with the fetched
`WhyAnswer` attached" on the `explain` route; a crisis look has no `WhyAnswer` (V10 J-V10.125: a look is per viewer and per
week, never a model-side section), so the entry's input is undefined. *Required:* V09 §4.21.12 (5): "**Ask the assistant**
— the card's line as the question on V10's `drawer` entry (`ClerkHandle.send(text, 'drawer')`, no attachment), the clerk
reading the look by `read_map { kind: 'look' }` (V10 §3.9b (8); prompt rule 21) — hidden without an enabled clerk".

**VV910-r2-09 (V09; major; EDGE-UNDEFINED).** Find at a drawn week whose frame is not the head (principle (11); V09's end
of verify-rendering-r2t's VRC2T-07). V09 §4.21.10 (7) (l.3483) rebuilds the index "once per commit, regenerate, undo,
redo, advance, load and migration, and at each `onEffectiveKey`" over §11.2's gazetteer listing, which answers over the
head; (1) keeps the filter "through zoom, pan, band, layer, season, advance …" — never naming a change of §2.9's `week`
(a timeline scrub, V09 §5.6; a host's `view.set { week }`). On a scrubbed past frame (V06 §3.15.2) the panel's counts,
results, pins, ghost pins and gaps are undefined: by the text they glow, count and list buildings the frame does not hold.
§3.16 rows 86–88 and T-V9-83 test no week change. *Required:* V09 §4.21.10 (7)'s triggers add "each change of §2.9's
`week` (a timeline scrub, a host's `view.set { week }`)", and (8) states: "At a drawn week whose frame is not the head
(V06 §3.15.2), each chip's matches — its glow, pins, ghost pins, gaps, counts and results — are §11.2's listing restricted
to the entities that frame holds: a match the frame lacks is neither drawn, pinned, counted nor listed, a chip with none
there reads count 0 for that week (`find.none`), and the chips themselves are unchanged."; §3.16 row 87 adds the edge "a
scrub to a week before a matched building was built, and after a closed use's end" with that outcome; T-V9-83 (e) adds the
scrub; V10 §3.9b (7)'s `read_map find` reads the same restriction (the clerk counts what the panel shows). The base end
(§8.2's *Find*, T-ER-25) is VRC2T-07's.

Totals: 9 issues — 0 blocker, 3 major, 6 minor; owners V09 6, V10 2, scope 1.
