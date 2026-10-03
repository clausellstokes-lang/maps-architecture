// lint-as: packages/kernel/src/index/zz-fixture.ts
// An adopted library outside its one adapter file; flatqueue, which no shipped package adopts, anywhere.
import Flatbush from 'flatbush'; // planted: outsideAdapter
import FlatQueue from 'flatqueue'; // planted: outsideAdapter
import { orient2d } from 'robust-predicates/esm/orient2d.js'; // planted: outsideAdapter
export { Flatbush, FlatQueue, orient2d };
