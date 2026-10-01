# Verify — edge cases and combinations across the physical world, round 5 (coherence/verify-edges-world-r5t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-world-r5t; covered by the
> whole-design retrovalidation (J84).

> PROGRESS (kill-safe ledger)
> - P0 resume check (no output, no LANDED line): fresh start — done
> - P1 brief whole; r4t report and result (4 issues); adjudication-r5 R5-01, R5-02 whole, Part H (scope, model, kernel,
>   pipeline, determinism, rendering, V01–V07, V09, V11); assemble-r5 (live sha256 = its "after" column) — done
> - P2 the 4 round-4 findings re-checked against the live text, with every END line's second end — done (4 of 4 fixed)
> - P3 the round-5 blocks in scope walked whole for new edge problems (diffs against HEAD `3310b538`) — done (5 new)
> - P4 owner items 111–126 (mention counts never fall in any member) and phone census (item 126's own lines only) — done
> - P5 report, result JSON, LANDED — done. Design files untouched.

Members: model, kernel, pipeline, rendering, V01, V02, V03, V04, V05, V07. Design files untouched; this seat writes no
design text.

## Result

**5 issues: 0 blocker, 5 major, 0 minor.** All four round-4 findings are closed: R5-02 replaced the case each one named
(VEW-r4-01, -02, -03 and VEW-r4-04 per R5-02, amended), and every end Part H lists is written. The five new findings
are edges the new rule reaches at its limits:

| id | grade | kind | owner | edge |
|---|---|---|---|---|
| VEW-r5-01 | major | EDGE-UNDEFINED | pipeline | a primary S5b spawns crosses its own stage's boundary on its own viaduct, so the stage has `N_k` − 1 gates |
| VEW-r5-02 | major | EDGE-UNDEFINED | model | a wall run laid after a raised way, then a part it was built against goes (a support cleared or toppled, a `vault` span's chamber collapsed, the raised way removed) |
| VEW-r5-03 | major | EDGE-UNDEFINED | model | a raised way created across a run that is already `breached` or `dismantled`, so its crossing station stands on a fallen wall from its first commit |
| VEW-r5-04 | major | CONFLICT | model | a regeneration with a held raised way: (6)'s closing sentence keeps the crossing station, but (d) and §4.8 give the re-derived stretch no crossing furniture and move its gate |
| VEW-r5-05 | major | EDGE-UNDEFINED | pipeline | a raised gate whose deck is gone (the raised way deleted, or a span beside its station fallen) |

Each is also a CATALOGUE-GAP: `edges.json` holds only the coarse pairs (C-wall-raised, C-raised-history, C-raised-epoch,
C-raised-edit, C-raised-lock), and each finding is a finer case inside one of them.

## Method

* **The round-4 findings.** Each of the four ids in `results/coherence_verify-edges-world-r4t.json` was re-checked at
  every home that its Part H disposition and the R5-02 *Ends* name. Where Part H says "per R5-02" or "amended", the bar
  was R5-02's binding text, not my round-4 wording.
* **The round-5 blocks in scope.** I diffed the base, V01–V07, V09 and V11 against HEAD `3310b538` (the scratch is
  `scratchpad/coherence/edw5/`). I then read whole the changed physical subsections:
  * base: §2.7 (`supports`' comment, `RaisedFoot`, the support step (3), (6) and (7)); §3.2 (9) (a frame growth inside
    a kept arena); §4.1's S7 row; §4.3 *Lattice and costs*, *The slot*, *Where it may not go*; §4.4 S5a *Trace* (2),
    *Outer moats*, S5b; §4.5's casters; §4.8's lead, *Condition at generation*, *Gates*; §4.11's `wallToWay`, carve and
    the frame growth's deck extension; §4.13's raised-way rows; §5.3's gate and crossing rows; §5.4; §7.1's
    `bend.wall.held`, `bend.wall.raisedCrossing` and `bend.raised.underSpan` rows; §7.3's S7 row; §7.4's raised-way row;
    §8.4's casters and heightfield; §11.1's glTF and CityJSON rows; §13.1's frame cases; §13.2's T110-2 and T114-3;
  * volumes: V04 §1b, the arch-vault rows, §3.5.0 *At an epoch*, §3.10, §4.3, T-V4-63 and T-V4-65; V07 §3.5a (1)–(8),
    §3.17's row and T-V7-48; V06 §3.7.6 (5), §3.19 (5), §3.19.2, §3.19.3 (read where a member's edge meets them);
    V01–V03 and V05 (this round's blocks are Find, plan damage and milestones, with no physical edge).
* **The limits.** I crossed the one rule — a raised way held from its creation, a later wall running on beneath its
  deck — with four things: the lifetime of what the wall was built against (decline, topple, landfall, delete); the
  moment of creation (a curtain already decayed); a regeneration (a held raised way standing before S3); and S5b's own
  viaducts. The five findings lie there.
* **Owner items.** I counted every member's mentions of items 111–126 (and their T-ids) before and after the round, and
  no count falls. A phone census (phone, mobile, handset, narrow class, 390 ×, bottom sheet) over the base, V01–V05 and
  V07 finds only item 126's own statements (base l.94, l.265, l.313–314, l.18752, l.20322, l.22953).
* **Peers.** I read the six landed r5t result files first (31 issues), plus the in-progress reports. Findings in this
  lane's ground that peers already carry are cross-referenced, not raised again:
  - VM-R5T-01: §4.8's lead and its echoes say "strips stop" where (6) (d) runs the band on beneath the deck.
  - VM-R5T-02: a crossing station's `state`, ring and repair after its release outside a regeneration.
  - VM-R5T-03: a gate plaza at a raised gate.
  - VAL-R5-01 and VAL-R5-03: the carried-down crossing station on the village palisade, and a hand aqueduct across a
    standing palisade.
  - VAL-R5-02: the arch vault's door under a later wall.
  - VDC5-01 and VDC5-02: the hand carve against §4.3's way rule, untested.
  - VDC5-03: §5.3's count and an elevated road's raised gate.
  - VDC5-04: V06 §3.7.2 (1)'s gate opening on a raised gate.
  - VRC5T-01: "no higher than" against "topped at" the soffit.

  How mine differ:
  - VEW-r5-05 differs from VM-R5T-02: theirs is the station's support; mine is the `Gate` record and the counts once the
    deck is gone.
  - VEW-r5-02 differs from VAL-R5-02: theirs is a door while the vault stands; mine is the wall once the vault or a
    support is gone.
  - VEW-r5-04 differs from VDC5-03 and VDC5-04: theirs are counting and the pathway; mine is a regeneration.
* **No document checks were run** (this seat writes no design text).

## Round-4 findings re-checked (P2)

Live text: each member file equals assemble-r5's "after" sha256: base `2d84eac2…`, V01 `4585e1a5…`, V02 `fb46c676…`, V03
`3fe82c82…`, V04 `b79fd290…`, V05 `171db651…`, V06 `6fb1f641…`, V07 `7747179d…`, V09 `7c91d3bf…`, V11 `b1445a5f…`. The
pre-round text is HEAD `3310b538`, whose files equal assemble-r5's "before" column.

| id | owner | Part H | verdict | where it stands now |
|---|---|---|---|---|
| VEW-r4-01 | model | FIX per R5-02, amended | **fixed** (every end; the case is removed) | §2.7's support step (6) is R5-02's text (l.2580–2623): a later trace takes no station, so no "one-span" or "station taken" case remains. D1 is §7.1's `bend.wall.raisedCrossing` row (l.10631). V06 §3.7.6 (5)'s second bullet is at l.1597–1602. V09 §4.9's row is at l.2100. T110-2 (4) holds the one-span viaduct and the contraction within p ÷ 2 of an older station (l.18493–18500). |
| VEW-r4-02 | model | FIX per R5-02 | **fixed** (every end) | (3)'s palisade parenthesis (l.2548–2549). (6) (d)'s `vault` span ends at its arch mouths (l.2606–2608). §4.13's `wall` cell is P12 (l.9017). V07 §3.5a (4) (l.1604–1615) and §3.17's row (l.2975) are VAL-R4-03's text. T-V7-48's `vault`-span fixture is at l.3681. |
| VEW-r4-03 | model | FIX per R5-02, amended | **fixed** (every end; no last run remains) | (3)'s obstacles read the strip S7 cuts and the quay S7 lays (l.2535–2539). §4.1's S7 row is P3 (l.4952). §4.8's lead is P8 (l.7610–7616). T110-2 (3) carries the quay-banked river at its clear-span bound, each quay one connected way (l.18488–18492). |
| VEW-r4-04 | pipeline | FIX per R5-02, amended | **fixed** (with P6) | §4.4 S5a *Trace* (2) is P4 (l.5855–5858): no pin on a deck, and a pin inside an under-deck strip moves along its arterial. S5b counts `c` on ground part 0 (l.5911) and gives the floor "on ground part 0" (l.5918). |

All four close. V11's two reader cells drop the old re-runs (R5-02's V11 END; V11 l.1006, l.3962), and V04's trigger
lists are R5-02's (V04 l.328, l.372, l.867, l.1341, l.2286, l.2577, l.3007, T-V4-63). One gap sits beside VEW-r4-03's
fix, the strips beside a later trace; peers' VM-R5T-01 carries it, so it is not raised again.

## Round-5 blocks walked (P3): checked and holding

* **The held raised way at generation.** A raised way is created at S4, at a stage's S5b, at S6's end, at an epoch's
  founding or at a hand declaration. It is held from that commit, and (3)'s obstacles read the strips S7 will cut and
  the quays S7 will lay. So a generated course keeps its piers out of S7's parts with no run after S7, and a quay-banked
  river at the clear-span bound is tested.
* **Laid after it.**
  * A way crosses only under a span that §4.3 admits, each kind with its own ladder.
  * A channel passes beneath, or stops at the strip's edges, reported.
  * A face is cut or holed round it.
  * A wall runs on beneath the deck. Its gate or tower moves clear of the under-deck strip, and it is topped at a span's
    soffit (derived at read).
  * Each meeting is reported: `W_RAISED_CROSSING`, `walls.raisedCrossings`, or `bend.wall.raisedCrossing`.
* **A raised arterial at a later boundary.** It pins no gate (S5a *Trace* (2)), and S5b counts only ground crossings.
  The gap is the stage's own S5b viaduct (VEW-r5-01).
* **The held stretch under a crossing station.** It holds through `wallToWay`, `absorbWall`, a hand delete (bent to a
  `dismantle` of the other runs), the hand-off down, S7's generation row, `DeclineOp` and V06's decay. It is released
  from the first epoch after its deck goes. Peers carry the gaps around it (VM-R5T-02, VAL-R5-01, VDC5-04). Its
  creation across a run already fallen is VEW-r5-03.
* **A frame growth.** Inside a kept arena, (b) does not run and `marginShare` is the kept arena's own share (§3.2 (9)).
  An extension keeps the old deck's stations (7), and V04 re-lays only the new spans' vaults (T-V4-63, T-V4-65).
* **A regeneration.** A locked, pinned or declared raised way stands before every stage, and a re-derived stretch on a
  crossing station's line takes the station back. The gate it carries conflicts with (d) (VEW-r5-04).
* **Exports and casters.** A wall run beneath a span is topped at its soffit (§4.5, §8.4, §11.1). Peers' VRC5T-01 covers
  "no higher than" against "topped at". A fallen span is part of VEW-r5-02.
* **V07's village.** The palisade is re-laid at every derivation. A `cleared` support makes no abutment at the next one
  (T-V7-48), so the village side of VEW-r5-02 is defined between derivations by V07 §3.5a (2).

## Issues

### VEW-r5-01 — MAJOR, EDGE-UNDEFINED (CATALOGUE-GAP: C-wall-raised), owner pipeline

**A primary that S5b spawns, crossing its own stage's boundary on its own viaduct, leaves the stage one gate short of
`N_k`.**

The texts involved:
* §4.4 S5b (l.5907–5918) opens: "The stage's primaries match its gates: `N_k` = the gate law". It counts the existing
  arterials' crossings `c` "on ground part 0 (a crossing on a raised deck no gate, S5a *Trace* (2))". When
  `N_k > c`, it spawns `N_k − c` radials, "routes each with the incremental S4 router (§4.3) … and may raise a viaduct by
  §4.3's rules. The crossings become stage k's main gates."
* §4.3 *The slot* places "a viaduct … each later stage's S5b through this router".
* S5a *Trace* (2) pins no gate where "an arterial crossing the boundary on a raised deck" meets it (l.5856–5857).
* (6) (d) makes the stage's ring "laid after" that viaduct: "it takes no crossing station and makes no gate on the
  deck".

So when a spawned radial raises its viaduct across the valley at its own boundary, the stage gets `N_k − 1` gates, and
"primaries match its gates" (S5b) and "Gates — exactly N, by construction" (§4.8, l.7655) fail. S5b spawns once and never
recounts its own primaries, and no rung or report covers the shortfall.

The case is a tested path. T110-2 (2) runs "a stage-2 S5b viaduct crossed by stage 2's own moated ring" (l.18485–18486),
and stage 2's S5b viaducts are its spawned primaries. Its bar checks the ring beneath the deck but no gate count. S5b's
own test ("each epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary") passes with the shortfall, and §5.3's
counts pass too ("so counted"). So one builder ships `N_k − 1` gates, while another spawns a replacement or keeps the
spawned viaduct off the boundary. This is new with R5-02: under R4-09 that crossing became a raised gate.

**Required change.** In §4.4 S5b, after "and may raise a viaduct by §4.3's rules.", add:

> "Its own primaries' crossings are counted as `c` is, on ground part 0: for each spawned primary whose course crosses
> the boundary on a raised deck, ramp or stair (its viaduct's, which the trace runs on beneath; S5a *Trace* (2); §2.7's
> support step (6) (d)), S5b spawns one more by the same nested picks in the same batch, until the stage's crossings on
> ground part 0 reach `N_k` or no approachable gap remains — the shortfall then raised and reported as a request below
> the law is."

S5b's **Test** adds:

> "a stage whose spawned primary is raised across its own boundary still has `N_k` gates on ground part 0."

§4.8 *Gates*: "each outer enceinte's gates are its S5b primaries' crossings" becomes "each outer enceinte's gates are its
S5b primaries' crossings on ground part 0 (§4.4 S5b)".

End at scope: in §13.2 T110-2 (2), after "a stage-2 S5b viaduct crossed by stage 2's own moated ring", add:

> "— stage 2's gates `N_k`, each on ground part 0, the viaduct's deck crossing none and one more primary spawned for it".

### VEW-r5-02 — MAJOR, EDGE-UNDEFINED (CATALOGUE-GAP: C-wall-raised × C-raised-history), owner model

**A wall run laid after a raised way, when a part it was built against goes.**

§2.7's support step (6) (d) (l.2603–2616) builds a later wall run against the raised way:
* "each part of the reservation standing in its band is taken into the line, the run abutting its faces and closed
  against it";
* "at a `vault` span ending at its arch vault's two walled-up arch mouths, the chamber kept whole";
* "beneath every other span … an ordinary run whose top is no higher than that span's soffit (… derived at read …)".

Its readers say the same: V06 §3.7.6 (5), T110-2 (4), V07 §3.5a (4), §8.4 (l.13672–13673, l.13897–13898), and §11.1's
glTF and CityJSON rows (l.15988–15989), "a run beneath a raised way's span topped at its soffit".

Nothing states what the run is once those parts go. Every one of them can go after the run is laid:
* V06 §3.19.2 (3) dismantles a support whose spans have fallen, leaving it `cleared` (l.2925–2931). Only a crossing
  station is spared, and a support a later wall abuts is no station.
* V06 §3.19.2 (4)'s `topple` takes a support.
* A `vault` span's breach collapses its arch-vault chamber "in the same batch" (l.2932–2934). That chamber was the part
  "closing the line" between the run's two ends.
* A span falls `ruined` or `cleared`, so its soffit no longer exists, though §8.4 and §11.1 still cap the run at "a
  raised way's span".
* The raised way is deleted by hand (§7.1 *Delete*), and V04 removes its vaults in the same commit (T-V4-63).

So the wall line is left with a gap — a pier's width, or a whole span's length where a vault stood — or with a run capped
under a deck that no longer exists. Builders would differ: one leaves a gap in the enceinte (its barrier closure broken
with no breach recorded), another closes it, another keeps the cap.

The path is normal in long histories: H-AQUA's epoch circuit runs beneath its standing aqueduct (T-V6-47), and an
aqueduct that runs dry lapses, falls by span and is salvaged (V06 §3.19.2 (2)–(3)). V07 defines the village's own case
only at the next derivation (a `cleared` support makes no abutment, T-V7-48). No bar runs the town case.

**Required change.** In §2.7's support step (6) (d), after "…`bend.wall.raisedCrossing`'s line at a hand edit's dry
run).", add:

> "What such a run is built against is read from the reservation as it stands — a support whose `state` is absent or
> `ruined`, a ramp, stair or foot of a standing raised way, a `vault` span whose `state` is absent with its arch vault —
> and its soffit cap from a span whose `state` is absent, both derived at read, never stored: where a part goes after
> the run was laid — a support `cleared` (V06 §3.19.2 (3)) or toppled (V06 §3.19.2 (4)), a `vault` span breached and its
> chamber collapsed with it, a span `ruined` or `cleared`, the raised way deleted or suppressed — the run stands whole
> across that part's former footprint and to its full height beneath the fallen span, in its own condition and
> material (its trace never left its course), with no gap and no op; its setback, glacis and berm stay as S7 cut them
> until the run is next re-traced (§7.3's S7 row)."

The adjudicator may instead rule the former footprint a `breached` run, provided that the op removing the part is named
as its one writer and the same bar runs it.

Ends:
1. **rendering:** in §8.4's casters and heightfield and in §11.1's glTF and CityJSON rows, "a run beneath a raised way's
   span topped at its soffit" becomes "a run beneath a raised way's standing span (its `state` absent) topped at its
   soffit".
2. **V06:** §3.19.2 (3)'s support and span bullets and (4)'s `topple` add: "a wall run laid after the way and built
   against what falls standing whole across its footprint (§2.7's support step (6) (d))".
3. **scope:** §13.2 T110-2 (4) adds:

   > "and, after its epoch circuit ran beneath the standing aqueduct, that aqueduct lapsed — its `vault` span in the band
   > breached (its chamber collapsing) and a support in the band cleared by V06 §3.19.2 (3) — and, on a second run, the
   > aqueduct deleted by hand: the run whole across each former support and the former vault, at full height beneath each
   > fallen span, the enceinte's closure unchanged and 0 gaps in its band, the delete's undo restoring the abutments and
   > the cap".

### VEW-r5-03 — MAJOR, EDGE-UNDEFINED (CATALOGUE-GAP: C-wall-raised × C-raised-epoch), owner model

**A raised way created across a run that is already `breached` or `dismantled`.**

Since R5-02, a crossing station is made only "where a raised way is created across a standing wall". Its support "is the
band's stretch under the deck", it "carries no `state` of its own — it reads its stretch's `condition`, … `breached` or
`dismantled` a ruined one" (§2.7's support step (3), l.2548–2575). The only rule that keeps a deck off a fallen wall is
the repair's: "a `repairRaised` of a span beside a station whose stretch is `breached` or `dismantled` … first repairs
that stretch by `repairWall` … so no deck stands on a fallen wall". S7's generation row maps a `breached` draw there to
`worn` only because S7 writes conditions after S6's aqueduct.

Nothing covers the creation itself, and several creators reach it:
* V06 §3.19 (5)'s founding passes the course "where the course crosses a standing curtain … through a wall opening … or
  a raised gate … added as S7 furniture in the commit" (V06 l.2824–2826), whatever the run's condition.
* The history replay's founding at generation.
* A hand aqueduct drawn across a gap (§7.1).

Item 114 decays safe, poor or neglected curtains into `breached` and `dismantled` runs (T114-3 runs a neglected CITY over
20 epochs). An aqueduct founded later across such a run gets its crossing station on a fallen support at its first
commit: a deck standing on nothing, with the clear-span bound read across a station that does not stand.

Builders would differ:
* one places the station anyway;
* one reads a gap as no "stretch standing" — (d)'s list names "a dismantled stretch rebuilt on its line" as laid after —
  and raises an ordinary pier, which (3) then slides out of the wall strip;
* one repairs the run first.

**Required change.** In §2.7's support step (3), after "(crossings in order along the deck, each taking the nearest
interior station not yet taken, ties to the earlier; one added there where none lies within p ÷ 2)", add:

> "; where the run under that station is `breached` or `dismantled` when the raised way is created — an epoch's founding
> across a decayed curtain (V06 §3.19 (5)), the history replay's, a hand aqueduct drawn across a gap — the creating
> commit first repairs that stretch by `repairWall` in the same batch, in item 114's patch material (the row V06 §3.7.7
> (3) draws; on a `dismantled` stretch the op's bend, V06 §2.8: a new stretch drawn on its line), as a `repairRaised`
> beside a fallen stretch does (below), so no deck stands on a fallen wall from its first commit, a hand aqueduct's dry
> run listing the repair as a fate".

Ends:
1. **V06:** §3.19 (5)'s "added as S7 furniture in the commit" adds "— a `breached` or `dismantled` run at the crossing
   first repaired by `repairWall` in that batch, charged to the `fabric` cap with the founding (§2.7's support step
   (3))".
2. **scope:** §13.2 T114-3 adds:

   > "an aqueduct founded at an epoch across the decayed ring where the run at its crossing is `breached`, and on a second
   > run `dismantled`, and a hand aqueduct drawn across such a run: that run repaired in patch material in the creating
   > batch, the station's support standing, never a deck over a gap at any commit, the hand case's undo restoring the gap".

   T-V6-73 and V06 §7's T114 row take the epoch case.

### VEW-r5-04 — MAJOR, CONFLICT (CATALOGUE-GAP: C-wall-raised × C-raised-lock), owner model

**A regeneration with a held raised way: is the crossing station's raised gate re-derived?**

R5-02 put two sentences into §2.7's support step (6):
* "A lock or pin holds the same; at a regeneration a locked, pinned or declared raised way stands before every stage the
  regeneration runs (§7.2)".
* The closing sentence (l.2618–2623): "at a regeneration the stretches it re-derives are laid after a held raised way
  (above) — a re-derived stretch on a crossing station's line takes the station into the line as its support again, so
  an unchanged regeneration reproduces it".

Take a CITY whose S4 timber viaduct crosses S3's ring at a raised gate (T110-2's own fixture), with the viaduct locked,
then a full Regenerate (keep). S3's ring is re-derived as a stretch laid after the viaduct.

The closing sentence keeps the station as its support — a viaduct's station's support is "the raised gate, whose tower
carries the deck". But three texts say otherwise:
* (d) says such a stretch "takes no crossing station and makes no gate on the deck", and "no gate or tower stands in the
  under-deck strip — one the wall's law would place there moves to the nearest point clear of it".
* §4.8 *Gates* says "A stretch laid after a raised way takes no crossing furniture" (l.7674–7675).
* §4.8 counts a raised gate only "where the arterial's raised way was created across the standing trace".

So one builder reproduces the raised gate and N₁. Another moves S3's gate out of the under-deck strip, passes the deck
over the ring ungated and changes the ring's gates — an unchanged regeneration that does not reproduce. T110-2 (6) runs
only "a Re-derive from S4", which never re-derives S3's ring, so no bar runs the case.

**Required change.** In §2.7's support step (6)'s closing paragraph, "a re-derived stretch on a crossing station's line
takes the station into the line as its support again, so an unchanged regeneration reproduces it" becomes:

> "a re-derived stretch on a crossing station's line takes the station into the line as its support again with its
> crossing furniture — a raised gate (the gate law's site there read as that gate, never moved out of the under-deck
> strip by (d)) or a wall opening (§4.8 *Gates*) — so an unchanged regeneration reproduces it, its gates and their count
> included".

Ends:
1. **pipeline:** §4.8 *Gates*'s "A stretch laid after a raised way takes no crossing furniture: it runs on beneath the
   deck, which passes over it with no gate (§2.7's support step (6) (d))" adds "; a stretch a regeneration re-derives on
   a held raised way's crossing station keeps that station's furniture (§2.7's support step (6))".
2. **scope:** §13.2 T110-2 (6) adds:

   > "and a full Regenerate (keep) of the CITY fixture whose S4 timber viaduct crosses S3's ring at a raised gate, that
   > viaduct locked: S3's ring, its N₁ gates — the raised gate among them, on its station — and the station's support
   > reproduced byte-identically".

### VEW-r5-05 — MAJOR, EDGE-UNDEFINED (CATALOGUE-GAP: C-wall-raised × C-raised-edit × C-raised-history), owner pipeline

**A raised gate whose deck is gone.**

§4.8 *Gates* (l.7655–7673) makes a raised gate a main gate of the ring: "a gate whose tower carries the deck, its portal
on the raised part only". §5.3's gate row checks at S7's stage end "every gate joined to the network and the plaza" and
counts roads leaving a stage at its raised gates (l.9257).

The deck can go in three ways:
* a hand `delete` of the viaduct (§7.1 *Delete*; V06 §3.19.3);
* V06 §3.19.2's lapse and strike, which fall a generated viaduct's spans by stretch;
* a landfall, which ruins the spans beside a station (T114-3's landfall clause).

The stretch's fate is stated: held while the deck stands, then an ordinary run "from the first epoch after the raised way
is removed or the spans on both sides of the station have fallen" (§2.7's support step (3)). The gate's fate is not:
* §4.8 does not say whether the `Gate` stays in `Enceinte.gates` with a portal onto a deck that no longer exists;
* nor what becomes of its tower;
* V06 §3.19.3 (6)'s delete fates list only the arch vaults, "the route's standing course" and the aqueduct's terminal.

So builders differ. One keeps a gate joined to nothing, failing §5.3's check or counting a road that is gone. Another
drops the gate and its tower, leaving a held stretch with no tower. A third turns it into a ground gate.

The path is normal: T114-3 already runs "a neglected, poor CITY ring over 20 epochs with … a viaduct on a raised gate".

**Required change.** In §4.8 *Gates*, after "taking its own ground gate by §4.2 S3 (4)'s gate law.", add:

> "A raised gate is a gate while its deck stands over its station: in the commit that removes its raised way (a hand
> `delete`, or its suppression read at a re-derivation) or ruins or clears a span beside its station (V06 §3.19.2 (3),
> (4); a landfall), it leaves `Enceinte.gates`, its tower kept on the trace as a wall `Tower` of the enceinte standing on
> the held stretch until that stretch is an ordinary run (§2.7's support step (3)), so §5.3's gate checks and counts read
> the stage without it; a `repairRaised` that stands both spans beside the station again restores it as the same gate in
> that batch, and an undo restores it with the event it undoes."

Ends:
1. **model:** §2.7's support step (3)'s "a viaduct's or an elevated road's raised gate, whose tower carries the deck"
   adds "(a gate only while its deck stands, §4.8 *Gates*)".
2. **V06:** §3.19.3 (6)'s dry-run fates add "for a viaduct or an elevated road on a raised gate, that gate leaving the
   ring's gates, its tower standing (§4.8 *Gates*)".
3. **scope:** §13.2 T114-3's neglected-CITY clause adds:

   > "once both spans beside the viaduct's raised gate have fallen, the ring's gates exclude it, its tower standing and
   > §5.3's gate checks passing; and a hand delete of the viaduct: the same in that commit, its undo restoring the gate".
