# Amendments-b final validation (items 8–31)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/validate; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS
ITEM read-owner: planned AMENDMENTS-2026-09-25b, OWNER-INSTRUCTIONS | done (both whole)
ITEM read-process: planned route, assemble logs, verify-r2 reports | done (route summary, rule families, stale list and item 28 (f); assemble r0, r1, r2; the six verify-r2 reports' verdicts and issues)
ITEM read-design: planned summary, §0.2, §1, §2.5, §2.6, §2.8 (part), §4.5, §4.7, §4.11, §7.7, §16, II.6, II.7, PART III, Staged, §17 diff, J-A index + Part A | done
ITEM carried-issues: planned 71 carried verify-r2 issues re-checked against doc 831efd42… | done (§3)
ITEM owner-fidelity: planned items 8–31 + 28 (f) | done (§2)
ITEM coherence: planned rule family, evolution hooks, staged hooks, summary/§1 | done (§4)
ITEM single-source/deferral: planned grep sweeps | done (§5)
ITEM j-rows: planned J-A coverage | done (§5)
ITEM report: planned §6 issue list, §7 sizes, §8 manager notes, §9 CONFIRMED/PLAUSIBLE | done

Lane `amendments-b/validate`, 2026-09-27. Documents judged: `docs/ARCHITECTURE.md` sha256 `831efd42…` (12 942 lines,
145 headings) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `f2c2a1ca…` (2 050 lines), the state assemble-r2 installed
and every verify-r2 seat read. Neither changed during this lane (hashes re-checked at the end).

## 1 Outcome

**Verdict: NOT YET CLEAN — a repair round is required.** Every one of the owner's items 8–31 (with 28 (f)) is present
in the design as mechanism, and every item is honoured as the owner meant it; where the program's reading narrows or
extends the owner's words, the reading is recorded as a vetoable J-A row (§2). No item is misread. But the design is not
yet coherent enough to close:

* **Three major issues.** One is the capacity bound (V-MAB2-01): several ordinary edits — a height change, a warp, a moved passage, a table edit — can leave a building housing
  more households than it can hold, which the plan rung then treats as a bug. The other two are the dossier's authority
  inside an epoch (VD2-01, VD2-02). The owner ruled that only the dossier removes a dossier element (item 20), yet an
  epoch's own steps can close a dossier-backed use or remove the building that houses it. This validator widened those
  two: the use step, redevelopment and `vacate` are not the only such paths. A growth step's declared `demolish`, a
  carve, `wallToWay`'s clearance, a falling island, a tunnel's closing and a passage's sealing reach the same result.
* **Fifty minor issues** of wording, pointers, tests and one-line mechanisms. 71 issues were carried in from the
  verify-r2 round. All but one are real on the current text: VD2-15 is withdrawn, because II.7.4 already declares
  `UndergroundRule` an editable rule record. The remaining 70 fold into 48 issues once duplicates are merged: 22
  duplicate ids in 17 groups, each applied once, plus V-MAB2-05's part (b), which folds into VD2-06. This validator
  adds five new ones (VAL-01 … VAL-05).

53 issues in all (3 major, 50 minor). Owners: model 8, pipeline 9, determinism 12, kernel 6, rendering 3, scope 15.
Every issue carries its exact change in §6. Nothing needs the owner: every issue is a repair inside a ruling already
taken, and the J-A rows that record a changed reading are named in the change itself.

## 2 Owner fidelity — each item's words against its mechanism

Legend: HONOURED = the mechanism does what the owner's words say; RECORDED READING = the program's interpretation
narrows or extends the words, and a J-A row records the choice in plain language, vetoable; DEFECTS = the issue ids of §6
that touch the item (none of them a misreading).

| item | the owner's words (short) | the mechanism (where) | verdict | defects |
|---|---|---|---|---|
| 8 | "combination of growth, regression and growth where appropriate"; the war example kept out | §4.11 decline ladders (occupied → vacant → derelict → ruin → cleared → reused; walls to a shorter inner ring whose old line persists), the decline table's persistence rates and exposure lottery with chance 0.25, the salvage ledger with cleared zones beside active building, regrowth-first siting, lag down and none up; §2.8 states; war appears only inside the owner's item-31 quotation and J-A31.47 states rung 3's triggers generically | HONOURED | VD2-02 (dossier content under decline) |
| 9 | "the actual size of the town, even within each tier is determined by population" | §1.1: every quantity computed from the requested population, never the rung's target; §3.2 (9) frame; §13.6 (3) matched by building count; J-A9.01 | HONOURED (SATISFIED; the per-rung style modifiers of J-S13 are not size) | VR2-04, VS2-11 (pointers) |
| 10 | "the size of an island correspond to prosperity both of the neighborhood and the overall city" | II.6 (3)–(5): `A = areaHaMax · h(S_carried) · h(S_town)`, none where `h(S_town) = 0`, band rows of the same family as granularity and greenery; decline response adopted as vetoable kinds (J-A10.42) | HONOURED | — |
| 11 | tunnels "cave in or become decommissioned rather than intentionally taken down" | II.6 condition table (in use → silted → caved in → collapsed or sealed), no engine plan may demolish a tunnel (linted), reopen before dig, the underground's persistence rate after streets and walls; a user may still delete (J-A11.41) | HONOURED | VP2-04, VP2-05, VP2-12 (the stretch split) |
| 12 | plots only next to a sewer line, no sewer alleys, buildings flush against the sewer's outer wall | II.7.3 invariants U1–U3 with §5.3 rows, the ground's cut on the underground arena, the surface constraint by sampled reads, access points, depth per entity, lifecycle with the tunnel, the order city → network → underground | HONOURED | VP2-03, VP2-13, VD2-12 |
| 13 | "floating islands be limited only to cities and metropolises" | `RungProfile.layers.islands` gate read at generation and every epoch (II.6 (2), J-A13.41) | HONOURED | — |
| 14 | sewers rare in towns, "a necessity for cities and Metropolis"; none in villages | II.7.1 rung row: TOWN law capped at 0.6, CITY / METROPOLIS always, villages never; the toggle is visibility at CITY and METROPOLIS | HONOURED | — |
| 15 | "not all cities or Metropolis have floating islands" | II.6 (4): three ordered slots × `h(S_town)`; the view toggle shows and never creates; a separate model setting keeps the realism base island-free (D-3) | HONOURED, RECORDED READING (J-A15.41: two settings, the owner's toggle read as the view toggle) | — |
| 16 | "rules or templates of rules … spatial relations with other buildings, supply chains" | §4.7 S10b: one solver, HARD filters and SOFT scores, supply edges with distance by mode, joins, one-level displacement, closest options reported, rows editable and calibrated (§13.9) | HONOURED | VP2-07 |
| 17 | "a shop may close down here but reopen over there organically" | §4.11 use step (re-score, inertia, closing thresholds, cap, pinned assignments, traces); `Use` separate from the building | HONOURED; its "may close" must yield to item 20 for dossier content (VD2-01 records the ruling) | VD2-01, VD2-02 |
| 18 | "a mutation of its previous design to the newest design, with additions and subtractions" | §4.7 S11 designation mutator: match, order and draws on the plot's own stream, land, protection, record and exact inverse, timing, one path | HONOURED | — |
| 19 | "multiple blacksmiths … scale appropriately in size and structure … all of the buildings"; materials only texture and colour | §4.7 S11 designation template by class and band, interpolated along the field; §2.6 Materials (FTG's default model, the optional regional shift, never shape) | HONOURED | — |
| 20 | "the map does not edit the dossier"; a map delete re-placed elsewhere; the rejection "is not permanent"; "maybe you want a specific place to be something" | §7.7 dossier contract items 1–4 (one-way door, existence, rejection with its lapse at a growth or decline epoch or a dossier event touching the site, positive placement), §11.3 no writing message | HONOURED on the map path; the epoch path breaks existence (major) | VD2-01, VD2-02, VS2-03, VD2-13, VS2-01 |
| 21 | "then lets stay private for now" (2026-09-27) | §17.3 and §17.4 byte-identical to the pre-pass archive; §17.1 gains only a J-A21.01 pointer and process text; J-A21.01 Part A records the withdrawal; no GPL-3 wording enters | HONOURED | — |
| 22 | the seed must "respect the previous layout prior to the addition or subtraction" | §7.7 items 5–6: least-disruption order, disruption budget and report, continuity over path-independence, new map with every element present, epoch folding at step (e) | HONOURED | — |
| 23 | "based in our base of MFCG and FTG emulation first" | §7.6 defaults layer with `provenance.source` and the `extension` marker, parity presets `MFCG` / `FTG` switching every extension off | HONOURED | — |
| 24 | "the central market does not actually have to be central" | §4.2 S3 (12) trade-convergence score (plaza wins inland, harbour in ports), secondary markets never touching and small (§4.5 S7b (3)) | HONOURED | VS2-05 (portRef test) |
| 25 | terrain and water change, slowly | §4.11 `TerrainWaterOp` as the slowest decline-table rows, repaired by S1's operators and the carve | HONOURED | — |
| 26 | FTG's order: decided with the town, drawn after it | §4.9 one farm table with fuel and timber, FTG's farm modes by size and landscape, the arable reserve off by default | HONOURED | — |
| 27 | bands reproduce MFCG's ward mix and FTG's lifestyle weights and shanty rule | §4.5 six-band default set with FTG's shares, MFCG's ward-class anchor for §13.5, the shanty trigger after the first half is built, `FieldBands.middle` | HONOURED | — |
| 28 | click a building for "a coherent floor plan … tailoring to the building type and function"; neighbourhoods generated on click, saved, marked when the simulator changes them | §2.6 plan rung (function first, stair core before cuts, exterior coherence, restrictive rerolls), §2.8 elaboration record, §2.9 cache, §4.1 click policy | HONOURED, RECORDED READINGS: eager footprints at city zoom rather than bare plots (J-A28.42, from J33); `elaborate` a per-viewer key (J-A28.41) | V-MAB2-06, 07, 08, 09, 15, VK2-01 … 04, 06, 08, 09, VR2-01 … 03 |
| 28 (f) | "more prosperity means a larger home for a smaller family … if it gets really poor … all apartments … same building geometry but not the interior" | §2.6 interior ladder (six rows, rich → squalid), the dwelling unit and its own door, one capacity function, the canonical chain, re-cut inside the unchanged shell; the owner's last sentence read as the shell's capacity (J-A28.23) | HONOURED, RECORDED READING (J-A28.23) | V-MAB2-01 (major), 02, 04, 05, 12, VP2-01, 02, 06, 08, 09, VD2-04 … 11, VAL-03 |
| 29 | "always a street facing entrance … back entrances in the case of a larger court or yard is recommended … selective but appropriate basements" | §2.6 entrance set (one main street door; side and rear doors only on an access edge, capped; a yard door by default) and basement decision (class, terrain gate, prosperity, size) | HONOURED | V-MAB2-10, 11, VS2-02 |
| 30 | plots "only accessible via alleys", "hidden or clandestine places … only those that … knew about it" | §4.6 reach and hidden-share rows by band, density and rung, passages, exposure by adjacency; `knownTo` with §9.2's knowledge filter | HONOURED | VR2-06, VAL-02, VAL-05, V-MAB2-07, 08 |
| 31 | "hard to imagine that it would be torn down into a slum if it was filled with mansions"; "their floor is bounded to middle class … cycle … between rich and middle" | §4.11 wealth ladder (three rungs, no occupied building removed by a band change, speed by direction and replaceability, churn caps), the geometry floor `min(builtBand, FieldBands.middle)` | HONOURED | VP2-11, VD2-04, VAL-03, VAL-04 |

**The owner-fidelity points the route asked the validator to check.**

* **Item 28 (f)'s last sentence.** "the more rooms for more occupying famiiles the richer a building gets" is read as the
  shell's capacity: the richer the stock was built, the more rooms it has to let (J-A28.23). The other reading, a slip
  for "poorer", gives the same rule for the occupants, so the reading changes no behaviour the owner described.
  Accepted.
* **Item 28 (b)'s city view.** The owner said the city view shows "neighborhoods as plots without buildings". The design
  draws the eager footprints by default, with a plots-only view as an option. J33 and J-A28.42 record the choice and
  its reason: keep MFCG's look at city zoom, since footprints are cheap. The owner's purpose — "cuts back on loading
  everything all at once" — is met by the lazy wings and plan rungs. Accepted as a recorded reading.
* **Item 31's "fire, war".** Item 8 keeps the war example out of the design. J-A31.47 therefore names rung 3's triggers
  generically, as "a destructive circumstance event". The word "war" survives only inside the owner's quoted sentence
  (§4.11 l. 5032). Accepted.
* **Item 12 (d) against item 29 (b).** Item 12 (d) names "cellars of surface buildings" as access points; item 29 (b)
  says "a cellar never joins a sewer". J-A12.42 reconciles them: a cellar stair to a tunnel is an `AccessPoint` record,
  and the basement stays the building's own room. Accepted.

## 3 The 71 carried issues — each re-checked on the current text

Method: every issue's "old" text was searched in the installed document (whitespace-normalised, script
`scratchpad/val/needles.py`): all 71 are still present, so none was fixed silently. Each was then read in its section and
judged: VALID (kept, its change as stated or sharpened in §6), MERGED (a duplicate — its change is carried by the primary
named, applied once) or WITHDRAWN.

| carried id | owner | disposition | primary in §6 | note |
|---|---|---|---|---|
| V-MAB2-01 | model | VALID, major | V-MAB2-01 | change sharpened: the band set's first band added to the list of capacity inputs |
| V-MAB2-02 | pipeline | VALID | V-MAB2-02 | |
| V-MAB2-03 | pipeline | MERGED | VP2-02 | one statement, in the epoch's order (a) |
| V-MAB2-04 | determinism | VALID | V-MAB2-04 | carries VD2-05 |
| V-MAB2-05 | determinism | VALID; (a) carries VP2-06 and VD2-08, (b) folds into VD2-06 | V-MAB2-05 (a); VD2-06 (b) | |
| V-MAB2-06 | model | VALID | V-MAB2-06 | §4.1's copy of the stale list follows (VAL-01) |
| V-MAB2-07 | model | VALID | V-MAB2-07 | |
| V-MAB2-08 | model | VALID | V-MAB2-08 | |
| V-MAB2-09 | model | VALID | V-MAB2-09 | carries VK2-05 and VD2-09; J-A28.26's Part A gains the rule |
| V-MAB2-10 | model | VALID | V-MAB2-10 | the ruling recorded in J-A29.25 |
| V-MAB2-11 | pipeline | VALID | V-MAB2-11 | |
| V-MAB2-12 | model | VALID | V-MAB2-12 | carries VP2-08; worded as a pointer to §4.7's fill (single source) |
| V-MAB2-13 | model | VALID | V-MAB2-13 | |
| V-MAB2-14 | scope | MERGED | VS2-02 | |
| V-MAB2-15 | kernel | VALID | V-MAB2-15 | |
| VK2-01 | kernel | VALID | VK2-01 | |
| VK2-02 | kernel | VALID | VK2-02 | |
| VK2-03 | kernel | VALID | VK2-03 | |
| VK2-04 | kernel | VALID | VK2-04 | the kernel's companion to V-MAB2-09 |
| VK2-05 | model | MERGED | V-MAB2-09 | |
| VK2-06 | determinism | VALID | VK2-06 | carries VD2-10 |
| VK2-07 | scope | MERGED | VS2-02 | |
| VK2-08 | scope | VALID | VK2-08 | carries VS2-09 |
| VK2-09 | scope | VALID | VK2-09 | carries VS2-10 |
| VK2-10 | scope | MERGED | VS2-11 | |
| VP2-01 | pipeline | VALID | VP2-01 | (1) sharpened: an unfillable residential slot is dropped, never left empty; (2) worded as a pointer |
| VP2-02 | pipeline | VALID | VP2-02 | carries V-MAB2-03 and VD2-14 |
| VP2-03 | pipeline | VALID | VP2-03 | |
| VP2-04 | pipeline | VALID | VP2-04 | the widening rule PLAUSIBLE, as its author says |
| VP2-05 | determinism | VALID | VP2-05 | |
| VP2-06 | determinism | MERGED | V-MAB2-05 | |
| VP2-07 | determinism | VALID | VP2-07 | |
| VP2-08 | model | MERGED | V-MAB2-12 | |
| VP2-09 | scope | VALID | VP2-09 | carries VS2-04 |
| VP2-10 | scope | MERGED | VS2-05 | |
| VP2-11 | scope | VALID | VP2-11 | carries VS2-06 |
| VP2-12 | scope | VALID | VP2-12 | carries VS2-07 |
| VP2-13 | scope | VALID | VP2-13 | carries VS2-08 |
| VD2-01 | determinism | VALID, major, WIDENED | VD2-01 | every epoch path that closes or unhouses a dossier-backed use, not three of them; item 17 (d)'s "or close" recorded as yielding to item 20 |
| VD2-02 | pipeline | VALID, major, WIDENED | VD2-02 | one paragraph in §4.11 states the rule for every such path |
| VD2-03 | scope | MERGED | VS2-03 | |
| VD2-04 | determinism | VALID | VD2-04 | its test-side twin is VAL-03 |
| VD2-05 | determinism | MERGED | V-MAB2-04 | |
| VD2-06 | determinism | VALID | VD2-06 | carries V-MAB2-05 (b) |
| VD2-07 | determinism | VALID, reworded | VD2-07 | a pointer to §2.6's rule (V-MAB2-01), never a second statement |
| VD2-08 | determinism | MERGED | V-MAB2-05 | |
| VD2-09 | model | MERGED | V-MAB2-09 | |
| VD2-10 | determinism | MERGED | VK2-06 | |
| VD2-11 | determinism | VALID | VD2-11 | the deterministic move named: the next candidate of step 3's filtered order |
| VD2-12 | determinism | VALID, widened | VD2-12 | the tunnel profile table joins the list too |
| VD2-13 | determinism | VALID | VD2-13 | |
| VD2-14 | pipeline | MERGED | VP2-02 | |
| VD2-15 | pipeline | **WITHDRAWN** | — | II.7.4 l. 12148 already reads "II.7.1's and II.7.3's tables as one editable rule record (§7.6)"; §7.6's list is VD2-12's |
| VR2-01 | rendering | VALID | VR2-01 | |
| VR2-02 | rendering | VALID | VR2-02 | |
| VR2-03 | rendering | VALID | VR2-03 | |
| VR2-04 | kernel | VALID | VR2-04 | |
| VR2-05 | scope | MERGED | VS2-11 | |
| VR2-06 | scope | VALID | VR2-06 | carries VS2-12 |
| VS2-01 | scope | VALID | VS2-01 | |
| VS2-02 | scope | VALID | VS2-02 | carries V-MAB2-14 and VK2-07; names `Basement.access` per V-MAB2-10 |
| VS2-03 | scope | VALID | VS2-03 | carries VD2-03; its epoch clause worded to VD2-01 / VD2-02 as widened |
| VS2-04 | scope | MERGED | VP2-09 | |
| VS2-05 | scope | VALID | VS2-05 | carries VP2-10 |
| VS2-06 | scope | MERGED | VP2-11 | |
| VS2-07 | scope | MERGED | VP2-12 | |
| VS2-08 | scope | MERGED | VP2-13 | |
| VS2-09 | scope | MERGED | VK2-08 | |
| VS2-10 | scope | MERGED | VK2-09 | |
| VS2-11 | scope | VALID | VS2-11 | carries VK2-10 and VR2-05 |
| VS2-12 | scope | MERGED | VR2-06 | |

## 4 Coherence

* **One rule family, one context vector.** Coverage, plot granularity (§4.7 S10 (2)), greenery (§4.9), the hidden-share
  and reach rows (§4.6), the island supply law (II.6 (3)), the ladder rows (§4.11), the interior ladder (§2.6) and the
  designation templates (§4.7 S11) all key their rows by the one band set `prosperity.bands` (§4.5). They interpolate
  along the same field value and read the per-plot `ContextVector` (§2.5). The one exception, the interior ladder, reads
  the plot's `fieldBand` column. That is by design: the occupants' band memory that moves with the field, J-A28.29. Two
  seams remain open. The first is the epoch step that re-bands `fieldBand`, promised by §2.5 and §2.8 but absent from
  §4.11 (VP2-02). The second is the hidden-share target, stated per band while its weights also scale by rung and
  density (VAL-02, VAL-05).
* **Evolution hooks across the parts.** The model (§2.5–§2.8), the pipeline (§4.11) and §6.1's streams agree, as do §7's
  edit kinds (§7.1 rows, §7.4 lifecycle rows, §7.5 transforms): every ladder, decline, use, terrain-water and sealing
  kind is one `ConversionOp`, drawn on `epoch.transform` keyed by lineage and epoch, usable by hand and undoable. The
  gaps are the new derived attributes: `fieldBand` and `BaseWing.spans` are absent from §7.1, §7.4 and §7.5
  (V-MAB2-04). The stored-plan re-cut's composition-role vertices are also not yet read out of §5.3's epoch row,
  §7.3's pinned cell (VD2-04) or §13.2's T31-9 and T31-11 (VAL-03).
* **The dossier across epochs.** This is the one real break of an owner rule. Item 20's "exists on every map" holds for
  every map edit (§7.7 item 2, J-A20.75), but the epoch's own steps can close a dossier-backed use or remove its
  building. The use step's close, a redevelopment's purchase and step (c)'s `vacate` are the paths the verifiers named.
  The growth step's declared `demolish`, a carve, `wallToWay`'s clearance, `contractWall`, a terrain-and-water repair,
  `fallIsland`, a tunnel's closing (II.7.3) and a sealing (`sealPassage` vacates the plots behind the passage) reach the
  same result (VD2-01, VD2-02 as widened).
* **The staged layers against PART II.6 / II.7.** The island rule, the tunnel condition table, the underground
  pseudo-district, S7b (5)–(6) and the Staged list agree. The Staged sewers row lacks the crowding share (VP2-13). The
  crowding hook's share in §4.11 is misworded (VP2-03). The stretch split leaves chambers, access points and frontages
  on the old record (VP2-04, VP2-05, VP2-12).
* **The one-page summary and §1.** Both are true, with one overstatement. The summary says a plot's geometry "never
  reads poorer than the middle band once it was built to that band or above", but a rung-3 event (vacancy, ruin,
  redevelopment) resets `builtBand` — the owner's "until vacancy, ruin, fire, war, or redevelopment shifts things
  entirely" (VAL-04). §1.1's `RungProfile` comment restates §3.2 (9) (VS2-11). The effort figure (166–220 pw) matches
  §16's milestone sum (low 166, high 220) and its line sum (152–202 + 14–18), recomputed here. The one-click default
  (§1.2) is unchanged in substance: `elaborate: 'click'`, eager footprints at city zoom, layers hidden.
* **Reference strengths.** No regression found.
  - *Legibility:* a hidden court draws as a court (T30-4; §8.3's census rows), secret names are withheld, never the
    place, and the change marker is an overlay layer.
  - *Speed:* the plan rung, the re-cut chain and the elaboration cache are off the one-click path (§12.7, §12.8), and
    the one-click budget rows are unchanged.
  - *Charm:* the bent cut, the street signature and the parity presets are untouched.
  - *One-click:* `generate({seed})` still needs no questionnaire; every extension rides behind the defaults (§1.2, §7.6).

## 5 Single source, deferral wording, the J-A record

* **Single source.** Two restatements remain open. §4.1's list of what makes a rung stale restates §2.8's gloss (VAL-01
  keeps both lists in step). §2.6's and §10.2's static-baseline clauses restate §4.7's fill (V-MAB2-12, VP2-01 (2) turn
  them into pointers). The proposed fixes state each new rule once, at its home, with pointers elsewhere:
  - V-MAB2-01's capacity rule at §2.6, with §4.7 (V-MAB2-02), §7.1 (VD2-07) and §5.2 (V-MAB2-05) pointing to it;
  - the dossier-across-epochs rule at §4.11, with §7.7 pointing to it (VD2-01, VD2-02);
  - the tunnel SPLIT rule at §6.3, with II.6 pointing to it (VP2-04, VP2-05).
* **Deferral wording.** Probes over the whole document for "TBD", "to be decided / determined", "open question",
  "left open", "deferred to", "decide later", "later pass", "later round", "TODO", "FIXME" and "PENDING" found no
  deferral. "Left open" occurs only as a gate's opening, and "undecided" only as a label candidate and D-22's rejected
  alternative. The one forward reference is §0.2's "Item 32 … is the next pass's", which the owner's item 32 itself
  directs ("apply in the pass after 09"). The roadmap's staged subjects are the *Staged* list's hooks, which is staging,
  not deferral.
* **The J-A record.** 193 `J-A` rows in the index and 193 Part A entries, with the same id set. Every Part A entry opens
  "Chose …" and gives a "because"; every row names its section; every item 8–31 has at least one row (item 28 has 35,
  item 30 has 19, item 31 has 18). Item 21's rows record the owner's withdrawal of the GPL-3 intent (J-A21.01, J-A21.31,
  J-A21.81). §17.3 and §17.4 are byte-identical to the pre-pass archive, and §17.1 differs only by a J-A21.01 pointer, a
  process path and item 23's provenance examples. The rulings this validation's changes add or amend are named in their
  issues: J-A20.75 (VD2-01), J-A28.23 (V-MAB2-01), J-A28.26 (V-MAB2-09), J-A29.25 (V-MAB2-10), J-A28.46 (VP2-01),
  J-A28.73 (VD2-11), J-A11.43 (VP2-04), J-A30.41 (VAL-02), J-A17.01 and J-A20.01 (VS2-03), J-A28.34 (VK2-04) and
  J-DET-53 (VD2-13).

## 6 The issues — each with its owning part and its exact change

Apply order: V-MAB2-01 before V-MAB2-02, VD2-07, VD2-06 and V-MAB2-05; V-MAB2-09 with VK2-04 and VK2-06; V-MAB2-10 before
V-MAB2-11 and VS2-02; VD2-01 with VD2-02, then VS2-03; VP2-04 with VP2-05, then VP2-12; VAL-02 with VAL-05; VD2-04 with
VAL-03; VK2-02 before VK2-09 (3); VK2-08 before VK2-09 (2). The merged duplicates of §3 are not listed again: each is
applied once, through its primary. Majors first, then by owner.

### Major

### V-MAB2-01 — major · new-problem · model · item 28 (f)

**Claim.** §2.6 says Building.households is 'never above the capacity', but only S11's operator (§4.7) re-homes an excess. Five other changes lower a building's capacity with no re-clamp: a setAttr of its heights (fewer floors); a warp or moveVertex whose carry shrinks the footprint; a moved face of a spanned passage; a §7.6 edit of a table the capacity function reads (households.max, the poorest programme row's circulation or room area); and a change of the band set whose first band names that row. The count then exceeds the capacity, §5.2 F-PLAN tier 6 aborts the rung as a bug, and T28-17 fails. CONFIRMED by reading; the failure path is PLAUSIBLE. Merges nothing; its pointers are V-MAB2-02 (§4.7), VD2-07 (§7.1), VD2-06 (§7.3 item 1) and V-MAB2-05 (§5.2).

**Required change.** §2.6, the capacity bullet ('One capacity function'): after 'so the solver and the plan never disagree on how many households a shell holds.' insert: 'The bound holds through every change: a committed change that lowers a building's capacity below its `households` count — S11's operator (§4.7), the carry after a `warp`, a `moveVertex` or a change of a spanned passage's face (the wing-carrying rule, above), a `setAttr` of its heights, or a §7.6 edit of a table this function reads (the designation template's `households.max`, the poorest programme row's `circulation` or `room` area, or the band set whose first band names that row) — re-homes the households past the capacity, the last in address order, by §4.7's overflow pass inside the causing event, each move a lifecycle event of it (§2.8); a hand edit lists the moves among its dry-run fates and takes the receiving buildings into its effective scope (§7.3 item 1), and its undo restores them (§7.4). No such change is refused for it; only a hand `relet` above the capacity is (F-EDIT).' Append to J-A28.23's Part A entry: 'The bound is kept through every change that lowers the capacity by re-homing the excess, never by refusing the change (verify-model-r2 V-MAB2-01).'

### VD2-01 — major · new-problem · determinism · item 20 (with 17 (d), 8)

**Claim.** WIDENED by the validator. Round 2 widened §7.7 item 2 to refuse 'a map event — one without EditBase.dossier —' that would close, remove or re-designate a dossier-backed element, or empty or remove the building that houses it. An `epoch` also carries no EditBase.dossier, so it is such an event. Its steps issue these conversions: the use step's close; a redevelopment's purchase; step (c)'s vacate; and also the growth step's declared demolish or corridor re-cut, a carve, wallToWay's clearance, contractWall, a terrain-and-water repair, fallIsland, a tunnel's closing (II.7.3) and sealPassage's vacate. Nothing in §7.7, §5.2 F-EDIT or §5.3's dossier row says how the rule applies inside an epoch, so an ordinary epoch is either refused whole or breaks the owner's rule that everything the dossier specifies 'EXISTS on every map' (item 20 (b)). Item 17 (d) ('may relocate or close') meets item 20 (c) ('only an instruction from the dossier removes') here, and the ruling is not recorded. Merges nothing; VD2-02 is the pipeline side, VS2-03 the test.

**Required change.** (1) In §7.7 item 2 and in §7.1's dry-run sentence replace 'A map event — one without `EditBase.dossier` —' with 'A map event — one a user, or a host's map edit, appends without `EditBase.dossier` —'. In §5.2 F-EDIT's detection cell replace 'a map event — one without `EditBase.dossier` —' with 'a map event — one a user, or a host's map edit, appends without `EditBase.dossier` —'. (2) In §7.7 item 2, after '(J-A20.75).' insert: 'An `epoch` is bound by the same rule without being refused by it: no step of an epoch closes a dossier-backed use or leaves one without its building — §4.11's *Dossier content across epochs* relocates the use first wherever a step would close it or empty or remove the building that houses it — so every dossier-backed element is live and placed after every epoch (§5.3's row).' (3) J-A20.75: append to its index row '; an epoch never closes a dossier-backed use or unhouses one — it relocates it first (§4.11) — so the refusal applies to the events a user or a host's map edit appends', and to its Part A entry: 'An epoch never closes a dossier-backed use or leaves one without its building: §4.11 relocates the use first. Where item 17 (d) lets an assigned business "relocate or close under the same rules", a dossier-backed one relocates and never closes, because item 20's later and narrower rule — only an instruction from the dossier removes a dossier element — governs dossier content; item 17 (d) keeps its full meaning for the map's own assignments (validate, VD2-01 widened).'

### VD2-02 — major · missing · pipeline · item 20 (with 17, 8, 11, 30)

**Claim.** WIDENED by the validator. §4.11 spares no dossier-backed use. The use step (2) closes a use on low catchment demand or a starved supply edge, and its clause (4) protects only a pinned assignment. A redevelopment's purchase closes or relocates 'the plots' uses'. Step (c) fires vacate at a building's last household. The decline table's exemptions row covers only an 'assigned entity' and only for the lottery. The growth step's declared demolish and corridor re-cuts, a carve, wallToWay's clearance, contractWall, the terrain-and-water repairs, fallIsland ('every entity under it demolished'), a tunnel's closing (its frontage plots abandoned, II.7.3) and sealPassage (the plots behind it vacated) can each empty or remove the building that houses a dossier-backed use. So an epoch can remove an element §7.7 item 2 and §5.3 say exists on every map. The enumeration of paths is CONFIRMED by reading; the failure on a real history is PLAUSIBLE.

**Required change.** §4.11: (1) After the paragraph that begins '**The epoch-spread mutation (item 18 (c)).**' insert the paragraph: '**Dossier content across epochs (item 20; J-A20.75).** No step of an epoch closes a dossier-backed use (its assignment's `existence: 'dossier'`, §7.7 item 2) or leaves one without a building. The use step never closes one: where its catchment or its supply fails, the use relocates to (1)'s best alternative by the solver's `dossier` request — its first closest option where no plot passes the hard rows (J-A20.71) — and otherwise stays. Before any other step would empty or remove the building that houses an unpinned one — a redevelopment's purchase, step (c)'s `vacate`, the decline lottery's strike, the growth step's declared `demolish` or corridor re-cut, a carve, `wallToWay`'s clearance, `contractWall`, a terrain-and-water repair, `fallIsland`, a tunnel's closing (II.7.3) or a passage's sealing — the use is first relocated the same way inside the epoch, a `relocateUse` citing the epoch and counted outside the use cap; a pinned one keeps its building, which the step treats as it treats any pinned entity (§7.2). So the dossier element is live and placed at every step (§5.3's row).' (2) In the use step (2), after '…no provider in reach for `starveAfterEpochs`;' insert ' a dossier-backed use never closes by this rule (*Dossier content across epochs*, below);'. (3) In rung 3, replace '(the plots' uses closed or relocated by the use step under item 17's rules; a pinned assignment or a lock stops it)' with '(the plots' uses closed or relocated by the use step under item 17's rules — a dossier-backed use relocated, never closed (*Dossier content across epochs*); a pinned assignment or a lock stops it)'. (4) In the decline table's exemptions row, after 'an assigned entity only through the use-relocation rule (AM-17)' insert '; the building of a dossier-backed use only after that use is relocated (*Dossier content across epochs*)'. The ruling is J-A20.75's (VD2-01 (3)).

### Minor — model (§2) (7)

#### V-MAB2-06 — minor · new-problem · model · item 28 × 30

**Claim.** A cached plan is not marked stale when the passage it spans moves. The span ring is derived at read from the Passage face. ElaborationRecord.inputs (§2.8) holds the building's leaf digest with 'the wings' spans', but spans is a FaceRef whose value does not change when the face's ring does. So a moveVertex on the passage's far side line or its ends changes the spanning building's extents while its plan rung stays current, and T28-4's tiling bar fails. §4.1's copy of the stale list follows (VAL-01).

**Required change.** §2.8 ElaborationRecord.inputs: replace '…sub-locations, the wings' spans), the occupants' band …' with '…sub-locations, the wings' spans), the leaf digest of each spanned `Passage` (its face's ring, from which the span rings are read, §2.6), the occupants' band …'. In the `stale` gloss below it, replace 'the storeys, the wing rings, the households' with 'the storeys, the wing rings or a spanned passage's face, the households'.

#### V-MAB2-07 — minor · new-problem · model · item 30

**Claim.** Which composed wings carry spans is undetermined. Wing.spans (§2.6) reads 'a composed wing takes it from the base wing it covers', but a composed wing may cover two base wings, part of one, or a part away from the passage, so no unique source exists. A composed wing that takes spans without a side on the passage's edge has no span ring under Wing.spans' own cut. BaseWing.spans already uses the edge criterion. (The consequence is PLAUSIBLE.)

**Required change.** §2.6 Wing.spans: replace 'a composed wing takes it from the base wing it covers (BaseWing.spans, above), so a composition inherits the span and never decides it.' with 'a composed wing whose ground ring runs along the edge of a passage that a base wing spans takes that `BaseWing.spans` (above) — every such composed wing, and no other — so a composition inherits the span and never decides it.'

#### V-MAB2-08 — minor · conflict · model · item 30

**Claim.** BaseWing.spans' comment says 'a drawPassage or a thin … back_court reaches it through that re-fit'. But thin … back_court only seals the passage, and sealPassage makes no geometry change (§2.5), so it runs no re-fit. The events that make or remove a passage are densify … back_court, a block's reach set to passage (J-A30.72), and the rung-3 re-cut that removes a sealed passage with its rear row.

**Required change.** §2.6 BaseWing.spans comment: replace '(§4.6, §4.7 S10 (9); a drawPassage or a thin … back_court reaches it through that re-fit, §7.1, §4.11)' with '(§4.6, §4.7 S10 (9); a `drawPassage`, a block's `reach` set to `passage`, `densify … back_court`'s new passage and the rung-3 re-cut that removes a sealed passage with its rear row reach it through that re-fit, §7.1, §4.11 — `sealPassage` and `thin … back_court`'s sealing change no geometry and leave it)'.

#### V-MAB2-09 — minor · missing · model · item 28, 28 (f)

**Claim.** §3.4's seed clip (tileRings) refuses a piece with a hole ('an earlier ring wholly inside a later one'), and §5.2 tier 2 treats a refused seed as a bug the composition contract excludes. But §2.6's contract and step 4 have no rule for a wing whose extent lies wholly inside a later wing's, and they never name tileRings. Overlapping wings are legal (rule 4 (iii)). The kept-room gloss is also one-sided: the one overlay changes an earlier wing's piece too. Merges VK2-05 and VD2-09 (apply once); VK2-04 is the kernel's companion and VK2-06 the determinism side. The container-after order is PLAUSIBLE.

**Required change.** §2.6: (i) in the stage-3 contract, after 'stand at least `attractCm` apart except where they share a joint' insert '; the clip takes the wings that reach a storey in wing order, except that a wing whose extent there lies wholly inside another's is taken after that container, so it has no piece at that storey (its floor there is its container's) and no piece has a hole'. (ii) In step 4, replace '(where wings overlap, rule 4 (iii), each extent less the union of the extents before it in wing order: §3.4's seed contract)' with '(where wings overlap, rule 4 (iii), each extent less the union of the extents before it in wing order, a contained wing after its container (the stage-3 contract): §3.4's seed clip, `tileRings`)'. (iii) In the re-cut bullet, replace '— so a later wing's rooms are re-cut too where an earlier overlapping wing changed' with '— so a wing's rooms are re-cut too where an overlapping wing, earlier or later, changed its piece (the clip's crossing vertices included, §3.4)'. Append to J-A28.26's Part A entry: 'A wing whose extent at a storey lies wholly inside another's is clipped after that container, so it has no piece there and no piece has a hole, which §3.4's seed clip refuses (validate: V-MAB2-09 with VK2-05, VD2-09).'

#### V-MAB2-10 — minor · conflict · model · item 29

**Claim.** The basement's access is decided in two places with no precedence. Basement.access is 'how the plan rung joins it' and 'read by the plan rung', but no rule derives it. Step 3 instead joins 'the basement by the row's basementAccess', a RoomProgramRow column read at the occupants' band. The two can disagree, and reading the row at the occupants' band would move the shell's basement access with its occupants, against T28-14's byte-identical basement. V-MAB2-11 is the §10.2 follow-up. The derivation rule is PLAUSIBLE.

**Required change.** §2.6 'Basements': replace 'and is joined by the stair core, a trapdoor or an outside stair (`Basement.access`, read by the plan rung)' with 'and is joined by the stair core, a trapdoor or an outside stair — `Basement.access`, derived with it: `external` for a walk-out, else the class programme row's `basementAccess` read at the plot's `builtBand` (§10.2), a shell fact that never moves with the occupants and is edited with the basement (`setAttr(basement)`) — which the plan rung reads'. In step 3, replace 'the basement by the row's `basementAccess`' with 'the basement by `Basement.access`'. Append to J-A29.25's index row '; `Basement.access` derived — `external` for a walk-out, else the programme row's `basementAccess` at `builtBand`' and to its Part A entry: 'The basement's access is derived with the basement — an outside stair for a walk-out, else the class programme row's access read at the band the stock was built for — so it is a shell fact that never moves with the occupants (validate, V-MAB2-10).'

#### V-MAB2-12 — minor · stale · model · item 28 (f), 23

**Claim.** §2.6 says 'with no epoch every building houses its template row's households.built, clamped into [1, capacity], so the static baseline is unchanged'. But §4.7's fill places 'at most' households.built per slot, and its overflow pass re-places households into other buildings (J-A28.46), so a building may house fewer or more. The sentence also restates §4.7's fill. Merges VP2-08 (apply once); worded as a pointer so the fill has one statement.

**Required change.** §2.6 interior ladder: replace 'with no epoch every building houses its template row's `households.built`, clamped into [1, capacity], so the static baseline is unchanged' with 'with no epoch every residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity — so the static baseline is unchanged'.

#### V-MAB2-13 — minor · stale · model · item 31

**Claim.** RoofSpec's 'none' comment still reads 'a ruined building's roofless state (§2.8 decline hooks)'. The Materials paragraph, §2.8 and §8.2 give the roof's loss to the decline ladder's derelict state (decay), kept through ruin.

**Required change.** §2.6 RoofSpec: replace "'none' /* a ruined building's roofless state (§2.8 decline hooks) */" with "'none' /* the roofless state the decline ladder's `decay` sets — derelict, and kept through ruin (§2.8 decline hooks) */".

### Minor — pipeline (§4, §10, PART II, PART III) (8)

#### V-MAB2-02 — minor · duplicate · pipeline · item 28 (f)

**Claim.** Once V-MAB2-01 lands, §2.6 holds the list of changes that re-home households, but §4.7's 'Households per building' keeps its own shorter list: 'The same holds wherever S11's operator later builds or changes a residential shell — an epoch's new faces, a rung-3 re-cut, a designation mutation (item 18): a result whose capacity falls below its households re-homes the excess …'.

**Required change.** §4.7 'Households per building': replace the sentence 'The same holds wherever S11's operator later builds or changes a residential shell — an epoch's new faces, a rung-3 re-cut, a designation mutation (item 18): a result whose capacity falls below its households re-homes the excess by the same pass inside the causing event, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity (§4.11).' with 'The same pass runs inside every change §2.6's capacity rule lists — S11's operator building or changing a residential shell (an epoch's new faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's capacity falls below its households, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity (§4.11).'

#### VP2-02 — minor · conflict · pipeline · item 28 (f), 31

**Claim.** §2.5 and §2.8 say Plot.fieldBand (the occupants' band) is 're-banded after S6 at every epoch (§4.11)', but §4.11 names no such step ('fieldBand' occurs 0 times there). Without it an epoch never moves the occupants' band, which V-MAB1-05's fix depends on, and its order against rung 1, which reads the field band, is unstated. Merges V-MAB2-03 and VD2-14 (apply once, in the epoch's order).

**Required change.** §4.11 'The epoch's order': replace '(a) S6 re-evaluates the drivers and the bands and marks the due blocks' with '(a) S6 re-evaluates the drivers and the bands, re-bands every live plot's `fieldBand` against its own column by §4.5's rule (§2.5; J-A28.29) — before any rung reads the field band, the former values in the epoch's undo record — and marks the due blocks'.

#### V-MAB2-11 — minor · conflict · pipeline · item 29

**Claim.** Under V-MAB2-10's rule, §10.2's `RoomProgramRow.basementAccess: 'core'|'trapdoor'|'external';` has no comment saying it is the default Basement.access derives from, so it reads as a second decision.

**Required change.** §10.2 RoomProgramRow: replace `basementAccess: 'core'|'trapdoor'|'external';` with `basementAccess: 'core'|'trapdoor'|'external' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand; the plan rung reads Basement.access */;`

#### VP2-01 — minor · new-problem · pipeline · item 28 (f), 23

**Claim.** The generation fill leaves three count statements loose. (1) §4.7: S10b places 'at most' households.built per residential slot, but S11 writes Building.households 'clamped into [1, capacity]'; a slot S10b left empty has no household to clamp up to 1. (2) §10.2 says every building houses its row's built count, restating §4.7 wrongly (an overflow receiver houses more). (3) J-A28.46's Part A says it chose the design over 'dropping the household', while its own fallback is F-SITING's last rung. Sharpened by the validator: an unfillable residential slot is dropped from the site plan, never left as an empty residential building. §10.2 is worded as a pointer.

**Required change.** (1) §4.7 'Households per building': replace "per residential slot of the plot's designation template row at most the row's `households.built`, by band ± drift" with "per residential slot of the plot's designation template row at least one household and at most the row's `households.built`, by band ± drift (a residential slot the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, and a residential plot none of whose slots it can fill is typed vacant by the reconcile below — surplus capacity, never an empty residential building)". (2) §10.2: replace "with no epoch every building houses its row's `built` count, clamped to its capacity with the overflow re-placed (§4.7), so the static baseline is unchanged (item 23)" with "with no epoch every residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity — so the static baseline is unchanged (item 23)". (3) J-A28.46 Part A: replace "or dropping the household (the population is the dossier's, and F-PLAN never omits a unit)" with "or dropping the household before any re-placement (the population is the dossier's, and F-PLAN never omits a unit; F-SITING's last rung alone takes off the manifest a household no building of its district can hold, reported — VP2-07)".

#### VP2-03 — minor · conflict · pipeline · item 12

**Claim.** II.7.3 (c), the home, and J-A12.47 send 'a share crowdingShare of the poorest band's households in the epoch's residual demand' underground. §4.11 regrowth-first step (6) still says the hook 'first takes its table share of the residual', which reads as a share of the whole residual, every band included.

**Required change.** §4.11: replace "where `Features.sewers` is on, the underground crowding hook first takes its table share of the residual (II.7.3 (c), §4.5 S7b (6))" with "where `Features.sewers` is on, the underground crowding hook first sends `crowdingShare` of the residual's poorest-band households underground (II.7.3 (c), II.7.4, §4.5 S7b (6))".

#### VP2-04 — minor · new-problem · pipeline · item 11, 12

**Claim.** II.6's stretch split (J-A11.43) hands on only 'its invert knots, the outfall at its end, the plots and buildings whose connections meet it'. It re-points neither Tunnel.chambers, nor the access points on the stretch (AccessPoint.under.tunnel), nor the underground blocks' Frontage records (Frontage.way). So a cave-in of the stretch leaves those plots reading the old record's `open`. The stretch's ends are arbitrary vertices, so one plot's frontage can cross an end and front two records, against U1's 'exactly one … tunnel run'. II.6 also states the parts' identity rule itself, while §6 owns identity (canon R5). The widening rule is PLAUSIBLE, as its author says.

**Required change.** II.6: (1) replace "A conversion given a `stretch` first splits the tunnel at the stretch's two ends" with "A conversion given a `stretch` first widens it at each end to the nearest centreline vertex opposite which no underground plot's frontage continues — a boundary between two plots' frontages, a junction or the tunnel's end — so that no plot fronts two records (U1, II.7.3), then splits the tunnel at the stretch's two ends"; (2) replace "the part holding the centreline's first vertex keeps the tunnel's address, the new records take addresses minted from the event, and every part continues the tunnel's lineage with its part index (§6.3's SPLIT rule, the first vertex standing for a plot's frontage anchor)" with "each part keyed by §6.3's SPLIT rule for a tunnel record" (with VP2-05); (3) replace "(its invert knots, the outfall at its end, the plots and buildings whose connections meet it)" with "(its invert knots, the outfall at its end, the plots and buildings whose connections meet it, its chambers (`Tunnel.chambers`) and the access points whose kerb vertex lies on it (`AccessPoint.under.tunnel`, II.7.4)), the `Frontage` records of the underground blocks along it (§2.5) split at the same ends and each re-pointed to the part it fronts". Append to J-A11.43's index row and Part A entry: "; the stretch widened to plot-frontage boundaries, and the chambers, access points and block frontages re-pointed (amended by verify-pipeline-r2)".

#### VAL-01 — minor · duplicate · pipeline · item 28 × 30

**Claim.** NEW (validator). §4.1's 'Saved, then stale until clicked' keeps its own copy of the list of changes that make a rung stale ('a designation, an assignment, the band, the storeys, the wing rings, the households, a table slice it cites, or a dossier event of items 18, 22 or 31'). V-MAB2-06 adds a spanned passage's face to §2.8's gloss, the home; left alone, §4.1's copy lags it.

**Required change.** §4.1, the elaboration bullet: replace 'a designation, an assignment, the band, the storeys, the wing rings, the households, a table slice it cites, or a dossier event of items 18, 22 or 31' with 'a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face, the households, a table slice it cites, or a dossier event of items 18, 22 or 31 (§2.8's `ElaborationRecord.inputs`)'.

#### VAL-02 — minor · conflict · pipeline · item 30

**Claim.** NEW (validator). §4.6 scales the reach weights' non-open parts by the density value (× (0.5 + density)) and by the rung (TOWN 0.6, CITY 1.0, METROPOLIS 1.2). The item-30 hidden-share target is stated per band only ('squalid 0.20, poor 0.12 … ± 0.03'), and the weights are 'fitted at M-1 on B-CITY'. So a TOWN district, or a sparse or dense one, lands off its band's target by construction, and T30-2 ('the hidden share per district lies within its band's target ± 0.03') fails on a correct law. It also leaves unsaid which band a district of mixed bands is judged at. The owner's 'city and metropolis bands higher than town' needs the target itself to follow the rung. The text contradiction is CONFIRMED; the T30-2 failure is PLAUSIBLE. VAL-05 is the test side.

**Required change.** §4.6, the reach-weights paragraph: replace '± 0.03 — to which the reach weights are fitted at M-1 on B-CITY and which §13.2's bar checks per district' with '± 0.03 — read for a district at its plots' area-weighted mean prosperity value (interpolated between the band rows) and scaled as the reach weights are, by the rung's factor (TOWN 0.6, CITY 1.0, METROPOLIS 1.2) and by (0.5 + the district's mean density value), clamped to [0, 1]; the base weights are fitted at M-1 on B-CITY so that every rung's districts meet their scaled targets, and §13.2's bar checks each district against its own'. Append to J-A30.41's index row '; the target read at the district's mean value and scaled by the rung and density factors that scale the reach weights', and to its Part A entry: 'The target is read at the district's mean prosperity value and scaled by the same rung and density factors as the reach weights, so a town hides less than a city and a dense quarter more, as the owner's "city and metropolis bands higher than town" asks, and the bar checks what the rule produces (validate, VAL-02).'

### Minor — determinism (§5–§7) (11)

#### V-MAB2-04 — minor · missing · determinism · item 28 (f), 30

**Claim.** §2 declares Plot.fieldBand ('derived — no setAttr (§7.1)') and BaseWing.spans ('written and cleared only by S11'), and §2.8's registry requires every new attribute to have an edit kind or be declared derived (§7.1). Neither occurs in §7.1, §7.4 or §7.5, and §2.8's migration pointer to §7.5 names a transform §7.5 does not state. Merges VD2-05 (apply once).

**Required change.** (i) §7.1 'blocks, plots' row: after 'never `builtBand` or `builtProsperity`, derived state written only by the paths §4.11's floor paragraph lists — J-A31.44, J-A31.71;' insert 'never `fieldBand`, derived state written only by a derivation that reads the current field and by the epoch's re-banding (§2.5, J-A28.29);'. In the 'buildings' row's derived list, after '`predecessor` (written by `reuse … build`, §4.11)' insert ', each base wing's `spans` (written and cleared only by S11 when it builds or re-fits a passage's front building, §2.6)'. J-A31.76's index row adds 'and a plot's `fieldBand` and a base wing's `spans`' to its derived list. (ii) §7.4: after the `builtBand` row add the row '| `fieldBand` (a plot attribute, item 28 (f) — not an event kind: its paths) | every derivation that reads the current field (generation, `Adjust`, a brush's re-derivation past τ) and the epoch's re-banding after S6 (§2.5, §4.11) | §2.6's interior ladder, `ClassRules.pick` and the plan rung's recorded inputs (§2.8) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush set it in their scope; an epoch re-bands it | restored by the undo record of whichever event wrote it, an epoch's among the entities it replaced | a document written before the attribute existed gets `fieldBand` = the band its plot's `DerivationRecord.band` holds (§7.5) |'. In the epoch row's regenerate cell, after '§4.11's incremental path at its log position:' insert 'each plot's `fieldBand` re-banded after S6 (§2.5),'. (iii) §7.5: after 'for one with epochs, the band its last derivation read;' insert 'its `fieldBand` is that same band;', and after '(no older document has a passage)' insert ', so no base wing carries `spans`'.

#### V-MAB2-05 — minor · stale · determinism · item 28 (f)

**Claim.** §5.2 F-PLAN tier 6 still reads '… which S10b's fill and `relet` keep to (§4.7 S10b, §4.11)'. After J-A28.46, S10b cannot read the capacity: S11 writes the clamped count and the overflow pass keeps to it; and after V-MAB2-01 §2.6's re-homing keeps the bound on every change. Merges VP2-06 and VD2-08 (apply once); its part (b) folds into VD2-06.

**Required change.** §5.2 F-PLAN tier 6: replace 'which S10b's fill and `relet` keep to (§4.7 S10b, §4.11)' with 'which the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` (§4.11) and §2.6's re-homing on every change that lowers a capacity keep to'.

#### VD2-06 — minor · conflict · determinism · item 30 × 28, 28 (f)

**Claim.** §2.6 says 'an edit that changes the passage face takes the building into its effective scope, as J-P48 (1)'s split faces are, §7.3 item 1', and §2.6 (1) puts the storing edit's split faces in its effective scope. §7.3 item 1, the effective scope's home, states neither, nor the buildings V-MAB2-01's re-homing moves households into. So item 7 (ii)'s byte-identity check would flag a front building's carried stored rings, and the scope shown before commit would omit a building the edit writes. Carries V-MAB2-05's part (b).

**Required change.** §7.3 item 1: before '**The seam exception** (NF-P6)' insert: '**Stored compositions, spanned passages and re-homed households** (§2.6): the edit that stores a composition holds the faces J-P48 (1)'s split edges touch and the row neighbours' wing rings its carry changes; an edit whose batches change a `Passage` face (L3) or move one of its vertices holds the passage's front building (`Passage.frontBuilding`, §2.5) when that building's stored composition has a wing spanning the passage (§2.6's carry trigger); and an edit that lowers a building's capacity below its households holds the buildings §2.6's capacity rule re-homes them into.'

#### VD2-07 — minor · missing · determinism · item 28 (f)

**Claim.** §7.1 names the hand paths that change a building (heights, warps, vertex moves, passage faces) but not the capacity re-homing V-MAB2-01 states at §2.6. The validator re-worded the change as a pointer, so the rule has one statement (§2.6).

**Required change.** §7.1 'Entrances, basements, passages and plans' paragraph: after '…which marks an unstored plan stale and re-cuts a stored one inside the event (§7.3);' insert ' an edit that lowers a building's capacity below its households — a `setAttr` of its heights, a `warp` or `moveVertex` that carries its footprint or its spanned passage's face — re-homes the excess by §2.6's capacity rule, each move among its fates (§7.3 item 4);'.

#### VP2-05 — minor · partial · determinism · item 11

**Claim.** §6 owns identity. §6.3's JOIN and SPLIT rule names the anchor only for a plot, while II.6 extends it to a tunnel record ('the first vertex standing for a plot's frontage anchor', J-A11.43). So the identity home does not state a rule the pipeline relies on. VP2-04 (2) makes II.6 a pointer to it.

**Required change.** §6.3 JOIN and SPLIT bullet: after "only an `undo` restores that record exactly (§7.4)." insert "A **tunnel record** split by a stretch conversion (II.6, J-A11.43) follows the same rule, the centreline's first vertex standing for the frontage anchor: the part holding it keeps the address, the other parts take addresses minted from the causing event's `seq` and ordinal, and every part continues the tunnel's lineage with its part index."

#### VP2-07 — minor · conflict · determinism · item 28 (f), 16

**Claim.** After S11, §4.7 sends 'a household no building of the district has room for' to F-SITING as an unplaced item. F-SITING's detection cell names only the eager allocation and post-build requests, and its ladder's first rungs (a JOIN, a whole block, the district edge) would re-cut plots S11 has already built on. The case has no detection clause and no rung stated for use after S11.

**Required change.** §5.2 F-SITING detection cell: after "a post-build request (§7.7) finds no plot inside the hard rows" insert "; S11's overflow pass (§4.7, item 28 (f)) finds no residential building of the district with room for a household". Ladder cell: after "the report naming each unplaced item's blocking hard rows and its closest options" insert "; a household S11's overflow pass cannot house takes the last rung alone — the manifest reduced by it, reported with the capacities that refused it, no re-cut after S11".

#### VD2-04 — minor · conflict · determinism · item 28 (f), 31

**Claim.** §2.6 says a stored plan's re-cut establishes J-P48 (1) for its new walls, so the shell is read with the composition-role vertices removed, and §5.3's interior-ladder row reads it that way. But §5.3's epoch row compares 'their buildings' shell subtrees against their pre-epoch values', with none matched only to a rung-1 or rung-2 LadderOp. Rung 1's relet re-cuts a stored plan inside the epoch, so the vertices it adds fail that check on a legal epoch. §7.3's stored-plan row lists the shell's wing rings as pinned with no qualifier. The test side is VAL-03.

**Required change.** (1) §5.3's epoch row invariant cell: after 'a shell being the subtree the interior-ladder row names: wings, heights, entrances, roof, basement' insert ', its rings read as that row reads them (without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1))'. (2) Its check cell: 'their buildings' shell subtrees against their pre-epoch values' becomes 'their buildings' shell subtrees, so read, against their pre-epoch values'. (3) §7.3's stored-plan row pinned cell: 'the shell — wing rings, entrances, heights, roof, basement —' becomes 'the shell — wing rings (read without the `composition`-role vertices the re-cut adds, §2.6, J-P48 (1)), entrances, heights, roof, basement —'.

#### VK2-06 — minor · conflict · determinism · item 28 (f)

**Claim.** F-PLAN tier 1 detects 'a seed or fixed ring the rung's transient arena refuses … §3.4', but the holed-piece refusal comes from tileRings, before any arena opens. Tier 2 sends every seed refusal to the bug abort as 'the shell §2.6's composition contract guarantees', and that contract says nothing about a holed piece until V-MAB2-09 lands. Merges VD2-10 (apply once, with V-MAB2-09).

**Required change.** §5.2 F-PLAN: (1) tier 1: replace 'a seed or fixed ring the rung's transient arena refuses (`E_DEGENERATE`, detail `seed`, `fixed` or `overlap`; §3.4)' with 'a seed or fixed ring the rung's seed clip or transient arena refuses (`E_DEGENERATE`, detail `seed`, `fixed` or `overlap`; §3.4's `tileRings` and `transientArena`)'. (2) Tier 2: after '…is the shell §2.6's composition contract guarantees' insert ' (its clip order leaves no seed piece with a hole: §2.6's stage-3 contract, §3.4's `tileRings`)'.

#### VD2-11 — minor · new-problem · determinism · item 28 (f)

**Claim.** F-PLAN tier 2 and J-A28.73 re-place a refused stair bay or chimney stack 'at its next attempt'. But tier 2 is 'a deterministic geometric fix' (§5.1), §6.1 gives attempts only to plan.layout, and a layout re-roll keeps the stair core by construction, so the core is placed on no stream that has a next attempt. The validator names the deterministic move: §2.6 step 3's filtered candidates.

**Required change.** §5.2 F-PLAN tier 2: replace 'at its next `attempt`' with 'in the same attempt, at the next candidate of §2.6 step 3's filtered placement order — a deterministic move that reads no stream, as every tier-2 repair is (§5.1)'. J-A28.73's index row: 're-placed at its next attempt' becomes 're-placed in the same attempt by a deterministic move'; its Part A entry: 'at its next `attempt`' becomes 'in the same attempt, at the next candidate of the placement's filtered order'.

#### VD2-12 — minor · missing · determinism · item 12 (with 23)

**Claim.** §7.6's list of rule tables names 'the island rule and the sewer existence law (II.6, II.7)' but not UndergroundRule (II.7.4), whose values are 'our own, calibratable', crowdingShare among them, nor II.7.2's tunnel profile table ('The tunnel profile is a rule table'). Everything must stay editable (rule 3). Widened by the validator to the tunnel profile. VD2-15 is withdrawn: II.7.4 already calls UndergroundRule 'one editable rule record (§7.6)'.

**Required change.** §7.6 'Tables have keyed rows': after 'the island rule and the sewer existence law (II.6, II.7)' insert ', the underground rule `UndergroundRule` and the tunnel profile table `TunnelProfileRow` (II.7.2, II.7.4)'.

#### VD2-13 — minor · new-problem · determinism · item 20, 22 (d)

**Claim.** PLAUSIBLE. §6.1's Enter copies each live dossier-backed assignment 'as the dossier gave it'. A dossier also speaks through setAttr events: §7.7 item 1, the creation dossier's edit events at positions 0…k, and item 7's knownTo. So a dossier's later re-designation, name or knownTo reverts on the Enter map, against item 20's authority and item 22 (d).

**Required change.** §6.1 Enter: replace '— the assignment as the dossier gave it, without `placed`, `target` or `use`, which name the old town's entities —' with '— the assignment as the dossier's live events leave it (each live dossier `setAttr` on the element written into the copy's matching `Assignment` field: `name`, `function`, `shapeClass`, `knownTo`, `drift`), without `placed`, `target` or `use`, which name the old town's entities —'. J-DET-53's amendment note, in the index and in Part A, gains 'with the dossier's later `setAttr` values'.

### Minor — kernel (§3) (6)

#### VK2-01 — minor · new-problem · kernel · item 28, 28 (f)

**Claim.** §3.4's routes paragraph makes one input side the route of every fixed edge on it and holds it in the grid as one route-edge item. §3.3 has no transient exception: it returns each route edge once, keys an edge by its route's endpoints ('never by a sub-edge's endpoints'), calls that key total, and readBack returns its edges in §3.3's canonical order. So the wall segments on one seed side tie, a query near that side returns only one of them, and an edge on two input sides has no defined key. The plan's records are built from readBack 'whichever worker cut them', so the key must be total.

**Required change.** §3.4's routes paragraph: after '…its box the side's padded by the hot pixel (§3.3).' insert: 'It is the route that placement and the grid read, never the unit of an answer: a query and `readBack` return every edge between two of the arena's vertices on its own, keyed by §3.3's canonical key read on that edge's own endpoints — every vertex of the arena being of its one level — so no two edges share a key and an edge on more than one input side needs no choice between them.'

#### VK2-02 — minor · new-problem · kernel · item 28 (f)

**Claim.** §3.4 says 'on an edge that lies on two input sides — a joint, or a fixed ring's side along a seed side — it reads both'. Two kinds of edge lie on three input sides: a kept room's side along a joint, and, at the ground storey, the passage room's side beside a wing's seed side. A literal reader of 'two … both' implements a test on two lines.

**Required change.** §3.4: replace 'and on an edge that lies on two input sides — a joint, or a fixed ring's side along a seed side — it reads both' with 'and on an edge that lies on more than one input side — a joint, a fixed ring's side along a seed side, or a kept room's or the passage room's side along a joint — it reads each'. Its fixture is VK2-09 (3).

#### VK2-03 — minor · conflict · kernel · item 28 (f)

**Claim.** §3.4's re-cut 'passes the rooms the ladder keeps and the anchors that never move (the stair core's bay, the hearths' chimney stacks, a passage) as fixed rings'. §2.6's FIXED list, the home, also passes 'the composer's rooms', and F-PLAN's tier 2 (J-A28.73) names 'a composer's room'. The kernel's copy lags the home.

**Required change.** §3.4: replace 'passes the rooms the ladder keeps and the anchors that never move (the stair core's bay, the hearths' chimney stacks, a passage) as `fixed` rings, and cuts the rest' with 'passes as `fixed` rings the rings §2.6's re-cut rule fixes (the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the rooms the ladder keeps), and cuts the rest'.

#### VK2-04 — minor · conflict · kernel · item 28

**Claim.** The seed clip is defined on 'wing order'. V-MAB2-09 takes a contained wing after its container, so 'wing order' no longer names the order the caller passes. J-A28.34's Part A leaves the hole case to 'the plan rung's choice', which V-MAB2-09 now makes. The signature's comment ('the faces of one overlay of all the rings that no earlier ring contains') leaves out the face's own ring. The kernel's companion to V-MAB2-09.

**Required change.** 1. §3.4 signature becomes: `tileRings(rings: Ring[] /* world lattice rings, counter-clockwise, in the caller's clip order (§2.6 step 4) */): KernelResult<Ring[][]>   // the seed clip (below): per input ring its pieces — the faces of one overlay of all the rings that it contains and no ring before it contains, united — counter-clockwise, none where the rings before it cover it`. 2. §3.4 body: replace 'each face going to the first ring in wing order that contains it' with 'each face going to the first ring in the order passed (§2.6 step 4's clip order) that contains it'; after '…because a seed is one ring.' add '§2.6's clip order puts a contained wing after its container, so the refusal marks a caller's bug (F-PLAN, §5.2).' 3. J-A28.34's Part A: replace 'each face going to the first ring in wing order that contains it (`tileRings`)' with 'each face going to the first ring in the caller's clip order that contains it (`tileRings`)'; replace 'because a seed is one ring and which wing takes the enclosed rooms is the plan rung's choice, not the kernel's' with 'because a seed is one ring; the plan rung's clip order puts a contained wing after its container, which takes the enclosed rooms (§2.6), so the refusal marks a bug'.

#### V-MAB2-15 — minor · conflict · kernel · item 28

**Claim.** §3.4's transientArena `fixed` comment lists 'a stair core's bay, a hearth's chimney stack, a spanned passage's room (item 30), a tower's round room — and, on a re-cut, the rooms §2.6's interior ladder keeps'. §2.6 passes every composer's room as a fixed ring (Composition.rooms; step 4; the FIXED list).

**Required change.** §3.4 transientArena `fixed` comment: replace 'a tower's round room' with 'a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)'.

#### VR2-04 — minor · broken-reference · kernel · item 9

**Claim.** §3.2 (9) credits the square-root scaling to §12.2: 'A = A_target · population ÷ target (the side with its square root; §12.2, item 9)'. After VK1-11, §12.2 only points back to §3.2 (9), so the two point at each other and §12.2 no longer holds what §3.2 (9) cites it for.

**Required change.** §3.2 (9): replace '(the side with its square root; §12.2, item 9)' with '(the side with its square root; item 9; the cap figures: §12.2)'.

### Minor — rendering (§8, §9, §11, §12) (3)

#### VR2-01 — minor · new-problem · rendering · item 30 × 28

**Claim.** §2.6 puts `spans` on EACH base wing whose ring runs along the passage's edge (a stepped front building's quads each), with the span ring per wing and each quad carrying its own heights. §8.5 (2) still builds one mark per passage from the building ('its baseCm column the building's base … its height the eave'), and §8.4's caster likewise. For a stepped front over a passage the count of marks, their rings and their base and eave are undetermined.

**Required change.** §8.5 (2): replace 'the passage's span ring — §2.6's cut of the `Passage` face under the base wing that spans it (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`) — so its upper storeys cover the passage at the city band' with 'one per base wing that spans the passage (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`; a stepped front's quads each), that wing's span ring — §2.6's cut of the `Passage` face under it — so its upper storeys cover the passage at the city band'; and replace 'its `baseCm` column the building's base plus the passage's `headroomCm` and its height the eave' with 'its `baseCm` column the spanning wing's base plus the passage's `headroomCm` and its height that wing's eave'. §8.4 Shadow casters: replace 'a prism from `baseCm` plus the passage's `headroomCm` to the eave over the span ring' with 'a prism from its wing's `baseCm` plus the passage's `headroomCm` to that wing's eave over its span ring'.

#### VR2-02 — minor · partial · rendering · item 28

**Claim.** §8.6 reads 'The tile worker never runs `compose()` or close-up derivation (§8.9)', omitting `plan()`, which §8.9 and §12.7 hand to the derivation pool and which the model-less tile worker cannot run.

**Required change.** §8.6: replace 'never runs `compose()` or close-up derivation (§8.9)' with 'never runs `compose()`, `plan()` or close-up derivation (§8.9)'.

#### VR2-03 — minor · conflict · rendering · item 28

**Claim.** §3.4's seed clip adds one tileRings overlay per storey where wings overlap. §12.7's plan() budget says it 'covers the programme's allocation, opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4)', without the clip.

**Required change.** §12.7 Plan rung: replace 'the count covers the programme's allocation, opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4)' with 'the count covers the programme's allocation, the seed clip where the storey's wings overlap (one `tileRings` overlay), opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4)'.

### Minor — scope (summary, §0, §1, §13–§17, index, Staged) (15)

#### VS2-01 — minor · partial · scope · item 20, 28 (f), 30

**Claim.** §0.2's landing rows miss what round 2 added. Row 20 names "`DossierRef` (§2.8)", but `DossierRef` is declared in §7.1 and §2.8 now states which entity carries `Identity.dossier` (J-A20.22). Row 28 names neither J-A28.46's generation fill in §4.7 nor `Plot.fieldBand` in §2.5 (J-A28.29). Row 30 names `Wing.spans`, but the span is written on `BaseWing.spans` and a composed wing inherits it (J-A30.23).

**Required change.** §0.2 row 20: "`Rejection` in the registry and `DossierRef` (§2.8)" → "`Rejection` in the registry and `Identity.dossier`, a `DossierRef` (§7.1) carried by the entity the element is (§2.8, J-A20.22)". Row 28: after "`RoomProgramRow`, `RoomRuleRow.scope` and the template's `households` in §4.7 S11 and §10.2," insert "the generation fill — households per slot at S10b, `Building.households` clamped to the capacity at S11 and the overflow re-placed inside the district — in §4.7 (J-A28.46), the occupants' band memory `Plot.fieldBand` in §2.5 (J-A28.29),". Row 30: "`Wing.spans` in §2.4 to §2.6" → "`BaseWing.spans`, which a composed wing inherits (J-A30.23), in §2.4 to §2.6".

#### VS2-02 — minor · conflict · scope · item 29, 28

**Claim.** §2.6 joins a basement three ways: `Basement.access` 'core', 'trapdoor' or 'external', with step 3's fallback `trapdoor` core (J-A29.25). T28-3 ('entered by that core or through a trapdoor the class row declares') fails on the fallback core and on every walk-out's outside stair; T29-4 ('a stair or trapdoor at the core') fails on walk-outs. Merges V-MAB2-14 and VK2-07 (apply once). Under V-MAB2-10, `Basement.access` is the field that survives, the row's `basementAccess` being its default.

**Required change.** §13.2 T28-3: replace "and the basement is entered by that core or through a trapdoor the class row declares" with "and the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring (§2.6 step 3; J-A29.25) — or, for a walk-out (`Basement.access` `'external'`), by its outside stair". T29-4: replace "with its storey in `Heights` and a stair or trapdoor at the core" with "with its storey in `Heights` and its access one of §2.6's three — the stair core, a trapdoor or, for a walk-out, an outside stair".

#### VS2-03 — minor · missing · scope · item 20

**Claim.** No T20 bar proves §7.7 item 2's refusal list: a map unassign, a setAttr of use or class, a convert closeUse or mutate, or a conversion that empties or removes the housing building. The unassign and setAttr refusals have had no bar since r0. No bar proves dossier-backed existence across epochs either, which is §5.3's hard dossier row; T20-1 covers only a map delete. Merges VD2-03 (apply once, after VD2-01 and VD2-02); the epoch clause is worded to their widened form.

**Required change.** §13.2: before "(T22-1) the same history from the same seed gives one digest;" insert "(T20-6) by §7.7 item 2, a map `unassign`, a map `setAttr` of the use or class and a hand `convert` `closeUse` of a dossier-backed use each return F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits (the refusal clause); on a B-CITY dossier fixture whose dossier-backed use stands in a declining quarter, a hand `vacate` or `demolish` of the building that houses it returns F-EDIT, and every epoch whose use step, redevelopment, population fall or conversion reaches the use or its building relocates the use first — never closing it, and emptying or removing its building only after it has moved (§4.11's *Dossier content across epochs*) — with §5.3's dossier row holding after every epoch (the epoch clause, from M4; J-A17.01);". §16 M3a exit: after "T20-1, T20-2's dossier-event clause, T20-3 – T20-5," insert " T20-6's refusal clause,". §16 M4 exit: after "T17-2, T17-3, T20-2's epoch clause," insert " T20-6's epoch clause,". §0.2 row 20: "tests T20-1 to T20-5" → "tests T20-1 to T20-6". §15.2 O10 (i): "(§13.2 T20-1 – T20-5, T22-1 – T22-4)" → "(§13.2 T20-1 – T20-6, T22-1 – T22-4)". J-A17.01's index row: "— T17-2, T17-3 and T20-2's epoch clause — run from M4" → "— T17-2, T17-3, T20-2's epoch clause and T20-6's epoch clause — run from M4"; its Part A entry gains a sentence saying T20-6's epoch clause follows the same rule and its refusal clause runs at M3a. J-A20.01's Part A entry: "T20-1 – T20-5" → "T20-1 – T20-6", with the reason (VD2-03, VS2-03).

#### VP2-09 — minor · stale · scope · item 19, 28 (f)

**Claim.** T19-4 ('with no epoch every building houses its template row's households.built') fails wherever §4.7's J-A28.46 clamps the count into [1, capacity] or its overflow pass moves a household. No bar proves J-A28.46's guarantees: no shell holds more than its capacity, and every household is housed or reported. Merges VS2-04 (apply once).

**Required change.** §13.2: replace "(T19-4) with no epoch every building houses its template row's `households.built`." with "(T19-4) with no epoch every residential building houses at least one household and at most its capacity (§2.6's function) — its template row's `households.built` clamped into [1, capacity], except the moves §4.7's overflow pass reports — and every household S2 demanded is housed or reported unplaced by F-SITING (J-A28.46)."

#### VS2-05 — minor · broken-reference · scope · item 24

**Claim.** §4.2 S3 (12) and J-A24.43 cite 'a contract test [that] recomputes the median and fails on a stored value that differs (§13.2)', but portRef occurs 0 times in §13.2. Merges VP2-10 (apply once).

**Required change.** In §13.2's 'Stage contract tests' bullet, after "S8's working block equals S9's committed block (Hausdorff 0; §3.7)." insert "The stored `market.siting` cell `portRef` equals the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails."

#### VP2-11 — minor · conflict · scope · item 31

**Claim.** T31-10 reads 'after a rung-3 event builtBand is the band of the new stock'. §4.11's writer list and J-A31.44 give an amalgamate that builds nothing the builtBand of its anchor member; that event has no new stock. Merges VS2-06 (apply once).

**Required change.** §13.2: replace "(T31-10) after a rung-3 event `builtBand` is the band of the new stock;" with "(T31-10) after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44);".

#### VP2-12 — minor · partial · scope · item 11

**Claim.** J-A11.43's stretch split is new mechanism without a bar. T11-1 checks only that 'tunnel conversions by hand undo exactly'. Nothing proves that a stretch conversion closes only the plots along the stretch, that U1 still holds, or that the undo restores the one record. Merges VS2-07 (apply once, after VP2-04 and VP2-05).

**Required change.** §13.2: replace "(T11-1) tunnel conversions by hand undo exactly;" with "(T11-1) tunnel conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers, access points and block frontages re-pointed — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one record;".

#### VP2-13 — minor · stale · scope · item 12

**Claim.** II.7.4's base list names 'UndergroundRule's depth scale, vacancy share, crowding share and arrangement restriction'. The Staged sewers row still omits the crowding share J-A12.47 made a base field. Merges VS2-08 (apply once).

**Required change.** In the Staged sewers-and-islands row, replace "`UndergroundRule`'s depth scale, vacancy share and arrangement restriction" with "`UndergroundRule`'s depth scale, vacancy share, crowding share and arrangement restriction".

#### VK2-08 — minor · conflict · scope · item 28

**Claim.** §13.1 asserts, for a rotated T clipped by one overlay, 'every crossing vertex on both rings, within the hot pixel of the bar's straight side'. §3.4 gives no such bound; J-A28.34's Part A records drift in 1.3 % of cases (worst 1.06 cm), and the round-1 receipt measures 265 of 20 000. One overlay makes the drift harmless by sharing the vertex, not by bounding it, so the fixture would fail on about 1 rotated T in 75. Merges VS2-09 (apply once).

**Required change.** §13.1: replace 'clipped to tile as the faces of one overlay (§3.4's seed clip) — every crossing vertex on both rings, within the hot pixel of the bar's straight side, and the seeds accepted' with 'clipped to tile as the faces of one overlay (§3.4's seed clip) — every crossing vertex a vertex of both rings, the joint shared vertex for vertex, and the seeds accepted'.

#### VK2-09 — minor · missing · scope · item 28

**Claim.** tileRings is a new listed service with three outcomes stated in §3.4 — no piece, two pieces, a refused holed piece — and no fixture exercises them; B-FUZZ's differential line covers 'booleans and buffers' only, although §3.4 gives every listed op fuzz tests. VK2-02's edge on three input sides has no fixture either. Merges VS2-10 (apply once; part (3) after VK2-02).

**Required change.** §13.1: (1) replace 'on booleans and buffers, split by attraction (§3.7)' with 'on booleans, `tileRings` (each ring's pieces against the oracle's difference of that ring with the union of the rings before it) and buffers, split by attraction (§3.7)'; (2) in the transient-arena clause, after '…and the seeds accepted;' (as VK2-08 leaves it) insert '`tileRings` on a ring the earlier rings cover (no piece), on one they cut in two (two pieces, each simple and counter-clockwise) and on an earlier ring wholly inside a later one (refused, `E_DEGENERATE`, detail `overlap`, naming a vertex of the hole);'; (3) in the re-cut clause, after '(the input sides as the arena's routes, §3.4)' insert '; a new wall ending on a kept room's side that lies along a joint, its end within the hot pixel of each of the three input sides it lies on'.

#### VS2-11 — minor · stale · scope · item 9

**Claim.** §1.1's RungProfile comment ('side scales with √(population ÷ target) (§3.2, §12.2)') restates §3.2 (9)'s rule, the frame's home (CANON-C03), and cites §12.2, which since round 2 holds only a pointer and the cap figures. Merges VK2-10 and VR2-05 (apply once).

**Required change.** §1.1 `RungProfile`: replace '// side scales with √(population ÷ target) (§3.2, §12.2)' with '// the frame scales with the requested population (§3.2 (9))'.

#### VR2-06 — minor · partial · scope · item 30 (d)

**Claim.** Round 2 added the bridge reply `export.refused { error, message }` (§11.3; J-A30.85), but T30-5 tests only the API's E_KNOWLEDGE_TIER refusal, and §11.3's bridge test covers convergence only, so the new message has no acceptance bar. Merges VS2-12 (apply once).

**Required change.** §13.2 T30-5: after 'fails with `E_KNOWLEDGE_TIER` and succeeds under `secret`;' insert 'a bridged `export.request` for `.plat` to a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`;'.

#### VAL-03 — minor · conflict · scope · item 31, 28 (f)

**Claim.** NEW (validator), the test-side twin of VD2-04. T31-9 requires that no rung-1 or rung-2 event 're-cuts a shell' and matches every change of a building's shell to a lifecycle event. T31-11 requires a rich → poor → rich run to leave 'rings and shells byte-identical'. But rung 1's relet re-cuts a stored plan inside the event, and that re-cut adds composition-role vertices to the wing rings (J-P48 (1), §2.6); they persist while the composition is stored. §2.6, §5.3's interior-ladder row and T28-14 read the shell without them; T31-9 and T31-11 do not, so both fail on a legal history with a stored plan.

**Required change.** §13.2: in T31-9, after 'every change of its ring or its buildings' shells' insert ' (read, as §5.3's epoch row reads them, without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1))'; in T31-11, replace 'leaves rings and shells byte-identical' with 'leaves rings and shells byte-identical, a stored plan's shell read without the `composition`-role vertices its re-cuts add (§2.6, J-P48 (1))'.

#### VAL-04 — minor · conflict · scope · item 31

**Claim.** NEW (validator). The one-page summary says '… geometry only on vacancy, ruin or redevelopment — and a plot's geometry never reads poorer than the middle band once it was built to that band or above (§4.11)'. The 'never' is absolute, but a rung-3 event resets builtBand (§4.11's 'What writes builtBand'), after which the new stock sets a new floor: the owner's own words are 'forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts things entirely'. The summary must stay true (validator duty (3)).

**Required change.** The one-page summary, the paragraph 'The owner's later rules (amendments b …)': replace '— and a plot's geometry never reads poorer than the middle band once it was built to that band or above (§4.11)' with '— and until one of those a plot's geometry never reads poorer than the middle band once it was built to that band or above (§4.11)'.

#### VAL-05 — minor · conflict · scope · item 30

**Claim.** NEW (validator), the test side of VAL-02. T30-2 ('the hidden share per district lies within its band's target ± 0.03') and §13.7's item-30 row read a per-band target, but §4.6 scales the weights by rung and density, and a district holds several bands. After VAL-02 the target is §4.6's scaled target at the district's mean value.

**Required change.** §13.2 T30-2: replace 'the hidden share per district lies within its band's target ± 0.03 (§13.7)' with 'the hidden share per district lies within its target ± 0.03 — §4.6's band rows read at the district's mean prosperity value and scaled by its rung and density factors (§13.7)'. §13.7's item-30 row: replace 'per district within its band's target ± 0.03 (§13.2 T30-2)' with 'per district within its §4.6 target (the band rows at the district's mean value, scaled by rung and density) ± 0.03 (§13.2 T30-2)'.

## 7 Sizes, before the pass and now

| file | before amendments b (archive, 2026-09-26) | now (after repair round 2) |
|---|---|---|
| `docs/ARCHITECTURE.md` | 9 667 lines, 1 121 558 bytes, 140 headings, sha256 `1dbfd9d4…` | 12 942 lines, 1 599 297 bytes, 145 headings, sha256 `831efd42…` |
| `docs/ARCHITECTURE-RATIONALE.md` | 1 857 lines, 279 900 bytes, sha256 `5f80e197…` | 2 050 lines, 440 261 bytes, sha256 `f2c2a1ca…` |
| judgment index rows / Part A entries | 276 / 276 | 469 / 469 (193 `J-A`) |

The pass so far: assemble-r0 applied 131 blocks, assemble-r1 94 and assemble-r2 58 (283 in all), with no block skipped.
The verify rounds found 230 issues after r0, 85 after r1 and 71 after r2. This validation leaves 53 (3 major).

## 8 For the manager — what this lane did not do, and what comes next

* **A repair round** on §6's 53 issues (owners: model 8, pipeline 9, determinism 12, kernel 6, rendering 3, scope 15),
  then assembly, then a re-validation of the repaired sections. No issue needs the owner.
* **Outside the architecture**, item 28 (d) asks that `docs/DEFINITION.md` gain the plan rung "after this pass lands".
  That is the manager's step once the pass closes; it is not a design issue and is not in §6.
* **Item 32** (provenance of the code readings) is the next pass's by the owner's own instruction; §0.2 says so.
* **SUMMARY.md** for the owner is written when a validation raises no issue; it is not written now.

## 9 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed on disk).**
* The owner's words, read whole in `docs/AMENDMENTS-2026-09-25b.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md`.
* Item 28 (f)'s full message, read in `route.md`'s item 28 (f) (a).
* Every carried issue's old text is still present in the document (`scratchpad/val/needles.py`, 71 of 71).
* VD2-15's premise is false: II.7.4 l. 12148 already calls `UndergroundRule` an editable rule record.
* §17.3 and §17.4 are byte-identical to the pre-pass archive, and §17.1 differs in three hunks (a Python section diff).
* 193 `J-A` index rows match 193 Part A entries, each "Chose … because", every item 8–31 covered (script).
* The deferral probes, and §16's milestone and line sums (166–220; 152–202 + 14–18).
* Every anchor this validation's changes quote occurs exactly once where it is quoted (a normalised-text script).
* The document and rationale hashes, unchanged from start to end of this lane (`831efd42…`, `f2c2a1ca…`).

**PLAUSIBLE (reasoning only).**
* The owner-fidelity verdicts of §2: a reading of the owner's words against each mechanism, not a test.
* VD2-01 and VD2-02's enumeration of every epoch path that can unhouse a dossier-backed use: the text of each path is
  read, but the list's completeness is a judgment.
* VAL-02 and VAL-05's claim that T30-2 fails on a correct law at TOWN or on dense districts: the scaling is read in the
  text; the failure is inferred, not measured.
* V-MAB2-09's container-after clip order and VP2-04's widening rule, both as their authors say.
* V-MAB2-10's derivation of the basement's access, and VP2-01's dropping of an unfillable residential slot.
* That no further coherence defect remains. This lane read the sections §2 of this report names, whole; for the other
  changed sections it relied on the six verify-r2 seats, who read every changed section whole, and on the targeted
  probes above.


## Fable review (2026-09-27) — A-amendments-b/validate

Reviewer: Fable (claude-fable-5-1), lane fable-review/main/integration (`docs/fable-review/main/integration.md`).
**Verdict: CONFIRMED.** Every owner-fidelity verdict of §2 re-read against the owner's items 8–31, 28 (f) and the live
design; the widened VD2-01 / VD2-02 ruling stands (a dossier-backed use relocates and never closes inside an epoch — the
owner's "close down here but reopen over there" is a relocation, and item 20 (h) makes the dossier the sole immutable
truth; item 17 (d)'s "or close" keeps its meaning for the map's own assignments); VAL-02's rung-and-density scaling honours
item 30 (b)'s "city and metropolis bands higher than town"; V-MAB2-01's no-refusal re-homing was PLAUSIBLE and the closing
round refined it (V-MAB3-01). Counts re-derived: 71 − 1 withdrawn − 22 merged + 5 new = 53 = 3 + 7 + 8 + 11 + 6 + 3 + 15.
No correction.
