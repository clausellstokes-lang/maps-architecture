# The contracts round (RL13 + RL15): spec, 2026-11-13, folded after its adversarial review (J803)

**NOTHING IN THIS FOLDER IS BOUND.** The round belongs to M0-a-06 (J803 R1). It is one merged round of three legs, run as M0-a-06 S11 → M0-e-03 S6 → M0-c-04 S8, and each leg launches only if the one before it passed (R2).

## The files

- **The three entries.** `spec-M0-a-06-S11.json`, `spec-M0-e-03-S6.json` and `spec-M0-c-04-S8.json` are the entries in specs.json's form. They include the review's fourteen numbered changes, folded under the final rulings.
- **`v1/`** holds the first three entries, unchanged.
- **`rulings-final.md`** holds the session's binding rulings R1 – R13 (J803). It replaces `rulings-provisional.md`.
- **`review/`** holds the review: `review.md` (F1 – F13 and the fourteen numbered changes), plus `probes/` and `logs/`, which the entries cite as evidence.
- **`changes.md`** maps each numbered change and each ruling to the entry and line it moved, and lists what could not be folded.
- **`draft.md`** is the spec seat's draft: the findings, the designs and the questions. Its §6 holds the corrections made after the review.

## What remains before binding

1. M0-a-06 S10 must land (child ED).
2. On that head, the cites of tx/tx.ts `run` must be re-read: S10 inserts the `shape` rows' maintenance at the commit.
3. The declared reds in the entries must be brought to that head's list.
4. The three entries must be appended to `workflows/lane-prompts/session-fix-cloud/specs.json`, with a launch file.
5. Legs 2 and 3 also wait for M0-e-03 S5 (child EA) and M0-c-04 S7 (child EC) to land.
