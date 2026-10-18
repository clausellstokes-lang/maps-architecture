# Retrovalidation confirm — realm family (lane retrovalidation/confirm-realm)

Lane `retrovalidation/confirm-realm` (Fable 5.1, high; J392 — the confirming check on `apply-realm`, under J390: Fable
judges and validates, Opus verifies and applies). No git command run; the host tree at 81f1cd96 was not opened by this
lane (nothing in the apply needed a host fact) and not modified.

**Read whole for this record:** `realm.verdict.json` (verdict, 25 corrections, 61 rulings, notice_replacement, summary);
`apply-realm.md` (the apply record, with its `apply.py`, `apply.out` and the before copy
`…/scratchpad/retro/apply-realm/fp-realm-review.before.md`, md5 `2f62d9b4e517f8855d95e4c0a90d73bc`, 870 lines);
`research/sf/fp-realm-review.md` as it stands after the apply (872 lines, md5 `0a9e5dcfd1dffc59e8cfbced6aefe590`,
lines 1–872, nothing sampled); `realm-verify.md` (the verifier's 13 findings) and `realm.findings.json`; `realm.md`
(the validator's record: its findings, rulings table, corrections table and notice replacement). Also opened for one
fact each: `amendments.verdict.json` correction index 24 (the cross-family fragment aimed at this file),
`rulings.md` J382(b) and C1, `docs/AMENDMENTS-2026-10-18s.md` item 928, `docs/volumes/V13-world.md:825`,
`apply-design.md` rows for V13 §2.2 `waterLanes`.

**Verdict on apply-realm: PASS.** Every verdict correction landed verbatim; nothing else moved; the notice line is the
verdict's; the bundle is fresh; the apply lane's one addition (A1) is CONFIRMED. Three residuals are recorded below
with exact fixes — none is an apply-realm defect, and none needs this file re-edited by that lane.

Status: LANDED.

## 1 Independent check (script `…/scratchpad/retro/confirm-realm/check.py`, output `check.out` beside it)

- **Scope of the verdict.** 25 corrections, all `kind: research`, all on `research/sf/fp-realm-review.md`; no `design`,
  no `record`, none on `docs/PROGRESS.md`. So the apply lane owed exactly 25 fragments plus the notice; nothing from this
  family goes to J392 by the verdict's own statement, and no amendments-s item is owed by this family (the one design
  change it needs, V13 §2.2 `waterLanes.lit`, is `rulings.md`'s C1 — see §3).
- **Each correction, before and after.** For every one of the 25: `old` occurs exactly once in the before copy, `new`
  zero times; after the apply `new` occurs exactly once and `old` zero times — except C25 (§6 Q-RR-1), whose `new`
  keeps the `old` whole and appends the dated bracket, so `old` survives once inside its `new`, as the verdict wrote it.
  The line numbers match the apply table in every row (C1 15, C2 23, C3 134, C4 90, C5 92, C6 129, C7 142, C8 180,
  C9 190, C10 533, C11 591, C12 613, C13 532, C14 608, C15 608, C16 609, C17 612, C18 615, C19 740→742, C20 511,
  C21 171, C22 783→785, C23 859→861, C24 860→862, C25 683); the two-line shift from C19 on is C25's bracket (three
  lines where there was one).
- **Reconstruction.** The before copy + the 25 verdict strings applied in verdict order + the notice line replaced =
  md5 `8107de45…`, which is NOT the current file; that reconstruction + A1's exact strings (as the apply record gives
  them) = md5 `0a9e5dcf…`, byte-identical to the current file. So the file carries precisely the 25 corrections, the
  notice and A1, and nothing else. Trailing newline kept.
- **Diff.** `diff -U0` before/now: 21 hunks, every one mapped to a fragment — l. 3 (notice), 15 (C1), 23–24 (C2),
  90–94 (C4, C5), 129 (C6), 134–135 (C3), 142 (C7), 172 (C21's second line), 180 (C8), 190 (C9), 511 (C20), 532–533
  (C13, C10), 591 (C11), 608–609 (C14, C15, C16), 612–613 (C17, C12), 615 (C18), 677 (A1), 684 (C25, +2 lines),
  740→742 (C19), 783→785 (C22), 859–860→861–862 (C23, C24). Nothing moved beyond what the apply record states.
- **Notice.** The before copy's line 3 was the one PENDING line in the file: "> PENDING FABLE REVIEW — written by Opus 5.5
  standing in for the Fable seat research/sf-fp-realm-review; to be retrovalidated overall at the next opportunity
  (owner, 2026-10-17, J375)". Line 3 now equals the verdict's `notice_replacement` byte for byte; `grep -c "PENDING FABLE
  REVIEW"` → 0; the family is this one file. 15 "Fable-reviewed 2026-10-18" strings now (0 before): 13 bracketed
  corrections (C2, C3, C4, C5, C10, C11, C12, C14, C16, C17, C18, C21, C25) + A1 + the notice.
- **Bundle.** `python3 tools/bundle_architecture.py --check` → "UP TO DATE …/docs/ARCHITECTURE-FULL.md", exit 0 (the
  research note is not a bundle source; the apply changed no base or volume).
- **Lane log.** One `retrovalidation/apply-realm LANDED` line at 05:28 (log line 9616); no CHECKPOINT was due.
- **Amendments file s.** Not owed by this family (no design correction). For the record: the realm family's one owed
  design fragment, `rulings.md` C1 (V13 §2.2 `waterLanes.lit`), is applied — V13 :825 now carries "lit as its caravans
  read it: its frozen record carries a versioned lane slot with at least one lane, never its fleet switch (V13 §8.5's
  H25)", recorded as file s item 928 by `apply-design.md`. The verdict's "not duplicated" holds: the realm verdict
  wrote no second copy.

## 2 A1 — CONFIRMED

The apply lane changed l. 677 (§6 preamble) from `(J382, "yes") and are ruled into J-RR.49 and J-RR.52.` to
`(J382, "yes") and are ruled into J-RR.49 (with RR-46) — never into J-RR.52, which carries no J382 clause
[Fable-reviewed 2026-10-18: RV-4's second site].` — a fragment the verdict did not write.

Confirmed, on four grounds:

1. **The finding is accepted and names both sites.** RV-4 (`realm-verify.md`, `realm.findings.json`) reads "header
   (lines 22-24) and §6 preamble (line 677)" and its fix "In both places replace…". The validator ACCEPTED RV-4
   (`realm.md`, RV-4 row) and wrote the header site only (C2). The §6 site carried the identical imprecise claim.
2. **The claim is wrong at the second site too, by the note's own text.** J-RR.52 (now l. 611) rules military
   strength as the tie-breaker and ends "no water cell is ever held, so naval strength breaks no tie" — no J382 clause,
   no "J382". Both halves of J382 (culture as resistance; water as cheap carriage along lit lanes to a lodgement) sit in
   J-RR.49 (l. 608) and in RR-46's §3 summary (l. 186: "J382: culture slows each step … and water carries the sway only
   along the host's lit lanes, to a coastal lodgement, never the far shore (J-RR.49)"). RV-4's reading holds; I checked
   it against the current file, not the verifier's line numbers.
3. **The form is the verdict's own.** A1 reuses C2's wording ("(with RR-46) — never into J-RR.52, which carries no J382
   clause") and a dated bracket that says what it is ("RV-4's second site"), so the record is kept, not rewritten.
4. **No-deferrals.** An accepted finding with a named site and an exact fix cannot end half-applied; leaving l. 677 as
   it was would have deferred the verifier's finding without ruling it INVALID. The apply lane did the right thing and
   flagged it for this check instead of silently extending the verdict.

The exact old and new strings are in `apply-realm.md`; the reconstruction in §1 proves they are the only change beyond
the verdict's. A1 stands.

## 3 Residuals (none an apply-realm defect; exact fixes, routed)

**R1 — the counts in two Fable records say 25 where the file carries 26 fragments.** The notice line (l. 3, verbatim
from the verdict) says "25 research corrections"; `realm.md`'s RV-4 row says "(corrections 2, 20)", but its #20 is
RR-8's register bracket (J-RR.57), which does not touch RV-4's second site — the §6 site was never written there. The
apply lane was right to leave the notice verbatim (its task said so). Exact fixes, for J392 to carry or for the owner:
- `research/sf/fp-realm-review.md` l. 3: `25 research corrections, no new design fragment` → `25 research corrections
  (26 fragments: RV-4's second site, the §6 preamble, applied by the apply lane and confirmed at the Fable check), no
  new design fragment`.
- `docs/validation/retrovalidation-2026-10-18/realm.md`, RV-4 row, last cell: `(corrections 2, 20)` → `(correction 2;
  its second site, the §6 preamble l. 677, applied as apply-realm's A1, confirmed by confirm-realm)`.
Neither file is this lane's to edit.

**R2 — one correction from another family is still owed to this file, and its text is malformed.**
`amendments.verdict.json` correction index 24 (AV-8, kind research) targets RR-1 (l. 103): "31 modules" → "32". No
`apply-amendments.md` exists yet; its `old` still occurs exactly once in the current file (checked), so it will apply
cleanly. Its `new` opens a bracket inside a bracket and closes one: `[OBSERVED; [Fable-reviewed 2026-10-18: 32 by an
import-aware count at `81f1cd96`, lane amendments AV-8];`. Exact fix for whoever applies it — use this `new` instead:
`read through one gate by 32 modules (`campaignSpatialCanonize.js:36,158-186`; `distanceRead.js:115-132`) [OBSERVED;
Fable-reviewed 2026-10-18: 32 by an import-aware count at `81f1cd96`, lane amendments AV-8];`. (The realm verdict's
J-RR.1 reason and `realm-verify.md` say 31; the count is the amendments family's finding and is not re-judged here.)

**R3 — the §3 summaries and §5 H16 still carry pre-amendment wording: INVALID as a defect.** The apply lane observed
that RR-7 (l. 160, horizons "only for user events and polity supersession"), RR-46 (l. 186, "lit lanes" undefined),
RR-47 (l. 188, no host push), RR-50 (l. 206, bands "moved only by the host's own engagement kinds"), RR-54 (l. 229,
"moved one rung by hostility and grade") and §5 H16 (l. 663, "owner-signed re-ruling") read as the rulings stood before
J384/J385/J-V13.97. Ruled not a defect, by the validator's own method, which this lane keeps: (a) the §3 preface
(l. 93) says each finding's refinement is read "with the J-RR row of §4", and each of the five summaries ends with its
pointer — (J-RR.40, J-RR.42), (J-RR.49), (J-RR.50), (J-RR.56), (J-RR.54) — and every pointed row now carries the dated
bracket with the amended text; (b) the one §3 summary the verdict did bracket, RR-8 (C21), is the one a ruling row
cites by reference ("the register words of RR-8", J-RR.57) rather than restating, so the list itself had to be kept
honest — the five above are restated in full in their rows; (c) §5 sits whole under its own dated bracket of
2026-10-17 (l. 562–577), which says the list is SUPERSEDED BY V13 §8.5 and "records the gate rule as J385 ruled it
(H16)", and the verdict's §10 entry records row 5's "owner-signed re-ruling" as since refined (J-RR.53). The record
is a record; the design in force is V13, which states every amended ruling (checked by the validator line by line).
No fragment owed.

## 4 For J392

Nothing from the apply: no design or record correction, no PROGRESS row. Two routed items: R1's two count fixes
(the notice line and `realm.md`'s RV-4 row) and R2's AV-8 bracket fix for the amendments apply.

## 5 Files

- Written by this lane: this record; the LANDED line in `docs/lane-events.log`.
- Scratch: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-realm/check.py` and `check.out`.
- Not touched: `research/sf/fp-realm-review.md` (confirmed as the apply left it), `apply-realm.md`, `realm.md`, the
  verdict JSONs, the host repository.
