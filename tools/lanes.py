#!/usr/bin/env python3
"""Lane utilisation check for the Maps program (owner rules, 2026-09-25: at most FOUR lanes at a time; keep four busy
where runnable work exists). Run every 30 minutes by the session loop, or by hand.

  python3 tools/lanes.py                      # status: live lanes, free slots, window, runnable backlog
  python3 tools/lanes.py --start KEY [--expected MIN] [--output PATH] [--kind agent|bash] [--note TEXT]
  python3 tools/lanes.py --stop KEY           # mark a single lane stopped (killed)
  python3 tools/lanes.py --landed KEY         # mark landed by hand (normally auto-detected from docs/lane-events.log)
  python3 tools/lanes.py --run RUNID JOURNAL [--max-lanes N]   # register the active Workflow run (docs/ACTIVE-RUN.json)
  python3 tools/lanes.py --run-done [RUNID]   # clear one run (or all); several runs may be tracked at once
  python3 tools/lanes.py --json               # machine-readable status

Sources of truth on disk (nothing in chat is needed):
  docs/lanes.json          registry of single-agent lanes started outside the Workflow tool
  docs/lane-events.log     "<date> <key> LANDED <file>" lines written by agents when their file is complete
  docs/ACTIVE-RUN.json     the running Workflow's runId + journal path; the journal's started/result events give live agents
  docs/lane-backlog.md     candidate lanes: | key | what | prerequisites | expected_min | model | status |
  docs/lanes-snapshots.jsonl   one line per check (time, live set) so "how long has this stage been running" can be inferred
"""
import datetime, glob, json, os, re, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(BASE, *a)
MAX_LANES = 4
REG, EVENTS, RUN, BACKLOG, SNAPS = P("docs", "lanes.json"), P("docs", "lane-events.log"), P("docs", "ACTIVE-RUN.json"), P("docs", "lane-backlog.md"), P("docs", "lanes-snapshots.jsonl")
# Workflow stages in which the run cannot use more than N of its own slots (from the script's structure)
SINGLE_AGENT_PHASES = {"Synthesize": 1, "Revise": 1, "Report": 2}
now = datetime.datetime.now().astimezone()


def load(path, default):
    try:
        return json.load(open(path))
    except Exception:
        return default


def save(path, obj):
    json.dump(obj, open(path, "w"), indent=1, default=str)


def events():
    return open(EVENTS).read() if os.path.exists(EVENTS) else ""


def parse_time(s):
    try:
        return datetime.datetime.fromisoformat(s)
    except Exception:
        return None


def registry_status():
    reg = load(REG, {"lanes": []})
    ev = events()
    changed = False
    for l in reg["lanes"]:
        if l.get("status") == "running" and f" {l.get('landed_key') or l['key']} LANDED" in ev:
            l["status"], l["landed"] = "landed", now.isoformat(timespec="minutes")
            changed = True
    if changed:
        save(REG, reg)
    return reg


def registered_runs():
    """docs/ACTIVE-RUN.json holds one run ({runId, journal, …}) or several ({"runs": [ … ]})."""
    d = load(RUN, None)
    if not d:
        return []
    if isinstance(d, dict) and "runs" in d:
        return [r for r in d["runs"] if r]
    return [d]


def workflow_statuses():
    return [workflow_status(r) for r in registered_runs()]


def workflow_status(run=None):
    run = run if run is not None else (registered_runs() or [None])[0]
    if not run or not os.path.exists(run.get("journal", "")):
        return {"active": False, "live": [], "phase": None, "done": 0}
    started, results = {}, set()
    for line in open(run["journal"], errors="replace"):
        try:
            j = json.loads(line)
        except Exception:
            continue
        if j.get("type") == "launched":      # a resume appends a new launch: forget the previous attempt's bookkeeping
            started, results = {}, set()
        elif j.get("type") == "started":
            started[j.get("agentId")] = j
        elif j.get("type") == "result":
            results.add(j.get("agentId"))
    # an agent is live only if it has no result AND its transcript was written recently (a failed/killed agent never
    # gets a result line; its transcript goes quiet)
    jdir = os.path.dirname(run["journal"])
    def interrupted(f):
        # an owner-side interrupt ends the transcript with this marker; the workflow then waits with no failure event
        try:
            with open(f, "rb") as fh:
                fh.seek(max(0, os.path.getsize(f) - 4000))
                return b"[Request interrupted by user" in fh.read()
        except Exception:
            return False
    def recent(aid):
        # a running agent writes its transcript continuously; a cache replay touches it once — 4 minutes separates them;
        # an interrupted agent is never live, however recent its last write (2026-09-28: a 10:48 interrupt read as live)
        f = os.path.join(jdir, f"agent-{aid}.jsonl")
        if not os.path.exists(f) or interrupted(f):
            return False
        return (now.timestamp() - os.stat(f).st_mtime) < 4 * 60
    # label-based state: the LAST event per label decides (a resume replays cached seats as started+result pairs and
    # may reuse agent ids); a label whose last event is 'started' is live only if its transcript is recent
    last = {}
    for aid, v in started.items():
        last[v.get("label")] = ("started", aid)
    for line in open(run["journal"], errors="replace"):
        try:
            j = json.loads(line)
        except Exception:
            continue
        if j.get("type") == "result" and j.get("agentId") in started:
            last[started[j["agentId"]].get("label")] = ("result", j.get("agentId"))
    # liveness is decided by the transcript alone (any started agent whose transcript is being written right now);
    # 'done' counts labels whose last event is a result
    done_ids = set()
    for line in open(run["journal"], errors="replace"):
        try:
            j = json.loads(line)
        except Exception:
            continue
        if j.get("type") == "result":
            done_ids.add(j.get("agentId"))
    live = [v for aid, v in started.items() if recent(aid) and aid not in done_ids]   # an agent that has returned is never live (2026-09-28: a just-finished seat read as a fifth lane)
    seen = set(); live = [v for v in live if not (v.get("label") in seen or seen.add(v.get("label")))]
    stale = []
    results = {aid for lbl, (st, aid) in last.items() if st == "result"}
    if stale:
        live_labels = ", ".join(a.get("label", "?") for a in stale)
        print(f"  (journal: {len(stale)} started-but-silent agents ignored: {live_labels[:200]})")
    phase = live[-1]["phase"] if live else (list(started.values())[-1]["phase"] if started else None)
    if live:
        newest = max(live, key=lambda v: os.stat(os.path.join(jdir, f"agent-{v.get('agentId')}.jsonl")).st_mtime)
        phase = newest.get("phase")
    return {"active": True, "runId": run.get("runId"), "maxLanes": run.get("maxLanes", MAX_LANES), "live": live,
            "phase": phase, "done": len(results), "started_total": len(last)}


def snapshots():
    out = []
    if os.path.exists(SNAPS):
        for line in open(SNAPS):
            try:
                out.append(json.loads(line))
            except Exception:
                pass
    return out


def stage_age_minutes(wf):
    """Minutes since the live set of workflow agents last changed (from our own snapshots)."""
    cur = sorted(a.get("agentId") for a in wf["live"])
    age = 0.0
    for s in reversed(snapshots()):
        if sorted(s.get("wf_live", [])) != cur:
            break
        t = parse_time(s.get("t"))
        if t:
            age = (now - t).total_seconds() / 60
    return age


def backlog():
    items = []
    if not os.path.exists(BACKLOG):
        return items
    for line in open(BACKLOG):
        if not line.startswith("| ") or line.startswith("| key") or line.startswith("|---"):
            continue
        cols = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cols) < 6:
            continue
        key, what, prereq, exp, model, status = cols[:6]
        try:
            exp = int(re.sub(r"[^0-9]", "", exp) or 0)
        except Exception:
            exp = 0
        items.append({"key": key.strip("`"), "what": what, "prereq": prereq, "expected_min": exp, "model": model, "status": status})
    return items


def prereq_ok(spec, reg):
    ev = events()
    running = {l["key"] for l in reg["lanes"] if l.get("status") == "running"}
    for term in [t.strip() for t in spec.split(";") if t.strip()]:
        if term == "none":
            continue
        kind, _, arg = term.partition(":")
        if kind == "exists":
            if not glob.glob(P(arg)):
                return False, f"missing {arg}"
        elif kind == "landed":
            if f" {arg} LANDED" not in ev:
                return False, f"waiting for {arg}"
        elif kind == "not-running":
            if arg in running:
                return False, f"{arg} still running"
        elif kind == "after":  # after:YYYY-MM-DDTHH:MM (local) — e.g. FTG one settlement per IP per day
            t = parse_time(arg)
            if t and now < t.replace(tzinfo=now.tzinfo):
                return False, f"not before {arg}"
        else:
            return False, f"unknown prerequisite {term}"
    return True, "ok"


def status(as_json=False):
    reg = registry_status()
    wfs = [w for w in workflow_statuses() if w["active"]]
    wf = {"active": bool(wfs), "live": [a for w in wfs for a in w["live"]], "phase": wfs[0]["phase"] if wfs else None,
          "runId": ", ".join(w["runId"] for w in wfs), "done": sum(w["done"] for w in wfs), "started_total": sum(w["started_total"] for w in wfs)}
    single = [l for l in reg["lanes"] if l.get("status") == "running"]
    live_total = len(single) + len(wf["live"])
    # the owner's cap is 4 unless a registered run carries an owner-approved higher maxLanes (J118: the volumes run at 6)
    cap = max([MAX_LANES] + [sum(int(w.get('maxLanes') or MAX_LANES) for w in wfs)])
    free = max(0, cap - live_total)
    # How long may a filler run? If the workflow is active and in a wide phase, its queued agents will take any free
    # slot: window 0. In a single-agent stage that began < 15 min ago, ~30 min. If no run is active, unlimited.
    if not wf["active"]:
        window = 10 ** 6
    else:
        wide = any(SINGLE_AGENT_PHASES.get(w["phase"]) is None or len(w["live"]) > SINGLE_AGENT_PHASES.get(w["phase"]) for w in wfs)
        if wide:
            window = 0
        else:
            age = stage_age_minutes(wf)
            window = 30 if age < 15 else 10
    items = backlog()
    runnable = []
    for it in items:
        if it["status"].upper().startswith("DONE") or it["status"].upper().startswith("RUNNING"):
            continue
        ok, why = prereq_ok(it["prereq"], reg)
        it["ready"], it["why"] = ok, why
        if ok and it["expected_min"] <= window:
            runnable.append(it)
    # snapshot for stage-age inference
    with open(SNAPS, "a") as f:
        f.write(json.dumps({"t": now.isoformat(timespec="seconds"), "wf_live": [a.get("agentId") for a in wf["live"]], "single": [l["key"] for l in single]}) + "\n")
    stale = []
    for l in single:
        t = parse_time(l.get("started", ""))
        mins = (now - t).total_seconds() / 60 if t else None
        l["minutes"] = round(mins) if mins is not None else None
        if mins and l.get("expected_min") and mins > 2 * l["expected_min"]:
            stale.append(l["key"])
    rep = {"time": now.isoformat(timespec="minutes"), "max_lanes": cap, "live_total": live_total, "free": free, "window_min": window,
           "workflow": {k: v for k, v in wf.items() if k != "live"} | {"live": [{"label": a.get("label"), "phase": a.get("phase")} for a in wf["live"]]},
           "single_lanes": [{"key": l["key"], "minutes": l.get("minutes"), "expected_min": l.get("expected_min"), "output": l.get("output")} for l in single],
           "stale": stale, "runnable": [{"key": r["key"], "expected_min": r["expected_min"], "model": r["model"], "what": r["what"]} for r in runnable],
           "blocked": [{"key": i["key"], "why": i.get("why")} for i in items if not i.get("ready") and not i["status"].upper().startswith(("DONE", "RUNNING"))]}
    if as_json:
        print(json.dumps(rep, indent=1))
        return rep
    print(f"LANES {rep['time']}: {live_total}/{cap} live, {free} free, filler window {window if window < 10**6 else 'unlimited'} min")
    for w in wfs:
        print(f"  workflow {w['runId']}: phase {w['phase']}, {len(w['live'])} live ({', '.join(a.get('label','?') for a in w['live'])}), {w['done']}/{w['started_total']} agents done")
        if not wf["live"]:
            print("  STALLED? the active workflow has NO agent writing for 4+ min — check the newest transcripts for "
                  "'[Request interrupted by user]'; if so, TaskStop the run and resume it (same scriptPath + resumeFromRunId).")
    for l in single:
        print(f"  lane {l['key']}: running {l.get('minutes')} min (expected {l.get('expected_min')}) → {l.get('output')}")
    if stale:
        print(f"  STALE (running > 2× expected — check the agent): {', '.join(stale)}")
    if runnable:
        print("  RUNNABLE now (spawn in this order):")
        for r in runnable:
            print(f"    - {r['key']} [{r['model']}, ≈{r['expected_min']} min]: {r['what']}")
    elif free:
        print("  nothing runnable fits the window" + (": " + "; ".join(f"{b['key']} ({b['why']})" for b in rep["blocked"]) if rep["blocked"] else ""))
    return rep


def main():
    a = sys.argv[1:]
    if not a or a == ["--json"]:
        status(as_json=bool(a))
        return
    reg = load(REG, {"lanes": []})
    if a[0] == "--start":
        key = a[1]
        opt = {a[i]: a[i + 1] for i in range(2, len(a) - 1, 2) if a[i].startswith("--")}
        reg["lanes"] = [l for l in reg["lanes"] if l["key"] != key]
        reg["lanes"].append({"key": key, "kind": opt.get("--kind", "agent"), "started": now.isoformat(timespec="minutes"), "expected_min": int(opt.get("--expected", 30)),
                             "output": opt.get("--output", ""), "landed_key": opt.get("--landed-key", key), "status": "running", "note": opt.get("--note", "")})
        save(REG, reg)
        # mark backlog item RUNNING
        if os.path.exists(BACKLOG):
            s = open(BACKLOG).read()
            s = re.sub(rf"^(\| `?{re.escape(key)}`? \|.*\|)\s*[A-Z][A-Za-z: ,'\-]*\s*\|\s*$", lambda m: m.group(1) + f" RUNNING since {now.strftime('%m-%d %H:%M')} |", s, flags=re.M)
            open(BACKLOG, "w").write(s)
        print(f"registered {key}")
    elif a[0] in ("--stop", "--landed"):
        key = a[1]
        for l in reg["lanes"]:
            if l["key"] == key:
                l["status"] = "stopped" if a[0] == "--stop" else "landed"
                l[l["status"]] = now.isoformat(timespec="minutes")
        save(REG, reg)
        if a[0] == "--landed" and os.path.exists(BACKLOG):
            s = open(BACKLOG).read()
            s = re.sub(rf"^(\| `?{re.escape(key)}`? \|.*\|)\s*RUNNING[^|]*\|\s*$", lambda m: m.group(1) + f" DONE {now.strftime('%m-%d %H:%M')} |", s, flags=re.M)
            open(BACKLOG, "w").write(s)
        print(f"{key} → {a[0][2:]}")
    elif a[0] == "--run":
        opt = {a[i]: a[i + 1] for i in range(3, len(a) - 1, 2) if a[i].startswith("--")}
        runs = [r for r in registered_runs() if r.get("runId") != a[1]]
        runs.append({"runId": a[1], "journal": a[2], "started": now.isoformat(timespec="minutes"), "maxLanes": int(opt.get("--max-lanes", MAX_LANES))})
        save(RUN, {"runs": runs})
        print(f"active run registered ({len(runs)} run(s) tracked)")
    elif a[0] == "--run-done":
        runs = registered_runs()
        if len(a) > 1:
            runs = [r for r in runs if r.get("runId") != a[1]]
        else:
            runs = []
        if runs:
            save(RUN, {"runs": runs})
        elif os.path.exists(RUN):
            os.remove(RUN)
        print(f"active run cleared ({len(runs)} run(s) still tracked)")
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
