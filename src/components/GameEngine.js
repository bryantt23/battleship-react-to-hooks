import Player from './Player';
import Ship from './Ship';
import Gameboard from './Gameboard';

//TODO move this into app and make that the gameengine
// const shipSizes=[2, 3, 3, 4, 5]
const shipSizes = [1, 4, 1];
const coordinates = [
  [0, 0],
  [3, 3],
  [9, 9]
];

// const shipSizes2 = [5, 4, 3];
const shipSizes2 = [2];
const coordinates2 = [
  [0, 0]
  // [3, 3],
  // [6, 6]
];

// const shipSizes = [5];
// const coordinates = [[5, 9]];

class GameEngine {
  player;
  computer;
  constructor() {}

  placeShips() {
    for (let i = 0; i < shipSizes.length; i++) {
      const ship = new Ship(shipSizes[i]);
      const row = coordinates[i][0],
        col = coordinates[i][1];
      this.playerGameboard.placeShip(row, col, 'horizontal', ship);
    }

    for (let i = 0; i < shipSizes2.length; i++) {
      const ship = new Ship(shipSizes2[i]);
      const row = coordinates2[i][0],
        col = coordinates2[i][1];
      this.computerGameboard.placeShip(row, col, 'vertical', ship);
    }
  }

  startGame() {
    this.player = new Player('player');
    this.computer = new Player('computer');
    this.playerGameboard = new Gameboard();
    this.computerGameboard = new Gameboard();
    this.placeShips();

    // console.log(this.playerGameboard.getBoard());
  }
}

export default GameEngine;
