#!/usr/bin/env python3
"""J197: how many vitest workers one seat may use right now (prints an integer, 1..8).

Seats share one machine. A seat calls this before every test run and passes the number as --maxWorkers.
Budget = min(free cores / 2, free memory / 700 MiB), keeping 2 cores and 4 GiB in reserve; at least 1, at most 8.
--mutants prints how many mutants a checker may run at once (each in its own mirror, --maxWorkers=1): budget // 2, 1..3.
"""
import os
import sys


def mem_avail_mib():
    try:
        with open('/proc/meminfo') as f:
            for line in f:
                if line.startswith('MemAvailable:'):
                    return int(line.split()[1]) // 1024
    except OSError:
        pass
    return 4096  # unknown (macOS): stay conservative


def budget():
    cores = os.cpu_count() or 4
    load1 = os.getloadavg()[0]
    by_cpu = int((cores - load1 - 2) // 2)
    by_mem = int((mem_avail_mib() - 4096) // 700)
    return max(1, min(8, by_cpu, by_mem))


if __name__ == '__main__':
    b = budget()
    print(max(1, min(3, b // 2)) if '--mutants' in sys.argv else b)
