import test from 'node:test';
import assert from 'node:assert/strict';
import { filamentLengthMeters, pieceCount, eligibleMaterials } from '../lib/calculations.ts';

test('100 g of ABS at 1.04 g/cm³ needs about 40 m of 1.75 mm filament', () => {
  assert.ok(Math.abs(filamentLengthMeters(100, 1.04) - 40) < 0.1);
});
test('filament conversion uses the chosen density', () => {
  assert.ok(Math.abs(filamentLengthMeters(100, 1.24) - 33.53) < 0.1);
  assert.ok(filamentLengthMeters(100, 1.04) > filamentLengthMeters(100, 1.24));
});
test('zero mass is zero length, invalid densities never produce infinity', () => {
  assert.equal(filamentLengthMeters(0, 1.24), 0);
  for (const density of [0, -1, Infinity, NaN]) assert.equal(filamentLengthMeters(100, density), null);
});
test('quantity is always a whole piece and at least one', () => {
  for (const [input, expected] of [[2.9,2], [3,3], [0,1], [-8,1], [NaN,1], [Infinity,1]]) assert.equal(pieceCount(input),expected);
});
test('flexibility excludes higher scoring rigid polymers', () => {
  const ranked = [{name:'PETG',score:9}, {name:'ASA',score:8}, {name:'TPU',score:7}];
  assert.deepEqual(eligibleMaterials(ranked, true), [{name:'TPU',score:7}]);
  assert.deepEqual(eligibleMaterials(ranked, false), ranked);
});
