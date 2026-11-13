# Drafts of the managing seat

Text that is written but cannot be committed where it belongs yet, kept here so that it survives a restart of the
container and a change of account (the scratch directory survives neither a fresh session nor another account).

- `j794-draft.py`, `j795-draft.py` — the ledger rows and queue rows of the eighty-second and eighty-third landings.
  Each landing sits on the managing seat's branch until its gate is green; then run the script with the gate's
  sentence, the end time and a closing sentence (`<script> '<gate sentence>' '<end HH:MMZ>' '<tail>'`), J794 first.
  Delete a script once its row is written.
- `handoff-table.txt` with `handoff_table.py` — the takeover table of `docs/HANDOFF.md`: edit the template, then run
  the script with the time, the branches sentence, a leading sentence for the children (may be empty) and the busy list.
- `livejson.py` — adds or removes a child in `workflows/lane-prompts/session-seats/children/live.json`.
