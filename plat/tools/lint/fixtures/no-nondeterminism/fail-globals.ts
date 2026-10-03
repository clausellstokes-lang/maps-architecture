// Clock, ambient randomness, timers, host, Node globals and locale.
export function f(n: number, s: string): unknown[] {
  return [
    Date.now(), // planted: forbiddenGlobal
    new Date(0), // planted: forbiddenGlobal
    performance.now(), // planted: forbiddenGlobal
    Math.random(), // planted: mathRandom
    setTimeout(() => n, 0), // planted: forbiddenGlobal
    queueMicrotask(() => n), // planted: forbiddenGlobal
    crypto.getRandomValues(new Uint32Array(1)), // planted: forbiddenGlobal
    new Intl.NumberFormat('en'), // planted: forbiddenGlobal
    document.title, // planted: forbiddenGlobal
    window, // planted: forbiddenGlobal
    process.env, // planted: forbiddenGlobal
    n.toLocaleString(), // planted: localeMethod
    s.localeCompare('b'), // planted: localeMethod
    globalThis.Date.now(), // planted: forbiddenGlobal
    self.performance, // planted: forbiddenGlobal
    globalThis, // planted: globalObjectAsValue
    globalThis[s], // planted: globalObjectAsValue
  ];
}
