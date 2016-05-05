'use strict'

import { positionTotals, playerPositions } from './lineup-helpers.js';
 
function alwaysPass() { return true; }

function eligiblePitchers(game) {
  return game
    .every(inning => ['Joseph', 'Cadeo', 'Jonathan', 'Oliver', 'Micah', 'Devin', 'Quincy', 'Kingston']
    .some(player => player === inning[1 - 1]));
}

function eligibleCatchers(game) {
  return game
    .every(inning => ['Oliver', 'Dalen', 'Micah', 'Naim', 'Devin', 'Vincent']
    .some(player => player === inning[2 - 1]));
}

const onlyPitchOneInning = alwaysPass;
const dontSitConsecutiveInnings = alwaysPass;

function infieldOutfieldBalance(game, players, positions) {
  /*
    IF: 6 -> P, C, 1B, 2B, 3B, SS
    OF: 4 -> LF, CF, RF, CF
    B : 4
  */
  return !players
    .map(player => playerPositions(game, player))
    .some(pp => { 
      const totals = positionTotals(pp); 
      return totals.outfield - totals.infield > 3 || totals.bench > 2;
    });
}

export { 
  eligiblePitchers, 
  eligibleCatchers, 
  onlyPitchOneInning, 
  dontSitConsecutiveInnings,
  infieldOutfieldBalance,
};
