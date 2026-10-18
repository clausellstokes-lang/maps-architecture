// lint-as: packages/kernel/src/zz-fixture/fail.ts
// A relative path into a node_modules folder is an import of the package it names there (C-0129; the checker's note
// N2): an adopted library outside its adapter, a vendored library's own dependency, a third-party package, a package
// above the kernel — each refused as its bare name is.
import Flatbush from '../../node_modules/flatbush/index.js'; // planted: outsideAdapter
import FlatQueue from '../../../../vendor/flatbush@4.6.2/node_modules/flatqueue/index.js'; // planted: outsideAdapter
import fc from '../../../../node_modules/.pnpm/fast-check@4.10.2/node_modules/fast-check/lib/fast-check.js'; // planted: thirdPartyInModel
import * as model from '../../node_modules/@plat/model/src/index.js'; // planted: direction
export { Flatbush, FlatQueue, fc, model };
