#!/bin/sh
D=/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V07/parts
OUT=/home/user/maps-architecture/docs/validation/coherence/new/volumes/V07-village.md
cat $D/00-head.md $D/01-s0.md $D/02-s1.md $D/03-s1b.md $D/04-s2a.md $D/05-s2b.md $D/06-s2c.md $D/07-s2d.md $D/08-s3a.md $D/09-s3b.md $D/10-s3c.md $D/11-s3d.md $D/12-s3e.md $D/13-s3f.md $D/14-s3g.md $D/15-s3h.md $D/16-s4.md $D/17-s5.md $D/18-s6-7.md $D/19-s8.md $D/20-s9.md $D/21-s10-13.md $D/22-notes.md | cat -s > $OUT
python3 /home/user/maps-architecture/docs/validation/coherence/work/rewrite-V07/post.py $OUT
wc -w $OUT
