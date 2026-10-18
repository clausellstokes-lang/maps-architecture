# routing for coherence/rewrite-V07 (extracted from canon.json)

## conflicts
{
 "id": "DIC-06",
 "inventory": "determinism",
 "kind": "internal_conflicts",
 "severity": "minor",
 "where": [
  "§7.1 twelve tools",
  "§7.8 T1 intend",
  "§13.2 test ids"
 ],
 "items": [
  "DETERMINISM-0349",
  "DETERMINISM-0593"
 ],
 "statements": [
  "claim: The tool ids T1-T12 share the T-prefix namespace with test ids (T8-1 ... T8-3, T12-1, T19-4, T65 fixtures, T73-8): \"T8\" and \"T12\" read as either a tool or an item's test group (§16 also cites \"item 101's T2-T8\" for tools). Principle (4) requires ids unique across the set."
 ],
 "proposed": "Always cite tools with their names (T8 `fill`) or give tools a distinct prefix.",
 "verdict": "FIX",
 "ruling": "Resolved by canon ID-TOOL: bare T1–T12 are item 101's tools, always written with the tool word at first use in a paragraph (T8 `fill`); an item's bars are always written with their number (T8-1, 'the T8-n bars'), never a bare T8.",
 "basis": "owner item 101 names the tools (owner rule > base); canon ID-TOOL",
 "units": [
  "determinism",
  "scope",
  "V07",
  "V09",
  "V10"
 ]
}
{
 "id": "MC-11",
 "inventory": "model",
 "kind": "conflicts",
 "severity": null,
 "where": [
  "§2.2 PlatKey/Recipe.rung (Rung)",
  "§2.8 SliceRef.table / Recipe.tablePins (TableId)",
  "§2.3 Terrain.outfalls, §2.7 Tunnel.outfall (Outfall)",
  "§2.6 BuildingInput.access (Segment)",
  "§2.5 District.boundary (TypedBoundary), District.fabric (FabricStrategyId)",
  "§2.6 BuildingInput.drift, Building.drift (DriftBounds)"
 ],
 "items": [
  "MODEL-0024",
  "MODEL-0524",
  "MODEL-0479",
  "MODEL-0124",
  "MODEL-0433",
  "MODEL-0278",
  "MODEL-0164"
 ],
 "statements": [
  "statement: §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-declared type inverts principle (1) (the base owns what the base builds; Rung alone is used 24 times in the base)."
 ],
 "proposed": null,
 "verdict": "FIX",
 "ruling": "Every type a base record uses is declared in the base: Rung (§1.1 with RungProfile), TableId (§7.6), Outfall (§2.3), Segment (§2.1), TypedBoundary and FabricStrategyId (§2.5, with f item 505's @plat/model additions), DriftBounds (§2.6, f item 385 BCR-V2-08 types it). The volumes that declared them cite the base declaration; their fields and meanings unchanged.",
 "basis": "principle (1): the base owns what the base builds; f items 385, 505",
 "units": [
  "model",
  "V07",
  "V11",
  "V04",
  "V10",
  "V01",
  "V02"
 ]
}
{
 "id": "V02-ICONF-1",
 "inventory": "vol-V01-V02",
 "kind": "internal_conflicts",
 "severity": "minor",
 "where": "§3.10.5 classFamily ownership",
 "items": [
  "V02-0197"
 ],
 "statements": [
  "claim: V02 hosts the composition.classFamily table in composition.json and states 'volume 7 keeps this table as the one source of the village classes' composition keys (J-V7.82)': the table's canonical home is stated as another volume's while its rows are written here (single source ambiguous)."
 ],
 "proposed": "Canon: one home (V02 §3.10.5 as the table, V07 citing it, or V07 as the rows' authority with V02 citing) and one statement of ownership.",
 "verdict": "FIX",
 "ruling": "composition.classFamily's home is V02 §3.10.5 (composition.json); its v.-keyed rows are the one source of the village classes' composition keys; V07 cites the table and names no second source.",
 "basis": "single source (1)",
 "units": [
  "V02",
  "V07"
 ]
}
{
 "id": "V07-ICONF-1",
 "inventory": "vol-V07-V08",
 "kind": "internal_conflicts",
 "severity": "major",
 "where": "§2.2 neighbourTracks row (line 683) vs its law (lines 626, 661)",
 "items": [
  "V07-0105",
  "V07-0108"
 ],
 "statements": [
  "claim: The law 1 + round(log2(P / 40)) clamped 1-4 gives 4 from P ≈ 227 (log2(P/40) >= 2.5), not 'from 320' as the table row says (320 is where log2 reaches exactly 3); the value at 228-319 people differs between the two statements (4 by the law, 3 by the row's gloss)."
 ],
 "proposed": "Fix the gloss to '4 from about 227' (or change the law if 320 was meant, e.g. floor instead of round) — one statement, one value.",
 "verdict": "FIX",
 "ruling": "The neighbourTracks gloss reads '4 from about 227 people' (the law 1 + round(log2(P ÷ 40)), clamped 1–4, governs).",
 "basis": "the law is the rule; its gloss follows",
 "units": [
  "V07"
 ]
}
{
 "id": "V07-ICONF-2",
 "inventory": "vol-V07-V08",
 "kind": "internal_conflicts",
 "severity": "minor",
 "where": "§3.6 (5) vs §2.4 Decorations and §3.2 (8)(d)",
 "items": [
  "V07-0211",
  "V07-0145"
 ],
 "statements": [
  "claim: §3.6 (5) glosses the centrepiece pond as 'a small decoration pond inside the green, the village pond', while §2.4 and §3.2 (8)(d) define 'the village pond' as the L0 pond VS1 carves at the lowest hollow within 150 m of the heart (pins.pond 0.4) and the centrepiece pond as a separate uncarved 'pond' part sited after the L0 batch; one name for two different ponds with different siting, carving and draws."
 ],
 "proposed": "Drop 'the village pond' from §3.6 (5) (the centrepiece pond is the uncarved part of §2.4).",
 "verdict": "FIX",
 "ruling": "§3.6 (5)'s centrepiece pond drops 'the village pond' (the uncarved part of §2.4); 'the village pond' names only VS1's carved L0 pond.",
 "basis": "one term per concept (2)",
 "units": [
  "V07"
 ]
}
{
 "id": "V07-ICONF-3",
 "inventory": "vol-V07-V08",
 "kind": "internal_conflicts",
 "severity": "minor",
 "where": "§3.10 VS8 ends ('1 at 40 people, 2 at 200, 6 from 625') vs the cap law",
 "items": [
  "V07-0227"
 ],
 "statements": [
  "claim: The cap 1 + floor(households / 25) reaches 6 at 125 households, i.e. about 563 people at the 4.5 mean household (§3.2 (3) H = round(P / 4.5)), not 'from 625' (139 households); the worked gloss disagrees with its own law for 563-624 people."
 ],
 "proposed": "Correct the gloss to 'from about 563' (or restate the law if 625 was meant).",
 "verdict": "FIX",
 "ruling": "VS8's gloss reads '6 from about 563 people' (the cap 1 + floor(households ÷ 25) at H = round(P ÷ 4.5) governs).",
 "basis": "the law governs",
 "units": [
  "V07"
 ]
}
{
 "id": "V07-ICONF-4",
 "inventory": "vol-V07-V08",
 "kind": "internal_conflicts",
 "severity": "minor",
 "where": "§3.12 (9v) vs §3.2 (4) and §2.2a polyfocal row",
 "items": [
  "V07-0248",
  "V07-0184"
 ],
 "statements": [
  "claim: (9v) sites an epoch's new nucleus 'at least 0.8·R_s from the existing ones', while the polyfocal rule whose cells §2.2a says (9v) reads ('polyfocal ... // §3.2 (4), §3.12 (9v)') spaces nuclei at max(polyfocal.spacingMinM = 250 m, spacingShareRs x R_s); the 250 m floor is dropped at epochs, so a small village's new nucleus may sit closer than at creation (a thorp's R_s about 100 m gives 80 m)."
 ],
 "proposed": "State (9v) as 'spaced by the polyfocal rule (§3.2 (4))' or record why epochs omit the floor.",
 "verdict": "FIX",
 "ruling": "(9v) reads 'spaced by the polyfocal rule (§3.2 (4)): max(polyfocal.spacingMinM, spacingShareRs × R_s)' — the 250 m floor holds at epochs as at creation.",
 "basis": "one rule, no unstated exception",
 "units": [
  "V07"
 ]
}
{
 "id": "V07-ICONF-5",
 "inventory": "vol-V07-V08",
 "kind": "internal_conflicts",
 "severity": "minor",
 "where": "§13 closing note and §12 round-6 readings vs §1 dependency (13)",
 "items": [
  "V07-0017"
 ],
 "statements": [
  "claim: §13's note says V08's SR5-01 and V11's SR5-03 companions 'are §1's dependency (13), each pending with its fallback', and §12 says 'each with its fallback there', while §1 (13) (as fixed by the finalization, SR6-04 (a)) says both 'landed ... no fallback'; the volume states both that a companion is pending and that it has landed."
 ],
 "proposed": "Delete the stale sentences (with the narration they sit in); §1's cross-volume list states only current facts.",
 "verdict": "FIX",
 "ruling": "The stale 'pending' sentences leave with the §12/§13 narration; §1 (13) states the current facts (both companions landed).",
 "basis": "principle (5)",
 "units": [
  "V07"
 ]
}
{
 "id": "V07-XCONF-1",
 "inventory": "vol-V07-V08",
 "kind": "cross_part_conflicts",
 "severity": "major",
 "where": "V07 §11 Q1; §8 'Where it slots into §16' vs docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md (J122)",
 "items": [
  "V07-0332",
  "V07-0310",
  "V07-0304"
 ],
 "statements": [
  "claim: J122 decides V07 Q1 as '(a) yes, and its tracker spike (V-M0) right after M0'; V07 §11 still lists Q1 as an open owner question with only a recommendation, §8 still says 'the order is the owner's (Q1)', and §8 lets V-M0 and V-M1 start only 'once M2b has landed and M3a's tools exist' — for V-M0 this contradicts J122's 'right after M0' (owner delegation outranks the volume, principle (3))."
 ],
 "proposed": "Mark Q1 'decided (a), J122'; write J122's slot into §8 (V-M0 right after M0; V-M1 onward after M4, parallel with M5) and the combined order into §16 and INDEX.md; state what V-M0 runs on before M2b (its headless spike inputs) or record the canon's ruling on the prerequisite.",
 "verdict": "FIX",
 "ruling": "J122 governs: V07 §11 Q1 is marked 'decided (a), J122'; V07 §8 reads: V-M0 (the tracker spike) right after M0, on M0's kernel, M0 (b)'s tables and the spike's own fixtures (no M2b input); V-M1 onward after M4, parallel with M5; V-M3's epoch clauses with M6-E. INDEX §4 and §16 carry the same slot.",
 "basis": "owner delegation J122 > volume",
 "units": [
  "V07",
  "scope"
 ]
}
{
 "id": "V07-XCONF-2",
 "inventory": "vol-V07-V08",
 "kind": "cross_part_conflicts",
 "severity": "major",
 "where": "V07 §1 dependency (5), §3.5a (7), §3.16 (1) vs V04's span rule (V04 BCR-45 'The span rule') and IN-V07-2",
 "items": [
  "V07-0016",
  "V07-0205",
  "V07-0266"
 ],
 "statements": [
  "claim: V07 requires 'a span over a hinterland face — field, meadow, common, pasture or wood — stays open at every rung' and registers V04's arch-vault source at every village rung; V04's span rule makes a span open only where its strip meets a part-0 way, water or flood cell, or fails the height or slope tests, and otherwise vaults it by chance (raised.vaultShare x era and culture multipliers, vaultCap 10 at each village rung) — no hinterland condition; IN-V07-2 closes FL-3 on the ground that 'V04's span rule leaves country spans open where no vault stage registers', but V07 registers the source at village rungs, and §3.16 (1) still carries the fallback 'until V04 states the hinterland condition, for the spans inside the perimeter only'. The two volumes disagree on whether an arch over a village field can be vaulted (principle (10))."
 ],
 "proposed": "Canon rules one reading at the span rule's home (V04 BCR-45 / f item 244): add the hinterland-face condition to step (2) (with its test) or withdraw V07's requirement; delete the fallback and IN-V07-2's stale reason.",
 "verdict": "FIX",
 "ruling": "The span rule (file f item 244 / V04 BCR-45, the base home) gains in step (2): a span whose under-deck strip lies wholly on hinterland land-use faces (field, meadow, common, pasture, wood) is `open` (new reason `country`) at every rung — country arcades stand open (realism tiebreaker). T-V4-62 gains the clause; V07 §1 (5) and §3.16 (1) cite the rule and drop the fallback; IN-V07-2's reason is corrected.",
 "basis": "realism tiebreaker; one rule at its base home (f item 244)",
 "units": [
  "V04",
  "V07",
  "model"
 ]
}
{
 "id": "CANON-C01",
 "statements": [
  "INDEX §3/§4 and V07 §8: the village V-M0–V-M1 start after M2b and M3a's tools.",
  "J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): the village right after M4, parallel with M5; the tracker spike V-M0 right after M0."
 ],
 "verdict": "FIX",
 "ruling": "J122 governs: V-M0 right after M0 (on M0's kernel, tables and its own fixtures); V-M1…V-M4 after M4, parallel with M5; INDEX §3/§4, §16 and V07 §8 carry it (V07-XCONF-1).",
 "basis": "owner delegation J122 > INDEX and volume",
 "units": [
  "scope",
  "V07"
 ],
 "inventory": "canon",
 "kind": "canon",
 "severity": "major",
 "where": null,
 "items": [],
 "proposed": null
}
{
 "id": "CANON-C03",
 "statements": [
  "INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.",
  "J121/J122 answered every one."
 ],
 "verdict": "FIX",
 "ruling": "INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.",
 "basis": "J121, J122",
 "units": [
  "scope",
  "V01",
  "V02",
  "V03",
  "V04",
  "V05",
  "V06",
  "V07",
  "V08",
  "V09",
  "V10",
  "V11",
  "V12"
 ],
 "inventory": "canon",
 "kind": "canon",
 "severity": "major",
 "where": null,
 "items": [],
 "proposed": null
}
{
 "id": "CANON-C04",
 "statements": [
  "INDEX §7: 'The fix list — deliberately left for the next amendment'.",
  "The owner's no-defer rule; THE BAR IS ZERO."
 ],
 "verdict": "FIX",
 "ruling": "Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.",
 "basis": "owner no-defer rule",
 "units": [
  "scope",
  "V01",
  "V04",
  "V07",
  "V08",
  "V09",
  "V10",
  "V11",
  "V12"
 ],
 "inventory": "canon",
 "kind": "canon",
 "severity": "major",
 "where": null,
 "items": [],
 "proposed": null
}

## elegance
{
 "id": "E-01",
 "verdict": "UNIFY",
 "subject": "Stretch-state profiles on chains: RetainingWall.state (file f item 245) and Enceinte.condition (file f item 575) — the same knot-profile mechanism written twice ('exactly as item 245's').",
 "unified_form": "One 'stretch-state profile' rule stated once at §2.2 rule 5 (the knot-profile rule): a ChainProfile<S> of a state enum on a chain, its canonical form, writers over a StretchRef, carry through re-derivation, cut and join, undo and migration; each record states only its value set, knot role, absent default, writers and readers.",
 "home": "§2.2 rule 5 (model)",
 "units": [
  "model",
  "V06",
  "V05",
  "V07"
 ],
 "equivalence": [
  "canonical form: an open chain keeps a knot on its first vertex; a closed chain needs none; drop a knot equal to the one before it (never an open chain's first-vertex knot); all-equal profile stored as the scalar; scalar default (`standing`) stored as absent",
  "write: near knot carries the new state, far knot the state held before; an end that is no vertex placed first by splitThrough (§3.4); a writer naming no stretch writes the whole chain",
  "read: sampleProfile by arc length (§3.4), cyclic on a closed chain",
  "regenerate: a knot stays on its vertex while the vertex survives (carry-over by lattice point, §3.10, §6.3); a knot whose vertex is gone is re-placed by splitThrough at the new chain's nearest point within retaining.settings.stateSnapCm (V11, 100 cm; both records read this one cell, as item 575 states 'exactly as'), else dropped and its run merged into the run before it; an open chain's first-vertex knot always re-placed on the new first vertex",
  "cut or join: carried by J-K23's rekey pairing",
  "undo: the writing op's undo record restores the former profile, knot rows included",
  "migrate: absent reads the default; a pre-round-2 scalar reads as the constant profile",
  "RetainingWall keeps: values standing|decayed|ruined; knot role retaining_state_knot; writers BCR-V6-26's retaining member (breach → decayed, dismantle → ruined), repairRetaining, V05's landfall (decayed), V07's house-platform walls through V06's pool; restoration writes standing over the re-levelled length; readers V06 §3.19.4, V04 footings, the renderer, item 447's export, the clerk",
  "Enceinte keeps: values standing|breached|dismantled; knot role wall_state_knot; writers DeclineOp breach/dismantle, V05's landfall (breached), V06's repairWall; the record's lifecycle rules (abandoned on neglect; decayed while any run is not standing; lifted by the no-stretch repairWall per V6 §2.8); §8.2's decayed row draws gap glyphs on breached runs and dismantled towers as trace discs; §11.1's wall LineStrings split per run with id and run"
 ],
 "separating_nuance": null
}
{
 "id": "E-24",
 "verdict": "UNIFY",
 "subject": "Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).",
 "unified_form": "One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.",
 "home": "the index (scope) and each volume's §9",
 "units": [
  "scope",
  "V01",
  "V02",
  "V03",
  "V04",
  "V05",
  "V06",
  "V07",
  "V08",
  "V09",
  "V10",
  "V11",
  "V12"
 ],
 "equivalence": [
  "no row dropped",
  "the governing row keeps the reason"
 ],
 "separating_nuance": null
}
{
 "id": "E-30",
 "verdict": "UNIFY",
 "subject": "Cross-table reference cells {ref: {table, row, cell}} defined for village.json only (V07-ELEG-1).",
 "unified_form": "Lifted into §7.6 as one reference-cell form for every table, with its compile check (V11's compiler resolves it) and editTable inverse and undo row; V07 §2.2a cites it.",
 "home": "§7.6 (determinism); V11 compiler",
 "units": [
  "determinism",
  "V11",
  "V07"
 ],
 "equivalence": [
  "the compile check (a reference to a missing row fails the build)",
  "editTable's inverse and undo row",
  "V07's existing references to V11 §3.6.1, §3.24.1, §3.24.4 expressed in the one form"
 ],
 "separating_nuance": null
}
{
 "id": "E-31",
 "verdict": "UNIFY",
 "subject": "The toll-bridge watercourse rule written twice with different shapes (V08-ELEG-1): V08 §2.6b (3) at base rungs and V07 §3.1 (1), §3.11 DR1 at village rungs.",
 "unified_form": "One rule at V08 §2.6b (3) (the DR row's home) with a rung column; V07 cites it.",
 "home": "V08 §2.6b (3)",
 "units": [
  "V08",
  "V07"
 ],
 "equivalence": [
  "geometry by rung: base — the brook crosses the through route of the longest approach inside the frame; village — the course between the two frame arcs the through road's entries divide, the topology raised to through",
  "coastal dry site by rung: base — a brook; village — an estuary",
  "failure → toll_bridge_dry at every rung on any of: a desert with no oasis_water and no river the arid row draws (g item 111); relief that cannot carry the brook; a fixed isolated or none access word — the union of both volumes' failure conditions, each now defined at both rung ranges (principle (11))"
 ],
 "separating_nuance": null
}
{
 "id": "E-38",
 "verdict": "UNIFY",
 "subject": "territory.haPerHead (2.3) stored beside the FarmTable village rows whose sum it restates (2.275) (V07-ELEG-2) — ruled as a conflict of two homes with two values.",
 "unified_form": "haPerHead is derived as the sum of the FarmTable village rows (2.275 ha per head); the stored 2.3 is retired; an editTable of a farm row moves A_T with it. A declared change of value (−1.1 % territory area), recorded here: a conflict resolution (principle (3) (b)), not an elegance-only change.",
 "home": "V07 §3.9 (1)",
 "units": [
  "V07",
  "V11",
  "V12"
 ],
 "equivalence": [
  "the farm rows' values unchanged",
  "A_T = households × the per-head sum",
  "V12's register: the farm rows are the calibratable cells; haPerHead leaves the register"
 ],
 "separating_nuance": null
}

## id rulings
{
 "id": "ID-BCR",
 "subject": "V01 and V04 number their base change requests bare 'BCR-n' (both 1–46): the same id names two requests (V03 cites 'BCR-29, BCR-30' for V04 and 'its BCR-43' for V01).",
 "ruling": "Rename into the set's one request family: V01's BCR-n → BCR-V1-n, V04's BCR-n → BCR-V4-n (the number kept). File f's citations 'V01 BCR-n' / 'V04 BCR-n' resolve by this rule and need no edit; every other citation in the set is rewritten.",
 "units": [
  "V01",
  "V04",
  "V03",
  "V05",
  "V06",
  "V07",
  "V08",
  "V09",
  "V10",
  "V11",
  "V12"
 ],
 "renumber": [
  {
   "from": "V01 BCR-n (bare BCR-n in V01)",
   "to": "BCR-V1-n"
  },
  {
   "from": "V04 BCR-n (bare BCR-n in V04)",
   "to": "BCR-V4-n"
  }
 ]
}
{
 "id": "ID-TOOL",
 "subject": "Tool ids T1–T12 (item 101) and the base's bar family T⟨item⟩-⟨n⟩ share the T prefix; bare 'T8', 'T10', 'T11' in §13.8 mean items' bar groups.",
 "ruling": "Keep both families (the tools are the owner's item 101 names; the 203 bar ids are cited everywhere). A bar group is always written with its number form ('the T8-n bars', 'T8-1 – T8-3'), never bare; a bare T1–T12 means the tool, written with its word at first use in a paragraph (T8 `fill`). §13.8's list is rewritten so. Volume bars keep T-Vn-m. research/sf/mapping.md's tables T1–T16 are cited by their row-set names (V08 §2.6), never bare (V07-TERM-4).",
 "units": [
  "scope",
  "determinism",
  "V07",
  "V09",
  "V10"
 ],
 "renumber": []
}
{
 "id": "ID-WX",
 "subject": "Volume-local row ids W1…, X1…, H1…, FL-n, IN-Vnn-n, S-Vn-x are reused across volumes (V01 W15 and V04 W15; X1 in V02, V06, V08).",
 "ruling": "They stay volume-local and are never cited bare outside their volume: another unit writes 'V06 W75', 'V02 X20', '_integrate H12'. Inside its own volume a bare id means that volume's row. V08 numbers its §1b wiring rows W1… (V08-TERM-1) and drops the history dividers. The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records.",
 "units": [
  "V01",
  "V02",
  "V04",
  "V06",
  "V07",
  "V08",
  "V09",
  "V10",
  "V11",
  "V12"
 ],
 "renumber": []
}
{
 "id": "ID-DR",
 "subject": "Derivation rows proposed under working names (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1–DR-V8.8) and numbered by J-VI.13 / file f item 383.",
 "ruling": "The numbers DR26–DR35 are the only ids everywhere in the set (DR26 = DR-V1.1; DR27 = DR-SKY; DR28 = DR-V6.1 = DR-V8.6, one row; DR29–DR33 = DR-V8.1–DR-V8.5; DR34 = DR-V8.7; DR35 = DR-V8.8); the aliases are retired (glossary G-DR). g item 113's history rows take DR36 onward, numbered by the determinism editor in §7.7's order and cited by V04, V06, V08.",
 "units": [
  "determinism",
  "V01",
  "V04",
  "V05",
  "V06",
  "V07",
  "V08",
  "V11"
 ],
 "renumber": [
  {
   "from": "DR-V1.1",
   "to": "DR26"
  },
  {
   "from": "DR-SKY",
   "to": "DR27"
  },
  {
   "from": "DR-V6.1 / DR-V8.6",
   "to": "DR28"
  },
  {
   "from": "DR-V8.1",
   "to": "DR29"
  },
  {
   "from": "DR-V8.2",
   "to": "DR30"
  },
  {
   "from": "DR-V8.3",
   "to": "DR31"
  },
  {
   "from": "DR-V8.4",
   "to": "DR32"
  },
  {
   "from": "DR-V8.5",
   "to": "DR33"
  },
  {
   "from": "DR-V8.7",
   "to": "DR34"
  },
  {
   "from": "DR-V8.8",
   "to": "DR35"
  }
 ]
}
{
 "id": "ID-DUPDEF",
 "subject": "The id census (work/canon/ids.py over the base, rationale, INDEX, f, g, _integrate and the twelve volumes) found no test or decision id defined twice with two meanings: every apparent duplicate is an index row and its Part A entry (J-A…, D-n), a bench-registration row and its bar's body (T-V2-22 …), an amendment note to the same request (BCR-V11-1 …), or a continuation line of a range. The rewrite keeps one definition per id: a volume's amendment notes to its own request fold into the request's one entry.",
 "ruling": "No renumbering beyond the rulings above.",
 "units": [
  "V11",
  "V02",
  "V03",
  "V09",
  "V10",
  "V04",
  "V07",
  "V08"
 ],
 "renumber": []
}

## wiring
{
 "id": "W-IF-02",
 "class": "interface-no-implementer",
 "severity": "major",
 "units": [
  "V07",
  "V10"
 ],
 "piece": "V07's WhyProvider for VillagePlan, VillageField, VillageEnd",
 "link": "V07 §4.5 registers its WhyProvider through BCR-V10-3's interface for the kinds V10 §3.9's owed table assigns it, its answers (listed in prose today) as rows with `info.village.*` keys, a V07 §1b row and a T-V7 bar — BCR-V10-3's completeness test checks exactly this provider",
 "ruling": "WIRE: write the named link at its home (the link column), both ends"
}
{
 "id": "W-FLD-08",
 "class": "orphan",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "piece": "VillagePlan.formSource, roadsSource",
 "link": "V07 §2.3 names their reader (V10's why for the village form and road topology; the re-derivation that keeps an 'edit' or 'dossier' source through an epoch) or drops them",
 "ruling": "WIRE: write the named link at its home (the link column), both ends"
}
{
 "id": "V07-WGAP-1",
 "class": "dangling",
 "severity": "major",
 "units": [
  "V07"
 ],
 "piece": "rule constants in prose with no village.json cell (T-V7-44 fails on the volume)",
 "link": "Add the cells (palisade.denseDialFrom, formRules.organicDialFrom, formRules.districtDensity, palisade.pullM, palisade section widths, perimeter closeM) or cite existing ones; (9v) reads the polyfocal rule.",
 "ruling": "WIRE: write the named link at its home (the link column), both ends"
}
{
 "id": "V07-WGAP-2",
 "class": "orphan",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "piece": "density.bandWeight, network.slack, network.emptyDensity: read by no step",
 "link": "Either write each cell into the step that reads it (q weighted by bandWeight; the reader of slack and emptyDensity named in §3.5) or delete the three cells from the interface, the defaults row and the VG column.",
 "ruling": "WIRE: write the named link at its home (the link column), both ends"
}

## g routing
{
 "item": 111,
 "class": "new design at build depth in every named unit; F-MISSING if absent",
 "parts": {
  "pipeline": "§4.2 S0 and S1: the oasis and spring features and the arid chances (an arid site keeps river, lake and coast at the arid row's chances and gains the oasis; likelier with no other water); §4.2 S3 and §4.4: the water pull on the growth field (travel-cost boundary and nucleus); §4.5: the prosperity water term and item 102's sunlight cell per climate row (zero or toward shade in hot arid rows); §4.7 S10b: wells and fountains weighted to high-yield ground, walking coverage tightened in arid rows; an oasis is water for every rule that reads water",
  "model": "WIRING CONSEQUENCE (not named by the item): §2.3 declares the spring and the oasis's records or fields S1 writes (a spring flag on a WaterBody or a Spring feature, the grove and irrigated gardens as LandUse and Greenery rows) with their lifecycle rows",
  "determinism": "§7.1: T2 `ground`'s lake point-and-level form with a spring flag (the oasis added or removed by hand), its §7.4 lifecycle row and undo; §7.7: a dossier's `oasis_water` makes an oasis exist (item 20) — its DR row cites DR1",
  "rendering": "WIRING CONSEQUENCE: the oasis's spring, grove and gardens draw with existing style rows or named new ones (§8.2), its label kind (§9.1) and its export (§11.1)",
  "scope": "§13.2: the bars of item 111 (d) — arid seeds' share of households within walking distance of water above the non-arid baseline; oases only on arid sites unless drawn or supplied; arid sites still draw rivers, lakes and coasts at the arid row's chances; the richest band's mean distance to water below the middle band's; with the oasis chance, the water pull and the climate cell neutral, byte-identical (a NoOpPin, E-20); §0.2's landing row",
  "V07": "the village crowding map's water pull and oasis villages",
  "V08": "the dossier's desert with or without `oasis_water`, and deserts with rivers, lakes or coasts (the port's mapping; E-31's failure condition reads it)",
  "V11": "the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row",
  "V06": "failing springs and oases over epochs (the pull weakens, the quarters around may decline)",
  "V05": "an island's own water, unchanged: one sentence stating that item 111's oasis, water pull and climate cell do not apply on a sky island (its water stays V05's)",
  "V09": "the tool: T2 `ground`'s spring flag and the oasis in the ground tools, its message rows and binding row",
  "V10": "the explanations: why rows for the water pull and the oasis ('why is this quarter here / rich')",
  "V12": "the bars: register lines and the NoOpPin registration for item 111's cells"
 }
}
{
 "item": 113,
 "class": "new design at build depth in every named unit; F-MISSING if absent",
 "parts": {
  "pipeline": "§4.2 S0: the history option (a standalone blueprint history such as 'once a city, now a village'); §4.11: history-first generation — the peak, the replay as coarse epochs (decades by default, a table value) from the founding or peak to the present meeting the dossier's present facts exactly, destruction and refounding (the old geometry as ruins, the new settlement reusing roads, gate gaps, bridges and foundations, the salvage ledger), burial past a threshold (a century by default, shortened by floods, silt and rebuilding, lengthened on bare rock), the effective peak (a symbolic peak from evidence, sized at the tier range's lower quartile, marked symbolic); II.7.6: the buried former settlement generalised to the replay (its streets, walls and major buildings at their old ground level), distinct from item 109's ancient ruins",
  "determinism": "§7.7: the derivation rows for history (DR36 onward, ID-DR): the peak (peakTier, high-water population, the symbolic peak's evidence order), the replay's events (event → epoch mapping), destruction and refounding, the burial threshold; the replay's record for the clerk (W-DOS-09); §6.1: the replay's streams (deterministic per seed and history)",
  "scope": "§13.2: item 113 (g)'s bars (the city-to-village fixture, byte-stable replay, refounded fixture reusing roads, buried ruins past the threshold matching the former geometry, a void LOST on its last link's closing and restored on reopening, a symbolic peak only with evidence, with replay off byte-identical — a NoOpPin); §16: the replay's milestone; §0.2's landing row",
  "model": "WIRING CONSEQUENCE: §2.7/§2.8 carry the replay's records the base reads (the history record, the LOST state on an underground link's access path — V04's records — and the `symbolic` provenance flag on a derived fact)",
  "V06": "the replay engine at generation: coarse epochs, the event-to-epoch mapping, the generation budget, lazy detail, the replay record; J-V6.4 and §1.3's bullet retired (V06-XCONF-1)",
  "V08": "reading SettlementForge's history: AGE_BY_TIER, the founding, the 29 event types with years ago and severity, tierHistory, populationHistory, calamityHistory, the lifecycle (terminal death, resettlement), opt-in ancient ruins, peakTier and its documented gap; the effective peak's evidence order",
  "V04": "buried former-town ruins (derived from the former geometry, at their old ground level) and lost access: access counts only through OPEN links; a void whose every open path closes becomes LOST (remembered as once known, drawn faded like an unexcavated void) until refound; dwellings in a lost void empty by the vacancy rules and may return",
  "V07": "a village over a former city (the remnants at village rungs) and refounding at village rungs",
  "V11": "event-to-epoch rows and burial thresholds (the table values of item 113)",
  "V09": "the history option in the editor (the blueprint history) and the LOST void's panel line (V09-WGAP-1)",
  "V10": "the story told ('the walls were built when this was a city of twelve thousand'; 'its exact size is not recorded' for a symbolic peak)",
  "V12": "the bars and the replay's budget (register lines, the NoOpPin)"
 }
}

## terms
[
 {
  "id": "G-firstmap",
  "retired": "first paint",
  "term": "first map",
  "count": 9,
  "lines": [
   1315,
   2866,
   2939,
   3186,
   3256,
   3457
  ]
 },
 {
  "id": "G-cite",
  "retired": "V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 …",
  "term": "Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y",
  "count": 144,
  "lines": [
   307,
   314,
   339,
   348,
   349,
   358
  ]
 },
 {
  "id": "G-dwell",
  "retired": "D, D_b, D_v, D_o for dwellings",
  "term": "N (N_b, N_v = N − N_o); D(x) is item 102's daylight share everywhere",
  "count": 30,
  "lines": [
   428,
   1430,
   1436,
   1437,
   1438,
   1481
  ]
 },
 {
  "id": "G-DR",
  "retired": "DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8",
  "term": "DR26–DR35 (ID-DR)",
  "count": 2,
  "lines": [
   448,
   4003
  ]
 },
 {
  "id": "G-digest",
  "retired": "nearbyResources[], site.terrainType",
  "term": "site.deposits; site.terrain",
  "count": 1,
  "lines": [
   4375
  ]
 },
 {
  "id": "G-portpath",
  "retired": "PortRungPath, registerRungPath, its own port path",
  "term": "ProductDecl in StrategyRegistry.products (file f item 202)",
  "count": 1,
  "lines": [
   3968
  ]
 },
 {
  "id": "G-floorvault",
  "retired": "floor vaults (wet ground)",
  "term": "no crypt; ledger slabs in the chancel floor (V03 §3.7.4)",
  "count": 2,
  "lines": [
   295,
   454
  ]
 }
]

## cohesion
[
 "The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.",
 "The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).",
 "The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.",
 "One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9)."
]

## open findings
{
 "id": "VOL-V07-V08-RESTATEMENTS-001",
 "list": "restatements",
 "severity": null,
 "units": [
  "V07"
 ],
 "text": "the whole ProductDecl interface and its member semantics",
 "required": "state it once at base registry (@plat/layout StrategyRegistry.products) via file f item 202 (BCR-V7-11); every other place cites it",
 "closure": "FIX at the unit"
}
{
 "id": "VOL-V07-V08-RESTATEMENTS-002",
 "list": "restatements",
 "severity": null,
 "units": [
  "V07"
 ],
 "text": "LadderRouter.route: village for [1, 1 500) once registered, the base clamp otherwise",
 "required": "state it once at base §1.1 LadderRouter (D-33) via file f item 202; every other place cites it",
 "closure": "FIX at the unit"
}
{
 "id": "VOL-V07-V08-RESTATEMENTS-003",
 "list": "restatements",
 "severity": null,
 "units": [
  "V07"
 ],
 "text": "the church-family member list (cathedral, great_temple, church, chapel, monastery, generic-worship, generic-monastic, v.parish_church, v.chapel) in epoch.rows.persistence",
 "required": "state it once at V11 §3.5.1 (the church-family tag); every other place cites it",
 "closure": "FIX at the unit"
}
{
 "id": "VOL-V07-V08-RESTATEMENTS-004",
 "list": "restatements",
 "severity": null,
 "units": [
  "V07"
 ],
 "text": "the villageForm column, its type and compile rule",
 "required": "state it once at base §10.2 BuildingClassRow via file f item 432 (BCR-V7-21); every other place cites it",
 "closure": "FIX at the unit"
}
{
 "id": "VOL-V07-V08-RESTATEMENTS-005",
 "list": "restatements",
 "severity": null,
 "units": [
  "V07"
 ],
 "text": "the street layer rate 0.08 in the desertion rule",
 "required": "state it once at V06 §3.5.2 (street candidate rate); every other place cites it",
 "closure": "FIX at the unit"
}
{
 "id": "VOL-V07-V08-RESTATEMENTS-006",
 "list": "restatements",
 "severity": null,
 "units": [
  "V07"
 ],
 "text": "the declareEnd and walk event forms with every field",
 "required": "state it once at base §7.1 EditEvent via file f (BCR-V7-19); every other place cites it",
 "closure": "FIX at the unit"
}
{
 "id": "VOL-V07-V08-RESTATEMENTS-007",
 "list": "restatements",
 "severity": null,
 "units": [
  "V07"
 ],
 "text": "the full text of every BCR-V7 request in V07 §10 (items V07-0325 .. V07-0331)",
 "required": "state it once at file f items 201-579 (BCR-V7-1 .. BCR-V7-38 consolidated; see bcr_to_file_f); every other place cites it",
 "closure": "FIX at the unit"
}
{
 "id": "V07-RESTATE-1",
 "list": "restatement_findings",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "ProductDecl is a base registry record (@plat/layout, registered by the base as 'base' and by V07 as 'village'; BCR-V7-11), shared by more than one product, yet its full interface and member semantics are written in V07; by principle (1) a mechanism shared by more than one stage is the base's (§1.1/§4.12/§14).",
 "required": "Canon: ProductDecl's interface lives in the base (via BCR-V7-11 at §4.12); V07 cites it and states only the 'village' entry's values.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-RESTATE-2",
 "list": "restatement_findings",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The persistence row enumerates V11 §3.5.1's church-family members by name (cathedral, great_temple, church, chapel, monastery, generic-worship, generic-monastic, v.parish_church, v.chapel) instead of keying by the tag; a list that must track V11's tag membership by hand (a second home of V11's list).",
 "required": "Key the row by the church-family tag (V11 §3.5.1) if ProductEpochRows admits tag keys; otherwise cite V11 §3.5.1 as the list's home and T-check agreement.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-RESTATE-3",
 "list": "restatement_findings",
 "severity": "major",
 "units": [
  "V07"
 ],
 "text": "Every BCR-V7-n is consolidated into an item of the f file (BCR-V7-1 -> item 201; -11, -17, -18 -> item 202; -22 -> item 209; -21 -> item 432; -38 -> item 579 etc.), which the pass applies to the base; after application V07 §10 restates base text (full mechanism wording, TypeScript for PresenceWhen, ContextVector readings, DeclineOp member) in a second home (principle (1)), and BCR-V7-18's and -36's wording differs in detail from f item 202's (e.g. item 202 names ProductEpochContext's fields and ",
 "required": "Canon: V07 §10 becomes a pointer table (BCR id -> f item -> base section), the mechanism text living only in the base once applied.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-RESTATE-4",
 "list": "restatement_findings",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "V07 restates V06's street-candidate rate (V6 §3.5.2: street 'rate' 0.08) as a number; a recalibration in V06 would leave V07's '0.08' stale (principle (1)).",
 "required": "Cite V6 §3.5.2's street rate without the number.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-DUP-1",
 "list": "internal_duplications",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The records placement's contract (place/remove calls, before/after the base's placement, REPLACEMENT cases (c)/(d), rebind never offered TX-06, absorb path, keys by event.seq) is written out three to four times inside V07 (W70's cell alone ~250 words), and its type is V06's (V6 §2.1).",
 "required": "One home (§3.12 or §2.1's paragraph) citing V6 §2.1 for the type; W70 and the ProductDecl comment reference it.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-DUP-2",
 "list": "internal_duplications",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The field-system factor rows (climate, relief, culture, era) are written out in full in §2.2a's defaults table and again in §3.9 (3); the manor/village decoration rows (fishponds 0.5 within 300 m, warren 0.2, boundary stones, wayside cross, gallows) appear in §2.2a, §2.4 'Decorations' and §3.9 (6); the pins list appears in §2.4, §2.2a and §3.10. Restatement inside one volume (principle (1): one home, referenced elsewhere).",
 "required": "Keep the values in §2.2a (the rule cells) and the placement text in §3.9/§3.10; §2.4 and §3.9 (3) cite.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-ICONF-1",
 "list": "internal_conflicts",
 "severity": "major",
 "units": [
  "V07"
 ],
 "text": "The law 1 + round(log2(P / 40)) clamped 1-4 gives 4 from P ≈ 227 (log2(P/40) >= 2.5), not 'from 320' as the table row says (320 is where log2 reaches exactly 3); the value at 228-319 people differs between the two statements (4 by the law, 3 by the row's gloss).",
 "required": "Fix the gloss to '4 from about 227' (or change the law if 320 was meant, e.g. floor instead of round) — one statement, one value.",
 "closure": "conflict ruling V07-ICONF-1"
}
{
 "id": "V07-ICONF-2",
 "list": "internal_conflicts",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "§3.6 (5) glosses the centrepiece pond as 'a small decoration pond inside the green, the village pond', while §2.4 and §3.2 (8)(d) define 'the village pond' as the L0 pond VS1 carves at the lowest hollow within 150 m of the heart (pins.pond 0.4) and the centrepiece pond as a separate uncarved 'pond' part sited after the L0 batch; one name for two different ponds with different siting, carving and draws.",
 "required": "Drop 'the village pond' from §3.6 (5) (the centrepiece pond is the uncarved part of §2.4).",
 "closure": "conflict ruling V07-ICONF-2"
}
{
 "id": "V07-ICONF-3",
 "list": "internal_conflicts",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The cap 1 + floor(households / 25) reaches 6 at 125 households, i.e. about 563 people at the 4.5 mean household (§3.2 (3) H = round(P / 4.5)), not 'from 625' (139 households); the worked gloss disagrees with its own law for 563-624 people.",
 "required": "Correct the gloss to 'from about 563' (or restate the law if 625 was meant).",
 "closure": "conflict ruling V07-ICONF-3"
}
{
 "id": "V07-ICONF-4",
 "list": "internal_conflicts",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "(9v) sites an epoch's new nucleus 'at least 0.8·R_s from the existing ones', while the polyfocal rule whose cells §2.2a says (9v) reads ('polyfocal ... // §3.2 (4), §3.12 (9v)') spaces nuclei at max(polyfocal.spacingMinM = 250 m, spacingShareRs x R_s); the 250 m floor is dropped at epochs, so a small village's new nucleus may sit closer than at creation (a thorp's R_s about 100 m gives 80 m).",
 "required": "State (9v) as 'spaced by the polyfocal rule (§3.2 (4))' or record why epochs omit the floor.",
 "closure": "conflict ruling V07-ICONF-4"
}
{
 "id": "V07-ICONF-5",
 "list": "internal_conflicts",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "§13's note says V08's SR5-01 and V11's SR5-03 companions 'are §1's dependency (13), each pending with its fallback', and §12 says 'each with its fallback there', while §1 (13) (as fixed by the finalization, SR6-04 (a)) says both 'landed ... no fallback'; the volume states both that a companion is pending and that it has landed.",
 "required": "Delete the stale sentences (with the narration they sit in); §1's cross-volume list states only current facts.",
 "closure": "conflict ruling V07-ICONF-5"
}
{
 "id": "V07-XCONF-1",
 "list": "cross_part_conflicts",
 "severity": "major",
 "units": [
  "V07"
 ],
 "text": "J122 decides V07 Q1 as '(a) yes, and its tracker spike (V-M0) right after M0'; V07 §11 still lists Q1 as an open owner question with only a recommendation, §8 still says 'the order is the owner's (Q1)', and §8 lets V-M0 and V-M1 start only 'once M2b has landed and M3a's tools exist' — for V-M0 this contradicts J122's 'right after M0' (owner delegation outranks the volume, principle (3)).",
 "required": "Mark Q1 'decided (a), J122'; write J122's slot into §8 (V-M0 right after M0; V-M1 onward after M4, parallel with M5) and the combined order into §16 and INDEX.md; state what V-M0 runs on before M2b (its headless spike inputs) or record the canon's ruling on the prerequisite.",
 "closure": "conflict ruling V07-XCONF-1"
}
{
 "id": "V07-XCONF-2",
 "list": "cross_part_conflicts",
 "severity": "major",
 "units": [
  "V07"
 ],
 "text": "V07 requires 'a span over a hinterland face — field, meadow, common, pasture or wood — stays open at every rung' and registers V04's arch-vault source at every village rung; V04's span rule makes a span open only where its strip meets a part-0 way, water or flood cell, or fails the height or slope tests, and otherwise vaults it by chance (raised.vaultShare x era and culture multipliers, vaultCap 10 at each village rung) — no hinterland condition; IN-V07-2 closes FL-3 on the ground that 'V04's sp",
 "required": "Canon rules one reading at the span rule's home (V04 BCR-45 / f item 244): add the hinterland-face condition to step (2) (with its test) or withdraw V07's requirement; delete the fallback and IN-V07-2's stale reason.",
 "closure": "conflict ruling V07-XCONF-2"
}
{
 "id": "V07-ELEG-1",
 "list": "elegance_candidates",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The cross-table reference cell {ref: {table, row, cell}} with compile check and editTable inverse is defined here for village.json only; a value-held-by-reference between tables is a general table mechanism (§7.6 editable tables) and other volumes hold values owned elsewhere too (V07 itself references V11 §3.6.1, §3.24.1, §3.24.4).",
 "required": "Canon: if §7.6 or V11 already has a reference-cell form, V07 cites it; if not, lift this one mechanism into §7.6 (one shape for every table) with its compile check and undo row.",
 "closure": "elegance ruling (E-list)"
}
{
 "id": "V07-ELEG-2",
 "list": "elegance_candidates",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "territory.haPerHead (2.3) is a stored cell whose value is the sum of the FarmTable village rows (arable 1.2 + meadow 0.15 + pasture 0.6 + coppice 0.25 + timber 0.075 = 2.275), and §3.9 (1) says the farm rows 'restate' it; two homes for one quantity, and an editTable of a FarmTable row leaves haPerHead stale (principle (9): a derivation where a stored value repeats what can be derived).",
 "required": "Derive A_T's per-head area from the FarmTable village rows (keep a haPerHead override cell only if needed, with its lifecycle row), or make haPerHead a reference cell (§2.2a) to the sum.",
 "closure": "elegance ruling (E-list)"
}
{
 "id": "V07-ELEG-3",
 "list": "elegance_candidates",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "IN-V07-4 'supersedes any sentence of this volume that reads otherwise', but the body it amends was not folded: §3.4 steps 1 and 5 name the table only in words ('the defensibility table (V11's rows of item 106 (a))') and never its key walls.barriers, its row type WallBarrierRow or the arcKind column by which V11 (W65, T-V11-37) says the palisade classifies arcs; V07 §5.1 names 'the wall layer's \"show circuit\" option (V09's)' without BCR-V9-25's LayerSpec.showCircuit. The body and the note agree i",
 "required": "Fold IN-V07-3, -4 and -5 into §3.1 (1), §3.4 and V07 §4.1/§5.1 (naming walls.barriers, WallBarrierRow.arcKind and LayerSpec.showCircuit), then delete the notes.",
 "closure": "elegance ruling (E-list)"
}
{
 "id": "V07-WGAP-1",
 "list": "wiring_gaps",
 "severity": "major",
 "units": [
  "V07"
 ],
 "text": "§2.2a states 'no rule constant of §3 stands in prose alone' and T-V7-44 (C, V-M1) scans §1 and §3 for any numeric rule constant that is not a village.json cell, a class row or a cited cell (reference literals keyed to D5.n and output-neutral implementation parameters excepted); own rule constants in §3 have no cell: the palisade denseChance threshold 'dial exceeds 1.4' (§3.1 step 4), the organic auto threshold 'planned-organic dial >= 0.75' (§3.1 step 8, §2.7), the district multiplier 'δ x 1.5' ",
 "required": "Add the cells (palisade.denseDialFrom, formRules.organicDialFrom, formRules.districtDensity, palisade.pullM, palisade section widths, perimeter closeM) or cite existing ones; (9v) reads the polyfocal rule.",
 "closure": "wiring routing (V07-WGAP-1)"
}
{
 "id": "V07-WGAP-2",
 "list": "wiring_gaps",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "Three village.json cells are declared, valued and given provenance but no step reads them: density.bandWeight (1.0) is absent from §3.3's density formula (q(x) enters unweighted although §3.3 says 'every term a table cell of density'), and network.slack (1.3) and network.emptyDensity (0.15; VG 1.0 / 0) appear nowhere in §3.5's steps, seeding or finish (its density thresholds are 'populated' and the 0.05 floors; the empty-road prune reads 'populated'). A calibration of any of the three changes no",
 "required": "Either write each cell into the step that reads it (q weighted by bandWeight; the reader of slack and emptyDensity named in §3.5) or delete the three cells from the interface, the defaults row and the VG column.",
 "closure": "wiring routing (V07-WGAP-2)"
}
{
 "id": "V07-TERM-1",
 "list": "terminology",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The volume's pointer convention makes bare '§2.1-§2.7', '§3.m' and '§1-§13' mean V07's own sections while every other bare '§n.m' means the base, and V07 §4.x/§5.x are written 'V07 §n'; the same string '§2.4' therefore means V07 in V07 and the base elsewhere in the set, contrary to principle (1)'s citation forms ('see §x.y' = base; 'see V04 §3.2' = volume).",
 "required": "Canon: one citation form across the set (base '§x.y', volume 'V07 §x.y' everywhere including self-references).",
 "closure": "glossary (retired synonyms) / ID rulings"
}
{
 "id": "V07-TERM-2",
 "list": "terminology",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The symbol D names two concepts in the same subsection: the dwelling count ('D_b', 'D_v = D − D_o', 'S2's dwelling count D', W22-W23, §3.10's piers) and the sunlit share ('D(x)', 'D̄', W42 'the sunlit share D'); formulas such as '+0.3 x (D − D̄)' (W-table, §2.2a heart row) and 'D_v + D_o = D' then read ambiguously (principle (2): one term per concept).",
 "required": "Rename one (e.g. sunlit share L(x) or 'lit', or dwellings N_d) set-wide; file g item 102's shade = 1 − lit.",
 "closure": "glossary (retired synonyms) / ID rulings"
}
{
 "id": "V07-TERM-3",
 "list": "terminology",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "Wiring-row ids are numbered per volume from W1 with no volume prefix, and V07 cites V06's rows bare ('W3', 'W10', 'W75') while V07 has its own W3 and W10; the same id names two different rows (principle (4): ids unique across the set).",
 "required": "Canon: prefix wiring ids per volume (W-V7-n, W-V6-n) or always write 'V6 W75'.",
 "closure": "glossary (retired synonyms) / ID rulings"
}
{
 "id": "V07-TERM-4",
 "list": "terminology",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The bare id 'T<n>' names two different things in V07: the twelve editing tools T1-T12 of §4.1 (W21 'T9 and T11', §3.9 'rerollLayer('forest') (T10)') and the enumeration tables T1-T16 of research/sf/mapping.md (§3.11 'T14', 'T16'); 'T14' and 'T16' are outside the tool range but 'T10'-'T12' are ambiguous by form, and the reader cannot tell which list a bare 'T16' means without the research file (principle (2)/(4): one term per concept, ids that resolve).",
 "required": "Cite the mapping tables by the row-set names V08 §2.6 gives them (e.g. V08's 'conditions' row set for T16, 'government' for T14) or prefix them (mapping T16); keep bare T1-T12 for the tools.",
 "closure": "glossary (retired synonyms) / ID rulings"
}
{
 "id": "V07-DEFER-1",
 "list": "deferral_wording",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "Dependencies (1) and (6) still read as open requests with conditional fallbacks ('V04 §2.2's union lacks it; fallback: the complex is stagnant ... blockedBy left without it'; 'without V6 §3.19.2 a carried raised way stands unchanged'), and §3.12 says 'asked of V04', but both destinations already carry the fact: V04's CatacombComplex.blockedBy union includes 'rung' (V04 line 663; W-row 'CatacombComplex.blockedBy rung (C4-65 (1))') and V6 §3.19.2 'Raised ways in disuse, decline and repair' exists.",
 "required": "Delete the fallbacks and cite V04 §2.2 / V04 §3.5.1 (6) and V6 §3.19.2 as the homes.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-DEFER-2",
 "list": "deferral_wording",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "'item 110's retaining_wall, way.stair, ... aqueduct.channel (or the base's names once the coherence pass fixes them)': the role names are left conditional on a later choice (principle (6) deferral wording; principle (2) one term per concept), so V07's role list and the base's §8.2 role list may name the same roles twice.",
 "required": "Canon: fix one name per item-110 role in the base (§8.2) and have V07 cite it; drop the parenthesis.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-DEFER-3",
 "list": "deferral_wording",
 "severity": "major",
 "units": [
  "V07"
 ],
 "text": "§13 keeps two open items 'deliberately left ... documented, not a bug to re-find': FL-1 (the per-constant trace rows D5.1-D5.17 not yet written in research/findings/code-impact.md §(d); the volume cites sub-keys that do not exist there) and FL-4 (the volume's critique-id citations, e.g. C6-39, C4-110-3, V11C-02, V3C-61, C4-49 (5), which an implementer holding only the base and volumes cannot read). The owner's zero bar and no-defer rule allow no open fix-list item. Census (script): 903 citations",
 "required": "FL-4: replace every critique/seam id used as a reference by the section it landed in (V06 §3.19, V04 §3.5.x, V11 §x); FL-1: either write the D5.n rows (research lane) or cite row D5 alone; close both.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-DEFER-4",
 "list": "deferral_wording",
 "severity": "major",
 "units": [
  "V07"
 ],
 "text": "'The other minors (SR6-04 (b)-(c), SR6-08, TX-04) are on the finalization's fix list (docs/volumes/INDEX.md §7)': seam findings touching V07 left open in another file's fix list; principle (10) requires every hand-off closed at its destination and the zero bar allows none open.",
 "required": "The canon routes SR6-04 (b)-(c), SR6-08 and TX-04 to their homes and closes them (FIX or INVALID).",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-1",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "Twenty-two stacked banner/revision lines (eleven 'PENDING FABLE REVIEW' lines, one per lane, plus 'REVISED'/'RECONCILED' notes naming critique ids); principle (8) allows one marker line per volume, the close's; principle (5) removes narration.",
 "required": "Replace by the close's single marker line; drop the REVISED/RECONCILED notes (the validation records keep them).",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-2",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "PROGRESS ledger plus eight kill-safe lane ledgers (REVISION, SECOND REVISION, RECONCILIATION, ROUND-2..6, two CONTINUATION ledgers; about 105 lines) narrate how the text evolved.",
 "required": "Remove; the lane-events log and critique files keep them.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-3",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "Reading record (sources consulted, retrovalidation mention) is narration of the design's production, not design; the provenance rule it ends with (ref:VG 1.6.9 form, trace key D5/P17 of research/findings/code-impact.md, §17.1 (6), item 62) is normative and belongs cited to §17.1.",
 "required": "Keep one sentence citing §17.1 (6) for the provenance form; drop the reading list.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-4",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "About 50 lines narrate which reconciliation round's companion edits landed in which volume, by which lane and at what time ('landed by reconcile-V08-r6 (14:12)', 'Their fallbacks are withdrawn (reconciliation round 3...)'); principle (5) narration; the landed facts are the destinations' own text.",
 "required": "Replace by a short list of the cross-volume facts V07 relies on, each cited at its home (V11 §x, V08 §3.5.1, V6 §2.1), without landing history.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-5",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "Row W40 is a withdrawn placeholder ('withdrawn by reconciliation round 3 (SR2-15; J-V7.115)') kept in the wiring table; its one normative sentence (village rows carry no split switch; item 105 (h)'s threshold applies; V11 §3.7.4 splitEnabled false in parity presets) restates file g/V11 facts.",
 "required": "Delete the row (history lives in the validation records); if the 'no split switch' fact is needed, one clause citing V11 §3.7.4 in §2.4.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-6",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "'This replaces the 23:23 note's \"no vault stage … the spans stay open\".' narrates the design's history (principle (5)).",
 "required": "Delete the sentence.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-7",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "Decision rows carry superseded values and their amendment history instead of the final choice: J-V7.20 still states 'capped at 1, 3 and 6', J-V7.42 the old law '0.4 ms per km2', J-V7.45 'about 140 m at 700 people' and 'thorp radius about 60 m', J-V7.30 states 'RungProfile.splitSites = false', then its amendment to true, then its withdrawal by J-V7.115 — a row whose text asserts three contradictory states of one switch; others carry '(amended by ...)' or 'Amended in place by reconciliation round ",
 "required": "Rewrite each row to its final choice (J-V7.30 retired in favour of J-V7.115, or reduced to the declared-split and never-merged clauses); the rationale file or validation records keep the history.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-8",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "The §10 preamble narrates which revision or reconciliation round added or amended each request, with scratchpad receipt paths ('scratchpad/volumes/rcV7r4/quotes.out'), and several BCR headers carry '(amended by the second revision...)', '(reduced by reconciliation round 3...)', '(retitled and part (c) added by reconciliation round 4...)'; principle (5).",
 "required": "Drop the preamble's history and receipts; keep one sentence on what §10 is.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-9",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "About 340 lines narrate the volume's revision history (issue-by-issue change tables, receipt paths, md5s, lane times, doc_checks counts, shared-file edits in V06); principle (5): the validation records (critique/seam-*.md, lane-events.log, _integrate.md) keep them.",
 "required": "Remove the appendix after folding any still-normative sentence (IN-V07-3/-4/-5) into the body.",
 "closure": "FIX at the unit"
}
{
 "id": "V07-NARR-10",
 "list": "narration",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "§12 CONFIRMED/PLAUSIBLE is written as per-lane reading records ('For reconciliation round 3 (read in lane reconcile-V07-r3; nothing executed beyond grep, md5...)', receipts, md5s, landing times), about 190 lines of narration; the design-relevant content (which constants and readings are PLAUSIBLE until which milestone) is a few paragraphs.",
 "required": "Reduce §12 to one CONFIRMED list (sources read) and one PLAUSIBLE list (values and readings, each with the milestone that measures it).",
 "closure": "FIX at the unit"
}
{
 "id": "V07-BREF-1",
 "list": "broken_references",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "'that many v.smithy members, keyed #k, spaced 200 m (above)': no table above gives v.smithy a same-kind spacing (its profile deltas are 'clientele travellers' only; K spread 200 is v.bakehouse's), so the 200 m spacing the row relies on has no home.",
 "required": "Give v.smithy its 'K spread 200' in the profile table (the spacing's home) or correct the row to the spacing that exists.",
 "closure": "FIX at the unit"
}
{
 "id": "TX-04",
 "list": "seam-r6-open (INDEX §7 fix list)",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "docs/volumes/critique/seam-time-r6.md TX-04",
 "required": "V07 prices `village.density`'s cost at a base-product epoch (a superseded village plan's raster) in its §6, with V06 §6.2's row citing it.",
 "closure": "FIX at the unit"
}
{
 "id": "SR6-04 (b)-(c)",
 "list": "seam-r6-open (INDEX §7 fix list)",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "docs/volumes/critique/seam-settlements-r6.md SR6-04 (b)-(c)",
 "required": "V07 §12's and §13's round-6 sentences leave with the narration (V07-ICONF-5).",
 "closure": "FIX at the unit"
}
{
 "id": "SR6-08",
 "list": "seam-r6-open (INDEX §7 fix list)",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "docs/volumes/critique/seam-settlements-r6.md SR6-08",
 "required": "Ruled: V11's compiler (step 5a) is the one producer of the `v.` rows' `commonness` (the compiler produces every compiled display cell; file f rule R-c); V07 §2.4 cites it and names no script. V11 states the v.-row case in step 5a (SR6-09 (a)).",
 "closure": "FIX at the unit"
}
{
 "id": "V07:IN-V07-1",
 "list": "integration-note",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "* **IN-V07-1 (J-VI.1, clean-room).** The request field is renamed `arableFactor` (six lines; its former name coincided with a reference field and is not repeated here — reworded by the continuation, J-VI.23), and §3.8's VG slot rule defines its large-house probability in our words (\"`0.15 ÷ k`, wher",
 "required": "fold the note into the body at its home, then drop the note (S9, ID-WX)",
 "closure": "FIX at the unit"
}
{
 "id": "V07:IN-V07-2",
 "list": "integration-note",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "* **IN-V07-2 (J-VI.16).** §13's FL-2 is **closed**: volume 4's second round landed `blockedBy 'rung'`, `parish_church` among the counted churches, the maintenance mode, the ruin centre, the well pins and the `DigRule` rows (V04 §13). FL-3 is **closed**: volume 4's span rule leaves country spans open",
 "required": "fold the note into the body at its home, then drop the note (S9, ID-WX)",
 "closure": "FIX at the unit"
}
{
 "id": "V07:IN-V07-3",
 "list": "integration-note",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "* **IN-V07-3 (J-VI.17 H30; volume 8's X7).** A village birth carrying `Toll bridge` reads the `kinds` cell's `implies: 'bridge'` (volume 11's `toll_bridge` row) in the village site rule: the settlement's through route crosses its water by a bridge, whose deck may carry the toll house by `deckOk`.",
 "required": "fold the note into the body at its home, then drop the note (S9, ID-WX)",
 "closure": "FIX at the unit"
}
{
 "id": "V07:IN-V07-4",
 "list": "integration-note",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "* **IN-V07-4 (J-VI.17 H31, H32; X-V11-2, XV-V9-9).** The palisade's barrier arcs read volume 11's `walls.barriers` rows (V11 §3.16.1) keyed by the closure-arc kinds of J-VI.3; its \"show circuit\" control reads BCR-V9-25's `LayerSpec.showCircuit`.",
 "required": "fold the note into the body at its home, then drop the note (S9, ID-WX)",
 "closure": "FIX at the unit"
}
{
 "id": "V07:IN-V07-5",
 "list": "integration-note",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "* **IN-V07-5 (J-VI.4).** No village tool refuses a declaration that contradicts no dossier fact and no lock (item 101 R2): a raised stroke at a village rung is drawn as declared (the rung gate binds only generation, BCR-V7-33).",
 "required": "fold the note into the body at its home, then drop the note (S9, ID-WX)",
 "closure": "FIX at the unit"
}
{
 "id": "V07:IN-V07-6",
 "list": "integration-note",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "* **IN-V07-6 (J-VI.23, clean-room).** IN-V07-1 no longer names the retired request field (its former name coincided with a reference field). No meaning changed.",
 "required": "fold the note into the body at its home, then drop the note (S9, ID-WX)",
 "closure": "FIX at the unit"
}
{
 "id": "V07:IN-V07-7",
 "list": "integration-note",
 "severity": "minor",
 "units": [
  "V07"
 ],
 "text": "* **IN-V07-7 (J-VI.25).** The dossier trace of §1b read \"`nearbyResources[]` → DR19 → W20\", a field no digest carries; it now reads \"deposits → `site.deposits` (V08 §2.6's digest field) → DR19 → W20\", as volume 8 traces it.",
 "required": "fold the note into the body at its home, then drop the note (S9, ID-WX)",
 "closure": "FIX at the unit"
}

## disagreements
[
 {
  "subject": "J-V7.82",
  "with": "V02",
  "rulings": [
   "V02-ICONF-1"
  ]
 },
 {
  "subject": "TableId",
  "with": "V11",
  "rulings": [
   "MC-11"
  ]
 },
 {
  "subject": "TableId",
  "with": "model",
  "rulings": [
   "MC-11"
  ]
 }
]

## requests_in_f
[
 {
  "request": "BCR-V7-1",
  "id_after": "BCR-V7-1",
  "f_item": 201,
  "base_section": "1.1 What is built, in what order; the two size ladders"
 },
 {
  "request": "BCR-V7-11",
  "id_after": "BCR-V7-11",
  "f_item": 202,
  "base_section": "1.1 What is built, in what order; the two size ladders"
 },
 {
  "request": "BCR-V7-17",
  "id_after": "BCR-V7-17",
  "f_item": 202,
  "base_section": "1.1 What is built, in what order; the two size ladders"
 },
 {
  "request": "BCR-V7-18",
  "id_after": "BCR-V7-18",
  "f_item": 202,
  "base_section": "1.1 What is built, in what order; the two size ladders"
 },
 {
  "request": "BCR-V7-22",
  "id_after": "BCR-V7-22",
  "f_item": 209,
  "base_section": "2.4 Ways (the skeleton) and typed edges"
 },
 {
  "request": "BCR-V7-4",
  "id_after": "BCR-V7-4",
  "f_item": 214,
  "base_section": "2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector"
 },
 {
  "request": "BCR-V7-5",
  "id_after": "BCR-V7-5",
  "f_item": 215,
  "base_section": "2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector"
 },
 {
  "request": "BCR-V7-6",
  "id_after": "BCR-V7-6",
  "f_item": 255,
  "base_section": "2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records"
 },
 {
  "request": "BCR-V7-3",
  "id_after": "BCR-V7-3",
  "f_item": 267,
  "base_section": "2.8 Identity, lifecycle, provenance, the entity registry"
 },
 {
  "request": "BCR-V7-32",
  "id_after": "BCR-V7-32",
  "f_item": 268,
  "base_section": "2.8 Identity, lifecycle, provenance, the entity registry"
 },
 {
  "request": "BCR-V7-12",
  "id_after": "BCR-V7-12",
  "f_item": 276,
  "base_section": "2.9 The document and serialisation"
 },
 {
  "request": "BCR-V7-30",
  "id_after": "BCR-V7-30",
  "f_item": 279,
  "base_section": "3.2 Numeric policy"
 },
 {
  "request": "BCR-V7-29",
  "id_after": "BCR-V7-29",
  "f_item": 283,
  "base_section": "4.1 Stage graph, evaluation model, laziness contract, transactions, the worker"
 },
 {
  "request": "BCR-V7-2",
  "id_after": "BCR-V7-2",
  "f_item": 287,
  "base_section": "4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace"
 },
 {
  "request": "BCR-V7-33",
  "id_after": "BCR-V7-33",
  "f_item": 290,
  "base_section": "4.3 S4 Backbone — arterials routed between named destinations, built as one graph"
 },
 {
  "request": "BCR-V7-35",
  "id_after": "BCR-V7-35",
  "f_item": 290,
  "base_section": "4.3 S4 Backbone — arterials routed between named destinations, built as one graph"
 },
 {
  "request": "BCR-V7-25",
  "id_after": "BCR-V7-25",
  "f_item": 292,
  "base_section": "4.3 S4 Backbone — arterials routed between named destinations, built as one graph"
 },
 {
  "request": "BCR-V7-24",
  "id_after": "BCR-V7-24",
  "f_item": 310,
  "base_section": "4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model"
 },
 {
  "request": "BCR-V7-20",
  "id_after": "BCR-V7-20",
  "f_item": 312,
  "base_section": "4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture"
 },
 {
  "request": "BCR-V7-7",
  "id_after": "BCR-V7-7",
  "f_item": 314,
  "base_section": "4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)"
 },
 {
  "request": "BCR-V7-8",
  "id_after": "BCR-V7-8",
  "f_item": 315,
  "base_section": "4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)"
 },
 {
  "request": "BCR-V7-28",
  "id_after": "BCR-V7-28",
  "f_item": 316,
  "base_section": "4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)"
 },
 {
  "request": "BCR-V7-18",
  "id_after": "BCR-V7-18",
  "f_item": 317,
  "base_section": "4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)"
 },
 {
  "request": "BCR-V7-26",
  "id_after": "BCR-V7-26",
  "f_item": 322,
  "base_section": "4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)"
 },
 {
  "request": "BCR-V7-11",
  "id_after": "BCR-V7-11",
  "f_item": 326,
  "base_section": "4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer)"
 },
 {
  "request": "BCR-V7-15",
  "id_after": "BCR-V7-15",
  "f_item": 344,
  "base_section": "6.1 RNG and stream design"
 },
 {
  "request": "BCR-V7-19",
  "id_after": "BCR-V7-19",
  "f_item": 357,
  "base_section": "7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation"
 },
 {
  "request": "BCR-V7-13",
  "id_after": "BCR-V7-13",
  "f_item": 377,
  "base_section": "7.6 The override layer and editable tables (G-P12; owner amendment 5)"
 },
 {
  "request": "BCR-V7-14",
  "id_after": "BCR-V7-14",
  "f_item": 378,
  "base_section": "7.6 The override layer and editable tables (G-P12; owner amendment 5)"
 },
 {
  "request": "BCR-V7-9",
  "id_after": "BCR-V7-9",
  "f_item": 418,
  "base_section": "8.5 Level of detail, the city-band figure-ground contract, way selection, first paint"
 },
 {
  "request": "BCR-V7-31",
  "id_after": "BCR-V7-31",
  "f_item": 424,
  "base_section": "9.5 Furniture, framing and tools"
 },
 {
  "request": "BCR-V7-21",
  "id_after": "BCR-V7-21",
  "f_item": 430,
  "base_section": "10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)"
 },
 {
  "request": "BCR-V7-22",
  "id_after": "BCR-V7-22",
  "f_item": 431,
  "base_section": "10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)"
 },
 {
  "request": "BCR-V7-23",
  "id_after": "BCR-V7-23",
  "f_item": 495,
  "base_section": "13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file"
 },
 {
  "request": "BCR-V7-10",
  "id_after": "BCR-V7-10",
  "f_item": 505,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V7-34",
  "id_after": "BCR-V7-34",
  "f_item": 506,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V7-16",
  "id_after": "BCR-V7-16",
  "f_item": 527,
  "base_section": "§16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2"
 },
 {
  "request": "BCR-V7-17",
  "id_after": "BCR-V7-17",
  "f_item": 528,
  "base_section": "§16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2"
 },
 {
  "request": "BCR-V7-27",
  "id_after": "BCR-V7-27",
  "f_item": 565,
  "base_section": "II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)"
 },
 {
  "request": "BCR-V7-36",
  "id_after": "BCR-V7-36",
  "f_item": 576,
  "base_section": "10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)"
 },
 {
  "request": "BCR-V7-37",
  "id_after": "BCR-V7-37",
  "f_item": 577,
  "base_section": "PART III — What a later village product needs from the base (one page; the hooks are concrete)"
 },
 {
  "request": "BCR-V7-38",
  "id_after": "BCR-V7-38",
  "f_item": 579,
  "base_section": "4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model"
 }
]

## reference
[
 {
  "id": "V07-0008",
  "home_unit": "scope",
  "home_sec": "§17.1",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V07-0011",
  "home_unit": "scope",
  "home_sec": "§1.1",
  "fact": "SCOPE-0651",
  "match": "fact"
 },
 {
  "id": "V07-0012",
  "home_unit": "model",
  "home_sec": "§2.7",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V07-0096",
  "home_unit": "owner",
  "home_sec": null,
  "fact": null,
  "match": "section"
 },
 {
  "id": "V07-0100",
  "home_unit": "kernel",
  "home_sec": "§3.1",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V07-0101",
  "home_unit": "model",
  "home_sec": "§2.9",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V07-0120",
  "home_unit": "scope",
  "home_sec": "§17.1",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V07-0123",
  "home_unit": "model",
  "home_sec": "§2.7",
  "fact": "MODEL-0200",
  "match": "near"
 },
 {
  "id": "V07-0168",
  "home_unit": "model",
  "home_sec": "§2.3",
  "fact": "MODEL-0454",
  "match": "near"
 },
 {
  "id": "V07-0273",
  "home_unit": "determinism",
  "home_sec": "§7.1",
  "fact": "DETERMINISM-0244",
  "match": "near"
 }
]

## bcr_pointer
[
 {
  "id": "V07-0325",
  "bcr": "BCR-V7-1",
  "f_item": 201
 },
 {
  "id": "V07-0326",
  "bcr": "BCR-V7-1",
  "f_item": 201
 },
 {
  "id": "V07-0327",
  "bcr": "BCR-V6-1",
  "f_item": 317
 },
 {
  "id": "V07-0328",
  "bcr": "BCR-V7-19",
  "f_item": 357
 },
 {
  "id": "V07-0329",
  "bcr": "BCR-V7-25",
  "f_item": 292
 },
 {
  "id": "V07-0330",
  "bcr": "BCR-V6-26",
  "f_item": 291
 },
 {
  "id": "V07-0331",
  "bcr": "BCR-V7-36",
  "f_item": 576
 }
]

## misc
glossary_items ["V07-0175"]
handoff_items ["V07-0014", "V07-0015", "V07-0016", "V07-0017", "V07-0018"]
owner_questions ["V07-0332"]
f_items_concerning [201, 202, 209, 214, 215, 244, 245, 255, 267, 268, 276, 279, 283, 287, 290, 292, 310, 312, 314, 315, 316, 317, 322, 326, 344, 357, 377, 378, 413, 418, 424, 430, 431, 436, 495, 505, 506, 516, 527, 528, 565, 568, 576, 577, 579]
g_parts [{"item": 111, "class": "new design at build depth in every named unit; F-MISSING if absent", "part": "the village crowding map's water pull and oasis villages"}, {"item": 113, "class": "new design at build depth in every named unit; F-MISSING if absent", "part": "a village over a former city (the remnants at village rungs) and refounding at village rungs"}]
owner_questions_answered [{"q": "Q1", "subject": "when the village is built", "answer": "J122: (a) right after M4, parallel with M5; the tracker spike V-M0 right after M0"}]
shrink {"words_before": 104422, "goal_band_words_after": [62653, 78316], "narration_ranges_words": 14533, "restatement_items": 10, "bcr_blocks_to_pointers": 7}
handoffs_to_close ["V02:X13", "V02:X26", "V06:X4", "V06:X22", "V06:X27", "V06:X32", "V06:X34", "V06:X36", "V06:X43", "V08:X7", "V08:X14", "V08:X22", "V08:X23", "V09:XV-V9-9", "V10:CVR-V10-14", "V11:X-V11-2", "V11:X-V11-8", "V11:X-V11-14", "V11:X-V11-15", "V11:X-V11-17", "V12:X-V12-2", "V12:X-V12-11", "V12:X-V12-14", "V12:X-V12-16", "V12:X-V12-15", "V12:X-V12-17"]
