#!/usr/bin/env python3
"""rewrite-V09: scan parts for retired citation forms and review ids."""
import re,sys
pats=[(r'(?<![-\w/.])V[1-9](?![0-9])(?![-.]\w)', 'bare Vn'),
      (r'\b(?:SS|SR\d?|XV-V9|CVR-V10|V9C|V1C|V3C|C4-110|C10|C6|SCC|ST)-\d+', 'review id'),
      (r'\bBCR-V\d+-\d+|\bBCR-\d+', 'BCR id'),
      (r'\bDR-V\d', 'DR alias'),
      (r'error\.clerkOffline|ClerkHarness|first paint|floor vault|Rebuild from \{stage\}', 'retired term'),
      (r'\(formerly', 'formerly'),
      (r'\bTBD\b|\blater\b|\bopen question', 'deferral?')]
for f in sys.argv[1:]:
    for i,l in enumerate(open(f,encoding='utf-8'),1):
        for p,tag in pats:
            for m in re.finditer(p,l):
                print(f"{f.split('/')[-1]}:{i}: [{tag}] {l.strip()[max(0,m.start()-60):m.end()+60]}")
