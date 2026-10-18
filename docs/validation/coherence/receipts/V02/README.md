# Receipts for V02 (buildings) — moved into the project by coherence/rewrite-V02 (2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V02; covered by the whole-design retrovalidation (J84).

Copied from the session scratchpad (`volumes/revise-v2/`, `volumes/rcV2/`, `volumes/revise-v2b/`, `volumes/v2-110/`)
so that V02 cites project paths only (standalone rule; finding V02-BREF-1). Re-executed on 2026-09-29:

| file | what it backs (V02) | re-run |
|---|---|---|
| `medians.py` → `medians.out` | V02 §3.10.3's table of the rows' median footprints against the budgets (every ratio in [0.91, 1.31]) | re-executed: `min 0.91 max 1.31`, every row as the table states |
| `medians_new.py` → `medians_new.out` | the `fort` and `burial-ground` medians (1.01–1.12) | re-executed: identical to the recorded output (`medians_new.rerun-2026-09-29.out`) |
| `stepped_receipt.py` → `stepped_receipt.out` | V02 §3.10.3's stepped rows: ST0's least stack, the median stacks, the tiered tower against its budget (the script's first 35 output lines) | re-executed: lines 1–35 identical (`stepped_receipt.rerun-2026-09-29.out`) |
| `stepped_receipt.out` lines 36–74 | the `tiersTruncated` Monte-Carlo column (N = 4 000 per anchor) | recorded output only — the generating script was run inline and not saved; the figures are PLAUSIBLE until T-V2-46 measures them at M3a (V02 §12) |
| `quote-check.txt` | the item-110 fold's base-quotation census (every quoted base sentence found once) | a recorded census; the quotations it checked are applied base text since file f was applied |
