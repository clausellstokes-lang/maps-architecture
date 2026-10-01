# Agreement check, round 1 — the dossier and the host (determinism, V08, V09, V10, V11) after assemble-r1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-host-r1t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] resume check (no output, no LANDED line: fresh start) · [x] brief read whole · [x] inputs (round-0 report, assemble-r1, canon dated rulings 114–125, g items 120–125, the five members' repair-r1 preambles, landed peers' r1t results) · [x] round-0 VAH-01..34 re-checked on live · [x] repair-touched shared subsections read whole · [x] g 120–125 parts per member · [x] new issues written · [x] result saved · [x] LANDED

## Scope and method

Members: determinism (§5, §6, §7 of `docs/ARCHITECTURE.md`), V08, V09, V10 and V11. The live text is assemble-r1's output: base `137ecc0e…`, V08 `b96e79d8…`, V09 `c2dc5b80…`, V10 `f8f591b3…` and V11 `9481453b…`, each equal to assemble-r1's recorded sha256. The pre-round text is git `3f0e02b`; its base sha256 `484af066…` is the one the repairs were written against.

1. **Round-0 findings.** Each of VAH-01 to VAH-34 was re-checked against the live text at every site its required change names, whichever unit owned it.
2. **Repair-touched text.** I built word diffs from pre to live for the five members and dropped the hunks that only inserted a canon ID-TOOL tool word. That left V08 87 hunks (its single whole-volume REPLACE), V09 200 (of 233), V10 151 (of 160), V11 122 and determinism §5–§7 86 (13 REPLACEd subsections). I read every hunk inside its subsection and checked each cross-member statement against its other end: the dossier seam (§7.7 ↔ V08), the binding and the outcome table (§7.1 ↔ V09 §4.3, §4.9 and V10 §3.16, §4.1), the host seam (V08 ↔ V09, V10), the tables (V11 ↔ V08, V09, V10, §7.6) and the owner items 114–120 where two members meet.
3. **Hand-offs.** I checked every cross-unit hand-off that the five repair preambles address to a member, or that a member addresses to another unit, at its destination.
4. **Owner items 120–125.** For each member that a dated ruling names, I checked its part against the item's text and raised F-MISSING where the part is absent. The ids are G1xx-<unit>; where a landed peer already raised the same id, I raise it again under that id, as the brief requires.
5. **Matrix gaps.** I hunted for shared names whose home moved this round (the reader's and oracle's types, the DR41–DR43 rows) and for dossier traces that cite fields the port ignores.

Findings already raised by landed peers are not repeated; I concur with them (list below). doc_checks was not run, since this is an agreement seat; assemble-r1's PROVISIONAL exit 0 stands, because the reference corpus is incomplete in this checkout. No design file was touched.

## Result

**42 issues**: 0 blockers, 26 major, 16 minor.
* By owner: V09 12, V11 8, V08 5, determinism 5, V10 4, V07 2, and rendering, V12, V01, V02, V03 and V05 1 each.
* By kind: F-MISSING 20, BROKEN-REFERENCE 13, DISAGREE 6, HANDOFF-OPEN 2, DUPLICATE-HOME 1.

The round-0 findings: 33 of 34 are fixed at their owner. VAH-31 persists, now at base §11.2, and is re-raised against rendering. VAH-11 is fixed, but its new table-edit row meets V11's parallel change; that conflict is VDC1-01 and VDC1-14 (concurred). VAH-32 is fixed at V11 and V08; its residues are VV1112-r1-04, -05 and -06 (concurred).

## Round-0 findings re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| VAH-01 | determinism | FIXED | `DossierChange.element.kind` gains `site`, `history`, `tradition` (l.11350); item 13's F-V8-8 data row (l.11693-11695); the `ReceiptRow` comment F-V8-8 (l.11354); V08 l.171 and V08 §3.6 (1) l.1769 cite F-V8-1 – F-V8-8 |
| VAH-02 | determinism | FIXED | §7.7 item 1 names the reasons only and cites V08 §2.4's `ignored` rows as the one list (l.11427-11437) |
| VAH-03 | V08 | FIXED | V08 §2.4: `mapEdits`, `fogSessions`, `worldState.spatialLedgers.*` and the derived reads, one row per reason (l.647-656) |
| VAH-04 | determinism | FIXED | §7.7 item 8: `HistoryHint` on the recipe, written once by the port's creation (l.11538) |
| VAH-05 | V08 | FIXED | W34 no longer lists `HistoryHint`; W39 is its row |
| VAH-06 | determinism | FIXED | `CircumstanceSlice.port` comment without a field list (l.11331) |
| VAH-07 | determinism | FIXED | key-law row for the port's own keys, citing V08 §2.3 (l.11665) |
| VAH-08 | determinism | FIXED | E-07 row 1: unlock, the closest acceptable declarations, or keep the lock (l.10117) |
| VAH-09 | V09 | FIXED | `refuse.locked`, `.warp` and `.water` carry `button.chooseMarked` (l.1912, l.1925, l.1926) |
| VAH-10 | V10 | FIXED | V10 §3.16 `lock` row: Unlock, the closest acceptable declarations, Show me why |
| VAH-11 | determinism | FIXED (new conflict = VDC1-01) | E-07 gains the viewer, islands-rung, table-edit, style, knowledge, `clerk.ops`, stale and frame rows; every '—' key is named; the lead lists the gates. The table-edit row still refuses a stamped owner-rule cell, which V11 §4.1 now allows; that is VDC1-01 (determinism) and VDC1-14 (V09), concurred |
| VAH-12 | V09 | FIXED | V09 §4.9's lead and T-V9-15 as required; every one of E-07's 42 keys has a V09 row (`refuse.clerk.opsDevice` through the family row l.2222). `refuse.table.required` is missing and `refuse.table.ownerRule` stays: VDC1-14, concurred |
| VAH-13 | V10 | FIXED | V10 §1.2's §7.1 cell; V10 §3.16's lead |
| VAH-14 | determinism | FIXED | binding T3 row: `setAttr` on `Enceinte.pathway` (l.10212) |
| VAH-15 | determinism | FIXED | water target row and binding T2 row: `WaterBody.spring.flow` (l.10071, l.10211) |
| VAH-16 | V09 | FIXED | V09 §4.3 T10 row: no `rerollLayer('forest')`; the woods by T12's New trees (l.1667) |
| VAH-17 | V09 | FIXED | V09 §4.3 `delete` row keyed as §7.1's binding (l.1675) |
| VAH-18 | V10 | FIXED | V10 §4.1's escape hatch: the leader-line switch, the quarter tint and the furniture rows under T12 `dress` |
| VAH-19 | V09 | FIXED | V09 §4.9 family table: `info.village.*` (l.2232) |
| VAH-20 | V07 | FIXED | V07 §4.5: 'as rows of V09 §4.9's catalogue (their words written here)' (l.3064) |
| VAH-21 | V09 | FIXED | the `host.*` paragraph cites V08 §3.9, §4.2, §4.6 and §5.1 (l.2210-2212) |
| VAH-22 | V09 | FIXED (residue VAH-r1-07) | V09 §2.6 cites V11 §4.2 for the cell's values and meaning. The absent-family reading remains stated only in V09, because V11 lacks it (VAH-r1-07, owner V11) |
| VAH-23 | V10 | FIXED | `ClerkDraft` (V10 §2.4 l.501 and every use) |
| VAH-24 | V09 | FIXED | V09 §2.9: 'MsgRef is §11.2's' (l.706) |
| VAH-25 | V10 | FIXED | V10 §2.13 cites §2.8's `PlacementOrder` |
| VAH-26 | model | FIXED | §2.7 declares `RaisedKind` (l.2227); V06 and V11 cite it |
| VAH-27 | V11 | FIXED | `StructureRoleRow` (V11 §2.8, §3.6.5) |
| VAH-28 | V10 | FIXED | `PlaceAnchor` (V10 §2.12 and every use) |
| VAH-29 | V10 | FIXED | V10 §1.2's §1.1 row for `LadderRouter.route`; V07's row without it |
| VAH-30 | V11 | FIXED | V11 §10c names each request by subject and section |
| VAH-31 | V10 → rendering | PERSISTS (re-raised, owner rendering) | V10 no longer types the oracle (the types moved to §11.2); §11.2 still writes the barrier union inline three times, and V10's hand-off note (2) is open there |
| VAH-32 | V11 | FIXED (residue concurred) | V11 §2.6 declares `LadderStep`; V08 §2.3 and §2.5 type by it. V01 §2.3 and §11.2 remain inline (VV1112-r1-05, -06), and V11's comment names V10 §2.13 (VV1112-r1-04) |
| VAH-33 | V08 | FIXED | V08 §8.1: M3c (V10's C5, V09's AP8); AP5b inside M-SF |
| VAH-34 | V08 | FIXED | V08 §8.1: C4b, C4a (at M2b) and C9, as V11 §8's split names them |

The round-0 hand-off residues also close. XV-V9-34 is closed: V06 §4.2 homes `downgradeWay`/`upgradeWay` at T9 `shape` (V06 l.3312). The matrix disagreement rows (EditEvent × DXC-04, T-V9-15 × V09-XAGREE-3, BCR-V10-20 × DXC-04, SettlementForge × SCOPE-C07) still hold as round 0 found them.

## Issues

### VAH-31 — major · HANDOFF-OPEN · owner rendering

**Claim.** Persists, moved with its type. Round 0 asked V10 to type the oracle's closure barrier by base §2.7's `BarrierKind` instead of restating the union. Repair r1 moved V10 §2.13's reader and oracle types to §11.2 (rendering's VAT-03, V10's VAT-04), so V10 now declares none of them. V10's repair handed the fields its fixes needed to §11.2 (repair-r1-V10.md, note (2), and its HAND-OFFS: 'rendering §11.2: note (2)'s three fields'). None landed at §11.2. (a) The union 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' is still written inline three times: `WhyAnswer.closure[].barrier` (base l.15245), `MapBrief.walls[].open[].barrier` (l.15188) and the preview arcs' `barrier` (l.15142). §2.7 declares `type BarrierKind` (l.2179). (b) `RuleAnswer.register` (l.15233-15234) still reads 'the cell's entry in V12 §2.6's plat/calibration/register.json', typed `{ id: string; status; method; due: string }`. V10 §1.2 (V12 §2.10 row), V10 §1b.1, V10 §3.5 and V12 §2.10 (l.774-790: `EvidenceFile`, whose `entry` is absent for a stamped or `ref:` cell and whose `status` admits 'owner') say the clerk reads the shipped `dist/evidence.json` and never `register.json`. The type therefore cannot carry a stamped cell's answer. (c) `WhyAnswer.members.step` is still inline; this part is VV1112-r1-06's.

**Required change.** In base §11.2: (a) type `barrier: BarrierKind /* §2.7 */` in `WhyAnswer.closure[]`, `MapBrief.walls[].open[]` and the preview's `arcs[]`. (b) Write `register?: { status: CalibrationEntry['status'] | 'owner'; entry?: string /* absent for a stamped or ref: cell */; method?: CalibrationEntry['method']; due?: string } /* the cell's row in V12 §2.10's dist/evidence.json, where one exists; an absent file, or one of other table versions: the provenance source alone; told plain first, its entry and method only behind "details" (V10 §3.5) */`. (c) Write `members?: { step: LadderStep /* V11 §2.6 */; … }`, as VV1112-r1-06 states.

### VAH-r1-01 — major · DISAGREE · owner V10

**Claim.** Two members give opposite rules for whether SettlementForge's own assistant may set Find's chips. V10 §3.9b (7), new this round (l.1895-1897), says: 'A host's own assistant (configuration C) sets the chips as it sets any per-viewer view key, by §11.3's `view.set`'. V08 §3.16 (6) (g), new this round, says SettlementForge's assistant 'answers "where are the smiths" in words from the `gazetteer` query and sets no chip — no host message sets the frame's view but `view.set { week }`'. J-V8.127 records the choice ('to let SettlementForge's assistant answer in words without setting chips, over … a host message that drives the frame's Find … Find is the viewer's view, never the host's'). V08's repair handed this to V10 (repair-r1-V08.md HAND-OFFS: 'V10 (item 120): SettlementForge's assistant sets no Find chip (J-V8.127)'), but V10 had already landed with the opposite sentence. Configuration C is SettlementForge's assistant, so one host would both drive and not drive the frame's Find.

**Required change.** V10 §3.9b (7)'s last two sentences read: 'SettlementForge's own assistant (configuration C) sets no chip: it answers in words from the `gazetteer` query (V08 §3.16 (6) (g); J-V8.127), and a host proposal carries no find form.' V10 §3.17 adds no `find` path for a host.

### VAH-r1-02 — major · DISAGREE · owner V08

**Claim.** The port's statement of how dossier events meet locks disagrees with the base precedence that this round rewrote. Base §7.7 (l.11371-11382, VEL0-01) says a dossier event 'is never refused by a lock or a pin'. A lock or pin on what the event changes (a dossier-owned value; a dossier-backed element's existence, state, name, kind or membership) 'supersedes it for what it changes — the lock or pin reported orphaned'. Its examples: a dossier rename lands on a locked name path, and a `ruined`/`removed` state closes a locked building's use. Only 'a lock on anything else the event touches' is applied around. A population fall reaches locked and pinned dwellings by `relet`. V08 §4.3 (l.2560) instead says 'A dossier event mutates only its disruption set …, around every lock, pin, positive placement and declared entity'. V08 §3.3's absorb bullet (l.1496) says the events 'are never refused by map locks or pins, around which they apply'. Neither states the supersession or the population reach. An adapter built from V08 would keep a locked name against a dossier rename, which the base's T20 fixtures refuse.

**Required change.** V08 §4.3's first sentence reads: 'A dossier event mutates only its disruption set (§7.7 item 5; T20-8) and is never refused by a lock or a pin (§7.7's precedence). A lock or pin on what it changes — a dossier-owned value, or a dossier-backed element's existence, state, name, kind or membership — is superseded for what it changes and reported orphaned, the dossier fact its `why`. Every other lock, pin, positive placement and declared entity is applied around, and a population fall reaches locked and pinned dwellings by `relet` (§7.7's precedence; V06 §3.5.1 (4)). An edit it can no longer honour is reported and orphaned, never dropped (J-A20.73).' V08 §3.3's absorb bullet reads '— never refused by map locks or pins (§7.7's precedence: a lock on what a dossier event changes is superseded and reported orphaned, every other applied around) —'.

### VAH-r1-03 — major · HANDOFF-OPEN · owner V09

**Claim.** Binding pairs that §7.1 (E-04, the one binding) gained this round have no row in V09 §4.3, the table that 'gives each row its screen' and that T-V9-12 checks 'pair by pair'. Determinism's repair handed them to V09 ('V09 §4.3: a row per binding pair VAT-08 added …'; repair-r1-determinism.md, CROSS-UNIT NOTES), and VDC0-14's fix added one more. V09's repair landed before it and the rows are absent: `moveVertex` on a shore or coast (T2 `ground`, base l.10211; V09 l.1629 lists none); `moveVertex` on an enceinte's trace, a stretch's anchor vertex (T3 `wall`, l.10212; V09 l.1632 has only a gate's crossing); `moveVertex` on a tunnel's chain (T4 `road`, l.10213; V09 l.1642's handles '—'); `moveVertex` on an island's key (T9 `shape`, l.10218; V09 l.1670 none); `instance` on a hood pin as move, remove and restyle (T6 `place`, l.10215; V09 l.1653 'add' only); `instance` on §8.10's other decoration instances (T8 `fill`, l.10217; V09 l.1657 trees only); and `regenerate` of scope `people`, §10.3's 're-derive people' (T10 `hold`, l.10219, `EditScope` l.9816, §7.4's regenerate row). V09 §4.3's T10 row (l.1667) and V09 §4.18's People panel offer no control for the last, so the action §10.3 states has no user surface.

**Required change.** V09 §4.3 adds each pair to its home tool's row with its gesture: on T2 `ground`, `moveVertex` on a shore or coast (the shore and coast handles, V09 §3.5); on T3 `wall`, `moveVertex` on an enceinte's trace, a stretch's anchor vertex among them (the trace's vertex handles); on T4 `road`, `moveVertex` on a tunnel's chain (the run's handles on Below); on T9 `shape`, `moveVertex` on an island's key (its key handle, V05 §4.2); on T6 `place`, `instance` move, remove and restyle of a hood pin (a drag, Delete, its chips); on T8 `fill`, `instance` add, move, remove and restyle of §8.10's other decoration instances; on T10 `hold`, `regenerate` of scope `people` — **Re-derive people** on the households chosen in V09 §4.18's People panel or on a household's card, previewed with its fates and one undo step (§10.3; §7.4's regenerate row). V09 §4.18 gains that control, and T-V9-12's walker covers the pairs.

### VAH-r1-04 — major · DISAGREE · owner V09

**Claim.** V09 §4.9's undo refusals offer actions other than the ones E-07, the one home of each outcome's action, names. E-07's `refuse.undo.dossier` row (base l.10126) gives 'rejectSite and placeAt for each dossier element it placed or re-designated (a dossier unassign leaves none)'. V09's row (l.1936) offers `button.otherNameHere` (a rename) and `button.showWhy`, so it has no rejectSite or placeAt. E-07's `refuse.undo.creation` row (l.10125) gives 'unassign (a blueprint assignment); rejectSite and placeAt (a dossier element)'. V09's row (l.1935) offers only `button.unassign`, so a dossier element placed at creation gets no move or not-here action. V10 reads its cards' buttons from these rows (V10 §3.5 step 3), so canvas and clerk both depart from the base.

**Required change.** V09 §4.9: `refuse.undo.dossier`'s buttons are, for a dossier element the event placed or re-designated, `button.moveIt` show(`thing`) · `button.notHere` commit(`event:notHere`), E-07's `rejectSite` and `placeAt` as `refuse.dossierRemove`'s row offers them, then `button.showWhy` why. `button.otherNameHere` is kept only for a dossier rename. Its text reads 'Changes from SettlementForge can't be undone here; you can move {thing} or mark this spot as not for it.' `refuse.undo.creation` adds the same two buttons when the creation event placed a dossier element, keeping `button.unassign` for a blueprint assignment. The codes cells cite E-07's rows.

### VAH-r1-05 — minor · DISAGREE · owner V09

**Claim.** V09 §2.6 (l.581) says 'a single place is moved (`relocateUse`) or pinned (`placeAt`, T10 `hold`)'. §7.1's binding homes `placeAt` at T6 `place` (l.10215), and V09 §4.3's own row (l.1649) puts **Free this plot** (`placeAt { lift: true }`) under T6. T10 `hold` homes `pin`, not `placeAt`. This round's tool-word pass turned the former 'T10' into 'T10 `hold`', which makes the wrong home explicit.

**Required change.** V09 §2.6: 'pinned (`placeAt`, T6 `place`)'.

### VAH-r1-06 — minor · DISAGREE · owner determinism

**Claim.** E-07's head (base l.10107) calls the dry-run outcome table 'the one home of every refusal, conflict and bend cause'. V09 §4.9's lead, as round 0's VAH-12 ruled and this round wrote it (l.1875-1878), names refusals produced outside it: §11.1's export tier (`refuse.exportTier`), §11.2's `advance` on a dossier-bound document (`refuse.dossierClock`, V06 §2.3, which V06 calls 'the dossier-clock case of the dossier-owned refusal'), the shell's screen and layer gates (`refuse.phone`, `refuse.layer`), V09 §3.9's restore (`refuse.restore.dossier`), and V10 §3.16's harness and model refusals. The base's claim of completeness contradicts the catalogue that T-V9-15 checks against it.

**Required change.** E-07's head: '(E-07; the one home of every refusal, conflict and bend cause of a dry run; §5.2's F-EDIT row cites it. The gates outside a dry run — §11.1's export tier, §11.2's `advance` on a dossier-bound document (V06 §2.3), the shell's screen and layer gates, V09 §3.9's restore and V10 §3.16's harness and model refusals — are their own sections', and V09 §4.9's lead names each producer.)'

### VAH-r1-07 — minor · DUPLICATE-HOME · owner V11

**Claim.** The meaning of an absent family in `familyWeights` is stated only by V09. Round 0's VAH-22, as applied, makes V11 §4.2 the home of the cell's 'values and meaning' and V09 §2.6 the home of its words. V09 §2.6 (l.582) still states a value fact: 'a family the cell does not hold reads Normal — a multiplier of 1'. V09's repair kept it because V11 §4.2 does not state it (repair-r1-V09.md, last note). V11 §4.2's comment (l.4561-4562) says only '× that family's soft terms …; hard needs unscaled'. V10 §2.12 writes the same cell.

**Required change.** V11 §4.2's `familyWeights` comment adds 'a family the cell does not hold multiplies by 1'. V09 §2.6 then reads '… and a family the cell does not hold reads Normal (V11 §4.2)', with no value of its own.

### VAH-r1-08 — minor · BROKEN-REFERENCE · owner V09

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V09 l.157 ('every answer a panel shows is volume 10's `WhyAnswer` (V10 §2.13)'), l.293 (W row 'V10's `WhyAnswer`'), l.592 ('The oracle's answer is volume 10's `WhyAnswer` (V10 §2.13, placed in §11.2 by file f item 468 …)'), l.630 ('V10 §2.13's `WhySection`'), l.3557 ('projected from volume 10's `WhyAnswer`') and l.4163 (AP3: 'V10's `WhyAnswer`'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V09 cites each as base §11.2's: 'the oracle's answer is §11.2's `WhyAnswer` (file f item 468), produced by each kind's `WhyProvider` (V10 §2.13; file f item 270)' at l.592, and '§11.2's `WhyAnswer`' / '§11.2's `WhySection`' at the other sites. The decision rows J-V9.25, J-V9.33 and BCR-V9-6 keep their wording as records.

### VAH-r1-09 — minor · BROKEN-REFERENCE · owner V08

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V08's decision row J-V8.101 (l.3282: 'is the why card's (V10's `WhyAnswer.profile`, V09 §2.7's `chips`)'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** J-V8.101 reads '(§11.2's `WhyAnswer.profile`, V09 §2.7's `chips`)'.

### VAH-r1-10 — minor · BROKEN-REFERENCE · owner V11

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V11 W44 (l.190: 'V10's `WhyPull.row` and `FieldDrivers`') and l.476 ('which V10's `FieldDrivers` and the "why is this quarter poor" answer cite'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V11 l.190 and l.476 read '§11.2's `WhyPull.row` and `FieldDrivers`' and '§11.2's `FieldDrivers`'.

### VAH-r1-11 — minor · BROKEN-REFERENCE · owner V12

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V12 l.787 ('the clerk's provenance answer (V10 §2.13's `RuleAnswer`)'), l.805 ('V10 §2.13's `RuleAnswer`'), l.2684 ('the clerk's "why" (V10 §2.13's `RuleAnswer`)') and l.2837 (T-V12-21: 'the clerk's `RuleAnswer` (V10 §2.13)'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V12 cites `RuleAnswer` as §11.2's at the four sites ('§11.2's `RuleAnswer`, read by the clerk, V10 §3.5').

### VAH-r1-12 — minor · BROKEN-REFERENCE · owner V01

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V01 l.187 (hook row '| V10 §2.13 | `WhyProvider`, `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull` with V11's families |') and l.2734 ('`WhyPull.family`, V10 §2.13'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V01's hook row splits into '| §11.2 | `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull` with V11's families |' and '| V10 §2.13 | `WhyProvider` |'; l.2734 reads '`WhyPull.family`, §11.2'.

### VAH-r1-13 — minor · BROKEN-REFERENCE · owner V02

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V02 l.2639 ('filling V10's `WhyAnswer` with no new field'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V02 l.2639 reads 'filling §11.2's `WhyAnswer` with no new field'.

### VAH-r1-14 — minor · BROKEN-REFERENCE · owner V03

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V03 l.176 ('and `WhyAnswer` (V10 §2.13, V10 §3.9, V10 §3.9a; BCR-V10-3)'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V03 l.176 reads 'and `WhyAnswer` (§11.2; its sections V10 §3.9, V10 §3.9a; BCR-V10-3)'.

### VAH-r1-15 — minor · BROKEN-REFERENCE · owner V05

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V05 l.205 (hook row '| V10 §2.13 (`WhyProvider`, `FieldDrivers`, `WhyAnswer.closure`) |'), l.1631 ('V10's `WhyAnswer.closure`') and l.2055 ('V10's `FieldDrivers`'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V05's hook row reads '| V10 §2.13 (`WhyProvider`); §11.2 (`FieldDrivers`, `WhyAnswer.closure`) |', and l.1631 and l.2055 cite §11.2's `WhyAnswer.closure` and `FieldDrivers`.

### VAH-r1-16 — minor · BROKEN-REFERENCE · owner V07

**Claim.** A shared type cited at a home it left this round. Repair r1 moved the reader's and the oracle's types — `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink`, `FieldDrivers` — from V10 §2.13 to base §11.2 (rendering's VAT-03, V10's VAT-04). V10 §2.13 now opens 'The reader's and the oracle's types are §11.2's' and keeps only `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`, `LookAnswer` and `FindAnswer`. This unit still names V10 as the home of moved types at: V07 §4.5's village `WhyProvider` paragraph (l.3064: '`asNow` modes (V10's `WhyAnswer`)'). The chain resolves only through V10's pointer, and the text names the wrong owner of a shared type (principle (1)).

**Required change.** V07 l.3064 reads '(§11.2's `WhyAnswer`)'.

### VAH-r1-17 — minor · BROKEN-REFERENCE · owner V09

**Claim.** Derivation rows cited by names §7.7 does not carry. This round numbered the item-117 and item-118 derivation rows DR42 and DR43 (base l.11625-11626; aliases 'the item-117 row' and 'the item-118 row'). V08 cites them by number everywhere (J-VI.13's rule for the port's rows). §7.7 has no 'calendar row' or 'traditions row'. 'The calendar row' is §4.11's season table (§4.11 *The clock* (3)), and `traditions` is V08's digest field. This unit still cites them by the old names at: V09 l.357 ('§7.7's traditions row'), l.388 ('§7.7's calendar row (item 117 (c))'), l.389 ('§7.7's traditions row (item 118)'), l.964 ('§7.7's calendar row sets the week'), l.3273 ('the week is §7.7's calendar row's') and l.3285 ('each festival §7.7's traditions row …').

**Required change.** V09 cites the rows by number at each site: '§7.7's DR42' for the calendar week and season, '§7.7's DR43' for the festivals.

### VAH-r1-18 — minor · BROKEN-REFERENCE · owner V10

**Claim.** Derivation rows cited by names §7.7 does not carry. This round numbered the item-117 and item-118 derivation rows DR42 and DR43 (base l.11625-11626; aliases 'the item-117 row' and 'the item-118 row'). V08 cites them by number everywhere (J-VI.13's rule for the port's rows). §7.7 has no 'calendar row' or 'traditions row'. 'The calendar row' is §4.11's season table (§4.11 *The clock* (3)), and `traditions` is V08's digest field. This unit still cites them by the old names at: V10 l.358 ('the inputs of DR1–DR40 and of the condition, calendar and traditions rows (§7.7 item 10)'), l.375 ('§7.7's calendar and traditions rows'), l.986 ('§7.7's calendar row'), l.988 and l.1848 ('§7.7's traditions row').

**Required change.** V10 l.358 reads 'the inputs of DR1–DR43 (§7.7 item 10)'; l.375, l.986, l.988 and l.1848 cite '§7.7's DR42' and '§7.7's DR43'.

### VAH-r1-19 — minor · BROKEN-REFERENCE · owner V11

**Claim.** Derivation rows cited by names §7.7 does not carry. This round numbered the item-117 and item-118 derivation rows DR42 and DR43 (base l.11625-11626; aliases 'the item-117 row' and 'the item-118 row'). V08 cites them by number everywhere (J-VI.13's rule for the port's rows). §7.7 has no 'calendar row' or 'traditions row'. 'The calendar row' is §4.11's season table (§4.11 *The clock* (3)), and `traditions` is V08's digest field. This unit still cites them by the old names at: V11 W84 (l.230: '§7.7's calendar …') and W85 (l.231: '§7.7's `traditions` row').

**Required change.** V11 W84 and W85 cite '§7.7's DR42' and '§7.7's DR43'.

### VAH-r1-20 — minor · BROKEN-REFERENCE · owner V07

**Claim.** Derivation rows cited by names §7.7 does not carry. This round numbered the item-117 and item-118 derivation rows DR42 and DR43 (base l.11625-11626; aliases 'the item-117 row' and 'the item-118 row'). V08 cites them by number everywhere (J-VI.13's rule for the port's rows). §7.7 has no 'calendar row' or 'traditions row'. 'The calendar row' is §4.11's season table (§4.11 *The clock* (3)), and `traditions` is V08's digest field. This unit still cites them by the old names at: V07 W80 (l.276: '§7.7's calendar row (the dossier's week)') and W81 (l.277: '§7.7's `traditions` row (window, staging)').

**Required change.** V07 W80 and W81 cite '§7.7's DR42' and '§7.7's DR43' (the aliases 'the item-117 row' and 'the item-118 row' resolve as well).

### VAH-r1-21 — major · DISAGREE · owner V11

**Claim.** V11's dossier trace for item 118 names a field the port never reads. V11 W85 (l.231), the wiring row of the festival tables, has a 'dossier field and derivation row' cell that reads '`traditions[]` (window, staging, kind by V08's `festivals` row set), `culturalIdentity`, deities'. V08 §2.4's field table puts `culturalIdentity` on an `ignored` row ('prose beyond a description seed (§7.7 item 1)', l.656). V08 §3.16 (5) says the decorations take 'their colours and motifs from `site.culture` (the culture's key, never the `culturalIdentity` prose)'. DR43 reads `site.culture` and the deity (base l.11626). The trace therefore names an input that the closed digest forbids (principle (7): every derived map fact traces to its dossier inputs).

**Required change.** V11 W85's dossier cell: '`traditions[]` (window, staging, kind by V08's `festivals` row set) and `customContentRoster.traditions`; `site.culture` (from `config.cultureProfileKey`, V08 §2.4) and the deity — §7.7's DR43'.

### G122-determinism — major · F-MISSING · owner determinism

**Claim.** Item 122 (crisis looks; J135) routes to determinism '§7.7 (the derivation row: every stressor type and condition archetype → its look kind or "no look"; knowledge admission of a condition)'. §7.7's table ends at DR43, and no row or text of §5–§7 names a crisis look, a stressor-to-look mapping or a condition's admission for a look. V08 reads the stressors and conditions only into `ConditionOverlay` (DR28's calamities, the Works share), so the dossier end of the item has no derivation row to trace through.

**Required change.** §7.7 adds a derivation row after DR43 (by ID-DR's numbering): 'crisis looks (item 122: a look only, never in the model or its hash)'. Its inputs are the `ConditionOverlay`s standing in the view's week (§2.7: archetype, severity, `sinceWeek`, `untilWeek`), the calamities' `targets`, and, where given, the forces' and groups' headcounts (item 122 (h), V08). Its rule maps every SettlementForge stressor type and condition archetype to a look kind or 'no look' by V08's closed mapping and §10.2's crisis look table, scale by severity and tier, the aftermath through the epoch path. Its chance is a view-only keyed draw (item 122 (c)). Its admission is §11.2's at the viewer's key, a withheld condition not drawn. Its bar: the hash identical with crises on and off and in every week.

### G123-determinism — major · F-MISSING · owner determinism

**Claim.** Item 123 (a ruined building's plans damaged, never redrawn; J136) routes to determinism '§6.3 (one keyed threshold per plan element by lineage and element id; no new ids; monotone in the decay level)'. §6.3 and §6.1's registry hold no damage threshold or concern for it.

**Required change.** §6.3 adds the damage thresholds: each plan element (wall run, floor area, door, window, stair, roof bay, furniture piece) draws one threshold in [0, 1) from a keyed draw on (the building's lineage, the element id). It mints no id, is independent of the decay level and is never re-drawn, so an element shows damaged exactly when the building's decay level passes its threshold (monotone; restoration reverses it). §6.1's registry gains the concern with its stream and key, a view or derivation draw outside the model's streams if the canon so routes. §6.5 gains the bars of item 123 (f) that are determinism's: the same element breaks at the same level for a seed, and ids are identical between the intact and the damaged plan.

### G124-determinism — major · F-MISSING · owner determinism

**Claim.** Item 124 (intermittent light weather; J137) routes to determinism '§6.1 (the view-only, session-seeded weather stream, replayable from seed and clock, never touching the model's streams)'. §6.1 has no weather stream.

**Required change.** §6.1 adds the weather timeline's stream: view-only, seeded per session, a pure function of (the session seed, the clock), so a test replays it. It is outside every model stream, digest and tile key, and listed in the registry with its key and the rule that no model stage reads it. §6.5 adds the replay bar of item 124 (i).

### G125-determinism — major · F-MISSING · owner determinism

**Claim.** Item 125 (the dossier the only data input; J139) routes to determinism '§7.7 (DR1, DR3, DR19, DR29 and DR42 re-sourced to the dossier or the generator's fallback)'. DR1 still reads the realm cell (base l.11584), DR3 the realm partners, DR19 the realm cell's resources, DR29 the realm block's `cell.latDeg` (l.11612) and DR42 `HostContext.week` (l.11625). §7.7 item 1 still names `HostContext` as an optional input and describes the realm block (l.11423, l.11438-11441).

**Required change.** Re-source DR1, DR3, DR19, DR29 and DR42 per item 125 (a)-(b). Each reads the dossier's field where it carries one, else the generator's own default or the user's setting, the fallback reported. DR42's week is the dossier's latest stamped tick (its conditions' `triggeredAt`, its calamities' and history's ticks), else the user's season control (midsummer standalone). Item 1 restates `HostContext`'s view commands as commands, not inputs (item 125 (c)).

### G122-V08 — major · F-MISSING · owner V08

**Claim.** Item 122's V08 part ('every stressor type and archetype and the calamities' targets read at the baseline; the closed mapping'; J135) is absent. V08 reads `stressors`, `activeConditions` and `calamityHistory` only into the `conditions` row, the `threats` row and DR28, and no V08 text maps a type or archetype to a look or to 'no look' (item 122 (b)).

**Required change.** V08 adds the closed mapping as a dossier row set: every SettlementForge stressor type and condition archetype at the pinned baseline maps to its look kind or 'no look', and the calamities' `targets` are read for the disaster look. A field section names the paths and their fallbacks, with a lifecycle row, a T-V8 bar (every type and archetype has its row) and SF4's content.

### G122h-V08 — major · F-MISSING · owner V08

**Claim.** Item 122 (h)-(i)'s V08 part ('force, coalition and travelling-group sizes read from the dossier when present, confirmed by item 125 (d)'; J138) is absent. V08 reads no army, coalition or travelling-group size.

**Required change.** V08 adds the field-table rows for the forces', coalitions' and travelling groups' headcounts. Each reads the dossier path where present, with its fallback (item 122 (b)'s scale by severity and tier, or `exodus` and arrivals), and is marked in-development and confirmed by item 125 (d)'s final check. A digest field and the derivation row they feed (G122-determinism's row) follow, with a T-V8 bar.

### G125-V08 — major · F-MISSING · owner V08

**Claim.** Item 125's V08 part (J139: 'every digest row with its fallback column; `HostContext.week` and `.realm` retired as inputs; the week from the dossier's ticks; the final local check's brief') is absent. V08 §2.4's field table still lists `HostContext.week` and `HostContext.realm` as inputs (l.645-646), W22 and W64 read them, §3.16 (4) sets the week from `HostContext.week` after each load, and no row carries a fallback column.

**Required change.** V08 §2.4's field table gains a fallback column, one per read row (the generator's own choice as on a standalone map, reported). The `HostContext.week` and `HostContext.realm` rows leave the inputs: the week is the dossier's latest stamped tick, else the user's season control; latitude, placement and neighbours' bearings come from the generator's defaults or the user's settings. W22, W64, §3.11 (the realm block) and §3.16 (4) follow. The final check's brief (item 125 (d)) is written, with T-V8 bars for item 125 (e).

### G120-V09 — major · F-MISSING · owner V09

**Claim.** Item 120's V09 part (the Find panel, type-ahead, chip grid, results list, the `live.find` overlay provider, Coverage folded into Show gaps (V09 §5.4's table and cue column amended), across bands and layers, the phone bottom sheet, its tests; canon dated ruling) is absent. V09 has no Find: no panel, `live.find` provider, chip grid or Show gaps. Coverage still stands as its own Show view (l.3430-3431, l.3483) with its `live.coverage` provider (l.298), against item 120 (i)'s one mechanism. V08 §3.16 (6), V10 §3.9b (7), V11 §2.3 and V03/V04/V05's new parts all name V09's Find panel as their consumer.

**Required change.** V09 writes its part of item 120 at build depth as new design — the Find panel, type-ahead, chip grid, results list, the `live.find` overlay provider, Coverage folded into Show gaps (V09 §5.4's table and cue column amended), across bands and layers, the phone bottom sheet, its tests — with its catalogue rows, lifecycle rows (V09 §2.12), edge rows (V09 §3.16) and T-V9 bars.

### G121-V09 — major · F-MISSING · owner V09

**Claim.** Item 121's V09 part (Settings › Display › Resolution, `AppPrefs.resolution`, the view-status chip and its why, the message of item 121 (f), its tests; canon dated ruling) is absent. V09 has no Resolution setting, `AppPrefs.resolution`, view-status chip or the message of item 121 (f).

**Required change.** V09 writes its part of item 121 at build depth as new design — Settings › Display › Resolution, `AppPrefs.resolution`, the view-status chip and its why, the message of item 121 (f), its tests — with its catalogue rows, lifecycle rows (V09 §2.12), edge rows (V09 §3.16) and T-V9 bars.

### G122-V09 — major · F-MISSING · owner V09

**Claim.** Item 122's V09 part (Show crises, the preview, the why lines, Find's listing; canon dated ruling) is absent. V09 has no Show crises switch, no manual crisis preview, no crisis why lines and no crisis entries in a Find listing.

**Required change.** V09 writes its part of item 122 at build depth as new design — Show crises, the preview, the why lines, Find's listing — with its catalogue rows, lifecycle rows (V09 §2.12), edge rows (V09 §3.16) and T-V9 bars.

### G122h-V09 — major · F-MISSING · owner V09

**Claim.** Item 122 (h)–(i)'s V09 part (Fit, the opening view, the limit, the panel's numbers; canon dated ruling) is absent. V09's Fit, opening view and zoom-out limit (V09 §4.21.6) do not widen to the town and camps while a crisis look stands, and no panel gives the forces' numbers.

**Required change.** V09 writes its part of item 122 (h)–(i) at build depth as new design — Fit, the opening view, the limit, the panel's numbers — with its catalogue rows, lifecycle rows (V09 §2.12), edge rows (V09 §3.16) and T-V9 bars.

### G123-V09 — major · F-MISSING · owner V09

**Claim.** Item 123's V09 part (the panel lines; canon dated ruling) is absent. V09's panels carry no damage lines for a ruined building's plan.

**Required change.** V09 writes its part of item 123 at build depth as new design — the panel lines — with its catalogue rows, lifecycle rows (V09 §2.12), edge rows (V09 §3.16) and T-V9 bars.

### G124-V09 — major · F-MISSING · owner V09

**Claim.** Item 124's V09 part (the advanced panel's switch, Start a shower now, the defaults (on with headroom; off on the low tier, phones and reduced motion); canon dated ruling) is absent. V09's advanced panel has no Weather effects switch, no Start a shower now and no defaults by tier, phone or reduced motion.

**Required change.** V09 writes its part of item 124 at build depth as new design — the advanced panel's switch, Start a shower now, the defaults (on with headroom; off on the low tier, phones and reduced motion) — with its catalogue rows, lifecycle rows (V09 §2.12), edge rows (V09 §3.16) and T-V9 bars.

### G125-V09 — major · F-MISSING · owner V09

**Claim.** Item 125's V09 part (the season control as the week's fallback; canon dated ruling) is absent. V09 §4.21.7's season control is the follow switch's alternative, not the week's fallback when the dossier carries no stamped tick; V09 still reads 'the campaign calendar's week' (l.388).

**Required change.** V09 writes its part of item 125 at build depth as new design — the season control as the week's fallback — with its catalogue rows, lifecycle rows (V09 §2.12), edge rows (V09 §3.16) and T-V9 bars.

### G122-V10 — major · F-MISSING · owner V10

**Claim.** Item 122's V10 part ('the explanations'; J135) is absent. V10 has no crisis section, row or prompt rule, so 'Why?' and the clerk cannot name a crisis and its weeks (item 122 (f)).

**Required change.** V10 adds the crisis explanations: a section provider row or a §3.9b entry naming the crisis look, its condition, archetype and weeks ('Refugee camp: the Northmarch migration, weeks 12–20'), with the look read through `ClerkMount.view`, a withheld condition never named (§11.2's admission), catalogue keys, a T-V10 bar and the C4 step.

### G123-V10 — major · F-MISSING · owner V10

**Claim.** Item 123's V10 part ('the explanations'; J136) is absent. V10 §3.9a's `plan` section has no damage rows, so the clerk cannot say 'roof fallen in over the hall; the upper floor is gone' (item 123 (e)).

**Required change.** V10 §3.9a adds the damage rows of a decayed or ruined building's plan (V03's damage layer, read through V03 §4.6's provider): the elements fallen by the decay level, with their keys and `en` words, and a T-V10 bar.

### G122-V11 — major · F-MISSING · owner V11

**Claim.** Item 122's V11 part (the look, symbol, scale and placement tables; canon dated ruling) is absent. V11 has no crisis look table, symbol rows, scale by severity and tier or placement priorities.

**Required change.** V11 writes its part of item 122 — the look, symbol, scale and placement tables — as registry rows with their row types, values and provenance, lifecycle rows (V11 §2.10), T-V11 bars and its C9 slot.

### G122h-V11 — major · F-MISSING · owner V11

**Claim.** Item 122 (h)–(i)'s V11 part (the rates (45 m² a head; one engine per 1 500 besiegers; the coalition's spread); canon dated ruling) is absent. V11 holds none of item 122 (h)'s rates.

**Required change.** V11 writes its part of item 122 (h)–(i) — the rates (45 m² a head; one engine per 1 500 besiegers; the coalition's spread) — as registry rows with their row types, values and provenance, lifecycle rows (V11 §2.10), T-V11 bars and its C9 slot.

### G123-V11 — major · F-MISSING · owner V11

**Claim.** Item 123's V11 part (the thresholds' tables by material and element kind; canon dated ruling) is absent. V11 has no damage threshold or decay-rate rows by material and element kind (timber rotting faster than stone, item 123 (b)).

**Required change.** V11 writes its part of item 123 — the thresholds' tables by material and element kind — as registry rows with their row types, values and provenance, lifecycle rows (V11 §2.10), T-V11 bars and its C9 slot.

### G124-V11 — major · F-MISSING · owner V11

**Claim.** Item 124's V11 part (the climate row's weather columns per week band and the two hard rules; canon dated ruling) is absent. V11's climate rows carry no weather columns, and the two hard rules (no snow where winter does not freeze; rain rare in arid country) are not stated.

**Required change.** V11 writes its part of item 124 — the climate row's weather columns per week band and the two hard rules — as registry rows with their row types, values and provenance, lifecycle rows (V11 §2.10), T-V11 bars and its C9 slot.

## Owner items 120–125 per member

| item | determinism | V08 | V09 | V10 | V11 |
|---|---|---|---|---|---|
| 120 (Find; J133) | not named | PRESENT: V08 §3.16 (6) (a)–(g), W95, §2.7's chip row, T-V8-58, J-V8.127, checked against (a)–(k); its consumers (V09's panel, §2.9's `find` key, §11.2's listing) are G120-V09, G120-model and G120-rendering | ABSENT (G120-V09) | PRESENT: V10 §3.9b (7), the `find` action, `FindAnswer`, T-V10-51 — but VAH-r1-01 | PRESENT: V11 §2.3 *Find's lexicon*, §3.4's groups, `smith`, W87, T-V11-4 |
| 121 (resolution; J134) | not named | not named | ABSENT (G121-V09) | not named | not named |
| 122 (crisis looks; J135) | ABSENT (G122-determinism) | ABSENT (G122-V08) | ABSENT (G122-V09) | ABSENT (G122-V10) | ABSENT (G122-V11) |
| 122 (h)–(i) (J138) | not named | ABSENT (G122h-V08) | ABSENT (G122h-V09) | not named | ABSENT (G122h-V11) |
| 123 (damaged plans; J136) | ABSENT (G123-determinism) | not named | ABSENT (G123-V09) | ABSENT (G123-V10) | ABSENT (G123-V11) |
| 124 (light weather; J137) | ABSENT (G124-determinism) | not named | ABSENT (G124-V09) | not named | ABSENT (G124-V11) |
| 125 (the dossier the only input; J139) | ABSENT (G125-determinism) | ABSENT (G125-V08) | ABSENT (G125-V09) | not named | not named |

Owner items 114–119 were checked where two members meet. They agree: DR41 ↔ V08 §3.16 (2) ↔ V11's `walls.condition`; DR42 and DR43 ↔ V08 §3.16 (4)–(5) ↔ V09 §4.21.7–§4.21.8 ↔ V10's `LookAnswer`; item 115's `grandClasses` ↔ V08 §3.16 (3); item 116's `view.zoomOutMarginStops` ↔ V09 §4.21.6. The stale names of DR42 and DR43 are VAH-r1-17 to -20. V11's crown-seat wording is VV78-04 (concurred). V09's item-119 (a2) part is the volume seat's (G119a2-V09).

## Concurred, not re-raised (landed peers' ids)

* **VDC1-01** (determinism) and **VDC1-14** (V09). E-07's and V09's `refuse.table.ownerRule` against V11 §4.1's stamped-cell rule; `refuse.table.required` missing. This is the other end of VAH-11 and VAH-12.
* **VDC1-04** (determinism). `refuse.water` keys both the lock row and the reservation conflict; V09's `refuse.water` row words only the lock case.
* **VDC1-02** (determinism), the lead's refusal list. My VAH-r1-06 is the separate head clause.
* **VV1112-r1-04, -05, -06** (V11, V01, rendering), VAH-32's residues. **VV78-04** (V11), the crown seat in "specified".
* **VM-R1T-07** (V08), `HistoryHint`'s item-113 fields typed twice. **VK0/VKr1** and **VPC-R1** items touching §5 and §7.4 are the kernel's and pipeline's.

## Checked and agreeing (new this round)

* **The dossier seam.** F-V8-8 is consistent across §7.7 item 13, `ReceiptRow`, `DossierChange` and V08 §1 and §3.6 (1). DR41–DR43 are cited by number in V08 everywhere, and the item-114/117/118 aliases resolve. DR14's `religion.deityName` is read by V08 (l.618). `PortValues` (V08 §2.5) is cited, not restated. The key law's port-key row cites V08 §2.3. V08's `ignored` rows equal §7.7 item 1's reasons, and `previousGovernments[].tick` alone is read as F11's dating rung (J-A73.06).
* **The binding and the outcome table.** All 42 `refuse.*`/`bend.*` keys of E-07 have V09 rows. The lock rows carry the closest alternatives on canvas (V09) and in the clerk (V10 §3.16). §7.1's `Enceinte.pathway`, `spring.flow`, `wearWall`/`repairWall` with material and the `delete` keys agree with V09 §4.3 and V10 §4.1. V10's escape hatch matches the binding: `rerollLayer('village.track')` at T10, and the leader-line switch at T12.
* **The host seam.** V08 §8.1's M3c, AP5b, C4a, C4b and C9 agree with V09 §8.1, V10 §8 and V11 §8. `HostSlots`, `ClerkMount.host` and the host proposal card's 'Ask again' wording agree across V08, V09 and V10.
* **Find.** V08's dossier entries (never lexicon words) agree with V11 W87 ('the dossier's institution names are V08's list entries'). §11.2's `gazetteer { text, kinds }` and `entity { dossierKey }` exist for V08 §3.16 (6) and V10 rule 20.
* **The tables.** V11's `grandClasses` equals V08 §3.16 (3)'s list; V11's C4 split equals V08 §8.1; `LadderStep` is typed in V08.

## Coverage

All five members and their ten pairs. Every round-0 finding was re-checked. All 646 substantive pre-to-live hunks of the five members were read inside their subsections. Every hand-off in the five repair preambles was checked at its destination. Owner items 120–125 were checked for every member the dated rulings name. Pairs outside this seat's members (V01, V02, V03, V05, V07, V12, rendering) appear only where a shared type's home moved (VAH-31, VAH-r1-08 to -16, -20).
