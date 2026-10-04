---
name: clean-room-input-hazard
description: The Maps findings files quote TownGeneratorOS (GPL-3) code and reference grammars/palettes verbatim; never hand them, captures/ or research/ftg-capture/presets.json to implementer seats
metadata:
  type: project
---
Measured 2026-09-25 by the redteam:improve lane (`docs/validation/redteam-improve.md` IMP-1, pending Fable review):
`research/findings/os-model.md` (91 Haxe-like statement lines inside code fences), `os-wards-render.md` (71) and
`os-geometry.md` (27) quote TownGeneratorOS GPL-3 source (e.g. the 2017 spiral seeding loop line for line);
`profile-mfcg.md` §9.1 reproduces MFCG's `grammar.json` verbatim; `profile-neighbourhood.md` reproduces NG's grammar and
six palettes; ≈ 890 reference hex colours sit across 15 findings files; `captures/` holds 920 JSON bodies (grammars,
palettes) outside the `*.js` CI rule; `research/ftg-capture/presets.json` is FTG's whole content database (209 building
types, 80-node dependency graph, 299 professions, 323 items).

**Why:** ARCHITECTURE.md §17 names "the findings" as implementers' only inputs and polices only import paths; the
owner's clean-room ruling forbids copying code or reusing the references' wordlists, palettes and tables, and D-22 keeps
the owner's own licence choice open.

**How to apply:** in the build phase give implementer seats ARCHITECTURE.md plus a sanitised digest (no code excerpts,
no reference data); keep the `@plat` repository outside `research/`, `captures/` and `reference/`; B-REF reads a
numbers-only baselines file of our own measurements; add a content deny-list check in CI. See [[maps-project-state]],
[[fable-review-queue]].

**Update 2026-09-25 (owner chose GPL-3 for the module):** the TownGeneratorOS quotes are no longer a licence problem for a GPL-3 module (attribution and notices required); the MFCG/Neighbourhood grammars and palettes and FTG's presets/content tables remain third-party creative content and must still never reach implementers or the product.

**Update 2026-09-27:** the owner chose to stay PRIVATE; the GPL-3 route (which had opened TownGeneratorOS code for adaptation with attribution) is closed again — TownGeneratorOS is an idea source only, its code never adapted; implementers still receive docs/ARCHITECTURE.md plus a sanitised digest, never the os-*.md findings that quote code.

**Owner directive 2026-09-27 ~01:35 ("oh read them. don't hesitate. we captured it, we read it, unless we directly copy their code line by line, that is copyright. but to read them and to understand their logic, that is another thing entirely."):** the captured compiled bundles (captures/**/network/bodies/*.js) MAY now be read by READER lanes to understand the logic. Still forbidden: copying code (no verbatim snippets beyond an identifier used for citation), copying data assets (palettes, grammars, wordlists, tables), adopting reference identifiers in the design or the code (doc check C1). The implementer firewall stays: implementers receive docs/ARCHITECTURE.md plus a sanitised digest, never the code-reading findings (research/findings/code-*.md) nor the bundles.
