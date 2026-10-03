# post-processing of the assembled volume: explicit volume prefixes in lists (S7)
import re, sys
p = sys.argv[1]
t = open(p, encoding='utf-8').read()
pat = re.compile(r'(V\d\d) (§[0-9][0-9a-z.]*(?: \([0-9a-z′]+\))?(?: step [0-9a-z]+)?)(, | and | – )§(?=[0-9])')
while True:
    t2 = pat.sub(lambda m: f"{m.group(1)} {m.group(2)}{m.group(3)}{m.group(1)} §", t)
    if t2 == t: break
    t = t2
open(p, 'w', encoding='utf-8').write(t)
