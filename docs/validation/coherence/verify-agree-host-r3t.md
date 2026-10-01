# Agreement check, round 3 — the dossier and the host (determinism, V08, V09, V10, V11) after assemble-r3

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-host-r3t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] resume check (no output, no LANDED line: fresh start) · [x] brief read whole · [x] inputs (round-2 report and result, adjudication-r3 R3-01–R3-27 and Part H, assemble-r3 hashes = live, the five members' repair-r3 preambles, landed peers' r3t results) · [x] round-2 findings re-checked on live, END lines' second ends included · [x] round-3 text of the five members read at every cross-member statement · [x] DR rows against V08's field table, by script · [x] hand-offs of all eighteen repair-r3 preambles that name a member checked at their destinations · [x] new issues written · [x] result saved · [x] LANDED

## Scope and method

Members: determinism (base §5–§7), V08, V09, V10 and V11. The live text is assemble-r3's output, checked by sha256:
base `593c657d…`, V08 `bf9fa7be…`, V09 `cfe4df19…`, V10 `382ea60e…`, V11 `1671da41…`. The pre-round text is git
`920d280d` (base `4ed292e9…`, the text the repairs were written against).

1. **Round-2 findings.** G125-V08 and VAH-r2-01 to VAH-r2-10 were re-checked at every site their required change names,
   against adjudication-r3's Part H disposition and the ruling it cites (R3-04, R3-12, R3-13, R3-16 (f), R3-20), and at
   each END line's second end (DR44, §10.2 (b), §14's `HostContext` comment and port item 5, §11.3, V08 §3.16 (7) (e),
   T-V9-85).
2. **Round-3 text.** Pre → live diffs of each member: determinism §5–§7 (12 hunks, read whole), V08 (57 hunks), V09
   (75), V10 (43) and V11 (35), read as word diffs, every hunk, with the whole subsections where a hunk meets another
   member: V08 §2.4, §3.16 (1)–(10), §3.17; V09 §4.21.12–§4.21.14, §3.16 rows 87 and 90–94, T-V9-85, T-V9-86; V10 §2.13,
   §3.9a, §3.9b (7)–(8), §3.23 rows 32–35, T-V10-52, T-V10-53; V11 §3.25.9–§3.25.11; §6.1, §6.3, §7.1's E-07 row, §7.7
   item 1, DR42 and DR44.
3. **Seams checked:** the adapter selection and fallbacks (V08, §14, §11.3, §7.7 item 12); the crisis looks' source
   word, the stressor pairing and the tier (DR44, §10.2 (b), V08 §3.16 (7), V11 §3.25.9, V09 §4.21.12, V10 §3.9b (8));
   the `looks` reader and the gazetteer's `week` (§11.2, V09, V10); the host's commands (§7.7 item 1, §11.3, V08, V09);
   the damage comparison, the head word, restoration and the decay run (§6.3, §2.6 step 7, V09 §4.21.13, V10 §3.9a,
   V11 §3.25.10); the weather timeline (§6.1, V09 §4.21.14, V11 §3.25.11); E-07's `addUndergroundAccess` keys against
   V09 §4.9; the creation week (§4.11 *The clock* (1)) at its member readers; each DR row's inputs against V08's field
   table, both ways, by script.
4. **Peers.** Findings already raised by landed round-3 peers are not repeated; I concur with them (list below). No
   design file was touched. doc_checks was not run (an agreement seat); assemble-r3's provisional checks stand, the
   reference corpus being incomplete in this checkout.

**Severity** follows J141 and R3-03: two members stating two outcomes for one case is major; a citation, a stale
reference, a description or a list entry that changes nothing a builder makes is minor.

## Result

**11 issues**: 0 blockers, 1 major, 10 minor.
* By owner: V08 4, V10 2, V09 2, V11 1, determinism 1, V07 1.
* By kind: DISAGREE 8, HANDOFF-OPEN 3.

All eleven round-2 findings are closed: G125-V08 and VAH-r2-01, -02, -03, -06, -07, -08, -09 and -10 are fixed at
their owners as ruled, and VAH-r2-04 and VAH-r2-05 are closed by their merges (VAT-r2-02 and VAT-r2-03, fixed per
R3-04). The one major is new: V09 never applies the disaster look's per-building hand-over that R3-10 put into every
other reader, so its plan panel and why card keep a building "ruined for now" after its rebuild has begun. The minors are
stale words and lists the round's repairs left at a second member: a deleted key family still named by V10, "the
creation week" for the present at creation in V08, "V07's ends" for V07's units, a field table one DR row short in
four places, a home citing its own citation, and three hand-offs open at V08 and V07.

## Round-2 findings re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| G125-V08 | V08 | FIXED (R3-20) | Clause (1): V08 §2.4 *Selection* (l. 688–702) — the dossier's own shape and stamps select in every case, `HostContext.line` checked, never chosen from, `line_differs` (report class); `select`'s `differs`; B5, B19 (l. 2021, 2035); T-V8-11 (l. 3210); T-V8-61 (b); J-V8.133. Clause (2): the field table's `id`, `population`, `_seed`, version-stamp and `institutions` rows (l. 631–636, 646) each a fallback; §3.5 step 3 (l. 1599–1605) refuses only a required key's absence; T-V8-61 (a) adds the emptied `population`, `_seed`, `id` and `schemaVersion`; J-V8.134. Ends: §14's `HostContext.line` comment (base l. 19411) and port item 5 (l. 19524–19526), §11.3 (l. 16584–16586), as R3-20 (1) words them. The population fallback reads the tier word's rung target, not the "midpoint" R3-20 (2) adopted: V08's judgment 1 cites item 125 (b)'s "the generator's own choice, exactly as on a map made without a dossier"; no other unit states a dossier population fallback, so no two members disagree. Residues are peers' (VV78-r3-01, -02, -05; VDC3-03) |
| VAH-r2-01 | determinism | FIXED (R3-13) | DR44 (l. 11981) states the tier: `public` where the map row gives a look, `secret` where `none`, a key form admitting it whatever its tier; V08 §3.16 (7) (e) (l. 2536–2538) is the END's citation. Its own source citation now loops — VAH-r3-07 below |
| VAH-r2-02 | V08 | FIXED (R3-12) | V08 §3.16 (7) (b) *A stressor and a condition of one look* (l. 2519–2524), no promotion link; §3.17's crisis row; T-V8-59; J-V8.135; J-V8.128's mark. Ends: DR44's source clause and §10.2 (b) (l. 15498) |
| VAH-r2-03 | V08 | FIXED | V08 §2.7 l. 1291's undo cell, as required |
| VAH-r2-04 | V09 | CLOSED (MERGED into VAT-r2-02, fixed per R3-04) | V09 §4.21.13 (1) l. 3649–3651: R3-04's sentence verbatim; §1b, §2.12, §4.9 cite §6.3 *Plan damage*'s comparison; row 92 and T-V9-86 add a range starting at 0 |
| VAH-r2-05 | V10 | CLOSED (MERGED into VAT-r2-03, fixed per R3-04) | V10 §3.9a l. 1818–1821; the kind row, row 35 and T-V10-53 cite the comparison |
| VAH-r2-06 | V10 | FIXED (R3-16 (f), first form) | V10 §2.13 l. 1002 and l. 1005: §2.9's shapes as stored, with the read rule of a preview naming no row |
| VAH-r2-07 | V10 | FIXED (R3-13) | T-V10-52 (l. 3120): no withheld plague, an `infiltrated` none-row condition, DR44 cited; row 34. End: T-V9-85 (l. 4368) as R3-13 words it; §3.16 row 90 and §4.21.12 (6) name DR44's tier. T-V10-52's list of the look-bearing conditions now misses its own disaster — VAH-r3-08 below |
| VAH-r2-08 | V09 | FIXED | V09 §4.21.13 (1) l. 3659–3663, row 92, T-V9-86, §2.12's and §1b's rows read at `effectiveKey()`; agrees with V10 §3.9a's *Knowledge* (l. 1848–1851) row for row |
| VAH-r2-09 | V08 | FIXED | V08 §2.4's field table l. 637, 641–643, 647, 668–669, as required. The script finds four further omissions of the same class (DR27, DR24) — VAH-r3-05 below |
| VAH-r2-10 | V08 | FIXED | V08 l. 1724 and T-V8-22 read "T1 `intend`'s `adjust`"; J-V8.34 kept as a record |

## Issues

### VAH-r3-01 — minor · HANDOFF-OPEN · owner V10

**Claim.** V09 deleted the `crisis.look.<kind>` catalogue family this round (VV1112-r2-14): each look is worded by its
`crisis.looks` row's `label` (V11 §3.25.9), and V09's repair handed the change to V10. Three V10 sites still name the
family:
* §1.2's V09 row (l. 202): "the crisis looks' list and lines (V09 §4.21.12: `crisis.look.<kind>`, `info.crisis.*`) …
  whose words the clerk renders";
* T-V10-29 (l. 3097): "every `info.damage.*`, `info.crisis.*` and `crisis.look.<kind>` key V10 §3.9a and V10 §3.9b (8)
  render" has a catalogue key in every shipped locale;
* CVR-V10-22 (l. 3449): "the `crisis.look.<kind>`, `info.crisis.*` and `info.damage.*` rows".

V10's own render path agrees with V09: `LookAnswer.crises.looks[].says` is V09's `info.crisis.*` line with its slots
filled as V09 §4.21.12 (4) fills them (`{look}` the row's `label`), so nothing built changes; only a dependency row, a
compile test's key list and a request row name a family that no longer exists.

**Required change.** V10 l. 202: "(V09 §4.21.12: `info.crisis.*`, each look worded by its `crisis.looks` row's `label`,
V11 §3.25.9)". T-V10-29: drop "and `crisis.look.<kind>`", reading "every `info.damage.*` and `info.crisis.*` key V10
§3.9a and V10 §3.9b (8) render". CVR-V10-22: "the `info.crisis.*` and `info.damage.*` rows (each look's words its
`crisis.looks` row's `label`, V11 §3.25.9)".

### VAH-r3-02 — major · DISAGREE · owner V09

**Claim.** R3-10 ends a disaster's ruined look building by building: once a Works other than a `decay` Works has
begun on a building, V06 §3.22 (3)'s `crisisLookYields` is true and the look leaves that building, while the rest of
its district keeps it. Every reader took it except V09:
* V03 §5.6 (4) (l. 2722–2734): a building draws the look only while "not yet handed over (`crisisLookYields`)";
  `PlanDamage.level` then falls to the own level and `PlanDamage.look` to null.
* V10 §3.9a *A disaster's look* (l. 1852–1855): "each until its rebuilding Works begins"; V10 §3.9b (8) *A ruined
  district*: "the drawn ruin leaving with the condition or its rebuilding Works".
* §10.2 (f) (l. 15575), §8.2 (l. 13013) and V02 §5.7 (1) say the same.

V09 decides by district alone. §4.21.13 (3) (l. 3668–3672): "In a district a disaster look ruins, the plan panel …
shows the building's lines at the look's `lookLevel` by severity, or at its own level where that is higher, under the
head `info.crisis.ruinedFor`". §4.21.12 (4) (l. 3604–3609) and §5.8 (l. 3952–3953) give "a building in a district a
disaster look ruins" the why card's `facts` row "For now: {look}, {condition}, weeks {a}–{b}". §1b's and §2.12's
damage-lines rows (l. 378, 1008) read "a disaster look's `lookLevel` … over the look's `districts`". Row 92 and T-V9-86
test no building under its rebuild.

So for a building of a struck district whose rebuild Works has begun — the normal path of a `reconstruction` condition,
which is the look's own source under R3-09 — V09's panel lists ruin lines at `lookLevel` and calls it "ruined for now",
while V03 draws its plan at its own level, V02 and §8.2 draw it under scaffolding, and V10 tells the user the look has
left it. Two members, two outcomes for one case.

**Required change.**
* V09 §4.21.13 (3): "On a building a disaster look stands over — one of the look's `districts` (§11.2's `looks`
  reader), not yet handed over to a Works (V06 §3.22 (3)'s `crisisLookYields`, read through V03's `planDamage`:
  `PlanDamage.look` set; a preview never hands over) — the plan panel shows its lines at `PlanDamage.level` (the
  look's `lookLevel` by severity, or its own level where higher) under the head `info.crisis.ruinedFor`; once handed
  over it shows its own lines and head (V09 §4.21.13 (1))", the rest as it stands.
* V09 §4.21.12 (4) and §5.8: the `facts` row `info.crisis.ruinedFor` is given to "a building a disaster look stands
  over (one of its `districts`, not yet handed over, V06 §3.22 (3); V03 §5.6 (4))".
* §1b's and §2.12's damage-lines rows name `PlanDamage.look` as the input.
* §3.16 row 92 adds "a building of a struck district whose rebuild Works has begun → its own level's lines and head, no
  `info.crisis.ruinedFor`".
* T-V9-86 adds that clause on T-V3-40's (or T-V6-75's) fixture, a rebuild begun on one building of the district.

### VAH-r3-03 — minor · DISAGREE · owner V09

**Claim.** V09 §4.21.13 (1) (l. 3649–3651) glosses the damaged set as "§6.3 *Plan damage*'s comparison — an element
shows damaged while the building's decay level is above 0 and at least its threshold t". It omits §2.6 step 7's one
case with no threshold (R3-05): while a building is `decayed` or `ruined`, every roof bay over a room of a wing whose
`RoofSpec.kind` is `none` is damaged whatever its t. V10 §3.9a states that case (l. 1821–1822, and in its kind row),
and V03's `planDamage`, which V09's lines read, carries it (V03 §5.6 (2) (c)). For a roofless decayed wing at a level
below a bay's t, V09's text gives no `roofBay` line and V10's rows give one. Nothing built changes, since V09's lines
are V03's layer; only V09's gloss is narrower. It is the same omission as verify-determinism-r3t's VDC3-02 at §6.3,
and one fix with it.

**Required change.** V09 §4.21.13 (1), after "(a level of 0 damages nothing, so a never-decayed building draws its
plan unchanged)": "; and, while the building is `decayed` or `ruined`, every roof bay over a room of a roofless wing
(`RoofSpec.kind` `none`) whatever its threshold (§2.6 step 7)".

### VAH-r3-04 — minor · DISAGREE · owner V08

**Claim.** R3-18 gives the creation week and the present at creation one name each, everywhere (§4.11 *The clock*
(1), l. 8330–8334): the **present at creation** is the dossier's present week; the **creation week** is the week of the
`generate` event — that present, except on a history-first document, whose `generate` event stands at the replay's
start. V08 still names the dossier's present week "the creation week" in three places:
* §3.16 (4) (l. 2420): "It is the creation's week (§4.11 *The clock* (1)) and §2.9's `week` default";
* W64 (l. 291): `presentWeek` feeds "§4.11's clock (the creation week; V08 §3.6 (3)'s `W₁`)";
* the field table's present-week row (l. 672): "§4.11's clock — the creation week and V08 §3.6 (3)'s `W₁`".

A dossier with a history is a history-first creation (V08 §3.15), so for it the two values differ. The value V08
feeds is the right one (the present); only the name is R3-18's other value. This is the same slip as
verify-model-r3t's VM-R3T-02 at V08 §3.15 (l. 2318), and one fix with it.

**Required change.** In the three sites "the creation week" / "the creation's week" reads "the present at creation
(§4.11 *The clock* (1))"; §3.16 (4)'s sentence reads "It is the present at creation (§4.11 *The clock* (1)) and §2.9's
`week` default".

### VAH-r3-05 — minor · DISAGREE · owner V08

**Claim.** V08 §2.4's field table is "the one list" of what each dossier path feeds. Re-running round 2's comparison
of each DR row's input cell against it finds four omissions left after VAH-r2-09's fix:
* `economicState.prosperity` (l. 647) omits DR27, whose inputs read "`wealth.label` (DR6)" (base l. 11964), as DR41's
  do, which the row names;
* `economicState.activeChains[]`, `.tradeDependencies[]`, `.customChains[]` (l. 652) omits DR27, whose inputs read "the
  active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 105 (i))";
* `institutions[]` (l. 646) omits DR27, whose inputs read the institutions and "a custom institution by its resolved
  scene archetype and `landmarkLevel`";
* `customContentProvenance`, `customContentRoster` (l. 670) omits DR24, whose inputs read "for a custom record, the
  inputs of item 104 (a)'s resolution — … admitted definition fields and keyword keys" (base l. 11961).

The reverse direction finds nothing new. The DR rows themselves are complete, so nothing built changes.

**Required change.** In V08 §2.4's field table, the feeds cells add: `economicState.prosperity` "DR27";
`economicState.activeChains[]` … "DR27 (the custom and active chains a sky fill carries)"; `institutions[]` "DR27";
`customContentProvenance`, `customContentRoster` "DR24 (a custom record's admitted definition fields)".

### VAH-r3-06 — minor · DISAGREE · owner V11

**Claim.** At THORP, HAMLET and VILLAGE a disaster look's units are V07 §5.6 (3)'s `villageDisasterUnits` — "its ends,
or in an end-less thorp its toft groups" (V07 l. 3448; V01 l. 2330). V08 §3.16 (7) (b) (l. 2514) and V09 §4.21.12 (4)
say "V07's units". Four other sites say "V07's ends":
* V11 §3.25.9's `disaster` row (l. 4535): "share of the districts — at THORP, HAMLET and VILLAGE of V07's ends";
* V11 §3.26's C-crisis-tables row (l. 4802): "at THORP, HAMLET and VILLAGE a disaster's units V07's ends";
* V10 §2.13's `LookAnswer.crises.looks[].districts` comment (l. 1014): "at the village rungs V07's ends";
* V08 §3.17's combinations row (l. 2688): "V07's ends at the village rungs";
* and §11.2's `LooksAnswer.crises[].districts` comment (base l. 16163), which V10 restates.

At an end-less thorp these read as no unit, where V07 and V01 ruin its toft groups. The placement reads V01's
`disasterDistricts`, so nothing built changes. This is the same slip verify-vol-V01-V02-r3t raised as behaviour at V02
and V03 (VV12-r3-01, VV12-r3-04).

**Required change.** V11 l. 4535 and l. 4802 read "V07's units (V07 §5.6 (3): its ends, or an end-less thorp's toft
groups)". Second ends for the adjudicator: V10 l. 1014 and V08 l. 2688 read "V07's units"; §11.2's
`LooksAnswer.crises[].districts` comment (rendering) reads "at the village rungs V07 §5.6 (3)'s units".

### VAH-r3-07 — minor · DISAGREE · owner determinism

**Claim.** DR44 (l. 11981), the tier's home since R3-13, ends its key-form clause "(V08 §3.16 (7) (e); J-V8.128)".
V08 §3.16 (7) (e) is now, by R3-13's END line, a citation of DR44 ("at the tier DR44 states … (J-V8.128)"). The home
therefore cites as its source a sentence that cites it back. The wording was VAH-r2-01's required change, written while
(7) (e) still stated the rule.

**Required change.** DR44's clause reads "a key form listing the overlay's address admits it whatever its tier
(J-V8.128)".

### VAH-r3-08 — minor · DISAGREE · owner V10

**Claim.** T-V10-52 (l. 3120) carries, by R3-09 (e), "a fire calamity naming a district with its linked
`reconstruction` condition". By V08 §3.16 (7) (b) and DR44 that condition carries `event` `calamity`, reads the
`disaster` row and is look-bearing, so public at every key. The test's knowledge clause still enumerates "at `public`
every look-bearing condition — the siege, the refugee wave and the plague — is listed", which misses the fourth look
its own fixture stands. A test written from the enumeration either misses the disaster look or fails on it; the clause's
own "lists exactly §11.2's `looks` answer's crises" decides, so the enumeration only misstates it.

**Required change.** T-V10-52: "at `public` every look-bearing condition — the siege, the refugee wave, the plague and
the fire's linked `reconstruction` condition (its disaster look) — is listed with its name and weeks (§7.7's DR44)".

### VAH-r3-09 — minor · HANDOFF-OPEN · owner V07

**Claim.** V09's repair handed V07 the deleted look word (repair-r3-V09 HAND-OFFS). V07 §4.5's crisis line (l. 3125)
still gives its example as "For now: Disaster, the mill-end fire, weeks 30–34". `{look}` is the `crisis.looks` row's
`label` (V09 §4.21.12 (4); V11 §3.25.9), and the `disaster` row's label is "Ruined quarters". Under R3-09 the
`{condition}` is the linked condition's name. Nothing built changes.

**Required change.** V07 l. 3125's example reads "For now: Ruined quarters, the mill-end fire, weeks 30–34".

### VAH-r3-10 — minor · DISAGREE · owner V08

**Claim.** V08 §2.7's lifecycle row for a dossier entry's Find chip (l. 1315) gives its persistence as "§2.9's view key
`find` — the per-viewer view state, kept in view pins, outside the model, its hash and the log". §2.9 (l. 3388–3389)
saves `find` "with the other view keys (`Document.view`; item 120 (a))", and V10's row (l. 1065) says "kept as view state
is (view pins included)". V08 names the secondary store alone. V07 dropped the same reading this round (its "saved only
in view pins") and its repair recorded V08's row for the seam check (repair-r3-V07 HAND-OFFS (1)).

**Required change.** V08 l. 1315's persist cell: "§2.9's view key `find` — the per-viewer view state, saved with the
other view keys (`Document.view`) and in view pins, outside the model, its hash and the log (item 120 (a))".

### VAH-r3-11 — minor · HANDOFF-OPEN · owner V08

**Claim.** X-V12-5 (V12 l. 3406; destination V08 §7) asks for crisis fixtures with "one week standing a siege, a
quarantine and a refugee wave at once at CITY and at the METROPOLIS cap, their camped ground together past
`densityCap`". V12 §3.15.12 (l. 2686–2687) measures T122-6's share on that week, and repair-r3-V12 handed the clause to
V08. V08 §7.1's fixtures sentence (l. 3188–3196), which defines the fixtures, lists the siege, refugee wave, plague and
the rest "each standing through part of the year at its severity", with no shared week. A builder reading §7.1 alone
may stagger them, leaving V12's density-cap case with no week. V08 cites X-V12-5 in the same sentence, so the request is
one step away.

**Required change.** V08 §7.1's fixtures sentence adds after "each standing through part of the year at its severity":
"— at `city-1` and `metropolis-3` with one week in which the siege, the plague's quarantine and the refugee wave stand at
once, their camped ground together past `densityCap` (V12 §3.15.12's share)".

## Hand-offs checked at their destinations

* **determinism → V09** (§4.21.14 (3), (4)). (3) is closed: V09 reads the columns at `yearWeek` (l. 3691–3692). (4)'s
  replay inputs are open: VDC3-11 (peer).
* **V08 → scope §14** (`PortNote.kind` `line_differs`; the `settlement.key` and seed comments): open, VV78-r3-05 (peer).
  **V08 → determinism** (§7.7 item 12's minted key): open, VDC3-03 (peer). **V08 → rendering §11.3** (no sender for a
  host's `setLayer`): open, VV78-r3-04 (peer). **V08 → V12** (R3-26's registrations): closed (V12 l. 1715, §2.13 rows
  `item122.crises` and `item125.host`).
* **V09 → V10** (the deleted `crisis.look.<kind>`): open, **VAH-r3-01**. **V09 → V07** (the example's word): open,
  **VAH-r3-09**. **V09 → rendering** (the `looks` reader and the gazetteer's `week`): closed (§11.2 l. 16122, 16157).
  **V09 → determinism** (E-07's three keys): closed (l. 10462). **V09 → V06** (a host creation offers no cancel): closed
  (V06 l. 3168, 3964). **V09 → V03** (`head.restored`): closed (V03 l. 2378–2379).
* **V10 → rendering** (`LooksAnswer.festivals[].name?` absent): no defect — V10 and V09 each word an unnamed generic
  festival by V09's `view.festival.<id>`. **V10 → V09** (`head.restored`) and **V10 → V03** (*Decay re-cuts no plan*):
  closed.
* **V11 → V12** (six registrations): closed (V12 l. 1715). **V11 → V08** (§3.16 (7) (b)'s linked condition): closed.
  **V11 → scope** (T122-4 names the crisis events): closed. **V11 → V09** (`noneNow`): closed.
* **V06 → V08** (§6's absorb rows own the catch-up's per-event term): open, VV56-r2-04 (peer). **V06 → V10** (the
  per-element `decayPeak`): closed (V10 l. 1829).
* **V03 → V09** (`storeyGone` counts `upperFloor` areas): open, VV34-r3-03 (peer).
* **V07 → V08** (the Find chip's persistence): open, **VAH-r3-10**. **V12 → V08** (the crisis fixtures' shared week):
  open, **VAH-r3-11**.

## Agreeing across the members

* **The adapter and the one input.** §14's `HostContext` comment and port item 5, §11.3, §7.7 item 1 and V08 §2.4,
  §3.16 (9) state one rule: the dossier selects its adapter, `line` is checked and never chosen from, and every read
  field has a reported fallback.
* **The crisis looks' source and tier.** DR44, §10.2 (b), V08 §3.16 (7) (b) and (e), V11 §3.25.9 (its `event` row
  `calamity` and *The readings*), V09 §4.21.12 (6) and V10 §3.9b (8) agree on the source word (stressor type, census
  event, the linked condition's `calamity`, else the archetype), on one look per calamity, on the stressor pairing and
  on the tier (look-bearing public, `none`-row secret, a key form admitting).
* **The `looks` reader and Find at a drawn week.** §11.2's `LooksAnswer` fields are what V09 §4.21.12 (3)–(7) and V10's
  `LookAnswer` projection read, and §11.2's gazetteer `week` is what V09 §4.21.10 (7)–(8) and V10 §3.9b (7) pass.
* **The host's commands.** §7.7 item 1, §11.3, V08 `setView` and §3.16 (4), (6) (g), V09 §4.2, §4.21.7 (2), row 94 and
  T-V9-77, and T-V8-54 agree: `view.set { week }` moves the drawn week only, `select` travels, and the layers go as a
  logged `setLayer`. The sender gap is VV78-r3-04.
* **Damage.** §6.3, V09 §4.21.13, V10 §3.9a and V11 §3.25.10 read one comparison (R3-04), the `restored` head, the
  per-element peak and the decay run's start and default age (R3-06, R3-08). The exceptions are VAH-r3-02, VAH-r3-03 and
  VDC3-02 (peer).
* **Weather.** §6.1, V11 §3.25.11 and V09 §4.21.14 agree on the live rate, the live hours, the commonest live kind,
  `noneNow` and the sites read at the head. The open points are VDC3-01, VDC3-09 and VDC3-11 (peers).
* **E-07's `addUndergroundAccess`** (§7.1 l. 10462) names `bend.under.basement`, `refuse.under.basement` and
  `refuse.under.route`, and V09 §4.9 (l. 2042–2044) and §4.17 write them.

## Concurred, not re-raised (landed peers' ids)

* **VV78-r3-01** (V08): `select` refuses a dossier missing a required key `E_LINE_UNSUPPORTED`, against B3 and T-V8-31.
* **VV78-r3-02** (V08): a population above 10⁷ takes the fallback, against §1.1's and B7's cap refusal.
* **VV78-r3-04** (V08) and **VRC3T-02** (model): a host's `setLayer` has no sender; §2.9 still lists the layers among
  view state.
* **VV78-r3-05** (scope) and **VDC3-03** (determinism): §14's port types and §7.7 item 12's key law do not carry V08's
  `line_differs`, the minted key or the seed fallback.
* **VDC3-01, VDC3-09, VDC3-11** (determinism, V09): a press while a spell runs, and the timeline's replay inputs.
* **VDC3-02** (determinism): §6.3 omits the roofless case. VAH-r3-03 is its V09 end.
* **VDC3-04** (determinism): DR44's totality omits the crisis events.
* **VM-R3T-02** (model, with a V08 end at §3.15) and **VPC-R3-05**: `HistoryHint.calamities` and the creation week.
  VAH-r3-04 is the same slip at V08's other three sites.
* **VPC-R3-01** (scope): T76-1 lacks the calamity cadence trigger.
* **VV56-r2-04** (V08): the catch-up's per-event absorb has no pre-decided change.
* **VV34-r3-03** (V09): `storeyGone` counted from every floor area against V03's `upperFloor` areas.
* **VRC3T-01, VV12-r3-03** (rendering, V01): a match at a drawn week whose frame is not the head.
* **VV12-r3-01, VV12-r3-04** (V02, V03): the village disaster units read as ends.
* **VCS-r3-03, -04, -05** (V08, V10, V11): test heads naming no base bar.

## Coverage

All five members and their ten pairs were covered. Every round-2 finding was re-checked at its owner and at each END
line's second end. Every round-3 hunk of the five members was read. The subsections where a hunk meets another member
were read whole, against the canon's agreement matrix for these pairs and the rulings R3-04 – R3-24 that touch them.
§7.7's DR rows were compared with V08's field table by script in both directions. Every hand-off the eighteen repair-r3
preambles address to or from a member was checked at its destination. Units outside the members appear only where a
member's statement meets them (V03, V06, V07, V12 and rendering's §11.2 above).
