# usage: python3 finalize.py <label e.g. coherence/repair-model-r1> <raw prompt file>
# writes workflows/lane-prompts/coherence-cloud/<label with / -> _>.prompt.txt with the owner-rules note and orchestration notes
import sys, os, importlib.util, re
SP = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('mk', os.path.join(SP, 'mkbriefs.py'))
src = open(os.path.join(SP, 'mkbriefs.py')).read()
ns = {'__file__': os.path.join(SP, 'mkbriefs.py')}
exec(src.split('os.makedirs(OUT')[0], ns)   # the schema tables, schema_for and addendum, without the batch run
label, raw = sys.argv[1], sys.argv[2]
body = open(raw).read().rstrip('\n')
ref = open('/home/user/maps-architecture/workflows/lane-prompts/coherence-cloud/coherence_rewrite-V12.prompt.txt').read()
owner = re.search(r'\n\n(NEW OWNER RULES 114–116.*?)\n\nORCHESTRATION NOTES', ref, re.S).group(1)
owner = re.sub(r'\n\nCONTINUATION \(orchestrator[^\n]*', '', owner)   # V12's own continuation note is not part of the owner-rules note
out = body + '\n\n' + owner + ns['addendum'](label, ns['schema_for'](label))
p = '/home/user/maps-architecture/workflows/lane-prompts/coherence-cloud/' + label.replace('/', '_') + '.prompt.txt'
open(p, 'w').write(out); print(p, len(out))
