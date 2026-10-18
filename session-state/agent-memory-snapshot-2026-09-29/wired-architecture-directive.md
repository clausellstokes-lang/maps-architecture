---
name: wired-architecture-directive
description: "Owner rule (2026-09-28): every piece of engineering must be wired to something else, the dossier included — orphans, dangling inputs, one-ended hooks and unreached dossier fields are defects; checked as a wiring graph (workflows/18-coherence.js, wiring.py)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: c0d81c15-f08e-4364-97ca-c6b05aa13811
---

Owner, 2026-09-28 ~04:10: "make sure you do a complete coherence and cohesive pass as well" and "both with the dossier and
all of the interconnecting pieces making sure that every piece of engineering is to be wired to something else".

Applied as J91: `workflows/18-coherence.js` builds a WIRING GRAPH of the whole set (base + volumes) — records and fields,
stages, tables, interfaces, packages, edit kinds, tools, tests, hooks, entity kinds, dossier fields, derivation rows,
exports, with typed edges — lists every orphan (produced, never consumed), dangling input, one-ended hook and unreached
dossier field, and traces the dossier end to end (field → consumer or ignore-list; derived fact → inputs and derivation
row; change kind → every dependent). Editors close each gap or remove the piece with a ruling. The volumes (17) carry a
wiring table per volume; their critique checks it.

**Why:** the owner wants one connected system, not a catalogue of features; a piece nothing feeds or nothing reads is
dead design that builders would either skip or guess around.

**How to apply:** in any Maps design, review or build-spec work, state for each new piece what feeds it and what it
feeds (and, for dossier-driven facts, the dossier field and derivation row); treat an unwired piece as a defect, not a
style issue. Related: [[dossier-sole-truth-map-derives]], [[maps-project-state]].
