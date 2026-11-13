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
| launch-DH.md | DH | M0-a-06 S9 (the frames: round 1B of the kernel amendment), fresh on S8's landed head |
| launch-DI.md | DI | MERGED: M0-a-15 S2 → M0-a-16 S4 → M0-m-01 S2 (Q75's two halves, a type test, the narration guard's pin) |
| launch-DJ.md | DJ | MERGED: M0-e-01 S2 → M0-e-02 S2 → M0-e-03 S4 (the site stages: Q87's copy; Q123's river judgement; Q114, Q115, Q122's S1 share) |
| launch-DK.md | DK | MERGED: M0-a-04 S6 → M0-a-13 S2 (kernel pins) |
| launch-DL.md | DL | MERGED: M0-c-07 S1 → M0-b-05 S2 (bench: the gate's tables record, pins, a restatement) |
| launch-DM.md | DM | MERGED: M0-x-02 S4 → M0-x-04 S3 (Q39's runner door proved in a mirror; two test corrections) |
| launch-DN.md | DN | M0-a-09 S18, the LIBRARY round (the exact kerb as a pure function) — this account's form; created 03:01Z 2026-11-10 and stopped seconds later (J746); CREATED AGAIN 03:48Z on the owner's word to keep launching (J748): RUNNING as session_01FE9mEt94UEWyTzqdx4af9r |
| launch-DN-other-account.md | DN | the same round for a session the OWNER starts on ANOTHER ACCOUNT (no parent to message: the hand-back is written to docs/handbacks/DN.md on wip/child-a09s18); the owner pastes PASTE-DN-other-account.txt into that session |
| launch-DO.md | DO | MERGED: M0-x-06 S2 → M0-x-05 S3 (testkit; not required for M0's exit) |
| launch-DP.md | DP | MERGED: M0-f-02a S2 → M0-f-02b S1 (the tiers; not required for M0's exit) |
| launch-DQ.md | DQ | M0-a-11 S6 (the skeleton's contract angle: measure first; a declared shift if adopted) |
| launch-DR.md | DR | M0-c-01 S4 (the siting: Q99's default view; the plaza-crossing boundary of Q122's S3 share), on M0-c-02 S6's landed head |
| launch-DS.md | DS | M0-c-05 S3 (S5c / S5d: Q150's frame sweep, Q98, Q149), on M0-c-04 S5's landed head |
| launch-DT.md | DT | M0-e-06 S4 (the site spike: the fold's message texts, Q137's renumber-proof digest, the 200-seed summary re-run on the merged head — the re-measure Q122, Q173 and Q174 wait on) |
| launch-DU.md | DU | M0-c-04 S6 (S5a / S5b: Q132's caller wiring, Q173's branching wall chain — diagnose first, Q174 (c)'s unwalled-stage boundary — measure first, Q174 (d)'s pin and wording) |
| launch-DV.md | DV | M0-a-05 S14 (the router's round after the frames; twelve lines), on M0-a-06 S9's landed head |
| launch-DW.md | DW | M0-a-09 S20 (the wiring and measurement round: the exact kerb as a debug-only shadow; the tables round 2B is ruled on), beside M0-a-05 S14 |
| launch-DX.md | DX | M0-a-11 S7 (the skeleton's follow-up on Q180: two test-only pin lines; the engine's spike class, diagnose first), launched when DT's seat freed (J782) |
| launch-DY.md | DY | M0-c-05 S4 (the growth stage's follow-up on Q189: the trim's cut on a street's own end made to succeed; two table-derived floors; one text correction), launched when DS's seat freed (J783) |
| launch-DZ.md | DZ | MERGED: M0-a-04 S7 → M0-a-13 S3 → M0-c-01 S6 (two kernel test pins of Q179; the siting's follow-up of Q190), launched when DR's seat freed (J784) |
| launch-EA.md | EA | MERGED: M0-e-02 S3 → M0-e-03 S5 (the hydrology: a joining tributary's carve made right, four pins of round S2's new path; the water stage: the sliver-hole rule reduced to one measure — Q192, Q193), launched when DJ's seat freed (J786) |
| launch-EB.md | EB | MERGED: M0-f-02a S3 → M0-f-02b S2 (the tier tooling: two load-sensitive tests made facts of what they measure, a deadline for a replay child hung outside any seed, a deterministic pin, a read of the tiers' strengths — Q198, Q175 (b) – (d), Q186), launched when DX's seat freed (J788) |
| launch-EC.md | EC | MERGED: M0-c-02 S7 → M0-c-04 S7 → M0-e-06 S5 (the wall trace's V at a pinned gate — the one cause of eight S5 refusals on lawful input, diagnosed by M0-c-04 S6 — measured over the census and made to succeed, Q173 with Q187 (a), and Q185; then the growth stage's own pins moved to that fix, a refusal's text naming its milestone, two test-only lines; then two bench pins moved off a live refusal, Q187 (e)), bound at the seventy-ninth landing (J789) |
| launch-ED.md | ED | MERGED: M0-a-02 S4 → M0-a-06 S10 (the first two legs of the merged RQ2 round — the kernel-internal vertex role `shape`: the registry row with the version raised, then its maintenance in tx, the pin rule and the restore generation; Q79, Q76, Q78, Q95), SPLIT from the round's third leg and launched before the router round lands (J797) |
| launch-EE.md | EE | MERGED, three independent legs: M0-d-08 S2 → M0-f-02a S4 → M0-a-11 S8 (pass B's first batch: the determinism harness's flaky test bounded without a race, Q153; one value for the tier runner's guard and fallback, Q201; the skeleton's three leftover notes, Q197 (b), (c), (e)), bound from the pass-B triage (J800) |
| launch-EF.md | EF | MERGED, four independent legs: M0-e-02 S5 → M0-c-05 S6 → M0-t-00 S2 → M0-e-04 S6 (pass B's second batch: the hydrology's `flowTo` names the receiving course, a doc sentence, the confluence step measured and pinned — Q208; the street trim's end-row guard pinned or made to succeed — Q203 (a); the two load flakes of the gates made facts of what they control — Q209), bound on the pushed head of the eighty-fifth landing (J808) |
