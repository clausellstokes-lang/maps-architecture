# Retrovalidation apply — realm family (lane retrovalidation/apply-realm)

Lane `retrovalidation/apply-realm` (Opus 5.5, high; J390, Fable-checked). Source of corrections:
`docs/validation/retrovalidation-2026-10-18/realm.verdict.json`, read whole (verdict PASS-WITH-CORRECTIONS; summary,
61 rulings entries, notice_replacement, 25 corrections, all `kind: research` on `research/sf/fp-realm-review.md`;
0 `design`, 0 `record`, none aimed at `docs/PROGRESS.md`). `realm.md`'s corrections table and `realm-verify.md`'s
RV-4 row were read to check one gap (below). No git command run; the host repository was not touched.

Family file (the realm family is this one file): `research/sf/fp-realm-review.md` — before: 870 lines, md5
`2f62d9b4e517f8855d95e4c0a90d73bc` (copy at
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-realm/fp-realm-review.before.md`);
after: 872 lines (correction 24's bracket adds two lines), md5 `0a9e5dcfd1dffc59e8cfbced6aefe590`. The after-file was
read whole (lines 1-872) once the fragments were in.

Status: LANDED.

## Method

Script `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-realm/apply.py`
(output in `apply.out` beside it): for each realm-family correction of kind research or record, in verdict order,
assert the `old` text occurs exactly once in the current file and replace it with `new` once; then replace every line
beginning "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat" with the verdict's
`notice_replacement`. Pre-check before any write: all 25 `old` texts occurred exactly once, no `new` text was already
present, one notice line (line 3). Post-check: every `new` text occurs exactly once; no `old` survives except C25's,
whose `new` keeps the `old` whole and appends a bracket (expected); undoing the 25 replacements and the notice in
reverse reproduced the before-file byte for byte (round-trip identical: True). Then one further fragment (A1 below)
was applied by the same assert-once rule.

## Fragments applied to research/sf/fp-realm-review.md (25 from the verdict + A1 + the notice)

"C" = the verdict's correction index; "realm.md #" = the validator's table number (14a/14b split there). Line before =
where the `old` began in the before-file; line after = where the `new` begins in the after-file. Bracket = the `new`
carries a dated [Fable-reviewed 2026-10-18 …] record bracket as the correction itself writes it; none was added where
the correction gives none.

| C | realm.md # | finding / ruling | line before | line after | bracket | result |
|---|---|---|---|---|---|---|
| C1 | 1 | RV-12 (tag legend) | 15 | 15 | no | applied, old found once |
| C2 | 2 | RV-4 (header, J382 into J-RR.49 with RR-46) | 23 | 23 | yes | applied, old found once |
| C3 | 3 | RV-1 (RR-5: twelve canon axes) | 134 | 134 | yes | applied, old found once |
| C4 | 4 | RV-6 (§3 preface: 33 of 36 missed merge) | 90 | 90 | yes | applied, old found once |
| C5 | 5 | RV-5 (§3 preface: item 751 every finding but RR-59) | 92 | 92 | yes | applied, old found once |
| C6 | 6 | RV-3 (RR-4 edge-id citation) | 129 | 129 | no | applied, old found once |
| C7 | 7 | RV-6 (RR-6 From + TR missed 1) | 142 | 142 | no | applied, old found once |
| C8 | 8 | RV-13 (RR-9 OD-FC-22 source tags) | 180 | 180 | no | applied, old found once |
| C9 | 9 | RV-2 (RR-10 army-time formula) | 190 | 190 | no | applied, old found once |
| C10 | 10 | J-RR.9 AMENDED (adoption paths) | 533 | 533 | yes | applied, old found once |
| C11 | 11 | J-RR.42 AMENDED (plates horizon) | 591 | 591 | yes | applied, old found once |
| C12 | 12 | J-RR.54 AMENDED (forceShift) | 613 | 613 | yes | applied, old found once |
| C13 | 13 | RV-11 / J-RR.8 AMENDED (four presentation inputs) | 532 | 532 | no | applied, old found once |
| C14 | 14a | J-RR.49 AMENDED (1) (kSize, kProsperity) | 608 | 608 | yes | applied, old found once |
| C15 | 14b | J-RR.49 AMENDED (2) ("lit" lanes) | 608 | 608 | no (correction gives none) | applied, old found once (same line as C14, no overlap) |
| C16 | 15 | J-RR.50 AMENDED (host push; `outranked`) | 609 | 609 | yes | applied, old found once |
| C17 | 16 | J-RR.53 AMENDED (J385 gate ruling) | 612 | 612 | yes | applied, old found once |
| C18 | 17 | J-RR.56 AMENDED (VERDICTS move MarchHold) | 615 | 615 | yes | applied, old found once |
| C19 | 18 | RV-10 (§8 fragile-leg flag) | 740 | 742 | no | applied, old found once |
| C20 | 19 | RV-6 (RR-59 From + PS missed 4) | 511 | 511 | no | applied, old found once |
| C21 | 20 | J-RR.57 UPHELD as extended (RR-8 register) | 171 | 171 | yes | applied, old found once |
| C22 | 21 | RV-7 (§9 cultureDistance sixth pull) | 783 | 785 | no | applied, old found once |
| C23 | 22 | RV-8 (§10 row 40 widths) | 859 | 861 | no | applied, old found once |
| C24 | 23 | RV-9 (§10 row 41 keyframe) | 860 | 862 | no | applied, old found once |
| C25 | 24 | §6 Q-RR-1 answered (dated bracket) | 683 | 683 | yes | applied, old found once (old kept, bracket appended) |
| A1 | — | RV-4's second site (§6 preamble) | 677 | 677 | yes | applied, old found once — see below |
| notice | — | PENDING notice → notice_replacement | 3 | 3 | — | replaced (one line; no other PENDING line in the file) |

No verdict correction failed to match; no adjustment to any verdict fragment was needed.

### A1 — the one fragment not written in the verdict (RV-4's second site)

The verifier's RV-4 (`realm-verify.md:58`, `realm.findings.json`) names two places — "header (lines 22-24) and §6
preamble (line 677)" — and its fix reads "In both places replace 'J-RR.49 and J-RR.52' with 'J-RR.49 (with RR-46)'".
The validator ACCEPTED RV-4 (`realm.md:62`) but wrote a correction for the header only (C2); the §6 preamble kept
"(J382, "yes") and are ruled into J-RR.49 and J-RR.52." — the same claim RV-4 showed IMPRECISE (J-RR.52 carries no
J382 clause). Under the no-deferrals rule this lane applied the accepted finding's own fix at its second site, in C2's
form, by exact match (old found once, new once after):

- old: `(J382, "yes") and are ruled into J-RR.49 and J-RR.52.`
- new: `(J382, "yes") and are ruled into J-RR.49 (with RR-46) — never into J-RR.52, which carries no J382 clause [Fable-reviewed 2026-10-18: RV-4's second site].`

Consequence for the Fable check: the file now carries 26 research fragments where the notice line (verbatim from the
verdict) says 25; the notice was not altered. If the Fable check vetoes A1, reverse it by the exact strings above.

## Not applied here

- Corrections of kind `design`: none in `realm.verdict.json`. (The design fragment this family needs, V13 §2.2 :812
  `waterLanes` *lit*, is `rulings.md`'s C1, per the verdict; the design lane applies it.)
- Corrections of kind `record` / to `docs/PROGRESS.md`: none. For J392: nothing from this family beyond the notice
  replacement (the verdict's own statement).
- Cross-family: `amendments.verdict.json` correction index 24 (AV-8, kind research) targets this file — RR-1's "read
  through one gate by 31 modules (…) [OBSERVED];" → 32 modules. It is the amendments family's, not applied here; its
  `old` still occurs exactly once after this lane's edits (checked), no overlap with any realm fragment. Note for its
  applier: its `new` text opens a bracket inside a bracket ("[OBSERVED; [Fable-reviewed …];") and closes only one.
- Observed while reading the after-file whole, not applied (no accepted finding or verdict correction names them; for
  the Fable check / J392): the §3 finding summaries still carry the pre-amendment wording of rulings the verdict
  amended — RR-7 (line 160: "the map declares horizons only for user events and polity supersession", cf. J-RR.42),
  RR-46 ("the host's lit lanes" without C15's definition, cf. J-RR.49), RR-50 ("`MarchHold` bands moved only by the
  host's own engagement kinds (a field battle, an intervention clash, a lifted siege or occupation …)", cf. J-RR.56),
  RR-54 ("moved one rung by hostility and grade", cf. J-RR.54), RR-47 (the debatable band without J384 (3)'s host
  push, cf. J-RR.50); and §5's H16 row ("only by an owner-signed re-ruling of who keeps a gate"), which sits under §5's
  own SUPERSEDED-BY-V13-§8.5 bracket and §10 row 5 (which the verdict's §10 entry records as since refined, J-RR.53).

## Checks

- Every `new` once after; round-trip to the before-file identical for the 25 + notice; A1 old once before, new once after.
- `grep -c "PENDING FABLE REVIEW" research/sf/fp-realm-review.md` → 0.
- Bundle: `python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md",
  exit 0 (research notes are not bundle sources).
- Files changed by this lane: `research/sf/fp-realm-review.md` (26 fragments + 1 notice line) and this record.
