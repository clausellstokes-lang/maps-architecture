# PARTITIONED — not an input to the current design

**Owner, 2026-09-25:** "take a preliminary look at the corpus and research … just to see if it gives you more confidence.
then partition that off until we reach that layer."

Everything under `partitioned/` comes from SettlementForge's map corpus (`~/Desktop/settlement-engine/map-corpus`, read
read-only). It exists to calibrate the program's CONFIDENCE, nothing else. Until the owner opens the reconciliation stage
(after the village and town/city generators are built):
- no workflow, agent or build step may read `partitioned/` as an input to the architecture, the fix/amendment passes,
  the Fable review of the design, or the code;
- nothing here changes `docs/ARCHITECTURE.md`, `docs/DEFINITION.md` or any rule table;
- the corpus's own rules apply to anything derived from it: the 53-plate blind holdout is never studied; the corpus
  teaches drawing, never naming; historical records prove possibility, not frequency; SettlementForge's own map design
  (GENERATION-SPEC.md, MORPHOLOGY-PLAN.md) was deliberately NOT read.

**Owner-opened exception (2026-09-27): the palette targets only.** Owner: "Adopt the corpus measured color targets". The paper, ink and plate-chroma bands of `corpus-preview/look.md` §1.1 (recomputed without the holdout) enter the design as colour targets through item 69 of `docs/AMENDMENTS-2026-09-27c.md`. Nothing else in this folder is opened: the plates, the texture targets, the grain ladder, the banned priors and every other finding stay walled off until the reconciliation stage, and the holdout is never used.

## Fable review (2026-09-27) — corpus-preview rows

The partition was re-checked on 2026-09-27 by grep (the corpus path, plate ids, instrument names, record-id prefixes, the
palette centroids): 0 hits in docs/ARCHITECTURE.md, DEFINITION.md, AMENDMENTS-2026-09-25b.md, CONFIDENCE.md,
ARCHITECTURE-RATIONALE.md and ARCHITECTURE-VALIDATION.md; the only hits are in item 69 of docs/AMENDMENTS-2026-09-27c.md,
the owner-opened palette exception above. The four preview files were reviewed (docs/fable-review/main/manager-corpus.md):
look CORRECTED (one over-strong sentence), plan and history CONFIRMED, synthesis CORRECTED (labelling of the "before"
figures); no ruled confidence number moves (docs/CONFIDENCE.md §10; docs/PROGRESS.md J83). Everything else here stays
walled off until the reconciliation stage.

**Owner-opened exception (2026-09-28): the historical checks.** Owner: "And you can use the historical checks now if you
want." `corpus-preview/history.md` (its scoreboard §1.2, notes §1.3–§1.4 and limits §4) may now be read by any seat as
EVIDENCE for rules — the siting rulebook and custom-content siting (docs/AMENDMENTS-2026-09-28g.md items 103–104), decline,
the village and the other realism rules — under the corpus's own laws: historical records prove possibility, not
prevalence; a rule the checks mark ABSENT or CONTRADICTED stays soft and carries provenance saying so. Still walled off: the
plates, the look beyond the palette exception, `plan.md` and `look.md` as design inputs, the 53-plate holdout (never), and
SettlementForge's own map design. Recorded as J103.

