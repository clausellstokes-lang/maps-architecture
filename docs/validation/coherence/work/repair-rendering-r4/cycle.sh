#!/bin/sh
# cycle.sh — apply the patches, generate the block file to the scratch draft, dry-run it on copies, swap the restated rows, run doc_checks on §8, §9, §11, §12
set -e
W=/home/user/maps-architecture/docs/validation/coherence/work/repair-rendering-r4
S=/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence
cd $W && python3 apply.py && python3 gen_blocks.py preamble.md $S/rr4-draft.md
cd /home/user/maps-architecture
python3 docs/validation/amendments-b/apply-blocks.py --doc docs/ARCHITECTURE.md --rationale docs/ARCHITECTURE-RATIONALE.md --out-doc $S/rr4-doc.md --out-rationale $S/rr4-rat.md --log $S/rr4-log.json $S/rr4-draft.md > $S/rr4-apply.out 2>&1 || true
grep -E "^files|not OK|headings|SKIP|skipped" $S/rr4-apply.out || true
python3 $W/swap_restated.py $S/rr4-doc.md $S/rr4-rat.md $S/rr4-doc-swapped.md $S/rr4-rat-swapped.md
timeout 900 python3 docs/validation/bench/doc_checks.py --doc $S/rr4-doc-swapped.md --sections "8,9,11,12" > $S/rr4-dc-after.out 2>&1 || true
grep -E "^C[1-4]:|^S[12]:|UNREVIEWED" $S/rr4-dc-after.out || true
