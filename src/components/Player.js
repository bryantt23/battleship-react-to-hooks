class Player {
  makePlay(gameboard, row = 'computer', col = 'computer') {
    if (row === 'computer' || col === 'computer') {
      const size = gameboard.size;
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * size);
    }

    let isValidAttack = gameboard.receiveAttack(row, col);

    if (isValidAttack) {
      return true;
    }

    // not valid computer try again
    // player get prompted again
    return false;
  }
}

export default Player;
