## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V07-1 (J-VI.1, clean-room).** The request field is renamed `arableFactor` (six lines; its former name coincided
  with a reference field and is not repeated here — reworded by the continuation, J-VI.23), and V07 §3.8's
  VG slot rule defines its large-house probability in our words ("`0.15 ÷ k`, where `k` is 3 plus the number of large
  houses already laid in this village"); both reference names are gone.
* **IN-V07-2 (J-VI.16).** V07 §13's FL-2 is **closed**: volume 4's second round landed `blockedBy 'rung'`, `parish_church`
  among the counted churches, the maintenance mode, the ruin centre, the well pins and the `DigRule` rows (V04 §13). FL-3
  is **closed**: volume 4's span rule leaves country spans open where no vault stage registers, volume 6 §3.19's
  raised-way step runs only its lapse and repair at a village rung (V6 X22), and volume 11 §3.24.3's `villageCap` 1 is
  the village cell of the specialisation rows (the `villageCap` clause superseded by reconciliation round 1, SS-31: the
  village cap is `rules.tiers.capPerSettlement`, per settlement). FL-1 stays as written (the reference-reading lane's).
* **IN-V07-3 (J-VI.17 H30; volume 8's X7).** A village birth carrying `Toll bridge` reads the `kinds` cell's
  `implies: 'bridge'` (volume 11's `toll_bridge` row) in the village site rule: the settlement's through route crosses its
  water by a bridge, whose deck may carry the toll house by `deckOk`.
* **IN-V07-4 (J-VI.17 H31, H32; X-V11-2, XV-V9-9).** The palisade's barrier arcs read volume 11's `walls.barriers` rows
  (V11 §3.16.1) keyed by the closure-arc kinds of J-VI.3; its "show circuit" control reads file f item 413's
  `LayerSpec.showCircuit`.
* **IN-V07-5 (J-VI.4).** No village tool refuses a declaration that contradicts no dossier fact and no lock (item 101
  R2): a raised stroke at a village rung is drawn as declared (the rung gate binds only generation, file f item 290).

