# retrovalidation/apply-small — the small family's research and record corrections applied

Lane retrovalidation/apply-small (Opus 5.5, high; J390: Fable judges and validates, Opus verifies and applies).
Started 2026-10-18 05:26 UTC. Written as the lane goes.

## Sources read

- `docs/validation/retrovalidation-2026-10-18/small.verdict.json` read whole: verdict PASS-WITH-CORRECTIONS, 11
  corrections (10 `record`, 1 `design`, 0 `research`), 16 rulings, the notice replacement and the summary.
- `docs/validation/retrovalidation-2026-10-18/small.md` l. 85-120 (the correction table's tail and the verdict's notice
  paragraph: the notice is replaced in all six files that carry it, three of them inline — choices.md l. 381, V14
  l. 65, the base l. 5).
- Every other `*.verdict.json` in the directory scanned for a correction whose file is one of this family's six: none
  (all 11 are in small.verdict.json).
- `docs/AMENDMENTS-2026-10-17l.md` read whole (284 lines) and `docs/validation/coherence/vtt-l.md` read whole (59
  lines) before applying; the other targets read at the passage: choices.md l. 381 (C-0374, the whole row), API.md
  l. 1-30 (header, revision note, notice), V14 l. 60-72 (the *Coherence l* note), the base l. 5 (the revision note).
- `docs/validation/retrovalidation-2026-10-18/apply-design.md` (the sibling design lane, running): it takes
  small idx 9 (V14 §2.4, kind `design`) and leaves idx 10 (the base's revision note, kind `record`) to this lane.

## Snapshots before (2026-10-18 05:27 UTC)

| file | lines | md5 |
|---|---|---|
| plat/docs/build/choices.md | 381 | 2a511390c2e4eb7dff75e459140091ae |
| plat/packages/kernel/API.md | 1059 | 43d7a1b800f8860283e40d5ce684ede1 |
| docs/volumes/V14-sites.md | 3208 | a1c6d7c2bf08595776b1f913765cf1cb |
| docs/ARCHITECTURE.md | 24462 | b03ba26e4eedfa446d517280cd83e67f |
| docs/AMENDMENTS-2026-10-17l.md | 284 | 6209eda54ace399a1c98d20fc968178b |
| docs/validation/coherence/vtt-l.md | 59 | 0d45ae01e2745e4ff282032c09d63edd |

## Application

Method: one script (`apply.py` in the lane's scratchpad) per file: read, for each of the file's corrections assert
the `old` occurs exactly once and the `new` not at all, replace, assert the `new` occurs once after (and the `old` 0
times, or once where the `old` is a substring of its own `new`); then the notice; then one write. Every correction
matched at its first try: **no adjustment was needed**. V14 and the base each written in one read-modify-write with
the before-md5 equal to the snapshot (no sibling write in between).

| idx | kind | file | line | result |
|---|---|---|---|---|
| 0 | record (SV-1) | plat/packages/kernel/API.md | 55 (§1 reuse-table row) | APPLIED: old once, new once after, old 0 |
| 1 | record (SV-2) | plat/docs/build/choices.md | 381 (C-0374 Scope) | APPLIED: old once, new once after, old 0 |
| 2 | record (SV-2 widened) | plat/docs/build/choices.md | 381 (C-0374 Rationale) | APPLIED: old once, new once after, old 0 |
| 3 | record (SV-3) | docs/AMENDMENTS-2026-10-17l.md | 11-12 (header) | APPLIED: old once (across the wrap), new once after, old 0 |
| 4 | record (SV-4) | docs/AMENDMENTS-2026-10-17l.md | 28-29 (choice (a)) | APPLIED: old once (across the wrap), new once after, old 0 |
| 5 | record (SV-5) | docs/AMENDMENTS-2026-10-17l.md | 158 (item 654's current text, re-quoted with ⏎) | APPLIED: old once, new once after, old 0 |
| 6 | record (SV-6) | docs/AMENDMENTS-2026-10-17l.md | 37-38 → 37-40 (choice (f) added, its dated bracket in the new text) | APPLIED: old once, new once after, old 0 |
| 7 | record (SV-7 amended) | docs/AMENDMENTS-2026-10-17l.md | 40 → 42 (paragraph inserted before *Not items*) | APPLIED: old once, new once after, old 1 (it ends the new) |
| 8 | record (SV-8) | docs/validation/coherence/vtt-l.md | 19 (the Bundle line, dated qualifier) | APPLIED: old once, new once after, old 1 (it begins the new) |
| 9 | design (F-2) | docs/volumes/V14-sites.md | 795 (§2.4 `EncounterCrop.scenes`) | NOT APPLIED here: kind `design`, the design lane's (apply-design row 8); its old still occurs once at 05:28 |
| 10 | record (F-1) | docs/ARCHITECTURE.md | 5 (the base's revision note; item 652 named) | APPLIED: old once, new once after, old 0 |

No correction is of kind `research`. No correction targets `docs/PROGRESS.md`.

### The notices

The verdict's `notice_replacement`, verbatim: `> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — applied as
recorded; the held-set clause and six wording and evidence points corrected (lane retrovalidation/small; J392)`.

The notice (`PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat coherence/vtt-l-and-k11; to be
retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`) occurred exactly once in each of the six
files. Three are whole lines beginning `> PENDING FABLE REVIEW — …`, each replaced by the `notice_replacement` line:

- plat/packages/kernel/API.md l. 17
- docs/AMENDMENTS-2026-10-17l.md l. 3
- docs/validation/coherence/vtt-l.md l. 3

Three are inline (the line does not begin with the notice, so the task's "every line beginning" does not reach them
literally); the validator's record names all six for replacement (small.md l. 95: "choices.md l. 381 inline, API.md
l. 17, V14 l. 65 inline, the base l. 5 inline, file l l. 3, vtt-l l. 3") and correction 10's reason says "applied in
place with the notice replacement on the same line", so the notice sentence was replaced in place by the
replacement's text without its `> ` marker (the line's own `> ` and the rest of the line untouched):

- plat/docs/build/choices.md l. 381 (C-0374's Ruling cell)
- docs/volumes/V14-sites.md l. 65 (the *Coherence l* note; the following ". What changed:" kept)
- docs/ARCHITECTURE.md l. 5 (the revision note, the same line as correction 10)

After: 0 occurrences of `PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat` in the six files;
the replacement text once in each. The PENDING notices at V14 l. 3 and l. 3177 are the architect and integration
seats' J339/J84 notices, not this family's J375 notice, and are untouched.

### After

| file | fragments | lines | md5 after |
|---|---|---|---|
| plat/docs/build/choices.md | 3 (2 record + notice) | 381 | 27d72b0cf9ea73c47a822bd89b11c36c |
| plat/packages/kernel/API.md | 2 (1 record + notice) | 1059 | 468a2d1e353b46a955bed2c283ec28e7 |
| docs/volumes/V14-sites.md | 1 (notice) | 3208 | 8f2265eafc8c387dc1e88b804e512745 |
| docs/ARCHITECTURE.md | 2 (1 record + notice) | 24462 | 1f871a01961de8a4994125d7bb1993be |
| docs/AMENDMENTS-2026-10-17l.md | 6 (5 record + notice) | 288 | 12576a2748facd8c68992509da94a2e1 |
| docs/validation/coherence/vtt-l.md | 2 (1 record + notice) | 59 | 05ac43b6980b587bd25414c7aeb8d0b6 |

Total 16 fragments (10 record corrections + 6 notices). Each file diffed against its before-snapshot: only the
listed lines differ (choices 1 line, API 2, V14 1, base 1, file l 5 changed/inserted hunks, vtt-l 2).

### Bundle

`python3 tools/bundle_architecture.py --check` after the edits: **STALE, exit 1**. Proven caused by this lane's two
bundle-source edits alone: the same check run on a scratch copy of the sources with the base and V14 restored to their
before-snapshots reports UP TO DATE, exit 0. `docs/ARCHITECTURE-FULL.md` is not this lane's file and was not
regenerated; the old notice text still stands in it at its l. 315 (base) and l. 77918 (V14) until the next
regeneration (the design lane edits V13 and V14 as well, so the bundle is regenerated after it lands — for J392).

### For J392 (not applied here)

- PROGRESS.md: no correction targets it. R-15 (PROGRESS l. 434, J375's own row) is NOT-A-RULING: nothing to replace.
- small idx 9 (V14 §2.4, kind `design`): the design lane's (amendments file s).
- The held-set misreading's source, the gate's K11 text (`plat/docs/build/checks/M0-world-sites-gate.md` l. 208-209, 216 — re-read
  05:29: l. 209 still reads "§3.6's held set (2)–(4) — crossing ends and raised feet are" held; Fable-spawned, outside
  this family), is named in the verdict (R-1) for the gate's next edit; not this lane's file.
- The bundle's regeneration (above).

Status: COMPLETE 2026-10-18 05:29 UTC — md5s re-checked at landing, all six as in *After* (no sibling write since); see the LANDED line in docs/lane-events.log.
