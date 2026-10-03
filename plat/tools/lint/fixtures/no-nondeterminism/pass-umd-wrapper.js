// options: {"globalObjects": false}
// The vendored scan's setting (C-0126): a UMD wrapper's bare global object is the export target, not a host read.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.lib = {}));
})(this, function (exports) { exports.answer = 42; });
