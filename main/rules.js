'use strict'

import { positionTotals, playerPositions } from './lineup-helpers.js';
 
function alwaysPass() { return true; }

function eligiblePitchers(game, pitchers) {
  return game
    .every(inning => pitchers.some(player => player === inning[1 - 1]));
}

function eligibleCatchers(game, catchers) {
  return game
    .every(inning => catchers.some(player => player === inning[2 - 1]));
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

/**
 * Logs a message to the console if the rule returns `false`. Passes through 
 * all arguments to the rule invocation as-is.
 * 
 * @param  {function} rule  The original rule function
 * @param  {string} message A message to display on the console when the rule 
 *                          does not pass (i.e. returns `false`)
 * @return {function}       A function with the same signature as the rule
 */
function loggingAdvice(rule /* function(game, players, positions) boolean */, message) {
  return function() {
    const result = rule.call(null, ...arguments);
    if(!result) {
      console.log(message);
    }
    return result;
  }
}

const _eligiblePitchers = loggingAdvice(eligiblePitchers, 'eligiblePitchers');
const _eligibleCatchers = loggingAdvice(eligibleCatchers, 'eligibleCatchers');
const _onlyPitchOneInning = loggingAdvice(onlyPitchOneInning, 'onlyPitchOneInning');
const _dontSitConsecutiveInnings = loggingAdvice(dontSitConsecutiveInnings, 'dontSitConsecutiveInnings');
const _infieldOutfieldBalance = loggingAdvice(infieldOutfieldBalance, 'infieldOutfieldBalance');

export { 
  _eligiblePitchers as eligiblePitchers, 
  _eligibleCatchers as eligibleCatchers, 
  _onlyPitchOneInning as onlyPitchOneInning, 
  _dontSitConsecutiveInnings as dontSitConsecutiveInnings,
  _infieldOutfieldBalance as infieldOutfieldBalance,
};
