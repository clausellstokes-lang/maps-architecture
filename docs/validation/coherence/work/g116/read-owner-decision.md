# Owner decision for item 116 — which trade partners count (2026-09-30 ~01:15 EDT)

Binding on the draft, the reviewers and the final seat of item 116, and on the bundle's consistency check.

**The owner's words.** After the program's recommendation (below): "note that we are reworking trade as we speak. but for now
its your recomendation".

**The recommendation the owner adopted.** The owner's refinement (~01:10) stands strictly: a NON-NATIVE material exists in a
settlement only through trade with ANOTHER SETTLEMENT THAT HAS THAT MATERIAL; an isolated settlement has none and never grows
into one until such a link exists. What counts as such a partner, for now:
- every neighbour SettlementForge NAMES counts as a trade partner — the generation-time `neighborRelationship` (its
  `primaryExports`, and its resources where the dossier gives them), the good-level `economicState.tradeLinks[]` (an import of a
  good that is, or is made of, the material), and the campaign's `neighbourNetwork[]` links — each supplying the materials its
  named exports, goods or resources show;
- a settlement with NO named neighbour is NATIVE-ONLY, whatever its `tradeRouteAccess` (a port, river, crossroads or road
  town with no named partner imports nothing): no unnamed "region" partner is invented;
- the route of a named link (sea, river, road; SettlementForge's access key and gates where given) sets the transport cost.

**SettlementForge is reworking trade now (owner).** So the rule reads trade through ONE port-side input record — a trade
partner and the materials it supplies, with its route — filled TODAY by a derivation row from the fields above, and re-pointed
to SettlementForge's reworked trade model when it lands (J121: the map follows SettlementForge's product decisions; the
change reaches existing maps through the dossier port's migration and change envelope). The material rule itself never reads
SettlementForge's trade fields directly. This is a defined adapter, not a deferral: the derivation row is complete for today's
dossier. Standalone: the recipe's trade-partner list (partner, what it supplies, route), empty by default (native-only).
