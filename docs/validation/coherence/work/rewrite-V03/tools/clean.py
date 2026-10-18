#!/usr/bin/env python3
"""Mechanical clean pass for V03 body text (rewrite-V03): provenance tags out, citation forms (G-cite, S7),
ID-BCR renames. Usage: clean.py IN OUT [--noself]  (--noself: skip bare self-reference conversion)."""
import re, sys
src = open(sys.argv[1]).read()
noself = '--noself' in sys.argv

TAG = (r"(?:(?:critique/V0[0-9]\.md |critique §12\.6)?"
       r"(?:seams?\s+)?"
       r"(?:S23R\d-\d+|S23-\d+|ST-\d+|V3C-\d+(?: \(\d+\)(?:, \(\d+\))*)?(?:, -\d+)*|SCC-R\dC-\d+|SCC-\d+|SR1-\d+|SS-\d+"
       r"|V2C-\d+(?: \(\d+\)(?:, \(\d+\))*)?|C4-110-\d+|C4-\d+(?: \(\d+\)(?:–\(\d+\))?)?|V9C-\d+|V11C-\d+))")
TAGL = TAG + r"(?:(?:, | and )" + TAG + r")*"
t = src
# whole parenthetical of tags only
t = re.sub(r" ?\(" + TAGL + r"\)", "", t)
# a tag list item inside a parenthetical: '; TAG' or ', TAG' before ; , )
for _ in range(4):
    t = re.sub(r"(?:; |, )" + TAGL + r"(?=[;,)\]])", "", t)
    t = re.sub(r"\((" + TAGL + r")(?:; |, )", "(", t)
# G-cite: Vn § -> V0n §; Vn-3.x -> V0n §3.x
t = re.sub(r"(?<![-A-Za-z0-9])V([1-9]) §", r"V0\1 §", t)
t = re.sub(r"(?<![-A-Za-z0-9])V([1-9])-(\d+\.\d[\d.]*\d|\d+\.\d)", r"V0\1 §\2", t)
t = t.replace("volume V03 §", "V03 §").replace("volume V03", "V03")
# ID-BCR: V04's bare BCR-29/30/45/46, V01's BCR-43
t = re.sub(r"(?<![-A-Za-z0-9])BCR-(29|30|45|46)(?!\d)", r"BCR-V4-\1", t)
t = re.sub(r"(?<![-A-Za-z0-9])BCR-43(?!\d)", r"BCR-V1-43", t)
# G-firstmap
t = t.replace("first paint", "first map")
if not noself:
    SEC = r"(?:3\.7\.[1-7]|3\.1[0-2]|3\.4a|3\.[1-9]|2\.[1-5]|4\.[1-6]|5\.[1-4])"
    LB = r"(?<![\w§.\-/:×^'`\u2063])"
    lines = t.split("\n")
    out = []
    for ln in lines:
        if ln.startswith("#"):
            out.append(ln); continue
        ln = re.sub(LB + "(" + SEC + r")(\s?–\s?)(" + SEC + r")(?![\d.]*\d)", "V03 §\\1\\2\u2063\\3", ln)
        ln = re.sub(LB + "(" + SEC + r")(?![\d.]*\d)(?!\s?(?:pw|cm|m²|ms|px|%|m\b|KB|kB|MB|×|/ |–))", r"V03 §\1", ln)
        out.append(ln.replace("\u2063", ""))
    t = "\n".join(out)
# tidy
t = re.sub(r"\(\s*\)", "", t)
t = re.sub(r"\( ", "(", t)
t = re.sub(r" +([,;.)])", r"\1", t)
t = re.sub(r"(?<=\S)  +", " ", t)
open(sys.argv[2], "w").write(t)
