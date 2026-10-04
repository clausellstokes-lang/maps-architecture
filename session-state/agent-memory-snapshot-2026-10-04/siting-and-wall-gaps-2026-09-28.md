---
name: siting-and-wall-gaps-2026-09-28
description: "Base design gaps found 2026-09-28: SupplyEdge pulls are consumer-side only and absent from S7b district allocation; 104 (h)(3) 'chains cluster into a quarter' conflicts with owner dispersal ruling J-A72.46; Enceinte closure is ring|shore only (a cliff cannot close a wall), 40 m trace band, uniform wall profile, waterfront a fixed preset, no harbour boom"
metadata:
  type: project
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

Read on 2026-09-28 from docs/ARCHITECTURE.md (sha 87588d34 era) in answer to the owner's questions on multi-output
supply chains, chain clustering and walls meeting natural barriers. Assessment only; nothing filed yet (owner asked
questions, not for a change).

Supply: `SupplyEdge` (§10.2) lives on the CONSUMER class, keyed by the input resource; S10a/S10b score a consumer's
distance to the nearest provider; `produces` is a plain list, so a producer is never pulled toward its buyers.
S7b (1) allocates classes to districts by capacity and the district kind's affinity, NOT by supply edges, so chains
only tighten inside a district. S2 need propagation already handles one output feeding many buyers (one provider per
`perConsumers`). J-A72.46 (owner's words: smiths, alchemists, churches "dispersed out across all neighborhoods") rules
dispersed classes are never gathered into one district; item 104 (h)(3) in docs/AMENDMENTS-2026-09-28g.md says
compatible chains "cluster into a working quarter" and should be softened to street-scale closeness, named only past
item 72's identity threshold.

Walls: `Enceinte.closure` is 'ring'|'shore' — an open chain may END on a cliff anchor but only a shoreline closes the
enclosure; S5a pulls the trace to defensible ground within a 40 m band only; thickness/height are per enceinte, not per
stretch; `waterfront` open|quay_wall|sea_wall is a preset, not derived from sea threats; no harbour boom or chain.
Historical checks (partitioned/corpus-preview/history.md rows 4a–4d) witness walls fitted to routes and terrain and
forbid "settlement hull => wall", but say nothing on coasts or cliffs.

**Why:** these are the mechanisms any follow-up item (104 (i), a walls rule) must change; re-deriving them costs a long read.

**How to apply:** if the owner rules yes, file in file g, bundle per [[maps-project-state]]'s recipe; walls are base
changes the coherence pass (18) applies from g. Related: [[sf-custom-content-structure]].

**Added 2026-09-28 ~18:05 (ladders and spread):** SettlementForge `src/data/institutionLadders.js` (branch export in the session
scratchpad `sf/tree/src/data/`) holds UPGRADE_CHAINS (same function, the greater REPLACES the lesser: Blacksmith → Blacksmiths
(3-10), Apothecary → Apothecary (established) → Apothecary district, Brewer → Brewery …) and SUBSUMPTION_RULES. Our design
and research never read it (grep 2026-09-28). The port handles only NUMERIC count ranges as collective records (DR9: members
`#k`, count = per-capita rows clamped into the range, dispersed; J-A74.73, J-A80.72); the 12–14 non-numeric qualifiers
("Inn (multiple)" ×38, "(guild)" ×36, "(district)" ×47) stay in the label and map by T9 to one building or a district-defining
neighbourhood with no members tied to the record. Supply score today decays linearly from the provider (no near-enough
plateau), which is what would bunch buyers. The dossier's `activeChains[]` (with upstreamChains) is used only as evidence
for soft co-location rows (research/sf/mapping.md row 46).
