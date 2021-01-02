import Player from './Player';
import Ship from './Ship';
import Gameboard from './Gameboard';

// const shipSizes=[2, 3, 3, 4, 5]
const shipSizes = [10, 4, 1];
const coordinates = [
  [0, 0],
  [3, 3],
  [9, 9]
];

// const shipSizes = [5];
// const coordinates = [[5, 9]];

class GameEngine {
  constructor() {}

  startGame() {
    const player = new Player();
    const computer = new Player();
    this.playerGameboard = new Gameboard();
    const computerGameboard = new Gameboard();

    for (let i = 0; i < shipSizes.length; i++) {
      const ship = new Ship(shipSizes[i]);
      const row = coordinates[i][0],
        col = coordinates[i][1];
      this.playerGameboard.placeShip(row, col, 'horizontal', ship);
    }

    // console.log(this.playerGameboard.getBoard());
  }
}

export default GameEngine;
