# Probe round 7, pass 3 — time lens: epochs, decay, the village, readers and tests (J145)

> Seat `coherence/probe-r7c-time` (orchestrator brief
> `workflows/lane-prompts/coherence-cloud/coherence_probe-r7c-time.prompt.txt`, 2026-10-02), one of the three parallel
> lens seats of probe pass 3 (J145 (a)). Its lens: W1 at an epoch and the rows W4–W12 (with W14's village path) over
> every raised-way state, the fallen and later states C3–C6 and C10–C12 above all; V06 §3.7 and §3.19, V05's landfall,
> V04's arch vaults over time (§3.5.4, §3.10, UC18, the reconcile's triggers), V07's palisade and the hand-off down; the
> report fields (`EpochReport.walls`, `.raised`, the `reshaped` entry); every reader of a meeting's result; and whether
> each cell's named test holds its case, on a fixture that holds it, at a milestone where its provider exists. The two
> other seats cover locks and hand edits, and generation and regeneration. It attacks adjudication-r7.md as Part P
> (passes 1 and 2) amended it, the amended text above all, and re-raises no finding Part P closed unless its closure
> fails (PRB7C-TIM-04 says where VV56-r6-03's closure fails). It changes no design text. Each finding gives the exact
> words to amend in adjudication-r7.md; the amend seat rules them. Every reading of an owner's words below is the
> program's (J122), never the owner's.

**Line references.** `adj l.` = `docs/validation/coherence/adjudication-r7.md`; `base l.` = `docs/ARCHITECTURE.md`;
`Vnn l.` = `docs/volumes/Vnn-*.md`; all at the tree of commit `a99527a` (Part P pass 2 landed). Cells are `Wn·Cm` by
the crossing table's rows (adj l. 689–702) and columns (adj l. 628–668); the way-and-channel rows (a)–(e) are adj
l. 722–726; the state sweep is R7-06 (a) (adj l. 975–996) and E-S0 (adj l. 1064–1085).

**Grading (J141; R7-01, adj l. 183–186).** blocker: cannot be built as written, or a wrong result on a common path;
major: two builders would build different behaviour (an untested edge whose outcome the text defines, and two units
stating two outcomes for one case, are MAJOR however rare); minor: nothing built or tested changes.

**Totals.** 13 findings — 0 blocker, 10 major, 3 minor. Readings of `vault` spans over time: PRB7C-TIM-01 (the epoch
scope), -02 (UC18 and V04's entity row), -07 (readers left restating "under a wall"). Missing wall events or fixed
places: PRB7C-TIM-08 (the harbour-mouth chain), -09 (a replay's burial). The village: PRB7C-TIM-03 (the pathway at a
village rung), -05 (the palisade's REPLACEMENT), -06 (the palisade's band). Locks over time: PRB7C-TIM-10 (a declared
raised way under a landfall or a hazard). Tests: PRB7C-TIM-04 (the state sweep at an epoch). Minor: PRB7C-TIM-11 – 13.

## Summary

| id | severity | cell or step | the gap in one line |
|---|---|---|---|
| PRB7C-TIM-01 | major | *beneath*'s `vault` reading at an epoch; E-V6-1 (`EpochScope.raised`), E-V4-3, VAL-R6-05; W7, W8, W14 (E) | the epoch's only reconcile scope names walls and retired ways; a retaining wall's line, a moat silted to marsh after `wallToWay`/`absorbWall` and a re-sectioned band change the reading and never reach the reconcile |
| PRB7C-TIM-02 | major | UC18 (E-V4-4) and V04's arch-vault entity row (E-V4-2) × *beneath* (PRB7-13, PRB7B-10) × C8 | both ENDs keep the wall-only reading: a retaining-wall stroke over a locked chamber is refused `E_LOCKED` (a lock refusing a meeting, J144), and a locked chamber is laid again under a way laid while the span read `open` |
| PRB7C-TIM-03 | major | W4·C9, W6·C9, W7·C9, W8·C9: "(V07 runs no pathway)" | V06's fortification phase runs at every rung; a neglected or superseded palisade opens its gates, is dismantled, converted or absorbed at village epochs; T-V7-48 itself says "dismantled in time"; the village-epoch path has no test |
| PRB7C-TIM-04 | major | the state sweep at an epoch (R7-06 (a), E-S0); W1 (E), W4–W8 (E), W9; T110-2 (7); E-V6-7 (1) | V06 §3.19.2 (5) repairs a scripted `ruined` span at `raisedWays` (row 10a) before `growth` (row 14) lays the circuit, and across every multi-epoch clause: the sweep tests C10 where it names C3, C4 or C6, and "nothing of the raised way written" fails a correct build |
| PRB7C-TIM-05 | major | W14 (E: V07 §3.11's palisade REPLACEMENT) × V07 §3.11 and T-V7-32 | V07 says "rebuilt on the palisade's trace … gates kept" and T-V7-32 "keeps the trace's vertices and gates"; W14 re-traces locally and moves gates by *No gate and no tower*; no END |
| PRB7C-TIM-06 | major | the band a village enceinte brings to the crossing table (*Line and band*, the lawful crossing, (3)'s obstacle); W1 (V), W9, W14 (E) | V07 names `palisade.bandM` (8.5 m each side) "the band"; read so, no aqueduct span (clear ≤ 12 m) admits a palisade, every one takes F-V-RAISED, and the hand-off down widens the band under a carried-down aqueduct's piers |
| PRB7C-TIM-07 | major | readers of *beneath*'s `vault` reading: V07 §3.5a (3), T-V7-48, V04's edit rows (l. 370, 2529, 2557), V06's *The arch-vault reconcile's place* | each still restates "under the palisade" or "a span a wall stands over"; no END, and the V04, V06 and V07 sweeps' word lists do not match them |
| PRB7C-TIM-08 | major | the fixed-place sentence; *No gate and no tower*; W1 (E: V06 §3.7.6 (3)); W13 (a re-add at the former mouth) | a walled port's harbour-mouth chain — a water gate across the entrance with a tower on each mole head, placed by the waterfront law — laid at an epoch under a standing raised way: neither a fixed place nor movable along any trace; no cell |
| PRB7C-TIM-09 | major | no row: a replay epoch's burial of an enceinte's runs beneath a standing raised way (V06 §3.20.5 (4)) | the burial clears the runs and lays them underground while the raised way stands; no cell, no reading of a buried record's band for a `vault` span, no scope, no test |
| PRB7C-TIM-10 | major | W12·C8 and C5 for a declared raised way × V06 §3.19.2 (1) | the lock sentence's reach and W12·C8 keep a declared (drawn, so locked) raised way from a landfall and a hazard; V06 §3.19.2 (1) says it "breaks only by a hazard or the landfall"; the sweep's C5 `topple` on T110-2 (4)'s declared viaduct cannot be made by one reading |
| PRB7C-TIM-11 | minor | test schedules: E-S10's U3; V06's own E3 clauses | an arch-vault outcome at an epoch needs the epoch-side reconcile (V04's U5, V06's E8), not U3; T-V6-11's re-lay, T-V6-47's vault bar and the sweep's C6 runs sit at E3 |
| PRB7C-TIM-12 | minor | the state sweep's C12 | "the deck extended by a frame growth" on fixtures whose raised way is not stated to end on the frame's outer ring, the only deck a frame growth extends |
| PRB7C-TIM-13 | minor | report and reader words: V06 §2.10's `walls.raisedCrossings`; V12 §3.11's `stripMarginM` line | the count's comment says "a trace this epoch laid" (W14 counts a re-sectioned one; a bent-group move counts none); V12 lists §4.6 S8 alone as the margin's reader |

## Part 1 — `vault` spans over time

### PRB7C-TIM-01 — MAJOR — the epoch's reconcile scope names the wall's cases only

**Cell or step.** *Beneath*'s *A `vault` span under the wall* (adj l. 487–505, amended PRB7-13, PRB7B-10) at an epoch;
its producer E-V6-1 (`EpochScope.raised`, adj l. 1597–1602; V06 l. 465); V04 §3.10's bullet E-V4-3 (adj l. 1519–1527);
VAL-R6-05's caller text (V06 §3.18.1 (6); adj l. 1585, R7-07 l. 1040); rows W7·C2, W8·C2 and W14·C2 at an epoch.

**Claim.** At an epoch the arch vaults are brought to *beneath*'s reading only through the epoch's scope: the
`under.extend` participant runs "`ArchVaults.reconcile(doc, scope.raised, epoch)`" (V06 l. 1030), and V04's entity row
says the same ("at an epoch through V06's `under.extend` over `EpochScope.raised`", V04 l. 867). After Part P,
*beneath* reads a span `open` while any of four things lies across its strip — "a wall's band or wall strip …, a run of
that absorbed record not yet `dismantled` …, or a retaining wall's line …" and "no way's corridor or channel laid while
it read `open` (an intervallum, a quay, a street, a lane, a track, the moat)" (adj l. 487–502). But E-V6-1, the
producer, enumerates only two: "a wall the epoch laid, moved, absorbed or removed … now stands over or no longer stands
over …, or off whose under-deck strip the epoch retired, effaced, re-routed or filled a way or channel that kept it read
`open`" (adj l. 1597–1601). Three epoch events change the reading and are in neither list:
1. **A retaining wall's line** (PRB7B-10's case). V06 §3.19.4 creates, re-derives, buries (under a `raiseGrade`) and
   restores retaining walls at an epoch (V06 l. 774: `retaining: { created; rederived; buried; slumped; restored }`), and
   "generated levelling never reaches an under-deck strip" (adj l. 381–382), so a generated retaining wall standing
   before an aqueduct is founded across it (E-S9's "an aqueduct drawn across a standing retaining wall", adj l. 1239) is
   re-derived off the strip, or buried, at a later epoch: the span then reads `vault` and no scope entry reaches it.
   E-V4-1 added the retaining wall to the hand trigger (adj l. 1510); E-V6-1 and E-V4-3 did not.
2. **A moat silted to marsh.** "a moat stands while its ring stands; after `wallToWay` or `absorbWall` it is kept as still
   water and silts by V06 §3.12's `siltReach` path (candidate (c), as an oxbow) to marsh" (V06 l. 3311); the op "shrinks
   its shore by the row's share; when its area falls below 0.1 ha its water face is removed and the land typed `marsh`"
   (V06 l. 2199–2201). A moat laid while a span read `open` (row (e) passes a moat beneath a span *beneath* reads `open`,
   adj l. 726 with Block 2's lead, l. 715–717) keeps the span `open` after the wall goes (veto 18, adj l. 299–302). Its
   silting is neither "retired, effaced, re-routed" nor plainly "filled" (a carve's fill, E-V4-1, adj l. 1511), and no
   text says whether the `marsh` face it leaves keeps the span `open` ("while that corridor or water lies there", adj
   l. 501) — one builder lays an arch vault in the marsh at the silting's epoch, another never reaches the span.
3. **A band re-sectioned on its kept trace** (row W14 at a village epoch, V07 §3.11's REPLACEMENT, adj l. 702): "each
   `vault` span its new band or strips meet read `open` and each they leave laid again" — a wall neither "laid, moved,
   absorbed or removed".
VAL-R6-05's text, written as given (R7-07, adj l. 1040), restates the same narrow case at the foundations' caller: "a
raised way there only because a wall now stands, or no longer stands, over its `vault` span takes the arch-vault
reconcile alone" (`work/round7-work/V06.json`). R7-05 rules that every reader cites *beneath*'s reading "never restating
the cases, so a case *beneath* adds reaches every reader at once" (adj l. 940–943); the epoch scope, the one reader that
decides whether the reconcile runs at all, still enumerates. Two builders: one implements V06's list and leaves a
chamber missing (T-V4-62's "an arch vault in exactly each `vault` span" that *beneath* reads `vault`, V04 l. 3155 with
V04's sweep, adj l. 1565–1569, fails); one reads V04 §1b.2's general trigger and lays it. No test runs any of the three.

**Required change (adj l. 1597–1602, E-V6-1).** "or whose `vault` span a wall the epoch laid, moved, absorbed or
removed — the last run of an absorbed record it dismantled among them — now stands over or no longer stands over (V04
§3.5.4 (d) (1); §2.7's crossing table, row W8), or off whose under-deck strip the epoch retired, effaced, re-routed or
filled a way or channel that kept it read `open` (§2.7's crossing table, *beneath*)" → "or one of whose `vault` spans
§2.7's crossing table's *beneath* reads otherwise after the epoch's ops than before them, whatever op made the change —
a wall laid, moved, re-sectioned, absorbed or removed over it (the last run of an absorbed record dismantled among them,
row W8), a retaining wall's line laid, re-derived, buried or removed across its strip, a way or channel that kept it read
`open` retired, effaced, re-routed, filled or silted off it (V04 §3.5.4 (d) (1); *beneath*)", in both places. E-V4-3's
dash list (adj l. 1521–1522) adds, after "a wall laid, moved, absorbed or removed over it,": " a retaining wall's line
laid, re-derived, buried or removed,"; and after "a way or channel retired, effaced, re-routed or filled": ", or silted".
*Beneath* (adj l. 501, after "such a span read `open` while that corridor or water lies there,") adds: " the `marsh`
face a silted channel leaves (V06 §3.12) read as its water was, so the chamber is laid again once that face is
reclaimed or retyped off the strip,". VAL-R6-05's disposition (adj l. 1585) becomes "FIX, amended: '… whose `feet`,
`supports` or `spans` the epoch changed (V04 §3.5.0 *At an epoch*; a raised way there only because §2.7's crossing
table's *beneath* reads one of its `vault` spans otherwise takes the arch-vault reconcile alone)'". E-S7 (adj
l. 1216) adds after "no chamber in the water (§2.7's crossing table, *beneath*)": "; and that third run carried on over
epochs on volume 6's engine — the moat kept as still water, silted by `siltReach` to marsh, the span read `open` until
the marsh is reclaimed, its chamber then laid with its id in that epoch; and on a fixture whose generated retaining
wall stood under a `vault` span of an aqueduct founded across it, an epoch re-levelling that wall off the strip — the
chamber laid in that epoch (`EpochScope.raised`, V06 §2.1)".

### PRB7C-TIM-02 — MAJOR — UC18 and V04's entity row keep the wall-only reading, and UC18 refuses a meeting

**Cell or step.** E-V4-4 (UC18, adj l. 1528–1538; V04 l. 2459) and E-V4-2 (the arch-vault entity row, adj
l. 1513–1518; V04 l. 867) × *beneath*'s reading as PRB7-13 and PRB7B-10 amended it × C8 (a locked arch vault) on rows
W2 (a T3 `retaining` stroke), W7, W8, W11 and every epoch path.

**Claim.** UC18 stands as "a reconcile or regeneration that would re-lay, collapse or delete it keeps it — at an epoch
reported with E_LOCKED's cause, at an edit's dry run returned E_LOCKED (§7.3), the user free to unlock" (V04 l. 2459).
E-V4-4 excepts one case only: "save a wall coming to stand over its span: … its chamber is not laid while the wall
stands and is laid again, locked, with its id once none does" (adj l. 1528–1531). Pass 2 made *beneath*'s reading cover
a retaining wall's line and, for a locked chamber, said "its chamber not laid while *beneath* reads the span `open` (a
wall over it, or any case above) (amended, PRB7B-10)" (adj l. 503–505), and the lock sentence's retaining-wall clause
removes "the chamber V04's reconcile removes from a `vault` span it crosses (a fate; a locked one's *reshaped*, its lock
kept with its key)" (adj l. 384–385). So:
* a hand T3 `retaining` stroke across a locked arch vault's span: the lock sentence says the chamber is removed, the fate
  *reshaped*; UC18 as E-V4-4 leaves it says the reconcile keeps it and the dry run returns `E_LOCKED`. That is a lock
  refusing a meeting of two similar structures (a retaining wall and an arch vault, adj l. 334–337), which J144 forbids
  ("absolutely change the shape … despite being locked") and the lock sentence rules out ("No meeting of two similar
  structures is refused, skipped or altered for a lock", adj l. 345);
* a locked chamber under a wall, an intervallum or a hand way laid under the span while it read `open`, then the wall
  deleted (W11): UC18 says "laid again, locked, … once none [no wall] does"; *beneath* says the span stays `open` while the
  way lies there (adj l. 499–502), so no chamber is laid across the lane.
E-V4-2 writes the entity row the same way: "or a wall comes to stand over its span — a locked one too … — (laid again,
its id and lock kept by its key, when none stands over it any more)" (adj l. 1515–1518), and leaves its two trigger
clauses wall-only — "the commit of every enceinte band or wall strip laid, moved or removed over a `vault` span's
under-deck strip" and "a wall the epoch laid, moved or removed over a `vault` span, V06 §2.1" (V04 l. 867). An END is
written as given (R7-01, adj l. 21), so V04's sweep (adj l. 1565–1571) cannot fix the words E-V4-2 dictates. Meanwhile
E-V4-6 makes V04 §3.5.4 (d) (1) and (3) cite *beneath* whole (adj l. 1548–1556): two V04 texts, two outcomes. T-V4-80
(i) (adj l. 1532–1537) runs walls only.

**Required change.** E-V4-4 (adj l. 1528–1531): "— save a wall coming to stand over its span: its span held and its
lock kept with its key, its chamber is not laid while the wall stands and is laid again, locked, with its id once none
does (§2.7's crossing table, the lock sentence), the fate *reshaped* by hand and a `reshaped` entry at a regeneration or
an epoch —" → "— save where §2.7's crossing table's *beneath* comes to read its span `open` (a wall over it, an absorbed
run, a retaining wall's line, or a way or channel laid while it read `open`): its span held and its lock kept with its
key, its chamber not laid while *beneath* reads it so — never refused `E_LOCKED` — and laid again, locked, with its id
once *beneath* reads it `vault` (§2.7's crossing table, the lock sentence), the fate *reshaped* by hand and a `reshaped`
entry at a regeneration or an epoch —"; and T-V4-80 (i)'s addition (adj l. 1537) ends "… refused `refuse.locked` naming
the building; a hand T3 `retaining` stroke across that span — the chamber removed with the fate *reshaped*, no
`E_LOCKED`, laid again locked with its id when the stroke is deleted; and a hand way drawn under that span while the
wall stood, then the wall deleted — the chamber not laid while the way lies there, laid again locked with its id when the
way is deleted —,". E-V4-2 (adj l. 1515–1518): "or a wall comes to stand over its span — a locked one too, its lock kept
with its key (§2.7's crossing table, the lock sentence) — (laid again, its id and lock kept by its key, when none stands
over it any more)" → "or §2.7's crossing table's *beneath* comes to read its span `open` — a locked one too, its lock
kept with its key (the lock sentence) — (laid again, its id and lock kept by its key, once *beneath* reads it `vault`
again)"; and E-V4-2 adds: "the row's 'the commit of every enceinte band or wall strip laid, moved or removed over a
`vault` span's under-deck strip' → 'the commit of every event that changes how §2.7's crossing table's *beneath* reads a
`vault` span', and its 'a wall the epoch laid, moved or removed over a `vault` span, V06 §2.1' → 'a `vault` span
*beneath* reads otherwise after the epoch's ops, V06 §2.1'".

### PRB7C-TIM-07 — MAJOR — readers still restating "under the palisade" or "a span a wall stands over"

**Cell or step.** R7-05 (adj l. 936–963) and its sweeps: V07 §3.5a (3) and T-V7-48 (V07's sweep, adj l. 1744–1745);
V04's edit and lifecycle rows (V04 l. 370, 2529, 2557; V04's sweep, adj l. 1565–1571); V06's *The arch-vault
reconcile's place* (V06 l. 1038–1045; V06's sweep, adj l. 1695–1699).

**Claim.** R7-05 rules that "every reader of a span's `use` reads it as *beneath* does … and cites *beneath* for it …,
never restating the cases" (adj l. 940–943). Live readers outside every END:
* V07 §3.5a (3), VS4's obstacle list: "the under-deck strip of each `vault` span (impassable by §4.3 *Lattice and
  costs*; one under the palisade read `open`, §2.7's crossing table, *beneath*)" (V07 l. 1585); T-V7-48's bar: "0 VS4
  ways on … a `vault` span's under-deck strip (one under the palisade read `open`, §2.7's way-and-channel table)" (V07
  l. 3683). VAL-R6-02's FIX changes only the cleared-span clause of (3) (`work/round7-work/V07.json`), E-V7-2 only (4)
  (adj l. 1728–1734), and V07's sweep says "§3.5a (5) stand" (adj l. 1744). A village track laid under a span while the
  palisade made it `open`, the palisade then deleted (W11·C9) or converted (W7·C9): V07 reads the span `vault` again
  (the track now on a reservation, against T-V7-48's bar); *beneath* keeps it `open` while the track lies there.
* V04's three edit rows: "(none in a span a wall stands over, V04 §3.5.4 (d) (1))" (V04 l. 370, the `setAttr` on a
  span's `use`; l. 2529, a raised way added; l. 2557, the span `use` row). V04's sweep rewrites only "`vault` span no wall
  stands over", "over which no wall stands" and "under a wall" (adj l. 1566–1569); none matches "a span a wall stands
  over". A `setAttr` of `use` to `vault` on a span with a street under it laid while it read `open`: V04's rows lay the
  chamber; *beneath* does not.
* V06's *The arch-vault reconcile's place*: "the removal of one a wall the epoch laid or moved now stands over and its
  chamber laid again where none stands over it any more" and "no chamber stands under a fallen span or under a wall"
  (V06 l. 1039–1041, 1044). V06's sweep names only the paragraph's two "no wall stands over" phrases (adj l. 1696–1699).
Two units stating two outcomes for one case: MAJOR (R7-01, adj l. 185).

**Required change.** Part H · V07 adds "**E-V7-5 — §3.5a (3) and T-V7-48** (R7-05's citing form): (3)'s '(impassable by
§4.3 *Lattice and costs*; one under the palisade read `open`, §2.7's crossing table, *beneath*)' → '(impassable by §4.3
*Lattice and costs*, but one §2.7's crossing table's *beneath* reads `open`)'; T-V7-48's '(one under the palisade read
`open`, §2.7's way-and-channel table)' → '(but one §2.7's crossing table's *beneath* reads `open`, its way-and-channel
table)'", and V07's sweep (adj l. 1744) reads "§3.12's hand-off, §3.12a (4)'s ruin abutment and §3.17's palisade row
stand; §3.5a (3) is E-V7-5's". V04's sweep (adj l. 1569) adds after "every 'under a wall' said of a span's reading":
", and every 'a span a wall stands over' (l. 370, 2529, 2557: '(none in a span a wall stands over, V04 §3.5.4 (d) (1))'
→ '(none in a span §2.7's crossing table's *beneath* reads `open`, V04 §3.5.4 (d) (1))')". V06's sweep (adj l. 1698)
adds: "and the same paragraph's 'the removal of one a wall the epoch laid or moved now stands over and its chamber laid
again where none stands over it any more' → 'the removal of one in a span §2.7's crossing table's *beneath* now reads
`open` and its chamber laid again where *beneath* reads it `vault` again', and its 'under a fallen span or under a wall'
→ 'under a fallen span or in a span *beneath* reads `open`'".

## Part 2 — the village

### PRB7C-TIM-03 — MAJOR — "(V07 runs no pathway)": the pathway runs at village epochs

**Cell or step.** W6·C9, W7·C9 and W8·C9 (adj l. 694–696), each "by a hand `convert` only (V07 runs no pathway)"; W4·C9
(adj l. 692), whose E path is "the pathway's dismantling, V06 §3.7.2 (2)" but whose test is T-V7-48's hand clause.

**Claim.** The parenthesis is false on three counts.
* V06's `fortification` phase (V06 l. 1003) carries no product or rung scope, and its pathway runs "for every ring with
  a pathway and not locked" (V06 l. 1478–1479). V06's edge table says so at a village: "fortification (V06 §3.7) | …
  every rung (a village's palisade) … | … the same transitions over a palisade" (V06 l. 3279).
* V07 sends the palisade into that phase: "the palisade is an `Enceinte` like any ring, and V06's walls step runs over
  it at every village epoch" (V07 l. 1429–1430), naming "V06 §3.7.3 neglect" — whose ring "enters its pathway with cause
  `neglected` … its gates open as in V06 §3.7.2 (1)" (V06 l. 1501–1505): a `gateToJunction` at a village epoch (W6).
  A dossier town-wall record below `ladders.replaceShare` builds a new ring "and the palisade is `supersededBy` the new
  ring" (V07 l. 2293–2294), and V06 §3.7.6 (4) adds "and the superseded ring enters its pathway" (V06 l. 1592): its
  stretches dismantled (W4), and at its end `wallToWay` or `absorbWall` (W7, W8) at a village epoch. A shrunk town's ring
  handed down mid-pathway continues it the same way (V07 §3.12: "the standing fabric survives unchanged", V07 l. 2610).
* T-V7-48 itself expects it: "`absorbWall` of the palisade beneath it — … the absorbed palisade's runs dismantled in time
  as any" (V07 l. 3683) — only V06 §3.7.2 (2)'s pathway dismantles "in time".
So two builders: one reads the cell as a rule and runs no pathway at a village rung (a neglected palisade's gates never
open; a superseded palisade never dismantled, its arch vault never laid again); one runs V06's phase. The cells' named
tests run the hand path only, so neither the vault re-lay at a village epoch's last dismantle (W8's), nor "no junction
with the raised way" for a village epoch's ring road (W7's), nor "no gate under a deck" (W6's) is run where the engine
makes them: an untested edge whose outcome the text defines — MAJOR (R7-01, adj l. 183–185).

**Required change.** W6·C9 (adj l. 694): "as W6·C2, by a hand `convert` only (V07 runs no pathway) · T-V7-48's hand
`gateToJunction` clause" → "as W6·C2 — at a village epoch for a palisade neglected in long safety (V06 §3.7.3; V07 §3.4
(8)) or superseded (V06 §3.7.6 (4); V07 §3.11), and by a hand `convert` · T-V7-48's hand `gateToJunction` clause and its
village-pathway clause"; W7·C9 and W8·C9 the same, with "`wallToWay`" and "`absorbWall`" for "`gateToJunction`" and
"at a village epoch at the end of a superseded palisade's or a carried-down ring's pathway (V06 §3.7.2 (3); V07 §3.11)"
for the dash clause; W4·C9 (adj l. 692): "*unchanged meeting* · T-V7-48's hand `breach` and `dismantle` clause" →
"*unchanged meeting* — at a village epoch by the pathway's dismantling (V06 §3.7.2 (2)), and by a hand `convert` ·
T-V7-48's hand `breach` and `dismantle` clause and its village-pathway clause". E-V7-1 (adj l. 1727) adds after "(row
W14 at a village, its C9 cell);": " and the village-pathway clause — on that CITY fixture handed down, its palisade
beneath the carried-down aqueduct superseded at a village epoch by a dossier town-wall record below
`ladders.replaceShare` (V07 §3.11), its fate set to `road` by a hand `setAttr` and, on a second run, to `absorb`: its
gates opened (none under the deck), its runs dismantled, the ring road laid by §2.7's way-and-channel table (row c) with
no junction with the raised way, and the absorbed record's arch vault laid again in the epoch that dismantles its last
run over the span; and a village palisade neglected in long safety beside a declared viaduct opening its gates at a
village epoch, none under the deck (§2.7's crossing table, rows W4, W6, W7 and W8 at C9);".

### PRB7C-TIM-05 — MAJOR — the palisade's REPLACEMENT: V07 keeps the trace and gates, W14 re-traces and moves them

**Cell or step.** Row W14's E path, "V07 §3.11's palisade REPLACEMENT, rebuilt in stone on the palisade's trace (E: a
village epoch)" (adj l. 702), × V07 §3.11's REPLACEMENT text (V07 l. 2288–2297) and T-V7-32 (V07 l. 3667).

**Claim.** W14·C2 lays the run again "as a stretch of the bent group (… its line kept where its new band crosses
lawfully, re-traced locally where it would not), its towers and gates by *No gate and no tower*" (adj l. 702), and
E-V7-1 tests exactly that: "the palisade's REPLACEMENT under the declared aqueduct … re-traced locally by the bent-group
sentence where its new band would not cross lawfully (row W14)" (adj l. 1719–1721). V07 §3.11, the REPLACEMENT's home,
says the wall "is **rebuilt on the palisade's trace** — `setAttr` of the enceinte's kind to `inner`, … gates kept,
every run `standing` and robust" (V07 l. 2289–2292), and T-V7-32 bars "a town-wall promotion keeps the trace's vertices
and gates" (V07 l. 3667). A stone gatehouse's footprint is larger than a palisade's timber gate, so under *Footprints*
(adj l. 401–405) a gate kept clear as a palisade's may now meet the strip and move. No END reaches V07 §3.11 or T-V7-32
(E-V7-1 – E-V7-4, adj l. 1711–1743; the sweep, l. 1744–1745, names neither). Two units, two outcomes for a REPLACEMENT
under a raised way: MAJOR.

**Required change.** Part H · V07 adds "**E-V7-6 — §3.11's palisade REPLACEMENT and T-V7-32**: §3.11's 'gates kept,
every run `standing` and robust (a patched run rebuilt in stone)' → 'gates kept, every run `standing` and robust (a
patched run rebuilt in stone) — where a standing raised way crosses the trace, the run laid again in its new section by
§2.7's crossing table, row W14 (its line kept where its new band crosses lawfully, re-traced locally where it would not;
its towers and gates by *No gate and no tower*; with no lawful shape the REPLACEMENT waiting, (G3)) —'; T-V7-32's 'keeps
the trace's vertices and gates' → 'keeps the trace's vertices and gates (save where a raised way crosses it: §2.7's
crossing table, row W14; T-V7-48)'". Row W14's last cell (adj l. 702) adds after "no lawful shape: (G3)": " (at a village
epoch the REPLACEMENT waiting, `walls.waited`)".

### PRB7C-TIM-06 — MAJOR — which band a village enceinte brings to the crossing table

**Cell or step.** *Line and band* (adj l. 465–469), the lawful crossing (adj l. 560–564), the support step's band
obstacle ((3), base l. 2537–2538) and *the edge* (adj l. 479–481), read for a village kind (`palisade`, `earthwork`,
`inner`): rows W1 (V: VS3), W9 (the hand-off down), W14 (E: the REPLACEMENT), C1 (a hand aqueduct over the palisade).

**Claim.** The table reads "the band's half there (§4.8's rows along the stretch profile)" (adj l. 467) and an
enceinte's band "its half-widths by §4.8's rows along the stretch profile" (base l. 2538). §4.8 sends village kinds to
`village.json` ("At village kinds the light section reads `village.json`'s `palisade.lightHeightCm`", base l. 7715–7716).
V07 gives two widths and calls only one "the band": the section — "`palisade` (timber stakes, 300 cm, 40 cm thick),
`earthwork` (a bank 4 m wide … with its ditch 3 m wide outside), `inner` (… 500 cm, 120 cm thick …)" — and "The band
`palisade.bandM` (8.5 m) each side of every walled stretch is the no-build band every later stage reads" (V07
l. 1405–1411); VS4 pushes roads "while inside the palisade band" (V07 l. 1486), V07's wiring row names it "the wall band"
(V07 l. 219), and `bandM` is one cell for all three kinds (V07 l. 493). Read as the band, 17 m: an aqueduct's clear width
between rings is at most 15 m less a 3 m pier, 12 m (`pierSpacingM` masonry 8–15, `pierWidthShare` 0.2, `pierMinCm` 150,
V11 l. 3952; an aqueduct is never timber, l. 3965), so no span admits a palisade's band ("its band's half at most
touching a standing support's ring", adj l. 562–563); every palisade VS3 lays across a declared or carried-down aqueduct
takes F-V-RAISED (adj l. 1737–1743) and, the aqueduct running to its basin inside the village (V07 §3.5a (8), V07
l. 1635), is omitted — against T-V7-48's "its line bent to cross the declared aqueduct under a span" (V07 l. 3683). Read
as the section, 0.4–7 m, it crosses. The same split decides W9: at the hand-off down a town's stone ring becomes "the
palisade" (V07 l. 2614); if a village enceinte's band is `bandM`, its band widens there from §4.8's 2–3 m to 17 m under
a carried-down aqueduct whose piers stood off the old band — no longer the *unchanged meeting* W9 states (adj l. 697) —,
and W14's REPLACEMENT widens nothing. Two builders, two maps: MAJOR.

**Required change.** *Line and band* (adj l. 469, after "so a line is kept out of them as they are drawn.") adds: " A
village kind's band is its section — the `palisade`'s stakes, the `earthwork`'s bank with its ditch, the `inner`
circuit's wall, the light section on a light stretch (V07 §3.4 (6)) — and `palisade.bandM` each side of it is its wall
strips (the no-build band), in which a support may stand; a town's ring handed down as the palisade keeps its own section
(V07 §3.12)." Part H · V07 adds "**E-V7-7 — §3.4 (6)'s band**: 'The band `palisade.bandM` (8.5 m) each side of every
walled stretch is the no-build band every later stage reads.' → 'The band `palisade.bandM` (8.5 m) each side of every
walled stretch is the no-build band every later stage reads — the village's wall strips (§4.8), in which a raised way's
support may stand; the band §2.7's crossing table reads is the section above (its *Line and band*).'"

## Part 3 — wall events with no cell

### PRB7C-TIM-08 — MAJOR — the harbour-mouth chain under a standing raised way

**Cell or step.** The fixed-place sentence (adj l. 598–626); *No gate and no tower* (adj l. 524–537); W1's E path,
which names "V06 §3.7.6 (3)'s waterfront quay wall" only (adj l. 689); W13 for the chain's hand re-add.

**Claim.** "a walled port without a harbour-mouth chain gains one the first epoch its harbour mouth is enclosed: two
towers on the mole or breakwater heads (or the shores) and a water gate across the entrance, as S7 furniture" (V06
l. 1573–1575); the chain is a `water` `Gate` with `mouth`, "its banks the two mole or breakwater heads (or the shores),
a tower at each" (base l. 2277). Its place is fixed by the waterfront law, as a river's water gate is, but the fixed-place
sentence lists only "a river's water gate (the trace's crossing of a river …), a stretch's anchor …, an `on_enceinte`
castle's weld vertices …, and every castle's town-side gate" (adj l. 598–602), and *No gate and no tower* moves every
other gate "along its way" or "along the trace" (adj l. 527–534) — the chain has neither: it spans water between two
heads. A raised way over a harbour mouth is a combination principle (11) names ("a raised way under an island's shade or
over a harbour mouth", round notes' principle (11)); a declared viaduct or aqueduct can span a narrow mouth in one span
(supports off the moles' corridors and out of the water, base l. 2534–2536). At the first epoch the mouth is enclosed,
the chain's water gate and towers would stand in the under-deck strip: one builder lays them there (against "0 gates or
towers in an under-deck strip", T-V6-47's bar, V06 l. 4170), one moves them somewhere, one skips the chain. The hand
re-add of a removed chain, "`placeGate` at the former mouth" (V06 §3.7.6 (3), V06 l. 1578–1583), meets W13, whose move
is "along the trace" (adj l. 701). No cell, no test (T-V6-48, V06 l. 4171, runs no raised way).

**Required change.** The fixed-place sentence (adj l. 601–602): "and every castle's town-side gate (§4.2 S3 (8); §4.8's
pinned vertices) (amended, PRB7B-03)" → "every castle's town-side gate (§4.2 S3 (8); §4.8's pinned vertices) (amended,
PRB7B-03), and a walled port's harbour-mouth chain (`Gate.mouth`: its water gate across the entrance, its banks and the
tower at each; §4.8; item 106 (e))"; and after its *A castle sited after the raised way* clause (adj l. 622) add: "**A
harbour-mouth chain laid after the raised way** (S7 at generation, V06 §3.7.6 (3) at an epoch, a `placeGate` re-adding
it by hand) is laid across the entrance at the nearest pair of heads or shore points, in either direction along the
entrance from its place, whose gate and towers with their footprints lie clear of every fixed-place zone; with none, it
is not laid while the raised way stands — S7's `W_RAISED_MEETING` at generation, at an epoch the waterfront rule's
condition held and counted in `walls.waited`, by hand `refuse.raised.meeting` — never a gate or tower under a deck."
W1's event cell (adj l. 689): "V06 §3.7.6 (3)'s waterfront quay wall" → "V06 §3.7.6 (3)'s waterfront quay wall and
harbour-mouth chain". Part H · V06 adds "**E-V6-17 — T-V6-48**: after 'anchored on a tower or fort already standing at
a mole head;' add ' and on a variant whose declared viaduct spans the harbour mouth, the chain laid clear of the
viaduct's fixed-place zone at the nearest heads or shore points, else not laid and counted in `walls.waited`, nothing of
the viaduct written (§2.7's crossing table, the fixed-place sentence);'".

### PRB7C-TIM-09 — MAJOR — no row for a replay epoch's burial of runs beneath a standing raised way

**Cell or step.** The crossing table's rows (adj l. 687–702: "every wall event (14 rows …)", Summary, adj l. 78–80);
*beneath*'s `vault` reading (adj l. 487–505); `EpochScope.raised` (E-V6-1).

**Claim.** The history replay at generation (item 113; V06 §3.20) runs every epoch op, and its destruction epoch leaves
"every enceinte `neglect`ed with every run `breached` … every raised way `neglect`ed" (V06 l. 3200–3203). Then "at each
replay epoch's `terrainWater` step, each **former fabric** — … its enceinte runs whose condition is `dismantled` — and,
for a destruction's fabric, the runs V06 §3.20.5 (2) left `breached` — with the towers and gates drawn on them … is
buried: the runner calls V04's `BuriedFormer.lay` … and clears the listed surface records (existence `cleared`, cause
`rule:burial`)" (V06 l. 3216–3225). Raised ways are not in that list: an aqueduct of the old city stands, or stands as a
row of piers (V06 §3.19.2 (3)), over the buried ring — item 113's own picture. No row names this event (W4 is
`DeclineOp`, W8 `absorbWall`, W11 a hand `delete`). Unruled: (1) whether a `vault` span over a buried run reads
`vault` again — *beneath*'s cases are a band or strip "lies there", or a run of an *absorbed* record "not yet
`dismantled`" (adj l. 488–490); a buried `breached` run of a `cleared` record reads, by W8's words, as "not yet
`dismantled`", so the span stays `open` for ever, by W11's as removed, so the chamber returns; (2) whether
`EpochScope.raised` takes the span (E-V6-1 names "removed" walls only by op kind); (3) the cap and the band once the run
is cleared beneath a road deck's support built into it. T-V6-71 (V06 l. 4194), whose H-HISTORY peaks at CITY and whose
H-REFOUND buries its ruins, runs none of it.

**Required change.** Add row W15 after W14 (adj l. 702): "| **W15** a replay epoch's burial of an enceinte's runs
(V06 §3.20.5 (4); E, at generation by the history replay) | — | *unchanged meeting*: the buried runs — their band,
strips, towers and gates — cleared with the record, the raised way untouched (standing, `neglect`ed or fallen; this op
buries none of it), the band no longer lying there (*beneath*), so V04 lays again the arch vault of each `vault` span
*beneath* then reads `vault` (`collapsed` where its span or a bounding support has fallen) · T-V6-71 | as W15·C2 ·
T-V6-71 | as W15·C2 · T-V6-71 | as W15·C2 · T-V6-71 | as W15·C2 · T-V6-71 | no meeting · — | as W15·C2 (a held run is
never buried: the lock sentence's reach) · T-V6-71 | as W15·C2 (a replay's village epochs) · T-V6-71 | as W15·C2 ·
T-V6-71 | — | as W15·C2 · T-V6-71 | as W15·C2 · T-V6-71 | the burial's batch (`BuriedFormer.lay`; existence `cleared`,
cause `rule:burial`) · its gates cleared with it · reported as the replay's `buried`; each held thing's reshape a
`reshaped` entry; no bend |"; *beneath* (adj l. 490, after "crosses (row W8),") adds " — a record a replay's burial
cleared lying there no more (row W15) —"; E-V6-1's new list (PRB7C-TIM-01) adds "a wall … buried" to "laid, moved,
re-sectioned, absorbed or removed"; the Summary's "14 rows" (adj l. 78) reads "15 rows — … and W15, a replay's burial";
and Part H · V06 adds "**E-V6-18 — T-V6-71**: after 'younger ones standing;' add ' on an H-REFOUND variant whose CITY
peak founds an aqueduct across its ring with a `vault` span over the ring's band (the seed searched so), the destroyed
ring's runs beneath it buried and cleared while the aqueduct's piers stand — nothing of the aqueduct written, the span's
arch vault laid again by V04 in the burial's epoch, `collapsed` where its span has fallen (§2.7's crossing table, row
W15);'".

## Part 4 — locks over time

### PRB7C-TIM-10 — MAJOR — a declared raised way under a landfall or a hazard: kept, or broken?

**Cell or step.** W12·C8 (adj l. 700, amended PRB7-04) and the lock sentence's reach (adj l. 356–358) × V06 §3.19.2 (1)
(V06 l. 2893) for a declared raised way; the state sweep's C5 `topple` run (adj l. 981) on a declared raised way
(T110-2 (4)'s declared viaduct, E-S4, adj l. 1142; T-V7-48's declared viaduct and aqueduct).

**Claim.** C8 is "held — the raised way, the wall or both locked, pinned or declared" (adj l. 640), and W12·C8 keeps
"the held side …, never covered — content the ruin laps around, no member (V05 §3.16 (2); F-SKY-LANDFALL; the lock
sentence's reach)" (adj l. 700); the reach says "by the engine or a hazard, a held target is kept as §7.2 *Protection*,
V06 §3.1 and V05 §3.16 (2) keep it — never struck, converted, decayed or covered by a landfall" (adj l. 356–358). A
declared raised way is a drawn way, and "Drawn constraints — ways, water, walls … — … are locked by default" (base
l. 10819–10820; "a drawn feature is locked besides", l. 10812); V06 §3.1 never strikes a locked entity (V06 l. 978) and
V05's covered set is "less every locked or pinned entity" (V05 l. 1318). But V06 §3.19.2 (1) says: "a declared way is
held (item 101 R13) — it breaks only by a hazard or the landfall, and the user repairs it by hand" (V06 l. 2893), and
V06 §3.19.2 (4) "A hazard breaks a way in use too". Two units, two outcomes for a landfall over a declared aqueduct and
the run beneath it — W12·C8 keeps the aqueduct and breaches the run, V06 ruins both — and for a `topple` of a declared
viaduct's support (C5). The sweep's C5 second run, "`ruined` by a `topple` (V06 §3.11 …)", cannot be made on T110-2
(4)'s declared viaduct under the first reading and can under the second. No END reaches V06 §3.19.2 (1) (V06's sweep,
adj l. 1695, names none).

**Required change.** Part H · V06 adds "**E-V6-19 — §3.19.2 (1)**: 'a declared way is held (item 101 R13) — it breaks
only by a hazard or the landfall, and the user repairs it by hand' → 'a declared way is held (item 101 R13; a drawn way
locked by its drawing, §7.2) — no disuse, hazard or landfall breaks it while it is held (V06 §3.1; V05 §3.16 (2);
§2.7's crossing table, the lock sentence's reach), its author breaking a span or a support by a hand `convert` and
repairing it by hand'". The sweep (R7-06 (a), adj l. 981; E-S0, adj l. 1074) adds after "(V06 §3.11; it and both its
spans, V06 §3.19.2 (4))": " — on a declared raised way, which no hazard strikes (V06 §3.1), the same state made by its
author's hand `convert` (`breach` of both spans, then of the support)". (If the program instead means a declared way to
break by a hazard or a landfall, W12·C8's and the reach's "held" read "locked or pinned by the user (T10 `hold`)", and
§7.2's *Drawn constraints* and V05 §3.16 (2) take that exception by END; the amend seat states which.)

## Part 5 — the tests over time

### PRB7C-TIM-04 — MAJOR — the state sweep at an epoch does not hold its state

**Cell or step.** The state sweep (R7-06 (a), adj l. 975–996; E-S0, adj l. 1064–1085) on its epoch clauses: T110-2
(4)·S for W1 at an epoch, T-V6-73·S (W5, 20 epochs), T-V6-47·S (W6), T-V6-11·S (W8 and W4 at an epoch), T-V7-48·S
(W9); T110-2 (7)'s epoch circuit "after a span over its planned band fell `ruined`" (base l. 18612–18614; E-V6-8 (2),
adj l. 1647–1651); E-V6-7 (1) (adj l. 1637–1639). This is where VV56-r6-03's closure ("rows W5, W6 and W8 over the
state sweep", adj l. 1590) fails.

**Claim.** The sweep makes each state "by scripted ops before the clause's wall event" — "C3, a span over the wall's
line `ruined` by a `DeclineOp` `breach` …; C4, every span over the line `ruined`; … C6, a `vault` span over the line
breached" (adj l. 977–983) — and bars "nothing of the raised way written but a chamber the table removes or lays again"
(adj l. 989–990). The clauses' raised ways are generated with a live reason (H-AQUA's aqueduct, founded at its CITY
epoch for its water need, V06 l. 4057–4059). V06 §3.19.2 (5) repairs them: "Each standing generated way that is
abandoned or has a ruined span, and whose reason is **live again** … is repaired …: `repairRaised` … on each ruined span"
and "A way a hazard broke while in use is repaired the same way" (V06 l. 2934–2941), at the `raisedWays` step, row 10a
(V06 l. 1005), every epoch, sparing only "A way struck in this epoch" (V06 l. 2942). So:
* **W1 at an epoch.** A new circuit is laid by the `growth` step, row 14 (V06 l. 1009; V06 §3.7.1 "when the growth
  phase grows a stage"), after row 10a. A span scripted `ruined` before the circuit's epoch is standing again when the
  circuit is laid: the C3, C4 and C6 runs of T110-2 (4)·S lay the circuit under a repaired span (C10), and T110-2 (7)'s
  "an epoch circuit laid across the aqueduct after a span over its planned band fell `ruined` … — the run at its own top
  beneath the fallen span" (base l. 18612–18614) fails a correct build (the run is capped under the repaired span).
* **Clauses over several epochs.** T-V6-73's W5 runs "the same 20 epochs over the state sweep … each an *unchanged
  meeting*, … nothing of the raised way written" (E-V6-7 (1), adj l. 1637–1639): from the first `raisedWays` step on, the
  engine writes the raised way (`repairRaised`) and the state is C10 for the remaining epochs, so the bar fails a correct
  build and W5 at C3, C4 and C6 is tested for one epoch's draws at most. T-V6-11·S's absorbed ring is dismantled "in
  time" (adj l. 1609) over many epochs and T-V6-47·S's gates open over `walls.gateOpenAfterYears`: the vault re-lay at the
  last dismantle (W8·C6 with a `collapsed` chamber) meets a repaired span instead. A `cleared` span (C3's second run) or
  support (C5) releases the generated way (V06 §3.19.1 (3), V06 l. 2877–2883), whose reason key may then found a new
  aqueduct across the same ring at a CITY or METROPOLIS epoch.
* **The hand-off down.** T-V7-48·S's "each state made before the hand-off — the hand-off writing nothing of the raised
  way" (E-V7-1, adj l. 1715–1716): the hand-off epoch's own `raisedWays` step "runs its lapse and repair" at a village
  rung (V07 l. 2643).
Two builders script the states two ways (hand converts before the epoch, as the words say, or forced draws inside it),
and one of them tests C10 throughout while naming C3, C4 and C6: the class R7-06 was ruled to close ("cells named tests
that never set up their state", adj l. 972–973). MAJOR.

**Required change.** In the sweep's definition (R7-06 (a), adj l. 977; E-S0, adj l. 1071) after "the state made by
scripted ops before the clause's wall event:" insert: "— at an epoch clause, inside the clause's epoch before its wall
event, by forced draws at its `hazards` or `decline` step (V06 §3.2 rows 2 and 8), so that V06 §3.19.2 (5)'s repair,
which never repairs a way struck in that epoch, does not stand the span again before a circuit the `growth` step lays
(row 14, after `raisedWays`' row 10a); and on a clause whose wall events run over several epochs (row W5's decay, W6's
gate openings, W4's and W8's dismantling, W9's village epochs), the raised way locked by the script once its state is
made, so that the engine neither repairs, strikes nor releases it (V06 §3.1) and the state holds through every epoch,
its meeting the unlocked cell's by the lock sentence —"; and "nothing of the raised way written but a chamber the table
removes or lays again" (adj l. 989–990; E-S0, l. 1082–1083) → "nothing of the raised way written by the clause's wall
events but a chamber the table removes or lays again". E-V6-8 (2) (adj l. 1647–1651) adds after "an epoch circuit laid
across the aqueduct after a span over its planned band fell `ruined`": " in that epoch's `decline` step"; and T110-2
(7)'s same words (scope) take the same addition (a new E-S13 line under Part H · scope). E-V6-7 (1) (adj l. 1638–1639)
"the aqueduct's state made before the first epoch" → "the aqueduct's state made and the aqueduct locked before the first
epoch (§13.2's state sweep)".

### PRB7C-TIM-11 — MINOR — arch-vault outcomes at an epoch scheduled before their provider

**Cell or step.** E-S10 (adj l. 1241–1244); E-V6-11 (adj l. 1668–1669); V06 §8's E3 row (V06 l. 4231).

**Claim.** E-S10 runs "every arch-vault clause — (1)'s, (4)'s, (6)'s, (8)'s and the sweep's C6 runs — at the later of
their milestone and M6-U's U3, which lays the arch vaults (V04 §8)". At an epoch the vaults are reconciled by
"`ArchVaults.reconcile` over `EpochScope.raised` … (item 319; V06's `under.extend`)", V04's U5 (V04 l. 3210), and V06
builds "the `under.*` adapters … (`raised` and `levelled` included: the arch-vault reconcile …)" at E8 (V06 l. 4236).
(4)'s epoch circuit and contraction, the sweep's epoch C6 runs, and V06's own clauses at E3 (V06 l. 4231: "T-V6-9–11,
46–49, 57–61, 73") — T-V6-11's "V04 laying again the arch vault … in the epoch whose dismantling takes the last run"
(E-V6-3), T-V6-47's "0 arch vaults in a `vault` span under a wall" (V06 l. 4170), the C6 runs of T-V6-11·S, T-V6-47·S
and T-V6-73·S — sit before the epoch-side reconcile exists. The class of VCS-r6-03 and VAT6-r6-03 (minor), not closed
for the epoch side.

**Required change.** E-S10 (adj l. 1243–1244): "at the later of their milestone and M6-U's U3, which lays the arch
vaults (V04 §8)" → "at the later of their milestone and M6-U's U3, which lays the arch vaults (V04 §8), and, for a run
whose wall event is an epoch's, of M6-U's U5 and M6-E's E8, which reconcile them over `EpochScope.raised` (V04 §8; V06
§8)". E-V6-11 (adj l. 1668–1669) adds: "; and T-V6-11's arch-vault re-lay, T-V6-47's arch-vault bar and the state
sweep's C6 runs of T-V6-11, T-V6-47 and T-V6-73 at the later of E3 and E8, which builds the epoch's arch-vault
reconcile".

### PRB7C-TIM-12 — MINOR — the sweep's C12 needs a deck that reaches the frame

**Cell or step.** The sweep's "C12, the deck extended by a frame growth" (adj l. 987–988; E-S0, l. 1080) on T110-2 (4),
(6), (8), T-V6-11, T-V6-47 and T-V6-73.

**Claim.** A frame growth extends only a deck with "an end on the arena's outer ring" (base §2.7 *At the frame*; "(7)
A frame growth's extension … from the old deck's last interior station … to the deck's new end on the new ring", base
l. 2711–2715). None of the sweep's clauses says its raised way ends on the frame's outer ring (H-AQUA's spring lies
"inside the S3 lattice", V06 l. 4057; its viaduct runs from `A` to `B`, V06 l. 4060–4064), while T-V5-14 names the
variant it needs ("a variant whose raised way over the run has a foot on the old frame ring", V05 l. 2565–2566). Every
C12 cell of W4–W14 is "as Wn·C2", the same by construction, so nothing built changes: MINOR (R7-01).

**Required change.** The sweep (adj l. 987; E-S0, l. 1080): "C12, the deck extended by a frame growth" → "C12, the deck
extended by a frame growth (on the clause's variant whose raised way ends on the frame's outer ring, §2.7 *At the frame*,
the frame grown by an epoch before the event)".

### PRB7C-TIM-13 — MINOR — the epoch count's comment and the margin's calibration line

**Cell or step.** V06 §2.10's `walls.raisedCrossings` comment (V06 l. 756) × *Reported* (adj l. 542–546), the
bent-group sentence's count (adj l. 588–589) and W14's last cell (adj l. 702); V12 §3.11's `raisedWays.structure` line
(V12 l. 2177).

**Claim.** The comment counts "crossings of a trace this epoch laid with a standing raised way's deck line" (V06 l. 756);
W14 counts at an epoch "each crossing" of a run re-sectioned on its kept trace (adj l. 702), and the bent group counts a
crossing, "a move being no count" (adj l. 589); no END conforms the comment. V12's calibration line says
`stripMarginM` is "the under-deck strip's one margin cell, read by §4.6 S8" (V12 l. 2177); the crossing table's strip,
(G1)'s reach, the bent group's strip and the fixed-place zone all read the under-deck strip it bounds (V11's END, adj
l. 1813–1816, names them at V11 only). Nothing built changes.

**Required change.** Part H · V06 adds "**E-V6-20 — §2.10's `walls.raisedCrossings`**: 'crossings of a trace this epoch
laid with a standing raised way's deck line' → 'crossings of a trace this epoch laid or re-sectioned with a standing
raised way's deck line, counted as §2.7's crossing table's *Reported* says (a bent-group move no count)'". Part H's
kernel, V02, V03, V08, V12 heading (adj l. 1818–1821) gives V12 one END: "**E-V12-1 — §3.11's `raisedWays.structure`
line**: '(the under-deck strip's one margin cell, read by §4.6 S8, shipped with item 110's rows from M3a)' → '(the
under-deck strip's one margin cell, read by §4.6 S8 and by §2.7's crossing table — its strips, (G1)'s reach, the bent
group's strip and the fixed-place zone —, shipped with item 110's rows from M3a)'", and R7-01 (4)'s list of running units
(adj l. 169–171) adds V12.

## Verdict

Within this lens neither table is yet complete. The crossing table lacks two wall events an epoch makes — the
harbour-mouth chain the waterfront law places across an entrance a raised way spans (PRB7C-TIM-08) and a replay's
burial of runs beneath a standing raised way (PRB7C-TIM-09) — and four of its C9 cells deny a village-epoch path the
engine runs (PRB7C-TIM-03); the way-and-channel table's reading of a channel laid while a span read `open` has no rule
for that channel's silting (PRB7C-TIM-01). Of the three cross-cutting sentences, the bent-group sentence holds in this
lens; the fixed-place sentence is missing one fixed place (the chain, PRB7C-TIM-08); and the lock sentence still meets a
lock that refuses a meeting at UC18 (PRB7C-TIM-02, a J144 finding) and a volume that breaks a declared raised way its
reach keeps (PRB7C-TIM-10). Beyond the sentences, *beneath*'s `vault` reading as Part P widened it has not reached the
epoch's one reconcile scope (PRB7C-TIM-01), V04's END lines for UC18 and its entity row (PRB7C-TIM-02) or three volume
readers (PRB7C-TIM-07); V07's palisade states a REPLACEMENT outcome W14 contradicts (PRB7C-TIM-05) and leaves open which
of its two widths is the band the table reads (PRB7C-TIM-06); and the state sweep, at an epoch, tests a repaired span
where it names a fallen one (PRB7C-TIM-04, where VV56-r6-03's closure fails). Ten majors remain in this lens (0 blocker,
10 major, 3 minor); a further amend pass and probe are needed before repair.
