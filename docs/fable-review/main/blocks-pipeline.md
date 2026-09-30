# Blocks — lane fable-review/main/pipeline (Fable reviewer, 2026-09-27)

Text before the first "=== " line is ignored by the assembler. Blocks follow as the review (docs/fable-review/main/pipeline.md)
rules them; each block is closed with "=== END ===" as soon as it is written (kill-safe). Every block carries its J-ROWS
line and RATIONALE-A entry in the J-ROWS and RATIONALE-A blocks at the end of this file.

=== APPEND TO SECTION ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===

**A cut way's far part — the records that name a way (Fable review 2026-09-27; J-Fpipe-2; this paragraph belongs with the
carve's batch (1) above, where pass c's editors may fold it).** When the carve's batch (1) hands a cut way's far part to a
new way by `retypeEdges`' `rekey` — and S1's water operator, which cuts ways the same way (§7.3 (b) 3), likewise — the
rekey moves the edges' role rows and knot rows and nothing else (§3.4), so the same batch **re-points every record that
names the way by id along the far part** to the new way: the `Frontage` records of the blocks along it (`Frontage.way`,
§2.5), the `Bridge.way` of a built deck on it and the `Gate.way` of a gate on it (§2.7), the `Greenery.along.way` of the
avenue and street-tree rows along it (§2.7, §4.9), `Junction.arms` at its junctions (§2.4), `Tunnel.follows` of a main
under it (§2.7) and the `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine` entries of the `Seam` records that name it (II.1). Those
records lie outside the footprint `R` and change only by that id: this is the carve's **identity exception**, which the
locality oracle admits beside the seam exception (§7.3 item 1, item 7 (ii)) — every such record equals its prior record
with the old way id replaced by the new one, and every other entity outside `R` stays byte-identical. Which part keeps
the old address is §6.3's anchor rule — the part keeping the old anchor (§7.3 (b)); the far part is keyed by §6.3's
SPLIT rule as a split plot's or tunnel's part is (J-A31.73, J-A11.43), continues the lineage, and **keeps the parent's
name and naming record without a draw** — a street a canal severs is one street on both banks, so S13a draws nothing and
its label candidates for the new way are built inside the carve's S13a delta (§7.3 item 2). A `Frontage`'s `class` and
`lengthCm` are unchanged (the class is the way's and moves with the rekey). The carve's undo restores the one way and
every re-pointed record (§7.4). *Test (§13.2, with §13.1's carve fixtures):* after a canal that cuts a `lane` and a
`secondary`, §5.3's reference-integrity row holds on every record that named either way, 0 records outside `R` differ
from their prior other than by the new way id, and both parts of each cut way carry one name.

=== END ===
=== J-ROWS ===
| J-Fpipe-2 | a way a carve or a water move cuts in two: the batch that re-keys its far part re-points every record naming the way by id along it (`Frontage.way`, `Bridge.way`, `Gate.way`, `Greenery.along.way`, `Junction.arms`, `Tunnel.follows`, `SeamEdge.chain`, `Portal.wayId`, `SeamAmendment.spine`) — the identity exception the locality oracle admits beside the seam exception — and the far part keeps the parent's name | §4.11 |
=== END ===
=== RATIONALE-A ===
| J-Fpipe-2 | Chose to have the carve's batch (1) — and S1's water operator, which cuts ways the same way — re-point every record that names a cut way by id along its re-keyed far part (`Frontage.way` on the blocks fronting it, `Bridge.way`, `Gate.way`, `Greenery.along.way`, `Junction.arms`, `Tunnel.follows`, a `Seam`'s `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine`) in the same batch, to admit those id-only changes as an **identity exception** the locality oracle checks beside the seam exception (each record equal to its prior with the old id replaced; everything else outside the footprint `R` byte-identical), and to give the far part the parent's name and naming record without a draw, over three alternatives: leaving the records as they were (the `rekey` moves only edge role rows, §3.4, so `Frontage.way` and the rest would name the near part, whose spine no longer bounds those blocks — a dangling reference against §5.3's reference-integrity row, and the fixtures' "byte identity outside `R` less the seam exception" would fail on every canal that cuts a lane); one `Way` record with a gap, as a breached wall keeps one record (a way's spine is one L1 chain, §2.4, and a linear entity in more parts than it declares fails §3.10's role consistency — the reason the rekey exists); and re-deriving the far part's blocks with `R` (cells the canal never touched would change, against the owner's "everything not involved keeps its exact geometry and identity", item 22 (b)). II.6's tunnel split already re-points `Frontage.way` on the underground blocks (J-A11.43), so this states the same discipline once for ways. The name: a street a canal severs stays one street on both banks under the realism tiebreaker, and a fresh draw would rename a street the user never touched (§6.3's succession cases). Found by the Fable review of the round-3 pipeline draft (VP2-1's footprint, J-P34): the gap was introduced with batch (1)'s rekey sentence and closed by no later round (§4.11; Fable review 2026-09-27, lane pipeline). |
=== END ===
