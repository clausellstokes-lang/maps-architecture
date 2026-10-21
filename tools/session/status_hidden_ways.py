import re,collections,datetime
lanes=collections.OrderedDict()
for l in open('docs/lane-events.log',encoding='utf-8'):
    m=re.match(r'^(\d{4}-\d\d-\d\d \d\d:\d\d) (hidden-ways/\S+) (\S+)',l)
    if m: lanes[m.group(2)]=(m.group(1),m.group(3),l.strip()[:220])
now=datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%MZ')
out=[f"# STATUS — the hidden-ways design run (lanes hidden-ways/*; written by the autosave loop at {now})\n","| lane | last line | state | the line |","|---|---|---|---|"]
for k,(t,s,l) in lanes.items(): out.append(f"| {k} | {t} | {s} | {l.replace('|','/')} |")
open('docs/validation/hidden-ways-2026-10-18/STATUS.md','w',encoding='utf-8').write('\n'.join(out)+'\n')
print(f"STATUS.md: {len(lanes)} lanes")
