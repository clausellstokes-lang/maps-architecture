# Seam check — settlements (V07 village, V08 SettlementForge stage, V11 content tables), reconciliation round 6

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-settlements-r6; covered by the whole-design retrovalidation (J84).

> PROGRESS
> - §0 Inputs and method | done
> - §1 Round 5's issues re-checked (SR5-01..15) | done
> - §2 Residues found while re-checking | done
> - §3 Sweep of the whole seam (new findings SR6-nn) | done
> - §4 Census: every dossier kind at every size lands in a class row | done
> - §5 Summary table and hand-off | done

## 0 Inputs and method

**Inputs** (md5 at the start, 14:27, re-checked before §1 and before §3; the base unchanged since round 0):

| file | md5 | lines | state |
|---|---|---|---|
| `docs/volumes/V07-village.md` | 215e9cae… | 4 530 | after reconcile-V07-r6 (LANDED 14:05; its shared-file edit of V06 included) |
| `docs/volumes/V08-settlementforge.md` | e41d8fb7… | 3 856 | after reconcile-V08-r6 (LANDED 14:12) |
| `docs/volumes/V11-content.md` | 08477df8… | 5 406 | after reconcile-V11-r6 (LANDED 14:25) |
| `docs/volumes/_integrate.md` | 965ab696… | 468 | unchanged since round 4 |
| `docs/AMENDMENTS-2026-09-28f.md` | 839ccce5… | 1 806 | after reconcile-BASE-F-r6 (LANDED 14:03) |
| `docs/ARCHITECTURE.md` | 01fea21f… | 17 297 | unchanged |
| `docs/volumes/V06-evolution.md` | 412a7418… | 4 622 | after reconcile-V06-r6 (LANDED 13:59), read for SR5-04 and the ladder step |
| `docs/volumes/V09-application.md` | 9cdc1965… | 4 913 | after reconcile-V09-r6 (LANDED 14:27), read for the roster reader and BCR-V9-8 |
| `docs/volumes/critique/seam-settlements-r5.md` | 97257222… | 470 | round 5, re-checked issue by issue (§1) |

**How the seam was read** (J-SR6.1, as J-SR5.1). Round 5's inputs are kept md5-equal in scratch
(`scratchpad/volumes/ssr5/*-in.md`: V07 75393e28…, V08 8be737e0…, V11 08213668…, file f e4c1756e…, `_integrate`
965ab696…), and V06's state at round 5 is reconcile-V07-r6's pre-round copy (`scratchpad/volumes/rcV7r6/V06-pre-r6.md`,
c63ae4ae…). The diffs from those copies to the live files were read whole as word diffs (`git diff --no-index
--word-diff=plain --unified=0`; scratch `scratchpad/volumes/ssr6/wV07.txt` 388 lines, `wV08.txt` 168, `wV11.txt` 514,
`wf.txt` 117, `wV06.txt` 212; `_integrate.md` unchanged). Then every section those diffs touch was re-read whole in the
live text with the unchanged passages it now meets: V07 §1's dependencies (10)–(13), §2.4's class table with the new
*label · synonyms* column and its ladder table, §3.10 whole, §3.11 whole, §3.12 whole (the siting override, *Markets,
halls and the fair over epochs*, *Records at a village epoch*, *Pins over epochs*, both hand-offs, items 105–108 over
epochs), W18, W25, W70–W73, T-V7-13, T-V7-56, T-V7-57, J-V7.125–J-V7.133 and BCR-V7-18; V08 §1b's ladder and `PortNote`
rows, §2.3's binding-row life, §3.5's receipt row, §3.5.1 whole, §3.6 (5), §4.6's `unmapped_kind`, `ladder_promoted` and
`custom_resolved` rows, T-V8-44, T-V8-46, J-V8.111–J-V8.115, §12's round-6 paragraph and §13's X22–X25; V11 §2.3's
*The display cells*, §2.1's settings form, §3.1's *Display cells* and rows 17–19, 33, 52, 61, 79, 80, 87, §3.2.1 steps
5–6, §3.4's *Display words*, §3.5.1's `commonness` rule, §3.5.15 whole, §3.11's `@pin` sentence and the kinds rows of every
ladder lesser, §3.12 whole, §3.13.2's `mercantile-market` cell, §3.13.3, T-V11-3, T-V11-4, J-V11.93–J-V11.96, X-V11-17 and
§12; V06 §3.9.11's REPLACEMENT row, W44, row 12, T-V6-45, J-V6.125, X47 and its round-6 note; file f items 202, 317, 516
and the round-6 note. Outside these, read for what the seam's new text cites: V09 §2.9 (`MsgRef`, the argument forms),
§4.9's `refuse.roster.dossier` row and §4.16 (the roster reader, whole); the base's §8.3 (the symbol catalogue, "one
registry glyph, from which the legend is generated") and §9.5's legend. The round-6 checks of the neighbouring seams,
started at the same minute, were read at this lane's close so that no finding here repeats one there (§4's preamble).

**Scripts** (scratch `scratchpad/volumes/ssr6/`): round 5's `census.py` re-pointed at the live V11 (`census.out`) and
`census_all.py`; `words.py`, which parses V11 §3.5.15 and V07 §2.4's *label · synonyms* column and checks coverage,
uniqueness per namespace and the words the two namespaces share; the scan of every `` `v.` `` id in the twelve volumes,
`_integrate.md` and file f; the BCR-V7, BCR-V8 and BCR-V11 heading ids against file f by exact-id match; the `@pin:` kinds
in the three volumes; and greps named with each finding.

**Severity** as in rounds 0–5: a blocker means the subject cannot be built as written; a major is a contradiction or an
unwired piece a builder would hit; a minor is wording, a pointer, a restated value or a stale record. Each finding names
ONE owning volume (V01…V12, or BASE-F for file f) and an exact required change; a companion change in another volume is
its own finding. Ids are **SR6-nn**; the surfaces seam may number its findings SR6-nn too, so a reconcile lane cites these
as "SR6-nn (settlements)".

## 1 Round 5's issues re-checked — every one, now

Round 5 raised 15 issues (0 blockers, 3 majors, 12 minors). Their owning lanes report all of them fixed:
reconcile-V07-r6 (SR5-02, -05, -10, -12, -13, -14), reconcile-V08-r6 (SR5-01, -06, -07, -08), reconcile-V11-r6 (SR5-03, -09,
-11; its ledger also lists an "SR5-08" of this seam, which is in fact seam-surfaces-r5's row-87 issue, SR6-09 (c)),
reconcile-V06-r6 (SR5-04) and reconcile-BASE-F-r6 (SR5-15). Each was re-checked against the live
text. **Result: 15 of 15 FIXED as round 5 required; none reopened.** Four fixes leave a residue, raised in §3 as new
findings (residue column). Two of the residues come from round 5's own wording, which V08's lane refined after the V07
and V06 lanes had closed: SR5-01's fixture sentence ("binds the record's key to one churchyard `cross`") and SR5-04's
test ("a greater of another template family than the lesser's building"). V08 replaced both with sharper rules (J-V8.113,
J-V8.114), so V07's and V06's texts, written to round 5's words, now disagree with V08 (SR6-01, SR6-02).

| id | owner | status | evidence (live text) | residue |
|---|---|---|---|---|
| SR5-01 | V08 | FIXED (with two vetoable refinements) | §3.5.1 (c) *A pair that meets over time* (l. 1656–1685): three cases — the greater's thing is the lesser's (every COUNT, QUARTER, GUILD and SIZE step; `graveyard`/`burial_ground`, `wizard_s_tower`/`hedge_wizard`, `mages_guild`/`wizard_s_tower`, `professional_city_watch`/`town_watch`, and `cathedral_10_000_only`/`parish_church` beyond round 5's list), a `@none` or `@office` lesser, and every other REPLACEMENT greater placed new with the lesser's key bound as at a first reading; (c)'s pin-lesser branch names "VS8 at generation, `village.records` at an epoch or an absorb" (l. 1650–1651); (d) (l. 1692–1705): a receipt keeps ONE key (F15), re-pointed to the greater placed new, and the churchyard `cross` laid for the record with no binding row (J-V8.114); the receipt row (l. 1567); T-V8-44, T-V8-46's five over-time clauses (l. 2652, 2654); J-V8.111 amended, J-V8.113, J-V8.114 | J-V8.114's one-key receipt reading contradicts V07's item 4, §3.10, §3.11 and T-V7-13 (X23; SR6-01) and V06's T-V6-45; J-V8.113's per-reading test contradicts V6 §3.9.11's template-family test (X24; SR6-02) |
| SR5-02 | V07 | FIXED as round 5 worded it | §3.12 *Records at a village epoch* item 4 (l. 2549–2561); the call "adds **or re-keys to a REPLACEMENT greater**" (l. 2538) and the absorb path; §3.10's last sentence (l. 2172–2173); §3.11's upgrade exception (l. 2407–2408) and the `town_walls` key (l. 2415–2416); §2.4's shrine, palisade and new *Fishmonger → Fish market* rows (l. 1149, 1156–1157); W25, W70; T-V7-13's two promotion clauses; J-V7.131 | written before V08's J-V8.114 landed: every arrival, a receipt included, binds the lesser's key (SR6-01) |
| SR5-03 | V11 | FIXED (one vetoable deviation) | §2.3 *The display cells* (l. 488–512): `label`, `icon?`, `synonyms`, `commonness`, each `own`, `calibratable: false`, read by no model stage; §3.5.15 (l. 1670–1862): label and synonyms for all 181 authored town-and-city rows and V05's two sky rows (script: 0 missing, 0 extra, labels unique, one shared synonym `mill`); §3.5.1's `commonness` rule (l. 1335–1344); the family, goods, district-kind and style-sheet labels; T-V11-4 (l. 4139); rows 17–19, 33, 52; J-V11.93–J-V11.95. Deviation: a generic class's label is its family's `label` cell, not `trade.noun` (J-V11.95); the mechanism round 5 asked for is kept | commonness has two meanings across the namespaces and the reader compares them (SR6-03, SR6-09); the `v.` rows' commonness is written by a script where V11's lifecycle says the compile recomputes it (SR6-08, SR6-09) |
| SR5-04 | V06 | FIXED as round 5 worded it | V6 §3.9.11's REPLACEMENT row (l. 1927), W44 (l. 451), T-V6-45 (l. 3357), J-V6.125 (l. 3637), X47 (l. 4239) | round 5's own test words ("another template family") and fixture words (the promoted record's key on the cross) now contradict V08 (SR6-02) |
| SR5-05 | V07 | FIXED | §3.12 (b) and (c): "at an epoch its Works scheduled by V6 §3.13; on an absorb without an epoch it stands finished in the absorb's commit, as V08 §3.6 (6) applies an element event" (l. 2497–2498, 2517–2518); W73; T-V7-13's absorb clause ("the hall standing finished, with no Works") | — |
| SR5-06 | V08 | FIXED | §3.6 (5) (l. 1787–1789): "… — at a rung of a product that declares a records placement, that placement first, V6 §2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*; seam-settlements-r5 SR5-06)" | — |
| SR5-07 | V08 | FIXED | §4.6's `unmapped_kind` (l. 2374): the `label` cell of the class built at the document's rung, the tag fallback's `market` entry naming V11's `market` class, a pin kind's word "in the legend's symbol key (§9.5, generated from the registry, O12 d)"; `custom_resolved` (l. 2396); §1b's two `PortNote` rows; T-V8-46; J-V8.115 | the symbol key's words have no producer anywhere (round 5's PLAUSIBLE, now read absent; SR6-06); the templates' "a {class}" meets vowel-initial labels (SR6-07) |
| SR5-08 | V08 | FIXED | X22 **CLOSED** (l. 3458) with its four citations; §12's sentence CONFIRMED, dated (l. 3343–3350) | V08's new X25 is itself stale now (SR6-05) |
| SR5-09 | V11 | FIXED | (a) §12's round-5 clause CONFIRMED (l. 4995–4998); (b) row 61's gloss names `village.pins` (VS8), `village.records` (S10b) and step (m) (EVO_SITING) (l. 923) | — |
| SR5-10 | V07 | FIXED | §2.4's *label · synonyms* column for the 25 `v.` rows (l. 920–960; script: 25 rows, labels unique, no synonym equal to a label, shared synonyms `cot` and `mill`); the commonness rule; W18; T-V7-56's clause (l. 3357); J-V7.133 | the commonness cell's producer (a V-M2 script) differs from V11's compile (SR6-08) |
| SR5-11 | V11 | FIXED | (a) §3.13.2's `mercantile-market` cell "placed with its stalls by V07 §3.10's pin-record rule" (l. 2832); (b) §3.12's `parish_church` row names the rule's three moments and V08's one-key receipt reading (l. 2669); §3.11's `@pin` sentence by the same class (l. 2335–2339) | — |
| SR5-12 | V07 | FIXED | `village.pins` step 3's `Roadside Shrine` quarter (l. 2605–2610); W72; T-V7-57's clause | — |
| SR5-13 | V07 | FIXED | §3.12 (c)'s last rung "reported as the base's F-SITING with the rows it fails (§5.2; J-A20.71; SR5-13)" (l. 2521–2522); `W_CLAIM_CLOSEST` survives only in the round notes as history (l. 4460, 4508) | — |
| SR5-14 | V07 | FIXED | "It removes no pin whose host stands, save step 2's stalls (the surplus as households fall, and a closed market's; SR5-14)" (l. 2611–2612); T-V7-57's exception | — |
| SR5-15 | BASE-F | FIXED | (a) item 202's *The records hook* (l. 63) names §7.7's *One path* sentence as the absorb-path call's target, item 2 staying the removal's pointer, item 317's note pointing to it (l. 358; J-RF6.1); (b) item 516's *Needed by* "V07, V08, V09, V10, V11" (l. 892) | — |

## 2 Residues found while re-checking

Each residue in §1's last column is raised once in §3 and is not repeated here:
* **The promoted record's one key** (from SR5-01, SR5-02, SR5-04). V08's J-V8.114 landed a minute after V07's lane
  closed, and V11's `parish_church` row follows V08. V07's item 4, §3.10, §3.11, §2.4 and T-V7-13, and V06's T-V6-45,
  still bind the lesser's key after a receipt → **SR6-01** (V07), **SR6-02** (c) (V06).
* **The placed-new test** (from SR5-04). V06 names V08's exception by template family, which is round 5's wording, and
  V08 now uses V11's per-row reading → **SR6-02** (V06). V06's militia sentence was read by round 5 and missed; it is
  raised in the same finding.
* **The display cells' meeting points** (from SR5-03, SR5-10). The two namespaces share 45 words and two meanings of
  `commonness`, and the roster reader is namespace-blind → **SR6-03** (V09). The `v.` rows' `commonness` has two
  producers → **SR6-08** (V07) and **SR6-09** (a), (b) (V11).
* **The note's words** (from SR5-07). The pin kinds' symbol-key words have no producer → **SR6-06** (V08). The templates'
  article meets vowel-initial labels → **SR6-07** (V08).
* **Stale records** written while sibling lanes were live → **SR6-04** (V07), **SR6-05** (V08) and **SR6-09** (c) (V11,
  a citation of the other seam's SR5-08).

## 3 Sweep findings

**Beside the neighbouring seams.** All six round-6 seam checks started at 14:27, after every reconcile-r6 lane had
landed (V09's last, at 14:27). This round owns the ladders' meeting, the village hand-off and the class rows that a
dossier kind lands in. Where one of its findings touches a surface (the roster reader, SR6-03) or the evolution engine
(V6 §3.9.11, SR6-02), the finding is raised here because the defect sits where V07's, V08's or V11's rows meet that
surface. §5 records what the surfaces seam's file held at this lane's close.

Each finding gives its **id** · severity · kind · **owner**, then the claim with its evidence, then the exact required
change. Majors come first.

### Majors

**SR6-01** · major · contradiction at the ladders' meeting (what a promoted record's key binds) · **V07** — V08 §3.5.1
(d) landed at 14:12, after reconcile-V07-r6 closed at 14:05 (V08 §13 X23). It reads a `promotedFrom` receipt as keeping
ONE key (F15): "the greater is placed new as that case places it, under the record's key …, and the record's binding row
is re-pointed from the lesser's former thing to it (a `rebind`); one key binds one thing (J-V8.111), so the former thing
is left standing, unbound … and a pin the row keeps (the churchyard `cross` of `parish_church` over `wayside_shrine`, at a
village rung) is laid in that batch by V07 §3.10's pin-record rule for the record, keyed by its binding key and its
provenance the record, with no binding row of its own" (V08 l. 1692–1705; J-V8.114). V11 §3.12's `parish_church` row,
landed at 14:25, reads the same: "a promotion by receipt re-points the one key to the church placed new and lays the
cross for the record unbound" (V11 l. 2669). V07 binds the lesser's key on every arrival, a receipt included:
* §3.12 *Records at a village epoch* item 4 (l. 2549–2561), whose first arrival is "brought by a promotion receipt":
  "then the lesser's churchyard `cross` by §3.10's pin-record rule, the shrine record's key binding it (V08 §3.5.1 (c))",
  and "the fishmonger's key an alias on the hall (V08 §3.5.1 (d))";
* §3.10 (l. 2169–2173): the merged shrine's cross "… and the shrine record binds it", the rule running "for a pin-record
  lesser whose REPLACEMENT greater arrives";
* §3.11's palisade REPLACEMENT (l. 2415–2416): "The `town_walls` record's key binds the rebuilt enceinte, else the new
  ring, with the palisade's key as its alias";
* §2.4's ladder table: the shrine row ("the shrine record binds the churchyard `cross` pin"), the palisade row ("with the
  palisade's key as its alias") and the fish-market row ("the fishmonger's key its alias (V08 §3.5.1 (d))") (l. 1149,
  1156, 1157);
* T-V7-13 (l. 3314): "a `Wayside shrine` hamlet fixture whose record is promoted to `Parish church` at a village epoch
  stands its church and one churchyard `cross` bound to the record in that epoch", and at V-M2 "the `Wayside shrine`
  promotion to `Parish church` absorbed without an epoch stands the church and its bound churchyard `cross`";
* J-V7.131.

After a receipt there is one key. V07 binds it to the cross; V08 and V11 bind it to the church. A builder of
`village.records` writes a binding row that V08's fold then re-points, and T-V7-13's clause fails against T-V8-46's
receipt clause ("one `v.parish_church` bound to the record's key, one churchyard `cross` laid for it … no binding row of
its own", V08 l. 2654). Beside it, two smaller disagreements. Item 4 reads "a `@none` lesser (a citizen militia) has
nothing to re-bind, and its greater is placed as any added record", which drops V08's `@office` lesser
(`priest_resident`) and the alias V08's second case writes ("the lesser's key becomes an alias row on the greater's
member `#1`", V08 l. 1665–1667). And T-V7-35 reads "a promotion keeps member #1 byte-identical" (l. 3336), which is false
where the greater is placed new.

**Required change:**
(a) Item 4. "… then the lesser's churchyard `cross` by §3.10's pin-record rule, the shrine record's key binding it (V08
§3.5.1 (c)), and …" reads "… then the lesser's churchyard `cross` by §3.10's pin-record rule — where two keys meet (the
church added beside the kept shrine record, or the shrine record leaving the list as the church arrives) the shrine
record's key binding it (V08 §3.5.1 (c)); after a `promotedFrom` receipt, which keeps the record's one key (F15), that key
binding the church and the cross laid for the record, keyed by its binding key, its provenance the record, with no binding
row of its own (V08 §3.5.1 (d); J-V8.114) — and …". "the fishmonger's key an alias on the hall (V08 §3.5.1 (d))" reads
"the fishmonger's key an alias on the hall where two keys meet, the record's one key re-pointed to the hall after a
receipt (V08 §3.5.1 (c), (d))". "a `@none` lesser (a citizen militia) has nothing to re-bind, and its greater is placed as
any added record" reads "a `@none` or `@office` lesser (a citizen militia, a resident priest) has nothing to re-bind: its
greater is placed as any added record and the lesser's key becomes an alias on the greater's member `#1` (V08 §3.5.1
(c)'s second case)".
(b) §3.10. "… whatever other crosses stand, and the shrine record binds it;" reads "… whatever other crosses stand, and
the shrine record binds it — save after a promotion receipt, when the cross is laid for the promoted record with no
binding row and the record's one key binds the church (V08 §3.5.1 (d); J-V8.114), such a cross being a pin its record
forced, tombstoned by `remove` with it (J-V7.130) —;".
(c) §3.11's palisade sentence adds "— after a `promotedFrom` receipt the record's one key is re-pointed to that enceinte and
no alias is written (V08 §3.5.1 (d))".
(d) §2.4's three ladder rows take the same split. The shrine row: "… the church is placed new and its cross laid in that
batch by §3.12 *Records at a village epoch* item 4 — the shrine record's key binding the cross where two keys meet, after a
receipt the one key on the church and the cross with no binding row (V08 §3.5.1 (d)) — the old roadside shrine standing,
unbound". The palisade row: "… with the palisade's key as its alias (after a receipt the one key re-pointed, no alias)".
The fish-market row: "the fishmonger's key its alias (after a receipt the one key re-pointed to the hall)".
(e) T-V7-13's promotion clauses read "… stands its church bound to the record's key and one churchyard `cross` laid for the
record with no binding row, the roadside shrine standing unbound" and, at V-M2, "… stands the church on the record's key
and its churchyard `cross` with no binding row in that absorb's commit". A third clause mirrors T-V8-46: "a hamlet
fixture whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt binds the shrine's key to the
churchyard `cross`, the church bound to its own key".
(f) T-V7-35's last clause reads "a promotion whose greater's thing is the lesser's (V08 §3.5.1 (c)'s first case) keeps
member #1 byte-identical, and one to a REPLACEMENT greater of a new thing places the greater new and leaves the lesser's
former thing byte-identical and unbound; a demotion keeps the member nearest its demand".
(g) J-V7.131 is amended in place: "… a promotion receipt keeping one key, that key binds the greater placed new and a kept
pin is laid for the record with no binding row (V08 §3.5.1 (d), J-V8.114; seam-settlements-r6 SR6-01)".
V08 needs no change; its X23 closes when this lands. V06's side is SR6-02.

**SR6-02** · major · contradiction (the test for "placed new") · **V06** — V6 §3.9.11's REPLACEMENT row (l. 1927) and
J-V6.125 (l. 3637) say V08 places the greater new for "a **pin-record lesser**" and "**a greater of another template
family than the lesser's building** (`fish_market` over `fishmonger`)". The words are round 5's own (SR5-04's required
change). V08 now decides by V11 §3.12's reading, not by template family (§3.5.1 (c); J-V8.113). Three rows change
template family yet keep the lesser's thing:
* `hedge_wizard` (`dwelling-row`) → `wizard_s_tower`, class `mage_tower` (`tower`);
* `wizard_s_tower` (`tower`) → `mages_guild` (`hall`);
* `parish_church` (`church`) → `cathedral_10_000_only` (`cathedral`).
The template families are at V11 l. 1624, 1625, 1630, 1531 and 1533. V08 re-binds all three in place, and V6's own row
converts the cathedral in place ("a church replaced by the cathedral carries its crypt"). A builder who follows V06's
test places a new tower for a promoted hedge wizard. At a village rung that placement goes through V07's item 4, which
places only `parish_church` and `fish_market`, so nothing is placed. The result is either no tower or two buildings;
T-V8-46's `town-1` clause expects neither ("re-binds the standing house as the tower's member and places no second
building"). Three more texts disagree with V08 and V11:
* The same row reads "a watch over a militia keeps the militia's building". But `citizen_militia` is `@none` (V11
  l. 2451: "a muster, not a building"), and V11 §3.12's `town_watch` row reads "the militia had no post (`@none`); the
  watch builds its posts" (l. 2746). V08's second case places the watch as any added record, with the militia's key as
  its alias. Round 5 read this row whole and missed the sentence.
* T-V6-45's receipt clause (l. 3357) reads "one new church stands bound to the record, the record's key binds one
  churchyard `cross`": one key binding two things, against J-V8.111 and J-V8.114. Its generic clause, "a promotion and
  a demotion change the members by least disruption (member `#1`'s building kept)", is false for a greater placed new.
* X47 (l. 4239) still reads V08's lane as "running", with V08's side "the shrine's key on the churchyard `cross`".

**Required change:**
(a) In V6 §3.9.11's REPLACEMENT row, "— save where V08 §3.5.1 (d) places the greater new (a row whose V11 §3.12 reading
does not keep the lesser's thing; …): a **pin-record lesser** (…) and **a greater of another template family than the
lesser's building** (…)" is replaced by: "— by V08 §3.5.1 (c)'s three cases, never by template family. Where the
greater's thing is the lesser's (V08's first case: `graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`,
`mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, `cathedral_10_000_only` over
`parish_church`), the `convert` runs in place. A `@none` or `@office` lesser (V08's second case: a town watch over a
citizen militia, a cathedral over a resident priest) converts nothing: the greater is placed as an added record is, with
the lesser's key its alias. Every other REPLACEMENT greater is placed new (V08's third case). These are a
**pin-record lesser** (`parish_church` over `wayside_shrine`) and **a building lesser whose thing the greater does not
keep** (`fish_market` over `fishmonger`). The greater is placed by S10b's `dossier` request as an added record is, and
the lesser's former thing is left standing, unbound. Where two keys meet, the lesser's key binds as V08 §3.5.1 (c)
states. After a `promotedFrom` receipt, the record's one key is re-pointed to the greater, and a kept pin (the churchyard
`cross`, at a village rung) is laid for the record with no binding row (V08 §3.5.1 (d); J-V8.114)". The rest of the row
stays. "a watch over a militia keeps the militia's building" reads "a city watch over a town watch keeps the town
watch's posts".
(b) J-V6.125 takes the same test (V08's cases, not template family) and names the hedge wizard's tower as a row that
changes template family yet converts in place.
(c) T-V6-45's receipt clause reads "… one new church stands bound to the record's key, one churchyard `cross` is laid for
the record with no binding row, the roadside shrine pin stands unbound …". The clause gains "on a `town-1` mutation whose
`Hedge wizard` a receipt promotes to `Wizard's tower`, the house is converted in place and no second building stands".
The generic clause reads "(member `#1`'s building kept where the greater's thing is the lesser's; V08 §3.5.1 (c))".
(d) X47 is marked **CLOSED**, citing V08 §3.5.1 (c)–(d), J-V8.113 and J-V8.114 as landed at 14:12.
V08's X24 closes when this lands. V07's side is SR6-01.

**SR6-03** · major · unwired across the two class namespaces (the roster reader) · **V09** — V11 §2.3 (landed 14:25)
makes a class's `label` unique only within its namespace: "the town-and-city rows, the `v.` rows, the generic rows (V11
§2.9) — so a town `smithy` and V07's `v.smithy` may share their words" (V11 l. 492–494). By script (`ssr6/words.py`),
V07's 25 `v.` rows share **45** words with the town-and-city rows, as labels or synonyms. Among them:
* label against label: `smithy`, `inn`, `alehouse`, `tannery`, `watchtower`, `cottage`, `hovel`, `farmstead`,
  `watermill`, `windmill` and `shop`;
* `church`, a town label and a synonym of `v.parish_church`;
* `parish church`, the label of `v.parish_church` and a synonym of the town `church`;
* `tavern` and `mill`.
V9 §4.16 (3) reads T7's pasted lines and T6's typed words. It matches "against the class rows' display labels and
synonyms (volume 11's `label` and `synonyms` cells): exact first, then with a plural ending removed, then within one
letter …; ties go to the row's `commonness` cell, then to row order" (V09 l. 2290–2293). It does this over every
namespace and at every rung.
So "a smithy by the ford" on a TOWN map ties `smithy` against `v.smithy`, and the tie goes to `commonness`. In the two
namespaces `commonness` means different things: V11 §3.5.1 gives the share at TOWN over about 180 rows, rounded 0.001
(V11 l. 1335–1344), and V07 §2.4 gives the share at VILLAGE over 25 rows, rounded 0.01 with a 0.01 floor (V07
l. 920–929). A 25-row roster's shares run larger, so the village row plausibly wins, and a village class is declared on a
town map. At a village rung, a town row with a `villageForm` competes with the `v.` row that plays it. V11's
X-V11-17 (a) asked V09 only that "ties compare `commonness` within one meaning", and J-V11.94 claims the two shares
"compare like with like". Neither makes the reader choose the namespace.
**Required change:** V9 §4.16 (3) adds, after "the class rows' display labels and synonyms (volume 11's `label` and
`synonyms` cells)": "— of the classes the document's rung admits (the fold's product and rung, V07 §2.1): at a base rung
the town-and-city rows, V05's sky rows where a sky layer stands, and the generic rows; at a village rung the `v.` rows,
the town-and-city rows that play themselves there (no `villageForm`; V11 §3.22; V07 §3.11 step 3) and the generic rows, a
town-and-city row with a `villageForm` answering through its `v.` row. Ties go to the row's `commonness` cell within that
set, a `v.` row before a town-and-city row at a village rung, then to row order." T6's stamp palette (V9 §4.5's T6 row)
lists the same set. V9 §7 gains **T-V9-70**, *the roster reader's namespaces*: on a TOWN fixture "a smithy", "an inn" and
"a church" resolve to `smithy`, `inn` and `church`, never to a `v.` class; on a VILLAGE fixture they resolve to
`v.smithy`, `v.inn` and `v.parish_church`; "a chandler" at VILLAGE resolves to `v.shop`; and a town-and-city class that
plays itself at VILLAGE ("a pawnshop") resolves to itself. A J-V9 row records the choice. (V11's companion: SR6-09 (b).)

### Minors

**SR6-04** · minor · stale records and a pointer · **V07** — (a) §1 (13) (l. 397–403) still reads "V08 — pending
(SR5-01, V08's lane) … *fallback* …" and "V11 — pending (SR5-03, V11's lane) … *fallback* …". Both lanes have landed:
reconcile-V08-r6 at 14:12 (V08 §3.5.1 (c)–(d)) and reconcile-V11-r6 at 14:25 (V11 §2.3, §3.5.15). (b) §12's round-6
PLAUSIBLE (l. 4155–4156) reads "that V08's SR5-01 and V11's SR5-03 land the companions of §1's dependency (13) as read —
each with its fallback there". (c) §13's round-6 sentence (l. 4190) reads "its V08 (SR5-01) and V11 (SR5-03) companions
are §1's dependency (13), each pending with its fallback". (d) §2.4's "Pin kinds take no row: their words are the
legend's symbol key (the base's §9.5; V08 §4.6 as SR5-07 words it)" (l. 928–929), and J-V7.133's "the pin kinds take their
words from the legend's symbol key", name a producer that no text has (SR6-06).
**Required change:** (a) §1 (13) reads: "V08 — landed by reconcile-V08-r6 (14:12): §3.5.1 (c)'s three cases and (d)'s
one-key receipt (J-V8.113, J-V8.114), the `town_walls` key on the enceinte the fortification path yields; the receipt
reading is taken into item 4, §3.10, §3.11 and T-V7-13 by seam-settlements-r6 SR6-01; no fallback. V11 — landed by
reconcile-V11-r6 (14:25): the display cells on `BuildingClassRow` (V11 §2.3, §3.5.15; T-V11-4's display-cell check), which
§2.4's column fills for the `v.` rows; no fallback." (b) §12's clause moves to CONFIRMED, citing those texts. (c) §13's
sentence reads "… companions landed (V08 14:12, V11 14:25)". (d) §2.4's pointer and J-V7.133 read "their words are V08
§4.6's `host.pinKind.<kind>` rows (seam-settlements-r6 SR6-06)".

**SR6-05** · minor · stale records · **V08** — (a) X25 (l. 3461) is still "OPEN until that lane lands", but
reconcile-V11-r6 landed at 14:25. X25 also describes "the `generic-<family>` classes' labels from V11's `trade.noun`
slice", which J-V11.95 replaced with the family's `label` cell (V11 §3.4, §3.13.3). (b) X24's owner cell reads "V06
(reconcile-V06-r6, with seam-settlements-r5 SR5-04)", but that lane landed at 13:59, before V08's hand-off at 14:06, and
did not take the hand-off. §12's round-6 PLAUSIBLE (l. 3368–3371) still reads "… V06's round 6 names the exception by
V08's cases rather than by template family (X24; hand-off at 14:06); that V11's class `label` cell lands as read in its
checkpointed text at 14:12 (… X25)".
**Required change:** (a) X25 is marked **CLOSED**, citing V11 §2.3's *The display cells*, V11 §3.5.15 and J-V11.93 –
J-V11.95 as landed at 14:25; the generic classes' label is the family's `label` cell (J-V11.95). (b) X24's owner reads "V06
(its next lane; reconcile-V06-r6 landed at 13:59, before this hand-off; seam-settlements-r6 SR6-02)", and X23's cites
SR6-01. §12's sentence reads that V11's `label` cell landed (CONFIRMED), and keeps as PLAUSIBLE only that V07's and V06's
next lanes land SR6-01 and SR6-02.

**SR6-06** · minor · consumed, never produced · **V08** — §4.6's `unmapped_kind` row gives a pin kind's `class` as "the
pin kind's word in the legend's symbol key (§9.5, generated from the registry, O12 d)" (l. 2374). `custom_resolved` shows
"the market cross by its symbol-key word" (l. 2396), and so do §1b's two `PortNote` rows (l. 332, 1212), T-V8-46 and
J-V8.115. No text produces such a word:
* The base's §9.5 says only "plus the symbol key generated from the registry (O12 d)" (base l. 11376–11377).
* Its §8.3 says "Every semantic visible at a band has exactly one registry glyph, from which the legend is generated"
  (base l. 10120–10121), and names no words.
* V11's display cells cover "every table the UI shows rows of", and `Pin.kind` is a base enum, not a table.
* V09 writes no symbol-key words.
Round 5 left this PLAUSIBLE ("no registry row was read that names the words"). This lane has now searched all twelve
volumes, file f and the base (grep), and none of them holds the words. The pin kinds a record can name are three:
`shrine`, `well` and `market_cross` (V11 §3.11; grep).
**Required change:** V08 §4.6 gains three message rows of its own `host.*` family, which V11's registry row 87 already
loads with V08's other `host.*` rows: `host.pinKind.shrine` "wayside shrine", `host.pinKind.well` "well" and
`host.pinKind.market_cross` "market cross". The `class` cell's pin branch reads "for a pin kind a cell names, its
`host.pinKind.<kind>` row". The following change to match: `custom_resolved`, §1b's two rows, T-V8-46 ("the market cross
by its `host.pinKind.market_cross` words") and J-V8.115. V07's pointer is SR6-04 (d). The legend's own symbol-key words,
for every glyph, belong to the base and the application, and §5 hands them to the surfaces seam.

**SR6-07** · minor · wording a builder would ship · **V08** — The two templates put an article before the label.
`unmapped_kind` reads "{name} is a kind the map does not know yet, so it is built as a {class}." and `custom_resolved`
reads "{name} is built as a {class} ({rung})." (l. 2374, 2396). Since SR5-07, the `class` words are V11's and V07's bare
labels, and many begin with a vowel: "alehouse", "inn", "armourer's workshop", "apothecary", and "exotic site" (the
generic `exotic` class's label, J-V11.95). T-V8-46's own case, an unmapped `lodging` kind at a hamlet off any through
road, renders "… so it is built as a alehouse." V9 §2.9's `MsgRef` arguments have no article form. V11 raised this in
X-V11-17 (c) and proposed an argument form in V09.
**Required change:** the templates take no article before the slot: `unmapped_kind` reads "{name} is a kind the map does
not know yet, so it is built like any {class}.", and `custom_resolved` reads "{name} is built like any {class} ({rung})."
T-V8-46's two clauses also check the rendered sentence ("… built like any alehouse."). No V09 mechanism is needed
(J-SR6.4).

**SR6-08** · minor · two producers for one cell · **V07** — V07 §2.4 says each `v.` row's `commonness` is "written by
the seat landing V-M2's rows by one script kept beside the table and recomputed by T-V7-56 (J-V7.133)" (l. 927–928): a
source cell, stated. V11 says the compiler writes a class's `commonness`. Step 5a applies "the display cells `icon` and
`commonness`" (V11 l. 1036–1038). The lifecycle row reads "`icon` and `commonness` of a class … compiled (V11 §3.2.1
steps 5, 5a) … a count edit recomputes `commonness` in the same compile" (V11 l. 810). J-V11.94 says "a derived cell moves
with every table version that moves a count … where a stored number would drift". But V11 §3.5.1's rule covers only
"every town-and-city row", so a builder of step 5a does not know whether to overwrite, skip or check the `v.` rows' stated
cells. J-V7.133's own reason, that "the rule stays true when a presence law is recalibrated", holds only for a compiled
cell. Without one, a recalibrated `v.` presence row leaves the stated number stale until someone reruns the script.
**Required change:** §2.4's sentence reads "… `commonness` … is each `v.` row's roster share at VILLAGE by this rule,
compiled by V11 §3.2.1 step 5a from the compiled `v.` rows (never stated in the source; T-V11-4) and recomputed by
T-V7-56 (J-V7.133)", and the script clause is deleted. J-V7.133 is amended in place ("compiled at step 5a" for "computed
by a script"). W18's producer cell reads "V11's compiler (step 5a)" for "the V-M2 seat's commonness script". (V11's
companion: SR6-09 (a).)

**SR6-09** · minor · companion rows, a claim, a citation and a reading · **V11** —
(a) §3.5.1's `commonness` bullet (l. 1335–1344) and step 5a compute the share only "for every town-and-city row".
**Required change:** the bullet adds "and, for a `v.` row, V07 §2.4's rule (the roster share at VILLAGE's default target,
rounded 0.01, never below 0.01), stated there once". T-V11-4's clause reads "on a town-and-city or `v.` row compiled,
never stated in its source". (V07's side: SR6-08.)
(b) §3.5.1's last sentence ("so a tie between a town row and a `v.` row compares like with like"), J-V11.94's reason and
X-V11-17 (a)'s "ties compare `commonness` within one meaning" claim a comparison that the two roundings and rosters do not
give. **Required change:** each reads "the reader compares rows of the document's rung only, a village rung's tie going
to the `v.` row (V9 §4.16 (3) as seam-settlements-r6 SR6-03 scopes it)".
(c) The round-6 ledger (l. 103, 107), §12's round-6 paragraph (l. 5002), the round-6 note (l. 5372) and its table row
(l. 5380) attribute "SR5-08" to `seam-settlements-r5.md`. The row-87 issue that lane fixed is seam-surfaces-r5's SR5-08
(`seam-surfaces-r5.md` l. 230); this seam's SR5-08 was V08's X22. **Required change:** each reads "SR5-08
(seam-surfaces-r5)".
(d) §3.12's `mages_guild` reading, "the tower's record binds the guild's hall" (l. 2726), can mean that the tower becomes
the hall or that a new hall takes the tower's key. V08 §3.5.1 (c)'s first case and round 5 both read it as the tower
re-designated in place, and V06's convert (SR6-02) relies on that reading. **Required change:** the cell reads "the
wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)".

## 4 Census: every dossier kind at every size lands in a class row

**(A) Kinds to class rows.** Round 5's `census.py`, re-pointed at the live V11 (scratch `ssr6/census.py`), gives a
`census.out` byte-identical to rounds 2–5 (md5 00d6640f…). There are 280 kinds. Tiers T, H and V carry 97 and tier W
85, six of them in both, so **176** reach a village rung at birth. At a village rung, **34** of them go to a
pseudo-class, **31** to a class with a village form (V11 §3.22's 32 entries onto 21 of V07's `v.` rows), **111** to a
class that plays itself and **0** to the tag fallback. `census_all.py` covers all **280** kinds, including the 104 of
tiers C and M that reach a village rung only by a hand-down or a later addition: 41 pseudo, 39 village form, 200 own row,
0 missing. Every kind lands in a class row at every size. None of this round's changes touches a kind's row. V11's new
§3.5.15 sits inside §3.5, and the parser skips its four-column rows.

**The words for each landing** (new this round, `ssr6/words.py`). Every class a kind lands in now has display words.
V11 §3.5.15 covers exactly the 169 tabled town-and-city classes plus the 12 clandestine ones (181), with V05's two sky
rows beyond them: 0 missing, labels unique, no synonym equal to a label, and one shared synonym, `mill`. V07 §2.4 covers
the 25 `v.` rows, with labels unique, no synonym equal to a label, and shared synonyms `cot` and `mill`. The generic rows
take their family's label (V11 §3.13.3). A pseudo-class builds no class. Its pin, where it has one (`shrine`, `well`,
`market_cross`), has words only once SR6-06 lands. The two namespaces share 45 words (SR6-03).

Every `` `v.` `` id in the twelve volumes, `_integrate.md` and file f is one of V07's 25 rows (script; the only other
token is the namespace's own mention, `v.`). V02, V03, V07 and V11 use all 25. V08 uses 7, V04 and V06 one each, and V01,
V05, V09, V10 and V12 none (V09's roster reader names no `v.` id, SR6-03). The `@pin:` kinds in V07, V08 and V11 are
`shrine`, `well` and `market_cross` (grep), and V07 §3.10's pin-record rule places each.

**(B) The small-settlement hand-off.**

| check | round 6 reading | verdict |
|---|---|---|
| registration | one `ProductDecl` (V07 §2.1; file f item 202, now with *The records hook*: `ProductDecl.records?` and its calls on both paths, the phase overrides and the participants on M4's grow path); V08 §3.10 consults `LadderRouter` | holds (SR5-15 (a) fixed) |
| the band and the epoch's product | V07 §2.1's fold = V08 §3.10 = file f items 322 and 317 | holds, unchanged |
| the floor | creation below 1 refused; 0 at an absorb → THORP and desertion (V07 §2.1; V08 §3.6 (7), §3.9; item 202) | holds, unchanged |
| the participants across the hand-off | `village.plan` `VS1`, `village.density` `VS2`, `village.pins` `VS8`, each returning no ops outside its scope (V07 §3.12; V6 §3.2's table; V11 row 61's gloss, SR5-09 (b) fixed) | holds |
| a record placed at a village rung after creation | `village.records`' `place` at an epoch and on an absorb without an epoch, keyed by the dossier event's `seq`; `remove` after the base's removal (V07 §3.12; V06 §2.1's `EpochPlacement`; J-V7.129, J-V7.130) | holds for an added or removed record; for a REPLACEMENT greater over its standing lesser, holds where two keys meet, and after a receipt V07 binds the one key where V08 does not (SR6-01) |
| the ladder step at a village epoch | the engine's dossier-phase ladder step after `village.records` (V6 §3.2 row 12; V6 §3.9.11) | the placed-new test differs (SR6-02) |
| burial records | `churchyard` on the church families; `parish_burial_grounds` a COUNT over the churchyards; `graveyard` over `burial_ground` re-binds the face (V11 §3.12; V08 §3.5.1 (c)'s first case; V07 DR9) | holds |
| `@absent` at a village rung | V07 §3.11 step 1, V11 §3.11, V08 §2.6 and §2.6a, T-V8-46 at VH | holds, unchanged |
| seats | DR11 through `villageSeat`, "at least one member"; item 576 (c) | holds, unchanged |
| furniture | VS8's rows and the pin-record rule; `village.pins` at a village epoch with its orphans step and the Roadside Shrine quarter's shrine (SR5-12 fixed) and the stall exception (SR5-14 fixed) | holds |
| markets and harbours | §3.12 (a)–(f) with step (m) and `village.records`; (b)'s and (c)'s build finished on an absorb (SR5-05 fixed); (c)'s last rung reported F-SITING (SR5-13 fixed) | holds |
| the `VG` preset | V07 §3.15, V11 §3.2.2, item 581 | holds, unchanged |
| the notes the host shows for a village | `unmapped_kind` and `custom_resolved` after the fold, naming the class built at the document's rung by V11's or V07's `label` (SR5-07 fixed) | a pin kind's words have no producer (SR6-06); the article (SR6-07) |
| the words a user types for a village | V9 §4.16 (3) over V11's and V07's labels and synonyms | the reader crosses the namespaces (SR6-03) |

**(C) The ladders meeting.** At a first reading the three volumes agree, as in round 5. Over time, V08's three cases
(J-V8.113) decide, and V11's readings agree with them. Six REPLACEMENT rows can reach a village rung, read from V11's
kinds rows with the tiers given in parentheses:

| REPLACEMENT row (tiers) | V08 §3.5.1 (c)'s case | V07's village reading | V06's dossier-phase step | verdict |
|---|---|---|---|---|
| `parish_church` (V) over `wayside_shrine` (T, H) | third: placed new; the pin lesser's key on the churchyard `cross` where two keys meet; after a receipt, the one key on the church and the cross laid with no binding row (J-V8.114) | item 4 places the church and lays the cross, but binds the shrine record's key to the cross on every arrival | the placed-new exception by pin record; T-V6-45 binds the one key to the cross | SR6-01, SR6-02 (c) |
| `fish_market` (V) over `fishmonger` (V) | third: the hall placed new; the fishmonger's key an alias where two keys meet; after a receipt, the key re-pointed | item 4 places the rim hall; the alias on every arrival | the placed-new exception by template family | SR6-01, SR6-02 (a) |
| `town_walls` (W) over `palisade` (T) / `palisade_or_earthworks` (H, V) | third (`@wall`): the enceinte the fortification path yields | §3.11's palisade REPLACEMENT; the alias on every arrival | walls through the fortification path | SR6-01 (c) |
| `graveyard` (V) over `burial_ground` (T, H) | first: the face re-bound | item 4 excludes it (V08 re-binds) | `convert` in place | holds |
| `town_watch` (W) over `citizen_militia` (`@none`) | second: the watch placed as an added record; the militia's key an alias | item 4's `@none` sentence without the alias or `@office` | "a watch over a militia keeps the militia's building" | SR6-01 (a), SR6-02 |
| `wizard_s_tower` (W, C) over `hedge_wizard` (V) / `traveling_hedge_wizard` (H, `@none`) | first for the house (it becomes the tower); second for the travelling one | §3.11's upgrade keeps the standing building as member #1 | template family changes (`dwelling-row` → `tower`), so the exception would place a new tower | SR6-02 (a) |

`theaters`, `mages_guild`, `professional_city_watch`, `city_walls_and_gates`, `massive_walls_and_fortifications` and
`cathedral_10_000_only` are tiers C and M. They reach a village rung only standing, handed down, where V07's hand-off
down re-classes no standing building (V07 §3.12).

**(D) Records, ids, terms, units and base change requests across the seam.**

| subject | V07 | V08 | V11 | verdict |
|---|---|---|---|---|
| village class keys | `v.<id>`, 25 typed rows with label · synonyms | seven `v.` ids, all V07's | `v.` namespace; `villageForm` → `v.` only | agreed |
| a class's display words | label · synonyms on the 25 rows; `commonness` by the VILLAGE share, written by a script | `class` = V11's `label` cell | `label`, `icon?`, `synonyms`, `commonness` on `BuildingClassRow`; §3.5.15; `commonness` compiled at step 5a (town-and-city rows) | wired (SR5-03, SR5-10 fixed); the `v.` cell's producer (SR6-08, SR6-09 (a)); the two meanings across namespaces (SR6-03, SR6-09 (b)) |
| a pin kind's words | "the legend's symbol key" | "the legend's symbol key (§9.5)" | none (a base enum) | consumed, never produced (SR6-06, SR6-04 (d)) |
| a REPLACEMENT greater over time | item 4 (key on the lesser's thing on every arrival) | three cases; one key after a receipt (J-V8.113, J-V8.114) | readings per row; the `parish_church` row follows V08 | V07 and V06 to follow (SR6-01, SR6-02); `mages_guild`'s reading (SR6-09 (d)) |
| the records placement | `village.records` (`place`, `remove`), stage `S10b`, W70 | §3.6 (5) names it (SR5-06 fixed) | row 61 lists `S10b` with the gloss (SR5-09 fixed) | agreed |
| a closest-option report | F-SITING (SR5-13 fixed) | — | — | agreed |
| file f | BCR-V7-1 – -38 carried (exact-id script) | BCR-V8-1 – -32 carried | BCR-V11-1 – -31 carried | carried; item 202's records hook and item 516's *Needed by* (SR5-15 fixed) |
| `_integrate.md` | IN-V07-6, -7 | — | IN-V11-8 – -10 | unchanged, agreed |

## 5 Summary, decisions, CONFIRMED versus PLAUSIBLE

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V07 | 0 | 1 (SR6-01) | 2 (SR6-04, SR6-08) | 3 |
| V06 | 0 | 1 (SR6-02) | 0 | 1 |
| V09 | 0 | 1 (SR6-03) | 0 | 1 |
| V08 | 0 | 0 | 3 (SR6-05, SR6-06, SR6-07) | 3 |
| V11 | 0 | 0 | 1 (SR6-09 (a)–(d)) | 1 |
| BASE-F | 0 | 0 | 0 | 0 |
| **total** | **0** | **3** | **6** | **9** (SR6-01 – SR6-09) |

**Round 5's 15:** all fixed as required, none reopened (§1). The census holds as in rounds 2–5. The three volumes agree
on the class keys, the records placement on both paths, the pins over epochs, the burial ladder, the `VG` preset and file
f's requests. File f carries every request, and item 202 now carries the records hook.

**What round 6 finds.** Most of it sits where round 5's own words were refined after the lanes that took them had
closed. V08 split the REPLACEMENT pair over time into three cases, decided by V11's per-row reading (J-V8.113), and
read a promotion receipt as keeping one key (J-V8.114). V11 follows both. V07 and V06 were written to round 5's looser
words: the promoted record's key goes on the cross, and the placed-new test is template family (SR6-01, SR6-02). V06's
militia sentence, missed by round 5, belongs to the same finding. The display cells landed. They exposed a reader that
crosses the two class namespaces, 45 words shared between them (SR6-03). The rest is small: two producers for
`commonness` (SR6-08, SR6-09 (a)), a comparison claim (SR6-09 (b)), pin-kind words with no producer (SR6-06), an article
before a vowel (SR6-07), a misattributed citation and an ambiguous reading in V11 (SR6-09 (c), (d)), and stale records
in V07 and V08 (SR6-04, SR6-05).

**Order of work.** First SR6-01 (V07) and SR6-02 (V06) together, since both follow V08's landed text and V08 needs no
change. Then SR6-03 (V09) with SR6-09 (b) (V11); SR6-08 (V07) with SR6-09 (a) (V11); and SR6-06 (V08) with SR6-04 (d)
(V07). Last, SR6-04 (a)–(c), SR6-05, SR6-07 and SR6-09 (c), (d).

**Hand-off outside this seam** (logged for seam-surfaces-r6, not a finding here). The base's legend "symbol key
generated from the registry (O12 d)" and §8.3's "one registry glyph, from which the legend is generated" name no words for
any glyph, and no volume writes them. SR6-06 takes the three pin kinds a dossier record can name out of that dependency.
The legend's own words for every glyph are a question for the application and the base.

**J-SR6 rows (this lane's own calls, vetoable).**
* **J-SR6.1** — Read the seam as J-SR5.1 did: word diffs against round 5's kept inputs (md5-equal), every touched section
  re-read whole with the unchanged text it meets, and V06's REPLACEMENT row, V09's reader and the base's legend read at
  source because the new text cites them. The alternative was a seventh whole read of about 2 MB, above this lane's
  checkpoint. The diffs show every changed word. Every finding here was reached by following a changed passage to its
  partner, including the three that sit partly in unchanged text: V06's militia sentence, T-V7-35 and T-V6-45's generic
  clause.
* **J-SR6.2** — Gave the promoted-key contradiction to V07 and V06, not V08. V08's one-key reading (J-V8.114) follows the
  base's F15 (the line keeps the old `catalogId`) and J-V8.111 (one key binds one thing), and V11 already follows it. The
  looser wording was round 5's own fixture sentence. Reverting V08 to it was rejected: a parish church record bound to a
  roadside pin would send the church's later ruin, closure or **Show** to the pin.
* **J-SR6.3** — Raised the roster reader's namespaces (SR6-03) against V09, a volume outside the three. The shared words
  are this seam's: V07's `v.` rows and V11's town rows, whose per-namespace uniqueness is V11 §2.3's. V11's X-V11-17 (a)
  handed V09 a comparison that does not hold. At this lane's close, seam-surfaces-r6 held only its skeleton, so the
  finding is raised here and the surfaces seam was told (lane note).
* **J-SR6.4** — For the article (SR6-07), chose to reword V08's two templates ("built like any {class}") over V11's
  proposed article form in V9 §2.9. The article follows sound, not letter ("a university", "an alehouse"), so a letter
  rule is wrong and a sound rule needs a word list or a new label cell. The rewording needs neither and changes one
  volume.
* **J-SR6.5** — For the pin-kind words (SR6-06), chose three `host.pinKind.*` rows in V08's own message family over
  asking the base or V11 for symbol-key words for every glyph. Only three pin kinds reach a record. V08's `host.*` rows
  already load through V11's row 87. The legend's general words are a surfaces question, handed off and not allowed to
  block this note.
* **J-SR6.6** — For `commonness` (SR6-08, SR6-09 (a)), chose to compile the `v.` rows' cell by V07's rule in V11's step 5a
  over keeping V07's script and narrowing V11's lifecycle row. Both volumes' own reasons (J-V7.133, J-V11.94) argue for a
  derived cell, and one producer per cell is the single-source rule.
* **J-SR6.7** — Put V06's militia sentence, T-V6-45's generic clause and T-V7-35's promotion clause into SR6-02 and SR6-01
  rather than into separate findings. Each is the same defect as its finding: a generic re-key that V08's cases now split.
  Each owner changes them in the same edit. The militia sentence was already wrong against V11's `@none` in round 5,
  which read the row and missed it; that is stated in SR6-02.

**CONFIRMED (read or executed in this lane).**
* The inputs' md5s at the start, before §1, before §3 and before this section (§0).
* Round 5's inputs are kept md5-equal in scratch, and so is V06's round-5 state (c63ae4ae…, reconcile-V07-r6's pre-round
  copy).
* The five word diffs were read whole; `_integrate.md` is unchanged (empty diff).
* Every quotation was checked at its line in the live file.
* The census by script: 280 kinds; 176 reach a village rung, 34 / 31 / 111 / 0; all 280 land, 41 / 39 / 200 / 0.
  `census.out` is byte-identical to rounds 2–5.
* The display words by script: V11 §3.5.15 against the class tables (181 + 2, 0 missing); V07's 25 rows; uniqueness per
  namespace; 45 words shared across the namespaces.
* Every `v.` id in fourteen files is one of V07's 25 rows. The `@pin:` kinds are three. Every BCR-V7 (38), BCR-V8 (32)
  and BCR-V11 (31) id is carried in file f (exact-id script).
* The template families of the ladder classes (V11 l. 1427, 1480, 1531, 1533, 1624, 1625, 1630), and `citizen_militia`
  `@none` (V11 l. 2451).
* V08 §3.5.1 (c)–(d), J-V8.113 and J-V8.114; V11's `parish_church` and `mages_guild` rows; V6 §3.9.11's row, J-V6.125,
  T-V6-45 and X47; V9 §4.16 (3); the base's §8.3 and §9.5 legend sentences. No symbol-key words exist in the base, the
  twelve volumes or file f (grep).
* V11's round-6 "SR5-08" is seam-surfaces-r5's (that file, l. 230).

**PLAUSIBLE (reasoning).**
* That at a TOWN rung the `v.` row wins the `smithy` tie (SR6-03). The shares were estimated from V07's and V11's rules,
  not computed, since no compiled rows exist. SR6-03 holds either way, because a namespace-blind candidate set is the
  defect.
* That SettlementForge brings `parish_church` to a grown hamlet by a `promotedFrom` receipt rather than as a fresh record
  beside a kept shrine (round 5's point, still not counted over the 155 dossiers). SR6-01's split covers both.
* SR6-03's rung-scoped set, SR6-06's three rows, SR6-07's wording and SR6-08's compiled cell, as recommended decisions
  (J-SR6.3 – J-SR6.6).
* That seam-time-r6's TX-03 and TX-04, written beside this round, take the epoch side of the same J-V8.114 residue and
  do not repeat SR6-01 and SR6-02 (lane note, 14:44).
