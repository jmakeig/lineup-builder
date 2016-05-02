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

const PLAYERS = ['Kingston', 'Naim', 'Micah', 'Oliver', 'Cadeo', 'Joseph', 'Jonathan', 'Vincent', 'Mateo', 'Harper', 'Griffin', 'Devin', 'Dalen', 'Quincy'];
const POSITIONS = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'CF'];
const RULES = [
  //pitchers,
  //catchers,
  infieldOutfieldBalance,
];

function pitchers(game) {
  return game
    .every(inning => ['Joseph', 'Cadeo', 'Jonathan', 'Oliver', 'Micah', 'Devin', 'Quincy', 'Kingston']
    .some(player => player === inning[1 - 1]));
}
function catchers(game) {
  return game
    .every(inning => ['Oliver', 'Dalen', 'Micah', 'Naim', 'Devin']
    .some(player => player === inning[2 - 1]));
}
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

function generateGame(players, rules, count) {
  const MAX = 1000000;
  let game, 
      iterations = 0;
  do {
    game = generateCandidateGame(players, count);
  } while(++iterations < MAX && !checkRules(rules, game, players))
  if(MAX === iterations) {
    throw new Error(`Unable to generate an inning that satisfies the ${rules.length} rules.`)
  }
  return game;
}

/**
 * Randomly distribute players over `count` innings.
 * This is probably inefficient becuase it doesn’t take
 * into account simple, single-inning rules.
 */
function generateCandidateGame(players, count) {
  const game = [];
  count = count || 6;
  for(let i = 0; i < count; i++) {
    game.push(shuffle(players));
  }
  return game;
}

function checkRules(rules, game, players, positions) {
  return !rules.some(rule => !rule.call(null, game, players, positions));
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

function printLineup(innings /* Array<Array<player as string>> */, positions) {
  //return innings[0].map((player, position) => `${POSITIONS[position]}: ${player}`);
  return positions.map(
    (position, index) => position + ': ' + innings.map(inning => inning[index]).join(', ')
  )
}

function printBattingOrder(game, players, positions) {
  const batting = shuffle(players);
  return batting.map(player => [player, ...playerPositions(game, player).map(pos => positions[pos] || 'bench')]);
}

const game = generateGame(PLAYERS, RULES, 6);
printBattingOrder(game, PLAYERS, POSITIONS);


//const game = generateCandidateGame(PLAYERS, 6);
//infieldOutfieldBalance(game, PLAYERS, POSITIONS);
