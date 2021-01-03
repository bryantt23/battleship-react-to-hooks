import Player from './Player';
import Ship from './Ship';
import Gameboard from './Gameboard';

//TODO move this into app and make that the gameengine
// const shipSizes=[2, 3, 3, 4, 5]
const shipSizes = [3, 4, 5];
// const coordinates = [
//   [0, 0],
//   [3, 3],
//   [9, 9]
// ];

// const shipSizes2 = [5, 4, 3];
// const shipSizes2 = [2];
// const coordinates2 = [
//   [0, 0]
//   // [3, 3],
//   // [6, 6]
// ];

// const shipSizes = [5];
// const coordinates = [[5, 9]];

class GameEngine {
  player;
  computer;
  constructor() {}

  getCoordinates() {
    const size = this.playerGameboard.boardSize;
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    return [row, col];
  }

  getOrientation() {
    return Math.round(Math.random()) === 0 ? 'horizontal' : 'vertical';
  }

  placeShips() {
    const shipSizesLen = shipSizes.length;
    let i = 0;

    while (i < shipSizesLen) {
      const ship = new Ship(shipSizes[i]);
      let [row, col] = this.getCoordinates();
      let orientation = this.getOrientation();
      let isValidShipPos = this.playerGameboard.isValidShipPosition(
        row,
        col,
        orientation,
        ship
      );
      while (!isValidShipPos) {
        [row, col] = this.getCoordinates();
        orientation = this.getOrientation();
        isValidShipPos = this.playerGameboard.isValidShipPosition(
          row,
          col,
          orientation,
          ship
        );
      }
      this.playerGameboard.placeShip(row, col, orientation, ship);
      i++;
    }

    i = 0;
    while (i < shipSizesLen) {
      const ship = new Ship(shipSizes[i]);
      let [row, col] = this.getCoordinates();
      let orientation = this.getOrientation();
      let isValidShipPos = this.computerGameboard.isValidShipPosition(
        row,
        col,
        orientation,
        ship
      );
      while (!isValidShipPos) {
        [row, col] = this.getCoordinates();
        orientation = this.getOrientation();
        isValidShipPos = this.computerGameboard.isValidShipPosition(
          row,
          col,
          orientation,
          ship
        );
      }
      this.computerGameboard.placeShip(row, col, orientation, ship);
      i++;
    }

    // for (let i = 0; i < shipSizes.length; i++) {

    //   const ship = new Ship(shipSizes[i]);
    //   const row = coordinates[i][0],
    //     col = coordinates[i][1];
    //   this.playerGameboard.placeShip(row, col, 'horizontal', ship);
    // }

    // for (let i = 0; i < shipSizes2.length; i++) {
    //   const ship = new Ship(shipSizes2[i]);
    //   const row = coordinates2[i][0],
    //     col = coordinates2[i][1];
    //   this.computerGameboard.placeShip(row, col, 'vertical', ship);
    // }
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
