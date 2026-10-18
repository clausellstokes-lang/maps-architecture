// lint-as: bench/src/zz-fixture/fail.ts
// The bench reaches an adopted library only through the kernel, by its bare name or by a path into the kernel's
// node_modules folder (C-0129; the checker's note N2).
import Flatbush from '../../../packages/kernel/node_modules/flatbush/index.js'; // planted: outsideAdapter
export { Flatbush };
