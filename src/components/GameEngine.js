import Player from './Player';
import Ship from './Ship';
import Gameboard from './Gameboard';

// const shipSizes=[2, 3, 3, 4, 5]
const shipSizes = [3, 4, 5];
const coordinates = [
  [0, 0],
  [3, 3],
  [9, 5]
];

class GameEngine {
  constructor() {}

  startGame() {
    const player = new Player();
    const computer = new Player();
    const playerGameboard = new Gameboard();
    const computerGameboard = new Gameboard();

    for (let i = 0; i < shipSizes; i++) {
      const ship = new Ship(shipSizes[i]);
      const row = coordinates[i][0],
        col = (col = coordinates[i][1]);
      playerGameboard.placeShip(row, col, 'vertical', ship);
    }

    console.log(playerGameboard.getBoard());
  }
}

export default GameEngine;
