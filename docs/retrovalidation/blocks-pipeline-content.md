# Blocks — lane retrovalidate/pipeline-content (Fable validator, 2026-09-27)

Text before the first "=== " line is ignored by the assembler. One block (RV-pc-6 of docs/retrovalidation/pipeline-content.md);
every other finding of the lane is routed with exact text to its owner because its subsection is a pass-c target or its fix is a
mechanism decision, not a small certain edit. Top-level heading key changed: `II.1` (PART II).

=== APPEND TO SECTION ## II.1 The district → neighbourhood interface ===

**The `Sample` type (retrovalidation 2026-09-27; J-RVpc-1).** The field samples a `Seam` and a `SeamContract` carry are one
shape, declared here because the two interfaces above use it and nothing else declares it:

```ts
type Sample = { at: PointCm /* a boundary sample's position on the run; an interior sample's on the lattice — the same point
  `SeamReport.fieldJumps.at` reports (a sample position, never a vertex) */; value: number /* the field's [0, 1] value for
  prosperity, density and greenery; ground height in cm for terrain */ }
```

=== END ===
=== J-ROWS ===
| J-RVpc-1 | `Sample`, the shape of a seam's boundary and interior field samples, declared once in II.1 as `{ at: PointCm; value: number }` — the position `SeamReport.fieldJumps` already reports and the field's own value — over an index-keyed sample (a station along the run) | II.1 |
=== END ===
=== RATIONALE-A ===
| J-RVpc-1 | Chose to declare `Sample` as `{ at: PointCm; value: number }` — a world position and the field's value — over a station-keyed sample (`{ s: Cm; value }`, the distance along the run) and over leaving the shape implicit, because `SeamReport.fieldJumps` already reports a jump "at: PointCm /* a sample position, not a vertex */" (II.1), so one point shape serves the boundary samples, the interior lattice samples and the report without a conversion; a station would need the run's parametrisation, which differs between a seam's two sides in ring order; and an undeclared type in an interface both districts read is a single-source gap a repairer would otherwise decide twice. Terrain samples carry centimetres, as every length does (§2.1). Found by the retrovalidation of PART II (RV-pc-6, lane retrovalidate/pipeline-content, 2026-09-27). |
=== END ===
