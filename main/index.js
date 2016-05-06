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

import Table from 'cli-table';


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

function battingOrder(game, players, positions) {
  const batting = shuffle(players);
  return batting.map(player => [player, ...playerPositions(game, player).map(pos => positions[pos] || '●')]);
}

const game = generateGame(PLAYERS, POSITIONS, RULES, 6);
const lineup = battingOrder(game, PLAYERS, POSITIONS);

const table = new Table({ head: ["Player", ...Array(6).fill(0).map((item, index) => index + 1)] });
table.push(...lineup);

console.log(table.toString());
