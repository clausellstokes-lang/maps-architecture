# Drafts of the managing seat

Text that is written but cannot be committed where it belongs yet, kept here so that it survives a restart of the
container and a change of account (the scratch directory survives neither a fresh session nor another account).

- `j805-draft.py` — the ledger row and queue rows of the eighty-fourth and eighty-fifth landings (child EA). They sit on
  the managing seat's branch until their gate (gate child G2, name e02s3) is green; then run the script with the
  gate's sentence, the end time and a closing sentence (`<script> '<gate sentence>' '<end HH:MMZ>' '<tail>'`) and
  delete it. (The drafts of J794 and J795 were written into the ledger at 05:10Z on 2026-11-13 and removed.)
- `handoff-table.txt` with `handoff_table.py` — the takeover table of `docs/HANDOFF.md`: edit the template, then run
  the script with the time, the branches sentence, a leading sentence for the children (may be empty) and the busy list.
- `livejson.py` — adds or removes a child in `workflows/lane-prompts/session-seats/children/live.json`.
