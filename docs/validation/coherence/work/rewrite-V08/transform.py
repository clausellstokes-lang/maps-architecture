# mechanical transforms for V08 (G-cite, G-DR): other volumes 'Vn §' -> 'V0n §'; DR aliases -> numbers (ID-DR)
import re, sys
src = open(sys.argv[1]).read()
out = re.sub(r'\bV([1-9]) §', lambda m: 'V0%s §' % m.group(1), src)
drmap = {'DR-V8.1':'DR29','DR-V8.2':'DR30','DR-V8.3':'DR31','DR-V8.4':'DR32','DR-V8.5':'DR33','DR-V8.6':'DR28','DR-V8.7':'DR34','DR-V8.8':'DR35','DR-V6.1':'DR28'}
for k,v in drmap.items():
    out = out.replace(k, v)
open(sys.argv[2],'w').write(out)
