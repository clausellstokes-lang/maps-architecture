// clipper2-wasm 0.4.0's package.json names `dist/es/clipper2z.d.ts` as its types, a file its published tarball lacks
// (C-0124 (2)), so a strict import fails with TS7016. This local declaration types the one thing the adapter takes
// from the module — its default export, the Emscripten factory — as returning `unknown`; `clipper2.ts` narrows the
// loaded module to its own interfaces, so no `any` comes from the import and no library type reaches an exported
// signature (the spec note N-15; M0-k-03).
declare module 'clipper2-wasm' {
  const factory: (options?: Record<string, unknown>) => Promise<unknown>;
  export default factory;
}
