#!/usr/bin/env python3
"""Bundle EVERYTHING the architecture programme wrote into ONE generated file: docs/ARCHITECTURE-COMPLETE.md.

  python3 tools/bundle_complete.py            # (re)generate the complete edition
  python3 tools/bundle_complete.py --check    # exit 1 if the complete edition is stale against its sources
  python3 tools/bundle_complete.py --manifest # print the parts, their files and sizes; write nothing

The complete edition is DERIVED, never edited (owner, 2026-10-19: "the full complete, no detail left unturned
mapmaking architecture with all the waves in one document"; J428). Where `tools/bundle_architecture.py` bundles the
canon alone (the base, the volumes' index and the fourteen volumes: docs/ARCHITECTURE-FULL.md, J89), this tool puts
every document the programme wrote in one file, in reading order: what is being built and the owner's rules; the base;
the volumes with their summary, index and integration records; the host side; the design's whole change history
(amendments a–x); how the design was chosen and tested (the proposals, the judges, the rationale, the red team, the
retrovalidations, the critique rounds); the evidence on the reference generators; the calibration programme (M-1); the
build (M0 and the hardening, with its waves); the build's records item by item; and the programme's journal. Every
source keeps its own home, so a fact is still stated once; the complete edition only puts them together, with a
generated table of contents, the sha256 of every source, and a table of what is left out and why.
"""
import glob, hashlib, os, re, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(BASE, *a)
OUT = P("docs", "ARCHITECTURE-COMPLETE.md")

AMENDMENT_LETTERS = "abcdefghijklmnopqrstuvwx"


def g(pattern):
    return sorted(glob.glob(P(pattern)))


def amendments():
    """docs/AMENDMENTS-*.md in file order a..x (dates ascend; the letter ascends within a date; file a has no letter)."""
    files = g("docs/AMENDMENTS-*.md")
    def key(f):
        m = re.search(r"AMENDMENTS-(\d{4}-\d{2}-\d{2})([a-z]?)\.md$", f)
        return (m.group(1), m.group(2) or "")
    return sorted(files, key=key)


def critiques():
    """docs/volumes/critique: the fourteen volume critiques first, then each seam's rounds r0..r6."""
    files = g("docs/volumes/critique/*.md")
    vols = [f for f in files if re.search(r"/V\d\d\.md$", f)]
    seams = [f for f in files if f not in vols]
    return vols + seams


# (title, toc depth for the files' own headings (0: file titles only; 1: + '#' headings; 2: + '##'), [files...])
def parts():
    return [
        ("PART 0 — What is being built, and the programme's rules", 2, [
            P("docs", "DEFINITION.md"),
            P("docs", "PLAN.md"),
            P("docs", "OWNER-INSTRUCTIONS-2026-09-25.md"),
            P("docs", "OWNER-DECISIONS-DELEGATED-2026-09-29.md"),
            P("docs", "OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md"),
        ]),
        ("PART I–III — THE BASE: PLAT (stage 1), neighbourhood composition (stage 2) and the village hooks — docs/ARCHITECTURE.md", 2, [
            P("docs", "ARCHITECTURE.md"),
        ]),
        ("PART IV — The design volumes (full build depth for every staged subject), their summary, index and integration records", 2, [
            P("docs", "volumes", "SUMMARY.md"),
            P("docs", "volumes", "INDEX.md"),
            *g("docs/volumes/V[0-9][0-9]-*.md"),
            P("docs", "volumes", "_integrate.md"),
            P("docs", "volumes", "_integrate-world-sites.md"),
        ]),
        ("PART V — The host side: SettlementForge's requirements, its requests and the map program's replies", 2, [
            P("docs", "HOST-REQUIREMENTS-2026-10-18.md"),
            P("docs", "host-requests", "2026-10-18-hidden-ways-v1.md"),
            P("docs", "host-requests", "2026-10-18-hidden-ways.md"),
            P("docs", "HOST-REPLY-HIDDEN-WAYS-2026-10-18.md"),
        ]),
        ("PART VI — The design's change history: the amendments, files a to x, every item", 1, amendments()),
        ("PART VII — How the design was chosen and tested: the proposals, the judges, the rationale, the red team, the retrovalidations and the critique rounds", 1, [
            P("docs", "design", "proposal-kernel.md"),
            P("docs", "design", "proposal-pipeline.md"),
            P("docs", "design", "proposal-product.md"),
            P("docs", "design", "judge-engineering.md"),
            P("docs", "design", "judge-improvement.md"),
            P("docs", "design", "judge-parity.md"),
            P("docs", "design", "judging.md"),
            P("docs", "design", "proposal-world-native.md"),
            P("docs", "design", "proposal-hydrology-water-state.md"),
            P("docs", "design", "proposal-sites-encounters.md"),
            P("docs", "ARCHITECTURE-RATIONALE.md"),
            P("docs", "ARCHITECTURE-VALIDATION.md"),
            *g("docs/retrovalidation/*.md"),
            *critiques(),
        ]),
        ("PART VIII — The reference generators: how confidently they can be re-derived, and where they are weak", 1, [
            P("docs", "CONFIDENCE.md"),
            *g("docs/confidence/*.md"),
            P("docs", "IMPROVEMENTS.md"),
            *g("docs/improvements/*.md"),
        ]),
        ("PART IX — Calibration: the M-1 programme (the research side's build) and the implementer digest", 1, [
            *g("docs/calibration/*.md"),
            *g("docs/digest-candidate/*.md"),
        ]),
        ("PART X — The build: the M0 specification and its waves, the gates, the choices, the open findings, the fix queue and the registers", 2, [
            P("plat", "docs", "build", "M0.md"),
            P("plat", "docs", "build", "M0-world-sites-gate.md"),
            P("plat", "docs", "build", "open-design-findings.md"),
            *g("plat/docs/build/consolidation/*.md"),
            P("plat", "docs", "build", "choices.md"),
            P("docs", "M0-FIX-QUEUE.md"),
            P("docs", "KNOWN-ISSUES.md"),
            P("docs", "BACKLOG.md"),
            P("docs", "PARKED-IDEAS.md"),
            P("docs", "FABLE-REVIEW-QUEUE.md"),
            P("docs", "experiments", "known-city-authoring.md"),
            P("plat", "docs", "digest", "README.md"),
        ]),
        ("PART XI — The build's records, item by item: every check report, round by round, and every item's notes", 0, [
            *g("plat/docs/build/checks/*.md"),
        ]),
        ("PART XII — The programme's journal: every judgment, ruling and landing in order (J-rows)", 1, [
            P("docs", "PROGRESS.md"),
        ]),
    ]


# What the complete edition leaves out, and why — each row names where the material lives.
EXCLUDED = [
    ("`docs/validation/`", "the per-run records of every lane (the readers' notes, drafts, critiques, verifies and fix rounds; ≈ 280 MB): their conclusions are the documents above"),
    ("`docs/archive/`, `docs/volumes/_superseded-2026-09-28-0355/`", "superseded copies of the base, the rationale and the volumes kept before each amendment or coherence pass (≈ 40 MB); the current text supersedes them"),
    ("`research/`", "the research corpus — the creators' words, the findings, the captures' summaries, the host's own documents (`research/sf/`; ≈ 77 MB): the inputs the design was derived from, cited by the documents above"),
    ("`docs/HANDOFF.md`, `docs/lane-events.log`, `docs/lanes.json`, `docs/lanes-snapshots.jsonl`, `docs/lane-backlog.md`", "the running state of the session and its lanes (operational, rewritten as the work moves)"),
    ("`docs/export/DEFINITION.md`", "an earlier wording of `docs/DEFINITION.md` (PART 0)"),
    ("`plat/docs/build/M0-work.json`, `plat/docs/build/summaries/*.json`", "machine-readable twins of M0.md §2 and of the summaries, not prose"),
    ("`plat/docs/build/landed/*.json`", "the landed records: one structured record per item (its lanes, the files it owns, their hashes and counts), read by `landed:verify`; what each item built is in its check reports (PART XI) and the journal (PART XII)"),
    ("`plat/` (code, tests, tables, fixtures)", "the program itself — the build's product, not its design"),
    ("`docs/ARCHITECTURE-FULL.md`", "the canon-only bundle (the base, the index and the volumes), the same text as PARTS I–IV here"),
    ("`workflows/`, `tools/`, `profiler/`", "the programme's machinery"),
]


def headings(text, depth):
    """'#' (depth ≥ 1) and '##' (depth ≥ 2) headings outside code fences."""
    out, fence = [], False
    for line in text.split("\n"):
        if line.lstrip().startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        if depth >= 1 and line.startswith("# "):
            out.append(line)
        elif depth >= 2 and line.startswith("## "):
            out.append(line)
    return out


class Anchors:
    """GitHub-style ids: lower-cased, punctuation dropped, spaces to '-', repeats suffixed -1, -2, …"""
    def __init__(self):
        self.seen = {}

    def of(self, h):
        t = re.sub(r"^#+\s*", "", h).strip().lower()
        t = re.sub(r"[^\w\s§.-]", "", t)
        t = re.sub(r"\s+", "-", t)
        n = self.seen.get(t, 0)
        self.seen[t] = n + 1
        return t if n == 0 else f"{t}-{n}"


def title_of(text, rel):
    for line in text.split("\n"):
        if line.startswith("# "):
            return line[2:].strip()
    return rel


def build():
    an = Anchors()
    meta, toc, body = [], [], []
    total_files = 0
    for ptitle, depth, files in parts():
        pline = "# " + ptitle
        toc.append(f"- [{ptitle}](#{an.of(pline)})")
        body.append(pline + "\n")
        for f in files:
            if not os.path.exists(f):
                raise SystemExit(f"missing source: {os.path.relpath(f, BASE)}")
            text = open(f, encoding="utf-8").read()
            rel = os.path.relpath(f, BASE)
            total_files += 1
            meta.append(f"| `{rel}` | {hashlib.sha256(text.encode()).hexdigest()[:16]} | {text.count(chr(10)) + 1} | {len(text.encode()):,} |")
            hs = headings(text, depth)
            if depth == 0 or not any(h.startswith("# ") for h in hs):
                # a file with no '#' heading (or a records part): one TOC row for the file, anchored on a marker heading
                marker = f"## {title_of(text, rel)}" if depth == 0 else None
                if marker:
                    a = an.of(marker)
                    toc.append(f"  - [{title_of(text, rel)}](#{a}) — `{rel}`")
                    body.append(f"<!-- source: {rel} -->\n{marker}\n\n" + demote(text) + "\n")
                    continue
            for h in hs:
                level = 1 if h.startswith("# ") else 2
                label = re.sub(r"^#+ ", "", h)
                toc.append("  " * level + f"- [{label}](#{an.of(h)})" + (f" — `{rel}`" if level == 1 else ""))
            body.append(f"<!-- source: {rel} -->\n" + text.rstrip() + "\n")
    head = [
        "# THE COMPLETE ARCHITECTURE — PLAT and the SettlementForge map layer: every document of the programme in one file (GENERATED)",
        "",
        "> Generated by `python3 tools/bundle_complete.py` (owner, 2026-10-19: \"the full complete, no detail left unturned mapmaking architecture with all the waves in one document\"; J428). "
        "Do not edit this file: edit its sources and regenerate. `--check` reports staleness. The canon-only bundle is `docs/ARCHITECTURE-FULL.md` (`tools/bundle_architecture.py`).",
        "",
        "## How to read this file",
        "",
        "**The design itself is PARTS 0 to V**: what is being built and the owner's rules (PART 0); the base — PLAT, the fused town and city generator, with stage 2 and the village hooks (PARTS I–III, one document); the fourteen design volumes that take every staged subject to build depth, with their plain-language summary, their index and the two integration records (PART IV); the host side — SettlementForge's requirements, its requests and the map program's replies (PART V). "
        "**PART VI is the design's history**: the amendment files a to x, every item that changed the base or a volume, in order. "
        "**PARTS VII to IX are the evidence**: how the design was chosen (three competing proposals, three judges, the verdict), why it is the way it is (the rationale), the red team's findings, the retrovalidations, the critique rounds of every volume and seam; the confidence and weakness ledgers on the five reference generators; the calibration programme (M-1) and the implementer digest. "
        "**PARTS X to XII are the build**: the M0 specification with its waves, the gates, the builders' choices, the open findings, the hardening's fix queue and registers; every item's build record and check report; and the programme's journal, every judgment in order.",
        "",
        "Every document keeps its own home in the repository (the `<!-- source: … -->` line before each one); a fact is stated once, there. The table below lists each source with its sha256 (first 16 hex) and size, so staleness is detectable; the table after it names what is left out and why.",
        "",
        "## Sources",
        "",
        "| file | sha256 (16) | lines | bytes |",
        "|---|---|---|---|",
        *meta,
        "",
        f"{total_files} files.",
        "",
        "## Left out, and why",
        "",
        "| what | why |",
        "|---|---|",
        *[f"| {w} | {y} |" for w, y in EXCLUDED],
        "",
        "## Contents",
        "",
        *toc,
        "",
    ]
    return "\n".join(head) + "\n" + "\n".join(body)


def demote(text):
    """Shift a record's own headings one level down so the part's marker heading stays the file's top heading."""
    out, fence = [], False
    for line in text.rstrip().split("\n"):
        if line.lstrip().startswith("```"):
            fence = not fence
        if not fence and re.match(r"^#{1,5} ", line):
            line = "#" + line
        out.append(line)
    return "\n".join(out)


def manifest():
    tot = 0
    for ptitle, depth, files in parts():
        size = sum(os.path.getsize(f) for f in files if os.path.exists(f))
        tot += size
        print(f"{ptitle}\n  {len(files)} files, {size/1e6:.2f} MB")
        missing = [os.path.relpath(f, BASE) for f in files if not os.path.exists(f)]
        for m in missing:
            print(f"  MISSING {m}")
    print(f"total {tot/1e6:.2f} MB of sources")


def main():
    if "--manifest" in sys.argv:
        manifest()
        return
    new = build()
    if "--check" in sys.argv:
        old = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
        stale = old != new
        print("STALE" if stale else "UP TO DATE", OUT)
        sys.exit(1 if stale else 0)
    open(OUT, "w", encoding="utf-8").write(new)
    n = sum(len(files) for _, _, files in parts())
    print(f"wrote {os.path.relpath(OUT, BASE)}: {new.count(chr(10)) + 1} lines, {len(new.encode())/1e6:.1f} MB from {n} source(s)")


if __name__ == "__main__":
    main()
