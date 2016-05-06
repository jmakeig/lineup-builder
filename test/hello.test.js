'use strict'

import test from 'tape-catch';

test('It should equal', (assert) => {
  assert.equal(4, 2+2);
  assert.end();
});

test('Should throw error', (assert) => {
  assert.throws(function() { null.f(); }, TypeError);
  assert.end();
});

test.skip('This test should be skipped', (assert) => {});
