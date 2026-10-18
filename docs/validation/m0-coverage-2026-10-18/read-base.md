# m0-coverage / read-base — what the base (docs/ARCHITECTURE.md) promises the kernel and the three levels

**Lane:** m0-coverage/read-base (opus; J394, Fable-validated). A reader: this record judges nothing; it records what
the base text says, with a cite (file:line) and READ (seen in the text) or INFERRED (my reading of what the text
implies, flagged). Started 2026-10-18 09:14Z.

**Files read** (line counts and md5 at read time):

| file | lines | md5 | what was read whole |
|---|---|---|---|
| docs/ARCHITECTURE.md | 24462 | 1f871a01961de8a4994125d7bb1993be | §2.1 (533–587), §2.2 (588–956), §2.3 (957–1087), §2.6's heights/ground datum paragraph (1710 ff.) and `Heights` (1331), §2.9 (3844–4280), §3 whole (4281–5633), §4.1 (5644–5860), §4.12 (9688–9743), §4.13 (9744–9801), §5.3 (9968–10059), §6.2–§6.5 (10403–11039), §7.3 (11641–12015), §12 (17749–18449); then every passage hit by the greps listed in the gaps section |

Cites are `A:<line>` for docs/ARCHITECTURE.md.

## Facts, in the order found

### §2.1 Layers, coordinates, units, ids (A:533–587)

1. Every model length is an integer number of centimetres (`i32`), world centred on (0,0), +x east, +y north, inside the arena frame of §3.2 (9); heights are centimetres; centidegrees (`Cdeg`, i32) are the one model angle unit; a schema lint refuses a length field without a unit in its name or type. A:535–541 READ.
2. One `Unit` vocabulary for every table column/metric/field (m, m2, ha, cm, cdeg, … z, none); V11 `ColumnSpec.unit` and V12 metric `Unit` are named subsets. A:542–553 READ.
3. `layer ∈ {underground, ground, sky, site}` is a field on every geometric entity and display item, with `z: i32` and `elevationCm: i32`. A:554–556 READ.
4. `site` layer: a world site's levels, one part per level numbered by `Document.nextSitePart` from 1 (no part 0); addresses `site<n>/kind:token`; level mapping is §2.2 rule 1's underground mapping; drawn by §8.4's underground view on its own `LayerSpec` (file k item 624); the kernel `Layer` type (`types/ids.ts`) is **appended**, K1's append-only test the bar (V14 Part E bar 1, T-V14-32); "the value is appended at M1's API pass and its parts exist only from M-SITE-A (V14 §2.1)". A:557–561 READ.
5. "The base populates only `ground`; `underground`, `sky` and `site` — and every staged record of §2.7 — are schema-complete and empty until their staged stages run" (volumes 4, 5, 14). A:562–564 READ.
6. "Layer" unqualified means one of the four model layers; display groups (labels, trees, …) are never a further model layer. A:564–566 READ.
7. Arena parts (G-R11): each layer has its own arena or arena parts keyed by `PlatKey`; ground part 0 plus one part per raised-way deck from 1; underground part 0 (sewers) plus one per underground system; one part per sky island. Every part number allocated once at creation and never reused; counters `nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`, `nextSitePart` never decrease (number is part of keys and addresses, §6.3). A:567–575 READ.
8. Whether a layer exists is decided by what the model holds, never by visibility (item 14). A:579–581 READ.
9. Ids: every entity has an address id `kind:token`, prefixed with its arena outside the ground layer (`under/`, `under<n>/`, `sky<n>/`); lineage key separate (§6.3); in memory interned `u32` handles; parent is a field, never parsed from the id; no record outside the kernel stores an arena slot (§2.2 rule 5). A:582–588 READ. (The `site<n>/` prefix is stated in item 4, A:558.)
