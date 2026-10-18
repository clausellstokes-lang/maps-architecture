# Retrovalidation 2026-10-18 — how to read this folder

Lane `retrovalidation/apply-notices` (Opus 5.5/high, the last apply lane; opus; J390, Fable-checked). Written 2026-10-18 05:32Z–05:40Z.
Status: LANDED. Every number below was taken from the files on disk at the time of writing: the 13 `*.verdict.json`,
the `apply-*.md` records, the `LANDED` lines in `docs/lane-events.log`, and a script that checks every correction's old and
new text against its target file (`retro/check.py` in the session scratchpad; output `retro/state.txt`).

## What this is

On 2026-10-17 the owner ruled (J375) that work done on Opus 5.5 standing in for a Fable seat carries the notice
"> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat <lane>; to be retrovalidated overall at the
next opportunity (owner, 2026-10-17, J375)", and that this work is retrovalidated as a whole at the next opportunity. On
2026-10-18 the owner said "now". This folder holds that retrovalidation. It ran under J390: Opus verifies and applies,
Fable judges and validates. Each family went through four steps: an Opus verifier (`<family>-verify.md` +
`<family>.findings.json`), a Fable validator (`<family>.md` + `<family>.verdict.json`: the verdict, the exact old→new
corrections, the re-judged rulings and the notice replacement), an Opus apply lane (`apply-<family>.md`), and a Fable
confirm lane (`confirm-<family>.md`). A Fable completeness critic (`critic.md`) closes the run.

## Lane table

"Applied" counts the corrections in the family's `verdict.json` whose new text is now in its target, whichever lane applied
it. Cross-family corrections are counted under the family whose verdict holds them. Design corrections went to
`docs/AMENDMENTS-2026-10-18s.md` (items 927–938, lane apply-design).

| family | files | verdict | corrections applied | notice replaced |
|---|---|---|---|---|
| rulings | `docs/PROGRESS.md` J377–J389, the session's rulings and readings (journal rows: read and judged, never edited) | PASS-WITH-CORRECTIONS | 1 / 1 (C1 design, V13 §2.2 `waterLanes`, in file s via apply-design) | none: journal rows carry no notice (notice_replacement "none (journal rows)") |
| alignment | `research/sf/alignment-system.md` | PASS-WITH-CORRECTIONS | 32 / 32 research (apply-alignment) | 1 line (apply-alignment) |
| fp | `research/sf/fp-simulator.md`, `research/sf/fp-physical-integration.md` | PASS-WITH-CORRECTIONS | 55 / 55 research (apply-fp) | 2 lines, one with variant wording (apply-fp) |
| faith | `research/sf/faith-system.md` | PASS-WITH-CORRECTIONS | 66 / 67: 64 research (apply-faith), 1 research on `lens-implications.md` (apply-lenses), 1 design V13 §5.9 (6) (apply-design). **Not applied: 1 record on `rulings.md` J379.1** | 1 line (apply-faith) |
| trade | `research/sf/trade-system.md` | PASS-WITH-CORRECTIONS | 37 / 38 research (apply-trade). **Not applied: C38 on `research/sf/fp-physical-integration.md` row A1** | 1 line (apply-trade) |
| population | `research/sf/population-system.md` | PASS-WITH-CORRECTIONS | 45 / 45: 43 research (apply-population; C-4a applied after removing a `<\tick>` JSON escape artifact), C-24 on `lens-implications.md` (apply-lenses), D-1 design V13 §5.9 (5) (apply-design) | 1 line (apply-population) |
| prosperity | `research/sf/prosperity-system.md` | PASS-WITH-CORRECTIONS | 35 / 46: 34 research (apply-prosperity), D-1 design V13 §5.9 (7) (apply-design). **Not applied: 11 cross-family (C35 `trade-system.md`; C36–C41 `plague-system.md`; C43–C46 record `docs/HOST-REQUIREMENTS-2026-10-18.md`)** | 1 line (apply-prosperity) |
| plague | `research/sf/plague-system.md` | PASS-WITH-CORRECTIONS | 18 / 18 (17 research + the notice line, which the verdict lists as a correction; apply-plague) | 1 line (apply-plague) |
| lenses | `research/sf/lens-implications.md` | PASS-WITH-CORRECTIONS | 39 / 40: 38 research (apply-lenses), C39 design V13 §5.8 (7) (apply-design). **Not applied: C40 record on `rulings.md` J384(7)** | 1 line (apply-lenses) |
| realm | `research/sf/fp-realm-review.md` | PASS-WITH-CORRECTIONS | 25 / 25 research (apply-realm), plus A1: the second site of RV-4 (§6 preamble), which the verifier's fix names | 1 line (apply-realm) |
| scripts | `workflows/36-…43-*.js` (ten scripts) | PASS-WITH-CORRECTIONS | 12 / 14 record (apply-scripts; C8 applied with the brief's line as run, 48 not 61). **Not applied: C13, C14 on `docs/HANDOFF.md` script cells** | none: the family has no notice line. Its `NOTICE` constants record what the seats were fed and stay as they are (scripts.md) |
| small | `plat/docs/build/choices.md` C-0374, `plat/packages/kernel/API.md`, the V14 and base revision notes, `docs/AMENDMENTS-2026-10-17l.md`, `docs/validation/coherence/vtt-l.md` | PASS-WITH-CORRECTIONS | 11 / 11: 10 record (apply-small), 1 design V14 §2.4 (apply-design) | 6 notices (3 whole lines, 3 inline; apply-small) |
| amendments | `docs/AMENDMENTS-2026-10-17m.md`, `-n.md`, `-o.md`, `-p.md`, `-q.md`, `docs/validation/coherence/realm-m.md`, `lens-n.md`, `lens-o.md`, `lens-p.md`, `lens-q.md` and their five `*-critic.md` | PASS-WITH-CORRECTIONS | 2 / 25: the 2 design fragments (AV-1 RouteCostLaw, D-2 §3.11.6; apply-design). **Not applied: 22 record (m 11, n 3, o 1, p 1, q 5, `realm.md` 1) + 1 research (`fp-realm-review.md` AV-8)**. The continuation script gave this family no apply lane | 15 lines, all line 3 (**this lane**) |

Totals: 13 verdicts, all PASS-WITH-CORRECTIONS; 417 corrections (8 design, all applied in file s). 378 applied (376
matched exactly; 2 applied with a recorded adjustment: scripts C8, population C-4a). 39 not applied (listed under
"What was left"). 31 J375 notices replaced: 16 by the family apply lanes, 15 by this lane.

### This lane's replacements

In each of the 15 amendments-family files, the one line beginning "> PENDING FABLE REVIEW — written by Opus 5.5 standing
in for the Fable seat" (always line 3) was replaced by `amendments.verdict.json`'s notice_replacement:

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 2 design fragments on V13, 22 dated record brackets and fixes across files m–q and the realm record, 1 research count (lane retrovalidation/amendments; J392)

Before each write the script asserted: exactly one such line in the file; exactly one "PENDING FABLE REVIEW" anywhere in it;
the replacement text not already present. After each write it asserted: the replacement present once, no "PENDING FABLE
REVIEW" left, and reversing the swap gives the original byte for byte. Line counts did not change. Before-copies are kept
in `retro/apply-notices/` in the session scratchpad.

| file | seat in the old notice | lines | md5 before → after |
|---|---|---|---|
| docs/AMENDMENTS-2026-10-17m.md | amendments/realm-m | 2441 | 811c9b6a → 8ec92f1f |
| docs/AMENDMENTS-2026-10-17n.md | amendments/lens-n | 2007 | 6f6097d5 → 9d2b92ab |
| docs/AMENDMENTS-2026-10-17o.md | amendments/lens-o | 1231 | 28cd49db → f1c067d1 |
| docs/AMENDMENTS-2026-10-17p.md | amendments/lens-p | 677 | 87d9705c → 0d90f551 |
| docs/AMENDMENTS-2026-10-17q.md | amendments/lens-q | 920 | 510edf79 → a83e1dd5 |
| docs/validation/coherence/realm-m.md | amendments/realm-m-apply | 181 | e414ce71 → 40c22b18 |
| docs/validation/coherence/lens-n.md | amendments/lens-n-apply | 142 | 64833afa → b0b964fc |
| docs/validation/coherence/lens-o.md | amendments/lens-o-apply | 136 | 25e98d3b → 86a82bca |
| docs/validation/coherence/lens-p.md | amendments/lens-p-apply | 124 | 01e25971 → a3ea62b0 |
| docs/validation/coherence/lens-q.md | amendments/lens-q-apply | 146 | a2dbd07c → c0a31d3a |
| docs/validation/coherence/realm-m-critic.md | check/realm-m-critic | 153 | 4b2084fa → 44780517 |
| docs/validation/coherence/lens-n-critic.md | check/lens-n-critic | 137 | 4cc6ab8a → dc70193d |
| docs/validation/coherence/lens-o-critic.md | check/lens-o-critic | 65 | 4c620b95 → 18b79195 |
| docs/validation/coherence/lens-p-critic.md | check/lens-p-critic | 95 | 984e1d57 → d34a28a6 |
| docs/validation/coherence/lens-q-critic.md | check/lens-q-critic | 67 | 7dcc1eaf → a2d3df0d |

The line counts of files m–q match the counts `amendments.md` records for the files it read (2 441, 2 007, 1 231, 677,
920).

Bundle: `python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md` (81,080 lines from 16 sources) and `--check`
reported UP TO DATE, exit 0. None of these 15 files is a bundle source. The bundle was already up to date before this lane
(apply-design regenerated it at 05:32), and the derived bundle holds no J375 notice.

## Rulings re-judged on Fable

The 13 verdicts table 371 rulings and readings: **283 UPHELD, 70 AMENDED, 4 OVERTURNED, 14 NOT-A-RULING**. The owner's own
words are never re-judged; only the session's readings, rulings and claims are.

| verdict file | UPHELD | AMENDED | OVERTURNED | NOT-A-RULING | total |
|---|---|---|---|---|---|
| rulings (`rulings.md`: J377–J389) | 37 | 5 | 0 | 0 | 42 |
| realm (`realm.md`: J-RR.1–57 + the §10 record) | 50 | 8 | 0 | 3 | 61 |
| amendments (`amendments.md`: "ruled" sentences in files m–q) | 14 | 5 | 0 | 3 | 22 |
| lenses | 29 | 6 | 0 | 1 | 36 |
| prosperity | 41 | 10 | 0 | 1 | 52 |
| alignment | 17 | 6 | 1 | 0 | 24 |
| faith | 17 | 5 | 0 | 0 | 22 |
| fp | 14 | 5 | 1 | 1 | 21 |
| population | 11 | 3 | 1 | 1 | 16 |
| plague | 20 | 2 | 0 | 1 | 23 |
| trade | 10 | 7 | 0 | 2 | 19 |
| scripts | 14 | 2 | 1 | 0 | 17 |
| small | 9 | 6 | 0 | 1 | 16 |

The session rulings are in three records:
- `rulings.md`: J377–J389. Five AMENDED: J378.4, J379.1, J382(b), J384(11), J388.g2.
- `realm.md`: J-RR.1–57, re-judged on Fable consistently with rulings.md. 49 of the 57 UPHELD, 8 AMENDED, none overturned.
- `amendments.md`: the "ruled" sentences inside files m–q.

The four OVERTURNED entries:
- alignment R-22: §12.2 M11's "receptivity read only by spread-gated conversion".
- fp R-FP-7: fp-physical §1's drafted 62-row implication paragraph. The recount gives 80 rows: 30 / 17 / 7 / 26.
- population R-12: the player view.
- scripts S4: a verifier finding, rejected and shown INVALID.

Each overturned entry ends in a correction that has been applied. An AMENDED or OVERTURNED ruling that is a journal row is
named for J392 and never edited (journal rows are append-only).

## What was left

**Notices.** No J375 notice remains in docs/, research/, plat/ or workflows/ outside these places:
- `docs/PROGRESS.md`: 1, J375's own quotation, never edited.
- `docs/ARCHITECTURE-FULL.md`: 0 (derived).
- The ten `NOTICE`/`notice` constants in `workflows/36-…43-*.js`. They are the record of what each seat was fed, and the
  scripts verdict keeps them as record. This lane left them unchanged.
- The retrovalidation and sites-roads records, which quote the notice when they describe what they read or replaced
  (lenses.md, small.md, small-verify.md, plague.verdict.json, the apply-*.md records, sites-roads read-research.md and
  read-base.md). These are quotations, not status lines.

No notice was kept for lack of a verdict: every family has a verdict, and every remaining status-line notice belonged to
the amendments family. The older notices of other rulings (J84, J339, J157, the main-session note in
ARCHITECTURE-VALIDATION.md) are out of J375's scope and were not touched.

**Corrections not applied (39).** Each one's old text still occurs exactly once in its target and its new text does not
occur, checked at 05:35Z. The continuation script (`retrovalidation-j375-continue`) gave each apply lane only its own
family's files, gave the amendments family no apply lane, and gave this lane only the notices. So no lane owned these:

| verdict | # (1-based in its corrections array) | kind | target | what |
|---|---|---|---|---|
| amendments | 3–13 | record | `docs/AMENDMENTS-2026-10-17m.md` | AV-2, AV-3, AV-5, AV-6, AV-7, AV-8, AV-10 citation fixes; dated brackets on items 695 (AV-1's source), 662 (b), 693, 721 |
| amendments | 14–16 | record | `docs/AMENDMENTS-2026-10-17n.md` | dated brackets on items 810, 811, 793 |
| amendments | 17 | record | `docs/AMENDMENTS-2026-10-17o.md` | dated bracket on item 846 (b) |
| amendments | 18 | record | `docs/AMENDMENTS-2026-10-17p.md` | dated bracket on item 881 (d) |
| amendments | 19–23 | record | `docs/AMENDMENTS-2026-10-17q.md` | AV-4, AV-9 evidence and review-issue citations (items 909, 902, 915; review issues 1, 3) |
| amendments | 24 | record | `docs/validation/retrovalidation-2026-10-18/realm.md` | J-RR.1 row's count 31 → 32 (AV-8) |
| amendments | 25 | research | `research/sf/fp-realm-review.md` | PS-1 importer count 31 → 32 (AV-8). apply-realm reports that its new text has an unbalanced bracket |
| faith | 60 | record | `rulings.md` | J379.1 AMENDED text (faith V1) |
| lenses | 40 | record | `rulings.md` | J384(7) row: the chip is a DM surface (L1 / V-9) |
| prosperity | 35 | research | `research/sf/trade-system.md` | V-3: the :344 writer list |
| prosperity | 36–41 | research | `research/sf/plague-system.md` | F17: the apply-time rerun claim (§1, §3.12, the DM-plague walkthrough, §7 row, P9, M7) |
| prosperity | 43–46 | record | `docs/HOST-REQUIREMENTS-2026-10-18.md` | V-1 "exit 1.5", F13, F18, F5 inherited |
| scripts | 13–14 | record | `docs/HANDOFF.md` | script cells for wf_a7c82671-f52 (38b) and wf_868a6476-905 (39) |
| trade | 38 | research | `research/sf/fp-physical-integration.md` | row A1: V13 retires budgets and cost vectors (J-V13.63) |

The owner's rule allows no deferrals, so each of these must still end FIXED. They are for the confirm, critic and
close-gaps lanes of this run, or for the session's J392 pass.

The amendments notice now on files m–q and their records describes the verdict: "22 dated record brackets and fixes across
files m–q and the realm record, 1 research count". Those 23 fragments are among the 39 above and **are not yet in the
files**. The notice was replaced because this lane's task requires it; it becomes fully true once those fragments land.

**Closed 2026-10-18 09:35Z (lane retrovalidation/close-gaps; opus; J394, Fable-critiqued).** All 39 corrections above
have now landed, as group A of the Fable critic's 66 fragments (`critic.md` §4). Amendments #25 was applied with the
critic's repaired bracket. The critic's 27 further fragments (groups B and C) have landed too. Each new text is present
once and each old text is gone, the reverse round trip is byte-identical, and the bundle `--check` gives exit 0. B-19
took one recorded adjustment: two plague-note line pointers, 533 → 531 and 674 → 672, moved by A-prosperity-36 in the
same pass. The amendments notice on files m–q is now true: its 23 fragments are A-amendments-3…25. Still open: J392,
which is the session's row, and one new finding, N-1. N-1 is about 195 of the 349 "(line N)" pointers in
`docs/HOST-REQUIREMENTS-2026-10-18.md`, which point at lines the apply lanes moved. The table and paragraphs above are
kept as the record of 05:35Z. See `critic-round2.md` for every fragment's before and after.

**Observations for the Fable check / J392**, recorded by the apply lanes and not acted on here:
- The plague notice says "sixteen research corrections"; the verdict's array holds 17 plus the notice line.
- apply-realm's A1 (RV-4's second site) and the §3 summary sites of amended rulings (RR-7/46/47/50/54, §5 H16).
- apply-scripts' C8 line adjustment (61 → 48).
- The journal-row items each apply record lists "for J392": alignment R-24 (J383), fp R-FP-21 (J377(a)), faith R22/V6
  (J380), lenses J384(7) "public chips", scripts' owner sentence.
- HANDOFF's 01:05Z block gives the rulings lane's counts as "40 UPHELD, 8 AMENDED, 1 OVERTURNED". `rulings.md` and
  `rulings.verdict.json` say 42 rulings: 37 UPHELD, 5 AMENDED, 0 OVERTURNED. The record is right; the HANDOFF line is a
  session claim made while the run was in flight.

## How the first run died and how this continuation picked up

The first run, `retrovalidation-j375` (wf_f0931b52-ef5, started ~00:22Z), ran its verifiers in parallel; all 11 family
verifiers LANDED between 00:39Z and 01:00Z. Its validators followed, and nine LANDED between 00:35Z and 01:20Z: rulings,
scripts, trade, alignment, fp, population, faith, small, plague. At ~01:25Z the account's five-hour usage limit killed
the run: 20 seats landed, 92 errored. The prosperity, lenses and realm validators were at CHECKPOINT lines with no landed
record. Realm's first attempt died at 01:22Z with nothing written; lenses' partial record was later replaced. The landed
validators' `<family>.verdict.json` files were extracted from the run's journal into this folder (their mtime is 04:06Z).

The continuation, `retrovalidation-j375-continue` (wf_ed23dc6b-f13, started 04:12Z; script under the session's
`workflows/scripts/`), took the records on disk as the truth: a seat with a LANDED line in `docs/lane-events.log` is done,
and its result is read from its record. It did not replay the first run's cache. It ran only the missing stages:
- The three Fable validators: realm (LANDED 04:28Z), lenses and prosperity (04:31Z).
- The amendments family: verify (04:58Z), then validate (05:23Z) against the re-judged rulings.
- Twelve apply lanes, 05:24Z–05:32Z: one per family, plus apply-design, which wrote and applied file s.
- This notices lane.

After this lane come Confirm (one Fable check per apply lane, with one fix round), the Fable completeness critic and its
closing round.

## How to read the folder

For each family `<f>`, read in this order:
1. `<f>-verify.md`: the Opus verifier's claim-by-claim check against the host at 81f1cd96.
2. `<f>.findings.json`: the same findings in structured form.
3. `<f>.md`: the Fable validator's ruling on every finding, its own findings, the rulings table, the corrections table
   and the verdict.
4. `<f>.verdict.json`: exactly what the apply lanes consumed.
5. `apply-<f>.md`: what was changed, fragment by fragment, with adjustments and items routed elsewhere.
6. `confirm-<f>.md`: the Fable check of the application.

The families are alignment, amendments, faith, fp, lenses, plague, population, prosperity, realm, scripts, small and
trade. The scripts family has no `findings.json`; its findings are in `scripts-verify.md`.

The rest of the folder:
- `rulings.md` + `rulings.verdict.json`: J377–J389 re-judged. Read it before `realm.md` and `amendments.md`, which stay
  consistent with it.
- `apply-design.md`: file s (`docs/AMENDMENTS-2026-10-18s.md`, items 927–938), every design correction from every verdict.
- `README.md`: this file, the apply-notices lane's record and the index.
- `STATUS.md`: the autosave loop's latest line per lane. It is a snapshot, not a record.
- `critic.md` (and `critic-round2.md` if written): the closing completeness check.
