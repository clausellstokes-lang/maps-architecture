# apply-t-gate — draft t applied to the gate spec

Lane: sites-roads/apply-t-gate (Opus; J394, Fable-critiqued), under J398 (the owner's "Yes" on Q5), 2026-10-18.

Target: `plat/docs/build/M0-world-sites-gate.md` (the only file this lane edits).
Source: `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json`. This lane applied the 2 fragments whose `file` is exactly the target, in the JSON's order.
Script: `python3 -I /tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply_t_gate.py`. It applies each fragment as one exact replacement, and before each one it asserts that `old` occurs exactly once in the file as it stands at that step.

## md5

| | md5 | lines |
|---|---|---|
| before | `b6c5be2a5d89fbd19035a3c606194fb9` (equals both fragments' recorded md5) | 45 |
| after | `7349635a52587501c1071021b30b4cd4` | 47 |

## Fragments

| id | line | result |
|---|---|---|
| 946 (w) | 31 | applied: the heading `## Model rows (M1–M11)` becomes `## Model rows (M1–M13)` |
| 946 (x) | 45 | applied: the M11 row is kept and the rows M12 (the `inFrame` road-access face) and M13 (the two-point road with its end bearing) follow it |

Adjustments: none. Each `old` was found exactly once at its step.

## Assertions

- Before each fragment, `old` occurred exactly once: 2/2.
- After all fragments, each `new` occurs exactly once: 2/2.
- An `old` that is not a prefix of its `new` is gone: 1/1 (946 (w): 0 occurrences). The `old` of 946 (x) is a prefix of its `new`, so it stays as the opening of the new text.
- The bundle was not regenerated; the record lane regenerates it. No git command was run. The host repository was not touched.
