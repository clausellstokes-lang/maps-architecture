- (2026-09-30 ~00:50) "one thing i wanted to add, at generation time the first generation, teh economy slider determines the
  cieling prosperity for the entire map" — OWNER RULE item 114 in docs/AMENDMENTS-2026-09-28g.md (J126): SettlementForge's
  economy slider (`priorityEconomy`, 0–100, default 50; standalone, T1's wealth slider renamed "Economy") sets a map-wide
  prosperity ceiling — the highest prosperity band any household, plot, district or building may take — read once at the
  first generation and recorded; no ceiling at 50 and above (the default town unchanged), `modest` at 0; the dossier's own
  prosperity word always keeps its band; the prosperity values themselves are untouched; after the first generation the
  founding ceiling carries and lived wealth may lift it.
- (2026-09-30 ~00:54–00:56) "and only high magic on the slider allows for floating islands in the initial generation." /
  "actually floating islands has to have both high magic and high economy" — OWNER RULE item 115 in
  docs/AMENDMENTS-2026-09-28g.md (J127), the second message replacing the first: floating islands rise only where the
  magic is `high` (SettlementForge's own resolved word; standalone, a new Magic control, default None) AND the economy
  slider is at 75 or more, beside the islands setting and the CITY/METROPOLIS rung; the gate binds every rule-driven
  rising, never removes a standing island, and never refuses an author's own island except in a world the dossier states
  magic-less.
- (2026-09-30 ~00:56) "bundle these into the rewrite phase" — items 114 and 115 applied IN the coherence pass's Rewrite
  phase by every unit they name, with their routing in docs/validation/coherence/canon.md's ruling of 2026-09-30: the units
  whose rewrite had landed (the base's model, pipeline, determinism and rendering) in a late rewrite seat, every other unit
  in its main rewrite (workflows/18-coherence.js `lateItems`, `lateUnits`).
