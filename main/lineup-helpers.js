'use strict'

function shuffle(input) {
  let arr = input.slice();
  let currentIndex = arr.length, temporaryValue, randomIndex ;
  while(0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}

function isInfield(position) { return position < 6; }
function isOutfield(position) { return position > 5; }
function isBench(position) { null === position || 'undefined' === typeof position || position < 0 || position > 9;  }

/**
 * Calculate the distribution of infield, outfield, 
 * and bench innings for a single player.
 *
 * @param {Array<position as number>} Position indexes by inning
 * @return {object} Totals of the form, `{infield: 0, outfield: 0, bench: 0}`
 */
function positionTotals(positions) {
  return positions.reduce((totals, position) => {
    if(isInfield(position)) { totals.infield++; }
    else if(isOutfield(position)) { totals.outfield++; }
    else { totals.bench++; }
    return totals;
  }, {infield: 0, outfield: 0, bench: 0});
}

/**
 * Position index (array index) by inning.
 *
 * @param {Array<Array<player as string>>} game 
 * @param {string} player
 * @return {Array<position as number>}
 */
function playerPositions(game, player) {
  return game.map(inning => inning.indexOf(player));
}

export {
  shuffle, 
  isInfield,
  isOutfield,
  isBench,
  positionTotals, 
  playerPositions
};
