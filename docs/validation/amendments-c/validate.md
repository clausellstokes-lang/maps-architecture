# amendments-c/validate — the final validation of the bundled amendments pass (c + d + e)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/validate; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> PART 0 inputs read (amendments c, d, e; route §C.4, §C.9.4; assemble-r2): done
> PART 1 scripted gates (held parts, released parts, identifiers, build naming, J-A coverage, deferral words, doc checks): done (scratch val/held.out, idents.out, buildnaming*.out, defer.out, dc-whole.out)
> PART 2 ruling fidelity per item (33–62 editor texts; 63–72, 20 (h), 73–88, 101 mechanisms at their homes): done (val/fidelity.py)
> PART 3 coherence (summary, §1, §16, II.6, PART III, the context vector, the evolution hooks): done
> PART 4 the 29 open r2 issues re-checked on the installed design: done (every anchor text found; both rendering receipts re-run byte-identical)
> PART 5 issue table, queue row, LANDED line: done (§5: 29 distinct issues, 33 ids; queue row A-amendments-c/validate; design files untouched, hashes re-checked at end)

Lane `amendments-c/validate`, 2026-09-28. Input: design `3daa0b07…` (17 215 lines, 2 281 645 bytes), rationale `bfa20419…`
(2 314 lines), both as installed by assemble-r2 and unchanged since (hashes re-checked at start). Scratch:
`c0d81c15…/scratchpad/val/`.

## 1 Outcome

**The pass is not yet clean: 29 distinct issues stay open (33 ids) — 2 major and 27 minor.** They are the 29 issue ids
that round 2's six verifiers left open (25 distinct issues, four ids being duplicates; each re-checked here on the
installed text) and 4 new minor issues this seat found.
No SUMMARY.md is written: that file is written only when the validator raises no issue.

The pass is sound in the ways that decide the owner's questions.
* **Held parts.** No held part was applied.
* **Evidence gate.** The released parts (37, 58 (f), 59's timing) carry Fable's labelled wording. Item 49's rejected
  deletion is honoured: "49 % of buildings in no ring" stays, cited to `_critic-ftg.md` F4 alone. The corrected editor
  texts of items 39 and 46 are the ones that landed.
* **Reference identifiers.** No reference class or method name, code, grammar, palette or word list was added to either
  file.
* **Coverage.** Every item (20 (h), 32–88, 101) has at least one J-A row: 454 index rows and 454 Part A entries, the
  same set.
* **Owner rulings.** The rulings Q1–Q6 hold where the owner placed them.
* **Summary, §1 and §16.** The one-page summary and §1 are still true. §16's rows sum to the 185.5–248.5 person-weeks
  that the summary and §16 state.

Both majors are rendering machinery of item 68's shadow window. **VRC2-01:** the ring positions grow with the square of
the relief under a low fixed or path sun, and no budget counts them. **VRC2-03:** the full-precision fallback keeps
one-byte pyramids, so §13.4's parity bar cannot hold. Both rendering receipts re-run byte-identical here.

The 4 new minor issues are:
* two build-naming slips (gate (b)) — VAL-01 and VAL-02;
* one duplicated default — VAL-03;
* one stale reference identifier in an old rationale entry — VAL-04.

A fifth candidate — that D-1, the look decision, does not record the default map's cast shadows put to the owner — was
withdrawn on checking: D-19 carries it ("which families cast shadows by default being §8.4's ruling (J-A68.81), put
to the owner"; J-A68.05), and a second statement in D-1 would break single source.

## 2 The file's gates, checked by script on the installed files (design `3daa0b07…`, rationale `bfa20419…`)

| gate | result | receipt (scratch `val/`) |
|---|---|---|
| (a) held parts absent | **CONFIRMED.** The held phrases are absent: "160 of 162" and its variants, "16 cells", "visibly differ" (present once only in Part A J-A52.61, which says the claim is held) and "door concept". "draws no cast shadow" occurs only as our `MFCG` preset's behaviour (§1.2, §8.2, §8.4, J-A68.86), "with no claim about the reference". Item 50's MFCG clause is the route's permitted inference sentence ("MFCG 12710731's model, read in full, carries no door", §10.2 l. 11579; the gate's completion confirmed item 50 as written) | `held.out` |
| (a) released parts, labelled | **CONFIRMED.** 37: §4.6 step 5 "NG 1.2.2's two model units read as ≈ 0.7 m through its export scale … an inference". 58 (f): II.2 l. 15232 "For scale only … ≈ 525 m, read through its …". 59: §12.7 l. 12705 "a restatement … research test instrument … roughly 0.08 ms … about 0.6 ms". 49: §1.4's districts row keeps "49 % of buildings in no ring (`_critic-ftg.md` F4, row 16)", and "containment 53 %" is gone from both files | `held.out` |
| (a) corrected editor texts | **CONFIRMED.** Item 39: §1.3 l. 376 and §3.5 l. 3174 read "two logged loops (a balance retry, up to 20 in random frames, then accepted; a restart when no far edge exists)", with no console string ("Alternative cut" occurs 0 times). Item 46: §13.5 l. 13818 reads "… MFCG 12710731's coded law, which counts mesh cells and was recorded at 3 / 4 / 5 / 7 gates at sizes 26 / 39 / 51 / 80 with a coast (P11)" | `fidelity.py` |
| (c) no reference identifier | **CONFIRMED for this pass.** All 63 class and method names of `code-impact.md` §(d) and route §C.5 were searched, plus the backticked class words. The design has 0 hits. The backticked `Castle`, `Wing`, `Plan` and `Block` are our own record names. The rationale has 2 hits of `validateEdge`, both in J-P37's text, which predates this pass. §4.5, which this pass rewrote, now names that test "the edge test", so the old entry points at a name the design no longer has (VAL-04) | `idents.out` |
| (b) build naming | **Two slips.** Each new design sentence that names a reference and lacks a build tag was listed: 70 candidates by verb, plus every sentence that carries a code-reading marker. Every code-reading sentence names its build. Three design sentences state what a reference does without the build: §4.6 step 2 "NG's measured outputs"; §13.5 "FTG sends no lot or plot"; §15.1 C9 "FTG sends no door". The same holds for one rationale sentence: J-A42.41, "42 % of NG's lot leaves … are its courts". See VAL-01 and VAL-02. The remaining candidates describe our presets or are measurements | `buildnaming.out`, `buildnaming2.out`, `buildnaming-r.out` |
| (5) a J-A row per ruling | **CONFIRMED.** 454 J-A index rows equal 454 Part A entries (the same id set, no duplicate). Rows per item: 20 has 20; 32–62 have 1–4 each; 63 has 10; 64 has 5; 65 has 18; 66 has 4; 67 has 18; 68 has 23; 69 has 6; 70 has 11; 71 has 5; 72 has 19; 73–88 have 1–7 each; 101 has 20. No item lacks a row | inline script |
| (4) no deferral wording | **CONFIRMED.** Every new sentence was scanned for TBD, pending, "left open", "to confirm", "for now" and similar words. Each hit is one of four things: a mechanism word ("pending removal", "pending dry run"); a put-to-the-owner default with a vetoable J row (J-A68.81, J-A69.82, J-A72.4x); D-22's "private for now"; or item 101's survey questions, which §13.4's first-five-minutes test measures with pre-decided fallbacks (J-A101.03) | `defer.out` |
| (7) one banner | **CONFIRMED.** The title block (l. 1–19) is byte-identical to the pre-pass archive, and no per-section marker was added | diff |
| §17.1 (2) document checks | **CONFIRMED exit 0 on the pass's keys** (assemble-r2 §7: C1 5/0, C2 0/0, C3 1 334/0, C4 10/0, S1 0/0, S2 0/0). The whole-document run here gives C1 5/0, C2 0/0, C3 1 445/1, C4 12/0, S1 0/0, S2 0/0, exit 1. The one unreviewed hit is "of docs confidence md docs" in the title block (l. 14's list of file paths). The title block is outside every key the gate runs over and is byte-identical to the pre-pass archive, so it is pre-existing. It is recorded here and not raised against this pass | `dc-whole.out` |

## 3 Ruling fidelity, per item (kind owner-fidelity for the owner rules)

Method. For items 33–62, each exact editor change was searched in the installed design: 62 phrase checks. Where the
item's words and the landed words differ, the J row that records the change was read (`val/fidelity.py`). For the
owner-rule items and d and e, the owner's words were checked against their homes and the owner's rulings. Each
section-level verdict is the r2 verifiers'. This seat relies on them and states it (§7).

| items | ruling as applied | verdict |
|---|---|---|
| 32, 62 | the provenance sentence §17.1 (1); the `(code)` form §17.1 (6), (8) | as ruled |
| 33–41 (bent cut) | citations with builds; slope term `own`; `τ = e_lo·(e_hi/e_lo)^g` on `cut.stop`; `f = (c + b)/2` with the holed law; deterministic start; corner-first and the far side from K; `cut.bendMode` flatten / straightFirst; the fillet predictor; rung (a) turned 36°; the width power law; `cut.side` and `cut.farSideAlt` retired as reserved ids "never reused, so no key moves" (J-A41.61: deleting a registry id would re-key later appends); §13.5's measured outputs with the fillet bar | as ruled. Two deviations were checked and are recorded: the `MFCG` preset's `cut.flattenM` = 8 m rests on critic X3 / R-M3 (the shared default "a triangle height under 2 units", MFCG's 4 m unit) — CONFIRMED facts, a calibration inside item 37's CALIBRATE and not a held part (J-A37.42); VAL-01 (build name) |
| 42–47 | courts, not discards; the recession law with our construction. `jitter.minM` is 0.3 m, not the item's 0.25 m, because §3.6's attraction would absorb a 25 cm recession (J-A43.42, reasoned). The enclosure is ours, and the `NG` preset sets it to the fence. The castle repair runs bloat then equalise toward `regularFit`. The waterfront gate reduction uses Fable's corrected wording, and `wall.smoothPasses` is 3. Growth rates are by seed kind | as ruled |
| 48–52 | 6 × lots rounded up; 49 per the evidence gate; the owner's door rule with the `P → C` entrance row; the retry and stream citations; the history-independence test (§6.5 (9)) and the clock ban | as ruled. VAL-02 (build name, 49/50's rows) |
| 53–57 | the torus annulus; our contours; FIFO notes; `raised(offset, classRatio)`; the horizontal spine; the D1 naming row; the two sector sources with the outward claim | as ruled |
| 58–61 (staged) | II.2 ring courses; II.3's greens rule and pin decay; the render notes; 58 (f) released; the stage-3 layout rows plus what ours adds; 59's timing released; the Dwellings baselines; VG 1.6.9's observations | as ruled |
| 63 | the three modes with the fallback underground → front → hidden; knowledge not geometry (the public tier shows the front only, T63-2); the dossier the authority; mutation keeps the true function | faithful. VPR2-02 (the "resolved once" wording) |
| 64 | the access gate (basement, a reachable tunnel or dwelling); the lottery by class × band × age × the concealed multiplier × sewer existence; institutions of order low; the state follows the element | faithful |
| 65 | one layer of systems with depth bands and typed, knowledge-gated links, "not always". The undercity bound 1 / 2 / 3 in `RungProfile.layers.undercity`. Fable's A-M2 note 2 is honoured: TOWN "at most 1, above 6 000 people, chance 0.2", and a void source is required everywhere (II.7.5). The shadow-not-a-second-city clauses (c′)(1)–(5) hold | faithful. Residue: VPR2-03 – VPR2-06, VPR2-08 = VS2-02, V-MC2-02 |
| 66 | one event, one undo, the closure record; a lawful basement or a stated refusal; the dug system where none exists, the sewer rung rules unchanged; the shared connector survives | faithful |
| 67 | the Works record derived at any week; the stage lists (c)–(f); plots in transition; restraint by growth rate; none at generation or in the parity presets | faithful |
| 68 | the owner's five points. Day is the default, with the cursor as the sun's ground point. The shadows are radial, with length d·h ÷ (H − h). The moon is softer. A spot lit from every side casts no shadow (T68-1). No shadow climbs a taller roof, and a shadow on a lower roof is shortened by that roof (T68-2, T68-3). Falloff with an effective radius. Underground light comes without a global light, with the hand lantern off by default. The item's own reading "ink without cast shadows unless switched on" was overruled in favour of the owner's words ("a daytime view is the default … every shadow moves"), recorded as J-A68.81 and put to the owner in the summary and §0.2 | faithful. Machinery defects VRC2-01 – VRC2-07, VD2-01, VD2-04 = VS2-01; the put-to-owner default is carried by D-19 (J-A68.05) |
| 69 | paper, ink and plate-chroma targets; the scoped exception cited "owner-opened corpus palette exception, 2026-09-27"; `ink` plate chroma at 20–30, put to the owner (J-A69.82) | faithful |
| 70 | tenure; the `cluster` arrangement with a door per structure on a footpath; FTG's trigger and staging as the default, and the extramural preference as J-A27.43's extension (Fable's A-M2 note 1) | faithful. VAL-03 (a duplicated default) |
| 71 | the mix interpolated along the value; a shift for town wealth; prime frontages; T71-1 all manors at the extreme | faithful |
| 72 | the character vector; emergent identities with dossier kinds winning; three kinds of institution; the three dials; value, not volume; the band range with its clamp and pressure; the economy dial proportional to share with no rank term (J-A72.49); partition, never doubled | faithful. VPR2-01 |
| 20 (h) | two tiers (`factTier`: dossier / declared / map); derive before invent (DR1–DR25 with their chance entries and the totality bar); the coherence bars; the "dossier-owned" refusal; the map never asks; the binding | faithful |
| 73–88 | the port at M1 in tests only, the absorb half at M3a and the host wiring staged (J-P1 as bundled); the binding key law; the change envelope; the clock and the ± 5 % lapse; the typed slices; `Assignment.state`; the refusal below 1 500 naming the village product (Q3); the tier word as title; naming claims with the Eastern phrase as a placeholder (Q5); SettlementForge's district names never matched (Q6); a resettled site as one map (Q4, J-A75.72); Q1's line at `5d699cc68` (J-A73.01); door 1 closed (Q2); the ignore-list; a host's undo as a forward change; the staged records | faithful. Residue: V-MC2-01, VS2-03, VS2-04, VPR2-07 = VD2-02, VD2-03, VD2-05 = VS2-05 |
| 101 | declare-then-derive; three surfaces; twelve tools in five layers; the clerk (opt-in, labelled as AI, declarations only, reads what its viewer may know); R1–R19 as (f′) corrected; the first-five-minutes test at the M2a and M3a exits; points in, shape out, handles always; the built-in clerk and bridge-deck plots staged | faithful. VRC2-07 |

## 4 Coherence (rule 3), single source (rule 1) and the reference strengths

* **One context vector.** CONFIRMED by reading §2.5's `ContextVector` and the rows it feeds. Each of the pass's new band rows reads the prosperity value through one vector and interpolates along it, as coverage, granularity and greenery do:
  * the class mix (`ClassMixRow`, §10.2);
  * the cluster rows;
  * the light rows by way class × band (§4.7's `LightRule`);
  * the access lottery by class × band (II.7.3);
  * the cover rows.

  The district-level results reach the plot through the district, as `venueMix` does:
  * `bandRange`, written by S10a from pass 2;
  * `character` and `identity`, from S12c;
  * `pressure`, from epochs.

  The underground reads the same vector with `ContextVector.arena`.
* **Evolution hooks: model, pipeline, §6 and §7 agree.** CONFIRMED on the records and the paths between them:
  * **Registry.** §6.1's registry appends `cut.stop`, `works` and `pin.light` with new ids. It retires `cut.side` and `cut.farSideAlt` as reserved ids and lists every added reader keyed as stated (the concealment and cover draws, the class-mix draw, cluster packing, the access lottery, the systems, the undercity, the closure generators, the partner bearings).
  * **Registry path test.** §13.2's test covers every record amendments c add (`Works`, `LightSource`, the four underground records, `Plot.tenure`, the district's `character` / `identity` / `pressure` / `nameHistory`, `Assignment.state`, `Institution.powers`, the staged records). Its enumeration test covers the new event kinds.
  * **Edit events.** §7.1 declares each new edit event, and §7.4 carries each one's lifecycle: `startWorks`, `cancelWorks`, `placeLight`, `addUndergroundAccess`, the sugar events, the points forms, `flood` and `raiseGrade`.
  * **The week.** The week is one derived clock: the document's current week is derived, the per-viewer `week` key names the drawn week, and §10.3's hours never count as weeks.
  * **Per-year rates.** They are converted over an epoch's span wherever epochs can now be weekly (II.6 (4), T76-1).
  * The residue is the r2 items listed in §5.
* **Staged hooks against PART II.6 and the Staged list.** CONFIRMED.
  * II.6 carries each island's light and shadow (item 68) and the per-year slot redraw under the weekly clock (J-A67.40).
  * II.6's condition table serves every underground element, including the `flooded` row (item 65).
  * The *Staged by the owner's roadmap* table names the staged parts of 63–88 and 101 in the same terms as §16 and §0.2.
  * PART III's village rows (islands `none`, sewers and undercity `never`, a concealed use falling back to a front, the dossier refusal below 1 500) agree with §1.1 and II.7.
* **The one-page summary and §1 are still true.** CONFIRMED on a full read of both.
  * The summary's two amendment paragraphs name the right homes.
  * The effort figure 185.5–248.5 pw equals the sum of §16's rows (computed here).
  * §1.1's ladder, the undercity column and the two refusals (below 1 500 and above 120 000) agree with §7.7 item 15 and PART III.
  * §1.2's default (light after the unlit first map, shadows on in every shipped family except the `MFCG` preset) agrees with §8.4 and J-A68.81.
  * §1.3 and §1.4 carry the builds and the corrected citations.
* **Single source.**
  * One new duplicate was found: the cluster footprints and fire gap are stated in §4.7 and again in §10.2's rows (VAL-03).
  * It sits beside round 2's VPR2-06 (the scar values).
  * A heuristic scan of new numeric ranges repeated across sections found no other new duplicate. The other repeats are §13.5's reference measurements, which §15.2 cites by R9 and R10 and which were not added by this pass.
* **Reference strengths.**
  * **Speed and one click.** Kept.
    * `generate({seed})` is unchanged.
    * The first map is drawn unlit, and the light follows within §12.5's settle bound.
    * S12c and the light placement are costed rows of §12.4 (≈ 255 → ≈ 262 ms p50, with the p95 laws unchanged; J-A72.82).
    * Cluster packing runs only on shanty districts, at S11's per-building rate.
    * The one exception is VRC2-01, whose ring count under a low sun no budget counts.
  * **Legibility and charm.** Held.
    * The `ink` default keeps MFCG's restraint: its plate chroma is 20–30, and its shadows are in value only and gentle, with the `MFCG` preset unchanged.
    * Both calls are put to the owner.

## 5 Issues — every open issue with its owning part and the exact required change

Twenty-nine distinct issues (33 ids): 25 carried from round 2's verifiers (29 ids; four pairs are one issue each and are
merged here so that no fix is applied twice) and 4 new (VAL-01 – VAL-04). Each carried issue's anchor text was found
on the installed design by a whitespace-normalised search; each is still open. The repair round applies them in this
order within a part: VD2-01 before VD2-04 = VS2-01; V-MC2-01 with VS2-03 and VS2-04 (one list of HistoryHint's readers).

| id | sev | owner | kind | item | claim (short) |
|---|---|---|---|---|---|
| VRC2-01 | major | rendering | new-problem | 68 | and §8.8 l. 10723 ('whatever R'); receipt amendc_verify_rendering_r2_rings re-run byte-identical.) §8.8 holds and rasters one pyramid per tile position out to the global … |
| VRC2-03 | major | rendering | new-problem | 68 | l. 10398 'one byte, rounded up) — the traversal unchanged'.) §8.4 (g): a tier missing §13.4's tolerance transfers its surface at full precision, but 'the pyramids and the… |
| V-MC2-01 | minor | model | stale | 88 | Round 2 moved HistoryHint's reader to S2 in §2.7 (l. 1868, 1926), and J-A88.42 says the same. Three places still name S0: §2.9's Recipe (l. 2183) 'history?: HistoryHint; … |
| V-MC2-02 | minor | model | conflict | 65, 88 | §2.7's `UndergroundSystem.sources` comment gives 'the raiseGrade that buried a town' as what explains a buried system. II.7.6 (l. 16036) makes a generation-time buried sy… |
| VPR2-01 | minor | pipeline | stale | 72 | "it never reaches into another district — moving demand between districts happens only in S7b's reconcile" — since J-A72.50 S10a's band-range re-homing also moves househo… |
| VPR2-02 | minor | pipeline | new-problem | 63, 20 (h) | Round 2 added "a dossier event that withdraws the mode it set re-resolves it by this order", but (1) still opens "It is resolved once, when the institution is first place… |
| VPR2-03 | minor | pipeline | missing | 81, 65, 66 | The re-derivers of a grown underground part's cleared faces are all stages; a buried system made by a raiseGrade event and the dug system (item 66's edit-made passages) h… |
| VPR2-04 | minor | pipeline | conflict | 65, 88 | "Every system is gated to TOWN and above (PART III) and by its row's chance per rung" and `chance` "absent: none", while round 2's scar rule makes a buried system at gene… |
| VPR2-05 | minor | pipeline | partial | 65, 88 | "laid `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade within *Depth bands*' cover rule (above)" leaves open which wins where the sc… |
| VPR2-06 | minor | pipeline | duplicate | 65, 88 | The params comment gives the scar rows' values "scarSeverity (0.5), scarBaseCm (200), scarGainCm (200)", which the bullet (l. 16036) also states; every other kind's param… |
| VPR2-07 = VD2-02 | minor | determinism | conflict | 88 | Both rows say the non-physical impairments reach "the power slice's dial only"; round 2's §4.5 (6) and restated J-A88.42 make it the impaired institution's own institutio… |
| VPR2-08 = VS2-02 | minor | scope | stale | 65, 88 | "registered after the network stage by declared I/O — the systems (catacomb, cavern, quarry, vaults)" omits the generation-time buried system II.7.6 now registers after v… |
| VD2-01 | minor | determinism | new-problem | 68 | A door light stands beside its door on the footprint edge (§4.7 (4): 'a door lantern's side of its door'). §7.4 moves it only by its entrance vertex's displacement, so a … |
| VD2-03 | minor | determinism | broken-reference | 77 | §7.7 numbers its three input layers 1–3 and its dossier-contract items 1–16, so 'item 2' names both layer 2 (the circumstance slices) and contract item 2, Existence. Of t… |
| VD2-04 = VS2-01 | minor | scope | missing | 68, 64, 67 | §7.4's mean-value warp carry covers three more record kinds (J-A68.73): a light's point for every host, with the door light's exception; an access point's opening; and a … |
| VD2-05 = VS2-05 | minor | scope | stale | 81 | Round 2 made §7.7 item 15 a home of the cap refusal and §1.1, §4.11, §5.4, §14 and DR23 cite it; J-A81.01's index section column ('§1.1, §14') and Part A list omit §7.7, … |
| VRC2-02 | minor | rendering | partial | 68 | The ring positions' lifecycle is incomplete. (a) Source band: a ring pyramid is 'rastered … from the marks alone' (§8.8), but at the district and finer bands the tile wor… |
| VRC2-04 | minor | rendering | new-problem | 68 | §8.4 (c): a far caster resolves 'to a floor cell of side at most t ÷ 128, its shadow lengthened by at most that side' and 'the floor adding at most its cell'; §8.3's thre… |
| VRC2-05 | minor | rendering | new-problem | 68 | 'A lit export's transient list covers its frame dilated by §8.4 (c)'s largest window'; §8.4 (c) takes Z from 'the display list's surfaceTopCm', which §8.1 defines over 'a… |
| VRC2-06 | minor | rendering | partial | 68 | and §8.3.) J-A68.92 makes the hand lantern a GPU-only per-frame term, and §8.4 (f) says 'an export or still, which has no pointer, draws no lantern'. J-A68.82 makes the C… |
| VRC2-07 | minor | rendering | partial | 101 (b) | §11.3's host → PLAT message is 'preview { events, view? }', and preview.result draws the ghost 'in the client's view when view is set'. §11.2 types the call's option as v… |
| VS2-03 | minor | scope | partial | 88 | §13.2 T88-1 names each staged reader it proves inert but omits II.7.6's catacomb age, which reads the staged HistoryHint.ageYears when the port fills it (II.7.6 l. 16000;… |
| VS2-04 | minor | pipeline | partial | 88 | J-A88.42's index row and Part A name HistoryHint's readers as the stage count and the fire/flood scar's buried old town only; the homes state a third — II.7.6's catacomb … |
| VS2-06 | minor | scope | partial | 64, 65, 67, 70, 72 | §0.2 rows 64, 65, 67, 70, 72 name their homes' rulings as ranges, and J-A64.44, J-A65.40, J-A67.40, J-A70.49, J-A72.50 and J-A72.51 (all present in the index and Part A) … |
| VS2-07 | minor | scope | partial | 65 | Round 2 builds the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick at M1 "absorbed by the O1 line" (J-A65.02), but the O1 line's basis cell does … |
| VAL-01 | minor | pipeline | partial | 35, 42 | Gate (b), build naming: two sentences this pass wrote state what NG does without its build. §4.6 step 2 (l. 4923–4924): 'The σ of 0.066 (plain) and 0.098 (holed) that §13… |
| VAL-02 | minor | scope | partial | 49, 50 | Gate (b), build naming: two cells state what the FTG client receives, a code-reading fact, without the build the file names ('the FTG client of the 2026-09-25 capture'). … |
| VAL-03 | minor | pipeline | duplicate | 70 | Single source (rule 1): §4.7 S11's *Informal clusters* (ii) (l. 5641–5644) restates the cluster row's default values — 'a shack 6–20 m², a tent 6–15 m², a lean-to 4–12 m²… |
| VAL-04 | minor | pipeline | stale | 47 (§4.5's grower), PART II J-P37 | The rationale's Part A entry J-P37 (l. 191) reads 'the grower's `validateEdge` stops at reservation boundaries by design'. `validateEdge` is a reference method name (rout… |

### 5.1 The required changes, in full

**VRC2-01** (major, rendering, item 68). *Claim:* (Carried from verify-rendering-r2; re-checked: text at §8.8 l. 10655 and §12.8 l. 12818 ('whatever the window') and §8.8 l. 10723 ('whatever R'); receipt amendc_verify_rendering_r2_rings re-run byte-identical.) §8.8 holds and rasters one pyramid per tile position out to the global light's window R ('every further ring together ≤ 3 MB whatever the window'), and a lit export recomputes the rings for each export tile ('≈ 21 MB whatever R', §8.8 and §12.8). R = (Z − z) ÷ (m − σ) (§8.4 (c)), and Z counts terrain (§8.4 (a), §8.8; §4.2 S1 (1) calls 'a 3 000 m relief' ordinary). At the 1:500 stop and DPR 2: 300 m of relief under a 15° path sun gives k = 34 rings, 5 440 ring positions per view and 11 448 per export tile; 1 000 m gives 53 788 per view and 124 608 per export tile; 3 000 m under a sun ≤ 7.1° gives 5.44 MB (> 3) and a 48.3 MB export window (> 21). Each position is a raster job, a transfer and, for an export, a recomputation per tile; no budget counts them (§12.5 asserts 'the rings inside' the settle bound; §12.7 costs only the visible tiles). The default cursor sun at sunHeight 1 stays bounded; the fixed and path suns are not, and they are the only suns of exports, stills, the FTG preset and path mode.

*Required change:* (1) §8.8 and §8.4 (c): hold ring positions individually only out to a fixed ring j₀ (for example 16, where the floor reaches level 6). Beyond j₀ the traversal reads a far-field max pyramid: per block of tile positions at the floor's level, the greatest height the display list's marks and field rasters write. It is built once per (stop, DPR) by the tile worker, keyed by the list's version, and shared by the view and every export tile. State its memory and build time per rung's frame at the finest stop. Alternatively, cap R at a stated number of tile sides and record what the cap loses as a judgment. (2) Restate '≤ 3 MB whatever the window' (§8.8) and '≈ 21 MB whatever R' (§8.8, §12.8) as bounds with their ranges, add the far-field pyramid to Q and to the export window, and recompute the worked cases. (3) §12.7's lighting bullet gains cost terms for a first-ring heights raster, a further ring's pyramid and the far-field build. §12.5's settle claim cites them (PLAUSIBLE until M2b, measured in the settle runs, with a pre-decided fallback). (4) §8.3 or §13.2 gains a 'mountainous' fixture: a 15° path sun at the 1:500 stop, with the lit settle within §12.5's bound, an A2 lit export within §12.7's, and shadows within §13.4's tolerance of the CPU reference. (5) Update J-A68.90's index row and Part A, and J-A68.89's Q.

**VRC2-03** (major, rendering, item 68). *Claim:* (Carried from verify-rendering-r2; re-checked at §8.4 (g) l. 10398 'one byte, rounded up) — the traversal unchanged'.) §8.4 (g): a tier missing §13.4's tolerance transfers its surface at full precision, but 'the pyramids and the rings' heights stay one byte, rounded up — the traversal unchanged', while the CPU reference computes 'its pyramids in float32 … never from the byte encoding' (§8.8). Every cell beyond half a tile side resolves at a pyramid level ≥ 1, and every first-ring caster at the ring's one-byte level 0; there the GPU reads h_max rounded up by up to one step of §8.8's square-root scale (≈ 0.67 m at 45 m, ≈ 1.2 m at 100 m), moving the V = 0.5 point by up to step × cot(altitude). A 45 m tower's tip at 1:500 DPR 2 shifts ≈ 10 px under the fixed sun and ≈ 38 px under a 15° sun; §13.4's bar allows ≈ 262 pixels per 512² tile, so 'still missing, that tier draws rung 3' follows and rungs 1–2 are unreachable, against J-A68.81's lit default. The offset is CONFIRMED by recomputation; the bar failure is PLAUSIBLE.

*Required change:* §8.4 (g): at full precision, carry the pyramids and the ring positions' heights in 16 bits (centimetres above the tile's datum, rounded up, 2 B per cell), so the reference and the GPU resolve the same cells to within 1 cm. §8.8: full-precision Q_f = P ÷ 6 + 2(2(a + b) + 4) ÷ 3 + 6 MB (its rings' part as bounded by VRC2-01). Recompute the worked cases: the high tier at DPR 1.5 needs 163 + 26 = 189 ≤ 192 MB; the mid tier at DPR 1 needs 85 + 20 = 105 ≤ 128 MB. §12.8 and J-A68.85 / J-A68.89 follow. Alternatively, keep one byte and narrow §13.4's bar to the pixels whose casters resolve at level 0 of a visible tile, recorded as a judgment.

**V-MC2-01** (minor, model, item 88). *Claim:* (Carried from verify-model-r2; re-checked: §2.9 l. 2183, index l. 16953, rationale l. 577.) Round 2 moved HistoryHint's reader to S2 in §2.7 (l. 1868, 1926), and J-A88.42 says the same. Three places still name S0: §2.9's Recipe (l. 2183) 'history?: HistoryHint; // item 88: the dossier's pre-creation history, an S0 input (§2.7) — staged, absent in the base'; J-A88.21's index row (l. 16953) '`HistoryHint` on the recipe as an S0 input'; its Part A entry (rationale l. 577) '`HistoryHint` as a field of the recipe that S0 reads'. §4.2 S0 does not read the hint; S2 does (l. 4054).

*Required change:* At l. 2183, replace 'an S0 input (§2.7)' with 'a recipe input read by S2's growth-stage count and II.7.6's rules (§2.7; §4.2 S2)'. In J-A88.21's index row, replace '`HistoryHint` on the recipe as an S0 input' with '`HistoryHint` on the recipe as a generation input (its readers J-A88.42's)'. In its Part A entry, replace 'a field of the recipe that S0 reads' with 'a field of the recipe that generation reads (S2's stage count and II.7.6's rules; J-A88.42)'. The row is restated, so the assembler must swap it into place.

**V-MC2-02** (minor, model, item 65, 88). *Claim:* (Carried from verify-model-r2; re-checked at §2.7 l. 1845.) §2.7's `UndergroundSystem.sources` comment gives 'the raiseGrade that buried a town' as what explains a buried system. II.7.6 (l. 16036) makes a generation-time buried system's region 'the districts whose growthStage is 1 (its `sources`, §2.7)', and §2.7 does not list that case. A raiseGrade is also a conversion op, not an entity with an Id; its region is RaiseGrade.region: Id[] (l. 16103). This is the pipeline repair seat's cross-part note (repair-pipeline-r2-report §4 (3)), which assemble-r2 §9 lists as unfolded.

*Required change:* In the `sources` comment, replace 'the raiseGrade that buried a town' with 'the blocks or districts a `raiseGrade` buried (its `region`, II.7.6) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42)'.

**VPR2-01** (minor, pipeline, item 72). *Claim:* (Carried; re-checked at §4.7 S10b l. 5278.) "it never reaches into another district — moving demand between districts happens only in S7b's reconcile" — since J-A72.50 S10a's band-range re-homing also moves households between districts, as §5.2's F-SITING ladder now states.

*Required change:* §4.7 S10b: → "it never reaches into another district — moving demand between districts happens only in S7b's reconcile and in S10a's band-range re-homing (§4.5 (5); J-A72.50)".

**VPR2-02** (minor, pipeline, item 63, 20 (h)). *Claim:* (Carried; re-checked at §4.7 l. 5495 and 5500.) Round 2 added "a dossier event that withdraws the mode it set re-resolves it by this order", but (1) still opens "It is resolved once, when the institution is first placed"; and what a re-resolution does to the placed building (least-disruption mutation; an open use where it yields none) is stated only in §2.7's comment, though (1) is 'the one statement of how such an institution is resolved, placed and built'.

*Required change:* "It is resolved once, when the institution is first placed, from the first source that gives one:" → "It is resolved when the institution is first placed — and again only when a dossier event withdraws the mode the dossier set (below) — from the first source that gives one:"; and "re-resolves it by this order from the map-side sources (§2.7; J-A63.22)." → "re-resolves it by this order from the map-side sources, the use re-placed by (2)–(4) as that event's least-disruption mutation (§7.7 items 5, 11 (b)), as an open use where the order yields `none` (§2.7; J-A63.22)."

**VPR2-03** (minor, pipeline, item 81, 65, 66). *Claim:* (Carried; re-checked at §4.11 l. 6414.) The re-derivers of a grown underground part's cleared faces are all stages; a buried system made by a raiseGrade event and the dug system (item 66's edit-made passages) have no stage, yet §3.2 (9) grows every part and its L1 clearing removes the bands nested in the part's outer rock face (in a sparse dug part, every passage's half-bands). Nothing re-lays them.

*Required change:* §4.11: after "each other system's stage its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there" insert "; a part no stage derives — a buried town a `raiseGrade` made, the `dug` passages — its cleared bands re-laid from its kept gallery chains by `corridorUnion` (§3.7), which draws nothing".

**VPR2-04** (minor, pipeline, item 65, 88). *Claim:* (Carried; re-checked at II.7.6 l. 15994 and l. 16097.) "Every system is gated to TOWN and above (PART III) and by its row's chance per rung" and `chance` "absent: none", while round 2's scar rule makes a buried system at generation that draws nothing and reads scarSeverity, not a chance; applied as written, the gate never makes it.

*Required change:* II.7.6: "Every system is gated to TOWN and above (PART III) and by its row's chance per rung; the chances are 0 in the parity presets." → "Every system is gated to TOWN and above (PART III) and by its row's chance per rung — a history scar's buried town by the `buried` row's `scarSeverity` instead, drawing nothing (*A buried old town*, below); the chances are 0, and the scar rule off, in the parity presets."; `chance` comment "/* absent: none; never below TOWN */" → "/* absent: none (the buried row's generation-time town reads scarSeverity instead, A buried old town); never below TOWN */".

**VPR2-05** (minor, pipeline, item 65, 88). *Claim:* (Carried; re-checked at II.7.6 l. 16036.) "laid `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade within *Depth bands*' cover rule (above)" leaves open which wins where the scar depth and the cover rule disagree, and whether the depth is the floor's; *Depth bands* lays a buried town 'at its old grade'.

*Required change:* → "its floors laid at `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade — its old grade, at which *Depth bands* lays a buried town (above)".

**VPR2-06** (minor, pipeline, item 65, 88). *Claim:* (Carried; re-checked at II.7.6 l. 16099.) The params comment gives the scar rows' values "scarSeverity (0.5), scarBaseCm (200), scarGainCm (200)", which the bullet (l. 16036) also states; every other kind's params are listed by name only, values stated once in the bullets.

*Required change:* "scarSeverity (0.5), scarBaseCm (200), scarGainCm (200) — the buried row's generation-time scar rule;" → "scarSeverity, scarBaseCm, scarGainCm (the buried row's generation-time scar rule);".

**VPR2-07 = VD2-02** (minor, determinism, item 88). *Claim:* (Carried from verify-pipeline-r2 and verify-determinism-r2, one issue; re-checked at §7.7 l. 9373 and l. 9390.) Both rows say the non-physical impairments reach "the power slice's dial only"; round 2's §4.5 (6) and restated J-A88.42 make it the impaired institution's own institution-dial term (conditionSteps × severity × dial.conditionStep), never settlement-wide — the wording reads as the power's town-wide standing and does not point to the home.

*Required change:* F4: "the non-physical — legitimacy, influence, wealth, staffing, corruption — the power slice's dial only" → "the non-physical — legitimacy, influence, wealth, staffing, corruption — the impaired institution's own dial term only (§4.5 (6); J-A88.42)"; l. 9390: "the non-physical reach the power slice's dial only" → "the non-physical reach the impaired institution's own dial term only (§4.5 (6))". Apply once.

**VPR2-08 = VS2-02** (minor, scope, item 65, 88). *Claim:* (Carried from verify-pipeline-r2 and verify-scope-r2, one issue; re-checked at §14 l. 14268.) "registered after the network stage by declared I/O — the systems (catacomb, cavern, quarry, vaults)" omits the generation-time buried system II.7.6 now registers after vaults (l. 15992, l. 16107).

*Required change:* Replace "the systems (catacomb, cavern, quarry, vaults), II.7.3's" with "the systems (catacomb, cavern, quarry, vaults and, at generation, a history scar's buried town), II.7.3's". Apply once.

**VD2-01** (minor, determinism, item 68). *Claim:* (Carried; re-checked at §7.4 l. 8698, 8710, 8716 and index l. 17128.) A door light stands beside its door on the footprint edge (§4.7 (4): 'a door lantern's side of its door'). §7.4 moves it only by its entrance vertex's displacement, so a warp that turns the facade leaves it off the facade by d·sin θ (executed: a 60 cm offset and a 1.5° turn put it 1.57 cm indoors, or outdoors for the opposite turn). So 'so no warp pushes it indoors' (§7.4, 8709–8710) is false; the re-seat clause's 'keeps its entrance vertex's displaced point' also reads as the light jumping onto the vertex.

*Required change:* §7.4: (1) Replace "a door light, which stands at its door on the footprint's edge, instead takes the displacement of its entrance vertex, which §2.6 carries with its wing)" (the text wraps a line) with "a door light, which stands beside its door on the footprint edge that ends at its entrance vertex, instead keeps its fraction along that edge — its new point the edge's two moved end vertices blended at the fraction its old point had between the old ones (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice — so it stays on the moved facade whether the warp slides or turns it)". (2) Replace "never a door light, which keeps its entrance vertex's displaced point wherever it falls" with "never a door light, which keeps that point on its edge wherever it falls". (3) Replace "— a door light excepted, which goes with its entrance vertex (§2.6) —" with "— a door light excepted, which goes with its door's edge (§2.6) —". (4) J-A68.73 index row: "(a door light excepted: it keeps its entrance vertex's displacement, never re-seated)" → "(a door light excepted: it keeps its fraction along its door's footprint edge, never re-seated)". Part A: "a door light taking its entrance vertex's displacement instead and never re-seated" → "a door light keeping its fraction along its door's footprint edge instead and never re-seated". In Part A, after "where any clearance test would push it indoors on every warp", add "and a shift by its entrance vertex's displacement alone would leave the facade wherever a warp turns it". Restate the row under its id.

**VD2-03** (minor, determinism, item 77). *Claim:* (Carried; re-checked: '§7.7 item 2' occurs at the listed lines and '§7.7 item 1's outcome targets' at l. 2182.) §7.7 numbers its three input layers 1–3 and its dossier-contract items 1–16, so 'item 2' names both layer 2 (the circumstance slices) and contract item 2, Existence. Of the design's 39 '§7.7 item 2' pointers, 25 mean layer 2 and 14 mean Existence; only three places write 'layer 2'. '§7.7 item 1's outcome targets' (2182) means layer 1, while every other '§7.7 item 1' means the contract's One way. A reader following, for example, a PowerStanding key (§7.7 item 2) lands on Existence.

*Required change:* Write this as an assembler hand-off: a scripted one-string substitution, each count asserted. Replace '§7.7 item 2' with '§7.7 layer 2' at design lines 1814, 1824 (both), 1867, 1901, 1902, 4125, 4349, 4367, 4603, 4750 ('§7.7 item 2's circumstance slices'), 4824, 6360, 6393 (the second pointer on the line, 'the circumstance slices (§7.7 item 2)'), 6418, 6938, 11430, 11497, 11634, 11768, 11910, 14395, 14407, 15870, and J-A79.23's index row (16952). That is 25 substitutions on 24 lines (scratch vd2/item2.out). Replace "§7.7 item 1's outcome targets" (2182) with "§7.7 layer 1's outcome targets". Afterwards every remaining '§7.7 item 2' (14) and '§7.7 item 1' points into the dossier contract. Re-run doc_checks over the touched keys.

**VD2-04 = VS2-01** (minor, scope, item 68, 64, 67). *Claim:* (Carried from verify-determinism-r2 and verify-scope-r2, one issue; re-checked at §13.2 l. 13085, §16 l. 14814–14815.) §7.4's mean-value warp carry covers three more record kinds (J-A68.73): a light's point for every host, with the door light's exception; an access point's opening; and a Works' kept rings. §13.2's B-EDIT warp fixtures prove none of them (they cover a pin, a user-moved tree and a pinned pin only), so no bar proves the mechanism (rule 2).

*Required change:* §13.2 B-EDIT fixtures: after "and one halved by a pinned pin (§7.4)" insert "; a warp and a `moveVertex` over a lit street with an inn — every street light, the inn's door light, a hand-placed light on a pin and a junction light on a tunnel carried in their host faces by §7.4's rule, the door light on its door's footprint edge and never re-seated, a light pushed inside its `sizeCm` clearance re-seated, one whose inset empties re-placed when generated and orphaned and reported when hand-placed; an access point's opening carried in its ground host; a building under a demolition Works whose kept rings take their mean-value images unre-seated; undo restoring every former point byte for byte and a replay reproducing them (§7.4; J-A68.73)" (apply after VD2-01, whose door-light wording it follows). §16 M3b exit: replace "and its exports' lights | 18–23.5 pw |" with "and its exports' lights; the lit-street warp fixture (§13.2's B-EDIT; J-A68.73) but its tunnel-light, access-point and Works clauses | 18–23.5 pw |"; M4 exit: replace "and item 81's frame growth (T81-1) | 16.5–23.5 pw |" with "and item 81's frame growth (T81-1), and the lit-street warp fixture's tunnel-light, access-point and Works clauses | 16.5–23.5 pw |". Apply once.

**VD2-05 = VS2-05** (minor, scope, item 81). *Claim:* (Carried from verify-determinism-r2 and verify-scope-r2, one issue; re-checked at index l. 17145 and rationale l. 769.) Round 2 made §7.7 item 15 a home of the cap refusal and §1.1, §4.11, §5.4, §14 and DR23 cite it; J-A81.01's index section column ('§1.1, §14') and Part A list omit §7.7, while sibling J-A81.71 lists it. J-A81.01 is scope r1's ruling, so scope's seat applies it once.

*Required change:* Index: in J-A81.01's row replace "| §1.1, §14 |" with "| §7.7, §1.1, §14 |"; Part A: replace "(§1.1, §14, D-33; item 81; repair r1, VSC-21)" with "(§7.7 item 15, §1.1, §14, D-33; item 81; repair r1, VSC-21; repair r2, VD1-01)"; restate the row under its id. Apply once.

**VRC2-02** (minor, rendering, item 68). *Claim:* (Carried; re-checked in §8.8 and §8.9.) The ring positions' lifecycle is incomplete. (a) Source band: a ring pyramid is 'rastered … from the marks alone' (§8.8), but at the district and finer bands the tile worker holds a district's marks only after a band request, and §8.9's band-request row asks only for the districts 'that tiles entering the view need'; a ring in an unrequested district is rastered from the city band's masses or from nothing, so its shadows change when a pan brings the district in and differ from a lit export. (b) Cache key: a ring pyramid is 'keyed as [its] tile's base', without TileRasterOpts.fromLevel, so a pyramid built from level 3 for ring 3 is found for the same position when it becomes ring 1, which needs level 0.

*Required change:* §8.9's band-request row: '…that tiles entering the view — and the ring positions round them that the global light's window reaches (§8.8), after the visible tiles' — need and the tile worker lacks'. §8.8: 'a ring position's pyramid is rastered from the marks of the view's band, requested for its districts like a visible tile's (§8.9), its shadows completing when the band answer arrives; it is keyed as its tile's base plus its fromLevel, a held pyramid serving any ring at or beyond the one it was built for'.

**VRC2-04** (minor, rendering, item 68). *Claim:* (Carried; receipt amendc_verify_rendering_r2_diag re-run byte-identical.) §8.4 (c): a far caster resolves 'to a floor cell of side at most t ÷ 128, its shadow lengthened by at most that side' and 'the floor adding at most its cell'; §8.3's three shadow-tip rows allow 'max(1 px, §8.4 (c)'s floor cell there)', and the narrow-casters row 'one floor cell per side'. A ray crossing a cell diagonally runs up to √2 × its side inside it: a 45 m tower under a 45° diagonal sun is lengthened by 4.24 px against a 4-px cell (1.06 ×), and under a 15° sun by 21.21 px against 16 px (1.33 ×). The default fixed sun stands at 315°, so §8.3's long-shadow row can fail on a correct build.

*Required change:* §8.4 (c): '…its shadow lengthened by at most the cell's diagonal, √2 × its side (≤ t ÷ 90), and never shortened' and '(receipt (1) …, the floor adding at most its cell's diagonal; amendc_verify_rendering_r2_diag.out)'. §8.3's cursor-sun, lower-roof and long-shadow rows: 'within max(1 px, the diagonal of §8.4 (c)'s floor cell there)'. The narrow-casters row: 'within one floor cell's diagonal per side'. J-A68.90 Part A: 'at most √2⁄128 (≈ 1⁄90) of its distance longer'. Alternatively, lower the floor by half a level (ℓ(t) = max(0, ⌊log₂(4√2 · t ÷ S)⌋)) and keep the texts.

**VRC2-05** (minor, rendering, item 68). *Claim:* (Carried; re-checked in §11.1 and §8.8's print paragraph.) 'A lit export's transient list covers its frame dilated by §8.4 (c)'s largest window'; §8.4 (c) takes Z from 'the display list's surfaceTopCm', which §8.1 defines over 'a mark or field raster of the list'. The generation worker builds the export's transient list for the export's frame and keeps only the 24-B index (§8.1 item 6). So the window that sets the list's extent comes from the list it extends: a taller caster outside the frame (a keep, a hill) is left out and never shades the frame, and the export differs from the view.

*Required change:* §8.1 or §11.1: 'the generation worker keeps the surfaceTopCm S14 last wrote for each band beside its 24-B index, and an export's window takes Z from it — the document's highest surface at the export's band — never from the transient list whose extent that window sets'. §8.8's print paragraph points to it.

**VRC2-06** (minor, rendering, item 68). *Claim:* (Carried; re-checked in §8.4 (f) and §8.3.) J-A68.92 makes the hand lantern a GPU-only per-frame term, and §8.4 (f) says 'an export or still, which has no pointer, draws no lantern'. J-A68.82 makes the CPU reference the definition of the lit picture, and §13.4 holds the GPU to it on stills at injected pointer positions, but only for the cursor sun. Nothing computes the lantern in the reference, and no row of §8.3, §13.2 or §13.4 tests its law, its radius or its absence from exports.

*Required change:* §8.4 (f): 'the CPU reference evaluates the lantern at a given pointer point, as it evaluates the cursor sun for §13.4's stills (tests only; an export or still without a pointer draws none)'. §8.3 row: 'hand lantern (item 68; §8.4 (b), (f)): the underground layer of a golden CITY at a depth band holding a sewer front, handLantern on at nine pointer points, CPU reference and GPU pass | ink, lit | the GPU within §13.4's tolerance of the reference; 0 lit pixels beyond 6 m of the pointer's floor point from the lantern's term; no lantern term in any export'.

**VRC2-07** (minor, rendering, item 101 (b)). *Claim:* (Carried; re-checked at §11.3 l. 12146.) §11.3's host → PLAT message is 'preview { events, view? }', and preview.result draws the ghost 'in the client's view when view is set'. §11.2 types the call's option as view?: ViewHandle, but a bridged host holds no ViewHandle, because the module's view lives in its own iframe. The field's type, and which view it names, are unstated.

*Required change:* §11.3: 'preview { events, view?: boolean } — true draws the ghost as live.ghost in this client's own view (§8.2), false or absent computes the dry run alone'. J-A101.86's index row and Part A likewise.

**VS2-03** (minor, scope, item 88). *Claim:* (Carried; re-checked at §13.2 l. 13560.) §13.2 T88-1 names each staged reader it proves inert but omits II.7.6's catacomb age, which reads the staged HistoryHint.ageYears when the port fills it (II.7.6 l. 16000; §2.7 l. 1868 lists it as the hint's second reader).

*Required change:* Replace "the import share at §4.9 and the buried old town at II.7.6) change nothing" with "the import share at §4.9, and the catacomb age and the buried old town at II.7.6) change nothing" (with VS2-04, so the bar's list equals J-A88.42's).

**VS2-04** (minor, pipeline, item 88). *Claim:* (Carried; re-checked at index l. 17140 and rationale l. 764.) J-A88.42's index row and Part A name HistoryHint's readers as the stage count and the fire/flood scar's buried old town only; the homes state a third — II.7.6's catacomb age reads ageYears (l. 16000; §2.7 l. 1868) — and the index formula drops §4.2 S2's max(1, …) (l. 4054).

*Required change:* Index: replace "`HistoryHint` the stage count (min(K, ⌈age ÷ yearsPerStage⌉)) and a fire or flood scar the buried old town only;" with "`HistoryHint` the stage count (min(K, max(1, ⌈age ÷ yearsPerStage⌉))), its age the catacomb rule's age, and a fire or flood scar the buried old town only;". Part A: replace "`HistoryHint` setting the stage count to min(K, ⌈ageYears ÷ yearsPerStage⌉), the later walled stages folding into the last kept one, its fire and flood scars" with "`HistoryHint` setting the stage count to min(K, max(1, ⌈ageYears ÷ yearsPerStage⌉)), the later walled stages folding into the last kept one, its `ageYears` replacing the age II.7.6's catacomb rule reads, its fire and flood scars". Restate the row under its id (swap).

**VS2-06** (minor, scope, item 64, 65, 67, 70, 72). *Claim:* (Carried; re-checked at §0.2 l. 237–245.) §0.2 rows 64, 65, 67, 70, 72 name their homes' rulings as ranges, and J-A64.44, J-A65.40, J-A67.40, J-A70.49, J-A72.50 and J-A72.51 (all present in the index and Part A) fall outside the ranges and are cited nowhere in §0.2.

*Required change:* Row 64: "(J-A64.41 – J-A64.43)" → "(J-A64.41 – J-A64.44)"; row 65: "(J-A65.41 – J-A65.48)" → "(J-A65.40 – J-A65.48)"; row 67: after "the T67 bars (§13.2);" insert " the island slots' per-year redraw at an epoch (II.6; J-A67.40);"; row 70: "(J-A70.41 – J-A70.48)" → "(J-A70.41 – J-A70.49)"; row 72: "(J-A72.40 – J-A72.49)" → "(J-A72.40 – J-A72.51)".

**VS2-07** (minor, scope, item 65). *Claim:* (Carried; re-checked at §16 l. 14824.) Round 2 builds the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick at M1 "absorbed by the O1 line" (J-A65.02), but the O1 line's basis cell does not name them, while §16's pricing rule says a pass names each new mechanism with the line that absorbs it.

*Required change:* Replace "| 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |" with "| 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes; amendments c–e: the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick (item 65; J-A65.02) absorbed |".

**VAL-01** (minor, pipeline, item 35, 42). *Claim:* Gate (b), build naming: two sentences this pass wrote state what NG does without its build. §4.6 step 2 (l. 4923–4924): 'The σ of 0.066 (plain) and 0.098 (holed) that §13.5 and §16 M0 (b) read are NG's measured outputs of this law, never its inputs (J-A35.41).' The rationale's J-A42.41 (Part A, l. 600): 'the design had called about 42 % of NG's lot leaves "silently discarded"; they are its courts, made on purpose'. Every other code-reading sentence of the pass names its build (scan val/buildnaming*.out).

*Required change:* Design §4.6 step 2: replace "read are NG's measured outputs of this law, never its inputs (J-A35.41)." with "read are NG 1.2.2's measured outputs of this law, never its inputs (J-A35.41)." Rationale Part A, J-A42.41: replace "about 42 % of NG's lot leaves" with "about 42 % of NG 1.2.2's lot leaves" (a one-string substitution inside the entry; the index row is unchanged).

**VAL-02** (minor, scope, item 49, 50). *Claim:* Gate (b), build naming: two cells state what the FTG client receives, a code-reading fact, without the build the file names ('the FTG client of the 2026-09-25 capture'). §13.5's plot-area gradient row (l. 13810): 'NG Moran's I −0.04 … +0.03 — **weakness** (FTG sends no lot or plot, so it has no plot evidence; item 49)'. §15.1's C9 row (l. 14641): 'FTG sends no door, its "entrance" being a light anchor (item 50)'. The same facts are build-named at §1.4's rows and §13.5's entrance rows.

*Required change:* §13.5 plot-area gradient row: replace "(FTG sends no lot or plot, so it has no plot evidence; item 49)" with "(the FTG client of the 2026-09-25 capture receives no lot or plot, so FTG has no plot evidence; item 49)". §15.1 C9 row: replace "FTG sends no door, its "entrance" being a light anchor (item 50)" with "the FTG client of the 2026-09-25 capture receives no door, its "entrance" being a light anchor (item 50)". Re-run doc_checks over 13 and 15 (S1: the cell count is unchanged).

**VAL-03** (minor, pipeline, item 70). *Claim:* Single source (rule 1): §4.7 S11's *Informal clusters* (ii) (l. 5641–5644) restates the cluster row's default values — 'a shack 6–20 m², a tent 6–15 m², a lean-to 4–12 m²' and '`fireGapM` (1.0 m, less in the larger rungs and the poorer bands by the row)' — which §10.2's *Clusters and tenure (item 70)* bullet (l. 11650–11653) states as the row's defaults ('footprints shack 6–20 m² …, tent 6–15 m² …, lean-to shelter 4–12 m²'; '`fireGapM` 1.0 (in the squalid row 0.8 at CITY and METROPOLIS)'). The values agree today; a later edit of the table would leave §4.7 stale. Same class as round 2's VPR2-06.

*Required change:* §4.7 S11 *Informal clusters* (ii): replace "the footprint from the kind's band — a shack 6–20 m², a tent 6–15 m², a lean-to 4–12 m² against a standing wall on its own plot" (the text wraps a line) with "the footprint from the kind's band in the cluster row (§10.2) — a lean-to's against a standing wall on its own plot", and replace "a clear gap of `fireGapM` (1.0 m, less in the larger rungs and the poorer bands by the row) between any two structures" (wraps a line) with "a clear gap of the cluster row's `fireGapM` (§10.2) between any two structures". §10.2's bullet keeps every value.

**VAL-04** (minor, pipeline, item 47 (§4.5's grower), PART II J-P37). *Claim:* The rationale's Part A entry J-P37 (l. 191) reads 'the grower's `validateEdge` stops at reservation boundaries by design'. `validateEdge` is a reference method name (route §C.5 lists it among §4.5's identifiers). This pass's REPLACE of §4.5 (item 47) renamed the predicate 'the **edge test**' (l. 4567), and the design no longer names `validateEdge` anywhere (0 hits). The live judgment entry now points at a name the design lacks and carries a reference identifier into the rationale. The entry predates this pass, so the identifier did not enter by it, but the rename made the pointer stale. Part F's copy (l. 1673) is the verbatim pre-canon record and stays as history.

*Required change:* Rationale Part A, J-P37's entry: replace "the grower's `validateEdge` stops at reservation boundaries by design" with "the grower's edge test (§4.5) stops at reservation boundaries by design". Leave Part F (verbatim history) unchanged. No index-row change (J-P37's row does not name it).


## 6 Held parts (gate (a)) — for Fable's retrovalidation, so nothing is lost

None of these parts is in the design or the rationale file (§2's scan). File c's evidence gate released 37's metre
reading, 58 (f) and 59's timing, and it rejected 49's deletion. Files d and e hold nothing. The parts still held are the
route's cautions, which the gate's completion left standing:

| item | the held part | what stands instead |
|---|---|---|
| 52 | that the references' session-reached (Enter or cache-affected) maps *visibly* differ from a fresh load | the history-independence test and its motive (§6.5 (9), J-A52.61); the mechanisms are CONFIRMED |
| 35 (support) | the position check on 160 of 162 faces | nothing; the mechanism is CONFIRMED on its own |
| 60 (support) | that NG hands Dwellings plans up to 16 cells wide, which are dropped (a cross-derivation, critic X8) | the drop rule only (§15.1 G2: "any plan over 11 cells wide … by a random house") |
| 68 (g) | "MFCG draws no cast shadows" as a claim about the reference | the `MFCG` preset's behaviour stated as ours (J-A68.86) |
| 68 (support) | VG 1.6.9's shadow and night-light layers; Dwellings' shading and occlusion gradients | nothing; the plan rung's room lights stay J-A28.32's |
| 50 (MFCG clause) | "no door concept among MFCG's read model classes" — an inference from the full read | written as the route's inference sentence (§10.2 l. 11579), which the gate's completion confirmed as written |

## 7 CONFIRMED versus PLAUSIBLE, and what this seat read

**CONFIRMED (executed or read on the installed files):**
* every gate result of §2 — the scripts and outputs are in scratch `val/`;
* the J-A id sets and counts;
* the 185.5–248.5 pw sum of §16's rows;
* each carried issue's anchor text, found on the live design;
* the two rendering receipts, re-run byte-identical (`amendc_verify_rendering_r2_rings`, `_diag`);
* the four new issues' quoted texts (each found once);
* the owner rulings Q1–Q6 at their homes;
* the §6.1 registry entries, the §12.4 costing rows, the §5.4 report kinds, the §13.2 registry and enumeration tests,
  D-19's put-to-owner clause and the band-range read path.

**PLAUSIBLE (judgment):**
* each "faithful" verdict of §3 beyond the phrases checked;
* the coherence verdicts of §4, where they rest on the sections named there and on the part verifiers' readings;
* VRC2-03's bar failure and VRC2-01's time cost (as their verifier grades them);
* the severity assigned to each new issue.

**Reading scope, stated plainly.** This seat read the following whole:
* amendment files c, d and e;
* `code-impact.md`;
* the owner instructions;
* route §C.4, §C.5 and §C.9.4;
* assemble-r2;
* verify-rendering-r2's outcome.

In the design it read the following whole:
* the one-page summary;
* §0.2's rows for items 1–7, 20, 32–72 and 101;
* §1 (§1.1–§1.7);
* II.6;
* PART III;
* the *Staged by the owner's roadmap* table;
* D-1 and D-19;
* §5.4 and §12.4;
* §2.5's `ContextVector`;
* §4.5's Grower paragraph;
* §4.6 steps 2–6;
* §4.7's jitter paragraph;
* the T67 and T68 bars.

Everything else it read by targeted, scripted search. The ≈ 2 MB of changed text was read section by section by the
eighteen part verifiers of rounds 0–2, whose verdicts §3 cites; this seat did not re-read every changed section whole.
Fable should weigh that when it re-checks.

**What Fable should re-check first:**
1. VRC2-01 and VRC2-03, the two majors in item 68's shadow window, and whether the chosen mechanism (a far-field
   pyramid and 16-bit heights) or the alternatives (a capped window, a narrowed bar) is the right ruling.
2. J-A68.81: the owner's words taken over item 68 (c)'s own reading, so shadows are on in the default `ink` map.
3. The `MFCG` preset's `cut.flattenM` = 8 m, derived from critic X3 / R-M3 rather than from item 37's text.
4. `jitter.minM` at 0.3 m against the item's 0.25 m (J-A43.42).
