### E-24 — UNIFY: Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).

* **Unified form:** One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.
* **Home:** the index (scope) and each volume's §9. **Units that change:** scope, V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12.
* **Equivalence list:**
  * no row dropped
  * the governing row keeps the reason

### E-27 — UNIFY: The valley's plan reach defined twice: facadeBays' integer e and roofscape's float e (V02-ELEG-1).

* **Unified form:** One definition valleyReach(X, Y) with two arithmetic modes: integer (bays; byte-identical on every host, T-V2-13) and float64 (drawing; view data).
* **Home:** V02 §3.7. **Units that change:** V02.
* **Equivalence list:**
  * the integer form's byte-identity
  * the float form's view-only status

### E-39 — KEEP APART: Closure and decline states across the set (access states, way decline ladder, wall stretch condition, building lifecycle).

* **Home:** their homes as they stand; g item 113 (e)'s LOST state joins the access-state set (V04). **Units that change:** V04, V06, model.
* **Kept apart because:** They share an 'existence ladder' idea but differ in scope (per link, per way, per stretch, per record), values and transitions and writers; only the stretch-state profiles are one mechanism (E-01).

### E-02 — KEEP APART: Removals that hold: LifecycleEvent.detail.suppress (raised ways, harbour chains, quay walls, retaining walls, deck plots) vs V05's live SkyIsland record in state removed with removedAccesses (V06-ELEG-1).

* **Home:** file f item 260 (§2.8) states the one lift rule for both. **Units that change:** V05, V06, model.
* **Kept apart because:** An island's removal holds a count-law slot counted as filled and keeps an archived arena part and its households for undo (J-V5.62): a live record with state is needed; a suppression key on a delete event cannot hold an arena. The lift rule (undo, or the user's own re-add serving the same key; a cap increase opens only new keys) is already one (f item 260) and is stated once there.

### E-36 — UNIFY: Soft terms of the owner items (102 sunlight, 103 families and coverage, 105 supply links, 107 balance, 111 water pull) each restate the same contract clauses.

* **Unified form:** One 'soft terms' contract at §4.5 (cited by §4.7 S10b): a soft term declares its weight cell (a §7.6 table value), its kernel, its no-op pin (weight 0 → byte-identical), its bar, and yields to dossier facts, assignments, pins and locks; the field's controlled chance applies. Each item states only its own kernel, weight and specific limits.
* **Home:** §4.5 (pipeline). **Units that change:** pipeline.
* **Equivalence list:**
  * item 102: at full all-day shade about a tenth of a band; never alone moves a plot across two bands; order (terrain and wall shade in pass 1, island shade in pass 2)
  * item 103 (c): true physical needs (a watermill on water, a quay on the shore) stay hard
  * item 103 (f): coverage decides where, never how many; the dossier's count is the truth
  * item 105: every link pulls both ends
  * item 107: spread and pull in balance with the distribution column
  * item 111 (b): the water pull's weight rises with aridity; (c) the sunlight cell per climate row

### E-37 — UNIFY: Unit vocabularies: the base §2.1 units, V11's ColumnSpec.unit and V12's metric Unit (V12-TERM-2, V11-RESTATE-1).

* **Unified form:** One unit vocabulary in §2.1, the union of all three (m, m2, ha, cm, cdeg, deg, share, weight, people, count, yr, wk, m3, lvl, perHa, perKm, ratio, bits, ms, s, luma, rb, chroma, z, none); V11 and V12 type their fields by named subsets.
* **Home:** §2.1 (model). **Units that change:** model, V11, V12.
* **Equivalence list:**
  * deg (measured metric angles) and cdeg (model angles) both kept
  * count and people both kept
  * each volume's subset exactly its current list

### E-20 — UNIFY: Three copies of the owner-item bar convention in §13.2 (EL-01) and every 'no-op pin' bar of the owner items (102 (g), 103 (f), 105, 106, 110 (f), 111 (d), 113 (g)).

* **Unified form:** One convention paragraph in §13.2 ('hard unless banded; tier from §13.8; from the milestone §16 names; a staged engine's bars on hook fixtures until the engine lands; every no-op pin a NoOpPin registration on V12 §3.7.8's engine reading V11 §3.24.0's off form') cited by every group.
* **Home:** §13.2 (scope). **Units that change:** scope, V11, V12.
* **Equivalence list:**
  * the owner-rules copy's registry path-test list for amendments c
  * the declared-shift clause for goldens
  * each item's off-form cell values (V11 §3.24.0) and its bar id

