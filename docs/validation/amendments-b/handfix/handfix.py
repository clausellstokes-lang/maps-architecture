#!/usr/bin/env python3
"""handfix.py — the amendments-b hand fix (lane handfix-b/apply, 2026-09-27; opus mechanical seat, PENDING FABLE REVIEW).

Applies the 31 required changes of docs/validation/amendments-b/closing-report.md §2, in its apply order, as DATA: every
sub-change is one row (n, id, sub, file, kind, anchor, text[, scope]). Stdlib only; run from the project root.

  kinds
    replace       the exact old string `anchor` becomes `text`
    insert_after  `text` is placed directly after the exact string `anchor`
    insert_line   `text` (a whole line) is placed as a new line directly after the one line that starts with `anchor`
    append_entry  `text` is appended, after one space, to the end of the one Part A row whose id cell is `anchor`
                  (placed before the row's closing ' |')
    j_row         `text`, a row of the "# Judgment calls" index table, goes after that table's last row
    rat_a         `text`, a Part A entry, goes after the last row of Part A's table (before "## Part B")
    carried       no edit: the sub-change is carried by another row (named in `text`)
  scope           optional line prefix (e.g. '| J-A28.46 |'): the anchor is counted and applied inside the one line of
                  the file that starts with it — the report scopes these anchors to an index row or a Part A entry
  from_report     False when the anchor is not quoted by the report but located by this seat (the row the report names);
                  every other anchor and every text is checked to be a verbatim substring of closing-report.md

  SOFT LINE BREAKS: the document is hard-wrapped and the report quotes its strings on one line (the closing seat's
  probe was whitespace-normalised), so every single space of a quoted string also matches ONE soft line break with its
  indentation (never a blank line — never a paragraph break); every other character must match exactly. A replaced
  string's soft breaks are carried to the same words of the new text where the words up to (or after) the break are
  shared, else the two lines are joined (a soft break renders as a space; nothing else changes). Each is logged.

  ORDER OF WORK: (1) every anchor is counted on the ORIGINAL files (the assertion: exactly once, inside its scope when it
  has one) and every quoted string is checked against the report, before anything is written; (2) the rows are applied
  in apply order on the evolving text, each anchor re-counted there (exactly once, else the sub-change is SKIPPED and
  recorded — never guessed); (3) each applied text is counted in the result; (4) both files are written once.

usage: python3 handfix.py --check                      pre-check only (counts, report substrings), writes nothing
       python3 handfix.py --out-doc A --out-rationale B --log L    apply into new files (dry run)
       python3 handfix.py --write --log L              apply and write docs/ARCHITECTURE.md and the rationale once
"""
import argparse, hashlib, json, re, sys

DOC, RAT, REPORT = 'docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md', 'docs/validation/amendments-b/closing-report.md'

R = []  # the rows


def row(n, id_, part, sub, file, kind, anchor, text, scope=None, from_report=True):
    R.append(dict(n=n, id=id_, part=part, sub=sub, file=file, kind=kind, anchor=anchor, text=text, scope=scope,
                  from_report=from_report))


# ---------------------------------------------------------------- 1. VP3-04 — pipeline
row(1, 'VP3-04', 'pipeline', '(1) §10.2', 'doc', 'replace',
    r"""structures: { role: string; count: [number, number]; footprintShare: number; required: boolean }[]""",
    r"""structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in workplace's main slot is one */ }[]""")
row(1, 'VP3-04', 'pipeline', '(2) §4.7', 'doc', 'replace',
    r"""per residential slot of the plot's designation template row at least one household""",
    r"""per residential slot (a structure with `houses`, §10.2) of the plot's designation template row at least one household""")
row(1, 'VP3-04', 'pipeline', '(3) §4.7', 'doc', 'replace',
    r"""A residential slot the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, and a residential plot none of whose slots it can fill is typed vacant by S10b's reconcile (above)""",
    r"""A residential slot the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate""")
row(1, 'VP3-04', 'pipeline', '(4) §4.7', 'doc', 'replace',
    r"""which creates each building and its wings, writes `Building.households` from its slot's households in address order, clamped into [1, capacity]""",
    r"""which creates each building and its wings, writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) from its slot's households in address order, clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule)""")

# ---------------------------------------------------------------- 2. VP3-01 (= VD3-02) — pipeline, major
row(2, 'VP3-01', 'pipeline', '(1) §4.7 Households per building', 'doc', 'replace',
    r"""and a household no building of the district has room for is an unplaced item of F-SITING (§5.2), reported with the capacities that refused it.""",
    r"""and a household no building of the district has room for is an unplaced item of F-SITING (§5.2), reported with the capacities that refused it — except a household of a dossier's roster (the dossier's population, §7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request in the least-disruption order of a request after the city is built (above: vacant plots and vacancy runs first, then under-used plots, then a plot whose use can move, then a JOIN), its first closest option where no plot passes the hard rows (J-A20.42), and S11's operator builds there a residential slot of that plot's designation template (a structure with `houses`, §10.2) for it, within that building's capacity, in the same derivation or causing event — each such build and displacement reported, a hand edit's among its dry-run fates (§7.3 item 4).""")
row(2, 'VP3-01', 'pipeline', '(2) J-A28.46 index row', 'doc', 'replace',
    r"""an overflow is re-placed by S10b's solver inside the district after its last S11 batch (band, then drift; score, then address), else an F-SITING item;""",
    r"""an overflow is re-placed by S10b's solver inside the district after its last S11 batch (band, then drift; score, then address), else an F-SITING item — never a household of a dossier's roster, whose housing S10b's `dossier` request re-provides inside the district (the post-build least-disruption order, its closest option where none passes), S11's operator building a residential slot there;""",
    scope='| J-A28.46 |')
row(2, 'VP3-01', 'pipeline', '(3) J-A28.46 Part A', 'rat', 'replace',
    r"""F-SITING's last rung alone takes off the manifest a household no building of its district can hold, reported — VP2-07)""",
    r"""F-SITING's last rung alone takes off the manifest a household no building of its district can hold, reported — VP2-07 — and never a household of a dossier's roster, whose housing the `dossier` request re-provides inside the district, over dropping it or widening the search to the town, because the owner's item 20 (b) makes the population exist on every map and (e) asks that its housing be re-provided, while the district bound keeps the result independent of the order lazy districts are placed in and the request always places (J-A20.42); closing ruling on VP3-01, VD3-01 and VD3-02)""",
    scope='| J-A28.46 |')

# ---------------------------------------------------------------- 3. VD3-01 (= VP3-02) — determinism, major
row(3, 'VD3-01', 'determinism', '(1) §5.2 F-SITING ladder cell', 'doc', 'insert_after',
    r"""no re-cut after S11""",
    r""" — never a household of a dossier's roster (§7.7 item 2), whose housing §4.7 re-provides inside its district by the `dossier` request, which always places (J-A20.42)""")
row(3, 'VD3-01', 'determinism', '(2) §5.2 F-SITING test cell', 'doc', 'replace',
    r"""every household S2 demanded housed or reported unplaced (§13.2 T19-4)""",
    r"""every household S2 demanded housed or reported unplaced, and every household of a dossier's roster housed (§13.2 T19-4)""")

# ---------------------------------------------------------------- 4. VS3-04 (= VD3-12 (2), VP3-03) — scope
row(4, 'VS3-04', 'scope', '§13.2 T19-4', 'doc', 'replace',
    r"""and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46).""",
    r"""and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household of the dossier's roster is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a).""")
row(4, 'VS3-04', 'scope', '§16 M3a exit', 'doc', 'replace',
    r"""T20-6's refusal clause, T22-1 – T22-4""",
    r"""T20-6's refusal clause, T19-4's dossier clause, T22-1 – T22-4""")
row(4, 'VS3-04', 'scope', '§16 M2b exit', 'doc', 'replace',
    r"""T16-1, T16-2, T19-1 – T19-4, T23-1's parity clauses""",
    r"""T16-1, T16-2, T19-1 – T19-3, T19-4 but its dossier clause, T23-1's parity clauses""")

# ---------------------------------------------------------------- 5. V-MAB3-01 (= VD3-11, VP3-07) — model
row(5, 'V-MAB3-01', 'model', '(i) §2.6 capacity bullet', 'doc', 'replace',
    r"""re-homes the households past the capacity, the last in address order, by §4.7's overflow pass""",
    r"""re-homes the households past the capacity, the last in address order passing over a locked or pinned one (§7.2), which keeps its building, by §4.7's overflow pass""")
row(5, 'V-MAB3-01', 'model', '(ii) §2.6 capacity bullet', 'doc', 'replace',
    r"""No such change is refused for it; only a hand `relet` above the capacity is (F-EDIT).""",
    r"""No such change is refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for (a dossier roster's household is re-housed by §4.7's re-provision) — which returns F-EDIT naming them, as a hand `relet` above the capacity does; S11's operator and an epoch's step leave a building whose locked or pinned households alone would exceed its new capacity unchanged, as a lock stops a rung-3 re-cut (§4.11) and any locked entity is a fixed input (§7.2), and a household no building of the district can take in a generation run or an epoch is F-SITING's (§5.2, J-A28.46).""")
row(5, 'V-MAB3-01', 'model', '(iii) J-A28.23 index row', 'doc', 'insert_after',
    r"""never by refusing the change""",
    r"""; the re-homing passes over locked and pinned households, and a hand edit whose excess cannot be re-homed returns F-EDIT""",
    scope='| J-A28.23 |')
row(5, 'V-MAB3-01', 'model', '(iv) J-A28.23 Part A', 'rat', 'append_entry',
    'J-A28.23',
    r"""A locked or pinned household keeps its building and the re-homing passes over it; a hand edit whose excess cannot be placed is refused rather than dropping a household, because a user's edit must never delete population the dossier or the roster supplied (verify-model-r3 V-MAB3-01 with VD3-11 and VP3-07).""",
    from_report=False)

# ---------------------------------------------------------------- 6. V-MAB3-08 — determinism
row(6, 'V-MAB3-08', 'determinism', '(i) §7.3 item 4', 'doc', 'replace',
    r"""A chained edit's report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings re-based or demolished — with their lifecycle events, and every edit's report lists the names it re-draws""",
    r"""A chained edit's report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings re-based or demolished — with their lifecycle events; every edit's report lists the households §2.6's capacity rule re-homes, each with its `relocate` event (from and to), the residential slots §4.7 builds to re-provide a dossier household's housing, and the names it re-draws""")
row(6, 'V-MAB3-08', 'determinism', '(ii) §5.2 F-EDIT detection (with VR3-01 (3))', 'doc', 'replace',
    r"""or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1);""",
    r"""or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1); a hand edit whose capacity re-homing cannot place its excess — locked or pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for (§2.6's capacity rule); a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);""")

# ---------------------------------------------------------------- 7. VR3-01 — model
row(7, 'VR3-01', 'model', '(1) §2.5 Passage', 'doc', 'replace',
    r"""headroomCm: Cm /* the ground storey's cells it takes; the storeys above keep the frontage continuous (§2.6) */""",
    r"""headroomCm: Cm /* the passage's clear height — the ground storey it takes, the storeys above keeping the frontage continuous (§2.6): derived, written by S11 whenever it writes the spanning wings' BaseWing.spans (§4.7 S11, §2.6), and so on every re-fit, as the least ground-storey height (eaveCm ÷ floors, rounded down to the centimetre) over the base wings that span it; S11 gives every spanning wing at least two floors (raising its class row's floors to two where they would be one), so each spanning wing's eave stands above the headroom (§8.5 (2)'s span mark, §8.4, §11.1); a heights edit that would leave a spanning wing below two floors is refused (F-EDIT, §5.2) */""")
row(7, 'VR3-01', 'model', '(2) §7.1 Entrances, basements, passages and plans', 'doc', 'insert_after',
    r"""seals or reopens one by setting `Passage.sealed` (§2.5);""",
    r""" `Passage.headroomCm` is derived — S11 writes it with the spanning wings' `spans` (§2.5) — and has no edit kind of its own;""")
row(7, 'VR3-01', 'model', '(3) §5.2 F-EDIT detection', 'doc', 'carried', '',
    'carried by row 6 V-MAB3-08 (ii): the report gives both F-EDIT clauses as one insertion at their shared anchor')
row(7, 'VR3-01', 'model', '(4) §13.2 T30-4', 'doc', 'insert_after',
    r"""a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings;""",
    r""" every passage with a `frontBuilding` has its `headroomCm` written, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;""")
row(7, 'VR3-01', 'model', '(5) J-ROWS', 'doc', 'j_row', '',
    r"""| J-A30.25 | `Passage.headroomCm` derived by S11 with the spans — the least ground-storey height over the base wings that span the passage — and every spanning wing at least two floors, a heights edit below that refused | §2.5, §2.6 |""")
row(7, 'VR3-01', 'model', '(6) RATIONALE-A', 'rat', 'rat_a', '',
    r"""| J-A30.25 | Chose to derive a passage's clear height from the wings that span it — the least ground-storey height over them, written by S11 with `BaseWing.spans` — and to give every spanning wing at least two floors, refusing a heights edit below that, over a headroom read from a table row by band, because a covered passage takes exactly the ground storey of the building over it (the owner's passage under a house; the realism tiebreaker), so its clear height is that storey's, while a table value could stand above a low wing's eave and leave the span mark, its shadow and the 3-D export with no height; a passage with no storey over it is an alley, not a passage (verify-rendering-r3 VR3-01; closing ruling). |""")

# ---------------------------------------------------------------- 8. VD3-05 (= V-MAB3-07) — determinism
row(8, 'VD3-05', 'determinism', '§5.3 row after the interior-ladder row', 'doc', 'insert_line',
    r"""| the interior ladder (item 28 (f), §2.6):""",
    r"""| no building houses more households than its capacity: `Building.households ≤ capacity(b)` (§2.6's one capacity function) after every committed change — the generation fill (§4.7), `relet` (§4.11) and every change §2.6's capacity rule lists, whose excess §4.7's overflow pass re-homes inside the causing event (J-A28.23, J-A28.46) | batch-local (the buildings whose wings, heights, class, plot `builtBand` or household count the batch wrote, and the receivers of its re-homing); stage-end (S11 per district after the overflow pass; each `epoch` event; a §7.6 table edit's re-derived set) | the capacity function recomputed on the touched buildings against `Building.households` |""",
    from_report=False)

# ---------------------------------------------------------------- 9. VD3-06 (= V-MAB3-10) — determinism
row(9, 'VD3-06', 'determinism', '§7.1 Entrances, basements, passages and plans', 'doc', 'replace',
    r"""an edit that lowers a building's capacity below its households — a `setAttr` of its heights, a `warp` or `moveVertex` that carries its footprint or its spanned passage's face — re-homes the excess by §2.6's capacity rule, each move among its fates (§7.3 item 4);""",
    r"""an edit that lowers a building's capacity below its households — any change §2.6's capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4);""")

# ---------------------------------------------------------------- 10. VD3-07 — determinism
row(10, 'VD3-07', 'determinism', '§7.3 stored-plan row, first cell', 'doc', 'replace',
    r"""— a `relet`, an occupants' band change at an epoch, a designation mutation (item 28 (f))""",
    r"""— a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28 (f))""")

# ---------------------------------------------------------------- 11. VD3-08 — determinism
row(11, 'VD3-08', 'determinism', '(1) §7.4 setAttr / setAttrMany / paint row, undo cell (appended at its end)', 'doc', 'insert_after',
    r"""the text it replaces kept in that event's undo record""",
    r"""; a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6)""",
    scope='| setAttr / setAttrMany / paint |', from_report=False)
row(11, 'VD3-08', 'determinism', '(2) §7.4 moveVertex / warp row, undo cell', 'doc', 'insert_after',
    r"""former bases of re-based entities""",
    r""", and the households §2.6's capacity rule re-homed, with their former buildings""",
    scope='| moveVertex / warp |')
row(11, 'VD3-08', 'determinism', '(3) §7.4 editTable / editPreset row, undo cell', 'doc', 'insert_after',
    r"""restored from the undo record, never re-drawn""",
    r"""; the households its capacity re-homing moved restored to their former buildings""",
    scope='| editTable / editPreset |')

# ---------------------------------------------------------------- 12. V-MAB3-09 — determinism
row(12, 'V-MAB3-09', 'determinism', '§7.3 item 1', 'doc', 'replace',
    r"""holds the buildings §2.6's capacity rule re-homes them into""",
    r"""holds that building and the buildings §2.6's capacity rule re-homes its households into""")

# ---------------------------------------------------------------- 13. VS3-05 (= VD3-12 (1), (3), V-MAB3-06) — scope
row(13, 'VS3-05', 'scope', '(1) §13.2 T28-18', 'doc', 'replace',
    r"""returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake).""",
    r"""returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households, and each edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over) with their `relocate` moves and holds that building and the receiving buildings in its effective scope; after commit no building houses more households than its capacity (§5.3); the undo of each returns every household to its former building byte-identically; and an edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for — returns F-EDIT (§2.6's capacity rule; the re-homing clause).""")
row(13, 'VS3-05', 'scope', '(2) §13.8', 'doc', 'replace',
    r"""housing clause and T28-18's `relet` clause from M3a""",
    r"""housing clause and T28-18's `relet` and re-homing clauses from M3a""")
row(13, 'VS3-05', 'scope', '(3) §16 M3a exit', 'doc', 'replace',
    r"""T28-17's housing clause, T28-18's `relet` clause, T30-3""",
    r"""T28-17's housing clause, T28-18's `relet` and re-homing clauses, T30-3""")
row(13, 'VS3-05', 'scope', '(4) §16 M3a content', 'doc', 'replace',
    r"""`relet` reading the household capacity M2b builds,""",
    r"""`relet` reading the household capacity M2b builds, every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6), and a dossier household's housing re-provided in its district (§4.7),""")
row(13, 'VS3-05', 'scope', '(5) J-A28.01 Part A (restated-row swap; index unchanged)', 'rat', 'replace',
    r"""T28-17's housing clause and T28-18's `relet` clause — run from M3a""",
    r"""T28-17's housing clause and T28-18's `relet` and re-homing clauses — run from M3a""",
    scope='| J-A28.01 |')

# ---------------------------------------------------------------- 14. V-MAB3-02 (= VR3-02) — model
row(14, 'V-MAB3-02', 'model', '(i) §2.6 capacity bullet', 'doc', 'replace',
    r"""the union of the extents of the wings that reach storey `s` (the contract's fourth rung, above):""",
    r"""the union of the extents of the building's base wings (`Building.wings`, with their `spans`) that reach storey `s` (the contract's fourth rung, above) — never a composition's wings, stored or derived, so neither a click nor a stored composition moves it (§6.2):""")
row(14, 'V-MAB3-02', 'model', '(ii) §2.6 Wing.spans', 'doc', 'replace',
    r"""read, on the base or the composed wing, by the capacity (below), the plan rung, §8.5's span mark, the shadow pass and the 3-D export""",
    r"""read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung""")
row(14, 'V-MAB3-02', 'model', '(iii) §2.6 stage-3 contract', 'doc', 'insert_after',
    r"""so O17 (i)'s identical footprint hash at every LOD holds by construction (its test: §13.2).""",
    r""" A composition's wings — generated or stored, and after every composition edit — reach every storey its base wings reach, with at least their area at each storey, so the households the capacity admits always fit its plan (F-PLAN tier 6, §5.2).""")
row(14, 'V-MAB3-02', 'model', '(iv) §2.6 intake bullet', 'doc', 'insert_after',
    r"""so a stage-3 generator is admitted only with compositions the base can carry""",
    r""" and only with compositions that keep that storey rule""")
row(14, 'V-MAB3-02', 'model', '(v) J-A28.28 Part A', 'rat', 'append_entry',
    'J-A28.28',
    r"""The capacity reads the base wings only, and every composition keeps at least their area at each storey they reach (verify-model-r3 V-MAB3-02, verify-rendering-r3 VR3-02).""",
    from_report=False)

# ---------------------------------------------------------------- 15. VK3-01 — model
row(15, 'VK3-01', 'model', '(1) §2.6 stage-3 contract', 'doc', 'insert_after',
    r"""and no piece has a hole, which the clip refuses.""",   # the report's leading ellipsis dropped
    r""" A composed tower — a round wing to the plan rung — stands in the clip order before every wing its ring overlaps without lying wholly inside it (a tower wholly inside a wing follows its container, as above), so its round room is its whole ring at each storey it reaches and the wing's piece takes the arc; every other composer's room (`Composition.rooms`) lies inside its own wing's piece at its storey — the composer emits it inside that wing's extent less the extents before the wing in the clip order — so every fixed ring the plan rung passes lies inside one seed piece (§3.4's `transientArena`), and F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug.""")
row(15, 'VK3-01', 'model', '(2) J-A28.26 index row', 'doc', 'replace',
    r"""a wing wholly inside another's at a storey after that container""",
    r"""a wing wholly inside another's at a storey after that container, a composed tower before the wings it engages""",
    scope='| J-A28.26 |')
row(15, 'VK3-01', 'model', '(3) J-A28.26 Part A', 'rat', 'append_entry',
    'J-A28.26',
    r"""A composed tower stands in the clip order before every wing it engages, over taking it last with its room clipped to a partial disk, because a round tower keeps its round room (the realism tiebreaker; a composer's towers are whole) and the engaged wing's rooms take the arc as a wall; every other composer's room lies inside its own wing's piece, so every fixed ring lies inside one seed (verify-kernel-r3 VK3-01; closing ruling).""",
    from_report=False)

# ---------------------------------------------------------------- 16. V-MAB3-03 — model
row(16, 'V-MAB3-03', 'model', '§2.6 step 5', 'doc', 'replace',
    r"""a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item 29 (5));""",
    r"""a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item 29 (5)), and a walk-out basement's outside door (step 3, `external`) the root of the basement's storeys;""")

# ---------------------------------------------------------------- 17. VS3-07 (= V-MAB3-11) — scope
row(17, 'VS3-07', 'scope', '§13.2 T28-2', 'doc', 'replace',
    r"""(T28-2) starting at the main entrance, openings and stair cores lead to every room of every storey;""",
    r"""(T28-2) starting at the main entrance — and, for a basement whose `Basement.access` is `external`, at its outside door (§2.6 step 3) — openings and stair cores lead to every room of every storey;""")

# ---------------------------------------------------------------- 18. V-MAB3-04 — model
row(18, 'V-MAB3-04', 'model', "(i) §10.2 RoomProgramRow", 'doc', 'replace',
    r"""basementAccess: 'core'|'trapdoor'|'external' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand; the plan rung reads Basement.access */""",
    r"""basementAccess: 'core'|'trapdoor' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */""")
row(18, 'V-MAB3-04', 'model', '(ii) §2.6 step 3', 'doc', 'replace',
    r"""opens the basement in the side of `Basement.ring` whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index);""",
    r"""opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long (a door's width), whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index) — where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —;""")
row(18, 'V-MAB3-04', 'model', '(iii) J-A29.25 Part A', 'rat', 'append_entry',
    'J-A29.25',
    r"""A programme row names a stair core or a trapdoor only, the outside stair being derived for a walk-out alone because it needs the fall a walk-out has; a walk-out whose ring has no side a door fits takes the trapdoor fallback (verify-model-r3 V-MAB3-04).""",
    from_report=False)

# ---------------------------------------------------------------- 19. V-MAB3-05 — model
row(19, 'V-MAB3-05', 'model', '§2.6 re-cut bullet', 'doc', 'replace',
    r"""Re-uniting the households removes what the subdivision added.""",
    r"""Re-uniting the households removes what the subdivision added — exactly for an unstored plan, whose canonical chain (below) returns the earlier plan; a stored plan's re-cut (below) keeps by least disruption the subdivided rooms that still fit a role, and its rings keep the `composition`-role vertices its re-cuts added (J-P48 (1)), which the shell's identity reads without; its undo restores it exactly (§7.4).""")

# ---------------------------------------------------------------- 20. VS3-08 (= V-MAB3-12) — scope
row(20, 'VS3-08', 'scope', '§13.2 T28-15', 'doc', 'replace',
    r"""(T28-15) re-uniting the households restores the earlier plan where nothing else changed (item 18 (e)'s inverse);""",
    r"""(T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the `composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4) (item 18 (e)'s inverse);""")

# ---------------------------------------------------------------- 21. VP3-05 — pipeline
row(21, 'VP3-05', 'pipeline', '(1) II.6', 'doc', 'replace',
    r"""`Frontage` records of the underground blocks along it (§2.5) split where one spans an end, keyed as the tunnel's parts are, and each re-pointed (`Frontage.way`) to the part it fronts;""",
    r"""`Frontage` records of the underground blocks along it (§2.5) split where one spans an end — the part beyond the end a new record, its kerb edges' `('frontage', id)` rows moved to it by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, both keyed by §6.3's rule for a split `Frontage` — and each re-pointed (`Frontage.way`) to the part it fronts;""")
row(21, 'VP3-05', 'pipeline', '(2) J-A11.43 Part A', 'rat', 'append_entry',
    'J-A11.43',
    r"""A block's `Frontage` record split at the same ends follows §6.3's rule, the part holding its first kerb edge keeping the address, so identity has one rule (verify-r3: VP3-05, VP3-06, VD3-10).""",
    from_report=False)

# ---------------------------------------------------------------- 22. VD3-10 (= VP3-06) — determinism
row(22, 'VD3-10', 'determinism', '§6.3 JOIN and SPLIT bullet', 'doc', 'insert_after',
    r"""and every part continues the tunnel's lineage with its part index.""",
    r""" A block's `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the record's first kerb edge in the centreline's order keeps its address, the other takes an address minted from the causing event's `seq` and ordinal, each part continues the record's lineage with its part index, and an `undo` restores the one record (§7.4).""")

# ---------------------------------------------------------------- 23. VS3-03 — scope
row(23, 'VS3-03', 'scope', '§13.2 T11-1', 'doc', 'replace',
    r"""every part continuing the lineage, the chambers, access points and block frontages re-pointed — closes only""",
    r"""every part continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there — the part beyond the end a new record with its kerb edges' rows, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts — closes only""")

# ---------------------------------------------------------------- 24. VD3-03 — determinism
row(24, 'VD3-03', 'determinism', '(1) §7.7 item 2', 'doc', 'replace',
    r"""— §4.11's *Dossier content across epochs* relocates the use first wherever a step would close it or empty or remove the building that houses it —""",
    r"""— §4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a step would close it or empty or remove that building —""")
row(24, 'VD3-03', 'determinism', '(2) J-A20.75 index row', 'doc', 'replace',
    r"""— it relocates it first (§4.11) —""",
    r"""— §4.11 relocates it first or keeps it in its building (J-A20.43) —""",
    scope='| J-A20.75 |')
row(24, 'VD3-03', 'determinism', '(3) J-A20.75 Part A', 'rat', 'replace',
    r"""§4.11 relocates the use first""",
    r"""§4.11 relocates the use first, or keeps it in its building where no candidate plot exists (J-A20.43)""",
    scope='| J-A20.75 |')

# ---------------------------------------------------------------- 25. VD3-04 — determinism
row(25, 'VD3-04', 'determinism', '(1) §7.4 Replay semantics', 'doc', 'insert_after',
    r"""a dossier element only by a dossier event (§7.7 item 2).""",   # the report's leading ellipsis dropped
    r""" Every later dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map event: `revert` skips it, and an `undo(h, of)` naming it returns F-EDIT offering `rejectSite` and `placeAt`; an `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way, because undoing either would change dossier content without a dossier instruction (item 20 (c)).""")
row(25, 'VD3-04', 'determinism', '(2) §7.4 Targets', 'doc', 'replace',
    r"""other than a `creation` event (above)""",
    r"""other than a `creation` event, a dossier event or an epoch that carried one (above)""")
row(25, 'VD3-04', 'determinism', '(3) §7.1 revert comment', 'doc', 'replace',
    r"""never a `creation` event, §7.4""",
    r"""never a `creation` or dossier event, §7.4""")
row(25, 'VD3-04', 'determinism', '(4) §7.7 item 6', 'doc', 'replace',
    r"""they fold only inside the epoch, are undone with it and are never undo targets on their own, and a truncated epoch that a `redo` re-appends keeps them (§7.4)""",
    r"""they fold only inside the epoch and are never undo targets, and neither is the epoch that carries them (§7.4)""")
row(25, 'VD3-04', 'determinism', '(5) §5.2 F-EDIT detection', 'doc', 'replace',
    r"""an `undo` naming a `creation` event (§7.4)""",
    r"""an `undo` naming a `creation` event, a dossier event or an epoch that carried one (§7.4)""")
row(25, 'VD3-04', 'determinism', '(6) J-A22.76 index row', 'doc', 'replace',
    r"""are undone with it, are never undo targets on their own, and keep their `seq`s when a `redo` re-appends a truncated epoch""",
    r"""are never undo targets, and the epoch that carries them is none either (item 20 (c); verify-determinism-r3 VD3-04)""",
    scope='| J-A22.76 |')
row(25, 'VD3-04', 'determinism', '(7) J-A22.76 Part A', 'rat', 'replace',
    r"""undo them with it, never make them undo targets on their own, and keep their `seq`s when a `redo` re-appends a truncated epoch""",
    r"""never make them undo targets, nor the epoch that carries them, since undoing either would change dossier content without a dossier instruction (item 20 (c); verify-determinism-r3 VD3-04)""",
    scope='| J-A22.76 |')

# ---------------------------------------------------------------- 26. VD3-09 — determinism
row(26, 'VD3-09', 'determinism', '(1) §5.2 F-PLAN tier 2', 'doc', 'insert_after',
    r"""as every tier-2 repair is (§5.1)""",
    r"""; where that order holds no further candidate, the anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys left unreached — the bar failing and the building flagged""")
row(26, 'VD3-09', 'determinism', '(2) J-A28.73 Part A', 'rat', 'append_entry',
    'J-A28.73',
    r"""An anchor whose filtered order is exhausted takes tier 6, reported and flagged, never an abort, because the exhaustion is the building's geometry, not a bug (verify-determinism-r3 VD3-09).""",
    from_report=False)

# ---------------------------------------------------------------- 27. VP3-08 — determinism
row(27, 'VP3-08', 'determinism', 'J-A28.51 Part A', 'rat', 'replace',
    r"""tier 6 never reaching a unit because S10b's fill and `relet` keep the count within §2.6's capacity""",
    r"""tier 6 never reaching a unit because the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` and §2.6's re-homing keep the count within §2.6's capacity""",
    scope='| J-A28.51 |')

# ---------------------------------------------------------------- 28. VK3-02 — kernel
row(28, 'VK3-02', 'kernel', 'J-A28.33 index row (restated-row swap)', 'doc', 'replace',
    r"""with the kept rooms and the fixed anchors as `fixed` rings""",
    r"""with the rings §2.6's re-cut rule passes as `fixed` rings (the stair bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms)""",
    scope='| J-A28.33 |')

# ---------------------------------------------------------------- 29. VS3-01 — scope
row(29, 'VS3-01', 'scope', '§0.2 row 20', 'doc', 'replace',
    r"""the lapse at an epoch and *Dossier content across epochs* — a dossier-backed use relocated before an epoch's step could close it or leave it without its building (J-A20.43) — in §4.11""",
    r"""the lapse at an epoch and *Dossier content across epochs* (J-A20.75, J-A20.43) in §4.11""")
row(29, 'VS3-01', 'scope', '§16 M4', 'doc', 'replace',
    r"""the floor's attributes with their migration, the lapse of a rejection at an epoch — with their hook tests""",
    r"""the floor's attributes with their migration, the lapse of a rejection at an epoch and the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43) — with their hook tests""")
row(29, 'VS3-01', 'scope', 'Staged evolution row', 'doc', 'replace',
    r"""the lapse of a rejection and the folding of a dossier event at an epoch (items 20, 22 (e))""",
    r"""the lapse of a rejection, *Dossier content across epochs* (J-A20.43) and the folding of a dossier event at an epoch (items 20, 22 (e))""")

# ---------------------------------------------------------------- 30. VS3-02 — scope
row(30, 'VS3-02', 'scope', 'J-A16.01 Part A (restated-row swap; index unchanged)', 'rat', 'insert_after',
    r"""the cuts then leave ≈ 135–174 pw for the base and ≈ 149–192 in total (§16, D-20).""",   # the report's leading ellipsis dropped
    r""" Repair round 3 (2026-09-27) moved §2.6's household capacity, with the programme rows' `circulation` share and least `room`-form area that it reads, from M3a's content to M2b's, because the generation fill clamps to it at S11 (J-A28.46) and T19-4 gates M2b; the closing round added to M3a the capacity re-homing on the edit paths and the re-provision of a dossier household's housing, which reuse the overflow pass, the `dossier` request and S11's operator that M2b and M3a already build; the work moves between the rows and is absorbed there, the rows' amounts and the total unchanged (verify-scope-r3 VS3-02; closing).""",
    scope='| J-A16.01 |')

# ---------------------------------------------------------------- 31. VS3-06 (= VK3-03) — scope
row(31, 'VS3-06', 'scope', '§13.1', 'doc', 'replace',
    r"""(each ring's pieces against the oracle's result for that ring less every earlier ring)""",
    r"""(each ring's pieces against the oracle's result for that ring less every earlier ring, and a refusal — detail `overlap` — exactly where that result has a hole)""")


# ================================================================ the engine
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def line_of(text, pos):
    return text.count('\n', 0, pos)


def heading_at(text, pos):
    """The nearest heading line (outside fences) at or before pos, and the top-level (# ) heading."""
    lines = text.split('\n')
    target = line_of(text, pos)
    fence, last, top = None, '', ''
    for i, l in enumerate(lines[:target + 1]):
        m = FENCE.match(l)
        if m:
            fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence)
            continue
        if fence is None and HEAD.match(l):
            last = l
            if l.startswith('# ') or l.startswith('## §') or re.match(r'^## (\d+|II\.\d+|III\.\d+)\b', l):
                top = l
    return last, top


def scoped_span(text, scope):
    """(start, end) of the one line that starts with scope, or the count of such lines."""
    starts = [m.start() for m in re.finditer(r'(?m)^' + re.escape(scope), text)]
    if len(starts) != 1:
        return None, len(starts)
    s = starts[0]
    e = text.find('\n', s)
    return (s, len(text) if e < 0 else e), 1


def table_last_row_end(text, header_rx, section_rx):
    """The end offset of the last row of the first table after the section heading matching section_rx."""
    m = re.search(section_rx, text, re.M)
    if not m:
        return None
    h = re.compile(header_rx, re.M).search(text, m.end())
    if not h:
        return None
    lines_from = text[h.start():].split('\n')
    off = h.start()
    last_end = None
    for k, l in enumerate(lines_from):
        if k >= 2 and not l.startswith('|'):
            break
        off_end = off + len(l)
        if k >= 2:
            last_end = off_end
        off = off_end + 1
    return last_end


SOFT = r'(?:[ \t]*\n[ \t]*| )'   # one space of a quoted string: a space, or ONE soft line break with its indentation


def flex(s):
    """The quoted string as a pattern whose every single space also matches one soft line break of the hard-wrapped
    document (never a blank line, so never a paragraph break); every other character is matched exactly."""
    toks = s.split(' ')
    if '' in toks:
        return re.compile(re.escape(s))
    return re.compile(SOFT.join(re.escape(t) for t in toks))


def locate(text, r):
    """(count, matches) of the anchor in its scope on text; a match is (start, end, matched text), absolute offsets."""
    k = r['kind']
    if k in ('j_row', 'rat_a', 'carried'):
        return 1, []
    if k == 'append_entry':
        span, n = scoped_span(text, '| ' + r['anchor'] + ' |')
        if span is None:
            return n, []
        s, e = span
        if not text[s:e].rstrip().endswith(' |'):
            return 0, []
        return 1, [(s, e, text[s:e])]
    if k == 'insert_line':
        ms = [(m.start(), m.end(), m.group(0)) for m in re.finditer(r'(?m)^' + re.escape(r['anchor']), text)]
        return len(ms), ms
    rx = flex(r['anchor'])
    if r['scope']:
        span, n = scoped_span(text, r['scope'])
        if span is None:
            return 0, []
        s, e = span
        ms = [(m.start() + s, m.end() + s, m.group(0)) for m in rx.finditer(text[s:e])]
        return len(ms), ms
    ms = [(m.start(), m.end(), m.group(0)) for m in rx.finditer(text)]
    return len(ms), ms


def rewrap(matched, anchor, new):
    """The new text with the soft line breaks the matched anchor held carried to the same words: a break before word k
    of the anchor goes before the same word of the new text when the words up to it (or from it to the end) are shared;
    otherwise it becomes a space (the two lines joined). Returns (text, breaks kept, breaks joined)."""
    parts = re.split(r'([ \t]*\n[ \t]*| )', matched)
    A, seps = parts[0::2], parts[1::2]
    assert A == anchor.split(' '), (A, anchor)
    N = new.split(' ')
    pre = 0
    while pre < min(len(A), len(N)) and A[pre] == N[pre]:
        pre += 1
    suf = 0
    while suf < min(len(A), len(N)) - pre and A[-1 - suf] == N[-1 - suf]:
        suf += 1
    out_sep = [' '] * (len(N) - 1)
    kept = joined = 0
    for k, sep in enumerate(seps, start=1):      # sep sits before A[k]
        if '\n' not in sep:
            continue
        if k <= pre and k < len(N):
            out_sep[k - 1] = sep; kept += 1
        elif len(A) - k <= suf and 0 < len(N) - (len(A) - k):
            out_sep[len(N) - (len(A) - k) - 1] = sep; kept += 1
        else:
            joined += 1
    s = N[0]
    for sep, w in zip(out_sep, N[1:]):
        s += sep + w
    return s, kept, joined


def apply_one(text, r, m):
    """The text with row r applied at match m; also returns a note on soft breaks."""
    k = r['kind']
    start, end, matched = m
    if k == 'replace':
        if '\n' in matched:
            new, kept, joined = rewrap(matched, r['anchor'], r['text'])
            return text[:start] + new + text[end:], f'anchor across {kept + joined} soft line break(s): {kept} kept, {joined} joined'
        return text[:start] + r['text'] + text[end:], ''
    if k == 'insert_after':
        note = f"anchor across {matched.count(chr(10))} soft line break(s), kept" if '\n' in matched else ''
        return text[:end] + r['text'] + text[end:], note
    if k == 'insert_line':
        e = text.find('\n', start)
        return text[:e] + '\n' + r['text'] + text[e:], ''
    if k == 'append_entry':
        line = text[start:end]
        stripped = line.rstrip()
        assert stripped.endswith(' |')
        new = stripped[:-2] + ' ' + r['text'] + ' |'
        return text[:start] + new + text[end:], ''
    raise ValueError(k)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--check', action='store_true')
    ap.add_argument('--write', action='store_true')
    ap.add_argument('--out-doc')
    ap.add_argument('--out-rationale')
    ap.add_argument('--log')
    a = ap.parse_args()
    src = {'doc': open(DOC, encoding='utf-8').read(), 'rat': open(RAT, encoding='utf-8').read()}
    report = open(REPORT, encoding='utf-8').read()
    sec2 = report[report.index('## 2 The hand-fix list'):report.index('## 3 The closing seat')]
    log = dict(input={f: dict(path=DOC if f == 'doc' else RAT, sha256=sha(t), bytes=len(t.encode()), lines=t.count('\n'))
                      for f, t in src.items()}, rows=[], problems=[])

    # (1) the pre-check on the ORIGINAL files: every anchor once in its scope; every quoted string in the report
    pre_ok = True
    for i, r in enumerate(R):
        r['i'] = i + 1
        n, pos = locate(src[r['file']], r)
        glob_n = len(flex(r['anchor']).findall(src[r['file']])) if r['kind'] in ('replace', 'insert_after') else None
        r['pre_count'], r['pre_global'] = n, glob_n
        r['pre_soft'] = bool(pos) and '\n' in pos[0][2] and r['kind'] in ('replace', 'insert_after')
        if r['kind'] not in ('j_row', 'rat_a', 'carried'):
            if n != 1:
                pre_ok = False
                log['problems'].append(f"row {r['i']} ({r['n']} {r['id']} {r['sub']}): anchor found {n} times on the original")
            else:
                r['heading'], r['top'] = heading_at(src[r['file']], pos[0][0])
        in_rep_anchor = (not r['from_report']) or r['kind'] in ('j_row', 'rat_a', 'carried') or r['anchor'] in sec2
        in_rep_text = r['kind'] == 'carried' or r['text'] in sec2
        r['anchor_in_report'], r['text_in_report'] = in_rep_anchor, in_rep_text
        if not (in_rep_anchor and in_rep_text):
            pre_ok = False
            log['problems'].append(f"row {r['i']} ({r['n']} {r['id']} {r['sub']}): not verbatim in the report: "
                                   f"{'anchor ' if not in_rep_anchor else ''}{'text' if not in_rep_text else ''}")
    ids_j = re.findall(r'(?m)^\| (J-A30\.25) \|', src['doc'])
    ids_a = re.findall(r'(?m)^\| (J-A30\.25) \|', src['rat'])
    if ids_j or ids_a:
        pre_ok = False
        log['problems'].append(f'J-A30.25 already present (index {len(ids_j)}, Part A {len(ids_a)})')
    log['pre_check_ok'] = pre_ok
    for r in R:
        print(f"pre  {r['i']:>2} #{r['n']:<2} {r['id']:<10} {r['sub'][:48]:<48} {r['file']} {r['kind']:<12} "
              f"count={r['pre_count']}{'' if r['pre_global'] is None else ' global=' + str(r['pre_global'])}"
              f"{' soft-break' if r.get('pre_soft') else ''}"
              f"{'' if r['anchor_in_report'] and r['text_in_report'] else '  NOT-IN-REPORT'}")
    for p in log['problems']:
        print('PROBLEM', p)
    if a.check:
        print('pre-check', 'OK' if pre_ok else 'FAILED')
        return

    # (2) apply in order on the evolving text, each anchor re-counted
    cur = dict(src)
    for r in R:
        rec = dict(i=r['i'], n=r['n'], id=r['id'], part=r['part'], sub=r['sub'], file=r['file'], kind=r['kind'],
                   scope=r['scope'], pre_count=r['pre_count'], pre_global=r['pre_global'],
                   heading=r.get('heading', ''), top=r.get('top', ''), from_report=r['from_report'])
        if r['kind'] == 'carried':
            rec['state'] = 'carried'; rec['note'] = r['text']
            log['rows'].append(rec); continue
        if r['kind'] in ('j_row', 'rat_a'):
            if r['kind'] == 'j_row':
                end = table_last_row_end(cur['doc'], r'^\| id \| the choice \| where \|\s*$', r'^# Judgment calls')
            else:
                end = table_last_row_end(cur['rat'], r'^\| id \| call \|\s*$', r'^## Part A')
            if end is None:
                rec['state'] = 'SKIPPED'; rec['note'] = 'table not found'
            else:
                t = cur[r['file']]
                cur[r['file']] = t[:end] + '\n' + r['text'] + t[end:]
                rec['state'] = 'applied'; rec['at_line'] = line_of(cur[r['file']], end) + 2
                rec['heading'] = '# Judgment calls' if r['kind'] == 'j_row' else '## Part A'
            log['rows'].append(rec); continue
        n, pos = locate(cur[r['file']], r)
        rec['apply_count'] = n
        if n != 1:
            rec['state'] = 'SKIPPED'; rec['note'] = f'anchor found {n} times on the text as it stands'
            log['rows'].append(rec); continue
        rec['at_line'] = line_of(cur[r['file']], pos[0][0]) + 1
        cur[r['file']], note = apply_one(cur[r['file']], r, pos[0])
        if note:
            rec['note'] = note
        rec['state'] = 'applied'
        log['rows'].append(rec)

    # (3) each applied text counted in the result (a later row may legitimately re-word part of an earlier text)
    for rec, r in zip(log['rows'], R):
        if rec['state'] == 'applied':
            rec['post_count'] = len(flex(r['text']).findall(cur[r['file']]))
            if rec['post_count'] != 1:
                log['problems'].append(f"row {r['i']} ({r['n']} {r['id']} {r['sub']}): applied text found {rec['post_count']} times in the result")
    applied = [x for x in log['rows'] if x['state'] == 'applied']
    skipped = [x for x in log['rows'] if x['state'] == 'SKIPPED']
    log['output'] = {f: dict(sha256=sha(t), bytes=len(t.encode()), lines=t.count('\n')) for f, t in cur.items()}
    log['summary'] = dict(rows=len(R), applied=len(applied), skipped=len(skipped),
                          carried=sum(1 for x in log['rows'] if x['state'] == 'carried'),
                          issues=len({r['n'] for r in R}),
                          issues_fully_applied=sorted({r['n'] for r in R} - {x['n'] for x in skipped}))
    for x in log['rows']:
        print(f"{x['state']:<8} {x['i']:>2} #{x['n']:<2} {x['id']:<10} {x['sub'][:50]:<50} l.{x.get('at_line', '-')}"
              f"{'' if 'post_count' not in x else ' post=' + str(x['post_count'])}{'  ' + x['note'] if x.get('note') and x['state'] != 'carried' else ''}")
    for p in log['problems']:
        print('PROBLEM', p)
    print('summary', json.dumps(log['summary']))
    for f in ('doc', 'rat'):
        print(f"{f}: {log['input'][f]['bytes']} -> {log['output'][f]['bytes']} bytes, {log['input'][f]['lines']} -> "
              f"{log['output'][f]['lines']} lines, sha256 {log['output'][f]['sha256']}")

    # (4) write once
    if a.write:
        if sha(open(DOC, encoding='utf-8').read()) != log['input']['doc']['sha256'] or \
                sha(open(RAT, encoding='utf-8').read()) != log['input']['rat']['sha256']:
            sys.exit('STOP — a design file changed while this run computed; nothing written')
        open(DOC, 'w', encoding='utf-8').write(cur['doc'])
        open(RAT, 'w', encoding='utf-8').write(cur['rat'])
        log['written'] = [DOC, RAT]
        print('written', DOC, RAT)
    else:
        if a.out_doc:
            open(a.out_doc, 'w', encoding='utf-8').write(cur['doc'])
        if a.out_rationale:
            open(a.out_rationale, 'w', encoding='utf-8').write(cur['rat'])
    if a.log:
        json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
