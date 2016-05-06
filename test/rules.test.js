'use strict'

import test from 'tape-catch';

import {
  shuffle, 
  isInfield,
  isOutfield,
  isBench,
  positionTotals, 
  playerPositions
} from '../main/lineup-helpers.js';

test('It should equal', (assert) => {
  assert.equal(4, 2+2);
  assert.end();
});
