# edits.py — the edits of lane coherence/repair-scope-r5, read by gen.py (exec). Each E(path, head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head` (the live set is assemble-r4's
# output). Ids name the issue or END line each edit closes (adjudication-r5 Part H · scope).

# ───────────────────────────── §13.1 ─────────────────────────────
# The reverse of the village → town fold: a growth at a change of frame law that grows the frame and keeps the arena,
# (a) and (c) only (VKr4-02; one fix with kernel's VKr4-01 at §3.2 (9)).
E(DOC, H131,
  """   its peak (frame and arena kept, nothing runs, no chain stripped; §3.2 (9)) —, and a village → town fold (the frame
   kept, the arena by the new law's margin, neither shrinking; §3.2 (9)); a part-0 warp under a raised way (its feet
   held, §3.6); a raised way crossing part-0 ways (no junction, the two parts sharing no topology; §3.4, §3.10).""",
  """   its peak (frame and arena kept, nothing runs, no chain stripped; §3.2 (9)) —, a village → town fold (the frame kept,
   the arena by the new law's margin, neither shrinking; §3.2 (9)), and the reverse — a TOWN made at 9 000 people handed
   down to the village product, falling below 400 and re-crossing it (the frame grown to the territory law's 3 373 m
   square, the arena kept at 4 293 m: (a) and (c) only, `Plat.frame` the new frame as (c) commits, its `marginShare` the
   kept arena's share; the hand-off up at 1 575 then growing the arena by (b) to 5 397 m; §3.2 (9)); a part-0 warp under
   a raised way (its feet held, §3.6); a raised way crossing part-0 ways (no junction, the two parts sharing no topology;
   §3.4, §3.10).""",
  'VKr4-02')

# ───────────────────────────── §13.8 ─────────────────────────────
# T114-3's regrowth clause scheduled on volume 6's engine (VAP-r4-01).
E(DOC, H138,
  "| the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause, T114-3's landfall clause on volume 5's landfall fixture;",
  "| the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause and T114-3's regrowth clause on volume 6's engine, T114-3's landfall clause on volume 5's landfall fixture;",
  'VAP-r4-01')
# Sweep (R5-01 (2)): T110-2's (4) now holds an epoch contraction beside its circuits; the row's list of (4)'s and (5)'s
# epoch clauses names it, so every epoch clause of (4) has its schedule (VM-R4T-02's FIX per R5-02 (S1)).
E(DOC, H138,
  "and (4)'s and (5)'s circuits, stage growth and route re-solve —",
  "and (4)'s and (5)'s circuits, contraction, stage growth and route re-solve —",
  'VM-R4T-02')

# ───────────────────────────── §14 ─────────────────────────────
# Box among the shared view types @plat/model declares (VRC4T-05): the package line, the dependency rule, the type index.
E(DOC, H14,
  "the shared view vocabulary `LodBand`, `Role`, `ZoomStop` and the label-row tables",
  "the shared view vocabulary `LodBand`, `Box`, `Role`, `ZoomStop` and the label-row tables",
  'VRC4T-05')
E(DOC, H14,
  "the types both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`)",
  "the types both use (`LodBand`, `Box`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`)",
  'VRC4T-05')
E(DOC, H14,
  "// @plat/model — LabelEntity, QuarterNode: §9.1; LodBand, Role, ZoomStop, LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8;",
  "// @plat/model — LabelEntity, QuarterNode: §9.1; LodBand, Box, Role, ZoomStop, LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8;",
  'VRC4T-05')
# E_OTHER_SETTLEMENT never against a key minted at the document's creation (VDC3-03 per R5-07 (d)): both sites.
E(DOC, H14,
  "/* an absorb whose digest's settlement key differs from the binding's — never for an offer whose `id` fell back (V08 §2.4) */;",
  "/* an absorb whose digest's settlement key differs from the binding's — never for an offer whose `id` fell back, nor against a settlement key minted at the document's creation (`settlement:map:<mapId>`), which a later readable `id` is not checked against (§7.7 item 12; V08 §2.4) */;",
  'VDC3-03')
E(DOC, H14,
  """   A digest whose population lies outside the ladder is refused as `creation` refuses it (item 3), a digest of another
   settlement `E_OTHER_SETTLEMENT` (never for an offer whose `id` fell back, V08 §2.4), and nothing is absorbed (§1.1; J-A81.01).""",
  """   A digest whose population lies outside the ladder is refused as `creation` refuses it (item 3), a digest of another
   settlement `E_OTHER_SETTLEMENT` (never for an offer whose `id` fell back, nor against a key minted at the document's
   creation, which a later readable `id` is not checked against; §7.7 item 12, V08 §2.4), and nothing is absorbed (§1.1;
   J-A81.01).""",
  'VDC3-03')
# field_fallback's "empty" as V08 §3.5 defines it — an empty list is a value (VAH-r4-04 per R5-07 (d)).
E(DOC, H14,
  "/* item 125 (b): a field the port reads that the dossier lacks, leaves empty or gives unreadable, its fallback taken — at an absorb the carried fact standing (V08 §2.4, V08 §3.5) */",
  "/* item 125 (b): a field the port reads that the dossier lacks, leaves empty or gives unreadable (V08 §3.5: its path absent or its value of no form its row reads; an empty list is a value, compared as read), its fallback taken — at an absorb the carried fact standing (V08 §2.4, V08 §3.5) */",
  'VAH-r4-04')
# select's two refusals split by the required keys, in V08 §2.4's terms (VAH-r4-03 per R5-07 (d)).
E(DOC, H14,
  """   `ignored_key` note. A shape no adapter recognises is refused `E_UNKNOWN_SHAPE` (a hand-made teaching file among them),
   a line no adapter serves `E_LINE_UNSUPPORTED`.""",
  """   `ignored_key` note. `select` refuses a dossier that lacks a required key of every registered adapter — no dossier of
   any registered line, a hand-made teaching file among them — `E_UNKNOWN_SHAPE`, and one that holds every required key
   of a line but no registered adapter accepts `E_LINE_UNSUPPORTED` (V08 §2.4).""",
  'VAH-r4-03')

# ───────────────────────────── §16 ─────────────────────────────
# The disaster look's units, with the village rungs' units and their milestone (VAF-R4T-04).
E(DOC, H16,
  "the `disaster` look's districts (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10),",
  "the `disaster` look's units (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10) — at the village rungs volume 7's `villageDisasterUnits` and `villageUnitPlots`, V-M3 (V07 §5.6 (8)) —,",
  'VAF-R4T-04')

# ───────────────────────────── §13.2 ─────────────────────────────
import textwrap as _tw

_NB = '⁣'   # placeholder for a space that must not break (inside a code span, "p ÷ 2"); restored after wrapping


def _wrap(text, first_prefix, indent='    ', width=120):
    """Wrap `text` after `first_prefix` (the live head of its first line), lines indented by `indent`; never breaks at a
    hyphen or inside a code span; asserts no wrapped line opens a Markdown list, heading, quote or table."""
    def protect(s):
        out, code = [], False
        for ch in s:
            if ch == '`':
                code = not code
            out.append(_NB if (code and ch == ' ') else ch)
        s = ''.join(out)
        for op in ('÷', '+', '=', '×'):                       # a spaced operator stays with both operands
            s = s.replace(' ' + op + ' ', _NB + op + _NB)
        s = __import__('re').sub(r'(V\d\d|stage) (§|\d)', lambda m: m.group(1) + _NB + m.group(2), s)
        return __import__('re').sub(r'(§[\d.]+) (\()', lambda m: m.group(1) + _NB + m.group(2), s)
    body = protect(first_prefix + text)
    lines = _tw.wrap(body, width=width, initial_indent=indent, subsequent_indent=indent,
                     break_on_hyphens=False, break_long_words=False)
    for l in lines[1:]:
        s = l.strip()
        assert not __import__('re').match(r'([-*+] |\d+[.)] |#|\||>)', s), s
    return '\n'.join(lines).replace(_NB, ' ')


# T110-2's later-work clauses: R5-02's (S1) text whole — a raised way held from its creation, a wall laid after it running
# on beneath its deck; (6) the locked Re-derive (VM-R4T-02's FIX per R5-02, amended). The same text writes the END lines
# of VEW-r4-01, VEW-r4-03, VM-R4T-01 (with VPC-R4-01), VDC4-03 and VDC4-04 ((3)'s quay and way-corridor fixtures, (4)'s
# one-span viaduct, contraction beside an older station and hand delete, (5)'s wide road).
_S1 = ("later work across a raised way, held from its creation (§2.7's support step (6)): a CITY c14 fixture whose S4 "
       "viaduct over a valley is crossed by stage 2's moated ring — the ring running on beneath the deck, each support, ramp "
       "or stair in its band taken into the line, no crossing station and no gate on the deck, the arterial on the deck "
       "pinning no gate and S5b's count read on ground part 0, the setback, glacis and berm stopped at the under-deck strip's "
       "edges and the channel passing beneath only where it meets no support, ramp, stair or foot, every station, key and "
       "span as S4's commit laid them; (1) a CITY c15 town with `moat: 'all'` whose S4 timber viaduct is crossed by stage "
       "2's ring at the widest moat row — the channel stopped at the under-deck strip's edges, no support in water, "
       "`W_RAISED_CROSSING` reported; (2) a stage-2 S5b viaduct crossed by stage 2's own moated ring, and a stage-2 ring "
       "whose boundary falls on an S4 viaduct's ramp at a valley rim — the ramp taken into the line, no ramp, stair or foot "
       "in a strip or the channel; (3) on the CITY and METROPOLIS fixtures, 0 piers in a setback, glacis, berm, moat, gate "
       "plaza, quay's corridor, pier, mole or a way's corridor — among them a CITY masonry viaduct across a `quay`-banked "
       "river at its clear-span bound (both bank stations behind the quays' corridors, each quay one connected way passing "
       "under its span) and a CITY S4 timber viaduct crossed by a `through` S5b road and an S5c street, each crossing under "
       "a span clear of its supports; (4) an epoch circuit across a standing aqueduct and one across a standing timber "
       "elevated road, a hand `drawWall` across a standing aqueduct and one across a declared one-span masonry viaduct, and "
       "an epoch contraction meeting an aqueduct within p ÷ 2 of an older ring's crossing station, each run again with the "
       "raised way locked — the stretch on its course beneath the deck, each support, ramp, stair, foot or `vault` span in "
       "its band taken into the line, an ordinary run beneath every other span topped at its soffit, no gate or tower in the "
       "under-deck strip, its setback, glacis and berm stopped at the under-deck strip's edges and its channel beneath only "
       "where it meets none of these, the older ring's crossing station untouched, every station, key, span and state of "
       "the raised way unchanged, the hand case naming `bend.wall.raisedCrossing`; and a hand `delete` of a wall whose "
       "raised gate carries a standing viaduct's deck — every other run dismantled, the gate tower kept carrying the deck, "
       "`bend.wall.held`; (5) an H-AQUA epoch growing a stage over a standing aqueduct's land, an epoch route re-solved "
       "under a viaduct, a hand road drawn across one and a hand road wider than every `open` span's clear width drawn "
       "across one — 0 way corridors over a support ring, ramp, stair, foot or `vault` span, every crossing under a span "
       "§4.3 admits (`bend.raised.underSpan`; the wide road routed round the raised way, `bend.raised.around`); (6) a "
       "Re-derive from S4 of (1)'s c15 fixture with its S4 timber viaduct locked — stage 2's ring and moat meeting it as in "
       "(1), no station moved, added or omitted and no key minted, 0 S5b or S5c way corridors over a support ring, ramp, "
       "stair or foot;")
_s1_ref = open(os.path.join(W, 's1.txt'), encoding='utf-8').read()
assert _S1 == _s1_ref, 'the (S1) text differs from R5-02 (S1) as extracted'
_T110_HEAD = "or moat, and every clear span on either side of the station within its bound; "
E(DOC, H132,
  """    or moat, and every clear span on either side of the station within its bound; later work across a raised way (§2.7's
    support step (6)): a CITY c14 fixture whose S4 viaduct over a valley is crossed at a gate by stage 2's moated ring —
    the crossing's one station on the trace, 0 piers in a setback, glacis, berm or moat, the raised way kept (§2.7's
    support step (6) (a)); (1) a CITY c15 town with `moat: 'all'` whose S4 timber viaduct is crossed by stage 2's ring at
    the widest moat row — the berm and channel stopped at the under-deck strip, every clear span within 20 m, no support
    in water, the viaduct kept, `W_RAISED_CROSSING` reported; (2) a stage-2 S5b viaduct crossed by stage 2's own moated
    ring, and a stage-2 ring whose lattice boundary falls on an S4 viaduct's ramp at a valley rim — the crossing station
    on the deck at its level, no ramp, stair or foot in a strip or the channel; (3) after generation's last support run,
    0 piers in a setback, glacis, berm, moat, gate plaza, quay, pier or mole on the CITY and METROPOLIS fixtures; (4) an
    epoch circuit across a standing aqueduct and one across a standing timber elevated road, and a hand `drawWall`
    across a standing aqueduct, each run again with the raised way locked — the trace through one station on the deck at
    its level, its strips stopped where a support stands in them, every station, key, span and state of the raised way
    unchanged but the crossing station's support, the hand case naming `bend.wall.raisedCrossing` (§2.7's support step
    (6) (b)); (5) an H-AQUA epoch growing a stage over a standing aqueduct's land, an epoch route re-solved under a
    viaduct and a hand road drawn across one — 0 way corridors over a support ring, ramp, stair, foot or `vault` span,
    every crossing under an `open` span (`bend.raised.underSpan` for the hand road; §4.3);""",
  _wrap(_S1, _T110_HEAD),
  'VM-R4T-02', 'END VEW-r4-01', 'END VEW-r4-03', 'END VM-R4T-01', 'END VPC-R4-01', 'END VDC4-03', 'END VDC4-04')

# T110-2's frame-growth clause keeps the old deck's stations (END of VV34-r4-01; §2.7's support step (7)).
E(DOC, H132,
  """    at every stage end of the epoch, no part-0 vertex left with a row and no edge, and after §4.11 both ends of its
    ring-end foot on the new rings (§2.7 `RaisedFoot`, §3.2 (9)) —, a declared course drawn beyond the frame bent to the
    ring; the support step's obstacles and bounds (§2.7): a""",
  """    at every stage end of the epoch, no part-0 vertex left with a row and no edge, and after §4.11 both ends of its
    ring-end foot on the new rings (§2.7 `RaisedFoot`, §3.2 (9)) and every station of the old deck at its key, position
    and ring after the growth (§2.7's support step (7)) —, a declared course drawn beyond the frame bent to the ring; the
    support step's obstacles and bounds (§2.7): a""",
  'END VV34-r4-01')

# T114-3's regrowth clause: a crossing station whose stretch the curtain's absorption dismantled, regrown by `repairWall`'s
# bend before the spans (VAP-r4-01; R5-02 (3)'s release and regrowth stand).
_REGROWTH = ("its regrowth clause: on a CITY fixture whose aqueduct crosses the ring at a crossing station, both spans beside the "
             "station toppled (as T-V6-11's second run), then the curtain absorbed (`absorbWall`, the stretch `dismantled`), "
             "then the aqueduct repaired — by a hand `repairRaised` and, on a second run, by V06 §3.19.2 (5) at the first "
             "epoch its reason is live — the stretch re-laid on its line by `repairWall`'s bend in the same batch before the "
             "spans (item 114's patch material), never a deck over a gap at any commit, and the hand repair's undo restoring "
             "the gap and both fallen spans;")
E(DOC, H132,
  """    landfall clause, on volume 5's landfall (V05 §3.16): a landfall over a raised gate, then the deck's repair — the
    stretch repaired with the deck, never a deck on a breached run; (T114-4) recovery replaces patches oldest first, by
    the week of each run's last-change epoch (`EpochRecord.inputs.week` of its `conditionEpoch`; generation's epoch 0
    first, every replay epoch's week before every live one's — §6.1, V06 §3.7.7 (3)), never the epoch's number (volume
    12's spec `T114g.oldestFirst`); (T114-5) no run changes its condition without a driver sustained over its""",
  _wrap("landfall clause, on volume 5's landfall (V05 §3.16): a landfall over a raised gate, then the deck's repair — the "
        "stretch repaired with the deck, never a deck on a breached run; " + _REGROWTH + " (T114-4) recovery replaces "
        "patches oldest first, by the week of each run's last-change epoch (`EpochRecord.inputs.week` of its "
        "`conditionEpoch`; generation's epoch 0 first, every replay epoch's week before every live one's — §6.1, V06 "
        "§3.7.7 (3)), never the epoch's number (volume 12's spec `T114g.oldestFirst`); (T114-5) no run changes its "
        "condition without a driver sustained over its", ''),
  'VAP-r4-01')

# T76-1: the late calamity's trigger in §4.11 The clock (4)'s amended words (sweep, R5-01 (2) over R5-03), and its
# late-change fixtures (END of VAT4-r4-01, VPC-R4-02 merged; R5-03).
E(DOC, H132,
  """    an epoch folds at each 52-week boundary, at a population move past the roster tolerance and at the week of each
    newly carried calamity no other epoch falls on (one dated at or before the last epoch's week folding none at its own
    week: it rides the absorb's first epoch, §4.11 *The clock* (4)), none on a 2 % drift, with `years` = Δweeks ÷ 52 — on
    fixtures adding a calamity carried at a mid-year week with no population crossing (one epoch at its week, the
    calamity in its `EpochInputs.events`), one at a week-52 boundary (no second epoch), one inside a coarsened catch-up
    (riding the coarse epoch that holds its week, V06 §6.8 (6); from M6-E) and a calamity carried one year late, riding
    the absorb's first epoch, its event at that epoch's first week —; its per-year clause (from M4, with the epochs) — per-year rates give equal expected firings
    under a weekly and a decade cadence.""",
  _wrap("an epoch folds at each 52-week boundary, at a population move past the roster tolerance and at the week of each "
        "newly carried calamity no other epoch falls on (one dated at or before the last epoch's week folding none at its "
        "own week: it rides, at that epoch's first week, the first epoch its absorb folds where the absorb's week is after "
        "the last epoch's (one folded at the absorb's week where no other is), else the first a later absorb folds, held "
        "meanwhile in `DossierBinding.lateCalamities`; §4.11 *The clock* (4)), none on a 2 % drift, with `years` = Δweeks "
        "÷ 52 — on fixtures adding a calamity carried at a mid-year week with no population crossing (one epoch at its "
        "week, the calamity in its `EpochInputs.events`), one at a week-52 boundary (no second epoch), one inside a "
        "coarsened catch-up (riding the coarse epoch that holds its week, V06 §6.8 (6); from M6-E), a calamity carried "
        "one year late, riding the absorb's first epoch, its event at that epoch's first week, and one carried by a "
        "second absorb in the last epoch's own week — no epoch, its targets applied, the calamity riding the next "
        "absorb's first epoch at that epoch's first week, its deaths in that epoch's burial need; and a late "
        "non-calamity change in an absorb whose week is after the last epoch's — folded at the last epoch's week + 1, "
        "the document's current week never before it —; its per-year clause (from M4, with the epochs) — per-year rates "
        "give equal expected firings under a weekly and a decade cadence.", ''),
  'END VAT4-r4-01', 'END VPC-R4-02')

# T121-3: the reference viewport, §12.5's term (VCS-r4-01; VRC4T-06 merged).
E(DOC, H132,
  "over §12.5's reference views (`resolution.p95`)",
  "over §12.5's reference viewports (`resolution.p95`)",
  'VCS-r4-01', 'VRC4T-06')
