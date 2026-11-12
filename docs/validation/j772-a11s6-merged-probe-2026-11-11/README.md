# J772 — N-s6-1's face read on the merged tree, 2026-11-11

M0-a-11 S6 gave the skeleton's `spine` and `regions` readers the design's 1° corner bound. One face was known
to fail the validator under that bound: relief-3000 seed 7, district #56 (4.64°), recorded by the item's round
S3 on the 2026-10-14 tree (`planarity arc 42 crosses arc 46`). Neither the round's build nor its closing check
could read it: on their trees that seed derived no district faces. J761 (1) left the reading to the session,
on the merged tree.

Run on the merged tree (55042d29, the round's landing), from `plat/`, with the closing check's committed probe:

    corepack pnpm exec tsx --conditions=plat-source docs/build/checks/M0-a-11-s6-evidence/measure-band.mjs \
      <out.json> relief relief-3000 default 7

| file | what |
|---|---|
| relief3000-7.json | the probe's output |
| relief3000-7.log | its console line and time (2 min 33 s) |

Result: the seed derives 129 district faces and 1 water face, no bug. Seven district faces have their
sharpest corner in [1°, 5°) — #10 3.43°, #13 4.48°, #15 1.31°, #23 3.57°, #30 3.50° and two more, from 1.31° to
4.48° — and all seven validate for `spine` and for `regions` (`roof` refuses the seven, as before). One face
is refused `notSimple` for every use (the class N-s6c-7 routes upstream). No face of the seed has a 4.64°
corner: October's district #56 is not derived on today's tree, so its rejection cannot be read or pinned.

## The other seeds N-s6-4 named (the same probe, the same tree)

The round's notes (N-s6-4) listed seeds that derived no district face on the round's tree. On the merged tree
every one of them derives districts:

| file | seeds | district faces | with a corner in [1°, 5°) | of those, validated for spine and regions | other |
|---|---|---|---|---|---|
| relief60.json / .log | relief-60 default 1, 11 – 16 | 94, 94, 80, 95, 79, 97, 66 | 23 | 23 | spine validates 612 of 612 faces |
| relief3000.json / .log | relief-3000 default 4, 6, 9, 10, 12, 13 | 104, 102, 124, 93, 114, 86 | 30 | 30 | 12 faces `notSimple` for every use; 2 below 1° refused |

With seed 7 above: 60 band faces on these fourteen derivations, all 60 validated; 13 `notSimple` district faces,
all on relief-3000 (fix queue Q180 (c)).

## What makes a district face `notSimple` (the session's own probe, J774)

`pinch.mjs` (run from `plat/` of a worktree at 55042d29 with `tsx --conditions=plat-source`, arguments
`<out.json> relief-3000 default 13 4 7`) reads each district face the skeleton's reader refuses `notSimple` and
classes every pair of its ring's non-adjacent edges that meet. `pinch.log` is its console, `pinch.json` the six
faces with their rings.

| face | ring size | vertices visited twice | exact fold-backs (a, b, a) | edge pairs meeting at a shared vertex | collinear pairs sharing a vertex | proper crossings | T touches |
|---|---|---|---|---|---|---|---|
| seed 13 #27, outer | 168 | 17 | 1 | 41 | 15 | 0 | 0 |
| seed 13 #27, hole | 22 | 10 | 2 | 20 | 9 | 0 | 0 |
| seed 13 #38 | 37 | 10 | 1 | 23 | 8 | 0 | 0 |
| seed 13 #75 | 68 | 1 | 0 | 4 | 0 | 0 | 0 |
| seed 4 #33 | 151 | 2 | 0 | 6 | 1 | 0 | 0 |
| seed 4 #75 | 417 | 29 | 5 | 69 | 23 | 0 | 0 |
| seed 7 #43 | 153 | 28 | 3 | 65 | 24 | 0 | 0 |

No ring crosses itself and none has a vertex resting on another edge's interior. Every one is a face whose
boundary WALK revisits vertices: it runs out and back along ways that end inside the face, or around a loop
joined to the rest at one vertex or by one way (seed 13 #75 is the smallest case: a three-vertex lobe of about
7 m by 4 m hanging off the ring at (43086, 74276)). That is what a face of a planar arrangement looks like when
the network around it has a dead end, a bridge edge or a cut vertex — lawful topology, not a geometric fault.

