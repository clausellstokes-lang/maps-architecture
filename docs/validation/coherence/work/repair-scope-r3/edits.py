# edits.py — the edits of lane coherence/repair-scope-r3, read by gen.py (exec). Each E(path, head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head` (base sha256 4ed292e9…,
# rationale dd2bfafa…, INDEX 1774db18…). ROW(kind, path, id, old, new, *ids) restates one table row by an asserted
# substitution of the live row.

# ───────────────────────────── §1.1 ─────────────────────────────
# Where the map is seen: the touch fallback changes only a default (VCS-r2-03).
E(DOC, H11,
  "Tablets keep every tool, under touch and pen (V09 §4.12). It lands",
  "Tablets keep every tool, under touch and pen (V09 §4.12); §13.4's touch fallback changes only a default. It lands",
  'VCS-r2-03')

# ───────────────────────────── §13.2 ─────────────────────────────
# T110-2: the ring-end foot through an epoch's frame growth (VKr2-02; R3-25 (b)).
E(DOC, H132,
  """an aqueduct sourced beyond the frame laid to the outer
    ring without a ramp, a declared course drawn beyond the frame bent to the ring;""",
  """an aqueduct sourced beyond the frame laid to the outer
    ring without a ramp, and the same aqueduct through an epoch's frame growth — §3.10's stored-references row passing
    at every stage end of the epoch, no part-0 vertex left with a row and no edge, and after §4.11 both ends of its
    ring-end foot on the new rings (§2.7 `RaisedFoot`, §3.2 (9)) —, a declared course drawn beyond the frame bent to the
    ring;""",
  'VKr2-02')

# T110-2: a trace laid across a standing raised way (END of VEW-r2-01, model; R3-25 (c)).
E(DOC, H132,
  """and every clear span on either side of the station within its bound; (T110-3)""",
  """and every clear span on either side of the station within its bound; a CITY c14 fixture whose S4 viaduct over a
    valley is crossed at a gate by stage 2's moated ring, and an epoch circuit across a standing aqueduct — each
    crossing's one station on the trace, 0 piers in a setback, glacis, berm or moat, the raised way kept (§2.7's support
    step (6)); (T110-3)""",
  'END VEW-r2-01')

# Item 111's runs list (VAP-r2-01 per R3-26; the registrations R3-26 adds: T-V10-45, T-V11-38 (b)).
E(DOC, H132,
  """Volume 7 runs them at the village rungs,
    volume 6 over epochs (a failing spring weakens its pull), volume 12 registers their register lines.""",
  """Volume 7 runs them at the village rungs
    (T-V7-58), volume 6 over epochs, a failing spring weakening its pull (T-V6-72), volume 8 the port's clauses
    (T-V8-50), volumes 10 and 11 T111-5's registration on their goldens and sites (T-V10-45, T-V11-38) and volume 12 the
    specs, the pin and the register lines (T-V12-44).""",
  'VAP-r2-01', 'R3-26')

# Item 112's runs list (VAP-r2-01).
E(DOC, H132,
  """public release (§16's release gate), its findings entered in volume 12's calibration record and the fix list.""",
  """public release (§16's release gate), its findings entered in volume 12's calibration record and the fix list.
    Volume 9 runs T112-1 on its thematic views and T112-2's trial (T-V9-72) and volume 12 the style line (T-V12-45).""",
  'VAP-r2-01')

# Item 113's runs list (VAP-r2-01; T-V11-39 (b)'s registration, R3-26).
E(DOC, H132,
  """Volume 6 runs them on its replay engine, volume 4 T113-4 and T113-5 on the underground's output, volume 8
    the dossier's history, volume 12 their register lines and the replay's budget.""",
  """Volume 6 runs them on its replay engine (T-V6-71), volume 4 T113-4 and T113-5 on the underground's output
    (T-V4-77, T-V4-76), volume 7 the village halves of T113-1 and T113-3 (T-V7-59), volume 8 the dossier's history
    (T-V8-51), volume 11 T113-7's registration (T-V11-39), volume 12 their register lines and the replay's budget
    (T-V12-46).""",
  'VAP-r2-01', 'R3-26')

# Item 114: the band under a crossing station held from decay (END of VM-R2T-03, model; R3-25 (d)) — T114-3's decay
# clause is the one the fixture's other stretches follow (a neglected ring, V06 §3.7.7 (2): NEED low).
E(DOC, H132,
  """(T114-3) a safe one decays through `worn` to `breached`, no run going from `standing`
    to `breached` in one change; (T114-4)""",
  """(T114-3) a safe one decays through `worn` to `breached`, no run going from `standing`
    to `breached` in one change, and on a neglected, poor CITY ring over 20 epochs with a masonry aqueduct through its
    wall arch and a viaduct on a raised gate the stretch under each crossing station is never `breached` or `dismantled`
    while its deck stands (§2.7's support step (3)), every other stretch decaying as the first clause states; (T114-4)""",
  'END VM-R2T-03')

# Item 114's runs list (VAP-r2-01; T-V11-40 (b)'s registration, R3-26).
E(DOC, H132,
  "Volume 6 runs T114-1 – T114-5 and T114-8's epoch clause on its engine (T-V6-73)",
  "Volume 6 runs T114-1 – T114-5, T114-8's and T114-10's epoch clauses on its engine (T-V6-73)",
  'VAP-r2-01')
E(DOC, H132,
  "volume 11 the rows (T-V11-40)",
  "volume 11 the rows and T114-8's registration (T-V11-40)",
  'R3-26')

# Item 115's runs list (VAP-r2-01; T-V11-41 (b)'s registrations, R3-26).
E(DOC, H132,
  """volume 2 on composed shapes
    (T-V2-58),""",
  """volume 2 on composed shapes
    and the rung pin on B-MASS (T-V2-58),""",
  'VAP-r2-01')
E(DOC, H132,
  "volume 11 the table (T-V11-41)",
  "volume 11 the table and T115-4's registrations (T-V11-41)",
  'R3-26')

# T116-4: the export bar framed by §8.7 at any window size and with none (VEW-r2-02; the stop-0 clause stays T116-1's).
E(DOC, H132,
  """(T116-4) every export frames within the limit, the whole bounds at most, or stop 0's extent where the bounds are wider
    than the window at stop 0. T-ER-08's""",
  """(T116-4) every export frames within the limit bounds (§8.7: the whole bounds — town and camps while a crisis look
    stands — at most), at any window size and with none; at the METROPOLIS cap a whole-bounds PNG, print and SVG export
    frames the whole bounds. T-ER-08's""",
  'VEW-r2-02')

# Item 119's runs list (VAP-r2-01).
E(DOC, H132,
  "volume 3 the plan's (T-V3-37)",
  "volume 3 the plan's (T-V3-37: T119-2 – T119-5)",
  'VAP-r2-01')

# T122-4: the census's three lists (END of VV78-r2-10, V11).
E(DOC, H132,
  """(T122-4) every SettlementForge stressor
    type and condition archetype at the pinned baseline has its row""",
  """(T122-4) every SettlementForge stressor
    type, condition archetype and crisis event at the pinned baseline has its row""",
  'END VV78-r2-10')

# Item 122's runs list (VAP-r2-01; T-V8-59's and T-V2-60 (c)'s registrations, R3-26).
E(DOC, H132,
  "volume 8 its census of the baseline's lists (T-V8-59)",
  "volume 8 its census of the baseline's lists and T122-1 and T122-7's registration (T-V8-59)",
  'R3-26')
E(DOC, H132,
  """volume 3 the plan
    clauses of T122-1 – T122-3 (T-V3-40); volume 1's units and land (T-V1-60), volume 2's ruined look (T-V2-60), volume
    8's forces (T-V8-60) and volume 10's explanations (T-V10-52) test their own parts.""",
  """volume 3 the plan
    clauses of T122-1 – T122-3 and T122-7 (T-V3-40); volume 1's units and land (T-V1-60), volume 2's ruined look, with
    T122-1 and T122-7's registration (T-V2-60), volume 8's forces (T-V8-60) and volume 10's explanations (T-V10-52) test
    their own parts.""",
  'VAP-r2-01', 'R3-26')

# T123-4: restoration is a `reoccupy` back into use or a repair (END of VV56-r2-01, V06; R3-08 (a)).
E(DOC, H132,
  """(T123-4) restoring — `reused`, `reoccupy`,
    a repair — lowers the level and removes the damage in reverse threshold order, each repaired element drawn in item
    114's patch material;""",
  """(T123-4) restoring — a `reoccupy` back
    into use (item 123 (b)'s "reused") or a repair — lowers the level and removes the damage in reverse threshold order,
    each repaired element drawn in item 114's patch material;""",
  'END VV56-r2-01')

# Item 123's runs list (VAP-r2-01).
E(DOC, H132,
  "volume 2 T123-5 (T-V2-59)",
  "volume 2 T123-5 and T123-7's exterior clause (T-V2-59)",
  'VAP-r2-01')

# T126-1 with the fabric edits' default on (VCS-r2-03); item 126's runs list (VAP-r2-01).
E(DOC, H132,
  """every tool of V09 §4.12's list completes its canvas script under touch; (T126-2)""",
  """every tool of V09 §4.12's list completes its canvas script under touch, with `AppPrefs.touch.editFabric` on;
    (T126-2)""",
  'VCS-r2-03')
E(DOC, H132,
  """volume 8 T126-2's host-frame clause
    (T-V8-62)""",
  """volume 8 T126-2's host-frame clause and
    T126-3's embed clause (T-V8-62)""",
  'VAP-r2-01')

# The take-over table (VAP-r2-01 per R3-26; R3-26's registrations at their rows).
E(DOC, H132,
  "T114-1 – T114-5 and T114-8's epoch clause (T-V6-73)",
  "T114-1 – T114-5, T114-8's and T114-10's epoch clauses (T-V6-73)",
  'VAP-r2-01')
E(DOC, H132,
  "T119-2's plan clauses (T-V3-37)",
  "T119-2 – T119-5's plan clauses (T-V3-37)",
  'VAP-r2-01')
E(DOC, H132,
  "T122-1's, T122-2's and T122-3's plan clauses (T-V3-40)",
  "T122-1's, T122-2's, T122-3's and T122-7's plan clauses (T-V3-40)",
  'VAP-r2-01')
E(DOC, H132,
  "T115-1's composed shapes (T-V2-58), T119-2's stage-3 clauses (T-V2-22, T-V2-24), T123-5 (T-V2-59) |",
  "T115-1's composed shapes and T115-4's rung clause on B-MASS (T-V2-58), T119-2's stage-3 clauses (T-V2-22, T-V2-24), "
  "T122-1 and T122-7's `item122.crises` registration (T-V2-60), T123-5 and T123-7's exterior clause (T-V2-59) |",
  'VAP-r2-01', 'R3-26')
E(DOC, H132,
  "T122-4's census clause (T-V8-59), T125-1 – T125-3 (T-V8-61) and T126-2's host-frame clause (T-V8-62) |",
  "T122-4's census clause and T122-1 and T122-7's `item122.crises` registration (T-V8-59), T125-1 – T125-3 (T-V8-61) "
  "and T126-2's host-frame clause and T126-3's embed clause (T-V8-62) |",
  'VAP-r2-01', 'R3-26')
E(DOC, H132,
  "| T101-6's clerk path, T115-3's clerk form (T-V10-48), T120-2's clerk clause (T-V10-51) |",
  "| T101-6's clerk path, T111-5's `item111.water` registration (T-V10-45), T115-3's clerk form (T-V10-48), T120-2's "
  "clerk clause (T-V10-51) |",
  'R3-26')
E(DOC, H132,
  "the screens of items 111–126 (T-V9-71 – T-V9-79, T-V9-83 – T-V9-87: T114-6's legend,",
  "the screens of items 111–126 (T-V9-71 – T-V9-79, T-V9-83 – T-V9-87: T112-1's thematic-view clause and T112-2 "
  "(T-V9-72), T114-6's legend,",
  'VAP-r2-01')
E(DOC, H132,
  "| every bar's register line and its spec, the specs, pins and bench bars of items 111–126 (T-V12-44 – T-V12-50, "
  "T-V12-52 – T-V12-59): T120-1 and T120-6 (T-V12-52);",
  "| every bar's register line and its spec, the specs, pins and bench bars of items 111–126: T111-1 – T111-5 "
  "(T-V12-44); T112-1's style line (T-V12-45); T113-2 and T113-5's registration (T-V12-46); T114-4 – T114-7 (T-V12-47); "
  "T115-1, T115-4 and T116-1 (T-V12-48); T117-2 and T118-2 – T118-6 (T-V12-49); T119-1, T119-2, T119-4 and T119-5 "
  "(T-V12-50); T120-1 and T120-6 (T-V12-52);",
  'VAP-r2-01')
E(DOC, H132,
  "| every content row a bar reads, T117-3 (T-V11-42),",
  "| every content row a bar reads, the registrations of T111-5 (T-V11-38), T113-7 (T-V11-39), T114-8 (T-V11-40) and "
  "T115-4 (T-V11-41), T117-3 (T-V11-42),",
  'R3-26')

# ───────────────────────────── §13.4 ─────────────────────────────
# The touch fallback is a default, switchable and never removed (VCS-r2-03).
E(DOC, H134,
  "and the fabric and finish layers become pointer-only, stated in the guide;",
  "and the fabric and finish layers' geometry edits are off by default on a coarse pointer\n"
  "  (`AppPrefs.touch.editFabric`, V09 §4.12), switchable back on and never removed (item 126 (e)), stated in the guide;",
  'VCS-r2-03')

# ───────────────────────────── §13.8 ─────────────────────────────
# T110-2's epoch clauses scheduled with the epochs (VKr2-02, END of VEW-r2-01).
E(DOC, H138,
  "| T110-1 – T110-7; the specs `T110b.*` | PR; the four raised-way specs in the milestone and weekly run (≤ 20 CPU-min) | M3a |",
  "| T110-1 – T110-7; the specs `T110b.*` | PR; the four raised-way specs in the milestone and weekly run (≤ 20 CPU-min) | "
  "M3a (T110-2's epoch clauses — the frame growth and the circuit across a standing aqueduct — from M4 on the hook "
  "fixtures, the circuit on volume 6's engine with M6-E's E3) |",
  'VKr2-02', 'END VEW-r2-01')
# The disaster look's district clauses from M5 (VCS-r2-04 per R3-15).
E(DOC, H138,
  "volume 8's dossier crisis and force fixtures from M-SF (V12 §6) | M3b |",
  "volume 8's dossier crisis and force fixtures from M-SF (V12 §6) | M3b (the `disaster` look's district clauses from M5) |",
  'VCS-r2-04')
# T126-1's touch script by the milestone that lands each tool (VAP-r2-14).
E(DOC, H138,
  "| T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout) |",
  "| T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout); T126-1 each tool from the milestone "
  "that lands it, every tool from M3a |",
  'VAP-r2-14')

# ───────────────────────────── §14 ─────────────────────────────
# `HostContext.line` checked, never chosen from (END of G125-V08, V08; R3-20 (1)).
E(DOC, H14,
  "line?: string /* the SettlementForge line the host runs: picks the adapter (V08 §2.4); absent, the dossier's own version "
  "stamps pick it; a line no adapter supports, or one the stamps contradict: E_LINE_UNSUPPORTED */ }",
  "line?: string /* the SettlementForge line the host runs: checked against the dossier's own selection (V08 §2.4), never "
  "chosen from; a line no adapter supports, or one the dossier's stamps contradict: E_LINE_UNSUPPORTED; a registered, "
  "accepting line that differs leaves the selection standing, both reported */ }",
  'END G125-V08')
E(DOC, H14,
  """`line` picks the adapter (V08 §2.4) — with no host context the
   dossier's own version stamps pick it, and a `line` no adapter supports, or one the stamps contradict, refuses with
   `E_LINE_UNSUPPORTED`.""",
  """`line` is checked against the dossier's own
   selection (V08 §2.4), never chosen from — a `line` no adapter supports, or one the stamps contradict, refuses with
   `E_LINE_UNSUPPORTED`.""",
  'END G125-V08')
# §11.2's `ExportOpts` and `Format` cited by §14's exporter registry and the host context (rendering's hand-off of
# VRC2T-12).
E(DOC, H14,
  "displayNames?: Record<string /* binding key */, string> /* applied inside ONE export request, never stored (item 85) */;",
  "displayNames?: Record<string /* binding key */, string> /* applied inside ONE export request (§11.2's "
  "`ExportOpts.displayNames`), never stored (item 85) */;",
  'HANDOFF VRC2T-12')
E(DOC, H14,
  "`displayNames` — dossier key → text — are applied inside ONE export request and never stored,",
  "`displayNames` — dossier key → text — are applied inside ONE export request (§11.2's `ExportOpts.displayNames`) and\n"
  "   never stored,",
  'HANDOFF VRC2T-12')
E(DOC, H14,
  "  /* runs in the generation worker (§11.1):",
  "  /* `id` a `Format` and `Opts` §11.2's `ExportOpts` (the members a format reads); runs in the generation worker (§11.1):",
  'HANDOFF VRC2T-12')

# ───────────────────────────── §16 ─────────────────────────────
# M3b: the disaster look's parts placed by milestone (VCS-r2-04 per R3-15; the rule's home §10.2 *Crisis looks*).
E(DOC, H16,
  "the closed map's rows and the dossier's reading with M-SF; item 124's weather effects",
  "the closed map's rows and the dossier's reading with M-SF — the `disaster` look's districts (§10.2's `neighbourhoods`) "
  "with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10), its ruined exterior with M6 (V02 §8.6) and its "
  "plan damage with volume 3's P4, and until each lands that part draws nothing (§10.2 *Crisis looks*); item 124's "
  "weather effects",
  'VCS-r2-04')
# M5: item 122's disaster units in the content, their clauses in the exit (VCS-r2-04 = VV12-r2-07, one clause).
E(DOC, H16,
  "volume 1's area and gap services `findAreas` and `gapUnits` (W10–W11) |",
  "volume 1's area and gap services `findAreas` and `gapUnits` (W10–W11); item 122's disaster districts — volume 1's "
  "`disasterSource` and `disasterDistricts` (W10; V01 §3.16) |",
  'VCS-r2-04', 'VV12-r2-07')
E(DOC, H16,
  "the bars §13.8's schedule gives M5 (T120-1 – T120-6);",
  "the bars §13.8's schedule gives M5 (T120-1 – T120-6; the `disaster` look's district clauses of T122-2, T122-3, T122-5 "
  "and T122-6);",
  'VCS-r2-04')
# M3c: Find's clerk content is C4's (VV910-r2-07).
E(DOC, H16,
  "V10 §8's exits (C3's item-120 content landing with M5's exit)",
  "V10 §8's exits (C4's item-120 content — the find form and read — landing with M5's exit)",
  'VV910-r2-07')

# ───────────────────────────── Appendix A ─────────────────────────────
# The SettlementForge fields in development (VCS-r2-06).
E(DOC, HAPA,
  """their shapes, thresholds and table rows are the program's proposals; item 69's palette numbers came from the owner's
item.""",
  """their shapes, thresholds and table rows are the program's proposals. The SettlementForge fields the owner's items mark
in development — item 122 (h)'s forces, coalitions and travelling groups with their sizes, and a current-week stamp — are
PLAUSIBLE until item 125 (d)'s final local check of SettlementForge's checkout confirms each, field by field, item 125
(b)'s fallback in force meanwhile. Item 69's palette numbers came from the owner's item.""",
  'VCS-r2-06')

# ───────────────────────────── INDEX.md §1 ─────────────────────────────
# V10's row: Find's clerk content is C4's (VV910-r2-07).
E(IDX, HIDX1,
  "C3's Find content at M5's exit",
  "C4's Find content (the find form and read) at M5's exit",
  'VV910-r2-07')

# ───────────────────────────── J-A120.01 restated (VCS-r2-01) ─────────────────────────────
ROW('J-ROWS', DOC, 'J-A120.01',
    "— built at M5 with volume 1's area and gap services, its base parts widening the O12 line by 0.5–1 pw |",
    "— built at M5 with volume 1's area and gap services, its base parts priced by absorption into the O11 and O12 lines "
    "(its overlay provider and panel volume 9's AP11; J-A568.05) |",
    'VCS-r2-01')
ROW('RATIONALE-A', RAT, 'J-A120.01',
    "widen the O12 line by an itemised 0.5–1 pw (PLAUSIBLE) under §16's rule (§13.2, §13.8, §16). |",
    "are priced by absorption into the O11 and O12 lines whose mechanisms they extend, its overlay provider and panel "
    "being volume 9's AP11 (J-A568.05) (§13.2, §13.8, §16). |",
    'VCS-r2-01')
