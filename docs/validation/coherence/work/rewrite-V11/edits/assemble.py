"""Assemble the V11 parts into the new volume, then run the set-wide normalisations (citation form, DR ids, retired
shorthand, narration ids) and write a log of every normalisation applied."""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sanitize import sanitize
HERE = os.path.dirname(os.path.abspath(__file__))
PARTS = os.path.join(HERE, '..', 'parts')
OUT = os.path.join(HERE, '..', '..', '..', 'new', 'volumes', 'V11-content.md')
LOG = os.path.join(HERE, '..', 'assemble.log')
names = sorted(f for f in os.listdir(PARTS) if f.endswith('.md'))
text = '\n'.join(open(os.path.join(PARTS, n), encoding='utf-8').read().rstrip('\n') + '\n' for n in names)
log = []
def sub(pat, rep, flags=0):
    global text
    new, n = re.subn(pat, rep, text, flags=flags)
    if n: log.append('%4d  %s -> %s' % (n, pat, rep))
    text = new
# citation form (G-cite): V6 §x -> V06 §x; V1-3.15 -> V01 §3.15
sub(r'(?<![\w-])V(\d) §', r'V0\1 §')
sub(r'(?<![\w-])V(\d)-(\d+(?:\.\d+)+)', r'V0\1 §\2')
# DR ids (ID-DR)
for old, new in [('DR-V8.4', 'DR32'), ('DR-V8.8', 'DR35'), ('DR-V8.7', 'DR34'), ('DR-V8.1', 'DR29'), ('DR-V8.2', 'DR30'),
                 ('DR-V8.3', 'DR31'), ('DR-V8.5', 'DR33'), ('DR-V8.6', 'DR28'), ('DR-V6.1', 'DR28'), ('DR-SKY', 'DR27'),
                 ('DR-V1.1', 'DR26')]:
    sub(re.escape(old) + r'\b', new)
# file f / file g shorthand: the items are cited by number
sub(r'\bfile f items\b', 'items')
sub(r'\bfile f item\b', 'item')
sub(r'\bg items (\d)', r'items \1')
sub(r'\bg item (\d)', r'item \1')
sub(r'calibrate-later', 'provisional')
# narration ids
before = text
text = sanitize(text)
if text != before:
    log.append('sanitize: narration ids stripped')
from fixups import apply
text, errs = apply(text)
if errs:
    print('\n'.join(errs)); sys.exit(1)
open(OUT, 'w', encoding='utf-8').write(text)
open(LOG, 'w', encoding='utf-8').write('\n'.join(log) + '\n')
print('wrote', OUT, len(text.split()), 'words;', len(names), 'parts')
print('\n'.join(log))
