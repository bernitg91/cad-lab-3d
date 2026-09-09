import test from 'node:test';
import assert from 'node:assert/strict';
import { containedImageSizes } from '../lib/image-sizes.ts';

test('a 3:4 portrait in a 3:2 frame uses half its width without moving the mobile breakpoint', () => {
  assert.equal(containedImageSizes('(max-width: 560px) 88vw, 400px', 3 / 4, 3 / 2), '(max-width: 560px) 44.00vw, 200.00px');
});

test('nested desktop calc scales both the available width and grid gap', () => {
  assert.equal(containedImageSizes('(max-width: 1440px) calc((88vw - 64px) / 3), 400px', 3 / 4, 3 / 2), '(max-width: 1440px) calc((44.00vw - 32.00px) / 3), 200.00px');
});

test('landscape images filling the frame retain full resolution', () => {
  assert.equal(containedImageSizes('(max-width: 760px) 88vw, 786px', 16 / 9, 3 / 2), '(max-width: 760px) 88vw, 786px');
});
