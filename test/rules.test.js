'use strict'

import test from 'tape-catch';

import { 
  eligiblePitchers, 
  eligibleCatchers, 
  onlyPitchOneInning, 
  infieldOutfieldBalance,
  dontSitConsecutiveInnings,
  dontPlaySamePositionConsecutiveInnings,
} from '../main/rules.js';

test('A shouldn’t pitch more than once', (assert) => {
  const game = [
    ['A', 'B', 'C'],
    ['A', 'B', 'C'],
    ['A', 'B', 'C']
  ];
  assert.false(onlyPitchOneInning(game));
  assert.end();
});

test('A only pitches once', (assert) => {
  const game = [
    ['A', 'B', 'C'],
    ['B', 'B', 'C'],
    ['C', 'B', 'C']
  ];
  assert.true(onlyPitchOneInning(game));
  assert.end();
});

test('B shouldn’t pitch more than once', (assert) => {
  const game = [
    ['A', 'B', 'C'],
    ['B', 'B', 'C'],
    ['B', 'B', 'C']
  ];
  assert.false(onlyPitchOneInning(game));
  assert.end();
});

test('Invalid game', (assert) => {
  const game = undefined;
  assert.throws(() => onlyPitchOneInning(game), TypeError);
  assert.end();
});

test('B shouldn’t play 1B in consecutive innings', (assert) => {
  const game = [
    ['A', 'B', 'C'],
    ['B', 'B', 'C'],
    ['B', 'A', 'C']
  ];
  assert.false(dontPlaySamePositionConsecutiveInnings(game, ['A', 'B', 'C']));
  assert.end();
});

test('No one plays the same position in consecutive innings', (assert) => {
  const game = [
    ['A', 'B', 'C'],
    ['B', 'C', 'A'],
    ['C', 'A', 'B']
  ];
  assert.true(dontPlaySamePositionConsecutiveInnings(game, ['A', 'B', 'C']));
  assert.end();
});
