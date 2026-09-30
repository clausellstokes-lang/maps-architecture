import re,sys,glob
files={f[:3]:open(f).read() for f in glob.glob('V*.md')}
checks=[l.rstrip('\n').split('|',2) for l in open(sys.argv[1]) if l.strip() and not l.startswith('#')]
for hid,vol,pat in checks:
    n=len(re.findall(pat,files[vol]))
    print(f"{hid:10} {vol} {n:4}  {pat[:90]}")
