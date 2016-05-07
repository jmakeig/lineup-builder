'use strict'

import { positionTotals, playerPositions } from './lineup-helpers.js';

function alwaysPass() { return true; }

/**
 * Checks that a game is valid (well, sensible). Throws
 * a TypeError if it’s not.
 * 
 * @return undefined 
 * @throws TypeError
 */
function checkGame(game) {
  if(!Array.isArray(game)) {
    throw new TypeError('game must be a two-dimensional array of players representing postions (inner) by innning (outer)')
  }
}

/**
 * Effectively constrains a position to a fixed list of eligible players.
 * This isn’t a rule. It’s a util for building other rules.
 * 
 * @param  {Array<Array<string as player> as inning>} game 
 * @param  {Array<string as player>} eligiblePlayers A list of player names. 
 *                                                   Order doesn’t matter.
 * @param  {number} position   The zero-based position number, e.g. `2` is first base
 * @return {boolean}   
 */
function eligiblePositionPlayers(game, eligiblePlayers, position) {
  return game
    .every(inning => eligiblePlayers.some(player => player === inning[position]));
}

/**
 * Limit pitching to specific players.
 * 
 * @param  {Array<Array<string as player> as inning>} game  
 * @param  {Array<string as player>} pitchers List of eligible pitchers. 
 *                                            Order doesn’t matter.
 * @return {boolean} 
 */
function eligiblePitchers(game, pitchers) {
  return eligiblePositionPlayers(game, pitchers, 0);
}

/**
 * Limit catching to specific players.
 * 
 * @param  {Array<Array<string as player> as inning>} game 
 * @param  {Array<string as player>} catchers List of eligible catchers. 
 *                                            Order doesn’t matter.
 * @return {boolean} 
 */
function eligibleCatchers(game, catchers) {
  return eligiblePositionPlayers(game, catchers, 1);
}

/**
 * A player can only pitch at most one inning in a game.
 * 
 * @param  {Array<Array<string as player> as inning>} game
 * @return {boolean}      `true` when all players for all innings satisfy
 */
function onlyPitchOneInning(game) {
  const pitchers = game 
    .map(inning => inning[0])
    .reduce((totals, player) => {
      totals[player] = (totals[player] || 0) + 1;
      return totals;
    }, Object.create(null));
  for(let player in pitchers) {
    if(pitchers[player] > 1) {
      return false;
    }
  }
  return true;  
}
/**
 * [dontSitConsecutiveInnings description]
 * @param  {[type]} game      [description]
 * @param  {[type]} players   [description]
 * @param  {[type]} positions [description]
 * @return {[type]}           [description]
 */
function dontPlaySamePositionConsecutiveInnings(game, players, positions) {
  return !(game.reduce(
    (prev, inning) => {
      // FIXME: This is a really hacky way to “escape” a reduction
      if(prev instanceof Error) { return prev; }
      for(let i = 0; i < inning.length; i++) {
        if(prev[i] === inning[i]) {
          return Error('Nope');
        }
      }
      return inning;
    }, 
    Array(players.length)
  ) instanceof Error);
}

// TODO: Implement me
const dontSitConsecutiveInnings = alwaysPass;

function infieldOutfieldBalance(game, players, positions) {
  /*
    IF: 6 -> P, C, 1B, 2B, 3B, SS
    OF: 4 -> LF, CF, RF, CF
    B : 4
  */
 const OUTFIELD_DIFF_MAX = 3
  return !players
    .map(player => playerPositions(game, player))
    .some(pp => { 
      const totals = positionTotals(pp); 
      return (totals.outfield - totals.infield) > OUTFIELD_DIFF_MAX;
    });
}

function benchEquity(game, players, positions) {
  const MAXBENCH = 0 + Math.ceil((1 - positions.length / players.length) * game.length);
  return !players
    .map(player => playerPositions(game, player))
    .some(pp => { 
      const totals = positionTotals(pp); 
      return totals.bench > MAXBENCH || totals.bench < 1;
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
      //console.log(message);
    }
    return result;
  }
}

const _eligiblePitchers = loggingAdvice(eligiblePitchers, 'eligiblePitchers');
const _eligibleCatchers = loggingAdvice(eligibleCatchers, 'eligibleCatchers');
const _onlyPitchOneInning = loggingAdvice(onlyPitchOneInning, 'onlyPitchOneInning');
const _dontSitConsecutiveInnings = loggingAdvice(dontSitConsecutiveInnings, 'dontSitConsecutiveInnings');
const _infieldOutfieldBalance = loggingAdvice(infieldOutfieldBalance, 'infieldOutfieldBalance');
const _benchEquity = loggingAdvice(benchEquity, 'benchEquity');
const _dontPlaySamePositionConsecutiveInnings = loggingAdvice(dontPlaySamePositionConsecutiveInnings, 'dontPlaySamePositionConsecutiveInnings');
export { 
  _eligiblePitchers                       as eligiblePitchers, 
  _eligibleCatchers                       as eligibleCatchers, 
  _onlyPitchOneInning                     as onlyPitchOneInning, 
  _dontSitConsecutiveInnings              as dontSitConsecutiveInnings,
  _infieldOutfieldBalance                 as infieldOutfieldBalance,
  _benchEquity                            as benchEquity,
  _dontPlaySamePositionConsecutiveInnings as dontPlaySamePositionConsecutiveInnings,
};
