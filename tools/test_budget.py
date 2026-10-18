#!/usr/bin/env python3
"""J197/J198: how many vitest workers one seat may use right now (prints an integer).

Seats share one machine. A seat calls this before every test run and passes the number as --maxWorkers.
Budget = min(free cores / 2, free memory / 700 MiB), keeping 2 cores and 4 GiB in reserve, capped by the machine's
workerCap (tools/machine_profile.py: 8 on a Linux or WSL2 machine, 2 on a Mac, J168); at least 1.
--mutants prints how many mutants a checker may run at once (each in its own mirror, --maxWorkers=1): budget // 2,
capped by mutantCap (3 on Linux or WSL2, 1 on a Mac); at least 1.
"""
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from machine_profile import profile  # noqa: E402


def mem_avail_mib():
    if sys.platform == 'darwin':
        try:
            out = subprocess.run(['vm_stat'], capture_output=True, text=True, timeout=5).stdout
            page = 16384 if 'page size of 16384' in out else 4096
            free = 0
            for line in out.splitlines():
                if line.startswith(('Pages free', 'Pages inactive', 'Pages speculative')):
                    free += int(line.split(':')[1].strip().rstrip('.'))
            return free * page // (1024 * 1024)
        except (OSError, subprocess.SubprocessError, ValueError):
            return 4096
    try:
        with open('/proc/meminfo') as f:
            for line in f:
                if line.startswith('MemAvailable:'):
                    return int(line.split()[1]) // 1024
    except OSError:
        pass
    return 4096


def budget(p):
    cores = os.cpu_count() or 4
    load1 = os.getloadavg()[0]
    by_cpu = int((cores - load1 - 2) // 2)
    by_mem = int((mem_avail_mib() - 4096) // 700)
    return max(1, min(p['workerCap'], by_cpu, by_mem))


if __name__ == '__main__':
    p = profile()
    b = budget(p)
    print(max(1, min(p['mutantCap'], b // 2)) if '--mutants' in sys.argv else b)
