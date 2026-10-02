#!/usr/bin/env python3
"""Regenerate the auto section of docs/PROGRESS.md from what is actually on disk, and optionally append a log line.

  python3 tools/progress.py                      # refresh the lane tables
  python3 tools/progress.py --log "text …"       # refresh + append a timestamped entry to the hand log

A new session (any account) can trust the tables: a lane is LANDED only if its output file exists on disk.
"""
import datetime, glob, json, os, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOC = os.path.join(BASE, "docs", "PROGRESS.md")
BEGIN, END = "<!-- AUTO:BEGIN (tools/progress.py rewrites this block) -->", "<!-- AUTO:END -->"

# phase → (output dir, [(lane key, what it covers)])
LANES = {
    "Phase 3 — exhaustive read (Opus readers, Fable critic) → research/findings/": ("research/findings", [
        ("os-geometry", "TownGeneratorOS geom/ + utils/"), ("os-model", "TownGeneratorOS building/ pipeline"),
        ("os-wards-render", "TownGeneratorOS wards/ + mapping/"),
        ("mfcg-posts-a", "Patreon City collection, older 15"), ("mfcg-posts-b", "Patreon City collection, newer 15"),
        ("mfcg-devlogs-a", "itch MFCG devlogs, older 23"), ("mfcg-devlogs-b", "itch MFCG devlogs, newer 23"),
        ("vg-posts-a", "Patreon Village collection, older 14"), ("vg-posts-b", "Patreon Village collection, newer 14"),
        ("vg-ng-devlogs", "itch Village (21) + Neighbourhood (6) devlogs"),
        ("ftg-posts-a", "FTG Patreon posts, oldest 10"), ("ftg-posts-b", "FTG Patreon posts, middle 10"), ("ftg-posts-c", "FTG Patreon posts, newest 10"),
        ("ftg-docs-params", "FTG user guide + create-request/presets schema"), ("ftg-payload-visual", "FTG protobuf layout stats + Foundry module + visuals"),
        ("profile-mfcg", "live MFCG profiles/call counts/draw"), ("profile-village", "live Village profiles"), ("profile-neighbourhood", "live Neighbourhood profiles"),
        ("visual-spec", "style sheet of all four from screenshots + draw records"),
        ("watabou-extra-a", "65 watabou posts OUTSIDE the two collections (twisted bisection, straight skeletons, NG, City Viewer, Urban Places, tutorials) — older half"),
        ("watabou-extra-b", "… newer half"), ("_critic", "Fable completeness critic over all findings"),
        ("_critic-ftg", "Fable second critic seat — FTG trio + docs + payload (critic §6.9)"),
        ("_critic-os", "Fable second critic seat — TownGeneratorOS constants/algorithms/RNG order (critic §6.9)"),
        ("_critic-vg-ng", "Fable third critic seat — Village + Neighbourhood findings"),
    ]),
    "Phase 4 — confidence + weakness ledger (Fable) → docs/": ("docs", [
        ("confidence/mfcg", "reproduction confidence matrix — MFCG"), ("confidence/vg", "… Village"), ("confidence/ng", "… Neighbourhood"), ("confidence/ftg", "… FTG"),
        *[(f"confidence/{r}-challenge-{l}", f"Fable skeptic ({l}-confidence lens) on {r}") for r in ("mfcg", "vg", "ng", "ftg") for l in ("over", "under")],
        *[(f"improvements/{r}", f"Opus weakness miner — {r}") for r in ("mfcg", "vg", "ng", "ftg")],
        ("CONFIDENCE", "synthesised, skeptic-challenged confidence report"), ("IMPROVEMENTS", "cross-reference improvement opportunities with acceptance metrics"),
    ]),
    "Phase 5 — architecture (standalone; parity is the floor, improvement is the goal) → docs/": ("docs", [
        ("design/proposal-kernel", "architect A — geometry-kernel-first"), ("design/proposal-pipeline", "architect B — pipeline/determinism-first"),
        ("design/proposal-product", "architect C — renderer/product-first"),
        ("design/judge-parity", "judge — capability parity"), ("design/judge-improvement", "judge — improvement realism & restraint"), ("design/judge-engineering", "judge — engineering soundness"),
        ("design/judging", "panel score table + graft list"),
        ("ARCHITECTURE", "synthesised architecture"),
    ]),
    "Phase 6 — adversarial validation → docs/": ("docs", [
        ("validation/coverage-audit", "every extracted capability vs the architecture (Opus)"),
        *[(f"validation/redteam-{l}", f"Fable red team — {l}") for l in ("geometry", "lifecycle", "scale", "visual", "ftg", "improve")],
        ("ARCHITECTURE-VALIDATION", "dispositions + re-verification rounds"),
    ]),
}

# Post-critic gap closers that APPEND a section inside an existing findings file (LANDED when the heading is present).
# (lane key, file or None = any research/findings/*.md, heading prefix, what)
ADDENDA = [
    ("profile-neighbourhood-ring", "research/findings/profile-neighbourhood.md", "## Ring-template addendum", "Opus reader — NG `ring` template capture 2026-09-21T07-20-25 (critic §6.2)"),
    ("profile-mfcg-gates", "research/findings/profile-mfcg.md", "## Explicit-gates addendum", "Opus reader — MFCG gates=4 size=40 capture 2026-09-21T11-25-32 (critic §6.1 part)"),
    ("profile-village-river", "research/findings/profile-village.md", "## River-course addendum", "Opus reader — VG river + island capture at 20 µs 2026-09-21T11-25-55 (critic §6.3)"),
    ("external-sources", "research/findings/mfcg-devlogs-a.md", "## External-sources addendum", "itch post 422446 + palette SVGs; Reddit threads blocked (critic §6.5)"),
    ("critic-2-ftg-addenda", None, "## Critic-2 addendum (FTG seat", "rulings the FTG critic seat appended into ftg-*.md", "_critic-ftg"),
    ("critic-2-os-addenda", None, "## Critic-2 addendum (OS seat", "corrections the OS critic seat appended into os-*.md", "_critic-os"),
]


def addenda_rows():
    rows, landed = [], 0
    ev = os.path.join(BASE, "docs", "lane-events.log")
    events = open(ev).read() if os.path.exists(ev) else ""
    for entry in ADDENDA:
        key, f, heading, what = entry[:4]
        landed_key = entry[4] if len(entry) > 4 else key
        files = [os.path.join(BASE, f)] if f else sorted(glob.glob(os.path.join(BASE, "research", "findings", "*.md")))
        hits = [x for x in files if os.path.exists(x) and heading in open(x, errors="replace").read()]
        logged = f" {landed_key} LANDED" in events
        if hits:
            when = max(datetime.datetime.fromtimestamp(os.stat(x).st_mtime) for x in hits).strftime('%m-%d %H:%M')
            where = ", ".join(os.path.relpath(x, BASE) for x in hits) if not f else f
            if logged:
                landed += 1
                rows.append(f"| `{key}` | {what} | **LANDED** | {where} | {when} |")
            else:
                rows.append(f"| `{key}` | {what} | PARTIAL (section present, no LANDED line — lane still running or was stopped) | {where} | {when} |")
        else:
            rows.append(f"| `{key}` | {what} | not landed | {f or 'research/findings/*.md'} | |")
    return landed, rows


def table():
    out = [BEGIN, "", f"_Disk state as of {datetime.datetime.now().astimezone().strftime('%Y-%m-%d %H:%M %Z')}._", ""]
    for phase, (d, lanes) in LANES.items():
        landed = 0
        rows = []
        for key, what in lanes:
            fp = os.path.join(BASE, d, key + ".md")
            if os.path.exists(fp) and os.path.getsize(fp) > 2000:
                st = os.stat(fp); landed += 1
                rows.append(f"| `{key}` | {what} | **LANDED** | {st.st_size // 1024} KB | {datetime.datetime.fromtimestamp(st.st_mtime).strftime('%m-%d %H:%M')} |")
            else:
                rows.append(f"| `{key}` | {what} | not landed | | |")
        out += [f"### {phase} — {landed}/{len(lanes)} landed", "", "| lane | covers | state | size | written |", "|---|---|---|---|---|", *rows, ""]
    landed, rows = addenda_rows()
    out += [f"### Phase 3b — post-critic gap closers (addenda appended inside existing findings files) — {landed}/{len(ADDENDA)} landed", "",
            "| lane | covers | state | file | written |", "|---|---|---|---|---|", *rows, ""]
    q = os.path.join(BASE, "docs", "FABLE-REVIEW-QUEUE.md")
    if os.path.exists(q):
        rows = [l for l in open(q).read().splitlines() if l.startswith("| ") and not l.startswith("| id") and not l.startswith("|---")]
        pend = [r for r in rows if "| PENDING |" in r]
        a = sum(1 for r in pend if r.split("|")[2].strip() == "A"); b = len(pend) - a
        out += [f"### Fable review queue — {len(pend)} pending ({a} class A stand-in, {b} class B unchecked) of {len(rows)}", "",
                "Owner, 2026-09-25: \"mark everything that has not gone through the touch of Fable for review next time we have Fable\".",
                "Fable review: `Workflow({ scriptPath: \".../workflows/15-fable-review-b.js\", args: {...} })` (05 extended to every family; J76: it runs before pass c). Details: docs/FABLE-REVIEW-QUEUE.md.", ""]
    caps = sorted(glob.glob(os.path.join(BASE, "captures", "*", "2*")))
    out += ["### Captures on disk", ""] + [f"- `{os.path.relpath(c, BASE)}`" + (" (report.md ✓)" if os.path.exists(os.path.join(c, 'report.md')) else "") for c in caps] + [""]
    ev = os.path.join(BASE, "docs", "lane-events.log")
    if os.path.exists(ev):
        out += ["### Lane events reported by agents (last 40)", "", "```", *open(ev).read().splitlines()[-40:], "```", ""]
    idx = os.path.join(BASE, "research", "patreon", "index.json")
    if os.path.exists(idx):
        j = json.load(open(idx))
        out += ["### Archives on disk", "", *[f"- Patreon `{g}`: {len(v['posts'])} posts" for g, v in j.items()],
                f"- itch.io devlogs: {len(glob.glob(os.path.join(BASE, 'research', 'devlogs', '*', '*', 'post.md')))}",
                f"- FTG guide pages: {len(glob.glob(os.path.join(BASE, 'research', 'ftg-docs', '*.md')))}",
                f"- External sources fetched (research/external/raw): {len(glob.glob(os.path.join(BASE, 'research', 'external', 'raw', '*')))} files", ""]
    return "\n".join(out + [END])


def main():
    os.makedirs(os.path.dirname(DOC), exist_ok=True)
    s = open(DOC).read() if os.path.exists(DOC) else ""
    # A checkout without the local-only corpus (captures/ is kept off the repository; a cloud session) cannot see what
    # landed there, and its file times are the checkout's: keep the tables as they are and only append the log line.
    if BEGIN in s and END in s and not os.path.isdir(os.path.join(BASE, "captures")):
        print("captures/ is absent (a checkout without the local corpus): tables kept as they are")
    elif BEGIN in s and END in s:
        s = s[:s.index(BEGIN)] + table() + s[s.index(END) + len(END):]
    else:
        s = (s.rstrip() + "\n\n" if s else "") + table() + "\n\n## Hand log (append-only, newest last)\n"
    if "--log" in sys.argv:
        s = s.rstrip() + f"\n- **{datetime.datetime.now().astimezone().strftime('%Y-%m-%d %H:%M %Z')}** — {sys.argv[sys.argv.index('--log') + 1]}\n"
    open(DOC, "w").write(s)
    print(f"updated {DOC}")


if __name__ == "__main__":
    main()
