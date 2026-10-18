# verify-model-r2 — lane amendments-b/verify-model-r2 (verify the MODEL part, §2, after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-model-r2).

> PROGRESS (kill-safe ledger; one line per step — planned | done):
> INPUTS: verify-model-r1, repair-model-r2 report + blocks as installed, assemble-r2 §8, the other five r2 repair reports' notes to model, §2.5/§2.6/§2.8/§2.9 whole (installed 831efd42…), a word diff of §2 against the r2 archive | done
> ITEM 28 / 28 (f) / 29 (home) and REFERENCING items: re-verdicts | done (§1)
> V-MAB1-01 … V-MAB1-16 and the other seats' model-owned r1 issues re-checked | done (§2)
> CROSS-PART notes to model after repair r2 | done (§3)
> Issues V-MAB2-01 … V-MAB2-15 | done (§4)
> SWEEPS + CONFIRMED/PLAUSIBLE | done (§5, §6)
> Fable queue row + LANDED line | done

Read whole: my earlier report `verify-model-r1.md`; `repair-model-r2-report.md` and its six blocks as installed;
`assemble-r2.md` (its §8 notes); the cross-part sections of the five sibling r2 repair reports (determinism "Cross-part
dependencies", kernel "Cross-part notes", pipeline §4, rendering "Order dependency", scope's ledger); §2.5, §2.6, §2.8 and
§2.9 of the installed `docs/ARCHITECTURE.md` whole (sha256 `831efd42…`, l. 826–2059), with a word diff of §2 against
`docs/archive/ARCHITECTURE-pre-amendments-b-repair-r2-2026-09-27.md` (`365e19f2…`; 76 hunks, each read); and the
subsections that cite the repaired facts (§3.4 transient arena, seed clip and kept-room sentence; §3.10 seed-tiling
row; §4.5 bands; §4.6 passage bullet; §4.7 "Households per building" and the back-court paragraph; §4.11 trigger, rung 1
and 2, `densify` / `thin`, sealing kinds; §5.2 F-PLAN; §5.3 interior-ladder row; §6.2 leaf; §7.1 edit-target rows and
`drawPassage`; §7.3 item 1; §7.4 `builtBand`, epoch and passage rows; §7.5 transforms; §8.5 span mark and `plotsOnly`;
§10.2 `cellar`, `DesignationTemplateRow.yard`, `RoomProgramRow`; §13.2 T28-1 … T28-19, T29-4; the model's J rows
and Part A entries). `refs.py`: 139 headings, 35 D ids, 469 J ids, 2 broken — the two pre-existing external citations
(l. 2679, l. 9123), none in §2; all 60 J / J-P ids §2 cites resolve. `doc_checks.py --sections "2"`: C1 5/0, C2 0/0,
C3 330/0, C4 3/0, S1 0/0, S2 0/0, exit 0.

## 1 Item verdicts after repair round 2

| item | r1 | r2 verdict | where and what (quoted or named exactly) | open issues |
|---|---|---|---|---|
| 28 (home) | PRESENT, with defects | PRESENT, with defects | §2.6 four rungs, `Room`, `Plan`, `Storey`, `ProgramRoom`, `Wall`, `Opening`, `StairCore`, `Chimney` (unchanged); `BaseWing.spans` "written and cleared only by S11 … Its span ring and its extent above the ground are as Wing.spans below, so the capacity (below), the leaf digest of the building and §8.5's span mark read them before any composition exists, and a composition inherits them"; the stage-3 contract, the fourth rung and step 1 read "`spans` (on the base or the composed wing)"; J-P48 (2) "a stored room's point in a spanned passage's span ring … in the rings of the footprint face ∪ that span ring (`carryWings`' `spanned`; J-A30.23)"; the carry trigger adds "that passage's face among the L3 faces it changed or one of its vertices among the vertices it moved" | V-MAB2-06, 07, 09, 15 |
| 28 (f) (home) | PRESENT, with defects | PRESENT, with defects | `Plot.fieldBand` "the occupants' band — the plot's prosperity band by §4.5's rule with its hysteresis read against this column, so the band's memory moves with the band (J-A28.29) … re-banded after S6 at every epoch (§4.11)"; the interior ladder "(the plot's `fieldBand`, §2.5, kept until the value crosses a cut by more than the hysteresis and re-banded at every epoch …)"; the capacity bullet "The generation fill (§4.7: S10b places the households on the plot; S11, which creates the building and its wings, writes `Building.households` clamped into [1, capacity])"; the re-cut "FIXED, each in the form the transient arena takes it … the shell — each storey's seed rings … opened again unchanged as the arena's seeds; every entrance and its door and the hearths — anchors …; and, passed as `fixed` rings, the stair core's bay, the chimney stacks, the passage room …, the composer's rooms and the rooms the least-disruption rule below keeps"; "a room whose seed ring — … its wing's extent at that storey clipped to tile as step 4 passes it, or `Basement.ring` — is unchanged"; "that re-cut establishes J-P48 (1) for its new walls in the same event … read on its rings with the `composition`-role vertices removed"; "**Bars:** §13.2's T28-13 – T28-18." | V-MAB2-01 (major), 02, 03, 04, 05, 09, 12 |
| 29 (home) | PRESENT, one follow-up elsewhere | PRESENT, with defects | step 3 "a core that serves the basement takes a bay that lies inside `Basement.ring` as well as inside its wing's seed at every storey it serves … a `trapdoor` access — the row's, or the fallback where no candidate fits the ring … — is a core of kind `trapdoor` … the fallback is reported and writes no building record … (§5.2, tier 1; J-A29.25)"; `Basement.access` comment follows; §7.5 now fills `nextEntrance`, `households`, drops `occupants` (V-MAB1-15 fixed) | V-MAB2-10, 11, 14 |
| 8 | PRESENT | PRESENT | unchanged (`Building.reusedAs`; §2.8 `reused`) | — |
| 10, 11, 12, 16, 17, 18, 19, 22, 24, 25, 27 | PRESENT | PRESENT (kept from r1; the §2 text they rest on is unchanged by repair r2, checked in the word diff) | as verify-model-r1 §1 | — |
| 20 | PRESENT | PRESENT | §2.8 `Identity.dossier` "carried by the entity the element is — its Use (§2.7), a dossier institution's Institution record (§2.7), and for an element that is neither (a named feature …) the feature the assignment placed (§7.7) … a building or a plot, which only houses a use, never carries it, a building-granularity assignment's placed member included (… J-A20.22)" (VD1-17) | — |
| 30 | PRESENT, with defects | PRESENT, with defects | `BaseWing.spans`; `Passage.frontBuilding` "(BaseWing.spans, §2.6)"; `Wing.spans` "a composed wing takes it from the base wing it covers"; `ElaborationRecord.inputs` "the wings' spans"; the registry "its base wings' `spans`"; the carry trigger | V-MAB2-04, 06, 07, 08 |
| 31 | PRESENT | PRESENT, one stale comment | §2.6 Materials "Wear (`Building.condition`, item 31) is a rendering class over the same geometry (§8.2); a roof is lost only in the decline ladder's derelict state (`decay`, `RoofSpec.kind 'none'`, §2.8)" (VD1-16) | V-MAB2-13 |

## 2 The r1 issues re-checked (verify-model-r1 V-MAB1-01 … V-MAB1-16, and the other seats' model-owned r1 issues)

All sixteen are fixed at the installed text, the four model-owned issues of the kernel and determinism verifiers too.
No r1 fix regressed. The defects that remain are new (§4); three of them are the r1 fixes' follow-ups in other parts
that no r2 block applied (V-MAB2-03, 04, 05).

| r1 issue | owner | r2 | evidence (installed text) |
|---|---|---|---|
| V-MAB1-01 `spans` only on the composed `Wing` (major) | model | FIXED | `BaseWing.spans?: FaceRef` (l. 959); `Wing.spans` "a composed wing takes it from the base wing it covers (BaseWing.spans, above)"; `Room.ring`, the stage-3 contract, the fourth rung and step 1 read "`spans` (on the base or the composed wing)"; `ElaborationRecord.inputs` "the wings' spans"; `Passage.frontBuilding` "(BaseWing.spans, §2.6)"; J-A30.23 index row "`spans` on the base wing, which S11 writes and a composition inherits". Its §7.1 follow-up is open (V-MAB2-04) |
| V-MAB1-02 §4.6 cites `Wing.spans` | pipeline | FIXED | l. 4268–4269 "(`BaseWing.spans`, §2.6, which a composition inherits:" |
| V-MAB1-03 S10b named as the capacity's reader | model | FIXED | capacity bullet (l. 1470–1472), `Building.households` "the generation fill (S10b's placement, written by S11 once the wings exist, clamped into [1, capacity], §4.7)", J-A28.23 "the generation fill (S10b's placement, S11's write)". §5.2's tier 6 still says "S10b's fill" (V-MAB2-05) |
| V-MAB1-04 §4.7 reads the capacity at S10b (major) | pipeline | FIXED | §4.7 "Households per building (item 28 (f); J-A28.46)" (l. 4642–4657): S10b places at most `households.built`, S11 writes clamped, the overflow pass re-places |
| V-MAB1-05 stale hysteresis memory | model | FIXED in §2 | `Plot.fieldBand` (l. 866); the ladder parenthetical (l. 1430–1432); `pick`'s `field` "the plot's fieldBand (§2.5)"; `ElaborationRecord.inputs` "(Plot.fieldBand)"; §2.8 "**Three band memories, kept apart**"; `DerivationRecord.band` "for a plot, the band its derivation read; the plot's band memory after it is Plot.fieldBand"; J-A28.29 restated. The epoch step (§4.11) and the §7 paths are open (V-MAB2-03, V-MAB2-04) |
| V-MAB1-06 kept-room rule on the wing ring | model | FIXED | "a room whose seed ring — the one it lies in: its wing's extent at that storey clipped to tile as step 4 passes it, or `Basement.ring` — is unchanged"; "keeps nothing in a wing whose clipped seed changed" |
| V-MAB1-07 §3.4 / §3.10 paraphrases | kernel | FIXED | §3.4 l. 2652 "a room is kept only where its seed ring — its wing's extent at that storey, clipped to tile — is unchanged"; §3.10 l. 3152 "the extents of the wings that reach the storey (a wing's ring, or above the ground its ring ∪ the span ring …), clipped to tile, plus, on the ground storey, every spanned passage's span ring; below the ground, the basement ring" |
| V-MAB1-08 seeds called fixed rings | model | FIXED | the FIXED list quoted in §1 (seeds "opened again unchanged as the arena's seeds"; entrances and hearths "anchors placed before any cut") |
| V-MAB1-09 a stored re-cut against the shell's byte identity | model | FIXED | "that re-cut establishes J-P48 (1) for its new walls in the same event — a same-level split that moves nothing — so the shell's identity across a re-cut is read on its rings with the `composition`-role vertices removed, as §7.3 item 7 (ii) reads them (§5.3, T28-14)" |
| V-MAB1-10 §5.3 row | determinism | FIXED | l. 5616 "its rings read with the `composition`-role vertices a stored plan's re-cut adds removed (§2.6, J-P48 (1))" |
| V-MAB1-11 T28-14 | scope | FIXED | l. 10320–10322 "a stored plan's rings read with the `composition`-role vertices its re-cut adds removed" |
| V-MAB1-12 carry not triggered by the passage face | model | FIXED | the trigger (l. 1089–1094) "or — for a building whose stored composition has a wing that spans a passage (`spans`) — that passage's face among the L3 faces it changed or one of its vertices …"; `carryWings`' `spanned` (l. 1036) and `moved` "— with spanned, of a span ring's vertex too —". Its §7.3 item 1 pointer is open (V-MAB2-05) |
| V-MAB1-13 Bars range | model | FIXED | l. 1512 "**Bars:** §13.2's T28-13 – T28-18." ("T28-13 – T28-17" occurs 0 times) |
| V-MAB1-14 §2.9 view-key defaults restated | model | FIXED | "`storey` (the storey the building band draws; its default is §8.5's, J-A28.82), `depthBand` (…; its default is §8.4's, J-A12.81), `plotsOnly` (the cadastral plots-only view; §8.5, item 28)" |
| V-MAB1-15 §7.5 transforms | determinism | FIXED | §7.5 "(items 11, 12, 17, 20, 28, 29, 30, 31)"; "(ordinal 0, `nextEntrance` 1)"; "a building's `households` is filled … its retired `occupants` list is dropped (J-A28.29); `condition` is `kept` and `reusedAs` absent; a block's `reach` is `open` …". The r2 attribute `fieldBand` is not filled (V-MAB2-04) |
| V-MAB1-16 `YardPart` never declared | model | FIXED | `interface YardPart { id; kind: string /* data-defined — … (§10.2 DesignationTemplateRow.yard) … */; face: FaceRef /* L4 … */; lifecycle }` (l. 872–873); `Plot.yard` "(YardPart, below)"; §10.2 `DesignationTemplateRow.yard` exists (l. 8844). The seat's `kind: string` over a closed union matches §10.2's `part: string` — accepted |
| VK1-03 FIXED list and kept-room rule | model | FIXED | with V-MAB1-06 and V-MAB1-08 |
| VK1-04 basement core outside `Basement.ring` | model | FIXED in §2 | step 3 (l. 1366–1374) and J-A29.25; the seat's deviation (a `trapdoor` core, not a wall opening) is sound — it reuses `StairCore` and keeps "stairs … stacked by construction". T28-3 is not updated (V-MAB2-14) |
| VD1-16 roof lost late as a rendering class | model | FIXED | Materials paragraph quoted in §1; §4.11 rung 1 agrees (l. 4969–4971). `RoofSpec`'s own comment is left stale (V-MAB2-13) |
| VD1-17 dossier on the placed member | model | FIXED | `Identity.dossier` quoted in §1; J-A20.22 index row and Part A entry |

## 3 Cross-part notes addressed to model after repair round 2 — reflected?

| from | the note | in §2 now | verdict |
|---|---|---|---|
| pipeline §4 | the static-baseline sentence "does not cover a building that S11's overflow pass re-placed a household into" | l. 1442–1443 unchanged: "with no epoch every building houses its template row's `households.built`, clamped into [1, capacity]" | NOT reflected — V-MAB2-12 |
| kernel "Cross-part notes" (1) | step 4 may name the clip call `tileRings` | step 4 reads "§3.4's seed contract"; `tileRings` occurs 0 times in §2 | NOT reflected — folded into V-MAB2-09 |
| kernel (2) | "A wing whose extent at a storey lies wholly inside a later wing's is now refused. §2.6 should rule on it" | no rule in §2.6 ("wholly inside" 0 hits); §5.2 tier 2 calls a seed refusal "a bug that aborts the rung", as the composition contract is supposed to exclude it | NOT reflected — V-MAB2-09 |
| kernel (3) | the kept-room rule must compare the clipped piece | it does ("clipped to tile as step 4 passes it") | reflected; its gloss is one-sided (V-MAB2-09) |
| rendering "Order dependency" | VR1-02 cites `BaseWing.spans`, which only the model block declares | declared (l. 959); §8.5 l. 8064–8065 reads it | reflected |
| determinism "Cross-part dependencies" | "V-MAB1-09 adds §2.6's sentence that §5.3's interior-ladder row cites" | present (l. 1501–1503) | reflected |
| assemble-r2 §8 (4) | `fieldBand` and `spans` named in none of §7.1, §7.4, §7.5 (and §6.2) | §6.2's leaf is "attributes in schema order", which covers both without naming them; §7.1, §7.4, §7.5 still lack them | open — V-MAB2-04 (determinism) |
| assemble-r2 §8 (1) | F-PLAN tier 6 "S10b's fill" | unchanged (l. 5586) | open — V-MAB2-05 (determinism) |
| assemble-r2 §8 (6) | T28-3 trapdoor core | unchanged (l. 10296–10297) | open — V-MAB2-14 (scope) |
| assemble-r2 §8 (8), the model seat's "New observation" | a shell change can drop the capacity below `Building.households` with no re-clamp path | §4.7 now re-homes for S11's operator only; heights `setAttr`, carries and §7.6 row edits have no path | open — V-MAB2-01 (major) |
| model seat's own follow-ups | §4.11 re-bands `fieldBand`; §7.3 item 1 passage-face scope; §5.2 tier 6 | none applied | open — V-MAB2-03, V-MAB2-05 |

## 4 Issues found in this round (id · item · severity · kind · owner — claim — required change)

Numbered V-MAB2-nn, most severe first. Each was read at the installed text (`831efd42…`); "PLAUSIBLE" marks a claim
that rests on reasoning about behaviour rather than on the text alone. Every "Required change" wording is this seat's
proposal for the repairers.

**V-MAB2-01 · 28 (f) · major · new-problem · model.** The capacity bound has no maintenance path for most changes that
lower it. §2.6 states the invariant: `Building.households` "its length … never above the capacity (below)", and the
capacity reads the extents' area per storey, the storey count, and rows (`households.max` at the `builtBand`, the
poorest programme row's `circulation` and `room` area). §4.7 re-homes the excess only "wherever S11's operator later
builds or changes a residential shell — an epoch's new faces, a rung-3 re-cut, a designation mutation (item 18)". Four
other paths lower the capacity with nothing to re-clamp it: a `setAttr` of a building's heights (§7.1 buildings row
allows "heights"; fewer `floors` shrink Σ A(s)); a `warp` or `moveVertex` whose carry shrinks the footprint; a spanned
passage's face moved (the span ring above the ground shrinks); and a §7.6 edit of a row the function reads (a larger
minimum `room` area lowers every building's capacity at once). Nothing in §7 mentions it (the only capacity mentions are
`relet`'s). The consequence: §5.2 F-PLAN tier 6 treats a housed count the rung cannot cut as "a bug that aborts the
rung with its stream key", so an ordinary heights edit on a tenement makes its plan unbuildable, and T28-17's "every
roster household is housed" fails. The model seat reported it ("New observation"); assemble-r2 §8 (8) left it here.
**Required change (§2.6, the capacity bullet, after "so the solver and the plan never disagree on how many households a
shell holds."):** insert "The bound holds through every change: a committed change that lowers a building's capacity
below its `households` count — S11's operator (§4.7), the carry after a `warp`, a `moveVertex` or a change of a spanned
passage's face (the wing-carrying rule, above), a `setAttr` of its heights, or a §7.6 edit of a row this function reads
(the designation template's `households.max`, the poorest programme row's `circulation` or `room` area) — re-homes the
households past the capacity, the last in address order, by §4.7's overflow pass inside the causing event, each move a
lifecycle event of it (§2.8); a hand edit lists the moves among its dry-run fates and takes the receiving buildings into
its effective scope (§7.3 item 1), and its undo restores them (§7.4). No such change is refused for it; only a hand
`relet` above the capacity is (F-EDIT)." J-A28.23's Part A entry adds one sentence: "the bound is kept through every
change that lowers the capacity by re-homing the excess, never by refusing the change". Follow-ups: V-MAB2-02 (§4.7),
V-MAB2-05 (§5.2, §7.3). (The re-home over a refusal is this seat's proposal, PLAUSIBLE; it follows §7.3 item 1's
relocation precedent, "each displaced use's new site".)

**V-MAB2-02 · 28 (f) · minor · duplicate · pipeline.** With V-MAB2-01 the list of changes that re-home lives in §2.6;
§4.7's last sentence keeps its own shorter list. §4.7 (l. 4654–4657): "The same holds wherever S11's operator later
builds or changes a residential shell — an epoch's new faces, a rung-3 re-cut, a designation mutation (item 18): a result
whose capacity falls below its households re-homes the excess by the same pass inside the causing event, each move a
lifecycle event of it (§2.8), as `relet` keeps to the capacity (§4.11)." **Required change:** → "The same pass runs
inside every change §2.6's capacity rule lists — S11's operator building or changing a residential shell (an epoch's new
faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's capacity falls below its
households, each move a lifecycle event of it (§2.8), as `relet` keeps to the capacity (§4.11)."

**V-MAB2-03 · 28 (f) · minor · broken-reference · pipeline.** §2.5 makes the epoch the writer of `fieldBand`'s band
memory — "re-banded after S6 at every epoch (§4.11)" — and §2.6 and §2.8 repeat the pointer ("re-banded at every epoch";
"re-banded after S6 at every epoch"), but §4.11 states no such step: `fieldBand` occurs 0 times outside §2, and §4.11's
trigger bullet (l. 4947–4948) reads "After S6 re-evaluates the drivers (§4.5) each block's band is read again against the
town's `FieldBands` …". Without the step an epoch never moves the occupants' band (an epoch never re-derives plots,
§2.5), which is what V-MAB1-05's fix depends on, and the order against rung 1 (which "the interior read[s] the field
band") is unstated. **Required change (§4.11, the trigger bullet):** "After S6 re-evaluates the drivers (§4.5) each
block's band is read again …" → "After S6 re-evaluates the drivers (§4.5), each live plot's `fieldBand` is re-banded
against its own column by §4.5's rule (§2.5; J-A28.29) in the epoch's batch, before any rung reads the field band, its
former values in the epoch's undo record; then each block's band is read again …".

**V-MAB2-04 · 28 (f), 30 · minor · missing · determinism.** The two attributes repair r2 added are declared derived
in §2 ("derived — no setAttr (§7.1)"; "written and cleared only by S11") and §2.8's registry requires that "every new
attribute has its edit kind or is declared derived (§7.1)", but §7 names neither: `fieldBand` and `spans` occur 0 times
in §7.1, §7.4 and §7.5, and §2.8's "a document written before these attributes existed gets `builtBand` and `fieldBand`
from `DerivationRecord.band` … (§7.5)" points to a transform §7.5 does not state. **Required change:** (i) §7.1
"blocks, plots" row, after "never `builtBand` or `builtProsperity`, derived state written only by the paths §4.11's
floor paragraph lists — J-A31.44, J-A31.71;" insert "never `fieldBand`, derived state written only by a derivation that
reads the current field and by the epoch's re-banding (§2.5, J-A28.29);"; the "buildings" row's derived list, after
"`predecessor` (written by `reuse … build`, §4.11)" insert ", each base wing's `spans` (written and cleared only by S11
when it builds or re-fits a passage's front building, §2.6)"; J-A31.76's index row adds "and a plot's `fieldBand` and a
base wing's `spans`" to its derived list. (ii) §7.4, a row after the `builtBand` row: "| `fieldBand` (a plot attribute,
item 28 (f) — not an event kind: its paths) | every derivation that reads the current field (generation, `Adjust`, a
brush's re-derivation past τ) and the epoch's re-banding after S6 (§2.5, §4.11) | §2.6's interior ladder, `ClassRules.pick`
and the plan rung's recorded inputs (§2.8) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep
settings) keeps it; `Adjust` and a brush set it in their scope; an epoch re-bands it | restored by the undo record of
whichever event wrote it, an epoch's among the entities it replaced | a document written before the attribute existed
gets `fieldBand` = the band its plot's `DerivationRecord.band` holds (§7.5) |"; the epoch row's regenerate cell, after
"§4.11's incremental path at its log position:" insert "each plot's `fieldBand` re-banded after S6 (§2.5),". (iii) §7.5,
after "for one with epochs, the band its last derivation read;" insert "its `fieldBand` is that same band;", and after
"(no older document has a passage)" insert ", so no base wing carries `spans`".

**V-MAB2-05 · 28 (f), 30 · minor · conflict · determinism.** Two determinism texts lag the r2 model. (a) §5.2 F-PLAN
tier 6 (l. 5586): "the count the rung must house is bounded upstream by §2.6's capacity, which S10b's fill and `relet`
keep to (§4.7 S10b, §4.11)" — the home now says "the generation fill (… S11 … writes `Building.households` clamped into
[1, capacity])" (V-MAB1-03), and with V-MAB2-01 a re-home keeps it too. (b) §7.3 item 1 (l. 6626–6639) defines the
effective scope and lists its additions (the seam exception), but not the ones §2.6 now relies on: "an edit that changes
the passage face takes the building into its effective scope, as J-P48 (1)'s split faces are, §7.3 item 1" (the carry
trigger, l. 1092–1094), and V-MAB2-01's receiving buildings; the scope shown before commit would omit a building the
carry then writes. **Required change:** (a) → "which the generation fill (S10b's placement, S11's clamped write),
`relet` and §2.6's re-homing keep to (§4.7, §4.11, §2.6)"; (b) append to §7.3 item 1: "A stored composition adds what
§2.6 names — the faces J-P48 (1)'s split edges touch, and the front building of a spanned passage whose face the edit
changes — and a change that lowers a building's capacity below its households adds the buildings §2.6's capacity rule
re-homes them into."

**V-MAB2-06 · 28 × 30 · minor · new-problem · model.** A cached plan is not marked stale when the passage it spans
moves. The plan's extents above the ground and its ground-storey passage room are the span ring, "derived at read" from
the `Passage` face (L3) and the wing's ring. The plan rung's recorded inputs are "for a building: its leaf digest (wings,
heights, entrances, basement, class, use, assignment, sub-locations, the wings' spans), the occupants' band … and the
households housed" (§2.8 l. 1698); a leaf holds "attributes in schema order ‖ digests of the faces and chains it owns"
(§6.2 l. 5873), and the building owns its footprint face, not the passage face, while `spans` is a `FaceRef` whose
value does not change when the face's ring does. So a `moveVertex` on the passage's far side line (or its kerb or court
end) changes every spanning building's extents while its `plan` rung stays `current`, and the cached plan no longer
tiles them (T28-4's bar). V-MAB1-12's fix covers a stored composition's carry only. **Required change (§2.8):**
`ElaborationRecord.inputs` "…sub-locations, the wings' spans), the occupants' band …" → "…sub-locations, the wings'
spans), the leaf digest of each spanned `Passage` (its face's ring, from which the span rings are read, §2.6), the
occupants' band …"; and the `stale` gloss "the storeys, the wing rings, the households" → "the storeys, the wing rings or
a spanned passage's face, the households".

**V-MAB2-07 · 30 · minor · new-problem · model (PLAUSIBLE).** Which composed wings carry `spans` is not determined.
`Wing.spans` (l. 987): "a composed wing takes it from the base wing it covers (BaseWing.spans, above), so a composition
inherits the span and never decides it". The stage-3 contract fixes only that the composed wings' union equals the
outline's union; a composed wing may cover two base wings, part of one, or a part away from the passage's edge, so "the
base wing it covers" names no unique source, and a composed wing that takes `spans` without a side on the passage's edge
has no span ring by `Wing.spans`' own cut ("the end segments of the two wing-ring sides meeting the passage's edge").
`BaseWing.spans` already uses the edge criterion ("on each base wing whose ring runs along the passage's edge").
**Required change:** "a composed wing takes it from the base wing it covers (BaseWing.spans, above), so a composition
inherits the span and never decides it." → "a composed wing whose ground ring runs along the edge of a passage that a
base wing spans takes that `BaseWing.spans` (above) — every such composed wing, and no other — so a composition inherits
the span and never decides it."

**V-MAB2-08 · 30 · minor · conflict · model.** `BaseWing.spans`' comment names the wrong ladder kind: "written and
cleared only by S11, when it builds or re-fits the passage's front building or the passage goes (§4.6, §4.7 S10 (9); a
drawPassage or a thin … back_court reaches it through that re-fit, §7.1, §4.11)". `thin … back_court` only seals the
passage — §4.11: "`thin … back_court` … the passage sealed", and `sealPassage` sets `Passage.sealed`, "no geometry
change" (§2.5) — so it neither builds nor removes a passage and runs no re-fit; the kinds that make or remove one are
`densify … back_court` ("cuts a yard into rear plots reached by a new passage", §4.7 l. 4325, §4.11 l. 4978–4979), a
block's `reach` set to `passage` (§7.1, J-A30.72) and the rung-3 re-cut that removes a sealed passage with its rear row
(§4.11 l. 5431–5433). **Required change:** "(§4.6, §4.7 S10 (9); a drawPassage or a thin … back_court reaches it
through that re-fit, §7.1, §4.11)" → "(§4.6, §4.7 S10 (9); a `drawPassage`, a block's `reach` set to `passage`,
`densify … back_court`'s new passage and the rung-3 re-cut that removes a sealed passage with its rear row reach it
through that re-fit, §7.1, §4.11 — `sealPassage` and `thin … back_court`'s sealing change no geometry and leave it)".

**V-MAB2-09 · 28 (f) · minor · missing · model.** The seed clip refuses one composition §2.6 does not exclude. §3.4 (l.
2616–2618): "A piece left with a hole — an earlier ring wholly inside a later one — is refused (`E_DEGENERATE`, detail
`overlap` …), because a seed is one ring"; §5.2 tier 2 treats a seed refusal as "the shell §2.6's composition contract
guarantees, so its refusal is a bug that aborts the rung". §2.6's contract says only that the seed rings "stand at least
`attractCm` apart except where they share a joint" (l. 1260–1262), and step 4 clips "each extent less the union of the
extents before it in wing order: §3.4's seed contract" (l. 1377–1378) with no rule for a wing whose extent lies wholly
inside a later wing's (a stage-3 composer's inner block, a hand-stored composition). The kernel seat asked §2.6 to rule
on it and to name the clip call. Also the kept-room gloss "— so a later wing's rooms are re-cut too where an earlier
overlapping wing changed" is one-sided: §3.4 says "every ring, an earlier one included, carries each crossing vertex the
overlay placed on its sides", so an earlier wing's piece also changes when a later crossing wing does. **Required
change (§2.6):** (i) the stage-3 contract, after "stand at least `attractCm` apart except where they share a joint":
insert "; the clip takes the wings that reach a storey in wing order, except that a wing whose extent there lies wholly
inside another's is taken after that container, so it has no piece at that storey (its floor there is its container's)
and no piece has a hole"; (ii) step 4: "(where wings overlap, rule 4 (iii), each extent less the union of the extents
before it in wing order: §3.4's seed contract)" → "(where wings overlap, rule 4 (iii), each extent less the union of the
extents before it in wing order, a contained wing after its container (the stage-3 contract): §3.4's seed clip,
`tileRings`)"; (iii) the gloss → "— so a wing's rooms are re-cut too where an overlapping wing, earlier or later, changed
its piece (the clip's crossing vertices included, §3.4)". (The container-after rule is this seat's proposal, PLAUSIBLE;
the kernel seat offered it first.)

**V-MAB2-10 · 29 · minor · conflict · model.** The basement's access is decided in two places with no precedence.
`Basement.access` (l. 1019) is "how the plan rung joins it", and "Basements" says the basement "is joined by the stair
core, a trapdoor or an outside stair (`Basement.access`, read by the plan rung)" (l. 1329) — but gives no rule deriving
it; step 3 instead joins "the basement by the row's `basementAccess`" (l. 1367), a column of `RoomProgramRow` (§10.2 l.
8921), which is keyed by band and read at the occupants' band. The two can disagree, and reading the row at the
occupants' band would change the shell's basement access with the occupants, against T28-14's "the shell stays
byte-identical … its … basement". The repair seat reported it as pre-existing; it sits in the repaired step 3.
**Required change (§2.6):** "Basements": "and is joined by the stair core, a trapdoor or an outside stair
(`Basement.access`, read by the plan rung)" → "and is joined by the stair core, a trapdoor or an outside stair —
`Basement.access`, derived with it: `external` for a walk-out, else the class programme row's `basementAccess` read at
the plot's `builtBand` (§10.2), a shell fact that never moves with the occupants and is edited with the basement
(`setAttr(basement)`) — which the plan rung reads"; step 3: "the basement by the row's `basementAccess`" → "the basement
by `Basement.access`". Follow-up: V-MAB2-11. (The derivation rule is this seat's proposal, PLAUSIBLE.)

**V-MAB2-11 · 29 · minor · conflict · pipeline.** With V-MAB2-10, §10.2's `RoomProgramRow.basementAccess: 'core'|'trapdoor'|'external';` (l. 8921) carries no comment saying it is the default `Basement.access` derives from rather than a second decision. **Required change (§10.2):** → `basementAccess: 'core'|'trapdoor'|'external' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand; the plan rung reads Basement.access */;`.

**V-MAB2-12 · 28 (f) · minor · stale · model.** The static-baseline sentence contradicts §4.7. §2.6 (l. 1442–1443): "with
no epoch every building houses its template row's `households.built`, clamped into [1, capacity], so the static baseline
is unchanged". §4.7 (l. 4642–4651): S10b places "per residential slot … at most the row's `households.built`", and the
overflow pass re-places a household the clamp leaves into "the district's residential buildings that house fewer
households than their capacity" — so with no epoch a building may house fewer than its row's count, or more (up to its
capacity). §10.2 already says it right (l. 8946–8947: "clamped to its capacity with the overflow re-placed (§4.7)"). The
pipeline seat's note asked for this. **Required change:** → "with no epoch every building houses what the generation
fill gives it — its slot's households, at most its template row's `households.built`, clamped into [1, capacity], plus
any that §4.7's overflow pass re-placed into it — so the static baseline is unchanged".

**V-MAB2-13 · 31 · minor · stale · model.** `RoofSpec.kind 'none'` is still glossed "a ruined building's roofless state
(§2.8 decline hooks)" (l. 976), while the repaired Materials paragraph says "a roof is lost only in the decline ladder's
derelict state (`decay`, `RoofSpec.kind 'none'`, §2.8)" and §2.8 lists "derelict (`decayed`, roofless: `RoofSpec.kind
'none'`) → ruin (`ruined`)" (so is §8.2's row, l. 7792). **Required change:** "'none' /* a ruined building's roofless
state (§2.8 decline hooks) */" → "'none' /* the roofless state the decline ladder's `decay` sets — derelict, and kept
through ruin (§2.8 decline hooks) */".

**V-MAB2-14 · 29, 28 · minor · conflict · scope.** T28-3 (l. 10296–10297) still reads "the basement is entered by that
core or through a trapdoor the class row declares". Step 3's fallback (J-A29.25) joins the basement by "a core of kind
`trapdoor`" the plan reports where no bay of the core fits `Basement.ring`, which no class row declares, so a correct
plan fails the bar. VK1-04 and the model seat both asked for it; no r2 block applied it (assemble-r2 §8 (6)).
**Required change:** → "and the basement is entered by that core, or through a trapdoor — the one `Basement.access`
names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring (§2.6 step 3; J-A29.25)".

**V-MAB2-15 · 28 · minor · conflict · kernel.** §3.4's `transientArena` `fixed` comment (l. 2591) lists the fixed rings as
"a stair core's bay, a hearth's chimney stack, a spanned passage's room (item 30), a tower's round room — and, on a
re-cut, the rooms §2.6's interior ladder keeps"; §2.6 passes every composer's room as a fixed ring (`Composition.rooms`
"the principal rooms a Fantasy-Manor-class composer emits with its wings (a hall, a tower's round room) … the plan rung
takes them as fixed rings"; step 4 and the re-cut's FIXED list "the composer's rooms"). **Required change (§3.4):** "a
tower's round room" → "a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)".

## 5 Sweeps over the repaired §2 (§2.5, §2.6, §2.8, §2.9)

* **SINGLE-SOURCE.** Each r2 mechanism is stated once in §2: the band memory in `Plot.fieldBand` (§2.6's ladder, `pick`,
  §2.8's three memories and `DerivationRecord.band` point to it); the base-wing span in `BaseWing.spans` (`Wing.spans`,
  `Room.ring`, the contract, the fourth rung, step 1, `Passage.frontBuilding`, the elaboration inputs and the registry
  point to it); the generation fill in §4.7 (the capacity bullet, `Building.households` and J-A28.23 name it); the
  basement core's containment in step 3 (J-A29.25; `Basement.access` points to it); the dossier carrier in
  `Identity.dossier`; the view-key defaults in §8.4 / §8.5. Duplicates left: the basement access (`Basement.access` and
  the row's `basementAccess`, V-MAB2-10); outside §2, §4.7's re-home list beside §2.6's once V-MAB2-01 lands
  (V-MAB2-02).
* **STALE.** Probed in §2 on the installed text: "S10b's fill" 0, "Wing.spans" 3 (each now naming the composed wing
  beside `BaseWing.spans`), "wing ring is unchanged" 0, "passed as `fixed` rings to" 0, "T28-13 – T28-17" 0,
  "occupants:" 0, "reserved passage" 0, "central market" / "the market " 0, "licen" / "proprietary" 0, "fixed by tier" 0,
  "rich quarter" / "poor quarter" 1 each (the derived *description*, J-P1), "immutable" 1 ("not an immutable one"),
  "writes the dossier" 1 ("the module never writes the dossier"), lots drawn as buildings (§2.5 "rendering never draws
  a plot outline as a building"). Stale statements left: the static baseline (V-MAB2-12), `RoofSpec 'none'`'s gloss
  (V-MAB2-13), `BaseWing.spans`' `thin` (V-MAB2-08); outside §2, §5.2 tier 6 and T28-3 (V-MAB2-05, V-MAB2-14).
* **DEFERRAL-WORDING.** None. The eight "later" hits in §2 are ordinary English ("any later edit", "a later outline()
  call", "Every later carry", "so a later wing's rooms") and the roadmap staging of the plan rung ("adding the rung later
  is a registration"), judged in r1.
* **BROKEN-REFERENCE.** `refs.py`: 0 inside §2. All 60 J / J-P ids §2 cites resolve (script over the §2 text against the
  index and Part A). Semantic: §2.5 / §2.6 / §2.8 cite §4.11 for the epoch's re-banding of `fieldBand`, which §4.11
  does not state (V-MAB2-03); §2.5 cites §7.1 and §2.8 cites §7.5 for `fieldBand`'s derived status and migration, which
  they do not state (V-MAB2-04); the carry trigger cites §7.3 item 1 for a scope addition it does not list (V-MAB2-05).
* **NEW-PROBLEM.** The repair created or left: the capacity bound with no path through heights edits, carries and row
  edits (V-MAB2-01, major); the plan's recorded inputs blind to the spanned passage's face (V-MAB2-06); the composed
  wing's `spans` source (V-MAB2-07); the seed clip's holed piece that §2.6 does not exclude (V-MAB2-09).

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk, 2026-09-27, installed document sha256 `831efd42…`, rationale `f2c2a1ca…`).** Every quotation
above, at its line; the r1 fixes in §2's word diff against the r2 archive (`365e19f2…`) and at the other parts' lines;
`fieldBand` 0 times and `spans` 0 times outside §2 in §4.11, §7.1, §7.4 and §7.5; §4.7's re-home list naming S11's
operator only and §7's capacity mentions being `relet`'s only; §6.2's leaf holding only the faces a record owns; §3.4's
holed-piece refusal and §2.6's lack of a containment rule; T28-3's wording; §3.4's fixed list; `refs.py` (2 broken, both
external, none in §2); `doc_checks.py --sections "2"` exit 0 (C3 330/0).

**PLAUSIBLE (reasoning).** The behavioural consequences in V-MAB2-01 (a heights edit leaving more households than the
rung can cut, and F-PLAN's abort), V-MAB2-06 (a cached plan left `current` after a passage-face move) and V-MAB2-07
(a composed wing with `spans` and no side on the passage's edge); and every "Required change" wording — above all
V-MAB2-01's re-home over refusal, V-MAB2-09's container-after order and V-MAB2-10's derivation of `Basement.access` at
the `builtBand` — which are this seat's proposals for the repairers.

STATUS: COMPLETE (2026-09-27).
