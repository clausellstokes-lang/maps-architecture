# amendments-c closing — the Fable seat's confirmation of repair round 3 and the hand-fix list (bundled pass c + d + e)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/closing; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned validate.md, assemble-r3, five verify-r3 reports, live subsections the 26 issues name | done
ITEM confirm-29: planned the validator's 29 issues (33 ids) against design 70ddb6e3… / rationale e138da23… | done (scratch close-c/probe29.py: 29 FIXED)
ITEM consolidate-26: planned the 26 verify-r3 rows de-duplicated, each claim checked on the live text, one required change each, anchors counted | done (§2: 19 issues; closing-handfix-rows.py: 59 rows, every anchor once; dry run doc-checked exit 0)
ITEM rulings: planned the closing seat's rulings where proposals conflict | done (§3)
ITEM summary: planned docs/validation/amendments-c/SUMMARY.md for the owner | done as text: the harness refused the file write ("subagents should return findings as text"), so the owner's summary is returned in the lane's structured output (field summary_md) for the parent to place; not written by another route
ITEM close-out: planned queue row, LANDED line | done (queue row A-amendments-c/closing; LANDED line)

Lane `amendments-c/closing`, 2026-09-28. Documents judged: `docs/ARCHITECTURE.md` sha256 `70ddb6e3…` (17 305 lines,
2 298 461 bytes, 147 headings) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `e138da23…` (2 316 lines), as assemble-r3
installed them. This seat edits no design text: the issues of §2 go to the hand fix.

## Outcome

* **The validator's 29 issues (33 ids) are all FIXED** on the installed text (§1): 20 by the required wording and 9
  with a deviation or an extension that the repair seat recorded and its round-3 verifier accepted. Two majors are among them: the ring
  blocks that replaced the unbounded ring positions (VRC2-01), and the 16-bit full-precision path (VRC2-03). None is
  returned.
* **The round-3 verifiers' 26 issue rows fold into 19 issues** (§2): 1 major and 18 minor. By owner: rendering 5,
  determinism 4, pipeline 4, scope 4, model 2, kernel 0.
  * Every claim was checked on the live text.
  * The two executed claims were re-run here, byte-identical: the door light on the lattice (VD3-01, VD3-02) and the
    export window by scale (VRC3-04).
  * Every change is written as a data row of `closing-handfix-rows.py` (this folder). That gives 59 sub-changes, each
    anchor found exactly once in the live files. The rows were applied to scratch copies, and
    `doc_checks.py --sections "0,2,4,5,6,7,8,10,12,13,16,PART II,Judgment calls"` exits 0 on the result.
  * On the result the reference resolver finds only the 2 baseline externals, and the judgment index and Part A hold
    736 = 736 rows.
* **The one major** is VD3-02, which predates round 3 but was exposed by it. §5.3's light row asks every light to stand
  inside its host face. A door light stands on its building's facade, rounded to the 1 cm lattice, so it lies just
  outside the footprint half the time (50.4 % of 40 000 checks, executed). The stage-end check would therefore reject
  about half the door lights of every lit map. The fix accepts a door light within half a lattice diagonal of the ring.
* **The closing seat's rulings** (§3) settle the five places where the verifiers offered alternatives or differing
  texts:
  * the hand lantern's row and measurement move to M4;
  * VRC3-01 takes its main mechanism, with the casters following the elaboration cache;
  * VRC3-04 takes its main mechanism, a law by export scale rather than a refusal;
  * the concealment comment gets one merged pointer;
  * the lifeline closure starts from the district's ring.
  The seat also adds the lifecycle ripples the verifiers' lifeline fix implies: which closure creates the `dug` system,
  and the registry's keying.
* **No issue needs the owner.** Each is a repair inside a ruling already taken, or a closing ruling recorded as a
  vetoable judgment call (J-A66.72 new; J-A68.93, J-A68.90, J-A68.73, J-A68.92, J-A66.01 and J-A63.41 restated).
* **Held parts stay out** of both files (§4): items 52, 35 (support), 60 (support), 68 (g), 68 (support) and 50 (the
  MFCG clause).

## 1 The validator's 29 issues, re-checked on the installed text (design `70ddb6e3…`, rationale `e138da23…`)

Method: a probe script (scratch `close-c/probe29.py`, output `probe29.out`) searched the whitespace-normalised and the
markup-stripped design and rationale files for each issue's required new text and for its retired text: 80 probes.
78 passed as written. The other two were over-broad probes, and both read correctly in place:
* "whatever the window" now occurs twice. Once it is the ring blocks' own bound (§8.8: "3.75 MB at tile DPR 1 … 5.5 at
  3, whatever the window", a true bound after VRC2-01's fix). Once it is §12.8's export line, which VRC3-04 now
  corrects.
* `validateEdge` survives once, in Part F's verbatim history, as validate.md ruled.
The five round-3 verifiers had each re-read their part's fixes and found all of them FIXED. This table confirms that
independently and names each deviation.

| id | sev | owner | verdict | evidence on the live text (and the deviation, where one was recorded) |
|---|---|---|---|---|
| VRC2-01 | major | rendering | FIXED (equivalent) | §8.8 "Every farther position is held by a **ring block** (J-A68.90)", the counts "326 … 437", "the blocks together ≤ B"; §12.7 "per **ring block**"; §12.5 "**Pre-decided fallback:**"; §8.3's mountainous row. The seat chose ring blocks over the proposed j₀ = 16 plus a frame-wide far field, whose receipt showed 28 MB. verify-rendering-r3 recomputed every worked case and accepted it. Follow-ons: VRC3-01, VRC3-04 |
| VRC2-03 | major | rendering | FIXED | §8.4 (g) "in 16 bits: whole centimetres above each one's datum, rounded up"; §8.8 "Q_f = 2Q"; the worked cases 191.5 / 106.5 MB; "one byte, rounded up) — the traversal unchanged" 0 hits |
| V-MC2-01 | minor | model | FIXED | the three texts verbatim; "an S0 input (§2.7)", "as an S0 input", "that S0 reads" 0 hits |
| V-MC2-02 | minor | model | FIXED | §2.7 `sources` verbatim; "the raiseGrade that buried a town" 0 hits |
| VPR2-01 | minor | pipeline | FIXED | §4.7 S10b "… and in S10a's band-range re-homing (§4.5 (5); J-A72.50)" |
| VPR2-02 | minor | pipeline | FIXED (equivalent) | §4.7 (1) "It is resolved when the institution is first placed — and again only when a dossier event withdraws …"; "(2)–(6)" in place of the validator's "(2)–(4)", which is correct because (5) places `hidden` and (6) places `underground`. Follow-ons: VPR3-02, V-MC3-01 |
| VPR2-03 | minor | pipeline | FIXED (equivalent, wider) | §4.11 "on the `buried` and `dug` parts, which no stage re-derives at an epoch — a buried town, laid from a history scar at generation or made by a `raiseGrade`, and the passages access edits dig — … by `corridorUnion` (§3.7), which draws nothing". Follow-on: row 7 (4) of §2 |
| VPR2-04 | minor | pipeline | FIXED | II.7.6 "a history scar's buried town by the `buried` row's `scarSeverity` instead, drawing nothing"; the `chance` comment verbatim |
| VPR2-05 | minor | pipeline | FIXED | II.7.6 "its floors laid at … — its old grade, at which *Depth bands* lays a buried town (above)" |
| VPR2-06 | minor | pipeline | FIXED | `params` "scarSeverity, scarBaseCm, scarGainCm (the buried row's generation-time scar rule)"; the valued form 0 hits |
| VPR2-07 = VD2-02 | minor | determinism | FIXED | §7.7 F4 and the `impaired` row "the impaired institution's own dial term only (§4.5 (6) …)"; "the power slice's dial only" 0 hits |
| VPR2-08 = VS2-02 | minor | scope | FIXED | §14 "(catacomb, cavern, quarry, vaults and, at generation, a history scar's buried town), II.7.3's" |
| VD2-01 | minor | determinism | FIXED (reworded) | §7.4 "keeps its fraction of the ring edge its point lies on … so it stays on the moved facade whether the warp slides or turns it"; the entrance-vertex wording 0 hits in the design; J-A68.73 Part A records the rejected shift. Follow-on: VD3-01, because the reworded rule is undefined off the lattice edge |
| VD2-03 | minor | determinism | FIXED | §7.7's head: "a pointer names one as §7.7 layer n, while §7.7 item n names the dossier contract's item n"; "§7.7 layer 2" 27 plus §7.1's "§7.7's layer 2"; "§7.7 layer 1's outcome targets". Residue: VD3-04 |
| VD2-04 = VS2-01 | minor | scope | FIXED (equivalent) | §13.2 "a warp and a `moveVertex` over a lit street with an inn …"; §16 M3b "… but its tunnel, access-point and Works clauses", M4 "and the lit-street warp fixture's tunnel, access-point and Works clauses". The seat wrote "tunnel" for "tunnel-light" to clear a C4 hit, and recorded it. Follow-on: VS3-01 |
| VD2-05 = VS2-05 | minor | scope | FIXED (equivalent) | J-A81.01 index "\| §7.7 item 15, §1.1, §14 \|"; Part A "(§7.7 item 15, §1.1, §14, D-33; …; repair r2, VD1-01)". The index's own form "item 15" replaces the bare "§7.7" and clears a C3 digit run |
| VRC2-02 | minor | rendering | FIXED (equivalent) | (a) The blocks are read from the city band, which the tile worker holds whole (J-A68.93, a recorded vetoable choice), and the first ring by a band request (§8.9: "and, after the visible tiles', the first-ring positions round them"). (b) The key is "(stop, its order, its indices, tile DPR, its level)". Follow-on: VRC3-01 |
| VRC2-04 | minor | rendering | FIXED | §8.4 (c) "lengthened by at most that cell's diagonal"; §8.3's rows "the diagonal of §8.4 (c)'s floor cell"; J-A68.90 "√2⁄128 (≈ 1⁄90)" |
| VRC2-05 | minor | rendering | FIXED | §8.1 `surfaceTopCm` "never one of its own (item 6; J-A68.93)"; item 6 "never one taken from the transient list whose extent it sets"; §11.1 "That R takes Z from the city band's `surfaceTopCm` the generation worker keeps" |
| VRC2-06 | minor | rendering | FIXED | §8.4 (f) "the CPU reference evaluates the lantern only at a pointer point a test supplies"; §8.3's hand-lantern row; J-A68.92 restated. Follow-on: VRC3-05 = VS3-04, VS3-05 (its milestone) |
| VRC2-07 | minor | rendering | FIXED | §11.3 "`preview { events, view?: boolean }` … which stands for §11.2's `ViewHandle` since a bridged host holds none"; J-A101.86 restated |
| VS2-03 | minor | scope | FIXED | T88-1 "the import share at §4.9, and the catacomb age and the buried old town at II.7.6) change nothing" |
| VS2-04 | minor | pipeline | FIXED | J-A88.42 index "(min(K, max(1, ⌈age ÷ yearsPerStage⌉))), its age the catacomb rule's age"; Part A "its `ageYears` replacing the age II.7.6's catacomb rule reads" |
| VS2-06 | minor | scope | FIXED | §0.2 "(J-A64.41 – J-A64.44)", "(J-A65.40 – J-A65.48)", "(II.6; J-A67.40)", "(J-A70.41 – J-A70.49)", "(J-A72.40 – J-A72.51)" |
| VS2-07 | minor | scope | FIXED | §16 O1 "amendments c–e: the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick (item 65; J-A65.02) absorbed" |
| VAL-01 | minor | pipeline | FIXED | §4.6 step 2 "NG 1.2.2's measured outputs"; J-A42.41 Part A "about 42 % of NG 1.2.2's lot leaves"; "NG's measured outputs" 0 hits |
| VAL-02 | minor | scope | FIXED (plus a recorded extension) | §13.5 "(the FTG client of the 2026-09-25 capture receives no lot or plot, …)"; §15.1 C9 "… receives no door, …"; scope build-named four more cells of the same class (§13.5's amendments-c paragraph, §15.2 O5). verify-scope-r3 found the extension sound |
| VAL-03 | minor | pipeline | FIXED (plus path width and RP3-01) | §4.7 3 (ii) "the footprint from the kind's band in the cluster row (§10.2)", "the cluster row's `fireGapM` at the settlement's rung"; (i) "`pathWidthM` (the cluster row's, §10.2 …)"; §10.2 `fireGapM` by rung. The same scalar-for-a-range defect on `depthM` is VPR3-01 |
| VAL-04 | minor | pipeline | FIXED | J-P37 Part A "the grower's edge test (§4.5) stops at reservation boundaries by design"; `validateEdge` design 0, rationale 1 (Part F's verbatim history, kept as ruled) |

## 2 The hand-fix list: the 26 verify-r3 rows as 19 issues, in apply order

Each issue below names the rows of `closing-handfix-rows.py` that carry its exact texts: the anchor, found once in the
live file, and the new text. The rows apply in the listed order. The door light's placement, carry and check land
together (1–4). The lifeline closure's subject lands before what follows from it (5–9). The lantern's milestone moves
as one change (18–19). "Checked" says how this seat verified the claim on the live text.

| # | id (merged ids) | sev · kind | owner | item | rows | checked |
|---|---|---|---|---|---|---|
| 1 | VD3-02 | major · conflict | determinism | 68 | 1 | CONFIRMED: §5.3 l. 6964 read; `vd3/doorlight3.py` re-run byte-identical (50.4 % strictly outside the footprint); §2.7's `LightSource` comment keeps the record unlit ("a reading, never a stored state"), so the row's "no light" misreads it |
| 2 | VD3-03 | minor · partial | pipeline | 68 | 2 (2 sub) | CONFIRMED: §4.7 (4) draws only "a door lantern's side of its door"; `LightRule` has no distance field; `LightSource.entrance` exists (§2.7) |
| 3 | VD3-01 | minor · new-problem | determinism | 68 | 3 (7 sub) | CONFIRMED: §7.4 l. 8698–8718 read; the same re-run (99.5 % on no edge; the foot rule within 0.706 cm over 20 warps, no drift); §2.2 rule 3's "half a lattice diagonal, 0.71 cm" |
| 4 | VS3-01 (= VD3-09) | minor · partial | scope | 68 | 4 | CONFIRMED: the §13.2 fixture carries the undefined wording and runs one warp only |
| 5 | VD3-05 (= V-MC3-02, VPR3-04's §7.3 part) | minor · partial | determinism | 65, 66 | 5 (4 sub, one CLOSING) | CONFIRMED: §7.3 item 9 (d) names no edit kind or subject; §7.1's districts row makes an undercity neighbourhood "a district like any" with `drawBoundary` and `split`; §6.1 keys "an underground closure's generators … by the building's lineage" (CLOSING sub-change 2); J-A66.72 unused |
| 6 | VD3-06 (= V-MC3-03, VPR3-04's §2.7 part) | minor · partial | model | 65, 66 | 6 (3 sub, two CLOSING) | CONFIRMED: §2.7 `sources` names only the access edit's building; §2.1 l. 508 and 512 say a `dug` system comes only from an access edit (CLOSING) |
| 7 | VD3-07 (= VPR3-04's II.7.6 clause) | minor · partial | pipeline | 65, 66 | 7 (4 sub, three CLOSING) | CONFIRMED: II.7.6's steps start "from the basement ring" and key by "the building's lineage"; its head and §4.11 describe the `dug` part as access-edit passages only (CLOSING) |
| 8 | VS3-02 (= VD3-08, widened) | minor · missing | scope | 66, 65 | 8 (5 sub) | CONFIRMED: T66-1 – T66-5 (l. 13517–13526) prove the access edit and the concealed door only |
| 9 | VS3-03 | minor · partial | scope | 66 | 9 (2 sub) | CONFIRMED: §0.2 row 66 cites its home's rulings by id (J-A66.71) and schedules no lifeline instance |
| 10 | V-MC3-01 (= VPR3-03) | minor · duplicate | model | 63 | 10 | CONFIRMED: §2.7 l. 1817 restates §4.7 (1)'s order, open-use outcome and mutation; (1) calls itself the one statement |
| 11 | VPR3-02 | minor · stale | pipeline | 63 | 11 (2 sub) | CONFIRMED: Part A J-A63.41 (l. 609) "resolved once per institution" |
| 12 | VPR3-01 | minor · conflict | pipeline | 70 | 12 (2 sub) | CONFIRMED: `depthM: number` against the bullet's "depth 3–4 m"; §4.7 3 (i) names no kind for "structure depth" (also read at l. 5636 and 5649, which the new text's "every later 'structure depth' of this step" covers) |
| 13 | VD3-04 | minor · broken-reference | determinism | 77 | 13 | CONFIRMED: §7.7 l. 9052 "(item 1) … item 1's rows" means layer 1, four lines after the convention sentence |
| 14 | VRC3-01 | minor · new-problem | rendering | 68 | 14 (9 sub, one CLOSING) | CONFIRMED (the contradiction): §8.4 (c) and §8.8 claim "where a cell is held never changes its value", while §8.8 builds blocks from the city band's footprints at "its max over its wings" and claims only "no cell of a block lies below …". PLAUSIBLE: the magnitude, and the close-up half |
| 15 | VRC3-02 | minor · partial | rendering | 68 | 15 (5 sub, one CLOSING) | CONFIRMED: §8.1's `surfaceTopCm` counts "the surface layer or a pyramid" only; §8.4 (a)'s slabs are "a per-tile record"; §8.9 transfers none; II.6 and J-A68.83 require the island's shadow |
| 16 | VRC3-03 | minor · duplicate | rendering | 68 | 16 | CONFIRMED: §8.8 l. 10780–10783 against §11.1 l. 11998–12004, which dilates by one export tile and the largest light radius, and only the city band's casters by R |
| 17 | VRC3-04 | minor · partial | rendering | 68 | 17 (5 sub) | CONFIRMED: `amendc_verify_rendering_r3_exportscale.py` re-run byte-identical (32.52 MB at 1:100 and 600 dpi over the cap's frame); §8.7 and §11.1 allow "any DPI"; the law "≤ 1.7 MB per halving" bounds every listed case |
| 18 | VS3-04 (= VRC3-05) | minor · missing | scope | 68 | 18 | CONFIRMED: no §16 exit names §8.3's hand-lantern row; its fixture is the underground layer, whose records and tools land at M4 (J-A66.01 Part A) |
| 19 | VS3-05 (with VS3-04; VRC3-05's measurement) | minor · conflict | rendering | 68 | 19 (3 sub) | CONFIRMED: §12.5 measures the lantern "underground" at M2b, and J-A68.92 holds it "PLAUSIBLE until M2b" |

**What each changes, in brief** (the exact texts are the rows):
1. §5.3's light row accepts a door light within half a lattice diagonal of its footprint ring's nearest edge, on either
   side, checked in exact integers. The Works clause reads "no light lit …, its record kept and unlit".
2. `LightRule.offsetCm` (own default 60 cm, calibratable). §4.7 (4) places the door light's point on the footprint ring
   at that distance from the entrance vertex, on the drawn side, rounded to the lattice.
3. §7.4 carries a door light by the foot of its point on the ring edge nearest it, clamped, with a tie rule. It stays
   within half a lattice diagonal of the moved facade, and the rounding never accumulates. J-A68.73's index row and
   Part A are restated to match.
4. The lit-street fixture runs two successive warps, the second from the rounded point, and checks §5.3's row after each.
5. §7.3 item 9 (d) names the concealed-door instance's edit, the `setAttr` of `concealment` to `front` on the use's
   building. It names the lifeline instance's edits, a `drawBoundary` or `split` on the undercity's part, and their
   subject, that neighbourhood's `District`. §6.1 keys the underground closure's draws by the edited entity's lineage.
   New judgment J-A66.72, with its index row and Part A entry.
6. §2.7 `sources` gains the district whose lifeline closure dug a passage. §2.1 lets a lifeline closure make the `dug`
   system.
7. II.7.6's lifeline generators run from the neighbourhood's district ring in place of a basement ring. Their target is
   the nearest element of another system with a surface access (II.7.5's condition 4), and they are keyed by the
   district's lineage. II.7.6's head and §4.11 describe the `dug` part as passages that access edits and lifeline
   closures dig, and the `dug` system is created by the first closure of either kind that needs one.
8. T66-6 proves the lifeline instance for a `drawBoundary` and a `split`, its record, and `sources` where a connector is
   dug, and that its undo is exact. §16 M4 and J-A66.01 (index and Part A) schedule it.
9. §0.2 row 66 cites J-A66.72 and schedules T66-6 at M4.
10. §2.7's `concealmentSource` comment becomes a pointer to §4.7 (1), which re-resolves and re-places.
11. J-A63.41 Part A no longer says "once".
12. `ClusterRow.kinds.depthM` becomes a range. The footpath web spaces by the row's largest upper end, and every
    "structure depth" of the step reads that.
13. §7.7's `Intent` comment says "layer 1" and never "item 1".
14. The city band carries a caster mark per base wing (a one-wing building casts by its footprint) and the casters of
    the compositions and close-ups that the elaboration cache holds. So pyramid levels ≥ 1 read one caster set, and a
    block equals any pyramid's cell. §8.3's mountainous row tests a two-wing building across a pan. J-A68.93 (index and
    Part A) is restated. §8.1 item 6 counts the undrawn caster marks and the slab list.
15. `surfaceTopCm` counts slab tops, and §8.4 (a)'s slabs become records of one per-document slab list. §8.8 holds and
    transfers it, and §8.9's row carries it. §8.3 gains an island-shadow row.
16. §8.8's print paragraph points to §11.1's transient list instead of restating it.
17. The export tile's window is "≤ 14 MB plus its blocks", with the blocks' growth law by export scale. The block cache
    is max(16 MB, the tile in progress's blocks), and §12.8 and J-A68.90 (index and Part A) are restated to match.
18. §16 M4 runs §8.3's hand-lantern row on the underground layer's hook fixture.
19. §12.5 measures the lantern at M4 on that fixture, and J-A68.92 Part A holds its cost PLAUSIBLE until then.

**Receipts** (scratch `close-c/`):
* `anchors.py`: every anchor counted in the live files, each once. `closing-handfix-rows.py --check` reports 59 rows,
  0 failing.
* The dry run: `doc-P.md` and `rat-P.md`, with log `rows-log.json`. Every new text occurs once in its result.
* `dc-U.out`, the untouched design over the 13 keys: C1 5/0, C2 0/0, C3 1 186/0, C4 9/0, S1 0/0, S2 0/0, exit 0.
* `dc-P.out`, the dry run over the same keys: C1 5/0, C2 0/0, C3 1 185/0, C4 9/0, S1 0/0, S2 0/0, exit 0. The first
  dry run found 6 unreviewed C3 hits, corpus coincidences in the new wording. They were reworded in the rows ("a
  lattice point", "measured at its point's foot", "equal to that cell in"), not allow-listed.
* `refs-P.out`: 141 headings, 35 D ids, 733 J ids, 2 broken (the baseline externals). Index 736 = Part A 736, one set.
  T66-6 is defined once in §13.2.

## 3 The closing seat's rulings (each vetoable; the rows carry them)

### 3.1 The hand lantern is tested and measured at M4 (VRC3-05 against VS3-04 / VS3-05)
VRC3-05 offered M2b or M4. §8.3's hand-lantern fixture is "the underground layer of a golden CITY at the depth band
holding a tunnel with frontage plots". The underground records and tools it needs land at M4 (J-A66.01 Part A: "records
whose schema and tools §16 lands at M4"). Before the staged stages exist, a staged layer's bars run on its hook fixture
(§13.2; J-A63.01). So the row runs at M4 on that fixture, and §12.5's lantern measurement and J-A68.92's PLAUSIBLE
horizon move with it. No price moves. Chose M4 over M2b because at M2b there is nothing underground to sweep.

### 3.2 VRC3-01: one caster set, following the elaboration cache (the main mechanism, refined)
**The choice.** The main mechanism restores what §8.4 (c) and J-A68.90 claim: a cell's value never depends on where it
is held. The alternative weakens that claim to a bound, and a far shadow then visibly changes shape when a pan moves its
caster from a block into the first ring. That would be a pop of up to the footprint's full width under a low sun. The
main mechanism is chosen, with three refinements.
* **Base wings.** Undrawn caster marks are added per base wing only for buildings of several wings. A one-wing building
  already casts correctly by its footprint mark.
* **Derived casters: the trigger.** The verifier's wording was "when they reach a finer band", which is a view event.
  The rows use the elaboration cache instead (§2.9 `Document.elaborations`: persisted, kept across zoom-outs and
  sessions, never canonical). The caster marks of compositions and close-ups are added in the delta that answers the
  band request deriving them, are removed with the cache entry, and are included in every full build. So the far
  shadows depend on exactly what the finer bands' drawing already depends on: the document and its elaboration cache.
  They do not depend on the pan history.
* **Base wings are model state.** A base wing is stored by S11, so its casters are deterministic from generation on.
  Compositions (stage 3) and close-ups (stage 2) are staged, so §8.3's new clause tests the base case now: a building
  of two base wings, 10 m and 30 m. It adds "from their stages" for the composed and close-up casters.

**Memory.** The undrawn marks and the slab list are counted in §8.1 item 6's size line, PLAUSIBLE until B-CITY counts
them at M2b.

### 3.3 VRC3-04: a law by export scale, not a refusal
§8.7 and §11.1 promise PNG and print "at any DPI". Refusing lit exports finer than the 1:500 / 300 dpi tile would break
that promise for a cost that grows only logarithmically, about 1.7 MB per halving of the export tile's world side. So the
bound is stated as "≤ 14 MB plus its blocks", with the growth law and two worked points: ≤ 30 MB at 1:500 and 300 dpi,
and ≤ 33 MB at 1:100 and 600 dpi. The cache holds at least the tile in progress's blocks. The rows give J-A68.90's exact
restated texts, where the verifier had written only "likewise".

### 3.4 The undercity lifeline closure: its subject, its start, its target, and what follows (VD3-05 – VD3-08, V-MC3-02 / 03, VPR3-04, VS3-02 / 03)
Three verifiers reached the same reading. The subject is the undercity neighbourhood's `District` that a `drawBoundary`
or `split` on the undercity's part leaves without a lifeline. VD3-05's wording is taken, with J-A66.72 as its record.
VS3-02's T66-6, which widens VD3-08 to `split`, is taken over VD3-08. Two refinements and one set of ripples follow.
* **The start.** VD3-07's "run from its nearest chamber" does not say nearest to what, and a hand-drawn neighbourhood
  need not hold a chamber. The connector's path search already starts from a ring, the basement ring, so the rows start
  it from the neighbourhood's **district ring**.
* **The target.** Step 2's list includes "an undercity walkway", which cannot be a lifeline for its own neighbourhood.
  The rows name the target as the nearest element of another system with a surface access, which is II.7.5's
  condition 4 read as a target.
* **T66-6's `sources` clause** holds only "where it digs a connector", because a lifeline within reach digs nothing.
* **The ripples** (rows 5 (2), 6 (2)–(3), 7 (2)–(4); CLOSING). A lifeline closure can dig the first `dug` passage. So
  §2.1, II.7.6's head and §4.11 no longer describe `dug` as access-edit passages only. The `dug` system is created by
  "the first closure that needs one", so the part-number mint has a named creator on both paths. §6.1's registry keys
  the underground closure's draws by the edited entity's lineage, not "the building's". This traces the create path
  of the new state (the system, its part number and its `sources`) through the registry, the frame growth (§4.11) and
  undo, where §7.3 item 9 (c) is unchanged.

### 3.5 One text for the concealment comment (V-MC3-01 against VPR3-03)
The two proposals differ only in which clause they keep. The merged text keeps both: "re-resolves it from the map-side
sources and re-places the use by §4.7's Concealed institutions (1), writing their source here (J-A63.22)".

### 3.6 The slab list is counted with the display list, not in Q (VRC3-02)
VRC3-02 would have added the slab list to §8.8's Q, whose terms are per tile position. The slab list is held once per
document by the tile worker, as the city band is. So it is counted in §8.1 item 6's size line, and Q, Q_f and
J-A68.89's worked cases are untouched. §8.4 (a)'s "a per-tile record" becomes "a record of the document's slab list",
because it would otherwise contradict the new §8.8 sentence (CLOSING).

### 3.7 Considered, not raised
* **The rationale's unreviewed C3 / C4 hits.** Assemble-r3 §9 (1) found 10 in the Part A entries J-A68.85, .90, .92,
  .93 and J-A101.86. These lie outside §17.1 (2)'s gate, which covers the design only; the rationale's information run
  already stands at 336 such hits. No issue is raised. The hand fix's restated J-A68.90, .92 and .93 entries keep or
  shed them by their wording.
* **§0.2 row 68.** It names its rulings by id and none of J-A68.82 – .94, a form every round has passed
  (verify-scope-r3). Not raised.
* **Deleting an undercity neighbourhood's last lifeline.** This is not a closure. §5.3's row "an undercity only where a
  void source exists and a lifeline reaches it" already governs it (refusal by the batch-local check). Not raised.

## 4 Held parts (gate (a)) — for Fable's retrovalidation, so nothing is lost

None of these is in the design or the rationale file. Assemble-r3 §6 and the five r3 verifiers each scanned the held
phrases. None of the rows above touches one.

| item | the held part | what stands instead |
|---|---|---|
| 52 | that the references' session-reached maps *visibly* differ from a fresh load | the history-independence test and its motive (§6.5 (9), J-A52.61); the mechanisms are CONFIRMED |
| 35 (support) | the position check on 160 of 162 faces | nothing; the mechanism is CONFIRMED on its own |
| 60 (support) | that NG hands Dwellings plans up to 16 cells wide, which are dropped (a cross-derivation, critic X8) | the drop rule only (§15.1 G2) |
| 68 (g) | "MFCG draws no cast shadows" as a claim about the reference | the `MFCG` preset's behaviour stated as ours (J-A68.86) |
| 68 (support) | VG 1.6.9's shadow and night-light layers; Dwellings' shading and occlusion gradients | nothing; the plan rung's room lights stay J-A28.32's |
| 50 (MFCG clause) | "no door concept among MFCG's read model classes", an inference from the full read | the route's inference sentence, which the gate's completion confirmed as written |

These were released and applied with labelled wording: item 37 (§4.6 step 5), item 58 (f) (II.2) and item 59's timing
(§12.7). Item 49's deletion was rejected, so the 49 % figure stands, cited to F4.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read on the installed files):**
* the live hashes (`70ddb6e3…`, `e138da23…`), unchanged since assemble-r3;
* §1's 29 verdicts (`probe29.py`, 80 probes, the two over-broad ones read in place);
* each of the 19 issues' claims, read at its lines;
* the door-light bench and the export-scale receipt, both re-run byte-identical;
* every anchor, found once;
* the dry run applied, with every new text once;
* the doc checks on the dry run, exit 0;
* the resolver (2 baseline breaks), the index and Part A id sets (736 = 736), and T66-6 defined;
* the size, heading, judgment-row and effort counts in the owner's summary (returned with the structured output).

**PLAUSIBLE (judgment):**
* the rulings of §3: M4 for the lantern; the elaboration-cache trigger; the law rather than the refusal; the district
  ring and the target rule; the merged comment; the slab list's counting home;
* VD3-01's tie rule and clamp (the verifier's choice, kept);
* VD3-03's 60 cm default;
* VRC3-01's magnitude and close-up half;
* the undrawn caster marks' memory until B-CITY counts them;
* that the 19 changes introduce no new conflict. The dry run's doc checks and references are clean, but no verifier
  has yet re-read the result.

**What this seat read.**
* Read whole: validate.md, assemble-r3, the five r3 verify reports, the amendments files' ruling summaries and owner
  quotations, and the design's one-page summary paragraph for amendments c–e.
* In the design, read whole: II.7.5, II.7.6, §7.3 item 9, §4.7's `LightRule` and *Light sources* (1)–(4), §7.4's warp
  paragraph, §8.1 items 2 and 6, §8.4 (a)–(c), §8.8's pyramid and print paragraphs, §8.9's transfer rows, §8.6, §11.1's
  transient-list paragraph, §12.5's measurement, §12.8's export lines, §13.2's T66 group, and the index rows and Part A
  entries each change restates.
* Everything else by targeted search.

## 6 What Fable should re-check first

1. **§3.2**, VRC3-01's main mechanism with the elaboration-cache trigger. It is the one ruling that adds state to the
   city band, and it rests on the reading that far shadows may depend on the elaboration cache as near drawing does.
2. **§3.4**, the lifeline closure's start (district ring) and target (another system with a surface access), and the
   ripples: whether "the first closure that needs one" is the right creator of the `dug` system.
3. **VD3-02**, the one major: the tolerance "within half a lattice diagonal, on either side" in place of a strict
   in-face test for door lights.
4. **§3.3**, the export window stated as a law by scale rather than a refusal of fine lit exports.
