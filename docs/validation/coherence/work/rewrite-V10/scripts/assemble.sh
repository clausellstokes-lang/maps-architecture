cd /home/user/maps-architecture/docs/validation/coherence/work/rewrite-V10
out=/tmp/maps-scratch/coherence/V10-draft.md
: > $out
for p in 00-head-s0 01-s1 02-s1b 03-s2-1-9 04-s2-10-11 05-s2-12 06-s2-13-15 07-s3-1-4 08-s3-5-8 09-s3-9 09b-s3-9b 10-s3-10-14 11-s3-15-17 12-s3-18-22 12b-s3-23 13-s4 14-s5-6 15-s7 16-s8 17-s9 18-s10-13; do cat parts/$p.md >> $out; echo >> $out; done
cat -s $out > /tmp/maps-scratch/coherence/V10-draft2.md
wc -w /tmp/maps-scratch/coherence/V10-draft2.md
