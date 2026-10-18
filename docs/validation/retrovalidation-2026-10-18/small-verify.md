# Retrovalidation 2026-10-18 — small-verify (Opus verifier; J390, Fable-checked)

Lane `retrovalidation/small-verify` (opus; J390, Fable-checked). Family "small": the passages that carry the J375 notice
in `plat/docs/build/choices.md` (C-0374, l. 381), `plat/packages/kernel/API.md` (the revision note, the notice at l. 17,
and the §1 reuse-table row at l. 55), `docs/volumes/V14-sites.md` (the *Coherence l* note, l. 64–69),
`docs/ARCHITECTURE.md` (the revision note, l. 5), `docs/PROGRESS.md` (l. 434), `docs/AMENDMENTS-2026-10-17l.md`
(file l, whole) and `docs/validation/coherence/vtt-l.md` (whole). Facts only; design soundness is the Fable validator's.

## Method

- Occurrences found with `grep -n "PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat"` on each
  file (one per file; choices.md l. 381, API.md l. 17, V14 l. 65, base l. 5, PROGRESS l. 434, file l l. 3, vtt-l l. 3).
- Read whole: file l (284 lines), vtt-l (59 lines), `research/vtt/profile-reverification-2026-10-17.md` (389 lines,
  §1–§7), `plat/docs/build/checks/M0-world-sites-gate.md` § K11, its closing table and its close (l. 1–40, 195–240,
  415–476), the base §11.1 *The `.dd2vtt` profile (DEF-4)* through *Plain scene PNG* (l. 17007–17072) and §11.2's
  `ExportOpts.vtt` with its out-of-range comment (l. 17171–17183), base §0.2 heading and file sentence (l. 151, 158),
  §3.3 rule 2 (l. 4582–4600), §3.6 *Held vertices* (l. 5244–5256), §2.2 rule 7's edge-role list; API.md l. 1–110.
- Code (kernel, in this repository under `plat/packages/kernel/src/`): `insert/splitThrough.ts` l. 105–145,
  `invariants/batch.ts` l. 495–510, `warp/held.ts` l. 150–210, `arr/bandUnion.ts` l. 500–510 and 750–765.
- File l's application: a script (scratchpad `retro/py/frag.py`) split each item 648–658 into its current-text quotes
  and its (a)/(b)/… new-text fragments, normalised whitespace, and counted each in the target file as it now stands.
  Result: all 19 new-text fragments present exactly once (9 in the base, 10 in V14); every replaced current text absent
  (648's heading, kept by design, present once).
- The host repository (settlement-engine @ 81f1cd96) is not cited by any in-scope passage; nothing was read there.

## Count

About 270 checkable claims checked: file l ≈ 120 (header and source counts 9, choices (a)–(e) 8, *Not items* 7, the
eleven items' new-text facts and *Evidence* citations ≈ 85, census 11); vtt-l ≈ 60 (header 6, snapshots 4 — not
checkable, below — 11 rows × 4, census 4, §2 4, §3 6); the fragment presence/absence check 38 (19 new, 19 old);
C-0374 ≈ 22 (every file:line, the gate quotes, the test-folder rows); API.md row and note ≈ 14; V14 note 6; base note 8;
PROGRESS 1. **8 findings** (0 WRONG, 1 UNSUPPORTED, 7 IMPRECISE). PROGRESS.md l. 434 is J375's own quotation of the
notice text (owner's words and the session's ruling that defines the notice): NOT-A-RULING, nothing to replace.

## Findings

| id | where | claim | verdict | evidence | fix |
|---|---|---|---|---|---|
| SV-1 | `plat/packages/kernel/API.md` l. 55 (§1 row, effect column) | "a vertex carrying `deck_end`, `gate_end` or `raised_foot` is held by `warp` (the design's held set, §3.6 (2)–(4))" | IMPRECISE | `warp/held.ts:207` holds a crossing end only `if (fromLevel !== 0 && …)`; base §3.6 (l. 5247–5252): (2) "unless `fromLevel = 0`, a bridge's `deck_end` and a water gate's `gate_end`", (3) "a raised way's part-0 feet", (4) "in a smoothing step, every kernel-pinned vertex" (a flag, `held.ts:209`, not a role) | "a vertex carrying `deck_end` or `gate_end` is held by `warp` unless the batch's level is 0, and one carrying `raised_foot` always (the design's held set, §3.6 (2)–(3))" |
| SV-2 | `plat/docs/build/choices.md` l. 381 (C-0374, *Scope* column) | "§3.6 (the held set (2)–(4): crossing ends and raised feet are held)" | IMPRECISE | as SV-1: the role clauses are (2) and (3); (4) is the smoothing step's pinned vertices; crossing ends are held only when `fromLevel ≠ 0` | "§3.6 (the held set (2)–(3): crossing ends, unless `fromLevel = 0`, and raised feet are held)" |
| SV-3 | file l l. 11–12 (header) | the re-verification is the one item 136 (c), V14 §5.3, V14 §8's SE2 and T-V14-11 call for ("the profile's version pinned by item 136 (c)'s re-verification before M-ENC's SE2") | IMPRECISE | the quoted words occur only in file k item 628 (`docs/AMENDMENTS-2026-10-16k.md` l. 561–562); V14 §8 SE2 (V14 l. 2886) says "the research seat's re-verification of the Universal VTT and Foundry schemas with the profile's version pin (item 136 (c))"; the base's pre-l *Scope* text (file l item 649's quote) read "is pinned" | append the source: "(file k item 628's words)" |
| SV-4 | file l l. 27–29, choice (a) | keeping `<ordinal>` keeps "the one spelling of the name in the base (§11.1 *Scope*), V14 §2.4 (`EncounterCrop.scenes`), §3.12 (6), §5.3, T-V14-11 and BCR-V14-8" | IMPRECISE | V14 §2.4 (l. 795) and §3.12 (6) (l. 2062) never spell the file name; they call the ordinal "the file suffix"; the spelling `<base>.<ordinal>.dd2vtt` is in base §11.1 *Scope*, V14 §5.3 (l. 2537), T-V14-11 (l. 2836) and BCR-V14-8 (l. 3025) | "so the one spelling of the name in the base (§11.1 *Scope*), V14 §5.3, T-V14-11 and BCR-V14-8 stays one, and the ordinal V14 §2.4 (`EncounterCrop.scenes`) and §3.12 (6) call the file suffix keeps its name" |
| SV-5 | file l l. 157–158, item 654 *Current text* | the whole bullet quoted "(across four lines)" under the rule that "a quote that wraps across a line in the file is quoted with the wrap marked ⏎" | IMPRECISE | file l's quote carries no ⏎; vtt-l row 654 quotes the same text with three ⏎ (after "doors flagged;", "run none),", "written before the walls — and journal") | re-quote item 654's current text with the three ⏎ marks and the continuation indentation, as vtt-l row 654 does |
| SV-6 | file l item 654 new text (l. 180); base §11.1 *Foundry scene JSON* `walls[]` (l. 17068) | a window's `threshold { attenuation: true, sight: 10, light: 10 }` "(proximity; the threshold in the scene's distance units)" | UNSUPPORTED | the cited evidence gives the value and no unit: research note §3 Wall table (l. 174: "proximity thresholds (window walls)") and §4.2 (l. 274: the importer writes `light: 10, sight: 10`); BCR-VTT-3 (l. 342) names no unit; the Foundry API page could not be fetched from this lane (proxy 403) | add the unit to file l's "not taken verbatim" list as choice (f), "the threshold's unit read as the scene's distance units (the note gives the value 10 and no unit)", or drop the clause "the threshold in the scene's distance units" from item 654 and the base |
| SV-7 | file l items 650 (b) (l. 102–103) and 656 (a) (l. 222–223) new texts; base §11.1 *Fields* (l. 17026); V14 §5.3 *The VTT crop scope* (l. 2531) | `line_of_sight` is "the list every importer reads" | IMPRECISE | the note supports it for Foundry's importer only (§4.2, l. 269–271); §5 row 6 (l. 309): "O and M say 'walls'/'VBL' without naming the list"; Roll20 SNIPPET-ONLY, FGU "no field-level documentation found" (l. 284–285). The words are BCR-VTT-5's own (l. 344), transcribed faithfully | "(the wall list, the one Foundry's importer of Universal VTT files reads on its default multi-level path, which never reads `objects_line_of_sight`)" in both places, or keep the words and record them in file l's "not taken verbatim" list as the note's own inference |
| SV-8 | `docs/validation/coherence/vtt-l.md` l. 11–19 (snapshots, bundle) | base and V14 md5 and line counts before and after; bundle 79 542 lines from 16 sources | IMPRECISE (not re-checkable) | both files and the bundle have changed since (base now 24 462 lines, V14 3 208, the bundle 81 061); the before/after states exist only in git, which this lane may not run | add "(snapshots as of the lane's run, 2026-10-17; superseded by later lanes)" after the bundle line; no other change |

## Claims that hold (the notable ones)

- Every file:line in C-0374 and the API.md row: `splitThrough.ts:116` (`roleIdOf('anchor')` in `allocateAnchor`), `:139`
  (the anchor-only allocation), `batch.ts:503` (prepared-contacts), `held.ts:204–205` (`crossing`, `feet`),
  `bandUnion.ts:507, 757, 760` (`edgeRole: 'kerb' | 'band'`, the signature, the `check` that throws on any other value).
- The gate quotes (K11's title, "FAIL (documentation), fixed-in-M0", the `TxEnv` alternative with `heldRoles`,
  `contactRole`); the test folder covering K1, K2, K5, K6, K8, K13 and no K11 test.
- §3.3 rule 2 (contact names, the kernel-allocated `anchor` ordinal from 2 on an enceinte) and §2.2 rule 7's `band`.
- File l: the delta table's 29 rows split 7 changed / 2 unverifiable / 20 unchanged (changed 1, 6, 14, 15, 17, 19, 24;
  unverifiable 3, 22); *Not items* covers every row not carried by an item; file k ended at 647; item 63 is the
  clandestine rule with its concealed doors; `vtt.retainingMinCm` is a cell, not an `ExportOpts.vtt` member, so "no new
  API member" holds; every *Evidence* section, row, quote and URL matches the note; every census count (items, requests
  per item, fragments 19 = 9 + 10, 6 across a wrap) recomputes.
- vtt-l: all 11 rows' quotes and statuses; §2 (the base note under the validation note, §0.2's heading and file sentence
  with `file l item n`, V14's note directly after *Reconciliation r0*); §3 (the unchanged VTT row, `ExportOpts.vtt`'s
  comment naming `flags.plat`, V14 l. 795 and 2062, the "while its flights at or above level 0 stand" clause after 653).
- V14's and the base's revision notes describe what the items did.

## Could not check

- vtt-l's before/after md5s and line counts and the bundle count (SV-8): git is barred to this lane and the files moved.
- API.md's "No signature, source file or line reference elsewhere in this document changed": needs the pre-edit file (git).
- Any claim resting on a live web page (the URLs in file l's *Evidence* lines): the proxy refuses foundryvtt.com from
  this lane (HTTP 403); those claims were checked against the research note that records the fetches, not the pages.

Status: LANDED 2026-10-18.
