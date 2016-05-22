'use strict';

import {
  shuffle, 
  isInfield,
  isOutfield,
  isBench,
  positionTotals, 
  playerPositions
} from './lineup-helpers.js';

function generateGame(players, positions, rules, count) {
  const MAX = 10000000000;
  let game, 
      iterations = 0;
  do {
    game = generateCandidateGame(players, count);
  } while(++iterations < MAX && !checkRules(rules, game, players, positions));
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

export {
  generateGame
};
