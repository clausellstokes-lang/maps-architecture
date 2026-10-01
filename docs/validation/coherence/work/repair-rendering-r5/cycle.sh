#!/bin/sh
# cycle.sh — apply the patches, write the block file, dry-run it on copies of the live files, run doc_checks on §8, §9, §11, §12
set -e
W=/home/user/maps-architecture/docs/validation/coherence/work/repair-rendering-r5
S=/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence
mkdir -p $S
cd $W && python3 apply.py && python3 gen_blocks.py preamble.md /home/user/maps-architecture/docs/validation/coherence/repair-r5-rendering.md
cd /home/user/maps-architecture
python3 docs/validation/amendments-b/apply-blocks.py --doc docs/ARCHITECTURE.md --rationale docs/ARCHITECTURE-RATIONALE.md --out-doc $S/rr5-doc.md --out-rationale $S/rr5-rat.md --log $S/rr5-log.json docs/validation/coherence/repair-r5-rendering.md > $S/rr5-apply.out 2>&1 || true
grep -E "^files|not OK|headings|SKIP|skipped" $S/rr5-apply.out || true
timeout 900 python3 docs/validation/bench/doc_checks.py --doc $S/rr5-doc.md --sections "8,9,11,12" > $S/rr5-dc-after.out 2>&1 || true
grep -E "^C[1-4]:|^S[12]:|UNREVIEWED" $S/rr5-dc-after.out || true
