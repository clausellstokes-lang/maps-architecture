# edits.py — the edits of lane coherence/repair-scope-r4, read by gen.py (exec). Each E(path, head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head` (the live set is assemble-r3's
# output). Ids name the issue or END line each edit closes (adjudication-r4 Part H · scope).

# ───────────────────────────── §0.2 ─────────────────────────────
# Item 122's units: volume 4's look below ground (VAP-r3-09).
E(DOC, H02,
  "built at M3b, the dossier's reading at M-SF; volumes 1, 2, 3, 6, 7, 8, 9, 10, 11 and 12 | §10.2 |",
  "built at M3b, the dossier's reading at M-SF; volumes 1, 2, 3, 4, 6, 7, 8, 9, 10, 11 and 12 | §10.2 |",
  'VAP-r3-09')

# ───────────────────────────── §13.1 ─────────────────────────────
# A frame growth whose law moves a side out by at most attractCm (VKr3-03; one fix with kernel's VKr3-02 at §3.2 (9)).
E(DOC, H131,
  """a frame growth whose frame and arena would be no larger (nothing runs) and a village → town fold (the frame
   kept,""",
  """a frame growth whose frame and arena would be no larger (nothing runs), and one whose law would move a side
   out by at most `attractCm` — a CITY frame kept through a decline below 10 000 people, re-crossing two people above
   its peak (frame and arena kept, nothing runs, no chain stripped; §3.2 (9)) —, and a village → town fold (the frame
   kept,""",
  'VKr3-03')

# ───────────────────────────── §13.2 ─────────────────────────────
# T76-1's cadence clause: the calamity trigger, and a calamity carried late riding the absorb's first epoch
# (VPC-R3-01 per R4-08; the coarsened catch-up's fixture with M6-E, JUDGMENT 2).
E(DOC, H132,
  """    an epoch folds at each 52-week boundary and at a population move past the roster tolerance, none on a 2 % drift, with
    `years` = Δweeks ÷ 52 —; its per-year clause""",
  """    an epoch folds at each 52-week boundary, at a population move past the roster tolerance and at the week of each
    newly carried calamity no other epoch falls on (one dated at or before the last epoch's week folding none at its own
    week: it rides the absorb's first epoch, §4.11 *The clock* (4)), none on a 2 % drift, with `years` = Δweeks ÷ 52 — on
    fixtures adding a calamity carried at a mid-year week with no population crossing (one epoch at its week, the
    calamity in its `EpochInputs.events`), one at a week-52 boundary (no second epoch), one inside a coarsened catch-up
    (riding the coarse epoch that holds its week, V06 §6.8 (6); from M6-E) and a calamity carried one year late, riding
    the absorb's first epoch, its event at that epoch's first week —; its per-year clause""",
  'VPC-R3-01', 'R4-08')

# T110-2: later work across a raised way — R4-09's fixtures (1)–(5) (VM-R3T-05 per R4-09, amended; they carry VEW-r3-01's,
# VEW-r3-03's, VEW-r3-05's and VM-R3T-06's fixtures). The round-3 epoch circuit across a standing aqueduct joins (4).
E(DOC, H132,
  """    or moat, and every clear span on either side of the station within its bound; a CITY c14 fixture whose S4 viaduct over a
    valley is crossed at a gate by stage 2's moated ring, and an epoch circuit across a standing aqueduct — each
    crossing's one station on the trace, 0 piers in a setback, glacis, berm or moat, the raised way kept (§2.7's support
    step (6)); (T110-3)""",
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
    every crossing under an `open` span (`bend.raised.underSpan` for the hand road; §4.3); (T110-3)""",
  'VM-R3T-05', 'R4-09')

# The T110 group's runs sentence (VCS-r3-06 per R4-09, amended).
E(DOC, H132,
  """    volume 2's T-V2-50, volume 6's T-V6-65, volume 7's village pin and volume 11's T-V11-31 register theirs on the same
    engine).""",
  """    volume 2's T-V2-50, volume 6's T-V6-65, volume 7's village pin and volume 11's T-V11-31 register theirs on the same
    engine). Volume 6 runs T110-2's epoch clauses (4) and (5) on its engine (T-V6-47).""",
  'VCS-r3-06', 'R4-09')

# Item 113's runs list: T113-7's pin at T-V12-46 (VCS-r3-01).
E(DOC, H132,
  """(T-V8-51), volume 11 T113-7's registration (T-V11-39), volume 12 their register lines and the replay's budget
    (T-V12-46).""",
  """(T-V8-51), volume 11 T113-7's registration (T-V11-39), volume 12 their register lines, T113-7's pin and the
    replay's budget (T-V12-46).""",
  'VCS-r3-01')

# T114-3: the crossing station whose spans have both fallen, and the landfall over a raised gate then the deck's repair
# (END of VEW-r3-04; R4-09); T114-4: the order by the week of the last-change epoch (VAT3-r3-03).
E(DOC, H132,
  """    while its deck stands (§2.7's support step (3)), every other stretch decaying as the first clause states; (T114-4) recovery replaces patches oldest first, by each run's epoch of last change
    (volume 12's spec `T114g.oldestFirst`); (T114-5)""",
  """    while its deck stands (§2.7's support step (3)), every other stretch decaying as the first clause states, and a
    crossing station whose spans have both fallen keeps its stretch as a wall run, never dismantled as a support; its
    landfall clause, on volume 5's landfall (V05 §3.16): a landfall over a raised gate, then the deck's repair — the
    stretch repaired with the deck, never a deck on a breached run; (T114-4) recovery replaces patches oldest first, by
    the week of each run's last-change epoch (`EpochRecord.inputs.week` of its `conditionEpoch`; generation's epoch 0
    first, every replay epoch's week before every live one's — §6.1, V06 §3.7.7 (3)), never the epoch's number (volume
    12's spec `T114g.oldestFirst`); (T114-5)""",
  'END VEW-r3-04', 'VAT3-r3-03')

# Item 114's runs list: T114-4's replay case (VAT3-r3-03) and T114-3's landfall clause on volume 5 (END of VEW-r3-04).
E(DOC, H132,
  """each kind in B-EDIT. Volume 6 runs T114-1 – T114-5, T114-8's and T114-10's epoch clauses on its engine (T-V6-73), volume 7 the
    palisade's (T-V7-62)""",
  """each kind in B-EDIT. Volume 6 runs T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses
    on its engine, T114-4's replay case on its history-first fixture (T-V6-73), volume 5 T114-3's landfall clause on its
    landfall fixture (T-V5-14), volume 7 the palisade's (T-V7-62)""",
  'VAT3-r3-03', 'END VEW-r3-04')

# T121-2: a change lands while the view is settled (VRC3T-03 per R4-10).
E(DOC, H132,
  """    pan, zoom or drag is in progress — a change lands only at §8.8's settle — and on a fixture loaded at its threshold at""",
  """    pan, zoom or drag is in progress — a change lands only while the view is settled (§8.8): at once when no gesture
    runs, at the gesture's settle otherwise — and on a fixture loaded at its threshold at""",
  'VRC3T-03', 'R4-10')

# T122-2: no key withholds a look-bearing condition (END of R4-11).
E(DOC, H132,
  """`untilWeek`), or from `sinceWeek` on while an overlay with no `untilWeek` stands (§2.7) — and never for a condition
    the viewer's key withholds (DR44's admission) (`crisis.weeks` 0);""",
  """`untilWeek`), or from `sinceWeek` on while an overlay with no `untilWeek` stands (§2.7) — at every key for a
    look-bearing condition (`public`, DR44) and for no `none`-row one (`crisis.weeks` 0);""",
  'END R4-11')

# T122-6: the carriageway's barrier and both statistics (VCS-r3-08 per R4-06; VV1112-r3-08).
E(DOC, H132,
  """(T122-6) nothing stands on water, in a gate's passage or over a label's keep-out,
    and several crises share the outskirts by `priority` under `densityCap` (§10.2's placement; `crisis.blocked` 0);""",
  """(T122-6) nothing stands on water, in a gate's passage or over a label's keep-out,
    and on a way's carriageway only a barrier across it (§10.2 (d)), and several crises share the outskirts by
    `priority` under `densityCap` (§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0);""",
  'VCS-r3-08', 'VV1112-r3-08', 'R4-06')

# Item 122's runs list: volume 4's look below ground (VAP-r3-09).
E(DOC, H132,
  """    T122-1 and T122-7's registration (T-V2-60), volume 8's forces (T-V8-60) and volume 10's explanations (T-V10-52) test""",
  """    T122-1 and T122-7's registration (T-V2-60), volume 4's look below ground (T-V4-82 (i)), volume 8's forces (T-V8-60)
    and volume 10's explanations (T-V10-52) test""",
  'VAP-r3-09')

# T124-9: the timeline's inputs and fixtures, one wording with §6.1 *The weather stream* (VDC3-10).
E(DOC, H132,
  """(T124-9) the timeline
    replays from its session seed and clock (§6.1's `view.weather`, never a model stream; `weather.replay` 0).""",
  """(T124-9) the timeline
    replays from its session seed, clock and presses with the climate row, year position, sites, `light` mode and view
    hour in force at each moment (§6.1 *The weather stream*) — a year-position change from a week with no live kind into
    a live one and back, a press at a moment with no live kind and a view hour crossing a kind's `hours` among its
    fixtures (§6.1's `view.weather`, never a model stream; `weather.replay` 0).""",
  'VDC3-10')

# The take-over table's evolution row: T110-2's epoch clauses (4) and (5) (VCS-r3-06 per R4-09, amended); T114-3's
# landfall clause on the sky row (END of VEW-r3-04).
E(DOC, H132,
  """T108-4 over epochs (T-V6-45), T111-1 – T111-5's epoch form (T-V6-72), T113-1 – T113-3, T113-6, T113-7 (T-V6-71), T114-1 – T114-5, T114-8's and T114-10's epoch clauses (T-V6-73),""",
  """T108-4 over epochs (T-V6-45), T110-2's epoch clauses (4) and (5) (T-V6-47), T111-1 – T111-5's epoch form (T-V6-72), T113-1 – T113-3, T113-6, T113-7 (T-V6-71), T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses (T-V6-73),""",
  'VCS-r3-06', 'R4-09', 'END VEW-r3-04')

E(DOC, H132,
  """| T10-1, T13-1, T15-1, T102-2, T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35),""",
  """| T10-1, T13-1, T15-1, T102-2, T114-3's landfall clause (T-V5-14), T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35),""",
  'END VEW-r3-04')

# The take-over table's calibration row (VCS-r3-01).
E(DOC, H132,
  """T113-2 and T113-5's registration (T-V12-46); T114-4 – T114-7 (T-V12-47);""",
  """T113-2, T113-5's registration and T113-7's pin (T-V12-46); T114-4 – T114-8 (T-V12-47);""",
  'VCS-r3-01')
E(DOC, H132,
  """T117-2 and T118-2 – T118-6 (T-V12-49);""",
  """T117-1, T117-2, T117-4, T117-5, T117-7 and T118-1 – T118-6 (T-V12-49);""",
  'VCS-r3-01')

# ───────────────────────────── §13.8 ─────────────────────────────
# T76-1's coarsened catch-up fixture with M6-E (JUDGMENT 2).
E(DOC, H138,
  """| T75-1 – T75-5, T76-1's cadence clauses, T81-2's absorb clause, T85-3 | nightly (the absorb pairs) | M3a |""",
  """| T75-1 – T75-5, T76-1's cadence clauses, T81-2's absorb clause, T85-3 | nightly (the absorb pairs) | M3a (T76-1's coarsened catch-up fixture with M6-E) |""",
  'VPC-R3-01')

# T110-2's epoch clauses (4) and (5) on volume 6's engine (VM-R3T-05, VCS-r3-06 per R4-09; the sweep).
E(DOC, H138,
  """M3a (T110-2's epoch clauses — the frame growth and the circuit across a standing aqueduct — from M4 on the hook fixtures, the circuit on volume 6's engine with M6-E's E3) |""",
  """M3a (T110-2's epoch clauses — the frame growth, and (4)'s and (5)'s circuits, stage growth and route re-solve — from M4 on the hook fixtures, those of (4) and (5) on volume 6's engine with M6-E's E2 and E3) |""",
  'VM-R3T-05', 'VCS-r3-06', 'R4-09')

# T114-1 – T114-5: H-AQUA's epochs for T114-3's crossing clause (END of VAP-r3-06) and its landfall clause with M6-sky
# (END of VEW-r3-04).
E(DOC, H138,
  """| T114-1 – T114-5, T114-8's epoch clause | the milestone tier over H-100's epochs; T114-4's and T114-5's step scripts nightly on the wall fixtures (V12 §6) | M6-E (with V06's E3) |""",
  """| T114-1 – T114-5, T114-8's epoch clause | the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause, T114-3's landfall clause on volume 5's landfall fixture; T114-4's and T114-5's step scripts nightly on the wall fixtures (V12 §6) | M6-E (with V06's E3; T114-3's landfall clause with M6-sky) |""",
  'END VAP-r3-06', 'END VEW-r3-04')

# ───────────────────────────── §14 ─────────────────────────────
# E_OTHER_SETTLEMENT never for an offer whose id fell back (END of VDC3-03; R4-15 (c)); the item-4 restatement (sweep).
E(DOC, H14,
  """'E_OTHER_SETTLEMENT' /* an absorb whose digest's settlement key differs from the binding's */;""",
  """'E_OTHER_SETTLEMENT' /* an absorb whose digest's settlement key differs from the binding's — never for an offer whose `id` fell back (V08 §2.4) */;""",
  'END VDC3-03', 'R4-15')

# PortNote.kind: field_fallback's reach and line_differs (VV78-r3-05 per R4-15 (a), (c)).
E(DOC, H14,
  """|'frozen_fact_changed'|'history_gap'|'field_fallback' /* item 125 (b): a field the port reads that the dossier lacks or leaves empty, its fallback taken (V08 §2.4) */;""",
  """|'frozen_fact_changed'|'history_gap'|'field_fallback' /* item 125 (b): a field the port reads that the dossier lacks, leaves empty or gives unreadable, its fallback taken — at an absorb the carried fact standing (V08 §2.4, V08 §3.5) */
    |'line_differs' /* item 125 (e): `HostContext.line` names a registered, accepting line the dossier's own selection did not take (V08 §2.4) */;""",
  'VV78-r3-05', 'R4-15')

# DossierDigest.settlement: the key's and the seed's fallbacks (VV78-r3-05 per R4-15 (c)).
E(DOC, H14,
  """key: string /* `settlement:<id>`, the dossier's own id (§7.7 item 12) */;""",
  """key: string /* `settlement:<id>`, the dossier's own id, else V08 §2.4's `id` fallback (§7.7 item 12) */;""",
  'VV78-r3-05')
E(DOC, H14,
  """seed: Seed /* H32("plat:sf-seed" ‖ the dossier's seed): derived, never the host's seed (below) */;""",
  """seed: Seed /* H32("plat:sf-seed" ‖ the dossier's seed, else ‖ the settlement key — V08 §2.4's `_seed` row): derived, never the host's seed (below) */;""",
  'VV78-r3-05')

# Port item 2's ONE-WAY SEED (VV78-r3-05).
E(DOC, H14,
  """   `settlement.seed = H32("plat:sf-seed" ‖ the dossier's seed)` (§13.6's `H32`, from `@plat/model`), written into the""",
  """   `settlement.seed = H32("plat:sf-seed" ‖ the dossier's seed)` — an empty or unreadable seed read as the settlement key
   (V08 §2.4) — (§13.6's `H32`, from `@plat/model`), written into the""",
  'VV78-r3-05')

# Port item 4's refusal of another settlement (the R4-15 (c) sweep).
E(DOC, H14,
  """a digest of another
   settlement `E_OTHER_SETTLEMENT`, and nothing is absorbed""",
  """a digest of another
   settlement `E_OTHER_SETTLEMENT` (never for an offer whose `id` fell back, V08 §2.4), and nothing is absorbed""",
  'END VDC3-03', 'R4-15')

# ───────────────────────────── §16 ─────────────────────────────
# M6-U: item 123's damage below ground at the later of U5 and V03's P4 (VV34-r3-04).
E(DOC, H16,
  """item 123's damage below ground at U5 |""",
  """item 123's damage below ground at the later of U5 and V03's P4 (V04 §5.6 (6)) |""",
  'VV34-r3-04')
