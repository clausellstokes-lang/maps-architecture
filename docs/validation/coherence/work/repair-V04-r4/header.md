# Repair round 4 — V04 (the underground) — lane coherence/repair-V04-r4

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V04-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V04-underground.md. Live unit: V04 as assemble-r3 left it
# (sha256 0e3bcacd8f5cc616…, 520 064 bytes, 3 605 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (docs/validation/coherence/work/repair-V04-r4/build.py over edits_a.py: 36 edits, each applied exactly its
# asserted count, each tagged with its issue id or ruling; edits.log, diff.txt there); every untouched line is verbatim.
# Blocks: 18, all REPLACE of leaf subsections — §1.2, §1.3, §1b.1, §1b.2, §1b.3, §2.6, §3.5, §3.10, §3.11, §4.1, §4.3,
# §5.1, §5.4, §5.6, ## 6, ## 7, ## 9, ## 13. No heading retitled or added, no whole-volume REPLACE, the title block
# untouched. Ruling requests: 0.
# Binding rulings applied (adjudication-r4, Part H · V04): R4-01, R4-02, R4-04, R4-09, R4-11, R4-12; R3-01 – R3-03 stand.
#
# PROGRESS (lane `coherence/repair-V04-r4`, 2026-10-01)
# - P0 brief read whole (4 issues routed; ROUND-4 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r4's TOC,
#   R4-01, R4-02, R4-04, R4-09, R4-11, R4-12 and Part H · V04 (4 FIX, 1 END line) read whole; adjudication-r3's
#   R3-01 – R3-03 read: done
# - P1 issue sources (verify-agree-layers-r3t: VAL-R3-03, -05, -09; verify-agree-proof-r3t: VAP-r3-03 – 05); live V04
#   §1.2, §1.3, §1b.1 – §1b.3, §2.6, §3.5.0 *Foundations* and *At an epoch*, §3.5.4 (d), §3.10, §3.11 (UE20, UE27, UE32,
#   UE33, UC18), §4.1, §4.3, §4.4, §5.1, §5.4, §5.6, ## 6, ## 7 (T-V4-62 – T-V4-65, T-V4-81, T-V4-82), ## 8, J-V4.127,
#   J-V4.130; the landed round-4 texts this unit meets — model's §2.7 support step (6) (a)/(b) and `RaisedFoot`, V09's
#   §4.2 and §4.21.10 (7)–(8), rendering's §11.2 *At a drawn week*; the base's §3.2 (9), §7.1's binding table (T3 `wall`,
#   T4 `road`, T9 `shape`), `RaisedWayRecord`; V05 §3.16's hand landfall; V06 §2.1's `EpochScope.raised`, W64,
#   §3.15.2; the canon's glossary row "working layer": done
# - P2 the count-asserted edit set (36 edits, 18 blocks): done
# - P3 dry run on a copy, references, doc_checks, words: done
# - P4 report, result saved, LANDED: done
#
# DISPOSITIONS — Part H · V04: 4 issues, all FIX, each FIXED in the text (none INVALID, none MERGED); 1 END line written
# - VAL-R3-03 (major; FIX per R4-09, amended — one trigger in place of the three listed cases): `ArchVaults.reconcile` and
#   the `foundationObstacles` re-read run in the commit of every change to a raised way's `feet`, `supports` or `spans`,
#   whoever makes it. The three statements read so: §1b.2's `ArchVaults.reconcile` row (the T2 vaults step "after
#   generation's last support run, §2.7's support step (6) (a)" — so an S5a trace needs no trigger of its own; the
#   commit of every such change, among them an edit naming the raised way — its add, removal or re-shape, a `setAttr` on
#   its spans (a span's `use` included), crossings, `clearanceCm` or `spanSpacingCm`, a hand `repairRaised` —, a hand
#   landfall (V05 §3.16 (4)) and a hand trace through one of its stations (§2.7's support step (6) (b) (iii)); at an
#   epoch V06's `under.extend` over `EpochScope.raised`: an epoch's raised-way op, a landfall, a circuit's,
#   contraction's or re-anchored stretch's crossing station, the frame growth's deck extension, §3.2 (9)); §2.6's
#   arch-vault lifecycle row (create cell the same trigger; regenerate cell "its footprint re-laid between its span's
#   raised-way piers' inner faces at each reconcile" and "its span is gone or set `open`", reconcile's step (3)); §4.3's
#   edit row (one row: "any change to a raised way's `feet`, `supports` or `spans` by an edit — among them …; the same
#   change at an epoch … runs the reconcile and `Foundations.apply` over `EpochScope.raised` instead"; its outcome "its
#   vaults laid, re-laid between their raised-way piers' inner faces or deleted (V04 §3.5.4 (d) (1)–(3))" and "a new or
#   widened raised-way pier (a crossing station's band stretch)"). The former separate row "a span's `use` set | that
#   span's arch vault laid or removed | the rest" is folded into it, its outcome kept verbatim in a parenthesis ("a span's
#   `use` set lays or removes that span's arch vault alone"); equivalence: the folded row's extra re-reads (the
#   foundation reading, the terminal cistern) give the same result for a `use` edit, which moves no support, so nothing
#   built changes. T-V4-63 adds VAL-R3-03's fixture with R4-09's frame growth: a CITY viaduct holding a `vault` span with
#   its arch vault, crossed through one of its stations by an epoch circuit and, on a second run, by a hand `drawWall`,
#   and an aqueduct whose deck an epoch's frame growth extends to the new ring — after each commit every arch vault's key
#   names a standing span of use `vault`, its footprint lies between that span's raised-way piers' inner faces (a
#   crossing station's support its band stretch), no chamber under an `open` span, each new `vault` span holding its
#   chamber, `foundationObstacles` reading the new supports in that commit; the hand case's undo restoring the vaults
#   with the same ids and footprints. Not applied from the required change (per R4-09): the listed-cases wording ("whose
#   stations §2.7's support step (6) re-sites … slide or are omitted") — under R4-09 (b) a standing raised way's stations
#   are never moved, added or omitted after generation; a later trace takes one station as its crossing station, its
#   support becoming the band's stretch together with the pier's former ring. V06's END (`EpochScope.raised`'s comment
#   and W64) is V06's line this round (Part H · V06); V04 cites V06 §2.1 for the field.
#   Sweep of the same trigger (R4-01 (2)): §1b.3's raised-way edit row (re-shape by `moveVertex` or a `setAttr` on its
#   `clearanceCm` or `spanSpacingCm`, and a hand trace through a station — `drawWall`, or `moveVertex` on an enceinte's
#   trace — wired to V04's reconcile and foundation re-read, tool T3 `wall` added, T9 `shape` named for its `setAttr`, the
#   undo restoring the vaults' ids and footprints); §3.5.0 *At an epoch* (`Foundations.apply` reads "the raised-way piers
#   of the raised ways in `scope.raised` (V06 §2.1: every raised way whose `feet`, `supports` or `spans` the epoch
#   changed, a trace's crossing station and the frame growth's deck extension among them)"; "an epoch op removes no
#   obstacle" adds "a crossing station its pier's former ring (§2.7's support step (6) (b) (iii))", which R4-09 (iii)
#   states); §3.10's epoch reconcile bullet (over every raised way the epoch changed; re-lays the vaults of a raised way
#   a circuit, contraction or re-anchored stretch crossed through one of its stations, or whose deck the frame growth
#   extended — a new `vault` span's vault laid, one whose span is gone or `open` deleted); ## 6's edit budget ("a change to
#   a raised way's `feet`, `supports` or `spans` by an edit (its add, re-shape or removal, a hand trace's crossing
#   station) adds ≤ 2 ms", the span's `use` edit's 1 ms kept).
# - VAL-R3-05 (major; FIX per R4-12): §5.1 *Find on Below* — `underFindPlaces(doc, ids)`'s `doc` is "the model the view
#   draws"; item (6) adds the re-read at each change of §2.9's `week` (a timeline scrub, a host's `view.set { week }`);
#   new item (7) *At a drawn week*: at a drawn week whose frame is not the head, `underFindPlaces` reads that frame for the
#   ids §11.2's listing gives at that week (a building matched by its use at that week, never its head use); each glow
#   shape, depth band, ghost pin's band, the band ladder's counts and **Go there**'s band are the frame's; a match the
#   frame lacks is neither glowed, pinned nor counted; (5)'s admission reads that frame; Show gaps' units Below are V01
#   §5.4 (3)'s `gapUnits` at that week. The rows at §1b.1, §1b.2 and §2.6 add "and at each change of §2.9's `week`, over
#   the model the view draws (the head, or a history frame, V06 §3.15.2)" (V06's own phrase, W92). Beyond the required
#   change, for principle (11): UE32's E8 adds the drawn-week change, and T-V4-81 a clause (j) (the METROPOLIS fixture
#   advanced over epochs, one extending its catacomb complex and re-cutting an undercity district, scrubbed to a week
#   before it: glow shapes, bands, ghost pins' bands, ladder counts and Go there's band those of the frame's reading, no
#   glow over a gallery the frame lacks, the gaps V01's `gapUnits` at that week, the head's reading back at the head).
#   V05's and V09's ends are END lines under their headings (V09's landed: its §4.21.10 (7) passes the model the view
#   draws to `underFindPlaces`, the reading V04 now states).
# - VAL-R3-09 (minor; FIX per R4-04): §5.6 (1) reads "at the village rungs V07 §5.6 (3)'s units, its ends or an end-less
#   thorp's toft groups, all of part 0's plots (V01 §3.16 (1)) — so no look stands over it"; and, per R4-04 (b), its
#   look clause reads the one predicate: "Where a disaster look stands over its building (item 122 (d): a building of one
#   of the look's units, §10.2 (d), on which V06 §3.22 (3)'s `crisisLookYields` is not yet true, and every building of
#   a preview's units; V03 §5.6 (4))". Sweep (R4-01 (2)): UE33's E7 "a church in a ruined district" → "a church of one
#   of the look's units (§10.2 (d))"; J-V4.130's "under a disaster's look over the building" → "where a disaster look
#   stands over the building (until V06 §3.22 (3)'s hand-over)". T-V4-82 (i)'s fixture ("ruins the district of two
#   churches") is a town-rung fixture and stands.
# - VAP-r3-05 (major; FIX per R4-11): T-V4-82 (i) drops "at a key that withholds the condition" and adds "under View as at
#   `public`, `local` and `secret` the same drawing, the condition `public` (§7.7's DR44), and a `none`-row condition
#   carried beside it changing no crypt's drawing at any key" (R4-11's form, the `none`-row clause in V04's words). A
#   search of V04 finds no other text staging a withholding key for a look-bearing condition.
# END line (Part H · V04):
# - END of VAL-R3-01 (V09; R4-02): §5.1's lead reads "When the underground layer is drawn — visible, or Below the view's
#   working layer (§8.4) — one depth band draws at a time" as given.
#   Sweep of R4-02 (R4-01 (2)) — V04's restatements of what the view draws and who switches the working layer:
#   §5.1 "A document opened with the underground drawn"; §5.1 (2) **Go there** "makes Below the working layer and sets
#   `depthBand` … — view keys only, Below drawn whatever its visibility (§8.4), no event sent (item 120 (a); V09 §4.21.10
#   (8))"; §5.4's label candidates "while the underground is drawn — visible, or Below the view's working layer (§8.4) —"
#   (rendering §9's candidate set as its END reads); ## 6 *View* "Showing the layer (its toggle, or Below made the view's
#   working layer, §8.4)"; UE32's E7 "the layer not drawn — hidden and not the working layer"; T-V4-81 (b) Go there
#   "0 events logged and `LayerSpec.visible` unchanged". V04's own name "active layer" is the canon's glossary term
#   **working layer** (V09 §4.2's `workingLayer`, principle (2)): §1.2 ("While Below is the working layer"), §1.3 (the
#   working-layer control is V09's), §5.1's PageUp row ("with Below the working layer, the band"), ## 13's V09 row. V04
#   §4.1's "showing the underground layer makes it the active layer until the user picks another" coupled the
#   visibility toggle (a logged `setLayer`) to the working layer, a switch R4-02 and V09 §4.2 do not list (the view
#   bar, Find's Go there, a clerk's `useTool`) — a second outcome for one case; it now reads "The toolkit's layer is the
#   view's working layer (V09 §4.2's switch, a per-viewer view key; Below drawn whatever its visibility, §8.4): while Below
#   is the working layer …" (precedence: V09 §4.2 is the working layer's home, V04 already naming the control V09's).
#   With it, UE20's E7 ("with the underground hidden the tools act on the ground") — which contradicted R4-02's "a layer
#   toggled off while it is the working layer stays drawn" — reads "with Ground the working layer the tools act on the
#   ground …, the underground hidden or shown; with Below the working layer they act Below, a hidden underground drawn
#   in that view (§8.4)", and UE27's E7 "the layer hidden — not drawn, or drawn in a view whose working layer is Below".
#   ## 7's parity paragraph ("with a parity preset on and the layer hidden") is the default view and stands.
#
# HAND-OFFS (R3-01 (3), R4-01 (2): ends no END line names, for round 5's verifiers; none is open wording in V04)
# - V09: V04 §4.1, UE20's E7 and UE27's E7 now read V09 §4.2's working layer alone (no toggle coupling); V09 §4.2, row 21
#   and T-V9-83 already agree — a verifier checks the pair.
# - model (§2.7's support step (5), §3.2 (9)): V04 §3.5.0's "an epoch op removes no obstacle" holds while a frame
#   growth's deck extension keeps every station of the old deck (it adds stations on the extension only); if the
#   extension's re-derivation can move an old station by (5)'s p ÷ 2 rule, a footing would leave and V04's collapse-only
#   `Foundations.apply` would no longer equal a regeneration of the same state (T-V4-65) — the base's text decides.
# - V06: `EpochScope.raised` and W64 (END of VAL-R3-03 under V06) are the field V04 §3.10, §3.5.0 and §1b.2 now cite
#   (V06 §2.1); V05 §5.6 (2)–(5) (END of VAL-R3-05 under V05) the islands' half of V04 §5.1 (7); V01's `gapUnits` at a
#   week (VV12-r3-03, V01's FIX) the reading V04 §5.1 (7) names.
#
# CHECKS (on the expected volume; scratch rV04r4)
# - apply-blocks (docs/validation/amendments-b/apply-blocks.py) dry run over a copy of the live V04 with these blocks:
#   19 found, 18 applied, 1 skipped (the FILE routing line, read by the assembler's route.py, never a block), audit
#   not-OK 0; headings 59 → 59, fences balanced (12 → 12), title block unchanged, PENDING FABLE REVIEW lines 1 → 1; output
#   byte-identical to the generator's V04.new.md (sha256 6aebc1e136c8778c…, 527 003 bytes, 3 628 lines); the rationale
#   (a throwaway input) unchanged. The live V04 was unchanged (0e3bcacd…) from the snapshot to the dry run.
# - references (assemble-r3's refs.py on mirrors of the live set and of the set with this V04): V04 resolved 2 747 →
#   2 800, ambiguous 1 → 1 (the pre-existing one), external 11 → 11, broken 0; every other unit's counts unchanged.
# - ids: no T-V4, J-V4, UE or UC id added or removed; T-V4-81 gains a clause (j); no review id (R2-nn, R3-nn, R4-nn, a
#   verifier issue id) in any added line (69 added lines scanned).
# - doc_checks.py --heads the base: WARNING reference corpus INCOMPLETE (captures, research/patreon, research/devlogs,
#   research/ftg-docs, research/external missing) — NOT authoritative, provisional: live → new C1 0 → 0, C2 0 → 0,
#   C3 218 → 219 hits (the new: "re read in the same", common phrasing, no reference content), C4 0 → 0, S1 0 → 0,
#   S2 147 → 153 hits, unreviewed 2 → 2 (the pre-existing §3.24 pointers).
# - words (wc -w): 83 268 → 84 394 (+1 126, +1.4 %). The growth is the design the issues and rulings require (the single
#   trigger at five homes and its fixture, the drawn week's reading, its edge row and test clause, the look predicate,
#   the knowledge clause, the working-layer conformance); the one shrink source that applies is restatement — the
#   span's `use` row folded into the one trigger row of §4.3 (−1 row, ~10 words) — and none of the others applies to a
#   repair of this scope.

