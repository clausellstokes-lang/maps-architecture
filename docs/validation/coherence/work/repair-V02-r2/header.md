# Repair round 2 — V02 (buildings, stage 3) — lane coherence/repair-V02-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V02-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 23–33.5 pw (was 22.5–32.5) — R2-06 (c); V02 §8.6's new M6b row, + 0.5–1 pw (M6 18.75–28.5 pw, was 18.25–27.5).
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; one FILE line routes every block to docs/volumes/V02-buildings.md. Target: V02 sha256 a11f04ccc93d0fce… (assemble-r1's
# install, live and unchanged at landing); base docs/ARCHITECTURE.md 137ecc0e4fe12c44… (no round-2 assemble has run).
# Each block body is the live subsection with count-asserted substitutions (work/repair-V02-r2/gen.py over edits_a.py and
# edits_b.py: 44 substitutions, each applied exactly once); every untouched line is verbatim.
# Blocks: 28 — 24 REPLACE (## 0; ### 1a, 1b, 1c, 1d; ### 2.2, 2.3, 2.5, 2.6; ### 3.2, 3.8, 3.10, 3.11, 3.18; ### 4.5;
# ### 5.1, 5.3, 5.5; ## 6 (its head text, §6.4 and the new §6.6); ### 7.1; ### 8.3; ## 9; ## 12; ## 13) and 4 APPEND TO
# SECTION (### 2.4: `ExteriorDamage`; ## 5: new §5.7; ## 7: new §7.8; ## 8: new §8.6). Ruling requests: 0.
# Binding rulings applied: adjudication-r2's R2-04, R2-05, R2-06, R2-07, R2-10, R2-13, R2-16, R2-35, R2-36, R2-37, R2-38
# (Part H · V02), with R2-09 where the new tests name pins.
#
# PROGRESS
# - P0 brief read whole (9 issues; ROUND-2 NOTES, NEW OWNER RULES, CONTINUATION, ORCHESTRATION NOTES); adjudication-r2's V02
#   rulings and Part H · V02 read whole: done
# - P1 issue sources, file g items 122 and 123, the canon's routings, the base homes cited (model's and pipeline's landed
#   round-2 blocks, V06's saved round-2 design), every V02 section concerned: done
# - P2 count-asserted edit set over the live V02 (work/repair-V02-r2/edits_a.py, edits_b.py, gen.py): done (resumed after
#   the 07:09 usage-limit cut under the CONTINUE rule; the saved edit set re-checked against the rulings and refined)
# - P3 blocks generated, applied on a copy, checks, result saved, LANDED: done
#
# ISSUES → WHERE FIXED (9 routed ids, 8 distinct defects; 7 FIXED in text, 1 CLOSED by ruling, 0 INVALID, 0 parked)
#  VAF-R0S-03 = VM-R1T-05 (ONE FIX, R2-13). §2.2: the `DormerRow` and `DormerKind` declarations (with DormerKind's two
#        comment lines) deleted, the lead sentence naming "`DormerRow`, `DormerKind` and `PorchKind` are §2.6's"; §2.6: the
#        `LaidWing` and `TierLay` lines replaced by "// `TierLay` and `LaidWing` are §2.7's (V02 §3.15.1 lays them)". The
#        base's declarations (§2.6, §2.7, kept by model's round-2 blocks) carry every field and comment V02's copies held —
#        nothing lost.
#  VAF-R1T-01 (blocker; FIX per R2-16). §3.10's 3.10.1: `squalid` the poor row, `comfortable` the modest row for its
#        discrete cells and the cell-wise interpolation of modest and prosperous at its band centre for its continuous cells
#        (§4.5's band-set paragraph and its discrete-cell rule); the upper-half sentence deleted. §2.3's `CompositionRow`
#        comment (l.453) and §3.2 step 3 (l.815): "discrete cells read §4.5's discrete-cell rule (item 19)". No other V02
#        text states a cut rule (l.817's J-A19.43 citation is the manifested-versus-field band and stays).
#  VAH-r1-13 (FIX per R2-10). §4.5: "filling §11.2's `WhyAnswer` with no new field".
#  VV12-r1-05 (FIX, Part H's second option). §6.4: "≈ 35 µs for the roofscape's facets (V02 §6.2's ≤ 25 µs median with
#        its ≤ 150 µs p99 tail)"; §6.2 gains no figure.
#  VV12-r1-06 (FIX per R2-07). The title block's l.7 reads "file g" with no range — text inside the title's level-1
#        subsection, which R2-07 gives to Assemble to set in place: see ASSEMBLE NOTE below (no block).
#  VV12-08 — CLOSED per R2-04 (J-V2.109 confirmed as E-27's shed ruling); no text change, no block.
#  G123-V02 (NEW DESIGN per R2-38 (4), R2-35 T123-5). The exterior agreeing with the plan's damage: §5.7 (new) with
#        `exteriorDamage` / `ExteriorDamage` at §2.4; the element reading where the plan is in force (a damaged roof bay over
#        a room a hole clipped to its own wing's facets; a broken outer run of a wing's lowest storey a gap in the outline
#        with the rubble spill; a repaired bay patched by V06's `decayPeak`; a wing whose every bay is damaged roofless, the
#        lost upper storey), V03's thresholds and V06's level only, never V02's own; the massing reading where none is; a
#        stale plan never read; no rung raised (§3.11); the `rooms` rung kept `current` through a building's decline so the
#        plan as built stands (§3.11 and §3.8 — V02's end of R2-38 (1) and §2.6 step 7); the `roofscape` cell
#        `rubbleReachM` (§5.3); exports (§5.5; J-V2.112: pictures draw it, glTF, OBJ, CityJSON, GeoJSON and JSON carry it
#        not, VTT and battle maps by §11.1); §1a item 9, §1b row, §1c rows, §1d homes, §2.5 row, §3.18 (d), (e), (f)
#        rows; §6.6 budgets; T-V2-59 (takes T123-5) in §7.8; §8.6 (M6b, at the later of M6b and V03's item-123 step,
#        R2-36); J-V2.112; X34, X36, X37; §12 CONFIRMED and PLAUSIBLE lines; census. Every verifier version is met:
#        agree-fabric (holes over rooms, gaps in the outline, same thresholds, test: §5.7 (2), T-V2-59); agree-time (same
#        thresholds at V06's level; `MassingRef`, `Composition` and footprint unchanged; solid monument, no stored plan,
#        deck building: §3.18 (e); exterior equal to the plan at every level: T-V2-59 (a)); edges-world (V03's thresholds,
#        never V02's: §5.7 (2), J-V2.112); vol-V01-V02 (1)–(8): §5.7 (2), (5), (7), §5.5, §1b, §1c, §3.18 (e), T-V2-59
#        (a)–(f), J-V2.112.
#  G122-V02 (NEW DESIGN per R2-37 (4), (7), R2-36). The ruined look of a disaster's buildings: §5.7 (1)–(8) — item 123's
#        damage at the higher of the building's decay level and the `disaster` row's `lookLevel` by severity, on every
#        building of every district V01's `disasterDistricts` returns (V07's ends at THORP, HAMLET, VILLAGE), with no
#        per-building share (verify-vol-V01-V02's "keyed share by severity" per building is overridden: R2-37 (4), Part H);
#        standing by §2.7's reader rule, DR44 and its admission (`ViewOpts.viewAs`), §2.9's `crises` (`follow`, `off`,
#        `preview` at `previewSeverity`); the massing reading's tone and dash (item 112's second cue); one flavour — a fire
#        blackens (J-V2.113, with why a flood's and an earthquake's marks are the damage itself); the hand-over by V06's
#        `crisisLookYields` (no week draws both the look and the rebuild's scaffolding; a `decay` Works never ends it); no
#        patch left by a look; per band (§5.7 (5)); exports (§5.7 (7), §5.5: pictures draw it, battle maps in the image
#        only); §3.18 (b) village row, (c) Show crises row, (d), (e), (f) rows; §6.6's lazy per-tile line; T-V2-60;
#        §8.6; J-V2.113; X35, X36. Every verifier version is met: agree-fabric (§5.7, T-V2-60); agree-time (the look as
#        item 123's damage at a look-only level by severity; never `MassingRef`, `Composition`, model or hash; keyed by the
#        condition's id through its units and by the lineage through the thresholds; a look over a real decay at the
#        higher level; a standing Works; a deck building; T-V2-60 (a)–(d)); edges-world (deck building, tiered stack,
#        Works: §3.18 (e), (f)); vol-V01-V02 (2)–(10) at §5.7 (4)–(8), §1b–§1d, §3.18, §6.6, T-V2-60, J-V2.113, its (1)
#        overridden as above.
#
# RECEIVING ENDS WRITTEN THIS ROUND (R2-05): R2-35's T123-5 named by T-V2-59's head; R2-13's two V02 citations; R2-16's
#  three V02 sites; R2-10's V02 citation; R2-36's placement of V02's parts (§8.6); R2-37 (4), (6), (7) and R2-38 (1), (4)
#  at V02 (§5.7, §3.11, §3.8). T-V2-59 (d) and T-V2-60 (c) name the `item123.damage` and `item122.crises` pins as V12's
#  (V12 §2.13); V02 registers no pin of its own, so R2-09's registration list is unchanged.
#
# ASSEMBLE NOTE (R2-07; VV12-r1-06). docs/volumes/V02-buildings.md line 7, inside the title's level-1 subsection (above the
#  first '## ' heading): replace the one occurrence of
#      owner items 1–101, file g 102–120, file f 200–585
#  with
#      owner items 1–101, file g, file f 200–585
#  No other text of the title block changes; the line is not a marker line (principle (8) untouched).
#
# HAND-OFFS for round 3's verifiers (R2-05 (3): cross-unit ends no ruling names; V02's side is written, and each is also
#  a row of V02 §13 with its stand-in):
#  - V03 (X34): the damage layer's two element kinds V02 reads — each roof bay over a room as a ring, each outer wall run
#    of a wing's lowest storey as a span, each intact, damaged or repaired at a level — and a roofless building's (roof
#    kind `none`) roof bays all damaged, so the plan agrees with the model's roofless state (T-V2-59 (b)).
#  - V01 and V07 (X35): `disasterDistricts` answering a preview (no overlay) keyed on the look kind in the condition's
#    stead, as §10.2's placement (d) keys a preview, and returning the calamity's type with the districts.
#  - V06 (X36): V02 cites `decayLevel`, `decayPeak` and `crisisLookYields` by the names of V06's saved round-2 design
#    (V06 §3.22, §3.23); if V06 lands other names, V02's citations follow them.
#  - rendering, base §8.2 and §8.8 (X37): the Works `decaying` row's ridge gaps drawn, where a plan is in force, as V02
#    §5.7's holes; the drawn week, `crises` and the effective knowledge key in the tile key of a tile holding a building
#    whose damage level is above 0, as the drawn week is for a Works mark.
#  - scope (R2-06 (b)): V02 §8's total is 23–33.5 pw (was 22.5–32.5); §16 and INDEX read it from this file.
#  - doc checks: a base text citing V02 §5.7, §6.6, §7.8 or §8.6 needs an S2 allow row in the existing volume-prefixed
#    form (S2 reads the base's headings only).
#
# WORDS (principle (9)'s shrink goal). V02 85 913 → 91 697 words (+5 784, +6.73 %). Removed: RESTATEMENT 202 net (§2.2's
#  `DormerRow`/`DormerKind` and §2.6's `LaidWing`/`TierLay` declarations, now cited; −209 with the lead's +7);
#  DUPLICATED MECHANISM 2 (R2-16: V02's own band-anchoring rule for discrete cells withdrawn for §4.5's one rule);
#  NARRATION 0; VERBOSE PROSE 0. Added: owner items 122 and 123 at the building, new design at build depth (+5 978, the
#  brief's NEW DESIGN rule: an addition, never a change of another decision); VV12-r1-05's exact citation (+10). The unit
#  grows: what holds it is irreducible owner-item content; no other text of V02 was in this round's routed scope.
#
# CHECKS. Dry run (apply-blocks.py on a copy of the live V02): 28/28 applied, 0 skipped, audit 0 not OK, output
#  byte-identical to the edited volume (sha256 dad2b5bce0a72f00…), headings 73 → 77 (+§5.7, §6.6, §7.8, §8.6, none
#  removed), fences balanced (14 → 16 fence lines), title block unchanged, the PENDING FABLE REVIEW line kept.
#  refcheck (work/repair-V02-r2/refcheck.py): 46 section references in the added lines, 0 unresolved (V02's in V02, the
#  base's in the base with the landed round-2 base blocks, the other volumes' in the live volumes); the new ids T-V2-59,
#  T-V2-60, J-V2.112, J-V2.113, X34–X37 each defined once. Doc checks, PROVISIONAL — WARNING: reference corpus INCOMPLETE
#  (captures, research/patreon, research/devlogs, research/ftg-docs, research/external absent here; NOT authoritative):
#  against the unrepaired V02 the new text adds C1 0, C2 0, C4 0, S1 0; C3 +29 runs, every one a generic plain-English
#  phrase of the new prose ("a building with no roof", "is drawn in the view", "each side of the outline"), no copied
#  identifier, table or list; S2 +41, every one V02's own pointer "V02 §5.7" (32) or "V02 §6.6" (9) read against the
#  base's headings, each resolving in V02.

