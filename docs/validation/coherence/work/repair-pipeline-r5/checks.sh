#!/bin/sh
# checks.sh — lane coherence/repair-pipeline-r5: dry-run apply of repair-r5-pipeline.md on scratch copies of the live base
# and rationale, doc_checks on the touched sections (new and live), references on a mirror (assemble-r4's refs.py), and
# scans of the changed lines. Run from the repository root. Writes only under the lane's scratch folder.
R=/home/user/maps-architecture; cd $R
S=/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/rp5
W=docs/validation/coherence/work/repair-pipeline-r5; A=docs/validation/coherence/work/assemble-r4
SEC="4.1,4.3,4.4,4.5,4.7,4.8,4.11,4.13,10.2,II.7.3"
mkdir -p $S/apply $S/src-new/docs/volumes $S/src-old/docs/volumes
python3 docs/validation/amendments-c/apply-blocks.py --doc docs/ARCHITECTURE.md --rationale docs/ARCHITECTURE-RATIONALE.md \
  --out-doc $S/apply/new.md --out-rationale $S/apply/new-rat.md --log $S/apply/log.json docs/validation/coherence/repair-r5-pipeline.md > $S/apply/out.txt 2>&1
echo "apply exit $?"; grep -E "found|not OK|^headings|^document|^rationale" $S/apply/out.txt
python3 docs/validation/bench/doc_checks.py --doc $S/apply/new.md --sections "$SEC" > $S/dc-new.txt 2>&1
echo "doc_checks new exit $?"; grep -E "^C[0-9]|^S[0-9]|UNREV|INCOMPLETE|NOT authoritative" $S/dc-new.txt | sort -u
python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --sections "$SEC" > $S/dc-old.txt 2>&1
echo "doc_checks live exit $?"; grep -E "^C[0-9]|^S[0-9]" $S/dc-old.txt | sort -u
cp $S/apply/new.md $S/src-new/docs/ARCHITECTURE.md; cp docs/volumes/V*.md docs/volumes/INDEX.md $S/src-new/docs/volumes/
sh $A/mirror.sh $S/src-new $S/mir-new; REFS_ROOT=$S/mir-new timeout 900 python3 $A/refs.py $S/refs-new.json > $S/refs-new.out 2>&1
echo "refs new"; grep -E "^base|^vol|broken|ambig" $S/refs-new.out | head -8
cp docs/ARCHITECTURE.md $S/src-old/docs/ARCHITECTURE.md; cp docs/volumes/V*.md docs/volumes/INDEX.md $S/src-old/docs/volumes/
sh $A/mirror.sh $S/src-old $S/mir-old; REFS_ROOT=$S/mir-old timeout 900 python3 $A/refs.py $S/refs-old.json > $S/refs-old.out 2>&1
echo "refs live"; grep -E "^base|^vol|broken|ambig" $S/refs-old.out | head -8
python3 $W/scan.py $S/apply/new.md
