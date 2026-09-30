# READER base: materials, their inputs, prosperity and lifecycle (for g item 116)

Working note for OWNER RULE item 116 (owner, 2026-09-30 ~01:05 and ~01:10: material by terrain, resources and trade,
paired with prosperity; a non-native material only through a specific trade link). Facts only; the decisions are the
item's. Every statement carries its file and section. Section numbers are the coherence-pass files' (the text that will
be assembled). Whole sections were read: §2.3, §2.6's Materials rule and records, §2.7's structure records, §4.2 S0–S2,
§4.3 *Trade flow*, §4.5 *Fields* and *Neighbourhood character*, §4.7 S10b (gates, chains, class mix) and S11, §4.8, §4.9,
§4.11, §7.1's edit-target and binding tables, §7.5's transforms, §7.6, §7.7 layers 1–2, items 9–11 and the derivation
table, §8.2's roles and *Materials* paragraph, §5.2, §6.1's concern table, §6.2's digest, §10.2's row types, §14's
digest.

**File abbreviations** (all under `docs/validation/coherence/new/base/`):

| abbrev | file | sections |
|---|---|---|
| MODEL | `model/01-domain-model-and-schemas.md` | §2 |
| KERN | `kernel/01-geometry-kernel.md` | §3 |
| PIPE | `pipeline/01-s4-generation-pipeline.md` | §4 |
| CONT | `pipeline/02-s10-simulation-content.md` | §10 |
| II7 | `pipeline/10-ii7-sewer-layer.md` | II.7 |
| FAIL | `determinism/01-s5-failure-handling.md` | §5 |
| DET | `determinism/02-s6-determinism.md` | §6 |
| EDIT | `determinism/03-s7-editing.md` | §7 |
| REND | `rendering/01-s08-rendering-and-the-style-system.md` | §8 |
| EXP | `rendering/03-s11-export-and-interop.md` | §11 |
| S0, S1, S13, S14, DEL, JUD | `scope/03-s0.md`, `scope/05-s1.md`, `scope/06-s13.md`, `scope/07-s14.md`, `scope/11-delegated.md`, `scope/12-judgment.md` | §0, §1, §13, §14, delegated D-n, judgment register |

Volume text is outside this reader; it is cited only where the base points at it (V11 = `docs/volumes/V11-content.md`,
§3.19, read for the row shapes the base's `MaterialRow` holds).

---

## A. MATERIALS TODAY

### A1. `MaterialRow` (§2.6; MODEL l.844–845), verbatim

```ts
interface MaterialRow { key: { era: string; stage?: number /* FTG's per-stage default: the growth stage of the building's plot */; districtKind?: string; cls?: string /* overrides, the most specific winning: class (temples and churches stone by row), then district kind, then the stage default */;
  band?: string /* only in the optional regional-shift rows below — absent from every default row, so the default never keys a material by wealth (item 19) */ }; walls: string; roof: string; weight: number; extension?: 'regionalShift' /* §7.6's marker: a row of our optional regional shift, off by default (items 19, 23) */ }   // a rule table (§7.6): its rows are volume 11's; the rule is "Materials" below
```

- **Key:** `era` (a row key of the `era` table, `EraRow`), optional `stage` (the growth stage of the building's plot —
  `ContextVector.growthStage`, MODEL l.686), `districtKind`, `cls`; precedence "class, then district kind, then the stage
  default". `band` exists only on regional-shift rows.
- **Cells:** `walls: string`, `roof: string`, `weight: number`.
- **The regional-shift extension:** `extension: 'regionalShift'`, "off by default (items 19, 23)".
- **The rows are V11's** (V11 §3.19.3, l.3369–3392, volume pointer): each row holds a **share mix**, not one id — e.g.
  "every era · stage 1 (the core) | rubble 0.4, timber_frame 0.5, brick 0.1 | clay_tile 0.5, slate 0.2, thatch 0.3 | 1";
  class rows `church`, `chapel`, `cathedral`, `monastery`, `castle`, `palace`, `town_hall`, `guildhall` → "ashlar 0.7,
  rubble 0.3 | lead 0.4, slate 0.4, clay_tile 0.2"; district `docks`, `shanty`; STRUCTURE keys `retaining`,
  `raised:<kind>`, `pier`, `deck` (ranking above class). The material ids: walls `ashlar`, `rubble`, `brick`,
  `timber_frame`, `wattle_daub`, `cob` (+ `dry_stone`, `earth_bank`, `timber_crib`, `timber`); roofs `thatch`,
  `shingle`, `clay_tile`, `slate`, `lead`, `turf`, `canvas`. **Seam:** the base types `walls: string` / `roof: string`
  while the rows are weighted shares with `weight` 1; §2.6 does not state the per-building draw from a share mix (the
  `material` concern, A5, is its only trace).

### A2. The Materials rule (§2.6; MODEL l.1162–1174), verbatim

> **Materials (COV-FTG-F20; item 19; owner, 2026-09-26: "different materials for construction is only represented by a
> change in texture or color. It has nothing to do with the shape").** A material is a **rendering attribute only**: it
> changes the texture and colour roles the style sheet maps it to (§8.2) and never a footprint, a wing, a storey, a height
> or a roof form — the same geometry renders in any material, as in FTG; shape is decided by the designation template and
> prosperity alone (§4.7 S11). `MaterialRow` is a rule table read by S11 whose **default rows reproduce FTG's model**
> (item 23): one default material per growth stage (`key.stage`), overridden per district kind and per building class
> (temples and churches stone by row), with wealth shown through the lifestyle-banded building pools (§10.2) and the
> roof-colour role by band in the style sheet (§8.2) — never by a material keyed to the prosperity band. The **optional
> regional shift** — rows marked `extension: 'regionalShift'`, off by default, a preset row (D-2) — may shift materials
> with the prosperity band within what the region builds with, never as a universal ladder. A district's
> `materialOverride` and a building's `setAttr` override the rows; enceintes carry their own wall material (§2.7). Wear
> (`Building.condition`, item 31) is a rendering class over the same geometry (§8.2); a roof is lost only in the decline
> ladder's derelict state (`decay`, `RoofSpec.kind 'none'`, §2.8). Test: T19-3 (§13.2).

- **The clauses item 116 collides with:** "never by a material keyed to the prosperity band" (l.1169); `band?` "absent
  from every default row, so the default never keys a material by wealth (item 19)" (l.845); "default rows reproduce
  FTG's model (item 23): one default material per growth stage" (l.1166–1167).
- **The clause that stays:** "rendering attribute only … never a footprint, a wing, a storey, a height or a roof form"
  (l.1163–1166). Same rule restated at §8.2 (REND l.459–460), §4.11 Works (PIPE l.3683–3684), §10.2 (CONT l.168–170),
  plan rung "Materials stay texture only" (MODEL l.1472), DR15's bar "a material never changes a shape" (EDIT l.1755).
- **Already close to item 116:** the regional shift "may shift materials with the prosperity band within what the region
  builds with" — but off by default, a preset row, keyed by region not by site.

### A3. The records that hold a building's material

- `Building.material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable; a rendering attribute
  only (below) */` (§2.6; MODEL l.820). `condition: 'kept'|'worn'|'neglected'` sits beside it, "a rendering-class driver
  like material" (l.820).
- `RoofSpec = { kind …; pitch?; high?; material?: string }` (MODEL l.842–843), carried on `Building.roof` (l.819), on
  every `BaseWing.roof` (l.800) and every composed `Wing.roof` (l.854). §8.2 keys roof colour by `roof.material` (REND
  l.458). **Seam:** two homes for a roof material (`Building.material.roof` and `RoofSpec.material`); no rule names who
  writes `RoofSpec.material`.
- **No home for a mixed building** (the owner's "individual buildings that is a combination of the two"): `walls` is
  one string per building; no wing (`BaseWing`, l.774–808) or storey carries a wall material.
- `BuildingInput` (MODEL l.912–918) and `ClassRules.pick` (l.926: returns `cls`, `specialisation`, `heights`, `roof`,
  `template`) carry **no material**; J-A19.42 "no material column in the template or the mutator's delta" (JUD l.357);
  S11: "**Materials are not template columns** — the material rule, texture and colour only, is §2.6's (J-A19.42)"
  (PIPE l.2156–2157).

### A4. Overrides and edits of a material

- `District.materialOverride?: Partial<MaterialRow> /* §2.6 */` (§2.5; MODEL l.600).
- `setAttr` on a building's material: stated by §2.6 (MODEL l.820, l.1172) and tested by T19-3 "(T19-3) a `setAttr`
  material change leaves the geometry subtree of the digest unchanged" (S13 l.415); §8.2: "a `setAttr` of a material
  re-keys the same marks' look and moves nothing" (REND l.460).
- **Seams in §7.1:** the buildings row of the edit-target table (EDIT l.297) lists `setAttr (class, heights, roof,
  basement, knownTo, condition …)` — **no `material` path**; the binding table (EDIT l.416–428) gives T9 `shape` "the
  shape paths (a building's class, heights, roof and basement …)" and T12 `dress` style and lights — **no home tool for
  a building's material**; the districts row (EDIT l.294) and T5's `setAttr` list (EDIT l.421: kind, identity,
  `DistrictIntent`, band) **omit `materialOverride`**.
- `paint` (EDIT l.73: `target: 'roofKind'|'roofColour'|'wallColour'`; l.248 "`paint` sets roof kind, roof colour or wall
  colour on every building whose footprint centroid lies under the brush path") — colours and roof kind, not a material.
- A retaining wall's material is an edit path: "`setAttr` (material, towers, `highSide`)" (EDIT l.300), home T3 `wall`
  (EDIT l.418).
- The `setAttr` lifecycle row (EDIT l.926): "an input override at the stage that computes the attribute (… heights and
  roof: S11); implicitly pinned (§7.2)".

### A5. S11's material read, its draw and its derivation row

- S11: "roof kind by class per wing (the style sheet chooses the construction, §8.2); **materials** from `MaterialRow`
  (COV-FTG-F20; §2.6)" (§4.7 S11; PIPE l.2218–2219). Nothing else in S11 or the designation mutator (PIPE l.2223–2269)
  names a material step; `MutationStep.part.kind` has no material (PIPE l.2264).
- The draw: §6.1's concern row "`heights`, `material` | default | S11 (§4.7, §2.6)" (DET l.139).
- DR15 (§7.7; EDIT l.1755): "buildings: class, footprint, storeys, heights, materials, entrances, basements | the use's
  class and the plot's band (DR6, DR10); `site.culture` (a template-family row) | S11's designation templates (§4.7, item
  19); §2.6 | `siteplan`, `siteplan.entrance`, `heights`, `material` | a material never changes a shape".
- S11's rule evaluation is costed with its geometry: "the designation template, heights, materials, entrance" (KERN
  l.1085–1086).
- §10.2: "No row of this table names a material: a material is a rendering attribute (§2.6), and §4.11's `WorksTable`
  alone reads it, for durations — time, never shape (item 67)" (CONT l.168–170). **Seam:** false as written —
  `BuildingClassRow.salvageM3: Record<string, number>` is keyed by material (CONT l.59), and S11, II.7.6, the ledger and
  §8.2 read materials too.

### A6. Structures' materials

| structure | field | how it is chosen today | cite |
|---|---|---|---|
| enceinte | `Enceinte.material: string` | **no producer stated**: §4.8 (PIPE l.2576–2692) never names it; kinds `palisade`, `earthwork` imply timber and earth | MODEL l.1634; §2.6 "enceintes carry their own wall material" (l.1172) |
| retaining wall | `RetainingWall.material: string /* a V11 MaterialRow key: dry stone, earth bank, timber crib … */` | "drawn from the `retaining` rows **at the high side's band** (V11 §3.24.1) on the levelling stage's own stream" | MODEL l.1668; PIPE l.1897–1899 |
| raised way (viaduct, elevated, aqueduct) and piers | the way's material | "the `raisedWays.structure.pierSpacingM` band of the way's material (drawn by the `material` row **by band**; an aqueduct never timber)" | MODEL l.1824–1826 |
| bridge | `Bridge.kind?: 'stone'\|'timber'\|'draw'\|'ford'` | "stone or timber **by era and prosperity rows**" (S7) | MODEL l.1650–1653; PIPE l.2678 |
| harbour piers, moles | — | "timber or stone by era" | PIPE l.2685 |
| a building on a deck | V11 structure key `deck` | V11 §3.19.3 | V11 l.3386 |
| way surface | `Way.surface: 'paved'\|'cobble'\|'dirt'\|'planks'` | "derived at S10a's end by volume 1's rule unless edited (V01 §3.7.3)"; the era row's market paving chance | MODEL l.543; EDIT l.1500 |

**Fact:** structures already key their material by band or prosperity; buildings alone are forbidden to (A2). None of
these reads resources, geology or trade.

### A7. `MaterialLedger` and salvage

- `interface MaterialLedger { rows: { epoch: number; material: string; m3: number; from: Id /* the robbed, cleared,
  dismantled or demolished entity */; to?: Id /* the build or repair it fed */ }[] }   // item 8 (d): one per document,
  changed only by §4.11's salvage events, so inside the model digest; its only effect on the map is to weight clearance
  toward nearby building (§4.11)` (§2.7; MODEL l.1717).
- **Salvage** (§4.11; PIPE l.3529–3535): "`robStone`, `clear`, `dismantle` and `demolish` credit the town's
  `MaterialLedger` (§2.7) by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse
  … build` and a repair (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius.
  The ledger is a flow record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is
  reported (J-A8.45)." Haul radius 250 m (PIPE l.3516). J-A8.45 "salvage as a demand-weighted clearance recorded in a
  flow ledger, never a hard material budget" (JUD l.378).
- `BuildingClassRow.salvageM3` "is the class's material yield when robbed, cleared or dismantled, and the debit of a
  build or repair of that class" (CONT l.254–255). **Seam:** yields are per class, not per the building's own
  `Building.material`; the op is named `robStone` (PIPE l.3128).
- Other credits: the decline ladder's `cleared` "its material in the ledger" (PIPE l.3489–3490; MODEL l.2059–2062); a
  raised span's `dismantle` "stone credited" (PIPE l.3591); a retaining stretch `ruin` "stone taken" (PIPE l.3592);
  `fallIsland` "covered fields quarried, the stone credited to the salvage ledger" (PIPE l.3566–3567); history refounding
  "quarries the ruins for stone (the salvage ledger, below)" (PIPE l.3332).

### A8. Works durations by material (§4.11 *Works*; PIPE l.3651–3760)

- Pauses: "the weeks the calendar row does not pause for the Works' material in the town's climate (`WorksTable.pauses`:
  masonry, stone and brick, pauses in winter in temperate and cold climates; our own rows)" (l.3669–3671).
- Durations: "`WorksTable` rows keyed by kind × class (or the designation template's `works` key, §10.2) × size (storeys,
  footprint) × material … × the labour factor of the plot's band (richer, faster; a row)"; defaults "a small timber house
  2–6 … a town house 8–17; a stone house 17–52; a manor 52–156; a church 520 or more"; a `decay` Works "× 0.6 for timber
  and thatch. Material enters as a duration row only — time, never shape (the owner's materials rule, §2.6; J-A31.42
  stands for replaceability)" (l.3676–3684).
- Types: `WorksRow.material?: string /* a duration row only (item 67 (b)); never a shape input */`, `factor?: number /* a
  decay row's material factor: timber and thatch 0.6 */`; `WorksTable.pauses: { material; climate; seasons }[]`;
  `enabled: boolean /* false in the parity presets */` (l.3751–3756). STAKED shows "a material pile" (l.3691; REND
  l.418). J-A67.43 (JUD l.599).

### A9. The underground's stone quantity (II.7.6; II7 l.620–627)

> **Quarries and mine voids** — from S1's stone resource and the town's stone stock: the volume taken is the stone the
> town is built of — the wall volume of the stock whose material is stone (§2.6's material rule, read here as a quantity
> of stone, never as a shape; J-A65.45) and of the enceinte's walls and towers — × `wasteFactor` (1.6); the workings are
> laid on the frame's stone cells (`SiteResources.stone` ≥ 0.5) ranked by stone value, then nearness to the town, within
> `reachM` (2 km) … a working whose cover would be under `minCoverM` (6 m) is left to the hinterland's surface quarry (§4.9)

J-A65.45 "quarries sized by the stone the town is built of" (JUD l.590). **Seam:** under item 116, traded stone is not
quarried locally, yet this rule would size local workings by it.

### A10. Rendering and exports (§8.2, §8.1, §11.1)

- Display list: `attrs` columns "… `material`, `tintKey`, …" (REND l.34). `StyleSheet.overrides: ThematicRow[] //
  thematic layers, materials, season, weather, tints` (l.181); `ThematicRow.key` includes `'material'` (l.190).
- Roles: "the wall-material roles `wall.dry_stone`, `wall.earth_bank` and `wall.timber_crib` (item 110 (a))" (l.219–220);
  palette row l.304; contrast "each wall-material role against water ≥ 28.5" (l.309).
- **The *Materials, season, weather* paragraph** (l.458–478): "Override rows may key roof and wall colours by
  `roof.material` and the enceinte's wall material. A material is a rendering attribute only … **Wealth in the roof's
  colour, as FTG draws it (§2.6; items 19, 23; J-A19.81).** The `lit` family's default sheet keys the `roof` role by the
  building's prosperity band … read from the mark's `prosperity` column banded by §4.5's rule (the field, as labels and
  descriptions read it; **never `builtBand`**) — the richest roofs the deepest clay, the poorest the greyest: `rich`
  `#C17C46` … `squalid` `#AF8E78` … In `lit` the material picks the roof's `pattern` texture and the band row its tint, so
  the two never contend; a sheet that also keys a roof colour by material applies it after the band row … `ink` keeps
  MFCG's one roof role and `hatched` NG's two tones … The retaining walls' material roles … are picked by
  `RetainingWall.material` (V11's `MaterialRow` key) as the wall-material rows are. The model and its hash are untouched."
- Thematic layers: "FTG D7's matchers are override rows (`ThematicRow`) keyed by entity attributes (`prosperity`, `use`,
  `epoch`, `owner`, `material`)" (l.519–521).
- **Texture set** (l.706–712): 15 procedural tiles — "tilled soil, grain, pasture, meadow, orchard ground, marsh, sand,
  pebble, rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment". **Seam:** no
  tile for brick, timber frame, wattle-and-daub, cob, slate, lead or turf, although V11's ids name them.
- Default look: `ink` (DEL D-1, l.12–15), in which roofs are one role — so a building's material is invisible in the
  default look unless a `material` thematic row is on.
- **Seam — wall material's reader:** §8.2 names readers for `roof.material`, the enceinte's material and the retaining
  roles; no rule draws `Building.material.walls`. §11.1: GeoJSON lists `material` on retaining-wall runs only (EXP l.17);
  glTF "material by role" for the ground partition (EXP l.21), buildings "extruded from `baseCm` … to eave height with
  roof" with no material named.

### A11. Item 19's row, its tests and the judgments

- §0 row (S0 l.51): "| 19 every designation scales with prosperity | §4.7 S11 — the designation-template table by class
  and band; §2.6's material rule; T19-1 – T19-4 | §4.7 S11 |".
- Tests (S13 l.411–415): T19-1 templates with every band row; T19-2 size budget monotone along prosperity; **T19-3** "a
  `setAttr` material change leaves the geometry subtree of the digest unchanged"; T19-4 housing bounds. No test pins
  "never keyed by band".
- §1 buildings row: "FTG's material model as the default (item 19)" (S1 l.157).
- D-2 (DEL l.20–25): "the regional material shift (§2.6's `regionalShift` rows, off by default, texture and colour only)
  is one of its region presets (item 19)".
- Judgments: J-A19.21 "materials as a rendering attribute only, the default rows FTG's per-stage model with district and
  class overrides" (JUD l.338); J-A19.41 (l.356); J-A19.42 (l.357); J-A19.43 "geometry columns read the manifested band;
  the specialisation and the room programme read the field band" (l.358); J-A19.81 "wealth in the `lit` family's roof
  colour" (l.468); J-A8.45 (l.378); J-A31.42 (l.390); J-A65.45 (l.590); J-A67.43 (l.599); J-A26.42 (l.365).
- §14's dossier row sets include `materials` and `era` (S14 l.365–369); V08 §2.6 writes their rows (a custom record's
  `materialFamily` → a V11 material row; volume pointer).

---

## B. THE INPUTS ITEM 116 NEEDS

### B1. Terrain, relief — does the design know the local geology?

- `Terrain` (§2.3; MODEL l.414–425): `heightCm`, `features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine
  */`, `hydro`, and `geology: 'ordinary'|'soluble'|'volcanic' /* item 65: the site's rock under the frame — written by S1
  (§4.2) with the resources, or overridden by setAttr (§7.1's terrain row), **read only by II.7.6's cavern rule** */`
  (l.423). Resolved at S1 (10) from S0's relief class (P(soluble) plain 0.10 … mountainous 0.45; P(volcanic) 0 … 0.15)
  (PIPE l.387–392).
- Relief class: S0 `relief: 'auto'|'plain'|'rolling'|'hilly'|'mountainous'`, weights 0.35/0.35/0.2/0.1; a dossier's
  `site.terrain` sets it by DR1, `mountain` → mountainous (PIPE l.209–213).
- Per plot: `ContextVector.slope`, `terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'` (MODEL l.685–686).
- Shores: `bankKinds?: ChainProfile<'beach'|'rock'|'cliff'|'quay'|'marsh'>` (MODEL l.451).
- **Answer: no building-stone geology.** The design holds a stone *quantity* (`SiteResources.stone`, 0..1 per cell, B4)
  and a three-value cavern flag; no stone kind (limestone, sandstone, granite, slate) and no clay-vs-loam soil. S1 (10)
  derives "stone from slope, rock class and cliffs … timber from the forest propensity (slope and **soil class**)" (PIPE
  l.381–382) — "rock class" and "soil class" name no declared field (**seam**).

### B2. Water

- `WaterBody.kind` 'sea'|'lake'|'river'|'tributary'|'distributary'|'islet_channel'|'pond'|'moat'|'estuary'|'harbour_basin'
  |'canal'|'ditch'|'oxbow' (MODEL l.441–443); `LandUse.kind` 'marsh' (MODEL l.1684).
- Harbour: S1 (6) "Harbour candidates: coast faces with depth ≥ threshold" (PIPE l.368); the basin reserved and carved at
  S3, S7 builds its furniture (PIPE l.2681–2686).
- Water drives trade modes: "where the site has navigable water, the partners in weight order take `sea` (a harbour) or
  `river` (docks on a river) … without navigable water every partner is `road`" (§7.7 layer 2; EDIT l.1436–1441).
- Resources from water: fish "from water adjacency and reach width", clay "from low damp river flats", well yield (PIPE
  l.382–385).

### B3. Forests, timber and fuel (§4.9)

- `SiteResources.timber` "from the forest propensity (slope and soil class; realised as woods by the hinterland unit,
  §4.9)" (PIPE l.381–382). S0 toggles `forests` and the landscape toggle `logging` (PIPE l.216, l.221); "The S0 landscape
  toggles clamp a kind to zero or raise its floor" (PIPE l.385).
- Land-use kinds `coppice`, `wildwood`, `lumber` (MODEL l.1684); greenery kinds `wood`, `coppice` (MODEL l.1674–1675);
  land-use rings "gardens / closes / orchards → fields → meadow / pasture / commons → coppice → wild wood" (PIPE
  l.2728–2729).
- **Fuel and timber** (PIPE l.2749–2757): `coppiceHa = fuelM3PerCapitaYear · P / coppiceM3PerHaYear`, `managedWoodHa =
  timberM3PerCapitaYear · P / woodM3PerHaYear` (defaults 1.0 and 0.15 m³ per head-year; yields 4 and 2 m³/ha-year);
  "the lumber yards and charcoal burners are the providers … what the frame cannot hold is the settlement's **import**,
  reported and served through the gates' and the harbour's `import` rows (§4.7 S10b), never a failure (J-A26.42)". Era
  cells: `EraRow` "fuel · timber m³ per head-year" (V11 l.3358–3362).
- No land left: "the arable, fuel and timber demand is the settlement's import (reported)" (PIPE l.2709–2711).
- Outside classes sited on resources: "quarries on stone, mines on ore, lumber at the woodland edge, fisheries on the
  shore" (PIPE l.2792–2796).

### B4. Quarries, clay pits, brickworks, kilns

- Land uses: `'quarry'|'claypit'|'mine'|'lumber'|'saltpan'` (MODEL l.1684); `LandUse.source` — a quarry working a
  `fallen_island`'s rubble (MODEL l.1686).
- Outside classes (institution-like roster classes on outside plots): "farmsteads, mills, quarries, mines, lumber yards,
  fisheries" demanded by S2 (PIPE l.409–411), allocated to the hinterland pseudo-district (PIPE l.1258–1259), sited by
  S12a "after S7b, before S8" (PIPE l.2696) — so **known before S11**.
- Site-resource gates: `BuildingClassRow.requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|
  'clay')[] /* the site-resource gates S2 reads from SiteResources (§4.2) */` (CONT l.52); outside classes' `produces`
  "grain, timber, fuel, stone, ore, fish" (CONT l.167–168).
- Clay: `SiteResources.clay` (MODEL l.1689; PIPE l.383). Kiln: only the potter's split "kiln yard and shop" (PIPE
  l.2049–2051). **No brickworks, tilery or lime-kiln class in the base.**
- The underground quarry (A9) and `SiteResources.stone ≥ 0.5` workings.
- `DepositSite { …; family: string /* ore, stone, clay, salt … data */; state: 'available'|'depleted'|'removed'|
  'discovered'; bearingCdeg; landUse?: Id /* the quarry, mine or claypit LandUse it anchors (§4.9) */ }` (MODEL l.1782);
  staged, empty in the base, filled by the port (MODEL l.1948–1956). Over epochs: "`depleted` or `removed` — its quarry,
  mine or claypit `abandoned` and drawn worked out …; `discovered` — a new outside site sited by S12a's rows" (PIPE
  l.3777–3780).

### B5. Resources and deposits (dossier and standalone)

- `SiteResources { cellCm; ore; stone; timber; fish; clay; fertile: Float32Array }   // S1 output on the terrain grid,
  0..1 per cell (§4.2)` (MODEL l.1689); read by "S2's resource gates, S3's water pull, §4.5's water term, S10b's wells and
  S12a's outside sites" (PIPE l.385–386).
- Dossier: `site.deposits: { key; state; custom? }[]`, `site.isolation?: { status: string; paths: string[] }`,
  `site.terrain`, `site.access` (DossierDigest; S14 l.244–245). "the deposits come from `config.nearbyResources*`" (§7.7
  item 1; EDIT l.1589–1590).
- DR19 "the hinterland: land uses, their bearings and sizes | the realm cell's resources (optional); `site.deposits`,
  `economy.foodImportPct`, `site.isolation`, `site.terrain` | S12a and §4.9 … | `hinterland.outside` (§6.1) | **every
  listed deposit has its land use**" (EDIT l.1759); §6.1: "`hinterland.outside` … a listed deposit's bearing where the
  dossier gives none (DR19 …), its binding key hashed" (DET l.141).
- DR32 reads `stone_quarry` (burial and churches; EDIT l.1772); DR31 the mining deposits (l.1771).
- Standalone: S0's `landscape toggles: fertile land, mines, quarries, fishing, logging` (PIPE l.221) held as
  `CircumstanceSlice.landscape: { fertileLand; mines; quarries; fishing; logging }` (EDIT l.1503).
- S2 need propagation (PIPE l.479–490): providers are "the site resources `SiteResources` provides (farmland → grain,
  and timber, stone, ore, fish and clay …), the hinterland land uses …, the harbour and the gates for the `import`
  resources (§4.7 S10b), and the manifest's producing classes"; "A resource no class produces and no site provides takes
  the roster's existing substitution … and is **reported as an import**".

### B6. Climate (item 111, dry country)

- `biome` circumstance, "its climate row: aridity, the arid water chances, the water pull and the sunlight cell (items
  102, 111; V11)" (PIPE l.219–220; EDIT l.1500).
- `ClimateTable` row per biome (temperate-deciduous, temperate-coniferous, mixed, maritime, arid, cold) "sets the
  ground-cover role, the tree-species mix …, the default field system and `farmLayout` …, **the default roof form and
  pitch**, the scatter densities, and the dry-country cells" (§4.9; PIPE l.2864–2870). **No material column**; the roof
  form it sets is a shape.
- `WorksTable.pauses` by material × climate (A8). Water in dry country (PIPE l.238–246, l.2021–2024).

### B7. Trade

- **`TradePartner`** (§7.7; EDIT l.1508–1509): `{ key: string; mode: 'road'|'river'|'sea'; weight: number /* Σ = 1 over the
  partners; 0 for a hostile one */; bearingCdeg: Cdeg; relationship?: string; source: 'dossier'|'derived'|'realm' }` —
  **no goods field.**
- **The fill** (§7.7 layer 2 *Trade*; EDIT l.1431–1449): "Partners, in order: the dossier's named neighbours and the
  partners its trade links name …; with none, one derived partner per through route of the settlement's access row
  (`source: 'derived'`); standalone, one per external bearing the blueprint requests, else per through route of its
  access intent. **Weight**: a partner's listed trade links (a named neighbour with none counts one), zero for a
  `hostile` relationship or a suppressed economy …". So the dossier's per-good links are read only as a **count**.
- DR3 / DR4 (EDIT l.1743–1744): partners from "`economy.partners`, `economy.tradeLinks`, the toll and duty income rows,
  `site.access`"; bars "a `hostile` partner carries no trade; a rival's listed links are kept"; `TradeFlow` weights sum to
  one.
- **The digest's trade fields** (S14 l.247–251): `economy: { incomeSources; exports: string[]; imports: string[];
  transit: string[]; entrepot: boolean; foodImportPct?; foodChains; chains; dependencies; tradeLinks: { good: string;
  goodId: string; flow: 'import'|'export'; partner: string }[]; partners: { key; name; relationship }[] }`.
  `RealmBlock.partners: { key; bearingCdeg; distanceM?; weight? }[]` (S14 l.236–237) — no partner resources. **No base
  reader** is named for `economy.imports`, `.exports`, `.transit`; `economy.goods` reaches DR33's chain links only (EDIT
  l.1773).
- **What "a settlement that has that material" can mean to the map:** the dossier never states a partner's deposits;
  the only per-partner, per-good fact is an `import` trade link naming the good and the partner.
- `TradeFlow` (§4.3; PIPE l.836–857): gates' and harbour's weights, `dominantBearingCdeg`, ways' weights; derived, "rebuilt
  on load, never canonical" (`Document.derived.tradeFlow`, MODEL l.2283); re-read each epoch (PIPE l.3073–3075).
  "**Without a dossier** the blueprint's external bearings and the intent's trade setting fill the slice" (PIPE l.857) —
  **seam:** `Intent` (EDIT l.1473–1476) has no trade field and no "access intent".
- Gates and harbour as import points: "A gate provides the `import` resources its bearing's trade row lists and the
  harbour those that arrive by sea" (§4.7 S10b; PIPE l.2001–2002); "An import feeds its first consumer through a store (a
  warehouse, a yard) at the gate or quay facing its partner's bearing (the realm block's, items 77, 85), else the main gate
  or the harbour" (PIPE l.2042–2044).
- The supply web (items 105, 107; CONT l.213–223): `ResourceRow` "`bulk`, `perishable`, `value`, `comfortM`,
  `maxDistanceM`, `modes`, `security`, `site`, `demand` and `volume`" — the goods table is where a material-as-good would
  carry bulk and value.
- Item 72's trade term: district `trade` position from ways' trade weights (PIPE l.1370–1372); gate and main-street
  kernels × `1 + trade.kernelScale` × trade weight (PIPE l.1468–1469).
- **Isolation:** `site.isolation` is an input of DR19 only; no rule reads it. A sealed town: "a sealed town (`N = 0`)"
  (PIPE l.596). With no partner "every gate weighs the same and the harbour nothing" (PIPE l.852–853). Imports are
  unconditional today (B3, B5).

### B8. The era

- `CircumstanceSlice.era: string /* a row key of the era table (EraRow, V11 §2.8, §3.19.1): tower kinds and spacing, moat
  width, intervallum, market paving, public lighting, fuel and timber per head, pump date, harbour chain, suburb regime,
  material rows */` (EDIT l.1500); `Intent.era` (EDIT l.1475). `MaterialRow.key.era` (A1). V11's era rows are `c12`–`c15`,
  `c14` default (V11 l.3355–3368).

---

## C. PROSPERITY

### C1. The field (§4.5 *Fields*; PIPE l.1133–1149)

`P(x) = Σ_i w_i · kernel_i(x) + characterOffset(district) + ε(x)`, clamped once to [0, 1]; drivers: plaza and markets,
main streets, gates, water and harbour (+), elevation and upwind (+), low/damp/downwind/flood (−), walls (−), institution
attractors, the wealth gradient, the daylight and water terms, the three dials and the pressure; two eager passes (S6,
S10a). Soft terms' one contract (E-36): weight cell, kernel, bar; "at weight 0 the model is byte-identical"; "it yields
to dossier facts, assignments, pins, locks and declared places" (PIPE l.1157–1162).

### C2. The bands (§4.5; PIPE l.1202–1239)

- `prosperity.bands` (`BandSet`, §7.6), six bands: `squalid` 0.011, `poor` 0.011, `modest` 0.217, `comfortable` (the
  middle band) 0.435, `prosperous` 0.217, `rich` 0.109 (FTG weights 1/1/20/40/20/10) (l.1210–1217).
- "The cut points are computed **once per town** so that the share of built land in each band equals that band's share of
  the plot land the roster demands" (l.1232–1235) — **"rich" is relative to the settlement** (PIPE l.2546–2547: "The cuts
  stay the town's own (§4.5), so 'rich' is relative to this settlement"). Hysteresis 0.02 (l.1237).
- `FieldBands` record (MODEL l.628). "Bands are used **only where a table needs a class**; continuous rules …
  **interpolate linearly between band rows along the value**" (l.1237–1239).
- Parity: "a parity preset keeps the reference's tier count and shares and sets the interpolation's blend to a step at
  each cut (item 23)" (l.1230–1231).

### C3. The band range — item 72 (d‴) (PIPE l.1422–1443; CONT l.348, l.396–398)

- Owner: "this neighborhood prosperities defines the bounds (floor, and ceiling) of what any building inside of it can
  be". `District.bandRange = [floor, ceiling]` written by S10a from the pass-2 mean (derived, "recomputed on load, outside
  the model digest", MODEL l.590).
- Default rows: squalid: squalid–poor; poor: squalid–modest; modest: poor–comfortable; comfortable: modest–prosperous;
  prosperous: comfortable–rich; rich: prosperous–rich (lower half), rich alone (upper half) (CONT l.396–398).
- "**Every prosperity-driven state of a building inside the district stays in the range**: the class a new build or a
  re-designation takes …, the template row's band it reads …, its condition and upkeep, its extensions …, its occupants'
  band and its interior-ladder rung" (PIPE l.1426–1430); restated for S10b and S11 (PIPE l.2571–2573). **Interplay:** if
  a material becomes prosperity-driven, this clamp reaches it unless stated otherwise.

### C4. Three band memories on a plot — which one a material would read

- `Plot.fieldBand` — "the **occupants' band**" (MODEL l.658); `Plot.builtBand`, `builtProsperity` — "the band and the
  field value on [0, 1] the plot's present stock was built for — persisted … never recomputed from the field" (MODEL
  l.657); **manifested band** `max(field band, geometryFloor)`, `geometryFloor = min(builtBand, FieldBands.middle)`
  (§4.11; PIPE l.3031–3068).
- Who reads which: "Geometry columns read the plot's manifested band …; the specialisation and the programme read the
  field band, so a poor smith in a once-rich shell is a poor smith in a big house (item 31)" (PIPE l.2143–2144); "the
  manifested band … for what is BUILT … and the field band … for who is there and how it fares — households, condition,
  specialisation, the room programme, labels and descriptions" (PIPE l.3042–3046). The `lit` roof colour reads the
  **field** band, "never `builtBand`" (REND l.461–463). **No rule states which memory a material reads**; a material is a
  fact of the fabric (persisted on the building), like the shell.

### C5. How a building's class follows its band (item 71; PIPE l.2532–2573)

Class mix `RosterTables.classMix` "read at the plot's manifested value (J-A19.43)"; town wealth shift `max(0, 1 +
wealthShift × (wealthLevel − 0.5))`; largest classes on the most prestigious, sunniest frontages; weights "clamped into
the district's band range"; parity presets "a step at each cut … with `wealthShift` and the prestige weights 0". The
designation template: "keyed by band with its continuous columns interpolated along the plot's prosperity value and its
discrete columns switching at the band cut" (PIPE l.2133–2135).

### C6. Institutions' own wealth (the church funded by its institution)

- "workplace bands come from the class row's lifestyle band" (§4.2 S2; PIPE l.437); `BuildingClassRow.lifestyleBand:
  string` (CONT l.54).
- Significance: "`σ = BuildingClassRow.significance × rank × size × patronage` … × its patronage (1 + the dossier's wealth
  or rank of the institution when it gives one, clamped to [1, 2])" (PIPE l.1351–1358; J-A72.45).
- Today's stone church is a **class key**, not a wealth read: "(temples and churches stone by row)" (MODEL l.844, l.1168);
  V11's class rows for church, cathedral, castle, palace, town hall, guildhall (A1).
- Institutions' arrangement is "the claim's own template" (PIPE l.2167); replaceability `ruin_only` "(manors, halls,
  institutions)" (PIPE l.3011).
- The institution dial steps an institution's condition within its district's range (PIPE l.1455–1459). The band range
  (C3) binds "every prosperity-driven state of a building inside the district" — no institution exception is stated.

### C7. Items 114–115 (drafted in parallel)

`docs/validation/coherence/work/g114-115/read-base.md` §A9–§A10, §D: the base has no map-wide prosperity ceiling; the only
named ceiling is the per-district `bandRange`; the standalone slider is `Intent.wealthLevel`; cuts are per-town quantiles.
Item 116's "reserved for the very rich" meets item 114's map-wide ceiling at the top band.

---

## D. LIFECYCLE

### D1. Presets (§7.6; EDIT l.1316–1369) and the looks

- "Every rule's DEFAULT reproduces what MFCG or FTG does where they have the behaviour …; our extensions are layered
  above it as data-driven tendencies with a chance or a weight, or as options, never as fixed laws" (l.1316–1319); a cell
  that extends carries `extension: { over; mode: 'chance'|'weight'|'option' }`; the parity presets `MFCG`, `FTG` (and `VG`,
  `NG`; `FM` building-scope) "set every `extension` cell's chance or weight to 0 and its option off" (l.1323–1329);
  per-preset values `presets?: { MFCG?; FTG?; VG?; FM?; NG? }`, resolved "its own `presets` entry; else, for an
  `extension` cell, 0 …; else the cell's default" (l.1342–1349).
- "**The reading rule for absolutes:** where this document says a settlement 'always', 'never' or 'first … then' does
  something, it means 'by default, as a table value that can be changed per region, era and setting'; an engineering
  invariant … is not a settlement rule and stays absolute" (l.1331–1333). An owner-rule cell carries
  `provenance.ownerRule`, "that no calibration run, fallback or corpus layer may cross" (l.1292–1294).
- MFCG: one roof role in `ink` (REND l.471–472), no material. FTG: the per-stage material model (A2) and the `lit` roof
  colour by band (A10). Default look `ink` (DEL D-1). The regional shift is a region preset (DEL D-2).
- Other extension switches the parity presets zero: `terrace.enabled` (PIPE l.1889–1890), `siting.web.*` (CONT
  l.221–222), `works.enabled` (PIPE l.3756), item 72's dials and `trade.kernelScale` (PIPE l.1471–1472).

### D2. What is persisted and replayed

- `Building.material` is model data, hashed in the building's leaf ("attributes in schema order", §6.2; DET l.247) under
  the districts layer; T19-3 pins it outside the geometry subtree. The `MaterialLedger` sits in the content layer (DET
  l.254–255).
- Draws: concern `material` (DET l.139); concerns are u16, append-only, "adding a concern changes no other key" (DET
  l.105–110).
- `DerivationRecord.slices` (MODEL l.2005–2009) records the table slices a building consulted; "a table edit changes the
  hashes of the slices it touches, and exactly the entities whose recorded slices cite a changed slice re-derive"
  (EDIT l.1374–1383).
- `TradeFlow` derived, rebuilt on load (MODEL l.2283; PIPE l.840–841); the circumstances timeline is recipe data
  (`Recipe.circumstances`, EDIT l.1507); the dossier's carried facts in `Document.dossier` (MODEL l.2241–2245).
- Migration: §7.5's schema transforms table (EDIT l.1219–1250) — each new field gets "an older document | at first load"
  cells (e.g. "a `Terrain`'s `geology` | `ordinary`" l.1244); "What an older document never held and no rule derives stays
  absent".

### D3. Epochs (§4.11)

- Survivors "keep their built state. A re-evaluated field never re-derives them" (PIPE l.2937–2939); new stock at rung 3
  "by S11's mutator from the empty design" (PIPE l.3002–3003); regrowth-first rebuilds and reuses on old foundations
  (PIPE l.3540–3553).
- Epoch order: before S2 "`TradeFlow` is re-read from the epoch's trade slice on the current geometry"; (i) character step
  re-derives band ranges and `TradeFlow` (PIPE l.3072–3106). An epoch's slice may change partners (the timeline, EDIT
  l.1418–1423; F14 trade row, EDIT l.1857).
- Decline and salvage (A7): the ladder `occupied → vacant → derelict → ruin → cleared → reused` (PIPE l.3487–3492); dwell
  bands; haul radius 250 m (PIPE l.3507–3518).
- Fire: "a fire (an event, not a kind) | an instant destructive event (rung 3's trigger): the building `decayed` in its
  week and drawn CHARRED" (PIPE l.3698); history "a great fire burns and rebuilds a quarter" (PIPE l.3313–3314);
  `HistoryHint.scars` types "fire, flood, siege, plague" (MODEL l.1788). **No rule on what a burnt quarter is rebuilt in.**
- History-first (item 113; PIPE l.3294–3344): replay from founding or peak; destruction and refounding "builds on old
  foundations first …, quarries the ruins for stone (the salvage ledger)" (l.3327–3333); with the replay off (parity)
  "byte-identical to the base" (l.3342–3343).
- Deposits over epochs (PIPE l.3777–3780); Works (A8), none at generation and none in the parity presets (PIPE
  l.3663–3665).

### D4. Editing, locks and the dossier tiers

- `setAttr` implicitly pins the path (§7.2; EDIT l.926). A retaining wall's material: T3 (EDIT l.300, l.418).
- Two tiers (§7.7 item 9; EDIT l.1708–1723): dossier facts include "the typed slices' dossier-sourced values — partners,
  relationships and listed links"; map facts "everything else: … plots, buildings and their classes, … prosperity values,
  the settlement-level trade direction and the partners' derived bearings". So a building's material is a **map fact**;
  a partner and its listed links are **dossier facts**.
- Item 11 (EDIT l.1786–1800): "(a) no derived fact contradicts a dossier fact … the realm-level trade facts"; "The rules
  bind the DERIVATION …; a user's edit of a map fact … belongs to the user and stands" (l.1793–1794). `factTier` (MODEL
  l.2033–2050).
- Standing refusal: "dossier-owned" for an edit that would alter a dossier fact (EDIT l.1795–1800).
- Seams of A4: no `material` edit path or home tool for buildings; none for `materialOverride`.

### D5. Failure ladder and tests

- §5.2's classes (FAIL l.114–160): **no class for a material** (F-SITING, F-SITEPLAN, F-EDIT are the nearest); tiers 0–6
  (FAIL l.88–97): tier 5 substitution, tier 6 documented omission.
- Tests touching materials: T19-3 (S13 l.415); T8-5 "the salvage ledger's credits equal the yields of the robbed and the
  cleared" (S13 l.368); T26-1 "wood area lies within the fuel and timber rows' demand, the import share reported" (S13
  l.437); T67-5 no Works at generation or under parity (S13 l.650).

---

## E. SEAMS AND GAPS THE ITEM MUST CLOSE (facts, not decisions)

1. **Item 19's clauses** "never by a material keyed to the prosperity band" and "`band?` … absent from every default
   row" (MODEL l.845, l.1169), and **item 23's** FTG per-stage default rows (MODEL l.1166–1167; EDIT l.1316–1319) are the
   conflicts to state and rule; "texture and colour, never shape" (MODEL l.1163–1166) is not contradicted.
2. `MaterialRow` types one string per cell; V11's rows are share mixes; the per-building draw is unwritten (A1).
3. Two roof-material homes (`Building.material.roof`, `RoofSpec.material`), no writer for the latter (A3).
4. No home for a two-material building (walls one string; no per-wing or per-storey wall material) (A3).
5. No building `material` edit path, no home tool; no `materialOverride` edit path (A4).
6. `Enceinte.material` has no producer (A6).
7. §10.2's "No row … names a material … `WorksTable` alone reads it" is already false (A5).
8. Salvage credits by class row, not by the building's own material; `robStone` presumes stone (A7).
9. II.7.6's quarry voids size local workings by the whole stone stock, traded stone included (A9).
10. No building-stone kind; "rock class" and "soil class" undeclared; the geology flag is "read only by II.7.6's cavern
    rule" (B1).
11. `TradePartner` has no goods; the dossier's `tradeLinks {good, goodId, flow, partner}` are read only as counts;
    `economy.imports/exports/transit` have no reader; no record says which material arrives from which partner (B7).
12. Standalone partners carry no goods; "the intent's trade setting" and "access intent" are named but undeclared (B7).
13. `site.isolation` has no reader beyond DR19's input list; standalone has no isolation notion (B7).
14. Imports are unconditional: S2's unprovided resource, §4.9's timber shortfall and the no-land case are all "import,
    reported, never a failure" (J-A26.42) — the refinement forbids this for an isolated settlement's materials (B3, B5).
15. No rule says which band memory (field, built, manifested) a material reads; the `lit` roof colour reads the field
    band (C4).
16. The band range clamps "every prosperity-driven state"; the stone church today is a class key, and no institution
    exception exists (C3, C6).
17. "Rich" is per-town relative; item 114's map-wide ceiling is being drafted (C2, C7).
18. Structures already key material by band or prosperity (retaining, raised ways, bridges) without resources or trade
    (A6).
19. The texture set lacks brick, timber frame, wattle-and-daub, cob, slate, lead, turf; the default `ink` look shows no
    building material; nothing draws `Building.material.walls`; §11.1 exports it nowhere (A10).
20. `ClimateTable` has no material column (B6).
21. No material failure class, no migration row, no test that pins availability (D2, D5).
22. No rule for what a burnt quarter is rebuilt in (D3).
23. Salvaged stone from ruins is a local stone source on a stoneless site (history refounding, `fallIsland`), and the
    ledger is "never a hard material budget" (A7).
24. A `DepositSite` that is depleted or discovered at an epoch changes what is native from then on (B4).
25. The mutator and `ClassRules.pick` carry no material; S11 reads `MaterialRow` outside the template (A3, A5).
