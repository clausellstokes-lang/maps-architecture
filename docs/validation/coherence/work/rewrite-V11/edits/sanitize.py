"""Strip pass-narration ids (seam, critique and reconciliation ids) from normative text and tidy the punctuation they leave."""
import re
IDS = [
    r"reconciliation round \d+(?:'s continuation)?",
    r"SCC-R\d+C-\d+(?: \([a-z0-9]+\))?",
    r"SCC-\d+(?: \([a-z0-9]+\))?",
    r"SR\d+-\d+(?: \([a-z]\))?(?:'s class)?",
    r"SS-\d+",
    r"V11C-\d+(?: \(\d+\))?(?: \([a-z]\))?",
    r"V\dC-\d+(?: \(\d+\))?",
    r"C\d-\d+(?: \(\d+[a-z]?\))?",
    r"C4-110-\d+",
    r"(?<![\w-])E-\d\d(?![\w-])",
    r"W-SET-01",
    r"(?<![\w-])MC-11",
    r"V1[12]-[IX]CONF-\d+",
    r"ID-DUPDEF",
]
def sanitize(text):
    for p in IDS:
        text = re.sub(p, '\x00', text)
    # tidy: separators around removed ids
    for _ in range(4):
        text = re.sub(r'\x00(?:\s*[,;]\s*\x00)+', '\x00', text)
        text = re.sub(r' ?\(\s*\x00\s*\)', '', text)            # (ID)
        text = re.sub(r'\(\s*\x00\s*[;,]\s*', '(', text)       # (ID; x  -> (x
        text = re.sub(r'\s*[;,]\s*\x00\s*\)', ')', text)       # x; ID)  -> x)
        text = re.sub(r'\s*[;,]\s*\x00(?=\s*[;,])', '', text)  # x; ID; y -> x; y
        text = re.sub(r' \(\s*\)', '', text)
    text = re.sub(r' ?\x00', '', text)
    text = re.sub(r' +\)', ')', text)
    text = re.sub(r'\( +', '(', text)
    return text
