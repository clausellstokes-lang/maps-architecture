# research/fmg — the Fantasy Map Generator survey (research seat, 2026-10-16)

Clean-room: research-side material. Implementer seats never open this folder (`plat/CLEAN-ROOM.md` rule 2). No FMG
code, data table, palette or name list is reproduced here; identifiers appear only as citations. Upstream FMG
(MIT, Max Haniyeu) and its wiki were cloned under `reference/` (gitignored); SettlementForge's own repository was
cloned read-only beside the working tree for the host audit.

| file | what |
|---|---|
| `FMG-survey.md` | the synthesis: every release, the pipelines, the data model, editing, rendering, roadmap, the host audit, and one matrix of KEEP / GENERALIZE / REJECT / REPLACE verdicts per capability |
| `notes/fmg-releases-and-changelog.md` | every version 2017–2026-10 with what changed; format-breaking changes; FMG 2.0 |
| `notes/fmg-physical-pipeline.md` | grid, heightmap, features, climate, rivers, lakes, biomes, resample; per-stage verdicts; the boundary-condition list |
| `notes/fmg-human-layers.md` | cultures, burgs, states, provinces, religions, routes, military, economy, journeys; PHYSICAL / SHARED / POLITICAL verdicts; the burg-to-city-generator handoff |
| `notes/fmg-data-model-and-io.md` | grid and pack fields, entity records, identity, the `.map` format and migrations, exports and imports, URL parameters, integrations; the import field mapping |
| `notes/fmg-editing-and-rendering.md` | every editor, regeneration and undo semantics, the renderer split, styles, labels; the eighteen stale-data paths |
| `notes/fmg-roadmap-and-ecosystem.md` | FMG 2.0 intentions and PRDs, request themes, community, ecosystem tools and forks, licensing; sources blocked |
| `notes/fmg-blog-history.md` | the 16 blog posts of 2017–2018 (bodies unreachable here; techniques reconstructed from the author's code at each date) |
| `notes/sf-host-fmg-integration-audit.md` | SettlementForge's vendored fork, bridge, digest, instant worlds and the coherence finding |

The design consequence is `docs/design/proposal-world-native.md` (the FMG/world column of the decision matrix).
