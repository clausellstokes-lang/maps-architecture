# verify-rendering-r6t — base §8, §9, §11, §12 after repair round 6

> Lane `coherence/verify-rendering-r6t` (opus verifier). Base `docs/ARCHITECTURE.md` sha256 f39f1c30… (assemble-r6's output,
> HEAD db26bb9, the working tree identical); before the round 2d84eac2… (`git show b3f83a0`). Rationale unchanged in scope.
> Scratch: `scratchpad/coherence/vr6/`.

PROGRESS
- P0 brief read whole; RESUME/CONTINUE check (no output, no LANDED): done
- P1 inputs: verify-rendering-r5t (6 findings), adjudication-r6 (R6-01, R6-02 with its rendering Ends (R1)–(R4), R6-04, R6-06,
  R6-07, R6-10, Part H · rendering, scope, model, pipeline, V09, V11, V12, Part P), repair-r6-rendering's header (issues,
  END lines, sweeps, notes, hand-offs), assemble-r6 (only rendering's 8 blocks touch §8, §9, §11, §12): done
- P2 the 8 replaced subsections' word diffs read whole, pre → live: done (exactly §8.2, §8.4, §8.9, §8.11, §9.5, §11.1,
  §11.2, §11.6 differ; the 30 other subsections of the four sections byte-identical)
- P3 round-5 findings re-checked against the live text, each END line's second end included: done (all six FIXED; VRC5T-05's
  clause opens a new conflict, VRC6T-01)
- P4 doc checks, references, terms, review ids, deferral, phone, R6-02 and R6-03 sweeps in scope: done
- P5 new findings, report, result, LANDED: done

## 1. What changed in scope

Pre-round base 2d84eac2… (HEAD b3f83a0) against live f39f1c30… (HEAD db26bb9). Only `repair-r6-rendering.md`'s 8 REPLACE
blocks touch §8, §9, §11 and §12 (assemble-r6: 142 blocks, 0 overlaps; model's, pipeline's, determinism's and scope's lie
outside). Eight subsections replaced, each word diff read whole; every other subsection byte-identical.

| subsection | words pre → live | what the round wrote |
|---|---|---|
| §8.2 | 18 651 → 18 823 | `StyleSheet.groups?` (VAT-r5-04: `trees`, `pins`, a logged `setStyle`, kept under a viewer's preset, no shadow, surface or hit when off); *The layer*: a preview's marks are every crisis mark drawn, Show and Go to frame by V09 §4.21.12 (5)'s rule (VAT-r5-03), the handle serving that reading only and the hit slices leaving crisis marks out (VRC5T-02); the `hatched` row's "drawing groups named, `StyleSheet.groups`" (R6-10) |
| §8.4 | 7 097 → 7 123 | *Toggles are visibility*: trees and pins switched by `StyleSheet.groups`, no drawing group by `setLayer` (VAT-r5-04); (R1) heightfield writers and (R2) shadow casters: "a run beneath a raised way's standing deck capped at the soffit there, §2.7's crossing table" |
| §8.9 | 3 104 → 3 108 | the slices row: "entity handles, `live.crises`' marks excepted (§8.2)" (VRC5T-02) |
| §8.11 | 4 186 → 4 252 | T-ER-27: a click under a standing look, and a `looks` query whose building names a district and whose field a plot, with their outcomes and the bar "0 crisis marks in any hit stack" (VRC5T-02, VRC5T-05) |
| §9.5 | 1 601 → 1 613 | *Annotation layer*: the view pins and public notes, each a numbered marker keyed on the legend sheet (VAT-r5-02) |
| §11.1 | 6 633 → 6 643 | (R3) glTF: the run capped at the soffit there; a `vault` span under a wall read `open`, no end walls; (R4) CityJSON the same cap |
| §11.2 | 8 943 → 9 107 | `ExportOpts.pins`: each view pin and public note a numbered marker (anchors by kind, the numbering order, a withheld thing's note left out) (VAT-r5-02); `LooksAnswer.crises[].over`: absent where the building or field names none, never an error (VRC5T-05) |
| §11.6 | 572 → 631 | T-ER-19: public notes on a building, a way and a withheld building, with their markers' outcome |

Size (principle (9)): §8 + §9 + §11 + §12 96 178 → 96 691 words this round (+513, +0.5 %); against the pre-coherence archive
59 158 → 96 691. The growth is the fixes' own content: `groups`, the note markers and their numbering, the crisis marks'
hit rule, `over`'s none case, and the test inputs. The words removed were read against the new text, and each is
equivalent or made exact. "drawn as the view draws them" is replaced by the drawing rule VAT-r5-02 asked for. "span topped
at its soffit … support step (6) (d)" becomes "standing deck capped at the soffit there … crossing table", matching
R6-02's *The cap*, which also takes a support bearing a standing span. "its **Show** frames every crisis mark" becomes "its
marks are every crisis mark drawn", with Show framed by V09's rule. "layers named" becomes "drawing groups named". No
nuance was lost, nothing was cut for the shrink goal, and no nuance audit was triggered.

## 2. Round-5 findings re-checked

| id | Part H | verdict | evidence (live) |
|---|---|---|---|
| VRC4T-04 | MERGED into VAP-r5-01 (scope; R6-04) | **FIXED** | T120-6 (§13.2 l. 18771–18775) adds "at a drawn week whose frame is not the head the chips re-evaluated within ≈ 100 ms of that frame being drawn, the frame never waiting for them (§12.5; that clause from the later of M5 and V06's E6 …)". §13.8's row (l. 19485) reads "M5 (its drawn-week clause at the later of M5 and V06's E6)". V12's END is written: the §3.4 row (l. 1173, "a drawn week's frame (one that is not the head) drawn to its chips' re-evaluated glow drawn"), §3.15.10's bullet (l. 2643), T-V12-52's planted re-evaluation over 100 ms and its cell (l. 3176). All of them agree with §12.5 and R12-35. |
| VRC5T-01 | FIX per R6-02 (model) | **FIXED** | The home: §2.7's crossing table, *beneath*'s *The cap* (l. 2635–2640): "the lower of its own top and the lowest soffit there … (the soffit lower: the arch walled up to its crown; the run lower: the arch open above it)". Its readers are "§4.5's daylight casters, §8.4's casters and heightfield, §11.1's glTF wall and CityJSON wall objects", so CityJSON is now listed. The ends are written as ruled: (R1) l. 13723, (R2) l. 13947–13948, (R3) and (R4) l. 16038–16039, (P5) §4.5 l. 6232, (D7) §7.1's row (now carries no height), (S1) (3) T110-2 l. 18557–18559 (including the span whose soffit stands above the ring's top, the arch open above it), and (V6-21) T-V6-47 (V06 l. 4170). A sweep of the base, rationale, volumes and INDEX finds no "topped at", "to its soffit", "up to a span's soffit" or "no higher than that span" left. |
| VRC5T-02 | FIX (R6-10) | **FIXED** | §8.2 *The layer* (l. 13233–13234) reads "The handle serves that reading only: §8.9's hit-test slices leave `live.crises`' marks out, so a click, §11.2's `HitAnswer` and V10's `entity { at }` reach what lies beneath them (V09 §4.20.8)". §8.9's slices row (l. 14551) is written. `HitAnswer` is "computed on the main thread from the hit-test slices (§8.9)" (l. 16418), so the exception reaches it, and V09 §4.20.8 (5) and V10 take its top. T-ER-27 adds the input, the outcome and "0 crisis marks in any hit stack", each in its place. |
| VRC5T-03 | FIX (R6-07; scope) | **FIXED** | T123-7 (l. 18829–18831) reads "a never-decayed building under no disaster look (§6.3 *Plan damage*) keeps its plan byte for byte". The ENDs are written. V12: l. 934's `entities`, §2.13's `entityScope` comment (l. 903–906), §3.7's pin text (l. 1747–1748) and l. 2762–2764, each with "and over which no disaster look stands at the drawn week". V03: T-V3-39 (g) "under no disaster look". V04: l. 2971–2972 and UE33 E1 (l. 2435). V11: l. 3828 and l. 4650. §6.3 (l. 10053–10054) and §8.6 (l. 14207) agree. |
| VRC5T-04 | FIX (R6-10; V09) | **FIXED** | V09 §4.21.11 (2) (l. 3600–3604) reads "… and a change Auto's loop decides or a device-pixel-ratio change brings at most once in 10 s, counted together, so one coming within 10 s of the last applies when those 10 s end (§8.8)". T-V9-84 (l. 4442) reads "… and at most once in 10 s, so a monitor change within 10 s of a loop step-down applies once those 10 s have passed (§8.8; T121-7)". Row 89 (l. 1612) carries the case. All three agree with §8.8 and T-ER-26. |
| VRC5T-05 | FIX (R6-06 (b)) | **FIXED as ruled** | `LooksAnswer.crises[].over` (l. 16440) adds "absent on every look where the model the view draws holds no building at the query's building, or no field at its field (an address it lacks, or one of another kind), every other member as without it — never an error (V10 §3.23 row 34)". T-ER-27 adds the input and outcome. V10's row 34 (l. 2733) cites it. Its wording, which is mine from round 5, now disagrees with row 34's both-members case: VRC6T-01. |

The other ids Part H routed to rendering were read in the new text and are written as ruled. VAT-r5-02: §11.2's `pins`, §9.5,
T-ER-19, and V09's entity-table END (l. 4171). VAT-r5-03: §8.2's framing agrees with V09 §4.21.12 (5) (l. 3670–3676):
the box of the marks, a `disaster` look's units' `FindArea` union, the town's frame where nothing is drawn. VAT-r5-04:
`StyleSheet.groups`, §8.4, the `hatched` row; its ends are §2.1 (l. 556), §4.9 (l. 8010), V01 l. 2624, 2775 and 3037,
T-V1-56 (c), V04 l. 2789 and J-V4.96, and V09's T12 `dress` row (l. 1825), with no "`pins` layer", "`trees` layer",
"`pins` toggle" or "trees are a layer toggle" left in the set. The slots cited (V01 §5.1.3's 10 and 16) are those rows. The
anchors cited (§8.2's Find pins, l. 13264; V10 §3.6 rule 1, l. 1561–1565) give the positions T-ER-19 asserts.

## 3. Checks

* **R6-02 in scope (round-6 note (6) (b)).** §8, §9, §11 and §12 contain no "crossing station", "raised gate", "wall
  opening", "held stretch", "support step", "(6) (d)", `bend.wall.*`, `bend.raised.*`, `W_RAISED_CROSSING`, "gate's
  line", "wall arch" or "through an arch". (i) The cells my scope reads are *beneath*'s cap and the `vault` span read
  `open`. Each gives one outcome and names its tests (C2 T110-2 (3), T-V6-47, T-V7-48; C3–C5 T110-2 (7)). (ii) No site
  restates the tables; the four sites cite §2.7's crossing table, and §11.1's end walls cite it with *beneath*. (iii) Every
  outcome cited exists. `archVault` (§8.2 l. 13413) and CityJSON's `BridgeRoom` read V04's arch-vault records, which V04's
  reconcile removes under a wall; no other text in scope reads a span's `use`.
* **R6-03 in scope.** No "lateCalamit", "late calamit" or held-calamity clause appears.
* `doc_checks.py --sections 8,9,11,12` exits 0 with these hits/unreviewed counts: C1 5/0, C2 1/0, C3 191/0, C4 3/0, S1 0/0,
  S2 298/0. The tool printed this warning: reference corpus INCOMPLETE (captures, research/patreon, research/devlogs,
  research/ftg-docs, research/external absent), so the clean-room results are NOT authoritative and this result is
  provisional.
* **References.** `work/assemble-r6/refs.py` ran over the live set (56 555 references). In §8, §9, §11 and §12: 2 592
  resolved, 2 external (RFC 7946 §3.1.6, §4), 1 ambiguous form (V06 §2.3, §4.1; pre-existing), 0 broken. These new
  references were checked by hand: §2.7's crossing table and *beneath*, V01 §5.1.3's slots 10 and 16, V09 §4.20.8, V09
  §4.21.12 (5), V09 §5.10, V10 §3.6 rule 1, V10 §3.23 row 34, §11.3, §7.4's row.
* **Terms.** The canon glossary's retired-term patterns were counted pre and live in each changed subsection; none was added.
  No review id or PRB6 marker appears in the changed text. No deferral wording was added: every "later" is "the later of
  M… and V06's E6", or the pre-existing "later pin", "later entity" and "later export". No phone clause appears (item 126 (a2)).
* Checked and not a finding: SVG's `<metadata>` maps subpaths to model entity ids, and a crisis mark is an overlay mark,
  not a model entity. V08's party pictures always draw public notes and pins (V08 l. 2300, 3110), but they are made on
  `party.render`, never through `exportPicture`, so `ExportOpts.pins`' default does not bind them; that text predates this
  round. `setStyle`'s `RowOp[]` already addresses sheet members (a random style's roles, V01's `details` and `shadows`),
  so `groups` needs no new event.

## 4. New findings

* **VRC6T-01 (major, CONFLICT, rendering).** The case is a `looks` query with both members, one naming nothing. §11.2's
  `over` (l. 16440) makes `over` absent on every look when either the building or the field names nothing. V10 §3.23 row
  34 (l. 2733), which cites it as its home, composes by look kind: "each disaster look's `over` as asked with the building
  alone and each famine look's as asked with the field alone". Take a district as the building and a bare field as the
  field. V10 gives the famine look `over` true; §11.2 gives no `over`. R6-01 grades two outcomes for one case MAJOR. My
  round-5 wording carried the ambiguity, and T-ER-27's new input (both members naming nothing) cannot tell the two builds
  apart.
* **VRC6T-02 (major, EDGE-UNDEFINED, rendering).** `ExportOpts.pins` (l. 16323–16329) numbers every view pin and public
  note "from 1" and keys them on the legend sheet. It leaves out only a note on a withheld thing. It gives no outcome for
  two cases. One is a pin or note anchor outside the export's frame; a current-view or district picture (V09 §5.10) is the
  normal case. The other is a note whose thing the drawn model lacks at the export's drawn week: demolished before it,
  or built after it (§4.11). Builders would differ on whether the legend keys markers the picture lacks, on whether the
  numbers have gaps, and on whether a note is drawn at a thing absent from the picture. T-ER-19 runs neither case.
* **VRC6T-03 (major, EDGE-UNTESTED, rendering).** `StyleSheet.groups` (l. 12601) states these outcomes: a switched-off
  group casts no shadow, writes no surface and takes no hit; a picture draws what the style draws; the switch is kept
  under a viewer's `stylePreset`; a missing member reads true. The only bar is T-V1-56 (c): "the group hidden, logged as
  one `setStyle`, undone, the model digest unchanged". A build that hides tree marks while the light pass still casts their
  shadows from §8.10's instances passes every bar. So does one where a hidden pin still answers a click. R6-01 grades this
  MAJOR (a bar that passes a wrong result), and principle (11) names every toggle.
* **VRC6T-04 (minor, DISAGREE, rendering).** §11.3 (l. 16815–16817) says that under a viewer's preset "the document's own
  rows (thematic overrides, ground-cover regions) apply on top". That list omits `StyleSheet.groups`, which §8.2 now keeps
  under a preset "as the document's rows are (§11.3)". §8.2 states the rule itself, so nothing built changes; the defect
  is a list omitting an item its rule names.

## 5. Issues (the result's list)

| id | severity | kind | owner | short |
|---|---|---|---|---|
| VRC6T-01 | major | CONFLICT | rendering | `over` with one member naming nothing: §11.2 blanks every look, V10 row 34 composes by look kind |
| VRC6T-02 | major | EDGE-UNDEFINED | rendering | a picture's pins and notes outside its frame, or a note on a thing absent at the drawn week: drawing, numbering and legend undefined |
| VRC6T-03 | major | EDGE-UNTESTED | rendering | `StyleSheet.groups`' shadow, surface, hit, picture and preset outcomes have no bar |
| VRC6T-04 | minor | DISAGREE | rendering | §11.3's preset list omits `StyleSheet.groups` |

Totals: 4 issues — 0 blocker, 3 major, 1 minor; all owned by rendering. Round-5 findings: 6 FIXED (VRC4T-04 through
VAP-r5-01). Ids outside both keep their earlier verdict. The exact required changes are in
`docs/validation/coherence/results/coherence_verify-rendering-r6t.json`.
