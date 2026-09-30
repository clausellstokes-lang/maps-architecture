import re,sys
p=sys.argv[1]; t=open(p).read()
t=re.sub(r'first\s+paint','first map',t)
t=re.sub(r"\bthe engine's strike lottery\b","the strike pool",t)
t=re.sub(r"\bthe engine's lottery\b","the strike pool",t)
t=re.sub(r"\bstrike lottery\b","strike pool",t)
t=t.replace('DEFINITION V07 §','DEFINITION.md §')
# expand V07 list continuations: "V07 §a, §b" -> "V07 §a, V07 §b"
pat=re.compile(r'(V07\s+§[\d.a-z]+(?: \([^()]{0,12}\))*(?:(?:,\s+|\s+and\s+)V07\s+§[\d.a-z]+(?: \([^()]{0,12}\))*)*)((?:,\s+|\s+and\s+))§(\d)')
for _ in range(6):
    t2=pat.sub(lambda m: m.group(1)+m.group(2)+'V07 §'+m.group(3),t)
    if t2==t: break
    t=t2
open(p,'w').write(t)
print('post ok', len(t.split()))
