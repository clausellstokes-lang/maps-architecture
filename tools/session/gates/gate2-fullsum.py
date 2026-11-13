#!/usr/bin/env python3
"""The summary line of the gate's full-strength step: one entry per cell (its exit code and counts from its JSON report),
then every red test, and a red for a cell in which no test ran (a name filter that matched nothing).
usage: gate2-fullsum.py <the gate's .full directory>"""
import json
import os
import sys
d = sys.argv[1]
out = []
reds = []
for line in open(d + '/jobs.tsv', encoding='utf-8'):
    n = line.split('\t')[0]
    rc = open(d + '/' + n + '.rc').read().strip() if os.path.exists(d + '/' + n + '.rc') else 'none'
    try:
        r = json.load(open(d + '/' + n + '.json'))
        ran = r['numPassedTests'] + r['numFailedTests']
        out.append(f"{n} rc={rc} [{r['numFailedTests']} failed | {r['numPassedTests']} passed of {ran} run]")
        for t in r['testResults']:
            for a in t['assertionResults']:
                if a['status'] == 'failed':
                    reds.append(n + ' > ' + a['fullName'][:170])
        if ran == 0:
            reds.append(n + ' > NO TEST RAN (the name filter matched nothing)')
    except Exception as e:  # a cell without a report is a red of the gate
        out.append(f"{n} rc={rc} [no report: {e}]")
        reds.append(n + ' > no report')
print("full-only (FULL strength, by cell, three at a time; the strength-gated files RELATED reached): " + '; '.join(out) + ';')
for x in reds[:30]:
    print('  full-only red: ' + x)
