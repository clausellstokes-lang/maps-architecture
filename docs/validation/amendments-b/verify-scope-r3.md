# Verify — SCOPE part after amendments-b repair round 3 (lane amendments-b/verify-scope-r3)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-scope-r3).

PROGRESS
- STEP inputs-read: done (route.json scope rows as in r2; verify-scope-r2.md whole; validate.md §6's 15 scope issues; repair-scope-r3-report.md whole; assemble-r3.md whole with its §8 notes; the scope-owned issues of verify-kernel-r3 (VK3-03), verify-determinism-r3 (VD3-12), verify-pipeline-r3 (VP3-03), verify-model-r3 (V-MAB3-06, 11, 12) and verify-rendering-r3 (none), all five LANDED by 10:45; a word diff of the whole document against docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md; the repaired subsections read whole in the live doc sha256 1a861c72…; the homes they cite: §2.6 capacity bullet, step 3 and the re-cut bullet, §3.4 `tileRings`, §4.2 S3 (12), §4.6 hidden-share target, §4.7 households per building, §4.11 base path, use step and *Dossier content across epochs*, §5.3 dossier / interior / epoch rows, §7.7 item 2, II.6 stretch split, §13.8 amendments-b tiers)
- STEP r2-issues-rechecked: done (§3)
- STEP items-verified (8–31, 28 (f)): done (§2)
- STEP checks over the repaired subsections: done (§5)
- STEP issues (VS3-nn): done (§6, 8 issues)
- STEP CONFIRMED / PLAUSIBLE: done (§7)
- STEP queue row + LANDED: done

Lane `amendments-b/verify-scope-r3`, 2026-09-27. An Opus verifier seat standing in for Fable. The document was
unchanged from the first read to the last (sha256 `1a861c72…`, the assemble-r3 install), and so was the rationale file
(`8a24a5a7…`).

## 1 Outcome

Repair round 3 fixed all 15 scope issues that validate.md §6 routed here (VS2-01, VS2-02, VS2-03, VP2-09, VS2-05,
VP2-11, VP2-12, VP2-13, VK2-08, VK2-09, VS2-11, VR2-06, VAL-03, VAL-04, VAL-05), and with them their 11 merged
duplicates. Every item routed here stays **PRESENT** (25 of 25, counting 28 (f) apart). The T-id map is clean: 89 ids
defined in §13.2, none cited undefined, each at one milestone except the clause splits (T20-2 and T20-6 at M3a and M4,
T23-1 at M1 and M2b, T28-12, T28-17 and T28-18 at M3a and stage 3).

**8 issues remain, all minor, with no blocker or major. Scope owns all 8.**
* **Three are this seat's own** (VS3-01 – VS3-03):
  * J-A20.43's forced relocation of a dossier-backed use has no line in §16's M4 content or in the Staged evolution
    row, and §0.2 row 20 restates it inexactly;
  * §16's move of the household capacity from M3a to M2b is not recorded against J-A16.01's pricing;
  * T11-1 does not test II.6's split of a `Frontage` that spans a stretch end.
* **Five are other r3 verifiers' findings against this part**, confirmed here and restated once (VS3-04 – VS3-08):
  * VD3-12 (2) = VP3-03, T19-4's dossier-household clause, widened here: it needs the dossier contract, so it runs
    from M3a, not M2b;
  * VD3-12 (1), (3) = V-MAB3-06, a bar for the capacity's re-homing on the edit paths;
  * VK3-03, the `tileRings` differential on a holed case;
  * V-MAB3-11, T28-2 on a walk-out basement;
  * V-MAB3-12, T28-15 on a stored plan.

**Nothing needs an owner ruling.** Apply order: VS3-03 after VP3-05 (pipeline); VS3-04 after VP3-01, VD3-01 and VD3-02;
VS3-05 after V-MAB3-01, VD3-11 and VD3-05; VS3-07 after V-MAB3-03; VS3-08 after V-MAB3-05. Each of those follows the
final wording of its dependency.

## 2 Items routed to scope — PRESENT / PARTIAL / MISSING (after repair round 3)

The r0, r1 and r2 verdicts and quotes stand for the items r3 did not touch (verify-scope-r0.md §2, verify-scope-r1.md
§2, verify-scope-r2.md §2). This table re-checks the repaired text.

| item | r2 | r3 | the repaired text, quoted (live line) |
|---|---|---|---|
| 9 (home) | PRESENT (VS2-11) | PRESENT | §1.1 `RungProfile` "`// the frame scales with the requested population (§3.2 (9))`" (l. 211); §0.2 row 9 unchanged (l. 140) |
| 11 | PRESENT (VS2-07) | PRESENT (VS3-03) | T11-1 "a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, §6.3; J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers, access points and block frontages re-pointed — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one record" (l. 10304) |
| 12 | PRESENT (VS2-08) | PRESENT | Staged sewers row "`UndergroundRule`'s depth scale, vacancy share, crowding share and arrangement restriction" (l. 13002), equal to II.7.4 |
| 17 | PRESENT | PRESENT | J-A17.01 index "T17-2, T17-3, T20-2's epoch clause and T20-6's epoch clause — run from M4 …; T17-1, T20-2's dossier-event clause and T20-6's refusal clause stay at M3a" (l. 12983); Part A (rationale l. 515) |
| 19 | PRESENT (VS2-04) | PRESENT (VS3-04) | T19-4 "every residential building houses at least one household and at most its capacity (§2.6's function) — the households S10b placed in its slot (one to its template row's `households.built`) clamped into [1, capacity], but for the moves §4.7's overflow pass reports — and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46)" (l. 10337), equal to §4.7 l. 4674–4690 |
| 20 | PRESENT (VS2-03) | PRESENT (VS3-01, VS3-04) | T20-6 (l. 10346): the refusal clause names §7.7 item 2's list ("a map `unassign` …, a map `setAttr` of its use or class, a hand `convert` `closeUse` of its use or `mutate` of its plot …, and a plot `join` or `split` whose fate would demolish the building … each return F-EDIT … while a `relocateUse` of it commits"); the epoch clause "the use is never closed and its building is emptied or removed only after the use has moved — a pinned use keeping its building (§4.11's *Dossier content across epochs*)", equal to §4.11 l. 5315–5327; §0.2 row 20 "tests T20-1 to T20-6" (l. 151); O10 (i) "T20-1 – T20-6" (l. 11322); §16 M3a "T20-6's refusal clause" and M4 "T20-6's epoch clause" (l. 11365, 11367) |
| 21 (home) | PRESENT | PRESENT | unchanged (§17.1, §17.3, D-22; row 21 l. 152) |
| 24 | PRESENT (VS2-05) | PRESENT | §13.2 contract tests "The stored `market.siting` cell `portRef` equals the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails." (l. 10161), equal to §4.2 l. 3724–3729 |
| 28 | PRESENT (VS2-09, VS2-10) | PRESENT (VS3-06) | §13.1 "every crossing vertex a vertex of both rings, the joint shared vertex for vertex, and the seeds accepted; `tileRings` on a ring the earlier rings cover (no piece), on one they cut in two (two pieces, each simple and counter-clockwise) and on an earlier ring wholly inside a later one (refused, `E_DEGENERATE`, detail `overlap`, naming a vertex of the hole)" (l. 10110–10113); the three-side clause (l. 10123–10124) |
| 28 (f) | PRESENT (VS2-01, VS2-04) | PRESENT (VS3-02, VS3-05, VS3-08) | §0.2 row 28 "the generation fill — households per slot at S10b, `Building.households` clamped to the capacity at S11 and the overflow re-placed inside the district — in §4.7 (J-A28.46), the occupants' band memory `Plot.fieldBand` in §2.5 (J-A28.29)" (l. 159); §16 M2b "the generation fill (§4.7; J-A28.46) within §2.6's one household capacity" (l. 11364); T31-9 / T31-11 read the shell "without the `composition`-role vertices" (l. 10442, 10446) |
| 29 | PRESENT (VS2-02) | PRESENT (VS3-07) | T28-3 "through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring (§2.6's fallback; J-A29.25) — or, for a walk-out (`Basement.access` `'external'`), by its outside stair" (l. 10378); T29-4 "its access by one of the three ways §2.6 gives it" (l. 10416) |
| 30 | PRESENT (VS2-01, VS2-12) | PRESENT | row 30 "`BaseWing.spans`, which a composed wing inherits (J-A30.23)" (l. 161); T30-2 "§4.6's band rows interpolated at the district's area-weighted mean prosperity value and scaled by its rung and density factors" (l. 10420), equal to §4.6 l. 4311–4315; §13.7 row (l. 10845) and O18 (d) "its §4.6 target" (l. 11312); T30-5 "a bridged `export.request` for `.plat` from a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`" (l. 10429) |
| 31 | PRESENT (VS2-06) | PRESENT | the summary "and until one of those a plot's geometry never reads poorer than the middle band" (l. 94); T31-10 "after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44)" (l. 10445) |

Items 8, 10, 13–16, 18, 22, 23, 25 and 27: PRESENT, unchanged by round 3 in this part (r2 §2).

## 3 Round 2's issues after repair round 3

A word diff of the part against the pre-repair archive finds 36 hunks. Each is one the repair report lists, or an index
row that another seat restated (J-DET-53, J-A28.23, J-A28.26, J-A30.41, J-A20.75, J-A31.76, J-A30.87, J-A28.73,
J-A29.25, J-A11.43, J-A28.46), or the new pipeline row J-A20.43. The rest of the part is byte-identical.

| issue (merged ids) | verdict | where now (live line) |
|---|---|---|
| VS2-01 | FIXED | §0.2 rows 20, 28, 30 (l. 151, 159, 161), the validator's wording; row 20 also names *Dossier content across epochs* (see VS3-01) |
| VS2-02 (V-MAB2-14, VK2-07) | FIXED | T28-3 (l. 10378), T29-4 (l. 10416); `Basement.access` is the surviving field (§2.6 l. 1334, V-MAB2-10) |
| VS2-03 (VD2-03) | FIXED | T20-6 (l. 10346); §16 M3a and M4 (l. 11365, 11367); §0.2 row 20; O10 (i); J-A17.01 index and Part A; J-A20.01 Part A (rationale l. 468). The repair's two departures stand: the refusal clause names `mutate` and the demolishing `join` / `split`, which §7.7 item 2 lists; the epoch clause says "never closed … emptied or removed only after the use has moved — a pinned use keeping its building", which is §4.11's rule exactly (a use whose catchment holds no candidate stays in its building) |
| VP2-09 (VS2-04) | FIXED, with a residue | T19-4 (l. 10337). The departure ("the households S10b placed in its slot (one to … `households.built`)") follows §4.7's fill. The dossier residue is VS3-04 |
| VS2-05 (VP2-10) | FIXED | l. 10161 |
| VP2-11 (VS2-06) | FIXED | T31-10 (l. 10445) |
| VP2-12 (VS2-07) | FIXED, with a residue | T11-1 (l. 10304). The `Frontage` split that II.6 now states has no clause (VS3-03) |
| VP2-13 (VS2-08) | FIXED | l. 13002 |
| VK2-08 (VS2-09) | FIXED | l. 10110–10111 |
| VK2-09 (VS2-10) | FIXED, with a residue | l. 10088, 10111–10113, 10123–10124. The differential wording fails on a holed case (VK3-03 = VS3-06) |
| VS2-11 (VK2-10, VR2-05) | FIXED | l. 211 |
| VR2-06 (VS2-12) | FIXED | T30-5 (l. 10429); "from a client" is the right direction, as verify-rendering-r3 also records |
| VAL-03 | FIXED | T31-9 (l. 10442), T31-11 (l. 10446); both cite §2.6 and J-P48 (1), which resolve, and read the shell as §5.3's epoch and interior-ladder rows do (l. 5669, 5671) |
| VAL-04 | FIXED | l. 94 |
| VAL-05 | FIXED | T30-2 (l. 10420), §13.7 (l. 10845), O18 (d) (l. 11312) |

**The repair's departures** (repair-scope-r3-report §3) were each checked:
* **The §16 capacity move (M3a → M2b).** It is correct: J-A28.46's S11 clamps to §2.6's capacity at generation, and
  T19-4 gates M2b. But it is unrecorded against J-A16.01, which prices M2b and M3a (VS3-02).
* **The C3 rewordings.** They keep the meaning.
* **T28-15.** The repair flagged it as PLAUSIBLE, and verify-model-r3 confirmed it as V-MAB3-05 (model) with V-MAB3-12
  (scope), restated here as VS3-08.

## 4 Other verifiers' r3 issues on this part, and the cross-part notes

| id (report) | subject | this seat |
|---|---|---|
| VK3-03 (kernel) | §13.1's `tileRings` differential expects the oracle's holed difference where §3.4 refuses | confirmed at §3.4 l. 2638–2640 ("A piece left with a hole … is refused (`E_DEGENERATE`, detail `overlap` …)") against §13.1 l. 10088; restated as VS3-06 |
| VD3-12 (1), (3) (determinism) = V-MAB3-06 (model) | no bar for §2.6's re-homing on the edit paths | confirmed: "re-hom" occurs 0 times in §13.2; §2.6 l. 1484–1493 states the rule and J-A28.23's restated row records it. Merged, with V-MAB3-06's wider text, and widened to §13.8's tier sentence, M3a's content line and J-A28.01's Part A. Restated as VS3-05 |
| VD3-12 (2) (determinism) = VP3-03 (pipeline) | T19-4 passes a map that drops dossier households | confirmed against §7.7 item 2 ("F-SITING never drops it", l. 7389) and item 20 (b), (e). Widened: T19-4 is an M2b bar, and the dossier contract is M3a's (§16 l. 11365), so the new clause needs its own milestone. Restated as VS3-04 |
| V-MAB3-11 (model) | T28-2 fails on a walk-out, whose basement §2.6 step 3 opens only by an outside door | confirmed at §2.6 l. 1380–1382 ("`external`, a walk-out's outside stair: the core stopping at the ground storey, a door … opens the basement"); restated as VS3-07 |
| V-MAB3-12 (model) | T28-15's unconditional "restores the earlier plan" does not hold for a stored plan | the text conflict is confirmed at §2.6 l. 1513–1526: a stored plan is "re-cut inside the event … around its edited and locked rooms", and a room "whose ring fits a role of the new programme … keeps its ring". Restated as VS3-08 |

**The cross-part notes addressed to scope** were each checked:
* **assemble-r3 §8.**
  * Note 1 (a re-homing bar) is VS3-05.
  * Note 5 (the §16 capacity move) is accepted in substance, and its record is VS3-02.
  * Notes 2, 3 and 4 belong to model and determinism: V-MAB3-01, V-MAB3-02, and VD3-01 / VP3-01.
* **repair-model-r3's "Cross-part notes" (1)** is VS3-05.
* **repair-pipeline-r3's refinements** carry nothing more for scope, beyond T11-1's `Frontage` split (VS3-03).
* **repair-determinism-r3** reflects T20-6's wording.
* **The kernel and rendering reports** carry nothing open for scope.

## 5 The checks, over the repaired subsections

* **SINGLE-SOURCE.**
  * T19-4, T20-6, T30-2 and T31-9 – T31-11 quote their homes' conditions as the tests' inputs (canon R9). They are
    not second rules.
  * J-A17.01 is stated once. The portRef test is stated once, in §13.2, and §4.2 points to it.
  * One pointer restates its home inexactly: §0.2 row 20's gloss of J-A20.43 (VS3-01 (a)).
* **STALE.** The probes for the owner's list return only earlier-cleared hits:
  * "lots painted as buildings" occurs only in MFCG's column of §1.4 and in §1's contrast;
  * "proprietary" occurs only in §17.3, D-22 and J-S10, which are the owner's "private for now" ruling (item 21,
    J-A21.01);
  * binary wealth, size fixed by tier, one central market, the map editing the dossier, and terrain or water that
    never change all return 0.

  The stale text round 3 left is §0.2 row 20's gloss (VS3-01) and T19-4's dossier-blind last clause (VS3-04).
* **CROSS-PART.**
  * Round 3's new mechanisms elsewhere have gaps here:
    * J-A20.43 is unpriced at M4 and missing from the Staged evolution row (VS3-01);
    * the re-homing has no bar (VS3-05);
    * II.6's `Frontage` split has no clause (VS3-03).
  * Three bars read their homes wrongly: T28-2 (VS3-07), T28-15 (VS3-08) and §13.1's differential (VS3-06).
* **DEFERRAL-WORDING.** None in the added text. "From M4", "from stage 3's intake" and "the rest of T28 from stage 3's
  intake" are the owner's roadmap staging. There is no TBD, open question or unresolved choice.
* **BROKEN-REFERENCE.**
  * `refs.py`, output to the scratchpad only: 139 heading keys, 35 D ids, 470 J ids and 2 broken references. Both are
    the pre-existing external citations (l. 2708 `os-geometry.md` §2.1.4, l. 9200 RFC 7946 §3.1.6), and neither is in
    this part.
  * The T-id script: 89 defined, 0 cited undefined, 0 unplaced.
  * The J-A digit script: 194 rows, 0 mismatches.
  * "(§2.6's fallback; J-A29.25)", "§4.11's *Dossier content across epochs*", "(II.6, §6.3; J-A11.43)" and "J-P48 (1)"
    all resolve.
* **NEW-PROBLEM.**
  * T19-4's added last clause, read with §7.7 item 2, lets a dossier town pass with dossier households dropped
    (VS3-04). That is the test side of the major VP3-01 / VD3-01.
  * No other contradiction with an existing rule of the part was found.
  * J-A17.01's split stays consistent with §1.5, D-25 and §13.2's staged-engine rule ("the bars of a staged engine run
    on hook fixtures, its conversions applied by hand"). T20-6's epoch clause therefore runs at M4 on a hook fixture,
    as T17-2 does.
* **Document checks.** The command was `python3 docs/validation/bench/doc_checks.py --sections "The whole design in one
  page,0,1,13,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"`, with
  `docs/validation/doc-checks-allow.tsv`, on the live document. It exited 0: C1 5 / 0, C2 0 / 0, C3 247 / 0, C4 3 / 0,
  S1 0 / 0, S2 0 / 0, over 9 626 JSON files and 911 940 corpus 3-grams. This lane changed no design text.

## 6 Issues (VS3-nn)

Every quoted old string below occurs exactly once in `docs/ARCHITECTURE.md` or `docs/ARCHITECTURE-RATIONALE.md`, with
whitespace normalised (scratchpad `vs3/counts.py`).

### VS3-01 — minor · partial · scope · item 20 — J-A20.43's relocation is unpriced at M4, missing from the Staged evolution row, and glossed inexactly in §0.2 row 20
**Claim.** Round 3 added §4.11's *Dossier content across epochs* (J-A20.43). It is new base mechanism: inside an epoch,
a dossier-backed use is relocated before a step empties or removes its building. The base's own grow path invokes it
through the growth step's `demolish` and corridor re-cuts, and the staged engine's steps must obey it. T20-6's epoch
clause gates M4 on it (§16 l. 11367). But the part has three gaps:
* **(a) §0.2 row 20** glosses it as "a dossier-backed use relocated before an epoch's step could close it or leave it
  without its building". The home instead lets the use step leave a use in its building where its catchment holds no
  candidate, and lets a pinned use keep its building (l. 5317–5325). The pointer should name the rule, not restate it.
* **(b) §16 M4's content** prices "the lapse of a rejection at an epoch" and nothing for the relocation. §0.2 row 20
  says the item is "priced in §16".
* **(c) The Staged evolution row** lists "the lapse of a rejection and the folding of a dossier event at an epoch". It
  does not list the rule the engine's use step, decline and redevelopment must keep.

**Required change (scope).**
* §0.2 row 20: "the lapse at an epoch and *Dossier content across epochs* — a dossier-backed use relocated before an
  epoch's step could close it or leave it without its building (J-A20.43) — in §4.11" → "the lapse at an epoch and
  *Dossier content across epochs* (J-A20.75, J-A20.43) in §4.11".
* §16 M4: "the floor's attributes with their migration, the lapse of a rejection at an epoch — with their hook tests" →
  "the floor's attributes with their migration, the lapse of a rejection at an epoch and the relocation of a
  dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43) — with their hook tests". The
  amount "(≈ 2–3 pw)" is unchanged, because the relocation reuses the `dossier` request and `relocateUse` that M3a
  builds.
* Staged evolution row: "the lapse of a rejection and the folding of a dossier event at an epoch (items 20, 22 (e))" →
  "the lapse of a rejection, *Dossier content across epochs* (J-A20.43) and the folding of a dossier event at an epoch
  (items 20, 22 (e))".

### VS3-02 — minor · missing · scope · item 28 (f) — §16's move of the household capacity from M3a to M2b is not recorded against J-A16.01
**Claim.** Repair round 3 moved §2.6's household capacity out of M3a's content. M3a now reads "`relet` reading the
household capacity M2b builds" (l. 11365), and M2b gained "the generation fill (§4.7; J-A28.46) within §2.6's one
household capacity, with the programme rows' `circulation` share and the `room` form's least area it reads at the
poorest band (§10.2)" (l. 11364). Neither row was re-priced (repair-scope-r3-report §3: "absorbed; PLAUSIBLE").

The move is right, because generation clamps to the capacity at S11 and T19-4 gates M2b. But J-A16.01's Part A still
itemises amendments b's work as "M2b +3 / +4, M3a +7 / +8" (rationale l. 466). A vetoable call, to move work between
milestones and absorb it, is recorded only in a seat's report and not in the decision record (rule (5)).

**Required change (scope, RATIONALE-A restating J-A16.01; hand-off: restated-row swap; the index row is unchanged).** At
the end of J-A16.01's Part A entry, after "the cuts then leave ≈ 135–174 pw for the base and ≈ 149–192 in total (§16,
D-20).", append: "Repair round 3 (2026-09-27) moved §2.6's household capacity, with the programme rows' `circulation`
share and least `room`-form area that it reads, from M3a's content to M2b's, because the generation fill clamps to it at
S11 (J-A28.46) and T19-4 gates M2b; the work moves between the two rows and is absorbed there, the rows' amounts and
the total unchanged (verify-scope-r3's VS3-02)."

### VS3-03 — minor · partial · scope · item 11 — T11-1 does not test II.6's split of a `Frontage` that spans a stretch end (apply after VP3-05)
**Claim.** II.6 (l. 11950–11952) now splits "the `Frontage` records of the underground blocks along it … where one
spans an end, keyed as the tunnel's parts are, and each re-pointed (`Frontage.way`) to the part it fronts". T11-1 (l.
10304) checks only that "the chambers, access points and block frontages re-pointed". A kernel that re-points an
unsplit `Frontage` to one part passes T11-1, but it leaves the far part's kerb with the wrong record. VP3-05 (pipeline)
is completing that split, and it moves the `('frontage', id)` edge rows.

**Required change (scope, §13.2 T11-1; word its last clause as VP3-05's II.6 text finally reads).** "every part
continuing the lineage, the chambers, access points and block frontages re-pointed — closes only" → "every part
continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans
an end split there, its parts keyed as the tunnel's are and each re-pointed to the part it fronts, its kerb edges with
it — closes only".

### VS3-04 — minor · partial · scope · items 20, 28 (f) — T19-4 passes a dossier map that drops dossier households (= VD3-12 (2) = VP3-03, widened; apply once, after VP3-01, VD3-01 and VD3-02)
**Claim.** T19-4's last clause, "every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7,
J-A28.46)" (l. 10337), accepts a map that drops a dossier-backed household. §7.7 item 2 says "F-SITING never drops it"
(l. 7389), and the owner's item 20 (b) and (e) say the same: the population exists on every map, and its housing is
re-provided elsewhere. No bar exercises VP3-01's re-provision.

**Widened.** T19-4 is an M2b bar ("T19-1 – T19-4", §16 l. 11364). The dossier contract, including dossier-backed
existence at generation, is M3a's (l. 11365). A dossier fixture cannot run at M2b, so the new clause is split out by
milestone, as T20-2 and T23-1 are.

**Required change (scope).**
* §13.2 T19-4: "and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46)." →
  "and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a dossier
  fixture whose squalid district's shells hold fewer households than their template rows, every dossier household is
  housed, no building exceeds its capacity, and each re-provided residential slot is reported (§7.7 item 2; the
  dossier clause, from M3a)." Word the re-provision as VP3-01's §4.7 sentence finally reads.
* §16 M3a exit: "T20-6's refusal clause, T22-1 – T22-4" → "T20-6's refusal clause, T19-4's dossier clause, T22-1 –
  T22-4".
* §16 M2b exit: "T16-1, T16-2, T19-1 – T19-4, T23-1's parity clauses" → "T16-1, T16-2, T19-1 – T19-3, T19-4 but its
  dossier clause, T23-1's parity clauses".

### VS3-05 — minor · missing · scope · item 28 (f) — no bar proves §2.6's re-homing on the edit paths (= VD3-12 (1), (3) = V-MAB3-06, widened; apply once, after V-MAB3-01 / VD3-11 and VD3-05)
**Claim.** §2.6's capacity bullet (l. 1484–1493; J-A28.23 restated) re-homes the households past a lowered capacity
"by §4.7's overflow pass inside the causing event". The causing changes it lists are a `setAttr` of heights or class, a
wing carry, a moved spanned passage face and a §7.6 edit of a table the function reads. Each move is a `relocate`
event, listed among the dry run's fates, and undone by the edit's undo.

"re-hom" occurs 0 times in §13.2. T28-17 covers the fill after a band fall, and T28-18 covers only the `relet`
refusal. The capacity's re-homing is M3a edit work, but M3a's content line names only `relet` reading the capacity.

**Required change (scope).**
* §13.2 T28-18: "returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake)." → "returns F-EDIT (the `setRoomUnit`
  clause, from stage 3's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks
  its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its
  capacity below its households, and each edit's dry run lists the households past the capacity with their `relocate`
  moves and holds the receiving buildings in its effective scope; after commit no building houses more households than
  its capacity (§5.3); the undo of each returns every household to its former building byte-identically; and an edit
  whose excess cannot be re-homed returns F-EDIT (§2.6's capacity rule; the re-homing clause)." Word which households
  are passed over, and the F-EDIT case, as V-MAB3-01 / VD3-11's §2.6 text finally reads. Cite §5.3 as VD3-05's
  capacity row lands.
* §13.8: "housing clause and T28-18's `relet` clause from M3a" → "housing clause and T28-18's `relet` and re-homing
  clauses from M3a".
* §16 M3a exit: "T28-17's housing clause, T28-18's `relet` clause, T30-3" → "T28-17's housing clause, T28-18's `relet`
  and re-homing clauses, T30-3".
* §16 M3a content: "`relet` reading the household capacity M2b builds," → "`relet` reading the household capacity M2b
  builds, and every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6),".
* J-A28.01 Part A (RATIONALE-A restating J-A28.01; hand-off: restated-row swap; index row unchanged): "T28-17's housing
  clause and T28-18's `relet` clause — run from M3a" → "T28-17's housing clause and T28-18's `relet` and re-homing
  clauses — run from M3a".

### VS3-06 — minor · new-problem · scope · item 28 — §13.1's `tileRings` differential fails a correct kernel on a holed case (= VK3-03; apply once)
**Claim.** The differential compares "each ring's pieces against the oracle's result for that ring less every earlier
ring" (l. 10088). On a drawn case with an earlier ring wholly inside a later one, the oracle returns a polygon with a
hole, while §3.4 refuses it: "A piece left with a hole … is refused (`E_DEGENERATE`, detail `overlap` …)" (l.
2638–2639). The transient-arena fixture tests the refusal on its own (l. 10112), so only the differential's wording is
at fault.

**Required change (scope, §13.1; VK3-03's text).** "(each ring's pieces against the oracle's result for that ring less
every earlier ring)" → "(each ring's pieces against the oracle's result for that ring less every earlier ring, and a
refusal — detail `overlap` — exactly where that result has a hole)".

### VS3-07 — minor · conflict · scope · item 29 — T28-2 fails on a walk-out basement (= V-MAB3-11; apply once, after V-MAB3-03)
**Claim.** For `Basement.access` `'external'`, §2.6 step 3 stops the core "at the ground storey" and opens the basement
by "a door … in the side of `Basement.ring`" (l. 1380–1382). A walk-out's basement rooms are therefore reached only from
outside. T28-2, "(T28-2) starting at the main entrance, openings and stair cores lead to every room of every storey;"
(l. 10375–10376), fails on every correct walk-out. V-MAB3-03 (model) makes that door a root of the basement's storeys.

**Required change (scope, §13.2; V-MAB3-11's text).** "(T28-2) starting at the main entrance, openings and stair cores
lead to every room of every storey;" → "(T28-2) starting at the main entrance — and, for a basement whose
`Basement.access` is `external`, at its outside door (§2.6 step 3) — openings and stair cores lead to every room of
every storey;".

### VS3-08 — minor · conflict · scope · item 28 (f) — T28-15 claims an exact return that a stored plan does not give (= V-MAB3-12; apply once, after V-MAB3-05)
**Claim.** T28-15 reads "(T28-15) re-uniting the households restores the earlier plan where nothing else changed (item
18 (e)'s inverse);" (l. 10404). §2.6 gives an exact return only for an unstored plan, whose canonical chain "is the
as-built plan exactly" (l. 1521). A stored plan "is instead re-cut inside the event … around its edited and locked
rooms", and a room whose ring "fits a role of the new programme … keeps its ring" (l. 1508–1511, 1521–1522). Its
re-cuts also leave `composition`-role vertices (J-P48 (1)). The repair seat flagged the vertex half, and verify-model-r3
widened it.

**Required change (scope, §13.2; V-MAB3-12's text, worded as V-MAB3-05's §2.6 sentence finally reads).** Replace
"(T28-15) re-uniting the households restores the earlier plan where nothing else changed (item 18 (e)'s inverse);" with
"(T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan
(§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the
`composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4)
(item 18 (e)'s inverse);".

### Issue table

| id | same as | owner | severity | kind | item | section |
|---|---|---|---|---|---|---|
| VS3-01 | — | scope | minor | partial | 20 | §0.2 row 20; §16 M4; Staged evolution row |
| VS3-02 | — | scope | minor | missing | 28 (f) | J-A16.01 Part A (§16) |
| VS3-03 | — (after VP3-05) | scope | minor | partial | 11 | §13.2 T11-1 |
| VS3-04 | VD3-12 (2), VP3-03 (widened) | scope | minor | partial | 20, 28 (f) | §13.2 T19-4; §16 M2b, M3a |
| VS3-05 | VD3-12 (1), (3), V-MAB3-06 (widened) | scope | minor | missing | 28 (f) | §13.2 T28-18; §13.8; §16 M3a; J-A28.01 Part A |
| VS3-06 | VK3-03 | scope | minor | new-problem | 28 | §13.1 |
| VS3-07 | V-MAB3-11 | scope | minor | conflict | 29 | §13.2 T28-2 |
| VS3-08 | V-MAB3-12 | scope | minor | conflict | 28 (f) | §13.2 T28-15 |

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read on disk or executed; the document's sha256 `1a861c72…` and the rationale's `8a24a5a7…` were
unchanged through this lane):
* every quotation and line number above;
* the whole-document word diff against the pre-repair-r3 archive (scratchpad `vs3/wdiff.txt`), with the part's 36 hunks
  attributed;
* `refs.py`: 2 broken references, both pre-existing external ones;
* the T-id milestone script: 89 defined, 0 cited undefined, 0 unplaced, and splits only where §16 states them;
* the J-A digit script: 194 rows, 0 mismatches;
* that every old string of §6 occurs exactly once (`vs3/counts.py`);
* the document checks on the part, exit 0;
* that "re-hom" is absent from §13.2;
* that §16's M3a content line names the dossier contract, and M2b's does not.

**PLAUSIBLE** (reasoning on the texts):
* that a kernel re-pointing an unsplit `Frontage` would pass T11-1 (VS3-03);
* that absorbing the capacity move leaves M2b's amount adequate (VS3-02 records the call; it does not re-price it);
* that the relocation of VS3-01 needs no new pricing beyond M3a's `relocateUse` and `dossier` request;
* the mechanisms the confirmed other-seat issues rest on (VS3-04 – VS3-08), which are their verifiers' readings, checked
  here against the quoted sections;
* that every required wording marked "after …" will fit once its dependency lands.
