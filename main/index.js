'use strict'

import { shuffle, playerPositions } from './lineup-helpers.js';
import { generateGame } from './lineup-builder.js';
import { 
  eligiblePitchers, 
  eligibleCatchers, 
  onlyPitchOneInning, 
  dontSitConsecutiveInnings,
  infieldOutfieldBalance,
} from './rules.js';


const PLAYERS = ['Kingston', 'Naim', 'Micah', 'Oliver', 'Cadeo', 'Joseph', 'Jonathan', 'Vincent', 'Mateo', 'Harper', 'Griffin', 'Devin', 'Dalen', 'Quincy'];
const POSITIONS = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'CF'];
const RULES = [
  eligiblePitchers,
  eligibleCatchers,
  onlyPitchOneInning,
  dontSitConsecutiveInnings,
  infieldOutfieldBalance,
];

function printLineup(innings /* Array<Array<player as string>> */, positions) {
  //return innings[0].map((player, position) => `${POSITIONS[position]}: ${player}`);
  return positions.map(
    (position, index) => position + ': ' + innings.map(inning => inning[index]).join(', ')
  )
}

function printBattingOrder(game, players, positions) {
  const batting = shuffle(players);
  return batting.map(player => [player, ...playerPositions(game, player).map(pos => positions[pos] || '●')]);
}

const game = generateGame(PLAYERS, RULES, 6);

console.log(
printBattingOrder(game, PLAYERS, POSITIONS)
);
