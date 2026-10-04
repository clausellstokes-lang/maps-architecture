---
name: sf-dossier-identity-keys
description: "SettlementForge identity-key hazards for the map's dossier port (verified 2026-09-27 by lane sf/verify on fp/integration-2026-09-23 @ 5d699cc683): catalogId missing on ~12 % of institutions, controlledInstitutions keyed by stablePart(id||name), institution renames only via demotedFrom/promotedFrom keeping the OLD catalogId, closures are status remnant"
metadata:
  type: project
---

Verified by execution and source reading (research/sf/mapping-verify.md, V3 V5 V30 V57–V62 V70; receipts in the session
scratchpad sf/verify/). Facts about SF branch `fp/integration-2026-09-23` @ `5d699cc683`:

- `catalogId` is ABSENT on 695 of 5 846 birth institution records (every `cascade` record, most `coherence_repair`, all
  `faction_boost`) and on every institution SF adds later (six creation paths, none writes one). Where present at birth
  it equals the slug of the record's name. SF's anchor precedence is `cat:` → `uid:` → `name:` (townMap/anchors.js:50-56).
- `powerStructure.factions[].controlledInstitutions` holds `stablePart(inst.id || inst.name)` (worldPulse/factionCompetition.js:155-166),
  NOT catalogId; only the first 12 roster positions can be captured; two powers may hold one house.
- The institution rename writer (domain/institutionRename.js) and removal sweep are UNWIRED (no caller; no
  `rename-institution` op). Institutions get renamed only by calamity demotion (`demotedFrom`, `demoted_by_disaster`,
  id re-minted) and reconstruction upgrade (`promotedFrom`, `upgraded_by_reconstruction`) — both KEEP the old kind's catalogId.
- Closure fates write `status: 'remnant'` + `_worldPulseInactive: true` (only `abandoned` writes `removed`); the closed
  18-fate vocabulary is worldPulse/worldPulseFates.js:56-75 — key on `worldPulseFate` before `status`.
- The current week (`worldState.calendar.elapsedWeeks`) is campaign state, not in the dossier; receipts carry ticks.

**Why:** the sf/mapping lane read no SF file and relayed "keyed by catalogId" and "rename cascade with receipts" from the
surveys; both are wrong for the port's binding table and change feed.
**How to apply:** when planning or building the dossier port / binding table / change feed, start from
research/sf/mapping-verify.md §0's 15 corrections, not from mapping.md alone; re-verify against the branch the owner
names (the working tree is stale — see [[settlementforge-stale-working-tree]]). Related: [[dossier-sole-truth-map-derives]].
