#!/usr/bin/env python3
"""J198: fit a workflow's args to THIS machine before a launch (every workflow, every future task).

  python3 tools/machine_args.py <args.json> [--out <file>] [--keep-lanes]

Sets args.machine to tools/machine_profile.py's paragraph for this machine, args.machineId to its id, and args.maxLanes to its
seat count (unless --keep-lanes, or the args ask for fewer). Prints the result path and a one-line summary. Every workflow's
seats compare python3 tools/machine_profile.py --id with args.machineId and stop if they differ (the args were written for
another machine). Never commit args fitted to one machine as another's.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from machine_profile import profile  # noqa: E402

src = sys.argv[1]
out = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else src
a = json.load(open(src))
p = profile()
a['machine'] = p['text']
a['machineId'] = p['id']
if '--keep-lanes' not in sys.argv:
    a['maxLanes'] = p['maxLanes']
json.dump(a, open(out, 'w'))
print(out)
print(f"{p['kind']} {p['id']}: maxLanes {a.get('maxLanes')}, workerCap {p['workerCap']}, mutantCap {p['mutantCap']}, agentCap {p['agentCap']}")
