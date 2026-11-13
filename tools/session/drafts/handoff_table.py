#!/usr/bin/env python3
"""Rewrite docs/HANDOFF.md's takeover table (from '**THE TAKEOVER TABLE at ' to the end of the busy list's line) from the
template beside this file (handoff-table.txt — edit the template first, then run this).
usage: handoff_table.py '<HH:MMZ YYYY-MM-DD>' '<branches sentence>' '<a leading children sentence, may be empty>' '<busy list>'"""
import os
import sys
t, branches, children, busy = sys.argv[1:5]
here = os.path.dirname(os.path.abspath(__file__))
p = os.path.abspath(os.path.join(here, '..', '..', '..', 'docs', 'HANDOFF.md'))
s = open(p, encoding='utf-8').read()
a = s.find('**THE TAKEOVER TABLE at ')
c = s.find('**THE BUSY LIST:**', a)
d = s.find('\n', c)
assert 0 <= a < c < d
new = open(os.path.join(here, 'handoff-table.txt'), encoding='utf-8').read().rstrip('\n')
for k, v in (('«T»', t), ('«BRANCHES»', branches), ('«CHILDREN»', children), ('«BUSY»', busy)):
    assert new.count(k) == 1, k
    new = new.replace(k, v)
s = s[:a] + new + s[d:]
open(p, 'w', encoding='utf-8').write(s)
print('ok', len(new))
