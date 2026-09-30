cd /home/user/maps-architecture/docs/validation/coherence/work/rewrite-V08
out=/tmp/maps-scratch/coherence/V08-draft.md
cat parts/00-head-s0.md parts/01-s1.md parts/02-s1b.md > $out; echo >> $out
for p in 03-s2-1-5 04-s2-6 05-s2-6a 06-s2-6b 07-s2-6c 08-s2-7-8 09-s3-1-4 10-s3-5 11-s3-5-1 12-s3-6-14 13-s3-15 14-s4 15-s5 16-s6 17-s7 18-s8 19-s9 20-s10-13; do cat parts/$p.md >> $out; echo >> $out; done
cat -s $out > /tmp/maps-scratch/coherence/V08-draft2.md
wc -w /tmp/maps-scratch/coherence/V08-draft2.md
