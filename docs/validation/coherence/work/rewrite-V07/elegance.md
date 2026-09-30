### E-01 — UNIFY: Stretch-state profiles on chains: RetainingWall.state (file f item 245) and Enceinte.condition (file f item 575) — the same knot-profile mechanism written twice ('exactly as item 245's').

* **Unified form:** One 'stretch-state profile' rule stated once at §2.2 rule 5 (the knot-profile rule): a ChainProfile<S> of a state enum on a chain, its canonical form, writers over a StretchRef, carry through re-derivation, cut and join, undo and migration; each record states only its value set, knot role, absent default, writers and readers.
* **Home:** §2.2 rule 5 (model). **Units that change:** model, V06, V05, V07.
* **Equivalence list:**
  * canonical form: an open chain keeps a knot on its first vertex; a closed chain needs none; drop a knot equal to the one before it (never an open chain's first-vertex knot); all-equal profile stored as the scalar; scalar default (`standing`) stored as absent
  * write: near knot carries the new state, far knot the state held before; an end that is no vertex placed first by splitThrough (§3.4); a writer naming no stretch writes the whole chain
  * read: sampleProfile by arc length (§3.4), cyclic on a closed chain
  * regenerate: a knot stays on its vertex while the vertex survives (carry-over by lattice point, §3.10, §6.3); a knot whose vertex is gone is re-placed by splitThrough at the new chain's nearest point within retaining.settings.stateSnapCm (V11, 100 cm; both records read this one cell, as item 575 states 'exactly as'), else dropped and its run merged into the run before it; an open chain's first-vertex knot always re-placed on the new first vertex
  * cut or join: carried by J-K23's rekey pairing
  * undo: the writing op's undo record restores the former profile, knot rows included
  * migrate: absent reads the default; a pre-round-2 scalar reads as the constant profile
  * RetainingWall keeps: values standing|decayed|ruined; knot role retaining_state_knot; writers BCR-V6-26's retaining member (breach → decayed, dismantle → ruined), repairRetaining, V05's landfall (decayed), V07's house-platform walls through V06's pool; restoration writes standing over the re-levelled length; readers V06 §3.19.4, V04 footings, the renderer, item 447's export, the clerk
  * Enceinte keeps: values standing|breached|dismantled; knot role wall_state_knot; writers DeclineOp breach/dismantle, V05's landfall (breached), V06's repairWall; the record's lifecycle rules (abandoned on neglect; decayed while any run is not standing; lifted by the no-stretch repairWall per V6 §2.8); §8.2's decayed row draws gap glyphs on breached runs and dismantled towers as trace discs; §11.1's wall LineStrings split per run with id and run

### E-24 — UNIFY: Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).

* **Unified form:** One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.
* **Home:** the index (scope) and each volume's §9. **Units that change:** scope, V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12.
* **Equivalence list:**
  * no row dropped
  * the governing row keeps the reason

### E-30 — UNIFY: Cross-table reference cells {ref: {table, row, cell}} defined for village.json only (V07-ELEG-1).

* **Unified form:** Lifted into §7.6 as one reference-cell form for every table, with its compile check (V11's compiler resolves it) and editTable inverse and undo row; V07 §2.2a cites it.
* **Home:** §7.6 (determinism); V11 compiler. **Units that change:** determinism, V11, V07.
* **Equivalence list:**
  * the compile check (a reference to a missing row fails the build)
  * editTable's inverse and undo row
  * V07's existing references to V11 §3.6.1, §3.24.1, §3.24.4 expressed in the one form

### E-31 — UNIFY: The toll-bridge watercourse rule written twice with different shapes (V08-ELEG-1): V08 §2.6b (3) at base rungs and V07 §3.1 (1), §3.11 DR1 at village rungs.

* **Unified form:** One rule at V08 §2.6b (3) (the DR row's home) with a rung column; V07 cites it.
* **Home:** V08 §2.6b (3). **Units that change:** V08, V07.
* **Equivalence list:**
  * geometry by rung: base — the brook crosses the through route of the longest approach inside the frame; village — the course between the two frame arcs the through road's entries divide, the topology raised to through
  * coastal dry site by rung: base — a brook; village — an estuary
  * failure → toll_bridge_dry at every rung on any of: a desert with no oasis_water and no river the arid row draws (g item 111); relief that cannot carry the brook; a fixed isolated or none access word — the union of both volumes' failure conditions, each now defined at both rung ranges (principle (11))

### E-38 — UNIFY: territory.haPerHead (2.3) stored beside the FarmTable village rows whose sum it restates (2.275) (V07-ELEG-2) — ruled as a conflict of two homes with two values.

* **Unified form:** haPerHead is derived as the sum of the FarmTable village rows (2.275 ha per head); the stored 2.3 is retired; an editTable of a farm row moves A_T with it. A declared change of value (−1.1 % territory area), recorded here: a conflict resolution (principle (3) (b)), not an elegance-only change.
* **Home:** V07 §3.9 (1). **Units that change:** V07, V11, V12.
* **Equivalence list:**
  * the farm rows' values unchanged
  * A_T = households × the per-head sum
  * V12's register: the farm rows are the calibratable cells; haPerHead leaves the register

