---
name: known-city-authoring-experiment
description: "Owner experiment (2026-09-27): author a known city (the Baldur's Gate map) through the edit layer — ruled J78: build it at M3a as an original-skeleton acceptance fixture (skeleton file + underlay tracing), never an image converter; reference images study-only under research/reference-maps/"
metadata:
  node_type: memory
  type: project
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

On 2026-09-27 ~18:00 EDT the owner shared the official Baldur's Gate city map (colour and ink variants) and asked, "as a
bit of an experiment once you get to the edit build, what tools and builds would you need to build the following for
edits. And see if you should build it." The Fable manager's assessment is `docs/experiments/known-city-authoring.md`
(J78 in `docs/PROGRESS.md`; backlog lane `experiment/known-city-authoring`, parked until `build/M3a`): nearly every
declaration is an existing §7.1 edit kind; gaps are a leader-line label switch, an editor underlay image, a skeleton
file read as the log's creation prefix (all small) and plots on a bridge deck (staged). Ruling: build it as the M3a
acceptance fixture from an ORIGINAL skeleton with the map's structure and our own names; no image-to-map converter.

**Why:** it is the acid test of "everything is editable" and of derive-before-invent (a human skeleton is a dossier of
geometry), and neither MFCG nor FTG can reproduce a given city — a real improvement. The base (M1) comes first.

**How to apply:** when the M1 build spec or the M3a plan is written, fold in the four small pieces and the fixture as an
acceptance bar; keep `research/reference-maps/baldurs-gate/` behind the implementer firewall (WotC/Larian copyright:
no name, shape or colour traced into the design or fixtures). See [[maps-project-state]], [[clean-room-input-hazard]],
[[dossier-sole-truth-map-derives]].

**2026-09-27 ~18:30 — the owner widened the ask into a design:** "come up with an elegant set of tools for both an ai clerk and a user where a dedicated user can build it or emulate it." Designed as OWNER RULE item 101 in `docs/AMENDMENTS-2026-09-27e.md` (numbering from 101, clear of the survey's 73+): declare-then-derive; one vocabulary on three surfaces (canvas tools, the clerk's typed tool API, the skeleton file as the log's creation prefix); twelve tools in five layers (intend · ground, wall, road, quarter · place, roster · fill, shape, hold · name, dress); the clerk reads, authors, critiques and iterates through the same API; bars: ≤ 12 tools, identical events from every surface, export→import byte-identical, the clerk's transcript replays. Applied by a short pass after c and d, before the freeze (J79).

**2026-09-27 ~19:00 — UX evidence folded in (owner: look up similar tools for a casual audience):** item 101 (f) holds twelve sourced UX rules — declare-then-derive works only when the deriving is visible (ghost previews), previewed with counts before commit, adjustable after, paint-not-parametrise, three variations + one dial + reroll for fills, automatic layers, start from a finished town, direct manipulation (CC3+ is the counter-example), progressive depth, the clerk speaks in previews, total undo, learn by doing; (g) gives each of the twelve tools its gesture, feedback, preview/undo and first hint. Breadth survey: `research/ux/tool-survey.md` (Opus lane ux/tool-survey).

**2026-09-27 ~19:45 — breadth survey landed** (`research/ux/tool-survey.md`, 38 tools, 440 sources, 38/38 claims re-fetched): R1–R12 confirmed with four evidence corrections; R13–R19 adopted in item 101 (f′) — declared means held by default, the count badge on every area declaration, never lose work (log = autosave, restore points), everything derived has a handle and move is first-class, hand off data to VTTs, the clerk optional/labelled/preview-first/never pixels; plus a first-five-minutes usability bar at M2a/M3a. Key market fact: no tool pairs a rule-based town generator with an assistant that emits declarations; text-to-map products return flat pictures; the hobby treats 'no generative AI' as a selling point while exempting procedural generation.


**2026-09-28 ~23:15 — second reference, Port Nyanzaru (J114):** owner asked whether the toolkit could emulate it. Verdict in
docs/experiments/known-city-authoring.md §6: structure yes via a ~60-declaration skeleton; four small gaps proposed, NOT filed
(terrace retaining walls, raised roads/viaducts over streets, stepped massing for stepped temples, buildings on moles/jetties
like the staged deck plots); image study-only at research/reference-maps/port-nyanzaru/ (WotC). Proposed second fixture at M3a.
