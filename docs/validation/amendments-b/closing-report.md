# amendments-b closing — the Fable seat's confirmation of repair round 3 and the hand-fix list

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/closing; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned validate.md, assemble-r3, six verify-r3 reports, AMENDMENTS-2026-09-25b, live §2.6 / §4.7 / §5.2 / §7.2 / §7.4 / §7.7 / §4.11 | done
ITEM confirm-53: planned the 53 validator issues against doc 1a861c72… / rationale 8a24a5a7… | done (§1: 53 FIXED)
ITEM consolidate-45: planned the 45 verify-r3 issues de-duplicated, each claim checked, one required change each | done (§2: 31 primaries, 15 merged ids)
ITEM rulings: planned the closing seat's rulings where proposals conflict | done (§3)
ITEM summary: planned docs/validation/amendments-b/SUMMARY.md for the owner | done (256 lines, plain language, every item quoted)
ITEM close-out: planned queue row, LANDED line | done (row A-amendments-b/closing; LANDED line)

Lane `amendments-b/closing`, 2026-09-27. Documents judged: `docs/ARCHITECTURE.md` sha256 `1a861c72…` (13 028 lines,
1 618 241 bytes, 145 headings) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `8a24a5a7…` (2 051 lines), as assemble-r3
installed them; neither changed during this lane. This seat edits no design text: the issues of §2 go to the hand fix.

## Outcome

* **The validator's 53 issues are all FIXED** as required (§1): 48 by the required wording, 5 by an equivalent the repair
  seats recorded (code marks dropped, "as `Basement.access` says" for "by `Basement.access`", Part A sentences
  reworded). None is returned.
* **The re-verification's 45 issues fold into 31** (§2): 2 major, 29 minor; owners determinism 12, scope 8, model 7,
  pipeline 3, kernel 1. Every claim was checked on the live text (CONFIRMED), and every old string a required change
  quotes occurs exactly once in its file (63 anchors, script; the three apparent misses are an ellipsis prefix and an
  anchor that the change scopes to the index row).
* **The one owner-rule conflict left** is the major pair VP3-01 / VD3-01: a household of a dossier's roster that its
  district's buildings cannot hold could be taken off the map, against item 20 (b) and (e). The closing ruling (§3.1)
  re-provides its housing inside the district by the solver's `dossier` request, which always places.
* No issue needs the owner: each is a repair inside a ruling already taken, or a closing ruling recorded as a vetoable
  judgment call (J-A28.46, J-A28.23, J-A28.26, J-A29.25, J-A30.25 new, J-A22.76, J-A28.73, J-A16.01).

## 1 The validator's 53 issues, re-checked on the installed text

Method: a probe script (scratchpad `close/needles.py`) searched the whitespace-normalised document and rationale for each
issue's required new text and for its retired text; the five probes that missed were read in place and are equivalents.
The six verify-r3 seats had each read their part's fixes line by line and found all of them FIXED; this table confirms
them independently. Columns: id · severity · owner · verdict · the live text that carries the fix.

| id | severity | owner | verdict | evidence (live text) |
|---|---|---|---|---|
| V-MAB2-01 | major | model | FIXED | "The bound holds through every change"; "re-homes the households past the capacity, the last in address order, by §4.7's overflow p" |
| VD2-01 | major | determinism | FIXED | "A map event — one a user, or a host's map edit, appends without `EditBase.dossier` —"; "An `epoch` is bound by the same rule without being refused by it"; retired text absent |
| VD2-02 | major | pipeline | FIXED | "Dossier content across epochs"; "a dossier-backed use never closes by this rule" |
| V-MAB2-06 | minor | model | FIXED | "the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6)" (worded without code marks); "the wing rings or a spanned passage's face" |
| V-MAB2-07 | minor | model | FIXED | "every such composed wing, and no other"; retired text absent |
| V-MAB2-08 | minor | model | FIXED | "change no geometry and leave it"; retired text absent |
| V-MAB2-09 | minor | model | FIXED | "clip order"; "wholly inside another's is taken after that container"; retired text absent |
| V-MAB2-10 | minor | model | FIXED | "`Basement.access`, derived with it: `external` for a walk-out"; "the basement as `Basement.access` says" (step 3, reworded); retired text absent |
| V-MAB2-12 | minor | model | FIXED | "with no epoch every residential building houses what §4.7's generation fill gives it"; retired text absent |
| V-MAB2-13 | minor | model | FIXED | "the roofless state the decline ladder's decay sets — derelict, and kept through ruin" (without code marks); retired text absent |
| V-MAB2-02 | minor | pipeline | FIXED | "The overflow pass runs inside every change §2.6's capacity rule lists"; retired text absent |
| VP2-02 | minor | pipeline | FIXED | "re-bands every live plot's `fieldBand` against its own column by §4.5's rule"; retired text absent |
| V-MAB2-11 | minor | pipeline | FIXED | "the access §2.6's basement decision derives into Basement.access" |
| VP2-01 | minor | pipeline | FIXED | "at least one household and at most the row's `households.built`"; "A residential slot the demand cannot fill is dropped from the plot's site plan"; retired text absent |
| VP2-03 | minor | pipeline | FIXED | "sends `crowdingShare` of the residual's poorest-band households underground"; retired text absent |
| VP2-04 | minor | pipeline | FIXED | "no plot fronts two records"; "each part keyed by §6.3's SPLIT rule for a tunnel record"; retired text absent |
| VAL-01 | minor | pipeline | FIXED | "the wing rings or a spanned passage's face, the households, a table slice it cites, or a d" |
| VAL-02 | minor | pipeline | FIXED | "area-weighted mean prosperity value"; "so that every rung's districts meet their scaled targets"; retired text absent |
| V-MAB2-04 | minor | determinism | FIXED | "never `fieldBand`, derived state written only by a derivation that reads the current field"; "each base wing's `spans` (written and cleared only by S11" |
| V-MAB2-05 | minor | determinism | FIXED | "which the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pa"; retired text absent |
| VD2-06 | minor | determinism | FIXED | "Stored compositions, spanned passages and re-homed households" |
| VD2-07 | minor | determinism | FIXED | "re-homes the excess by §2.6's capacity rule" |
| VP2-05 | minor | determinism | FIXED | "A **tunnel record** split by a stretch conversion" |
| VP2-07 | minor | determinism | FIXED | "S11's overflow pass (§4.7, item 28 (f)) finds no residential building of the district with"; "a household S11's overflow pass cannot house takes the last rung alone" |
| VD2-04 | minor | determinism | FIXED | "without the `composition`-role vertices a stored plan's re-cut adds"; "shell subtrees, so read, against their pre-epoch values" |
| VK2-06 | minor | determinism | FIXED | "seed clip or transient arena refuses"; "its clip order leaves no seed piece with a hole" |
| VD2-11 | minor | determinism | FIXED | "at the next candidate of"; "a deterministic move that reads no stream"; retired text absent |
| VD2-12 | minor | determinism | FIXED | "`UndergroundRule` and the tunnel profile table `TunnelProfileRow`" |
| VD2-13 | minor | determinism | FIXED | "the assignment as the dossier's live events leave it"; retired text absent |
| VK2-01 | minor | kernel | FIXED | "never the unit of an answer" |
| VK2-02 | minor | kernel | FIXED | "on an edge that lies on more than one input side"; retired text absent |
| VK2-03 | minor | kernel | FIXED | "passes as `fixed` rings the rings §2.6's re-cut rule fixes" |
| VK2-04 | minor | kernel | FIXED | "in the caller's clip order"; "§2.6's clip order puts a contained wing after its container, so the refusal marks a caller"; retired text absent |
| V-MAB2-15 | minor | kernel | FIXED | "a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)" |
| VR2-04 | minor | kernel | FIXED | "(the side with its square root; item 9; the cap figures: §12.2)" |
| VR2-01 | minor | rendering | FIXED | "one per base wing that spans the passage"; "the spanning wing's base plus the passage's `headroomCm`"; retired text absent |
| VR2-02 | minor | rendering | FIXED | "never runs `compose()`, `plan()` or close-up derivation" |
| VR2-03 | minor | rendering | FIXED | "the seed clip where the storey's wings overlap (one `tileRings` overlay)" |
| VS2-01 | minor | scope | FIXED | "`Identity.dossier`, a `DossierRef` (§7.1)"; "the occupants' band memory `Plot.fieldBand` in §2.5 (J-A28.29)" |
| VS2-02 | minor | scope | FIXED | "or, for a walk-out (`Basement.access` `'external'`), by its outside stair"; retired text absent |
| VS2-03 | minor | scope | FIXED | "(T20-6)"; "T20-6's refusal clause"; retired text absent |
| VP2-09 | minor | scope | FIXED | "(T19-4) with no epoch every residential building houses at least one household and at most"; retired text absent |
| VS2-05 | minor | scope | FIXED | "`portRef` equals the median port demand fraction" |
| VP2-11 | minor | scope | FIXED | "after an `amalgamate` that builds nothing it is the `builtBand` of the member" |
| VP2-12 | minor | scope | FIXED | "a `caveIn` given a stretch splits the tunnel" |
| VP2-13 | minor | scope | FIXED | "vacancy share, crowding share and arrangement restriction" |
| VK2-08 | minor | scope | FIXED | "every crossing vertex a vertex of both rings, the joint shared vertex for vertex"; retired text absent |
| VK2-09 | minor | scope | FIXED | "on booleans, `tileRings`"; "on an earlier ring wholly inside a later one (refused" |
| VS2-11 | minor | scope | FIXED | "// the frame scales with the requested population (§3.2 (9))"; retired text absent |
| VR2-06 | minor | scope | FIXED | "is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`" |
| VAL-03 | minor | scope | FIXED | "T31-9" |
| VAL-04 | minor | scope | FIXED | "and until one of those a plot's geometry never reads poorer than the middle band" |
| VAL-05 | minor | scope | FIXED | "its §4.6 target"; retired text absent |

## 2 The hand-fix list: the 45 verify-r3 issues as 31, in apply order

Each primary carries its merged ids; each required change is the one text to apply (old strings quoted exactly; every one
occurs once in its file). The rulings behind the reconciled texts are in §3.

| # | id (merged ids) | owner | severity · kind | item |
|---|---|---|---|---|
| 1 | VP3-04 | pipeline | minor · partial | 28 (f) |
| 2 | VP3-01 (= VD3-02) | pipeline | major · conflict | 20 (b), (e); 28 (f) |
| 3 | VD3-01 (= VP3-02) | determinism | major · conflict | 20 (b), (e); 28 (f) |
| 4 | VS3-04 (= VD3-12 (2), VP3-03) | scope | minor · partial | 20; 28 (f) |
| 5 | V-MAB3-01 (= VD3-11, VP3-07) | model | minor · new-problem | 28 (f) |
| 6 | V-MAB3-08 | determinism | minor · broken-reference | 28 (f); 30 |
| 7 | VR3-01 | model | minor · partial | 30 |
| 8 | VD3-05 (= V-MAB3-07) | determinism | minor · missing | 28 (f) |
| 9 | VD3-06 (= V-MAB3-10) | determinism | minor · duplicate | 28 (f) |
| 10 | VD3-07 | determinism | minor · stale | 28 (f) |
| 11 | VD3-08 | determinism | minor · broken-reference | 28 (f) |
| 12 | V-MAB3-09 | determinism | minor · conflict | 28 (f) |
| 13 | VS3-05 (= VD3-12 (1), (3), V-MAB3-06) | scope | minor · missing | 28 (f) |
| 14 | V-MAB3-02 (= VR3-02) | model | minor · partial | 28 (f); 30 |
| 15 | VK3-01 | model | minor · conflict | 28 |
| 16 | V-MAB3-03 | model | minor · new-problem | 29 |
| 17 | VS3-07 (= V-MAB3-11) | scope | minor · conflict | 29 |
| 18 | V-MAB3-04 | model | minor · new-problem | 29 |
| 19 | V-MAB3-05 | model | minor · conflict | 28 (f) |
| 20 | VS3-08 (= V-MAB3-12) | scope | minor · conflict | 28 (f) |
| 21 | VP3-05 | pipeline | minor · partial | 11 |
| 22 | VD3-10 (= VP3-06) | determinism | minor · partial | 11 |
| 23 | VS3-03 | scope | minor · partial | 11 |
| 24 | VD3-03 | determinism | minor · conflict | 20; 17 (d) |
| 25 | VD3-04 | determinism | minor · conflict | 20 (c); 22 |
| 26 | VD3-09 | determinism | minor · new-problem | 28 (f) |
| 27 | VP3-08 | determinism | minor · stale | 28 (f) |
| 28 | VK3-02 | kernel | minor · stale | 28 (f) |
| 29 | VS3-01 | scope | minor · partial | 20 |
| 30 | VS3-02 | scope | minor · missing | 28 (f) |
| 31 | VS3-06 (= VK3-03) | scope | minor · new-problem | 28 |

### 1. VP3-04 — minor · partial · pipeline · item 28 (f)

**Claim and check.** Round 3's fill works per 'residential slot', with three gaps: no typed field marks a slot residential (`DesignationTemplateRow.structures` is {role, count, footprintShare, required}; `BuildingSlot` has role and entranceOn); dropping an unfillable slot can drop a structure the template marks `required` or take it below its count; and 'S11 … writes `Building.households` … clamped into [1, capacity]' reads as applying to every building of the plot, so a workshop or stable would need a household. CONFIRMED on the text. CLOSING NOTE: (4) also carries V-MAB3-01's lock rule into §4.7's clamp (the regeneration case VP3-07 named), since both edit the same sentence.

**Required change.** (1) §10.2: replace 'structures: { role: string; count: [number, number]; footprintShare: number; required: boolean }[]' with 'structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in workplace's main slot is one */ }[]'. (2) §4.7: replace 'per residential slot of the plot's designation template row at least one household' with 'per residential slot (a structure with `houses`, §10.2) of the plot's designation template row at least one household'. (3) §4.7: replace 'A residential slot the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, and a residential plot none of whose slots it can fill is typed vacant by S10b's reconcile (above)' with 'A residential slot the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, never below its structure's least `count` where the structure is `required`; a residential plot whose required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households placed on the next candidate'. (4) §4.7: replace 'which creates each building and its wings, writes `Building.households` from its slot's households in address order, clamped into [1, capacity]' with 'which creates each building and its wings, writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other building's list is empty) from its slot's households in address order, clamped into [1, capacity], a locked or pinned household kept before the clamp drops any (§7.2; §2.6's capacity rule)'. Apply before VP3-01.

### 2. VP3-01 (= VD3-02) — major · conflict · pipeline · item 20 (b), (e); 28 (f)

**Claim and check.** Same as VD3-02. §4.7 'Households per building' sends 'a household no building of the district has room for' to F-SITING, whose last rung takes it off the manifest (J-A28.46's index row 'else an F-SITING item' and its Part A 'F-SITING's last rung alone takes off the manifest a household no building of its district can hold'). §7.7 item 2 makes the dossier's population dossier-backed ('F-SITING never drops it'), and the owner's item 20 says the population 'EXISTS on every map' ((b)) and that 'housing for its population is re-provided elsewhere' ((e)). So a household of a dossier's roster has two contradictory fates. The text conflict is CONFIRMED (closing seat, on 1a861c72…); the trigger — a district whose shells hold fewer households than its roster places there, at generation or after a §7.6 edit of households.max — is PLAUSIBLE. CLOSING RULING (the pipeline and determinism verifiers' proposals reconciled): the housing is re-provided inside the district by S10b's `dossier` request in the post-build least-disruption order §4.7 already states (vacant plots and vacancy runs, under-used plots, a plot whose use can move, a JOIN), whose closest-option rule always places (J-A20.42), so no terminal drop remains; the district bound keeps the laziness contract. Apply after VP3-04 (the `houses` flag) and with VD3-01 and VS3-04.

**Required change.** (1) §4.7 'Households per building': replace 'and a household no building of the district has room for is an unplaced item of F-SITING (§5.2), reported with the capacities that refused it.' with 'and a household no building of the district has room for is an unplaced item of F-SITING (§5.2), reported with the capacities that refused it — except a household of a dossier's roster (the dossier's population, §7.7 item 2), which is never taken off the manifest: its housing is re-provided inside its district (item 20 (e); J-A20.72) by S10b's `dossier` request in the least-disruption order of a request after the city is built (above: vacant plots and vacancy runs first, then under-used plots, then a plot whose use can move, then a JOIN), its first closest option where no plot passes the hard rows (J-A20.42), and S11's operator builds there a residential slot of that plot's designation template (a structure with `houses`, §10.2) for it, within that building's capacity, in the same derivation or causing event — each such build and displacement reported, a hand edit's among its dry-run fates (§7.3 item 4).' (2) J-A28.46's index row: replace 'an overflow is re-placed by S10b's solver inside the district after its last S11 batch (band, then drift; score, then address), else an F-SITING item;' with 'an overflow is re-placed by S10b's solver inside the district after its last S11 batch (band, then drift; score, then address), else an F-SITING item — never a household of a dossier's roster, whose housing S10b's `dossier` request re-provides inside the district (the post-build least-disruption order, its closest option where none passes), S11's operator building a residential slot there;'. (3) J-A28.46's Part A entry: replace 'F-SITING's last rung alone takes off the manifest a household no building of its district can hold, reported — VP2-07)' with 'F-SITING's last rung alone takes off the manifest a household no building of its district can hold, reported — VP2-07 — and never a household of a dossier's roster, whose housing the `dossier` request re-provides inside the district, over dropping it or widening the search to the town, because the owner's item 20 (b) makes the population exist on every map and (e) asks that its housing be re-provided, while the district bound keeps the result independent of the order lazy districts are placed in and the request always places (J-A20.42); closing ruling on VP3-01, VD3-01 and VD3-02)'.

### 3. VD3-01 (= VP3-02) — major · conflict · determinism · item 20 (b), (e); 28 (f)

**Claim and check.** Same as VP3-02; the §5.2 side of VP3-01. F-SITING's ladder cell lets 'a household S11's overflow pass cannot house' take 'the last rung alone — the manifest reduced by it', and its test cell accepts 'every household S2 demanded housed or reported unplaced'. Both contradict the same cell's 'never a dossier-backed item' and §7.7 item 2 for a dossier's population. CONFIRMED on the text. The mechanism is VP3-01's, at its home (§4.7); this cell points to it.

**Required change.** §5.2 F-SITING: (1) ladder cell: after 'no re-cut after S11' insert ' — never a household of a dossier's roster (§7.7 item 2), whose housing §4.7 re-provides inside its district by the `dossier` request, which always places (J-A20.42)'. (2) test cell: replace 'every household S2 demanded housed or reported unplaced (§13.2 T19-4)' with 'every household S2 demanded housed or reported unplaced, and every household of a dossier's roster housed (§13.2 T19-4)'. Apply with VP3-01.

### 4. VS3-04 (= VD3-12 (2), VP3-03) — minor · partial · scope · item 20; 28 (f)

**Claim and check.** Same as VD3-12 (2) and VP3-03, widened. T19-4's last clause, 'every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46)', passes a dossier map that drops dossier households, and no bar exercises VP3-01's re-provision. T19-4 gates M2b, but the dossier contract is M3a's, so the dossier clause needs its own milestone. CONFIRMED. Apply after VP3-01 and VD3-01.

**Required change.** §13.2 T19-4: replace 'and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46).' with 'and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household of the dossier's roster is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a).' §16 M3a exit: replace 'T20-6's refusal clause, T22-1 – T22-4' with 'T20-6's refusal clause, T19-4's dossier clause, T22-1 – T22-4'. §16 M2b exit: replace 'T16-1, T16-2, T19-1 – T19-4, T23-1's parity clauses' with 'T16-1, T16-2, T19-1 – T19-3, T19-4 but its dossier clause, T23-1's parity clauses'.

### 5. V-MAB3-01 (= VD3-11, VP3-07) — minor · new-problem · model · item 28 (f)

**Claim and check.** Same as VD3-11 and VP3-07 (part (a)). §2.6's capacity bullet re-homes 'the households past the capacity, the last in address order' with no exception for a locked or pinned household, although §7.2 makes a locked entity 'a fixed input: regeneration never changes it' and a pinned one 'keeps its existence and position'; and 'No such change is refused for it', so a hand heights edit in a full district can send a household to F-SITING's last rung. The missing rule is CONFIRMED; the failure path is PLAUSIBLE. CLOSING RULING: V-MAB3-01's wording (locked and pinned passed over; a hand edit whose excess cannot be placed refused) is adopted over VP3-07's (locked only), since §7.2 holds a pinned entity's position; it is widened so that S11's operator too leaves a building whose protected households alone would exceed its new capacity unchanged (the regeneration case VP3-07 names), and worded to VP3-01's re-provision (a dossier roster's household is always re-housed). §4.7's clamp takes the same rule through VP3-04 (4).

**Required change.** §2.6, the capacity bullet: (i) replace 're-homes the households past the capacity, the last in address order, by §4.7's overflow pass' with 're-homes the households past the capacity, the last in address order passing over a locked or pinned one (§7.2), which keeps its building, by §4.7's overflow pass'; (ii) replace 'No such change is refused for it; only a hand `relet` above the capacity is (F-EDIT).' with 'No such change is refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for (a dossier roster's household is re-housed by §4.7's re-provision) — which returns F-EDIT naming them, as a hand `relet` above the capacity does; S11's operator and an epoch's step leave a building whose locked or pinned households alone would exceed its new capacity unchanged, as a lock stops a rung-3 re-cut (§4.11) and any locked entity is a fixed input (§7.2), and a household no building of the district can take in a generation run or an epoch is F-SITING's (§5.2, J-A28.46).' (iii) J-A28.23's index row: after 'never by refusing the change' insert '; the re-homing passes over locked and pinned households, and a hand edit whose excess cannot be re-homed returns F-EDIT'. (iv) J-A28.23's Part A entry: append 'A locked or pinned household keeps its building and the re-homing passes over it; a hand edit whose excess cannot be placed is refused rather than dropping a household, because a user's edit must never delete population the dossier or the roster supplied (verify-model-r3 V-MAB3-01 with VD3-11 and VP3-07).' Apply before V-MAB3-08 and VS3-05.

### 6. V-MAB3-08 — minor · broken-reference · determinism · item 28 (f); 30

**Claim and check.** §2.6 ('a hand edit lists the moves among its dry-run fates (§7.3 item 4)') and §7.1 ('each move among its fates (§7.3 item 4)') point to a list §7.3 item 4 does not have: it gives fates to protected entities and lists unprotected consequences only for a chained edit, never a household's move; and V-MAB3-01's refusal has no case in §5.2's F-EDIT detection cell. CONFIRMED. CLOSING NOTE: VR3-01's F-EDIT companion inserts at the same anchor, so both clauses are given here as one insertion, and the fates list also names VP3-01's re-provision builds.

**Required change.** (i) §7.3 item 4: replace 'A chained edit's report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings re-based or demolished — with their lifecycle events, and every edit's report lists the names it re-draws' with 'A chained edit's report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings re-based or demolished — with their lifecycle events; every edit's report lists the households §2.6's capacity rule re-homes, each with its `relocate` event (from and to), the residential slots §4.7 builds to re-provide a dossier household's housing, and the names it re-draws'. (ii) §5.2 F-EDIT detection: replace 'or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1);' with 'or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1); a hand edit whose capacity re-homing cannot place its excess — locked or pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for (§2.6's capacity rule); a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);'. Apply after V-MAB3-01 and with VR3-01.

### 7. VR3-01 — minor · partial · model · item 30

**Claim and check.** §8.5 (2), §8.4 and §11.1's glTF and CityJSON rows read `Passage.headroomCm` (the span mark's underside, its height `eaveCm` less the headroom, the shadow and the 3-D extrusion), but §2.5 declares the field with a gloss only; nothing writes it (S10 (9) and §4.6 give the width, `drawPassage` takes `widthCm` only, and §2.6 names S11 as the writer of `spans`, not of the headroom), nothing keeps it below a spanning wing's eave, and a one-storey spanning wing gives the mark a height of zero or less. CONFIRMED (21 lines hold `headroomCm`: 6 the passage's, 15 the tunnel's). CLOSING RULING: the verifier's value rule (the least ground-storey height over the spanning base wings, every spanning wing at least two floors) is adopted and recorded as a new judgment call J-A30.25; the field is also registered as derived in §7.1 (§2.8's registry rule) and given a bar, which the verifier's text lacked.

**Required change.** (1) §2.5 `Passage`: replace "headroomCm: Cm /* the ground storey's cells it takes; the storeys above keep the frontage continuous (§2.6) */" with "headroomCm: Cm /* the passage's clear height — the ground storey it takes, the storeys above keeping the frontage continuous (§2.6): derived, written by S11 whenever it writes the spanning wings' BaseWing.spans (§4.7 S11, §2.6), and so on every re-fit, as the least ground-storey height (eaveCm ÷ floors, rounded down to the centimetre) over the base wings that span it; S11 gives every spanning wing at least two floors (raising its class row's floors to two where they would be one), so each spanning wing's eave stands above the headroom (§8.5 (2)'s span mark, §8.4, §11.1); a heights edit that would leave a spanning wing below two floors is refused (F-EDIT, §5.2) */". (2) §7.1 'Entrances, basements, passages and plans': after 'seals or reopens one by setting `Passage.sealed` (§2.5);' insert ' `Passage.headroomCm` is derived — S11 writes it with the spanning wings' `spans` (§2.5) — and has no edit kind of its own;'. (3) §5.2 F-EDIT detection: the headroom clause as V-MAB3-08 (ii) words it. (4) §13.2 T30-4: after 'a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings;' insert ' every passage with a `frontBuilding` has its `headroomCm` written, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;'. (5) J-ROWS: new index row '| J-A30.25 | `Passage.headroomCm` derived by S11 with the spans — the least ground-storey height over the base wings that span the passage — and every spanning wing at least two floors, a heights edit below that refused | §2.5, §2.6 |'. (6) RATIONALE-A: new entry '| J-A30.25 | Chose to derive a passage's clear height from the wings that span it — the least ground-storey height over them, written by S11 with `BaseWing.spans` — and to give every spanning wing at least two floors, refusing a heights edit below that, over a headroom read from a table row by band, because a covered passage takes exactly the ground storey of the building over it (the owner's passage under a house; the realism tiebreaker), so its clear height is that storey's, while a table value could stand above a low wing's eave and leave the span mark, its shadow and the 3-D export with no height; a passage with no storey over it is an alley, not a passage (verify-rendering-r3 VR3-01; closing ruling). |'.

### 8. VD3-05 (= V-MAB3-07) — minor · missing · determinism · item 28 (f)

**Claim and check.** Same as V-MAB3-07. §2.6 states the invariant `Building.households` 'never above the capacity' and 'the bound holds through every change', but §5.3's invariant suite has no capacity row ('capacity' 0 times in §5.3). CONFIRMED by grep. VD3-05's row is adopted (it adds the epoch stage-end V-MAB3-07's lacks).

**Required change.** §5.3: after the interior-ladder row insert the row '| no building houses more households than its capacity: `Building.households ≤ capacity(b)` (§2.6's one capacity function) after every committed change — the generation fill (§4.7), `relet` (§4.11) and every change §2.6's capacity rule lists, whose excess §4.7's overflow pass re-homes inside the causing event (J-A28.23, J-A28.46) | batch-local (the buildings whose wings, heights, class, plot `builtBand` or household count the batch wrote, and the receivers of its re-homing); stage-end (S11 per district after the overflow pass; each `epoch` event; a §7.6 table edit's re-derived set) | the capacity function recomputed on the touched buildings against `Building.households` |'.

### 9. VD3-06 (= V-MAB3-10) — minor · duplicate · determinism · item 28 (f)

**Claim and check.** Same as V-MAB3-10. §7.1 keeps a shorter second list of capacity-lowering changes ('a `setAttr` of its heights, a `warp` or `moveVertex` that carries its footprint or its spanned passage's face') that omits §2.6's `setAttr` of the class and the §7.6 table edits, and calls a passage face carried. CONFIRMED. VD3-06's pointer wording is adopted (single source).

**Required change.** §7.1 'Entrances, basements, passages and plans': replace 'an edit that lowers a building's capacity below its households — a `setAttr` of its heights, a `warp` or `moveVertex` that carries its footprint or its spanned passage's face — re-homes the excess by §2.6's capacity rule, each move among its fates (§7.3 item 4);' with 'an edit that lowers a building's capacity below its households — any change §2.6's capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4);'.

### 10. VD3-07 — minor · stale · determinism · item 28 (f)

**Claim and check.** §7.3's stored-plan row lists what re-cuts a stored plan inside the event — 'a `relet`, an occupants' band change at an epoch, a designation mutation (item 28 (f))' — but the home rule is general (§2.6: 'A STORED plan is instead re-cut inside the event that changes its inputs'), and round 3's re-homing, §4.7's overflow pass and item 17's relocation move households into or out of a building with a stored plan. CONFIRMED.

**Required change.** §7.3's stored-plan row, first cell: replace '— a `relet`, an occupants' band change at an epoch, a designation mutation (item 28 (f))' with '— a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28 (f))'.

### 11. VD3-08 — minor · broken-reference · determinism · item 28 (f)

**Claim and check.** §2.6 says the re-homing's 'undo restores them (§7.4)', but §7.4's rows do not say so: the setAttr row's undo cell is 'inverse (old values in the undo record)', which restores the heights and leaves the households moved; the moveVertex / warp and the editTable / editPreset rows' undo records list no households. CONFIRMED.

**Required change.** §7.4: (1) the setAttr / setAttrMany / paint row, undo cell: append '; a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6)'. (2) the moveVertex / warp row, undo cell: after 'former bases of re-based entities' insert ', and the households §2.6's capacity rule re-homed, with their former buildings'. (3) the editTable / editPreset row, undo cell: after 'restored from the undo record, never re-drawn' insert '; the households its capacity re-homing moved restored to their former buildings'.

### 12. V-MAB3-09 — minor · conflict · determinism · item 28 (f)

**Claim and check.** §7.3 item 1's new clause holds the receivers but not the building the households leave ('holds the buildings §2.6's capacity rule re-homes them into'). When a `moveVertex` on a spanned passage's far side lowers an unstored front building's capacity, that building is not otherwise in scope (the passage clause holds it only with a stored composition), so the edit writes `Building.households` outside its effective scope. CONFIRMED.

**Required change.** §7.3 item 1: replace 'holds the buildings §2.6's capacity rule re-homes them into' with 'holds that building and the buildings §2.6's capacity rule re-homes its households into'.

### 13. VS3-05 (= VD3-12 (1), (3), V-MAB3-06) — minor · missing · scope · item 28 (f)

**Claim and check.** Same as VD3-12 (1), (3) and V-MAB3-06, widened. §2.6's capacity bullet re-homes the households past a lowered capacity by §4.7's overflow pass inside the causing event, each move a `relocate` event with its dry-run fate and undo, but 're-hom' occurs 0 times in §13.2: T28-17 covers the fill after a band fall and T28-18 only the `relet` refusal, and §16 M3a's content names only `relet` reading the capacity. CONFIRMED by grep. Apply after V-MAB3-01, V-MAB3-08 and VD3-05.

**Required change.** (1) §13.2 T28-18: replace 'returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake).' with 'returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households, and each edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over) with their `relocate` moves and holds that building and the receiving buildings in its effective scope; after commit no building houses more households than its capacity (§5.3); the undo of each returns every household to its former building byte-identically; and an edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster that no residential building of the district has room for — returns F-EDIT (§2.6's capacity rule; the re-homing clause).' (2) §13.8: replace 'housing clause and T28-18's `relet` clause from M3a' with 'housing clause and T28-18's `relet` and re-homing clauses from M3a'. (3) §16 M3a exit: replace 'T28-17's housing clause, T28-18's `relet` clause, T30-3' with 'T28-17's housing clause, T28-18's `relet` and re-homing clauses, T30-3'. (4) §16 M3a content: replace '`relet` reading the household capacity M2b builds,' with '`relet` reading the household capacity M2b builds, every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6), and a dossier household's housing re-provided in its district (§4.7),'. (5) RATIONALE-A restating J-A28.01 (restated-row swap; index unchanged): replace 'T28-17's housing clause and T28-18's `relet` clause — run from M3a' with 'T28-17's housing clause and T28-18's `relet` and re-homing clauses — run from M3a'.

### 14. V-MAB3-02 (= VR3-02) — minor · partial · model · item 28 (f); 30

**Claim and check.** Same as VR3-02 for the reader list. The capacity's wing set is not fixed: the capacity bullet reads 'the union of the extents of the wings that reach storey `s` (the contract's fourth rung, above)', whose wings are base or composed; `BaseWing.spans` says the capacity reads the base wing 'before any composition exists', but `Wing.spans` ends 'read, on the base or the composed wing, by the capacity (below), the plan rung, §8.5's span mark, the shadow pass and the 3-D export', while §8.5 (2), §8.4 and §11.1 now read the base wing only. Reading a derived composition would let a click change the capacity (§6.2); reading base wings only lets a composition with fewer storeys be asked to house more households than its plan can cut (F-PLAN tier 6 treats that as a bug). CONFIRMED on the text; the composition case is PLAUSIBLE. CLOSING RULING: VR3-02's reader wording supersedes V-MAB3-02 (ii); the storey rule of (iii) binds every composition, generated or stored, and every composition edit.

**Required change.** §2.6: (i) the capacity bullet: replace 'the union of the extents of the wings that reach storey `s` (the contract's fourth rung, above):' with 'the union of the extents of the building's base wings (`Building.wings`, with their `spans`) that reach storey `s` (the contract's fourth rung, above) — never a composition's wings, stored or derived, so neither a click nor a stored composition moves it (§6.2):'. (ii) `Wing.spans`: replace 'read, on the base or the composed wing, by the capacity (below), the plan rung, §8.5's span mark, the shadow pass and the 3-D export' with 'read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung'. (iii) the stage-3 contract: after 'so O17 (i)'s identical footprint hash at every LOD holds by construction (its test: §13.2).' insert ' A composition's wings — generated or stored, and after every composition edit — reach every storey its base wings reach, with at least their area at each storey, so the households the capacity admits always fit its plan (F-PLAN tier 6, §5.2).' (iv) the intake bullet: after 'so a stage-3 generator is admitted only with compositions the base can carry' insert ' and only with compositions that keep that storey rule'. (v) J-A28.28's Part A entry: append 'The capacity reads the base wings only, and every composition keeps at least their area at each storey they reach (verify-model-r3 V-MAB3-02, verify-rendering-r3 VR3-02).'

### 15. VK3-01 — minor · conflict · model · item 28

**Claim and check.** Round 3 made §3.4's `fixed` comment name 'a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)' among rings 'each inside one seed ring'. §2.6's clip order ('wing order, except that a wing whose extent there lies wholly inside another's is taken after that container') covers 'the wings reaching a storey' only: a composed tower lives in `Composition.towers`, its room named 'wings.length + the tower's index', so it has no place in the order, and no rule keeps a composer's room inside its wing's piece where that wing overlaps an earlier one. A round tower clipped after the wing it engages has its whole-ring room cross the joint; §3.4 refuses it and F-PLAN tier 2 aborts that as a bug the contract only guarantees for seeds. The textual gap is CONFIRMED; how often a tower engages a wing is PLAUSIBLE. CLOSING RULING: the tower-first order as the verifier proposed, recorded as an amendment of J-A28.26 (the clip order's own judgment call) rather than under a new id, since the model's J-A28.2x range is full (J-A28.21 – J-A28.29).

**Required change.** (1) §2.6 stage-3 contract: after '…and no piece has a hole, which the clip refuses.' insert ' A composed tower — a round wing to the plan rung — stands in the clip order before every wing its ring overlaps without lying wholly inside it (a tower wholly inside a wing follows its container, as above), so its round room is its whole ring at each storey it reaches and the wing's piece takes the arc; every other composer's room (`Composition.rooms`) lies inside its own wing's piece at its storey — the composer emits it inside that wing's extent less the extents before the wing in the clip order — so every fixed ring the plan rung passes lies inside one seed piece (§3.4's `transientArena`), and F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug.' (2) J-A28.26's index row: replace 'a wing wholly inside another's at a storey after that container' with 'a wing wholly inside another's at a storey after that container, a composed tower before the wings it engages'. (3) J-A28.26's Part A entry: append 'A composed tower stands in the clip order before every wing it engages, over taking it last with its room clipped to a partial disk, because a round tower keeps its round room (the realism tiebreaker; a composer's towers are whole) and the engaged wing's rooms take the arc as a wall; every other composer's room lies inside its own wing's piece, so every fixed ring lies inside one seed (verify-kernel-r3 VK3-01; closing ruling).'

### 16. V-MAB3-03 — minor · new-problem · model · item 29

**Claim and check.** A walk-out basement is unreachable in the plan's own graph. Step 3's `external` access stops the core 'at the ground storey' and opens the basement by 'a door (an `Opening` of kind `door`) … in the side of `Basement.ring`', while step 5 roots the room graph only at the entrances ('a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item 29 (5))'); the basement door is no `Entrance`. So F-PLAN tier 1 ('a room unreachable') fails every walk-out. CONFIRMED on the text.

**Required change.** §2.6 step 5: replace 'a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item 29 (5));' with 'a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item 29 (5)), and a walk-out basement's outside door (step 3, `external`) the root of the basement's storeys;'. Follow-up: VS3-07 (T28-2).

### 17. VS3-07 (= V-MAB3-11) — minor · conflict · scope · item 29

**Claim and check.** Same as V-MAB3-11. T28-2 ('starting at the main entrance, openings and stair cores lead to every room of every storey') fails a correct walk-out plan, whose basement §2.6 step 3 opens only by an outside door. CONFIRMED. Apply after V-MAB3-03.

**Required change.** §13.2: replace '(T28-2) starting at the main entrance, openings and stair cores lead to every room of every storey;' with '(T28-2) starting at the main entrance — and, for a basement whose `Basement.access` is `external`, at its outside door (§2.6 step 3) — openings and stair cores lead to every room of every storey;'.

### 18. V-MAB3-04 — minor · new-problem · model · item 29

**Claim and check.** The `external` access has two cases with no outcome. (a) `Basement.access` derives 'external for a walk-out, else the class's programme row's `basementAccess`', and §10.2's column type admits 'external' although its own comment says the column serves 'a cellar that is no walk-out', so a level-ground cellar can derive `external` and step 3 opens a door in a buried wall. (b) The door goes in 'the side of `Basement.ring` whose midpoint samples lowest', with no minimum side length and no fallback. Both gaps CONFIRMED on the text; (b)'s frequency is PLAUSIBLE. CLOSING RULING on (a): the column's type is narrowed to 'core'|'trapdoor' (the outside stair is derived for a walk-out alone) instead of adding a rule that reads a row's 'external' as 'trapdoor', so the schema cannot express the contradiction; (b) takes the verifier's wording with the door's length stated in the plan's own module (no door-width column exists).

**Required change.** (i) §10.2 `RoomProgramRow`: replace "basementAccess: 'core'|'trapdoor'|'external' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand; the plan rung reads Basement.access */" with "basementAccess: 'core'|'trapdoor' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */". (ii) §2.6 step 3: replace 'opens the basement in the side of `Basement.ring` whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index);' with 'opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long (a door's width), whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index) — where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —;'. (iii) J-A29.25's Part A entry: append 'A programme row names a stair core or a trapdoor only, the outside stair being derived for a walk-out alone because it needs the fall a walk-out has; a walk-out whose ring has no side a door fits takes the trapdoor fallback (verify-model-r3 V-MAB3-04).'

### 19. V-MAB3-05 — minor · conflict · model · item 28 (f)

**Claim and check.** 'Re-uniting the households removes what the subdivision added.' holds for an unstored plan (the canonical chain returns the as-built plan exactly) but not for a stored one, which §2.6 re-cuts 'inside the event that changes its inputs, around its edited and locked rooms', keeping by least disruption a room whose ring still fits a role, and whose re-cut 'establishes J-P48 (1) for its new walls', leaving `composition`-role vertices on the rings. CONFIRMED on the text; which rooms a stored re-cut keeps is PLAUSIBLE.

**Required change.** §2.6, the re-cut bullet: replace 'Re-uniting the households removes what the subdivision added.' with 'Re-uniting the households removes what the subdivision added — exactly for an unstored plan, whose canonical chain (below) returns the earlier plan; a stored plan's re-cut (below) keeps by least disruption the subdivided rooms that still fit a role, and its rings keep the `composition`-role vertices its re-cuts added (J-P48 (1)), which the shell's identity reads without; its undo restores it exactly (§7.4).' Follow-up: VS3-08 (T28-15).

### 20. VS3-08 (= V-MAB3-12) — minor · conflict · scope · item 28 (f)

**Claim and check.** Same as V-MAB3-12. T28-15 ('re-uniting the households restores the earlier plan where nothing else changed') claims an exact return that only an unstored plan gives (V-MAB3-05). CONFIRMED. Apply after V-MAB3-05.

**Required change.** §13.2: replace '(T28-15) re-uniting the households restores the earlier plan where nothing else changed (item 18 (e)'s inverse);' with '(T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the `composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4) (item 18 (e)'s inverse);'.

### 21. VP3-05 — minor · partial · pipeline · item 11

**Claim and check.** II.6 splits 'the `Frontage` records of the underground blocks along it … where one spans an end, keyed as the tunnel's parts are, and each re-pointed (`Frontage.way`)'. A `Frontage` names its kerb edges by the EdgeSetRef ('frontage', frontage id) (§2.5), so the part beyond the end has no edges until those rows move to it, the old record's set still holds both parts, and each part's `lengthCm` stays stale. CONFIRMED.

**Required change.** II.6: replace '`Frontage` records of the underground blocks along it (§2.5) split where one spans an end, keyed as the tunnel's parts are, and each re-pointed (`Frontage.way`) to the part it fronts;' with '`Frontage` records of the underground blocks along it (§2.5) split where one spans an end — the part beyond the end a new record, its kerb edges' `('frontage', id)` rows moved to it by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, both keyed by §6.3's rule for a split `Frontage` — and each re-pointed (`Frontage.way`) to the part it fronts;'. J-A11.43's Part A entry: append 'A block's `Frontage` record split at the same ends follows §6.3's rule, the part holding its first kerb edge keeping the address, so identity has one rule (verify-r3: VP3-05, VP3-06, VD3-10).' Apply with VD3-10, then VS3-03.

### 22. VD3-10 (= VP3-06) — minor · partial · determinism · item 11

**Claim and check.** Same as VP3-06. II.6 splits a block's `Frontage` record where it spans a stretch end, 'keyed as the tunnel's parts are', but §6.3 (identity's home, canon R5) states the split rule for 'a tunnel record' only and its anchor table has no `Frontage` row, so no text says which part keeps the address. CONFIRMED. CLOSING RULING: the two verifiers' wordings merged (VD3-10's 'first kerb edge in the centreline's order' and lineage clause, VP3-06's undo clause).

**Required change.** §6.3 JOIN and SPLIT bullet: after 'and every part continues the tunnel's lineage with its part index.' insert ' A block's `Frontage` record (§2.5) that the same split cuts at a stretch end (II.6) follows the same rule: the part holding the record's first kerb edge in the centreline's order keeps its address, the other takes an address minted from the causing event's `seq` and ordinal, each part continues the record's lineage with its part index, and an `undo` restores the one record (§7.4).' Apply with VP3-05, then VS3-03.

### 23. VS3-03 — minor · partial · scope · item 11

**Claim and check.** T11-1 checks only 'the chambers, access points and block frontages re-pointed', so a kernel that re-points an unsplit `Frontage` to one part passes, leaving the far part's kerb with the wrong record. CONFIRMED. Apply after VP3-05 and VD3-10.

**Required change.** §13.2 T11-1: replace 'every part continuing the lineage, the chambers, access points and block frontages re-pointed — closes only' with 'every part continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there — the part beyond the end a new record with its kerb edges' rows, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts — closes only'.

### 24. VD3-03 — minor · conflict · determinism · item 20; 17 (d)

**Claim and check.** §7.7 item 2 glosses §4.11 as relocating the use first 'wherever a step would close it or empty or remove the building that houses it', but §4.11's *Dossier content across epochs* keeps a use whose catchment holds no candidate plot 'in its building' and lets a pinned one keep its building (J-A20.43); T20-6 already follows §4.11. J-A20.75's index row and Part A repeat the stronger gloss. CONFIRMED on the text.

**Required change.** (1) §7.7 item 2: replace '— §4.11's *Dossier content across epochs* relocates the use first wherever a step would close it or empty or remove the building that houses it —' with '— §4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a step would close it or empty or remove that building —'. (2) J-A20.75's index row: replace '— it relocates it first (§4.11) —' with '— §4.11 relocates it first or keeps it in its building (J-A20.43) —'. (3) J-A20.75's Part A entry: replace '§4.11 relocates the use first' with '§4.11 relocates the use first, or keeps it in its building where no candidate plot exists (J-A20.43)'.

### 25. VD3-04 — minor · conflict · determinism · item 20 (c); 22

**Claim and check.** Item 20 (c): only a dossier instruction removes, adds or re-designates a dossier-backed element. But §7.4's assign / unassign row gives a dossier event the ordinary undo ('the inverse mutation'), `revert` inverts 'every logged event whose target is this entity' except `creation` events, and §7.7 item 6 and J-A22.76 say an epoch's carried dossier events 'are undone with it'. So an owner-role `undo(h, of)`, a ctrl-click reset or an epoch's undo changes dossier content with no dossier instruction. The text conflict is CONFIRMED; reachability is PLAUSIBLE. CLOSING NOTE: the verifier's Part A old string for J-A22.76 does not occur (the Part A entry is worded differently); the change below quotes the entry's actual text. Refusing the undo of an epoch that carried dossier events keeps the one-way flow: the map cannot roll back what the dossier said.

**Required change.** (1) §7.4 Replay semantics: after '…a dossier element only by a dossier event (§7.7 item 2).' insert ' Every later dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map event: `revert` skips it, and an `undo(h, of)` naming it returns F-EDIT offering `rejectSite` and `placeAt`; an `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way, because undoing either would change dossier content without a dossier instruction (item 20 (c)).' (2) §7.4 Targets: replace 'other than a `creation` event (above)' with 'other than a `creation` event, a dossier event or an epoch that carried one (above)'. (3) §7.1 `revert` comment: replace 'never a `creation` event, §7.4' with 'never a `creation` or dossier event, §7.4'. (4) §7.7 item 6: replace 'they fold only inside the epoch, are undone with it and are never undo targets on their own, and a truncated epoch that a `redo` re-appends keeps them (§7.4)' with 'they fold only inside the epoch and are never undo targets, and neither is the epoch that carries them (§7.4)'. (5) §5.2 F-EDIT detection: replace 'an `undo` naming a `creation` event (§7.4)' with 'an `undo` naming a `creation` event, a dossier event or an epoch that carried one (§7.4)'. (6) J-A22.76's index row: replace 'are undone with it, are never undo targets on their own, and keep their `seq`s when a `redo` re-appends a truncated epoch' with 'are never undo targets, and the epoch that carries them is none either (item 20 (c); verify-determinism-r3 VD3-04)'. (7) J-A22.76's Part A entry: replace 'undo them with it, never make them undo targets on their own, and keep their `seq`s when a `redo` re-appends a truncated epoch' with 'never make them undo targets, nor the epoch that carries them, since undoing either would change dossier content without a dossier instruction (item 20 (c); verify-determinism-r3 VD3-04)'.

### 26. VD3-09 — minor · new-problem · determinism · item 28 (f)

**Claim and check.** Round 3's F-PLAN tier 2 re-places a refused stair bay or chimney stack 'at the next candidate of that step's filtered placement order', with no outcome when the order holds no further candidate; tier 3 cannot move the anchor, because a layout re-roll keeps the core (§6.1). CONFIRMED gap; reachability PLAUSIBLE. CLOSING RULING: tier 6 (documented omission, §5.1: 'never silent') over an abort, because an exhausted placement order is a fact of the building's geometry, not a bug; the household units stay housed (tier 6 never drops a unit), and the failing reachability bar flags the building.

**Required change.** (1) §5.2 F-PLAN tier 2: after 'as every tier-2 repair is (§5.1)' insert '; where that order holds no further candidate, the anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys left unreached — the bar failing and the building flagged'. (2) J-A28.73's Part A entry: append 'An anchor whose filtered order is exhausted takes tier 6, reported and flagged, never an abort, because the exhaustion is the building's geometry, not a bug (verify-determinism-r3 VD3-09).'

### 27. VP3-08 — minor · stale · determinism · item 28 (f)

**Claim and check.** J-A28.51's Part A still says 'tier 6 never reaching a unit because S10b's fill and `relet` keep the count within §2.6's capacity'; V-MAB2-05 corrected the same clause in F-PLAN tier 6, and after J-A28.46 S10b cannot read the capacity. CONFIRMED (the old string occurs once in the rationale).

**Required change.** J-A28.51's Part A entry: replace 'tier 6 never reaching a unit because S10b's fill and `relet` keep the count within §2.6's capacity' with 'tier 6 never reaching a unit because the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` and §2.6's re-homing keep the count within §2.6's capacity'.

### 28. VK3-02 — minor · stale · kernel · item 28 (f)

**Claim and check.** J-A28.33's index row reads 'with the kept rooms and the fixed anchors as `fixed` rings'. §2.6 calls the entrances and hearths anchors and does not pass them as fixed rings, and J-A28.26's row keeps the two apart; round 3 restated J-A28.33's Part A and §3.4 but left the index row. CONFIRMED.

**Required change.** J-A28.33's index row (a restated-row swap): replace 'with the kept rooms and the fixed anchors as `fixed` rings' with 'with the rings §2.6's re-cut rule passes as `fixed` rings (the stair bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms)'; the rest of the row unchanged.

### 29. VS3-01 — minor · partial · scope · item 20

**Claim and check.** Round 3 added §4.11's *Dossier content across epochs* (J-A20.43), which T20-6's epoch clause gates at M4. §0.2 row 20 glosses it inexactly ('a dossier-backed use relocated before an epoch's step could close it or leave it without its building', while the home keeps a use with no candidate, or a pinned one, in its building); §16 M4's content does not price it although row 20 says 'priced in §16'; the Staged evolution row does not list it among the hooks the engine must keep. CONFIRMED.

**Required change.** §0.2 row 20: replace 'the lapse at an epoch and *Dossier content across epochs* — a dossier-backed use relocated before an epoch's step could close it or leave it without its building (J-A20.43) — in §4.11' with 'the lapse at an epoch and *Dossier content across epochs* (J-A20.75, J-A20.43) in §4.11'. §16 M4: replace 'the floor's attributes with their migration, the lapse of a rejection at an epoch — with their hook tests' with 'the floor's attributes with their migration, the lapse of a rejection at an epoch and the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43) — with their hook tests' (amount unchanged: it reuses the `dossier` request and `relocateUse` M3a builds). Staged evolution row: replace 'the lapse of a rejection and the folding of a dossier event at an epoch (items 20, 22 (e))' with 'the lapse of a rejection, *Dossier content across epochs* (J-A20.43) and the folding of a dossier event at an epoch (items 20, 22 (e))'.

### 30. VS3-02 — minor · missing · scope · item 28 (f)

**Claim and check.** Repair round 3 moved §2.6's household capacity from M3a's content to M2b's without re-pricing either row, and J-A16.01's Part A still itemises amendments b's work as 'M2b +3 / +4, M3a +7 / +8'; this vetoable absorb-and-move call is recorded only in a seat report (rule 5). CONFIRMED. CLOSING NOTE: the sentence also records that the closing round's additions to M3a (the re-homing on the edit paths, the dossier household's re-provision) are absorbed.

**Required change.** RATIONALE-A restating J-A16.01 (restated-row swap; the index row unchanged): after 'the cuts then leave ≈ 135–174 pw for the base and ≈ 149–192 in total (§16, D-20).' append ' Repair round 3 (2026-09-27) moved §2.6's household capacity, with the programme rows' `circulation` share and least `room`-form area that it reads, from M3a's content to M2b's, because the generation fill clamps to it at S11 (J-A28.46) and T19-4 gates M2b; the closing round added to M3a the capacity re-homing on the edit paths and the re-provision of a dossier household's housing, which reuse the overflow pass, the `dossier` request and S11's operator that M2b and M3a already build; the work moves between the rows and is absorbed there, the rows' amounts and the total unchanged (verify-scope-r3 VS3-02; closing).'

### 31. VS3-06 (= VK3-03) — minor · new-problem · scope · item 28

**Claim and check.** Same as VK3-03. §13.1's differential compares 'each ring's pieces against the oracle's result for that ring less every earlier ring'. On a drawn case with an earlier ring wholly inside a later one the oracle returns a holed polygon, while §3.4 refuses it (`E_DEGENERATE`, detail `overlap`), so a correct kernel fails the differential. CONFIRMED.

**Required change.** §13.1: replace '(each ring's pieces against the oracle's result for that ring less every earlier ring)' with '(each ring's pieces against the oracle's result for that ring less every earlier ring, and a refusal — detail `overlap` — exactly where that result has a hole)'.

## 3 The closing seat's rulings

### 3.1 A dossier household no building of its district can hold (VP3-01, VD3-01, VD3-02, VP3-02, VP3-03, VD3-12 (2), VS3-04)

The pipeline verifier re-provided the housing inside the district by the `dossier` request but gave no outcome where the
district holds no ground; the determinism verifier sent that case to F-SITING's first rungs, which the same cell says are
not run after S11. Ruled: re-provision inside the district by S10b's `dossier` request in the least-disruption order §4.7
already states for a request after the city is built (vacant plots and vacancy runs, under-used plots, a plot whose use
can move, a JOIN), its first closest option where no plot passes (J-A20.42), S11's operator building a residential slot
there. That request always places, so no terminal drop and no F-SITING rung remains for a dossier household; the
district bound keeps the result independent of the order lazy districts are placed in, which a town-wide search would
break. A non-dossier household keeps the reported last rung (generation, epoch) or the F-EDIT refusal (hand edit).

### 3.2 Locked and pinned households under re-homing (V-MAB3-01, VD3-11, VP3-07)

V-MAB3-01's wording (locked and pinned passed over) over VP3-07's (locked only), since §7.2 holds a pinned entity's
position. Widened to S11's operator, so a regeneration cannot shrink the shell under protected households, and to §4.7's
clamp through VP3-04 (4). Worded to 3.1: "cannot be re-homed" never applies to a dossier household.

### 3.3 Which wings the capacity reads (V-MAB3-02, VR3-02)

The base wings only; VR3-02's reader list supersedes V-MAB3-02 (ii) (the span mark, its caster and the 3-D export read
the base wing; the plan rung reads either). The storey rule binds every composition, generated or stored, and every
composition edit, so the households the capacity admits always fit the plan.

### 3.4 The rest

* **V-MAB3-04 (a):** §10.2's `basementAccess` narrowed to `'core'|'trapdoor'` rather than a rule reading a row's
  `external` as `trapdoor`, so the table cannot state the contradiction; (b)'s door length is stated in the plan's own
  module (two wing-local modules), since no door-width column exists.
* **VK3-01:** tower first in the clip order, recorded as an amendment of J-A28.26 (the clip order's own call) because the
  model's J-A28.2x ids are all used.
* **VR3-01:** the verifier's headroom rule adopted as new judgment call J-A30.25, with two additions its text lacked: the
  field registered as derived in §7.1 (§2.8's registry rule) and a clause in T30-4 (rule 2's bar).
* **VD3-04:** the J-A22.76 Part A old string the verifier quoted does not occur; the change quotes the entry's actual
  text. Refusing the undo of an epoch that carried dossier events is accepted: the map cannot roll back what the dossier
  said (item 20 (a), (c)).
* **VD3-09:** tier 6 (documented omission) over an abort for an exhausted anchor order.
* **VD3-10 with VP3-06:** one merged identity sentence (first kerb edge in the centreline's order; lineage; undo).
* **V-MAB3-08 with VR3-01:** both F-EDIT clauses given as one insertion at their shared anchor.
* **VS3-02, VS3-05:** the closing additions to M3a (re-homing on the edit paths, the dossier re-provision) priced as
  absorbed, recorded in J-A16.01's Part A.

## 4 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read or executed on disk; hashes `1a861c72…` / `8a24a5a7…` unchanged through the lane): the 53 fixes (§1,
probe script plus reads); every claim of §2 at its quoted text; every old string of §2 occurring once (63 anchors,
script); the coverage of all 45 verify-r3 ids by the 31 primaries (script); "re-hom" absent from §5.3 and §13.2 and
"capacity" absent from §5.3; the J-A28.2x id range full; the deferral probes (0 for TBD, to be decided / determined, open
question, deferred to, decide later, later pass / round, TODO, FIXME; "left open" 2, both a gate's opening); 470 index
rows and 470 Part A entries, 194 of them J-A.

**PLAUSIBLE** (judgment, vetoable): the reachability of each failure path (a full district, an exhausted stair order, a
tower engaging a wing, an owner-role undo of a dossier event); the closing rulings of §3; the severities as the verifiers
set them; that the reconciled texts, once applied, leave no new defect — the hand fix should be followed by one
verification of the touched subsections (§2.5, §2.6, §4.7, §5.2, §5.3, §6.3, §7.1, §7.3, §7.4, §7.7, §10.2, §13.1,
§13.2, §13.8, §16, §0.2, II.6, Staged, the index and Part A) and the document checks.


## Fable review (2026-09-27) — A-amendments-b/closing

Reviewer: Fable (claude-fable-5-1), lane fable-review/main/integration (`docs/fable-review/main/integration.md`).
**Verdict: CORRECTED.** §1's 53 FIXED accepted (three spot-read on the live text); §3's rulings 3.2, 3.3, V-MAB3-04 (a),
VK3-01, VR3-01 (J-A30.25), VD3-04, VD3-09, VD3-10 and VS3-02 stand against the owner's items and the live text. One
qualification, ruled as design block J-Fintegration-1 (`docs/fable-review/main/blocks-integration.md`, an APPEND to
§7.7): ruling 3.1's "the `dossier` request always places" is true at generation — no lock exists before the first map,
and §7.7's closest-option rule places with the failed hard rows reported (J-A20.71) — but after the city is built §7.7's
precedence (lock > dossier existence: "never placed on a locked entity — it takes the best unlocked site") leaves the
request no site in a district every plot of which a user has locked, and §4.7's and §5.2 F-SITING's sentences are silent
there. The ruling: a hand edit's request returns F-EDIT to its author naming the locks (unlock, choose another site or
keep the lock); a dossier event's request returns the same F-EDIT to the host, which unlocks first (J-DET-11); an epoch's
request widens to the town in J-A20.43's order, reported — never a dropped household, never a written lock. §4.7 and §5.2
read with that paragraph until pass c's editors align their wording. A plain-language note on item 14 is appended to
`SUMMARY.md`.
