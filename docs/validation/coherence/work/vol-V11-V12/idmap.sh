#!/bin/sh
# print last N items: id + first 60 chars
python3 -c "
import json,sys
L=[json.loads(l) for l in open('$(dirname $0)/items.jsonl')]
for d in L[-int(sys.argv[1]):]: print(d['id'],d['sec'],d['statement'][:70])" $1
