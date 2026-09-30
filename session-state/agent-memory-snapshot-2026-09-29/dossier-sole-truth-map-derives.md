---
name: dossier-sole-truth-map-derives
description: "Owner rule (2026-09-27): the SettlementForge dossier is the ONLY immutable truth on the map; whatever it does not provide the map derives coherently by our rules — never asks the dossier to change; gaps resolve to DERIVE, not ASK"
metadata:
  node_type: memory
  type: feedback
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

Owner, 2026-09-27 ~17:45 EDT, after the read-only dossier survey found SettlementForge's dossier keys institutions and
powers by NAME and carries no households, classes, locations or settlement-level trade direction: "whatever the dossier
doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of
immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things
from the dossier and in accordance with our rules."

Filed as OWNER RULE item 20 (h) in `docs/AMENDMENTS-2026-09-27c.md` §G (program interpretation, vetoable: two tiers of
fact with a provenance marker; derive-before-invent with a §7.7 derivation table; §13 coherence bars; the dossier port
declares optional fields only; a proposed name-to-id binding table), in `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, and as
J77 in `docs/PROGRESS.md`. Applied by pass c (`workflows/12-amendments-c.js`, items "20,32-72").

**Why:** the survey's mapping step asked, per dossier gap, whether the map derives the fact or must ask for it; the owner
settled it for every gap. A design that requires new dossier fields would violate the one-directional rule.

**How to apply:** in any Maps design or plan text, a dossier gap becomes a derivation rule (dossier inputs → rule/table →
seeded chance only where nothing can be derived), never a request to SettlementForge; the dossier port may take optional
fields "when present", never required ones. Dossier facts are immutable on the map (edits of them refused as item 20 (c)
refuses deletions). See [[maps-project-state]], [[settlementforge-map-program-link]].
