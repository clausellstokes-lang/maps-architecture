# Verify — the model part of the base (§2 domain model and schemas) after the coherence rewrite (round 0)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-model-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-model-r0`, cloud continuation 2026-10-03)
- P1 model part extracted from the live base and the archive, diffs per subsection: done (live §2 = `new/base/model/01` byte for byte)
- P2 mechanical checks (references, ids, retired terms, deferral, narration): done
- P3 inventory check (every id of inventory-model.json, 609): done
- P4 canon routes (f and g items, conflicts, wiring, elegance, open findings, agreement, edges): done
- P5 section reads of the whole live §2; every removed hunk against the archive; cross-part notes addressed to model: done
- P6 issues, results file, LANDED: done

**Result in brief.** 35 issues — 1 blocker, 21 major, 13 minor. Owners: model 25, pipeline 4, determinism 3, V06 1,
V07 1, V09 1. Ten coincide with issues sibling verifiers raised (named in each row); apply each once.

## Inputs

The live base `docs/ARCHITECTURE.md` (sha256 `70ce49bf…`; §2 = lines 477–3056, identical to
`docs/validation/coherence/new/base/model/01-domain-model-and-schemas.md` but for trailing blank lines); the archive
`docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` (§2 = lines 469–2450); the twelve live volumes and their archives;
`inventory-model.json` (609 ids), `canon.json` (the model unit's routes: 496 state, 77 reference, 36 glossary items, 88 f
items, 6 g parts, 14 conflicts, 7 wiring gaps, 5 elegance rulings, 44 open findings, 12 agreement disagreements, 3
undefined and 1 untested edges, 3 undefined combinations), `edges.json`, `rewrite-model.md` with
`work/rewrite-model/mapping.tsv`, `f_bcr_texts.md` and `bcr_blocks.json`; every other rewrite report's cross-part notes;
`assemble-r0.md`'s reference check; `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md` (items 102–114);
the sibling verifiers' results files under `results/`. Scratch: `scratchpad/coherence/vm0/` (the split sections, the 602
removed hunks, the inventory token check, the f-quote coverage, notes).

## Method

1. §2 split from the live base and the archive; a word-level diff per subsection (§2.0 – §2.9) produced 602 removed or
   replaced hunks (3 395 words). Every hunk was read with its context and classified: moved within §2, stated at its home
   (the home read), or lost.
2. The whole live §2 (2 580 lines) was read section by section against the f items' BCR texts and the g items 105, 106,
   109, 110, 111, 113 and 114.
3. Every inventory id token-checked against the live §2 (601 of 609 with every distinctive archive token present; the
   8 others checked by hand at their homes: II.1, §12.6, V02 §2.3, V05 §2.1), and every one of the 42 `reference`
   dispositions of the mapping table checked at the home it names.
4. Every f item's quoted *New:* text for a §2 heading measured for 4-gram coverage in the live §2 (78 quotes); every
   quote under 0.8 diffed word by word against its best-matching live passage; every BCR block in `bcr_blocks.json`
   with a §2 heading checked for routing (two §2 parts of f items routed elsewhere, 429 (a) and 335 (a), are not in §2).
5. Mechanical sweeps: the canon's 30 retired-term patterns; deferral, vague-wording and narration patterns; every `J-`,
   `T-`, `D-`, item and review id of the archive against the live text (none dropped); all 103 `Vnn §x.y` targets cited
   from §2 resolved; every `§2.x *label*` and `§2.2 rule n` / *Entrances* rule n pointer from the rest of the set
   resolved; entity interfaces without `lifecycle` (MC-02).
6. The canon's 14 conflict rulings, 7 wiring gaps, 5 elegance rulings (each equivalence item against the f texts), 44
   open findings, 12 agreement subjects and the routed edges and combinations checked at the live text and at the other
   units' homes; the readers and writers §2 names were looked up at their homes.
7. Every cross-part note addressed to model by the kernel, pipeline, determinism, rendering and scope reports and by the
   twelve volume reports checked against the live §2 — the kernel ran beside model, the volumes and pipeline after it,
   so none of their notes had reached §2.

## Sizes and the shrink audit

| subsection | archive words | live words | change |
|---|---|---|---|
| §2 intro + §2.1 | 768 | 839 | +9 % |
| §2.2 | 6 177 | 6 498 | +5 % |
| §2.3 | 1 524 | 2 205 | +45 % |
| §2.4 | 352 | 741 | +111 % |
| §2.5 | 3 792 | 4 685 | +24 % |
| §2.6 | 14 987 | 18 428 | +23 % |
| §2.7 | 4 747 | 8 707 | +83 % |
| §2.8 | 4 175 | 5 661 | +36 % |
| §2.9 | 6 004 | 6 391 | +6 % |
| **§2** | **42 526** | **54 155** | **+27.3 %** |

The unit grew instead of shrinking into the 25–40 % band. The editor's reason holds — 88 f items and six g items applied
at build depth (≈ 13 500 added words), of which ≈ 3 400 words were removable without touching content — so the growth is
not a defect (principle (9)). No subsection shrank by more than half, so the mandatory nuance audit was not triggered;
the removed hunks were nevertheless read in full (step 1), which found one constant set lost to a restatement cut
(VM0-01).

## Findings

| id | sev | kind | owner | where | claim (short) | coincides with |
|---|---|---|---|---|---|---|
| VM0-01 | blocker | NUANCE-LOST | model | §2.6 rule 4 *Cost* (l. 1536–1542) | the assumed core mix and its brush basis cut to "§12.6's", which lacks them | — |
| VM0-02 | major | F-MISSING | model | §2.1 *Arena parts*, §2.2 `PlatKey`, rules 1–2 | g 110 (b)'s ground parts ≥ 1 stated nowhere they are cited from | AL-22 |
| VM0-03 | major | F-MISSING | model | §2.8 l. 2566–2580; §2.8 l. 2003; §2.7 | g 114 (c) not applied: the suppression bullet and `detail.suppress` remain | VR0-10, MODEL-G114 |
| VM0-04 | major | WIRING | model | §2.7 `RaisedWayRecord`; §2.2 rule 7 | a raised way's two feet, read by §3.4, §3.6, §3.10, have no field and no role | — |
| VM0-05 | major | EDGE-UNDEFINED | model | §2.2 rule 5 *Stretch-state profiles* | a mid-chain stretch write leaves knot ordinals out of chain order | — |
| VM0-06 | major | WIRING | model | §2.3 `Terrain` | `Terrain.mining` written by S1 (10), read by II.7.6, never declared | — |
| VM0-07 | major | WIRING | model | §2.7 `SiteResources` | the well-yield raster S1 (10) writes and four stages read is not a field | — |
| VM0-08 | major | WIRING | model | §2.5 `Plot`, `Block` | `Plot.platformCm`, `Block.platformCm` (§4.7's levelling) never declared | — |
| VM0-09 | major | CONFLICT | model | §2.7 `Person.key` | §10.3 keys a successor by `Person.key.bornWeek`; §2.7's key has no such field | — |
| VM0-10 | major | F-MISSING | model | §2.7 `Use`, `Household` | f 429 (a)'s `Use.strain?` and f 335 (a)'s `Household.transit?` absent | — |
| VM0-11 | major | F-MISSING | model | §2.6 l. 1404 | f 221's table-migration row: the old-to-new id pairs are stated nowhere | — |
| VM0-12 | major | LOST | model | §2.7 `Enceinte.waterfront` (l. 2102) | what `quay_wall` and `sea_wall` build is no longer defined anywhere | — |
| VM0-13 | major | WIRING | model | §2.7 `HistoryHint` (l. 2264) | the fields V08 fills and §4.11 reads are undeclared | AH-07, MODEL-HH-1 |
| VM0-14 | major | WIRING | pipeline | §4.2 S3 (6) l. 4929; §4.5 l. 5550 | `spring.flow` weights the water pull per §2.3 and V06 W82, but no pull reads it | — |
| VM0-15 | major | CONFLICT | pipeline | §4.9 l. 7155 | `garden_irrigated` against §2.7's `LandUse` kind `garden` | AF-01 |
| VM0-16 | major | CONFLICT | V07 | V07 §3 l. 1957 | `garden_irrigated` against §2.7's `garden` | — |
| VM0-17 | major | CONFLICT | pipeline | II.6 l. 18243, 18245 | the network stage reads the dropped stored `flowToward` "(§2.4)" | — |
| VM0-18 | major | BROKEN-REFERENCE | determinism | §7.5 schema transforms | the migration rows §2 cites "(§7.5)" for are absent | — |
| VM0-19 | major | WIRING | determinism | §5.4 `GenerationReport` | `Recipe.presetId`'s reader "the report's recipe line" does not exist | — |
| VM0-20 | major | WIRING | V09 | V09 | `Recipe.presetId`'s other reader, "the reader's recipe panel", does not exist | — |
| VM0-21 | major | LOST | determinism | §7.6 | `type TableId` declared nowhere in the set | AF-16, AL-25 |
| VM0-22 | major | WIRING | model | §2.9 *View state* | the view key `cvdVariant` §8.2 and T112-1 read is not in §2.9 | VR0-05 |
| VM0-23 | minor | TERM | model | §2.2 rule 1 l. 614; `LandUse.face` l. 2161 | hinterland "lots"; §4.9 now says "outside plots" | — |
| VM0-24 | minor | NARRATION | model | §2.5 l. 1073, 1120; §2.7 l. 2134, 2370, 2381 | review and change-request ids and "(cross-part note)" in design text | VV12-21 (part) |
| VM0-25 | minor | ID | model | §2.6 *Basements* l. 1829–1830 | a milestone note pasted into a parenthesis, citing J-S23.2 from outside the set | — |
| VM0-26 | minor | CONFLICT | model | §2.3 *The oasis* l. 978 | "kind `pond` or `lake`" — every writer makes a `lake` | — |
| VM0-27 | minor | CONFLICT | model | §2.4 l. 1046 | "`WayClass` is unchanged" while `aqueduct` joins it | — |
| VM0-28 | minor | WIRING | model | §2.3 l. 987; §2.8 l. 2706 | the failing spring cited "(V06)"; `spring.flow`'s hand edit missing from the registry | — |
| VM0-29 | minor | NEW-PROBLEM | model | §2.7 `RetainingWall` l. 2145 | `buttresses?: …; towers?: …` carry no type | — |
| VM0-30 | minor | CONFLICT | pipeline | §4.8 l. 6949 | thickness, height and walk "are a ChainProfile" against §2.7's class profile | — |
| VM0-31 | minor | WIRING | model | §2.7 `walkCm` l. 2107 | names readers (§11.1's VTT, §8.3) that do not read it | VR0-27 |
| VM0-32 | minor | TERM | model | §2.1 l. 505–507 | the subsets are `ContentUnit` and `MetricUnit` now | VV1112-25 |
| VM0-33 | minor | BROKEN-REFERENCE | model | §2.7 `underuseSince` l. 2113 | `contract.occupiedShareMax` is V06 §2.2's, not V11's | VV1112-26 |
| VM0-34 | minor | WIRING | model | §2.7 `HistoryRecord.buried` l. 2269 | the writer of `buried` is unnamed (V04's `BuriedFormer.lay`) | — |
| VM0-35 | minor | CONFLICT | V06 | V06 §2.9 l. 666, §2.10 lifecycle row l. 761 | "written by the use phase only" against f 429 (a) and §2.8's `setAttr` | — |

### VM0-01 · BLOCKER · NUANCE-LOST · model

**Claim.** §2.6 wing-carrying rule 4's *Cost* (base l. 1536–1542) cut the archived cost model's constants — "On an
assumed core mix — 55 % row quads, 25 % one-wing houses, 18 % tiled, 2 % overlapping — 450 buildings, §12.6's district
ceiling and about what a 150 m brush (≈ 7 ha) covers in a dense CITY core, cost ≈ 0.4 ms per pass and ≈ 3.6 ms in the
worst case of a step and eight halvings, inside §12.6's warp Apply budget, which counts it" — to "The per-pass and
worst-step totals on an assumed core mix, and M3a's measurement with its pre-decided fallback, are §12.6's" (mapping
MODEL-0302: a reference to §12.6). §12.6 (l. 14980–14983) states the two totals "on an assumed core mix" but neither the
four shares nor the brush basis; the shares survive only in V02 §6 (l. 2930), which cites "§2.6's assumed core mix (its
cost note)" and names the fourth class "with towers" where the archive said "overlapping". A constant set and its
provenance lost from its home after a restatement cut.

**Required change.** §2.6 rule 4 *Cost*: replace "The per-pass and worst-step totals on an assumed core mix, and M3a's
measurement with its pre-decided fallback, are §12.6's." by "On an assumed core mix — 55 % row quads, 25 % one-wing
houses, 18 % tiled, 2 % overlapping — 450 buildings, §12.6's district ceiling and about what a 150 m brush (≈ 7 ha) covers
in a dense CITY core, cost ≈ 0.4 ms per pass and ≈ 3.6 ms in the worst case of a step and eight halvings, inside §12.6's
warp Apply budget, which counts it; M3a's measurement and its pre-decided fallback are §12.6's (R12-14)." V02 §6's
"2 % with towers" then reads "2 % overlapping" (V02's text, owed to this home).

### VM0-02 · MAJOR · F-MISSING · model (= AL-22)

**Claim.** g item 110 (b)'s ground parts ("ground parts from 1, allocated once and never reused, as the underground's and
sky's parts are"; J-RM3) are stated only by the counter `Document.nextGroundPart` (§2.9, l. 2745). §2.1 *Arena parts*
(l. 516–527) lists the ground, the underground parts and the sky parts and names only `nextUndergroundPart` and
`nextSkyPart`; §2.2's `PlatKey` comment (l. 543) gives part 0 = the ground and no ground part ≥ 1; rule 1's *other arenas*
list has no raised part and rule 2 (l. 655) lists the separate arenas without it. Yet §2.4 (l. 1041 "ground parts ≥ 1"),
§2.7 (l. 2131, 2296 "(§2.1)"), §2.9 (l. 2746 "§2.1 Arena parts") and §3.4 (l. 3689 "§2.2's `PlatKey`") cite those homes
for it. The rewrite report's g-item table claims §2.1 and §2.2 carry it.

**Required change.** (1) §2.2 `PlatKey` comment: after "part 0 = the ground, or the underground's sewer network;" insert
"ground parts ≥ 1 = one arena per raised way's deck (g item 110 (b); §2.7's `RaisedWayRecord`);". (2) §2.1 *Arena
parts*: after "the ground;" insert "one ground part per raised way's deck, numbered from 1 (g item 110 (b));" and make the
counters sentence "the counters `Document.nextUndergroundPart`, `Document.nextSkyPart` and `Document.nextGroundPart` (§2.9)
never decrease". (3) §2.2 rule 1, *The other arenas*: add "* **A raised way's part** (g item 110 (b); §3.4): L0 its outer
ring — the ground's frame plus its context margin, growing with it (§3.2 (9)) — carrying `margin` on its way's record; L1
the way's `way` chain with its two feet; L2 the deck band `corridorUnion` builds (§3.7); no L3 or L4 (a raised deck carries
no plot, §2.7 *Deck plots*)." (4) Rule 2: "The ground, each raised way's part, each underground part and each sky island
are separate arenas".

### VM0-03 · MAJOR · F-MISSING · model (= VR0-10, MODEL-G114)

**Claim.** g item 114 (owner rule, filed 2026-10-03, taking precedence over f item 260 and J-VI.14) names §2.8: "the
suppression bullet replaced by (c)". Live §2.8 (l. 2566–2580) still states "**Removals that hold — suppression (J-VI.14).**"
— a retired G-suppress phrase as well, introduced by the rewrite — with `LifecycleEvent.detail.suppress` (l. 2479, its
comment "a removal that holds"), generators counting suppressed keys "as filled against its caps", the islands' removed
slots counted as filled, the lift rule, the withdrawn words "The city will not rebuild this aqueduct; undo brings it back",
and "the deletion holds through regeneration, every absorb and every epoch". §2.7 says "a removal of a generated way /
wall / deck plot is a suppression (§2.8)" (l. 2339, 2359, 2372) and `SkyIsland`'s `removed` and `removedAccesses` are "the
suppression's island form" (l. 2217).

**Required change.** §2.8: replace the bullet by "* **A delete of generated content is for now (g item 114 (c)).** A
delete of one generated instance — a raised way, a harbour-mouth chain, a quay wall, a retaining wall, a deck plot, an
island or a sky access — removes it as any generated content and holds while the town is unchanged (a plain Regenerate, a
reload and crash recovery give the map as the author left it), and lapses when the town next changes in a way that
re-reads that kind: the next epoch, a New random over a place it crossed, or a Re-derive of the stage that builds it; the
generator then decides afresh and, while the kind's *Built by the town* switch is on (§7.6, §7.8; V09 §4.14), may build
one again. A deleted instance never counts against its kind's caps; undo restores it; **Build it again** makes it the
author's own (declared). An island keeps its archived arena part and households for undo (V05 §2.1). What the author
never wants is the switch's job (g item 114 (a)–(b)); the delete's dry run and history row read V09's `info.remove.holds`
row (g item 114 (d)). Generated content no dossier record binds (§7.7 item 3) is deleted the same way." Drop `suppress?`
from `LifecycleEvent.detail` (an older document's `detail.suppress` entries migrate as plain deletions that lapse at the
next change, §7.5). §2.7 *Raised ways*, *Retaining walls*, *Deck plots*: "a removal of a generated … is a suppression
(§2.8)" → "a delete of a generated … is for now (§2.8)". §2.7's `SkyIsland` base reads: "`removed` and
`removedAccesses` (the suppression's island form, §2.8)" → "`removed` and `removedAccesses` (a removed island's archived
part and accesses, kept for undo, §2.8; no slot counted as filled, V05)".

### VM0-04 · MAJOR · WIRING · model

**Claim.** §3.4 (l. 3701–3712) makes a raised way's two feet — where its ramps or stairs meet part 0 — ends that "each
name their part (`{ part; at }`)", one vertex on part 0 and one on the raised part, placed, kept or stripped by one
transaction per part; §3.6's held list (3) holds them under a part-0 warp (l. 3980); §3.10's stored-references row checks
"a raised way's two feet each in the part its end names" as an indexed role of §2.2 rule 7 (l. 4310). §2.7's
`RaisedWayRecord` has no feet field and rule 7's vertex row no role for them: a dangling input (kernel cross-part note 5).

**Required change.** §2.7 `RaisedWayRecord`: add `feet: [RaisedFoot, RaisedFoot] /* its two ends where the ramps or
stairs meet ground part 0, in deck order: written by the raised-way generator and the hand operator, re-placed by the
way's re-derivation one transaction per part (§3.4), held under a part-0 warp (§3.6) */` with `type RaisedFoot = {
ground: { part: 0; at: VertexRef /* ('raised_foot', way id, 2k) */ }; deck: { part: number /* the way's
Identity.key.part */; at: VertexRef /* ('raised_foot', way id, 2k + 1) */ } }`; §2.2 rule 7's vertex row gains the
indexed role *`raised_foot`* ("a raised way's foot, one vertex in each of the two parts it joins, §2.7; item 110 (b)").

### VM0-05 · MAJOR · EDGE-UNDEFINED · model

**Claim.** §2.2 rule 5 *Stretch-state profiles* — *Write* places a knot at each stretch end and the canonical form drops
equal knots, but no rule sets the knots' ordinals. A `breach`, `dismantle`, repair or landfall inside a profiled chain adds
knots between existing ordinals, and §3.10's stored-references row requires "every `ChainProfile`'s knots lie on its chain
in ordinal order" (l. 4310): the write's outcome is an `E_INVARIANT` (a stage bug in generation, F-REDERIVE after an edit)
with no defined ordinal rule (kernel cross-part note 6). No test exercises a mid-chain write.

**Required change.** Rule 5 *Stretch-state profiles*, *Write*: append "After the knot placement and the canonical-form
drops the writer renumbers the profile's knot rows `0 … n − 1` in chain order — from the chain's first vertex on an open
chain, from the lowest surviving ordinal's vertex counter-clockwise on a closed one — within the same batch (strip and
re-add by `retypeEdges`); a dropped knot leaves by `removeEdges` on its `VertexRef` (§3.4's doors). So §3.10's
ordinal-order check holds after every write." Scope adds to §13.2's T110-1 the clause "a mid-chain `breach` then
`repairRetaining` on a profiled retaining wall leaves its knot ordinals in chain order (§3.10's row)".

### VM0-06 · MAJOR · WIRING · model

**Claim.** §4.2 S1 (10) (l. 4743–4748): "S1 records it as `Terrain.mining` (§2.3), which II.7.6's cavern rule reads for
its mine boost and fissure variant"; II.7.6 (l. 18991) reads `Terrain.mining`. §2.3's `Terrain` (l. 890–900) has no
`mining` field — written and read, never declared, with no lifecycle or migration row.

**Required change.** §2.3 `Terrain`: after `geology` add `mining: boolean /* item 109 (a) (2): the site holds mining —
SiteResources.ore ≥ 0.5 over the frame, a mining class in the roster or a dossier mining deposit — written by S1 (§4.2 S1
(10)); false on a sky island's terrain and in the parity presets; read only by II.7.6's cavern rule; absent reads false
(§7.5) */`.

### VM0-07 · MAJOR · WIRING · model

**Claim.** §4.2 S1 (10) (l. 4734–4737) makes **well yield** one of the `SiteResources` rasters ("by V11's water table"),
read by S3's water pull, §4.5's water term, S10b's wells and S12a's outside sites (also l. 4930, 5551, 6373, 6634). §2.7's
`SiteResources` (l. 2165) declares `ore`, `stone`, `timber`, `fish`, `clay`, `fertile` only.

**Required change.** §2.7 `SiteResources`: add `wellYield: Float32Array /* item 111 (b): ground-water yield 0..1 by ground
class — alluvial ground, a dry riverbed's gravels, low ground by the water table — by V11's water table (§4.2 S1 (10));
read by S3 (6)'s water pull, §4.5's water term, S10b's wells and S12a's outside sites */`.

### VM0-08 · MAJOR · WIRING · model

**Claim.** §4.7's levelling (l. 6244): "A levelled unit is a **platform datum** (`Plot.platformCm`, `Block.platformCm`,
§2.5) and never a write to the `Terrain` raster"; `levelledGroundCm` (§2.6 *Heights*, l. 1611) reads "the platform datum
of the levelled plot, block or ward". §2.5's `Plot` and `Block` (l. 1110–1137) declare neither field.

**Required change.** §2.5 `Block` and `Plot`: add `platformCm?: Cm /* item 110 (a): the levelled unit's platform datum
— written by §4.7 S10 (a block, and a ward's blocks) or S11 (a plot) when it levels the unit; read by `levelledGroundCm`
(§2.6, §4.7); absent: unlevelled; model data in the digest; migrated absent */`, and state in §2.6 *Heights* that a
levelled ward's datum is carried by its blocks' `platformCm` (or name the record pipeline gives the ward).

### VM0-09 · MAJOR · CONFLICT · model

**Claim.** §10.3 (l. 13897–13909) keys a successor by "its `bornWeek` (§2.7; a founding member's key unchanged, a
successor's `bornEpoch` held as 0)" and "the successor keyed by that week (`Person.key.bornWeek`)". §2.7's `Person.key` (l.
2195) is `{ household; ordinal; bornEpoch }` — the identity key §10.3 relies on is undeclared (pipeline cross-part note).

**Required change.** §2.7 `Person.key`: `{ household: Id; ordinal: number; bornEpoch: number; bornWeek?: number /* a
successor's: the death week of the person it succeeds (§10.3); absent on a founding member, whose key is unchanged; a
successor's bornEpoch is 0 */ }`.

### VM0-10 · MAJOR · F-MISSING · model

**Claim.** Two f items' §2.7 parts are absent: f item 429 (BCR-V6-4 (a), heading §2.7): "insert before `lifecycle` V6
§2.9's `strain?: { kind: 'demand'|'supply'; sinceWeek: number }` (model data; written by the use step and by `setAttr`)";
f item 335 (BCR-V6-17 (a), heading §2.7): `Household.transit?`, epoch-local. The canon routed both items to pipeline
(§10.2) and determinism (§5.3) with no `also`, so neither part reached §2.7; §2.8's registry already lists "`Use.strain`
(`setAttr`)" (l. 2692) for a field `Use` (l. 2185–2192) does not have, and V06 W12 and W39 name "§2.7 `Use`" and "§2.7
`Household`" as their homes.

**Required change.** §2.7 `Use`: before `lifecycle` insert `strain?: { kind: 'demand'|'supply'; sinceWeek: number /* the
epoch week the condition began */ } /* f item 429 (a): the use step's memory — model data, written by the use step (V06
§2.9, §3.9) and by setAttr; cleared when the condition ends */`. §2.7 `Household`: insert `transit?: { cause:
'fire'|'flood'|'topple'|'contraction'|'works'|'island'|'void'|'clearance'|'redevelopment'; since: number /* week */ } /* f
item 335 (a): epoch-local — written by the batch of an epoch event that displaces the household, cleared by the batch that
places it, never present after the epoch's last batch, so never in a snapshot (V06 §2.1) */`.

### VM0-11 · MAJOR · F-MISSING · model

**Claim.** f item 221 (BCR-V2-06) replaces `PathShapeRow` by `type PathShapeRow = MassingFamilyRow` "by the
table-migration row below" and states that row: "the base's five item-59 family ids, in the order of
`PathShapeRow.family`'s union, map one to one onto `regularCourt`, `starCourt`, `chordArc`, `rectCourt` and `gridWalk`; the
`family` union itself is re-typed as `MassingFamilyId`; a document or table naming an old id is rewritten on load". Live
§2.6 (l. 1404) cites "§7.6's table-migration row maps the old ids one to one", but §7.6 holds no such row and, with the
archived interface gone, the old ids (`ring`, `star`, `arc`, `rect`, `snake`) appear nowhere in the set (V02 §2.3 l. 810
also cites "item 221's table-migration row"). The mapping a migrating table or document needs is lost.

**Required change.** §2.6, after `type PathShapeRow = MassingFamilyRow;`: "**The table-migration row** (§7.6's keyed row
operations), applied before M6 ships any document: `ring` → `regularCourt`, `star` → `starCourt`, `arc` → `chordArc`,
`rect` → `rectCourt`, `snake` → `gridWalk`; the `family` union re-typed as `MassingFamilyId` (V02 §2.1); a document or
table naming an old id is rewritten on load." — and the type comment's "§7.6's table-migration row" reads "the
table-migration row below".

### VM0-12 · MAJOR · LOST · model

**Claim.** The archived `Enceinte.waterfront` comment defined its values: "open (MFCG's default and FTG's captured open
chain: no wall along quays and beaches), quay_wall (a wall along the waterfront) or sea_wall (a full wall)". The live
comment (l. 2102; g item 106 (d) applied) says only when each is chosen; §4.4 S5a (l. 5285–5288) keeps the provenance of
`open` and the derivation, §4.8, V11 §3.16's threat rows and the exports only name the values. What a `quay_wall` and a
`sea_wall` build — the distinction — is defined nowhere in the set.

**Required change.** §2.7 `Enceinte.waterfront` comment: begin "`open` — no wall along quays and beaches; `quay_wall` — a
wall along the waterfront with sea gates; `sea_wall` — a full wall closing the water side;" then the live text from
"open by default; …".

### VM0-13 · MAJOR · WIRING · model (= AH-07, MODEL-HH-1)

**Claim.** §2.7's `HistoryHint` (l. 2264) declares `ageYears` and `scars` only. V08 §2.6c (3) and its field table (V08
l. 603–605) fill `HistoryHint.founding`, `.events` (numeric severity), the tier, population and calamity histories,
`lifecycle`, the ancient fall and the peak with its evidence; §4.11 (l. 7649) reads `HistoryHint.peak`; V09 §4.21.2 and
V10 §4.1 write `adjust('blueprint.history', …)`. The fields are written and read across four units, declared in none
(V08 and pipeline cross-part notes to model).

**Required change.** §2.7 `HistoryHint`: declare, beside `ageYears` and `scars`, the fields V08 §2.6c (3) fills — `founding?`,
`events: { type; yearsAgo; severity: number; name?; templateType?; anchored?; tick? }[]`, `tierHistory`,
`populationHistory`, `calamities: { week; deaths; exodus }[]`, `lifecycle`, `ancientFall?`, `peak?: { tier?: Rung;
population?: number; evidence: string[] }` — each typed as V08 §2.6c (3)'s adapter rows give it, with its reader (§4.11
(1), II.7.6, §7.7's DR36–DR39).

### VM0-14 · MAJOR · WIRING · pipeline

**Claim.** §2.3 *The oasis* (l. 986) reads the water pull "weighted by `spring.flow`; volume 6's failing spring lowers
`flow` over epochs", and V06 W82 names its readers "the water pull on the growth field and the prosperity water term
(§4.2 S3 (6), §4.4, §4.5), both weighted by `flow`". §4.2 S3 (6)'s `q(x)` (l. 4927–4932: "1 on a river bank, a lake or
oasis shore, a spring …") and §4.5's water term (l. 5550–5552) never read `spring.flow`; the model's cross-part note to
pipeline (J-RM7) was not closed. `WaterBody.spring.flow` has writers (S1 = 1, V06's failing spring, a hand edit) and no
reader at the mechanism.

**Required change.** §4.2 S3 (6): "… 1 on a river bank, a lake shore, … — an oasis shore and a spring counting at their
`WaterBody.spring.flow` (q multiplied by `flow`, §2.3) — …"; §4.5's water term: "`q(x)` is S3 (6)'s proximity (a spring's
weighted by its `flow`)".

### VM0-15 · MAJOR · CONFLICT · pipeline (= AF-01)

**Claim.** §4.9 *An oasis's gardens* (l. 7155) lays "`garden_irrigated` land-use faces (§2.7)"; §2.7's `LandUse.kind`
(l. 2160) and V11 W81 name the kind `garden` (item 111). One enumeration value, two names.

**Required change.** §4.9: "`garden_irrigated` land-use faces (§2.7)" → "`LandUse` faces of kind `garden` (§2.7), each
with `fedBy` its oasis's water".

### VM0-16 · MAJOR · CONFLICT · V07

**Claim.** V07 §3 (l. 1957) — "outside the perimeter S12a lays the irrigated `garden_irrigated` faces before the outward
claim, each fed by the spring (`LandUse.fedBy`, §2.7)" — names a `LandUse` kind §2.7 does not have (`garden`).

**Required change.** V07 l. 1957: "the irrigated `garden_irrigated` faces" → "the irrigated gardens (`LandUse` faces of
kind `garden`, §2.7)".

### VM0-17 · MAJOR · CONFLICT · pipeline

**Claim.** II.6 (l. 18243, 18245) reads "the ways with `flowToward` (§2.4)" and has the `follow-streets` mains "falling
with `flowToward`". f item 208 removed the stored field: §2.4 declares the reading `wayFall(way)` and drops a stored
`flowToward` on load. II.6 reads a field that no longer exists (V04 cross-part note 4).

**Required change.** II.6: "the ways with `flowToward` (§2.4)" → "the ways' `wayFall` reading (§2.4; item 208)"; "falling
with `flowToward`" → "falling with `wayFall`".

### VM0-18 · MAJOR · BROKEN-REFERENCE · determinism

**Claim.** §2 cites §7.5 for migrations its schema-transform table (l. 10558–10586) does not hold: a way without
`slopeP95` gets it written on load by S9's rule (§2.4 l. 1052; J-P52 names §7.5); a stored `flowToward` is dropped on load
(§2.4 l. 1033); a block without `content` reads `ordinary` and a stored square type `market` reads `trading` (§2.5 l.
1242); `nextGroundPart` (g item 110 (b)) has no row beside `nextUndergroundPart` and `nextSkyPart` (l. 10578); an
`Enceinte` without `condition` reads `standing` (§2.7) beside the retaining wall's row. The model's cross-part note to
determinism listed them.

**Required change.** §7.5's schema transforms gain the rows: "a way's `slopeP95` | — | written by S9's rule from the
terrain along its spine (§2.4) | 207"; "a way's stored `flowToward` | dropped (`wayFall` reads it, §2.4) | — | 208"; "a
block's `content`; a stored `squareType` `market` | `ordinary`; `trading` | — | V01 (210)"; "`nextGroundPart` | 1 (part 0
being the ground) | — | 110 (b)"; and the retaining-wall row widens to "a `RetainingWall`'s `state`; an `Enceinte`'s
`condition` | absent reads `standing`; a pre-profile scalar reads as the constant profile | — | 110 (a), 575".

### VM0-19 · MAJOR · WIRING · determinism

**Claim.** `Recipe.presetId` (§2.9 l. 2776; J-P54 "read by the report's recipe line and the reader's recipe panel (V09)")
names "the generation report's recipe line (§5.4)" as a reader. §5.4's `GenerationReport` (l. 8478ff.) has no recipe
line and nothing in §5.4 reads `presetId` (W-FLD-06 not closed at its home).

**Required change.** §5.4 `GenerationReport`: add `recipe: { presetId?: string /* Recipe.presetId: the preset the town
was made from (provenance only) */; rung: Rung; seed: Seed }` — the report's recipe line — read by V09's report panel.

### VM0-20 · MAJOR · WIRING · V09

**Claim.** J-P54 and §2.9 name "the reader's recipe panel (V09)" as `Recipe.presetId`'s second reader; V09 has no recipe
panel and reads `presetId` nowhere.

**Required change.** V09's report or document panel gains the recipe line — "Made from the {preset} preset" from
`Recipe.presetId` (absent: no line) — with its catalogue key and its test row.

### VM0-21 · MAJOR · LOST · determinism (= AF-16, AL-25)

**Claim.** `TableId` types §2.8's `SliceRef.table` (l. 2496), §2.9's `Recipe.tablePins` (l. 2772), §7.1's `editTable`,
§10.4's `tablePatch`, V06's and V07's `rows?`. MC-11 homed it at §7.6; §7.6 holds no declaration, and V11 — whose archived
§2.1 declared `type TableId = string // dotted, stable, never reused: 'roster.classes', 'siting.families', 'dossier.kinds',
'era', 'naming.district' …` — now cites §7.6. The declaration is gone from the set.

**Required change.** §7.6: declare `type TableId = string;   // a table's registry id (V11 §3.1's catalogue): dotted,
stable, never reused — 'roster.classes', 'siting.families', 'dossier.kinds', 'era', 'naming.district' …`.

### VM0-22 · MAJOR · WIRING · model (= VR0-05)

**Claim.** §8.2 (l. 11904: "the per-viewer view key `cvdVariant` (`'none'` default; V09's view settings), which joins the
tile key"), §8.3's census row (l. 12142) and §13.2's T112-1 (l. 16132) read the view key `cvdVariant` (g item 112);
§2.9's *View state* key list (l. 3028ff.), the one home of the view keys, does not carry it (rendering's cross-part note).

**Required change.** §2.9 *View state*: add "`cvdVariant` (per viewer: `'none'`|`'protan'`|`'deutan'`|`'tritan'`, default
`none` — the colour-deficiency variant of the sheet, joining the tile key, §8.2; g item 112)".

### VM0-23 · MINOR · TERM · model

**Claim.** §2.2 rule 1's L3 list (l. 614) and `LandUse.face`'s comment (l. 2161) keep "the hinterland's furlongs, lots,
woods". J-RM2 kept "lots" as "§4.9's weighted-Voronoi lots", but §4.9 now calls each "an outside plot (L3 in the
hinterland's blocks)" (l. 7151; the pipeline applied G-lot), so the base names one face two ways.

**Required change.** l. 614 and l. 2161: "furlongs, lots, woods" → "furlongs, outside plots, woods".

### VM0-24 · MINOR · NARRATION · model (part = VV12-21)

**Claim.** Change-request, review ids and process words in design text, which the archived §2 had none of (J-RM16):
`RaisedWayRecord.supports.state` "/* V06's decline (BCR-V6-26) */" (l. 2134) and *Deck plots* "(V06 BCR-V6-26)" (l. 2370) —
a request id no longer in V06 or file f; `District.fabric` "(V1C-39)" (l. 1073) and `Block.overrides` "V1C-20" (l. 1120);
*At the frame* "Tests: item 110 (f)'s bars in §13.2 carry the frame clause for each (cross-part note)" (l. 2381).

**Required change.** l. 2134: "(BCR-V6-26)" → "(V06 §3.19.2)"; l. 2370: "(V06 BCR-V6-26)" → "(V06 §2.8, §3.19.5)"; l.
1073: drop " (V1C-39)"; l. 1120: "(§7.1, §8.10; V1C-20)" → "(§7.1, §8.10)"; l. 2381: "Tests: T110-1, T110-2 and T110-5
(§13.2) carry the frame clauses."

### VM0-25 · MINOR · ID · model

**Claim.** §2.6 *Basements* (l. 1829–1830) carries f item 226's milestone note inside the storeys parenthesis: "… a raised
choir over it; BASE with the basement gate — applied before the milestone that builds it, no document shifts, else one
declared shift, J-S23.2) and is joined by the stair core …" — the sentence's subject is lost across the parenthesis,
J-S23.2 is an id defined only in critique records outside the set (assemble-r0's list), and the f text's "(§13.3) with its
diff report" and the shift's size (every half-basement building `cellar.depthCm ÷ 2` higher) are dropped.

**Required change.** Remove "; BASE with the basement gate — applied before the milestone that builds it, no document
shifts, else one declared shift, J-S23.2" from the parenthesis and add after the paragraph: "The half raise is BASE with
the basement gate: built with it, no document shifts; built after it, every building with a half basement stands
`cellar.depthCm ÷ 2` higher from the milestone that lands it — one declared shift (§13.3) with its diff report."

### VM0-26 · MINOR · CONFLICT · model

**Claim.** §2.3 *The oasis* (l. 978): "a `WaterBody` of kind `pond` or `lake` carrying `spring`". Every writer makes a
`lake`: §4.2 S1 (2) ("entered as a `WaterBody` of kind `lake`", l. 4644), §7.1's lake point-and-level form with its spring
flag, DR40. A `pond` oasis has no producer; a reader keyed on the kind would differ.

**Required change.** §2.3: "a `WaterBody` of kind `pond` or `lake` carrying `spring`" → "a `WaterBody` of kind `lake` (a
spring-fed pond or small lake in the owner's words) carrying `spring`".

### VM0-27 · MINOR · CONFLICT · model

**Claim.** §2.4 *No `passage` way class* (l. 1046): "`WayClass` is unchanged" — false read literally since f item 362
adds `aqueduct`; it means item 30 adds no class.

**Required change.** "`WayClass` is unchanged" → "item 30 adds no class to `WayClass`".

### VM0-28 · MINOR · WIRING · model

**Claim.** §2.3 *The oasis* (l. 987) cites "volume 6's failing spring lowers `flow` over epochs (V06)" with no section
(V06 §3.12.1 is the home), and lists as writers S1, the dossier's `oasis_water` and T2's spring flag; V06 W82 adds "a hand
`setAttr` of `flow` (T2 `ground`)", which §2.8's registry (l. 2706: "`WaterBody.spring` and the oasis's `fedBy` links (T2
`ground`'s spring flag; item 111)") does not list.

**Required change.** §2.3: "(V06)" → "(V06 §3.12.1)", and *Written* adds "a hand `setAttr` of `spring.flow` (T2 `ground`)";
§2.8 registry: "`WaterBody.spring` (T2 `ground`'s spring flag; `setAttr` of `spring.flow`) and the oasis's `fedBy` links".

### VM0-29 · MINOR · NEW-PROBLEM · model

**Claim.** §2.7 `RetainingWall` (l. 2145): `buttresses?: …; towers?: … /* decorative, a V11 table row */` — two fields of a
base record with no type (f item 245 carried the ellipsis); S3 wants every base record field typed.

**Required change.** `buttresses?: true; towers?: true /* decorative: drawn by the wall's `retaining` row (V11 §3.24.1:
`buttress.fromCm`, `spacingM`, the towers' cells); absent: none */` — or the row-derived form V11 §3.24.1 states, named.

### VM0-30 · MINOR · CONFLICT · pipeline

**Claim.** §4.8 *Graded by stretch* (l. 6949): "The wall's thickness, height, walk and tower spacing are a `ChainProfile`
along the trace (§2.7)". §2.7 keeps `thicknessCm`, `walkCm`, `heightCm` scalar — the full curtain's values — and profiles
only the class (`stretchClass`, a step profile of `full` | `parapet` on `wall_class_knot`), each class's values V11's
`walls.barriers` row (J-RM10).

**Required change.** §4.8: "are a `ChainProfile` along the trace (§2.7), keyed by each arc's defensibility class (§4.4)" →
"are read per stretch from `Enceinte.stretchClass`, a step `ChainProfile` of `full` | `parapet` along the trace (§2.7),
keyed by each arc's defensibility class (§4.4), each class's values V11's `walls.barriers` row and the enceinte's own
values the `full` row's".

### VM0-31 · MINOR · WIRING · model (= VR0-27)

**Claim.** `Enceinte.walkCm` (l. 2107) names its readers "§11.1's VTT and glTF wall tops and §8.3's close-up wall symbol";
only §11.1's glTF row reads it (l. 14088). W-FLD-05 closed at one reader, two named readers absent.

**Required change.** l. 2107: "read by §11.1's VTT and glTF wall tops and §8.3's close-up wall symbol" → "read by §11.1's
glTF wall top".

### VM0-32 · MINOR · TERM · model (= VV1112-25)

**Claim.** §2.1's unit vocabulary (l. 505–507): "Volume 11's `ColumnSpec.unit` (V11 §2.1) and volume 12's metric `Unit`
(V12 §2.1) are named subsets". Under E-37 the subsets are `ContentUnit` (V11 l. 249) and `MetricUnit` (V12 l. 232).

**Required change.** "Volume 11's `ContentUnit` (V11 §2.1, its `ColumnSpec.unit`) and volume 12's `MetricUnit` (V12 §2.1)
are named subsets of this list, each exactly its present set."

### VM0-33 · MINOR · BROKEN-REFERENCE · model (= VV1112-26)

**Claim.** `Enceinte.underuseSince` (l. 2113): "below V11's contract.occupiedShareMax"; the cell is V06 §2.2's (V06 l. 484,
641: `tables/evolution.json`).

**Required change.** "below V11's contract.occupiedShareMax" → "below V06 §2.2's `contract.occupiedShareMax`".

### VM0-34 · MINOR · WIRING · model

**Claim.** `HistoryRecord.buried` (l. 2269) — "the `buried` systems derived from the former settlement's own geometry
(II.7.6)" — names no writer; V04 makes `BuriedFormer.lay(doc, epoch, former)` the one producer, called by V06's replay at
the burial epoch (V04 l. 294, 306; V04 cross-part note 14).

**Required change.** l. 2269: "… own geometry (II.7.6) */" → "… own geometry, each returned by V04's `BuriedFormer.lay` at
the replay's burial epoch (V04 §3.5.5 (b); II.7.6) */".

### VM0-35 · MINOR · CONFLICT · V06

**Claim.** V06 §2.9 (l. 666) — "`strain?` … // written by the use phase only" — and V06's lifecycle row (l. 761: writer
"the use phase") contradict f item 429 (a) ("written by the use step and by `setAttr`") and §2.8's registry ("`Use.strain`
(`setAttr`)"); by principle (3)'s precedence the f item stands.

**Required change.** V06 l. 666: "written by the use phase only" → "written by the use phase and by `setAttr` (§2.8)"; the
l. 761 row's writer cell "the use phase; a hand `setAttr`".

## Checked and confirmed

* **The removed text (602 hunks, 3 395 words).** Apart from VM0-01, VM0-11 and VM0-12, every removed hunk is a rewording,
  a move inside §2, or a restatement whose home states it: the underground part 0 and further-part level views (II.7.2 l.
  18464ff., II.7.3), the margin and border write order (§4.1's S1 and S3 rows), the clear-survival rules (§3.3, §7.2;
  KXC-03), the seam facts (II.1's `Seam` and `SeamContract`), the passage headroom, `exposure`, `sealed`, `tenure` and
  `bandRange` details (their interface comments), the roof-construction list (§8.2's `roofConstruction`), the island rules
  (II.6), the Fantasy Manor families and evidence (V02 §2.3, §3.3, §3.10.8; the rationale's J-A59.21, which keeps the 14 %
  no-entrance evidence), the warp-carry measurement and fallback (§12's R12-14 row), the dossier host-door fields (§7.7, §11.3).
* **The inventory (609 ids).** 601 carry every distinctive archive token in the live §2; the 8 others are stated at
  their homes (MODEL-0164/0166 II.1; 0196/0231/0383 the geometry floor, renamed from `geometryFloor` in §2 with §4.11
  keeping the identifier; 0328 V02 §2.3; 0432 V05 §2.1) save MODEL-0302 (VM0-01). The 42 `reference` rows were checked at
  their homes; none other is lost. No `J-`, `T-`, `D-`, item or review id of the archive was dropped; the new ids
  (J-A29.61, J-C4, J-V5.62, J-V6.115, J-VI.2/.3/.9/.14/.15/.21/.27) resolve, J-S23.2 does not (VM0-25).
* **References.** The assembler's check found nothing broken in §2 but J-S23.2; all 103 volume sections §2 cites resolve;
  every `§2.x *label*`, `§2.2 rule n` and *Entrances* rule n pointer from the set resolves (rules 1–8 and 1–5 kept).
* **Terms and wording.** The 30 retired patterns: G-lot's four hits are two quotations and VM0-23; G-stairway's and
  G-standalone's hits are the correct terms; G-unitinput's two "hand-over" hits are the reservation passing the canon
  keeps; G-suppress's hit is VM0-03. No deferral wording; no vague wording; narration only VM0-24.
* **f items.** All 88 routed items and the §2 parts of 286, 303, 305, 313, 333, 362, 370, 371, 406, 420, 459, 576, 578 are
  applied — compressed where the f text restated a home — except VM0-11 (221's row), VM0-25 (226's note) and VM0-29's
  carried ellipsis; 429 (a) and 335 (a), routed elsewhere, are VM0-10.
* **g items.** 105, 106, 109, 110 (save VM0-02), 111 (save VM0-14's reader, VM0-26) and 113 (save VM0-13, VM0-34) are
  applied; 114 is VM0-03; 112's view key is VM0-22.
* **Conflict rulings.** MC-01 (save VM0-23), MC-02 (every entity interface carries `lifecycle`; the plan's rooms, walls,
  openings, windows, cores, chimneys and furniture are values, never entities), MC-03 – MC-10, MC-12, KXC-03 and
  V07-XCONF-2 applied; MC-11 applied in §2 (`Segment`, `Outfall`, `TypedBoundary`, `FabricStrategyId`, `DriftBounds`; V10
  renamed its record `ClerkSegment`), its `TableId` part open at §7.6 (VM0-21), `Rung` declared at §1.1.
* **Wiring gaps.** W-HOOK-02, W-FLD-04, W-FLD-13 (S8 writes, §13.5 reads), KWG-09 (§3.2 holds centidegrees as the one
  angle unit) and MW-05 closed; W-FLD-05 is VM0-31, W-FLD-06 VM0-19 and VM0-20.
* **Elegance.** E-01 — every equivalence item checked against f items 245 and 575: canonical form, write, read,
  regenerate (the snap cell cited, its 100 cm value V11's), cut and join, undo, migrate, and both records' values, knot
  roles, writers, readers and lifecycle rules are present; the ordinal rule the kernel needs is VM0-05 (new, not lost).
  E-02's two record forms are now withdrawn by g item 114 (VM0-03). E-15, E-37 (the volumes' subsets are subsets; names
  VM0-32) and E-39 applied.
* **Open findings (44).** MODEL-RESTATEMENTCLUSTERS-001 – 014, MC-01 – MC-12, MW-01 – MW-05, MB-01 – MB-13 closed as the
  rewrite report states (the twelve MB types declared; "(R12)" gone).
* **Agreement (12).** FabricStrategyId (see AF-04, VV12-09: declared again at §4.12), TypedBoundary, DriftBounds,
  BaseWing and BuildingInput (`plot`), PathShapeRow (VM0-11), SkyIsland (`rim`/`land` in V05 §2.1), ContextVector (`sky`)
  agree; TableId is VM0-21. The volumes no longer re-declare the types §2 now declares (V01, V02, V03, V04, V06, V08 checked).
* **Edges and combinations routed to model.** M-model-943 E5 and E8 (§2.4 *Missing and contradictory data*; T77-1 carries
  the removed-partner clause), EI-MC-05, EI-MC-09 and the three frame combinations (§2.7 *At the frame*; T110-1, T110-2,
  T110-5 carry the frame clauses) are defined and tested. The frame-growth edge EW-01 and the support-step edges EW-07,
  EW-08 (edges-world) are not repeated here.
* **Cross-part notes to model.** Kernel 1, 2, 7, 8, 9 hold; 3–4 are VM0-02, 5 VM0-04, 6 VM0-05. Pipeline: §2.3 (VM0-06,
  VM0-07; `spring` declared), §2.5 (VM0-08; `ContextVector.dist` at village rungs applied), §2.4 and §2.6 hold, §2.7/§2.8
  (VM0-13, VM0-09, VM0-10, VM0-15/16). Determinism: the oasis records, the custom records and the closure pieces hold
  (§7.3 states the chamber and fountain pieces; §7.5 the sky-part default). Rendering: `showUnexcavated`, `roomNumbers`,
  `docId` hold; `cvdVariant` VM0-22; `walkCm` VM0-31. V04 14 (VM0-34); V06 2 (VM0-10), 4 (VM0-03's words), 9 (VM0-33), 10
  (VM0-15/16); V08 4 (VM0-13); V11 7 (VM0-15), 9 holds; V12 (VM0-32). Scope's `ProductDecl` note concerns §1.1, §4.12 and
  §14, where the type is used — §2 uses none.
* **Sibling issues owned by model and not repeated here** (each checked as standing in the live text): AF-04 and VV12-09
  (`FabricStrategyId` declared at §2.5 and §4.12), AF-09 (`DeckKind`), AF-10 (`RaisedKind`), AF-15 (`PorchKind`), AF-25
  (`stepProfile`'s home), AF-33 (the deck-plot offer's two homes), AL-29 (two glosses), EW-01, EW-07, EW-08, MODEL-WL-1
  (`workingLayer`'s text against V09-XCONF-1).
* **Doc checks.** Not re-run here; the assembler's run on the installed base is provisional (the reference corpus is
  absent in this checkout).
