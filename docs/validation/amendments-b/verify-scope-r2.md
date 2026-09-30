# Verify — SCOPE part after amendments-b repair round 2 (lane amendments-b/verify-scope-r2)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-scope-r2).

PROGRESS
- STEP inputs-read: done (route.json scope rows; verify-scope-r1.md whole; repair-scope-r2-report.md whole; assemble-r2.md whole with its §8 open notes; the scope-owned issues of verify-determinism-r2, verify-model-r2, verify-pipeline-r2, verify-kernel-r2 and verify-rendering-r2 (all five LANDED or COMPLETE by 09:10); the cross-part notes to scope in the five other repair-r2 reports; a word diff of the part against docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md (38 hunks); §0.2, §1.4, §13.1, §13.2, §13.9, §14, §16, Staged and the index paragraph read whole in the live doc sha256 831efd42…; the homes they cite: §3.4 seed clip and routes, §4.2 S3 (12), §4.7 households per building, §4.9 farm modes, §5.3 epoch row, §7.7 lapse, §9.2/§11.1/§11.2/§11.3 knowledge and bridge, §2.6 basement access and capacity, II.6 stretch split, II.7.4 base list)
- STEP r1-issues-rechecked: done (§3, §4)
- STEP items-verified (8–31, 28 (f)): done (§2)
- STEP checks over the repaired subsections: done (§5)
- STEP issues (VS2-nn): done (§6, 12 issues)
- STEP CONFIRMED / PLAUSIBLE: done (§7)
- STEP queue row + LANDED: done

Lane `amendments-b/verify-scope-r2`, 2026-09-27. An Opus verifier seat. The document was unchanged from the first read to
the last (sha256 `831efd42…`, the assemble-r2 install), and so was the rationale file (`f2c2a1ca…`, the hash
assemble-r2 installed and the kernel verifier's 08:56 restore re-established).

## 1 Outcome

Repair round 2 fixed every issue routed to the scope part: VS1-01 – VS1-11 and the other seats' VK1-12, VK1-13, VR1-07,
VP1-08, V-MAB1-11 and VD1-18 are FIXED in the installed text. The index paragraph's digit rule now fits all 193 `J-A`
rows. The T-id map is clean: 88 ids, none cited undefined, and each id scheduled at exactly one milestone except the
clause splits (T20-2 at M3a and M4, T23-1 at M1 and M2b) and the stage-3 group. Every item routed here stays
**PRESENT** (25 of 25, counting 28 (f) apart).

**12 issues remain, all minor, with no blocker or major; scope owns all 12.**
* **Two are this seat's own** (VS2-01, VS2-02):
  * §0.2 rows 20, 28 and 30 do not name the fields and the fill that round 2 added (`Identity.dossier`'s carrier,
    J-A28.46's generation fill, `Plot.fieldBand`, `BaseWing.spans`).
  * T28-3 and T29-4 admit no walk-out basement (`Basement.access` `'external'`). This widens V-MAB2-14 = VK2-07, the
    trapdoor-core finding.
* **Ten are the other r2 verifiers' findings against this part**, confirmed here and restated once for the repair seat
  (VS2-03 – VS2-12):
  * VD2-03, a bar for dossier existence across epochs (T20-6), which this seat widens to the refusal list and schedules;
  * VP2-09 (T19-4), VP2-10 (`portRef`'s contract test), VP2-11 (T31-10), VP2-12 (T11-1) and VP2-13 (the Staged sewers
    row);
  * VK2-08 (§13.1's rotated-T bound), VK2-09 (`tileRings`' fixtures, the holed piece among them);
  * VK2-10 = VR2-05 (§1.1's frame comment) and VR2-06 (T30-5's `export.refused`).

**Nothing needs an owner ruling.** VS2-03 needs its repair applied after VD2-01 (determinism) and VD2-02 (pipeline),
VS2-07 after VP2-04 (pipeline), and VS2-10 (3) after VK2-02 (kernel), each with the final wording of its dependency.

## 2 Items routed to scope — PRESENT / PARTIAL / MISSING (after repair round 2)

The r0 and r1 verdicts and quotes stand for the items r2 did not touch (verify-scope-r0.md §2, verify-scope-r1.md §2).
This table re-checks the repaired text and the items a round-2 change elsewhere reaches.

| item | r1 | r2 | the repaired text, quoted (live line) |
|---|---|---|---|
| 9 (home) | PRESENT | PRESENT (VS2-11) | §0.2 row 9 and §1.1 unchanged (l. 140, 195); §1.1's `RungProfile` comment still cites §12.2 (VS2-11) |
| 11 | PRESENT | PRESENT (VS2-07) | row 11 unchanged (l. 142); T11-1 "tunnel conversions by hand undo exactly" (l. 10223) — J-A11.43's split has no bar |
| 12 | PRESENT | PRESENT (VS2-08) | row 12 "`drawTunnel` and `placeAccess` by hand in §7.1 and §7.4 (J-A12.71)" (l. 143); §13.2 enumeration "`drawTunnel`, `placeAccess`" (l. 10199); Staged sewers row "the underground tools `drawTunnel` and `placeAccess` (J-A12.71)" and "the edits of §7.1 and §7.4" (l. 12916); M4 "the tunnel and island conversion kinds with the underground tools `drawTunnel` and `placeAccess` (§7.1)" (l. 11286) |
| 17 | PRESENT | PRESENT | M3a exit "T17-1" (l. 11284); M4 exit "T17-2, T17-3, T20-2's epoch clause" (l. 11286); J-A17.01 (index l. 12898, Part A l. 515) |
| 19 | PRESENT | PRESENT (VS2-04) | T19-4 "with no epoch every building houses its template row's `households.built`" (l. 10255–10256) is stale against J-A28.46 |
| 20 | PRESENT | PRESENT (VS2-03) | T20-2 "the rejection lapses at a dossier event touching its block (the dossier-event clause) and at the first epoch whose population target differs from the one it recorded (the epoch clause, from M4)" (l. 10258–10260), equal to §7.7 item 3 (l. 7332–7336); no bar proves §7.7 item 2's refusal list or dossier existence across epochs |
| 21 (home) | PRESENT | PRESENT | unchanged (§17.1, §17.3, D-22; row 21 l. 152) |
| 24 | PRESENT | PRESENT (VS2-05) | row 24 "a market's `rank` edited by `setAttr` in §7.1 (J-A24.71)" (l. 155); §4.2 S3 (12) cites a `portRef` contract test in §13.2 that §13.2 lacks |
| 26 | PRESENT | PRESENT | §1.4 "Criterion: O14 (a)–(h)" (l. 302); T26-2 (l. 10276–10281), matching §4.9's `FarmModeRow` modes (l. 4798–4809) |
| 28 | PRESENT | PRESENT (VS2-01, VS2-09, VS2-10) | §13.1 "*The transient arena* (the composition rungs', §3.4)", the rotated-T seed-clip clause and the four-times-split kept room (l. 10030–10043); §14 "the composition rungs' transient arenas (a stage-3 `compose()` and the plan rung's storeys …)" (l. 10845–10846, 10937) |
| 28 (f) | PRESENT | PRESENT (VS2-01, VS2-04) | T28-13 "every household of the building (`Building.households`, §2.6)" (l. 10317–10319); T28-14 "a stored plan's rings read with the `composition`-role vertices its re-cut adds removed" (l. 10320–10322); J-A28.01 Part A (l. 474) |
| 29 | PRESENT | PRESENT (VS2-02) | §1.4 "Criterion: O17 (a)–(j)" (l. 300); T28-3 and T29-4 read no walk-out (VS2-02) |
| 30 | PRESENT | PRESENT (VS2-01, VS2-12) | T30-5 "`query` of every kind (`gazetteer`, `people`, `whereIs`, `relations`, `hit`, `inView`) and hover … a view-bound kind … at every band coarser than the building band … `export` of `.plat` and of a permalink under a `public` key fails with `E_KNOWLEDGE_TIER`" (l. 10343–10349), equal to §11.2 (l. 9243–9250) and §11.1 (l. 9102–9113) |
| 31 | PRESENT | PRESENT (VS2-06) | T31-9 "across any run of epochs, no rung-1 or rung-2 event changes a plot's frontage edge … (§5.3's epoch row: a rung-3 event, rung 1's yard buildings, rung 2's back court, a designation or renovation mutation, a conversion — `wallToWay` and `contractWall` among them — or the growth step's regrowth builds, `demolish` and corridor re-cuts)" (l. 10359–10364), the list equal to §5.3's row (l. 5618) |

Items 8, 10, 13–16, 18, 22, 23, 25 and 27: PRESENT, unchanged by round 2 in this part (r1 §2).

## 3 Round 1's issues after repair round 2

Every issue round 1 raised against this part is FIXED. A word diff of the part against the pre-repair archive
(`docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md`) has 38 hunks. Every hunk is either one the repair
report lists or an index row that another seat restated, and the rest of the part is byte-identical.

| issue | verdict | where now (live line) |
|---|---|---|
| VS1-01 | FIXED | T20-2 split by clause (l. 10258–10260); M3a exit "T17-1, … T20-1, T20-2's dossier-event clause, T20-3 – T20-5" (l. 11284); M4 exit "T17-2, T17-3, T20-2's epoch clause" (l. 11286); J-A17.01 index l. 12898, Part A l. 515; J-A20.01 Part A "T20-2's epoch clause from M4 … (verify-scope-r1's VS1-01; J-A17.01)" (l. 468) |
| VS1-02 | FIXED | row 12 (l. 143), row 24 (l. 155), §13.2 enumeration (l. 10199), §14 `@plat/edit` package line (l. 10881) and comment (l. 10967), Staged sewers row hooks and where columns (l. 12916), M4 content (l. 11286) |
| VS1-03 | FIXED | §1.4 "O17 (a)–(j)" (l. 300), "O14 (a)–(h)" (l. 302) |
| VS1-04 | FIXED | index paragraph "5, 6 or 7 determinism (§5–§7)" (l. 12419); the digit script finds 0 mismatches over 193 `J-A` rows (J-A28.02's "the summary" is the scope part) |
| VS1-05 | FIXED | §13.9 (4) "the granularity and greenery rows (§4.7, §4.9)" (l. 10821–10822) |
| VS1-06 | FIXED | §14 "(§2.5–§2.7, §3.4, §4.8, §10.4, II.1, II.6, II.7.4)" (l. 10900–10901) |
| VS1-07 | FIXED | T28-13 (l. 10317–10319); J-A28.01 Part A (l. 474) records the reason |
| VS1-08 (determinism) | FIXED | §5.2 F-PLAN test cell (l. 5586), as verify-determinism-r2 l. 108 records |
| VS1-09 = VD1-18 | FIXED | T31-9 (l. 10359–10364); its parenthesis equals §5.3's epoch row (l. 5618) clause for clause: rung-3 event; rung 1's yard buildings; rung 2's back court; designation or renovation mutation; any other conversion with `wallToWay` and `contractWall` named; the growth step's regrowth builds, `demolish` and corridor re-cuts |
| VS1-10 = V-MAB1-11 | FIXED | T28-14 (l. 10320–10322) |
| VS1-11 = VP1-08 | FIXED | T26-2 (l. 10276–10281); each clause matches §4.9 (l. 4798–4813): `perimeter` "no farmsteads — the farm households live in the settlement"; `rivers` "within the row's `riverBandM` … where the frame has no river the mode reads as `perimeter` … the band's shortfall is reported"; the arid row "sets `rivers`" |
| VK1-12 | FIXED | §14 l. 10845–10846 and l. 10937; §13.1 l. 10030; §3.4's own wording (l. 2581) "The composition rungs — a stage-3 `compose()` and the plan's storeys" |
| VK1-13 | FIXED, with a residue | §13.1 l. 10030–10043 names the seed clip and the input sides as routes; the rotated-T clause's hot-pixel bound over-claims (VK2-08, restated as VS2-09) |
| VR1-07 | FIXED | T30-5 (l. 10343–10349), clause by clause against §11.2 (l. 9243–9250) and §11.1 (l. 9102–9113); the repair's departure (view-bound readers admit a `secret` place at the building band) is §11.2's own rule, "A view-bound reader (`hit`, `inView`, hover) admits at its view's band — a secret place at the building band" |

The sibling verifiers reached the same verdicts on the issues they raised: verify-determinism-r2 (VD1-18, VS1-08),
verify-model-r2 (V-MAB1-11), verify-pipeline-r2 (VP1-08), verify-kernel-r2 (VK1-12; VK1-13 with VK2-08) and
verify-rendering-r2 (VR1-07).

## 4 Other verifiers' r2 issues on this part, and the cross-part notes

| id (report) | subject | this seat |
|---|---|---|
| VD2-03 (determinism) | no bar for dossier existence across epochs | confirmed; widened to §7.7 item 2's refusal list, which has had no bar since r0 (no T20 bar exercises `unassign`, `setAttr` of use or class, or `convert` `closeUse`), and scheduled; restated as VS2-03 |
| V-MAB2-14 (model) = VK2-07 (kernel) | T28-3's trapdoor ignores step 3's fallback `trapdoor` core | confirmed at §2.6 step 3 (l. 1366–1372) and `Basement.access` (l. 1019); widened to the walk-out; restated as VS2-02 |
| VP2-09 (pipeline) | T19-4 vs §4.7's clamp and overflow pass (J-A28.46) | confirmed at §4.7 l. 4642–4655; restated as VS2-04 |
| VP2-10 (pipeline) | `portRef`'s contract test cited by §4.2 S3 (12) but absent from §13.2 | confirmed: §4.2 l. 3697–3700 "a contract test recomputes the median and fails on a stored value that differs (§13.2)"; `portRef` occurs 0 times in §13.2; restated as VS2-05 |
| VP2-11 (pipeline) | T31-10 vs an `amalgamate` that builds nothing | confirmed at §4.11 l. 5057–5059 and J-A31.44 (l. 12805); restated as VS2-06 |
| VP2-12 (pipeline) | no bar for J-A11.43's stretch split | confirmed at II.6 l. 11860–11867; restated as VS2-07 (after VP2-04) |
| VP2-13 (pipeline) | Staged sewers row omits the crowding share | confirmed: II.7.4 l. 12158 "vacancy share, crowding share and arrangement restriction"; restated as VS2-08 |
| VK2-08 (kernel) | §13.1's rotated-T clause bounds the crossing vertex within the hot pixel, which §3.4 does not give | confirmed against §3.4 l. 2610–2618 (the overlay shares every crossing vertex; it bounds none) and J-A28.34's Part A (l. 487: the drift "1.3 % of cases, worst 1.06 cm"); restated as VS2-09 |
| VK2-09 (kernel) | no fixture for `tileRings`' three outcomes, the holed-piece refusal among them | confirmed: §3.4 l. 2613–2618 states them and §13.1 exercises only the two-wing clip; this seat found the holed-piece gap independently; restated as VS2-10 |
| VK2-10 (kernel) = VR2-05 (rendering) | §1.1's frame comment cites §12.2 | confirmed: §12.2 l. 9454 now holds a pointer "(§3.2 (9))"; restated once as VS2-11, with VR2-05's pointer-only wording |
| VR2-06 (rendering) | T30-5 does not test §11.3's new `export.refused` | confirmed at §11.3 l. 9302–9303; restated as VS2-12 |

**The cross-part notes addressed to scope in repair round 2** were checked against the text:
* **Pipeline §4.** It asked for T19-4's qualifier and the `portRef` test, which are still open (VS2-04, VS2-05).
* **Model "Cross-part follow-ups".** T28-14 is reflected. T28-3's trapdoor is still open (VS2-02).
* **Determinism "Cross-part dependencies".** T31-9, T28-13 and T28-14 are reflected.
* **Kernel "Cross-part notes" (4).** It says §13.1's "the input sides as routes" and "clipped to tile as the faces of one
  overlay" match §3.4, and they do. It also says "B-FUZZ treats `tileRings` as a boolean case", which §13.1 does not
  state (VS2-10 (1)).
* **Rendering "Cross-part observations".** The §1.1 comment is still open (VS2-11). The permalink clause in T30-5 is
  reflected.
* **assemble-r2 §8.** Notes 2 and 6 are this part's (VS2-04, VS2-05, VS2-02), and so is note 7 (VS2-11). Notes 1, 3, 4, 5
  and 8 belong to the determinism, model and kernel parts, and their verifiers carry them (VD2-08, VP2-08, VD2-05,
  VD2-09 / VK2-05, V-MAB2 series).

## 5 The checks, over the repaired subsections

* **SINGLE-SOURCE.** Each repaired sentence states its mechanism once and points to its home:
  * T20-2 and T31-9 are tests of §7.7's lapse rule and §5.3's epoch row. They quote their homes' conditions as the
    test's inputs (canon R9), not as second rules.
  * J-A17.01 is stated once, in §16's exits, and its index row points there.
  * §0.2's new clauses are pointers (row 12 to §7.1 and §7.4; row 24 to §7.1).

  No duplicate was found in the part.
* **STALE.** The probes for the owner's list return nothing in the part: lots as buildings (only in MFCG's column of
  §1.4 and the summary's "instead of lots painted as buildings"), binary wealth, size fixed by tier, one central market,
  the map editing the dossier, a licence default the owner did not rule (§17.3 and D-22 are the owner's "private for
  now", J-A21.01), and terrain and water that never change. The stale text round 2 left is this:
  * T19-4's unqualified household count (VS2-04);
  * T31-10's "the band of the new stock" for an `amalgamate` that builds nothing (VS2-06);
  * row 30's `Wing.spans` (VS2-01);
  * §1.1's §12.2 citation (VS2-11).
* **CROSS-PART.**
  * New mechanisms other seats added in round 2 have no bar here: the stretch split (VS2-07), the `portRef` contract
    test (VS2-05), `tileRings`' outcomes (VS2-10), `export.refused` (VS2-12), and the refusal list with dossier
    existence across epochs (VS2-03).
  * Two bars read their homes wrongly: T28-3 and T29-4's basement access (VS2-02) and §13.1's rotated-T bound (VS2-09).
  * §0.2's rows 20, 28 and 30 miss round 2's fields (VS2-01).
  * The Staged sewers row lacks the crowding share (VS2-08).
* **DEFERRAL-WORDING.** None in the added text. Its "reopened", "opening" and "every later shell change" are temporal or
  mechanical. There is no TBD, open question or unresolved choice.
* **BROKEN-REFERENCE.**
  * `refs.py` on the live document found 139 heading keys, 35 D ids, 469 J ids and 2 broken references. Both are the
    pre-existing external citations (l. 2679 `os-geometry.md` §2.1.4, l. 9123 RFC 7946 §3.1.6), and neither is in this
    part.
  * The T-id script found 88 ids defined in §13.2 and 0 cited undefined.
  * §1.1's "(§3.2, §12.2)" resolves, but it points at a pointer (VS2-11).
* **NEW-PROBLEM.** None from this part's own repair. The repair's T30-5 departure from VR1-07's text is §11.2's own
  rule, and J-A17.01's split is consistent with §1.5, D-25 and T31-3's M4 placement.
* **Document checks** (`python3 docs/validation/bench/doc_checks.py --sections "The whole design,0,1,13,14,15,16,17,
  Delegated decisions,Judgment calls,Staged,Appendix A"` with `docs/validation/doc-checks-allow.tsv`, run on the live
  document): exit 0. The counts are C1 5 / 0 unreviewed, C2 0 / 0, C3 248 / 0, C4 3 / 0, S1 0 / 0 and S2 0 / 0, over
  9 626 JSON files and 911 940 corpus 3-grams (the corpus of assemble-r2's runs). This lane changed no design text.

## 6 Issues (VS2-nn)

Every quoted old string below occurs exactly once in `docs/ARCHITECTURE.md` (whitespace normalised; scratchpad
`vs2/counts.py`).

### VS2-01 — minor · partial · scope · items 20, 28 (f), 30 — §0.2's landing rows miss round 2's fields and fill
**Claim.** §0.2's rows name "the sections that carry a pointer, a hook field or one line of rule" (l. 131–133). Round 2
added fields and a stage mechanism that three rows do not name:
* **Row 20** (l. 151) reads "`Rejection` in the registry and `DossierRef` (§2.8)". `DossierRef` is declared in §7.1
  (l. 6349). §2.8 now states which entity carries `Identity.dossier` (l. 1643; J-A20.22).
* **Row 28** (l. 159) names "the template's `households` in §4.7 S11". It does not name the generation fill that J-A28.46
  splits between S10b and S11 with an overflow pass (§4.7 l. 4642–4658), or `Plot.fieldBand`, the occupants' band
  memory in §2.5 (l. 866; J-A28.29).
* **Row 30** (l. 161) names "`Wing.spans`". The span is now written on the base wing (`BaseWing.spans`, l. 959), and a
  composed wing inherits it (l. 987; J-A30.23).

**Required change (scope, §0.2).**
* Row 20: "`Rejection` in the registry and `DossierRef` (§2.8)" → "`Rejection` in the registry and `Identity.dossier`, a
  `DossierRef` (§7.1) carried by the entity the element is (§2.8, J-A20.22)".
* Row 28: after "`RoomProgramRow`, `RoomRuleRow.scope` and the template's `households` in §4.7 S11 and §10.2," insert
  "the generation fill — households per slot at S10b, `Building.households` clamped to the capacity at S11 and the
  overflow re-placed inside the district — in §4.7 (J-A28.46), the occupants' band memory `Plot.fieldBand` in §2.5
  (J-A28.29),".
* Row 30: "`Wing.spans` in §2.4 to §2.6" → "`BaseWing.spans`, which a composed wing inherits (J-A30.23), in §2.4 to
  §2.6".

### VS2-02 — minor · conflict · scope · items 29, 28 — T28-3 and T29-4 admit neither step 3's trapdoor core nor a walk-out (= V-MAB2-14 = VK2-07, widened; apply once)
**Claim.** §2.6 joins a basement in three ways: "`access: 'core'|'trapdoor'|'external'` … the stair core — where no bay
of the core fits inside the ring, a trapdoor core the plan reports (the plan rung, step 3) —, a trapdoor, or an outside
stair (a walk-out)" (l. 1019; step 3, l. 1366–1372; J-A29.25). Two bars fail on correct buildings:
* **T28-3** (l. 10296–10297) reads "the basement is entered by that core or through a trapdoor the class row declares".
  It fails on step 3's fallback `trapdoor` core, which no class row declares (V-MAB2-14, VK2-07). It also fails on
  every walk-out, whose outside stair is neither the core nor a trapdoor.
* **T29-4** (l. 10334–10335) reads "with its storey in `Heights` and a stair or trapdoor at the core". It fails on the
  same walk-outs.

The walk-out half predates round 2, and r0 and r1 missed it. It sits in the same sentence as the round-2 finding, so
one repair closes both.

**Required change (scope, §13.2).**
* T28-3: "and the basement is entered by that core or through a trapdoor the class row declares" → "and the basement is
  entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports
  where no bay of the core fits the basement ring (§2.6 step 3; J-A29.25) — or, for a walk-out (`Basement.access`
  `'external'`), by its outside stair". If V-MAB2-10's repair retires one of `Basement.access` and
  `RoomProgramRow.basementAccess`, name the surviving field.
* T29-4: "with its storey in `Heights` and a stair or trapdoor at the core" → "with its storey in `Heights` and its
  access one of §2.6's three — the stair core, a trapdoor or, for a walk-out, an outside stair".

### VS2-03 — minor · missing · scope · item 20 — no bar proves §7.7 item 2's refusal list or dossier existence across epochs (= VD2-03, widened; apply after VD2-01 and VD2-02)
**Claim.** §7.7 item 2 (l. 7313–7324) refuses a map event that would close, remove or re-designate a dossier-backed
element. The refused events are an `unassign`, a `setAttr` of its use or class, a `convert` `closeUse` or `mutate`,
and a conversion that empties or removes its building. §5.3's dossier row makes the element's existence hard.

No T20 bar exercises either rule:
* T20-1 covers a map delete.
* T20-2 covers the lapse, T20-3 positive placement, T20-4 filler and T20-5 the door.

This has been true since r0 for the `unassign` and `setAttr` refusals. VD2-03 found the epoch half, which VD2-01 and
VD2-02 are closing: the use step, a redevelopment and step (c) must relocate a dossier-backed use, never close it.

**Required change (scope).**
* §13.2: before "(T22-1) the same history from the same seed gives one digest;" insert "(T20-6) by §7.7 item 2, a map
  `unassign`, a map `setAttr` of the use or class and a hand `convert` `closeUse` of a dossier-backed use each return
  F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits (the refusal
  clause); on a B-CITY dossier fixture
  whose dossier-backed use stands in a declining quarter, a hand `vacate` or `demolish` of the building that houses it
  returns F-EDIT, and every epoch whose use step, redevelopment or population fall reaches the use relocates it — never
  closing it, and emptying or removing its building only after it has moved (§4.11) — with §5.3's dossier row holding
  after every epoch (the epoch clause, from M4; J-A17.01);". Word the epoch clause as VD2-01's §7.7 sentence and
  VD2-02's §4.11 steps finally read.
* §16 M3a exit: "T20-1, T20-2's dossier-event clause, T20-3 – T20-5," → "T20-1, T20-2's dossier-event clause, T20-3 –
  T20-5, T20-6's refusal clause,".
* §16 M4 exit: "T17-2, T17-3, T20-2's epoch clause," → "T17-2, T17-3, T20-2's epoch clause, T20-6's epoch clause,".
* §0.2 row 20: "tests T20-1 to T20-5" → "tests T20-1 to T20-6".
* §15.2 O10 (i): "(§13.2 T20-1 – T20-5, T22-1 – T22-4)" → "(§13.2 T20-1 – T20-6, T22-1 – T22-4)".
* J-A17.01:
  * Index row: "— T17-2, T17-3 and T20-2's epoch clause — run from M4" → "— T17-2, T17-3, T20-2's epoch clause and
    T20-6's epoch clause — run from M4".
  * Part A entry: add "T20-6's epoch clause follows the same rule, and its refusal clause runs at M3a with the dossier
    contract (verify-scope-r2's VS2-03)".
* J-A20.01's Part A entry: "T20-1 – T20-5 and T22-1 – T22-4" → "T20-1 – T20-6 and T22-1 – T22-4". Add "T20-6 proving
  §7.7 item 2's refusal list and dossier existence across epochs (repair round 3, after verify-determinism-r2's VD2-03)".

### VS2-04 — minor · stale · scope · items 19, 28 (f) — T19-4's household count ignores §4.7's clamp and overflow pass (= VP2-09; apply once)
**Claim.** T19-4 (l. 10255–10256) reads "with no epoch every building houses its template row's `households.built`". §4.7
(l. 4642–4654; J-A28.46) clamps that count into [1, capacity] and re-places the overflow in the district, else reports it
as F-SITING. So the bar fails wherever the clamp acts, and nothing proves J-A28.46's own guarantees.

**Required change (scope, VP2-09's text).** "(T19-4) with no epoch every building houses its template row's
`households.built`." → "(T19-4) with no epoch every residential building houses at least one household and at most its
capacity (§2.6's function) — its template row's `households.built` clamped into [1, capacity], except the moves §4.7's
overflow pass reports — and every household S2 demanded is housed or reported unplaced by F-SITING (J-A28.46)."

### VS2-05 — minor · broken-reference · scope · item 24 — `portRef`'s contract test is cited in §13.2 but not stated there (= VP2-10; apply once)
**Claim.** §4.2 S3 (12) (l. 3697–3700) says "a contract test recomputes the median and fails on a stored value that
differs (§13.2)", and J-A24.43 says the same. `portRef` occurs 0 times in §13.2.

**Required change (scope, VP2-10's text, with its milestone).** In §13.2's *Stage contract tests* bullet, after "S8's
working block equals S9's committed block (Hausdorff 0; §3.7)." insert "The stored `market.siting` cell `portRef` equals
the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the
scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails."

### VS2-06 — minor · conflict · scope · item 31 — T31-10 gives an `amalgamate` that builds nothing "the band of the new stock" (= VP2-11; apply once)
**Claim.** §4.11's writer list (l. 5057–5059) and J-A31.44 (l. 12805) give such an `amalgamate` "the `builtBand` of the
member whose frontage anchor the joined plot keeps". That event has no new stock.

**Required change (scope, VP2-11's text).** "(T31-10) after a rung-3 event `builtBand` is the band of the new stock;" →
"(T31-10) after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that
builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44);".

### VS2-07 — minor · partial · scope · item 11 — no bar proves J-A11.43's stretch split (= VP2-12; apply after VP2-04)
**Claim.** II.6 (l. 11860–11867) splits a tunnel record at a conversion's stretch. T11-1 (l. 10223) checks only that
"tunnel conversions by hand undo exactly".

**Required change (scope, VP2-12's text).** "(T11-1) tunnel conversions by hand undo exactly;" → "(T11-1) tunnel
conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6,
J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers, access points
and block frontages re-pointed — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its
undo restores the one record;". The clause's words follow II.6 as VP2-04 and VP2-05 leave it.

### VS2-08 — minor · stale · scope · item 12 — the Staged sewers row omits the crowding share (= VP2-13; apply once)
**Claim.** II.7.4's base list (l. 12158) reads "`UndergroundRule`'s depth scale, vacancy share, crowding share and
arrangement restriction" (J-A12.47). The Staged sewers row (l. 12916) lists three of the four.

**Required change (scope).** In the Staged sewers row: "`UndergroundRule`'s depth scale, vacancy share and arrangement
restriction" → "`UndergroundRule`'s depth scale, vacancy share, crowding share and arrangement restriction".

### VS2-09 — minor · conflict · scope · item 28 — §13.1's rotated-T clause bounds a crossing vertex that §3.4 does not bound (= VK2-08; apply once)
**Claim.** §13.1 (l. 10031–10033) asserts "every crossing vertex on both rings, within the hot pixel of the bar's
straight side". §3.4's seed clip (l. 2610–2618) guarantees that every ring carries each crossing vertex, so the joints
are shared vertex for vertex. It gives no bound against the input side, because §3.7's overlay inserts run by run.
J-A28.34's Part A (rationale l. 487) records the drift that one overlay makes harmless: "1.3 % of cases, worst 1.06
cm".

**Required change (scope, VK2-08's text).** "clipped to tile as the faces of one overlay (§3.4's seed clip) — every
crossing vertex on both rings, within the hot pixel of the bar's straight side, and the seeds accepted" → "clipped to
tile as the faces of one overlay (§3.4's seed clip) — every crossing vertex a vertex of both rings, the joint shared
vertex for vertex, and the seeds accepted".

### VS2-10 — minor · missing · scope · item 28 — `tileRings`' outcomes have no fixture, the holed-piece refusal among them (= VK2-09; apply once; (3) after VK2-02)
**Claim.** §3.4 (l. 2519, 2613–2618) gives `tileRings` three outcomes, and §13.1 fixes none of them:
* no piece for a covered ring;
* two pieces for a ring cut in two;
* `E_DEGENERATE` (detail `overlap`) for a piece left with a hole.

B-FUZZ's differential line covers "booleans and buffers" only (l. 10010–10012). The kernel seat's note says
`tileRings` is treated as a boolean case, but no text says so.

**Required change (scope, VK2-09's text).**
1. "on booleans and buffers, split by attraction (§3.7)" → "on booleans, `tileRings` (each ring's pieces against the
   oracle's difference of that ring with the union of the rings before it) and buffers, split by attraction (§3.7)".
2. In the transient-arena clause, after "and the seeds accepted;" (as VS2-09 leaves it) insert "`tileRings` on a ring
   the earlier rings cover (no piece), on one they cut in two (two pieces, each simple and counter-clockwise) and on an
   earlier ring wholly inside a later one (refused, `E_DEGENERATE`, detail `overlap`, naming a vertex of the hole);".
3. After "(the input sides as the arena's routes, §3.4)" insert "; a new wall ending on a kept room's side that lies
   along a joint, its end within the hot pixel of each of the three input sides it lies on". Word this as VK2-02's
   §3.4 repair states the three-side case.

### VS2-11 — minor · stale · scope · item 9 — §1.1's frame comment restates §3.2 (9) and cites §12.2 (= VK2-10 = VR2-05; apply once)
**Claim.** l. 211 reads "`// side scales with √(population ÷ target) (§3.2, §12.2)`". The frame's home is §3.2 (9)
(l. 2173–2177). Since round 2, §12.2 holds only the pointer "Within a rung the frame scales with the requested
population (§3.2 (9))" (l. 9454).

**Required change (scope, §1.1 `RungProfile`; VR2-05's pointer-only wording, which also satisfies VK2-10).**
"`// side scales with √(population ÷ target) (§3.2, §12.2)`" → "`// the frame scales with the requested population
(§3.2 (9))`".

### VS2-12 — minor · partial · scope · item 30 — T30-5 does not test the bridge's `export.refused` (= VR2-06; apply once)
**Claim.** Round 2 added the PLAT → host reply "`export.refused { error, message }` (an API error of `export`, §11.1's
`E_KNOWLEDGE_TIER` among them)" (§11.3 l. 9302–9303; J-A30.85). T30-5 tests only the API's refusal.

**Required change (scope, VR2-06's text).** In T30-5, after "fails with `E_KNOWLEDGE_TIER` and succeeds under
`secret`;" insert "a bridged `export.request` for `.plat` to a client whose key is `public` is answered by
`export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`;".

### Issue table

| id | same as | owner | severity | kind | item | section |
|---|---|---|---|---|---|---|
| VS2-01 | — | scope | minor | partial | 20, 28 (f), 30 | §0.2 rows 20, 28, 30 |
| VS2-02 | V-MAB2-14, VK2-07 (widened) | scope | minor | conflict | 29, 28 | §13.2 T28-3, T29-4 |
| VS2-03 | VD2-03 (widened) | scope | minor | missing | 20 | §13.2 T20-6; §16 M3a, M4; §0.2 row 20; §15.2 O10 (i); J-A17.01; J-A20.01 |
| VS2-04 | VP2-09 | scope | minor | stale | 19, 28 (f) | §13.2 T19-4 |
| VS2-05 | VP2-10 | scope | minor | broken-reference | 24 | §13.2 contract tests |
| VS2-06 | VP2-11 | scope | minor | conflict | 31 | §13.2 T31-10 |
| VS2-07 | VP2-12 | scope | minor | partial | 11 | §13.2 T11-1 |
| VS2-08 | VP2-13 | scope | minor | stale | 12 | Staged sewers row |
| VS2-09 | VK2-08 | scope | minor | conflict | 28 | §13.1 |
| VS2-10 | VK2-09 | scope | minor | missing | 28 | §13.1 |
| VS2-11 | VK2-10, VR2-05 | scope | minor | stale | 9 | §1.1 `RungProfile` |
| VS2-12 | VR2-06 | scope | minor | partial | 30 | §13.2 T30-5 |

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read on disk or executed; the document's sha256 `831efd42…` and the rationale's `f2c2a1ca…` unchanged
through this lane):
* Every quotation and line number above.
* The part's word diff against the pre-repair archive: 38 hunks, each one the repair report lists or a restated index
  row of another seat (scratchpad `vs2/part-wdiff.txt`).
* `refs.py` (output to the scratchpad only): 2 broken references, both pre-existing external ones.
* The T-id script: 88 defined, 0 cited undefined, and the milestone map of §3 (`vs2/tids.py`).
* The J-A digit script: 193 rows, 0 mismatches (`vs2/jdigit.py`).
* That every old string of §6 occurs exactly once, whitespace normalised (`vs2/counts.py`).
* The document checks on the part: exit 0.
* The homes each bar was read against: §3.4 l. 2600–2650, §4.2 l. 3693–3712, §4.7 l. 4642–4658, §4.9 l. 4790–4813,
  §5.3 l. 5618, §7.7 l. 7308–7336, §11.1 l. 9102–9113, §11.2 l. 9241–9254, §11.3 l. 9290–9306, §2.6 l. 1019, 1325–1332,
  1362–1374, 1460–1470, II.6 l. 11855–11867, II.7.4 l. 12150–12160.

**PLAUSIBLE** (reasoning on the texts):
* That T28-3 and T29-4 fail on a walk-out (VS2-02). §2.6 lists `'external'` as a third access. Whether any shipped row
  sets it is not measured.
* That the rotated-T crossing can drift past the hot pixel (VS2-09). This rests on J-A28.34's recorded measurement and
  verify-kernel-r2's receipt, not on a run by this seat.
* The mechanisms the confirmed other-seat issues rest on (VS2-03 – VS2-12). They are their verifiers' readings, checked
  here against the quoted sections.
* That T20-6's epoch clause is attainable once VD2-01 and VD2-02 land. Its wording must follow their final text.
