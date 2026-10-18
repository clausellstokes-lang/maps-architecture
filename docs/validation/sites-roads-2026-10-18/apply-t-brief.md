# apply-t-brief — draft t applied to the owner's brief

Lane: sites-roads/apply-t-brief (Opus; J394, Fable-critiqued), under J398 (the owner's "Yes" on Q5), 2026-10-18.

Target: `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` (the only file this lane edits).
Source: `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json`. This lane applied the 2 fragments whose `file` is exactly the target, in the JSON's order.
Script: `python3 -I /tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply_brief.py`. It applies each fragment as one exact replacement, and before each one it asserts that `old` occurs exactly once in the file as it stands at that step.

## md5

| | md5 | lines |
|---|---|---|
| before | `fc2520709752ef77f397ba7d6a89c169` (equals both fragments' recorded md5) | 212 |
| after | `11d7d45875db5093d2aef909b0b885ba` | 216 |

The script printed one md5 note: at 947 (q)'s step the file's md5 was `b3cebf68…` and not the recorded `fc252070…`. This is expected, because 947 (p) had just been applied. Both fragments record the base md5. The once-in-target assertion held, and that assertion is the one that matters.

## Fragments

| id | line | result |
|---|---|---|
| 947 (p) | 81 | applied: Part A's M11 row is kept and the rows M12 (the L3 access faces beginning on a reservation's boundary, J393) and M13 (S4's two-point road with its end bearing, J393) follow it. These mirror the gate's rows. |
| 947 (q) | 153 | applied: the volume's scope sentence ends with the owner's thread of 2026-10-18 (J393). That thread covers each site kind's road access, its place on the road network and the catalogue-dependent autocorrect of its placement, with V13's routes and placement law. The one line becomes three. |

Adjustments: none. Each `old` was found exactly once at its step.

## Assertions

- Before each fragment, `old` occurred exactly once: 2/2.
- After all fragments, each `new` occurs exactly once: 2/2.
- An `old` that is not a prefix of its `new` is gone: 1/1 (947 (q): 0 occurrences). The `old` of 947 (p) is a prefix of its `new`, so it stays once as the opening of the new text.
- The bundle was not regenerated; the record lane regenerates it. No git command was run. The host repository was not touched.
