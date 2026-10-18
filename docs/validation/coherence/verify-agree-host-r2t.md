# Agreement check, round 2 — the dossier and the host (determinism, V08, V09, V10, V11) after assemble-r2

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-host-r2t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] resume check (no output, no LANDED line: fresh start) · [x] brief read whole · [x] inputs (round-1 report and result, adjudication-r2 rulings R2-01–R2-42 and Part H, assemble-r2 hashes = live, file g items 120–126, the canon's dated routings, landed peers' r2t results) · [x] round-1 VAH findings re-checked on live · [x] round-2 diffs of the five members read at every cross-member statement · [x] g 120–126 parts per member · [x] hand-offs of the five repair-r2 preambles checked at their destinations · [x] new issues written · [x] result saved · [x] LANDED

## Scope and method

Members: determinism (base §5–§7), V08, V09, V10 and V11. The live text is assemble-r2's output, checked by sha256: base `4ed292e9…`, V08 `f92c2a85…`, V09 `23398a30…`, V10 `6efb987b…` and V11 `7842179a…`. The pre-round text is git `682e8e9` (base `137ecc0e…`, the text the repairs were written against).

1. **Round-1 findings.** VAH-31 and VAH-r1-01 to VAH-r1-21 were re-checked at every site their required change names, against the ruling that governs each (adjudication-r2 Part H). The twenty round-1 F-MISSING ids (G1xx-<unit>) were re-checked as new design.
2. **Round-2 text.** I built word diffs from pre to live for each member: determinism §5–§7 (41 hunks), V08 (160), V09 (195), V10 (72) and V11 (99). I read every hunk of determinism, V10 and V11 whole. For V08 and V09 I read their item parts whole — V08 §2.2, §2.4 (the field table), §2.5, §3.11, §3.16 (1)–(10), §4.3, §4.4 and §7.1; V09 §4.3, §4.9's lead and new rows, and §4.21.6–§4.21.14 — and screened every other hunk for statements that meet another member.
3. **Cross-member seams.** I checked these seams:
   * §7.7's DR rows against V08's field table, both ways, by script;
   * E-07 against V09 §4.9 and V10 §3.16;
   * the week (R2-40 (1)) in DR42, V08 §3.16 (4), V09 §4.21.7 and V10;
   * Find (R2-33) in §2.9, V08 §3.16 (6), V09 §4.21.10 and V10 §3.9b (7);
   * crisis looks (R2-37) in DR44, V08 §3.16 (7)–(8), V11 §3.25.9, V09 §4.21.12 and V10 §3.9b (8);
   * damage (R2-38) in §6.3, V11 §3.25.10, V09 §4.21.13 and V10 §3.9a;
   * weather (R2-39) in §6.1, V11 §3.25.11 and V09 §4.21.14;
   * what players may see (knowledge admission) on each of these surfaces;
   * the test ids that take R2-35's bars;
   * the milestones of R2-32 and R2-36;
   * the price lines (ROUND-2 NOTES (6)).
4. **Hand-offs.** I checked every HAND-OFF that the five repair-r2 preambles address to a member, or that a member addresses to another unit, at its destination.
5. **Peers.** Findings already raised by landed round-2 peers are not repeated; I concur with them (list below). No design file was touched. doc_checks was not run, since this is an agreement seat; assemble-r2's PROVISIONAL exit 0 stands, because the reference corpus is incomplete in this checkout.

**Severity.** A DISAGREE that changes what the generator or the application does is major. A DISAGREE that only mis-states a reference, a type's shape or a consumer list is minor, as in round 1.

## Result

**11 issues**: 0 blockers, 5 major, 6 minor.
* By owner: V08 5, V10 3, V09 2, determinism 1.
* By kind: DISAGREE 8, MATRIX-GAP 1, HANDOFF-OPEN 1, F-MISSING persisting in part 1 (G125-V08).

All 22 round-1 non-G findings are closed: 21 are fixed, and VAH-r1-09 is closed by R2-10 (decision rows keep their wording). Of the 20 round-1 F-MISSING ids, every part is now written. G125-V08 persists in part, as verify-vol-V07-V08-r2t also found; it is carried under its id. The new issues are agreement gaps that the new design opened between members:
* the condition's knowledge tier;
* a stressor and its condition drawn as two looks;
* the damage comparison and the damage lines' knowledge rule;
* the look read's types and its knowledge fixture.

The others are older gaps on the dossier seam that this round's re-reading found: V08's field table consumer list, the port-epoch undo cell and a wrong tool number.

## Round-1 findings re-checked

| id | owner | verdict | where (live) |
|---|---|---|---|
| VAH-31 | rendering | FIXED (R2-10) | §11.2: `barrier: BarrierKind /* §2.7 */` in the preview's `arcs[]` (l.15899), `MapBrief.walls[].open[]` (l.15959) and `WhyAnswer.closure[]` (l.16017); `RuleAnswer.register` as VV910-02 words it (l.16004–16006); `members.step: LadderStep /* V11 §2.6 */` (l.16020) |
| VAH-r1-01 | V10 | FIXED (R2-33 (c)) | V10 §3.9b (7) l.1975–1978: SettlementForge's assistant sets no Find chip; T-V10-51's host clause; V08 §3.16 (4) l.2412–2415 and (6) (g) l.2483–2485 as R2-33 (c) words them |
| VAH-r1-02 | V08 | FIXED (R2-18 (c)) | V08 §4.3 l.2725–2730; §3.3's absorb bullet l.1544–1545 |
| VAH-r1-03 | V09 | FIXED (R2-22; one fix with VAT-08) | V09 §4.3: T2 shore and coast (l.1687), T3 trace and anchor vertex (l.1690), T4 tunnel chain (l.1700), T6 hood pin (l.1711), T8 decoration instances (l.1715), T9 island key (l.1728), T10 **Re-derive people** (l.1725); §4.18 (l.2849); catalogue `people.rederive` (l.2188); T-V9-12's walker |
| VAH-r1-04 | V09 | FIXED | V09 §4.9 `refuse.undo.creation` and `refuse.undo.dossier` (l.1994–1995) carry `button.moveIt` and `button.notHere`; `otherNameHere` only `[names]` |
| VAH-r1-05 | V09 | FIXED | V09 §2.6 l.607: `placeAt`, T6 `place` |
| VAH-r1-06 | determinism | FIXED (R2-21 (a)) | E-07's head (l.10352–10355): the gates outside a dry run, with no screen gate; V09 §4.9's lead names the same producers (l.1935–1936) |
| VAH-r1-07 | V11 | FIXED | V11 §4.2 l.4827–4828 ("a family the cell does not hold multiplies by 1"); V09 §2.6 l.606 cites it with no value of its own |
| VAH-r1-08 | V09 | FIXED (R2-10) | V09 l.156, 304, 616, 654, 3896, 4532 cite §11.2's types; J-V9.25, J-V9.33 and BCR-V9-6 kept as records |
| VAH-r1-09 | V08 | CLOSED by R2-10 | J-V8.101 is a decision row, kept as a record by R2-10; V08 §3.6 (4)'s live citation reads §11.2's `WhyAnswer.profile` (l.1866) |
| VAH-r1-10 | V11 | FIXED | V11 W44 (l.202), l.491 |
| VAH-r1-11 | V12 | FIXED | V12 l.809, 826, 2947, 3107 |
| VAH-r1-12 | V01 | FIXED | V01 hook rows l.197–198; l.2820 |
| VAH-r1-13 | V02 | FIXED | V02 l.2694; J-V2.51 a record |
| VAH-r1-14 | V03 | FIXED | V03 l.190 |
| VAH-r1-15 | V05 | FIXED | V05 l.196, 1633, 2057 |
| VAH-r1-16 | V07 | FIXED | V07 l.3090 |
| VAH-r1-17 – -20 | V09, V10, V11, V07 | FIXED (R2-11) | DR42, DR43 and DR44 by number everywhere; no "§7.7's calendar row" or "traditions row" is left in the set (the remaining "calendar row" uses name §4.11 *The clock* (3)'s season table, as R2-11 allows) |
| VAH-r1-21 | V11 | FIXED | V11 W85 l.243: `traditions[]` and `customContentRoster.traditions`; `site.culture` from `config.cultureProfileKey`; the deity — DR43 |
| G122-, G123-, G124-, G125-determinism | determinism | PRESENT | DR44 (l.11896); §6.3 *Plan damage* and the `plan.damage` registry row; §6.1 *The weather stream* and `view.weather`; DR1, DR3, DR19, DR29 and DR42 re-sourced, and §7.7 item 1 rewritten. The residues are peers' issues (VDC2-01, -04, -06, -09, -11) and VAH-r2-01 below |
| G122-, G122h-V08 | V08 | PRESENT | V08 §3.16 (7)–(8), §2.4's census and field rows, T-V8-59, T-V8-60. The residues: VV78-r2-09 (disaster source), VAH-r2-01 and VAH-r2-02 below |
| G125-V08 | V08 | PERSISTS IN PART (re-raised) | the fallback column, `field_fallback`, `presentWeek`, the retired inputs, the final check's brief and T-V8-61 are written. `line` can still change a document (§2.4's *Selection*, B19), and the required-key rows read "none" and refuse, against item 125 (b) and (e). This is the same defect as verify-vol-V07-V08-r2t's G125-V08 and VCS-r2-02 |
| G120-, G121-, G122-, G122h-, G123-, G124-, G125-V09 | V09 | PRESENT | V09 §4.21.10–§4.21.14, §4.21.7 and §4.21.6. The residues: VV910-r2-01, -02, -04, -05, -08, -09 (peers) and VAH-r2-04, VAH-r2-08 below |
| G122-, G123-V10 | V10 | PRESENT | V10 §3.9b (8), §3.9a's damage part, rule 21, `LookAnswer.crises`, T-V10-52, T-V10-53. The residues are VAH-r2-05, -06 and -07 below |
| G122-, G122h-, G123-, G124-V11 | V11 | PRESENT | V11 §3.25.9–§3.25.11, §2.8d, registry rows 107–110, T-V11-46 – T-V11-48. The residues are peers' issues (VV1112-r2-01, -02; VV78-r2-10) |

## Issues

### G125-V08 — major · F-MISSING (persists in part) · owner V08

**Claim.** This round-1 id persists in part. The item-125 part is written: the fallback column, `field_fallback`, `presentWeek`, the retired `week`, `realm` and `customLibrary`, the final check's brief and T-V8-61. Two parts still contradict item 125 and R2-40.
1. V08 §2.4's *Selection* (l.684–695) tries `HostContext.line` first. It says that where two registered lines accept one dossier, `line` decides which line's reading builds it (B19). One dossier then makes a different document with and without a host context. That is against item 125 (e) ("the same dossier with and without a host context yields the identical document and hash"), R2-40 (2), §14's `HostContext` and V08's own J-V8.130.
2. The field table's `id`, `population`, `_seed` and version-stamp rows read "none — a required key" (l.627–632), and V08 §3.5 step 3 refuses empty or unreadable values. Item 125 (b) says "a missing or empty field never refuses", and R2-40 (3) says "every field has its standalone fallback, reported".

This is the same defect, under the same id, as verify-vol-V07-V08-r2t's G125-V08; its clause (1) is VCS-r2-02.

**Required change.** As verify-vol-V07-V08-r2t's G125-V08 words it.
* Clause (1), one fix with VCS-r2-02: the dossier's own shape and stamps select the adapter in every case, and `HostContext.line` is checked, never chosen from. B19, T-V8-11 and T-V8-61 (b) follow, and a J-V8 row records the choice.
* Clause (2): fallbacks for `population`, `_seed` and `institutions`, removed from step 3's refusal list. `id` and the version stamps get a J-V8 row recording why an unreadable value is no dossier of the line. T-V8-61 (a) gains an empty `population` and an empty `_seed`.

### VAH-r2-01 — major · MATRIX-GAP · owner determinism

**Claim.** A condition's knowledge tier is a shared subject the matrix missed. Its routed home states nothing, and the volume that states it attributes it to that home.
* The canon's dated routing of item 122 gives determinism "§7.7 (the derivation row: … ; knowledge admission of a condition)" (canon.md l.5595).
* DR44 (base l.11896) says only "knowledge admission at the viewer's effective key (§9.2's admission function, §11.2): a withheld condition is never drawn, listed, counted or named".
* §9.2's admission function `admit(knownTo, key, band)` reads a target's `knownTo`. §9.2 names where each record's `knownTo` comes from, and `ConditionOverlay` (§2.7, l.2424) carries none.
* The one rule that gives a condition its tier is V08 §3.16 (7) (e) (l.2513–2517; J-V8.128): "`public` where its `crisis.map` row gives a look … and `secret` where the row is `none` … a key form listing the overlay's address admits it whatever its tier". V08 words it as "**DR44** admits a condition … at the tier its look gives it", a statement DR44 does not hold.

So DR44's admission has a dangling input. Its readers — V09 §4.21.12 (6), V10 §3.9b (8), §10.2 (a) and §8.2's look rows — cite DR44 for a rule that only V08 writes.

**Verdict.** The two members agree in substance. The home is DR44, by the canon's routing.

**Required change.** DR44's rule cell, after "knowledge admission at the viewer's effective key (§9.2's admission function, §11.2)", adds: "a condition's `knownTo` is `public` where its `map` row gives a look (a camp, a quarantine, smoke and ruins are sights) and `secret` where the row is `none`; a key form listing the overlay's address admits it whatever its tier (V08 §3.16 (7) (e); J-V8.128)". V08 §3.16 (7) (e) then reads as a citation of DR44.

### VAH-r2-02 — major · HANDOFF-OPEN · owner V08

**Claim.** V11's repair handed V08 the rule that "a stressor and the condition it was promoted into draw one look" (repair-r2-V11.md HAND-OFFS, l.169–171). No unit states it.
* V08 §3.11 (l.2050–2064) and V08 §3.5 step 3 (l.1627–1628) put each stressor as its own overlay `cond:stress:<type>`, beside the conditions' own `cond:<id>` overlays.
* V08 §3.16 (7) (b) gives each overlay its own map row.
* V11 §3.25.9 maps both the `under_siege` stressor and the `war_pressure` archetype to `siege` (item 122 (b): "siege (war_pressure with a siege, the siege stressor)"). It also maps `plague_onset` and `plague` both to `quarantine`, and `mass_migration` and `regional_migration_pressure` both to `refugeeCamp`.
* §10.2 *Crisis looks* (a), (d) and (e) and DR44 draw each standing overlay's look. No rule merges two overlays of one crisis.

A settlement under siege that SettlementForge reports both as a stressor and as a condition therefore draws two siege looks. Each has its own camps sized by its own severity, together doubling the camped ground against item 122 (c)'s "the scale follows severity and tier". Two "Siege camps" lines appear on the card, in Find's `crises` section, in the legend and in V10's look read. V08's edge row (l.2632) covers only "a stressor listed twice is one overlay".

**Required change.** V08 §3.16 (7) (b) adds the pairing rule:
* State how the digest recognises a stressor and the condition SettlementForge promoted it into: the condition whose archetype is the stressor's type, or whose `triggeredAt` names the stressor, as SF0's census confirms.
* While both stand, the pair draws ONE look — the condition's, with its name, weeks and forces. The stressor's overlay draws none, and the stressor's look resumes if the condition ends while the stressor is still listed.

DR44's source clause cites the rule; V08 §3.17's crisis row adds the edge; T-V8-59 gains a stressor-and-condition pair that draws one siege.

### VAH-r2-03 — minor · DISAGREE · owner V08

**Claim.** V08's lifecycle row for `CircumstanceSlice.port` (V08 §2.7, l.1284) gives its undo cell as "an epoch that carries dossier events is no undo target (§7.4)". The cited home says more. §7.4 *Replay semantics* and E-07's row (base l.10376) cover "an `undo`, `redo` or `revert` naming an event of the port's session `host:port` — a dossier event, a `dossierFacts` or `dossierRecord`, or a port epoch, **whether or not it carried a dossier change**". R2-19 rules that every restating sentence cites §7.4 *Replay semantics*.

The port slice rides every cadence epoch, including those that carry only `port-values`. V08's cell implies those epochs are undo targets, against §7.4.

**Required change.** V08 l.1284's undo cell reads: "no event of the port's session `host:port` — a port epoch with or without dossier events among them — is an undo, redo or revert target (§7.4 *Replay semantics*)".

### VAH-r2-04 — minor · DISAGREE · owner V09

**Claim.** V09 §4.21.13 (1) (l.3616–3617) states item 123's comparison as "R2-38's one comparison — an element shows damaged when the level is at or above its threshold". Its home, §6.3 *Plan damage* (base l.9798), reads "the element shows damaged exactly while the level is above 0 and at least t — a level of 0 damages nothing, so a building never decayed draws its plan unchanged (`item123.damage`) whatever its kinds' ranges". V11 §3.25.10 says the same, and V11's `DamageElementRow.range` admits `lo` = 0.

With a range edited to `lo` = 0, V09's plan panel would show damage lines for a never-decayed building whose plan §6.3 draws unchanged. That breaks V09's own row 92 ("a building never decayed … no line") and T-V9-86. This is the same class as VDC2-07, VDC2-08 and VRC2T-13 at the other readers.

**Required change.** V09 §4.21.13 (1): "… by §6.3's one comparison — an element shows damaged while the level is above 0 and at least its threshold (§6.3 *Plan damage*) — …".

### VAH-r2-05 — minor · DISAGREE · owner V10

**Claim.** V10 §3.9a's *A ruined plan's damage* (l.1805–1808) states the comparison as "each plan element shown damaged once the building's decay level … reaches the element's one keyed threshold … the one comparison every reader makes". The home is §6.3's "above 0 and at least t". At `lo` = 0, "reaches" damages an element at level 0, against V10's own row 35 and T-V10-53 ("a building never decayed … no damage row"). This is the same class as VAH-r2-04.

**Required change.** V10 l.1807: "… is above 0 and reaches the element's one keyed threshold (§6.3 *Plan damage*'s comparison) …".

### VAH-r2-06 — minor · DISAGREE · owner V10

**Claim.** V10's `LookAnswer` types two of §2.9's view keys in a shape §2.9 does not give them, while its comments say they are those keys.
* `display: 'follow'|'off'|{ preview: string } /* §2.9's festival display (item 118) */` (l.1000).
* `crises.display: 'follow'|'off'|{ preview: CrisisLookKind /* §10.2 */ } /* §2.9's crisis display crises (item 122 (e)) */` (l.1002), new this round.

§2.9 (base l.3343, l.3349) declares `festival: { mode: 'follow'|'off'|'preview'; id?: string }` and `crises: { mode: 'follow'|'off'|'preview'; look?: string }`. V09 §4.21.8 (2) and §4.21.12 (1)–(2) write those shapes. The harness fills `LookAnswer` "from `ClerkMount.view`" (V10 l.288) with no mapping between the two shapes stated anywhere. The festival display predates this round; the crisis display repeats the pattern.

**Required change.** V10 l.1000 reads `display: { mode: 'follow'|'off'|'preview'; id?: string } /* §2.9's festival display (item 118), as stored */`. l.1002 reads `display: { mode: 'follow'|'off'|'preview'; look?: CrisisLookKind /* §10.2 */ } /* §2.9's crisis display crises (item 122 (e)), as stored */`. Alternatively, V10 states the projection from §2.9's shape to its own in the comments.

### VAH-r2-07 — major · DISAGREE · owner V10

**Claim.** T-V10-52 (l.3094) cannot be built against V08's tier rule. Its fixture carries "a plague condition withheld at `public`" and asserts "the withheld plague absent at `public` from every read, request, reply, card and transcript". Under V08 §3.16 (7) (e) (J-V8.128) and T-V8-59 (l.3226), "a condition whose row gives a look is admitted at `public` and one whose row is `none` only at `secret`". `plague` maps to `quarantine` (V11 §3.25.9), so a plague condition is `public` at every key. No mechanism in the set withholds a look-bearing condition, so the fixture asserts something the design forbids.

V10's edge rows (row 34: "a condition the key withholds") and V09's T-V9-85 clause ("under a player view a withheld condition is never drawn, listed, named or counted", on a fixture of siege, refugees and plague) presuppose the same thing. They are vacuous rather than contradictory.

**Required change.** T-V10-52's knowledge clause reads as follows. "At `public` every look-bearing condition — the siege, the refugee wave and the plague — is listed with its name and weeks (V08 §3.16 (7) (e)). A `none`-row condition carried beside them (an `infiltrated` stressor) is named in no read, request, reply, card or transcript at `public`, and only at `secret`." The fixture loses "a plague condition withheld at `public`". V10 §3.23 row 34's "a condition the key withholds" reads "a `none`-row condition, admitted only at `secret`".

### VAH-r2-08 — major · DISAGREE · owner V09

**Claim.** The two members disagree on what a player's view may read in a ruined building's damage lines.
* V10 §3.9a (l.1832–1836) rules that "on a building the key withholds, the rows that name rooms — `roofBay`, `floor`, `partition`, `furniture`, `unsafe` — are `purpose: true` and leave with its purpose (§11.2's withheld rule), while its state, level, storeys and the other rows' counts stay", and that "the `crypt` row is `purpose: true`, as every crypt row is".
* V09 §4.21.13 (1) (l.3612–3626) gives the plan panel's damage lines — "derived from V03's damage layer at V06's `decayLevel`" (V09 §2.12) — "the rooms named in plan order". It states no knowledge rule, though V09 §4.21.13 (4) promises "one sentence everywhere … from the same reading" as V10's.

Under View as a party key, V09's plan panel therefore names the rooms of a withheld building that V10's clerk withholds. V09's own lines carry the room slot: `roofBay` "Roof fallen in over {rooms}", `floor`, `partition`, `furniture`, `unsafe` (l.2186). V09 §3.16 row 92 and T-V9-86 test no key.

**Required change.** V09 §4.21.13 (1) adds: "Every line reads at `effectiveKey()` (V09 §2.10). On a building the key withholds, the lines that name rooms — `roofBay`, `floor`, `partition`, `furniture`, `unsafe` — and the `crypt` line are not drawn (purpose withheld; §11.2's withheld rule; V10 §3.9a). The head line, `storeyGone`, `outerWall`, `door`, `window`, `stair` and `cellar` stay — a ruin is seen by everyone — and a room the key does not admit is never named (V03 §5.4)." V09 §3.16 row 92 adds the edge "a building the key withholds" with that outcome. T-V9-86 adds the clause under View as on a withheld ruined building.

### VAH-r2-09 — minor · DISAGREE · owner V08

**Claim.** V08 §2.4's field table is "the one list" of what each dossier path feeds. It names fewer derivation rows than the rows' own input cells in §7.7 (base l.11853–11896), so the dossier trace (item 20 (h); principle (7)) disagrees between the two members. Comparing each DR row's input cell with the field table's *feeds* column by script found these omissions:

| field-table row | omits |
|---|---|
| `config.cultureProfileKey` → `site.culture` (l.638) | DR1, DR41 (the patch rows admitted) and DR43 (the festivals' colours and motifs, which V08 §3.16 (5) itself states and V11 W85 traces to this path) |
| `config.terrainType` → `site.terrain` (l.633) | DR34 (`riverside`, `desert`, `hills`, `mountain` through the `site` row) and DR40 (an arid site) |
| `economicState.prosperity` → `wealth.label` (l.643) | DR9 |
| `config.magicLevel` → `site.magic` (l.637) | DR27 |
| `config.nearbyResources*` → `site.deposits` (l.639) | DR27 (a `magical_node`) and DR34 (the `hot_springs` deposits) |

Three cells name DR rows by alias, not by number, against R2-11's rule:
* `defenseProfile.readiness` (l.664): "item 114's generation-time condition row";
* `economicState.prosperity` (l.643): "item 114's means";
* `traditions[]` (l.665): "item 118's traditions row".

Most of this predates round 2, from the rounds that added DR34, DR40, DR41 and DR43.

**Required change.** In V08 §2.4's field table:
* the `config.cultureProfileKey` row's *feeds* adds "DR1, DR41 (the patch rows), DR43 (the decorations' colours and motifs)";
* `config.terrainType` adds "DR34, DR40";
* `economicState.prosperity` adds "DR9" and reads "DR41's MEANS" for "item 114's means";
* `config.magicLevel` adds "DR27";
* `config.nearbyResources*` adds "DR27 (`magical_node`), DR34 (`hot_springs`)";
* `defenseProfile.readiness` reads "DR41 (item 114's generation-time condition) and V06's need";
* `traditions[]` reads "DR43 (V08 §3.16 (5))".

### VAH-r2-10 — minor · DISAGREE · owner V08

**Claim.** V08 names the wrong home tool for `adjust`. V08 §3.5's latitude paragraph (l.1712: "A DM who wants another latitude sets it by T7 `adjust` (§7.1)") and T-V8-22 (l.3189: "T7 `adjust` sets it as a map edit") give `adjust` to T7. §7.1's binding (E-04) homes `adjust` on T1 `intend` (base l.10464; V09 §4.3 l.1686), and T7 is `roster` (base l.10470). A scan of the five members finds no other mismatched tool number. J-V8.34 (l.3395) carries the same words as a decision record. This predates round 2.

**Required change.** V08 l.1712 and T-V8-22 read "T1 `intend`'s `adjust`". J-V8.34 keeps its wording as a record.

## Owner items 120–126 per member

| item | determinism | V08 | V09 | V10 | V11 |
|---|---|---|---|---|---|
| 120 (Find) | not named | PRESENT (§3.16 (6); T-V8-58 takes T120-2's dossier clause; M-SF/M5) | PRESENT (§4.21.10; `live.find`; Show gaps; T-V9-83 takes T120-2 – T120-5; AP11 at M5) | PRESENT (§3.9b (7); T-V10-51 takes T120-2's clerk clause and the host clause) | PRESENT (§2.3's lexicon) |
| 121 (resolution) | not named | not named | PRESENT (§4.21.11; `AppPrefs.resolution`; T-V9-84 takes T121-1, -4, -7; M4) | not named | not named |
| 122 (crisis looks) | PRESENT (DR44) — VAH-r2-01 | PRESENT (§3.16 (7); census; T-V8-59 takes T122-4's census clause) — VAH-r2-02 | PRESENT (§4.21.12; `crises`; T-V9-85 takes T122-2) | PRESENT (§3.9b (8); `LookAnswer.crises`; T-V10-52) — VAH-r2-06, -07 | PRESENT (§3.25.9; rows 107–108; T-V11-46 takes T122-4) |
| 122 (h)–(i) | not named | PRESENT (§3.16 (8); T-V8-60) | PRESENT (§4.21.12 (5), (8); §4.21.6) | not named | PRESENT (`CrisisLookSettings` cells) |
| 123 (damage) | PRESENT (§6.3 *Plan damage*; `plan.damage`; §6.5 (9) T123-3) | not named | PRESENT (§4.21.13; T-V9-86) — VAH-r2-04, -08 | PRESENT (§3.9a; T-V10-53) — VAH-r2-05 | PRESENT (§3.25.10; rows 109–110; T-V11-47) |
| 124 (weather) | PRESENT (§6.1 *The weather stream*; `view.weather`; §6.5 (9) T124-9) | not named | PRESENT (§4.21.14; T-V9-87 takes T124-5) | not named | PRESENT (§3.25.11; T-V11-48 takes T124-3, -4) |
| 125 (the one input) | PRESENT (DR1, DR3, DR19, DR29, DR42; §7.7 item 1) | PRESENT IN PART (G125-V08) | PRESENT (§4.21.7 (2), (5); row 94) | the week's sentence (V10 l.384) | the week and climate rows cite DR42 |
| 126 (no phone) | none left | PRESENT (§3.16 (10); T-V8-62 takes T126-2's host-frame clause) | PRESENT (§4.12, two classes; T-V9-22 takes T126-1's tablet half, T126-2, T126-3; no `refuse.phone`) | no phone clause | no phone clause |

**Agreeing across the members.**
* **The week (R2-40 (1)).** DR42, V08 §3.16 (4) and its `presentWeek` row, V09 §4.21.7 (2) and (5), V10 l.384 and §2.9 all say the same: the latest stamped tick, else the season control at midsummer (week 19). The one disagreement — a host's `view.set { week }` in V09 against V08's T-V8-54 and §2.9 — is VV910-r2-02.
* **The crisis window (R2-37 (1)).** DR44, V09 §4.21.12 (3), V10 §3.9b (8) and V08 §3.11 all read §2.9's `week` in [`sinceWeek`, `untilWeek`), never the year position.
* **Find's chips (R2-33 (a)).** V09 §4.21.10 (1), V10's `find` action and V08 §3.16 (6) (e) all follow §2.9's `FindChip`. They stay per viewer: none crosses a bridge, and no host message sets one.
* **Every bar of R2-35.** Each bar R2-35 gives to determinism, V08, V09, V10 or V11 is taken by a named test, as listed in the table.
* **Phone clauses.** No phone layout, screen, notice, catalogue row or default remains in any member (R2-41).
* **Milestones.** The member parts land at R2-36's and R2-32's milestones.
* **Prices.** V08 §8 is 18.5–25.25 pw, V09 23.75–34.75, V10 14.75–20.25 (15.25–20.75 with the command-line clerk) and V11 13.6–19.1. Each equals INDEX's price column. §16's M3c and staged-content rows read V10's and V11's figures. V10's C3/C4 placement is VV910-r2-07.

## Hand-offs checked at their destinations

* **determinism → V08.** Closed: `PortValues.latitudeDeg` and `site.climate` retired; "DR1–DR44"; the forced course without the realm cell; "north first" gone; the decision rows are marked "amended by item 125".
* **V08 → V11.** The census lists are open: V11 names them `sf.stressors@<line>` and `sf.conditionArchetypes@<line>` and checks no `events` list (VV78-r2-10). The climate-word synonyms are retired: closed.
* **V08 → V09.** The crisis card reads the carried `name` and `forces`: closed (V09 §4.21.12 (4)–(5)).
* **V09 → V11.** Start a shower now in a week with no live kind is open: VDC2-04, VDC2-05 and VV910-r2-01.
* **V10 → V09.**
  * The catalogue rows `crisis.look.<kind>`, `info.crisis.*` and `info.damage.*` exist (V09 l.2183–2186): closed.
  * The disaster's districts in the look evaluation are open (VV910-r2-04).
* **V11 → determinism.** §6.3's "by material" (VDC2-06), DR44's regional_* clause (VDC2-09) and §6.1 citing V11's sites and hours (VDC2-01) are open: peers' issues.
* **V11 → V08.**
  * "A carried calamity's crisis overlay reads the `event` row `calamity`" is open (VV78-r2-09).
  * "A stressor and the condition it was promoted into draw one look" is open: **VAH-r2-02**.
* **V11 → V09.** The look labels are open (VV1112-r2-14). The `snow` offer follows R2-39 (b): closed (V09 §4.21.14 (5), §4.21.7 (3)).
* **V06 → V10.** `decayLevel`, `decayPeak` and the crisis hand-over are closed at V10 §3.9a and §3.9b (8).

## Concurred, not re-raised (landed peers' ids)

* **VV910-r2-02** (V09). A host's `view.set { week }` moves V09's Season control and turns its follow switch off, while V08's T-V8-54 and §2.9 move the drawn `week` only. This is the V08–V09 disagreement in this seat's scope.
* **VDC2-04, VDC2-05, VV910-r2-01** (determinism, V09). Start a shower now in a week with no live kind: V09's "dust haze" against V11's "starts none".
* **VDC2-01** (determinism). The weather stream's dependence on V11's site factors and hours, and its rate after a change of week or site.
* **VDC2-06** (determinism). §6.3's "range by material" against V11's ranges by element kind.
* **VDC2-09 / VPC-R2-01 / VPC-R2-02 / VV56-r2-08**. "The regional_* pressures `none`" against V11's `regional_migration_pressure` → `refugeeCamp` and item 122 (b).
* **VV78-r2-09 / VPC-R2-03** (V08). No dossier condition reaches the `disaster` row: V08 never carries `event` `calamity`.
* **VV78-r2-10** (V11). The census list names and the unchecked `events` list.
* **VCS-r2-02** (V08). `line` changing a document. It is G125-V08's clause (1).
* **VM-R2T-07** (V10). `FindView = ViewState['find']` names nothing.
* **VV910-r2-03** (V10). The address chip's four target kinds.
* **VV910-r2-04, -05, -08, -09** (V09). The disaster's units in V09, the why card's `plan` section under a look, the crisis card's **Ask the assistant** entry, and Find at a scrubbed week.
* **VV1112-r2-01, -02, -14** (V11, V09). The weather `hours`, the missing `occupation` archetype row, and the look labels' two homes.
* **VV1112-r2-10, -11** (V08). V08's pin registrations, and the crisis, force and required-keys fixtures that V12 names.
* **VDC2-11 – VDC2-15** (determinism, rendering, pipeline, V06, V07). Bearings and the realm block's retired inputs at their other readers.
* **VDC2-16, VDC2-17, VKr2-04** (determinism, V09). The `addUndergroundAccess` refusal's E-07 row and V09 catalogue row.
* **VM-R2T-09, VV78-r2-11** (V09, V08). Ruling ids cited in design text.

## Coverage

All five members and their ten pairs were covered. Every round-1 finding was re-checked, and so was every round-1 F-MISSING id. Every round-2 hunk of determinism, V10 and V11 was read. V08's and V09's item parts were read whole, and their other hunks were screened for cross-member statements. The DR rows' inputs were compared with V08's field table by script in both directions; the reverse direction found only prose-level false positives. Every hand-off in the five repair-r2 preambles was checked at its destination, as were the R2-35 test ids, the R2-36 milestones and the price lines. Units outside this seat's members appear only where a member's statement meets them.
