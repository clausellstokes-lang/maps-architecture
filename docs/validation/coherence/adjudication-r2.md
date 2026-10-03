# Adjudication round 2 — binding rulings for repair round 2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r2; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r2`, 2026-10-01)
- P0 brief read whole; inputs located (round2-work 18 files, 306 issues; repair-r1 ×18; verify r0s ×20 and r1t ×20; canon's dated rulings for items 114–126): done
- P1 the four ruling requests decided (R2-01 – R2-04): done
- P2 every issue read whole; recurring, ping-pong and duplicate groups found: done
- P3 owner-rule rulings (items 116, 119 (a2), 120–126): done
- P4 per-unit disposition tables (306 of 306 issues): done
- P5 canon dated ruling appended ("Dated ruling 2026-10-01 (adjudication round 2)"); result saved; LANDED: done

## How to read this file

**Who reads what.** Each of the eighteen repair seats reads (1) the table of contents row for its unit, (2) every ruling
listed there, whole, and (3) its unit's disposition table in Part H. A ruling binds every unit it names: the receiving
end of a fix is written in the same round as its sending end, whoever owns the issue (R2-05).

**Dispositions** (Part H, one row per issue of `docs/validation/coherence/work/round2-work/<unit>.json`):

| word | meaning |
|---|---|
| **FIX** | apply the issue's `required_change` as written (the `also_reported` versions are context; where they differ, the issue's own `required_change` governs unless a ruling says otherwise) |
| **FIX per R2-nn** | apply the issue, but where R2-nn's text differs from the `required_change`, R2-nn governs |
| **ONE FIX with X** | the same defect raised under two or more ids: apply it once, close every id named |
| **INVALID** | closed for good, with its reason here; never raised again (brief's FINDING STANDARD) |
| **MOOT in part** | owner item 126 (a2) supersedes the named clause: it is not written; the rest is FIX |
| **NEW DESIGN** | an owner item's part (g items 119 (a2), 120–126): written at build depth as the canon's dated routing and the item's text say, under the cross-unit rulings named (R2-30 – R2-41), which fix the names, homes and shapes every unit shares |

**Precedence used** (principle (3)): the owner's words > an f item or a J-VI decision > the base's canonical home > a
volume's restatement. Where a ruling decides under J122 (vetoable), it says so.

## Summary

* **Ruling requests (4):** VDC0-33 INVALID (R2-01); VAT-20's rung clause INVALID (R2-02); VV78-21 INVALID, V07-RESTATE-1
  superseded by file f item 202 (R2-03); J-V2.109 confirmed as E-27's shed ruling, VV12-08 closed (R2-04).
* **42 binding rulings** (R2-01 – R2-42). The recurring classes they end: hand-offs a receiver never applied (R2-05);
  scope's copies of volume test ranges and prices lagging each round (R2-06); stale owner-item ranges (R2-07); take-over
  bars and pin registrations named at one end only (R2-08, R2-09); types the base now declares still declared in volumes
  (R2-13); one fact glossed four ways — item 115's "specified" (R2-14). Owner-rule rulings: item 116 at the METROPOLIS cap
  (R2-30), item 119 (a2) for the dossier catch-up (R2-31), item 124's "definetly no snow" over a viewer's `snow`
  (R2-39), item 126 (a2)'s phone clauses moot (R2-41). Gaps no routing filled, now ruled: Find's milestone (M5, R2-32),
  the `find` and `crises` keys' shapes (R2-33, R2-37), the base bar ids of items 120–126 (R2-35), the milestones of items
  121–126 (R2-36), one crisis-look and one damage design across fifteen and twelve units (R2-37, R2-38), and
  `HostContext.customLibrary` under item 125 (e) (R2-40).
* **Dispositions of the 306 issues:** 198 FIX (141 of them under a ruling), 58 NEW DESIGN (owner items 119 (a2) and
  120–126; five of them MOOT in part under item 126), 45 closed as ONE FIX with a sibling id, 4 INVALID (VDC0-33,
  VAT-20's rung clause, VV78-21, VV56-r1-05), 1 CLOSED (VV12-08).

## Table of contents by unit

Each row: the rulings a seat applies (whole), then its disposition table in Part H. Every seat reads R2-05.

| unit | issues | rulings binding it | its table |
|---|---|---|---|
| scope (base §0–§1, §13–§17, index, INDEX.md) | 33 | R2-05, R2-06, R2-07, R2-08, R2-14, R2-17, R2-18, R2-19, R2-20, R2-26, R2-27, R2-30, R2-32, R2-35, R2-36, R2-37, R2-38, R2-40, R2-41 | Part H · scope |
| model (base §2) | 25 | R2-05, R2-13, R2-18, R2-22, R2-23, R2-24, R2-25, R2-26, R2-27, R2-28, R2-33, R2-37, R2-38, R2-39, R2-40, R2-41 | Part H · model |
| kernel (base §3) | 2 | R2-05, R2-26 | Part H · kernel |
| pipeline (base §4, §10, PART II, PART III) | 36 | R2-05, R2-12, R2-13, R2-14, R2-18, R2-22, R2-25, R2-26, R2-27, R2-28, R2-31, R2-36, R2-37, R2-40 | Part H · pipeline |
| determinism (base §5–§7) | 24 | R2-01, R2-05, R2-11, R2-18, R2-20, R2-21, R2-24, R2-35, R2-36, R2-37, R2-38, R2-39, R2-40, R2-41 | Part H · determinism |
| rendering (base §8, §9, §11, §12) | 28 | R2-05, R2-10, R2-21, R2-29, R2-30, R2-31, R2-32, R2-33, R2-35, R2-36, R2-37, R2-38, R2-39, R2-40, R2-41, R2-42 | Part H · rendering |
| V01 | 13 | R2-05, R2-06, R2-08, R2-10, R2-13, R2-26, R2-32, R2-34, R2-35, R2-36, R2-37 | Part H · V01 |
| V02 | 9 | R2-04, R2-05, R2-06, R2-07, R2-10, R2-13, R2-16, R2-35, R2-36, R2-37, R2-38 | Part H · V02 |
| V03 | 4 | R2-05, R2-06, R2-10, R2-32, R2-35, R2-36, R2-37, R2-38 | Part H · V03 |
| V04 | 9 | R2-05, R2-06, R2-12, R2-25, R2-28, R2-29, R2-32, R2-34, R2-35, R2-36, R2-38, R2-41 | Part H · V04 |
| V05 | 4 | R2-05, R2-06, R2-08, R2-09, R2-10, R2-32, R2-34, R2-35, R2-39 | Part H · V05 |
| V06 | 15 | R2-05, R2-06, R2-09, R2-12, R2-13, R2-18, R2-19, R2-20, R2-26, R2-27, R2-31, R2-35, R2-36, R2-37, R2-38, R2-40 | Part H · V06 |
| V07 | 13 | R2-03, R2-05, R2-06, R2-08, R2-09, R2-10, R2-11, R2-12, R2-14, R2-19, R2-26, R2-28, R2-29, R2-32, R2-34, R2-35, R2-36, R2-37 | Part H · V07 |
| V08 | 8 | R2-05, R2-06, R2-08, R2-09, R2-10, R2-13, R2-18, R2-31, R2-32, R2-33, R2-35, R2-36, R2-37, R2-40, R2-41 | Part H · V08 |
| V09 | 31 | R2-05, R2-06, R2-08, R2-10, R2-11, R2-21, R2-22, R2-23, R2-30, R2-31, R2-32, R2-33, R2-34, R2-35, R2-36, R2-37, R2-38, R2-39, R2-40, R2-41, R2-42 | Part H · V09 |
| V10 | 13 | R2-02, R2-05, R2-06, R2-07, R2-08, R2-11, R2-21, R2-23, R2-32, R2-33, R2-35, R2-37, R2-38 | Part H · V10 |
| V11 | 23 | R2-05, R2-06, R2-07, R2-08, R2-10, R2-11, R2-12, R2-13, R2-14, R2-15, R2-16, R2-26, R2-27, R2-28, R2-35, R2-37, R2-38, R2-39 | Part H · V11 |
| V12 | 16 | R2-05, R2-06, R2-07, R2-08, R2-09, R2-10, R2-15, R2-17, R2-26, R2-28, R2-30, R2-32, R2-35, R2-36, R2-37, R2-38, R2-40, R2-41 | Part H · V12 |

Parts: A the ruling requests (R2-01 – R2-04) · B the whole round (R2-05 – R2-09) · C shared names (R2-10 – R2-17) ·
D dossier, locks, epochs (R2-18 – R2-24) · E the world's edges (R2-25 – R2-29) · F owner items (R2-30 – R2-41) ·
G run controls (R2-42) · H per-unit dispositions · I canon changes.


## Part A — the ruling requests

### R2-01 VDC0-33 (determinism) — INVALID, closed for good

**Request.** determinism (repair-r1-determinism.md, `=== RULING REQUEST VDC0-33 ===`): add
`powerStructure.previousGovernments` to §7.7 item 1's never-read list.

**Ruling: INVALID.** The defect VDC0-33 found — J-A73.06 saying §7.7 item 1 lists the field while V08 read it — no longer
exists, and the required change would re-open a closed duplicate home:
1. §7.7 item 1 is path-free since VAH-02 (round 0): it keeps the reason categories and cites V08 §2.4's field table as
   the one list of paths. Adding a path there restores the duplicate VAH-02 closed.
2. V08 §2.4 now carries the field exactly once on each side: l.629 `powerStructure.previousGovernments[].tick` →
   `receipts` (§4.11's first dating rung), l.657 every other field of each entry → `ignored` ("no mechanism of the set
   reads a past government (J-A73.06)").
3. J-A73.06 (base index l.21342; rationale Part A l.791) now reads the same: `government.previous` dropped, the `tick`
   still read as a dating rung.

**Text change:** none. §7.7 item 1 stays path-free; V08 §2.4 is the one list; J-A73.06 stands as restated.

### R2-02 VAT-20 (V10), its rung clause — INVALID, closed for good

**Request.** V10 (repair-r1-V10.md, `=== RULING REQUEST VAT-20 ===`): VAT-20 asked V10 §3.16's `rule` row to drop "the
rung" and `refuse.islandsRung`, on the premise that `refuse.islandsRung` is no dry-run outcome and §7.1 has no rung row.

**Ruling: INVALID** (the rung clause only; the rest of VAT-20 was fixed in round 1 and stays fixed). The premise is
false of the live base: §7.1's outcome table holds the row "an `adjust` of the islands setting (`recipe.layers.islands`,
`islands.count`) below CITY, from any client … | refused, the rung | the rung change to CITY (T1 `intend`'s size chips)
| `refuse.islandsRung`" (base l.10150; VAH-11), and E-07's lead names the rung among the availability gates that refuse.
The clerk meets that row through T1 `intend`'s `adjust`, so dropping it would leave a refusal the dry run returns unnamed
in V10's categories. V09 §4.9 carries the key (l.1934).

**Text change:** none. V10 §3.16's `rule` row keeps "the rung of §7.1's islands row" and `refuse.islandsRung`.

### R2-03 VV78-21 (V07) — INVALID, closed for good; canon V07-RESTATE-1 amended

**Request.** V07 (repair-r1-V07.md, `=== RULING REQUEST VV78-21 ===`): rule V07-RESTATE-1 INVALID under file f item 202's
applied text, or move `interface ProductDecl` to §4.12.

**Ruling: INVALID.** File f item 202 — an applied f item, which outranks the base's canonical-home rules (principle (3);
canon S1) — names the type's home in its own words: "`ProductDecl` in `StrategyRegistry.products: Map<'base'|'village',
ProductDecl>` (V07 §2.1's type; BCR-V7-11)"; item 317 reads `ProductDecl.phases` at "V07 §2.1's hand-off band". The base
cites the type there (§4.12 l.8538, §7.7 l.11399, §14 l.18117) and the registration at §4.12. Round 0's VAT0-18 then made V07 §2.1
declare `interface ProductDecl extends ProductDeclEpoch` with the four epoch members' one home at V06 §2.1; moving the
interface now would undo that fix — a ping-pong. The defect V07-RESTATE-1 was raised against (two statements of one
interface) is gone: one declaration (V07 §2.1), its epoch members one home (V06 §2.1), the village entry's values one home
(V07 §3.12), the registry and router the base's (§4.12, §14).

**Text change:** none. **Canon change** (dated ruling appended to canon.md): V07-RESTATE-1's line reads "ProductDecl's
interface lives at V07 §2.1 (file f item 202, an applied f item over the base-home rule S3/MC-11); the base's §4.12 owns
`StrategyRegistry.products` and `LadderRouter`'s reading of it and cites V07 §2.1; V06 §2.1 owns `ProductDeclEpoch`".

### R2-04 VV12-08 (V02) — J-V2.109 CONFIRMED as the ruling E-27 left open

**Request.** V02 (repair-r1-V02.md, HAND-OFFS): confirm J-V2.109 as the shed ruling the canon's E-27 left open.

**Ruling: CONFIRMED; VV12-08 closed.** E-27 unified the valley's plan reach (`facadeBays`' integer e and `roofscape`'s
float e) and ruled no `shed` case. J-V2.109 records the choice: a `shed` `Y`'s whole run in both modes, over the
archived integer form's half span, with E-27's two equivalences kept and T-V2-54 its bar. It is the realism reading (a
shed's valley meets its whole run, not half of it), it is one rule in both modes (principle (9)), and the changed
`facadeBays` run for a building whose valley ends on a shed is the ruled behaviour, not a lost fact (principle (3) (c):
an elegance ruling's equivalence list, now complete). **Canon change:** E-27 gains "a `shed` `Y`'s whole run in both
modes (J-V2.109; adjudication-r2 R2-04)". **Text change:** none beyond what V02 already carries.

## Part B — rulings for the whole round (the classes that recur)

### R2-05 Both ends of a fix land in the same round

**Governs:** every cross-unit ruling below; the class behind a large share of round 2's issues (a hand-off one round-1 repair
wrote that its receiver, landed first, never applied: e.g. VAF-R0S-15, VPC-R1-11, VM-R1T-03, VPC-R1-05, VAL-R1-03,
VAH-r1-03, VAT-06, VDC1-16, VEL0-11, VV12-r1-07, VAF-R0S-23, VPC-R1-24).

**Decision.** (1) Each repair seat applies, at its own unit, the receiving end of every R2 ruling that names its unit —
including where the issue id is owned by another unit (the TOC lists them). (2) A cross-unit change a ruling names is
written by both seats this round; neither writes it as a HAND-OFF note. (3) A seat that meets a further cross-unit end
that no ruling names writes its own end and records the other in its report's HAND-OFFS for round 3's verifiers — never
as open wording in the design text. (4) No seat re-raises an issue a ruling here closes or rules INVALID.

### R2-06 Scope's copies of volume figures: test ranges cited, prices written last

**Governs:** VCS-08, VCS-10 (its range clauses), VCS-18, VV78-12, VAL-R1-13, VV1112-r1-01 (its figures), VAL-R1-04,
VRC1T-09, and every like line round 2's volume parts would otherwise leave stale. This is a canon expectation that could
not be met as written: §13.2, §16 and INDEX restate each volume's test maximum and price, scope repairs in parallel with
the volumes, and each round the volumes move (VCS-08/10/18 recur from round 0).

**Decision (canon change).** (a) **Ranges.** A statement in §13.2, §13.8, §16 or INDEX that names *every* test of a
volume by a range "T-Vn-1 – T-Vn-m" reads "every T-Vn test (Vnn §7)"; a statement naming every row of a base test family
by section reads so ("the T-ER rows of §8.11, §9.7 and §11.6"). A range naming a *subset* stays explicit. The set named
is unchanged (the volume's §7 is the one census, principle (1)); only the restated upper id goes. VCS-10's range clauses,
VAL-R1-04 and VRC1T-09's index line are satisfied in this form; their other clauses (the groups' runs lists, the
take-over base-bar column, §13.8's tier rows) are FIX. (b) **Prices.** §16's per-volume rows and effort lines, the staged
and whole-program totals, the calendar sentence, D-20, J-A568.01's row and INDEX §1's price column stay figures (§16
computes the totals once, file f item 568). Scope's round-2 seat writes them **last**: after every volume seat of round 2
has logged LANDED in `docs/lane-events.log`, reading each volume's §8 total from its round-2 repair file where that file
replaces its §8, else from the live volume; it polls the log up to 120 minutes for a volume not yet landed, then writes
from the live volume and lists in its report each volume and where its figure was read. (c) Every volume seat whose §8
total changes states it in its report's first lines: "§8 total: a–b pw (was c–d)". (d) The figures written in VCS-08,
VV78-12, VAL-R1-13, VCS-18 and VV1112-r1-01 are round 1's: (b) supersedes them; their structural clauses stand
(VV1112-r1-01's split of the content line into C2's g share and C4a in the first total, C4b and C8 on the staged line;
VAL-R1-13's village row naming the items it carries, in R2-07's form).

### R2-07 Lists of owner items: no stale upper number

**Governs:** VV12-r1-06 (V02), VCS-r1-01 (scope), G120-scope's "items 8–125", the title-block ranges V10, V11 and V12
handed to Assemble (repair-r1-V10, -V11, -V12 notes), INDEX's intro.

**Decision (canon change).** A list that means *every* owner item of file g states no upper number: "file g's items"
(V02 l.7 reads "file g"; INDEX's intro "file g's items, the owner's rules"; §13.2's convention "the bars
`T⟨item⟩-⟨n⟩` of the owner items"). A list naming a *subset* (Appendix A's SettlementForge facts, §0.2's landing table
rows, a unit's own list of the items it applies, §16's "items … at the village rungs") stays explicit and is brought to
item 126 this round. Text inside a title's level-1 subsection (V10's title block, V11's preamble, V12 l.8's reading
guide) is Assemble's to set in place, in this same form; it is not a marker line (principle (8) untouched).

### R2-08 A base bar a volume takes over: both ends name it

**Governs:** VAP-r1-01 (V07), VAP-r1-02 (V08), VAP-r1-03 (V09), VAP-r1-04 (V10), VAP-r1-05 (V11), VAP-r1-06 (V05),
VAP-r1-07 (V01), VAP-r1-08 (V12), VAP-r1-09 (scope), VCS-10's base-bar-column clauses (scope).

**Decision.** The volume test is the home of *which* base-bar clauses it runs: its head names each bar it takes ("takes
T117-1 – T117-8's island clauses"), and a lettered clause re-running one names it. Scope's take-over table carries the
same ids in its base-bar column and says nothing of its own about their content. Both ends are written this round (each
VAP-r1 issue at its volume; VAP-r1-09 and VCS-10 at scope). The bars of items 120–126 use R2-35's ids.

### R2-09 A restating pin states its registration; V12 lists it by test id

**Governs:** VAP-r1-10 (V06), VAP-r1-11 (V12), VV56-r1-07 (V12), VV1112-r1-03 (V12), VAP-r1-01's T115-4 clause (V07),
VAP-r1-02's T-V8-53 clause (V08).

**Decision.** A volume test that re-runs a no-op or rung pin states, in one clause, "— the `<pin>` registration of
<suite> on V12 §3.7.8's engine (V12 §2.13), written by <seat>". V12 §2.13's pin rows and §3.7.8's list of registering
volume pins are exactly the union of those clauses, each named by its test id: this round T-V5-34 – T-V5-36 (sky goldens
on `item117.season`, `item118.festival`, `item120.find`), T-V6-74 (`item115.ceiling`, H-100 at TOWN and above, E2 seat),
T-V7-63 (`item115.off`) and T-V7-68 (`item120.find`), T-V8-53 (`item115.ceiling`, SF4 seat), and item 110's six switches
(VV1112-r1-03). The new owner items' pins are named now so volumes and V12 agree: `item121.display` (exports and the
document byte-identical across every Resolution setting), `item122.crises` (no condition and no preview), `item123.damage`
(a never-decayed building), `item124.effects` (effects on and off), `item125.host` (with and without a host context),
`item126.resize` (across the medium threshold).

## Part C — shared names and one home each

### R2-10 The reader's and the oracle's types are §11.2's

**Governs:** VAH-r1-08 (V09), VAH-r1-09 (V08), VAH-r1-10 (V11), VAH-r1-11 (V12), VAH-r1-12 (V01), VAH-r1-13 (V02),
VAH-r1-14 (V03), VAH-r1-15 (V05), VAH-r1-16 (V07), VAH-31 (rendering), VV910-02 (rendering), VV1112-r1-06 (rendering),
VV1112-r1-05 (V01), VV1112-r1-04 (V11).

**Decision.** Since round 1, `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`,
`ProfileAnswer`, `WhyAnswer`, `WhySection`, `WhyCause`, `WhyFamily`, `WhyPull`, `WhyLink` and `FieldDrivers` are §11.2's
(rendering states them); V10 §2.13 keeps `WhyProvider`, `WhySectionProvider`, the solver's explanation, `raisedOutcome`,
`LookAnswer` and `FindAnswer`. Every citation of a moved type reads "§11.2's `X`"; a hook row naming both splits into a
§11.2 row and a V10 §2.13 row; decision rows (J-…, BCR-…) keep their wording as records. §11.2 carries this round the
three fields V10 handed it: (a) `barrier: BarrierKind /* §2.7 */` in `WhyAnswer.closure[]`, `MapBrief.walls[].open[]` and
the preview's `arcs[]`; (b) `RuleAnswer.register` exactly as VV910-02's required change words it (VAH-31 (b) is the same
fix); (c) `WhyAnswer.members.step: LadderStep /* V11 §2.6 */` (VAH-31 (c) = VV1112-r1-06). `LadderStep` (V11 §2.6) is the
one type of item 108's five steps; V11 §2.6's comment lists exactly its users: "V08 §2.3's `CarriedFact`, V08 §2.5's
`DossierInstitution.step`, V01 §2.3's district view and §11.2's `WhyAnswer.members.step`".

### R2-11 Derivation rows are cited by number

**Governs:** VAH-r1-17 (V09), VAH-r1-18 (V10), VAH-r1-19 (V11), VAH-r1-20 (V07).

**Decision.** §7.7's rows are cited by number (J-VI.13): the item-117 week-and-season row is **DR42**, the item-118
traditions row **DR43**, and item 122's crisis-look row, new this round, **DR44** (R2-37). "§7.7's calendar row" and
"§7.7's traditions row" are retired wordings ("the calendar row" names only §4.11 *The clock* (3)'s season table). V10
l.358 reads "the inputs of DR1–DR44 (§7.7 item 10)".

### R2-12 `UnderOpeningRow` and the access pass's slot

**Governs:** VAL-08, VPC-R1-04, VAL-R1-02 (pipeline); VPC-R1-05, VV34-r1-05 (V06); VAL-R1-03, VPC-R1-06, VV78-r1-03 (V07);
VPC-R1-07 (V11).

**Decision.** V04's opening row is `UnderOpeningRow` (V04 §2.3); `OpeningRow` names only §2.6's opening-hours row.
Every reference to V04's row reads `UnderOpeningRow`: II.7.6's signature and comment, V06 l.314, l.2443 and l.2490, V07
W46 and V07 §3.16 (3) (iii), V11 l.177, 616, 940, 3611 and 3705. II.7.6 declares `AccessPassStrategy` as V04 builds it —
VAL-R1-02's required change whole (`openings: UnderOpeningRow[]`, the `scope?: EpochScope` parameter, the
`reached: ExcavationRecord[]` output) — and V04 §1b.2, V04 §3.5.7 *With a scope*, V04 §3.10 and V06 l.1015 and l.2459
name it `AccessPassStrategy.run` with the base's parameter list (the V04 and V06 seats apply that end).

### R2-13 A type the base declares is cited by the volumes, never declared twice

**Governs:** VAF-R0S-03 = VM-R1T-05 (V02); VM-R1T-03, VAF-R0S-04, VAF-R0S-15 = VPC-R1-11, VAF-R1T-05 (V01); VAF-R1T-06
(V11); VM-R1T-06, VPC-R1-20 (V06); VM-R1T-07 (V08); VM-R1T-01 = VPC-R1-10 = VV12-r1-01, VM-R1T-02, VM-R1T-13, VPC-R1-12
(model); VPC-01 (pipeline) with VPC-R1-01 (V11).

**Decision.** One declaration each, the others cite (principle (1); canon S3 and MC-11):

| type | its one home | the copy that becomes a citation this round |
|---|---|---|
| `DormerRow`, `DormerKind` (and `PorchKind` in the lead) | §2.6 | V02 §2.2 |
| `TierLay`, `LaidWing` | §2.7 | V02 §2.6 |
| `HoodRecipe` | §2.9 (its size and leafy cells cited by name, VM-R1T-02) | V01 §2.6 |
| `RaisedKind` | §2.7 | V01 §2.3 (two fields) |
| `SquareQuotaRow` | §10.2 | V01 §2.2; V11 registry row 91's row-type cell |
| `RosterSettings` | §10.2 | V11 registry row 24's row-type cell |
| `NeighbourhoodRequest`, `NeighbourhoodResult`, `SeamReport` | II.1 | V01 §2.4's restated rules |
| `Use.strain` | §2.7 | V06 §2.9 |
| `EpochInputs.wealthLevel`, `.advance`, `.replay` | §4.11 | V06 §2.3, §2.14 |
| `HistoryHint` | §2.7 | V08 §3.15 (2) (its source mapping kept) |
| `OutlineTemplateId` (the closed union; `d_shape`) | §4.2 S1 (2) | model §2.9's own line deleted |
| `GrandeurCeilingRow`, `GrandeurCeilingSettings` | §10.2 (pipeline declares them, VPC-01) | V11 §2.8d (VPC-R1-01) — both ends this round |
| `DistrictKind` | §2.5 (declared new, VPC-R1-12) | — |
| `BuildingClass` | §2.7 | `Use.cls`, §2.5's allocation rows (model) and §4.7's `Designation.use` and `PlacementItem.cls` (pipeline applies its end this round) |

### R2-14 "Specified" under the grandeur ceiling has one home: V08 §3.16 (3)

**Governs:** VAF-R1T-04 (pipeline), VCS-r1-03 (scope), VV78-r1-01 (V07), VV78-04 (V11) — a fact restated four ways in
two rounds.

**Decision.** Every other unit cites "V08 §3.16 (3)". Where a gloss is kept it reads exactly: "a dossier-bound record of
a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names
the manor house, seigneurial or crown (V11 §3.21.1)". "Hall or similar record" is retired (vaguer than the home: a
`town_hall` or `guildhall` record specifies nothing). A **lord** stays a distinct reading — a seigneurial government
(V08 §3.16 (3)'s `government` row) — admitting the one manor at VILLAGE only. This governs §4.2 S2, §4.7 S10b (3),
§13.2's T115-2 (VCS-r1-03's text with its gloss replaced by the one above), V07 J-V7.136 and W78, V11 W83 and §3.25.4's
*Specified* bullet.

### R2-15 No deck stand-in anywhere

**Governs:** VAF-R0S-13 = VV12-r1-07 (V11), VV12-r1-08 (V12).

**Decision.** V02 holds no stand-in (round 1: "No deck plot without a `deck` row"). V11 deletes X-V11-7 (§10b) and
§3.24.4's sentence on V02's stopgap band; V12 §3.11's `deck` line ends at "the panel rule".

### R2-16 A discrete band cell: §4.5's one rule

**Governs:** VAF-R1T-01 (V02, blocker), VAF-R0S-20 (V11).

**Decision.** §4.5's band-set paragraph is the one home: a discrete cell at a band without a row reads the nearest
rowed band below (`squalid` → poor, `comfortable` → modest), so it switches at the lower cut of the next rowed band
above. V02 §3.10.1's "a discrete cell takes the richer anchor's value from the band's upper half" is withdrawn: it
switches mid-band, at no cut, contradicting both §4.5 and its own citation ("J-A19.43's switch at the cut"); precedence:
the base's home over a volume's restatement. V02 §3.10.1, V02 l.453 and l.815, V11 §3.6.1 and V11 §2.1's `interp`
comment cite §4.5's rule (the two issues' required changes, as written).

### R2-17 V11's content milestones are C4a and C4b

**Governs:** VAP-r1-15 (scope), VV1112-r1-01 (scope; its figures under R2-06), VV1112-r1-02 (V12).

**Decision.** C4a (the wall rows, M2b, first total) and C4b (the SettlementForge rows, M-SF, staged) are V11 §8's names;
"C4" alone is retired. §16's staged row reads "the content's staged rows (V11: C4b at M-SF, C8 at M6-U)"; INDEX §1's V11
cell is VAP-r1-15's text; V12 §2.6's due map and §12 PLAUSIBLE 11 are VV1112-r1-02's text.

## Part D — dossier, locks, epochs and the outcome table

### R2-18 A dossier event and the locks it meets: one rule, written at every reader

**Governs:** VEL1-01 (model), VEL1-02 (pipeline), VEL1-04 (V06), VDC1-12 (determinism), VAH-r1-02 (V08), VEL0-01,
VDC1-17 (its fixture clauses) and VDC1-19 (scope).

**The rule** (§7.7's precedence, determinism's home since round 1): a dossier event is never refused by a lock or a pin;
a lock or pin on what it changes (a dossier-owned value; a dossier-backed element's existence, state, name, kind or
membership) is superseded for what it changes and reported orphaned; every other lock is applied around; a population
fall reaches locked and pinned dwellings by `relet`.

**Completed at every reader this round:**
(a) A protected dwelling's last household leaves by a `relet` down to 0 and the building is never vacated — one
exception, worded "a locked or pinned dwelling a dossier population fall emptied (§7.7's precedence)", at §2.6's clamp
(VEL1-01's text), §4.11's step (c), the strike pool and `LadderOp.relet` (VEL1-02's text) and V06 §3.5.1 (5) (VEL1-04's
text).
(b) A fall the unlocked households cannot meet takes locked and pinned households too, in the roster's suffix order,
each superseded lock reported orphaned (VDC1-12's text at §7.7).
(c) V08 §4.3 and §3.3's absorb bullet state the supersession (VAH-r1-02's text).
(d) §13.2's T20 group gains three bars (ids fixed here so §7.7's fixture line can cite them): **T20-14** a dossier
rename on a locked name path, and a `ruined` and a `removed` state on an institution whose building is locked — each
lands, the lock reported orphaned, every other locked entity byte-identical; **T20-15** a dossier population fall over a
town whose remaining households all live in locked dwellings — the population met within the roster tolerance, every
locked building's state and shell byte-identical, the emptied ones counted in `uses.heldByProtection`, no `vacate`
emitted on a locked or pinned building; **T20-16** a fall over a town whose remaining households are all locked — met
within the roster tolerance, every superseded household lock reported orphaned. §13.8: T20-14 in PR on B-DOSSIER-lite
from M3a; T20-15 and T20-16 from M4 with the epochs (scope). §7.7's fixture line cites T20-14 – T20-16 (determinism).
(e) Part A's J-DET-11, R25 and J-A20.71 read as VEL0-01's required change words them (scope; VDC1-19 is the same fix).

### R2-19 No event of the port's session is an undo, redo or revert target

**Governs:** VAT1-03 (V06, blocker), VAT1-04 (V07), VDC1-17's T20-2 and T20-6 clauses (scope).

**Decision.** §7.4 *Replay semantics* (round 1) is the rule and its one home: no event of session `host:port` — a
dossier event, `dossierFacts`, `dossierRecord`, or a port epoch with or without a dossier change — is an undo, redo or
revert target; an undo of a lapsing epoch outside that session restores the hold. V06 §4.1, T-V6-27 and V06 §7's
take-over rows read VAT1-03's text; V07 l.2336–2337 and l.2480–2481 read VAT1-04's text; §13.2's T20-2 and T20-6 read
VDC1-17's text. Every restating sentence cites "§7.4 *Replay semantics*".

### R2-20 Replay epochs: their numbers, and ordering by week

**Governs:** VAT0-07 (determinism; recurring from round 0), VAT1-05 (V06), VDC1-16 = VEL0-06 = VPC-R1-26 (scope).

**Decision.** §6.1 states (VAT0-07's text): live epochs are numbered 1, 2, … after the creation prefix, whatever its
length R; a replay epoch r records `0x8000_0000 + r` wherever the model records an epoch number (§6.3's creation epoch
in the lineage key, `LifecycleEvent.epoch`, `Lifecycle.since.epoch`, `EpochRecord.epoch`, §2.7's `conditionEpoch`,
V06 §2.11's index); a rule that orders by epoch compares `EpochRecord.week`, never the numbers, so every replay epoch
precedes every live one; §6.5's *epoch keys* fixture adds that no lineage key a replay epoch mints equals one a live
epoch mints. V06 §3.7.7 (3)'s oldest-patch-first reads the week (VAT1-05's text, with its fixture and combination row).
J-A113.61's index row and Part A entry read as VEL0-06's required change words them (one fix closing VDC1-16, VEL0-06
and VPC-R1-26).

### R2-21 The dry-run outcome table (E-07): its head, its rows, and their readers

**Governs:** VAH-r1-06, VDC1-01, VDC1-02, VDC1-03, VDC1-04, VDC1-05, VEL1-03 (determinism); VDC1-14, VEL0-11, VAT-06
(V09); VDC1-15, VAT-R1-01 (rendering); VAT-R1-02 (V10).

**Decision.**
(a) E-07's head is VAH-r1-06's text with one change from item 126: the gates outside a dry run are §11.1's export tier,
§11.2's `advance` on a dossier-bound document, **the shell's layer gate** (no screen gate: `refuse.phone` is withdrawn,
R2-41), V09 §3.9's restore and V10 §3.16's harness and model refusals. V09 §4.9's lead names the same producers.
(b) The lead's refusal grounds add "where the input has no lawful form to bend to" (VDC1-02's text).
(c) The rows: the table-edit row loses the stamped-cell clause and `refuse.table.ownerRule` (VDC1-01: a stamped cell is a
user's to edit, V11 §4.1); the required-row delete is one row keyed `refuse.table.required` in VEL1-03's wording (the
fuller form of VDC1-01's second row — one fix); `refuse.epoch.cap` (VDC1-03); the reservation row's own key
`refuse.water.reservation` and *The returned kinds*' `unlock` sentence (VDC1-04).
(d) F-EDIT's action cell separates the outcome's key from the actions (VDC1-05's text).
(e) §11.2: `ConflictAction.kind` without `reroute` (VDC1-15); `advance` on a dossier-bound document answers
`{ status: 'conflict', outcome: { key: 'refuse.dossierClock' }, actions: [] }` (VAT-R1-01's text) — a gate outside the
dry run per (a).
(f) V09 §4.9: `refuse.table.ownerRule` withdrawn; `refuse.table.required` added in VEL0-11's row text (it governs over
VDC1-14's example wording — one fix); `refuse.epoch.cap` and `refuse.water.reservation` (its action the Re-derive from S3)
added in V09's own words; l.746's `reroute` clause and §8's PLAUSIBLE note dropped (VDC1-14). V09 §3.3 *Refused and
bent*, its steps 6 and 8 and V09 §5.3 read the card's line from the conflict's `outcome` (VAT-06's text).
(g) V10: `refuse.dossierClock` in the `dossier` category, its alternative the `fork` action (VAT-R1-02's text).

### R2-22 Re-derive people: its writer, its home and its control

**Governs:** VDC1-20 (model), VDC1-21 (pipeline), VAH-r1-03's `regenerate`-of-scope-`people` clause (V09).

**Decision.** §7.4's regenerate row of scope `people` (§10.3's re-derive people) advances `Household.tableVersion`:
§2.7's comment (VDC1-20's text) and §10.3's sentence (VDC1-21's text) say so; V09 §4.3's T10 `hold` row and V09 §4.18's
People panel give it its control, **Re-derive people** (VAH-r1-03's text).

### R2-23 `HistoryHint`'s standalone form

**Governs:** VM-R1T-14 (model), VM-R1T-15 (V09), VM-R1T-16 (V10).

**Decision.** §2.7's `HistoryHint` marks `events`, `tiers`, `population` and `calamities` optional (absent read as `[]`)
and states the standalone form — `ageYears`, `scars: []`, `peak: { tier: <the picked rung>, symbolic: false,
evidence: [] }` (VM-R1T-14's text). V09 §4.21.3 (1) and V10 §4.1's T1 row write exactly that form (VM-R1T-15's and
VM-R1T-16's texts; V10's `ageYears ?? V09's history.defaultAgeYears`).

### R2-24 The frame under a Re-derive

**Governs:** VKr1-06 (determinism), VKr1-07 (model).

**Decision.** §3.2 (9) is the home: a Re-derive that recomputes the frame — a rung change from S0, a population `adjust`
from the population control's consuming stage (at the latest S1, which lays the frame) — reads the frame law afresh and
never shrinks the frame below its protected content; an epoch's upward rung crossing only grows it. §7.4's frame row
(VKr1-06's text) and §2.2's `Plat.frame` comment (VKr1-07's text) say so.

## Part E — the world's edges

### R2-25 The moat's water level and the outfalls, per bank

**Governs:** VEW-04 (model; recurring from round 0), VEW-r1-07, VEW-07, VV34-r1-08 (V04), VAL-R1-07 = VPC-R1-16
(pipeline).

**Decision.** (a) A moat's water level is one value, §4.2 S3 (10)'s, derived from its `flowFrom` source; every reader
reads it: §2.6's water table (VEW-04's text, with its EP-22 fixture) and V04 §3.2 N7 (1) with T-V4-2's outfall clause
(VEW-r1-07's text, with T-V4-80 (j)'s moat on sloping ground). (b) The outfall fallbacks are taken per bank; V04 §3.2 N2
with N3's banks is their home (J-V4.129). II.7.2's sentence is VAL-R1-07's text (one fix closing VPC-R1-16). V04 §3.2
states the step order, a candidate's bank and a bank's stretch of `R`'s boundary (VV34-r1-08's text; its example rule —
the boundary `hydro` cells by their nearest graph node, ties by address — is the rule). T-V4-2 gains VEW-07's no-water
fixture, so II.7.2's pointer resolves.

### R2-26 Raised ways: feet, the clear span, the wall crossing and the under-deck strip

**Governs:** VKr1-02 (model), VKr1-03 (kernel), VKr1-04 (pipeline), VM-R1T-08 = VPC-R1-21 (pipeline), VM-R1T-09 (V06),
VM-R1T-10 (scope), VEW-r1-03 (model), VPC-R1-24 (pipeline), VAL-R1-09 (V07).

**Decision.**
(a) **Feet.** §2.7's `RaisedWayRecord.feet` is the one statement; a deck end on the arena's outer ring is a foot on the
ring (VKr1-02's text). §3.4 (VKr1-03's text) and §4.1's `RaisedRead.feet` (VKr1-04's text) cite §2.7 and restate nothing.
(b) **The clear-span bound** is §2.7's support step's. §4.13's river, coast, moat cell is VM-R1T-08's text (with its
*Rung* clause) and §4.3 *Where it may not go* is VPC-R1-21's text — one fix of the two pipeline ids. V06 §3.19 (5),
§3.17 item 9 and §2.10's `raised.waited` comment name `raised_too_long` beside `raised_too_tall` (VM-R1T-09); §13.2's
T110-2 and T110-5 gain VM-R1T-10's cases.
(c) **A course crossing an enceinte** has one station on the trace — the raised gate's tower, or the aqueduct's wall
arch — its pier the wall's band: §2.7's support step (3), §4.13's wall cell and V06 §3.7's aqueduct-opening sentence as
VEW-r1-03 words them (the V06 seat writes V06's end); T110-2 gains its two fixtures (scope).
(d) **The under-deck strip** is one strip with one margin cell, `raisedWays.structure.stripMarginM` (1 m) in item 110's
row set (V11 §3.24.2), shipped with item 110's rows from M3a (VPC-R1-24's text) — not V01's `hood.constants`, which ships
empty before M5. §4.6 S8 cites it (pipeline); V11 adds the cell to §3.24.2, registry row 80 and its lifecycle and
register rows, and V12 §3.11's `raisedWays.structure` line covers it (V11, V12); V01 §3.14 drops `raised.stripMarginM`
and V01 §3.17.3 (2) cites the new cell (V01); V06 §3.19's clearance cites it (V06); V07 §3.5a (5) cites §4.6's strip and
drops `stripClearM` from §2.2a and §2.2 (VAL-R1-09: no reason was recorded for a wider village strip, so two values of one
named thing are ruled to the base's home).

### R2-27 Item 114's wall condition, across the units that write or read it

**Governs:** VEW-r1-02 (model, blocker), VDC1-11 (V11), VPC-R1-03 (pipeline), VDC1-18 (scope), VAT1-05 (V06, with R2-20).

**Decision.** (a) Along an `on_enceinte` castle's `Castle.cityWeld` the town enceinte's three condition profiles are the
stretch's one condition, material and epoch; the bailey's profiles there mirror them, written in the same batch by every
writer. §2.7 states it (VEW-r1-02's text); §4.8 *Condition at generation* cites it (pipeline); V06 §3.7.7 (2)–(3) cites
it, decaying and repairing that stretch on the town ring's draws and λ (V06); §13.2's item-114 group gains the CITY
fixture (scope). (b) The generation-time condition is laid with its enceinte at generation (DR41) and carried through
every re-derivation by its knot profile (§2.2 rule 5; §7.4's `wearWall` / `repairWall` row): V11 §2.10's row reads
VDC1-11's text. (c) §4.11's walls ladder names `worn` and `patched` (VPC-R1-03). (d) §13.2 gains T114-9 (VDC1-18's
text). (e) Recovery order compares weeks (R2-20).

### R2-28 `Terrain.mining`'s test and `accessForecastMin`'s value: one statement each

**Governs:** VAL-R1-08 (pipeline); VAL-05 = VPC-R1-08 (pipeline); VV34-r1-06 (V11); VV34-r1-07 (V12).

**Decision.** (a) §4.2 S1 (10) states the test once: "the share of the frame's land cells with `SiteResources.ore` ≥ 0.5
reaches `miningCellShare` (V11 §3.23.1's `under.systems` cavern-row cell), the roster holds a mining class, or the
dossier lists a mining deposit" — citing the cell by name and stating no value (canon S2: VAL-R1-08's "0.02" is not
written in the base). Model §2.3's `mining` comment cites S1 (10) (model); V04 §3.5.2 and V07 §3.16 (1) read
`Terrain.mining` (§4.2 S1 (10)) instead of restating the test, and V11 §3.23.1 states its cell and cites §4.2 S1 (10)
for the test (V04, V07, V11). (b) `accessForecastMin` is II.7.4's
`UndergroundRule` cell, its default 0.5 written there beside `forecastSafety`'s (VAL-05's text; one fix closing
VPC-R1-08); V11 §3.23.6 (VV34-r1-06's text) and V12 §3.11's register row (VV34-r1-07's text: owner `base`, landed at
V4-U3b) cite it.

### R2-29 Every shipped sheet resolves the sky's and the underground's entries; the village's looks are §8.2's rows

**Governs:** VAL-R1-05 (rendering), VAL-R1-06 (V04), VAL-R1-11 and VAL-R1-12 (rendering; V07's end).

**Decision.** (a) §8.2's slot resolution lists every shipped sheet of its presets table — `ink`, `lit`, `hatched`,
`parchment`, `bw-print`, `night`, `painterly` from V-M1, the parity presets — for the sky's and the underground's entries
(VAL-R1-05's text); V04 §5.2 states the per-family facts of `rock`, `void` and each `under.*` semantic for every one of
them, `painterly`'s from V07 §5.1's palette entries as they stand (VAL-R1-06's text). (b) §8.2's place table and season
rows are the homes of the village readings (VAL-R1-11's and VAL-R1-12's texts); V07 §5.1 then cites §8.2's rows and
keeps only what is the village's own — which faces are crofts, closes and toft yards, which canal is the leat, the
village tiers' decoration kinds and the church lane (the V07 seat writes that end).

## Part F — owner items 116 and 119–126 across the units

### R2-30 Item 116 at the METROPOLIS cap: the limit is stop 0 where nothing fits

**Governs:** VEW-r1-05 (rendering); its ends in V09, V12 and scope; item 122 (i)'s widened limit (G122h-*).

**The owner's words:** "just zoom in and set a ceiling to the maximum zoom, or a ceiling to the amount of total land to
render". The program's interpretation (item 116 (a)) set the limit where `bounds` fits the viewport's short side plus
one stop; at the cap's 17.53 km frame no stop of the 35-stop pyramid fits a window whose short side is under ≈ 1 465 CSS
px, so k_fit is undefined there.

**Decision (J122, inside the program's interpretation and never against the owner's words; canon change).** Where no
stop k ≥ 0 fits — the bounds (while a crisis look stands, the bounds of town and camps, item 122 (i)) wider than the
viewport's short side × m₀ — k_fit is 0 and k_min is 0: the limit is the pyramid's coarsest stop, which is a ceiling on
zoom-out as the owner asked; the view there shows as much of the bounds as fits, centred by §9.5's framing; no stop is
added (item 116's "fewer stops, never more" kept). Texts: §8.8 states the case (VEW-r1-05's text); §9.5's *Fit the town*
and T-ER-08 read "the whole `bounds`, or stop 0 where it does not fit"; T-ER-08's fixtures are the METROPOLIS cap at
1 280 × 720 CSS px and at the medium class's minimum, 600 × 480 (the issue's 390 × 844 phone viewport is MOOT, R2-41)
(rendering). V09's view status at that limit shows **`info.zoom.coarsest`** — "This is as far out as the map zooms; the
town is wider than this window." — while `info.zoom.limit` ("This is the whole town.") shows only where the bounds fit
(V09). Scope's item-116 bars read "the whole bounds, or stop 0 where the bounds are wider than the window at stop 0", and
item 116's judgment index row records this narrowing of item 116 (e) at the cap on a small window (J122) (scope). V12's
item-116 statistic takes the same clause (V12).

### R2-31 Item 119 (a2), "Total": the dossier catch-up, Accept after edits, and the open

**Governs:** VV56-r1-01, VV56-r1-04 (V06); VV56-r1-06, VRC1T-01 (rendering); G119a2-V09 (V09).

**Decision.** The owner's "Total" (J132) holds for every one-time wait item 119 (a) lists — "open a map from
SettlementForge" and "a dossier change applied" included. (a) A dossier catch-up whose epochs at the port's cadence would
pass the comfort level is coarsened by V06's coarsening, the same mechanism as `advance`'s (one mechanism, principle
(9)): VV56-r1-01's text at V06 §6.8 (6), its V06 §3.21 row, T-V6-24's fixtures and a J-V6 row; every dossier event stays
at its own week, one epoch over the span always fits, and no catch-up is refused or shortened. Its other ends this
round: §4.11 *The clock* (4)'s catch-up sentence adds "coarsened under item 119's comfort level by V06 §6.8 (6)"
(pipeline), and V08's catch-up rule and its §6 row for an absorb with epochs cite V06 §6.8 (6) (V08). (b) An Accept
after edits folds at the cadence re-estimated on the current head (VV56-r1-04). (c) The open's ten seconds run to the
editable complete map; the verification replay runs after it, off the path (VV56-r1-06's text). (d) §12.1 and R12-31 list
advance and a history-first generation each in total (VRC1T-01's text). (e) V09's progress lines name the cadence chosen
(G119a2-V09's text) — a coarsened catch-up too, in V09's `progress.dossier` row.

### R2-32 Item 120: Find lands at M5

**Governs:** VAF-R1T-07 (V01), VAP-r1-13 (V10), G120-V09's and VV34-r1-03's §8 clauses (V09), G120-scope's §13.8 clause
(scope), and the "milestone that lands Find" every Find part cites (V03 §8, V04 §8, V07, V08's T-V8-58, V12's T-V12-52).
No unit placed Find (§16 names no milestone for item 120), so the volumes each deferred to a placement nobody wrote.

**Decision (J122; canon change).** Find lands at **M5**. Show gaps — which item 120 (i) makes the one successor of the
Coverage view — reads V01's `gapUnits`, and Find's area targets V01's `findAreas`, both built in V01's W10 at M5 (V01
§8.3); today's Coverage view, placed at AP4 (M3b), already reads V01's `catchmentOf`, an M5 service. Landing Find earlier
would split item 120 (i)'s one mechanism across milestones. So:
(1) Find's base parts (§2.9's `find` key, §8.2's Find rows, §9.5, §11.1, §11.2's match listing, §12.5's budget) and V09's
Find panel and `live.find` (an AP11 part, "each part with its engine") land at M5 beside V01's W10–W11. §16's M5 row
names "item 120's Find: its base parts, V09's panel, V01's area and gap services", and the carried row's AP11 list adds
"Find (M5)" (scope). V09 §8.1's AP11 row places and prices it, and AP4's "the coverage and voids views" reads "the voids
view" (V09).
(2) Each volume's Find part lands at the later of its own step and M5: T-V1-59 at M5 (W11, as written); T-V3-38 at the
later of P5 and M5; T-V4-81 at U5; T-V5-36 at M6-sky; T-V7-68 at the later of its V-M step and M5; T-V8-58 at the later
of M-SF and M5; T-V10-51 at M5's exit, V10 C3's item-120 content landing with it inside V10's estimate (VAP-r1-13's text,
"Find's milestone" reading M5); T-V12-52 at M5. VAF-R1T-07's text is satisfied by stating "M5 (Find's milestone)".
(3) §13.8 schedules T120-1 – T120-6 from M5 (scope).

### R2-33 Item 120: the `find` key's shape, the bridge, and the host

**Governs:** G120-model (the key's shape), VRC1T-02 (rendering), VAH-r1-01 = VV910-r1-04 (V10), G125-V08's clause (3)
and V08 §3.16 (4) and (6) (g), G125-rendering's view-command clause.

**Decision.** (a) §2.9 declares (model) `find?: { chips: FindChip[]; gaps: boolean }`, a per-viewer key: absent is Find
off; `chips` in selection order, each a **kind chip** `{ classes: string[] }` (one `roster.classes` id, or several for a
word chip such as "all smiths"), an **address chip** `{ target: Id }` (a place, an area — a `FindArea.id`, V01 §5.4 — a
person, or an institution), or a **dossier chip** `{ key: string; anchor: Id }` (a dossier entry's binding key and its
anchor address, re-evaluated by key and anchor, V08 §3.16 (6) (e)); a chip's colour and second cue follow its index (item 112; never stored); `gaps` is Show gaps. It is outside every digest,
the log and undo; kept through zoom, band, layer, season, advance and every commit; saved in view pins; emptied only by
Clear or closing the panel; a chip whose target is gone stays at count 0, dark. `thematic` loses `coverage` (an older
view's `coverage` is read as `gaps: true` with no chip). Writers: V09's panel and V10's `find` action, whose `chips` and
`gaps` are these fields. Readers: V09's `live.find`, §8.2's Find rows, §11.1's picture exports, V01 §5.4, V03's
`findRooms`, V04's `underFindPlaces`, V05 §5.6, V07 §5.5 and V10's `FindView`.
(b) Which keys cross a bridge is §11.3's: VRC1T-02's text, with `find` among the per-viewer keys that never cross; the
keys that travel include the host's view commands of item 125 (c) — a week (`week`, item 67), the layers shown and a
selection (rendering).
(c) So SettlementForge's own assistant sets no Find chip: V10 §3.9b (7) reads VV910-r1-04's text (one fix closing
VAH-r1-01), T-V10-51 adding "a host message never sets a chip" (V10). V08 §3.16 (4) and (6) (g)'s "no host message sets
the frame's view but `view.set { week }`" reads "a host sets the frame's view only by §11.3's `view.set` over the keys
that travel — a week, the layers shown, a selection (item 125 (c)); the per-viewer keys, `find` among them, never cross
the bridge (§11.3; J-V8.127)" (V08).

### R2-34 Item 120: one count of "served", and what Find targets

**Governs:** VV12-r1-03 (V01), VAT1-02 (V04), VAT1-01 (V05), VAL-R1-10 (V07).

**Decision.** Whether a unit is served is counted one way everywhere: V11 §2.3's `CoverageSpec` (the canon's home) for
`walk`, `households` and `parish`. V01 §3.16's `catchmentOf` cites it and keeps only V01's own readings — `neighbourhood`
as `district` (J-V1.35), `underDistance` on an underground arena, a sky island one `walk` unit, a district with no
residential plot holding no unit (VV12-r1-03's text, with its three dependents and T-V1-42 / T-V1-59 (b)). V01 §5.4 (3)'s
`gapUnits` is Show gaps' one definition; V04 §5.1 *Find on Below* (4) (VAT1-02's text) and V05 §5.6 (4) (VAT1-01's
text) cite it. The base solver's coverage term and V12 §3.6's `servedShare` already read V11 §2.3: unchanged. An access is
no Find target (V05 §5.6 (1)): V07 §5.5 (3) reads VAL-R1-10's text.

### R2-35 Items 120–126: the base bars' ids, fixed now, and the volume tests that take them

**Governs:** G120-scope – G126-scope and every volume's G-part test (R2-08 for both ends). Scope writes these ids in
§13.2 at build depth (its own wording of each); each volume test that runs a clause names the id. Item 122 (h)–(i)'s
four bars stay V12's own (as the canon routed them).

| id | the bar | volume tests taking a clause |
|---|---|---|
| T120-1 | the document hashes identically with Find on and off; every chip off gives byte-identical tiles (`item120.find`) | V12 T-V12-52; V05 T-V5-36, V07 T-V7-68 (registrations) |
| T120-2 | each chip's matches equal §11.2's gazetteer listing at the viewer's effective key | V09's Find test; V01 T-V1-59; V08 T-V8-58 (dossier entries); V10 T-V10-51 |
| T120-3 | under a player view on T-V9-66's canary fixture no withheld thing appears in a suggestion, count, glow, pin or ghost pin | V09 |
| T120-4 | the filter survives every band and layer change and every commit, advance, undo, redo, regenerate, load and migration; a chip whose last match goes stays at count 0, dark | V09; V01 T-V1-59; V03 T-V3-38; V04 T-V4-81; V05 T-V5-36; V07 T-V7-68 |
| T120-5 | at the city band every match has a pin or a count bubble; every chip has its second cue | V09; V04 T-V4-81 (i); V05 T-V5-36 |
| T120-6 | at the METROPOLIS cap suggestions within ≈ 50 ms of a key and a chip's glow within ≈ 100 ms of the click | V12 T-V12-52 |
| T121-1 | Auto is the default on a fresh install | V09 |
| T121-2 | no level change during a gesture; at most one change per 10 s on a fixture loaded at its threshold | V12 |
| T121-3 | Auto holds the frame budget's p95 on the reference and low devices over §12.5's reference views | V12 |
| T121-4 | a manual level is honoured, or the nearest level that fits is drawn with item 121 (f)'s line; never a refusal or a crash | V09 |
| T121-5 | labels, text, chrome and overlays at the device pixel ratio at every level (a pixel test) | V12 (on V09's harness) |
| T121-6 | exports and the document byte-identical across every setting (`item121.display`) | V12 |
| T121-7 | a device-pixel-ratio change re-evaluates at once | V09 |
| T121-8 | native 4K, lit at full precision, holds on the ultra tier within 512 MB | V12 |
| T122-1 | the same document hashes identically with crises on and off and in every week | V12; V06's hand-over test |
| T122-2 | each look shows exactly in its condition's weeks | V12; V09 |
| T122-3 | looks are byte-stable per seed across views and exports | V12 |
| T122-4 | every SettlementForge stressor type and condition archetype at the pinned baseline has its map row | V11 (compile); V08 (the baseline census) |
| T122-5 | looks scale with tier and severity, and with headcount where the dossier gives it | V12; V07's village test |
| T122-6 | nothing on water, a gate's passage or a label's keep-out | V12; V07's village test |
| T122-7 | with no condition and no preview, byte-identical to the base (`item122.crises`) | V12 |
| T123-1 | room, wall and opening ids identical between the intact and the damaged plan | V03; V04 (below ground) |
| T123-2 | damage monotone in the decay level on every element | V03; V04; V12 |
| T123-3 | the same element breaks at the same level for a seed, on every engine | determinism §6.5; V12 |
| T123-4 | restoring reverses it, in reverse threshold order, a repaired element in patch material | V03; V06 |
| T123-5 | the exterior agrees with the plan | V02 |
| T123-6 | battle-map exports' line of sight follows fallen walls | V03; V04 (per-band VTT) |
| T123-7 | a building never decayed is byte-identical to today's plan (`item123.damage`) | V03; V12 |
| T124-1 | the hash and every tile identical with the effects on and off; a spell leaves the tile cache untouched (`item124.effects`) | V12 |
| T124-2 | ≈ 1 ms per frame at the densest spell | V12 |
| T124-3 | no falling or lying snow on an `arid` row or on any row whose winter does not freeze, in any week | V11 (compile); V12 |
| T124-4 | arid rain frequency within its row | V11; V12 |
| T124-5 | effects off by default under reduced motion and on the low tier | V09 |
| T124-6 | labels and chrome never covered (a pixel test) | V12 |
| T124-7 | no luminance step faster than the photosensitivity limit | V12 |
| T124-8 | exports byte-identical with the effects on and off | V12 |
| T124-9 | the timeline replays from its session seed and clock | determinism §6.5; V12 |
| T125-1 | a dossier holding only SettlementForge's required keys generates a full map, every absent field reported with its fallback | V08; V12 |
| T125-2 | the same dossier with and without a host context yields the identical document and hash (`item125.host`) | V08; V12 |
| T125-3 | no code path of the port reads anything but the dossier (a static check of the adapter's imports and reads) | V08 |
| T126-1 | at the medium class every tool completes its canvas script under touch | V09 (T-V9-22's tablet half); V12 |
| T126-2 | below the medium class the medium layout holds at its 600 × 480 minimum, the page scrolls, and the document, view and selection are byte-identical across a resize over the threshold (`item126.resize`) | V09; V08 (the host frame); V12 |
| T126-3 | no phone layout, screen, notice or catalogue row exists (a build-time scan of V09's layout classes and catalogue) | V09 |

### R2-36 Items 121–126: where each part lands

**Governs:** G121-* … G126-* (their placement), scope's §16 and §13.8 rows for them, INDEX §1. No unit placed these
items' parts; each volume would otherwise write its own guess.

**Decision (J122; canon change).** Each owner item's base part lands at the base milestone below; each volume's part
lands with the volume step that builds its subject (AP11's rule, generalised); a look or view whose subject is not yet
built draws nothing of that part.
* **121** (the resolution adjuster): **M4**, with the performance tiers and the low-end tier (§16's M4 row); V09's
  Resolution setting and chip with it; V12's bars at M4.
* **122** (crisis looks): the base parts (§2.7, §7.7's DR44, §10.2's table, §8.2, §11, §12.5) with Show crises and the
  preview at **M3b**, beside item 118's decoration engine they reuse; the map rows and V08's reading at M-SF; the disaster
  look's districts with V01's W10 at M5; V02's ruined exterior with V02's building-band step; V03's look damage with
  V03's item-123 step; V06's hand-over at M6-E; V07's parts at its V-M steps.
* **123** (damage): §2.6 step 7, §6.3 and §8.6 with V03's plan step that draws a decayed or ruined plan (V03 §8 names it);
  V06's decay level at M6-E — before it, the level reads from the existence state alone at V11's default age (R2-38
  (3)); V02's exterior at the later of its step and V03's; V04's part at M6-U.
* **124** (weather effects): **M3b**, with item 117's season looks it reads.
* **125**: each re-sourced row lands with its row (DR1, DR3, DR19, DR29 with the dossier port's M1 rows; DR42 and §4.11's
  clock with item 117's base part); V08's fallback column and the final check's brief at M-SF; T125-n at M-SF.
* **126**: **M2a**, with the medium layout (the narrow class is never built); T126-n from M2a on the app harness.
* **120**: M5 (R2-32).

### R2-37 Item 122: one crisis-look design across the units

**Governs:** G122-model, -determinism, -pipeline, -rendering, -scope, -V01, -V02, -V03, -V06, -V07, -V08, -V09, -V10,
-V11, -V12 and G122h-model, -pipeline, -rendering, -V08, -V09, -V11, -V12. Each unit writes its part at build depth as
its issue says, under these shared names and homes (where a verifier's version differs, this governs):
1. **When a look stands.** A condition stands in the view while §2.9's `week` (item 67's drawn week — the document's own
   weeks, which `ConditionOverlay.sinceWeek` and `untilWeek` count) lies in [`sinceWeek`, `untilWeek`); with no
   `untilWeek`, from `sinceWeek` on while the overlay stands (its `lifecycle` not ended). `yearWeek` (the year position) dresses the season and is never compared with
   a condition's weeks. Model §2.7 states it in `ConditionOverlay`'s reader comment.
2. **The switch and the preview** are one per-viewer key in model §2.9: `crises: { mode: 'follow'|'off'|'preview';
   look?: string /* a look kind of §10.2's table, with 'preview' */ }`, default `{ mode: 'follow' }` (the shape of
   item 118's `festival`); never over a bridge; a preview draws its look at the table's `previewSeverity`. V09's **Show
   crises** switch and preview write it; §8.2 reads it.
3. **The table** (pipeline §10.2): `RosterTables.crisis: { looks: CrisisLookRow[]; map: CrisisMapRow[]; settings:
   CrisisLookSettings }`. `CrisisLookRow`, keyed by its look `kind`, is verify-pipeline-r1t's G122-pipeline declaration
   (`kind`, `place`, `band`, `scale` by rung at severity 0 and 1, `priority`) plus `lookLevel?: [number, number]` on the
   `disaster` row (the look's decay level at severity 0 and 1, linear between). `CrisisMapRow { from:
   'stressor'|'archetype'|'event'; key: string; look: string | 'none' }` is the closed mapping. `CrisisLookSettings`:
   `densityCap`, `siegeStandoffM` (≈ 300), `areaPerHeadM2` (45), `enginesPerBesiegers` (1 500), `previewSeverity`. Every
   value is V11's (canon S2): the look rows, the map rows (a dossier row set, at M-SF), the settings and item 122 (h)'s
   rates. V08 reads SettlementForge's types at the pinned baseline and checks the map's totality (an unmapped type or
   archetype reads `none`, reported `unmapped_word`). §7.7's **DR44** (determinism) states the derivation: a standing
   overlay → its map row → its look row → its scale by severity and tier, or by the dossier's headcounts where given
   (item 122 (h)); knowledge admission at the viewer's key (a withheld condition never drawn, listed, counted or named);
   its draws view-only, keyed by (seed, condition id, place) on §8.10's render keys, never a model stream.
4. **Disaster's units are whole neighbourhoods** (item 122 (b): "whole neighborhoods all having a temporary ruined
   cosmetic state", "the share by severity"). V01 states `disasterDistricts(doc, overlay, key): Id[]`, a pure service over
   committed state: the calamity's `targets` first (matched to a district, quarter or `HoodPlace`; an unmatched target
   reported, the pattern used), else the pattern by disaster (fire through contiguous blocks downwind from a keyed seed
   district, flood on the low ground by the water, earthquake scattered), the share of districts by severity; a district
   is the neighbourhood a close-up opens (J-V1.35). Every building of a returned district draws the ruined look (V02):
   there is no second, per-building share. At THORP, HAMLET and VILLAGE, where the village product holds one district (PART III (4)), the units are V07's ends
   (or, in an end-less thorp, its contiguous toft groups): V07 states them, and the same targets-then-pattern and
   share-by-severity rule picks among them.
5. **The outskirts' land** is V01's `campLand(doc): FaceRef[]` — the commons and fallow faces at the districts' outer
   edges and the approach roads' verges by the gates, never water, a gate's passage or a keep-out; §10.2's placement rules
   rank them by `priority` under `densityCap`; the refugee camp takes the faces nearest V06's frontier.
6. **V06** states `frontierFor(doc, households): FaceRef[]` — pure: where the growth phase would seat that many
   households next, by its rules over committed state (no frontier: the approach road by a gate); the aftermath through
   the epoch path; the `disaster` look ending in the week the `reconstruction` Works begins (no week draws both).
7. **The look's damage** (item 122 (d)): a building of a ruined district draws item 123's damage layer (R2-38) at
   `lookLevel` by severity, or at its own decay level where that is higher; nothing stored; ids and digests unchanged
   (V02's exterior, V03's plan, V04 below ground).
8. **Framing** (item 122 (i)): model §2.9 states the opening view, Fit and item 116's limit over the bounds of town and
   camps while a look stands, restored when none stands, a moved view never yanked; the limit clamps at stop 0 (R2-30);
   the ring's massed marks are rendering §8.8's.
9. **Exports, Find, words.** Rendering §11: pictures draw the looks, battle maps in the image only. V09 lists the looks in
   Find. V09's why lines and V10's explanations name the condition and its weeks under the key ("Refugee camp: the
   Northmarch migration, weeks 12–20").

### R2-38 Item 123: one damage design across the units

**Governs:** G123-model, -determinism, -rendering, -scope, -V02, -V03, -V04, -V06, -V09, -V10, -V11, -V12 (where a
verifier's version differs, this governs).
1. **The plan is the one built** (item 123 (a)). Model §2.6 step 7 states it. V03 states that an existence change to
   `abandoned`, `decayed` or `ruined` never re-cuts a plan: the plan in force stands (stored, else re-derived from its
   canonical prior at the building's built band and era) under the damage layer; V03's vacant re-cut (V03 §3.11, V03 §4.3)
   applies only to a standing building; a building first met ruined gets its plan as built, then its damage.
2. **Thresholds** (determinism §6.3, with its row in §6.1's registry): the concern `plan.damage` (geometry-free,
   non-rerollable, epoch component 0) draws one uniform u per plan element keyed by (the building's lineage, the
   element's id); the element's threshold is t = lo + u·(hi − lo), [lo, hi] its element kind's share of the range — V11's
   rows by element kind (wall run, partition, floor area, door, window, stair, roof bay over a room, furniture piece, and
   below ground the cellar's and the crypt's kinds), outer walls and ground floors late, partitions and upper floors early
   (item 123 (c)); no id minted; never re-drawn.
3. **The decay level** (V06): `decayLevel(doc, lineage, week): number` in [0, 1], derived and never stored — from the
   existence state, the years since the week of the epoch whose op set the building `abandoned` (read from its lifecycle
   events, §2.8) and V11's rate by material (timber faster than stone); non-decreasing while abandoned, decayed or ruined;
   lowered by restoration (`reused`, `reoccupy`, a repair), the damage leaving in reverse threshold order, a repaired
   element in item 114's patch material. A building with no abandonment epoch (generated ruined; first met in item 113's
   replay) reads its state at V11's default age — and so does every building before V06's step lands (R2-36).
4. **One comparison everywhere**: an element shows damaged when the level ≥ t. V03 (the plan, its drawing per state, its
   exports, the panel lines); V02 (the exterior — a roof bay over a room a roof hole, an outer wall run a gap — from
   V03's thresholds, never its own); V04 (cellars, crypts and underground buildings: the building above's level, an
   underground building its own; a drawing only — V04's closure states stay the model's access facts, a J-V4 row saying
   so); rendering §8.6 and §11.1; V09's and V10's lines.
5. **Bars**: R2-35's T123-n.

### R2-39 Item 124: no snow in arid country, whatever the view holds

**Governs:** VV56-r1-05 (V05), G124-rendering's §8.2 part, G124-V09, G124-V11, G124-determinism, G124-model.

**Decision.** The owner's words win (item 124, the owner: "a desert or arid land rarely gets rain, and definetly no
snow"; and item 124 (c)'s hard rule: "no snow, falling or lying, where the climate's winter does not freeze").
(a) On an `arid` climate row, and on any row whose winter does not freeze, no snow is drawn — falling (the effects) or
lying (the `weather` cover) — in any week, whatever the view's `weather` holds: a `snow` cover value there draws as
`clear`. Rendering §8.2 states it, and §8.2's "a viewer's value stands until the viewer changes it" yields on such a row.
(b) V09's weather control offers `snow` only on a row where it can lie; a carried `snow` (an older view, a pin, a changed
climate) reads `clear`; **Start a shower now** never starts snow there.
(c) **VV56-r1-05's required change is INVALID** (its direction contradicts the owner's words): V05 §3.23's seasonal row
and T-V5-34 (d) stand as written ("an arid row draws no ice and no snow on an island").
(d) The weather stream (determinism §6.1): `view.weather` on `STAGE_VIEW`, seeded per session (a session seed held in
session state, fixed by tests), keyed by the spell index; never the document's seed, a model stream, a digest, a tile
key or an export.
(e) V11 states the climate rows' weather columns and the two hard rules as compile checks.
(f) Model §2.9: the switch is device state (V09's `AppPrefs`), the spell in force session-transient view state, `weather`
the seasonal cover (G124-model's text, less its phone clause, R2-41).

### R2-40 Item 125: the week's one source, and the host's other fields

**Governs:** G125-model, -determinism, -pipeline (= VPC-R1-27), -rendering, -scope, -V08, -V09, -V12; VV56-r1-02 (V06).
Item 125 (e)'s bar ("the same dossier with and without a host context yields the identical document and hash") cannot
hold as the canon routed the item, since `HostContext.customLibrary` still adds `custom-def` facts.

**Decision (canon change).**
(1) **The week**, one sentence in every unit: a dossier-bound map's present week is the dossier's own latest stamped
tick — the greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks; with none, §4.11's clock
starts at week 0 and the year position is the user's season control (midsummer, week 19, by default). Homes and readers:
pipeline §4.11 *The clock* (1)–(2) and `EpochInputs.week` (VPC-R1-27's text; one fix closing G125-pipeline);
determinism's DR42; model §2.9 (`yearWeek` under `seasonFollow`; `week`'s default); V08's W64, field table and §3.16 (4);
V09 §4.21.7 and l.388; V06 §3.20.3's `W_p` and §5.2 *Years* (VV56-r1-02's text).
(2) **`HostContext`** (§14's interface — scope; §11.3–§11.4 — rendering; V08 §1.2, §2.4, §2.8, W72 and its offer and
mount signatures — V08; §7.7 item 1 — determinism): `week`, `realm` **and `customLibrary`** are retired as inputs.
`custom-def` facts are carried only from definition fields the dossier itself holds (its `customContentRoster` and
`customContentProvenance` entries), else item 104's generic siting supplies them, the absence reported — item 104 (a)
(5)'s "when the port receives them" kept, the port receiving them only through the dossier; item 125 (d)'s final check
lists which definition fields the dossier carries. Kept, none a data input and none able to change a document a dossier
makes: `audience` (the role and knowledge key the host sets per viewer — view state that travels, §11.3, J-A30.82),
`displayNames` (inside one export request, never stored, item 85) and `line` (it picks the adapter; with no host context
the adapter is picked from the dossier's own version stamps, and a `line` no adapter supports, or one the dossier's
stamps contradict, refuses with `E_LINE_UNSUPPORTED`). The view commands (a week, the layers shown, a selection) stay
commands (item 125 (c); R2-33 (b)).
(3) DR1, DR3, DR19, DR29 and DR42 are re-sourced as G125-determinism's required change words them, with its
verify-agree-time version's clause on item 10's input order ("the dossier's, then the blueprint's own"); every field
has its standalone fallback, reported.

### R2-41 Item 126 (a2): every phone clause is moot

**Governs:** G126-scope, -V04, -V08, -V09, -V12; and the phone clauses of G120-V09 (the bottom sheet), G124-V09,
G124-model, G124-scope (its T124-5 phone clause), G124-V12 (its (d) phone clause), VEW-r1-05 (the 390 × 844 viewport) and
VAH-r1-06 (the screen gate).

**Decision.** Item 126 (a2) governs (the owner: "we will simply not have the option of viewing the map in the phone in
the first place"): no phone layout, screen, notice, catalogue row, Send button, default or test is written anywhere; the
narrow class is retired; a tablet or desktop window below 600 × 480 CSS px keeps the medium layout at that minimum and the
page scrolls; `refuse.phone` is withdrawn. Each clause listed is MOOT and the rest of each issue is FIX. G126-V08's T-V8
clause at 599 × 479 is a small-window test, not a phone test: it stands (T126-2's host-frame clause).

## Part G — the embedding API's run controls

### R2-42 §11.2: stopping a generate or an export, a counted Stop, and two more progress kinds

**Governs:** VV910-r1-01 (rendering), VV910-r1-02 (V09; its §11.2 end rendering's), VRC1T-06 (rendering; its V09 end).

**Decision.** §11.2 this round (rendering): `generate`'s and `export`'s opts gain `signal?: AbortSignal`
(VV910-r1-01's text); `advance`'s opts gain `stopAfter?: number` — the job folds at most that many epochs and writes
`stoppedAt` on the last, as Stop does (VV910-r1-02's base end; V09's §10.1 request then closes as applied);
`Progress.wait` gains `'undo'` and `'verify'`, and `edit` takes `opts.onProgress` (VRC1T-06's text). V09 cites each: its
§3.8 (3) (VV910-r1-02's text), §4.21.9 (2) and its `progress.verify` row (V09).

## Part H — per-unit dispositions (all 306 issues)

### scope

Rulings: R2-05, R2-06, R2-07, R2-08, R2-14, R2-17, R2-18, R2-19, R2-20, R2-26, R2-27, R2-30, R2-32, R2-35, R2-36, R2-37, R2-38, R2-40, R2-41.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAL-R1-01 | major | DISAGREE | FIX |  |
| VAL-R1-04 | major | HANDOFF-OPEN | FIX per R2-06 (a) | the range in R2-06's form; its item-120 clause by R2-35 |
| VAL-R1-13 | major | DISAGREE | FIX per R2-06 (b), R2-07 | figures read last |
| VAP-r1-09 | major | DISAGREE | FIX per R2-08 |  |
| VAP-r1-15 | major | DISAGREE | FIX per R2-17 |  |
| G126-scope | major | F-MISSING | NEW DESIGN per R2-41, R2-35 (T126-1 – T126-3), R2-36 (M2a) | no phone screen; the summary names item 126 (with VCS-r1-01) |
| VDC1-16 | minor | CONFLICT | ONE FIX with VEL0-06, VPC-R1-26 | R2-20 |
| VDC1-17 | major | CONFLICT | FIX per R2-18 (d), R2-19 | its fixtures are T20-14 – T20-16 (one fix with VEL0-01); its T20-2 and T20-6 texts as written |
| VDC1-18 | major | EDGE-UNTESTED | FIX per R2-27 (d) | T114-9 |
| VDC1-19 | minor | CONFLICT | ONE FIX with VEL0-01 | R2-18 (e) |
| VEL0-01 | major | EDGE-UNTESTED | FIX per R2-18 (d), (e) | recurring from round 0; T20-14 – T20-16 |
| VEL0-06 | minor | EDGE-UNDEFINED | FIX per R2-20 | recurring from round 0; its text closes VDC1-16 and VPC-R1-26 |
| G120-scope | major | F-MISSING | NEW DESIGN per R2-35, R2-32, R2-07 | T120-1 – T120-6 from M5; "items 8–125" in R2-07's form |
| G121-scope | major | F-MISSING | NEW DESIGN per R2-35, R2-36 |  |
| G122-scope | major | F-MISSING | NEW DESIGN per R2-35, R2-36 |  |
| G123-scope | major | F-MISSING | NEW DESIGN per R2-35, R2-36 |  |
| G124-scope | major | F-MISSING | NEW DESIGN per R2-35, R2-36; MOOT in part (R2-41) | T124-5 without phones |
| G125-scope | major | F-MISSING | NEW DESIGN per R2-35, R2-36, R2-40 |  |
| VM-R0S-14 | major | EDGE-UNTESTED | FIX | recurring from round 0 |
| VM-R0S-17 | minor | CONFLICT | FIX | recurring from round 0 |
| VM-R1T-10 | major | EDGE-UNTESTED | FIX per R2-26 (b) |  |
| VPC-R1-26 | minor | CONFLICT | ONE FIX with VEL0-06 |  |
| VRC1T-09 | minor | WIRING | FIX per R2-06 (a) | §13.8's row: "the T-ER rows of §8.11, §9.7 and §11.6" |
| VCS-08 | major | COHESION | FIX per R2-06 (b) | recurring from round 0; the figures read last, not the issue's |
| VCS-10 | major | COHESION | FIX per R2-06 (a), R2-08 | recurring from round 0 |
| VCS-18 | major | COHESION | FIX per R2-06 (b) | recurring from round 0 |
| VCS-r1-01 | minor | COHESION | FIX per R2-07 | subset lists brought to item 126; §0.2 rows for items 120–126; the summary's sentence also names items 125 and 126 |
| VCS-r1-02 | minor | CONFLICT | FIX |  |
| VCS-r1-03 | minor | CONFLICT | FIX per R2-14 | the gloss replaced by R2-14's |
| VV12-r1-09 | minor | COHESION | FIX |  |
| VV56-r1-09 | minor | TERM | FIX |  |
| VV78-12 | major | COHESION | FIX per R2-06 (b) | recurring from round 0 |
| VV1112-r1-01 | major | COHESION | FIX per R2-06 (b), R2-17 | its structure stands; its figures read last |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-06: test ranges in R2-06 (a)'s form everywhere in §13.2, §13.8, §16 and INDEX; prices and totals written last (R2-06 (b)).
* R2-26 (c): T110-2 gains VEW-r1-03's two fixtures; R2-27 (a): §13.2's item-114 group gains VEW-r1-02's CITY fixture.
* R2-30: item 116's bars read "the whole bounds, or stop 0 where the bounds are wider than the window at stop 0"; item 116's index row records the narrowing (J122).
* R2-32 and R2-36: §16's M5 row names Find; the carried row's AP11 list adds "Find (M5)"; §16 and §13.8 place items 121–126 as R2-36 does; INDEX §1 follows.
* R2-40 (2): §14's `HostContext` loses `week`, `realm` and `customLibrary`; `audience`, `displayNames` and `line` keep their comments as R2-40 words them.
* R2-07: INDEX's intro reads "file g's items, the owner's rules".

### model

Rulings: R2-05, R2-13, R2-18, R2-22, R2-23, R2-24, R2-25, R2-26, R2-27, R2-28, R2-33, R2-37, R2-38, R2-39, R2-40, R2-41.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAF-R1T-03 | major | HANDOFF-OPEN | FIX |  |
| G120-model | major | F-MISSING | NEW DESIGN per R2-33 (a) | the key's shape fixed there |
| G122-model | major | F-MISSING | NEW DESIGN per R2-37 (1), (2) | with the `crises` key in §2.9 |
| G122h-model | major | F-MISSING | NEW DESIGN per R2-37 (8) |  |
| G123-model | major | F-MISSING | NEW DESIGN per R2-38 (1) |  |
| G124-model | major | F-MISSING | NEW DESIGN per R2-39 (f); MOOT in part (R2-41) | no phone default |
| G125-model | major | F-MISSING | NEW DESIGN per R2-40 (1) |  |
| VAL-18 | major | DISAGREE | ONE FIX with VRC1T-11 | VRC1T-11's text; recurring from round 0 |
| VDC1-20 | minor | WIRING | FIX per R2-22 |  |
| VEL1-01 | major | EDGE-UNDEFINED | FIX per R2-18 (a) |  |
| VEW-04 | major | EDGE-UNDEFINED | FIX per R2-25 (a) | recurring from round 0 |
| VEW-r1-02 | blocker | EDGE-UNDEFINED | FIX per R2-27 (a) | blocker |
| VEW-r1-03 | major | EDGE-UNDEFINED | FIX per R2-26 (c) | its §4.13 end is pipeline's, its V06 §3.7 end V06's, its T110-2 fixtures scope's — all this round |
| VKr1-02 | major | EDGE-UNDEFINED | FIX per R2-26 (a) |  |
| VKr1-07 | minor | CONFLICT | FIX per R2-24 |  |
| VM-R1T-01 | major | CONFLICT | ONE FIX with VPC-R1-10, VV12-r1-01 | R2-13; VPC-R1-10's comment line |
| VM-R1T-02 | minor | RESTATEMENT | FIX per R2-13 |  |
| VM-R1T-12 | minor | WIRING | FIX |  |
| VM-R1T-13 | minor | ELEGANCE | FIX per R2-13 | pipeline writes its §4.7 end this round |
| VM-R1T-14 | minor | EDGE-UNDEFINED | FIX per R2-23 |  |
| VPC-R1-10 | minor | CONFLICT | ONE FIX with VM-R1T-01 |  |
| VPC-R1-12 | minor | WIRING | FIX per R2-13 |  |
| VPC-R1-17 | minor | CONFLICT | FIX |  |
| VRC1T-11 | minor | CONFLICT | ONE FIX with VAL-18 |  |
| VV12-r1-01 | major | CONFLICT | ONE FIX with VM-R1T-01 |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-25 (a): nothing beyond VEW-04.
* R2-28 (a): §2.3's `mining` comment cites §4.2 S1 (10).
* Pipeline's VEW-r1-04: §2.5 declares `Plot.platformSteps?: { line: ChainRef; datumCm: Cm }[]` (written by S11's levelling, in the plot's leaf digest) and `Block.platformSteps?` (S10's) as VEW-r1-04 words them.
* R2-37 (2), (8) and R2-39 (f): §2.9's `crises` key, the crisis framing, the effects switch and spell.

### kernel

Rulings: R2-05, R2-26.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VKr1-03 | minor | CONFLICT | FIX per R2-26 (a) |  |
| VKr1-05 | minor | CONFLICT | FIX |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-26 (a): §3.4 cites §2.7's feet (VKr1-03).

### pipeline

Rulings: R2-05, R2-12, R2-13, R2-14, R2-18, R2-22, R2-25, R2-26, R2-27, R2-28, R2-31, R2-36, R2-37, R2-40.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAF-R0S-08 | minor | BROKEN-REFERENCE | ONE FIX with VPC-R1-09, VV12-r1-02 | recurring from round 0 (fixed wrongly in round 1) |
| VAF-R0S-19 | major | HANDOFF-OPEN | ONE FIX with VPC-R1-22 | recurring from round 0 |
| VAF-R1T-04 | major | DISAGREE | FIX per R2-14 |  |
| G122-pipeline | major | F-MISSING | NEW DESIGN per R2-37 (3) | the verify-pipeline-r1t version's declarations, plus `map`, `lookLevel` and `previewSeverity` |
| G122h-pipeline | major | F-MISSING | NEW DESIGN per R2-37 (3) |  |
| G125-pipeline | major | F-MISSING | ONE FIX with VPC-R1-27 | R2-40 (1) |
| VAL-05 | major | HANDOFF-OPEN | ONE FIX with VPC-R1-08 | R2-28 (b); recurring from round 0 |
| VAL-08 | major | DISAGREE | ONE FIX with VPC-R1-04 | R2-12; recurring from round 0 |
| VAL-R1-02 | major | MATRIX-GAP | FIX per R2-12 |  |
| VAL-R1-07 | major | DISAGREE | ONE FIX with VPC-R1-16 | R2-25 (b); VAL-R1-07's text |
| VAL-R1-08 | major | MATRIX-GAP | FIX per R2-28 (a) | the base states no value for `miningCellShare` |
| VAL-R1-14 | minor | BROKEN-REFERENCE | ONE FIX with VKr1-08 | the union of their lists: l.4648 "V01 §3.5"; l.5975 "V05 §3.7"; l.6601–6602 "V05 §3.10 (5)"; l.6977 "V07 §3.10"; l.7311 "V07 §3.4"; l.14314 "V07 §2.4"; l.14478 "V11 §3.7"; l.14531 "V03 §3.3 S6 (d)"; l.19424 "V05 §3.7"; l.20307 "V07 §3.5" |
| VDC1-21 | minor | WIRING | FIX per R2-22 |  |
| VEL1-02 | major | EDGE-UNDEFINED | FIX per R2-18 (a) |  |
| VEW-r1-01 | major | EDGE-UNDEFINED | FIX | one S3 (9) text with VPC-R1-02: a gate's or a route's way in within §4.3's class grade limit, else F-ROUTE's ladder to `unserved`, reported |
| VEW-r1-04 | major | EDGE-UNDEFINED | FIX | its §2.5 fields (`Plot.platformSteps?`, `Block.platformSteps?`) are written by the model seat this round (R2-05) |
| VEW-r1-06 | major | CATALOGUE-GAP | FIX |  |
| VKr1-04 | minor | CONFLICT | FIX per R2-26 (a) |  |
| VKr1-08 | minor | BROKEN-REFERENCE | ONE FIX with VAL-R1-14 |  |
| VM-R1T-08 | major | CONFLICT | ONE FIX with VPC-R1-21 | R2-26 (b): VM-R1T-08's §4.13 text, VPC-R1-21's §4.3 text |
| VPC-01 | minor | F-MISSING | FIX per R2-13 | recurring from round 0; both ends this round with V11's VPC-R1-01 |
| VPC-R1-02 | major | CONFLICT | FIX | see VEW-r1-01 |
| VPC-R1-03 | minor | COHESION | FIX per R2-27 (c) |  |
| VPC-R1-04 | minor | BROKEN-REFERENCE | ONE FIX with VAL-08 |  |
| VPC-R1-08 | minor | COHESION | ONE FIX with VAL-05 |  |
| VPC-R1-09 | minor | BROKEN-REFERENCE | ONE FIX with VAF-R0S-08 |  |
| VPC-R1-13 | minor | BROKEN-REFERENCE | FIX |  |
| VPC-R1-16 | minor | CONFLICT | ONE FIX with VAL-R1-07 |  |
| VPC-R1-18 | minor | TERM | FIX |  |
| VPC-R1-21 | minor | COHESION | ONE FIX with VM-R1T-08 |  |
| VPC-R1-22 | minor | COHESION | ONE FIX with VAF-R0S-19 |  |
| VPC-R1-23 | major | EDGE-UNDEFINED | FIX |  |
| VPC-R1-24 | minor | WIRING | FIX per R2-26 (d) |  |
| VPC-R1-25 | minor | EDGE-UNTESTED | FIX |  |
| VPC-R1-27 | major | CONFLICT | FIX per R2-40 (1) |  |
| VV12-r1-02 | minor | BROKEN-REFERENCE | ONE FIX with VAF-R0S-08 |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-13: §4.7's `Designation.use` and `PlacementItem.cls` typed `BuildingClass` (VM-R1T-13's pipeline end).
* R2-26 (c): §4.13's wall cell reads "no support in a wall strip but the crossing's station on the band" (VEW-r1-03).
* R2-27 (a): §4.8 *Condition at generation* cites §2.7's welded-stretch rule.
* R2-31 (a): §4.11 *The clock* (4)'s catch-up sentence adds "coarsened under item 119's comfort level by V06 §6.8 (6)".
* R2-28 (a): §4.2 S1 (10) states the mining test once, naming `miningCellShare` with no value.

### determinism

Rulings: R2-01, R2-05, R2-11, R2-18, R2-20, R2-21, R2-24, R2-35, R2-36, R2-37, R2-38, R2-39, R2-40, R2-41.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-r1-06 | minor | DISAGREE | FIX per R2-21 (a) | no screen gate (item 126) |
| G122-determinism | major | F-MISSING | NEW DESIGN per R2-37 (3) | the row is DR44 |
| G123-determinism | major | F-MISSING | NEW DESIGN per R2-38 (2), R2-35 (T123-3) | `plan.damage`; t = lo + u·(hi − lo) |
| G124-determinism | major | F-MISSING | NEW DESIGN per R2-39 (d), R2-35 (T124-9) | seeded per session; the verify-agree-time version's "from the document's seed" is overridden |
| G125-determinism | major | F-MISSING | NEW DESIGN per R2-40 (3) |  |
| VAT0-07 | major | DISAGREE | FIX per R2-20 | recurring from round 0 |
| VDC0-27 | minor | CONFLICT | ONE FIX with VKr1-01 | VKr1-01's text ("descent stalls in a sink (§4.2 S1 (3));"); recurring from round 0 |
| VDC0-33 | minor | CONFLICT | INVALID (R2-01) | closed for good |
| VDC1-01 | major | CONFLICT | FIX per R2-21 (c) | its second row in VEL1-03's wording |
| VDC1-02 | minor | CONFLICT | FIX per R2-21 (b) |  |
| VDC1-03 | minor | WIRING | FIX per R2-21 (c) |  |
| VDC1-04 | minor | CONFLICT | FIX per R2-21 (c) |  |
| VDC1-05 | minor | WIRING | FIX per R2-21 (d) |  |
| VDC1-06 | minor | WIRING | FIX | its (a) is VM-R1T-11's §6.1 half (one fix) |
| VDC1-07 | minor | WIRING | FIX |  |
| VDC1-08 | minor | BROKEN-REFERENCE | FIX |  |
| VDC1-09 | minor | BROKEN-REFERENCE | ONE FIX with VPC-R1-19 | VDC1-09's text |
| VDC1-10 | minor | NEW-PROBLEM | FIX |  |
| VDC1-12 | major | EDGE-UNDEFINED | FIX per R2-18 (b), (d) | its fixture is T20-16 |
| VEL1-03 | major | EDGE-UNDEFINED | FIX per R2-21 (c) |  |
| VKr1-01 | minor | CONFLICT | ONE FIX with VDC0-27 |  |
| VKr1-06 | minor | CONFLICT | FIX per R2-24 |  |
| VM-R1T-11 | minor | BROKEN-REFERENCE | FIX | its §6.1 half is VDC1-06 (a) (one fix); its §5.3 half `Household.transit` (§2.7) |
| VPC-R1-19 | minor | BROKEN-REFERENCE | ONE FIX with VDC1-09 |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-11: the crisis-look row is numbered DR44 and item 10's DR-range sentence names it.
* R2-18 (d): §7.7's fixture line cites T20-14 – T20-16.
* R2-35: §6.5 carries T123-3's and T124-9's determinism clauses (the same element at the same level on every engine; the weather timeline replayed from its session seed and clock).
* R2-40 (2): §7.7 item 1's host inputs read as R2-40 (2) words them (no `HostContext.week`, `.realm` or `.customLibrary`).

### rendering

Rulings: R2-05, R2-10, R2-21, R2-29, R2-30, R2-31, R2-32, R2-33, R2-35, R2-36, R2-37, R2-38, R2-39, R2-40, R2-41, R2-42.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-31 | major | HANDOFF-OPEN | FIX per R2-10 | recurring from round 0; its (b) is VV910-02 and its (c) VV1112-r1-06 (one fix each) |
| VAL-R1-05 | major | DISAGREE | FIX per R2-29 (a) |  |
| VAL-R1-11 | major | DISAGREE | FIX per R2-29 (b) |  |
| VAL-R1-12 | major | DISAGREE | FIX per R2-29 (b) |  |
| G120-rendering | major | F-MISSING | NEW DESIGN per R2-32, R2-33, R2-35 | with VV34-r1-04's ghost-pin label |
| G121-rendering | major | F-MISSING | NEW DESIGN per R2-35, R2-36 | lands at M4 |
| G122-rendering | major | F-MISSING | NEW DESIGN per R2-37 | reads §2.9's `crises` key |
| G123-rendering | major | F-MISSING | NEW DESIGN per R2-38 (4) |  |
| G124-rendering | major | F-MISSING | NEW DESIGN per R2-39 (a) |  |
| G122h-rendering | major | F-MISSING | NEW DESIGN per R2-37 (8), R2-30 |  |
| G125-rendering | major | F-MISSING | NEW DESIGN per R2-40 (2), R2-33 (b) |  |
| VAT-R1-01 | major | MATRIX-GAP | FIX per R2-21 (e) |  |
| VDC1-15 | minor | WIRING | FIX per R2-21 (e) |  |
| VEW-r1-05 | major | EDGE-UNDEFINED | FIX per R2-30 | its 390 × 844 phone viewport is MOOT (R2-41) |
| VRC1T-01 | minor | F-MISSING | FIX per R2-31 (d) |  |
| VRC1T-02 | major | CONFLICT | FIX per R2-33 (b) | `find` among the keys that never cross; the host's view commands travel |
| VRC1T-03 | major | EDGE-UNDEFINED | FIX |  |
| VRC1T-04 | major | EDGE-UNDEFINED | FIX |  |
| VRC1T-05 | minor | CONFLICT | FIX |  |
| VRC1T-06 | minor | WIRING | FIX per R2-42 |  |
| VRC1T-07 | minor | CONFLICT | FIX |  |
| VRC1T-08 | minor | TERM | FIX |  |
| VRC1T-10 | minor | CONFLICT | FIX |  |
| VV34-r1-04 | minor | WIRING | FIX | with G120-rendering |
| VV56-r1-06 | minor | CONFLICT | FIX per R2-31 (c) |  |
| VV910-02 | major | CONFLICT | ONE FIX with VAH-31 (b) | R2-10; recurring from round 0 |
| VV910-r1-01 | minor | WIRING | FIX per R2-42 |  |
| VV1112-r1-06 | minor | ELEGANCE | ONE FIX with VAH-31 (c) | R2-10 |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-42: §11.2's `advance` opts gain `stopAfter?: number` (VV910-r1-02's base end, owned by V09's issue).
* R2-33 (b): §11.3's travelling keys include the host's view commands (a week, the layers shown, a selection).
* R2-36: item 121's parts at M4, items 122 and 124's base parts at M3b, Find's at M5 (§12 and §8 rows that name a milestone).

### V01

Rulings: R2-05, R2-06, R2-08, R2-10, R2-13, R2-26, R2-32, R2-34, R2-35, R2-36, R2-37.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAF-R0S-04 | major | DUPLICATE-HOME | FIX per R2-13 | `RaisedKind` (§2.7) at both fields |
| VAF-R0S-15 | major | DUPLICATE-HOME | ONE FIX with VPC-R1-11 | R2-13; VAF-R0S-15's text; recurring from round 0 |
| VAF-R1T-05 | major | DUPLICATE-HOME | FIX per R2-13 |  |
| VAF-R1T-07 | major | DISAGREE | FIX per R2-32 | Find lands at M5: T-V1-59 stays in W11 at M5, the row naming "M5 (Find's milestone)" |
| G122-V01 | major | F-MISSING | NEW DESIGN per R2-37 (4)–(5), R2-36 | `disasterDistricts` and `campLand`; whole districts, no per-building share; the verify-vol-V01-V02 version's scope (edges, Find listing, budget line, bar, decision row) under those names |
| VAH-r1-12 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VAP-r1-07 | major | HANDOFF-OPEN | FIX per R2-08 |  |
| VM-R1T-03 | minor | RESTATEMENT | FIX per R2-13 |  |
| VM-R1T-04 | minor | CONFLICT | FIX |  |
| VPC-R1-11 | minor | CONFLICT | ONE FIX with VAF-R0S-15 |  |
| VV12-r1-03 | major | CONFLICT | FIX per R2-34 |  |
| VV12-r1-04 | minor | TERM | FIX |  |
| VV1112-r1-05 | minor | ELEGANCE | FIX per R2-10 | `LadderStep` (V11 §2.6) |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-26 (d): V01 §3.14 drops `raised.stripMarginM`; V01 §3.17.3 (2) cites `raisedWays.structure.stripMarginM` (V11 §3.24.2).
* R2-35: T-V1-59's head names T120-2 and T120-4's town clauses.
* R2-06 (c): state a changed §8 total in the report's first lines.

### V02

Rulings: R2-04, R2-05, R2-06, R2-07, R2-10, R2-13, R2-16, R2-35, R2-36, R2-37, R2-38.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAF-R0S-03 | major | DUPLICATE-HOME | ONE FIX with VM-R1T-05 | R2-13; recurring from round 0 |
| VAF-R1T-01 | blocker | DISAGREE | FIX per R2-16 | blocker; V02's upper-half rule withdrawn |
| G122-V02 | major | F-MISSING | NEW DESIGN per R2-37 (4), (7), R2-36 | every building of a district `disasterDistricts` returns; the verify-vol-V01-V02 version's "keyed share by severity" per building is overridden (item 122 (b): whole neighbourhoods) |
| G123-V02 | major | F-MISSING | NEW DESIGN per R2-38 (4), R2-35 (T123-5) | V03's thresholds, never V02's own |
| VAH-r1-13 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VM-R1T-05 | minor | RESTATEMENT | ONE FIX with VAF-R0S-03 |  |
| VV12-08 | major | CHANGED | CLOSED per R2-04 | J-V2.109 confirmed; no text change |
| VV12-r1-05 | minor | BROKEN-REFERENCE | FIX (second option) | l.3056 reads "≈ 35 µs for the roofscape's facets (V02 §6.2's ≤ 25 µs median with its ≤ 150 µs p99 tail)"; V02 §6.2 gains no new figure |
| VV12-r1-06 | minor | COHESION | FIX per R2-07 | l.7 reads "file g", no range |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-35: G123-V02's T-V2 bar names T123-5.

### V03

Rulings: R2-05, R2-06, R2-10, R2-32, R2-35, R2-36, R2-37, R2-38.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| G122-V03 | major | F-MISSING | NEW DESIGN per R2-37 (7), R2-38, R2-36 | the look level from `lookLevel`; the drawn level the greater |
| G123-V03 | major | F-MISSING | NEW DESIGN per R2-38 (1)–(4), R2-35, R2-36 | includes the no-re-cut rule of R2-38 (1) |
| VAH-r1-14 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VV34-r1-10 | major | EDGE-UNTESTED | FIX |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-32: T-V3-38 at the later of P5 and M5.
* R2-35: T-V3-38 names T120-4's interior clause; the item-123 test names T123-1, T123-2, T123-4, T123-6 and T123-7.

### V04

Rulings: R2-05, R2-06, R2-12, R2-25, R2-28, R2-29, R2-32, R2-34, R2-35, R2-36, R2-38, R2-41.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAL-R1-06 | major | MATRIX-GAP | FIX per R2-29 (a) |  |
| G123-V04 | major | F-MISSING | NEW DESIGN per R2-38 (4), R2-35, R2-36 | a drawing only; the closure states stay the model's access facts, with its J-V4 row |
| G126-V04 | major | F-MISSING | FIX per R2-41 |  |
| VAT0-01 | blocker | DISAGREE | FIX | blocker; recurring from round 0 |
| VAT1-02 | major | DISAGREE | FIX per R2-34 |  |
| VEW-07 | minor | EDGE-UNTESTED | FIX per R2-25 | recurring from round 0 |
| VEW-r1-07 | minor | EDGE-UNDEFINED | FIX per R2-25 (a) |  |
| VV34-r1-09 | major | EDGE-UNTESTED | FIX |  |
| VV34-r1-08 | minor | NEW-PROBLEM | FIX per R2-25 (b) | its example rule is the rule |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-12: V04 §1b.2, V04 §3.5.7 *With a scope* and V04 §3.10 name `AccessPassStrategy.run` with II.7.6's parameters.
* R2-28 (a): V04 §3.5.2 reads `Terrain.mining` (§4.2 S1 (10)) instead of restating the test.
* R2-32 and R2-35: T-V4-81 at U5; its head names T120-4 and T120-5 (its (i)).

### V05

Rulings: R2-05, R2-06, R2-08, R2-09, R2-10, R2-32, R2-34, R2-35, R2-39.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-r1-15 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VAP-r1-06 | major | HANDOFF-OPEN | FIX per R2-08 |  |
| VAT1-01 | major | DISAGREE | FIX per R2-34 |  |
| VV56-r1-05 | minor | CONFLICT | INVALID (R2-39 (c)) | its direction contradicts item 124 (c), the owner's words; V05 §3.23 and T-V5-34 (d) stand; the defect is fixed at rendering §8.2 (R2-39 (a)) |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-09: T-V5-34 – T-V5-36 state their registrations (`item117.season`, `item118.festival`, `item120.find`).
* R2-32 and R2-35: T-V5-36 at M6-sky; its head names T120-1's registration, T120-4 and T120-5.

### V06

Rulings: R2-05, R2-06, R2-09, R2-12, R2-13, R2-18, R2-19, R2-20, R2-26, R2-27, R2-31, R2-35, R2-36, R2-37, R2-38, R2-40.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAP-r1-10 | major | DISAGREE | FIX per R2-09 |  |
| VAT1-03 | blocker | DISAGREE | FIX per R2-19 | blocker |
| VAT1-05 | major | DISAGREE | FIX per R2-20 |  |
| G122-V06 | major | F-MISSING | NEW DESIGN per R2-37 (6), R2-35 (T122-1), R2-36 | `frontierFor`; the reconstruction hand-over |
| G123-V06 | major | F-MISSING | NEW DESIGN per R2-38 (3), R2-35 (T123-4), R2-36 | `decayLevel`, derived and never stored |
| VEL1-04 | minor | EDGE-UNDEFINED | FIX per R2-18 (a) |  |
| VM-R1T-06 | minor | CONFLICT | FIX per R2-13 |  |
| VM-R1T-09 | minor | WIRING | FIX per R2-26 (b) |  |
| VPC-R1-05 | minor | BROKEN-REFERENCE | FIX per R2-12 |  |
| VPC-R1-20 | minor | CONFLICT | FIX per R2-13 |  |
| VV34-r1-05 | minor | BROKEN-REFERENCE | FIX per R2-12 |  |
| VV56-r1-01 | major | EDGE-UNDEFINED | FIX per R2-31 (a) | its pipeline and V08 ends are written this round by those seats |
| VV56-r1-02 | major | CONFLICT | FIX per R2-40 (1) |  |
| VV56-r1-03 | minor | BROKEN-REFERENCE | FIX |  |
| VV56-r1-04 | minor | CONFLICT | FIX per R2-31 (b) |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-12: l.1015 and l.2459 name `AccessPassStrategy.run` with II.7.6's parameters.
* R2-26 (c): V06 §3.7's "a wall opening under an aqueduct is no support" reads as VEW-r1-03 amends it.
* R2-26 (d): V06 §3.19's clearance cites `raisedWays.structure.stripMarginM` (V11 §3.24.2).
* R2-27 (a): V06 §3.7.7 (2)–(3) cites §2.7's welded-stretch rule (the town ring's draws and λ).

### V07

Rulings: R2-03, R2-05, R2-06, R2-08, R2-09, R2-10, R2-11, R2-12, R2-14, R2-19, R2-26, R2-28, R2-29, R2-32, R2-34, R2-35, R2-36, R2-37.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-r1-16 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VAH-r1-20 | minor | BROKEN-REFERENCE | FIX per R2-11 |  |
| VAL-R1-03 | major | HANDOFF-OPEN | ONE FIX with VPC-R1-06, VV78-r1-03 | R2-12 |
| VAL-R1-09 | major | MATRIX-GAP | FIX per R2-26 (d) | `stripClearM` dropped; V07 cites §4.6's strip (`raisedWays.structure.stripMarginM`) |
| VAL-R1-10 | major | DISAGREE | FIX per R2-34 |  |
| G122-V07 | major | F-MISSING | NEW DESIGN per R2-37 (4), R2-35 (T122-5, T122-6), R2-36 | the village rungs' disaster units are V07's ends (R2-37 (4)); the verify-vol-V07-V08 version's scope under R2-37's names |
| VAP-r1-01 | major | HANDOFF-OPEN | FIX per R2-08, R2-09 | T-V7-63's `item115.off` registration clause included |
| VAT1-04 | major | DISAGREE | FIX per R2-19 |  |
| VPC-R1-06 | minor | BROKEN-REFERENCE | ONE FIX with VAL-R1-03 |  |
| VV78-21 | minor | CONFLICT | INVALID (R2-03) | V07-RESTATE-1 superseded by file f item 202; canon amended |
| VV78-r1-01 | minor | CONFLICT | FIX per R2-14 |  |
| VV78-r1-02 | minor | BROKEN-REFERENCE | FIX |  |
| VV78-r1-03 | minor | CONFLICT | ONE FIX with VAL-R1-03 |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-28 (a): V07 §3.16 (1) reads `Terrain.mining` (§4.2 S1 (10)).
* R2-29 (b): V07 §5.1 cites §8.2's place table and season rows, keeping only the village's own kinds.
* R2-32: T-V7-68 at the later of its V-M step and M5; R2-09: T-V7-68 states its `item120.find` registration.

### V08

Rulings: R2-05, R2-06, R2-08, R2-09, R2-10, R2-13, R2-18, R2-31, R2-32, R2-33, R2-35, R2-36, R2-37, R2-40, R2-41.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-r1-02 | major | DISAGREE | FIX per R2-18 (c) |  |
| VAH-r1-09 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| G122-V08 | major | F-MISSING | NEW DESIGN per R2-37 (3), R2-35 (T122-4), R2-36 | the baseline census and the totality check; the map rows' values are V11's |
| G122h-V08 | major | F-MISSING | NEW DESIGN per R2-37 (3) | the headcount fields, in-development, confirmed by item 125 (d) |
| G125-V08 | major | F-MISSING | NEW DESIGN per R2-40, R2-33 (c), R2-35 (T125-n) | its clause (4) (line, customLibrary) is answered by R2-40 (2) |
| VAP-r1-02 | major | HANDOFF-OPEN | FIX per R2-08, R2-09 | T-V8-53's `item115.ceiling` registration included |
| G126-V08 | major | F-MISSING | FIX per R2-41 | its 599 × 479 clause stands (T126-2) |
| VM-R1T-07 | minor | RESTATEMENT | FIX per R2-13 |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-31 (a): V08's catch-up rule (l.1778) and its §6 row for an absorb with epochs cite V06 §6.8 (6).
* R2-33 (c): V08 §3.16 (4) and (6) (g) read as R2-33 (c) words them.
* R2-32: T-V8-58 at the later of M-SF and M5; R2-35: its head names T120-2's dossier clause.

### V09

Rulings: R2-05, R2-06, R2-08, R2-10, R2-11, R2-21, R2-22, R2-23, R2-30, R2-31, R2-32, R2-33, R2-34, R2-35, R2-36, R2-37, R2-38, R2-39, R2-40, R2-41, R2-42.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-r1-03 | major | HANDOFF-OPEN | ONE FIX with VAT-08 | R2-22 for the `people` row; VAH-r1-03's text, keeping VAT-08's more detailed gesture wording where it gives one |
| VAH-r1-04 | major | DISAGREE | FIX |  |
| VAH-r1-05 | minor | DISAGREE | FIX |  |
| VAH-r1-08 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VAH-r1-17 | minor | BROKEN-REFERENCE | FIX per R2-11 |  |
| G120-V09 | major | F-MISSING | NEW DESIGN per R2-32, R2-33, R2-34, R2-35; MOOT in part (R2-41) | the phone bottom sheet is not written; Coverage folds into Show gaps at M5 |
| G121-V09 | major | F-MISSING | NEW DESIGN per R2-35, R2-36 | lands at M4 |
| G122-V09 | major | F-MISSING | NEW DESIGN per R2-37 (2), (9), R2-35, R2-36 | Show crises and the preview write §2.9's `crises` key |
| G122h-V09 | major | F-MISSING | NEW DESIGN per R2-37 (8), R2-30 | `info.zoom.coarsest` at the clamped limit |
| G123-V09 | major | F-MISSING | NEW DESIGN per R2-38 (4) |  |
| G124-V09 | major | F-MISSING | NEW DESIGN per R2-39 (b), R2-35 (T124-5); MOOT in part (R2-41) | defaults: on with headroom; off on the low tier and under reduced motion — no phone default |
| G125-V09 | major | F-MISSING | NEW DESIGN per R2-40 (1) |  |
| VAP-11 | major | DISAGREE | FIX | recurring from round 0 |
| VAP-r1-03 | major | HANDOFF-OPEN | FIX per R2-08 |  |
| VAP-r1-14 | major | DISAGREE | FIX |  |
| G126-V09 | major | F-MISSING | FIX per R2-41 |  |
| VAT-06 | major | HANDOFF-OPEN | FIX per R2-21 (f) | recurring from round 0 |
| VAT-08 | major | HANDOFF-OPEN | ONE FIX with VAH-r1-03 | recurring from round 0 |
| VAT-R1-05 | minor | DISAGREE | FIX |  |
| VDC1-13 | minor | WIRING | FIX |  |
| VDC1-14 | minor | WIRING | FIX per R2-21 (f) | its `refuse.table.required` row is VEL0-11's (one fix) |
| VEL0-11 | major | EDGE-UNDEFINED | FIX per R2-21 (f) | recurring from round 0 |
| VM-R1T-15 | major | CONFLICT | FIX per R2-23 |  |
| VV34-r1-01 | major | WIRING | FIX |  |
| VV34-r1-03 | major | WIRING | FIX per R2-32 | Find's milestone is M5 |
| VV34-r1-02 | minor | CONFLICT | FIX |  |
| VV56-r1-08 | minor | WIRING | FIX | with G120-V09 |
| VV910-20 | minor | ID | FIX | recurring from round 0 |
| G119a2-V09 | major | F-MISSING | NEW DESIGN per R2-31 (e) |  |
| VV910-r1-02 | minor | EDGE-UNDEFINED | FIX per R2-42 | §11.2's `stopAfter` is written by rendering this round; V09 §10.1's request closes as applied |
| VV910-r1-03 | minor | TERM | FIX |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-21 (a): §4.9's lead names the gates outside a dry run as E-07's head does (no `refuse.phone`).
* R2-30: `info.zoom.coarsest` beside `info.zoom.limit`.
* R2-32: AP4's "the coverage and voids views" reads "the voids view"; AP11 places and prices Find at M5.
* R2-42: §3.8 (3), §4.21.9 (2) and a `progress.verify` row cite §11.2's additions.
* V11's VAH-r1-07: V09 §2.6 reads "… and a family the cell does not hold reads Normal (V11 §4.2)", with no value of its own.

### V10

Rulings: R2-02, R2-05, R2-06, R2-07, R2-08, R2-11, R2-21, R2-23, R2-32, R2-33, R2-35, R2-37, R2-38.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-r1-01 | major | DISAGREE | ONE FIX with VV910-r1-04 | R2-33 (c); VV910-r1-04's text |
| VAH-r1-18 | minor | BROKEN-REFERENCE | FIX per R2-11 | l.358 reads "DR1–DR44" |
| G122-V10 | major | F-MISSING | NEW DESIGN per R2-37 (9) |  |
| G123-V10 | major | F-MISSING | NEW DESIGN per R2-38 (4) |  |
| VAP-r1-04 | major | HANDOFF-OPEN | FIX per R2-08 |  |
| VAP-r1-13 | major | DISAGREE | FIX per R2-32 | "Find's milestone" is M5: T-V10-51 at M5's exit |
| VAT-20 | minor | DISAGREE | INVALID in its rung clause (R2-02) | the rest was fixed in round 1; V10 §3.16's `rule` row stands |
| VAT-R1-02 | major | MATRIX-GAP | FIX per R2-21 (g) |  |
| VAT-R1-03 | major | DISAGREE | FIX |  |
| VAT-R1-04 | minor | DISAGREE | FIX |  |
| VAT-R1-06 | minor | DISAGREE | FIX |  |
| VM-R1T-16 | major | CONFLICT | FIX per R2-23 |  |
| VV910-r1-04 | major | CONFLICT | ONE FIX with VAH-r1-01 |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-33 (c): T-V10-51 adds "a host message never sets a chip"; R2-35: its head names T120-2's clerk clause.
* R2-07: the title block's owner-item range is Assemble's to set in R2-07's form.

### V11

Rulings: R2-05, R2-06, R2-07, R2-08, R2-10, R2-11, R2-12, R2-13, R2-14, R2-15, R2-16, R2-26, R2-27, R2-28, R2-35, R2-37, R2-38, R2-39.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAF-R0S-13 | major | DISAGREE | ONE FIX with VV12-r1-07 | R2-15; recurring from round 0 |
| VAF-R0S-20 | major | HANDOFF-OPEN | FIX per R2-16 | recurring from round 0 |
| VAF-R0S-23 | major | HANDOFF-OPEN | ONE FIX with VPC-R1-14 | recurring from round 0 |
| VAF-R1T-02 | major | MATRIX-GAP | FIX |  |
| VAF-R1T-06 | major | HANDOFF-OPEN | FIX per R2-13 |  |
| G122-V11 | major | F-MISSING | NEW DESIGN per R2-37 (3), R2-35 (T122-4) | the look, map and settings rows; the map rows a dossier row set at M-SF |
| G122h-V11 | major | F-MISSING | NEW DESIGN per R2-37 (3) | the rates are `CrisisLookSettings` cells |
| G123-V11 | major | F-MISSING | NEW DESIGN per R2-38 (2), (3) | the element-kind ranges [lo, hi], the material rates and the default age |
| G124-V11 | major | F-MISSING | NEW DESIGN per R2-39 (e), R2-35 (T124-3, T124-4) |  |
| VAH-r1-07 | minor | DUPLICATE-HOME | FIX | its V09 end (V09 §2.6 cites V11 §4.2) is the V09 seat's this round |
| VAH-r1-10 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VAH-r1-19 | minor | BROKEN-REFERENCE | FIX per R2-11 |  |
| VAH-r1-21 | major | DISAGREE | FIX |  |
| VAP-r1-05 | major | HANDOFF-OPEN | FIX per R2-08 |  |
| VDC1-11 | major | CONFLICT | FIX per R2-27 (b) |  |
| VPC-R1-01 | minor | CONFLICT | FIX per R2-13 | both ends this round with pipeline's VPC-01 |
| VPC-R1-07 | minor | BROKEN-REFERENCE | FIX per R2-12 |  |
| VPC-R1-14 | minor | BROKEN-REFERENCE | ONE FIX with VAF-R0S-23 |  |
| VPC-R1-15 | minor | WIRING | FIX |  |
| VV12-r1-07 | major | CONFLICT | ONE FIX with VAF-R0S-13 |  |
| VV34-r1-06 | minor | CONFLICT | FIX per R2-28 (b) |  |
| VV78-04 | major | CONFLICT | FIX per R2-14 | recurring from round 0 |
| VV1112-r1-04 | minor | BROKEN-REFERENCE | FIX per R2-10 | the users list as R2-10 gives it |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-26 (d): `raisedWays.structure.stripMarginM` (1 m) in §3.24.2, registry row 80, its lifecycle and register rows.
* R2-28 (a): V11 §3.23.1 states `miningCellShare` and cites §4.2 S1 (10) for the test.
* R2-07: the preamble's file-g range is Assemble's to set in R2-07's form.

### V12

Rulings: R2-05, R2-06, R2-07, R2-08, R2-09, R2-10, R2-15, R2-17, R2-26, R2-28, R2-30, R2-32, R2-35, R2-36, R2-37, R2-38, R2-40, R2-41.

| id | sev | kind | disposition | note |
|---|---|---|---|---|
| VAH-r1-11 | minor | BROKEN-REFERENCE | FIX per R2-10 |  |
| VAP-r1-08 | major | HANDOFF-OPEN | FIX per R2-08 |  |
| VAP-r1-11 | major | DISAGREE | FIX per R2-09 |  |
| VAP-r1-12 | major | DISAGREE | FIX |  |
| G126-V12 | major | F-MISSING | FIX per R2-41, R2-35 (T126-n) | its §3.15.11 as written: no phone viewport in any fixture |
| G121-V12 | major | F-MISSING | NEW DESIGN per R2-35, R2-09 (`item121.display`), R2-36 |  |
| G122-V12 | major | F-MISSING | NEW DESIGN per R2-35, R2-09 (`item122.crises`) |  |
| G123-V12 | major | F-MISSING | NEW DESIGN per R2-35, R2-09 (`item123.damage`) |  |
| G124-V12 | major | F-MISSING | NEW DESIGN per R2-35, R2-09 (`item124.effects`); MOOT in part (R2-41) | (d) without phones |
| G122h-V12 | major | F-MISSING | NEW DESIGN | item 122 (h)–(i)'s four bars stay V12's own (R2-35) |
| G125-V12 | major | F-MISSING | NEW DESIGN per R2-35, R2-09 (`item125.host`) |  |
| VV12-r1-08 | minor | BROKEN-REFERENCE | FIX per R2-15 |  |
| VV34-r1-07 | minor | CONFLICT | FIX per R2-28 (b) |  |
| VV56-r1-07 | minor | WIRING | FIX per R2-09 |  |
| VV1112-r1-02 | minor | BROKEN-REFERENCE | FIX per R2-17 |  |
| VV1112-r1-03 | minor | CONFLICT | FIX per R2-09 |  |

**Receiving ends this round** (other units' issues or rulings that change this unit's text):
* R2-26 (d): §3.11's `raisedWays.structure` line covers `stripMarginM`.
* R2-30: the item-116 statistic reads "the whole bounds, or stop 0 where they do not fit".
* R2-32: T-V12-52 at M5.
* R2-07: l.8's reading guide range is Assemble's to set in R2-07's form.

## Part I — canon changes (appended to canon.md as one dated ruling)

The dated ruling "2026-10-01 (adjudication round 2)" at the end of `docs/validation/coherence/canon.md` records, by
pointer to the rulings above: V07-RESTATE-1 amended (R2-03); E-27's shed case (R2-04); the form of scope's copies of
volume figures and their order (R2-06); owner-item ranges (R2-07); the derivation row DR44 (R2-11, R2-37); "specified"'s
one gloss (R2-14); the under-deck strip's one cell (R2-26 (d)); item 116 at the cap (R2-30); Find at M5 (R2-32); the
`find` key's shape (R2-33); the base bar ids of items 120–126 (R2-35); the placement of items 121–126 (R2-36); item 122's
shared design, the `crises` key added to model §2.9's routing (R2-37); item 123's shared design (R2-38); item 124's arid
rule over a viewer's cover and its session seed (R2-39); item 125's week sentence and `HostContext.customLibrary`'s
retirement (R2-40); the INVALID rulings (R2-01, R2-02, R2-03, R2-39 (c)).
