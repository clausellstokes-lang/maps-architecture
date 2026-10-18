// options: {"globalObjects": false}
// With the vendored setting a read through a global object is still a host read.
export const t = self.performance.now(); // planted: forbiddenGlobal
export const r = window.crypto; // planted: forbiddenGlobal
