'use strict'

import { shuffle, playerPositions } from './lineup-helpers.js';
import { generateGame } from './lineup-builder.js';
import { 
  eligiblePitchers, 
  eligibleCatchers, 
  onlyPitchOneInning, 
  dontSitConsecutiveInnings,
  infieldOutfieldBalance,
  benchEquity
} from './rules.js';

import Table from 'cli-table';


const PLAYERS = ['Kingston', 'Naim', 'Micah', 'Oliver', 'Cadeo', 'Joseph', 'Jonathan', 'Vincent', 'Mateo', 'Harper', 'Griffin', 'Devin', 'Dalen', 'Quincy'];
const POSITIONS = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'CF'];
const RULES = [
  function(game, players, positions) { 
    const pitchers = ['Joseph', 'Cadeo', 'Jonathan', 'Oliver', 'Micah', 'Devin', 'Quincy', 'Kingston'];
    return eligiblePitchers.call(null, game, pitchers);
  },
  function(game, players, positions) {
    const catchers = ['Oliver', 'Dalen', 'Micah', 'Naim', 'Devin', 'Vincent'];
    return eligibleCatchers.call(null, game, catchers);
  },
  onlyPitchOneInning,
  benchEquity,
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

/**
 * Reads the input stream as UTF-8 text.
 * @param [ReadableStream] readStream
 * @return [Promise]
 */
function readInput(readStream) {
  return new Promise(function(resolve, reject) {
    let buffer = '';
    readStream.setEncoding('utf-8');
    readStream.resume();
    readStream.on('data', chunk => buffer += chunk);
    readStream.on('end', () => resolve(buffer));
  })
}

// readInput(process.stdin)
//   .then(function(json){
//     let game;
//     if(json) {
//       console.console.log('JSON');
//     } else {
    const  game = generateGame(PLAYERS, POSITIONS, RULES, 6);
    // }
    const lineup = battingOrder(game, PLAYERS, POSITIONS);
    const table = new Table({ head: ["Player", ...Array(6).fill(0).map((item, index) => index + 1)] });
    table.push(...lineup);
    console.log(table.toString());
  //   if(!json) {
      console.log(game);
  //   }
  // })
  // .catch(function(err) {
  //   process.stderr.write('Ooops');
  // });
