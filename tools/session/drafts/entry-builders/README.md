# Entry builders — the scripts that wrote the last rounds' spec entries (kept as models)

Each script built one child's entries and appended them to `workflows/lane-prompts/session-fix-cloud/specs.json`
(they were run once, from the managing seat's scratch folder, and are NOT to be run again: every entry they write is
already in specs.json). They are kept because an entry has a fixed frame that is easiest copied from a working script:

- the opening (why the session opened the round: J237 (2), J238, J567; the queue rows by their own grep);
- RULES — taken from the M0-c-05 S4 entry between "Each 'failing line' below is one such row" and
  'THIS ROUND, IN THIS ORDER:', with its notes-section name replaced;
- MERGED (the merged-round sentence, with the leg's number);
- REDS (the head's declared reds — bring it to the head's list at every binding);
- RESTARTS (J796, J810: no entry is bound without it; an entry whose NEAR folder holds a strength-gated file also
  carries the BY-CELL sentence — see the paragraph appended to M0-c-02 S7);
- SCAN TESTS (J812: no entry is bound without it either — the sentence is in M0-e-02 S5's session clause);
- the notes / verdict / lane tail; then the lines (`line`, `evidence`, `required_change`).

`ef-entries.py` (four independent legs, child EF) is the newest and the best model. After appending: render the
entries (`node workflows/lane-prompts/session-fix-cloud/render.mjs <specs with local args> <out dir>`) and read the
lane keys in the rendered briefs before a launch file names them.
