# fixall_verify_scope_r4_h32_vectors.py — re-checks the round-4 §13.6 (2) check vectors with the verifier's own
# independent MurmurHash3 (fixall_verify_scope_r3_h32_indep.py), not the draft's (lane fixall/verify-scope-r4, 2026-09-26; stdlib only)
# PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r4), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.
import importlib.util, io, contextlib, os
here=os.path.dirname(os.path.abspath(__file__))
spec=importlib.util.spec_from_file_location('indep',os.path.join(here,'fixall_verify_scope_r3_h32_indep.py'))
m=importlib.util.module_from_spec(spec)
with contextlib.redirect_stdout(io.StringIO()): spec.loader.exec_module(m)
H32=lambda s: m.x86_128(s.encode('utf-8'),0)[0]
red=lambda h: 1+(h%2147483646)
print('verif x86_128 = 0x%08X (published 0xB3ECE62A)'%m.verif(m.x86_128,16))
for s,exp,reduce in [('d5/M1/TOWN/none/0',1221236157,False),('d5/M1/TOWN/coast+river/4',3998735106,False),
                     ('d5-mfcg/M1/TOWN/none/0',1965791931,True),('d5-ng/M5/area/0',1819777585,True),
                     ('d5-ng/M5/ring/4',951122398,True),('d5/M5/area/0/0',3881605733,False)]:
    h=H32(s); v=red(h) if reduce else h
    print(s, 'H32=%d'%h, ('reduced=%d'%v) if reduce else '', 'text=%d'%exp, 'MATCH' if v==exp else 'MISMATCH')
# the NG search's population schedule, §13.6 (2)
pops=[int(min(50000*1.25**(k//4),120000)) for k in range(32)]
print('populations k=0..31:',sorted(set(pops)),'count at cap:',pops.count(120000))
