#!/usr/bin/env python3
"""J198: which machine is this, and what it can carry (the owner, 2026-10-05: "fix it so that we have appropriate agents and
cores for this machine, not mac. and that it recognizes when its working on this machine vs the mac ... for all future tasks").

One source for every workflow launch and every seat:
  python3 tools/machine_profile.py           JSON: id, kind, cores, memMiB, maxLanes, agentCap, workerCap, mutantCap, text
  python3 tools/machine_profile.py --id      the id alone (a seat compares it with its args' machineId)
  python3 tools/machine_profile.py --text    the THE MACHINE paragraph a launch puts into args.machine

Kinds:
  mac-reference  the owner's MacBook Air (Darwin arm64, hw.model MacBookAir10,1): §12.1's timing reference machine; 16 GB shared
                 with the owner's apps; four seats, two workers per test run, one mutant at a time (J168/J170 unchanged)
  wsl            Linux under WSL2 (/proc/version names microsoft): the owner's Windows PC; seats and workers from cores and memory
  mac-other      any other Mac: conservative like the reference, but not the timing reference
  linux          any other Linux (a cloud container): seats and workers from cores and memory
Seats and workers are sized from MEMORY first (a seat with its test runs and scratch mirrors peaks at about 2 GiB, a vitest worker
at about 0.6 GiB) and cores second; tools/test_budget.py sizes each run from what is free at that moment.
"""
import json
import os
import platform
import subprocess
import sys


def _sh(cmd):
    try:
        return subprocess.run(cmd, capture_output=True, text=True, timeout=5).stdout.strip()
    except (OSError, subprocess.SubprocessError):
        return ''


def mem_total_mib():
    if sys.platform == 'darwin':
        b = _sh(['sysctl', '-n', 'hw.memsize'])
        return int(b) // (1024 * 1024) if b.isdigit() else 16384
    try:
        with open('/proc/meminfo') as f:
            for line in f:
                if line.startswith('MemTotal:'):
                    return int(line.split()[1]) // 1024
    except OSError:
        pass
    return 8192


def kind():
    if sys.platform == 'darwin':
        model = _sh(['sysctl', '-n', 'hw.model'])
        return 'mac-reference' if platform.machine() == 'arm64' and model.startswith('MacBookAir10,1') else 'mac-other'
    try:
        with open('/proc/version') as f:
            if 'microsoft' in f.read().lower():
                return 'wsl'
    except OSError:
        pass
    return 'linux'


def cpu_name():
    if sys.platform == 'darwin':
        return _sh(['sysctl', '-n', 'machdep.cpu.brand_string']) or platform.machine()
    try:
        with open('/proc/cpuinfo') as f:
            for line in f:
                if line.startswith('model name'):
                    return line.split(':', 1)[1].strip()
    except OSError:
        pass
    return platform.machine()


def profile():
    k = kind()
    cores = os.cpu_count() or 4
    mem = mem_total_mib()
    if k in ('mac-reference', 'mac-other'):
        lanes, workers, mutants = 4, 2, 1
    else:
        # a seat peaks at ~2 GiB; keep 4 GiB for the system and the session; one seat per 3 hardware threads
        lanes = max(2, min(8, (mem - 4096) // 2048, cores // 3))
        workers, mutants = 8, 3
    ident = f'{k}:{cpu_name()}:{cores}cpu:{round(mem / 1024)}gib'
    if k == 'mac-reference':
        text = ("the owner's MacBook Air, §12.1's timing reference machine (Apple M1 4P+4E, 16 GB shared with the owner's apps, macOS, "
                "Node 24.12 arm64; Rosetta 2 for the x86-64 leg). Timing bars are measured here, only in the timing-phase waves the session "
                "opens; a timing a test prints while seats run is contended and informative only. pnpm only as corepack pnpm.")
    else:
        where = "the owner's Windows PC running Linux under WSL2" if k == 'wsl' else ('a Mac that is NOT the timing reference' if k == 'mac-other' else 'a Linux machine (cloud container or server)')
        text = (f"{where} ({cpu_name()}, {cores} logical CPUs, {round(mem / 1024)} GiB visible to this OS; the project on the native "
                "filesystem, never under /mnt/c or OneDrive). This is NOT §12.1's timing reference (the owner's MacBook Air): never take "
                "or gate on a timing here; a timing a test prints is informative only. pnpm only as corepack pnpm; Node 24.12 must be "
                "the active Node (a seat that finds another stops and reports). MAC-ONLY LEGS: a bar or test that needs the owner's Mac "
                "(digest identity across Node arm64 and x64 under Rosetta and three Playwright browsers, a five-leg bar, browsers:check) "
                "is built and tested on every leg this machine can run; each Mac-only leg is declared in a choices row as a Mac step and "
                "its checklist line is marked PENDING-MAC (never pass). BASELINE RED (J176): the bench's Mac-reference tests in "
                "plat/bench/test/calibrate/calibrate.test.ts, plat/bench/test/host/host.test.ts, plat/bench/test/timing/contention.test.ts, "
                "plat/bench/test/timing/harness.test.ts and plat/bench/test/timing/sampler.test.ts fail here BY DESIGN (they pin the "
                "MacBook Air); a gate passes when every failing test is in those five files and fails for a Mac-reference reason. Never "
                "edit, skip or loosen them; a NEW failure in those files from your change still counts.")
    return {
        'id': ident, 'kind': k, 'cores': cores, 'memMiB': mem,
        'maxLanes': lanes, 'agentCap': lanes + 3,  # + steward, a wait probe, an integration seat
        'workerCap': workers, 'mutantCap': mutants, 'text': text,
    }


if __name__ == '__main__':
    p = profile()
    if '--id' in sys.argv:
        print(p['id'])
    elif '--text' in sys.argv:
        print(p['text'])
    else:
        print(json.dumps(p, indent=1))
