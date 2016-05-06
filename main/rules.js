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

function report(msg) {
  console.log(msg);
}

function onlyPitchOneInning(game) {
  if(!Array.isArray(game)) {
    throw new TypeError('game must be a two-dimensional array of players representing postions (inner) by innning (outer)')
  }
  const pitchers = game 
    .map(inning => inning[0])
    .reduce((totals, player) => {
      totals[player] = (totals[player] || 0) + 1;
      return totals;
    }, Object.create(null));
  for(let player in pitchers) {
    if(pitchers[player] > 1) {
      report('onlyPitchOneInning');
      return false;
    }
  }
  return true;  
}
const dontSitConsecutiveInnings = alwaysPass;

function infieldOutfieldBalance(game, players, positions) {
  /*
    IF: 6 -> P, C, 1B, 2B, 3B, SS
    OF: 4 -> LF, CF, RF, CF
    B : 4
  */
 const MAXBENCH = 0 + Math.ceil((1 - positions.length / players.length) * game.length);
 const OUTFIELDMAX = 3
 
  return !players
    .map(player => playerPositions(game, player))
    .some(pp => { 
      const totals = positionTotals(pp); 
      if((totals.outfield - totals.infield) > OUTFIELDMAX || totals.bench > MAXBENCH) {
        report('infieldOutfieldBalance');
      }
      return (totals.outfield - totals.infield) > OUTFIELDMAX || totals.bench > MAXBENCH || totals.bench < 1;
    });
}

export { 
  eligiblePitchers, 
  eligibleCatchers, 
  onlyPitchOneInning, 
  dontSitConsecutiveInnings,
  infieldOutfieldBalance,
};
