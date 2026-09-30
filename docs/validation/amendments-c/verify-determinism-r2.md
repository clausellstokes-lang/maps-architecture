# verify-determinism-r2 — lane amendments-c/verify-determinism-r2 (the DETERMINISM part after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-determinism-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-determinism-r1, repair-determinism-r2 report, assemble-r2, the other repair-r2 reports' notes; §5–§7 live whole-diffed, word diff pre-r2 → live read whole): done
> STEP 1 re-check of the 15 rows routed to determinism in round 2 and of the 7 VD1 rows given to other owners: done (all FIXED)
> STEP 2 new-problem / single-source / stale / deferral / reference / held-part sweep of the repaired subsections: done
> STEP 3 cross-part notes addressed to this part (repair-r2 reports): done
> STEP 4 doc checks "5,6,7": done (exit 0)
> STEP 5 report body: done | queue row: done | LANDED line: done

Lane `amendments-c/verify-determinism-r2`, 2026-09-28. Read-only lane: the design files were not touched.
Design read: `docs/ARCHITECTURE.md` sha256 `3daa0b0731b8c76f…` (17 215 lines; §5 l. 6794, §6 l. 7031, §7 l. 7796–9515),
rationale `bfa20419ca4dd6e5…`; the before is `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md`
(`024c57da…`). Scratch: `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/vd2/`
(`live57.md`, `pre57.md`, `wd57.diff`, `wd-all.diff`, `added.txt`, `jids.out`, `item2.out`, `edit.ts` + `tests.ts` + `mk.py`,
`dc-567.out`).

## 1 Outcome

Repair round 2 fixed **all 15 rows routed to the determinism part** (10 distinct: VD1-01 = VS1-01, VD1-02, VD1-03,
VD1-04, VD1-05 = V-MC1-04, VD1-06 = V-MC1-07, VD1-07, VPR1-02, VPR1-15, VPR1-16), and the other owners fixed all 7 VD1
rows I had given them (VD1-08 … VD1-14). §5–§7 changed only in the seven subsections the repair named (§5.2, §5.4, §6.1,
§7.1, §7.4, §7.5, §7.7; 57 diff lines, every hunk traced to a routed row). Held parts stay out, gates (b) and (c) hold
(no reference name in the 57 added runs; C1 5 / 0), no deferral wording (0 before, 0 after), the 152 J ids cited in
§5–§7 resolve in the index and in Part A (only IMPROVEMENTS' `J-K`, pre-existing), and the document checks exit 0.
`WorksChange` type-checks against the live `EditEvent` union (deno; five kinds in, `epoch`, `startWorks`, `seq` and
`session` refused, negative control fails).

This round finds **5 new issues, all minor**: determinism 4, scope 1. One is a duplicate of `verify-pipeline-r2`'s
VPR2-07 (marked "="). None needs an owner ruling.
* **VD2-01** — §7.4's door-light carry shifts the light by its entrance vertex's displacement. Under a warp that turns
  the facade, the light leaves the facade: executed, a 60 cm side offset and a 1.5° turn put it 1.57 cm indoors. So
  "no warp pushes it indoors" does not hold. The fix carries it by its fraction along its door's edge.
* **VD2-03** — "§7.7 item 2" names two different things. Twenty-five pointers mean layer 2, the circumstance slices.
  Fourteen mean the dossier contract's item 2, *Existence*. This is found in passing, outside the repaired text, and
  the fix is a scripted one-string sweep.
* **VD2-04** — §13.2's B-EDIT warp fixtures prove none of J-A68.73's three carried records (scope).

## 2 Re-check of the round-1 issues

FIXED = the live text carries the required change (quoted in brief, live line). All 22 are FIXED.

| id | owner | verdict | live text (line) |
|---|---|---|---|
| VD1-01 = VS1-01 | determinism | FIXED | item 15: "A dossier whose population lies above the 120 000 cap is refused the same way — `E_RUNG_UNAVAILABLE` naming the cap, nothing absorbed — and both refusals hold at creation and at every absorb (§14's `creation` and `absorb`) … (J-A81.01). Inside the ladder …" (9407–9410); DR23 "a dossier below the floor or above the cap is refused (item 15)" (9309); §5.4 "one whose population lies outside the ladder, below the 1 500-person floor or above the 120 000 cap, `E_RUNG_UNAVAILABLE` (§7.7 item 15, item 81; J-A81.01) — makes no model, or at an absorb no event" (7029) |
| VD1-02 | determinism | FIXED | §7.5 "… and so does the `tunnel` of an older `convert` event's underground decline op (`silt`, `caveIn`, `seal`, `reopen`; `DeclineOp`, §4.11 — `flood` is new and has no older form)" (8848–8849); checked against the pre-pass `DeclineOp` (archive: `tunnel: Id`, no `flood`) and II.6 (15447) |
| VD1-03 | determinism | FIXED | layer 2: "`disorder` … the blueprint's setting (a timeline entry's over epochs); the dossier's crime scalar never fills it — it reaches the undercity through §4.6's staged crime term alone (item 88; J-A88.41, J-A88.73), so crime is counted once" (9042–9045); DR17 inputs/rule (9303); J-A88.73 once in the index and once in Part A; no other "disorder" filling statement in the design (§10.2 `PortRows.crime` 11638, II.7.5 15870 agree) |
| VD1-04 | determinism | FIXED (see VD2-01) | §7.4 "— never a door light, which keeps its entrance vertex's displaced point wherever it falls, so no warp pushes it indoors" (8709–8710); held clause "— a door light excepted, which goes with its entrance vertex (§2.6) —" (8716); J-A68.73 row and Part A restated |
| VD1-05 = V-MC1-04 | determinism | FIXED | host list: "a tunnel's band faces at the junction a junction light marks (its junction wedge and half-corridor strips), the faces of the underground element an access point's `access_point` vertex lies on …, a castle's inner ward, bailey and gatehouse footprint (`Castle.innerWard`, `Castle.bailey`, `Castle.gatehouse`), a decoration's face …, and for a hand-placed light on any other entity the face that entity is or stands on (§7.1's `placeLight`); of a host's several faces, the one `pointLocate` on its `PlatKey` returns … (§5.3's light row)" (8692–8698); the fields exist (§2.7 `Castle` 1782–1784), and the list covers §2.7's repaired `LightSource.host` (1861) and §4.7's hosts (5584–5589) |
| VD1-06 = V-MC1-07 | determinism | FIXED | `setEntrance` comment "the main entrance may be moved along the footprint side §2.6 rule 1 puts it on, never removed" (7862); "which may only move along the footprint side §2.6 rule 1 puts it on" (7980); §2.6 rule 4 agrees (1507) |
| VD1-07 | determinism | FIXED | `change?: WorksChange` (7889); `type WithoutBase<E> = E extends unknown ? Omit<E, keyof EditBase> : never;` and `type WorksChange = WithoutBase<Extract<EditEvent, { t: 'build' \| 'convert' \| 'join' \| 'split' \| 'delete' }>>` (7901–7902); executed: deno check of the live l. 7812–7902 with 44 stubbed names — the five kinds accepted, `epoch`, `startWorks`, `seq`, `session` refused, control fails |
| VPR1-02 | determinism | FIXED | F-SITING where "S10a's band-range re-homing (§4.5 (5)); S10b; …", detection "S10a's band-range re-homing (§4.5 (5)) finds no district whose capacity holds a household that fills no dossier's population (… housed at the nearest range, J-A72.50)", ladder "(S7b) and in S10a's band-range re-homing (§4.5 (5); J-A72.50)", household rung "a household S10a's band-range re-homing or S11's overflow pass cannot house" (6905); agrees with §4.5 (5) (4818), J-A72.50 (17135), T72-9 (13479–13482) |
| VPR1-15 | determinism | FIXED | §6.1 readers: "`blueprint.features` also draws the geology flag's uniform … and then the relief toggle's `auto` pick … appended after them in that order, and each drawn whether its toggle is `auto` or set (a set toggle ignores its draw), so no existing feature's draw moves and setting either toggle moves no other draw" (7173–7176); agrees with §4.2 S0 (3865), S1 (10) (3994), T65-7 (13416–13421), J-A65.02 Part A ("§6.1 draws the flag's uniform ahead of the relief pick") |
| VPR1-16 | determinism | FIXED | layer 2 trade: "The `road` partners' bearings are among S3 (4)'s requested external bearings (§4.2); every partner's bearing and weight feed `TradeFlow` …" (9021–9023); DR3 "its `road` partners' bearings read by S3 (4) as requested bearings (§4.2)" (9289); agrees with §4.2 S3 (4) (4122), §4.3 (4359), J-A77.42 |
| VD1-08 = V-MC1-01 | model | FIXED | §2.7 `concealmentSource` "a mode the dossier set is dossier-owned, so a map setAttr of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22)" and both dossier paths stated (1817); cites §7.7 items 5 and 11 (b), both of which exist and say what is cited |
| VD1-09 = V-MC1-02 | pipeline | FIXED | §4.7 (1) "… one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22); a dossier event that withdraws the mode it set re-resolves it …" (5500) |
| VD1-10 | pipeline | FIXED | II.7.6 "the closure rule — one event whose batches commit together" (16064) |
| VD1-11 = V-MC1-09 | rendering | FIXED | "§2.8's marker" 0 hits in the design and the rationale |
| VD1-12 = V-MC1-03 | model | FIXED | §2.7 `LightSource.host` "the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point … for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1)" (1861) |
| VD1-13 | model | FIXED | §2.8 "`Works` (§2.7; lineage unit its target's lineage with its start week, §6.3; its `works` draws keyed as §6.1 states; …)" (2112–2113) |
| VD1-14 = VPR1-06 | pipeline | FIXED | §4.11 "A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01) and never reaches an epoch" (6415) |

## 3 Item verdicts (updated from round 1; `verify-determinism-r0.md` §2 for the full quotes)

Round 1's PARTIAL items **81** (VD1-01), **65** (VD1-02, VPR1-15), **88** (VD1-03), **67** (VD1-07) are now PRESENT.
The referencing items **72** (VPR1-02) and **77** (VPR1-16) are also PRESENT. **68** stays PARTIAL, for a new reason:
VD2-01 (the door light under a turning warp) and VD2-04 (no warp bar for the light, access-point and Works carry).
Items **77–79** stay PRESENT, but their layer-2 pointers are ambiguous (VD2-03). Item **88**'s F4 wording is VD2-02.
Every other home or referencing item keeps round 1's PRESENT: **20 (h), 51, 52, 66, 74, 75, 78, 80, 82, 86, 87, 101;
34, 36, 37, 39, 41, 42, 43, 44, 45, 47, 56, 62, 63, 64, 69, 70, 71, 73, 76, 79, 83, 85**.

## 4 Issues (round 2)

| id | sev | kind | owner | where | the defect | required change |
|---|---|---|---|---|---|---|
| VD2-01 | minor | new-problem | determinism | §7.4 *Warp and what stands on the ground* (8698–8700, 8709–8710, 8716); J-A68.73 index (17128) and Part A (rationale 752) | A door light stands beside its door (§4.7 (4): "a door lantern's side of its door") on the footprint edge. §7.4 moves it by its entrance vertex's displacement only. Under a warp that turns the facade, the lantern is shifted but not turned with the edge, so it leaves the facade by d·sin θ. Executed (`vd2/`): a 60 cm offset and a 1.5° turn leave it 1.57 cm indoors, or outdoors for the opposite turn. So "so no warp pushes it indoors" is false. The re-seat clause's "keeps its entrance vertex's displaced point" also reads as the light jumping onto the vertex. | (1) Replace "a door light, which stands at its door on the footprint's edge, instead takes the displacement of its entrance vertex, which §2.6 carries with its wing)" (the text wraps a line) with "a door light, which stands beside its door on the footprint edge that ends at its entrance vertex, instead keeps its fraction along that edge — its new point the edge's two moved end vertices blended at the fraction its old point had between the old ones (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice — so it stays on the moved facade whether the warp slides or turns it)". (2) Replace "never a door light, which keeps its entrance vertex's displaced point wherever it falls" with "never a door light, which keeps that point on its edge wherever it falls". (3) Replace "— a door light excepted, which goes with its entrance vertex (§2.6) —" with "— a door light excepted, which goes with its door's edge (§2.6) —". (4) J-A68.73 index: "(a door light excepted: it keeps its entrance vertex's displacement, never re-seated)" → "(a door light excepted: it keeps its fraction along its door's footprint edge, never re-seated)". Part A: "a door light taking its entrance vertex's displacement instead and never re-seated" → "a door light keeping its fraction along its door's footprint edge instead and never re-seated". In Part A, after "where any clearance test would push it indoors on every warp", add "and a shift by its entrance vertex's displacement alone would leave the facade wherever a warp turns it". Restate the row under its id. |
| VD2-02 = VPR2-07 | minor | stale | determinism | §7.7 item 13 F4 row (9373); item 14's `impaired` state row (9390) | Both rows say non-physical impairments reach "the power slice's dial only". Round 2's §4.5 (6) (VPR1-03) and J-A88.42 make it the impaired institution's own institution-dial term, `conditionSteps × severity × dial.conditionStep`. The rows can be read as the power's town-wide standing, and neither points to the home. | VPR2-07's text. F4: "the non-physical — legitimacy, influence, wealth, staffing, corruption — the power slice's dial only" → "the non-physical — legitimacy, influence, wealth, staffing, corruption — the impaired institution's own dial term only (§4.5 (6); J-A88.42)". l. 9390: "the non-physical reach the power slice's dial only" → "the non-physical reach the impaired institution's own dial term only (§4.5 (6))". |
| VD2-03 | minor | broken-reference | determinism | §7.7's two numbered lists; 25 pointers in §2.7, §4.2, §4.3, §4.5, §4.11, §5.3, §10.2, §10.3, §11.1, §14, II.7.5 and the index | §7.7 numbers its three input layers 1–3 and its dossier-contract items 1–16. "§7.7 item 2" therefore names both layer 2 (the circumstance slices: powers, trade, economy, `disorder`) and contract item 2, *Existence*. 25 of the design's 39 "§7.7 item 2" pointers mean layer 2, and 14 mean *Existence*. "§7.7 item 1's outcome targets" (2182) means layer 1, while every other "§7.7 item 1" means the contract's *One way*. Only three places write "layer 2". A reader following, say, `PowerStanding` (§7.7 item 2) lands on *Existence*. Found in passing; it is not raised against a repaired subsection. | Determinism writes this as an assembler hand-off: a scripted one-string substitution, each count asserted. Replace "§7.7 item 2" with "§7.7 layer 2" at design lines 1814, 1824 (both), 1867, 1901, 1902, 4125, 4349, 4367, 4603, 4750 ("§7.7 item 2's circumstance slices"), 4824, 6360, 6393 (the second pointer on the line, "the circumstance slices (§7.7 item 2)"), 6418, 6938, 11430, 11497, 11634, 11768, 11910, 14395, 14407, 15870, and J-A79.23's index row (16952). That is 25 substitutions on 24 lines (`vd2/item2.out`). Replace "§7.7 item 1's outcome targets" (2182) with "§7.7 layer 1's outcome targets". Afterwards every remaining "§7.7 item 2" (14) and "§7.7 item 1" points into the dossier contract. Re-run doc_checks over the touched keys. |
| VD2-04 | minor | missing | scope | §13.2 B-EDIT warp fixtures (the sentence ending "and one halved by a pinned pin (§7.4)") | Round 1 and round 2 give §7.4's mean-value carry three more record kinds (J-A68.73): a light's point for every host, with the door light's exception; an access point's opening; and a Works' kept rings. No bar proves any of them. The fixtures cover a pin, a user-moved tree and a pinned pin only (rule 2: the test that proves the mechanism). | After "and one halved by a pinned pin (§7.4)" add: "; a warp and a `moveVertex` over a lit street with an inn — every street light, the inn's door light, a hand-placed light on a pin and a junction light on a tunnel carried in their host faces by §7.4's rule, the door light on its door's footprint edge and never re-seated, a light pushed inside its `sizeCm` clearance re-seated, one whose inset empties re-placed when generated and orphaned and reported when hand-placed; an access point's opening carried in its ground host; a building under a demolition Works whose kept rings take their mean-value images unre-seated; undo restoring every former point byte for byte and a replay reproducing them (§7.4; J-A68.73)" |
| VD2-05 | minor | stale | determinism | J-A81.01 index row (17145) and Part A (rationale 769) | Round 2 made §7.7 item 15 the home that states the cap refusal, and §1.1, §4.11, §5.4, §14 and DR23 all cite it. J-A81.01's section column ("§1.1, §14") and its Part A list ("(§1.1, §14, D-33; item 81; repair r1, VSC-21)") omit §7.7. Its sibling J-A81.71 lists §7.7. | Index: "§1.1, §14" → "§7.7, §1.1, §14". Part A: "(§1.1, §14, D-33; item 81; repair r1, VSC-21)" → "(§7.7 item 15, §1.1, §14, D-33; item 81; repair r1, VSC-21; repair r2, VD1-01)". Restate the row under its id. |

Checked and not raised:
* **The relief row and the parity presets.** The relief row is read under the parity presets. It is not an `extension`,
  and its provenance is `own` (pipeline r2's departure 4). §7.6 admits `own` beside `ref:` and `extension`, and
  J-A65.49 records the choice.
* **The relief pick's order and the unconditional draw.** §6.1's order (geology first, each drawn whether set or not) is
  recorded in J-A65.02's Part A ("§6.1 draws the flag's uniform ahead of the relief pick"). The unconditional draw
  applies §6.1's standing rule that nothing already drawing moves.
* **`registerProvider`.** Its refusals (rendering r2, §11.2) are consistent with §6.5 (8)'s double-run check, which
  states the check. §11.2 states the call's result.
* **The cap refusal in two places.** §1.1 and item 15 both state it. That follows the floor refusal's existing pattern
  (J-A81.71: §7.7 and §1.1), and inside this part item 15 is the one statement, which §5.4 and DR23 cite.

## 5 Checks run (receipts in scratch `vd2/`)

* **Scope of the change.** The diff of §5–§7 (archive `024c57da…` → live `3daa0b07…`) has 57 changed lines, all in
  §5.2, §5.4, §6.1, §7.1, §7.4, §7.5 and §7.7. The word diff (`wd57.diff`, 15 hunks) was read whole, and every hunk was
  traced to a row of §2. §5.1, §5.3, §6.2–§6.5, §7.2, §7.3, §7.6 and §7.8 are byte-identical to round 1's reading.
* **Whole-document word diff** (`wd-all.diff`, 108 hunks). Every added run that cites §5–§7 was followed to its target:
  model's §2.3 geology row and §2.7 `concealmentSource` (§7.1's terrain row; §7.7 items 5, 7, 11 (b)); pipeline's §4.5 (5)
  and (6), §4.7 (1), §4.11 and II.7.6; rendering's §11.2 `registerProvider` (§6.5 (8)); and scope's T65-7, T72-9 and
  M1 (§6.1's order). Each target states what the citing text assumes, except the F4 row (VD2-02).
* **Sections read** wherever the new text cites them: §1.1 (338–349), §2.6 rules 1–4, §2.7 `Castle`, `LightSource`,
  `concealmentSource` and `CircumstanceSlice`, §2.8's registry, §4.2 S0 / S1 (1) / S1 (10) / S3 (4), §4.3's partners,
  §4.5 (5)–(6), §4.7 *Light sources* (1)–(5), §4.11's `DeclineOp` and *The rung at an epoch*, §6.5 (8), §7.6's
  provenance, §7.7 items 2, 5, 7, 11 and 15, II.6's tunnel sentence, II.7.5's size law, §13.2's B-EDIT warp fixtures,
  T65-7, T72-9 and T81-2, and the J rows and Part A entries of J-A65.49, J-A65.02, J-A67.72, J-A68.73, J-A72.50,
  J-A77.42, J-A81.01, J-A81.71, J-A88.41 and J-A88.73.
* **Held parts (gate (a)).** In §5–§7, before and after: "visibly", "differ from a fresh", "no cast shadow", "160",
  "night-light layer", "ambient-occlusion" and "16-cell" / "16 cells" have 0 hits each. The two "VG 1.6.9" hits are
  pre-existing retry evidence, not the held shading support.
* **Gates (b) and (c).** The 57 added runs (`added.txt`) name no reference build or generator. C1 is 5 hits, 0
  unreviewed.
* **J ids** (`jids.out`). 152 distinct ids are cited in §5–§7, against 733 index rows and 733 Part A entries, with the
  same id set and no duplicate. All resolve except `J-K`, which is pre-existing. J-A68.73 and J-A88.73 each occur once
  in the index and once in Part A.
* **Types.** The live `EditBase` … `WorksChange` (l. 7812–7902) with 44 unknown names stubbed passes `deno check`, with
  the positive and `@ts-expect-error` cases in `tests.ts`. Removing one expectation fails the check, as it should.
* **Door-light geometry.** The numeric check (a 60 cm side offset, a ±1.5° turn about a far centre) puts the translated
  light 1.57 cm off the moved facade, on the indoor side for one turn direction (VD2-01).
* **Deferral wording.** "TBD / TODO / to be decided / open question / deferred / for now / eventually / will be" over
  §5–§7 gives 0 before and 0 after.
* **Pointers.** Every "§7.7 item n", "§7.3 item n" and DR pointer resolves to an existing item. The design has 39
  "§7.7 item 2" pointers, of which 25 mean layer 2 (VD2-03).
* **Document checks.** `python3 docs/validation/bench/doc_checks.py --sections "5,6,7" --allow
  docs/validation/doc-checks-allow.tsv` ran on the installed design `3daa0b07…` (9 626 JSON files, 916 788 corpus
  3-grams, 478 lists). Hits / unreviewed: C1 5 / 0, C2 0 / 0, C3 250 / 0, C4 3 / 0, S1 0 / 0, S2 0 / 0. Exit 0, the
  same as round 1.
* **Cross-part notes addressed to this part** (the repair-r2 reports):
  * Model's V-MC1-04 and V-MC1-07 are done.
  * Pipeline's note 1 (§5.2) is done, folded by determinism r2.
  * Scope's hand-off 2 (§6.1's order) is done.
  * Kernel and rendering address nothing to this part.
  * This part's own repair notes to others are all folded (VD1-08 … VD1-14, §2 above).

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED**, by executed grep, diff, script, type check or document check on the installed files:
* every quoted text and line number;
* the 22 FIXED verdicts;
* the `WorksChange` typing;
* the door light's off-facade shift under a turn;
* the 25 / 14 split of "§7.7 item 2";
* the J-id resolution, the held-phrase absence, and the deferral and gate-(b) scans;
* the document-check counts.

**PLAUSIBLE**, as a reading:
* that each required change is the smallest fix coherent with the ruling it cites, in particular that VD2-01's
  edge-fraction carry keeps J-A68.73's intent (a door light never pushed indoors, never re-seated) while making it hold
  under a turning warp;
* the severity grading: all minor — a centimetre-scale geometric slip, a pointer's precision, a navigational ambiguity,
  a missing fixture and a table cell.
