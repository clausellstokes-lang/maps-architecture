# verify-model-r3 — lane amendments-b/verify-model-r3 (verifier of the MODEL part, §2, after repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-model-r3).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 1 read inputs (repair-model-r3 report + blocks as installed, verify-model-r2, validate.md §6, assemble-r3 §8, the five sibling r3 reports' notes, §2.6 and §2.8 whole, a word diff of §2 against the r3 archive, the citing subsections): done
> STEP 2 re-check r2 issues V-MAB2-01 … 15 and VAL-01: done (§2)
> STEP 3 item verdicts + cross-part notes: done (§1, §3)
> STEP 4 issues V-MAB3-01 … 12: done (§4)
> STEP 5 sweeps + CONFIRMED/PLAUSIBLE: done (§5, §6)
> STEP 6 queue row + LANDED: done (row B-amendments-b/verify-model-r3 in docs/FABLE-REVIEW-QUEUE.md; LANDED line)

Read whole: `repair-model-r3-report.md` and its four blocks as installed; my earlier report `verify-model-r2.md`;
`validate.md` §6 (the model issues and every issue that points into §2); `assemble-r3.md` (its §8 notes); the
cross-part sections of the five sibling r3 repair reports (determinism "departs" and "For Fable", kernel ledger,
pipeline hand-off, rendering ledger, scope §4–§5); §2.6 and §2.8 of the installed `docs/ARCHITECTURE.md` whole (sha256
`1a861c72…`, l. 943–1535 and 1643–1797), with a word diff of all of §2 against
`docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md` (`831efd42…`): 41 changed lines, 38 in §2.6 and 3
in §2.8, every one read, and no change outside those two subsections. The subsections that cite the repaired facts
were read at the installed text: §3.4 `tileRings`, the `fixed` comment and the re-cut paragraph; §4.1 "Saved, then stale
until clicked"; §4.6 / §4.11 `thin … back_court` and the passage's vanishing; §4.7 "Households per building"; §4.11
"The epoch's order"; §5.2 F-PLAN, F-SITING and F-EDIT rows; §5.3's table (no capacity row); §7.1 "Entrances, basements,
passages and plans" and the plots and buildings rows; §7.2 Protection; §7.3 items 1 and 4; §7.4 `fieldBand` and epoch
rows; §7.5 transforms; §10.2 `RoomProgramRow` and the households paragraph; §13.2 T28-1 … T28-19; §16's M3a row; the
index rows and Part A entries of J-A28.23, J-A28.26, J-A29.25, J-A31.76, J-A28.46. The owner's words of items 28 and 29
in `docs/AMENDMENTS-2026-09-25b.md` were re-read. Receipts: `refs.py` — 139 heading keys, 35 D ids, 470 J ids, 2
broken (the pre-existing external `os-geometry.md` §2.1.4 at l. 2708 and RFC 7946 §3.1.6 at l. 9200), none in §2; all
78 J / J-P / J-DET ids that §2 cites resolve to an index row, and every J-A id among them to a Part A entry;
`doc_checks.py --sections "2"`: C1 5/0, C2 0/0, C3 328/0, C4 3/0, S1 0/0, S2 0/0, exit 0 (scratch copies of the outputs
in the session scratchpad `vmr3/`).

## 1 Item verdicts after repair round 3

| item | r2 | r3 verdict | where and what (quoted or named exactly) | open issues |
|---|---|---|---|---|
| 28 (home) | PRESENT, with defects | PRESENT | the stage-3 contract "The seed clip (§3.4's `tileRings`) is given the wings reaching a storey in the **clip order**: wing order, except that a wing whose extent there lies wholly inside another's is taken after that container (two identical extents keep wing order), so a contained wing has no piece at that storey … and no piece has a hole, which the clip refuses"; step 4 "each extent less the union of the extents before it in the clip order … by §3.4's seed clip, `tileRings`"; `Wing.spans` "a composed wing whose ground ring follows the edge of a passage that a base wing spans takes that BaseWing.spans (above) — every such composed wing, and no other"; `ElaborationRecord.inputs` "the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6)" | — (V-MAB3-02 is a clarification of the capacity's wing set, filed under 28 (f)) |
| 28 (f) (home) | PRESENT, with defects | PRESENT, with defects | the capacity bullet "The bound holds through every change: a committed change that lowers a building's capacity below its `households` count — S11's operator (§4.7), a rewrite of the plot's `builtBand` (J-A31.44's paths), a change of its wings' extents (…), a `setAttr` of its heights or its class, or a §7.6 edit of a table this function reads (…) — re-homes the households past the capacity, the last in address order, by §4.7's overflow pass inside the causing event, each move a lifecycle event of it (`relocate`, §2.8); … No such change is refused for it; only a hand `relet` above the capacity is (F-EDIT)"; the ladder's baseline "with no epoch every residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity"; the re-cut "earlier or later in the clip order" | V-MAB3-01, 02, 05, 06, 07, 08, 09, 10, 12 |
| 29 (home) | PRESENT, with defects | PRESENT, with defects | "Basements": "`Basement.access`, derived with it: `external` for a walk-out, else the class's programme row's `basementAccess` read at the plot's `builtBand` (§10.2), a shell fact that never moves with the occupants and is edited with the basement (`setAttr(basement)`)"; step 3 "as `Basement.access` says — `core`: … `trapdoor`, or the fallback …: a core of kind `trapdoor` … `external`, a walk-out's outside stair: the core stopping at the ground storey, a door (an `Opening` of kind `door`) opens the basement in the side of `Basement.ring` whose midpoint samples lowest on the terrain"; §10.2's `basementAccess` comment points to it; T28-3 names all three | V-MAB3-03, 04, 11 |
| 30 | PRESENT, with defects | PRESENT | `BaseWing.spans` "(… a drawPassage, a block's reach changed to or from passage (J-A30.72), densify … back_court's new passage and the rung-3 re-cut that removes a sealed passage with its rear row (amalgamate) reach it through that re-fit, §7.1, §4.11 — sealPassage, openPassage and thin … back_court's sealing change no geometry and leave it)"; `Wing.spans` as quoted for 28; §2.8's stale gloss "the wing rings or a spanned passage's face"; §7.1 / §7.4 / §7.5 now name `spans` and `fieldBand` (V-MAB2-04) | — |
| 31 | PRESENT, one stale comment | PRESENT | `RoofSpec` "'none' /* the roofless state the decline ladder's decay sets — derelict, and kept through ruin (§2.8 decline hooks) */" | — |
| 8, 10, 11, 12, 16, 17, 18, 19, 20, 22, 24, 25, 27 | PRESENT | PRESENT (kept from r2; the §2 text they rest on is unchanged by repair r3, checked in the word diff) | as `verify-model-r2.md` §1 | — |

## 2 The r2 issues re-checked (verify-model-r2 V-MAB2-01 … 15, and the validator's VAL-01 that carries V-MAB2-06)

All fifteen are fixed at the installed text, in every part that owned one. No r2 fix regressed. The defects that remain
are new (§4); most are the follow-ups of V-MAB2-01's new rule and V-MAB2-10's new `external` mechanism.

| r2 issue | owner | r3 | evidence (installed text `1a861c72…`) |
|---|---|---|---|
| V-MAB2-01 capacity bound with no maintenance path (major) | model | FIXED | the capacity bullet quoted in §1 (l. 1484–1493); §2.8 `relocate` "— and a Household moved to another building (§10.3's relocation: §4.7's overflow pass, §2.6's capacity bound, a re-letting)" (l. 1672); J-A28.23 index row "the bound kept through every change that lowers a capacity by re-homing the excess … never by refusing the change" and its Part A sentence (rationale l. 357). Follow-ups left open: V-MAB3-01, 06 – 10 |
| V-MAB2-02 §4.7's own re-home list | pipeline | FIXED | §4.7 l. 4691–4694 "The overflow pass runs inside every change §2.6's capacity rule lists — S11's operator building or changing a residential shell (…) among them —" |
| V-MAB2-03 epoch never re-bands `fieldBand` | pipeline (as VP2-02) | FIXED | §4.11 "The epoch's order" (l. 5116–5119) "(a) S6 re-evaluates the drivers and the bands, re-bands every live plot's `fieldBand` against its own column by §4.5's rule (§2.5; J-A28.29) — before any rung reads the field band, the former values in the epoch's undo record —" |
| V-MAB2-04 `fieldBand`, `spans` absent from §7 | determinism | FIXED | §7.1 plots row "never `fieldBand`, derived state written only by a derivation that reads the current field and by the epoch's re-banding (§2.5, J-A28.29);", buildings row "each base wing's `spans` (written and cleared only by S11 when it builds or re-fits a passage's front building, §2.6)"; §7.4 `fieldBand` row (l. 6998) and the epoch row "each plot's `fieldBand` re-banded after S6 (§2.5)"; §7.5 "its `fieldBand` is that same band" and "(no older document has a passage, so no base wing carries `spans`)"; J-A31.76's index row names both |
| V-MAB2-05 (a) F-PLAN tier 6 "S10b's fill"; (b) §7.3 item 1 | determinism | FIXED | (a) l. 5639 "which the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` (§4.11) and §2.6's re-homing on every change that lowers a capacity keep to"; (b) through VD2-06, §7.3 item 1 "**Stored compositions, spanned passages and re-homed households** (§2.6): …" (l. 6693–6699) — but see V-MAB3-09 |
| V-MAB2-06 plan blind to the spanned passage's face | model | FIXED | `ElaborationRecord.inputs` and the stale gloss quoted in §1; §4.1's copy follows (VAL-01, pipeline: FIXED, l. 3353–3354 "the wing rings or a spanned passage's face, … (§2.8's `ElaborationRecord.inputs`)") |
| V-MAB2-07 composed wing's `spans` source | model | FIXED | `Wing.spans` quoted in §1 |
| V-MAB2-08 `thin` named as a re-fit | model | FIXED | `BaseWing.spans` quoted in §1; agrees with §4.6 l. 4359–4360 ("`thin … back_court` clears one … and seals its passage") and §4.11 l. 5484–5486 (the passage "sealed and, on a rising band's re-cut, removed with the rear row, `amalgamate`") |
| V-MAB2-09 holed seed piece not excluded; one-sided gloss | model | FIXED | the clip order in the stage-3 contract and step 4 (quoted in §1); step 3 "the container's piece where the clip order leaves the wing none"; the re-cut "wherever a change to an overlapping wing, earlier or later in the clip order, alters that wing's clipped seed (the clip's crossing vertices included, §3.4)"; J-A28.26 index row and Part A sentence; §3.4 agrees (l. 2541 "in the caller's clip order (§2.6)", l. 2639–2640 "§2.6's clip order puts a contained wing after its container, so the refusal marks a caller's bug"). My reasoning check: a hole in a later ring's piece needs a connected component of the earlier rings' union strictly inside it, and a connected earlier ring that is not wholly inside meets the later ring's boundary, so the container-after order does exclude every holed piece (PLAUSIBLE, reasoning) |
| V-MAB2-10 basement access decided twice | model | FIXED | "Basements" and step 3 quoted in §1; `Basement.access` comment "derived with the basement, a shell fact (Basements, below)"; J-A29.25 index row and Part A. The new `external` rule has gaps: V-MAB3-03, 04, 11 |
| V-MAB2-11 §10.2 `basementAccess` uncommented | pipeline | FIXED | l. 8998 "`basementAccess: 'core'|'trapdoor'|'external' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand; the plan rung reads Basement.access */`" |
| V-MAB2-12 static-baseline sentence | model | FIXED | "with no epoch every residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity — so the static baseline is unchanged" (l. 1452–1454); §10.2 (l. 9023–9024) and §7.6 say the same as pointers to §4.7 |
| V-MAB2-13 `RoofSpec 'none'` gloss | model | FIXED | quoted in §1 |
| V-MAB2-14 T28-3 trapdoor core | scope (as VS2-02) | FIXED | T28-3 (l. 10377–10378) "the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring (§2.6's fallback; J-A29.25) — or, for a walk-out (`Basement.access` `'external'`), by its outside stair" |
| V-MAB2-15 §3.4 fixed list | kernel | FIXED | l. 2613 "a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)"; §3.4's re-cut paragraph (l. 2679–2680) lists "the composer's rooms" |

## 3 Cross-part notes addressed to model after repair round 3 — reflected?

| from | the note | verdict |
|---|---|---|
| repair-model-r3 "Cross-part notes" (1); assemble-r3 §8 (1) | no bar proves the re-homing on the edit paths; "re-hom" 0 times in §13.2 and §5.3 | CONFIRMED open ("re-hom" occurs in §2.6, §4.6, §4.11, §7.1, §7.3 only; §5.3 has no capacity row at all) — V-MAB3-06 (scope), V-MAB3-07 (determinism) |
| repair-model-r3 (2); assemble-r3 §8 (2) | a locked household among those past a lowered capacity | CONFIRMED open: §2.6 moves "the last in address order" with no exception, while §7.2 makes a locked entity "a fixed input: regeneration never changes it" — V-MAB3-01 (with the unplaceable-household case and its F-EDIT row, V-MAB3-08) |
| repair-model-r3 (3); assemble-r3 §8 (3) | does the capacity read the base or the composed wings? | CONFIRMED open: `BaseWing.spans` says the capacity reads the base wing "before any composition exists", but `Wing.spans` says it is "read, on the base or the composed wing, by the capacity" — V-MAB3-02 |
| repair-determinism-r3 "For Fable" (VP2-07); assemble-r3 §8 (4) | F-SITING's last rung may drop a dossier household | not this part's home (J-A28.46, pipeline; determinism's F-SITING cell). It reaches §2.6 only through the capacity rule's "No such change is refused", which lets a hand edit reach that rung — V-MAB3-01 closes the hand-edit path; the generation and epoch path stays the Fable question it was |
| repair-scope-r3 §5 (PLAUSIBLE) | T28-15 on a stored plan and the re-cut's `composition`-role vertices | CONFIRMED as a text conflict, and wider than the vertices: V-MAB3-05 (model), V-MAB3-12 (scope) |
| repair-pipeline-r3 hand-off (3) | its §4.7, §4.1, §10.2 pointers depend on §2.6's capacity rule, `Basement.access` and §2.8's stale gloss | reflected: each target exists in the installed §2.6 / §2.8 with the wording the pointer assumes |
| repair-kernel-r3 "Apply order" | §3.4 names "§2.6's clip order" | reflected (l. 1262–1266) |
| repair-rendering-r3 | §8.5 cites `BaseWing.spans` "which a composed wing inherits as `Wing.spans`" | reflected: `Wing.spans`' inheritance rule (V-MAB2-07) is what §8.5 assumes |
| repair-determinism-r3 "departs" 6 | §7.6's static-baseline sentence and §7.3's canonical prior re-worded to §2.6's wording | reflected |
| verify-kernel-r3 VK3-01 (model-owned, filed 10:35) | a composed tower has no place in the clip order (it lives in `Composition.towers`, its room named by "wings.length + the tower's index"), and a composer's room in a later wing that reaches into an earlier wing's extent has no containment rule, while §3.4 requires every `fixed` ring "inside one seed ring" and F-PLAN tier 2 aborts its refusal as a bug | CONFIRMED on the text (the clip order is defined over "the wings reaching a storey" only; step 4 passes "the composer's rooms" as fixed rings). Not re-filed here: VK3-01 is the issue of record for the repair round, and its tower-first wording is compatible with V-MAB2-09's clip order and with V-MAB3-02 |
| verify-determinism-r3 VD3-11, verify-pipeline-r3 VP3-07 (model-owned) | the locked household under re-homing | the same as V-MAB3-01 (a); merged there, to be applied once |
| verify-determinism-r3 VD3-05, VD3-06, VD3-12 | §5.3 capacity row, §7.1's partial list, the re-homing bar | the same as V-MAB3-07, V-MAB3-10, V-MAB3-06; merged there, to be applied once through the sibling ids |
| verify-determinism-r3 VD3-01 / VD3-02 (major; determinism / pipeline) | F-SITING's last rung drops a dossier-roster household the overflow pass cannot house; VD3-02 re-provides a slot in the district and refuses a hand edit that cannot | not this part's home; V-MAB3-01 (b) is worded so that "cannot be re-homed" means after VD3-02's re-provision, so the two agree |

## 4 Issues found in this round (id · item · severity · kind · owner — claim — required change)

Numbered V-MAB3-nn; all twelve are minor and none needs the owner — each is a repair inside a ruling already made
(J-A28.23, J-A28.26, J-A29.25, J-A28.46). Read at the installed text `1a861c72…`; "PLAUSIBLE" marks a claim that rests on
reasoning about behaviour rather than on the text alone, and every "Required change" wording is this seat's proposal.
Apply order: V-MAB3-01 before V-MAB3-06, 08, 09 and 10; V-MAB3-03 with V-MAB3-11; V-MAB3-05 with V-MAB3-12. Four of
the twelve coincide with issues the sibling r3 verifiers filed at the same time (V-MAB3-01 (a) = VD3-11 = VP3-07,
V-MAB3-06 = VD3-12, V-MAB3-07 = VD3-05, V-MAB3-10 = VD3-06): each is to be applied once, as its entry says.

**V-MAB3-01 · 28 (f) · minor · new-problem · model (= VD3-11 and VP3-07 of the sibling r3 verifiers for part (a); apply
once, here).** The re-homing rule states no outcome for its two exhaustions.
(a) §2.6 moves "the households past the capacity, the last in address order", with no exception for a locked or pinned
household, while §7.2 says "A **locked** entity … is a fixed input: regeneration never changes it" and "A **pinned**
entity keeps its existence and position" — so a heights edit on a building whose last household is locked either
breaks the lock or leaves the count above the capacity, and F-PLAN tier 6 then aborts the rung as a bug. (b) §4.7's
pass ends "a household no building of the district has room for is an unplaced item of F-SITING (§5.2)", whose last
rung is "the manifest reduced by it": so, because "No such change is refused for it", an ordinary hand `setAttr` of
heights in a full district deletes a household from the town — for a dossier's roster against item 20 (b), and against
the F-SITING cell's own "never a dossier-backed item". The model seat reported (a); (b) is this seat's (PLAUSIBLE on the
failure path; the missing rule is CONFIRMED). **Required change (§2.6, the capacity bullet):** (i) "re-homes the
households past the capacity, the last in address order, by §4.7's overflow pass" → "re-homes the households past the
capacity, the last in address order passing over a locked or pinned one (§7.2), which keeps its building, by §4.7's
overflow pass"; (ii) "No such change is refused for it; only a hand `relet` above the capacity is (F-EDIT)." → "No such
change is refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone
above the new capacity, or a household no residential building of the district has room for — which returns F-EDIT
naming them, as a hand `relet` above the capacity does; an epoch's step leaves a building whose locked or pinned
households alone would exceed its new capacity unchanged, as a lock stops a rung-3 re-cut (§4.11) and any locked entity
is a fixed input (§7.2), and a household no building of the district can take in a generation run or an epoch is
F-SITING's (§5.2, J-A28.46)." — for a dossier roster's household, "cannot be re-homed" means after VD3-02's in-district
re-provision (pipeline, §4.7), so this sentence and VD3-02 agree. J-A28.23: append to the index row "; a hand edit whose excess cannot be re-homed (locked or pinned households alone above the capacity, or
no room in the district) returns F-EDIT" and to its Part A entry "A locked or pinned household keeps its building and
the re-homing passes over it; a hand edit whose excess cannot be placed is refused rather than dropping a household,
because a user's edit must never delete population the dossier or the roster supplied (verify-model-r3 V-MAB3-01)."
Follow-up: V-MAB3-08 (§5.2 F-EDIT, §7.3 item 4). (The three verifiers' wordings of (a) agree in substance: VP3-07
passes over locked households, VD3-11 over locked and pinned ones; this wording keeps VD3-11's, since §7.2 holds a
pinned entity's position.)

**V-MAB3-02 · 28 (f) · minor · partial · model.** The capacity's wing set is not fixed. The bullet reads "`A(s)` … of
the union of the extents of the wings that reach storey `s` (the contract's fourth rung, above)", and the fourth rung's
wings are "base or composed"; `BaseWing.spans` says "the capacity (below) … read them before any composition exists",
but `Wing.spans` says it is "read, on the base or the composed wing, by the capacity". A composed `Wing` has its own
`Heights`, so if the capacity read a derived composition a click would change it (against "a click changes no digest",
§6.2, and "a property of the shell alone"); if it reads the base wings only, a composition with fewer storeys can be asked
to house more households than its plan can cut, which F-PLAN tier 6 treats as a bug (PLAUSIBLE; the stage-3 contract
fixes only the ground union). The model seat reported it. **Required change (§2.6):** (i) the capacity bullet: "the
union of the extents of the wings that reach storey `s` (the contract's fourth rung, above):" → "the union of the
extents of the building's base wings (`Building.wings`, with their `spans`) that reach storey `s` (the contract's fourth
rung, above) — never a composition's wings, stored or derived, so neither a click nor a stored composition moves it
(§6.2):"; (ii) `Wing.spans`: "read, on the base or the composed wing, by the capacity (below), the plan rung, §8.5's
span mark, the shadow pass and the 3-D export" → "read on the base wing by the capacity (below), and on the base or the
composed wing by the plan rung, §8.5's span mark, the shadow pass and the 3-D export"; (iii) the stage-3 contract, after
"so O17 (i)'s identical footprint hash at every LOD holds by construction (its test: §13.2)." insert "A composition's
wings reach every storey its base wings reach, with at least their twice-area there, so the households the capacity
admits always fit its plan (F-PLAN tier 6, §5.2)."; and the intake bullet, after "so a stage-3 generator is admitted only
with compositions the base can carry" insert "and only with compositions that keep that storey rule". J-A28.28's Part A
entry gains "The capacity reads the base wings only; a composition keeps at least their area per storey (verify-model-r3
V-MAB3-02)."

**V-MAB3-03 · 29 · minor · new-problem · model.** A walk-out basement is unreachable in the plan's own graph. Step 3's
new `external` rule stops the core "at the ground storey" and opens the basement by "a door (an `Opening` of kind
`door`) … in the side of `Basement.ring`", so the basement's rooms connect to the rest of the building only through
the outside. Step 5 roots the room graph only at the entrances: "a door at every entrance, rooted at the main one, the
side, rear, yard and service doors secondary roots (item 29 (5))", and the basement door is no `Entrance` (an entrance
is a footprint vertex; `Basement.ring` lies inside the footprint). So every walk-out plan has rooms the spanning tree
cannot reach, F-PLAN tier 1 fails it ("a room unreachable") and T28-2 fails (V-MAB3-11). **Required change (§2.6 step
5):** "a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item 29
(5));" → "a door at every entrance, rooted at the main one, the side, rear, yard and service doors secondary roots (item
29 (5)), and a walk-out basement's outside door (step 3, `external`) the root of the basement's storeys;".

**V-MAB3-04 · 29 · minor · new-problem · model.** The `external` rule has two cases with no outcome. (a) The derivation
gives `Basement.access` "`external` for a walk-out, else the class's programme row's `basementAccess`", and the row's
type admits `'external'` (§10.2), so a full or half cellar on level ground can derive `external`; step 3 then treats it
as "a walk-out's outside stair" and opens a door in a basement wall that stands in the ground — the model has no
outside stair outside the footprint. (b) The door goes in "the side of `Basement.ring` whose midpoint samples lowest",
with no floor on that side's length; a carried or inset ring can have a side shorter than a door, and no failure rung
is named. (PLAUSIBLE on (b)'s frequency; both gaps CONFIRMED in the text.) **Required change (§2.6):** (i) "Basements":
"else the class's programme row's `basementAccess` read at the plot's `builtBand` (§10.2)," → "else the class's
programme row's `basementAccess` read at the plot's `builtBand` (§10.2), a row's `external` reading `trapdoor` on a
cellar that is no walk-out, since an outside stair needs the fall a walk-out has,"; (ii) step 3: "opens the basement in
the side of `Basement.ring` whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring
index);" → "opens the basement in the side of `Basement.ring`, among those at least the row's door width long, whose
midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index) — where no side is that
long, the basement is joined by the `trapdoor` fallback above, reported —;". J-A29.25's Part A entry gains "A row's
outside stair applies to a walk-out only, and a walk-out whose ring has no side a door fits takes the trapdoor fallback
(verify-model-r3 V-MAB3-04)."

**V-MAB3-05 · 28 (f) · minor · conflict · model.** "Re-uniting the households removes what the subdivision added."
holds for an unstored plan (the canonical chain derives each (row, count) afresh from the as-built plan, so a return is
exact), but not for a stored one, which "is instead re-cut inside the event that changes its inputs, around its edited
and locked rooms" by the least-disruption rule — a subdivided room that "fits a role of the new programme (its area
inside the role's [min, max] …) keeps its ring" (a tenement bedroom kept as a chamber) — and whose re-cut "establishes
J-P48 (1) for its new walls", leaving `composition`-role vertices on the footprint that a later re-cut does not remove.
T28-15 inherits the unconditional claim (V-MAB3-12). The scope seat flagged the vertex half. (PLAUSIBLE on which rooms
the re-cut keeps.) **Required change (§2.6, the re-cut bullet):** "Re-uniting the households removes what the
subdivision added." → "Re-uniting the households removes what the subdivision added — exactly for an unstored plan,
whose canonical chain (below) returns the earlier plan; a stored plan's re-cut (below) keeps by least disruption the
subdivided rooms that still fit a role, and its rings keep the `composition`-role vertices its re-cuts added (J-P48 (1)),
which the shell's identity reads without; its undo restores it exactly (§7.4)."

**V-MAB3-06 · 28 (f) · minor · missing · scope (= VD3-12 (1), (3); apply once, through VD3-12, with the additions
below).** V-MAB2-01's mechanism has no bar (rule 2: "the test or acceptance bar
that proves it"). T28-17 covers the fill after a two-band fall and T28-18 the `relet` refusal; nothing tests a
`setAttr` of heights, a shrinking warp or `moveVertex`, a moved spanned passage face or a §7.6 edit that lowers a
capacity, the `relocate` events and dry-run list, the receivers in scope, the undo, or V-MAB3-01's F-EDIT cases.
**Required change (§13.2 T28-18, VD3-12's re-homing clause, widened):** append to T28-18 "; the re-homing clause —
on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a
passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households; each
edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over)
with their `relocate` moves and holds the receiving buildings in its effective scope; after commit no building houses
more households than its capacity (§5.3); the undo of each returns every household to its former building
byte-identically; and an edit whose excess cannot be re-homed returns F-EDIT (§2.6's capacity rule)"; in the PR-tier
sentence, "T28-18's `relet` clause from M3a" → "T28-18's `relet` and re-homing clauses from M3a"; in §16's M3a row,
after "T28-18's `relet` clause" add ", T28-18's re-homing clause". (§2.6's "**Bars:** §13.2's T28-13 – T28-18" then
needs no change.)

**V-MAB3-07 · 28 (f) · minor · missing · determinism (= VD3-05; apply once, through VD3-05, whose row wording is
equivalent and adds the `epoch` stage-end).** §2.6 states an invariant — `Building.households` "never above
the capacity (below)" — that §5.3, the invariant suite, does not carry: its table has no capacity row ("capacity" 0
times in §5.3). The model seat proposed the row. **Required change (§5.3, a row after the interior-ladder row):** "|
the capacity bound (item 28 (f), §2.6): every building's `households` count is at most its capacity (§2.6's one capacity
function) after every batch, a generation run's and an epoch's included | batch-local on the buildings whose capacity
inputs the batch changed (footprint, wings, heights, class, a spanned passage's face, the plot's `builtBand`) and the
buildings it re-homed households into; stage-end after S11's overflow pass and after a §7.6 edit of a table the function
reads | the capacity function evaluated on each such building against the length of its `households` |".

**V-MAB3-08 · 28 (f) · minor · broken-reference · determinism.** §2.6 ("a hand edit lists the moves among its dry-run
fates (§7.3 item 4)") and §7.1 ("each move among its fates (§7.3 item 4)") point to a list the home does not have: §7.3
item 4 gives fates to protected entities only (kept, carried, orphaned, discarded) and lists unprotected consequences
only for "A chained edit" — bridges, ways, "buildings re-based or demolished" — never a household's move. And V-MAB3-01's
refusal has no case in §5.2's F-EDIT detection cell. **Required change:** (i) §7.3 item 4: "A chained edit's report
also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings re-based
or demolished — with their lifecycle events, and every edit's report lists the names it re-draws" → "A chained edit's
report also lists its unprotected consequences — bridges re-sited or removed, ways re-routed, cut or pruned, buildings
re-based or demolished — with their lifecycle events; every edit's report lists the households §2.6's capacity rule
re-homes, each with its `relocate` event (from and to), and the names it re-draws"; (ii) §5.2 F-EDIT detection, after
"or a hand `relet` above §2.6's capacity (item 28, item 28 (f), §7.1)" insert "; a hand edit whose capacity re-homing
cannot place its excess — locked or pinned households alone above the new capacity, or a household no residential
building of the district has room for (§2.6's capacity rule)".

**V-MAB3-09 · 28 (f) · minor · conflict · determinism.** §7.3 item 1's new clause holds the receivers but not the
building the households leave: "an edit that lowers a building's capacity below its households holds the buildings
§2.6's capacity rule re-homes them into". That building is in scope when the edit touches its footprint or heights, but
not when a `moveVertex` on a spanned passage's far side lowers an unstored front building's capacity — the clause above
it holds the front building only "when that building's stored composition has a wing spanning the passage" — so the
edit writes `Building.households` outside its effective scope and the oracle (item 7) flags it. **Required change
(§7.3 item 1):** "holds the buildings §2.6's capacity rule re-homes them into" → "holds that building and the buildings
§2.6's capacity rule re-homes its households into".

**V-MAB3-10 · 28 (f) · minor · duplicate · determinism (= VD3-06; apply once, through VD3-06's shorter wording "— any
change §2.6's capacity rule lists —", plus the "moves a passage face it spans" correction below if the list is kept).**
§7.1 keeps a shorter second list of the changes that lower a
capacity: "an edit that lowers a building's capacity below its households — a `setAttr` of its heights, a `warp` or
`moveVertex` that carries its footprint or its spanned passage's face — re-homes the excess by §2.6's capacity rule".
The home now also lists a `setAttr` of the class and a §7.6 table edit (the model seat's sharpening after the validator
wrote VD2-07), and a passage face is moved, not carried. **Required change (§7.1):** "— a `setAttr` of its heights, a
`warp` or `moveVertex` that carries its footprint or its spanned passage's face —" → "— any change §2.6's capacity rule
lists, among them a `setAttr` of its heights or its class, a `warp` or `moveVertex` that carries its footprint or moves
a passage face it spans, and a §7.6 edit of a table the capacity reads —".

**V-MAB3-11 · 29 · minor · conflict · scope.** T28-2 reads "starting at the main entrance, openings and stair cores lead
to every room of every storey", which a correct walk-out plan fails: its basement is reached only through the outside
door (V-MAB3-03), while T28-3 already names "for a walk-out (`Basement.access` `'external'`), by its outside stair".
**Required change (§13.2 T28-2):** "(T28-2) starting at the main entrance, openings and stair cores lead to every room
of every storey;" → "(T28-2) starting at the main entrance — and, for a basement whose `Basement.access` is `external`,
at its outside door (§2.6 step 3) — openings and stair cores lead to every room of every storey;".

**V-MAB3-12 · 28 (f) · minor · conflict · scope.** T28-15 reads "re-uniting the households restores the earlier plan
where nothing else changed (item 18 (e)'s inverse)" without limit, which a stored plan does not meet (V-MAB3-05: kept
rooms and `composition`-role vertices). The scope seat flagged it for Fable. **Required change (§13.2 T28-15):** →
"(T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan
(§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the
`composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4)
(item 18 (e)'s inverse);".

## 5 Sweeps over the repaired §2 (§2.6, §2.8; the rest of §2 unchanged since r2)

* **SINGLE-SOURCE.** Each r3 mechanism is stated once in §2 and pointed to elsewhere: the clip order in the stage-3
  contract (step 4, step 3 and the re-cut gloss name it; §3.4 and §5.2 tier 2 point to it; J-A28.26); the capacity's
  maintenance in the capacity bullet (§4.7's overflow sentence, §5.2 tier 6, §7.1 and §7.3 item 1 point to it; J-A28.23);
  `Basement.access`'s derivation in "Basements" (the `Basement.access` comment, step 3, §10.2's column comment and T28-3
  point to it; J-A29.25); the composed wing's `spans` in `Wing.spans`; the plan's passage input in
  `ElaborationRecord.inputs` (§4.1's list points to it). Duplicates left: §7.1's shorter list of capacity-lowering
  changes (V-MAB3-10). The static-baseline sentence now stands in §2.6, §7.6 and §10.2 as the same pointer to §4.7's
  fill, not as three rules — accepted.
* **STALE.** Probed in §2 on the installed text, each 0: "a ruined building's roofless", "takes it from the base wing
  it covers", "by the row's `basementAccess`", "its template row's `households.built`, clamped", "a later wing's rooms",
  "in wing order:", "thin … back_court reaches", "S10b's fill", "central market", "the market ", "proprietary", "licen",
  "fixed by tier", "TBD", "to be decided", "open question", "deferred", "future"; whole document, each 0: the first six of
  those and "row's `built` count". Kept from r2 and unchanged: "rich quarter" / "poor quarter" 1 each (the derived
  description, J-P1), "immutable" 1 ("not an immutable one"), "writes the dossier" 1 ("the module never writes the
  dossier"), "never change" 2 (kernel vertex roles, not terrain). The one stale claim left is the unconditional
  re-uniting sentence (V-MAB3-05).
* **DEFERRAL-WORDING.** None. The eight "later" hits in §2 are ordinary English ("any later edit", "a later outline()
  call", "Every later carry", "earlier or later in the clip order", "the later `upgrade`") and the roadmap staging of the
  plan rung ("adding the rung later is a registration"), judged in r1.
* **BROKEN-REFERENCE.** `refs.py`: 0 inside §2 (2 in the document, both pre-existing external). All 78 J / J-P / J-DET
  ids §2 cites resolve; every J-A id has its Part A entry. Semantic: §2.6's and §7.1's "(§7.3 item 4)" name a list the
  home lacks (V-MAB3-08).
* **CROSS-PART.** The referencing sections point to the right home and the home states what they assume, with the
  exceptions filed: §5.3 lacks the invariant §2.6 states (V-MAB3-07), §13.2 lacks the bar (V-MAB3-06), §7.3 item 1 omits
  the source building (V-MAB3-09), T28-2 and T28-15 assume what §2.6 does not give (V-MAB3-11, 12).
* **NEW-PROBLEM.** The r3 repair created or left: the re-homing's two exhaustions (V-MAB3-01), the capacity's wing set
  (V-MAB3-02), the walk-out basement's reachability and its two unhandled cases (V-MAB3-03, 04), and the stored plan's
  re-uniting (V-MAB3-05). None contradicts an owner's word: each is a mechanism gap inside a ruling already recorded.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk, 2026-09-27; installed document sha256 `1a861c72…`, rationale `8a24a5a7…`, both unchanged by
this lane).** Every quotation above, at its line; §2's word diff against the r3 archive (`831efd42…`: 41 changed lines,
all in §2.6 and §2.8, each matching a repair-model-r3 ledger entry); the fifteen r2 fixes at their parts' lines; "re-hom"
absent from §5.3 and §13.2 and "capacity" absent from §5.3; §7.2's lock and pin semantics; §7.3 item 4's fate list;
F-SITING's last rung and "never a dossier-backed item"; §4.7's F-SITING hand-off; step 5's roots; `Wing.spans`'
"read, on the base or the composed wing, by the capacity"; `refs.py` (2 broken, both external, none in §2);
`doc_checks.py --sections "2"` exit 0 (C3 328/0); VK3-01's textual premise (the clip order names wings only; towers
sit in `Composition.towers`); the four overlaps with the sibling r3 verifiers (§3).

**PLAUSIBLE (reasoning).** The behavioural consequences in V-MAB3-01 (a household dropped from the manifest by a hand
heights edit in a full district), V-MAB3-02 (a composition with fewer storeys than its base), V-MAB3-03 (F-PLAN tier 1
on every walk-out), V-MAB3-04 (b) (a ring side shorter than a door) and V-MAB3-05 (which subdivided rooms a stored
re-cut keeps); the soundness of the container-after clip order (my argument in §2); and every "Required change"
wording — above all V-MAB3-01's F-EDIT exception to "never refused", V-MAB3-02's base-wings rule with its stage-3
storey rule, and V-MAB3-04's `trapdoor` reading of a non-walk-out `external` — which are this seat's proposals for the
repairers.

STATUS: COMPLETE (2026-09-27).
