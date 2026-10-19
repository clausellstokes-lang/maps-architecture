#!/usr/bin/env python3
"""hidden-ways/file-x: assemble draft-x.md = header + draft-x.items.md (byte for byte) + tail; then remove the items file.
Usage: assemble_x.py ROOT"""
import os, sys
ROOT = sys.argv[1]
V = f'{ROOT}/docs/validation/hidden-ways-2026-10-18'
items = open(f'{V}/draft-x.items.md', encoding='utf-8', newline='').read()
TITLE = ("# Amendments x — file w's figures carried into the totals, BCR-V13-37, the host document's milestone table and "
         "the owner's answer to Q5")
head = TITLE + """

> Written on Opus 5.5 by the follow-up seat of the hidden-ways workflow, lane hidden-ways/file-x, on the owner's decision J421 ("i follow your recommendations", 2026-10-19 07:12Z), from the consistency confirm of file w as applied (`confirm-consistency.md`, F1–F6)

Numbered from **976** (file w ended at 975); items 976–982.

**DRAFT FOR APPLICATION ON J421** (2026-10-19) — 20 fragments of items 976–982 for four of file w's five targets
(`docs/volumes/V13-world.md` 5, `docs/HOST-REQUIREMENTS-2026-10-18.md` 3, `docs/volumes/INDEX.md` 4,
`docs/volumes/SUMMARY.md` 8; `docs/volumes/V14-sites.md` none), each at the target's md5 as file w's apply left it.
The machine copy is `draft-x.fragments.json` (records {id, file, line, md5, old, new}, applied in order).

**Sources.** The consistency confirm of file w as applied (`docs/validation/hidden-ways-2026-10-18/confirm-consistency.md`, 2026-10-19: 292 checks, 6 failures — F1 SUMMARY:136, F2 INDEX:258, F3 SUMMARY:218, F4 V13:4565–4569, F5 HRQ:143 and :146, F6 Q5's status at HRQ:717, INDEX:225, SUMMARY:16, :173 and :223–228); file w (`docs/AMENDMENTS-2026-10-18w.md`): item 964 (a), (b) (M-W2 8 → 10 pw — the trods ≈ 1, the junction ends and the fork rule ≈ 1 — and the staged row 37–45 → 39–47), item 966 (c) (V13 §11 Q5 and its answer), items 969 (c), (g), (j) (the index's and the summary's figures and Q5 row), its status line (applied 2026-10-19 on J421) and its *For the session* (four sentences still calling Q5 open; a follow-up file x the managing session's call); item 962 (the budgets) carries no figure this file restates; J421 (`docs/PROGRESS.md:479`, the owner, 2026-10-19 07:12Z, verbatim: "i follow your recommendations"); file v (`docs/AMENDMENTS-2026-10-18v.md`, item 954) the form and the precedent, with file r item 926: an owner's answer supersedes every live sentence that says the question waits.

**How to read the items.** One item per residue: 976 F1, 977 F2, 978 F3, 979 F4, 980 F5, 981 F6; 982 the record (V13's revision note, the index's state line), added for coherence as file v's (a) and (d) were. Each lettered sub-item is one fragment, one changed line (982 (a) inserts a block after its line): its target, its line and the target's md5 as it stands now (file w's after-md5s), the current text quoted once verbatim (a substring of that line), the new text in full as a blockquote whose lines are the new lines (the `> ` prefix removed; a bare `>` an empty line), and the evidence with the arithmetic of every figure written. Line numbers cited in Evidence are the targets as they stand now; the two V13 lines the host document cites (980) are V13 as this file leaves it, item 982 (a) adding 6 lines before them. A reference written "file x" inside a new text is to this file.

---

## The items

"""
tail = """
---

## Not items

Read and left, so nothing is re-found (lines as they stand before this file): V13 §8.2 (V13:3995, :4000–4001) and
§11 Q5 with its answer (V13:4665–4683) — file w's, already 10 pw, 39–47 and answered; V13:4670's "37–45 → 39–47" —
the price as put, history; V13 BCR-V13-19 and BCR-V13-20 (V13:4422–4432) — the requests as recorded at 28–36 and
M-W0 – M-W4, BCR-V13-37 stating in its own words what they now read (file o item 877's reading,
`docs/AMENDMENTS-2026-10-17o.md:130-131`); V13:4820's "(M-W0h ≈ 4 pw inside 28–36)" — an integration note of
2026-10-17, history; INDEX:39 and SUMMARY:130 — file w's, already 39–47; INDEX:48 ("BCR-V13-37 is carried by file o
item 877") — true as history; the summary's "the earlier 392–539" (SUMMARY:136) — the figure the line names and this
file sums from; the two lines above it give 222–301 and 171–239 (SUMMARY:125, :127), whose unrounded ends 221.5–300.5
(185.5 + 36, 248.5 + 52) plus 171–239 are 392.5–539.5, so "392–539" is the line's own rounding, not file w's, and left;
the host document's other milestone rows' V13 line cites (HRQ:139–145: "line 3662–3664", "3674", "3675", "3676",
"3678", "3679", "3680") — stale since before file w (the milestones moved with every file since), not a figure; the
host document's *Scope* paragraph ("amendment files j through q", HRQ:12) — its design-state line, left to the host
document's owner; the reply (`docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md` §9.1) — already records J421;
`docs/ARCHITECTURE-FULL.md` — derived, regenerated, never edited.

**For the session** (not items): (1) the base — BCR-V13-37 now asks for 39–47, and `docs/ARCHITECTURE.md` §16 still
reads 37–45 (`:21720`, `:21765`, and `:21675`'s "37–45 pw as one staged row"), with the staged total 250.6–345.35
(`:21767`: 187.85–264.1 + 37–45 + 25.75–36.25) and the second total 481.35–660.6 (`:21768`); carried, they would read
252.6–347.35 (187.85 + 39 + 25.75 = 252.6; 264.1 + 47 + 36.25 = 347.35) and 483.35–662.6 (230.75 + 252.6 = 483.35;
315.25 + 347.35 = 662.6), the base's §1.1 row (`:311`) to be read with them — an application of BCR-V13-37 to the base,
as file o item 877 was, outside this file's five targets; (2) the ledger — J421's carrying into the totals and
statuses and this file's application want their row; this lane does not edit `docs/PROGRESS.md`.
"""
body = head + items + tail
open(f'{V}/draft-x.md', 'w', encoding='utf-8', newline='').write(body)
assert items in body
os.remove(f'{V}/draft-x.items.md')
print('draft-x.md', body.count('\n'), 'lines')
