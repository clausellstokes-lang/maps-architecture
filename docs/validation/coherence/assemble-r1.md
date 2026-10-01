# Assemble — coherence pass, round 1 (the eighteen repair-r1 block files applied to the base, the volumes, INDEX and the rationale)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/assemble-r1 (a mechanical seat); covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/assemble-r1`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 sha256 of every live file before (15, each equal to its HEAD blob); untouched snapshot — done (`snapshot.py`, `snapshot.json`)
- P2 block inventory, routing, double-REPLACE and missing-heading census — done (`route.py`, `blocks.json`: 254 blocks, 3 RULING REQUEST, 0 missing, 0 double REPLACE)
- P3 apply (base with the rationale; each volume; INDEX), audit — done on scratch copies (`apply.py`, `logs/`; `handoff.py`: J-A73.06 swap, three title-block widenings); install — done (`install.py`, `install.json`: 15 of 15 live files written, each guarded on its P1 sha256)
- P4 references: resolver on the untouched and the final set (`refs.py`, `refsreport.py`): 0 broken, 0 mechanical fixes needed, 82 ambiguous-form listed — done
- P5 document checks, three-copy method (`checks.py`, `attrib.py`, `allowrows.py`): 55 reviewed allow rows, all six runs exit 0, provisional — done for the base; the volume seats' proposed rows — pending
- P6 bundle and `--check` — pending
- P7 this report, the result file, LANDED — pending

Status: IN PROGRESS. Every step runs as a script under `docs/validation/coherence/work/assemble-r1/`; no text is hand-edited.
