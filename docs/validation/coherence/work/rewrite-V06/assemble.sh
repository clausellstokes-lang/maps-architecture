#!/bin/bash
cd /home/user/maps-architecture/docs
out=validation/coherence/new/volumes/V06-evolution.md; : > $out; first=1
for f in validation/coherence/work/rewrite-V06/parts/*.md; do if [ $first = 0 ]; then echo >> $out; fi; first=0; cat "$f" >> $out; done
python3 - <<'PY'
import re
p='/home/user/maps-architecture/docs/validation/coherence/new/volumes/V06-evolution.md'
t=open(p).read(); t=re.sub(r'\n{3,}','\n\n',t)
if not t.endswith('\n'): t+='\n'
open(p,'w').write(t)
PY
wc -w $out
