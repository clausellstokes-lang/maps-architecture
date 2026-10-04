# The implementer digest — M-1's nine entries (candidate, 2026-10-04)

This folder is the **candidate** of the implementer digest that §17.1 (2) and §16's M-1 row ask for. It is written
research-side by the digest seat, in our own words, with numbers, metric ids, `baselines.json` row ids and design
section references only: no code excerpt, no reference word list, grammar, palette, identifier or content table, and
no research path — a record behind the clean-room firewall is named by an opaque `research:` label. It crosses into
`plat/docs/digest/` only after the content scanner lands (M0-k-06), through the digest-checker seat's report
(0 code excerpts, 0 reference word lists, palettes or tables, 0 deny-list hits) and with one crossing record per file.
Until then an implementer-side seat does not read it.

Each entry serves an AFTER-M-1 run item of M0 and states what that item must measure the same way (like with like).
Where an entry quotes a creator's stated idea it does so in our words, as the idea behind a measured behaviour, never
as a mechanism to copy.

| entry | file | what it carries | for |
|---|---|---|---|
| 1 | `01-ng-sigma-frame.md` | how NG's bent-cut σ, corner, arrival and fillet shares were measured: the recorded frame, the rotated retries, the rows | M0-b-05a, M0-b-05b |
| 2 | `02-depth-rows-refit.md` | the re-fitted plot-depth rows, the dense-core floor and `cut.flattenM`, with the stop-law reading behind them | M0-b-05a, M0-b-05b |
| 3 | `03-r4-definition.md` | R4's definition confirmed (axis, sample, centroids, radii) and the nine rows | M0-c-07a |
| 4 | `04-hollow-block-definition.md` | the hollow-block frequency's definition (`block.courtShare`) on NG's faces and MFCG's cluster blocks | M0-c-07a |
| 5 | `05-junction-census.md` | the junction census: T against crossroads, the merge, the arms, the rows | M0-c-07a |
| 6 | `06-deep-interior-shares.md` | the deep-interior default shares per band, plus the `MFCG` preset's row | M0-c-07a |
| 7 | `07-derived-graph-twin.md` | the derived street graph's twin derivation, its five parameters, the rows and the sensitivity | M0-c-07a |
| 8 | `08-ng-declared-scale.md` | NG's declared scale of 0.35 m per model unit, the rows resting on it, the registered frame | every NG metre row; `ng-faces.json` |
| 9 | `09-ftg-city-family.md` | FTG's recorded CITY family, the non-default setting that is never pooled, the form of an FTG sample | every FTG `CITY` row |

**Conventions.** Rows are named by their `baselines.json` id, `<reference>/<setting>/<metric>/<subset>[/<field>]`.
A scalar value is written p50 [p10, p90] with the estimator's n; "band" is the row's band as M-1 formed it under
§13.5's rule. Design pointers are to `docs/ARCHITECTURE.md`'s sections. Every number is M-1's measurement of the
reference and crosses nowhere else; the design amendment that records the re-fitted cells (entries 2 and 6) carries
the same numbers. Each entry ends with its CONFIRMED / PLAUSIBLE line.

**What is deliberately not here.** The ⟨M-1⟩ cells M-1 could not measure cross as descriptive rows with their reasons
inside `baselines.json`, not as digest entries; the design corrections the measurements require are the design seat's
amendment, not the digest's; `ng-faces.json`'s schema travels to M0-k-05 by the session's hand-off, not here.
