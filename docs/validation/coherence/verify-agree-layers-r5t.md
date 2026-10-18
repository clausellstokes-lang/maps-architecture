# Verify agree-layers — round 5 (r5t)

> PENDING FABLE REVIEW — opus seat `coherence/verify-agree-layers-r5t`; agreement between units (principle (10)) across
> model, pipeline, rendering, V04, V05 and V07, after assemble-r5 (base `2d84eac2…`, V04 `b79fd290…`, V05 `171db651…`,
> V07 `7747179d…`, each equal to commit `52a16b0`).

PROGRESS (lane `coherence/verify-agree-layers-r5t`, 2026-10-01)
- P0 brief read whole; round-4 findings (VAL-R4-01 – 10) and adjudication-r5 (R5-01 – R5-10, Part H) read: done
- P1 round-4 findings re-checked against the live text, END lines at both ends: done (all 10 closed)
- P2 round-5 hunks in scope re-read subsection by subsection (diff `3310b53..52a16b0`; assemble-r5 §2's per-unit lists): done
- P3 matrix gaps hunted; candidates judged; report and result: done — 4 issues (0 blocker, 3 major, 1 minor)

## 1. Inputs

The brief (whole, with ROUND-5 NOTES and ORCHESTRATION NOTES). `verify-agree-layers-r4t.md` and its result. `adjudication-r5.md`
read whole for this lane: R5-01, R5-02 (whole: the binding texts, the equivalence, every *Ends* line), R5-03 – R5-10, and Part H
under model, pipeline, rendering, V04, V05 and V07 with their END lines. `assemble-r5.md` §§ 1–2. The repair files' HAND-OFFS for
this lane's units (repair-r5-V04, -model, -V07). The live text: the round-5 diff of the base (85 hunks), V04 (13), V05 (5), V07 (28),
plus the V06, V09, V11 and V01 hunks that restate a layer rule. Each touched subsection was re-read whole: §2.7's *Raised ways*
(l. 2525–2659), §2.9's view keys, §4.3's *Lattice and costs* and *The slot*, §4.4 S5a/S5b/S5c, §4.8's lead and *Gates*, §4.11's
`wallToWay`, carve, clock (4) and frame growth, §4.13's raised-way rows, §8.4's casters and heightfield, §8.6, §10.2 (c)–(d),
§11.1's 3-D and CityJSON rows, §11.2's *At a drawn week*, §12.5 and R12-35, II.7.3, II.7.6's Vaults, T110-2 · V04 §1b, §2.6's
arch-vault row, §3.5.0, §3.5.4 (d)–(f), §3.10, §4.3, §5.1, §5.6, UE33, T-V4-63, T-V4-65, T-V4-81, U5 · V05 §2.1, §2.6, §3.16 (4)–(5),
§3.22, §5.6, T-V5-14, T-V5-36, P3 · V07 §1b (W59, W74, W83), §2.2a, §3.4, §3.5, §3.5a (whole), §3.12 (the hand-offs), §3.13, §3.17,
§4.1, §4.3, §4.4, §4.5, §5.5, §5.6 (whole), §6, T-V7-48, T-V7-68, T-V7-69, §8. The agreement matrix (`agreement.md`) was grepped for
this lane's subjects. Scratch: `scratchpad/coherence/agl5/` (diffs, ledger).

## 2. Round-4 findings — re-checked against the live text

| id | disposition (adjudication-r5 Part H) | live text | verdict |
|---|---|---|---|
| VAL-R4-01 | FIX per R5-09 (model) | §2.9 l. 3405–3407 now reads "the layer the tools act on and the view draws whatever its visibility, §8.4 — ground, a sky island's `PlatKey`, or the underground, its band the view key `depthBand` alone, never copied into `workingLayer`; its value V09 §2.4's `WorkingLayer`, its switch V09 §4.2". It agrees with V09 §2.4 l. 518, V04 §5.1 (2), V05 §5.6 (3), and V09 §4.2 l. 1657–1662 on the removed target | **closed** |
| VAL-R4-02 | FIX per R5-02 (V07) | V07 §3.5a (3) l. 1584–1595: ramps, stairs and `vault` under-deck strips are now obstacles, and a tracker crosses only where §4.3 admits. Also updated: §3.5 step 2 (l. 1478), F-V-TRACK (l. 2746), §2.2a's `raised` cell, §6's budget, and T-V7-48's new clause. Pipeline END: §4.3 *Lattice and costs* l. 5651–5654 names "V07's village trackers (V07 §3.5a (3))" | **closed** (both ends) |
| VAL-R4-03 | FIX per R5-02, amended (V07) | V07 §3.5a (4) l. 1604–1615 and §3.17's row (l. 2975, test cell T-V7-48) were replaced as amended, and T-V7-48 now takes the amended clause. Model END: the held-stretch clause in §2.7 (3) l. 2559–2564. Pipeline END: §4.13's wall cell (P12) l. 9019 | **closed as ruled**. The two texts now disagree on the hand-off down, so a new finding follows (VAL-R5-01 / VAL-R5-03) |
| VAL-R4-04 | MERGED into VV34-r4-01 (model) | §2.7's support step (7) l. 2623–2628 present. Also present: `RaisedFoot`'s comment "(the old deck's stations kept, the support step's (7))" (l. 2316–2317); §4.11's frame growth l. 8522–8523; T110-2's "every station of the old deck at its key, position and ring after the growth" (l. 18469–18470); and V04 T-V4-65's at-epoch clause (l. 3148) | **closed** (all ends) |
| VAL-R4-05 | FIX per R5-06 (V07) | T-V7-69 (c) now reads "every building the look stands over (§10.2 (f): … until V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over) drawing the ruined look, a building of a returned unit whose rebuild Works begin in the condition's weeks drawing its Works from that week". Its fixture list adds "a disaster whose rebuild Works begin on some of an end's buildings inside its weeks" | **closed** |
| VAL-R4-06 | FIX (pipeline) | II.7.3 l. 21366: "its labels candidates only while the view draws the layer (visible, or Below the view's working layer; §9.2, §8.4)" | **closed** |
| VAL-R4-07 | FIX (V04) | UE33's E7 (l. 2428): "the layer not drawn — hidden and not the view's working layer (§8.4) — draws none of the underground view's part" | **closed** |
| VAL-R4-08 | MERGED into VRC4T-09 (pipeline) | §10.2 (d) l. 15703: "its units' tone (§8.2's `ruinTone`)", and `CrisisLookRow.lookLevel` (l. 15330) reads "the buildings it stands over". No "districts' tone" remains in the base | **closed** |
| VAL-R4-09 | FIX (V05) | V05 l. 313 and l. 685 carry no MC-07 or MC-05 | **closed** |
| VAL-R4-10 | FIX (pipeline) | §4's class-floor heading (l. 6802–6803) ends "… cite it without values)."; no DXC-06 or KXC-02 is left in the base | **closed** |

Every round-4 finding is closed. The only R5-02 *Ends* line inside this lane that remains open is repair-r5-V04's HAND-OFF to the
adjudicator, which went unanswered (VAL-R5-02).

## 3. Round-5 hunks in scope — what was checked and agrees

* **R5-02 (raised way × wall), base vs V04, V05 and V07.** These agree:
  * §2.7's support step (3), (6) (a)–(d) and (7) against §4.3 P1, §4.1's S7 row, §4.4 S5a *Trace* (2) and *Outer moats*, S5b's
    count, §4.5's casters, §4.8's lead and *Gates*, §4.11's carve and `wallToWay`, and §4.13's `wall` and `river, coast, moat` cells;
  * against §8.4's casters and heightfield and §11.1's glTF and CityJSON rows (the run topped at the soffit);
  * against V04's one reconcile trigger in §1b, §2.6, §4.3 and §6, §3.5.0 *At an epoch*, §3.10, T-V4-63 and T-V4-65;
  * against V05 §3.16's landfall rows (a crossing station's support is its stretch) and §3.22 against §4.3 *The slot*;
  * against V07 §3.5a (3), §3.5 step 2, F-V-TRACK, §2.2a's cell, §6's budget, §3.17's row and T-V7-48's tracker clauses;
  * against V06 §3.7.6 (5)'s bullets.

  No citation of the superseded "(6) (a)" re-siting, "(6) (b) (iii)" or "last support run" is left in the base, V04, V05 or V07.
  The remaining "(6) (a)" and "(6) (b)" citations name the new (a) part-0 ways and (b) channels correctly. The exceptions are
  §2.7 (3)'s hand-off down (VAL-R5-01), the arch vault's door under a later wall (VAL-R5-02), and V07's palisade over a station
  created across it (VAL-R5-03).
* **R5-09** — `workingLayer` agrees in the base, V04, V05 and V09 (VAL-R4-01 above).
* **R5-05 (Find at a drawn week).**
  * §11.2's reader list (l. 16520–16523) names V04's and V05's Find places and V07 §5.5's village reading.
  * V04 §5.1 (6)–(7) and T-V4-81 (j) (at the later of U5 and E6) agree with that list.
  * So do V05 §5.6 (5), T-V5-36 (f) and (i) and its P3 cell.
  * So do V07 W83, §5.5 (1), (3) and (4), §3.17's Find row, T-V7-68's scrubbed-week clause, its cell at the latest of V-M3, M5 and
    E6, and §8 (13).
  * The re-evaluation budget (≈ 100 ms of the frame) is §12.5's and R12-35's, and V07 §5.5 states the same.
* **R5-06 (V07 crisis restatements).**
  * V07 §5.6 (1)'s count is §10.2 (c)'s k with max(k, |`matched`|) and the fire's shortfall (§10.2 l. 15683–15688; V01 §3.16 (5)).
  * §5.6 (3), (4) and (6), W74, §4.5's why row, §3.17's crisis rows and T-V7-69 (c) and (e) read the one hand-over predicate of
    §10.2 (f).
* **R5-04** — §8.6's lead carries §6.3's comparison with its entry week. V04 §5.6 restates the comparison without it (VAL-R5-04,
  minor).
* **Kernel §3.2 (9)** — `Frame.marginShare`'s new readings (`territory.marginShare`, the kept arena's share, `vg.marginM`) match
  V07 §3.2 (1), §2.2a's `vg` cells and §3.15.
* **No problem found in the other round-5 hunks of the members' scope:** §8.2's crisis marks, §8.4's weather fades, §8.8,
  §9.5, §11.2's `looks`, `field`, `over` and the why's view week, §11.6, §12.5, and V05's scheduling cells.

## 4. Issues

### VAL-R5-01 — major — DISAGREE — owner: model (ONE FIX with VAL-R5-03, V07)

**Claim.** The hand-off down keeps a crossing station that a raised way carried down holds on the town enceinte that becomes the
village palisade. Two binding texts written this round give that station two outcomes:

* **The base.** §2.7's support step (3) (l. 2560–2564), from R5-02's held-stretch clause, reads "`wallToWay`, `absorbWall` (§4.11;
  V06 §3.7.6 (5)) and the hand-off down that makes the enceinte the village's palisade (V07 §3.5a (4)) each leave it standing as a
  **free-standing** gate tower or arch carrying the deck, **with no gate law** and no junction with a ring road".
* **V07.** §3.12 (l. 2610–2615) says "the standing fabric survives unchanged" and makes the palisade "the innermost standing
  enceinte". §3.5a (4) (l. 1611–1614), from VAL-R4-03's amended text, keeps the station in the palisade's line: "its support the
  band's stretch under the deck … with its raised gate whose tower carries the deck … — **the one gate at a support the palisade
  carries**". T-V7-48 counts that raised gate among the palisade's gates at supports.

Under the base, the tower stands outside the gate law. Under V07, it is a gate of the palisade. The palisade's gate set feeds:

* VS3 step 7 ("its gates the crossings VS4 made, split at them");
* F-V-GATE ("a trace with no gate after VS4");
* the siege's engines facing "then the gates";
* `gatesAndKeep`'s "the palisade's gates";
* the crisis look's gate-passage keep-out (§10.2 (d); T-V7-69 (b)).

So two builders build two outcomes for one case. (§2.7 (3)'s list is right for `wallToWay` and `absorbWall`, where the line goes.
At the hand-off down the line stays.)

**Required change.** §2.7's support step (3):

* Replace "and `wallToWay`, `absorbWall` (§4.11; V06 §3.7.6 (5)) and the hand-off down that makes the enceinte the village's palisade
  (V07 §3.5a (4)) each leave it standing as a free-standing gate tower or arch carrying the deck, with no gate law and no junction
  with a ring road, the enceinte's record kept while it stands" with "and `wallToWay` and `absorbWall` (§4.11; V06 §3.7.6 (5)) each
  leave it standing as a free-standing gate tower or arch carrying the deck, with no gate law and no junction with a ring road, the
  enceinte's record kept while it stands; the hand-off down that makes the enceinte the village's palisade keeps it in the
  palisade's line as the standing fabric it is (V07 §3.12) — a raised gate the one gate at a support the palisade carries, an
  aqueduct's arch no gate (V07 §3.5a (4))".
* In the same step's parenthesis, replace "a stretch laid after it — a village palisade's among them — takes no station" with "a
  stretch laid after it — a village palisade VS3 lays after it among them — takes no station".

V07's side is VAL-R5-03.

### VAL-R5-02 — major — HANDOFF-OPEN (MATRIX-GAP: the arch vault's door under a later wall) — owner: model

**Claim.** repair-r5-V04's HAND-OFFS (l. 103–111) put an open question to the adjudicator, and no unit closed it. §2.7's support
step (6) (d) (l. 2606–2608) has a wall stretch laid after a raised way end "at a `vault` span … at its arch vault's two
**walled-up** arch mouths, the chamber kept whole". V07 §3.5a (4) (l. 1607) and T-V7-48 say the same of the palisade.

"A walled-up arch" is V04's own term for an arch vault with **no door**. V04 §3.5.4 (d) (1) says "no door is made and
`W_ARCH_VAULT_NO_DOOR` is reported (a walled-up arch)". Yet V04 keeps the vault's one `door` at the midpoint of an open face. Its two
open faces are the grade faces that take a seated building's entrance and windows (§3.5.4 (f); V03 §3.12 (9)). No reconcile runs
for a later wall: a later trace changes no `feet`, `supports` or `spans` (R5-02). T-V4-63 now bars "no arch vault changed by either".

The trace crosses both mouths, so wherever it crosses near mid-span the run's end meets the face over the door. This is a common
case: at CITY a later stage's ring meets an S4 viaduct whose spans inside the town are `land` vaults. Nothing states whether the
door stays, moves or is walled up, or what it then opens onto. One builder walls up both mouths, leaving the vault and any building
seated in it unreachable. Another keeps a door that opens into the wall's masonry. Principle (11) grades an undefined edge on a
normal path as major.

**Required change.**

* **§2.7's support step (6) (d).** Replace "at a `vault` span ending at its arch vault's two walled-up arch mouths, the chamber kept
  whole" with "at a `vault` span ending against its arch vault's two open faces (V04 §3.5.4 (f)), the chamber kept whole with its
  door — where the run's end would meet the door's face over the door, the door moves along that face to the nearest point clear
  of the run's band, in the commit that lays the stretch (a fate in a hand edit's dry run), and keeps opening onto the ground beyond
  it; the far face is closed by the run's other end —".
* **V04's END.**
  * §3.5.4 (d) (1)'s door rule adds "a door that a wall stretch laid after the raised way would cover moves along its face to the
    nearest point clear of the run's band (§2.7's support step (6) (d)), the chamber, its key and footprint unchanged; with no
    clear point on either face, no door, `W_ARCH_VAULT_NO_DOOR`".
  * `ArchVaults.reconcile`'s trigger lists (§1b l. 328, §2.6's arch-vault row l. 867, §4.3's row l. 2577) add "a wall stretch laid
    across a `vault` span's strip (its door only)".
  * T-V4-63's "no arch vault changed by either" becomes "no arch vault's key, footprint or closure changed by either, its door
    moved clear of the run where the run met it", and its fixture's circuit crosses the `vault` span at its door.
* **V07's END.** §3.5a (4)'s "at an arch vault ending at its two walled-up arch mouths" becomes "at an arch vault ending against its
  two open faces, its door kept clear (§2.7's support step (6) (d))".

If the adjudicator rules instead that the mouths are walled up and the door removed, V04 §3.5.4 (d) (1) and (f) and T-V4-63 must say
so in the same words.

### VAL-R5-03 — major — DISAGREE — owner: V07 (ONE FIX with VAL-R5-01, model)

**Claim.** V07 §3.5a (4) (l. 1604–1615) reads every palisade as "a wall laid after the raised way (§2.7's support step (6) (d))". It
keeps a crossing station only for a raised way carried down from a CITY. The base gives a crossing station to every raised way
created across a standing wall:

* by hand, an aqueduct: §7.1 l. 10441–10443 reads "a course meeting an enceinte's trace comes down to a ground vertex before it …,
  while an aqueduct crosses a wall by an arch in the curtain, never a gate";
* §4.8 *Gates* l. 7668–7673 has "by hand an aqueduct, §7.1" take the crossing as a wall opening;
* §2.7's support step (3) holds that station.

The palisade is an `Enceinte` (V07 §3.4 step 7), and V07 (1) admits a hand aqueduct at every rung. So on a palisaded village, a hand
aqueduct drawn across the standing palisade gets a station by the base. Its stretch is held while the deck stands, so V07 §3.4 (8)'s
decay passes over it. The station is taken back into the line as its support whenever VS3 re-lays the trace (§2.7 (6)). V07 instead
treats the station as "a support whose `state` is absent", abuts it, and calls it "never a gate", with no station kept. A station no
stretch lies under becomes a pier with its own ring and `state` (§2.7 (6)), so the two builds differ in the `supports` record, in the
decay and in V04's reconcile.

V07 also calls the carried-down station's "raised gate … or the aqueduct's arch" "the one gate at a support the palisade carries".
The base says an aqueduct's arch is "not a gate (no portal, no gate law)" (§4.8; V06 §3.7.6 (5)), and T-V7-48 counts only the raised
gate. Its "a raised way crossing the circuit makes no gate (its deck passes over)" holds only for a raised way the palisade is laid
after: a hand raised road comes down before the trace (§7.1). Separately, and minor: "The trace passes beneath an `open` span as an
ordinary stretch" leaves out (6) (d)'s soffit cap.

**Required change.**

* **V07 §3.5a (4), opening sentence.** Replace "The palisade is a wall laid after the raised way (§2.7's support step (6) (d)):" with
  "A palisade laid after a raised way — VS3's trace at generation and at every derivation that re-lays it, or a palisade T3 `wall`
  draws — runs on beneath its deck (§2.7's support step (6) (d)):".
* **The open-span sentence.** Replace "The trace passes beneath an `open` span as an ordinary stretch" with "The trace passes beneath
  an `open` span as an ordinary stretch, its top no higher than the span's soffit (§2.7's support step (6) (d))".
* **The carried-down sentence.** Replace "A raised way carried down (V07 §3.12) whose crossing station stands on the enceinte that
  becomes the palisade keeps that station as standing fabric — its support the band's stretch under the deck, held while the deck
  stands, with its raised gate whose tower carries the deck or the aqueduct's arch (§2.7's support step (3)) — the one gate at a
  support the palisade carries." with:

  > A raised way created across the standing palisade keeps its crossing station (§2.7's support step (3)). This covers a hand
  > aqueduct, which crosses by an arch in the curtain (§7.1; a hand raised road comes down before the trace instead). It also
  > covers a raised way carried down (V07 §3.12) whose station stands on the enceinte that becomes the palisade. The station's
  > support is the band's stretch under the deck, held while the deck stands and taken back into the line as its support at every
  > derivation that re-lays the trace (§2.7's support step (6)). A carried-down raised gate, whose tower carries the deck, is the one
  > gate at a support the palisade carries. An aqueduct's arch is no gate: no portal, no gate law (§4.8 *Gates*).

* **§3.17's row** "a raised way over the palisade" adds "; a hand aqueduct across the standing palisade crossing it at one station
  by its arch (V07 §3.5a (4))".
* **T-V7-48** adds: "a hand aqueduct drawn across the VILLAGE fixture's standing palisade — one crossing station on the trace, its
  stretch the station's support and held (no `breached` or `dismantled` there while the deck stands) through a village epoch whose
  decay breaches the palisade, no gate counted for its arch, and the station taken back into the line after Regenerate (keep)".

The model's side is VAL-R5-01.

### VAL-R5-04 — minor — DISAGREE — owner: V04

**Claim.** R5-04 made one comparison for plan damage, stated at §6.3 (l. 10006–10008) and cited everywhere: the element is "compared
only from its entry week into the plan (V03 §5.6 (2) (a)–(b); for an element a restoring event's re-cut mints, the week that
restoration ends …)". R5-04's sweep said V04 needs nothing, but V04 §5.6's lead (l. 2888–2890) restates the comparison without the
entry week: "each plan element shown damaged while the decay level is above 0 and at least the element's keyed threshold (§6.3 *Plan
damage*'s comparison; …)". Likewise UE33's E1, "a building never decayed (level 0) … draw byte-identically", lacks §8.6's new "and
under no disaster look" (l. 14157). V03 draws the plan and its damage, and UE33's E7 carries the look, so nothing built or tested
changes.

**Required change.**

* V04 §5.6's lead: replace "while the decay level is above 0 and at least the element's keyed threshold (§6.3 *Plan damage*'s
  comparison;" with "while the decay level is above 0 and at least the element's keyed threshold, compared from the element's entry
  week into the plan (§6.3 *Plan damage*'s one comparison; V03 §5.6 (2) (a)–(b);".
* UE33's E1: replace "a building never decayed (level 0)" with "a building never decayed (level 0) and under no disaster look
  (§8.6)".

## 5. Candidates judged and dropped

* **V07 (3)'s obstacles omit the feet** that §4.3 makes impassable. The feet are the trackers' join points: V07 (3) *The feet*
  allows merging onto them only. The ramp's footprint is "ramps and stairs", so the two agree (round 4 judged the same).
* **Find's Go there at a drawn week to an island the head no longer holds** (V05 §5.6 (3)). V09 §4.2's "reads as Ground" is a reading
  of the key, and the frame case is V09's own sentence. This is V09's edge, not a disagreement between layers.
* **A wall run beneath a ruined span, or after its raised way is removed** (the soffit cap derived at read). Every reader derives the
  cap from the standing spans, so no two units disagree. It is an edge for the edge seats, not an agreement item.
* §4.13's `wall` cell, V05's landfall rows, V05 §3.22 against *The slot*, V04 §5.1 against §11.2, V07 §5.6 against §10.2 (c), and the
  kernel's `Frame` against V07: all agree (section 3).

## 6. CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read in the live text at the lines cited):

* every round-4 closure;
* the base's "free-standing … with no gate law" against V07's "the one gate at a support the palisade carries" and §3.12's "standing
  fabric survives unchanged";
* "walled-up arch" as V04's term for a doorless vault, beside V04's door rule and T-V4-63's "no arch vault changed";
* §7.1's arch crossing for a hand aqueduct, and V07's carried-down-only station;
* V04 §5.6's comparison without the entry week.

**PLAUSIBLE:**

* that a later ring crossing at mid-span is frequent at CITY. This rests on the door sitting at the face's midpoint and `land` vaults
  being the span rule's default inside built ground; no statistic was run.
* that V07's palisade decay would breach a held station in a V07-only build. This is inferred from V07 §3.4 (8) citing V06 §3.7 and
  not the held stretch.

Design files untouched. Doc checks were not run: this seat changes no design text.
