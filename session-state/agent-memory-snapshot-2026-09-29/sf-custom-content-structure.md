---
name: sf-custom-content-structure
description: "How SettlementForge custom content reaches a dossier (read 2026-09-28 on fp/integration-2026-09-23): custom institutions carry localUid, free-text category, tags, description, required and scene tokens only; authority/defenseRole/produces/requires stay in the author's library; chains are discovered, reviewed, and active only when all nodes are present"
metadata:
  node_type: memory
  type: reference
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

Read read-only on 2026-09-28 from SettlementForge branch `fp/integration-2026-09-23` @ `5d699cc68` (exported to the session
scratchpad; the on-disk working tree is stale): `schema/custom-content.manifest.json` (the authority: buckets institutions,
services, resources, tradeGoods, stressors, factions, deities, traditions; supplyChains are `authorable: false, discovered:
true`), `domain/customContentSchema.js` (legacy labels: CONTENT_GROUPS, CRITICALITY, ECONOMIC_WEIGHT, DEFENSE_ROLES,
POWER_AUTHORITIES, FOOD_IMPACT, TRADE_CATEGORIES), `generators/steps/assembleInstitutions.js` custom block (≈ l. 577–630),
`domain/inferSupplyChains.js`, `domain/content/customSupplyChainActivation.js`.

- A custom institution INSTANCE in the dossier: `source: 'custom'`, `isCustom`, `localUid`, `customDefinitionId` (+ revision,
  content hash), `name`, free-text `category` (≤ 100 chars; 'Other' default), `tags[]`, `description`, `required` (= the
  `essential` flag; non-essential ones enter on a 30 % roll), and scene tokens from `projectCustomInstitutionSceneFields`
  (`sceneProfileId` — 17 archetypes, `landmarkLevel`, `materialFamily`, glyph).
- NOT in the instance: `authority`, `defenseRole`, `criminal`, `magical`, `foodImpact`, `economicWeight`, `satisfies`,
  `produces`, `requires`, `subsumes` — library-only (the dossier has `customContentRoster` / `customContentProvenance`).
- Chains: discovered by matching outputs to inputs; unmatched inputs → import candidates, outputs → export; the author confirms;
  a confirmed chain is active in a settlement only when all its nodes are present. Resource kinds: water, land, special,
  subterranean.

- WHERE they land in the dossier (CONFIRMED 2026-09-28 on the generated `town-cc-1` fixture, lane volumes/V8-settlementforge):
  ACTIVE custom chains in `economicState.customChains[]` (`chainId` `discovered.<uids>.<hash>`, `resource` name,
  `processingInstitutions` names, `outputs`, `activation {state, evaluatedTier, reasons}`, `tradeEndpoints`,
  `tradeEndpointOwners` with `refId`/`nodeUid`); custom resources in `config.nearbyResourceDefinitions[]`; custom services
  in `availableServices.<category>[]` with the provider's NAME in `institution`; `customContentProvenance.materializedDefinitions[]`
  lists each definition's bucket, ids, content hash and surfaces. Scene tokens were ABSENT on the reference pack's record.

**Why:** item 104 (docs/AMENDMENTS-2026-09-28g.md) resolves custom siting from exactly these fields; a future session must not
assume the dossier carries the richer definition fields.

**How to apply:** treat the definition fields as OPTIONAL port inputs (item 20 (h) (iv)); read tags before names (SF's own
advice). Related: [[sf-dossier-port-plan]], [[sf-dossier-identity-keys]], [[dossier-sole-truth-map-derives]].
