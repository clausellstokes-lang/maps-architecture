# verify-determinism-r3 — lane amendments-c/verify-determinism-r3 (the DETERMINISM part after repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-determinism-r3).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-determinism-r2, validate.md §5, repair-determinism-r3 report + bench, the other repair-r3 reports' notes, assemble-r3, verify-model-r3, verify-pipeline-r3; §5–§7 live vs pre-r3 diffed): done
> STEP 1 re-check of the round-2 issues routed to or raised by this part (VD2-01..05, VPR2-07): done
> STEP 2 new-problem / single-source / stale / deferral / reference / held-part sweep of the repaired subsections and their dependants: done
> STEP 3 cross-part notes addressed to this part (model r3 → §7.3 item 9 (d)): done
> STEP 4 doc checks "5,6,7": done (exit 0)
> STEP 5 report body: done | queue row: done | LANDED line: done

Lane `amendments-c/verify-determinism-r3`, 2026-09-28. Read-only lane: the design files were not touched.
Design read: `docs/ARCHITECTURE.md` sha256 `70ddb6e302ea06c1…` (17 305 lines; §5 l. 6794, §6 l. 7031, §7 l. 7796–9518),
rationale `e138da2377d31b9f…`; the before is `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r3-2026-09-28.md`
(`3daa0b07…`). Scratch: `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/vd3/`
(`live57.md`, `pre57.md`, `d57.diff`, `wd57.diff`, `wd-all.diff`, `adds-det.txt`, `ptr.out`, `ctx.out`, `jids.out`,
`doorlight2.py` / `.out`, `doorlight3.py` / `.out`, `dc-567.out`).

## 1 Outcome

Repair round 3 fixed **every round-2 issue of this part**: VD2-01 (the door light under a turning warp), VD2-02 =
VPR2-07 (the F4 and `impaired` rows), VD2-03 (the "§7.7 item 2" ambiguity, 26 pointers rewritten), and scope's VD2-04
(the lit-street warp fixture) and VD2-05 (J-A81.01's section column). §5–§7 changed only where the repair said: seven
hunks — §5.3's coherence row (one pointer), §7.4 (three door-light spots) and §7.7 (the convention sentence, F4, the
status row). Held parts stay out; gates (b) and (c) hold (no reference name in the added runs; C1 5 / 0); no deferral
wording; the 153 J ids cited in §5–§7 resolve (only IMPROVEMENTS' `J-K`, pre-existing); doc checks "5,6,7" exit 0.

This round finds **9 issues: 1 major, 8 minor** — determinism 4, pipeline 2, model 1, scope 2. Three are the same
defect as the sibling verifiers' rows and are marked "=". None needs an owner ruling; VD3-05 records one vetoable
reading as J-A66.72.
* **The door light, round 3's own wording (VD3-01, VD3-02, VD3-03, VD3-09).** §7.4 now carries a door light by "its
  fraction of the ring edge its point lies on". A point rounded to the 1 cm lattice lies on no ring edge in 99.5 % of
  cases (executed, `vd3/doorlight3.out` (a); §2.2 rule 3 already records that 61 % of 5–60 m edges hold no interior
  lattice point), so the carry is undefined for almost every door light. The fix takes the foot of the point on the
  nearest edge, which the repair's own bench already computes; executed over 20 successive warps it stays within
  0.706 cm of the moved facade with no drift. The **major** one, VD3-02, predates round 3 but is exposed by it: §5.3's
  light row requires every light to stand in its host's faces, and a door light's host face is its building's footprint
  (§7.4). A door light on the facade, rounded to the lattice, lies strictly outside the footprint in 50.4 % of checks
  (executed, (c)), so the stage-end row fails about half the door lights on every lit map. VD3-03: §4.7 (4), the
  placement home, never says where a door light's point stands (only its side is drawn), though §7.4 and §5.3 assume
  it stands on the footprint ring.
* **The undercity lifeline closure (VD3-05 = V-MC3-02 = VPR3-04, with VD3-06 = V-MC3-03, VD3-07 = VPR3-04's II.7.6
  clause, VD3-08).** Model r3's cross-part note to this part is right: §7.3 item 9 (d)'s "an undercity entrance that
  lacks its lifeline" names no edit kind and no subject, so §2.8 cannot declare its generators, the generators have no
  lineage to key their draws by, and §2.7's `sources` cannot name what a dug lifeline answers to. The fix names the
  edits (`drawBoundary` or `split` on the undercity's part) and the subject (that neighbourhood's `District`).
* **VD3-04.** One pointer of the VD2-03 class survives inside §7.7 itself: the `Intent` code comment's "(item 1)" and
  "item 1's rows" mean layer 1, against the convention round 3 wrote four lines above.

## 2 Re-check of the round-2 issues

FIXED = the live text carries the required change (quoted in brief, live line).

| id | owner | verdict | live text (line) |
|---|---|---|---|
| VD2-01 | determinism | FIXED (new defect VD3-01) | §7.4: "a door light, which stands beside its door on the footprint's ring (on the side §4.7's *Light sources* (4) draws), instead keeps its fraction of the ring edge its point lies on — its new point that edge's two end vertices where the move leaves them, blended at the fraction its old point had between them before it (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice — so it stays on the moved facade whether the warp slides or turns it)" (8698–8702); "never a door light, which keeps that point on its ring edge wherever it falls" (8712); "a door light excepted, which goes with the ring edge it stands on (above)" (8718); J-A68.73 index "(a door light excepted: it keeps its fraction of the footprint ring's edge it stands on, never re-seated)" (17216) and Part A "a shift by its entrance vertex's displacement alone would leave the facade wherever a warp turns it (… 1.57 cm for a 60 cm offset and a 1.5° turn), while its fraction of its ring edge is that same mean-value image on the boundary itself … repair r3, VD2-01" (rationale 752). "entrance vertex's displacement" survives only in that Part A reason, as history. The required change is met; its wording "the ring edge its point lies on" is VD3-01 |
| VD2-02 = VPR2-07 | determinism | FIXED | F4 "the non-physical — legitimacy, influence, wealth, staffing, corruption — the impaired institution's own dial term only (§4.5 (6); J-A88.42)" (9376); status row "the non-physical reach the impaired institution's own dial term only (§4.5 (6))" (9393); the home states it: §4.5 (6) (4824), §10.2 `DossierInstitution.impairments` "a non-physical type's steps per unit of severity on the impaired institution's own dial term, conditionSteps × severity × dial.conditionStep (§4.5 (6))" (11692), J-A88.42 (17228) |
| VD2-03 | determinism | FIXED (residual VD3-04) | §7.7 head "Three input layers above the parameter vector, all persisted in the recipe — a pointer names one as §7.7 layer n, while §7.7 item n names the dossier contract's item n (below):" (8973–8974). Design: "§7.7 layer 2" 27 + §7.1's "§7.7's layer 2" (8022) = 28, every one landing on layer 2's content (powers, trade, economy, `DistrictIntent`, `disorder`; `vd3/ctx.out`); "§7.7 layer 1" 2 (2182, 8081). "§7.7 item 2" 14 and "§7.7 item 1" 11 (§2.9's wrapped one included), every one a contract pointer (*Existence*; *One way*, its diff, its never-read list, its dating). "§7.7 item 3" (3 + rationale 1) are the contract's *Rejection* lapse. Rationale: 1 "layer 2", item-2 ×2 and item-1 ×1, all correct. §5.3's coherence row now reads "the trade slice's (§7.7 layer 2)" (6938) |
| VD2-04 = VS2-01 | scope | FIXED (follow-on VD3-09) | §13.2 "a warp and a `moveVertex` over a lit street with an inn — every street light, the inn's door light, a hand-placed light on a pin and a junction light on a tunnel carried in their host faces by §7.4's rule, the door light keeping its fraction of the footprint ring's edge it stands on and never re-seated, … an access point's opening carried in its ground host; a building under a demolition Works whose kept rings take their mean-value images unre-seated; undo restoring every former point byte for byte and a replay reproducing them (§7.4; J-A68.73)" (13167–13173); §16 M3b / M4 split its tunnel, access-point and Works clauses (14902, 14903) |
| VD2-05 = VS2-05 | scope | FIXED | J-A81.01 index "… the bar T81-2 \| §7.7 item 15, §1.1, §14 \|" (17233); Part A "(§7.7 item 15, §1.1, §14, D-33; item 81; repair r1, VSC-21; repair r2, VD1-01)" (rationale 769) |

The other verifiers' round-2 rows owned by this part were VPR2-07 only (= VD2-02, above). validate.md §5 routes no
other id here.

## 3 Item verdicts (updated from round 2; `verify-determinism-r0.md` §2 for the full quotes)

* **Home or referencing items now PRESENT:** 88 (VD2-02 fixed), 81 (VD2-05 fixed), 77 (VD2-03 fixed; VD3-04 is a
  one-comment residue inside §7.7, not a missing mechanism).
* **Still PARTIAL: 68.** VD2-01's fix landed, but its wording carries VD3-01, §5.3's row fails the door light (VD3-02),
  §4.7 (4) never places the point (VD3-03), and the fixture follows (VD3-09).
* **Lowered to PARTIAL: 66 (home) and 65 (referencing), on the lifeline closure.** §7.3 item 9 (d)'s undercity instance
  has no edit kind and no subject (VD3-05 – VD3-08). Model r3's cross-part note raised it; round 2 had read the
  instance as a declared generator list and passed it. That reading was too generous.
* **Every other item keeps round 2's PRESENT:** 20 (h), 51, 52, 74, 75, 78, 80, 82, 86, 87, 101; 34, 36, 37, 39, 41,
  42, 43, 44, 45, 47, 56, 62, 63, 64, 67, 69, 70, 71, 72, 73, 76, 79, 83, 85.

## 4 Issues (round 3)

Order within a repair round: VD3-03 (the point's placement) with VD3-01 and VD3-02, then VD3-09; VD3-05 before
VD3-06, VD3-07 and VD3-08. A replaced text that wraps a line in the design is quoted whitespace-normalised.

| id | sev | kind | owner | item | where | the defect | required change |
|---|---|---|---|---|---|---|---|
| VD3-01 | minor | new-problem | determinism | 68 | §7.4 *Warp and what stands on the ground* (8698–8702, 8712, 8718); J-A68.73 index (17216) and Part A (rationale 752) | Round 3 carries a door light by "its fraction of the ring edge its point lies on … the fraction its old point had between them". A light's point is rounded to the 1 cm lattice, and a lattice point lies on a ring edge only by chance: §2.2 rule 3 records that 61 % of 5–60 m edges hold no interior lattice point at all. Executed (`vd3/doorlight3.out` (a)): 1 990 of 2 000 generated door lights and 99.5 % of the points before a carry lie on no ring edge, so the rule names no edge and no fraction for them. After one carry the point is again rounded off the edge (the repair's own bench: 0.43 cm), so even an exact first placement fails the second warp. The repair's bench computes the fraction as the point's projection, which is the intended rule, but the text does not say so. | (1) §7.4: replace "instead keeps its fraction of the ring edge its point lies on — its new point that edge's two end vertices where the move leaves them, blended at the fraction its old point had between them before it (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice — so it stays on the moved facade whether the warp slides or turns it)" with "instead keeps its fraction of the ring edge nearest its point — the foot of its point on that edge, clamped to [0, 1], since a point on the lattice seldom lies on an edge exactly (§2.2 rule 3); the nearer of two edges by squared distance, a tie going to the earlier edge in the ring's order — its new point that edge's two end vertices where the move leaves them, blended at that fraction (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice — so it stays within half a lattice diagonal of the moved facade whether the warp slides or turns it, the rounding never accumulating)". (2) Replace "never a door light, which keeps that point on its ring edge wherever it falls, so no warp pushes it indoors" with "never a door light, which keeps that point by its ring edge wherever it falls, so no warp pushes it indoors beyond the lattice's own rounding". (3) Replace "a door light excepted, which goes with the ring edge it stands on (above)" with "a door light excepted, which goes with the ring edge nearest it (above)". (4) J-A68.73 index: "(a door light excepted: it keeps its fraction of the footprint ring's edge it stands on, never re-seated)" → "(a door light excepted: it keeps its fraction of the footprint ring's edge nearest it, taken at the foot of its point, never re-seated)". Part A: "a door light keeping its fraction of the footprint ring's edge it stands on instead and never re-seated" → "a door light keeping its fraction of the footprint ring's edge nearest it (the foot of its point on that edge) instead and never re-seated"; after "while its fraction of its ring edge is that same mean-value image on the boundary itself" add ", taken at the foot of its point because a point on the lattice lies exactly on its edge in under 1 % of cases and within half a lattice diagonal of it otherwise"; append "; verify-determinism-r3, VD3-01" to the provenance. Restate the row under its id (index and Part A; swap hand-off). |
| VD3-02 | major | conflict | determinism | 68 | §5.3 light row (6964) | The row requires "every `LightSource` … stands in its host's faces", checked by `pointLocate` on the host's `PlatKey`. A door light's host is its building, whose host face is the footprint (§7.4's host list: "the footprint face of a building"), and it stands on the footprint's ring (§7.4). Rounded to the lattice, it lies on one side of the facade or the other. Executed (`vd3/doorlight3.out` (c)): over 2 000 footprints × 20 warps, the point lies strictly outside the footprint face in 50.4 % of checks, and `pointLocate` then returns the street strip or yard. So the batch-local row fails about half the door lights, generated or carried, on every lit map, and §5's ladder treats a correctly placed light as a failure. This predates round 3 (the host face since round 1's VD1-05), but round 3's wording ("keeps that point on its ring edge") depends on the row accepting a point on the ring. Found in passing in the same row: "no light on a building whose Works stands before its finished stage" reads as no record, while §2.7 and §4.7's *Light sources* (5) keep the record and leave it unlit ("a reading, never a stored state"). | §5.3: replace the row "\| every `LightSource` (§2.7, item 68) stands in its host's faces on its host's arena, its height within its rule row's band; no light on a building whose Works stands before its finished stage (§4.11) \| batch-local (touched lights and their hosts) \| `pointLocate` on the host's `PlatKey`; the rule row's band \|" with "\| every `LightSource` (§2.7, item 68) stands in its host's faces on its host's arena — a door light, which stands on its footprint ring, within half a lattice diagonal (§2.2 rule 3) of that ring's edge nearest it, on either side (§7.4) —, its height within its rule row's band; no light lit on a building whose Works stands before its finished stage, its record kept and unlit (§2.7; §4.7's *Light sources* (5); §4.11) \| batch-local (touched lights and their hosts) \| `pointLocate` on the host's `PlatKey` (a door light: its squared distance to the nearest edge of its host's footprint ring, at most ½ cm², in exact integer arithmetic); the rule row's band \|". |
| VD3-03 | minor | partial | pipeline | 68 | §4.7 *Light sources* (4) (5608) and `LightRule` (5575–5582) | §7.4 says a door light "stands beside its door on the footprint's ring (on the side §4.7's *Light sources* (4) draws)", and §5.3 (VD3-02) checks it there. But the placement home states only that the side is drawn. No text places the point: whether it lies on the ring or off it, or how far from the entrance vertex. `LightRule` has no field for that distance, so the carry and the check rest on an assumption the home does not make (rule 2: mechanism, not assertion). The r2 and r3 benches assume a 60 cm offset. | `LightRule`: after "count?: number /* per host; default 1 */;" add "offsetCm?: Cm /* 'door' rows: the lantern's distance from its entrance vertex along the footprint ring, on the drawn side — own default 60, calibratable */;". (4): after "on the concern `pin.light` keyed by the host's lineage and the rule row (§6.1)." add "A door light's point lies on its building's footprint ring, at its row's `offsetCm` from the entrance vertex (`LightSource.entrance`), walked along the ring on the drawn side and rounded to the lattice; §7.4 carries it and §5.3's light row checks it." |
| VD3-04 | minor | broken-reference | determinism | 77 | §7.7 code block, the `Intent` comment (9052) | Round 3 put the convention at §7.7's head (8973–8974): "§7.7 item n names the dossier contract's item n". Four lines into the code block, "// — layer 1's record (item 1): … item 1's rows expand it to the internal parameters" uses "item 1" for layer 1. Forty-five lines later, "the 'previous dossier' item 1's diff runs against" (9097) uses it for the contract's *One way*. This is the last layer-meaning "item n" in §7.7; the other bare item 1–3 pointers there are contract pointers (`vd3/` scan). | Replace "// — layer 1's record (item 1): the recipe's intent, `Recipe.intent` (§2.9); item 1's rows expand it to the internal parameters" with "// — layer 1's record: the recipe's intent, `Recipe.intent` (§2.9); layer 1's expansion rows turn it into the internal parameters". |
| VD3-05 = V-MC3-02 = VPR3-04 (§7.3 part) | minor | partial | determinism | 65, 66 | §7.3 item 9 (d) (8510–8511); judgment index and Part A | "An undercity entrance that lacks its lifeline (II.7.5, item 65)" is declared a closure "built by the generators its edit kind declares (§2.8)". No text defines an undercity entrance, and no edit kind is named. So §2.8 has no edit kind to declare the generators on. The generators' draws are keyed by the edited entity's lineage (item 9 (b)), and here there is none. §2.7's `UndergroundSystem.sources` cannot name what a dug lifeline answers to (model r3's cross-part note; assemble-r3 §9 (2)). An undercity neighbourhood is "a district like any" (§7.1's districts row). So the edits that make one — `drawBoundary` on the undercity's part, or a `split` of one — are those whose subject can lack a lifeline (II.7.5's condition 4). The concealed-door instance names its edit kind only in T66-5. | Replace "A clandestine front that lacks its concealed door (§4.7, item 63) and an undercity entrance that lacks its lifeline (II.7.5, item 65) are closures too, each built by the generators its edit kind declares (§2.8) —" with "A clandestine front that lacks its concealed door (§4.7, item 63; the `setAttr` that sets a placed use's `concealment` to `front`, acting on the use's building; T66-5) and an undercity neighbourhood that an edit leaves without a lifeline (II.7.5's condition 4, item 65; a `drawBoundary` that adds one on the undercity's part or a `split` of one, §7.1's districts row, acting on that neighbourhood's `District`, whose lineage keys the lifeline's draws) are closures too, each built by the generators its edit kind declares (§2.8) —". J-ROWS: "\| J-A66.72 \| the closure's two further instances named by edit kind and subject: the `setAttr` of a placed use's `concealment` to `front` (the use's building) and a `drawBoundary` or `split` on the undercity's part that leaves a neighbourhood without a lifeline (that neighbourhood's `District`, whose lineage keys the draws and which the dug system's `sources` names) \| §7.3 \|". RATIONALE-A: "\| J-A66.72 \| Chose to name the edit kind and the subject of the closure's concealed-door and undercity-lifeline instances — the `setAttr` that sets a placed use's `concealment` to `front`, acting on the use's building, and a `drawBoundary` or `split` on the undercity's part that leaves a neighbourhood without a lifeline, acting on that neighbourhood's `District` — over the unnamed "undercity entrance", because §2.8 declares closure generators per edit kind, item 9 (b) keys every piece's draws by the edited entity's lineage, and §2.7's `UndergroundSystem.sources` must name the entity a closure-dug passage answers to; an undercity neighbourhood is a district like any (§7.1), so the edits that add or divide one are the ones whose own subject can lack its lifeline (§7.3; items 65, 66; verify-determinism-r3, VD3-05 = V-MC3-02 = VPR3-04, from model r3's cross-part note). \|". |
| VD3-06 = V-MC3-03 | minor | partial | model | 65, 66 | §2.7 `UndergroundSystem.sources` (1845) | It names the building of an `addUndergroundAccess` as what explains a dug passage. A lifeline that VD3-05's closure digs has no entry. | With VD3-05: replace "the building whose access edit dug a passage (`addUndergroundAccess`, item 66) */" with "the building whose access edit dug a passage (`addUndergroundAccess`, item 66), or the undercity neighbourhood's `District` whose lifeline closure dug one (§7.3 item 9 (d)) */". |
| VD3-07 = VPR3-04 (II.7.6 clause) | minor | partial | pipeline | 65, 66 | II.7.6's closing paragraph (16180) | "an undercity entrance's missing lifeline by the target, connector, access-point and link steps above (II.7.5)". Those steps start from a building's basement ring and key their draws by its lineage, and a neighbourhood has neither. | With VD3-05, VPR3-04's text: replace "an undercity entrance's missing lifeline by the target, connector, access-point and link steps above (II.7.5)" with "an undercity neighbourhood's missing lifeline by the target, connector, access-point and link steps above (II.7.5), run from its nearest chamber in place of a basement and keyed by that district's lineage". Apply once: VPR3-04 lists this same clause. |
| VD3-08 | minor | missing | scope | 66 | §13.2 T66 group (13517–13526); §16 M4 cell (14903); J-A66.01 index (17232) and Part A | T66-1 – T66-5 prove `addUndergroundAccess` and the concealed-door instance. No bar proves the undercity-lifeline instance that VD3-05 declares (rule 2: the test that proves the mechanism). | After T66-5's sentence add: "(T66-6) a `drawBoundary` that adds an undercity neighbourhood no lifeline reaches adds its nearest lifeline by II.7.6's target, connector, access-point and link steps in the same event, its closure record naming them and the dug system's `sources` naming the neighbourhood's `District`; its undo removes exactly them (§7.3 item 9 (d); J-A66.72)." §16 M4: "the hook fixtures of items 64, 65, 66 (T66-1 – T66-4)" → "the hook fixtures of items 64, 65, 66 (T66-1 – T66-4, T66-6)". J-A66.01 index and Part A: "T66-1 – T66-4 at M4" → "T66-1 – T66-4 and T66-6 at M4". Restate the row under its id. |
| VD3-09 | minor | partial | scope | 68 | §13.2 lit-street warp fixture (13169) | The fixture follows round 3's wording. It never runs a second warp from a rounded point, the case VD3-01 shows is undefined, and it never checks §5.3's light row, the case VD3-02 shows fails. | With VD3-01 and VD3-02: replace "the door light keeping its fraction of the footprint ring's edge it stands on and never re-seated" with "the door light keeping its fraction of the footprint ring's edge nearest it and never re-seated, through two successive warps, the second starting from its lattice-rounded point off that edge, and passing §5.3's light row after each". |

Checked and not raised:
* **The round-3 rendering texts that touch determinism.**
  * The one-byte heights on a square-root scale (J-A68.94) use `sqrt` alone, which §6.5 admits.
  * The float32 export surfaces and pyramids are display data.
  * The CPU reference pass stays inside §6.5's lint closure.
  * The export's block cache has a fixed budget, and the export's tile order is fixed. So a lit export is a function of
    its request, and §6.2's "pixel-identical at a given backend, DPR and style version" holds, though a cached finer
    block may serve a later tile. This is PLAUSIBLE: a reading of §8.8, which the rendering verifier owns.
* **§4.11's frame growth** re-lays the `buried` and `dug` parts' cleared bands "by `corridorUnion` (§3.7), which draws
  nothing" (6414). That agrees with §6.1's registry, and §7.3's staged-layers row (8268) is unaffected.
* **§4.7 (1)'s withdrawal clause** cites "(§7.7 items 5, 11 (b))". Item 5 is *Re-application*. Item 11 (b) says "a
  dossier change re-derives exactly the dependent map facts … by item 5's least-disruption mutation". Both say what is
  cited.
* **Single source of the door-light carry.** The carry is stated once, in §7.4. J-A68.73 and §13.2 cite it, and §2.7's
  `LightSource.point` points to it. After VD3-01 – VD3-03, §4.7 (4) places the point, §7.4 carries it and §5.3 checks
  it, each once.

## 5 Checks run (receipts in scratch `vd3/`)

* **Scope of the change.** The line diff of §5–§7, archive `3daa0b07…` → live `70ddb6e3…` (`d57.diff`, 19 changed
  lines, 7 hunks), was read whole:
  * §5.3's coherence row: one pointer, now "§7.7 layer 2";
  * §7.4: the three door-light spots;
  * §7.7: the convention sentence, F4 and the `impaired` status row.

  Everything else in §5.1–§5.4, §6.1–§6.5, §7.1–§7.3, §7.5, §7.6 and §7.8 is byte-identical to round 2's reading.
* **Repaired subsections read whole.** §7.4 (8534–8753) was read whole. §7.7 was read from its head to the contract's
  item 5 (8971–9210), plus items 11, 13 and 14's rows. Every subsection citing the changed text was also read:
  * §2.6's entrance rules 1–5 (an entrance is a vertex);
  * §2.7 `LightSource` and `UndergroundSystem.sources`;
  * §2.8's closure-generator entry;
  * §4.5 (6);
  * §4.7's *Light sources* (1)–(5), `LightRule` and *Concealed institutions* (1);
  * §4.11's frame growth;
  * §5.3's light row;
  * §7.1's districts and underground rows;
  * §7.3 item 9 and its staged-layers row;
  * §10.2 `DossierInstitution.impairments`;
  * II.7.5's *Lifelines and light*;
  * II.7.6's closure steps 2–7 and closing paragraph;
  * §13.2's lit-street fixture and T66;
  * §16's M3b and M4 cells;
  * J-A68.73, J-A81.01, J-A88.42 and J-A66.01 in the index, and J-A68.73 and J-A81.01 in Part A.
* **Whole-document word diff** (`wd-all.diff`, 104 hunks, 386 added runs). Every added run citing §5–§7, and every one
  using a determinism word (draw, stream, seed, digest, cache, keyed, replay, byte …; `adds-det.txt`, 39 runs), was
  followed to its target. Each target states what the citing text assumes, with the exceptions in §4.
* **Pointer classes** (`ptr.out`, `ctx.out`). "§7.7 item n" and "§7.7 layer n" were counted by number in both files, and
  each 1–3 pointer was read in context: layer 2 = 28, layer 1 = 2, contract item 2 = 14, item 1 = 11, item 3 = 3, all
  correct. The bare "item 1–3" pointers inside §7.7 were scanned: only l. 9052 means a layer (VD3-04).
* **Door light, executed.**
  * `doorlight2.out`: 20 000 lattice-rounded points on random 5–60 m facade edges; 0.2 % lie on the edge, the rest
    split evenly between the two sides, at most 0.696 cm off.
  * `doorlight3.out`: 2 000 turned rectangular footprints × 20 successive smooth warps (slide ± 30 cm, turn ± 2°).
    * (a) 99.5 % of the points lie on no ring edge.
    * (b) The projection rule of VD3-01 keeps the point within 0.706 cm of the moved edge with no drift.
    * (c) 50.4 % of the checks find the point strictly outside the footprint face (VD3-02).
  * The repair's bench (`docs/validation/bench/amendc_repair_determinism_r3_doorlight.py`) was read. It computes the
    fraction by projection, a single carry from an exact edge point.
* **Held parts (gate (a)).** None of these phrases occurs in §5–§7: "visibly", "differ from a fresh", "no cast
  shadow", "160 of", "16-cell", "16 cells", "night-light layer", "ambient-occlusion" and "door concept".
* **Gates (b) and (c).** The added runs of §5–§7 name no reference build, generator, class or method. C1 is 5 hits,
  0 unreviewed.
* **J ids** (`jids.out`). 153 distinct ids are cited in §5–§7. The index and Part A have 735 rows each, with the same id
  set. Every cited id resolves except `J-K` (pre-existing, IMPROVEMENTS'). J-A66.72 is unused, so VD3-05 may take it.
* **Deferral wording.** TBD, TODO, "to be decided", "open question", "deferred", "for now" and "eventually" have
  0 hits over §5–§7.
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "5,6,7" --allow
  docs/validation/doc-checks-allow.tsv` ran on the installed design `70ddb6e3…` (9 626 JSON files, 916 788 corpus
  3-grams, 478 lists). Hits / unreviewed: C1 5 / 0, C2 0 / 0, C3 250 / 0, C4 3 / 0, S1 0 / 0, S2 0 / 0. Exit 0, the
  same as round 2.
* **Cross-part notes addressed to this part** (the repair-r3 reports and assemble-r3 §9):
  * model's note on §7.3 item 9 (d) is filed as VD3-05 – VD3-08, aligned with the sibling verifiers' V-MC3-02 / 03 and
    VPR3-04;
  * pipeline's note on the J-A68.73 C3 hit is resolved: "fraction along the footprint edge" occurs 0 times;
  * scope's harmonisation of §13.2 is landed, and it follows this part's wording;
  * rendering and kernel address nothing to this part.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED**, by executed grep, diff, script or document check on the installed files:
* every quoted text and line number;
* the five FIXED verdicts;
* the pointer counts and their classes;
* the door-light geometry — the undefined edge in 99.5 % of cases, the projection rule's bounded error, and the 50.4 %
  outside-footprint rate;
* the J-id resolution, the held-phrase absence, and the deferral and gate-(b) scans;
* the document-check counts.

**PLAUSIBLE**, as a reading:
* that VD3-01's nearest-edge projection keeps J-A68.73's intent (the door light never pushed indoors, never
  re-seated) — the bench shows it bounded, but the tie rule and the clamp are my choice;
* VD3-02's severity (major: a stage-end row that rejects half the door lights of every lit map, though the fix is
  one row);
* VD3-03's 60 cm default (the offset both benches assumed);
* VD3-05's reading of "an undercity entrance" as a neighbourhood that a `drawBoundary` or `split` leaves without a
  lifeline — shared with VPR3-04 and V-MC3-02 — and J-A66.72 as its record;
* the rendering cache reading under §4's "checked and not raised".
