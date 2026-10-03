import sys, importlib, os
sys.path.insert(0, os.path.dirname(__file__))
from lib import Doc
SRC = '/home/user/maps-architecture/docs/volumes/V07-village.md'
OUT = os.path.join(os.path.dirname(__file__), '..', 'V07.new.md')
d = Doc(open(SRC, encoding='utf-8').read())
mods = sys.argv[1:] or ['subs_a', 'subs_b', 'subs_c', 'subs_d', 'tidy', 'prefix']
for m in mods:
    importlib.import_module(m).apply(d)
open(OUT, 'w', encoding='utf-8').write(d.t)
print('applied', len(d.log), 'substitutions;', sum(n for _, n in d.log), 'replacements')
