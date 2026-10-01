#!/bin/sh
# checks.sh — lane coherence/repair-pipeline-r4: dry-run apply of repair-r4-pipeline.md on scratch copies of the live base
# and rationale, the J-A81.41 swap, doc_checks on the touched sections, references on a mirror, and scans of the changed
# lines. Run from the repository root. Writes only under the lane's scratch folder.
R=/home/user/maps-architecture; cd $R
S=/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/repair-pipeline-r4
W=docs/validation/coherence/work/repair-pipeline-r4; A=docs/validation/coherence/work/assemble-r3
mkdir -p $S/apply $S/src-new/docs/volumes
python3 docs/validation/amendments-c/apply-blocks.py --doc docs/ARCHITECTURE.md --rationale docs/ARCHITECTURE-RATIONALE.md \
  --out-doc $S/apply/new.md --out-rationale $S/apply/new-rat.md --log $S/apply/log.json docs/validation/coherence/repair-r4-pipeline.md > $S/apply/out.txt 2>&1
echo "apply exit $?"; grep -E "found|not OK|^headings|^document|^rationale" $S/apply/out.txt
python3 $W/swap_restated.py $S/apply/new-rat.md $S/apply/new-rat-swapped.md
python3 docs/validation/bench/doc_checks.py --doc $S/apply/new.md --sections "4.1,4.3,4.4,4.8,4.11,4.13,10.2" > $S/dc-new.txt 2>&1
echo "doc_checks exit $?"; grep -E "^C[0-9]|^S[0-9]|UNREV|INCOMPLETE" $S/dc-new.txt | sort -u
cp $S/apply/new.md $S/src-new/docs/ARCHITECTURE.md; cp docs/volumes/V*.md docs/volumes/INDEX.md $S/src-new/docs/volumes/
sh $A/mirror.sh $S/src-new $S/mir-new; REFS_ROOT=$S/mir-new timeout 600 python3 $A/refs.py $S/refs-new.json > $S/refs-new.out 2>&1
grep "^base" $S/refs-new.out
python3 $W/scan.py $S/apply/new.md
