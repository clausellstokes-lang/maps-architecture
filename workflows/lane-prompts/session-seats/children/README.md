# Child launch prompts (kept in the repository since J714, 2026-11-09)

Each file is the whole prompt of one child cloud session, rendered by `tools/session/child_launch.py` or
`tools/session/int_launch.py` and committed BEFORE the child is created; the child's creation prompt only points at its
file, which it reads whole from its own clone of the design branch. A prompt kept only in the managing seat's
scratchpad is lost with that container (the launch files of CS, CT, CU and CV were); here a successor seat can read
what each child was told, and re-create a child from the same text.

| file | child | round |
|---|---|---|
| launch-CW.md | CW | M0-a-06 S8 (the write door), resumed from wip/child-a06s8d |
| launch-CX.md | CX | M0-c-02 S6 (the enceinte round), resumed from wip/child-c02s6c |
| launch-CY.md | CY | M0-c-04 S5 (the growth round), resumed from wip/child-c04s5c |
| launch-CZ.md | CZ | the integration re-check g15-close (M0-x-04 after S2), fresh |
| launch-DA.md | DA | the integration check g18 (M0-f-02b), fresh |
| launch-DB.md | DB | the integration check g17 (M0-x-06, M0-f-03b, M0-t-00, M0-c-07), fresh |
| launch-DC.md | DC | M0-c-06 S1 (the fusion harness: per-stage work blocks, two pins), fresh |
| launch-DD.md | DD | M0-e-04 S5 (the districts stage: Q143, Q141), fresh |
| launch-DE.md | DE | M0-d-05a S2 (the identity mint: Q93), fresh |
| launch-DF.md | DF | a MERGED ROUND: M0-f-01 S1, M0-d-06 S2, then M0-t-00 S1 (the timing phase times a production bundle), fresh |
| launch-DG.md | DG | the flow's whole-suite check (one session seat under workflows/35 from workflows/lane-prompts/session-seats/whole-suite-flow-7.md), fresh |
