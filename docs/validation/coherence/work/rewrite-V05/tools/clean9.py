#!/usr/bin/env python3
"""rewrite-V05: mechanical clean of §9's decision rows (provenance tags, citation form, BCR->base section)."""
import re, sys
src=open(sys.argv[1]).read()
t=src
# provenance tags
TAG=r"(?:seams? )?(?:SLR\d-\d+(?: \([a-z]\))?|SL-\d+|ST-\d+|TR-\d+|TT-\d+|TU-\d+|TV-\d+|TW-\d+|SCC-R\dC-\d+|SCC-\d+|C5-\d+(?: \(\d\))?|C6-\d+(?: \(\d\))?|critique-V6 C6-\d+(?: \(\d\))?|RC\d)"
TAGL=TAG+r"(?:(?:, | and |; )"+TAG+r")*"
t=re.sub(r" ?\((?:revised|narrowed) with "+TAGL+r"\)","",t)
t=re.sub(r" ?\("+TAGL+r"\)","",t)
for _ in range(3):
    t=re.sub(r"(?:; |, )"+TAGL+r"(?=[;,)\]])","",t)
    t=re.sub(r"\(("+TAGL+r")(?:; |, )","(",t)
t=re.sub(r" \(C5-\d+; the row the 23:14 note asked for\)","",t)
# citation forms
t=re.sub(r"V01 V1-(\d)",r"V01 §\1",t)
t=re.sub(r"(?<![-\w])V1-(\d+(?:\.\d+)*)",r"V01 §\1",t)
t=re.sub(r"(?<![-\w])V([1-9]) §",r"V0\1 §",t)
t=t.replace("V05 §","V05 §")
t=t.replace("DR-SKY","DR27")
t=t.replace("SkyHandover","SkyUnitInput").replace("skyHandover","skyUnitInput")
t=re.sub(r"\(BCR-V5-\d+\)","",t)
t=re.sub(r" +([,;.)])",r"\1",t)
t=re.sub(r"\(\s*\)","",t)
open(sys.argv[2],'w').write(t)
