import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/05-s2-6a.md')
t=e.t
a=t.index("**(2) The derivation rows**"); b=t.index("**(3) The burial and crypt trace")
e.t=t[:a]+"""**(2) The derivation rows** are §7.7's DR30 (the ruin system's existence, source, age and centre), DR31 (the cavern
drivers) and DR32 (the burial faces, the crypted churches and the church count), their inputs read in the order written
there; T-V8-32 and T-V8-33 hold their bars.

"""+t[b:]
e.R("""(the line's names, CONFIRMED over the 35 births: every birth
carries exactly one burial record for its tier, and a metropolis the `Cemetery network` beside it; receipt
`scratchpad/volumes/cv8/burial-census.out`):""","""(the line's names, CONFIRMED over the 35 births: every birth
carries exactly one burial record for its tier, and a metropolis the `Cemetery network` beside it):""")
e.R("itself a SIZE lesser of the city's record (V08 §13 X4)","itself a SIZE lesser of the city's record (V11 §3.12)")
e.R("### 2.6a Item 109's dossier sources and the burial and crypt trace (DR30 – DR32)","### 2.6a Item 109's dossier sources and the burial and crypt trace (DR30–DR32)")
e.save()
